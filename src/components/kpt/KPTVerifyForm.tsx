"use client";

import { useState } from "react";
import type { KPTVerifyResponse } from "@/types/api";
import { verifyKPT } from "@/lib/api";
import { KakapoApiError } from "@/lib/api-client";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { cn } from "@/lib/utils";

type VerifyState =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "success"; result: KPTVerifyResponse }
  | { phase: "error"; message: string };

export function KPTVerifyForm({ initialKptId = "" }: { initialKptId?: string }) {
  const [kptId, setKptId] = useState(initialKptId);
  const [state, setState] = useState<VerifyState>({ phase: "idle" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = kptId.trim();
    if (!id) return;

    setState({ phase: "loading" });
    try {
      const result = await verifyKPT(id);
      setState({ phase: "success", result });
    } catch (err) {
      const msg =
        err instanceof KakapoApiError
          ? err.detail
          : "Erreur de connexion au serveur";
      setState({ phase: "error", message: msg });
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="kpt-id" className="field-label block mb-2">
            Identifiant KPT
          </label>
          <input
            id="kpt-id"
            type="text"
            value={kptId}
            onChange={(e) => setKptId(e.target.value)}
            placeholder="KPT-A1B2C3D4-v1-E5F6A7B8"
            className={cn(
              "w-full bg-surface-3 border border-border rounded px-4 py-2.5",
              "text-sm font-mono text-text-primary placeholder:text-text-muted",
              "focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/20",
              "transition-colors"
            )}
          />
          <p className="mt-1.5 text-2xs font-mono text-text-muted">
            Format : KPT-XXXXXXXX-v&lt;version&gt;-YYYYYYYY
          </p>
        </div>

        <button
          type="submit"
          disabled={!kptId.trim() || state.phase === "loading"}
          className={cn(
            "flex items-center gap-2 px-5 py-2 rounded text-sm font-mono transition-all",
            "bg-accent hover:bg-accent-hover text-white",
            "disabled:opacity-40 disabled:cursor-not-allowed"
          )}
        >
          {state.phase === "loading" && <Spinner size="sm" />}
          Vérifier
        </button>
      </form>

      {state.phase === "success" && <VerifyResult result={state.result} />}

      {state.phase === "error" && (
        <Card padding="md" className="border-trust-low/30 bg-trust-low-bg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-trust-low/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-trust-low" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-trust-low">Erreur</p>
              <p className="text-xs font-mono text-text-muted mt-0.5">{state.message}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

function VerifyResult({ result }: { result: KPTVerifyResponse }) {
  const isValid          = result.valid;
  const hasHashMismatch  = result.content_hash &&
                           result.content_hash !== result.stored_hash;

  return (
    <Card
      padding="md"
      className={cn(
        "border",
        isValid
          ? "border-trust-high/30 bg-trust-high-bg"
          : "border-trust-low/30 bg-trust-low-bg"
      )}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
            isValid ? "bg-trust-high/20" : "bg-trust-low/20"
          )}
        >
          {isValid ? (
            <svg className="w-5 h-5 text-trust-high" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-trust-low" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>
        <div>
          <p className={cn("text-base font-display", isValid ? "text-trust-high" : "text-trust-low")}>
            {isValid ? "KPT valide" : "KPT invalide"}
          </p>
          <p className="text-xs text-text-muted mt-0.5">{result.message}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
        <div>
          <p className="field-label">Identifiant</p>
          <code className="text-text-primary break-all">{result.kpt_id}</code>
        </div>
        <div>
          <p className="field-label">Statut</p>
          <span className={cn(isValid ? "text-trust-high" : "text-trust-low")}>
            {result.status}
          </span>
        </div>
        {result.stored_hash && (
          <div className="sm:col-span-2">
            <p className="field-label">Hash certifié</p>
            <span className="hash-display block">{result.stored_hash}</span>
          </div>
        )}
        {hasHashMismatch && (
          <div className="sm:col-span-2">
            <p className="field-label text-trust-low">Hash actuel (différent)</p>
            <span className="hash-display block border-trust-low/30">{result.content_hash}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
