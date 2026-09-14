/**
 * PLAN DE CÁMARA — proyecto 008 · pieza GRACIAS (1080×1920 · 30 fps · 1410 f).
 * Guía: manuales/camara-avatar/SKILL.md · artefacto: 03-timeline-gracias.md.
 *
 * Cuatro movimientos, todos en los HUECOS sin tarjeta (director §3d: bajo un
 * hero la cámara reposa y hereda la escala del último cue). Los huecos de esta
 * pieza son exactamente cuatro y no es casualidad: son los cuatro tramos en que
 * él habla de personas y no de logística, que es justo donde su cara vale más
 * que cualquier tarjeta.
 *
 * ESCALA MÁXIMA 1.12, más corta que el 1.18 del Avatar008, y por una razón
 * medida: aquel clip estaba grabado de cerca en interior y éste es un selfie a
 * pulso contra el cielo, con la cara más pequeña y más alta en cuadro. A 1.16
 * la barbilla entra en la banda de texto (ancla 69,8 %) y se cruza con la
 * primera línea de las tarjetas. x/y = 0 siempre: la cara ya está centrada.
 */
import { cam, CameraCue } from "../../motor/camara";

export const camara008g: CameraCue[] = [
  // El clip abre con la cámara ya rodando y él a media frase: el empujón le da
  // un principio. Termina en f20, cuatro frames antes de la primera tarjeta.
  // 0–14 y no 0–20: la tarjeta de apertura se adelantó a f16 para que «8
  // TONELADAS» caiga en su palabra (f28), y bajo un hero la cámara reposa
  // (director §3d). El empujón sigue leyéndose: medio segundo y un 6 %.
  cam("cam-hook", 0, 14, "medium", { s: 1.0 }, { s: 1.06 }, "ease-out", "hook",
    "«Pensamos que 8 toneladas serían mucho»: acercar en la primera frase convierte un vídeo de móvil en un anuncio.",
    { soundCueId: "s-cam-hook" }),

  //   REPOSO 16–786 a 1.06 — mandan las seis tarjetas de gracias y logística.

  // Deja de dar datos y empieza a hablar de gente. Sin tarjeta y SIN sonido.
  cam("cam-escucha", 800, 864, "medium", { s: 1.06 }, { s: 1.12 }, "ease-in-out", "emphasis",
    "«Ya nos hemos comunicado, nos han pedido algunas medicinas»: aquí deja de pedir y empieza a transmitir un encargo ajeno; el punch-in lo pone a distancia de conversación."),

  //   REPOSO 888–1000 a 1.12 — la toma de quien recibe (niños, adultos mayores).

  // Abrir plano antes del remate: «TODO SUMA» necesita aire, no cercanía.
  cam("cam-aire", 1006, 1052, "medium", { s: 1.12 }, { s: 1.05 }, "ease-in-out", "make-space",
    "«El que quiera vincularse a este proyecto»: el mensaje se abre a todo el mundo y el encuadre lo acompaña abriéndose también."),

  //   REPOSO 1098–1290 a 1.05 — «TODO SUMA» y «8 toneladas de puro amor».

  // El último empujón, en el único hueco que queda: la bendición antes del
  // gracias final. Termina en f1316, dos frames antes de la tarjeta de cierre.
  cam("cam-cierre", 1292, 1316, "medium", { s: 1.05 }, { s: 1.11 }, "ease-out", "emphasis",
    "«Entonces nada, Dios los bendiga»: acercarse para despedirse es lo que hace cualquiera al terminar de hablar con alguien."),
];
