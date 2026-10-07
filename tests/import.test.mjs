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
    assert.deepEqual(report, { added: 1, updated: 0, private: 2, people: 1, places: 0, threads: 0 });
    const written = JSON.parse(readFileSync(join(dir, "memories", "first-race.json"), "utf8"));
    assert.equal(written.date, "2026-03");
    assert.ok(!("public" in written) && !("id" in written));
    assert.ok(!existsSync(join(dir, "memories", "kept-back.json")) && !existsSync(join(dir, "memories", "unmarked.json")));
    const people = Object.keys(JSON.parse(readFileSync(join(dir, "people.json"), "utf8")));
    assert.ok(people.includes("brother") && !people.includes("secret"));
    assert.equal(loadContent(url).dict.en.people.brother, "My brother");
    assert.deepEqual(importArchive({ memories: [memory({ weight: 3 })] }, url), { added: 0, updated: 1, private: 0, people: 0, places: 0, threads: 0 });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("the importer writes nothing when any public memory is wrong, and says why", () => {
  const { dir, url } = copyOfContent();
  try {
    const before = readdirSync(join(dir, "memories")).length;
    assert.throws(
      () => importArchive({ memories: [memory({ id: "good-one" }), memory({ id: "Bad Id", threads: ["sailing"], people: ["stranger"], links: ["nothing"], es: undefined })] }, url),
      (error) => ["id must be", "threads must be", 'people "stranger"', 'link "nothing"', 'needs "es"'].every((part) => error.message.includes(part)),
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

test("one archive file can define the whole life: threads, where the book and the clone belong, people, places and memories, with the age of each memory deciding its galaxy", () => {
  const { dir, url } = emptyLife();
  try {
    const report = importArchive(exampleArchive(), url);
    assert.equal(report.threads, 2);
    assert.equal(report.added, 2);
    assert.equal(report.private, 1);
    const content = loadContent(url);
    assert.deepEqual(content.life.threads, ["family", "work"]);
    assert.deepEqual(content.life.ahead, { book: "family", clone: "work" });
    assert.equal(content.dict.es.threads.work, "Trabajo");
    assert.ok(content.life.periods.length >= 1 && content.life.milestones.every((entry) => content.life.periods.includes(entry.period)), "every memory has the galaxy of its age");
    assert.deepEqual(content.life.milestones.map((entry) => entry.id), ["first-memory", "second-memory"]);
    assert.ok(!existsSync(join(dir, "memories", "kept-private.json")));
    assert.ok(readdirSync(join(dir, "memories")).every((file) => !("period" in JSON.parse(readFileSync(join(dir, "memories", file), "utf8")))), "no memory file carries a period: the age decides");
    const home = renderSite(content).get("index.html");
    assert.match(home, /id="m-second-memory"/);
    const again = importArchive(exampleArchive(), url);
    assert.equal(again.updated, 2, "importing it again updates and does not duplicate");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("a threads block that is wrong, or that would strand a memory already on disk, writes nothing and says why", () => {
  const { dir, url } = emptyLife();
  try {
    importArchive(exampleArchive(), url);
    const before = readFileSync(join(dir, "life.json"), "utf8");
    const bad = exampleArchive();
    bad.threads.push({ id: "family", en: "Again", es: "Otra vez" });
    bad.ahead = { book: "nowhere", clone: "work" };
    assert.throws(() => importArchive(bad, url), (error) => /threads\[2\] family: id is repeated/.test(error.message) && /ahead\.book: must be one of the threads/.test(error.message));
    const fewer = { threads: [exampleArchive().threads[1]], ahead: { book: "work", clone: "work" } };
    assert.throws(() => importArchive(fewer, url), /memory first-memory: its thread "family" is no longer one of work/);
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
  assert.deepEqual(Object.keys(schema.properties).sort(), ["ahead", "memories", "people", "places", "threads"]);
  assert.deepEqual(Object.keys(example).sort(), Object.keys(schema.properties).sort(), "the example uses every block");
  const memory = schema.$defs.memory;
  const read = ["id", "public", "date", "approx", "kind", "weight", "threads", "people", "places", "links", "order", "quiet", "en", "es"];
  assert.deepEqual(Object.keys(memory.properties).sort(), [...read].sort(), "every field the importer keeps, and no other");
  assert.deepEqual(memory.required, ["id", "public", "date", "kind", "weight", "threads", "en", "es"]);
  assert.deepEqual(memory.properties.kind.enum, ["personal", "professional", "product", "education"]);
  assert.equal(schema.$defs.memoryCopy.properties.body.maxLength, 900);
  for (const entry of example.memories) for (const key of Object.keys(entry)) assert.ok(read.includes(key) || key === "note", `${entry.id}: ${key} is not a field`);
  assert.doesNotMatch(JSON.stringify(example), /\b\d{4}-\d{2}-\d{2}\b/, "no day in the example");
});

test("a memory dated before his birth stops the import and writes nothing, instead of leaving a site that cannot build", () => {
  const { dir, url } = copyOfContent();
  try {
    const before = readdirSync(join(dir, "memories")).length;
    assert.throws(() => importArchive({ memories: [memory({ id: "too-early", date: "1970-05" })] }, url), /too-early.*before his birth/);
    assert.equal(readdirSync(join(dir, "memories")).length, before);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("a memory text is one or two paragraphs of at most 900 characters: two print as two paragraphs, a longer one stops the import", () => {
  const { dir, url } = copyOfContent();
  try {
    const before = readdirSync(join(dir, "memories")).length;
    const two = { title: "T", body: `${"a".repeat(400)}.\n\n${"b".repeat(400)}.` };
    importArchive({ memories: [memory({ id: "two-parts", en: two, es: two })] }, url);
    const home = renderSite(loadContent(url)).get("index.html");
    assert.match(home, new RegExp(`<p>a{400}\\.</p>\\s*<p>b{400}\\.</p>`));
    const long = { title: "T", body: "c".repeat(901) };
    assert.throws(() => importArchive({ memories: [memory({ id: "too-long", en: long })] }, url), /too-long \(en\): body is 901 characters/);
    const three = { title: "T", body: "One.\n\nTwo.\n\nThree." };
    assert.throws(() => importArchive({ memories: [memory({ id: "three-parts", es: three })] }, url), /three-parts \(es\): body has 3 paragraphs/);
    assert.equal(readdirSync(join(dir, "memories")).length, before + 1, "only the good one was written");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("a person or place nobody is remembered with is not written, even when the archive lists it as public", () => {
  const { dir, url } = emptyLife();
  try {
    const named = (en) => ({ public: true, en, es: en });
    const report = importArchive({ people: { used: named("Used"), idle: named("Idle") }, places: { somewhere: named("Somewhere") }, memories: [memory({ people: ["used"] })] }, url);
    assert.deepEqual([report.people, report.places], [1, 0]);
    assert.deepEqual(Object.keys(JSON.parse(readFileSync(join(dir, "people.json"), "utf8"))), ["used"]);
    assert.equal(Object.keys(JSON.parse(readFileSync(join(dir, "places.json"), "utf8"))).length, 0);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("a memory the import adds carries the month it was added, and an update keeps the month it first had", () => {
  const { dir, url } = copyOfContent();
  try {
    importArchive({ memories: [memory({ id: "fresh-one" })] }, url, new Date(2026, 9, 7));
    const first = JSON.parse(readFileSync(join(dir, "memories", "fresh-one.json"), "utf8"));
    assert.equal(first.added, "2026-10");
    importArchive({ memories: [memory({ id: "fresh-one" })] }, url, new Date(2027, 2, 1));
    assert.equal(JSON.parse(readFileSync(join(dir, "memories", "fresh-one.json"), "utf8")).added, "2026-10");
    const home = renderSite(loadContent(url)).get("index.html");
    assert.match(home, /<span class="fresh kicker" data-added="2026-10" hidden>New<\/span>/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("importing over a memory that has no added month leaves it without one, so a full import never makes everything new", () => {
  const { dir, url } = copyOfContent();
  try {
    const [file] = readdirSync(join(dir, "memories"));
    const id = file.slice(0, -5);
    const existing = JSON.parse(readFileSync(join(dir, "memories", file), "utf8"));
    assert.equal(existing.added, undefined);
    importArchive({ memories: [memory({ id, threads: existing.threads, date: existing.date })] }, url);
    assert.equal(JSON.parse(readFileSync(join(dir, "memories", file), "utf8")).added, undefined);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
