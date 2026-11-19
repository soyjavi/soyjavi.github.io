import { build } from "esbuild";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { loadContent, root } from "../src/content.mjs";
import { renderSite } from "../src/site.mjs";
import { bundleOptions } from "./bundle.mjs";

await build({ ...bundleOptions, logLevel: "info" });

const files = renderSite(loadContent());

for (const folder of ["es", "m"]) rmSync(join(root, folder), { recursive: true, force: true });
for (const [file, text] of files) {
  const target = join(root, file);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, text);
}
