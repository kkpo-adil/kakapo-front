"use client";

import { useState } from "react";

interface UsageData {
  plan_type: string;
  monthly_quota: number;
  quota_used: number;
  quota_remaining: number;
  overage: number;
  price_per_query: number;
}

interface ClientData {
  organization_name: string;
  contact_email: string;
  plan_type: string;
  monthly_quota: number;
  is_active: boolean;
  created_at: string;
  api_key?: string;
}

export default function ApiAccessPage() {
  const [apiKey, setApiKey] = useState("");
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [client, setClient] = useState<ClientData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [regForm, setRegForm] = useState({ organization_name: "", contact_email: "", plan_type: "compliance_starter" });
  const [newKey, setNewKey] = useState("");
  const [registering, setRegistering] = useState(false);

  async function fetchUsage() {
    if (!apiKey.trim()) return;
    setLoading(true);
    setError("");
    try {
      const [usageRes, meRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/me/usage`, { headers: { "X-Client-API-Key": apiKey } }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/me`, { headers: { "X-Client-API-Key": apiKey } }),
      ]);
      if (!usageRes.ok) throw new Error("Clé API invalide ou inactive");
      setUsage(await usageRes.json());
      setClient(await meRes.json());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setLoading(false);
    }
  }

  async function register() {
    setRegistering(true);
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regForm),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Erreur inscription");
      }
      const data = await res.json();
      setNewKey(data.api_key);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setRegistering(false);
    }
  }

  const quotaPct = usage && usage.monthly_quota > 0
    ? Math.min(100, Math.round(usage.quota_used / usage.monthly_quota * 100))
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-6 py-14">
      <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 rounded px-3 py-1 mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span className="text-2xs font-mono text-accent uppercase tracking-widest">API KAKAPO</span>
      </div>
      <h1 className="text-2xl font-display text-text-primary mb-3">Accès API</h1>
      <p className="text-sm text-text-secondary leading-relaxed mb-10 max-w-2xl">
        Connectez votre système d'IA à une base de connaissances scientifiques certifiées.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border mb-10">
        {[
          { endpoint: "GET /publications/", desc: "Lister les publications indexées" },
          { endpoint: "POST /integrity/verify", desc: "Vérifier l'intégrité par DOI + hash" },
          { endpoint: "GET /kpt/{kpt_id}", desc: "Détails d'un KPT" },
          { endpoint: "GET /trust/score/{id}", desc: "Score de fiabilité" },
        ].map((item) => (
          <div key={item.endpoint} className="bg-surface-1 p-5">
            <code className="text-xs font-mono text-accent block mb-2">{item.endpoint}</code>
            <p className="text-xs text-text-muted">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="border border-border rounded p-6 space-y-4">
          <p className="text-sm font-display text-text-primary">Consulter mon usage</p>
          <input
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="kk_..."
            className="w-full bg-surface-2 border border-border rounded px-3 py-2 text-xs font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50"
          />
          <button
            onClick={fetchUsage}
            disabled={loading}
            className="w-full bg-accent hover:bg-accent-hover text-white text-xs font-mono px-4 py-2 rounded transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Chargement..." : "Vérifier"}
          </button>
          {error && <p className="text-xs text-red-400 font-mono">{error}</p>}
          {usage && client && (
            <div className="space-y-3 pt-2">
              <p className="text-xs font-mono text-text-primary">{client.organization_name}</p>
              <p className="text-2xs font-mono text-text-muted uppercase tracking-widest">{client.plan_type}</p>
              <div>
                <div className="flex justify-between text-2xs font-mono text-text-muted mb-1">
                  <span>{usage.quota_used.toLocaleString()} utilisées</span>
                  <span>{usage.monthly_quota.toLocaleString()} incluses</span>
                </div>
                <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${quotaPct}%` }} />
                </div>
              </div>
              {usage.overage > 0 && (
                <p className="text-2xs font-mono text-amber-400">
                  Dépassement : {usage.overage.toLocaleString()} requêtes × ${usage.price_per_query}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="border border-border rounded p-6 space-y-4">
          <p className="text-sm font-display text-text-primary">Créer un compte API</p>
          <input
            value={regForm.organization_name}
            onChange={(e) => setRegForm({ ...regForm, organization_name: e.target.value })}
            placeholder="Nom organisation"
            className="w-full bg-surface-2 border border-border rounded px-3 py-2 text-xs font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50"
          />
          <input
            value={regForm.contact_email}
            onChange={(e) => setRegForm({ ...regForm, contact_email: e.target.value })}
            placeholder="Email de contact"
            className="w-full bg-surface-2 border border-border rounded px-3 py-2 text-xs font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50"
          />
          <select
            value={regForm.plan_type}
            onChange={(e) => setRegForm({ ...regForm, plan_type: e.target.value })}
            className="w-full bg-surface-2 border border-border rounded px-3 py-2 text-xs font-mono text-text-primary focus:outline-none focus:border-accent/50"
          >
            <option value="compliance_starter">Compliance Starter — $2 500/mois</option>
            <option value="compliance_pro">Compliance Pro — $8 500/mois</option>
            <option value="starter_llm">Starter LLM — $15 000/mois</option>
            <option value="scale_llm">Scale LLM — $50 000/mois</option>
          </select>
          <button
            onClick={register}
            disabled={registering}
            className="w-full border border-accent/40 text-accent hover:bg-accent/10 text-xs font-mono px-4 py-2 rounded transition-colors disabled:opacity-50 cursor-pointer"
          >
            {registering ? "Inscription..." : "S'inscrire"}
          </button>
          {newKey && (
            <div className="bg-surface-2 border border-accent/20 rounded p-3 space-y-1">
              <p className="text-2xs font-mono text-accent uppercase tracking-widest">Clé API générée</p>
              <code className="text-xs font-mono text-text-primary break-all">{newKey}</code>
              <p className="text-2xs text-text-muted">Conservez cette clé — elle ne sera plus affichée.</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-surface-2 border border-border rounded p-5">
        <p className="text-xs font-mono text-text-muted mb-2">Documentation complète</p>
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}/docs`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-accent hover:text-accent-hover no-underline"
        >
          {`${process.env.NEXT_PUBLIC_API_URL}/docs`} →
        </a>
      </div>
    </div>
  );
}
