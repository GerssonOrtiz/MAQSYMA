import React from "react";
import { ProcesoFamilia } from "@/types/equipo";

interface EquipoImagePlaceholderProps {
  familia: ProcesoFamilia;
  nombre: string;
}

export const EquipoImagePlaceholder: React.FC<EquipoImagePlaceholderProps> = ({
  familia,
  nombre,
}) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#12141c] via-[#0d0e14] to-[#0a0b10] relative select-none">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />
      <div className="p-5 rounded-2xl bg-[#171a24] border border-[#25293a] mb-4 shadow-xl">
        <svg
          className="w-14 h-14 text-[var(--color-oro)] opacity-90"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M6 12h4" />
          <path d="M14 12h.01" />
          <path d="M17 12h.01" />
          <path d="M12 2v4" />
        </svg>
      </div>

      <span className="text-[11px] font-mono tracking-[0.2em] text-[var(--color-oro-claro)] uppercase font-semibold mb-1">
        ESAB INDUSTRIAL · {familia}
      </span>
      <span className="text-[10px] font-mono text-neutral-400 px-3 py-1 rounded border border-white/5 bg-black/40">
        FICHA TÉCNICA OFICIAL
      </span>
    </div>
  );
};
