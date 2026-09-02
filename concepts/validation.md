---
title: Validation
description: Rejecting malformed or malicious input at trust boundaries.
type: foundational
domains:
  - backend
  - security
  - web
related:
  - authentication
  - authorization
  - idempotency
aliases:
  - input validation
  - sanitisation
status: stable
---

Validation is the discipline of **checking data at the boundary** where it enters
your control, and refusing anything that doesn't meet a known-good shape. Its
guiding rule: **never trust input** — not from users, not from other services,
not from your own clients.

## How does it work?

At each trust boundary, validate for **structure** (types, required fields,
ranges, formats) and **meaning** (this id refers to a real thing the caller may
use). Prefer **allow-lists** (accept known-good) over deny-lists (block
known-bad), because you can't enumerate every bad input. Reject early, with a
clear error.

## Validation vs escaping

Validation decides whether to *accept* input. **Escaping/encoding** decides how
to *safely use* it in a given context — parameterised SQL to prevent injection,
HTML-encoding to prevent XSS. You need both: validate on the way in, encode on
the way out.

## Important properties

- **Server-side is the only validation that counts.** Client-side checks are a
  UX nicety an attacker skips.
- Validate at **every** boundary, including between internal services.
- Good validation shrinks the surface every other layer has to defend.

## Common mistakes

- Trusting client-side validation, hidden fields, or an id in the URL.
- Building queries or markup by concatenating raw input (injection, XSS).
- Vague failures that neither help the user nor the logs.

## Related concepts

Validation partners with [authentication](/concepts/authentication) and
[authorization](/concepts/authorization) at the boundary, and enables
[idempotency](/concepts/idempotency) by catching malformed retries early.
