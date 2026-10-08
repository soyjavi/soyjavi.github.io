import { FACETS } from "../assets/js/life.js";
import { esc, fill } from "./html.mjs";

export const facetsOf = (life) => Object.fromEntries(FACETS.map((facet) => [facet, life[facet] ?? []]));


export const STATS = ["memories", "people", "places"];

export const stats = (life, dict) =>
  STATS.map((key) => {
    const drawn = key === "memories" ? life.milestones.length : (life[key]?.length ?? 0);
    const held = life.totals?.[key] ?? 0;
    return [key, Math.max(held, drawn), key === "memories" && held > drawn && dict.ui.count.over];
  })
    .filter(([, n]) => n > 0)
    .map(([key, n, over]) => fill(over || dict.ui.count[key], { n }))
    .join(" · ");

export function explore({ life, dict, tools = "" }) {
  const guide = dict.ui.guide;
  const copy = dict.ui.explore;
  const facets = facetsOf(life);
  const present = FACETS.filter((facet) => facets[facet].length);
  const legends = ["threads"]
    .filter((facet) => facets[facet].length)
    .map((facet) => `<ul class="legend" data-facet="${facet}" aria-label="${esc(copy[facet])}" hidden>${facets[facet].map((id) => `<li><button type="button" aria-pressed="false" data-item="${id}">${esc(dict[facet][id])}</button></li>`).join("")}</ul>`);
  const data = { facets: Object.fromEntries(present.map((facet) => [facet, facets[facet]])), ahead: life.ahead, periods: life.periods };
  const attributes = [`data-facets="${esc(JSON.stringify(data.facets))}"`, `data-ahead="${esc(JSON.stringify(data.ahead))}"`, `data-periods="${esc(JSON.stringify(data.periods))}"`, ...["related", "earlier", "later", "filter", "unfilter", "more", "lit", "all", "fewer", "nudgebook", "nudgeclone", "nudgeclose", "periodstart", "begin"].map((key) => `data-${key}="${esc(copy[key])}"`), `data-overview="${esc(dict.ui.rail.overview)}"`, ...["memory", "memories", "people", "places"].map((key) => `data-count-${key}="${esc(dict.ui.count[key])}"`), `data-book="${esc(dict.ui.nav.book)}"`, `data-clone="${esc(dict.ui.nav.clone)}"`, `data-book-hint="${esc(dict.book.hint)}"`, `data-continues="${esc(copy.continues)}"`, `data-clone-hint="${esc(dict.clone.hint)}"`].join(" ");
  const marks = [["g-cloud", "cloud"], ["g-galaxy", "galaxy"], ["g-line", "line"], ["g-ring", "ring"], ["g-today", "today"], ["g-dust", "dust"]];
  return `<div class="explore" role="group" aria-label="${esc(copy.label)}" ${attributes} data-focus-note="${esc(dict.ui.focus)}">
      <div class="bar">
        <button type="button" class="tool" data-find aria-expanded="false" aria-controls="finder">${esc(copy.find)}</button>
        <button type="button" class="tool" data-surprise>${esc(copy.surprise)}</button>
        <button type="button" class="tool glyph more" data-more-toggle aria-expanded="false" aria-controls="sheet" aria-label="${esc(copy.menu)}" title="${esc(copy.menu)}">⋯</button>
        <div class="sheet" id="sheet">
          ${legends.length ? `<button type="button" class="tool" data-legend-toggle aria-expanded="false">${esc(copy.filters)}</button>` : ""}
          <button type="button" class="tool icon" data-sound aria-pressed="false" aria-label="${esc(copy.sound)}" title="${esc(copy.sound)}" hidden><svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h3l4-3.5v11L6 12H3z"/><path class="waves" d="M13 7.5a3.5 3.5 0 010 5M15.5 5.5a6.5 6.5 0 010 9"/><path class="slash" d="M3.5 17L17 3.5"/></svg></button>
          <button type="button" class="tool glyph" data-guide-toggle aria-expanded="false" aria-controls="guide" aria-label="${esc(guide.button)}" title="${esc(guide.button)}">?</button>
          <button type="button" class="tool" data-unfilter hidden></button>
          ${tools}
        </div>
      </div>
      <section class="guide" id="guide" aria-label="${esc(guide.title)}" hidden>
        <h2 class="kicker">${esc(guide.title)}</h2>
        <ul>
          ${marks.map(([glyph, key]) => `<li><i class="${glyph}" aria-hidden="true"></i><span>${esc(guide[key])}</span></li>`).join("\n          ")}
        </ul>
        <p class="keys">${esc(guide.keys)}</p>
      </section>
      <form class="finder" id="finder" role="search" hidden>
        <label for="finder-input">${esc(copy.findLabel)}</label>
        <input id="finder-input" type="search" autocomplete="off" spellcheck="false" placeholder="${esc(copy.findPlaceholder)}" />
        <ul class="results"></ul>
        <div class="preview" aria-hidden="true"><time></time><strong></strong><p></p></div>
        <p class="none" role="status" data-none="${esc(copy.findNone)}"></p>
      </form>
      ${legends.join("")}
    </div>`;
}
