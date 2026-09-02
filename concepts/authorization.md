---
title: Authorization
description: Deciding what an authenticated identity is allowed to do.
type: foundational
domains:
  - security
  - backend
related:
  - authentication
  - validation
aliases:
  - authz
  - access control
  - permissions
  - RBAC
status: stable
---

Authorization decides **what an identity may do**. It runs *after*
[authentication](/concepts/authentication) has established who the caller is, and
it enforces the boundaries of that identity's power — which records they can
read, which actions they can take.

## How does it work?

Common models:

- **RBAC** (role-based) — permissions attach to roles, roles attach to users.
- **ABAC** (attribute-based) — decisions use attributes of the user, resource,
  and context (owner, department, time).
- **Ownership / relationship** checks — "is this user the owner of this order?"

Whatever the model, the check must happen **on the server, on every request**,
against the specific resource being touched.

## Where is it used?

Every endpoint that returns or changes data scoped to a user, admin boundaries,
multi-tenant isolation, and feature gating.

## Important properties

- **Deny by default.** Grant access explicitly; never assume.
- **Enforce server-side.** Hiding a button in the UI is not authorization.
- Check the **specific object**, not just the type — the classic failure is
  letting a user act on *someone else's* record of a type they're allowed to use.

## Common mistakes

- **Broken object-level authorization (IDOR):** trusting an id from the request
  without confirming the caller owns it.
- Doing the check once at login instead of per request per resource.
- Conflating "authenticated" with "authorized."

## Failure modes

A single missing check can expose or mutate other tenants' data — one of the
most common and damaging classes of vulnerability.

## Related concepts

Authorization builds on [authentication](/concepts/authentication) and works
alongside [validation](/concepts/validation): validate the input, then confirm
the caller is allowed to act on it.
