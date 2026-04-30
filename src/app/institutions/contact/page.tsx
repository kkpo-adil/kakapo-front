"use client";
import Link from "next/link";
import { ContactForm } from "@/components/enterprise/ContactForm";

export default function InstitutionsContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <Link href="/institutions" className="text-xs font-mono text-text-muted hover:text-accent no-underline">{"<-"} Pour les institutions</Link>
      <div className="mt-8 mb-2 text-2xs font-mono text-text-muted uppercase tracking-widest">Contact académique</div>
      <h1 className="text-3xl font-display text-text-primary mb-3 leading-tight">Demander un accès institutionnel</h1>
      <p className="text-sm text-text-secondary leading-relaxed mb-10">
        Notre équipe académique revient vers vous sous 48h avec une proposition adaptée à la taille et aux besoins de votre institution.
      </p>
      <ContactForm
        segment="institutions"
        recipientEmail="partnerships@kakapo.io"
        subjectPrefix="[KAKAPO Institutions]"
        submitLabel="Demander un accès institutionnel"
        fields={[
          { name: "type", label: "Type de structure", type: "select", required: true, options: ["Université", "Institut de recherche", "École", "Consortium", "PUI ou COMUE", "Autre"] },
          { name: "societe", label: "Nom de l'institution", type: "text", required: true },
          { name: "contact", label: "Nom du contact", type: "text", required: true },
          { name: "fonction", label: "Fonction", type: "text", required: true, placeholder: "DR, VP recherche, DSI, bibliothèque..." },
          { name: "email", label: "Email professionnel", type: "email", required: true },
          { name: "effectif", label: "Effectif chercheurs concerné", type: "select", required: true, options: ["<50", "50-500", "500-2000", ">2000"] },
          { name: "modalites", label: "Modalités souhaitées", type: "multiselect", required: true, options: ["Lab Tier", "Site License", "Consortium", "À discuter"] },
          { name: "message", label: "Message", type: "textarea", required: false },
        ]}
      />
    </div>
  );
}
