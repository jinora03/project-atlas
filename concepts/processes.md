---
title: Processes
description: The operating system's unit of isolation for running programs.
type: foundational
domains:
  - backend
  - platform
related:
  - threads
  - concurrency
aliases:
  - process
  - OS process
status: stable
---

A process is a running program with its **own isolated memory space**, managed
by the operating system. Isolation is the point: one process cannot read or
corrupt another's memory, so a crash or bug is contained.

## How does it work?

The OS gives each process a private virtual address space, file descriptors, and
a scheduling context. It time-slices the CPU across processes. Processes
communicate only through explicit channels — pipes, sockets, shared memory,
files — because they share nothing by default.

## Where is it used?

Every program you run is a process. Servers often run several worker processes to
use multiple CPU cores; containers are essentially processes with extra isolation;
"serverless" functions are short-lived processes.

## Processes vs threads

- **Processes** isolate memory — safer, heavier, communicate by messaging.
- **[Threads](/concepts/threads)** share memory within a process — lighter, but
  you inherit shared-state [concurrency](/concepts/concurrency) hazards.

Multiple processes are a common way to use many cores while sidestepping
shared-memory bugs (at the cost of inter-process communication).

## Important properties

- **Isolation** makes processes robust and independently restartable.
- Creating one is relatively expensive; pools and pre-forking amortise the cost.
- Because they share nothing, scaling out to more processes (or machines) is
  often simpler than scaling threads up.

## Common mistakes

- Assuming worker processes share in-memory state — they don't; use a shared
  store or database.
- Ignoring how many cores you have when sizing a worker pool.

## Related concepts

Processes and [threads](/concepts/threads) are the two units of execution;
choosing between them is a [concurrency](/concepts/concurrency) decision about
isolation versus shared memory.
