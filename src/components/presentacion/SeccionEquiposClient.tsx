"use client";

import React, { useEffect, useRef, useState } from "react";
import { Equipo, EtiquetaDestacado } from "@/types/equipo";
import { TarjetaEquipo } from "./TarjetaEquipo";

interface SeccionEquiposClientProps {
  equipos: Equipo[];
  etiqueta: EtiquetaDestacado;
}

export const SeccionEquiposClient: React.FC<SeccionEquiposClientProps> = ({
  equipos,
  etiqueta,
}) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Si el usuario prefiere movimiento reducido, mostrar inmediatamente
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <ul
      ref={containerRef}
      className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden"
    >
      {equipos.slice(0, 6).map((equipo, index) => {
        const delayMs = index * 60;
        return (
          <li
            key={equipo.id}
            className="snap-start shrink-0 w-[78vw] sm:w-[48vw] md:w-auto list-none transition-all duration-500 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(16px)",
              transitionDelay: `${delayMs}ms`,
            }}
          >
            <TarjetaEquipo equipo={equipo} etiqueta={etiqueta} />
          </li>
        );
      })}
    </ul>
  );
};
