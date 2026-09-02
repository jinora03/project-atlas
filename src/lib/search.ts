/** A single searchable document in the static search index. */
export type SearchDoc = {
  type: "concept" | "domain" | "decision" | "guide";
  id: string;
  title: string;
  description: string;
  url: string;
  domains: string[];
  aliases: string[];
  body: string;
};
