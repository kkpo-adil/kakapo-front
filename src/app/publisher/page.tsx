"use client";

import { useState } from "react";

const SAMPLE_JOURNALS = [
  { name: "PLOS One", pubs: 12847, domain: "Multidisciplinaire", license: "CC-BY", ikpts: 12847 },
  { name: "Nature Medicine", pubs: 3241, domain: "Médecine clinique", license: "CC-BY", ikpts: 3241 },
  { name: "BMC Genomics", pubs: 8934, domain: "Génomique", license: "CC-BY", ikpts: 8934 },
  { name: "Genome Biology", pubs: 2187, domain: "Biologie computationnelle", license: "CC-BY", ikpts: 2187 },
  { name: "Breast Cancer Research", pubs: 1432, domain: "Oncologie", license: "CC-BY", ikpts: 1432 },
  { name: "Malaria Journal", pubs: 2891, domain: "Maladies infectieuses", license: "CC-BY", ikpts: 2891 },
];

const TABS = [
  { id: "apercu", label: "Aperçu catalogue" },
  { id: "modele", label: "Modèle économique" },
  { id: "integration", label: "Intégration" },
];

export default function PublisherPage() {
  const [activeTab, setActiveTab] = useState("apercu");
  const [expandedJournal, setExpandedJournal] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">

      <div className="mb-12">
        <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-4">
          Éditeurs scientifiques
        </p>
        <h1 className="text-3xl font-display text-text-primary leading-tight mb-5 max-w-2xl">
          Votre corpus génère des revenus à chaque accès par un LLM.
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed max-w-xl mb-8">
          KAKAPO certifie vos publications et reverse une part des revenus
          à chaque fois qu'un système IA interroge votre corpus.
          Vous ne distribuez pas votre catalogue — vous le certifiez.
Comme un label qui dépose ses masters : les droits restent les vôtres, les royalties arrivent à chaque stream.
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

      {activeTab === "apercu" && (
        <div>
          <div className="border border-border rounded-lg p-5 bg-surface-1 mb-6">
            <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-4">
              Exemple de catalogue certifié — journaux OA actifs dans KAKAPO
            </p>
            <p className="text-2xs text-text-muted mb-4">
              Ces journaux sont déjà dans notre catalogue. Chaque publication certifiée
              reçoit un identifiant i-KPT unique lié à son DOI CrossRef.
            </p>
            <div className="space-y-2">
              {SAMPLE_JOURNALS.map((j, i) => (
                <div
                  key={i}
                  className="border border-border rounded-lg cursor-pointer transition-all"
                  style={{ background: "var(--color-surface-2)" }}
                  onClick={() => setExpandedJournal(expandedJournal === i ? null : i)}
                >
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-display text-text-primary">{j.name}</p>
                      <p className="text-2xs text-text-muted">{j.domain}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono text-accent">{j.ikpts.toLocaleString()} i-KPTs</p>
                      <p className="text-2xs text-text-muted">licence {j.license}</p>
                    </div>
                  </div>
                  {expandedJournal === i && (
                    <div className="px-4 pb-4 border-t border-border pt-3">
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <p className="text-2xs text-text-muted mb-1">Publications certifiées</p>
                          <p className="text-sm font-mono text-text-primary">{j.pubs.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-2xs text-text-muted mb-1">Identifiants</p>
                          <p className="text-sm font-mono text-text-primary">i-KPT + DOI CrossRef</p>
                        </div>
                        <div>
                          <p className="text-2xs text-text-muted mb-1">Licence</p>
                          <p className="text-sm font-mono text-text-primary">{j.license}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="border border-border rounded-lg p-5 bg-surface-1">
            <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-2">
              Ce que KAKAPO certifie pour chaque publication
            </p>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {[
                { label: "Hash", value: "SHA-256 texte intégral" },
                { label: "Signature", value: "RSA-PSS vérifiable" },
                { label: "Métadonnées", value: "ORCID · MeSH · CrossRef" },
                { label: "Identifiant", value: "i-KPT unique par publication" },
              ].map(({ label, value }) => (
                <div key={label} className="border border-border rounded p-3">
                  <p className="text-2xs text-text-muted mb-1">{label}</p>
                  <p className="text-sm font-mono text-text-primary">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "modele" && (
        <div className="space-y-5">
          <div className="border border-border rounded-lg p-5 bg-surface-1">
            <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-3">
              Principe
            </p>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Les producteurs de connaissance ne paient jamais.
              Les consommateurs industriels — LLMs, pharma, legal — paient l'accès.
              KAKAPO reverse une part à l'éditeur sur chaque accès généré par son corpus.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Vous payez", value: "Rien" },
                { label: "Développement requis", value: "Zéro" },
                { label: "Délai de certification", value: "< 48h" },
              ].map(({ label, value }) => (
                <div key={label} className="border border-border rounded p-3 text-center">
                  <p className="text-2xs text-text-muted mb-1">{label}</p>
                  <p className="text-sm font-mono text-accent">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-border rounded-lg p-5 bg-surface-1">
            <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-3">
              Ce que vous ne faites pas
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              Vous ne distribuez pas vos contenus aux LLMs.
              Vous ne cédez pas vos droits.
              KAKAPO certifie l'authenticité et la provenance —
              le contenu reste chez vous.
              Les LLMs accèdent à la preuve cryptographique, pas au texte brut.
            </p>
          </div>

          <div className="border border-border rounded-lg p-5 bg-surface-1">
            <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-3">
              Revenue share
            </p>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Chaque accès à une publication certifiée génère une stream certifié.
              KAKAPO reverse une part directement à l'éditeur partenaire
              selon le volume d'accès généré par son corpus.
              Transparent. Traçable. Automatique.
            </p>
            <p className="text-2xs text-text-muted">
              Le taux de royalties exact se fixe dans le contrat de partenariat
              selon le volume et le domaine scientifique.
            </p>
          </div>
        </div>
      )}

      {activeTab === "integration" && (
        <div className="space-y-5">
          <div className="border border-border rounded-lg p-5 bg-surface-1">
            <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-3">
              Comment ça fonctionne
            </p>
            <div className="divide-y divide-border">
              {[
                { step: "01", title: "Vous fournissez votre liste de DOIs", desc: "KAKAPO ingère votre corpus via DOI et CrossRef API. Aucun développement requis de votre côté." },
                { step: "02", title: "KAKAPO certifie chaque publication", desc: "Hash SHA-256, signature RSA-PSS, métadonnées enrichies. Chaque publication reçoit un i-KPT unique." },
                { step: "03", title: "Votre corpus est dans le catalogue", desc: "Accessible aux LLMs partenaires KAKAPO. Chaque accès génère un revenu automatiquement reversé." },
                { step: "04", title: "Suivi en temps réel", desc: "Dashboard éditeur avec suivi des accès, revenus générés, et publications les plus citées." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="py-4 flex gap-4">
                  <span className="text-lg font-display font-bold text-accent flex-shrink-0 w-8">{step}</span>
                  <div>
                    <p className="text-sm font-display text-text-primary mb-1">{title}</p>
                    <p className="text-sm text-text-secondary">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-border rounded-lg p-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm font-display text-text-primary mb-1">
                Devenir éditeur partenaire KAKAPO.
              </p>
              <p className="text-sm text-text-secondary">
                Pour discuter d'une intégration ou obtenir une estimation
                des revenus potentiels sur votre corpus.
              </p>
            </div>
            <a
              href="mailto:partnerships@kakapo.io?subject=Partenariat éditeur KAKAPO"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-mono px-6 py-3 rounded transition-colors no-underline flex-shrink-0"
            >
              Nous contacter →
            </a>
          </div>
        </div>
      )}

    </div>
  );
}
