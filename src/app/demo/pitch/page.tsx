"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { DemoQueryInput, PRESET_QUESTIONS } from "@/components/demo/DemoQueryInput";
import { DemoComparisonView } from "@/components/demo/DemoComparisonView";
import { DemoReplayMode } from "@/components/demo/DemoReplayMode";
import { postDemoQuery } from "@/lib/api/demo";
import type { DemoResult } from "@/types/demo";


export default function DemoPitchPage() {
  const [question, setQuestion] = useState("");
  const [kakapoResult, setKakapoResult] = useState<DemoResult | null>(null);
  const [rawResult, setRawResult] = useState<DemoResult | null>(null);
  const [loadingKakapo, setLoadingKakapo] = useState(false);
  const [loadingRaw, setLoadingRaw] = useState(false);
  const [errorKakapo, setErrorKakapo] = useState<string | null>(null);
  const [errorRaw, setErrorRaw] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const isLoading = loadingKakapo || loadingRaw;

  const handleSubmit = useCallback(async () => {
    if (!question.trim() || question.length < 5 || isLoading) return;
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();
    const signal = abortRef.current.signal;

    setLoadingKakapo(true);
    setLoadingRaw(true);
    setErrorKakapo(null);
    setErrorRaw(null);
    setKakapoResult(null);
    setRawResult(null);

    const [k, r] = await Promise.allSettled([
      postDemoQuery({ question, with_kakapo: true }, signal),
      postDemoQuery({ question, with_kakapo: false }, signal),
    ]);
    if (k.status === "fulfilled") setKakapoResult(k.value);
    else if (!signal.aborted) setErrorKakapo(k.reason?.message ?? "Erreur");
    if (r.status === "fulfilled") setRawResult(r.value);
    else if (!signal.aborted) setErrorRaw(r.reason?.message ?? "Erreur");
    setLoadingKakapo(false);
    setLoadingRaw(false);
  }, [question, isLoading]);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const n = parseInt(e.key);
      if (n >= 1 && n <= 4 && PRESET_QUESTIONS[n - 1]) {
        setQuestion(PRESET_QUESTIONS[n - 1]);
      }
      if (e.key === " " && !isLoading && question.length >= 5) {
        e.preventDefault();
        handleSubmit();
      }
      if (e.key === "Escape") {
        setQuestion("");
        setKakapoResult(null);
        setRawResult(null);
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [question, isLoading, handleSubmit]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="flex items-center justify-between px-8 py-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-accent flex items-center justify-center">
            <span className="text-2xs font-mono font-bold text-white">KP</span>
          </div>
          <span className="font-display text-sm tracking-widest uppercase text-white">KAKAPO</span>
          <span className="text-2xs font-mono text-slate-400 border-l border-slate-600 pl-3">Investor Demo</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xs font-mono text-slate-400">1-4: questions · Espace: envoyer · Esc: reset</span>
          <DemoReplayMode onReplay={(r) => r.mode === "kakapo" ? setKakapoResult(r) : setRawResult(r)} />
        </div>
      </div>

      <div className="px-8 py-5">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-display text-white mb-1">Voyez la différence en direct.</h1>
          <p className="text-sm text-slate-400 mb-4">Sources certifiées vs réponse générique — côte à côte.</p>
          <DemoQueryInput
            value={question}
            onChange={setQuestion}
            onSubmit={handleSubmit}
            disabled={isLoading}
            large
          />
        </div>
      </div>

      <div className="flex-1 px-8 pb-8 overflow-auto">
        {kakapoResult || rawResult || loadingKakapo || loadingRaw ? (
          <DemoComparisonView
            question={question}
            rawResult={rawResult}
            kakapoResult={kakapoResult}
            loadingRaw={loadingRaw}
            loadingKakapo={loadingKakapo}
            errorRaw={errorRaw}
            errorKakapo={errorKakapo}
          />
        ) : (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-2">Sélectionnez une question ou tapez la vôtre.</p>
              <p className="text-slate-500 text-2xs font-mono">Touches 1-4 pour les questions preset · Espace pour envoyer</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
