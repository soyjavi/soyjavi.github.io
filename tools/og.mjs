import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import * as fontkit from "fontkit";
import { Resvg } from "@resvg/resvg-js";
import { LANGS, loadContent, root } from "../src/content.mjs";
import { sharePath } from "../src/html.mjs";
import { figure } from "./skyfigure.mjs";
import { outline } from "./wordmark.mjs";

const NIGHT = "#0c0c0b";
const BONE = "#ecebe7";
const MUTED = "#8b8a85";

export const SHARE = { width: 1200, height: 630, left: 84, mark: 58, markTop: 86, title: 104, smallest: 64, room: 520, first: 330, lead: 1.04, label: 21, track: 0.14, foot: 548, sky: [589, 12, 1.02] };

const FONTS = { serif: "instrument-serif", italic: "instrument-serif-italic", mono: "geist-mono" };
const fonts = Object.fromEntries(Object.entries(FONTS).map(([name, file]) => [name, fontkit.openSync(`${root}assets/fonts/${file}.woff2`)]));

const trim = (value) => String(Number(value.toFixed(1)));

const laid = (font, text) => {
  const run = font.layout(text);
  const missing = run.glyphs.findIndex((glyph) => glyph.id === 0);
  if (missing >= 0) throw new Error(`the share image cannot draw "${[...text][missing] ?? text}": the font has no such character`);
  return run;
};

const advance = (font, text, size, track = 0) => laid(font, text).positions.reduce((sum, position) => sum + (position.xAdvance * size) / font.unitsPerEm + track * size, 0);

const glyphs = (font, text, size, x, y, track = 0) => {
  const run = laid(font, text);
  const scale = size / font.unitsPerEm;
  let cursor = x;
  let path = "";
  run.glyphs.forEach((glyph, index) => {
    for (const { command, args } of glyph.path.commands) {
      if (command === "closePath") {
        path += "Z";
        continue;
      }
      const points = [];
      for (let k = 0; k < args.length; k += 2) points.push(trim(cursor + args[k] * scale), trim(y - args[k + 1] * scale));
      path += { moveTo: "M", lineTo: "L", quadraticCurveTo: "Q", bezierCurveTo: "C" }[command] + points.join(" ");
    }
    cursor += run.positions[index].xAdvance * scale + track * size;
  });
  return path;
};

export function titleOf(dict) {
  const parts = dict.hero.title.match(/^([^<&]*)(?:<em>([^<&]*)<\/em>)?$/);
  if (!parts) throw new Error(`the hero's title in "${dict.lang}" must be plain text with at most one <em> at its end for the share image`);
  return [parts[1].trim(), (parts[2] ?? "").trim()];
}

export function footOf(content, lang) {
  const years = content.dict[lang].hero.kicker.split("·").at(-1).trim();
  const line = `${years}  ·  ${new URL(content.site.url).hostname.replace(/^www\./, "")}`.toUpperCase();
  if (advance(fonts.mono, line, SHARE.label, SHARE.track) > SHARE.room) throw new Error(`the hero's kicker in "${lang}" is too long for the share image`);
  return line;
}

export const skyLeft = (content) => SHARE.sky[0] + SHARE.sky[2] * Math.min(...[...figure(content).matchAll(/points="([^"]+)"/g)].flatMap((match) => match[1].split(" ").map((point) => Number(point.split(",")[0]))));

export const titleRight = (dict) => {
  const [roman, italic] = titleOf(dict);
  const size = titleSize(dict);
  return SHARE.left + Math.max(advance(fonts.serif, roman, size), advance(fonts.italic, italic, size));
};

export function titleSize(dict) {
  const [roman, italic] = titleOf(dict);
  const widest = Math.max(advance(fonts.serif, roman, SHARE.title), advance(fonts.italic, italic, SHARE.title));
  const size = Math.min(SHARE.title, (SHARE.title * SHARE.room) / widest);
  if (size < SHARE.smallest) throw new Error(`the hero's title in "${dict.lang}" is too long for the share image: it would be ${Math.round(size)} px tall`);
  return size;
}

export function compose(content, lang) {
  const dict = content.dict[lang];
  const [roman, italic] = titleOf(dict);
  const size = titleSize(dict);
  const mark = outline("javi");
  const markScale = SHARE.mark / (mark.box.maxY - mark.box.minY);
  const sky = figure(content).match(/<svg[^>]*>([\s\S]*)<\/svg>/)[1];
  const [skyX, skyY, skyScale] = SHARE.sky;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SHARE.width} ${SHARE.height}" color="${BONE}"><rect width="${SHARE.width}" height="${SHARE.height}" fill="${NIGHT}"/><g transform="translate(${skyX} ${skyY}) scale(${skyScale})">${sky}</g><path transform="translate(${trim(SHARE.left - mark.box.minX * markScale)} ${trim(SHARE.markTop - mark.box.minY * markScale)}) scale(${markScale.toFixed(4)})" d="${mark.path}" fill="${BONE}"/><path d="${glyphs(fonts.serif, roman, size, SHARE.left, SHARE.first)}" fill="${BONE}"/>${italic ? `<path d="${glyphs(fonts.italic, italic, size, SHARE.left, SHARE.first + size * SHARE.lead)}" fill="${BONE}"/>` : ""}<path d="${glyphs(fonts.mono, footOf(content, lang), SHARE.label, SHARE.left, SHARE.foot, SHARE.track)}" fill="${MUTED}"/></svg>`;
}

export const render = (svg) => new Resvg(svg, { fitTo: { mode: "width", value: SHARE.width }, font: { loadSystemFonts: false } }).render().asPng();

export const files = (content = loadContent()) => Object.fromEntries(LANGS.map((lang) => [sharePath(lang).slice(1), render(compose(content, lang))]));

if (process.argv[1] === fileURLToPath(import.meta.url)) for (const [file, data] of Object.entries(files())) writeFileSync(`${root}${file}`, data);
