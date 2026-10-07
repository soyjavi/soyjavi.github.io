import { test } from "node:test";
import assert from "node:assert/strict";
import { cpSync, existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";
import { FACETS, precisionOf, todayYear, years } from "../assets/js/life.js";
import { bodyProblem, distinctive, LANGS, loadContent, root } from "../src/content.mjs";
import { ageAt, ageIdOf } from "../assets/js/life.js";
import { renderSite } from "../src/site.mjs";
import { bundleOptions } from "../tools/bundle.mjs";

const content = loadContent();
const { life } = content;
const KINDS = ["personal", "professional", "product", "education"];

const shape = (value, path = "") =>
  value && typeof value === "object" && !Array.isArray(value)
    ? Object.keys(value).flatMap((key) => shape(value[key], `${path}.${key}`))
    : [path];

test("every milestone has a unique id, a known kind, a weight and a period that exists", () => {
  const ids = life.milestones.map((entry) => entry.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const entry of life.milestones) {
    assert.ok(KINDS.includes(entry.kind), `${entry.id}: kind`);
    assert.ok([1, 2, 3].includes(entry.weight), `${entry.id}: weight`);
    assert.ok(life.periods.includes(entry.period), `${entry.id}: period`);
  }
  for (const period of life.periods) assert.ok(life.milestones.some((entry) => entry.period === period), `${period} is empty`);
});

test("no milestone is more precise than a month, so no exact day can be published", () => {
  for (const entry of life.milestones) {
    assert.ok(["year", "month"].includes(precisionOf(entry.date)), `${entry.id}: "${entry.date}"`);
    assert.doesNotMatch(entry.date, /^\d{4}-\d{2}-\d{2}/, entry.id);
  }
});

test("no content file carries a full date or a private field", () => {
  const files = ["site.json", "life.json", "en.json", "es.json", ...readdirSync(`${root}content/memories`).map((file) => `memories/${file}`), ...["people.json", "places.json"].filter((file) => existsSync(`${root}content/${file}`))];
  for (const file of files) {
    const text = readFileSync(`${root}content/${file}`, "utf8");
    assert.doesNotMatch(text, /"[^"]*\d{4}-\d{2}-\d{2}[^"]*"/, `${file} has a full date`);
  }
  for (const entry of life.milestones) assert.deepEqual(Object.keys(entry).filter((key) => !["id", "date", "approx", "kind", "weight", "period", "threads", "people", "places", "links", "quiet", "added"].includes(key)), [], entry.id);
});

const facetsOf = () => Object.fromEntries(FACETS.map((facet) => [facet, life[facet] ?? []]));

test("every memory belongs to known threads, and its links and people point at things that exist", () => {
  const ids = new Set(life.milestones.map((entry) => entry.id));
  const slug = /^[a-z0-9-]+$/;
  const facets = facetsOf();
  assert.ok(facets.threads.length >= 2, "threads need at least two arms");
  for (const facet of FACETS) {
    assert.equal(new Set(facets[facet]).size, facets[facet].length, `${facet} repeats an id`);
    facets[facet].forEach((id) => assert.match(id, slug, `${facet}/${id}`));
  }
  for (const entry of life.milestones) {
    assert.ok(entry.threads?.length >= 1 && entry.threads.length <= 3, `${entry.id} needs one to three threads`);
    for (const facet of FACETS) {
      const own = entry[facet] ?? [];
      assert.equal(new Set(own).size, own.length, `${entry.id} repeats a ${facet}`);
      own.forEach((id) => assert.ok(facets[facet].includes(id), `${entry.id}: unknown ${facet} ${id}`));
    }
    for (const link of entry.links ?? []) {
      assert.ok(ids.has(link), `${entry.id} links to ${link}, which does not exist`);
      assert.notEqual(link, entry.id, `${entry.id} links to itself`);
    }
    assert.equal(new Set(entry.links ?? []).size, (entry.links ?? []).length, `${entry.id} repeats a link`);
  }
  for (const facet of FACETS) facets[facet].forEach((id) => assert.ok(life.milestones.some((entry) => (entry[facet] ?? []).includes(id)), `${facet}/${id} has no memory`));
  life.milestones.forEach((entry) => assert.ok(life.threads.indexOf(entry.threads[0]) >= 0));
  for (const id of life.threads) assert.ok(life.milestones.some((entry) => entry.threads[0] === id), `thread ${id} has no memory of its own to hold its arm`);
  assert.deepEqual(Object.keys(life.ahead).sort(), ["book", "clone"]);
  Object.values(life.ahead).forEach((id) => assert.ok(life.threads.includes(id)));
});

test("threads, people and places are named in both languages, and nothing else is", () => {
  for (const lang of LANGS) {
    for (const facet of FACETS) {
      const names = content.dict[lang][facet] ?? {};
      assert.deepEqual(Object.keys(names).sort(), [...(life[facet] ?? [])].sort(), `${lang}/${facet}`);
      Object.values(names).forEach((name) => assert.ok(name.length <= 40, `${lang}/${facet}: "${name}" is long`));
    }
  }
});

test("no document carries a life date more precise than a month", () => {
  const months = "January|February|March|April|May|June|July|August|September|October|November|December";
  const day = new RegExp(`\\b\\d{1,2}(st|nd|rd|th)? (${months})\\b|\\b(${months}) \\d{1,2}(st|nd|rd|th)?\\b`);
  for (const file of ["README.md", "AGENTS.md", "ROADMAP.md", "SPEC.md", "design/index.html", "design/proposals.html"]) assert.doesNotMatch(readFileSync(`${root}${file}`, "utf8"), day, `${file} names a day`);
});

test("milestones are in chronological order, each period is contiguous and none is in the future", () => {
  const order = years(life.milestones);
  assert.deepEqual(order, [...order].sort((a, b) => a - b));
  const seen = [];
  for (const entry of life.milestones) {
    if (seen.at(-1) !== entry.period) {
      assert.ok(!seen.includes(entry.period), `${entry.period} is split`);
      seen.push(entry.period);
    }
  }
  assert.deepEqual(seen, life.periods);
  const now = new Date();
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  for (const entry of life.milestones) assert.ok(entry.date <= (entry.date.length === 4 ? month.slice(0, 4) : month), `${entry.id} is in the future`);
});

test("every milestone and period has short copy in both languages", () => {
  for (const lang of LANGS) {
    const d = content.dict[lang];
    for (const entry of life.milestones) {
      const copy = d.life[entry.id];
      assert.ok(copy?.title && copy?.body, `${lang}/${entry.id}`);
      assert.ok(copy.title.length <= 60, `${lang}/${entry.id}: title is ${copy.title.length} characters`);
      assert.equal(bodyProblem(copy.body), null, `${lang}/${entry.id}`);
    }
    for (const id of life.periods) {
      assert.match(d.periods[id].kicker, /^\d\d \/ .+ · \d{4}–\d{4}$/, `${lang}/${id}`);
      assert.ok(d.periods[id].title && d.periods[id].intro);
    }
    assert.deepEqual(Object.keys(d.life).sort(), life.milestones.map((entry) => entry.id).sort(), `${lang} has copy for a milestone that does not exist`);
  }
});

test("both dictionaries have the same keys and no empty copy", () => {
  assert.deepEqual(shape(content.dict.es).sort(), shape(content.dict.en).sort());
  const empty = (value) => (typeof value === "string" ? !value.trim() : Array.isArray(value) ? false : Object.values(value).some(empty));
  for (const lang of LANGS) assert.ok(!empty(content.dict[lang]), lang);
});

test("period kickers number the periods and the other sections continue the count", () => {
  for (const lang of LANGS) {
    const d = content.dict[lang];
    const numbers = life.periods.map((id) => d.periods[id].kicker.slice(0, 2));
    const pad = (n) => String(n).padStart(2, "0");
    assert.deepEqual(numbers, life.periods.map((_, k) => pad(k + 1)));
    assert.deepEqual([d.book, d.clone, d.contact].map((section) => section.kicker.slice(0, 2)), [1, 2, 3].map((n) => pad(life.periods.length + n)));
  }
});

test("the book has no invented title and the two waitlists can be switched on from one setting", () => {
  assert.equal(content.site.book.title, null);
  assert.ok(content.site.book.date === null || /^\d{4}-(0[1-9]|1[0-2])$/.test(content.site.book.date), "the book's date is a month at most, never a day");
  assert.deepEqual(Object.keys(content.site.buttondown.tags).sort(), ["book", "clone"]);
  assert.notEqual(content.site.buttondown.tags.book, content.site.buttondown.tags.clone, "two lists, two tags");
  assert.deepEqual(Object.keys(content.site.links), ["x"], "the site links to X only");
});

test("generated pages on disk are exactly what the sources render", () => {
  for (const [file, text] of renderSite(content)) {
    assert.ok(existsSync(`${root}${file}`), `${file} is missing: run npm run build`);
    assert.equal(readFileSync(`${root}${file}`, "utf8"), text, `${file} is stale: run npm run build`);
  }
});

test("assets/site.js is exactly what the sources bundle to", async () => {
  const { outputFiles } = await build({ ...bundleOptions, write: false, logLevel: "silent" });
  assert.equal(outputFiles[0].text, readFileSync(`${root}assets/site.js`, "utf8"), "assets/site.js is stale: run npm run build");
});

test("today is the visitor's calendar day in every time zone", () => {
  const zone = process.env.TZ;
  const run = (tz, instant) => {
    process.env.TZ = tz;
    return todayYear(instant);
  };
  try {
    const reference = run("UTC", Date.UTC(2026, 9, 3, 12, 0));
    const next = run("UTC", Date.UTC(2026, 9, 4, 12, 0));
    const cases = [
      ["America/Los_Angeles", Date.UTC(2026, 9, 4, 5, 0), reference],
      ["America/Los_Angeles", Date.UTC(2026, 9, 3, 20, 0), reference],
      ["Pacific/Auckland", Date.UTC(2026, 9, 3, 12, 0), next],
      ["Europe/Madrid", Date.UTC(2026, 9, 3, 22, 30), next],
      ["Europe/Madrid", Date.UTC(2026, 9, 3, 21, 30), reference],
    ];
    for (const [tz, instant, expected] of cases) assert.equal(run(tz, instant), expected, `${tz} at ${new Date(instant).toISOString()}`);
    assert.ok(next > reference);
  } finally {
    if (zone === undefined) delete process.env.TZ;
    else process.env.TZ = zone;
  }
});

test("the questions for the clone are three to five, each in both languages and on memories that exist, or none yet", () => {
  const { questions } = content.life;
  assert.ok(questions.length === 0 || (questions.length >= 3 && questions.length <= 5), `${questions.length} questions`);
  assert.equal(new Set(questions.map((question) => question.id)).size, questions.length, "ids are unique");
  const known = new Set(content.life.milestones.map((entry) => entry.id));
  for (const question of questions) {
    assert.ok(question.memories.length >= 1 && question.memories.every((id) => known.has(id)), `${question.id}: every memory is a public memory`);
    assert.equal(new Set(question.memories).size, question.memories.length);
    for (const lang of LANGS) assert.ok(content.dict[lang].asks[question.id]?.trim(), `${question.id} in ${lang}`);
  }
});

test("a question that points at a memory that does not exist, or lacks a language, stops the build", () => {
  const copy = mkdtempSync(join(tmpdir(), "questions-"));
  try {
    cpSync(new URL("../content/", import.meta.url), copy, { recursive: true });
    const dir = new URL(`file://${copy}/`);
    writeFileSync(join(copy, "questions.json"), JSON.stringify([{ id: "q", memories: ["nowhere"], en: "Why?", es: "¿Por qué?" }]));
    assert.throws(() => loadContent(dir), /needs memories that exist/);
    writeFileSync(join(copy, "questions.json"), JSON.stringify([{ id: "q", memories: ["born"], en: "Why?" }]));
    assert.throws(() => loadContent(dir), /needs "es"/);
    writeFileSync(join(copy, "questions.json"), JSON.stringify([{ id: "q", memories: ["born"], en: "Why?", es: "¿Por qué?" }]));
    assert.deepEqual(loadContent(dir).life.questions, [{ id: "q", memories: ["born"] }]);
  } finally {
    rmSync(copy, { recursive: true, force: true });
  }
});

test("a book date more precise than a month, or a repeated question id, stops the build", () => {
  const copy = mkdtempSync(join(tmpdir(), "dates-"));
  try {
    cpSync(new URL("../content/", import.meta.url), copy, { recursive: true });
    const dir = new URL(`file://${copy}/`);
    const site = JSON.parse(readFileSync(join(copy, "site.json"), "utf8"));
    for (const date of ["2027-06-15", "2027", "", "2027-13"]) {
      writeFileSync(join(copy, "site.json"), JSON.stringify({ ...site, book: { ...site.book, date } }));
      assert.throws(() => loadContent(dir), /must be YYYY-MM or null/, JSON.stringify(date));
    }
    writeFileSync(join(copy, "site.json"), JSON.stringify({ ...site, book: { ...site.book, date: "2027-06" } }));
    assert.equal(loadContent(dir).site.book.date, "2027-06");
    const pair = { memories: ["born"], en: "Why?", es: "¿Por qué?" };
    writeFileSync(join(copy, "questions.json"), JSON.stringify([{ id: "q", ...pair }, { id: "q", ...pair }]));
    assert.throws(() => loadContent(dir), /ids must be unique/);
  } finally {
    rmSync(copy, { recursive: true, force: true });
  }
});

test("a build that fails leaves the previous pages in place", () => {
  const copy = mkdtempSync(join(tmpdir(), "site-"));
  try {
    cpSync(root, copy, { recursive: true, filter: (source) => !/(^|[\\/])(node_modules|\.git)([\\/]|$)/.test(source.slice(root.length)) });
    symlinkSync(`${root}node_modules`, join(copy, "node_modules"));
    const memory = join(copy, "content/memories/born.json");
    writeFileSync(memory, readFileSync(memory, "utf8").replace(/"date": "[^"]*"/, '"date": "soon"'));
    const result = spawnSync(process.execPath, ["tools/build.mjs"], { cwd: copy, encoding: "utf8" });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /must be YYYY or YYYY-MM/);
    for (const kept of ["es/index.html", "assets/site.js"]) assert.ok(existsSync(join(copy, kept)), `${kept} was deleted by a failed build`);
  } finally {
    rmSync(copy, { recursive: true, force: true });
  }
});

test("GitHub Pages serves the files as they are, without Jekyll", () => {
  assert.ok(existsSync(`${root}.nojekyll`));
  assert.equal(readFileSync(`${root}.nojekyll`, "utf8"), "");
});

test("every font shipped has its licence text next to it", () => {
  const licences = readFileSync(`${root}assets/fonts/LICENSES.txt`, "utf8");
  for (const font of readdirSync(`${root}assets/fonts`).filter((file) => file.endsWith(".woff2"))) {
    const family = font.startsWith("instrument-serif") ? "Instrument Serif" : font.startsWith("geist-mono") ? "Geist Mono" : "Geist";
    assert.ok(licences.includes(family), `${font} has no licence`);
  }
  assert.equal((licences.match(/SIL OPEN FONT LICENSE Version 1\.1/g) ?? []).length, 3);
});

test("the galaxy of a memory is the age of his life it was lived at: seven ages cut at 7, 14, 25, 40, 55 and 70 from his birth", () => {
  assert.equal(life.birth, "1980-04");
  assert.deepEqual(life.ages.map((stage) => stage.from), [0, 7, 14, 25, 40, 55, 70]);
  assert.deepEqual(life.ages.map((stage) => stage.id), ["early", "school", "youth", "building", "midlife", "elder", "later"]);
  for (const entry of life.milestones) assert.equal(entry.period, ageIdOf(life.ages, ageAt(life.birth, entry.date)), `${entry.id}: its age decides its galaxy`);
  assert.deepEqual(life.periods, life.ages.map((stage) => stage.id).filter((id) => life.milestones.some((entry) => entry.period === id)), "only the ages he has lived and remembered are galaxies, in order");
  for (const lang of LANGS) for (const stage of life.ages) assert.ok(content.dict[lang].ages[stage.id]?.name && content.dict[lang].ages[stage.id].title && content.dict[lang].ages[stage.id].intro, `${lang}/${stage.id}`);
  for (const file of readdirSync(`${root}content/memories`)) assert.ok(!("period" in JSON.parse(readFileSync(`${root}content/memories/${file}`, "utf8"))), `${file} carries no period: the date decides`);
  assert.match(content.dict.en.ui.guide.galaxy, /cut at 7, 14, 25, 40, 55 and 70/, "the site explains the ages");
  assert.match(content.dict.es.ui.guide.galaxy, /cortada a los 7, 14, 25, 40, 55 y 70 años/);
});

test("life.json totals and ages are checked: totals is an object of whole numbers, every age has a number to start from", () => {
  const dir = mkdtempSync(join(tmpdir(), "life-"));
  cpSync(`${root}content`, dir, { recursive: true });
  const url = new URL(`file://${dir}/`);
  const file = join(dir, "life.json");
  const life = JSON.parse(readFileSync(file, "utf8"));
  try {
    for (const [patch, message] of [[{ totals: 5 }, /totals must be an object/], [{ totals: [] }, /totals must be an object/], [{ totals: { people: 1.5 } }, /totals\.people/], [{ totals: { threads: 3 } }, /totals\.threads/], [{ ages: life.ages.map((age, i) => (i === 3 ? { id: age.id } : age)) }, /ages must start at 0/]]) {
      writeFileSync(file, JSON.stringify({ ...life, ...patch }));
      assert.throws(() => loadContent(url), message);
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("the hint under an age says the threads that mark it against the rest of the life, and an age's own hint wins", () => {
  const at = (...threads) => ({ threads });
  const everything = [at("home", "family"), at("home"), at("home"), at("body", "craft"), at("body", "craft"), at("craft"), at("family")];
  const order = ["home", "family", "body", "craft"];
  assert.deepEqual(distinctive(everything.slice(0, 3), everything, order, 2), ["home"], "a thread with a single memory is not what marks an age");
  assert.deepEqual(distinctive(everything.slice(3, 6), everything, order, 2), ["body", "craft"]);
  const html = renderSite(content);
  for (const id of life.periods) for (const page of ["index.html", "es/index.html"]) assert.match(html.get(page), new RegExp(`<section class="chapter period" id="period-${id}" data-hint="[^"]+"`), `${page} ${id}`);
  assert.match(content.dict.en.periods.early.hint, /^Marked by /);
  assert.match(content.dict.es.periods.early.hint, /^Huella de /);
  const dir = mkdtempSync(join(tmpdir(), "hint-"));
  try {
    cpSync(`${root}content`, dir, { recursive: true });
    for (const lang of LANGS) {
      const file = join(dir, `${lang}.json`);
      const words = JSON.parse(readFileSync(file, "utf8"));
      words.ages.early.hint = `own ${lang}`;
      writeFileSync(file, JSON.stringify(words));
    }
    const own = loadContent(pathToFileURL(`${dir}/`));
    assert.equal(own.dict.en.periods.early.hint, "own en");
    assert.equal(own.dict.es.periods.early.hint, "own es");
    assert.match(own.dict.en.periods.school.hint, /^Marked by /, "the other ages keep the derived one");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
