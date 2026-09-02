import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
// zod is re-exported by Astro; import from astro/zod (importing `z` from
// astro:content is deprecated in Astro 7).
import { z } from "astro/zod";

/*
  Content collections — the canonical Atlas architecture (spec §1).

  The four content directories live at the REPOSITORY ROOT (not under src/), so
  Markdown/MDX stays the source of truth and the Astro app is purely a
  presentation layer over it. Each collection points its glob loader at the
  matching root directory.

  Frontmatter is deliberately simple (spec §12). Relationships are expressed as
  plain string id lists; richer/typed graph relationships are intentionally NOT
  modelled yet.
*/

const status = z.enum(["draft", "review", "stable"]).optional();

const concepts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./concepts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Foundational concepts (HTTP, transactions…) vs optional architectural
    // technologies/choices (Redis, Kafka…). Drives which teaching template the
    // concept layout uses — see spec §7. Defaults to foundational.
    type: z.enum(["foundational", "architectural"]).default("foundational"),
    // Domains express *relevance*, not ownership. A concept is canonical itself.
    domains: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
    aliases: z.array(z.string()).default([]),
    status,
  }),
});

const domains = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./domains" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().optional(),
    // Important areas within the domain (navigation, not content ownership).
    areas: z
      .array(z.object({ title: z.string(), description: z.string() }))
      .default([]),
    status,
  }),
});

const decisions = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./decisions" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // The decision question itself, e.g. "Should I add a cache?"
    question: z.string().optional(),
    domains: z.array(z.string()).default([]),
    // Concepts this decision relates to (ids in the concepts collection).
    related: z.array(z.string()).default([]),
    status,
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./guides" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().optional(),
    // The one canonical systems guide is marked canonical; older/superseded
    // guides simply omit this (spec §11).
    canonical: z.boolean().default(false),
    domains: z.array(z.string()).default([]),
    status,
  }),
});

export const collections = { concepts, domains, decisions, guides };
