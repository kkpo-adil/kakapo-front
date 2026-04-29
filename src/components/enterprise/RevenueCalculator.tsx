"use client";
import { useState } from "react";

export function RevenueCalculator() {
 const [catalogue, setCatalogue] = useState(50000);
 const [pctConsulted, setPctConsulted] = useState(8);
 const [voPerArticle, setVoPerArticle] = useState(12);

 const voTotal = Math.round(catalogue * (pctConsulted / 100) * voPerArticle);
 const revenueGross = voTotal * 0.40;
 const revenueEditor = revenueGross * 0.70;

 function fmt(n: number) {
   return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n);
 }

 function fmtUSD(n: number) {
   return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
 }

 return (
   <div className="border border-border rounded-lg p-6 space-y-6">
     <div>
       <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-1">Estimez votre revenu KAKAPO</p>
       <p className="text-xs text-text-muted">Ajustez les paramètres pour voir votre estimation en temps réel.</p>
     </div>

     <div className="space-y-5">
       <div>
         <div className="flex justify-between mb-2">
           <label className="text-xs font-mono text-text-secondary uppercase tracking-widest">Taille du catalogue</label>
           <span className="text-xs font-mono text-accent">{fmt(catalogue)} articles</span>
         </div>
         <input type="range" min={1000} max={500000} step={1000} value={catalogue}
           onChange={e => setCatalogue(Number(e.target.value))}
           className="w-full accent-blue-600 cursor-pointer" />
         <div className="flex justify-between text-2xs font-mono text-text-muted mt-1">
           <span>1 000</span><span>500 000</span>
         </div>
       </div>

       <div>
         <div className="flex justify-between mb-2">
           <label className="text-xs font-mono text-text-secondary uppercase tracking-widest">% du catalogue consulté par an</label>
           <span className="text-xs font-mono text-accent">{pctConsulted} %</span>
         </div>
         <input type="range" min={1} max={30} step={1} value={pctConsulted}
           onChange={e => setPctConsulted(Number(e.target.value))}
           className="w-full accent-blue-600 cursor-pointer" />
         <div className="flex justify-between text-2xs font-mono text-text-muted mt-1">
           <span>1 %</span><span>30 %</span>
         </div>
       </div>

       <div>
         <div className="flex justify-between mb-2">
           <label className="text-xs font-mono text-text-secondary uppercase tracking-widest">Verified Operations / article / an</label>
           <span className="text-xs font-mono text-accent">{voPerArticle} VO</span>
         </div>
         <input type="range" min={3} max={60} step={1} value={voPerArticle}
           onChange={e => setVoPerArticle(Number(e.target.value))}
           className="w-full accent-blue-600 cursor-pointer" />
         <div className="flex justify-between text-2xs font-mono text-text-muted mt-1">
           <span>3</span><span>60</span>
         </div>
       </div>
     </div>

     <div className="bg-surface-3 rounded-lg p-5 space-y-3 border border-border">
       <div className="flex justify-between items-baseline">
         <span className="text-xs text-text-muted">Verified Operations annuelles</span>
         <span className="text-sm font-mono font-semibold text-text-primary">{fmt(voTotal)} VO</span>
       </div>
       <div className="flex justify-between items-baseline">
         <span className="text-xs text-text-muted">Revenu brut (0,40 USD/VO)</span>
         <span className="text-sm font-mono font-semibold text-text-primary">{fmtUSD(revenueGross)}</span>
       </div>
       <div className="h-px bg-border" />
       <div className="flex justify-between items-baseline">
         <span className="text-sm font-display text-text-primary">Votre revenu (70 %)</span>
         <span className="text-xl font-mono font-bold text-accent">{fmtUSD(revenueEditor)}</span>
       </div>
       <p className="text-2xs text-text-muted">
         Pour un catalogue de {fmt(catalogue)} articles avec un usage type, votre revenu KAKAPO estimé est de{" "}
         <strong>{fmtUSD(revenueEditor)}/an</strong>.
       </p>
     </div>

     <p className="text-2xs text-text-muted leading-relaxed">
       Estimation indicative basée sur les hypothèses du modèle KAKAPO (0,40 USD/VO, revenu moyen consolidé tous segments). Le revenu réel dépend du segment de consommateurs, du type d&apos;usage et de la densité de votre corpus dans le citation graph.
     </p>
   </div>
 );
}
