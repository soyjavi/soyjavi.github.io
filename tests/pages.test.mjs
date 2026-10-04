import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import vm from "node:vm";
import { loadContent, root } from "../src/content.mjs";
import { FACETS } from "../assets/js/life.js";
import { CSP } from "../src/layout.mjs";
import { rail } from "../src/rail.mjs";
import { renderSite } from "../src/site.mjs";

const content = loadContent();
const files = renderSite(content);
const pages = [...files.keys()].filter((file) => file.endsWith(".html"));
const homes = { en: "index.html", es: "es/index.html" };
const read = (file) => readFileSync(`${root}${file}`, "utf8");
const attrs = (html, name) => [...html.matchAll(new RegExp(`\\s${name}="([^"]*)"`, "g"))].map((m) => m[1]);
const ids = (html) => attrs(html, "id");
const isLocal = (ref) => ref.startsWith("/") && !ref.startsWith("//");
const target = (ref) => {
  const clean = ref.split(/[?#]/)[0];
  return clean.endsWith("/") ? `${clean.slice(1)}index.html` : clean.slice(1);
};
const loaded = (html) => [
  ...attrs(html, "src"),
  ...[...html.matchAll(/<link\b[^>]*>/g)].map((m) => m[0]).filter((tag) => !/rel="(canonical|alternate)"/.test(tag)).flatMap((tag) => attrs(tag, "href")),
  ...[...html.matchAll(/url\(["']?([^"')]+)/g)].map((m) => m[1]),
];

test("every page is generated, in both languages", () => {
  for (const file of [...Object.values(homes), "404.html"]) assert.ok(pages.includes(file), file);
  assert.ok(files.has("sitemap.xml") && files.has("robots.txt"));
});

for (const page of pages) {
  const html = read(page);

  test(`${page} carries the strict CSP and no inline script or handler`, () => {
    assert.ok(html.includes(`content="${CSP}"`));
    assert.doesNotMatch(CSP, /script-src[^;]*unsafe/);
    const scripts = [...html.matchAll(/<script\b([^>]*)>/g)].map((m) => m[1]);
    for (const attributes of scripts) assert.ok(/\ssrc="/.test(` ${attributes}`) || /application\/ld\+json/.test(attributes), `inline script: ${attributes}`);
    assert.doesNotMatch(html, /\son[a-z]+="/);
  });

  test(`${page} only references files that exist`, () => {
    for (const ref of [...attrs(html, "src"), ...attrs(html, "href")].filter(isLocal)) assert.ok(existsSync(`${root}${target(ref)}`), `${ref} is missing`);
  });

  test(`${page} loads nothing from third parties`, () => {
    assert.deepEqual(loaded(html).filter((ref) => /^(https?:)?\/\//.test(ref)), []);
  });

  test(`${page} declares its language and one h1`, () => {
    const lang = page.startsWith("es/") ? "es" : page === "404.html" ? "en" : "en";
    assert.match(html, new RegExp(`<html lang="${lang}">`));
    assert.equal((html.match(/<h1[\s>]/g) ?? []).length, page === "404.html" ? 2 : 1);
    assert.equal(new Set(ids(html)).size, ids(html).length, "duplicate ids");
    assert.ok(ids(html).includes("main"), "skip link target");
  });

  test(`${page} links only to anchors that exist`, () => {
    const known = new Set(ids(html));
    const own = attrs(html, "href").filter((ref) => ref.startsWith("#"));
    for (const ref of own) assert.ok(known.has(ref.slice(1)), `${ref} has no target`);
  });
}

test("hreflang alternates point at pages that point back", () => {
  const alternates = (html) => [...html.matchAll(/<link rel="alternate" hreflang="(\w[\w-]*)" href="https:\/\/www\.soyjavi\.com([^"]*)"/g)].map((m) => [m[1], m[2]]);
  const fileOf = (path) => (path.endsWith("/") ? `${path.slice(1)}index.html` : path.slice(1));
  for (const page of pages.filter((file) => file !== "404.html")) {
    const own = `/${page.replace(/index\.html$/, "")}`;
    for (const [code, path] of alternates(read(page)).filter(([code]) => code !== "x-default")) {
      assert.ok(files.has(fileOf(path)), `${page} → ${path} does not exist`);
      assert.ok(alternates(read(fileOf(path))).some(([, back]) => back === own), `${path} (${code}) does not link back to ${own}`);
    }
  }
});

test("home pages have the same stations, panels and anchors in both languages", () => {
  const outline = (html) => ({
    stations: [...html.matchAll(/data-station="(\w+)"/g)].map((m) => m[1]),
    panels: [...html.matchAll(/data-panel="([\w-]+)"/g)].map((m) => m[1]),
    ids: ids(html),
    go: attrs(html, "data-go"),
  });
  assert.deepEqual(outline(read(homes.es)), outline(read(homes.en)));
});

test("the engine knows every kind of station the home page declares", () => {
  const engine = readFileSync(new URL("../assets/js/engine.js", import.meta.url), "utf8");
  const kinds = new Set([...read(homes.en).matchAll(/data-station="(\w+)"/g)].map((m) => m[1]));
  assert.deepEqual([...kinds].sort(), ["book", "clone", "contact", "hero", "milestone"]);
  for (const kind of kinds) assert.ok(engine.includes(`"${kind}"`), `${kind} has no framing in the engine`);
});

test("every station and panel is reachable and named for the HUD", () => {
  for (const home of Object.values(homes)) {
    const html = read(home);
    const known = new Set(ids(html));
    for (const target of attrs(html, "data-go")) assert.ok(known.has(target), `${home}: data-go="${target}"`);
    for (const tag of html.match(/<[^>]*data-station="[^"]+"[^>]*>/g)) {
      assert.match(tag, /data-hud="[^"]+"/, tag);
      assert.match(tag, /\sid="[\w-]+"/, tag);
    }
  }
});

test("every milestone is a station with its date, weight and kind, in both languages and in order", () => {
  for (const lang of ["en", "es"]) {
    const html = read(homes[lang]);
    const stations = [...html.matchAll(/<li id="m-([\w-]+)" data-station="milestone" data-panel="m-[\w-]+" data-milestone="[\w-]+" data-date="([\d-]+)" data-weight="(\d)" data-kind="(\w+)"/g)].map((m) => ({ id: m[1], date: m[2], weight: +m[3], kind: m[4] }));
    assert.deepEqual(stations, content.life.milestones.map(({ id, date, weight, kind }) => ({ id, date, weight, kind })), lang);
  }
});

test("every milestone carries its threads and links in the document, with the names in the page's language", () => {
  for (const lang of ["en", "es"]) {
    const html = read(homes[lang]);
    const names = content.dict[lang];
    for (const entry of content.life.milestones) {
      const block = html.match(new RegExp(`<li id="m-${entry.id}"[\\s\\S]*?</li>\\s*(?=<li id="m-|</ol>)`))[0];
      assert.match(block, new RegExp(`data-threads="${entry.threads.join(",")}"`), `${lang}/${entry.id}`);
      if (entry.links) assert.match(block, new RegExp(`data-links="${entry.links.join(",")}"`), `${lang}/${entry.id}`);
      else assert.doesNotMatch(block, /data-links/, `${lang}/${entry.id}`);
      const shown = [...block.matchAll(/<ul class="facets" data-facet="threads"[^>]*>(.*?)<\/ul>/g)][0][1];
      assert.deepEqual([...shown.matchAll(/<li data-item="([\w-]+)">([^<]+)<\/li>/g)].map((m) => [m[1], m[2]]), entry.threads.map((id) => [id, names.threads[id]]), `${lang}/${entry.id}`);
    }
  }
});

test("the controls find, surprise and fold the threads to filter by behind one button, and hand the engine its data", () => {
  for (const lang of ["en", "es"]) {
    const html = read(homes[lang]);
    const tools = html.match(/<div class="explore"[\s\S]*?<\/header>/)[0];
    assert.match(html, /<header class="masthead">[\s\S]*<div class="controls">\s*<div class="explore"[\s\S]*<div class="tools">[\s\S]*<\/header>/, "the controls share the top line with the theme and the language");
    const present = FACETS.filter((facet) => content.life[facet]?.length);
    assert.doesNotMatch(tools, /data-lens=/, "there is one view and no button to choose it");
    assert.match(tools, new RegExp(`<button type="button" class="tool" data-legend-toggle aria-expanded="false">${content.dict[lang].ui.explore.filters}</button>`));
    assert.equal((tools.match(/<ul class="legend"/g) ?? []).length, 1, "only the threads have a legend; people and places are found by name");
    assert.deepEqual(JSON.parse(tools.match(/data-periods="([^"]*)"/)[1].replaceAll("&quot;", '"')), content.life.periods);
    for (const entry of content.life.milestones) assert.match(html, new RegExp(`id="m-${entry.id}"[^>]*data-period="${entry.period}"`), `${lang}: ${entry.id} carries its period`);
    assert.deepEqual(JSON.parse(tools.match(/data-facets="([^"]*)"/)[1].replaceAll("&quot;", '"')), Object.fromEntries(present.map((facet) => [facet, content.life[facet]])));
    assert.deepEqual(JSON.parse(tools.match(/data-ahead="([^"]*)"/)[1].replaceAll("&quot;", '"')), content.life.ahead);
    const legend = tools.match(/<ul class="legend" data-facet="threads"[^>]*hidden>(.*?)<\/ul>/)[1];
    assert.deepEqual([...legend.matchAll(/data-item="([\w-]+)">([^<]+)</g)].map((m) => [m[1], m[2]]), content.life.threads.map((id) => [id, content.dict[lang].threads[id]]), lang);
    for (const [key, text] of [["book", content.dict[lang].ui.nav.book], ["clone", content.dict[lang].ui.nav.clone], ["overview", content.dict[lang].ui.rail.overview]]) assert.match(tools, new RegExp(`data-${key}="${text}"`), `${lang}: ${key}`);
    assert.doesNotMatch(tools, /data-start=/, "the hero has one way in, not two");
    assert.match(tools, /<form class="finder" id="finder" role="search" hidden>/);
    assert.match(tools, /data-find aria-expanded="false" aria-controls="finder"/);
    assert.match(tools, /data-surprise/);
    const copy = content.dict[lang].ui;
    const bar = tools.match(/<div class="bar">([\s\S]*?)<section class="guide"/)[1];
    const order = [...bar.matchAll(/data-(find|guide-toggle|surprise|more-toggle|legend-toggle|sound|unfilter|theme-toggle)|class="lang"/g)].map((m) => m[1] ?? "lang");
    assert.deepEqual(order, ["find", "surprise", "more-toggle", "legend-toggle", "sound", "guide-toggle", "unfilter", "theme-toggle", "lang"], `${lang}: Find and Surprise me on the bar, the rest in the sheet, the guide beside the theme`);
    const sheet = bar.match(/<div class="sheet" id="sheet">([\s\S]*)<\/div>\s*$/)[1];
    for (const key of ["data-legend-toggle", "data-sound", "data-guide-toggle", "data-unfilter", 'class="tools"', "data-theme-toggle", 'class="lang"']) assert.ok(sheet.includes(key), `${lang}: the sheet holds ${key}`);
    for (const key of ["data-find", "data-surprise", "data-more-toggle"]) assert.ok(!sheet.includes(key), `${lang}: ${key} stays on the bar`);
    assert.match(bar, new RegExp(`data-guide-toggle aria-expanded="false" aria-controls="guide" aria-label="${copy.guide.button}"`));
    assert.match(bar, new RegExp(`data-more-toggle aria-expanded="false" aria-controls="sheet" aria-label="${copy.explore.menu}"`));
    assert.match(bar, new RegExp(`<button type="button" class="tool icon" data-sound aria-pressed="false" aria-label="${copy.explore.sound}" title="${copy.explore.sound}" hidden><svg`), "sound is an icon, off and hidden until a script can make it");
    const guide = tools.match(/<section class="guide" id="guide"[^>]*hidden>([\s\S]*?)<\/section>/)[1];
    assert.deepEqual([...guide.matchAll(/<i class="(g-[a-z]+)"[^>]*><\/i><span>([^<]+)<\/span>/g)].map((m) => [m[1], m[2]]), [["g-cloud", copy.guide.cloud], ["g-galaxy", copy.guide.galaxy], ["g-line", copy.guide.line], ["g-ring", copy.guide.ring], ["g-today", copy.guide.today], ["g-dust", copy.guide.dust]].map(([glyph, text]) => [glyph, text.replaceAll("&", "&amp;")]), `${lang}: six marks, each with its words`);
    assert.ok(guide.includes(copy.guide.keys.replaceAll("&", "&amp;")));
    assert.match(tools, new RegExp(`data-focus-note="${copy.focus}"`));
  }
});

test("the theme and the language stay on the flat page, and nothing else of the controls does", () => {
  const css = readFileSync(new URL("../assets/site.css", import.meta.url), "utf8");
  assert.match(css, /html:not\(\.immersive\) \.explore > :not\(\.bar\),\s*html:not\(\.immersive\) \.explore \.bar > :not\(\.sheet\),\s*html:not\(\.immersive\) \.explore \.sheet > :not\(\.tools\) \{\s*display: none;/);
  assert.match(css, /html:not\(\.immersive\) \.explore \{\s*display: contents;/);
});

test("the hero counts what the life holds and invites the visitor to drag, not to scroll", () => {
  const tail = (lang) => FACETS.filter((facet) => content.life[facet]?.length).map((facet) => content.dict[lang].ui.count[facet].replace("{n}", content.life[facet].length));
  const counts = { en: [`${content.life.milestones.length} memories`, ...tail("en")].join(" · "), es: [`${content.life.milestones.length} recuerdos`, ...tail("es")].join(" · ") };
  for (const lang of ["en", "es"]) {
    const html = read(homes[lang]);
    assert.match(html, new RegExp(`<p class="stats kicker">${counts[lang]}</p>`), lang);
    assert.match(html, new RegExp(`<p class="cue kicker">${content.dict[lang].ui.hint}</p>`), lang);
    assert.doesNotMatch(html, /class="track"/);
  }
});

test("each period starts with its title and introduction and only there", () => {
  for (const lang of ["en", "es"]) {
    const html = read(homes[lang]);
    for (const id of content.life.periods) {
      const section = html.match(new RegExp(`<section class="chapter period" id="period-${id}">[\\s\\S]*?</section>`))[0];
      assert.equal((section.match(/class="period-head"/g) ?? []).length, 1, `${lang}/${id}`);
      assert.ok(section.indexOf("period-head") < section.indexOf("<time"), `${lang}/${id}: the head comes first`);
    }
  }
});

test("milestone dates are printed no more precisely than they are stored", () => {
  const html = read(homes.en);
  const byYear = content.life.milestones.find((entry) => /^\d{4}$/.test(entry.date) && !entry.approx);
  assert.match(html, new RegExp(`<time datetime="${byYear.date}">${byYear.date}</time>`));
  assert.match(html, /<time datetime="2001-06">Jun 2001<\/time>/);
  assert.match(html, /<time datetime="1981">~1981<\/time>/);
  assert.doesNotMatch(html, /<time datetime="\d{4}-\d{2}-\d{2}"/);
  assert.match(read(homes.es), /<time datetime="2001-06">jun 2001<\/time>/);
});

test("the timeline rail indexes the whole life the same way in both languages", () => {
  const railOf = (lang) => read(homes[lang]).match(/<nav class="rail"[\s\S]*?<\/nav>/)[0];
  const strip = (html) => html.replace(/(?:aria-label|title)="[^"]*"/g, "");
  for (const lang of ["en", "es"]) {
    const nav = railOf(lang);
    assert.match(nav, /aria-label="(Timeline|Línea de tiempo)"/, lang);
    assert.match(nav, /<a class="rail-home" href="#top" data-go="top" aria-label="([^"]+)" title="\1">/, lang);
    const copy = content.dict[lang].ui.rail;
    assert.ok(nav.includes(`<button class="rail-play" type="button" data-play aria-pressed="false" aria-label="${copy.play}" title="${copy.play}" data-play-label="${copy.play}" data-pause-label="${copy.pause}" data-play-name="${copy.playName}" data-pause-name="${copy.pauseName}">`), `${lang}: the rail can play the life`);
    assert.ok(nav.includes(`<span class="rail-name">${copy.overviewName}</span></a>`), `${lang}: the way back to the whole life carries its name`);
    assert.ok(nav.includes(`<span class="rail-name">${copy.playName}</span></button>`), `${lang}: the play button carries its name`);
    const bars = [...nav.matchAll(/<i style="--x:([\d.]+)%;--h:([\d.]+)"><\/i>/g)];
    assert.equal(bars.length, 47, `${lang}: one bar per year from 1980 to 2026`);
    assert.equal(Math.max(...bars.map((bar) => +bar[2])), 1);
    assert.ok(bars.every((bar, i) => i === 0 || +bar[1] > +bars[i - 1][1]), "bars run left to right");
    const ticks = [...nav.matchAll(/<i data-weight="(\d)" style="--x:([\d.]+)%"><\/i>/g)];
    assert.deepEqual(ticks.map((tick) => +tick[1]), content.life.milestones.map((entry) => entry.weight), `${lang}: one tick per milestone`);
    assert.ok(ticks.every((tick, i) => i === 0 || +tick[2] > +ticks[i - 1][2]), "ticks run left to right");
    assert.equal((nav.match(/class="rail-future"/g) ?? []).length, 2, "the book and the AI");
    const decades = [...nav.matchAll(/<li style="--x:([\d.]+)%"><a href="#(m-[\w-]+)" data-go="m-[\w-]+" aria-label="([^"]+)">(\d{4})<\/a><\/li>/g)];
    assert.deepEqual(decades.map((decade) => decade[4]), ["1980", "1990", "2000", "2010", "2020"]);
    for (const [, , id] of decades) assert.ok(ids(read(homes[lang])).includes(id), `${id} is not a station`);
    assert.match(nav, /<div class="rail-track" aria-hidden="true">/);
    assert.equal((nav.match(/<a /g) ?? []).length, 6, "only the whole-life button and five decades can be focused");
  }
  const sameShape = (html) => strip(html).replace(/data-(?:play|pause)-(?:label|name)="[^"]*"/g, "").replace(/(<span class="rail-name">)[^<]*/g, "$1").replace(/>\d{4}</g, "><");
  assert.equal(sameShape(railOf("en")), sameShape(railOf("es")));
});

test("the rail still builds when a decade has no memory of its own, and every decade link points at a memory", () => {
  const trimmed = { ...content.life, milestones: content.life.milestones.filter((entry) => entry.id !== "tortillas") };
  const targets = [...rail({ life: trimmed, dict: content.dict.en }).matchAll(/data-go="(m-[\w-]+)"/g)].map((m) => m[1]);
  assert.equal(targets.length, 5);
  targets.forEach((id) => assert.ok(trimmed.milestones.some((entry) => `m-${entry.id}` === id), id));
});

test("the theme switch is hidden until a script can work it, and sits with the language switch", () => {
  for (const page of pages) {
    const html = read(page);
    assert.match(html, /<button class="theme" type="button" data-theme-toggle data-to-light="[^"]+" data-to-dark="[^"]+" hidden>/, page);
    assert.ok(html.indexOf("/assets/theme.js") < html.indexOf("/assets/lang.js"), `${page}: theme.js runs first`);
    assert.equal((html.match(/<meta name="theme-color"/g) ?? []).length, 1, `${page}: one theme-color, which the script keeps in step with the theme`);
    assert.match(html, /<meta name="theme-color" content="#0c0c0b" \/>/, page);
  }
});

test("night is the first look whatever the system says, and a chosen theme is kept", () => {
  const code = readFileSync(new URL("../assets/theme.js", import.meta.url), "utf8");
  const run = ({ stored = null, throws = false } = {}) => {
    const root = { attrs: {}, setAttribute(name, value) { this.attrs[name] = value; }, getAttribute(name) { return this.attrs[name] ?? null; } };
    const button = { hidden: true, labels: { "data-to-light": "to light", "data-to-dark": "to dark" }, attrs: {}, getAttribute(name) { return this.labels[name]; }, setAttribute(name, value) { this.attrs[name] = value; } };
    const meta = { content: "#0c0c0b", setAttribute(name, value) { this[name] = value; } };
    const handlers = {};
    const saved = {};
    const events = [];
    const fail = () => { throw new Error("blocked"); };
    const sandbox = {
      localStorage: { getItem: () => (throws ? fail() : stored), setItem: (key, value) => (throws ? fail() : (saved[key] = value)) },
      document: { documentElement: root, addEventListener: (type, fn) => (handlers[type] = fn), querySelectorAll: () => [button], querySelector: () => meta },
      dispatchEvent: (event) => events.push(event.type),
      Event: class { constructor(type) { this.type = type; } },
    };
    vm.runInNewContext(code, sandbox);
    const click = () => handlers.click({ target: { closest: () => button } });
    return { root, button, meta, saved, events, ready: () => handlers.DOMContentLoaded(), click };
  };

  const first = run();
  assert.equal(first.root.getAttribute("data-theme"), "dark", "the first visit is night, before first paint, with no matchMedia to ask");
  assert.equal(first.meta.content, "#0c0c0b");
  first.ready();
  assert.equal(first.button.hidden, false);
  assert.equal(first.button.attrs["aria-label"], "to light");
  assert.deepEqual(first.events, ["themechange"]);

  first.click();
  assert.equal(first.root.getAttribute("data-theme"), "light");
  assert.equal(first.saved.theme, "light");
  assert.equal(first.meta.content, "#f3f1ec", "the browser chrome follows the theme");
  assert.equal(first.button.attrs["aria-label"], "to dark");
  first.click();
  assert.equal(first.root.getAttribute("data-theme"), "dark");
  assert.equal(first.saved.theme, "dark");
  assert.equal(first.meta.content, "#0c0c0b");

  const paper = run({ stored: "light" });
  assert.equal(paper.root.getAttribute("data-theme"), "light", "a stored choice is applied before first paint");
  assert.equal(paper.meta.content, "#f3f1ec");
  paper.ready();
  assert.equal(paper.button.attrs["aria-label"], "to dark");

  assert.equal(run({ stored: "purple" }).root.getAttribute("data-theme"), "dark", "an unknown value is ignored");
  const blocked = run({ throws: true });
  blocked.ready();
  blocked.click();
  assert.equal(blocked.root.getAttribute("data-theme"), "light", "blocked storage still switches");
});

test("the page language is chosen by the browser on the root page only", () => {
  const code = readFileSync(new URL("../assets/lang.js", import.meta.url), "utf8");
  const run = ({ path = "/", languages = ["en-US"], stored = null, throws = false, search = "", hash = "", navigation = "navigate" } = {}) => {
    const calls = [];
    const clicks = [];
    const saved = {};
    const sandbox = {
      location: { pathname: path, search, hash, replace: (url) => calls.push(url) },
      navigator: { languages },
      localStorage: {
        getItem: () => (throws ? (() => { throw new Error("blocked"); })() : stored),
        setItem: (key, value) => (throws ? (() => { throw new Error("blocked"); })() : (saved[key] = value)),
      },
      document: { addEventListener: (type, handler) => type === "click" && clicks.push(handler) },
      performance: { getEntriesByType: () => [{ type: navigation }] },
    };
    vm.runInNewContext(code, sandbox);
    return { calls, saved, click: (code) => clicks[0]({ target: { closest: () => ({ getAttribute: () => code }) } }) };
  };
  assert.deepEqual(run({ languages: ["es-ES", "en"] }).calls, ["/es/"]);
  assert.deepEqual(run({ languages: ["es"] }).calls, ["/es/"]);
  assert.deepEqual(run({ languages: ["es-MX"], hash: "#book", search: "?a=1" }).calls, ["/es/?a=1#book"]);
  assert.deepEqual(run({ languages: ["en-US", "es"] }).calls, [], "the primary language decides");
  assert.deepEqual(run({ languages: ["fr-FR"] }).calls, []);
  assert.deepEqual(run({ languages: [] }).calls, []);
  assert.deepEqual(run({ languages: ["es-ES"], stored: "en" }).calls, [], "a stored choice beats the browser");
  assert.deepEqual(run({ languages: ["en-US"], stored: "es" }).calls, ["/es/"]);
  assert.deepEqual(run({ path: "/es/", languages: ["en-US"] }).calls, [], "a direct link is respected");
  assert.deepEqual(run({ path: "/404.html", languages: ["es-ES"] }).calls, []);
  assert.deepEqual(run({ languages: ["es-ES"], throws: true }).calls, ["/es/"], "blocked storage falls back to the browser");
  assert.deepEqual(run({ languages: ["es-ES"], navigation: "back_forward" }).calls, [], "the back button is not trapped");
  assert.deepEqual(run({ languages: ["es-ES"], navigation: "reload" }).calls, ["/es/"]);
  const stored = run({ path: "/es/" });
  stored.click("en");
  assert.equal(stored.saved.lang, "en");
});

test("without a Buttondown account both waitlists say they open soon and nothing offers an email", () => {
  const without = renderSite({ ...content, site: { ...content.site, buttondown: { username: null, tags: { book: "book", clone: "clone" } } } });
  for (const lang of ["en", "es"]) {
    const html = without.get(homes[lang]);
    assert.doesNotMatch(html, /<form class="waitlist"/);
    assert.doesNotMatch(html, /href="mailto:[^"]*subject=/);
    for (const list of ["hero", "book", "clone"]) assert.match(html, new RegExp(`<div class="waitlist" id="waitlist-${list}" data-list="${list}" role="group" aria-label="[^"]+">\\s*<p class="note">[^<]+</p>`));
  }
});

test("with a Buttondown account each list is its own accessible form posting only there, tagged apart", () => {
  const withAccount = { ...content, site: { ...content.site, buttondown: { username: "javi", tags: { book: "book", clone: "clone" } } } };
  for (const lang of ["en", "es"]) {
    const html = renderSite(withAccount).get(homes[lang]);
    const forms = html.match(/<form class="waitlist"[\s\S]*?<\/form>/g);
    assert.equal(forms.length, 3);
    assert.doesNotMatch(html, /<iframe/);
    for (const [i, [list, tag]] of [["hero", "book"], ["book", "book"], ["clone", "clone"]].entries()) {
      const form = forms[i];
      assert.match(form, new RegExp(`id="waitlist-${list}" data-list="${list}" method="post"`));
      assert.match(form, /target="_blank"/);
      assert.match(form, /aria-label="[^"]+"/);
      assert.match(form, /name="embed" value="1"/);
      assert.match(form, /action="https:\/\/buttondown\.com\/api\/emails\/embed-subscribe\/javi"/);
      assert.match(form, new RegExp(`<label for="waitlist-${list}-email">`));
      assert.match(form, new RegExp(`id="waitlist-${list}-email" name="email" type="email" required autocomplete="email"`));
      assert.match(form, new RegExp(`name="tag" value="${tag}"`));
      assert.match(form, /role="status" aria-live="polite"/);
      assert.equal((form.match(/<input/g) ?? []).length, 3);
    }
    assert.equal(forms[0].match(/name="tag" value="(\w+)"/)[1], forms[1].match(/name="tag" value="(\w+)"/)[1], "the hero joins the book's list");
    assert.notEqual(forms[1].match(/name="tag" value="(\w+)"/)[1], forms[2].match(/name="tag" value="(\w+)"/)[1]);
    const hero = html.match(/<section class="chapter hero"[\s\S]*?<\/section>/)[0];
    assert.ok(hero.includes('id="waitlist-hero"') && hero.includes('data-go="clone"') && !hero.includes('class="button primary" href'), "the hero card holds the form and a link to the AI's card");
  }
});

test("questions for the AI render in the AI's panel with their memories linked, and without questions nothing is drawn", () => {
  const withAsks = {
    ...content,
    life: { ...content.life, questions: [{ id: "q1", memories: ["born", "github"] }, { id: "q2", memories: ["github"] }, { id: "q3", memories: ["born"] }] },
    dict: Object.fromEntries(["en", "es"].map((lang) => [lang, { ...content.dict[lang], asks: { q1: `one ${lang}`, q2: `two ${lang}`, q3: `three ${lang}` } }])),
  };
  const out = renderSite(withAsks);
  for (const lang of ["en", "es"]) {
    const clone = out.get(homes[lang]).match(/<section class="chapter" id="clone"[\s\S]*?<\/section>/)[0];
    assert.equal((clone.match(/<li data-ask=/g) ?? []).length, 3);
    assert.ok(clone.includes('<li data-ask="q1" data-memories="born,github"><p class="ask-q">one ' + lang + "</p>"));
    assert.match(clone, /<a href="#m-github" data-go="m-github">[^<]+<\/a>/, "each memory is linked, so the flat page reaches it");
    assert.match(clone, /<div class="ask" role="group" aria-label="[^"]+">/);
    assert.ok(clone.indexOf('class="ask"') < clone.indexOf("waitlist-clone"), "the questions come before the form");
    assert.doesNotMatch(files.get(homes[lang]), /class="ask"|data-ask/);
  }
});

test("a book date shows in both languages as a month with its countdown hooks, and without a date nothing is drawn", () => {
  const dated = renderSite({ ...content, site: { ...content.site, book: { ...content.site.book, date: "2027-06" } } });
  const expected = { en: ["Expected", "Jun 2027"], es: ["Previsto", "jun 2027"] };
  for (const lang of ["en", "es"]) {
    const html = dated.get(homes[lang]);
    const book = html.match(/<section class="chapter" id="book"[\s\S]*?<\/section>/)[0];
    assert.match(book, /<p class="countdown" data-until="2027-06"><span>[^<]+<\/span> <time datetime="2027-06">[^<]+<\/time><span class="remaining"><\/span><span class="scale" aria-hidden="true"><\/span><\/p>/);
    assert.ok(book.includes(`<span>${expected[lang][0]}</span>`) && book.includes(expected[lang][1]), `${lang}: ${expected[lang].join(" ")}`);
    assert.match(html, /<div class="stage" data-today="[^"]+" data-until="2027-06">/);
    const plain = files.get(homes[lang]);
    assert.doesNotMatch(plain, /class="countdown"|data-until/);
  }
});

test("the contact section offers the email and X, and no portfolio links", () => {
  for (const lang of ["en", "es"]) {
    const contact = files.get(homes[lang]).match(/<section class="chapter contact"[\s\S]*?<\/section>/)[0];
    assert.match(contact, /href="mailto:hello@soyjavi\.com"/);
    assert.deepEqual([...contact.matchAll(/<a [^>]*href="(https?:[^"]+)"/g)].map((m) => m[1]), ["https://twitter.com/soyjavi"]);
    assert.doesNotMatch(files.get(homes[lang]), /github\.com|mirai\.com|satoshi-ltd\.com/);
  }
});

test("the CSP is exactly this policy, so it cannot be widened by accident", () => {
  const policy = Object.fromEntries(CSP.split("; ").map((directive) => [directive.split(" ")[0], directive.split(" ").slice(1)]));
  assert.deepEqual(policy, {
    "default-src": ["'self'"],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:"],
    "script-src": ["'self'"],
    "form-action": ["'self'", "https://buttondown.com"],
    "base-uri": ["'self'"],
  });
});

test("the sitemap lists every page with its language alternates", () => {
  const sitemap = files.get("sitemap.xml");
  for (const page of pages.filter((file) => file !== "404.html")) assert.ok(sitemap.includes(`<loc>https://www.soyjavi.com/${page.replace(/index\.html$/, "")}</loc>`), page);
  assert.doesNotMatch(sitemap, /404/);
  assert.match(files.get("robots.txt"), /Sitemap: https:\/\/www\.soyjavi\.com\/sitemap\.xml/);
});

test("the 404 page is noindexed and offers both languages", () => {
  const html = files.get("404.html");
  assert.match(html, /<meta name="robots" content="noindex"/);
  assert.match(html, /<section lang="en">/);
  assert.match(html, /<section lang="es">/);
});

test("the domain file still points GitHub Pages at www.soyjavi.com", () => {
  assert.equal(readFileSync(new URL("../CNAME", import.meta.url), "utf8").trim(), "www.soyjavi.com");
  assert.equal(content.site.url, "https://www.soyjavi.com");
});

test("the old single-page resume assets are gone", () => {
  for (const file of ["assets/style.css", "assets/print.css", "assets/logo.svg", "assets/logo.jpg"]) assert.ok(!existsSync(`${root}${file}`), file);
  assert.ok(existsSync(`${root}assets/avatar.jpg`));
  assert.match(read("index.html"), /"image":"https:\/\/www\.soyjavi\.com\/assets\/avatar\.jpg"/);
});
