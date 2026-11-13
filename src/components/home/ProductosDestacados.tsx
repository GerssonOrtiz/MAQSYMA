import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Producto } from "@/types/equipo";
import { whatsappProductLink } from "@/lib/whatsapp";

interface ProductosDestacadosProps {
  productos: Producto[];
}

export const ProductosDestacados: React.FC<ProductosDestacadosProps> = ({ productos }) => {
  // Tomamos los modelos insignia reales de ESAB con imagen
  const heroProduct = productos.find((p) => p.slug === "aristo-500ix") ||
                      productos.find((p) => p.slug === "fabricator-em-500i") ||
                      productos[0];

  const secondaryProducts = productos
    .filter((p) => p.id !== heroProduct?.id && p.imagenUrl)
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
          <div className="mb-14 rounded-2xl bg-gradient-to-br from-[#131620] via-[#0f1118] to-[#07080a] border border-[#262b3c] hover:border-amber-500/40 p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-2xl transition-all duration-300">
            {/* Spotlight glow en la esquina superior derecha */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-amber-500/15 to-transparent blur-[120px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
              {/* Información Editorial */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    PROTAGONISTA INDUSTRIAL · {heroProduct.marca}
                  </span>
                  {heroProduct.disponibleAlquiler && (
                    <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      FLOTA DISPONIBLE EN ALQUILER
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-amber-400/90 font-semibold block">
                    MODELO INSIGNIA // MULTIPROCESO HEAVY DUTY
                  </span>
                  <h3 className="font-['Syne',sans-serif] text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-sm">
                    {heroProduct.nombre}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl font-normal">
                  {heroProduct.descripcionCorta}
                </p>

                {/* Especificaciones Clave con Mayor Contraste */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-4 border-t border-[#222738] font-mono text-xs">
                  {heroProduct.especificaciones?.amperajeMax && (
                    <div className="bg-[#0b0d13]/80 p-3.5 rounded-xl border border-[#23293a] shadow-inner">
                      <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">Amperaje Máximo</span>
                      <span className="text-amber-400 font-bold text-lg">
                        {heroProduct.especificaciones.amperajeMax}
                      </span>
                    </div>
                  )}
                  {heroProduct.especificaciones?.voltajeEntrada && (
                    <div className="bg-[#0b0d13]/80 p-3.5 rounded-xl border border-[#23293a] shadow-inner">
                      <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">Alimentación</span>
                      <span className="text-white font-bold text-base">
                        {heroProduct.especificaciones.voltajeEntrada}
                      </span>
                    </div>
                  )}
                  {heroProduct.especificaciones?.cicloTrabajo && (
                    <div className="bg-[#0b0d13]/80 p-3.5 rounded-xl border border-[#23293a] shadow-inner">
                      <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">Ciclo de Trabajo</span>
                      <span className="text-white font-bold text-base">
                        {heroProduct.especificaciones.cicloTrabajo}
                      </span>
                    </div>
                  )}
                </div>

                {/* CTAs del Producto Hero con Alto Impacto */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <a
                    href={heroQuoteHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-7 py-4 text-xs font-black uppercase tracking-wider text-black transition-all hover:brightness-110 hover:shadow-[0_0_28px_rgba(245,158,11,0.45)] active:scale-95 shadow-xl font-mono"
                  >
                    <span>COTIZAR DISPONIBILIDAD INMEDIATA</span>
                    <span className="text-base font-bold">→</span>
                  </a>

                  <Link
                    href={`/equipos/${heroProduct.slug}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#151824] hover:bg-[#1d2233] border border-[#2c3247] hover:border-amber-500/40 px-6 py-4 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-200 hover:text-white transition-all"
                  >
                    <span>VER FICHA TÉCNICA</span>
                  </Link>
                </div>
              </div>

              {/* Columna Visual: Spotlight Circular y Maquinaria Protagonista */}
              <div className="lg:col-span-5 flex flex-col justify-center items-center">
                <div className="w-full aspect-square max-w-[440px] rounded-2xl bg-gradient-to-b from-[#161a25] to-[#0b0d12] border border-[#262c3e] p-7 flex flex-col justify-between relative group overflow-hidden shadow-2xl">
                  {/* Backdrop Radial Spotlight para despegar el equipo negro/amarillo */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12)_0%,rgba(245,158,11,0.06)_40%,transparent_75%)] pointer-events-none" />

                  <div className="flex justify-between items-center text-xs font-mono z-10">
                    <span className="px-2.5 py-1 rounded bg-black/60 border border-amber-500/30 text-amber-400 font-bold uppercase tracking-wider text-[10px]">
                      ESAB HEAVY DUTY
                    </span>
                    <span className="text-neutral-400 text-[11px] font-semibold bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      500A @ 60%
                    </span>
                  </div>

                  <div className="relative flex-1 w-full my-3 flex items-center justify-center z-10">
                    {heroProduct.imagenUrl ? (
                      <div className="relative w-full h-full min-h-[260px] sm:min-h-[290px]">
                        <Image
                          src={heroProduct.imagenUrl}
                          alt={heroProduct.nombre}
                          fill
                          className="object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)] drop-shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 440px"
                          priority
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-2xl shadow-xl">
                        ⚡
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[11px] font-mono z-10">
                    <span className="text-neutral-400 uppercase tracking-wider">Modelo Industrial</span>
                    <span className="text-white font-bold bg-[#11131a] px-2.5 py-1 rounded border border-white/10">{heroProduct.modelo}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Productos Secundarios con Imagen Oficial */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondaryProducts.map((prod) => {
            const quoteLink = whatsappProductLink(prod.nombre, prod.modelo);
            return (
              <div
                key={prod.id}
                className="rounded-2xl bg-[#0f1118] border border-[#1f2433] hover:border-amber-500/50 p-6 flex flex-col justify-between transition-all duration-300 group shadow-xl hover:shadow-2xl hover:shadow-black/80"
              >
                <div>
                  <div className="flex justify-between items-center mb-3 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/25 text-amber-400 font-bold uppercase text-[10px] tracking-wider">
                      {prod.marca}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-300 font-semibold text-[10px]">
                      {prod.proceso}
                    </span>
                  </div>

                  {/* Fotografía de producto con Halo Spotlight */}
                  {prod.imagenUrl && (
                    <div className="relative w-full h-52 my-3 rounded-xl bg-gradient-to-b from-[#161924] to-[#0a0c10] border border-[#232737] group-hover:border-amber-500/30 flex items-center justify-center p-4 overflow-hidden transition-colors">
                      {/* Halo radial de contraste */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />
                      <Image
                        src={prod.imagenUrl}
                        alt={prod.nombre}
                        fill
                        className="object-contain p-2 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)] group-hover:scale-108 transition-transform duration-300 z-10"
                        sizes="(max-width: 768px) 100vw, 320px"
                      />
                    </div>
                  )}

                  <h4 className="font-['Syne',sans-serif] text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {prod.nombre}
                  </h4>

                  <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2 mb-4 font-normal">
                    {prod.descripcionCorta}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1e2332] flex items-center justify-between gap-2">
                  <Link
                    href={`/equipos/${prod.slug}`}
                    className="text-xs font-mono font-medium text-neutral-400 hover:text-white transition-colors"
                  >
                    Ficha Técnica →
                  </Link>

                  <a
                    href={quoteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-mono uppercase font-black text-[11px] tracking-wider transition-all duration-200 shadow-md hover:shadow-amber-400/30 active:scale-95"
                  >
                    Cotizar
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
