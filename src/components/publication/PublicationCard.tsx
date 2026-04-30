import Link from "next/link";
import { KPTStatusBadge } from "./KPTStatusBadge";
import type { Publication, TrustScore, KPT } from "@/types/api";

interface PublicationCardProps {
  publication: Publication;
  trustScore?: TrustScore | null;
  kpt?: KPT | null;
}

function ScoreColor(score: number) {
  if (score >= 0.70) return "text-trust-high";
  if (score >= 0.50) return "text-trust-mid";
  return "text-trust-low";
}

export function PublicationCard({ publication, trustScore, kpt }: PublicationCardProps) {
  const isCertified = publication.kpt_status === "certified";
  const score = trustScore?.score ?? null;

  return (
    <Link href={`/publications/${publication.id}`}
      className={`block no-underline rounded-lg border transition-all hover:shadow-sm group ${
        isCertified
          ? "bg-surface-2 border-accent/30 hover:border-accent/60"
          : "bg-surface-2 border-border hover:border-border-strong"
      }`}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-2xs font-mono text-text-muted bg-surface-3 border border-border rounded px-2 py-0.5 uppercase tracking-widest">
              {publication.source || "—"}
            </span>
            <KPTStatusBadge status={publication.kpt_status ?? "indexed"} size="sm" />
          </div>
          {score !== null && (
            <span className={`text-xs font-mono font-semibold flex-shrink-0 ${ScoreColor(score)}`}>
              {Math.round(score * 100)}%
            </span>
          )}
        </div>

        <h3 className="text-sm font-display text-text-primary leading-snug mb-2 line-clamp-2 group-hover:text-accent transition-colors">
          {publication.title}
        </h3>

        {publication.abstract && (
          <p className="text-xs text-text-muted leading-relaxed line-clamp-2 mb-3">
            {publication.abstract}
          </p>
        )}

        <div className="flex items-end justify-between pt-3 border-t border-border">
          <div>
            {publication.authors_raw && (
              <p className="text-2xs text-text-muted truncate max-w-[180px]">
                {typeof publication.authors_raw === "string"
                  ? publication.authors_raw.slice(0, 60)
                  : ""}
              </p>
            )}
            {publication.doi && (
              <p className="text-2xs font-mono text-text-muted/60 mt-0.5 truncate max-w-[180px]">
                {publication.doi}
              </p>
            )}
          </div>
          {publication.source_origin === "hal" && (
            <span className="text-2xs font-mono text-text-muted flex-shrink-0">
              HAL Open Science
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
