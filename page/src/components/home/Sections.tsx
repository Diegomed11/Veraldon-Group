"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { audiences, differentiators, faqs, norms, notDone, offers, principles, site, starts, steps, tools } from "@/content/site";
import { MaskLines, Rise, ScrollLines } from "@/components/motion/primitives";

const ease = [0.16, 1, 0.3, 1] as const;
const wrap = "mx-auto max-w-[1440px] px-5 md:px-10";

// La etiqueta solo va donde sirve para ubicarse (las secciones del menú).
function Heading({ label, lines, className = "" }: { label?: string; lines: string[]; className?: string }) {
  return (
    <div className={className}>
      {label && <p className="label mb-6 text-muted">{label}</p>}
      <MaskLines stagger lines={lines} className="display text-[clamp(26px,3.6vw,54px)]" />
    </div>
  );
}

// Lo que hace Veraldon: un titular enorme que se oscurece línea por línea y, debajo, la explicación completa.
export function Statement({ text }: { text: string }) {
  return (
    <section className={`${wrap} py-28 md:py-44`}>
      <p className="label text-right text-ink">Qué hacemos</p>
      <ScrollLines lines={site.whatLines} className="display mt-10 text-[clamp(24px,6.4vw,100px)] md:mt-16" />
      <div className="mt-14 grid md:mt-24 md:grid-cols-2">
        <Rise className="md:col-start-2">
          <p className="max-w-[52ch] text-lg text-soft">{text}</p>
        </Rise>
      </div>
    </section>
  );
}

// Tres formas de empezar, en columnas separadas por líneas finas.
export function Starts() {
  return (
    <section id="empezar" className="pt-24 pb-4 md:pt-36">
      <div className={wrap}>
        <Heading label="Formas de empezar" lines={["Tres formas de empezar", "con alcance y precio fijos"]} />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {starts.map((s, i) => (
            <Rise key={s.title} delay={i * 0.08} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden border border-rule bg-panel p-7 md:p-8">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0_39px,color-mix(in_srgb,var(--ink)_6%,transparent)_39px_40px)] transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
                <p className="label relative text-muted">{s.weeks}</p>
                <h3 className="title relative mt-5 text-[clamp(22px,2vw,30px)]">{s.title}</h3>
                <p className="relative mt-4 mb-8 text-soft">{s.text}</p>
                <span aria-hidden="true" className="relative mt-auto block h-px w-full origin-left scale-x-[0.2] bg-ink transition-transform duration-700 group-hover:scale-x-100" />
              </article>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

// Dos ofertas especializadas como filas editoriales, para no repetir la tarjeta de arriba.
export function Offers() {
  return (
    <section className={`${wrap} pt-14 pb-16 md:pt-16 md:pb-24`}>
      {offers.map((o, i) => (
        <Rise key={o.title} delay={i * 0.08}>
          <article className="grid gap-4 border-t border-rule py-10 md:grid-cols-[1fr_1.3fr] md:gap-12 md:py-14">
            <div>
              <p className="text-muted">{o.for}</p>
              <h3 className="title mt-3 text-[clamp(24px,2.8vw,40px)]">{o.title}</h3>
            </div>
            <p className="max-w-[58ch] text-lg text-soft md:pt-9">{o.text}</p>
          </article>
        </Rise>
      ))}
    </section>
  );
}

export function Audiences() {
  return (
    <section className="border-t border-rule py-20 md:py-28">
      <div className={`${wrap} grid gap-12 lg:grid-cols-[1fr_1.6fr]`}>
        <Heading lines={["Para quién", "construimos"]} />
        <ul className="border-t border-rule">
          {audiences.map((a, i) => (
            <motion.li
              key={a.title}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.9, ease, delay: i * 0.07 }}
              className="group grid gap-2 border-b border-rule py-7 md:grid-cols-[1fr_1.2fr] md:gap-10"
            >
              <h3 className="title text-[22px] transition-transform duration-500 group-hover:translate-x-2">{a.title}</h3>
              <p className="text-soft">{a.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Las normas pasan en horizontal mientras la sección queda fija (adaptado de "Container Scroll Animation" de 21st.dev).
export function Norms() {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    const measure = () => track.current && setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section id="normas" ref={ref} className="tone-dark relative" style={{ height: `calc(100svh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className={wrap}>
          <Heading label="Normas y marcos" lines={["Las normas que pide", "su cliente o auditor"]} />
        </div>
        <motion.div ref={track} style={{ x }} className="mt-12 flex w-max gap-4 px-5 md:px-10">
          {norms.map((n) => (
            <article key={n.code} className="flex h-[340px] w-[300px] shrink-0 flex-col border border-rule bg-panel p-7 md:h-[380px] md:w-[360px]">
              <p className="display text-[clamp(22px,2.2vw,30px)]">{n.code}</p>
              <p className="label mt-3 text-muted">{n.title}</p>
              <p className="mt-auto text-soft">{n.text}</p>
            </article>
          ))}
          <article className="tone-light flex h-[340px] w-[300px] shrink-0 flex-col justify-end p-7 md:h-[380px] md:w-[360px]">
            <p className="label">Lo que no hacemos</p>
            <ul className="mt-4 grid gap-2">
              {notDone.map((t) => (
                <li key={t} className="title text-[20px]">
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-soft">La certificación la otorga un organismo independiente que usted elige.</p>
          </article>
        </motion.div>
      </div>
    </section>
  );
}

// Principios: la frase cambia mientras la sección queda fija (adaptado de "Story scroll" de 21st.dev).
export function Principles() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(principles.length - 1, Math.floor(v * principles.length))));
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative" style={{ height: `${principles.length * 70}svh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center">
        <div className={wrap}>
          <p className="label text-muted">Nuestros compromisos</p>
          <div className="relative mt-8 min-h-[4em] text-[clamp(28px,5.6vw,84px)]">
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -40, filter: "blur(8px)" }}
                transition={{ duration: 0.7, ease }}
                className="display max-w-[16em]"
              >
                {principles[active]}
              </motion.p>
            </AnimatePresence>
          </div>
          <ul className="sr-only">
            {principles.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <div className="mt-12 h-px w-full max-w-md bg-rule" aria-hidden="true">
            <motion.div style={{ width: bar }} className="h-px bg-ink" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Differentiators() {
  return (
    <section className="border-t border-rule py-20 md:py-28">
      <div className={wrap}>
        <Heading lines={["Lo que cambia", "al trabajar con nosotros"]} />
        <div className="mt-14 grid border-t border-rule sm:grid-cols-2 lg:grid-cols-5">
          {differentiators.map((d, i) => (
            <Rise key={d.title} delay={i * 0.06} className="border-b border-rule py-7 sm:pr-8 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
              <h3 className="text-lg font-medium">{d.title}</h3>
              <p className="mt-2 text-muted">{d.text}</p>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

// Banda de herramientas sobre negro, solo las que nombra el catálogo (adaptado de los "Marquees" de 21st.dev).
export function Tools() {
  const row = [...tools, ...tools];
  return (
    <section aria-labelledby="tools-title" className="tone-dark overflow-hidden py-16">
      <p id="tools-title" className={`${wrap} label text-muted`}>
        Herramientas con las que construimos
      </p>
      <ul className="sr-only">
        {tools.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div aria-hidden="true" className="relative mt-8 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="marquee flex w-max items-center gap-14 hover:[animation-play-state:paused]">
          {row.map((t, i) => (
            <span key={i} className="title flex items-center gap-14 text-[clamp(28px,3.6vw,52px)] whitespace-nowrap text-soft">
              {t}
              <span className="block h-2 w-2 rotate-45 border border-muted" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// Proceso en cuatro pasos con una línea que se traza al desplazarse (adaptado de "Timeline" de 21st.dev).
export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.5"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="como" className="py-20 md:py-28">
      <div className={`${wrap} grid gap-14 lg:grid-cols-[1fr_1.4fr]`}>
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Heading label="Cómo trabajamos" lines={["Cómo trabajamos", "y qué recibe en cada paso"]} />
        </div>
        <ol ref={ref} className="relative">
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-px bg-rule" />
          <motion.span aria-hidden="true" style={{ height }} className="absolute top-2 left-[7px] w-px bg-ink" />
          {steps.map((s, i) => (
            <li key={s.title} className="relative pb-16 pl-12 last:pb-0">
              <span aria-hidden="true" className="absolute top-2 left-0 h-[15px] w-[15px] rounded-full border border-ink bg-ground" />
              <p className="label text-muted">Paso {i + 1}</p>
              <MaskLines as="h3" lines={[s.title]} className="title mt-3 text-[clamp(22px,2.4vw,34px)]" />
              <Rise delay={0.1}>
                <p className="mt-3 max-w-[46ch] text-soft">{s.text}</p>
              </Rise>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// Preguntas con apertura animada (adaptado de los "Accordions" de 21st.dev).
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="preguntas" className="border-t border-rule py-20 md:py-28">
      <div className={`${wrap} grid gap-12 lg:grid-cols-[1fr_1.6fr]`}>
        <Heading lines={["Lo que nos preguntan", "antes de contratar"]} />
        <div className="border-t border-rule">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-rule">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium md:text-xl"
                  >
                    {f.q}
                    <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
                      <span className="absolute top-1/2 left-0 h-px w-4 bg-ink" />
                      <span className={`absolute top-0 left-1/2 h-4 w-px bg-ink transition-transform duration-500 ${isOpen ? "scale-y-0" : ""}`} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[62ch] pb-7 text-soft">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
