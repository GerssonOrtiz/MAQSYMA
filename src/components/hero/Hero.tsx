"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { copy } from "@/content/copy.es";
import { whatsappLink } from "@/lib/whatsapp";

export const Hero: React.FC = () => {
  const whatsappHref = whatsappLink(copy.contact.defaultMessage);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  return (
    <section
      aria-label="Presentación Cinematográfica MAQSYMA"
      className="relative min-h-[95dvh] sm:min-h-screen w-full flex flex-col justify-end overflow-hidden pb-16 sm:pb-24 pt-36 bg-[#08090b]"
    >
      {/* ── Fondo Inmersivo Industrial Cinematográfico ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <Image
          src="/scenes/entrada.webp"
          alt="Entorno industrial MAQSYMA"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 filter brightness-[0.7] contrast-[1.1]"
        />

        {/* Video industrial integrado con opacidad balanceada */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 mix-blend-screen ${
            videoLoaded ? "opacity-45" : "opacity-0"
          }`}
        >
          <source src="/images/Maqsyma_intro.mp4" type="video/mp4" />
        </video>

        {/* Gradientes cinematográficos sin opacar completamente la escena */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-[#08090b]/55 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090b]/90 via-[#08090b]/40 to-transparent" />

        {/* Resplandor lateral cálido ámbar/dorado de taller industrial */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[var(--color-oro)]/10 blur-[150px] rounded-full pointer-events-none" />

        {/* Retícula técnica sutil */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* ── Contenido Editorial Hero Cinematográfico ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-4xl space-y-7">
          {/* Tag técnico / Contexto geográfico */}
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono uppercase tracking-widest text-[var(--color-oro-claro)]">
            <span className="w-2 h-2 rounded-full bg-[var(--color-oro)] animate-ping" />
            <span>{copy.hero.badge}</span>
          </div>

          {/* Gran titular cinematográfico */}
          <div className="space-y-1">
            <span className="block font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-neutral-400">
              EQUIPAMIENTO PARA SOLDADURA Y CORTE INDUSTRIAL
            </span>
            <h1 className="font-['Syne',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-[5.75rem] font-black tracking-tight text-white leading-[0.92] drop-shadow-[0_8px_40px_rgba(0,0,0,0.9)]">
              POTENCIA Y <br />
              <span className="bg-gradient-to-r from-[var(--color-oro-claro)] via-[var(--color-oro)] to-amber-200 bg-clip-text text-transparent">
                PRECISIÓN INDUSTRIAL.
              </span>
            </h1>
          </div>

          {/* Subtítulo con peso de marca */}
          <p className="text-base sm:text-xl text-neutral-300 font-light max-w-2xl leading-relaxed drop-shadow-md">
            {copy.hero.subtitle}
          </p>

          {/* CTAs Funcionales y Directos */}
          <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#productos"
              className="inline-flex items-center justify-center gap-3 rounded bg-gradient-to-r from-[var(--color-oro-claro)] via-[var(--color-oro)] to-[var(--color-oro-oscuro)] px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--color-carbon)] transition-all duration-200 hover:brightness-110 active:scale-95 shadow-xl shadow-[var(--color-oro)]/20"
            >
              <span>{copy.hero.primaryCta}</span>
              <span className="text-base font-mono">↓</span>
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded bg-[#12141a]/80 hover:bg-[#191c24] text-neutral-200 hover:text-white px-8 py-4 text-xs sm:text-sm font-semibold tracking-wide border border-white/10 transition-all duration-200 backdrop-blur-md"
            >
              <span>{copy.hero.secondaryCta}</span>
              <span className="text-emerald-400 font-mono text-xs">● ONLINE</span>
            </a>
          </div>

          {/* Microdatos técnicos al pie del hero */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 text-xs font-mono text-neutral-400">
            <div>
              <span className="text-[var(--color-oro)] block font-bold text-sm">ESAB</span>
              <span>Línea Oficial</span>
            </div>
            <div>
              <span className="text-white block font-bold text-sm">VENTA Y ALQUILER</span>
              <span>Disponibilidad Inmediata</span>
            </div>
            <div>
              <span className="text-white block font-bold text-sm">HASTA 500A+</span>
              <span>Ciclo de Trabajo Severo</span>
            </div>
            <div>
              <span className="text-white block font-bold text-sm">AREQUIPA</span>
              <span>Despacho al Sur Peruano</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
