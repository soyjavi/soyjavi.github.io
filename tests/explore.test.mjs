import { test } from "node:test";
import assert from "node:assert/strict";
import { LEVEL, RING_CLEARANCE, STRONG, askLevels, askPairs, declared, periodNames, strongest, TAG_GAP, edgeExit, edgeLabel, edgeSide, filtersFor, galaxyAt, headlines, jumps, leaderOf, levels, matching, miniMap, MINI_ZOOM, miniVisible, QUALITY, averageMs, nextQuality, normalize, perGalaxy, pickSpot, related, ringClearance, search, sequence, stackEdgeLabels, tagSpots, tourPlan, tourTick } from "../assets/js/explore.js";
import { layout } from "../assets/js/life.js";
import { ORBIT, approach, ease, eye, nearest, slide, turn, zoom } from "../assets/js/orbit.js";
import { loadContent } from "../src/content.mjs";

const { life } = loadContent();

const placed = layout(life.milestones, { threads: life.threads });
const at = (id) => placed.findIndex((mark) => mark.id === id);
const ids = (indices) => indices.map((i) => placed[i].id);

test("searching ignores case and accents and finds a word in the title, the text or the extras", () => {
  const items = [
    { id: "a", title: "Ibermática", body: "Senior developer", extra: "2006", weight: 2, order: 0 },
    { id: "b", title: "Taekwondo", body: "I start at eight; Ibermática is later", extra: "", weight: 1, order: 1 },
    { id: "c", title: "A race", body: "Fifth in my category", extra: "Running", weight: 1, order: 2 },
  ];
  assert.equal(normalize("Ibermática"), "ibermatica");
  assert.deepEqual(search(items, "IBERMATICA").map((item) => item.id), ["a", "b"], "the title match comes first");
  assert.deepEqual(search(items, "running").map((item) => item.id), ["c"]);
  assert.deepEqual(search(items, "senior ibermatica").map((item) => item.id), ["a"], "every word must match");
  assert.deepEqual(search(items, "   "), []);
  assert.deepEqual(search(items, "zzz"), []);
  assert.equal(search(Array.from({ length: 30 }, (_, k) => ({ ...items[0], id: `x${k}`, order: k })), "iber").length, 8);
});

test("related memories are the declared links in both directions, then the neighbours in each thread", () => {
  const { links, near } = related(placed, at("tapquo"));
  assert.deepEqual(ids(links), ["bizkaibus", "github", "teaching", "shares", "cypherpunk"].sort((a, b) => at(a) - at(b)));
  assert.ok(near.length > 0 && near.every((i) => !links.includes(i) && i !== at("tapquo")));
  assert.ok(related(placed, at("bizkaibus")).links.includes(at("tapquo")), "a link declared on one side is seen from the other");
  assert.deepEqual(ids(related(placed, at("child2")).links), ["child1", "house"]);
});

test("every memory has something related, so no memory is a dead end", () => {
  placed.forEach((mark, i) => {
    const { links, near } = related(placed, i);
    assert.ok(links.length + near.length > 0, mark.id);
  });
});

test("Earlier and Later follow the date, and with a filter they jump along what it shows", () => {
  assert.deepEqual(sequence(placed, 0), { previous: null, next: 1 });
  assert.deepEqual(sequence(placed, placed.length - 1), { previous: placed.length - 2, next: null });
  const body = { facet: "threads", item: life.threads.indexOf("body") };
  const chain = matching(placed, body);
  assert.ok(chain.length > 2);
  chain.forEach((index, k) => assert.deepEqual(sequence(placed, index, body), { previous: chain[k - 1] ?? null, next: chain[k + 1] ?? null }, placed[index].id));
  const outside = placed.findIndex((mark, i) => i > chain[0] && i < chain.at(-1) && !chain.includes(i));
  const { previous, next } = sequence(placed, outside, body);
  assert.equal(previous, chain.findLast((i) => i < outside));
  assert.equal(next, chain.find((i) => i > outside));
  assert.ok(placed[next].members.threads.includes(body.item), "the next one is in the filter");
});

test("the finder offers to show a person, a place or a thread by name, with how many memories each has", () => {
  const facets = { threads: life.threads, people: ["eki", "aitor"], places: ["bali"] };
  const sample = layout(life.milestones, facets);
  const names = { threads: { craft: "Craft", learning: "Learning" }, people: { eki: "Eki", aitor: "Aitor" }, places: { bali: "Bali" } };
  const [found] = filtersFor(sample, facets, names, "aitor");
  assert.deepEqual([found.facet, found.item, found.title], ["people", 1, "Aitor"]);
  assert.equal(found.count, life.milestones.filter((entry) => entry.people?.includes("aitor")).length);
  assert.equal(filtersFor(sample, facets, names, "BALI")[0].facet, "places");
  assert.equal(filtersFor(sample, facets, names, "craft")[0].title, "Craft");
  assert.deepEqual(filtersFor(sample, facets, names, ""), []);
  assert.ok(filtersFor(sample, facets, names, "a", 2).length <= 2);
  assert.ok(filtersFor(sample, facets, names, "e").every((entry) => entry.count > 0), "nothing that would show an empty sky");
});

test("levels dim what is not in view of a selection or a filter and keep the selection whole", () => {
  assert.ok(levels(placed, {}).every((level) => level === LEVEL.normal));
  const selected = at("tapquo");
  const near = new Set(related(placed, selected).links);
  const chosen = levels(placed, { selected, near });
  assert.equal(chosen[selected], 1);
  assert.ok([...near].every((i) => chosen[i] === LEVEL.related));
  assert.ok(chosen.filter((_, i) => i !== selected && !near.has(i)).every((level) => level === LEVEL.quiet));
  const body = life.threads.indexOf("body");
  const filtered = levels(placed, { filter: { facet: "threads", item: body } });
  placed.forEach((mark, i) => assert.equal(filtered[i], mark.members.threads.includes(body) ? LEVEL.normal : LEVEL.away, mark.id));
  assert.equal(levels(placed, { selected: at("born"), filter: { facet: "threads", item: body } })[at("born")], 1, "the selected memory is never hidden");
});

test("the orbit puts the eye at the asked distance and turns around the target", () => {
  const base = { target: [1, 2, 3], distance: 10, yaw: 0, pitch: 0 };
  assert.deepEqual(eye(base).map((value) => +value.toFixed(9)), [1, 2, 13]);
  for (const [yaw, pitch] of [[0.7, 0.2], [-2, -0.9], [3, 1.2]]) {
    const [x, y, z] = eye({ ...base, yaw, pitch });
    assert.ok(Math.abs(Math.hypot(x - 1, y - 2, z - 3) - 10) < 1e-9);
  }
  assert.ok(eye({ ...base, pitch: 0.5 })[1] > 2, "a positive pitch is above the target");
  assert.deepEqual(eye({ ...base, yaw: Math.PI / 2 }).map((value) => +value.toFixed(9)), [11, 2, 3]);
});

test("zooming and turning stay inside the limits", () => {
  assert.equal(zoom(100, 50), ORBIT.maxDistance);
  assert.equal(zoom(100, -50), ORBIT.minDistance);
  assert.ok(zoom(100, -0.2) < 100 && zoom(100, 0.2) > 100);
  assert.equal(turn({ yaw: 0, pitch: 0 }, 0.3, 9).pitch, ORBIT.maxPitch);
  assert.equal(turn({ yaw: 0, pitch: 0 }, 0.3, -9).pitch, ORBIT.minPitch);
  assert.equal(turn({ yaw: 1, pitch: 0 }, 0.5, 0).yaw, 1.5);
});

test("sliding moves the target with the picture, in proportion to the distance", () => {
  const state = { target: [0, 0, 0], distance: 100, yaw: 0, pitch: 0 };
  const [x, y] = slide(state, 100, 0, 800, Math.PI / 2);
  assert.ok(x < 0 && Math.abs(y) < 1e-9, "dragging right moves the world right, so the target left");
  const far = slide({ ...state, distance: 200 }, 100, 0, 800, Math.PI / 2);
  assert.ok(Math.abs(far[0] / x - 2) < 1e-9);
  const up = slide(state, 0, 100, 800, Math.PI / 2);
  assert.ok(up[1] > 0 && Math.abs(up[0]) < 1e-9);
});

test("easing converges on the goal from any frame rate, and yaw takes the short way round", () => {
  const once = ease(0, 10, 1, 3);
  const twice = ease(ease(0, 10, 0.5, 3), 10, 0.5, 3);
  assert.ok(Math.abs(once - twice) < 1e-9, "two half steps equal one whole step");
  assert.ok(Math.abs(nearest(Math.PI - 0.1, -Math.PI + 0.1) - (Math.PI + 0.1)) < 1e-9);
  let state = { target: [0, 0, 0], distance: 400, yaw: 3, pitch: -0.3 };
  const goal = { target: [5, 6, 7], distance: 20, yaw: -3, pitch: 0.4 };
  assert.ok(approach(state, goal, 1 / 60, 4).yaw > state.yaw, "from 3 to -3 radians the short way is up through pi, not back through zero");
  for (let k = 0; k < 400; k++) state = approach(state, goal, 1 / 60, 4);
  assert.ok(Math.abs(state.distance - 20) < 0.05 && Math.abs(Math.sin(state.yaw - goal.yaw)) < 0.01 && Math.abs(state.pitch - 0.4) < 0.01);
  assert.ok(state.target.every((value, axis) => Math.abs(value - goal.target[axis]) < 0.02));
});

test("a filter becomes a path through the life: its memories in order, the jumps between galaxies and how many each galaxy holds", () => {
  const sky = layout(life.milestones, { threads: life.threads }, { periods: life.periods, today: 2026.8 });
  assert.ok(sky.every((mark, i) => life.periods[mark.period] === life.milestones[i].period));
  const craft = { facet: "threads", item: life.threads.indexOf("craft") };
  const chain = matching(sky, craft);
  assert.deepEqual(chain, sky.map((mark, i) => (mark.members.threads.includes(craft.item) ? i : -1)).filter((i) => i >= 0));
  assert.ok(chain.every((i, k) => k === 0 || sky[i].year >= sky[chain[k - 1]].year), "in the order they happened");
  const pairs = jumps(sky, chain);
  assert.equal(pairs.length, chain.length - 1);
  pairs.forEach(([from, to, across]) => assert.equal(across, sky[from].period !== sky[to].period));
  assert.ok(pairs.some(([, , across]) => across), "work crosses from one stage of life to another");
  const counts = perGalaxy(sky, chain, life.periods.length);
  assert.equal(counts.reduce((sum, n) => sum + n, 0), chain.length);
  life.periods.forEach((period, k) => assert.equal(counts[k], chain.filter((i) => life.milestones[i].period === period).length, period));
  assert.deepEqual(matching(sky, null), []);
  assert.deepEqual(jumps(sky, []), []);
});

const overlap = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
const policy = (obstacles, { forced = false } = {}) => ({ free: (box) => !obstacles.some((other) => overlap(box, other)), clear: () => true, inside: () => true, forced });

test("a tag first tries beside its cloud, then the corners, then further out in rings, and says when it had to move away", () => {
  const spots = tagSpots({ x: 400, y: 300, r: 20 }, { width: 100, height: 16 }, 1000);
  const [right, left, below, above] = spots;
  assert.deepEqual([right.left, right.top], [430, 292], "right of the cloud, centred on it");
  assert.deepEqual([left.right, left.top], [370, 292]);
  assert.equal(below.top, 328, "below, a little under the cloud");
  assert.equal(above.bottom, 272);
  assert.equal(below.left, 350, "centred under it");
  assert.ok(spots.slice(0, 8).every((spot) => spot.far === false), "four sides and four corners are the cloud's own places");
  assert.ok(spots.slice(8).every((spot) => spot.far === true));
  assert.equal(spots.length, 4 + 4 + 3 * 8);
  const reach = (spot) => Math.hypot((spot.left + spot.right) / 2 - 400, (spot.top + spot.bottom) / 2 - 300);
  const far = spots.slice(8);
  assert.ok(Math.min(...far.map(reach)) > Math.min(...spots.slice(0, 8).map(reach)), "the rings lie further out");
});

test("a tag stays where it was while that place is free, so a swaying camera never flips it from side to side", () => {
  const spots = tagSpots({ x: 400, y: 300, r: 20 }, { width: 100, height: 16 }, 1000);
  spots.forEach((spot, slot) => (spot.slot = slot));
  assert.equal(pickSpot(spots, { ...policy([]), keep: 1 }), spots[1], "its old place is free, so it stays");
  const taken = { left: spots[1].left - 2, right: spots[1].right + 2, top: spots[1].top, bottom: spots[1].bottom };
  assert.equal(pickSpot(spots, { ...policy([taken]), keep: 1 }), spots[0], "when the old place is taken it goes back to the first free one");
});

test("a tag keeps off the other clouds when a free place exists nearby, and falls back to a crowded one only when none does", () => {
  const spots = tagSpots({ x: 400, y: 300, r: 20 }, { width: 100, height: 16 }, 1000);
  const right = { left: 420, right: 560, top: 280, bottom: 320 };
  const picked = pickSpot(spots, policy([right]));
  assert.ok(!overlap(picked, right), "not on the cloud to its right");
  assert.equal(picked.far, false, "the left side is free, so it does not move away");
  const wall = { left: 0, right: 1000, top: 200, bottom: 400 };
  assert.equal(pickSpot(spots, policy([wall])), null, "boxed in, an ordinary tag is left out");
  assert.equal(pickSpot(spots, policy([wall], { forced: true })), spots[0], "the tag in view still shows beside its cloud");
  const noFirst = { ...policy([wall], { forced: true }), inside: (box) => box !== spots[0] };
  assert.equal(pickSpot(spots, noFirst), spots[1], "or at the first of its own places that is inside the window");
  const moat = { left: 330, right: 470, top: 250, bottom: 350 };
  const away = pickSpot(spots, policy([moat]));
  assert.equal(away.far, true, "with the near places taken it moves out a ring");
  assert.ok(!overlap(away, moat));
  const clear = (box) => !overlap(box, right);
  const onlyFree = pickSpot([{ left: 430, right: 530, top: 292, bottom: 308, far: false }, { left: 100, right: 200, top: 292, bottom: 308, far: true }], { free: () => true, clear, inside: () => true });
  assert.equal(onlyFree.left, 100, "a place on no other cloud wins over the nearest one");
});

test("a displaced tag is joined to its cloud by a hairline that starts at the tag and stops at the cloud's edge", () => {
  const box = { left: 100, right: 200, top: 100, bottom: 116, far: true };
  const leader = leaderOf(box, { x: 300, y: 108, r: 20 });
  assert.equal(leader.x, 100, "it leaves the tag's right edge");
  assert.equal(leader.y, 8);
  assert.ok(Math.abs(leader.length - (100 - 9)) < 1e-9);
  assert.equal(leader.angle, 0);
  assert.equal(leaderOf({ left: 305, right: 400, top: 100, bottom: 116 }, { x: 300, y: 108, r: 20 }), null, "a tag already at its cloud needs no hairline");
  const diagonal = leaderOf({ left: 0, right: 10, top: 0, bottom: 10 }, { x: 40, y: 40, r: 5 });
  assert.ok(diagonal.angle > 0 && diagonal.angle < Math.PI / 2);
});

test("a ring's name starts a fixed clearance outside the ring's drawn radius, however close the camera is, up to the largest the shader draws", () => {
  assert.equal(RING_CLEARANCE, 8);
  for (const radius of [2, 12, 40, 70]) assert.equal(ringClearance(radius), radius + RING_CLEARANCE);
  assert.equal(ringClearance(500), 70 + RING_CLEARANCE, "the shader caps a mark at 140 pixels across");
  assert.ok(RING_CLEARANCE >= 6 && TAG_GAP > 0);
});

test("the whole-life view names one memory per galaxy: the heaviest of its period and, among equals, the earliest", () => {
  const lived = layout(life.milestones, { threads: life.threads }, { periods: life.periods });
  const picks = headlines(lived);
  assert.equal(picks.length, life.periods.length, "one per period");
  picks.forEach((i, k) => {
    assert.equal(lived[i].period, k, "in period order");
    const peers = lived.filter((mark) => mark.period === k);
    assert.equal(lived[i].weight, Math.max(...peers.map((mark) => mark.weight)));
    assert.ok(peers.filter((mark) => mark.weight === lived[i].weight).every((mark) => mark.year >= lived[i].year), "the earliest of the heaviest");
  });
  const marks = [{ period: 1, weight: 2, year: 5 }, { period: 1, weight: 3, year: 9 }, { period: 1, weight: 3, year: 7 }, { period: 0, weight: 1, year: 1 }, { period: -1, weight: 3, year: 2 }];
  assert.deepEqual(headlines(marks), [3, 2], "a memory with no period is never named and an earlier equal beats a later one");
  assert.deepEqual(headlines([]), []);
});

const frame = { left: 100, right: 500, top: 50, bottom: 350 };
const line = (from, to, n = 20) => Array.from({ length: n + 1 }, (_, k) => ({ x: from[0] + ((to[0] - from[0]) * k) / n, y: from[1] + ((to[1] - from[1]) * k) / n, visible: true }));

test("a line to a memory outside the frame stops where it leaves the free area, and says how far along it that is and which way it was heading", () => {
  const exit = edgeExit(line([300, 200], [300, -100]), frame);
  assert.ok(Math.abs(exit.y - 50) < 0.01 && exit.x === 300, "it leaves through the top edge");
  assert.ok(Math.abs(exit.t - 0.5) < 0.01, "half way along");
  assert.ok(Math.abs(exit.angle + Math.PI / 2) < 1e-9, "heading up");
  const right = edgeExit(line([300, 200], [900, 200]), frame);
  assert.ok(Math.abs(right.x - 500) < 0.01);
  assert.equal(edgeExit(line([300, 200], [400, 300]), frame), null, "a line that ends inside needs no marker");
  assert.equal(edgeExit(line([20, 200], [90, 200]), frame), null, "one that never enters the area is not cut");
  const behind = line([300, 200], [320, 220]).map((point, k) => (k > 10 ? { ...point, visible: false } : point));
  assert.ok(edgeExit(behind, frame), "a point behind the camera counts as outside");
});

test("an edge marker sits on the nearest side of the free area, with its label inside it", () => {
  assert.equal(edgeSide({ x: 300, y: 50 }, frame), "top");
  assert.equal(edgeSide({ x: 500, y: 200 }, frame), "right");
  assert.equal(edgeSide({ x: 300, y: 350 }, frame), "bottom");
  assert.equal(edgeSide({ x: 100, y: 200 }, frame), "left");
  const size = { width: 120, height: 20 };
  const top = edgeLabel({ x: 300, y: 50 }, "top", size, frame);
  assert.deepEqual([top.left, top.top], [240, 58], "below the top edge, centred on the marker");
  const right = edgeLabel({ x: 500, y: 200 }, "right", size, frame);
  assert.deepEqual([right.right, right.top], [492, 190], "left of the right edge");
  const corner = edgeLabel({ x: 110, y: 50 }, "top", size, frame);
  assert.equal(corner.left, 100, "kept inside the area at a corner");
  for (const box of [top, right, corner]) assert.ok(box.left >= frame.left && box.right <= frame.right && box.top >= frame.top && box.bottom <= frame.bottom);
});

test("markers on the same edge are stacked apart, and one that no longer fits is left out", () => {
  const size = { width: 120, height: 20 };
  const item = (x) => ({ side: "top", box: edgeLabel({ x, y: 50 }, "top", size, frame) });
  const stacked = stackEdgeLabels([item(300), item(310), item(320)], frame);
  assert.ok(stacked.every((entry) => entry.shown));
  const boxes = stacked.map((entry) => entry.box);
  for (let a = 0; a < boxes.length; a++) for (let b = a + 1; b < boxes.length; b++) assert.ok(!overlap(boxes[a], boxes[b]), "no two markers touch");
  assert.ok(boxes[1].top > boxes[0].top && boxes[2].top > boxes[1].top, "later ones move inwards along the edge");
  const tight = { left: 100, right: 500, top: 50, bottom: 80 };
  const crowded = stackEdgeLabels([{ side: "top", box: edgeLabel({ x: 300, y: 50 }, "top", size, tight) }, { side: "top", box: edgeLabel({ x: 305, y: 50 }, "top", size, tight) }], tight);
  assert.deepEqual(crowded.map((entry) => entry.shown), [true, false], "with no room the second is dropped");
});

test("the minimap fits the whole sky in its box, keeps north up, and a click maps back to the sky", () => {
  const box = { width: 104, height: 100, pad: 6 };
  const points = [[-40, -30], [60, 10], [0, 50], [20, -45]];
  const map = miniMap(points, box);
  for (const point of points) {
    const [x, y] = map.to(point);
    assert.ok(x >= box.pad - 1e-9 && x <= box.width - box.pad + 1e-9 && y >= box.pad - 1e-9 && y <= box.height - box.pad + 1e-9, `${point} lies inside the box`);
  }
  const [, upper] = map.to([0, 50]);
  const [, lower] = map.to([20, -45]);
  assert.ok(upper < lower, "a point further up the sky is higher in the box");
  const [left] = map.to([-40, 0]);
  const [right] = map.to([60, 0]);
  assert.ok(left < right, "and one further right is further right");
  for (const point of [[0, 0], [33, -12], [-40, 50]]) {
    const back = map.from(map.to(point));
    assert.ok(Math.abs(back[0] - point[0]) < 1e-9 && Math.abs(back[1] - point[1]) < 1e-9, "a click maps back");
  }
  const flat = miniMap([[5, 5], [5, 5]], box);
  assert.ok(Number.isFinite(flat.to([5, 5])[0]), "a single point does not divide by zero");
});

test("a click on the minimap picks the galaxy under it, with a little slack, and nothing in empty space", () => {
  const galaxies = [{ centre: [0, 0, 0], radius: 10 }, { centre: [40, 0, 0], radius: 12 }];
  assert.equal(galaxyAt(galaxies, [2, 1]), 0);
  assert.equal(galaxyAt(galaxies, [38, 3]), 1);
  assert.equal(galaxyAt(galaxies, [12, 0]), 0, "just outside the rim still counts");
  assert.equal(galaxyAt(galaxies, [20, 0]), -1, "the gap between them picks none");
  assert.equal(galaxyAt(galaxies, [-60, 40]), -1);
  assert.equal(galaxyAt([], [0, 0]), -1);
});

test("the minimap shows whenever the camera is zoomed in, never in the whole-life view or on a narrow screen", () => {
  assert.equal(miniVisible(0.3, 1280), true);
  assert.equal(miniVisible(MINI_ZOOM - 0.01, 1280), true);
  for (const ratio of [MINI_ZOOM, 1, 1.4]) assert.equal(miniVisible(ratio, 1280), false, `at ${ratio} of the whole-life distance`);
  assert.equal(miniVisible(0.3, 519), false);
  assert.equal(miniVisible(0.3, 520), true);
  assert.equal(miniVisible(0.3, 800, 520, false), false, "and none where the card would reach it");
});

test("edge markers keep clear of anything already on the map, such as the minimap", () => {
  const rect = { left: 100, right: 500, top: 50, bottom: 350 };
  const size = { width: 120, height: 20 };
  const near = { left: 380, right: 500, top: 330, bottom: 350 };
  const [kept] = stackEdgeLabels([{ side: "bottom", box: near }], rect, 4, [near]);
  assert.equal(kept.shown, true);
  assert.ok(!overlap(kept.box, near), "it moves clear of the minimap");
  const [free] = stackEdgeLabels([{ side: "top", box: edgeLabel({ x: 300, y: 50 }, "top", size, rect) }], rect, 4, [near]);
  assert.equal(free.shown, true);
});

test("the quality steps down one tier when the frames are slow and never past the lowest or back up", () => {
  assert.equal(nextQuality(0, 16), 0, "60 frames a second keeps the full life");
  assert.equal(nextQuality(0, 40), 1, "25 frames a second drops a tier");
  assert.equal(nextQuality(1, 40), 2);
  assert.equal(nextQuality(2, 200), 2, "there is nothing below the last tier");
  assert.equal(nextQuality(1, 10), 1, "and a fast device is not sent back up");
  assert.equal(nextQuality(0, QUALITY.slow), 0, "exactly 30 a second is enough");
  assert.ok(QUALITY.tiers.every((tier, k) => k === 0 || (tier.keep < QUALITY.tiers[k - 1].keep && tier.ratio < QUALITY.tiers[k - 1].ratio)), "each tier keeps fewer dots at a lower resolution");
  assert.equal(averageMs([10, 20, 30]), 20);
  assert.equal(averageMs([]), 0);
});

test("the tour waits for a pause, opens a few memories one after another, stops at the first touch and goes back to the whole life when it ends", () => {
  const plan = tourPlan(layout(life.milestones, { threads: life.threads }, { periods: life.periods }));
  assert.ok(plan.length >= 2 && plan.length <= 5, `${plan.length} stops`);
  assert.equal(new Set(plan).size, plan.length);
  const config = { wait: 20, hold: 6 };
  const tick = (state, now, idleSince = 0, eligible = true) => tourTick(state, { now, idleSince, eligible, plan }, config);
  let state = { phase: "waiting", step: 0, at: 0 };
  assert.equal(tick(state, 10).open, null, "not before the pause is over");
  assert.equal(tick(state, 19.9).open, null);
  let result = tick(state, 20);
  assert.equal(result.open, plan[0]);
  assert.equal(result.state.phase, "touring");
  state = result.state;
  assert.equal(tick(state, 25).open, null, "each stop is held for a few seconds");
  result = tick(state, 26);
  assert.equal(result.open, plan[1]);
  state = result.state;
  const touched = tick(state, 27, 26.5);
  assert.equal(touched.stopped, true, "a touch during the tour ends it where the reader is");
  assert.equal(touched.state.phase, "off", "for good");
  assert.equal(tick(touched.state, 500, 0).open, null, "however long the pause that follows");
  assert.equal(tick(state, 27, 0, false).stopped, true, "so does something that makes the tour unwelcome");
  const idle = tick({ phase: "waiting", step: 0, at: 0 }, 21, 5);
  assert.equal(idle.open, null, "a touch at 5 s moves the pause to 25 s");
  assert.equal(tick({ phase: "waiting", step: 0, at: 0 }, 25, 5).open, plan[0]);
  assert.equal(tick({ phase: "waiting", step: 0, at: 0 }, 99, 0, false).open, null, "never starts while the reader is busy");
  let walker = { phase: "touring", step: plan.length - 1, at: 100 };
  const last = tick(walker, 106);
  assert.equal(last.done, true);
  assert.equal(last.open, null);
  assert.equal(last.state.phase, "off");
  assert.equal(tick(last.state, 500, 0).open, null, "and it runs once per visit");
  assert.equal(tourTick({ phase: "waiting", step: 0, at: 0 }, { now: 99, idleSince: 0, eligible: true, plan: [] }).open, null, "no plan, no tour");
  const many = tourPlan(Array.from({ length: 40 }, (_, k) => ({ period: k, weight: 2, year: k })));
  assert.equal(many.length, 5);
  assert.ok(many.every((index, k) => k === 0 || index > many[k - 1]), "spread along the life, in order");
});

test("a question lights exactly its memories and draws one line from each to the ring, whatever the number of memories", () => {
  const marks = Array.from({ length: 237 }, () => ({}));
  const lit = new Set([3, 40, 200]);
  const levelsNow = askLevels(marks, lit);
  assert.equal(levelsNow.length, 237);
  assert.deepEqual(levelsNow.map((level, i) => (level === 1 ? i : -1)).filter((i) => i >= 0), [3, 40, 200]);
  assert.ok(levelsNow.filter((level) => level !== 1).every((level) => level === LEVEL.quiet));
  assert.deepEqual(askPairs(lit, 240), [[3, 240, true], [40, 240, true], [200, 240, true]]);
  assert.deepEqual(askPairs(new Set(), 240), []);
});

test("the strongest relations are at most three, explicit links first, then what is shared, then nearness in time", () => {
  const member = (threads) => ({ threads, people: [], places: [] });
  const marks = [
    { id: "p", year: 8, links: [], members: member([0]) },
    { id: "q", year: 9, links: [], members: member([1]) },
    { id: "a", year: 10, links: ["r"], members: member([0, 1]) },
    { id: "r", year: 30, links: [], members: member([2]) },
    { id: "s", year: 10.4, links: [], members: member([0]) },
    { id: "t", year: 40, links: [], members: member([1]) },
  ];
  assert.equal(STRONG, 3);
  assert.equal(related(marks, 2).links.length + related(marks, 2).near.length, 5, "five candidates");
  assert.deepEqual(strongest(marks, 2), [3, 4, 1], "the explicit link, then the nearest in time among equals");
  assert.deepEqual(strongest(marks, 2), strongest(marks, 2), "deterministic");
  assert.equal(strongest(marks, 2, 1).length, 1);
  assert.deepEqual(strongest([{ id: "x", year: 1, links: [], members: member([]) }], 0), []);
});

test("a relation is always at least 2.4 times brighter than a cloud that has nothing to do with the open memory", () => {
  assert.ok(LEVEL.quiet <= LEVEL.related * 0.4, "unrelated clouds recede to under 0.4 of the related ones");
  assert.ok(LEVEL.quiet < LEVEL.weak && LEVEL.weak < LEVEL.related, "weaker relations sit between");
  const selected = at("tapquo");
  const { links, near } = related(placed, selected);
  const all = [...links, ...near];
  const top = new Set(strongest(placed, selected));
  const weak = new Set(all.filter((i) => !top.has(i)));
  const chosen = levels(placed, { selected, near: top, weak });
  assert.equal(chosen[selected], 1);
  assert.ok([...top].every((i) => chosen[i] === LEVEL.related));
  assert.ok([...weak].every((i) => chosen[i] === LEVEL.weak));
  assert.ok(chosen.filter((_, i) => i !== selected && !all.includes(i)).every((level) => level === LEVEL.quiet));
});

test("only the links he declared are named when a memory is open, never a neighbour in time", () => {
  const member = (threads) => ({ threads, people: [], places: [] });
  const marks = [
    { id: "p", year: 8, links: [], members: member([0]) },
    { id: "a", year: 10, links: ["r", "q"], members: member([0]) },
    { id: "q", year: 11, links: [], members: member([0]) },
    { id: "r", year: 30, links: [], members: member([2]) },
    { id: "s", year: 10.4, links: [], members: member([0]) },
    { id: "alone", year: 50, links: [], members: member([5]) },
  ];
  const named = declared(marks, 1);
  assert.deepEqual([...named].sort(), [2, 3], "the two he linked, and not p, who only shares a thread");
  assert.ok(related(marks, 1).near.includes(0), "the neighbour is still related and lit");
  assert.deepEqual(declared(marks, 5), [], "a memory with no links names nothing");
  assert.deepEqual(declared(marks, 2), [1], "a link declared from the other side counts too");
  const crowded = [{ id: "hub", year: 10, links: ["a", "b", "c", "d", "e"], members: member([0]) }, ...["a", "b", "c", "d", "e"].map((id, k) => ({ id, year: 11 + k, links: [], members: member([0]) }))];
  assert.equal(declared(crowded, 0).length, STRONG, "at most three are named");
});

test("an age names its heaviest memory first and at most four, the earliest among equals", () => {
  const marks = [
    { period: 0, weight: 1, year: 1 },
    { period: 0, weight: 3, year: 4 },
    { period: 0, weight: 3, year: 2 },
    { period: 1, weight: 3, year: 9 },
    { period: 0, weight: 2, year: 3 },
    { period: 0, weight: 2, year: 5 },
    { period: 0, weight: 1, year: 6 },
  ];
  assert.deepEqual(periodNames(marks, 0), [2, 1, 4, 5]);
  assert.equal(periodNames(marks, 0)[0], headlines(marks)[0], "the first one is the headline of the age");
  assert.deepEqual(periodNames(marks, 1), [3]);
  assert.deepEqual(periodNames(marks, 7), []);
});

test("edge labels that stack exactly one gap apart stay where they are when the numbers wobble by a hair", () => {
  const rect = { left: 0, right: 1000, top: 70, bottom: 700 };
  const box = (top) => ({ left: 300, right: 520, top, bottom: top + 26 });
  for (const wobble of [-2e-5, -1e-5, 0, 1e-5, 2e-5]) {
    const items = [{ side: "top", box: box(82) }, { side: "top", box: box(82 + wobble) }];
    stackEdgeLabels(items, rect, 4);
    assert.ok(items.every((item) => item.shown));
    assert.equal(Math.round(items[1].box.top), 112, `the second label sits one step below the first (wobble ${wobble})`);
  }
});
