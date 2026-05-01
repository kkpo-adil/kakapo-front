"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { DemoQueryInput, PRESET_QUESTIONS } from "@/components/demo/DemoQueryInput";
import { DemoModeToggle } from "@/components/demo/DemoModeToggle";
import { DemoAnswerDisplay } from "@/components/demo/DemoAnswerDisplay";
import { DemoComparisonView } from "@/components/demo/DemoComparisonView";
import { DemoReplayMode, useDemoCache } from "@/components/demo/DemoReplayMode";
import { postDemoQuery } from "@/lib/api/demo";
import type { DemoResult } from "@/types/demo";

export default function DemoPage() {
  const [question, setQuestion] = useState("");
  const [mode, setMode] = useState<"kakapo" | "raw" | "comparison">("kakapo");
  const [kakapoResult, setKakapoResult] = useState<DemoResult | null>(null);
  const [rawResult, setRawResult] = useState<DemoResult | null>(null);
  const [loadingKakapo, setLoadingKakapo] = useState(false);
  const [loadingRaw, setLoadingRaw] = useState(false);
  const [errorKakapo, setErrorKakapo] = useState<string | null>(null);
  const [errorRaw, setErrorRaw] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const { save } = useDemoCache();

  const isLoading = loadingKakapo || loadingRaw;

  const handleSubmit = useCallback(async () => {
    if (!question.trim() || question.length < 5 || isLoading) return;
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();
    const signal = abortRef.current.signal;

    if (mode === "kakapo" || mode === "comparison") {
      setLoadingKakapo(true);
      setErrorKakapo(null);
      setKakapoResult(null);
    }
    if (mode === "raw" || mode === "comparison") {
      setLoadingRaw(true);
      setErrorRaw(null);
      setRawResult(null);
    }

    if (mode === "comparison") {
      const [k, r] = await Promise.allSettled([
        postDemoQuery({ question, with_kakapo: true }, signal),
        postDemoQuery({ question, with_kakapo: false }, signal),
      ]);
      if (k.status === "fulfilled") { setKakapoResult(k.value); save(k.value); }
      else if (!signal.aborted) setErrorKakapo(k.reason?.message ?? "Erreur");
      if (r.status === "fulfilled") { setRawResult(r.value); save(r.value); }
      else if (!signal.aborted) setErrorRaw(r.reason?.message ?? "Erreur");
      setLoadingKakapo(false);
      setLoadingRaw(false);
    } else {
      try {
        const result = await postDemoQuery({ question, with_kakapo: mode === "kakapo" }, signal);
        if (mode === "kakapo") { setKakapoResult(result); save(result); }
        else { setRawResult(result); save(result); }
      } catch (e: unknown) {
        if (!signal.aborted) {
          const msg = e instanceof Error ? e.message : "Erreur";
          if (mode === "kakapo") setErrorKakapo(msg);
          else setErrorRaw(msg);
        }
      } finally {
        if (mode === "kakapo") setLoadingKakapo(false);
        else setLoadingRaw(false);
      }
    }
  }, [question, mode, isLoading, save]);

  function handleReplay(result: DemoResult) {
    if (result.mode === "kakapo") setKakapoResult(result);
    else setRawResult(result);
  }

  const currentResult = mode === "kakapo" ? kakapoResult : rawResult;
  const currentLoading = mode === "kakapo" ? loadingKakapo : loadingRaw;
  const currentError = mode === "kakapo" ? errorKakapo : errorRaw;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <p className="text-2xs font-mono text-accent uppercase tracking-widest">Investor Demo</p>
          <DemoReplayMode onReplay={handleReplay} />
        </div>
        <h1 className="text-3xl font-display text-text-primary mb-3 leading-tight">
          Voyez la différence en direct.
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed max-w-2xl">
          Comparez la réponse de Claude seul à celle de Claude branché sur KAKAPO.
          Sources certifiées, hash cryptographique, export PDF signé.
        </p>
      </div>

      <div className="border border-border rounded-lg p-6 mb-6 bg-surface-2">
        <div className="mb-4">
          <DemoModeToggle mode={mode} onChange={setMode} disabled={isLoading} />
        </div>
        <DemoQueryInput
          value={question}
          onChange={setQuestion}
          onSubmit={handleSubmit}
          disabled={isLoading}
        />
      </div>

      {mode === "comparison" ? (
        <DemoComparisonView
          question={question}
          rawResult={rawResult}
          kakapoResult={kakapoResult}
          loadingRaw={loadingRaw}
          loadingKakapo={loadingKakapo}
          errorRaw={errorRaw}
          errorKakapo={errorKakapo}
        />
      ) : (currentResult || currentLoading || currentError) ? (
        <div className="border border-border rounded-lg p-6 bg-surface-2">
          <DemoAnswerDisplay result={currentResult} loading={currentLoading} error={currentError} />
        </div>
      ) : (
        <div className="border border-border border-dashed rounded-lg p-12 text-center">
          <p className="text-sm text-text-muted mb-2">Posez une question pour voir la démo.</p>
          <p className="text-2xs font-mono text-text-muted">Ou cliquez sur une question type ci-dessus.</p>
        </div>
      )}

      <details className="mt-8 border border-border rounded-lg">
        <summary className="px-5 py-3 text-xs font-mono text-text-muted cursor-pointer hover:text-text-primary">
          À propos de cette démo ↓
        </summary>
        <div className="px-5 pb-5 pt-2 space-y-2">
          <p className="text-xs text-text-muted leading-relaxed">
            <strong className="text-text-primary">Tool calling forcé :</strong> Claude est contraint architecturalement d'appeler search_kakapo avant de répondre. Il ne peut pas inventer un KPT — toute citation provient du catalogue certifié.
          </p>
          <p className="text-xs text-text-muted leading-relaxed">
            <strong className="text-text-primary">Anti-hallucination par construction :</strong> la plupart des LLMs espèrent ne pas halluciner. KAKAPO contraint Claude à ne citer que ce que le catalogue contient.
          </p>
          <p className="text-xs text-text-muted leading-relaxed">
            <strong className="text-text-primary">PDF signé RSA-PSS :</strong> chaque export est signé cryptographiquement. Le hash SHA-256 du contenu est vérifiable avec la clé publique KAKAPO.
          </p>
        </div>
      </details>
    </div>
  );
}
