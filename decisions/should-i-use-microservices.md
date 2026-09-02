---
title: Should I use microservices?
question: Should I use microservices?
description: Microservices solve an organizational scaling problem at the price of a distributed-systems tax. Most teams should start with a modular monolith.
domains:
  - backend
  - platform
  - reliability
related:
  - observability
  - queues
  - load-balancing
  - idempotency
status: stable
---

Microservices are frequently adopted as a technical fashion when the problem they
actually solve is **organizational**: letting many teams build, deploy, and scale
parts of a system independently. If you don't have that problem, you mostly
inherit the costs without the benefit.

## Has the system earned this complexity?

Splitting a process into a dozen networked services turns local function calls
into network calls that can fail, retry, arrive twice, and time out. You take on
distributed transactions, [idempotency](/concepts/idempotency) everywhere,
cross-service [observability](/concepts/observability), versioned contracts,
and a deployment topology behind [load balancers](/concepts/load-balancing). That
is the tax.

## When microservices help

- **Many teams** need to deploy independently without stepping on each other.
- Different parts have **genuinely different scaling** or reliability profiles.
- Clear, stable **domain boundaries** exist to split along.

## When they hurt

- A **small team** — you multiply operational surface without the org benefit.
- **Unclear boundaries** — you'll build a "distributed monolith": all the
  network pain, none of the independence.
- You're chasing scale you don't have.

## The strong default: a modular monolith

Build one well-structured deployable with clear internal modules and boundaries.
It gives you fast local calls, simple transactions, and one thing to deploy and
observe — while keeping the seams where you *could* split later if a real need
appears. Extract a service when a specific boundary demonstrably needs
independent deployment or scaling.

## Related concepts

If you do split, [idempotency](/concepts/idempotency),
[queues](/concepts/queues), [load balancing](/concepts/load-balancing) and
[observability](/concepts/observability) stop being optional.
