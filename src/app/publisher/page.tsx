"use client";

import { useState } from "react";

interface PublisherDashboard {
  publisher: {
    name: string;
    slug: string;
    status: string;
    contract_type: string;
    revenue_share_pct: number;
  };
  balance: {
    revenue_generated: number;
    revenue_share_paid: number;
    kpt_costs_pending: number;
    revenue_share_pending: number;
  };
  stats: {
    total_kpts: number;
    active_kpts: number;
    total_queries: number;
    monthly_queries: number;
    estimated_total_revenue: number;
    estimated_monthly_revenue: number;
  };
}

export default function PublisherDashboardPage() {
  const [apiKey, setApiKey] = useState("");
  const [data, setData] = useState<PublisherDashboard | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchDashboard() {
    if (!apiKey.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/publishers/me/dashboard`, {
        headers: { "X-API-Key": apiKey },
      });
      if (!res.ok) throw new Error("Clé API invalide ou accès refusé");
      setData(await res.json());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 rounded px-3 py-1 mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span className="text-2xs font-mono text-accent uppercase tracking-widest">Espace Éditeur</span>
      </div>

      {!data ? (
        <div className="max-w-md space-y-6">
          <div>
            <h1 className="text-2xl font-display text-text-primary mb-2">Tableau de bord éditeur</h1>
            <p className="text-sm text-text-secondary leading-relaxed">
              Accédez à votre corpus certifié, vos statistiques d'usage et vos revenus générés via KAKAPO.
            </p>
          </div>
          <div className="space-y-3">
            <label className="text-2xs font-mono text-text-muted uppercase tracking-widest block">Clé API éditeur</label>
            <input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Votre clé API partenaire"
              className="w-full bg-surface-2 border border-border rounded px-3 py-2 text-sm font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50"
            />
            <button
              onClick={fetchDashboard}
              disabled={loading || !apiKey.trim()}
              className="w-full bg-accent hover:bg-accent-hover text-white text-sm font-mono px-4 py-2.5 rounded transition-colors disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Chargement..." : "Accéder au dashboard"}
            </button>
            {error && <p className="text-xs font-mono text-red-400">{error}</p>}
          </div>
          <div className="border border-border rounded p-5 space-y-2">
            <p className="text-2xs font-mono text-text-muted uppercase tracking-widest">Pas encore partenaire ?</p>
            <p className="text-xs text-text-secondary leading-relaxed">
              Contactez KAKAPO pour signer un accord de partenariat et certifier votre corpus scientifique.
            </p>
            <a href="mailto:contact@kakapo.io"
              className="text-xs font-mono text-accent hover:text-accent-hover no-underline">
              contact@kakapo.io →
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-display text-text-primary">{data.publisher.name}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-2xs font-mono text-trust-high border border-trust-high/30 rounded px-2 py-0.5">
                  ● {data.publisher.status}
                </span>
                <span className="text-2xs font-mono text-text-muted">
                  Revenue share {data.publisher.revenue_share_pct}%
                </span>
                <span className="text-2xs font-mono text-text-muted">
                  {data.publisher.contract_type}
                </span>
              </div>
            </div>
            <button
              onClick={() => setData(null)}
              className="text-xs font-mono text-text-muted hover:text-text-primary border border-border rounded px-3 py-1.5 transition-colors bg-transparent cursor-pointer"
            >
              Déconnexion
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {[
              { label: "Revenus en attente", value: `€${data.balance.revenue_share_pending.toFixed(2)}`, highlight: true },
              { label: "Revenus générés", value: `€${data.balance.revenue_generated.toFixed(2)}` },
              { label: "Reversements effectués", value: `€${data.balance.revenue_share_paid.toFixed(2)}` },
            ].map(({ label, value, highlight }) => (
              <div key={label} className="bg-surface-1 p-6">
                <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-2">{label}</p>
                <p className={`text-2xl font-mono font-semibold ${highlight ? "text-trust-high" : "text-text-primary"}`}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {[
              { label: "KPTs actifs", value: data.stats.active_kpts },
              { label: "KPTs total", value: data.stats.total_kpts },
              { label: "Requêtes IA ce mois", value: data.stats.monthly_queries },
              { label: "Requêtes IA total", value: data.stats.total_queries },
            ].map(({ label, value }) => (
              <div key={label} className="bg-surface-1 p-5">
                <p className="text-xl font-mono font-semibold text-text-primary tabular-nums">{value}</p>
                <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mt-1">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-border rounded p-5">
              <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-4">Estimation revenus</p>
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-text-secondary">Ce mois</span>
                  <span className="text-sm font-mono font-semibold text-text-primary">
                    €{data.stats.estimated_monthly_revenue.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-text-secondary">Total estimé</span>
                  <span className="text-sm font-mono font-semibold text-text-primary">
                    €{data.stats.estimated_total_revenue.toFixed(2)}
                  </span>
                </div>
                <p className="text-2xs text-text-muted">Basé sur {data.publisher.revenue_share_pct}% des Verified Operations à €0.002/VO</p>
              </div>
            </div>
            <div className="border border-border rounded p-5">
              <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-4">Modèle de partage</p>
              <div className="space-y-2">
                {[
                  { label: "Votre part", pct: data.publisher.revenue_share_pct, color: "bg-accent" },
                  { label: "Part KAKAPO", pct: 100 - data.publisher.revenue_share_pct, color: "bg-surface-4" },
                ].map(({ label, pct, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-2xs font-mono text-text-muted mb-1">
                      <span>{label}</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-2 bg-surface-3 rounded-full overflow-hidden">
                      <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
