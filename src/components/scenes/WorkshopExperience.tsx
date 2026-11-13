"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { scenes } from "@/config/scenes";
import { catalogoProductos } from "@/data/catalogoOficial";
import { useSceneProgress } from "@/lib/scroll/useSceneProgress";
import { applyScenes } from "@/lib/scroll/applyScenes";
import { ScenePlaceholder } from "./ScenePlaceholder";
import { copy } from "@/content/copy.es";
import { whatsappProductLink } from "@/lib/whatsapp";

export const WorkshopExperience: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const layersRef = useRef<HTMLDivElement | null>(null);
  const textsRef = useRef<HTMLDivElement | null>(null);
  const indicatorsRef = useRef<HTMLDivElement | null>(null);

  const [isJsReady, setIsJsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsJsReady(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  // Inercia con respuesta rápida para que la pausa se sienta instantánea
  useSceneProgress(containerRef, {
    onUpdate: handleProgress,
    ease: isMobile ? 0.14 : 0.1,
  });

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
      id="escenas"
      ref={containerRef}
      aria-label="Procesos industriales y equipamiento oficial"
      className={`relative w-full ${isJsReady ? "js-ready" : "no-js-fallback"}`}
      style={{
        // Altura extendida por escena para garantizar zona de pausa amplia
        height: isJsReady ? `calc(${n} * 150vh)` : "auto",
      }}
    >
      {/* Contenedor Sticky para experiencia cinematográfica diagonal con pausa */}
      <div
        className={`w-full overflow-hidden ${
          isJsReady
            ? "sticky top-0 h-[100dvh]"
            : "relative h-auto py-16 flex flex-col gap-20"
        }`}
      >
        {/* Capas de imagen / fondo cinematográfico */}
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
                    className="object-cover object-center filter brightness-[0.7] contrast-[1.08]"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080A] via-[#07080A]/65 to-[#07080A]/75" />
                  <div className="absolute inset-0 bg-black/35" />
                  <div className="absolute top-1/4 right-1/4 w-[460px] h-[460px] bg-[var(--color-oro)]/8 blur-[150px] pointer-events-none rounded-full" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Capas interactivas: Equipos reales integrados por cada proceso con pausa al scroll */}
        <div
          ref={textsRef}
          className={
            isJsReady
              ? "absolute inset-0 z-10 pointer-events-none flex items-center justify-center px-4 sm:px-6"
              : "relative z-10 max-w-7xl mx-auto px-6 space-y-24"
          }
        >
          {scenes.map((scene, idx) => {
            const whatsappUrl = `https://wa.me/${copy.contact.whatsappNumber}?text=${encodeURIComponent(
              scene.cta?.message || copy.contact.defaultMessage
            )}`;

            const sceneProducts = scene.featuredSlugs
              .map((slug) => catalogoProductos.find((p) => p.slug === slug))
              .filter(Boolean);

            return (
              <div
                key={scene.id}
                className={`${
                  isJsReady
                    ? "absolute max-w-6xl w-full will-change-transform will-change-opacity pointer-events-auto"
                    : "relative p-8 rounded-2xl bg-[#101217] border border-[#191D26]"
                }`}
                style={{
                  opacity: isJsReady ? (idx === 0 ? 1 : 0) : 1,
                  visibility: isJsReady ? (idx === 0 ? "visible" : "hidden") : "visible",
                }}
              >
                {/* Tarjeta de proceso con diseño refinado industrial */}
                <div className="p-6 sm:p-10 rounded-2xl bg-[#0B0D12]/95 backdrop-blur-2xl border border-[#1E2330] shadow-2xl space-y-7">
                  {/* Cabecera de la escena */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-5">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#131720] border border-[#232938] text-xs font-mono text-[var(--color-oro-claro)] uppercase tracking-wider mb-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--color-oro)] animate-ping" />
                        <span>{scene.label}</span>
                        <span className="text-neutral-500">·</span>
                        <span className="text-neutral-300 font-bold">{scene.process}</span>
                      </div>
                      <h2 className="font-['Syne',sans-serif] text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                        {scene.title}
                      </h2>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-400 max-w-md font-light leading-relaxed">
                      {scene.lead}
                    </p>
                  </div>

                  {/* Grid de Equipos del Proceso (con clic asegurado) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {sceneProducts.map((equipo) => {
                      if (!equipo) return null;
                      const prodQuoteUrl = whatsappProductLink(equipo.nombre, equipo.modelo);

                      return (
                        <div
                          key={equipo.id}
                          className="rounded-xl bg-[#10131A] border border-[#1C212E] hover:border-[var(--color-oro)]/60 p-5 flex flex-col justify-between transition-all duration-200 group shadow-lg relative"
                        >
                          <div>
                            {/* Header del producto */}
                            <div className="flex items-center justify-between text-xs font-mono mb-2">
                              <span className="text-[var(--color-oro)] font-bold">{equipo.marca}</span>
                              <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-neutral-400">
                                {equipo.proceso}
                              </span>
                            </div>

                            {/* Fotografía Oficial del Equipo */}
                            <div className="relative w-full h-36 my-2 rounded-lg bg-[#07080A] border border-white/5 flex items-center justify-center p-2 overflow-hidden">
                              {equipo.imagenUrl ? (
                                <Image
                                  src={equipo.imagenUrl}
                                  alt={equipo.nombre}
                                  fill
                                  className="object-contain p-2 filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-200"
                                  sizes="(max-width: 768px) 100vw, 300px"
                                />
                              ) : (
                                <div className="text-neutral-500 text-xs font-mono text-center">
                                  <span className="text-xl block mb-1">⚡</span>
                                  <span>Ficha Oficial</span>
                                </div>
                              )}
                            </div>

                            {/* Título */}
                            <Link href={`/equipos/${equipo.slug}`} className="block focus:outline-none focus:underline">
                              <h3 className="font-['Syne',sans-serif] text-base sm:text-lg font-bold text-white group-hover:text-[var(--color-oro-claro)] transition-colors line-clamp-1 mb-1">
                                {equipo.nombre}
                              </h3>
                            </Link>

                            <p className="text-[11px] text-neutral-400 font-light line-clamp-2 leading-relaxed mb-4">
                              {equipo.descripcionCorta}
                            </p>

                            {/* Especificación técnica */}
                            {equipo.especificaciones && (
                              <div className="text-[10px] font-mono text-neutral-400 border-t border-white/5 pt-2 flex justify-between">
                                <span>Capacidad:</span>
                                <span className="text-neutral-200 font-semibold">
                                  {equipo.especificaciones.amperajeMax || equipo.especificaciones.rodillos || "Industrial"}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Acciones interactivas directas */}
                          <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between gap-2">
                            <Link
                              href={`/equipos/${equipo.slug}`}
                              className="text-[11px] font-mono text-neutral-400 hover:text-white transition-colors"
                            >
                              Ficha →
                            </Link>
                            <a
                              href={prodQuoteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded bg-[var(--color-oro)]/15 hover:bg-[var(--color-oro)] text-[var(--color-oro)] hover:text-[#07080A] border border-[var(--color-oro)]/35 text-[10px] font-mono font-bold uppercase transition-all"
                            >
                              Consultar
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Barra de acción inferior */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
                    <span className="text-xs font-mono text-neutral-500">
                      Disponibilidad y entrega inmediata en Arequipa y el sur peruano
                    </span>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded bg-gradient-to-r from-[var(--color-oro-claro)] via-[var(--color-oro)] to-[var(--color-oro-oscuro)] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#07080A] transition-all hover:brightness-110 active:scale-95 shadow-lg shadow-[var(--color-oro)]/20"
                    >
                      <span>{scene.cta.label}</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicadores de navegación lateral interactivos */}
        {isJsReady && (
          <aside
            aria-label="Navegación entre procesos"
            className="absolute z-20 bottom-4 sm:bottom-auto sm:right-6 sm:top-1/2 sm:-translate-y-1/2 flex sm:flex-col items-center justify-center w-full sm:w-auto pointer-events-auto px-4"
          >
            <div
              ref={indicatorsRef}
              className="flex sm:flex-col items-center gap-3 p-2.5 rounded-full bg-[#07080A]/90 backdrop-blur-md border border-[#191D26] shadow-2xl"
            >
              {scenes.map((scene, i) => (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => handleJumpToScene(i)}
                  aria-label={`Saltar a escena ${i + 1}: ${scene.label}`}
                  title={`${i + 1}. ${scene.label}`}
                  className="group relative flex items-center justify-center p-1 focus:outline-none focus:ring-1 focus:ring-[var(--color-oro)] rounded-full transition-transform"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1C212E] transition-all duration-300 block" />
                  <span className="hidden sm:block absolute right-full mr-3 px-2.5 py-1 text-xs font-mono text-neutral-300 bg-[#07080A] border border-[#191D26] rounded shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
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
