---
title: HTTP
description: The request/response protocol most of the web is built on.
type: foundational
domains:
  - web
  - backend
related:
  - dns
  - tls
  - caching
  - cdn
aliases:
  - HTTPS
  - HTTP/2
status: stable
---

HTTP is a **stateless request/response protocol**: a client sends a request for
a resource, the server sends back a response. Nearly everything on the web —
pages, APIs, assets — moves over it.

## How does it work?

A client opens a connection (today usually TLS-encrypted as HTTPS), sends a
request with a **method** (`GET`, `POST`, …), a path, headers and an optional
body. The server replies with a **status code**, headers and a body. Each
request is independent; any notion of a "session" is layered on top with
cookies or tokens.

## Where is it used?

Browsers talking to servers, mobile apps calling backends, services calling
each other, webhooks, and most public APIs.

## Important properties

- **Statelessness** makes servers easy to scale horizontally.
- **Methods and status codes** carry agreed-upon meaning (`GET` is safe and
  cacheable; `4xx` is your fault, `5xx` is theirs).
- **Caching is built in** via headers, which is what makes [CDNs](/concepts/cdn)
  and browser caches possible.

## Common mistakes

- Using `GET` for actions that change state (breaks caching and safety
  assumptions).
- Ignoring status-code semantics and returning `200` with an error body.
- Forgetting that headers like `Cache-Control` are contracts other systems obey.

## Limitations / failure modes

Head-of-line blocking (addressed by HTTP/2 and HTTP/3), latency over long
distances, and the complexity of getting caching semantics exactly right.

## Related concepts

A request usually starts with [DNS](/concepts/dns) and is often accelerated by
[caching](/concepts/caching) at the edge.
