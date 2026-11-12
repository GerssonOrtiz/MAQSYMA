import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  showText?: boolean;
}

/**
 * Componente oficial de Logo de Maqsyma
 * Cumple regla 01: Contenedor de fondo oscuro sólido de respaldo para evitar cualquier
 * visualización de artefactos o fondos imprevistos.
 */
export const Logo: React.FC<LogoProps> = ({
  className = "",
  width = 160,
  height = 48,
  showText = false,
}) => {
  return (
    <div
      className={`inline-flex items-center gap-3 bg-[var(--color-carbon)] rounded-md px-2 py-1.5 transition-transform duration-200 hover:scale-[1.02] ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <Image
          src="/brand/logo-maqsyma.png"
          alt="MAQSYMA Logo"
          width={width}
          height={height}
          priority
          className="h-9 w-auto object-contain"
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-['Montserrat',sans-serif] text-sm font-extrabold tracking-wider text-[var(--color-plata)]">
            MAQSYMA
          </span>
          <span className="text-[10px] tracking-wide text-[var(--color-gris)]">
            ESAB Welding Solutions
          </span>
        </div>
      )}
    </div>
  );
};
