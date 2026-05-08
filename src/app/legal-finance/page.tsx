"use client";

import { useState } from "react";
import Link from "next/link";

const FEATURES = [
  { title: "Preuve opposable en justice", desc: "Un KPT certifié KAKAPO est une preuve cryptographique d'antériorité et d'intégrité. Hash SHA-256 + signature RSA-PSS + timestamp UTC.", icon: "⚖️" },
  { title: "Export PDF signé", desc: "Chaque réponse IA est exportable en PDF signé, versable dans un dossier judiciaire ou un audit compliance.", icon: "📄" },
  { title: "Vérification en temps réel", desc: "N'importe quel KPT cité peut être vérifié publiquement sur kakapo.io en moins de 2 secondes.", icon: "🔍" },
  { title: "Traçabilité complète", desc: "Historique de toutes les consultations : qui a vérifié quoi, quand, avec quel résultat.", icon: "📋" },
  { title: "Anti-fabrication de références", desc: "Le LLM ne peut pas inventer une jurisprudence ou une publication scientifique. Zéro hallucination de source possible.", icon: "🛡️" },
  { title: "API enterprise", desc: "Intégration dans vos outils existants (DMS, LegalTech, due diligence platforms) via API REST documentée.", icon: "⚡" },
];

export default function LegalFinancePage() {
  const [activeTab, setActiveTab] = useState<"features" | "usecases" | "pricing">("features");

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-10">
        <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">Legal & Finance</p>
        <h1 className="text-3xl font-display text-text-primary mb-3 leading-tight max-w-2xl">
          Des sources vérifiables dans vos dossiers juridiques et financiers.
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed max-w-2xl mb-6">
          KAKAPO certifie cryptographiquement chaque source citée par vos LLMs.
          Chaque référence est traçable, opposable et exportable en PDF signé pour vos dossiers.
        </p>
        <div className="flex gap-3">
          <Link href="/legal-finance/contact" className="no-underline inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm px-5 py-2.5 rounded transition-colors">
            Demander une démo →
          </Link>
          <Link href="/demo" className="no-underline inline-flex items-center gap-2 border border-border text-text-secondary hover:text-text-primary text-sm px-5 py-2.5 rounded transition-colors">
            Voir la démo live
          </Link>
        </div>
      </div>

      <div className="flex gap-1 border-b border-border mb-8">
        {[
          { key: "features", label: "Fonctionnalités" },
          { key: "usecases", label: "Cas d'usage" },
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
          {FEATURES.map(f => (
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

      {activeTab === "usecases" && (
        <div className="space-y-4">
          {[
            {
              title: "Due diligence M&A assistée par IA",
              context: "Une équipe M&A utilise un LLM pour analyser les brevets et publications d'une cible d'acquisition.",
              problem: "Sans KAKAPO : les sources citées sont non vérifiables. Un avocat adverse peut contester.",
              solution: "Avec KAKAPO : chaque publication est un KPT certifié versable au dossier.",
            },
            {
              title: "Compliance réglementaire financière",
              context: "Un département compliance interroge un LLM sur les normes IFRS ou Bâle IV.",
              problem: "Sans KAKAPO : les références normatives peuvent être inventées ou obsolètes.",
              solution: "Avec KAKAPO : les sources sont certifiées avec date, version et hash vérifiable.",
            },
          ].map(uc => (
            <div key={uc.title} className="border border-border rounded-lg p-5 bg-surface-2">
              <h3 className="text-sm font-display text-text-primary mb-3">{uc.title}</h3>
              <p className="text-xs text-text-muted mb-2">{uc.context}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-trust-low/5 border border-trust-low/20 rounded p-3">
                  <p className="text-2xs font-mono text-trust-low uppercase mb-1">Sans KAKAPO</p>
                  <p className="text-xs text-text-muted">{uc.problem}</p>
                </div>
                <div className="bg-trust-high/5 border border-trust-high/20 rounded p-3">
                  <p className="text-2xs font-mono text-trust-high uppercase mb-1">Avec KAKAPO</p>
                  <p className="text-xs text-text-muted">{uc.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "pricing" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Essential", vo: "5K VO/mois", price: "2 000 USD/mois", desc: "Cabinets < 20 avocats" },
            { name: "Professional", vo: "25K VO/mois", price: "8 500 USD/mois", desc: "Département juridique complet + audit trail", highlight: true },
            { name: "Enterprise", vo: "Illimité", price: "Sur devis", desc: "Intégration DMS + SLA + support dédié" },
          ].map(p => (
            <div key={p.name} className={`border rounded-lg p-5 ${"highlight" in p && p.highlight ? "border-accent bg-accent/5" : "border-border bg-surface-2"}`}>
              <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">{p.name}</p>
              <p className="text-xl font-mono font-bold text-text-primary mb-1">{p.price}</p>
              <p className="text-xs font-mono text-text-muted mb-3">{p.vo}</p>
              <p className="text-xs text-text-muted leading-relaxed mb-4">{p.desc}</p>
              <Link href="/legal-finance/contact" className="no-underline block text-center text-xs font-mono border border-accent text-accent hover:bg-accent hover:text-white py-2 rounded transition-colors">
                Demander un devis →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
