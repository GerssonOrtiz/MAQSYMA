import React from "react";
import { equiposDemo } from "@/data/equiposDemo";
import { SeccionEquipos } from "./SeccionEquipos";
import { copy } from "@/content/copy.es";

export const PresentacionEquipos: React.FC = () => {
  return (
    <div id="equipos" className="relative w-full bg-[var(--color-carbon)]">
      {/* 5.1 Más vendidos */}
      <SeccionEquipos
        id="mas-vendidos"
        titulo={copy.sections.bestSellers.title}
        frase="Los equipos que más eligen nuestros clientes para trabajar cada día."
        equipos={equiposDemo.mas_vendido}
        etiqueta="mas_vendido"
      />

      {/* Divisor sutil */}
      <div className="max-w-7xl mx-auto px-6">
        <hr className="border-[var(--color-grafito-2)]" />
      </div>

      {/* 5.2 Mejor valorados */}
      <SeccionEquipos
        id="mejor-valorados"
        titulo={copy.sections.topRated.title}
        frase="Lo que dicen quienes ya los usan en su taller o en obra."
        equipos={equiposDemo.mejor_valorado}
        etiqueta="mejor_valorado"
      />

      {/* Divisor sutil */}
      <div className="max-w-7xl mx-auto px-6">
        <hr className="border-[var(--color-grafito-2)]" />
      </div>

      {/* 5.3 Nuevos modelos */}
      <SeccionEquipos
        id="nuevos"
        titulo={copy.sections.newModels.title}
        frase="Lo último en ESAB, disponible para venta y alquiler."
        equipos={equiposDemo.nuevo}
        etiqueta="nuevo"
      />
    </div>
  );
};
