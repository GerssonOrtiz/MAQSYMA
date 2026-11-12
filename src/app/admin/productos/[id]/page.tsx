import React, { Suspense } from "react";
import AdminEditarProductoClient from "./AdminEditarProductoClient";

export default function AdminEditarProductoPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center p-12 text-xs text-[var(--color-gris)]">
          Cargando datos del equipo...
        </div>
      }
    >
      <AdminEditarProductoClient />
    </Suspense>
  );
}
