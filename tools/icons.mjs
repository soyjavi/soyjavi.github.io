import { writeFileSync } from "node:fs";
import { Resvg } from "@resvg/resvg-js";
import { root } from "../src/content.mjs";
import { outline } from "./wordmark.mjs";

const NIGHT = "#0c0c0b";
const BONE = "#ecebe7";
const SHARE = 0.72;
const STROKE = 6;

const mark = outline("j");
const inkHeight = mark.box.maxY - mark.box.minY;
const scale = (64 * SHARE) / inkHeight;
const move = [32 - ((mark.box.minX + mark.box.maxX) / 2) * scale, 32 - ((mark.box.minY + mark.box.maxY) / 2) * scale].map((value) => value.toFixed(2));
const glyph = (cls) => `<path class="${cls}" transform="translate(${move[0]} ${move[1]}) scale(${scale.toFixed(4)})" d="${mark.path}" stroke-width="${STROKE}" stroke-linejoin="round"/>`;

export const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><style>.b{fill:${NIGHT}}.g{fill:${BONE};stroke:${BONE}}@media (prefers-color-scheme:light){.b{fill:${BONE}}.g{fill:${NIGHT};stroke:${NIGHT}}}</style><rect class="b" width="64" height="64" rx="14"/>${glyph("g")}</svg>\n`;

export const tile = (theme, { round = true } = {}) => {
  const [ground, ink] = theme === "light" ? [BONE, NIGHT] : [NIGHT, BONE];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="${round ? 14 : 0}" fill="${ground}"/><path transform="translate(${move[0]} ${move[1]}) scale(${scale.toFixed(4)})" d="${mark.path}" fill="${ink}" stroke="${ink}" stroke-width="${STROKE}" stroke-linejoin="round"/></svg>`;
};

export const render = (svg, size) => new Resvg(svg, { fitTo: { mode: "width", value: size } }).render();

export const files = () => ({
  "favicon.svg": favicon,
  "favicon-32.png": render(tile("dark"), 32).asPng(),
  "apple-touch-icon.png": render(tile("dark", { round: false }), 180).asPng(),
});

if (import.meta.url === `file://${process.argv[1]}`) for (const [file, data] of Object.entries(files())) writeFileSync(`${root}${file}`, data);
