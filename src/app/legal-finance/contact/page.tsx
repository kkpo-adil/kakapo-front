"use client";
import Link from "next/link";
import { ContactForm } from "@/components/enterprise/ContactForm";

export default function LegalFinanceContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <Link href="/legal-finance" className="text-xs font-mono text-text-muted hover:text-accent no-underline">{"<-"} Pour le legal & finance</Link>
      <div className="mt-8 mb-2 text-2xs font-mono uppercase tracking-widest" style={{ color: "#B45309" }}>Contact</div>
      <h1 className="text-3xl font-display text-text-primary mb-3 leading-tight">Demander un contact</h1>
      <p className="text-sm text-text-secondary leading-relaxed mb-10">
        Notre équipe revient vers vous sous 48h pour une démonstration personnalisée sur votre cas d&apos;usage.
      </p>
      <ContactForm
        segment="legal-finance"
        recipientEmail="partnerships@kakapo.io"
        subjectPrefix="[KAKAPO Legal-Finance]"
        submitLabel="Demander un contact"
        fields={[
          { name: "type", label: "Type de structure", type: "radio", required: true, options: ["Cabinet d'avocats", "Fonds d'investissement", "Expert judiciaire", "Autre"] },
          { name: "societe", label: "Nom de la structure", type: "text", required: true },
          { name: "contact", label: "Nom du contact", type: "text", required: true },
          { name: "fonction", label: "Fonction", type: "text", required: true },
          { name: "email", label: "Email professionnel", type: "email", required: true },
          { name: "usecase", label: "Use case principal", type: "textarea", required: true },
          { name: "volume", label: "Volume anticipé", type: "select", required: true, options: ["Ponctuel", "<100 VO/an", "100-1K VO/an", ">1K VO/an"] },
          { name: "message", label: "Message", type: "textarea", required: false },
        ]}
      />
    </div>
  );
}
