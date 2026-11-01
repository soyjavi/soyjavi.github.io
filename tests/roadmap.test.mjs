import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const text = readFileSync(new URL("../ROADMAP.md", import.meta.url), "utf8");
const LANES = ["Queue", "In progress", "Needs creator", "Proposed"];
const TYPES = ["bug", "feature", "chore", "content", "verify", "deploy", "decision"];
const OWNERS = ["agent", "creator"];
const PRIORITIES = ["high", "normal", "low"];

const entries = (() => {
  const found = [];
  let lane = null;
  for (const line of text.split("\n")) {
    const heading = line.match(/^## (.+)$/);
    if (heading) lane = heading[1];
    const entry = line.match(/^- \*\*([A-Z0-9-]+)\*\* — (.+)$/);
    if (entry && LANES.includes(lane)) found.push({ id: entry[1], title: entry[2], lane, body: [] });
    else if (found.length && /^ {2}\S/.test(line) && lane === found.at(-1).lane) found.at(-1).body.push(line.trim());
  }
  return found;
})();

const field = (entry) => entry.body.find((line) => /^`[^`]+`/.test(line)) ?? "";

test("the roadmap has every lane heading, in order", () => {
  const headings = [...text.matchAll(/^## (.+)$/gm)].map((match) => match[1]);
  assert.deepEqual(headings.filter((heading) => LANES.includes(heading)), LANES);
  assert.ok(entries.length > 0);
});

test("every entry has a unique id, a title and a type · owner · priority line", () => {
  assert.equal(new Set(entries.map((entry) => entry.id)).size, entries.length, "an id repeats");
  for (const entry of entries) {
    const [type, owner, priority] = (field(entry).match(/^`([^`]+)`/)?.[1] ?? "").split(" · ");
    assert.ok(TYPES.includes(type), `${entry.id}: type ${type}`);
    assert.ok(OWNERS.includes(owner), `${entry.id}: owner ${owner}`);
    assert.ok(PRIORITIES.includes(priority), `${entry.id}: priority ${priority}`);
  }
});

test("depends names entries that exist", () => {
  const ids = new Set(entries.map((entry) => entry.id));
  for (const entry of entries) {
    const depends = field(entry).match(/depends: (.+)$/)?.[1];
    if (!depends) continue;
    for (const id of depends.match(/[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+/g) ?? []) assert.ok(ids.has(id), `${entry.id} depends on ${id}, which is not in the roadmap`);
  }
});

test("an agent task states what proves it done or points to its board", () => {
  for (const entry of entries.filter((item) => /^`[^`]+ · agent · /.test(field(item)))) {
    assert.ok(entry.body.some((line) => /^accept: /.test(line) || /^board: [A-Z0-9-]+$/.test(line)), `${entry.id}: no accept and no board`);
  }
});

test("a task lives in the lane its owner needs: the creator's work waits in Needs creator, only the agent's is queued", () => {
  for (const entry of entries) {
    const owner = field(entry).match(/^`[^`]+ · (agent|creator) · /)?.[1];
    if (entry.lane === "Queue" || entry.lane === "In progress") assert.equal(owner, "agent", `${entry.id} is in ${entry.lane}`);
  }
});
