import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { loadContent, root } from "../src/content.mjs";

const { dict } = loadContent();

const read = (file) => readFileSync(`${root}${file}`, "utf8");
const strings = (value) => (typeof value === "string" ? [value] : value && typeof value === "object" ? Object.values(value).flatMap(strings) : []);
const text = (html) => html.replace(/<(script|style)[\s\S]*?<\/\1>/g, " ").replace(/<[^>]+>/g, " ");
const plain = (source) => source.replaceAll("avatar.jpg", "portrait.jpg");

const BANNED = /\b(?:AI|IA|artificial intelligence|inteligencia artificial|chatbots?|bots?|assistants?|asistentes?|avatars?|avatares|digital twins?|gemelos? digitales?|immortal|inmortal|forever|para siempre|live on|live-on)\b/i;
const TIME_PROMISE = /\b(?:soon|coming|pronto|próximamente|proximamente)\b/i;

const memories = readdirSync(`${root}content/memories`).map((file) => JSON.parse(read(`content/memories/${file}`)));
const copy = (lang) => [dict[lang], ...memories.map((memory) => memory[lang])].flatMap(strings);
const sources = {
  "README.md": read("README.md"),
  "SPEC.md": read("SPEC.md"),
  "AGENTS.md": read("AGENTS.md"),
  "design/index.html": text(read("design/index.html")),
  "tools/archive.schema.json": read("tools/archive.schema.json"),
  "index.html": text(read("index.html")),
  "es/index.html": text(read("es/index.html")),
  "404.html": text(read("404.html")),
  ...Object.fromEntries(readdirSync(`${root}src`).map((file) => [`src/${file}`, read(`src/${file}`)])),
  ...Object.fromEntries(readdirSync(`${root}content`).filter((file) => file.endsWith(".json")).map((file) => [`content/${file}`, read(`content/${file}`)])),
  ...Object.fromEntries(readdirSync(`${root}content/memories`).map((file) => [`content/memories/${file}`, read(`content/memories/${file}`)])),
};

test("the offer is only ever called my clone: no tool, product or afterlife words anywhere on the site or in its documents", () => {
  for (const [file, source] of Object.entries(sources)) {
    const found = plain(source).match(new RegExp(BANNED.source, "gi"));
    assert.equal(found, null, `${file}: ${found}`);
  }
});

test("the copy promises no time and no exclamation, in both languages", () => {
  for (const lang of ["en", "es"]) {
    for (const line of copy(lang)) {
      assert.doesNotMatch(line, TIME_PROMISE, `${lang}: ${line}`);
      assert.doesNotMatch(line, /!/, `${lang}: ${line}`);
    }
  }
});

test("Spanish addresses the reader as tú, uses the agreed words and the right quotes; English uses curly quotes only", () => {
  const es = copy("es");
  for (const line of es) {
    assert.doesNotMatch(line, /\b(?:usted(?:es)?|ratón|Saluda|anillo vacío|[Cc]ypherpunks?\b(?<!cypherpunks?))/, line);
    assert.doesNotMatch(line, /[“”]/, `Spanish quotes are « »: ${line}`);
  }
  for (const line of copy("en")) assert.doesNotMatch(line, /[«»]/, `English quotes are “ ”: ${line}`);
  assert.equal(dict.es.ui.rail.decade, "Los años {label}");
});

test("the clone is named my clone in both languages on the site's cards and lists", () => {
  assert.match(dict.en.clone.form.region, /my clone/);
  assert.match(dict.es.clone.form.region, /mi clon/);
  assert.match(dict.en.hero.clone, /my clone/);
  assert.match(dict.es.hero.clone, /mi clon/);
});

test("the copy tells the same story in both languages: the hero, the book, the clone, the lists, the search snippet and the 404", () => {
  const words = (text) => text.trim().split(/\s+/).length;
  for (const [lang, parts] of Object.entries({
    en: { went: "what went well and what went wrong", gone: "no longer here", ready: "isn't ready yet", clone: "My clone", write: "Write" },
    es: { went: "lo que salió bien y lo que salió mal", gone: "ya no esté", ready: "Todavía no está listo", clone: "Mi clon", write: "Escríbeme" },
  })) {
    const d = dict[lang];
    assert.ok(words(d.hero.lede) <= 45, `${lang}: the hero says it in 45 words or fewer`);
    assert.ok(d.meta.description.length <= 155, `${lang}: the description fits a search result`);
    assert.doesNotMatch(d.meta.description, /personal site|web personal|milestone|hitos/i);
    assert.ok(d.book.body.includes(parts.went) && /hijos|children/.test(d.book.body), `${lang}: the book is for his children and for whoever wants it, honest about both halves`);
    assert.ok(d.clone.body.includes(parts.gone) && d.clone.body.includes(parts.ready), `${lang}: the clone says what it is for and that it is not ready`);
    assert.doesNotMatch(d.clone.body, /based on|basada|anyone|cualquiera|forever|answer/i);
    assert.equal(d.ui.nav.clone, parts.clone);
    assert.ok(d.clone.kicker.endsWith(parts.clone));
    assert.match(d.contact.title, new RegExp(parts.write));
    assert.doesNotMatch(d.notFound.title + d.notFound.home, /day|días|día/i, `${lang}: the 404 speaks of the sky, not of days`);
  }
  for (const file of ["index.html", "es/index.html"]) {
    const html = read(file);
    const description = html.match(/<meta name="description" content="([^"]*)"/)[1];
    assert.equal(html.match(/<meta property="og:description" content="([^"]*)"/)[1], description);
    assert.equal(html.match(/<meta name="twitter:description" content="([^"]*)"/)[1], description);
  }
});

test("memories of loss are marked quiet: no invitation to a list appears on them", () => {
  for (const id of ["grandfather", "floods", "separation"]) assert.match(read("index.html"), new RegExp(`<li id="m-${id}"[^>]*data-quiet="1"`), id);
  assert.doesNotMatch(read("index.html"), /<li id="m-farmhouse"[^>]*data-quiet/);
  assert.match(read("assets/js/engine.js"), /station\.kind === "milestone" && !station\.element\.dataset\.quiet/);
});
