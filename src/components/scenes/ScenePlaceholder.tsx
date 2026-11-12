import React from "react";

interface ScenePlaceholderProps {
  sceneId: string;
  process: string;
  className?: string;
}

/**
 * Placeholder industrial técnico de alta calidad (cumple 01 y 02):
 * - Fondo degradado de carbón a grafito
 * - Textura sutil geométrica
 * - Icono SVG técnico en trazo fino color oro
 * - Distintivo PLACEHOLDER
 */
export const ScenePlaceholder: React.FC<ScenePlaceholderProps> = ({
  sceneId,
  process,
  className = "",
}) => {
  const renderIcon = () => {
    switch (sceneId) {
      case "mig-mag":
        return (
          // Antorcha y carrete de alambre continuo
          <svg
            className="w-20 h-20 sm:w-28 sm:h-28 text-[var(--color-oro)] opacity-75 drop-shadow-[0_0_12px_rgba(201,162,74,0.3)]"
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="20" cy="40" r="12" strokeDasharray="3 3" />
            <circle cx="20" cy="40" r="4" fill="currentColor" fillOpacity="0.2" />
            <path d="M20 28 L40 16 L56 22" />
            <path d="M40 16 L44 32" />
            <path d="M56 22 L60 20" strokeWidth="2" stroke="var(--color-oro-claro)" />
            {/* Chispas de soldadura */}
            <path d="M58 14 L62 10" stroke="var(--color-oro-claro)" />
            <path d="M52 10 L54 6" stroke="var(--color-oro-claro)" />
            <path d="M62 26 L64 28" stroke="var(--color-oro-claro)" />
          </svg>
        );
      case "tig":
        return (
          // Electrodo de tungsteno con arco concentrado
          <svg
            className="w-20 h-20 sm:w-28 sm:h-28 text-[var(--color-oro)] opacity-75 drop-shadow-[0_0_12px_rgba(201,162,74,0.3)]"
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M32 8 L32 38" strokeWidth="2.5" />
            <path d="M26 22 L38 22" />
            <path d="M28 32 L36 32" />
            <path d="M32 38 L30 46 L32 50 L34 46 Z" fill="currentColor" fillOpacity="0.3" />
            <circle cx="32" cy="54" r="3" fill="var(--color-oro-claro)" />
            <line x1="16" y1="54" x2="48" y2="54" strokeWidth="2" strokeDasharray="4 2" />
          </svg>
        );
      case "mma":
        return (
          // Pinza portaelectrodo y varilla
          <svg
            className="w-20 h-20 sm:w-28 sm:h-28 text-[var(--color-oro)] opacity-75 drop-shadow-[0_0_12px_rgba(201,162,74,0.3)]"
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="12" y="32" width="16" height="24" rx="2" />
            <path d="M28 40 L48 20" strokeWidth="3" />
            <path d="M48 20 L58 10" strokeWidth="1.5" stroke="var(--color-oro-claro)" />
            <circle cx="58" cy="10" r="2" fill="var(--color-oro-claro)" />
            <line x1="20" y1="20" x2="20" y2="32" />
          </svg>
        );
      case "plasma":
        return (
          // Antorcha de corte por plasma
          <svg
            className="w-20 h-20 sm:w-28 sm:h-28 text-[var(--color-oro)] opacity-75 drop-shadow-[0_0_12px_rgba(201,162,74,0.3)]"
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 16 L36 16 L44 32 L32 44 L24 36 Z" />
            <path d="M44 32 L54 42" strokeWidth="2.5" />
            <line x1="54" y1="42" x2="60" y2="48" stroke="var(--color-oro-claro)" strokeWidth="3" />
            <line x1="10" y1="56" x2="56" y2="56" strokeWidth="2" />
          </svg>
        );
      case "alquiler":
        return (
          // Flota industrial de equipos ESAB
          <svg
            className="w-20 h-20 sm:w-28 sm:h-28 text-[var(--color-oro)] opacity-75 drop-shadow-[0_0_12px_rgba(201,162,74,0.3)]"
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="10" y="16" width="44" height="34" rx="3" strokeWidth="2" />
            <circle cx="22" cy="50" r="5" fill="currentColor" fillOpacity="0.2" />
            <circle cx="42" cy="50" r="5" fill="currentColor" fillOpacity="0.2" />
            <line x1="10" y1="26" x2="54" y2="26" />
            <rect x="16" y="32" width="10" height="8" rx="1" fill="currentColor" fillOpacity="0.2" />
            <line x1="32" y1="36" x2="48" y2="36" />
          </svg>
        );
      default:
        // Entrada / Recepción técnica
        return (
          <svg
            className="w-20 h-20 sm:w-28 sm:h-28 text-[var(--color-oro)] opacity-75 drop-shadow-[0_0_12px_rgba(201,162,74,0.3)]"
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="32 8 56 22 56 50 32 60 8 50 8 22" strokeWidth="2" />
            <line x1="32" y1="8" x2="32" y2="60" />
            <line x1="8" y1="22" x2="56" y2="22" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[var(--color-carbon)] via-[var(--color-grafito)] to-[var(--color-carbon)] overflow-hidden select-none ${className}`}
    >
      {/* Patrón sutil técnico de cuadrícula fina (01-concepto-y-marca) */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--color-plata) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Halo de luz cálido técnico */}
      <div className="absolute w-96 h-96 rounded-full bg-[var(--color-oro)]/5 blur-3xl pointer-events-none" />

      {/* Contenedor central con icono */}
      <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center max-w-md">
        <div className="p-6 rounded-2xl bg-[var(--color-grafito-2)]/40 border border-[var(--color-grafito-2)] backdrop-blur-sm mb-4 shadow-2xl">
          {renderIcon()}
        </div>

        <span className="text-[11px] font-mono tracking-widest text-[var(--color-oro-claro)] uppercase mb-1">
          {process}
        </span>

        <span className="text-[10px] font-mono text-[var(--color-gris)] px-2.5 py-0.5 rounded border border-[var(--color-grafito-2)] bg-[var(--color-carbon)]/80 uppercase">
          FOTO DEL TALLER: PLACEHOLDER TEMPORAL
        </span>
      </div>

      {/* Regla de escala milimétrica decorativa en la base */}
      <div className="absolute bottom-6 left-8 right-8 flex items-center justify-between text-[10px] font-mono text-[var(--color-gris)]/40 border-t border-[var(--color-grafito-2)] pt-2 pointer-events-none">
        <span>ZONA_ESAB // REF_{sceneId.toUpperCase()}</span>
        <span>MAQSYMA AREQUIPA</span>
      </div>
    </div>
  );
};
