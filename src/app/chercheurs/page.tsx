import Link from "next/link";

export default function ChercheursPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">

      <div className="mb-16">
        <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-4">Chercheurs & Éditeurs</p>
        <h1 className="text-4xl font-display text-text-primary leading-tight mb-5 max-w-2xl">
          Votre recherche génère des revenus à chaque citation IA.
        </h1>
        <p className="text-base text-text-secondary leading-relaxed max-w-2xl mb-4">
          Chaque fois qu'un LLM cite votre publication via KAKAPO,
          vous recevez un micropaiement automatique.
          Pas d'abonnement. Pas de frais. Vous produisez — vous gagnez.
        </p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link href="/certifier"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-mono px-6 py-3 rounded transition-colors no-underline">
            Certifier ma publication →
          </Link>
          <Link href="/publications"
            className="inline-flex items-center gap-2 border border-border hover:border-accent/30 text-text-secondary hover:text-text-primary text-sm font-mono px-6 py-3 rounded transition-colors no-underline">
            Vérifier si ma publication est certifiée
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-xl overflow-hidden mb-16">
        <div className="bg-surface-1 p-8">
          <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-3">i-KPT</p>
          <h2 className="text-lg font-display text-text-primary mb-3">
            Publication via éditeur partenaire
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-5">
            Votre éditeur est partenaire KAKAPO. Votre publication est automatiquement
            certifiée avec le texte intégral. Vous et votre éditeur êtes rémunérés
            à chaque accès par un LLM.
          </p>
          <div className="space-y-2 mb-6">
            <p className="text-2xs text-text-muted">✓ Certification automatique via l'éditeur</p>
            <p className="text-2xs text-text-muted">✓ Revenue share avec votre éditeur</p>
            <p className="text-2xs text-text-muted">✓ Hash SHA-256 du texte intégral</p>
            <p className="text-2xs text-text-muted">✓ Aucune démarche requise de votre part</p>
          </div>
          <Link href="/publications"
            className="text-2xs font-mono text-accent hover:text-accent-hover no-underline">
            Vérifier si ma publication est certifiée →
          </Link>
        </div>

        <div className="bg-surface-1 p-8">
          <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-3">KPT</p>
          <h2 className="text-lg font-display text-text-primary mb-3">
            Dépôt direct sur KAKAPO
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-5">
            Déposez directement votre preprint ou publication Open Access.
            Validation par les pairs. Certification en 24h.
            Vous êtes rémunéré directement — sans intermédiaire.
          </p>
          <div className="space-y-2 mb-6">
            <p className="text-2xs text-text-muted">✓ Validation par les pairs sur KAKAPO</p>
            <p className="text-2xs text-text-muted">✓ Revenu direct sans intermédiaire</p>
            <p className="text-2xs text-text-muted">✓ Niveau de confiance maximum</p>
            <p className="text-2xs text-text-muted">✓ Certification en 24h</p>
          </div>
          <Link href="/certifier"
            className="text-2xs font-mono text-accent hover:text-accent-hover no-underline">
            Déposer ma publication →
          </Link>
        </div>
      </div>

      <div className="border border-border rounded-xl p-8 mb-16">
        <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-8">
          KAKAPO certifie le parcours complet d'un article
        </p>
        <p className="text-sm text-text-secondary leading-relaxed max-w-2xl mb-8">
          Un article scientifique a souvent deux vies : le preprint déposé sur arXiv ou bioRxiv,
          puis la publication finale peer-reviewed dans un journal.
          KAKAPO lie les deux versions et certifie chaque étape du parcours.
        </p>
        <div className="divide-y divide-border">
          <div className="py-6 flex gap-6">
            <span className="text-2xl font-display font-bold text-accent flex-shrink-0 w-8">01</span>
            <div>
              <p className="text-sm font-semibold text-text-primary mb-1">Preprint déposé sur arXiv / bioRxiv</p>
              <p className="text-sm text-text-secondary">
                KAKAPO certifie le contenu avec hash SHA-256 et horodatage cryptographique.
                C'est la preuve d'antériorité — votre travail existait à cette date précise.
                Vous gardez vos droits. Vous êtes rémunéré à chaque citation.
              </p>
            </div>
          </div>
          <div className="py-6 flex gap-6">
            <span className="text-2xl font-display font-bold text-accent flex-shrink-0 w-8">02</span>
            <div>
              <p className="text-sm font-semibold text-text-primary mb-1">Publication finale dans un journal</p>
              <p className="text-sm text-text-secondary">
                KAKAPO certifie la version peer-reviewed et lie automatiquement
                le preprint à la publication finale via les métadonnées CrossRef.
                Le parcours complet de l'article est traçable et vérifiable.
              </p>
            </div>
          </div>
          <div className="py-6 flex gap-6">
            <span className="text-2xl font-display font-bold text-accent flex-shrink-0 w-8">03</span>
            <div>
              <p className="text-sm font-semibold text-text-primary mb-1">Les LLMs citent toujours la bonne version</p>
              <p className="text-sm text-text-secondary">
                KAKAPO sait quelle version a été citée, quand elle existait,
                et si le contenu a évolué entre le preprint et la publication finale.
                La réponse IA est précise, traçable et admissible.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-border rounded-xl p-8 bg-surface-2">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div>
            <h2 className="text-xl font-display text-text-primary mb-2">
              Votre publication est peut-être déjà certifiée.
            </h2>
            <p className="text-sm text-text-secondary max-w-lg">
              Plus de 40M de publications sont dans notre catalogue.
              Vérifiez si la vôtre est déjà certifiée et réclamez vos revenus.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/publications"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-mono px-5 py-2.5 rounded transition-colors no-underline">
              Vérifier mon DOI →
            </Link>
            <Link href="/certifier"
              className="inline-flex items-center gap-2 border border-border hover:border-accent/30 text-text-secondary text-sm font-mono px-5 py-2.5 rounded transition-colors no-underline">
              Déposer →
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
