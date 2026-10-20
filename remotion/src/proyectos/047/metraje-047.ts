/**
 * EL RECORRIDO 047 — «Tierra Grata Bosque Santo (El Poblado), ARRIENDO», V29 del registro, «LO QUE INCLUYE» — los planos, como DATOS.
 *
 * Encargo (2026-10-19, una de las seis sesiones del lote 045-050; reparto en `proyectos/044/reparto-045-050.md`): promocionar el ARRIENDO de un apartamento amoblado de 113 m² con jacuzzi privado a pocos metros de la
 * Av. Las Palmas (COP 14,8 millones al mes). El rodaje del 17-oct NO siguió el libreto 044: Isabella grabó el ángulo del ACOMPAÑAMIENTO PERSONALIZADO (aseo semanal, experiencias, amenidades). Esta pieza es la de «LO QUE
 * INCLUYE»: el tiempo se optimiza con un aseo semanal incluido (hook) → el canon incluye experiencias pensadas para ti y la unidad trae amenidades (la mitad, DOS tomas seguidas) → el acompañamiento personalizado, una
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
 *   bloque 1  c01                  la APERTURA con el APARTAMENTO: la sala a la HORA AZUL (RC20: el panel curvo de madera se aparta y deja ver el sofá con las luces y el ventanal), SIN TEXTO NI VOZ
 *   bloque 2  c02                  Isabella sentada en el sillón de la terraza común: el hook (entra con una disolvencia; su primera sílaba suena en el f91)
 *   bloque 3  c03 c04              el paseo por la UNIDAD: el carril de nado entre los árboles (RC16) → la Social Kitchen con las lámparas verdes y el mural (RC11), donde espera ella
 *   bloque 4  c05 c06              Isabella en la Social Kitchen con el precio (MD04) y, tras una disolvencia, en el gimnasio con las amenidades (MD05)
 *   bloque 5  c07 c08 c09          el paseo por el APARTAMENTO: la alcoba principal (RC05) → el baño (RC09) → EL BALCÓN con las camas, el jacuzzi privado al fondo y las torres y la ciudad (RC03: la vista, el plano más largo)
 *   bloque 6  c10 c11              Isabella en las escaleras con el césped y el edificio: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * LA APERTURA CON EL APARTAMENTO (reparto: RC20; el principio de RC02 solo si «la hora azul choca con el paseo de día»). Choca algo —el cielo de la sala es azul oscuro y el resto, de día— pero es la imagen más fuerte de
 * toda la sala, y el color de cada plano la casa con el siguiente (R32). Por eso se queda RC20 en el bloque 1 y no se mueve al 5: se declara. Tampoco se enseña la vista entera antes del bloque 5: el ventanal del 1 es el del
 * azul de la hora de la tarde, no la ciudad.
 *
 * LO QUE EL MATERIAL NO DA (se dice, no se disimula). (1) TODOS los recorridos son HORIZONTALES (1920×1080): se RECORTAN al centro (608×1080) y se escalan ×1,78 hasta el cuadro: salen MÁS BLANDOS que Isabella en 4K.
 * (2) No hay dron. (3) No hay puentes humanos (una mano, una taza, una puerta). (4) El bloque 3 es de DOS planos y no de tres: el sauna (RC15) sale oscuro y desenfocado, el gimnasio (RC13) lleva a un hombre en una
 * caminadora y el jacuzzi comunal y las terrazas son aperturas o clímax de otras piezas. (5) El hook y el CTA se repiten en otra pieza del lote (HK02 en el 050, CT03 en el 048): solo hay tres de cada uno. (6) RC03 es el clímax
 * asignado Y enseña el JACUZZI PRIVADO del balcón (al fondo, de 6,0 a 6,9 s de la fuente: una caja de madera con la banca delante, pequeña y lejana): la ficha lo anuncia y los demás clips no lo dan mejor.
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA, SIN GOLPES. «Dreamlife» (Tony Anderson, cinematográfica emocional) es un crescendo de orquesta SIN pulso: entre los 170 y los 218 s su golpe más fuerte mide 9,7 dB y casi todos, ≤ 8 dB
 * (`musica/golpes-dreamlife-150-250.json`). No hay rejilla donde cortar en seco (R33): TODAS las entradas son DISOLVENCIAS de 12 f (las disolvencias no piden golpe) y los cambios de plano caen donde lo piden la voz de
 * Isabella y el paseo. La música es la que lleva la CURVA: calma hasta el 186,5 s (apertura y hook), primer escalón (el paseo), segundo y tercero (la meseta, los 15 s del bloque 5) y la CAÍDA a los 217,3 s, que es
 * donde entra el CTA (el f1168): la voz de Isabella queda a solas sobre el resto de la canción, que se apaga. `INICIO_MUSICA` está en `audio-047.ts`.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(12)` = 12/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f91, 3,0 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Aquí hay que casar una sala a la HORA AZUL (cielo
 * azul intenso, luz cálida de las lámparas) con la piscina bajo un cielo gris, la Social Kitchen en sombra, Isabella de día, una alcoba y un baño claros y un balcón al sol: el ajuste de cada plano busca que se parezcan sin
 * quemar el cielo del balcón ni hundir la sala. Con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
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
  /** `foto` solo para la tarjeta oscura del cierre (`c11-cierre`: un negro liso). Nada se congela. */
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
 *   hasta 186,5 s   calma: −17 → −16 LUFS (un lecho de cuerdas)             ← la apertura y el hook
 *   186,5 – 194 s   primer escalón: −13,5                                    ← el paseo por la unidad
 *   194 – 202 s     segundo escalón: −11,5                                   ← la mitad
 *   202 – 217,3 s   MESETA del clímax: −10 (pico −0,4 dBFS)                   ← el apartamento y el balcón
 *   217,3 s         LA CAÍDA: −12 → −18 en 0,6 s, y de ahí un fundido de ≈ 20 s hasta el silencio   ← el CTA
 *
 * Se entra a los 178,467 s (el frame 5354 de la canción a 30 fps): 39,0 s de canción hasta la caída, que es lo que dura la pieza hasta el CTA. Así la meseta cae sobre el apartamento y el balcón (los f760-1168) y la caída,
 * donde entra la voz de Isabella con el CTA (f1168): el CTA queda a solas sobre lo que resta de la canción.
 */
export const INICIO_MUSICA = 5354 / FPS_047;

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

/** Isabella: un empuje lento hacia ella. El recorrido, quieto: la cámara ya avanza y es 1080p recortado: más escala lo ablandaría. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

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
 * El frame de cada cambio de plano. SIN GOLPES QUE SIGAN (la canción no los da): cada plano dura lo que pide su sitio.
 *   · el hook acaba 14 f después de su última palabra (2 de margen + los 12 de la disolvencia del plano siguiente);
 *   · MD04 y MD05, igual: su última palabra, más 14 f;
 *   · la CAÍDA de la canción (217,3 s) cae en `P.cta`: ahí la voz de Isabella queda a solas;
 *   · el balcón (el clímax) es el plano más largo de la pieza (180 f = 6,0 s).
 */
const P = {
  hook: 90, //     Isabella entra con una disolvencia; su primera sílaba, en el f91
  piscina: 288, // acaba el hook; entra el paseo por la unidad
  social: 438, //  la Social Kitchen (RC11)
  md04: 534, //    Isabella en la Social Kitchen con el precio; primera sílaba en el f535
  md05: 657, //    Isabella en el gimnasio; primera sílaba en el f658
  alcoba: 760, //  acaba MD05; entra el apartamento
  bano: 880, //    el baño
  balcon: 988, //  el balcón y la vista (180 f)
  cta: 1168, //    Isabella con el CTA; primera sílaba en el f1169
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 6,67 s (200 f) y desde `desde` (17 f) le quedan 183. Su voz va de 0,60 a 6,04 s (f1169-1332 de la comp): 19 f (0,6 s) de su cara tras la última palabra, en los que la
 * imagen funde a negro (los últimos 6). Nada se congela: el plano acaba en el último fotograma del clip.
 */
const DUR_CTA = 183;

/**
 * Dónde acaba la música (frame de la comp): se apaga bajo la tarjeta y llega a cero 2 f antes del final de la pieza.
 */
export const FIN_MUSICA_047 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje047: readonly Corte[] = [
  // ── Bloque 1 · la apertura con el APARTAMENTO ──
  {
    id: "c01-apertura",
    bloque: 1,
    tipo: "video",
    src: v("rc20"),
    // RC20 (`Img 9536.mp4`, 2-sep, recorte 608×1080 en x=656), del 2,6 al 5,6 s: la sala a la HORA AZUL. Un panel curvo de madera oscura con una línea de luz cálida cruza el cuadro hacia la derecha y deja ver el sofá
    // gris con la pared de listones y las tiras de luz, el ventanal con el cielo azul de la tarde y la mesa de centro. La cámara avanza y gira a la derecha. Entra a corte (el frame 0 es la miniatura y no nace de negro).
    // Sale limpio: sin texto ni voz. Los últimos 12 f van bajo la disolvencia de Isabella.
    desde: 2.6,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.1, shadows: 0.2, highlights: -0.15, saturation: 1.05 }),
    reason:
      "Sala a la hora azul (la promesa): el panel curvo se aparta y deja ver el sofá con las luces y el ventanal: el mejor interior del apartamento, avanzando. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
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
    // La voz empieza a los 0,44 s («El», una sílaba suave a −22 dB que sube a los 0,48 s) y acaba a los 6,52 s; el clip dura 7,23 s (217 f). La primera subida fuerte («tiem-», 43 dB) es a los 0,465 s. `desde` 12 f es el
    // frame anterior a la primera palabra y deja justo los 12 f de clip que pide la disolvencia: Isabella es opaca en el f90 y su primera sílaba suena en el f91. El plano dura 198 f (hasta el f288): su última palabra acaba
    // en el f274 y quedan 14 f.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-047.ts`): «un aseo semanal» (whisper oye «asesor» en otras pasadas: aquí «as-e-o», la «e» con p 0,24) e «incluyéndote».
    // Isabella está SENTADA en el sillón de la terraza común, bajo la pérgola, con la ciudad detrás.
    desde: fr(12),
    en: P.hook,
    dur: P.piscina - P.hook,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.06, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "Terraza común (la promesa): Isabella, sentada en el sillón, dice «el tiempo es el activo más valioso… te ayudamos a optimizarlo, incluyéndote un aseo semanal». Disuelve porque cambia el registro, no el sitio.",
  },
  // ── Bloque 3 · el paseo por la unidad ──
  {
    id: "c03-piscina",
    bloque: 3,
    tipo: "video",
    src: v("rc16"),
    // RC16 (`Img 9525.mp4`, 2-sep, recorte x=656), del 0,4 al 5,4 s: el carril de nado de agua turquesa con la escalera, entre los árboles y bajo el cielo gris del atardecer; el paneo va hacia la DERECHA. Es el espacio húmedo
    // de la unidad. COMPARTE metraje con las otras cinco piezas del lote (es el clip bueno de la piscina; RC17 sale con casi todo cielo y árboles y tres bañistas): se usa el tramo más temprano (0,4-5,4 s), el que no enseña a nadie cerca.
    desde: 0.4,
    en: P.piscina,
    dur: P.social - P.piscina,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.15, shadows: 0.35, blacks: 0, highlights: -0.2, saturation: 1.0 }),
    reason:
      "Piscina (la unidad): el carril de nado entre los árboles, un paneo lento a la derecha: tras «aseo semanal» se enseña lo que trae la unidad, el espacio húmedo antes de la Social Kitchen.",
  },
  {
    id: "c04-social",
    bloque: 3,
    tipo: "video",
    src: v("rc11"),
    // RC11 (`Img 9513.mp4`, 2-sep, recorte x=656), del 0,8 al 4,0 s: la Social Kitchen / coworking: las lámparas verdes, el mural de colores y las mesas, en un paneo a la DERECHA (misma dirección que la piscina). Es el espacio
    // donde espera Isabella en el plano siguiente (MD04). COMPARTE metraje con cuatro piezas hermanas (045, 046, 048, 049): el clip es el único de la Social Kitchen que se entiende; se declara (puerta 7b). El tramo acaba en el 4,0 s: a partir de ahí el paneo llega al mural y se ve a un hombre con un portátil.
    desde: 0.8,
    en: P.social,
    dur: P.md04 - P.social,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.2, shadows: 0.3, highlights: -0.15, saturation: 1.05 }),
    reason:
      "Social Kitchen (la unidad): las lámparas verdes y el mural, el mismo paneo a la derecha: es donde acaba el paseo público y donde espera Isabella.",
  },
  // ── Bloque 4 · la mitad: DOS tomas unidas con una disolvencia ──
  {
    id: "c05-mitad-precio",
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
    // 4,87 s (146 f). `desde` 15 f deja 15 f de clip para la disolvencia (hacen falta 12). Su primera sílaba suena en el f535. LLEVA LA ÚNICA CIFRA DE LA PIEZA: el subtítulo `$14.800.000`.
    // Palabras: «catorce millones ochocientos» (desde 0,54 s whisper oye «14 millones 800 que») y «que incluyen» (desde 2,04 s, «que incluyen experiencias pensadas»): cerradas con una pasada limpia.
    desde: fr(15),
    en: P.md04,
    dur: P.md05 - P.md04,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.06, exposure: 0.15, shadows: 0.15, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "Social Kitchen (lo que incluye): Isabella donde acabó el paseo dice «catorce millones ochocientos que incluyen experiencias pensadas para ti»: el precio, con lo que lo justifica.",
  },
  {
    id: "c06-mitad-amenidades",
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
    // sobre MD04 (DOS tomas unidas: se declara): la última palabra de MD04 acaba en el f643 y la primera de MD05 suena en el f658: 15 f (0,5 s) de pausa entre las dos frases.
    // «esta unidad»: desde 0,585 s whisper oye «Además, esta unidad cuenta»; cerrada con una pasada limpia.
    desde: fr(17),
    en: P.md05,
    dur: P.alcoba - P.md05,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.06, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "Gimnasio (lo que incluye): Isabella, tras el vidrio del gimnasio, dice «además, esta unidad cuenta con diferentes tipos de amenidades»: la segunda mitad, que sigue a la primera.",
  },
  // ── Bloque 5 · el paseo por el apartamento y la vista ──
  {
    id: "c07-alcoba",
    bloque: 5,
    tipo: "video",
    src: v("rc05"),
    // RC05 (`Img 9477.mp4`, 2-sep, recorte x=656), del 2,0 al 6,0 s: la alcoba principal: la cama con la lámpara colgante y el paneo a la DERECHA hasta la puerta del baño con luz y la pared de los tres cuadros. Es el primer plano
    // del apartamento tras la unidad: lo privado, con los planos más largos (4,0 s) que los del bloque 3. Sin gente. COMPARTE metraje con las cinco piezas hermanas (la mejor alcoba del material; RC07 y RC08 salen con el ventanal
    // quemado); se empieza en el 2,0 s para no repetir la cama con los cojines de los 0-2 s, que usan casi todas.
    desde: 2.0,
    en: P.alcoba,
    dur: P.bano - P.alcoba,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.35, shadows: 0.15, highlights: -0.35, whites: -0.2, saturation: 1.02 }),
    reason:
      "Alcoba principal (intimidad): la cama, los cojines y la lámpara, y el paneo hasta la puerta del baño: tras la unidad entramos al apartamento por lo más privado; el plano respira más que los del bloque 3.",
  },
  {
    id: "c08-bano",
    bloque: 5,
    tipo: "video",
    src: v("rc09"),
    // RC09 (`Img 9484.mp4`, 2-sep, recorte x=656), del 3,6 al 7,2 s: el baño principal: el mueble de madera con el lavamanos de vessel, las toallas y el espejo, y el paneo a la DERECHA hasta el cristal de la ducha (la misma dirección
    // que la alcoba, que acaba en la puerta de este baño). COMPARTE metraje con las cinco piezas hermanas (es el único clip del baño); el tramo es el más tardío (las demás usan 1,5-6,0 s).
    desde: 3.6,
    en: P.bano,
    dur: P.balcon - P.bano,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.4, highlights: -0.4, whites: -0.25, saturation: 1.05 }),
    reason:
      "Baño principal (cuidado, calma): el mueble de madera y el lavamanos con la planta; la alcoba acabó en la puerta de este baño, así que el plano continúa el paseo sin volver atrás.",
  },
  {
    id: "c09-balcon",
    bloque: 5,
    tipo: "video",
    src: v("rc03"),
    // RC03 (`Img 9464.mp4`, 2-sep, recorte x=656), del 4,3 al 10,3 s: las camas blancas sobre la baldosa negra del BALCÓN (el de la foto `2-Balcon`) → al fondo, de 5,8 a 6,9 s, el JACUZZI PRIVADO (la caja de madera con la banca
    // delante, pequeña y lejana) → el paneo a las torres de la derecha y la ciudad bajo el cielo azul con nubes. Es el plano más largo de la pieza (180 f = 6,0 s) y el clímax: cae sobre la meseta de la canción (213-217 s).
    // Hay una cosa que el recorte no ayuda: el jacuzzi es pequeño (≈ 90 px de la ventana de 608). Se declara.
    desde: 4.3,
    en: P.balcon,
    dur: P.cta - P.balcon,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.05, shadows: 0.2, highlights: -0.35, whites: -0.2, saturation: 1.0 }),
    reason:
      "Balcón y vista (el clímax): las camas, el jacuzzi privado al fondo y el paneo a las torres y la ciudad, en la meseta de la música: lo que tendría delante quien viva aquí. El plano más largo de la pieza.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
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
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-047/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_047 = P.cta + DUR_CTA + DUR_TARJETA;
