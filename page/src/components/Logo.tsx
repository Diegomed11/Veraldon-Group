// Monograma de Veraldon: una V trazada dentro de un sello. El sello alude a la evidencia verificable.
export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={`shrink-0 ${className}`} fill="none" stroke="currentColor">
      <rect x="1.5" y="1.5" width="29" height="29" rx="8" strokeWidth="1.2" />
      <path d="M9 10.5 16 23l7-12.5" strokeWidth="1.8" strokeLinecap="square" />
      <path d="M12.6 10.5h6.8" strokeWidth="1.2" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`display text-[17px] tracking-[0.32em] uppercase ${className}`} style={{ fontWeight: 500 }}>
      Veraldon
    </span>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-3">
      <LogoMark />
      <Wordmark />
    </span>
  );
}
