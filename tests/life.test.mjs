import { test } from "node:test";
import assert from "node:assert/strict";
import { AHEAD, BUDGET, LANES, PLAY, RAIL, SKY, SPACE, SPREAD, START, activityAt, activityTable, aheadPoint, assign, crowdScale, densityAt, densityByYear, dotsPerWeight, fractionIn, futures, galaxies, galaxyOf, lanes, layout, memories, onPath, orderOf, yearOf, playElapsed, playYear, precisionOf, railPercent, shellPoint, skyOf, SPIN, spinAngle, spinRate, spinTime, spun, starfield, todayYear, unitsOf, yearRings, years } from "../assets/js/life.js";
import { lerp, seeded, smoothstep } from "../assets/js/util.js";
import { monthsUntil, untilText } from "../assets/js/life.js";
import { CLOUD, DISCOVER, KIND_TINT, DUST_VERTEX, ENTRANCE, POINTER, formedAt, igniteAt } from "../assets/js/shaders.js";
import { archive } from "./fixtures/archive.mjs";
import { loadContent } from "../src/content.mjs";

const { life } = loadContent();

const entries = life.milestones;
const facets = { threads: life.threads };
const TODAY = Math.max(2026.75, ...years(entries)) + 0.05;
const options = { periods: life.periods, today: TODAY };
const marks = () => layout(entries, facets, options);
const skyOfLife = () => skyOf(entries, years(entries), options);
const gap = (a, b) => Math.hypot(...a.map((value, axis) => value - b[axis]));
const flatGap = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const near = (a, b) => Math.abs(a - b) < 1e-4;
const withBudget = (marksOf, overrides = {}) => memories({ marks: marksOf, sky: skyOfLife(), today: TODAY, random: seeded(1980), facets, ...overrides });

test("a date is a year or a month and nothing else", () => {
  assert.equal(precisionOf("1980"), "year");
  assert.equal(precisionOf("2001-06"), "month");
  for (const wrong of ["2001-06-11", "1980-4", "80", "", "2001/06", "April 1980"]) assert.equal(precisionOf(wrong), null, wrong);
  assert.throws(() => years([{ date: "2001-06-11" }]), /neither YYYY nor YYYY-MM/);
});

test("a month sits in the middle of its month and a year in the middle of its year", () => {
  assert.deepEqual(years([{ date: "2001-06" }, { date: "1980" }]), [2001 + 5.5 / 12, 1980.5]);
});

test("entries that share a year are spread across it, and entries that share a month across the month, in the order they were written", () => {
  const [first, second, other] = years([{ date: "2020" }, { date: "2020" }, { date: "2022" }]);
  assert.equal(first, 2020.25);
  assert.equal(second, 2020.75);
  assert.equal(other, 2022.5);
  const [early, late] = years([{ date: "2021-03" }, { date: "2021-03" }]);
  assert.ok(early < late && Math.floor(early * 12) === Math.floor(late * 12), "both stay inside March");
  assert.ok(Math.abs((late - early) * 12 - 0.5) < 1e-9);
});

test("a milestone never lands outside the year it was given", () => {
  const placed = years(entries);
  entries.forEach(({ date }, i) => {
    assert.ok(placed[i] >= +date.slice(0, 4) && placed[i] < +date.slice(0, 4) + 1, date);
    if (date.length === 7) assert.equal(Math.floor((placed[i] % 1) * 12), +date.slice(5, 7) - 1, date);
  });
});

test("lanes keep memories of the same moment apart and use only the five lanes", () => {
  const placed = [2020.1, 2020.2, 2020.3, 2020.4, 2020.5, 2020.6, 5000];
  const given = lanes(placed, 0.9);
  assert.ok(given.every((lane) => LANES.includes(lane)));
  assert.equal(new Set(given.slice(0, 5)).size, 5, "five memories inside one window take five lanes");
  assert.equal(given[6], 0, "a lone memory sits on the line");
  const spaced = lanes([2000, 2002], 0.9);
  assert.deepEqual(spaced, [0, 0]);
});

test("crowded years make smaller clouds and an empty year leaves them whole", () => {
  assert.deepEqual(crowdScale([1990, 2010]), [1, 1]);
  const crowd = crowdScale(Array.from({ length: 24 }, (_, k) => 2020 + k * 0.02));
  assert.ok(crowd.every((scale) => scale < 0.45 && scale > 0.2));
});

test("the real milestones keep the order of the page, each in its period's galaxy, with a cloud no bigger than its weight allows", () => {
  const placed = marks();
  const sky = skyOfLife();
  assert.equal(placed.length, entries.length);
  placed.forEach((mark, i) => {
    assert.equal(mark.id, entries[i].id);
    if (i) assert.ok(mark.year > placed[i - 1].year, `${mark.id} is not after ${placed[i - 1].id}`);
    assert.ok(mark.spread > 0 && mark.spread <= SPREAD[entries[i].weight], mark.id);
    assert.equal(mark.weight, entries[i].weight);
    assert.equal(life.periods[mark.period], entries[i].period, mark.id);
    assert.ok(flatGap(mark.position, sky.list[mark.period].centre) <= sky.list[mark.period].radius + 1e-6, `${mark.id} is inside its galaxy`);
  });
  assert.ok(placed[0].year >= START && placed.at(-1).year <= TODAY);
});

test("memory clouds are bigger for heavier milestones", () => {
  assert.ok(SPREAD[3] > SPREAD[2] && SPREAD[2] > SPREAD[1]);
});

test("each memory belongs to its threads, the first one leading, and keeps its links", () => {
  const placed = marks();
  entries.forEach((entry, i) => {
    assert.deepEqual(placed[i].members.threads, entry.threads.map((id) => life.threads.indexOf(id)), entry.id);
    assert.deepEqual(placed[i].links, entry.links ?? []);
  });
});

test("a secondary thread counts half as much as the first in a thread's activity", () => {
  const placed = layout([{ id: "x1", date: "2000", weight: 1, threads: ["a", "b"] }], { threads: ["a", "b"] });
  const profile = activityTable(placed, "threads", 2, 2010);
  assert.ok(Math.abs(activityAt(profile, placed[0].year, 1) / activityAt(profile, placed[0].year, 0) - 0.5) < 1e-6);
});

test("without periods every memory falls in one galaxy, an unknown period is an error, and facets are memberships", () => {
  const single = layout(entries, { threads: life.threads, people: ["merche"] });
  assert.ok(single.every((mark) => mark.period === 0));
  assert.deepEqual(Object.keys(single[0].members), ["threads", "people"]);
  assert.throws(() => layout([...entries, { id: "z", date: "2000", weight: 1, period: "unknown" }], facets, options), /memory z: period "unknown"/);
});

test("density is highest where most happened, lowest in the gap, and always within 0 and 1", () => {
  const placed = marks();
  const busiest = placed.reduce((best, mark) => (densityAt(mark.year, placed) > densityAt(best.year, placed) ? mark : best));
  assert.ok(densityAt(busiest.year, placed) > 0.9, "the busiest moment is near the top");
  assert.ok(densityAt(busiest.year, placed) > densityAt(1997, placed) + 0.4, "and far above the empty years");
  for (let year = START; year <= 2031; year += 0.25) {
    const value = densityAt(year, placed);
    assert.ok(value >= 0 && value <= 1, `${value} at ${year}`);
  }
});

test("density by year counts the weights of each year and covers every year since 1980", () => {
  const bars = densityByYear(entries, TODAY);
  assert.equal(bars.length, Math.floor(TODAY) - START + 1);
  assert.deepEqual(bars.map((bar) => bar.year), Array.from({ length: bars.length }, (_, k) => START + k));
  assert.equal(Math.max(...bars.map((bar) => bar.value)), 1);
  assert.equal(bars.find((bar) => bar.year === 1997).value, 0);
  assert.ok(bars.find((bar) => bar.year === 2020).value > bars.find((bar) => bar.year === 2013).value);
});

test("a thread is active around its own memories and quiet elsewhere, and dust follows it", () => {
  const placed = marks();
  const profile = activityTable(placed, "threads", life.threads.length, TODAY + 5);
  const family = life.threads.indexOf("family");
  const craft = life.threads.indexOf("craft");
  assert.ok(activityAt(profile, 2020.5, family) > 0.6, "the children make 2020 a family year");
  assert.ok(activityAt(profile, 2008, family) < 0.05);
  assert.ok(activityAt(profile, 2001.5, craft) > 0.5);
  const random = seeded(3);
  const draws = Array.from({ length: 4000 }, () => assign(profile, 2022.2, random));
  const share = (item) => draws.filter((drawn) => drawn === item).length / draws.length;
  assert.ok(share(family) > share(craft), "a family year draws more family dust");
  assert.ok(share(life.threads.indexOf("body")) > 0.01, "every thread keeps a trace of dust");
});

test("the memories are clouds around each milestone plus a trail of days, each dot with its centre", () => {
  const placed = marks();
  const cloud = withBudget(placed, { base: 300, trail: 2000 });
  const clouds = cloud.kind.reduce((sum, value) => sum + value, 0);
  assert.equal(cloud.count, clouds + 2000);
  for (const key of ["position", "center", "from"]) {
    assert.equal(cloud[key].length, cloud.count * 3, key);
    assert.ok(cloud[key].every(Number.isFinite), key);
  }
  for (const key of ["u", "seed", "size", "ahead", "kind", "memory"]) assert.equal(cloud[key].length, cloud.count, key);
  assert.equal(cloud.facet.threads.length, cloud.count);
  assert.ok(cloud.facet.people.every((item) => item === -1), "no people facet without people");
});

test("a heavier milestone gets more dots, in proportion to its weight to the power of one and a half", () => {
  const placed = marks();
  const cloud = withBudget(placed, { base: 300, trail: 0 });
  const countOf = (mark) => cloud.memory.reduce((n, memory) => n + (memory === placed.indexOf(mark) ? 1 : 0), 0);
  const light = placed.find((mark) => mark.weight === 1);
  const heavy = placed.find((mark) => mark.weight === 3);
  assert.ok(Math.abs(countOf(heavy) / countOf(light) - 3 ** 1.5) < 0.2, `${countOf(heavy)} vs ${countOf(light)}`);
});

test("every dot of a cloud stays within reach of its milestone and a trail dot sits where it is drawn", () => {
  const placed = marks();
  const cloud = withBudget(placed, { base: 200, trail: 2000 });
  for (let i = 0; i < cloud.count; i++) {
    const at = [cloud.position[i * 3], cloud.position[i * 3 + 1], cloud.position[i * 3 + 2]];
    const centre = [cloud.center[i * 3], cloud.center[i * 3 + 1], cloud.center[i * 3 + 2]];
    if (cloud.kind[i]) {
      const mark = placed[cloud.memory[i]];
      assert.ok(gap(centre, mark.position) < 1e-4, `cloud dot ${i} has the wrong centre`);
      assert.ok(gap(at, centre) <= mark.spread * 4.5 * 0.55 + 1e-6, `cloud dot ${i} drifted`);
      assert.ok(near(cloud.u[i], unitsOf(mark.year)));
      assert.equal(cloud.facet.threads[i], mark.members.threads[0]);
    } else {
      assert.equal(cloud.memory[i], -1);
      assert.ok(cloud.facet.threads[i] >= 0 && cloud.facet.threads[i] < life.threads.length);
      assert.deepEqual(at, centre, `trail dot ${i} has an offset`);
    }
  }
});

test("only the trail has dots ahead of today, and they are a small share of it", () => {
  const cloud = withBudget(marks(), { base: 100, trail: 6000 });
  let ahead = 0;
  for (let i = 0; i < cloud.count; i++) {
    if (cloud.ahead[i]) {
      ahead++;
      assert.equal(cloud.kind[i], 0);
      assert.ok(cloud.u[i] >= unitsOf(TODAY) - 1e-6 && cloud.u[i] <= unitsOf(TODAY + AHEAD[1] + 0.4) + 1e-6);
    } else if (!cloud.kind[i]) assert.ok(cloud.u[i] <= unitsOf(TODAY) + 1e-6);
  }
  assert.ok(ahead / 6000 > 0.04 && ahead / 6000 < 0.08, `${ahead / 6000} of the trail`);
});

test("the same seed draws the same life", () => {
  const draw = (seed) => withBudget(marks(), { base: 100, trail: 200, random: seeded(seed) });
  assert.deepEqual(draw(3).position, draw(3).position);
  assert.notDeepEqual(draw(3).position, draw(4).position);
});

test("two hundred and fifty memories stay inside the dot budget, keep their clouds apart and draw quickly", () => {
  const { entries: many, facets: all, periods } = archive({ count: 250 });
  const placed = layout(many, all, { periods, today: TODAY });
  const sky = skyOf(many, years(many), { periods, today: TODAY });
  const started = performance.now();
  const cloud = memories({ marks: placed, today: TODAY, random: seeded(5), facets: all, sky });
  assert.ok(performance.now() - started < 2500, "drawing a big life is slow");
  assert.ok(cloud.count <= BUDGET.cap + BUDGET.trail + placed.length * 8, `${cloud.count} dots`);
  assert.ok(dotsPerWeight(placed) < BUDGET.base, "a big life gets fewer dots per memory");
  assert.equal(dotsPerWeight(marks()), BUDGET.base, "a small life keeps them all");
  for (const facet of ["threads", "people", "places"]) assert.ok(cloud.facet[facet].some((item) => item >= 0), `${facet} can still filter the dots`);
  assert.ok(cloud.center.every(Number.isFinite));
  const lightest = Math.min(...placed.map((mark) => mark.spread));
  assert.ok(lightest < SPREAD[1] * 0.7, "dense years shrink their clouds");
  const gaps = placed.map((mark, i) => Math.min(...placed.filter((_, j) => j !== i).map((other) => gap(mark.position, other.position))));
  assert.ok([...gaps].sort((a, b) => a - b)[Math.floor(gaps.length * 0.1)] > 1.2, "a tenth of the clouds sit on top of another");
});

test("the timeline rail maps years to a percentage and keeps the book and the clone after today", () => {
  assert.equal(railPercent(RAIL.start), 0);
  assert.equal(railPercent(RAIL.end), 100);
  assert.ok(railPercent(2000) > 39 && railPercent(2000) < 40);
  assert.ok(RAIL.book > TODAY && RAIL.clone > RAIL.book && RAIL.end > RAIL.clone);
  assert.ok(RAIL.book > 2026.9);
});

test("today is a fraction of its own year and grows with the day", () => {
  const first = todayYear(Date.UTC(2026, 0, 1, 12));
  const middle = todayYear(Date.UTC(2026, 6, 2, 12));
  assert.ok(first >= 2026 && first < 2026.01);
  assert.ok(middle > 2026.49 && middle < 2026.51);
  assert.ok(todayYear(Date.UTC(2027, 0, 1, 12)) >= 2027);
});

test("smoothstep is 0 before, 1 after and monotonic between", () => {
  assert.equal(smoothstep(0, 1, -1), 0);
  assert.equal(smoothstep(0, 1, 2), 1);
  assert.ok(smoothstep(0, 1, 0.3) < smoothstep(0, 1, 0.6));
  assert.equal(lerp(2, 4, 0.5), 3);
});

test("seeded random is repeatable", () => {
  const [a, b] = [seeded(7), seeded(7)];
  assert.deepEqual([a(), a(), a()], [b(), b(), b()]);
});

test("the dots start as stars on a far shell around the whole life, and the background sky lies on the same shell", () => {
  const sample = [{ id: "a", date: "1990", weight: 2 }, { id: "b", date: "2010-05", weight: 3 }];
  const cloud = memories({ marks: layout(sample), sky: skyOf(sample, years(sample)), today: 2026, random: seeded(3), trail: 400 });
  const sky = starfield({ count: 500, random: seeded(4) });
  for (const [count, points] of [[cloud.count, cloud.from], [sky.count, sky.position]]) {
    for (let i = 0; i < count; i++) {
      const radius = Math.hypot(points[i * 3], points[i * 3 + 1], points[i * 3 + 2]);
      assert.ok(radius >= SPACE.inner - 1e-3 && radius <= SPACE.outer + 1e-3, `point ${i} is ${radius.toFixed(1)} from the centre`);
    }
  }
  const sides = [0, 1, 2].map((axis) => [...Array(sky.count).keys()].filter((i) => sky.position[i * 3 + axis] > 0).length / sky.count);
  for (const share of sides) assert.ok(share > 0.4 && share < 0.6, "the sky surrounds the viewer on every side");
  assert.ok(sky.seed.every((value) => value >= 0 && value <= 1));
  const [x, y, z] = shellPoint(() => 0.5, 10, 20);
  assert.ok(Math.abs(Math.hypot(x, y, z) - 15) < 1e-9);
});

test("the stars have magnitudes, a few with a halo, a faint band of density and depth that follows brightness", () => {
  const field = starfield({ count: 6000, random: seeded(11) });
  const all = [...Array(field.count).keys()];
  const radiusOf = (i) => Math.hypot(field.position[i * 3], field.position[i * 3 + 1], field.position[i * 3 + 2]);
  const faint = all.filter((i) => field.bright[i] < 0.3);
  assert.ok(faint.length > field.count * 0.85, "about nine in ten stars are faint");
  const haloed = all.filter((i) => field.halo[i] === 1);
  assert.ok(haloed.length > field.count * 0.005 && haloed.length < field.count * 0.03, `${haloed.length} haloed stars`);
  assert.ok(haloed.every((i) => field.bright[i] >= 0.8), "only the brightest carry a halo");
  assert.ok(all.every((i) => field.bright[i] >= 0 && field.bright[i] <= 1 && field.size[i] >= 0.999 && field.size[i] <= 2.201));
  const dim = all.filter((i) => field.halo[i] === 0).sort((a, b) => field.bright[a] - field.bright[b]);
  assert.ok(field.size[dim.at(-1)] > field.size[dim[0]], "brighter stars are larger");
  const normal = [0, -Math.sin(SPACE.tilt), Math.cos(SPACE.tilt)];
  const nearPlane = all.filter((i) => Math.abs((field.position[i * 3] * normal[0] + field.position[i * 3 + 1] * normal[1] + field.position[i * 3 + 2] * normal[2]) / radiusOf(i)) < 0.3);
  assert.ok(nearPlane.length / field.count > 0.42, `the band holds ${(nearPlane.length / field.count).toFixed(2)} of the stars, a uniform sky holds 0.30`);
  const mean = (list) => list.reduce((sum, i) => sum + radiusOf(i), 0) / list.length;
  assert.ok(mean(all.filter((i) => field.bright[i] > 0.5)) + 150 < mean(faint), "bright stars lie nearer than faint ones, so they move more as the camera turns");
});

const fromPole = (sky, point) => Math.hypot(point[0] + sky.pole[0], point[1] + sky.pole[1]);

test("the sky has one galaxy per period, in order along a path that turns outwards, never overlapping, sized by how much each period holds", () => {
  const sky = skyOfLife();
  assert.equal(sky.list.length, life.periods.length);
  sky.list.forEach((galaxy, k) => {
    assert.deepEqual(galaxy.centre, onPath(sky, galaxy.along), "on the path");
    assert.ok(galaxy.end > galaxy.start, life.periods[k]);
    assert.equal(galaxy.count, entries.filter((entry) => entry.period === life.periods[k]).length);
    assert.ok(near(galaxy.radius, SKY.core + SKY.reach * Math.sqrt(galaxy.count)));
    const next = sky.list[k + 1];
    if (!next) return;
    assert.ok(next.along > galaxy.along, "in the order of the periods");
    assert.ok(fromPole(sky, next.centre) > fromPole(sky, galaxy.centre), "each period further out than the last");
    assert.ok(next.centre[2] > galaxy.centre[2], "and a little higher: the path rises gently");
    assert.ok(next.start >= galaxy.start);
    assert.ok(flatGap(galaxy.centre, next.centre) > galaxy.radius + next.radius + SKY.gap * 0.8, `${life.periods[k]} and the next do not touch`);
  });
  const [first, final] = [sky.list[0], sky.list.at(-1)];
  assert.ok(sky.ahead > final.along + final.radius && sky.length - sky.ahead === SKY.future, "the path goes on past the last period, for what is ahead");
  for (let k = 0; k <= 8; k++) assert.ok(flatGap(aheadPoint(sky, k / 8), first.centre) > first.radius + SKY.gap, "what is ahead never comes back to the first period");
  const corners = [0, 1].map((axis) => [Math.min(...sky.list.map((galaxy) => galaxy.centre[axis] - galaxy.radius)), Math.max(...sky.list.map((galaxy) => galaxy.centre[axis] + galaxy.radius))]);
  corners.forEach(([low, high]) => assert.ok(Math.abs(low + high) < (high - low) * 0.3, "the sky is centred on the scene"));
  const small = galaxies([1990, 1991, 2001], [0, 0, 1], 2, 2026);
  assert.ok(small.list[0].radius > small.list[1].radius);
  assert.equal(small.list[0].end, 2001);
  assert.equal(small.list[1].end, 2026);
  assert.equal(galaxyOf(small, 1995), 0);
  assert.equal(galaxyOf(small, 2010), 1);
  assert.equal(galaxyOf(small, 2040), 1);
});

test("in the sky every memory is a star inside its period's galaxy, later ones farther from its core", () => {
  const placed = marks();
  const sky = skyOfLife();
  placed.forEach((mark, i) => {
    const galaxy = sky.list[mark.period];
    assert.equal(life.periods[mark.period], entries[i].period, mark.id);
    assert.ok(flatGap(mark.position, galaxy.centre) <= galaxy.radius + 1e-6, `${mark.id} is inside its galaxy`);
  });
  for (let a = 0; a < placed.length; a++) {
    for (let b = a + 1; b < placed.length; b++) {
      if (placed[a].period !== placed[b].period || placed[b].year - placed[a].year < 0.01) continue;
      const galaxy = sky.list[placed[a].period];
      assert.ok(flatGap(placed[b].position, galaxy.centre) > flatGap(placed[a].position, galaxy.centre), `${placed[b].id} is farther out than ${placed[a].id}`);
    }
  }
  const spots = placed.map((mark) => mark.position);
  const closest = spots.map((spot, i) => Math.min(...spots.filter((_, j) => j !== i).map((other) => gap(spot, other))));
  assert.ok(closest.filter((distance) => distance < 0.8).length <= Math.ceil(placed.length * 0.05), "stars rarely sit on each other");
  assert.ok(near(fractionIn(sky.list[0], sky.list[0].start), 0));
});

test("today, the book and the clone follow the path outwards past the last period, and the trail fills the galaxies", () => {
  const sky = skyOfLife();
  const ahead = futures(sky);
  const final = sky.list.at(-1);
  const now = ahead.today;
  assert.deepEqual(now, aheadPoint(sky, SKY.today));
  assert.deepEqual(ahead.book, onPath(sky, sky.ahead + SKY.ahead[0] * SKY.future));
  assert.deepEqual(ahead.clone, onPath(sky, sky.ahead + SKY.ahead[1] * SKY.future));
  for (const point of [now, ahead.book, ahead.clone]) assert.ok(flatGap(point, final.centre) > final.radius, "outside the last galaxy");
  assert.ok(fromPole(sky, now) < fromPole(sky, ahead.book) && fromPole(sky, ahead.book) < fromPole(sky, ahead.clone), "today, then the book, then the clone, further out each time");
  assert.ok(ahead.clone[2] > final.centre[2], "and higher than the past");
  const placed = marks();
  const cloud = memories({ marks: placed, today: TODAY, random: seeded(8), facets, sky, trail: 3000 });
  const centre = cloud.center;
  let inside = 0;
  let trail = 0;
  for (let i = 0; i < cloud.count; i++) {
    if (cloud.kind[i] === 1 || cloud.ahead[i] === 1) continue;
    trail++;
    const point = [centre[i * 3], centre[i * 3 + 1]];
    if (sky.list.some((galaxy) => flatGap(point, galaxy.centre) <= galaxy.radius + 2.5)) inside++;
  }
  assert.ok(inside / trail > 0.97, `${inside} of ${trail} trail dots are in a galaxy`);
});

test("playing the life runs from birth to today at a steady pace and can resume from any year", () => {
  assert.equal(playYear(0, 2026), START);
  assert.equal(playYear(PLAY.seconds, 2026), 2026);
  assert.equal(playYear(PLAY.seconds * 3, 2026), 2026, "it stops at today");
  assert.equal(playYear(-1, 2026), START);
  const steps = Array.from({ length: 9 }, (_, k) => playYear((k * PLAY.seconds) / 8, 2026));
  steps.slice(1).forEach((year, k) => assert.ok(near(year - steps[k], (2026 - START) / 8), "the same years every second"));
  for (const year of [START, 1994.3, 2011, 2026]) assert.ok(near(playYear(playElapsed(year, 2026), 2026), year), `resumes at ${year}`);
});

test("on load the life is discovered in order: a quiet sky first, the first memory sparks right after the first touch, every one before the gathering ends", () => {
  assert.ok(ENTRANCE.sky >= 1 && ENTRANCE.wait <= 8, "a breath of sky, and the opening starts by itself if nobody touches the first memory");
  assert.ok(ENTRANCE.delay + igniteAt(0) * ENTRANCE.seconds < 1.5, "the first memory sparks at once after the touch");
  assert.ok(ENTRANCE.delay + ENTRANCE.seconds < 5 && ENTRANCE.dolly >= ENTRANCE.seconds, "the gathering is under five seconds and the camera settles with the galaxies");
  assert.ok(igniteAt(1) + DISCOVER.burst < 1, "the last memory has burst before the end");
  for (const fraction of [0, 0.25, 0.5, 0.9]) {
    assert.ok(igniteAt(fraction + 0.1) > igniteAt(fraction), "later years spark later");
    assert.ok(near(formedAt(igniteAt(fraction)), fraction), "labels light when their year sparks");
  }
  assert.equal(formedAt(0), 0);
  assert.equal(formedAt(1), Infinity, "once gathered, everything is formed");
  for (const key of ["order", "jitter", "flight", "arrive", "burst", "glow"]) assert.match(DUST_VERTEX, new RegExp(`#define DISCOVER_${key.toUpperCase()} ${DISCOVER[key].toFixed(2)}`), key);
});

test("every galaxy takes the same share of the discovery, however many years it covers, and labels follow the same clock", () => {
  const sky = skyOfLife();
  const count = sky.list.length;
  sky.list.forEach((galaxy, k) => {
    assert.ok(near(orderOf(sky, galaxy.start + 1e-6), k / count), `${life.periods[k]} starts at ${k}/${count}`);
    assert.ok(orderOf(sky, (galaxy.start + galaxy.end) / 2) < (k + 1) / count);
    assert.ok(near(yearOf(sky, k / count), galaxy.start), "and the order maps back to its first year");
  });
  assert.ok(sky.list.some((galaxy) => galaxy.end - galaxy.start > 3 * Math.min(...sky.list.map((g) => g.end - g.start))), "the periods really are uneven");
  assert.equal(yearOf(sky, 1), Infinity);
  const cloud = withBudget(marks(), { base: 50, trail: 3000 });
  const lastOrder = [...cloud.order].filter((value, i) => !cloud.ahead[i]);
  assert.ok(Math.max(...lastOrder) <= 1 && Math.min(...lastOrder) >= 0);
  for (let k = 0; k < count; k++) assert.ok(lastOrder.some((value) => value >= k / count && value < (k + 1) / count), `dots of galaxy ${k} spark in its own slot`);
  cloud.ahead.forEach((flag, i) => flag && assert.equal(cloud.order[i], 1));
});

test("a galaxy draws one ring per year at the distance its memories of that year sit from the core, and spaces them out when it spans many years", () => {
  const sky = skyOfLife();
  sky.list.forEach((galaxy, k) => {
    const rings = yearRings(galaxy);
    assert.ok(rings.length >= 1 && rings.length <= 8, `${life.periods[k]}: ${rings.length} rings`);
    rings.forEach((ring, n) => {
      assert.ok(ring.year > galaxy.start && ring.year <= galaxy.end + 1e-9);
      assert.ok(Math.abs(ring.radius - galaxy.radius * (SKY.inner + (1 - SKY.inner) * fractionIn(galaxy, ring.year))) < 1e-9, "the distance a memory of that year sits at");
      assert.ok(ring.radius > galaxy.radius * SKY.inner && ring.radius <= galaxy.radius + 1e-9, "inside the galaxy, outside the core");
      if (n) assert.ok(ring.radius > rings[n - 1].radius && ring.year > rings[n - 1].year, "later years lie further out");
    });
  });
  const short = { start: 2020.25, end: 2025.04, radius: 15 };
  assert.deepEqual(yearRings(short).map((ring) => ring.year), [2021, 2022, 2023, 2024, 2025], "every year of a short period");
  assert.ok(Math.abs(yearRings(short).at(-1).radius - 15) < 0.2, "the last year is at the rim");
  const long = { start: 1980.29, end: 2001.46, radius: 16 };
  assert.deepEqual(yearRings(long).map((ring) => ring.year), [1985, 1990, 1995, 2000], "every fifth year of a long one");
  assert.deepEqual(yearRings({ start: 2010.5, end: 2010.9, radius: 10 }), [], "a period inside one year has no ring");
  assert.ok(yearRings({ start: 1900, end: 2100, radius: 10 }).length <= 8);
});

test("each dot knows its galaxy, and a galaxy turns about its centre slowly, the bigger ones more slowly, starting from rest", () => {
  const sky = skyOfLife();
  const cloud = withBudget(layout(entries, facets, options), { trail: 800 });
  const marks = layout(entries, facets, options);
  assert.equal(cloud.galaxy.length, cloud.count);
  let memoryDots = 0;
  for (let i = 0; i < cloud.count; i++) {
    if (cloud.kind[i] === 1) {
      memoryDots++;
      assert.equal(cloud.galaxy[i], marks[cloud.memory[i]].period, "a memory's dots belong to its period");
    } else if (cloud.ahead[i] === 1) assert.equal(cloud.galaxy[i], -1, "what is ahead belongs to none");
    else assert.ok(cloud.galaxy[i] >= 0 && cloud.galaxy[i] < sky.list.length);
  }
  assert.ok(memoryDots > 0);
  const [small, big] = [{ radius: 5 }, { radius: 20 }];
  assert.ok(spinRate(small) > spinRate(big) && spinRate(big) > 0);
  assert.equal(spinTime(0), 0);
  assert.equal(spinTime(-4), 0);
  assert.ok(spinTime(1) < 0.1, "it starts from rest");
  assert.ok(Math.abs(spinTime(600) - (600 - SPIN.ramp)) < 1e-6, "then at a steady rate");
  assert.ok(spinAngle(big, 60) < 0.25, "a minute turns a galaxy by a few degrees");
  const about = spun([10, 0, 3], [0, 0, 0], Math.PI / 2);
  assert.ok(Math.abs(about[0]) < 1e-9 && Math.abs(about[1] - 10) < 1e-9 && about[2] === 3, "a quarter turn, height kept");
  assert.deepEqual(spun([4, 7, 1], [4, 7, 0], 1.3).map((value) => +value.toFixed(9)), [4, 7, 1], "the centre does not move");
  const back = spun(spun([12, -3, 2], [5, 5, 0], 0.7), [5, 5, 0], -0.7);
  assert.ok(Math.abs(back[0] - 12) < 1e-9 && Math.abs(back[1] + 3) < 1e-9, "a turn can be undone");
});

test("the pointer pushes only the fine dust, a little, inside a small radius, with one uniform", () => {
  assert.ok(POINTER.push > 0 && POINTER.push <= 0.05, "a few pixels, never a scatter");
  assert.ok(POINTER.radius > 0 && POINTER.radius <= 0.3, "a small neighbourhood");
  assert.ok(POINTER.rate > 0);
  assert.equal(DUST_VERTEX.match(/uniform vec3 uPointer;/g).length, 1);
  assert.match(DUST_VERTEX, /if \(aKind < 0\.5 && uPointer\.z > 0\.001\)/, "clouds are untouched and nothing runs while it is off");
  assert.match(DUST_VERTEX, new RegExp(`POINTER_RADIUS ${POINTER.radius.toFixed(2)}`));
  assert.match(DUST_VERTEX, new RegExp(`POINTER_PUSH ${POINTER.push.toFixed(3)}`));
});

test("the months to a date count calendar months on the visitor's own calendar, and the sentence follows the language", () => {
  const now = new Date(2026, 9, 4, 12).getTime();
  assert.equal(monthsUntil("2026-10", now), 0);
  assert.equal(monthsUntil("2026-11", now), 1);
  assert.equal(monthsUntil("2027-06", now), 8);
  assert.equal(monthsUntil("2026-09", now), -1);
  assert.equal(monthsUntil("2029-01", new Date(2026, 11, 31, 23).getTime()), 25);
  assert.equal(untilText(8, "en"), "in 8 months");
  assert.equal(untilText(1, "en"), "next month");
  assert.equal(untilText(0, "en"), "this month");
  assert.equal(untilText(8, "es"), "dentro de 8 meses");
  assert.equal(untilText(-1, "en"), "", "a date that has passed says nothing");
  assert.equal(untilText(NaN, "en"), "", "a broken date says nothing instead of throwing");
});

test("the backdrop is seeded, stays dim, and its glow grows with what a period holds", async () => {
  const { BACKDROP, deepField, farGalaxies, glowOf } = await import("../assets/js/life.js");
  const { seeded } = await import("../assets/js/util.js");
  const a = deepField({ count: 500, random: seeded(1) });
  const b = deepField({ count: 500, random: seeded(1) });
  assert.deepEqual([...a.position], [...b.position], "the same sky every time");
  assert.ok(Math.max(...a.bright) <= BACKDROP.deep.alpha[1] + 1e-6 && Math.min(...a.bright) >= BACKDROP.deep.alpha[0] - 1e-6);
  const centre = [10, -20, 30];
  const spread = deepField({ count: 2000, random: seeded(4), centre, inner: 100, outer: 1000 });
  const distances = Array.from({ length: spread.count }, (_, i) => Math.hypot(...[0, 1, 2].map((k) => spread.position[i * 3 + k] - centre[k])));
  assert.ok(Math.min(...distances) >= 99 && Math.max(...distances) <= 1001, "the stars fill a volume between the sky and the far shell");
  assert.ok(distances.filter((d) => d < 300).length > 300 && distances.filter((d) => d > 700).length > 100, "near and far stars both exist, so the camera sees parallax");
  const far = farGalaxies({ random: seeded(2) });
  assert.ok(far.length >= 20 && far.length <= 60 && far.every((galaxy) => galaxy.alpha <= 0.4), "twenty to sixty smudges, none above 40%");
  assert.ok(BACKDROP.haze.alpha <= 0.08, "haze at most 8% of the ink");
  const small = glowOf({ radius: 10, count: 2 }, 20);
  const large = glowOf({ radius: 10, count: 20 }, 20);
  assert.ok(large.strength > small.strength, "a denser period glows more");
  assert.ok(large.strength <= BACKDROP.glow.max, "capped at 15% of the ink");
});

test("the dots of a memory drift gently: slow, slightly different turns and a soft breath, not a whirl", () => {
  assert.ok(CLOUD.spin <= 0.08, "the fastest dot turns under 0.08 rad/s");
  assert.ok(CLOUD.breath <= 0.06 && CLOUD.pace <= 0.6);
  assert.ok(CLOUD.still >= 0.9, "seen from far away the dots barely react");
  assert.match(DUST_VERTEX, /calm = 1\.0 - CLOUD_STILL \* uFar/);
  for (const name of ["SPIN", "BREATH", "PACE", "STILL"]) assert.match(DUST_VERTEX, new RegExp(`#define CLOUD_${name} `));
});

test("the camera sways gently when nothing is touched: slow, small and a little deeper than before", async () => {
  const source = (await import("node:fs")).readFileSync(new URL("../assets/js/scene.js", import.meta.url), "utf8");
  const [, rate, yaw, pitch, rest] = source.match(/const DRIFT = \{ rate: ([\d.]+), yaw: ([\d.]+), pitch: ([\d.]+), rest: ([\d.]+) \}/).map(Number);
  assert.ok(rate <= 0.15 && yaw <= 0.2 && yaw > 0.1 && pitch <= 0.03, "a swing of a few degrees over about a minute");
  assert.ok(Number(rest) >= 1 && Number(rest) <= 4, "it starts a couple of seconds after the last touch");
  assert.match(source, /pointers\.size === 0 && performance\.now\(\) \/ 1000 - state\.touched > DRIFT\.rest/, "it depends on touch, not on the station, so it also sways at an item and in the whole view");
});

test("the kind tint is barely there: warm and cool, four kinds, both themes, never above 15%", () => {
  assert.ok(KIND_TINT.strength > 0 && KIND_TINT.strength <= 0.15, "at most 15%");
  for (const theme of ["night", "paper"]) {
    const [personal, professional, product, education] = KIND_TINT[theme];
    assert.equal(KIND_TINT[theme].length, 4);
    assert.equal(personal, education, "personal and education share the warm tint");
    assert.equal(professional, product, "professional and product share the cool tint");
    const red = (hex) => parseInt(hex.slice(1, 3), 16) - parseInt(hex.slice(5, 7), 16);
    assert.ok(red(personal) > 0 && red(professional) < 0, `${theme}: warm leans red, cool leans blue`);
  }
  assert.match(DUST_VERTEX, /vKind = aKind > 0\.5 \? texture2D\(uKinds/, "each cloud reads its memory's kind");
});

test("every method the engine calls on the scene exists in the scene", async () => {
  const { readFileSync } = await import("node:fs");
  const engine = readFileSync(new URL("../assets/js/engine.js", import.meta.url), "utf8");
  const scene = readFileSync(new URL("../assets/js/scene.js", import.meta.url), "utf8");
  const api = scene.slice(scene.lastIndexOf("  return {\n    camera,"));
  for (const name of new Set([...engine.matchAll(/(?<![/\w])scene\.([a-zA-Z]+)/g)].map((m) => m[1]))) assert.match(api, new RegExp(`^    ${name}\\b`, "m"), `scene.${name} is called by the engine but the scene does not export it`);
});
