import { getTrustColor, getTrustLabel, formatScore } from "@/lib/utils";

interface ScoreDialProps {
  score: number;
  size?: number;
  showLabel?: boolean;
  className?: string;
}

export function ScoreDial({
  score,
  size = 80,
  showLabel = true,
  className,
}: ScoreDialProps) {
  const color = getTrustColor(score);
  const label = getTrustLabel(score);
  const pct  = Math.max(0, Math.min(1, score));

  // SVG arc parameters
  const radius     = 34;
  const cx         = 40;
  const cy         = 40;
  const strokeW    = 5;
  const circumference = 2 * Math.PI * radius;
  const arcLength  = circumference * 0.75;       // 270° arc (leaving 90° gap at bottom)
  const filled     = arcLength * pct;
  const rotation   = 135;                        // start at bottom-left

  return (
    <div
      className={className}
      style={{ width: size, height: size }}
      aria-label={`Score de confiance : ${formatScore(score)}`}
    >
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
      >
        {/* Track */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke="#1e2535"
          strokeWidth={strokeW}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
          strokeDashoffset="0"
          transform={`rotate(${rotation} ${cx} ${cy})`}
          fill="none"
        />
        {/* Fill */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke={color}
          strokeWidth={strokeW}
          strokeDasharray={`${filled} ${circumference}`}
          strokeLinecap="round"
          strokeDashoffset="0"
          transform={`rotate(${rotation} ${cx} ${cy})`}
          fill="none"
          style={{ filter: `drop-shadow(0 0 4px ${color}40)` }}
        />
        {/* Score text */}
        <text
          x={cx}
          y={cy - 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          fontWeight="600"
          fontFamily="JetBrains Mono, monospace"
          fill="#e8eaf0"
        >
          {formatScore(score)}
        </text>
        {/* Label */}
        {showLabel && (
          <text
            x={cx}
            y={cy + 12}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="6.5"
            fontFamily="JetBrains Mono, monospace"
            fill={color}
            letterSpacing="1"
          >
            {label.toUpperCase()}
          </text>
        )}
      </svg>
    </div>
  );
}
