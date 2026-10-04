# SPEC — how soyjavi.com works today

Present tense, edited in place. [AGENTS.md](AGENTS.md) holds the rules, [ROADMAP.md](ROADMAP.md) what is left and
[design/index.html](design/index.html) the brand.

## Current state

A static, bilingual personal site published by GitHub Pages at www.soyjavi.com. The home page is a WebGL space that
holds a life from 1980 to today as soft clouds of dots, one per public memory, built for two or three hundred. It opens
on a starry sky in which the dots gather, in the order the years happened, into one galaxy per period of the life. It is
explored, not scrolled: the camera is free (drag, scroll or pinch, right drag), a click opens a memory in a card, and the
memories are one sky, with no other view to choose. Threads, people and places are filters, found by name: a filter lights
its memories and draws its jumps from galaxy to galaxy. A memory lights what it is related to and draws a line to each. A timeline rail that can
play the life year by year, a finder, a surprise button and the keyboard are other ways in, and Earlier and Later give
the sequence by date. Two hollow rings ahead of today are the book and the clone, each with its own waitlist. The site has no blog and no
writing section: it shows a life and sells those two things. Each waitlist is wired for Buttondown, one list per tag, and
says it isn't open yet until the account's username is set in `content/site.json`. Light and dark themes, both with a faint
field of stars.

## Pages and URLs

| URL | Page |
| --- | --- |
| `/`, `/es/` | Home in English and in Spanish |
| `/404.html` | Not found, in both languages, `noindex` |
| `/sitemap.xml`, `/robots.txt` | Every page with its `hreflang` alternates |
| `/design/`, `/design/proposals.html` | The brand and the design proposals, `noindex`, not linked from the site |

The home pages declare `rel=canonical`, `hreflang` for `en`, `es` and `x-default`, Open Graph and Twitter card tags with
`og-image.png` and one `theme-color` that `theme.js` keeps in step with the theme, and carry JSON-LD `Person` and `WebSite`, both named Javi with the handle `soyjavi` as `alternateName` (`WebSite` with its `inLanguage`), and `author` and `application-name` meta. The brand is `javi`; the handle is the address.

## Languages

- The home pages and the 404 are rendered once per language from `content/en.json` and
  `content/es.json`; both files have the same keys (a test compares them).
- `assets/lang.js` loads synchronously in every `<head>`. On the path `/` only, it reads `localStorage.lang` and, when
  there is none, the first entry of `navigator.languages`; `es` goes to `/es/` keeping the query and the hash. Any
  other language, an empty list or a stored `en` stays. Any path other than `/` is never redirected, and a back or
  forward navigation is not redirected either.
- A click on a link with `data-lang` stores that code in `localStorage.lang`. Blocked storage falls back to the
  browser's language.

## Content model

- `content/site.json`: URL, name, email, `links` (X only: the site is not a portfolio), `buttondown` (`username`, and
  `tags`: one per waitlist, `book` and `clone`) and `book` (`title`, `null` until the creator gives it, and `date`, a month `YYYY-MM` or `null`, never a day).
- `content/questions.json`: a list of three to five questions for the clone (none until the creator chooses them), each
  `{ id, memories: [memory ids], en, es }`; a question with an unknown memory or a missing language stops the build.
- `content/life.json`: the periods in order (each is a galaxy of the sky), `threads` (an ordered list of ids) and
  `ahead` (the thread each of the book and the clone belongs to).
- `content/memories/<id>.json`: one file per milestone, named after its id (lowercase letters, digits and hyphens), with
  `date`, optional `approx`, `kind` (personal, professional, product, education), `weight` (1 to 3), `period`, `threads`
  (one to three, the first gives its lane and its constellation), optionally `people`, `places`, `links` (ids of related
  memories, declared once and read in both directions) and `order` (breaks a tie between memories of the same date), and
  `en` and `es`, each a `title` and a `body`. A date is `YYYY` or `YYYY-MM`: nothing more precise exists in the
  repository. `src/content.mjs` reads the folder, sorts it by date, then `order`, then id, and then by the moment each
  memory is placed at (`years`, so a month never falls between two memories that only have the year), and hands the pages the same
  `life.milestones` and `<lang>.life.<id>` as before; a file with a bad date or a missing language stops the build with
  its name and the reason.
- `content/people.json` and `content/places.json` (optional): `{ "<id>": { "en": name, "es": name } }`, in the order
  the facet lists them. When one has entries, `life.people` or `life.places` exists: the memories' cards list them as
  chips and the finder offers them as filters.
- `content/<lang>.json`: every other sentence, keyed by section; period copy is `periods.<id>.{kicker, title, intro}`
  and the kicker carries the number and the years (`01 / Origins · 1980–1994`); the names of the threads are
  `threads.<id>`; the controls are `ui.explore.*` and the counts `ui.count.*`.
- `npm run import -- <file>` (`tools/import.mjs`) merges an archive, `{ "periods": [...], "threads": [...], "ahead": {...},
  "memories": [...], "people": {...}, "places": {...} }` (every block optional; the schema is `tools/archive.schema.json` and a
  template `tools/archive.example.json`) or a bare list of memories, into these files; `periods` and `threads` replace the
  lists of `content/life.json` and their copy in both dictionaries, and the import refuses to drop one that memories use. Only entries with `"public": true` are written, a day
  is cut to its month, people and places must be public to be pointed at, and if any public entry is wrong (id, date,
  kind, weight, period, threads, people, places, links, a language) nothing is written and every reason is printed.

## What is public

The repository is public, so `content/memories/`, `content/people.json`, `content/places.json` and the dictionaries hold
only what the creator approved, already written as public text; the importer leaves out anything not marked public. A
test fails on any milestone more precise than a month, on a full date in any content file and on any field outside the
model. People, his children included, appear by their own names; who took part in a public memory may come from the
creator's archive. Everything else is the creator's own archive, and nothing in this repository says what it holds.

## Build

`npm run build` runs `tools/build.mjs`: it renders every page from `src/` first (pure functions returning strings,
collected by `renderSite`), then deletes `es/`, writes the pages, and bundles `assets/js/main.js` and
three.js into `assets/site.js` with esbuild (IIFE, minified, ES2020). Generated files are committed. A test renders the
site in memory and compares it, and the bundle, with the disk.

## Themes

- Tokens in `assets/brand.css`: paper, ink, night and bone with their raised, line, muted and soft variants, twelve
  neutrals in all and no hue. `:root` is the light theme; `prefers-color-scheme: dark` switches to dark unless
  `data-theme="light"` is set; `data-theme="dark"` forces dark.
- Night is the first look: `assets/theme.js` loads synchronously in every `<head>` and sets `data-theme` before the first
  paint to `localStorage.theme` (`light` or `dark`) or, with no choice, to `dark` whatever the system says; the switch
  keeps paper and remembers it. The script never asks the system, keeps the single `theme-color` meta in step with the
  theme, reveals the masthead switch on `DOMContentLoaded`, sets its label for the theme it would switch to and
  dispatches `themechange`. Without the script the CSS still falls back to the system's scheme.
- The scene reads `--bg` and `--fg` on start and on `themechange`: dark adds light (additive blending, glow where dots
  gather), light is ink on paper. No reload.
- Every page's `body` carries a faint field of stars: six layers of one-pixel radial gradients in `--muted`, `--line`
  and `--soft`, tiled at sizes that do not repeat together. The scene draws its own sky over it.

## The scene

### Geometry

`life.js` places everything with pure functions of the memories:

- **Memories.** `layout` puts each milestone at its date's middle (a year at the middle of the year, a month at the middle
  of the month; entries sharing the same date are spread across it in page order). `lanes` gives memories less than 0.9
  years apart of the same thread different sub-lanes out of five, 0.7 units apart (`SUB_STEP`; 3.2 when there are no
  threads), and `crowdScale` shrinks the cloud where many memories crowd one year. Weight
  sets the cloud's spread: 1.1, 1.6 or 2.2 units.
- **The sky: galaxies.** `galaxies` makes one galaxy per period, sized by what it holds (4 units plus 3.2 per square
  root of its memories), from the first memory of the period to the first of the next (today for the last), and lays
  them on a path that turns clockwise from the top and outwards (`onPath`: an Archimedean spiral over 1.7 turns of
  half a circle, 1.6 times as far from its pole at the end as at the start), their diameters and a 12-unit gap each
  along it, then 44 more units for what is ahead; the whole is centred on the scene. Inside a galaxy every thread has a sector; a memory sits in its first thread's sector at a
  distance from the core that grows with its moment in the period (`fractionIn`, from 22% to 100% of the radius), with
  a little swirl, and memories of the same thread close in time take different lanes inside the sector
  (`galaxyPoint`). `skyOf` throws with the memory's name when its period is not one of the periods, and with no periods there is one galaxy.
- **Dots.** `memories` makes the clouds and the trail. Each cloud gets `470 × weight^1.5` dots, fewer when the whole
  would pass 120,000 (`dotsPerWeight`), so a bigger life keeps its shape with sparser clouds; 18,000 more
  dots are the dust between them: each sits in its year's galaxy, along the sector of the thread it is assigned to and
  thicker where that thread was busy (`activityAt`; `densityAt` when there are no threads) or, one in seven, near the
  core; 6% of it lies ahead of today, along the path, and is thinner. A dust dot is assigned to a thread, person or place in
  proportion to how active that was around its year (`activityTable`, `assign`), so a filter leaves the shape of what
  it filters. On a phone the cap is 55,000 and the trail 12,000.
- **Today and what is next.** **Today** is the visitor's local calendar day (a filled dot with a pulsing ring); **the
  book and the clone** are hollow rings at 30% and 70% of the path past the last period (`futures`, `aheadPoint`), today at
  6% of it, so what is ahead leads away from the start.
- **Space.** `starfield` puts 9,000 stars (4,000 on a phone) on a shell 900 to 1,600 units from the centre. Their
  brightness has a heavy tail (about nine in ten are faint); 1.5% are the brightest and carry a halo in the night
  theme; 35% of the rest lie in a faint band of density along a great circle tilted 0.6 rad (`bandDirection`); and a
  star's distance follows its brightness (the brightest at 900 units, the faintest at 1,600), so the near ones move more
  than the far ones as the camera turns. Sizes grow with brightness and each star twinkles on its own phase. Every dot of
  the memories starts on the same shell.
- **Guides.** A dashed outline around each galaxy, a line joining the memories of each thread inside it in order (its
  constellation), an arc from galaxy to galaxy and a dashed arc through the opening. Labels for them are DOM nodes
  projected every frame.

### Shaders

Three `THREE.Points` with a `ShaderMaterial`, no depth test (`shaders.js`). The stars twinkle slowly and are drawn
first. The dust has `aFrom` (its star on the shell), one centre (`aCenter`), `position` as the offset from the centre, `aU` (years
since 1980), `aSeed`, `aSize`, `aAhead`, `aKind` (a cloud dot or a trail dot), `aMemory`, `aGalaxy` (the period it belongs to, -1 for what is ahead) and one attribute per facet; uniforms `uSpin` and `uPivot` (an angle and a centre per galaxy) and `uKeep` (the share of dust that is drawn).
On load the page is a sky (`DISCOVER` and `ENTRANCE`, about six seconds). Each trail dot shines as a faint star and then spirals in to its
place, its start delayed by its year (60% of the time spread over the years, 8% of jitter, a flight of 30% that covers
most of the way early), so the dust of each galaxy gathers in order. Each memory is a spark: when its year comes
(`igniteAt`) its dots fade in at its centre with a soft glow that rises and falls and open out to its cloud in under a
second, so a heavier memory, with more dots, glows brighter. The first sparks come within the first second and the last before the four
seconds are out; a galaxy's outline, constellation and label, the decade labels and the tags appear as their years
spark (`formedAt`). Cloud dots then drift: each turns around
its memory at its own very slow pace (`CLOUD`: at most 0.07 rad/s) and breathes by 5%; as the camera pulls out (`uFar`) the drift, the breath and the pointer's push fade to 8% of that, so the whole-life view is almost still. A cloud dot's brightness is read
from a one-row float texture with one level per memory (`levels` in `explore.js`: 1 normal; with a memory in view 1 for
it, 0.85 for its strongest relations (all of them once the card's list is expanded), 0.5 for its weaker ones and 0.3 for the rest; with a filter 0.1 for what is outside it) and eased on the CPU. A
trail dot's brightness follows the filter and, with a memory in view, a window of years around it. `uReveal` hides
every dot after a year while the life plays. Alpha falls with
distance and fades when closer than a few units to the camera; trail dots are fainter, ahead dots 30%. Zoomed out, cloud dots are drawn dimmer and larger so the clouds stay soft and do not burn out. The marks are today, its pulse, the two rings and a thin ring
on the memory in view; `data-ring` on `#scene` carries the ring's position, `data-view` the camera's yaw, pitch and
distance, `data-links` the number of lines drawn and `data-jumps` the number of jumps a filter draws in the sky, for
tests.

The pointer (a mouse, with a fine pointer and no reduced motion) pushes the trail dust a little: `uPointer` (the pointer in
clip space and an eased strength, `POINTER.rate`) displaces each trail dot in the vertex shader by at most `POINTER.push`
(0.04 of the clip space, a few pixels) inside `POINTER.radius` (0.2), falling off quadratically, and the dust settles when the
pointer leaves; clouds, labels and picking are untouched and touch screens never push. `data-pointer` on `#scene`
carries the strength for tests.

### Nodes

Nodes are the elements with `data-station` inside `main.story`, in document order: the hero, every milestone (the `li`
of each period), the book, the clone and the contact, 66 stations at the moment. Each milestone carries `data-period`. `data-hud` is the label
announced when the station opens. The first milestone of each period also carries the period's title and introduction. The story is
clipped to 1×1 px: it stays the accessible tree and the source of every card.

### The card

The card is the one real, interactive panel (`aside.card`, focusable, not hidden from assistive technology). It is
filled by cloning the `[data-panel]` of the node in view, so copy stays in the document, and adds: the threads (and people
and places) as filter chips, the related memories as buttons (explicit links in both directions first, then the
neighbours in time inside each of its threads, people and places; at most eight are listed, while the scene lights and joins all of them), and Earlier and Later; a related list that scrolls fades at its foot and counts what is hidden ("5 more"), and hovering
or focusing a row rings that memory in the scene, joins it to the open one with a brighter line and names it. A memory's card shows its three strongest relations and one row of chips, with the rest behind the expander of
"Relations" (the period's introduction stays in the document and the flat page, not in the card). The hero's card and those of the book and the clone each
hold their own waitlist, moved there once and shown only at that station. Titles reveal word by word. At the hero it is the
introduction with the counts, the book's waitlist form (its call to action: the field and the button) and two text links, "Travel through it" and the way to the clone's card, with the invitation to drag; it has no Later, because the link into the life is the way in. Every other card has a close button back to the whole life (the same target as the
button at the left of the rail, which also carries a tooltip), and Earlier and Later stay pinned to its foot while a long
text scrolls above them. A memory's card always has the same height, so Earlier and Later never move, and its related
memories scroll inside it when they do not fit (on a phone the whole card scrolls). On a laptop the card sits on the
left, between the top bar and the rail; on a phone at the bottom with at most 44% of the height. The hero and the contact card never hide a call to action behind a scroll: when
their text does not fit, the engine drops the introduction, then the counts and the hint and shrinks the title and,
at level 3, hides the form's note, makes its label visually hidden and tightens the spacing
(`data-fit` 1, 2 and 3), and measures again on resize and when the fonts load.

### The backdrop

Behind everything (`backdrop.js`): a deep field of real points spread in depth around the sky, fixed in the world so the camera sees parallax (the same star shader as the stars, so every star stays one crisp pixel at any resolution; nearer ones are brighter and larger), a dome at infinity that follows the camera and carries the far galaxies (a small seeded texture, smudges that are meant to be soft), a shader haze, and a soft glow sprite per galaxy sized by its radius and lit by its memory count (`glowOf`), which blooms only as that galaxy's dots form during the opening. Each layer has a strength; haze is off on the lowest quality tier and under reduced motion.

### The entrance

The page opens on a quiet sky (stars, deep field, haze and far galaxies fade in over 1.4 s) with the first memory (the earliest) already there, a real cloud that condenses at 0.9 s with its name beside it and sparks, brighter than the rest, when the opening begins; a transparent real button (`.seed`) lies over it. The first click, tap or key anywhere (the point is the invitation) begins the opening and, being a gesture, lets the sound start; without one it begins by itself after 6 s, and a link with a hash (a memory, the book, the clone) skips the ceremony: no wait, no hidden interface, no camera approach and a 1.4 s gathering, so a visitor who came for something sees it at once; an automated browser skips the wait and the hiding. The galaxies then form in the order of the years over 4 s while the camera, which starts 1.6 times further out, eases in over 6 s (a gesture stops its approach). The first memory sparks brighter than the rest, each galaxy's first memory plays its note as it is born, and the card, the controls and the rail stay hidden until 85% of the gathering and then fade in over 1.4 s (a safety timer returns them after 20 s).

Two and a half seconds after the last touch, wherever it is (the hero, a memory, the whole view), the camera sways around its target (`DRIFT`: about 8° of yaw and 1° of pitch over roughly a minute, eased in over a couple of seconds and out at the first touch), so the deep field's depth is felt as parallax and the card never moves.

### The invitation, the book's date and the clone's questions

- After the visitor has opened three distinct memories (the idle tour does not count), a quiet line (`.nudge`: a link and a
  close button) sits at the card's foot, beside it on a laptop and above it on a stacked layout, on a memory's card only. It
  links to the book's waitlist, or to the clone's once the visitor has seen the clone's station; closing it hides it for the rest
  of the visit and nothing is stored. It is not drawn in the flat page, which already holds both lists.

- With `book.date` set, the book's panel carries `<p class="countdown" data-until>`: "Expected" and the month as text,
  which a script (`countdown.js`, on every page) completes with the months left on the visitor's calendar
  (`monthsUntil`, `untilText` in `life.js`, through `Intl.RelativeTimeFormat`, so "in 8 months" and "dentro de 8 meses") and
  a scale of one tick per month up to 24 (`--months`, ten pixels each). A date that has passed hides the line. The stage
  carries `data-until` and the engine adds one label with the same sentence at the midpoint between today and the book's
  ring, on the path that already joins them. Without a date none of this exists.
- With questions in `content/questions.json`, the clone's panel lists them (`.ask`, each `li[data-ask][data-memories]` with
  the question and links to its memories, which is what the flat page shows). In the card each becomes a button
  (`aria-pressed`); choosing one lights exactly its memories (`askLevels`), draws one line from each to the clone's ring
  (`askPairs`, the scene's jump lines to `scene.slotOf("clone")`), flies to the whole life and tells a screen reader
  "N memories light up: names" through the card's status line. Choosing it again, Escape or leaving the clone's station lets
  go. There is no generated answer. `data-asked` on the stage carries the id for tests.

### Exploring

- **Camera.** Orbit around a target (`orbit.js`): a drag turns it (yaw free, pitch within ±1.3 rad), the wheel and a pinch
  move closer or further (6 to 640 units; pixels, lines and pages are normalised), a right or shift drag and two fingers
  move the picture. The camera eases to its goal from any frame rate. Opening a memory flies to it (about 36–64 units,
  by the size of its cloud, so its neighbours stay in view) and follows it until the picture is moved by hand; it frames the memory's whole galaxy. The whole-life shots
  are far and a little below (the contact from above) and drift slowly while nothing is touched. The scene is offset
  so the target sits in the free area beside the card (above it on a phone).
- **Opening.** A click or a tap on a cloud, a galaxy's label (it opens the first memory of the period), a related
  memory, a result of the finder, a point on the rail, Surprise me,
  a link with `data-go`, an address hash (`#book`, `#m-tapquo`, `#period-home`; a malformed one or one that names nothing is
  ignored), a focus on the real document, or Earlier and Later. The address follows the memory in view with
  `history.replaceState`. A `data-go` link to the book or the clone also puts the cursor in its waitlist field.
- **Pointing.** The nearest cloud within its reach is named and the cursor changes. A drag never opens anything. The
  book and the clone rings answer the pointer and open their cards like a cloud.
- **Controls.** Find, Surprise me and a More button (`aria-expanded`) share the top line with the brand and the sections (left); the
  sheet that More drops down holds Filter, Sound, the guide, the theme and the language at every width (from the top
  right on a laptop, under a header of one row of 56 px on a stacked layout: up to 900 px wide, or portrait). The theme
  and language buttons live inside the sheet (`.sheet`, `display: contents` beside the bar when the page is flat), so the
  flat page, which hides everything else of the controls, still shows them. Escape, a press elsewhere, choosing something or
  tabbing out of the sheet closes it, and the focus goes back to the More button (to the first thread after Filter); a
  filter in force is shown by a dot on More and in its accessible name. The thread legend, the guide and the finder open as
  panels under that row. In the sections, The book and Talk to me carry `.cta`: full ink, underlined and a 44 px
  target, because they are what the site offers; no control is drawn inverted unless the visitor pressed it, and Sound
  shows its state by the waves or the slash of its icon, never by a fill.
- **Relations.** The relations of a memory are its explicit links in both directions and its neighbours in time inside each of
  its threads, people and places (`related`). `strongest` ranks them (an explicit link first, then how many threads,
  people and places they share, then nearness in time, then position) and the first three are the strong ones
  (`STRONG`). At rest the scene draws, names and lights only those three; a button in the card, "All related (n)"
  (`.expander`, `aria-expanded`), shows all of them in the card's list, draws all the lines, names up to eight and lights
  them all, and "Fewer" puts it back. Any memory a card row or the finder points at is previewed on top of that.
- **Guide.** The ? button or the `?` key opens a panel of six marks drawn with the real glyphs (a cloud, a dashed
  circle, a line, a hollow ring, today, the dust) and the keys; Escape, a press on the sky, the finder or the thread
  legend closes it. It never covers the card (on a phone it is capped above it and scrolls).
- **Gentle first look.** The first memory a visit opens (the idle tour counts) starts a gentle state (`data-gentle` on the
  stage): the year rings and the minimap wait, and only the three strongest lines and at most two edge markers are drawn
  anyway. A pointer move of more than 12 px, a press, the wheel, a touch or any key ends it for good.
- **Focus.** `H` hides the masthead, the card, the rail, the minimap, the labels and the readout (`html[data-focus]`,
  announced by a polite status) so only the sky is left; a pointer move of more than 12 px, a press, the wheel, a touch
  or any other key brings them back. `H` typed in a field is a letter, a held `H` toggles once and Escape only brings the interface back.
- **Sound.** On by default, and the button (pressed, never inverted) only exists where Web Audio does. A browser allows sound only after a
  gesture, so nothing is created until the first click, tap or key; pressing the Sound button as that first gesture
  turns it off instead. The choice is not stored and nothing is fetched. Everything is synthesised (`tones.js` holds the maths, `sound.js`
  the Web Audio, `createGraph(context)` builds it on any context so it can be rendered offline) and it is meant to calm.
  The bed is slow chords in D major without its leading tone, tuned on 432: five open voicings of stacked fifths and
  fourths (Dmaj9, Gmaj9, Bm, Asus2, Em7), each 24 to 38 s long and melting into a random different next one over 9 s,
  made of detuned triangle pairs under a low-pass that breathes, a few soft sines an octave above for shimmer, a little
  dark noise for air and a dry sine sub between 36 and 61 Hz. Everything but the sub goes through one generated
  convolution reverb (stereo, five seconds, darkened). The master chain is a 2.2 kHz low-pass, a 30 Hz high-pass and a
  gain of 0.7; the bed sits near -42 dBFS RMS, a memory's note never above about -30 dBFS and well above the bed and nothing above 5 kHz
  (-68 dB). A memory opens with a glassy four-partial bell whose pitch walks D major pentatonic over two octaves
  with the date (290 to 860 Hz), 3, 4.5 or 6 s long by weight, at most four voices, 0.3 s apart and quieter when
  several ring; changing galaxy adds a slow air sweep (rising for a later memory, falling for an earlier one) and the
  bell arrives 0.9 s after it. The pointer reaching a cloud plays one barely audible 432 Hz tone, at most once every
  1.4 s; the book and the clone each get a low, slow swell (G2 and D3). Turning it on fades in over about ten seconds;
  turning it off fades out and suspends the context four seconds later, as a hidden tab does and the scene falling back to
  the flat page closes it. Under reduced motion the scene, and so the button, is not there.
- **Quality.** The scene measures its own frames: from a second after the opening it averages 90 frames, up to three
  times, and each time the average is slower than 30 a second it steps one tier down and never back up. Tier 0 is the
  whole life; 1 keeps 65% of the dust at a pixel ratio of at most 1.5; 2 keeps 40% at 1 (the memories' clouds always keep
  at least 55%). `data-quality` on `#scene` carries the tier; `?quality=full` or `?quality=low` fixes it. Drawing
  pauses while the tab is hidden, and a first frame stamped before the clock started cannot make time run backwards.
- **Motion.** From half a second after the opening each galaxy turns about its centre, rigidly, slowly (the bigger the
  slower, `spinAngle`, about a degree in two minutes for the largest) and starting from rest: the dust and the clouds in
  the shader, and in the same turn the constellation lines, the clouds' positions for labels, rings and links, and the
  minimap (`data-spin` carries the first galaxy's angle). After 20 s without a pointer move of more than 6 px, a press,
  a key, the wheel or a touch, and only on the opening shot with nothing open (no finder, sheet, guide, filter, play or
  focus, nor with the focus on a control, the header or the rail, nor the pointer over the card), a tour opens up to five
  memories (the heaviest of spread periods) for six seconds each, without touching the address and without anything
  announced to a screen reader, then returns to the whole life (`tourPlan`, `tourTick`). It runs once per visit: any
  interaction ends it where the reader is, and for good.
- **Filtering.** A chip in a card, a filter offered by the finder or a thread in the legend dims everything outside it;
  pressing it again, the ✕ button or Escape lets go. The legend of threads sits behind the Filter button. In the sky a
  filter draws arcs between its memories in order, higher when they jump from one galaxy to another (`matching`,
  `jumps`), and each galaxy's label counts how many it holds (`perGalaxy`), dimmed when none. Earlier and Later step
  along the filter while it is on.
- **Finding.** `/` or the Find button opens the finder. Empty, it is an index of every memory grouped by period. With
  words, it first offers up to three threads, people or places whose name matches, each with its number of memories, to
  filter by (`filtersFor`), then up to eight memories matched without case or accents against the title, the text, the
  date and the names of their threads, people and places, the best title first. The finder is a wide palette, 640 px
  (full width on a phone), of one-line rows beside a preview of the highlighted memory (its date, title and first
  sentence); the arrows move the highlight, which rings that memory in the scene, Enter opens it and Escape closes it.
  It opens above the card, never over the controls.
- **Playing.** The play button of the rail reveals the life from 1980 to today in sixteen seconds at a steady pace
  (`playYear`): the dots, today and the rings ahead appear as their year comes, the year shows above
  the rail and the cursor follows it, and the memories of the last two and a half years are named. Pressing it again
  pauses and resumes from the same year (`playElapsed`); opening anything stops it and shows the whole life.
- **Keyboard.** Arrows, Page keys and Space step Earlier and Later (inside the filter when there is one), Home and Escape
  return to the whole life (Escape first closes the guide, the sheet or the finder and lets go of a filter), End opens the contact, `/` finds, `?` opens the guide, `H` hides the interface. Keys
  are left alone inside fields, and a space on a button or link presses it.

### Labels

Each memory has a tag (date and title) beside its cloud. With a memory open only that memory, its three strongest
relations (all of them, up to eight, once the card's list is expanded), the one pointed at and the one a card row or a
finder result is pointing at are named, so every other cloud names itself only when the pointer reaches it. With
nothing open the priority is the members of a filter, then by weight, with more of them the closer the camera (only the
heaviest, and only once the camera is in a galaxy). They are placed greedily
(`tagSpots`, `pickSpot`): first on the right, left, below or above the cloud, then at its four corners, then in up to
three rings further out, taking the first place that touches no other cloud's disc, no other label, no date or galaxy
label, no edge marker, not the card, the controls, the minimap, the rail or the edge, and otherwise the first that only
touches clouds. A tag that had to move out to a ring is joined to its cloud by a hairline that starts at the tag and
stops at the cloud's edge (`leaderOf`). At most 24 are shown (14 while the whole life is in view, 8 on a phone); the
memory in view and the one pointed at are always named. In the whole-life view, with nothing open and no filter, one
memory per galaxy is named in italics, without its date: the heaviest of its period and, among equals, the earliest
(`headlines`); they give way to the usual tags as the camera comes into a galaxy and to nothing once a memory opens. A tag fades in over most of a second, rising a few pixels out of a blur, and the one in
view or pointed at floats gently. Tags publish the screen position of their cloud as `--cx` and `--cy`.

Every label speaks in one of three tiers. The open or pointed memory is serif at 22 px in full ink; the other tags and
the edge markers are serif at 15 px in the soft ink (19 and 14 px on a phone); the anchors (a galaxy's name, the year
rings, today and the countdown) are small mono capitals at 10 px in the muted ink, never brighter than the relations.
Each galaxy is named by its period's kicker outside the ring (only the number and name on a phone), kept inside the
window and hidden where it would touch the card, the controls, the rail, the minimap, an edge marker or another label;
with a memory open only that memory's galaxy is named. Today
and the book and the clone are named beside their marks (the nav's own words; the book and the clone in italic serif at 15 px, today as an anchor), at the first
of sixteen places around the mark that touches nothing, starting a clearance of 8 px beyond the mark's drawn radius
(`ringClearance`, capped where the shader caps a mark at 140 px across), so the ring never covers the first letters at
any distance, and are left unnamed when none does; they publish their mark's position and radius as `--cx`, `--cy` and
`--r`.

**Year rings.** With a memory open, its galaxy shows one dashed ring for each year at the distance a memory of that
year sits from the core (`yearRings`: the integer years inside the period, every second, fifth or tenth year when it
spans more than eight), each labelled in mono along one ray, hidden where they would touch the card or the controls and
absent from the whole-life view and during the gentle first look; `data-rings` on `#scene` carries how many show.

**Edge markers.** The free area is the window minus the card, the controls and the rail, and no line reaches further than
half the window's shorter side from the memory in view. A line from the memory in view to one of its strong relations
that leaves that area ends where it does, when its marker fits (a line whose marker does not fit stays whole)
(`edgeExit`, sampled along the same arc the scene draws), in a small arrow and a label with the memory's title and date
in the tags' serif, on the nearest side and stacked clear of the others (at most two, and never an arrow without its
label; `edgeSide`, `edgeLabel`, `stackEdgeLabels`). Pressing a marker opens that memory, and the card marks the same
memories in its related list with an arrow. `data-edges` on the stage carries how many show.

**Minimap.** Whenever the camera is closer than 0.75 of the whole-life distance (`MINI_ZOOM`), a 104 by 100 px map of the whole
sky sits at the lower right above the rail (below the controls on a stacked layout): the galaxies, a dot per memory, the
book and the clone, a frame around what the window shows (the window's corners cast onto the plane the open memory lies on)
and a ring on the memory in view. Pressing it flies to the galaxy under the press (`miniMap`, `galaxyAt`). It is hidden in
the whole-life view and the contact, during the gentle first look, on screens narrower than 520 px and, on a stacked
layout, whenever the card would reach it; it has no button and is not a keyboard stop. `data-map` on the stage says
`on` or `off`.

### The timeline rail

A `nav.rail` is fixed at the bottom of the scene: a link back to the whole life and a button that plays the life, each a
glyph with its name beneath it ("Whole life", "Play" or "Pause"), unboxed, with a 44 px target (the button's label says
play or pause and `aria-pressed` follows it); a track with a bar per year for the
density (the sum of the weights of its milestones), a tick per memory (larger when heavier), hollow ticks for the book
and the clone, today, and a cursor that follows the memory in view; and the five decades as links, which with the two
buttons are the only focusable parts. It
is generated at build time from `content/life.json` (`src/rail.mjs`), so both languages share it. Pressing or dragging
on the track opens the nearest memory, book or clone; pointing at it shows that memory's date and title. Its bars and ticks rest at 40% and come to full while the pointer is over the rail or the focus is inside it. The rail is hidden
in the flat page.

### Flat page

`html.flat` is set when WebGL2 is missing, when `prefers-reduced-motion: reduce` is on, when the scene throws (it logs
the error), or when the window is smaller than 520 px tall or 320 px wide (a short landscape phone, or a browser zoomed in:
the card would have to shrink below a readable size). Crossing that size while the page is open reloads it into the other
mode. The canvas, the controls, the card and the rail are hidden, the forms return to the book and the clone and the document reads as a
normal page: each period with its milestones as an editorial list with their threads, the book and the clone each with its
waitlist, and the contact. The theme switch and the language link work there too (and the scene falling back mid-run removes every listener it added).

## The waitlists

Two lists, one for the book and one for the clone, each in its own station and card (`data-list="book"` and `"clone"`). The
hero's card holds a third form (`data-list="hero"`) that joins the book's list: it carries the book's tag and the
book's copy, with the hero's own button text and accessible name (`hero.primary`, `hero.region`).

- With `buttondown.username`: each is a `<form method="post">` to
  `https://buttondown.com/api/emails/embed-subscribe/<username>` with a labelled `type=email required` field, hidden
  `tag` (`buttondown.tags.book` or `.clone`) and `embed=1` fields and a polite status line. It targets a new tab, where
  Buttondown shows its confirmation or its CAPTCHA; on submit the status says (`<list>.form.opened`) that Buttondown
  opened there. The site never claims a subscription it cannot see. One Buttondown newsletter holds both lists, told
  apart by their tag.
- Without a username: each says the waitlist isn't open yet (`<list>.form.soon`). There is no email fallback and no
  `mailto` for joining.
- The CSP allows `form-action` for `https://buttondown.com` and nothing else outside the origin. Every variant carries
  an accessible name (`<list>.form.region`).
- The contact card offers the email address and X, and nothing else: the site is not a portfolio.

## Security and privacy

A `<meta http-equiv>` CSP on every page (a test pins the exact policy): `default-src 'self'`, inline styles allowed,
`script-src 'self'`, `img-src 'self' data:`, `form-action 'self' https://buttondown.com`, `base-uri 'self'`. JSON-LD is
the only inline script and is not executable. GitHub Pages cannot send headers, so `frame-ancestors` and
`X-Frame-Options` are not set. No analytics, cookies or external fonts; `localStorage` holds only `lang` and `theme`.

## Look

Instrument Serif for the wordmark, headings and milestone titles, Geist for text, Geist Mono for dates, labels and
addresses; the three are open licence and ship in `assets/fonts/` with `LICENSES.txt`. The wordmark and monogram are
outlined SVG in `assets/brand/`, generated from the font by `tools/wordmark.mjs` (kerning from the font, quadratic paths, ink and bone and `currentColor` variants); the header inlines the `currentColor` one at 28 px high (24 px on a phone) so no live text spells the name. `favicon.svg` is the j at 72% of the tile with a 0.03 em stroke, on night, and inverts with the system theme; `favicon-32.png` and the opaque 180 px `apple-touch-icon.png` come from `tools/icons.mjs`. `npm run brand` rewrites all of them. Type is a named scale in `brand.css` (`--fs-*`, `--track-*`): labels at 12 px, small 14, body 17 (16 on a phone), tags and edge markers in serif at 17 (16 on a phone), and no stylesheet declares a literal size or tracking. The book's and the clone's cards end with the same lockup (a mono preposition and the wordmark at 20 px; *by* / *with*, *de* / *con*), and the clone's also says it is a program built from what he wrote and not him. Hairlines, no shadows,
square corners, round dots. `design/index.html` shows all of it.

## Tests

`npm test` runs `tests/*.test.mjs` (Node's runner, one at a time):

- `content.test.mjs`: the milestone model and the privacy limits (no day, no full date, no extra field), threads, links,
  people and places pointing at things that exist and named in both languages, chronological order and contiguous periods,
  copy in both languages, dictionaries with the same keys, generated files and `assets/site.js`
  equal to what the sources render, the day in every time zone, a failing build leaving the pages untouched, `.nojekyll`
  and the font licences.
- `life.test.mjs`: dates and precision, year spreading, lanes and crowding, the year rings of a galaxy, the star field (magnitudes, haloes, band, depth), the galaxies (one per period, in
  order on the ring, apart, sized, the opening) and the memories inside them, the book and the clone in
  the opening, density, the clouds and the dust (counts, proportions, reach, centres, ahead share, seeded,
  the trail inside the galaxies), the stars and the shell the dots start from, a synthetic life of 250 memories with
  periods inside the dot budget and fast, playing the life, the rail scale and `todayYear`. `fixtures/archive.mjs` makes
  that synthetic life.
- `explore.test.mjs`: label placement (sides, corners, rings, leaders, ring clearance), the names of the whole-life view, edge exits, sides, labels and stacking, the minimap's fit, click and visibility, search (case, accents, extras, limits), the filters the finder offers, related memories, Earlier
  and Later with and without a filter, a filter's path and jumps and its count per galaxy, the levels of a selection and
  a filter, and the camera maths (orbit, limits, sliding, easing).
- `pages.test.mjs`: CSP, no inline script, local references exist, no third-party loads, `hreflang` reciprocity, anchors,
  EN/ES structure parity, one station per milestone with its date, period, threads and links, the controls (the sky
  first, the legend behind Filter) and the counts, the rail's structure and its play button, `lang.js` and `theme.js` in a sandbox, the two Buttondown forms and the sitemap.
- `voice.test.mjs`: the voice rules that can be checked: the words banned for the offer (the list lives only there) in the
  content, the sources, the documents and the built pages; no time promise and no exclamation in the copy; Spanish with no
  *usted*, *ratón*, *Saluda* or *anillo vacío*, « » in Spanish and “ ” in English; the offer named *my clone* / *mi clon*.
- `design.test.mjs`: the brand page against `brand.css` (twelve neutral tokens, true contrast ratios, no stray colour in
  any stylesheet), the stations table, the interface controls and the sky numbers and figure against the home page and the code, the
  proposal boards against the ROADMAP, the absence of a blog, the outlined brand files and the type scale (every size and
  tracking is a token, none below 12 px, no serif under 16 px). `pages.test.mjs` also checks that the header is the outlined
  wordmark, that the brand files and icons match what the tools generate, that the favicon keeps its ink at 16, 32 and 180 px in
  both lights (rendered in Node with resvg) and that both cards end with the lockup.
- `browser/immersive.test.mjs`: Chromium with SwiftShader WebGL: the accessibility tree and the keyboard, the card, Earlier
  and Later, hashes (including malformed ones) and the address, the canvas drawing in both themes, night as the first
  look and the switch to paper remembered across pages, language redirects, the flat fallbacks and the size switch,
  dragging, the wheel in three units, a pinch, a right drag, pointing at and clicking a cloud, filters, related memories
  and their count, fade and hover ring, the wide finder with its preview at three sizes, Surprise me, the named rail
  buttons, the whole-life names, hairlines to displaced tags, the ring names at three camera distances, the year rings,
  the edge markers and the arrows in the card, the minimap, labels never touching anything, the card and controls fitting
  four screens at every kind of node, the hero's calls to action in view at six sizes in both languages, Earlier and
  Later pinned to the foot of a long card, the close button, the named rings that open the book and the clone, the
  captioned filter row on one line in both languages, a phone's touch, resizing, each waitlist (Buttondown answered by a
  route, a new tab opens), the email field in view at ten sizes in both languages, no request outside the origin,
  storage, the Spanish controls, and a synthetic life of 250 memories with people and places explored.

## Known limits

- The waitlist has not been checked against a live Buttondown account (the username is set in `content/site.json`).
- The scene needs WebGL2; Safari before 15 gets the flat page.
- Over the canvas a pinch zooms the scene and not the page (`touch-action: none`); the browser's own zoom and text size still
  work, and a window zoomed in far enough gets the flat page.
- The share image is made from the dark hero with software rendering; a real GPU draws it more smoothly.
- The sky's look, the star field and the year rings have been judged on a laptop screen with software rendering only.
- Real-device performance of 60,000 to 140,000 dots has not been measured; a phone gets about 40% fewer.
- The rail's five decades are the only parts of it that take the keyboard; its memories are reached with the arrow keys,
  the finder or Tab through the card.
