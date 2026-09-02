# Authoring templates

Copy a template into the matching content directory, rename it to your slug, fill
it in, and set `status:` when ready to publish. These files live outside the
content collections, so they are never built as pages or link-validated.

| Template                                             | Copy into    |
| ---------------------------------------------------- | ------------ |
| [`concept-foundational.md`](./concept-foundational.md) | `concepts/`  |
| [`concept-architectural.md`](./concept-architectural.md) | `concepts/`  |
| [`decision.md`](./decision.md)                       | `decisions/` |
| [`domain.md`](./domain.md)                           | `domains/`   |
| [`guide.md`](./guide.md)                             | `guides/`    |

The headings in each template are **guidance, not a rigid form** — keep the ones
that serve the article and drop the rest (see [STYLE.md](../STYLE.md) and
[METHOD.md](../METHOD.md)). After writing, run `npm run validate`.
