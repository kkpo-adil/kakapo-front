import Link from "next/link";
import type { Publication, TrustScore, KPT } from "@/types/api";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ScoreBar } from "@/components/ui/ScoreBar";
import {
  formatAuthors,
  formatDateShort,
  getSourceLabel,
  getKPTStatusLabel,
  getKPTStatusClass,
  getTrustBgClass,
  formatScore,
  cn,
} from "@/lib/utils";

interface PublicationCardProps {
  publication: Publication;
  trustScore?: TrustScore;
  kpt?: KPT;
}

export function PublicationCard({ publication, trustScore, kpt }: PublicationCardProps) {
  const statusClass = kpt ? getKPTStatusClass(kpt.status) : "";

  return (
    <Link href={`/publications/${publication.id}`} className="block no-underline group">
      <Card hover padding="md" as="article" className="h-full flex flex-col gap-4">

        {/* Top row: source + date + KPT status */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Badge variant="accent" size="sm">
              {getSourceLabel(publication.source)}
            </Badge>
            {publication.doi && (
              <span className="text-2xs font-mono text-text-muted hidden sm:block truncate max-w-[180px]">
                {publication.doi}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {kpt && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 border rounded px-1.5 py-0.5 text-2xs font-mono uppercase tracking-wide",
                  statusClass
                )}
              >
                <span className="w-1 h-1 rounded-full bg-current" />
                {getKPTStatusLabel(kpt.status)}
              </span>
            )}
            <span className="text-2xs font-mono text-text-muted">
              {formatDateShort(publication.submitted_at ?? publication.created_at)}
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-sm font-display text-text-primary leading-snug group-hover:text-accent transition-colors line-clamp-2">
          {publication.title}
        </h2>

        {/* Abstract */}
        {publication.abstract && (
          <p className="text-xs text-text-muted leading-relaxed line-clamp-2 flex-1">
            {publication.abstract}
          </p>
        )}

        {/* Bottom row: authors + score */}
        <div className="flex items-end justify-between gap-4 pt-1 border-t border-border-subtle">
          <div className="min-w-0">
            <p className="field-label">Auteurs</p>
            <p className="text-xs text-text-secondary truncate">
              {formatAuthors(publication.authors_raw)}
            </p>
          </div>

          {trustScore && (
            <div className="flex-shrink-0 w-28">
              <p className="field-label text-right">Fiabilité</p>
              <div className="flex items-center gap-2 justify-end">
                <span
                  className={cn(
                    "text-xs font-mono font-medium tabular-nums px-1.5 py-0.5 rounded border",
                    getTrustBgClass(trustScore.score)
                  )}
                >
                  {formatScore(trustScore.score)}
                </span>
              </div>
              <ScoreBar score={trustScore.score} showValue={false} height="xs" className="mt-1.5" />
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
