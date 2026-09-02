---
title: Threads
description: Independent execution paths that share memory inside one process.
type: foundational
domains:
  - backend
related:
  - processes
  - concurrency
aliases:
  - thread
  - multithreading
status: stable
---

A thread is a unit of execution **within a [process](/concepts/processes)**.
Multiple threads in the same process share the same memory, which makes them
cheap to create and communicate between — and dangerous, because that shared
memory is exactly where [concurrency](/concepts/concurrency) bugs live.

## How does it work?

The OS (or a language runtime) schedules threads onto CPU cores. Each has its own
stack and program counter but shares the heap with its siblings. When two threads
touch the same data without coordination, the result depends on timing — a
**race condition**.

## Where is it used?

Keeping a UI responsive while work happens in the background, servers handling
many connections, and parallelising CPU-bound work across cores. Some runtimes
hide threads behind async/await or an event loop, but the hazards remain wherever
state is shared.

## Important properties

- **Shared memory is the double-edged sword**: fast communication, but you must
  protect shared state with locks, atomics, or message passing.
- More threads is not always faster — context switching and lock contention have
  real cost.
- A single unhandled error in one thread can take down the whole process.

## Common mistakes

- Unsynchronised access to shared data (the classic race condition).
- Deadlocks from acquiring locks in inconsistent orders.
- Blocking a thread pool on slow I/O, starving everything else.

## Related concepts

Threads share memory; [processes](/concepts/processes) isolate it. Both are
tools for [concurrency](/concepts/concurrency), and both raise the question of
how shared state stays correct.
