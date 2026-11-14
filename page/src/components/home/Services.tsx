"use client";

import { useRef, useState } from "react";
import { serviceLines } from "@/content/site";
import { MaskLines, NotchLink } from "@/components/motion/primitives";
import { LineVisual } from "@/components/home/LineVisual";

// El título de cada línea, tal cual está en el catálogo, partido en renglones para el titular escalonado.
const titleLines: Record<string, string[]> = {
  "sistemas-integracion": ["Sistemas", "a la medida", "e integración"],
  "datos-infraestructura": ["Datos e", "infraestructura"],
  "inteligencia-artificial": ["Inteligencia", "artificial y", "conocimiento"],
  "seguridad-gobernanza": ["Seguridad,", "gobernanza de IA", "e ingeniería", "de evidencia"],
};

// Las cuatro líneas de servicio como pestañas sobre negro: una a la vez, con su titular y su imagen.
export function Services() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + serviceLines.length) % serviceLines.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="servicios" className="tone-dark py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <p className="label text-muted">Servicios</p>
        <MaskLines
          stagger
          lines={["Cuatro líneas de trabajo", "que contrata solas o juntas"]}
          className="display mt-6 text-[clamp(26px,3.6vw,54px)]"
        />
        <p className="mt-8 max-w-[52ch] text-lg text-soft">
          Desde el pedido que hoy se recaptura hasta la IA que atiende a sus clientes. Todas dejan evidencia reutilizable: inventario, pruebas, registros y arquitectura.
        </p>

        <div
          role="tablist"
          aria-label="Líneas de servicio"
          onKeyDown={onKeyDown}
          className="mt-14 flex gap-8 overflow-x-auto border-b border-rule md:mt-20 md:gap-14"
        >
          {serviceLines.map((s, i) => (
            <button
              key={s.slug}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${s.slug}`}
              aria-selected={i === active}
              aria-controls={`panel-${s.slug}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={`label -mb-px min-h-11 shrink-0 border-b pb-4 transition-colors duration-500 ${
                i === active ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {s.short}
            </button>
          ))}
        </div>

        {serviceLines.map((s, i) => (
          <div
            key={s.slug}
            role="tabpanel"
            id={`panel-${s.slug}`}
            aria-labelledby={`tab-${s.slug}`}
            hidden={i !== active}
            className="tab-panel grid gap-12 pt-12 md:pt-16 lg:grid-cols-[1.15fr_1fr] lg:gap-20"
          >
            <div className="flex flex-col">
              <p className="label text-muted">{s.norms.join(" · ")}</p>
              <h3 className="display mt-5 text-[clamp(28px,4.4vw,64px)]">
                {(titleLines[s.slug] ?? [s.title]).map((line, k) => (
                  <span key={line} className={`block ${k % 2 === 1 ? "pl-[0.9em] md:pl-[1.5em]" : ""}`}>
                    {line}
                  </span>
                ))}
              </h3>
              <p className="mt-8 max-w-[48ch] text-lg text-soft">{s.sub}</p>
              <ul className="mt-8 border-t border-rule">
                {s.items.map((item) => (
                  <li key={item} className="border-b border-rule py-3 text-[15px] leading-snug text-soft">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
                <p className="max-w-[40ch] text-sm text-muted">
                  <span className="label mb-1 block text-ink">Entrega</span>
                  {s.out}
                </p>
                <NotchLink variant="line" href={`/servicios/${s.slug}`}>
                  Ver la línea
                </NotchLink>
              </div>
            </div>
            {/* Aquí irá la imagen de cada línea; mientras tanto, su dibujo de trazos. */}
            <div className="hidden lg:block">
              <div className="cut-corner relative aspect-[4/3.6] bg-panel-2">
                <LineVisual slug={s.slug} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
