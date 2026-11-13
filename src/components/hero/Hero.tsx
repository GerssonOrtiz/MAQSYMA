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
      aria-label="Presentación principal de Maqsyma"
      className="relative min-h-[92dvh] sm:min-h-[100dvh] w-full flex flex-col justify-end overflow-hidden pb-14 sm:pb-20 pt-32"
    >
      {/* ── Fondo Inmersivo a Pantalla Completa: Imagen nítida + Video atmosférico ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <Image
          src="/scenes/entrada.webp"
          alt="Taller y equipamiento industrial Maqsyma Arequipa"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />

        {/* Video ambiental industrial si está presente */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 mix-blend-screen ${
            videoLoaded ? "opacity-60" : "opacity-0"
          }`}
        >
          <source src="/images/Maqsyma_intro.mp4" type="video/mp4" />
        </video>

        {/* Gradientes cinematográficos industriales oscuros */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-[#0a0b0d]/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b0d]/90 via-[#0a0b0d]/40 to-transparent" />

        {/* Resplandor focal ámbar/dorado de taller */}
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[var(--color-oro)]/10 blur-[140px] rounded-full pointer-events-none" />
      </div>

      {/* ── Contenido Hero Moderno con Identidad Editorial y Comercial ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl space-y-6">
          {/* Badge de ubicación y especialidad */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono uppercase tracking-widest text-[var(--color-oro-claro)]">
            <span className="w-2 h-2 rounded-full bg-[var(--color-oro)] animate-ping" />
            <span>{copy.hero.badge} · Venta & Alquiler</span>
          </div>

          {/* Titular Principal Industrial */}
          <h1 className="font-['Syne',sans-serif] text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-[0.95] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            {copy.hero.titlePrimary} <br />
            <span className="bg-gradient-to-r from-[var(--color-oro-claro)] via-[var(--color-oro)] to-amber-200 bg-clip-text text-transparent">
              {copy.hero.titleHighlight}
            </span>
          </h1>

          {/* Subtítulo con propuesta de valor clara */}
          <p className="text-base sm:text-xl text-neutral-300 font-light max-w-2xl leading-relaxed drop-shadow-md">
            {copy.hero.subtitle}
          </p>

          {/* CTAs Funcionales */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#productos"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[var(--color-oro-claro)] via-[var(--color-oro)] to-[var(--color-oro-oscuro)] px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-[var(--color-carbon)] transition-all duration-200 hover:brightness-110 active:scale-95 shadow-xl shadow-[var(--color-oro)]/20"
            >
              <span>{copy.hero.primaryCta}</span>
              <span className="text-base">↓</span>
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white px-7 py-3.5 text-sm font-semibold tracking-wide border border-white/10 transition-all duration-200 backdrop-blur-md"
            >
              <span>{copy.hero.secondaryCta}</span>
              <span className="text-emerald-400 font-mono">●</span>
            </a>
          </div>

          {/* Métricas / Garantías Operativas */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6 text-neutral-400 text-xs">
            <div>
              <div className="text-white font-mono font-bold text-base sm:text-lg">ESAB & Multimarca</div>
              <div className="text-neutral-400">Garantía oficial y soporte</div>
            </div>
            <div>
              <div className="text-white font-mono font-bold text-base sm:text-lg">Entrega en Arequipa</div>
              <div className="text-neutral-400">Despacho ágil a mina y obra</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-white font-mono font-bold text-base sm:text-lg">Venta y Alquiler</div>
              <div className="text-neutral-400">Flexibilidad operativa total</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
