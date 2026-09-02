---
title: Reliability
description: Keeping a system correct and available while things fail, retry, and overload.
order: 6
areas:
  - title: Failure handling
    description: Retries, idempotency and safe re-processing when parts fail.
  - title: Load & capacity
    description: Rate limiting, load balancing and queues to stay within capacity.
  - title: Observability
    description: Metrics, logs and traces so you can see and diagnose the system.
status: stable
---

Distributed systems fail constantly in small ways — dropped packets, slow
dependencies, restarts. Reliability is the discipline of making those small
failures **harmless** rather than letting them cascade.

The concepts here reinforce each other: [retries](/concepts/retries) recover
from transient faults, but only safely when operations are
[idempotent](/concepts/idempotency); [queues](/concepts/queues) and
[rate limiting](/concepts/rate-limiting) keep load inside capacity; and
[observability](/concepts/observability) is the feedback loop that tells you
whether any of it is working.
