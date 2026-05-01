"use client";
import { useState, useEffect } from "react";
import { DEMO_FALLBACK } from "@/lib/demo-fallback";
import type { DemoResult } from "@/types/demo";

const STORAGE_KEY = "kakapo_demo_cache";
const MAX_CACHED = 5;

export function useDemoCache() {
  function save(result: DemoResult) {
    try {
      const existing: DemoResult[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      const updated = [result, ...existing.filter(r => r.request_id !== result.request_id)].slice(0, MAX_CACHED);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  }

  function load(): DemoResult[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    } catch { return []; }
  }

  return { save, load };
}

interface DemoReplayModeProps {
  onReplay: (result: DemoResult) => void;
}

export function DemoReplayMode({ onReplay }: DemoReplayModeProps) {
  const [open, setOpen] = useState(false);
  const [cached, setCached] = useState<DemoResult[]>([]);

  useEffect(() => {
    try {
      const stored: DemoResult[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      setCached(stored);
    } catch {}
  }, [open]);

  const all = [...cached, ...DEMO_FALLBACK].slice(0, 8);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-2xs font-mono text-text-muted border border-border rounded px-3 py-1.5 hover:border-accent hover:text-accent transition-colors bg-transparent cursor-pointer"
      >
        ⟳ Replay
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-surface-2 border border-border rounded-lg shadow-lg z-50 p-3">
          <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mb-2">Réponses en cache</p>
          {all.length === 0 ? (
            <p className="text-xs text-text-muted">Aucune réponse en cache.</p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {all.map((r, i) => (
                <button
                  key={r.request_id + i}
                  onClick={() => { onReplay(r); setOpen(false); }}
                  className="w-full text-left p-2 rounded hover:bg-surface-3 transition-colors cursor-pointer bg-transparent border-0"
                >
                  <p className="text-2xs font-mono text-accent">{r.mode === "kakapo" ? "★ KAKAPO" : "Claude seul"}</p>
                  <p className="text-xs text-text-secondary truncate mt-0.5">{r.question}</p>
                </button>
              ))}
            </div>
          )}
          <p className="text-2xs text-text-muted mt-2 pt-2 border-t border-border">
            Fonctionne sans réseau — mode rescue pitch
          </p>
        </div>
      )}
    </div>
  );
}
