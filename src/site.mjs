import { LANGS } from "./content.mjs";
import { homePath } from "./html.mjs";
import { home } from "./home.mjs";
import { notFound } from "./notfound.mjs";

export const fileOf = (urlPath) => (urlPath.endsWith("/") ? `${urlPath.slice(1)}index.html` : urlPath.slice(1));

const sitemap = ({ site }) => {
  const alternates = Object.fromEntries(LANGS.map((lang) => [lang, homePath(lang)]));
  const entry = (lang) => {
    const links = Object.entries(alternates)
      .map(([code, path]) => `\n    <xhtml:link rel="alternate" hreflang="${code}" href="${site.url}${path}" />`)
      .join("");
    return `  <url>\n    <loc>${site.url}${homePath(lang)}</loc>${links}\n  </url>`;
  };
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${LANGS.map(entry).join("\n")}\n</urlset>\n`;
};

export function renderSite(content) {
  const files = new Map();
  for (const lang of LANGS) files.set(fileOf(homePath(lang)), home(content, lang));
  files.set("404.html", notFound(content));
  files.set("sitemap.xml", sitemap(content));
  files.set("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${content.site.url}/sitemap.xml\n`);
  return files;
}
