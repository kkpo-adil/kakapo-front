import Link from "next/link";

export default function EnterprisePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">

      <div className="mb-20">
        <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-3">Entreprise</p>
        <h1 className="text-4xl font-display text-text-primary mb-4 leading-tight">
          La couche de confiance<br />qui manque à votre IA.
        </h1>
        <p className="text-base text-text-secondary leading-relaxed max-w-2xl mb-2">
          KAKAPO est le notaire de la connaissance scientifique pour l'IA.
          Pas une bibliothèque. Pas un moteur de recherche.
          Une infrastructure de certification cryptographique indépendante.
        </p>
        <p className="text-sm text-accent font-mono">
          EU AI Act — décembre 2026. La traçabilité des sources devient obligatoire.
        </p>
      </div>

      <div className="space-y-12 mb-20">

        <div className="border border-border rounded-xl p-8 hover:border-accent/50 transition-colors">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">LLMs & Plateformes IA</p>
              <h2 className="text-2xl font-display text-text-primary">Vos clients enterprise vous attendent.</h2>
            </div>
            <span className="text-4xl">⚡</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-4">
              <p className="text-2xs font-mono text-red-400 uppercase mb-3">Sans KAKAPO</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Pharma, legal, médical — ces marchés refusent les LLMs sans traçabilité des sources.
                Vous perdez des contrats à 200-500K USD/an. Systématiquement.
              </p>
            </div>
            <div className="bg-green-950/20 border border-green-900/30 rounded-lg p-4">
              <p className="text-2xs font-mono text-green-400 uppercase mb-3">Avec KAKAPO</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Chaque réponse de votre LLM cite des sources cryptographiquement certifiées.
                Vos clients enterprise peuvent auditer, vérifier, opposer. Vous signez.
              </p>
            </div>
          </div>

          <div className="bg-surface-2 rounded-lg p-4 mb-6">
            <p className="text-xs font-mono text-text-muted mb-1">Le calcul pour Mistral :</p>
            <p className="text-sm text-text-secondary">
              <span className="text-accent font-semibold">10 clients enterprise pharma/legal</span> × 300K USD/an
              = <span className="text-accent font-semibold">3M USD ARR additionnel</span> impossible sans KAKAPO.
              Coût KAKAPO : 0.40 USD par vérification. Moins que le café de votre ingénieur.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="text-2xs font-mono bg-surface-3 border border-border rounded px-3 py-1">✓ Intégration API &lt; 1 journée</span>
            <span className="text-2xs font-mono bg-surface-3 border border-border rounded px-3 py-1">✓ 87 000+ publications certifiées</span>
            <span className="text-2xs font-mono bg-surface-3 border border-border rounded px-3 py-1">✓ Conformité EU AI Act</span>
            <span className="text-2xs font-mono bg-surface-3 border border-border rounded px-3 py-1">✓ Neutre — indépendant de tout éditeur</span>
          </div>

          <a href="mailto:partnerships@kakapo.io?subject=Intégration LLM KAKAPO"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-mono px-5 py-2.5 rounded transition-colors no-underline">
            Discuter d'une intégration →
          </a>
        </div>

        <div className="border border-border rounded-xl p-8 hover:border-accent/50 transition-colors">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">Pharma & Biotech</p>
              <h2 className="text-2xl font-display text-text-primary">0.001% du coût d'un dossier FDA.</h2>
            </div>
            <span className="text-4xl">🔬</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-4">
              <p className="text-2xs font-mono text-red-400 uppercase mb-3">Le risque aujourd'hui</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Un dossier FDA coûte 50M USD. Une source mal citée, non traçable,
                ou rétractée après soumission = retard de 18 mois minimum.
                Votre équipe passe des semaines à vérifier manuellement.
              </p>
            </div>
            <div className="bg-green-950/20 border border-green-900/30 rounded-lg p-4">
              <p className="text-2xs font-mono text-green-400 uppercase mb-3">Avec KAKAPO</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Chaque source est certifiée avec hash SHA-256 et signature RSA-PSS.
                Vérifiable par n'importe quel auditeur FDA/EMA en 10 secondes.
                Export PDF signé prêt pour vos dossiers réglementaires.
              </p>
            </div>
          </div>

          <div className="bg-surface-2 rounded-lg p-4 mb-6">
            <p className="text-xs font-mono text-text-muted mb-1">Le calcul :</p>
            <p className="text-sm text-text-secondary">
              Dossier FDA à <span className="text-accent font-semibold">50M USD</span>.
              500 sources vérifiées × 0.40 USD =
              <span className="text-accent font-semibold"> 200 USD de certification</span>.
              Soit <span className="text-accent font-semibold">0.0004%</span> du coût total.
              Aucun directeur réglementaire ne refuse ça.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="text-2xs font-mono bg-surface-3 border border-border rounded px-3 py-1">✓ Hash SHA-256 + RSA-PSS</span>
            <span className="text-2xs font-mono bg-surface-3 border border-border rounded px-3 py-1">✓ Export PDF pour dossiers FDA/EMA</span>
            <span className="text-2xs font-mono bg-surface-3 border border-border rounded px-3 py-1">✓ Détection rétractations en temps réel</span>
            <span className="text-2xs font-mono bg-surface-3 border border-border rounded px-3 py-1">✓ Audit trail complet</span>
          </div>

          <a href="mailto:partnerships@kakapo.io?subject=KAKAPO Pharma R&D"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-mono px-5 py-2.5 rounded transition-colors no-underline">
            Parler à l'équipe →
          </a>
        </div>

        <div className="border border-border rounded-xl p-8 hover:border-accent/50 transition-colors">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">Legal & Finance</p>
              <h2 className="text-2xl font-display text-text-primary">De 3 heures à 10 secondes.</h2>
            </div>
            <span className="text-4xl">⚖️</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-4">
              <p className="text-2xs font-mono text-red-400 uppercase mb-3">Aujourd'hui</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Votre analyste vérifie manuellement chaque source scientifique citée
                dans un dossier de due diligence pharma ou biotech.
                3h de travail par dossier. Non opposable sans vérification manuelle.
              </p>
            </div>
            <div className="bg-green-950/20 border border-green-900/30 rounded-lg p-4">
              <p className="text-2xs font-mono text-green-400 uppercase mb-3">Avec KAKAPO</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Chaque source est certifiée, horodatée, vérifiable en un clic.
                Admissible devant n'importe quelle juridiction.
                Votre analyste se concentre sur l'analyse, pas la vérification.
              </p>
            </div>
          </div>

          <div className="bg-surface-2 rounded-lg p-4 mb-6">
            <p className="text-xs font-mono text-text-muted mb-1">Le calcul pour Linklaters :</p>
            <p className="text-sm text-text-secondary">
              <span className="text-accent font-semibold">3 000 avocats</span> × 5 vérifications/jour × 250 jours
              = 3,75M vérifications/an.
              À <span className="text-accent font-semibold">0.40 USD</span> = 1,5M USD/an pour KAKAPO.
              Économie pour Linklaters : <span className="text-accent font-semibold">milliers d'heures analyste</span>.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="text-2xs font-mono bg-surface-3 border border-border rounded px-3 py-1">✓ Sources admissibles en juridiction</span>
            <span className="text-2xs font-mono bg-surface-3 border border-border rounded px-3 py-1">✓ Vérification par des tiers</span>
            <span className="text-2xs font-mono bg-surface-3 border border-border rounded px-3 py-1">✓ Intégration avec vos LLMs existants</span>
            <span className="text-2xs font-mono bg-surface-3 border border-border rounded px-3 py-1">✓ Audit trail horodaté</span>
          </div>

          <a href="mailto:partnerships@kakapo.io?subject=KAKAPO Legal Finance"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-mono px-5 py-2.5 rounded transition-colors no-underline">
            Demander une démo →
          </a>
        </div>

      </div>

      <div className="border border-border rounded-xl p-8 bg-surface-2 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-display font-bold text-accent mb-1">87K+</p>
            <p className="text-xs text-text-muted">Publications certifiées</p>
          </div>
          <div>
            <p className="text-3xl font-display font-bold text-accent mb-1">SHA-256</p>
            <p className="text-xs text-text-muted">Certification cryptographique</p>
          </div>
          <div>
            <p className="text-3xl font-display font-bold text-accent mb-1">0.40$</p>
            <p className="text-xs text-text-muted">Par vérification certifiée</p>
          </div>
          <div>
            <p className="text-3xl font-display font-bold text-accent mb-1">Déc. 2026</p>
            <p className="text-xs text-text-muted">EU AI Act en vigueur</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-display text-text-primary mb-3">Voyez la différence en live.</h2>
        <p className="text-sm text-text-secondary mb-8 max-w-xl mx-auto">
          Posez une question scientifique. Comparez Claude seul vs Claude + KAKAPO.
          La différence est immédiate.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/demo"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-mono px-8 py-3 rounded transition-colors no-underline">
            Voir la démo live →
          </Link>
          <a href="mailto:partnerships@kakapo.io"
            className="inline-flex items-center gap-2 border border-border hover:border-accent/50 text-text-secondary hover:text-text-primary text-sm font-mono px-8 py-3 rounded transition-colors no-underline">
            Contacter l'équipe →
          </a>
        </div>
      </div>

    </div>
  );
}
