import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import { root } from "../src/content.mjs";

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".woff2": "font/woff2", ".xml": "application/xml", ".txt": "text/plain" };

export async function serveStatic() {
  const server = createServer(async (request, response) => {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(request.url, "http://x").pathname);
    } catch {
      response.writeHead(400);
      return response.end();
    }
    const file = normalize(join(root, pathname.endsWith("/") ? `${pathname}index.html` : pathname));
    if (!file.startsWith(root.endsWith(sep) ? root : root + sep)) {
      response.writeHead(403);
      return response.end();
    }
    try {
      const body = await readFile(file);
      response.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
      response.end(body);
    } catch {
      response.writeHead(404);
      response.end();
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return { base: `http://127.0.0.1:${server.address().port}`, close: () => server.close() };
}
