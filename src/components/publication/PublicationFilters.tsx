"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { PublicationSource } from "@/types/api";
import { cn } from "@/lib/utils";

const SOURCES: { value: PublicationSource | ""; label: string }[] = [
  { value: "",       label: "Toutes sources" },
  { value: "arxiv",  label: "arXiv" },
  { value: "hal",    label: "HAL" },
  { value: "direct", label: "Dépôt direct" },
  { value: "other",  label: "Autre" },
];

export function PublicationFilters({ total }: { total: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const source = searchParams.get("source") ?? "";

  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page"); // reset to page 1
      router.push(`/publications?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      {/* Source filters */}
      <div className="flex items-center gap-1 flex-wrap">
        {SOURCES.map((s) => (
          <button
            key={s.value}
            onClick={() => setParam("source", s.value)}
            className={cn(
              "px-3 py-1 text-xs font-mono rounded border transition-all",
              source === s.value
                ? "bg-accent/15 text-accent border-accent/40"
                : "bg-surface-3 text-text-muted border-border hover:border-border-strong hover:text-text-secondary"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>
      {/* Count */}
      <span className="text-xs font-mono text-text-muted">
        {total} publication{total !== 1 ? "s" : ""}
      </span>
    </div>
  );
}
