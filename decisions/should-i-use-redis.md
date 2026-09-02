---
title: Should I use Redis?
question: Should I use Redis?
description: Redis is a fast, flexible tool — and a whole new system to run. Make it earn the operational cost.
domains:
  - backend
  - data
related:
  - redis
  - caching
  - queues
status: stable
---

[Redis](/concepts/redis) is genuinely useful, which is exactly why it gets added
before it's needed. The question is not "is Redis good?" (it is) but "has this
system **earned** a new stateful service to operate?"

## Has the system earned this complexity?

Adding Redis means one more thing to deploy, secure, monitor, size for memory,
back up (or knowingly not), and reason about during incidents. That cost is
worth paying only when a real problem justifies it.

## When to use it

- **Multiple app instances must share** cache, counters or sessions — a local
  in-process cache genuinely can't.
- You need **atomic cross-process** operations: rate limiting, distributed
  locks, leaderboards.
- A small, fast **queue or pub/sub** solves a real need and you don't want
  heavier infrastructure.

## When *not* to use it

- A single instance's in-memory cache already works — you're solving a problem
  you don't have yet.
- You actually need **durability and rich queries** — that's a database.
- You're reaching for it out of habit or résumé-driven design.

## Alternatives to weigh first

- In-process caching (a map with expiry) for single-instance needs.
- Your existing database for queues at low volume (`SELECT ... FOR UPDATE`).
- [HTTP](/concepts/http)/CDN caching for shared read-heavy content.

## Trade-offs

You gain shared, fast, ephemeral state and atomic primitives. You take on
another service and the discipline to treat its data as **losable**.

## The failure you're signing up for

Plan for eviction and restart *now*: what breaks when Redis is empty or
unreachable? If the answer is "everything," you've turned an optimisation into a
[source of truth](/concepts/caching) — the exact outcome to avoid.
