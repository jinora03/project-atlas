---
title: Redis
description: An in-memory data store used for caching, queues and ephemeral state.
type: architectural
domains:
  - backend
  - data
related:
  - caching
  - queues
  - concurrency
  - pub-sub
status: stable
---

Redis is an **in-memory data store** that keeps data in RAM for very fast reads
and writes, with optional persistence to disk. It offers rich data structures —
strings, hashes, lists, sets, sorted sets, streams — that make it a flexible
building block well beyond a plain key/value cache.

## Where does it fit?

Redis is an **optional architectural technology**. It sits beside your
application as shared, fast, ephemeral state — a tier between the app and the
durable [database](/domains/data).

## What responsibility can it own?

A shared [cache](/concepts/caching), a rate limiter, a session store, a simple
job queue, ephemeral counters, or lightweight pub/sub. It is happiest owning
data that is **fast-changing and tolerant of loss**.

## What problem does it solve?

When a single application instance's in-memory cache isn't enough — because you
run many instances that must share state, or you need atomic counters and
queues across processes — Redis provides one fast, shared place for it.

## How does it work?

It is primarily single-threaded for command execution, which makes many
operations effectively atomic and side-steps a class of
[concurrency](/concepts/concurrency) bugs. Data lives in memory; durability is
optional via snapshots or an append-only log.

## When should I use it?

- Multiple app instances need to **share** a cache, counters, or sessions.
- You need atomic operations (rate limits, locks) across processes.
- A small, fast queue or pub/sub is enough and you don't want more infrastructure.

## When should I NOT use it?

- A single instance's local cache already does the job.
- You need durability and complex queries — that's a database's job.
- You'd be adding an entire new system to serve one small feature.

## Trade-offs

You gain speed and shared state; you take on another service to deploy, secure,
monitor, size for memory, and reason about when it fails.

## Failure modes

Memory exhaustion and eviction of data you assumed was safe, data loss on
restart if persistence is off, and turning an *optimisation* into an implicit
*source of truth* that the system can't run without.

## Common mistakes

- Treating an ephemeral cache as durable storage.
- Not planning for eviction under memory pressure.
- Adding Redis before proving the problem needs it.

## Related concepts

Weigh it deliberately in [Should I use Redis?](/decisions/should-i-use-redis)
and [Should I add a cache?](/decisions/should-i-add-a-cache).
