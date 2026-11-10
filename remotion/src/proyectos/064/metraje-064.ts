/**
 * EL RECORRIDO 064 — «Lote en San Vicente Ferrer (vereda La Porquera)», V46 del registro y SEGUNDO de los tres reels de este lote, «NO HACE FALTA IRSE LEJOS» — los planos, como DATOS.
 *
 * REV. 1 (2026-10-22, encargo del usuario por la sesión madre; la rev. 0 se descartó): el lote no tiene recorrido a pie, solo dron, y de mitad queda UNA toma. El usuario pidió ser creativos: partir el «ven, te
 * muestro» de las tomas de hook y usarlo como PUENTE al dron, y donde ella dice «te muestro» meter un INFOGRÁFICO con los datos de la ficha. Reparto 063-065 rev. 2 (`proyectos/063/reparto-063-065.md`, que manda).
 *
 *   hook A   HK02 (`Hook2.mp4`) 6,97-13,38 s   «¿Un lote cerca de Medellín por 350 millones? Sí, y tiene 3.244 metros cuadrados.»
 *   hook B   HK02 (`Hook2.mp4`) 13,92-14,55 s  «Ven, te muestro.»                      (A CORTE sobre su propia imagen, con un empuje: es un salto de 0,23 s que se lee como una decisión)
 *   mitad    HK05 (`Hook5.mp4`, el antiguo `medio2`) 7,28-12,45 s   «No necesitas estar a tres horas de Medellín para tener 3.244 metros cuadrados.»
 *   CTA      CT03 (`cta3.mp4`) 6,57-12,86 s    «Si estás buscando tierra cerca de Medellín, escríbeme y te envío todos los detalles para que conozcas este asombroso lote.»
 *
 * LA IDEA EN UNA LÍNEA. Este lote es PARA QUIEN CREE QUE PARA TENER TIERRA HAY QUE IRSE LEJOS. El hook pone las dos cifras (350 millones y 3.244 metros: se escriben las dos), «ven, te muestro» invita al dron, la
 * INFOGRAFÍA de DISTANCIAS responde lo que ella no dice —1 hora de Medellín y 15 minutos de la autopista Medellín-Bogotá: los números que la voz no dice, no los que ya dijo—, la mitad le quita el miedo a las tres
 * horas («no necesitas estar a tres horas de Medellín para tener 3.244 metros cuadrados») y el CTA es una sola acción desde el teléfono. La ficha NO da energía, uso del suelo ni tipo de vía, y dice que el uso depende
 * de la normativa: nada de eso ni «apto para construir». Acueducto y escrituras van al caption y a la versión con ficha.
 *
 *   bloque 1  c01                  la APERTURA: DR03, de la ladera con el cultivo en hilera y la cerca viva (SIN TEXTO NI VOZ)
 *   bloque 2  c02a c02b            Isabella camina hacia cámara por la ladera: el hook (A, disolviendo) y «Ven, te muestro» (B, a corte, con empuje)
 *   bloque 3  c03a c03b            el DRON bajo la INFOGRAFÍA de distancias: la parte plana en cenital y la cerca viva con las flores (DR03), tras «te muestro»
 *   bloque 4  c04                  Isabella en la ladera con las casas al fondo: la mitad (HK05)
 *   bloque 5  c05a c05b            el DRON de DR01 (24-48 s): el horizonte con las casas y el cultivo (c05a) → LA VISTA, 4,6 s: las montañas con la tierra roja y el cultivo (c05b, el plano más largo)
 *   bloque 6  c06 c07              Isabella en el campo con el cielo detrás: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO: LA VOZ Y LA CAÍDA DE LA CANCIÓN. «Cornfield Chase» (órgano y arpegios, biblioteca del repo) es un crescendo de 127 s con 42 s de intro casi muda, SIN pulso (sus golpes son notas de arpegio de
 * 6-10 dB), y su final es una CAÍDA NATURAL a silencio entre 120 y 125 s. La pieza entra a los 86,533 s: el golpe de 9,9 dB de 86,583 s —el más fuerte de la sección— abre la pieza (f3), la caída cae justo donde entra el
 * CTA (f1007) y el clímax (−9,6 LUFS, 112-120 s) cae sobre el bloque 5. Los golpes de abajo son los MEDIDOS (`proyectos/064/musica/golpes-cancion-60-127.json`, `medir-pista.py --json`): el único CORTE SECO de la
 * pieza (el empuje a «Ven, te muestro») cae en el de 8,8 dB; las disolvencias son libres, y las que ACABAN en un golpe lo hacen en uno de ≥ 6,7 dB.
 *
 * LOS DRONES. Dos de los cuatro que dejó el usuario (2026-09-11, 4K a 29,97 fps, sin audio, VERTICALES con `rotation=90`): DR03 ENTERO (la apertura y el fondo de la infografía) y DR01 en su tramo 24,5-47,6 s (los otros
 * tramos de DR01 son de la 063 y la 065). A 29,97 fps `fps=30` repite un fotograma cada ≈ 33 s (`dji-2997-fotograma-repetido`): `normalizar.mjs` los reproduce un 0,1 % más rápido y el `desde` del plan va en el
 * tiempo del MP4 normalizado.
 *
 * LAS TOMAS DE ISABELLA SON ANAMÓRFICAS (SAR 81:256, 1920×1080 = 9:16 comprimido): se escalan ENTERAS a 1296×2304 y NUNCA se recortan (`normalizar.mjs`; 047 y 050). Cada toma trae ≈ 7 s de silencio al principio (ella se
 * coloca y camina hacia cámara): el plan entra DIRECTAMENTE en el tramo hablado.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(196)` = 196/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella es opaca en el f117 (3,9 s) y su primera palabra suena en el f130.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma. Con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg
 * (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-064.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-064";

export const FPS_064 = 30;

export type Entrada = "corte" | "disolver";
export type Bloque = 1 | 2 | 3 | 4 | 5 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. `s0`/`s1`, medidos por energía (perfil de 5-10 ms en la banda de voz) y por arranques de sílaba; `lufs`, con ebur128 sobre el WAV TRATADO que suena. */
export interface VozDelCorte {
  /** Segundo de la fuente en que empieza a hablar. */
  s0: number;
  /** Segundo de la fuente en que termina SU frase (la toma puede seguir: se corta aquí). */
  s1: number;
  /** Sonoridad integrada de la voz TRATADA en esa ventana (LUFS). */
  lufs: number;
  /** Lo que dice, tal como está en el guion. Solo para leer el plan. */
  dice: string;
}

export interface Corte extends CorteDelFormato<Entrada> {
  /** `foto` solo para la tarjeta oscura del cierre (`c07-cierre`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella: el WAV de su voz TRATADA (`<toma>-voz.wav`, `normalizar.mjs`). */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido del usuario desde la V9: «mientras habla Isabella sube los decibeles sin saturar»). Las voces crudas llegan a −24,6 · −23,2 · −24,4 LUFS en su ventana de voz;
 * cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS) hasta ≈ −15 LUFS con el
 * pico real a −2,5 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Cornfield Chase» — `archivos/musica/Cornfield Chase.mp3` (sha 8 `e28cd1ab`), banda sonora minimalista (órgano y arpegios), 2:07, crescendo continuo con caída natural a silencio de 120 a 125 s. Se entra a los 86,533 s
 * (el golpe de 9,9 dB de 86,583 s cae en el f3) y de ahí suena a −13 → −9,6 LUFS (picos de −0,5 a −2,6 dBFS) hasta los 120 s. Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el
 * instante es el de «empieza a subir») en que entra cada plano, con su fuerza en dB por 15 ms: `proyectos/064/musica/golpes-cancion-60-127.json` (`medir-pista.py --json`). No es una canción de pulso: entre 87,8 y
 * 93,4 s no hay ningún golpe de ≥ 6 dB (la nota larga sobre la que habla el hook) y los de 6-9 dB son arpegios, no un compás.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). El más fuerte de la sección (9,9 dB). */
  e0: { t: 86.583, db: 9.9 },
  /** El CORTE SECO a «Ven, te muestro» cae en este arpegio de 8,8 dB (el único corte seco de la pieza). */
  corte: { t: 97.387, db: 8.8 },
  /** El primer plano de dron bajo la infografía entra disolviendo y es opaco en este golpe (arpegio de 7,9 dB). */
  info: { t: 99.079, db: 7.9 },
  /** Isabella se disuelve con la mitad y es opaca en este golpe (arpegio de 6,7 dB); su primera palabra suena 13 f después. */
  mitad: { t: 105.585, db: 6.7 },
  /** LA VISTA: la disolvencia a las montañas acaba en este golpe (7,0 dB), dentro del clímax de la canción (−9,6 LUFS). */
  vista: { t: 115.454, db: 7.0 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: 50 ms antes del golpe de entrada (86,583 s), redondeado a un frame (2596/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 2596 / FPS_064;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_064;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_064;

/** Isabella camina hacia cámara: un empuje lento la acompaña. Los drones, quietos (la cámara ya se mueve). */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
/** El empuje de «Ven, te muestro»: el corte seco sobre su propia imagen pide un cambio de escala claro para leerse como una decisión (un salto igual de encuadre parece un error). */
const EMPUJE_INVITA: readonly [number, number] = [1.11, 1.15];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-064/${id}.mp4`;
const a = (id: string): string => `recorrido-064/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE del canal (la del 017): contraste con cuerpo, negros hundidos, luces recogidas, un punto cálido y +10 % de saturación. Orden del efecto: exposición → balance de blancos → sombras/luces/blancos/negros → contraste →
 * saturación → vibrance. `vibrance` ≤ 0,05 y las tomas de Isabella, `saturation` ≤ 1,06: la piel se queda donde estaba. El AJUSTE de cada plano se mide (`herramientas/medir-color.py`), no se hereda.
 */
const COLOR_BASE: ColorCine = {
  contrast: 1.1,
  blacks: -0.06,
  shadows: 0.08,
  highlights: -0.2,
  whites: -0.05,
  temperature: 0.03,
  saturation: 1.1,
  vibrance: 0,
};

/** El color de un plano: la base más el ajuste de su toma (medido, `medir-color.py`). */
const color = (ajuste: ColorCine = {}): ColorCine => ({ ...COLOR_BASE, ...ajuste });

/**
 * El frame de cada cambio de plano. Los que son un golpe de la canción salen de `golpe()` (arriba); los demás son libres (disolvencias sin golpe): `hook` es donde acaba la apertura (3,9 s: ya se ve el lote), `fondoB`
 * el relevo entre los dos planos de dron bajo la infografía, `horizonte` donde acaba la mitad más su margen de disolvencia y `cta` donde la canción EMPIEZA a caer (120,07 s = f1007) para que la voz del CTA quede sobre el
 * lecho que se apaga.
 */
const P = {
  hook: 117, //                       Isabella opaca; su primera palabra, 13 f después (no cae en golpe: la canción sostiene una nota larga de 87,8 a 93,4 s)
  invita: golpe(GOLPE.corte), //      327 · corte seco a «Ven, te muestro» en el arpegio de 8,8 dB
  info: golpe(GOLPE.info), //         378 · el dron bajo la infografía, disolviendo: opaco en el arpegio de 7,9 dB
  fondoB: 480, //                     relevo entre los dos planos de fondo de la infografía
  mitad: golpe(GOLPE.mitad), //       573 · Isabella opaca en el arpegio de 6,7 dB; su primera palabra, 13 f después
  horizonte: 765, //                  el horizonte de DR01, disolviendo: 24 f tras la última palabra de la mitad
  vista: golpe(GOLPE.vista), //       869 · la vista, el plano más largo del bloque 5 (138 f)
  cta: 1007, //                       Isabella opaca donde empieza a caer la canción; su primera palabra, 13 f después
} as const;

/**
 * Frames que dura la toma del CTA: la voz va de 6,57 a 12,86 s; con `desde` 184 f (6,133 s) la última palabra cae en el f1209 de la comp y la toma sigue 27 f más (0,9 s de su cara tras «lote»), en los que la imagen
 * funde a negro (los últimos 6). El clip dura 15,83 s: desde 6,133 s quedan 9,7 s, de sobra. Nada se congela: el plano acaba antes del último fotograma del clip.
 */
const DUR_CTA = 229;

/**
 * Dónde acaba la música: el WAV de la canción dura 126,9 s y empieza a sonar a los 86,533 s, así que se acaba en el f1211; la envolvente llega a cero en el f1207, 4 f antes, y la tarjeta (desde el f1236) va en silencio.
 * (La canción llega sola a silencio hacia los 125 s: el apagado es una red de seguridad.)
 */
export const FIN_MUSICA_064 = 1207;

export const metraje064: readonly Corte[] = [
  // ── Bloque 1 · la apertura ──
  {
    id: "c01-apertura",
    bloque: 1,
    tipo: "video",
    src: v("dr03"),
    // DR03 (vertical, 2026-09-11 15:34), del 0,30 al 4,20 s: la ladera con el cultivo en hilera arriba y la cerca viva en V, bajando hacia la hierba (`hoja-tramos.py`: movimiento 2,2, el más lento de los tramos de este dron). Es el
    // que mejor cuenta la topografía mixta (ladera con cultivo → parte plana). Entra a corte con el golpe de 9,9 dB del f3 (no nace de negro) y YA VA EN MOVIMIENTO.
    desde: 0.3,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05, saturation: 1.04 }),
    reason:
      "La apertura (la promesa): la ladera con el cultivo en hilera y la cerca viva en V, bajando hacia la hierba: topografía mixta y tierra viva desde el primer segundo. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y ya está en movimiento.",
  },
  // ── Bloque 2 · el hook: la afirmación y la invitación ──
  {
    id: "c02a-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk02"),
    audio: a("hk02-voz"),
    voz: {
      s0: 6.97,
      s1: 13.38,
      lufs: -15.0,
      dice: "¿Un lote cerca de Medellín por 350 millones? Sí, y tiene 3.244 metros cuadrados.",
    },
    // La toma dura 16,8 s y trae ≈ 7 s de silencio al principio (ella se coloca: hasta los 6,9 s hay ruido de sala a −45…−60 dB y un hueco de silencio digital de 1,8 a 3,0 s): la voz empieza a los 6,97 s (la primera sílaba
    // sube de −54 a −21 dB en 10 ms) y esta primera parte acaba a los 13,38 s, con la /s/ final de «cuadrados» (13,34-13,37 s, −39 dB); whisper pone «Un lote cerca de Medellín» en 0,0 s y NO sirve para los tiempos (R29/R31).
    // `desde` 196 f (6,533 s) deja 13 f de su cara quieta antes de la primera palabra (que suena a los 13,1 f del f117). El plano dura 210 f (hasta el f327): la última palabra cae en el f322 y quedan 5 f (0,15 s de aire).
    // Ella camina hacia cámara por la ladera, desde lejos: el empuje la acompaña. La pausa de la toma (13,38-13,92 s) se salta con el corte a «Ven, te muestro».
    desde: fr(196),
    en: P.hook,
    dur: P.invita - P.hook,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.06, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "La ladera (la promesa con las dos cifras): Isabella camina hacia cámara por el lote y dice «¿un lote cerca de Medellín por 350 millones? Sí, y tiene 3.244 metros cuadrados». Se disuelve desde la apertura y es opaca antes de hablar.",
  },
  {
    id: "c02b-invita",
    bloque: 2,
    tipo: "video",
    src: v("hk02"),
    audio: a("hk02-voz"),
    voz: {
      s0: 13.925,
      s1: 14.55,
      lufs: -15.0,
      dice: "Ven, te muestro.",
    },
    // «Ven, te muestro» es la parte B de la misma toma: voz de 13,925 s (la primera sílaba sube de −35 a −20 dB en 20 ms; los 13,83-13,91 s, −50…−40 dB, son un soplo previo) a 14,55 s. A CORTE sobre su propia imagen, con
    // un empuje (1,11 → 1,15): el salto de encuadre y de tiempo (de 13,53 a 13,77 s del clip: 0,23 s) se lee como una decisión y no como un error. Entra en el arpegio de 8,8 dB del f327; la primera palabra suena en el f332
    // (el desclic de entrada a corte son 3 f) y 10 f después de la última de la parte A: la pausa de la frase, un poco más corta que la de la toma (0,32 s frente a 0,54).
    // El plano dura 51 f (hasta el f378): la última palabra cae en el f351 y la disolvencia al dron empieza en el f366.
    desde: fr(413),
    en: P.invita,
    dur: P.info - P.invita,
    zoom: EMPUJE_INVITA,
    entra: "corte",
    color: color({ contrast: 1.06, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "La invitación («ven, te muestro»): la misma toma, a corte y con un empuje, justo antes de enseñar lo que promete. Es el puente al dron y a la infografía.",
  },
  // ── Bloque 3 · el dron bajo la infografía de distancias ──
  {
    id: "c03a-plano",
    bloque: 3,
    tipo: "video",
    src: v("dr03"),
    // DR03, del 18,00 al 21,40 s (ningún fotograma en común con la apertura, 0,30-4,20 s): la parte PLANA en cenital, hierba con un arbusto y un sendero: un fondo tranquilo para que las cifras se lean (movimiento lento). Va
    // bajo el velo de la infografía (`infografia-064.ts`). Entra disolviendo y es opaco en el arpegio de 7,9 dB del f378.
    desde: 18.0,
    en: P.info,
    dur: P.fondoB - P.info,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.05, saturation: 1.04 }),
    reason: "La parte plana en cenital (el lote): tras «te muestro» el dron enseña la tierra plana desde arriba, el fondo quieto de las distancias.",
  },
  {
    id: "c03b-cerca",
    bloque: 3,
    tipo: "video",
    src: v("dr03"),
    // DR03, del 33,00 al 36,10 s: la cerca viva horizontal con los árboles detrás y las flores blancas en la ladera (movimiento 7,7: lateral). Relevo del fondo bajo la infografía; entra disolviendo.
    desde: 33.0,
    en: P.fondoB,
    dur: P.mitad - P.fondoB,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.05, saturation: 1.04 }),
    reason: "La cerca viva con las flores (el borde del lote): el dron se desliza a lo largo de la cerca mientras entra el dato de la autopista.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c04-mitad",
    bloque: 4,
    tipo: "video",
    src: v("hk05"),
    audio: a("hk05-voz"),
    voz: {
      s0: 7.28,
      s1: 12.45,
      lufs: -15.0,
      dice: "No necesitas estar a tres horas de Medellín para tener 3.244 metros cuadrados.",
    },
    // `Hook5.mp4` (el antiguo `medio2.mp4`, ahora en `1 Hooks`): la toma dura 17,7 s y trae ≈ 7 s de silencio al principio; la voz empieza a los 7,28 s y esta primera frase acaba a los 12,45 s (la /s/ final de «cuadrados»,
    // 12,32-12,43 s). Tras ella la toma sigue con «Ven, te muestro, este es un [precio] de lote»: la parte B (13,10-13,77 s) se descarta aquí (la 064 ya usa el «ven, te muestro» de Hook2) y lo que viene después («este es un
    // pre-», una pausa de 1,8 s y otro bloque de voz que no se lee) queda fuera: no hay palabra dudosa. `desde` 205 f (6,833 s) deja 13 f de su cara quieta tras el arpegio de 6,7 dB del f573 (la disolvencia ACABA en él); la
    // primera palabra suena a los 13,4 f. El plano dura 192 f (hasta el f765): la última palabra cae en el f741 y la disolvencia al dron empieza en el f753.
    // Ella camina hacia cámara en la ladera, con las casas al fondo.
    desde: fr(205),
    en: P.mitad,
    dur: P.horizonte - P.mitad,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.06, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "La ladera con las casas al fondo (le quita el miedo a la distancia): Isabella dice «no necesitas estar a tres horas de Medellín para tener 3.244 metros cuadrados». Tras la infografía de distancias, lo mismo desde otro lado.",
  },
  // ── Bloque 5 · el dron de DR01: el horizonte y la vista ──
  {
    id: "c05a-horizonte",
    bloque: 5,
    tipo: "video",
    src: v("dr01"),
    // DR01 (vertical, 2026-09-11 15:28), del 24,50 al 27,97 s (el tramo 24-48 s es el de esta pieza; 0-24 s es de la 063 y 48-73,5 s de la 065): la ladera verde del lote delante y, detrás, los cultivos en terrazas, las casas
    // del pueblo con tejados rojos y la cordillera. Un avance lento (la imagen sube despacio). Entra disolviendo, sin golpe.
    desde: 24.5,
    en: P.horizonte,
    dur: P.vista - P.horizonte,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.05, saturation: 1.05, highlights: -0.3, whites: -0.2 }),
    reason: "El horizonte con las casas (lo que rodea): el dron avanza sobre la ladera del lote y detrás aparecen los cultivos en terrazas y el pueblo con sus tejados rojos: a una hora de Medellín, y con vecinos.",
  },
  {
    id: "c05b-vista",
    bloque: 5,
    tipo: "video",
    src: v("dr01"),
    // DR01, del 43,00 al 47,60 s (el clip llega al 48 del reparto): la tierra roja con el cultivo en hilera y una caseta, los árboles y, al fondo, la cordillera bajo un cielo abierto: el aire sube y el paisaje se abre. Es
    // el plano más largo del bloque 5 (138 f = 4,6 s) y el clímax: el lote NO está en el fin del mundo. La disolvencia ACABA en el arpegio de 7,0 dB del f869, dentro del clímax de la canción (−9,6 LUFS).
    desde: 43.0,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.05, saturation: 1.05, highlights: -0.3, whites: -0.2 }),
    reason:
      "La vista (el clímax): el paisaje se abre hasta la cordillera con la tierra cultivada delante: lo que rodea al lote. El plano más largo del bloque; la disolvencia acaba dentro del clímax de la canción.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c06-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct03"),
    audio: a("ct03-voz"),
    voz: {
      s0: 6.57,
      s1: 12.86,
      lufs: -15.0,
      dice: "Si estás buscando tierra cerca de Medellín, escríbeme y te envío todos los detalles para que conozcas este asombroso lote.",
    },
    // La toma dura 15,8 s y trae ≈ 6,5 s de silencio al principio (silencio digital de 5,5 a 6,4 s): la voz empieza a los 6,57 s y acaba a los 12,86 s (la «e» final de «lote» tras una /t/ de 70 ms). `desde` 184 f (6,133 s):
    // la disolvencia ACABA en el f1007, donde empieza a caer la canción; la primera palabra suena a los 13,1 f. El plano dura 229 f: 27 f tras la última palabra (la imagen funde a negro en los últimos 6).
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-064.ts`): «asombroso» (whisper oye «sombroso» y «asombroso» según el corte).
    desde: fr(184),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.06, exposure: -0.05, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "Isabella en el campo con el cielo detrás (la invitación): dice «si estás buscando tierra cerca de Medellín, escríbeme y te envío todos los detalles»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-064.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c07-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-064/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c06
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la canción acaba de apagarse.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c07). */
export const DURACION_064 = P.cta + DUR_CTA + DUR_TARJETA;

/** Los frames de la composición que usan la infografía y la puerta: el primer plano de fondo y el relevo (`infografia-064.ts`). */
export const EN_INFO_064 = P.info;
export const EN_MITAD_064 = P.mitad;
