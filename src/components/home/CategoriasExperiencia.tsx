import React from "react";
import { copy } from "@/content/copy.es";

export const CategoriasExperiencia: React.FC = () => {
  return (
    <section id="categorias" aria-label="Líneas de Solución Industrial" className="w-full py-24 bg-[#0A0C10] text-white border-t border-[#161922]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Cabecera Editorial Impeccable */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#1A1F2C] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#131720] border border-[#202636] text-xs font-mono text-[var(--color-oro-claro)] uppercase tracking-wider mb-2">
              Líneas Industriales
            </div>
            <h2 className="font-['Syne',sans-serif] text-3xl sm:text-5xl font-black text-white tracking-tight">
              Gama de Equipamiento
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md font-light leading-relaxed">
            Fuentes de potencia, corte plasma térmico, protección fotosensible y periféricos robustos con garantía de fábrica y soporte regional.
          </p>
        </div>

        {/* Grid Editorial de Categorías */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {copy.categorias.map((cat, idx) => (
            <a
              key={cat.id}
              href={`#productos`}
              className="group relative p-8 sm:p-10 rounded-2xl bg-[#0E1117] border border-[#1B202D] hover:border-[var(--color-oro)]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-oro)]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[var(--color-oro)]/12 transition-all duration-500" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-bold text-[var(--color-oro)] tracking-widest">
                    LÍNEA 0{idx + 1}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400 border border-white/5 bg-black/40 px-3 py-1 rounded-full">
                    {cat.count}
                  </span>
                </div>

                <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                  {cat.subtitulo}
                </div>

                <h3 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold text-white mb-4 group-hover:text-[var(--color-oro-claro)] transition-colors">
                  {cat.titulo}
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed font-light mb-8 max-w-lg">
                  {cat.descripcion}
                </p>
              </div>

              <div className="pt-6 border-t border-[#181D2A] flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400 group-hover:text-white transition-colors">
                  EXPLORAR CATÁLOGO COMPLETO
                </span>
                <span className="text-[var(--color-oro)] transform transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
