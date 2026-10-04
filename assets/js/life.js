export const START = 1980;
export const FLOOR = -10;
export const AHEAD = [1.6, 4.2];
export const SPREAD = { 1: 1.1, 2: 1.6, 3: 2.2 };
export const SPAN = 51;
export const FACETS = ["threads", "people", "places"];
export const LANES = [0, 1, -1, 2, -2];
export const ACTIVITY = { sigma: 1.6, background: 0.08 };
export const BUDGET = { base: 470, cap: 120000, trail: 18000 };
export const SPACE = { inner: 900, outer: 1600, stars: 9000, halo: 0.015, band: 0.35, tilt: 0.6, thickness: 0.16 };
export const SKY = { core: 4, reach: 3.2, gap: 12, future: 44, twist: 2.2, swirl: 0.9, inner: 0.22, depth: 4, room: 3, ahead: [0.3, 0.7], today: 0.06, sweep: 1.9 * Math.PI, growth: 1.75, rise: 26 };
const BIN = 0.25;

export const precisionOf = (date) => (/^\d{4}$/.test(date) ? "year" : /^\d{4}-\d{2}$/.test(date) ? "month" : null);

export const todayYear = (now = Date.now()) => {
  const date = new Date(now);
  const year = date.getFullYear();
  const local = Date.UTC(year, date.getMonth(), date.getDate());
  return year + (local - Date.UTC(year, 0, 1)) / (Date.UTC(year + 1, 0, 1) - Date.UTC(year, 0, 1));
};

export const monthsUntil = (date, now = Date.now()) => {
  const [year, month] = date.split("-").map(Number);
  const here = new Date(now);
  return (year - here.getFullYear()) * 12 + (month - 1 - here.getMonth());
};

export const untilText = (months, locale) => (!Number.isFinite(months) || months < 0 ? "" : new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(months, "month"));

export const unitsOf = (year) => year - START;

export function years(entries) {
  const crowd = new Map();
  entries.forEach(({ date }) => crowd.set(date, (crowd.get(date) ?? 0) + 1));
  const seen = new Map();
  return entries.map(({ date }) => {
    const precision = precisionOf(date);
    if (!precision) throw new Error(`date "${date}" is neither YYYY nor YYYY-MM`);
    const year = +date.slice(0, 4);
    const rank = seen.get(date) ?? 0;
    seen.set(date, rank + 1);
    const fraction = (rank + 0.5) / crowd.get(date);
    return precision === "month" ? year + (+date.slice(5, 7) - 1 + fraction) / 12 : year + fraction;
  });
}

export function lanes(placed, window) {
  const taken = [];
  return placed.map((year, i) => {
    const used = new Set();
    for (let j = i - 1; j >= 0 && year - placed[j] <= window; j--) used.add(taken[j]);
    taken[i] = LANES.find((lane) => !used.has(lane)) ?? LANES[i % LANES.length];
    return taken[i];
  });
}

export function crowdScale(placed) {
  return placed.map((year) => {
    const near = placed.filter((other) => Math.abs(other - year) <= 0.6).length;
    return Math.min(1, 1 / Math.sqrt(Math.max(1, near / 2)));
  });
}

const clamp01 = (value) => Math.min(1, Math.max(0, value));

const angleAlong = (path, along) => (Math.sqrt(path.inner * path.inner + 2 * path.spin * along) - path.inner) / path.spin;

export function onPath(path, along, lift = 0) {
  const angle = angleAlong(path, along);
  const radius = path.inner + path.spin * angle + lift;
  return [radius * Math.sin(angle) - path.pole[0], radius * Math.cos(angle) - path.pole[1], FLOOR + 3 + SKY.rise * (along / path.length - 0.5)];
}

export function galaxies(placed, periodOf, count, today) {
  const members = Array.from({ length: count }, () => []);
  placed.forEach((year, i) => periodOf[i] >= 0 && members[periodOf[i]].push(year));
  const starts = [];
  members.forEach((list, k) => starts.push(list.length ? Math.min(...list) : (starts[k - 1] ?? START)));
  const radius = members.map((list) => SKY.core + SKY.reach * Math.sqrt(list.length));
  const length = radius.reduce((sum, r) => sum + 2 * r, 0) + SKY.gap * count + SKY.future;
  const inner = (2 * length) / (SKY.sweep * (1 + SKY.growth));
  const path = { inner, spin: (inner * (SKY.growth - 1)) / SKY.sweep, length, pole: [0, 0] };
  let along = 0;
  const alongs = radius.map((r) => {
    const at = along + r;
    along += 2 * r + SKY.gap;
    return at;
  });
  const points = [...alongs.map((at, k) => [onPath(path, at), radius[k]]), ...Array.from({ length: 9 }, (_, k) => [onPath(path, along + (SKY.future * k) / 8), 3])];
  const box = [0, 1].map((axis) => [Math.min(...points.map(([point, r]) => point[axis] - r)), Math.max(...points.map(([point, r]) => point[axis] + r))]);
  path.pole = box.map(([low, high]) => (low + high) / 2);
  const list = radius.map((r, k) => {
    const later = starts.slice(k + 1).find((start, j) => members[k + 1 + j].length && start > starts[k]);
    const end = Math.max(later ?? Math.max(today, ...members[k]), starts[k] + 1);
    return { start: starts[k], end, count: members[k].length, radius: r, turn: k * SKY.twist, along: alongs[k], centre: onPath(path, alongs[k]) };
  });
  return { ...path, ahead: along, list };
}

export const galaxyOf = (sky, year) => {
  const found = sky.list.findIndex((galaxy) => year < galaxy.end);
  return found < 0 ? sky.list.length - 1 : found;
};

export const fractionIn = (galaxy, year) => clamp01((year - galaxy.start) / (galaxy.end - galaxy.start));

export const RING_STEPS = [1, 2, 5, 10, 20, 50, 100];

export function yearRings(galaxy, maxRings = 8) {
  const first = Math.ceil(galaxy.start + 1e-9);
  const last = Math.floor(galaxy.end + 1e-9);
  const years = (step) => Array.from({ length: Math.max(0, last - first + 1) }, (_, k) => first + k).filter((year) => year % step === 0);
  const step = RING_STEPS.find((candidate) => years(candidate).length <= maxRings) ?? RING_STEPS.at(-1);
  return years(step).map((year) => ({ year, radius: galaxy.radius * (SKY.inner + (1 - SKY.inner) * fractionIn(galaxy, year)) }));
}

export const orderOf = (sky, year) => (galaxyOf(sky, year) + fractionIn(sky.list[galaxyOf(sky, year)], year)) / sky.list.length;

export function yearOf(sky, order) {
  if (order >= 1) return Infinity;
  const at = Math.max(0, order) * sky.list.length;
  const galaxy = sky.list[Math.min(sky.list.length - 1, Math.floor(at))];
  return galaxy.start + (at - Math.floor(at)) * (galaxy.end - galaxy.start);
}

export function galaxyPoint(galaxy, thread, threads, fraction, offset = 0, lift = 0) {
  const angle = ((Math.PI * 2) / Math.max(1, threads)) * Math.max(0, thread) + galaxy.turn + SKY.swirl * fraction + offset;
  const reach = Math.max(0.4, galaxy.radius * (SKY.inner + (1 - SKY.inner) * fraction) + lift);
  return [galaxy.centre[0] + reach * Math.sin(angle), galaxy.centre[1] + reach * Math.cos(angle), galaxy.centre[2] + SKY.depth * (fraction - 0.5)];
}

export const aheadPoint = (sky, along, lift = 0) => onPath(sky, sky.ahead + along * SKY.future, lift);

export function skyOf(entries, placed, { periods = [], today = START + SPAN } = {}) {
  const periodOf = entries.map((entry) => (periods.length ? periods.indexOf(entry.period) : 0));
  const lost = entries.find((_, i) => periodOf[i] < 0);
  if (lost) throw new Error(`memory ${lost.id}: period "${lost.period}" is not one of ${periods.join(", ")}`);
  return { ...galaxies(placed, periodOf, Math.max(1, periods.length), today), periodOf };
}

export function layout(entries, facets = {}, options = {}) {
  const placed = years(entries);
  const scale = crowdScale(placed);
  const names = FACETS.filter((facet) => facets[facet]?.length);
  const members = entries.map((entry) => Object.fromEntries(names.map((facet) => [facet, (entry[facet] ?? []).map((id) => facets[facet].indexOf(id)).filter((index) => index >= 0)])));
  const threadCount = facets.threads?.length ?? 0;
  const sky = skyOf(entries, placed, options);
  const positions = [];
  const groups = new Map();
  entries.forEach((_, i) => {
    const key = `${sky.periodOf[i]}:${members[i].threads?.[0] ?? 0}`;
    groups.set(key, [...(groups.get(key) ?? []), i]);
  });
  const sector = (Math.PI * 2) / Math.max(1, threadCount);
  groups.forEach((indices) => {
    const galaxy = sky.list[sky.periodOf[indices[0]]];
    const perUnit = (galaxy.end - galaxy.start) / (galaxy.radius * (1 - SKY.inner));
    lanes(indices.map((i) => placed[i]), SKY.room * perUnit).forEach((lane, k) => {
      const i = indices[k];
      const fraction = fractionIn(galaxy, placed[i]);
      const reach = galaxy.radius * (SKY.inner + (1 - SKY.inner) * fraction);
      const offset = Math.max(-0.45 * sector, Math.min(0.45 * sector, (lane * SKY.room) / Math.max(reach, 2)));
      positions[i] = galaxyPoint(galaxy, members[i].threads?.[0] ?? 0, threadCount, fraction, offset);
    });
  });

  return placed.map((year, i) => ({
    id: entries[i].id,
    year,
    position: positions[i],
    spread: (SPREAD[entries[i].weight] ?? SPREAD[1]) * scale[i],
    weight: entries[i].weight,
    members: members[i],
    period: sky.periodOf[i],
    links: entries[i].links ?? [],
  }));
}

export function futures(sky) {
  const [book, clone] = SKY.ahead.map((along) => aheadPoint(sky, along));
  return { today: aheadPoint(sky, SKY.today), book, clone };
}

const rawDensity = (at, marks) => marks.reduce((sum, mark) => sum + mark.weight * Math.exp(-(((at - mark.year) / 1.6) ** 2)), 0);

export const densityPeak = (marks) => Math.max(...marks.map((mark) => rawDensity(mark.year, marks)), 1e-6);

export function densityAt(year, marks, peak = densityPeak(marks)) {
  return Math.min(1, rawDensity(year, marks) / peak);
}

export function densityByYear(entries, last) {
  const placed = years(entries);
  const total = new Map();
  placed.forEach((year, i) => total.set(Math.floor(year), (total.get(Math.floor(year)) ?? 0) + entries[i].weight));
  const peak = Math.max(...total.values(), 1);
  return Array.from({ length: Math.floor(last) - START + 1 }, (_, k) => ({ year: START + k, value: (total.get(START + k) ?? 0) / peak }));
}

export function activityTable(marks, facet, count, last) {
  const bins = Math.ceil((last - START) / BIN) + 1;
  const table = new Float32Array(bins * Math.max(1, count));
  const reach = Math.ceil((ACTIVITY.sigma * 3) / BIN);
  for (const mark of marks) {
    (mark.members[facet] ?? []).forEach((item, rank) => {
      const centre = (mark.year - START) / BIN;
      for (let bin = Math.max(0, Math.floor(centre) - reach); bin <= Math.min(bins - 1, Math.ceil(centre) + reach); bin++) {
        const distance = (bin * BIN - (mark.year - START)) / ACTIVITY.sigma;
        table[bin * count + item] += (mark.weight * (rank === 0 ? 1 : 0.5) * Math.exp(-distance * distance)) / 3;
      }
    });
  }
  return { table, count, bins };
}

export function activityAt({ table, count, bins }, year, item) {
  return Math.min(1, table[Math.min(bins - 1, Math.max(0, Math.round((year - START) / BIN))) * count + item]);
}

export function assign(profile, year, random) {
  const weights = Array.from({ length: profile.count }, (_, item) => ACTIVITY.background + activityAt(profile, year, item));
  let pick = random() * weights.reduce((sum, weight) => sum + weight, 0);
  for (let item = 0; item < profile.count; item++) if ((pick -= weights[item]) <= 0) return item;
  return profile.count - 1;
}

export function shellPoint(random, inner = SPACE.inner, outer = SPACE.outer) {
  const z = random() * 2 - 1;
  const angle = random() * Math.PI * 2;
  const radius = inner + (outer - inner) * random();
  const ring = Math.sqrt(1 - z * z) * radius;
  return [ring * Math.cos(angle), ring * Math.sin(angle), z * radius];
}

export function bandDirection(random) {
  const lon = random() * Math.PI * 2;
  const lat = gaussian(random) * SPACE.thickness;
  const [x, y, z] = [Math.cos(lat) * Math.cos(lon), Math.cos(lat) * Math.sin(lon), Math.sin(lat)];
  return [x, y * Math.cos(SPACE.tilt) - z * Math.sin(SPACE.tilt), y * Math.sin(SPACE.tilt) + z * Math.cos(SPACE.tilt)];
}

export function starfield({ count = SPACE.stars, random }) {
  const out = { count, position: new Float32Array(count * 3), seed: new Float32Array(count), bright: new Float32Array(count), size: new Float32Array(count), halo: new Float32Array(count) };
  for (let i = 0; i < count; i++) {
    const halo = random() < SPACE.halo;
    const bright = halo ? 0.8 + 0.2 * random() : 0.7 * random() ** 7;
    const direction = !halo && random() < SPACE.band ? bandDirection(random) : shellPoint(random, 1, 1);
    const radius = SPACE.outer - (SPACE.outer - SPACE.inner) * bright;
    out.position.set(direction.map((value) => value * radius), i * 3);
    out.seed[i] = random();
    out.bright[i] = bright;
    out.halo[i] = halo ? 1 : 0;
    out.size[i] = 1 + 1.2 * bright;
  }
  return out;
}

export const KINDS = ["personal", "professional", "product", "education"];

export const BACKDROP = {
  deep: { count: 16000, mobile: 6000, alpha: [0.1, 0.8], band: 0.35, radius: 1650, inner: 400 },
  far: { count: 36, alpha: [0.15, 0.4], radius: [5, 14] },
  haze: { alpha: 0.08 },
  glow: { max: 0.15, scale: 2.6 },
};

const equirect = ([x, y, z]) => [Math.atan2(y, x) / (2 * Math.PI) + 0.5, Math.acos(Math.max(-1, Math.min(1, z))) / Math.PI];

export function deepField({ count = BACKDROP.deep.count, random, centre = [0, 0, 0], inner = BACKDROP.deep.inner, outer = BACKDROP.deep.radius }) {
  const [low, high] = BACKDROP.deep.alpha;
  const out = { count, position: new Float32Array(count * 3), seed: new Float32Array(count), bright: new Float32Array(count), size: new Float32Array(count) };
  for (let i = 0; i < count; i++) {
    const direction = random() < BACKDROP.deep.band ? bandDirection(random) : shellPoint(random, 1, 1);
    const length = Math.hypot(...direction);
    const near = Math.log(outer / (inner * (outer / inner) ** random())) / Math.log(outer / inner);
    const radius = outer * (inner / outer) ** near;
    out.position.set(direction.map((value, k) => centre[k] + (value / length) * radius), i * 3);
    out.seed[i] = random();
    out.bright[i] = Math.min(high, (low + (high - low) * random() ** 4) * (1 + 0.6 * near ** 3));
    out.size[i] = 1 + 1.4 * near ** 4;
  }
  return out;
}

export function farGalaxies({ count = BACKDROP.far.count, random }) {
  const [low, high] = BACKDROP.far.alpha;
  const [small, large] = BACKDROP.far.radius;
  return Array.from({ length: count }, () => {
    const [u, v] = equirect(shellPoint(random, 1, 1));
    return { u, v, radius: small + (large - small) * random(), squash: 0.35 + 0.5 * random(), angle: random() * Math.PI, alpha: low + (high - low) * random() };
  });
}

export function glowOf(galaxy, most) {
  return { scale: galaxy.radius * BACKDROP.glow.scale, strength: BACKDROP.glow.max * (0.25 + 0.75 * (galaxy.count / Math.max(1, most))) };
}

const gaussian = (random) => Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());

export function dotsPerWeight(marks, { base = BUDGET.base, cap = BUDGET.cap } = {}) {
  const total = marks.reduce((sum, mark) => sum + mark.weight ** 1.5, 0) || 1;
  return Math.min(base, cap / total);
}

export function memories({ marks, sky, today, random, base = BUDGET.base, cap = BUDGET.cap, trail = BUDGET.trail, facets = {} }) {
  const per = dotsPerWeight(marks, { base, cap });
  const share = (mark) => Math.max(8, Math.round(per * mark.weight ** 1.5));
  const names = FACETS.filter((facet) => facets[facet]?.length);
  const count = marks.reduce((sum, mark) => sum + share(mark), 0) + trail;
  const out = {
    count,
    position: new Float32Array(count * 3),
    center: new Float32Array(count * 3),
    from: new Float32Array(count * 3),
    facet: Object.fromEntries(FACETS.map((facet) => [facet, new Float32Array(count).fill(-1)])),
    u: new Float32Array(count),
    order: new Float32Array(count),
    seed: new Float32Array(count),
    size: new Float32Array(count),
    ahead: new Float32Array(count),
    kind: new Float32Array(count),
    memory: new Float32Array(count),
    galaxy: new Float32Array(count).fill(-1),
  };
  const write = (i, at, centre, u, size, ahead, kind, memory, order) => {
    out.position.set(at, i * 3);
    out.center.set(centre, i * 3);
    out.from.set(shellPoint(random), i * 3);
    out.u[i] = u;
    out.order[i] = order;
    out.seed[i] = random();
    out.size[i] = size;
    out.ahead[i] = ahead;
    out.kind[i] = kind;
    out.memory[i] = memory;
  };
  let i = 0;
  marks.forEach((mark, memory) => {
    for (let k = 0, n = share(mark); k < n; k++, i++) {
      const direction = [gaussian(random), gaussian(random), gaussian(random) * 0.8];
      const reach = mark.spread * Math.abs(gaussian(random)) * 0.55;
      const length = Math.hypot(...direction) || 1;
      const offset = direction.map((value) => (value / length) * reach);
      write(i, mark.position.map((value, axis) => value + offset[axis]), mark.position, unitsOf(mark.year), 0.1 + random() * 0.16, 0, 1, memory, orderOf(sky, mark.year));
      out.galaxy[i] = mark.period;
      for (const facet of names) out.facet[facet][i] = mark.members[facet][0] ?? -1;
    }
  });

  const last = today + AHEAD[1] + 0.4;
  const profiles = Object.fromEntries(names.map((facet) => [facet, activityTable(marks, facet, facets[facet].length, last)]));
  const threadCount = facets.threads?.length ?? 0;
  const sector = (Math.PI * 2) / Math.max(1, threadCount);
  const peak = densityPeak(marks);
  for (let k = 0; k < trail; k++, i++) {
    const ahead = random() < 0.06;
    const year = ahead ? today + random() * (last - today) : START + random() * (today - START);
    const thread = !profiles.threads ? -1 : ahead ? Math.floor(random() * threadCount) : assign(profiles.threads, year, random);
    const busy = thread >= 0 && !ahead ? activityAt(profiles.threads, year, thread) : densityAt(year, marks, peak);
    let at;
    if (ahead) at = aheadPoint(sky, random(), gaussian(random) * 2.4);
    else {
      const galaxy = sky.list[galaxyOf(sky, year)];
      const core = random() < 0.14;
      const fraction = core ? random() * 0.2 : fractionIn(galaxy, year);
      at = galaxyPoint(galaxy, thread, threadCount, fraction, gaussian(random) * sector * (core ? 1.2 : 0.14), gaussian(random) * (0.5 + 0.9 * busy));
    }
    for (const facet of names) out.facet[facet][i] = facet === "threads" ? thread : ahead ? Math.floor(random() * facets[facet].length) : assign(profiles[facet], year, random);
    write(i, at, at, unitsOf(year), 0.05 + random() * 0.07, ahead ? 1 : 0, 0, -1, ahead ? 1 : orderOf(sky, year));
    out.galaxy[i] = ahead ? -1 : galaxyOf(sky, year);
  }
  return out;
}

export const RAIL = { start: START, end: 2031, book: 2027.8, clone: 2029.6 };

export const PLAY = { seconds: 16 };

export const playYear = (elapsed, to, from = START, seconds = PLAY.seconds) => from + (to - from) * clamp01(elapsed / seconds);

export const playElapsed = (year, to, from = START, seconds = PLAY.seconds) => clamp01((year - from) / (to - from)) * seconds;

export const railPercent = (year) => ((year - RAIL.start) / (RAIL.end - RAIL.start)) * 100;

export const SPIN = { rate: 0.004, ramp: 6, slots: 16 };

export const spinRate = (galaxy) => (SPIN.rate * 12) / (galaxy.radius + 12);

export const spinTime = (seconds) => (seconds <= 0 ? 0 : seconds - SPIN.ramp * (1 - Math.exp(-seconds / SPIN.ramp)));

export const spinAngle = (galaxy, seconds) => spinRate(galaxy) * spinTime(seconds);

export function spun(point, pivot, angle) {
  const [dx, dy] = [point[0] - pivot[0], point[1] - pivot[1]];
  return [pivot[0] + Math.cos(angle) * dx - Math.sin(angle) * dy, pivot[1] + Math.sin(angle) * dx + Math.cos(angle) * dy, point[2]];
}
