# MAQSYMA - Guía de Operaciones y Mantenimiento

Sitio web oficial de **Maqsyma** (Maquinaria, Sistemas y Materiales Avanzados), distribuidor autorizado de equipos de soldadura **ESAB** en Arequipa, Perú.

Desarrollado con **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4** y **Supabase**.

---

## 1. Cómo agregar un nuevo equipo al catálogo

1. Ingrese a la ruta `/admin` en su navegador.
2. Inicie sesión con su usuario y contraseña autorizados.
3. Vaya a **Equipos** (`/admin/productos`) y pulse el botón **+ Nuevo Equipo**.
4. Complete los campos obligatorios:
   - Nombre comercial y modelo técnico ESAB.
   - Proceso / familia (MIG/MAG, TIG, MMA, Plasma, Accesorios).
   - Descripción corta (máx. 120 caracteres).
   - Condiciones comerciales (Venta y/o Alquiler con precios en S/).
5. Active la casilla **Visible en la web pública** y pulse **Guardar Equipo**.

---

## 2. Cómo modificar un precio o especificación

1. En `/admin/productos`, localice el equipo mediante el buscador o el filtro de familias.
2. Haga clic en **Editar**.
3. Ajuste los precios de venta o alquiler y pulse **Actualizar Cambios**.
4. La web pública se actualiza automáticamente.

---

## 3. Cómo reordenar los rankings destacados

El sitio presenta tres secciones en la página principal: **Más vendidos**, **Mejor valorados** y **Nuevos modelos**.

1. Ingrese a `/admin/rankings`.
2. En cada columna, utilice los botones **▲** (subir) y **▼** (bajar) para ordenar las prioridades (posiciones 1 a 6).
3. Puede desvincular un equipo de un ranking con **✕** sin borrarlo del catálogo general.
4. Pulse **Guardar Rankings**.

---

## 4. Cómo actualizar el número oficial de WhatsApp

El número de WhatsApp es el único canal oficial de cotización y ventas.

1. Abra el archivo `src/content/copy.es.ts`.
2. Modifique la propiedad `whatsappNumber` en `copy.contact`:
   ```ts
   whatsappNumber: "51XXXXXXXXX", // formato internacional Perú
   ```
3. O defina la variable de entorno en su panel de Vercel:
   `NEXT_PUBLIC_WHATSAPP_NUMBER=51XXXXXXXXX`.

---

## 5. Reemplazo de Placeholders por Fotografías Reales del Taller

1. Guarde las fotografías de cada área del taller en `public/scenes/` en formato WebP optimizado (versión desktop de 1920px y versión mobile de 900px).
2. En `src/config/scenes.ts`, actualice las rutas y cambie la bandera a `placeholder: false`.
3. Para los equipos, cargue la imagen desde el panel en `/admin/productos` o colóquela en Supabase Storage (`productos/{slug}/...`).

---

## 6. Variables de Entorno de Producción (Vercel)

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase (ej. `https://xxxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública segura para lectura pública |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave privada de servicio (solo servidor) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número oficial de WhatsApp en formato `51XXXXXXXXX` |
| `NEXT_PUBLIC_SITE_URL` | URL del dominio de producción (ej. `https://maqsyma.com`) |
