---
title: Retries
description: Automatically re-attempting failed operations — carefully.
type: foundational
domains:
  - backend
  - reliability
related:
  - idempotency
  - queues
  - rate-limiting
  - observability
aliases:
  - retry
  - backoff
  - exponential backoff
status: stable
---

Retries turn **transient** failures — a dropped packet, a momentary timeout, a
briefly overloaded dependency — into successes, by simply trying again. Done
well, they hide the small failures distributed systems constantly produce. Done
badly, they turn a small problem into an outage.

## How does it work?

On a failed call, wait and try again. The waiting matters: **exponential
backoff** (1s, 2s, 4s, …) with **jitter** (randomised delay) prevents a swarm of
clients from retrying in lockstep and hammering a struggling service. A **retry
budget** or cap bounds the total attempts.

## When retrying is safe

Only retry when the operation is **[idempotent](/concepts/idempotency)** — safe
to run more than once — or when you know it didn't take effect. Retrying a
non-idempotent "charge card" call can double-charge. Retry **timeouts and 5xx**;
do **not** retry **4xx** (the request itself is wrong).

## Important properties

- **Backoff + jitter** are not optional at scale — synchronised retries cause
  *retry storms*.
- Retries amplify load exactly when a system is weakest, which is how they turn
  a blip into a cascading failure.
- Pair with **timeouts** and **circuit breakers** so you stop hitting a
  dependency that is clearly down.

## Common mistakes

- Retrying non-idempotent operations, causing duplicates.
- Immediate, unbounded retries with no backoff — a self-inflicted DDoS.
- Retrying `4xx` errors that will never succeed.

## Related concepts

Retries are only safe with [idempotency](/concepts/idempotency); combine with
[rate limiting](/concepts/rate-limiting) to protect the callee and
[observability](/concepts/observability) to see when they're firing. Queued work
gets retries almost for free — see [queues](/concepts/queues).
