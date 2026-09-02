---
title: Concurrency
description: Structuring a program so multiple things can be in progress at once.
type: foundational
domains:
  - backend
  - data
related:
  - threads
  - processes
  - transactions
  - isolation
aliases:
  - concurrent programming
status: stable
---

Concurrency is about **structure**: composing a program as independent tasks
that can make progress in overlapping time windows. It is not the same as
parallelism (doing many things at literally the same instant on multiple
cores) — a single core can be concurrent by interleaving work.

## How does it work?

A runtime juggles multiple units of work — threads, processes, coroutines or
callbacks — switching between them when one is waiting (for I/O, a lock, or a
timer). The scheduler decides who runs next. Because the switch points are
often outside your control, the *order* of operations across tasks is not
guaranteed.

## Where is it used?

Almost everywhere a system waits: web servers handling many requests, UIs
staying responsive while loading data, background jobs, and databases
coordinating simultaneous readers and writers.

## Important properties

- **Shared mutable state is the hard part.** Two tasks touching the same data
  without coordination is the root of most concurrency bugs.
- **Atomicity, visibility and ordering** are the three guarantees you reason
  about when tasks interact.
- Coordination primitives — locks, queues, channels, atomics — trade
  simplicity for throughput in different ways.

## Common mistakes

- Assuming operations that *look* atomic (like `count += 1`) actually are.
- Protecting data in one place but not another (a missed lock).
- Using locks so broadly that the program is effectively serial again.

## Limitations / failure modes

Deadlocks (tasks waiting on each other forever), livelocks, race conditions,
and starvation. These failures are often intermittent and timing-dependent,
which makes them hard to reproduce and test.

## Related concepts

Concurrency underlies [transactions](/concepts/transactions), which give you a
higher-level, all-or-nothing way to coordinate access to shared data.
