---
title: Should I add a cache?
question: Should I add a cache?
description: A cache is a fast, disposable copy — powerful, but it adds a second source of truth to keep honest.
domains:
  - backend
  - data
  - web
related:
  - caching
  - redis
  - cdn
  - indexes
status: stable
---

Caching is one of the highest-leverage optimisations available — and one of the
easiest to add prematurely. The core tension: a [cache](/concepts/caching) is a
second copy of your data, and now you have to keep two things in agreement.

## Start with the question behind the question

Most "we need a cache" moments are really one of:

- **The same expensive work is repeated** for the same inputs.
- **A downstream system is slow or rate-limited.**
- **Read volume dwarfs write volume.**

If none of these is true, a cache mostly adds risk.

## When to use one

- Reads far outnumber writes, and the data tolerates being **slightly stale**.
- The work being cached is genuinely expensive (a heavy query, a remote call).
- You can articulate an **invalidation** story before you start.

## When *not* to use one

- The data changes on nearly every read — your hit rate will be near zero.
- Correctness demands the latest value every time.
- You haven't measured, and "it feels slow" is the only evidence.

## Cheaper alternatives to try first

- Fix the slow query or add the missing index.
- Reduce payload size or number of round trips.
- Use HTTP cache headers and a [CDN](/concepts/cdn) for static or shared content
  before adding an application cache.

## Trade-offs

A cache buys latency and load relief at the cost of a new failure surface: stale
reads, invalidation bugs, and stampedes. Keep it an optimisation the system can
live without — never a silent source of truth.

## If you do cache

Decide **where** it lives. An in-process cache is simplest; a shared cache
across instances is where you might reach for [Redis](/concepts/redis) — which
is its own [decision](/decisions/should-i-use-redis).
