/**
 * EL RECORRIDO 049 — «Tierra Grata Bosque Santo» (El Poblado), ARRIENDO, V31 «AMENIDADES» — los planos, como DATOS.
 *
 * Encargo (2026-10-19, una de las seis sesiones de los reels de arriendo 045-050; reparto en `proyectos/044/reparto-045-050.md`, material en `proyectos/044/catalogo-material.md`): el apartamento
 * amoblado de 113 m² con jacuzzi privado a COP 14,8 millones al mes, contado por lo que Isabella grabó el 17-oct: el ACOMPAÑAMIENTO PERSONALIZADO y, en esta pieza, las AMENIDADES de la unidad.
 * Estructura del canal: APARTAMENTO · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA (no hay dron), con tres frases de Isabella.
 *
 *   hook   HK03  «Cuando llegas a una ciudad que no es la tuya, el acompañamiento personalizado es una plusvalía indispensable.»   (REPETIDA de la V28 · escaleras exteriores)
 *   mitad  MD05  «Además, esta unidad cuenta con diferentes tipos de amenidades.»                                                  (REPETIDA de la V29 · gimnasio, tras el vidrio)
 *   CTA    CT01  «Si quieres un acompañamiento personalizado durante toda tu estancia, contáctanos.»                               (REPETIDA de la V27 · junto al jacuzzi comunal)
 *
 * LA IDEA EN UNA LÍNEA. Esto es PARA QUIEN LLEGA A UNA CIUDAD QUE NO ES LA SUYA Y QUIERE QUE LE RESUELVAN EL DÍA A DÍA: el hook da la promesa (el acompañamiento), la unidad la demuestra con lo que enseña
 * (la piscina, la Social Kitchen, el gimnasio) y Isabella lo dice en la mitad («esta unidad cuenta con diferentes tipos de amenidades»); el apartamento (alcoba y baño) es lo que se habita y el deck con el
 * jacuzzi comunal, el cierre antes del CTA. Ninguna cifra en pantalla ni en voz (los 14,8 millones van en el caption y en la versión con ficha).
 *
 *   bloque 1  c01                  la APERTURA: la sala del apartamento —el sofá gris, la pared de listones con luz, la mesa con el sol— (RC04), SIN TEXTO NI VOZ
 *   bloque 2  c02                  Isabella en las escaleras exteriores, el edificio detrás: el hook (entra a corte en un golpe)
 *   bloque 3  c03 c04 c05 c06      el paseo por la UNIDAD, de fuera adentro: el carril de nado (RC17) → la Social Kitchen (RC12) → el gimnasio (RC14 y RC13)
 *   bloque 4  c07                  Isabella en el gimnasio, tras el vidrio: la mitad (a corte en un golpe)
 *   bloque 5  c08 c09 c10 c11      el APARTAMENTO, en el orden en que se camina: la cocina con isla (RC01) → la alcoba y la puerta iluminada del baño (RC08) → el baño (RC09) → EL CLÍMAX, el deck con el jacuzzi comunal bajo el cielo cubierto (RC19, 4,2 s: el más largo)
 *   bloque 6  c12 c13              Isabella junto al jacuzzi comunal: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA, POR GOLPES MEDIDOS. «In This Together» (cinematic / ambient, `catalogo-musica.md`) NO tiene pulso fijo: la rejilla son los golpes medidos del tramo 161,6-209 s
 * (`musica/golpes-049.json`, `medir-pista.py --json`) y cada plano que entra a corte lo hace en uno de ellos (≥ 7,5 dB: el canal exige 7,4). La entrada es el golpe de 11,2 dB del 161,638 s; el CLÍMAX (la vista) se
 * pone donde la canción hace su meseta más alta antes de CAER —de ≈ −11 a −21 dBFS entre el 199,5 y el 203 s— y el CTA entra en esa caída: la voz queda sola sobre un lecho que se apaga solo. La rejilla
 * (`herramientas/rejilla-049.py`) buscó las combinaciones de golpes ≥ 7,4 dB que dan planos de 2,0-3,8 s: hay dos familias (entrada 161,638 s, ≈ 46 s, planos de 2,6-3,7 s: la usada; entrada 167,452 s, ≈ 40 s, planos de 2,0-2,5 s).
 *
 * EL MATERIAL. Isabella (17-oct, 4K HLG vertical): HK03, MD05, CT01, tone-map con VideoToolbox. El recorrido (31-ago / 2-sep) es HORIZONTAL 1920×1080 SDR y se RECORTA al centro a 608×1080 (`crop` de
 * `normalizar.mjs`, X por clip) y se escala ×2,13: sale MÁS BLANDO que Isabella. Se dice en la entrega y no se filtra (R22: nada de nitidez inventada).
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(11)` = 11/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f83, 2,8 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Con `color` el render
 * lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-049.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-049";

export const FPS_049 = 30;

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
  /** `foto` solo para la tarjeta oscura del cierre (`c13-cierre`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella: el WAV de su voz TRATADA (`<toma>-voz.wav`, `normalizar.mjs`). */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido del usuario desde la V9: «mientras habla Isabella sube los decibeles sin saturar»). Las voces crudas llegan a −22,3 · −23,9 · −20,7 LUFS en su ventana de voz; cada
 * una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS) hasta ≈ −15 LUFS con el pico
 * real a −2,5 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «In This Together» — `archivos/musica/In This Together.mp3` (sha 8 `bd507fe6`), 3:36, Mi menor, cinematic / ambient. Se entra en el golpe de 161,638 s (11,2 dB) y de ahí suena a ≈ −10 LUFS (la canción es
 * MUY fuerte: la ganancia del plan la baja a −15) hasta el 199,5 s, donde cae sola. Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir») en que
 * entra cada plano, con su fuerza en dB por 15 ms: `proyectos/049/musica/golpes-049.json` (`medir-pista.py --desde 161 --dur 48 --json`).
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  apertura: { t: 161.638, db: 11.2 },
  /** Isabella entra A CORTE con el hook; su primera sílaba suena 12,4 f después. */
  hook: { t: 163.903, db: 10.9 },
  /** La unidad empieza: el carril de nado. */
  piscina: { t: 169.903, db: 8.1 },
  /** La Social Kitchen. */
  social: { t: 173.002, db: 7.5 },
  /** El gimnasio (la pared de rayas naranja). */
  gimnasio: { t: 176.505, db: 7.5 },
  /** El gimnasio, desde la entrada (el rótulo «GIMNASIO»). */
  vidrio: { t: 179.605, db: 8.8 },
  /** Isabella entra A CORTE con la mitad; su primera sílaba suena 13 f después. */
  mitad: { t: 183.294, db: 9.5 },
  /** El apartamento: de la isla de la cocina a la sala. */
  cocina: { t: 187.476, db: 7.7 },
  /** La alcoba principal, con la luz de la puerta del baño. */
  alcoba: { t: 190.983, db: 12.7 },
  /** El baño. */
  bano: { t: 194.305, db: 8.5 },
  /** LA VISTA (el clímax): el deck con el jacuzzi comunal, el plano más largo del bloque 5. */
  vista: { t: 197.082, db: 9.3 },
  /** Isabella entra A CORTE con el CTA, en el instante en que la canción CAE; su primera sílaba suena 12 f después. */
  cta: { t: 201.283, db: 8.9 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: 38 ms antes del golpe de entrada (161,638 s), redondeado a un frame (4848/30 = 161,6 s) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 4848 / FPS_049;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_049;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_049;

/** Isabella camina hacia cámara: un empuje lento la acompaña. Los recorridos, quietos: ya son un 1,78× sobre su resolución y un punch-in los ablandaría más. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-049/${id}.mp4`;
const a = (id: string): string => `recorrido-049/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE del canal (la del 017): contraste con cuerpo, negros hundidos, luces recogidas, un punto cálido y +10 % de saturación. Orden del efecto: exposición → balance de blancos → sombras/luces/blancos/negros → contraste →
 * saturación → vibrance. `vibrance` ≤ 0,05 (sobre hormigón gris pinta un moteado de colores y vuelve rosadas las nubes) y las tomas de Isabella, `saturation` ≤ 1,06: la piel se queda donde estaba. El AJUSTE de cada plano
 * se mide (`herramientas/medir-color.py`), no se hereda.
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
 * El frame de cada cambio de plano: el del golpe de la canción en que entra (arriba). TODOS los cortes son secos y caen en un golpe medido.
 */
const P = {
  hook: golpe(GOLPE.hook), //         71 · Isabella entra a corte; su primera palabra, 12,4 f después
  piscina: golpe(GOLPE.piscina), //   251 · acaba el hook; entra la unidad
  social: golpe(GOLPE.social), //     344
  gimnasio: golpe(GOLPE.gimnasio), //   449
  vidrio: golpe(GOLPE.vidrio), // 542
  mitad: golpe(GOLPE.mitad), //       652 · Isabella entra a corte con la mitad
  cocina: golpe(GOLPE.cocina), //     778 · el apartamento
  alcoba: golpe(GOLPE.alcoba), //     883 · la alcoba
  bano: golpe(GOLPE.bano), //         983
  vista: golpe(GOLPE.vista), //       1066 · el clímax, 126 f
  cta: golpe(GOLPE.cta), //           1192 · Isabella entra a corte con el CTA, donde cae la canción
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 5,17 s (155 f) y desde `desde` (6 f) le quedan 149. Su voz va de 0,60 a 4,53 s (f1198-1320 de la comp): 21 f (0,7 s) de su cara tras la última palabra, en los que la
 * imagen funde a negro (los últimos 6). Nada se congela: el plano acaba en el último fotograma del clip.
 */
const DUR_CTA = 149;

/**
 * Dónde acaba la música (frame de la comp): se apaga en línea recta bajo la tarjeta y llega a cero 2 f antes del final de la pieza.
 */
export const FIN_MUSICA_049 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje049: readonly Corte[] = [
  // ── Bloque 1 · la apertura ──
  {
    id: "c01-apertura",
    bloque: 1,
    tipo: "video",
    src: v("rc04"),
    // RC04 (`Img 9469`, SDR 16:9 recortado a 9:16 en X=656), del 1,00 al 3,37 s: el sofá gris con la pared de listones y sus tiras de luz (con la puerta de la alcoba abierta al fondo, al principio) y la mesa
    // redonda con el sol encima: la sala SIN la vista (el ventanal y el cielo del bloque 5 quedan para el final). Entra a corte con el golpe de 11,2 dB del f3 (no nace de negro) y YA VA EN MOVIMIENTO DESDE EL
    // FRAME 0. Es la apertura EXCLUSIVA de esta pieza.
    desde: fr(30),
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.3, shadows: 0.2 }),
    reason:
      "Sala del apartamento (la promesa): el sofá gris, la pared de listones con luz y el balcón que asoma, en una panorámica lenta, de entrada. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y ya está en movimiento.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk03"),
    audio: a("hk03-voz"),
    voz: {
      s0: 0.58,
      s1: 5.62,
      lufs: -15.0,
      dice: "Cuando llegas a una ciudad que no es la tuya, el acompañamiento personalizado es una plusvalía indispensable.",
    },
    // La voz empieza a los 0,58 s («Cuan-», −53 → −21 dB en 20 ms; antes hay una respiración a 0,54 s) y acaba a los 5,62 s; el clip dura 6,20 s (186 f) y va a 29,97 fps (`avg_frame_rate` irregular: `-r 30` tras el
    // tone-map y el plan cuenta los frames del MP4 normalizado). `desde` 5 f entra A CORTE en el golpe de 10,9 dB del f71 (suena entero: la música baja con curva DESPUÉS) y la primera sílaba suena a los 12,4 f del golpe.
    // El plano dura 180 f, hasta el golpe del f251 (y hasta el último fotograma del clip menos 1): 15,7 f tras la última palabra.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-049.ts`): «la» de «no es la tuya» (whisper, confianza 0,68).
    // Isabella en las escaleras exteriores, el edificio detrás.
    desde: fr(5),
    en: P.hook,
    dur: P.piscina - P.hook,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.06, saturation: 1.04 }),
    reason:
      "Las escaleras exteriores (la promesa): Isabella dice «cuando llegas a una ciudad que no es la tuya, el acompañamiento personalizado es una plusvalía indispensable» con el edificio detrás. Entra a corte en un golpe.",
  },
  // ── Bloque 3 · el paseo por la unidad: de fuera adentro ──
  {
    id: "c03-piscina",
    bloque: 3,
    tipo: "video",
    src: v("rc17"),
    // RC17 (`Img 9527`, X=656), del 1,00 al 4,10 s: el carril de nado visto desde el otro extremo, los árboles y el cielo de la tarde, la cámara girando despacio a la derecha. Es el exterior de la unidad: tras la promesa, lo
    // primero que se ve. Se eligió RC17 y no RC16 porque RC16 lo usan casi todas las piezas hermanas (045-048): menos repetición entre los seis reels.
    desde: 1.0,
    en: P.piscina,
    dur: P.social - P.piscina,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.25, shadows: 0.35, blacks: 0 }),
    reason:
      "La piscina (la unidad, por fuera): el carril de nado entre los árboles bajo el cielo de la tarde: la primera amenidad, al aire libre, tras las escaleras donde habló Isabella.",
  },
  {
    id: "c04-social-kitchen",
    bloque: 3,
    tipo: "video",
    src: v("rc12"),
    // RC12 (`Img 9514`, X=656), del 3,20 al 6,70 s: la Social Kitchen desde el lado del ventanal (la silla de madera sale de cuadro a los 3,4 s): las lámparas verdes, las mesas y el jardín detrás; la cámara sigue girando a la
    // derecha, como el plano anterior.
    desde: 3.2,
    en: P.social,
    dur: P.gimnasio - P.social,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.4, highlights: -0.3 }),
    reason:
      "La Social Kitchen (la unidad, por dentro): las lámparas verdes, las mesas y el ventanal al jardín: el sitio donde se comparte; de la piscina entramos al edificio.",
  },
  {
    id: "c05-gimnasio",
    bloque: 3,
    tipo: "video",
    src: v("rc14"),
    // RC14 (`Img 9517`, X=656), del 0,30 al 3,40 s: el gimnasio, la pared de rayas naranja con su estante y, al girar a la derecha, las máquinas y el espejo del fondo. Lo ocupan personas entrenando (a lo lejos, sin cara).
    desde: 0.3,
    en: P.gimnasio,
    dur: P.vidrio - P.gimnasio,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.4, shadows: 0.35, blacks: 0 }),
    reason:
      "El gimnasio (la unidad, el equipo): la pared de rayas naranja, las máquinas y el espejo: de la Social Kitchen pasamos al lado activo del edificio.",
  },
  {
    id: "c06-gimnasio-2",
    bloque: 3,
    tipo: "video",
    src: v("rc13"),
    // RC13 (`Img 9516`, X=656), del 0,20 al 3,87 s: el gimnasio desde la entrada, los techos con sus luminarias, las máquinas al fondo y, al girar a la derecha, el rótulo «GIMNASIO» en la pared. SE DEJÓ FUERA el final del clip
    // (4,6-6,0 s: la cámara llega al vidrio y un hombre en la caminadora sale de frente y reconocible) y con él el raccord del cristal; en este tramo las personas están a lo lejos, sin cara reconocible (aviso en la entrega).
    desde: 0.2,
    en: P.vidrio,
    dur: P.mitad - P.vidrio,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.1, shadows: 0.15 }),
    reason:
      "El gimnasio (la unidad, el equipo): las máquinas, las luminarias y el rótulo «GIMNASIO» al girar: el sitio donde, en el plano siguiente, habla Isabella.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c07-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md05"),
    audio: a("md05-voz"),
    voz: {
      s0: 0.6,
      s1: 3.55,
      lufs: -15.0,
      dice: "Además, esta unidad cuenta con diferentes tipos de amenidades.",
    },
    // La voz empieza a los 0,60 s («A-», −48 → −18 dB) y acaba a los 3,55 s; el clip dura 4,43 s (133 f). `desde` 5 f entra A CORTE en el golpe de 9,5 dB del f652 (suena entero: la música baja DESPUÉS) y la primera
    // sílaba suena a los 13 f del golpe. El plano dura 126 f (hasta el golpe del f778): 24,5 f tras la última palabra.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-049.ts`): «esta» de «esta unidad» (whisper, confianza 0,59).
    // Isabella en el gimnasio, tras el vidrio.
    desde: fr(5),
    en: P.mitad,
    dur: P.cocina - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.06, saturation: 1.04 }),
    reason:
      "El gimnasio, tras el vidrio (las amenidades): Isabella dice «además, esta unidad cuenta con diferentes tipos de amenidades»: lo que las tomas anteriores enseñaron, dicho por ella. Entra a corte en un golpe.",
  },
  // ── Bloque 5 · el apartamento y el clímax ──
  {
    id: "c08-cocina",
    bloque: 5,
    tipo: "video",
    src: v("rc01"),
    // RC01 (`Img 9461`, recortada en X=900 para que entren la isla y los taburetes), del 1,20 al 4,70 s: la isla de la cocina de mármol claro, los taburetes negros y el ventanal alargado con el jardín, con la cámara
    // girando a la derecha hacia la sala. PEDIDA POR EL USUARIO tras ver la prueba («incluye tomas: Img 9484, Img 9481, Img 9461»): es la APERTURA de la V27 (045) en el reparto original; aquí no abre nada y se ve solo
    // la cocina (el final del clip, 8-12 s, enseña el ventanal con la vista entera: se deja fuera, esa vista es del clímax). Se declara en el plan y en la entrega.
    desde: 1.2,
    en: P.cocina,
    dur: P.alcoba - P.cocina,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.2, highlights: -0.3 }),
    reason:
      "La cocina con isla (el apartamento, la entrada): el mármol claro, los taburetes y el ventanal con el jardín, girando hacia la sala: de la unidad compartida a lo que es solo de quien arrienda.",
  },
  {
    id: "c09-alcoba",
    bloque: 5,
    tipo: "video",
    src: v("rc08"),
    // RC08 (`Img 9481`, X=656), del 1,70 al 5,03 s: la alcoba principal de lado, la cama hecha, la luz verde de la puerta de vidrio esmerilado del baño, las puertas de madera y el televisor: la cámara gira a la derecha y pasa por
    // la puerta del baño (el clip dura 5,1 s: el plano llega casi al último fotograma). PEDIDA POR EL USUARIO («Img 9481»). Hacia los 29,4-30,4 s del vídeo se ve un adorno oscuro en la pared (parece un crucifijo pequeño).
    desde: 1.7,
    en: P.alcoba,
    dur: P.bano - P.alcoba,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.3, highlights: -0.3 }),
    reason:
      "La alcoba principal (el apartamento, el descanso): la cama hecha y, al girar, la puerta de vidrio esmerilado del baño con su luz detrás: lleva al plano siguiente, que empieza dentro.",
  },
  {
    id: "c10-bano",
    bloque: 5,
    tipo: "video",
    src: v("rc09"),
    // RC09 (`Img 9484`, X=656; PEDIDA POR EL USUARIO), del 5,20 al 7,97 s: el baño principal, el lavamanos sobre la encimera, el espejo y la mampara de vidrio: la cámara gira a la derecha. Es el último tramo del clip: las demás piezas usan el
    // medio. Más corto que la vista (2,8 s frente a 4,2).
    desde: 5.2,
    en: P.bano,
    dur: P.vista - P.bano,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.4, highlights: -0.45, whites: -0.3 }),
    reason:
      "El baño principal (el apartamento, el cuidado): el lavamanos, el espejo y la mampara: la calma antes de salir a la terraza.",
  },
  {
    id: "c11-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc19"),
    // RC19 (`Img 9529`, X=450 para que entre el jacuzzi), del 0,30 al 4,50 s: el deck de madera con el JACUZZI COMUNAL redondo, la baranda de acero, la pérgola y el cielo cubierto de la tarde; la cámara gira a la
    // derecha y acaba en el suelo de la terraza. Es el CLÍMAX de esta pieza (exclusivo) y el plano más largo del bloque 5 (4,2 s, el clip entero menos 0,3 s: dura 4,70 s). La canción hace aquí su meseta más alta antes de caer.
    // OJO: NO es el jacuzzi PRIVADO del balcón (la foto `3-Jacuzzi.png`), que no sale en ningún clip del material: es el COMUNAL de la terraza de la unidad.
    desde: fr(9),
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.05, shadows: 0.35 }),
    reason:
      "El deck con el jacuzzi comunal (el clímax): la madera, el agua redonda, la baranda y la pérgola bajo el cielo de la tarde: la terraza de la unidad, justo donde habla Isabella en el plano siguiente. El plano más largo del bloque. Entra a corte en un golpe.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c12-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct01"),
    audio: a("ct01-voz"),
    voz: {
      s0: 0.6,
      s1: 4.53,
      lufs: -15.0,
      dice: "Si quieres un acompañamiento personalizado durante toda tu estancia, contáctanos.",
    },
    // La voz empieza a los 0,60 s («Si», −43 → −31 dB; la sílaba fuerte, «-quie-», a los 0,71 s) y acaba a los 4,53 s; el clip dura 5,17 s (155 f). `desde` 6 f entra A CORTE en el golpe de 8,9 dB del f1192, donde
    // la canción empieza a caer, y la primera sílaba suena a los 12 f. El plano dura 149 f (hasta el último fotograma del clip): 20,4 f tras la última palabra, en los que la imagen funde a negro (los últimos 6).
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-049.ts`): «durante», «tu» y «contáctanos» (whisper: 0,74 · 0,43 · 0,38 para su final «-anos»).
    // Isabella junto al jacuzzi comunal redondo, con la baranda y las plantas.
    desde: fr(6),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.06, saturation: 1.04 }),
    reason:
      "Junto al jacuzzi comunal (la invitación): Isabella dice «si quieres un acompañamiento personalizado durante toda tu estancia, contáctanos»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-049.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c13-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-049/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c12
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c13). */
export const DURACION_049 = P.cta + DUR_CTA + DUR_TARJETA;
