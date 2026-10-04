import * as THREE from "three";
import { BUDGET, FACETS, FLOOR, RAIL, START, futures, layout, memories, playElapsed, monthsUntil, playYear, railPercent, skyOf, todayYear, untilText, yearRings } from "./life.js";
import { askLevels, askPairs, edgeExit, edgeLabel, edgeSide, filtersFor, galaxyAt, headlines, jumps, leaderOf, levels as levelsOf, matching, perGalaxy, miniMap, miniVisible, QUALITY, averageMs, nextQuality, pickSpot, related, ringClearance, search, sequence, stackEdgeLabels, strongest, tagSpots, tourPlan, tourTick } from "./explore.js";
import { clamp } from "./orbit.js";
import { createSound } from "./sound.js";
import { OVERVIEW_PITCH, createScene } from "./scene.js";
import { ENTRANCE } from "./shaders.js";
import { reducedMotion, seeded, webglAvailable } from "./util.js";

const SCENE_FITS = "(min-height: 520px) and (min-width: 320px)";
const STACKED = "(max-width: 900px), (max-aspect-ratio: 1/1)";
const KEEP_TOP = 74;
const KEEP_BOTTOM = 124;
const MAX_TAGS = 24;
const MAX_RELATED = 8;
const AHEAD_GAPS = [0, 22];
const RING_UNITS = { today: 2.4, book: 1.2, clone: 1.2 };
const YEAR_RING_MAX = 8;
const EDGE_SAMPLES = 20;
const EDGE_MARKS = 2;
const MAX_LINKS_CUT = 40;
const MINI = { width: 104, height: 100, top: 118 };
const SVG_NS = "http://www.w3.org/2000/svg";
const stackedQuery = matchMedia(STACKED);
const YEAR_RING_ANGLE = 0.9;
const AHEAD_SIDES = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]];
const FIT_KINDS = new Set(["hero", "contact"]);
const FIT_LEVELS = ["1", "2", "3"];

const undo = [];

const flatten = () => {
  while (undo.length) undo.pop()();
  document.documentElement.classList.remove("immersive");
  document.documentElement.classList.add("flat");
};

export function mount() {
  if (!webglAvailable() || reducedMotion()) return flatten();
  const fits = matchMedia(SCENE_FITS);
  fits.addEventListener("change", () => location.reload());
  if (!fits.matches) return flatten();
  start().catch((error) => { console.error(error); flatten(); });
}

function splitWords(root) {
  let index = 0;
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const fragment = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) return fragment.append(part);
          const piece = document.createElement("span");
          piece.className = "w";
          piece.style.setProperty("--i", index++);
          piece.textContent = part;
          fragment.append(piece);
        });
        child.replaceWith(fragment);
      } else if (child.nodeType === Node.ELEMENT_NODE) walk(child);
    });
  };
  walk(root);
}

const element = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

const csv = (value) => (value ? value.split(",") : []);

async function start() {
  const canvas = document.getElementById("scene");
  const stage = document.querySelector(".stage");
  const story = document.querySelector("main.story");
  const hud = document.querySelector(".hud");
  const rail = document.querySelector(".rail");
  const masthead = document.querySelector(".masthead");
  const tools = document.querySelector(".explore");
  const today = todayYear();
  const mobile = matchMedia("(max-width: 760px)").matches;
  const facets = JSON.parse(tools.dataset.facets);
  const ahead = JSON.parse(tools.dataset.ahead);
  const periods = JSON.parse(tools.dataset.periods ?? "[]");

  const stations = [...story.querySelectorAll("[data-station]")].map((node, t) => ({
    element: node,
    kind: node.dataset.station,
    id: node.id,
    label: node.dataset.hud,
    t,
    panel: node.matches("[data-panel]") ? node : node.querySelector("[data-panel]"),
  }));
  const END = stations.length - 1;
  const indexOf = (kind) => stations.findIndex((station) => station.kind === kind);
  const [bookAt, cloneAt, contactAt, heroAt] = ["book", "clone", "contact", "hero"].map(indexOf);
  const lived = stations.filter((station) => station.kind === "milestone");
  const entries = lived.map(({ element: node }) => ({
    id: node.dataset.milestone,
    date: node.dataset.date,
    weight: +node.dataset.weight,
    period: node.dataset.period,
    links: csv(node.dataset.links),
    ...Object.fromEntries(FACETS.map((facet) => [facet, csv(node.dataset[facet])])),
  }));
  const marks = layout(entries, facets, { periods, today });
  const sky = skyOf(entries, marks.map((mark) => mark.year), { periods, today });
  const markOf = new Map(lived.map((station, i) => [station.t, i]));
  const asks = new Map([...story.querySelectorAll("li[data-ask]")].map((item) => [item.dataset.ask, new Set(csv(item.dataset.memories).map((id) => lived.findIndex((station) => station.element.dataset.milestone === id)).filter((i) => i >= 0))]));
  let asked = null;
  const names = Object.fromEntries(FACETS.map((facet) => [facet, {}]));
  story.querySelectorAll("ul.facets").forEach((list) => list.querySelectorAll("li").forEach((item) => (names[list.dataset.facet][item.dataset.item] = item.textContent)));
  const info = lived.map((station) => ({
    time: station.element.querySelector("time").textContent,
    title: station.element.querySelector("h3").textContent,
    body: station.element.querySelector("p:not(.kicker):not(.intro)").textContent,
  }));
  const finderItems = lived.map((station, i) => ({
    index: i,
    id: station.id,
    title: info[i].title,
    body: info[i].body,
    extra: `${info[i].time} ${FACETS.flatMap((facet) => (marks[i].members[facet] ?? []).map((item) => names[facet][facets[facet][item]] ?? "")).join(" ")}`,
    weight: marks[i].weight,
    order: i,
  }));

  const cloud = memories({ marks, today, random: seeded(1980), facets, sky, cap: mobile ? 55000 : BUDGET.cap, trail: mobile ? 12000 : BUDGET.trail });
  const future = futures(sky);
  const heads = new Set(headlines(marks));
  const scene = createScene({ canvas, cloud, marks, future, today, mobile, sky, kinds: lived.map((station) => station.element.dataset.kind) });
  const root = document.documentElement;
  let entering = false;
  const born = new Set();
  let enterTimer = 0;
  const beginEntering = () => {
    clearTimeout(enterTimer);
    entering = true;
    root.dataset.entering = "1";
    enterTimer = setTimeout(() => finishEntering(), 20000);
  };
  const finishEntering = () => {
    if (!entering) return;
    entering = false;
    clearTimeout(enterTimer);
    root.dataset.entering = "out";
    enterTimer = setTimeout(() => delete root.dataset.entering, 1600);
  };
  undo.push(() => {
    clearTimeout(enterTimer);
    delete root.dataset.entering;
  });
  const automated = navigator.webdriver;
  const direct = location.hash.length > 1;
  if (!automated && !direct) beginEntering();
  scene.home();
  scene.start();
  const firstMemory = marks.reduce((best, mark, i) => (mark.year < marks[best].year ? i : best), 0);
  const seed = element("button", "seed");
  seed.type = "button";
  seed.setAttribute("aria-label", info[firstMemory].title);
  let begun = false;
  let autoTimer = 0;
  const beginGestures = ["pointerup", "touchend", "click", "keydown"];
  const dropBeginGestures = () => beginGestures.forEach((type) => document.removeEventListener(type, begin, true));
  function begin() {
    if (begun) return;
    begun = true;
    clearTimeout(autoTimer);
    dropBeginGestures();
    scene.begin(automated ? "still" : direct ? "direct" : "full");
    seed.dataset.gone = "1";
    setTimeout(() => seed.remove(), 1600);
  }
  if (automated || direct) begin();
  else {
    document.body.append(seed);
    autoTimer = setTimeout(begin, ENTRANCE.wait * 1000);
    beginGestures.forEach((type) => document.addEventListener(type, begin, true));
  }
  undo.push(() => {
    clearTimeout(autoTimer);
    dropBeginGestures();
    seed.remove();
  });
  const qualityParam = new URLSearchParams(location.search).get("quality");
  let tier = qualityParam === "low" ? QUALITY.tiers.length - 1 : 0;
  const adapting = qualityParam !== "full" && qualityParam !== "low";
  const measure = { frames: [], windows: 0, from: 0 };
  scene.setQuality(tier);
  canvas.dataset.quality = String(tier);
  const sound = createSound();

  const labels = element("div", "labels");
  stage.append(labels);
  undo.push(() => labels.remove());

  const tags = marks.map((mark, i) => {
    const node = element("div", "tag");
    node.innerHTML = '<b></b><span></span><i class="leader"></i>';
    node.querySelector("b").textContent = info[i].time;
    node.querySelector("span").textContent = info[i].title;
    node.setAttribute("aria-hidden", "true");
    labels.append(node);
    return { node, leader: node.querySelector(".leader"), width: 0, height: 0, on: false };
  });

  const edgeMarks = Array.from({ length: EDGE_MARKS }, () => {
    const node = element("button", "edge-mark");
    node.type = "button";
    node.hidden = true;
    node.tabIndex = -1;
    node.setAttribute("aria-hidden", "true");
    node.innerHTML = "<span></span><i></i>";
    labels.append(node);
    node.addEventListener("click", () => select(stationOf(+node.dataset.memory)));
    return { node, label: node.querySelector("span"), arrow: node.querySelector("i"), width: 0, height: 0 };
  });
  let outKey = "";
  const arcSamples = Array.from({ length: EDGE_SAMPLES + 1 }, () => ({ x: 0, y: 0, visible: true }));

  const fixed = [];
  const addFixed = (text, world, className, base, year = START, ring = 0, spotAt = -1) => {
    const node = element("div", className, text);
    node.setAttribute("aria-hidden", "true");
    labels.append(node);
    fixed.push({ node, world, base, year, kind: className, ring, spotAt, width: 0, height: 0, shown: -1 });
    return node;
  };
  const vector = (point) => new THREE.Vector3(...point);
  addFixed(stage.dataset.today, vector(future.today), "ahead now", 1, today, RING_UNITS.today);
  fixed.at(-1).kind = "ahead";
  const galaxyLabels = [];
  sky.list.forEach((galaxy, k) => {
      const first = story.querySelector(`#period-${periods[k]} [data-station]`);
      if (!first) return;
      const [x, y, z] = galaxy.centre;
      const [ox, oy] = [x + sky.pole[0], y + sky.pole[1]];
      const length = Math.hypot(ox, oy) || 1;
      const reach = galaxy.radius + 9;
      const [name, span] = (first.querySelector(".kicker")?.textContent ?? periods[k]).split(" · ");
      const node = addFixed("", vector([x + (ox / length) * reach, y + (oy / length) * reach, z]), "galaxy", 0.9, (galaxy.start + galaxy.end) / 2);
      node.append(element("span", "", name), ...(span ? [element("span", "galaxy-years", ` · ${span}`)] : []), element("b", "galaxy-count"));
      galaxyLabels[k] = fixed.at(-1);
      node.dataset.go = `period-${periods[k]}`;
      node.addEventListener("click", () => goTo(node.dataset.go));
  });
  const yearLabels = Array.from({ length: YEAR_RING_MAX }, () => {
    addFixed("", new THREE.Vector3(), "ring-year", 0.8, START);
    fixed.at(-1).dim = 0;
    return fixed.at(-1);
  });
  const monthsLeft = stage.dataset.until ? monthsUntil(stage.dataset.until) : -1;
  if (monthsLeft >= 0) addFixed(untilText(monthsLeft, document.documentElement.lang), vector(future.today.map((value, axis) => (value + future.book[axis]) / 2)), "countdown-mark", 0.8, today);
  [["book", tools.dataset.book], ["clone", tools.dataset.clone]].forEach(([name, text], k) => addFixed(text, vector(future[name]), "ahead", 0.6, Infinity, RING_UNITS[name], marks.length + k));

  const card = element("aside", "card");
  card.setAttribute("tabindex", "-1");
  const cardBody = element("div", "card-body");
  const cardSteps = element("nav", "card-steps");
  const previousButton = element("button", "step", "");
  const nextButton = element("button", "step", "");
  previousButton.type = nextButton.type = "button";
  previousButton.dataset.step = "previous";
  nextButton.dataset.step = "next";
  cardSteps.append(previousButton, nextButton);
  const forms = new Map();
  const announce = element("p", "visually-hidden");
  announce.setAttribute("role", "status");
  story.querySelectorAll(".waitlist").forEach((waitlist) => {
    const holder = element("div", "card-form");
    holder.hidden = true;
    holder.dataset.for = waitlist.dataset.list;
    const [homeNode, afterNode] = [waitlist.parentNode, waitlist.nextSibling];
    holder.append(waitlist);
    forms.set(waitlist.dataset.list, holder);
    undo.push(() => homeNode.insertBefore(waitlist, afterNode));
  });
  const closeButton = element("button", "card-close", "✕");
  closeButton.type = "button";
  closeButton.dataset.go = "top";
  closeButton.setAttribute("aria-label", tools.dataset.overview);
  closeButton.setAttribute("title", tools.dataset.overview);
  card.append(closeButton, cardBody, ...forms.values(), cardSteps, announce);
  card.id = "card";
  stage.after(card);
  undo.push(() => card.remove());
  const nudge = element("div", "nudge");
  nudge.hidden = true;
  const nudgeLink = element("a", "");
  const nudgeClose = element("button", "", "✕");
  nudgeClose.type = "button";
  nudge.append(nudgeLink, nudgeClose);
  card.after(nudge);
  undo.push(() => nudge.remove());
  const looseLinks = [...story.querySelectorAll("a, button, input, select, textarea")];
  looseLinks.forEach((node) => node.setAttribute("tabindex", "-1"));
  undo.push(() => looseLinks.forEach((node) => node.removeAttribute("tabindex")));
  const skip = document.querySelector(".skip");
  if (skip) {
    skip.setAttribute("href", "#card");
    undo.push(() => skip.setAttribute("href", "#main"));
  }

  const miniFit = miniMap([...sky.list.flatMap((galaxy) => [[galaxy.centre[0] - galaxy.radius, galaxy.centre[1] - galaxy.radius], [galaxy.centre[0] + galaxy.radius, galaxy.centre[1] + galaxy.radius]]), future.today, future.book, future.clone].map((point) => [point[0], point[1]]), MINI);
  const minimap = element("div", "minimap");
  minimap.hidden = true;
  minimap.setAttribute("aria-hidden", "true");
  const miniSvg = document.createElementNS(SVG_NS, "svg");
  miniSvg.setAttribute("viewBox", `0 0 ${MINI.width} ${MINI.height}`);
  const drawn = (tag, attributes) => {
    const node = document.createElementNS(SVG_NS, tag);
    Object.entries(attributes).forEach(([name, value]) => node.setAttribute(name, value));
    miniSvg.append(node);
    return node;
  };
  sky.list.forEach((galaxy) => {
    const [x, y] = miniFit.to(galaxy.centre);
    drawn("circle", { cx: x.toFixed(1), cy: y.toFixed(1), r: (galaxy.radius * miniFit.scale).toFixed(1), class: "mini-galaxy" });
  });
  const miniDots = marks.map((mark) => {
    const [x, y] = miniFit.to(mark.position);
    return drawn("circle", { cx: x.toFixed(1), cy: y.toFixed(1), r: (0.6 + mark.weight * 0.35).toFixed(2), class: "mini-dot" });
  });
  let miniTick = 0;
  [future.book, future.clone].forEach((point) => {
    const [x, y] = miniFit.to(point);
    drawn("circle", { cx: x.toFixed(1), cy: y.toFixed(1), r: 2, class: "mini-future" });
  });
  const miniFrame = drawn("polygon", { class: "mini-frame" });
  const miniHere = drawn("circle", { r: 3.4, class: "mini-here" });
  minimap.append(miniSvg);
  card.after(minimap);
  undo.push(() => minimap.remove());
  minimap.addEventListener("click", (event) => {
    const box = minimap.getBoundingClientRect();
    const world = miniFit.from([((event.clientX - box.left) * MINI.width) / box.width, ((event.clientY - box.top) * MINI.height) / box.height]);
    const k = galaxyAt(sky.list, world);
    if (k >= 0) goTo(`period-${periods[k]}`);
  });

  const copy = {
    related: tools.dataset.related,
    earlier: tools.dataset.earlier,
    later: tools.dataset.later,
    filter: tools.dataset.filter,
    unfilter: tools.dataset.unfilter,
    more: tools.dataset.more,
    lit: tools.dataset.lit,
    all: tools.dataset.all,
    fewer: tools.dataset.fewer,
    nudgebook: tools.dataset.nudgebook,
    nudgeclone: tools.dataset.nudgeclone,
    nudgeclose: tools.dataset.nudgeclose,
  };

  let current = 0;
  let filter = null;
  let hover = -1;
  let neighbours = { links: [], near: [] };
  let chosen = [];
  let showAll = false;
  const pointerAt = { x: 0, y: 0 };
  const gentle = { on: false, seen: false, from: null };
  const invite = { opened: new Set(), sawClone: false, closed: false };
  const memoryOf = (index) => markOf.get(index) ?? -1;
  const stationOf = (memory) => lived[memory].t;

  const stepOf = (index) => {
    const station = stations[index];
    if (station.kind === "hero") return { previous: null, next: lived[0].t };
    if (station.kind === "milestone") {
      const { previous, next } = sequence(marks, memoryOf(index), filter);
      return { previous: previous !== null ? stationOf(previous) : !filter && memoryOf(index) === 0 ? 0 : null, next: next !== null ? stationOf(next) : !filter ? bookAt : null };
    }
    if (station.kind === "book") return { previous: lived.at(-1).t, next: cloneAt };
    if (station.kind === "clone") return { previous: bookAt, next: null };
    return { previous: null, next: null };
  };

  const refreshScene = () => {
    const memory = memoryOf(current);
    neighbours = memory >= 0 ? related(marks, memory) : { links: [], near: [] };
    const everyone = [...neighbours.links, ...neighbours.near];
    chosen = memory < 0 ? [] : showAll ? everyone : strongest(marks, memory);
    const picked = new Set(chosen);
    const lit = asked ? asks.get(asked) : null;
    const levelNow = lit ? askLevels(marks, lit) : levelsOf(marks, { selected: memory, near: picked, weak: new Set(everyone.filter((i) => !picked.has(i))), filter });
    scene.setLevels(levelNow);
    stage.dataset.levels = [...new Set(levelNow)].sort((a, b) => a - b).join(",");
    scene.setLinks(neighbours.links.filter((i) => picked.has(i)), neighbours.near.filter((i) => picked.has(i)));
    scene.setSelection(memory);
    const rings = !gentle.on && memory >= 0 && marks[memory].period >= 0 ? yearRings(sky.list[marks[memory].period], YEAR_RING_MAX) : [];
    const galaxy = memory >= 0 ? sky.list[marks[memory].period] : null;
    scene.setYearRings(galaxy?.centre ?? null, rings);
    yearLabels.forEach((item, n) => {
      const ring = rings[n];
      item.dim = ring ? 1 : 0;
      if (!ring) return;
      item.node.textContent = String(ring.year);
      item.world.set(galaxy.centre[0] + ring.radius * Math.sin(YEAR_RING_ANGLE), galaxy.centre[1] + ring.radius * Math.cos(YEAR_RING_ANGLE), galaxy.centre[2]);
      item.width = 0;
    });
    scene.setFocus(memory >= 0 ? marks[memory].year : null);
    scene.setFilter(filter);
    const chain = matching(marks, filter);
    scene.setJumps(lit ? askPairs(lit, scene.slotOf("clone")) : jumps(marks, chain));
    if (sky) {
      const counts = perGalaxy(marks, chain, sky.list.length);
      galaxyLabels.forEach((item, k) => {
        if (!item) return;
        item.dim = memory >= 0 && marks[memory].period !== k ? 0 : filter && !counts[k] ? 0.3 : 1;
        item.node.querySelector(".galaxy-count").textContent = filter ? ` · ${counts[k]}` : "";
        item.width = 0;
      });
    }
  };

  const shotOf = (index) => {
    const station = stations[index];
    if (station.kind === "milestone") {
      const mark = marks[memoryOf(index)];
      const galaxy = sky.list[mark.period];
      scene.fly({ target: galaxy.centre.map((value, axis) => value + (mark.position[axis] - value) * 0.35), distance: clamp(galaxy.radius * 4.2 + 16, 40, 130), pitch: clamp(scene.goal.pitch, -0.45, 0.5) });
    } else if (station.kind === "book" || station.kind === "clone") scene.fly({ target: future[station.kind], distance: 54, pitch: clamp(scene.goal.pitch, -0.45, 0.5) });
    else if (station.kind === "contact") scene.fly({ target: [0, 0, FLOOR + 3], distance: scene.homeDistance(), yaw: 0, pitch: OVERVIEW_PITCH });
    else scene.home();
    scene.setIdle(station.kind === "hero");
  };

  const asksIn = (root) =>
    root.querySelectorAll("li[data-ask]").forEach((item) => {
      const button = element("button", "ask-q", item.querySelector(".ask-q").textContent);
      button.type = "button";
      button.dataset.ask = item.dataset.ask;
      button.setAttribute("aria-pressed", String(asked === item.dataset.ask));
      item.replaceChildren(button);
    });

  const setAsk = (id) => {
    asked = id && asks.has(id) && stations[current].kind === "clone" ? id : null;
    stage.dataset.asked = asked ?? "";
    card.querySelectorAll(".ask-q").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.ask === asked)));
    refreshScene();
    if (!asked) return shotOf(current);
    scene.fly({ target: [0, 0, FLOOR + 3], distance: scene.homeDistance(), yaw: 0, pitch: OVERVIEW_PITCH });
    const names = [...asks.get(asked)].map((i) => lived[i].element.querySelector("h3").textContent);
    announce.textContent = copy.lit.replace("{n}", () => String(names.length)).replace("{names}", () => names.join(", "));
  };

  const chipsIn = (root) =>
    root.querySelectorAll("ul.facets").forEach((list) => {
      const facet = list.dataset.facet;
      list.querySelectorAll("li").forEach((item) => {
        const chip = element("button", "chip", item.textContent);
        chip.type = "button";
        chip.dataset.facet = facet;
        chip.dataset.item = item.dataset.item;
        chip.setAttribute("aria-pressed", String(filter?.facet === facet && facets[facet][filter.item] === item.dataset.item));
        chip.setAttribute("title", copy.filter.replace("{thread}", item.textContent));
        item.replaceChildren(chip);
      });
    });

  const relatedIn = (root, memory) => {
    const everyone = [...neighbours.links, ...neighbours.near];
    if (!everyone.length) return;
    const top = strongest(marks, memory);
    const shown = showAll ? everyone.slice(0, MAX_RELATED) : top;
    const block = element("div", "related");
    block.append(element("p", "kicker", copy.related));
    const list = element("ul");
    shown.forEach((i) => {
      const item = element("li");
      const button = element("button", "peer");
      button.type = "button";
      button.dataset.memory = String(i);
      button.append(element("time", "", info[i].time), element("span", "", info[i].title));
      item.append(button);
      list.append(item);
    });
    list.addEventListener("scroll", () => showMore());
    block.append(list);
    if (everyone.length > top.length) {
      const expander = element("button", "expander", showAll ? copy.fewer : copy.all.replace("{n}", String(Math.min(everyone.length, MAX_RELATED))));
      expander.type = "button";
      expander.setAttribute("aria-expanded", String(showAll));
      block.append(expander);
    }
    root.append(block);
  };

  const renderRelated = () => {
    const body = cardBody.firstElementChild;
    const memory = memoryOf(current);
    if (!body || memory < 0) return;
    body.querySelector(".related")?.remove();
    relatedIn(body, memory);
    card.dataset.collapsed = body.querySelector(".expander") && !showAll ? "1" : "";
    showMore();
    cardBody.querySelector(".expander")?.focus({ preventScroll: true });
  };

  const showMore = () => {
    const block = card.querySelector(".related");
    const list = block?.querySelector("ul");
    if (!list) return;
    const bottom = list.getBoundingClientRect().bottom + 2;
    const hidden = [...list.children].filter((row) => row.getBoundingClientRect().bottom > bottom).length;
    block.dataset.more = list.scrollHeight > list.clientHeight + 2 && hidden ? copy.more.replace("{n}", String(hidden)) : "";
  };

  let preview = -1;
  const setPreview = (index) => {
    if (preview === index) return;
    preview = index;
    scene.setPreview(index);
  };

  const fitCard = () => {
    delete card.dataset.fit;
    if (!FIT_KINDS.has(card.dataset.kind)) return;
    card.classList.add("measure");
    for (const level of FIT_LEVELS) {
      if (card.scrollHeight <= card.clientHeight) break;
      card.dataset.fit = level;
    }
    card.classList.remove("measure");
  };

  const renderCard = () => {
    const station = stations[current];
    const clone = station.panel.cloneNode(true);
    clone.removeAttribute("data-station");
    clone.removeAttribute("data-panel");
    clone.removeAttribute("id");
    clone.querySelectorAll("[id]").forEach((node) => node.removeAttribute("id"));
    clone.querySelectorAll("[tabindex]").forEach((node) => node.removeAttribute("tabindex"));
    clone.querySelectorAll("h1, h2, h3").forEach(splitWords);
    chipsIn(clone);
    asksIn(clone);
    const memory = memoryOf(current);
    if (memory >= 0) relatedIn(clone, memory);
    if (station.kind === "milestone") clone.querySelector(".period-head")?.remove();
    setPreview(-1);
    cardBody.replaceChildren(clone);
    card.dataset.collapsed = clone.querySelector(".expander") && !showAll ? "1" : "";
    card.dataset.kind = station.kind;
    forms.forEach((holder, kind) => (holder.hidden = station.kind !== kind));
    const { previous, next } = stepOf(current);
    const place = (button, target, text) => {
      button.hidden = target === null;
      button.dataset.to = target ?? "";
      button.textContent = text;
    };
    place(previousButton, previous, `← ${copy.earlier}`);
    place(nextButton, next, `${copy.later} →`);
    cardSteps.hidden = station.kind === "hero" || (previous === null && next === null);
    closeButton.hidden = station.kind === "hero";
    fitCard();
    showMore();
    card.classList.remove("live");
    void card.offsetWidth;
    card.classList.add("live");
    card.scrollTop = 0;
    outKey = "";
    if (station.kind !== "hero") forms.get(station.kind)?.scrollIntoView({ block: "nearest" });
    if (!quiet) announce.textContent = station.label;
    layoutInset();
  };

  const cursorYear = () => {
    const station = stations[current];
    if (station.kind === "hero") return RAIL.start;
    if (station.kind === "milestone") return marks[memoryOf(current)].year;
    return { book: RAIL.book, clone: RAIL.clone }[station.kind] ?? RAIL.end;
  };

  const placeNudge = () => {
    if (nudge.hidden) return;
    const box = card.getBoundingClientRect();
    const wide = !stackedQuery.matches;
    const room = Math.max(160, innerWidth - 24 - (wide ? box.right + 12 : box.left));
    nudge.style.maxWidth = `${Math.min(340, room)}px`;
    const left = wide ? box.right + 12 : box.left;
    nudge.style.left = `${Math.max(12, Math.min(left, innerWidth - nudge.offsetWidth - 12)).toFixed(1)}px`;
    nudge.style.top = `${(wide ? box.bottom - nudge.offsetHeight : box.top - nudge.offsetHeight - 8).toFixed(1)}px`;
  };

  const updateNudge = () => {
    const station = stations[current];
    const want = !invite.closed && invite.opened.size >= 3 && station.kind === "milestone" && !station.element.dataset.quiet;
    nudge.hidden = !want;
    if (!want) return;
    const target = invite.sawClone ? "clone" : "book";
    nudgeLink.dataset.go = target;
    nudgeLink.href = `#${target}`;
    nudgeLink.textContent = copy[target === "clone" ? "nudgeclone" : "nudgebook"];
    nudgeClose.setAttribute("aria-label", copy.nudgeclose);
    nudgeClose.setAttribute("title", copy.nudgeclose);
    placeNudge();
  };

  nudgeClose.addEventListener("click", () => {
    invite.closed = true;
    updateNudge();
    card.focus({ preventScroll: true });
  });
  nudge.addEventListener("click", (event) => {
    const link = event.target.closest("[data-go]");
    if (link) {
      event.preventDefault();
      goTo(link.dataset.go);
    }
  });

  const layoutInset = () => {
    placeNudge();
    const box = card.getBoundingClientRect();
    const top = Math.max(KEEP_TOP, tools.getBoundingClientRect().bottom + 6);
    if (stackedQuery.matches) scene.setInset(0, (top + Math.max(top + 120, box.top)) / 2 - innerHeight / 2);
    else scene.setInset((box.right + innerWidth) / 2 - innerWidth / 2, (top + innerHeight - KEEP_BOTTOM) / 2 - innerHeight / 2);
  };

  const playButton = rail?.querySelector("[data-play]");
  const play = { running: false, year: null, from: 0 };
  const showPlay = () => {
    if (!playButton) return;
    playButton.setAttribute("aria-pressed", String(play.running));
    const label = play.running ? playButton.dataset.pauseLabel : playButton.dataset.playLabel;
    playButton.setAttribute("aria-label", label);
    playButton.setAttribute("title", label);
    playButton.querySelector(".rail-name").textContent = play.running ? playButton.dataset.pauseName : playButton.dataset.playName;
    rail.dataset.playing = play.year === null ? "" : play.running ? "1" : "paused";
  };
  const stopPlay = () => {
    if (play.year === null) return;
    play.running = false;
    play.year = null;
    scene.setReveal(null);
    showPlay();
  };

  let quiet = false;
  const select = (index, { push = true, hush = false } = {}) => {
    quiet = hush;
    stopPlay();
    current = clamp(index, 0, END);
    asked = null;
    showAll = false;
    stage.dataset.asked = "";
    if (stations[current].kind === "milestone" && !gentle.seen) {
      gentle.seen = true;
      gentle.on = true;
      gentle.from = { ...pointerAt };
      stage.dataset.gentle = "1";
    }
    const station = stations[current];
    document.documentElement.dataset.at = current;
    hud.textContent = station.label;
    refreshScene();
    shotOf(current);
    if (stations[current].kind === "milestone" && !hush) invite.opened.add(current);
    if (stations[current].kind === "clone") invite.sawClone = true;
    renderCard();
    updateNudge();
    if (rail) rail.querySelector(".rail-cursor")?.style.setProperty("--x", `${railPercent(cursorYear()).toFixed(2)}%`);
    if (station.kind === "milestone") sound.memory(marks[memoryOf(current)]);
    else if (station.kind === "book" || station.kind === "clone") sound.swell(station.kind);
    if (push) {
      try {
        history.replaceState(null, "", station.kind === "hero" ? `${location.pathname}${location.search}` : `#${station.id}`);
      } catch {
        return;
      }
    }
  };

  const setFilter = (next) => {
    filter = next;
    tools.querySelectorAll(".legend button").forEach((button) => {
      const facet = button.closest(".legend").dataset.facet;
      button.setAttribute("aria-pressed", String(!!filter && filter.facet === facet && facets[facet][filter.item] === button.dataset.item));
    });
    card.querySelectorAll(".chip").forEach((chip) => chip.setAttribute("aria-pressed", String(!!filter && filter.facet === chip.dataset.facet && facets[chip.dataset.facet][filter.item] === chip.dataset.item)));
    stage.dataset.filter = filter ? `${filter.facet}:${facets[filter.facet][filter.item]}` : "";
    unfilter.hidden = !filter;
    moreToggle.dataset.active = filter ? "1" : "";
    moreToggle.setAttribute("aria-label", filter ? `${moreLabel} · ${names[filter.facet][facets[filter.facet][filter.item]] ?? ""}` : moreLabel);
    if (filter) {
      unfilter.textContent = `✕ ${names[filter.facet][facets[filter.facet][filter.item]] ?? ""}`;
      unfilter.setAttribute("aria-label", `${copy.unfilter}: ${names[filter.facet][facets[filter.facet][filter.item]] ?? ""}`);
    }
    refreshScene();
    if (stations[current].kind === "milestone") renderCard();
  };
  const unfilter = tools.querySelector("[data-unfilter]");
  unfilter.addEventListener("click", () => setFilter(null));
  const toggleFilter = (facet, id) => {
    const item = facets[facet].indexOf(id);
    setFilter(filter?.facet === facet && filter.item === item ? null : { facet, item });
  };

  tools.querySelectorAll(".legend button").forEach((button) => button.addEventListener("click", () => toggleFilter(button.closest(".legend").dataset.facet, button.dataset.item)));
  const legends = [...tools.querySelectorAll(".legend")];
  legends.forEach((legend) => (legend.hidden = false));
  undo.push(() => legends.forEach((legend) => (legend.hidden = true)));
  const legendToggle = tools.querySelector("[data-legend-toggle]");
  legendToggle?.addEventListener("click", () => {
    const open = tools.dataset.legend !== "open";
    if (open) openGuide(false);
    tools.dataset.legend = open ? "open" : "";
    legendToggle.setAttribute("aria-expanded", String(open));
    layoutInset();
  });
  stage.dataset.filter = "";

  const finder = tools.querySelector(".finder");
  const finderInput = finder.querySelector("input");
  const results = finder.querySelector(".results");
  const none = finder.querySelector(".none");
  const findButton = tools.querySelector("[data-find]");
  const previewBox = finder.querySelector(".preview");
  const showFinderPreview = (index) => {
    previewBox.dataset.on = index >= 0 ? "1" : "";
    if (index < 0) return;
    previewBox.querySelector("time").textContent = info[index].time;
    previewBox.querySelector("strong").textContent = info[index].title;
    previewBox.querySelector("p").textContent = info[index].body.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? info[index].body;
  };
  const previewResult = (event) => {
    const row = event.target.closest?.(".peer[data-memory]");
    const index = row && finder.contains(row) ? +row.dataset.memory : -1;
    showFinderPreview(index);
    setPreview(index);
  };
  const memoryRow = (index) => {
    const row = element("li");
    const button = element("button", "peer");
    button.type = "button";
    button.dataset.memory = String(index);
    button.append(element("time", "", info[index].time), element("span", "", info[index].title));
    row.append(button);
    return row;
  };
  const showIndex = () =>
    results.replaceChildren(
      ...[...story.querySelectorAll("section.period")].flatMap((section) => {
        const items = [...section.querySelectorAll("[data-station='milestone']")].map((node) => memoryOf(stations.findIndex((station) => station.element === node)));
        const heading = element("li", "group", section.querySelector(".kicker")?.textContent ?? "");
        heading.setAttribute("aria-hidden", "true");
        return [heading, ...items.map(memoryRow)];
      }),
    );
  const openFinder = (open) => {
    finder.hidden = !open;
    findButton.setAttribute("aria-expanded", String(open));
    if (open) {
      if (!finderInput.value.trim()) showIndex();
      if (!guide.hidden) openGuide(false);
      finderInput.focus();
    }
    else {
      showFinderPreview(-1);
      setPreview(-1);
      if (finder.contains(document.activeElement)) document.activeElement.blur();
      finderInput.value = "";
      results.replaceChildren();
      none.textContent = "";
    }
  };
  findButton.addEventListener("click", () => openFinder(finder.hidden));
  finder.addEventListener("focusin", previewResult);
  results.addEventListener("pointerover", previewResult);
  results.addEventListener("pointerleave", () => {
    if (!finder.contains(document.activeElement) || document.activeElement === finderInput) {
      showFinderPreview(-1);
      setPreview(-1);
    }
  });
  finderInput.addEventListener("input", () => {
    const found = search(finderItems, finderInput.value);
    const shows = filtersFor(marks, facets, names, finderInput.value);
    results.replaceChildren(
      ...shows.map((entry) => {
        const row = element("li");
        const button = element("button", "peer show");
        button.type = "button";
        button.dataset.facet = entry.facet;
        button.dataset.item = facets[entry.facet][entry.item];
        button.append(element("time", "", String(entry.count)), element("span", "", copy.filter.replace("{thread}", entry.title)));
        row.append(button);
        return row;
      }),
      ...found.map((item) => memoryRow(item.index)),
    );
    if (!finderInput.value.trim()) showIndex();
    none.textContent = finderInput.value.trim() && !found.length && !shows.length ? none.dataset.none : "";
  });
  finder.addEventListener("submit", (event) => {
    event.preventDefault();
    results.querySelector("button")?.click();
  });
  results.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    openFinder(false);
    if (button.dataset.facet) {
      const item = facets[button.dataset.facet].indexOf(button.dataset.item);
      return setFilter(filter?.facet === button.dataset.facet && filter.item === item ? filter : { facet: button.dataset.facet, item });
    }
    select(stationOf(+button.dataset.memory));
    card.focus({ preventScroll: true });
  });
  finder.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      const buttons = [...results.querySelectorAll("button")];
      if (!buttons.length) return;
      event.preventDefault();
      const at = buttons.indexOf(document.activeElement);
      buttons[clamp(at + (event.key === "ArrowDown" ? 1 : -1), 0, buttons.length - 1)]?.focus();
      if (at === 0 && event.key === "ArrowUp") finderInput.focus();
    }
  });
  tools.querySelector("[data-surprise]").addEventListener("click", () => {
    const here = memoryOf(current);
    let pick = here;
    while (pick === here && marks.length > 1) pick = Math.floor(Math.random() * marks.length);
    select(stationOf(pick));
  });

  const guide = tools.querySelector(".guide");
  const guideToggle = tools.querySelector("[data-guide-toggle]");
  const openGuide = (open) => {
    guide.hidden = !open;
    guideToggle.setAttribute("aria-expanded", String(open));
    if (open) {
      openFinder(false);
      tools.dataset.legend = "";
      legendToggle?.setAttribute("aria-expanded", "false");
    }
  };
  guideToggle.addEventListener("click", () => openGuide(guide.hidden));
  findButton.addEventListener("click", () => !finder.hidden && openGuide(false));

  const moreToggle = tools.querySelector("[data-more-toggle]");
  const moreLabel = moreToggle.getAttribute("aria-label");
  const setSheet = (open) => {
    tools.dataset.sheet = open ? "open" : "";
    moreToggle.setAttribute("aria-expanded", String(open));
  };
  moreToggle.addEventListener("click", () => setSheet(tools.dataset.sheet !== "open"));
  const sheet = tools.querySelector(".sheet");
  sheet.addEventListener("click", (event) => {
    const chosen = event.target.closest("button, a");
    if (!chosen || chosen.matches(".lang")) return chosen && setSheet(false);
    setSheet(false);
    const next = chosen.matches("[data-legend-toggle]") ? tools.querySelector(".legend button") : moreToggle;
    (next ?? moreToggle).focus();
  });
  sheet.addEventListener("focusout", (event) => tools.dataset.sheet === "open" && !sheet.contains(event.relatedTarget) && event.relatedTarget !== moreToggle && setSheet(false));
  const closeSheetOutside = (event) => tools.dataset.sheet === "open" && !event.target.closest(".sheet, [data-more-toggle]") && setSheet(false);
  document.addEventListener("pointerdown", closeSheetOutside);
  canvas.addEventListener("pointerdown", () => openGuide(false));
  undo.push(() => document.removeEventListener("pointerdown", closeSheetOutside));

  const soundButton = tools.querySelector("[data-sound]");
  if (sound.supported) {
    soundButton.hidden = false;
    soundButton.setAttribute("aria-pressed", "true");
    soundButton.addEventListener("click", () => soundButton.setAttribute("aria-pressed", String(sound.toggle())));
    const onGesture = (event) => {
      if (sound.running()) return removeGesture();
      if (!event.target.closest?.("[data-sound]")) sound.start();
    };
    const gestures = ["pointerup", "touchend", "click", "keydown"];
    const removeGesture = () => gestures.forEach((type) => document.removeEventListener(type, onGesture, true));
    gestures.forEach((type) => document.addEventListener(type, onGesture, true));
    const onVisible = () => sound.pause(document.hidden);
    document.addEventListener("visibilitychange", onVisible);
    undo.push(() => {
      removeGesture();
      document.removeEventListener("visibilitychange", onVisible);
      sound.close();
      soundButton.setAttribute("aria-pressed", "false");
      soundButton.hidden = true;
    });
  }

  const focusNote = element("p", "visually-hidden");
  focusNote.setAttribute("role", "status");
  stage.append(focusNote);
  let focusFrom = null;
  const focusing = () => document.documentElement.dataset.focus === "1";
  const setFocusMode = (on) => {
    document.documentElement.dataset.focus = on ? "1" : "";
    focusNote.textContent = on ? tools.dataset.focusNote : "";
    focusFrom = on ? { ...pointerAt } : null;
    if (on) {
      openGuide(false);
      setSheet(false);
      openFinder(false);
    }
  };
  const endFocus = () => focusing() && setFocusMode(false);
  const endGentle = () => {
    if (!gentle.on) return;
    gentle.on = false;
    stage.dataset.gentle = "";
    refreshScene();
  };
  let touched = performance.now() / 1000;
  const touch = () => (touched = performance.now() / 1000);
  const onMove = (event) => {
    pointerAt.x = event.clientX;
    pointerAt.y = event.clientY;
    if (focusFrom && Math.hypot(pointerAt.x - focusFrom.x, pointerAt.y - focusFrom.y) > 12) endFocus();
    if (gentle.on && Math.hypot(pointerAt.x - gentle.from.x, pointerAt.y - gentle.from.y) > 12) endGentle();
    if (Math.abs(event.movementX) + Math.abs(event.movementY) > 6) touch();
  };
  const onPress = () => {
    endFocus();
    endGentle();
    touch();
  };
  const interactions = [["pointermove", onMove], ["pointerdown", onPress], ["wheel", onPress], ["touchstart", onPress]];
  interactions.forEach(([type, handler]) => addEventListener(type, handler, { passive: true }));
  undo.push(() => {
    interactions.forEach(([type, handler]) => removeEventListener(type, handler));
    delete document.documentElement.dataset.focus;
  });
  const plan = tourPlan(marks);
  let touring = { phase: "waiting", step: 0, at: 0 };

  card.addEventListener("pointerover", (event) => {
    const peer = event.target.closest(".related .peer");
    setPreview(peer ? +peer.dataset.memory : -1);
  });
  card.addEventListener("pointerleave", () => setPreview(-1));
  card.addEventListener("focusin", (event) => {
    const peer = event.target.closest(".related .peer");
    if (peer) setPreview(+peer.dataset.memory);
  });
  card.addEventListener("focusout", () => setPreview(-1));

  card.addEventListener("click", (event) => {
    const chip = event.target.closest(".chip");
    if (chip) return toggleFilter(chip.dataset.facet, chip.dataset.item);
    const expander = event.target.closest(".expander");
    if (expander) {
      showAll = !showAll;
      refreshScene();
      return renderRelated();
    }
    const ask = event.target.closest(".ask-q");
    if (ask) return setAsk(asked === ask.dataset.ask ? null : ask.dataset.ask);
    const peer = event.target.closest(".peer");
    if (peer) {
      select(stationOf(+peer.dataset.memory));
      return card.focus({ preventScroll: true });
    }
    const step = event.target.closest(".step");
    if (step && step.dataset.to !== "") {
      select(+step.dataset.to);
      return card.focus({ preventScroll: true });
    }
    const link = event.target.closest("[data-go]");
    if (link && anchors.has(link.dataset.go)) {
      event.preventDefault();
      goTo(link.dataset.go);
    }
  });

  const anchors = new Map(stations.map((station) => [station.id, station.t]));
  document.querySelectorAll("section.period").forEach((section) => {
    const first = section.querySelector("[data-station]");
    anchors.set(section.id, stations.findIndex((station) => station.element === first));
  });
  const goTo = (id) => {
    if (!anchors.has(id)) return;
    const index = anchors.get(id);
    select(index);
    if (stations[index].kind !== "hero") forms.get(stations[index].kind)?.querySelector("input, a, button")?.focus();
  };
  const fromHash = () => {
    let id;
    try {
      id = decodeURIComponent(location.hash.slice(1));
    } catch {
      return;
    }
    if (!id) return select(0, { push: false });
    if (anchors.has(id)) select(anchors.get(id), { push: false });
  };
  document.querySelectorAll("[data-go]").forEach((link) =>
    link.addEventListener("click", (event) => {
      if (card.contains(link) || !anchors.has(link.dataset.go)) return;
      event.preventDefault();
      goTo(link.dataset.go);
    }),
  );
  addEventListener("hashchange", fromHash);
  undo.push(() => removeEventListener("hashchange", fromHash));

  story.addEventListener("focusin", (event) => {
    const station = stations.find((candidate) => candidate.element.contains(event.target));
    if (station && station.t !== current) select(station.t);
  });
  const formAt = { hero: heroAt, book: bookAt, clone: cloneAt };
  forms.forEach((holder, kind) => holder.addEventListener("focusin", () => current !== formAt[kind] && select(formAt[kind])));

  const stepKeys = { ArrowDown: 1, ArrowRight: 1, PageDown: 1, " ": 1, ArrowUp: -1, ArrowLeft: -1, PageUp: -1 };
  const onKey = (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    touch();
    endGentle();
    if (focusing() && event.key.toLowerCase() !== "h") {
      setFocusMode(false);
      if (event.key === "Escape") return;
    }
    if (event.key === "Escape") {
      if (!guide.hidden) {
        openGuide(false);
        guideToggle.focus();
      } else if (tools.dataset.sheet === "open") {
        setSheet(false);
        moreToggle.focus();
      } else if (!finder.hidden) {
        openFinder(false);
        findButton.focus();
      } else if (event.target.closest("input, textarea, select")) return;
      else if (asked) setAsk(null);
      else if (filter) setFilter(null);
      else if (current !== 0) select(0);
      return;
    }
    if (event.target.closest("input, textarea, select, .finder")) return;
    if (event.key === "/") {
      event.preventDefault();
      return openFinder(true);
    }
    if (event.key === "?") {
      event.preventDefault();
      return openGuide(guide.hidden);
    }
    if (event.key.toLowerCase() === "h") {
      event.preventDefault();
      return event.repeat ? undefined : setFocusMode(!focusing());
    }
    if (event.key === " " && event.target.closest("button, a, summary, [role='button']")) return;
    if (event.key === "Home") {
      event.preventDefault();
      select(0);
    } else if (event.key === "End") {
      event.preventDefault();
      select(contactAt);
    } else if (event.key in stepKeys) {
      event.preventDefault();
      const direction = event.key === " " && event.shiftKey ? -1 : stepKeys[event.key];
      const { previous, next } = stepOf(current);
      const target = direction > 0 ? next : previous;
      if (target !== null) select(target);
    }
  };
  addEventListener("keydown", onKey);
  undo.push(() => removeEventListener("keydown", onKey));

  scene.on("hover", (index) => {
    if (index >= 0 && index !== hover) sound.tick();
    hover = index;
    canvas.style.cursor = index >= 0 ? "pointer" : "";
  });
  const aheadAt = (index) => (index === marks.length ? bookAt : index === marks.length + 1 ? cloneAt : -1);
  scene.on("click", (index) => {
    if (index >= 0) select(index < marks.length ? stationOf(index) : aheadAt(index));
  });

  const jumpable = stations.filter((station) => ["milestone", "book", "clone"].includes(station.kind));
  const railYears = stations.map((station) => (station.kind === "milestone" ? marks[memoryOf(station.t)].year : { hero: RAIL.start, book: RAIL.book, clone: RAIL.clone }[station.kind] ?? RAIL.end));
  if (rail) {
    const track = rail.querySelector(".rail-track");
    const tip = rail.querySelector(".rail-tip");
    rail.querySelector(".rail-today")?.style.setProperty("--x", `${railPercent(today).toFixed(2)}%`);
    const yearAt = (event) => {
      const box = track.getBoundingClientRect();
      return RAIL.start + clamp((event.clientX - box.left) / box.width, 0, 1) * (RAIL.end - RAIL.start);
    };
    const nearestStation = (year) => jumpable.reduce((best, station) => (Math.abs(railYears[station.t] - year) < Math.abs(railYears[best.t] - year) ? station : best), jumpable[0]);
    const label = (station) => `${station.element.querySelector("time")?.textContent ?? ""} · ${station.element.querySelector("h3, h2")?.textContent ?? ""}`.replace(/^ · /, "");
    let scrubbing = false;
    let last = -1;
    const point = (event) => {
      const station = nearestStation(yearAt(event));
      tip.textContent = label(station);
      tip.style.setProperty("--x", `${railPercent(railYears[station.t]).toFixed(2)}%`);
      tip.dataset.on = "1";
      return station;
    };
    track.addEventListener("pointerdown", (event) => {
      scrubbing = true;
      track.setPointerCapture(event.pointerId);
      const station = point(event);
      last = station.t;
      select(station.t);
    });
    track.addEventListener("pointermove", (event) => {
      const station = point(event);
      if (scrubbing && station.t !== last) {
        last = station.t;
        select(station.t);
      }
    });
    track.addEventListener("pointerup", () => (scrubbing = false));
    track.addEventListener("pointerleave", () => (tip.dataset.on = ""));
  }

  playButton?.addEventListener("click", () => {
    if (play.running) {
      play.running = false;
      return showPlay();
    }
    if (play.year === null) {
      if (current !== 0) select(0);
      play.year = START;
    }
    play.running = true;
    play.from = performance.now() / 1000 - playElapsed(play.year, today);
    showPlay();
  });

  const frameRects = () => {
    const rects = [card, tools, hud, rail, nudge.hidden ? null : nudge].filter(Boolean).map((node) => node.getBoundingClientRect());
    const finderBox = finder.hidden ? null : finder.getBoundingClientRect();
    if (finderBox) rects.push(finderBox);
    return rects;
  };
  const overlaps = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

  scene.on("frame", ({ formed, projected, camera, cssScale, time, dt, intro, entered, seen }) => {
    if (seed.isConnected) {
      const spot = projected[firstMemory];
      seed.style.left = `${spot.x}px`;
      seed.style.top = `${spot.y}px`;
      seed.style.visibility = spot.on ? "visible" : "hidden";
    }
    if (entering) {
      if (Number.isFinite(formed)) sky.list.forEach((galaxy, k) => {
        if (born.has(k) || formed < galaxy.start) return;
        born.add(k);
        const first = marks.findIndex((mark) => mark.year >= galaxy.start - 0.01);
        if (first >= 0) sound.memory(marks[first]);
      });
      if (entered) finishEntering();
    }
    if (adapting && measure.windows < QUALITY.windows && intro >= 1) {
      measure.from ||= time + 1;
      if (time >= measure.from) {
        measure.frames.push(dt * 1000);
        if (measure.frames.length >= QUALITY.window) {
          const next = nextQuality(tier, averageMs(measure.frames));
          measure.frames = [];
          measure.windows++;
          if (next !== tier) {
            tier = next;
            scene.setQuality(tier);
            canvas.dataset.quality = String(tier);
          }
        }
      }
    }
    const nowSeconds = performance.now() / 1000;
    const calm = !document.hidden && finder.hidden && guide.hidden && tools.dataset.sheet !== "open" && !filter && play.year === null && !focusing() && !document.activeElement?.closest?.("input, textarea, select, button, a, .finder, .card, .masthead, .rail") && !card.matches(":hover");
    const step = tourTick(touring, { now: nowSeconds, idleSince: touched, eligible: calm && (touring.phase === "touring" || current === 0), plan }, { wait: +tools.dataset.idle || 20, hold: +tools.dataset.tourHold || 6 });
    touring = step.state;
    if (step.open !== null) select(stationOf(step.open), { push: false, hush: true });
    else if (step.done) select(0, { push: false, hush: true });
    if (play.running) {
      play.year = playYear(performance.now() / 1000 - play.from, today);
      scene.setReveal(play.year);
      rail.querySelector(".rail-cursor")?.style.setProperty("--x", `${railPercent(play.year).toFixed(2)}%`);
      hud.textContent = String(Math.floor(play.year));
      if (play.year >= today) {
        stopPlay();
        hud.textContent = stations[current].label;
      }
    }
    const selected = memoryOf(current);
    const ratio = scene.view.distance / scene.homeDistance();
    const peers = new Set(chosen.slice(0, MAX_RELATED));
    const keepOut = frameRects().map((box) => ({ left: box.left - 12, right: box.right + 12, top: box.top - 12, bottom: box.bottom + 12 }));
    keepOut.push({ left: 0, right: innerWidth, top: 0, bottom: Math.max(KEEP_TOP, (masthead?.getBoundingClientRect().bottom ?? 0) + 4) }, { left: 0, right: innerWidth, top: innerHeight - 60, bottom: innerHeight });

    const solid = [];
    const stackedNow = stackedQuery.matches;
    const showMini = !gentle.on && miniVisible(ratio, innerWidth, 520, !stackedNow || card.getBoundingClientRect().top >= MINI.top + MINI.height + 8);
    const mapTag = showMini ? "on" : "off";
    if (stage.dataset.map !== mapTag) stage.dataset.map = mapTag;
    if (minimap.hidden === showMini) minimap.hidden = !showMini;
    const miniBox = showMini ? minimap.getBoundingClientRect() : null;
    if (showMini && selected >= 0) {
      const z = marks[selected].position[2];
      if (miniTick++ % 8 === 0) {
        miniDots.forEach((dot, i) => {
          const at = scene.centerOf(i);
          const [dx, dy] = miniFit.to([at.x, at.y]);
          dot.setAttribute("cx", dx.toFixed(1));
          dot.setAttribute("cy", dy.toFixed(1));
        });
      }
      miniFrame.setAttribute("points", [[0, 0], [innerWidth, 0], [innerWidth, innerHeight], [0, innerHeight]].map(([sx, sy]) => miniFit.to(scene.groundAt(sx, sy, z)).map((value) => value.toFixed(1)).join(",")).join(" "));
      const here = scene.centerOf(selected);
      const [hx, hy] = miniFit.to([here.x, here.y]);
      miniHere.setAttribute("cx", hx.toFixed(1));
      miniHere.setAttribute("cy", hy.toFixed(1));
    }
    if (miniBox) {
      keepOut.push({ left: miniBox.left - 8, right: miniBox.right + 8, top: miniBox.top - 8, bottom: miniBox.bottom + 8 });
      solid.push(miniBox);
    }

    const reaches = new Map();
    const exits = [];
    const marked = [];
    if (selected >= 0 && play.year === null) {
      const cardBox = card.getBoundingClientRect();
      const stacked = stackedQuery.matches;
      const free = {
        left: stacked ? 12 : cardBox.right + 12,
        right: innerWidth - 12,
        top: Math.max(KEEP_TOP, tools.getBoundingClientRect().bottom + 6),
        bottom: Math.min((rail?.getBoundingClientRect().top ?? innerHeight - 100) - 8, stacked ? cardBox.top - 8 : Infinity),
      };
      const origin = projected[selected];
      const half = Math.min(innerWidth, innerHeight) / 2;
      const reach = origin && origin.x >= free.left && origin.x <= free.right && origin.y >= free.top && origin.y <= free.bottom
        ? { left: Math.max(free.left, origin.x - half), right: Math.min(free.right, origin.x + half), top: Math.max(free.top, origin.y - half), bottom: Math.min(free.bottom, origin.y + half) }
        : free;
      chosen.slice(0, MAX_LINKS_CUT).forEach((j) => {
        const samples = arcSamples.map((sample, k) => scene.arcScreen(selected, j, k / EDGE_SAMPLES, sample));
        const exit = edgeExit(samples, reach);
        if (exit) exits.push({ j, ...exit });
      });
      const shown = exits.slice(0, EDGE_MARKS).map((exit, k) => {
        const mark = edgeMarks[k];
        const text = `${info[exit.j].title} · ${info[exit.j].time}`;
        if (mark.label.textContent !== text) {
          mark.label.textContent = text;
          mark.width = mark.height = 0;
        }
        mark.node.hidden = false;
        mark.width ||= mark.node.offsetWidth;
        mark.height ||= mark.node.offsetHeight;
        const side = edgeSide(exit, reach);
        return { mark, exit, side, box: edgeLabel(exit, side, mark, reach), shown: false };
      });
      stackEdgeLabels(shown, reach, 4, miniBox ? [{ left: miniBox.left, right: miniBox.right, top: miniBox.top, bottom: miniBox.bottom }] : []);
      edgeMarks.forEach((mark, k) => {
        const item = shown[k];
        mark.node.hidden = !item?.shown;
        if (!item?.shown) return;
        mark.node.style.transform = `translate3d(${item.box.left.toFixed(1)}px, ${item.box.top.toFixed(1)}px, 0)`;
        mark.node.dataset.memory = String(item.exit.j);
        mark.node.dataset.side = item.side;
        reaches.set(item.exit.j, item.exit.t);
        marked.push(item.exit.j);
        solid.push(item.box);
        mark.arrow.style.cssText = `left: ${(item.exit.x - item.box.left).toFixed(1)}px; top: ${(item.exit.y - item.box.top).toFixed(1)}px; --a: ${item.exit.angle.toFixed(3)}rad`;
        keepOut.push({ left: item.box.left - 4, right: item.box.right + 4, top: item.box.top - 4, bottom: item.box.bottom + 4 });
      });
    } else edgeMarks.forEach((mark) => (mark.node.hidden = true));
    scene.setLinkReach(reaches);
    stage.dataset.edges = String(edgeMarks.filter((mark) => !mark.node.hidden).length || "");
    const nextKey = marked.join(",");
    if (nextKey !== outKey) {
      outKey = nextKey;
      const out = new Set(marked.map(String));
      card.querySelectorAll(".peer[data-memory]").forEach((peer) => (peer.dataset.out = out.has(peer.dataset.memory) ? "1" : ""));
    }

    const point = { x: 0, y: 0, visible: false };
    fixed.forEach((item) => {
      let opacity = item.base * (item.year <= formed ? 1 : 0);
      if (play.year !== null && item.year > play.year) opacity = 0;
      opacity *= item.dim ?? 1;
      scene.project(item.world, point);
      if (!point.visible) opacity = 0;
      else {
        item.width ||= item.node.offsetWidth;
        item.height ||= item.node.offsetHeight;
        if (item.kind === "ahead") {
          const { width, height } = item;
          const radius = item.spotAt >= 0 ? projected[item.spotAt].r : (item.ring * cssScale) / camera.position.distanceTo(item.world);
          const clearance = ringClearance(radius);
          const box = AHEAD_GAPS.flatMap((extra) => AHEAD_SIDES.map(([ux, uy]) => {
            const gap = clearance + extra;
            const left = point.x + ux * gap - (ux < 0 ? width : ux === 0 ? width / 2 : 0);
            const top = point.y + uy * gap - (uy < 0 ? height : uy === 0 ? height / 2 : 0);
            return { left, right: left + width, top, bottom: top + height };
          })).find((spot) => spot.left >= 12 && spot.right <= innerWidth - 12 && !keepOut.some((other) => overlaps(spot, other)));
          if (box) {
            item.node.style.transform = `translate3d(${box.left.toFixed(1)}px, ${box.top.toFixed(1)}px, 0)`;
            item.node.style.setProperty("--cx", point.x.toFixed(1));
            item.node.style.setProperty("--cy", point.y.toFixed(1));
            item.node.style.setProperty("--r", Math.min(radius, 70).toFixed(1));
            if (opacity > 0.2) keepOut.push({ left: box.left - 4, right: box.right + 4, top: box.top - 4, bottom: box.bottom + 4 });
          } else opacity = 0;
        } else {
          point.x = clamp(point.x, item.width / 2 + 12, innerWidth - item.width / 2 - 12);
          item.node.style.transform = `translate3d(${point.x.toFixed(1)}px, ${point.y.toFixed(1)}px, 0)`;
          const pad = item.kind === "ring-year" || item.kind === "countdown-mark" ? 1 : 4;
          const spot = { left: point.x - item.width / 2 - pad, right: point.x + item.width / 2 + pad, top: point.y - item.height / 2 - pad, bottom: point.y + item.height / 2 + pad };
          if ((item.kind === "ring-year" || item.kind === "countdown-mark") && keepOut.some((other) => overlaps(spot, other))) opacity = 0;
          const inner = { left: spot.left + 4, right: spot.right - 4, top: spot.top + 4, bottom: spot.bottom - 4 };
          if (item.kind === "galaxy" && (solid.some((other) => overlaps(inner, other)) || keepOut.some((other) => overlaps(inner, other)))) opacity = 0;
          if (opacity > 0.2) keepOut.push(spot);
        }
      }
      const rounded = Math.round(opacity * 100) / 100;
      if (rounded !== item.shown) {
        item.shown = rounded;
        item.node.style.opacity = rounded;
        item.node.style.visibility = rounded > 0 ? "visible" : "hidden";
      }
    });

    const limit = innerWidth <= 760 ? 8 : ratio > 0.8 ? 14 : MAX_TAGS;
    const candidates = [];
    const clouds = [];
    projected.forEach((spot, j) => j < marks.length && spot.on && spot.r > 3 && clouds.push({ j, left: spot.x - spot.r * 0.7, right: spot.x + spot.r * 0.7, top: spot.y - spot.r * 0.7, bottom: spot.y + spot.r * 0.7 }));
    tags.forEach((tag, i) => {
      const spot = projected[i];
      const mark = marks[i];
      let priority = 0;
      if (i === selected) priority = 1000;
      else if (i === hover) priority = 900;
      else if (i === preview) priority = 880;
      else if (peers.has(i)) priority = 500 + mark.weight;
      else if (filter && mark.members[filter.facet]?.includes(filter.item)) priority = 300 + mark.weight;
      else if (heads.has(i) && ratio >= 0.6 && !filter) priority = 40;
      else if (mark.weight >= 3 && ratio < 0.6) priority = 30;
      else if (mark.weight === 2 && ratio < 0.5) priority = 20;
      else if (ratio < 0.22) priority = 10;
      if (selected >= 0 && priority < 500) priority = 0;
      if (mark.year + 3 > formed && i !== selected) priority = 0;
      if (!begun && seen && i === firstMemory) priority = 900;
      if (play.year !== null) priority = mark.year <= play.year && mark.year > play.year - 2.5 ? 800 + mark.weight : 0;
      if (priority > 0 && spot.on) candidates.push({ tag, spot, priority, i });
      else if (tag.on) {
        tag.on = false;
        tag.node.dataset.on = "";
      }
    });
    candidates.sort((a, b) => b.priority - a.priority || a.i - b.i);
    const accepted = [];
    for (const { tag, spot, priority, i } of candidates) {
      const asName = priority === 40 ? "1" : "";
      const hot = i === selected || i === hover ? "1" : "";
      if (tag.node.dataset.name !== asName || tag.node.dataset.hot !== hot) {
        tag.node.dataset.name = asName;
        tag.node.dataset.hot = hot;
        tag.width = tag.height = 0;
      }
      tag.width ||= tag.node.offsetWidth;
      tag.height ||= tag.node.offsetHeight;
      const placements = tagSpots(spot, { width: tag.width, height: tag.height }, innerWidth);
      if (priority >= 900) {
        const left = clamp(spot.x - tag.width / 2, 12, innerWidth - tag.width - 12);
        placements.splice(8, 0, { left, right: left + tag.width, top: spot.y - tag.height / 2, bottom: spot.y + tag.height / 2, far: false });
      }
      const inside = (box) => box.left >= 12 && box.right <= innerWidth - 12;
      const free = (box) => inside(box) && !keepOut.some((other) => overlaps(box, other)) && !accepted.some((other) => overlaps(box, { left: other.left - 6, right: other.right + 6, top: other.top - 4, bottom: other.bottom + 4 }));
      const clear = (box) => !clouds.some((other) => other.j !== i && overlaps(box, other));
      const box = pickSpot(placements, { free, clear, inside, forced: priority >= 900 });
      if (box && accepted.length < limit) {
        accepted.push(box);
        const away = box.far ? leaderOf(box, spot) : null;
        if (away) {
          Object.assign(tag.leader.style, { left: `${away.x.toFixed(1)}px`, top: `${away.y.toFixed(1)}px`, width: `${away.length.toFixed(1)}px`, transform: `rotate(${away.angle.toFixed(3)}rad)` });
          tag.node.dataset.leader = "1";
        } else tag.node.dataset.leader = "";
        tag.node.style.transform = `translate3d(${box.left.toFixed(1)}px, ${box.top.toFixed(1)}px, 0)`;
        tag.node.style.setProperty("--cx", spot.x.toFixed(1));
        tag.node.style.setProperty("--cy", spot.y.toFixed(1));
        if (!tag.on) {
          tag.on = true;
          tag.node.dataset.on = "1";
        }
      } else if (tag.on) {
        tag.on = false;
        tag.node.dataset.on = "";
      }
    }
  });

  new ResizeObserver(layoutInset).observe(card);
  const onResize = () => {
    scene.resize();
    fitCard();
    showMore();
    layoutInset();
    if (stations[current].kind === "hero") scene.home();
    else shotOf(current);
  };
  addEventListener("resize", onResize);
  addEventListener("themechange", scene.applyTheme);
  undo.push(() => {
    removeEventListener("resize", onResize);
    removeEventListener("themechange", scene.applyTheme);
  });
  scene.on("error", (error) => {
    console.error(error);
    flatten();
  });
  document.documentElement.classList.add("immersive");
  document.fonts?.ready.then(() => {
    tags.forEach((tag) => ((tag.width = 0), (tag.height = 0)));
    fitCard();
    showMore();
    layoutInset();
  });
  tools.dataset.ready = "1";
  select(0, { push: false });
  fromHash();
  layoutInset();
}
