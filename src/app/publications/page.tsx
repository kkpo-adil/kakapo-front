import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { getPublications, getTrustScore, getKPTsForPublication } from "@/lib/api";
import { MOCK_PUBLICATIONS, MOCK_TRUST_SCORES, MOCK_KPTS } from "@/lib/mock-data";
import { PublicationCard } from "@/components/publication/PublicationCard";
import { PublicationFilters } from "@/components/publication/PublicationFilters";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Publication, TrustScore, KPT, PublicationSource } from "@/types/api";


export const metadata: Metadata = {
  title: "Publications",
  description: "Liste des publications scientifiques certifiées par KAKAPO.",
};

const PAGE_SIZE = 12;

interface PageProps {
  searchParams: { page?: string; source?: string };
}

async function fetchPublicationsPage(searchParams: PageProps["searchParams"]): Promise<{
  pubs: Publication[];
  total: number;
  scores: Map<string, TrustScore>;
  kpts: Map<string, KPT>;
  fromMock: boolean;
}> {
  const page   = Math.max(1, parseInt(searchParams.page ?? "1"));
  const skip   = (page - 1) * PAGE_SIZE;
  const source = searchParams.source as PublicationSource | undefined;

  try {
    const list = await getPublications({ skip, limit: PAGE_SIZE, source });
    const pubs = list.items;

    const [scoresArr, kptsArr] = await Promise.all([
      Promise.all(pubs.map((p) => getTrustScore(p.id).catch(() => null))),
      Promise.all(pubs.map((p) => getKPTsForPublication(p.id).catch(() => []))),
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

    return { pubs, total: list.total, scores, kpts, fromMock: false };
  } catch {
    const filtered = source
      ? MOCK_PUBLICATIONS.filter((p) => p.source === source)
      : MOCK_PUBLICATIONS;

    const scores = new Map<string, TrustScore>(
      MOCK_TRUST_SCORES.map((s) => [s.publication_id, s])
    );
    const kpts = new Map<string, KPT>(
      MOCK_KPTS.map((k) => [k.publication_id, k])
    );
    return { pubs: filtered, total: filtered.length, scores, kpts, fromMock: true };
  }
}

export default async function PublicationsPage({ searchParams }: PageProps) {
  const page  = Math.max(1, parseInt(searchParams.page ?? "1"));
  const { pubs, total, scores, kpts, fromMock } = await fetchPublicationsPage(searchParams);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between gap-4 mb-2">
          <h1 className="text-2xl font-display text-text-primary">Publications</h1>
          {fromMock && (
            <span className="text-2xs font-mono text-trust-mid border border-trust-mid/30 rounded px-2 py-0.5">
              Démo
            </span>
          )}
        </div>
        <p className="text-sm text-text-muted">
          Publications scientifiques certifiées et scorées par KAKAPO.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <Suspense fallback={null}>
          <PublicationFilters total={total} />
        </Suspense>
      </div>

      {/* Grid */}
      {pubs.length === 0 ? (
        <EmptyState
          title="Aucune publication trouvée"
          description="Essayez de modifier les filtres ou revenez plus tard."
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
            {pubs.map((pub) => (
              <PublicationCard
                key={pub.id}
                publication={pub}
                trustScore={scores.get(pub.id)}
                kpt={kpts.get(pub.id)}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} searchParams={searchParams} />
          )}
        </>
      )}
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  searchParams,
}: {
  page: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
}) {
  function buildHref(p: number) {
    const params = new URLSearchParams();
    if (searchParams.source) params.set("source", searchParams.source);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return `/publications${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="flex items-center justify-center gap-1">
      <PaginationLink href={buildHref(page - 1)} disabled={page === 1} label="←" />
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <PaginationLink
          key={p}
          href={buildHref(p)}
          label={String(p)}
          active={p === page}
        />
      ))}
      <PaginationLink href={buildHref(page + 1)} disabled={page === totalPages} label="→" />
    </div>
  );
}

function PaginationLink({
  href,
  label,
  active = false,
  disabled = false,
}: {
  href: string;
  label: string;
  active?: boolean;
  disabled?: boolean;
}) {
  const cls = [
    "inline-flex items-center justify-center w-8 h-8 text-xs font-mono rounded border transition-all",
    active
      ? "bg-accent/15 text-accent border-accent/40"
      : disabled
        ? "text-text-muted border-border opacity-40 pointer-events-none"
        : "text-text-secondary border-border hover:border-border-strong hover:text-text-primary bg-surface-3",
  ].join(" ");

  if (disabled) return <span className={cls}>{label}</span>;
  return <Link href={href} className={cls + " no-underline"}>{label}</Link>;
}
