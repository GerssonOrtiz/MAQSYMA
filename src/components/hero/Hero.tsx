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
      className="relative min-h-[100dvh] w-full flex flex-col justify-end overflow-hidden pb-12 sm:pb-16 pt-28"
    >
      {/* ── Fondo Inmersivo a Pantalla Completa: Imagen base nítida + Video atmosférico ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        {/* Imagen de fondo nítida full-bleed */}
        <Image
          src="/scenes/entrada.webp"
          alt="Taller de soldadura industrial Maqsyma Arequipa"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 animate-[pulse_8s_ease-in-out_infinite]"
        />

        {/* Capa de video superpuesta (si está disponible y reproduce) */}
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

        {/* Overlay no opaco: gradientes sutiles cinematográficos que dejan ver el fondo con total brillo */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-carbon)] via-[var(--color-carbon)]/30 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-carbon)]/75 via-[var(--color-carbon)]/20 to-transparent" />

        {/* Brillo focal industrial */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[var(--color-oro)]/10 blur-[130px] rounded-full" />
      </div>

      {/* ── Contenido Hero Moderno, Conciso y de Gran Impacto Tipográfico ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl space-y-5">
          {/* Badge minimalista */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-mono uppercase tracking-widest text-[var(--color-oro-claro)]">
            <span className="w-2 h-2 rounded-full bg-[var(--color-oro)] animate-ping" />
            <span>ESAB Arequipa · Venta y Alquiler</span>
          </div>

          {/* Titular Moderno con Fuente Syne / Diseño Editorial Contemporáneo */}
          <h1 className="font-['Syne',sans-serif] text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white leading-[0.95] drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
            POTENCIA <br />
            <span className="bg-gradient-to-r from-[var(--color-oro-claro)] via-[var(--color-oro)] to-white bg-clip-text text-transparent">
              INDUSTRIAL.
            </span>
          </h1>

          {/* Subtítulo ultraconciso */}
          <p className="text-base sm:text-xl text-neutral-200 font-light max-w-lg leading-relaxed drop-shadow-md">
            Equipos de soldadura y corte de alta gama. Disponibilidad inmediata para minería y calderería.
          </p>

          {/* CTAs con estética Cyber-Glassmorphism */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[var(--color-oro)] px-7 py-3.5 text-sm font-bold text-[var(--color-carbon)] shadow-[0_0_30px_rgba(201,162,74,0.4)] transition-all duration-300 hover:bg-[var(--color-oro-claro)] hover:scale-105 active:scale-95"
            >
              <span>Cotizar Inmediato</span>
              <span className="text-base font-bold">→</span>
            </a>

            <a
              href="#taller"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10 hover:border-[var(--color-oro)] active:scale-95"
            >
              <span>Explorar Taller</span>
              <span className="text-xs text-[var(--color-oro)]">↓</span>
            </a>
          </div>
        </div>

        {/* Barra de estado inferior moderna y elegante */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Stock Permanente
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Garantía y Servicio Técnico</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Arequipa, Perú</span>
          </div>

          <a
            href="#taller"
            className="flex items-center gap-2 text-[var(--color-oro-claro)] hover:text-white transition-colors group"
          >
            <span>Desliza para recorrer</span>
            <span className="inline-block transform group-hover:translate-y-1 transition-transform">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
};
