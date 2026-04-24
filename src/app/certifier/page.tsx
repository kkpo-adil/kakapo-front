"use client";

export default function CertifierPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-center">
      <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 rounded px-3 py-1 mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span className="text-2xs font-mono text-accent uppercase tracking-widest">Bientôt disponible</span>
      </div>
      <h1 className="text-2xl font-display text-text-primary mb-4">Certifier une publication</h1>
      <p className="text-sm text-text-secondary leading-relaxed mb-8">La certification de publications sera disponible prochainement. Connectez-vous avec votre identifiant ORCID pour être notifié à l'ouverture.</p>
      <a
        href={`${process.env.NEXT_PUBLIC_API_URL}/auth/orcid/login`}
        className="inline-flex items-center gap-2 border border-accent/40 rounded px-5 py-2.5 text-sm font-mono text-accent hover:bg-accent/10 transition-colors no-underline"
      >
        Se connecter avec ORCID
      </a>
    </div>
  );
}
