import { FACETS } from "./life.js";

export const LEVEL = { normal: 1, related: 0.85, weak: 0.5, quiet: 0.3, away: 0.1 };
export const STRONG = 3;

export const normalize = (text) => text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

export function search(items, query, limit = 8) {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return items
    .map((item) => {
      const title = normalize(item.title);
      const text = normalize(`${item.title} ${item.body} ${item.extra}`);
      if (!terms.every((term) => text.includes(term))) return null;
      const score = terms.reduce((sum, term) => sum + (title.startsWith(term) ? 3 : title.includes(term) ? 2 : 1), 0) + item.weight * 0.1;
      return { item, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || a.item.order - b.item.order)
    .slice(0, limit)
    .map(({ item }) => item);
}

export function related(marks, index) {
  const own = marks[index];
  const byId = new Map(marks.map((mark, i) => [mark.id, i]));
  const links = new Set(own.links.filter((id) => byId.has(id) && id !== own.id).map((id) => byId.get(id)));
  marks.forEach((mark, i) => i !== index && mark.links.includes(own.id) && links.add(i));
  const near = new Set();
  for (const [facet, items] of Object.entries(own.members)) {
    for (const item of items) {
      const same = marks.map((mark, i) => (mark.members[facet]?.includes(item) ? i : -1)).filter((i) => i >= 0);
      const at = same.indexOf(index);
      for (const i of [same[at - 1], same[at + 1]]) if (i !== undefined && !links.has(i)) near.add(i);
    }
  }
  return { links: [...links].sort((a, b) => a - b), near: [...near].sort((a, b) => a - b) };
}

export function strongest(marks, index, limit = STRONG) {
  const own = marks[index];
  const { links, near } = related(marks, index);
  const explicit = new Set(links);
  const shared = (mark) => Object.entries(own.members).reduce((sum, [facet, items]) => sum + items.filter((item) => mark.members[facet]?.includes(item)).length, 0);
  const score = (i) => (explicit.has(i) ? 100 : 0) + shared(marks[i]) * 10 + 1 / (1 + Math.abs(marks[i].year - own.year));
  return [...links, ...near].sort((a, b) => score(b) - score(a) || a - b).slice(0, limit);
}

export function declared(marks, index, limit = STRONG) {
  const { links } = related(marks, index);
  return strongest(marks, index, Infinity).filter((i) => links.includes(i)).slice(0, limit);
}

export function periodNames(marks, period, limit = 3, apart = 3) {
  const ranked = marks
    .map((mark, i) => [mark, i])
    .filter(([mark]) => mark.period === period)
    .sort((a, b) => b[0].weight - a[0].weight || a[0].year - b[0].year || a[1] - b[1]);
  const chosen = [];
  for (const [mark, i] of ranked) {
    if (chosen.length >= limit) break;
    if (chosen.every(([other]) => !mark.position || !other.position || Math.hypot(...mark.position.map((value, axis) => value - other.position[axis])) >= apart)) chosen.push([mark, i]);
  }
  return chosen.map(([, i]) => i);
}

export function sequence(marks, index, filter = null) {
  if (!filter) return { previous: index > 0 ? index - 1 : null, next: index < marks.length - 1 ? index + 1 : null };
  const chain = matching(marks, filter);
  const at = chain.indexOf(index);
  if (at < 0) return { previous: chain.findLast((i) => i < index) ?? null, next: chain.find((i) => i > index) ?? null };
  return { previous: chain[at - 1] ?? null, next: chain[at + 1] ?? null };
}

export function filtersFor(marks, facets, names, query, limit = 3) {
  const items = FACETS.flatMap((facet) =>
    (facets[facet] ?? []).map((id, item) => ({ facet, item, title: names[facet]?.[id] ?? id, body: "", extra: "", count: matching(marks, { facet, item }).length })),
  ).filter((entry) => entry.count > 0);
  return search(items.map((entry, order) => ({ ...entry, weight: Math.min(3, entry.count / 4), order })), query, limit);
}

export function levels(marks, { selected = -1, near = new Set(), weak = new Set(), filter = null }) {
  return marks.map((mark, i) => {
    let level = LEVEL.normal;
    if (selected >= 0) level = i === selected ? 1 : near.has(i) ? LEVEL.related : weak.has(i) ? LEVEL.weak : LEVEL.quiet;
    if (filter && !(mark.members[filter.facet] ?? []).includes(filter.item)) level = i === selected ? 1 : Math.min(level, LEVEL.away);
    return level;
  });
}

export const askLevels = (marks, lit) => marks.map((mark, i) => (lit.has(i) ? 1 : LEVEL.quiet));

export const askPairs = (lit, ring) => [...lit].map((i) => [i, ring, true]);

export const matching = (marks, filter) => (filter ? marks.map((mark, i) => ((mark.members[filter.facet] ?? []).includes(filter.item) ? i : -1)).filter((i) => i >= 0) : []);

export const FILTER_HASH = { threads: "thread-", people: "person-", places: "place-" };

export const filterHash = (facet, id) => `${FILTER_HASH[facet]}${id}`;

export function filterOfHash(hash, facets) {
  const [facet, prefix] = Object.entries(FILTER_HASH).find(([, start]) => hash.startsWith(start)) ?? [];
  const item = facet ? (facets[facet] ?? []).indexOf(hash.slice(prefix.length)) : -1;
  return item >= 0 ? { facet, item } : null;
}

export const FIGURE_LIFT = 0.06;

export function figureOf(marks, chain, at = (i) => marks[i].position) {
  if (chain.length < 2) return [];
  const spots = new Map(chain.map((i) => [i, at(i)]));
  const gap = (a, b) => Math.hypot(spots.get(a)[0] - spots.get(b)[0], spots.get(a)[1] - spots.get(b)[1]);
  const nearest = new Map(chain.slice(1).map((i) => [i, { from: chain[0], d: gap(chain[0], i) }]));
  const edges = [];
  while (nearest.size) {
    let next = -1;
    let least = Infinity;
    for (const [i, { d }] of nearest) if (d < least || (d === least && i < next)) [next, least] = [i, d];
    const { from } = nearest.get(next);
    nearest.delete(next);
    edges.push([from, next, marks[from].period !== marks[next].period]);
    for (const [i, entry] of nearest) {
      const d = gap(next, i);
      if (d < entry.d) nearest.set(i, { from: next, d });
    }
  }
  return edges;
}

export function figureSpan(marks, chain) {
  const years = chain.map((i) => Math.floor(marks[i].year));
  return { count: chain.length, from: Math.min(...years), to: Math.max(...years) };
}

export const figureCount = ({ count, from, to }, { one, many }) => `${(count === 1 ? one : many).replace("{n}", String(count))} · ${from === to ? from : `${from}–${to}`}`;

export function perGalaxy(marks, chain, count) {
  const counts = new Array(count).fill(0);
  for (const i of chain) if (marks[i].period >= 0) counts[marks[i].period]++;
  return counts;
}

export const TAG_GAP = 10;
export const TAG_RINGS = 3;
export const RING_CLEARANCE = 8;

const SIDES = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const DIAGONALS = [[1, 1], [-1, 1], [1, -1], [-1, -1]];

export function tagSpots({ x, y, r }, { width, height }, windowWidth, margin = 12) {
  const near = r + TAG_GAP;
  const at = (ux, uy, distance, far) => {
    const left = uy === 0 ? x + ux * distance - (ux < 0 ? width : 0) : Math.min(Math.max(x - width / 2, margin), windowWidth - width - margin);
    const top = uy === 0 ? y - height / 2 : uy > 0 ? y + distance - 2 : y - distance + 2 - height;
    return { left, right: left + width, top, bottom: top + height, far };
  };
  const diagonal = (ux, uy, distance, far) => {
    const left = x + ux * distance - (ux < 0 ? width : 0);
    const top = y + uy * distance - (uy < 0 ? height : 0);
    return { left, right: left + width, top, bottom: top + height, far };
  };
  const step = height + 4;
  const rings = Array.from({ length: TAG_RINGS }, (_, k) => near + (k + 1) * step);
  return [
    ...SIDES.map(([ux, uy]) => at(ux, uy, near, false)),
    ...DIAGONALS.map(([ux, uy]) => diagonal(ux, uy, near, false)),
    ...rings.flatMap((distance) => [...SIDES.map(([ux, uy]) => at(ux, uy, distance, true)), ...DIAGONALS.map(([ux, uy]) => diagonal(ux, uy, distance, true))]),
  ];
}

export function pickSpot(spots, { free, clear, inside, forced = false, keep = -1 }) {
  const kept = keep >= 0 ? spots.find((spot) => spot.slot === keep) : undefined;
  if (kept && free(kept) && clear(kept)) return kept;
  return spots.find((spot) => free(spot) && clear(spot)) ?? spots.find(free) ?? (forced ? spots.find((spot) => spot.far === false && inside(spot)) ?? spots[0] : null);
}

export function leaderOf(box, { x, y, r }) {
  const anchorX = Math.min(Math.max(x, box.left), box.right);
  const anchorY = Math.min(Math.max(y, box.top), box.bottom);
  const length = Math.hypot(x - anchorX, y - anchorY) - r * 0.45;
  return length > 4 ? { x: anchorX - box.left, y: anchorY - box.top, length, angle: Math.atan2(y - anchorY, x - anchorX) } : null;
}

export const ringClearance = (radius) => Math.min(radius, 70) + RING_CLEARANCE;

export function headlines(marks) {
  const best = new Map();
  marks.forEach((mark, i) => {
    if (mark.period < 0) return;
    const held = best.get(mark.period);
    if (held === undefined || mark.weight > marks[held].weight || (mark.weight === marks[held].weight && mark.year < marks[held].year)) best.set(mark.period, i);
  });
  return [...best.entries()].sort((a, b) => a[0] - b[0]).map(([, i]) => i);
}

export function edgeExit(samples, rect) {
  const inside = (p) => p.visible !== false && p.x >= rect.left && p.x <= rect.right && p.y >= rect.top && p.y <= rect.bottom;
  for (let k = 1; k < samples.length; k++) {
    const a = samples[k - 1];
    const b = samples[k];
    if (!inside(a) || inside(b)) continue;
    let low = 0;
    let high = 1;
    for (let step = 0; step < 18; step++) {
      const mid = (low + high) / 2;
      if (inside({ visible: b.visible, x: a.x + (b.x - a.x) * mid, y: a.y + (b.y - a.y) * mid })) low = mid;
      else high = mid;
    }
    return { t: (k - 1 + low) / (samples.length - 1), x: a.x + (b.x - a.x) * low, y: a.y + (b.y - a.y) * low, angle: Math.atan2(b.y - a.y, b.x - a.x) };
  }
  return null;
}

export function edgeSide(point, rect) {
  const gaps = [[Math.abs(point.y - rect.top), "top"], [Math.abs(point.x - rect.right), "right"], [Math.abs(point.y - rect.bottom), "bottom"], [Math.abs(point.x - rect.left), "left"]];
  return gaps.reduce((best, gap) => (gap[0] < best[0] ? gap : best))[1];
}

export function edgeLabel(point, side, { width, height }, rect, offset = 8) {
  const clampX = (value) => Math.min(Math.max(value, rect.left), Math.max(rect.left, rect.right - width));
  const clampY = (value) => Math.min(Math.max(value, rect.top), Math.max(rect.top, rect.bottom - height));
  const left = side === "left" ? point.x + offset : side === "right" ? point.x - offset - width : clampX(point.x - width / 2);
  const top = side === "top" ? point.y + offset : side === "bottom" ? point.y - offset - height : clampY(point.y - height / 2);
  return { left, right: left + width, top, bottom: top + height };
}

export function stackEdgeLabels(items, rect, gap = 4, avoid = []) {
  const placed = [...avoid];
  const slack = 0.5;
  const overlaps = (a, b) => a.left < b.right + gap - slack && a.right + gap > b.left + slack && a.top < b.bottom + gap - slack && a.bottom + gap > b.top + slack;
  for (const item of items) {
    const along = item.side === "top" || item.side === "bottom" ? "top" : "left";
    const span = along === "top" ? item.box.bottom - item.box.top : item.box.right - item.box.left;
    const direction = item.side === "bottom" || item.side === "right" ? -1 : 1;
    let box = item.box;
    for (let tries = 0; tries < 4 && placed.some((other) => overlaps(box, other)); tries++) {
      const shift = (span + gap) * direction * (tries + 1);
      box = along === "top" ? { ...item.box, top: item.box.top + shift, bottom: item.box.bottom + shift } : { ...item.box, left: item.box.left + shift, right: item.box.right + shift };
    }
    const fits = box.left >= rect.left - 1 && box.right <= rect.right + 1 && box.top >= rect.top - 1 && box.bottom <= rect.bottom + 1;
    if (fits && !placed.some((other) => overlaps(box, other))) {
      placed.push(box);
      item.box = box;
      item.shown = true;
    } else item.shown = false;
  }
  return items;
}

export function miniMap(points, { width, height, pad = 6 }) {
  const xs = points.map((point) => point[0]);
  const ys = points.map((point) => point[1]);
  const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const scale = Math.min((width - 2 * pad) / (maxX - minX || 1), (height - 2 * pad) / (maxY - minY || 1));
  const offsetX = (width - (maxX - minX) * scale) / 2;
  const offsetY = (height - (maxY - minY) * scale) / 2;
  return {
    scale,
    to: ([x, y]) => [offsetX + (x - minX) * scale, offsetY + (maxY - y) * scale],
    from: ([x, y]) => [minX + (x - offsetX) / scale, maxY - (y - offsetY) / scale],
  };
}

export function galaxyAt(galaxies, [x, y], slack = 1.35) {
  let best = -1;
  let bestScore = slack;
  galaxies.forEach((galaxy, k) => {
    const score = Math.hypot(galaxy.centre[0] - x, galaxy.centre[1] - y) / galaxy.radius;
    if (score < bestScore) [best, bestScore] = [k, score];
  });
  return best;
}

export const MINI_ZOOM = 0.75;

export const miniVisible = (ratio, width, minimum = 520, room = true) => ratio < MINI_ZOOM && width >= minimum && room;

export const QUALITY = { tiers: [{ keep: 1, ratio: Infinity }, { keep: 0.65, ratio: 1.5 }, { keep: 0.4, ratio: 1 }], slow: 1000 / 30, window: 90, windows: 3 };

export const CADENCE = { fps: 24, hidden: 1 };

export const pace = (clock, now, fps = CADENCE.fps) => {
  const period = 1000 / fps;
  const elapsed = now - clock.last;
  if (elapsed < period - 1) return false;
  clock.last = now - Math.min(Math.max(elapsed - period, 0), period / 2);
  return true;
};

export const worked = (frameMs, fps = CADENCE.fps) => Math.max(0, frameMs - 1000 / fps) + 1000 / 60;

export const FRESH = { days: 45 };

export const isFresh = (added, today = new Date()) => {
  if (!/^\d{4}-\d{2}$/.test(added ?? "")) return false;
  const since = (today - new Date(+added.slice(0, 4), +added.slice(5, 7) - 1, 1)) / 86400000;
  return since >= 0 && since < FRESH.days;
};

export const averageMs = (samples) => (samples.length ? samples.reduce((sum, value) => sum + value, 0) / samples.length : 0);

export const nextQuality = (tier, frameMs) => (frameMs > QUALITY.slow && tier < QUALITY.tiers.length - 1 ? tier + 1 : tier);

export function tourPlan(marks) {
  const ages = [...new Set(marks.map((mark) => mark.period).filter((period) => period >= 0))].sort((a, b) => a - b);
  return [...ages.map((age) => ({ age })), { ahead: "book" }, { ahead: "clone" }];
}

export function tourTick(state, { now, idleSince, eligible, plan }, { wait = 20, hold = 6 } = {}) {
  if (!plan.length) return { state, open: null };
  if (state.phase === "off") return { state, open: null };
  if (state.phase === "touring") {
    if (idleSince > state.at || !eligible) return { state: { phase: "off", step: 0, at: now }, open: null, stopped: true };
    if (now - state.at < hold) return { state, open: null };
    const step = state.step + 1;
    if (step >= plan.length) return { state: { phase: "off", step: 0, at: now }, open: null, done: true };
    return { state: { phase: "touring", step, at: now }, open: plan[step] };
  }
  if (eligible && now - Math.max(idleSince, state.at) >= wait) return { state: { phase: "touring", step: 0, at: now }, open: plan[0] };
  return { state, open: null };
}
