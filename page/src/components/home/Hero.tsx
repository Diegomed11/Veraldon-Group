"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MaskLines, PillLink } from "@/components/motion/primitives";

const ease = [0.16, 1, 0.3, 1] as const;

// Chevrones concéntricos: la V del monograma convertida en curvas de nivel.
// Una franja de luz los recorre como el reflejo sobre una carrocería en la oscuridad.
const chevrons = Array.from({ length: 26 }, (_, k) => {
  const w = 120 + k * 46;
  const top = 210 - k * 16;
  const depth = 300 + k * 30;
  return `M${800 - w} ${top} L800 ${top + depth} L${800 + w} ${top}`;
});

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ground">
      <motion.svg
        style={{ scale }}
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="sheen" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="sweep">
            <motion.rect
              y="0"
              width="520"
              height="900"
              fill="url(#sheen)"
              initial={{ x: -700 }}
              animate={{ x: 1800 }}
              transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.5, delay: 1.6 }}
            />
          </mask>
          <radialGradient id="vignette" cx="0.5" cy="0.45" r="0.7">
            <stop offset="0.35" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="1" />
          </radialGradient>
        </defs>
        <g fill="none" stroke="#eceef0" strokeWidth="1" vectorEffect="non-scaling-stroke">
          {chevrons.map((d, k) => (
            <motion.path
              key={k}
              d={d}
              strokeOpacity={0.07 + (k % 3 === 0 ? 0.05 : 0)}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, ease, delay: 0.15 + k * 0.03 }}
            />
          ))}
        </g>
        <g fill="none" stroke="#eceef0" strokeWidth="1.4" mask="url(#sweep)" opacity="0.85">
          {chevrons.map((d, k) => (
            <path key={k} d={d} />
          ))}
        </g>
        <rect width="1600" height="900" fill="url(#vignette)" />
      </motion.svg>

      <motion.div
        style={{ opacity: fade, y: lift }}
        className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col items-center justify-center px-5 text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="label text-mist"
        >
          Sistemas a la medida, datos e IA para empresas medianas en México
        </motion.p>
        <MaskLines
          as="h1"
          delay={0.45}
          lines={["Sistemas, datos e IA", "que funcionan", "y lo demuestran."]}
          className="display mt-7 text-[clamp(34px,6.4vw,92px)] text-platinum"
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 1.15 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <PillLink href="#contacto">Hablemos 30 minutos de su operación</PillLink>
          <p className="text-sm text-fog">Sin costo. Respondemos el mismo día hábil.</p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="label text-fog">Desplácese</span>
        <span className="relative block h-10 w-px overflow-hidden bg-rule">
          <motion.span
            className="absolute inset-x-0 top-0 block h-4 bg-platinum"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
