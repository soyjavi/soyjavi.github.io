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
npm run dev           # http://localhost:4392, never cached, so a reload always shows the last npm run build
npm test              # content, geometry, pages and a real browser
npm run og            # regenerate og-image.png from the hero
```

Commit the output of `npm run build` with the change: GitHub Pages serves the repository as it is, and `npm test`
fails when a generated file is stale.

## Edit it

| To change… | Edit |
| --- | --- |
| Any sentence of the site | `content/en.json` and `content/es.json`, always both |
| A memory | one file, `content/memories/<id>.json`, with its date, weight, kind, threads, people, places, links and its text in both languages (see below); its galaxy is calculated from its date |
| Many memories at once, from an archive | `npm run import -- archive.json`: only entries with `"public": true` enter, any day is cut to the month, nothing is written if one entry is wrong |
| People and places | `content/people.json` and `content/places.json`: `{ "id": { "en": "Name", "es": "Nombre" } }`; they appear as chips on the memories and the finder offers them as filters |
| His birth, the ages that are galaxies, the threads and what waits ahead | `content/life.json` (`birth`, `ages`, `threads`, `ahead`), with the names of the ages in `ages` and of the threads in `content/en.json` and `content/es.json` |
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
  "threads": ["body"],
  "people": ["brother"],
  "links": ["running"],
  "en": { "title": "My first race", "body": "One or two sentences." },
  "es": { "title": "Mi primera carrera", "body": "Una o dos frases." }
}
```

`date` is `YYYY` or `YYYY-MM` (add `"approx": true` when it is roughly then), `kind` is personal, professional, product or
education, `weight` 1 to 3, `threads` (one to three, the first one decides its lane) come from `content/life.json`, and
`order` breaks a tie between memories of the same date. There is no `period`: a memory's age on its date decides its
galaxy (see the seven ages below). `npm run
build` stops with the file name and the reason when something is missing.

### The seven ages

A galaxy takes its shape from what it holds, never from chance: an age that lasts long and holds little is stretched into an ellipse, it has only the arms of the threads it holds, as wide as their share, and it winds more the more years it lasts.

Every galaxy is an age of his life, cut by his age on the date of each memory, counted from his birth (`birth` in
`content/life.json`, `1980-04`): the seven ages people have drawn for three thousand years. Only the ages he has lived
and remembered are drawn, so today there are five galaxies and there will be at most seven.

| Age | From | Name on the site (EN / ES) | Years for his birth |
| --- | --- | --- | --- |
| 1 | 0 | Early years / Primeros años | 1980 to 1987 |
| 2 | 7 | School years / Años de escuela | 1987 to 1994 |
| 3 | 14 | Youth / Juventud | 1994 to 2005 |
| 4 | 25 | Building a life / Construir una vida | 2005 to 2020 |
| 5 | 40 | Midlife / Mitad de la vida | 2020 to 2035 |
| 6 | 55 | Elder years / Madurez | 2035 to 2050 |
| 7 | 70 | Later life / Última etapa | 2050 on |

The cuts are where the traditions that divide a life agree: 7 (Hippocrates, Isidore, Piaget, Erikson, human life
history), 14 (Hippocrates, Ptolemy, Isidore, Confucius at 15, Rousseau, Ortega, the Mishnah), about 25 (Dante, the
ashramas, Levinson, the maturing brain), 40 (Confucius, Jung, Erikson, Levinson, Ptolemy, the Mishnah), about 55 (the
ashramas, Isidore, Ptolemy, Hippocrates) and 70 (Psalm 90, Ptolemy, Isidore, Solon, Confucius). To change a cut or add the
name of an age, edit `ages` in `content/life.json` and its entry in `ages` in both dictionaries; `npm run build` then
moves every memory to the galaxy of its age. After a change to the memories run `npm run figure` to redraw the sky of the
brand page.

The whole life can be one JSON file, imported with `npm run import -- archive.json`. [tools/archive.example.json](tools/archive.example.json)
is a complete template (every block, with placeholders) and [tools/archive.schema.json](tools/archive.schema.json) is its
JSON Schema, so an editor can validate it. Only entries with `"public": true` are written; a day in a date is cut to the
month; if anything is wrong nothing is written and every reason is printed. Any other key (notes, sources, a private
flag of your own) is ignored.

```
{
  "threads": [ { "id": "family", "en": "Family", "es": "Familia" } ],
  "ahead": { "book": "family", "clone": "work" },
  "people": { "a-person": { "public": true, "en": "Name", "es": "Nombre" } },
  "places": { "a-place": { "public": true, "en": "Place", "es": "Lugar" } },
  "memories": [
    {
      "id": "first-memory", "public": true,
      "date": "1984-03", "approx": false,
      "kind": "personal", "weight": 2,
      "threads": ["family"],
      "people": ["a-person"], "places": ["a-place"], "links": ["second-memory"],
      "en": { "title": "…", "body": "First person, a short paragraph of one to six sentences, under 600 characters." },
      "es": { "title": "…", "body": "En primera persona, un párrafo corto de una a seis frases, menos de 600 caracteres." }
    }
  ]
}
```

- `threads` (optional) replace the ones in `content/life.json` and their copy in both dictionaries, in the order given;
  the first thread of a memory decides its lane; `ahead` says which thread the book and the clone belong to. The import
  stops if a thread that memories already use would disappear. There are no periods in an archive: the date decides.
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
