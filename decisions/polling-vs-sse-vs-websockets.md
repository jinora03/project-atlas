---
title: Polling vs SSE vs WebSockets
question: Polling, SSE or WebSockets?
description: Three ways to move fresh data to a client, from the boring-and-robust to the powerful-and-costly.
domains:
  - web
  - backend
related:
  - http
  - caching
  - websockets
status: stable
---

When a client needs data that changes over time, there are three common
transports. The right choice is usually the **simplest one that meets the
latency requirement** — not the most capable one.

## The options

### Polling

The client asks "anything new?" on a timer over ordinary
[HTTP](/concepts/http). Trivial to build, works everywhere, caches well, and
fails gracefully. The cost is wasted requests and latency bounded by the poll
interval.

### Server-Sent Events (SSE)

A single long-lived HTTP response streams updates **server → client**. Built-in
reconnection, works over standard HTTP infrastructure, and is ideal for
one-directional feeds (notifications, live status, progress).

### WebSockets

A persistent, **bidirectional** connection. The most powerful option and the
right one for genuinely interactive, low-latency, two-way traffic — chat,
multiplayer, collaborative editing. It is also the most infrastructure you can
sign up for.

## How to choose

- **Updates are infrequent or slightly-stale is fine** → polling. Don't
  apologise for it; it's robust and cache-friendly.
- **One-way stream of updates** → SSE.
- **Truly interactive, two-way, low latency** → WebSockets.

## When *not* to reach for WebSockets

- You only push data one way — SSE is simpler and rides normal HTTP.
- Updates every few seconds are acceptable — polling avoids persistent
  connections entirely.
- Your infrastructure (proxies, load balancers, serverless) fights long-lived
  sockets.

## Trade-offs

Moving down the list buys lower latency and richer interaction at the cost of
persistent connections, harder scaling and load balancing, and more failure
modes to handle (reconnects, backpressure, connection limits).

## The through-line

Each step up the ladder is more capable and more expensive to operate. Pick the
lowest rung that solves the actual problem.
