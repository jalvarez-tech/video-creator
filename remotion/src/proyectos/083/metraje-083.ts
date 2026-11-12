/**
 * EL RECORRIDO 083 — «Suite Go Living (El Poblado)», V64 del registro: la variante B de la 074 con la estructura «lo vendible antes del segundo 10» (`recorrido-luxur` §3, fijada el 2026-11-10; la primera pieza
 * así es la 079).
 *
 * ÁNGULO: «Las buenas inversiones empiezan con buenas decisiones» → las zonas sociales del edificio. Conserva la terna de voz de la 074 (HK09 · MD09 · CT12), su exterior (DR06) y su canción, «Some Say», con la MISMA entrada
 * (140.700 s): no es una versión nueva de la propiedad sino su variante B, y por eso repite canción (declarado en `combinaciones.md` y en `archivos/musica/registro-de-uso.md`).
 *
 *   bloque 1  c01-edificio             el exterior de la 074: f0-f90, SIN TEXTO NI VOZ
 *   bloque 2  c02-hook                 el hook de la 074, en el mismo frame; en la versión con ficha la ficha entra con él
 *   bloque 3  c03-gimnasio · c04-plantas   DOS planos rápidos, lo más vistoso, de ≤ 2,5 s cada uno y a corte: el segundo empieza en 8,7 s (antes del 10)
 *   bloque 4  c05-mitad                la mitad de la 074, a corte en el golpe del f303 (10,1 s: antes de los 11)
 *   bloque 5  c06-pesas … c09-fachada   UN solo recorrido inmersivo, sin voz, de 4 planos; la vista (DR03) es el último y el más largo
 *   bloque 6  c10-cta y la tarjeta   el CTA de la 074 en su mismo golpe y la tarjeta oscura con el logo y la web
 *
 * LOS PLANOS (frames de la composición, 30 fps):
 *   1  c01-edificio               f   0-  90    0,0-  3,0 s  3,0 s
 *   2  c02-hook                   f  90- 208    3,0-  6,9 s  3,9 s
 *   3  c03-gimnasio               f 208- 261    6,9-  8,7 s  1,8 s
 *   3  c04-plantas                f 261- 303    8,7- 10,1 s  1,4 s
 *   4  c05-mitad                  f 303- 486   10,1- 16,2 s  6,1 s
 *   5  c06-pesas                  f 486- 585   16,2- 19,5 s  3,3 s
 *   5  c07-cardio                 f 585- 688   19,5- 22,9 s  3,4 s
 *   5  c08-torre                  f 688- 791   22,9- 26,4 s  3,4 s
 *   5  c09-fachada                f 791- 929   26,4- 31,0 s  4,6 s
 *   6  c10-cta                    f 929-1034   31,0- 34,5 s  3,5 s
 *
 * QUIÉN MARCA EL TIEMPO. «Some Say», entrando en el mismo golpe que la 074 (140.733 s en el f3); la rejilla son los golpes MEDIDOS (`proyectos/083/musica/golpes-cancion-entera.json`) y cada cambio de plano
 * cae en uno (cortes secos ≥ 8 dB).
 *
 * UNIDADES. `desde`, en SEGUNDOS de la fuente; `en` y `dur`, en frames de la composición. Planos CONTIGUOS. El que entra disolviendo empieza a verse 12 f ANTES de su `en`.
 *
 * EL COLOR (R32): cada plano lleva su `color`; con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-083.ts`). La puerta lo carga con node. LO ESCRIBE `proyectos/080/herramientas/montar-pieza.mjs` desde `proyectos/083/pieza.json`.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-083";

export const FPS_083 = 30;

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
 * «Some Say» (`archivos/musica/…`). Se entra en su golpe de 140.733 s (13.1 dB). Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el
 * de «empieza a subir»): `proyectos/083/musica/golpes-cancion-entera.json` (`medir-pista.py --json`). El reparto de los cortes lo hace `montar-pieza.mjs` sobre ellos.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 140.733, db: 13.1 },
  /** El hook entra aquí: Isabella ya es opaca y su primera palabra suena unos frames después; la música baja con curva tras el golpe. */
  hook: { t: 143.632, db: 24 },
  /** El primer plano rápido, a corte (f208, 6,9 s). */
  rapido1: { t: 147.578, db: 15.8 },
  /** El segundo plano rápido, a corte (f261, 8,7 s: antes del segundo 10). */
  rapido2: { t: 149.33, db: 9.6 },
  /** La mitad entra A CORTE aquí (f303, 10,1 s: antes de los 11 s): suena entero y la música baja después. */
  mitad: { t: 150.754, db: 16 },
  /** El recorrido inmersivo: el plano «r1» entra a corte. */
  r1: { t: 156.833, db: 8 },
  /** El recorrido inmersivo: el plano «r2» entra a corte. */
  r2: { t: 160.16, db: 22.8 },
  /** El recorrido inmersivo: el plano «r3» entra a corte. */
  r3: { t: 163.587, db: 13.1 },
  /** El recorrido inmersivo: el plano «la vista, el clímax» entra a corte. */
  vista: { t: 167.016, db: 24.6 },
  /** El CTA entra A CORTE en este golpe, el mismo de la original. */
  cta: { t: 171.596, db: 21.4 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (140.733 s) cae en el frame 3 de la pieza; redondeado a un frame (4221/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 4221 / FPS_083;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_083;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_083;

/** Isabella: un empuje lento hacia ella. Los recorridos y el exterior, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-083/${id}.mp4`;
const a = (id: string): string => `recorrido-083/${id}.wav`;

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
  rapido1: golpe(GOLPE.rapido1), //  208 · primer plano rápido (a corte)
  rapido2: golpe(GOLPE.rapido2), //  261 · segundo plano rápido (a corte)
  mitad: golpe(GOLPE.mitad), //  303 · Isabella con la mitad (a corte)
  r1: golpe(GOLPE.r1), //  486 · pesas (a corte)
  r2: golpe(GOLPE.r2), //  585 · cardio (a corte)
  r3: golpe(GOLPE.r3), //  688 · torre (a corte)
  vista: golpe(GOLPE.vista), //  791 · LA VISTA (a corte)
  cta: golpe(GOLPE.cta), //  929 · Isabella con el CTA (a corte)
} as const;

/** Frames que dura la toma del CTA (la de la 074, en su mismo golpe): tras su última palabra la imagen funde a negro (los últimos 6) y sigue la tarjeta. Nada se congela. */
const DUR_CTA = 105;

/** Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero aquí, 2 f antes del final de la pieza (la tarjeta va en silencio). */
export const FIN_MUSICA_083 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje083: readonly Corte[] = [
  {
    id: "c01-edificio",
    bloque: 1,
    tipo: "video",
    src: v("dr06"),
    // DR06 (iPhone desde el suelo, 4K HLG → BT.709), del 0,40 al 3,40 s: el mismo exterior de la 074. Entra a corte con el golpe de 13.1 dB del f3.
    desde: 0.4,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El edificio visto desde el suelo (la promesa): el muro vegetal con el «GO» de Go Living entre las hojas y, arriba, la torre. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de decisiones.",
  },
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk09"),
    audio: a("hk09-voz"),
    voz: {
      s0: 1.04,
      s1: 4.03,
      lufs: -15,
      dice: "Las buenas inversiones empiezan con buenas decisiones.",
    },
    // La voz empieza a los 1.04 s y acaba a los 4.03 s (la misma toma que la 074, entra en el mismo frame). El plano dura hasta el golpe del f208: 9 f tras la última palabra, en los que la música sube.
    desde: 0.4,
    en: P.hook,
    dur: P.rapido1 - P.hook,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "La terraza del edificio con jardineras y ventanales (la decisión): Isabella camina hacia cámara y dice «las buenas inversiones empiezan con buenas decisiones». Entra disolviendo desde el exterior; la música ya está abajo.",
  },
  {
    id: "c03-gimnasio",
    bloque: 3,
    tipo: "video",
    src: v("zs01"),
    // ZS01 (iPhone, 4K HLG), del 0,30 al 2,07 s: el gimnasio: la torre de dominadas y el banco, y el barrido a las elípticas y trotadoras. A CORTE en el golpe de 15.8 dB (f208).
    desde: 0.3,
    en: P.rapido1,
    dur: P.rapido2 - P.rapido1,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El gimnasio del edificio (lo más vistoso de las zonas sociales, antes del segundo 10): la torre de dominadas y el barrido a las máquinas. Primer plano rápido: quien solo mira diez segundos ya ve qué trae el edificio.",
  },
  {
    id: "c04-plantas",
    bloque: 3,
    tipo: "video",
    src: v("dr01"),
    // DR01 (iPhone, 4K HLG), del 1,00 al 2,40 s: el edificio entre las plantas de monstera, con el cielo nublado. A CORTE en el golpe de 9.6 dB (f261).
    desde: 1,
    en: P.rapido2,
    dur: P.mitad - P.rapido2,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El edificio entre las plantas (el entorno, antes del segundo 10): segundo plano rápido; con él se cumplen los diez segundos y vuelve Isabella.",
  },
  {
    id: "c05-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md09"),
    audio: a("md09-voz"),
    voz: {
      s0: 0.6,
      s1: 5.48,
      lufs: -15,
      dice: "Una ubicación estratégica, amenidades y cercanía a los principales destinos turísticos.",
    },
    // La voz empieza a los 0.6 s y acaba a los 5.48 s (la misma toma que la 074); entra en el golpe del f303 (10,1 s, antes de los 11 s). El plano dura hasta el golpe del f486.
    desde: 0,
    en: P.mitad,
    dur: P.r1 - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04, exposure: 0.1 }),
    reason:
      "El gimnasio (las amenidades, dichas): Isabella camina hacia cámara por la sala y dice «una ubicación estratégica, amenidades y cercanía a los principales destinos turísticos». Entra a corte desde la entrada al gimnasio.",
  },
  {
    id: "c06-pesas",
    bloque: 5,
    tipo: "video",
    src: v("zs02"),
    // ZS02 (iPhone, 4K HLG), del 2,00 al 5,30 s: los discos de pesas, las mancuernas y el banco rojo; pasa a las bicicletas. A CORTE en el golpe de 8.0 dB (f486).
    desde: 2,
    en: P.r1,
    dur: P.r2 - P.r1,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "Las pesas y el banco rojo (cómo se usa): la sala de pesas del gimnasio, tras la mitad que habla de amenidades.",
  },
  {
    id: "c07-cardio",
    bloque: 5,
    tipo: "video",
    src: v("zs03"),
    // ZS03 (iPhone, 4K HLG), del 0,30 al 3,73 s: las trotadoras y las elípticas frente al espejo con las mancuernas. A CORTE en el golpe de 22.8 dB (f585).
    desde: 0.3,
    en: P.r2,
    dur: P.r3 - P.r2,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "Las trotadoras y las elípticas (cómo se usa, al detalle): el cardio frente al espejo.",
  },
  {
    id: "c08-torre",
    bloque: 5,
    tipo: "video",
    src: v("dr07"),
    // DR07 (iPhone, 4K HLG), del 1,50 al 4,93 s: las cicas y el follaje en primer plano, con la torre al fondo. A CORTE en el golpe de 13.1 dB (f688).
    desde: 1.5,
    en: P.r3,
    dur: P.vista - P.r3,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1 }),
    reason:
      "De las máquinas al edificio (el entorno): las cicas y la torre vuelven a mostrar dónde está todo esto; prepara la fachada.",
  },
  {
    id: "c09-fachada",
    bloque: 5,
    tipo: "video",
    src: v("dr03"),
    // DR03 (iPhone, 4K HLG), del 0,50 al 5,10 s: la fachada de voladizos oscuros con el sol de frente, con las jardineras abajo. A CORTE en el golpe de 24.6 dB (f791). Es el plano más largo del recorrido (138 f): el clímax.
    desde: 0.5,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ highlights: -0.3, whites: -0.15, exposure: -0.05 }),
    reason:
      "El edificio entero al sol (el clímax de esta pieza): la fachada que contiene todo lo anterior; el plano más largo del recorrido y el último antes del CTA.",
  },
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct12"),
    audio: a("ct12-voz"),
    voz: {
      s0: 0.68,
      s1: 3.16,
      lufs: -15,
      dice: "Conoce esto y mucho más en Go Living Suites.",
    },
    // La voz empieza a los 0.68 s y acaba a los 3.16 s (la misma toma, en el mismo golpe que la 074: f929). El plano dura 105 f; tras su última palabra la imagen funde a negro y entra la tarjeta.
    desde: fr(8),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "Gradas del lounge (la invitación): Isabella, sentada, dice «conoce esto y mucho más en Go Living Suites»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-083/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` del CTA
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre. */
export const DURACION_083 = P.cta + DUR_CTA + DUR_TARJETA;
