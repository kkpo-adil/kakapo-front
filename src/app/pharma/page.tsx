import Link from "next/link";
import { EnterpriseTierCard } from "@/components/enterprise/EnterpriseTierCard";

export default function PharmaPage() {
  return (
    <div>
      <section className="border-b border-border bg-surface-2">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p className="text-2xs font-mono uppercase tracking-widest mb-4" style={{ color: "#0F766E" }}>For Pharma & Biotech</p>
          <h1 className="text-4xl font-display text-text-primary mb-5 max-w-2xl leading-tight">Provenance scientifique opposable, pour vos dossiers réglementaires.</h1>
          <p className="text-base text-text-secondary leading-relaxed mb-8 max-w-2xl">
            Réduisez de 70 % le temps de validation manuelle de sources scientifiques. KPT cryptographique intégrable dans vos dossiers FDA, EMA, ANSM.
          </p>
          <Link href="/pharma/contact" className="no-underline inline-block text-white text-sm font-mono px-6 py-3 rounded transition-colors" style={{ background: "#0F766E" }}>Request a regulatory demo</Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-2xs font-mono uppercase tracking-widest mb-2" style={{ color: "#0F766E" }}>Cas d&apos;usage</p>
        <h2 className="text-2xl font-display text-text-primary mb-8">4 use cases couverts.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Dossiers d'autorisation FDA / EMA", desc: "Versez les KPT en preuve d'antériorité et d'intégrité des sources scientifiques citées dans vos dossiers." },
            { title: "Periodic Safety Update Reports (PSUR)", desc: "Traçabilité cryptographique des sources de pharmacovigilance. Audit trail signé." },
            { title: "Audit des claims marketing médicaux", desc: "Vérification automatique de l'antériorité et de l'intégrité des publications citées dans vos supports promotionnels médicaux." },
            { title: "Veille concurrentielle structurée", desc: "Surveillez les publications scientifiques par pathologie, indication, principe actif, avec certification d'antériorité." },
          ].map(({ title, desc }) => (
            <div key={title} className="border border-border rounded-lg p-5" style={{ borderLeft: "3px solid #0F766E" }}>
              <h3 className="text-sm font-display text-text-primary mb-2">{title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-display mb-10 text-center" style={{ color: "#F5D98B" }}>Combien KAKAPO vous fait économiser</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {[
              { value: "100 €/h", legend: "Coût horaire chargé d'un pharmacien réglementaire ou medical writer senior." },
              { value: "20 min", legend: "Temps moyen de vérification manuelle d'une source scientifique." },
              { value: "70–90 %", legend: "Réduction de la charge de validation humaine sur les sources tracées par KPT." },
            ].map(({ value, legend }) => (
              <div key={value} className="text-center">
                <p className="text-4xl font-display mb-3" style={{ color: "#F5D98B" }}>{value}</p>
                <p className="text-sm text-slate-300 leading-relaxed">{legend}</p>
              </div>
            ))}
          </div>
          <div className="border border-slate-700 rounded-lg p-6 text-center max-w-2xl mx-auto">
            <p className="text-sm text-slate-300 leading-relaxed">Pour une équipe de 10 medical writers traitant 200 sources par semaine, KAKAPO représente une économie estimée de <strong className="text-white">200 000 à 350 000 € par an</strong> — pour un coût KAKAPO largement inférieur.</p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="border rounded-lg p-6 mb-12" style={{ borderColor: "#B45309", borderLeftWidth: "4px" }}>
          <h3 className="text-lg font-display text-text-primary mb-4">Module Compliance — pour vos dossiers réglementaires</h3>
          <ul className="space-y-2 mb-4">
            {["Audit trail signé cryptographiquement, exportable", "Exports 21 CFR Part 11 ready", "Versionnage opposable des consultations", "Provenance reports horodatés au format PDF signé"].map(item => (
              <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                <span style={{ color: "#B45309" }}>✓</span> {item}
              </li>
            ))}
          </ul>
          <p className="text-xs text-text-muted italic">Module disponible sur les abonnements Big Pharma, Mid Pharma et Biotech & Devices.</p>
        </div>
        <p className="text-2xs font-mono uppercase tracking-widest mb-2" style={{ color: "#0F766E" }}>Formules</p>
        <h2 className="text-2xl font-display text-text-primary mb-8">3 formules adaptées à votre structure.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <EnterpriseTierCard tierName="Big Pharma" tierTagline="Top 25 mondial" description="R&D > 5 Md USD. Corpus massif, exigences réglementaires maximales." components={["Enterprise License", "Verified Operations quota", "Compliance Module inclus", "Audit trail FDA/EMA"]} engagement="24 mois" ctaLabel="Talk to our regulatory team" ctaHref="/pharma/contact" accent="pharma" />
          <EnterpriseTierCard tierName="Mid Pharma" tierTagline="Pharma régionaux" description="R&D 500 M – 5 Md USD. Spécialisation thérapeutique, cycle réglementaire actif." components={["Enterprise License", "Verified Operations quota", "Compliance Module en option", "Audit trail"]} engagement="24 mois" ctaLabel="Talk to our regulatory team" ctaHref="/pharma/contact" accent="pharma" />
          <EnterpriseTierCard tierName="Biotech & Devices" tierTagline="Biotechs & dispositifs" description="Biotechs en croissance, dispositifs médicaux, diagnostics." components={["Starter License", "Verified Operations quota", "Compliance Module en option"]} engagement="12 mois" ctaLabel="Talk to our regulatory team" ctaHref="/pharma/contact" accent="pharma" />
        </div>
      </section>

      <section className="border-t border-border bg-surface-3">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-display text-text-primary mb-3">Voyez KAKAPO appliqué à votre cas d&apos;usage.</h2>
          <p className="text-sm text-text-secondary mb-8 max-w-xl mx-auto">Notre équipe regulatory affairs vous accompagne sur une démo personnalisée.</p>
          <Link href="/pharma/contact" className="no-underline text-white text-sm font-mono px-8 py-3 rounded transition-colors" style={{ background: "#0F766E" }}>Demander une démo →</Link>
        </div>
      </section>
    </div>
  );
}
