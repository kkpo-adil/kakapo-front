import Link from "next/link";

export default function PublisherPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">

      <div className="mb-16">
        <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-4">
          Éditeurs scientifiques
        </p>
        <h1 className="text-3xl font-display text-text-primary leading-tight mb-5 max-w-2xl">
          Votre corpus génère des revenus à chaque accès par un LLM.
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
          KAKAPO certifie vos publications et reverse une part des revenus
          générés à chaque fois qu'un système IA interroge votre corpus.
          Vous ne distribuez pas vos contenus — vous les certifiez.
          La différence est structurelle.
        </p>
      </div>

      <div className="divide-y divide-border mb-16">

        <div className="py-8">
          <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-3">
            Ce que KAKAPO certifie
          </p>
          <p className="text-sm text-text-secondary leading-relaxed max-w-xl mb-4">
            Hash SHA-256 du texte intégral. Signature RSA-PSS. Horodatage vérifiable.
            Métadonnées CrossRef enrichies — auteurs ORCID, MeSH, grants, références.
            Chaque publication certifiée reçoit un identifiant unique traçable.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Hash", value: "SHA-256 texte intégral" },
              { label: "Signature", value: "RSA-PSS vérifiable" },
              { label: "Métadonnées", value: "ORCID · MeSH · CrossRef" },
              { label: "Identifiant", value: "i-KPT unique par publication" },
            ].map(({ label, value }) => (
              <div key={label} className="border border-border rounded p-4">
                <p className="text-2xs text-text-muted mb-1">{label}</p>
                <p className="text-sm text-text-primary font-mono">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="py-8">
          <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-3">
            Le modèle économique
          </p>
          <p className="text-sm text-text-secondary leading-relaxed max-w-xl mb-4">
            Chaque accès à une publication certifiée par un LLM génère
            une Verified Operation (VO) à 0,40 USD.
            KAKAPO reverse une part directement à l'éditeur partenaire.
            Les producteurs de connaissance ne paient jamais —
            les consommateurs industriels paient l'accès.
          </p>
          <div className="border-l-2 border-border pl-4">
            <p className="text-2xs text-text-muted mb-2">Principe</p>
            <p className="text-sm text-text-secondary">
              0,40 USD par Verified Operation.
              Revenue share reversé à l'éditeur selon le volume d'accès
              généré par son corpus.
              Transparent. Traçable. Automatique.
            </p>
          </div>
        </div>

        <div className="py-8">
          <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-3">
            Ce que vous ne faites pas
          </p>
          <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
            Vous ne distribuez pas vos contenus aux LLMs.
            Vous ne cédez pas vos droits.
            KAKAPO certifie l'authenticité et la provenance —
            le contenu reste chez vous.
            Les LLMs accèdent à la preuve cryptographique,
            pas au texte brut.
          </p>
        </div>

        <div className="py-8">
          <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-3">
            Intégration
          </p>
          <p className="text-sm text-text-secondary leading-relaxed max-w-xl mb-4">
            KAKAPO ingère votre corpus via DOI et API CrossRef.
            Aucun développement requis de votre côté.
            Chaque nouvelle publication est certifiée automatiquement
            dès qu'elle est indexée.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Source", value: "DOI + CrossRef API" },
              { label: "Développement", value: "zéro côté éditeur" },
              { label: "Délai", value: "< 48h pour certification" },
              { label: "Suivi", value: "dashboard en temps réel" },
            ].map(({ label, value }) => (
              <div key={label} className="border border-border rounded p-4">
                <p className="text-2xs text-text-muted mb-1">{label}</p>
                <p className="text-sm text-text-primary font-mono">{value}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="border border-border rounded-xl p-8">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div>
            <p className="text-sm font-display text-text-primary mb-1">
              Devenir éditeur partenaire KAKAPO.
            </p>
            <p className="text-sm text-text-secondary max-w-sm">
              Pour discuter d'une intégration ou obtenir une estimation
              des revenus potentiels sur votre corpus.
            </p>
          </div>
          <a href="mailto:partnerships@kakapo.io?subject=Partenariat éditeur KAKAPO"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-mono px-6 py-3 rounded transition-colors no-underline flex-shrink-0">
            Nous contacter →
          </a>
        </div>
      </div>

    </div>
  );
}
