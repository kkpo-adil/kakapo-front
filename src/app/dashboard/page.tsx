"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Publication {
  id: string;
  title: string;
  doi: string | null;
  source: string | null;
  submitted_at: string | null;
  kpt_id: string | null;
  kpt_status: string | null;
  verifications: number;
  ai_queries: number;
}

interface Dashboard {
  profile: { display_name: string; orcid_id: string; is_verified: boolean };
  quota: { monthly_quota: number; used: number; remaining: number; period_end: string | null };
  stats: { total_publications: number; total_kpts: number; total_verifications: number; total_ai_queries: number };
  publications: Publication[];
}

function decodeJWT(token: string) {
  try { return JSON.parse(atob(token.split(".")[1])); } catch { return null; }
}

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("kakapo_token");
    if (!token) { router.push("/"); return; }
    const payload = decodeJWT(token);
    if (!payload) { router.push("/"); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => { if (!r.ok) throw new Error("Erreur dashboard"); return r.json(); })
      .then((d) => { setData(d); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, [router]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error || !data) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm font-mono text-red-400">{error || "Erreur"}</p>
    </div>
  );

  const quotaPct = data.quota.monthly_quota > 0
    ? Math.round(data.quota.used / data.quota.monthly_quota * 100)
    : 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 rounded px-3 py-1 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-2xs font-mono text-accent uppercase tracking-widest">Dashboard Scientifique</span>
          </div>
          <h1 className="text-2xl font-display text-text-primary">{data.profile.display_name}</h1>
          <a href={`https://orcid.org/${data.profile.orcid_id}`} target="_blank" rel="noopener noreferrer"
            className="text-xs font-mono text-accent no-underline">
            orcid.org/{data.profile.orcid_id}
          </a>
        </div>
        <Link href="/certifier"
          className="no-underline bg-accent hover:bg-accent-hover text-white text-xs font-mono px-5 py-2.5 rounded transition-colors">
          + Certifier une publication
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mb-10">
        {[
          { label: "Publications", value: data.stats.total_publications },
          { label: "KPTs actifs", value: data.stats.total_kpts },
          { label: "Vérifications", value: data.stats.total_verifications },
          { label: "Requêtes IA", value: data.stats.total_ai_queries },
        ].map(({ label, value }) => (
          <div key={label} className="bg-surface-1 p-5">
            <p className="text-2xl font-mono font-semibold text-text-primary tabular-nums">{value}</p>
            <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6 mb-10">
        <div className="border border-border rounded p-5">
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-4">Quota certifications ce mois</p>
          <div className="flex justify-between text-xs font-mono text-text-secondary mb-2">
            <span>{data.quota.used} utilisées</span>
            <span>{data.quota.remaining} restantes / {data.quota.monthly_quota}</span>
          </div>
          <div className="h-2 bg-surface-3 rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${quotaPct}%` }} />
          </div>
          <p className="text-2xs text-text-muted mt-2">Gratuit pour les chercheurs identifiés — renouvellement mensuel</p>
        </div>
        <div className="border border-border rounded p-5 space-y-3">
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest">Actions</p>
          <Link href="/profile" className="block text-xs font-mono border border-border rounded px-3 py-2 text-text-secondary hover:text-accent hover:border-accent/40 transition-colors no-underline">
            Modifier le profil →
          </Link>
          <Link href="/publications" className="block text-xs font-mono border border-border rounded px-3 py-2 text-text-secondary hover:text-accent hover:border-accent/40 transition-colors no-underline">
            Explorer les publications →
          </Link>
          <Link href="/verify" className="block text-xs font-mono border border-border rounded px-3 py-2 text-text-secondary hover:text-accent hover:border-accent/40 transition-colors no-underline">
            Vérifier un KPT →
          </Link>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-display text-text-primary mb-4">Mes publications certifiées</h2>
        {data.publications.length === 0 ? (
          <div className="border border-border rounded p-10 text-center">
            <p className="text-sm text-text-muted mb-4">Aucune publication certifiée.</p>
            <Link href="/certifier" className="no-underline text-xs font-mono text-accent hover:underline">
              Certifier ma première publication →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {data.publications.map((pub) => (
              <div key={pub.id} className="border border-border rounded p-5 hover:border-border-strong transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {pub.source && (
                        <span className="text-2xs font-mono text-accent border border-accent/20 rounded px-2 py-0.5 uppercase">
                          {pub.source}
                        </span>
                      )}
                      {pub.kpt_status && (
                        <span className={`text-2xs font-mono border rounded px-2 py-0.5 uppercase ${
                          pub.kpt_status === "active" ? "text-trust-high border-trust-high/30" : "text-text-muted border-border"
                        }`}>
                          ● {pub.kpt_status}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-display text-text-primary mb-1 line-clamp-2">{pub.title}</h3>
                    {pub.doi && (
                      <p className="text-2xs font-mono text-text-muted">{pub.doi}</p>
                    )}
                  </div>
                  <div className="flex-shrink-0 text-right space-y-1">
                    <div className="text-xs font-mono text-text-muted">
                      <span className="text-text-primary font-semibold">{pub.verifications}</span> vérif.
                    </div>
                    <div className="text-xs font-mono text-text-muted">
                      <span className="text-text-primary font-semibold">{pub.ai_queries}</span> requêtes IA
                    </div>
                  </div>
                </div>
                {pub.kpt_id && (
                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between gap-4">
                    <code className="text-2xs font-mono text-text-muted">{pub.kpt_id}</code>
                    <Link href={`/verify?kpt_id=${pub.kpt_id}`}
                      className="no-underline text-2xs font-mono text-accent hover:text-accent-hover">
                      Vérifier →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
