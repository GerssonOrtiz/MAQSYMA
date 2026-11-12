/**
 * Aplicación de transformaciones continuas y fluidas en capas del recorrido técnico.
 *
 * p: progreso suavizado entre 0 y 1
 * imageLayers: elementos DOM de fondo/imagen de cada escena
 * textLayers: elementos DOM de textos correspondientes
 * mobile: bandera booleana para dispositivos táctiles/móviles
 * reducedMotion: bandera booleana de accesibilidad
 */
export function applyScenes(
  p: number,
  imageLayers: HTMLElement[],
  textLayers: HTMLElement[],
  indicators: HTMLElement[],
  mobile: boolean,
  reducedMotion: boolean = false
) {
  const n = imageLayers.length;
  if (n === 0) return;

  if (reducedMotion) {
    // Si prefiere reducción de movimiento: sin desplazamiento ni escalas dinámicas
    const activeIndex = Math.min(n - 1, Math.max(0, Math.round(p * (n - 1))));
    imageLayers.forEach((el, i) => {
      el.style.opacity = i === activeIndex ? "1" : "0";
      el.style.transform = "none";
      el.style.visibility = i === activeIndex ? "visible" : "hidden";
    });
    textLayers.forEach((el, i) => {
      el.style.opacity = i === activeIndex ? "1" : "0";
      el.style.transform = "none";
      el.style.visibility = i === activeIndex ? "visible" : "hidden";
    });
    indicators.forEach((el, i) => {
      if (i === activeIndex) {
        el.setAttribute("data-active", "true");
        el.style.backgroundColor = "var(--color-oro)";
        el.style.transform = "scale(1.25)";
      } else {
        el.removeAttribute("data-active");
        el.style.backgroundColor = "var(--color-grafito-2)";
        el.style.transform = "scale(1)";
      }
    });
    return;
  }

  const x = p * (n - 1);         // posición continua dentro del recorrido
  const travel = mobile ? 3 : 6; // desplazamiento vertical en vh entre escenas
  const activeIndex = Math.min(n - 1, Math.max(0, Math.round(x)));

  // Actualizar indicadores de progreso
  indicators.forEach((el, i) => {
    const d = Math.abs(i - x);
    if (i === activeIndex) {
      el.setAttribute("data-active", "true");
      el.style.backgroundColor = "var(--color-oro)";
      el.style.transform = "scale(1.3)";
    } else {
      el.removeAttribute("data-active");
      el.style.backgroundColor = d < 0.6 ? "var(--color-oro-oscuro)" : "var(--color-grafito-2)";
      el.style.transform = "scale(1)";
    }
  });

  // Capas de imagen / placeholder
  imageLayers.forEach((el, i) => {
    const d = i - x;
    const abs = Math.abs(d);

    // Opacidad continua (fundido gradual)
    el.style.opacity = String(Math.max(0, 1 - abs * 1.15));
    // Transformación solo en GPU (translate3d y scale)
    el.style.transform = `translate3d(0, ${d * travel}vh, 0) scale(${1 + abs * 0.04})`;
    el.style.visibility = abs > 1.25 ? "hidden" : "visible";
  });

  // Capas de texto con desfase y ligero parallax en escritorio
  const textParallax = mobile ? 0 : 0.35;
  textLayers.forEach((el, i) => {
    const d = i - x;
    const abs = Math.abs(d);

    // Los textos entran con curva de visibilidad más enfocada
    const opacity = Math.max(0, 1 - abs * 1.4);
    const translateY = (d * travel * (1 + textParallax));

    el.style.opacity = String(opacity);
    el.style.transform = `translate3d(0, ${translateY}vh, 0)`;
    el.style.visibility = abs > 1.1 ? "hidden" : "visible";
  });
}
