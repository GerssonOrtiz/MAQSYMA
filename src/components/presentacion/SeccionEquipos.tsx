import React from "react";
import { Equipo, EtiquetaDestacado } from "@/types/equipo";
import { TarjetaEquipo } from "./TarjetaEquipo";
import { EstadoVacio } from "./EstadoVacio";

interface SeccionEquiposProps {
  id: string;
  titulo: string;
  frase: string;
  equipos: Equipo[];
  etiqueta: EtiquetaDestacado;
}

/**
 * Componente SeccionEquipos (03-secciones-y-componentes)
 * - Lista semántica ul/li para accesibilidad
 * - Móvil: carrusel horizontal fluido con scroll-snap-type: x mandatory (ancho 78vw)
 * - Tablet: grilla de 2 columnas
 * - Escritorio: grilla balanceada de 3 columnas
 */
export const SeccionEquipos: React.FC<SeccionEquiposProps> = ({
  id,
  titulo,
  frase,
  equipos,
  etiqueta,
}) => {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className="py-16 md:py-24 max-w-7xl mx-auto px-6 scroll-mt-24"
    >
      <header className="mb-8 md:mb-12 max-w-2xl space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[var(--color-grafito-2)] text-[11px] font-mono text-[var(--color-oro-claro)] uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-oro)]" />
          Catálogo ESAB
        </div>
        <h2
          id={`${id}-titulo`}
          className="font-['Montserrat',sans-serif] text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-plata)] tracking-tight leading-tight"
        >
          {titulo}
        </h2>
        <p className="text-sm sm:text-base text-[var(--color-gris)] leading-relaxed">
          {frase}
        </p>
      </header>

      {equipos.length === 0 ? (
        <EstadoVacio tituloSeccion={titulo} />
      ) : (
        <ul className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0 scrollbar-none">
          {equipos.slice(0, 6).map((equipo) => (
            <li
              key={equipo.id}
              className="snap-start shrink-0 w-[78vw] sm:w-[48vw] md:w-auto list-none"
            >
              <TarjetaEquipo equipo={equipo} etiqueta={etiqueta} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
