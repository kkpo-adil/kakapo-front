"use client";
import { useState } from "react";
import { postDemoExport } from "@/lib/api/demo";

interface DemoExportButtonProps {
  requestId: string;
  disabled: boolean;
}

export function DemoExportButton({ requestId, disabled }: DemoExportButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleExport() {
    setLoading(true);
    setError("");
    try {
      const blob = await postDemoExport(requestId);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `kakapo-verified-${requestId.slice(0, 8)}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur export");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleExport}
        disabled={disabled || loading}
        className="inline-flex items-center gap-2 border border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white text-xs font-mono px-4 py-2 rounded transition-colors cursor-pointer disabled:opacity-40 bg-transparent"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
          <path d="M8 2v8M5 7l3 3 3-3M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <rect x="2" y="10" width="12" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
        {loading ? "Génération PDF signé..." : "Exporter PDF signé"}
      </button>
      {error && <p className="text-2xs text-trust-low mt-1">{error}</p>}
    </div>
  );
}
