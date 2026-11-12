"use client";
import { useEffect, type RefObject } from "react";

type Options = {
  onUpdate: (progress: number) => void;
  ease?: number; // 0.08 a 0.15 según el dispositivo
};

/**
 * Hook de progreso de scroll con interpolación lineal (lerp) en requestAnimationFrame
 * Reglas de 02-escenas-y-scroll:
 * 1. Sin re-renders de React (no usa useState).
 * 2. Suaviza el movimiento con inercia.
 * 3. Si prefers-reduced-motion está activo, elimina la inercia (target directo).
 */
export function useSceneProgress(
  ref: RefObject<HTMLElement | null>,
  { onUpdate, ease = 0.1 }: Options
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduce = mediaQuery.matches;

    const handleMediaChange = (e: MediaQueryListEvent) => {
      reduce = e.matches;
    };
    mediaQuery.addEventListener?.("change", handleMediaChange);

    let target = 0;
    let current = 0;
    let frame: number | null = null;

    const tick = () => {
      const diff = target - current;
      current += reduce ? diff : diff * ease;
      onUpdate(current);
      frame = Math.abs(diff) > 0.0005 ? requestAnimationFrame(tick) : null;
    };

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const range = el.offsetHeight - window.innerHeight;
      if (range <= 0) {
        target = 0;
      } else {
        target = Math.min(1, Math.max(0, -rect.top / range));
      }

      if (frame === null) {
        frame = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    measure();

    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      mediaQuery.removeEventListener?.("change", handleMediaChange);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [ref, onUpdate, ease]);
}
