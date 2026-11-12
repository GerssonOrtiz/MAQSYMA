"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { scenes, Scene } from "@/config/scenes";
import { useSceneProgress } from "@/lib/scroll/useSceneProgress";
import { applyScenes } from "@/lib/scroll/applyScenes";
import { ScenePlaceholder } from "./ScenePlaceholder";
import { copy } from "@/content/copy.es";

export const WorkshopExperience: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const layersRef = useRef<HTMLDivElement | null>(null);
  const textsRef = useRef<HTMLDivElement | null>(null);
  const indicatorsRef = useRef<HTMLDivElement | null>(null);

  const [isJsReady, setIsJsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Inicialización de entorno del cliente
  useEffect(() => {
    setIsJsReady(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Callback ultra-optimizado que opera directo en el DOM (sin disparar re-renders de React)
  const handleProgress = useCallback(
    (p: number) => {
      if (!layersRef.current || !textsRef.current || !indicatorsRef.current) return;

      const imageEls = Array.from(layersRef.current.children) as HTMLElement[];
      const textEls = Array.from(textsRef.current.children) as HTMLElement[];
      const indicatorEls = Array.from(indicatorsRef.current.children) as HTMLElement[];

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      applyScenes(p, imageEls, textEls, indicatorEls, isMobile, reducedMotion);
    },
    [isMobile]
  );

  // Motor de scroll suave
  useSceneProgress(containerRef, {
    onUpdate: handleProgress,
    ease: isMobile ? 0.12 : 0.09,
  });

  // Salto accesible al pulsar los puntos de navegación
  const handleJumpToScene = (index: number) => {
    if (!containerRef.current) return;
    const n = scenes.length;
    const containerTop = containerRef.current.offsetTop;
    const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (index / (n - 1)) * totalHeight;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  const n = scenes.length;

  return (
    <section
      id="taller"
      ref={containerRef}
      aria-label="Recorrido técnico por el taller Maqsyma"
      className={`relative w-full ${isJsReady ? "js-ready" : "no-js-fallback"}`}
      style={{
        // Altura continua calculada según la cantidad de escenas
        height: isJsReady ? `calc(${n} * 100vh)` : "auto",
      }}
    >
      {/* Contenedor Sticky para experiencia interactiva */}
      <div
        className={`w-full overflow-hidden ${
          isJsReady
            ? "sticky top-0 h-[100dvh]"
            : "relative h-auto py-12 flex flex-col gap-16"
        }`}
      >
        {/* Capas de imagen / background placeholders */}
        <div
          ref={layersRef}
          aria-hidden="true"
          className={isJsReady ? "absolute inset-0 z-0 pointer-events-none" : "hidden"}
        >
          {scenes.map((scene, idx) => (
            <div
              key={scene.id}
              className="absolute inset-0 w-full h-full will-change-transform will-change-opacity transition-opacity duration-75"
              style={{
                opacity: idx === 0 ? 1 : 0,
                visibility: idx === 0 ? "visible" : "hidden",
              }}
            >
              <ScenePlaceholder sceneId={scene.id} process={scene.process} />
            </div>
          ))}
        </div>

        {/* Capas de texto y llamadas a cotización */}
        <div
          ref={textsRef}
          className={
            isJsReady
              ? "absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
              : "relative z-10 max-w-5xl mx-auto px-6 space-y-16"
          }
        >
          {scenes.map((scene, idx) => {
            const whatsappUrl = `https://wa.me/${copy.contact.whatsappNumber}?text=${encodeURIComponent(
              scene.cta?.message || copy.contact.defaultMessage
            )}`;

            return (
              <div
                key={scene.id}
                className={`${
                  isJsReady
                    ? "absolute max-w-3xl w-full px-6 text-center will-change-transform will-change-opacity pointer-events-auto"
                    : "relative p-8 rounded-xl bg-[var(--color-grafito)] border border-[var(--color-grafito-2)]"
                }`}
                style={{
                  opacity: isJsReady ? (idx === 0 ? 1 : 0) : 1,
                  visibility: isJsReady ? (idx === 0 ? "visible" : "hidden") : "visible",
                }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[var(--color-grafito)]/80 border border-[var(--color-grafito-2)] text-xs text-[var(--color-oro-claro)] uppercase tracking-wider mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-oro)]" />
                  {scene.label} · {scene.process}
                </div>

                <h2 className="font-['Montserrat',sans-serif] text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--color-plata)] leading-tight mb-4 drop-shadow-md">
                  {scene.title}
                </h2>

                <p className="text-base sm:text-xl text-[var(--color-gris)] max-w-xl mx-auto leading-relaxed mb-6">
                  {scene.text}
                </p>

                {scene.cta && (
                  <div className="pt-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md bg-[var(--color-oro)] px-5 py-2.5 text-xs sm:text-sm font-bold text-[var(--color-carbon)] transition-all duration-200 hover:bg-[var(--color-oro-claro)] hover:shadow-[0_0_20px_rgba(201,162,74,0.3)] active:scale-95"
                    >
                      <span>{scene.cta.label}</span>
                      <span>→</span>
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Indicador de progreso lateral / inferior interactivo y accesible */}
        {isJsReady && (
          <aside
            aria-label="Indicador de avance en el taller"
            className="absolute z-20 bottom-8 sm:bottom-auto sm:right-8 sm:top-1/2 sm:-translate-y-1/2 flex sm:flex-col items-center justify-center gap-3 w-full sm:w-auto pointer-events-auto px-4"
          >
            <div
              ref={indicatorsRef}
              className="flex sm:flex-col items-center gap-2.5 p-2 rounded-full bg-[var(--color-carbon)]/70 backdrop-blur-md border border-[var(--color-grafito-2)] shadow-xl"
            >
              {scenes.map((scene, i) => (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => handleJumpToScene(i)}
                  aria-label={`Saltar a escena ${i + 1}: ${scene.label}`}
                  title={`${scene.label} (${scene.process})`}
                  className="w-2.5 h-2.5 rounded-full bg-[var(--color-grafito-2)] transition-all duration-300 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-[var(--color-oro)]"
                />
              ))}
            </div>
          </aside>
        )}
      </div>
    </section>
  );
};
