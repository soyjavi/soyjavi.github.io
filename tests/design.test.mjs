import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { BUDGET, SKY, SPREAD } from "../assets/js/life.js";
import { loadContent, root } from "../src/content.mjs";
import { CSP } from "../src/layout.mjs";

const read = (file) => readFileSync(`${root}${file}`, "utf8");
const design = read("design/index.html");
const localRefs = (html) => [...html.matchAll(/\s(?:src|href)="([^"#][^"]*)"/g)].map((m) => m[1]).filter((ref) => !/^(?:[a-z]+:|\/\/)/i.test(ref));
const css = read("assets/brand.css");
const home = read("index.html");
const engine = read("assets/js/engine.js");
const { life } = loadContent();

const token = (name) => css.match(new RegExp(`--${name}:\\s*(#[0-9a-f]{6})`, "i"))?.[1].toLowerCase();
const swatches = [...design.matchAll(/<code data-token="([\w-]+)">(#[0-9a-f]{6})<\/code>/gi)].map((m) => [m[1], m[2].toLowerCase()]);
const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
};
const themes = {
  light: { bg: "paper", fg: "ink", soft: "paper-soft", muted: "paper-muted", line: "paper-line" },
  dark: { bg: "night", fg: "bone", soft: "night-soft", muted: "night-muted", line: "night-line" },
};

test("every swatch on the brand page shows the value of its token", () => {
  assert.equal(swatches.length, 12);
  for (const [name, value] of swatches) assert.equal(value, token(name), `--${name}`);
});

test("the colours in the stylesheet are exactly the twelve tokens, all neutral: no hue anywhere", () => {
  const declared = [...css.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => m[1]).sort();
  assert.deepEqual(declared, swatches.map(([name]) => name).sort());
  for (const [, name, value] of [...css.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [0, m[1], m[2]])) {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(value.slice(i, i + 2), 16));
    assert.ok(Math.max(r, g, b) - Math.min(r, g, b) <= 12, `--${name} (${value}) is not a neutral`);
  }
  for (const file of ["assets/brand.css", "assets/site.css", "assets/page.css"]) {
    const literal = read(file).replace(/--[\w-]+:\s*#[0-9a-f]{6}/gi, "");
    assert.doesNotMatch(literal, /#[0-9a-f]{3,8}\b/i, `${file} has a colour that is not a token`);
    assert.doesNotMatch(literal, /\b(?:rgba?|hsla?)\(/i, `${file} has a literal colour function`);
  }
});

test("the contrast table is true, and every text pair clears 4.5 to 1", () => {
  const rows = [...design.matchAll(/<tr data-pair="(\w+) (\w+) bg"><td>[^<]*<\/td><td>([\d.]+)<\/td>/g)];
  assert.equal(rows.length, 8);
  for (const [, theme, key, shown] of rows) {
    const actual = ratio(token(themes[theme][key]), token(themes[theme].bg));
    assert.ok(Math.abs(actual - +shown) < 0.006, `${theme} ${key}: the page says ${shown}, it is ${actual.toFixed(2)}`);
    if (key !== "line") assert.ok(actual >= 4.5, `${theme} ${key} is ${actual.toFixed(2)}`);
  }
  assert.ok(ratio(token("paper-muted"), token("paper-raised")) < 4.5, "muted on a raised paper is below 4.5, as the page warns");
});

test("the stations table lists the kinds of station of the home page in their order", () => {
  const stations = [...home.matchAll(/<[^>]*data-station="(\w+)"[^>]*>/g)].map((m) => m[1]);
  const kinds = stations.filter((kind, i) => kind !== stations[i - 1]);
  const rows = [...design.matchAll(/<tr data-station="(\w+)">/g)].map((m) => m[1]);
  assert.deepEqual(rows, kinds);
  assert.equal(stations.length, life.milestones.length + 4);
});

test("the sky table quotes the numbers the code uses", () => {
  const money = (n) => n.toLocaleString("en-US");
  assert.ok(design.includes(`${SKY.core} units plus ${SKY.reach} per square root of its memories`));
  assert.ok(design.includes(`Half a turn ${SKY.sweep / Math.PI} times over, ${SKY.growth} times as far out at the end, rising ${SKY.rise} units`));
  assert.ok(design.includes(`a ${SKY.gap}-unit gap between galaxies`));
  assert.ok(design.includes(`from ${SKY.inner * 100}% of the radius to the edge`));
  assert.ok(design.includes(`Spread ${SPREAD[1]} · ${SPREAD[2]} · ${SPREAD[3]}`));
  assert.ok(design.includes(`Hollow rings at ${SKY.ahead[0] * 100}% and ${SKY.ahead[1] * 100}% of the ${SKY.future} units of path ahead`));
  assert.ok(design.includes(`${BUDGET.base} per unit of weight, at most ${money(BUDGET.cap)} in the clouds`));
  assert.ok(design.includes(`plus ${money(BUDGET.trail)} of dust in the galaxies`));
  assert.ok(design.includes("6% of it lies ahead"));
  assert.doesNotMatch(design, /data-lens=|spiral of|The spiral/, "time and its spiral are gone");
});

test("the sky figure draws a galaxy for each period, the path ahead and two hollow rings", () => {
  const figure = design.match(/<div class="figure">[\s\S]*?<\/svg>/)[0];
  assert.deepEqual([...figure.matchAll(/data-galaxy="([\w-]+)"/g)].map((m) => m[1]), life.periods);
  assert.equal((figure.match(/stroke-dasharray="3 3"/g) ?? []).length, 2, "two hollow rings");
  assert.equal((figure.match(/stroke-dasharray="3 5"/g) ?? []).length, 1, "one dashed path ahead");
  assert.equal((figure.match(/fill="url\(#cloud\)"/g) ?? []).length, life.milestones.length, "a cloud for every memory");
  assert.match(figure, /<radialGradient id="cloud">/);
});

test("the brand files exist, are outlined in one ink, and the favicon follows the system theme", () => {
  const inks = { "javi-ink.svg": "#151513", "javi-bone.svg": "#ecebe7", "monogram-ink.svg": "#151513", "monogram-bone.svg": "#ecebe7" };
  for (const [file, ink] of Object.entries(inks)) {
    const svg = read(`assets/brand/${file}`);
    assert.doesNotMatch(svg, /<text|font-family/, `${file} has live text`);
    assert.deepEqual([...new Set(svg.match(/#[0-9a-f]{6}/gi))], [ink], `${file} uses another ink`);
    assert.match(svg, /<path d="M/, file);
  }
  const favicon = read("favicon.svg");
  assert.match(favicon, /prefers-color-scheme:light/);
  assert.doesNotMatch(favicon, /<text|font-family/);
  assert.deepEqual([...new Set(favicon.match(/#[0-9a-f]{6}/gi))].sort(), ["#0c0c0b", "#ecebe7"]);
  assert.ok(existsSync(`${root}og-image.png`));
});

test("the brand page follows the same rules as the site", () => {
  assert.ok(design.includes(`content="${CSP}"`), "same CSP");
  assert.match(design, /<meta name="robots" content="noindex"/);
  assert.match(design, /<link rel="stylesheet" href="\.\.\/assets\/brand\.css"/);
  const scripts = [...design.matchAll(/<script\b([^>]*)>/g)].map((m) => m[1]);
  assert.deepEqual(scripts, [' src="../assets/theme.js"'], "only the theme script, from the origin");
  assert.doesNotMatch(design, /\son[a-z]+="/);
  for (const ref of localRefs(design)) assert.ok(existsSync(resolve(root, "design", ref.split(/[?#]/)[0])), `${ref} is missing`);
  const ids = [...design.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const [, anchor] of design.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(anchor), `#${anchor}`);
  assert.doesNotMatch(design, /https?:\/\/(?!buttondown\.com)/);
  assert.match(design, /<button class="theme" type="button" data-theme-toggle/);
});

test("the brand page and the proposals board are not linked from the site", () => {
  for (const page of ["index.html", "es/index.html", "404.html"]) assert.doesNotMatch(read(page), /\/design\//, page);
});

const proposals = read("design/proposals.html");
const roadmap = read("ROADMAP.md");
const articles = [...proposals.matchAll(/<article class="board" data-board="([\w-]+)"[\s\S]*?<\/article>/g)];

test("the proposals page follows the same rules as the site and links back to the brand page", () => {
  assert.match(proposals, /<meta name="robots" content="noindex"/);
  assert.ok(proposals.includes(`content="${CSP}"`), "same CSP");
  assert.deepEqual([...proposals.matchAll(/<script\b([^>]*)>/g)].map((m) => m[1]), [' src="../assets/theme.js"'], "only the theme script");
  assert.doesNotMatch(proposals, /\son[a-z]+="/);
  assert.doesNotMatch(proposals, /https?:\/\/(?!buttondown\.com)/);
  const ids = [...proposals.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const [, anchor] of proposals.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(anchor), `#${anchor}`);
  for (const ref of localRefs(proposals)) assert.ok(existsSync(resolve(root, "design", ref.split(/[?#]/)[0])), `${ref} is missing`);
  const tokens = new Set(swatches.map(([, value]) => value));
  for (const colour of proposals.match(/#[0-9a-f]{6}\b/gi) ?? []) assert.ok(tokens.has(colour.toLowerCase()) || ["#f3f1ec", "#0c0c0b"].includes(colour.toLowerCase()), `${colour} is not a token`);
  const plain = proposals.replace(/<article class="board"[^>]*data-exception="hue"[\s\S]*?<\/article>/g, "").replace(/<defs>[\s\S]*?<\/defs>/, "");
  assert.doesNotMatch(plain, /\b(?:oklch|hsla?|rgba?|color-mix|lab|lch)\(/i, "only a board marked as an exception may draw a hue");
  assert.match(proposals, /<a href="index\.html">Brand<\/a>/);
  assert.match(proposals, /<a href="proposals\.html" aria-current="page">Proposals<\/a>/);
  assert.match(design, /<a href="proposals\.html">Proposals<\/a>/);
  for (const page of [design, proposals]) assert.doesNotMatch(page, /\s(?:src|href)="\/[^"]*"/, "no root-absolute path, so the pages open from a file too");
});

test("every proposal board has the same parts, a unique ID and a task in the ROADMAP", () => {
  const ids = articles.map((m) => m[1]);
  assert.ok(ids.length > 0);
  assert.equal(new Set(ids).size, ids.length, "board IDs are unique");
  assert.equal([...proposals.matchAll(/<article class="board"/g)].length, ids.length, "every board is well formed");
  for (const [board, id] of articles) {
    assert.ok(board.includes(`<code>${id}</code>`), `${id}: the ID`);
    assert.match(board, /<h3 class="h3">/, `${id}: a title`);
    assert.match(board, /<strong>Why\.<\/strong>/, `${id}: why`);
    assert.match(board, /<figcaption>Now<\/figcaption>/, `${id}: the Now drawing`);
    assert.match(board, /<figcaption>Proposed/, `${id}: the Proposed drawing`);
    assert.match(board, /<strong>Accept<\/strong>/, `${id}: what proves it done`);
    assert.ok(roadmap.includes(`**${id}**`), `${id} has no entry in ROADMAP.md`);
  }
  for (const [, anchor] of proposals.matchAll(/<li><a href="#([\w-]+)">/g)) assert.ok(ids.some((id) => id.toLowerCase() === anchor), `the index links to #${anchor}`);
});

test("the interface table lists the controls the home page ships", () => {
  const rows = [...design.matchAll(/<tr data-control="(\w+)">/g)].map((m) => m[1]);
  const hooks = { find: "data-find", surprise: "data-surprise", filter: "data-legend-toggle", sound: "data-sound", guide: "data-guide-toggle", theme: "data-theme-toggle", language: "data-lang", play: "data-play", overview: "rail-home" };
  assert.deepEqual(rows, Object.keys(hooks));
  for (const [control, hook] of Object.entries(hooks)) assert.ok(home.includes(hook), `${control}: the home page has no ${hook}`);
});

test("the site has no blog or writing section and the brand page does not draw one", () => {
  assert.doesNotMatch(home, /data-station="writing"|href="\/blog\/"|rss\+xml/);
  assert.doesNotMatch(design, /data-station="writing"/);
  assert.ok(!existsSync(`${root}blog`) && !existsSync(`${root}es/blog`) && !existsSync(`${root}content/posts`) && !existsSync(`${root}assets/blog.css`));
});

test("the stations named in SPEC and AGENTS exist in the code", () => {
  for (const kind of ["hero", "milestone", "book", "clone", "contact"]) assert.ok(engine.includes(`"${kind}"`), kind);
  const spec = read("SPEC.md");
  assert.match(spec, new RegExp(`${life.milestones.length + 4} stations`));
  assert.match(spec, /120,000/);
  assert.match(spec, /galax/);
  assert.doesNotMatch(spec, /river/i);
});

test("type is a named scale: every size and tracking is a token, nothing structural is below 12 px and no serif is under 16 px", () => {
  const tokens = Object.fromEntries([...css.matchAll(/--((?:fs|track)-[\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
  assert.ok(Object.keys(tokens).length > 15);
  for (const file of ["assets/brand.css", "assets/site.css", "assets/page.css"]) {
    const sheet = read(file);
    for (const [, property, value] of sheet.matchAll(/(?<![-\w])(font-size|letter-spacing):\s*([^;}]+)/g)) {
      const ok = /^var\(--(?:fs|track)-[\w-]+\)$/.test(value.trim()) || (property === "letter-spacing" && ["0", "normal"].includes(value.trim())) || value.trim() === "inherit";
      assert.ok(ok, `${file}: ${property}: ${value} is not a token`);
    }
    for (const [, name] of sheet.matchAll(/var\(--((?:fs|track)-[\w-]+)\)/g)) assert.ok(name in tokens, `${file}: --${name} is not defined`);
  }
  const px = (name) => Number(tokens[name].match(/^(\d+)px$/)[1]);
  for (const name of ["fs-label", "fs-small", "fs-text", "fs-body", "fs-tag", "fs-tag-phone", "fs-title"]) assert.ok(px(name) >= 12, `${name} is at least 12 px`);
  assert.equal(px("fs-label"), 12);
  assert.ok(px("fs-tag") >= 17 && px("fs-tag-phone") >= 16 && px("fs-title") >= 17, "a serif is never drawn under 17 px (16 on a phone)");
});
