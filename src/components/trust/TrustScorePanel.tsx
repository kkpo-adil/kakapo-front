import type { TrustScore } from "@/types/api";
import { Card, CardSection, CardDivider } from "@/components/ui/Card";
import { ScoreDial } from "@/components/ui/ScoreDial";
import { ScoreBar } from "@/components/ui/ScoreBar";
import { formatDate } from "@/lib/utils";

interface TrustScorePanelProps {
  score: TrustScore;
}

const COMPONENTS: {
  key: keyof TrustScore;
  label: string;
  weight: string;
  description: string;
}[] = [
  {
    key: "source_score",
    label: "Source",
    weight: "20%",
    description: "Réputation de la source de dépôt (HAL, arXiv, direct…)",
  },
  {
    key: "completeness_score",
    label: "Complétude",
    weight: "30%",
    description: "Présence des champs requis : titre, résumé, DOI, auteurs, institution",
  },
  {
    key: "freshness_score",
    label: "Fraîcheur",
    weight: "20%",
    description: "Ancienneté de la publication (décroissance sur 5 ans)",
  },
  {
    key: "citation_score",
    label: "Citabilité",
    weight: "15%",
    description: "Présence d'un DOI (proxy V1 ; graphe de citations en V2)",
  },
  {
    key: "dataset_score",
    label: "Dataset",
    weight: "15%",
    description: "Jeu de données associé déclaré et hashé",
  },
];

export function TrustScorePanel({ score }: TrustScorePanelProps) {
  return (
    <Card padding="md">
      {/* Global score */}
      <div className="flex items-center gap-6 mb-5">
        <ScoreDial score={score.score} size={88} />
        <div className="flex-1 space-y-1.5">
          <p className="text-xs text-text-muted">
            Score calculé automatiquement selon les métadonnées vérifiables de la publication.
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-2xs font-mono text-text-muted">
              Version moteur : {score.scoring_version}
            </span>
            <span className="text-2xs font-mono text-text-muted">
              Calculé le {formatDate(score.scored_at)}
            </span>
          </div>
        </div>
      </div>

      <CardDivider />

      {/* Components breakdown */}
      <div className="space-y-4 mt-4">
        {COMPONENTS.map(({ key, label, weight, description }) => {
          const value = score[key] as number;
          return (
            <div key={key}>
              <div className="flex items-baseline justify-between mb-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-text-secondary">{label}</span>
                  <span className="text-2xs font-mono text-text-muted">({weight})</span>
                </div>
              </div>
              <ScoreBar score={value} height="sm" />
              <p className="text-2xs text-text-muted mt-1">{description}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
