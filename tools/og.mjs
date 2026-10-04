import { chromium } from "playwright-core";
import { root } from "../src/content.mjs";
import { serveStatic } from "./static.mjs";

const { base, close } = await serveStatic();
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const page = await (await browser.newContext({ viewport: { width: 1200, height: 630 }, locale: "en-US", colorScheme: "dark" })).newPage();
await page.goto(`${base}/`, { waitUntil: "load" });
await page.waitForFunction(() => document.documentElement.classList.contains("immersive"), null, { timeout: 30000 });
await page.waitForTimeout(6500);
await page.addStyleTag({ content: ".hud, .explore, .rail, .card .actions, .card .cue, .card-steps { visibility: hidden !important; }" });
await page.screenshot({ path: `${root}og-image.png` });
await browser.close();
close();
