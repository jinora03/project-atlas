---
title: Do I need a message queue?
question: Do I need a message queue?
description: A queue decouples work from the request — real value, but only if the work is genuinely async and your consumers are idempotent.
domains:
  - backend
  - data
  - reliability
related:
  - queues
  - kafka
  - idempotency
  - retries
  - redis
status: stable
---

A [message queue](/concepts/queues) is one of the more genuinely useful pieces of
optional infrastructure — but it is still infrastructure, and it moves you into
asynchronous, eventually-consistent territory that has its own failure modes.

## When a queue earns its place

- Work is **slow or bursty** and doesn't need to finish inside the request
  (email, media processing, exports, third-party calls).
- You need to **absorb spikes** so a slow downstream doesn't topple the request
  path.
- You want **retries and durability** for background work almost for free.

## When you don't need one (yet)

- The work is fast enough to do inline.
- You need an immediate result to return to the caller.
- Low volume — a **database-backed job table** (`SELECT ... FOR UPDATE SKIP
  LOCKED`) is simpler and may be plenty.

## Queue vs. Kafka

Don't reach for [Kafka](/concepts/kafka) when you mean "run jobs in the
background." Kafka is a durable, replayable **log** for many independent
consumers and high-throughput streams — powerful and heavy. A traditional queue
(or your database) is the simpler answer for task processing. Choose Kafka only
when replay, ordered streams, and multi-consumer fan-out are real requirements.

## The non-negotiable

Whatever you pick, delivery is effectively **at least once**. Your consumers
**must** be [idempotent](/concepts/idempotency), and you need sensible
[retries](/concepts/retries) with a dead-letter path. Skipping this is how queues
quietly corrupt data.

## Related concepts

Understand [queues](/concepts/queues), [idempotency](/concepts/idempotency) and
[retries](/concepts/retries) first; reach for [Kafka](/concepts/kafka) only when
a plain queue genuinely can't do the job.
