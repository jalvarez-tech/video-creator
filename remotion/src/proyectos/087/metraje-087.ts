/**
 * EL RECORRIDO 087 — «Suite Go Living (El Poblado)», V68 del registro: la variante B de la 078 con la estructura «lo vendible antes del segundo 10» (`recorrido-luxur` §3, fijada el 2026-11-10; la primera pieza
 * así es la 079).
 *
 * ÁNGULO: «No se trata solo de comprar una propiedad» → una oportunidad en El Poblado. Conserva la terna de voz de la 078 (HK07 · MD02 · CT03), su exterior (DR09) y su canción, «Ivory Skyline Reverie», con la MISMA entrada
 * (157.533 s): no es una versión nueva de la propiedad sino su variante B, y por eso repite canción (declarado en `combinaciones.md` y en `archivos/musica/registro-de-uso.md`).
 *
 *   bloque 1  c01-edificio             el exterior de la 078: f0-f82, SIN TEXTO NI VOZ
 *   bloque 2  c02-hook                 el hook de la 078, en el mismo frame; en la versión con ficha la ficha entra con él
 *   bloque 3  c03-elipticas · c04-escritorio   DOS planos rápidos, lo más vistoso, de ≤ 2,5 s cada uno y a corte: el segundo empieza en 8,2 s (antes del 10)
 *   bloque 4  c05-mitad                la mitad de la 078, a corte en el golpe del f321 (10,7 s: antes de los 11)
 *   bloque 5  c06-pesas … c09-vista   UN solo recorrido inmersivo, sin voz, de 4 planos; la vista (RC07) es el último y el más largo
 *   bloque 6  c10-cta y la tarjeta   el CTA de la 078 en su mismo golpe y la tarjeta oscura con el logo y la web
 *
 * LOS PLANOS (frames de la composición, 30 fps):
 *   1  c01-edificio               f   0-  82    0,0-  2,7 s  2,7 s
 *   2  c02-hook                   f  82- 179    2,7-  6,0 s  3,2 s
 *   3  c03-elipticas              f 179- 247    6,0-  8,2 s  2,3 s
 *   3  c04-escritorio             f 247- 321    8,2- 10,7 s  2,5 s
 *   4  c05-mitad                  f 321- 480   10,7- 16,0 s  5,3 s
 *   5  c06-pesas                  f 480- 562   16,0- 18,7 s  2,7 s
 *   5  c07-tv                     f 562- 658   18,7- 21,9 s  3,2 s
 *   5  c08-cama                   f 658- 733   21,9- 24,4 s  2,5 s
 *   5  c09-vista                  f 733- 834   24,4- 27,8 s  3,4 s
 *   6  c10-cta                    f 834- 931   27,8- 31,0 s  3,2 s
 *
 * QUIÉN MARCA EL TIEMPO. «Ivory Skyline Reverie», entrando en el mismo golpe que la 078 (157.58 s en el f3); la rejilla son los golpes MEDIDOS (`proyectos/087/musica/golpes-cancion-entera.json`) y cada cambio de plano
 * cae en uno (cortes secos ≥ 8 dB).
 *
 * UNIDADES. `desde`, en SEGUNDOS de la fuente; `en` y `dur`, en frames de la composición. Planos CONTIGUOS. El que entra disolviendo empieza a verse 12 f ANTES de su `en`.
 *
 * EL COLOR (R32): cada plano lleva su `color`; con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-087.ts`). La puerta lo carga con node. LO ESCRIBE `proyectos/080/herramientas/montar-pieza.mjs` desde `proyectos/087/pieza.json`.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-087";

export const FPS_087 = 30;

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
 * «Ivory Skyline Reverie» (`archivos/musica/…`). Se entra en su golpe de 157.58 s (13.3 dB). Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el
 * de «empieza a subir»): `proyectos/087/musica/golpes-cancion-entera.json` (`medir-pista.py --json`). El reparto de los cortes lo hace `montar-pieza.mjs` sobre ellos.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 157.58, db: 13.3 },
  /** El hook entra aquí: Isabella ya es opaca y su primera palabra suena unos frames después; la música baja con curva tras el golpe. */
  hook: { t: 160.224, db: 14.6 },
  /** El primer plano rápido, a corte (f179, 6,0 s). */
  rapido1: { t: 163.437, db: 10.2 },
  /** El segundo plano rápido, a corte (f247, 8,2 s: antes del segundo 10). */
  rapido2: { t: 165.696, db: 9.7 },
  /** La mitad entra A CORTE aquí (f321, 10,7 s: antes de los 11 s): suena entero y la música baja después. */
  mitad: { t: 168.183, db: 17.1 },
  /** El recorrido inmersivo: el plano «r1» entra a corte. */
  r1: { t: 173.481, db: 15.7 },
  /** El recorrido inmersivo: el plano «r2» entra a corte. */
  r2: { t: 176.199, db: 13.4 },
  /** El recorrido inmersivo: el plano «r3» entra a corte. */
  r3: { t: 179.399, db: 12 },
  /** El recorrido inmersivo: el plano «la vista, el clímax» entra a corte. */
  vista: { t: 181.925, db: 22.4 },
  /** El CTA entra A CORTE en este golpe, el mismo de la original. */
  cta: { t: 185.293, db: 12.9 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (157.58 s) cae en el frame 3 de la pieza; redondeado a un frame (4726/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 4726 / FPS_087;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_087;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_087;

/** Isabella: un empuje lento hacia ella. Los recorridos y el exterior, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-087/${id}.mp4`;
const a = (id: string): string => `recorrido-087/${id}.wav`;

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
  hook: golpe(GOLPE.hook), //   82 · Isabella ya es opaca; entra la ficha (versión con ficha); su primera palabra suena unos frames después
  rapido1: golpe(GOLPE.rapido1), //  179 · primer plano rápido (a corte)
  rapido2: golpe(GOLPE.rapido2), //  247 · segundo plano rápido (a corte)
  mitad: golpe(GOLPE.mitad), //  321 · Isabella con la mitad (a corte)
  r1: golpe(GOLPE.r1), //  480 · pesas (a corte)
  r2: golpe(GOLPE.r2), //  562 · tv (a corte)
  r3: golpe(GOLPE.r3), //  658 · cama (a corte)
  vista: golpe(GOLPE.vista), //  733 · LA VISTA (a corte)
  cta: golpe(GOLPE.cta), //  834 · Isabella con el CTA (a corte)
} as const;

/** Frames que dura la toma del CTA (la de la 078, en su mismo golpe): tras su última palabra la imagen funde a negro (los últimos 6) y sigue la tarjeta. Nada se congela. */
const DUR_CTA = 97;

/** Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero aquí, 2 f antes del final de la pieza (la tarjeta va en silencio). */
export const FIN_MUSICA_087 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje087: readonly Corte[] = [
  {
    id: "c01-edificio",
    bloque: 1,
    tipo: "video",
    src: v("dr09"),
    // DR09 (iPhone desde el suelo, 4K HLG → BT.709), del 4,80 al 7,53 s: el mismo exterior de la 078. Entra a corte con el golpe de 13.3 dB del f3.
    desde: 4.8,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El edificio visto desde el suelo (la promesa): la torre entre las palmas con su jardín vertical a los pies. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de lo que hay más allá de la compra.",
  },
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk07"),
    audio: a("hk07-voz"),
    voz: {
      s0: 0.73,
      s1: 2.86,
      lufs: -15,
      dice: "No se trata solo de comprar una propiedad.",
    },
    // La voz empieza a los 0.73 s y acaba a los 2.86 s (la misma toma que la 078, entra en el mismo frame). El plano dura hasta el golpe del f179: 19 f tras la última palabra, en los que la música sube.
    desde: fr(8),
    en: P.hook,
    dur: P.rapido1 - P.hook,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "La entrada de la suite (el umbral de la promesa): Isabella, al fondo del pasillo y reflejada en el espejo, viene hacia cámara y dice «no se trata solo de comprar una propiedad». Entra a corte desde el exterior.",
  },
  {
    id: "c03-elipticas",
    bloque: 3,
    tipo: "video",
    src: v("zs03"),
    // ZS03 (iPhone, 4K HLG), del 2,80 al 5,07 s: las trotadoras y las elípticas frente al espejo con las mancuernas. A CORTE en el golpe de 10.2 dB (f179).
    desde: 2.8,
    en: P.rapido1,
    dur: P.rapido2 - P.rapido1,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "Las máquinas del gimnasio (lo más vistoso, antes del segundo 10): las elípticas frente al espejo. Primer plano rápido: quien solo mira diez segundos ya ve qué trae el edificio.",
  },
  {
    id: "c04-escritorio",
    bloque: 3,
    tipo: "video",
    src: v("rc11"),
    // RC11 (iPhone, 4K HLG), del 5,55 al 8,02 s: desde la cama al mueble de TV y al escritorio con la silla azul. A CORTE en el golpe de 9.7 dB (f247).
    desde: 5.55,
    en: P.rapido2,
    dur: P.mitad - P.rapido2,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.08 }),
    reason:
      "De la cama al escritorio (la suite, antes del segundo 10): segundo plano rápido; con él se cumplen los diez segundos y vuelve Isabella.",
  },
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
    // La voz empieza a los 0.65 s y acaba a los 4.78 s (la misma toma que la 078); entra en el golpe del f321 (10,7 s, antes de los 11 s). El plano dura hasta el golpe del f480.
    desde: 0,
    en: P.mitad,
    dur: P.r1 - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "Junto al ventanal (la condición, dicha): Isabella, de pie con la ciudad detrás, dice «no todas las propiedades tienen las mismas condiciones para operar turísticamente». Entra a corte desde el gimnasio.",
  },
  {
    id: "c06-pesas",
    bloque: 5,
    tipo: "video",
    src: v("zs02"),
    // ZS02 (iPhone, 4K HLG), del 0,00 al 2,73 s: los discos de pesas, las mancuernas y el banco rojo del gimnasio. A CORTE en el golpe de 15.7 dB (f480).
    desde: 0,
    en: P.r1,
    dur: P.r2 - P.r1,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "Las pesas (zona social): abre el recorrido por lo que ofrece el edificio tras la mitad.",
  },
  {
    id: "c07-tv",
    bloque: 5,
    tipo: "video",
    src: v("rc03"),
    // RC03 (iPhone, 4K HLG), del 3,80 al 7,00 s: la panorámica del escritorio y el televisor, con la cama y el ventanal al fondo. A CORTE en el golpe de 13.4 dB (f562).
    desde: 3.8,
    en: P.r2,
    dur: P.r3 - P.r2,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.06 }),
    reason:
      "De fuera a dentro (la suite): el escritorio y el televisor, con la cama al fondo.",
  },
  {
    id: "c08-cama",
    bloque: 5,
    tipo: "video",
    src: v("rc05"),
    // RC05 (iPhone, 4K HLG), del 6,35 al 8,85 s: la cama king con el cabecero gris, los cuadros y las lámparas colgantes. A CORTE en el golpe de 12.0 dB (f658).
    desde: 6.35,
    en: P.r3,
    dur: P.vista - P.r3,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.14 }),
    reason:
      "La cama y su cabecero (cómo se vive): el descanso de la suite; prepara la subida al ventanal.",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc07"),
    // RC07 (iPhone, 4K HLG), del 2,85 al 6,22 s: de la cama sube hasta el ventanal con la ciudad y las montañas de El Poblado al fondo. A CORTE en el golpe de 22.4 dB (f733). Es el plano más largo del recorrido (101 f): el clímax.
    desde: 2.85,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ highlights: -0.3, whites: -0.15, exposure: -0.05 }),
    reason:
      "La ciudad desde el ventanal (la vista, el clímax): el plano más largo del recorrido y el último antes del CTA.",
  },
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct03"),
    audio: a("ct03-voz"),
    voz: {
      s0: 0.6,
      s1: 2.72,
      lufs: -15,
      dice: "Conoce esta oportunidad en El Poblado.",
    },
    // La voz empieza a los 0.6 s y acaba a los 2.72 s (la misma toma, en el mismo golpe que la 078: f834). El plano dura 97 f; tras su última palabra la imagen funde a negro y entra la tarjeta.
    desde: 0.2,
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "El escritorio de la suite (la invitación): Isabella, sentada en la silla azul, dice «conoce esta oportunidad en El Poblado»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-087/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` del CTA
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre. */
export const DURACION_087 = P.cta + DUR_CTA + DUR_TARJETA;
