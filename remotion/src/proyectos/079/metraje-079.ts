/**
 * EL RECORRIDO 079 — «Suite Go Living (El Poblado)», V60 del registro: la PRUEBA de la estructura «lo vendible antes del segundo 10» (pedido del 2026-11-10), montada con el material de la 070 (V51).
 *
 * POR QUÉ EXISTE. Los reels retienen más del 90 % en el hook, pero el cliente solo mira los primeros 10 s. El usuario fijó esta variante de la estructura del canal:
 *
 *   1  la toma inicial, igual que hoy (sin texto ni voz)
 *   2  transición a Isabella con el hook y, EN ESE MOMENTO, entra la ficha (tipo, locación y precio: `ficha-079.ts`)
 *   3  DOS planos llamativos del apartamento, rápidos
 *   4  transición a Isabella a cámara, con el bloque de la mitad
 *   5  el recorrido inmersivo
 *   6  el CTA de Isabella y el cierre
 *
 * Es la 070 reordenada: la misma terna de voz (HK01 · MD02 · CT01), el mismo exterior (DR02) y la misma canción con la misma entrada, para que se pueda comparar una con otra. Lo que cambia:
 *
 *   bloque 1  c01                  el edificio (DR02), idéntico a la 070: f0-f88, SIN TEXTO NI VOZ
 *   bloque 2  c02                  el hook (HK01), idéntico a la 070: f88-f217; la ficha entra en el f88, con ella
 *   bloque 3  c03 c04              DOS planos rápidos, lo más vistoso de la suite: el ventanal con la ciudad y la cama (RC05, 2,1 s) → el sofá, la mesa y la cama con sus cuadros (RC04, 1,5 s). Acaban en el f324 (10,8 s):
 *                                  en el segundo 10 ya se ha visto el edificio, a Isabella, la ficha entera, la vista y la habitación
 *   bloque 4  c05                  la mitad (MD02), a corte en el golpe de 16,8 dB del f324 (antes entraba en el f515: 6,4 s antes)
 *   bloque 5  c06 … c10            el recorrido inmersivo, de la puerta al ventanal, cinco planos seguidos y sin voz: la mano que abre (RC12) → la cocineta (RC02) → el baño (RC01) → la cama y el mueble de TV (RC06)
 *                                  → LA VISTA (RC07, el clímax y el plano más largo). Desde el f770 la pieza es fotograma a fotograma la 070 salvo que la cama entra a corte
 *   bloque 6  c11 c12              el CTA (CT01) y la tarjeta oscura, idénticos a la 070
 *
 * LO QUE SE PIERDE RESPECTO DE LA 070: el sofá (RC04) pasa del bloque 5 a los dos planos rápidos, y entra RC05 (el ventanal), que la 070 no usaba (lo usan la 072, la 073 y la 075 en otros tramos: declarado en `combinaciones`).
 *
 * NINGUNA PIEZA DICE QUÉ EXIGE EL POT NI QUE ESTA SUITE LO CUMPLA (igual que la 070): el hook lo pregunta, la mitad habla de «condiciones para operar» y el CTA nombra la operación hotelera del edificio, que consta en el anuncio.
 *
 * QUIÉN MARCA EL TIEMPO. «Somewhere inside of me», entrando en el mismo golpe que la 070 (298,394 s en el f3); la rejilla son los golpes MEDIDOS (`proyectos/079/musica/golpes-cancion-entera.json`) y cada cambio de plano
 * cae en uno (cortes secos ≥ 10,1 dB; la disolvencia del hook ACABA en el suyo). La canción cae desde los 332,5 s, 2 s después de entrar el CTA.
 *
 * UNIDADES. `desde`, en SEGUNDOS de la fuente; `en` y `dur`, en frames de la composición. Planos CONTIGUOS. El que entra disolviendo (solo el hook) empieza a verse 12 f ANTES de su `en`.
 *
 * EL COLOR (R32): cada plano lleva su `color`; con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-079.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-079";

export const FPS_079 = 30;

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
  /** `foto` solo para la tarjeta oscura del cierre (`c12-cierre`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella: el WAV de su voz TRATADA (`<toma>-voz.wav`, `normalizar.mjs`). */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −22,9 · −24,5 · −23,6 LUFS en su ventana de voz (habla a unos metros
 * de un iPhone); cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS)
 * hasta −15,0 LUFS con el pico real a −2,5 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Somewhere inside of me» (Tiësto presents Allure, Alexander Gorshkov chillout remix) — `archivos/musica/Tiesto pres. Allure - Somewhere inside οf me (Alexander Gorshkov chillout remix).mp3` (sha 8 `96faa93f`),
 * 5:47. Se entra en su golpe de 298,394 s (13,6 dB) y de ahí suena en una meseta de −9,5 a −10,4 LUFS hasta que CAE, desde los 332,5 s (−11 → −27 → silencio en tramos de 5 s). Los golpes de abajo son los MEDIDOS
 * (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir»): `proyectos/079/musica/golpes-cancion-entera.json` (`medir-pista.py --json`). La rejilla la dio `buscar-cortes-lp.py`
 * con estos planos: ver `musica/rejilla-079.txt`.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 298.394, db: 13.6 },
  /** La disolvencia al hook ACABA aquí (la imagen de Isabella ya es opaca): el golpe suena entero y la música baja con curva después. La ficha entra con él. */
  hook: { t: 301.208, db: 12.3 },
  /** Los DOS planos rápidos: el ventanal (a corte, donde acaba el hook) y el sofá. */
  plano1: { t: 305.513, db: 12.6 },
  plano2: { t: 307.596, db: 13.2 },
  /** La mitad entra A CORTE en este golpe, el más fuerte del tramo: suena entero y la música baja después. */
  mitad: { t: 309.081, db: 16.8 },
  /** El recorrido inmersivo: cinco cortes secos. */
  puerta: { t: 314.277, db: 11.1 },
  cocineta: { t: 317.843, db: 11.2 },
  bano: { t: 320.963, db: 16.7 },
  cama: { t: 323.933, db: 10.1 },
  vista: { t: 326.899, db: 13.4 },
  /** El CTA entra A CORTE en este golpe; la canción cae sola 2 s después. */
  cta: { t: 330.465, db: 11.1 },
} as const;

/** Dónde cae la canción (s): −7,9 → −18,4 → −49,6 dB relativos (10,5 / 41,7 dB en 5 y 10 s). */
export const DECAE = { t: 332.5, lufsAntes: -10.4, lufs5s: -27.2, lufs10s: -70 } as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (298,394 s) cae en el frame 3 de la pieza; redondeado a un frame (8950/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 8950 / FPS_079;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_079;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_079;

/** Isabella: un empuje lento hacia ella (camina hacia cámara: el empuje la acompaña). Los recorridos y el exterior, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-079/${id}.mp4`;
const a = (id: string): string => `recorrido-079/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE del canal: contraste con cuerpo, negros hundidos, luces recogidas (los cielos son lo primero que se quema), un punto cálido y +10 % de saturación. Orden del efecto: exposición → balance de blancos →
 * sombras/luces/blancos/negros → contraste → saturación → vibrance. `vibrance` ≤ 0,05 (sobre hormigón gris pinta un moteado de colores y vuelve rosadas las nubes) y las tomas de Isabella, `saturation` ≤ 1,06:
 * la piel se queda donde estaba. El AJUSTE de cada plano se mide (`herramientas/medir-color.py`), no se hereda.
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
 * Los frames de cada cambio de plano: todos salen de `golpe(...)`, así que mover la entrada de la música es cambiar `INICIO_MUSICA`. El que entra disolviendo (el hook y la primera del bloque 5) tiene aquí el `en`
 * de la disolvencia YA TERMINADA: el plano anterior dura hasta él y el siguiente empieza a verse 12 f ANTES.
 */
const P = {
  hook: golpe(GOLPE.hook), //         88 · Isabella ya es opaca; entra la ficha; su primera palabra suena 12 f después
  ventanal: golpe(GOLPE.plano1), //  217 · acaba el hook; primer plano rápido (a corte)
  sofa: golpe(GOLPE.plano2), //      280 · segundo plano rápido (a corte)
  mitad: golpe(GOLPE.mitad), //      324 · Isabella con la mitad (a corte), a los 10,8 s
  puerta: golpe(GOLPE.puerta), //    480 · empieza el recorrido inmersivo: la mano que abre (a corte)
  cocineta: golpe(GOLPE.cocineta), // 587 · la cocineta (a corte)
  bano: golpe(GOLPE.bano), //        681 · el pasillo hacia el baño (a corte)
  cama: golpe(GOLPE.cama), //        770 · la cama y el mueble de TV (a corte)
  vista: golpe(GOLPE.vista), //      859 · la vista de la ciudad (a corte)
  cta: golpe(GOLPE.cta), //          966 · Isabella con el CTA (a corte)
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 4,83 s (145 f) y desde `desde` (3 f) hasta el f141 del clip hay 138. Su voz va de 0,50 a 4,10 s (f978 a f1086 de la comp): 16 f (0,53 s) de su cara tras la última
 * palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela: el plano acaba antes del final del clip, que sigue 4 f más.
 */
const DUR_CTA = 138;

/**
 * Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero aquí, 2 f antes del final de la pieza (la tarjeta va en silencio; la canción ya cae sola desde los 332,5 s).
 */
export const FIN_MUSICA_079 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje079: readonly Corte[] = [
  // ── Bloque 1 · el edificio ──
  {
    id: "c01-edificio",
    bloque: 1,
    tipo: "video",
    src: v("dr02"),
    // DR02 (iPhone desde el suelo, 4K HLG → BT.709), del 0,30 al 3,23 s: la fachada de voladizos oscuros con el sol de frente y, al final, la entrada acristalada con sus plantas. Entra a corte con el golpe de 13,6 dB del f3.
    desde: 0.3,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El edificio visto desde el suelo (la promesa): la fachada de voladizos con el sol de frente y la entrada de vidrio. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de operación hotelera.",
  },
  // ── Bloque 2 · el hook (con él entra la ficha) ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk01"),
    audio: a("hk01-voz"),
    voz: {
      s0: 1.17,
      s1: 4.1,
      lufs: -15,
      dice: "¿Te preocupa invertir en el Airbnb con los cambios del POT?",
    },
    // La voz empieza a los 1,17 s (35,1 f) y acaba a los 4,10 s (123 f); el clip dura 5,17 s (155 f). `desde` 23 f entra DISOLVIENDO (el clip tiene 23 f antes) y la primera palabra suena a los 12,1 f del `en`: la música
    // baja con curva sobre ellos (10 f). El plano dura 129 f (hasta el golpe del f217): 29 f tras la última palabra, en los que la música sube.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-079.ts`): «POT» (whisper 0,37) y si dice «en Airbnb» o «en el Airbnb» (whisper oyó «en el»).
    // Isabella camina hacia cámara desde el ventanal de la suite, con la cama a la derecha y el espejo del pasillo a la izquierda.
    desde: fr(23),
    en: P.hook,
    dur: P.ventanal - P.hook,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "La suite con el ventanal y la ciudad detrás (la preocupación): Isabella camina hacia cámara y pregunta «¿te preocupa invertir en Airbnb con los cambios del POT?». Entra disolviendo desde el exterior; la música ya está abajo.",
  },
  // ── Bloque 3 · DOS planos rápidos: lo más vistoso, antes del segundo 10 ──
  {
    id: "c03-ventanal",
    bloque: 3,
    tipo: "video",
    src: v("rc05"),
    // RC05 (iPhone, 4K HLG), del 0,50 al 2,60 s: el ventanal de lado a lado con los edificios de El Poblado, la planta y la cama que entra por la derecha. La 070 no usa este clip. A CORTE en el golpe de 12,6 dB (f217).
    desde: 0.5,
    en: P.ventanal,
    dur: P.sofa - P.ventanal,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.08 }),
    reason:
      "El ventanal con la ciudad y la cama (lo más vistoso, antes del segundo 10): la cámara pasa de los edificios de El Poblado a la cama king. Primer plano rápido: quien solo mira diez segundos ya ha visto la vista y la habitación.",
  },
  {
    id: "c04-sofa",
    bloque: 3,
    tipo: "video",
    src: v("rc04"),
    // RC04 (iPhone, 4K HLG), del 0,60 al 2,07 s: el sofá gris, la mesa redonda y la cama con su cabecero y los cuadros, con el ventanal al fondo. A CORTE en el golpe de 13,2 dB (f280).
    desde: 0.6,
    en: P.sofa,
    dur: P.mitad - P.sofa,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.08 }),
    reason:
      "El sofá, la mesa y la cama con sus cuadros (la habitación entera de un vistazo): segundo plano rápido, 1,5 s; con él se cumplen los diez segundos y vuelve Isabella.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c05-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md02"),
    audio: a("md02-voz"),
    voz: {
      s0: 0.65,
      s1: 4.78,
      lufs: -15,
      dice: "No todas las propiedades tienen las mismas condiciones para operar turísticamente.",
    },
    // La voz empieza a los 0,65 s (19,5 f) y acaba a los 4,78 s (143,4 f); el clip dura 5,53 s (166 f) y se usa ENTERO (`desde` 0): no hay 12 f antes de él para una disolvencia, así que entra A CORTE en el golpe de 16,8 dB del f324, que
    // suena entero; la música baja con curva en 10 f y la primera palabra suena a los 19,5 f. El plano dura 156 f (hasta el golpe del f480, donde el recorrido entra a corte; del clip quedan 10 f): 12,6 f tras la última palabra, en los que la música sube.
    // Isabella, junto al ventanal con la ciudad y la cama a la derecha, de pie y quieta.
    desde: 0,
    en: P.mitad,
    dur: P.puerta - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "Junto al ventanal (la condición, dicha): Isabella, de pie con la ciudad detrás, dice «no todas las propiedades tienen las mismas condiciones para operar turísticamente». Entra a corte tras los dos planos rápidos, a los 10,8 s.",
  },
  // ── Bloque 5 · el recorrido inmersivo, de la puerta al ventanal ──
  {
    id: "c06-puerta",
    bloque: 5,
    tipo: "video",
    src: v("rc12"),
    // RC12 (iPhone, 4K HLG), del 1,00 al 4,57 s: el primer plano de la mano con la tarjeta en la cerradura, la puerta que se abre y la cámara que entra al pasillo con la cocineta a un lado. Se salta el primer segundo, donde se ve
    // el número de la puerta (el catálogo, §5). Entra A CORTE en el golpe de 12,6 dB que abre el paseo (f217). Es el puente humano del formato: la mano que abre.
    desde: 1.0,
    en: P.puerta,
    dur: P.cocineta - P.puerta,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "La puerta (el umbral): una mano abre con la tarjeta y la cámara entra al pasillo de la suite; el golpe del paseo abre el descubrimiento y la mano es el puente humano.",
  },
  {
    id: "c07-cocineta",
    bloque: 5,
    tipo: "video",
    src: v("rc02"),
    // RC02 (iPhone, 4K HLG), del 0,60 al 3,43 s: la cocineta con el microondas, la nevera pequeña, la cafetera y la estufa de dos puestos; la cámara se acerca y sube. Sin personas.
    desde: 0.6,
    en: P.cocineta,
    dur: P.bano - P.cocineta,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "La cocineta (lo práctico): el microondas, la nevera, la cafetera y la estufa, todo lo que una estancia corta necesita; viene tras la puerta y antes del baño, en el orden del pasillo.",
  },
  {
    id: "c08-bano",
    bloque: 5,
    tipo: "video",
    src: v("rc01"),
    // RC01 (iPhone, 4K HLG), del 0,80 al 4,37 s: el pasillo de la entrada, la puerta de madera y el baño privado (inodoro, lavamanos y, al fondo, la ducha de vidrio). La cámara gira a la derecha hacia el baño.
    desde: 0.8,
    en: P.bano,
    dur: P.cama - P.bano,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El pasillo y el baño privado (lo práctico, al detalle): la puerta de madera, el lavamanos y la ducha de vidrio; cierra el paseo por lo que hay detrás de la puerta antes de volver a la habitación.",
  },
  {
    id: "c09-cama",
    bloque: 5,
    tipo: "video",
    src: v("rc06"),
    // RC06 (iPhone, 4K HLG), del 1,20 al 4,17 s: del mueble de TV y el escritorio a la cama, con el aire acondicionado a la vista. Entra A CORTE en el golpe del f770.
    desde: 1.2,
    en: P.cama,
    dur: P.vista - P.cama,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.12 }),
    reason:
      "La cama y el mueble de TV (cómo se vive): de la pantalla y el escritorio a la cama king; lo que se encuentra el huésped al entrar a su habitación.",
  },
  {
    id: "c10-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc07"),
    // RC07 (iPhone, 4K HLG), del 2,50 al 6,07 s: de la cama sube hasta el ventanal con la repisa de ladrillo y la ciudad y las montañas de El Poblado al fondo. Entra A CORTE en el golpe de 13,4 dB (f859) y es el plano más
    // largo del bloque 5 (107 f): el clímax. Del clip quedan 4 f más.
    desde: 2.5,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05, highlights: -0.3, whites: -0.15 }),
    reason:
      "La ciudad desde el ventanal (la vista, el clímax): de la cama sube hasta la ventana con El Poblado y las montañas al fondo; lo que se ve desde el piso 9. El plano más largo del bloque.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c11-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct01"),
    audio: a("ct01-voz"),
    voz: {
      s0: 0.5,
      s1: 4.1,
      lufs: -15,
      dice: "Conoce Go Living, un edificio con operación hotelera activa.",
    },
    // La voz empieza a los 0,50 s (15 f) y acaba a los 4,10 s (123 f); el clip dura 4,83 s (145 f). Solo hay 15 f antes de su primera palabra, así que entra A CORTE en el golpe del f966 (`desde` 3 f: la primera palabra suena a los 12 f
    // del golpe, que suena entero) y la música baja con curva en 10 f. El plano dura 138 f (acaba en el f141 del clip, 4 f antes de su final): 16 f tras la última palabra, en los que la imagen funde a negro (los últimos 6).
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-079.ts`): cómo se escribe «Go Living» (whisper oyó «GoLiving», 0,40).
    // Isabella sentada en el sofá gris, con la cama y los cuadros detrás y la mesa redonda delante.
    desde: fr(3),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "Sofá de la suite (la invitación): Isabella, sentada, dice «conoce Go Living, un edificio con operación hotelera activa»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  {
    id: "c12-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-079/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c11
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c12). */
export const DURACION_079 = P.cta + DUR_CTA + DUR_TARJETA;
