import { cue, SoundCue } from "../../motor/sound/cues";

/**
 * PLAN DE SONIDO — proyecto 013 (30 fps · 383 f).
 * Guía: manuales/diseno-sonoro/SKILL.md · artefacto: 03-timeline.md.
 *
 * TRES cues en 12,8 s, y los tres son el MISMO gesto: un whoosh bajo el relevo
 * de un rótulo. Ni un impact, ni un riser, ni un chime.
 *
 * POR QUÉ TAN POCO, y no es pereza. Esta pieza ya tiene una capa de sonido que
 * no controlamos: el AMBIENTE REAL del evento, que viene dentro del clip
 * —música de fondo, gente hablando, el photocall—. Cada SFX que se añade no
 * compite sólo con su voz: compite con una sala llena. En el 012, que era una
 * grabación limpia en una sala vacía, nueve cues se oían uno a uno; aquí el
 * cuarto ya no se distinguiría del ruido, y lo único que haría es ensuciar.
 *
 * Y el estilo lo confirma (director §4, «corporativo/lujo» para Propiedades
 * Luxur): discreto, pocos SFX, aterrizajes suaves.
 *
 * NO HAY CUE EN EL f0. El hook ya está PUESTO en el primer frame (R23), así que
 * no entra: no hay nada que sonorizar. Un whoosh sobre algo que no se mueve es
 * el caso de decoración que el skill de sonido manda quitar.
 *
 * NO HAY CUE EN EL f245 (el respiro). Cuando el texto SALE no suena nada: el
 * scrim se va con él y el silencio es justo lo que hace que el tramo sin
 * rótulos se lea como aire y no como un fallo.
 *
 * LA VOZ MANDA (director §3f): los tres van `underDialogue` con ducking a
 * −4,5 dB y `priority: "low"`, que es lo más bajo de la mezcla. Se comprueba
 * OYENDO la prueba 720p, no mirándola.
 */
export const cues013: SoundCue[] = [
  cue("s-quien", "whoosh", "light", 62, 12, "El relevo del hook al rótulo de la presentadora, sobre «mi nombre es».", {
    priority: "low",
    underDialogue: true,
  }),
  cue("s-evento", "whoosh", "swoosh", 146, 12, "El relevo al rótulo del evento, sobre la palabra «APEX». Con algo más de cuerpo que los otros dos porque es el cambio de texto más grande de la pieza (124 px).", {
    priority: "low",
    underDialogue: true,
  }),
  cue("s-remate", "whoosh", "light", 300, 14, "Entra el remate, bajo «no se pierdan». El cierre suena IGUAL que las otras entradas y no sube el tono: es una invitación a quedarse, no un golpe.", {
    priority: "low",
    underDialogue: true,
    variantIndex: 1,
  }),
];
