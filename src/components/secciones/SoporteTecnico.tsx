import React from "react";
import { copy } from "@/content/copy.es";
import { whatsappLink } from "@/lib/whatsapp";

export const SoporteTecnico: React.FC = () => {
  const whatsappHref = whatsappLink("Hola Maqsyma, solicito asesoría técnica y soporte para configuración de equipos de soldadura.");

  return (
    <section id="soporte" className="w-full py-20 bg-[#0d0e14] border-t border-[#1e212b]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-2xl bg-gradient-to-r from-[#141620] via-[#11131a] to-[#0f1016] border border-[#232736] p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-oro)] block">
              Garantía y Asesoría en Arequipa
            </span>
            <h2 className="font-['Syne',sans-serif] text-3xl sm:text-4xl font-extrabold text-white">
              {copy.servicioTecnico.titulo}
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              {copy.servicioTecnico.descripcion}
            </p>

            <div className="space-y-2 pt-2">
              {copy.servicioTecnico.puntos.map((pt, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                  <span className="text-[var(--color-oro)] font-bold text-base leading-none">✓</span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-auto shrink-0 flex flex-col items-center sm:items-stretch gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-8 py-4 rounded-lg bg-gradient-to-r from-[var(--color-oro-claro)] via-[var(--color-oro)] to-[var(--color-oro-oscuro)] hover:brightness-110 active:scale-95 text-center text-xs font-bold uppercase tracking-wider text-[var(--color-carbon)] transition-all shadow-xl shadow-[var(--color-oro)]/20"
            >
              Consultar con Servicio Técnico →
            </a>
            <div className="text-center font-mono text-[11px] text-neutral-400">
              Atención presencial en local Arequipa
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
