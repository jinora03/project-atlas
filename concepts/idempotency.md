---
title: Idempotency
description: Designing operations so doing them twice is the same as doing them once.
type: foundational
domains:
  - backend
  - reliability
  - data
related:
  - retries
  - queues
  - validation
aliases:
  - idempotent
  - idempotency key
status: stable
---

An operation is **idempotent** if performing it multiple times has the same
effect as performing it once. It is the property that makes
[retries](/concepts/retries) and [queues](/concepts/queues) safe — and without
it, the "at least once" delivery those systems provide will quietly corrupt your
data with duplicates.

## Why it matters

Networks lie. A client sends "create order," the server does it, but the
response is lost — so the client retries, and now there are two orders. In a
distributed system you cannot avoid duplicate delivery; you can only make it
**harmless**.

## How to achieve it

- **Naturally idempotent operations:** `set status = shipped` is safe to repeat;
  `increment balance` is not.
- **Idempotency keys:** the client attaches a unique key per intended action; the
  server records processed keys and ignores repeats, returning the original
  result.
- **Deduplication / upserts:** unique constraints or "insert if not present" make
  the database reject the duplicate.

## Important properties

- Idempotency is a property of the **operation as a whole**, including its side
  effects (emails sent, cards charged), not just the database row.
- It is what lets you retry safely; the two concepts are inseparable.
- The key must be stored durably and long enough to outlive realistic retries.

## Common mistakes

- Assuming a request arrives exactly once.
- Making only the database write idempotent while the email or payment side
  effect still fires twice.
- Idempotency keys with no expiry or no uniqueness guarantee.

## Related concepts

Idempotency is the foundation that makes [retries](/concepts/retries) and
[queues](/concepts/queues) safe, and [validation](/concepts/validation) helps by
rejecting malformed duplicates early.
