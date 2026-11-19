import { stamp } from "./assets.mjs";
import { LANGS } from "./content.mjs";
import { homePath, memoryPath } from "./html.mjs";
import { home } from "./home.mjs";
import { memoryPage } from "./memory.mjs";
import { notFound } from "./notfound.mjs";

export const fileOf = (urlPath) => (urlPath.endsWith("/") ? `${urlPath.slice(1)}index.html` : urlPath.slice(1));

const sitemap = ({ site, life }) => {
  const entry = (paths, lang) => {
    const links = Object.entries(paths)
      .map(([code, path]) => `\n    <xhtml:link rel="alternate" hreflang="${code}" href="${site.url}${path}" />`)
      .join("");
    return `  <url>\n    <loc>${site.url}${paths[lang]}</loc>${links}\n  </url>`;
  };
  const pages = [Object.fromEntries(LANGS.map((lang) => [lang, homePath(lang)])), ...life.milestones.map(({ id }) => Object.fromEntries(LANGS.map((lang) => [lang, memoryPath(lang, id)])))];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${pages.flatMap((paths) => LANGS.map((lang) => entry(paths, lang))).join("\n")}\n</urlset>\n`;
};

export function renderSite(content) {
  const files = new Map();
  for (const lang of LANGS) files.set(fileOf(homePath(lang)), stamp(home(content, lang)));
  for (const lang of LANGS) for (const entry of content.life.milestones) files.set(fileOf(memoryPath(lang, entry.id)), stamp(memoryPage(content, lang, entry)));
  files.set("404.html", stamp(notFound(content)));
  files.set("sitemap.xml", sitemap(content));
  files.set("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${content.site.url}/sitemap.xml\n`);
  return files;
}
