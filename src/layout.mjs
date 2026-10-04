import { readFileSync } from "node:fs";
import { esc, homePath, jsonLd, otherLang } from "./html.mjs";

export const CSP = [
  "default-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "script-src 'self'",
  "form-action 'self' https://buttondown.com",
  "base-uri 'self'",
].join("; ");

export const wordmark = readFileSync(new URL("../assets/brand/javi-current.svg", import.meta.url), "utf8").trim().replace(/ role="img" aria-label="javi"/, ' aria-hidden="true" focusable="false"');

const OG_LOCALE = { en: "en_US", es: "es_ES" };

export function head({ site, dict, lang, title, description, path, alternates, type = "website", extra = "" }) {
  const url = `${site.url}${path}`;
  const links = Object.entries(alternates)
    .map(([code, alternatePath]) => `<link rel="alternate" hreflang="${code}" href="${site.url}${alternatePath}" />`)
    .join("\n    ");
  const xDefault = alternates.en ? `\n    <link rel="alternate" hreflang="x-default" href="${site.url}${alternates.en}" />` : "";
  return `<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="Content-Security-Policy" content="${esc(CSP)}" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <meta name="author" content="${esc(site.name)}" />
    <meta name="application-name" content="${esc(site.name)}" />
    <link rel="canonical" href="${url}" />
    ${links}${xDefault}
    <meta property="og:type" content="${type}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:site_name" content="${esc(site.name)}" />
    <meta property="og:locale" content="${OG_LOCALE[lang]}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:image" content="${site.url}/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="${site.url}/og-image.png" />
    <meta name="theme-color" content="#0c0c0b" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="preload" href="/assets/fonts/geist.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/assets/fonts/instrument-serif-italic.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="stylesheet" href="/assets/brand.css" />${extra}
    <script src="/assets/theme.js"></script>
    <script src="/assets/lang.js"></script>
  </head>`;
}

export const tools = ({ dict, lang, switchHref }) => `<div class="tools">
        <button class="theme" type="button" data-theme-toggle data-to-light="${esc(dict.ui.theme.toLight)}" data-to-dark="${esc(dict.ui.theme.toDark)}" hidden><i aria-hidden="true"></i></button>
        <a class="lang" href="${switchHref}" hreflang="${otherLang(lang)}" lang="${otherLang(lang)}" data-lang="${otherLang(lang)}">${esc(dict.ui.switchLabel)}</a>
        </div>`;

export function masthead({ dict, lang, nav, switchHref, brandHref, controls = "", inline = false }) {
  const links = nav.map(({ label, href, go, cta }) => `<a href="${href}"${go ? ` data-go="${go}"` : ""}${cta ? ' class="cta"' : ""}>${esc(label)}</a>`).join("\n        ");
  return `<a class="skip" href="#main">${esc(dict.ui.skip)}</a>
    <header class="masthead">
      <a class="brand" href="${brandHref}"${brandHref.startsWith("#") ? ' data-go="top"' : ""} aria-label="Javi">${wordmark}</a>
      <nav aria-label="${esc(dict.ui.navLabel)}">
        ${links}
      </nav>
      <div class="controls">
        ${controls ? `${controls}${inline ? "" : "\n        "}` : ""}${inline ? "" : tools({ dict, lang, switchHref })}
      </div>
    </header>`;
}

export function footer({ site, dict, lang }) {
  const f = dict.ui.footer;
  return `<footer class="site-footer">
      <div>
        <h4>${esc(f.site)}</h4>
        <p><a href="${homePath(lang)}#period-origins" data-go="period-origins">${esc(dict.ui.nav.life)}</a><br /><a href="${homePath(lang)}#book" data-go="book">${esc(dict.ui.nav.book)}</a><br /><a href="${homePath(lang)}#clone" data-go="clone">${esc(dict.ui.nav.clone)}</a></p>
      </div>
      <div>
        <h4>${esc(f.elsewhere)}</h4>
        <p><a href="${site.links.x}">X</a></p>
      </div>
      <div>
        <h4>${esc(site.name)}</h4>
        <p><a href="mailto:${site.email}">${site.email}</a></p>
      </div>
      <div>
        <h4>${esc(f.colophon)}</h4>
        <p>© 2026 ${esc(site.name)}<br />${esc(f.colophonText)}</p>
      </div>
    </footer>`;
}

export const personLd = (site) =>
  jsonLd({
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: site.handle,
    url: site.url,
    image: `${site.url}/assets/avatar.jpg`,
    email: site.email,
    sameAs: [site.links.x],
  });

export const websiteLd = (site, lang) =>
  jsonLd({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    alternateName: site.handle,
    url: site.url,
    inLanguage: lang,
  });
