/**
 * Plan de SONIDO del proyecto 002 (avatar `avatar_1.mp4`, estilo Apple).
 * Guía: manuales/diseno-sonoro/SKILL.md. Motor: sound/cues.ts + PistaSonido.
 *
 * Estilo Apple → diseño sonoro SUTIL: los efectos se SIENTEN más que se escuchan.
 * La narración es continua → `<PistaSonido duckDb=…>` baja TODOS los SFX y cada
 * cue va con `underDialogue` (reducción extra). Whooshes de cámara e impacts, los
 * más bajos. Frames absolutos @25 fps (comp 883 frames).
 */
import { cue, SoundCue } from "../../motor/sound/cues";

export const cues002: SoundCue[] = [
  // ── Cámara (los más bajos) ──
  cue("cam-hook-whoosh", "whoosh", "light", 6, 12, "Acompaña el acercamiento del hook.", { priority: "low", underDialogue: true }),
  cue("cam-reentry-whoosh", "whoosh", "light", 415, 12, "Acompaña la reentrada del avatar tras el '0'.", { priority: "low", underDialogue: true, variantIndex: 1 }),
  cue("cam-cta-whoosh", "whoosh", "swoosh", 795, 14, "Acompaña el push-in final hacia el CTA.", { priority: "low", underDialogue: true }),

  // ── S2 · 200 ──
  cue("s2-count", "texture", "data", 166, 40, "Textura de conteo bajo el 200 que sube.", { priority: "low", underDialogue: true, fadeInFrames: 6, fadeOutFrames: 12 }),
  cue("s2-land", "impact", "deep", 202, 18, "El 200 aterriza en su valor final.", { priority: "medium", underDialogue: true }),

  // ── S3 · 3 ──
  cue("s3-whip", "whoosh", "whip", 250, 10, "Transición 200 → 3 (la caída).", { priority: "low", underDialogue: true }),

  // ── S4 · 0 (el golpe) ──
  cue("s4-boom", "impact", "deep", 324, 30, "El '0' cae: ninguno agenda visita.", { priority: "high", underDialogue: true }),

  // ── S5 · mitos tachados ──
  cue("s5-myth1", "whoosh", "whip", 430, 8, "Tacha 'no es el algoritmo'.", { priority: "low", underDialogue: true }),
  cue("s5-myth2", "click", "pen", 456, 8, "Tacha 'no es la demanda'.", { priority: "low", underDialogue: true }),

  // ── S6 · caliente → frío / sin seguimiento ──
  cue("s6-swoosh", "whoosh", "swoosh", 494, 14, "Entra la statement caliente→frío.", { priority: "low", underDialogue: true, direction: "left", variantIndex: 1 }),
  cue("s6-cold-riser", "riser", "low-rumble", 518, 28, "Crescendo suave que resuelve en 'FRÍO'.", { priority: "medium", underDialogue: true }),
  cue("s6-nofollow", "impact", "deep", 576, 24, "Cae 'SIN SEGUIMIENTO'.", { priority: "medium", underDialogue: true }),

  // ── S7 · pregunta ── (la pregunta grande entra tras "una pregunta honesta", ~frame 678)
  // Primer sonido: whoosh swoosh (Ashish "7."), su pico ~1.25s cae en el frame 680 (reveal de la pregunta).
  cue("s7-whoosh", "whoosh", "swoosh-hero", 680, 48, "Whoosh swoosh que revela '¿cuántos leads calificados?'.", { priority: "medium", underDialogue: true, fadeOutFrames: 10 }),
  cue("s7-chime", "impact", "chime", 682, 22, "Marca la aparición de '¿cuántos leads calificados?'.", { priority: "low", underDialogue: true }),

  // ── S8 · tarjeta de comentario ──
  cue("s8-pop", "impact", "pop", 792, 12, "Aparece la tarjeta de comentario.", { priority: "low", underDialogue: true }),
  cue("s8-typing", "texture", "typing", 800, 26, "Se escribe el número en el campo.", { priority: "low", underDialogue: true, fadeInFrames: 6, fadeOutFrames: 10 }),
  cue("s8-success", "impact", "success", 822, 24, "Confirma el gesto 👇 'déjalo en los comentarios'.", { priority: "low", underDialogue: true }),
];
