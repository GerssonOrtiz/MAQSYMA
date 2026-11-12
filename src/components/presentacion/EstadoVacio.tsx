import React from "react";
import { whatsappLink } from "@/lib/whatsapp";

interface EstadoVacioProps {
  tituloSeccion: string;
}

export const EstadoVacio: React.FC<EstadoVacioProps> = ({ tituloSeccion }) => {
  const whatsappHref = whatsappLink(
    `Hola Maqsyma, deseo consultar sobre la disponibilidad de equipos para la sección "${tituloSeccion}".`
  );

  return (
    <div className="w-full p-8 md:p-12 rounded-2xl bg-[var(--color-grafito)] border border-[var(--color-grafito-2)] text-center max-w-xl mx-auto flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 rounded-full bg-[var(--color-grafito-2)] flex items-center justify-center text-[var(--color-oro)] text-xl">
        ⚙
      </div>
      <div className="space-y-1">
        <h4 className="font-['Montserrat',sans-serif] text-lg font-bold text-[var(--color-plata)]">
          Pronto publicaremos equipos en esta sección
        </h4>
        <p className="text-xs sm:text-sm text-[var(--color-gris)]">
          Estamos actualizando nuestro catálogo oficial de equipos ESAB para entrega en Arequipa.
        </p>
      </div>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-md bg-[var(--color-grafito-2)] border border-[var(--color-oro)]/50 px-5 py-2.5 text-xs font-bold text-[var(--color-plata)] hover:bg-[var(--color-oro)] hover:text-[var(--color-carbon)] transition-all duration-200 active:scale-95"
      >
        <span>Consultar disponibilidad inmediata por WhatsApp</span>
        <span>→</span>
      </a>
    </div>
  );
};
