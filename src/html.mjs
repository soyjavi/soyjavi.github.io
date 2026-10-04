export const esc = (value) =>
  String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

export const fill = (template, values) => template.replace(/\{(\w+)\}/g, (_, key) => values[key]);

export const kicker = (text) => {
  const [number, ...rest] = text.split(" / ");
  return rest.length ? `<b>${number}</b> / ${rest.join(" / ")}` : text;
};

export const homePath = (lang) => (lang === "en" ? "/" : "/es/");
export const otherLang = (lang) => (lang === "en" ? "es" : "en");

export const jsonLd = (data) => `<script type="application/ld+json">${JSON.stringify(data).replaceAll("<", "\\u003c")}</script>`;
