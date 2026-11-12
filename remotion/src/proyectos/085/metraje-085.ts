/**
 * EL RECORRIDO 085 — «Suite Go Living (El Poblado)», V66 del registro: la variante B de la 076 con la estructura «lo vendible antes del segundo 10» (`recorrido-luxur` §3, fijada el 2026-11-10; la primera pieza
 * así es la 079).
 *
 * ÁNGULO: «Una buena inversión empieza por la tranquilidad» → una suite con ubicación estratégica y vocación turística. Conserva la terna de voz de la 076 (HK02 · MD04 · CT06), su exterior (DR10) y su canción, «Luxury, Elegance, Refined», con la MISMA entrada
 * (147.733 s): no es una versión nueva de la propiedad sino su variante B, y por eso repite canción (declarado en `combinaciones.md` y en `archivos/musica/registro-de-uso.md`).
 *
 *   bloque 1  c01-edificio             el exterior de la 076: f0-f87, SIN TEXTO NI VOZ
 *   bloque 2  c02-hook                 el hook de la 076, en el mismo frame; en la versión con ficha la ficha entra con él
 *   bloque 3  c03-gimnasio · c04-cama   DOS planos rápidos, lo más vistoso, de ≤ 2,5 s cada uno y a corte: el segundo empieza en 8,5 s (antes del 10)
 *   bloque 4  c05-mitad                la mitad de la 076, a corte en el golpe del f317 (10,6 s: antes de los 11)
 *   bloque 5  c06-tienda … c09-vista   UN solo recorrido inmersivo, sin voz, de 4 planos; la vista (RC07) es el último y el más largo
 *   bloque 6  c10-cta y la tarjeta   el CTA de la 076 en su mismo golpe y la tarjeta oscura con el logo y la web
 *
 * LOS PLANOS (frames de la composición, 30 fps):
 *   1  c01-edificio               f   0-  87    0,0-  2,9 s  2,9 s
 *   2  c02-hook                   f  87- 188    2,9-  6,3 s  3,4 s
 *   3  c03-gimnasio               f 188- 254    6,3-  8,5 s  2,2 s
 *   3  c04-cama                   f 254- 317    8,5- 10,6 s  2,1 s
 *   4  c05-mitad                  f 317- 463   10,6- 15,4 s  4,9 s
 *   5  c06-tienda                 f 463- 533   15,4- 17,8 s  2,3 s
 *   5  c07-bicicletas             f 533- 610   17,8- 20,3 s  2,6 s
 *   5  c08-repisa                 f 610- 676   20,3- 22,5 s  2,2 s
 *   5  c09-vista                  f 676- 782   22,5- 26,1 s  3,5 s
 *   6  c10-cta                    f 782- 898   26,1- 29,9 s  3,9 s
 *
 * QUIÉN MARCA EL TIEMPO. «Luxury, Elegance, Refined», entrando en el mismo golpe que la 076 (147.778 s en el f3); la rejilla son los golpes MEDIDOS (`proyectos/085/musica/golpes-cancion-entera.json`) y cada cambio de plano
 * cae en uno (cortes secos ≥ 8 dB).
 *
 * UNIDADES. `desde`, en SEGUNDOS de la fuente; `en` y `dur`, en frames de la composición. Planos CONTIGUOS. El que entra disolviendo empieza a verse 12 f ANTES de su `en`.
 *
 * EL COLOR (R32): cada plano lleva su `color`; con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-085.ts`). La puerta lo carga con node. LO ESCRIBE `proyectos/080/herramientas/montar-pieza.mjs` desde `proyectos/085/pieza.json`.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-085";

export const FPS_085 = 30;

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
 * «Luxury, Elegance, Refined» (`archivos/musica/…`). Se entra en su golpe de 147.778 s (18.5 dB). Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el
 * de «empieza a subir»): `proyectos/085/musica/golpes-cancion-entera.json` (`medir-pista.py --json`). El reparto de los cortes lo hace `montar-pieza.mjs` sobre ellos.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 147.778, db: 18.5 },
  /** El hook entra aquí: Isabella ya es opaca y su primera palabra suena unos frames después; la música baja con curva tras el golpe. */
  hook: { t: 150.567, db: 18.8 },
  /** El primer plano rápido, a corte (f188, 6,3 s). */
  rapido1: { t: 153.944, db: 17.8 },
  /** El segundo plano rápido, a corte (f254, 8,5 s: antes del segundo 10). */
  rapido2: { t: 156.15, db: 13.2 },
  /** La mitad entra A CORTE aquí (f317, 10,6 s: antes de los 11 s): suena entero y la música baja después. */
  mitad: { t: 158.239, db: 13.4 },
  /** El recorrido inmersivo: el plano «r1» entra a corte. */
  r1: { t: 163.121, db: 12.1 },
  /** El recorrido inmersivo: el plano «r2» entra a corte. */
  r2: { t: 165.441, db: 23.4 },
  /** El recorrido inmersivo: el plano «r3» entra a corte. */
  r3: { t: 168.006, db: 11.3 },
  /** El recorrido inmersivo: el plano «la vista, el clímax» entra a corte. */
  vista: { t: 170.219, db: 10.5 },
  /** El CTA entra A CORTE en este golpe, el mismo de la original. */
  cta: { t: 173.741, db: 9.6 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (147.778 s) cae en el frame 3 de la pieza; redondeado a un frame (4432/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 4432 / FPS_085;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_085;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_085;

/** Isabella: un empuje lento hacia ella. Los recorridos y el exterior, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-085/${id}.mp4`;
const a = (id: string): string => `recorrido-085/${id}.wav`;

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
  hook: golpe(GOLPE.hook), //   87 · Isabella ya es opaca; entra la ficha (versión con ficha); su primera palabra suena unos frames después
  rapido1: golpe(GOLPE.rapido1), //  188 · primer plano rápido (a corte)
  rapido2: golpe(GOLPE.rapido2), //  254 · segundo plano rápido (a corte)
  mitad: golpe(GOLPE.mitad), //  317 · Isabella con la mitad (a corte)
  r1: golpe(GOLPE.r1), //  463 · tienda (a corte)
  r2: golpe(GOLPE.r2), //  533 · bicicletas (a corte)
  r3: golpe(GOLPE.r3), //  610 · repisa (a corte)
  vista: golpe(GOLPE.vista), //  676 · LA VISTA (a corte)
  cta: golpe(GOLPE.cta), //  782 · Isabella con el CTA (a corte)
} as const;

/** Frames que dura la toma del CTA (la de la 076, en su mismo golpe): tras su última palabra la imagen funde a negro (los últimos 6) y sigue la tarjeta. Nada se congela. */
const DUR_CTA = 116;

/** Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero aquí, 2 f antes del final de la pieza (la tarjeta va en silencio). */
export const FIN_MUSICA_085 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje085: readonly Corte[] = [
  {
    id: "c01-edificio",
    bloque: 1,
    tipo: "video",
    src: v("dr10"),
    // DR10 (iPhone desde el suelo, 4K HLG → BT.709), del 4,07 al 6,97 s: el mismo exterior de la 076. Entra a corte con el golpe de 18.5 dB del f3.
    desde: fr(122),
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.08 }),
    reason:
      "El edificio visto desde la acera, entre sus plantas (la calma): la torre con su entrada de vidrio y el jardín vertical. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de tranquilidad.",
  },
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk02"),
    audio: a("hk02-voz"),
    voz: {
      s0: 1.62,
      s1: 3.97,
      lufs: -15,
      dice: "Una buena inversión empieza por la tranquilidad.",
    },
    // La voz empieza a los 1.62 s y acaba a los 3.97 s (la misma toma que la 076, entra en el mismo frame). El plano dura hasta el golpe del f188: 18 f tras la última palabra, en los que la música sube.
    desde: 1.2,
    en: P.hook,
    dur: P.rapido1 - P.hook,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "La suite, con Isabella que viene del fondo del pasillo (la promesa): dice «una buena inversión empieza por la tranquilidad». Entra disolviendo desde el exterior; la música ya está abajo.",
  },
  {
    id: "c03-gimnasio",
    bloque: 3,
    tipo: "video",
    src: v("zs01"),
    // ZS01 (iPhone, 4K HLG), del 3,50 al 5,70 s: el gimnasio con las elípticas y las trotadoras bajo las vigas oscuras. A CORTE en el golpe de 17.8 dB (f188).
    desde: 3.5,
    en: P.rapido1,
    dur: P.rapido2 - P.rapido1,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El gimnasio del edificio (lo más vistoso, antes del segundo 10): las máquinas bajo las vigas. Primer plano rápido: quien solo mira diez segundos ya ve qué trae el edificio.",
  },
  {
    id: "c04-cama",
    bloque: 3,
    tipo: "video",
    src: v("rc11"),
    // RC11 (iPhone, 4K HLG), del 0,20 al 2,30 s: desde la cama hacia la consola del televisor y el escritorio. A CORTE en el golpe de 13.2 dB (f254).
    desde: 0.2,
    en: P.rapido2,
    dur: P.mitad - P.rapido2,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.08 }),
    reason:
      "De la cama a la consola del televisor (la suite, antes del segundo 10): segundo plano rápido; con él se cumplen los diez segundos y vuelve Isabella.",
  },
  {
    id: "c05-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md04"),
    audio: a("md04-voz"),
    voz: {
      s0: 0.58,
      s1: 4.28,
      lufs: -15,
      dice: "Invierte en una suite con vocación turística y ubicación estratégica.",
    },
    // La voz empieza a los 0.58 s y acaba a los 4.28 s (la misma toma que la 076); entra en el golpe del f317 (10,6 s, antes de los 11 s). El plano dura hasta el golpe del f463.
    desde: 0,
    en: P.mitad,
    dur: P.r1 - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "Junto al ventanal (el porqué, dicho): Isabella se acerca y dice «invierte en una suite con vocación turística y ubicación estratégica». Entra a corte desde el gimnasio.",
  },
  {
    id: "c06-tienda",
    bloque: 5,
    tipo: "video",
    src: v("zs05"),
    // ZS05 (iPhone, 4K HLG), del 4,30 al 6,63 s: el interior de la tienda del edificio, ya dentro y sin el toldo (solo el interior). A CORTE en el golpe de 12.1 dB (f463).
    desde: 4.3,
    en: P.r1,
    dur: P.r2 - P.r1,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "La tienda del edificio, solo su interior (zona social): empieza donde ya no se lee la marca de terceros; abre el recorrido tras la mitad.",
  },
  {
    id: "c07-bicicletas",
    bloque: 5,
    tipo: "video",
    src: v("zs02"),
    // ZS02 (iPhone, 4K HLG), del 5,50 al 8,07 s: el banco rojo y las bicicletas del gimnasio. A CORTE en el golpe de 23.4 dB (f533).
    desde: 5.5,
    en: P.r2,
    dur: P.r3 - P.r2,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El gimnasio de lado (zona social, al detalle): el banco rojo y las bicicletas; cierra el paseo por el edificio antes de subir a la suite.",
  },
  {
    id: "c08-repisa",
    bloque: 5,
    tipo: "video",
    src: v("rc08"),
    // RC08 (iPhone, 4K HLG), del 4,30 al 6,50 s: la repisa con la planta y la cortina gris. A CORTE en el golpe de 11.3 dB (f610).
    desde: 4.3,
    en: P.r3,
    dur: P.vista - P.r3,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05 }),
    reason:
      "De fuera a dentro (la suite): la repisa con la planta y la cortina, junto al ventanal; prepara la vista.",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc07"),
    // RC07 (iPhone, 4K HLG), del 2,70 al 6,23 s: de la cama sube hasta el ventanal con la ciudad y las montañas de El Poblado al fondo. A CORTE en el golpe de 10.5 dB (f676). Es el plano más largo del recorrido (106 f): el clímax.
    desde: 2.7,
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
    src: v("ct06"),
    audio: a("ct06-voz"),
    voz: {
      s0: 0.45,
      s1: 3.22,
      lufs: -15,
      dice: "Agenda una visita y descubre su potencial de inversión.",
    },
    // La voz empieza a los 0.45 s y acaba a los 3.22 s (la misma toma, en el mismo golpe que la 076: f782). El plano dura 116 f; tras su última palabra la imagen funde a negro y entra la tarjeta.
    desde: fr(1),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "Primer plano de Isabella (la invitación): «agenda una visita y descubre su potencial de inversión»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-085/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` del CTA
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre. */
export const DURACION_085 = P.cta + DUR_CTA + DUR_TARJETA;
