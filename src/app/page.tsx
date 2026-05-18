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
            {certified > 0 ? formatCount(certified) : "40M+"} scientific sources verified
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-display text-text-primary leading-tight mb-6 max-w-3xl">
          KAKAPO guarantees that every scientific source used by an AI is authentic, traceable and legally admissible. Worldwide.
        </h1>

        <p className="text-base text-text-secondary leading-relaxed max-w-2xl mb-4">
          Healthcare, pharma, legal, defense — these markets represent{" "}
          <strong className="text-text-primary">$187 billion for AI by 2030</strong>.
          They are closed to LLMs today because they cannot prove their sources.
          KAKAPO opens these markets.
        </p>

        <p className="text-sm font-mono text-accent mb-10">
          EU · China · USA — Source traceability is now a global legal obligation.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link href="/demo"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-mono px-6 py-3 rounded transition-colors no-underline">
            See it live →
          </Link>
          <Link href="/entreprise"
            className="inline-flex items-center gap-2 border border-border hover:border-accent/30 text-text-secondary hover:text-text-primary text-sm font-mono px-6 py-3 rounded transition-colors no-underline">
            Enterprise solutions
          </Link>
        </div>
      </section>

      <section className="py-12 border-b border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              value: certified > 0 ? formatCount(certified) : "40M+",
              label: "Scientific sources verified"
            },
            {
              value: "$187B",
              label: "AI regulated market by 2030"
            },
            {
              value: "< 1 day",
              label: "API integration"
            },
            {
              value: "3 regions",
              label: "EU · China · USA enforcing"
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
          Three actors. One standard.
        </p>

        <div className="divide-y divide-border">

          <div className="py-10">
            <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">
              LLMs & AI Platforms — Mistral · Claude · GPT · DeepSeek
            </p>
            <h2 className="text-2xl font-display text-text-primary mb-4">
              $187 billion in regulated markets are closed to you today.
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed max-w-2xl mb-4">
              Pharma, healthcare, legal, defense — these enterprise clients require every AI response
              to cite sources verified by an independent third party.
              Without that: no contract. With KAKAPO: the contract is signed.
            </p>
            <p className="text-sm font-mono text-text-muted">
              10 enterprise clients × $300K/year ={" "}
              <strong className="text-text-primary">$3M ARR unreachable without KAKAPO</strong>
            </p>
          </div>

          <div className="py-10">
            <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">
              Specialized Medical AI & Drug Discovery — Aidoc · BenevolentAI · Insilico
            </p>
            <h2 className="text-2xl font-display text-text-primary mb-4">
              These systems use scientific literature without independent certification.
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed max-w-2xl mb-4">
              Aidoc processes 60 million patient cases per year across 1,600 medical centers.
              BenevolentAI builds its drug discovery engine on scientific publications.
              Neither has an independent third-party certification layer.
              EU AI Act 2026 changes that. KAKAPO is the infrastructure they don't have yet.
            </p>
            <p className="text-sm font-mono text-text-muted">
              Sources:{" "}
              <span className="text-text-secondary">Aidoc official press release Jan. 2026 · DrugPatentWatch 2026</span>
            </p>
          </div>

          <div className="py-10">
            <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">
              Pharma · Legal · Finance — Worldwide
            </p>
            <h2 className="text-2xl font-display text-text-primary mb-4">
              Every source timestamped. Non-alterable. Admissible in any jurisdiction.
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed max-w-2xl mb-4">
              FDA NDA filing fee 2025: $4.3M USD.
              500 sources verified by KAKAPO: $200.
              Each source is cryptographically sealed, timestamped and verifiable
              by any independent auditor — FDA, EMA, court, or regulator — anywhere in the world.
            </p>
            <p className="text-sm font-mono text-text-muted">
              Source:{" "}
              <span className="text-text-secondary">FDA official fee schedule 2025</span>
            </p>
          </div>

        </div>
      </section>

      <section className="py-16 border-b border-border">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div>
            <h2 className="text-xl font-display text-text-primary mb-2">
              Claude alone vs Claude + KAKAPO.
            </h2>
            <p className="text-sm text-text-secondary max-w-lg">
              Ask a scientific question. The difference is immediate.
              Unverified answer versus certified, traceable, admissible response.
            </p>
          </div>
          <Link href="/demo"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-mono px-6 py-3 rounded transition-colors no-underline flex-shrink-0">
            Live demo →
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div>
            <h2 className="text-xl font-display text-text-primary mb-2">
              Integrate KAKAPO in one day.
            </h2>
            <p className="text-sm text-text-secondary max-w-lg">
              One endpoint. One API key. Your AI responses become certified.
            </p>
          </div>
          <a href="mailto:partnerships@kakapo.io"
            className="inline-flex items-center gap-2 border border-border hover:border-accent/50 text-text-secondary hover:text-text-primary text-sm font-mono px-6 py-3 rounded transition-colors no-underline flex-shrink-0">
            Contact us →
          </a>
        </div>
      </section>

    </div>
  );
}
