import React from "react";
import { copy } from "@/content/copy.es";
import { whatsappLink } from "@/lib/whatsapp";

export const SeccionVentaAlquiler: React.FC = () => {
  const whatsappVenta = whatsappLink("Hola MAQSYMA, deseo consultar opciones y asesoría para la compra de equipos de soldadura.");
  const whatsappAlquiler = whatsappLink("Hola MAQSYMA, deseo consultar disponibilidad y condiciones de alquiler de equipos para obra.");

  return (
    <section id="modalidades" aria-label="Modalidades de Compra y Alquiler" className="w-full py-24 bg-[#07080A] border-t border-[#161922] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#131720] border border-[#202636] text-xs font-mono text-[var(--color-oro-claro)] uppercase tracking-wider mb-1">
            Modalidades Comerciales
          </div>
          <h2 className="font-['Syne',sans-serif] text-3xl sm:text-5xl font-black text-white tracking-tight">
            Compra Directa y Alquiler
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light">
            Esquemas adaptados a la duración de faena y presupuesto operativo en Arequipa y el sur del país.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Bloque VENTA */}
          <div className="p-8 sm:p-12 rounded-2xl bg-[#0E1117] border border-[#1C212E] hover:border-white/20 transition-all duration-300 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-oro)]">
                  MODALIDAD 01
                </span>
                <span className="text-[11px] font-mono text-neutral-400 bg-white/5 px-3 py-1 rounded-full">
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
              className="w-full py-4 rounded-xl bg-[#151922] hover:bg-[#1E2330] border border-[#272E3F] text-center text-xs font-mono font-bold uppercase tracking-wider text-white transition-all"
            >
              {copy.modalidades.venta.cta} →
            </a>
          </div>

          {/* Bloque ALQUILER */}
          <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-[#131620] to-[#0D1017] border border-[var(--color-oro)]/40 hover:border-[var(--color-oro)] transition-all duration-300 flex flex-col justify-between shadow-2xl relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-oro)]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-oro)]">
                  MODALIDAD 02
                </span>
                <span className="text-[11px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
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
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--color-oro-claro)] via-[var(--color-oro)] to-[var(--color-oro-oscuro)] hover:brightness-110 active:scale-95 text-center text-xs font-bold uppercase tracking-wider text-[#07080A] transition-all shadow-xl shadow-[var(--color-oro)]/20"
            >
              {copy.modalidades.alquiler.cta} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
