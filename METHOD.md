# METHOD — how the Atlas teaches

This document defines the *method* behind Atlas content: what it is for, how the
four content types relate, and the principles every article follows. It is
governance, not a page on the site.

> Note: this file was created during v0.1 content authoring. If you have an
> earlier canonical METHOD document, it supersedes this one — merge accordingly.

## What the Atlas teaches

The Atlas helps engineers understand, for any technology or concept:

- where it belongs and what responsibility it owns,
- what problem it solves and how it works,
- what it interacts with,
- what trade-offs and failure modes it introduces,
- and **when its complexity is justified**.

It does **not** teach that real systems always need Redis, Kafka, Kubernetes, or
microservices. It teaches that these solve specific problems and must earn their
place.

## The four content types

| Type         | Answers                        | Job                                                    |
| ------------ | ------------------------------ | ------------------------------------------------------ |
| `concepts/`  | "What is this thing?"          | Canonical, reusable explanation. Self-owning.          |
| `decisions/` | "Should I use this thing?"     | Decision-oriented reasoning and trade-offs.            |
| `domains/`   | "Show me this area."           | Territory pages that **aggregate** relevant content.   |
| `guides/`    | "How does this fit together?"  | Long-form, connected explanation across many concepts. |

## Core principles

1. **Concepts are canonical.** A concept is understood in its own right. Domains
   reference concepts by *relevance*, they do not own them. There is no
   `owner_domain` / `primary_domain` field.
2. **Relationships are derived from metadata, never duplicated.** A domain's
   concepts are computed from each concept's `domains:`. A concept's related list
   drives its cross-links. Don't hand-maintain the same list twice.
3. **No empty territory.** A domain earns a page only when real concepts
   reference it; until then it lives in `TAXONOMY.md`.
4. **Earned complexity.** For optional architectural technology, keep one
   question in view: *has the system actually earned this complexity?* Never show
   that prompt on foundational concepts where it makes no sense.

## Foundational vs architectural concepts

Concepts carry `type: foundational | architectural`, which drives how they are
taught (see the templates).

- **Foundational** (HTTP, DNS, transactions, threads…): things you must
  understand. Explain what/how/where, properties, mistakes, failure modes.
- **Architectural** (Redis, Kafka, Elasticsearch…): optional technologies and
  choices. Explain where they fit, what responsibility they own, the problem they
  solve, and — explicitly — when *not* to use them and what they cost. These show
  the "earned complexity" prompt.

Do not force every article into identical headings. The templates are guidance;
vary structure to fit the concept.

## From Markdown to a page

- Markdown/frontmatter is the **source of truth**; the site is a presentation
  layer over `guides/ concepts/ decisions/ domains/`.
- `status: draft` hides an entry from production builds (visible in `dev`).
- A `related:` id that has no file yet is either **planned** (list it in
  `content.planned.json`) or a **typo** — `npm run validate` distinguishes them.
- Keep frontmatter simple; add a field only when it has a current use.

See [STYLE.md](./STYLE.md) for writing conventions and `templates/` for concrete
starting points.
