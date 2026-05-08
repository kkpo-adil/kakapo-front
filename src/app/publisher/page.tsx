"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface PublicationBreakdown {
  id: string;
  title: string;
  doi: string | null;
  kpt_id: string | null;
  trust_score: number | null;
  vo_generated: number;
  earnings_usd: number;
  by_segment: {
    llm: number;
    pharma: number;
    legal: number;
    other: number;
  };
}

interface PublisherStats {
  publisher: string;
  revenue_share_pct: number;
  total_publications: number;
  total_vo: number;
  total_earnings_usd: number;
  breakdown: PublicationBreakdown[];
}

const API = process.env.NEXT_PUBLIC_API_URL ?? "";

const MOCK_STATS: PublisherStats = {
  publisher: "Éditeur Partenaire",
  revenue_share_pct: 60,
  total_publications: 16,
  total_vo: 5,
  total_earnings_usd: 1.20,
  breakdown: [],
};

export default function PublisherDashboard() {
  const [stats] = useState<PublisherStats>(MOCK_STATS);
  const [activeTab, setActiveTab] = useState<"overview" | "publications" | "segments">("overview");

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-1">Espace éditeur</p>
        <h1 className="text-2xl font-display text-text-primary mb-1">{stats.publisher}</h1>
        <p className="text-sm text-text-muted">Revenus générés par les LLMs sur votre corpus certifié — mis à jour en temps réel.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden mb-8">
        {[
          { label: "Publications certifiées", value: stats.total_publications.toString(), color: "text-accent" },
          { label: "Verified Operations", value: stats.total_vo.toString(), color: "text-accent" },
          { label: "Revenus cumulés", value: `$${stats.total_earnings_usd.toFixed(4)}`, color: "text-text-primary" },
          { label: "Part reversée", value: `${stats.revenue_share_pct}%`, color: "text-text-primary" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-surface-2 px-5 py-4">
            <p className={`text-2xl font-mono font-bold tabular-nums ${color}`}>{value}</p>
            <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-1 border-b border-border mb-6">
        {[
          { key: "overview", label: "Vue générale" },
          { key: "publications", label: "Publications" },
          { key: "segments", label: "Segments" },
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`text-sm font-mono px-4 py-2.5 border-b-2 transition-colors cursor-pointer bg-transparent ${
              activeTab === tab.key ? "border-accent text-accent" : "border-transparent text-text-muted hover:text-text-primary"
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-5 bg-surface-2">
              <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-4">Modèle de revenus</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Prix par VO</span>
                  <span className="font-mono font-bold text-text-primary">$0.40</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Votre part</span>
                  <span className="font-mono font-bold text-accent">60% = $0.24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Part KAKAPO</span>
                  <span className="font-mono text-text-muted">40% = $0.16</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between items-center">
                  <span className="text-sm font-semibold text-text-primary">Revenus totaux</span>
                  <span className="font-mono font-bold text-text-primary text-lg">${stats.total_earnings_usd.toFixed(4)}</span>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-lg p-5 bg-surface-2">
              <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-4">Projection annuelle</p>
              <div className="space-y-3">
                {[
                  { label: "10K VO/mois", value: 10000 * 12 * 0.24 },
                  { label: "100K VO/mois", value: 100000 * 12 * 0.24 },
                  { label: "500K VO/mois", value: 500000 * 12 * 0.24 },
                ].map(p => (
                  <div key={p.label} className="flex justify-between items-center border-b border-border pb-2 last:border-0 last:pb-0">
                    <span className="text-xs font-mono text-text-muted">{p.label}</span>
                    <span className="font-mono font-bold text-text-primary">${(p.value / 1000).toFixed(0)}K/an</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-border rounded-lg p-5 bg-surface-3">
            <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">Conditions partenaire</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Émission KPT", value: "Gratuite", desc: "Aucun coût à l'émission" },
                { label: "Cession de droits", value: "Aucune", desc: "Votre corpus reste le vôtre" },
                { label: "Reversement", value: "Mensuel", desc: "Virement automatique" },
              ].map(c => (
                <div key={c.label}>
                  <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-1">{c.label}</p>
                  <p className="text-sm font-display text-text-primary font-semibold">{c.value}</p>
                  <p className="text-2xs text-text-muted mt-0.5">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "publications" && (
        <div>
          <p className="text-xs text-text-muted mb-4">{stats.total_publications} publications certifiées dans votre catalogue.</p>
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="grid grid-cols-4 gap-4 px-4 py-2 bg-surface-3 text-2xs font-mono text-text-muted uppercase tracking-widest">
              <span className="col-span-2">Publication</span>
              <span className="text-right">VO</span>
              <span className="text-right">Revenus</span>
            </div>
            <div className="divide-y divide-border">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="grid grid-cols-4 gap-4 px-4 py-3 items-center hover:bg-surface-3 transition-colors">
                  <div className="col-span-2">
                    <p className="text-xs text-text-primary truncate">Publication #{i + 1}</p>
                    <p className="text-2xs font-mono text-text-muted">KPT-11111111000{i + 1}-v1</p>
                  </div>
                  <p className="text-xs font-mono text-text-secondary text-right">0 VO</p>
                  <p className="text-xs font-mono font-bold text-text-primary text-right">$0.0000</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "segments" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "LLM", icon: "⚡", desc: "Modèles de langage", vo: 3, revenue: 0.72 },
            { label: "Pharma", icon: "🔬", desc: "Biotech & Pharma", vo: 1, revenue: 0.24 },
            { label: "Legal", icon: "⚖️", desc: "Cabinets juridiques", vo: 1, revenue: 0.24 },
            { label: "Institutions", icon: "🎓", desc: "Universités & Labs", vo: 0, revenue: 0.00 },
          ].map(s => (
            <div key={s.label} className="border border-border rounded-lg p-4 bg-surface-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{s.icon}</span>
                <span className="text-sm font-display text-text-primary">{s.label}</span>
              </div>
              <p className="text-2xs text-text-muted mb-3">{s.desc}</p>
              <p className="text-xl font-mono font-bold text-accent">${s.revenue.toFixed(4)}</p>
              <p className="text-2xs font-mono text-text-muted">{s.vo} VO</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <p className="text-2xs text-text-muted">
          Pas encore partenaire ?{" "}
          <Link href="/publisher/contact" className="text-accent hover:text-accent-hover no-underline">
            Demander un accord de partenariat →
          </Link>
        </p>
      </div>
    </div>
  );
}
