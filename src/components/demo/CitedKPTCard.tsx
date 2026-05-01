"use client";
import type { CitedKPT } from "@/types/demo";

interface CitedKPTCardProps {
  kpt: CitedKPT;
  index: number;
}

export function CitedKPTCard({ kpt, index }: CitedKPTCardProps) {
  const isCertified = kpt.kpt_status === "certified";
  const score = kpt.trust_score ?? kpt.indexation_score;

  return (
    <div className={`rounded-lg border p-4 transition-all ${isCertified ? "border-amber-300 bg-amber-50/50" : "border-border bg-surface-2"}`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xs font-mono text-text-muted border border-border rounded px-1.5 py-0.5">[{index}]</span>
          <span className={`text-2xs font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
            isCertified ? "bg-amber-500 text-white" : "bg-surface-3 text-text-muted border border-border"
          }`}>
            {isCertified ? "★ KPT Certifié" : "i-KPT"}
          </span>
        </div>
        {score !== null && score !== undefined && (
          <span className="text-xs font-mono text-accent font-semibold">{score}/100</span>
        )}
      </div>

      <p className="text-sm font-display text-text-primary leading-snug mb-2">{kpt.title}</p>

      <div className="space-y-1 mb-3">
        {kpt.publisher && <p className="text-2xs text-text-muted">{kpt.publisher} · {kpt.publication_date}</p>}
        {kpt.doi && <p className="text-2xs font-mono text-text-muted">DOI: {kpt.doi}</p>}
      </div>

      <div className="bg-surface-3 rounded p-2 space-y-1 mb-3">
        <p className="text-2xs font-mono text-text-muted">KPT: <span className="text-accent">{kpt.kpt_id}</span></p>
        <p className="text-2xs font-mono text-text-muted group relative cursor-help">
          Hash: <span className="text-text-secondary">{kpt.hash_kpt.slice(0, 16)}…</span>
          <span className="absolute left-0 bottom-full mb-1 bg-text-primary text-white text-2xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
            {kpt.hash_kpt}
          </span>
        </p>
      </div>

      <div className="flex gap-2">
        <a href={kpt.url_kakapo} target="_blank" rel="noopener noreferrer"
          className="text-2xs font-mono text-accent hover:text-accent-hover no-underline border border-accent/30 rounded px-2 py-1 transition-colors">
          Voir dans KAKAPO →
        </a>
        {kpt.doi && (
          <a href={`https://doi.org/${kpt.doi}`} target="_blank" rel="noopener noreferrer"
            className="text-2xs font-mono text-text-muted hover:text-text-primary no-underline border border-border rounded px-2 py-1 transition-colors">
            Source DOI →
          </a>
        )}
      </div>
    </div>
  );
}
