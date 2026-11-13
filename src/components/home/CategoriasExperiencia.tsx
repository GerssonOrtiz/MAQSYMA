import React from "react";
import { copy } from "@/content/copy.es";

export const CategoriasExperiencia: React.FC = () => {
  return (
    <section id="categorias" aria-label="Categorías Industriales MAQSYMA" className="w-full py-24 bg-[#08090b] text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Cabecera Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#1c1f2b] pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-oro)] block mb-2">
              02 // ENCUENTRA TU EQUIPO
            </span>
            <h2 className="font-['Syne',sans-serif] text-3xl sm:text-5xl font-black text-white tracking-tight">
              LÍNEAS DE EQUIPAMIENTO
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md font-light">
            Fuentes de poder, sistemas de corte, protección y periféricos seleccionados para tolerar las condiciones más exigentes del país.
          </p>
        </div>

        {/* Grid Asimétrico Editorial de Categorías */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {copy.categorias.map((cat, idx) => (
            <a
              key={cat.id}
              href={`#productos`}
              className="group relative p-8 sm:p-10 rounded-xl bg-gradient-to-b from-[#11131a] to-[#0c0d12] border border-[#202330] hover:border-[var(--color-oro)]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
            >
              {/* Resplandor hover */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-oro)]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[var(--color-oro)]/15 transition-all duration-500" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-bold text-[var(--color-oro)] tracking-widest">
                    LÍNEA 0{idx + 1}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400 border border-white/5 px-2.5 py-1 rounded">
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

              <div className="pt-6 border-t border-[#1c1f2b] flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400 group-hover:text-white transition-colors">
                  EXPLORAR CATÁLOGO
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
