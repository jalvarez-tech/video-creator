/**
 * PLAN DE CÁMARA del proyecto 002 (avatar 9:16 · 1080×1920 · 25 fps · 883 frames).
 * Guía: manuales/camara-avatar/SKILL.md. Motor: camara.ts.
 *
 * Alineado a las ventanas donde el avatar SE VE en MotionApple002.tsx:
 *   visible 0–158 (hook) · 405–492 (mitos) · 786–883 (CTA comentario).
 * Bajo las "statements" a pantalla completa (158–405, 492–786) la cámara REPOSA
 * (sin cues): mover la cámara cuando ya hay un cambio visual fuerte es esfuerzo
 * perdido (SKILL §7). Estilo Apple → movimientos lentos, sutiles, sin rebote.
 */
import { cam, CameraCue } from "../../motor/camara";

export const camara002: CameraCue[] = [
  // Hook: acercamiento corto en la primera frase.
  cam("cam-hook", 0, 16, "close", { s: 1.0 }, { s: 1.16, y: -6 }, "ease-out", "hook",
    "Acercar en el hook refuerza el reencuadre 'el problema es después del clic'.",
    { soundCueId: "cam-hook-whoosh" }),
  // Baja intensidad para explicar el embudo antes de ceder a la statement.
  cam("cam-settle", 62, 90, "medium", { s: 1.16, y: -6 }, { s: 1.04, y: 0 }, "ease-in-out", "explanation",
    "Alejar prepara la entrada de la statement 200→3→0 a pantalla completa."),

  //   REPOSO 158–405 — statements 200 / 3 / 0 ocultan al avatar.

  // Reentrada tras el '0': primer plano + leve reencuadre para retomar atención en los mitos.
  cam("cam-reentry", 410, 432, "close", { s: 1.04, x: 0 }, { s: 1.18, x: -18 }, "ease-out", "emphasis",
    "Al volver el avatar, un primer plano marca el giro 'no es el algoritmo… es que estás'.",
    { soundCueId: "cam-reentry-whoosh" }),
  cam("cam-settle2", 462, 484, "medium", { s: 1.18, x: -18 }, { s: 1.06, x: 0 }, "ease-in-out", "explanation",
    "Centrar y calmar antes de la statement caliente→frío."),

  //   REPOSO 492–786 — statements caliente/frío y pregunta ocultan al avatar.

  // CTA: acercamiento progresivo (la tarjeta de comentario ahora va en el tercio inferior).
  cam("cam-cta", 792, 816, "close", { s: 1.05 }, { s: 1.18 }, "ease-out", "cta",
    "El acercamiento final concentra la atención en el pedido: deja tu número.",
    { soundCueId: "cam-cta-whoosh" }),
];
