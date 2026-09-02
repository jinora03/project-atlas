---
title: Authentication
description: Establishing who a request is from.
type: foundational
domains:
  - security
  - web
  - backend
related:
  - authorization
  - tls
  - validation
aliases:
  - authn
  - login
  - sessions
status: stable
---

Authentication answers one question: **who is making this request?** It verifies
identity. It is distinct from — and always precedes —
[authorization](/concepts/authorization), which decides what that identity is
allowed to do. ("AuthN" = who you are; "AuthZ" = what you can do.)

## How does it work?

A user proves identity with **factors**: something they know (password),
something they have (a device, a security key), or something they are
(biometric). After the initial proof, the server issues a **session** —
typically a cookie or a token (like a JWT) — so every subsequent request carries
proof without re-entering credentials. That token must travel over
[TLS](/concepts/tls) or it can be stolen in transit.

## Where is it used?

User login, API keys and OAuth for third-party access, and mutual TLS or signed
tokens for service-to-service calls.

## Important properties

- **Never store passwords reversibly.** Store a slow salted hash (bcrypt,
  scrypt, argon2) so a database leak doesn't hand over credentials.
- Sessions and tokens are **bearer credentials** — whoever holds one *is* the
  user until it expires or is revoked. Scope and expire them.
- Multi-factor authentication defeats most credential theft.

## Common mistakes

- Rolling your own crypto or password hashing instead of using vetted libraries.
- Long-lived tokens with no revocation path.
- Confusing authentication with authorization — a logged-in user is not
  automatically an allowed one.

## Failure modes

Leaked or reused tokens grant impersonation; a compromised session store affects
everyone; and weak reset flows become the easiest way in.

## Related concepts

Authentication precedes [authorization](/concepts/authorization), depends on
[TLS](/concepts/tls) to protect credentials in transit, and pairs with
[validation](/concepts/validation) at every trust boundary.
