/**
 * EL RECORRIDO 047 — «Tierra Grata Bosque Santo (El Poblado), ARRIENDO», V29 del registro, «LO QUE INCLUYE» — los planos, como DATOS.
 *
 * Encargo (2026-10-19, una de las seis sesiones del lote 045-050; reparto en `proyectos/044/reparto-045-050.md`): promocionar el ARRIENDO de un apartamento amoblado de 113 m² con jacuzzi privado a pocos metros de la
 * Av. Las Palmas (COP 14,8 millones al mes). El rodaje del 17-oct NO siguió el libreto 044: Isabella grabó el ángulo del ACOMPAÑAMIENTO PERSONALIZADO (aseo semanal, experiencias, amenidades). Esta pieza es la de «LO
 * QUE INCLUYE»: el tiempo se optimiza con un aseo semanal incluido (hook) → el canon incluye experiencias pensadas para ti y la unidad trae amenidades (la mitad, DOS tomas seguidas) → el acompañamiento personalizado, una
 * plusvalía que vale la pena conocer (el CTA).
 *
 *   hook   HK02  «El tiempo es el activo más valioso de los seres humanos. Te ayudamos a optimizarlo, incluyéndote un aseo semanal.»        (REPETIDA en el 050; sentada en el sillón de la terraza común)
 *   mitad  MD04  «Catorce millones ochocientos que incluyen experiencias pensadas para ti.»                                                 (Social Kitchen; lleva la ÚNICA cifra de la pieza)
 *          MD05  «Además, esta unidad cuenta con diferentes tipos de amenidades.»                                                           (gimnasio; DOS tomas unidas con una disolvencia: se declara)
 *   CTA    CT03  «Cuando llegas a una ciudad que no es la tuya, el acompañamiento personalizado es una plusvalía que vale la pena conocer.»  (REPETIDA en el 048; no es una acción: la tarjeta con el logo y la web cierra)
 *
 * LA IDEA EN UNA LÍNEA. Este apartamento es PARA QUIEN LLEGA A MEDELLÍN Y NO QUIERE PERDER EL TIEMPO EN LO COTIDIANO: lo que se paga incluye aseo semanal, experiencias y una unidad con amenidades, y quien llega a una ciudad
 * que no es la suya recibe un acompañamiento personalizado. No se afirma nada que la ficha no diga (administración, contrato, qué se paga aparte: no constan).
 *
 * SIN RECORRIDOS (REV. 1, decisión del usuario, 2026-10-19, tras ver la prueba: «hay algunos videos de mala calidad como si se hubieran escalado, se ven pixelados» → «no pongas recorridos horizontales»). La rev. 0
 * llevaba seis recorridos —la sala a la hora azul (RC20), la piscina, la Social Kitchen, la alcoba, el baño y el balcón con el jacuzzi (RC03)— y TODOS los recorridos del material son horizontales (1920×1080): para el 9:16
 * se recortaban al centro (608×1080) y se ampliaban ×1,78, y salían pixelados. Ningún filtro lo arregla (se probó reducir bloques y ruido y afilar: sin diferencia a 100 %; el detalle no está en el original). La pieza son
 * ahora SOLO las cuatro tomas de Isabella (4K vertical, nítidas): un paseo de ELLA por la unidad —la terraza, la Social Kitchen, el gimnasio y las escaleras— unido con disolvencias, con la tarjeta del cierre.
 *
 *   bloque 2  c01                  Isabella sentada en el sillón de la terraza común: el hook (la pieza ABRE con ella: ver abajo)
 *   bloque 4  c02 c03              Isabella en la Social Kitchen con el precio (MD04) y, tras una disolvencia, en el gimnasio con las amenidades (MD05)
 *   bloque 6  c04 c05              Isabella en las escaleras con el césped y el edificio: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * LA APERTURA (declarado). Sin recorrido no hay una primera toma de la propiedad «sin texto ni voz» (regla fija 1 de `recorrido-luxur` §0): la pieza ABRE con Isabella, a corte, en el f0, como el 021 y el 022 (por encargo, y
 * aquí por falta de material: no hay dron ni recorrido vertical). Se respeta lo que se puede: su primera sílaba suena a los 0,44 s (f13) y el primer subtítulo entra con ella; los 13 primeros fotogramas salen sin texto ni voz.
 * Tampoco hay bloques 1, 3 ni 5: la versión corta del formato son los bloques 1-2-3-6; esta es 2-4-6, de 23,4 s.
 *
 * QUIÉN MARCA EL TIEMPO: LA VOZ. «Dreamlife» (Tony Anderson, cinematográfica emocional) es un crescendo de orquesta SIN pulso (sus golpes más fuertes en 170-218 s miden ≤ 9,7 dB): no hay rejilla donde cortar en seco (R33) y
 * TODAS las entradas son DISOLVENCIAS de 12 f (no piden golpe). Cada plano dura lo que su voz: hasta 14-20 f después de su última palabra y la disolvencia al siguiente. Entre una frase y la siguiente quedan 21-24 f (0,7-0,8 s).
 * La música entra en el frame 0 en el escalón de los 202,2 s (la meseta del clímax, −10 LUFS) y va debajo de la voz; su CAÍDA (217,3 s) cae donde entra el CTA (f459). `INICIO_MUSICA` está más abajo.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(12)` = 12/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma. Isabella: `saturation` ≤ 1,06, sin tirar de cálido ni de frío. Con `color` el render lleva
 * `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-047.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-047";

export const FPS_047 = 30;

export type Entrada = "corte" | "disolver";
export type Bloque = 1 | 2 | 3 | 4 | 5 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. `s0`/`s1`, medidos por energía (perfil de 20 ms en la banda de voz) y por arranques de sílaba; `lufs`, con ebur128 sobre el WAV TRATADO que suena. */
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
  /** `foto` solo para la tarjeta oscura del cierre (`c05-cierre`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella: el WAV de su voz TRATADA (`<toma>-voz.wav`, `normalizar.mjs`). */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido del usuario desde la V9: «mientras habla Isabella sube los decibeles sin saturar»). Las voces crudas llegan a −19,4 · −23,2 · −23,8 · −20,5 LUFS en su ventana
 * de voz; cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS) hasta ≈ −15 LUFS
 * con el pico real a −2,5 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── La música: «Dreamlife» (Tony Anderson) ─────────────────────────────────
 *
 * `archivos/musica/Tony Anderson - Dreamlife.mp3` (sha 8 `5e7dcd27`), cinematográfica emocional, 4:02, Sol menor, un crescendo de orquesta SIN pulso ni golpes fuertes (`musica/golpes-dreamlife-150-250.json`,
 * `medir-pista.py`). Su curva, medida en LUFS (ebur128, `lufs-rangos.py`; momentáneos a 1 s):
 *
 *   hasta 186,5 s   calma: −17 → −16 LUFS (un lecho de cuerdas)
 *   186,5 – 194 s   primer escalón: −13,5
 *   194 – 202 s     segundo escalón: −11,5
 *   202,2 – 217,3 s MESETA del clímax: −10 (pico −0,4 dBFS); el escalón de entrada es un golpe de 7,5 dB a los 202,228 s
 *   217,3 s         LA CAÍDA: −12 → −18 en 0,6 s, y de ahí un fundido de ≈ 20 s hasta el silencio
 *
 * La pieza dura 23,4 s: no cabe el crescendo entero. Se entra a los 202,1 s (el frame 6063 de la canción a 30 fps), 0,13 s antes del escalón de la meseta (su golpe suena en el f5), y la caída de los 217,3 s cae en el
 * f457, donde entra el CTA (f459): la voz de Isabella queda a solas sobre lo que resta de la canción. Hasta ahí la música va debajo de la voz (−26 LUFS) y casi no se oye: es un lecho, no una banda sonora.
 */
export const INICIO_MUSICA = 6063 / FPS_047;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma para que lo que la música hace en un
 * instante de la canción caiga en el frame en que SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** El frame del vídeo en que SUENA un instante de la canción (sin redondear). */
export const frameDeCancion = (tCancion: number): number => (tCancion - INICIO_MUSICA + RETARDO_AUDIO) * FPS_047;

/** Dónde empieza la caída de la canción (s de la canción, medido con rms de 100 ms: de −12,0 a −16 dBFS entre 217,2 y 217,5 s). */
export const CAIDA_CANCION = 217.3;

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_047;

/** Isabella: un empuje lento hacia ella (techo del punch-in: los clips están a 1296 px = 1080 × 1,2). */
const EMPUJE: readonly [number, number] = [1.0, 1.04];

const v = (id: string): string => `recorrido-047/${id}.mp4`;
const a = (id: string): string => `recorrido-047/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE del canal (la del 017): contraste con cuerpo, negros hundidos, luces recogidas, un punto cálido y +10 % de saturación. Orden del efecto: exposición → balance de blancos → sombras/luces/blancos/negros → contraste →
 * saturación → vibrance. `vibrance` ≤ 0,05 (sobre hormigón gris pinta un moteado de colores y vuelve rosadas las nubes) y las tomas de Isabella, `saturation` ≤ 1,06: la piel se queda donde estaba. El AJUSTE de cada plano se
 * mide (`herramientas/medir-color.py`), no se hereda.
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
 * El frame de cada cambio de plano. SIN GOLPES QUE SIGAN (la canción no los da): cada plano dura lo que pide su voz.
 *   · el hook (HK02, 217 f) se usa ENTERO desde el f0: su voz va de 0,44 s (f13) a 6,52 s (f196) y quedan 20 f de cara tras la última palabra (los últimos 12 bajo la disolvencia de MD04);
 *   · MD04 (146 f) desde su f15 hasta el último fotograma (131 f): su voz acaba en el f325 y quedan 22 f;
 *   · MD05 (133 f) desde su f17, 112 f: su voz acaba en el f436 y quedan 23 f;
 *   · la CAÍDA de la canción (217,3 s) cae en el f457, donde entra el CTA (`P.cta`).
 * Entre la última palabra de una toma y la primera de la siguiente quedan 21 · 23 · 24 f (0,7-0,8 s).
 */
const P = {
  mitad1: 216, // Isabella en la Social Kitchen con el precio; su primera sílaba, en el f217
  mitad2: 347, // Isabella en el gimnasio; su primera sílaba, en el f348
  cta: 459, //    Isabella con el CTA; su primera sílaba, en el f460
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 6,67 s (200 f) y desde `desde` (17 f) le quedan 183. Su voz va de 0,60 a 6,04 s (f460-623 de la comp): 19 f (0,6 s) de su cara tras la última palabra, en los que la
 * imagen funde a negro (los últimos 6). Nada se congela: el plano acaba en el último fotograma del clip.
 */
const DUR_CTA = 183;

/**
 * Dónde acaba la música (frame de la comp): se apaga bajo la tarjeta y llega a cero 2 f antes del final de la pieza.
 */
export const FIN_MUSICA_047 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje047: readonly Corte[] = [
  // ── Bloque 2 · el hook ──
  {
    id: "c01-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk02"),
    audio: a("hk02-voz"),
    voz: {
      s0: 0.44,
      s1: 6.52,
      lufs: -15.0,
      dice: "El tiempo es el activo más valioso de los seres humanos. Te ayudamos a optimizarlo, incluyéndote un aseo semanal.",
    },
    // La pieza ABRE con esta toma, a corte, desde el primer fotograma del clip (`desde` 0): la voz empieza a los 0,44 s (un «El» suave a −22 dB; la primera subida fuerte, «tiem-», a 0,465 s; whisper la pone en 0,00 s: R29) y
    // acaba a los 6,52 s; el clip dura 7,23 s (217 f). Su primera sílaba suena en el f13, ≥ 3 f después del desclic de entrada. El plano dura 216 f: su última palabra acaba en el f196 y quedan 20 f, los últimos 12 bajo la
    // disolvencia de MD04.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-047.ts`): «un aseo semanal» (whisper oye «asesor» en otras pasadas: aquí «as-e-o», la «e» con p 0,24) e «incluyéndote».
    // Isabella está SENTADA en el sillón de la terraza común, bajo la pérgola, con la ciudad detrás.
    desde: 0,
    en: 0,
    dur: P.mitad1,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.06, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "Terraza común (la promesa): Isabella, sentada en el sillón con la ciudad detrás, dice «el tiempo es el activo más valioso… te ayudamos a optimizarlo, incluyéndote un aseo semanal». Abre la pieza a corte: sin recorrido, no hay otra primera toma.",
  },
  // ── Bloque 4 · la mitad: DOS tomas unidas con una disolvencia ──
  {
    id: "c02-mitad-precio",
    bloque: 4,
    tipo: "video",
    src: v("md04"),
    audio: a("md04-voz"),
    voz: {
      s0: 0.54,
      s1: 4.12,
      lufs: -15.0,
      dice: "Catorce millones ochocientos que incluyen experiencias pensadas para ti.",
    },
    // MD04 (`IMG_4296.MOV`): Isabella en la Social Kitchen (lámparas verdes, mural). La voz empieza a los 0,54 s (la primera sílaba, «Ca-», sube a los 0,52-0,56 s; whisper la pone en 0,00 s: R29) y acaba a los 4,12 s; el clip dura
    // 4,87 s (146 f). `desde` 15 f deja 15 f de clip para la disolvencia (hacen falta 12). Su primera sílaba suena en el f217. LLEVA LA ÚNICA CIFRA DE LA PIEZA: el subtítulo `$14.800.000`. El plano va hasta el último
    // fotograma del clip (131 f): su última palabra acaba en el f325 y quedan 22 f.
    // Palabras: «catorce millones ochocientos» (desde 0,54 s whisper oye «14 millones 800 que») y «que incluyen» (desde 2,04 s, «que incluyen experiencias pensadas»): cerradas con una pasada limpia.
    desde: fr(15),
    en: P.mitad1,
    dur: P.mitad2 - P.mitad1,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.06, exposure: 0.15, shadows: 0.15, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "Social Kitchen (lo que incluye): Isabella, ya en otro sitio de la unidad, dice «catorce millones ochocientos que incluyen experiencias pensadas para ti»: el precio, con lo que lo justifica.",
  },
  {
    id: "c03-mitad-amenidades",
    bloque: 4,
    tipo: "video",
    src: v("md05"),
    audio: a("md05-voz"),
    voz: {
      s0: 0.585,
      s1: 3.54,
      lufs: -15.0,
      dice: "Además, esta unidad cuenta con diferentes tipos de amenidades.",
    },
    // MD05 (`IMG_4297.MOV`): Isabella en el gimnasio, tras el vidrio. La voz empieza a los 0,585 s («A-» sube a los 0,59-0,60 s) y acaba a los 3,54 s; el clip dura 4,43 s (133 f). `desde` 17 f. Entra con una disolvencia
    // sobre MD04 (DOS tomas unidas: se declara): la última palabra de MD04 acaba en el f325 y la primera de MD05 suena en el f348: 23 f (0,77 s) de pausa entre las dos frases. El plano dura 112 f: su última palabra
    // acaba en el f436 y quedan 23 f.
    // «esta unidad»: desde 0,585 s whisper oye «Además, esta unidad cuenta»; cerrada con una pasada limpia.
    desde: fr(17),
    en: P.mitad2,
    dur: P.cta - P.mitad2,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.06, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "Gimnasio (lo que incluye): Isabella, tras el vidrio del gimnasio, dice «además, esta unidad cuenta con diferentes tipos de amenidades»: la segunda mitad, que sigue a la primera.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c04-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct03"),
    audio: a("ct03-voz"),
    voz: {
      s0: 0.6,
      s1: 6.04,
      lufs: -15.0,
      dice: "Cuando llegas a una ciudad que no es la tuya, el acompañamiento personalizado es una plusvalía que vale la pena conocer.",
    },
    // CT03 (`IMG_4298.MOV`, 29,97 fps; normalizada a 30 constantes: 200 f) ENTERA: la voz empieza a los 0,60 s y acaba a los 6,04 s; el clip dura 6,67 s. `desde` 17 f es el frame anterior a su primera palabra y deja 17 f de
    // clip para la disolvencia. El plano dura 183 f (hasta el último fotograma del clip): 19 f tras la última palabra, en los que la imagen funde a negro (los últimos 6). No es una acción: el CTA lo hace la tarjeta.
    // «llegas»: desde 0,59 s whisper oye «Cuando llegas a una»; cerrada con una pasada limpia.
    // Isabella está en las escaleras con césped y el edificio detrás.
    desde: fr(17),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.06, exposure: -0.05, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "Escaleras de la unidad (la invitación): Isabella dice «cuando llegas a una ciudad que no es la tuya, el acompañamiento personalizado es una plusvalía que vale la pena conocer»; entra donde cae la música. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-047.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c05-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-047/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c04
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c05). */
export const DURACION_047 = P.cta + DUR_CTA + DUR_TARJETA;
