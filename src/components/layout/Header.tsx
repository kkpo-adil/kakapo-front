"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/publications", label: "Publications" },
  { href: "/verify", label: "Vérifier" },
  { href: "/graph", label: "Relations" },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface-1/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 no-underline group"
        >
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-sm bg-accent flex items-center justify-center">
              <span className="text-[9px] font-mono font-bold text-white tracking-tight">KP</span>
            </div>
            <span className="font-display text-base text-text-primary tracking-widest uppercase group-hover:text-accent transition-colors">
              KAKAPO
            </span>
          </div>
          <span className="hidden sm:block text-2xs font-mono text-text-muted border-l border-border pl-3">
            Scientific Trust Infrastructure
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-3 py-1.5 rounded text-sm transition-all duration-150 no-underline",
                  active
                    ? "bg-accent/15 text-accent"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-3"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
