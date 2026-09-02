# STYLE — writing the Atlas

How Atlas articles should read. The goal is prose an experienced engineer
respects: precise, calm, and free of filler.

> Note: this file was created during v0.1 content authoring. If you have an
> earlier canonical STYLE document, it supersedes this one — merge accordingly.

## Voice

- **Technical, restrained, calm.** Explain; don't sell. No marketing adjectives,
  no hype, no exclamation points.
- **Precise over comprehensive.** A short article that is exactly right beats a
  long one that hedges.
- **Lead with the essence.** The first paragraph should define the thing and why
  it matters, before any heading.
- **Name the trade-off.** Every technology costs something; say what.

## Structure

- Templates in `templates/` are **guidance, not rigid forms**. Use the headings
  that serve the concept; drop the ones that don't. A foundational concept and an
  architectural one are taught differently on purpose.
- Prefer short sections with descriptive headings over one long wall.
- Use lists for genuine enumerations (properties, mistakes, options), prose for
  reasoning.

## Sentences and words

- Active voice, present tense.
- **Bold** the key term when you first define it, and the one idea a section
  turns on. Use it sparingly — if everything is bold, nothing is.
- `code` for literals: identifiers, HTTP methods, status codes, commands,
  config.
- Avoid "simply", "just", "obviously" — they shame the reader who didn't find it
  obvious.
- Don't teach that production systems *always* need a given technology.

## Links

- Cross-link canonical concepts **inline**, on first meaningful mention, using
  the site path: `[transactions](/concepts/transactions)`.
- Link to decisions where a choice is involved:
  `[Should I add a cache?](/decisions/should-i-add-a-cache)`.
- Don't duplicate a related-concepts list in prose *and* frontmatter — the
  `related:` field renders the sidebar; the prose links the ideas as they arise.
- Link to a concept, not around it: prefer `/concepts/dns` over "the DNS page".

## Frontmatter conventions

```yaml
title: Transactions            # required
description: One clear sentence. # required — used in cards, search, <meta>
type: foundational             # concepts only: foundational | architectural
domains: [backend, data]       # relevance, not ownership
related: [isolation, concurrency, databases, locking]  # ids; unknown = planned or typo
aliases: [ACID]                # optional alternate names (searchable)
status: stable                 # optional: draft | review | stable
```

- `question:` (decisions) — the decision phrased as a question, e.g. "Should I
  add a cache?"
- `canonical:` (guides) — mark the one canonical systems guide.
- `order:` (domains, guides) — sort order in listings.
- `areas:` (domains) — important sub-areas `{ title, description }`.

## Length

- **Foundational concept:** ~150–350 words of body. Enough to be genuinely
  useful; not a textbook chapter.
- **Architectural concept:** slightly longer — it must cover "when not to" and
  the cost.
- **Decision:** reasoning-first; options, when/when-not, trade-offs.
- **Domain:** a short orienting overview; the page aggregates the rest.
- **Guide:** long-form and connected — this is where depth lives.

## The one test

Before publishing, ask: *would an experienced engineer learn something true and
non-obvious, and trust the source?* If it reads like a generated summary, rewrite
it.
