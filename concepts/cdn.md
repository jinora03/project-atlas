---
title: CDN
description: A network of edge servers that delivers content close to users.
type: foundational
domains:
  - web
  - platform
related:
  - caching
  - dns
  - http
aliases:
  - Content Delivery Network
  - edge
status: stable
---

A CDN is a globally distributed set of **edge servers** that cache and serve
content from a location near each user, instead of every request travelling to
a single origin. It is [caching](/concepts/caching) applied to geography.

## How does it work?

[DNS](/concepts/dns) routes a user to a nearby edge node. If that node has the
requested resource cached, it serves it immediately; otherwise it fetches from
the origin, caches it according to the response's
[HTTP](/concepts/http) cache headers, and serves it. Static assets are the
classic fit, but CDNs increasingly cache API responses and run logic at the edge.

## Where is it used?

Images, scripts, video, and downloads on almost every large site — and, more and
more, dynamic content and edge compute close to the user.

## Important properties

- **Latency drops** because bytes travel a shorter distance.
- **Origin load drops** because the edge absorbs repeated requests.
- Behaviour is governed by **cache headers**, so correctness depends on getting
  those right.

## Common mistakes

- Caching personalised or authenticated responses at a shared edge.
- No cache-busting strategy, so users get stale assets after a deploy.
- Forgetting the edge exists when debugging "impossible" stale data.

## Limitations / failure modes

Stale content after updates, cache-key mistakes that fragment or leak data, and
added complexity in invalidation and deploys.

## Related concepts

A CDN is the edge tier of the [Systems Map](/systems-map), sitting between the
client and your [load balancer](/concepts/load-balancing).
