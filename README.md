# MAQSYMA — Guía de Desarrollo y Mantenimiento

**MAQSYMA** es un catálogo web de maquinaria de construcción orientado al mercado peruano. Permite mostrar equipos con fichas técnicas, comparar modelos, y contactar al vendedor vía WhatsApp. El panel de administración (`/admin`) permite gestionar el catálogo completo sin tocar el código fuente.

---

## Stack tecnológico

| Tecnología | Versión / Rol |
|---|---|
| **Next.js** | 16 — App Router, SSR/SSG |
| **TypeScript** | 5 — tipado estático |
| **Tailwind CSS** | v4 — estilos utilitarios |
| **Supabase** | Base de datos PostgreSQL + Storage + Auth |
| **Vercel** | Hosting y despliegue continuo |
| **Cloudflare** | DNS y proxy CDN |

---

## Inicio rápido

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/maqsyma.git
cd maqsyma/maqsyma-app

# 2. Copiar plantilla de variables de entorno
cp .env.example .env.local

# 3. Editar .env.local con tus credenciales reales
#    (ver sección "Variables de entorno" más abajo)

# 4. Instalar dependencias
npm install

# 5. Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

---

## Variables de entorno

Todas las variables se definen en `.env.local` (desarrollo) o en Vercel → Settings → Environment Variables (producción). **Nunca subas `.env.local` al repositorio.**

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL pública del proyecto Supabase. Se obtiene en Project Settings → API. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anónima de Supabase. Se usa en el cliente del navegador; es segura para exponerse. |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave de rol de servicio. **Solo para el servidor.** Tiene acceso total a la base de datos; nunca la expongas en el navegador ni en commits. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número de WhatsApp del vendedor. Formato: código de país + número sin espacios (ej. `51987654321`). |
| `NEXT_PUBLIC_SITE_URL` | URL canónica del sitio. Se usa para SEO, sitemap y etiquetas Open Graph. En producción usa `https://maqsyma.com` o la URL de Vercel. |

---

## Configuración de Supabase

### 1. Crear el proyecto

1. Ir a [supabase.com](https://supabase.com) → **New project**.
2. Seleccionar organización y elegir la región **South America (São Paulo)** para menor latencia desde Perú.
3. Anotar la URL y las claves en tu `.env.local`.

### 2. Crear el esquema de base de datos

En el SQL Editor de Supabase, ejecutar el archivo de esquema del proyecto:

```sql
-- Desde el panel: SQL Editor → New query → pegar contenido de supabase/schema.sql
```

O usar la CLI:

```bash
supabase db push
```

### 3. Crear el usuario administrador

1. Ir a **Authentication → Users → Invite user** (o Add user).
2. Ingresar el correo y contraseña del administrador.
3. Copiar el **UUID** del usuario recién creado.

### 4. Insertar el perfil de admin

En el SQL Editor, ejecutar:

```sql
INSERT INTO profiles (id, role)
VALUES ('<UUID_DEL_USUARIO>', 'admin');
```

Reemplaza `<UUID_DEL_USUARIO>` con el UUID copiado en el paso anterior.

### 5. Crear el bucket de Storage

1. Ir a **Storage → New bucket**.
2. Nombre: `productos`.
3. Marcar **Public bucket** (lectura pública para las imágenes del catálogo).
4. Guardar.

---

## Gestión del catálogo (sin tocar código)

Todo el mantenimiento del catálogo se hace desde el panel de administración `/admin`. Solo se necesita el navegador.

### Agregar un equipo

1. Ir a `/admin/productos/nuevo`.
2. Completar nombre, categoría, precio, descripción y subir imagen.
3. Guardar.

### Editar precio u otros datos

1. Ir a `/admin/productos`.
2. Hacer clic en el botón **Editar** del equipo correspondiente.
3. Modificar los campos necesarios y guardar.

### Reordenar el ranking de equipos

1. Ir a `/admin/rankings`.
2. Usar los botones **▲** y **▼** para cambiar el orden de los equipos.
3. Hacer clic en **Guardar Rankings** para confirmar.

### Ocultar un equipo (sin borrarlo)

1. Ir a `/admin/productos`.
2. En la columna **Estado**, hacer clic en el botón **Activo** para ocultarlo (cambia a **Oculto**).
3. Hacer clic en **Oculto** para volver a activarlo.

Los equipos ocultos no aparecen en el catálogo público pero conservan todos sus datos.

### Borrar los datos DEMO antes del lanzamiento

> [!CAUTION]
> Esta acción es irreversible. Hacerla solo una vez, justo antes del lanzamiento real.

1. Ir a `/admin/productos`.
2. Hacer clic en el botón **Borrar Datos DEMO**.
3. Confirmar la acción en el diálogo.

---

## Actualizar número de WhatsApp

No es necesario modificar código ni hacer un nuevo despliegue. Solo actualizar la variable de entorno en Vercel:

1. Ir a [vercel.com](https://vercel.com) → tu proyecto → **Settings → Environment Variables**.
2. Buscar `NEXT_PUBLIC_WHATSAPP_NUMBER` y hacer clic en **Edit**.
3. Cambiar el valor al nuevo número (formato: `51XXXXXXXXX`).
4. Guardar. Vercel redesplegará automáticamente con el nuevo valor.

---

## Reemplazar placeholders con fotos reales

Las escenas del sitio (fondos de hero, secciones, etc.) se configuran en:

```
src/config/scenes.ts
```

Para cada escena, cambiar las rutas de imagen y marcar `placeholder: false`:

```ts
// Antes (placeholder)
{
  id: "excavadora-hero",
  desktop: "/scenes/placeholder-desktop.webp",
  mobile: "/scenes/placeholder-mobile.webp",
  placeholder: true,
}

// Después (foto real)
{
  id: "excavadora-hero",
  desktop: "/scenes/excavadora-hero-desktop.webp",
  mobile: "/scenes/excavadora-hero-mobile.webp",
  placeholder: false,
}
```

**Dónde subir las imágenes:**

- **Supabase Storage:** bucket `productos` → subcarpeta `scenes/`. Usar la URL pública generada como valor de `desktop` / `mobile`.
- **Carpeta pública local:** `public/scenes/` en el repositorio. Las rutas empiezan en `/scenes/nombre-archivo.webp`.

> [!TIP]
> Usar formato **WebP** para mejor rendimiento. Dimensiones recomendadas: 1920×1080 px (desktop) y 768×1024 px (mobile).

---

## Despliegue en Vercel

```bash
# Asegurarse de que los cambios están en la rama main
git add .
git commit -m "feat: descripción del cambio"
git push origin main
```

Vercel detecta automáticamente que es un proyecto Next.js y despliega sin configuración adicional.

**Primera vez (configuración inicial):**

1. Ir a [vercel.com](https://vercel.com) → **Add New → Project**.
2. Importar el repositorio de GitHub.
3. Ir a **Settings → Environment Variables** y agregar todas las variables del `.env.example` con sus valores reales.
4. Hacer clic en **Deploy**.

Cada push a la rama `main` despliega automáticamente en producción.

---

## Dominio personalizado con Cloudflare

### En Vercel

1. Ir al proyecto → **Settings → Domains**.
2. Agregar `maqsyma.com` y `www.maqsyma.com`.
3. Vercel mostrará los registros DNS necesarios.

### En Cloudflare

1. Agregar el dominio a Cloudflare y actualizar los nameservers en el registrador.
2. Crear los registros DNS que indica Vercel (tipo `CNAME` o `A`).
3. Durante la verificación del SSL, dejar el proxy de Cloudflare en **"nube gris"** (DNS only) para que Vercel pueda emitir el certificado.
4. Una vez verificado el SSL en Vercel, activar el proxy en **"nube naranja"** con modo **Full (strict)**.

> [!NOTE]
> Con Full (strict), el tráfico entre Cloudflare y Vercel también va cifrado. Es la configuración más segura.

---

## Mantenimiento trimestral

Realizar estas tareas cada tres meses para mantener el proyecto en buen estado:

- **Auditoría de seguridad de dependencias:**
  ```bash
  npm audit
  # Corregir vulnerabilidades con:
  npm audit fix
  ```

- **Revisión de rendimiento con Lighthouse:**
  Abrir Chrome DevTools → Lighthouse → analizar en **mobile**.
  Metas mínimas: Rendimiento ≥ 80 · Accesibilidad ≥ 90.

- **Revisar enlaces rotos:**
  Usar herramientas como [deadlinkchecker.com](https://www.deadlinkchecker.com) para verificar que todos los enlaces del sitio funcionan correctamente.

- **Backup de Supabase:**
  Ir al panel de Supabase → **Project Settings → Database → Backups**.
  Descargar el backup más reciente o activar backups automáticos si el plan lo permite.
