"use client";

import { useState, useEffect } from "react";

interface VOTransaction {
  kpt_id: string;
  question: string;
  total_usd: number;
  kakapo_usd: number;
  party_usd: number;
  segment: string;
  created_at: string;
}

interface KakapoStats {
  total_vo: number;
  kakapo_revenue_usd: number;
  party_revenue_usd: number;
  total_revenue_usd: number;
  kakapo_share_pct: number;
  party_share_pct: number;
  by_segment: { segment: string; vo_count: number; kakapo_usd: number }[];
  recent_transactions: VOTransaction[];
}

const API = (process.env.NEXT_PUBLIC_API_URL || "https://kakapo-back-production.up.railway.app") ?? "";

export default function AdminDashboard() {
  const [stats, setStats] = useState<KakapoStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API}/earnings/kakapo/stats`);
        if (res.ok) { setStats(await res.json()); setLastUpdate(new Date()); }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    }
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="max-w-5xl mx-auto px-6 py-20 text-center">
      <p className="text-xs font-mono text-text-muted animate-pulse">Chargement...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-1">KAKAPO Admin</p>
          <h1 className="text-2xl font-display text-text-primary">Tableau de bord infrastructure</h1>
          <p className="text-xs font-mono text-text-muted mt-1">Refresh toutes les 5s — {lastUpdate.toLocaleTimeString("fr-FR")}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-trust-high animate-pulse" />
          <span className="text-2xs font-mono text-text-secondary uppercase">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden mb-8">
        {[
          { label: "Total VO", value: stats?.total_vo ?? 0, color: "text-accent", prefix: "" },
          { label: "Revenus KAKAPO (40%)", value: `$${(stats?.kakapo_revenue_usd ?? 0).toFixed(4)}`, color: "text-accent", prefix: "" },
          { label: "Reversé chercheurs (60%)", value: `$${(stats?.party_revenue_usd ?? 0).toFixed(4)}`, color: "text-text-secondary", prefix: "" },
          { label: "Volume total", value: `$${(stats?.total_revenue_usd ?? 0).toFixed(4)}`, color: "text-text-primary", prefix: "" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-surface-2 px-5 py-4">
            <p className={`text-3xl font-mono font-bold tabular-nums ${color}`}>{value}</p>
            <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border border-border rounded-lg p-5 bg-surface-2">
          <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-4">Split économique</p>
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-4 bg-surface-3 rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: "40%" }} />
              </div>
              <span className="text-xs font-mono text-accent w-24 text-right font-semibold">40% KAKAPO</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-4 bg-surface-3 rounded-full overflow-hidden">
                <div className="h-full bg-accent/50 rounded-full" style={{ width: "60%" }} />
              </div>
              <span className="text-xs font-mono text-text-secondary w-24 text-right font-semibold">60% Chercheurs</span>
            </div>
          </div>
          <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-3 mt-6">Par segment</p>
          {!stats?.by_segment.length ? (
            <p className="text-xs text-text-muted">Aucun segment actif.</p>
          ) : stats.by_segment.map(s => (
            <div key={s.segment} className="flex items-center justify-between mb-2">
              <span className="text-2xs font-mono bg-surface-3 border border-border rounded px-2 py-0.5 uppercase">{s.segment}</span>
              <div className="text-right">
                <span className="text-xs font-mono text-accent font-bold">${s.kakapo_usd.toFixed(4)}</span>
                <span className="text-2xs text-text-muted ml-2">{s.vo_count} VO</span>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-border rounded-lg p-5 bg-surface-2">
          <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-4">Transactions live</p>
          {!stats?.recent_transactions.length ? (
            <p className="text-xs text-text-muted">Aucune transaction.</p>
          ) : (
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {stats.recent_transactions.map((t, i) => (
                <div key={i} className="grid grid-cols-3 gap-2 text-2xs border-b border-border pb-2 last:border-0">
                  <div className="col-span-2">
                    <p className="font-mono text-accent truncate">{t.kpt_id}</p>
                    <p className="text-text-muted truncate">{t.question}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-accent font-semibold">+${t.kakapo_usd.toFixed(4)}</p>
                    <p className="text-text-muted">{new Date(t.created_at).toLocaleTimeString("fr-FR")}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border border-border bg-surface-3 rounded-lg p-5">
        <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-3">Projection annuelle</p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "10K VO/mois", kakapo: 10000*12*0.16, party: 10000*12*0.24 },
            { label: "100K VO/mois", kakapo: 100000*12*0.16, party: 100000*12*0.24 },
            { label: "1M VO/mois", kakapo: 1000000*12*0.16, party: 1000000*12*0.24 },
          ].map(p => (
            <div key={p.label} className="bg-surface-2 rounded p-3 border border-border">
              <p className="text-2xs font-mono text-text-muted mb-2">{p.label}</p>
              <p className="text-sm font-mono font-bold text-accent">${(p.kakapo/1000).toFixed(0)}K KAKAPO</p>
              <p className="text-xs font-mono text-text-secondary">${(p.party/1000).toFixed(0)}K chercheurs</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
