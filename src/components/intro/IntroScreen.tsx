"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const SESSION_KEY = "maqsyma_intro_seen";

/**
 * IntroScreen — Pantalla de bienvenida que se muestra SOLO en la primera
 * carga de la sesión. Usa sessionStorage para no repetirse al navegar
 * entre páginas o hacer refresh (el comportamiento puede ajustarse a
 * localStorage si se quiere que sea una sola vez por dispositivo).
 *
 * Fases de animación:
 *  0 → negro puro (bloquea el render de la app)
 *  1 → logo aparece con fade-in + ligero scale-up  (~800ms)
 *  2 → pausa con logo visible                      (~1 200ms)
 *  3 → overlay hace fade-out completo               (~700ms)
 *  done → componente se desmonta y la app es visible
 */
export const IntroScreen: React.FC = () => {
  // null = aún no sabemos (evita flash), false = no mostrar, true = mostrar
  const [visible, setVisible] = useState<boolean | null>(null);
  const [phase, setPhase] = useState<"logo-in" | "hold" | "fade-out" | "done">(
    "logo-in"
  );

  useEffect(() => {
    // SSR guard
    if (typeof window === "undefined") return;

    const seen = sessionStorage.getItem(SESSION_KEY);
    if (seen) {
      setVisible(false);
      return;
    }

    // Primera vez: marcar y ejecutar secuencia
    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(true);

    // Secuencia de fases
    const t1 = setTimeout(() => setPhase("hold"), 800);        // logo termina de entrar
    const t2 = setTimeout(() => setPhase("fade-out"), 2000);   // pausa visible
    const t3 = setTimeout(() => setPhase("done"), 2750);       // overlay desaparece

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Todavía calculando o ya visto → no renderizar nada
  if (visible === null || visible === false || phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0D0E10",
        // Fade-out del overlay completo
        opacity: phase === "fade-out" ? 0 : 1,
        transition: phase === "fade-out" ? "opacity 750ms cubic-bezier(0.4, 0, 0.2, 1)" : "none",
        pointerEvents: "all",
      }}
    >
      {/* Luz ambiental de fondo — sutil halo dorado */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "480px",
          height: "240px",
          background: "radial-gradient(ellipse, rgba(201,162,74,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Contenedor del logo */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          opacity: phase === "logo-in" ? 0 : 1,
          transform: phase === "logo-in" ? "scale(0.92) translateY(8px)" : "scale(1) translateY(0)",
          transition: "opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <Image
          src="/brand/logo-maqsyma-nuevo.png"
          alt="MAQSYMA — Maquinaria, Sistemas y Materiales Avanzados"
          width={260}
          height={80}
          priority
          style={{
            objectFit: "contain",
            width: "auto",
            height: "clamp(56px, 10vw, 88px)",
            filter: "drop-shadow(0 2px 24px rgba(201,162,74,0.22))",
          }}
        />

        {/* Línea decorativa dorada + tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, #C9A24A, transparent)",
            }}
          />
          <span
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#8A8F98",
              fontWeight: 500,
            }}
          >
            Equipos ESAB · Arequipa, Perú
          </span>
        </div>
      </div>
    </div>
  );
};
