import { RAIL, densityByYear, railPercent, years } from "../assets/js/life.js";
import { esc, fill } from "./html.mjs";

const DECADES = [1980, 1990, 2000, 2010, 2020];

export function rail({ life, dict }) {
  const copy = dict.ui.rail;
  const placed = years(life.milestones);
  const pct = (year) => railPercent(year).toFixed(2);
  const bars = densityByYear(life.milestones, Math.max(2026, Math.floor(Math.max(...placed))) + 0.99).map(({ year, value }) => `<i style="--x:${pct(year + 0.5)}%;--h:${value.toFixed(2)}"></i>`);
  const ticks = placed.map((year, i) => `<i data-weight="${life.milestones[i].weight}" style="--x:${pct(year)}%"></i>`);
  const decades = DECADES.map((decade) => {
    const first = life.milestones.find((_, i) => placed[i] >= decade && placed[i] < decade + 10) ?? life.milestones.find((_, i) => placed[i] >= decade) ?? life.milestones.at(-1);
    return `<li style="--x:${pct(decade)}%"><a href="#m-${first.id}" data-go="m-${first.id}" aria-label="${esc(fill(copy.decade, { year: decade }))}">${decade}</a></li>`;
  });
  return `<nav class="rail" aria-label="${esc(copy.label)}">
      <a class="rail-home" href="#top" data-go="top" aria-label="${esc(copy.overview)}" title="${esc(copy.overview)}"><i aria-hidden="true"></i><span class="rail-name">${esc(copy.overviewName)}</span></a>
      <button class="rail-play" type="button" data-play aria-pressed="false" aria-label="${esc(copy.play)}" title="${esc(copy.play)}" data-play-label="${esc(copy.play)}" data-pause-label="${esc(copy.pause)}" data-play-name="${esc(copy.playName)}" data-pause-name="${esc(copy.pauseName)}"><i aria-hidden="true"></i><span class="rail-name">${esc(copy.playName)}</span></button>
      <div class="rail-body">
        <div class="rail-track" aria-hidden="true">
          <div class="rail-bars">${bars.join("")}</div>
          <div class="rail-ticks">${ticks.join("")}</div>
          <b class="rail-future" style="--x:${pct(RAIL.book)}%"></b>
          <b class="rail-future" style="--x:${pct(RAIL.clone)}%"></b>
          <span class="rail-today"></span>
          <span class="rail-cursor"></span>
          <p class="rail-tip"></p>
        </div>
        <ol class="rail-years">${decades.join("")}</ol>
      </div>
    </nav>`;
}
