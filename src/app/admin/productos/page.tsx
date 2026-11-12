"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { equiposDemo } from "@/data/equiposDemo";
import { Equipo } from "@/types/equipo";

export default function AdminProductosPage() {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [filtroFamilia, setFiltroFamilia] = useState("TODAS");
  const [busqueda, setBusqueda] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const cargarProductos = async () => {
    setCargando(true);
    try {
      const res = await fetch("/api/admin/productos");
      if (res.ok) {
        const data = await res.json();
        if (data.productos && data.productos.length > 0) {
          const formateados: Equipo[] = data.productos.map((p: any) => ({
            id: p.id,
            nombre: p.nombre,
            modelo: p.modelo || "",
            marca: "ESAB",
            familia: p.familia === "MIG_MAG" ? "MIG/MAG" : p.familia,
            descripcionCorta: p.descripcion_corta || "",
            imagenUrl: p.imagen_url || null,
            precioVenta: p.precio_venta ? Number(p.precio_venta) : undefined,
            precioAlquiler: p.precio_alquiler ? Number(p.precio_alquiler) : undefined,
            unidadAlquiler: p.unidad_alquiler || "mes",
            disponibleVenta: Boolean(p.disponible_venta),
            disponibleAlquiler: Boolean(p.disponible_alquiler),
            activo: Boolean(p.activo),
            esDemo: Boolean(p.es_demo),
            promocion: p.especificaciones?.promocion,
            precioAntesVenta: p.especificaciones?.precioAntesVenta,
          }));
          setEquipos(formateados);
          return;
        }
      }
      // Fallback si la base de datos está vacía
      const fallbackList = [
        ...equiposDemo.mas_vendido,
        ...equiposDemo.mejor_valorado,
        ...equiposDemo.nuevo,
      ];
      setEquipos(fallbackList);
    } catch (err: any) {
      setErrorMsg(err.message || "Error conectando con el catálogo");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const toggleActivo = async (id: string, activoActual: boolean) => {
    try {
      await fetch(`/api/admin/productos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activo: !activoActual }),
      });
      setEquipos((prev) =>
        prev.map((e) => (e.id === id ? { ...e, activo: !activoActual } : e))
      );
    } catch {
      alert("No se pudo actualizar el estado");
    }
  };

  const eliminarProducto = async (id: string, nombre: string) => {
    if (!confirm(`¿Está seguro de eliminar el equipo "${nombre}"?`)) return;
    try {
      await fetch(`/api/admin/productos/${id}`, { method: "DELETE" });
      setEquipos((prev) => prev.filter((e) => e.id !== id));
    } catch {
      alert("Error eliminando equipo");
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
    <div className="flex-1 flex flex-col bg-[var(--color-grafito)] min-h-screen">
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
            <Link
              href="/admin/productos/nuevo"
              className="px-4 py-2 rounded bg-[var(--color-oro)] text-[var(--color-carbon)] text-xs font-bold hover:bg-[var(--color-oro-claro)] transition-colors active:scale-95 inline-flex items-center gap-1.5 shadow"
            >
              <span>+</span>
              <span>Añadir Nuevo Equipo</span>
            </Link>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Tabla de equipos */}
        <div className="bg-[var(--color-carbon)] rounded-xl border border-[var(--color-grafito-2)] overflow-hidden shadow">
          {cargando ? (
            <div className="p-12 text-center text-xs text-[var(--color-gris)]">
              Cargando catálogo desde Supabase...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[var(--color-grafito-2)] text-[var(--color-gris)] uppercase text-[10px] tracking-wider border-b border-[var(--color-grafito-2)]">
                  <tr>
                    <th className="py-3 px-4">Foto</th>
                    <th className="py-3 px-4">Equipo / Modelo</th>
                    <th className="py-3 px-4">Familia</th>
                    <th className="py-3 px-4">Promoción</th>
                    <th className="py-3 px-4">Venta (S/)</th>
                    <th className="py-3 px-4">Alquiler (S/)</th>
                    <th className="py-3 px-4">Estado</th>
                    <th className="py-3 px-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-grafito-2)] text-[var(--color-plata)]">
                  {equiposFiltrados.map((equipo) => (
                    <tr
                      key={equipo.id}
                      className="hover:bg-[var(--color-grafito)]/40 transition-colors"
                    >
                      {/* Miniatura */}
                      <td className="py-2.5 px-4">
                        <div className="relative w-12 h-12 rounded bg-[var(--color-grafito)] border border-[var(--color-grafito-2)] flex items-center justify-center overflow-hidden">
                          {equipo.imagenUrl ? (
                            <Image
                              src={equipo.imagenUrl}
                              alt={equipo.nombre}
                              fill
                              className="object-contain p-1"
                            />
                          ) : (
                            <span className="text-[9px] text-[var(--color-gris)] text-center">
                              Sin foto
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-bold font-['Montserrat',sans-serif]">
                          {equipo.nombre}
                        </div>
                        <div className="text-[11px] text-[var(--color-gris)] font-mono">
                          {equipo.modelo}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-[var(--color-grafito)] text-[10px] text-[var(--color-plata)] border border-[var(--color-grafito-2)]">
                          {equipo.familia}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        {equipo.promocion ? (
                          <span className="px-2 py-0.5 rounded bg-red-950/60 text-red-300 font-bold border border-red-500/40 text-[10px]">
                            {equipo.promocion}
                          </span>
                        ) : (
                          <span className="text-[var(--color-gris)] text-[11px]">—</span>
                        )}
                      </td>

                      <td className="py-3 px-4 font-mono">
                        {equipo.precioVenta ? (
                          <div>
                            {equipo.precioAntesVenta && (
                              <div className="text-[10px] text-[var(--color-gris)] line-through">
                                S/ {equipo.precioAntesVenta.toLocaleString("es-PE")}
                              </div>
                            )}
                            <div className="font-bold text-[var(--color-plata)]">
                              S/ {equipo.precioVenta.toLocaleString("es-PE")}
                            </div>
                          </div>
                        ) : (
                          <span className="text-[var(--color-gris)] text-[11px]">—</span>
                        )}
                      </td>

                      <td className="py-3 px-4 font-mono text-[var(--color-oro-claro)]">
                        {equipo.precioAlquiler ? (
                          <div>
                            S/ {equipo.precioAlquiler.toLocaleString("es-PE")}
                            <span className="text-[10px] text-[var(--color-gris)] font-sans ml-1">
                              / {equipo.unidadAlquiler || "mes"}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[var(--color-gris)] text-[11px]">—</span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => toggleActivo(equipo.id, equipo.activo)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                            equipo.activo
                              ? "bg-green-950 text-green-300 border border-green-700/50"
                              : "bg-[var(--color-grafito)] text-[var(--color-gris)] border border-[var(--color-grafito-2)]"
                          }`}
                        >
                          {equipo.activo ? "Visible" : "Oculto"}
                        </button>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            href={`/admin/productos/${equipo.id}`}
                            className="p-1 rounded text-[var(--color-oro-claro)] hover:bg-[var(--color-grafito)] transition-colors text-[11px] font-medium"
                          >
                            Editar
                          </Link>
                          <button
                            type="button"
                            onClick={() => eliminarProducto(equipo.id, equipo.nombre)}
                            className="p-1 rounded text-red-400 hover:bg-red-950/50 transition-colors text-[11px]"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
