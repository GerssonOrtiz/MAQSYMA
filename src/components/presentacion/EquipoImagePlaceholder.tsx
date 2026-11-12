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
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[var(--color-grafito)] via-[var(--color-carbon)] to-[var(--color-grafito)] relative select-none">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--color-plata) 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }}
      />
      <div className="p-4 rounded-xl bg-[var(--color-grafito-2)]/50 border border-[var(--color-grafito-2)] mb-3 shadow-inner">
        <svg
          className="w-12 h-12 text-[var(--color-oro)] opacity-80"
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

      <span className="text-[10px] font-mono tracking-widest text-[var(--color-oro-claro)] uppercase mb-1">
        ESAB · {familia}
      </span>
      <span className="text-[9px] font-mono text-[var(--color-gris)] px-2 py-0.5 rounded border border-[var(--color-grafito-2)] bg-[var(--color-carbon)]/70">
        FOTO: PLACEHOLDER TEMPORAL
      </span>
    </div>
  );
};
