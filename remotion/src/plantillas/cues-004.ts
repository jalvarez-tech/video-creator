/**
 * PLAN DE SONIDO del proyecto 004 (Valle de San Nicolás · **30 fps** · 2205 f).
 * Guía: manuales/diseno-sonoro/SKILL.md · formato: manuales/video-noticias/SKILL.md §7
 * Motor: sound/cues.ts + <PistaSonido>. Cada `id` se corresponde con el
 * `soundCueId` de su toma en noticia-004.ts.
 *
 * COHERENCIA MATERIAL (§3.6). El mundo de esta pieza es PAPEL Y DATO: prensa
 * económica, sliders, cifras que se forman. El vocabulario es, por tanto:
 *   · cifra que se forma          → `data` (textura mientras cuenta)
 *   · cifra que aterriza bien     → `chime`
 *   · cifra que aterriza MAL      → `sharp` (transiente seco, sin cola alegre)
 *   · chip que entra              → `pop` (rotando el POOL para no repetir)
 *   · opción negada               → `error`
 *   · control / slider            → `ui`
 *   · negocio cerrado             → `money`
 *   · giro de la pieza / registro cine → `deep`
 *   · anticipación al problema    → `low-rumble` (riser)
 * PROHIBIDO en esta pieza: cartoon, boing, glitch, sparkle, liquid. Es
 * periodismo económico, no una pieza de redes: un boing aquí destruye la
 * credibilidad que el formato entero está intentando construir (§7 corporate).
 *
 * UN ANCLA POR TOMA (video-noticias §7.2). El formato ya corta cada 3-5 s; si
 * cada corte trajera whoosh + impact + pop, en 20 segundos sería ruido. Cada
 * toma sonoriza SU momento reconocible y nada más. Las cuatro tomas que llevan
 * dos cues son las que tienen dos eventos REALES (la cifra que cuenta y luego
 * aterriza; los dos chips que entran con stagger), no dos capas del mismo gesto.
 *
 * MEZCLA (§10). Hay narración continua de principio a fin, así que:
 *   <PistaSonido cues={cues004} duckDb={-5} />
 * y `underDialogue: true` en TODOS los cues. Los efectos se SIENTEN, no se
 * escuchan: si en la mezcla final identificas el efecto antes que la palabra,
 * está alto.
 */
import { cue, SoundCue } from "./sound/cues";

export const cues004: SoundCue[] = [
  // ── GANCHO ────────────────────────────────────────────────────────────────
  // Registro cine desde el frame 0: el golpe grave abre la pieza y planta la
  // afirmación. Es el único cue con prioridad alta del primer tercio.
  cue("s01-hook", "impact", "deep", 6, 20, "El titular del gancho aterriza: da peso a la afirmación que el vídeo va a desmentir.", {
    priority: "high",
    underDialogue: true,
    hasLongTail: true,
  }),

  // El −25 % tiene DOS eventos reales: el número contando y el número llegando.
  // El aterrizaje es `sharp`, no `chime`: es una mala noticia y un ding alegre
  // aquí contradiría lo que dice la voz.
  cue("s02-caida-data", "texture", "data", 100, 40, "Textura mientras la cifra baja: hace audible que el número se está formando.", {
    priority: "medium",
    underDialogue: true,
    fadeOutFrames: 8,
  }),
  cue("s02-caida", "impact", "sharp", 134, 14, "El −25 % aterriza. Transiente seco: es la cifra que rompe la creencia del gancho.", {
    priority: "high",
    underDialogue: true,
  }),

  // ── CONTEXTO ──────────────────────────────────────────────────────────────
  // Primer cambio de registro (cine → papel). Un whoosh ligero marca que entramos
  // al mundo que explica; sin él, el salto de negro a beige se lee como un fallo.
  cue("s03-valle", "whoosh", "light", 236, 12, "Marca el cambio de registro a papel: entramos al mundo que explica.", {
    priority: "medium",
    underDialogue: true,
  }),
  cue("s04-oferta", "texture", "data", 366, 40, "El 19 % se forma: la textura sostiene la lectura del dato de escala.", {
    priority: "medium",
    underDialogue: true,
    fadeOutFrames: 8,
  }),

  // ── CONFLICTO ─────────────────────────────────────────────────────────────
  // Dos chips = dos entradas con stagger de 6 f. Se rota el POOL de `pop` para
  // que no suenen idénticos (§12): dos pops iguales seguidos se oyen como eco.
  cue("s05-chips", "click", "pop", 502, 10, "Entra el chip 'Fincas de recreo' (la opción que queda atrás).", {
    priority: "low",
    underDialogue: true,
  }),
  cue("s05-chips-b", "click", "pop", 508, 10, "Entra 'Multifamiliar': el par completo es lo que hace la comparación.", {
    priority: "low",
    underDialogue: true,
    variantIndex: 1,
  }),

  // Tres razones, tres pops escalonados. Es el momento más "lista" de la pieza,
  // así que el ritmo del sonido ES la lectura.
  cue("s06-chips", "click", "pop", 634, 10, "Entra 'Aire limpio'.", { priority: "low", underDialogue: true }),
  cue("s06-chips-b", "click", "pop", 640, 10, "Entra 'Aeropuerto'.", { priority: "low", underDialogue: true, variantIndex: 1 }),
  cue("s06-chips-c", "click", "pop", 646, 10, "Entra 'Teletrabajo': cierra las tres razones del artículo.", {
    priority: "low",
    underDialogue: true,
    variantIndex: 2,
  }),

  // ── EXPLICACIÓN ───────────────────────────────────────────────────────────
  // El giro de la pieza. Comparte timbre con el gancho (`deep`) a propósito:
  // son los dos momentos en que la pieza afirma algo, y sonar igual los enlaza.
  cue("s07-giro", "impact", "deep", 780, 20, "El giro de la tesis ('no se frenó el deseo') aterriza con el mismo peso que el gancho.", {
    priority: "high",
    underDialogue: true,
    hasLongTail: true,
  }),

  // El segundo chip está APAGADO (no puede pagar): suena `error`, no `pop`.
  // El sonido dice lo mismo que el gris del chip — esa redundancia es
  // deliberada, es el punto de la escena.
  cue("s08-quiere", "click", "pop", 906, 10, "Entra 'Quiere comprar': el deseo sigue intacto.", {
    priority: "low",
    underDialogue: true,
    variantIndex: 2,
  }),
  cue("s08-negacion", "click", "error", 913, 14, "'Puede pagar' entra apagado: el sonido de negación dice lo mismo que el gris del chip.", {
    priority: "medium",
    underDialogue: true,
  }),

  // La prueba del mecanismo. Aquí SÍ va `chime`: el suelo SUBE, y es la buena
  // noticia que demuestra que la demanda no se fue.
  cue("s09-suelo-data", "texture", "data", 1046, 34, "El +6,7 % se forma.", {
    priority: "medium",
    underDialogue: true,
    fadeOutFrames: 8,
  }),
  cue("s09-suelo", "impact", "chime", 1080, 16, "El suelo llega a +6,7 %: es la prueba de que el mercado no se apagó.", {
    priority: "high",
    underDialogue: true,
  }),

  // ── DATOS ─────────────────────────────────────────────────────────────────
  // Cuatro tomas de dato seguidas: si las cuatro sonaran `data`, sería un
  // preset repetido (§12) y el oído dejaría de distinguirlas. Cada una toma el
  // timbre de LO QUE MIDE.
  cue("s10-sliders", "click", "ui", 1173, 12, "Aparecen los controles: timbre de interfaz porque lo que se ve es un slider.", {
    priority: "medium",
    underDialogue: true,
  }),
  cue("s10-sliders-data", "texture", "data", 1181, 40, "Los dos porcentajes de valorización recorren su escala.", {
    priority: "low",
    underDialogue: true,
    fadeOutFrames: 10,
  }),
  cue("s11-negocios", "texture", "money", 1327, 34, "13.540 negocios CERRADOS: el timbre de dinero es el más específico para una transacción.", {
    priority: "medium",
    underDialogue: true,
    fadeOutFrames: 10,
  }),
  cue("s12-stock", "texture", "data", 1482, 38, "Las 3.985 viviendas se cuentan: vuelve el timbre neutro para el dato de inventario.", {
    priority: "low",
    underDialogue: true,
    fadeOutFrames: 8,
  }),
  cue("s13-preventa", "click", "tick", 1626, 12, "El 77 % en preventa: un tick seco, porque es una advertencia y no una celebración.", {
    priority: "medium",
    underDialogue: true,
  }),

  // ── CLÍMAX ────────────────────────────────────────────────────────────────
  // La concentración es el primer dato malo del bloque: cuenta y aterriza seco.
  cue("s14-conc-data", "texture", "data", 1737, 36, "El 91 % se forma.", {
    priority: "low",
    underDialogue: true,
    fadeOutFrames: 8,
  }),
  cue("s14-concentracion", "impact", "sharp", 1773, 14, "El 91 % aterriza: mismo timbre seco que el −25 % porque es la otra mala noticia de la pieza.", {
    priority: "high",
    underDialogue: true,
  }),

  // Riser: el crescendo TERMINA en el frame de entrada del titular (§3.1), así
  // que anticipa el problema en vez de comentarlo después.
  cue("s15-riser", "riser", "low-rumble", 1871, 30, "Anticipa el cuello de botella del territorio: el crescendo cierra justo cuando entra el titular.", {
    priority: "medium",
    underDialogue: true,
    fadeInFrames: 8,
  }),

  // Vuelta al registro cine para el coste social. `deep` otra vez: es la tercera
  // y última afirmación grande de la pieza.
  cue("s16-brecha", "impact", "deep", 2016, 22, "Vuelta a negro para el coste social: cierra la terna de afirmaciones de la pieza.", {
    priority: "high",
    underDialogue: true,
    hasLongTail: true,
  }),

  // ── CIERRE ────────────────────────────────────────────────────────────────
  // Único cue SIN underDialogue de toda la pieza: aquí ya no hay voz, así que
  // el golpe puede respirar a su volumen real y apagarse con el vídeo.
  // `volume` explícito, el único de la pieza. La calibración por defecto (0.047)
  // está pensada para un impact que compite CON la voz; aquí no hay voz, y a ese
  // nivel el remate se medía en −45 dBFS, o sea inaudible. Medido tras subirlo:
  // ver proyectos/004/artefactos/01-noticia.md § validación.
  cue("s17-cierre", "impact", "deep", 2150, 55, "El remate '¿Alcanza?' se queda solo: sin voz encima, la cola cierra la pieza.", {
    priority: "high",
    volume: 0.42,
    fadeOutFrames: 22,
    hasLongTail: true,
  }),
];
