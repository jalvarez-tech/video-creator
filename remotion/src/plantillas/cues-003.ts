/**
 * PLAN DE SONIDO del proyecto 003 (mundo líquido · **25 fps** · comp 1153 f).
 * Guía: manuales/diseno-sonoro/SKILL.md. Motor: sound/cues.ts + PistaSonido.
 *
 * Frames y duraciones al fps de la comp (director §3a): el mismo efecto que a
 * 30 fps duraba 12 f aquí dura 10, para que el tiempo REAL no cambie.
 *
 * COHERENCIA MATERIAL (§3.6): el mundo es metal líquido, así que el vocabulario
 * es LÍQUIDO + METAL + IMPACTO GRAVE. Tres reglas fijas que hacen sistema:
 *   · cambio de mundo (entrar a las dos tomas grandes) → `liquid` + `deep`
 *   · corte mecánico (las tres tarjetas)               → `whip`
 *   · golpe de tipografía (todo lo que entra de golpe) → `metal` rotando pool
 * Prohibido en esta pieza: cartoon, boing, pop, glitch, sparkle — no pertenecen
 * a este mundo (§7 estilo cinematográfico/orgánico).
 *
 * MEZCLA: narración continua → `<PistaSonido duckDb={-5}>` + `underDialogue` en
 * TODOS los cues. Los efectos se sienten, no se escuchan: la voz manda siempre.
 */
import { cue, SoundCue } from "./sound/cues";

export const cues003: SoundCue[] = [
  // ── Cámara (los más bajos de toda la mezcla) ──
  cue("cam-hook", "whoosh", "light", 7, 12, "Acompaña el empuje lento de apertura.",
    { priority: "low", underDialogue: true }),
  cue("cam-deshacerte", "whoosh", "light", 105, 10, "Acompaña el cierre de plano sobre 'deshacerte'.",
    { priority: "low", underDialogue: true, variantIndex: 1 }),
  cue("cam-vuelta-dato", "whoosh", "light", 313, 12, "Reentrada del avatar tras el dato.",
    { priority: "low", underDialogue: true, variantIndex: 2 }),
  cue("cam-vuelta-ordena", "whoosh", "swoosh", 601, 12, "Reentrada del avatar tras la tarjeta 02.",
    { priority: "low", underDialogue: true }),
  cue("cam-vuelta-remate", "whoosh", "light", 995, 12, "Reentrada del avatar para el remate.",
    { priority: "low", underDialogue: true, variantIndex: 1 }),
  cue("cam-cta", "whoosh", "swoosh", 1065, 12, "Acompaña el último acercamiento antes del CTA.",
    { priority: "low", underDialogue: true, variantIndex: 1 }),

  // ── S0 · sello DESHACERTE (4.20 s) ──
  cue("s0-sello", "impact", "metal", 105, 12, "Golpe seco del sello 'DESHACERTE' entrando de una pieza.",
    { priority: "medium", underDialogue: true }),

  // ── S1 · dato 100 → 95 (cambio de mundo: entramos al líquido entero) ──
  cue("s1-cut-liquid", "whoosh", "liquid", 198, 22, "El corte al gráfico se lee como el mundo abriéndose: sonido de líquido.",
    { priority: "medium", underDialogue: true, fadeOutFrames: 7 }),
  cue("s1-cut-deep", "impact", "deep", 198, 22, "Cuerpo grave bajo el corte: da peso al cambio de toma.",
    { priority: "medium", underDialogue: true, hasLongTail: true }),
  cue("s1-100", "impact", "metal", 211, 10, "La cifra 100 entra de golpe (8.45 s).",
    { priority: "medium", underDialogue: true, variantIndex: 1 }),
  cue("s1-malla", "texture", "data", 213, 37, "Textura mecánica mientras se llenan los 100 puntos.",
    { priority: "low", underDialogue: true, fadeInFrames: 3, fadeOutFrames: 10 }),
  cue("s1-drenaje", "whoosh", "liquid", 258, 25, "Los 95 puntos se apagan y caen: el líquido se los lleva.",
    { priority: "high", underDialogue: true, fadeOutFrames: 8 }),
  cue("s1-95", "impact", "deep", 258, 25, "El golpe del dato: 95 no compran nunca (10.31 s).",
    { priority: "high", underDialogue: true, hasLongTail: true }),
  cue("s1-nunca", "impact", "metal", 276, 10, "'No te compran NUNCA' entra de golpe.",
    { priority: "low", underDialogue: true, variantIndex: 2 }),

  // ── S2 · las tres barras ──
  cue("s2-bar1", "click", "tick", 408, 5, "Primera de las tres cosas: ritmo mecánico.",
    { priority: "low", underDialogue: true }),
  cue("s2-bar2", "click", "tick", 411, 5, "Segunda barra.", { priority: "low", underDialogue: true }),
  cue("s2-bar3", "click", "tick", 414, 5, "Tercera barra: cierra la enumeración.",
    { priority: "low", underDialogue: true }),

  // ── S3 · las tres tarjetas (mismo par de sonidos las tres veces = sistema) ──
  cue("s3-cut-1", "whoosh", "whip", 433, 10, "Corte mecánico a la tarjeta 01.",
    { priority: "low", underDialogue: true }),
  cue("s3-verbo-1", "impact", "metal", 436, 10, "DESCARTA entra de golpe (17.45 s).",
    { priority: "medium", underDialogue: true }),
  cue("s3-cut-2", "whoosh", "whip", 539, 10, "Corte mecánico a la tarjeta 02.",
    { priority: "low", underDialogue: true }),
  cue("s3-verbo-2", "impact", "metal", 542, 10, "ORDENA entra de golpe (21.69 s).",
    { priority: "medium", underDialogue: true, variantIndex: 1 }),
  cue("s3-cut-3", "whoosh", "whip", 703, 10, "Corte mecánico a la tarjeta 03.",
    { priority: "low", underDialogue: true }),
  cue("s3-verbo-3", "impact", "metal", 706, 10, "RECUPERA entra de golpe.",
    { priority: "medium", underDialogue: true, variantIndex: 2 }),

  // ── S5 · 'se guarda' — la única nota cálida de la pieza (confirmación) ──
  cue("s5-guarda", "impact", "chime", 799, 17, "El lead no se pierde: se guarda (31.98 s). Confirmación, no golpe.",
    { priority: "medium", underDialogue: true, variantIndex: 2 }),

  // ── S6 · revelación (segundo cambio de mundo) ──
  cue("s6-cut-liquid", "whoosh", "liquid", 819, 22, "Segundo corte grande al mundo líquido: la revelación.",
    { priority: "medium", underDialogue: true, fadeOutFrames: 7 }),
  cue("s6-eje", "whoosh", "light", 848, 13, "El eje temporal se traza de izquierda a derecha.",
    { priority: "low", underDialogue: true, variantIndex: 2, direction: "right" }),
  cue("s6-hoy", "impact", "metal", 883, 10, "Aparece el nodo HOY.",
    { priority: "low", underDialogue: true }),
  cue("s6-tachon", "impact", "sharp", 910, 12, "El tachón corta HOY: no fue hoy (36.40 s).",
    { priority: "medium", underDialogue: true }),
  cue("s6-3meses", "impact", "deep", 924, 22, "Giro emocional: te escribió hace 3 meses (36.98 s).",
    { priority: "high", underDialogue: true, hasLongTail: true }),
  cue("s6-enlace", "whoosh", "whip", 967, 10, "El enlace sale del pasado hacia hoy.",
    { priority: "low", underDialogue: true, direction: "right" }),
  cue("s6-roto", "impact", "metal", 972, 12, "El enlace se rompe: nunca le volviste a hablar.",
    { priority: "medium", underDialogue: true, variantIndex: 1 }),

  // ── S7 · remate ──
  cue("s7-descarta", "impact", "deep", 1037, 25, "El remate de la tesis: DESCARTA sustituye a todo lo demás (41.46 s).",
    { priority: "high", underDialogue: true, hasLongTail: true }),

  // ── S8 · CTA ──
  cue("s8-campo", "click", "ui", 1063, 8, "Se abre el campo de mensaje.",
    { priority: "low", underDialogue: true }),
  cue("s8-embudo", "impact", "metal", 1079, 10, "La palabra EMBUDO cae en el campo (43.18 s).",
    { priority: "medium", underDialogue: true, variantIndex: 2 }),
];
