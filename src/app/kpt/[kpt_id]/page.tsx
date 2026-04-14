import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getKPT, getPublication } from "@/lib/api";
import { MOCK_KPTS, MOCK_PUBLICATIONS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/Badge";
import { Card, CardSection, CardDivider } from "@/components/ui/Card";
import type { KPT, Publication } from "@/types/api";
import {
  formatDate,
  getKPTStatusLabel,
  getSourceLabel,
} from "@/lib/utils";

interface PageProps {
  params: { kpt_id: string };
}

const STATUS_VARIANT: Record<string, "success" | "warning" | "danger" | "neutral"> = {
  active:     "success",
  challenged: "warning",
  revoked:    "danger",
  superseded: "neutral",
};

async function fetchKPTData(kptId: string): Promise<{
  kpt: KPT;
  publication: Publication | null;
} | null> {
  try {
    const kpt = await getKPT(kptId);
    const publication = await getPublication(kpt.publication_id).catch(() => null);
    return { kpt, publication };
  } catch {
    const kpt = MOCK_KPTS.find((k) => k.kpt_id === kptId);
    if (!kpt) return null;
    const publication = MOCK_PUBLICATIONS.find((p) => p.id === kpt.publication_id) ?? null;
    return { kpt, publication };
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `KPT ${params.kpt_id}`,
    description: `Détail du Proof of Knowledge Token ${params.kpt_id}`,
  };
}

export default async function KPTDetailPage({ params }: PageProps) {
  const data = await fetchKPTData(params.kpt_id);
  if (!data) notFound();

  const { kpt, publication } = data;
  const tf = kpt.metadata_json?.trust_fields;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-text-muted mb-8 flex-wrap">
        <Link href="/" className="hover:text-text-secondary">Accueil</Link>
        <span>/</span>
        {publication && (
          <>
            <Link href="/publications" className="hover:text-text-secondary">Publications</Link>
            <span>/</span>
            <Link
              href={`/publications/${publication.id}`}
              className="hover:text-text-secondary truncate max-w-[200px]"
            >
              {publication.title.length > 40
                ? publication.title.slice(0, 40) + "…"
                : publication.title}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="font-mono text-text-muted">KPT</span>
      </nav>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
        <div>
          <p className="field-label mb-1">Proof of Knowledge Token</p>
          <h1 className="text-xl font-mono text-text-primary break-all">{kpt.kpt_id}</h1>
        </div>
        <Badge variant={STATUS_VARIANT[kpt.status] ?? "neutral"} size="md" dot>
          {getKPTStatusLabel(kpt.status)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">

        {/* ── Main ─────────────────────────────────────────────────── */}
        <div className="space-y-5">

          {/* Core fields */}
          <Card padding="md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <CardSection label="Version">
                <span className="text-sm font-mono text-text-primary">v{kpt.version}</span>
              </CardSection>
              <CardSection label="Statut">
                <span className="text-sm font-mono text-text-primary">
                  {getKPTStatusLabel(kpt.status)}
                </span>
              </CardSection>
              <CardSection label="Date d'émission">
                <span className="text-sm font-mono text-text-primary">
                  {formatDate(kpt.issued_at)}
                </span>
              </CardSection>
              {kpt.metadata_json?.source && (
                <CardSection label="Source">
                  <span className="text-sm font-mono text-text-primary">
                    {getSourceLabel(kpt.metadata_json.source)}
                  </span>
                </CardSection>
              )}
            </div>

            <CardSection label="Hash SHA-256 certifié">
              <span className="hash-display block text-2xs">{kpt.content_hash}</span>
            </CardSection>
          </Card>

          {/* Trust fields checklist */}
          {tf && (
            <Card padding="md">
              <p className="field-label mb-3">Champs certifiés</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
                {(
                  [
                    ["has_doi",         "DOI"],
                    ["has_abstract",    "Résumé"],
                    ["has_authors",     "Auteurs"],
                    ["has_institution", "Institution"],
                    ["has_dataset",     "Dataset"],
                  ] as const
                ).map(([key, label]) => (
                  <div key={key} className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        tf[key] ? "bg-trust-high" : "bg-surface-4"
                      }`}
                    />
                    <span
                      className={`text-xs font-mono ${
                        tf[key] ? "text-text-secondary" : "text-text-muted"
                      }`}
                    >
                      {label}
                    </span>
                    <span
                      className={`text-2xs font-mono ml-auto ${
                        tf[key] ? "text-trust-high" : "text-text-muted"
                      }`}
                    >
                      {tf[key] ? "✓" : "—"}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* ORCID */}
          {kpt.metadata_json?.orcid_authors &&
            kpt.metadata_json.orcid_authors.length > 0 && (
              <Card padding="md">
                <p className="field-label mb-3">Auteurs ORCID certifiés</p>
                <div className="flex flex-wrap gap-2">
                  {kpt.metadata_json.orcid_authors.map((orcid) => (
                    <a
                      key={orcid}
                      href={orcid}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-accent hover:text-accent-hover border border-accent/20 hover:border-accent/40 bg-accent/5 rounded px-2 py-1 transition-colors"
                    >
                      {orcid.replace("https://orcid.org/", "")}
                    </a>
                  ))}
                </div>
              </Card>
            )}

          {/* Dataset hashes */}
          {kpt.metadata_json?.dataset_hashes &&
            kpt.metadata_json.dataset_hashes.length > 0 && (
              <Card padding="md">
                <p className="field-label mb-3">Datasets associés</p>
                <div className="space-y-2">
                  {kpt.metadata_json.dataset_hashes.map((hash, i) => (
                    <div key={i}>
                      <p className="field-label mb-0.5">Dataset {i + 1}</p>
                      <span className="hash-display block text-2xs">{hash}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
        </div>

        {/* ── Sidebar ───────────────────────────────────────────────── */}
        <aside className="space-y-4">

          {/* Publication link */}
          {publication && (
            <Card padding="md">
              <p className="field-label mb-2">Publication certifiée</p>
              <Link
                href={`/publications/${publication.id}`}
                className="text-xs text-text-primary hover:text-accent leading-snug block mb-3"
              >
                {publication.title}
              </Link>
              {kpt.metadata_json?.doi && (
                <a
                  href={`https://doi.org/${kpt.metadata_json.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xs font-mono text-accent hover:text-accent-hover break-all"
                >
                  {kpt.metadata_json.doi}
                </a>
              )}
              <CardDivider />
              <Link
                href={`/publications/${publication.id}`}
                className="block text-center text-2xs font-mono border border-accent/30 rounded px-3 py-1.5 text-accent hover:bg-accent/10 transition-colors no-underline"
              >
                Voir la fiche complète →
              </Link>
            </Card>
          )}

          {/* Verify shortcut */}
          <Card padding="md">
            <p className="field-label mb-2">Vérification</p>
            <p className="text-2xs text-text-muted mb-3">
              Vérifiez l'intégrité de ce KPT via l'outil de vérification.
            </p>
            <Link
              href={`/verify?kpt_id=${kpt.kpt_id}`}
              className="block text-center text-2xs font-mono border border-border rounded px-3 py-1.5 text-text-secondary hover:text-accent hover:border-accent/40 transition-colors no-underline"
            >
              Vérifier ce KPT →
            </Link>
          </Card>

          {/* ROR */}
          {kpt.metadata_json?.ror_institution && (
            <Card padding="md">
              <p className="field-label mb-2">Institution (ROR)</p>
              <a
                href={kpt.metadata_json.ror_institution}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-accent hover:text-accent-hover break-all"
              >
                {kpt.metadata_json.ror_institution.replace("https://ror.org/", "")}
              </a>
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
}
