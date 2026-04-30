"use client";
import { useState } from "react";

interface OptoutModalProps {
  publicationId: string;
  publicationTitle: string;
  onClose: () => void;
}

export function OptoutModal({ publicationId, publicationTitle, onClose }: OptoutModalProps) {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!email.trim() || !reason.trim()) { setError("Tous les champs sont requis."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Email invalide."); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/publications/${publicationId}/optout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason, contact_email: email }),
      });
      if (!res.ok) throw new Error("Erreur lors de la demande");
      setSuccess(true);
    } catch {
      setError("Erreur lors de la demande. Écrivez-nous à contact@kakapo.io.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-surface-2 border border-border rounded-lg p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
        {success ? (
          <div className="text-center py-4">
            <div className="w-10 h-10 rounded-full bg-trust-high/20 flex items-center justify-center mx-auto mb-3">
              <span className="text-trust-high text-xl">✓</span>
            </div>
            <p className="text-sm font-display text-text-primary mb-2">Demande enregistrée.</p>
            <p className="text-xs text-text-muted mb-4">La publication sera retirée de l&apos;index sous 48h.</p>
            <button onClick={onClose} className="text-xs font-mono text-accent cursor-pointer bg-transparent border-0">Fermer</button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Demande de retrait</p>
                <h3 className="text-sm font-display text-text-primary leading-snug">{publicationTitle}</h3>
              </div>
              <button onClick={onClose} className="text-text-muted hover:text-text-primary text-lg bg-transparent border-0 cursor-pointer ml-4 flex-shrink-0">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-2xs font-mono text-text-muted uppercase tracking-widest block mb-1.5">Email professionnel <span className="text-trust-low">*</span></label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="contact@votre-institution.fr"
                  className="w-full bg-surface-3 border border-border rounded px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent" />
              </div>
              <div>
                <label className="text-2xs font-mono text-text-muted uppercase tracking-widest block mb-1.5">Raison du retrait <span className="text-trust-low">*</span></label>
                <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3}
                  placeholder="Expliquez pourquoi cette publication doit être retirée..."
                  className="w-full bg-surface-3 border border-border rounded px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent resize-none" />
              </div>
              {error && <p className="text-xs text-trust-low">{error}</p>}
              <div className="flex gap-3 pt-2">
                <button onClick={handleSubmit} disabled={loading}
                  className="flex-1 bg-accent hover:bg-accent-hover text-white text-sm font-mono py-2 rounded transition-colors disabled:opacity-50 cursor-pointer">
                  {loading ? "Envoi..." : "Demander le retrait"}
                </button>
                <button onClick={onClose} className="border border-border text-text-secondary text-sm font-mono px-4 py-2 rounded transition-colors bg-transparent cursor-pointer hover:border-border-strong">
                  Annuler
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
