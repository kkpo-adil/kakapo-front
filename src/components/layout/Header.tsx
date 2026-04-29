"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

const SOLUTIONS = [
  { href: "/certifier", title: "Pour les chercheurs", desc: "Certifiez vos publications gratuitement" },
  { href: "/publisher", title: "Pour les éditeurs", desc: "Monétisez votre corpus scientifique" },
  { href: "/llm", title: "Pour les LLM", desc: "Sources opposables pour vos modèles" },
  { href: "/pharma", title: "Pour la pharma", desc: "Provenance réglementaire opposable" },
  { href: "/legal-finance", title: "Pour le legal/finance", desc: "Preuve cryptographique scientifique" },
  { href: "/institutions", title: "Pour les institutions", desc: "Site license et accès chercheurs" },
];

function decodeJWT(token: string) {
  try { return JSON.parse(atob(token.split(".")[1])); } catch { return null; }
}

export function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string; orcid: string } | null>(null);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (solutionsRef.current && !solutionsRef.current.contains(e.target as Node)) setSolutionsOpen(false);
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) setAccountOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleLogout() {
    localStorage.removeItem("kakapo_token");
    setUser(null);
    window.location.href = "/";
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface-2/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 no-underline group">
            <div className="w-6 h-6 rounded bg-accent flex items-center justify-center flex-shrink-0">
              <span className="text-2xs font-mono font-bold text-white">KP</span>
            </div>
            <span className="font-display text-sm text-text-primary tracking-widest uppercase group-hover:text-accent transition-colors">KAKAPO</span>
            <span className="hidden sm:block text-2xs font-mono text-text-muted border-l border-border pl-3">Scientific Trust Infrastructure</span>
          </Link>

          <div className="hidden md:flex items-center gap-1 ml-2">
            <div className="relative" ref={solutionsRef}>
              <button
                onClick={() => { setSolutionsOpen(!solutionsOpen); setAccountOpen(false); }}
                className={cn(
                  "flex items-center gap-1 px-3 py-1.5 rounded text-sm transition-all cursor-pointer border-0 bg-transparent",
                  solutionsOpen ? "bg-accent/10 text-accent" : "text-text-secondary hover:text-text-primary hover:bg-surface-3"
                )}
                aria-expanded={solutionsOpen}
                aria-haspopup="true"
              >
                Solutions
                <svg className={cn("w-3 h-3 transition-transform", solutionsOpen && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {solutionsOpen && (
                <div className="absolute left-0 top-full mt-2 w-72 bg-surface-2 border border-border rounded-lg shadow-lg overflow-hidden z-50">
                  <div className="p-2">
                    {SOLUTIONS.map(({ href, title, desc }) => (
                      <Link
                        key={href}
                        href={href}
                        className="flex flex-col px-3 py-2.5 rounded-md hover:bg-surface-3 no-underline transition-colors group"
                        onClick={() => setSolutionsOpen(false)}
                      >
                        <span className="text-xs font-medium text-text-primary group-hover:text-accent transition-colors">{title}</span>
                        <span className="text-2xs text-text-muted mt-0.5">{desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link href="/publications" className={cn("px-3 py-1.5 rounded text-sm no-underline transition-all", pathname.startsWith("/publications") ? "bg-accent/10 text-accent" : "text-text-secondary hover:text-text-primary hover:bg-surface-3")}>
              Explorer
            </Link>
            <Link href="/verify" className={cn("px-3 py-1.5 rounded text-sm no-underline transition-all", pathname.startsWith("/verify") ? "bg-accent/10 text-accent" : "text-text-secondary hover:text-text-primary hover:bg-surface-3")}>
              Vérifier un KPT
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link href="/dashboard" className="flex items-center gap-2 border border-accent/30 rounded px-3 py-1.5 bg-accent/5 no-underline hover:bg-accent/10 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                <span className="text-xs font-mono text-text-primary">{user.name}</span>
              </Link>
              <button onClick={handleLogout} className="text-xs font-mono text-text-muted hover:text-text-primary border border-border rounded px-3 py-1.5 transition-all bg-transparent cursor-pointer">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/orcid/login`} className="text-xs font-mono text-text-secondary hover:text-text-primary border border-border rounded px-3 py-1.5 no-underline transition-colors hover:border-border-strong">
                Connexion
              </a>
              <div className="relative" ref={accountRef}>
                <button
                  onClick={() => { setAccountOpen(!accountOpen); setSolutionsOpen(false); }}
                  className="text-xs font-mono bg-accent hover:bg-accent-hover text-white rounded px-3 py-1.5 transition-colors cursor-pointer border-0 flex items-center gap-1.5"
                >
                  Créer un compte
                  <svg className={cn("w-3 h-3 transition-transform", accountOpen && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {accountOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-surface-2 border border-border rounded-lg shadow-lg overflow-hidden z-50">
                    <div className="p-2">
                      <a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/orcid/login`} className="flex items-start gap-3 p-3 rounded-md hover:bg-surface-3 no-underline transition-colors group" onClick={() => setAccountOpen(false)}>
                        <div className="w-7 h-7 rounded bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-2xs font-mono text-accent font-bold">OR</span>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-text-primary group-hover:text-accent transition-colors">Chercheur</p>
                          <p className="text-2xs text-text-muted mt-0.5">Connexion via ORCID — gratuit</p>
                        </div>
                      </a>
                      <Link href="/contact" className="flex items-start gap-3 p-3 rounded-md hover:bg-surface-3 no-underline transition-colors group" onClick={() => setAccountOpen(false)}>
                        <div className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(15,118,110,0.1)" }}>
                          <span className="text-2xs font-mono font-bold" style={{ color: "#0F766E" }}>ED</span>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-text-primary group-hover:text-accent transition-colors">Éditeur</p>
                          <p className="text-2xs text-text-muted mt-0.5">Partenariat corpus — conditions & contact</p>
                        </div>
                      </Link>
                      <Link href="/api-access" className="flex items-start gap-3 p-3 rounded-md hover:bg-surface-3 no-underline transition-colors group" onClick={() => setAccountOpen(false)}>
                        <div className="w-7 h-7 rounded bg-surface-3 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-2xs font-mono text-text-muted font-bold">API</span>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-text-primary group-hover:text-accent transition-colors">API / IA</p>
                          <p className="text-2xs text-text-muted mt-0.5">Inscription self-service — clé API instantanée</p>
                        </div>
                      </Link>
                      <div className="border-t border-border mt-2 pt-2 px-3 pb-1">
                        <p className="text-2xs text-text-muted">Grand compte LLM / Pharma / Legal ?</p>
                        <a href="mailto:partnerships@kakapo.io" className="text-2xs font-mono text-accent hover:text-accent-hover no-underline">partnerships@kakapo.io →</a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
