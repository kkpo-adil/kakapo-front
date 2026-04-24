"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [profile, setProfile] = useState<{ display_name: string; orcid_id: string } | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      return;
    }
    localStorage.setItem("kakapo_token", token);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        setProfile(data);
        setStatus("success");
        setTimeout(() => router.push("/publications"), 2000);
      })
      .catch(() => setStatus("error"));
  }, [searchParams, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-mono text-text-muted">Connexion en cours...</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-sm font-mono text-red-400">Erreur de connexion</p>
          <Link href="/" className="text-xs font-mono text-accent hover:underline">Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-trust-high/20 flex items-center justify-center mx-auto">
          <span className="text-trust-high text-xl">✓</span>
        </div>
        <p className="text-sm font-mono text-text-primary">
          Connecté en tant que <span className="text-accent">{profile?.display_name}</span>
        </p>
        <p className="text-xs font-mono text-text-muted">ORCID : {profile?.orcid_id}</p>
        <p className="text-xs font-mono text-text-muted">Redirection en cours...</p>
      </div>
    </div>
  );
}
