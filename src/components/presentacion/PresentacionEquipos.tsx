import React, { Suspense } from "react";
import { getSeccion } from "@/lib/datos/destacados";
import { SeccionEquipos } from "./SeccionEquipos";
import { copy } from "@/content/copy.es";

export const revalidate = 300;

function SeccionSkeleton() {
  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-6">
      <div className="mb-8 space-y-2">
        <div className="h-4 w-24 rounded bg-[var(--color-grafito-2)] animate-pulse" />
        <div className="h-10 w-48 rounded bg-[var(--color-grafito-2)] animate-pulse" />
        <div className="h-4 w-72 rounded bg-[var(--color-grafito-2)] animate-pulse" />
      </div>
      <div className="flex gap-5 md:grid md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="shrink-0 w-[78vw] md:w-auto h-[380px] rounded-[14px] bg-[var(--color-grafito)] border border-[var(--color-grafito-2)] animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

async function MasVendidos() {
  const equipos = await getSeccion("mas_vendidos");
  return (
    <SeccionEquipos
      id="mas-vendidos"
      titulo={copy.sections.bestSellers.title}
      frase="Los equipos que más eligen nuestros clientes para trabajar cada día."
      equipos={equipos}
      etiqueta="mas_vendido"
    />
  );
}

async function MejorValorados() {
  const equipos = await getSeccion("mejor_valorados");
  return (
    <SeccionEquipos
      id="mejor-valorados"
      titulo={copy.sections.topRated.title}
      frase="Lo que dicen quienes ya los usan en su taller o en obra."
      equipos={equipos}
      etiqueta="mejor_valorado"
    />
  );
}

async function NuevosModelos() {
  const equipos = await getSeccion("nuevos");
  return (
    <SeccionEquipos
      id="nuevos"
      titulo={copy.sections.newModels.title}
      frase="Lo último en ESAB, disponible para venta y alquiler."
      equipos={equipos}
      etiqueta="nuevo"
    />
  );
}

export const PresentacionEquipos: React.FC = () => {
  return (
    <div id="equipos" className="relative w-full bg-[var(--color-carbon)]">
      <Suspense fallback={<SeccionSkeleton />}>
        <MasVendidos />
      </Suspense>

      <div className="max-w-7xl mx-auto px-6">
        <hr className="border-[var(--color-grafito-2)]" />
      </div>

      <Suspense fallback={<SeccionSkeleton />}>
        <MejorValorados />
      </Suspense>

      <div className="max-w-7xl mx-auto px-6">
        <hr className="border-[var(--color-grafito-2)]" />
      </div>

      <Suspense fallback={<SeccionSkeleton />}>
        <NuevosModelos />
      </Suspense>
    </div>
  );
};
