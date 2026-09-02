---
title: Rate Limiting
description: Capping how often a caller can do something, to protect a system from overload and abuse.
type: foundational
domains:
  - backend
  - reliability
  - security
related:
  - retries
  - redis
  - load-balancing
aliases:
  - rate limit
  - throttling
status: stable
---

Rate limiting caps how many requests a given caller may make in a window of
time. It protects a system from being overwhelmed — by abuse, by a buggy client,
or by a [retry](/concepts/retries) storm — and enforces fair sharing of a finite
resource.

## How does it work?

Common algorithms:

- **Token bucket** — tokens refill at a steady rate; each request spends one;
  empty bucket means rejected. Allows short bursts, bounds the sustained rate.
- **Fixed / sliding window** — count requests per time window per key (user, IP,
  API key).

State (the counters) is often kept in a fast shared store like
[Redis](/concepts/redis) so all instances enforce one limit. Rejected requests
return `429 Too Many Requests`, ideally with a `Retry-After` hint.

## Where is it used?

Public APIs, login endpoints (to blunt credential-stuffing), expensive
operations, and any shared dependency you must protect from a single noisy
tenant.

## Important properties

- **Choose the key deliberately** — per user, per IP, per API key each defend
  against different abuse.
- A good limit tells honest clients how to behave (`429` + `Retry-After`), so
  they back off instead of hammering.
- It bounds damage but can also lock out legitimate bursts if set too tight.

## Common mistakes

- Per-instance counters that don't add up to a real global limit.
- Rate limiting without returning `Retry-After`, so clients retry blindly.
- Applying one limit everywhere instead of protecting the expensive paths.

## Related concepts

Rate limiting is the callee-side complement to client-side
[retries](/concepts/retries) and backoff, often shares state with
[Redis](/concepts/redis), and works alongside
[load balancing](/concepts/load-balancing) to keep a system inside its capacity.
