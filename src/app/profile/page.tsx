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
  is_verified: boolean;
  created_at: string;
}

function decodeJWT(token: string): { name?: string; orcid?: string; sub?: string } | null {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("kakapo_token");
    if (!token) {
      router.push("/");
      return;
    }
    const payload = decodeJWT(token);
    if (!payload) {
      router.push("/");
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error("Session expirée");
        return r.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-sm font-mono text-red-400">{error || "Profil introuvable"}</p>
          <Link href="/" className="text-xs font-mono text-accent hover:underline">Retour</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-14">
      <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 rounded px-3 py-1 mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        <span className="text-2xs font-mono text-accent uppercase tracking-widest">Profil Scientifique</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-display text-text-primary mb-1">{profile.display_name}</h1>
            <a
              href={`https://orcid.org/${profile.orcid_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-accent hover:text-accent-hover no-underline"
            >
              orcid.org/{profile.orcid_id}
            </a>
          </div>

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
        </div>

        <aside className="space-y-4">
          <div className="border border-border rounded p-5 space-y-3">
            <p className="text-xs font-mono text-text-muted uppercase tracking-widest">Actions</p>
            <Link
              href="/certifier"
              className="block text-center text-xs font-mono border border-accent/40 rounded px-3 py-2 text-accent hover:bg-accent/10 transition-colors no-underline"
            >
              Certifier une publication →
            </Link>
            <Link
              href="/publications"
              className="block text-center text-xs font-mono border border-border rounded px-3 py-2 text-text-secondary hover:text-accent hover:border-accent/40 transition-colors no-underline"
            >
              Voir les publications →
            </Link>
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
