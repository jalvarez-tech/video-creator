/**
 * PLAN DE CÁMARA — proyecto 008 · pieza AVATAR (1080×1920 · 30 fps · 1314 f).
 * Guía: manuales/camara-avatar/SKILL.md · artefacto: 03-timeline-avatar.md.
 *
 * Los 4 movimientos caen SOLO en los huecos sin tarjeta (el hero no se pisa,
 * director §3d): bajo las 7 tomas de gráficos la cámara REPOSA en la escala
 * que dejó el último cue (1.08 → 1.18 → 1.06 → 1.12). x/y = 0 siempre: la cara
 * ya está centrada y desplazar sin más zoom la sacaría del encuadre (R09).
 */
import { cam, CameraCue } from "../../motor/camara";

export const camara008a: CameraCue[] = [
  // Saludo: el empujón inicial saca al vídeo de la quietud de un clip de móvil.
  cam("cam-hook", 0, 22, "medium", { s: 1.0 }, { s: 1.08 }, "ease-out", "hook",
    "«Muy buenos días, buenas noticias»: acercar en el saludo marca que hay un anuncio.",
    { soundCueId: "s-cam-hook" }),

  //   REPOSO 63–633 — anuncio y las tres tarjetas de direcciones mandan.

  // La súplica (638–736): sin tarjetas, su cara ES la escena. Punch-in lento.
  cam("cam-suplica", 660, 720, "close", { s: 1.08 }, { s: 1.18 }, "ease-in-out", "emphasis",
    "«Cualquier ayuda por más mínima que usted piense que sea»: la frase emocional concentra la mirada en sus ojos."),

  // Alejar antes de la cifra: la tarjeta del 8 necesita aire y protagonismo.
  cam("cam-aire", 770, 800, "medium", { s: 1.18 }, { s: 1.06 }, "ease-in-out", "make-space",
    "Abrir plano en «este camión» prepara la entrada del contador: el 8 manda, no la cámara."),

  //   REPOSO 806–955 — la cifra y la fecha mandan.

  // El pedido directo, antes de que entre la caja de compartir.
  cam("cam-cta", 975, 1000, "medium", { s: 1.06 }, { s: 1.12 }, "ease-out", "cta",
    "«Si quieres unir, ayudar»: pequeño empujón hacia él justo antes del CTA de compartir."),

  //   REPOSO 1018–1314 — CTA y remate «granito a granito» mandan.
];
