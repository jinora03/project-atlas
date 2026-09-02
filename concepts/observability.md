---
title: Observability
description: Being able to understand a system's internal state from its outputs.
type: foundational
domains:
  - reliability
  - platform
  - backend
related:
  - retries
  - load-balancing
aliases:
  - monitoring
  - metrics
  - logging
  - tracing
  - telemetry
status: stable
---

Observability is the property that you can **understand what a running system is
doing, and why, from the outside** — without shipping new code to add a
`print`. It is what turns a 3am "the site is slow" into an actual diagnosis.

## The three signals

- **Metrics** — cheap numeric time series (request rate, error rate, latency,
  saturation). Good for dashboards and alerts; they tell you *that* something is
  wrong.
- **Logs** — timestamped events with context. Good for the detail of *what*
  happened.
- **Traces** — the path of one request across services, with timing at each hop.
  Good for *where* the time or the error is.

Together they let you move from symptom to cause.

## Important properties

- **Instrument for questions you'll ask under pressure**, not vanity dashboards.
  The "four golden signals" — latency, traffic, errors, saturation — are a
  strong default.
- **Alert on symptoms users feel** (error rate, latency), not on every internal
  metric, or alarms become noise people ignore.
- Correlate signals with a shared **request id** so a trace, its logs, and its
  metrics line up.

## Common mistakes

- Logging everything and drowning the signal (and the budget) in noise.
- Alerts with no clear action, training people to ignore the pager.
- Adding observability only after an incident you couldn't explain.

## Related concepts

Observability is how you see [retries](/concepts/retries) firing,
[load balancers](/concepts/load-balancing) shifting traffic, and whether a
change helped — the feedback loop the rest of reliability depends on.
