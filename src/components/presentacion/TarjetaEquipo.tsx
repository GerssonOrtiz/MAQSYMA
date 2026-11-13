import React from "react";
import Image from "next/image";
import { Equipo, EtiquetaDestacado } from "@/types/equipo";
import { whatsappProductLink } from "@/lib/whatsapp";
import { EquipoImagePlaceholder } from "./EquipoImagePlaceholder";

interface TarjetaEquipoProps {
  equipo: Equipo;
  etiqueta: EtiquetaDestacado;
}

export const TarjetaEquipo: React.FC<TarjetaEquipoProps> = ({ equipo, etiqueta }) => {
  const getEtiquetaLabel = () => {
    switch (etiqueta) {
      case "mas_vendido":
        return "Más vendido";
      case "mejor_valorado":
        return "Mejor valorado";
      case "nuevo":
        return "Nuevo";
    }
  };

  const whatsappHref = whatsappProductLink(
    equipo.nombre,
    equipo.modelo,
    Boolean(equipo.precioAlquiler && !equipo.precioVenta),
    equipo.unidadAlquiler
  );

  return (
    <article
      className="group relative flex flex-col justify-between h-full bg-[var(--color-grafito)] rounded-[14px] border border-[var(--color-grafito-2)] overflow-hidden transition-all duration-250 ease-out hover:-translate-y-1 hover:border-[var(--color-oro)]/50 hover:shadow-[0_12px_24px_rgba(0,0,0,0.5)] active:scale-[0.99]"
      style={{
        transitionProperty: "transform, border-color, box-shadow",
      }}
    >
      {/* 1. Imagen / Proporción 4:3 con padding y contenedor grafito */}
      <div className="relative aspect-[4/3] w-full bg-[var(--color-grafito)] border-b border-[var(--color-grafito-2)] overflow-hidden flex items-center justify-center p-4">
        {equipo.imagenUrl ? (
          <Image
            src={equipo.imagenUrl}
            alt={`${equipo.marca} ${equipo.nombre}`}
            fill
            sizes="(max-width: 768px) 78vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-4 transition-transform duration-250 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <EquipoImagePlaceholder familia={equipo.familia || equipo.proceso || "General"} nombre={equipo.nombre} />
        )}

        {/* 2. Etiqueta única de estado en dorado (esquina superior) */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--color-carbon)]/90 backdrop-blur-md border border-[var(--color-oro)]/40 text-[11px] font-bold text-[var(--color-oro-claro)] shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-oro)]" />
            {getEtiquetaLabel()}
          </span>
          {equipo.promocion && (
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-red-600/90 text-[10px] font-extrabold text-white shadow uppercase tracking-wide">
              {equipo.promocion}
            </span>
          )}
        </div>

        {/* Distintivo de DEMO si corresponde */}
        {equipo.esDemo && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2 py-0.5 rounded bg-[var(--color-carbon)]/80 text-[9px] font-mono text-[var(--color-gris)] border border-[var(--color-grafito-2)]">
              DEMO
            </span>
          </div>
        )}
      </div>

      {/* Contenido de la tarjeta */}
      <div className="flex-1 flex flex-col justify-between p-5 space-y-4">
        <div className="space-y-2">
          {/* 3. Familia del proceso en gris mayúsculas */}
          <div className="text-[12px] font-medium uppercase tracking-wider text-[var(--color-gris)]">
            {equipo.marca} · {equipo.familia}
          </div>

          {/* 4. Nombre del equipo (Montserrat 700) */}
          <h3 className="font-['Montserrat',sans-serif] text-lg sm:text-xl font-bold text-[var(--color-plata)] leading-tight group-hover:text-[var(--color-oro-claro)] transition-colors duration-200">
            {equipo.nombre}
          </h3>

          {/* 5. Descripción corta truncada */}
          <p className="text-xs sm:text-sm text-[var(--color-gris)] line-clamp-2 leading-relaxed">
            {equipo.descripcionCorta}
          </p>

          {/* 6. Valoración con estrellas (solo si existen reseñas) */}
          {equipo.valoracion && equipo.valoracion.resenasCount > 0 && (
            <div className="flex items-center gap-1.5 pt-1 text-xs text-[var(--color-plata)]">
              <span className="text-[var(--color-oro)] font-bold">★</span>
              <span className="font-semibold tabular-nums">{equipo.valoracion.promedio.toFixed(1)}</span>
              <span className="text-[var(--color-gris)] tabular-nums">
                ({equipo.valoracion.resenasCount} valoraciones)
              </span>
            </div>
          )}
        </div>

        {/* 7. Precios tabulares (Venta y Alquiler) */}
        <div className="pt-3 border-t border-[var(--color-grafito-2)] space-y-1">
          {equipo.precioVenta && (
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-[var(--color-gris)]">Venta:</span>
              <div className="flex items-baseline gap-2">
                {equipo.precioAntesVenta && (
                  <span className="text-xs text-[var(--color-gris)] line-through tabular-nums">
                    S/ {equipo.precioAntesVenta.toLocaleString("es-PE")}
                  </span>
                )}
                <span className="text-sm font-bold text-[var(--color-plata)] tabular-nums">
                  S/ {equipo.precioVenta.toLocaleString("es-PE")}
                </span>
              </div>
            </div>
          )}

          {equipo.precioAlquiler && (
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-[var(--color-gris)]">Alquiler:</span>
              <span className="text-sm font-bold text-[var(--color-oro-claro)] tabular-nums">
                S/ {equipo.precioAlquiler.toLocaleString("es-PE")}{" "}
                <span className="text-xs font-normal text-[var(--color-gris)]">
                  / {equipo.unidadAlquiler || "mes"}
                </span>
              </span>
            </div>
          )}
        </div>

        {/* 8. Botón Cotizar por WhatsApp con micro-interacción */}
        <div className="pt-1">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[var(--color-grafito-2)] border border-[var(--color-oro)]/40 px-4 py-2.5 text-xs font-bold text-[var(--color-plata)] transition-all duration-200 hover:bg-[var(--color-oro)] hover:text-[var(--color-carbon)] hover:border-[var(--color-oro)] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--color-oro)]"
          >
            <span>Cotizar por WhatsApp</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </article>
  );
};
