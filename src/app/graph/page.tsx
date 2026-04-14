import type { Metadata } from "next";
import Link from "next/link";
import { getPublications, getTrustScore } from "@/lib/api";
import { MOCK_PUBLICATIONS, MOCK_TRUST_SCORES } from "@/lib/mock-data";
import { RelationsPanel } from "@/components/graph/RelationsPanel";
import type { Publication, TrustScore } from "@/types/api";

export const metadata: Metadata = {
  title: "Relations",
  description: "Visualisation des relations entre publications scientifiques KAKAPO.",
};

async function fetchGraphData(): Promise<{
  publications: Publication[];
  scores: TrustScore[];
  fromMock: boolean;
}> {
  try {
    const list   = await getPublications({ limit: 50, skip: 0 });
    const pubs   = list.items;
    const scores = (
      await Promise.all(pubs.map((p) => getTrustScore(p.id).catch(() => null)))
    ).filter((s): s is TrustScore => s !== null);
    return { publications: pubs, scores, fromMock: false };
  } catch {
    return {
      publications: MOCK_PUBLICATIONS,
      scores: MOCK_TRUST_SCORES,
      fromMock: true,
    };
  }
}

export default async function GraphPage() {
  const { publications, scores, fromMock } = await fetchGraphData();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-text-muted mb-8">
        <Link href="/" className="hover:text-text-secondary">Accueil</Link>
        <span>/</span>
        <span>Relations</span>
      </nav>

      {/* Header */}
      <div className="flex items-baseline justify-between gap-4 mb-2">
        <h1 className="text-2xl font-display text-text-primary">Graphe de relations</h1>
        {fromMock && (
          <span className="text-2xs font-mono text-trust-mid border border-trust-mid/30 rounded px-2 py-0.5">
            Démo
          </span>
        )}
      </div>
      <p className="text-sm text-text-muted mb-8 max-w-2xl">
        Visualisation des publications indexées. Chaque nœud représente une publication,
        coloré selon son score de fiabilité. Cliquez sur un nœud pour en voir les détails.
        Le graphe de citations inter-publications sera disponible en V2.
      </p>

      {/* Stats row */}
      <div className="flex items-center gap-6 flex-wrap mb-6 pb-6 border-b border-border">
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-mono font-semibold text-text-primary tabular-nums">
            {publications.length}
          </span>
          <span className="text-xs text-text-muted">publications</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-mono font-semibold text-text-primary tabular-nums">
            {scores.length}
          </span>
          <span className="text-xs text-text-muted">scores disponibles</span>
        </div>
        {scores.length > 0 && (
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-mono font-semibold text-text-primary tabular-nums">
              {Math.round(
                (scores.reduce((a, s) => a + s.score, 0) / scores.length) * 100
              )}%
            </span>
            <span className="text-xs text-text-muted">score moyen</span>
          </div>
        )}
        <Link
          href="/publications"
          className="ml-auto text-xs font-mono text-accent hover:text-accent-hover no-underline"
        >
          Vue liste →
        </Link>
      </div>

      {/* Graph */}
      <RelationsPanel publications={publications} scores={scores} />

      {/* V2 notice */}
      <div className="mt-8 border border-border-subtle rounded-md bg-surface-2 p-4">
        <p className="text-2xs font-mono text-text-muted">
          <span className="text-accent">V2 →</span>{" "}
          Le graphe affichera les relations de citation entre publications, les clusters
          thématiques et la propagation du score de fiabilité dans le réseau.
        </p>
      </div>
    </div>
  );
}
