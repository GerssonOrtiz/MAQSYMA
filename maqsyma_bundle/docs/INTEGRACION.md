# Instrucciones para el agente de desarrollo

## Fuentes
- Home: https://maqsyma.com/
- Categoría: https://maqsyma.com/product-category/maquinas-de-soldar/
- Página 2: https://maqsyma.com/product-category/maquinas-de-soldar/?product-page=2
- Página 3: https://maqsyma.com/product-category/maquinas-de-soldar/?product-page=3
- App destino: https://maqsyma-app.vercel.app/#taller

## Modelo recomendado
```ts
type CatalogProduct = {
  id: string;
  slug: string;
  name: string;
  brand?: string;
  model?: string;
  category: string;
  priceStatus: "published" | "quote";
  regularPrice?: number;
  salePrice?: number;
  currency: "PEN";
  images: string[];
  sourceUrl: string;
  description?: string;
  specifications?: Record<string, string>;
  lastVerifiedAt: string;
};
```

## Trabajo solicitado
1. Auditar el repositorio y el modelo de datos antes de modificar.
2. Descargar las imágenes del manifiesto `FOTOGRAFIAS.md`; comprobar que cada foto corresponde al modelo exacto.
3. Reemplazar productos DEMO, placeholders y precios ficticios.
4. Crear fichas individuales con galería, precio o “Consultar precio”, descripción y especificaciones solo verificadas.
5. Implementar filtros únicamente con atributos que estén respaldados por las fichas.
6. Conservar el diseño Industrial Cinematic Premium: Obsidian Black #101112, Industrial Yellow #F5C400, Metallic Silver #B9BEC2 e Industrial White #F4F4F0.
7. Conservar el recorrido del taller y GSAP; no sustituir la experiencia por una plantilla genérica.
8. Validar escritorio, móvil, navegación, imágenes y cotización por WhatsApp.

## Criterios de aceptación
- No quedan placeholders ni datos DEMO.
- Los precios coinciden con la fuente al momento de la validación.
- Productos sin precio muestran “Consultar precio”.
- No hay stock, reseñas, valoraciones ni especificaciones inventadas.
- No se duplican productos.
- La web funciona en escritorio y móvil.
