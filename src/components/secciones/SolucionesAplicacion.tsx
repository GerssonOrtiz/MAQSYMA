import React from "react";
import { copy } from "@/content/copy.es";

export const SolucionesAplicacion: React.FC = () => {
  return (
    <section id="soluciones" className="w-full py-20 bg-[#0a0b0d] border-t border-[#1a1c24]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-oro)] block mb-2">
              Ingeniería Aplicada
            </span>
            <h2 className="font-['Syne',sans-serif] text-3xl sm:text-4xl font-extrabold text-white">
              Soluciones por Aplicación e Industria
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            Orientación técnica especializada para optimizar tiempos de soldadura, acabado superficial y consumo de energía según su sector.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {copy.soluciones.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-[#11131a] border border-[#1f222e] hover:border-[#353a4e] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center font-mono text-xs text-[var(--color-oro)] mb-4">
                  0{idx + 1}
                </div>
                <h3 className="font-['Syne',sans-serif] text-lg font-bold text-white mb-2">
                  {item.titulo}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {item.descripcion}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-neutral-400 flex items-center justify-between">
                <span>Especialidad</span>
                <span className="text-neutral-400 font-semibold">Configurable</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
