import { after, afterEach, before, test } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright-core";
import { loadContent } from "../../src/content.mjs";
import { renderSite } from "../../src/site.mjs";
import { serveStatic } from "../../tools/static.mjs";
import { layout, years } from "../../assets/js/life.js";
import { related, strongest, STRONG } from "../../assets/js/explore.js";
import { archive } from "../fixtures/archive.mjs";

const content = loadContent();
const withAccount = renderSite({ ...content, site: { ...content.site, buttondown: { username: "javi", tags: { book: "book", clone: "clone" } } } });
const withoutAccount = renderSite({ ...content, site: { ...content.site, buttondown: { username: null, tags: { book: "book", clone: "clone" } } } });
let statics;
let browser;
let base;

before(async () => {
  statics = await serveStatic();
  base = statics.base;
  browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
});

const contexts = new Set();

afterEach(async () => {
  for (const context of contexts) await context.close().catch(() => {});
  contexts.clear();
});

after(async () => {
  await browser?.close();
  statics?.close();
});

const open = async (path = "/", options = {}) => {
  const { before: prepare, ...contextOptions } = options;
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, locale: "en-US", colorScheme: "light", ...contextOptions });
  contexts.add(context);
  await context.addInitScript(() => {
    const get = URLSearchParams.prototype.get;
    URLSearchParams.prototype.get = function (name) {
      const value = get.call(this, name);
      return name === "quality" && value === null && !window.__adaptive ? "full" : value;
    };
  });
  await prepare?.(context);
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => ["error", "warning"].includes(message.type()) && !/GPU stall/.test(message.text()) && errors.push(message.text()));
  await page.goto(base + path, { waitUntil: "load" });
  return { page, errors, close: () => context.close() };
};

const hud = (page, text) => page.waitForFunction((wanted) => document.querySelector(".hud")?.textContent === wanted, text, { timeout: 30000 });
const immersive = (page) => page.waitForFunction(() => document.documentElement.classList.contains("immersive"), null, { timeout: 30000 });
const flat = (page) => page.waitForFunction(() => document.documentElement.classList.contains("flat"), null, { timeout: 30000 });
const goTo = (page, id) => page.evaluate((hash) => (location.hash = hash), id);
const press = async (page, key, times = 1) => {
  for (let i = 0; i < times; i++) {
    await page.keyboard.press(key);
    await page.waitForTimeout(350);
  }
};
const withForm = (lang = "en") => async (context) => {
  await context.route(`${base}${lang === "es" ? "/es/" : "/"}`, (route) => route.fulfill({ contentType: "text/html", body: withAccount.get(lang === "es" ? "es/index.html" : "index.html") }));
};
const withoutForm = async (context) => {
  await context.route(`${base}/`, (route) => route.fulfill({ contentType: "text/html", body: withoutAccount.get("index.html") }));
};
const box = (page, selector) =>
  page.locator(selector).first().evaluate((node) => {
    const rect = node.getBoundingClientRect();
    return { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right, width: rect.width, height: rect.height };
  });
const view = async (page) => {
  const [yaw, pitch, distance] = (await page.locator("#scene").getAttribute("data-view")).split(",").map(Number);
  return { yaw, pitch, distance };
};
const settled = async (page, quiet = 500) => {
  let since = 0;
  for (let i = 0; i < 400; i++) {
    const rest = await page.locator("#scene").getAttribute("data-rest");
    if (rest === "1") {
      since ||= Date.now();
      if (Date.now() - since >= quiet) return page.locator("#scene").getAttribute("data-view");
    } else since = 0;
    await page.waitForTimeout(150);
  }
  throw new Error("the camera never settled");
};
const tagsShown = (page) =>
  page.evaluate(() =>
    [...document.querySelectorAll(".tag[data-on='1']")].map((node) => {
      const rect = node.getBoundingClientRect();
      return { title: node.querySelector("span").textContent, hot: node.dataset.hot === "1", name: node.dataset.name === "1", leader: node.dataset.leader === "1", left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, cx: +node.style.getPropertyValue("--cx"), cy: +node.style.getPropertyValue("--cy") };
    }),
  );
const cloudOf = async (page, title) => (await tagsShown(page)).find((tag) => tag.title === title);
const choose = async (page, id, label) => {
  await goTo(page, id);
  await hud(page, label);
  await settled(page);
};
const overlap = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
const openFilters = async (page) => {
  if ((await page.locator(".explore").getAttribute("data-legend")) === "open") return;
  if (!(await page.locator(".explore [data-legend-toggle]").isVisible())) await page.locator(".explore [data-more-toggle]").click();
  await page.locator(".explore [data-legend-toggle]").click();
};
const reveal = async (page, selector) => {
  const target = page.locator(selector).first();
  if (!(await target.isVisible())) await page.locator("[data-more-toggle]").first().click();
  return target;
};
const galaxyNames = async (page) => {
  const every = await page.evaluate(() =>
    [...document.querySelectorAll(".labels .galaxy")].map((node) => {
      const rect = node.getBoundingClientRect();
      return { text: node.firstChild.textContent, left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, go: node.dataset.go, shown: node.style.visibility === "visible" && +node.style.opacity > 0.2 };
    }),
  );
  const covers = await page.evaluate(() =>
    [".card", ".explore .bar", ".hud", ".rail", ".masthead", ".nudge"]
      .flatMap((selector) => [...document.querySelectorAll(selector)].filter((node) => !node.hidden && getComputedStyle(node).display !== "none").map((node) => node.getBoundingClientRect().toJSON()))
      .concat([{ left: 0, right: innerWidth, top: 0, bottom: 74 }, { left: 0, right: innerWidth, top: innerHeight - 60, bottom: innerHeight }]),
  );
  const shown = every.filter((galaxy) => galaxy.shown);
  const unexplained = every
    .filter((galaxy) => !galaxy.shown)
    .filter((galaxy) => ![...covers, ...shown].some((other) => overlap(galaxy, { left: other.left - 16, right: other.right + 16, top: other.top - 16, bottom: other.bottom + 16 })))
    .map((galaxy) => galaxy.text);
  return { every, shown, unexplained };
};
const wake = async (page) => {
  await page.keyboard.press("Shift");
  await page.waitForFunction(() => document.querySelector(".stage").dataset.gentle === "", null, { timeout: 5000 });
  await page.waitForTimeout(400);
};
const touch = async (page, steps) => {
  const client = await page.context().newCDPSession(page);
  for (const [type, points] of steps) await client.send("Input.dispatchTouchEvent", { type, touchPoints: points.map(([x, y], id) => ({ x, y, id })) });
};

const BORN = "01 / Origins · Born in Bilbao";
const BOOK = "07 / The book";
const CLONE = "08 / Talk to me";
const LISTS = [["book", BOOK], ["clone", CLONE]];
const TAPQUO = "03 / TapQuo · TapQuo";
const PHONE = { hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } };

test("screen readers and keyboards reach every chapter in immersive mode", async () => {
  const { page, errors, close } = await open();
  await immersive(page);
  const outline = await page.locator("main").ariaSnapshot();
  for (const text of ["A life, in milestones", "Born in Bilbao", "First job", "Life, not craft", "A book for my children", "My clone", "Want to talk"]) assert.match(outline, new RegExp(text), text);
  assert.match(outline, /link "hello@soyjavi\.com"/);
  assert.deepEqual(await page.locator("main .contact a[href^='http']").evaluateAll((nodes) => nodes.map((node) => node.href)), ["https://twitter.com/soyjavi"], "the contact offers X and nothing else outside the site");
  assert.deepEqual(await page.locator("footer a[href^='http']").evaluateAll((nodes) => nodes.map((node) => node.href)), ["https://twitter.com/soyjavi"], "the footer's Elsewhere is X only");
  assert.equal(await page.locator("a[href^='http'][href*='github'], a[href^='http'][href*='mirai'], a[href^='http'][href*='satoshi']").count(), 0, "no portfolio links on the home page");
  const kinds = await page.locator("main [data-station]").evaluateAll((nodes) => nodes.map((node) => node.dataset.station));
  assert.equal(kinds.length, content.life.milestones.length + 4, "the stations are the hero, the milestones, the book, the clone and the contact");
  assert.deepEqual([kinds[0], ...kinds.slice(-3)], ["hero", "book", "clone", "contact"]);
  assert.equal(kinds.filter((kind) => kind === "milestone").length, content.life.milestones.length);
  assert.equal(await page.locator(".labels").getAttribute("aria-hidden"), null);
  assert.equal(await page.locator(".tag").first().getAttribute("aria-hidden"), "true");
  assert.equal(await page.locator("#scene").getAttribute("aria-hidden"), "true");
  assert.equal(await page.locator(".card").getAttribute("aria-hidden"), null, "the card is real, focusable content");
  await page.locator("main a[href='mailto:hello@soyjavi.com'].address").focus();
  await hud(page, "09 / Say hello");
  assert.deepEqual(errors, []);
  await close();
});

test("the card shows the memory in view, its threads as filters and its related memories as buttons", async () => {
  const { page, close } = await open(`/#m-tapquo`);
  await hud(page, TAPQUO);
  assert.equal(await page.locator(".card").getAttribute("data-kind"), "milestone");
  assert.equal(await page.locator(".card h3").innerText(), "TapQuo");
  const tapquo = content.life.milestones.find((entry) => entry.id === "tapquo");
  const chips = [...tapquo.threads.map((id) => content.dict.en.threads[id]), ...tapquo.people.map((id) => content.dict.en.people[id])];
  assert.deepEqual(await page.locator(".card .chip").allTextContents(), chips);
  assert.deepEqual(await page.locator(".card .chip").evaluateAll((nodes) => nodes.map((node) => node.tagName + node.getAttribute("aria-pressed"))), chips.map(() => "BUTTONfalse"));
  const marks = layout(content.life.milestones, { threads: content.life.threads });
  const at = marks.findIndex((entry) => entry.id === "tapquo");
  const everyone = related(marks, at);
  const total = everyone.links.length + everyone.near.length;
  const strong = await page.locator(".card .peer").allTextContents();
  assert.equal(strong.length, Math.min(STRONG, total), "the card lists only the strongest relations");
  assert.equal(strong.length, strongest(marks, at).length);
  assert.equal(await page.locator("#scene").getAttribute("data-links"), String(strong.length), "a line is drawn to each listed memory");
  await page.locator(".card .expander").click();
  const peers = await page.locator(".card .peer").allTextContents();
  for (const title of ["GitHub", "The classroom", "I let TapQuo go", "A front end for the Bizkaibus"]) assert.ok(peers.some((text) => text.includes(title)), `${title} is not related`);
  assert.ok(peers.length <= 8);
  assert.ok(peers.length > strong.length);
  await close();
});

test("arrows step Earlier and Later in date order, Home and Escape return to the whole life", async () => {
  const { page, close } = await open();
  await immersive(page);
  await hud(page, "javi");
  for (const [key, label] of [["ArrowDown", BORN], ["ArrowRight", "01 / Origins · A farmhouse in Plencia"], ["ArrowDown", "01 / Origins · Our first home"], ["ArrowUp", "01 / Origins · A farmhouse in Plencia"], ["PageDown", "01 / Origins · Our first home"], ["PageUp", "01 / Origins · A farmhouse in Plencia"], ["ArrowLeft", BORN]]) {
    await page.keyboard.press(key);
    await hud(page, label);
  }
  await page.keyboard.press("Escape");
  await hud(page, "javi");
  await page.keyboard.press("End");
  await hud(page, "09 / Say hello");
  await page.keyboard.press("Home");
  await hud(page, "javi");
  await close();
});

test("section links and hashes open their station, not the hero, and the address follows the memory", async () => {
  const { page, close } = await open("/#book");
  await hud(page, BOOK);
  await goTo(page, "contact");
  await hud(page, "09 / Say hello");
  await goTo(page, "m-tapquo");
  await hud(page, TAPQUO);
  await goTo(page, "period-home");
  await hud(page, "05 / Home · Lookiero");
  await page.locator(".masthead nav a[data-go='period-origins']").click();
  await hud(page, BORN);
  assert.equal(await page.evaluate(() => location.hash), "#m-born", "the address names the memory in view");
  await page.keyboard.press("Escape");
  await hud(page, "javi");
  assert.equal(await page.evaluate(() => location.hash), "", "and is clean at the whole life");
  await close();
});

test("landing or reloading on a memory still renders the scene", async () => {
  const { page, errors, close } = await open("/#m-mirai");
  await hud(page, "05 / Home · Mirai");
  await page.reload({ waitUntil: "load" });
  await hud(page, "05 / Home · Mirai");
  await page.waitForTimeout(1500);
  assert.deepEqual(errors.filter((message) => /GL_INVALID|shader|WebGL/i.test(message)), []);
  await close();
});

test("hashes that are malformed or look like object keys never break the page", async () => {
  for (const hash of ["#%E0", "#50%", "#constructor", "#__proto__", "#toString", "#hasOwnProperty", "#"]) {
    const { page, errors, close } = await open(`/${hash}`, { before: withForm() });
    await immersive(page);
    await hud(page, "javi");
    assert.equal(await page.locator(".card-form form.waitlist").count(), 3, hash);
    await press(page, "ArrowDown", 2);
    await hud(page, "01 / Origins · A farmhouse in Plencia");
    assert.deepEqual(errors, [], hash);
    await close();
  }
  const { page, errors, close } = await open("/");
  await immersive(page);
  await page.evaluate(() => (location.hash = "#%E0"));
  await page.waitForTimeout(400);
  assert.deepEqual(errors, [], "a malformed hash after load is ignored");
  await close();
});

const dotsDrawn = async (page) => {
  const style = await page.addStyleTag({ content: ".labels, .card, .explore, .masthead, .hud, .rail { visibility: hidden !important; }" });
  const shot = (await page.locator("#scene").screenshot()).toString("base64");
  await style.evaluate((node) => node.remove());
  return page.evaluate(async (png) => {
    const bitmap = await createImageBitmap(new Blob([Uint8Array.from(atob(png), (char) => char.charCodeAt(0))], { type: "image/png" }));
    const canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 200;
    const context = canvas.getContext("2d");
    context.drawImage(bitmap, 0, 0, 320, 200);
    const { data } = context.getImageData(0, 0, 320, 200);
    const [r, g, b] = data;
    let count = 0;
    for (let i = 0; i < data.length; i += 4) if (Math.abs(data[i] - r) + Math.abs(data[i + 1] - g) + Math.abs(data[i + 2] - b) > 60) count++;
    return count;
  }, shot);
};

test("the scene draws dots, not an empty canvas, in both themes", async () => {
  for (const theme of ["dark", "light"]) {
    const { page, close } = await open("/", { before: (context) => context.addInitScript((value) => localStorage.setItem("theme", value), theme) });
    await immersive(page);
    await page.waitForTimeout(5500);
    const drawn = await dotsDrawn(page);
    assert.ok(drawn > 600, `${theme}: only ${drawn} pixels differ from the background, the dust is missing`);
    await close();
  }
});

test("the browser language picks the page: Spanish goes to /es/, anything else stays", async () => {
  const spanish = await open("/", { locale: "es-ES" });
  await spanish.page.waitForURL(/\/es\/$/);
  assert.equal(await spanish.page.locator("html").getAttribute("lang"), "es");
  await hud(spanish.page, "javi");
  assert.match(await spanish.page.locator("main").ariaSnapshot(), /Una vida, en hitos/);
  await spanish.close();

  for (const locale of ["en-GB", "fr-FR", "de-DE"]) {
    const other = await open("/", { locale });
    assert.equal(new URL(other.page.url()).pathname, "/", locale);
    assert.equal(await other.page.locator("html").getAttribute("lang"), "en");
    await other.close();
  }
});

test("choosing a language with the switch is remembered over the browser's", async () => {
  const { page, close } = await open("/es/", { locale: "es-ES" });
  await immersive(page);
  await (await reveal(page, "a.lang")).click();
  await page.waitForURL((url) => url.pathname === "/");
  assert.equal(await page.evaluate(() => localStorage.getItem("lang")), "en");
  await page.goto(`${base}/`, { waitUntil: "load" });
  await page.waitForTimeout(500);
  assert.equal(new URL(page.url()).pathname, "/", "Spanish browser, English choice");
  await immersive(page);
  await (await reveal(page, "a.lang")).click();
  await page.waitForURL(/\/es\/$/);
  assert.equal(await page.evaluate(() => localStorage.getItem("lang")), "es");
  await close();
});

test("a direct link to the other language is never redirected", async () => {
  const english = await open("/es/", { locale: "en-US" });
  await english.page.waitForTimeout(500);
  assert.equal(new URL(english.page.url()).pathname, "/es/");
  await english.close();
});

test("night is the first look whatever the system says, and the switch to paper is remembered across pages", async () => {
  for (const system of ["dark", "light"]) {
    const { page, close } = await open("/", { colorScheme: system });
    await immersive(page);
    const lightness = async () => (await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).match(/\d+/g).slice(0, 3).reduce((sum, value) => sum + +value, 0) / 3;
    assert.ok((await lightness()) < 40, `a ${system} system still opens on night`);
    assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
    assert.equal(await page.locator('meta[name="theme-color"]').getAttribute("content"), "#0c0c0b");
    const toggle = await reveal(page, ".masthead [data-theme-toggle]");
    assert.equal(await toggle.isVisible(), true);
    assert.equal(await toggle.getAttribute("aria-label"), "Switch to the light theme");
    assert.equal(await page.evaluate(() => localStorage.getItem("theme")), null, "nothing is stored until a choice is made");
    await toggle.click();
    assert.equal(await page.locator("html").getAttribute("data-theme"), "light");
    assert.ok((await lightness()) > 200, "paper after the switch");
    assert.equal(await page.locator('meta[name="theme-color"]').getAttribute("content"), "#f3f1ec");
    assert.equal(await toggle.getAttribute("aria-label"), "Switch to the dark theme");
    assert.equal(await page.evaluate(() => localStorage.getItem("theme")), "light");
    await page.goto(`${base}/404.html`, { waitUntil: "load" });
    assert.equal(await page.locator("html").getAttribute("data-theme"), "light", "the other pages follow the choice");
    await close();
  }
});

test("switching theme repaints the scene without reloading it", async () => {
  const { page, errors, close } = await open("/", { colorScheme: "dark" });
  await immersive(page);
  await page.waitForTimeout(4000);
  const sample = async () => {
    const style = await page.addStyleTag({ content: ".labels, .card, .explore, .masthead, .hud, .rail { visibility: hidden !important; }" });
    const png = (await page.locator("#scene").screenshot()).toString("base64");
    await style.evaluate((node) => node.remove());
    return page.evaluate(async (data) => {
      const bitmap = await createImageBitmap(new Blob([Uint8Array.from(atob(data), (char) => char.charCodeAt(0))], { type: "image/png" }));
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 8;
      const context = canvas.getContext("2d");
      context.drawImage(bitmap, 0, 0, 8, 8);
      const { data: pixels } = context.getImageData(0, 0, 8, 8);
      return (pixels[0] + pixels[1] + pixels[2]) / 3;
    }, png);
  };
  assert.ok((await sample()) < 40, "dark canvas");
  const alive = await page.evaluate(() => (window.__alive = 1));
  await (await reveal(page, ".masthead [data-theme-toggle]")).click();
  await page.waitForTimeout(800);
  assert.ok((await sample()) > 200, "light canvas");
  assert.equal(await page.evaluate(() => window.__alive), alive, "the page did not reload");
  assert.deepEqual(errors, []);
  await close();
});

test("browsers without WebGL2 get the flat page with every section readable and none of the controls", async () => {
  const { page, errors, close } = await open("/", {
    before: (context) =>
      context.addInitScript(() => {
        const original = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function (type, ...rest) {
          return type === "webgl2" ? null : original.call(this, type, ...rest);
        };
      }),
  });
  await page.waitForTimeout(600);
  assert.equal(await page.evaluate(() => document.documentElement.className), "flat");
  for (const id of ["top", "period-origins", "m-born", "m-lifenotjob", "book", "clone", "contact"]) assert.ok(await page.locator(`#${id}`).isVisible(), id);
  assert.equal(await page.locator("[data-find], [data-guide-toggle], [data-surprise], [data-legend-toggle], [data-sound], [data-more-toggle]").evaluateAll((nodes) => nodes.filter((node) => node.getClientRects().length).length), 0, "none of the controls");
  assert.equal(await page.locator("[data-theme-toggle]").first().isVisible(), true, "the theme switch stays");
  assert.equal(await page.locator(".card").count(), 0);
  assert.equal(await page.locator(".rail").isVisible(), false);
  assert.deepEqual(await page.locator("#m-tapquo .facets").evaluateAll((nodes) => nodes.map((node) => node.dataset.facet)), ["threads", "people"]);
  for (const facet of ["threads", "people"]) assert.equal(await page.locator(`#m-tapquo .facets[data-facet=${facet}]`).isVisible(), true, `the ${facet} are still printed with the memory`);
  assert.equal(await page.locator("[data-theme-toggle]").first().isVisible(), true, "the theme works on the flat page");
  assert.deepEqual(errors, []);
  await close();
});

test("reduced motion gets the flat page too", async () => {
  const { page, close } = await open("/", { reducedMotion: "reduce" });
  await page.waitForTimeout(600);
  assert.equal(await page.evaluate(() => document.documentElement.className), "flat");
  await close();
});

test("a short or zoomed-in window gets the complete flat page, with the form, and goes back when it grows", async () => {
  const { page, close } = await open("/", { before: withForm() });
  await immersive(page);
  await page.setViewportSize({ width: 640, height: 400 });
  await flat(page);
  for (const id of ["top", "period-origins", "m-born", "m-lifenotjob", "book", "clone", "contact"]) assert.ok(await page.locator(`#${id}`).isVisible(), id);
  for (const [section, list] of [["top", "hero"], ["book", "book"], ["clone", "clone"]]) {
    assert.ok(await page.locator(`#waitlist-${list}-email`).isVisible(), `the ${list} form is on the page`);
    assert.equal(await page.locator(`#${section} form.waitlist[data-list=${list}]`).count(), 1, `the ${list} form is back in its section`);
  }
  assert.equal(await page.locator(".card").count(), 0);
  assert.equal(await page.locator(".card-form").count(), 0);
  await page.setViewportSize({ width: 1280, height: 800 });
  await immersive(page);
  assert.equal(await page.locator(".card-form form.waitlist").count(), 3);
  assert.deepEqual(await page.locator(".card-form").evaluateAll((nodes) => nodes.map((node) => node.dataset.for)), ["hero", "book", "clone"]);
  await close();

  const landscape = await open("/", { viewport: { width: 844, height: 390 }, hasTouch: true, isMobile: true, before: withForm() });
  await flat(landscape.page);
  for (const list of ["book", "clone"]) assert.ok(await landscape.page.locator(`#waitlist-${list}-email`).isVisible(), list);
  await landscape.close();
});

test("dragging turns the scene around the memory in view without leaving it", async () => {
  const { page, close } = await open("/#m-tapquo");
  await hud(page, TAPQUO);
  const start = await settled(page);
  const before = await view(page);
  const ring = await page.locator("#scene").getAttribute("data-ring");
  await page.mouse.move(900, 400);
  await page.mouse.down();
  await page.mouse.move(1020, 340, { steps: 8 });
  await page.mouse.up();
  await settled(page);
  const after = await view(page);
  assert.ok(Math.abs(after.yaw - before.yaw) > 0.3, `yaw ${before.yaw} -> ${after.yaw}`);
  assert.ok(Math.abs(after.pitch - before.pitch) > 0.1);
  assert.equal(Math.round(after.distance), Math.round(before.distance), "a drag does not zoom");
  assert.equal(await page.locator(".hud").textContent(), TAPQUO, "a drag never opens another memory");
  assert.equal(await page.locator("#scene").getAttribute("data-ring"), ring, "the ring stays on its memory");
  assert.notEqual(start, await page.locator("#scene").getAttribute("data-view"));
  await close();
});

test("the wheel and a pinch bring the camera closer or further, in pixels, lines or pages, within limits", async () => {
  const { page, close } = await open("/#m-tapquo");
  await hud(page, TAPQUO);
  const base = (await view(page)).distance;
  const wheel = (deltaY, deltaMode = 0) => page.evaluate(([y, mode]) => document.getElementById("scene").dispatchEvent(new WheelEvent("wheel", { deltaY: y, deltaMode: mode, cancelable: true, bubbles: true })), [deltaY, deltaMode]);
  await wheel(-240);
  await settled(page);
  const closer = (await view(page)).distance;
  assert.ok(closer < base * 0.85, `${base} -> ${closer}`);
  await wheel(6, 1);
  await settled(page);
  assert.ok((await view(page)).distance > closer, "lines count too");
  await wheel(1, 2);
  await settled(page);
  assert.ok((await view(page)).distance > closer * 1.3, "and pages");
  for (let i = 0; i < 80; i++) await wheel(-400);
  await settled(page);
  assert.ok((await view(page)).distance >= 6 && (await view(page)).distance < 8, "it stops at the closest");
  for (let i = 0; i < 80; i++) await wheel(400);
  await settled(page);
  assert.ok((await view(page)).distance <= 640 && (await view(page)).distance > 600, "and at the furthest");
  assert.equal(await page.locator(".hud").textContent(), TAPQUO, "zooming never opens another memory");
  await close();

  const phone = await open("/#m-tapquo", PHONE);
  await hud(phone.page, TAPQUO);
  await settled(phone.page);
  const far = (await view(phone.page)).distance;
  await touch(phone.page, [["touchStart", [[160, 300], [230, 300]]], ["touchMove", [[140, 300], [250, 300]]], ["touchMove", [[110, 300], [280, 300]]], ["touchMove", [[80, 300], [310, 300]]], ["touchEnd", []]]);
  await settled(phone.page);
  assert.ok((await view(phone.page)).distance < far * 0.8, "spreading two fingers comes closer");
  await phone.close();
});

test("a right drag moves the picture and stops following the memory", async () => {
  const { page, close } = await open("/#m-tapquo");
  await hud(page, TAPQUO);
  await settled(page);
  const before = await cloudOf(page, "TapQuo");
  await page.mouse.move(800, 420);
  await page.mouse.down({ button: "right" });
  await page.mouse.move(900, 420, { steps: 6 });
  await page.mouse.up({ button: "right" });
  await settled(page);
  const after = await cloudOf(page, "TapQuo");
  assert.ok(after.cx - before.cx > 60, `the memory moved ${(after.cx - before.cx).toFixed(0)}px with the pointer`);
  assert.equal(await page.locator(".hud").textContent(), TAPQUO);
  await close();
});

test("pointing at a cloud names it, a click opens it and a click on empty space does nothing", async () => {
  const { page, close } = await open("/#m-tapquo");
  await hud(page, TAPQUO);
  await settled(page);
  await page.waitForTimeout(800);
  const card = await box(page, ".card");
  const heavy = (await tagsShown(page)).find((tag) => tag.title !== "TapQuo" && tag.cx > card.right + 20 && tag.cx < 1240 && tag.cy > 120 && tag.cy < 640);
  assert.ok(heavy, "a related memory is named in the free area");
  await page.mouse.move(640, 60);
  await page.mouse.move(heavy.cx, heavy.cy);
  await page.waitForFunction(() => document.getElementById("scene").style.cursor === "pointer", null, { timeout: 5000 });
  assert.equal((await tagsShown(page)).find((tag) => tag.title === heavy.title).hot, true);
  await page.mouse.move(640, 60);
  await page.mouse.click(heavy.cx, heavy.cy);
  await page.waitForFunction((title) => document.querySelector(".hud").textContent.endsWith(title), heavy.title, { timeout: 20000 });
  assert.equal(await page.locator(".card h3").innerText(), heavy.title);
  await settled(page);
  const label = await page.locator(".hud").textContent();
  await page.mouse.click(1250, 330);
  await page.waitForTimeout(600);
  assert.equal(await page.locator(".hud").textContent(), label, "empty space is not a memory");
  await close();
});

test("choosing a thread dims the rest, in the controls and in the card, and Escape lets go step by step", async () => {
  const { page, close } = await open("/#m-running");
  await hud(page, "04 / Remote · I start running");
  await settled(page);
  assert.equal(await page.locator(".stage").getAttribute("data-filter"), "");
  assert.equal(await page.locator(".legend").isVisible(), false, "the threads wait behind Filter");
  await openFilters(page);
  assert.equal(await page.locator(".explore [data-legend-toggle]").getAttribute("aria-expanded"), "true");
  await page.locator(".legend button", { hasText: "Body" }).click();
  assert.equal(await page.locator(".stage").getAttribute("data-filter"), "threads:body");
  assert.equal(await page.locator(".legend button", { hasText: "Body" }).getAttribute("aria-pressed"), "true");
  assert.equal(await page.locator(".legend button", { hasText: "Craft" }).getAttribute("aria-pressed"), "false");
  assert.equal(await page.locator(".card .chip", { hasText: "Body" }).getAttribute("aria-pressed"), "true", "the card's chip shows it too");
  await page.locator(".legend button", { hasText: "Craft" }).click();
  assert.equal(await page.locator(".stage").getAttribute("data-filter"), "threads:craft", "choosing another replaces it");
  await page.locator(".card .chip", { hasText: "Body" }).click();
  assert.equal(await page.locator(".stage").getAttribute("data-filter"), "threads:body", "a chip in the card is the same filter");
  await page.locator(".card .chip", { hasText: "Body" }).click();
  assert.equal(await page.locator(".stage").getAttribute("data-filter"), "", "pressing it again lets go");
  await page.locator(".legend button", { hasText: "Family" }).click();
  await page.keyboard.press("Escape");
  assert.equal(await page.locator(".stage").getAttribute("data-filter"), "", "the first Escape lets go of the thread");
  assert.equal(await page.locator(".hud").textContent(), "04 / Remote · I start running", "and keeps the memory");
  await page.keyboard.press("Escape");
  await hud(page, "javi");
  await close();
});

test("related memories are buttons that open the other memory, and Earlier and Later follow the filter", async () => {
  const { page, close } = await open("/#m-tapquo");
  await hud(page, TAPQUO);
  await page.locator(".card .expander").click();
  await page.locator(".card .peer", { hasText: "GitHub" }).click();
  await hud(page, "02 / The craft · GitHub");
  assert.equal(await page.evaluate(() => document.activeElement.classList.contains("card")), true, "the keyboard stays in the card");
  assert.ok(Number(await page.locator("#scene").getAttribute("data-links")) >= 1);

  await goTo(page, "m-running");
  await hud(page, "04 / Remote · I start running");
  assert.equal(await page.locator(".step[data-step=next]").textContent(), "Later →");
  await page.locator(".step[data-step=next]").click();
  await hud(page, "04 / Remote · Minube");
  await page.locator(".step[data-step=previous]").click();
  await hud(page, "04 / Remote · I start running");
  await page.locator(".card .chip", { hasText: "Body" }).click();
  for (const label of ["05 / Home · My fight with bedtime", "06 / Now · My first race", "06 / Now · First karate class with Eki"]) {
    await page.locator(".step[data-step=next]").click();
    await hud(page, label);
  }
  assert.equal(await page.locator(".step[data-step=next]").isVisible(), false, "the thread ends at its last memory");
  await page.keyboard.press("Escape");
  assert.equal(await page.locator(".stage").getAttribute("data-filter"), "");
  await goTo(page, "m-lifenotjob");
  await hud(page, "06 / Now · Life, not craft");
  await page.locator(".step[data-step=next]").click();
  await hud(page, "06 / Now · Life at 45");
  await page.locator(".step[data-step=next]").click();
  await hud(page, BOOK);
  await close();
});

test("the finder understands accents and thread names, opens with a slash and closes with Escape", async () => {
  const { page, close } = await open("/");
  await immersive(page);
  await hud(page, "javi");
  assert.equal(await page.locator(".finder").isVisible(), false);
  await page.keyboard.press("/");
  assert.equal(await page.locator(".finder").isVisible(), true);
  assert.equal(await page.evaluate(() => document.activeElement.id), "finder-input");
  assert.equal(await page.locator("#finder-input").inputValue(), "", "the slash is not typed");
  await page.keyboard.type("ibermatica");
  assert.deepEqual(await page.locator(".finder .peer").allTextContents(), ["Jun 2006Ibermática"]);
  await page.keyboard.press("Enter");
  await hud(page, "02 / The craft · Ibermática");
  assert.equal(await page.locator(".finder").isVisible(), false);
  await page.keyboard.press("/");
  await page.keyboard.type("body");
  const texts = await page.locator(".finder .peer").allTextContents();
  const body = content.life.milestones.filter((entry) => entry.threads.includes("body")).length;
  assert.equal(await page.locator(".finder .peer.show").first().textContent(), `${body}Show only Body`, "the thread is offered as a filter with its count");
  for (const title of ["Taekwondo", "I start running"]) assert.ok(texts.some((text) => text.includes(title)), `${title} is a body memory`);
  await page.keyboard.press("ArrowDown");
  assert.equal(await page.evaluate(() => document.activeElement.classList.contains("peer")), true, "the arrows walk the results");
  await page.locator(".finder .peer", { hasText: "I start running" }).click();
  await hud(page, "04 / Remote · I start running");
  assert.equal(await page.locator(".finder").isVisible(), false);
  await page.keyboard.press("/");
  await page.keyboard.type("zzzz");
  assert.equal(await page.locator(".finder .peer").count(), 0);
  assert.equal(await page.locator(".finder .none").innerText(), "No memory matches");
  await page.keyboard.press("Escape");
  assert.equal(await page.locator(".finder").isVisible(), false);
  assert.equal(await page.locator(".hud").textContent(), "04 / Remote · I start running", "Escape only closed the finder");
  await close();
});

test("walking the finder's results with the arrows does not step through the memories", async () => {
  const { page, close } = await open("/");
  await immersive(page);
  await hud(page, "javi");
  await page.keyboard.press("/");
  await page.keyboard.type("a");
  assert.ok((await page.locator(".finder .peer").count()) >= 3);
  for (const key of ["ArrowDown", "ArrowDown", "ArrowDown", "ArrowRight", "PageDown", "Home"]) {
    await page.keyboard.press(key);
    await page.waitForTimeout(150);
  }
  assert.equal(await page.locator(".hud").textContent(), "javi", "browsing the results opens nothing");
  await page.keyboard.press("Escape");
  assert.equal(await page.evaluate(() => document.activeElement.hasAttribute("data-find")), true, "Escape gives the focus back to Find");
  await close();
});

test("Escape inside an email field leaves the reader at the book or the clone with what they typed", async () => {
  for (const [list, label] of LISTS) {
    const { page, close } = await open(`/#${list}`, { before: withForm() });
    await hud(page, label);
    await page.locator(`#waitlist-${list}-email`).fill("reader@exam");
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    assert.equal(await page.locator(".hud").textContent(), label, list);
    assert.equal(await page.locator(`#waitlist-${list}-email`).inputValue(), "reader@exam", list);
    await close();
  }
});

test("the keyboard goes through the controls and the card, never through invisible links, and the skip link lands on the card", async () => {
  const { page, close } = await open("/");
  await immersive(page);
  await hud(page, "javi");
  await page.keyboard.press("Tab");
  assert.equal(await page.evaluate(() => document.activeElement.className), "skip");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(300);
  assert.equal(await page.evaluate(() => document.activeElement.id), "card");
  assert.equal(await page.locator("main a[tabindex='-1']").count() > 3, true, "the hidden copy of the page is out of the tab order");
  for (let i = 0; i < 60; i++) await page.keyboard.press("Tab");
  assert.equal(await page.locator(".hud").textContent(), "javi", "tabbing never opens a memory behind the reader's back");
  assert.equal(await page.evaluate(() => location.hash), "#card", "only the skip link left a mark in the address");
  await close();
});

test("surprise me opens a different memory every time", async () => {
  const { page, close } = await open("/");
  await immersive(page);
  await hud(page, "javi");
  let last = "javi";
  for (let i = 0; i < 6; i++) {
    await page.locator("[data-surprise]").click();
    await page.waitForFunction((previous) => document.querySelector(".hud").textContent !== previous, last, { timeout: 5000 });
    const now = await page.locator(".hud").textContent();
    assert.match(now, /^0[1-6] \/ /, "it is a memory");
    last = now;
  }
  await close();
});

test("the timeline rail shows the years and the density and jumps to a decade or back to the whole life", async () => {
  const { page, close } = await open("/", { colorScheme: "dark" });
  await immersive(page);
  assert.equal(await page.locator(".rail").isVisible(), true);
  assert.equal(await page.locator(".rail-bars i").count(), 47);
  assert.deepEqual(await page.locator(".rail-years a").allInnerTexts(), ["1980", "1990", "2000", "2010", "2020"]);
  await page.locator(".rail-years a", { hasText: "2000" }).click();
  await hud(page, "02 / The craft · First job");
  await page.locator(".rail-years a", { hasText: "2020" }).focus();
  await page.keyboard.press("Enter");
  await hud(page, "05 / Home · Lookiero");
  await page.locator(".rail-home").click();
  await hud(page, "javi");
  await close();
});

test("the rail cursor follows the memory in view and the whole life is a click away from anywhere", async () => {
  const { page, close } = await open("/#book");
  await hud(page, BOOK);
  const cursor = () => page.locator(".rail-cursor").evaluate((node) => parseFloat(node.style.getPropertyValue("--x")));
  const atBook = await cursor();
  assert.ok(atBook > 90 && atBook < 97, `${atBook}% at the book`);
  await goTo(page, "m-firstjob");
  await hud(page, "02 / The craft · First job");
  const atFirstJob = await cursor();
  assert.ok(atFirstJob > 40 && atFirstJob < 43, `${atFirstJob}% at the first job`);
  await page.locator(".rail-home").click();
  await hud(page, "javi");
  assert.ok((await cursor()) < 1);
  await close();
});

test("pressing or dragging along the rail jumps to the nearest memory", async () => {
  const { page, close } = await open("/");
  await immersive(page);
  const track = await page.locator(".rail-track").boundingBox();
  const at = (year) => track.x + ((year - 1980) / (2031 - 1980)) * track.width;
  const y = track.y + track.height / 2;
  await page.mouse.click(at(2014.7), y);
  await hud(page, "03 / TapQuo · I leave Spain");
  await page.mouse.move(at(2001.4), y);
  await page.mouse.down();
  await hud(page, "02 / The craft · First job");
  await page.mouse.move(at(1994.4), y, { steps: 8 });
  await hud(page, "01 / Origins · Tortillas for a school trip");
  await page.mouse.up();
  await page.mouse.move(at(2022.1), y);
  assert.match(await page.locator(".rail-tip").innerText(), /Feb 2022 · Mirai/);
  await close();
});

test("the whole life names a galaxy for each period and the names stay in the window", async () => {
  const { page, close } = await open("/", { colorScheme: "dark" });
  await immersive(page);
  await hud(page, "javi");
  await page.waitForTimeout(5500);
  const { every: everyGalaxy, shown: galaxies, unexplained } = await galaxyNames(page);
  const wanted = content.life.periods.map((id) => content.dict.en.periods[id].kicker.split(" · ")[0]);
  assert.equal(everyGalaxy.length, wanted.length, "every period has a galaxy label");
  assert.ok(galaxies.length >= wanted.length - 2, "all the names that fit are shown");
  assert.deepEqual(unexplained, [], "a name is hidden only where the card, the controls, the rail or another name is over it");
  assert.deepEqual(galaxies.map((galaxy) => galaxy.text).sort(), wanted.filter((text) => galaxies.some((galaxy) => galaxy.text === text)).sort());
  assert.deepEqual(galaxies.map((galaxy) => galaxy.go).sort(), content.life.periods.filter((id) => galaxies.some((galaxy) => galaxy.go === `period-${id}`)).map((id) => `period-${id}`).sort());
  const size = await page.evaluate(() => ({ width: innerWidth }));
  galaxies.forEach((galaxy, i) => {
    assert.ok(galaxy.left >= 0 && galaxy.right <= size.width, `"${galaxy.text}" is cut by the edge`);
    galaxies.slice(i + 1).forEach((other) => assert.ok(!overlap(galaxy, other), `"${galaxy.text}" touches "${other.text}"`));
  });
  await close();
});

test("a galaxy's name opens the first memory of its period", async () => {
  const { page, close } = await open("/");
  await immersive(page);
  await hud(page, "javi");
  await page.waitForTimeout(5500);
  const target = await page.evaluate(() => {
    const node = [...document.querySelectorAll(".labels .galaxy")].find((item) => item.style.visibility === "visible" && +item.style.opacity > 0.5 && item.dataset.go === "period-craft");
    const rect = node?.getBoundingClientRect();
    return rect && { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  });
  assert.ok(target, "the craft galaxy is named at the whole life");
  await page.mouse.click(target.x, target.y);
  await hud(page, "02 / The craft · First job");
  await close();
});

const keepClear = async (page, where) => {
  const rects = await page.evaluate(() => {
    const rectOf = (selector) => {
      const node = document.querySelector(selector);
      if (!node || node.hidden || getComputedStyle(node).display === "none") return null;
      const rect = node.getBoundingClientRect();
      return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
    };
    const marks = [...document.querySelectorAll(".labels .edge-mark:not([hidden])")].map((node) => {
      const rect = node.getBoundingClientRect();
      return { title: node.textContent, left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
    });
    const named = [...document.querySelectorAll(".labels .galaxy, .labels .ahead")]
      .filter((node) => node.style.visibility === "visible" && +node.style.opacity > 0.2)
      .map((node) => {
        const rect = node.getBoundingClientRect();
        return { title: node.textContent, left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
      });
    return { card: rectOf(".card"), explore: rectOf(".explore"), rail: rectOf(".rail"), hud: rectOf(".hud"), masthead: rectOf(".masthead"), minimap: rectOf(".minimap"), named, marks, width: innerWidth, height: innerHeight };
  });
  const shown = await tagsShown(page);
  shown.forEach((tag, i) => {
    assert.ok(tag.left >= 0 && tag.right <= rects.width, `${where}: "${tag.title}" is cut by the edge`);
    for (const other of ["card", "explore", "rail", "hud", "masthead", "minimap"]) if (rects[other]) assert.ok(!overlap(tag, rects[other]), `${where}: "${tag.title}" sits behind the ${other}`);
    shown.slice(i + 1).forEach((next) => assert.ok(!overlap(tag, next), `${where}: "${tag.title}" touches "${next.title}"`));
    rects.named.forEach((name) => assert.ok(!overlap(tag, name), `${where}: "${tag.title}" touches the name "${name.title}"`));
    rects.marks.forEach((mark) => assert.ok(!overlap(tag, mark), `${where}: "${tag.title}" touches the marker "${mark.title}"`));
  });
  for (const name of rects.named.filter((entry) => entry.title.match(/^\d\d \//))) {
    if (rects.minimap) assert.ok(!overlap(name, rects.minimap), `${where}: the galaxy name "${name.title}" sits under the minimap`);
    rects.marks.forEach((mark) => assert.ok(!overlap(name, mark), `${where}: the galaxy name "${name.title}" covers the marker "${mark.title}"`));
  }
  return shown;
};

test("the memory in view is named beside its cloud and no label touches another, the card, the controls or the edge", async () => {
  for (const [id, hudLabel, title] of [["m-tapquo", TAPQUO, "TapQuo"], ["m-github", "02 / The craft · GitHub", "GitHub"], ["m-satoshi", "05 / Home · Satoshi Ltd.", "Satoshi Ltd."], ["m-child1", "05 / Home · My first child is born", "My first child is born"]]) {
    const { page, close } = await open(`/#${id}`);
    await hud(page, hudLabel);
    await settled(page);
    await page.waitForTimeout(500);
    const shown = await keepClear(page, id);
    const named = shown.find((tag) => tag.title === title);
    assert.ok(named && named.hot, `${id}: the memory in view is not named`);
    await close();
  }
  for (const where of ["/", "/#m-mirai"]) {
    const { page, close } = await open(where);
    await immersive(page);
    await page.waitForTimeout(5500);
    await keepClear(page, `${where} at the whole life`);
    await close();
  }
  const phone = await open("/#m-tapquo", PHONE);
  await hud(phone.page, TAPQUO);
  await settled(phone.page);
  await phone.page.waitForTimeout(500);
  const shown = await keepClear(phone.page, "phone");
  assert.ok(shown.some((tag) => tag.title === "TapQuo"), "the memory is named on a phone too");
  await phone.close();
});

test("the card and the controls fit the screen at every kind of station, on a laptop and on a phone", async () => {
  for (const viewport of [{ width: 1280, height: 720 }, { width: 1280, height: 640 }, { width: 390, height: 844 }, { width: 360, height: 640 }, { width: 768, height: 1024 }, { width: 1024, height: 1366 }, { width: 880, height: 700 }]) {
    const mobile = viewport.width < 600;
    const { page, close } = await open("/", { viewport, hasTouch: mobile, isMobile: mobile });
    await immersive(page);
    for (const [id, label] of [["top", "javi"], ["m-tapquo", TAPQUO], ["book", BOOK], ["clone", CLONE], ["contact", "09 / Say hello"]]) {
      await goTo(page, id);
      await hud(page, label);
      await page.waitForTimeout(500);
      const where = `${id} at ${viewport.width}x${viewport.height}`;
      const card = await box(page, ".card");
      const explore = await box(page, ".explore");
      const rail = await box(page, ".rail");
      assert.ok(card.left >= -1 && card.right <= viewport.width + 1, `${where}: the card is off to the side (${card.left.toFixed(0)}–${card.right.toFixed(0)})`);
      assert.ok(card.top >= explore.top - 1 && card.bottom <= rail.top + 1, `${where}: the card runs into the rail (${card.top.toFixed(0)}–${card.bottom.toFixed(0)}, rail at ${rail.top.toFixed(0)})`);
      if (mobile) assert.ok(card.top >= explore.bottom - 1, `${where}: the card runs into the controls`);
      else assert.ok(card.right <= explore.left + 1 || card.top >= explore.bottom - 1, `${where}: the card runs into the controls`);
      assert.ok(explore.left >= -1 && explore.right <= viewport.width + 1, `${where}: the controls are off to the side`);
      if (id === "m-tapquo") {
        await settled(page);
        const cloud = await cloudOf(page, "TapQuo");
        assert.ok(cloud, `${where}: the memory is not named`);
        assert.ok(!(cloud.cx >= card.left && cloud.cx <= card.right && cloud.cy >= card.top && cloud.cy <= card.bottom), `${where}: the memory is behind the card (${cloud.cx.toFixed(0)}, ${cloud.cy.toFixed(0)})`);
        assert.ok(cloud.cx > 0 && cloud.cx < viewport.width && cloud.cy > 0 && cloud.cy < viewport.height, `${where}: the memory is off screen`);
      }
      const scrolls = await page.locator(".card").evaluate((node) => node.scrollHeight > node.clientHeight + 1);
      if (scrolls) assert.equal(await page.locator(".card").evaluate((node) => getComputedStyle(node).overflowY), "auto", `${where}: a long card must scroll`);
    }
    await close();
  }
});

test("the hero keeps its calls to action on screen without scrolling, in both languages, at laptop and phone sizes", async () => {
  for (const lang of ["en", "es"]) {
    for (const [width, height] of [[1366, 657], [1280, 640], [1536, 730], [1440, 780], [360, 640], [390, 844]]) {
      const mobile = width < 600;
      const { page, close } = await open(lang === "es" ? "/es/" : "/", { viewport: { width, height }, locale: lang === "es" ? "es-ES" : "en-US", hasTouch: mobile, isMobile: mobile });
      await immersive(page);
      await hud(page, "javi");
      await page.waitForTimeout(600);
      const where = `${lang} ${width}x${height}`;
      const [card, primary, secondary] = [await box(page, ".card"), await box(page, ".card #waitlist-hero button"), await box(page, ".card .actions a")];
      assert.equal(await page.locator(".card").evaluate((node) => node.scrollHeight - node.clientHeight), 0, `${where}: the hero card hides part of itself behind a scroll`);
      const field = await box(page, ".card #waitlist-hero-email");
      assert.equal(await page.locator(".card #waitlist-hero .note").isVisible(), true, `${where}: the privacy line stays`);
      assert.ok(field.top >= card.top && field.bottom <= card.bottom && field.bottom <= height, `${where}: the email field is out of view`);
      for (const [name, button] of [["primary", primary], ["secondary", secondary]]) assert.ok(button.top >= card.top && button.bottom <= card.bottom && button.bottom <= height, `${where}: the ${name} call to action is out of view (${button.top.toFixed(0)}–${button.bottom.toFixed(0)} in ${card.top.toFixed(0)}–${card.bottom.toFixed(0)})`);
      assert.equal(await page.locator(".card-steps").isVisible(), false, `${where}: the hero repeats its own way in`);
      assert.equal(await page.locator(".card-close").isVisible(), false, `${where}: the hero has nothing to close`);
      await close();
    }
  }
});

test("a memory card shows Earlier and Later at the foot of the card however long it is, and a way back to the whole life", async () => {
  const { page, close } = await open("/#m-born", { viewport: { width: 1280, height: 640 } });
  await hud(page, BORN);
  await settled(page);
  const scrolls = () => page.locator(".card-body").evaluate((node) => node.scrollHeight - node.clientHeight);
  assert.ok((await scrolls()) > 0, "the text is long enough to scroll at this height");
  const height = (await box(page, ".card")).height;
  for (const position of [0, 1e6]) {
    await page.locator(".card-body").evaluate((node, top) => (node.scrollTop = top), position);
    await page.waitForTimeout(150);
    const [card, steps, later] = [await box(page, ".card"), await box(page, ".card-steps"), await box(page, ".step[data-step=next]")];
    assert.ok(steps.bottom >= card.bottom - 3 && steps.bottom <= card.bottom + 1, `Earlier and Later are not at the foot of the card (${steps.bottom.toFixed(0)} in ${card.bottom.toFixed(0)}) at scroll ${position}`);
    assert.ok(later.top >= card.top && later.bottom <= card.bottom, "Later is inside the card");
    assert.equal(card.height, height, "the card keeps its height");
  }
  await goTo(page, "m-tapquo");
  await hud(page, TAPQUO);
  await page.waitForTimeout(300);
  assert.equal((await box(page, ".card")).height, height, "every memory's card has the same height");
  const closeButton = page.locator(".card-close");
  assert.equal(await closeButton.isVisible(), true);
  assert.equal(await closeButton.getAttribute("aria-label"), "Back to the whole life");
  assert.equal(await page.locator(".rail-home").getAttribute("title"), "Back to the whole life");
  await closeButton.click();
  await hud(page, "javi");
  assert.equal(await page.evaluate(() => location.hash), "");
  assert.equal(await closeButton.isVisible(), false);
  await close();
});

test("the book and the clone wait at two named rings that open their cards", async () => {
  const { page, errors, close } = await open("/", { viewport: { width: 1440, height: 860 } });
  await immersive(page);
  await hud(page, "javi");
  const rings = () =>
    page.evaluate(() =>
      [...document.querySelectorAll(".labels .ahead:not(.now)")]
        .filter((node) => node.style.visibility === "visible" && +node.style.opacity > 0.2)
        .map((node) => ({ text: node.textContent, cx: +node.style.getPropertyValue("--cx"), cy: +node.style.getPropertyValue("--cy") })),
    );
  await page.waitForFunction(() => [...document.querySelectorAll(".labels .ahead:not(.now)")].filter((node) => node.style.visibility === "visible" && +node.style.opacity > 0.2).length === 2, null, { timeout: 30000 });
  assert.deepEqual((await rings()).map((ring) => ring.text).sort(), ["Talk to me", "The book"]);
  for (const [text, label] of [["The book", BOOK], ["Talk to me", CLONE]]) {
    const ring = (await rings()).find((candidate) => candidate.text === text);
    await page.mouse.move(ring.cx, ring.cy);
    await page.waitForTimeout(250);
    assert.equal(await page.locator("#scene").evaluate((node) => node.style.cursor), "pointer", `${text}: the ring does not answer the pointer`);
    const [x, y] = await page.evaluate((name) => {
      const node = [...document.querySelectorAll(".labels .ahead:not(.now)")].find((candidate) => candidate.textContent === name && candidate.style.visibility === "visible");
      return [+node.style.getPropertyValue("--cx"), +node.style.getPropertyValue("--cy")];
    }, text);
    await page.mouse.click(x, y);
    await hud(page, label);
    await page.locator(".card-close").click();
    await hud(page, "javi");
    await page.waitForTimeout(800);
  }
  assert.deepEqual(errors, []);
  await close();
});

test("the thread filters are named and the controls stay on one row in both languages", async () => {
  for (const [path, locale, name] of [["/", "en-US", "Threads"], ["/es/", "es-ES", "Hilos"]]) {
    const { page, close } = await open(path, { viewport: { width: 1280, height: 800 }, locale });
    await immersive(page);
    await openFilters(page);
    const caption = await page.locator(".legend:not([hidden])").evaluate((node) => getComputedStyle(node, "::before").content);
    assert.equal(caption.match(/^"([^"]*)"/)?.[1], name, `${locale}: the filter row names what it filters`);
    const rows = await page.locator(".legend:not([hidden]) button").evaluateAll((nodes) => new Set(nodes.map((node) => Math.round(node.getBoundingClientRect().top))).size);
    assert.equal(rows, 1, `${locale}: the filters wrap onto a second row`);
    await close();
  }
});

test("on a phone a tap opens a memory, one finger turns the scene and the card keeps below the controls", async () => {
  const { page, close } = await open("/#m-satoshi", PHONE);
  await hud(page, "05 / Home · Satoshi Ltd.");
  await settled(page);
  await page.waitForTimeout(800);
  const top = (await box(page, ".card")).top;
  const target = (await tagsShown(page)).find((tag) => tag.title !== "Satoshi Ltd." && tag.cy > 150 && tag.cy < top - 20 && tag.cx > 20 && tag.cx < 370);
  assert.ok(target, "a named cloud is above the card");
  await page.touchscreen.tap(target.cx, target.cy);
  await page.waitForFunction((title) => document.querySelector(".hud").textContent.endsWith(title), target.title, { timeout: 20000 });
  await settled(page);
  const label = await page.locator(".hud").textContent();
  const before = await view(page);
  await touch(page, [["touchStart", [[250, 260]]], ["touchMove", [[200, 250]]], ["touchMove", [[150, 240]]], ["touchMove", [[100, 230]]], ["touchEnd", []]]);
  await settled(page);
  const after = await view(page);
  assert.ok(Math.abs(after.yaw - before.yaw) > 0.15, `one finger turned the scene (${before.yaw} -> ${after.yaw})`);
  assert.equal(await page.locator(".hud").textContent(), label, "and stayed on the memory");
  const [card, explore] = [await box(page, ".card"), await box(page, ".explore")];
  assert.ok(card.top >= explore.bottom - 1);
  assert.ok(card.left >= 0 && card.right <= 390);
  await close();
});

test("resizing keeps the reader on the same memory", async () => {
  const { page, close } = await open("/#m-tapquo");
  await hud(page, TAPQUO);
  await page.setViewportSize({ width: 1280, height: 640 });
  await page.waitForTimeout(1200);
  await hud(page, TAPQUO);
  await page.setViewportSize({ width: 600, height: 900 });
  await page.waitForTimeout(1200);
  await hud(page, TAPQUO);
  const card = await box(page, ".card");
  assert.ok(card.left >= 0 && card.right <= 600);
  await close();
});

test("each waitlist appears only at its own station and sends the reader to Buttondown in a visible tab with its own tag", async () => {
  const posted = [];
  const { page, errors, close } = await open("/", {
    before: async (context) => {
      await withForm()(context);
      await context.route("https://buttondown.com/**", (route) => {
        posted.push({ url: route.request().url(), body: route.request().postData(), method: route.request().method() });
        return route.fulfill({ contentType: "text/html", body: "<p>ok</p>" });
      });
    },
  });
  await immersive(page);
  assert.deepEqual(await page.locator(".card-form:visible").evaluateAll((nodes) => nodes.map((node) => node.dataset.for)), ["hero"], "only the hero's form on the hero");
  assert.equal(await page.locator("#waitlist-book-email").isVisible(), false);
  assert.equal(await page.locator("#waitlist-clone-email").isVisible(), false);
  await page.locator("#waitlist-hero-email").fill("first@example.com");
  const heroPopup = page.waitForEvent("popup");
  await page.locator(".card-form[data-for=hero] button[type=submit]").click();
  await (await heroPopup).waitForLoadState();
  assert.equal(posted.length, 1);
  assert.match(decodeURIComponent(posted[0].body), /email=first@example\.com/);
  assert.match(posted[0].body, /tag=book(&|$)/, "the hero joins the book's list");
  assert.match(await page.locator(".card-form[data-for=hero] .status").innerText(), /opened in a new tab/);
  posted.length = 0;
  await goTo(page, "book");
  await hud(page, BOOK);
  assert.equal(await page.locator(".card-form form.waitlist").count(), 3, "the real forms live in the card");
  assert.equal(await page.locator(".card-form[data-for=book]").isVisible(), true, "the book's list is visible at the book");
  assert.equal(await page.locator(".card-form[data-for=clone]").isVisible(), false, "and the clone's is not");
  await page.locator("#waitlist-book-email").fill("reader@example.com");
  const first = page.waitForEvent("popup");
  await page.locator(".card-form[data-for=book] button[type=submit]").click();
  await (await first).waitForLoadState();
  assert.equal(posted.length, 1);
  assert.equal(posted[0].method, "POST");
  assert.equal(posted[0].url, "https://buttondown.com/api/emails/embed-subscribe/javi");
  assert.match(decodeURIComponent(posted[0].body), /email=reader@example\.com/);
  assert.match(posted[0].body, /tag=book(&|$)/);
  assert.match(posted[0].body, /embed=1/);
  assert.match(await page.locator(".card-form[data-for=book] .status").innerText(), /opened in a new tab/);
  assert.doesNotMatch(await page.locator(".card-form[data-for=book] .status").innerText(), /thanks|subscribed/i, "no success is claimed");
  assert.equal(await page.locator("iframe").count(), 0, "no hidden frame");
  await page.locator(".step[data-step=next]").click();
  await hud(page, CLONE);
  assert.equal(await page.locator(".card-form[data-for=book]").isVisible(), false, "the book's list is hidden at the clone");
  assert.equal(await page.locator(".card-form[data-for=clone]").isVisible(), true, "and the clone's is visible");
  assert.equal(await page.locator(".card-form[data-for=clone] .status").innerText(), "", "the clone's list does not inherit the book's status");
  await page.locator("#waitlist-clone-email").fill("other@example.com");
  const second = page.waitForEvent("popup");
  await page.locator(".card-form[data-for=clone] button[type=submit]").click();
  await (await second).waitForLoadState();
  assert.equal(posted.length, 2);
  assert.equal(posted[1].url, "https://buttondown.com/api/emails/embed-subscribe/javi");
  assert.match(decodeURIComponent(posted[1].body), /email=other@example\.com/);
  assert.match(posted[1].body, /tag=clone(&|$)/);
  assert.doesNotMatch(posted[1].body, /tag=book/);
  assert.match(await page.locator(".card-form[data-for=clone] .status").innerText(), /opened in a new tab/);
  await page.locator(".step[data-step=previous]").click();
  await hud(page, BOOK);
  assert.equal(await page.locator(".card-form[data-for=clone]").isVisible(), false, "hidden after the clone");
  assert.deepEqual(errors, []);
  await close();
});

test("without a Buttondown account each waitlist says it opens soon and offers no form and no email", async () => {
  const { page, close } = await open("/", { before: withoutForm });
  await immersive(page);
  assert.equal(await page.locator(".card-form .waitlist").count(), 3);
  assert.deepEqual(await page.locator(".card-form .waitlist").evaluateAll((nodes) => nodes.map((node) => node.tagName + node.dataset.list)), ["DIVhero", "DIVbook", "DIVclone"]);
  assert.equal(await page.locator(".card-form[data-for=hero] .note").innerText(), "The waitlist isn't open yet.");
  assert.equal(await page.locator(".card-form form, .card-form input, .card-form button, .card-form a").count(), 0);
  for (const [list, label] of LISTS) {
    await goTo(page, list);
    await hud(page, label);
    assert.equal(await page.locator(`.card-form[data-for=${list}]`).isVisible(), true);
    assert.equal(await page.locator(`.card-form[data-for=${list}] .note`).innerText(), "The waitlist isn't open yet.");
    assert.equal(await page.locator(`.card-form[data-for=${list}] [aria-label]`).getAttribute("aria-label"), list === "book" ? "Waitlist for the book" : "Waitlist for my clone");
    assert.equal(await page.locator(`.card a[href^='mailto:']`).count(), 0, `${list}: nothing to email from the card`);
  }
  await close();
});

test("an invalid email is stopped by the browser and nothing is sent", async () => {
  for (const [list, label] of LISTS) {
    const posted = [];
    const { page, close } = await open(`/#${list}`, {
      before: async (context) => {
        await withForm()(context);
        await context.route("https://buttondown.com/**", (route) => (posted.push(route.request().url()), route.fulfill({ body: "ok" })));
      },
    });
    await hud(page, label);
    await page.locator(`#waitlist-${list}-email`).fill("not-an-email");
    await page.locator(`.card-form[data-for=${list}] button[type=submit]`).click();
    await page.waitForTimeout(800);
    assert.deepEqual(posted, [], list);
    assert.equal(await page.locator(`#waitlist-${list}-email`).evaluate((node) => node.validity.valid), false, list);
    await close();
  }
});

test("a space on a focused button presses it instead of stepping to another memory", async () => {
  for (const [list, label] of LISTS) {
    const { page, close } = await open(`/#${list}`, { before: withForm() });
    await hud(page, label);
    await page.locator(`#waitlist-${list}-email`).fill("reader@example.com");
    await page.locator(`.card-form[data-for=${list}] button[type=submit]`).focus();
    const popup = page.waitForEvent("popup", { timeout: 5000 });
    await page.keyboard.press("Space");
    await popup;
    await page.waitForTimeout(600);
    assert.equal(await page.locator(".hud").textContent(), label, list);
    await close();
  }
});

test("the calls to action to the book and the clone land on their own email field, for a mouse and for a keyboard", async () => {
  const { page, close } = await open("/", { before: withForm() });
  await immersive(page);
  await page.waitForTimeout(1500);
  assert.equal(await page.locator(".card #waitlist-hero button").textContent(), "Join the book's waitlist");
  assert.equal(await page.locator(".card a.primary").count(), 0, "the hero's call to action is the form itself");
  assert.deepEqual(await page.locator(".card .actions a").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("tabindex"))), [null, null], "the hero's links are in the tab order");
  await page.locator(".card .actions a").first().focus();
  await page.keyboard.press("Tab");
  assert.equal(await page.evaluate(() => document.activeElement.dataset.go), "clone", "Tab goes from Travel through it to the clone's card");
  await page.keyboard.press("Tab");
  assert.equal(await page.evaluate(() => document.activeElement.id), "waitlist-hero-email", "and on to the form");
  await page.locator(".card .actions a[data-go='clone']").click();
  await hud(page, CLONE);
  assert.equal(await page.evaluate(() => document.activeElement.id), "waitlist-clone-email");
  await page.locator(".masthead nav a[data-go='book']").click();
  await hud(page, BOOK);
  assert.equal(await page.evaluate(() => document.activeElement.id), "waitlist-book-email");
  await page.locator(".card-close").click();
  await hud(page, "javi");
  assert.equal(await page.evaluate(() => document.activeElement.tagName === "INPUT"), false, "closing to the hero does not raise a keyboard");
  await close();

  const keyboard = await open("/", { before: withForm() });
  await immersive(keyboard.page);
  await keyboard.page.locator(".masthead nav a[data-go='book']").focus();
  await keyboard.page.keyboard.press("Enter");
  await hud(keyboard.page, BOOK);
  assert.equal(await keyboard.page.evaluate(() => document.activeElement.id), "waitlist-book-email");
  assert.ok(await keyboard.page.locator(".card-form[data-for=book] [aria-label]").getAttribute("aria-label"));
  await keyboard.close();

  const cloneKeyboard = await open("/", { before: withForm() });
  await immersive(cloneKeyboard.page);
  await cloneKeyboard.page.locator(".masthead nav a[data-go='clone']").focus();
  await cloneKeyboard.page.keyboard.press("Enter");
  await hud(cloneKeyboard.page, CLONE);
  assert.equal(await cloneKeyboard.page.evaluate(() => document.activeElement.id), "waitlist-clone-email");
  assert.ok(await cloneKeyboard.page.locator(".card-form[data-for=clone] [aria-label]").getAttribute("aria-label"));
  await cloneKeyboard.close();
});

test("each waitlist card keeps its copy and its form on screen, with the email field in view, at laptop and phone sizes in both languages", async () => {
  const sizes = [[1366, 657], [1280, 720], [1280, 640], [1024, 600], [1536, 864], [1366, 768], [768, 1024], [390, 844], [360, 640], [320, 568]];
  for (const lang of ["en", "es"]) {
    for (const [width, height] of sizes) {
      const mobile = width < 600;
      const { page, close } = await open(lang === "es" ? "/es/" : "/", { viewport: { width, height }, locale: lang === "es" ? "es-ES" : "en-US", hasTouch: mobile, isMobile: mobile, before: withForm(lang) });
      await immersive(page);
      await page.waitForTimeout(300);
      await goTo(page, "book");
      await hud(page, lang === "es" ? "07 / El libro" : BOOK);
      for (const list of ["book", "clone"]) {
        if (list === "clone") {
          await page.locator(".step[data-step=next]").click();
          await hud(page, lang === "es" ? "08 / Habla conmigo" : CLONE);
        }
        await page.waitForTimeout(500);
        const where = `${lang} ${list} ${width}x${height}`;
        const [card, field] = [await box(page, ".card"), await box(page, `#waitlist-${list}-email`)];
        assert.ok(card.left >= -1 && card.right <= width + 1 && card.top >= 0 && card.bottom <= height + 1, `${where}: the card is off screen`);
        assert.ok(field.top >= card.top - 1 && field.bottom <= card.bottom + 1, `${where}: the email field is out of the card (${field.top.toFixed(0)}–${field.bottom.toFixed(0)} in ${card.top.toFixed(0)}–${card.bottom.toFixed(0)})`);
        assert.ok(field.bottom <= height && field.top >= 0, `${where}: the email field is off screen`);
      }
      await close();
    }
  }
});

test("a book or an AI reached by hash, rail or Later shows the email field at the smallest screens too", async () => {
  for (const [width, height] of [[360, 640], [1024, 520], [320, 568], [390, 844], [1280, 640]]) {
    const mobile = width < 600;
    for (const [list, label] of LISTS) {
      const { page, close } = await open(`/#${list}`, { viewport: { width, height }, hasTouch: mobile, isMobile: mobile, before: withForm() });
      await immersive(page);
      await hud(page, label);
      await page.waitForTimeout(500);
      const [card, field] = [await box(page, ".card"), await box(page, `#waitlist-${list}-email`)];
      assert.ok(field.top >= card.top - 1 && field.bottom <= card.bottom + 1, `${list} ${width}x${height}: the email field is clipped (${field.top.toFixed(0)}–${field.bottom.toFixed(0)} in ${card.top.toFixed(0)}–${card.bottom.toFixed(0)})`);
      await close();
    }
  }
});

test("thread ids that are numbers filter the thread that was pressed, not the one at that position", async () => {
  const { entries, facets, periods } = archive({ count: 40, people: 0, places: 0, threadIds: ["1", "2", "3", "4", "5", "6"] });
  const life = { ...content.life, periods, threads: facets.threads, people: [], places: [], ahead: { book: "1", clone: "2" }, milestones: entries };
  const dict = Object.fromEntries(
    Object.entries(content.dict).map(([lang, d]) => [
      lang,
      { ...d, life: Object.fromEntries(entries.map((entry, i) => [entry.id, { title: `Memory ${i}`, body: `Number ${i}.` }])), threads: Object.fromEntries(facets.threads.map((id) => [id, `Thread ${id}`])), people: {}, places: {} },
    ]),
  );
  const numeric = renderSite({ ...content, life, dict });
  const second = entries.find((entry) => entry.threads.length === 2);
  const { page, close } = await open(`/#m-${second.id}`, { before: (context) => context.route(`${base}/`, (route) => route.fulfill({ contentType: "text/html", body: numeric.get("index.html") })) });
  await page.waitForFunction((id) => document.querySelector(".card .chip"), second.id, { timeout: 30000 });
  const target = second.threads[1];
  await page.locator(".card .chip", { hasText: `Thread ${target}` }).click();
  assert.equal(await page.locator(".stage").getAttribute("data-filter"), `threads:${target}`);
  await openFilters(page);
  assert.equal(await page.locator(".legend button[aria-pressed=true]").innerText().then((text) => text.toLowerCase()), `thread ${target}`);
  await close();
});

test("no page makes a request outside its own origin", async () => {
  for (const path of ["/", "/es/", "/design/", "/design/proposals.html"]) {
    const outside = [];
    const { page, close } = await open(path, {
      before: (context) => context.on("request", (request) => !/^(data|blob|about):/.test(request.url()) && !request.url().startsWith(base) && outside.push(request.url())),
    });
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1500);
    assert.deepEqual(outside, [], path);
    await close();
  }
});

test("storage holds only the chosen language and theme", async () => {
  const { page, close } = await open("/es/");
  await immersive(page);
  await page.keyboard.press("ArrowDown");
  await page.locator("[data-surprise]").click();
  assert.deepEqual(await page.evaluate(() => ({ local: Object.keys(localStorage), session: Object.keys(sessionStorage), cookie: document.cookie })), { local: [], session: [], cookie: "" });
  await (await reveal(page, "[data-theme-toggle]")).click();
  await (await reveal(page, "a.lang")).click();
  await page.waitForURL((url) => url.pathname === "/");
  const stored = await page.evaluate(() => ({ local: Object.keys(localStorage).sort(), session: Object.keys(sessionStorage), cookie: document.cookie }));
  assert.deepEqual(stored, { local: ["lang", "theme"], session: [], cookie: "" });
  await close();
});

test("the controls and the card speak Spanish on the Spanish page", async () => {
  const { page, close } = await open("/es/");
  await immersive(page);
  assert.deepEqual(await page.locator(".explore .bar .tool:visible").allInnerTexts(), ["BUSCAR", "SORPRÉNDEME", "⋯"]);
  await openFilters(page);
  assert.deepEqual(await page.locator(".legend button").allInnerTexts(), content.life.threads.map((id) => content.dict.es.threads[id].toUpperCase()));
  await goTo(page, "m-tapquo");
  await hud(page, "03 / TapQuo · TapQuo");
  const tapquo = content.life.milestones.find((entry) => entry.id === "tapquo");
  assert.deepEqual(await page.locator(".card .chip:visible").allInnerTexts(), tapquo.threads.map((id) => content.dict.es.threads[id].toUpperCase()), "the card shows the first row of chips");
  assert.match(await page.locator(".card .expander").innerText(), /^TODOS LOS RELACIONADOS \(\d+\)/i);
  await page.locator(".card .expander").click();
  assert.deepEqual(await page.locator(".card .chip").allInnerTexts(), [...tapquo.threads.map((id) => content.dict.es.threads[id]), ...tapquo.people.map((id) => content.dict.es.people[id])].map((name) => name.toUpperCase()));
  assert.match(await page.locator(".card .related .kicker").innerText(), /RELACIONADOS/i);
  assert.match(await page.locator(".step[data-step=next]").innerText(), /Después/i);
  await close();
});

const wideLife = () => {
  const { entries, facets, periods } = archive({ count: 250, people: 70, places: 10, threads: 6 });
  const life = { ...content.life, periods, threads: facets.threads, people: facets.people, places: facets.places, ahead: { book: facets.threads[1], clone: facets.threads[2] }, milestones: entries };
  const dict = Object.fromEntries(
    Object.entries(content.dict).map(([lang, d]) => [
      lang,
      {
        ...d,
        life: Object.fromEntries(entries.map((entry, i) => [entry.id, { title: `Memory ${i}`, body: `Something that happened, number ${i}, with ${entry.people.join(" and ") || "nobody"}.` }])),
        threads: Object.fromEntries(facets.threads.map((id, i) => [id, `Thread ${i}`])),
        people: Object.fromEntries(facets.people.map((id, i) => [id, `Person ${i}`])),
        places: Object.fromEntries(facets.places.map((id, i) => [id, `Place ${i}`])),
      },
    ]),
  );
  return { life, dict, entries, facets };
};

test("a life of 250 memories with people and places explores without a hitch", async () => {
  const { life, dict, entries } = wideLife();
  const wide = renderSite({ ...content, life, dict });
  const { page, errors, close } = await open("/", {
    before: (context) => context.route(`${base}/`, (route) => route.fulfill({ contentType: "text/html", body: wide.get("index.html") })),
    viewport: { width: 1280, height: 800 },
  });
  await immersive(page);
  await page.waitForTimeout(6000);
  assert.match(await page.locator(".card .stats").innerText(), /250 MEMORIES · 6 THREADS · 70 PEOPLE · 10 PLACES/i);
  assert.equal(await page.locator(".legend[data-facet=people]").count(), 0, "seventy names are not a legend");
  assert.equal(await page.locator(".legend[data-facet=threads]").count(), 1);
  const shown = await keepClear(page, "250 at the whole life");
  assert.ok(shown.length <= 24, `${shown.length} labels`);
  const named = await galaxyNames(page);
  assert.equal(named.every.length, 6, "the six galaxies have a name");
  assert.ok(named.shown.length >= 3, "the names that fit are shown");
  assert.deepEqual(named.unexplained, [], "a name is hidden only where the card, the controls, the rail or another name is over it");
  const fits = async (where) => {
    const [card, controls] = [await box(page, ".card"), await box(page, ".explore")];
    assert.ok(card.right <= controls.left + 1, `${where}: the controls run into the card (${controls.left.toFixed(0)} against ${card.right.toFixed(0)})`);
  };
  await fits("250 at the whole life");
  await openFilters(page);
  await fits("250 with the threads open");
  await page.locator(".legend button", { hasText: "Thread 2" }).click();
  await page.waitForTimeout(3000);
  assert.equal(await page.locator(".stage").getAttribute("data-filter"), "threads:t2");
  assert.ok(Number(await page.locator("#scene").getAttribute("data-jumps")) > 0, "a filter draws its jumps from galaxy to galaxy");
  assert.ok((await page.locator(".galaxy-count").allTextContents()).some((text) => /· \d+/.test(text)), "each galaxy counts what it holds of the filter");
  await keepClear(page, "250 with a thread");
  await (await reveal(page, ".explore [data-unfilter]")).click();
  assert.equal(await page.locator(".stage").getAttribute("data-filter"), "");
  assert.equal(await page.locator(".explore [data-unfilter]").isVisible(), false);
  const withPeople = entries.findIndex((entry) => entry.people.length >= 2);
  await goTo(page, `m-m${withPeople}`);
  await page.waitForFunction(() => document.querySelector(".card h3")?.textContent.startsWith("Memory"), null, { timeout: 20000 });
  await settled(page);
  await page.waitForTimeout(500);
  assert.ok((await page.locator(".card .chip").count()) >= 3, "the card lists its threads and its people");
  assert.ok((await page.locator(".card .peer").count()) >= 1, "and what it is related to");
  await keepClear(page, "250 at a memory");
  await fits("250 at a memory");
  await page.keyboard.press("/");
  await page.keyboard.type("Person 1");
  assert.ok((await page.locator(".finder .peer").count()) >= 3, "people can be found");
  assert.ok((await page.locator(".finder .peer.show").count()) >= 1, "and offered as filters");
  await page.locator(".finder .peer.show").first().click();
  assert.match((await page.locator(".stage").getAttribute("data-filter")) ?? "", /^people:/);
  assert.equal(await (await reveal(page, ".explore [data-unfilter]")).isVisible(), true, "a person has no legend but the filter can be let go of");
  await page.locator(".explore [data-unfilter]").click();
  assert.equal(await page.locator(".stage").getAttribute("data-filter"), "");
  assert.deepEqual(errors, []);
  await close();
});

const peerRows = (page) => page.locator(".card .related .peer");
const indexOfMemory = (id) => content.life.milestones.findIndex((entry) => entry.id === id);

test("the rail's two buttons carry their names without a box, keep a 44 px target and swap Play for Pause", async () => {
  for (const [lang, whole, play, pause] of [["en", "Whole life", "Play", "Pause"], ["es", "Vida entera", "Ver", "Pausa"]]) {
    const { page, close } = await open(lang === "es" ? "/es/" : "/", { locale: lang === "es" ? "es-ES" : "en-US" });
    await immersive(page);
    assert.equal((await page.locator(".rail-home .rail-name").innerText()).toLowerCase(), whole.toLowerCase());
    assert.equal((await page.locator(".rail-play .rail-name").innerText()).toLowerCase(), play.toLowerCase());
    for (const selector of [".rail-home", ".rail-play"]) {
      const target = await box(page, selector);
      assert.ok(target.width >= 44 && target.height >= 44, `${selector} is ${target.width}x${target.height}`);
      assert.equal(await page.locator(selector).evaluate((node) => getComputedStyle(node).borderTopWidth), "0px", `${selector} has no box`);
      const name = await box(page, `${selector} .rail-name`);
      assert.ok(name.height < 22, `${selector}: the name stays on one line`);
    }
    await page.locator(".rail-play").click();
    assert.equal((await page.locator(".rail-play .rail-name").innerText()).toLowerCase(), pause.toLowerCase());
    await page.locator(".rail-play").click();
    assert.equal((await page.locator(".rail-play .rail-name").innerText()).toLowerCase(), play.toLowerCase());
    await close();
  }
  const phone = await open("/es/", { ...PHONE, locale: "es-ES" });
  await immersive(phone.page);
  const names = await phone.page.locator(".rail-name").evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect()));
  assert.equal(names.length, 2);
  for (const rect of names) assert.ok(rect.height < 20 && rect.left >= 0 && rect.right <= 390, "on a phone each name is one line inside the screen");
  const track = await box(phone.page, ".rail-track");
  assert.ok(track.width > 150, `the timeline keeps ${track.width.toFixed(0)} px on a phone`);
  await phone.close();
});

test("a ring's name starts at least 6 px outside the ring at three camera distances", async () => {
  const { page, close } = await open("/#book");
  await hud(page, BOOK);
  await settled(page);
  await page.waitForTimeout(5500);
  const measure = async () => {
    const label = await page.locator(".labels .ahead").evaluateAll((nodes) =>
      nodes
        .filter((node) => node.textContent === "The book")
        .map((node) => {
          const rect = node.getBoundingClientRect();
          return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, x: +node.style.getPropertyValue("--cx"), y: +node.style.getPropertyValue("--cy"), r: +node.style.getPropertyValue("--r"), shown: node.style.visibility === "visible" && +node.style.opacity > 0.2 };
        })[0],
    );
    const reach = Math.hypot(Math.max(label.left - label.x, 0, label.x - label.right), Math.max(label.top - label.y, 0, label.y - label.bottom));
    return { ...label, reach };
  };
  const seen = [];
  let named = 0;
  for (const wheel of [0, -900, -900, 2600]) {
    if (wheel) {
      await page.mouse.move(700, 400);
      await page.mouse.wheel(0, wheel);
      await settled(page);
      await page.waitForTimeout(600);
    }
    const label = await measure();
    seen.push(label.r);
    if (label.shown) {
      assert.ok(label.reach >= label.r + 6 - 0.6, `the name is ${label.reach.toFixed(1)} px from the centre of a ring of ${label.r.toFixed(1)} px`);
      named++;
    } else assert.ok(wheel !== 0, "the name shows at the opening distance");
  }
  assert.ok(named >= 3, `the name showed at ${named} of 4 distances`);
  assert.ok(Math.max(...seen) > Math.min(...seen) * 2, "the ring changed size across the three distances");
  await close();
});

test("a tag that cannot sit beside its cloud moves out and is joined to it by a hairline, and none touches anything", async () => {
  const { page, close } = await open("/");
  await immersive(page);
  await page.waitForTimeout(5500);
  await openFilters(page);
  await page.locator(".legend button", { hasText: "Home" }).first().click();
  await page.waitForTimeout(4500);
  const shown = await keepClear(page, "filtered whole life");
  assert.ok(shown.length >= 8, `${shown.length} tags in a filter that spans four galaxies`);
  const leaders = await page.locator(".tag[data-leader='1'] .leader").evaluateAll((nodes) => nodes.map((node) => ({ width: parseFloat(node.style.width), shown: getComputedStyle(node).display !== "none" })));
  assert.ok(leaders.length >= 1, "at least one tag had to move away from its cloud");
  assert.ok(leaders.every((leader) => leader.shown && leader.width > 4));
  const plain = await page.locator(".tag[data-on='1']:not([data-leader='1']) .leader").evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).display));
  assert.ok(plain.every((display) => display === "none"), "a tag beside its cloud has no hairline");
  await close();
});

test("the whole-life view names the heaviest, earliest memory of each galaxy in italics and no other cloud", async () => {
  const { page, close } = await open("/");
  await immersive(page);
  await page.waitForTimeout(5500);
  const shown = await keepClear(page, "whole life");
  const names = shown.filter((tag) => tag.name);
  const moments = years(content.life.milestones);
  const expected = content.life.periods.map((period) => {
    const peers = content.life.milestones.map((entry, i) => ({ entry, year: moments[i] })).filter(({ entry }) => entry.period === period);
    const top = Math.max(...peers.map(({ entry }) => entry.weight));
    return content.dict.en.life[peers.filter(({ entry }) => entry.weight === top).sort((a, b) => a.year - b.year)[0].entry.id].title;
  });
  assert.deepEqual(names.map((tag) => tag.title).sort(), expected.sort(), "one name per galaxy");
  assert.equal(shown.length, names.length, "only those clouds are named");
  assert.equal(await page.locator(".tag[data-name='1'] b").first().evaluate((node) => getComputedStyle(node).display), "none", "the date is left out of a name");
  assert.equal(await page.locator(".tag[data-name='1'] span").first().evaluate((node) => getComputedStyle(node).fontStyle), "italic");
  await goTo(page, "m-tapquo");
  await hud(page, TAPQUO);
  await settled(page);
  await page.waitForTimeout(600);
  assert.equal(await page.locator(".tag[data-on='1'][data-name='1']").count(), 0, "an open memory takes the names away");
  await close();
});

test("with a memory open the galaxy shows a dashed ring for each year, labelled, and they go with the memory", async () => {
  const { page, errors, close } = await open("/#m-satoshi");
  await hud(page, "05 / Home · Satoshi Ltd.");
  await settled(page);
  await page.waitForTimeout(900);
  assert.equal(await page.locator(".stage").getAttribute("data-gentle"), "1", "the first memory of a visit starts quietly");
  assert.equal(await page.locator("#scene").getAttribute("data-rings"), "", "no year rings while it is gentle");
  await wake(page);
  assert.equal(await page.locator("#scene").getAttribute("data-rings"), "5");
  const years = async () => page.locator(".ring-year").evaluateAll((nodes) => nodes.filter((node) => node.style.visibility === "visible" && +node.style.opacity > 0.5).map((node) => node.textContent));
  assert.deepEqual(await years(), ["2021", "2022", "2023", "2024", "2025"]);
  const where = await page.locator(".ring-year").evaluateAll((nodes) => nodes.filter((node) => node.style.visibility === "visible").map((node) => node.getBoundingClientRect()));
  const card = await box(page, ".card");
  for (const rect of where) assert.ok(!overlap(rect, card), "a year never sits behind the card");
  await goTo(page, "m-born");
  await hud(page, BORN);
  await settled(page);
  await page.waitForTimeout(900);
  assert.equal(await page.locator("#scene").getAttribute("data-rings"), "4");
  assert.deepEqual(await years(), ["1985", "1990", "1995", "2000"], "a long period shows every fifth year");
  await page.keyboard.press("Escape");
  await hud(page, "javi");
  await page.waitForTimeout(1500);
  assert.equal(await page.locator("#scene").getAttribute("data-rings"), "", "the whole-life view has no rings");
  assert.deepEqual(await years(), []);
  assert.deepEqual(errors, []);
  await close();
});

test("a line to a memory off the screen ends at the edge of the free area in a labelled marker that opens it, and the card flags the same memories", async () => {
  const { page, errors, close } = await open("/#m-satoshi");
  await hud(page, "05 / Home · Satoshi Ltd.");
  await settled(page);
  await page.waitForTimeout(900);
  const marks = await page.locator(".edge-mark:not([hidden])").evaluateAll((nodes) => nodes.map((node) => ({ text: node.textContent, memory: +node.dataset.memory, ...Object.fromEntries(["left", "right", "top", "bottom"].map((key) => [key, node.getBoundingClientRect()[key]])) })));
  assert.ok(marks.length >= 1 && marks.length <= 2, `${marks.length} markers`);
  assert.ok(marks.every((mark) => !/\+\d/.test(mark.text)), "a marker names one memory and never counts more");
  assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector(".edge-mark")).fontFamily === getComputedStyle(document.querySelector(".tag")).fontFamily), true, "markers use the serif of the tags");
  assert.ok(marks.some((mark) => mark.text.includes("The first version of Clonara")), "Clonara is off the screen");
  assert.equal(await page.locator(".stage").getAttribute("data-edges"), String(marks.length));
  const around = { card: await box(page, ".card"), explore: await box(page, ".explore"), rail: await box(page, ".rail") };
  for (const mark of marks) {
    assert.ok(mark.left >= 0 && mark.right <= 1280 && mark.top >= 0 && mark.bottom <= 800, `${mark.text} is on the screen`);
    for (const [name, rect] of Object.entries(around)) assert.ok(!overlap(mark, rect), `${mark.text} touches the ${name}`);
  }
  marks.forEach((mark, i) => marks.slice(i + 1).forEach((next) => assert.ok(!overlap(mark, next), `${mark.text} touches ${next.text}`)));
  const flagged = await page.locator(".card .related .peer[data-out='1']").evaluateAll((nodes) => nodes.map((node) => node.dataset.memory));
  for (const mark of marks) assert.ok(flagged.includes(String(mark.memory)), `${mark.text} is flagged in the card`);
  assert.ok((await page.locator(".card .related .peer:not([data-out='1'])").count()) >= 1, "memories on the screen carry no arrow");
  const placed = layout(content.life.milestones, { threads: content.life.threads });
  assert.equal(await page.locator("#scene").getAttribute("data-links"), String(strongest(placed, placed.findIndex((entry) => entry.id === "satoshi")).length), "only the strongest relations are drawn");
  const target = marks.find((mark) => mark.text.includes("The first version of Clonara"));
  await page.locator(`.edge-mark[data-memory='${target.memory}']`).click();
  await hud(page, "06 / Now · The first version of Clonara");
  assert.equal(await page.evaluate(() => location.hash), "#m-clonara");
  assert.deepEqual(errors, []);
  await close();
});

test("a related list that scrolls fades with a count of what is hidden, and a hovered or focused row rings its memory", async () => {
  const { page, errors, close } = await open("/#m-tapquo");
  await hud(page, TAPQUO);
  await settled(page);
  const block = page.locator(".card .related");
  assert.equal(await block.getAttribute("data-more"), "", "three rows never scroll");
  await page.locator(".card .expander").click();
  await page.waitForTimeout(200);
  const hidden = await block.getAttribute("data-more");
  assert.match(hidden, /^\d+ more$/);
  assert.ok(+hidden.split(" ")[0] >= 1);
  assert.equal(await block.evaluate((node) => getComputedStyle(node, "::after").content), `"${hidden}"`);
  await block.locator("ul").evaluate((node) => (node.scrollTop = node.scrollHeight));
  await page.waitForFunction(() => document.querySelector(".card .related").dataset.more === "", null, { timeout: 5000 }).catch(() => {});
  assert.equal(await block.getAttribute("data-more"), "", "nothing is hidden once the list is at its end");
  await block.locator("ul").evaluate((node) => (node.scrollTop = 0));
  await page.waitForFunction((wanted) => document.querySelector(".card .related").dataset.more === wanted, hidden, { timeout: 5000 }).catch(() => {});
  assert.equal(await block.getAttribute("data-more"), hidden);
  assert.equal(await page.locator("#scene").getAttribute("data-preview"), "");
  const classroom = peerRows(page).filter({ hasText: "The classroom" }).first();
  await classroom.hover();
  await page.waitForTimeout(300);
  assert.equal(await page.locator("#scene").getAttribute("data-preview"), String(indexOfMemory("teaching")));
  await page.mouse.move(700, 120);
  await page.waitForTimeout(300);
  assert.equal(await page.locator("#scene").getAttribute("data-preview"), "", "leaving the row restores the scene");
  await peerRows(page).filter({ hasText: "GitHub" }).first().focus();
  await page.waitForTimeout(300);
  assert.equal(await page.locator("#scene").getAttribute("data-preview"), String(indexOfMemory("github")), "keyboard focus does the same");
  await page.locator(".card-close").focus();
  await page.waitForTimeout(300);
  assert.equal(await page.locator("#scene").getAttribute("data-preview"), "");
  assert.deepEqual(errors, []);
  await close();
});

test("the finder is a wide palette with one-line rows and a preview of the highlighted memory, and it fits every screen", async () => {
  const { page, errors, close } = await open("/");
  await immersive(page);
  await page.waitForTimeout(3000);
  await page.locator("[data-find]").click();
  const finder = await box(page, ".finder");
  const bar = await box(page, ".explore .bar");
  assert.ok(finder.width >= 520, `the finder is ${finder.width.toFixed(0)} px wide`);
  assert.ok(finder.top >= bar.bottom, "it never covers the controls");
  const rows = await page.locator(".finder .results .peer").evaluateAll((nodes) => nodes.slice(0, 12).map((node) => node.getBoundingClientRect().height));
  assert.ok(rows.length >= 10 && Math.max(...rows) < 40, "every row is one line");
  await page.keyboard.type("tap");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(400);
  const focused = await page.evaluate(() => ({ title: document.activeElement.querySelector("span")?.textContent, memory: +document.activeElement.dataset.memory }));
  assert.equal(await page.locator(".finder .preview").getAttribute("data-on"), "1");
  assert.equal(await page.locator(".finder .preview strong").innerText(), focused.title);
  assert.equal(await page.locator("#scene").getAttribute("data-preview"), String(focused.memory));
  assert.ok((await page.locator(".finder .preview p").innerText()).length > 10);
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => document.querySelector(".finder").hidden);
  await page.waitForFunction(() => document.querySelector("#scene").dataset.preview === "");
  assert.notEqual(await page.locator(".hud").innerText(), "javi");
  await page.locator("[data-find]").click();
  await page.keyboard.press("Escape");
  assert.equal(await page.locator(".finder").isHidden(), true);
  assert.deepEqual(errors, []);
  await close();
  for (const [size, wide] of [[{ width: 1280, height: 640 }, true], [{ width: 390, height: 844 }, false]]) {
    const small = await open("/", { viewport: size, ...(wide ? {} : PHONE) });
    await immersive(small.page);
    await small.page.waitForTimeout(2500);
    await small.page.locator("[data-find]").click();
    const rect = await box(small.page, ".finder");
    assert.ok(rect.left >= 0 && rect.right <= size.width && rect.bottom <= size.height, `${size.width}x${size.height}: the finder stays on the screen (${JSON.stringify(rect)})`);
    if (wide) assert.ok(rect.width >= 520);
    else assert.ok(rect.width >= size.width - 30, "full width on a phone");
    await small.close();
  }
});

test("the minimap appears once the camera is zoomed in and the first memory is no longer gentle, frames what is on screen, flies to another galaxy and stays out of the way", async () => {
  const { page, errors, close } = await open("/");
  await immersive(page);
  await page.waitForTimeout(3000);
  assert.equal(await page.locator(".minimap").isHidden(), true, "none in the whole-life view");
  await goTo(page, "m-satoshi");
  await hud(page, "05 / Home · Satoshi Ltd.");
  await settled(page);
  await page.waitForTimeout(700);
  assert.equal(await page.locator(".minimap").isHidden(), true, "none while the first memory of the visit is gentle");
  await wake(page);
  await page.waitForFunction(() => !document.querySelector(".minimap").hidden);
  const map = await box(page, ".minimap");
  assert.ok(Math.abs(map.width - 104) <= 2 && Math.abs(map.height - 100) <= 2, `${map.width}x${map.height}`);
  for (const selector of [".card", ".rail", ".explore"]) assert.ok(!overlap(map, await box(page, selector)), `the minimap touches ${selector}`);
  assert.equal(await page.locator(".minimap").getAttribute("aria-hidden"), "true");
  assert.equal(await page.locator(".minimap").getAttribute("tabindex"), null, "not a keyboard stop");
  const polygon = await page.locator(".mini-frame").getAttribute("points");
  assert.equal(polygon.split(" ").length, 4);
  assert.ok(polygon.split(/[ ,]/).every((value) => Number.isFinite(+value)));
  assert.equal(await page.locator(".mini-galaxy").count(), content.life.periods.length);
  assert.equal(await page.locator(".mini-dot").count(), content.life.milestones.length);
  await keepClear(page, "with the minimap");
  const craft = await box(page, ".mini-galaxy >> nth=1");
  await page.mouse.click(craft.left + craft.width / 2, craft.top + craft.height / 2);
  await page.waitForFunction(() => document.querySelector(".hud").textContent.startsWith("02 / The craft"));
  await page.locator(".card-close").click();
  await hud(page, "javi");
  await page.waitForFunction(() => document.querySelector(".minimap").hidden);
  await goTo(page, "book");
  await hud(page, BOOK);
  await page.waitForFunction(() => document.querySelector(".minimap").hidden);
  assert.deepEqual(errors, []);
  await close();
  const phone = await open("/#m-tapquo", PHONE);
  await hud(phone.page, TAPQUO);
  assert.equal(await phone.page.locator(".minimap").isHidden(), true, "none on a narrow screen");
  await phone.close();
});

test("a line is cut only where its marker shows, so the card's arrows and the markers are the same memories, on every memory and at two heights", async () => {
  for (const size of [{ width: 1280, height: 800 }, { width: 1280, height: 640 }]) {
    const { page, errors, close } = await open("/", { viewport: size });
    await immersive(page);
    await page.waitForTimeout(3000);
    for (const id of ["m-satoshi", "m-clonara", "m-arca", "m-tapquo", "m-tortillas", "m-learning-ai", "m-hua-hin"]) {
      await goTo(page, id);
      await page.waitForFunction((wanted) => document.documentElement.dataset.at !== undefined && location.hash === `#${wanted}`, id);
      await settled(page);
      await page.waitForTimeout(500);
      const marked = await page.locator(".edge-mark:not([hidden])").evaluateAll((nodes) => nodes.map((node) => node.dataset.memory).sort());
      const flagged = await page.locator(".card .related .peer[data-out='1']").evaluateAll((nodes) => nodes.map((node) => node.dataset.memory).sort());
      assert.ok(flagged.every((memory) => marked.includes(memory)), `${size.height} ${id}: an arrow with no marker (${flagged} against ${marked})`);
      await keepClear(page, `${size.height} ${id}`);
    }
    assert.deepEqual(errors, []);
    await close();
  }
});

test("the minimap never reaches the card on a stacked layout, so the close button is never under it", async () => {
  for (const size of [{ width: 900, height: 600 }, { width: 800, height: 560 }, { width: 700, height: 560 }, { width: 600, height: 560 }]) {
    const { page, close } = await open("/#m-tapquo", { viewport: size });
    await hud(page, TAPQUO);
    await settled(page);
    await wake(page);
    await page.waitForTimeout(600);
    if (await page.locator(".minimap").isVisible()) assert.ok(!overlap(await box(page, ".minimap"), await box(page, ".card")), `${size.width}x${size.height}: the minimap sits on the card`);
    const close_ = await box(page, ".card-close");
    const onTop = await page.evaluate(({ x, y }) => document.elementFromPoint(x, y)?.closest(".minimap") !== null, { x: close_.left + close_.width / 2, y: close_.top + close_.height / 2 });
    assert.equal(onTop, false, `${size.width}x${size.height}: the close button is under the minimap`);
    await close();
  }
});

test("the frame on the minimap follows the camera", async () => {
  const { page, close } = await open("/#m-satoshi");
  await hud(page, "05 / Home · Satoshi Ltd.");
  await settled(page);
  await wake(page);
  await page.waitForTimeout(600);
  const before = await page.locator(".mini-frame").getAttribute("points");
  await page.mouse.move(700, 400);
  await page.mouse.wheel(0, 900);
  await settled(page);
  await page.waitForTimeout(600);
  const after = await page.locator(".mini-frame").getAttribute("points");
  assert.notEqual(after, before, "zooming out widens the frame");
  const area = (points) => {
    const p = points.split(" ").map((pair) => pair.split(",").map(Number));
    return Math.abs(p.reduce((sum, [x, y], i) => sum + x * p[(i + 1) % p.length][1] - p[(i + 1) % p.length][0] * y, 0)) / 2;
  };
  assert.ok(area(after) > area(before) * 1.3, `the frame grew from ${area(before).toFixed(0)} to ${area(after).toFixed(0)}`);
  await close();
});

test("if the scene throws while it runs the page falls back to the flat page and leaves the keyboard to the browser", async () => {
  const { page, close } = await open("/", {
    before: (context) =>
      context.addInitScript(() => {
        const original = Element.prototype.getBoundingClientRect;
        Element.prototype.getBoundingClientRect = function () {
          if (window.__boom && this.classList?.contains("card")) throw new Error("boom");
          return original.call(this);
        };
      }),
  });
  await immersive(page);
  await page.evaluate(() => (window.__boom = true));
  await flat(page);
  assert.equal(await page.locator("html").evaluate((node) => node.classList.contains("immersive")), false);
  const prevented = await page.evaluate(() => {
    const event = new KeyboardEvent("keydown", { key: "PageDown", bubbles: true, cancelable: true });
    document.body.dispatchEvent(event);
    return event.defaultPrevented;
  });
  assert.equal(prevented, false, "no handler of the scene is left on the page");
  await close();
});

test("on a phone the header is one row of 56 px with Find, Surprise me and More, and the rest waits in a sheet", async () => {
  const { page, errors, close } = await open("/", PHONE);
  await immersive(page);
  await page.waitForTimeout(1500);
  const header = await box(page, ".masthead");
  assert.ok(header.height <= 56.5, `the header is ${header.height} px`);
  for (const selector of ["[data-find]", "[data-surprise]", "[data-more-toggle]", ".brand"]) {
    const rect = await box(page, selector);
    assert.ok(rect.bottom <= 56.5 && rect.left >= 0 && rect.right <= 390, `${selector} sits in the header (${JSON.stringify(rect)})`);
    assert.ok(await page.locator(selector).isVisible(), selector);
  }
  const across = await page.locator(".masthead [data-find], .masthead [data-surprise], .masthead [data-more-toggle]").evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().top));
  assert.ok(Math.max(...across) - Math.min(...across) < 4, "all on one row");
  for (const selector of ["[data-legend-toggle]", "[data-sound]", "[data-guide-toggle]", "[data-theme-toggle]", ".lang"]) assert.equal(await page.locator(selector).first().isVisible(), false, `${selector} waits in the sheet`);
  assert.equal(await page.locator("[data-more-toggle]").getAttribute("aria-expanded"), "false");
  await page.locator("[data-more-toggle]").click();
  assert.equal(await page.locator("[data-more-toggle]").getAttribute("aria-expanded"), "true");
  for (const selector of ["[data-legend-toggle]", "[data-guide-toggle]", "[data-theme-toggle]", ".lang"]) assert.equal(await page.locator(selector).first().isVisible(), true, `${selector} shows in the sheet`);
  const sheet = await box(page, ".sheet");
  assert.ok(sheet.left >= 0 && sheet.right <= 390 && sheet.top >= 50 && sheet.bottom < 400, `the sheet is on the screen (${JSON.stringify(sheet)})`);
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("[data-more-toggle]").getAttribute("aria-expanded"), "false");
  assert.equal(await page.evaluate(() => document.activeElement.hasAttribute("data-more-toggle")), true, "Escape hands the focus back to the button");
  await page.locator("[data-more-toggle]").click();
  await page.mouse.click(200, 300);
  assert.equal(await page.locator("[data-more-toggle]").getAttribute("aria-expanded"), "false", "a press elsewhere closes it");
  await page.locator("[data-more-toggle]").click();
  await page.locator("[data-theme-toggle]").click();
  assert.equal(await page.locator("html").getAttribute("data-theme"), "light");
  assert.equal(await page.locator("[data-more-toggle]").getAttribute("aria-expanded"), "false", "choosing something closes the sheet");
  await page.locator("[data-more-toggle]").click();
  await page.locator("[data-legend-toggle]").click();
  assert.equal(await page.locator(".explore").getAttribute("data-legend"), "open");
  assert.ok(await page.locator(".legend button").first().isVisible());
  const card = await box(page, ".card");
  const email = await box(page, ".card");
  assert.ok(card.bottom <= 844 && email.top >= 56, "the card stays on the screen under the one-row header");
  assert.deepEqual(errors, []);
  await close();
  const short = await open("/", { viewport: { width: 1280, height: 640 } });
  await immersive(short.page);
  assert.ok((await box(short.page, ".masthead")).height <= 90, "on a laptop the header is one row too");
  assert.deepEqual(await short.page.locator(".explore .bar .tool:visible").allInnerTexts(), [content.dict.en.ui.explore.find, content.dict.en.ui.explore.surprise, "⋯"].map((text) => (text === "⋯" ? text : text.toUpperCase())), "the same three on a laptop");
  for (const selector of ["[data-legend-toggle]", "[data-guide-toggle]", "[data-theme-toggle]", ".lang"]) assert.equal(await short.page.locator(selector).first().isVisible(), false, `${selector} waits in the sheet on a laptop`);
  await short.page.locator("[data-more-toggle]").click();
  for (const selector of ["[data-legend-toggle]", "[data-guide-toggle]", "[data-theme-toggle]", ".lang"]) assert.equal(await short.page.locator(selector).first().isVisible(), true, `${selector} shows in the sheet on a laptop`);
  await short.close();
});

test("the guide explains the marks, opens with a button or the question mark, never covers the card and closes with Escape, a press on the sky or another panel", async () => {
  const { page, errors, close } = await open("/");
  await immersive(page);
  await page.waitForTimeout(2000);
  const button = page.locator("[data-guide-toggle]");
  assert.equal(await page.locator(".guide").isHidden(), true);
  assert.equal(await button.isVisible(), false, "the button waits in the sheet");
  await (await reveal(page, "[data-guide-toggle]")).click();
  assert.equal(await button.getAttribute("aria-expanded"), "true");
  assert.equal(await page.locator(".guide li").count(), 6);
  assert.match(await page.locator(".guide").innerText(), /A cloud is a memory/);
  const guide = await box(page, ".guide");
  assert.ok(!overlap(guide, await box(page, ".card")), "the guide never covers the card");
  assert.ok(guide.right <= 1280 && guide.bottom <= 800);
  await page.keyboard.press("Escape");
  assert.equal(await page.locator(".guide").isHidden(), true);
  assert.equal(await page.evaluate(() => document.activeElement.hasAttribute("data-more-toggle")), true, "the sheet handed the focus to More");
  await page.mouse.click(700, 500);
  await page.keyboard.press("?");
  assert.equal(await page.locator(".guide").isVisible(), true, "the question mark opens it");
  await page.mouse.move(900, 600);
  await page.mouse.down();
  await page.mouse.up();
  assert.equal(await page.locator(".guide").isHidden(), true, "a press on the sky closes it");
  await page.keyboard.press("?");
  await page.locator("[data-find]").click();
  assert.equal(await page.locator(".guide").isHidden(), true, "the finder takes its place");
  await page.keyboard.type("?");
  assert.equal(await page.locator(".guide").isHidden(), true, "a question mark typed in the finder is just a character");
  await page.keyboard.press("Escape");
  await openFilters(page);
  await page.keyboard.press("?");
  assert.equal(await page.locator(".explore").getAttribute("data-legend"), "", "the thread filters give way to the guide");
  await close();
  for (const [size, label] of [[{ width: 1280, height: 640 }, "laptop"], [{ width: 1024, height: 700 }, "narrow laptop"]]) {
    const small = await open("/#m-tapquo", { viewport: size });
    await hud(small.page, TAPQUO);
    await small.page.keyboard.press("?");
    assert.ok(!overlap(await box(small.page, ".guide"), await box(small.page, ".card")), `${label}: the guide covers the card`);
    await small.close();
  }
  const phone = await open("/#m-tapquo", PHONE);
  await hud(phone.page, TAPQUO);
  await phone.page.locator("[data-more-toggle]").click();
  await phone.page.locator("[data-guide-toggle]").click();
  const [phoneGuide, phoneCard] = [await box(phone.page, ".guide"), await box(phone.page, ".card")];
  assert.ok(phoneGuide.bottom <= phoneCard.top + 1, `on a phone the guide ends at ${phoneGuide.bottom} and the card starts at ${phoneCard.top}`);
  assert.ok(phoneGuide.left >= 0 && phoneGuide.right <= 390);
  assert.deepEqual(errors, []);
  await phone.close();
});

test("H hides everything but the sky and any move, press or other key brings it back, without ever hijacking a field", async () => {
  const { page, errors, close } = await open("/#m-tapquo");
  await hud(page, TAPQUO);
  await settled(page);
  const hidden = () => page.evaluate(() => [".masthead", ".card", ".rail", ".minimap", ".hud"].map((selector) => { const node = document.querySelector(selector); return !node || node.hidden || getComputedStyle(node).visibility === "hidden" || getComputedStyle(node).opacity === "0"; }));
  assert.ok((await hidden()).slice(0, 3).every((value) => !value), "all shown to begin with");
  await page.keyboard.press("h");
  await page.waitForTimeout(900);
  assert.equal(await page.locator("html").getAttribute("data-focus"), "1");
  assert.ok((await hidden()).every(Boolean), "the interface is gone");
  assert.equal(await page.locator(".labels").evaluate((node) => getComputedStyle(node).opacity), "0", "and so are the labels");
  assert.match(await page.locator(".stage [role=status]").innerText(), /Interface hidden/);
  const canvas = await box(page, "#scene");
  assert.ok(canvas.width >= 1280 && canvas.height >= 800, "the sky is still all there");
  await page.mouse.move(640, 400);
  await page.mouse.move(760, 460);
  await page.waitForTimeout(900);
  assert.equal(await page.locator("html").getAttribute("data-focus"), "", "moving the pointer brings it back");
  assert.ok((await hidden()).slice(0, 3).every((value) => !value));
  assert.equal(await page.locator(".stage [role=status]").innerText(), "");
  await page.keyboard.press("H");
  assert.equal(await page.locator("html").getAttribute("data-focus"), "1", "capital H too");
  await page.keyboard.press("h");
  assert.equal(await page.locator("html").getAttribute("data-focus"), "", "and it toggles");
  await page.keyboard.press("h");
  await page.keyboard.press("ArrowRight");
  assert.equal(await page.locator("html").getAttribute("data-focus"), "", "another key ends it and does its own work");
  await page.keyboard.press("h");
  await page.mouse.move(800, 500);
  await page.mouse.down();
  await page.mouse.up();
  assert.equal(await page.locator("html").getAttribute("data-focus"), "", "a press ends it");
  await page.locator("[data-find]").click();
  await page.keyboard.type("hhh");
  assert.equal(await page.locator("html").getAttribute("data-focus"), "", "typing h in the finder is just typing");
  assert.equal(await page.locator("#finder-input").inputValue(), "hhh");
  await page.keyboard.press("Escape");
  await page.locator("#scene").click({ position: { x: 900, y: 600 } });
  await page.keyboard.press("h");
  await page.locator("[data-theme-toggle]").evaluate((node) => node.click());
  assert.deepEqual(errors, []);
  await close();
});

const audioStub = (context) =>
  context.addInitScript(() => {
    window.__audio = { time: 0, contexts: 0, oscillators: [], sources: 0, convolvers: 0, resumed: 0, suspended: 0, gains: [], intervals: 0 };
    const param = (name) => ({ value: 0, name, setValueAtTime() {}, linearRampToValueAtTime() {}, exponentialRampToValueAtTime() {}, setTargetAtTime(value) { window.__audio.gains.push([name, value]); }, cancelScheduledValues() {} });
    const node = (extra = {}) => ({ connect() {}, disconnect() {}, start() { window.__audio.oscillators.push(this.frequency?.value); }, stop() {}, gain: param("gain"), frequency: param("frequency"), detune: param("detune"), Q: param("q"), ...extra });
    window.AudioContext = class {
      constructor() {
        window.__audio.contexts++;
        this.sampleRate = 8000;
        this.destination = node();
        this.state = "suspended";
      }
      get currentTime() { return window.__audio.time; }
      createGain() { return node(); }
      createOscillator() { return node(); }
      createBiquadFilter() { return node(); }
      createConvolver() { window.__audio.convolvers++; return node(); }
      createBuffer(channels, length) { return { getChannelData: () => new Float32Array(length) }; }
      createBufferSource() { return node({ start() { window.__audio.sources++; } }); }
      resume() { window.__audio.resumed++; return Promise.resolve(); }
      suspend() { window.__audio.suspended++; return Promise.resolve(); }
    };
  });

test("sound is on by default but waits for the first gesture, plays a pluck for a memory and a swell for the rings, and stops when turned off", async () => {
  const { page, errors, close } = await open("/", { before: audioStub });
  await immersive(page);
  await page.waitForTimeout(1500);
  const button = page.locator("[data-sound]");
  assert.equal(await button.isVisible(), false, "the button waits in the sheet");
  assert.equal(await button.evaluate((node) => node.hidden), false, "and is offered where the browser has Web Audio");
  assert.equal(await button.getAttribute("aria-pressed"), "true", "on by default");
  assert.equal(await button.evaluate((node) => getComputedStyle(node).backgroundColor), "rgba(0, 0, 0, 0)", "pressed is never drawn inverted");
  await goTo(page, "m-tapquo");
  await hud(page, TAPQUO);
  await page.mouse.move(700, 450);
  assert.equal(await page.evaluate(() => window.__audio.contexts), 0, "a browser needs a gesture, so nothing is created before one");
  await page.mouse.click(700, 450);
  assert.equal(await button.getAttribute("aria-pressed"), "true");
  assert.equal(await page.evaluate(() => window.__audio.contexts), 1);
  assert.ok(await page.evaluate(() => window.__audio.resumed) >= 1, "it is resumed by the gesture");
  const bed = await page.evaluate(() => window.__audio.oscillators.length);
  assert.ok(bed >= 8 && bed <= 24, `the calm bed has a bounded ${bed} voices`);
  const heard = await page.evaluate(() => window.__audio.oscillators);
  assert.ok(heard.every((frequency) => frequency < 1100), "none of them above the soft range");
  assert.ok(heard.some((frequency) => frequency > 30 && frequency < 80), "a deep sub");
  assert.equal(await page.evaluate(() => window.__audio.convolvers), 1, "one room for everything");
  assert.equal(await page.evaluate(() => window.__audio.sources), 1, "one bed of air");
  await page.mouse.move(2, 2);
  await page.mouse.move(4, 6);
  await page.waitForTimeout(400);
  assert.equal(await page.evaluate(() => window.__audio.oscillators.length), bed, "moving over empty sky adds nothing");
  await page.evaluate(() => (window.__audio.time += 1));
  await goTo(page, "m-github");
  await hud(page, "02 / The craft · GitHub");
  const plucked = await page.evaluate(() => window.__audio.oscillators.length);
  assert.ok(plucked > bed, "opening a memory plays a note");
  assert.ok(await page.evaluate(() => Math.max(...window.__audio.gains.map((gain) => gain[1])) <= 0.7), "no level is ever set above 0.7 of full scale");
  const bell = await page.evaluate((from) => window.__audio.oscillators.slice(from), bed);
  assert.ok(bell.length >= 2 && bell.length <= 5, "a bell has a few partials");
  assert.ok(bell[0] > 280 && bell[0] < 900, "its pitch is in the pentatonic range");
  assert.ok(bell.every((frequency) => frequency < 4000), "no shrill partial");
  assert.equal(await page.evaluate(() => window.__audio.sources), 1, "the first note after turning it on has no sweep before it");
  await page.evaluate(() => (window.__audio.time += 1));
  await goTo(page, "m-tapquo");
  await hud(page, TAPQUO);
  assert.equal(await page.evaluate(() => window.__audio.sources), 2, "flying to another galaxy adds one soft sweep of air");
  const flown = await page.evaluate(() => window.__audio.oscillators.length);
  await goTo(page, "m-github");
  await hud(page, "02 / The craft · GitHub");
  assert.equal(await page.evaluate(() => window.__audio.oscillators.length), flown, "two notes within a moment are one note");
  await page.evaluate(() => (window.__audio.time += 1));
  await goTo(page, "book");
  await hud(page, BOOK);
  const swell = await page.evaluate(() => window.__audio.oscillators.slice(-2));
  assert.ok(swell.every((frequency) => frequency < 300), "the rings get a low swell");
  await (await reveal(page, "[data-sound]")).click();
  assert.equal(await button.getAttribute("aria-pressed"), "false");
  assert.ok((await page.evaluate(() => window.__audio.gains.at(-1)))[1] === 0, "the volume fades to nothing");
  const before = await page.evaluate(() => window.__audio.oscillators.length);
  await goTo(page, "m-tapquo");
  await hud(page, TAPQUO);
  assert.equal(await page.evaluate(() => window.__audio.oscillators.length), before, "muted, it plays nothing");
  await page.waitForFunction(() => window.__audio.suspended >= 1, null, { timeout: 9000 });
  assert.deepEqual(errors, []);
  await close();
  const quiet = await open("/", { before: (context) => context.addInitScript(() => { delete window.AudioContext; delete window.webkitAudioContext; }) });
  await immersive(quiet.page);
  await quiet.page.locator("[data-more-toggle]").click();
  assert.equal(await quiet.page.locator("[data-sound]").isVisible(), false, "no button where there is no Web Audio");
  await quiet.close();
});

test("pressing the sound button as the very first gesture turns it off and nothing ever plays", async () => {
  const { page, errors, close } = await open("/", { before: audioStub });
  await immersive(page);
  await page.waitForTimeout(1200);
  const button = page.locator("[data-sound]");
  assert.equal(await button.getAttribute("aria-pressed"), "true");
  await page.evaluate(() => document.querySelector("[data-sound]").click());
  assert.equal(await button.getAttribute("aria-pressed"), "false");
  await page.mouse.click(700, 450);
  await page.keyboard.press("ArrowRight");
  assert.equal(await page.evaluate(() => window.__audio.contexts), 0, "it never starts once it was switched off");
  await (await reveal(page, "[data-sound]")).click();
  assert.equal(await button.getAttribute("aria-pressed"), "true");
  assert.equal(await page.evaluate(() => window.__audio.contexts), 1, "and the button can turn it on again");
  assert.deepEqual(errors, []);
  await close();
});

test("opening the sheet is itself a gesture that starts the sound, and the button inside then turns it off", async () => {
  const { page, errors, close } = await open("/", { before: audioStub });
  await immersive(page);
  await page.waitForTimeout(1200);
  assert.equal(await page.evaluate(() => window.__audio.contexts), 0);
  const button = await reveal(page, "[data-sound]");
  assert.equal(await page.evaluate(() => window.__audio.contexts), 1, "the click on More started it");
  assert.equal(await button.getAttribute("aria-pressed"), "true");
  await button.click();
  assert.equal(await button.getAttribute("aria-pressed"), "false");
  assert.deepEqual(errors, []);
  await close();
});

const askIds = [content.life.milestones[0].id, "github", "tapquo", "satoshi", content.life.milestones.at(-1).id];
const withAsks = renderSite({
  ...content,
  life: { ...content.life, questions: [{ id: "q1", memories: askIds.slice(0, 2) }, { id: "q2", memories: askIds.slice(1, 4) }, { id: "q3", memories: [askIds[4]] }, { id: "q4", memories: askIds }, { id: "q5", memories: [askIds[2]] }] },
  dict: Object.fromEntries(["en", "es"].map((lang) => [lang, { ...content.dict[lang], asks: Object.fromEntries([1, 2, 3, 4, 5].map((n) => [`q${n}`, lang === "es" ? `¿Pregunta número ${n} sobre mi vida?` : `Question number ${n} about my life?`])) }])),
});
const withQuestions = (lang = "en") => async (context) => {
  await context.route(`${base}${lang === "es" ? "/es/" : "/"}`, (route) => route.fulfill({ contentType: "text/html", body: withAsks.get(lang === "es" ? "es/index.html" : "index.html") }));
};

test("choosing a question lights its memories and draws a line from each to the clone's ring; the same question, Escape or leaving lets go", async () => {
  const { page, errors, close } = await open("/", { before: withQuestions() });
  await immersive(page);
  await page.waitForTimeout(1200);
  await goTo(page, "clone");
  await hud(page, CLONE);
  const buttons = page.locator(".card button.ask-q");
  assert.equal(await buttons.count(), 5);
  assert.equal(await page.locator(".card .ask-answers").evaluateAll((nodes) => nodes.every((node) => getComputedStyle(node).display === "none")), true, "the card shows the questions, not the lists");
  assert.equal(await page.locator("#scene").getAttribute("data-jumps"), "", "no lines before a choice");
  await buttons.nth(1).click();
  assert.equal(await buttons.nth(1).getAttribute("aria-pressed"), "true");
  assert.equal(await page.locator("html").evaluate(() => document.querySelector(".stage").dataset.asked), "q2");
  await page.waitForFunction(() => document.querySelector("#scene").dataset.jumps === "3", null, { timeout: 8000 });
  const spoken = await page.locator(".card > [role=status].visually-hidden").textContent();
  assert.match(spoken, /^3 memories light up: /, "a screen reader hears which memories");
  await buttons.nth(3).click();
  assert.equal(await buttons.nth(1).getAttribute("aria-pressed"), "false", "one question at a time");
  await page.waitForFunction(() => document.querySelector("#scene").dataset.jumps === "5", null, { timeout: 8000 });
  await buttons.nth(3).click();
  assert.equal(await buttons.nth(3).getAttribute("aria-pressed"), "false");
  await page.waitForFunction(() => document.querySelector("#scene").dataset.jumps === "", null, { timeout: 8000 });
  await buttons.nth(0).focus();
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => document.querySelector("#scene").dataset.jumps === "2", null, { timeout: 8000 });
  await page.keyboard.press("Escape");
  assert.equal(await buttons.nth(0).getAttribute("aria-pressed"), "false", "Escape lets go");
  assert.equal(await page.locator(".hud").textContent(), CLONE, "and stays at the clone");
  await page.waitForFunction(() => document.querySelector("#scene").dataset.jumps === "", null, { timeout: 8000 });
  await buttons.nth(2).click();
  await page.waitForFunction(() => document.querySelector("#scene").dataset.jumps === "1", null, { timeout: 8000 });
  await page.locator(".step[data-step=previous]").click();
  await hud(page, BOOK);
  await page.waitForFunction(() => document.querySelector("#scene").dataset.jumps === "", null, { timeout: 8000 });
  assert.equal(await page.evaluate(() => document.querySelector(".stage").dataset.asked), "");
  assert.deepEqual(errors, []);
  await close();
});

test("with five questions the clone's card still shows its email field on laptop and phone screens, in both languages", async () => {
  for (const lang of ["en", "es"]) {
    for (const [width, height] of [[1366, 657], [1280, 640], [390, 844], [360, 640]]) {
      const mobile = width < 600;
      const { page, close } = await open(lang === "es" ? "/es/" : "/", { viewport: { width, height }, locale: lang === "es" ? "es-ES" : "en-US", hasTouch: mobile, isMobile: mobile, before: withQuestions(lang) });
      await immersive(page);
      await goTo(page, "clone");
      await hud(page, lang === "es" ? "08 / Habla conmigo" : CLONE);
      await page.waitForTimeout(500);
      const where = `${lang} ${width}x${height}`;
      const [card, field] = [await box(page, ".card"), await box(page, "#waitlist-clone-email")];
      assert.ok(card.left >= -1 && card.right <= width + 1 && card.top >= 0 && card.bottom <= height + 1, `${where}: the card is off screen`);
      assert.ok(field.top >= card.top - 1 && field.bottom <= card.bottom + 1 && field.bottom <= height, `${where}: the email field is out of view (${field.top.toFixed(0)}–${field.bottom.toFixed(0)} in ${card.top.toFixed(0)}–${card.bottom.toFixed(0)})`);
      await close();
    }
  }
});

const withDate = (date) => async (context) => {
  const html = renderSite({ ...content, site: { ...content.site, book: { ...content.site.book, date } } }).get("index.html");
  await context.addInitScript(() => {
    const Real = Date;
    const fixed = new Real(2026, 9, 4, 12).getTime();
    window.Date = class extends Real {
      constructor(...args) {
        super(...(args.length ? args : [fixed]));
      }
      static now() {
        return fixed;
      }
    };
  });
  await context.route(`${base}/`, (route) => route.fulfill({ contentType: "text/html", body: html }));
};

test("a book date draws the months to go in the book's card, with a scale, and a label on the way to its ring; a past date draws nothing", async () => {
  const { page, errors, close } = await open("/", { before: withDate("2027-06") });
  await immersive(page);
  await page.waitForTimeout(1500);
  assert.equal(await page.locator(".countdown-mark").textContent(), "in 8 months");
  await goTo(page, "book");
  await hud(page, BOOK);
  assert.equal(await page.locator(".card .countdown").innerText().then((text) => text.replace(/\s+/g, " ").trim().toLowerCase()), "expected jun 2027 · in 8 months");
  assert.equal(await page.locator(".card .countdown .scale").evaluate((node) => node.style.getPropertyValue("--months")), "8");
  assert.equal(await page.locator(".card .countdown .scale").evaluate((node) => node.getBoundingClientRect().width), 80, "ten pixels a month");
  assert.deepEqual(errors, []);
  await close();

  const flat = await open("/", { before: withDate("2027-06"), reducedMotion: "reduce" });
  await flat.page.waitForSelector(".countdown .remaining");
  assert.equal(await flat.page.locator(".countdown .remaining").textContent(), " · in 8 months");
  assert.equal(await flat.page.locator(".countdown").isVisible(), true, "the flat page tells it too");
  await flat.close();

  const past = await open("/", { before: withDate("2026-01") });
  await immersive(past.page);
  assert.equal(await past.page.locator(".countdown-mark").count(), 0, "no label for a date that has passed");
  await goTo(past.page, "book");
  await hud(past.page, BOOK);
  assert.equal(await past.page.locator(".card .countdown").isVisible(), false, "and no line in the card");
  assert.equal(await past.page.locator(".story .countdown").evaluate((node) => node.hidden), true, "it is hidden in the document");
  await past.close();
});

test("a mouse over the sky gently pushes the fine dust, which settles when it leaves, and a touch screen never does", async () => {
  const { page, errors, close } = await open("/");
  await immersive(page);
  await page.waitForTimeout(1500);
  const push = () => page.locator("#scene").getAttribute("data-pointer").then(Number);
  assert.equal(await push(), 0, "nothing before the pointer arrives");
  await page.mouse.move(640, 400);
  await page.mouse.move(660, 410);
  await page.waitForFunction(() => Number(document.querySelector("#scene").dataset.pointer) > 0.9, null, { timeout: 5000 });
  await page.mouse.move(2, 790);
  await page.evaluate(() => document.querySelector("#scene").dispatchEvent(new PointerEvent("pointerleave")));
  await page.waitForFunction(() => Number(document.querySelector("#scene").dataset.pointer) < 0.05, null, { timeout: 5000 });
  assert.deepEqual(errors, []);
  await close();

  const touch = await open("/", PHONE);
  await immersive(touch.page);
  await touch.page.waitForTimeout(1200);
  await touch.page.touchscreen.tap(200, 300);
  await touch.page.waitForTimeout(800);
  assert.equal(Number(await touch.page.locator("#scene").getAttribute("data-pointer")), 0, "off on touch screens");
  await touch.close();
});

test("the galaxies turn slowly after the opening, the memory in view follows its cloud, and the quality can be forced", async () => {
  const { page, errors, close } = await open("/#m-satoshi");
  await hud(page, "05 / Home · Satoshi Ltd.");
  const spin = () => page.locator("#scene").getAttribute("data-spin").then(Number);
  assert.equal(await spin(), 0, "at rest during the opening");
  await page.waitForTimeout(9500);
  const first = await spin();
  const ring = await page.locator("#scene").getAttribute("data-ring");
  await page.waitForTimeout(4000);
  const second = await spin();
  assert.ok(first > 0, "it has started");
  assert.ok(second > first, `it keeps turning: ${first} then ${second}`);
  assert.ok(second < 0.2, "slowly");
  assert.notEqual(await page.locator("#scene").getAttribute("data-ring"), ring, "the ring on the memory in view moves with its cloud");
  assert.equal(await page.locator("#scene").getAttribute("data-quality"), "0", "tests ask for the full life");
  assert.deepEqual(errors, []);
  await close();
  const full = await open("/?quality=full");
  await immersive(full.page);
  await full.page.waitForTimeout(6000);
  const fullDots = await dotsDrawn(full.page);
  assert.equal(await full.page.locator("#scene").getAttribute("data-quality"), "0");
  await full.close();
  const low = await open("/?quality=low");
  await immersive(low.page);
  await low.page.waitForTimeout(6000);
  assert.equal(await low.page.locator("#scene").getAttribute("data-quality"), "2");
  const lowDots = await dotsDrawn(low.page);
  assert.ok(lowDots > 300, `${lowDots} pixels: the life is still there`);
  assert.ok(lowDots < fullDots * 0.98, `${lowDots} pixels against ${fullDots}: fewer dots at the lowest tier`);
  await low.close();
  const auto = await open("/", { before: (context) => context.addInitScript(() => (window.__adaptive = true)) });
  await immersive(auto.page);
  await auto.page.waitForTimeout(16000);
  await auto.close();
});

test("after a pause nobody touches the sky tours a few memories, a touch ends it where the reader is, and it never starts at a memory or with something open", async () => {
  const { page, errors, close } = await open("/");
  await immersive(page);
  await page.waitForTimeout(1500);
  await page.locator(".explore").evaluate((node) => {
    node.dataset.idle = "1.5";
    node.dataset.tourHold = "1.2";
  });
  const names = new Set();
  const first = Date.now();
  while (Date.now() - first < 9000 && names.size < 2) {
    await page.waitForTimeout(250);
    const label = await page.locator(".hud").innerText();
    if (label !== "javi") names.add(label);
  }
  assert.ok(names.size >= 2, `the tour opened ${[...names].join(" | ")}`);
  assert.ok([...names].every((label) => /^0\d \//.test(label)), "memories, one after another");
  assert.equal(await page.evaluate(() => location.hash), "", "the address is left alone");
  await page.mouse.move(600, 300);
  await page.mouse.down();
  await page.mouse.up();
  const stopped = await page.locator(".hud").innerText();
  await page.waitForTimeout(3500);
  assert.equal(await page.locator(".hud").innerText(), stopped, "a touch ends the tour and keeps the reader where they are");
  await page.keyboard.press("Home");
  await hud(page, "javi");
  await page.locator("[data-find]").click();
  await page.waitForTimeout(3500);
  assert.equal(await page.locator(".hud").innerText(), "javi", "never while the finder is open");
  assert.deepEqual(errors, []);
  await close();
  const busy = await open("/#m-tapquo");
  await hud(busy.page, TAPQUO);
  await busy.page.locator(".explore").evaluate((node) => (node.dataset.idle = "1"));
  await busy.page.waitForTimeout(4000);
  assert.equal(await busy.page.locator(".hud").innerText(), TAPQUO, "nor from a memory");
  await busy.close();
});

test("a first animation frame that arrives before the clock started cannot freeze the camera", async () => {
  const { page, errors, close } = await open("/#m-born", {
    before: (context) =>
      context.addInitScript(() => {
        const original = window.requestAnimationFrame.bind(window);
        let first = true;
        window.requestAnimationFrame = (callback) => original((now) => callback(first ? ((first = false), now - 4000) : now));
      }),
  });
  await hud(page, BORN);
  await settled(page);
  const view = await page.locator("#scene").getAttribute("data-view");
  assert.doesNotMatch(view, /NaN|Infinity|e\+/, view);
  await wake(page);
  await page.waitForFunction(() => document.querySelector(".mini-frame")?.getAttribute("points"), null, { timeout: 5000 });
  assert.ok((await page.locator(".mini-frame").getAttribute("points")).split(/[ ,]/).every((value) => Number.isFinite(+value)));
  assert.deepEqual(errors, []);
  await close();
});

test("between 901 and 1199 px the header stays on one row, the controls fold into the sheet and neither they nor the guide touch the card", async () => {
  for (const [lang, widths] of [["en", [901, 1024, 1100, 1180]], ["es", [901, 1024, 1180]]]) {
    for (const width of widths) {
      const { page, errors, close } = await open(lang === "es" ? "/es/#m-tapquo" : "/#m-tapquo", { viewport: { width, height: 700 }, locale: lang === "es" ? "es-ES" : "en-US" });
      await hud(page, lang === "es" ? "03 / TapQuo · TapQuo" : TAPQUO);
      await settled(page);
      const header = await box(page, ".masthead");
      assert.ok(header.height <= 90, `${lang} ${width}: the header is ${header.height} px`);
      const card = await box(page, ".card");
      for (const selector of ["[data-find]", "[data-surprise]", "[data-more-toggle]"]) assert.ok(!overlap(await box(page, selector), card), `${lang} ${width}: ${selector} touches the card`);
      assert.equal(await page.locator("[data-more-toggle]").isVisible(), true, `${lang} ${width}: More shows`);
      await page.locator("[data-more-toggle]").click();
      await page.locator("[data-guide-toggle]").click();
      assert.ok(!overlap(await box(page, ".guide"), card), `${lang} ${width}: the guide covers the card`);
      await page.keyboard.press("Escape");
      await page.locator("[data-more-toggle]").click();
      const sheet = await box(page, ".sheet");
      assert.ok(sheet.right <= width && sheet.bottom < 400, `${lang} ${width}: the sheet is on the screen`);
      assert.ok(await page.locator("[data-theme-toggle]").isVisible() && (await page.locator(".lang").isVisible()));
      assert.deepEqual(errors, []);
      await close();
    }
  }
});

test("choosing something in the sheet hands the focus on, Tab out of it closes it, and a filter shows on the More button", async () => {
  const { page, close } = await open("/", PHONE);
  await immersive(page);
  await page.waitForTimeout(1200);
  const more = page.locator("[data-more-toggle]");
  await more.click();
  await page.locator("[data-theme-toggle]").click();
  assert.equal(await page.evaluate(() => document.activeElement.hasAttribute("data-more-toggle")), true, "the focus goes back to the button after a choice");
  await more.click();
  await page.locator("[data-legend-toggle]").click();
  assert.equal(await page.evaluate(() => document.activeElement.closest(".legend") !== null), true, "and into the filters after Filter");
  await page.locator(".legend button", { hasText: "Home" }).first().click();
  assert.equal(await more.getAttribute("data-active"), "1", "a filter is marked on the button");
  assert.match(await more.getAttribute("aria-label"), /Home/);
  await more.click();
  await page.locator(".explore [data-unfilter]").click();
  assert.equal(await more.getAttribute("data-active"), "");
  assert.equal(await more.getAttribute("aria-label"), "More");
  await more.focus();
  await page.keyboard.press("Enter");
  assert.equal(await more.getAttribute("aria-expanded"), "true");
  const inside = await page.locator("#sheet button:visible, #sheet a:visible").count();
  for (let i = 0; i < inside; i++) await page.keyboard.press("Tab");
  assert.equal(await more.getAttribute("aria-expanded"), "true", "still open while the focus is on the last control");
  await page.keyboard.press("Tab");
  assert.equal(await more.getAttribute("aria-expanded"), "false", "tabbing out of the sheet closes it");
  await close();
});

test("Escape in focus mode only brings the interface back, and holding H does not flicker it", async () => {
  const { page, close } = await open("/#m-born");
  await hud(page, BORN);
  await settled(page);
  await page.keyboard.press("h");
  assert.equal(await page.locator("html").getAttribute("data-focus"), "1");
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("html").getAttribute("data-focus"), "");
  assert.equal(await page.evaluate(() => location.hash), "#m-born", "Escape did not also leave the memory");
  await page.keyboard.down("h");
  for (let i = 0; i < 5; i++) await page.keyboard.down("h");
  await page.keyboard.up("h");
  assert.equal(await page.locator("html").getAttribute("data-focus"), "1", "a held key toggles once");
  assert.equal(await page.locator(".edge-mark").evaluateAll((nodes) => nodes.every((node) => getComputedStyle(node).pointerEvents === "none")), true, "nothing invisible can be pressed");
  await close();
});

test("the tour runs once, says nothing to a screen reader, and leaves alone anyone with focus on a control or the pointer on the card", async () => {
  const { page, errors, close } = await open("/");
  await immersive(page);
  await page.waitForTimeout(1500);
  await page.locator(".brand").focus();
  await page.locator(".explore").evaluate((node) => {
    node.dataset.idle = "1.2";
    node.dataset.tourHold = "0.8";
  });
  await page.waitForTimeout(4000);
  assert.equal(await page.locator(".hud").innerText(), "javi", "focus on a control keeps the tour away");
  await page.evaluate(() => document.activeElement.blur());
  await page.mouse.move(300, 400);
  await page.waitForTimeout(3500);
  assert.equal(await page.locator(".hud").innerText(), "javi", "so does the pointer on the card");
  const spokenBefore = await page.locator(".card > [role=status].visually-hidden").innerText();
  await page.mouse.move(900, 700);
  await page.waitForFunction(() => document.querySelector(".hud").textContent !== "javi", null, { timeout: 8000 });
  assert.equal(await page.locator(".card > [role=status].visually-hidden").innerText(), spokenBefore, "the tour announces nothing");
  await page.waitForFunction(() => document.querySelector(".hud").textContent === "javi", null, { timeout: 15000 });
  await page.waitForTimeout(500);
  const seen = [];
  const started = Date.now();
  while (Date.now() - started < 6000) {
    seen.push(await page.locator(".hud").innerText());
    await page.waitForTimeout(300);
  }
  assert.ok(seen.every((label) => label === "javi"), `a second pass began: ${[...new Set(seen)].join(" | ")}`);
  assert.deepEqual(errors, []);
  await close();
});

test("an unforced page measures its own frames and steps down on a slow device", async () => {
  const { page, close } = await open("/", {
    before: (context) =>
      context.addInitScript(() => {
        window.__adaptive = true;
        const original = window.requestAnimationFrame.bind(window);
        window.requestAnimationFrame = (callback) =>
          original((now) => {
            const until = performance.now() + 55;
            while (performance.now() < until);
            callback(now);
          });
      }),
  });
  await immersive(page);
  await page.waitForFunction(() => document.querySelector("#scene").dataset.quality !== "0", null, { timeout: 90000 });
  const tier = await page.locator("#scene").getAttribute("data-quality");
  assert.ok(["1", "2"].includes(tier), `stepped to tier ${tier}`);
  await close();
});

test("a soft tone answers the pointer reaching a cloud but never twice in a moment, and the sound pauses with the tab", async () => {
  const { page, errors, close } = await open("/#m-tapquo", { before: audioStub });
  await hud(page, TAPQUO);
  await settled(page);
  await page.waitForTimeout(800);
  await page.mouse.click(700, 450);
  const count = () => page.evaluate(() => window.__audio.oscillators.length);
  const base = await count();
  const other = (await tagsShown(page)).find((tag) => !tag.hot);
  assert.ok(other, "another cloud is named");
  await page.mouse.move(other.cx, other.cy);
  await page.waitForTimeout(300);
  assert.equal(await count(), base + 1, "one soft tone, one partial");
  assert.ok((await page.evaluate(() => window.__audio.oscillators.at(-1))) > 300 && (await page.evaluate(() => window.__audio.oscillators.at(-1))) < 500, "a single calm pitch");
  await page.mouse.move(other.cx + 3, other.cy + 2);
  await page.mouse.move(other.cx - 2, other.cy);
  await page.waitForTimeout(300);
  assert.equal(await count(), base + 1, "staying on the same cloud adds nothing");
  await page.mouse.move(2, 2);
  await page.waitForTimeout(150);
  await page.mouse.move(other.cx, other.cy);
  await page.waitForTimeout(300);
  assert.equal(await count(), base + 1, "reaching it again within a moment adds nothing");
  await page.evaluate(() => (window.__audio.time += 2));
  await page.mouse.move(2, 2);
  await page.waitForTimeout(150);
  await page.mouse.move(other.cx, other.cy);
  await page.waitForTimeout(300);
  assert.equal(await count(), base + 2, "and after a pause it speaks again");
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { value: true, configurable: true });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  assert.equal(await page.evaluate(() => window.__audio.suspended), 1, "a hidden tab pauses it");
  const resumed = await page.evaluate(() => window.__audio.resumed);
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { value: false, configurable: true });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  assert.equal(await page.evaluate(() => window.__audio.resumed), resumed + 1, "and it comes back with the tab");
  assert.deepEqual(errors, []);
  await close();
});

const quiet = async (page) => {
  await page.mouse.move(640, 420);
  await page.mouse.move(700, 470);
  await page.waitForFunction(() => document.querySelector(".stage").dataset.gentle === "", null, { timeout: 5000 });
  await page.waitForTimeout(600);
};
const visibleLabels = (page) =>
  page.evaluate(() =>
    [...document.querySelectorAll(".tag[data-on='1'], .edge-mark:not([hidden]), .galaxy, .ahead, .ring-year, .countdown-mark")]
      .map((node) => ({ node, style: getComputedStyle(node), rect: node.getBoundingClientRect() }))
      .filter(({ style }) => style.visibility === "visible" && Number(style.opacity) > 0.2)
      .map(({ node, style, rect }) => ({ cls: node.className, size: style.fontSize, color: style.color, family: style.fontFamily, left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom })),
  );

test("with a memory open the scene names and draws only its three strongest relations, and the rest recede until the card's list is expanded", async () => {
  const { page, errors, close } = await open("/#m-hua-hin", { viewport: { width: 1280, height: 800 } });
  await hud(page, "06 / Now · We arrive in Hua Hin");
  await settled(page);
  await quiet(page);
  const tagCount = () => page.locator(".tag[data-on='1']").count();
  assert.ok((await tagCount()) >= 1 && (await tagCount()) <= 4, "the open memory and at most three relations are named");
  assert.ok(Number(await page.locator("#scene").getAttribute("data-links")) <= 3, "at most three lines at rest");
  const levels = (await page.locator(".stage").getAttribute("data-levels")).split(",").map(Number);
  assert.ok(levels.includes(1) && Math.min(...levels) / levels.filter((level) => level < 1).at(-1) <= 0.4, `unrelated clouds recede (${levels})`);
  assert.ok(Math.min(...levels) <= 0.3 && levels.some((level) => level > 0.8 && level < 1), "related ones stay brighter");
  assert.equal(await page.locator(".card .related .peer").count(), 3, "the card lists the three strongest");
  const expander = page.locator(".card .expander");
  assert.equal(await expander.getAttribute("aria-expanded"), "false");
  const stronger = await tagCount();
  await expander.click();
  assert.equal(await page.locator(".card .expander").getAttribute("aria-expanded"), "true");
  await page.waitForFunction(() => Number(document.querySelector("#scene").dataset.links) > 3, null, { timeout: 8000 });
  await page.waitForFunction((was) => document.querySelectorAll(".tag[data-on='1']").length > was, stronger, { timeout: 8000 });
  assert.ok((await tagCount()) <= 9, "never more than the open memory and eight relations");
  assert.equal(await page.evaluate(() => document.activeElement.className), "expander", "the focus stays on the button");
  assert.ok((await page.locator(".card .related .peer").count()) > 3, "the list shows more");
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => Number(document.querySelector("#scene").dataset.links) <= 3, null, { timeout: 8000 });
  assert.equal(await page.locator(".card .related .peer").count(), 3, "and back to three");
  assert.deepEqual(errors, []);
  await close();
});

test("at most two edge markers, each labelled in the tags' typeface, and no line reaches further than half the shorter side of the window", async () => {
  for (const [width, height] of [[1280, 640], [1280, 800], [1000, 1100]]) {
    const { page, close } = await open("/#m-hua-hin", { viewport: { width, height } });
    await hud(page, "06 / Now · We arrive in Hua Hin");
    await settled(page);
    await quiet(page);
    const marks = await page.locator(".edge-mark:not([hidden])").evaluateAll((nodes) => nodes.map((node) => ({ text: node.querySelector("span").textContent.trim(), family: getComputedStyle(node).fontFamily, left: node.getBoundingClientRect().left, top: node.getBoundingClientRect().top, ax: node.getBoundingClientRect().left + parseFloat(node.querySelector("i").style.left), ay: node.getBoundingClientRect().top + parseFloat(node.querySelector("i").style.top) })));
    assert.ok(marks.length <= 2, `${width}x${height}: ${marks.length} markers`);
    assert.equal(await page.locator(".stage").getAttribute("data-edges") ?? "", marks.length ? String(marks.length) : "");
    const tag = await page.locator(".tag[data-hot='1']").evaluate((node) => ({ family: getComputedStyle(node).fontFamily, cx: +node.style.getPropertyValue("--cx"), cy: +node.style.getPropertyValue("--cy") }));
    for (const mark of marks) {
      assert.ok(mark.text.length > 3, "an arrow always has its label");
      assert.equal(mark.family, tag.family, "the same typeface as the tags");
      const reach = Math.min(width, height) / 2 + 2;
      assert.ok(Math.abs(mark.ax - tag.cx) <= reach && Math.abs(mark.ay - tag.cy) <= reach, `${width}x${height}: a line reaches ${Math.round(Math.hypot(mark.ax - tag.cx, mark.ay - tag.cy))}px`);
    }
    await close();
  }
});

test("every label speaks in one of three tiers: the open memory large and bright, the relations smaller, the anchors small and quiet", async () => {
  const { page, close } = await open("/#m-hua-hin", { viewport: { width: 1280, height: 800 } });
  await hud(page, "06 / Now · We arrive in Hua Hin");
  await settled(page);
  await quiet(page);
  const labels = await visibleLabels(page);
  const combos = new Set(labels.map((label) => `${label.size} ${label.color}`));
  assert.ok(combos.size <= 3, `${combos.size} styles: ${[...combos].join(" | ")}`);
  const lead = labels.find((label) => label.cls.includes("tag") && label.size === "22px");
  assert.ok(lead, "the open memory is 22px");
  const sizes = (cls) => labels.filter((label) => label.cls.includes(cls)).map((label) => parseFloat(label.size));
  assert.ok(sizes("tag").every((size) => size === 22 || size === 15));
  assert.ok(sizes("galaxy").concat(sizes("ring-year"), sizes("ahead")).every((size) => size <= 15));
  const anchor = labels.find((label) => /galaxy|ring-year|ahead now/.test(label.cls));
  assert.ok(anchor && parseFloat(anchor.size) === 10, "the anchors are 10px");
  assert.notEqual(anchor.color, lead.color, "anchors are never as bright as the open memory");
  await close();
});

test("a galaxy name never sits under the card or the controls, and only the open memory's galaxy is named while a memory is open", async () => {
  for (const [width, height] of [[1280, 640], [1280, 800], [390, 844]]) {
    const mobile = width < 600;
    const { page, close } = await open("/#m-hua-hin", { viewport: { width, height }, hasTouch: mobile, isMobile: mobile });
    await hud(page, "06 / Now · We arrive in Hua Hin");
    await settled(page);
    await quiet(page).catch(() => {});
    const shown = await page.locator(".galaxy").evaluateAll((nodes) => nodes.filter((node) => getComputedStyle(node).visibility === "visible" && Number(getComputedStyle(node).opacity) > 0.05).map((node) => node.getBoundingClientRect().toJSON()));
    assert.ok(shown.length <= 1, `${width}x${height}: ${shown.length} galaxy names with a memory open`);
    const blockers = await page.evaluate(() => [".card", ".masthead", ".rail", ".minimap:not([hidden])"].flatMap((selector) => [...document.querySelectorAll(selector)].map((node) => node.getBoundingClientRect().toJSON())));
    for (const name of shown) for (const other of blockers) assert.ok(!(name.left + 4 < other.right && name.right - 4 > other.left && name.top + 4 < other.bottom && name.bottom - 4 > other.top), `${width}x${height}: a galaxy name touches the card, controls or rail`);
    await close();
  }
  const { page, close } = await open("/", { viewport: { width: 1280, height: 800 } });
  await immersive(page);
  await page.waitForTimeout(6500);
  const named = await page.locator(".galaxy").evaluateAll((nodes) => nodes.filter((node) => getComputedStyle(node).visibility === "visible" && Number(getComputedStyle(node).opacity) > 0.05).map((node) => node.getBoundingClientRect().toJSON()));
  const card = await box(page, ".card");
  for (const name of named) assert.ok(!(name.left + 4 < card.right && name.right - 4 > card.left && name.top + 4 < card.bottom && name.bottom - 4 > card.top), "in the whole life no name sits under the card");
  assert.ok(named.length >= 2, "and the whole life still names its galaxies");
  await close();
});

test("a memory's card is calm: three relations, one row of chips, no period introduction, and an expander the keyboard can use", async () => {
  for (const [width, height] of [[1280, 640], [1366, 657], [1280, 800]]) {
    const { page, close } = await open("/#m-hua-hin", { viewport: { width, height } });
    await hud(page, "06 / Now · We arrive in Hua Hin");
    await settled(page);
    assert.equal(await page.locator(".card .period-head").count(), 0, "the period's introduction stays in the document");
    assert.equal(await page.locator(".card .related .peer").count(), 3);
    const rows = await page.locator(".card .facets").evaluateAll((nodes) => nodes.filter((node) => getComputedStyle(node).display !== "none").length);
    assert.equal(rows, 1, "one row of chips");
    const card = await box(page, ".card");
    const steps = await box(page, ".card-steps");
    assert.ok(steps.bottom <= card.bottom + 1 && steps.top >= card.top && card.bottom <= height, `${width}x${height}: Earlier and Later are in view`);
    assert.equal(await page.locator(".card .expander").getAttribute("aria-expanded"), "false");
    await page.locator(".card .expander").focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.locator(".card .expander").getAttribute("aria-expanded"), "true");
    const chips = await page.locator(".card .facets").evaluateAll((nodes) => nodes.filter((node) => getComputedStyle(node).display !== "none").length);
    assert.ok(chips > 1, "all the chips are back once expanded");
    await close();
  }
});

test("the top bar holds Find, Surprise me and More; the rest waits in the sheet; the two offers are marked; nothing is inverted at rest", async () => {
  const { page, close } = await open("/", { viewport: { width: 1280, height: 800 } });
  await immersive(page);
  await page.waitForTimeout(800);
  const bar = await page.locator(".explore .bar > :not(.sheet)").evaluateAll((nodes) => nodes.filter((node) => node.getClientRects().length).map((node) => node.textContent.trim()));
  assert.equal(bar.length, 3, `visible beside the sections: ${bar}`);
  for (const selector of ["[data-legend-toggle]", "[data-sound]", "[data-guide-toggle]", "[data-theme-toggle]", ".lang"]) assert.equal(await page.locator(selector).first().isVisible(), false, `${selector} waits in the sheet`);
  assert.equal(await page.locator(".masthead nav a.cta").count(), 2);
  const cta = await page.locator(".masthead nav a.cta").evaluateAll((nodes) => nodes.map((node) => ({ line: getComputedStyle(node).textDecorationLine, height: node.getBoundingClientRect().height, go: node.dataset.go })));
  assert.deepEqual(cta.map((item) => item.go), ["book", "clone"]);
  assert.ok(cta.every((item) => item.line.includes("underline") && item.height >= 43.5), JSON.stringify(cta));
  assert.equal(await page.locator(".masthead nav a:not(.cta)").evaluateAll((nodes) => nodes.every((node) => !getComputedStyle(node).textDecorationLine.includes("underline"))), true);
  await page.locator("[data-more-toggle]").click();
  for (const selector of ["[data-legend-toggle]", "[data-sound]", "[data-guide-toggle]", "[data-theme-toggle]", ".lang"]) assert.equal(await page.locator(selector).first().isVisible(), true, `${selector} is in the sheet`);
  assert.equal(await page.locator("[data-sound]").getAttribute("aria-pressed"), "true");
  assert.equal(await page.locator("[data-sound]").evaluate((node) => getComputedStyle(node).backgroundColor), "rgba(0, 0, 0, 0)", "sound is never drawn inverted");
  const filled = await page.evaluate(() => {
    const probe = document.createElement("i");
    probe.style.color = "var(--fg)";
    document.body.append(probe);
    const ink = getComputedStyle(probe).color;
    probe.remove();
    return [...document.querySelectorAll(".explore .tool, .masthead .theme, .masthead .lang")].filter((node) => node.getClientRects().length && node.getAttribute("aria-pressed") !== "true" && getComputedStyle(node).backgroundColor === ink).map((node) => node.className);
  });
  assert.deepEqual(filled, [], "nothing is drawn with an ink fill at rest");
  await close();
});

test("the minimap has no button: it shows whenever the camera is zoomed in and not in the whole life, and the rail rests quiet until pointed at", async () => {
  const { page, close } = await open("/#m-hua-hin", { viewport: { width: 1280, height: 800 } });
  await hud(page, "06 / Now · We arrive in Hua Hin");
  await settled(page);
  assert.equal(await page.locator(".rail [data-map], .rail-map").count(), 0, "no map button");
  assert.equal(await page.locator(".stage").getAttribute("data-map"), "off", "waiting out the gentle first look");
  await quiet(page);
  await page.waitForFunction(() => document.querySelector(".stage").dataset.map === "on", null, { timeout: 8000 });
  assert.equal(await page.locator(".minimap").isVisible(), true);
  const ticks = () => page.locator(".rail-ticks").evaluate((node) => Number(getComputedStyle(node).opacity));
  assert.ok((await ticks()) <= 0.4, "rail ticks rest at 40%");
  const rail = await box(page, ".rail-track");
  await page.mouse.move(rail.left + rail.width / 2, rail.top + 10);
  await page.waitForFunction(() => Number(getComputedStyle(document.querySelector(".rail-ticks")).opacity) >= 0.99, null, { timeout: 3000 });
  await page.mouse.move(700, 300);
  await page.waitForFunction(() => Number(getComputedStyle(document.querySelector(".rail-ticks")).opacity) <= 0.41, null, { timeout: 3000 });
  await page.locator(".rail-years a").first().focus();
  await page.waitForFunction(() => Number(getComputedStyle(document.querySelector(".rail-ticks")).opacity) >= 0.99, null, { timeout: 3000 });
  await page.locator(".rail-home").click();
  await hud(page, "javi");
  await page.waitForFunction(() => document.querySelector(".stage").dataset.map === "off", null, { timeout: 8000 });
  assert.equal(await page.locator(".minimap").isVisible(), false, "none in the whole life");
  await close();
});

test("the first memory of a visit opens gently, with no year rings and no minimap, until the visitor really moves, presses or types", async () => {
  const { page, errors, close } = await open("/", { viewport: { width: 1280, height: 800 } });
  await immersive(page);
  await page.mouse.move(640, 420);
  await page.waitForTimeout(500);
  await goTo(page, "m-hua-hin");
  await hud(page, "06 / Now · We arrive in Hua Hin");
  await settled(page);
  assert.equal(await page.locator(".stage").getAttribute("data-gentle"), "1");
  assert.equal(await page.locator("#scene").getAttribute("data-rings"), "", "no year rings");
  assert.equal(await page.locator(".minimap").isVisible(), false, "no minimap");
  assert.ok(Number(await page.locator("#scene").getAttribute("data-links")) <= 3);
  assert.ok((await page.locator(".edge-mark:not([hidden])").count()) <= 2);
  await page.mouse.move(644, 424);
  await page.waitForTimeout(300);
  assert.equal(await page.locator(".stage").getAttribute("data-gentle"), "1", "a small tremor of the hand is not a move");
  await page.mouse.move(700, 470);
  await page.waitForFunction(() => document.querySelector(".stage").dataset.gentle === "", null, { timeout: 4000 });
  await page.waitForFunction(() => Number(document.querySelector("#scene").dataset.rings) > 0, null, { timeout: 8000 });
  await goTo(page, "m-github");
  await hud(page, "02 / The craft · GitHub");
  assert.equal(await page.locator(".stage").getAttribute("data-gentle"), "", "only the first memory of the visit is gentle");
  await close();

  const keyed = await open("/", { viewport: { width: 1280, height: 800 } });
  await immersive(keyed.page);
  await goTo(keyed.page, "m-hua-hin");
  await hud(keyed.page, "06 / Now · We arrive in Hua Hin");
  assert.equal(await keyed.page.locator(".stage").getAttribute("data-gentle"), "1");
  await keyed.page.keyboard.press("Shift");
  await keyed.page.waitForFunction(() => document.querySelector(".stage").dataset.gentle === "", null, { timeout: 4000 });
  assert.deepEqual(errors, []);
  await keyed.close();
});

test("after three memories a quiet line invites to the book's list, then to the clone's, can be closed for the visit, and never moves the card", async () => {
  for (const [width, height] of [[1280, 640], [1366, 657], [390, 844], [360, 640]]) {
    const mobile = width < 600;
    const { page, errors, close } = await open("/", { viewport: { width, height }, hasTouch: mobile, isMobile: mobile });
    await immersive(page);
    await page.waitForTimeout(800);
    const nudge = page.locator(".nudge");
    await goTo(page, "m-born");
    await hud(page, "01 / Origins · Born in Bilbao");
    await goTo(page, "m-github");
    await hud(page, "02 / The craft · GitHub");
    await settled(page);
    assert.equal(await nudge.isVisible(), false, `${width}x${height}: not before the third memory`);
    const before = await box(page, ".card");
    await goTo(page, "m-tapquo");
    await hud(page, TAPQUO);
    await settled(page);
    const where = `${width}x${height}`;
    assert.equal(await nudge.isVisible(), true, `${where}: after the third`);
    assert.equal(await nudge.locator("a").getAttribute("data-go"), "book");
    const [card, line] = [await box(page, ".card"), await box(page, ".nudge")];
    assert.ok(Math.abs(card.top - before.top) < 1 && Math.abs(card.height - before.height) < 1, `${width}x${height}: the card did not move`);
    assert.ok(line.left >= 0 && line.right <= width && line.top >= 0 && line.bottom <= height, `${where}: on screen`);
    assert.ok(!(line.left < card.right && line.right > card.left && line.top < card.bottom && line.bottom > card.top), `${where}: never over the card`);
    const rail = await box(page, ".rail");
    assert.ok(line.bottom <= rail.top + 1 || line.top >= rail.bottom, `${where}: clear of the rail`);
    await goTo(page, "clone");
    await hud(page, CLONE);
    assert.equal(await nudge.isVisible(), false, `${where}: not on the clone's own card`);
    await goTo(page, "m-github");
    await hud(page, "02 / The craft · GitHub");
    await settled(page);
    assert.equal(await nudge.locator("a").getAttribute("data-go"), "clone", `${where}: the clone's list once its station was seen`);
    await nudge.locator("button").click();
    assert.equal(await nudge.isVisible(), false, `${where}: closed`);
    await goTo(page, "m-born");
    await hud(page, "01 / Origins · Born in Bilbao");
    assert.equal(await nudge.isVisible(), false, `${where}: closed for the rest of the visit`);
    assert.equal(await page.evaluate(() => Object.keys(localStorage).filter((key) => !["lang", "theme"].includes(key)).length), 0, "nothing stored");
    assert.deepEqual(errors, []);
    await close();
  }
  const link = await open("/", { viewport: { width: 1280, height: 800 } });
  await immersive(link.page);
  for (const [id, label] of [["m-born", "01 / Origins · Born in Bilbao"], ["m-github", "02 / The craft · GitHub"], ["m-tapquo", TAPQUO]]) {
    await goTo(link.page, id);
    await hud(link.page, label);
  }
  await link.page.locator(".nudge a").click();
  await hud(link.page, BOOK);
  assert.equal(await link.page.evaluate(() => document.activeElement.id), "waitlist-book-email");
  await link.close();

  const flat = await open("/", { reducedMotion: "reduce" });
  await flat.page.waitForSelector(".waitlist");
  assert.equal(await flat.page.locator(".nudge").count(), 0, "the flat page already carries both lists");
  await flat.close();
});

test("the brand and every section link sit on one line across the header at laptop sizes", async () => {
  for (const [width, height] of [[1280, 800], [1366, 657], [1024, 700]]) {
    const { page, close } = await open("/", { viewport: { width, height } });
    await immersive(page);
    const centres = await page.locator(".masthead .brand, .masthead nav a").evaluateAll((nodes) => nodes.map((node) => {
      const rect = node.getBoundingClientRect();
      return (rect.top + rect.bottom) / 2;
    }));
    assert.equal(centres.length, 5);
    assert.ok(Math.max(...centres) - Math.min(...centres) <= 2, `${width}x${height}: centres ${centres.map(Math.round)}`);
    await close();
  }
});

test("a memory whose relations are all shown has no expander and keeps every chip", async () => {
  const { page, close } = await open("/#m-bali", { viewport: { width: 1280, height: 800 } });
  await hud(page, "03 / TapQuo · Bali, where I decided no");
  await settled(page);
  assert.equal(await page.locator(".card .expander").count(), 0);
  assert.ok((await page.locator(".card .related .peer").count()) <= 3);
  const lists = await page.locator(".card .facets").evaluateAll((nodes) => nodes.filter((node) => getComputedStyle(node).display !== "none").length);
  assert.equal(lists, await page.locator(".card .facets").count(), "no chip row is hidden");
  await close();
});
