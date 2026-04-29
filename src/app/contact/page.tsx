import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <Link href="/" className="text-xs font-mono text-text-muted hover:text-accent no-underline">← Accueil</Link>
      <div className="mt-8 mb-2 text-2xs font-mono text-accent uppercase tracking-widest">Partenariat éditeur</div>
      <h1 className="text-3xl font-display text-text-primary mb-4 leading-tight">Certifiez votre corpus scientifique</h1>
      <p className="text-base text-text-secondary leading-relaxed mb-10">
        KAKAPO propose aux éditeurs scientifiques un partenariat de certification. L'émission de KPT est gratuite. Vous recevez 70% des revenus générés par les requêtes IA sur votre corpus.
      </p>

      <div className="grid grid-cols-1 gap-4 mb-10">
        {[
          { title: "Émission KPT gratuite", desc: "Certification de votre corpus sans frais d'émission. Rétro-certification batch disponible dès la signature." },
          { title: "Revenue share 70/30", desc: "70% des revenus pay-per-query vous sont reversés mensuellement. Dashboard en temps réel." },
          { title: "Intégration simple", desc: "Webhook au moment du DOI ou batch sur archive existante. 2 à 4 semaines de mise en place." },
          { title: "Neutralité garantie", desc: "KAKAPO ne détient aucune licence sur votre contenu. Vous conservez l'intégralité de vos droits." },
        ].map(({ title, desc }) => (
          <div key={title} className="border border-border rounded-lg p-4">
            <h3 className="text-sm font-display text-text-primary mb-1">{title}</h3>
            <p className="text-xs text-text-muted leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface-3 border border-border rounded-lg p-6 space-y-4">
        <p className="text-sm font-display text-text-primary">Nous contacter</p>
        <p className="text-xs text-text-muted leading-relaxed">
          Envoyez-nous un email avec le nom de votre organisation et une description de votre corpus. Nous revenons vers vous sous 48h.
        </p>
        <div className="space-y-2">
          <a href="mailto:partnerships@kakapo.io"
            className="flex items-center gap-2 text-sm font-mono text-accent hover:text-accent-hover no-underline">
            partnerships@kakapo.io →
          </a>
          <p className="text-2xs text-text-muted font-mono">Réponse sous 48h</p>
        </div>
      </div>
    </div>
  );
}
