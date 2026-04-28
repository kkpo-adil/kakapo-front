import Link from "next/link";

export default function AboutTrustScorePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/" className="text-xs font-mono text-text-muted hover:text-accent no-underline">← Accueil</Link>
      <div className="mt-8 mb-2 text-2xs font-mono text-accent uppercase tracking-widest">Score de fiabilité</div>
      <h1 className="text-3xl font-display text-text-primary mb-6 leading-tight">Comment fonctionne le Trust Score ?</h1>
      <p className="text-base text-text-secondary leading-relaxed mb-4">
        Le Trust Score est une fonction de confiance calculée sur des signaux vérifiables. Ce n'est pas une opinion, ni une note de popularité. C'est une mesure de la fiabilité observable d'une publication scientifique.
      </p>
      <p className="text-sm text-text-muted leading-relaxed mb-10 font-mono border-l-2 border-accent/30 pl-4">
        T(p,t) ∈ [0,1] — stable, robuste aux attaques, évolutif dans le temps.
      </p>

      <h2 className="text-lg font-display text-text-primary mb-6">Les 6 composantes</h2>
      <div className="space-y-4 mb-10">
        {[
          { label: "Source", weight: "30%", formula: "Tier A→0.90 / B→0.70 / C→0.50 / D→0.30", desc: "Crédibilité de la source éditoriale. Nature, Science = tier A. arXiv, HAL = tier B. Dépôt direct = tier C." },
          { label: "Données", weight: "20%", formula: "S = (d₁ + 2·d₂ + 2·d₃ + d₄) / 6", desc: "Reproductibilité : présence DOI, dataset, code source, matériel supplémentaire. Dataset et code valent double." },
          { label: "Citations", weight: "20%", formula: "S = 1 − exp(−0.05 · C)", desc: "Intégration dans le réseau scientifique. Saturation logarithmique — immune aux manipulations de volume." },
          { label: "Fraîcheur", weight: "15%", formula: "S = exp(−0.10 · Δt)", desc: "Décroissance continue selon l'âge en années. Un paper de 2023 score plus haut qu'un paper de 2010 à signaux égaux." },
          { label: "Cohérence", weight: "10%", formula: "S = (c₁ + c₂ + (1−c₃) + (1−c₄)) / 4", desc: "Validité structurelle : DOI valide, auteurs cohérents, absence de duplication, absence de rétractation." },
          { label: "Reviews", weight: "5%", formula: "Médiane pondérée — activée si n ≥ 3", desc: "Jugement pair ORCID-tracé. Poids limité en V1 pour résistance aux manipulations. Augmente avec le volume." },
        ].map(({ label, weight, formula, desc }) => (
          <div key={label} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-display text-text-primary">{label}</span>
              <span className="text-xs font-mono text-accent border border-accent/20 rounded px-2 py-0.5">{weight}</span>
            </div>
            <code className="text-xs font-mono text-text-muted block mb-2">{formula}</code>
            <p className="text-xs text-text-muted leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="p-5 bg-surface-3 border border-border rounded-lg mb-8">
        <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-3">Interprétation</p>
        <div className="space-y-2">
          {[
            { range: "≥ 0.90", label: "Validé", desc: "Fiabilité confirmée par l'usage", color: "text-trust-high" },
            { range: "0.70 – 0.89", label: "Solide", desc: "Signaux convergents, à confirmer", color: "text-trust-high" },
            { range: "0.50 – 0.69", label: "Incertain", desc: "Signaux mixtes — prudence", color: "text-trust-mid" },
            { range: "< 0.50", label: "Faible", desc: "Crédibilité insuffisante", color: "text-trust-low" },
          ].map(({ range, label, desc, color }) => (
            <div key={range} className="flex items-center gap-4">
              <span className="text-xs font-mono text-text-muted w-24">{range}</span>
              <span className={`text-xs font-mono font-medium w-20 ${color}`}>{label}</span>
              <span className="text-xs text-text-muted">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      <Link href="/publications" className="no-underline inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm px-5 py-2.5 rounded transition-colors">
        Explorer les publications →
      </Link>
    </div>
  );
}
