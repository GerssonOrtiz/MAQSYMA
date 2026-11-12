# 📸 MAQSYMA — Guía y Prompts para Generación de Imágenes de Escenas

> **Propósito:** Generar las imágenes fotorrealistas de alta fidelidad para el recorrido inmersivo de scroll por el taller ([`src/config/scenes.ts`](src/config/scenes.ts)).  
> **Destino de los archivos:** `maqsyma-app/public/scenes/`  
> **Formato requerido:** `.webp` (calidad 75-80 para desktop, 70 para mobile).

---

## 🎨 Especificaciones de Estilo y Dirección de Arte

Para mantener consistencia con la identidad de marca MAQSYMA y ESAB:

- **Paleta cromática:** Fondo carbón/grafito oscuro (`#0D0E10`, `#1A1C20`), destellos cálidos dorados (`#C9A24A`) del arco voltaico o luces de taller, y el amarillo industrial característico de los equipos ESAB.
- **Atmósfera:** Taller industrial moderno, limpio, profesional, de alta tecnología, sin desorden caótico. Texturas de acero cepillado, concreto pulido o piso epóxico oscuro, ligero humo o chispas controladas.
- **Iluminación:** Cinematográfica con luz de recorte (rim light), claroscuro y destellos controlados del arco de soldadura.
- **Ratios recomendados:**
  - **Desktop (`1920x1080`):** Aspect ratio `--ar 16:9`
  - **Mobile (`900x1200` o `1080x1440`):** Aspect ratio `--ar 3:4` o `--ar 9:16`

---

## 📋 Lista de Escenas y Nombres de Archivo

| Escena ID | Archivo Desktop | Archivo Mobile | Proceso |
|---|---|---|---|
| `entrada` | `entrada.webp` | `entrada-m.webp` | Recepción Técnica / Showroom |
| `mig-mag` | `mig-mag.webp` | `mig-mag-m.webp` | Soldadura MIG/MAG (GMAW) |
| `tig` | `tig.webp` | `tig-m.webp` | Soldadura TIG (GTAW) Alta Frecuencia |
| `mma` | `mma.webp` | `mma-m.webp` | Soldadura Electrodo (SMAW) Trabajo Pesado |
| `plasma` | `plasma.webp` | `plasma-m.webp` | Corte por Plasma CNC / Manual |
| `alquiler` | `alquiler.webp` | `alquiler-m.webp` | Flota de Alquiler / Bodega Logística |

---

## 🤖 Prompts por Escenario

---

### 1. Escena: Entrada / Recepción Técnica
- **Nombre de archivo:** `entrada.webp` / `entrada-m.webp`
- **Concepto:** Showroom técnico industrial moderno de venta y alquiler de soldadura ESAB en Arequipa.

#### Prompt en Inglés (Midjourney / Flux / DALL-E 3)
```text
Cinematic wide shot of an ultra-modern premium industrial welding showroom and technical reception in Arequipa, dark carbon and graphite color palette (#0D0E10), polished dark concrete floor reflecting subtle warm golden lights, high-end yellow ESAB welding machines neatly displayed on sleek metallic pedestals with LED accent strip lighting, clean minimalist architectural workshop interior, brushed steel details, high dynamic range, photorealistic, 8k resolution, Leica SL2 photography, 24mm lens, clean composition, architectural photography --ar 16:9 --style raw --v 6.0
```

#### Para versión Mobile:
```text
Vertical shot of an ultra-modern industrial welding showroom entrance, yellow ESAB premium equipment on display on a dark graphite stand, subtle golden ambient rim light, dark industrial architectural interior, depth of field, 8k, photorealistic --ar 9:16 --style raw --v 6.0
```

---

### 2. Escena: Zona MIG/MAG
- **Nombre de archivo:** `mig-mag.webp` / `mig-mag-m.webp`
- **Concepto:** Soldadura continua semiautomática en serie pesada, alambre continuo, devanador y antorcha con arco brillante controlado.

#### Prompt en Inglés (Midjourney / Flux / DALL-E 3)
```text
Dramatic photograph of a certified welder performing MIG/MAG GMAW welding in a heavy industrial metal fabrication workshop, yellow ESAB wire feeder unit in the near background, bright electric blue-white arc with a fine burst of golden sparks illuminating the dark graphite metallic environment, welder wearing matte dark protective helmet and leather gloves, clean welds on thick structural steel plates, atmospheric light haze, cinematic rim lighting, 50mm f/1.8 lens, high shutter speed capturing spark trails, crisp focus, photorealistic --ar 16:9 --style raw --v 6.0
```

#### Para versión Mobile:
```text
Vertical composition of industrial MIG welding process in action, certified welder with auto-darkening helmet focused on steel seam, brilliant welding arc casting golden and amber light against dark industrial surroundings, ESAB equipment nearby, photorealistic 8k --ar 9:16 --style raw --v 6.0
```

---

### 3. Escena: Zona TIG
- **Nombre de archivo:** `tig.webp` / `tig-m.webp`
- **Concepto:** Precisión extrema, arco de tungsteno estable, cordón impecable sobre acero inoxidable o aluminio con reflejos limpios.

#### Prompt en Inglés (Midjourney / Flux / DALL-E 3)
```text
Macro close-up shot of precision TIG GTAW welding on high-grade stainless steel pipe, sharp tungsten electrode tip generating an intense concentrated sapphire-blue arc, welder's steady hand feeding a filler wire creating perfect stacked-dime weld ripples, yellow ESAB high-frequency inverter machine out of focus in the dark background, very dark moody industrial shop with charcoal tones, beautiful blue and gold lighting contrast, photorealistic, sharp focus on the weld bead, 85mm macro lens, 8k --ar 16:9 --style raw --v 6.0
```

#### Para versión Mobile:
```text
Vertical macro photograph of high-precision TIG welding on brushed stainless steel, intense small electric arc casting clean light, stacked weld bead perfection, dark graphite workshop background, commercial equipment photography style --ar 9:16 --style raw --v 6.0
```

---

### 4. Escena: Zona MMA (Electrodo Revestido)
- **Nombre de archivo:** `mma.webp` / `mma-m.webp`
- **Concepto:** Robustez, minería, trabajo en campo, soldadura pesada con electrodo bajo condiciones exigentes.

#### Prompt en Inglés (Midjourney / Flux / DALL-E 3)
```text
Rugged industrial shot of manual metal arc MMA SMAW stick welding in a heavy mining maintenance facility, durable yellow ESAB inverter machine standing on textured dark steel floor, thick steel beam being welded with burning coated electrode, shower of warm glowing amber sparks descending, deep dark shadows and industrial textures, smoky atmospheric background, powerful and tough industrial aesthetic, cinematic lighting, 35mm lens, realistic documentary style --ar 16:9 --style raw --v 6.0
```

#### Para versión Mobile:
```text
Vertical dynamic shot of heavy duty stick welding (MMA), shower of bright sparks falling against dark carbon environment, robust welding power source in background, industrial mining workshop atmosphere, high-resolution photography --ar 9:16 --style raw --v 6.0
```

---

### 5. Escena: Zona Plasma (Corte Térmico)
- **Nombre de archivo:** `plasma.webp` / `plasma-m.webp`
- **Concepto:** Corte térmico con antorcha de plasma, flujo de plasma hiperconcentrado cortando planchas de acero con precisión quirúrgica.

#### Prompt en Inglés (Midjourney / Flux / DALL-E 3)
```text
Stunning action shot of an industrial plasma torch cutting through a thick steel plate, high-velocity jet of luminous violet-cyan plasma piercing metal with a spray of molten golden dross underneath, CNC guide or precision operator hand, ESAB plasma cutting unit in dark backdrop, dramatic high contrast, dark industrial surroundings (#1A1C20), crisp motion freeze, 8k resolution, commercial machinery visual --ar 16:9 --style raw --v 6.0
```

#### Para versión Mobile:
```text
Vertical view of concentrated plasma cutting beam piercing through steel plate, radiant beam of light with spray of glowing particles beneath, dark minimalist metal workshop background, ultra-sharp detail, cinematic --ar 9:16 --style raw --v 6.0
```

---

### 6. Escena: Flota de Alquiler
- **Nombre de archivo:** `alquiler.webp` / `alquiler-m.webp`
- **Concepto:** Línea organizada de equipos ESAB listos en bodega logística para despacho inmediato a obras y minería.

#### Prompt en Inglés (Midjourney / Flux / DALL-E 3)
```text
Wide commercial warehouse perspective showing an organized fleet of brand new yellow ESAB multi-process welding machines, aligned neatly on heavy duty industrial steel shelving and pallets, tagged and ready for rental dispatch, dark graphite and carbon interior, warm overhead spotlight beams creating elegant highlights on the equipment casing, ultra clean logistics depot, professional industrial fleet photography, sharp focus from front to back, 24mm architectural lens, 8k --ar 16:9 --style raw --v 6.0
```

#### Para versión Mobile:
```text
Vertical perspective of neatly arranged line of yellow industrial welding rental machines in a high-tech dark logistics facility, clean rows of equipment ready for immediate delivery, warm spotlight accents on dark metal surfaces, commercial fleet presentation, 8k --ar 9:16 --style raw --v 6.0
```

---

## 🛠️ Cómo Convertir y Optimizar a `.webp`

Una vez generadas las imágenes (en PNG o JPG):

### Opción 1: Con herramienta online gratuita
1. Ingresa a [Squoosh.app](https://squoosh.app) o [Convertio](https://convertio.co/es/png-webp/).
2. Ajusta el ancho:
   - **Desktop:** `1920px` (ancho) — Calidad WebP: `75%` (peso meta: `< 200 KB`).
   - **Mobile:** `900px` (ancho) — Calidad WebP: `70%` (peso meta: `< 120 KB`).
3. Descarga y renómbralo exactamente como indica la tabla (ej. `mig-mag.webp` y `mig-mag-m.webp`).

### Opción 2: Con Sharp / Node (Script en terminal)
Si tienes imágenes en una carpeta temporal, puedes correr:
```bash
npx sharp-cli -i ./input.png -o ./maqsyma-app/public/scenes/mig-mag.webp --resize 1920 --webp-quality 75
```

---

## 🚀 Activación en el Proyecto

1. Copia los archivos `.webp` en:  
   `C:\Users\gorti\Desktop\MAQSYMA\maqsyma-app\public\scenes\`
2. Abre [`src/config/scenes.ts`](src/config/scenes.ts).
3. Cambia `placeholder: true` a `placeholder: false` en cada una de las escenas que hayas cargado:
   ```typescript
   image: {
     desktop: "/scenes/mig-mag.webp",
     mobile: "/scenes/mig-mag-m.webp",
     alt: "Zona de soldadura MIG/MAG",
     placeholder: false, // 👈 Ahora mostrará la imagen real
   }
   ```
4. Guarda el archivo y listo: el sitio mostrará tus nuevas imágenes optimizadas con crossfade continuo.
