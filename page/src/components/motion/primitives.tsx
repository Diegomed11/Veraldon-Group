"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform, type MotionValue } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

// Titular que sube línea por línea desde una máscara (adaptado de "Text Reveal (Mask)" de 21st.dev).
export function MaskLines({
  lines,
  className = "",
  delay = 0,
  as: Tag = "h2",
}: {
  lines: string[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={{ y: "105%" }}
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

// Párrafo que se ilumina palabra por palabra al desplazarse (adaptado de "Text Highlight" de 21st.dev).
export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        ))}
      </span>
    </p>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre">
      {children}{" "}
    </motion.span>
  );
}

// Etiqueta monoespaciada que se descifra al entrar en pantalla (adaptado de "Scramble text" de 21st.dev).
const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/";
export function Scramble({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const total = 22;
    const id = setInterval(() => {
      frame++;
      const done = Math.floor((frame / total) * text.length);
      setOut(
        text
          .split("")
          .map((c, i) => (i < done || c === " " ? c : glyphs[Math.floor(Math.random() * glyphs.length)]))
          .join(""),
      );
      if (frame >= total) clearInterval(id);
    }, 34);
    return () => clearInterval(id);
  }, [inView, text]);
  return (
    <span ref={ref} className={`mono ${className}`} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}

// Botón de contorno en píldora, como los de la vitrina: el relleno sube al pasar el cursor.
export function PillLink({
  href,
  children,
  tone = "dark",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const colors =
    tone === "dark"
      ? "border-platinum/70 text-platinum hover:text-ground before:bg-platinum"
      : "border-paper-ink/70 text-paper-ink hover:text-paper before:bg-paper-ink";
  return (
    <Link
      href={href}
      className={`mono group relative isolate inline-flex min-h-11 items-center justify-center overflow-hidden rounded-full border px-6 py-3 text-center transition-colors duration-500 before:absolute before:inset-0 before:-z-10 before:translate-y-full before:rounded-full before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.16,1,0.3,1)] hover:before:translate-y-0 ${colors} ${className}`}
    >
      {children}
    </Link>
  );
}
