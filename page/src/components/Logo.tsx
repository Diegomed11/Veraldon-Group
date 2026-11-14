import Image from "next/image";

// Logo horizontal: el monograma VE y la palabra Veraldon. Hay una versión para fondo claro y otra
// para fondo oscuro; se cargan las dos y el tono de la sección decide cuál se ve (ver globals.css).
export function Logo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <>
      <Image
        src="/brand/veraldon-logo-horizontal-claro.svg"
        alt="Veraldon"
        width={478}
        height={46}
        priority
        className={`logo-on-light ${className}`}
      />
      <Image
        src="/brand/veraldon-logo-horizontal-oscuro.svg"
        alt="Veraldon"
        width={478}
        height={46}
        priority
        className={`logo-on-dark ${className}`}
      />
    </>
  );
}
