import Link from "next/link";

export default function AboutAPIPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/" className="text-xs font-mono text-text-muted hover:text-accent no-underline">← Accueil</Link>
      <div className="mt-8 mb-2 text-2xs font-mono text-accent uppercase tracking-widest">Accès machine</div>
      <h1 className="text-3xl font-display text-text-primary mb-6 leading-tight">API KAKAPO</h1>
      <p className="text-base text-text-secondary leading-relaxed mb-10">
        L'API KAKAPO permet à n'importe quel système — modèle de langage, pipeline R&D, outil d'audit — de vérifier une source scientifique avant de l'utiliser. Pay-per-query, latence inférieure à 200ms, réponse structurée.
      </p>

      <h2 className="text-lg font-display text-text-primary mb-4">Endpoints principaux</h2>
      <div className="space-y-3 mb-10">
        {[
          { method: "GET", endpoint: "/publications/", desc: "Lister les publications indexées avec filtres source, DOI, auteur." },
          { method: "GET", endpoint: "/trust/score/{id}", desc: "Obtenir le Trust Score et le breakdown détaillé d'une publication." },
          { method: "GET", endpoint: "/kpt/{kpt_id}", desc: "Vérifier un KPT : statut, hash certifié, version, date d'émission." },
          { method: "POST", endpoint: "/integrity/verify", desc: "Vérifier l'intégrité d'un contenu par DOI et hash SHA-256." },
          { method: "GET", endpoint: "/publications/crossref/{doi}", desc: "Enrichir les métadonnées d'un DOI via CrossRef." },
        ].map(({ method, endpoint, desc }) => (
          <div key={endpoint} className="border border-border rounded-lg p-4 flex gap-4">
            <span className={`text-2xs font-mono font-medium px-2 py-0.5 rounded self-start mt-0.5 ${method === "GET" ? "bg-accent/10 text-accent" : "bg-trust-high/10 text-trust-high"}`}>
              {method}
            </span>
            <div>
              <code className="text-xs font-mono text-text-primary block mb-1">{endpoint}</code>
              <p className="text-xs text-text-muted">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-display text-text-primary mb-4">Authentification</h2>
      <p className="text-sm text-text-muted leading-relaxed mb-4">
        Toutes les requêtes authentifiées utilisent un header <code className="font-mono text-accent">X-Client-API-Key</code>. Les requêtes de vérification publique (KPT, Trust Score) ne nécessitent pas d'authentification.
      </p>

      <div className="p-5 bg-surface-3 border border-border rounded-lg mb-8">
        <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-3">Exemple de réponse Trust Score</p>
        <pre className="text-xs font-mono text-text-secondary leading-relaxed overflow-auto">{`{
  "score": 0.72,
  "version": "3.0",
  "breakdown": {
    "source":   { "score": 0.70, "weight": 0.30 },
    "data":     { "score": 0.33, "weight": 0.20 },
    "citation": { "score": 0.99, "weight": 0.20 },
    "freshness":{ "score": 0.41, "weight": 0.15 },
    "consistency":{"score":1.00, "weight": 0.10 }
  },
  "interpretation": "Solide — signaux convergents"
}`}</pre>
      </div>

      <div className="flex gap-4">
        <Link href="/api-access" className="no-underline inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm px-5 py-2.5 rounded transition-colors">
          Créer une clé API →
        </Link>
        <a href={`${process.env.NEXT_PUBLIC_API_URL}/docs`} target="_blank" rel="noopener noreferrer"
          className="no-underline inline-flex items-center gap-2 border border-border hover:border-accent/40 text-text-secondary hover:text-accent text-sm px-5 py-2.5 rounded transition-colors">
          Documentation complète →
        </a>
      </div>
    </div>
  );
}
