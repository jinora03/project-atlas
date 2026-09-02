---
title: SQL
description: The declarative language for querying and shaping relational data.
type: foundational
domains:
  - data
  - backend
related:
  - databases
  - indexes
  - transactions
aliases:
  - Structured Query Language
  - queries
  - joins
status: stable
---

SQL is a **declarative** language: you describe *what* data you want, and the
database's query planner decides *how* to get it. That separation is its
superpower — the same query can run efficiently as data grows, as long as the
right [indexes](/concepts/indexes) exist.

## How does it work?

You write statements against tables — `SELECT`, `INSERT`, `UPDATE`, `DELETE`,
plus `JOIN` to combine tables on shared keys, and aggregates like `GROUP BY`.
The **planner** turns each query into an execution plan: which indexes to use,
which join strategy, in what order. Reading that plan (`EXPLAIN`) is how you
understand why a query is slow.

## Where is it used?

Any [relational database](/concepts/databases), analytics engines, and — via
similar dialects — many "NoSQL" and streaming systems that adopted SQL because
it is so well understood.

## Important properties

- **Set-based, not row-by-row.** Expressing work as one query the planner can
  optimise beats looping in application code.
- **Joins and constraints** let the database guarantee relationships instead of
  hoping the application does.
- Performance lives or dies by whether queries can use an index.

## Common mistakes

- **N+1 queries**: fetching a list, then querying once per row in a loop.
- `SELECT *` when you need three columns, moving far more data than necessary.
- Building queries by string-concatenating user input — the classic
  **SQL injection** hole. Use parameterised queries; see
  [validation](/concepts/validation).

## Failure modes

A missing index turns a fast lookup into a full-table scan; an accidental
cartesian join can return billions of rows; and unbounded result sets exhaust
memory.

## Related concepts

SQL runs against [databases](/concepts/databases), depends on
[indexes](/concepts/indexes) for speed, and groups work into
[transactions](/concepts/transactions).
