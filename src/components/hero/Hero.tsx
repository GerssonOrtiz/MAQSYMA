"use client";

import React, { useRef, useEffect, useState } from "react";
import { copy } from "@/content/copy.es";
import { whatsappLink } from "@/lib/whatsapp";

export const Hero: React.FC = () => {
  const whatsappHref = whatsappLink(copy.contact.defaultMessage);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Intentar reproducir el video manualmente si autoPlay falla (políticas móviles)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      // Silenciar error — el video simplemente no se reproduce en ese contexto
    });
  }, []);

  return (
    <section
      aria-label="Presentación principal de Maqsyma"
      className="relative min-h-[90dvh] flex flex-col justify-center max-w-7xl mx-auto px-6 pt-32 pb-16 overflow-hidden"
    >
      {/* ── Video de intro como fondo atmosférico ── */}
      <div
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover opacity-[0.18]"
        >
          <source src="/images/Maqsyma_intro.mp4" type="video/mp4" />
        </video>

        {/* Overlay: gradiente que oscurece los bordes y protege la legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-carbon)]/60 via-[var(--color-carbon)]/30 to-[var(--color-carbon)]" />
        {/* Viñeta lateral izquierda para enfatizar el texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-carbon)]/80 via-transparent to-transparent" />
      </div>

      {/* Fallback: luz ambiental sutil mientras carga o si no hay video */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[var(--color-oro)]/5 blur-[120px] pointer-events-none rounded-full transition-opacity duration-1000 ${
          videoLoaded ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl space-y-6">
        {/* Distintivo de distribución oficial */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--color-grafito)] border border-[var(--color-grafito-2)] text-xs text-[var(--color-oro-claro)] tracking-wide shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[var(--color-oro)] animate-pulse" />
          <span>Equipos de Soldadura ESAB · Venta y Alquiler</span>
        </div>

        {/* Titular Hero con animación fluida de entrada */}
        <h1
          className="font-['Montserrat',sans-serif] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--color-plata)] leading-[1.08] drop-shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-500"
          style={{
            animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {copy.hero.title}
        </h1>

        {/* Subtítulo técnico */}
        <p className="text-base sm:text-xl text-[var(--color-gris)] max-w-2xl leading-relaxed">
          {copy.hero.subtitle}
        </p>

        {/* Botones de acción con micro-interacciones de press */}
        <div className="pt-4 flex flex-wrap items-center gap-4">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[var(--color-oro-claro)] via-[var(--color-oro)] to-[var(--color-oro-oscuro)] px-7 py-3.5 text-sm font-bold text-[var(--color-carbon)] shadow-lg shadow-[var(--color-oro)]/20 transition-all duration-200 hover:brightness-110 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--color-oro)]"
          >
            <span>{copy.hero.primaryCta}</span>
            <span>→</span>
          </a>

          <a
            href="#taller"
            className="inline-flex items-center justify-center rounded-md bg-[var(--color-grafito)] border border-[var(--color-grafito-2)] px-6 py-3.5 text-sm font-semibold text-[var(--color-plata)] transition-all duration-200 hover:bg-[var(--color-grafito-2)] hover:border-[var(--color-oro)]/30 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--color-oro)]"
          >
            {copy.hero.secondaryCta}
          </a>
        </div>
      </div>

      {/* Indicador de desplazamiento inferior hacia el recorrido */}
      <div className="pt-16 sm:pt-24 flex items-center gap-3 text-xs text-[var(--color-gris)] tracking-wider">
        <span className="w-6 h-[1px] bg-[var(--color-oro)]/50" />
        <a
          href="#taller"
          className="hover:text-[var(--color-oro-claro)] transition-colors flex items-center gap-1.5"
        >
          <span>Recorrer taller por escenas técnicas</span>
          <span className="text-[var(--color-oro)]">↓</span>
        </a>
      </div>
    </section>
  );
};
