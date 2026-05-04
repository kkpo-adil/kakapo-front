"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface PublicationEarning {
  id: string;
  title: string;
  kpt_status: "certified" | "indexed";
  kpt_id: string | null;
  trust_score: number | null;
  vo_generated: number;
  earnings_usd: number;
  submitted_at: string | null;
}

interface EarningsData {
  total_publications: number;
  certified_kpts: number;
  indexed_kpts: number;
  total_vo_generated: number;
  total_earnings_usd: number;
  revenue_share_pct: number;
  publications: PublicationEarning[];
}

export default function DashboardPage() {
  const [data, setData] = useState<EarningsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("kakapo_token");
    if (!token) { setLoading(false); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/publications/my/earnings`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.ok ? r.json() : Promise.reject("Erreur"))
      .then(d => setData(d))
      .catch(() => setError("Impossible de charger vos données."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center">
      <p className="text-xs font-mono text-text-muted animate-pulse">Chargement...</p>
    </div>
  );

  if (!data) return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center">
      <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-4">Espace chercheur</p>
      <h1 className="text-2xl font-display text-text-primary mb-4">Connectez-vous pour accéder à votre dashboard</h1>
      <p className="text-sm text-text-secondary mb-8">Suivez vos publications certifiées et les revenus générés par les LLMs sur votre corpus.</p>
      <a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/orcid/login`}
        className="no-underline inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm px-6 py-3 rounded transition-colors">
        Se connecter avec ORCID →
      </a>
      {error && <p className="text-xs text-trust-low mt-4">{error}</p>}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">Espace chercheur</p>
        <h1 className="text-2xl font-display text-text-primary">Mon tableau de bord</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden mb-8">
        {[
          { label: "Publications", value: data.total_publications.toString(), color: "text-text-primary" },
          { label: "KPT certifiés", value: data.certified_kpts.toString(), color: "text-amber-600" },
          { label: "i-KPT indexés", value: data.indexed_kpts.toString(), color: "text-accent" },
          { label: "Revenus (USD)", value: `$${data.total_earnings_usd.toFixed(2)}`, color: "text-trust-high" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-surface-2 px-5 py-4">
            <p className={`text-2xl font-mono font-bold tabular-nums ${color}`}>{value}</p>
            <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="border border-border rounded-lg p-5 mb-8 bg-surface-3">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <p className="text-xs font-mono text-accent uppercase tracking-widest mb-1">Modèle de revenus</p>
            <p className="text-sm text-text-secondary leading-relaxed">
              Vous recevez <strong className="text-text-primary">{data.revenue_share_pct}%</strong> des Verified Operations générées par les LLMs sur vos publications certifiées.
              Chaque fois qu'un système d'IA vérifie une de vos sources, vous êtes rémunéré.
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-2xs font-mono text-text-muted">VO générées</p>
            <p className="text-xl font-mono font-bold text-text-primary">{data.total_vo_generated.toLocaleString("fr-FR")}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-display text-text-primary mb-4">Mes publications</h2>
        {data.publications.length === 0 ? (
          <div className="border border-dashed border-border rounded-lg p-12 text-center">
            <p className="text-sm text-text-muted mb-4">Aucune publication certifiée.</p>
            <Link href="/certifier" className="no-underline text-xs font-mono text-accent hover:text-accent-hover">
              Certifier ma première publication →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {data.publications.map(pub => (
              <div key={pub.id} className={`border rounded-lg p-4 ${pub.kpt_status === "certified" ? "border-amber-200 bg-amber-50/30" : "border-border bg-surface-2"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-2xs font-mono font-semibold px-2 py-0.5 rounded uppercase ${pub.kpt_status === "certified" ? "bg-amber-500 text-white" : "bg-surface-3 border border-border text-text-muted"}`}>
                        {pub.kpt_status === "certified" ? "★ KPT" : "i-KPT"}
                      </span>
                      {pub.trust_score && (
                        <span className="text-2xs font-mono text-accent">{pub.trust_score}/100</span>
                      )}
                    </div>
                    <p className="text-sm font-display text-text-primary leading-snug truncate">{pub.title}</p>
                    {pub.kpt_id && (
                      <p className="text-2xs font-mono text-text-muted mt-1">{pub.kpt_id}</p>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-mono text-text-muted">Revenus</p>
                    <p className="text-lg font-mono font-bold text-trust-high">${pub.earnings_usd.toFixed(2)}</p>
                    <p className="text-2xs font-mono text-text-muted">{pub.vo_generated} VO</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <p className="text-xs text-text-muted leading-relaxed">
          Les revenus sont calculés sur la base de {data.revenue_share_pct}% des Verified Operations.
          Les reversements sont effectués mensuellement. Infrastructure KAKAPO V3.0.
        </p>
      </div>
    </div>
  );
}
