import Link from "next/link";
import { EnterpriseTierCard } from "@/components/enterprise/EnterpriseTierCard";

export default function LLMPage() {
  return (
    <div>
      <section className="border-b border-border bg-surface-2">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-4">For AI Providers</p>
          <h1 className="text-4xl font-display text-text-primary mb-5 max-w-2xl leading-tight">Vendez une IA opposable.</h1>
          <p className="text-base text-text-secondary leading-relaxed mb-8 max-w-2xl">
            KAKAPO certifie chaque source utilisée par votre modèle. Ouvrez les marchés enterprise régulés que vous ne pouvez pas adresser sans elle.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link href="/llm/contact" className="no-underline bg-accent hover:bg-accent-hover text-white text-sm font-mono px-6 py-3 rounded transition-colors">Talk to our enterprise team</Link>
            <Link href="/api-access" className="no-underline border border-border hover:border-accent text-text-secondary hover:text-accent text-sm font-mono px-6 py-3 rounded transition-colors">Voir la documentation API</Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">Pourquoi les LLM choisissent KAKAPO</p>
        <h2 className="text-2xl font-display text-text-primary mb-8">Trois avantages structurels.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden">
          {[
            { title: "Sources opposables", desc: "Chaque réponse générée par votre modèle peut citer une source KPT-certifiée, vérifiable cryptographiquement, exploitable dans un contexte régulé." },
            { title: "Marchés enterprise débloqués", desc: "Pharma, legal, finance, secteurs régulés : ces clients ne peuvent pas consommer une IA non traçable. KAKAPO rend votre modèle éligible." },
            { title: "Latence < 200 ms", desc: "Infrastructure conçue pour l'inférence temps réel. Vérification cryptographique sans dégradation de l'expérience utilisateur." },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-surface-2 p-6">
              <h3 className="text-sm font-display text-text-primary mb-3">{title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-b border-border bg-surface-3">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">Niveaux d&apos;engagement</p>
          <h2 className="text-2xl font-display text-text-primary mb-8">Trois formules, aucun prix affiché.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <EnterpriseTierCard tierName="Tier 3" tierTagline="Vertical & Specialized" description="Pour les LLM verticaux et spécialisés (santé, droit, recherche). Cycle de signature court, focus sectoriel." components={["Annual Access License", "Verified Operations quota", "Compliance Module inclus"]} engagement="12 mois" ctaLabel="Talk to our enterprise team" ctaHref="/llm/contact" accent="llm" />
            <EnterpriseTierCard tierName="Tier 2" tierTagline="Regional & Sovereign" description="Pour les LLM régionaux ou souverains adressant un marché national ou européen avec exigences spécifiques." components={["Annual Access License", "Verified Operations quota", "Compliance Module en option"]} engagement="12 mois" ctaLabel="Talk to our enterprise team" ctaHref="/llm/contact" accent="llm" />
            <EnterpriseTierCard tierName="Tier 1" tierTagline="Global Frontier" description="Pour les LLM foundationaux globaux servant des millions de requêtes scientifiques par jour." components={["Annual Access License", "Verified Operations quota", "Compliance Module enterprise", "SLA dédié"]} engagement="24 mois, renouvelable" ctaLabel="Talk to our enterprise team" ctaHref="/llm/contact" accent="llm" />
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">L&apos;unité KAKAPO</p>
            <h2 className="text-xl font-display text-text-primary mb-4">La Verified Operation</h2>
            <p className="text-sm text-text-secondary leading-relaxed">Une VO correspond à une vérification effective d&apos;un claim, d&apos;une citation ou d&apos;une référence contre le catalogue certifié, indépendamment du nombre de requêtes utilisateurs en amont. Cette unité aligne le pricing sur la valeur réellement livrée.</p>
          </div>
          <div>
            <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">Intégration</p>
            <h2 className="text-xl font-display text-text-primary mb-6">Comment ça s&apos;intègre</h2>
            <div className="space-y-3">
              {["Votre LLM reçoit une requête utilisateur", "Récupération RAG sur vos sources", "API KAKAPO — vérification de provenance", "Réponse augmentée avec KPT cités"].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-2xs font-mono text-accent border border-accent/30 rounded px-1.5 py-0.5 flex-shrink-0 mt-0.5">{String(i+1).padStart(2,"0")}</span>
                  <p className="text-sm text-text-secondary">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface-3">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-display text-text-primary mb-3">Prêt à explorer ce que KAKAPO peut apporter à votre stack ?</h2>
          <p className="text-sm text-text-secondary mb-8 max-w-xl mx-auto">Notre équipe enterprise vous accompagne sur l&apos;évaluation technique et commerciale.</p>
          <Link href="/llm/contact" className="no-underline bg-accent hover:bg-accent-hover text-white text-sm font-mono px-8 py-3 rounded transition-colors">Demander un contact →</Link>
        </div>
      </section>
    </div>
  );
}
