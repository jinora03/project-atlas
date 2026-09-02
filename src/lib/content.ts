import { getCollection, type CollectionEntry } from "astro:content";

/*
  Content access layer.

  All cross-collection "relevance" is derived here from frontmatter metadata so
  relationship lists are never duplicated across pages (spec §16). Domains do not
  own concepts — a domain's relevant concepts are computed by asking which
  concepts declare that domain.
*/

export type ConceptEntry = CollectionEntry<"concepts">;
export type DomainEntry = CollectionEntry<"domains">;
export type DecisionEntry = CollectionEntry<"decisions">;
export type GuideEntry = CollectionEntry<"guides">;

export type AtlasCollection = "concepts" | "domains" | "decisions" | "guides";

/** Canonical URL for any Atlas entry. */
export function hrefFor(collection: AtlasCollection, id: string): string {
  return `/${collection}/${id}`;
}

const byTitle = (a: { data: { title: string } }, b: { data: { title: string } }) =>
  a.data.title.localeCompare(b.data.title);

const byOrderThenTitle = (
  a: { data: { title: string; order?: number } },
  b: { data: { title: string; order?: number } },
) => {
  const ao = a.data.order ?? Number.POSITIVE_INFINITY;
  const bo = b.data.order ?? Number.POSITIVE_INFINITY;
  return ao === bo ? byTitle(a, b) : ao - bo;
};

/**
 * Publication gate. `status: draft` entries are hidden from production builds
 * (listings, detail pages, aggregation and search all flow through these
 * getters) but remain visible during `astro dev` so they can be authored.
 */
const isPublished = (entry: { data: { status?: string } }) =>
  import.meta.env.PROD ? entry.data.status !== "draft" : true;

export async function getConcepts(): Promise<ConceptEntry[]> {
  return (await getCollection("concepts")).filter(isPublished).sort(byTitle);
}

export async function getDomains(): Promise<DomainEntry[]> {
  return (await getCollection("domains")).filter(isPublished).sort(byOrderThenTitle);
}

export async function getDecisions(): Promise<DecisionEntry[]> {
  return (await getCollection("decisions")).filter(isPublished).sort(byTitle);
}

export async function getGuides(): Promise<GuideEntry[]> {
  return (await getCollection("guides")).filter(isPublished).sort(byOrderThenTitle);
}

export async function getCanonicalGuide(): Promise<GuideEntry | undefined> {
  return (await getGuides()).find((g) => g.data.canonical);
}

/** Concepts that declare `domainId` as a relevant domain. */
export async function conceptsInDomain(domainId: string): Promise<ConceptEntry[]> {
  return (await getConcepts()).filter((c) => c.data.domains.includes(domainId));
}

/** Decisions that declare `domainId` as a relevant domain. */
export async function decisionsInDomain(domainId: string): Promise<DecisionEntry[]> {
  return (await getDecisions()).filter((d) => d.data.domains.includes(domainId));
}

/** Guides that declare `domainId` as a relevant domain. */
export async function guidesInDomain(domainId: string): Promise<GuideEntry[]> {
  return (await getGuides()).filter((g) => g.data.domains.includes(domainId));
}

/**
 * Resolve a list of concept ids to entries. Unknown ids are returned separately
 * as `missing` so the UI can surface them as planned-but-unwritten territory
 * rather than silently dropping the relationship.
 */
export async function resolveRelatedConcepts(
  ids: string[],
): Promise<{ resolved: ConceptEntry[]; missing: string[] }> {
  const all = await getConcepts();
  const index = new Map(all.map((c) => [c.id, c]));
  const resolved: ConceptEntry[] = [];
  const missing: string[] = [];
  for (const id of ids) {
    const entry = index.get(id);
    if (entry) resolved.push(entry);
    else missing.push(id);
  }
  return { resolved, missing };
}

/** Decisions that reference `conceptId` in their `related` list. */
export async function decisionsForConcept(conceptId: string): Promise<DecisionEntry[]> {
  return (await getDecisions()).filter((d) => d.data.related.includes(conceptId));
}

/** Human label for a domain id, falling back to a title-cased id if no page exists. */
export async function domainLabel(domainId: string): Promise<string> {
  const domain = (await getDomains()).find((d) => d.id === domainId);
  if (domain) return domain.data.title;
  return domainId.charAt(0).toUpperCase() + domainId.slice(1);
}

/** Whether a domain id has a real page (so we only link to live domains). */
export async function domainExists(domainId: string): Promise<boolean> {
  return (await getDomains()).some((d) => d.id === domainId);
}

export type DomainLink = { id: string; label: string; href: string | null };

/**
 * Resolve domain ids to display links. Domains without a live page (planned
 * territory in TAXONOMY.md) resolve to a label with a null href so the UI can
 * render them as non-navigable chips.
 */
export async function domainLinks(ids: string[]): Promise<DomainLink[]> {
  const map = new Map((await getDomains()).map((d) => [d.id, d]));
  return ids.map((id) => {
    const d = map.get(id);
    return d
      ? { id, label: d.data.title, href: hrefFor("domains", id) }
      : { id, label: id.charAt(0).toUpperCase() + id.slice(1), href: null };
  });
}
