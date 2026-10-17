"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { Logo } from "@/components/Logo";
import { serviceLines, site } from "@/content/site";

const columns = [
  {
    title: "Servicios",
    links: serviceLines.map((s) => ({ href: `/servicios/${s.slug}`, label: s.title })),
  },
  {
    title: "Veraldon",
    links: [
      { href: "/#empezar", label: "Formas de empezar" },
      { href: "/#normas", label: "Normas y marcos" },
      { href: "/#como", label: "Cómo trabajamos" },
      { href: "/#preguntas", label: "Preguntas" },
    ],
  },
];

// Pie con el nombre a escala monumental que emerge al llegar al final (como el pie de bugatti.com).
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["60%", "0%"]);

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-rule bg-ground">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 pt-16 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:px-10">
        <div className="flex flex-col gap-4">
          <Logo className="h-6 w-auto" />
          <p className="max-w-[34ch] text-sm text-fog">{site.motto}</p>
        </div>
        {columns.map((c) => (
          <div key={c.title}>
            <p className="label text-fog">{c.title}</p>
            <ul className="mt-4 grid gap-2 text-sm">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-mist hover:text-platinum">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="label text-fog">Contacto</p>
          <a href={`mailto:${site.email}`} className="mt-4 block text-sm text-mist hover:text-platinum">
            {site.email}
          </a>
          <p className="mt-2 text-sm text-fog">{site.city}</p>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1440px] flex-wrap justify-between gap-4 px-5 text-xs text-fog md:px-10">
        <span>
          © {site.year} {site.legalName}
        </span>
        <span className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/privacidad" className="hover:text-platinum">
            Aviso de privacidad
          </Link>
          <Link href="/terminos" className="hover:text-platinum">
            Términos de uso
          </Link>
          <span>No emitimos certificados ni realizamos auditorías.</span>
        </span>
      </div>
      <div aria-hidden="true" className="mt-6 overflow-hidden">
        <motion.p
          style={{ y }}
          className="display text-center text-[13vw] leading-[0.8] tracking-[-0.02em] text-panel-2 uppercase select-none"
        >
          Veraldon
        </motion.p>
      </div>
    </footer>
  );
}
