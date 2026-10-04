import * as THREE from "three";
import { AHEAD, FLOOR, SPIN, START, onPath, spinAngle, starfield, unitsOf, yearOf } from "./life.js";
import { QUALITY } from "./explore.js";
import { approach, clamp, ease, eye, slide, turn, zoom } from "./orbit.js";
import { DISCOVER, DUST_FRAGMENT, DUST_VERTEX, formedAt, MARK_FRAGMENT, MARK_VERTEX, POINTER, STAR_FRAGMENT, STAR_VERTEX } from "./shaders.js";
import { lerp, reducedMotion, seeded, smoothstep } from "./util.js";

export const HOME_PITCH = -0.27;
export const OVERVIEW_PITCH = 0.35;
const CENTRE = [0, 0, FLOOR + 3];
const LINK_SEGMENTS = 18;
const MAX_LINKS = 40;
const DRAG_PIXELS = 6;
const RING_SPREAD = 0.5;
const RATE = 4.2;

export function createScene({ canvas, cloud, marks, future, today, mobile, sky }) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, innerWidth / innerHeight, 0.1, 4000);
  const lastYear = today + AHEAD[1] + 0.4;

  const offsets = new Float32Array(cloud.count * 3);
  for (let k = 0; k < offsets.length; k++) offsets[k] = cloud.position[k] - cloud.center[k];
  const geometry = new THREE.BufferGeometry();
  const dynamic = (array, size) => new THREE.BufferAttribute(array, size).setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute("position", new THREE.BufferAttribute(offsets, 3));
  geometry.setAttribute("aFrom", new THREE.BufferAttribute(cloud.from, 3));
  geometry.setAttribute("aCenter", new THREE.BufferAttribute(cloud.center, 3));
  const flat = { u: "aU", order: "aOrder", seed: "aSeed", size: "aSize", ahead: "aAhead", kind: "aKind", memory: "aMemory", galaxy: "aGalaxy" };
  Object.entries(flat).forEach(([key, name]) => geometry.setAttribute(name, new THREE.BufferAttribute(cloud[key], 1)));
  ["threads", "people", "places"].forEach((facet, k) => geometry.setAttribute(`aFacet${k}`, new THREE.BufferAttribute(cloud.facet[facet], 1)));

  const levelNow = new Float32Array(Math.max(1, marks.length)).fill(1);
  const levelGoal = new Float32Array(levelNow);
  const levelTexture = new THREE.DataTexture(levelNow, levelNow.length, 1, THREE.RedFormat, THREE.FloatType);
  levelTexture.minFilter = levelTexture.magFilter = THREE.NearestFilter;
  levelTexture.needsUpdate = true;

  const ink = { value: new THREE.Color() };
  const field = starfield({ count: mobile ? 4000 : undefined, random: seeded(2026) });
  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute("position", new THREE.BufferAttribute(field.position, 3));
  starGeometry.setAttribute("aSeed", new THREE.BufferAttribute(field.seed, 1));
  starGeometry.setAttribute("aBright", new THREE.BufferAttribute(field.bright, 1));
  starGeometry.setAttribute("aHalo", new THREE.BufferAttribute(field.halo, 1));
  starGeometry.setAttribute("aSize", new THREE.BufferAttribute(field.size, 1));
  const starUniforms = { uTime: { value: 0 }, uPixel: { value: 1 }, uGain: { value: 0.6 }, uHalo: { value: 1 }, uInk: ink };
  const starMaterial = new THREE.ShaderMaterial({ uniforms: starUniforms, vertexShader: STAR_VERTEX, fragmentShader: STAR_FRAGMENT, transparent: true, depthTest: false, depthWrite: false });
  const stars = new THREE.Points(starGeometry, starMaterial);
  stars.frustumCulled = false;
  stars.renderOrder = -1;
  scene.add(stars);
  const gain = Math.min(1, Math.sqrt(60000 / cloud.count));
  const dustUniforms = {
    uMix: { value: 0 },
    uTime: { value: 0 },
    uScale: { value: 1 },
    uFar: { value: 1 },
    uGain: { value: 1 },
    uFocusU: { value: 0 },
    uFocusW: { value: 7 },
    uFocusOn: { value: 0 },
    uFilterFacet: { value: -1 },
    uFilterItem: { value: -1 },
    uAway: { value: 0.12 },
    uReveal: { value: 1e4 },
    uLevelCount: { value: levelNow.length },
    uLevels: { value: levelTexture },
    uSpin: { value: new Float32Array(SPIN.slots) },
    uPivot: { value: Array.from({ length: SPIN.slots }, (_, k) => new THREE.Vector3(...(sky.list[k]?.centre ?? [0, 0, 0]))) },
    uKeep: { value: 1 },
    uPointer: { value: new THREE.Vector3(0, 0, 0) },
    uInk: ink,
  };
  const dustMaterial = new THREE.ShaderMaterial({ uniforms: dustUniforms, vertexShader: DUST_VERTEX, fragmentShader: DUST_FRAGMENT, transparent: true, depthTest: false, depthWrite: false });
  const dots = new THREE.Points(geometry, dustMaterial);
  dots.frustumCulled = false;
  scene.add(dots);

  const slots = [...marks.map((mark) => mark.position), future.today, future.today, future.book, future.clone];
  const spinning = new Float32Array(SPIN.slots);
  const centerOf = (slot, out) => {
    out.set(...slots[slot]);
    const k = slot < marks.length ? marks[slot].period : -1;
    if (k >= 0 && k < SPIN.slots && spinning[k]) {
      const pivot = sky.list[k].centre;
      const [dx, dy] = [out.x - pivot[0], out.y - pivot[1]];
      out.x = pivot[0] + Math.cos(spinning[k]) * dx - Math.sin(spinning[k]) * dy;
      out.y = pivot[1] + Math.sin(spinning[k]) * dx + Math.cos(spinning[k]) * dy;
    }
    return out;
  };

  const marksData = [
    { size: 1.3, state: 1, order: 0.96 },
    { size: 2.4, state: 3, order: 0.96 },
    { size: 2.4, state: 2, order: 0.98 },
    { size: 2.4, state: 2, order: 1 },
    { size: 8, state: 4, order: 0 },
    { size: 8, state: 4, order: 0 },
  ];
  const RING = 4;
  const PREVIEW = 5;
  const markPosition = dynamic(new Float32Array(marksData.length * 3), 3);
  const markSize = dynamic(Float32Array.from(marksData.map((mark) => mark.size)), 1);
  const markFade = dynamic(new Float32Array(marksData.length).fill(1), 1);
  const markGeometry = new THREE.BufferGeometry();
  markGeometry.setAttribute("position", markPosition);
  markGeometry.setAttribute("aSize", markSize);
  markGeometry.setAttribute("aFade", markFade);
  markGeometry.setAttribute("aState", new THREE.BufferAttribute(Float32Array.from(marksData.map((mark) => mark.state)), 1));
  markGeometry.setAttribute("aOrder", new THREE.BufferAttribute(Float32Array.from(marksData.map((mark) => mark.order)), 1));
  const markUniforms = { uScale: { value: 1 }, uTime: { value: 0 }, uReveal: { value: 0 }, uInk: ink };
  const markMaterial = new THREE.ShaderMaterial({ uniforms: markUniforms, vertexShader: MARK_VERTEX, fragmentShader: MARK_FRAGMENT, transparent: true, depthTest: false, depthWrite: false });
  const points = new THREE.Points(markGeometry, markMaterial);
  points.frustumCulled = false;
  scene.add(points);

  const lineMaterials = [];
  const lineMaterial = (opacity, dashed = false) => {
    const material = dashed ? new THREE.LineDashedMaterial({ transparent: true, dashSize: 0.8, gapSize: 0.9, depthTest: false }) : new THREE.LineBasicMaterial({ transparent: true, depthTest: false });
    lineMaterials.push({ material, opacity });
    return material;
  };
  const geometryOf = (vertices) => new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  const guides = new THREE.Group();
  const addGuide = (object, opacity, year = START) => {
    object.frustumCulled = false;
    object.userData.opacity = opacity;
    object.userData.year = year;
    guides.add(object);
    return object;
  };
  const turning = [];
  const constellations = () => {
    const threadOf = (mark) => mark.members.threads?.[0] ?? 0;
    const last = new Map();
    const figures = sky.list.map(() => []);
    marks.forEach((mark) => {
      const key = `${mark.period}:${threadOf(mark)}`;
      if (last.has(key)) figures[mark.period].push(...last.get(key), ...mark.position);
      last.set(key, mark.position);
    });
    figures.forEach((figure, k) => {
      if (!figure.length) return;
      const centre = sky.list[k].centre;
      const lines = addGuide(new THREE.LineSegments(geometryOf(figure.map((value, n) => value - centre[n % 3])), lineMaterial(0.34)), 0.34, sky.list[k].end);
      lines.position.set(...centre);
      turning.push({ lines, k });
    });
    const arc = (from, to) => {
      const vertices = [];
      const steps = Math.max(8, Math.ceil((to - from) / 1.5));
      for (let step = 0; step <= steps; step++) vertices.push(...onPath(sky, from + ((to - from) * step) / steps));
      return geometryOf(vertices);
    };
    sky.list.forEach((galaxy, k) => {
      const outline = [];
      for (let step = 0; step <= 120; step++) {
        const angle = (Math.PI * 2 * step) / 120;
        outline.push(galaxy.centre[0] + (galaxy.radius + 1.6) * Math.sin(angle), galaxy.centre[1] + (galaxy.radius + 1.6) * Math.cos(angle), galaxy.centre[2]);
      }
      const ring = new THREE.Line(geometryOf(outline), lineMaterial(0.16, true));
      ring.computeLineDistances();
      addGuide(ring, 0.16, galaxy.start);
      const next = sky.list[k + 1];
      if (next) addGuide(new THREE.Line(arc(galaxy.along + galaxy.radius + 1.6, next.along - next.radius - 1.6), lineMaterial(0.22)), 0.22, next.start);
    });
    const final = sky.list.at(-1);
    const ahead = new THREE.Line(arc(final.along + final.radius + 1.6, sky.length), lineMaterial(0.36, true));
    ahead.computeLineDistances();
    addGuide(ahead, 0.36, today);
  };
  constellations();
  scene.add(guides);

  const MAX_RING_LINES = 8;
  const unitCircle = [];
  for (let step = 0; step <= 120; step++) unitCircle.push(Math.sin((Math.PI * 2 * step) / 120), Math.cos((Math.PI * 2 * step) / 120), 0);
  const ringLines = Array.from({ length: MAX_RING_LINES }, () => {
    const line = new THREE.Line(geometryOf(unitCircle), lineMaterial(0.3, true));
    line.computeLineDistances();
    line.frustumCulled = false;
    line.visible = false;
    scene.add(line);
    return line;
  });
  const yearRing = { list: [], centre: [0, 0, 0], want: 0, fade: 0 };

  const linkBuffer = (opacity) => {
    const positions = new Float32Array(MAX_LINKS * LINK_SEGMENTS * 6);
    const attribute = dynamic(positions, 3);
    const lines = new THREE.LineSegments(new THREE.BufferGeometry().setAttribute("position", attribute), lineMaterial(opacity));
    lines.frustumCulled = false;
    lines.geometry.setDrawRange(0, 0);
    scene.add(lines);
    return { lines, attribute, positions, indices: [], fade: 0, opacity };
  };
  const strong = linkBuffer(0.7);
  const soft = linkBuffer(0.3);
  const previewLine = linkBuffer(1);
  const MAX_JUMPS = 160;
  const jumpPositions = new Float32Array(MAX_JUMPS * LINK_SEGMENTS * 6);
  const jumpAttribute = dynamic(jumpPositions, 3);
  const jumpLines = new THREE.LineSegments(new THREE.BufferGeometry().setAttribute("position", jumpAttribute), lineMaterial(0.6));
  jumpLines.frustumCulled = false;
  jumpLines.geometry.setDrawRange(0, 0);
  scene.add(jumpLines);
  const hop = { pairs: [], fade: 0 };
  const arcInto = (positions, n, from, to, lift, span = 1) => {
    for (let segment = 0; segment < LINK_SEGMENTS; segment++) {
      for (const [slot, t] of [[0, (segment / LINK_SEGMENTS) * span], [1, ((segment + 1) / LINK_SEGMENTS) * span]]) {
        const base = ((n * LINK_SEGMENTS + segment) * 2 + slot) * 3;
        positions[base] = lerp(from.x, to.x, t);
        positions[base + 1] = lerp(from.y, to.y, t);
        positions[base + 2] = lerp(from.z, to.z, t) + 4 * t * (1 - t) * lift;
      }
    }
  };
  const reach = { map: new Map() };
  const arcFrom = new THREE.Vector3();
  const arcTo = new THREE.Vector3();
  const arcAt = new THREE.Vector3();

  const view = { target: [...CENTRE], distance: 700, yaw: 0, pitch: HOME_PITCH };
  const goal = { target: [...CENTRE], distance: 340, yaw: 0, pitch: HOME_PITCH };
  const inset = { x: 0, y: 0, goalX: 0, goalY: 0 };
  const state = { reveal: null, follow: -1, idle: true, hover: -1, selection: -1, preview: -1, previewFade: 0, ringFade: 0, portrait: innerWidth / innerHeight < 1, drift: 0 };

  const extent = Math.max(...[...marks.map((mark) => mark.position), future.book, future.clone].map((point) => Math.hypot(point[0], point[1]))) + 12;
  const homeDistance = () => Math.max(160, extent * 4.3) * (state.portrait ? 1.3 : 1);
  const fovOf = (fov) => Math.min(84, fov * (state.portrait ? 1.5 : 1));

  const spotCount = marks.length + 2;
  const slotOfSpot = (i) => (i < marks.length ? i : i + 2);
  const projected = Array.from({ length: spotCount }, () => ({ x: 0, y: 0, r: 0, on: false, depth: 0 }));
  const scratch = new THREE.Vector3();
  const ndc = new THREE.Vector3();

  const project = (world, out = {}) => {
    ndc.copy(world).project(camera);
    out.x = (ndc.x * 0.5 + 0.5) * innerWidth;
    out.y = (-ndc.y * 0.5 + 0.5) * innerHeight;
    out.visible = ndc.z > -1 && ndc.z < 1;
    return out;
  };

  const fly = ({ target, distance, yaw, pitch, follow = -1 } = {}) => {
    if (target) goal.target = [...target];
    if (distance !== undefined) goal.distance = clamp(distance, 6, 640);
    if (yaw !== undefined) goal.yaw = yaw;
    if (pitch !== undefined) goal.pitch = pitch;
    state.follow = follow;
  };
  const home = (pitch = HOME_PITCH) => fly({ target: CENTRE, distance: homeDistance(), yaw: 0, pitch });

  const background = new THREE.Color();
  const applyTheme = () => {
    const css = getComputedStyle(document.documentElement);
    background.set(css.getPropertyValue("--bg").trim());
    ink.value.set(css.getPropertyValue("--fg").trim());
    lineMaterials.forEach(({ material }) => material.color.copy(ink.value));
    const night = background.getHSL({}).l < 0.5;
    renderer.setClearColor(background, 1);
    dustMaterial.blending = starMaterial.blending = night ? THREE.AdditiveBlending : THREE.NormalBlending;
    starUniforms.uGain.value = night ? 1.25 : 0.4;
    starUniforms.uHalo.value = night ? 1 : 0;
    starMaterial.needsUpdate = true;
    markMaterial.blending = THREE.NormalBlending;
    dustUniforms.uGain.value = (night ? 0.55 : 0.6) * gain;
    dustMaterial.needsUpdate = true;
  };
  applyTheme();

  const resize = () => {
    state.portrait = innerWidth / innerHeight < 1;
    camera.aspect = innerWidth / innerHeight;
    renderer.setSize(innerWidth, innerHeight, false);
  };
  resize();

  const pointers = new Map();
  const brush = { x: 0, y: 0, on: false, fine: matchMedia("(pointer: fine)").matches && !reducedMotion(), strength: 0 };
  const gesture = { moved: false, pinch: 0, button: 0 };
  const callbacks = { hover: () => {}, click: () => {}, frame: () => {}, touch: () => {}, error: (error) => console.error(error) };
  let running = true;
  const pick = (x, y) => {
    let best = -1;
    let bestScore = 1;
    projected.forEach((spot, i) => {
      if (!spot.on) return;
      const reach = Math.max(26, spot.r * 0.9);
      const score = Math.hypot(spot.x - x, spot.y - y) / reach;
      if (score < bestScore) [best, bestScore] = [i, score];
    });
    return best;
  };
  const release = () => {
    state.idle = false;
    callbacks.touch();
  };
  const pan = (dx, dy) => {
    goal.target = slide(goal, dx, dy, innerHeight, (camera.fov * Math.PI) / 180);
    state.follow = -1;
  };
  canvas.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button > 2) return;
    canvas.setPointerCapture(event.pointerId);
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY, startX: event.clientX, startY: event.clientY });
    if (pointers.size === 1) Object.assign(gesture, { moved: false, button: event.button, pinch: 0, shift: event.shiftKey });
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      gesture.pinch = Math.hypot(a.x - b.x, a.y - b.y);
      gesture.moved = true;
    }
    release();
  });
  canvas.addEventListener("pointermove", (event) => {
    const spot = pointers.get(event.pointerId);
    if (!spot) {
      if (event.pointerType === "mouse") callbacks.hover(pick(event.clientX, event.clientY), event);
      return;
    }
    const dx = event.clientX - spot.x;
    const dy = event.clientY - spot.y;
    if (Math.hypot(event.clientX - spot.startX, event.clientY - spot.startY) > DRAG_PIXELS) gesture.moved = true;
    [spot.x, spot.y] = [event.clientX, event.clientY];
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const now = Math.hypot(a.x - b.x, a.y - b.y);
      if (gesture.pinch > 0 && now > 0) goal.distance = zoom(goal.distance, Math.log(gesture.pinch / now));
      gesture.pinch = now;
      pan(dx / 2, dy / 2);
      return;
    }
    if (!gesture.moved) return;
    if (gesture.button === 2 || gesture.button === 1 || gesture.shift) pan(dx, dy);
    else Object.assign(goal, turn(goal, -dx * 0.005, dy * 0.004));
  });
  const lift = (event) => {
    const spot = pointers.get(event.pointerId);
    pointers.delete(event.pointerId);
    if (spot && !gesture.moved && pointers.size === 0 && event.type === "pointerup" && gesture.button === 0) callbacks.click(pick(event.clientX, event.clientY), event);
  };
  canvas.addEventListener("pointerup", lift);
  canvas.addEventListener("pointercancel", lift);
  canvas.addEventListener("pointerleave", () => {
    brush.on = false;
    callbacks.hover(-1);
  });
  canvas.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;
    brush.on = brush.fine;
    brush.x = (event.clientX / innerWidth) * 2 - 1;
    brush.y = -(event.clientY / innerHeight) * 2 + 1;
  });
  canvas.addEventListener("contextmenu", (event) => event.preventDefault());
  canvas.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      const pixels = event.deltaY * (event.deltaMode === 1 ? 40 : event.deltaMode === 2 ? innerHeight : 1);
      goal.distance = zoom(goal.distance, clamp(pixels * (event.ctrlKey ? 0.012 : 0.0016), -0.5, 0.5));
      release();
    },
    { passive: false },
  );

  const timer = new THREE.Timer();
  const target = new THREE.Vector3();
  const here = new THREE.Vector3();
  let started = 0;
  let levelsMoving = true;

  const frame = (now) => {
    if (!running) return;
    timer.update(now);
    const dt = Math.min(Math.max(timer.getDelta(), 0), 0.25);
    if (document.hidden) {
      requestAnimationFrame(frame);
      return;
    }
    const time = timer.getElapsed();
    started ||= time;
    const intro = Math.min(1, Math.max(0, (time - DISCOVER.delay) / DISCOVER.seconds));

    if (state.follow >= 0) {
      centerOf(state.follow, here);
      goal.target = here.toArray();
    }
    const next = approach(view, goal, dt, RATE);
    Object.assign(view, next);
    inset.x += (inset.goalX - inset.x) * (1 - Math.exp(-RATE * dt));
    inset.y += (inset.goalY - inset.y) * (1 - Math.exp(-RATE * dt));
    state.drift += ((state.idle && state.follow < 0 ? 1 : 0) - state.drift) * (1 - Math.exp(-dt));
    const [ex, ey, ez] = eye({ ...view, yaw: view.yaw + Math.sin(time * 0.07) * 0.1 * state.drift });
    camera.position.set(ex, ey, ez);
    camera.fov = fovOf(36);
    camera.updateProjectionMatrix();
    camera.lookAt(view.target[0], view.target[1], view.target[2]);
    camera.setViewOffset(innerWidth, innerHeight, -inset.x, -inset.y, innerWidth, innerHeight);
    camera.updateMatrixWorld();
    const cssScale = innerHeight / (2 * Math.tan((camera.fov * Math.PI) / 360));
    const far = smoothstep(0.35, 0.75, view.distance / homeDistance());

    const turned = Math.max(0, time - DISCOVER.delay - DISCOVER.seconds - 0.5);
    sky.list.forEach((galaxy, k) => {
      if (k >= SPIN.slots) return;
      spinning[k] = spinAngle(galaxy, turned);
      dustUniforms.uSpin.value[k] = spinning[k];
    });
    turning.forEach(({ lines, k }) => (lines.rotation.z = spinning[k] ?? 0));
    const spinTag = spinning[0].toFixed(3);
    if (canvas.dataset.spin !== spinTag) canvas.dataset.spin = spinTag;
    brush.strength = ease(brush.strength, brush.on ? 1 : 0, dt, POINTER.rate);
    dustUniforms.uPointer.value.set(brush.x, brush.y, brush.strength);
    const pushTag = brush.strength.toFixed(2);
    if (canvas.dataset.pointer !== pushTag) canvas.dataset.pointer = pushTag;
    dustUniforms.uMix.value = intro;
    const formed = yearOf(sky, formedAt(intro));
    dustUniforms.uTime.value = markUniforms.uTime.value = starUniforms.uTime.value = time;
    starUniforms.uPixel.value = renderer.getPixelRatio();
    dustUniforms.uFar.value = far;
    dustUniforms.uScale.value = markUniforms.uScale.value = (renderer.domElement.height / (2 * Math.tan((camera.fov * Math.PI) / 360)));
    markUniforms.uReveal.value = Math.min(1, formedAt(intro));

    levelsMoving = false;
    for (let i = 0; i < levelNow.length; i++) {
      const delta = levelGoal[i] - levelNow[i];
      if (Math.abs(delta) > 0.002) {
        levelNow[i] += delta * (1 - Math.exp(-7 * dt));
        levelsMoving = true;
      } else levelNow[i] = levelGoal[i];
    }
    if (levelsMoving) levelTexture.needsUpdate = true;

    const set = (index, show) => {
      centerOf(marks.length + index, scratch);
      markPosition.setXYZ(index, scratch.x, scratch.y, scratch.z);
      markFade.setX(index, show);
    };
    const reached = (year) => (dustUniforms.uReveal.value >= unitsOf(year) ? 1 : 0);
    set(0, reached(today));
    set(1, reached(today));
    set(2, reached(lastYear));
    set(3, reached(lastYear));
    if (state.selection >= 0) {
      centerOf(state.selection, scratch);
      markPosition.setXYZ(RING, scratch.x, scratch.y, scratch.z);
      markSize.setX(RING, 2.2 * marks[state.selection].spread + 2);
    }
    state.ringFade += ((state.selection >= 0 ? 1 : 0) - state.ringFade) * (1 - Math.exp(-6 * dt));
    markFade.setX(RING, state.ringFade);
    if (state.preview >= 0) {
      centerOf(state.preview, arcAt);
      markPosition.setXYZ(PREVIEW, arcAt.x, arcAt.y, arcAt.z);
      markSize.setX(PREVIEW, 2.2 * marks[state.preview].spread + 2);
    }
    state.previewFade += ((state.preview >= 0 ? 1 : 0) - state.previewFade) * (1 - Math.exp(-9 * dt));
    markFade.setX(PREVIEW, state.previewFade);
    markPosition.needsUpdate = markSize.needsUpdate = markFade.needsUpdate = true;
    const viewTag = `${view.yaw.toFixed(2)},${view.pitch.toFixed(2)},${view.distance.toFixed(0)}`;
    if (canvas.dataset.view !== viewTag) canvas.dataset.view = viewTag;
    const resting =
      Math.abs(Math.log(view.distance / goal.distance)) < 0.004 &&
      Math.abs(Math.sin(view.yaw - goal.yaw)) < 0.003 &&
      Math.abs(view.pitch - goal.pitch) < 0.003 &&
      view.target.every((value, axis) => Math.abs(value - goal.target[axis]) < 0.03) &&
      Math.abs(inset.x - inset.goalX) < 0.5 &&
      Math.abs(inset.y - inset.goalY) < 0.5;
    const restTag = resting ? "1" : "";
    if (canvas.dataset.rest !== restTag) canvas.dataset.rest = restTag;
    const ringTag = state.selection >= 0 ? `${scratch.x.toFixed(2)},${scratch.y.toFixed(2)},${scratch.z.toFixed(2)}` : "";
    if (canvas.dataset.ring !== ringTag) canvas.dataset.ring = ringTag;
    const previewTag = state.preview >= 0 ? String(state.preview) : "";
    if (canvas.dataset.preview !== previewTag) canvas.dataset.preview = previewTag;

    const form = smoothstep(0.25, 0.9, intro);
    const drawn = Math.min(formed, state.reveal ?? Infinity);
    guides.visible = form > 0.01;
    guides.children.forEach((object) => (object.material.opacity = object.userData.opacity * form * Math.min(1, Math.max(0, (drawn - object.userData.year) / 2))));
    previewLine.indices = state.preview >= 0 && state.selection >= 0 && state.preview !== state.selection ? [state.preview] : [];
    for (const links of [strong, soft, previewLine]) {
      const want = links.indices.length ? 1 : 0;
      links.fade += (want - links.fade) * (1 - Math.exp(-5 * dt));
      const used = Math.min(links.indices.length, MAX_LINKS);
      if (used) {
        centerOf(state.selection, here);
        links.indices.slice(0, used).forEach((index, n) => {
          centerOf(index, target);
          arcInto(links.positions, n, here, target, here.distanceTo(target) * 0.22, reach.map.get(index) ?? 1);
        });
        links.attribute.needsUpdate = true;
      }
      links.lines.geometry.setDrawRange(0, used * LINK_SEGMENTS * 2);
      links.lines.material.opacity = links.opacity * links.fade;
      links.lines.visible = links.fade > 0.01;
    }

    yearRing.fade += (yearRing.want - yearRing.fade) * (1 - Math.exp(-5 * dt));
    ringLines.forEach((line, n) => {
      const ring = yearRing.list[n];
      line.visible = !!ring && yearRing.fade > 0.01;
      if (!line.visible) return;
      line.position.set(...yearRing.centre);
      line.scale.setScalar(ring.radius);
      line.material.dashSize = 0.5 / ring.radius;
      line.material.gapSize = 1.6 / ring.radius;
      line.material.opacity = 0.34 * yearRing.fade * form;
    });
    const ringsTag = yearRing.want && yearRing.fade > 0.5 ? String(yearRing.list.length) : "";
    if (canvas.dataset.rings !== ringsTag) canvas.dataset.rings = ringsTag;

    const hopWeight = form;
    hop.fade += ((hop.pairs.length ? 1 : 0) - hop.fade) * (1 - Math.exp(-5 * dt));
    const hops = Math.min(hop.pairs.length, MAX_JUMPS);
    if (hops && hopWeight > 0.01) {
      hop.pairs.slice(0, hops).forEach(([from, to, across], n) => {
        centerOf(from, here);
        centerOf(to, target);
        arcInto(jumpPositions, n, here, target, here.distanceTo(target) * (across ? 0.3 : 0.12));
      });
      jumpAttribute.needsUpdate = true;
    }
    jumpLines.geometry.setDrawRange(0, hops * LINK_SEGMENTS * 2);
    jumpLines.material.opacity = 0.6 * hop.fade * hopWeight;
    jumpLines.visible = jumpLines.material.opacity > 0.01;
    canvas.dataset.jumps = jumpLines.visible ? String(hops) : "";

    renderer.render(scene, camera);

    projected.forEach((spot, i) => {
      centerOf(slotOfSpot(i), scratch);
      ndc.copy(scratch).project(camera);
      spot.x = (ndc.x * 0.5 + 0.5) * innerWidth;
      spot.y = (-ndc.y * 0.5 + 0.5) * innerHeight;
      spot.depth = camera.position.distanceTo(scratch);
      spot.r = ((marks[i]?.spread ?? RING_SPREAD) * 2.4 * cssScale) / spot.depth;
      spot.on = ndc.z > -1 && ndc.z < 1 && spot.x > 0 && spot.x < innerWidth && spot.y > 0 && spot.y < innerHeight;
    });
    try {
      callbacks.frame({ time, dt, intro, formed, far, cssScale, projected, camera });
    } catch (error) {
      running = false;
      callbacks.error(error);
      return;
    }
    if (running) requestAnimationFrame(frame);
  };

  return {
    camera,
    view,
    goal,
    inset,
    state,
    projected,
    on: (name, handler) => (callbacks[name] = handler),
    stop: () => (running = false),
    setQuality: (tier) => {
      const step = QUALITY.tiers[Math.min(tier, QUALITY.tiers.length - 1)];
      dustUniforms.uKeep.value = step.keep;
      renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 2, step.ratio));
      renderer.setSize(innerWidth, innerHeight, false);
    },
    start: () => requestAnimationFrame(frame),
    home,
    homeDistance,
    fly,
    pick,
    centerOf: (index) => centerOf(index, new THREE.Vector3()),
    project,
    resize,
    applyTheme,
    setLevels: (levels) => levels.forEach((level, i) => (levelGoal[i] = level)),
    setFilter: (filter) => {
      dustUniforms.uFilterFacet.value = filter ? ["threads", "people", "places"].indexOf(filter.facet) : -1;
      dustUniforms.uFilterItem.value = filter ? filter.item : -1;
    },
    setFocus: (year) => {
      dustUniforms.uFocusOn.value = year === null ? 0 : 1;
      if (year !== null) dustUniforms.uFocusU.value = unitsOf(year);
    },
    setSelection: (index) => (state.selection = index),
    setPreview: (index) => (state.preview = index),
    setJumps: (pairs) => (hop.pairs = pairs),
    slotOf: (name) => ({ today: marks.length, book: marks.length + 2, clone: marks.length + 3 })[name],
    setReveal: (year) => {
      dustUniforms.uReveal.value = year === null ? 1e4 : unitsOf(year);
      state.reveal = year;
    },
    setLinks: (explicit, near) => {
      strong.indices = explicit;
      soft.indices = near;
      canvas.dataset.links = String(explicit.length + near.length);
    },
    setInset: (x, y) => {
      inset.goalX = x;
      inset.goalY = y;
    },
    setIdle: (idle) => (state.idle = idle),
    setLinkReach: (map) => (reach.map = map),
    groundAt: (sx, sy, z) => {
      ndc.set((sx / innerWidth) * 2 - 1, -(sy / innerHeight) * 2 + 1, 0.5).unproject(camera);
      ndc.sub(camera.position).normalize();
      const along = (z - camera.position.z) / ndc.z;
      const reachLimit = 2600;
      const t = Number.isFinite(along) && along > 0 ? Math.min(along, reachLimit) : reachLimit;
      return [camera.position.x + ndc.x * t, camera.position.y + ndc.y * t];
    },
    arcScreen: (from, to, t, out = {}) => {
      centerOf(from, arcFrom);
      centerOf(to, arcTo);
      arcAt.set(lerp(arcFrom.x, arcTo.x, t), lerp(arcFrom.y, arcTo.y, t), lerp(arcFrom.z, arcTo.z, t) + 4 * t * (1 - t) * arcFrom.distanceTo(arcTo) * 0.22);
      return project(arcAt, out);
    },
    setYearRings: (centre, list) => {
      if (list.length) Object.assign(yearRing, { list, centre, want: 1 });
      else yearRing.want = 0;
    },
  };
}
