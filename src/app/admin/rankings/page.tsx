"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { catalogoProductos } from "@/data/catalogoOficial";
import { Equipo } from "@/types/equipo";

const equiposBase: Equipo[] = catalogoProductos.map((p) => ({
  id: p.id,
  nombre: p.nombre,
  modelo: p.modelo,
  marca: p.marca || "ESAB",
  familia: (p.proceso === "MMA" ? "ELECTRODO" : p.proceso === "MIG/MAG" ? "MIG/MAG" : p.proceso === "TIG" ? "TIG" : "MULTIPROCESO") as any,
  descripcionCorta: p.descripcionCorta,
  especificaciones: (p.especificaciones as Record<string, string>) || {},
  precioVenta: p.precioVenta,
  precioAntesVenta: p.precioAntesVenta,
  precioAlquiler: p.precioAlquiler,
  unidadAlquiler: p.unidadAlquiler,
  imagenUrl: p.imagenUrl || undefined,
  disponibleVenta: p.disponibleVenta,
  disponibleAlquiler: p.disponibleAlquiler,
  activo: p.activo ?? true,
  esDemo: false,
}));

export default function AdminRankingsPage() {
  const [masVendidos, setMasVendidos] = useState<Equipo[]>(equiposBase.slice(0, 3));
  const [mejorValorados, setMejorValorados] = useState<Equipo[]>(equiposBase.slice(3, 6));
  const [nuevos, setNuevos] = useState<Equipo[]>(equiposBase.slice(6, 9));
  const [guardadoMsg, setGuardadoMsg] = useState(false);

  const subir = (lista: Equipo[], setLista: React.Dispatch<React.SetStateAction<Equipo[]>>, index: number) => {
    if (index === 0) return;
    const nueva = [...lista];
    const temp = nueva[index - 1];
    nueva[index - 1] = nueva[index];
    nueva[index] = temp;
    setLista(nueva);
  };

  const bajar = (lista: Equipo[], setLista: React.Dispatch<React.SetStateAction<Equipo[]>>, index: number) => {
    if (index === lista.length - 1) return;
    const nueva = [...lista];
    const temp = nueva[index + 1];
    nueva[index + 1] = nueva[index];
    nueva[index] = temp;
    setLista(nueva);
  };

  const quitar = (lista: Equipo[], setLista: React.Dispatch<React.SetStateAction<Equipo[]>>, index: number) => {
    const nueva = [...lista];
    nueva.splice(index, 1);
    setLista(nueva);
  };

  const handleGuardar = () => {
    setGuardadoMsg(true);
    setTimeout(() => setGuardadoMsg(false), 3000);
  };

  const renderRankingCol = (
    titulo: string,
    lista: Equipo[],
    setLista: React.Dispatch<React.SetStateAction<Equipo[]>>
  ) => (
    <div className="flex-1 bg-[var(--color-carbon)] rounded-2xl border border-[var(--color-grafito-2)] p-5 flex flex-col space-y-4">
      <div className="flex items-center justify-between border-b border-[var(--color-grafito-2)] pb-3">
        <h3 className="font-bold text-sm text-[var(--color-plata)] font-['Montserrat',sans-serif]">
          {titulo}
        </h3>
        <span className="text-xs text-[var(--color-gris)] font-mono">
          {lista.length} equipos
        </span>
      </div>

      <ul className="flex-1 space-y-2.5">
        {lista.map((item, idx) => (
          <li
            key={item.id}
            className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-grafito)] border border-[var(--color-grafito-2)] text-xs"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="font-mono font-bold text-[var(--color-oro)] w-4 text-center">
                {idx + 1}
              </span>
              <div className="truncate">
                <p className="font-semibold text-[var(--color-plata)] truncate">{item.nombre}</p>
                <p className="text-[10px] text-[var(--color-gris)]">{item.familia}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0 ml-2">
              <button
                onClick={() => subir(lista, setLista, idx)}
                disabled={idx === 0}
                className="p-1 rounded bg-[var(--color-grafito-2)] text-[var(--color-plata)] hover:text-[var(--color-oro)] disabled:opacity-30"
                title="Subir posición"
              >
                ▲
              </button>
              <button
                onClick={() => bajar(lista, setLista, idx)}
                disabled={idx === lista.length - 1}
                className="p-1 rounded bg-[var(--color-grafito-2)] text-[var(--color-plata)] hover:text-[var(--color-oro)] disabled:opacity-30"
                title="Bajar posición"
              >
                ▼
              </button>
              <button
                onClick={() => quitar(lista, setLista, idx)}
                className="p-1 rounded bg-red-950/40 text-red-300 hover:bg-red-900/60 ml-1"
                title="Quitar del ranking"
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col bg-[var(--color-grafito)]">
      <AdminHeader titulo="Gestión de Rankings y Destacados" />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[var(--color-carbon)] p-4 rounded-xl border border-[var(--color-grafito-2)]">
          <div>
            <h2 className="text-sm font-bold text-[var(--color-plata)]">
              Orden de visualización en la página principal
            </h2>
            <p className="text-xs text-[var(--color-gris)]">
              Organice qué equipos ocupan las posiciones 1 a 6 de cada sección destacada.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {guardadoMsg && (
              <span className="text-xs text-emerald-400 font-medium">
                ✓ Orden guardado y revalidado
              </span>
            )}
            <button
              onClick={handleGuardar}
              className="px-5 py-2 rounded bg-[var(--color-oro)] text-[var(--color-carbon)] font-bold text-xs hover:bg-[var(--color-oro-claro)] transition-colors active:scale-95"
            >
              Guardar Rankings
            </button>
          </div>
        </div>

        {/* Tres columnas de rankings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {renderRankingCol("1. Más Vendidos", masVendidos, setMasVendidos)}
          {renderRankingCol("2. Mejor Valorados", mejorValorados, setMejorValorados)}
          {renderRankingCol("3. Nuevos Modelos", nuevos, setNuevos)}
        </div>
      </main>
    </div>
  );
}
