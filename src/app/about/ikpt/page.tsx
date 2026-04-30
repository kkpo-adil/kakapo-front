import Link from "next/link";

export default function AboutIKPTPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/" className="text-xs font-mono text-text-muted hover:text-accent no-underline">{"<-"} Accueil</Link>
      <div className="mt-8 mb-2 text-2xs font-mono text-accent uppercase tracking-widest">Indexed Knowledge Provenance Token</div>
      <h1 className="text-3xl font-display text-text-primary mb-6 leading-tight">Qu&apos;est-ce qu&apos;un i-KPT ?</h1>
      <p className="text-base text-text-secondary leading-relaxed mb-10">
        Un i-KPT (Indexed Knowledge Provenance Token) est un identifiant de traçabilité généré automatiquement à partir des métadonnées publiques d&apos;une publication scientifique. Il est distinct d&apos;un KPT certifié, mais partage la même structure de données.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden mb-10">
        <div className="bg-surface-2 p-6">
          <div className="text-2xs font-mono text-trust-high uppercase tracking-widest mb-3">KPT certifié</div>
          <ul className="space-y-2">
            {[
              "Hash SHA-256 du PDF original",
              "Signature d'un éditeur partenaire",
              "Antériorité cryptographique forte",
              "Utilisable dans un contexte légal ou réglementaire",
              "Trust Score complet (6 composantes)",
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-xs text-text-secondary">
                <span className="text-trust-high mt-0.5 flex-shrink-0">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-surface-3 p-6">
          <div className="text-2xs font-mono text-accent uppercase tracking-widest mb-3">i-KPT indexé</div>
          <ul className="space-y-2">
            {[
              "Basé sur les métadonnées publiques (HAL, CrossRef)",
              "Pas de hash PDF, pas de signature éditeur",
              "Antériorité indicative (date de soumission HAL)",
              "Score d'indexation sur 100 (complétude, citations, fraîcheur)",
              "Convertible en KPT certifié si l'éditeur signe",
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-xs text-text-secondary">
                <span className="text-accent mt-0.5 flex-shrink-0">→</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-6 mb-10">
        {[
          {
            title: "Pourquoi des i-KPT existent-ils ?",
            desc: "KAKAPO indexe automatiquement les publications disponibles en open access (HAL, arXiv, PubMed) pour constituer un catalogue de visibilité. Ces publications ne sont pas certifiées au sens fort — aucun éditeur ne les a signées — mais elles sont traçables, horodatées et scorées selon des critères objectifs."
          },
          {
            title: "Peut-on faire confiance à un i-KPT ?",
            desc: "Un i-KPT garantit que les métadonnées proviennent d'une source publique reconnue (HAL Open Science, CrossRef). Il ne garantit pas l'intégrité du contenu PDF ni l'absence de rétractation. Pour une utilisation dans un contexte réglementaire ou légal, seul un KPT certifié convient."
          },
          {
            title: "Comment un i-KPT devient-il certifié ?",
            desc: "Lorsqu'un éditeur partenaire signe un accord avec KAKAPO, ses publications indexées sont automatiquement promues en KPT certifiés. L'opération est un simple UPDATE — pas de recréation. L'identifiant reste le même, le statut change de 'indexed' à 'certified'."
          },
          {
            title: "RGPD et opt-out",
            desc: "Les métadonnées HAL sont sous licence CC0 (domaine public). Tout auteur ou éditeur peut demander le retrait de ses publications de l'index KAKAPO via notre endpoint d'opt-out. La demande est traitée sous 48h."
          },
        ].map(({ title, desc }) => (
          <div key={title} className="border-l-2 border-accent/30 pl-5">
            <h3 className="text-sm font-display text-text-primary mb-2">{title}</h3>
            <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface-3 border border-border rounded-lg p-5 mb-8">
        <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-3">Format d&apos;un i-KPT ID</p>
        <code className="text-sm font-mono text-accent">IKPT-7D77451C-v1</code>
        <p className="text-xs text-text-muted mt-2">Les i-KPT sont préfixés par <code className="font-mono text-accent text-2xs">IKPT-</code> pour les distinguer des KPT certifiés préfixés par <code className="font-mono text-accent text-2xs">KPT-</code>.</p>
      </div>

      <div className="flex gap-4 flex-wrap">
        <Link href="/about/kpt" className="no-underline inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm px-5 py-2.5 rounded transition-colors">
          En savoir plus sur les KPT certifiés →
        </Link>
        <Link href="/publications" className="no-underline inline-flex items-center gap-2 border border-border hover:border-accent text-text-secondary hover:text-accent text-sm px-5 py-2.5 rounded transition-colors">
          Explorer les publications
        </Link>
      </div>
    </div>
  );
}
