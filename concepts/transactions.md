---
title: Transactions
description: Groups operations into a single, all-or-nothing unit of work.
type: foundational
domains:
  - backend
  - data
related:
  - isolation
  - concurrency
  - databases
  - locking
aliases:
  - ACID
status: stable
---

A transaction groups several operations so they either **all** take effect or
**none** do. It turns a messy sequence of individual reads and writes into one
logical unit with predictable behaviour, even when things fail partway through.

## How does it work?

The database records intended changes and only makes them durable and visible
on **commit**. If anything goes wrong before then, it **rolls back** to the
state before the transaction started. Concurrency control (locks or
multi-version snapshots) keeps concurrent transactions from corrupting each
other's view of the data.

## Where is it used?

Anywhere partial updates would be dangerous: moving money between accounts,
decrementing inventory while creating an order, or updating several related
tables that must stay consistent.

## Important properties

The classic guarantees are **ACID**:

- **Atomicity** — all-or-nothing.
- **Consistency** — invariants hold before and after.
- **Isolation** — concurrent transactions don't see each other's half-done work.
- **Durability** — once committed, it survives a crash.

Isolation is a *spectrum*, not a switch — weaker levels trade correctness for
throughput.

## Common mistakes

- Holding a transaction open across slow work (network calls, user input),
  which blocks others and invites timeouts.
- Assuming the default isolation level prevents anomalies it actually allows.
- Doing non-transactional side effects (sending email, calling an API) inside a
  transaction that might roll back.

## Limitations / failure modes

Contention and deadlocks under load, and reduced availability in distributed
settings where strict guarantees fight partition tolerance.

## Related concepts

Transactions are a disciplined answer to problems created by
[concurrency](/concepts/concurrency).
