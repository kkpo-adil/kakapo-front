import Link from "next/link";

export default function EnterprisePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">

      <div className="mb-20">
        <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-4">Infrastructure · Entreprise</p>
        <h1 className="text-4xl font-display text-text-primary mb-5 leading-tight max-w-2xl">
          Le notaire de la connaissance scientifique pour l'IA.
        </h1>
        <p className="text-base text-text-secondary leading-relaxed max-w-2xl mb-4">
          KAKAPO certifie cryptographiquement chaque source scientifique avant qu'elle entre dans un système IA.
          Pas une bibliothèque. Pas un moteur de recherche. Une infrastructure de certification indépendante.
        </p>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block"></span>
          <p className="text-sm font-mono text-accent">EU AI Act · Traçabilité des sources obligatoire · Décembre 2026</p>
        </div>
      </div>

      <div className="space-y-px mb-20">

        <div className="border border-border rounded-t-xl p-10">
          <div className="mb-8">
            <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-2">Segment 01 — LLMs & Plateformes IA</p>
            <h2 className="text-2xl font-display text-text-primary mb-1">Vos clients enterprise vous attendent.</h2>
            <p className="text-sm font-mono text-text-muted">Pharma. Legal. Médical. Ils ne signent pas sans traçabilité des sources.</p>
          </div>

          <div className="grid grid-cols-2 gap-px bg-border mb-8">
            <div className="bg-surface-1 p-5">
              <p className="text-2xs font-mono text-text-muted uppercase mb-3">Sans KAKAPO</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Ces marchés refusent systématiquement les LLMs sans certification des sources.
                Contrats à 200–500K USD/an. Perdus. Systématiquement.
              </p>
            </div>
            <div className="bg-surface-1 p-5">
              <p className="text-2xs font-mono text-accent uppercase mb-3">Avec KAKAPO</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Chaque réponse cite des sources cryptographiquement certifiées.
                Auditables. Vérifiables. Opposables. Vos clients enterprise signent.
              </p>
            </div>
          </div>

          <div className="border-l-2 border-accent pl-5 mb-8">
            <p className="text-2xs font-mono text-text-muted mb-1">Le calcul</p>
            <p className="text-sm text-text-secondary">
              10 clients enterprise pharma/legal × 300K USD/an = <strong className="text-text-primary">3M USD ARR additionnel</strong> inaccessible sans KAKAPO.
              Coût unitaire KAKAPO : 0,40 USD par vérification certifiée.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {["Intégration API < 1 jour", "87 000+ publications certifiées", "Conformité EU AI Act", "Neutre — indépendant de tout éditeur"].map(f => (
              <div key={f} className="border border-border rounded p-3">
                <p className="text-2xs text-text-secondary">{f}</p>
              </div>
            ))}
          </div>

          <a href="mailto:partnerships@kakapo.io?subject=Intégration LLM KAKAPO"
            className="inline-flex items-center gap-2 border border-accent text-accent hover:bg-accent hover:text-white text-sm font-mono px-5 py-2.5 rounded transition-colors no-underline">
            Discuter d'une intégration →
          </a>
        </div>

        <div className="border border-border p-10">
          <div className="mb-8">
            <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-2">Segment 02 — Pharma & Biotech</p>
            <h2 className="text-2xl font-display text-text-primary mb-1">200 USD sur un dépôt FDA à 4,3M USD.</h2>
            <p className="text-sm font-mono text-text-muted">500 sources vérifiées × 0,40 USD. Frais de dépôt FDA 2025 : 4 348 000 USD.</p>
          </div>

          <div className="grid grid-cols-2 gap-px bg-border mb-8">
            <div className="bg-surface-1 p-5">
              <p className="text-2xs font-mono text-text-muted uppercase mb-3">Le risque aujourd'hui</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Une source mal citée, non traçable, ou rétractée après soumission FDA.
                Retard minimum : 18 mois. Coût : plusieurs millions.
                Vos équipes vérifient manuellement. Chaque fois.
              </p>
            </div>
            <div className="bg-surface-1 p-5">
              <p className="text-2xs font-mono text-accent uppercase mb-3">Avec KAKAPO</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Hash SHA-256. Signature RSA-PSS. Vérifiable par tout auditeur FDA/EMA en 10 secondes.
                Export PDF signé intégrable directement dans vos dossiers réglementaires.
              </p>
            </div>
          </div>

          <div className="border-l-2 border-accent pl-5 mb-8">
            <p className="text-2xs font-mono text-text-muted mb-1">Le calcul</p>
            <p className="text-sm text-text-secondary">
              Dossier FDA à <strong className="text-text-primary">50M USD</strong>. 500 vérifications × 0,40 USD = <strong className="text-text-primary">200 USD</strong>.
              Aucun directeur réglementaire ne refuse ça.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {["SHA-256 + RSA-PSS", "Export PDF réglementaire", "Détection rétractations", "Audit trail complet"].map(f => (
              <div key={f} className="border border-border rounded p-3">
                <p className="text-2xs text-text-secondary">{f}</p>
              </div>
            ))}
          </div>

          <a href="mailto:partnerships@kakapo.io?subject=KAKAPO Pharma"
            className="inline-flex items-center gap-2 border border-accent text-accent hover:bg-accent hover:text-white text-sm font-mono px-5 py-2.5 rounded transition-colors no-underline">
            Parler à l'équipe →
          </a>
        </div>

        <div className="border border-border rounded-b-xl p-10">
          <div className="mb-8">
            <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-2">Segment 03 — Legal & Finance</p>
            <h2 className="text-2xl font-display text-text-primary mb-1">De 3 heures à 10 secondes.</h2>
            <p className="text-sm font-mono text-text-muted">Vérification manuelle d'une source scientifique dans un dossier de due diligence.</p>
          </div>

          <div className="grid grid-cols-2 gap-px bg-border mb-8">
            <div className="bg-surface-1 p-5">
              <p className="text-2xs font-mono text-text-muted uppercase mb-3">Aujourd'hui</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Chaque source scientifique citée dans un dossier est vérifiée manuellement.
                3h par dossier. Non opposable sans trace. Risque juridique réel.
              </p>
            </div>
            <div className="bg-surface-1 p-5">
              <p className="text-2xs font-mono text-accent uppercase mb-3">Avec KAKAPO</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Chaque source est certifiée, horodatée, vérifiable en un clic.
                Admissible devant n'importe quelle juridiction.
                Vos équipes se concentrent sur l'analyse.
              </p>
            </div>
          </div>

          <div className="border-l-2 border-accent pl-5 mb-8">
            <p className="text-2xs font-mono text-text-muted mb-1">Le calcul — Linklaters</p>
            <p className="text-sm text-text-secondary">
              <strong className="text-text-primary">3 000 avocats</strong> × 5 vérifications/jour × 250 jours = 3,75M vérifications/an.
              À 0,40 USD = <strong className="text-text-primary">1,5M USD/an</strong> pour KAKAPO. Des milliers d'heures récupérées.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {["Admissible en juridiction", "Vérification tierce", "Intégration LLM existant", "Audit trail horodaté"].map(f => (
              <div key={f} className="border border-border rounded p-3">
                <p className="text-2xs text-text-secondary">{f}</p>
              </div>
            ))}
          </div>

          <a href="mailto:partnerships@kakapo.io?subject=KAKAPO Legal"
            className="inline-flex items-center gap-2 border border-accent text-accent hover:bg-accent hover:text-white text-sm font-mono px-5 py-2.5 rounded transition-colors no-underline">
            Demander une démo →
          </a>
        </div>

      </div>

      <div className="grid grid-cols-4 gap-px bg-border border border-border rounded-xl overflow-hidden mb-16">
        {[
          { value: "87 000+", label: "Publications certifiées" },
          { value: "SHA-256", label: "Standard cryptographique" },
          { value: "0,40 USD", label: "Par vérification" },
          { value: "Déc. 2026", label: "EU AI Act en vigueur" },
        ].map(({ value, label }) => (
          <div key={label} className="bg-surface-1 p-6 text-center">
            <p className="text-xl font-display font-bold text-text-primary mb-1">{value}</p>
            <p className="text-2xs text-text-muted">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-border pt-10">
        <div>
          <p className="text-base font-display text-text-primary mb-1">Voir la différence en live.</p>
          <p className="text-sm text-text-secondary">Claude seul vs Claude + KAKAPO. La différence est immédiate.</p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <Link href="/demo"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-mono px-5 py-2.5 rounded transition-colors no-underline">
            Démo live →
          </Link>
          <a href="mailto:partnerships@kakapo.io"
            className="inline-flex items-center gap-2 border border-border hover:border-accent/50 text-text-secondary text-sm font-mono px-5 py-2.5 rounded transition-colors no-underline">
            Contact →
          </a>
        </div>
      </div>

    </div>
  );
}
