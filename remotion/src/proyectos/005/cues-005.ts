import { cue, type SoundCue } from "../../motor/sound/cues";

/**
 * PLAN DE SONIDO del proyecto 005 (escritura vs registro · 30 fps · 1911 f).
 * Guía: manuales/diseno-sonoro/SKILL.md · recetario por gráfico: recetario-motion-graphics.md
 *
 * LA VOZ MANDA. Toda la pieza es voz en off continua, así que <PistaSonido> va
 * con ducking global y CADA cue lleva `underDialogue`: en un explicador, un SFX
 * que compite con la locución no añade ritmo, tapa el dato.
 *
 * LEY DE MOVIMIENTO DE ESTA PIEZA: papel y tinta. Los materiales mandan sobre el
 * catálogo genérico — `paper` y `pen` antes que un whoosh, porque lo que se ve en
 * pantalla es un recorte de prensa y un rotulador. El único sonido que NO es de
 * papel es el par de impactos graves del principio y el final, que son los dos
 * momentos en registro `cine`: el negro suena distinto que el beige, a propósito.
 *
 * Los `targetFrame` son los de noticia-005.ts. Si se recronometra la voz, estos
 * números se mueven con ella: son el mismo plan visto desde el oído.
 */
export const cues005: SoundCue[] = [
  // ══ GANCHO (cine) ══════════════════════════════════════════════════════════
  // Un solo golpe grave, y nada más durante 4 s. El silencio posterior es parte
  // del gancho: deja que la frase se asiente antes de que empiece la explicación.
  cue("s01-golpe", "impact", "deep", 8, 24, "El desmentido aterriza sobre negro: le da el peso de una sentencia, no de un dato.", {
    priority: "high",
    underDialogue: true,
    hasLongTail: true,
  }),

  // ══ CONTEXTO (entra el papel) ══════════════════════════════════════════════
  // El cambio de cine a papel es el cambio de mundo de la pieza: se marca con el
  // material, no con un whoosh. `paper` ES la transición.
  cue("s02-entra", "whoosh", "light", 130, 14, "Marca el corte de negro a papel: cambia el registro visual y el oído lo acompaña.", {
    priority: "medium",
    underDialogue: true,
  }),
  // Seco y corto: es un "pero", y un "pero" no suena a fanfarria.
  cue("s03-corte", "click", "pen", 205, 10, "Puntúa el desmentido de la toma anterior sin robarle atención a la frase.", {
    priority: "low",
    underDialogue: true,
  }),

  // ══ EXPLICACIÓN ════════════════════════════════════════════════════════════
  // El giro de la pieza: cuatro palabras solas en pantalla. Un `click` limpio
  // marca el punto de inflexión mejor que cualquier riser, que aquí sobraría.
  cue("s04-giro", "click", "camera", 291, 12, "El giro del vídeo («la transfiere el registro») cae en un frame exacto y suena a obturador.", {
    priority: "high",
    underDialogue: true,
  }),
  cue("s05-papel", "texture", "paper", 351, 22, "El recorte de prensa entra: material real, sonido real. Es la toma que sostiene la credibilidad.", {
    priority: "medium",
    underDialogue: true,
    fadeOutFrames: 8,
  }),
  // El rotulador se sincroniza al DIBUJADO, no a la entrada de la toma: el sonido
  // tiene que caer cuando el trazo se ve avanzar (≈ 12 f después del montaje).
  cue("s06-rotulador", "texture", "scribble", 512, 34, "El rotulador amarillo subrayando «inscribiendo el título»: sincroniza con el trazo, no con la toma.", {
    priority: "high",
    underDialogue: true,
    fadeInFrames: 3,
    fadeOutFrames: 10,
  }),

  // ══ CONFLICTO ══════════════════════════════════════════════════════════════
  // Dos chips, dos clicks, con el stagger del gráfico (6 f). Que se oigan como
  // DOS cosas distintas es justo el argumento de la toma.
  cue("s07-chips", "click", "mouse", 678, 10, "Primer chip (notaría): el par de clicks hace audible que son dos oficinas separadas.", {
    priority: "medium",
    underDialogue: true,
  }),
  cue("s07b-chips", "click", "mouse", 690, 10, "Segundo chip (registro), 12 f después: el desfase es lo que se lee como comparación.", {
    priority: "medium",
    underDialogue: true,
    variantIndex: 1,
  }),

  // ══ CLÍMAX ═════════════════════════════════════════════════════════════════
  // El riser TERMINA en el frame en que se dice «sigue siendo quien te vendió»:
  // la anticipación es del oyente, no del gráfico.
  cue("s08-riser", "riser", "low-rumble", 900, 58, "Crece bajo la consecuencia y termina en la palabra clave: prepara el golpe sin anunciarlo.", {
    priority: "high",
    underDialogue: true,
    fadeInFrames: 12,
  }),
  cue("s09-impacto", "impact", "sharp", 985, 18, "El peor escenario («puede volver a vender») cae en seco: es el momento más duro de la pieza.", {
    priority: "high",
    underDialogue: true,
  }),

  // ══ DATOS ══════════════════════════════════════════════════════════════════
  // El contador tiene DOS eventos: el número formándose y el número llegando.
  cue("s10-dato", "texture", "data", 1058, 30, "Textura mientras el contador sube a 2: hace audible que la cifra se está formando.", {
    priority: "medium",
    underDialogue: true,
    fadeOutFrames: 8,
  }),
  cue("s10b-llega", "impact", "sharp", 1090, 14, "El «2 meses» aterriza: cierra el contador para que el plazo se quede fijado.", {
    priority: "medium",
    underDialogue: true,
  }),
  cue("s11-tick", "click", "ui", 1185, 10, "El caso del exterior es un apunte, no un titular: suena a nota al margen.", {
    priority: "low",
    underDialogue: true,
  }),
  // Dos medidores que recorren su barra: una textura continua, no dos golpes.
  cue("s12-medidor", "texture", "digital", 1265, 46, "Los dos medidores recorriendo la horquilla 0,5–1 %: el recorrido ES el dato.", {
    priority: "medium",
    underDialogue: true,
    fadeInFrames: 4,
    fadeOutFrames: 12,
  }),
  cue("s14-tick", "click", "tick", 1548, 10, "Los intereses de mora corren con el tiempo: el tic-tac lo dice sin decirlo.", {
    priority: "low",
    underDialogue: true,
  }),

  // ══ CIERRE ═════════════════════════════════════════════════════════════════
  // `chime` y no `success`: es una instrucción útil, no una celebración.
  cue("s15-accion", "click", "pen", 1656, 12, "La acción concreta (pedir el certificado) se marca como algo que se apunta.", {
    priority: "medium",
    underDialogue: true,
  }),
  // Cierra el arco con el mismo golpe grave del gancho: la pieza vuelve al negro
  // de donde salió, y el oído lo reconoce aunque nadie sepa por qué.
  cue("s16-cierre", "impact", "deep", 1796, 26, "Mismo impacto que abrió la pieza: cierra el círculo del negro al negro.", {
    priority: "high",
    underDialogue: true,
    hasLongTail: true,
  }),
];
