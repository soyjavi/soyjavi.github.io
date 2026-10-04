import { esc, homePath, kicker, otherLang } from "./html.mjs";
import { footer, head, masthead, personLd, tools } from "./layout.mjs";
import { FACETS } from "../assets/js/life.js";
import { explore, stats } from "./explore.mjs";
import { rail } from "./rail.mjs";


const when = (locale, date, approx) => {
  const [year, month] = date.split("-");
  const text = month
    ? new Intl.DateTimeFormat(locale.replace("_", "-"), { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(+year, +month - 1, 1)))
    : year;
  return approx ? `~${text}` : text;
};

const waitlist = (site, d, list) => {
  const hero = list === "hero";
  const owner = hero ? "book" : list;
  const f = d[owner].form;
  const region = hero ? d.hero.region : f.region;
  const { username, tags } = site.buttondown;
  if (!username)
    return `<div class="waitlist" id="waitlist-${list}" data-list="${list}" role="group" aria-label="${esc(region)}">
            <p class="note">${esc(f.soon)}</p>
          </div>`;
  return `<form class="waitlist" id="waitlist-${list}" data-list="${list}" method="post" action="https://buttondown.com/api/emails/embed-subscribe/${username}" target="_blank" aria-label="${esc(region)}" data-opened="${esc(f.opened)}">
            <label for="waitlist-${list}-email">${esc(f.label)}</label>
            <div class="row">
              <input id="waitlist-${list}-email" name="email" type="email" required autocomplete="email" placeholder="${esc(f.placeholder)}" />
              <input type="hidden" name="tag" value="${esc(tags[owner])}" />
              <input type="hidden" name="embed" value="1" />
              <button class="button primary" type="submit">${esc(hero ? d.hero.primary : f.button)}</button>
            </div>
            <p class="note">${esc(f.note)}</p>
            <p class="status" role="status" aria-live="polite"></p>
          </form>`;
};

const countdown = (site, d) =>
  site.book.date
    ? `
            <p class="countdown" data-until="${site.book.date}"><span>${esc(d.book.expected)}</span> <time datetime="${site.book.date}">${esc(when(d.locale, site.book.date))}</time><span class="remaining"></span><span class="scale" aria-hidden="true"></span></p>`
    : "";

const asks = (life, d) =>
  life.questions?.length
    ? `
            <div class="ask" role="group" aria-label="${esc(d.clone.ask.label)}">
              <p class="kicker">${esc(d.clone.ask.title)}</p>
              <ul>
                ${life.questions.map((question) => `<li data-ask="${esc(question.id)}" data-memories="${question.memories.join(",")}"><p class="ask-q">${esc(d.asks[question.id])}</p><p class="ask-answers">${esc(d.clone.ask.draws)} ${question.memories.map((id) => `<a href="#m-${id}" data-go="m-${id}">${esc(d.life[id].title)}</a>`).join(", ")}</p></li>`).join("\n                ")}
              </ul>
            </div>`
    : "";

const facetLists = (d, life, entry) =>
  FACETS.filter((facet) => life[facet]?.length && entry[facet]?.length)
    .map((facet) => `<ul class="facets" data-facet="${facet}" aria-label="${esc(d.ui.explore[facet])}">${entry[facet].map((id) => `<li data-item="${id}">${esc(d[facet][id])}</li>`).join("")}</ul>`)
    .join("\n            ");

const milestone = (d, life, entry, head) => {
  const copy = d.life[entry.id];
  const period = d.periods[entry.period];
  const attributes = FACETS.filter((facet) => life[facet]?.length && entry[facet]?.length).map((facet) => ` data-${facet}="${entry[facet].join(",")}"`).join("");
  const links = entry.links?.length ? ` data-links="${entry.links.join(",")}"` : "";
  return `<li id="m-${entry.id}" data-station="milestone" data-panel="m-${entry.id}" data-milestone="${entry.id}" data-date="${entry.date}" data-weight="${entry.weight}" data-kind="${entry.kind}" data-period="${entry.period}"${attributes}${links} data-hud="${esc(`${period.kicker.split(" · ")[0]} · ${copy.title}`)}">
            <p class="kicker">${kicker(period.kicker)}</p>${head ? `\n            <div class="period-head"><h2 class="h2">${period.title}</h2><p class="intro">${esc(period.intro)}</p></div>` : ""}
            <time datetime="${entry.date}">${esc(when(d.locale, entry.date, entry.approx))}</time>
            <h3 class="h3">${esc(copy.title)}</h3>
            <p>${esc(copy.body)}</p>
            ${facetLists(d, life, entry)}
          </li>`;
};

const period = (d, life, id) => {
  const items = life.milestones.filter((entry) => entry.period === id).map((entry, index) => milestone(d, life, entry, index === 0));
  return `<section class="chapter period" id="period-${id}">
        <ol class="milestones">
          ${items.join("\n          ")}
        </ol>
      </section>`;
};

export function home({ site, life, dict }, lang) {
  const d = dict[lang];
  const base = homePath(lang);
  const alternates = { en: homePath("en"), es: homePath("es") };
  const first = life.periods[0];
  const nav = [
    { label: d.ui.nav.life, href: `#period-${first}`, go: `period-${first}` },
    { label: d.ui.nav.book, href: "#book", go: "book", cta: true },
    { label: d.ui.nav.clone, href: "#clone", go: "clone", cta: true },
    { label: d.ui.nav.contact, href: "#contact", go: "contact" },
  ];
  return `<!doctype html>
<html lang="${lang}">
  ${head({ site, dict: d, lang, title: d.meta.title, description: d.meta.description, path: base, alternates, extra: `\n    <link rel="stylesheet" href="/assets/site.css" />\n    ${personLd(site)}` })}
  <body>
    ${masthead({ dict: d, lang, nav, switchHref: homePath(otherLang(lang)), brandHref: "#top", controls: explore({ life, dict: d, tools: tools({ dict: d, lang, switchHref: homePath(otherLang(lang)) }) }), inline: true })}

    <div class="stage" data-today="${esc(d.ui.today)}"${site.book.date ? ` data-until="${site.book.date}"` : ""}>
      <canvas id="scene" aria-hidden="true"></canvas>
    </div>

    <main class="story" id="main">
      <section class="chapter hero" id="top" data-station="hero" data-hud="${esc(d.ui.hudHero)}">
        <div class="copy">
          <div data-panel="hero">
            <p class="kicker">${esc(d.hero.kicker)}</p>
            <h1 class="display">${d.hero.title}</h1>
            <p class="lede">${esc(d.hero.lede)}</p>
            <p class="stats kicker">${esc(stats(life, d))}</p>
            <div class="actions">
              <a class="link" href="#period-${first}" data-go="period-${first}">${esc(d.hero.secondary)}</a>
              <a class="link" href="#clone" data-go="clone">${esc(d.hero.clone)}</a>
            </div>
            <p class="cue kicker">${esc(d.ui.hint)}</p>
          </div>
          ${waitlist(site, d, "hero")}
        </div>
      </section>

            ${life.periods.map((id) => period(d, life, id)).join("\n\n      ")}

      <section class="chapter" id="book" data-station="book" data-hud="${esc(d.book.kicker)}">
        <div class="copy">
          <div data-panel="book">
            <p class="kicker">${kicker(d.book.kicker)}</p>
            <h2 class="h2">${d.book.title}</h2>
            <p>${esc(d.book.body)}</p>${countdown(site, d)}
          </div>
          ${waitlist(site, d, "book")}
        </div>
      </section>

      <section class="chapter" id="clone" data-station="clone" data-hud="${esc(d.clone.kicker)}">
        <div class="copy">
          <div data-panel="clone">
            <p class="kicker">${kicker(d.clone.kicker)}</p>
            <h2 class="h2">${d.clone.title}</h2>
            <p>${esc(d.clone.body)}</p>${asks(life, d)}
          </div>
          ${waitlist(site, d, "clone")}
        </div>
      </section>

      <section class="chapter contact" id="contact" data-station="contact" data-hud="${esc(d.contact.kicker)}">
        <div class="copy" data-panel="contact">
          <p class="kicker">${kicker(d.contact.kicker)}</p>
          <h2 class="display">${d.contact.title}</h2>
          <p class="lede">${esc(d.contact.lede)}</p>
          <div class="actions">
            <a class="button primary address" href="mailto:${site.email}">${site.email}</a>
          </div>
          <p class="proof"><a href="${site.links.x}">${esc(d.contact.follow)}</a></p>
        </div>
      </section>
    </main>

    ${rail({ life, dict: d })}

    ${footer({ site, dict: d, lang })}
    <p class="hud kicker" aria-hidden="true"></p>

    <script src="/assets/site.js" defer></script>
  </body>
</html>
`;
}
