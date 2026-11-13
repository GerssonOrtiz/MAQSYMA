import React from "react";
import { copy } from "@/content/copy.es";

export const TransicionNarrativa: React.FC = () => {
  return (
    <section aria-label="Declaración de potencia industrial" className="w-full py-20 sm:py-28 bg-[#0a0b0e] border-y border-[#181a22] relative overflow-hidden">
      {/* Luz focal difusa */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[var(--color-oro)]/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-oro)] block">
              01 // MANIFIESTO OPERATIVO
            </span>
            <p className="font-['Syne',sans-serif] text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-snug">
              &ldquo;{copy.narrative.quote}&rdquo;
            </p>
            <div className="pt-2 text-lg sm:text-xl font-mono text-[var(--color-oro-claro)] tracking-wide">
              {copy.narrative.lead}
            </div>
          </div>

          <div className="max-w-md lg:border-l lg:border-white/10 lg:pl-8 space-y-3">
            <p className="text-sm text-neutral-400 leading-relaxed">
              {copy.narrative.statement}
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 pt-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span>STOCK Y ASESORÍA LOCAL EN AREQUIPA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
