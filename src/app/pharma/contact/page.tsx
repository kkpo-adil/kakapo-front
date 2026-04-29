"use client";
import Link from "next/link";
import { ContactForm } from "@/components/enterprise/ContactForm";

export default function PharmaContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <Link href="/pharma" className="text-xs font-mono text-text-muted hover:text-accent no-underline">{"<-"} Pour la pharma</Link>
      <div className="mt-8 mb-2 text-2xs font-mono uppercase tracking-widest" style={{ color: "#0F766E" }}>Contact regulatory</div>
      <h1 className="text-3xl font-display text-text-primary mb-3 leading-tight">Demander une démo regulatory</h1>
      <p className="text-sm text-text-secondary leading-relaxed mb-10">
        Notre équipe regulatory affairs revient vers vous sous 48h.
      </p>
      <ContactForm
        segment="pharma"
        recipientEmail="partnerships@kakapo.io"
        subjectPrefix="[KAKAPO Pharma]"
        submitLabel="Demander une démo regulatory"
        fields={[
          { name: "societe", label: "Nom de la société", type: "text", required: true },
          { name: "contact", label: "Nom du contact", type: "text", required: true },
          { name: "fonction", label: "Fonction", type: "text", required: true, placeholder: "Medical affairs, Regulatory, Pharmacovigilance..." },
          { name: "email", label: "Email professionnel", type: "email", required: true },
          { name: "telephone", label: "Téléphone", type: "tel", required: false },
          { name: "structure", label: "Type de structure", type: "radio", required: true, options: ["Big Pharma", "Mid Pharma", "Biotech", "Medical device", "CRO", "Autre"] },
          { name: "usecase", label: "Use case principal", type: "multiselect", required: true, options: ["Dossiers FDA-EMA", "PSUR", "Audit claims", "Veille", "Autre"] },
          { name: "volume", label: "Volume estimé par mois", type: "select", required: true, options: ["<1K", "1-10K", "10-50K", ">50K"] },
          { name: "echeance", label: "Échéance", type: "select", required: true, options: ["<3 mois", "3-6 mois", "6-12 mois", ">12 mois"] },
          { name: "message", label: "Message", type: "textarea", required: false },
        ]}
      />
    </div>
  );
}
