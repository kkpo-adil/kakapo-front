"use client";

import { useState } from "react";
import Link from "next/link";

export default function LLMPage() {
  const [activeTab, setActiveTab] = useState<"features" | "integration" | "pricing">("features");

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-10">
        <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">LLM & IA</p>
        <h1 className="text-3xl font-display text-text-primary mb-3 leading-tight max-w-2xl">
          Rendez vos réponses IA vérifiables et opposables.
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed max-w-2xl mb-6">
          KAKAPO est l'infrastructure qui permet à votre LLM de citer des sources certifiées cryptographiquement.
          Aucune hallucination de référence possible. Chaque citation est un KPT vérifiable avec hash SHA-256.
        </p>
        <div className="flex gap-3">
          <Link href="/llm/contact" className="no-underline inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm px-5 py-2.5 rounded transition-colors">
            Accès API →
          </Link>
          <Link href="/demo" className="no-underline inline-flex items-center gap-2 border border-border text-text-secondary hover:text-text-primary text-sm px-5 py-2.5 rounded transition-colors">
            Voir la démo live
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-px bg-border rounded-lg overflow-hidden mb-10">
        {[
          { value: "< 200ms", label: "Latence API" },
          { value: "720+", label: "Publications indexées" },
          { value: "SHA-256", label: "Hash par source" },
        ].map(({ value, label }) => (
          <div key={label} className="bg-surface-2 px-6 py-4">
            <p className="text-xl font-mono font-bold text-accent">{value}</p>
            <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-1 border-b border-border mb-8">
        {[
          { key: "features", label: "Fonctionnalités" },
          { key: "integration", label: "Intégration" },
          { key: "pricing", label: "Tarification" },
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`text-sm font-mono px-4 py-2.5 border-b-2 transition-colors cursor-pointer bg-transparent ${
              activeTab === tab.key ? "border-accent text-accent" : "border-transparent text-text-muted hover:text-text-primary"
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "features" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Tool calling forcé", desc: "Votre LLM est contraint d'appeler search_kakapo avant de répondre. Il ne peut pas inventer une référence absente du catalogue.", icon: "🔒" },
            { title: "Catalogue certifié", desc: "16 KPT certifiés avec vrais hash SHA-256 + 704 i-KPT indexés. Essais Phase 3, publications Nature, arXiv.", icon: "📚" },
            { title: "Trust Score", desc: "Chaque publication a un score de fiabilité calculé sur 6 composantes : source, données, citations, fraîcheur, cohérence, reviews.", icon: "📊" },
            { title: "API REST documentée", desc: "Endpoints stables, Pydantic v2, OpenAPI auto-générée, latence < 200ms. Intégration en moins de 2 heures.", icon: "⚡" },
            { title: "Export PDF signé", desc: "Chaque réponse peut être exportée en PDF signé RSA-PSS. Vérifiable avec la clé publique KAKAPO.", icon: "📄" },
            { title: "Verified Operation", desc: "Facturation à la VO — vous payez uniquement les vérifications effectuées. Pas de forfait aveugle.", icon: "💳" },
          ].map(f => (
            <div key={f.title} className="border border-border rounded-lg p-5 bg-surface-2">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{f.icon}</span>
                <div>
                  <h3 className="text-sm font-display text-text-primary mb-1">{f.title}</h3>
                  <p className="text-xs text-text-muted leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "integration" && (
        <div className="space-y-6">
          <div className="border border-border rounded-lg p-5 bg-surface-2">
            <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-3">Intégration en 3 étapes</p>
            <div className="space-y-4">
              {[
                { step: "01", title: "Clé API", desc: "Générez votre clé API depuis votre espace LLM. Quotas configurables par segment." },
                { step: "02", title: "Tool definition", desc: "Ajoutez le tool search_kakapo dans votre système de tool calling. Documentation complète fournie." },
                { step: "03", title: "Tool choice forcé", desc: "Configurez tool_choice pour forcer l'appel search_kakapo avant chaque réponse scientifique." },
              ].map(s => (
                <div key={s.step} className="flex gap-4">
                  <span className="text-2xl font-mono font-bold text-accent/30 flex-shrink-0">{s.step}</span>
                  <div>
                    <p className="text-sm font-display text-text-primary mb-1">{s.title}</p>
                    <p className="text-xs text-text-muted leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-border rounded-lg p-5 bg-surface-3">
            <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-3">Endpoint principal</p>
            <code className="text-xs font-mono text-text-primary block">POST /demo/query</code>
            <code className="text-xs font-mono text-text-muted block mt-1">{"{ question: string, with_kakapo: boolean }"}</code>
            <Link href="/about/api" className="text-xs font-mono text-accent mt-3 block no-underline hover:text-accent-hover">
              Documentation complète →
            </Link>
          </div>
        </div>
      )}

      {activeTab === "pricing" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Startup", vo: "50K VO/mois", price: "500 USD/mois", desc: "LLMs verticaux, startups IA" },
            { name: "Scale", vo: "500K VO/mois", price: "4 000 USD/mois", desc: "LLMs mid-market + support prioritaire", highlight: true },
            { name: "Foundational", vo: "Illimité", price: "Sur devis", desc: "Mistral, OpenAI niveau — contrat annuel" },
          ].map(p => (
            <div key={p.name} className={`border rounded-lg p-5 ${"highlight" in p && p.highlight ? "border-accent bg-accent/5" : "border-border bg-surface-2"}`}>
              <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">{p.name}</p>
              <p className="text-xl font-mono font-bold text-text-primary mb-1">{p.price}</p>
              <p className="text-xs font-mono text-text-muted mb-3">{p.vo}</p>
              <p className="text-xs text-text-muted leading-relaxed mb-4">{p.desc}</p>
              <Link href="/llm/contact" className="no-underline block text-center text-xs font-mono border border-accent text-accent hover:bg-accent hover:text-white py-2 rounded transition-colors">
                Demander un accès →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
