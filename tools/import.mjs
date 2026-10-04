import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { precisionOf } from "../assets/js/life.js";
import { CONTENT, KINDS, LANGS } from "../src/content.mjs";

const SLUG = /^[a-z0-9-]+$/;
const LISTS = ["people", "places", "links"];

const monthOf = (date) => String(date ?? "").slice(0, /^\d{4}-\d{2}/.test(String(date ?? "")) ? 7 : 4);
const readJson = (url, fallback) => (existsSync(url) ? JSON.parse(readFileSync(url, "utf8")) : fallback);
const writeJson = (url, value) => writeFileSync(url, `${JSON.stringify(value, null, 2)}\n`);

export function importArchive(data, dir = CONTENT) {
  const life = readJson(new URL("life.json", dir));
  const folder = new URL("memories/", dir);
  mkdirSync(folder, { recursive: true });
  const errors = [];
  const report = { added: 0, updated: 0, private: 0, people: 0, places: 0, periods: 0, threads: 0 };
  const dictionaries = Object.fromEntries(LANGS.map((lang) => [lang, readJson(new URL(`${lang}.json`, dir))]));
  const nextLife = { ...life };

  const structure = (key, shape) => {
    const list = data[key];
    if (list === undefined) return;
    if (!Array.isArray(list) || !list.length) return errors.push(`${key}: must be a non-empty list, in the order they appear`);
    const seen = new Set();
    for (const [n, item] of list.entries()) {
      const where = `${key}[${n}] ${item?.id ?? ""}`.trim();
      if (!SLUG.test(item?.id ?? "")) errors.push(`${where}: id must be lowercase letters, digits and hyphens`);
      if (seen.has(item?.id)) errors.push(`${where}: id is repeated`);
      seen.add(item?.id);
      for (const lang of LANGS) shape(item?.[lang], `${where} (${lang})`);
    }
    nextLife[key] = list.map((item) => item.id);
  };
  structure("periods", (value, where) => {
    for (const field of ["kicker", "title", "intro"]) if (typeof value?.[field] !== "string" || !value[field].trim()) errors.push(`${where}: needs a ${field}`);
  });
  structure("threads", (value, where) => {
    if (typeof value !== "string" || !value.trim()) errors.push(`${where}: needs a name`);
  });
  if (data.ahead !== undefined) {
    for (const name of ["book", "clone"]) if (!(nextLife.threads ?? life.threads).includes(data.ahead?.[name])) errors.push(`ahead.${name}: must be one of the threads`);
    nextLife.ahead = { book: data.ahead?.book, clone: data.ahead?.clone };
  }
  for (const name of ["book", "clone"]) if (!(nextLife.threads ?? life.threads).includes((nextLife.ahead ?? life.ahead)[name])) errors.push(`ahead.${name}: "${(nextLife.ahead ?? life.ahead)[name]}" is not one of the threads`);
  const periodIds = nextLife.periods ?? life.periods;
  const threadIds = nextLife.threads ?? life.threads;

  const tables = {};
  for (const facet of ["people", "places"]) {
    const table = readJson(new URL(`${facet}.json`, dir), {});
    for (const [id, item] of Object.entries(data[facet] ?? {})) {
      if (item?.public !== true) continue;
      if (!SLUG.test(id)) errors.push(`${facet}/${id}: id must be lowercase letters, digits and hyphens`);
      const names = Object.fromEntries(LANGS.map((lang) => [lang, item[lang] ?? item.name]));
      if (LANGS.some((lang) => !names[lang])) errors.push(`${facet}/${id}: needs a name`);
      if (!table[id]) report[facet]++;
      table[id] = names;
    }
    tables[facet] = table;
  }

  const incoming = (Array.isArray(data) ? data : data.memories ?? []).filter((entry) => entry?.public === true || (report.private++, false));
  const ids = new Set([...incoming.map((entry) => entry.id), ...readdirSync(folder).filter((file) => file.endsWith(".json")).map((file) => file.slice(0, -5))]);
  const ready = incoming.map((entry, n) => {
    const where = `memory ${entry.id ?? `#${n + 1}`}`;
    const date = monthOf(entry.date);
    if (!SLUG.test(entry.id ?? "")) errors.push(`${where}: id must be lowercase letters, digits and hyphens`);
    if (!precisionOf(date)) errors.push(`${where}: date must start with YYYY or YYYY-MM`);
    if (!KINDS.includes(entry.kind)) errors.push(`${where}: kind must be one of ${KINDS.join(", ")}`);
    if (![1, 2, 3].includes(entry.weight)) errors.push(`${where}: weight must be 1, 2 or 3`);
    if (!periodIds.includes(entry.period)) errors.push(`${where}: period must be one of ${periodIds.join(", ")}`);
    if (!Array.isArray(entry.threads) || !entry.threads.length || entry.threads.length > 3 || entry.threads.some((id) => !threadIds.includes(id))) errors.push(`${where}: threads must be one to three of ${threadIds.join(", ")}`);
    for (const facet of ["people", "places"]) for (const id of entry[facet] ?? []) if (!tables[facet][id]) errors.push(`${where}: ${facet} "${id}" is not public in ${facet}.json or in this archive`);
    for (const id of entry.links ?? []) if (!ids.has(id) || id === entry.id) errors.push(`${where}: link "${id}" points at no other memory`);
    for (const lang of LANGS) if (!entry[lang]?.title || !entry[lang]?.body) errors.push(`${where}: needs "${lang}" with a title and a body`);
    const memory = { date, ...(entry.approx ? { approx: true } : {}), kind: entry.kind, weight: entry.weight, period: entry.period, threads: entry.threads };
    for (const key of LISTS) if (entry[key]?.length) memory[key] = entry[key];
    if (entry.order !== undefined) memory.order = entry.order;
    for (const lang of LANGS) memory[lang] = { title: entry[lang]?.title, body: entry[lang]?.body };
    return [entry.id, memory];
  });

  const kept = readdirSync(folder).filter((file) => file.endsWith(".json")).map((file) => ({ id: file.slice(0, -5), ...readJson(new URL(file, folder)) }));
  for (const entry of kept) {
    if (!ids.has(entry.id) || incoming.some((other) => other.id === entry.id)) continue;
    if (!periodIds.includes(entry.period)) errors.push(`memory ${entry.id}: its period "${entry.period}" is no longer one of ${periodIds.join(", ")}`);
    for (const thread of entry.threads ?? []) if (!threadIds.includes(thread)) errors.push(`memory ${entry.id}: its thread "${thread}" is no longer one of ${threadIds.join(", ")}`);
  }
  if (errors.length) throw new Error(errors.join("\n"));
  for (const key of ["periods", "threads"]) {
    if (data[key] === undefined) continue;
    report[key] = data[key].length;
    for (const lang of LANGS) {
      dictionaries[lang][key] = Object.fromEntries(data[key].map((item) => [item.id, item[lang]]));
      writeJson(new URL(`${lang}.json`, dir), dictionaries[lang]);
    }
  }
  if (nextLife.periods !== life.periods || nextLife.threads !== life.threads || data.ahead !== undefined) writeJson(new URL("life.json", dir), nextLife);
  for (const [id, memory] of ready) {
    const file = new URL(`${id}.json`, folder);
    report[existsSync(file) ? "updated" : "added"]++;
    writeJson(file, memory);
  }
  for (const [facet, table] of Object.entries(tables)) if (Object.keys(table).length) writeJson(new URL(`${facet}.json`, dir), table);
  return report;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [file] = process.argv.slice(2);
  if (!file) {
    console.error("usage: npm run import -- archive.json");
    process.exit(1);
  }
  try {
    const report = importArchive(JSON.parse(readFileSync(file, "utf8")));
    console.log(`${report.added} memories added, ${report.updated} updated, ${report.private} left out as private; ${report.people} people and ${report.places} places added${report.periods ? `; ${report.periods} periods` : ""}${report.threads ? `; ${report.threads} threads` : ""}. Run npm run build next.`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
