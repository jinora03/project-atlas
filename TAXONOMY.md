# Taxonomy

The long-term map of domains the Atlas intends to cover. Domains stay **planned**
here until they have real, aggregatable content — only then do they get a page
in `domains/`. This keeps the site free of empty placeholder territory.

> Rule of thumb: a domain earns a page when concepts actually reference it. A
> domain that would render with zero concepts stays in this file.

## Domains

| Domain      | Status   | Notes                                                             |
| ----------- | -------- | ---------------------------------------------------------------- |
| Web         | **Live** | `domains/web.md`                                                 |
| Backend     | **Live** | `domains/backend.md`                                             |
| Data        | **Live** | `domains/data.md`                                                |
| Platform    | **Live** | `domains/platform.md`                                            |
| Security    | **Live** | `domains/security.md` — authn/z, TLS, validation, rate limiting  |
| Reliability | **Live** | `domains/reliability.md` — retries, idempotency, observability   |
| Frontend    | Planned  | Rendering, state, components, accessibility.                     |
| Systems     | Planned  | OS-level territory; may stay a set of concepts.                  |
| Mobile      | Planned  | Awaiting mobile-specific content.                                |
| Desktop     | Planned  | Awaiting desktop-specific content.                               |
| Networking  | Planned  | May stay a set of concepts rather than a standalone domain.      |

## How domains relate to concepts

Domains express **relevance, not ownership**. A concept such as
`concepts/transactions.md` is canonical in its own right and is simply *relevant*
to several domains via its `domains:` frontmatter. There is intentionally no
`owner_domain` / `primary_domain` / `canonical_domain` field — a concept belongs
to itself.

## Planned concepts referenced but not yet written

These ids appear in `related:` lists and surface in the UI as **planned**
territory until a file exists. They are the machine-checked allowlist in
[`content.planned.json`](./content.planned.json), so `npm run validate` treats
them as intentional rather than as broken references:

- `locking` — the primitive beneath transactions/isolation.
- `invalidation` — the hard half of caching.
- `health-checks` — used by load balancers to route around failures.
- `replication` — copying data across database nodes.
- `websockets` — the two-way transport behind the realtime decision.
- `pub-sub` — publish/subscribe messaging (Redis, Kafka).

## Coverage snapshot (v0.1)

- **25 concepts** — 22 foundational, 3 architectural (Redis, Kafka, Elasticsearch).
- **6 decision guides.**
- **6 live domains** (above), 5 planned.
- **1 canonical systems guide** (`guides/web-software-systems-engineering.md`).
