import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-8 h-8 border-[3px]",
};

export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Chargement…"
      className={cn(
        "rounded-full border-border border-t-accent animate-spin",
        SIZE[size],
        className
      )}
    />
  );
}

export function PageSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24">
      <Spinner size="lg" />
      <p className="text-2xs font-mono text-text-muted uppercase tracking-widest">
        Chargement…
      </p>
    </div>
  );
}
