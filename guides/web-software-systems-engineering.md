---
title: Web Software Systems Engineering
description: A complete, connected tour of how a web system fits together — from a user's click, through the network, application and data tiers, to reliability, security and observability.
canonical: true
order: 1
domains:
  - web
  - backend
  - data
  - platform
  - security
  - reliability
status: stable
---

This is the Atlas's canonical systems guide. Where each [concept](/concepts)
explains one thing in isolation, this guide connects them into a single mental
model: what happens, in order, when someone uses a web system — and where each
responsibility lives. It is the connected companion to the
[Systems Map](/systems-map).

Read it once top to bottom for orientation, then follow the links into concepts
when you want depth. Nothing here claims every system has exactly this shape; it
is a stable *arc* that most web systems bend to fit.

> This page is the canonical overview guide. Older, longer drafts are **not**
> canonical and should not be treated as the source of truth.

## The shape of a request

Almost every web interaction follows the same arc:

```text
Client → DNS → TLS → Edge/CDN → Load balancer → Application
   → Data (database · cache · async work) → Infrastructure
   → observed and secured throughout
```

The pieces vary enormously, but the order of concerns is remarkably stable. The
rest of this guide walks that arc.

## 1. The client

The client — a browser, a mobile app, or another service — is where a request
begins. It knows a hostname and wants a resource. Everything downstream exists to
turn that intent into a correct response, quickly. The client is also the first
place you must **never trust**: anything it sends will be
[validated](/concepts/validation) again on the server.

## 2. DNS: turning a name into an address

First the name becomes an address. [DNS](/concepts/dns) resolves the hostname,
usually returning a cached answer from somewhere nearby. A single name can map to
many addresses, which is the first, cheapest form of load distribution and
geo-routing. That address increasingly points not at your origin but at an edge
close to the user.

## 3. TLS: securing the connection

Before any application data flows, [TLS](/concepts/tls) establishes an encrypted,
authenticated channel — this is what makes [HTTP](/concepts/http) into HTTPS. The
server presents a certificate that proves it owns the name the client looked up.
TLS protects data **in transit**; it says nothing about data at rest or the
honesty of the site, and its certificates must be renewed automatically or they
become an outage.

## 4. The edge and CDNs

A [CDN](/concepts/cdn) serves cacheable content from an edge node near the user,
cutting latency and shielding your origin from repeated work. This is
[caching](/concepts/caching) applied to geography, governed by the
[HTTP](/concepts/http) cache headers your application sets. Getting those headers
right — and never caching per-user data at a shared edge — is the whole game.

## 5. Load balancing and the reverse proxy

Requests that must reach your servers hit a
[load balancer](/concepts/load-balancing) first. It spreads traffic across a pool
of interchangeable instances, health-checks them, routes around failures, and
often terminates TLS. This is what makes **horizontal scaling** possible — adding
more identical machines — *provided the application stays stateless* so any
server can handle any request.

## 6. The application tier

The [application](/domains/backend) is where your logic runs: interpreting the
request, enforcing rules, and coordinating data access. Keeping it **stateless**
(no session state pinned to one server) is what lets the load balancer do its
job. Any state that must persist belongs in the data tier, not in a particular
process's memory.

## 7. Concurrency: many requests at once

A server handles many requests at the same time, which makes
[concurrency](/concepts/concurrency) a first-class concern here. Under the hood
that means [processes](/concepts/processes) (isolated memory, safe, scale-out)
and [threads](/concepts/threads) (shared memory, cheap, but the home of race
conditions). The core hazard is shared mutable state; most of the data tier's
machinery exists to coordinate it safely.

## 8. The data tier: databases, SQL and indexes

Beneath the application sits [data](/domains/data). The
[database](/concepts/databases) is the durable **source of truth** — everything
else can be rebuilt from it, but not the reverse. You query it with
[SQL](/concepts/sql), a declarative language whose performance depends almost
entirely on whether the right [indexes](/concepts/indexes) exist. A missing index
is the single most common cause of a slow system; an over-indexed table pays for
it on every write.

## 9. Transactions and isolation

When several changes must succeed or fail together,
[transactions](/concepts/transactions) group them into one all-or-nothing unit.
How much concurrent transactions can affect each other is set by the
[isolation](/concepts/isolation) level — a spectrum, not a switch, and one whose
default (usually Read Committed) permits more anomalies than people assume.
Correctness bugs from weak isolation are intermittent and load-dependent, which
makes them nasty; know your database's default.

## 10. Caching: fast, disposable copies

A [cache](/concepts/caching) keeps fast, disposable copies of expensive results
in front of the database or a slow dependency. Its defining property is that it
can be thrown away without losing truth — so the system must still be correct
when the cache is empty. The hard part is always **invalidation**. Reach for a
cache deliberately: [Should I add a cache?](/decisions/should-i-add-a-cache).

## 11. Asynchronous work: queues

Work that need not finish inside the request — email, thumbnails, exports,
third-party calls — is handed to a [queue](/concepts/queues) and done later by a
worker. This decouples the user's latency from the work's duration and absorbs
bursts. Queues deliver **at least once**, so their consumers must be
[idempotent](/concepts/idempotency). Whether you need one at all:
[Do I need a message queue?](/decisions/do-i-need-a-message-queue).

## 12. Reliability: retries, idempotency, rate limiting

Distributed systems fail constantly in small ways. [Retries](/concepts/retries)
with exponential backoff and jitter turn transient failures into successes — but
only when operations are [idempotent](/concepts/idempotency), or you will double
-charge cards and duplicate orders. [Rate limiting](/concepts/rate-limiting)
protects a service from overload and from retry storms. Together these keep small
failures from cascading into outages; the [reliability](/domains/reliability)
domain collects them.

## 13. Security: authentication, authorization, validation

Security is applied at every boundary, as three recurring questions.
[Authentication](/concepts/authentication) establishes **who** the caller is;
[authorization](/concepts/authorization) decides **what** they may do — enforced
server-side, per request, against the specific object; and
[validation](/concepts/validation) treats **all input as untrusted**. Most real
breaches are not broken crypto — they are a missing authorization check or
unvalidated input. See the [security](/domains/security) domain.

## 14. Observability: knowing it works

You cannot operate what you cannot see. [Observability](/concepts/observability)
— metrics, logs, and traces tied together by a request id — is how you move from
"the site is slow" to a diagnosis. Alert on the symptoms users feel (latency,
errors), not on every internal number, or the pager becomes noise. It is the
feedback loop that tells you whether everything above is actually working.

## 15. Infrastructure and deployment

All of this runs on [platform](/domains/platform) infrastructure: where servers
and containers live, how code is deployed, and how capacity is provisioned. Good
deployment practice keeps the stateless tiers trivial to replace and scale, and
treats configuration and secrets as first-class, rotatable things.

## 16. Optional architecture: earning complexity

Notice how much of a complete, correct system is *ordinary*: a client, a name
lookup, TLS, an app, a database, a cache, a queue. The famous optional pieces are
powerful precisely because they solve **specific** problems:

- [Redis](/concepts/redis) — shared, fast, ephemeral state across instances.
- [Kafka](/concepts/kafka) — a durable, replayable log for high-throughput,
  multi-consumer streams.
- [Elasticsearch](/concepts/elasticsearch) — relevance-ranked search the database
  can't serve.
- **Microservices** — independent deployment for *many teams*
  ([Should I use microservices?](/decisions/should-i-use-microservices)).

Each adds real operational surface, new failure modes, and cognitive load.

## The through-line: earned complexity

The Atlas's central question runs through every section above: **has the system
actually earned this complexity?** Add optional infrastructure when a concrete,
measured problem justifies it — not by default, and not because it is
fashionable. Explore the trade-offs in the [decision guides](/decisions), and use
the [Systems Map](/systems-map) to navigate the pieces.
