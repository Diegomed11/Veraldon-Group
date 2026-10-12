"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { serviceLines, type ServiceLine } from "@/content/site";
import { MaskLines, PillLink } from "@/components/motion/primitives";
import { LineVisual } from "@/components/home/LineVisual";

// Las cuatro líneas se apilan al desplazarse (adaptado de "Stacking card" de 21st.dev).
export function ServiceStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // En celular las tarjetas van una tras otra, sin apilarse.
  const [stacked, setStacked] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setStacked(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section id="servicios" className="relative bg-ground px-3 pt-24 pb-10 md:px-6 md:pt-36">
      <div className="mx-auto max-w-[1440px] px-2 md:px-4">
        <p className="mono text-fog">Servicios</p>
        <MaskLines
          lines={["Cuatro líneas que se contratan", "solas o juntas"]}
          className="display mt-5 max-w-[22ch] text-[clamp(28px,4.2vw,60px)]"
        />
        <p className="mt-6 max-w-[52ch] text-lg text-mist">Todas dejan evidencia reutilizable.</p>
      </div>

      <div ref={ref} className="relative mx-auto mt-16 max-w-[1440px]">
        {serviceLines.map((s, i) => (
          <Card key={s.slug} line={s} index={i} total={serviceLines.length} progress={scrollYProgress} stacked={stacked} />
        ))}
      </div>
    </section>
  );
}

type CardProps = { line: ServiceLine; index: number; total: number; progress: MotionValue<number>; stacked: boolean };

function Card({ line, index, total, progress, stacked }: CardProps) {
  const start = index / total;
  const last = index === total - 1;
  const scale = useTransform(progress, [start, 1], [1, stacked ? 1 - (total - index - 1) * 0.035 : 1]);
  const dim = useTransform(progress, [start, Math.min(1, start + 1 / total)], [0, stacked && !last ? 0.5 : 0]);

  return (
    <div className="pb-4 md:sticky md:top-[84px] md:flex md:min-h-[calc(100svh-100px)] md:flex-col md:pb-6 md:pt-[var(--stack)]" style={{ "--stack": `${index * 14}px` } as React.CSSProperties}>
      <motion.article
        style={{ scale, transformOrigin: "50% 0%" }}
        className="relative grid overflow-hidden rounded-[28px] md:flex-1 border border-rule bg-panel lg:grid-cols-[1.1fr_1fr]"
      >
        <div className="relative z-10 flex flex-col p-7 md:p-10">
          <div className="flex flex-wrap gap-2">
            {line.norms.map((n) => (
              <span key={n} className="mono rounded-full border border-rule px-3 py-1 text-[11px] text-fog">
                {n}
              </span>
            ))}
          </div>
          <h3 className="display mt-5 max-w-[20ch] text-[clamp(24px,2.6vw,38px)]">{line.title}</h3>
          <p className="mt-4 hidden max-w-[48ch] text-mist sm:block">{line.sub}</p>
          <ul className="mt-5 border-t border-rule">
            {line.items.map((item) => (
              <li key={item} className="border-b border-rule py-2 text-[14px] leading-snug text-mist md:text-[14.5px]">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap items-end justify-between gap-6 pt-6">
            <p className="max-w-[40ch] text-sm text-fog">
              <span className="mono mb-1 block text-platinum">Entrega</span>
              {line.out}
            </p>
            <PillLink href={`/servicios/${line.slug}`}>Ver la línea</PillLink>
          </div>
        </div>
        <div className="relative hidden border-l border-rule bg-ground/40 lg:block">
          <LineVisual slug={line.slug} />
        </div>
        <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-ground" />
      </motion.article>
    </div>
  );
}
