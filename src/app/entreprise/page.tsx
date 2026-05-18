import Link from "next/link";

export default function EnterprisePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">

      <div className="mb-16">
        <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-4">
          Cas d'usage · Entreprise
        </p>
        <h1 className="text-3xl font-display text-text-primary mb-5 leading-tight max-w-2xl">
          Trois contextes où la traçabilité des sources scientifiques devient critique.
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
          KAKAPO ajoute une couche de provenance indépendante sur les sources scientifiques
          utilisées par les systèmes IA — certification cryptographique, audit trail,
          intégration API simple.
        </p>
      </div>

      <div className="divide-y divide-border">

        <div className="py-12">
          <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-3">
            LLMs & Plateformes IA
          </p>
          <h2 className="text-xl font-display text-text-primary mb-4">
            Les marchés régulés exigent des sources vérifiables par un tiers indépendant.
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed max-w-xl mb-6">
            Pharma, médical, legal, défense — ces clients enterprise ne signent pas
            avec un LLM qui ne peut pas prouver ses sources.
            Un LLM ne peut pas certifier ses propres sources d'entraînement —
            conflit d'intérêt structurel.
            KAKAPO est le tiers indépendant.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { label: "Intégration", value: "< 1 jour" },
              { label: "Coût unitaire", value: "0,40 USD / vérification" },
              { label: "Neutralité", value: "ni éditeur, ni LLM" },
              { label: "Audit trail", value: "vérifiable par tout tiers" },
            ].map(({ label, value }) => (
              <div key={label} className="border border-border rounded p-4">
                <p className="text-2xs text-text-muted mb-1">{label}</p>
                <p className="text-sm text-text-primary font-mono">{value}</p>
              </div>
            ))}
          </div>
          <a href="mailto:partnerships@kakapo.io?subject=Intégration LLM KAKAPO"
            className="text-2xs font-mono text-accent hover:text-accent-hover no-underline">
            Discuter d'une intégration →
          </a>
        </div>

        <div className="py-12">
          <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-3">
            Pharma & Biotech
          </p>
          <h2 className="text-xl font-display text-text-primary mb-4">
            Frais de dépôt NDA FDA 2025 : 4 348 000 USD.
            500 sources certifiées KAKAPO : 200 USD.
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed max-w-xl mb-4">
            Chaque source scientifique citée dans un dossier réglementaire
            est certifiée avec hash SHA-256 et signature RSA-PSS.
            Vérifiable par tout auditeur FDA ou EMA.
            Exportable en PDF signé intégrable directement dans les dossiers.
          </p>
          <p className="text-sm text-text-secondary leading-relaxed max-w-xl mb-4">
            Les IA de drug discovery comme BenevolentAI ou Insilico Medicine
            utilisent des publications scientifiques sans certification indépendante.
            KAKAPO est la couche manquante.
          </p>
          <div className="border-l-2 border-border pl-4 mb-6">
            <p className="text-2xs text-text-muted mb-1">Source</p>
            <p className="text-sm text-text-secondary font-mono">
              FDA Prescription Drug User Fee Act — barème officiel 2025
            </p>
          </div>
          <a href="mailto:partnerships@kakapo.io?subject=KAKAPO Pharma"
            className="text-2xs font-mono text-accent hover:text-accent-hover no-underline">
            Parler à l'équipe →
          </a>
        </div>

        <div className="py-12">
          <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-3">
            Legal & Finance
          </p>
          <h2 className="text-xl font-display text-text-primary mb-4">
            Une source scientifique citée dans un dossier doit être
            vérifiable et opposable.
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed max-w-xl mb-6">
            Due diligence biotech, contentieux scientifiques, valorisation de brevets —
            chaque source citée par un LLM devient certifiée, horodatée,
            vérifiable en un clic.
            Admissible devant n'importe quelle juridiction.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { label: "Horodatage", value: "cryptographique" },
              { label: "Admissibilité", value: "toute juridiction" },
              { label: "Vérification", value: "tiers indépendant" },
              { label: "Intégration", value: "LLM existant" },
            ].map(({ label, value }) => (
              <div key={label} className="border border-border rounded p-4">
                <p className="text-2xs text-text-muted mb-1">{label}</p>
                <p className="text-sm text-text-primary font-mono">{value}</p>
              </div>
            ))}
          </div>
          <a href="mailto:partnerships@kakapo.io?subject=KAKAPO Legal"
            className="text-2xs font-mono text-accent hover:text-accent-hover no-underline">
            Demander une démo →
          </a>
        </div>

      </div>

      <div className="border-t border-border pt-12">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div>
            <p className="text-sm font-display text-text-primary mb-1">
              Voir comment ça fonctionne en pratique.
            </p>
            <p className="text-sm text-text-secondary">
              Claude seul vs Claude + KAKAPO sur une question scientifique réelle.
            </p>
          </div>
          <Link href="/demo"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-mono px-6 py-3 rounded transition-colors no-underline flex-shrink-0">
            Démo live →
          </Link>
        </div>
      </div>

    </div>
  );
}
