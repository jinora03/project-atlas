import * as React from "react";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export interface NavItem {
  label: string;
  href: string;
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function MobileNav({
  items,
  pathname,
}: {
  items: NavItem[];
  pathname: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="inline-flex size-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Software Engineering Atlas
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col p-2">
          {items.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "bg-accent font-medium text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
