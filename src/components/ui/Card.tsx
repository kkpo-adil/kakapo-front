import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "article" | "section";
  padding?: "sm" | "md" | "lg" | "none";
}

const PADDING = {
  none: "",
  sm:   "p-4",
  md:   "p-5",
  lg:   "p-6",
};

export function Card({
  children,
  className,
  hover = false,
  as: Tag = "div",
  padding = "md",
}: CardProps) {
  return (
    <Tag
      className={cn(
        "bg-surface-2 border border-border rounded-md",
        PADDING[padding],
        hover && "transition-all duration-200 hover:shadow-card-hover hover:border-border-strong hover:-translate-y-px cursor-pointer",
        className
      )}
    >
      {children}
    </Tag>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-3 mb-4", className)}>
      {children}
    </div>
  );
}

interface CardSectionProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
}

export function CardSection({ children, label, className }: CardSectionProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {label && <p className="field-label">{label}</p>}
      {children}
    </div>
  );
}

export function CardDivider() {
  return <div className="border-t border-border-subtle my-4" />;
}
