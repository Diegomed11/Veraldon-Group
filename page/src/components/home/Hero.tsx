"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { site } from "@/content/site";
import { NotchLink } from "@/components/motion/primitives";

const ease = [0.16, 1, 0.3, 1] as const;

const POSTER = "/video/poster.jpg";
// En escritorio el video no se reproduce: el scroll lo recorre cuadro por cuadro.
const SCRUB = "/video/hero-scrub.mp4";
// En celular y tableta se reproduce en ciclo, más ligero.
const LOOP = "/video/hero-loop.mp4";

// Momento del recorrido (de 0 a 1) en que entra cada texto después del lema.
const BEAT_STARTS = [0.12, 0.36, 0.68];

type Mode = "poster" | "scrub" | "loop";

function useMedia(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const subscribeNever = () => () => {};

// Chevrones concéntricos: la V del monograma convertida en curvas de nivel.
// Quedan debajo del póster como respaldo, por si la imagen o el video no cargan.
const chevrons = Array.from({ length: 18 }, (_, k) => {
  const w = 110 + k * 44;
  const top = 250 - k * 14;
  const depth = 260 + k * 26;
  return `M${800 - w} ${top} L800 ${top + depth} L${800 + w} ${top}`;
});

// Portada sobre negro con el video al centro. En escritorio la sección queda fija varias pantallas
// mientras el scroll avanza o regresa el video y cambia el texto; con menos movimiento solo se ve el póster.
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const target = useRef(0);
  const [beat, setBeat] = useState(0);
  const [loaded, setLoaded] = useState<{ mode: Mode; url: string } | null>(null);
  const [readySrc, setReadySrc] = useState<string | null>(null);

  const hydrated = useSyncExternalStore(subscribeNever, () => true, () => false);
  const reduce = useMedia("(prefers-reduced-motion: reduce)");
  const desktop = useMedia("(min-width: 1024px) and (pointer: fine)");
  const mode: Mode = !hydrated || reduce ? "poster" : desktop ? "scrub" : "loop";
  const src = loaded && loaded.mode === mode ? loaded.url : null;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    target.current = v;
    setBeat(BEAT_STARTS.filter((start) => v >= start).length);
  });

  // El archivo se baja completo y se entrega al video desde memoria: así cada salto es inmediato
  // y no depende de que el servidor atienda peticiones por rangos.
  useEffect(() => {
    if (mode === "poster") return;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData) return;
    const ctrl = new AbortController();
    let url = "";
    fetch(mode === "scrub" ? SCRUB : LOOP, { signal: ctrl.signal })
      .then((res) => (res.ok ? res.blob() : Promise.reject(new Error(String(res.status)))))
      .then((blob) => {
        url = URL.createObjectURL(blob);
        setLoaded({ mode, url });
      })
      .catch(() => {});
    return () => {
      ctrl.abort();
      if (url) URL.revokeObjectURL(url);
    };
  }, [mode]);

  // Recorrido: en cada cuadro el video se acerca al punto que pide el scroll, sin encimar saltos.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;
    if (mode === "loop") {
      video.play().catch(() => {});
      return;
    }
    let raf = 0;
    let shown = -1;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (video.readyState < 2 || video.seeking || !video.duration) return;
      const end = video.duration - 0.05;
      const want = Math.min(end, Math.max(0, target.current * end));
      shown = shown < 0 ? want : shown + (want - shown) * 0.2;
      if (Math.abs(shown - video.currentTime) > 0.02) video.currentTime = shown;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mode, src]);

  // Los textos que siguen al lema solo existen cuando el scroll recorre el video.
  const beats = mode === "scrub" ? site.heroBeats : site.heroBeats.slice(0, 1);
  const active = mode === "scrub" ? beat : 0;

  return (
    <section ref={ref} data-dark-hero className={`tone-dark relative bg-[#050505] ${mode === "scrub" ? "h-[400svh]" : ""}`}>
      <div className="sticky top-0 h-[100svh] min-h-[680px] overflow-hidden">
        {/* El video ocupa un recuadro centrado; el fondo de la sección es el mismo negro del video. */}
        <div className="edge-fade absolute top-[36%] left-1/2 aspect-video w-[150vw] -translate-x-1/2 -translate-y-1/2 md:top-[41%] md:h-[min(76svh,66vw)] md:w-auto">
          <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="absolute inset-0 h-full w-full">
            <g fill="none" stroke="#ffffff" strokeWidth="1" vectorEffect="non-scaling-stroke">
              {chevrons.map((d, k) => (
                <path key={k} d={d} strokeOpacity={0.1 + (k % 3 === 0 ? 0.08 : 0)} />
              ))}
            </g>
          </svg>
          <Image src={POSTER} alt="" fill priority sizes="(min-width: 768px) 140svh, 150vw" className="object-cover" />
          {src && (
            <video
              key={src}
              ref={videoRef}
              src={src}
              muted
              playsInline
              loop={mode === "loop"}
              autoPlay={mode === "loop"}
              preload="auto"
              disablePictureInPicture
              aria-hidden="true"
              tabIndex={-1}
              onLoadedData={() => setReadySrc(src)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${readySrc === src ? "opacity-100" : "opacity-0"}`}
            />
          )}
        </div>

        {/* Velo inferior para que el texto se lea sobre cualquier cuadro del video. */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[46%] bg-[linear-gradient(0deg,#050505_22%,rgba(5,5,5,0)_100%)]" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.3 }}
          className="absolute inset-x-0 bottom-0 mx-auto max-w-[1440px] px-5 pb-10 md:px-10 md:pb-12"
        >
          <div className="grid">
            {beats.map((b, i) => {
              const Tag = i === 0 ? "h1" : "p";
              return (
                <div
                  key={b.label}
                  className={`col-start-1 row-start-1 self-end transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    i === active ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
                  }`}
                >
                  <p className="label max-w-[36ch] text-soft">{b.label}</p>
                  {/* En celular cada renglón va aparte y escalonado; en escritorio se juntan de dos en dos. */}
                  <Tag className="display mt-5 text-[clamp(22px,5.8vw,34px)] md:text-[clamp(30px,3.5vw,54px)]">
                    {pairs(b.lines).map((pair, row) => (
                      <span key={row} className={`block ${row % 2 === 1 ? "md:pl-[1.5em]" : ""}`}>
                        {pair.map((line, n) => (
                          <span key={line} className={`block md:inline ${(row * 2 + n) % 2 === 1 ? "pl-[0.9em] md:pl-0" : ""}`}>
                            {line}{" "}
                          </span>
                        ))}
                      </span>
                    ))}
                  </Tag>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <NotchLink href="#contacto">Hablemos 30 minutos de su operación</NotchLink>
            <p className="text-sm text-soft">Sin costo. Respondemos el mismo día hábil.</p>
            {mode === "scrub" && (
              <div aria-hidden="true" className="ml-auto flex items-center gap-4">
                <span className="label text-muted">Desplácese</span>
                <span className="block h-px w-40 bg-rule">
                  <motion.span style={{ width: bar }} className="block h-px bg-ink" />
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Agrupa los renglones de dos en dos: ["a", "b", "c"] → [["a", "b"], ["c"]].
function pairs(lines: string[]) {
  const out: string[][] = [];
  for (let i = 0; i < lines.length; i += 2) out.push(lines.slice(i, i + 2));
  return out;
}
