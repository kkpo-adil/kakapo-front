"use client";
import Link from "next/link";
import { ContactForm } from "@/components/enterprise/ContactForm";

export default function PublisherContactPage() {
 return (
   <div className="max-w-2xl mx-auto px-6 py-16">
     <Link href="/publisher" className="text-xs font-mono text-text-muted hover:text-accent no-underline">{"<-"} Espace éditeur</Link>
     <div className="mt-8 mb-2 text-2xs font-mono text-accent uppercase tracking-widest">Demande de partenariat</div>
     <h1 className="text-3xl font-display text-text-primary mb-3 leading-tight">Demander un term sheet</h1>
     <p className="text-sm text-text-secondary leading-relaxed mb-10">
       Notre équipe revient vers vous sous 48h avec un term sheet détaillé et une proposition d'intégration adaptée à votre corpus.
     </p>
     <ContactForm
       segment="publisher"
       recipientEmail="partnerships@kakapo.io"
       subjectPrefix="[KAKAPO Éditeur]"
       submitLabel="Demander un term sheet"
       fields={[
         { name: "societe", label: "Nom de l'éditeur / structure", type: "text", required: true },
         { name: "contact", label: "Nom du contact", type: "text", required: true },
         { name: "fonction", label: "Fonction", type: "text", required: true },
         { name: "email", label: "Email professionnel", type: "email", required: true },
         { name: "telephone", label: "Téléphone", type: "tel", required: false },
         { name: "taille", label: "Taille approximative du catalogue", type: "select", required: true, options: ["<10K articles", "10K–50K articles", "50K–200K articles", "200K–1M articles", ">1M articles"] },
         { name: "disciplines", label: "Disciplines principales", type: "multiselect", required: true, options: ["Médecine", "Sciences de la vie", "Physique / Chimie", "Computer Science", "Sciences sociales", "Autre"] },
         { name: "integration", label: "Mode d'intégration souhaité", type: "radio", required: true, options: ["Rétro-certification batch", "Workflow webhook", "À discuter"] },
         { name: "message", label: "Message", type: "textarea", required: false },
       ]}
     />
   </div>
 );
}
