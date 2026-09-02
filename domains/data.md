---
title: Data
description: Where state lives — durability, consistency and fast access to it.
order: 3
areas:
  - title: Durability & the source of truth
    description: Databases and the guarantees that make data safe to rely on.
  - title: Transactions & consistency
    description: Keeping related changes correct under concurrency.
  - title: Fast access
    description: Caching and in-memory stores that speed up reads.
status: stable
---

The data domain is about **state**: storing it durably, keeping it consistent
when many things touch it at once, and serving it quickly. The database is the
source of truth; caches are fast, disposable copies layered in front.

It is the persistence tier of the [Systems Map](/systems-map) — and the place
where "has this earned its complexity?" matters most, because extra data
infrastructure is expensive to run correctly.
