import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { aheadPoint, futures, layout, onPath, shapeBy, skyOf, years } from "../assets/js/life.js";
import { loadContent, root } from "../src/content.mjs";

const WORDS = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
const fixed = (value) => value.toFixed(1);

export function figure(content = loadContent(), today = 2026.8) {
  const { life } = content;
  const entries = life.milestones;
  const facets = { threads: life.threads };
  const marks = layout(entries, facets, { periods: life.periods, today });
  const sky = skyOf(entries, years(entries), { periods: life.periods, today });
  const future = futures(sky);
  const spots = [...sky.list.flatMap((galaxy) => [[galaxy.centre[0] - galaxy.radius, galaxy.centre[1] - galaxy.radius], [galaxy.centre[0] + galaxy.radius, galaxy.centre[1] + galaxy.radius]]), future.today, future.book, future.clone, aheadPoint(sky, 0.5)].map((point) => [point[0], point[1]]);
  const [rangeX, rangeY] = [0, 1].map((axis) => [Math.min(...spots.map((point) => point[axis])), Math.max(...spots.map((point) => point[axis]))]);
  const scale = Math.min(520 / (rangeX[1] - rangeX[0]), 520 / (rangeY[1] - rangeY[0]));
  const at = (point) => [300 + (point[0] - (rangeX[0] + rangeX[1]) / 2) * scale, 300 - (point[1] - (rangeY[0] + rangeY[1]) / 2) * scale];
  const [x, y] = [(point) => fixed(at(point)[0]), (point) => fixed(at(point)[1])];
  const arc = (from, to, steps) => Array.from({ length: steps + 1 }, (_, k) => onPath(sky, from + ((to - from) * k) / steps)).map((point, k) => `${k ? "L" : "M"}${x(point)} ${y(point)}`).join(" ");
  const out = [];
  out.push(`<div class="figure">`);
  out.push(`          <svg viewBox="0 0 600 600" role="img" aria-label="${WORDS[sky.list.length]} galaxies along a path that turns outwards from the top, each with its constellations and soft clouds for memories, and a dashed continuation with today and two hollow rings">`);
  out.push(`            <defs><radialGradient id="cloud"><stop offset="0" stop-color="currentColor" stop-opacity="0.95"/><stop offset="0.55" stop-color="currentColor" stop-opacity="0.35"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs>`);
  sky.list.forEach((galaxy, k) => {
    const outline = Array.from({ length: 48 }, (_, step) => shapeBy(galaxy, Math.sin((Math.PI * 2 * step) / 48) * galaxy.radius, Math.cos((Math.PI * 2 * step) / 48) * galaxy.radius).map((value, axis) => galaxy.centre[axis] + value));
    out.push(`            <polygon data-galaxy="${life.periods[k]}" points="${outline.map((point) => `${x(point)},${y(point)}`).join(" ")}" fill="none" stroke="currentColor" stroke-width="0.8" stroke-dasharray="2 4" opacity="0.5"/>`);
    const next = sky.list[k + 1];
    if (next) out.push(`            <path d="${arc(galaxy.along + galaxy.radius + 1.6, next.along - next.radius - 1.6, 5)}" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5"/>`);
  });
  const final = sky.list.at(-1);
  out.push(`            <path d="${arc(final.along + final.radius + 1.6, sky.length, 36)}" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="3 5" opacity="0.7"/>`);
  const last = new Map();
  const lines = [];
  marks.forEach((mark) => {
    const key = `${mark.period}:${mark.members.threads?.[0] ?? 0}`;
    if (last.has(key)) lines.push(`<line x1="${x(last.get(key))}" y1="${y(last.get(key))}" x2="${x(mark.position)}" y2="${y(mark.position)}" stroke="currentColor" stroke-width="0.6" opacity="0.45"/>`);
    last.set(key, mark.position);
  });
  out.push(`            ${lines.join("")}`);
  out.push(`            ${marks.map((mark) => `<circle cx="${x(mark.position)}" cy="${y(mark.position)}" r="${fixed(Math.max(2.6, mark.spread * scale * 0.9))}" fill="url(#cloud)"/>`).join("")}`);
  out.push(`            <circle cx="${x(future.today)}" cy="${y(future.today)}" r="3" fill="currentColor"/>`);
  for (const ring of [future.book, future.clone]) out.push(`            <circle cx="${x(ring)}" cy="${y(ring)}" r="7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="3 3"/>`);
  out.push(`          </svg>`);
  return out.join("\n");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const path = `${root}design/index.html`;
  const page = readFileSync(path, "utf8");
  writeFileSync(path, page.replace(/<div class="figure">[\s\S]*?<\/svg>/, () => figure()));
}
