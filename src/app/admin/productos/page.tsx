"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { equiposDemo } from "@/data/equiposDemo";
import { Equipo } from "@/types/equipo";

export default function AdminProductosPage() {
  // Lista inicial combinada de equipos demo
  const [equipos, setEquipos] = useState<Equipo[]>([
    ...equiposDemo.mas_vendido,
    ...equiposDemo.mejor_valorado,
    ...equiposDemo.nuevo,
  ]);
  const [filtroFamilia, setFiltroFamilia] = useState("TODAS");
  const [busqueda, setBusqueda] = useState("");

  const toggleActivo = (id: string) => {
    setEquipos((prev) =>
      prev.map((e) => (e.id === id ? { ...e, activo: !e.activo } : e))
    );
  };

  const eliminarProducto = (id: string) => {
    if (confirm("¿Está seguro de eliminar este equipo del catálogo?")) {
      setEquipos((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const borrarDatosDemo = () => {
    if (confirm("¿Desea borrar TODOS los productos marcados como DEMO?")) {
      setEquipos((prev) => prev.filter((e) => !e.esDemo));
    }
  };

  const equiposFiltrados = equipos.filter((e) => {
    const matchFamilia = filtroFamilia === "TODAS" || e.familia === filtroFamilia;
    const matchBusqueda =
      e.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.modelo.toLowerCase().includes(busqueda.toLowerCase());
    return matchFamilia && matchBusqueda;
  });

  return (
    <div className="flex-1 flex flex-col bg-[var(--color-grafito)]">
      <AdminHeader titulo="Gestión de Catálogo e Inventario ESAB" />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        {/* Barra superior de herramientas y filtros */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[var(--color-carbon)] p-4 rounded-xl border border-[var(--color-grafito-2)]">
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Buscar por nombre o modelo..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="px-3 py-2 rounded bg-[var(--color-grafito)] border border-[var(--color-grafito-2)] text-xs text-[var(--color-plata)] focus:outline-none focus:border-[var(--color-oro)] w-60"
            />

            <select
              value={filtroFamilia}
              onChange={(e) => setFiltroFamilia(e.target.value)}
              className="px-3 py-2 rounded bg-[var(--color-grafito)] border border-[var(--color-grafito-2)] text-xs text-[var(--color-plata)] focus:outline-none focus:border-[var(--color-oro)]"
            >
              <option value="TODAS">Todas las familias</option>
              <option value="MIG/MAG">MIG/MAG</option>
              <option value="TIG">TIG</option>
              <option value="MMA">MMA</option>
              <option value="Plasma">Plasma</option>
              <option value="Accesorios">Accesorios</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={borrarDatosDemo}
              className="px-3 py-2 rounded bg-red-950/60 border border-red-800 text-xs text-red-200 hover:bg-red-900/60 transition-colors"
              title="Borra todos los equipos que tengan la etiqueta DEMO"
            >
              Borrar Datos DEMO
            </button>

            <Link
              href="/admin/productos/nuevo"
              className="px-4 py-2 rounded bg-[var(--color-oro)] text-[var(--color-carbon)] font-bold text-xs hover:bg-[var(--color-oro-claro)] transition-colors active:scale-95"
            >
              + Nuevo Equipo
            </Link>
          </div>
        </div>

        {/* Tabla sobria y eficiente de productos (04-admin-y-datos) */}
        <div className="w-full bg-[var(--color-carbon)] rounded-xl border border-[var(--color-grafito-2)] overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs text-[var(--color-plata)]">
            <thead className="bg-[var(--color-grafito-2)]/60 text-[var(--color-gris)] uppercase text-[10px] tracking-wider border-b border-[var(--color-grafito-2)]">
              <tr>
                <th className="py-3 px-4">Equipo / Modelo</th>
                <th className="py-3 px-4">Familia</th>
                <th className="py-3 px-4">Venta (S/)</th>
                <th className="py-3 px-4">Alquiler</th>
                <th className="py-3 px-4">Valoración</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-grafito-2)]">
              {equiposFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[var(--color-gris)]">
                    No se encontraron equipos registrados.
                  </td>
                </tr>
              ) : (
                equiposFiltrados.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[var(--color-grafito)]/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="font-bold text-[var(--color-plata)]">{item.nombre}</p>
                          <p className="text-[10px] text-[var(--color-gris)] font-mono">{item.modelo}</p>
                        </div>
                        {item.esDemo && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-yellow-950/60 border border-yellow-800/60 text-yellow-300">
                            DEMO
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[var(--color-gris)] font-medium">
                      {item.familia}
                    </td>
                    <td className="py-3 px-4 font-mono font-medium">
                      {item.precioVenta ? `S/ ${item.precioVenta.toLocaleString("es-PE")}` : "—"}
                    </td>
                    <td className="py-3 px-4 font-mono">
                      {item.precioAlquiler
                        ? `S/ ${item.precioAlquiler.toLocaleString("es-PE")} / ${item.unidadAlquiler}`
                        : "—"}
                    </td>
                    <td className="py-3 px-4">
                      {item.valoracion ? (
                        <span className="flex items-center gap-1 font-mono">
                          <span className="text-[var(--color-oro)]">★</span>
                          <span>{item.valoracion.promedio.toFixed(1)}</span>
                          <span className="text-[var(--color-gris)]">({item.valoracion.resenasCount})</span>
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleActivo(item.id)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          item.activo
                            ? "bg-emerald-950/70 text-emerald-300 border border-emerald-800/60"
                            : "bg-neutral-800 text-neutral-400 border border-neutral-700"
                        }`}
                      >
                        {item.activo ? "Activo" : "Oculto"}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <Link
                        href={`/admin/productos/${item.id}`}
                        className="px-2 py-1 rounded bg-[var(--color-grafito-2)] text-[var(--color-plata)] hover:text-[var(--color-oro)] text-[11px] font-medium"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => eliminarProducto(item.id)}
                        className="px-2 py-1 rounded bg-red-950/40 text-red-300 hover:bg-red-900/60 text-[11px] font-medium"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
