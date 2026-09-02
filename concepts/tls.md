---
title: TLS
description: The protocol that encrypts and authenticates connections on the network.
type: foundational
domains:
  - web
  - security
  - platform
related:
  - http
  - dns
  - authentication
aliases:
  - SSL
  - HTTPS
  - certificates
status: stable
---

TLS (Transport Layer Security, the successor to SSL) wraps an ordinary network
connection in three guarantees: **confidentiality** (eavesdroppers can't read
it), **integrity** (tampering is detected), and **authentication** (you're
talking to who you think you are). When [HTTP](/concepts/http) runs over TLS, it
becomes HTTPS.

## How does it work?

A TLS **handshake** happens before any application data flows. The client and
server agree on a cipher, the server presents a **certificate** signed by a
Certificate Authority the client trusts, and they derive a shared symmetric key
using public-key cryptography. After that, bulk data is encrypted with the fast
symmetric key. The certificate is what ties a public key to a hostname — this is
why the name in the certificate must match the site.

## Where is it used?

Every `https://` page, API calls between services (mutual TLS for
service-to-service auth), email transport, VPNs, and database connections. It is
increasingly the default rather than an add-on.

## Important properties

- **Authentication is only as strong as trust in the CA.** The padlock proves
  encryption and a valid certificate — not that the site is honest.
- TLS secures data **in transit**, not **at rest** and not inside your app.
- Modern TLS (1.3) is faster and drops legacy, insecure options.

## Common mistakes

- Treating HTTPS as "the site is safe" rather than "the channel is private."
- Letting certificates expire — a leading cause of outages. Automate renewal.
- Terminating TLS at the edge and then sending plaintext across an untrusted
  internal network.

## Failure modes

Expired or mismatched certificates break every client at once; misconfigured
cipher suites lock out old clients or weaken security; and a compromised private
key undermines everything until it is rotated.

## Related concepts

TLS proves *who* a server is; proving *who a user is* is
[authentication](/concepts/authentication). It relies on [DNS](/concepts/dns)
names matching certificates and secures the [HTTP](/concepts/http) that rides on
top.
