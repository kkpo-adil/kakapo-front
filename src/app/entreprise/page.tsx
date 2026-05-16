import Link from "next/link";

export default function EntreprisePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-16">
        <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-3">Entreprise</p>
        <h1 className="text-4xl font-display text-text-primary mb-4 leading-tight">
          L'infrastructure de confiance<br />pour l'IA scientifique.
        </h1>
        <p className="text-base text-text-secondary leading-relaxed max-w-2xl">
          KAKAPO certifie cryptographiquement les sources scientifiques avant qu'elles entrent dans vos systèmes IA.
          Chaque réponse devient vérifiable, traçable et opposable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="border border-border rounded-lg p-6">
          <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-3">LLMs & IA</p>
          <h2 className="text-lg font-display text-text-primary mb-3">Accédez aux marchés régulés</h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            Pharma, legal, médical — ces marchés exigent des sources vérifiables.
            KAKAPO est la couche manquante entre votre LLM et ces clients enterprise.
          </p>
          <div className="space-y-2 mb-6">
            <p className="text-2xs text-text-muted">✓ Catalogue 87 000+ publications certifiées</p>
            <p className="text-2xs text-text-muted">✓ Intégration API en quelques heures</p>
            <p className="text-2xs text-text-muted">✓ Conformité EU AI Act décembre 2026</p>
          </div>
          <Link href="/llm" className="text-2xs font-mono text-accent hover:text-accent-hover no-underline">
            En savoir plus →
          </Link>
        </div>

        <div className="border border-border rounded-lg p-6">
          <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-3">Pharma & Biotech</p>
          <h2 className="text-lg font-display text-text-primary mb-3">Sources opposables pour la R&D</h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            Dossiers FDA/EMA, Medical Affairs, veille scientifique —
            chaque source citée est cryptographiquement certifiée et vérifiable par tout auditeur.
          </p>
          <div className="space-y-2 mb-6">
            <p className="text-2xs text-text-muted">✓ Hash SHA-256 + signature RSA-PSS</p>
            <p className="text-2xs text-text-muted">✓ Export PDF signé pour dossiers réglementaires</p>
            <p className="text-2xs text-text-muted">✓ Traçabilité complète de chaque source</p>
          </div>
          <Link href="/pharma" className="text-2xs font-mono text-accent hover:text-accent-hover no-underline">
            En savoir plus →
          </Link>
        </div>

        <div className="border border-border rounded-lg p-6">
          <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-3">Legal & Finance</p>
          <h2 className="text-lg font-display text-text-primary mb-3">Due diligence certifiée</h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            Chaque source scientifique citée dans vos analyses est vérifiable en un clic.
            Admissible. Traçable. Opposable devant n'importe quelle juridiction.
          </p>
          <div className="space-y-2 mb-6">
            <p className="text-2xs text-text-muted">✓ Sources vérifiables par des tiers</p>
            <p className="text-2xs text-text-muted">✓ Audit trail complet</p>
            <p className="text-2xs text-text-muted">✓ Intégration avec vos outils existants</p>
          </div>
          <Link href="/legal-finance" className="text-2xs font-mono text-accent hover:text-accent-hover no-underline">
            En savoir plus →
          </Link>
        </div>
      </div>

      <div className="border border-border rounded-lg p-8 bg-surface-2 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-3xl font-display font-bold text-accent mb-1">87 000+</p>
            <p className="text-xs text-text-muted">Publications certifiées</p>
          </div>
          <div>
            <p className="text-3xl font-display font-bold text-accent mb-1">6</p>
            <p className="text-xs text-text-muted">Sources scientifiques intégrées</p>
          </div>
          <div>
            <p className="text-3xl font-display font-bold text-accent mb-1">SHA-256</p>
            <p className="text-xs text-text-muted">Certification cryptographique</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-display text-text-primary mb-4">Discutons de votre cas d'usage</h2>
        <p className="text-sm text-text-secondary mb-8 max-w-xl mx-auto">
          Chaque intégration est différente. Contactez-nous pour discuter de vos besoins spécifiques
          et voir comment KAKAPO s'intègre dans votre infrastructure existante.
        </p>
        <a
          href="mailto:partnerships@kakapo.io"
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-mono px-8 py-3 rounded transition-colors no-underline"
        >
          Contacter l'équipe Entreprise →
        </a>
        <p className="text-2xs text-text-muted mt-4">Réponse sous 24h</p>
      </div>
    </div>
  );
}
