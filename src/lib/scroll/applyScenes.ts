/**
 * Aplicación de transformaciones en capas con sistema de meseta/pausa (Snap Plateau).
 *
 * p: progreso de scroll suavizado (0 a 1)
 * imageLayers: capas de fondo
 * textLayers: capas interactivas de tarjetas de equipos
 * indicators: puntos de navegación lateral
 * mobile: indicador de dispositivo móvil
 * reducedMotion: accesibilidad para reducción de movimiento
 *
 * Snap Plateau:
 * Cada escena 'i' tiene un rango de meseta (d <= 0.45) donde la tarjeta se mantiene
 * completamente opaca (opacity: 1), centrada y con pointer-events: auto habilitado,
 * permitiendo hacer clic e interactuar con los equipos sin desvanecimientos repentinos
 * al scrollear rápido.
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
      el.style.pointerEvents = i === activeIndex ? "auto" : "none";
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

  const x = p * (n - 1);
  const activeIndex = Math.min(n - 1, Math.max(0, Math.round(x)));

  // Parámetros de movimiento cinematográfico diagonal
  const travelY = mobile ? 5 : 9;
  const travelX = mobile ? 8 : 15;

  // Actualizar indicadores laterales
  indicators.forEach((el, i) => {
    const d = Math.abs(i - x);
    if (i === activeIndex) {
      el.setAttribute("data-active", "true");
      el.style.backgroundColor = "var(--color-oro)";
      el.style.transform = "scale(1.35)";
    } else {
      el.removeAttribute("data-active");
      el.style.backgroundColor = d < 0.6 ? "var(--color-oro-oscuro)" : "var(--color-grafito-2)";
      el.style.transform = "scale(1)";
    }
  });

  // Capas de fondo cinemático
  imageLayers.forEach((el, i) => {
    const d = i - x;
    const abs = Math.abs(d);

    const dir = i % 2 === 0 ? 1 : -1;
    const moveX = d * travelX * dir;
    const moveY = d * travelY;
    const rot = d * (mobile ? 1 : 2) * dir;
    const scale = 1.04 + abs * 0.06;

    // Transición suave de fondo
    el.style.opacity = String(Math.max(0, 1 - abs * 1.1));
    el.style.transform = `translate3d(${moveX}vw, ${moveY}vh, 0) scale(${scale}) rotate(${rot}deg)`;
    el.style.visibility = abs > 1.3 ? "hidden" : "visible";
  });

  // Capas de equipos con MESETA DE PAUSA (Snap Plateau) para clics perfectos
  const textParallax = mobile ? 0.15 : 0.35;

  textLayers.forEach((el, i) => {
    const d = i - x;
    const abs = Math.abs(d);
    const dir = i % 2 === 0 ? -1 : 1;

    // ── ZONA DE PAUSA ESTABLE ──
    // Si abs <= 0.42, la tarjeta está fijada al 100% de opacidad y posición central
    // Si se pasa de 0.42, comienza su transición diagonal de salida
    let opacity = 0;
    let moveFactor = 0;

    if (abs <= 0.42) {
      opacity = 1;
      moveFactor = 0; // Se mantiene en pausa firme
      el.style.pointerEvents = "auto"; // Habilita clics garantizados
    } else {
      // Fuera de la meseta: desvanecimiento y desplazamiento suave
      const transitionProgress = (abs - 0.42) / (1.1 - 0.42);
      opacity = Math.max(0, 1 - transitionProgress);
      moveFactor = (d > 0 ? 1 : -1) * (abs - 0.42);
      el.style.pointerEvents = opacity > 0.5 ? "auto" : "none";
    }

    const moveX = moveFactor * (travelX * textParallax) * dir;
    const moveY = moveFactor * (travelY * (1 + textParallax));

    el.style.opacity = String(opacity);
    el.style.transform = `translate3d(${moveX}vw, ${moveY}vh, 0)`;
    el.style.visibility = opacity <= 0.01 ? "hidden" : "visible";
  });
}
