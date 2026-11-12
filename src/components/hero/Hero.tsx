"use client";

import React from "react";
import { copy } from "@/content/copy.es";
import { whatsappLink } from "@/lib/whatsapp";

export const Hero: React.FC = () => {
  const whatsappHref = whatsappLink(copy.contact.defaultMessage);

  return (
    <section
      aria-label="Presentación principal de Maqsyma"
      className="relative min-h-[90dvh] flex flex-col justify-center max-w-7xl mx-auto px-6 pt-32 pb-16"
    >
      {/* Luz ambiental sutil en el fondo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[var(--color-oro)]/5 blur-[120px] pointer-events-none rounded-full" />

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
