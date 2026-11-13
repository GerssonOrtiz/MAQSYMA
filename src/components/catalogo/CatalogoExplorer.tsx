"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Producto } from "@/types/equipo";
import { whatsappProductLink } from "@/lib/whatsapp";
import { EquipoImagePlaceholder } from "@/components/presentacion/EquipoImagePlaceholder";

interface CatalogoExplorerProps {
  productos: Producto[];
}

export const CatalogoExplorer: React.FC<CatalogoExplorerProps> = ({ productos }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>("todas");
  const [procesoSeleccionado, setProcesoSeleccionado] = useState<string>("todos");
  const [busqueda, setBusqueda] = useState<string>("");

  const categorias = [
    { id: "todas", label: "Todos los productos" },
    { id: "maquinas-soldar", label: "Máquinas de Soldar" },
    { id: "corte-plasma", label: "Corte y Plasma" },
    { id: "caretas-epp", label: "Caretas y EPP" },
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
      // Filtrar por búsqueda de texto
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
  }, [productos, categoriaSeleccionada, procesoSeleccionado, busqueda]);

  return (
    <section id="productos" className="w-full py-16 sm:py-24 bg-[#0a0b0e] text-neutral-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Cabecera de Sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#1f222b] gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#161821] text-xs font-mono text-[var(--color-oro)] uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-oro)]" />
              Catálogo Industrial Activo
            </div>
            <h2 className="font-['Syne',sans-serif] text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Equipamiento Profesional
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl">
              Modelos verificados con soporte técnico, garantía local y cotización directa por WhatsApp.
            </p>
          </div>

          {/* Buscador */}
          <div className="w-full md:w-72">
            <label htmlFor="search-input" className="sr-only">Buscar modelo o equipo</label>
            <div className="relative">
              <input
                id="search-input"
                type="text"
                placeholder="Buscar modelo o serie..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 rounded-lg bg-[#14161f] border border-[#262a38] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[var(--color-oro)] focus:ring-1 focus:ring-[var(--color-oro)] transition-all"
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

        {/* Barra de Filtros */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          {/* Categorías Principales */}
          <div className="flex flex-wrap gap-2">
            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoriaSeleccionada(cat.id)}
                className={`px-4 py-2 rounded-md text-xs font-semibold tracking-wide transition-all ${
                  categoriaSeleccionada === cat.id
                    ? "bg-[var(--color-oro)] text-[var(--color-carbon)] font-bold shadow-md shadow-[var(--color-oro)]/20"
                    : "bg-[#14161f] text-neutral-300 hover:text-white hover:bg-[#1a1e2a] border border-[#222634]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Subfiltro de Proceso */}
          {categoriaSeleccionada === "maquinas-soldar" && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-neutral-500 font-mono text-[11px]">Proceso:</span>
              {procesos.map((proc) => (
                <button
                  key={proc}
                  onClick={() => setProcesoSeleccionado(proc)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                    procesoSeleccionado === proc
                      ? "bg-white/20 text-white font-bold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {proc === "todos" ? "Todos" : proc}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Grilla de Productos */}
        {productosFiltrados.length === 0 ? (
          <div className="py-20 text-center rounded-xl border border-dashed border-[#262a36] bg-[#0e1017]">
            <p className="text-neutral-300 font-semibold mb-1">No se encontraron equipos con los criterios seleccionados.</p>
            <p className="text-neutral-500 text-xs mb-4">Intente cambiar el término de búsqueda o restablecer los filtros.</p>
            <button
              onClick={() => {
                setCategoriaSeleccionada("todas");
                setProcesoSeleccionado("todos");
                setBusqueda("");
              }}
              className="px-4 py-2 rounded bg-[#1c202d] hover:bg-[#252b3d] text-xs font-mono text-[var(--color-oro)] transition-colors"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productosFiltrados.map((prod) => {
              const whatsappHref = whatsappProductLink(
                prod.nombre,
                prod.modelo,
                prod.disponibleAlquiler && !prod.precioVenta,
                prod.unidadAlquiler
              );

              return (
                <article
                  key={prod.id}
                  className="group rounded-xl bg-[#12141c] border border-[#202432] hover:border-[var(--color-oro)]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-2xl hover:shadow-black/60"
                >
                  {/* Imagen o Placeholder Técnico */}
                  <div className="relative w-full h-52 bg-gradient-to-b from-[#181a24] to-[#101219] overflow-hidden flex items-center justify-center p-6">
                    {prod.imagenUrl ? (
                      <img
                        src={prod.imagenUrl}
                        alt={prod.nombre}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <EquipoImagePlaceholder
                          nombre={prod.nombre}
                          familia={prod.proceso || "General"}
                        />
                      </div>
                    )}

                    {/* Badges de Modalidad */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {prod.disponibleVenta && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-black/70 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                          Venta
                        </span>
                      )}
                      {prod.disponibleAlquiler && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/30">
                          Alquiler
                        </span>
                      )}
                    </div>

                    {/* Marca oficial */}
                    <div className="absolute top-3 right-3 font-mono text-[10px] uppercase font-bold text-neutral-400 bg-black/50 px-2 py-0.5 rounded">
                      {prod.marca}
                    </div>
                  </div>

                  {/* Cuerpo de la Tarjeta */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Subcategoría / Proceso */}
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-oro)] block mb-1">
                        {prod.subcategoria || prod.proceso || "Equipo Industrial"}
                      </span>

                      {/* Nombre y Modelo */}
                      <h3 className="font-['Syne',sans-serif] text-xl font-bold text-white group-hover:text-[var(--color-oro)] transition-colors mb-2">
                        {prod.nombre}
                      </h3>

                      <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2 mb-4">
                        {prod.descripcionCorta}
                      </p>

                      {/* Especificaciones clave */}
                      {prod.especificaciones && (
                        <div className="grid grid-cols-2 gap-2 py-3 my-2 border-y border-[#1c202d] text-[11px] font-mono text-neutral-300">
                          {prod.especificaciones.amperajeMax && (
                            <div>
                              <span className="text-neutral-500 block text-[9px] uppercase">Corriente Máx:</span>
                              <span className="font-semibold text-white">{prod.especificaciones.amperajeMax}</span>
                            </div>
                          )}
                          {prod.especificaciones.voltajeEntrada && (
                            <div>
                              <span className="text-neutral-500 block text-[9px] uppercase">Voltaje:</span>
                              <span className="font-semibold text-white">{prod.especificaciones.voltajeEntrada}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Precio y Acciones */}
                    <div className="pt-4 mt-2">
                      <div className="flex items-baseline justify-between mb-4">
                        <div>
                          <span className="text-[10px] font-mono text-neutral-500 uppercase block">Precio Referencial</span>
                          {prod.precioVenta ? (
                            <div className="flex items-baseline gap-2">
                              <span className="text-lg font-mono font-bold text-white">
                                S/ {prod.precioVenta.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                              </span>
                              {prod.precioAntesVenta && (
                                <span className="text-xs font-mono text-neutral-500 line-through">
                                  S/ {prod.precioAntesVenta.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-sm font-semibold text-[var(--color-oro-claro)]">
                              Consultar precio
                            </span>
                          )}
                        </div>

                        {prod.disponibleAlquiler && (
                          <div className="text-right">
                            <span className="text-[10px] font-mono text-neutral-500 uppercase block">Opción Alquiler</span>
                            <span className="text-xs font-mono text-amber-300 font-semibold">Disponible</span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/equipos/${prod.slug}`}
                          className="px-3 py-2.5 rounded text-center text-xs font-mono font-semibold text-neutral-300 bg-[#191c27] hover:bg-[#222736] hover:text-white border border-[#2b3042] transition-colors"
                        >
                          Ficha técnica
                        </Link>

                        <a
                          href={whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2.5 rounded text-center text-xs font-bold uppercase tracking-wider text-[var(--color-carbon)] bg-gradient-to-r from-[var(--color-oro-claro)] via-[var(--color-oro)] to-[var(--color-oro-oscuro)] hover:brightness-110 active:scale-95 transition-all shadow-md shadow-[var(--color-oro)]/10"
                        >
                          Cotizar
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
