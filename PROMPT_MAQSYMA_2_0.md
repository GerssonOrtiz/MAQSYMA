# PROMPT MAESTRO --- Rediseño MAQSYMA 2.0

## Rol

Actúa como **arquitecto de software, desarrollador senior full-stack y
director de arte digital especializado en sitios web industriales
premium**. Tu tarea es ejecutar el rediseño de MAQSYMA directamente
sobre el repositorio existente, no crear una maqueta aislada ni
reemplazar el proyecto por una plantilla genérica.

Trabaja con criterio técnico, conserva las funcionalidades que ya sirven
y realiza cambios reales en el código. No te limites a entregar
recomendaciones.

## 1. Contexto del proyecto

-   **Proyecto:** MAQSYMA
-   **Repositorio:** `GerssonOrtiz/MAQSYMA`
-   **Rama base:** `main`
-   **Sitio actual:** https://maqsyma-app.vercel.app/
-   **Actividad:** venta y alquiler de máquinas de soldadura y corte,
    accesorios, consumibles y equipos de protección.
-   **Ubicación comercial:** Arequipa, Perú.
-   **Marca destacada:** ESAB, sin limitar el catálogo a una sola marca.
-   **Contacto comercial documentado:** WhatsApp 907 438 497. Verifica
    el dato en el repositorio antes de publicarlo.

La web debe comunicar capacidad técnica, variedad de soluciones,
confianza y calidad industrial. Debe facilitar que un cliente encuentre
un equipo, consulte disponibilidad o solicite asesoría por WhatsApp.

## 2. Objetivo del rediseño

Transformar la web actual en una experiencia **industrial,
cinematográfica, moderna, premium y comercialmente clara**.

La web no debe parecer: - Una plantilla ecommerce genérica. - Un
catálogo interminable de tarjetas. - Una landing page que solo muestra
videos y efectos visuales. - Una página que presenta datos de
demostración como si fueran información comercial real.

Debe combinar una identidad visual potente con una navegación sencilla y
una arquitectura de catálogo que pueda crecer.

### Dirección visual

-   Fondo principal: negro carbón / grafito / obsidiana.
-   Colores de acento: amarillo industrial y dorado.
-   Colores secundarios: plata metálica y blanco.
-   Iluminación visual: contrastes controlados, reflejos metálicos y luz
    industrial fría.
-   Fotografía: equipos reales, talleres industriales, soldadura, corte,
    chispas y detalles técnicos.
-   Tipografía: contundente y legible, con jerarquía editorial.
-   Composición: espacios amplios, secciones con ritmo visual, imágenes
    de alta calidad y animaciones discretas.
-   Evita saturar toda la web con amarillo, brillos, bordes luminosos o
    animaciones.

El resultado debe sentirse como la web de una empresa industrial
especializada, no como una página de videojuegos o una demo tecnológica.

## 3. Antes de modificar: auditoría obligatoria

Primero inspecciona el repositorio completo y entiende su arquitectura.

Revisa como mínimo: - `README.md`, `package.json` y archivos de
configuración. - `AGENTS.md` y cualquier instrucción local existente. -
`src/app/page.tsx`, `src/app/layout.tsx` y `src/app/globals.css`. -
Componentes de navegación, hero, escenas/taller, catálogo, tarjetas,
contacto y footer. - `src/config/scenes.ts` y
`src/content/copy.es.ts`. - `src/data/equiposDemo.ts`,
`src/lib/datos/destacados.ts` y tipos de producto. - Rutas dinámicas de
detalle de equipos, especialmente `src/app/equipos/[slug]/page.tsx`. -
Esquema SQL, políticas RLS y cualquier integración con Supabase. -
Carpeta `maqsyma_bundle/docs/`, especialmente `CATALOGO.md`,
`CATEGORIAS.md`, `INFORMACION_COMERCIAL.md`, `FOTOGRAFIAS.md` e
`INTEGRACION.md`.

Después de la auditoría: 1. Resume brevemente la arquitectura y los
problemas encontrados. 2. Define un plan de implementación por etapas.
3. Ejecuta el plan sin esperar aprobación para cambios visuales y
técnicos de bajo riesgo. 4. Si encuentras una decisión que pueda borrar
datos, cambiar permisos de seguridad, modificar credenciales o afectar
producción, detente y solicita autorización.

No asumas que los documentos del bundle están actualizados. Contrasta
los datos entre sí y con el código.

## 4. Arquitectura de información deseada

Reorganiza la experiencia para que el visitante entienda rápidamente qué
ofrece MAQSYMA.

### Navegación principal

Prioriza una navegación clara, adaptable a móvil:

-   Inicio
-   Productos
-   Marcas
-   Venta y alquiler
-   Servicio técnico
-   Nosotros
-   Contacto

Puedes adaptar las etiquetas si el contenido existente lo justifica. Los
enlaces deben funcionar y llevar a secciones o páginas reales. No dejes
enlaces `#` vacíos ni rutas inexistentes.

En escritorio, considera un menú desplegable o mega menú para las
categorías de productos, siempre que mejore la navegación. En móvil,
utiliza un menú accesible y fácil de cerrar.

### Home propuesta

Construye la página de inicio con este orden conceptual. Ajusta el orden
si la arquitectura actual exige una solución mejor, pero conserva todos
los objetivos:

1.  **Hero cinematográfico**
    -   Video o imagen industrial de alta calidad.
    -   Mensaje principal claro: equipos y soluciones para soldadura y
        corte.
    -   CTA primario: explorar productos.
    -   CTA secundario: consultar por WhatsApp.
    -   No sacrifiques legibilidad por el video.
    -   Añade una alternativa estática y optimizada para móvil o
        conexiones lentas.
2.  **Acceso rápido a categorías**
    -   Máquinas de soldar.
    -   Equipos de corte y plasma.
    -   Caretas y protección personal.
    -   Antorchas y alimentadores.
    -   Accesorios y consumibles.
    -   Alquiler de equipos.
    -   Cada categoría debe llevar a un listado o filtro funcional.
3.  **Productos destacados por categoría**
    -   Presenta una selección breve, idealmente hasta tres productos
        por categoría cuando existan suficientes productos reales.
    -   Añade un enlace "Ver todos".
    -   Evita organizar toda la oferta únicamente en "Más vendidos",
        "Mejor valorados" y "Nuevos" si esos rankings no tienen datos
        reales verificables.
    -   No inventes valoraciones, ventas, popularidad ni reseñas.
4.  **Soluciones por aplicación**
    -   Ejemplos posibles: mantenimiento industrial, estructuras
        metálicas, construcción, minería, talleres y fabricación.
    -   No afirmes que MAQSYMA ha ejecutado proyectos o atendido
        clientes concretos sin evidencia.
    -   Esta sección debe orientar al visitante hacia equipos o procesos
        adecuados.
5.  **Marcas**
    -   Mostrar ESAB y otras marcas únicamente si están respaldadas por
        el catálogo o la información comercial.
    -   No inventar alianzas, certificaciones ni condición de
        distribuidor oficial.
6.  **Venta y alquiler**
    -   Explicar ambas modalidades.
    -   Incluir CTA para consultar disponibilidad y condiciones.
    -   No inventar stock, cobertura, tarifas o plazos.
7.  **Servicio técnico y soporte**
    -   Presentar los servicios que estén documentados.
    -   Diferenciar claramente los servicios confirmados de los que
        estén pendientes de validar.
    -   Añadir CTA de contacto.
8.  **Contacto y footer**
    -   WhatsApp visible.
    -   Datos de ubicación y contacto solo después de verificar los
        documentos del proyecto.
    -   Enlaces funcionales, redes sociales únicamente si existen
        cuentas verificadas.

## 5. Catálogo: ampliar el modelo de datos

La estructura actual parece estar orientada principalmente a máquinas
ESAB y procesos MIG/MAG, TIG, MMA y Plasma. El nuevo catálogo debe poder
representar más tipos de productos sin forzar categorías incorrectas.

Diseña una estructura genérica de producto, por ejemplo:

-   Identificador.
-   Nombre.
-   Slug.
-   Marca.
-   Modelo.
-   Categoría.
-   Subcategoría.
-   Descripción corta.
-   Descripción técnica.
-   Imágenes.
-   Especificaciones.
-   Precio, cuando esté confirmado.
-   Estado de publicación.
-   Disponibilidad, solo si existe un dato real.
-   Modalidad: venta, alquiler o ambas.
-   Indicador interno de datos demo.
-   Fecha de actualización, si aplica.

Categorías iniciales a contemplar: - Máquinas de soldar. - Soldadura
MIG/MAG (GMAW/FCAW). - Soldadura TIG (GTAW). - Soldadura MMA (SMAW). -
Equipos multiproceso. - Soldadura láser. - Motosoldadoras. - Equipos de
corte y plasma. - Alimentadores de alambre. - Caretas y EPP. - Antorchas
y accesorios. - Consumibles y repuestos. - Flujómetros y reguladores. -
Productos anti-spatter y complementos.

No es obligatorio implementar todas las categorías si no hay productos
reales disponibles. Sí debes dejar una arquitectura preparada para
incorporarlas.

### Reglas del catálogo

-   No muestres productos demo como productos reales.
-   No muestres precios demo como precios comerciales.
-   No inventes stock ni disponibilidad.
-   Si un producto no tiene precio verificado, usa "Consultar precio".
-   Si no hay fotografía real confirmada, utiliza un placeholder visual
    elegante y explícito; nunca una imagen de otro equipo presentada
    como si fuera ese producto.
-   No atribuyas características técnicas a un modelo sin fuente.
-   Los filtros deben funcionar con los datos disponibles.
-   Las fichas deben usar el producto correspondiente; nunca mostrar
    silenciosamente el primer producto como fallback para un slug
    desconocido.
-   Si un slug no existe, muestra una página 404 real.
-   Mantén coherencia entre tarjetas, filtros, listado y ficha de
    detalle.

### Datos documentados

El documento `maqsyma_bundle/docs/CATALOGO.md` contiene referencias de
catálogo y precios que fueron recopiladas el 12/11/2026. Deben
considerarse **datos por verificar**, no una fuente comercial
automáticamente vigente.

Entre los precios documentados aparecen: - BANTAM 3.2 --- S/ 420.67. -
HANDY ARC 162i --- S/ 595.19. - BANTAM MIG 130 --- S/ 618.49. - ROGUE ES
201iP PRO --- S/ 1,258.69. - ROGUE ES 245i --- S/ 1,501.06. - HANDYARC
MIG 160i --- S/ 1,764.60. - ROGUE ES 305i --- S/ 2,073.53. - ROGUE EM
210 --- S/ 2,423.08. - ROGUE ET 205iP --- S/ 2,521.39. - RUSTLER EM 215i
--- S/ 3,879.03. - RUSTLER EM 300i --- S/ 6,368.68.

**No publiques estos importes automáticamente.** Comprueba si siguen
vigentes y si la fuente es confiable. Si no puedes verificarlos, deja el
precio como "Consultar precio" y documenta la información pendiente.

## 6. Supabase y seguridad

El proyecto ya contiene integración con Supabase y políticas RLS.

-   No elimines Supabase ni sustituyas la base de datos sin una razón
    técnica demostrable.
-   No cambies credenciales, claves ni variables de entorno.
-   No desactives RLS.
-   No amplíes permisos de escritura de forma indiscriminada.
-   Inspecciona las políticas actuales antes de proponer cambios.
-   Si detectas que cualquier usuario autenticado con perfil puede
    editar productos, documenta el riesgo y propone una solución basada
    en roles/permisos. No cambies políticas de producción sin
    autorización.
-   Filtra correctamente los productos demo en las consultas públicas.
-   Define claramente el comportamiento cuando Supabase no esté
    configurado o no responda. No presentes un catálogo ficticio como
    real en producción.
-   No incluyas secretos en el frontend ni en el repositorio.

## 7. Diseño de componentes y experiencia

Construye componentes reutilizables y consistentes. Evita duplicar
lógica de tarjetas, filtros o botones.

Prioridades: - Jerarquía visual clara. - Diseño responsive real, no solo
reducción de escritorio. - Tarjetas de producto sobrias, con imagen
dominante, nombre, marca/modelo, datos técnicos esenciales y CTA. -
Categorías fáciles de reconocer. - Botones con estados hover, focus,
active y disabled. - Navegación por teclado y etiquetas accesibles. -
Contraste adecuado. - Estados de carga, error, catálogo vacío y producto
no encontrado. - Animaciones sutiles, con respeto a
`prefers-reduced-motion`. - No uses scroll-jacking ni animaciones que
bloqueen la navegación. - Mantén el rendimiento y evita cargar videos
pesados en dispositivos móviles.

El recorrido cinematográfico del taller puede conservarse si aporta
identidad, pero no debe obligar al usuario a atravesar varias escenas
para llegar al catálogo. La compra/consulta debe ser directa desde la
navegación y la home.

## 8. WhatsApp y conversiones

Utiliza el número comercial solo después de verificarlo en el
repositorio o documentos.

-   Los enlaces deben abrir una conversación con el número correcto.
-   Incluye mensajes predefinidos útiles según contexto, por ejemplo:
    consulta de producto, alquiler o servicio técnico.
-   Codifica correctamente el texto de los enlaces.
-   No uses botones que aparenten funcionar y no realicen ninguna
    acción.
-   No inventes formularios que envíen datos a ningún destino. Si existe
    formulario, verifica su funcionamiento y validación.

## 9. SEO y rendimiento

Implementa o corrige: - Metadata por página. - Títulos y descripciones
únicos. - Open Graph básico. - URLs limpias y slugs estables. -
Encabezados semánticos. - Textos alternativos descriptivos para
imágenes. - Sitemap y robots si corresponden a la estructura
existente. - Optimización de imágenes con las herramientas del
framework. - Lazy loading para contenido fuera de pantalla. - Video
optimizado, poster y fallback. - Evita dependencias nuevas si el
proyecto ya tiene una solución adecuada.

No agregues bibliotecas grandes para resolver algo que puede hacerse con
las herramientas ya instaladas.

## 10. Restricciones de implementación

-   Respeta el stack actual: Next.js, TypeScript, React, Tailwind y
    Supabase, salvo que la auditoría justifique un cambio.
-   No reescribas todo desde cero.
-   No elimines funcionalidades útiles.
-   No cambies el nombre del proyecto ni la identidad de MAQSYMA.
-   No inventes contenido comercial.
-   No uses datos demo en producción.
-   No introduzcas dependencias sin explicar su necesidad.
-   No hagas cambios destructivos en base de datos.
-   No modifiques `main` directamente.

### Git y flujo de trabajo

1.  Comprueba el estado del repositorio y la rama actual.
2.  Crea una rama de trabajo llamada `redesign/maqsyma-2.0`.
3.  Realiza cambios en commits pequeños y descriptivos.
4.  Ejecuta pruebas y build antes de finalizar.
5.  No hagas push forzado.
6.  No hagas merge a `main` sin revisión.
7.  Si no tienes permisos para crear rama o subir cambios, no intentes
    modificar `main`; entrega los cambios locales y explica cómo
    publicarlos.

## 11. Plan de ejecución recomendado

### Fase 1 --- Auditoría y plan

-   Inspeccionar código, datos, rutas, estilos, componentes y
    documentos.
-   Identificar errores funcionales, inconsistencias y deuda técnica.
-   Presentar un resumen corto y un plan priorizado.

### Fase 2 --- Estructura y navegación

-   Reorganizar navegación.
-   Definir arquitectura de categorías y páginas de catálogo.
-   Corregir rutas y enlaces.
-   Preparar la home para las nuevas secciones.

### Fase 3 --- Sistema visual

-   Establecer tokens de color, tipografía, espaciado, radios y sombras.
-   Rediseñar hero y navegación.
-   Crear componentes consistentes para categorías y productos.
-   Mejorar responsive y accesibilidad.

### Fase 4 --- Catálogo y datos

-   Generalizar tipos/modelos de producto.
-   Corregir consultas Supabase y filtrado de demos.
-   Crear listados, filtros y fichas dinámicas.
-   Manejar correctamente precios no confirmados, imágenes ausentes y
    slugs inválidos.

### Fase 5 --- Contenido comercial

-   Integrar venta/alquiler, soluciones, marcas, servicio técnico y
    contacto.
-   Validar cada afirmación comercial.
-   Corregir llamadas a la acción.

### Fase 6 --- Calidad y entrega

-   Ejecutar lint, typecheck, tests disponibles y build.
-   Corregir errores introducidos.
-   Revisar visualmente en móvil, tablet y escritorio.
-   Verificar enlaces, rutas, filtros y CTA.
-   Entregar resumen de archivos modificados, decisiones, pruebas y
    pendientes.

## 12. Criterios de aceptación

El trabajo se considera terminado cuando:

-   [ ] La home tiene una identidad industrial premium y una jerarquía
    clara.
-   [ ] La navegación permite llegar fácilmente a productos, categorías,
    venta/alquiler, servicio técnico y contacto.
-   [ ] El catálogo admite distintas familias de productos, no solo
    soldadoras.
-   [ ] Las tarjetas y fichas muestran datos consistentes.
-   [ ] No se publican datos demo como datos reales.
-   [ ] Los precios no verificados se muestran como "Consultar precio".
-   [ ] No se inventan stock, reseñas, certificaciones ni proyectos.
-   [ ] Los enlaces y botones funcionan.
-   [ ] WhatsApp funciona con el número verificado.
-   [ ] Las páginas se adaptan correctamente a móvil.
-   [ ] Se respetan las políticas RLS y no se exponen secretos.
-   [ ] No existen errores de TypeScript, lint o build atribuibles a los
    cambios.
-   [ ] La rama `main` permanece intacta hasta que el usuario apruebe el
    resultado.

## 13. Forma de trabajo del agente

Trabaja de manera autónoma y ordenada. Si dispones de subagentes, delega
tareas independientes:

-   **Planner/Analista:** auditoría, arquitectura y plan.
-   **Diseñador/Frontend:** sistema visual, responsive y componentes.
-   **Backend/Datos:** catálogo, tipos, Supabase y rutas.
-   **QA/Auditor:** revisión funcional, seguridad, accesibilidad y
    build.
-   **Orquestador:** integra el trabajo, resuelve conflictos y verifica
    el resultado final.

No permitas que varios agentes editen simultáneamente los mismos
archivos. Asigna responsables y rutas concretas. El auditor debe revisar
el resultado real, no limitarse a aceptar el informe de los demás.

No te detengas después de redactar el plan: ejecuta las fases que puedas
completar de forma segura. Si una fase depende de información comercial
no confirmada, implementa el soporte técnico y deja ese dato pendiente,
sin inventarlo.

## 14. Informe final obligatorio

Al terminar, entrega:

1.  Resumen de lo que cambió.
2.  Principales decisiones de diseño y arquitectura.
3.  Archivos y componentes modificados.
4.  Cambios realizados en catálogo y Supabase.
5.  Pruebas ejecutadas y resultado de cada una.
6.  Problemas encontrados que no se pudieron resolver.
7.  Datos comerciales que requieren confirmación de MAQSYMA.
8.  Rama y commits creados.
9.  Instrucciones exactas para revisar y desplegar.

**Prioridad máxima:** construir una web MAQSYMA 2.0 que sea visualmente
memorable, pero sobre todo útil, confiable, rápida y preparada para un
catálogo industrial amplio. La estética nunca debe estar por encima de
la veracidad de los datos ni de la facilidad para contactar y consultar
productos.
