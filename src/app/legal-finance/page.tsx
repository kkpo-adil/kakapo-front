import Link from "next/link";

export default function LegalFinancePage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <p className="text-2xs font-mono uppercase tracking-widest mb-4" style={{ color: "#B45309" }}>For Legal & Finance</p>
      <h1 className="text-3xl font-display text-text-primary mb-4 leading-tight">
        Preuve cryptographique scientifique, pour vos dossiers les plus sensibles.
      </h1>
      <p className="text-base text-text-secondary leading-relaxed mb-8 max-w-xl mx-auto">
        Datation immuable, intégrité vérifiable, export PDF signé. Cette page est en cours de finalisation.
      </p>
      <a href="mailto:partnerships@kakapo.io"
        className="no-underline inline-block text-sm font-mono px-6 py-3 rounded border transition-colors"
        style={{ borderColor: "#B45309", color: "#B45309" }}>
        Nous contacter — partnerships@kakapo.io
      </a>
    </div>
  );
}
