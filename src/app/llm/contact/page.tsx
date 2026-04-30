"use client";
import Link from "next/link";
import { ContactForm } from "@/components/enterprise/ContactForm";

export default function LLMContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <Link href="/llm" className="text-xs font-mono text-text-muted hover:text-accent no-underline">{"<-"} Pour les LLM</Link>
      <div className="mt-8 mb-2 text-2xs font-mono text-accent uppercase tracking-widest">Contact enterprise</div>
      <h1 className="text-3xl font-display text-text-primary mb-3 leading-tight">Talk to our enterprise team</h1>
      <p className="text-sm text-text-secondary leading-relaxed mb-10">
        Notre équipe revient vers vous sous 48h pour une évaluation technique et commerciale personnalisée.
      </p>
      <ContactForm
        segment="llm"
        recipientEmail="partnerships@kakapo.io"
        subjectPrefix="[KAKAPO LLM]"
        submitLabel="Envoyer la demande"
        fields={[
          { name: "societe", label: "Nom de la société", type: "text", required: true },
          { name: "contact", label: "Nom du contact", type: "text", required: true },
          { name: "fonction", label: "Fonction", type: "text", required: true },
          { name: "email", label: "Email professionnel", type: "email", required: true },
          { name: "marches", label: "Marchés cibles de votre modèle", type: "multiselect", required: true, options: ["Grand public", "Enterprise généraliste", "Pharma & Biotech", "Legal", "Finance", "Recherche", "Je ne sais pas — orientez-moi"] },
          { name: "modeles", label: "Modèle(s) concerné(s)", type: "textarea", required: false, placeholder: "Nom des modèles, version, taille... (optionnel si vous souhaitez être orienté)" },
          { name: "volume", label: "Volume estimé de Verified Operations par mois", type: "select", required: true, options: ["<1M", "1-10M", "10-50M", "50-100M", ">100M", "Je ne sais pas encore"] },
          { name: "echeance", label: "Échéance projet", type: "select", required: true, options: ["<3 mois", "3-6 mois", "6-12 mois", ">12 mois"] },
          { name: "message", label: "Message ou demande d'orientation", type: "textarea", required: false, placeholder: "Décrivez votre cas d'usage ou demandez à être orienté vers la bonne solution." },
        ]}
      />
    </div>
  );
}
