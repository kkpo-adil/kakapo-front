"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS: { href: string; label: string }[] = [
  { href: "/publications", label: "Explorer" },
  { href: "/verify", label: "Vérifier un KPT" },
  { href: "/certifier", label: "Certifier" },
  { href: "/api-access", label: "API" },
];

function decodeJWT(token: string): { name?: string; orcid?: string } | null {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string; orcid: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("kakapo_token");
    if (!token) return;
    const payload = decodeJWT(token);
    if (!payload) return;
    const exp = (payload as { exp?: number }).exp;
    if (exp && exp * 1000 < Date.now()) {
      localStorage.removeItem("kakapo_token");
      return;
    }
    if (payload.name && payload.orcid) {
      setUser({ name: payload.name, orcid: payload.orcid });
    }
  }, [pathname]);

  function handleLogout() {
    localStorage.removeItem("kakapo_token");
    setUser(null);
    window.location.href = "/";
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface-1/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 no-underline group">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-sm bg-accent flex items-center justify-center">
              <span className="text-[9px] font-mono font-bold text-white tracking-tight">KP</span>
            </div>
            <span className="font-display text-base text-text-primary tracking-widest uppercase group-hover:text-accent transition-colors">KAKAPO</span>
          </div>
          <span className="hidden sm:block text-2xs font-mono text-text-muted border-l border-border pl-3">Scientific Trust Infrastructure</span>
        </Link>
        <div className="flex items-center gap-1">
          <nav className="hidden md:flex items-center gap-1 mr-3">
            {NAV_LINKS.map(({ href, label }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              const cls = active ? "bg-accent/15 text-accent" : "text-text-secondary hover:text-text-primary hover:bg-surface-3";
              return (
                <Link key={href} href={href} className={cn("px-3 py-1.5 rounded text-sm transition-all duration-150 no-underline", cls)}>
                  {label}
                </Link>
              );
            })}
          </nav>
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 border border-accent/20 rounded px-3 py-1.5 bg-accent/5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-xs font-mono text-text-primary">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs font-mono text-text-muted hover:text-text-primary border border-border hover:border-border-strong rounded px-3 py-1.5 transition-all bg-transparent cursor-pointer"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/auth/orcid/login`}
              className="text-xs font-mono border border-accent/40 rounded px-3 py-1.5 text-accent hover:bg-accent/10 transition-colors no-underline"
            >
              Connexion
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
