import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const SELF = /(href|src)="(\/assets\/[a-z-]+\.(?:css|js))"/g;

const hashOf = (path) => createHash("sha256").update(readFileSync(new URL(`..${path}`, import.meta.url))).digest("hex").slice(0, 10);

export const stamp = (html) => html.replace(SELF, (_, attribute, path) => `${attribute}="${path}?v=${hashOf(path)}"`);
