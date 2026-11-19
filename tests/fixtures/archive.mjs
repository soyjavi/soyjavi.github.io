import { readFileSync } from "node:fs";
import { ageAt, ageIdOf } from "../../assets/js/life.js";
import { seeded } from "../../assets/js/util.js";

const { birth, ages } = JSON.parse(readFileSync(new URL("../../content/life.json", import.meta.url), "utf8"));

export function archive({ count = 300, people = 80, places = 12, threads = 6, threadIds = null, seed = 11 } = {}) {
  const random = seeded(seed);
  const key = (date) => +date.slice(0, 4) * 12 + (date.length === 7 ? +date.slice(5, 7) - 1 : 5.5);
  const ids = (prefix, n) => Array.from({ length: n }, (_, k) => `${prefix}${k}`);
  const facets = { threads: threadIds ?? ids("t", threads), people: ids("p", people), places: ids("l", places) };
  const dates = Array.from({ length: count }, () => {
    const year = 1980 + Math.floor(Math.pow(random(), 0.55) * 46.9);
    const month = 1 + Math.floor(random() * 12);
    return random() < 0.3 ? `${year}` : `${year}-${String(month).padStart(2, "0")}`;
  }).sort((a, b) => key(a) - key(b));
  const entries = dates.map((date, i) => {
    const pick = (list, n) => Array.from({ length: n }, () => list[Math.floor(Math.pow(random(), 1.6) * list.length)]).filter((id, k, all) => all.indexOf(id) === k);
    return {
      id: `m${i}`,
      date,
      kind: "personal",
      weight: random() < 0.12 ? 3 : random() < 0.4 ? 2 : 1,
      period: ageIdOf(ages, ageAt(birth, date)),
      threads: pick(facets.threads, 1 + Math.floor(random() * 2)),
      people: pick(facets.people, Math.floor(random() * 4)),
      places: pick(facets.places, 1),
      links: [],
    };
  });
  return { entries, facets, periods: ages.map((age) => age.id).filter((id) => entries.some((entry) => entry.period === id)) };
}
