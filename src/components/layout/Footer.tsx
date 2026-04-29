import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-3 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 rounded bg-accent flex items-center justify-center">
                <span className="text-2xs font-mono font-bold text-white">KP</span>
              </div>
              <span className="font-display text-sm text-text-primary tracking-widest uppercase">KAKAPO</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Infrastructure de certification scientifique pour chercheurs, institutions et systèmes IA.
            </p>
          </div>
          <div>
            <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-3">Utilisateurs</p>
            <div className="space-y-2">
              {[
                { href: "/certifier", label: "Chercheurs" },
                { href: "/publisher", label: "Éditeurs" },
                { href: "/llm", label: "LLM" },
                { href: "/pharma", label: "Pharma & Biotech" },
                { href: "/legal-finance", label: "Legal & Finance" },
                { href: "/institutions", label: "Institutions" },
                { href: "/publications", label: "Explorer" },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="block text-xs text-text-muted hover:text-accent no-underline transition-colors">{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-3">Produit</p>
            <div className="space-y-2">
              {[
                { href: "/about/kpt", label: "KPT — Certification" },
                { href: "/about/trust-score", label: "Trust Score" },
                { href: "/about/api", label: "API" },
                { href: "/verify", label: "Vérifier un KPT" },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="block text-xs text-text-muted hover:text-accent no-underline transition-colors">{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-3">Contact</p>
            <div className="space-y-2">
              <a href="mailto:contact@kakapo.io" className="block text-xs text-text-muted hover:text-accent no-underline transition-colors">contact@kakapo.io</a>
              <a href="mailto:partnerships@kakapo.io" className="block text-xs text-text-muted hover:text-accent no-underline transition-colors">partnerships@kakapo.io</a>
              <a href="mailto:api@kakapo.io" className="block text-xs text-text-muted hover:text-accent no-underline transition-colors">api@kakapo.io</a>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-2xs font-mono text-text-muted">Infrastructure de fiabilité scientifique — V3.0</p>
          <p className="text-2xs font-mono text-text-muted">© 2026 KAKAPO</p>
        </div>
      </div>
    </footer>
  );
}
