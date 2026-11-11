/**
 * EL RECORRIDO 080 — «Suite Go Living (El Poblado)», V61 del registro: la variante B de la 071 con la estructura «lo vendible antes del segundo 10» (`recorrido-luxur` §3, fijada el 2026-11-10; la primera pieza
 * así es la 079).
 *
 * ÁNGULO: «Tu inversión no debería convertirse en otro trabajo» → una suite hotelera con operadores turísticos listos para ti. Conserva la terna de voz de la 071 (HK08 · MD06 · CT09), su exterior (DR08) y su canción, «Heaven on Earth», con la MISMA entrada
 * (178.000 s): no es una versión nueva de la propiedad sino su variante B, y por eso repite canción (declarado en `combinaciones.md` y en `archivos/musica/registro-de-uso.md`).
 *
 *   bloque 1  c01-edificio             el exterior de la 071: f0-f86, SIN TEXTO NI VOZ
 *   bloque 2  c02-hook                 el hook de la 071, en el mismo frame; en la versión con ficha la ficha entra con él
 *   bloque 3  c03-tele · c04-habitacion   DOS planos rápidos, lo más vistoso, de ≤ 2,5 s cada uno y a corte: el segundo empieza en 8,8 s (antes del 10)
 *   bloque 4  c05-mitad                la mitad de la 071, a corte en el golpe del f328 (10,9 s: antes de los 11)
 *   bloque 5  c06-escritorio … c10-vista   UN solo recorrido inmersivo, sin voz, de 5 planos; la vista (RC07) es el último y el más largo
 *   bloque 6  c11-cta y la tarjeta   el CTA de la 071 en su mismo golpe y la tarjeta oscura con el logo y la web
 *
 * LOS PLANOS (frames de la composición, 30 fps):
 *   1  c01-edificio               f   0-  86    0,0-  2,9 s  2,9 s
 *   2  c02-hook                   f  86- 207    2,9-  6,9 s  4,0 s
 *   3  c03-tele                   f 207- 263    6,9-  8,8 s  1,9 s
 *   3  c04-habitacion             f 263- 328    8,8- 10,9 s  2,2 s
 *   4  c05-mitad                  f 328- 457   10,9- 15,2 s  4,3 s
 *   5  c06-escritorio             f 457- 518   15,2- 17,3 s  2,0 s
 *   5  c07-cocineta               f 518- 578   17,3- 19,3 s  2,0 s
 *   5  c08-cabecero               f 578- 634   19,3- 21,1 s  1,9 s
 *   5  c09-sofa                   f 634- 699   21,1- 23,3 s  2,2 s
 *   5  c10-vista                  f 699- 790   23,3- 26,3 s  3,0 s
 *   6  c11-cta                    f 790- 890   26,3- 29,7 s  3,3 s
 *
 * QUIÉN MARCA EL TIEMPO. «Heaven on Earth», entrando en el mismo golpe que la 071 (178.043 s en el f3); la rejilla son los golpes MEDIDOS (`proyectos/080/musica/golpes-cancion-entera.json`) y cada cambio de plano
 * cae en uno (cortes secos ≥ 8 dB).
 *
 * UNIDADES. `desde`, en SEGUNDOS de la fuente; `en` y `dur`, en frames de la composición. Planos CONTIGUOS. El que entra disolviendo empieza a verse 12 f ANTES de su `en`.
 *
 * EL COLOR (R32): cada plano lleva su `color`; con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-080.ts`). La puerta lo carga con node. LO ESCRIBE `proyectos/080/herramientas/montar-pieza.mjs` desde `proyectos/080/pieza.json`.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-080";

export const FPS_080 = 30;

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
 * «Heaven on Earth» (`archivos/musica/…`). Se entra en su golpe de 178.043 s (10.2 dB). Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el
 * de «empieza a subir»): `proyectos/080/musica/golpes-cancion-entera.json` (`medir-pista.py --json`). El reparto de los cortes lo hace `montar-pieza.mjs` sobre ellos.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 178.043, db: 10.2 },
  /** El hook entra aquí: Isabella ya es opaca y su primera palabra suena unos frames después; la música baja con curva tras el golpe. */
  hook: { t: 180.82, db: 11.5 },
  /** El primer plano rápido, a corte (f207, 6,9 s). */
  rapido1: { t: 184.846, db: 11.6 },
  /** El segundo plano rápido, a corte (f263, 8,8 s: antes del segundo 10). */
  rapido2: { t: 186.698, db: 13.1 },
  /** La mitad entra A CORTE aquí (f328, 10,9 s: antes de los 11 s): suena entero y la música baja después. */
  mitad: { t: 188.866, db: 18.7 },
  /** El recorrido inmersivo: el plano «r1» entra a corte. */
  r1: { t: 193.193, db: 13.3 },
  /** El recorrido inmersivo: el plano «r2» entra a corte. */
  r2: { t: 195.199, db: 11 },
  /** El recorrido inmersivo: el plano «r3» entra a corte. */
  r3: { t: 197.216, db: 12.4 },
  /** El recorrido inmersivo: el plano «r4» entra a corte. */
  r4: { t: 199.074, db: 10.1 },
  /** El recorrido inmersivo: el plano «la vista, el clímax» entra a corte. */
  vista: { t: 201.24, db: 11.1 },
  /** El CTA entra A CORTE en este golpe, el mismo de la original. */
  cta: { t: 204.287, db: 13.6 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (178.043 s) cae en el frame 3 de la pieza; redondeado a un frame (5340/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 5340 / FPS_080;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_080;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_080;

/** Isabella: un empuje lento hacia ella. Los recorridos y el exterior, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-080/${id}.mp4`;
const a = (id: string): string => `recorrido-080/${id}.wav`;

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
  hook: golpe(GOLPE.hook), //   86 · Isabella ya es opaca; entra la ficha (versión con ficha); su primera palabra suena unos frames después
  rapido1: golpe(GOLPE.rapido1), //  207 · primer plano rápido (a corte)
  rapido2: golpe(GOLPE.rapido2), //  263 · segundo plano rápido (a corte)
  mitad: golpe(GOLPE.mitad), //  328 · Isabella con la mitad (a corte)
  r1: golpe(GOLPE.r1), //  457 · escritorio (a corte)
  r2: golpe(GOLPE.r2), //  518 · cocineta (a corte)
  r3: golpe(GOLPE.r3), //  578 · cabecero (a corte)
  r4: golpe(GOLPE.r4), //  634 · sofa (a corte)
  vista: golpe(GOLPE.vista), //  699 · LA VISTA (a corte)
  cta: golpe(GOLPE.cta), //  790 · Isabella con el CTA (a corte)
} as const;

/** Frames que dura la toma del CTA (la de la 071, en su mismo golpe): tras su última palabra la imagen funde a negro (los últimos 6) y sigue la tarjeta. Nada se congela. */
const DUR_CTA = 100;

/** Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero aquí, 2 f antes del final de la pieza (la tarjeta va en silencio). */
export const FIN_MUSICA_080 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje080: readonly Corte[] = [
  {
    id: "c01-edificio",
    bloque: 1,
    tipo: "video",
    src: v("dr08"),
    // DR08 (iPhone desde el suelo, 4K HLG → BT.709), del 0,50 al 3,37 s: el mismo exterior de la 071. Entra a corte con el golpe de 10.2 dB del f3.
    desde: 0.5,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ highlights: -0.3 }),
    reason:
      "El edificio visto desde el suelo (la promesa): la torre entre las plantas y el cielo. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de que la inversión no sea otro trabajo.",
  },
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk08"),
    audio: a("hk08-voz"),
    voz: {
      s0: 0.9,
      s1: 4.26,
      lufs: -15,
      dice: "Tu inversión no debería convertirse en otro trabajo.",
    },
    // La voz empieza a los 0.9 s y acaba a los 4.26 s (la misma toma que la 071, entra en el mismo frame). El plano dura hasta el golpe del f207: 6 f tras la última palabra, en los que la música sube.
    desde: fr(13),
    en: P.hook,
    dur: P.rapido1 - P.hook,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "La suite con el ventanal y la ciudad detrás (la promesa): Isabella, de pie frente a la ventana, dice «tu inversión no debería convertirse en otro trabajo». Entra disolviendo desde el exterior; la música ya está abajo.",
  },
  {
    id: "c03-tele",
    bloque: 3,
    tipo: "video",
    src: v("rc08"),
    // RC08 (iPhone, 4K HLG), del 0,20 al 2,07 s: el mueble de madera con la escultura, la planta y la cortina gris, con su luz cálida. A CORTE en el golpe de 11.6 dB (f207).
    desde: 0.2,
    en: P.rapido1,
    dur: P.rapido2 - P.rapido1,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El rincón más cálido de la suite (lo más vistoso, antes del segundo 10): el mueble de madera con la escultura, la planta y la cortina. Primer plano rápido: quien solo mira diez segundos ya ve cómo es por dentro.",
  },
  {
    id: "c04-habitacion",
    bloque: 3,
    tipo: "video",
    src: v("rc03"),
    // RC03 (iPhone, 4K HLG), del 3,40 al 5,57 s: la suite entera de un vistazo: el escritorio con la silla azul, el televisor, la cama y el ventanal al fondo. A CORTE en el golpe de 13.1 dB (f263).
    desde: 3.4,
    en: P.rapido2,
    dur: P.mitad - P.rapido2,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "La suite entera de un vistazo (lo que ya está puesto, antes del segundo 10): escritorio, televisor y cama. Segundo plano rápido; con él se cumplen los diez segundos y vuelve Isabella.",
  },
  {
    id: "c05-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md06"),
    audio: a("md06-voz"),
    voz: {
      s0: 0.53,
      s1: 4.1,
      lufs: -15,
      dice: "Una suite hotelera con operadores turísticos listos para ti.",
    },
    // La voz empieza a los 0.53 s y acaba a los 4.1 s (la misma toma que la 071); entra en el golpe del f328 (10,9 s, antes de los 11 s) con `desde` 2 f para que la frase quepa entre este golpe y el del f457. El plano dura hasta el golpe del f457.
    desde: fr(2),
    en: P.mitad,
    dur: P.r1 - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "Frente al ventanal (el valor, dicho): Isabella, de pie con la ciudad detrás, dice «una suite hotelera con operadores turísticos listos para ti». Entra a corte desde el mueble.",
  },
  {
    id: "c06-escritorio",
    bloque: 5,
    tipo: "video",
    src: v("rc09"),
    // RC09 (iPhone, 4K HLG), del 2,80 al 4,83 s: de la cama al escritorio, con el acceso a la cocineta al fondo. A CORTE en el golpe de 13.3 dB (f457).
    desde: 2.8,
    en: P.r1,
    dur: P.r2 - P.r1,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.06 }),
    reason:
      "De la cama al escritorio (lo que ya está puesto): abre el paseo donde acaba la mitad; la cámara sigue el borde de la cama hasta el escritorio.",
  },
  {
    id: "c07-cocineta",
    bloque: 5,
    tipo: "video",
    src: v("rc02"),
    // RC02 (iPhone, 4K HLG), del 0,60 al 2,60 s: la cocineta con el microondas, la nevera, la cafetera y la estufa; la cámara se acerca y sube. A CORTE en el golpe de 11.0 dB (f518).
    desde: 0.6,
    en: P.r2,
    dur: P.r3 - P.r2,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "La cocineta (lo práctico): microondas, nevera, cafetera y estufa, todo puesto; viene tras el escritorio, en el orden del acceso a la cocineta.",
  },
  {
    id: "c08-cabecero",
    bloque: 5,
    tipo: "video",
    src: v("rc05"),
    // RC05 (iPhone, 4K HLG), del 5,00 al 6,87 s: la cama king con el cabecero gris, los cuadros y las lámparas colgantes. A CORTE en el golpe de 12.4 dB (f578).
    desde: 5,
    en: P.r3,
    dur: P.r4 - P.r3,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1 }),
    reason:
      "La cama y su cabecero (cómo se vive): el descanso de la suite, con los cuadros y las lámparas colgantes.",
  },
  {
    id: "c09-sofa",
    bloque: 5,
    tipo: "video",
    src: v("rc06"),
    // RC06 (iPhone, 4K HLG), del 5,50 al 7,67 s: la cama king y, al fondo, el sofá gris con el aire acondicionado. A CORTE en el golpe de 10.1 dB (f634).
    desde: 5.5,
    en: P.r4,
    dur: P.vista - P.r4,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.12 }),
    reason:
      "La cama y el sofá (cómo se vive, al detalle): la cámara avanza sobre la cama hacia el rincón de estar; prepara la subida al ventanal.",
  },
  {
    id: "c10-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc07"),
    // RC07 (iPhone, 4K HLG), del 3,20 al 6,23 s: de la cama sube hasta el ventanal con la repisa de ladrillo y la ciudad y las montañas de El Poblado al fondo. A CORTE en el golpe de 11.1 dB (f699). Es el plano más largo del recorrido (91 f): el clímax.
    desde: 3.2,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ highlights: -0.3, whites: -0.15, exposure: -0.05 }),
    reason:
      "La ciudad desde el ventanal (la vista, el clímax): de la cama sube hasta la ventana con El Poblado y las montañas al fondo; el plano más largo del recorrido y el último antes del CTA.",
  },
  {
    id: "c11-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct09"),
    audio: a("ct09-voz"),
    voz: {
      s0: 0.58,
      s1: 2.96,
      lufs: -15,
      dice: "Hablemos y conoce tus opciones de inversión.",
    },
    // La voz empieza a los 0.58 s y acaba a los 2.96 s (la misma toma, en el mismo golpe que la 071: f790). El plano dura 100 f; tras su última palabra la imagen funde a negro y entra la tarjeta.
    desde: fr(5),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "El escritorio de la suite (la invitación): Isabella, sentada, dice «hablemos y conoce tus opciones de inversión»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  {
    id: "c12-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-080/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` del CTA
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre. */
export const DURACION_080 = P.cta + DUR_CTA + DUR_TARJETA;
