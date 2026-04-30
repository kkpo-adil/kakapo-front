"use client";

import Link from "next/link";

export default function ApiAccessPage() {
 return (
   <div className="max-w-4xl mx-auto px-6 py-14">
     <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 rounded px-3 py-1 mb-8">
       <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
       <span className="text-2xs font-mono text-accent uppercase tracking-widest">Documentation API</span>
     </div>
     <h1 className="text-2xl font-display text-text-primary mb-3">API KAKAPO</h1>
     <p className="text-sm text-text-secondary leading-relaxed mb-10 max-w-2xl">
       Interface technique pour intégrer KAKAPO dans vos pipelines IA, vos outils d&apos;audit ou vos systèmes de conformité.
     </p>

     <div className="space-y-10">
       <section>
         <h2 className="text-base font-display text-text-primary mb-4">Endpoints</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden">
           {[
             { method: "GET", endpoint: "/publications/", desc: "Lister les publications indexées avec filtres source, DOI, auteur." },
             { method: "POST", endpoint: "/integrity/verify", desc: "Vérifier l'intégrité d'un contenu par DOI et hash SHA-256." },
             { method: "GET", endpoint: "/kpt/{kpt_id}", desc: "Obtenir les détails d'un KPT — statut, hash certifié, version." },
             { method: "GET", endpoint: "/trust/score/{id}", desc: "Obtenir le Trust Score et le breakdown d'une publication." },
           ].map(({ method, endpoint, desc }) => (
             <div key={endpoint} className="bg-surface-2 p-5">
               <div className="flex items-center gap-2 mb-2">
                 <span className={`text-2xs font-mono px-2 py-0.5 rounded ${method === "GET" ? "bg-accent/10 text-accent" : "bg-trust-high/10 text-trust-high"}`}>{method}</span>
                 <code className="text-xs font-mono text-text-primary">{endpoint}</code>
               </div>
               <p className="text-xs text-text-muted">{desc}</p>
             </div>
           ))}
         </div>
       </section>

       <section>
         <h2 className="text-base font-display text-text-primary mb-4">Authentification</h2>
         <p className="text-sm text-text-muted leading-relaxed mb-4">
           Les endpoints de vérification publique (KPT, Trust Score) ne nécessitent pas d&apos;authentification. Les endpoints authentifiés utilisent le header <code className="font-mono text-accent text-xs">X-Client-API-Key</code>.
         </p>
         <div className="bg-surface-3 border border-border rounded-lg p-4">
           <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-3">Exemple cURL</p>
           <pre className="text-xs font-mono text-text-secondary overflow-auto leading-relaxed">{`curl https://kakapo-back-production.up.railway.app/trust/score/{id} \
 -H "X-Client-API-Key: kk_votre_clé"`}</pre>
         </div>
       </section>

       <section>
         <h2 className="text-base font-display text-text-primary mb-4">La Verified Operation</h2>
         <p className="text-sm text-text-muted leading-relaxed">
           Chaque endpoint de vérification consomme <strong className="text-text-primary">1 Verified Operation (VO)</strong> sur le quota de votre abonnement. Une VO correspond à une vérification effective d&apos;un claim, d&apos;une citation ou d&apos;une référence contre le catalogue certifié — indépendamment du nombre de requêtes utilisateurs en amont.
         </p>
       </section>

       <section>
         <h2 className="text-base font-display text-text-primary mb-4">Latence et SLA</h2>
         <div className="grid grid-cols-2 gap-px bg-border rounded-lg overflow-hidden">
           {[
             { label: "Latence p95", value: "< 200 ms" },
             { label: "Disponibilité", value: "99.9 % (enterprise)" },
           ].map(({ label, value }) => (
             <div key={label} className="bg-surface-2 p-5">
               <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-1">{label}</p>
               <p className="text-sm font-mono font-semibold text-text-primary">{value}</p>
             </div>
           ))}
         </div>
       </section>

       <section>
         <h2 className="text-base font-display text-text-primary mb-4">Accès et abonnements</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
           {[
             { tier: "Free Developer", quota: "100 VO/mois", desc: "Pour tester l'API sans engagement." },
             { tier: "Starter", quota: "10 000 VO/mois", desc: "Pour les projets en développement." },
             { tier: "Growth", quota: "100 000 VO/mois", desc: "Pour les applications en production." },
           ].map(({ tier, quota, desc }) => (
             <div key={tier} className="border border-border rounded-lg p-4 bg-surface-2">
               <p className="text-xs font-display text-text-primary mb-1">{tier}</p>
               <p className="text-2xs font-mono text-accent mb-2">{quota}</p>
               <p className="text-2xs text-text-muted">{desc}</p>
             </div>
           ))}
         </div>
         <div className="bg-surface-3 border border-border rounded-lg p-5">
           <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">Documentation complète</p>
           <a
             href={`${process.env.NEXT_PUBLIC_API_URL}/docs`}
             target="_blank"
             rel="noopener noreferrer"
             className="text-xs font-mono text-accent hover:text-accent-hover no-underline"
           >
             {`${process.env.NEXT_PUBLIC_API_URL}/docs`} →
           </a>
         </div>
       </section>

       <section className="border-t border-border pt-8">
         <div className="bg-surface-3 border border-border rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
           <div>
             <p className="text-sm font-display text-text-primary mb-1">Besoin d&apos;un accès enterprise ?</p>
             <p className="text-xs text-text-muted">Volumes &gt; 1M VO/mois, SLA dédié, Compliance Module — contactez notre équipe.</p>
           </div>
           <Link href="/llm/contact" className="no-underline flex-shrink-0 bg-accent hover:bg-accent-hover text-white text-xs font-mono px-5 py-2.5 rounded transition-colors">
             Talk to our enterprise team →
           </Link>
         </div>
       </section>
     </div>
   </div>
 );
}
