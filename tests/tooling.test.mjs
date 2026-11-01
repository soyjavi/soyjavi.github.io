import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
const pkg = JSON.parse(read("package.json"));

test("every dependency is pinned to one exact version, in the manifest and in the lock", () => {
  const lock = JSON.parse(read("package-lock.json")).packages[""].devDependencies;
  for (const [name, range] of Object.entries(pkg.devDependencies)) {
    assert.match(range, /^\d+\.\d+\.\d+$/, `${name}: ${range}`);
    assert.equal(lock[name], range, `${name}: the lock names another range`);
  }
});

test("there is one local server, in Node, and nothing declares python", () => {
  assert.equal(pkg.scripts.serve, undefined);
  assert.ok(pkg.scripts.dev);
  assert.doesNotMatch(Object.values(pkg.scripts).join(" "), /python/);
  for (const file of ["README.md", "ROADMAP.md", "SPEC.md", "AGENTS.md"]) assert.doesNotMatch(read(file), /npm run serve|python3/, `${file} points at the Python server`);
});

test(".nvmrc names the Node major the tests run on, inside the range of engines", () => {
  const major = Number(read(".nvmrc").trim());
  assert.ok(Number.isInteger(major));
  assert.ok(major >= Number(pkg.engines.node.replace(/\D/g, "")), "older than engines");
});
