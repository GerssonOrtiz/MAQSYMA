import React from "react";
import { copy } from "@/content/copy.es";
import { whatsappLink } from "@/lib/whatsapp";

export const SeccionVentaAlquiler: React.FC = () => {
  const whatsappVenta = whatsappLink("Hola MAQSYMA, deseo consultar opciones y asesoría para la compra de equipos de soldadura.");
  const whatsappAlquiler = whatsappLink("Hola MAQSYMA, deseo consultar disponibilidad y condiciones de alquiler de equipos para obra.");

  return (
    <section id="modalidades" aria-label="Equipos para comprar o alquilar" className="w-full py-24 bg-[#0a0c10] border-t border-[#181a24] relative overflow-hidden">
      {/* Luz ambiental sutil */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[var(--color-oro)]/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Cabecera de la sección */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-oro)] block">
            05 // MODELO COMERCIAL
          </span>
          <h2 className="font-['Syne',sans-serif] text-3xl sm:text-5xl font-black text-white tracking-tight">
            EQUIPOS PARA COMPRAR O ALQUILAR
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light">
            Soluciones adaptadas a la escala y duración de cada proyecto en Arequipa y el corredor minero del sur.
          </p>
        </div>

        {/* Comparativa Visual Editorial */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Bloque VENTA */}
          <div className="p-8 sm:p-12 rounded-2xl bg-[#0e1017] border border-[#202332] hover:border-white/20 transition-all duration-300 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-oro)]">
                  MODALIDAD 01
                </span>
                <span className="text-[11px] font-mono text-neutral-400 bg-white/5 px-2.5 py-1 rounded">
                  {copy.modalidades.venta.subtitulo}
                </span>
              </div>

              <h3 className="font-['Syne',sans-serif] text-3xl sm:text-4xl font-extrabold text-white mb-4">
                {copy.modalidades.venta.titulo}
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed font-light mb-8">
                {copy.modalidades.venta.descripcion}
              </p>

              <div className="space-y-3 mb-10 pt-4 border-t border-white/5 font-mono text-xs text-neutral-400">
                {copy.modalidades.venta.ventajas.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={whatsappVenta}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded bg-[#171a24] hover:bg-[#202434] border border-[#2a2f42] text-center text-xs font-mono font-bold uppercase tracking-wider text-white transition-all"
            >
              {copy.modalidades.venta.cta} →
            </a>
          </div>

          {/* Bloque ALQUILER */}
          <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-[#13151f] to-[#0d0e15] border border-[var(--color-oro)]/40 hover:border-[var(--color-oro)] transition-all duration-300 flex flex-col justify-between shadow-2xl shadow-black/80 relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-oro)]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-oro)]">
                  MODALIDAD 02
                </span>
                <span className="text-[11px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded">
                  {copy.modalidades.alquiler.subtitulo}
                </span>
              </div>

              <h3 className="font-['Syne',sans-serif] text-3xl sm:text-4xl font-extrabold text-white mb-4">
                {copy.modalidades.alquiler.titulo}
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed font-light mb-8">
                {copy.modalidades.alquiler.descripcion}
              </p>

              <div className="space-y-3 mb-10 pt-4 border-t border-white/5 font-mono text-xs text-neutral-400">
                {copy.modalidades.alquiler.ventajas.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-[var(--color-oro)] font-bold">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={whatsappAlquiler}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded bg-gradient-to-r from-[var(--color-oro-claro)] via-[var(--color-oro)] to-[var(--color-oro-oscuro)] hover:brightness-110 active:scale-95 text-center text-xs font-bold uppercase tracking-wider text-[var(--color-carbon)] transition-all shadow-xl shadow-[var(--color-oro)]/20"
            >
              {copy.modalidades.alquiler.cta} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
