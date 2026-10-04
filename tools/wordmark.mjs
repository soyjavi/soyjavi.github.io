import { readFileSync, writeFileSync } from "node:fs";
import * as fontkit from "fontkit";
import { root } from "../src/content.mjs";

const SCALE = 0.2;
const MARGIN = 12;
const INKS = { ink: "#151513", bone: "#ecebe7", current: "currentColor" };

const trim = (value) => String(Number(value.toFixed(2)));
const number = (value) => value.toFixed(2).replace(/\.00$/, "");
const join = (values) => values.map(number).reduce((text, value) => text + (text === "" || value.startsWith("-") ? "" : " ") + value, "");

export function outline(word = "javi") {
  const font = fontkit.openSync(`${root}assets/fonts/instrument-serif-italic.woff2`);
  const run = font.layout(word);
  let cursor = 0;
  let path = "";
  const box = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
  run.glyphs.forEach((glyph, index) => {
    const at = (x, y) => [(cursor + x) * SCALE, -y * SCALE];
    for (const { command, args } of glyph.path.commands) {
      if (command === "closePath") continue;
      const points = [];
      for (let k = 0; k < args.length; k += 2) points.push(...at(args[k], args[k + 1]));
      path += { moveTo: "M", lineTo: "L", quadraticCurveTo: "Q", bezierCurveTo: "C" }[command] + join(points);
    }
    const { minX, maxX, minY, maxY } = glyph.bbox;
    box.minX = Math.min(box.minX, (cursor + minX) * SCALE);
    box.maxX = Math.max(box.maxX, (cursor + maxX) * SCALE);
    box.minY = Math.min(box.minY, -maxY * SCALE);
    box.maxY = Math.max(box.maxY, -minY * SCALE);
    cursor += run.positions[index].xAdvance;
  });
  return { path, box };
}

export function svg({ path, box }, { ink, label }) {
  const x = box.minX - MARGIN;
  const y = box.minY - MARGIN;
  const [w, h] = [box.maxX - box.minX + 2 * MARGIN, box.maxY - box.minY + 2 * MARGIN];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${[x, y, w, h].map(trim).join(" ")}" role="img" aria-label="${label}"><path d="${path}" fill="${INKS[ink]}"/></svg>\n`;
}

export const files = () => {
  const word = outline("javi");
  const mark = outline("j");
  const out = {};
  for (const ink of ["ink", "bone", "current"]) out[`assets/brand/javi-${ink}.svg`] = svg(word, { ink, label: "javi" });
  for (const ink of ["ink", "bone"]) out[`assets/brand/monogram-${ink}.svg`] = svg(mark, { ink, label: "j" });
  return out;
};

if (import.meta.url === `file://${process.argv[1]}`) for (const [file, text] of Object.entries(files())) writeFileSync(`${root}${file}`, text);
