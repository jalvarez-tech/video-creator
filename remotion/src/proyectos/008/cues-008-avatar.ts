/**
 * PLAN DE SONIDO — proyecto 008 · pieza AVATAR (30 fps · 1314 f).
 * Guía: manuales/diseno-sonoro/SKILL.md · artefacto: 03-timeline-avatar.md.
 *
 * Criterio heredado del 008: campaña humanitaria → SIN sonidos de premio
 * (sparkle/chime/coin/success). Whooshes de tarjeta y pops de ítem, todos por
 * debajo de la voz (`underDialogue` + duckDb −4.5 en la comp), y exactamente
 * DOS `impact deep`: el aterrizaje del 8 y el remate «granito a granito».
 * La súplica (f638–800) queda EN SILENCIO de SFX a propósito.
 */
import { cue, SoundCue } from "../../motor/sound/cues";

export const cues008a: SoundCue[] = [
  // ── Cámara (el más bajo) ──
  cue("s-cam-hook", "whoosh", "light", 6, 12, "Acompaña el acercamiento del saludo.", { priority: "low", underDialogue: true }),

  // ── g01 · el anuncio ──
  cue("s-titulo", "whoosh", "light", 113, 10, "Entra «3 puntos de recolección» sobre la palabra exacta.", { priority: "low", underDialogue: true, variantIndex: 1 }),

  // ── g02 · Medellín (tarjeta + un pop por sede, alternando variantes) ──
  cue("s-med-in", "whoosh", "swoosh", 171, 12, "Entra la tarjeta de Medellín con «en Medellín».", { priority: "low", underDialogue: true }),
  cue("s-med-p1", "impact", "pop", 217, 8, "Aterriza Calasanz cuando la nombra.", { priority: "low", underDialogue: true }),
  cue("s-med-p2", "impact", "pop", 243, 8, "Aterriza Santa Lucía cuando la nombra.", { priority: "low", underDialogue: true, variantIndex: 1 }),
  cue("s-med-p3", "impact", "pop", 269, 8, "Aterriza el 20 de Julio cuando lo nombra.", { priority: "low", underDialogue: true, variantIndex: 2 }),

  // ── g03 · Caldas ──
  cue("s-cal-in", "whoosh", "light", 308, 12, "Entra la tarjeta de Caldas con «en Caldas».", { priority: "low", underDialogue: true, variantIndex: 2 }),
  cue("s-cal-pop", "impact", "pop", 422, 8, "Aterriza la dirección al decir «Street Cats».", { priority: "low", underDialogue: true }),

  // ── g04 · El Carmen de Viboral ──
  cue("s-car-in", "whoosh", "light", 477, 12, "Entra la tarjeta del Carmen con «Carmen de Viboral».", { priority: "low", underDialogue: true }),
  cue("s-car-pop", "impact", "pop", 525, 8, "Aterriza «mi casa» cuando lo dice.", { priority: "low", underDialogue: true, variantIndex: 1 }),

  // ── (638–800: la súplica — silencio de SFX a propósito) ──

  // ── g05 · las 8 toneladas ──
  cue("s-8t-data", "texture", "data", 818, 22, "Textura de conteo bajo el 0→8.", { priority: "low", underDialogue: true, fadeInFrames: 4, fadeOutFrames: 8 }),
  cue("s-8t-land", "impact", "deep", 838, 20, "El 8 aterriza dentro de «toneladas» (impact deep 1/2).", { priority: "medium", underDialogue: true }),
  cue("s-fin-pop", "impact", "pop", 880, 8, "Entra la fecha con «a fin de mes».", { priority: "low", underDialogue: true, variantIndex: 2 }),

  // ── g06 · comparte ──
  cue("s-cta-in", "whoosh", "swoosh", 1018, 12, "Entra la caja del CTA con «tienes la manera».", { priority: "low", underDialogue: true, variantIndex: 1 }),
  cue("s-cta-pop", "impact", "pop", 1054, 8, "«COMPARTE ESTE VIDEO» cae sobre la palabra «compartir».", { priority: "low", underDialogue: true }),

  // ── g07 · remate ──
  cue("s-granito", "impact", "deep", 1214, 20, "«Granito a granito» — el lema cierra la pieza (impact deep 2/2).", { priority: "medium", underDialogue: true }),
];
