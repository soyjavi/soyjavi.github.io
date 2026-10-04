# soyjavi.com

The personal site of Javi ([@soyjavi](https://github.com/soyjavi)). One three.js space: a **life, from 1980 to today, as
soft clouds of dots, one for each memory**, and two hollow rings ahead, a book for his children and his clone, each with its own waitlist. It opens on a starry sky where the memories spark, period by period, into
galaxies along a path that turns outwards. It is explored, not scrolled: drag, zoom, open a memory, follow it to the
ones it relates to, filter by a thread, a person or a place and watch it jump between galaxies, or play the life year
by year. It is not a portfolio and it has no blog: it shows a life and sells the book and the clone.

English at [`/`](https://www.soyjavi.com/) and Spanish at `/es/`; the browser's language decides on first visit. Light
and dark themes, night first and a remembered switch to paper. Static pages on GitHub Pages: no tracking, no cookies, no third-party scripts.

## Run it

```
npm install
npm run browsers      # once: Chromium for the browser tests and the share image
npm run build         # content + src → pages, sitemap, assets/site.js
npm run serve         # http://localhost:4173, or PORT=4391 npm run serve (it needs a server: the pages use absolute URLs)
npm test              # content, geometry, pages and a real browser
npm run og            # regenerate og-image.png from the hero
```

Commit the output of `npm run build` with the change: GitHub Pages serves the repository as it is, and `npm test`
fails when a generated file is stale.

## Edit it

| To change… | Edit |
| --- | --- |
| Any sentence of the site | `content/en.json` and `content/es.json`, always both |
| A memory | one file, `content/memories/<id>.json`, with its date, weight, kind, period, threads, people, places, links and its text in both languages (see below) |
| Many memories at once, from an archive | `npm run import -- archive.json`: only entries with `"public": true` enter, any day is cut to the month, nothing is written if one entry is wrong |
| People and places | `content/people.json` and `content/places.json`: `{ "id": { "en": "Name", "es": "Nombre" } }`; they appear as chips on the memories and the finder offers them as filters |
| Periods, threads and what waits ahead | `content/life.json`, with their names in `content/en.json` and `content/es.json` |
| Email, X, the book, the Buttondown account and its two tags | `content/site.json` |
| The book's expected month (`book.date`, `YYYY-MM`, never a day) | `content/site.json`; it shows a countdown only when set |
| Three to five questions for the clone, each on public memories | `content/questions.json`: `[{ "id", "memories": [ids], "en", "es" }]` |
| Layout of a page | `src/home.mjs`, `src/layout.mjs`, `src/notfound.mjs` |
| The scene | `assets/js/life.js` (geometry: the sky), `assets/js/explore.js` (search, related, filters), `assets/js/orbit.js` (camera maths), `assets/js/scene.js` and `shaders.js` (three.js), `assets/js/engine.js` (card, controls, labels), `src/explore.mjs` and `src/rail.mjs` (the controls and the timeline rail) |
| Look | `assets/brand.css` (tokens and themes), `assets/site.css` (home), `assets/page.css` (the 404) |
| The wordmark and favicon | `assets/brand/*.svg`, `favicon.svg` (outlined from Instrument Serif; see `design/`) |

A memory is a file named after its id (lowercase letters, digits, hyphens), which is also its address (`#m-<id>`):

```
{
  "date": "2026-03",
  "kind": "personal",
  "weight": 2,
  "period": "now",
  "threads": ["body"],
  "people": ["brother"],
  "links": ["running"],
  "en": { "title": "My first race", "body": "One or two sentences." },
  "es": { "title": "Mi primera carrera", "body": "Una o dos frases." }
}
```

`date` is `YYYY` or `YYYY-MM` (add `"approx": true` when it is roughly then), `kind` is personal, professional, product or
education, `weight` 1 to 3, `period` and `threads` (one to three, the first one decides its lane) come from
`content/life.json` (each period is a galaxy), and `order` breaks a tie between memories of the same date. `npm run
build` stops with the file name and the reason when something is missing.

The whole life can be one JSON file, imported with `npm run import -- archive.json`. [tools/archive.example.json](tools/archive.example.json)
is a complete template (every block, with placeholders) and [tools/archive.schema.json](tools/archive.schema.json) is its
JSON Schema, so an editor can validate it. Only entries with `"public": true` are written; a day in a date is cut to the
month; if anything is wrong nothing is written and every reason is printed. Any other key (notes, sources, a private
flag of your own) is ignored.

```
{
  "periods": [ { "id": "early", "en": { "kicker": "01 / Early years · 1980–1994", "title": "…", "intro": "…" }, "es": { … } } ],
  "threads": [ { "id": "family", "en": "Family", "es": "Familia" } ],
  "ahead": { "book": "family", "clone": "work" },
  "people": { "a-person": { "public": true, "en": "Name", "es": "Nombre" } },
  "places": { "a-place": { "public": true, "en": "Place", "es": "Lugar" } },
  "memories": [
    {
      "id": "first-memory", "public": true,
      "date": "1984-03", "approx": false,
      "kind": "personal", "weight": 2,
      "period": "early", "threads": ["family"],
      "people": ["a-person"], "places": ["a-place"], "links": ["second-memory"],
      "en": { "title": "…", "body": "First person, one to three sentences, under 260 characters." },
      "es": { "title": "…", "body": "En primera persona, de una a tres frases, menos de 260 caracteres." }
    }
  ]
}
```

- `periods` and `threads` (both optional) replace the ones in `content/life.json` and their copy in both dictionaries, in
  the order given: a period is a galaxy and its `kicker` carries its number and years; the first thread of a memory
  decides its lane; `ahead` says which thread the book and the clone belong to. The import stops if a period or thread that
  memories already use would disappear.
- `kind` is personal, professional, product or education; `weight` is 1 (a moment), 2 (it mattered) or 3 (it changed
  everything); `date` is `YYYY` or `YYYY-MM` (`"approx": true` when it is roughly then); `order` breaks a tie between
  memories of the same date.
- `people`, `places` and `links` are ids (of this file, of `content/people.json`, `content/places.json` or memories
  already in the site). An id that already exists is updated, so a batch can be imported again.

### The waitlists

There are two, one for the book and one for the clone, both posting to [Buttondown](https://buttondown.com): one
newsletter, one tag per list. Put the newsletter's username in `content/site.json` (`buttondown.username`) and keep the
two tags (`buttondown.tags.book`, `buttondown.tags.clone`), then run `npm run build`. Until there is a username each list
says it isn't open yet; there is no email fallback.

## Publish it

Push to `main`. GitHub Pages serves the repository root as it is (`.nojekyll` turns Jekyll off) at www.soyjavi.com (the
`CNAME` file). Check the build with `gh api repos/soyjavi/soyjavi.github.io/pages/builds/latest`.

## Documentation

Four documents, one question each: this README (what it is, how to run, edit and publish it),
[AGENTS.md](AGENTS.md) (the rules for working here), [SPEC.md](SPEC.md) (how it works today) and
[ROADMAP.md](ROADMAP.md) (what is left, as a task pool). [design/index.html](design/index.html) is the brand: name,
wordmark, colour, type, the sky, the scene and the interface; [design/proposals.html](design/proposals.html) holds the
ideas nobody has approved yet, drawn against what ships.

A milestone is added only after its owner has approved it as public: this repository is public, so private details live
in the creator's own archive and never in `content/`.

Fonts: Instrument Serif, Geist and Geist Mono (SIL Open Font License, texts in `assets/fonts/LICENSES.txt`). 3D:
[three.js](https://threejs.org) (MIT), vendored in `assets/vendor/`.
