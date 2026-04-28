import Link from "next/link";

export default function AboutKPTPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/" className="text-xs font-mono text-text-muted hover:text-accent no-underline">← Accueil</Link>
      <div className="mt-8 mb-2 text-2xs font-mono text-accent uppercase tracking-widest">Proof of Knowledge Token</div>
      <h1 className="text-3xl font-display text-text-primary mb-6 leading-tight">Qu'est-ce qu'un KPT ?</h1>
      <p className="text-base text-text-secondary leading-relaxed mb-10">
        Un KPT (Proof of Knowledge Token) est un certificat cryptographique non transférable qui prouve qu'une publication scientifique existait à un instant précis, avec un contenu précis, sous l'identité d'un auteur précis.
      </p>

      <div className="space-y-8">
        {[
          {
            title: "Antériorité",
            desc: "Le KPT est horodaté au moment de son émission. Il constitue une preuve légale que le contenu existait avant cette date. Utile en cas de litige de propriété intellectuelle ou de revendication de priorité scientifique.",
          },
          {
            title: "Intégrité",
            desc: "Le KPT contient un hash SHA-256 du contenu certifié. Si le contenu est modifié — même d'un seul caractère — le hash ne correspond plus. La falsification est immédiatement détectable.",
          },
          {
            title: "Traçabilité",
            desc: "Chaque KPT est lié à un identifiant ORCID d'auteur, un DOI de publication, et une version numérotée. L'historique des versions est conservé. Une rétractation ou une mise à jour génère une nouvelle version, pas une suppression.",
          },
          {
            title: "Non transférabilité",
            desc: "Un KPT ne peut pas être vendu, cédé ou transféré. Il reste attaché à la publication et à l'auteur qui l'a émis. Cela garantit l'authenticité de la chaîne de certification.",
          },
          {
            title: "Vérification publique",
            desc: "N'importe qui — chercheur, système IA, cabinet juridique — peut vérifier un KPT via l'API KAKAPO ou l'interface publique. La vérification est instantanée et ne nécessite pas de compte.",
          },
        ].map(({ title, desc }) => (
          <div key={title} className="border-l-2 border-accent/30 pl-5">
            <h3 className="text-sm font-display text-text-primary mb-2">{title}</h3>
            <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-surface-3 border border-border rounded-lg">
        <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-3">Format d'un KPT ID</p>
        <code className="text-sm font-mono text-accent">KPT-7D77451C-v1-35186C6C</code>
        <p className="text-xs text-text-muted mt-3 leading-relaxed">
          Publication ID (tronqué) — Version — Hash de vérification (tronqué)
        </p>
      </div>

      <div className="mt-8 flex gap-4">
        <Link href="/verify" className="no-underline inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm px-5 py-2.5 rounded transition-colors">
          Vérifier un KPT →
        </Link>
        <Link href="/certifier" className="no-underline inline-flex items-center gap-2 border border-border hover:border-accent/40 text-text-secondary hover:text-accent text-sm px-5 py-2.5 rounded transition-colors">
          Certifier une publication
        </Link>
      </div>
    </div>
  );
}
