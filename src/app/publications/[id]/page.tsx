import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPublication, getKPTsForPublication, getTrustScore } from "@/lib/api";
import { MOCK_PUBLICATIONS, MOCK_TRUST_SCORES, MOCK_KPTS } from "@/lib/mock-data";
import { PublicationMeta } from "@/components/publication/PublicationMeta";
import { KPTPanel } from "@/components/kpt/KPTPanel";
import { TrustScorePanel } from "@/components/trust/TrustScorePanel";
import { Badge } from "@/components/ui/Badge";
import type { Publication, KPT, TrustScore } from "@/types/api";
import { getSourceLabel, formatDate } from "@/lib/utils";
import { ReviewPanel } from "@/components/review/ReviewPanel";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function fetchDetail(id: string): Promise<{
  pub: Publication;
  kpts: KPT[];
  score: TrustScore | null;
} | null> {
  try {
    const [pub, kpts, score] = await Promise.all([
      getPublication(id),
      getKPTsForPublication(id),
      getTrustScore(id).catch(() => null),
    ]);
    return { pub, kpts, score };
  } catch {
    const pub = MOCK_PUBLICATIONS.find((p) => p.id === id);
    if (!pub) return null;
    const kpts  = MOCK_KPTS.filter((k) => k.publication_id === id);
    const score = MOCK_TRUST_SCORES.find((s) => s.publication_id === id) ?? null;
    return { pub, kpts, score };
  }
}

export async function generateMetadata({ params }: PageProps): 
Promise<Metadata> {
  const { id } = await params;
  const pub = await getPublication(id).catch(
    () => MOCK_PUBLICATIONS.find((p) => p.id === id)
  );
  return {
    title: pub?.title ?? "Publication",
    description: pub?.abstract?.slice(0, 160) ?? undefined,
  };
}

export default async function PublicationDetailPage({ params }: PageProps) {
  const data = await fetchDetail((await params).id);
  if (!data) notFound();

  const { pub, kpts, score } = data;
  const activeKpt = kpts.find((k) => k.status === "active") ?? kpts[0];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-text-muted mb-6">
        <Link href="/" className="hover:text-text-secondary">Accueil</Link>
        <span>/</span>
        <Link href="/publications" className="hover:text-text-secondary">Publications</Link>
        <span>/</span>
        <span className="text-text-muted truncate max-w-xs">
          {pub.title.length > 40 ? pub.title.slice(0, 40) + "…" : pub.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-8">

        {/* ── Left column ─────────────────────────────────────────── */}
        <div className="space-y-8 min-w-0">

          {/* Title block */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent">{getSourceLabel(pub.source)}</Badge>
              {activeKpt && (
                <Badge
                  variant={
                    activeKpt.status === "active"     ? "success" :
                    activeKpt.status === "challenged" ? "warning" :
                    activeKpt.status === "revoked"    ? "danger"  : "neutral"
                  }
                  dot
                >
                  KPT {activeKpt.status}
                </Badge>
              )}
              <span className="text-xs font-mono text-text-muted ml-auto">
                {formatDate(pub.submitted_at ?? pub.created_at)}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-display text-text-primary leading-tight text-balance">
              {pub.title}
            </h1>

            {pub.abstract && (
              <p className="text-sm text-text-secondary leading-relaxed border-l-2 border-accent/30 pl-4">
                {pub.abstract}
              </p>
            )}
          </div>

          {/* Metadata */}
          <section>
            <SectionHeading>Métadonnées</SectionHeading>
            <div className="bg-surface-2 border border-border rounded-md p-5">
              <PublicationMeta publication={pub} />
            </div>
          </section>

          {/* KPT */}
          <section>
            <SectionHeading>Proof of Knowledge Token</SectionHeading>
            <KPTPanel kpts={kpts} />
          </section>

          {/* Relations link */}
          <section>
            <SectionHeading>Relations</SectionHeading>
            <div className="bg-surface-2 border border-border rounded-md p-5 flex items-center justify-between gap-4">
              <p className="text-xs text-text-muted">
                Visualisez les publications liées dans le graphe de connaissances.
              </p>
              <Link
                href="/graph"
                className="flex-shrink-0 text-xs font-mono border border-accent/30 rounded px-3 py-1.5 text-accent hover:bg-accent/10 transition-colors no-underline"
              >
                Voir le graphe →
              </Link>
            </div>
          </section>
        </div>

        {/* ── Right column ────────────────────────────────────────── */}
        <aside className="space-y-6">

          {/* Trust Score — TrustScorePanel already renders its own Card; no wrapper needed */}
          {score ? (
            <div>
              <p className="field-label px-1 mb-2">Score de fiabilité</p>
              <TrustScorePanel score={score} />
        <ReviewPanel publicationId={pub.id} />
            </div>
          ) : (
            <div className="bg-surface-2 border border-border rounded-md p-5">
              <p className="text-xs font-mono text-text-muted text-center py-4">
                Score de fiabilité non disponible.
              </p>
            </div>
          )}

          {/* Quick verify */}
          {activeKpt && (
            <div className="bg-surface-2 border border-border rounded-md p-5 space-y-3">
              <p className="field-label">Vérification rapide</p>
              <code className="text-xs font-mono text-accent block break-all">
                {activeKpt.kpt_id}
              </code>
              <Link
                href={`/verify?kpt_id=${activeKpt.kpt_id}`}
                className="block text-center text-xs font-mono border border-accent/30 rounded px-3 py-2 text-accent hover:bg-accent/10 transition-colors no-underline"
              >
                Vérifier ce KPT →
              </Link>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-mono uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
      <span className="w-4 h-px bg-border" />
      {children}
    </h2>
  );
}
