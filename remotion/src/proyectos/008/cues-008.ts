import { cue, type SoundCue } from "../../motor/sound/cues";

/**
 * PLAN DE SONIDO del proyecto 008 v4 (campaña Chocó · 30 fps · 2215 f · voz
 * PROPIA del cliente · v5 ritmo continuo, entradas editoriales). Guía: manuales/diseno-sonoro/SKILL.md · timeline:
 * proyectos/008/artefactos/03-timeline.md
 *
 * LA VOZ MANDA: ducking global y `underDialogue` en cada cue.
 *
 * V5: los textos vuelven a la ley editorial (el cliente prefirió el muelle
 * a los barridos) y los whips se revirtieron. Los pops/clicks marcan
 * aterrizajes de tarjeta y las texturas `paper` lo que se posa. La disciplina
 * de una pieza con víctimas se mantiene: NADA de premio, UN `sharp` (la cifra
 * del camión) y DOS `deep` (granito y frase final).
 *
 * Las ATMÓSFERAS (lluvia/viento por sección) NO van aquí: son camas <Audio>
 * en Noticia008.tsx, por debajo de estos SFX (pedido v4 del cliente).
 *
 * ── LA LECCIÓN DEL DEEP (medida en v1) ──────────────────────────────────────
 * `impact-deep.mp3` lleva el BOOM en el segundo 1–2 del archivo: startFrame
 * adelantado 36 f = el swell anuncia y el boom cae EXACTO en el target.
 *
 * ── SILENCIOS A PROPÓSITO ───────────────────────────────────────────────────
 * f07 (la petición) va casi a voz sola y sil10 (el versículo) en silencio
 * absoluto. `targetFrame`s sobre la voz real (generar-vo.sh v6, 2215 f (STREET CATS, Caldas)).
 */
export const cues008: SoundCue[] = [
  // ══ GANCHO ══════════════════════════════════════════════════════════════
  cue("s-g01", "whoosh", "light", 4, 14, "Entra el daño real: un corte de aire mínimo, no un anuncio de drama.", {
    priority: "low",
    underDialogue: true,
  }),
  cue("s-g02", "whoosh", "wind", 146, 18, "La playa del Chocó abre a pantalla completa: aire de mar bajo el nombre.", {
    priority: "medium",
    underDialogue: true,
  }),

  // ══ CONTEXTO ════════════════════════════════════════════════════════════
  cue("s-c01", "whoosh", "light", 277, 14, "La solidaridad de hoy entra en movimiento: manos empacando víveres.", {
    priority: "low",
    underDialogue: true,
    variantIndex: 1,
  }),
  cue("s-c02a", "whoosh", "light", 344, 12, "«Las noticias cambian» entra en papel: el pivote, sin drama.", {
    priority: "low",
    underDialogue: true,
    variantIndex: 2,
  }),
  cue("s-c02b", "click", "camera", 396, 12, "«Las cámaras se van»: el click de cámara es el gesto literal.", {
    priority: "medium",
    underDialogue: true,
  }),
  cue("s-c03a", "whoosh", "light", 437, 12, "La advertencia entra en papel: la ayuda va a bajar.", {
    priority: "low",
    underDialogue: true,
  }),
  cue("s-c03b", "whoosh", "wind", 490, 16, "El dedo del niño en la mano adulta: aire, no drama.", {
    priority: "low",
    underDialogue: true,
  }),

  // ══ CONFLICTO ═══════════════════════════════════════════════════════════
  cue("s-d01", "click", "pop", 597, 10, "«Queremos llegar después» aterriza: la decisión, dicha en seco.", {
    priority: "medium",
    underDialogue: true,
  }),
  // ÚNICO SHARP DE LA PIEZA: el pivote del dolor al plan.
  cue("s-d02a", "impact", "sharp", 725, 16, "La cifra del camión (8 toneladas): el cambio de marcha de la pieza.", {
    priority: "high",
    underDialogue: true,
  }),
  cue("s-d02b", "whoosh", "light", 783, 12, "«Y queremos llenarlo»: el objetivo dicho como aire.", {
    priority: "low",
    underDialogue: true,
    variantIndex: 1,
  }),

  // ══ EXPLICACIÓN ═════════════════════════════════════════════════════════
  cue("s-n01a", "whoosh", "light", 824, 14, "El grano cayendo entre manos: arranca el inventario de lo concreto.", {
    priority: "low",
    underDialogue: true,
    variantIndex: 1,
  }),
  cue("s-n01b", "texture", "paper", 952, 20, "La lista se posa sobre la mesa mientras la voz la termina.", {
    priority: "medium",
    underDialogue: true,
    fadeOutFrames: 8,
  }),

  // ══ DATOS 1 — la donación en especie ════════════════════════════════════
  cue("s-m01a", "whoosh", "light", 1036, 14, "El acero baja del camión: el material literal de la reconstrucción.", {
    priority: "low",
    underDialogue: true,
    variantIndex: 2,
  }),
  cue("s-m01b", "click", "pop", 1139, 10, "«Cemento y varillas, bienvenidos» aterriza con pop neutro.", {
    priority: "medium",
    underDialogue: true,
    variantIndex: 1,
  }),
  cue("s-m01c", "click", "pop", 1268, 10, "«Sería de maravilla» aterriza suave: el beat cálido que regaló la lectura.", {
    priority: "medium",
    underDialogue: true,
  }),

  // ══ DATOS 2 — las sedes ═════════════════════════════════════════════════
  cue("s-a01a", "click", "ui", 1312, 10, "Los puntos de recolección se abren: la tarjeta de conversión.", {
    priority: "medium",
    underDialogue: true,
  }),
  cue("s-a01b", "texture", "paper", 1413, 20, "La dirección se posa EXACTAMENTE cuando la voz la dice.", {
    priority: "medium",
    underDialogue: true,
    fadeOutFrames: 8,
  }),

  // ══ CLÍMAX ══════════════════════════════════════════════════════════════
  cue("s-f01a", "whoosh", "light", 1524, 14, "Las cajas entran al camión: la campaña ya está en movimiento.", {
    priority: "low",
    underDialogue: true,
  }),
  cue("s-f01b", "click", "pop", 1618, 10, "«Solo falta llenarlo»: el estado de la misión, seco y claro.", {
    priority: "low",
    underDialogue: true,
    variantIndex: 2,
  }),
  // GOLPE 1 DE 2: la tesis. El swell hace de anticipación (startFrame −36)
  // y el boom cae con «un granito a la vez».
  cue("s-f04", "impact", "deep", 1681, 120, "«Un granito a la vez»: el único peso grave del cuerpo — es la tesis.", {
    priority: "high",
    underDialogue: true,
    hasLongTail: true,
    startFrame: 1645,
  }),
  // f07 CASI EN SILENCIO: la petición directa va a voz sola.

  // ══ CIERRE ══════════════════════════════════════════════════════════════
  cue("s-sil8", "texture", "paper", 2039, 20, "La foto de los niños se posa tras la frase final: la esperanza como respuesta.", {
    priority: "medium",
    underDialogue: false,
    fadeOutFrames: 8,
  }),
  // GOLPE 2 DE 2: la frase final — ahora con la voz del cliente encima.
  cue("s-sil9", "impact", "deep", 1862, 120, "«Que deje de ser noticia no significa que haya terminado»: cierra con el peso reservado.", {
    priority: "high",
    underDialogue: true,
    hasLongTail: true,
    startFrame: 1826,
  }),
  // sil10 (el versículo) SIN cue: silencio absoluto.
];
