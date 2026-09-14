/**
 * PLAN DE SONIDO — proyecto 008 · pieza GRACIAS (30 fps · 1410 f).
 * Guía: manuales/diseno-sonoro/SKILL.md · artefacto: 03-timeline-gracias.md.
 *
 * Criterio heredado de la campaña: SIN sonidos de premio (sparkle/chime/coin/
 * success). Es una emergencia humanitaria, no un marcador.
 *
 * LA REGLA DE ESTA PIEZA — el sonido firma la MISMA frase que el color
 * (graficos-008-gracias.ts §simbología). El `impact deep` suena exactamente
 * TRES veces y las tres caen sobre un titular VERDE, es decir sobre las tres
 * cosas que son mérito de quien donó: «GRACIAS», «TODO SUMA» y el gracias
 * final. Ningún dato de logística se lleva un deep, por importante que sea.
 *
 * Y la toma de QUIEN RECIBE (g07, f888–1000) entra con su whoosh y no lleva un
 * solo pop en los ítems: es la misma decisión que dejarla sin color. Los niños
 * y los adultos mayores no son un efecto.
 *
 * Todo va por debajo de la voz (`underDialogue` + duckDb −4.5 en la comp). El
 * clip es una grabación de exterior con viento real: cualquier SFX que se note
 * conscientemente delata el montaje sobre una voz que suena a móvil.
 */
import { cue, SoundCue } from "../../motor/sound/cues";

export const cues008g: SoundCue[] = [
  // ── Cámara (el más bajo de la pieza) ──
  // Target f10 y no f4: un whoosh pica al 65 % de su duración, así que con
  // target 4 el `startFrame` calculado salía en −4 y el ataque quedaba fuera de
  // la composición (medido: el cue arrancaba antes del frame 0). El
  // acercamiento dura hasta f14, así que picar en f8 cae dentro del gesto.
  cue("s-cam-hook", "whoosh", "light", 8, 12, "Acompaña el acercamiento de la primera frase.", { priority: "low", underDialogue: true }),

  // ── g01 · el planteamiento y su relevo ──
  cue("s-g01-in", "whoosh", "light", 16, 10, "Entra la tarjeta de apertura («Pensamos que»).", { priority: "low", underDialogue: true, variantIndex: 1 }),
  cue("s-8-toneladas", "impact", "pop", 28, 8, "La cifra aterriza exactamente cuando la dice. Pop y no deep: el deep está reservado a los tres verdes que son mérito de la gente, y esta cifra todavía es la meta, no el logro.", { priority: "low", underDialogue: true }),
  cue("s-logrando", "whoosh", "whip", 80, 10, "El mismo whip del volteo de g05, y por la misma regla: en esta pieza una `ranura` que releva un estado suena a whip. Aquí la duda se sustituye por «lo estamos logrando».", { priority: "low", underDialogue: true }),

  // ── g02 · GRACIAS (impact deep 1/3) ──
  cue("s-gracias", "impact", "deep", 130, 22, "El agradecimiento es el motivo del vídeo: primer y más grave de los tres deeps.", { priority: "medium", underDialogue: true }),

  // ── g03 · qué se recoge (un pop por ítem, alternando variantes) ──
  cue("s-g03-in", "whoosh", "swoosh", 206, 12, "Entra la tarjeta de insumos con «recolectando».", { priority: "low", underDialogue: true }),
  cue("s-ins-1", "impact", "pop", 212, 8, "Aterriza «kits de aseo» cuando lo nombra.", { priority: "low", underDialogue: true }),
  cue("s-ins-2", "impact", "pop", 249, 8, "Aterriza «medicinas básicas» cuando lo nombra.", { priority: "low", underDialogue: true, variantIndex: 1 }),
  cue("s-ins-3", "impact", "pop", 286, 8, "Aterriza «alimentos no perecederos» cuando lo nombra.", { priority: "low", underDialogue: true, variantIndex: 2 }),

  // ── g04 · las sedes (click seco: son puntos que se encienden, no cosas que caen) ──
  // Los tres SIN `variantIndex`, y no por descuido: `ui` no tiene pool de
  // alternas (comprobado — las tres resolvían igualmente a `ui.mp3`), así que
  // pedir variante sugería una variación que no existe. Y aquí es lo correcto:
  // son tres veces LA MISMA acción, un punto que se enciende.
  cue("s-g04-in", "whoosh", "light", 342, 10, "Entra la tarjeta de sedes con «en nuestras sedes».", { priority: "low", underDialogue: true, variantIndex: 2 }),
  cue("s-sede-1", "click", "ui", 354, 6, "Se enciende MEDELLÍN cuando la nombra.", { priority: "low", underDialogue: true }),
  cue("s-sede-2", "click", "ui", 374, 6, "Se enciende CALDAS cuando la nombra.", { priority: "low", underDialogue: true }),
  cue("s-sede-3", "click", "ui", 411, 6, "Se enciende el ORIENTE ANTIOQUEÑO cuando lo nombra.", { priority: "low", underDialogue: true }),

  // ── g05 · la pregunta que se vuelve respuesta ──
  cue("s-g05-in", "whoosh", "light", 446, 10, "Entra la objeción «¿aún no has llevado tu aporte?».", { priority: "low", underDialogue: true }),
  cue("s-flip", "whoosh", "whip", 582, 10, "El whip es el sonido del volteo de una ranura: la pregunta se sustituye por «todavía tenemos tiempo».", { priority: "low", underDialogue: true }),

  // ── g06 · el camión ──
  cue("s-fecha", "impact", "pop", 667, 8, "Entra «A FIN DE MES» con la fecha dicha.", { priority: "low", underDialogue: true, variantIndex: 1 }),
  cue("s-camion", "whoosh", "swoosh", 692, 14, "Un swoosh y no un impacto: el camión SALE, no llega. El movimiento es la idea.", { priority: "low", underDialogue: true, variantIndex: 1, direction: "right" }),

  // ── (786–888: sin SFX. Deja de hablar de logística; lo lleva su cara.) ──

  // ── g07 · quien recibe (entra y calla: los ítems NO llevan pop) ──
  cue("s-g07-in", "whoosh", "light", 888, 10, "Entra la tarjeta de quien recibe. Es el único cue de la toma: los niños y los adultos mayores no se subrayan con efectos.", { priority: "low", underDialogue: true, variantIndex: 1 }),

  // ── g08 · TODO SUMA (impact deep 2/3) ──
  cue("s-g08-in", "whoosh", "light", 1098, 10, "Entra «cualquier ayuda, por menor que sea».", { priority: "low", underDialogue: true, variantIndex: 2 }),
  cue("s-todo-suma", "impact", "deep", 1158, 22, "«TODO SUMA» — el segundo deep, sobre el segundo verde.", { priority: "medium", underDialogue: true }),

  // ── g09 · 8 toneladas de puro amor ──
  cue("s-amor", "whoosh", "swoosh", 1220, 14, "El remate entra con el mismo swoosh del camión: es la misma carga, contada por lo que significa.", { priority: "low", underDialogue: true }),

  // ── g10 · cierre (impact deep 3/3) ──
  cue("s-g10-in", "whoosh", "light", 1318, 10, "Entra la tarjeta de cierre con «Dios los bendiga».", { priority: "low", underDialogue: true, variantIndex: 1 }),
  cue("s-gracias-fin", "impact", "deep", 1374, 24, "«GRACIAS» final — tercer y último deep, cerrando el arco que abrió el primero.", { priority: "medium", underDialogue: true }),
];
