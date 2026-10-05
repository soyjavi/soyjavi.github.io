import { serveStatic } from "./static.mjs";

const { base } = await serveStatic({ port: Number(process.env.PORT ?? 4392), fresh: true });
console.log(`${base}/  (never cached: reload shows the last npm run build)`);
