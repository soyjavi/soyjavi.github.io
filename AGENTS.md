# soyjavi.com — agent instructions

The personal site of Javi (@soyjavi): one immersive three.js space where a life from 1980 to today is a cloud of dots per
memory, gathered into a galaxy per period of the life and explored freely, with two rings ahead for a book for his
children and his clone, each with its own waitlist. It is not a portfolio and has no blog: it
shows a life and sells those two things. English and Spanish, light and dark, static, no tracking. These are the rules for working on it. Personal rules of the creator live in
`~/.claude/CLAUDE.md` and apply on top.

## Documents

Four documents, each answering one question. Put information in the one that owns it and nowhere else.

| File | Question | Never contains |
| --- | --- | --- |
| `README.md` | What is this and how do I run, edit and publish it? (for humans) | Contracts, status, history |
| `AGENTS.md` | Which rules apply when working here? | Status, tasks, history |
| `ROADMAP.md` | What is left to do? (its header defines fields and lanes) | Shipped work |
| `SPEC.md` | How does the site work today? Content model, build, scene, languages, waitlists, tests | Dates, task status, investigation logs |

- Start from README, SPEC's current-state section and ROADMAP; then read the SPEC section the task touches.
- **SPEC** is present tense and edited in place: when behaviour changes, rewrite the section that owns it.
- There is no CHANGELOG and no version number: the site ships from `main`, and `git log` is the history.
- Update the owning document in the same change as the code. Decisions go to the list below or to SPEC, remaining
  work to ROADMAP, never to chat history or extra status files. `design/` is the visual reference, not a document.

## Workflow

The creator runs the project as an autonomous loop with the user-level `next-task` skill (usually `/loop /next-task`)
and the `adversarial-reviewer` agent in `~/.claude/`. Each iteration takes one approved task, implements and tests it,
has the reviewer try to break it, applies the findings, validates, commits and pushes.

Project wiring for those tools:

- **Task pool:** `ROADMAP.md`. Only `owner: agent` tasks in Queue are worked on; only the creator approves a task into
  Queue.
- **Version:** none. Nothing is bumped and nothing is released: a push to `main` publishes.
- **Validation:** `npm run build && npm test` before claiming done. `npm test` fails if a generated file is stale, so
  commit the output of `npm run build` with the change. The browser tests need Chromium: `npm run browsers` once.
- **CI:** there is no workflow. GitHub Pages builds `main` from the repository root; after a push check
  `gh api repos/soyjavi/soyjavi.github.io/pages/builds/latest` and that www.soyjavi.com serves the change. A failed
  Pages build, or a failing `npm test` on `main`, is the next task.
- **Review checklist**, on top of the generic one: every sentence about the creator comes from the creator or from a
  public repository (nothing is invented, unknowns stay `null` and become a `Needs creator` task); both languages
  changed together; no request leaves the origin except the two waitlist forms; no inline script or handler; a keyboard and
  a screen reader reach every station and both waitlists; the flat page is complete without WebGL2; short and narrow
  viewports (1280×640, 390×844) keep the card, the controls and the email field on screen; generated files match their sources.

Rules of the loop:

- Invoking `/next-task` or `/loop /next-task` is the creator's explicit request to commit and push each finished task
  once review and validation pass. Outside the loop, commit only when asked in the current turn. When the creator says
  not to commit, prepare and validate but leave the change uncommitted until told otherwise.
- Adversarial review before every commit; a second pass on the deltas when the fixes were substantive.
- Interruptions: triage before continuing, and say where each item went. A bug the creator reports goes to the top of
  Queue; a requested feature goes to Queue; ideas, including your own, go to Proposed; questions get answered.
- Anything needing the creator's accounts (Buttondown, DNS, GitHub settings), a real device or a product choice becomes
  a `Needs creator` task.
- Stop and report when Queue is empty or everything is blocked on the creator.

## Engineering rules

- Implement only the approved scope. Propose product or visual changes, never ship them without the creator's
  validation.
- Every functional change ships with a test that fails without it: pure logic in `tests/*.test.mjs`, behaviour that
  needs a page in `tests/browser/`. Check that a new test bites by breaking the code it guards.
- Copy lives in `content/`, never in templates or the engine. A new key goes into `en.json` and `es.json` in the same
  change; a memory is one file in `content/memories/` with both languages. Archives are imported with `npm run import`, which only writes entries marked public.
- Generated files are never edited by hand: `index.html`, `es/`, `404.html`, `sitemap.xml`, `robots.txt`,
  `assets/site.js`, `assets/brand/*.svg`, `favicon.svg` and the two PNG icons (`npm run brand` rewrites them from the font). The sources are `content/`, `src/`, `assets/js/` and `tools/build.mjs`; `npm run build` rewrites
  `es/` entirely.
- The page is HTML first. Every station is a real element with `data-station` and every panel a `data-panel`; the
  engine reads them (with the threads, people, places and links of each memory) and clones the panel into the card, so
  the document stays the source of truth for text, for screen readers and for the flat page.
- Geometry and behaviour live in pure modules testable in Node, with no DOM and no three.js: `assets/js/life.js` (the
  sky, lanes, dots), `explore.js` (search, related memories, sequence, levels) and `orbit.js` (camera maths). The
  engine and `scene.js` only place, move and listen, and the controls and the rail are generated at build time in
  `src/explore.mjs` and `src/rail.mjs` from the same data. Nothing may assume the number of memories: the site is built
  for two or three hundred, so counts in tests and in `design/` come from the data.
- Colours come from the twelve neutral tokens of `assets/brand.css`; a test rejects any hue, any colour that is not a
  token and any text pair under 4.5 to 1. The wordmark is the outlined SVG, never live text and never dots. No new
  dependency in the browser bundle beyond three.js.
- No analytics, cookies, fingerprinting or third-party scripts, fonts or images. `localStorage` holds only the chosen
  language and theme. The CSP in `src/layout.mjs` is the contract; widening it needs the creator's approval.
- Never use real external endpoints in tests: Buttondown is answered by a route in the browser test.
- Parallel shell calls use absolute paths; a `cd` in one call leaks into its siblings.
- Remote: `git@github.com:soyjavi/soyjavi.github.io.git`, branch `main`. Never rewrite pushed history.

## Voice and copy

Every sentence on the site and in the documents follows the twelve rules in the voice section of `design/index.html`,
and `tests/voice.test.mjs` enforces the mechanical ones. The four that were broken before:

- The offer is "my clone" / "mi clon" on the site and "the clone" in documents; the words the test bans never appear
  anywhere, tests aside, and the list lives only in the test.
- No promise of time or of ability: say the state ("isn't open yet"), what it is for, and that it is not ready.
- The site is "I" and the reader "you" / "tú"; one word per thing (memory, cloud, galaxy, stage, thread, hollow ring).
- A new key goes into both languages together, with the Spanish written, not translated word for word.

## Design kit

`design/index.html` is the hand-written brand: essence, name, wordmark, colour in two lights, type, the sky, the scene, the interface,
voice, applications, rules and assets. Keep it equal to what ships: a token, a station or a rule that changes updates it
in the same change (the tests compare its swatches and contrast ratios with `assets/brand.css`, its stations with the
home page, its interface controls with the home page, and its sky numbers and figure with the code).
`design/proposals.html` holds one board per idea nobody has approved, with the same ID as its ROADMAP entry: the ID, the
area, a title, why, a "Now" drawing of what ships, a "Proposed" drawing and what proves it done (`<strong>Accept</strong>`),
drawn only with the brand tokens (a board that proposes breaking a token rule may draw the exception and says so, marked
`data-exception`). A board is deleted in the same change that ships it, and a test fails when a board has
no ROADMAP entry or is malformed.

## Product decisions (non-negotiable)

- The site is a life, not a résumé, and it is explored, not scrolled: a soft cloud of dots for each memory (not a sharp
  point) from 1980 to today, a free camera, one galaxy per period of the life, threads, people and places as filters,
  and what a memory is related to lit when it is open. Two hollow rings
  ahead are the book and the clone. The form is clear and the memories are diffuse; the name is never spelled with dots.
  Nothing is only reachable in order: clicking, the rail, the finder, Surprise me, related memories and the keyboard
  all get there, and Earlier and Later are one way among them.
- The brand is `javi` in outlined Instrument Serif Italic; `soyjavi` is an address (domain, X, email), not the
  brand. The identity has no hue: twelve neutrals in a light and a dark theme (the one exception is `KIND_TINT`, a barely
  perceptible warm or cool tint of the memory clouds by kind, drawn in the scene only, never in the interface and never
  above 15%), night first and a remembered
  switch to paper.
- Two languages from day one. At `/` the browser's primary language decides: Spanish goes to `/es/`, anything else
  stays in English. A choice made with the language switch is remembered and wins; a direct link to `/es/` or to any
  other page is never redirected.
- Static hosting on GitHub Pages at www.soyjavi.com (`CNAME`). No server code, no build step on the host.
- This repository is public. A life milestone enters it only after the creator has approved it as public, written as
  public text with only the date precision he allows: here a year or a month, never a day. Everything he has not
  approved stays in his own archive and never enters the repository, its history, a test, a fixture or a doc, and no
  document here names what is held back. People, his children included, appear by their own names, as in his archive:
  names are not private. No person carries a day or a photo unless he decides otherwise, and the clone is named publicly
  only as he says. Who took part in a public memory may come from his archive; nothing else private does.
- The site is not a portfolio and has no blog, writing section or feed. It shows a life and sells two things: the book
  and the clone. Contact is the email address and X, nothing else (no GitHub, no companies).
- The book and the clone are announced and each has its own waitlist, but the repository carries no title, blurb, cover or
  date for the book and no public name for the clone until the creator provides them.
- Each waitlist is a Buttondown embed form, one newsletter with a tag per list (`book`, `clone`): the only third-party
  origin on the site, reached on submit and never on load, in a visible new tab; the site never says a signup
  succeeded. Without a username in `content/site.json` the lists say they aren't open yet. There is no `mailto` for joining.
- Reduced motion, no WebGL2 or a window too small to read the panels gets the flat page, which carries every
  section; it is not a degraded version.
- The repository is served as it is: `.nojekyll` stays, and nothing on the host builds or rewrites a file.

## Live environment boundaries

- The Buttondown account, DNS, the GitHub Pages settings and real devices are the creator's: never create accounts,
  never submit real addresses to a live form and never change Pages settings.
- A green suite is not a device check, and a pushed commit is not a verified deployment; keep implemented, deployed
  and verified apart in ROADMAP and in reports.
