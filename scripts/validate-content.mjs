#!/usr/bin/env node
/*
  Atlas content validator (`npm run validate`).

  Parses the canonical Markdown at the repo root and reports four distinct
  classes of problem, so intentional gaps are never confused with mistakes:

    1. planned references   — a `related`/`domains`/link target listed in
                              content.planned.json (intentional; reported as info)
    2. broken references    — a `related` concept id or `domains` id that is
                              neither live nor planned (likely a typo)
    3. broken internal links — a Markdown link to /concepts/… (etc.) whose target
                              does not exist and is not planned
    4. duplicate slugs      — two files resolving to the same URL in a collection

  Exits non-zero if any real problem (2–4) is found. Planned references never
  fail the run. This is intentionally independent of Astro so it validates the
  raw source files directly.
*/
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const COLLECTIONS = ["guides", "concepts", "decisions", "domains"];
const STATIC_ROUTES = new Set([
  "/",
  "/systems-map",
  "/search",
  "/concepts",
  "/domains",
  "/decisions",
  "/guides",
]);

const planned = existsSync(join(root, "content.planned.json"))
  ? JSON.parse(readFileSync(join(root, "content.planned.json"), "utf8"))
  : {};
const plannedConcepts = new Set(planned.concepts ?? []);
const plannedDomains = new Set(planned.domains ?? []);

const toPosix = (p) => p.replace(/\\/g, "/");
const asArray = (v) => (Array.isArray(v) ? v : []);

function walk(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if ([".md", ".mdx"].includes(extname(p))) out.push(p);
  }
  return out;
}

const entries = [];
for (const col of COLLECTIONS) {
  for (const file of walk(join(root, col))) {
    const { data, content } = matter(readFileSync(file, "utf8"));
    const slug = toPosix(relative(join(root, col), file)).replace(/\.(md|mdx)$/, "");
    entries.push({ collection: col, slug, file: toPosix(relative(root, file)), data, body: content });
  }
}

const idsByCol = Object.fromEntries(COLLECTIONS.map((c) => [c, new Set()]));
const errors = [];
const plannedHits = [];

// Duplicate slugs (per collection).
const seen = Object.fromEntries(COLLECTIONS.map((c) => [c, new Map()]));
for (const e of entries) {
  seen[e.collection].set(e.slug, [...(seen[e.collection].get(e.slug) ?? []), e.file]);
  idsByCol[e.collection].add(e.slug);
}
for (const col of COLLECTIONS) {
  for (const [slug, files] of seen[col]) {
    if (files.length > 1) errors.push(`duplicate slug "${slug}" in ${col}/: ${files.join(", ")}`);
  }
}

// Frontmatter references: related (concepts) and domains.
for (const e of entries) {
  for (const id of asArray(e.data.related)) {
    if (idsByCol.concepts.has(id)) continue;
    if (plannedConcepts.has(id)) plannedHits.push(`${e.file}: related → "${id}"`);
    else errors.push(`${e.file}: related → "${id}" is not a concept and not planned (typo?)`);
  }
  for (const id of asArray(e.data.domains)) {
    if (idsByCol.domains.has(id)) continue;
    if (plannedDomains.has(id)) plannedHits.push(`${e.file}: domain → "${id}"`);
    else errors.push(`${e.file}: domain → "${id}" is not a live domain and not planned (typo?)`);
  }
}

// Internal Markdown links (absolute, starting with "/").
const linkRe = /\]\((\/[^)\s]*)\)/g;
for (const e of entries) {
  let m;
  while ((m = linkRe.exec(e.body))) {
    let href = m[1].split("#")[0].split("?")[0];
    if (href === "") continue;
    if (href.length > 1 && href.endsWith("/")) href = href.slice(0, -1);
    if (STATIC_ROUTES.has(href)) continue;
    const [col, ...rest] = href.split("/").filter(Boolean);
    const slug = rest.join("/");
    if (COLLECTIONS.includes(col) && slug) {
      if (idsByCol[col].has(slug)) continue;
      if (col === "concepts" && plannedConcepts.has(slug)) plannedHits.push(`${e.file}: link → ${href} (planned)`);
      else if (col === "domains" && plannedDomains.has(slug)) plannedHits.push(`${e.file}: link → ${href} (planned)`);
      else errors.push(`${e.file}: broken internal link → ${href}`);
    } else {
      errors.push(`${e.file}: unknown internal link → ${href}`);
    }
  }
}

console.log("Atlas content validation");
console.log("  " + COLLECTIONS.map((c) => `${idsByCol[c].size} ${c}`).join(" · "));
if (plannedHits.length) {
  console.log(`\n  planned references (intentional): ${plannedHits.length}`);
  for (const h of plannedHits) console.log(`    · ${h}`);
}
if (errors.length) {
  console.error(`\n✗ ${errors.length} problem(s) found:`);
  for (const er of errors) console.error(`    ✗ ${er}`);
  process.exit(1);
}
console.log("\n✓ No broken references, broken internal links, or duplicate slugs.");
