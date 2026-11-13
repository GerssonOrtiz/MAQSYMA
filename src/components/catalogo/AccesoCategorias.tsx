import React from "react";
import { copy } from "@/content/copy.es";

export const AccesoCategorias: React.FC = () => {
  return (
    <section aria-label="Líneas y categorías industriales" className="w-full py-12 bg-[#0d0e12] border-y border-[#20222a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-oro)] block mb-1">
              Catálogo Especializado
            </span>
            <h2 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-bold text-white">
              Líneas de Solución Industrial
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            Seleccione una categoría para consultar equipos disponibles para compra inmediata o alquiler por obra.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {copy.categorias.map((cat, idx) => (
            <a
              key={cat.id}
              href={`#categoria-${cat.id}`}
              className="group p-5 rounded-lg bg-[#14161d] hover:bg-[#1a1d26] border border-[#252834] hover:border-[var(--color-oro)]/50 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-neutral-400 group-hover:text-[var(--color-oro)]">
                  <span className="font-mono text-xs font-semibold text-[var(--color-oro)]">0{idx + 1}</span>
                  <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">→</span>
                </div>
                <h3 className="font-bold text-white text-base mb-1.5 group-hover:text-[var(--color-oro)] transition-colors">
                  {cat.titulo}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {cat.descripcion}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#252834] flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                <span>Explorar modelos</span>
                <span className="text-[var(--color-oro)]">Ver listado</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
