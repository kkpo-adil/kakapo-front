import { getTrustColor, formatScore, cn } from "@/lib/utils";

interface ScoreBarProps {
  score: number;
  label?: string;
  showValue?: boolean;
  height?: "xs" | "sm" | "md";
  className?: string;
  animate?: boolean;
}

const HEIGHT = {
  xs: "h-0.5",
  sm: "h-1",
  md: "h-1.5",
};

export function ScoreBar({
  score,
  label,
  showValue = true,
  height = "sm",
  className,
  animate = true,
}: ScoreBarProps) {
  const pct   = Math.max(0, Math.min(1, score)) * 100;
  const color = getTrustColor(score);

  return (
    <div className={cn("space-y-1", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-2xs font-mono text-text-muted uppercase tracking-wider">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-2xs font-mono tabular-nums" style={{ color }}>
              {formatScore(score)}
            </span>
          )}
        </div>
      )}
      <div className={cn("w-full bg-surface-3 rounded-full overflow-hidden", HEIGHT[height])}>
        <div
          className={cn("h-full rounded-full", animate && "transition-all duration-700 ease-out")}
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
