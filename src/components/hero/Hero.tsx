"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { copy } from "@/content/copy.es";
import { whatsappLink } from "@/lib/whatsapp";

export const Hero: React.FC = () => {
  const whatsappHref = whatsappLink(copy.contact.defaultMessage);

  const containerRef = useRef<HTMLElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const sparkFieldRef = useRef<HTMLDivElement>(null);
  const crosshairRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Respiración cinematográfica continua del poster (Dolly / Ken Burns en bucle infinito)
      if (posterRef.current) {
        gsap.to(posterRef.current, {
          scale: 1.06,
          xPercent: 1.5,
          yPercent: -1.2,
          duration: 12,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      // 2. Halo de resplandor de arco voltaico (parpadeo de soldadura en bucle)
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.65,
          scale: 1.15,
          duration: 2.2,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
        });
      }

      // 3. Chispas industriales de arco flotando en bucle
      if (sparkFieldRef.current) {
        const sparks = sparkFieldRef.current.children;
        Array.from(sparks).forEach((spark, i) => {
          gsap.set(spark, {
            x: gsap.utils.random(-150, 150),
            y: gsap.utils.random(-80, 80),
            opacity: gsap.utils.random(0.2, 0.8),
            scale: gsap.utils.random(0.5, 1.4),
          });

          gsap.to(spark, {
            y: "-=140",
            x: `+=${gsap.utils.random(-40, 40)}`,
            opacity: 0,
            duration: gsap.utils.random(1.8, 3.6),
            ease: "power1.out",
            repeat: -1,
            delay: i * 0.25,
          });
        });
      }

      // 4. Oscilación sutil de la retícula / crosshair industrial
      if (crosshairRef.current) {
        gsap.to(crosshairRef.current, {
          rotation: 360,
          duration: 90,
          ease: "none",
          repeat: -1,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Presentación MAQSYMA"
      className="relative h-screen w-full flex flex-col justify-between overflow-hidden pt-28 pb-12 sm:pb-16 bg-[#090A0D]"
    >
      {/* ── POSTER EN PANTALLA COMPLETA 100% NÍTIDO SIN OPACIDAD ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
        <div ref={posterRef} className="relative w-full h-full will-change-transform">
          <Image
            src="/scenes/entrada.webp"
            alt="Entorno industrial y equipamiento de soldadura MAQSYMA"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Resplandor dinámico de arco voltaico en bucle (GSAP) */}
        <div
          ref={glowRef}
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[var(--color-oro)]/20 blur-[130px] rounded-full pointer-events-none opacity-40 will-change-transform"
        />

        {/* Campo de chispas industriales animadas en bucle con GSAP */}
        <div
          ref={sparkFieldRef}
          className="absolute top-1/2 left-1/3 w-64 h-64 pointer-events-none z-10"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-[var(--color-oro-claro)] shadow-[0_0_8px_var(--color-oro)]"
            />
          ))}
        </div>

        {/* Retícula técnica y crosshair sutil */}
        <div
          ref={crosshairRef}
          className="absolute right-12 top-1/3 w-72 h-72 rounded-full border border-white/10 opacity-30 pointer-events-none hidden md:block"
          style={{ borderStyle: "dashed" }}
        />

        {/* Viñeta cinematográfica limpia en bordes para garantizar lectura impecable sin tapar el centro */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090A0D] via-transparent to-[#090A0D]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090A0D]/70 via-transparent to-[#090A0D]/30 pointer-events-none" />
      </div>

      {/* ── CONTENIDO HERO: TIPOGRAFÍA CONTROLADA, CONCISA Y PREMIUM ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 mt-auto">
        <div className="max-w-2xl space-y-5">
          {/* Badge mínimo con estado */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded bg-[#090A0D]/80 backdrop-blur-md border border-[#202533] text-[11px] font-mono uppercase tracking-widest text-[var(--color-oro-claro)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-oro)] animate-pulse" />
            <span>ESAB LÍNEA OFICIAL · AREQUIPA</span>
          </div>

          {/* Titular contundente a tamaño refinado (sin textos gigantescos desbordantes) */}
          <h1 className="font-['Syne',sans-serif] text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.05] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            Potencia y Precisión <br />
            <span className="text-[var(--color-oro-claro)]">
              Industrial.
            </span>
          </h1>

          {/* Frase corta y precisa (sin exceso de párrafos comerciales) */}
          <p className="text-sm sm:text-base text-neutral-300 font-light max-w-lg leading-relaxed drop-shadow-md">
            Venta y alquiler de equipamiento para soldadura de alto ciclo y corte en Arequipa y el sur peruano.
          </p>

          {/* Botones de acción directos y limpios */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="#escenas"
              className="inline-flex items-center gap-2 rounded bg-gradient-to-r from-[var(--color-oro-claro)] via-[var(--color-oro)] to-[var(--color-oro-oscuro)] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#090A0D] transition-all hover:brightness-110 active:scale-95 shadow-lg shadow-[var(--color-oro)]/20"
            >
              <span>Explorar Procesos</span>
              <span className="font-mono">↓</span>
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded bg-[#0E1015]/80 hover:bg-[#161922] text-neutral-200 hover:text-white px-6 py-3 text-xs font-semibold uppercase tracking-wider border border-white/10 transition-all backdrop-blur-md"
            >
              <span>Hablar con MAQSYMA</span>
              <span className="text-emerald-400 font-mono text-xs">●</span>
            </a>
          </div>
        </div>

        {/* Fila técnica compacta al pie del viewport */}
        <div className="mt-10 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-6">
            <span className="text-neutral-200 font-semibold">ESAB HEAVY DUTY</span>
            <span>VENTA & ALQUILER</span>
            <span className="hidden sm:inline">HASTA 600A+</span>
          </div>
          <span className="text-[var(--color-oro-claro)]">AREQUIPA · PERÚ</span>
        </div>
      </div>
    </section>
  );
};
