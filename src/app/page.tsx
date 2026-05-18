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
    <div className="max-w-4xl mx-auto px-6">

      <section className="pt-24 pb-16 border-b border-border">
        <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/5 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-2xs font-mono text-accent">
            {certified > 0 ? formatCount(certified) : "40M+"} sources scientifiques vérifiées
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-display text-text-primary leading-tight mb-6 max-w-3xl">
          KAKAPO garantit que chaque source scientifique utilisée par une IA est authentique, traçable et juridiquement opposable. Dans le monde entier.
        </h1>

        <p className="text-base text-text-secondary leading-relaxed max-w-2xl mb-4">
          Santé, pharma, legal, défense — ces marchés représentent{" "}
          <strong className="text-text-primary">187 milliards USD pour l'IA d'ici 2030</strong>.
          Ils sont aujourd'hui fermés aux LLMs parce qu'ils ne peuvent pas prouver leurs sources.
          KAKAPO ouvre ces marchés.
        </p>

        <p className="text-sm font-mono text-accent mb-10">
          UE · Chine · États-Unis — La traçabilité des sources IA est désormais une obligation légale mondiale.
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
            {
              value: certified > 0 ? formatCount(certified) : "40M+",
              label: "Sources scientifiques vérifiées"
            },
            {
              value: "187 Mds $",
              label: "Marché IA régulé en 2030"
            },
            {
              value: "< 1 jour",
              label: "Intégration API"
            },
            {
              value: "3 régions",
              label: "UE · Chine · USA — obligation légale"
            },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-xl font-display font-bold text-text-primary mb-1">{value}</p>
              <p className="text-2xs text-text-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 border-b border-border">
        <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-10">
          Trois acteurs. Un seul standard.
        </p>

        <div className="divide-y divide-border">

          <div className="py-10">
            <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">
              LLMs & Plateformes IA — Mistral · Claude · GPT · DeepSeek
            </p>
            <h2 className="text-2xl font-display text-text-primary mb-4">
              187 milliards USD de marchés régulés vous sont fermés aujourd'hui.
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed max-w-2xl mb-4">
              Pharma, santé, legal, défense — ces clients enterprise exigent que chaque réponse IA
              cite des sources vérifiées par un tiers indépendant.
              Sans ça : contrat perdu. Avec KAKAPO : contrat signé.
            </p>
            <p className="text-sm font-mono text-text-muted">
              10 clients enterprise × 300 000 USD/an ={" "}
              <strong className="text-text-primary">3M USD ARR inaccessible sans KAKAPO</strong>
            </p>
          </div>

          <div className="py-10">
            <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">
              IA Médicales & Drug Discovery — Aidoc · BenevolentAI · Insilico
            </p>
            <h2 className="text-2xl font-display text-text-primary mb-4">
              Ces systèmes utilisent la littérature scientifique sans certification indépendante.
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed max-w-2xl mb-4">
              Aidoc traite 60 millions de cas patients par an dans 1 600 centres médicaux.
              BenevolentAI construit son moteur de drug discovery sur des publications scientifiques.
              Aucun des deux ne dispose d'une couche de certification tierce indépendante.
              L'EU AI Act 2026 change ça. KAKAPO est l'infrastructure qu'ils n'ont pas encore.
            </p>
            <p className="text-sm font-mono text-text-muted">
              Sources :{" "}
              <span className="text-text-secondary">Aidoc communiqué officiel janv. 2026 · DrugPatentWatch 2026</span>
            </p>
          </div>

          <div className="py-10">
            <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">
              Pharma · Legal · Finance — Mondial
            </p>
            <h2 className="text-2xl font-display text-text-primary mb-4">
              Chaque source horodatée. Non altérable. Admissible dans toute juridiction mondiale.
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed max-w-2xl mb-4">
              Frais de dépôt NDA FDA 2025 : 4,3 millions USD.
              500 sources vérifiées par KAKAPO : 200 USD.
              Chaque source est scellée cryptographiquement, horodatée et vérifiable
              par tout auditeur indépendant — FDA, EMA, tribunal, régulateur — partout dans le monde.
            </p>
            <p className="text-sm font-mono text-text-muted">
              Source :{" "}
              <span className="text-text-secondary">Barème officiel FDA 2025</span>
            </p>
          </div>

        </div>
      </section>

      <section className="py-16 border-b border-border">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div>
            <h2 className="text-xl font-display text-text-primary mb-2">
              Claude seul vs Claude + KAKAPO.
            </h2>
            <p className="text-sm text-text-secondary max-w-lg">
              Posez une question scientifique. La différence est immédiate.
              Réponse non sourcée versus réponse certifiée, traçable, opposable.
            </p>
          </div>
          <Link href="/demo"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-mono px-6 py-3 rounded transition-colors no-underline flex-shrink-0">
            Démo live →
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div>
            <h2 className="text-xl font-display text-text-primary mb-2">
              Intégrez KAKAPO en une journée.
            </h2>
            <p className="text-sm text-text-secondary max-w-lg">
              Un endpoint. Une clé API. Vos réponses IA deviennent certifiées.
            </p>
          </div>
          <a href="mailto:partnerships@kakapo.io"
            className="inline-flex items-center gap-2 border border-border hover:border-accent/50 text-text-secondary hover:text-text-primary text-sm font-mono px-6 py-3 rounded transition-colors no-underline flex-shrink-0">
            Nous contacter →
          </a>
        </div>
      </section>

    </div>
  );
}
