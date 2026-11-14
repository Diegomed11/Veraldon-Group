"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

// Barra mínima: el logo a la izquierda y "Menú" a la derecha. El menú abre a pantalla completa
// sobre negro, con las secciones en el mismo titular grande del sitio.
export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  // Mientras la barra está encima de la portada oscura del inicio va en blanco y sin fondo.
  const [overDark, setOverDark] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const measure = () => {
    const hero = document.querySelector("[data-dark-hero]");
    setOverDark(!!hero && hero.getBoundingClientRect().bottom > 88);
  };

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240);
    setSolid(y > 40);
    measure();
  });

  useEffect(() => {
    const id = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(id);
  }, [pathname]);

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
          open || overDark ? "tone-dark bg-transparent" : solid ? "bg-ground/95 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto grid h-[76px] max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-5 md:h-[88px] md:px-10">
          <Link href="/#contacto" onClick={() => setOpen(false)} className="label hidden justify-self-start text-ink underline-offset-8 hover:underline md:block">
            Contacto
          </Link>
          <span aria-hidden="true" className="md:hidden" />
          <Link href="/" aria-label="Veraldon, inicio" onClick={() => setOpen(false)} className="flex items-center justify-self-center">
            <Logo className="h-[22px] w-auto sm:h-7 md:h-8" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="label flex min-h-11 items-center gap-3 justify-self-end text-ink"
          >
            <span className="hidden md:inline">{open ? "Cerrar" : "Menú"}</span>
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span className={`absolute left-0 h-px w-6 bg-current transition-transform duration-500 ${open ? "top-1.5 rotate-45" : "top-0.5"}`} />
              <span className={`absolute left-0 h-px w-6 bg-current transition-transform duration-500 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
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
            className="tone-dark fixed inset-0 z-40 overflow-y-auto"
          >
            <div className="mx-auto grid min-h-full max-w-[1440px] gap-12 px-5 pt-28 pb-10 md:grid-cols-[1.6fr_1fr] md:px-10 md:pt-36">
              <nav aria-label="Principal">
                <ul>
                  {nav.map((item, i) => (
                    <li key={item.href} className="overflow-hidden">
                      <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 0.9, ease, delay: 0.25 + i * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="display block py-2 text-[clamp(30px,5.4vw,76px)] text-muted transition-colors duration-500 hover:text-ink md:py-3"
                        >
                          {item.label}
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
                  <p className="label text-muted">Líneas de servicio</p>
                  <ul className="mt-4 grid gap-2">
                    {serviceLines.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/servicios/${s.slug}`} onClick={() => setOpen(false)} className="text-lg text-soft hover:text-ink">
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="label text-muted">Contacto</p>
                  {site.email ? (
                    <a href={`mailto:${site.email}`} className="mt-4 block text-lg text-soft hover:text-ink">
                      {site.email}
                    </a>
                  ) : (
                    <Link href="/#contacto" onClick={() => setOpen(false)} className="mt-4 block text-lg text-soft hover:text-ink">
                      Formulario de contacto
                    </Link>
                  )}
                  <p className="mt-1 text-muted">{site.city}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
