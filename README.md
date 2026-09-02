# Software Engineering Atlas

An interactive atlas of software engineering — understand how software systems
fit together, where technologies and concepts belong, and when their complexity
is actually justified.

This repository is the **content** (canonical Markdown) plus a **presentation
layer** (an Astro site) that renders and navigates it. Markdown and frontmatter
are the source of truth; the website is a view over them.

## Architecture

```text
Markdown / MDX  (guides/ concepts/ decisions/ domains/)
      ↓
Astro build     (static-first, React only for interactive islands)
      ↓
Static website
      ↓
CDN / static hosting
```

### Content model

Four top-level content directories, each with a distinct responsibility:

| Directory    | Answers                        | Purpose                                             |
| ------------ | ------------------------------ | --------------------------------------------------- |
| `guides/`    | "How does this area fit together?" | Sequential, connected long-form explanations.   |
| `concepts/`  | "What is this thing?"          | Canonical, reusable explanations. Self-owning.      |
| `decisions/` | "Should I use this thing?"     | Decision-oriented engineering guidance.             |
| `domains/`   | "Show me this area."           | Territory pages that **aggregate** relevant content. |

Key rules:

- **Concepts are canonical.** Domains reference concepts by *relevance*, they do
  not own them. There is no `owner_domain` / `primary_domain` field.
- **Relationships are derived from metadata**, never duplicated. A domain's
  concepts are computed by asking which concepts list that domain.
- **No empty territory.** Planned domains live in [`TAXONOMY.md`](./TAXONOMY.md)
  until they have real content.

### Frontmatter

Deliberately simple (add fields only when they have a current use):

```yaml
---
title: Transactions
description: Groups operations into a single, all-or-nothing unit of work.
type: foundational # concepts only: foundational | architectural
domains: [backend, data] # relevance, not ownership
related: [concurrency, acid, isolation, locking] # ids; unknown ids show as "planned"
aliases: [] # optional
status: stable # optional: draft | review | stable
---
```

- `type` (concepts) drives the teaching template — `architectural` concepts show
  the "has the system earned this complexity?" prompt; `foundational` ones do not.
- `question` (decisions) is the decision phrased as a question.
- `canonical` (guides) marks the one canonical systems guide.
- `areas` (domains) lists important sub-areas.

Typed graph relationships (`depends-on`, `alternative-to`, …) are intentionally
**not** modelled yet.

## Tech stack

- **Astro** — static-first site generator
- **TypeScript** — strict
- **Tailwind CSS v4** — CSS-first tokens via `@tailwindcss/vite`
- **shadcn/ui** — UI primitives (`src/components/ui/`), themed as an Atlas, not a
  default shadcn app
- **React** — only for interactive islands (search palette, mobile nav)
- **Markdown / MDX** — content

## Project layout

```text
guides/ concepts/ decisions/ domains/   # canonical content (source of truth)
TAXONOMY.md                             # planned vs live domains
src/
  content.config.ts                     # collections (glob loaders → root dirs)
  styles/global.css                     # design tokens + Atlas prose
  lib/                                   # cn() + content access/relevance helpers
  components/
    ui/                                  # shadcn primitives (button, dialog, command, sheet)
    atlas/                               # Atlas components (SystemMap, cards, search…)
    Header/Footer/ThemeToggle
  layouts/                               # Base + concept/domain/decision/guide
  pages/                                 # routes + search-index.json endpoint
```

## Getting started

```bash
npm install
npm run dev
```

Then open the local server Astro prints (default `http://localhost:4321`).

### Scripts

```bash
npm run dev       # start the dev server
npm run build     # production build to dist/
npm run preview   # preview the production build
npm run check     # astro check (TypeScript / content types)
npm run validate  # validate content links & references (see below)
```

### Environment

Set `SITE_URL` to your canonical origin so `<link rel="canonical">` and Open
Graph URLs are correct — in your host/CI, or a local `.env` (copy `.env.example`):

```bash
SITE_URL=https://your-domain.example
```

When `SITE_URL` is unset, the site simply omits absolute canonical URLs rather
than emitting a placeholder domain.

## Adding content

1. Create a Markdown file in the matching directory (`concepts/`, `domains/`,
   `decisions/`, `guides/`). The filename becomes the URL slug.
2. Add frontmatter (see above). `title` and `description` are required.
3. Cross-link with normal Markdown links (e.g. `[Caching](/concepts/caching)`).
4. For a new domain, confirm real concepts reference it, then move it from
   `TAXONOMY.md` to a `domains/` page.

The site regenerates from these files — there is no second content system to
update.

### Drafts

Set `status: draft` on any entry to keep it out of **production** builds
(listings, its own page, aggregation and search all respect this). Drafts stay
visible during `npm run dev` so you can author them. `review` and `stable` (or
no status) publish normally.

### Validating content

```bash
npm run validate
```

Checks the canonical Markdown and separates four cases so intentional gaps are
never confused with mistakes:

- **planned references** — a `related`/`domains`/link target listed in
  [`content.planned.json`](./content.planned.json) (reported as info, never fails)
- **broken references** — a `related` concept id or `domains` id that is neither
  live nor planned (likely a typo)
- **broken internal links** — a Markdown link to `/concepts/…` etc. whose target
  doesn't exist
- **duplicate slugs** — two files resolving to the same URL

It exits non-zero on the real problems, so it can gate CI. When a planned
reference becomes real, remove its id from `content.planned.json`.

## Search

Static, client-side full-text search over titles, **aliases**, descriptions,
domains and body text. A build-time endpoint (`src/pages/search-index.json.ts`)
emits a JSON index; the browser fetches it **only when search is first opened**
and matches locally. No search service, backend or database. Press `⌘K` /
`Ctrl+K` anywhere (the hint shows the right key per platform), or visit
`/search`.

## Deferred by design

This is the v0.1 foundation, not the finished Atlas. Intentionally **not** built
yet: a global knowledge graph, a rich ontology, learning paths, interactive
concept-map/decision-tree visualisations, accounts, bookmarks, and any backend
infrastructure. They can earn their place later.
