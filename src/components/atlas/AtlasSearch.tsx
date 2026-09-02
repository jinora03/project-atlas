import * as React from "react";
import { Search } from "lucide-react";

import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from "@/components/ui/command";
import type { SearchDoc } from "@/lib/search";

type Mode = "dialog" | "inline";

const TYPE_LABEL: Record<SearchDoc["type"], string> = {
  concept: "Concepts",
  domain: "Domains",
  decision: "Decisions",
  guide: "Guides",
};

const GROUP_ORDER: SearchDoc["type"][] = [
  "guide",
  "domain",
  "concept",
  "decision",
];

/** Modifier-key hint that adapts to the platform via the global `is-mac` class. */
function ModK() {
  return (
    <>
      <span className="mod-mac">⌘</span>
      <span className="mod-other">Ctrl&nbsp;</span>K
    </>
  );
}

/** Score a document against whitespace-separated query tokens. */
function score(doc: SearchDoc, tokens: string[]): number {
  if (tokens.length === 0) return 1;
  const title = doc.title.toLowerCase();
  const aliases = doc.aliases.join(" ").toLowerCase();
  const desc = doc.description.toLowerCase();
  const domains = doc.domains.join(" ").toLowerCase();
  const body = doc.body.toLowerCase();

  let total = 0;
  for (const t of tokens) {
    let s = 0;
    if (title === t) s += 20;
    else if (title.startsWith(t)) s += 12;
    else if (title.includes(t)) s += 8;
    // Aliases let an alternate name (e.g. "HTTPS", "reverse proxy") find a
    // concept even when the token never appears in its title.
    if (aliases.includes(t)) s += 7;
    if (desc.includes(t)) s += 3;
    if (domains.includes(t)) s += 2;
    if (body.includes(t)) s += 1;
    if (s === 0) return 0; // every token must match somewhere (AND)
    total += s;
  }
  return total;
}

/** Fetch the static index once, only after `enabled` becomes true. */
function useSearchIndex(enabled: boolean) {
  const [docs, setDocs] = React.useState<SearchDoc[] | null>(null);
  React.useEffect(() => {
    if (!enabled || docs) return;
    let active = true;
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((data: SearchDoc[]) => {
        if (active) setDocs(data);
      })
      .catch(() => {
        if (active) setDocs([]);
      });
    return () => {
      active = false;
    };
  }, [enabled, docs]);
  return docs;
}

function Results({
  docs,
  query,
  onSelect,
}: {
  docs: SearchDoc[] | null;
  query: string;
  onSelect: (url: string) => void;
}) {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  const ranked = React.useMemo(() => {
    if (!docs) return [];
    return docs
      .map((doc) => ({ doc, s: score(doc, tokens) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 30)
      .map((r) => r.doc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docs, query]);

  const grouped = GROUP_ORDER.map((type) => ({
    type,
    items: ranked.filter((d) => d.type === type),
  })).filter((g) => g.items.length > 0);

  if (!docs) {
    return <CommandEmpty>Loading the Atlas…</CommandEmpty>;
  }

  return (
    <>
      <CommandEmpty>No matches. Try a broader term.</CommandEmpty>
      {grouped.map((group) => (
        <CommandGroup key={group.type} heading={TYPE_LABEL[group.type]}>
          {group.items.map((doc) => (
            <CommandItem
              key={`${doc.type}:${doc.id}`}
              value={`${doc.type} ${doc.title} ${doc.id}`}
              onSelect={() => onSelect(doc.url)}
            >
              <div className="flex flex-col gap-0.5 overflow-hidden">
                <span className="truncate font-medium">{doc.title}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {doc.description}
                </span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      ))}
    </>
  );
}

export interface AtlasSearchProps {
  mode?: Mode;
  placeholder?: string;
}

export default function AtlasSearch({
  mode = "dialog",
  placeholder = "Search concepts, domains, decisions…",
}: AtlasSearchProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  // The index is only fetched once search is actually used: immediately in
  // inline mode, or the first time the dialog opens in dialog mode.
  const [activated, setActivated] = React.useState(mode === "inline");
  const docs = useSearchIndex(activated);

  const go = React.useCallback((url: string) => {
    window.location.assign(url);
  }, []);

  React.useEffect(() => {
    if (open) setActivated(true);
  }, [open]);

  React.useEffect(() => {
    if (mode !== "dialog") return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mode]);

  if (mode === "inline") {
    return (
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <Command shouldFilter={false} className="bg-card">
          <CommandInput
            autoFocus
            value={query}
            onValueChange={setQuery}
            placeholder={placeholder}
          />
          <CommandList className="max-h-[60vh]">
            <Results docs={docs} query={query} onSelect={go} />
          </CommandList>
        </Command>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-64 sm:justify-between"
        aria-label="Search the Atlas"
      >
        <span className="flex items-center gap-2">
          <Search className="size-4" />
          <span className="hidden sm:inline">Search…</span>
        </span>
        <kbd className="hidden items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[0.65rem] text-muted-foreground sm:inline-flex">
          <ModK />
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen} shouldFilter={false}>
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder={placeholder}
        />
        <CommandList>
          <Results
            docs={docs}
            query={query}
            onSelect={(url) => {
              setOpen(false);
              go(url);
            }}
          />
        </CommandList>
        <div className="flex items-center justify-end gap-3 border-t border-border px-3 py-2 text-[0.7rem] text-muted-foreground">
          <span className="flex items-center gap-1">
            <CommandShortcut>↵</CommandShortcut> open
          </span>
          <span className="flex items-center gap-1">
            <CommandShortcut>esc</CommandShortcut> close
          </span>
        </div>
      </CommandDialog>
    </>
  );
}
