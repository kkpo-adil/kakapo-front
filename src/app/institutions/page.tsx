
export default function InstitutionsPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-4">For Research Institutions</p>
      <h1 className="text-3xl font-display text-text-primary mb-4 leading-tight">
        Site License KAKAPO, pour votre université ou institut.
      </h1>
      <p className="text-base text-text-secondary leading-relaxed mb-8 max-w-xl mx-auto">
        Accès fair-use à l'infrastructure KAKAPO pour vos chercheurs, vos laboratoires, vos consortiums. Cette page est en cours de finalisation.
      </p>
      <a href="mailto:partnerships@kakapo.io"
        className="no-underline inline-block text-sm font-mono px-6 py-3 rounded border border-accent text-accent hover:bg-accent hover:text-white transition-colors">
        Nous contacter — partnerships@kakapo.io
      </a>
    </div>
  );
}
