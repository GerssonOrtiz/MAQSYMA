"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
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
              CATÁLOGO INDUSTRIAL
            </h2>
            <p className="text-neutral-400 text-sm mt-2 max-w-xl font-light">
              Equipos con trazabilidad técnica real. Sin datos demo ni especificaciones ficticias.
            </p>
          </div>

          {/* Buscador Técnico */}
          <div className="w-full md:w-80">
            <label htmlFor="search-input" className="sr-only">Buscar modelo o serie</label>
            <div className="relative">
              <input
                id="search-input"
                type="text"
                placeholder="Buscar modelo (ej. Warrior, Sentinel)..."
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
          <span>Mostrando {productosFiltrados.length} equipos disponibles</span>
          <span>Soporte oficial ESAB</span>
        </div>

        {/* Grid de Productos con Diseño Editorial Industrial */}
        {productosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productosFiltrados.map((equipo) => {
              const quoteHref = whatsappProductLink(equipo.nombre, equipo.modelo);
              return (
                <div
                  key={equipo.id}
                  className="rounded-xl bg-[#0e1017] border border-[#1d202d] hover:border-[var(--color-oro)]/50 transition-all duration-300 flex flex-col justify-between p-6 group hover:shadow-2xl hover:shadow-black/60"
                >
                  <div>
                    {/* Header de la tarjeta */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-[var(--color-oro)] tracking-wider">
                        {equipo.marca}
                      </span>
                      <div className="flex gap-2">
                        {equipo.disponibleAlquiler && (
                          <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-300">
                            ALQUILER
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-400">
                          {equipo.proceso}
                        </span>
                      </div>
                    </div>

                    {/* Titular */}
                    <Link href={`/equipos/${equipo.slug}`}>
                      <h3 className="font-['Syne',sans-serif] text-xl font-bold text-white group-hover:text-[var(--color-oro-claro)] transition-colors mb-2">
                        {equipo.nombre}
                      </h3>
                    </Link>

                    {/* Descripción corta */}
                    <p className="text-xs text-neutral-400 font-light leading-relaxed line-clamp-3 mb-6">
                      {equipo.descripcionCorta}
                    </p>

                    {/* Especificaciones clave normalizadas */}
                    {equipo.especificaciones && (
                      <div className="space-y-1.5 py-3 border-y border-white/5 text-[11px] font-mono text-neutral-400 mb-6 bg-black/20 px-3 rounded">
                        {equipo.especificaciones.amperajeMax && (
                          <div className="flex justify-between">
                            <span className="text-neutral-400">Amperaje Máx:</span>
                            <span className="text-neutral-200 font-bold">{equipo.especificaciones.amperajeMax}</span>
                          </div>
                        )}
                        {equipo.especificaciones.voltajeEntrada && (
                          <div className="flex justify-between">
                            <span className="text-neutral-400">Voltaje:</span>
                            <span className="text-neutral-200">{equipo.especificaciones.voltajeEntrada}</span>
                          </div>
                        )}
                        {equipo.especificaciones.cicloTrabajo && (
                          <div className="flex justify-between">
                            <span className="text-neutral-400">Ciclo:</span>
                            <span className="text-neutral-200">{equipo.especificaciones.cicloTrabajo}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Acciones */}
                  <div className="pt-4 border-t border-[#1a1d28] flex items-center justify-between gap-3">
                    <Link
                      href={`/equipos/${equipo.slug}`}
                      className="text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                    >
                      Ficha Técnica →
                    </Link>

                    <a
                      href={quoteHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded bg-[var(--color-oro)]/10 hover:bg-[var(--color-oro)] text-[var(--color-oro)] hover:text-[var(--color-carbon)] border border-[var(--color-oro)]/30 text-xs font-mono uppercase font-bold transition-all duration-200"
                    >
                      CONSULTAR EQUIPO
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
