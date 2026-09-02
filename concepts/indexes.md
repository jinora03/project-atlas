---
title: Indexes
description: Extra data structures that let a database find rows without scanning everything.
type: foundational
domains:
  - data
  - backend
related:
  - databases
  - sql
  - caching
aliases:
  - index
  - database index
  - B-tree
status: stable
---

An index is a secondary data structure — usually a **B-tree** — that lets a
[database](/concepts/databases) jump straight to the rows matching a query
instead of reading the whole table. It is the single biggest lever on query
performance, and the reason a well-designed relational database scales further
than people expect.

## How does it work?

An index keeps a sorted copy of one or more columns, with pointers back to the
rows. Because it is sorted, the engine can binary-search it in logarithmic time.
The query planner consults available indexes when it builds an execution plan;
if a useful one exists, a lookup that would have scanned millions of rows touches
only a handful.

## Where is it used?

Primary keys (indexed automatically), foreign keys, columns you filter or sort
by frequently, and columns used in joins. Full-text and geospatial indexes serve
specialised queries.

## Important properties

- **Reads get faster; writes get slower.** Every index must be updated on every
  insert, update, or delete, and takes storage.
- **Order matters** in composite indexes: `(a, b)` helps queries on `a` or
  `a, b`, but not `b` alone.
- An index only helps if the query is written to use it (no wrapping the column
  in a function, no leading wildcards).

## Common mistakes

- Indexing everything "just in case," slowing writes and wasting space.
- Missing an index on a column that filters a hot query — the top cause of slow
  [SQL](/concepts/sql).
- Assuming an index exists; confirm with the query plan.

## Failure modes

Under-indexing causes table scans and timeouts; over-indexing causes write
amplification and bloat. Both degrade quietly until load exposes them.

## Related concepts

Indexes make [SQL](/concepts/sql) fast against a
[database](/concepts/databases); like a [cache](/concepts/caching), they are a
derived structure that trades write cost for read speed.
