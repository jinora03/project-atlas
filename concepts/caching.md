---
title: Caching
description: Keeping fast, disposable copies of data to avoid repeating work.
type: foundational
domains:
  - backend
  - data
  - web
related:
  - redis
  - cdn
  - http
  - indexes
  - invalidation
status: stable
---

A cache stores the result of expensive work — a query, a computation, a remote
fetch — so the next request can be served from a **fast, disposable copy**
instead of doing the work again. The defining property is that a cache can be
thrown away at any time without losing the source of truth.

## How does it work?

On a **hit**, the cached value is returned directly. On a **miss**, the system
does the real work, stores the result, and returns it. Entries expire by time
(TTL), by capacity (eviction policies like LRU), or by explicit invalidation
when the underlying data changes.

## Where is it used?

Browser and [CDN](/concepts/cdn) caches for [HTTP](/concepts/http) responses,
in-memory application caches, database query caches, and shared caches backed by
a store like [Redis](/concepts/redis).

## Important properties

- A cache is an **optimisation, not a source of truth** — the system must still
  be correct if the cache is empty.
- **Hit rate** is what determines whether a cache is worth its complexity.
- The hard question is always **invalidation**: keeping copies from drifting
  from reality.

## Common mistakes

- Caching data that changes constantly, so the hit rate is near zero.
- No expiry or invalidation, so users see stale data indefinitely.
- Caching per-user or sensitive data in a shared cache.

## Limitations / failure modes

Stale reads, cache stampedes (many misses at once hammering the origin), and
subtle bugs where the cache and source of truth disagree.

## Related concepts

Before reaching for a cache, weigh the trade-offs in
[Should I add a cache?](/decisions/should-i-add-a-cache). A shared cache is one
job [Redis](/concepts/redis) can own.
