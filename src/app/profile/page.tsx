"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Profile {
  id: string;
  display_name: string;
  orcid_id: string;
  email: string | null;
  bio: string | null;
  primary_domain: string | null;
  affiliation_raw: string | null;
  institution_ror: string | null;
  is_verified: boolean;
  created_at: string;
}

const DOMAINS = [
  "Biologie", "Chimie", "Physique", "Mathématiques", "Informatique",
  "Médecine", "Pharmacologie", "Neurosciences", "Écologie", "Sciences de la Terre",
  "Sciences humaines", "Économie", "Droit", "Autre",
];

function decodeJWT(token: string) {
  try { return JSON.parse(atob(token.split(".")[1])); } catch { return null; }
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Partial<Profile>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("kakapo_token");
    if (!token) { router.push("/"); return; }
    const payload = decodeJWT(token);
    if (!payload) { router.push("/"); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => { if (!r.ok) throw new Error("Session expirée"); return r.json(); })
      .then((data) => { setProfile(data); setForm(data); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, [router]);

  async function save() {
    const token = localStorage.getItem("kakapo_token");
    if (!token || !profile) return;
    setSaving(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          display_name: form.display_name,
          email: form.email,
          bio: form.bio,
          primary_domain: form.primary_domain,
          affiliation_raw: form.affiliation_raw,
          institution_ror: form.institution_ror,
        }),
      });
      if (!res.ok) throw new Error("Erreur sauvegarde");
      const updated = await res.json();
      setProfile(updated as Profile);
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error || !profile) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <p className="text-sm font-mono text-red-400">{error || "Profil introuvable"}</p>
        <Link href="/" className="text-xs font-mono text-accent hover:underline">Retour</Link>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-14">
      <div className="flex items-center justify-between mb-8">
        <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 rounded px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="text-2xs font-mono text-accent uppercase tracking-widest">Profil Scientifique</span>
        </div>
        {saved && (
          <span className="text-xs font-mono text-trust-high border border-trust-high/30 rounded px-3 py-1">
            ✓ Profil mis à jour
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-display text-text-primary mb-1">{profile.display_name}</h1>
            <a href={`https://orcid.org/${profile.orcid_id}`} target="_blank" rel="noopener noreferrer"
              className="text-xs font-mono text-accent hover:text-accent-hover no-underline">
              orcid.org/{profile.orcid_id}
            </a>
          </div>

          {!editing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
                {[
                  { label: "Statut", value: profile.is_verified ? "Vérifié ORCID" : "Non vérifié" },
                  { label: "Domaine", value: profile.primary_domain || "Non renseigné" },
                  { label: "Affiliation", value: profile.affiliation_raw || "Non renseignée" },
                  { label: "Email", value: profile.email || "Non renseigné" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-surface-1 p-4">
                    <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-1">{label}</p>
                    <p className="text-sm text-text-primary">{value}</p>
                  </div>
                ))}
              </div>
              {profile.bio && (
                <div className="bg-surface-2 border border-border rounded p-4">
                  <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-2">Bio</p>
                  <p className="text-sm text-text-secondary leading-relaxed">{profile.bio}</p>
                </div>
              )}
              <button onClick={() => setEditing(true)}
                className="text-xs font-mono border border-border rounded px-4 py-2 text-text-secondary hover:text-accent hover:border-accent/40 transition-colors bg-transparent cursor-pointer">
                Modifier le profil
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-3">
                {[
                  { key: "display_name", label: "Nom affiché", type: "text" },
                  { key: "email", label: "Email institutionnel", type: "email" },
                  { key: "affiliation_raw", label: "Affiliation", type: "text" },
                  { key: "institution_ror", label: "ROR Institution (URL)", type: "text" },
                ].map(({ key, label, type }) => (
                  <div key={key}>
                    <label className="text-2xs font-mono text-text-muted uppercase tracking-widest block mb-1">{label}</label>
                    <input
                      type={type}
                      value={(form[key as keyof Profile] as string) || ""}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="w-full bg-surface-2 border border-border rounded px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-2xs font-mono text-text-muted uppercase tracking-widest block mb-1">Domaine principal</label>
                  <select
                    value={form.primary_domain || ""}
                    onChange={(e) => setForm({ ...form, primary_domain: e.target.value })}
                    className="w-full bg-surface-2 border border-border rounded px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent/50"
                  >
                    <option value="">Sélectionner un domaine</option>
                    {DOMAINS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-2xs font-mono text-text-muted uppercase tracking-widest block mb-1">Bio courte</label>
                  <textarea
                    value={form.bio || ""}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    rows={3}
                    maxLength={500}
                    className="w-full bg-surface-2 border border-border rounded px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 resize-none"
                    placeholder="En quelques mots, décrivez vos travaux..."
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={save} disabled={saving}
                  className="bg-accent hover:bg-accent-hover text-white text-xs font-mono px-5 py-2 rounded transition-colors disabled:opacity-50 cursor-pointer">
                  {saving ? "Sauvegarde..." : "Sauvegarder"}
                </button>
                <button onClick={() => { setEditing(false); setForm(profile); }}
                  className="border border-border text-text-secondary hover:text-text-primary text-xs font-mono px-5 py-2 rounded transition-colors bg-transparent cursor-pointer">
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="border border-border rounded p-5 space-y-3">
            <p className="text-xs font-mono text-text-muted uppercase tracking-widest">Actions</p>
            <Link href="/certifier"
              className="block text-center text-xs font-mono border border-accent/40 rounded px-3 py-2 text-accent hover:bg-accent/10 transition-colors no-underline">
              Certifier une publication →
            </Link>
            <Link href="/publications"
              className="block text-center text-xs font-mono border border-border rounded px-3 py-2 text-text-secondary hover:text-accent hover:border-accent/40 transition-colors no-underline">
              Voir les publications →
            </Link>
          </div>
          <div className="border border-border rounded p-5">
            <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">Niveau de vérification</p>
            <div className="space-y-2">
              {[
                { label: "ORCID connecté", done: true },
                { label: "Email vérifié", done: !!profile.email },
                { label: "Affiliation renseignée", done: !!profile.affiliation_raw },
                { label: "Domaine renseigné", done: !!profile.primary_domain },
              ].map(({ label, done }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${done ? "bg-trust-high" : "bg-surface-4"}`} />
                  <span className={`text-xs font-mono ${done ? "text-text-secondary" : "text-text-muted"}`}>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-border rounded p-5">
            <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-2">Membre depuis</p>
            <p className="text-sm font-mono text-text-primary">
              {new Date(profile.created_at).toLocaleDateString("fr-FR", { year: "numeric", month: "long" })}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
