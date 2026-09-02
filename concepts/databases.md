---
title: Databases
description: The durable source of truth — where a system's state is stored and queried.
type: foundational
domains:
  - data
  - backend
related:
  - sql
  - indexes
  - transactions
  - replication
aliases:
  - database
  - DBMS
  - RDBMS
status: stable
---

A database is the system that stores your data **durably** and lets you query it
efficiently and safely under concurrent access. It is the **source of truth**:
everything else — [caches](/concepts/caching), search indexes, derived views —
can be rebuilt from it, but it cannot be rebuilt from them.

## How does it work?

A database engine manages data on disk (and in memory), enforces a schema or
structure, provides a query interface, and coordinates concurrent readers and
writers with [transactions](/concepts/transactions) and locking. It maintains
[indexes](/concepts/indexes) to find rows without scanning everything, and a
write-ahead log so committed data survives a crash.

## Families

- **Relational (SQL)** — tables, rows, joins, strong consistency, a rich
  [query language](/concepts/sql). The default, and the right default, for most
  systems.
- **Document / key-value / wide-column / graph (NoSQL)** — trade some querying
  power or consistency for scale, flexible schemas, or a specific access shape.

## Important properties

- **Durability and correctness first.** A database that loses committed data has
  failed at its one job.
- The **data model and access patterns** should drive the choice, not novelty.
- It is usually the hardest tier to scale and the most expensive to get wrong,
  so most other architecture exists to protect it.

## Common mistakes

- Reaching for a specialised store before a well-indexed relational database has
  actually been outgrown.
- Treating the database as a black box and ignoring how queries actually execute.
- Putting business-critical logic only in application code when a constraint in
  the database would guarantee it.

## Failure modes

Running out of connections or disk, slow queries cascading into timeouts, and
replication lag serving stale reads. Because it is the source of truth, its
outages are rarely graceful.

## Related concepts

You query it with [SQL](/concepts/sql), speed it up with
[indexes](/concepts/indexes), keep it correct with
[transactions](/concepts/transactions), and decide its shape in
[SQL or NoSQL?](/decisions/sql-vs-nosql).
