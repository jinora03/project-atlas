---
title: Queues
description: Decoupling work from the request that triggered it by processing it asynchronously.
type: foundational
domains:
  - backend
  - data
  - reliability
related:
  - idempotency
  - retries
  - kafka
  - redis
aliases:
  - message queue
  - job queue
  - task queue
status: stable
---

A queue lets a producer hand off work to be done **later, by someone else**,
instead of doing it inside the request. The web request returns immediately; a
**worker** picks the job off the queue and processes it. This decouples the
caller's latency from the work's duration and smooths bursts of load.

## How does it work?

A producer enqueues a **message** describing work to do. A broker stores it
durably. One or more **consumers** pull messages, process them, and acknowledge
success — at which point the message is removed. If a consumer fails to ack, the
message is redelivered, which is why workers must be safe to run more than once.

## Where is it used?

Sending email, generating thumbnails or exports, processing uploads, fanning out
notifications, and smoothing traffic spikes so a slow downstream doesn't take the
whole request path down with it.

## Important properties

- **Delivery is usually "at least once."** Duplicates happen, so consumers must
  be [idempotent](/concepts/idempotency).
- Order is often **not** guaranteed across the whole queue; don't assume it.
- A queue **absorbs bursts** but doesn't add capacity — if work arrives faster
  than workers clear it, the backlog grows without bound.

## Common mistakes

- Assuming exactly-once delivery and skipping idempotency.
- No **dead-letter queue**, so a poison message is retried forever.
- Treating the queue as durable storage rather than a pipe.

## Failure modes

Unbounded backlog growth, poison messages blocking a partition, and duplicate
processing corrupting data when consumers aren't idempotent.

## Related concepts

Queues rely on [idempotency](/concepts/idempotency) and sensible
[retries](/concepts/retries). For a durable, replayable log at scale, teams reach
for [Kafka](/concepts/kafka) — weigh that in
[Do I need a message queue?](/decisions/do-i-need-a-message-queue).
