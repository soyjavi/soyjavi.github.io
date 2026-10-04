import { esc, homePath } from "./html.mjs";
import { footer, head, masthead } from "./layout.mjs";

export function notFound({ site, dict }) {
  const d = dict.en;
  const sections = ["en", "es"]
    .map(
      (lang) => `      <section lang="${lang}">
        <h1 class="h2">${esc(dict[lang].notFound.heading)}</h1>
        <p class="lede">${esc(dict[lang].notFound.body)}</p>
        <p><a class="button primary" href="${homePath(lang)}">${esc(dict[lang].notFound.home)}</a></p>
      </section>`,
    )
    .join("\n");
  return `<!doctype html>
<html lang="en">
  ${head({ site, dict: d, lang: "en", title: d.notFound.title, description: d.meta.description, path: "/404.html", alternates: {}, extra: '\n    <link rel="stylesheet" href="/assets/page.css" />' }).replace("<head>", '<head>\n    <meta name="robots" content="noindex" />')}
  <body class="plain">
    ${masthead({ dict: d, lang: "en", nav: [{ label: d.notFound.home, href: homePath("en") }], switchHref: homePath("es"), brandHref: homePath("en") })}
    <main class="page" id="main">
${sections}
    </main>
    ${footer({ site, dict: d, lang: "en" })}
  </body>
</html>
`;
}
