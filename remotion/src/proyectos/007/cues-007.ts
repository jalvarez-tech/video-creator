import { cue, type SoundCue } from "../../motor/sound/cues";

/**
 * PLAN DE SONIDO del proyecto 007 v3 (cómo reclamar el seguro · 30 fps · 2417 f).
 * Guía: manuales/diseno-sonoro/SKILL.md · recetario: recetario-motion-graphics.md
 *
 * LA VOZ MANDA: ducking global y `underDialogue` en cada cue.
 *
 * ── LA LEY DE MOVIMIENTO: LA ESCALERA DE PASOS ─────────────────────────────
 * Los cinco pasos aterrizan cada uno con un click DISTINTO y motivado — el
 * oído cuenta los pasos sin leer los kickers:
 *
 *   paso 1  `ui`      avisar: un trámite que se inicia
 *   paso 2  `camera`  documentar: el obturador es el gesto literal
 *   paso 3  `mouse`   no reparar: una instrucción que se acata
 *   paso 4  `pen`     presentar la reclamación: se hace por escrito
 *   paso 5  `tick`    el mes de la aseguradora: el reloj corre para ellos
 *
 * `tick` queda reservado a los PLAZOS (tres días, un mes): tiempo legal.
 *
 * ── LO QUE ESTA PIEZA NO SE PERMITE ────────────────────────────────────────
 * El hecho de fondo sigue siendo un sismo con víctimas: nada de `sparkle`,
 * `success`, `coin` ni `chime`. El excedente aterriza con pop neutro.
 * Dos `deep` (prescripción y cierre) y un solo `sharp` («Cinco pasos.»).
 *
 * ── Y UN SILENCIO A PROPÓSITO ──────────────────────────────────────────────
 * `n13a-ruta` («la ruta ya está escrita») va SIN cue, como el n11b del 006.
 *
 * `targetFrame`s medidos sobre la voz real (generar-vo.sh 2026-08-11, v3).
 */
export const cues007: SoundCue[] = [
  // ══ GANCHO ═════════════════════════════════════════════════════════════════
  cue("s01-abre", "whoosh", "light", 4, 14, "Entra el aéreo residencial: un corte de aire, no un anuncio de drama.", {
    priority: "medium",
    underDialogue: true,
  }),

  // ══ CONTEXTO — primero la escala, después la norma ═════════════════════════
  cue("s05-zonas", "whoosh", "light", 109, 14, "El giro hacia el dato: prepara la cifra sin anunciarla.", {
    priority: "low",
    underDialogue: true,
    variantIndex: 1,
  }),
  cue("s06-cifra", "texture", "data", 192, 30, "El 442 mil formándose: es un dato de registro asegurador y suena a medición, no a drama.", {
    priority: "medium",
    underDialogue: true,
    fadeOutFrames: 10,
  }),
  cue("s03-amparo", "click", "pen", 315, 12, "La norma escrita (EOSF art. 101): el pen es el material de lo legislado.", {
    priority: "medium",
    underDialogue: true,
  }),
  cue("s04-obligatorio", "click", "pen", 483, 12, "«Amparo obligatorio», el término exacto: se marca como lo que está escrito.", {
    priority: "medium",
    underDialogue: true,
    variantIndex: 1,
  }),

  // ══ CONFLICTO — el cambio de marcha ════════════════════════════════════════
  cue("s07-pasos", "impact", "sharp", 533, 16, "«Cinco pasos»: el cambio de marcha de la pieza. El oído sabe que empieza lo útil.", {
    priority: "high",
    underDialogue: true,
  }),

  // ══ EXPLICACIÓN — la escalera de pasos (ver cabecera) ══════════════════════
  cue("s08-paso1", "click", "ui", 609, 10, "Paso 1 (avisar): un trámite que se inicia — primer peldaño de la escalera.", {
    priority: "medium",
    underDialogue: true,
  }),
  cue("s09-tres-dias", "click", "tick", 740, 10, "«Tres días»: el primer plazo legal suena a reloj, no a botón. Tick = tiempo de ley.", {
    priority: "high",
    underDialogue: true,
    variantIndex: 1,
  }),
  cue("s10-paso2", "click", "camera", 839, 12, "Paso 2 (documentar): el obturador es el gesto literal que Fasecolda pide.", {
    priority: "medium",
    underDialogue: true,
  }),
  cue("s11-facturas", "texture", "paper", 911, 20, "Los recibos de la foto: material real de «facturas y soportes».", {
    priority: "medium",
    underDialogue: true,
    fadeOutFrames: 8,
    variantIndex: 1,
  }),
  cue("s12-paso3", "click", "mouse", 1045, 10, "Paso 3 (no reparar): una instrucción que se acata — más cuerpo que el ui del paso 1.", {
    priority: "medium",
    underDialogue: true,
  }),
  cue("s13-salvo", "click", "ui", 1176, 10, "La excepción apenas se puntúa: es matiz, no titular.", {
    priority: "low",
    underDialogue: true,
    variantIndex: 1,
  }),
  cue("s14-paso4", "click", "pen", 1270, 12, "Paso 4 (presentar la reclamación): se hace por escrito, y el pen lo dice.", {
    priority: "medium",
    underDialogue: true,
    variantIndex: 2,
  }),
  cue("s15-prueba", "click", "pen", 1409, 12, "«La prueba es del asegurado» (art. 1077): la carga se anota, es de quien reclama.", {
    priority: "medium",
    underDialogue: true,
    variantIndex: 1,
  }),

  // ══ DATOS — los plazos que atan a la aseguradora ═══════════════════════════
  cue("s16-paso5", "click", "tick", 1495, 10, "Paso 5: el reloj ahora corre contra la aseguradora — el mismo tick de los plazos.", {
    priority: "high",
    underDialogue: true,
  }),
  cue("s17-mora", "click", "mouse", 1599, 10, "La mora: consecuencia seca, sin drama — el dato ya pesa solo.", {
    priority: "medium",
    underDialogue: true,
    variantIndex: 1,
  }),
  cue("s18-saldo", "click", "pop", 1684, 10, "El orden de cobro aterriza: primero el banco, hasta el saldo.", {
    priority: "low",
    underDialogue: true,
    variantIndex: 1,
  }),
  cue("s19-excedente", "click", "pop", 1792, 10, "«El excedente es del propietario»: buena noticia con pop neutro — sin fanfarria sobre un desastre.", {
    priority: "medium",
    underDialogue: true,
    variantIndex: 2,
  }),

  // ══ CLÍMAX — remedios y letra pequeña ══════════════════════════════════════
  cue("s20-objetan", "whoosh", "light", 1861, 12, "«¿Objetan o callan?»: el giro al bloque de remedios, dicho como aire.", {
    priority: "medium",
    underDialogue: true,
  }),
  cue("s21-defensor", "click", "ui", 1898, 10, "El defensor: un trámite más que se abre, y es gratuito — suena a puerta, no a pleito.", {
    priority: "medium",
    underDialogue: true,
  }),
  // GOLPE 1 DE 2: el único dato que puede costar el derecho entero.
  cue("s22-prescribe", "impact", "deep", 2048, 24, "«Prescribe en dos años»: el reloj que sí puede quitar el derecho cae con peso y cola.", {
    priority: "high",
    underDialogue: true,
    hasLongTail: true,
  }),
  cue("s23-certificado", "texture", "paper", 2117, 20, "Los papeles del certificado sobre la mesa: el material del documento que la foto enseña.", {
    priority: "medium",
    underDialogue: true,
    fadeOutFrames: 8,
  }),
  cue("s24-copia", "click", "ui", 2270, 10, "«Se puede pedir copia»: el clímax baja y el sonido vuelve al tic más leve.", {
    priority: "low",
    underDialogue: true,
    variantIndex: 1,
  }),

  // ── n13a-ruta VA EN SILENCIO. Ver la cabecera. ─────────────────────────────

  // ══ CIERRE ═════════════════════════════════════════════════════════════════
  // GOLPE 2 DE 2. La cola se apaga con el vídeo.
  cue("s25-cierre", "impact", "deep", 2367, 30, "«Tu póliza»: cierra en negro con el golpe que la pieza reserva para lo que pesa.", {
    priority: "high",
    underDialogue: true,
    hasLongTail: true,
  }),
];
