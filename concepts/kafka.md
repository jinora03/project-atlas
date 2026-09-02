---
title: Kafka
description: A durable, replayable, distributed log for high-throughput event streaming.
type: architectural
domains:
  - data
  - backend
  - reliability
related:
  - queues
  - idempotency
  - observability
  - pub-sub
aliases:
  - Apache Kafka
  - event streaming
  - log
status: stable
---

Kafka is a distributed, durable **commit log**. Producers append events to
ordered, partitioned **topics**; consumers read them at their own pace and can
**replay** from any point. It is less a message [queue](/concepts/queues) and more
a persistent, replayable stream — which is exactly why it is powerful and why it
is often more than a system needs.

## Where does it fit?

Kafka is an **optional architectural technology** for the data-in-motion tier:
event pipelines, stream processing, and decoupling many producers from many
consumers at high volume.

## What responsibility can it own?

A durable event backbone: the ordered record of "what happened," which many
independent consumers (analytics, search indexing, audit, notifications) read
without coordinating. Retention and replay are its signature.

## What problem does it solve?

When you need **high throughput**, **ordered** per-key streams, **multiple
independent consumers** of the same events, and the ability to **replay history**
— guarantees a simple queue doesn't offer — Kafka fits.

## When should I use it?

- Many consumers need the **same** stream of events, independently.
- You need to **replay** events (reprocess, backfill a new consumer).
- Sustained throughput is genuinely high and ordering per key matters.

## When should I NOT use it?

- You just need background jobs — a normal [queue](/concepts/queues) (or your
  database) is far simpler.
- Low volume, one producer, one consumer.
- Your team can't take on operating a stateful distributed cluster.

## Trade-offs

You gain durability, replay, and fan-out at scale; you take on a demanding
stateful distributed system to run, size, and reason about — partitions,
consumer groups, offsets, and rebalancing.

## Failure modes

Consumer lag growing unbounded, rebalancing storms, hot partitions from a bad
key choice, and duplicates on redelivery (consumers must be
[idempotent](/concepts/idempotency)).

## Related concepts

Kafka is the heavy, replayable cousin of [queues](/concepts/queues); decide
between them in
[Do I need a message queue?](/decisions/do-i-need-a-message-queue).
