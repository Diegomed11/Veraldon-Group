"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform, type MotionValue } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

// Sangría de las líneas pares en los titulares escalonados.
const indent = "pl-[0.9em] md:pl-[1.5em]";

// Titular que sube línea por línea desde una máscara (adaptado de "Text Reveal (Mask)" de 21st.dev).
// Con `stagger`, las líneas pares se sangran y el titular queda escalonado.
export function MaskLines({
  lines,
  className = "",
  delay = 0,
  as: Tag = "h2",
  stagger = false,
}: {
  lines: string[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
  stagger?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        // El relleno superior deja espacio a los acentos de las mayúsculas dentro de la máscara.
        <span key={i} className={`-mt-[0.16em] block overflow-hidden pt-[0.16em] pb-[0.06em] ${stagger && i % 2 === 1 ? indent : ""}`}>
          <motion.span
            className="block"
            initial={{ y: "118%" }}
            animate={inView ? { y: "0%" } : undefined}
            transition={{ duration: 1.1, ease, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

// Aparece con un leve desplazamiento; para bloques secundarios.
export function Rise({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

// Titular escalonado que pasa de gris a tinta línea por línea conforme se desplaza la página.
export function ScrollLines({ lines, className = "" }: { lines: string[]; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.5"] });
  return (
    <h2 ref={ref} className={className}>
      {lines.map((line, i) => (
        <Line key={i} progress={scrollYProgress} range={[i / lines.length, (i + 1) / lines.length]} indented={i % 2 === 1}>
          {line}
        </Line>
      ))}
    </h2>
  );
}

function Line({
  children,
  progress,
  range,
  indented,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  indented: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={`block ${indented ? indent : ""}`}>
      {children}
    </motion.span>
  );
}

// Botón rectangular con la esquina cortada: relleno por defecto, en contorno con `variant="line"`.
export function NotchLink({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "line";
  className?: string;
}) {
  return (
    <Link href={href} className={`label btn-notch ${variant === "line" ? "btn-notch-line" : ""} ${className}`}>
      {children}
      <Arrow />
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 10" aria-hidden="true" className={`h-2.5 w-[18px] shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M0 5h16M12 1l4 4-4 4" />
    </svg>
  );
}
