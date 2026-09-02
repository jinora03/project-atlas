import type { APIRoute } from "astro";
import {
  getConcepts,
  getDomains,
  getDecisions,
  getGuides,
  hrefFor,
} from "@/lib/content";
import type { SearchDoc } from "@/lib/search";

/*
  Static search index.

  Emitted at build time as a single JSON file. This is the entire "search
  backend": the client fetches this once and does full-text matching in the
  browser (see AtlasSearch.tsx). No search service, index server or API — the
  Atlas follows its own advice that complexity must earn its place (spec §13).
*/

/** Strip Markdown noise so the body indexes as readable words. */
function plain(md: string | undefined): string {
  if (!md) return "";
  return md
    .replace(/```[\s\S]*?```/g, " ") // fenced code
    .replace(/`[^`]*`/g, " ") // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> text
    .replace(/[#>*_~|-]+/g, " ") // md punctuation
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 2000);
}

export const GET: APIRoute = async () => {
  const docs: SearchDoc[] = [];

  for (const c of await getConcepts()) {
    docs.push({
      type: "concept",
      id: c.id,
      title: c.data.title,
      description: c.data.description,
      url: hrefFor("concepts", c.id),
      domains: c.data.domains,
      aliases: c.data.aliases,
      body: plain(c.body),
    });
  }
  for (const d of await getDomains()) {
    docs.push({
      type: "domain",
      id: d.id,
      title: d.data.title,
      description: d.data.description,
      url: hrefFor("domains", d.id),
      domains: [d.id],
      aliases: [],
      body: plain(d.body),
    });
  }
  for (const d of await getDecisions()) {
    docs.push({
      type: "decision",
      id: d.id,
      title: d.data.title,
      description: d.data.description,
      url: hrefFor("decisions", d.id),
      domains: d.data.domains,
      aliases: [],
      body: plain(d.body),
    });
  }
  for (const g of await getGuides()) {
    docs.push({
      type: "guide",
      id: g.id,
      title: g.data.title,
      description: g.data.description,
      url: hrefFor("guides", g.id),
      domains: g.data.domains,
      aliases: [],
      body: plain(g.body),
    });
  }

  return new Response(JSON.stringify(docs), {
    headers: { "Content-Type": "application/json" },
  });
};
