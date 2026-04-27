"use client";

import { useState, useEffect } from "react";

interface Review {
  id: string;
  reviewer_orcid: string;
  reviewer_name: string;
  methodology_score: number;
  data_score: number;
  reproducibility_score: number;
  clarity_score: number;
  global_score: number;
  flag: string;
  comment: string | null;
  is_conflict_of_interest: boolean;
  created_at: string;
}

interface ReviewPanelProps {
  publicationId: string;
}

const FLAG_LABELS: Record<string, string> = {
  none: "",
  non_reproducible: "⚠️ Résultats non reproductibles",
  missing_data: "⚠️ Données manquantes",
  conflict_of_interest: "⚠️ Conflit d'intérêt potentiel",
  suspected_duplicate: "⚠️ Duplicata suspecté",
};

const CRITERIA = [
  { key: "methodology_score", label: "Méthodologie" },
  { key: "data_score", label: "Données" },
  { key: "reproducibility_score", label: "Reproductibilité" },
  { key: "clarity_score", label: "Clarté" },
];

function ScoreButtons({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[0, 1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className={`w-8 h-8 rounded text-xs font-mono transition-colors cursor-pointer ${
            value === n
              ? "bg-accent text-white"
              : "bg-surface-2 border border-border text-text-muted hover:border-accent/40"
          }`}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

export function ReviewPanel({ publicationId }: ReviewPanelProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const [form, setForm] = useState({
    methodology_score: 0,
    data_score: 0,
    reproducibility_score: 0,
    clarity_score: 0,
    flag: "none",
    comment: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("kakapo_token");
    setIsConnected(!!token);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${publicationId}`)
      .then((r) => r.json())
      .then((data) => { setReviews(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [publicationId]);

  async function submitReview() {
    const token = localStorage.getItem("kakapo_token");
    if (!token) { setError("Vous devez être connecté"); return; }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${publicationId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, comment: form.comment || null }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Erreur");
      }
      const review = await res.json();
      setReviews([review, ...reviews]);
      setSubmitted(true);
      setShowForm(false);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setSubmitting(false);
    }
  }

  const avgScore = reviews.length > 0
    ? Math.round(reviews.reduce((a, r) => a + r.global_score, 0) / reviews.length * 100)
    : null;

  return (
    <div className="border border-border rounded p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-display text-text-primary">Reviews scientifiques</h3>
          <p className="text-2xs font-mono text-text-muted mt-0.5">
            {reviews.length} review{reviews.length !== 1 ? "s" : ""} publique{reviews.length !== 1 ? "s" : ""}
            {avgScore !== null && ` — score moyen ${avgScore}%`}
          </p>
        </div>
        {!submitted && isConnected && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="text-xs font-mono border border-accent/40 rounded px-3 py-1.5 text-accent hover:bg-accent/10 transition-colors cursor-pointer bg-transparent"
          >
            + Soumettre une review
          </button>
        )}
        {submitted && (
          <span className="text-xs font-mono text-trust-high border border-trust-high/30 rounded px-3 py-1.5">
            ✓ Review soumise
          </span>
        )}
        {!isConnected && (
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/auth/orcid/login`}
            className="text-xs font-mono border border-border rounded px-3 py-1.5 text-text-muted hover:text-accent hover:border-accent/40 transition-colors no-underline"
          >
            Connexion pour reviewer
          </a>
        )}
      </div>

      {showForm && (
        <div className="bg-surface-2 border border-border rounded p-5 space-y-5">
          <p className="text-2xs font-mono text-accent uppercase tracking-widest">Nouvelle review — identité ORCID publique</p>
          <div className="space-y-4">
            {CRITERIA.map(({ key, label }) => (
              <div key={key}>
                <label className="text-2xs font-mono text-text-muted uppercase tracking-widest block mb-2">{label}</label>
                <ScoreButtons
                  value={form[key as keyof typeof form] as number}
                  onChange={(v) => setForm({ ...form, [key]: v })}
                />
              </div>
            ))}
          </div>
          <div>
            <label className="text-2xs font-mono text-text-muted uppercase tracking-widest block mb-2">Signal</label>
            <select
              value={form.flag}
              onChange={(e) => setForm({ ...form, flag: e.target.value })}
              className="w-full bg-surface-1 border border-border rounded px-3 py-2 text-xs font-mono text-text-primary focus:outline-none focus:border-accent/50"
            >
              <option value="none">Aucun problème détecté</option>
              <option value="non_reproducible">Résultats non reproductibles</option>
              <option value="missing_data">Données manquantes</option>
              <option value="conflict_of_interest">Conflit d'intérêt potentiel</option>
              <option value="suspected_duplicate">Duplicata suspecté</option>
            </select>
          </div>
          <div>
            <label className="text-2xs font-mono text-text-muted uppercase tracking-widest block mb-2">Commentaire public (optionnel)</label>
            <textarea
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              rows={3}
              maxLength={1000}
              className="w-full bg-surface-1 border border-border rounded px-3 py-2 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 resize-none"
              placeholder="Vos observations sur cette publication..."
            />
          </div>
          {error && <p className="text-xs font-mono text-red-400">{error}</p>}
          <div className="flex gap-3">
            <button
              onClick={submitReview}
              disabled={submitting}
              className="bg-accent hover:bg-accent-hover text-white text-xs font-mono px-5 py-2 rounded transition-colors disabled:opacity-50 cursor-pointer"
            >
              {submitting ? "Soumission..." : "Soumettre la review"}
            </button>
            <button
              onClick={() => { setShowForm(false); setError(""); }}
              className="border border-border text-text-secondary hover:text-text-primary text-xs font-mono px-5 py-2 rounded transition-colors bg-transparent cursor-pointer"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-4">
          <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-xs text-text-muted text-center py-4">Aucune review pour l'instant. Soyez le premier à scorer cette publication.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border border-border rounded p-4 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-mono text-text-primary">{review.reviewer_name}</p>
                  <a
                    href={`https://orcid.org/${review.reviewer_orcid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xs font-mono text-accent no-underline"
                  >
                    orcid.org/{review.reviewer_orcid}
                  </a>
                </div>
                <div className="text-right">
                  <span className="text-lg font-mono font-semibold text-text-primary">
                    {Math.round(review.global_score * 100)}%
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {CRITERIA.map(({ key, label }) => (
                  <div key={key} className="bg-surface-2 rounded p-2 text-center">
                    <p className="text-2xs font-mono text-text-muted mb-1">{label}</p>
                    <p className="text-sm font-mono text-text-primary">{review[key as keyof Review]}/5</p>
                  </div>
                ))}
              </div>
              {review.flag !== "none" && (
                <p className="text-2xs font-mono text-amber-400">{FLAG_LABELS[review.flag]}</p>
              )}
              {review.comment && (
                <p className="text-xs text-text-secondary leading-relaxed">{review.comment}</p>
              )}
              {review.is_conflict_of_interest && (
                <p className="text-2xs font-mono text-amber-400">⚠️ Même institution — conflit d'intérêt possible</p>
              )}
              <p className="text-2xs font-mono text-text-muted">
                {new Date(review.created_at).toLocaleDateString("fr-FR")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
