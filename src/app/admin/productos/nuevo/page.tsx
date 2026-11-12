"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ProcesoFamilia } from "@/types/equipo";

export default function AdminNuevoProductoPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [modelo, setModelo] = useState("");
  const [familia, setFamilia] = useState<ProcesoFamilia>("MIG/MAG");
  const [descripcionCorta, setDescripcionCorta] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [disponibleVenta, setDisponibleVenta] = useState(true);
  const [precioAlquiler, setPrecioAlquiler] = useState("");
  const [unidadAlquiler, setUnidadAlquiler] = useState<"día" | "semana" | "mes">("mes");
  const [disponibleAlquiler, setDisponibleAlquiler] = useState(false);
  const [valoracion, setValoracion] = useState("5.0");
  const [numResenas, setNumResenas] = useState("0");
  const [activo, setActivo] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Equipo ${nombre} guardado exitosamente en el catálogo.`);
    router.push("/admin/productos");
  };

  return (
    <div className="flex-1 flex flex-col bg-[var(--color-grafito)]">
      <AdminHeader titulo="Nuevo Equipo ESAB" />

      <main className="flex-1 max-w-4xl w-full mx-auto p-6">
        <div className="bg-[var(--color-carbon)] rounded-2xl border border-[var(--color-grafito-2)] p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--color-grafito-2)] pb-4">
            <div>
              <h2 className="text-lg font-bold text-[var(--color-plata)] font-['Montserrat',sans-serif]">
                Registrar Nuevo Equipo
              </h2>
              <p className="text-xs text-[var(--color-gris)]">
                Ingrese las especificaciones técnicas del equipo ESAB
              </p>
            </div>
            <Link
              href="/admin/productos"
              className="text-xs text-[var(--color-gris)] hover:text-[var(--color-plata)]"
            >
              ← Volver al listado
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            {/* Datos básicos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[var(--color-gris)] font-medium mb-1">
                  Nombre Comercial del Equipo *
                </label>
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Warrior 500i CC/CV"
                  className="w-full px-3.5 py-2.5 rounded bg-[var(--color-grafito)] border border-[var(--color-grafito-2)] text-[var(--color-plata)] focus:border-[var(--color-oro)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[var(--color-gris)] font-medium mb-1">
                  Modelo Técnico *
                </label>
                <input
                  type="text"
                  required
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                  placeholder="Ej. WARRIOR-500I"
                  className="w-full px-3.5 py-2.5 rounded bg-[var(--color-grafito)] border border-[var(--color-grafito-2)] text-[var(--color-plata)] focus:border-[var(--color-oro)] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[var(--color-gris)] font-medium mb-1">
                  Familia de Proceso ESAB *
                </label>
                <select
                  value={familia}
                  onChange={(e) => setFamilia(e.target.value as ProcesoFamilia)}
                  className="w-full px-3.5 py-2.5 rounded bg-[var(--color-grafito)] border border-[var(--color-grafito-2)] text-[var(--color-plata)] focus:border-[var(--color-oro)] focus:outline-none"
                >
                  <option value="MIG/MAG">MIG/MAG</option>
                  <option value="TIG">TIG</option>
                  <option value="MMA">MMA</option>
                  <option value="Plasma">Plasma</option>
                  <option value="Accesorios">Accesorios</option>
                </select>
              </div>

              <div>
                <label className="block text-[var(--color-gris)] font-medium mb-1">
                  Estado de Publicación
                </label>
                <label className="flex items-center gap-2 pt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activo}
                    onChange={(e) => setActivo(e.target.checked)}
                    className="rounded border-[var(--color-grafito-2)] text-[var(--color-oro)] focus:ring-[var(--color-oro)]"
                  />
                  <span className="text-[var(--color-plata)]">Visible en la web pública</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-[var(--color-gris)] font-medium mb-1">
                Descripción Corta (máx. 120 caracteres) *
              </label>
              <textarea
                required
                maxLength={120}
                rows={2}
                value={descripcionCorta}
                onChange={(e) => setDescripcionCorta(e.target.value)}
                placeholder="Resumen del equipo para la tarjeta..."
                className="w-full px-3.5 py-2.5 rounded bg-[var(--color-grafito)] border border-[var(--color-grafito-2)] text-[var(--color-plata)] focus:border-[var(--color-oro)] focus:outline-none"
              />
            </div>

            {/* Comercial: Venta y Alquiler */}
            <div className="p-4 rounded-xl bg-[var(--color-grafito)]/60 border border-[var(--color-grafito-2)] space-y-4">
              <h3 className="font-bold text-[var(--color-oro-claro)] uppercase tracking-wider text-[11px]">
                Condiciones Comerciales
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={disponibleVenta}
                      onChange={(e) => setDisponibleVenta(e.target.checked)}
                    />
                    <span className="font-medium text-[var(--color-plata)]">Disponible para Venta</span>
                  </label>
                  {disponibleVenta && (
                    <input
                      type="number"
                      required
                      placeholder="Precio de venta en S/"
                      value={precioVenta}
                      onChange={(e) => setPrecioVenta(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[var(--color-carbon)] border border-[var(--color-grafito-2)] text-[var(--color-plata)] font-mono"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={disponibleAlquiler}
                      onChange={(e) => setDisponibleAlquiler(e.target.checked)}
                    />
                    <span className="font-medium text-[var(--color-plata)]">Disponible para Alquiler</span>
                  </label>
                  {disponibleAlquiler && (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        required
                        placeholder="Tarifa alquiler S/"
                        value={precioAlquiler}
                        onChange={(e) => setPrecioAlquiler(e.target.value)}
                        className="w-2/3 px-3 py-2 rounded bg-[var(--color-carbon)] border border-[var(--color-grafito-2)] text-[var(--color-plata)] font-mono"
                      />
                      <select
                        value={unidadAlquiler}
                        onChange={(e) => setUnidadAlquiler(e.target.value as any)}
                        className="w-1/3 px-2 py-2 rounded bg-[var(--color-carbon)] border border-[var(--color-grafito-2)] text-[var(--color-plata)]"
                      >
                        <option value="día">por día</option>
                        <option value="semana">por semana</option>
                        <option value="mes">por mes</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-[var(--color-grafito-2)]">
              <Link
                href="/admin/productos"
                className="px-4 py-2.5 rounded bg-[var(--color-grafito)] text-[var(--color-gris)] hover:text-[var(--color-plata)]"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                className="px-6 py-2.5 rounded bg-[var(--color-oro)] text-[var(--color-carbon)] font-bold hover:bg-[var(--color-oro-claro)] transition-colors active:scale-95"
              >
                Guardar Equipo
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
