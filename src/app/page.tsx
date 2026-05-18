import Link from "next/link";

async function getStats() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "https://kakapo-back-production.up.railway.app"}/ingest/stats/full`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function formatCount(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(0)}M+`;
  if (n >= 1000) return `${Math.floor(n / 1000)}K+`;
  return n.toString();
}

export default async function HomePage() {
  const stats = await getStats();
  const certified = stats?.total_certified ?? 0;

  return (
    <div className="max-w-3xl mx-auto px-6">

      <section className="pt-24 pb-16 border-b border-border">
        <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-8">
          Infrastructure · Provenance scientifique · LLMs
        </p>
        <h1 className="text-3xl sm:text-4xl font-display text-text-primary leading-tight mb-6 max-w-2xl">
          Il n'existe pas encore de couche standardisée permettant de rendre les sources scientifiques des LLMs traçables et auditables de manière indépendante.
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed max-w-xl mb-10">
          KAKAPO construit cette couche — certification cryptographique des publications,
          provenance vérifiable du preprint à la publication finale,
          audit trail exploitable dans les contextes régulés,
          intégration API simple côté LLM.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/demo"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-mono px-6 py-3 rounded transition-colors no-underline">
            Voir la démo →
          </Link>
          <Link href="/entreprise"
            className="inline-flex items-center gap-2 border border-border hover:border-accent/30 text-text-secondary hover:text-text-primary text-sm font-mono px-6 py-3 rounded transition-colors no-underline">
            Cas d'usage
          </Link>
        </div>
      </section>

      <section className="py-12 border-b border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              value: certified > 0 ? formatCount(certified) : "40M+",
              label: "Publications certifiées",
              sub: "texte intégral · hash SHA-256"
            },
            {
              value: "preprint → final",
              label: "Parcours complet certifié",
              sub: "arXiv · bioRxiv · Nature · NEJM"
            },
            {
              value: "< 1 jour",
              label: "Intégration LLM",
              sub: "1 endpoint · 1 clé API"
            },
            {
              value: "EU · CN · US",
              label: "Exigences de traçabilité",
              sub: "réglementations actives"
            },
          ].map(({ value, label, sub }) => (
            <div key={label}>
              <p className="text-lg font-display font-bold text-text-primary mb-1">{value}</p>
              <p className="text-2xs text-text-secondary mb-1">{label}</p>
              <p className="text-2xs text-text-muted">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 border-b border-border">
        <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-8">Ce que KAKAPO ajoute</p>
        <div className="divide-y divide-border">

          <div className="py-7">
            <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">Certification cryptographique</p>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
              Hash SHA-256 du texte intégral. Signature RSA-PSS. Horodatage vérifiable.
              Chaque publication est scellée au moment de sa certification —
              toute modification ultérieure est détectable.
            </p>
          </div>

          <div className="py-7">
            <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">Provenance complète</p>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
              KAKAPO certifie le parcours d'un article scientifique —
              du preprint déposé sur arXiv ou bioRxiv jusqu'à la publication peer-reviewed finale.
              Les deux versions sont liées via les métadonnées CrossRef.
              Le LLM cite toujours la version la plus récente et la plus validée.
            </p>
          </div>

          <div className="py-7">
            <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">Neutralité structurelle</p>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
              Un LLM ne peut pas certifier ses propres sources d'entraînement —
              conflit d'intérêt structurel.
              Un éditeur ne peut pas auditer ses propres publications.
              KAKAPO est le tiers indépendant — ni LLM, ni éditeur, ni chercheur.
            </p>
          </div>

          <div className="py-7">
            <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">Intégration API</p>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
              Un endpoint. Une clé API. Les réponses du LLM deviennent certifiées,
              traçables et auditables — sans modifier l'architecture existante.
            </p>
          </div>

        </div>
      </section>

      <section className="py-12 border-b border-border">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div>
            <p className="text-sm font-display text-text-primary mb-1">Prototype fonctionnel déployé.</p>
            <p className="text-sm text-text-secondary">
              Claude seul vs Claude + KAKAPO — la différence est immédiate.
            </p>
          </div>
          <Link href="/demo"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-mono px-6 py-3 rounded transition-colors no-underline flex-shrink-0">
            Démo live →
          </Link>
        </div>
      </section>

      <section className="py-12">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <p className="text-sm text-text-secondary max-w-sm">
            Pour les équipes LLM, les éditeurs scientifiques et les chercheurs.
          </p>
          <a href="mailto:partnerships@kakapo.io"
            className="inline-flex items-center gap-2 border border-border hover:border-accent/30 text-text-secondary hover:text-text-primary text-sm font-mono px-6 py-3 rounded transition-colors no-underline flex-shrink-0">
            partnerships@kakapo.io →
          </a>
        </div>
      </section>

    </div>
  );
}
