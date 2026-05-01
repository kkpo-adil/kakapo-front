"use client";
import { useEffect, useRef } from "react";

const PRESET_QUESTIONS = [
  "Quels sont les apports du Transformer dans le traitement du langage naturel ?",
  "Quels sont les biomarqueurs pronostiques validés dans le cancer du sein triple négatif ?",
  "Quelle est l'efficacité des inhibiteurs de SGLT2 dans l'insuffisance cardiaque ?",
  "Comment les réseaux de neurones résiduels ont-ils amélioré la reconnaissance d'images ?",
];

interface DemoQueryInputProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  large?: boolean;
}

export function DemoQueryInput({ value, onChange, onSubmit, disabled, large }: DemoQueryInputProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && !disabled && value.length >= 5) {
        onSubmit();
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [disabled, value, onSubmit]);

  return (
    <div className="space-y-3">
      <div className="relative">
        <textarea
          ref={ref}
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Posez une question scientifique ou médicale..."
          maxLength={1000}
          className={`w-full bg-surface-2 border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted resize-none focus:outline-none focus:border-accent transition-colors ${large ? "text-base min-h-[120px]" : "text-sm min-h-[96px]"} disabled:opacity-50`}
        />
        <span className="absolute bottom-2 right-3 text-2xs font-mono text-text-muted">{value.length}/1000</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {PRESET_QUESTIONS.map((q, i) => (
          <button
            key={i}
            onClick={() => onChange(q)}
            disabled={disabled}
            className="text-2xs font-mono px-2.5 py-1 rounded border border-border text-text-muted hover:border-accent hover:text-accent transition-colors bg-transparent cursor-pointer disabled:opacity-40"
          >
            {i + 1}. {q.slice(0, 40)}…
          </button>
        ))}
      </div>
      <div className="flex justify-end">
        <button
          onClick={onSubmit}
          disabled={disabled || value.length < 5}
          className="bg-accent hover:bg-accent-hover text-white text-sm font-mono px-6 py-2.5 rounded transition-colors cursor-pointer disabled:opacity-40"
        >
          {disabled ? "Analyse en cours..." : "Envoyer →"}
        </button>
      </div>
      <p className="text-2xs font-mono text-text-muted text-right">Cmd+Enter pour envoyer</p>
    </div>
  );
}

export { PRESET_QUESTIONS };
