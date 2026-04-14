import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  message?: string;
  retry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Erreur de chargement",
  message,
  retry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-20 text-center",
        className
      )}
    >
      <div className="w-10 h-10 rounded-full border border-trust-low/40 bg-trust-low-bg flex items-center justify-center">
        <svg
          className="w-5 h-5 text-trust-low"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-text-secondary font-medium">{title}</p>
        {message && (
          <p className="text-xs text-text-muted max-w-sm font-mono">{message}</p>
        )}
      </div>
      {retry && (
        <button
          onClick={retry}
          className="text-xs font-mono text-accent hover:text-accent-hover border border-accent/30 hover:border-accent/60 px-3 py-1.5 rounded transition-colors"
        >
          Réessayer
        </button>
      )}
    </div>
  );
}
