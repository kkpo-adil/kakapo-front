"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface VOTransaction {
  kpt_id: string;
  question: string;
  total_usd: number;
  kakapo_usd: number;
  party_usd: number;
  segment: string;
  created_at: string;
}

interface PublicationEarning {
  publication_id: string;
  title: string;
  kpt_id: string | null;
  kpt_status: string;
  total_vo: number;
  party_earnings_usd: number;
  kakapo_earnings_usd: number;
}

const API = (process.env.NEXT_PUBLIC_API_URL || "https://kakapo-back-production.up.railway.app") ?? "";

const DEMO_PUBLICATIONS = [
  "11111111-0001-0001-0001-000000000001",
  "11111111-0002-0002-0002-000000000002",
  "11111111-0003-0003-0003-000000000003",
  "11111111-0004-0004-0004-000000000004",
  "11111111-0005-0005-0005-000000000005",
];

export default function DashboardPage() {
  const [stats, setStats] = useState<{ total_vo: number; party_revenue_usd: number; kakapo_revenue_usd: number; recent_transactions: VOTransaction[] } | null>(null);
  const [publications, setPublications] = useState<PublicationEarning[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [statsRes, ...pubRes] = await Promise.all([
          fetch(`${API}/earnings/kakapo/stats`),
          ...DEMO_PUBLICATIONS.map(id => fetch(`${API}/earnings/publication/${id}`)),
        ]);
        if (statsRes.ok) setStats(await statsRes.json());
        const pubs = await Promise.all(pubRes.map(r => r.ok ? r.json() : null));
        setPublications(pubs.filter(Boolean));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
    const interval = setInterval(load, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center">
      <p className="text-xs font-mono text-text-muted animate-pulse">Chargement...</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">Espace chercheur</p>
        <h1 className="text-2xl font-display text-text-primary mb-1">Mon tableau de bord</h1>
        <p className="text-sm text-text-muted">Revenus générés par les LLMs sur vos publications certifiées — mis à jour en temps réel.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden mb-8">
        <div className="bg-surface-2 px-5 py-4">
          <p className="text-2xl font-mono font-bold text-accent tabular-nums">{stats?.total_vo ?? 0}</p>
          <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mt-1">Verified Operations</p>
        </div>
        <div className="bg-surface-2 px-5 py-4">
          <p className="text-2xl font-mono font-bold text-trust-high tabular-nums">${stats?.party_revenue_usd.toFixed(4) ?? "0.0000"}</p>
          <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mt-1">Revenus (60%)</p>
        </div>
        <div className="bg-surface-2 px-5 py-4">
          <p className="text-2xl font-mono font-bold text-amber-600 tabular-nums">{publications.length}</p>
          <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mt-1">Publications certifiées</p>
        </div>
        <div className="bg-surface-2 px-5 py-4">
          <p className="text-2xl font-mono font-bold text-text-primary tabular-nums">60%</p>
          <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mt-1">Part reversée</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border border-border rounded-lg p-5 bg-surface-2">
          <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-4">Mes publications</p>
          {publications.length === 0 ? (
            <p className="text-xs text-text-muted">Aucune publication certifiée.</p>
          ) : (
            <div className="space-y-3">
              {publications.map(pub => (
                <div key={pub.publication_id} className="flex items-center justify-between border-b border-border pb-2 last:border-0 last:pb-0">
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="text-xs font-display text-text-primary truncate">{pub.title}</p>
                    <p className="text-2xs font-mono text-text-muted mt-0.5">{pub.kpt_id ?? "—"}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-mono font-bold text-trust-high">${pub.party_earnings_usd.toFixed(4)}</p>
                    <p className="text-2xs font-mono text-text-muted">{pub.total_vo} VO</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border border-border rounded-lg p-5 bg-surface-2">
          <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-4">Transactions récentes</p>
          {!stats?.recent_transactions.length ? (
            <p className="text-xs text-text-muted">Aucune transaction pour le moment.</p>
          ) : (
            <div className="space-y-2">
              {stats.recent_transactions.slice(0, 8).map((t, i) => (
                <div key={i} className="flex items-center justify-between text-2xs">
                  <div className="flex-1 min-w-0 mr-2">
                    <p className="font-mono text-accent truncate">{t.kpt_id}</p>
                    <p className="text-text-muted truncate">{t.question}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-mono text-trust-high font-semibold">+${t.party_usd.toFixed(4)}</p>
                    <p className="text-text-muted">{new Date(t.created_at).toLocaleTimeString("fr-FR")}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border border-accent/20 rounded-lg p-5 bg-accent/3">
        <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">Modèle de revenus KAKAPO</p>
        <p className="text-sm text-text-secondary leading-relaxed">
          Chaque fois qu'un LLM vérifie une de vos publications certifiées, une <strong className="text-text-primary">Verified Operation</strong> est générée.
          Vous recevez <strong className="text-text-primary">60% de 0,40 USD</strong> par VO, soit <strong className="text-text-primary">0,24 USD par vérification</strong>.
          KAKAPO conserve 40% pour maintenir l'infrastructure.
        </p>
      </div>

      <div className="mt-6 text-right">
        <Link href="/certifier" className="text-xs font-mono text-accent hover:text-accent-hover no-underline">
          Certifier une nouvelle publication →
        </Link>
      </div>
    </div>
  );
}
