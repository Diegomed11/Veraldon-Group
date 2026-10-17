"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Logo } from "@/components/Logo";
import { setScrollLocked } from "@/components/SmoothScroll";
import { serviceLines, site } from "@/content/site";

const ease = [0.16, 1, 0.3, 1] as const;

const nav = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#empezar", label: "Formas de empezar" },
  { href: "/#normas", label: "Normas" },
  { href: "/#como", label: "Cómo trabajamos" },
  { href: "/#contacto", label: "Contacto" },
];

// Barra centrada con el nombre, "Menú" a la izquierda y menú a pantalla completa (adaptado de "Navigation Menu" de 21st.dev).
export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240);
    setSolid(y > 40);
  });

  useEffect(() => {
    setScrollLocked(open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.6, ease }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid && !open ? "bg-ground/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto grid h-[72px] max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-5 md:px-10">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu"
            className="label flex items-center gap-3 justify-self-start text-platinum"
          >
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span className={`absolute left-0 h-px w-5 bg-current transition-transform duration-500 ${open ? "top-1.5 rotate-45" : "top-0.5"}`} />
              <span className={`absolute left-0 h-px w-5 bg-current transition-transform duration-500 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
            </span>
            {open ? "Cerrar" : "Menú"}
          </button>
          <Link href="/" aria-label="Veraldon, inicio" onClick={() => setOpen(false)} className="flex items-center gap-3 text-platinum">
            <Logo className="h-[18px] w-auto sm:h-5" />
          </Link>
          <span aria-hidden="true" />
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease }}
            className="fixed inset-0 z-40 overflow-y-auto bg-panel"
          >
            <div className="mx-auto grid min-h-full max-w-[1440px] gap-12 px-5 pt-28 pb-10 md:grid-cols-[1.4fr_1fr] md:px-10 md:pt-36">
              <nav aria-label="Principal">
                <ul>
                  {nav.map((item, i) => (
                    <li key={item.href} className="overflow-hidden border-b border-rule">
                      <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 0.9, ease, delay: 0.25 + i * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="display group flex items-center justify-between py-4 text-[clamp(28px,4.4vw,56px)] text-mist transition-colors hover:text-platinum"
                        >
                          {item.label}
                          <span aria-hidden="true" className="h-px w-0 bg-platinum transition-all duration-500 group-hover:w-16" />
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </nav>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.55 }}
                className="flex flex-col gap-10 md:pt-4"
              >
                <div>
                  <p className="label text-fog">Líneas de servicio</p>
                  <ul className="mt-4 grid gap-2">
                    {serviceLines.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/servicios/${s.slug}`} onClick={() => setOpen(false)} className="text-lg text-mist hover:text-platinum">
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="label text-fog">Contacto</p>
                  {site.email ? (
                    <a href={`mailto:${site.email}`} className="mt-4 block text-lg text-mist hover:text-platinum">
                      {site.email}
                    </a>
                  ) : (
                    <Link href="/#contacto" onClick={() => setOpen(false)} className="mt-4 block text-lg text-mist hover:text-platinum">
                      Formulario de contacto
                    </Link>
                  )}
                  <p className="mt-1 text-fog">{site.city}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
