/**
 * Aplicación de transformaciones continuas y fluidas en capas del recorrido técnico.
 *
 * p: progreso suavizado entre 0 y 1
 * imageLayers: elementos DOM de fondo/imagen de cada escena
 * textLayers: elementos DOM de textos correspondientes
 * mobile: bandera booleana para dispositivos táctiles/móviles
 * reducedMotion: bandera booleana de accesibilidad
 *
 * Cinemática: Movimiento de cámara diagonal (X y Y) con zoom dinámico y oscilación lateral
 * de un lado para otro simulando un dolly track cinematográfico en taller.
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
  const travelY = mobile ? 4 : 8; // desplazamiento vertical en vh
  const travelX = mobile ? 6 : 14; // desplazamiento horizontal diagonal en vw (de un lado para otro)
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

  // Capas de imagen / background cinematográfico con movimiento de cámara diagonal y alternante
  imageLayers.forEach((el, i) => {
    const d = i - x;
    const abs = Math.abs(d);

    // Dirección diagonal alternada: escenas pares vienen desde la izquierda/arriba, impares desde la derecha/abajo
    const dir = i % 2 === 0 ? 1 : -1;
    const moveX = d * travelX * dir;
    const moveY = d * travelY;
    const rot = d * (mobile ? 1 : 2.5) * dir; // Sutil inclinación angular de cámara (roll de lente)
    const scale = 1.05 + abs * 0.08;

    // Opacidad continua (fundido gradual)
    el.style.opacity = String(Math.max(0, 1 - abs * 1.15));
    // Transformación acelerada por GPU: diagonal 3D (X + Y) + rotación sutil
    el.style.transform = `translate3d(${moveX}vw, ${moveY}vh, 0) scale(${scale}) rotate(${rot}deg)`;
    el.style.visibility = abs > 1.3 ? "hidden" : "visible";
  });

  // Capas de texto con contra-movimiento diagonal cinemático
  const textParallax = mobile ? 0.2 : 0.45;
  textLayers.forEach((el, i) => {
    const d = i - x;
    const abs = Math.abs(d);

    // Los textos se mueven en contra-fase diagonal respecto al fondo para crear profundidad tridimensional
    const dir = i % 2 === 0 ? -1 : 1;
    const moveX = d * (travelX * textParallax) * dir;
    const moveY = d * (travelY * (1 + textParallax));

    const opacity = Math.max(0, 1 - abs * 1.35);

    el.style.opacity = String(opacity);
    el.style.transform = `translate3d(${moveX}vw, ${moveY}vh, 0)`;
    el.style.visibility = abs > 1.15 ? "hidden" : "visible";
  });
}
