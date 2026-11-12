-- ====================================================================
-- ESQUEMA COMPLETO DE BASE DE DATOS Y RLS PARA MAQSYMA
-- Conforme a 04-admin-y-datos.md
-- ====================================================================

-- 1. Tabla de productos
create table if not exists productos (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nombre text not null,
  modelo text,
  marca text not null default 'ESAB',
  familia text not null check (familia in ('MIG_MAG','TIG','MMA','PLASMA','ACCESORIOS')),
  descripcion_corta text,
  especificaciones jsonb not null default '{}'::jsonb,
  imagen_url text,
  precio_venta numeric(10,2),
  disponible_venta boolean not null default true,
  precio_alquiler numeric(10,2),
  unidad_alquiler text not null default 'día' check (unidad_alquiler in ('día','semana','mes')),
  disponible_alquiler boolean not null default false,
  valoracion numeric(2,1) not null default 0 check (valoracion between 0 and 5),
  num_resenas integer not null default 0 check (num_resenas >= 0),
  fecha_lanzamiento date,
  es_demo boolean not null default false,
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Tabla de rankings / destacados
create table if not exists destacados (
  seccion text not null check (seccion in ('mas_vendidos','mejor_valorados','nuevos')),
  producto_id uuid not null references productos(id) on delete cascade,
  posicion integer not null check (posicion >= 1),
  primary key (seccion, producto_id)
);

-- 3. Tabla de perfiles con roles autorizados
create table if not exists perfiles (
  id uuid primary key references auth.users(id) on delete cascade,
  rol text not null default 'editor' check (rol in ('admin','editor'))
);

-- 4. Activación de Row Level Security (RLS)
alter table productos enable row level security;
alter table destacados enable row level security;
alter table perfiles enable row level security;

-- Políticas de lectura pública para la web pública
drop policy if exists "lectura publica de productos activos" on productos;
create policy "lectura publica de productos activos"
  on productos for select using (activo = true);

drop policy if exists "lectura publica de destacados" on destacados;
create policy "lectura publica de destacados"
  on destacados for select using (true);

-- Políticas de edición restringidas a usuarios con perfil de rol autenticado
drop policy if exists "editores escriben productos" on productos;
create policy "editores escriben productos"
  on productos for all to authenticated
  using (exists (select 1 from perfiles p where p.id = auth.uid()))
  with check (exists (select 1 from perfiles p where p.id = auth.uid()));

drop policy if exists "editores escriben destacados" on destacados;
create policy "editores escriben destacados"
  on destacados for all to authenticated
  using (exists (select 1 from perfiles p where p.id = auth.uid()))
  with check (exists (select 1 from perfiles p where p.id = auth.uid()));

drop policy if exists "ver mi perfil" on perfiles;
create policy "ver mi perfil"
  on perfiles for select to authenticated
  using (id = auth.uid());
