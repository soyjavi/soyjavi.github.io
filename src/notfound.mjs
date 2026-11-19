import { esc, homePath } from "./html.mjs";
import { head, masthead } from "./layout.mjs";

const star = (label, href) => `<a class="first-star" href="${href}" aria-label="${esc(label)}"><svg viewBox="0 0 120 120" aria-hidden="true" focusable="false"><circle class="halo" cx="60" cy="60" r="34" /><circle class="glow" cx="60" cy="60" r="14" /><circle class="core" cx="60" cy="60" r="4" /></svg></a>`;

export function notFound({ site, dict }) {
  const d = dict.en;
  const [first, second] = ["en", "es"].map((lang) => dict[lang].notFound);
  return `<!doctype html>
<html lang="en">
  ${head({ site, dict: d, lang: "en", title: d.notFound.title, description: d.meta.description, path: "/404.html", alternates: {}, extra: '\n    <link rel="stylesheet" href="/assets/page.css" />' }).replace("<head>", '<head>\n    <meta name="robots" content="noindex" />')}
  <body class="plain lost">
    ${masthead({ dict: d, lang: "en", nav: [], switchHref: homePath("es"), brandHref: homePath("en") })}
    <main class="sky-404" id="main">
      ${star(first.starLabel, homePath("en"))}
      <section lang="en">
        <h1 class="h2">${esc(first.heading)}</h1>
        <p class="lede">${esc(first.star)}</p>
      </section>
      <section lang="es" class="other">
        <p class="kicker">${esc(second.heading)}</p>
        <p>${esc(second.star)} <a class="link" href="${homePath("es")}">${esc(second.home)} →</a></p>
      </section>
    </main>
  </body>
</html>
`;
}
