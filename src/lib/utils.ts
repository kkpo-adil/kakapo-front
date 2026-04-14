import type { KPTStatus, PublicationSource, Author } from "@/types/api";

// ─── Trust score helpers ───────────────────────────────────────────────────────

export type TrustLevel = "high" | "mid" | "low" | "none";

export function getTrustLevel(score: number): TrustLevel {
  if (score >= 0.7) return "high";
  if (score >= 0.4) return "mid";
  if (score > 0) return "low";
  return "none";
}

export function getTrustColor(score: number): string {
  const level = getTrustLevel(score);
  return {
    high: "#22c55e",
    mid: "#f59e0b",
    low: "#ef4444",
    none: "#64748b",
  }[level];
}

export function getTrustBgClass(score: number): string {
  const level = getTrustLevel(score);
  return {
    high: "bg-trust-high-bg text-trust-high border-trust-high/30",
    mid: "bg-trust-mid-bg text-trust-mid border-trust-mid/30",
    low: "bg-trust-low-bg text-trust-low border-trust-low/30",
    none: "bg-trust-none-bg text-trust-none border-trust-none/30",
  }[level];
}

export function getTrustLabel(score: number): string {
  const level = getTrustLevel(score);
  return {
    high: "Élevée",
    mid: "Modérée",
    low: "Faible",
    none: "N/A",
  }[level];
}

export function formatScore(score: number): string {
  return (score * 100).toFixed(0) + "%";
}

// ─── KPT status helpers ───────────────────────────────────────────────────────

export function getKPTStatusClass(status: KPTStatus | string): string {
  return {
    active: "bg-trust-high-bg text-trust-high border-trust-high/30",
    challenged: "bg-trust-mid-bg text-trust-mid border-trust-mid/30",
    revoked: "bg-trust-low-bg text-trust-low border-trust-low/30",
    superseded: "bg-surface-3 text-text-muted border-border",
  }[status] ?? "bg-surface-3 text-text-muted border-border";
}

export function getKPTStatusLabel(status: KPTStatus | string): string {
  return {
    active: "Actif",
    challenged: "Contesté",
    revoked: "Révoqué",
    superseded: "Supplanté",
  }[status] ?? status;
}

// ─── Source helpers ───────────────────────────────────────────────────────────

export function getSourceLabel(source: PublicationSource | null): string {
  if (!source) return "Inconnu";
  return {
    hal: "HAL",
    arxiv: "arXiv",
    direct: "Dépôt direct",
    other: "Autre",
  }[source];
}

export function getSourceClass(source: PublicationSource | null): string {
  if (!source) return "text-text-muted";
  return {
    hal: "text-accent",
    arxiv: "text-accent",
    direct: "text-text-secondary",
    other: "text-text-muted",
  }[source];
}

// ─── Date helpers ─────────────────────────────────────────────────────────────

export function formatDate(
  dateStr: string | null,
  opts?: Intl.DateTimeFormatOptions
): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...opts,
  });
}

export function formatDateShort(dateStr: string | null): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("fr-FR", { year: "numeric", month: "short" });
}

// ─── Author helpers ───────────────────────────────────────────────────────────

export function parseAuthors(raw: Author[] | string | null): Author[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) return parsed as Author[];
  } catch {
    // fallback: treat as plain string name
    return [{ name: raw }];
  }
  return [];
}

export function formatAuthors(
  raw: Author[] | string | null,
  maxVisible = 3
): string {
  const authors = parseAuthors(raw);
  if (authors.length === 0) return "—";
  const names = authors.map((a) => a.name);
  if (names.length <= maxVisible) return names.join(", ");
  return `${names.slice(0, maxVisible).join(", ")} +${names.length - maxVisible}`;
}

// ─── Hash helpers ─────────────────────────────────────────────────────────────

export function truncateHash(hash: string | null, chars = 12): string {
  if (!hash) return "—";
  return `${hash.slice(0, chars)}…`;
}

// ─── Generic ──────────────────────────────────────────────────────────────────

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
