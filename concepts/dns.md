---
title: DNS
description: The system that turns human-readable names into network addresses.
type: foundational
domains:
  - web
  - platform
related:
  - http
  - cdn
  - load-balancing
aliases:
  - Domain Name System
status: stable
---

DNS is the internet's **directory**: it translates a name like
`example.com` into the IP address a client actually connects to. It is the
first step of almost every request.

## How does it work?

A resolver walks a hierarchy — root servers, then the top-level domain (`.com`),
then the domain's authoritative servers — to find the record for a name.
Answers are **cached** at every level using a **TTL** (time to live), so most
lookups never travel the whole chain.

## Where is it used?

Every time you load a site or call an API by hostname. It's also a quiet
workhorse of infrastructure: service discovery, failover, and routing users to
a nearby data centre.

## Important properties

- **Caching via TTL** trades propagation speed for efficiency — low TTLs update
  fast but push more traffic to authoritative servers.
- A single name can map to **many addresses**, enabling simple
  [load balancing](/concepts/load-balancing) and geo-routing.

## Common mistakes

- Expecting DNS changes to take effect instantly — old records live until their
  TTL expires.
- Setting TTLs so high that failover becomes impossible.
- Treating DNS as a security boundary; it is spoofable without DNSSEC.

## Limitations / failure modes

Propagation delay, resolver outages taking down otherwise-healthy systems, and
misconfiguration that is hard to notice because of layered caching.

## Related concepts

DNS resolution precedes the [HTTP](/concepts/http) request and often points at a
[CDN](/concepts/cdn) edge rather than your origin.
