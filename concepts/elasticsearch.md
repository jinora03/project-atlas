---
title: Elasticsearch
description: A dedicated search engine for full-text and analytics queries the database is bad at.
type: architectural
domains:
  - data
  - backend
related:
  - databases
  - indexes
  - caching
aliases:
  - Elastic
  - dedicated search
  - search engine
status: stable
---

Elasticsearch is a distributed **search engine** built on inverted
[indexes](/concepts/indexes). It excels at the queries relational
[databases](/concepts/databases) are weakest at: full-text relevance ranking,
fuzzy matching, faceted filtering, and aggregations over large volumes.

## Where does it fit?

An **optional architectural technology** that sits *beside* your database as a
**derived** query layer. Like a [cache](/concepts/caching), it is not a source of
truth — it is a projection of your canonical data, optimised for a query shape
your database handles poorly.

## What responsibility can it own?

The search and analytics query path: `search-as-you-type`, relevance-ranked
results, log/metric exploration. Your database still owns the durable truth.

## What problem does it solve?

When `LIKE '%term%'` or `ILIKE` scans are too slow and can't rank by relevance —
and your database's own full-text features aren't enough — a dedicated inverted
index answers those queries in milliseconds.

## When should I use it?

- Full-text search with **relevance ranking** at a scale your database can't
  serve.
- Rich **faceted** filtering and aggregations over large datasets.
- Log/observability analytics over high volumes.

## When should I NOT use it?

- Your database's built-in full-text search already suffices (it often does).
- You'd treat it as a primary datastore — it is a derived index, not truth.
- The extra cluster to run and keep in sync isn't justified yet.

## Trade-offs

You gain fast, relevance-ranked search; you take on another distributed cluster,
plus the hard problem of **keeping it in sync** with the source of truth
(eventual consistency, reindex pipelines, drift).

## Failure modes

Index drift from the database, mapping mistakes that silently break relevance,
and cluster instability under memory pressure.

## Related concepts

Elasticsearch is [indexes](/concepts/indexes) taken to a specialised extreme; it
projects data from your [database](/concepts/databases) and, like a
[cache](/concepts/caching), must earn its keep against the cost of syncing it.
