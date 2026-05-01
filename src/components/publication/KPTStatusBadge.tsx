import { cn } from "@/lib/utils";

interface KPTStatusBadgeProps {
 status: "certified" | "indexed";
 size?: "sm" | "md";
}

export function KPTStatusBadge({ status, size = "sm" }: KPTStatusBadgeProps) {
 const isSmall = size === "sm";

 if (status === "certified") {
   return (
     <span
       className={cn(
         "inline-flex items-center gap-1.5 font-mono font-semibold uppercase tracking-wider",
         "bg-amber-500 text-white rounded",
         isSmall ? "text-2xs px-2.5 py-1" : "text-xs px-3 py-1.5"
       )}
       style={{ letterSpacing: "0.08em" }}
       aria-label="KPT certifié"
     >
       <svg
         className={isSmall ? "w-2.5 h-2.5 flex-shrink-0" : "w-3 h-3 flex-shrink-0"}
         viewBox="0 0 12 12"
         fill="none"
       >
         <path
           d="M6 1L7.5 4L11 4.5L8.5 7L9 10.5L6 9L3 10.5L3.5 7L1 4.5L4.5 4L6 1Z"
           fill="white"
           stroke="white"
           strokeWidth="0.5"
           strokeLinejoin="round"
         />
       </svg>
       KPT Certifié
     </span>
   );
 }

 return (
   <span
     className={cn(
       "inline-flex items-center gap-1 font-mono relative group",
       "bg-surface-3 border border-border text-text-muted rounded",
       isSmall ? "text-2xs px-2 py-0.5" : "text-xs px-2.5 py-1"
     )}
     aria-label="i-KPT indexé — Publication indexée à des fins de démonstration"
   >
     <svg className={isSmall ? "w-2.5 h-2.5" : "w-3 h-3"} viewBox="0 0 12 12" fill="none">
       <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5"/>
       <path d="M6 5.5v3M6 4h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
     </svg>
     i-KPT
     <span className="absolute bottom-full left-0 mb-1.5 w-56 bg-text-primary text-white text-2xs rounded px-2 py-1.5 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
       Publication indexée à des fins de démonstration. KPT certifié soumis à l&apos;accord de l&apos;éditeur.
     </span>
   </span>
 );
}
