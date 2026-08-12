import { cue, type SoundCue } from "../../motor/sound/cues";

/**
 * PLAN DE SONIDO del proyecto 006 (grietas tras el sismo · 30 fps · 2409 f).
 * Guía: manuales/diseno-sonoro/SKILL.md · recetario: recetario-motion-graphics.md
 *
 * LA VOZ MANDA. La pieza es voz en off continua de principio a fin, así que
 * <PistaSonido> va con ducking global y CADA cue lleva `underDialogue`: en un
 * explicador, un SFX que compite con la locución no añade ritmo, tapa el dato.
 *
 * ── LA LEY DE MOVIMIENTO DE ESTA PIEZA: LA ESCALERA DE RIESGO ──────────────
 * Lo que este plan tiene y el del 005 no es que el sonido CLASIFICA. La pieza
 * sube por cuatro escalones de gravedad (fisura → vertical → horizontal →
 * diagonal) y el oído los distingue antes que el ojo lea la etiqueta:
 *
 *   riesgo bajo            `click ui`      apenas un tic de interfaz
 *   riesgo bajo-moderado   `click mouse`   más presente, aún doméstico
 *   riesgo moderado-alto   `click pen`     ya es una marca que alguien hace
 *   riesgo alto            `impact sharp`  deja de ser una anotación
 *
 * No es decoración: es el mismo dato que dan el kicker y el color del acento,
 * por un canal que no exige leer. Si algún día se reordenan los escalones, estos
 * cuatro cues se reordenan con ellos o el sonido miente.
 *
 * ── LO QUE ESTA PIEZA NO SE PERMITE ────────────────────────────────────────
 * El hecho de fondo tiene muertos del mismo día, aunque la pieza ya no los cite.
 * El banco tiene `sparkle`, `success`, `coin` y `chime` y ninguno entra aquí: son
 * sonidos de premio, y sobre un desastre suenan a celebrar el tráfico.
 *
 * Los DOS impactos graves (`impact deep`) son los únicos golpes de peso y marcan
 * exactamente dos momentos: «pueden fallar sin previo aviso» y el cierre. Hubo un
 * tercero —el recuento de fallecidos— y se fue con su toma; el reparto quedó
 * mejor, porque el sonido más pesado del banco ya no se gasta tres veces.
 *
 * ── Y UN SILENCIO A PROPÓSITO ──────────────────────────────────────────────
 * `n11b-limite` («este vídeo no reemplaza una inspección») es la única toma sin
 * cue. Es la frase que más se juega la pieza y el silencio la separa de todo lo
 * demás mejor que cualquier efecto — poner uno sería tratarla como una más.
 *
 * Los `targetFrame` son los de noticia-006.ts, ya recronometrados sobre la voz
 * real. Si se relocuta, estos números se mueven con ella: son el mismo plan
 * visto desde el oído.
 */
export const cues006: SoundCue[] = [
  // ══ GANCHO ═════════════════════════════════════════════════════════════════
  // La pieza abre en PAPEL, no en golpe. Un impacto grave sobre «tras el sismo»
  // sería la banda sonora del desastre, que es justo lo que el artefacto se
  // prohíbe. El material dice lo que la pieza es: un artículo que se abre.
  cue("s01-abre", "texture", "paper", 4, 22, "Abre en material de papel: la pieza se presenta como artículo, no como reconstrucción del sismo.", {
    priority: "medium",
    underDialogue: true,
    fadeOutFrames: 8,
  }),
  // Seco y corto: es el giro del gancho («no todas significan lo mismo»), y un
  // giro no suena a fanfarria.
  cue("s02-giro", "click", "pen", 100, 10, "Puntúa la promesa del vídeo: hay una diferencia y se puede aprender a verla.", {
    priority: "high",
    underDialogue: true,
  }),

  // ══ CONTEXTO ═══════════════════════════════════════════════════════════════
  // La magnitud SÍ lleva textura de datos: 7,4 es una medida de instrumento, y
  // el conteo de `CifraContada` dura 34 f desde el frame 4 de la toma.
  cue("s03-magnitud", "texture", "data", 157, 34, "El 7,4 formándose: es una lectura de sismógrafo y suena a medición, no a drama.", {
    priority: "medium",
    underDialogue: true,
    fadeOutFrames: 10,
  }),
  // AQUÍ IBA `s04-balance`: el golpe grave del recuento de fallecidos. Se fue con
  // su toma. Y con él se fue uno de los tres impactos graves de la pieza, así que
  // ahora solo quedan dos —«sin previo aviso» y el cierre—, que es incluso mejor
  // reparto: el golpe más pesado del banco marca ahora exactamente dos momentos,
  // no tres.
  cue("s05-recorte", "texture", "paper", 259, 22, "El recorte de El Colombiano entra: material real, sonido real. Es la toma que sostiene la credibilidad.", {
    priority: "medium",
    underDialogue: true,
    fadeOutFrames: 8,
  }),

  // ══ EXPLICACIÓN — la escalera de riesgo ════════════════════════════════════
  // La palabra «forma» va en acento naranja; el click cae sobre ella, no sobre
  // la entrada de la toma.
  cue("s06-forma", "click", "pen", 346, 12, "Marca la palabra «forma», que es la tesis del bloque entero: la geometría es el diagnóstico.", {
    priority: "high",
    underDialogue: true,
    variantIndex: 1,
  }),
  // ESCALÓN 1 — riesgo bajo. El sonido más leve del banco que sigue siendo audible.
  cue("s07-bajo", "click", "ui", 412, 10, "Primer escalón de la escalera de riesgo: apenas un tic, porque la fisura apenas es nada.", {
    priority: "low",
    underDialogue: true,
  }),
  cue("s08-superficial", "click", "pop", 511, 10, "El remate tranquilizador («no tocan la estructura») aparece con un pop blando: es una buena noticia.", {
    priority: "low",
    underDialogue: true,
  }),
  // ESCALÓN 2 — bajo a moderado.
  cue("s09-moderado", "click", "mouse", 615, 10, "Segundo escalón: más cuerpo que el tic anterior, todavía doméstico.", {
    priority: "low",
    underDialogue: true,
  }),
  // El tic-tac dice «esto se vigila con el tiempo» sin que nadie lo diga.
  cue("s10-vigilar", "click", "tick", 715, 10, "El seguimiento en el tiempo: el tic-tac lo dice sin decirlo, como los intereses de mora del 005.", {
    priority: "low",
    underDialogue: true,
  }),
  // ESCALÓN 3 — moderado a alto. Ya es una marca que alguien hace.
  cue("s11-alto", "click", "pen", 792, 12, "Tercer escalón: el rotulador. A partir de aquí la grieta es algo que se anota, no algo que se mira.", {
    priority: "medium",
    underDialogue: true,
  }),
  // Un empuje se oye como un empuje: el whoosh es material, no una transición.
  cue("s12-empujes", "whoosh", "light", 897, 14, "«Empujes o deformaciones»: el sonido es la fuerza que describe, no el corte entre tomas.", {
    priority: "medium",
    underDialogue: true,
  }),

  // ══ CONFLICTO — el caso grave ══════════════════════════════════════════════
  // ESCALÓN 4 — riesgo alto. La escalera deja de ser de clicks.
  cue("s13-grave", "impact", "sharp", 1007, 16, "Cuarto escalón: rompe la serie de clicks. El oído sabe que hemos cambiado de categoría antes de leer el kicker.", {
    priority: "high",
    underDialogue: true,
  }),
  // EL ÚNICO RISER DE LA PIEZA, y termina EXACTAMENTE donde empieza la toma de
  // «pueden fallar súbitamente». La anticipación es del oyente, no del gráfico.
  // Un riser en cualquier otro sitio de esta pieza sería suspense gratuito; aquí
  // prepara la única frase que puede hacer que alguien salga de su casa.
  // 1187 y no 1188: `revisaMontaje` exige que el cue dispare DENTRO de la ventana
  // de su toma, y la de `n08b-donde` es [1120,1188) — el extremo está excluido.
  // Un frame antes es inaudible y mantiene el cue enganchado a la toma que lo
  // justifica, en vez de colgarlo de la siguiente (que ya tiene el suyo).
  cue("s14-riser", "riser", "low-rumble", 1187, 58, "Crece bajo «sobre muros, vigas o columnas» y termina en el corte a la frase crítica: prepara el golpe sin anunciarlo.", {
    priority: "high",
    underDialogue: true,
    fadeInFrames: 12,
  }),
  cue("s15-sin-aviso", "impact", "deep", 1194, 24, "«Pueden fallar súbitamente»: el momento más duro de la pieza cae en seco y con cola.", {
    priority: "high",
    underDialogue: true,
    hasLongTail: true,
  }),

  // ══ DATOS ══════════════════════════════════════════════════════════════════
  // El obturador: «esto se anota». El 2-3 mm es un titular, no un contador, así
  // que no lleva textura de datos — no hay número formándose que sonorizar.
  cue("s16-umbral", "click", "camera", 1302, 12, "El único número accionable aterriza como una foto que se toma: es lo que hay que recordar.", {
    priority: "high",
    underDialogue: true,
  }),
  cue("s17-llamar", "click", "pen", 1430, 12, "La acción concreta (contactar a un ingeniero) se marca como algo que se apunta.", {
    priority: "medium",
    underDialogue: true,
  }),
  // Reencuadre: el whoosh acompaña el giro de «grietas» a «todo lo demás».
  cue("s18-reencuadre", "whoosh", "light", 1544, 14, "Marca el giro del bloque: quien solo busca grietas se pierde la mitad de las señales.", {
    priority: "medium",
    underDialogue: true,
    variantIndex: 1,
  }),
  // Tres chips, tres pops con el `paso: 5` de la fila. Que se oigan como TRES
  // cosas distintas es justo el argumento de la toma: son señales del mismo
  // rango, no una secuencia.
  cue("s19a-chip", "click", "pop", 1637, 10, "Primer chip (puertas): el trío de pops hace audible que son tres señales del mismo rango.", {
    priority: "low",
    underDialogue: true,
  }),
  cue("s19b-chip", "click", "pop", 1642, 10, "Segundo chip (muros), 5 f después: el desfase es lo que se lee como enumeración.", {
    priority: "low",
    underDialogue: true,
    variantIndex: 1,
  }),
  cue("s19c-chip", "click", "pop", 1647, 10, "Tercer chip (placas): cierra la fila y con ella el bloque de señales.", {
    priority: "low",
    underDialogue: true,
    variantIndex: 2,
  }),

  // ══ CLÍMAX — que aquí BAJA la tensión ══════════════════════════════════════
  // Vuelve al tic más leve del banco, el mismo del riesgo bajo: la pieza se
  // desinfla a propósito justo donde el formato pediría apretar.
  cue("s20-sin-formula", "click", "ui", 1773, 10, "El clímax baja la tensión y el sonido baja con él: vuelve al tic del escalón más leve.", {
    priority: "low",
    underDialogue: true,
    variantIndex: 1,
  }),

  // ── n11b-limite VA EN SILENCIO. Ver la cabecera del archivo. ───────────────

  // ══ CIERRE ═════════════════════════════════════════════════════════════════
  // El 123 suena a interfaz, no a sentencia: es un número que se marca en un
  // teléfono. Un impacto grave aquí convertiría una ruta útil en un final trágico.
  cue("s21-linea", "click", "ui", 2032, 12, "El 123 aparece con un tic de interfaz: es un número que se marca, no un veredicto.", {
    priority: "medium",
    underDialogue: true,
  }),
  cue("s22-gratuita", "click", "pen", 2160, 10, "«Inspección gratuita» es el dato que quita la excusa del coste: se apunta.", {
    priority: "medium",
    underDialogue: true,
    variantIndex: 1,
  }),
  // Cierra la pieza con el mismo golpe grave del balance y de «sin previo
  // aviso»: los tres momentos en que esto deja de ser información y pasa a ser
  // consecuencia. La cola se apaga con el vídeo.
  cue("s23-cierre", "impact", "deep", 2296, 30, "Cierra en negro con el golpe que la pieza reserva para lo que de verdad pesa.", {
    priority: "high",
    underDialogue: true,
    hasLongTail: true,
  }),
];
