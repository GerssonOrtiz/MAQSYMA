"use client";

import React, { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error capturado en boundary de Next.js:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--color-carbon)] text-[var(--color-plata)] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <h1 className="text-2xl font-bold font-['Montserrat',sans-serif] text-[var(--color-plata)]">
        Ocurrió un inconveniente temporal
      </h1>
      <p className="text-xs text-[var(--color-gris)] max-w-sm leading-relaxed">
        Estamos optimizando los recursos. Puede intentar recargar la vista o contactar a un asesor técnico por WhatsApp.
      </p>
      <div className="pt-2 flex gap-3">
        <button
          onClick={() => reset()}
          className="px-4 py-2 rounded bg-[var(--color-grafito-2)] border border-[var(--color-oro)]/40 text-xs font-bold text-[var(--color-plata)] hover:border-[var(--color-oro)]"
        >
          Reintentar
        </button>
        <a
          href="/"
          className="px-4 py-2 rounded bg-[var(--color-oro)] text-xs font-bold text-[var(--color-carbon)] hover:bg-[var(--color-oro-claro)]"
        >
          Volver al catálogo
        </a>
      </div>
    </div>
  );
}
