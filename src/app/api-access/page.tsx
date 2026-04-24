"use client";

export default function ApiAccessPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 rounded px-3 py-1 mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span className="text-2xs font-mono text-accent uppercase tracking-widest">API KAKAPO</span>
      </div>
      <h1 className="text-2xl font-display text-text-primary mb-4">Accès API</h1>
      <p className="text-sm text-text-secondary leading-relaxed mb-10 max-w-2xl">Connectez votre système d'IA à une base de connaissances scientifiques certifiées. Vérifiez l'intégrité d'une source, interrogez un KPT, obtenez un score de fiabilité — en temps réel.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border mb-10">
        {[
          { endpoint: "GET /publications/", desc: "Lister les publications indexées" },
          { endpoint: "POST /integrity/verify", desc: "Vérifier l'intégrité d'un contenu par DOI + hash" },
          { endpoint: "GET /kpt/{kpt_id}", desc: "Obtenir les détails d'un KPT" },
          { endpoint: "GET /trust/score/{id}", desc: "Obtenir le score de fiabilité d'une publication" },
        ].map((item) => (
          <div key={item.endpoint} className="bg-surface-1 p-5">
            <code className="text-xs font-mono text-accent block mb-2">{item.endpoint}</code>
            <p className="text-xs text-text-muted">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="bg-surface-2 border border-border rounded p-5">
        <p className="text-xs font-mono text-text-muted mb-3">Documentation complète</p>
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}/docs`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-accent hover:text-accent-hover no-underline"
        >
          {`${process.env.NEXT_PUBLIC_API_URL}/docs`} →
        </a>
      </div>
    </div>
  );
}
