"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { MotionConfig } from "motion/react";

let lenis: Lenis | null = null;

// El menú a pantalla completa detiene el desplazamiento de fondo mientras está abierto.
export function setScrollLocked(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  } else {
    document.documentElement.style.overflow = locked ? "hidden" : "";
  }
}

// Desplazamiento con inercia, como en los sitios de exhibición. Se apaga si el visitante pide menos movimiento.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const instance = new Lenis({ duration: 1.15, anchors: { offset: -72 } });
    lenis = instance;
    let id = requestAnimationFrame(function raf(t) {
      instance.raf(t);
      id = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(id);
      instance.destroy();
      lenis = null;
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
