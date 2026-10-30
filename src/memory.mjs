import { esc, homePath, memoryPath, otherLang, snippet } from "./html.mjs";
import { footer, head, masthead } from "./layout.mjs";
import { paragraphsOf } from "./content.mjs";
import { when } from "./home.mjs";

export function memoryPage({ site, life, dict }, lang, entry) {
  const d = dict[lang];
  const copy = d.life[entry.id];
  const parts = paragraphsOf(copy.body);
  const alternates = { en: memoryPath("en", entry.id), es: memoryPath("es", entry.id) };
  return `<!doctype html>
<html lang="${lang}">
  ${head({ site, dict: d, lang, title: `${copy.title} · ${site.name}`, description: snippet(parts[0]), path: memoryPath(lang, entry.id), alternates, type: "article", extra: '\n    <link rel="stylesheet" href="/assets/page.css" />' })}
  <body class="plain">
    ${masthead({ dict: d, lang, nav: [], switchHref: memoryPath(otherLang(lang), entry.id), brandHref: homePath(lang) })}
    <main class="page memory" id="main">
      <section>
        <p class="kicker"><time datetime="${entry.date}">${esc(when(d.locale, entry.date, entry.approx))}</time></p>
        <h1 class="h2">${esc(copy.title)}</h1>
        ${parts.map((part) => `<p>${esc(part)}</p>`).join("\n        ")}
        <a class="button primary" href="${homePath(lang)}#m-${entry.id}">${esc(d.ui.memoryPage.see)}</a>
      </section>
    </main>
    ${footer({ site, dict: d, lang, first: life.periods[0] })}
  </body>
</html>
`;
}
