---
title: Load Balancing
description: Spreading incoming traffic across many servers behind one address.
type: foundational
domains:
  - backend
  - platform
  - web
  - reliability
related:
  - dns
  - http
  - rate-limiting
  - health-checks
aliases:
  - load balancer
  - reverse proxy
status: stable
---

A load balancer sits in front of a pool of servers and **distributes incoming
requests** across them, presenting a single address to the outside world. It is
what lets you scale by adding more identical machines.

## How does it work?

Clients connect to the load balancer, which forwards each request to a healthy
backend using a strategy — round-robin, least-connections, or hashing. It runs
**health checks** and stops sending traffic to instances that fail them. It
often also terminates TLS and acts as a reverse proxy.

## Where is it used?

In front of web and application tiers, between internal services, and at the
edge of data centres. Even "serverless" platforms are load balancing under the
hood.

## Important properties

- **Horizontal scale**: capacity grows by adding backends, not bigger machines.
- **Availability**: a failed instance is routed around automatically.
- **Statelessness helps** — if any server can handle any request, balancing is
  trivial; sticky sessions complicate it.

## Common mistakes

- Storing session state on individual servers, forcing sticky routing.
- Health checks that only confirm the process is up, not that it can serve.
- Making the balancer itself a single point of failure.

## Limitations / failure modes

The balancer is a critical path — if it fails, everything behind it is
unreachable. Uneven strategies can hotspot one backend, and long-lived
connections complicate draining during deploys.

## Related concepts

Traffic often reaches the balancer via [DNS](/concepts/dns) and a
[CDN](/concepts/cdn), then is spread across your [application](/domains/backend)
tier.
