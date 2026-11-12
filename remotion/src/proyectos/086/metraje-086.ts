/**
 * EL RECORRIDO 086 — «Suite Go Living (El Poblado)», V67 del registro: la variante B de la 077 con la estructura «lo vendible antes del segundo 10» (`recorrido-luxur` §3, fijada el 2026-11-10; la primera pieza
 * así es la 079).
 *
 * ÁNGULO: «Antes de invertir en Airbnb, hay algo que debes saber» → un edificio con operación hotelera establecida. Conserva la terna de voz de la 077 (HK03 · HK05 · CT04), su exterior (DR04) y su canción, «Light Fills the Room», con la MISMA entrada
 * (178.067 s): no es una versión nueva de la propiedad sino su variante B, y por eso repite canción (declarado en `combinaciones.md` y en `archivos/musica/registro-de-uso.md`).
 *
 *   bloque 1  c01-edificio             el exterior de la 077: f0-f90, SIN TEXTO NI VOZ
 *   bloque 2  c02-hook                 el hook de la 077, en el mismo frame; en la versión con ficha la ficha entra con él
 *   bloque 3  c03-pesas · c04-planta   DOS planos rápidos, lo más vistoso, de ≤ 2,5 s cada uno y a corte: el segundo empieza en 8,5 s (antes del 10)
 *   bloque 4  c05-mitad                la mitad de la 077, a corte en el golpe del f301 (10,0 s: antes de los 11)
 *   bloque 5  c06-cama … c09-fachada   UN solo recorrido inmersivo, sin voz, de 4 planos; la vista (DR05) es el último y el más largo
 *   bloque 6  c10-cta y la tarjeta   el CTA de la 077 en su mismo golpe y la tarjeta oscura con el logo y la web
 *
 * LOS PLANOS (frames de la composición, 30 fps):
 *   1  c01-edificio               f   0-  90    0,0-  3,0 s  3,0 s
 *   2  c02-hook                   f  90- 214    3,0-  7,1 s  4,1 s
 *   3  c03-pesas                  f 214- 255    7,1-  8,5 s  1,4 s
 *   3  c04-planta                 f 255- 301    8,5- 10,0 s  1,5 s
 *   4  c05-mitad                  f 301- 430   10,0- 14,3 s  4,3 s
 *   5  c06-cama                   f 430- 512   14,3- 17,1 s  2,7 s
 *   5  c07-gimnasio               f 512- 604   17,1- 20,1 s  3,1 s
 *   5  c08-tienda                 f 604- 687   20,1- 22,9 s  2,8 s
 *   5  c09-fachada                f 687- 793   22,9- 26,4 s  3,5 s
 *   6  c10-cta                    f 793- 876   26,4- 29,2 s  2,8 s
 *
 * QUIÉN MARCA EL TIEMPO. «Light Fills the Room», entrando en el mismo golpe que la 077 (178.118 s en el f3); la rejilla son los golpes MEDIDOS (`proyectos/086/musica/golpes-cancion-entera.json`) y cada cambio de plano
 * cae en uno (cortes secos ≥ 8 dB).
 *
 * UNIDADES. `desde`, en SEGUNDOS de la fuente; `en` y `dur`, en frames de la composición. Planos CONTIGUOS. El que entra disolviendo empieza a verse 12 f ANTES de su `en`.
 *
 * EL COLOR (R32): cada plano lleva su `color`; con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-086.ts`). La puerta lo carga con node. LO ESCRIBE `proyectos/080/herramientas/montar-pieza.mjs` desde `proyectos/086/pieza.json`.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-086";

export const FPS_086 = 30;

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
 * «Light Fills the Room» (`archivos/musica/…`). Se entra en su golpe de 178.118 s (18.9 dB). Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el
 * de «empieza a subir»): `proyectos/086/musica/golpes-cancion-entera.json` (`medir-pista.py --json`). El reparto de los cortes lo hace `montar-pieza.mjs` sobre ellos.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 178.118, db: 18.9 },
  /** El hook entra aquí: Isabella ya es opaca y su primera palabra suena unos frames después; la música baja con curva tras el golpe. */
  hook: { t: 181.017, db: 22.9 },
  /** El primer plano rápido, a corte (f214, 7,1 s). */
  rapido1: { t: 185.137, db: 16.6 },
  /** El segundo plano rápido, a corte (f255, 8,5 s: antes del segundo 10). */
  rapido2: { t: 186.508, db: 20.4 },
  /** La mitad entra A CORTE aquí (f301, 10,0 s: antes de los 11 s): suena entero y la música baja después. */
  mitad: { t: 188.059, db: 21.7 },
  /** El recorrido inmersivo: el plano «r1» entra a corte. */
  r1: { t: 192.352, db: 15.8 },
  /** El recorrido inmersivo: el plano «r2» entra a corte. */
  r2: { t: 195.081, db: 19.6 },
  /** El recorrido inmersivo: el plano «r3» entra a corte. */
  r3: { t: 198.16, db: 14 },
  /** El recorrido inmersivo: el plano «la vista, el clímax» entra a corte. */
  vista: { t: 200.906, db: 19.8 },
  /** El CTA entra A CORTE en este golpe, el mismo de la original. */
  cta: { t: 204.462, db: 12.4 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (178.118 s) cae en el frame 3 de la pieza; redondeado a un frame (5342/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 5342 / FPS_086;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_086;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_086;

/** Isabella: un empuje lento hacia ella. Los recorridos y el exterior, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-086/${id}.mp4`;
const a = (id: string): string => `recorrido-086/${id}.wav`;

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
  hook: golpe(GOLPE.hook), //   90 · Isabella ya es opaca; entra la ficha (versión con ficha); su primera palabra suena unos frames después
  rapido1: golpe(GOLPE.rapido1), //  214 · primer plano rápido (a corte)
  rapido2: golpe(GOLPE.rapido2), //  255 · segundo plano rápido (a corte)
  mitad: golpe(GOLPE.mitad), //  301 · Isabella con la mitad (a corte)
  r1: golpe(GOLPE.r1), //  430 · cama (a corte)
  r2: golpe(GOLPE.r2), //  512 · gimnasio (a corte)
  r3: golpe(GOLPE.r3), //  604 · tienda (a corte)
  vista: golpe(GOLPE.vista), //  687 · LA VISTA (a corte)
  cta: golpe(GOLPE.cta), //  793 · Isabella con el CTA (a corte)
} as const;

/** Frames que dura la toma del CTA (la de la 077, en su mismo golpe): tras su última palabra la imagen funde a negro (los últimos 6) y sigue la tarjeta. Nada se congela. */
const DUR_CTA = 83;

/** Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero aquí, 2 f antes del final de la pieza (la tarjeta va en silencio). */
export const FIN_MUSICA_086 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje086: readonly Corte[] = [
  {
    id: "c01-edificio",
    bloque: 1,
    tipo: "video",
    src: v("dr04"),
    // DR04 (iPhone desde el suelo, 4K HLG → BT.709), del 2,20 al 5,20 s: el mismo exterior de la 077. Entra a corte con el golpe de 18.9 dB del f3.
    desde: 2.2,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El edificio visto desde el suelo (la promesa): un árbol delante de los voladizos y el sol de frente sobre la fachada. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de lo que hay que saber.",
  },
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk03"),
    audio: a("hk03-voz"),
    voz: {
      s0: 0.75,
      s1: 3.88,
      lufs: -15,
      dice: "Antes de invertir en Airbnb, hay algo que debes saber.",
    },
    // La voz empieza a los 0.75 s y acaba a los 3.88 s (la misma toma que la 077, entra en el mismo frame). El plano dura hasta el golpe del f214: 14 f tras la última palabra, en los que la música sube.
    desde: 0.2,
    en: P.hook,
    dur: P.rapido1 - P.hook,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "La suite, la zona del sofá (la curiosidad): Isabella, en plano medio, dice «antes de invertir en Airbnb, hay algo que debes saber». Entra a corte en el golpe desde el exterior; la música baja con curva antes de su primera palabra.",
  },
  {
    id: "c03-pesas",
    bloque: 3,
    tipo: "video",
    src: v("zs02"),
    // ZS02 (iPhone, 4K HLG), del 5,40 al 6,77 s: el gimnasio: del banco rojo y los discos a las bicicletas, hacia el fondo. A CORTE en el golpe de 16.6 dB (f214).
    desde: 5.4,
    en: P.rapido1,
    dur: P.rapido2 - P.rapido1,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.06 }),
    reason:
      "El gimnasio del edificio (lo más vistoso, antes del segundo 10): el barrido de las pesas a las bicicletas. Primer plano rápido: quien solo mira diez segundos ya ve qué trae el edificio.",
  },
  {
    id: "c04-planta",
    bloque: 3,
    tipo: "video",
    src: v("rc08"),
    // RC08 (iPhone, 4K HLG), del 3,20 al 4,73 s: la repisa con la planta y la cortina gris, junto al ventanal. A CORTE en el golpe de 20.4 dB (f255).
    desde: 3.2,
    en: P.rapido2,
    dur: P.mitad - P.rapido2,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El rincón de la planta y la cortina (la suite, antes del segundo 10): segundo plano rápido; con él se cumplen los diez segundos y vuelve Isabella.",
  },
  {
    id: "c05-mitad",
    bloque: 4,
    tipo: "video",
    src: v("hk05"),
    audio: a("hk05-voz"),
    voz: {
      s0: 0.39,
      s1: 4.1,
      lufs: -15,
      dice: "Descubre una suite en un edificio con operación hotelera establecida.",
    },
    // La voz empieza a los 0.39 s y acaba a los 4.1 s (la misma toma que la 077); entra en el golpe del f301 (10,0 s, antes de los 11 s) con `desde` 2 f para que la frase quepa entre este golpe y el del f430. El plano dura hasta el golpe del f430.
    desde: fr(2),
    en: P.mitad,
    dur: P.r1 - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "La suite, de vuelta con ella (la respuesta): Isabella viene hacia cámara y dice «descubre una suite en un edificio con operación hotelera establecida». Entra a corte desde el gimnasio.",
  },
  {
    id: "c06-cama",
    bloque: 5,
    tipo: "video",
    src: v("rc11"),
    // RC11 (iPhone, 4K HLG), del 0,45 al 3,18 s: desde la cama hacia la consola del televisor y el escritorio con la silla azul. A CORTE en el golpe de 15.8 dB (f430).
    desde: 0.45,
    en: P.r1,
    dur: P.r2 - P.r1,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "De la cama al escritorio (lo que hay dentro): abre el recorrido de la suite donde acaba la mitad.",
  },
  {
    id: "c07-gimnasio",
    bloque: 5,
    tipo: "video",
    src: v("zs01"),
    // ZS01 (iPhone, 4K HLG), del 2,00 al 5,07 s: el gimnasio: el barrido de la torre de dominadas a las elípticas y trotadoras. A CORTE en el golpe de 19.6 dB (f512).
    desde: 2,
    en: P.r2,
    dur: P.r3 - P.r2,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.1 }),
    reason:
      "De la suite al gimnasio (el edificio que opera): las zonas sociales que acompañan a la operación hotelera.",
  },
  {
    id: "c08-tienda",
    bloque: 5,
    tipo: "video",
    src: v("zs05"),
    // ZS05 (iPhone, 4K HLG), del 4,30 al 7,07 s: el interior de la tienda del edificio, ya dentro y sin el toldo. A CORTE en el golpe de 14.0 dB (f604).
    desde: 4.3,
    en: P.r3,
    dur: P.vista - P.r3,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "La tienda del edificio, solo su interior (zona social): empieza donde ya no se lee la marca de terceros.",
  },
  {
    id: "c09-fachada",
    bloque: 5,
    tipo: "video",
    src: v("dr05"),
    // DR05 (iPhone, 4K HLG), del 3,30 al 6,83 s: los voladizos curvos de la fachada contra el cielo con nubes; barrido a la derecha, plantas al final. A CORTE en el golpe de 19.8 dB (f687). Es el plano más largo del recorrido (106 f): el clímax.
    desde: 3.3,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ highlights: -0.3, whites: -0.15, exposure: -0.05 }),
    reason:
      "La fachada entera (el edificio, el clímax de esta pieza): el plano más largo del recorrido y el último antes del CTA.",
  },
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct04"),
    audio: a("ct04-voz"),
    voz: {
      s0: 0.31,
      s1: 2.14,
      lufs: -15,
      dice: "Si quieres más información, contáctame.",
    },
    // La voz empieza a los 0.31 s y acaba a los 2.14 s (la misma toma, en el mismo golpe que la 077: f793). El plano dura 83 f; tras su última palabra la imagen funde a negro y entra la tarjeta.
    desde: 0,
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "El mueble de TV, la planta (la invitación): Isabella se acerca a cámara y dice «si quieres más información, contáctame»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-086/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` del CTA
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre. */
export const DURACION_086 = P.cta + DUR_CTA + DUR_TARJETA;
