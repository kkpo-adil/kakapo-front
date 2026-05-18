"use client";

import { useState } from "react";
import Link from "next/link";

const MARKETS = [
  { name: "Santé & Médical", size: "$11,000B", color: "#22c55e", icon: "⚕", desc: "Diagnostics, protocoles cliniques, recommandations thérapeutiques" },
  { name: "Pharma & Biotech", size: "$1,500B", color: "#3b82f6", icon: "🔬", desc: "R&D, dossiers FDA/EMA, drug discovery" },
  { name: "Legal & Compliance", size: "$900B", color: "#f59e0b", icon: "⚖", desc: "Due diligence, contentieux scientifiques, brevets" },
  { name: "Finance & Assurance", size: "$2,000B", color: "#8b5cf6", icon: "📊", desc: "Risk scoring, valorisation biotech, actuariat" },
  { name: "Défense & Sécurité", size: "$700B", color: "#ef4444", icon: "🛡", desc: "Veille scientifique sécurisée, R&D défense" },
];

const TIMELINE = [
  { date: "Jan 2024", event: "Preprint déposé sur bioRxiv", type: "preprint", doi: "10.1101/2024.01.15.123456", note: "Auteur garde ses droits — certifiable directement" },
  { date: "Mar 2024", event: "Peer review — 3 reviewers indépendants", type: "review", note: "Processus de validation externe" },
  { date: "Jun 2024", event: "Publication finale — Nature Medicine", type: "published", doi: "10.1038/s41591-024-03156-x", note: "Droits cédés à Springer" },
  { date: "Jun 2024", event: "KAKAPO certifie les deux versions et lie le parcours", type: "certified", note: "Hash SHA-256 + lien CrossRef relation" },
  { date: "Aujourd'hui", event: "LLM cite la version peer-reviewed certifiée", type: "cited", note: "Source traçable, vérifiable, admissible" },
];

const CODE_SNIPPET = `const response = await fetch(
  "https://api.kakapo.io/v1/certify",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: "Efficacy of SGLT2 inhibitors in heart failure",
      max_sources: 5
    })
  }
);

const { sources, certified_at } = await response.json();
// sources[0].kpt_id → "KPT-3F7A8B2C-PMC-PMC9876543"
// sources[0].hash   → "sha256:3f7a8b2c..."
// sources[0].doi    → "10.1056/NEJMoa2022186"`;

export default function LLMPage() {
  const [activeTab, setActiveTab] = useState<"market" | "trace" | "why" | "integration">("market");
  const [openMarket, setOpenMarket] = useState<number | null>(null);

  const tabs = [
    { id: "market", label: "Marché" },
    { id: "trace", label: "Parcours article" },
    { id: "why", label: "Neutralité" },
    { id: "integration", label: "Intégration" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">

      <div className="mb-12">
        <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-4">
          LLMs & Plateformes IA
        </p>
        <h1 className="text-3xl font-display text-text-primary leading-tight mb-5 max-w-2xl">
          Les marchés régulés exigent des sources vérifiables par un tiers indépendant.
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed max-w-xl mb-8">
          KAKAPO ajoute une couche de provenance indépendante sur les sources scientifiques
          de votre LLM — certification cryptographique, parcours complet preprint
          vers publication finale, audit trail exploitable.
        </p>
        <div className="flex flex-wrap gap-3">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as typeof activeTab)}
              className="text-2xs font-mono uppercase tracking-widest px-4 py-2 rounded transition-colors"
              style={{
                background: activeTab === t.id ? "var(--color-accent)" : "transparent",
                color: activeTab === t.id ? "#fff" : "var(--color-text-muted)",
                border: activeTab === t.id ? "1px solid var(--color-accent)" : "1px solid var(--color-border)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "market" && (
        <div>
          <p className="text-sm text-text-secondary leading-relaxed max-w-xl mb-8">
            Ces secteurs ne signent pas avec un LLM qui ne peut pas prouver ses sources.
            Un LLM ne peut pas certifier ses propres sources — conflit d'intérêt structurel.
            KAKAPO est le tiers indépendant.
          </p>
          <div className="space-y-2 mb-10">
            {MARKETS.map((m, i) => (
              <div
                key={i}
                className="border rounded-lg cursor-pointer transition-all"
                style={{
                  borderColor: openMarket === i ? m.color + "66" : "var(--color-border)",
                  background: "var(--color-surface-1)",
                }}
                onClick={() => setOpenMarket(openMarket === i ? null : i)}
              >
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{m.icon}</span>
                    <div>
                      <p className="text-sm font-display text-text-primary">{m.name}</p>
                      <p className="text-2xs text-text-muted">{m.desc}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="text-sm font-mono font-bold" style={{ color: m.color }}>{m.size}</p>
                    <p className="text-2xs text-text-muted">marché total</p>
                  </div>
                </div>
                {openMarket === i && (
                  <div className="px-4 pb-4 pt-0">
                    <div className="border-t border-border pt-3">
                      <p className="text-2xs text-text-muted mb-1">Avec KAKAPO</p>
                      <p className="text-sm text-text-secondary">
                        Chaque réponse de votre LLM cite des sources certifiées,
                        horodatées, vérifiables par tout auditeur indépendant.
                        Vos clients enterprise dans ce secteur peuvent signer.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="border border-border rounded-lg p-5 bg-surface-1">
            <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-2">Contexte réglementaire</p>
            <p className="text-sm text-text-secondary leading-relaxed">
              EU AI Act — obligations de traçabilité actives depuis août 2025 pour les modèles GPAI.
              Pleine entrée en vigueur août 2026. Chine — Interim Measures en vigueur depuis 2023.
              USA — réglementations sectorielles FDA, SEC, HIPAA.
            </p>
          </div>
        </div>
      )}

      {activeTab === "trace" && (
        <div>
          <p className="text-sm text-text-secondary leading-relaxed max-w-xl mb-8">
            KAKAPO certifie le parcours complet d'un article scientifique —
            du preprint initial jusqu'à la publication peer-reviewed finale.
            CrossRef sait que le lien existe. KAKAPO certifie le contenu à chaque étape.
          </p>
          <div className="relative mb-8">
            {TIMELINE.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center min-w-5">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-4"
                    style={{
                      background: item.type === "certified" ? "var(--color-accent)" : item.type === "cited" ? "#8b5cf6" : "#334155",
                    }}
                  />
                  {i < TIMELINE.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-1 mb-1" style={{ minHeight: 28 }} />
                  )}
                </div>
                <div
                  className="flex-1 border rounded-lg p-4 mb-2"
                  style={{
                    borderColor: item.type === "certified" ? "var(--color-accent)" : "var(--color-border)",
                    background: "var(--color-surface-1)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-2xs text-text-muted">{item.date}</span>
                    {item.doi && (
                      <span className="text-2xs font-mono text-text-muted">DOI: {item.doi}</span>
                    )}
                  </div>
                  <p className="text-sm text-text-primary mb-1">{item.event}</p>
                  <p className="text-2xs text-text-muted">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border border-accent/30 rounded-lg p-5 bg-surface-1">
            <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">
              Ce que KAKAPO est le seul à pouvoir dire
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              "Cette réponse est basée sur la version peer-reviewed publiée dans Nature Medicine
              en juin 2024, qui est la version finale du preprint déposé en janvier 2024.
              La version citée est la plus récente et la plus validée.
              Le contenu n'a pas été modifié depuis certification."
            </p>
            <p className="text-2xs text-text-muted mt-3">
              CrossRef sait que le lien existe. CrossRef ne certifie pas le contenu.
            </p>
          </div>
        </div>
      )}

      {activeTab === "why" && (
        <div>
          <p className="text-sm text-text-secondary leading-relaxed max-w-xl mb-8">
            Un LLM ne peut pas certifier ses propres sources d'entraînement.
            Un éditeur ne peut pas auditer ses propres publications.
            La neutralité de KAKAPO est structurelle — pas déclarative.
          </p>
          <div className="grid grid-cols-1 gap-4 mb-8">
            {[
              {
                title: "Conflit d'intérêt structurel",
                content: "OpenAI a entraîné GPT sur des publications scientifiques. Elle ne peut pas certifier ces mêmes sources — juge et partie. Ce n'est pas une question d'intention. C'est une question de structure.",
                color: "#ef4444",
              },
              {
                title: "Neutralité de KAKAPO",
                content: "KAKAPO n'est ni éditeur, ni LLM, ni chercheur. Il n'a aucun intérêt dans le contenu qu'il certifie. C'est la seule position qui permet une certification indépendante crédible.",
                color: "#22c55e",
              },
            ].map((item, i) => (
              <div key={i} className="border rounded-lg p-5 bg-surface-1" style={{ borderColor: item.color + "33" }}>
                <p className="text-sm font-display text-text-primary mb-2">{item.title}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
          <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-4">Même principe que</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: "SWIFT", desc: "Standard neutre partagé entre banques concurrentes. Personne ne peut l'internaliser sans perdre la neutralité." },
              { name: "HTTPS", desc: "Standard ouvert. Google, Apple et Microsoft l'utilisent ensemble. La neutralité est la valeur." },
              { name: "Visa", desc: "Les banques émettent des cartes mais délèguent les transactions à une couche neutre indispensable." },
            ].map((item, i) => (
              <div key={i} className="border border-border rounded-lg p-4 bg-surface-1">
                <p className="text-sm font-display font-bold text-accent mb-2">{item.name}</p>
                <p className="text-2xs text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "integration" && (
        <div>
          <p className="text-sm text-text-secondary leading-relaxed max-w-xl mb-8">
            Un endpoint. Une clé API. Les réponses de votre LLM deviennent certifiées,
            traçables et auditables — sans modifier votre architecture existante.
          </p>
          <div className="border border-border rounded-lg overflow-hidden mb-8">
            <div className="border-b border-border px-4 py-2 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-text-muted/30" />
              <p className="text-2xs font-mono text-text-muted">kakapo-integration.ts</p>
            </div>
            <pre className="p-5 overflow-x-auto text-2xs font-mono text-text-secondary leading-relaxed bg-surface-1">
              <code>{CODE_SNIPPET}</code>
            </pre>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { label: "Délai d'intégration", value: "< 1 jour" },
              { label: "Endpoints", value: "1 seul" },
              { label: "Modification archi", value: "aucune" },
              { label: "Documentation", value: "disponible" },
            ].map(({ label, value }) => (
              <div key={label} className="border border-border rounded p-4 bg-surface-1">
                <p className="text-2xs text-text-muted mb-1">{label}</p>
                <p className="text-sm text-text-primary font-mono">{value}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/demo"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-mono px-6 py-3 rounded transition-colors no-underline">
              Voir la démo →
            </Link>
            <a href="mailto:partnerships@kakapo.io?subject=Intégration LLM KAKAPO"
              className="inline-flex items-center gap-2 border border-border hover:border-accent/30 text-text-secondary text-sm font-mono px-6 py-3 rounded transition-colors no-underline">
              Discuter d'une intégration →
            </a>
          </div>
        </div>
      )}

    </div>
  );
}
