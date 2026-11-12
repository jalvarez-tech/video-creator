/**
 * EL RECORRIDO 081 — «Suite Go Living (El Poblado)», V62 del registro: la variante B de la 072 con la estructura «lo vendible antes del segundo 10» (`recorrido-luxur` §3, fijada el 2026-11-10; la primera pieza
 * así es la 079).
 *
 * ÁNGULO: «En inversión inmobiliaria, la ubicación lo cambia todo» → lo que hay a minutos de la suite. Conserva la terna de voz de la 072 (HK11 · MD08 · CT11), su exterior (DR05) y su canción, «I Feel It Coming», con la MISMA entrada
 * (227.700 s): no es una versión nueva de la propiedad sino su variante B, y por eso repite canción (declarado en `combinaciones.md` y en `archivos/musica/registro-de-uso.md`).
 *
 *   bloque 1  c01-edificio             el exterior de la 072: f0-f80, SIN TEXTO NI VOZ
 *   bloque 2  c02-hook                 el hook de la 072, en el mismo frame; en la versión con ficha la ficha entra con él
 *   bloque 3  c03-fachada · c04-ciudad   DOS planos rápidos, lo más vistoso, de ≤ 2,5 s cada uno y a corte: el segundo empieza en 7,8 s (antes del 10)
 *   bloque 4  c05-mitad                la mitad de la 072, a corte en el golpe del f293 (9,8 s: antes de los 11)
 *   bloque 5  c06-plantas … c10-vista   UN solo recorrido inmersivo, sin voz, de 5 planos; la vista (RC07) es el último y el más largo
 *   bloque 6  c11-cta y la tarjeta   el CTA de la 072 en su mismo golpe y la tarjeta oscura con el logo y la web
 *
 * LOS PLANOS (frames de la composición, 30 fps):
 *   1  c01-edificio               f   0-  80    0,0-  2,7 s  2,7 s
 *   2  c02-hook                   f  80- 190    2,7-  6,3 s  3,7 s
 *   3  c03-fachada                f 190- 235    6,3-  7,8 s  1,5 s
 *   3  c04-ciudad                 f 235- 293    7,8-  9,8 s  1,9 s
 *   4  c05-mitad                  f 293- 429    9,8- 14,3 s  4,5 s
 *   5  c06-plantas                f 429- 487   14,3- 16,2 s  1,9 s
 *   5  c07-suite                  f 487- 584   16,2- 19,5 s  3,2 s
 *   5  c08-ciudad                 f 584- 680   19,5- 22,7 s  3,2 s
 *   5  c09-sofa                   f 680- 758   22,7- 25,3 s  2,6 s
 *   5  c10-vista                  f 758- 871   25,3- 29,0 s  3,8 s
 *   6  c11-cta                    f 871-1011   29,0- 33,7 s  4,7 s
 *
 * QUIÉN MARCA EL TIEMPO. «I Feel It Coming», entrando en el mismo golpe que la 072 (227.745 s en el f3); la rejilla son los golpes MEDIDOS (`proyectos/081/musica/golpes-cancion-entera.json`) y cada cambio de plano
 * cae en uno (cortes secos ≥ 8 dB). EXCEPCIÓN DECLARADA: la salida del hook (f190) no tiene golpe, como en la 072: el clip del hook no da para más y la música sube sobre el corte.
 *
 * UNIDADES. `desde`, en SEGUNDOS de la fuente; `en` y `dur`, en frames de la composición. Planos CONTIGUOS. El que entra disolviendo empieza a verse 12 f ANTES de su `en`.
 *
 * EL COLOR (R32): cada plano lleva su `color`; con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-081.ts`). La puerta lo carga con node. LO ESCRIBE `proyectos/080/herramientas/montar-pieza.mjs` desde `proyectos/081/pieza.json`.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-081";

export const FPS_081 = 30;

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
 * «I Feel It Coming» (`archivos/musica/…`). Se entra en su golpe de 227.745 s (22.5 dB). Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el
 * de «empieza a subir»): `proyectos/081/musica/golpes-cancion-entera.json` (`medir-pista.py --json`). El reparto de los cortes lo hace `montar-pieza.mjs` sobre ellos.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 227.745, db: 22.5 },
  /** El hook entra aquí: Isabella ya es opaca y su primera palabra suena unos frames después; la música baja con curva tras el golpe. */
  hook: { t: 230.326, db: 22.9 },
  /** El segundo plano rápido, a corte (f235, 7,8 s: antes del segundo 10). */
  rapido2: { t: 235.486, db: 11 },
  /** La mitad entra A CORTE aquí (f293, 9,8 s: antes de los 11 s): suena entero y la música baja después. */
  mitad: { t: 237.428, db: 24.4 },
  /** El recorrido inmersivo: el plano «r1» entra a corte. */
  r1: { t: 241.942, db: 17.7 },
  /** El recorrido inmersivo: el plano «r2» entra a corte. */
  r2: { t: 243.873, db: 10.8 },
  /** El recorrido inmersivo: el plano «r3» entra a corte. */
  r3: { t: 247.1, db: 12.3 },
  /** El recorrido inmersivo: el plano «r4» entra a corte. */
  r4: { t: 250.324, db: 16.8 },
  /** El recorrido inmersivo: el plano «la vista, el clímax» entra a corte. */
  vista: { t: 252.911, db: 16 },
  /** El CTA entra A CORTE en este golpe, el mismo de la original. */
  cta: { t: 256.665, db: 15.2 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (227.745 s) cae en el frame 3 de la pieza; redondeado a un frame (6831/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 6831 / FPS_081;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_081;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_081;

/** Isabella: un empuje lento hacia ella. Los recorridos y el exterior, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-081/${id}.mp4`;
const a = (id: string): string => `recorrido-081/${id}.wav`;

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
  hook: golpe(GOLPE.hook), //   80 · Isabella ya es opaca; entra la ficha (versión con ficha); su primera palabra suena unos frames después
  rapido1: 190, // 190 · primer plano rápido: SIN golpe (el plano del hook no puede durar más; la música sube sobre el corte)
  rapido2: golpe(GOLPE.rapido2), //  235 · segundo plano rápido (a corte)
  mitad: golpe(GOLPE.mitad), //  293 · Isabella con la mitad (a corte)
  r1: golpe(GOLPE.r1), //  429 · plantas (a corte)
  r2: golpe(GOLPE.r2), //  487 · suite (a corte)
  r3: golpe(GOLPE.r3), //  584 · ciudad (a corte)
  r4: golpe(GOLPE.r4), //  680 · sofa (a corte)
  vista: golpe(GOLPE.vista), //  758 · LA VISTA (a corte)
  cta: golpe(GOLPE.cta), //  871 · Isabella con el CTA (a corte)
} as const;

/** Frames que dura la toma del CTA (la de la 072, en su mismo golpe): tras su última palabra la imagen funde a negro (los últimos 6) y sigue la tarjeta. Nada se congela. */
const DUR_CTA = 140;

/** Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero aquí, 2 f antes del final de la pieza (la tarjeta va en silencio). */
export const FIN_MUSICA_081 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje081: readonly Corte[] = [
  {
    id: "c01-edificio",
    bloque: 1,
    tipo: "video",
    src: v("dr05"),
    // DR05 (iPhone desde el suelo, 4K HLG → BT.709), del 0,60 al 3,27 s: el mismo exterior de la 072. Entra a corte con el golpe de 22.5 dB del f3.
    desde: 0.6,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ highlights: -0.3, whites: -0.15 }),
    reason:
      "El edificio visto desde el suelo (la promesa): los voladizos de la fachada contra el cielo con nubes. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de la ubicación.",
  },
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk11"),
    audio: a("hk11-voz"),
    voz: {
      s0: 0.47,
      s1: 3.58,
      lufs: -15,
      dice: "En inversión inmobiliaria, la ubicación lo cambia todo.",
    },
    // La voz empieza a los 0.47 s y acaba a los 3.58 s (la misma toma que la 072, entra en el mismo frame). El plano dura hasta el golpe del f190: 3 f tras la última palabra, en los que la música sube.
    desde: 0,
    en: P.hook,
    dur: P.rapido1 - P.hook,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "Terraza alta con el cielo y la ciudad detrás (la ubicación): Isabella, de pie, dice «en inversión inmobiliaria, la ubicación lo cambia todo». Entra a corte desde el exterior; la música baja tras el golpe.",
  },
  {
    id: "c03-fachada",
    bloque: 3,
    tipo: "video",
    src: v("dr03"),
    // DR03 (iPhone, 4K HLG), del 0,70 al 2,20 s: la fachada de voladizos oscuros con el sol de frente, vista desde el suelo. A CORTE en el golpe de 0.0 dB (f190, SIN golpe: el plano del hook no puede durar más).
    desde: 0.7,
    en: P.rapido1,
    dur: P.rapido2 - P.rapido1,
    zoom: QUIETO,
    entra: "corte",
    color: color({ highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "El edificio con su sol de frente (lo más vistoso, antes del segundo 10): la fachada de voladizos que habla de dónde está la suite. Primer plano rápido: quien solo mira diez segundos ya ve qué se vende.",
  },
  {
    id: "c04-ciudad",
    bloque: 3,
    tipo: "video",
    src: v("rc13"),
    // RC13 (iPhone, 4K HLG), del 2,00 al 3,93 s: la ventana con los edificios y las montañas de El Poblado bajo las nubes. A CORTE en el golpe de 11.0 dB (f235).
    desde: 2,
    en: P.rapido2,
    dur: P.mitad - P.rapido2,
    zoom: QUIETO,
    entra: "corte",
    color: color({ highlights: -0.3, whites: -0.15, exposure: -0.15 }),
    reason:
      "La ciudad desde la ventana (la ubicación, antes del segundo 10): lo que hay alrededor de la suite. Segundo plano rápido; con él se cumplen los diez segundos y vuelve Isabella.",
  },
  {
    id: "c05-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md08"),
    audio: a("md08-voz"),
    voz: {
      s0: 0.47,
      s1: 4.32,
      lufs: -15,
      dice: "A minutos de Oviedo, Santa Fe, EAFIT y la estación Aguacatala.",
    },
    // La voz empieza a los 0.47 s y acaba a los 4.32 s (la misma toma que la 072); entra en el golpe del f293 (9,8 s, antes de los 11 s) con `desde` 2 f para que la frase quepa entre este golpe y el del f429. El plano dura hasta el golpe del f429.
    desde: fr(2),
    en: P.mitad,
    dur: P.r1 - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "Terraza, tras el cristal (los nombres, dichos): Isabella camina hacia cámara y dice «a minutos de Oviedo, Santa Fe, EAFIT y la estación Aguacatala». Entra a corte desde la suite.",
  },
  {
    id: "c06-plantas",
    bloque: 5,
    tipo: "video",
    src: v("dr01"),
    // DR01 (iPhone, 4K HLG), del 0,40 al 2,33 s: el edificio entre las plantas de monstera, con el cielo nublado. A CORTE en el golpe de 17.7 dB (f429).
    desde: 0.4,
    en: P.r1,
    dur: P.r2 - P.r1,
    zoom: QUIETO,
    entra: "corte",
    color: color({ highlights: -0.3, whites: -0.15, exposure: -0.05 }),
    reason:
      "El edificio entre las plantas (el entorno): del exterior que cuenta la mitad a la puerta de la suite; abre el recorrido donde Isabella acaba de hablar de las distancias.",
  },
  {
    id: "c07-suite",
    bloque: 5,
    tipo: "video",
    src: v("rc03"),
    // RC03 (iPhone, 4K HLG), del 0,00 al 3,23 s: del espejo de la entrada a una panorámica del escritorio y el televisor, con la cama y el ventanal al fondo. A CORTE en el golpe de 10.8 dB (f487).
    desde: 0,
    en: P.r2,
    dur: P.r3 - P.r2,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1 }),
    reason:
      "De fuera a dentro (la suite): el espejo de la entrada y la panorámica del escritorio hacia su ventana.",
  },
  {
    id: "c08-ciudad",
    bloque: 5,
    tipo: "video",
    src: v("rc05"),
    // RC05 (iPhone, 4K HLG), del 0,00 al 3,20 s: del ventanal con la ciudad a la cama con el cabecero gris y los cuadros. A CORTE en el golpe de 12.3 dB (f584).
    desde: 0,
    en: P.r3,
    dur: P.r4 - P.r3,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05 }),
    reason:
      "Del ventanal a la cama (cómo se ve y cómo se vive): la ciudad que ya se anunció entra por el ventanal.",
  },
  {
    id: "c09-sofa",
    bloque: 5,
    tipo: "video",
    src: v("rc04"),
    // RC04 (iPhone, 4K HLG), del 2,80 al 5,40 s: el sofá gris, la mesa redonda y la cama con sus cuadros; la cámara avanza. A CORTE en el golpe de 16.8 dB (f680).
    desde: 2.8,
    en: P.r4,
    dur: P.vista - P.r4,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.08 }),
    reason:
      "La habitación entera hacia el ventanal (cómo se vive, al detalle): el sofá y la cama, con la ventana al fondo; prepara la subida a la vista.",
  },
  {
    id: "c10-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc07"),
    // RC07 (iPhone, 4K HLG), del 2,40 al 6,17 s: de la cama sube hasta el ventanal con la repisa de ladrillo y la ciudad y las montañas de El Poblado al fondo. A CORTE en el golpe de 16.0 dB (f758). Es el plano más largo del recorrido (113 f): el clímax.
    desde: 2.4,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ highlights: -0.3, whites: -0.15, exposure: -0.05 }),
    reason:
      "La ciudad desde el ventanal (la vista, el clímax): lo que se ve desde el piso 9; el plano más largo del recorrido y el último antes del CTA.",
  },
  {
    id: "c11-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct11"),
    audio: a("ct11-voz"),
    voz: {
      s0: 0.76,
      s1: 4.38,
      lufs: -15,
      dice: "Descubre esta suite en El Poblado y déjate asombrar por la ubicación.",
    },
    // La voz empieza a los 0.76 s y acaba a los 4.38 s (la misma toma, en el mismo golpe que la 072: f871). El plano dura 140 f; tras su última palabra la imagen funde a negro y entra la tarjeta.
    desde: 0.4,
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "Lobby con ventanales (la invitación): Isabella camina hacia cámara y dice «descubre esta suite en El Poblado y déjate asombrar por la ubicación»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  {
    id: "c12-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-081/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` del CTA
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre. */
export const DURACION_081 = P.cta + DUR_CTA + DUR_TARJETA;
