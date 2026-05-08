"use client";

import { useState } from "react";
import Link from "next/link";

const FEATURES = [
  {
    title: "Audit trail FDA/EMA",
    desc: "Chaque source citée par un LLM dans un dossier réglementaire est tracée cryptographiquement. KPT ID + hash SHA-256 + timestamp UTC.",
    icon: "🔬",
  },
  {
    title: "Export PDF signé RSA-PSS",
    desc: "Chaque réponse IA est exportable en PDF signé, versable dans un dossier clinique ou réglementaire.",
    icon: "📄",
  },
  {
    title: "Compliance Module",
    desc: "Module dédié aux équipes réglementaires : vérification en masse, historique des consultations, rapport d'audit mensuel.",
    icon: "✅",
  },
  {
    title: "Anti-hallucination par construction",
    desc: "Le LLM ne peut pas citer une source qui n'existe pas dans KAKAPO. Zéro référence inventée dans vos dossiers.",
    icon: "🛡️",
  },
  {
    title: "Sources certifiées Phase 3",
    desc: "KEYNOTE-355, ASCENT, EMPAMY et d'autres essais cliniques Phase 3 indexés avec leurs DOIs et hash vérifiables.",
    icon: "💊",
  },
  {
    title: "Verified Operation",
    desc: "Facturation à l'usage — vous ne payez que les vérifications effectivement réalisées. Pas d'abonnement fixe aveugle.",
    icon: "⚡",
  },
];

const PRICING = [
  { name: "Starter", vo: "10K VO/mois", price: "4 000 USD/mois", desc: "Équipes réglementaires < 10 personnes" },
  { name: "Professional", vo: "50K VO/mois", price: "18 000 USD/mois", desc: "Département médical complet + Compliance Module" },
  { name: "Enterprise", vo: "Illimité", price: "Sur devis", desc: "Intégration API complète + SLA + audit trail dédié" },
];

export default function PharmaPage() {
  const [activeTab, setActiveTab] = useState<"features" | "pricing" | "usecases">("features");

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-10">
        <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">Pharma & Biotech</p>
        <h1 className="text-3xl font-display text-text-primary mb-3 leading-tight max-w-2xl">
          Des sources scientifiques vérifiables dans vos dossiers réglementaires.
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed max-w-2xl mb-6">
          KAKAPO certifie cryptographiquement les publications scientifiques citées par vos LLMs.
          Chaque source est traçable, opposable et exportable en PDF signé pour la FDA, l'EMA ou tout régulateur.
        </p>
        <div className="flex gap-3">
          <Link href="/pharma/contact" className="no-underline inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm px-5 py-2.5 rounded transition-colors">
            Demander une démo →
          </Link>
          <Link href="/demo" className="no-underline inline-flex items-center gap-2 border border-border text-text-secondary hover:text-text-primary text-sm px-5 py-2.5 rounded transition-colors">
            Voir la démo live
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-px bg-border rounded-lg overflow-hidden mb-10">
        {[
          { value: "0", label: "Hallucination de source possible" },
          { value: "SHA-256", label: "Hash cryptographique par source" },
          { value: "PDF signé", label: "Export réglementaire en 1 clic" },
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
              title: "Dossier de soumission réglementaire FDA",
              context: "Une équipe affaires réglementaires utilise un LLM pour rédiger un dossier clinique.",
              problem: "Sans KAKAPO : le LLM cite une méta-analyse qui n'existe pas. Le dossier est rejeté.",
              solution: "Avec KAKAPO : chaque citation est un KPT certifié avec hash SHA-256. Le dossier est auditable.",
            },
            {
              title: "Veille scientifique en oncologie",
              context: "Une équipe R&D interroge quotidiennement les dernières publications en oncologie.",
              problem: "Sans KAKAPO : les sources sont génériques, non vérifiables, parfois obsolètes.",
              solution: "Avec KAKAPO : les essais Phase 3 (KEYNOTE-355, ASCENT...) sont indexés avec leurs DOIs réels.",
            },
            {
              title: "Formation médicale continue",
              context: "Un département formation utilise un LLM pour générer des cas cliniques.",
              problem: "Sans KAKAPO : les références bibliographiques sont invérifiables.",
              solution: "Avec KAKAPO : chaque référence est vérifiable sur kakapo.io en temps réel.",
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
          {PRICING.map((p, i) => (
            <div key={p.name} className={`border rounded-lg p-5 ${i === 1 ? "border-accent bg-accent/5" : "border-border bg-surface-2"}`}>
              <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">{p.name}</p>
              <p className="text-xl font-mono font-bold text-text-primary mb-1">{p.price}</p>
              <p className="text-xs font-mono text-text-muted mb-3">{p.vo}</p>
              <p className="text-xs text-text-muted leading-relaxed mb-4">{p.desc}</p>
              <Link href="/pharma/contact" className="no-underline block text-center text-xs font-mono border border-accent text-accent hover:bg-accent hover:text-white py-2 rounded transition-colors">
                Demander un devis →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
