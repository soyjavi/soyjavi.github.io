import { root } from "../src/content.mjs";

export const bundleOptions = {
  absWorkingDir: root,
  entryPoints: ["assets/js/main.js"],
  bundle: true,
  format: "iife",
  minify: true,
  target: "es2020",
  alias: { three: "./assets/vendor/three.module.js" },
  outfile: "assets/site.js",
};
