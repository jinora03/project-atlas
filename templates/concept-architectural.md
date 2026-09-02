---
title: <Technology name>
description: <One sentence — what it is and the specific problem it addresses.>
type: architectural
domains:
  - <domain-id>
related:
  - <concept-id>
aliases:
  - <alternate name>
status: draft
---

<!--
  ARCHITECTURAL concept = an OPTIONAL technology/choice (Redis, Kafka, Elasticsearch…).
  It MUST cover "when NOT to use it" and its real cost. The concept layout shows the
  "has the system earned this complexity?" prompt automatically for type: architectural.
  Headings are guidance — keep what serves the technology.
-->

<One or two sentences: what it is, and the specific problem it solves.>

## Where does it fit?

<Which tier / responsibility. State plainly that it is optional.>

## What responsibility can it own?

<The job it does well; what it should and shouldn't be trusted with.>

## What problem does it solve?

<The concrete problem that justifies it — the "why" before the "how".>

## How does it work?

<Enough mechanism to reason about its behaviour and failure modes.>

## When should I use it?

- <A situation where it genuinely earns its place.>

## When should I NOT use it?

- <A situation where a simpler option is better — be specific.>

## Trade-offs

<What you gain vs. the operational surface / failure modes you take on.>

## Failure modes

<How it fails, and the trap of turning an optimisation into a source of truth.>

## Related concepts

<Link the closest concepts and any relevant [decision](/decisions/...).>
