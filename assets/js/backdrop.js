import * as THREE from "three";
import { BACKDROP, deepField, farGalaxies, glowOf } from "./life.js";
import { STAR_FRAGMENT, STAR_VERTEX } from "./shaders.js";
import { reducedMotion, seeded, smoothstep } from "./util.js";

const LAYERS = { deep: 0.6, far: 0.5, haze: 0.5, glow: 0.7 };

const DOME_VERTEX = `
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const DOME_FRAGMENT = `
  uniform sampler2D uMap;
  uniform vec3 uInk;
  uniform vec3 uOffset;
  uniform float uTime;
  uniform float uFar;
  uniform float uHaze;
  uniform float uHazeMax;
  varying vec3 vDir;
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x), mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x), mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
      f.z);
  }
  void main() {
    vec3 dir = normalize(vDir);
    vec2 uv = vec2(atan(dir.y, dir.x) / 6.2831853 + 0.5, acos(clamp(dir.z, -1.0, 1.0)) / 3.1415927);
    vec4 t = texture2D(uMap, uv);
    vec3 q = dir * 2.2 + uOffset + vec3(uTime, uTime * 0.6, 0.0);
    float cloud = 0.55 * noise(q) + 0.3 * noise(q * 2.1) + 0.15 * noise(q * 4.3);
    float haze = uHaze * uHazeMax * smoothstep(0.38, 0.8, cloud);
    gl_FragColor = vec4(uInk, clamp(t.g * uFar + haze, 0.0, 1.0));
  }
`;

const poleWidth = (v) => 1 / Math.max(0.2, Math.sin(v * Math.PI));

function bake(width) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = width / 2;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, width / 2);
  ctx.globalCompositeOperation = "lighter";
  const random = seeded(7);
  const paint = (channel, alpha) => `rgba(${channel === 0 ? 255 : 0},${channel === 1 ? 255 : 0},${channel === 2 ? 255 : 0},${alpha})`;

  for (const galaxy of farGalaxies({ random })) {
    ctx.save();
    ctx.translate(galaxy.u * width, galaxy.v * (width / 2));
    ctx.rotate(galaxy.angle);
    ctx.scale(poleWidth(galaxy.v), galaxy.squash);
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, galaxy.radius);
    gradient.addColorStop(0, paint(1, galaxy.alpha));
    gradient.addColorStop(0.35, paint(1, galaxy.alpha * 0.35));
    gradient.addColorStop(1, paint(1, 0));
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, galaxy.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  return canvas;
}

function glowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.4, "rgba(255,255,255,0.35)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}

export function createBackdrop({ scene, sky, mobile, ink, star }) {
  const still = reducedMotion();
  const layers = { ...LAYERS };
  const texture = new THREE.CanvasTexture(bake(2048));
  texture.minFilter = texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.wrapS = THREE.RepeatWrapping;

  const uniforms = {
    uMap: { value: texture },
    uInk: ink,
    uOffset: { value: new THREE.Vector3() },
    uTime: { value: 0 },
    uFar: { value: 0 },
    uHaze: { value: 0 },
    uHazeMax: { value: BACKDROP.haze.alpha },
  };
  const material = new THREE.ShaderMaterial({ uniforms, vertexShader: DOME_VERTEX, fragmentShader: DOME_FRAGMENT, transparent: true, side: THREE.BackSide, depthTest: false, depthWrite: false });
  const dome = new THREE.Mesh(new THREE.SphereGeometry(1500, 48, 24), material);
  dome.frustumCulled = false;
  dome.renderOrder = -3;
  scene.add(dome);

  const centre = [0, 1, 2].map((k) => sky.list.reduce((sum, galaxy) => sum + galaxy.centre[k], 0) / sky.list.length);
  const reach = Math.max(...sky.list.map((galaxy) => Math.hypot(...galaxy.centre.map((value, k) => value - centre[k])) + galaxy.radius * 2));
  const field = deepField({ count: mobile ? BACKDROP.deep.mobile : BACKDROP.deep.count, random: seeded(7), centre, inner: Math.min(BACKDROP.deep.radius / 3, Math.max(reach * 1.15, BACKDROP.deep.inner / 4)) });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(field.position, 3));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(field.seed, 1));
  geometry.setAttribute("aBright", new THREE.BufferAttribute(field.bright, 1));
  geometry.setAttribute("aHalo", new THREE.BufferAttribute(new Float32Array(field.count), 1));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(field.size, 1));
  const deepUniforms = { uTime: star.uTime, uPixel: star.uPixel, uInk: ink, uGain: { value: 0 }, uHalo: { value: 0 } };
  const deepMaterial = new THREE.ShaderMaterial({ uniforms: deepUniforms, vertexShader: STAR_VERTEX, fragmentShader: STAR_FRAGMENT, transparent: true, depthTest: false, depthWrite: false });
  const deep = new THREE.Points(geometry, deepMaterial);
  deep.frustumCulled = false;
  deep.renderOrder = -2;
  scene.add(deep);

  const most = Math.max(1, ...sky.list.map((galaxy) => galaxy.count));
  const map = glowTexture();
  const glows = sky.list.map((galaxy) => {
    const { scale, strength } = glowOf(galaxy, most);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map, color: 0xffffff, transparent: true, depthTest: false, depthWrite: false, opacity: 0 }));
    sprite.position.set(...galaxy.centre);
    sprite.scale.set(scale, scale, 1);
    sprite.renderOrder = -2;
    scene.add(sprite);
    return { sprite, strength, scale, galaxy, reveal: 0 };
  });

  const state = { night: true, quiet: false, dim: 1, formed: Infinity, sky: 1, boost: 1 };

  const sync = () => {
    deepUniforms.uGain.value = layers.deep * state.sky * state.boost * (state.night ? 1.25 : 0.4);
    deep.visible = layers.deep > 0.001;
    uniforms.uFar.value = layers.far * state.sky;
    uniforms.uHaze.value = state.quiet ? 0 : layers.haze * state.sky;
    dome.visible = uniforms.uFar.value + uniforms.uHaze.value > 0.001;
    glows.forEach(({ sprite, strength, scale, galaxy }) => {
      const reveal = smoothstep(galaxy.start, galaxy.end, state.formed);
      sprite.scale.set(scale * (0.55 + 0.45 * reveal), scale * (0.55 + 0.45 * reveal), 1);
      sprite.material.opacity = strength * layers.glow * state.dim * reveal * (state.night ? 1 : 0.5);
      sprite.visible = sprite.material.opacity > 0.002;
      sprite.material.color.copy(ink.value);
    });
  };

  return {
    applyTheme: (night) => {
      state.night = night;
      material.blending = night ? THREE.AdditiveBlending : THREE.NormalBlending;
      material.needsUpdate = true;
      deepMaterial.blending = night ? THREE.AdditiveBlending : THREE.NormalBlending;
      deepMaterial.needsUpdate = true;
      glows.forEach(({ sprite }) => {
        sprite.material.blending = night ? THREE.AdditiveBlending : THREE.NormalBlending;
        sprite.material.needsUpdate = true;
      });
      sync();
    },
    setTier: (tier) => {
      state.quiet = tier >= 2;
      sync();
    },
    setDim: (value) => {
      state.dim = value;
      sync();
    },
    update: (time, camera, formed, sky = 1, boost = 1) => {
      if (formed !== state.formed || sky !== state.sky || boost !== state.boost) {
        state.formed = formed;
        state.sky = sky;
        state.boost = boost;
        sync();
      }
      dome.position.copy(camera.position);
      uniforms.uOffset.value.copy(camera.position).multiplyScalar(0.0004);
      uniforms.uTime.value = still ? 0 : time * 0.01;
    },
  };
}
