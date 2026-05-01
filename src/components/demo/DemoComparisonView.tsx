"use client";
import { DemoAnswerDisplay } from "./DemoAnswerDisplay";
import type { DemoResult } from "@/types/demo";

interface DemoComparisonViewProps {
 question: string;
 rawResult: DemoResult | null;
 kakapoResult: DemoResult | null;
 loadingRaw: boolean;
 loadingKakapo: boolean;
 errorRaw: string | null;
 errorKakapo: string | null;
}

export function DemoComparisonView({ rawResult, kakapoResult, loadingRaw, loadingKakapo, errorRaw, errorKakapo }: DemoComparisonViewProps) {
 return (
   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
     <div className="border border-border rounded-lg p-5">
       <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
         <span className="text-xs font-mono text-text-muted bg-surface-3 border border-border rounded px-2.5 py-1 uppercase tracking-wider">Claude seul</span>
         <span className="text-2xs text-text-muted">Sans source vérifiable</span>
       </div>
       <DemoAnswerDisplay result={rawResult} loading={loadingRaw} error={errorRaw} />
     </div>
     <div className="border border-accent/40 rounded-lg p-5" style={{ background: "rgba(29,78,216,0.02)" }}>
       <div className="flex items-center gap-2 mb-4 pb-3 border-b border-accent/20">
         <span className="text-xs font-mono bg-accent text-white rounded px-2.5 py-1 uppercase tracking-wider">Claude + KAKAPO</span>
         <span className="text-2xs text-accent">Sources certifiées</span>
       </div>
       <DemoAnswerDisplay result={kakapoResult} loading={loadingKakapo} error={errorKakapo} />
     </div>
   </div>
 );
}
