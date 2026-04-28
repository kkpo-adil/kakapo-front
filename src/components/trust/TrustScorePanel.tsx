"use client";

import type { TrustScore } from "@/types/api";

interface TrustScorePanelProps {
  score: TrustScore | null;
}

const COMPONENTS = [
  { key: "source_score", label: "Source", weight: "35%", desc: "Crédibilité de la source" },
  { key: "completeness_score", label: "Données", weight: "25%", desc: "Intégrité des données" },
  { key: "citation_score", label: "Citations", weight: "20%", desc: "Réseau de citations" },
  { key: "freshness_score", label: "Fraîcheur", weight: "20%", desc: "Pertinence temporelle" },
];

function interpret(score: number): { label: string; color: string } {
  if (score >= 0.90) return { label: "Validé", color: "text-trust-high" };
  if (score >= 0.70) return { label: "Solide", color: "text-trust-high" };
  if (score >= 0.50) return { label: "Incertain", color: "text-trust-mid" };
  return { label: "Faible", color: "text-trust-low" };
}

function ScoreArc({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  const r = 40;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ * 0.75;
  const gap = circ - dash;
  const { label, color } = interpret(score);
  return (
    <div className="flex items-center gap-6">
      <div className="relative w-24 h-24 flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-[135deg]">
          <circle cx="50" cy="50" r={r} fill="none" stroke="currentColor" strokeWidth="8"
            className="text-surface-3" strokeDasharray={`${circ * 0.75} ${circ * 0.25}`} strokeLinecap="round" />
          <circle cx="50" cy="50" r={r} fill="none" strokeWidth="8"
            stroke={score >= 0.7 ? "#22c55e" : score >= 0.5 ? "#f59e0b" : "#ef4444"}
            strokeDasharray={`${dash} ${gap + circ * 0.25}`} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-mono font-bold text-text-primary">{pct}%</span>
          <span className={`text-2xs font-mono uppercase tracking-widest ${color}`}>{label}</span>
        </div>
      </div>
      <div>
        <p className="text-xs text-text-secondary leading-relaxed mb-1">
          Score calculé sur des signaux vérifiables — pas une opinion.
        </p>
        <p className="text-2xs font-mono text-text-muted">Version moteur : 2.0</p>
      </div>
    </div>
  );
}

export function TrustScorePanel({ score }: TrustScorePanelProps) {
  if (!score) return null;

  return (
    <div className="border border-border rounded p-6 space-y-6">
      <div>
        <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-4">Score de fiabilité</p>
        <ScoreArc score={score.score} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {COMPONENTS.map(({ key, label, weight, desc }) => {
          const val = score[key as keyof TrustScore] as number ?? 0;
          return (
            <div key={key} className="bg-surface-2 rounded p-3">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-2xs font-mono text-text-muted uppercase tracking-widest">{label}</span>
                <span className="text-2xs font-mono text-text-muted">{weight}</span>
              </div>
              <p className="text-lg font-mono font-semibold text-text-primary mb-1">{Math.round(val * 100)}%</p>
              <div className="h-1 bg-surface-3 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all"
                  style={{
                    width: `${val * 100}%`,
                    backgroundColor: val >= 0.7 ? "#22c55e" : val >= 0.5 ? "#f59e0b" : "#ef4444"
                  }} />
              </div>
              <p className="text-2xs text-text-muted mt-1">{desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
