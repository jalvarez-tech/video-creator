import { cue, SoundCue } from "../../motor/sound/cues";

/**
 * PLAN DE SONIDO — proyecto 012 (30 fps · 835 f).
 * Guía: manuales/diseno-sonoro/SKILL.md · artefacto: 03-timeline.md.
 *
 * ESTILO «LUJO» (director §4): sonido MÍNIMO, aterrizajes suaves. Nueve cues en
 * 28 s y ni uno de premio (sparkle, coin, success): esto es una invitación de
 * negocios, no una notificación de app.
 *
 * LA VOZ MANDA (director §3f). Todo va `underDialogue` con ducking a −4,5 dB, y
 * los dos whooshes de cámara son los más bajos de todos: un whoosh que se oye
 * por encima de él convierte un mensaje personal en un anuncio.
 *
 * Exactamente DOS `impact deep`, los dos sobre las entradas a pantalla
 * completa, que son los únicos cambios visuales fuertes de la pieza. El remate
 * («el próximo gran negocio») cierra con un `whoosh light` como cualquier otra
 * tarjeta de franja, NO con un tercer impacto ni con un `chime`: es una
 * promesa, no un golpe, y un sonido de premio en el cierre convertiría una
 * invitación en una venta.
 */
export const cues012: SoundCue[] = [
  // ── Cámara (los más bajos de la mezcla) ──
  cue("s-cam-hook", "whoosh", "light", 4, 12, "Acompaña el acercamiento del saludo.", { priority: "low", underDialogue: true }),
  cue("s-cam-vuelta", "whoosh", "light", 374, 12, "Acompaña la apertura de plano al volver de Cartagena.", { priority: "low", underDialogue: true, variantIndex: 1 }),
  cue("s-cam-cta", "whoosh", "light", 596, 14, "Acompaña el punch-in hacia el pedido.", { priority: "low", underDialogue: true, variantIndex: 2 }),

  // ── g01 · la pregunta que filtra (segundo 5) ──
  cue("s-pregunta", "whoosh", "light", 150, 12, "Entra «¿Tienes un lote o oportunidad de inversión?» dentro de la frase que la dice.", { priority: "low", underDialogue: true, variantIndex: 1 }),

  // ── g02 · la fecha ──
  cue("s-fecha", "whoosh", "swoosh", 232, 12, "Entra «17 y 18 de septiembre» sobre los números.", { priority: "low", underDialogue: true }),

  // ── g03 · TRANSICIÓN 1: Cartagena (impact deep 1/2) ──
  cue("s-apex-in", "impact", "deep", 297, 20, "El corte a Cartagena cae sobre la palabra «Apex».", { priority: "medium", underDialogue: true }),
  cue("s-sede", "impact", "pop", 339, 8, "La sede aterriza cuando nombra la ciudad.", { priority: "low", underDialogue: true }),

  // ── g04 · con quién (un pop por nombre, alternando variantes) ──
  cue("s-brokers", "impact", "pop", 396, 8, "«Brokers» aterriza cuando lo dice.", { priority: "low", underDialogue: true, variantIndex: 1 }),
  cue("s-speakers", "impact", "pop", 424, 8, "«Speakers» aterriza cuando lo dice.", { priority: "low", underDialogue: true, variantIndex: 2 }),
  cue("s-empresarios", "impact", "pop", 452, 8, "«Empresarios» aterriza sobre el tercer ítem de la lista.", { priority: "low", underDialogue: true }),

  // ── g05 · TRANSICIÓN 2: los 5 países (impact deep 2/2) ──
  cue("s-paises-in", "impact", "deep", 470, 20, "El corte a los cinco países cae sobre «más de 5 países».", { priority: "medium", underDialogue: true, variantIndex: 1 }),

  // ── g06 · el pedido ──
  cue("s-dm", "impact", "pop", 628, 8, "«Mándame un DM» entra antes de que lo pronuncie (f635).", { priority: "low", underDialogue: true, variantIndex: 2 }),

  // ── g07 · remate: la misma entrada que las demás tarjetas, sin subir el tono ──
  cue("s-remate", "whoosh", "light", 760, 14, "Entra la promesa del cierre, bajo «el próximo gran negocio».", { priority: "low", underDialogue: true }),
];
