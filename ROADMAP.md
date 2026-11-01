# soyjavi.com roadmap

Updated 2026-10-29.

This is the task pool. [SPEC.md](SPEC.md) owns current state and contracts; [AGENTS.md](AGENTS.md) defines the
autonomous workflow that consumes this file. The site has no versions: git is the history.

## How this file works

Every task is one entry that a single commit can finish, with fixed fields (decisions only need their question):

- **ID** — stable, never reused.
- **type** — `bug`, `feature`, `chore`, `content`, `verify` (evidence from a real device or a live service), `deploy`
  (an account, DNS or a publish outside the repository) or `decision`.
- **owner** — `agent` (finished in the repository and proved with tests) or `creator` (@soyjavi: an account, a device
  check, a fact only the creator knows or a product choice).
- **priority** — `high`, `normal` or `low`. The Queue runs top to bottom in the creator's order; in the other lanes,
  order is priority, then position.
- **depends** — IDs that must finish first.
- **board** — for a visual idea, the board in [design/proposals.html](design/proposals.html) with the same ID: it is the
  proposal and its "Accept" is the task's accept. The board is deleted when the change ships.
- **accept** — what proves it done. Agent tasks need evidence a test or command can show.

Lanes:

- **Queue** — approved agent tasks, in the order they will be done. Only the creator moves a task here, with one
  exception that enters at the top: a bug the creator reports.
- **In progress** — at most one agent task.
- **Needs creator** — `verify`, `deploy`, `content` and `decision` tasks, and agent work waiting on one of them.
- **Proposed** — ideas not yet approved, from the creator or from the agent. Never worked on until approved.

When a task ships, delete it and record it in the SPEC section it changes. Every agent task also meets these, on top
of its `accept`: a regression test that fails before the fix, `npm run build && npm test` green, no new dependency
unless the task names it.

## Queue

- **CLOSED-MEMORIES** — Say how much more there is, with a number
  `feature · agent · high` · depends: the creator's figures
  board: CLOSED-MEMORIES
  The sky draws only open memories and nothing private is in the repository, not even as a stub. What the site can add is a number: how many memories are closed in each age and in total, shown in the label of each galaxy and in the hero, so the visitor feels the depth of the book and the clone. The hero already reads `totals` from `life.json` and says "Over 500 memories" / "Más de 500 recuerdos" with the creator's provisional figure; what is left is the count per age, once he gives it. The creator gives those figures and decides whether each galaxy label also carries its count per age; agent work follows: the field and its test, the labels, the hero and the flat page.

- **BUILD-GUARDS** — The build refuses broken data, not only the tests
  `chore · agent · normal`
  A link to a missing memory or to itself, an unknown thread, person or place and a future date are caught only by
  `tests/content.test.mjs`, and `related()` drops a broken link without a word (`explore.js:27`). Memory ids come from
  file names, are never checked and go unescaped into `id` and `data-links` (`src/home.mjs:69-71`).
  accept: on a temporary copy, `loadContent` throws for a bad id, a missing or self link, an unknown person and a future
  month, each naming its file.
- **DOCS-DRIFT** — Remove the dead headline code and the sentences that contradict the code
  `chore · agent · normal`
  The whole-life names are gone but `heads` (`engine.js:149`), `headsQuiet` (`engine.js:443`) and the `priority === 40`
  branches (`engine.js:1660, 1674`) remain, `design/index.html` still says one memory per galaxy is named, and SPEC
  counts the `headlines` tests as covering it. SPEC also says of the age card that Earlier and Later are hidden and that
  they step between ages; that an open memory names its links and that nothing related is named until pointed at; and
  that `npm test` runs `tests/*.test.mjs`, when it runs `tests/**`, the browser suite included.
  accept: grep finds none of the dead state; one sentence per behaviour; a design test rejects the headline sentence.
- **ENGINE-PURE** — Move the logic still inside the engine into tested modules
  `chore · agent · low`
  `engine.js` is 1,755 lines and still holds pure logic the rules place in `explore.js` or `life.js`: the age facts
  (`652-660`), the ring label spot (`1527-1535`), the galaxy label choice (`1546-1570`), the figure name placement
  (`1606-1631`), the tag priority (`1651-1664`), the rail's nearest station (`1295-1304`) and an `overlaps` that
  repeats the one in `explore.js` (`1353`); `skyOf` is computed twice (`120`).
  accept: each one exported and tested in Node; the engine only calls them; no visible change.
- **PERF-CPU** — Stop the per-frame garbage and DOM churn
  `chore · agent · normal`
  The dotted guides are re-projected every frame with destructuring and closures (`scene.js` guides), about 115 KB of garbage a frame; the year-ring labels are measured every frame although they are empty (`engine.js` label loop, `||=` on a width of 0); `data-leader`, `hidden`, `data-edges`, `data-jumps` and `--cx`/`--cy`/`--r` are written with the same value every frame; five to eight `getBoundingClientRect` per frame; `centerOf` and `tagSpots` allocate; the minimap rewrites its attributes every frame; the probe WebGL context of `webglAvailable` is never released.
  accept: a browser test over an idle second counts the mutation records and the DOM reads and they stay under a set budget; no visible change in a before and after capture.
- **PERF-HAZE** — Do not compute the haze noise for every pixel every frame
  `chore · agent · normal`
  The dome shader runs three octaves of noise on a full-screen sphere every frame, about 28% of the GPU frame at a pixel ratio of 2, for a haze that moves 0.01 units a second, and tier 2 still computes it with the haze at zero. Gate it on `uHaze`, then bake it or draw it at half size.
  accept: before and after captures of the opening, the whole-life view and a galaxy are indistinguishable; the draw time of the dome falls in the same headless measurement.
- **PERF-POWER** — Ask for the default GPU
  `chore · agent · low`
  `powerPreference: "high-performance"` forces the discrete GPU on dual-GPU Macs; `"default"` costs nothing on Apple Silicon. Also draw the dust by sorting on its seed and `setDrawRange` instead of discarding in the vertex shader, so the lower tiers submit fewer points.
  accept: the tiers draw fewer points (a test reads the draw range); no visible change.
- **BUNDLE-SHAKE** — Let the bundler drop the parts of three.js the sky does not use
  `chore · agent · normal`
  `site.js` is 708 KB, 194 KB compressed, and three.js is 593 KB of it: the vendored file is minified without pure
  annotations, so a bundle of `Vector3` alone weighs 364 KB. Vendor the source modules of the same release instead; it is
  the same dependency.
  accept: a bundle of `Vector3` alone is under 20 KB; the three.js inputs of the metafile stay under a budget measured
  in the same change; no visible change.
- **BUNDLE-SPLIT** — The flat page does not download the sky
  `chore · agent · normal`
  On the flat page `site.js` runs only the waitlist and the countdown, under 1 KB, but the visitor downloads and parses
  all of it. Build modules with splitting and import the engine after the checks of `engine.js:46-51`; `script-src
  'self'` already allows it.
  accept: the entry chunk is under 10 KB and reaches three.js only through a dynamic import (the metafile says so).

## In progress

_None._

## Needs creator

### The rebuilt site

- **REVIEW-LOOK** — Look at the site and say what to change
  `verify · creator · high`
  accept: the creator has used the home page in both themes on his own screen (`npm run dev`, or `PORT=4391 npm
  run dev` if the port is taken), on his phone, and in Spanish, and has said what to change: the feel of the camera,
  the card, the threads and their names, the related memories, the labels, the rail and the sky itself, and has gone
  through the boards of `design/proposals.html`, approving, changing or discarding each. Each approved change becomes a
  Queue task.
- **LIFE-ARCHIVE** — Send the rest of the memories, the people and the places
  `content · creator · high`
  accept: the creator hands over the remaining two or three hundred memories in batches, in the archive format of the
  README (`npm run import -- archive.json`), each with a date (a year or a month), a weight, the people and places he
  wants public and what it relates to; an agent task imports them (the archive can also define the threads and where the book and the clone
  belong, and has no periods, the date decides the age: see `tools/archive.example.json` and `tools/archive.schema.json`). The people and places filters grow by themselves with those lists. Names of
  people enter the repository only as he approves them, his children included under their own names.
- **THREADS-REVIEW** — Check the threads, the links and the end of the path
  `content · creator · normal`
  accept: the seven threads (home, family, body, craft, ventures, learning, love), each memory's threads and links, and
  the thread each of the book and the clone belongs to (`ahead`) have been read by the creator and changed where they say
  something he would not say. They were drafted from the milestone texts, nothing else.
- **LIFE-VISIBILITY** — Review which milestones are public
  `content · creator · high`
  accept: the creator has gone through the published milestones and, in his own milestones file, through the entries
  still held back, and has approved, changed or removed each. Nothing in this repository lists what is held back.
- **LIFE-FACTS** — Settle the conflicting dates and the gaps
  `content · creator · normal`
  accept: each published milestone whose date the creator's notes give two ways has one date, a year or a month; the
  decades with no milestone (the 1990s after 1994 and the early 2000s) and the years 2023 and 2014 have a milestone or
  are left out on purpose; the dates of the products named in the Satoshi milestone are given if they are to appear.
  Found in review: `first-breakup` is dated 1997 but its text puts it after the first payslip (2001); `last-school-year`
  is dated 1998 and its text says 1999; `born-among-cows` and `born` place the birth in two places. 36 of the memories
  show "~" (`approx`), some of them with a year the text states; an agent task keeps it only where he says the date is
  uncertain.
- **TAGS-AUDIT** — The people and places of each memory match its text
  `content · creator · high`
  Found in review. Memories in Thailand and the return to Asturias are tagged `bali`, and `running` is tagged
  `pirineo-frances`; `yuri`, `missing-stretch` and `two-serious-years` tag people their text is not about, while
  `boda-2019`, `eki-etxea`, `karate-con-eki` and `paternidad` miss the person they are about; the brother is two people
  (`aitor` and `aitor-trayectoria-profesional`), so his filter misses half his memories; Chiang Mai, Hua Hin, Bangkok,
  Asturias and Bilbao are not places although the texts live there; two English place labels are in Spanish,
  `iparralde` overlaps `pirineo-frances`, and `villarcalo` reads like a place.
  accept: the creator approves the people and places of each memory; an agent task applies them in one change, with a
  test that refuses two people with one first name unless the creator lists them as distinct.
- **PEOPLE-PRIVACY** — Nothing private about anyone else
  `content · creator · high`
  The voice rule says nothing about anyone else, yet `two-serious-years`, `first-breakup` and `missing-stretch` tell
  private facts of a partner's life next to tags that name the person, and `people.json` gives full names where a first
  name would do. The text is already in the public history, which is never rewritten; what changes is what the site
  shows.
  accept: the creator decides, sentence by sentence, what stays and whether people appear by first name or full name;
  no memory both names a person and states a private fact about them; the rule for full names is written in AGENTS.
- **REAL-NAMES** — Which names of places, companies and products may appear in a text
  `decision · creator · normal`
  Only Bilbao is named in a memory's text; the others say "a consultancy", "the island", "the city where I was living",
  against the voice rule "real names of places, teams and tools", while the file names, `people.json` and the ages'
  intros already name them. `money`, `splitpasa` and `arca` do not say what they are.
  accept: the creator lists the names that may appear; an agent task writes them into both languages.
- **MEMORY-OVERLAP** — Merge the memories that tell the same thing
  `content · creator · normal`
  `la-egb` and `school-years-grid` tell the same school year; `volver-a-espana-asturias-2026` and
  `visa-schengen-bangkok-2026` share a paragraph; `missing-stretch` and `four-years-dated-by-doing` are about dating the
  archive rather than an event.
  accept: the creator says which to merge, cut or keep; an agent task does it in both languages.
- **CLONE-NAME** — What the clone is called in public
  `decision · creator · normal`
  accept: its public name, and whether any earlier name of it is used in public at all.
- **CLONE-SPEC** — Write the clone as its own project
  `feature · agent · normal`
  depends: CLONE-NAME
  accept: a spec in this repository's docs or in a new repository, as the creator chooses: a public corpus separate
  from private memory, a clear "this is a clone, not me" disclosure, limits on what it answers, backend and provider, privacy of
  visitor messages against the site's "no telemetry" rule, abuse and cost limits, and how the site links to it.

### Before announcing

- **BUTTONDOWN** — Check the newsletter behind the username `soyjavi`
  `deploy · creator · high`
  accept: the Buttondown newsletter `soyjavi` exists and `content/site.json` carries that username; after a push, a real
  address entered in the book's form on www.soyjavi.com appears in Buttondown with the tag `book` and one entered in the
  the clone's form with the tag `clone`, so the two lists are two tags of one newsletter; say whether double opt-in is on. The
  creator checks the free plan's subscriber limit against what he expects; if it is not enough, another service with an
  embeddable form takes its place and the form action, the CSP `form-action` and the tests change with it. The agent
  cannot create or manage the account: it never submits real addresses.
- **CLONE-QUESTIONS** — Choose the questions the clone's card offers
  `content · creator · normal`
  accept: three to five questions in English and Spanish, each with the ids of the public memories the clone would draw on,
  written in `content/questions.json` (`[{ "id", "memories", "en", "es" }]`) or sent for the agent to write there. Until
  then the clone's card shows no questions.
- **BOOK-DETAILS** — What the site says about the book (autobiographical, written so that it serves his children)
  `content · creator · high`
  accept: title, subtitle, a blurb of two or three sentences, expected window or date and whether there is a cover, in
  English and Spanish. The site names no title until then. An agent task `BOOK-PAGE` (title, blurb and date in the book
  station, in both languages) follows it.
- **DEC-PHONE** — Publish a phone number?
  `decision · creator · low`
  The previous page listed one; the new site shows only `hello@soyjavi.com` and X.

### Checks on real services and devices

- **BRAND-BYLINE** — Is the book's byline a first name or a full name?
  `decision · creator · normal`
  The brand is `javi` (decided); the byline of the book is the one open part of the name.
  accept: the creator answers; BRAND-LOCKUP and BOOK-DETAILS use it.
- **OG-REGEN** — Regenerate the share image
  `chore · creator · normal`
  `og-image.png` still draws the old hero text. It needs headless Chromium, so the creator runs `npm run og` and
  commits the image after the copy tasks he wants are in.
  accept: the image shows the current hero; no banned word in it.

- **VERIFY-BRAND** — The new header, favicon, lockup and type scale on a screen
  `verify · creator · high`
  accept: with `npm test` (the browser tests need Chromium) and by eye at 1280×640 and 390×844: the wordmark in the header sits on the nav labels' baseline and the left gutter in both themes, the favicon reads as a j in a tab at 16 px in both lights, the lockups and the clone's disclosure sit at the foot of both cards without pushing the form off screen, and the labels at 12 px and the tags at 17 px (16 on a phone) fit the cards and the scene. Anything off becomes a bug.
- **VERIFY-WAITLIST** — The two forms against a real Buttondown account
  `verify · creator · high`
  depends: BUTTONDOWN
  accept: in Safari, Chrome and Firefox, on desktop and phone, submitting either form opens Buttondown in a new tab,
  creates the subscriber with its own tag (`book` or `clone`) and, when Buttondown asks for a CAPTCHA, lets it complete.
- **VERIFY-DEVICES** — The scene on phones and laptops
  `verify · creator · normal`
  accept: on an iPhone and an Android phone, one finger turns the scene, two zoom it, a tap opens a memory, the address
  bar does not break the framing, the card is not cut, text is readable and the frame rate holds with 60,000 dots (and
  with 120,000 once the archive is in); on a 13-inch laptop the book and clone cards fit their text and their form.
- **DEPLOY** — Publish the redesign
  `deploy · creator · high`
  accept: the change is pushed to `main`, the Pages build is `built`, www.soyjavi.com and www.soyjavi.com/es/ serve the
  scene, the language redirect works from a Spanish and an English browser, night is the first look and the switch keeps paper,
  the files of the previous page (`assets/style.css`, `assets/print.css`, `assets/logo.*`) are gone from the site, the
  sitemap is submitted to the search engines the creator uses, and their page inspection shows the text of `/` and `/es/`
  (the copy is hidden during the entrance; if the rendered page is empty, an agent task follows). The live site still serves the March 2024 page: nothing of this work has been pushed.

## Proposed

Visual ideas have a board in `design/proposals.html`; the others are described here. Nothing here is approved. Most of
it comes from a review of the whole project (the experience, the load, the code and the content) in October 2026,
ordered by what is worth approving first; line numbers are from that review.

### 1. Exploring and sharing

### 2. Load

From the performance audit (24 frames a second already ships):

- **PERF-AUDIO** — Shorten the reverb of the sound bed
  `decision · creator · low`
  The bed runs a 5 s convolution reverb continuously once sound is on: about 7 points of a core, 6.6 of them the reverb. A 2.5 to 3 s tail halves it and `latencyHint: "playback"` saves a little more, at 20 to 40 ms of latency on the bells. Listen to both and choose, or fade the bed out after some idle minutes.
- **PERF-RATIO** — Pixel ratio 2 or 1.5 on a retina screen
  `decision · creator · low`
  Capping at 1.5 saves about 22% of the GPU frame and slightly fades the dotted outlines and enlarges the selection ring; the clouds look the same. Only the creator's eye can say.

### 3. Guards and documents

### 4. Copy and depth — need the creator's words or approval

- **BOOK-HOOK** — The book says why, in his own words
  `content · agent · normal`
  board: BOOK-HOOK
  `book.body` and `book.hint` are general ("my life, what I've learnt…"), while the creator's strongest reason for the
  book is already public in one of his memories (`clonara`). Draft the book's text and the hero's lede from those words,
  in both languages, adding nothing he has not said.
  accept: the creator approves both texts; the voice tests stay green.
- **HERO-WORD** — "Milestones" or "memories"
  `decision · creator · low`
  board: HERO-WORD
  The hero and the page title say "A life, in milestones" / "Una vida en hitos", while the rules keep one word, memory,
  for each memory, and the lede follows them.
  accept: the creator keeps it or changes it; the title, the hero and the share image follow.
- **MILESTONE-MEDIA** — A photo or a sound at a milestone
  `feature · agent · low` · depends: the creator's approval of each file
  board: MILESTONE-MEDIA
  Optional media for a milestone, shown in its card, only where the creator has approved it.
