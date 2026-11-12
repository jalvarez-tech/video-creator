/**
 * EL RECORRIDO 084 — «Suite Go Living (El Poblado)», V65 del registro: la variante B de la 075 con la estructura «lo vendible antes del segundo 10» (`recorrido-luxur` §3, fijada el 2026-11-10; la primera pieza
 * así es la 079).
 *
 * ÁNGULO: «¿Y si tu próxima propiedad también pudiera generar ingresos?» → una suite totalmente equipada, a puerta cerrada. Conserva la terna de voz de la 075 (HK06 · MD03 · CT08), su exterior (DR10) y su canción, «Street Level Sessions on the Green», con la MISMA entrada
 * (167.500 s): no es una versión nueva de la propiedad sino su variante B, y por eso repite canción (declarado en `combinaciones.md` y en `archivos/musica/registro-de-uso.md`).
 *
 *   bloque 1  c01-entrada              el exterior de la 075: f0-f103, SIN TEXTO NI VOZ
 *   bloque 2  c02-hook                 el hook de la 075, en el mismo frame; en la versión con ficha la ficha entra con él
 *   bloque 3  c03-cama · c04-escritorio   DOS planos rápidos, lo más vistoso, de ≤ 2,5 s cada uno y a corte: el segundo empieza en 9,1 s (antes del 10)
 *   bloque 4  c05-mitad                la mitad de la 075, a corte en el golpe del f322 (10,7 s: antes de los 11)
 *   bloque 5  c06-puerta … c10-vista   UN solo recorrido inmersivo, sin voz, de 5 planos; la vista (RC07) es el último y el más largo
 *   bloque 6  c11-cta y la tarjeta   el CTA de la 075 en su mismo golpe y la tarjeta oscura con el logo y la web
 *
 * LOS PLANOS (frames de la composición, 30 fps):
 *   1  c01-entrada                f   0- 103    0,0-  3,4 s  3,4 s
 *   2  c02-hook                   f 103- 220    3,4-  7,3 s  3,9 s
 *   3  c03-cama                   f 220- 273    7,3-  9,1 s  1,8 s
 *   3  c04-escritorio             f 273- 322    9,1- 10,7 s  1,6 s
 *   4  c05-mitad                  f 322- 449   10,7- 15,0 s  4,2 s
 *   5  c06-puerta                 f 449- 542   15,0- 18,1 s  3,1 s
 *   5  c07-tele                   f 542- 629   18,1- 21,0 s  2,9 s
 *   5  c08-cocineta               f 629- 706   21,0- 23,5 s  2,6 s
 *   5  c09-bano                   f 706- 813   23,5- 27,1 s  3,6 s
 *   5  c10-vista                  f 813- 966   27,1- 32,2 s  5,1 s
 *   6  c11-cta                    f 966-1080   32,2- 36,0 s  3,8 s
 *
 * QUIÉN MARCA EL TIEMPO. «Street Level Sessions on the Green», entrando en el mismo golpe que la 075 (167.542 s en el f3); la rejilla son los golpes MEDIDOS (`proyectos/084/musica/golpes-cancion-entera.json`) y cada cambio de plano
 * cae en uno (cortes secos ≥ 8 dB).
 *
 * UNIDADES. `desde`, en SEGUNDOS de la fuente; `en` y `dur`, en frames de la composición. Planos CONTIGUOS. El que entra disolviendo empieza a verse 12 f ANTES de su `en`.
 *
 * EL COLOR (R32): cada plano lleva su `color`; con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-084.ts`). La puerta lo carga con node. LO ESCRIBE `proyectos/080/herramientas/montar-pieza.mjs` desde `proyectos/084/pieza.json`.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-084";

export const FPS_084 = 30;

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
 * «Street Level Sessions on the Green» (`archivos/musica/…`). Se entra en su golpe de 167.542 s (14.6 dB). Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el
 * de «empieza a subir»): `proyectos/084/musica/golpes-cancion-entera.json` (`medir-pista.py --json`). El reparto de los cortes lo hace `montar-pieza.mjs` sobre ellos.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 167.542, db: 14.6 },
  /** El hook entra aquí: Isabella ya es opaca y su primera palabra suena unos frames después; la música baja con curva tras el golpe. */
  hook: { t: 170.891, db: 15.2 },
  /** El primer plano rápido, a corte (f220, 7,3 s). */
  rapido1: { t: 174.78, db: 11.5 },
  /** El segundo plano rápido, a corte (f273, 9,1 s: antes del segundo 10). */
  rapido2: { t: 176.552, db: 21 },
  /** La mitad entra A CORTE aquí (f322, 10,7 s: antes de los 11 s): suena entero y la música baja después. */
  mitad: { t: 178.191, db: 11.7 },
  /** El recorrido inmersivo: el plano «r1» entra a corte. */
  r1: { t: 182.403, db: 9 },
  /** El recorrido inmersivo: el plano «r2» entra a corte. */
  r2: { t: 185.525, db: 17.4 },
  /** El recorrido inmersivo: el plano «r3» entra a corte. */
  r3: { t: 188.41, db: 16 },
  /** El recorrido inmersivo: el plano «r4» entra a corte. */
  r4: { t: 190.967, db: 13.9 },
  /** El recorrido inmersivo: el plano «la vista, el clímax» entra a corte. */
  vista: { t: 194.532, db: 18.4 },
  /** El CTA entra A CORTE en este golpe, el mismo de la original. */
  cta: { t: 199.63, db: 13.4 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (167.542 s) cae en el frame 3 de la pieza; redondeado a un frame (5025/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 5025 / FPS_084;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_084;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_084;

/** Isabella: un empuje lento hacia ella. Los recorridos y el exterior, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-084/${id}.mp4`;
const a = (id: string): string => `recorrido-084/${id}.wav`;

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
  hook: golpe(GOLPE.hook), //  103 · Isabella ya es opaca; entra la ficha (versión con ficha); su primera palabra suena unos frames después
  rapido1: golpe(GOLPE.rapido1), //  220 · primer plano rápido (a corte)
  rapido2: golpe(GOLPE.rapido2), //  273 · segundo plano rápido (a corte)
  mitad: golpe(GOLPE.mitad), //  322 · Isabella con la mitad (a corte)
  r1: golpe(GOLPE.r1), //  449 · puerta (a corte)
  r2: golpe(GOLPE.r2), //  542 · tele (a corte)
  r3: golpe(GOLPE.r3), //  629 · cocineta (a corte)
  r4: golpe(GOLPE.r4), //  706 · bano (a corte)
  vista: golpe(GOLPE.vista), //  813 · LA VISTA (a corte)
  cta: golpe(GOLPE.cta), //  966 · Isabella con el CTA (a corte)
} as const;

/** Frames que dura la toma del CTA (la de la 075, en su mismo golpe): tras su última palabra la imagen funde a negro (los últimos 6) y sigue la tarjeta. Nada se congela. */
const DUR_CTA = 114;

/** Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero aquí, 2 f antes del final de la pieza (la tarjeta va en silencio). */
export const FIN_MUSICA_084 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje084: readonly Corte[] = [
  {
    id: "c01-entrada",
    bloque: 1,
    tipo: "video",
    src: v("dr10"),
    // DR10 (iPhone desde el suelo, 4K HLG → BT.709), del 0,30 al 3,73 s: el mismo exterior de la 075. Entra a corte con el golpe de 14.6 dB del f3.
    desde: 0.3,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "La entrada del edificio vista desde el suelo (la promesa): la calle, el jardín vertical y el voladizo de la torre. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook pregunta por la próxima propiedad.",
  },
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk06"),
    audio: a("hk06-voz"),
    voz: {
      s0: 0.62,
      s1: 3.56,
      lufs: -15,
      dice: "¿Y si tu próxima propiedad también pudiera generar ingresos?",
    },
    // La voz empieza a los 0.62 s y acaba a los 3.56 s (la misma toma que la 075, entra en el mismo frame). El plano dura hasta el golpe del f220: 16 f tras la última palabra, en los que la música sube.
    desde: 0.2,
    en: P.hook,
    dur: P.rapido1 - P.hook,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "La suite con el ventanal y la ciudad detrás (la pregunta): Isabella, de pie ante la ventana, dice «¿y si tu próxima propiedad también pudiera generar ingresos?». Entra a corte en el golpe desde el exterior; la música baja tras él.",
  },
  {
    id: "c03-cama",
    bloque: 3,
    tipo: "video",
    src: v("rc06"),
    // RC06 (iPhone, 4K HLG), del 4,40 al 6,17 s: la cama king y, al fondo, el sofá gris con el aire acondicionado; la cámara avanza sobre la cama. A CORTE en el golpe de 11.5 dB (f220).
    desde: 4.4,
    en: P.rapido1,
    dur: P.rapido2 - P.rapido1,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.12 }),
    reason:
      "La cama king de la suite (lo más vistoso, antes del segundo 10): la cámara avanza sobre ella hacia el sofá. Primer plano rápido: quien solo mira diez segundos ya ve qué se vende.",
  },
  {
    id: "c04-escritorio",
    bloque: 3,
    tipo: "video",
    src: v("rc09"),
    // RC09 (iPhone, 4K HLG), del 1,80 al 3,43 s: sobre la cama hacia el escritorio y el acceso a la cocineta. A CORTE en el golpe de 21.0 dB (f273).
    desde: 1.8,
    en: P.rapido2,
    dur: P.mitad - P.rapido2,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1 }),
    reason:
      "De la cama al escritorio (lo que trae, antes del segundo 10): segundo plano rápido; con él se cumplen los diez segundos y vuelve Isabella.",
  },
  {
    id: "c05-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md03"),
    audio: a("md03-voz"),
    voz: {
      s0: 0.75,
      s1: 4.02,
      lufs: -15,
      dice: "Una suite hotelera, totalmente equipada en El Poblado.",
    },
    // La voz empieza a los 0.75 s y acaba a los 4.02 s (la misma toma que la 075); entra en el golpe del f322 (10,7 s, antes de los 11 s) con `desde` 2 f para que la frase quepa entre este golpe y el del f449. El plano dura hasta el golpe del f449.
    desde: fr(2),
    en: P.mitad,
    dur: P.r1 - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "Frente a la cama (lo que se compra, dicho): Isabella camina con el cabecero gris y los cuadros detrás y dice «una suite hotelera, totalmente equipada en El Poblado». Entra a corte desde el escritorio.",
  },
  {
    id: "c06-puerta",
    bloque: 5,
    tipo: "video",
    src: v("rc12"),
    // RC12 (iPhone, 4K HLG), del 1,00 al 4,10 s: una mano abre la puerta con la tarjeta y la cámara entra al pasillo de la cocineta. A CORTE en el golpe de 9.0 dB (f449).
    desde: 1,
    en: P.r1,
    dur: P.r2 - P.r1,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "La puerta (a puerta cerrada, el umbral): una mano abre y la cámara entra; el puente humano que abre el recorrido.",
  },
  {
    id: "c07-tele",
    bloque: 5,
    tipo: "video",
    src: v("rc08"),
    // RC08 (iPhone, 4K HLG), del 2,20 al 5,10 s: el mueble de madera con el televisor, la escultura, la planta y la cortina gris. A CORTE en el golpe de 17.4 dB (f542).
    desde: 2.2,
    en: P.r2,
    dur: P.r3 - P.r2,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El televisor y el mueble (lo que trae): la suite viene equipada; sigue al pasillo de la entrada.",
  },
  {
    id: "c08-cocineta",
    bloque: 5,
    tipo: "video",
    src: v("rc02"),
    // RC02 (iPhone, 4K HLG), del 2,60 al 5,17 s: la cocineta con el microondas, la nevera, la cafetera y la estufa. A CORTE en el golpe de 16.0 dB (f629).
    desde: 2.6,
    en: P.r3,
    dur: P.r4 - P.r3,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "La cocineta (totalmente equipada): microondas, nevera, cafetera y estufa, todo puesto.",
  },
  {
    id: "c09-bano",
    bloque: 5,
    tipo: "video",
    src: v("rc01"),
    // RC01 (iPhone, 4K HLG), del 4,40 al 7,97 s: el baño privado con el lavamanos y la ducha de vidrio; la cámara gira a la derecha. A CORTE en el golpe de 13.9 dB (f706).
    desde: 4.4,
    en: P.r4,
    dur: P.vista - P.r4,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.08 }),
    reason:
      "El baño y la ducha de vidrio (lo que completa, al detalle): el recorrido de lo que trae acaba en el baño antes de volver a la ventana.",
  },
  {
    id: "c10-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc07"),
    // RC07 (iPhone, 4K HLG), del 1,10 al 6,20 s: de la cama sube hasta el ventanal con la ciudad y las montañas de El Poblado al fondo. A CORTE en el golpe de 18.4 dB (f813). Es el plano más largo del recorrido (153 f): el clímax.
    desde: 1.1,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ highlights: -0.3, whites: -0.15, exposure: -0.05 }),
    reason:
      "La ciudad desde el ventanal (la vista, el clímax): el plano más largo del recorrido y el último antes del CTA.",
  },
  {
    id: "c11-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct08"),
    audio: a("ct08-voz"),
    voz: {
      s0: 0.75,
      s1: 3.6,
      lufs: -15,
      dice: "Agendemos una visita y descubre Go Living Suites.",
    },
    // La voz empieza a los 0.75 s y acaba a los 3.6 s (la misma toma, en el mismo golpe que la 075: f966). El plano dura 114 f; tras su última palabra la imagen funde a negro y entra la tarjeta.
    desde: fr(10),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "Sofá de la suite (la invitación): Isabella, sentada, dice «agendemos una visita y descubre Go Living Suites»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  {
    id: "c12-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-084/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` del CTA
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre. */
export const DURACION_084 = P.cta + DUR_CTA + DUR_TARJETA;
