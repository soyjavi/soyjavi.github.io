# soyjavi.com roadmap

Updated 2026-10-04.

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

_None._

## In progress

_None._

## Needs creator

### The rebuilt site

- **REVIEW-LOOK** — Look at the site and say what to change
  `verify · creator · high`
  accept: the creator has used the home page in both themes on his own screen (`npm run serve`, then `PORT=4391 npm
  run serve` if the port is taken), on his phone, and in Spanish, and has said what to change: the feel of the camera,
  the card, the threads and their names, the related memories, the labels, the rail and the sky itself, and has gone
  through the boards of `design/proposals.html`, approving, changing or discarding each. Each approved change becomes a
  Queue task.
- **LIFE-ARCHIVE** — Send the rest of the memories, the people and the places
  `content · creator · high`
  accept: the creator hands over the remaining two or three hundred memories in batches, in the archive format of the
  README (`npm run import -- archive.json`), each with a date (a year or a month), a weight, the people and places he
  wants public and what it relates to; an agent task imports them (the archive can also define the periods, the threads and where the book and the clone
  belong: see `tools/archive.example.json` and `tools/archive.schema.json`). The people and places filters grow by themselves with those lists. Names of
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
  the old `/blog/` and the files of the previous page are gone from the site, and the sitemap is submitted to the search
  engines the creator uses. The live site still serves the March 2024 page: nothing of this work has been pushed.

## Proposed

Visual ideas have a board in `design/proposals.html`; the others are described here.

From the brand and copy review (the creator asked for the name, the type and every sentence to be worked properly, and
does not want the word AI on the site). Nothing here is approved.

Ordered by what must be decided or applied first; each group names what it waits on.

### 1. Copy of the home and the two offers — after CLONE-NAME and BOOK-DETAILS; the voice rules are in `design/index.html` and tested

- **COPY-CLONE** — A place to keep talking, when I am no longer here
  board: COPY-CLONE
  The clone's card says its purpose in his words, that it is not ready, and nothing it can do; the nav and kicker say My clone. The public name stays CLONE-NAME.
- **COPY-BOOK** — For my children, and for whoever wants it
  board: COPY-BOOK
  The book's card says who it is for and what it holds (what went well and what went wrong) and promises no date.
- **COPY-HERO** — A hero that says who, what and what comes next, in 45 words
  board: COPY-HERO
  Replace the 74-word lede and the clone link; both offers named, no AI.
- **COPY-WAITLIST** — Softer words for the lists and the nudge
  board: COPY-WAITLIST
  No time promises, no tool words on the lists; the creator decides whether the nudge may appear on memories about loss.
- **MEMORY-TENSE** — One tense for every memory, and one sentence to confirm
  `decision · creator · normal`
  board: MEMORY-TENSE
  Historic present or past for all the memories in both languages, and the guide sentence about what changed and mattered.
- **COPY-META** — What a search result and a shared link say
  board: COPY-META
  A description of at most 155 characters in both languages, and a 404 in the sky's vocabulary.

### 2. Scene and sound — decisions on feel

- **ENTRANCE-CHOREOGRAPHY** — Scene · the first ten seconds as one piece
  `decision · creator · normal`
  board: ENTRANCE-CHOREOGRAPHY
  Sky first, galaxies in life order with their glow, names last; the creator says the feeling and which beats stay.
- **YEAR-RINGS** — Rings that read as rings when you come close
  `decision · creator · low`
  board: YEAR-RINGS
  The dashed year rings look like loose strokes close to a galaxy: a continuous hairline, a ring that fades near, or ticks.
- **AUDIO-ENTRANCE** — Sound as early as a browser allows
  `decision · creator · low`
  board: AUDIO-ENTRANCE
  Shorten the fade to two or three seconds, or also hold the opening until the first gesture; a gate was tried and rejected.



### 3. Reading the memories — creator decisions on the look

- **KIND-TINT** — Show the kind of each memory
  `decision · creator · normal`
  board: KIND-TINT
  A faint tint per kind (an exception to the no-hue rule) or a small mark per kind (one ink), as a toggle.
- **PORTRAIT-DOTS** — The avatar as a dot portrait
  board: PORTRAIT-DOTS
  The masked figure of `assets/avatar.jpg` drawn with the fine dots as a station, to say "more than a person" without
  words.

### 4. Depth and the book — need content or approvals from the creator

- **MILESTONE-MEDIA** — A photo or a sound at a milestone
  board: MILESTONE-MEDIA
  Optional media for a milestone, shown in its card, only where the creator has approved it.
- **DEPTH-LOCKED** — Show how much more there is than what is public
  board: DEPTH-LOCKED
  Fine, unnamed dots for the memories the creator keeps for the book and the clone, with a count he chooses to publish, so
  a visitor feels the depth behind the named ones; pressing one says it is in the book. Nothing about what a locked
  memory holds is ever in the repository.
- **BOOK-CHAPTERS** — The book as nodes
  board: BOOK-CHAPTERS
  Chapters of the book as hollow rings that open a card with their blurb and the memories they draw on.
- **PRIVATE-EDITION** — A family-only edition from the private archive
  board: PRIVATE-EDITION
  The book's chapters and the sky for the creator's children, built from the same archive with the private milestones
  included, outside the public repository.
- **DREAM-ARCS** — What was wished for, done and let go
  board: DREAM-ARCS
  An arc from the memory where something was wished for to the one where it came true; what is still pending is a hollow
  ring ahead, like the book and the clone. Needs the dreams the creator is willing to make public.
- **RELATIONS-VIEW** — A view of who and what was connected
  board: RELATIONS-VIEW
  A network view that draws the links themselves, once there are hundreds of them.
