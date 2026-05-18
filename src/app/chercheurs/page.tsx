"use client";

import { useState } from "react";
import Link from "next/link";

const TABS = [
  { id: "catalogue", label: "Mon catalogue" },
  { id: "parcours", label: "Parcours article" },
  { id: "programme", label: "Programme KPT-Author" },
];

const IKPT_FEATURES = [
  { label: "Source", value: "Éditeur partenaire KAKAPO" },
  { label: "Certification", value: "Automatique via éditeur" },
  { label: "Hash", value: "SHA-256 texte intégral" },
  { label: "Droits", value: "Éditeur + auteur selon contrat" },
  { label: "Revenu", value: "Royalties via l'éditeur" },
  { label: "Démarche", value: "Aucune — automatique" },
];

const KPT_FEATURES = [
  { label: "Source", value: "Dépôt direct sur KAKAPO" },
  { label: "Certification", value: "Validation par les pairs" },
  { label: "Hash", value: "SHA-256 texte intégral" },
  { label: "Droits", value: "Auteur — licence OA ou preprint" },
  { label: "Revenu", value: "Direct — sans intermédiaire" },
  { label: "Démarche", value: "Dépôt via DOI ou PDF" },
];

const TIMELINE = [
  {
    date: "Étape 1",
    event: "Preprint déposé sur arXiv ou bioRxiv",
    type: "preprint",
    note: "Vous gardez vos droits. Certifiable directement par KAKAPO.",
    action: "KAKAPO peut certifier cette version dès maintenant.",
  },
  {
    date: "Étape 2",
    event: "Peer review et publication finale",
    type: "published",
    note: "Nature, NEJM, BMC, PLOS One — selon l'éditeur.",
    action: "KAKAPO certifie la version finale et lie les deux DOIs.",
  },
  {
    date: "Étape 3",
    event: "KAKAPO lie le preprint à la publication finale",
    type: "certified",
    note: "Via les métadonnées CrossRef — relation preprint → publication.",
    action: "Le parcours complet est traçable et vérifiable.",
  },
  {
    date: "Étape 4",
    event: "Un LLM cite votre publication",
    type: "cited",
    note: "Il cite la version la plus récente et la plus validée.",
    action: "La source est certifiée, traçable, admissible.",
  },
];

export default function ChercheursPage() {
  const [activeTab, setActiveTab] = useState("catalogue");
  const [doiInput, setDoiInput] = useState("");

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">

      <div className="mb-12">
        <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-4">
          Chercheurs & Auteurs
        </p>
        <h1 className="text-3xl font-display text-text-primary leading-tight mb-5 max-w-2xl">
          Votre publication est peut-être déjà certifiée.
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed max-w-xl mb-8">
          KAKAPO certifie les publications scientifiques pour qu'elles soient
          traçables et vérifiables par les systèmes IA.
          Vérifiez si votre travail est déjà dans le catalogue.
        </p>
        <div className="flex flex-wrap gap-2">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
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

      {activeTab === "catalogue" && (
        <div>
          <div className="border border-border rounded-lg p-5 bg-surface-1 mb-6">
            <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-3">
              Vérifier mon DOI
            </p>
            <p className="text-sm text-text-secondary mb-4">
              Entrez le DOI de votre publication pour vérifier si elle est déjà certifiée dans notre catalogue.
            </p>
            <div className="flex gap-3 flex-wrap">
              <input
                type="text"
                value={doiInput}
                onChange={e => setDoiInput(e.target.value)}
                placeholder="10.1038/s41586-024-07246-x"
                className="flex-1 min-w-0 border border-border rounded px-4 py-2 text-sm font-mono bg-surface-2 text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors"
              />
              <Link
                href={`/publications?doi=${doiInput}`}
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-mono px-5 py-2 rounded transition-colors no-underline flex-shrink-0"
              >
                Rechercher →
              </Link>
            </div>
            <p className="text-2xs text-text-muted mt-2">
              Vous ne connaissez pas votre DOI ? Cherchez sur pubmed.ncbi.nlm.nih.gov ou scholar.google.com
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="border border-border rounded-lg p-5 bg-surface-1">
              <div className="flex items-center justify-between mb-4">
                <p className="text-2xs font-mono text-accent uppercase tracking-widest">i-KPT</p>
                <span className="text-2xs font-mono text-text-muted border border-border rounded px-2 py-0.5">Via éditeur</span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                Publication certifiée via un éditeur partenaire KAKAPO.
                Automatique — aucune démarche requise de votre part.
              </p>
              <div className="space-y-2">
                {IKPT_FEATURES.map(({ label, value }) => (
                  <div key={label} className="flex items-start justify-between gap-4">
                    <span className="text-2xs text-text-muted flex-shrink-0">{label}</span>
                    <span className="text-2xs text-text-secondary text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-accent/30 rounded-lg p-5 bg-surface-1">
              <div className="flex items-center justify-between mb-4">
                <p className="text-2xs font-mono text-accent uppercase tracking-widest">KPT</p>
                <span className="text-2xs font-mono text-accent border border-accent/30 rounded px-2 py-0.5">Dépôt direct</span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                Publication déposée directement par l'auteur sur KAKAPO.
                Validation par les pairs. Royalties directes sans intermédiaire.
              </p>
              <div className="space-y-2">
                {KPT_FEATURES.map(({ label, value }) => (
                  <div key={label} className="flex items-start justify-between gap-4">
                    <span className="text-2xs text-text-muted flex-shrink-0">{label}</span>
                    <span className="text-2xs text-text-secondary text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-border rounded-lg p-5 bg-surface-1">
            <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-2">
              Votre publication n'est pas encore dans le catalogue ?
            </p>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Vous pouvez la certifier directement via notre formulaire de dépôt.
              Entrez le DOI — KAKAPO récupère automatiquement les métadonnées via CrossRef.
            </p>
            <Link href="/certifier"
              className="text-2xs font-mono text-accent hover:text-accent-hover no-underline">
              Certifier ma publication →
            </Link>
          </div>
        </div>
      )}

      {activeTab === "parcours" && (
        <div>
          <p className="text-sm text-text-secondary leading-relaxed max-w-xl mb-8">
            Un article scientifique a souvent deux vies — le preprint et la publication finale.
            KAKAPO certifie les deux et lie le parcours complet via CrossRef.
          </p>
          <div className="relative mb-8">
            {TIMELINE.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center min-w-5">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-4"
                    style={{
                      background: item.type === "certified" ? "var(--color-accent)" :
                                  item.type === "cited" ? "#8b5cf6" :
                                  item.type === "published" ? "#22c55e" : "#334155",
                    }}
                  />
                  {i < TIMELINE.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-1 mb-1" style={{ minHeight: 32 }} />
                  )}
                </div>
                <div
                  className="flex-1 border rounded-lg p-4 mb-2"
                  style={{
                    borderColor: item.type === "certified" ? "var(--color-accent)" : "var(--color-border)",
                    background: "var(--color-surface-1)",
                  }}
                >
                  <p className="text-2xs font-mono text-text-muted mb-1">{item.date}</p>
                  <p className="text-sm font-display text-text-primary mb-1">{item.event}</p>
                  <p className="text-2xs text-text-muted mb-2">{item.note}</p>
                  <p className="text-2xs text-accent">{item.action}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border border-border rounded-lg p-5 bg-surface-1">
            <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-2">
              Droits selon la licence
            </p>
            <div className="divide-y divide-border">
              {[
                { type: "Preprint arXiv/bioRxiv", rights: "Auteur — droits complets", note: "DOI 10.48550 ou 10.1101 — certifiable directement" },
                { type: "Publication Open Access CC-BY", rights: "Auteur — droits maintenus", note: "PLOS, BMC, Frontiers — auteur rémunéré directement" },
                { type: "Publication sous droits éditeur", rights: "Éditeur — droits cédés", note: "Nature, Springer, Elsevier — revenu via l'éditeur partenaire" },
              ].map(({ type, rights, note }) => (
                <div key={type} className="py-3">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <p className="text-sm text-text-primary">{type}</p>
                    <p className="text-2xs font-mono text-accent flex-shrink-0">{rights}</p>
                  </div>
                  <p className="text-2xs text-text-muted">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "programme" && (
        <div>
          <div className="border border-accent/30 rounded-lg p-6 bg-surface-1 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <p className="text-2xs font-mono text-accent uppercase tracking-widest">
                Programme KPT-Author — Phase 2
              </p>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Le programme KPT-Author permettra aux chercheurs de déposer directement
              leurs travaux sur KAKAPO — preprints, publications OA, données de recherche.
              Validation par les pairs. Attribution d'un identifiant KPT officiel.
              Revenu direct à chaque citation par un LLM.
            </p>
            <p className="text-2xs text-text-muted">
              Ouverture prévue en Phase 2 — après établissement des premiers partenariats éditeurs.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              { title: "Dépôt direct", desc: "Via DOI existant ou upload PDF. KAKAPO vérifie l'authenticité et génère le KPT." },
              { title: "Validation par les pairs", desc: "Des chercheurs de votre domaine valident votre dépôt avant certification officielle." },
              { title: "Identifiant KPT officiel", desc: "Votre publication reçoit un KPT unique — plus fiable qu'un i-KPT car validé par des pairs indépendants." },
              { title: "Revenu direct", desc: "Chaque accès par un LLM génère des royalties automatiques — sans intermédiaire éditeur." },
            ].map(({ title, desc }) => (
              <div key={title} className="border border-border rounded-lg p-4 bg-surface-1">
                <p className="text-sm font-display text-text-primary mb-1">{title}</p>
                <p className="text-sm text-text-secondary">{desc}</p>
              </div>
            ))}
          </div>

          <div className="border border-border rounded-lg p-6">
            <p className="text-sm font-display text-text-primary mb-2">
              Rejoindre la liste d'attente KPT-Author.
            </p>
            <p className="text-sm text-text-secondary mb-4">
              Soyez notifié en priorité à l'ouverture du programme.
            </p>
            <a
              href="mailto:researchers@kakapo.io?subject=Liste d'attente KPT-Author"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-mono px-6 py-3 rounded transition-colors no-underline"
            >
              S'inscrire →
            </a>
          </div>
        </div>
      )}

    </div>
  );
}
