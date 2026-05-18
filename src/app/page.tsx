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
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M+`;
  if (n >= 1000) return `${Math.floor(n / 1000)}K+`;
  return n.toString();
}

export default async function HomePage() {
  const stats = await getStats();
  const certified = stats?.total_certified ?? 0;

  return (
    <div className="max-w-4xl mx-auto px-6">

      <section className="pt-20 pb-16 border-b border-border">
        <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/5 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-2xs font-mono text-accent">
            {certified > 0 ? formatCount(certified) : "87K+"} sources scientifiques certifiées
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display text-text-primary leading-tight mb-5 max-w-3xl">
          La couche de confiance invisible entre la science et l'IA.
        </h1>
        <p className="text-base text-text-secondary leading-relaxed max-w-2xl mb-10">
          KAKAPO certifie cryptographiquement chaque source scientifique avant qu'elle entre dans un système IA.
          Les LLMs accèdent aux marchés régulés. Les chercheurs sont rémunérés. Les industriels sont protégés.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/demo"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-mono px-6 py-3 rounded transition-colors no-underline">
            Voir la démo →
          </Link>
          <Link href="/entreprise"
            className="inline-flex items-center gap-2 border border-border hover:border-accent/30 text-text-secondary hover:text-text-primary text-sm font-mono px-6 py-3 rounded transition-colors no-underline">
            Solutions entreprise
          </Link>
        </div>
      </section>

      <section className="py-12 border-b border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: certified > 0 ? formatCount(certified) : "1,2M+", label: "Sources certifiées" },
            { value: "SHA-256", label: "Standard cryptographique" },
            { value: "< 1 jour", label: "Intégration API" },
            { value: "Déc. 2026", label: "EU AI Act en vigueur" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-xl font-display font-bold text-text-primary mb-1">{value}</p>
              <p className="text-2xs text-text-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 border-b border-border">
        <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-8">Trois acteurs. Un seul standard.</p>
        <div className="divide-y divide-border">

          <div className="py-8">
            <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">LLMs & Plateformes IA</p>
            <h2 className="text-xl font-display text-text-primary mb-3">
              Accédez aux marchés qui vous sont fermés aujourd'hui.
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed max-w-2xl mb-3">
              Pharma, legal, médical — ces marchés exigent des sources vérifiables par des tiers indépendants.
              Intégrez KAKAPO via API et chaque réponse de votre LLM devient certifiée, traçable, opposable.
            </p>
            <p className="text-sm font-mono text-text-muted">
              10 clients enterprise × 300K USD/an →{" "}
              <span className="text-text-primary">3M USD ARR inaccessible sans KAKAPO</span>
            </p>
          </div>

          <div className="py-8">
            <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">Chercheurs & Éditeurs</p>
            <h2 className="text-xl font-display text-text-primary mb-3">
              Votre recherche génère des revenus à chaque accès IA.
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed max-w-2xl mb-3">
              Chaque fois qu'un LLM cite votre publication via KAKAPO, vous recevez un micropaiement automatique.
              Déposez votre publication — certification en 24h — revenu à chaque citation.
            </p>
            <Link href="/chercheurs"
              className="text-2xs font-mono text-accent hover:text-accent-hover no-underline">
              Déposer une publication →
            </Link>
          </div>

          <div className="py-8">
            <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">Pharma · Legal · Finance</p>
            <h2 className="text-xl font-display text-text-primary mb-3">
              Chaque source admissible. Chaque audit traçable.
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed max-w-2xl mb-3">
              Dossiers FDA/EMA, due diligence, compliance. Chaque source citée est certifiée, horodatée,
              vérifiable par tout auditeur en 10 secondes. Frais de dépôt FDA 2025 : 4,3M USD.
              500 sources KAKAPO : 200 USD.
            </p>
            <Link href="/entreprise"
              className="text-2xs font-mono text-accent hover:text-accent-hover no-underline">
              Voir les solutions →
            </Link>
          </div>

        </div>
      </section>

      <section className="py-16">
        <div className="border border-border rounded-xl p-8 flex items-center justify-between flex-wrap gap-6">
          <div>
            <p className="text-lg font-display text-text-primary mb-1">
              Claude seul vs Claude + KAKAPO.
            </p>
            <p className="text-sm text-text-secondary">
              Posez une question scientifique. La différence est immédiate.
            </p>
          </div>
          <Link href="/demo"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-mono px-6 py-3 rounded transition-colors no-underline flex-shrink-0">
            Démo live →
          </Link>
        </div>
      </section>

    </div>
  );
}
