"use client";

import { useState } from "react";
import Link from "next/link";

export default function InstitutionsPage() {
  const [activeTab, setActiveTab] = useState<"features" | "usecases" | "pricing">("features");

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-10">
        <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">Institutions académiques</p>
        <h1 className="text-3xl font-display text-text-primary mb-3 leading-tight max-w-2xl">
          Certifiez la production scientifique de votre institution.
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed max-w-2xl mb-6">
          KAKAPO offre aux universités, laboratoires et centres de recherche une infrastructure de certification
          scientifique. Vos chercheurs déposent, leurs publications sont certifiées, et ils sont rémunérés
          à chaque usage par un LLM.
        </p>
        <div className="flex gap-3">
          <Link href="/institutions/contact" className="no-underline inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm px-5 py-2.5 rounded transition-colors">
            Demander une Site License →
          </Link>
          <Link href="/demo" className="no-underline inline-flex items-center gap-2 border border-border text-text-secondary hover:text-text-primary text-sm px-5 py-2.5 rounded transition-colors">
            Voir la démo
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
          {[
            { title: "Site License", desc: "Tous vos chercheurs accèdent à KAKAPO sous une licence institutionnelle unique. Gestion centralisée.", icon: "🎓" },
            { title: "Dashboard institution", desc: "Tableau de bord agrégé : publications certifiées, VO générées, revenus reversés par chercheur.", icon: "📊" },
            { title: "Rémunération des chercheurs", desc: "60% des VO générées sur les publications de vos chercheurs leur sont reversées directement.", icon: "💰" },
            { title: "Intégration HAL / CrossRef", desc: "Ingestion automatique depuis HAL Open Science et CrossRef. Vos publications existantes sont indexées.", icon: "🔗" },
            { title: "Rapport mensuel", desc: "Rapport détaillé : usages par LLM, revenus par département, publications les plus consultées.", icon: "📋" },
            { title: "Support dédié", desc: "Interlocuteur technique dédié pour l'intégration et la formation de vos équipes.", icon: "🤝" },
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

      {activeTab === "usecases" && (
        <div className="space-y-4">
          {[
            {
              title: "Université de recherche",
              desc: "Une université avec 500 chercheurs actifs certifie ses publications sur KAKAPO. Chaque fois qu'un LLM comme Mistral cite une publication, le chercheur correspondant reçoit 0.24 USD. Sur 100K VO/mois, c'est 24 000 USD/mois reversés aux chercheurs de l'institution.",
            },
            {
              title: "Centre hospitalier universitaire",
              desc: "Un CHU certifie ses publications cliniques. Les équipes IA pharmaceutiques utilisent KAKAPO pour vérifier leurs sources avant soumission FDA. Le CHU génère des revenus passifs sur son corpus médical.",
            },
            {
              title: "Laboratoire de recherche privé",
              desc: "Un laboratoire certifie ses brevets et publications propriétaires. KAKAPO lui permet de monétiser son corpus auprès des LLMs sans cession de droits.",
            },
          ].map(uc => (
            <div key={uc.title} className="border border-border rounded-lg p-5 bg-surface-2">
              <h3 className="text-sm font-display text-text-primary mb-2">{uc.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{uc.desc}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "pricing" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Lab", users: "< 50 chercheurs", price: "500 USD/mois", desc: "Laboratoires et petites équipes" },
            { name: "University", users: "< 500 chercheurs", price: "2 000 USD/mois", desc: "Universités et grandes écoles", highlight: true },
            { name: "Network", users: "Illimité", price: "Sur devis", desc: "Réseaux d'institutions, ANR, CNRS" },
          ].map(p => (
            <div key={p.name} className={`border rounded-lg p-5 ${"highlight" in p && p.highlight ? "border-accent bg-accent/5" : "border-border bg-surface-2"}`}>
              <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">{p.name}</p>
              <p className="text-xl font-mono font-bold text-text-primary mb-1">{p.price}</p>
              <p className="text-xs font-mono text-text-muted mb-3">{p.users}</p>
              <p className="text-xs text-text-muted leading-relaxed mb-4">{p.desc}</p>
              <Link href="/institutions/contact" className="no-underline block text-center text-xs font-mono border border-accent text-accent hover:bg-accent hover:text-white py-2 rounded transition-colors">
                Demander un devis →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
