import React from "react";
import { copy } from "@/content/copy.es";
import { whatsappLink } from "@/lib/whatsapp";

export const SeccionMarcas: React.FC = () => {
  const whatsappHref = whatsappLink(copy.contact.brandConsultMessage("ESAB"));

  return (
    <section id="marcas" aria-label="Marcas y Respaldo Industrial" className="w-full py-24 bg-[#08090c] border-t border-[#181a24] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-2xl bg-gradient-to-r from-[#12141c] via-[#0d0f16] to-[#0a0b10] border border-[#222637] p-8 sm:p-14 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-oro)] block">
              06 // RESPALDO DE FABRICANTE
            </span>
            <div className="flex items-center gap-4">
              <h2 className="font-['Syne',sans-serif] text-4xl sm:text-6xl font-black text-white tracking-tight">
                {copy.marcas.principal}
              </h2>
              <span className="px-3 py-1 rounded bg-[var(--color-oro)]/15 border border-[var(--color-oro)]/30 text-xs font-mono text-[var(--color-oro)]">
                LÍNEA INDUSTRIAL
              </span>
            </div>

            <p className="font-mono text-xs sm:text-sm text-[var(--color-oro-claro)] uppercase tracking-wider">
              {copy.marcas.tagline}
            </p>

            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              {copy.marcas.descripcion}
            </p>

            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs text-neutral-400">
              <div className="border-l border-white/10 pl-3">
                <span className="text-white block font-bold">WARRIOR™</span>
                <span>Multiproceso Pesado</span>
              </div>
              <div className="border-l border-white/10 pl-3">
                <span className="text-white block font-bold">ROGUE™</span>
                <span>Inversores Profesionales</span>
              </div>
              <div className="border-l border-white/10 pl-3">
                <span className="text-white block font-bold">SENTINEL™</span>
                <span>Protección Óptica A50/A60</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-auto shrink-0 flex flex-col items-center gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded bg-gradient-to-r from-[var(--color-oro-claro)] via-[var(--color-oro)] to-[var(--color-oro-oscuro)] hover:brightness-110 active:scale-95 text-center text-xs font-bold uppercase tracking-wider text-[var(--color-carbon)] transition-all shadow-xl shadow-[var(--color-oro)]/20"
            >
              CONSULTAR DISPONIBILIDAD ESAB →
            </a>
            <span className="text-[11px] font-mono text-neutral-400">
              Cotización y fichas técnicas directas
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
