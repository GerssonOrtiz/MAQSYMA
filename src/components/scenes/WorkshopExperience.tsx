"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { scenes } from "@/config/scenes";
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
              {scene.image.placeholder ? (
                <ScenePlaceholder sceneId={scene.id} process={scene.process} />
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={scene.image.desktop}
                    alt={scene.image.alt}
                    fill
                    priority={idx === 0}
                    className="object-cover object-center"
                    sizes="100vw"
                  />
                  {/* Overlay multinivel de alto contraste para máxima legibilidad tipográfica */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-carbon)] via-[var(--color-carbon)]/70 to-[var(--color-carbon)]/85" />
                  <div className="absolute inset-0 bg-black/35" />
                  {/* Textura sutil técnica sobrepuesta */}
                  <div
                    className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(var(--color-plata) 1px, transparent 1px)`,
                      backgroundSize: "28px 28px",
                    }}
                  />
                </div>
              )}
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
                    : "relative p-8 rounded-2xl bg-[var(--color-grafito)]/90 border border-[var(--color-grafito-2)]"
                }`}
                style={{
                  opacity: isJsReady ? (idx === 0 ? 1 : 0) : 1,
                  visibility: isJsReady ? (idx === 0 ? "visible" : "hidden") : "visible",
                }}
              >
                {/* Tarjeta con Glassmorphism oscuro técnico para contraste impecable */}
                <div className="p-6 sm:p-10 rounded-2xl bg-[var(--color-carbon)]/85 sm:bg-[var(--color-carbon)]/75 backdrop-blur-md border border-[var(--color-grafito-2)]/90 shadow-2xl">
                  {/* Píldora de estado con credibilidad técnica / ESAB */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-grafito)]/90 border border-[var(--color-grafito-2)] text-xs text-[var(--color-oro-claro)] uppercase tracking-wider mb-4 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-oro)] animate-pulse" />
                    <span className="font-semibold">{scene.label}</span>
                    <span className="opacity-40">|</span>
                    <span className="font-mono text-[11px] text-[var(--color-gris)]">{scene.process}</span>
                    <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-[var(--color-oro)]/15 text-[10px] font-bold text-[var(--color-oro)] ml-1 border border-[var(--color-oro)]/30">
                      ESAB OFICIAL
                    </span>
                  </div>

                  {/* Titular */}
                  <h2 className="font-['Montserrat',sans-serif] text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--color-plata)] leading-tight mb-4 drop-shadow-lg">
                    {scene.title}
                  </h2>

                  {/* Descripción técnica */}
                  <p className="text-base sm:text-lg text-[var(--color-gris-claro,#d1d5db)] max-w-xl mx-auto leading-relaxed mb-6 font-normal">
                    {scene.text}
                  </p>

                  {/* Badge de garantía de servicio rápido en Arequipa */}
                  <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[var(--color-gris)] mb-6 font-mono">
                    <span className="inline-flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-[var(--color-oro)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Disponibilidad Arequipa
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-[var(--color-oro)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Soporte y Garantía
                    </span>
                  </div>

                  {/* Botón CTA contextual por escena con WhatsApp */}
                  {scene.cta ? (
                    <div className="pt-1">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 rounded-lg bg-[var(--color-oro)] px-6 py-3 text-sm font-bold text-[var(--color-carbon)] transition-all duration-200 hover:bg-[var(--color-oro-claro)] hover:shadow-[0_0_24px_rgba(201,162,74,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-98"
                      >
                        <span>{scene.cta.label}</span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </a>
                    </div>
                  ) : (
                    <div className="pt-1">
                      <a
                        href={`https://wa.me/${copy.contact.whatsappNumber}?text=${encodeURIComponent(copy.contact.defaultMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-grafito-2)] hover:bg-[var(--color-grafito)] border border-[var(--color-oro)]/40 px-6 py-3 text-sm font-semibold text-[var(--color-plata)] transition-all duration-200"
                      >
                        <span>Contactar Asesor Técnico</span>
                        <span>→</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicador de progreso lateral / inferior interactivo y accesible con etiquetas */}
        {isJsReady && (
          <aside
            aria-label="Navegación del taller"
            className="absolute z-20 bottom-6 sm:bottom-auto sm:right-6 sm:top-1/2 sm:-translate-y-1/2 flex sm:flex-col items-center justify-center w-full sm:w-auto pointer-events-auto px-4"
          >
            <div
              ref={indicatorsRef}
              className="flex sm:flex-col items-center gap-3 p-2.5 rounded-2xl sm:rounded-full bg-[var(--color-carbon)]/85 backdrop-blur-md border border-[var(--color-grafito-2)] shadow-2xl"
            >
              {scenes.map((scene, i) => (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => handleJumpToScene(i)}
                  aria-label={`Saltar a escena ${i + 1}: ${scene.label}`}
                  title={`${i + 1}. ${scene.label} (${scene.process})`}
                  className="group relative flex items-center justify-center p-1 focus:outline-none focus:ring-2 focus:ring-[var(--color-oro)] rounded-full transition-transform"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-grafito-2)] transition-all duration-300 block" />

                  {/* Tooltip lateral en hover para pantallas de escritorio */}
                  <span className="hidden sm:block absolute right-full mr-3 px-2.5 py-1 text-xs font-medium text-[var(--color-plata)] bg-[var(--color-carbon)] border border-[var(--color-grafito-2)] rounded shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
                    {i + 1}. {scene.label}
                  </span>
                </button>
              ))}
            </div>
          </aside>
        )}
      </div>
    </section>
  );
};
