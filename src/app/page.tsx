import Link from "next/link";
import { getPublications, getTrustScore, getKPTsForPublication } from "@/lib/api";
import { MOCK_PUBLICATIONS, MOCK_TRUST_SCORES, MOCK_KPTS } from "@/lib/mock-data";
import { PublicationCard } from "@/components/publication/PublicationCard";
import type { Publication, TrustScore, KPT } from "@/types/api";


async function getHomeData(): Promise<{
  recent: Publication[];
  scores: Map<string, TrustScore>;
  kpts: Map<string, KPT>;
  fromMock: boolean;
}> {
  try {
    const list = await getPublications({ limit: 6, skip: 0 });
    const pubs = list.items;

    const [scoresArr, kptsArr] = await Promise.all([
      Promise.all(
        pubs.map((p) => getTrustScore(p.id).catch(() => null))
      ),
      Promise.all(
        pubs.map((p) => getKPTsForPublication(p.id).catch(() => []))
      ),
    ]);

    const scores = new Map<string, TrustScore>();
    const kpts   = new Map<string, KPT>();

    pubs.forEach((p, i) => {
      const s = scoresArr[i];
      if (s) scores.set(p.id, s);
      const k = kptsArr[i];
      const active = k.find((x) => x.status === "active") ?? k[0];
      if (active) kpts.set(p.id, active);
    });

    return { recent: pubs, scores, kpts, fromMock: false };
  } catch {
    // API not available — use mock data
    const scores = new Map<string, TrustScore>(
      MOCK_TRUST_SCORES.map((s) => [s.publication_id, s])
    );
    const kpts = new Map<string, KPT>(
      MOCK_KPTS.map((k) => [k.publication_id, k])
    );
    return { recent: MOCK_PUBLICATIONS, scores, kpts, fromMock: true };
  }
}

export default async function HomePage() {
  const { recent, scores, kpts, fromMock } = await getHomeData();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 sm:py-28">
          <div className="max-w-2xl">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 rounded px-3 py-1 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-2xs font-mono text-accent uppercase tracking-widest">
                Scientific Trust Infrastructure
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display text-text-primary leading-tight mb-4 text-balance">
              La fiabilité scientifique,<br />
              <span className="text-accent">certifiée et scorée.</span>
            </h1>
            <p className="text-sm text-text-secondary leading-relaxed mb-8 max-w-xl">
              KAKAPO certifie l'antériorité, l'intégrité et la traçabilité des
              publications scientifiques via des Proof of Knowledge Tokens. Chaque
              publication reçoit un score de fiabilité calculé sur ses métadonnées
              vérifiables.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/publications"
                className="no-underline inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm px-5 py-2.5 rounded transition-colors"
              >
                Explorer les publications
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/verify"
                className="no-underline inline-flex items-center gap-2 bg-surface-3 hover:bg-surface-4 text-text-secondary hover:text-text-primary text-sm px-5 py-2.5 rounded border border-border hover:border-border-strong transition-all"
              >
                Vérifier un KPT
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative score dials — pure CSS */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex gap-4 opacity-20 pointer-events-none">
          {[0.92, 0.67, 0.41].map((s, i) => (
            <div
              key={i}
              className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: s > 0.7 ? "#22c55e" : s > 0.4 ? "#f59e0b" : "#ef4444" }}
            >
              <span
                className="text-xs font-mono"
                style={{ color: s > 0.7 ? "#22c55e" : s > 0.4 ? "#f59e0b" : "#ef4444" }}
              >
                {Math.round(s * 100)}%
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-border bg-surface-2">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-8 items-center">
          {[
            { label: "Publications indexées",  value: recent.length.toString() },
            { label: "KPTs actifs",             value: [...kpts.values()].filter((k) => k.status === "active").length.toString() },
            { label: "Score moyen",             value: scores.size > 0
              ? Math.round([...scores.values()].reduce((a, s) => a + s.score, 0) / scores.size * 100) + "%"
              : "—"
            },
            { label: "Version moteur",          value: "1.0" },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-baseline gap-2">
              <span className="text-lg font-mono font-semibold text-text-primary tabular-nums">
                {value}
              </span>
              <span className="text-xs text-text-muted">{label}</span>
            </div>
          ))}
          {fromMock && (
            <span className="ml-auto text-2xs font-mono text-trust-mid border border-trust-mid/30 rounded px-2 py-0.5">
              Données de démonstration
            </span>
          )}
        </div>
      </section>

      {/* Recent publications */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-lg font-display text-text-primary">
            Publications récentes
          </h2>
          <Link
            href="/publications"
            className="text-xs font-mono text-accent hover:text-accent-hover"
          >
            Tout voir →
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="text-center py-16 text-text-muted text-sm">
            Aucune publication disponible.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {recent.map((pub) => (
              <PublicationCard
                key={pub.id}
                publication={pub}
                trustScore={scores.get(pub.id)}
                kpt={kpts.get(pub.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* How it works */}
      <section className="border-t border-border bg-surface-2">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-lg font-display text-text-primary mb-8">
            Comment ça fonctionne
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border">
            {[
              {
                step: "01",
                title: "Dépôt & certification",
                desc:  "Un PDF est soumis. Son hash SHA-256 est calculé, un KPT est émis pour certifier son antériorité et son intégrité.",
              },
              {
                step: "02",
                title: "Scoring de fiabilité",
                desc:  "Le Trust Engine V1 analyse source, complétude, fraîcheur, citabilité et dataset pour produire un score 0–100%.",
              },
              {
                step: "03",
                title: "Vérification publique",
                desc:  "Tout KPT est vérifiable publiquement par son identifiant. Le statut (actif, contesté, révoqué) est toujours visible.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-surface-2 p-6">
                <span className="text-2xs font-mono text-accent/60 mb-3 block">{step}</span>
                <h3 className="text-sm font-display text-text-primary mb-2">{title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
