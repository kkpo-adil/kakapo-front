import Link from "next/link";
import { EnterpriseTierCard } from "@/components/enterprise/EnterpriseTierCard";

export default function LegalFinancePage() {
  return (
    <div>
      <section className="border-b border-border bg-surface-2">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p className="text-2xs font-mono uppercase tracking-widest mb-4" style={{ color: "#B45309" }}>For Legal & Finance</p>
          <h1 className="text-4xl font-display text-text-primary mb-5 max-w-2xl leading-tight">
            Preuve cryptographique scientifique, pour vos dossiers les plus sensibles.
          </h1>
          <p className="text-base text-text-secondary leading-relaxed mb-8 max-w-2xl">
            Datation immuable, intégrité vérifiable, export PDF signé. Versez un KPT en pièce de procédure ou en annexe de due diligence.
          </p>
          <Link href="/legal-finance/contact" className="no-underline inline-block text-white text-sm font-mono px-6 py-3 rounded transition-colors" style={{ background: "#B45309" }}>
            Request a use case demo
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-2xs font-mono uppercase tracking-widest mb-2" style={{ color: "#B45309" }}>Pour qui</p>
        <h2 className="text-2xl font-display text-text-primary mb-8">Deux segments, un besoin commun.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden">
          <div className="bg-surface-2 p-6">
            <h3 className="text-sm font-display text-text-primary mb-3">Legal</h3>
            <p className="text-xs text-text-muted leading-relaxed mb-4">Cabinets d&apos;avocats spécialisés en propriété intellectuelle scientifique, contentieux pharmaceutiques, expertise judiciaire.</p>
            <ul className="space-y-1">
              {["Recherche de prior art", "Expertise judiciaire", "Contentieux brevets", "Litigation pharmaceutique"].map(u => (
                <li key={u} className="flex items-center gap-2 text-xs text-text-secondary">
                  <span style={{ color: "#B45309" }}>→</span> {u}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-surface-2 p-6">
            <h3 className="text-sm font-display text-text-primary mb-3">Finance</h3>
            <p className="text-xs text-text-muted leading-relaxed mb-4">Fonds spécialisés en biotech, healthtech, deeptech, faisant de la due diligence sur des thèses d&apos;investissement scientifiques.</p>
            <ul className="space-y-1">
              {["Due diligence biotech", "Validation thèse deeptech", "Pre-IPO vérification", "M&A scientifique"].map(u => (
                <li key={u} className="flex items-center gap-2 text-xs text-text-secondary">
                  <span style={{ color: "#B45309" }}>→</span> {u}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-b border-border bg-surface-3">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="max-w-2xl">
            <h3 className="text-lg font-display text-text-primary mb-3">Une couche complémentaire, pas une alternative</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Ces plateformes vous donnent du contenu. KAKAPO vous donne une preuve cryptographique. Les deux sont complémentaires : utilisez vos bases existantes pour la recherche, KAKAPO pour la certification opposable.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-2xs font-mono uppercase tracking-widest mb-2" style={{ color: "#B45309" }}>Modes d&apos;engagement</p>
        <h2 className="text-2xl font-display text-text-primary mb-8">Trois formules sans engagement forcé.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <EnterpriseTierCard
            tierName="Cabinet IP / Litigation"
            tierTagline="Avocats & experts judiciaires"
            description="Cabinets d'avocats IP, contentieux pharmaceutique, expertise judiciaire."
            components={["License annuelle", "Verified Operations inclus", "Audit trail opposable", "Export PDF signé"]}
            engagement="12 mois"
            ctaLabel="Talk to our team"
            ctaHref="/legal-finance/contact"
            accent="legal"
          />
          <EnterpriseTierCard
            tierName="Finance / DeepTech VC"
            tierTagline="Fonds d'investissement"
            description="Fonds biotech, healthtech, deeptech VC."
            components={["License annuelle", "Verified Operations inclus", "Reports de due diligence", "Export PDF signé"]}
            engagement="12 mois"
            ctaLabel="Talk to our team"
            ctaHref="/legal-finance/contact"
            accent="legal"
          />
          <EnterpriseTierCard
            tierName="Pay-per-Operation Premium"
            tierTagline="Usage ponctuel"
            description="Usage ponctuel sans abonnement. Tarif unitaire premium, export PDF signé inclus, aucun engagement."
            components={["Aucun abonnement", "Tarif unitaire premium", "Export PDF signé inclus"]}
            engagement="Aucun"
            ctaLabel="Talk to our team"
            ctaHref="/legal-finance/contact"
            accent="legal"
          />
        </div>
      </section>

      <section className="border-t border-border bg-surface-3">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-display text-text-primary mb-3">Voyez KAKAPO appliqué à votre cas d&apos;usage.</h2>
          <p className="text-sm text-text-secondary mb-8 max-w-xl mx-auto">Notre équipe vous accompagne sur une démonstration personnalisée.</p>
          <Link href="/legal-finance/contact" className="no-underline text-white text-sm font-mono px-8 py-3 rounded transition-colors" style={{ background: "#B45309" }}>
            Demander une démo →
          </Link>
        </div>
      </section>
    </div>
  );
}
