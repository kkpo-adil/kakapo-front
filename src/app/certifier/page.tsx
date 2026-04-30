"use client";

import { useState, useRef } from "react";
import Link from "next/link";

interface CrossRefPreview {
  title: string;
  abstract: string;
  authors: { name: string }[];
  journal: string;
  institution: string;
  published_at: string | null;
  doi: string;
}

interface KPTResult {
  kpt_id: string;
  content_hash: string;
  status: string;
  version: number;
  issued_at: string;
}

export default function CertifierPage() {
  const [step, setStep] = useState<"form" | "preview" | "success">("form");
  const [doi, setDoi] = useState("");
  const [crossref, setCrossref] = useState<CrossRefPreview | null>(null);
  const [loadingCrossref, setLoadingCrossref] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [kptResult, setKptResult] = useState<KPTResult | null>(null);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function lookupDoi() {
    if (!doi.trim()) return;
    setLoadingCrossref(true);
    setError("");
    try {
      const encoded = encodeURIComponent(doi);
      const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/publications/crossref/${encoded}`);
      if (!r.ok) throw new Error("DOI introuvable sur CrossRef");
      const data = await r.json();
      setCrossref({ ...data, doi });
      setStep("preview");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur CrossRef");
    } finally {
      setLoadingCrossref(false);
    }
  }

  async function submit() {
    const token = localStorage.getItem("kakapo_token");
    if (!token) { setError("Vous devez être connecté"); return; }
    if (!file) { setError("Sélectionnez un fichier PDF"); return; }
    setSubmitting(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", crossref?.title || doi);
      if (crossref?.abstract) formData.append("abstract", crossref.abstract);
      if (doi) formData.append("doi", doi);
      if (crossref?.authors?.length) formData.append("authors_raw", JSON.stringify(crossref.authors));
      if (crossref?.institution) formData.append("institution_raw", crossref.institution);
      formData.append("source", "direct");
      const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/publications/upload`, {
        method: "POST",
        body: formData,
      });
      if (!uploadRes.ok) {
        const err = await uploadRes.json();
        throw new Error(err.detail || "Erreur upload");
      }
      const pub = await uploadRes.json();
      const kptRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kpt/issue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publication_id: pub.id }),
      });
      if (!kptRes.ok) {
        const err = await kptRes.json();
        throw new Error(err.detail || "Erreur émission KPT");
      }
      const kpt = await kptRes.json();
      setKptResult(kpt);
      setStep("success");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="max-w-3xl mx-auto px-6 pt-10 pb-0">
        <div className="border-l-4 border-accent/40 bg-accent/5 rounded-r-lg p-5">
          <p className="text-sm font-display text-text-primary mb-2">Gratuit, et ça le restera.</p>
          <p className="text-xs text-text-secondary leading-relaxed">
            KAKAPO ne facture jamais les chercheurs. Notre infrastructure est financée par les usages industriels en aval — LLM, pharma, legal. Vous gardez 100 % de vos droits, vous ne payez rien, vous ne recevez aucune sollicitation commerciale.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-14">
        <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 rounded px-3 py-1 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-2xs font-mono text-accent uppercase tracking-widest">Certifier une publication</span>
        </div>

        {step === "form" && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-display text-text-primary mb-3">Certifier une publication</h1>
              <p className="text-sm text-text-secondary leading-relaxed">
                Entrez le DOI de votre publication. KAKAPO récupère automatiquement les métadonnées via CrossRef, calcule le hash SHA-256 de votre PDF et émet un KPT cryptographique.
              </p>
            </div>

            <div className="bg-surface-3 border border-border rounded p-6 space-y-2">
              <p className="text-2xs font-mono text-accent uppercase tracking-widest">Ce que KAKAPO certifie</p>
              <div className="grid grid-cols-3 gap-4 pt-2">
                {[
                  { n: "01", t: "Antériorité", d: "Date et heure d'émission du KPT, horodatée et immuable." },
                  { n: "02", t: "Intégrité", d: "Hash SHA-256 du PDF. Toute modification est détectable." },
                  { n: "03", t: "Traçabilité", d: "Lien entre auteur ORCID, publication et KPT." },
                ].map((item) => (
                  <div key={item.n}>
                    <span className="text-2xs font-mono text-accent/60 block mb-1">{item.n}</span>
                    <p className="text-xs font-display text-text-primary mb-1">{item.t}</p>
                    <p className="text-2xs text-text-muted leading-relaxed">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-2xs font-mono text-text-muted uppercase tracking-widest block mb-2">DOI de la publication</label>
                <div className="flex gap-2">
                  <input
                    value={doi}
                    onChange={(e) => setDoi(e.target.value)}
                    placeholder="10.1038/nature12373"
                    className="flex-1 bg-surface-3 border border-border rounded px-3 py-2 text-sm font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50"
                  />
                  <button
                    onClick={lookupDoi}
                    disabled={loadingCrossref || !doi.trim()}
                    className="bg-accent hover:bg-accent-hover text-white text-xs font-mono px-4 py-2 rounded transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {loadingCrossref ? "..." : "Rechercher"}
                  </button>
                </div>
                <p className="text-2xs text-text-muted mt-1">Les métadonnées seront automatiquement enrichies via CrossRef.</p>
              </div>
              {error && <p className="text-xs font-mono text-trust-low">{error}</p>}
            </div>
          </div>
        )}

        {step === "preview" && crossref && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-display text-text-primary mb-2">Vérifiez les métadonnées</h1>
              <p className="text-sm text-text-secondary">Données récupérées depuis CrossRef. Vérifiez avant de certifier.</p>
            </div>
            <div className="bg-surface-3 border border-border rounded p-5 space-y-4">
              <div>
                <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-1">Titre</p>
                <p className="text-sm text-text-primary font-display">{crossref.title}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-1">DOI</p>
                  <p className="text-xs font-mono text-accent">{crossref.doi}</p>
                </div>
                <div>
                  <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-1">Journal</p>
                  <p className="text-xs text-text-secondary">{crossref.journal || "—"}</p>
                </div>
                <div>
                  <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-1">Auteurs</p>
                  <p className="text-xs text-text-secondary">{crossref.authors.map((a) => a.name).join(", ") || "—"}</p>
                </div>
                <div>
                  <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-1">Date</p>
                  <p className="text-xs text-text-secondary">{crossref.published_at || "—"}</p>
                </div>
              </div>
            </div>
            <div>
              <label className="text-2xs font-mono text-text-muted uppercase tracking-widest block mb-2">Fichier PDF</label>
              <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-border hover:border-accent/40 rounded p-8 text-center cursor-pointer transition-colors">
                {file ? (
                  <div>
                    <p className="text-sm font-mono text-accent">{file.name}</p>
                    <p className="text-2xs text-text-muted mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-text-muted">Cliquez pour sélectionner votre PDF</p>
                    <p className="text-2xs text-text-muted mt-1">Maximum 50 MB</p>
                  </div>
                )}
              </div>
              <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </div>
            {error && <p className="text-xs font-mono text-trust-low">{error}</p>}
            <div className="flex gap-3">
              <button onClick={submit} disabled={submitting || !file} className="bg-accent hover:bg-accent-hover text-white text-sm font-mono px-6 py-2.5 rounded transition-colors disabled:opacity-50 cursor-pointer">
                {submitting ? "Émission du KPT..." : "Certifier et émettre le KPT"}
              </button>
              <button onClick={() => { setStep("form"); setCrossref(null); setFile(null); }} className="border border-border text-text-secondary hover:text-text-primary text-sm font-mono px-6 py-2.5 rounded transition-colors bg-transparent cursor-pointer">
                Retour
              </button>
            </div>
          </div>
        )}

        {step === "success" && kptResult && (
          <div className="space-y-8">
            <div className="text-center space-y-4 py-8">
              <div className="w-16 h-16 rounded-full bg-trust-high/20 flex items-center justify-center mx-auto">
                <span className="text-trust-high text-3xl">✓</span>
              </div>
              <h1 className="text-2xl font-display text-text-primary">KPT émis avec succès</h1>
              <p className="text-sm text-text-secondary">Votre publication est maintenant certifiée sur KAKAPO.</p>
            </div>
            <div className="bg-surface-3 border border-accent/20 rounded p-6 space-y-4">
              <p className="text-2xs font-mono text-accent uppercase tracking-widest">Proof of Knowledge Token</p>
              <div className="space-y-3">
                <div>
                  <p className="text-2xs font-mono text-text-muted mb-1">KPT ID</p>
                  <code className="text-sm font-mono text-text-primary">{kptResult.kpt_id}</code>
                </div>
                <div>
                  <p className="text-2xs font-mono text-text-muted mb-1">Hash SHA-256 certifié</p>
                  <code className="text-xs font-mono text-text-secondary break-all">{kptResult.content_hash}</code>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xs font-mono text-text-muted mb-1">Statut</p>
                    <span className="text-xs font-mono text-trust-high">{kptResult.status}</span>
                  </div>
                  <div>
                    <p className="text-2xs font-mono text-text-muted mb-1">Version</p>
                    <span className="text-xs font-mono text-text-primary">v{kptResult.version}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href={`/verify?kpt_id=${kptResult.kpt_id}`} className="no-underline bg-accent hover:bg-accent-hover text-white text-sm font-mono px-6 py-2.5 rounded transition-colors">
                Vérifier ce KPT →
              </Link>
              <Link href="/publications" className="no-underline border border-border text-text-secondary hover:text-text-primary text-sm font-mono px-6 py-2.5 rounded transition-colors">
                Voir les publications
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
