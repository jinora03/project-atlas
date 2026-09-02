---
title: Security
description: Protecting a system and its data — who gets in, what they can do, and keeping it private in transit.
order: 5
areas:
  - title: Identity & access
    description: Establishing who a caller is and what they may do — authentication and authorization.
  - title: Transport & data protection
    description: Keeping data private and untampered on the wire with TLS.
  - title: Input handling & abuse
    description: Validating every boundary and rate limiting to blunt abuse.
status: stable
---

Security is not a feature bolted on at the end; it is a set of habits applied at
every boundary. The Atlas treats it as three recurring questions: **who is this**
([authentication](/concepts/authentication)), **what may they do**
([authorization](/concepts/authorization)), and **can I trust this input**
([validation](/concepts/validation)) — all over a channel protected by
[TLS](/concepts/tls).

The throughline is **never trust input and deny by default**. Most damaging
breaches are not exotic crypto breaks; they are missing authorization checks,
unvalidated input, or a leaked credential.
