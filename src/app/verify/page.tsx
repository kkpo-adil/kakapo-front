import type { Metadata } from "next";
import Link from "next/link";
import { KPTVerifyForm } from "@/components/kpt/KPTVerifyForm";

export const metadata: Metadata = {
  title: "Vérifier un KPT",
  description: "Vérifiez l'intégrité et la validité d'un Knowledge Provenance Token KAKAPO.",
};

interface PageProps {
  searchParams: { kpt_id?: string };
}

export default function VerifyPage({ searchParams }: PageProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-text-muted mb-8">
        <Link href="/" className="hover:text-text-secondary">Accueil</Link>
        <span>/</span>
        <span>Vérifier</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">

        {/* ── Main form ─────────────────────────────────────────────── */}
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-display text-text-primary mb-2">
              Vérifier un KPT
            </h1>
            <p className="text-sm text-text-muted leading-relaxed">
              Entrez l'identifiant d'un Knowledge Provenance Token pour vérifier son
              intégrité, son statut et l'authenticité du contenu certifié.
            </p>
          </div>

          <div className="bg-surface-2 border border-border rounded-md p-6">
            <KPTVerifyForm initialKptId={searchParams.kpt_id ?? ""} />
          </div>
        </div>

        {/* ── Explanations ──────────────────────────────────────────── */}
        <aside className="space-y-6">
          <div className="bg-surface-2 border border-border rounded-md p-5 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-text-muted">
              Ce que vérifie KAKAPO
            </h2>
            <ul className="space-y-3">
              {[
                {
                  icon: "✓",
                  color: "text-trust-high",
                  title: "Statut actif",
                  desc:  "Le KPT n'a pas été révoqué, contesté ou supplanté.",
                },
                {
                  icon: "✓",
                  color: "text-trust-high",
                  title: "Intégrité du hash",
                  desc:  "Le hash SHA-256 du fichier correspond à celui enregistré au moment de la certification.",
                },
                {
                  icon: "✓",
                  color: "text-trust-high",
                  title: "Antériorité",
                  desc:  "La date d'émission du KPT est enregistrée et immuable.",
                },
              ].map(({ icon, color, title, desc }) => (
                <li key={title} className="flex gap-3">
                  <span className={`${color} font-mono text-sm flex-shrink-0 mt-0.5`}>{icon}</span>
                  <div>
                    <p className="text-xs text-text-primary font-medium">{title}</p>
                    <p className="text-xs text-text-muted leading-relaxed mt-0.5">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface-2 border border-border rounded-md p-5 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-text-muted">
              Statuts possibles
            </h2>
            <div className="space-y-2">
              {[
                { status: "active",     color: "text-trust-high", bg: "bg-trust-high-bg",  desc: "Le KPT est valide et actif." },
                { status: "challenged", color: "text-trust-mid",  bg: "bg-trust-mid-bg",   desc: "Le KPT est en cours de contestation." },
                { status: "revoked",    color: "text-trust-low",  bg: "bg-trust-low-bg",   desc: "Le KPT a été révoqué." },
                { status: "superseded", color: "text-text-muted", bg: "bg-surface-3",      desc: "Une nouvelle version a été émise." },
              ].map(({ status, color, bg, desc }) => (
                <div key={status} className="flex items-start gap-2">
                  <span className={`text-2xs font-mono uppercase px-1.5 py-0.5 rounded border ${color} ${bg} border-current/20 flex-shrink-0 mt-0.5`}>
                    {status}
                  </span>
                  <p className="text-2xs text-text-muted">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-2 border border-border rounded-md p-5">
            <h2 className="text-xs font-mono uppercase tracking-widest text-text-muted mb-3">
              Format KPT
            </h2>
            <code className="text-xs font-mono text-accent block bg-surface-3 border border-border rounded px-3 py-2">
              KPT-XXXXXXXX-v&lt;N&gt;-YYYYYYYY
            </code>
            <p className="text-2xs text-text-muted mt-2">
              Exemple : <span className="font-mono text-text-secondary">KPT-A1B2C3D4-v1-E5F6A7B8</span>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
