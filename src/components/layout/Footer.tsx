export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-accent/60 flex items-center justify-center">
            <span className="text-[7px] font-mono font-bold text-white">KP</span>
          </div>
          <span className="text-2xs font-mono text-text-muted tracking-widest uppercase">KAKAPO</span>
        </div>
        <p className="text-2xs text-text-muted font-mono">
          Infrastructure de fiabilité scientifique — V1.0
        </p>
        <p className="text-2xs text-text-muted font-mono">
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
