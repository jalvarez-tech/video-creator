/**
 * EL RECORRIDO 082 — «Suite Go Living (El Poblado)», V63 del registro: la variante B de la 073 con la estructura «lo vendible antes del segundo 10» (`recorrido-luxur` §3, fijada el 2026-11-10; la primera pieza
 * así es la 079).
 *
 * ÁNGULO: «¿Vives fuera de Colombia y quieres invertir en Medellín?» → una suite hotelera con matrícula independiente. Conserva la terna de voz de la 073 (HK10 · MD01 · CT10), su exterior (DR09) y su canción, «Chillin' (Chillstep Mix)», con la MISMA entrada
 * (259.167 s): no es una versión nueva de la propiedad sino su variante B, y por eso repite canción (declarado en `combinaciones.md` y en `archivos/musica/registro-de-uso.md`).
 *
 *   bloque 1  c01-edificio             el exterior de la 073: f0-f93, SIN TEXTO NI VOZ
 *   bloque 2  c02-hook                 el hook de la 073, en el mismo frame; en la versión con ficha la ficha entra con él
 *   bloque 3  c03-fachada · c04-ventana   DOS planos rápidos, lo más vistoso, de ≤ 2,5 s cada uno y a corte: el segundo empieza en 8,4 s (antes del 10)
 *   bloque 4  c05-mitad                la mitad de la 073, a corte en el golpe del f315 (10,5 s: antes de los 11)
 *   bloque 5  c06-puerta … c11-vista   UN solo recorrido inmersivo, sin voz, de 6 planos; la vista (RC07) es el último y el más largo
 *   bloque 6  c12-cta y la tarjeta   el CTA de la 073 en su mismo golpe y la tarjeta oscura con el logo y la web
 *
 * LOS PLANOS (frames de la composición, 30 fps):
 *   1  c01-edificio               f   0-  93    0,0-  3,1 s  3,1 s
 *   2  c02-hook                   f  93- 205    3,1-  6,8 s  3,7 s
 *   3  c03-fachada                f 205- 253    6,8-  8,4 s  1,6 s
 *   3  c04-ventana                f 253- 315    8,4- 10,5 s  2,1 s
 *   4  c05-mitad                  f 315- 486   10,5- 16,2 s  5,7 s
 *   5  c06-puerta                 f 486- 592   16,2- 19,7 s  3,5 s
 *   5  c07-cocineta               f 592- 670   19,7- 22,3 s  2,6 s
 *   5  c08-umbral                 f 670- 758   22,3- 25,3 s  2,9 s
 *   5  c09-tv                     f 758- 813   25,3- 27,1 s  1,8 s
 *   5  c10-cama                   f 813- 872   27,1- 29,1 s  2,0 s
 *   5  c11-vista                  f 872-1014   29,1- 33,8 s  4,7 s
 *   6  c12-cta                    f1014-1169   33,8- 39,0 s  5,2 s
 *
 * QUIÉN MARCA EL TIEMPO. «Chillin' (Chillstep Mix)», entrando en el mismo golpe que la 073 (259.21 s en el f3); la rejilla son los golpes MEDIDOS (`proyectos/082/musica/golpes-cancion-entera.json`) y cada cambio de plano
 * cae en uno (cortes secos ≥ 8 dB).
 *
 * UNIDADES. `desde`, en SEGUNDOS de la fuente; `en` y `dur`, en frames de la composición. Planos CONTIGUOS. El que entra disolviendo empieza a verse 12 f ANTES de su `en`.
 *
 * EL COLOR (R32): cada plano lleva su `color`; con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-082.ts`). La puerta lo carga con node. LO ESCRIBE `proyectos/080/herramientas/montar-pieza.mjs` desde `proyectos/082/pieza.json`.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-082";

export const FPS_082 = 30;

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
  /** `foto` solo para la tarjeta oscura del cierre (un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella: el WAV de su voz TRATADA (`<toma>-voz.wav`, `normalizar.mjs`). */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»). Cada toma pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1,
 * ganancia buscada tras el compresor y limitador a −2,5 dBFS) hasta −15,0 LUFS con el pico real a −2,5 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Chillin' (Chillstep Mix)» (`archivos/musica/…`). Se entra en su golpe de 259.21 s (22.2 dB). Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el
 * de «empieza a subir»): `proyectos/082/musica/golpes-cancion-entera.json` (`medir-pista.py --json`). El reparto de los cortes lo hace `montar-pieza.mjs` sobre ellos.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 259.21, db: 22.2 },
  /** El hook entra aquí: Isabella ya es opaca y su primera palabra suena unos frames después; la música baja con curva tras el golpe. */
  hook: { t: 262.216, db: 22.8 },
  /** El primer plano rápido, a corte (f205, 6,8 s). */
  rapido1: { t: 265.931, db: 9 },
  /** El segundo plano rápido, a corte (f253, 8,4 s: antes del segundo 10). */
  rapido2: { t: 267.559, db: 9.5 },
  /** La mitad entra A CORTE aquí (f315, 10,5 s: antes de los 11 s): suena entero y la música baja después. */
  mitad: { t: 269.617, db: 21.5 },
  /** El recorrido inmersivo: el plano «r1» entra a corte. */
  r1: { t: 275.312, db: 13.7 },
  /** El recorrido inmersivo: el plano «r2» entra a corte. */
  r2: { t: 278.833, db: 12.6 },
  /** El recorrido inmersivo: el plano «r3» entra a corte. */
  r3: { t: 281.451, db: 9.3 },
  /** El recorrido inmersivo: el plano «r4» entra a corte. */
  r4: { t: 284.389, db: 25.1 },
  /** El recorrido inmersivo: el plano «r5» entra a corte. */
  r5: { t: 286.213, db: 15.9 },
  /** El recorrido inmersivo: el plano «la vista, el clímax» entra a corte. */
  vista: { t: 288.183, db: 10.3 },
  /** El CTA entra A CORTE en este golpe, el mismo de la original. */
  cta: { t: 292.919, db: 10.6 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (259.21 s) cae en el frame 3 de la pieza; redondeado a un frame (7775/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 7775 / FPS_082;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_082;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_082;

/** Isabella: un empuje lento hacia ella. Los recorridos y el exterior, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-082/${id}.mp4`;
const a = (id: string): string => `recorrido-082/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE del canal: contraste con cuerpo, negros hundidos, luces recogidas (los cielos son lo primero que se quema), un punto cálido y +10 % de saturación. `vibrance` ≤ 0,05 y las tomas de Isabella,
 * `saturation` ≤ 1,06: la piel se queda donde estaba. El AJUSTE de cada plano es el medido en la pieza original (`herramientas/medir-color.py`), no se hereda a ciegas.
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

/** El color de un plano: la base más el ajuste de su toma. */
const color = (ajuste: ColorCine = {}): ColorCine => ({ ...COLOR_BASE, ...ajuste });

/**
 * Los frames de cada cambio de plano: todos salen de `golpe(...)`, así que mover la entrada de la música es cambiar `INICIO_MUSICA`. El que entra disolviendo tiene aquí el `en` de la disolvencia YA TERMINADA: el plano
 * anterior dura hasta él y el siguiente empieza a verse 12 f ANTES.
 */
const P = {
  hook: golpe(GOLPE.hook), //   93 · Isabella ya es opaca; entra la ficha (versión con ficha); su primera palabra suena unos frames después
  rapido1: golpe(GOLPE.rapido1), //  205 · primer plano rápido (a corte)
  rapido2: golpe(GOLPE.rapido2), //  253 · segundo plano rápido (a corte)
  mitad: golpe(GOLPE.mitad), //  315 · Isabella con la mitad (a corte)
  r1: golpe(GOLPE.r1), //  486 · puerta (a corte)
  r2: golpe(GOLPE.r2), //  592 · cocineta (a corte)
  r3: golpe(GOLPE.r3), //  670 · umbral (a corte)
  r4: golpe(GOLPE.r4), //  758 · tv (a corte)
  r5: golpe(GOLPE.r5), //  813 · cama (a corte)
  vista: golpe(GOLPE.vista), //  872 · LA VISTA (a corte)
  cta: golpe(GOLPE.cta), // 1014 · Isabella con el CTA (a corte)
} as const;

/** Frames que dura la toma del CTA (la de la 073, en su mismo golpe): tras su última palabra la imagen funde a negro (los últimos 6) y sigue la tarjeta. Nada se congela. */
const DUR_CTA = 155;

/** Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero aquí, 2 f antes del final de la pieza (la tarjeta va en silencio). */
export const FIN_MUSICA_082 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje082: readonly Corte[] = [
  {
    id: "c01-edificio",
    bloque: 1,
    tipo: "video",
    src: v("dr09"),
    // DR09 (iPhone desde el suelo, 4K HLG → BT.709), del 2,00 al 5,10 s: el mismo exterior de la 073. Entra a corte con el golpe de 22.2 dB del f3.
    desde: 2,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El edificio visto desde el suelo (la promesa): la torre entre las palmas, con el cielo de Medellín detrás. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de quien vive lejos.",
  },
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk10"),
    audio: a("hk10-voz"),
    voz: {
      s0: 0.57,
      s1: 3.31,
      lufs: -15,
      dice: "¿Vives fuera de Colombia y quieres invertir en Medellín?",
    },
    // La voz empieza a los 0.57 s y acaba a los 3.31 s (la misma toma que la 073, entra en el mismo frame). El plano dura hasta el golpe del f205: 13 f tras la última palabra, en los que la música sube.
    desde: 0,
    en: P.hook,
    dur: P.rapido1 - P.hook,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "La terraza del edificio (la pregunta a quien vive lejos): Isabella, rodeada de plantas, pregunta «¿vives fuera de Colombia y quieres invertir en Medellín?». Entra a corte desde el exterior; la música baja tras el golpe.",
  },
  {
    id: "c03-fachada",
    bloque: 3,
    tipo: "video",
    src: v("dr02"),
    // DR02 (iPhone, 4K HLG), del 1,00 al 2,60 s: la fachada oscura de voladizos con el destello del sol, inclinando hacia la entrada de vidrio. A CORTE en el golpe de 9.0 dB (f205).
    desde: 1,
    en: P.rapido1,
    dur: P.rapido2 - P.rapido1,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El edificio con el sol de frente (lo más vistoso, antes del segundo 10): para quien vive fuera, lo primero es ver qué edificio es. Primer plano rápido: quien solo mira diez segundos ya ve qué se vende.",
  },
  {
    id: "c04-ventana",
    bloque: 3,
    tipo: "video",
    src: v("rc10"),
    // RC10 (iPhone, 4K HLG), del 0,00 al 2,07 s: de la cama sube al ventanal con la ciudad y las montañas de El Poblado. A CORTE en el golpe de 9.5 dB (f253).
    desde: 0,
    en: P.rapido2,
    dur: P.mitad - P.rapido2,
    zoom: QUIETO,
    entra: "corte",
    color: color({ highlights: -0.3, whites: -0.15, exposure: -0.08 }),
    reason:
      "De la cama a la ciudad (lo que se recibe, antes del segundo 10): la vista de la suite en dos segundos. Segundo plano rápido; con él se cumplen los diez segundos y vuelve Isabella.",
  },
  {
    id: "c05-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md01"),
    audio: a("md01-voz"),
    voz: {
      s0: 0.88,
      s1: 5.4,
      lufs: -15,
      dice: "Una suite hotelera, con matrícula independiente, en edificios con reconocimiento.",
    },
    // La voz empieza a los 0.88 s y acaba a los 5.4 s (la misma toma que la 073); entra en el golpe del f315 (10,5 s, antes de los 11 s) con `desde` 14 f para que la frase quepa entre este golpe y el del f486. El plano dura hasta el golpe del f486.
    desde: fr(14),
    en: P.mitad,
    dur: P.r1 - P.mitad,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "Junto al ventanal (lo que se compra, dicho): Isabella, al fondo de la suite y acercándose, dice «una suite hotelera, con matrícula independiente, en edificios con reconocimiento». Entra disolviendo desde el escritorio.",
  },
  {
    id: "c06-puerta",
    bloque: 5,
    tipo: "video",
    src: v("rc12"),
    // RC12 (iPhone, 4K HLG), del 1,00 al 4,53 s: una mano abre la puerta con la tarjeta y la cámara entra al pasillo de la cocineta. A CORTE en el golpe de 13.7 dB (f486).
    desde: 1,
    en: P.r1,
    dur: P.r2 - P.r1,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "La puerta (el umbral): una mano abre y la cámara entra; es el puente humano que abre el recorrido tras la mitad.",
  },
  {
    id: "c07-cocineta",
    bloque: 5,
    tipo: "video",
    src: v("rc02"),
    // RC02 (iPhone, 4K HLG), del 0,60 al 3,20 s: la cocineta con el microondas, la nevera, la cafetera y la estufa. A CORTE en el golpe de 12.6 dB (f592).
    desde: 0.6,
    en: P.r2,
    dur: P.r3 - P.r2,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "La cocineta (lo práctico): todo puesto para quien llega; viene tras la puerta, en el orden del pasillo.",
  },
  {
    id: "c08-umbral",
    bloque: 5,
    tipo: "video",
    src: v("rc03"),
    // RC03 (iPhone, 4K HLG), del 0,60 al 3,53 s: del espejo de la entrada a una panorámica del escritorio y el televisor. A CORTE en el golpe de 9.3 dB (f670).
    desde: 0.6,
    en: P.r3,
    dur: P.r4 - P.r3,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.08 }),
    reason:
      "El pasillo hacia la habitación (lo que sigue): del espejo de la entrada a la panorámica del escritorio y el televisor.",
  },
  {
    id: "c09-tv",
    bloque: 5,
    tipo: "video",
    src: v("rc11"),
    // RC11 (iPhone, 4K HLG), del 3,00 al 4,83 s: del televisor y el escritorio con la silla azul, con la cama al fondo. A CORTE en el golpe de 25.1 dB (f758).
    desde: 3,
    en: P.r4,
    dur: P.r5 - P.r4,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.06 }),
    reason:
      "El televisor y el escritorio (lo práctico, al detalle): la mesa de trabajo y la pantalla de la suite.",
  },
  {
    id: "c10-cama",
    bloque: 5,
    tipo: "video",
    src: v("rc06"),
    // RC06 (iPhone, 4K HLG), del 4,50 al 6,47 s: la cama king y, al fondo, el sofá gris con el aire acondicionado. A CORTE en el golpe de 15.9 dB (f813).
    desde: 4.5,
    en: P.r5,
    dur: P.vista - P.r5,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.14 }),
    reason:
      "La cama y el sofá (cómo se vive): el descanso de la suite; prepara la subida al ventanal.",
  },
  {
    id: "c11-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc07"),
    // RC07 (iPhone, 4K HLG), del 1,50 al 6,23 s: de la cama sube hasta el ventanal con la ciudad y las montañas de El Poblado al fondo. A CORTE en el golpe de 10.3 dB (f872). Es el plano más largo del recorrido (142 f): el clímax.
    desde: 1.5,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ highlights: -0.3, whites: -0.15, exposure: -0.05 }),
    reason:
      "La ciudad desde el ventanal (la vista, el clímax): el plano más largo del recorrido y el último antes del CTA.",
  },
  {
    id: "c12-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct10"),
    audio: a("ct10-voz"),
    voz: {
      s0: 0.62,
      s1: 4.85,
      lufs: -15,
      dice: "Haz clic en el enlace y recibe más información sobre Go Living Suites en Medellín.",
    },
    // La voz empieza a los 0.62 s y acaba a los 4.85 s (la misma toma, en el mismo golpe que la 073: f1014). El plano dura 155 f; tras su última palabra la imagen funde a negro y entra la tarjeta.
    desde: 0.2,
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "El lounge del edificio (la invitación): Isabella, sentada en el sofá de cuero, dice «haz clic en el enlace y recibe más información sobre Go Living Suites en Medellín»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  {
    id: "c13-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-082/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` del CTA
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre. */
export const DURACION_082 = P.cta + DUR_CTA + DUR_TARJETA;
