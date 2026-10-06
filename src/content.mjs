import { existsSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { ageAt, ageIdOf, precisionOf, timeOfDate, years } from "../assets/js/life.js";

export const LANGS = ["en", "es"];
export const KINDS = ["personal", "professional", "product", "education"];
export const BODY = { max: 900, paragraphs: 2 };
export const paragraphsOf = (text) => String(text).split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
export const bodyProblem = (text) => (String(text).length > BODY.max ? `body is ${String(text).length} characters, the limit is ${BODY.max}` : paragraphsOf(text).length > BODY.paragraphs ? `body has ${paragraphsOf(text).length} paragraphs, the limit is ${BODY.paragraphs}` : null);
const tally = (list) => {
  const counts = new Map();
  for (const memory of list) for (const id of memory.threads ?? []) counts.set(id, (counts.get(id) ?? 0) + 1);
  return counts;
};
export const distinctive = (held, everything, threadOrder, count = 2) => {
  const [mine, all] = [tally(held), tally(everything)];
  const [inside, outside] = [[...mine.values()].reduce((sum, n) => sum + n, 0), [...all.values()].reduce((sum, n) => sum + n, 0)];
  return [...mine]
    .filter(([, n]) => n >= 2)
    .map(([id, n]) => [id, n / inside / (all.get(id) / outside)])
    .sort((a, b) => b[1] - a[1] || threadOrder.indexOf(a[0]) - threadOrder.indexOf(b[0]))
    .slice(0, count)
    .map(([id]) => id);
};
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
      for (const lang of LANGS) if (bodyProblem(memory[lang].body)) throw new Error(`content/memories/${file} (${lang}): ${bodyProblem(memory[lang].body)}`);
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
  const base = json("life.json");
  if (!precisionOf(String(base.birth))) throw new Error(`content/life.json: birth "${base.birth}" must be YYYY or YYYY-MM`);
  if (base.totals !== undefined && (typeof base.totals !== "object" || base.totals === null || Array.isArray(base.totals))) throw new Error("content/life.json: totals must be an object");
  for (const [key, n] of Object.entries(base.totals ?? {})) if (!["memories", "people", "places"].includes(key) || !Number.isInteger(n) || n < 0) throw new Error(`content/life.json: totals.${key} must be one of memories, people, places and a whole number`);
  if (!Array.isArray(base.ages) || base.ages[0]?.from !== 0 || base.ages.some((stage, i) => !/^[a-z0-9-]+$/.test(stage.id ?? "") || !Number.isFinite(stage.from) || (i && stage.from <= base.ages[i - 1].from))) throw new Error("content/life.json: ages must start at 0, rise, and have slug ids");
  for (const memory of memories) {
    const age = ageAt(base.birth, String(memory.date));
    if (age < 0) throw new Error(`content/memories/${memory.id}.json: dated before his birth`);
    memory.period = ageIdOf(base.ages, age);
  }
  const periodIds = base.ages.map((stage) => stage.id).filter((id) => memories.some((memory) => memory.period === id));
  const life = { ...base, periods: periodIds, milestones: memories.map(({ en, es, order, ...entry }) => entry), questions: questions.map(({ id, memories: ids }) => ({ id, memories: ids })) };
  for (const [facet, table] of Object.entries(facets)) if (Object.keys(table).length) life[facet] = Object.keys(table);
  const dict = Object.fromEntries(
    LANGS.map((lang) => {
      const words = { ...json(`${lang}.json`), life: Object.fromEntries(memories.map((memory) => [memory.id, memory[lang]])), asks: Object.fromEntries(questions.map((question) => [question.id, question[lang]])) };
      for (const [facet, table] of Object.entries(facets)) if (Object.keys(table).length) words[facet] = namesIn(table, lang);
      words.periods = Object.fromEntries(
        periodIds.map((id, k) => {
          const copy = words.ages?.[id];
          if (!copy?.name || !copy.title || !copy.intro) throw new Error(`content/${lang}.json: ages.${id} needs a name, a title and an intro`);
          const span = memories.filter((memory) => memory.period === id).map((memory) => Math.floor(timeOfDate(String(memory.date))));
          const names = distinctive(memories.filter((memory) => memory.period === id), memories, base.threads ?? [], 2).map((thread) => (words.threads?.[thread] ?? thread).toLocaleLowerCase(lang));
          const listed = new Intl.ListFormat(lang === "en" ? "en-GB" : lang, { style: "long", type: "conjunction" }).format(names);
          if ((copy.hint === undefined) !== (json(`${LANGS.find((other) => other !== lang)}.json`).ages?.[id]?.hint === undefined)) throw new Error(`content/${lang}.json: ages.${id}.hint must exist in both languages or in neither`);
          const hint = copy.hint ?? (names.length && words.ui?.explore?.mostly ? words.ui.explore.mostly.replace("{threads}", listed) : "");
          return [id, { kicker: `${String(k + 1).padStart(2, "0")} / ${copy.name} · ${Math.min(...span)}–${Math.max(...span)}`, title: copy.title, intro: copy.intro, hint }];
        }),
      );
      ["book", "clone", "contact"].forEach((key, i) => {
        if (words[key]?.kicker) words[key].kicker = words[key].kicker.replace(/^\d\d/, String(periodIds.length + 1 + i).padStart(2, "0"));
      });
      const cuts = new Intl.ListFormat(lang === "en" ? "en-GB" : lang, { style: "long", type: "conjunction" }).format(base.ages.slice(1).map((stage) => String(stage.from)));
      if (words.ui?.guide?.galaxy) words.ui.guide.galaxy = words.ui.guide.galaxy.replace("{ages}", cuts);
      return [lang, words];
    }),
  );
  return { site, life, dict };
}
