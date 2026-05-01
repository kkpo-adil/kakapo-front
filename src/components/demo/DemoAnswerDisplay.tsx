"use client";
import { CitedKPTCard } from "./CitedKPTCard";
import { DemoExportButton } from "./DemoExportButton";
import type { DemoResult } from "@/types/demo";

interface DemoAnswerDisplayProps {
 result: DemoResult | null;
 loading: boolean;
 error: string | null;
 large?: boolean;
}

export function DemoAnswerDisplay({ result, loading, error }: DemoAnswerDisplayProps) {
 if (loading) {
   return (
     <div className="space-y-3 animate-pulse">
       <div className="h-4 bg-surface-3 rounded w-3/4" />
       <div className="h-4 bg-surface-3 rounded w-full" />
       <div className="h-4 bg-surface-3 rounded w-5/6" />
       <p className="text-2xs font-mono text-text-muted text-center pt-2 animate-none">Claude analyse le catalogue KAKAPO…</p>
     </div>
   );
 }
 if (error) {
   return (
     <div className="border border-trust-low/30 bg-trust-low/5 rounded-lg p-4">
       <p className="text-sm text-trust-low">{error}</p>
     </div>
   );
 }
 if (!result) return null;
 const isKakapo = result.mode === "kakapo";
 return (
   <div className="space-y-6">
     <div className="flex items-center justify-between flex-wrap gap-2">
       <span className={`text-2xs font-mono px-2.5 py-1 rounded font-semibold uppercase ${isKakapo ? "bg-accent text-white" : "bg-surface-3 text-text-muted border border-border"}`}>
         {isKakapo ? "Claude + KAKAPO" : "Claude seul"}
       </span>
       <div className="flex items-center gap-3 text-2xs font-mono text-text-muted">
         <span>{(result.latency_ms / 1000).toFixed(1)}s</span>
         <span>{result.input_tokens + result.output_tokens} tokens</span>
         <span>${result.estimated_cost_usd.toFixed(4)}</span>
       </div>
     </div>
     <div className="text-sm text-text-secondary leading-relaxed space-y-2">
       {result.answer_text.split("\n").filter(Boolean).map((line, i) => (
         <p key={i} className={line.startsWith("##") ? "font-display text-text-primary font-semibold mt-4" : ""}>
           {line.replace(/^##+ /, "").replace(/\*\*/g, "")}
         </p>
       ))}
     </div>
     {isKakapo && result.cited_kpts.length > 0 && (
       <div>
         <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-3">
           {result.cited_kpts.length} source{result.cited_kpts.length > 1 ? "s" : ""} KAKAPO
         </p>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
           {result.cited_kpts.map((kpt, i) => (
             <CitedKPTCard key={kpt.kpt_id} kpt={kpt} index={i + 1} />
           ))}
         </div>
         <div className="mt-4">
           <DemoExportButton requestId={result.request_id} disabled={false} />
         </div>
       </div>
     )}
     {!isKakapo && (
       <div className="border border-border rounded-lg p-4 bg-surface-3">
         <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-2">⚠ Aucune source vérifiable</p>
         <p className="text-xs text-text-muted leading-relaxed">
           Cette réponse est générée sans contrainte de source. Sa véracité ne peut être ni vérifiée ni opposée.
         </p>
       </div>
     )}
   </div>
 );
}
