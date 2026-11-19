import { esc, homePath, memoryPath, otherLang, snippet } from "./html.mjs";
import { footer, head, masthead } from "./layout.mjs";
import { paragraphsOf } from "./content.mjs";
import { when } from "./home.mjs";

export const linkedTo = (life, entry) => life.milestones.filter((other) => other.id !== entry.id && (entry.links?.includes(other.id) || other.links?.includes(entry.id)));

export function memoryPage({ site, life, dict }, lang, entry) {
  const d = dict[lang];
  const at = life.milestones.indexOf(entry);
  const pageLink = (other, attributes = "") => `<a href="${memoryPath(lang, other.id)}"${attributes}>${esc(d.life[other.id].title)}</a>`;
  const step = (other, rel, label) => (other ? `<p class="step"><span class="kicker">${esc(label)}</span>${pageLink(other, ` rel="${rel}"`)}</p>` : "");
  const linked = linkedTo(life, entry);
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
      <nav class="onward" aria-label="${esc(d.ui.rail.label)}">${
        linked.length
          ? `
        <div class="linked"><h2 class="kicker">${esc(d.ui.explore.related)}</h2><ul>${linked.map((other) => `<li>${pageLink(other)}</li>`).join("")}</ul></div>`
          : ""
      }
        <div class="steps">${step(life.milestones[at - 1], "prev", `← ${d.ui.explore.earlier}`)}${step(life.milestones[at + 1], "next", `${d.ui.explore.later} →`)}</div>
      </nav>
    </main>
    ${footer({ site, dict: d, lang, first: life.periods[0] })}
  </body>
</html>
`;
}
