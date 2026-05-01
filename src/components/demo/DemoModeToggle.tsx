"use client";

interface DemoModeToggleProps {
  mode: "kakapo" | "raw" | "comparison";
  onChange: (mode: "kakapo" | "raw" | "comparison") => void;
  disabled: boolean;
}

const MODES = [
  { value: "kakapo" as const, label: "Claude + KAKAPO", desc: "Sources certifiées, hash cryptographique, vérifiable." },
  { value: "raw" as const, label: "Claude seul", desc: "Réponse sans contrainte de source. Aucune traçabilité." },
  { value: "comparison" as const, label: "Comparer", desc: "Affichage côte à côte pour le pitch." },
];

export function DemoModeToggle({ mode, onChange, disabled }: DemoModeToggleProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {MODES.map(m => (
        <button
          key={m.value}
          onClick={() => onChange(m.value)}
          disabled={disabled}
          className={`text-xs font-mono px-4 py-2 rounded border transition-all cursor-pointer disabled:opacity-40 ${
            mode === m.value
              ? m.value === "kakapo" ? "bg-accent text-white border-accent"
                : m.value === "raw" ? "bg-surface-3 text-text-primary border-border-strong"
                : "bg-amber-500 text-white border-amber-500"
              : "border-border text-text-secondary hover:border-accent hover:text-accent bg-transparent"
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
