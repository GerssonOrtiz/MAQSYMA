"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Producto } from "@/types/equipo";
import { whatsappProductLink } from "@/lib/whatsapp";

interface CatalogoExplorerProps {
  productos: Producto[];
}

export const CatalogoExplorer: React.FC<CatalogoExplorerProps> = ({ productos }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>("todas");
  const [procesoSeleccionado, setProcesoSeleccionado] = useState<string>("todos");
  const [soloAlquiler, setSoloAlquiler] = useState<boolean>(false);
  const [busqueda, setBusqueda] = useState<string>("");

  const categorias = [
    { id: "todas", label: "TODO EL CATÁLOGO" },
    { id: "maquinas-soldar", label: "MÁQUINAS DE SOLDAR" },
    { id: "antorchas-accesorios", label: "ALIMENTADORES Y ACCESORIOS" },
    { id: "corte-plasma", label: "CORTE Y PLASMA" },
    { id: "caretas-epp", label: "CARETAS Y EPP" },
  ];

  const procesos = ["todos", "MIG/MAG", "MMA", "TIG", "Multiproceso", "Plasma"];

  const productosFiltrados = useMemo(() => {
    return productos.filter((p) => {
      // Filtrar por categoría
      if (categoriaSeleccionada !== "todas" && p.categoria !== categoriaSeleccionada) {
        return false;
      }
      // Filtrar por proceso
      if (procesoSeleccionado !== "todos" && p.proceso !== procesoSeleccionado) {
        return false;
      }
      // Filtrar por disponibilidad en alquiler
      if (soloAlquiler && !p.disponibleAlquiler) {
        return false;
      }
      // Filtrar por texto
      if (busqueda.trim() !== "") {
        const query = busqueda.toLowerCase();
        const coincideNombre = p.nombre.toLowerCase().includes(query);
        const coincideModelo = p.modelo.toLowerCase().includes(query);
        const coincideDesc = p.descripcionCorta.toLowerCase().includes(query);
        if (!coincideNombre && !coincideModelo && !coincideDesc) {
          return false;
        }
      }
      return true;
    });
  }, [productos, categoriaSeleccionada, procesoSeleccionado, soloAlquiler, busqueda]);

  return (
    <section id="productos" className="w-full py-24 bg-[#08090c] text-neutral-200 border-t border-[#181a24]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Cabecera Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#1b1e2a] gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-oro)] block mb-2">
              04 // SISTEMA DE EXPLORACIÓN TÉCNICA
            </span>
            <h2 className="font-['Syne',sans-serif] text-3xl sm:text-5xl font-black text-white tracking-tight">
              CATÁLOGO INDUSTRIAL EN VENTA
            </h2>
            <p className="text-neutral-400 text-sm mt-2 max-w-xl font-light">
              Equipos con fotografía real, especificaciones técnicas de fábrica y disponibilidad inmediata en Arequipa.
            </p>
          </div>

          {/* Buscador Técnico */}
          <div className="w-full md:w-80">
            <label htmlFor="search-input" className="sr-only">Buscar modelo o serie</label>
            <div className="relative">
              <input
                id="search-input"
                type="text"
                placeholder="Buscar modelo (ej. Rebel, Warrior, Rogue)..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded bg-[#11131a] border border-[#222634] text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-[var(--color-oro)] focus:ring-1 focus:ring-[var(--color-oro)] transition-all"
              />
              <svg
                className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Barra de Filtros Industriales */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          {/* Categorías Principales */}
          <div className="flex flex-wrap gap-2">
            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoriaSeleccionada(cat.id)}
                className={`px-4 py-2 rounded text-xs font-mono tracking-wider transition-all duration-200 border ${
                  categoriaSeleccionada === cat.id
                    ? "bg-[var(--color-oro)] text-[var(--color-carbon)] font-bold border-[var(--color-oro)] shadow-md shadow-[var(--color-oro)]/20"
                    : "bg-[#11131b] text-neutral-400 border-[#202434] hover:border-white/20 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Filtros Secundarios: Proceso y Toggle Alquiler */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            {/* Filtro de Procesos */}
            <div className="flex items-center gap-1.5 bg-[#10121a] px-3 py-1.5 rounded border border-[#202434]">
              <span className="text-neutral-400">Proceso:</span>
              <select
                value={procesoSeleccionado}
                onChange={(e) => setProcesoSeleccionado(e.target.value)}
                className="bg-transparent text-white font-mono focus:outline-none cursor-pointer"
              >
                {procesos.map((pr) => (
                  <option key={pr} value={pr} className="bg-[#12141c] text-white">
                    {pr === "todos" ? "Todos los procesos" : pr}
                  </option>
                ))}
              </select>
            </div>

            {/* Switch Flota Alquiler */}
            <button
              onClick={() => setSoloAlquiler(!soloAlquiler)}
              className={`px-3 py-1.5 rounded border flex items-center gap-2 transition-all ${
                soloAlquiler
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                  : "bg-[#10121a] text-neutral-400 border-[#202434] hover:text-white"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${soloAlquiler ? "bg-amber-400 animate-pulse" : "bg-neutral-600"}`} />
              <span>Solo Flota Alquiler</span>
            </button>
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="mb-6 flex justify-between items-center text-xs font-mono text-neutral-400">
          <span>Mostrando {productosFiltrados.length} equipos con disponibilidad</span>
          <span>Soporte oficial ESAB</span>
        </div>

        {/* Grid de Productos con Fotografía Oficial Integrada */}
        {productosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {productosFiltrados.map((equipo) => {
              const quoteHref = whatsappProductLink(equipo.nombre, equipo.modelo);
              return (
                <div
                  key={equipo.id}
                  className="rounded-2xl bg-gradient-to-b from-[#11131b] to-[#0c0d13] border border-[#202534] hover:border-amber-500/60 transition-all duration-300 flex flex-col justify-between p-6 group hover:shadow-2xl hover:shadow-black/80 hover:-translate-y-1 relative"
                >
                  <div>
                    {/* Header de la tarjeta */}
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="px-2.5 py-1 rounded bg-black/60 border border-amber-500/30 text-[11px] font-mono font-black text-amber-400 tracking-wider">
                        {equipo.marca}
                      </span>
                      <div className="flex items-center gap-2">
                        {equipo.disponibleAlquiler && (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            ALQUILER
                          </span>
                        )}
                        <span className="px-2.5 py-1 rounded bg-[#161822] border border-white/10 text-[10px] font-mono font-medium text-neutral-300">
                          {equipo.proceso}
                        </span>
                      </div>
                    </div>

                    {/* Contenedor de Fotografía Real del Equipo con Halo Industrial */}
                    <div className="relative w-full h-56 my-3 rounded-xl bg-gradient-to-b from-[#171b26] to-[#0a0c10] border border-[#242938] group-hover:border-amber-500/40 flex items-center justify-center p-4 overflow-hidden transition-colors shadow-inner">
                      {/* Halo radial centrado para recortar la maquinaria de color amarillo y chasis negro */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.09)_0%,rgba(245,158,11,0.04)_45%,transparent_75%)] pointer-events-none" />

                      {equipo.imagenUrl ? (
                        <Image
                          src={equipo.imagenUrl}
                          alt={equipo.nombre}
                          fill
                          className="object-contain p-3 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.92)] drop-shadow-[0_0_15px_rgba(245,158,11,0.15)] group-hover:scale-108 transition-transform duration-300 z-10"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-amber-400 text-xs font-mono z-10">
                          <span className="text-3xl mb-1">⚡</span>
                          <span className="text-neutral-300 font-semibold">Ficha Técnica Oficial</span>
                        </div>
                      )}
                    </div>

                    {/* Titular */}
                    <Link href={`/equipos/${equipo.slug}`}>
                      <h3 className="font-['Syne',sans-serif] text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-2 leading-snug">
                        {equipo.nombre}
                      </h3>
                    </Link>

                    {/* Descripción corta */}
                    <p className="text-xs text-neutral-300 font-normal leading-relaxed line-clamp-2 mb-4">
                      {equipo.descripcionCorta}
                    </p>

                    {/* Especificaciones clave normalizadas con alto contraste */}
                    {equipo.especificaciones && (
                      <div className="space-y-2 py-3 border-y border-[#1e2332] text-[11px] font-mono text-neutral-300 mb-6 bg-[#090b0f]/80 px-3.5 rounded-lg border border-white/5">
                        {equipo.especificaciones.amperajeMax && (
                          <div className="flex justify-between items-center">
                            <span className="text-neutral-400 uppercase text-[10px]">Amperaje Máx:</span>
                            <span className="text-amber-400 font-bold">{equipo.especificaciones.amperajeMax}</span>
                          </div>
                        )}
                        {equipo.especificaciones.voltajeEntrada && (
                          <div className="flex justify-between items-center">
                            <span className="text-neutral-400 uppercase text-[10px]">Voltaje:</span>
                            <span className="text-white font-medium">{equipo.especificaciones.voltajeEntrada}</span>
                          </div>
                        )}
                        {equipo.especificaciones.cicloTrabajo && (
                          <div className="flex justify-between items-center">
                            <span className="text-neutral-400 uppercase text-[10px]">Ciclo Trabajo:</span>
                            <span className="text-white font-medium">{equipo.especificaciones.cicloTrabajo}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Acciones y Conversión Directa */}
                  <div className="pt-4 border-t border-[#1e2332] flex items-center justify-between gap-3">
                    <Link
                      href={`/equipos/${equipo.slug}`}
                      className="text-xs font-mono font-semibold text-neutral-400 hover:text-white transition-colors"
                    >
                      Ficha Técnica →
                    </Link>

                    <a
                      href={quoteHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black text-xs font-mono uppercase font-black tracking-wider transition-all duration-200 shadow-md hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] active:scale-95"
                    >
                      COTIZAR AHORA
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center rounded-xl bg-[#0f1118] border border-[#202434] p-8">
            <span className="text-3xl block mb-3">🔍</span>
            <h3 className="font-['Syne',sans-serif] text-xl font-bold text-white mb-2">
              No se encontraron equipos con los filtros seleccionados
            </h3>
            <p className="text-xs font-mono text-neutral-400 max-w-md mx-auto mb-6">
              Pruebe cambiando los parámetros de búsqueda o proceso técnico para explorar el resto de modelos.
            </p>
            <button
              onClick={() => {
                setCategoriaSeleccionada("todas");
                setProcesoSeleccionado("todos");
                setSoloAlquiler(false);
                setBusqueda("");
              }}
              className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
            >
              Restablecer Filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
