import Image from "next/image";

// Símbolo de Veraldon: una V de dos trazos, el segundo en color señal (según la hoja de marca provisional).
export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={`shrink-0 ${className}`}>
      <g transform="translate(7.68 8.69) scale(1.01333)">
        <path d="M0 0 11 0 23.04 31.57 17.54 46Z" fill="var(--platinum)" />
        <path d="M37 0 48 0 30.46 46 19.46 46Z" fill="var(--signal)" />
      </g>
    </svg>
  );
}

// Logo horizontal completo para fondo oscuro, tal cual viene en los archivos de marca.
export function Logo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/brand/veraldon-logo-horizontal-oscuro.svg"
      alt="Veraldon"
      width={452}
      height={51}
      priority
      className={className}
    />
  );
}
