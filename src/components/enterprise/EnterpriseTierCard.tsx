"use client";
import Link from "next/link";

const ACCENT_COLORS = {
  pharma: "#0F766E",
  llm: "#1D4ED8",
  legal: "#B45309",
  institutions: "#475569",
};

interface EnterpriseTierCardProps {
  tierName: string;
  tierTagline: string;
  description: string;
  components: string[];
  engagement: string;
  ctaLabel: string;
  ctaHref: string;
  accent: "pharma" | "llm" | "legal" | "institutions";
}

export function EnterpriseTierCard({
  tierName, tierTagline, description, components,
  engagement, ctaLabel, ctaHref, accent,
}: EnterpriseTierCardProps) {
  const color = ACCENT_COLORS[accent];
  return (
    <div
      className="bg-surface-2 border border-border rounded-lg p-6 flex flex-col gap-4 hover:shadow-md transition-shadow"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <div>
        <p className="text-2xs font-mono uppercase tracking-widest text-text-muted mb-1">{tierName}</p>
        <h3 className="text-base font-display text-text-primary mb-2">{tierTagline}</h3>
        <p className="text-xs text-text-muted leading-relaxed">{description}</p>
      </div>
      <div className="flex-1">
        <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-2">Composantes</p>
        <ul className="space-y-1">
          {components.map((c) => (
            <li key={c} className="flex items-start gap-2 text-xs text-text-secondary">
              <span style={{ color }} className="mt-0.5 flex-shrink-0">✓</span>
              {c}
            </li>
          ))}
        </ul>
      </div>
      <div className="pt-3 border-t border-border">
        <p className="text-2xs font-mono text-text-muted mb-3">Engagement : {engagement}</p>
        <Link
          href={ctaHref}
          className="no-underline inline-block w-full text-center text-xs font-mono py-2 px-4 rounded border transition-colors"
          style={{ borderColor: color, color }}
          onMouseEnter={e => { (e.target as HTMLElement).style.background = color; (e.target as HTMLElement).style.color = "white"; }}
          onMouseLeave={e => { (e.target as HTMLElement).style.background = "transparent"; (e.target as HTMLElement).style.color = color; }}
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}
