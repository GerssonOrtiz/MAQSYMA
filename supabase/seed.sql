-- ====================================================================
-- SEED DE DATOS DEMO PARA MAQSYMA
-- Conforme a 00-LEEME.md y 04-admin-y-datos.md
-- Todo equipo está marcado estrictamente como `es_demo = true`.
-- ====================================================================

-- Limpiar datos demo previos si existen
delete from productos where es_demo = true;

-- Inserción de equipos ESAB con datos marcados como DEMO
insert into productos (
  id, slug, nombre, modelo, marca, familia, descripcion_corta,
  especificaciones, precio_venta, disponible_venta, precio_alquiler,
  unidad_alquiler, disponible_alquiler, valoracion, num_resenas,
  es_demo, activo
) values
(
  'a1111111-1111-1111-1111-111111111111',
  'demo-warrior-500i',
  'DEMO Warrior 500i CC/CV',
  'WARRIOR-500I',
  'ESAB',
  'MIG_MAG',
  'Potencia multiproceso industrial para calderería pesada y alta productividad continua.',
  '{"amperajeMax": "500 A", "voltaje": "380-460V", "ciclo": "500A @ 60%", "peso": "52 kg"}'::jsonb,
  24500.00,
  true,
  1850.00,
  'mes',
  true,
  4.9,
  24,
  true,
  true
),
(
  'b2222222-2222-2222-2222-222222222222',
  'demo-rebel-emp-215ic',
  'DEMO Rebel EMP 215ic',
  'REBEL-EMP-215IC',
  'ESAB',
  'MIG_MAG',
  'Equipo multiproceso compacto con tecnología sMIG para inicio de arco inteligente.',
  '{"amperajeMax": "240 A", "voltaje": "120/230V", "ciclo": "205A @ 25%", "peso": "18.2 kg"}'::jsonb,
  11200.00,
  true,
  850.00,
  'mes',
  true,
  4.8,
  31,
  true,
  true
),
(
  'c3333333-3333-3333-3333-333333333333',
  'demo-bantam-250i',
  'DEMO Bantam 250i',
  'BANTAM-250I',
  'ESAB',
  'MMA',
  'Inversor robusto para electrodo revestido con arco estable en celulósicos 6010.',
  '{"amperajeMax": "250 A", "voltaje": "220V", "ciclo": "250A @ 30%", "peso": "8.5 kg"}'::jsonb,
  3450.00,
  true,
  320.00,
  'semana',
  true,
  4.7,
  19,
  true,
  true
),
(
  'd4444444-4444-4444-4444-444444444444',
  'demo-renegade-et-300ip',
  'DEMO Renegade ET 300iP',
  'RENEGADE-ET300IP',
  'ESAB',
  'TIG',
  'Alta frecuencia TIG pulsado con control milimétrico de calor en inoxidables y aleaciones.',
  '{"amperajeMax": "300 A", "voltaje": "230-480V", "ciclo": "300A @ 40%", "peso": "16.9 kg"}'::jsonb,
  18900.00,
  true,
  1450.00,
  'mes',
  true,
  5.0,
  18,
  true,
  true
),
(
  'e5555555-5555-5555-5555-555555555555',
  'demo-aristo-500ix',
  'DEMO Aristo 500ix Pulso',
  'ARISTO-500IX',
  'ESAB',
  'MIG_MAG',
  'Fuente inversora pulsada de servicio pesado con sinergia para aluminio y acero.',
  '{"amperajeMax": "500 A", "voltaje": "380-460V", "ciclo": "500A @ 60%", "peso": "58 kg"}'::jsonb,
  32000.00,
  true,
  2400.00,
  'mes',
  true,
  4.9,
  15,
  true,
  true
),
(
  'f6666666-6666-6666-6666-666666666666',
  'demo-cutmaster-40plus',
  'DEMO Cutmaster 40+',
  'CUTMASTER-40PLUS',
  'ESAB',
  'PLASMA',
  'Corte por plasma de nueva generación con pantalla TFT industrial y corte recomendado 12mm.',
  '{"amperajeMax": "40 A", "voltaje": "110-240V", "ciclo": "40A @ 40%", "peso": "11 kg"}'::jsonb,
  9800.00,
  true,
  900.00,
  'mes',
  true,
  4.9,
  7,
  true,
  true
);

-- Inserción de destacados por sección
delete from destacados;

-- 1. Más vendidos
insert into destacados (seccion, producto_id, posicion) values
('mas_vendidos', 'a1111111-1111-1111-1111-111111111111', 1),
('mas_vendidos', 'b2222222-2222-2222-2222-222222222222', 2),
('mas_vendidos', 'c3333333-3333-3333-3333-333333333333', 3);

-- 2. Mejor valorados
insert into destacados (seccion, producto_id, posicion) values
('mejor_valorados', 'd4444444-4444-4444-4444-444444444444', 1),
('mejor_valorados', 'e5555555-5555-5555-5555-555555555555', 2),
('mejor_valorados', 'a1111111-1111-1111-1111-111111111111', 3);

-- 3. Nuevos
insert into destacados (seccion, producto_id, posicion) values
('nuevos', 'f6666666-6666-6666-6666-666666666666', 1),
('nuevos', 'b2222222-2222-2222-2222-222222222222', 2);
