import { build } from "esbuild";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { loadContent, root } from "../src/content.mjs";
import { renderSite } from "../src/site.mjs";
import { bundleOptions } from "./bundle.mjs";

const files = renderSite(loadContent());

rmSync(join(root, "es"), { recursive: true, force: true });
for (const [file, text] of files) {
  const target = join(root, file);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, text);
}

await build({ ...bundleOptions, logLevel: "info" });
