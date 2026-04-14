import Link from "next/link";
import type { KPT } from "@/types/api";
import { Card, CardSection, CardDivider } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatDate, getKPTStatusLabel, cn } from "@/lib/utils";

const STATUS_VARIANT: Record<string, "success" | "warning" | "danger" | "neutral"> = {
  active:     "success",
  challenged: "warning",
  revoked:    "danger",
  superseded: "neutral",
};

interface KPTPanelProps {
  kpts: KPT[];
}

export function KPTPanel({ kpts }: KPTPanelProps) {
  if (kpts.length === 0) {
    return (
      <Card padding="md">
        <p className="text-xs text-text-muted font-mono text-center py-4">
          Aucun KPT émis pour cette publication.
        </p>
      </Card>
    );
  }

  const active = kpts.find((k) => k.status === "active") ?? kpts[0];

  return (
    <div className="space-y-3">
      <KPTEntry kpt={active} primary />
      {kpts.length > 1 && (
        <div className="space-y-2">
          <p className="field-label px-1">Versions précédentes</p>
          {kpts
            .filter((k) => k.id !== active.id)
            .map((kpt) => (
              <KPTEntry key={kpt.id} kpt={kpt} primary={false} />
            ))}
        </div>
      )}
    </div>
  );
}

function KPTEntry({ kpt, primary }: { kpt: KPT; primary: boolean }) {
  const tf = kpt.metadata_json?.trust_fields;

  return (
    <Card padding="md" className={primary ? "border-border-strong" : "opacity-70"}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <p className="field-label">Identifiant KPT</p>
          <Link href={`/kpt/${kpt.kpt_id}`}>
            <code className="text-xs font-mono text-accent hover:text-accent-hover break-all">
              {kpt.kpt_id}
            </code>
          </Link>
        </div>
        <Badge variant={STATUS_VARIANT[kpt.status] ?? "neutral"} dot>
          {getKPTStatusLabel(kpt.status)}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <CardSection label="Version">
          <span className="text-sm font-mono text-text-primary">v{kpt.version}</span>
        </CardSection>
        <CardSection label="Émis le">
          <span className="text-sm font-mono text-text-primary">
            {formatDate(kpt.issued_at)}
          </span>
        </CardSection>
      </div>

      <CardSection label="Hash du contenu">
        <span className="hash-display block">{kpt.content_hash}</span>
      </CardSection>

      {tf && (
        <>
          <CardDivider />
          <CardSection label="Champs certifiés">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5 mt-1">
              {(
                [
                  ["has_doi",         "DOI"],
                  ["has_abstract",    "Résumé"],
                  ["has_authors",     "Auteurs"],
                  ["has_institution", "Institution"],
                  ["has_dataset",     "Dataset"],
                ] as const
              ).map(([key, label]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full flex-shrink-0",
                      tf[key] ? "bg-trust-high" : "bg-surface-4"
                    )}
                  />
                  <span
                    className={cn(
                      "text-2xs font-mono",
                      tf[key] ? "text-text-secondary" : "text-text-muted"
                    )}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </CardSection>
        </>
      )}

      {kpt.metadata_json?.orcid_authors &&
        kpt.metadata_json.orcid_authors.length > 0 && (
          <>
            <CardDivider />
            <CardSection label="ORCID">
              <div className="flex flex-wrap gap-1">
                {kpt.metadata_json.orcid_authors.map((orcid) => (
                  <a
                    key={orcid}
                    href={orcid}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xs font-mono text-accent hover:text-accent-hover border border-accent/20 rounded px-1.5 py-0.5"
                  >
                    {orcid.replace("https://orcid.org/", "")}
                  </a>
                ))}
              </div>
            </CardSection>
          </>
        )}
    </Card>
  );
}
