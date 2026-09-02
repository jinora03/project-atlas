---
title: Isolation
description: How much concurrent transactions are allowed to affect each other.
type: foundational
domains:
  - data
  - backend
related:
  - transactions
  - concurrency
  - databases
  - locking
aliases:
  - isolation levels
  - ACID
status: stable
---

Isolation is the **I** in ACID: it governs how visible one
[transaction](/concepts/transactions)'s in-progress work is to another running
at the same time. It is not on/off but a **spectrum of levels**, each trading
correctness for throughput.

## How does it work?

Databases implement isolation with locking or, more commonly today, **MVCC**
(multi-version concurrency control), where each transaction reads a consistent
snapshot. The SQL standard names four levels — Read Uncommitted, Read Committed,
Repeatable Read, Serializable — defined by which **anomalies** they permit.

## The anomalies to know

- **Dirty read** — seeing another transaction's uncommitted change.
- **Non-repeatable read** — the same row changes value within one transaction.
- **Phantom** — the same query returns different rows as others insert/delete.
- **Write skew** — two transactions each read, then write, breaking an invariant
  neither saw the other violate.

Higher levels forbid more anomalies; **Serializable** behaves as if
transactions ran one at a time.

## Important properties

- The **default is usually Read Committed**, which still permits several
  anomalies. Know your database's default — it is rarely the strongest.
- Stronger isolation means more aborts/retries and lower concurrency.
- Correctness bugs from weak isolation are intermittent and load-dependent.

## Common mistakes

- Assuming the default prevents anomalies it actually allows.
- Read-modify-write over multiple statements without a strong enough level or an
  explicit lock, causing lost updates.

## Related concepts

Isolation is the contract [transactions](/concepts/transactions) offer against
[concurrency](/concepts/concurrency); the [database](/concepts/databases)
enforces it with snapshots or locking.
