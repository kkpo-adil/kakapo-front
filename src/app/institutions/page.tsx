import Link from "next/link";
import { EnterpriseTierCard } from "@/components/enterprise/EnterpriseTierCard";

export default function InstitutionsPage() {
  return (
    <div>
      <section className="border-b border-border bg-surface-2">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-4">For Research Institutions</p>
          <h1 className="text-4xl font-display text-text-primary mb-5 max-w-2xl leading-tight">
            Site License KAKAPO, pour votre université ou institut.
          </h1>
          <p className="text-base text-text-secondary leading-relaxed mb-8 max-w-2xl">
            Accès fair-use à l&apos;infrastructure KAKAPO pour vos chercheurs, vos laboratoires, vos consortiums. Tarification académique.
          </p>
          <Link href="/institutions/contact" className="no-underline bg-accent hover:bg-accent-hover text-white text-sm font-mono px-6 py-3 rounded transition-colors">
            Request institutional access
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-2">Pourquoi une institution adopte KAKAPO</p>
        <h2 className="text-2xl font-display text-text-primary mb-8">Trois raisons structurelles.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden">
          {[
            { title: "Intégrité scientifique", desc: "Garantissez l'intégrité de la production scientifique de vos laboratoires. Provenance cryptographique de bout en bout." },
            { title: "Conformité open science", desc: "KAKAPO s'aligne sur les principes FAIR et les exigences des financeurs publics (ANR, ERC, Horizon Europe) en matière de traçabilité." },
            { title: "Accès gratuit pour vos chercheurs", desc: "Vos chercheurs identifiés via ORCID accèdent gratuitement au Public Researcher Access. La Site License étend leurs droits." },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-surface-2 p-6">
              <h3 className="text-sm font-display text-text-primary mb-3">{title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-b border-border bg-surface-3">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-2">Formules</p>
          <h2 className="text-2xl font-display text-text-primary mb-8">Quatre formules adaptées à votre structure.</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <EnterpriseTierCard
              tierName="Public Researcher Access"
              tierTagline="Accès individuel"
              description="Accès gratuit pour les chercheurs identifiés ORCID, avec quota mensuel."
              components={["Authentification ORCID", "Quota mensuel modeste", "Outils de certification individuelle"]}
              engagement="Aucun"
              ctaLabel="Se connecter avec ORCID"
              ctaHref="/certifier"
              accent="institutions"
            />
            <EnterpriseTierCard
              tierName="Lab Tier"
              tierTagline="Laboratoire"
              description="Pour un laboratoire de 5 à 50 chercheurs. Volumes inclus et fonctionnalités collaboratives."
              components={["License de laboratoire", "Verified Operations quota", "Outils collaboratifs"]}
              engagement="12 mois"
              ctaLabel="Talk to our academic team"
              ctaHref="/institutions/contact"
              accent="institutions"
            />
            <EnterpriseTierCard
              tierName="Academic Site License"
              tierTagline="Université / Institut"
              description="Pour une université ou un institut entier. Fair use, tarification académique."
              components={["Site License fair-use", "Accès illimité chercheurs ORCID", "Dashboard institutionnel"]}
              engagement="12 mois"
              ctaLabel="Talk to our academic team"
              ctaHref="/institutions/contact"
              accent="institutions"
            />
            <EnterpriseTierCard
              tierName="Consortium Tier"
              tierTagline="Réseau pluri-institutions"
              description="Pour un réseau pluri-institutions (PUI, COMUE, alliances européennes)."
              components={["License consortium", "Multi-institutions", "Reporting consolidé"]}
              engagement="24 mois"
              ctaLabel="Talk to our academic team"
              ctaHref="/institutions/contact"
              accent="institutions"
            />
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="border-l-4 border-accent/40 bg-accent/5 rounded-r-lg p-6">
          <h3 className="text-lg font-display text-text-primary mb-3">Public Researcher Access — gratuit pour vos chercheurs</h3>
          <p className="text-sm text-text-secondary leading-relaxed mb-5">
            Tout chercheur identifié via ORCID bénéficie d&apos;un accès gratuit à KAKAPO, indépendamment de la Site License de son institution. C&apos;est notre engagement envers la communauté scientifique.
          </p>
          <Link href="/certifier" className="no-underline bg-accent hover:bg-accent-hover text-white text-sm font-mono px-5 py-2.5 rounded transition-colors">
            Se connecter avec ORCID →
          </Link>
        </div>
      </section>
    </div>
  );
}
