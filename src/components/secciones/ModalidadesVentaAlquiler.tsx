import React from "react";
import { copy } from "@/content/copy.es";
import { whatsappLink } from "@/lib/whatsapp";

export const ModalidadesVentaAlquiler: React.FC = () => {
  const whatsappVenta = whatsappLink("Hola Maqsyma, deseo asesoría técnica y cotización para compra de equipos de soldadura.");
  const whatsappAlquiler = whatsappLink("Hola Maqsyma, deseo consultar disponibilidad y tarifas de alquiler de equipos para obra.");

  return (
    <section id="modalidades" className="w-full py-20 bg-[#0d0e13] border-t border-[#1e2029]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-oro)] block mb-2">
            Modalidades Comerciales
          </span>
          <h2 className="font-['Syne',sans-serif] text-3xl sm:text-4xl font-extrabold text-white">
            Venta y Alquiler Operativo
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-3">
            Adaptamos la entrega de equipamiento según el plazo y la escala de su faena o taller en Arequipa y el sur peruano.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card Venta */}
          <div className="p-8 rounded-2xl bg-[#13151e] border border-[#232635] flex flex-col justify-between hover:border-[var(--color-oro)]/40 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[var(--color-oro)]/10 text-[var(--color-oro)] flex items-center justify-center font-mono font-bold text-lg mb-6 border border-[var(--color-oro)]/20">
                01
              </div>
              <h3 className="font-['Syne',sans-serif] text-2xl font-bold text-white mb-3">
                {copy.modalidades.venta.titulo}
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                {copy.modalidades.venta.descripcion}
              </p>
              <ul className="space-y-3 text-xs text-neutral-400 font-mono mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Garantía directa de fabricante
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Capacitación de puesta en marcha
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Stock de repuestos y consumibles originales
                </li>
              </ul>
            </div>

            <a
              href={whatsappVenta}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-lg bg-[#1a1d29] hover:bg-[#242838] border border-[#2d3246] hover:border-white/20 text-center text-xs font-bold font-mono uppercase tracking-wider text-white transition-all"
            >
              Consultar Venta de Equipos →
            </a>
          </div>

          {/* Card Alquiler */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#161823] to-[#12141c] border border-[var(--color-oro)]/30 flex flex-col justify-between shadow-xl shadow-black/40">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[var(--color-oro)] text-[var(--color-carbon)] flex items-center justify-center font-mono font-bold text-lg mb-6 shadow-md shadow-[var(--color-oro)]/20">
                02
              </div>
              <h3 className="font-['Syne',sans-serif] text-2xl font-bold text-white mb-3">
                {copy.modalidades.alquiler.titulo}
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                {copy.modalidades.alquiler.descripcion}
              </p>
              <ul className="space-y-3 text-xs text-neutral-400 font-mono mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-oro)]">✓</span> Tarifas por día, semana o mes cerrado
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-oro)]">✓</span> Equipos calibrados y probados antes de entrega
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-oro)]">✓</span> Soporte técnico de reemplazo inmediato en obra
                </li>
              </ul>
            </div>

            <a
              href={whatsappAlquiler}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[var(--color-oro-claro)] via-[var(--color-oro)] to-[var(--color-oro-oscuro)] hover:brightness-110 active:scale-95 text-center text-xs font-bold uppercase tracking-wider text-[var(--color-carbon)] transition-all shadow-lg shadow-[var(--color-oro)]/20"
            >
              Cotizar Flota de Alquiler →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
