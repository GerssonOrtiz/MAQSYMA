import React from "react";
import Image from "next/image";
import { copy } from "@/content/copy.es";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  showText?: boolean;
}

/**
 * Componente oficial de Logo de Maqsyma
 * Usa el logotipo oficial PNG con fondo transparente.
 * Contenedor oscuro de respaldo garantiza visibilidad en cualquier superficie.
 */
export const Logo: React.FC<LogoProps> = ({
  className = "",
  width = 200,
  height = 60,
  showText = false,
}) => {
  return (
    <div
      className={`inline-flex items-center gap-3 transition-transform duration-200 hover:scale-[1.02] ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <Image
          src="/brand/logo-maqsyma-nuevo.png"
          alt="MAQSYMA — Maquinaria, Sistemas y Materiales Avanzados"
          width={width}
          height={height}
          priority
          className="h-10 w-auto object-contain drop-shadow-[0_1px_6px_rgba(201,162,74,0.15)]"
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-['Montserrat',sans-serif] text-xs tracking-wide text-[var(--color-gris)]">
            {copy.brand.tagline}
          </span>
        </div>
      )}
    </div>
  );
};
