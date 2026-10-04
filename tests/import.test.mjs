import { test } from "node:test";
import assert from "node:assert/strict";
import { cpSync, existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { loadContent, root } from "../src/content.mjs";
import { renderSite } from "../src/site.mjs";
import { importArchive } from "../tools/import.mjs";

const copyOfContent = () => {
  const dir = mkdtempSync(join(tmpdir(), "content-"));
  cpSync(`${root}content`, dir, { recursive: true });
  return { dir, url: pathToFileURL(`${dir}/`) };
};

const memory = (overrides = {}) => ({
  id: "first-race",
  public: true,
  date: "2026-03",
  kind: "personal",
  weight: 2,
  period: "now",
  threads: ["body"],
  en: { title: "My first race", body: "I run my first race." },
  es: { title: "Mi primera carrera", body: "Corro mi primera carrera." },
  ...overrides,
});

test("a memory is one file: dropping it in content/memories adds a station with its copy in both languages", () => {
  const { dir, url } = copyOfContent();
  try {
    const before = loadContent(url).life.milestones.length;
    const { id, public: _, ...file } = memory({ id: "kayak", date: "2025-07" });
    writeFileSync(join(dir, "memories", "kayak.json"), JSON.stringify(file));
    const content = loadContent(url);
    assert.equal(content.life.milestones.length, before + 1);
    assert.equal(content.dict.es.life.kayak.title, "Mi primera carrera");
    const at = content.life.milestones.findIndex((entry) => entry.id === "kayak");
    assert.ok(content.life.milestones[at - 1].date <= "2025-07" && "2025-07" <= (content.life.milestones[at + 1]?.date ?? "9999"), "it sits in date order");
    const home = renderSite(content).get("es/index.html");
    assert.match(home, /id="m-kayak"[\s\S]*Mi primera carrera/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("a memory without one of the languages or with a day in its date stops the build with a clear message", () => {
  const { dir, url } = copyOfContent();
  try {
    const { id, public: _, es, ...english } = memory();
    writeFileSync(join(dir, "memories", "half.json"), JSON.stringify(english));
    assert.throws(() => loadContent(url), /content\/memories\/half\.json: needs "es"/);
    writeFileSync(join(dir, "memories", "half.json"), JSON.stringify({ ...english, es, date: "2026-03-14" }));
    assert.throws(() => loadContent(url), /half\.json: date "2026-03-14" must be YYYY or YYYY-MM/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("people.json brings people to filter by: names in both languages and a facet the memories can point at", () => {
  const { dir, url } = copyOfContent();
  try {
    writeFileSync(join(dir, "people.json"), JSON.stringify({ aitor: { en: "Aitor", es: "Aitor" }, mother: { en: "My mother", es: "Mi madre" } }));
    const born = JSON.parse(readFileSync(join(dir, "memories", "born.json"), "utf8"));
    writeFileSync(join(dir, "memories", "born.json"), JSON.stringify({ ...born, people: ["mother"] }));
    const content = loadContent(url);
    assert.deepEqual(content.life.people, ["aitor", "mother"]);
    assert.equal(content.dict.es.people.mother, "Mi madre");
    assert.deepEqual(content.life.milestones.find((entry) => entry.id === "born").people, ["mother"]);
    const html = renderSite(content).get("index.html");
    assert.match(html, /data-facets="[^"]*&quot;people&quot;:\[&quot;aitor&quot;,&quot;mother&quot;\]/);
    assert.match(html, /<ul class="facets" data-facet="people"[^>]*><li data-item="mother">My mother<\/li><\/ul>/);
    assert.doesNotMatch(html, /data-lens="people"/, "people are a filter, not a view");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("the importer writes only what is public, cuts any day down to the month and reports what it left out", () => {
  const { dir, url } = copyOfContent();
  try {
    const report = importArchive(
      {
        people: { brother: { public: true, en: "My brother", es: "Mi hermano" }, secret: { en: "Someone", es: "Alguien" } },
        memories: [memory({ date: "2026-03-14", people: ["brother"] }), memory({ id: "kept-back", public: false }), memory({ id: "unmarked", public: undefined })],
      },
      url,
    );
    assert.deepEqual(report, { added: 1, updated: 0, private: 2, people: 1, places: 0, periods: 0, threads: 0 });
    const written = JSON.parse(readFileSync(join(dir, "memories", "first-race.json"), "utf8"));
    assert.equal(written.date, "2026-03");
    assert.ok(!("public" in written) && !("id" in written));
    assert.ok(!existsSync(join(dir, "memories", "kept-back.json")) && !existsSync(join(dir, "memories", "unmarked.json")));
    const people = Object.keys(JSON.parse(readFileSync(join(dir, "people.json"), "utf8")));
    assert.ok(people.includes("brother") && !people.includes("secret"));
    assert.equal(loadContent(url).dict.en.people.brother, "My brother");
    assert.deepEqual(importArchive({ memories: [memory({ weight: 3 })] }, url), { added: 0, updated: 1, private: 0, people: 0, places: 0, periods: 0, threads: 0 });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("the importer writes nothing when any public memory is wrong, and says why", () => {
  const { dir, url } = copyOfContent();
  try {
    const before = readdirSync(join(dir, "memories")).length;
    assert.throws(
      () => importArchive({ memories: [memory({ id: "good-one" }), memory({ id: "Bad Id", period: "nowhere", threads: ["sailing"], people: ["stranger"], links: ["nothing"], es: undefined })] }, url),
      (error) => ["id must be", "period must be one of", "threads must be", 'people "stranger"', 'link "nothing"', 'needs "es"'].every((part) => error.message.includes(part)),
    );
    assert.equal(readdirSync(join(dir, "memories")).length, before);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

const emptyLife = () => {
  const { dir, url } = copyOfContent();
  rmSync(join(dir, "memories"), { recursive: true });
  for (const file of ["people.json", "places.json"]) writeFileSync(join(dir, file), "{}\n");
  return { dir, url };
};
const exampleArchive = () => JSON.parse(readFileSync(`${root}tools/archive.example.json`, "utf8"));

test("one archive file can define the whole life: periods, threads, where the book and the clone belong, people, places and memories", () => {
  const { dir, url } = emptyLife();
  try {
    const report = importArchive(exampleArchive(), url);
    assert.equal(report.periods, 2);
    assert.equal(report.threads, 2);
    assert.equal(report.added, 2);
    assert.equal(report.private, 1);
    const content = loadContent(url);
    assert.deepEqual(content.life.periods, ["early", "later"]);
    assert.deepEqual(content.life.threads, ["family", "work"]);
    assert.deepEqual(content.life.ahead, { book: "family", clone: "work" });
    assert.equal(content.dict.en.periods.early.kicker, "01 / Early years · 1980–1994");
    assert.equal(content.dict.es.periods.later.title, "Un título para la segunda etapa.");
    assert.equal(content.dict.es.threads.work, "Trabajo");
    assert.deepEqual(Object.keys(content.dict.en.periods), ["early", "later"], "in the order of the archive");
    assert.deepEqual(content.life.milestones.map((entry) => entry.id), ["first-memory", "second-memory"]);
    assert.ok(!existsSync(join(dir, "memories", "kept-private.json")));
    const home = renderSite(content).get("index.html");
    assert.match(home, /id="m-second-memory"/);
    assert.match(home, /A title for the second stage\./);
    const again = importArchive(exampleArchive(), url);
    assert.equal(again.updated, 2, "importing it again updates and does not duplicate");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("a periods or threads block that is wrong, or that would strand a memory already on disk, writes nothing and says why", () => {
  const { dir, url } = emptyLife();
  try {
    importArchive(exampleArchive(), url);
    const before = readFileSync(join(dir, "life.json"), "utf8");
    const bad = exampleArchive();
    bad.periods[0].id = "Not A Slug";
    bad.periods[1].es.intro = "";
    bad.threads.push({ id: "family", en: "Again", es: "Otra vez" });
    bad.ahead = { book: "nowhere", clone: "work" };
    assert.throws(() => importArchive(bad, url), (error) => /periods\[0\] Not A Slug: id must be/.test(error.message) && /periods\[1\] later \(es\): needs a intro/.test(error.message) && /threads\[2\] family: id is repeated/.test(error.message) && /ahead\.book: must be one of the threads/.test(error.message));
    const stranded = { periods: [exampleArchive().periods[1]] };
    assert.throws(() => importArchive(stranded, url), /memory first-memory: its period "early" is no longer one of later/);
    const fewer = { threads: [exampleArchive().threads[1]], ahead: { book: "work", clone: "work" } };
    assert.throws(() => importArchive(fewer, url), /memory first-memory: its thread "family" is no longer one of work/);
    assert.throws(() => importArchive({ periods: [] }, url), /periods: must be a non-empty list/);
    assert.throws(() => importArchive({ threads: [{ id: "only", en: "Only" }] }, url), /threads\[0\] only \(es\): needs a name/);
    assert.equal(readFileSync(join(dir, "life.json"), "utf8"), before, "nothing was written");
    assert.equal(loadContent(url).life.milestones.length, 2);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("the schema and the example describe exactly what the importer reads", () => {
  const schema = JSON.parse(readFileSync(`${root}tools/archive.schema.json`, "utf8"));
  const example = exampleArchive();
  assert.deepEqual(Object.keys(schema.properties).sort(), ["ahead", "memories", "people", "periods", "places", "threads"]);
  assert.deepEqual(Object.keys(example).sort(), Object.keys(schema.properties).sort(), "the example uses every block");
  const memory = schema.$defs.memory;
  const read = ["id", "public", "date", "approx", "kind", "weight", "period", "threads", "people", "places", "links", "order", "quiet", "en", "es"];
  assert.deepEqual(Object.keys(memory.properties).sort(), [...read].sort(), "every field the importer keeps, and no other");
  assert.deepEqual(memory.required, ["id", "public", "date", "kind", "weight", "period", "threads", "en", "es"]);
  assert.deepEqual(memory.properties.kind.enum, ["personal", "professional", "product", "education"]);
  assert.equal(schema.$defs.memoryCopy.properties.body.maxLength, 260);
  assert.deepEqual(schema.$defs.periodCopy.required, ["kicker", "title", "intro"]);
  for (const entry of example.memories) for (const key of Object.keys(entry)) assert.ok(read.includes(key) || key === "note", `${entry.id}: ${key} is not a field`);
  assert.doesNotMatch(JSON.stringify(example), /\b\d{4}-\d{2}-\d{2}\b/, "no day in the example");
});
