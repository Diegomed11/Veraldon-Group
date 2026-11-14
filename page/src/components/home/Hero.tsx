"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { site } from "@/content/site";
import { Arrow, NotchLink } from "@/components/motion/primitives";

const ease = [0.16, 1, 0.3, 1] as const;

const POSTER = "/video/poster.jpg";
// El video no se reproduce: el scroll lo recorre cuadro por cuadro. En pantallas angostas se usa una copia más ligera.
const SCRUB = "/video/hero-scrub.mp4";
const SCRUB_MOBILE = "/video/hero-scrub-movil.mp4";

// Momento del recorrido (de 0 a 1) en que entra cada escena después de la primera. Van al paso del video:
// los papeles se vuelven red (sistemas), la señal roja la recorre (datos), la red se vuelve cerebro (IA)
// y el cerebro queda completo (evidencia).
const SCENE_STARTS = [0.14, 0.36, 0.6, 0.82];

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

// Portada sobre negro con el video arriba y el argumento abajo. La sección queda fija varias pantallas:
// al bajar, el video avanza y cada escena explica una cosa que hacemos y lo que recibe el cliente.
// Si el visitante pide menos movimiento, solo se ve el póster con la primera escena.
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const target = useRef(0);
  const [scene, setScene] = useState(0);
  const [loaded, setLoaded] = useState<{ file: string; url: string } | null>(null);
  const [readySrc, setReadySrc] = useState<string | null>(null);

  const hydrated = useSyncExternalStore(subscribeNever, () => true, () => false);
  const reduce = useMedia("(prefers-reduced-motion: reduce)");
  const wide = useMedia("(min-width: 768px)");
  const scrub = hydrated && !reduce;
  const file = wide ? SCRUB : SCRUB_MOBILE;
  const src = scrub && loaded && loaded.file === file ? loaded.url : null;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    target.current = v;
    setScene(SCENE_STARTS.filter((start) => v >= start).length);
  });

  // El archivo se baja completo y se entrega al video desde memoria: así cada salto es inmediato
  // y no depende de que el servidor atienda peticiones por rangos.
  useEffect(() => {
    if (!scrub) return;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData) return;
    const ctrl = new AbortController();
    let url = "";
    fetch(file, { signal: ctrl.signal })
      .then((res) => (res.ok ? res.blob() : Promise.reject(new Error(String(res.status)))))
      .then((blob) => {
        url = URL.createObjectURL(blob);
        setLoaded({ file, url });
      })
      .catch(() => {});
    return () => {
      ctrl.abort();
      if (url) URL.revokeObjectURL(url);
    };
  }, [scrub, file]);

  // Recorrido: en cada cuadro el video se acerca al punto que pide el scroll, sin encimar saltos.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;
    // En iPhone un video que nunca se ha reproducido no pinta los saltos: se arranca en silencio y se pausa.
    // Hasta que ese arranque termina no se mueve el video, para no interrumpirlo.
    let primed = false;
    video.muted = true;
    video
      .play()
      .then(() => video.pause())
      .catch(() => {})
      .finally(() => {
        primed = true;
      });

    let raf = 0;
    let shown = -1;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!primed || video.readyState < 2 || video.seeking || !video.duration) return;
      const end = video.duration - 0.05;
      const want = Math.min(end, Math.max(0, target.current * end));
      shown = shown < 0 ? want : shown + (want - shown) * 0.3;
      if (Math.abs(shown - video.currentTime) > 0.02) video.currentTime = shown;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [src]);

  // Todas las escenas van en el HTML para que los buscadores las lean; sin recorrido solo se ve la primera.
  const scenes = site.heroScenes;
  const active = scrub ? Math.min(scene, scenes.length - 1) : 0;

  return (
    <section ref={ref} data-dark-hero className={`tone-dark relative bg-[#050505] ${scrub ? "h-[480svh] md:h-[540svh]" : ""}`}>
      <div className="sticky top-0 h-[100svh] min-h-[700px] overflow-hidden">
        {/* El video ocupa un recuadro centrado en la mitad superior; el fondo de la sección es su mismo negro. */}
        <div className="edge-fade absolute top-[27%] left-1/2 aspect-video w-[128vw] -translate-x-1/2 -translate-y-1/2 md:top-[35%] md:h-[min(56svh,58vw)] md:w-auto">
          <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="absolute inset-0 h-full w-full">
            <g fill="none" stroke="#ffffff" strokeWidth="1" vectorEffect="non-scaling-stroke">
              {chevrons.map((d, k) => (
                <path key={k} d={d} strokeOpacity={0.1 + (k % 3 === 0 ? 0.08 : 0)} />
              ))}
            </g>
          </svg>
          <Image src={POSTER} alt="" fill priority sizes="(min-width: 768px) 100svh, 128vw" className="object-cover" />
          {src && (
            <video
              key={src}
              ref={videoRef}
              src={src}
              muted
              playsInline
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
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[58%] bg-[linear-gradient(0deg,#050505_38%,rgba(5,5,5,0)_100%)]" />

        {/* Índice del recorrido: la línea baja con el scroll y marca en qué parte va el visitante. */}
        {scrub && (
          <div aria-hidden="true" className="absolute top-1/2 right-5 hidden -translate-y-1/2 md:right-10 md:block">
            <ol className="relative grid gap-5 border-l border-rule py-1 pl-5">
              <motion.li style={{ height: fill }} className="absolute top-0 -left-px w-px bg-ink" />
              {scenes.map((s, i) => (
                <li key={s.name} className={`label transition-colors duration-500 ${i === active ? "text-ink" : "text-muted"}`}>
                  {s.name}
                </li>
              ))}
            </ol>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.3 }}
          className="absolute inset-x-0 bottom-0 mx-auto max-w-[1440px] px-5 pb-8 md:px-10 md:pb-12"
        >
          <div className="grid">
            {scenes.map((s, i) => {
              const Tag = i === 0 ? "h1" : "h2";
              // Al bajar, la escena que ya pasó sube y la que viene entra desde abajo.
              const place = i === active ? "opacity-100" : `pointer-events-none opacity-0 ${i < active ? "-translate-y-6" : "translate-y-6"}`;
              return (
                <div
                  key={s.name}
                  inert={i !== active}
                  className={`col-start-1 row-start-1 self-end transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${place}`}
                >
                  <p className="label text-soft">{s.kicker}</p>
                  <Tag className="display mt-4 text-[clamp(23px,6.4vw,36px)] md:text-[clamp(28px,3.6vw,52px)]">
                    {s.lines.map((line, n) => (
                      <span key={line} className={`block ${n % 2 === 1 ? "pl-[0.9em] md:pl-[1.5em]" : ""}`}>
                        {line}
                      </span>
                    ))}
                  </Tag>
                  <p className="mt-5 max-w-[54ch] text-[15px] leading-relaxed text-soft md:text-lg">{s.text}</p>
                  {s.href && (
                    <Link href={s.href} className="label mt-5 inline-flex min-h-11 items-center gap-3 text-ink underline-offset-8 hover:underline">
                      Ver la línea
                      <Arrow />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-8">
            <NotchLink href="#contacto">Hablemos 30 minutos de su operación</NotchLink>
            <p className="hidden text-sm text-soft sm:block">Sin costo. Respondemos el mismo día hábil.</p>
            {scrub && (
              <div aria-hidden="true" className="flex w-full items-center gap-4 md:hidden">
                <span className="label shrink-0 text-muted">{scenes[active].name}</span>
                <span className="block h-px flex-1 bg-rule">
                  <motion.span style={{ width: fill }} className="block h-px bg-ink" />
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
