import React from "react";
import Link from "next/link";
import { Producto } from "@/types/equipo";
import { whatsappProductLink } from "@/lib/whatsapp";

interface ProductosDestacadosProps {
  productos: Producto[];
}

export const ProductosDestacados: React.FC<ProductosDestacadosProps> = ({ productos }) => {
  // Tomamos los modelos insignia reales de ESAB
  const heroProduct = productos.find((p) => p.slug === "warrior-500i") || productos[0];
  const secondaryProducts = productos
    .filter((p) => p.id !== heroProduct?.id)
    .slice(0, 3);

  const heroQuoteHref = heroProduct
    ? whatsappProductLink(heroProduct.nombre, heroProduct.modelo)
    : "#";

  return (
    <section id="destacados" aria-label="Equipos que mueven el trabajo" className="w-full py-24 bg-[#0a0c10] text-white border-t border-[#181a24]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Cabecera Editorial */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-oro)] block mb-2">
            03 // INGENIERÍA DE ALTO CICLO
          </span>
          <h2 className="font-['Syne',sans-serif] text-3xl sm:text-5xl font-black text-white tracking-tight">
            EQUIPOS QUE MUEVEN EL TRABAJO
          </h2>
          <p className="text-neutral-400 text-sm max-w-xl font-light mt-2">
            Configuraciones de soldadura pesada y corte preparadas para ciclos de trabajo continuos sin declinación térmica.
          </p>
        </div>

        {/* Bloque Asimétrico: Producto Principal + Ficha Técnica Hero */}
        {heroProduct && (
          <div className="mb-12 rounded-2xl bg-gradient-to-r from-[#12141c] via-[#0f1118] to-[#0a0b0f] border border-[#232737] p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-oro)]/10 blur-[130px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              {/* Información Editorial */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded bg-[var(--color-oro)]/15 border border-[var(--color-oro)]/30 text-[11px] font-mono font-bold text-[var(--color-oro)] uppercase">
                    PROTAGONISTA INDUSTRIAL · {heroProduct.marca}
                  </span>
                  {heroProduct.disponibleAlquiler && (
                    <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-300">
                      DISPONIBLE EN ALQUILER
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                    MODELO INSIGNIA // MULTIPROCESO HEAVY DUTY
                  </span>
                  <h3 className="font-['Syne',sans-serif] text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    {heroProduct.nombre}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl font-light">
                  {heroProduct.descripcionCorta}
                </p>

                {/* Especificaciones Clave */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 font-mono text-xs">
                  {heroProduct.especificaciones?.amperajeMax && (
                    <div className="bg-black/30 p-3 rounded border border-white/5">
                      <span className="text-neutral-400 block text-[10px] uppercase">Amperaje Máximo</span>
                      <span className="text-white font-bold text-base text-[var(--color-oro-claro)]">
                        {heroProduct.especificaciones.amperajeMax}
                      </span>
                    </div>
                  )}
                  {heroProduct.especificaciones?.voltajeEntrada && (
                    <div className="bg-black/30 p-3 rounded border border-white/5">
                      <span className="text-neutral-400 block text-[10px] uppercase">Alimentación</span>
                      <span className="text-white font-bold text-base">
                        {heroProduct.especificaciones.voltajeEntrada}
                      </span>
                    </div>
                  )}
                  {heroProduct.especificaciones?.cicloTrabajo && (
                    <div className="bg-black/30 p-3 rounded border border-white/5">
                      <span className="text-neutral-400 block text-[10px] uppercase">Ciclo de Trabajo</span>
                      <span className="text-white font-bold text-base">
                        {heroProduct.especificaciones.cicloTrabajo}
                      </span>
                    </div>
                  )}
                </div>

                {/* CTAs del Producto Hero */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <a
                    href={heroQuoteHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded bg-gradient-to-r from-[var(--color-oro-claro)] via-[var(--color-oro)] to-[var(--color-oro-oscuro)] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[var(--color-carbon)] transition-all hover:brightness-110 active:scale-95 shadow-lg shadow-[var(--color-oro)]/20"
                  >
                    <span>CONSULTAR DISPONIBILIDAD</span>
                    <span>→</span>
                  </a>

                  <Link
                    href={`/equipos/${heroProduct.slug}`}
                    className="inline-flex items-center gap-2 rounded bg-[#161822] hover:bg-[#1e2230] border border-[#2b3044] px-6 py-3.5 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white transition-all"
                  >
                    <span>FICHA TÉCNICA DETALLADA</span>
                  </Link>
                </div>
              </div>

              {/* Columna Visual / Módulo Técnico */}
              <div className="lg:col-span-5 flex flex-col justify-center items-center">
                <div className="w-full aspect-square max-w-sm rounded-xl bg-[#0c0d13] border border-[#252838] p-8 flex flex-col justify-between relative group">
                  <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
                    <span className="text-[var(--color-oro)]">ESAB HEAVY DUTY</span>
                    <span>500A @ 60%</span>
                  </div>

                  <div className="text-center py-10 space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-full bg-[var(--color-oro)]/10 border border-[var(--color-oro)]/30 flex items-center justify-center text-[var(--color-oro)] font-mono font-bold text-xl">
                      ⚡
                    </div>
                    <div className="font-['Syne',sans-serif] text-xl font-bold text-white">
                      {heroProduct.modelo}
                    </div>
                    <p className="text-xs text-neutral-400 font-mono">
                      GMAW / FCAW / SMAW / GTAW / CAG
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex justify-between text-[11px] font-mono text-neutral-400">
                    <span>Proceso</span>
                    <span className="text-white">Multiproceso Industrial</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Productos Secundarios en Composición Asimétrica */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondaryProducts.map((prod) => {
            const quoteLink = whatsappProductLink(prod.nombre, prod.modelo);
            return (
              <div
                key={prod.id}
                className="rounded-xl bg-[#10121a] border border-[#1e2230] hover:border-[var(--color-oro)]/40 p-6 flex flex-col justify-between transition-all duration-300 group"
              >
                <div>
                  <div className="flex justify-between items-center mb-4 text-xs font-mono text-neutral-400">
                    <span className="text-[var(--color-oro)] font-semibold">{prod.marca}</span>
                    <span>{prod.proceso}</span>
                  </div>

                  <h4 className="font-['Syne',sans-serif] text-xl font-bold text-white mb-2 group-hover:text-[var(--color-oro-claro)] transition-colors">
                    {prod.nombre}
                  </h4>

                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3 mb-6 font-light">
                    {prod.descripcionCorta}
                  </p>

                  {prod.especificaciones && (
                    <div className="space-y-1.5 py-3 border-y border-white/5 text-[11px] font-mono text-neutral-400 mb-6">
                      {prod.especificaciones.amperajeMax && (
                        <div className="flex justify-between">
                          <span>Potencia:</span>
                          <span className="text-neutral-200">{prod.especificaciones.amperajeMax}</span>
                        </div>
                      )}
                      {prod.especificaciones.voltajeEntrada && (
                        <div className="flex justify-between">
                          <span>Entrada:</span>
                          <span className="text-neutral-200">{prod.especificaciones.voltajeEntrada}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-between gap-2">
                  <Link
                    href={`/equipos/${prod.slug}`}
                    className="text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                  >
                    Especificaciones →
                  </Link>

                  <a
                    href={quoteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded bg-[var(--color-oro)]/10 hover:bg-[var(--color-oro)]/20 text-[var(--color-oro)] border border-[var(--color-oro)]/30 text-[11px] font-mono uppercase font-bold transition-colors"
                  >
                    Consultar
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
