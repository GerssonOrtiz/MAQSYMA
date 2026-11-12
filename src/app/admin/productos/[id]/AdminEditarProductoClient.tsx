"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { equiposDemo } from "@/data/equiposDemo";
import { ProcesoFamilia } from "@/types/equipo";

export default function AdminEditarProductoClient() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const todos = [
    ...equiposDemo.mas_vendido,
    ...equiposDemo.mejor_valorado,
    ...equiposDemo.nuevo,
  ];
  const equipoInicial = todos.find((e) => e.id === id) || todos[0];

  const [nombre, setNombre] = useState(equipoInicial.nombre);
  const [modelo, setModelo] = useState(equipoInicial.modelo);
  const [familia, setFamilia] = useState<ProcesoFamilia>(equipoInicial.familia);
  const [descripcionCorta, setDescripcionCorta] = useState(equipoInicial.descripcionCorta);
  const [precioVenta, setPrecioVenta] = useState(String(equipoInicial.precioVenta || ""));
  const [disponibleVenta, setDisponibleVenta] = useState(equipoInicial.disponibleVenta);
  const [precioAlquiler, setPrecioAlquiler] = useState(String(equipoInicial.precioAlquiler || ""));
  const [unidadAlquiler, setUnidadAlquiler] = useState(equipoInicial.unidadAlquiler || "mes");
  const [disponibleAlquiler, setDisponibleAlquiler] = useState(equipoInicial.disponibleAlquiler);
  const [activo, setActivo] = useState(equipoInicial.activo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Equipo ${nombre} actualizado correctamente.`);
    router.push("/admin/productos");
  };

  return (
    <div className="flex-1 flex flex-col bg-[var(--color-grafito)]">
      <AdminHeader titulo={`Editar: ${nombre}`} />

      <main className="flex-1 max-w-4xl w-full mx-auto p-6">
        <div className="bg-[var(--color-carbon)] rounded-2xl border border-[var(--color-grafito-2)] p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--color-grafito-2)] pb-4">
            <div>
              <h2 className="text-lg font-bold text-[var(--color-plata)] font-['Montserrat',sans-serif]">
                Editar Equipo
              </h2>
              <p className="text-xs text-[var(--color-gris)]">
                Modifique los datos técnicos o comerciales del equipo
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[var(--color-gris)] font-medium mb-1">
                  Nombre Comercial *
                </label>
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
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
                  className="w-full px-3.5 py-2.5 rounded bg-[var(--color-grafito)] border border-[var(--color-grafito-2)] text-[var(--color-plata)] focus:border-[var(--color-oro)] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[var(--color-gris)] font-medium mb-1">
                  Familia de Proceso
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
                  Estado
                </label>
                <label className="flex items-center gap-2 pt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activo}
                    onChange={(e) => setActivo(e.target.checked)}
                  />
                  <span className="text-[var(--color-plata)]">Visible en la web pública</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-[var(--color-gris)] font-medium mb-1">
                Descripción Corta *
              </label>
              <textarea
                required
                maxLength={120}
                rows={2}
                value={descripcionCorta}
                onChange={(e) => setDescripcionCorta(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded bg-[var(--color-grafito)] border border-[var(--color-grafito-2)] text-[var(--color-plata)] focus:border-[var(--color-oro)] focus:outline-none"
              />
            </div>

            <div className="p-4 rounded-xl bg-[var(--color-grafito)]/60 border border-[var(--color-grafito-2)] space-y-4">
              <h3 className="font-bold text-[var(--color-oro-claro)] uppercase tracking-wider text-[11px]">
                Precios y Disponibilidad
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={disponibleVenta}
                      onChange={(e) => setDisponibleVenta(e.target.checked)}
                    />
                    <span className="font-medium text-[var(--color-plata)]">Venta Activa</span>
                  </label>
                  {disponibleVenta && (
                    <input
                      type="number"
                      value={precioVenta}
                      onChange={(e) => setPrecioVenta(e.target.value)}
                      placeholder="S/ Venta"
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
                    <span className="font-medium text-[var(--color-plata)]">Alquiler Activo</span>
                  </label>
                  {disponibleAlquiler && (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={precioAlquiler}
                        onChange={(e) => setPrecioAlquiler(e.target.value)}
                        placeholder="S/ Alquiler"
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
                Actualizar Cambios
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
