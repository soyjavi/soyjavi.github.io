import { existsSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { precisionOf, years } from "../assets/js/life.js";

export const LANGS = ["en", "es"];
export const KINDS = ["personal", "professional", "product", "education"];
export const root = fileURLToPath(new URL("..", import.meta.url));
export const CONTENT = new URL("../content/", import.meta.url);

const dateKey = (date) => +date.slice(0, 4) * 12 + (date.length === 7 ? +date.slice(5, 7) - 1 : 5.5);

export function readMemories(dir = CONTENT) {
  const folder = new URL("memories/", dir);
  const memories = readdirSync(folder)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const id = file.slice(0, -".json".length);
      const memory = { id, ...JSON.parse(readFileSync(new URL(file, folder), "utf8")) };
      if (!precisionOf(String(memory.date))) throw new Error(`content/memories/${file}: date "${memory.date}" must be YYYY or YYYY-MM`);
      for (const lang of LANGS) if (!memory[lang]?.title || !memory[lang]?.body) throw new Error(`content/memories/${file}: needs "${lang}" with a title and a body`);
      return memory;
    })
    .sort((a, b) => dateKey(a.date) - dateKey(b.date) || (a.order ?? 0) - (b.order ?? 0) || a.id.localeCompare(b.id));
  const placed = years(memories);
  return memories.map((memory, i) => [memory, placed[i]]).sort((a, b) => a[1] - b[1]).map(([memory]) => memory);
}

const namesIn = (table, lang) => Object.fromEntries(Object.entries(table).map(([id, name]) => [id, typeof name === "string" ? name : name[lang]]));

export function loadContent(dir = CONTENT) {
  const json = (path, fallback) => (fallback !== undefined && !existsSync(new URL(path, dir)) ? fallback : JSON.parse(readFileSync(new URL(path, dir), "utf8")));
  const memories = readMemories(dir);
  const facets = { people: json("people.json", {}), places: json("places.json", {}) };
  const site = json("site.json");
  if (site.book?.date != null && !/^\d{4}-(0[1-9]|1[0-2])$/.test(site.book.date)) throw new Error(`content/site.json: book.date "${site.book.date}" must be YYYY-MM or null`);
  const questions = json("questions.json", []);
  const known = new Set(memories.map((memory) => memory.id));
  if (new Set(questions.map((question) => question.id)).size !== questions.length) throw new Error("content/questions.json: ids must be unique");
  for (const question of questions) {
    if (!question.id || !question.memories?.length || question.memories.some((id) => !known.has(id))) throw new Error(`content/questions.json: "${question.id}" needs memories that exist`);
    for (const lang of LANGS) if (!question[lang]) throw new Error(`content/questions.json: "${question.id}" needs "${lang}"`);
  }
  const life = { ...json("life.json"), milestones: memories.map(({ en, es, order, ...entry }) => entry), questions: questions.map(({ id, memories: ids }) => ({ id, memories: ids })) };
  for (const [facet, table] of Object.entries(facets)) if (Object.keys(table).length) life[facet] = Object.keys(table);
  const dict = Object.fromEntries(
    LANGS.map((lang) => {
      const words = { ...json(`${lang}.json`), life: Object.fromEntries(memories.map((memory) => [memory.id, memory[lang]])), asks: Object.fromEntries(questions.map((question) => [question.id, question[lang]])) };
      for (const [facet, table] of Object.entries(facets)) if (Object.keys(table).length) words[facet] = namesIn(table, lang);
      return [lang, words];
    }),
  );
  return { site, life, dict };
}
