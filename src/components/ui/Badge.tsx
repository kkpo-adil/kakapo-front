import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "success" | "warning" | "danger" | "neutral";
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
}

const VARIANT_CLASSES: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-surface-3 text-text-secondary border-border",
  accent:  "bg-accent/15 text-accent border-accent/30",
  success: "bg-trust-high-bg text-trust-high border-trust-high/30",
  warning: "bg-trust-mid-bg text-trust-mid border-trust-mid/30",
  danger:  "bg-trust-low-bg text-trust-low border-trust-low/30",
  neutral: "bg-surface-3 text-text-muted border-border",
};

const DOT_CLASSES: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-text-secondary",
  accent:  "bg-accent",
  success: "bg-trust-high",
  warning: "bg-trust-mid",
  danger:  "bg-trust-low",
  neutral: "bg-text-muted",
};

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
  dot = false,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border rounded font-mono tracking-wide uppercase",
        size === "sm" ? "px-1.5 py-0.5 text-2xs" : "px-2 py-1 text-xs",
        VARIANT_CLASSES[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", DOT_CLASSES[variant])}
        />
      )}
      {children}
    </span>
  );
}
