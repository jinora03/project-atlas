---
title: SQL or NoSQL?
question: SQL or NoSQL?
description: Start relational unless a specific access pattern or scale need pushes you off it — and know which need.
domains:
  - data
  - backend
related:
  - databases
  - sql
  - indexes
  - transactions
  - isolation
status: stable
---

"NoSQL" is not one thing, and "which database?" is really "which data model and
which guarantees?" The honest default for most systems is a **relational
[database](/concepts/databases)** — it gives you [SQL](/concepts/sql), joins,
[transactions](/concepts/transactions), and constraints, and it scales much
further than folklore suggests once it is properly [indexed](/concepts/indexes).

## Start relational

A well-indexed relational database handles the vast majority of applications,
including large ones. It keeps your data correct with constraints and
transactions, and it stays flexible because you can query it any way later. Reach
past it for a **reason**, not a vibe.

## When NoSQL earns its place

- **Document stores** — your data is genuinely hierarchical/schema-flexible and
  you almost always fetch it by one key. (You can still model this in Postgres
  with JSON — measure first.)
- **Key-value** — you need a simple, enormous, low-latency lookup and nothing
  more.
- **Wide-column** — write throughput and horizontal scale beyond a single
  primary, with a known query shape decided up front.
- **Graph** — relationships are the primary query (deep traversals, paths).

## What actually drives the choice

1. **Access patterns** — how will you read this data, overwhelmingly?
2. **Consistency needs** — can you tolerate eventual consistency, or do you need
   [transactions](/concepts/transactions) and [isolation](/concepts/isolation)?
3. **Scale** — real, measured scale, not imagined scale.
4. **Operational cost** — who runs it at 3am?

## The trap

Choosing NoSQL for "scale" you don't have, then discovering you need joins,
transactions, or ad-hoc queries the model can't serve. Losing relational
guarantees is easy to regret and hard to reverse.

## Related concepts

Weigh this against how [databases](/concepts/databases),
[SQL](/concepts/sql), [indexes](/concepts/indexes),
[transactions](/concepts/transactions) and [isolation](/concepts/isolation)
actually work before committing.
