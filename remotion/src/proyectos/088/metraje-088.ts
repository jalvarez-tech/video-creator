/**
 * EL RECORRIDO 088 — «Casa El Retiro · Senderos de Compostela» (Propiedades Luxur), V69 del registro. ELECTRÓNICA · guion 04: «Y si tus mejores reuniones empezaran con esta vista» → la zona social, la cocina y el deck.
 *
 * Es de la ESTRUCTURA «lo vendible antes del segundo 10» (`recorrido-luxur` §3, pedido del 2026-11-10; la primera pieza hecha así es la 079):
 *   1 la toma inicial (DR01, sin texto ni voz) · 2 el hook de Isabella (HK04) · 3 DOS planos rápidos (DR08 y RC34) ·
 *   4 la mitad (MD04) · 5 UN recorrido inmersivo (RC21 → RC26 → RC29 → RC31 → DR17; la vista, el plano más largo) · 6 el CTA (CT04) y la tarjeta oscura del cierre.
 * El guion es el 04 del rodaje del 2026-11-11 (HK04 · MD04 · CT04: Isabella Cadavid, blazer vino tinto) y la canción es «Six Figures in Airplane Mode» (electrónica instrumental a ≈ 122 BPM, pista 11 de «The life that God has for me»).
 *
 * GENERADO por `proyectos/088/herramientas/montar-retiro.mjs 088` desde `proyectos/088/pieza.json`: los números de abajo (cada corte, en un golpe MEDIDO de la canción) se rehacen con él; lo que se escribe a mano es `pieza.json`.
 *
 * QUIÉN MARCA EL TIEMPO. La canción, entrando en el segundo 125.067 de su corte (el golpe de 18.5 dB, f3); la rejilla son los golpes MEDIDOS (`proyectos/088/musica/golpes-cancion-entera.json`, 192 en total)
 * y cada cambio de plano cae en uno de al menos 8 dB. Entrada de 45 s del catálogo (125,12 s de la pista, ★★★, golpe de 18,5 dB en el f3).
 *
 * UNIDADES. `desde`, en SEGUNDOS de la fuente; `en` y `dur`, en frames de la composición. Planos CONTIGUOS. Las tres tomas de Isabella entran A CORTE en su golpe, con `desde` = su primera palabra − 12 f:
 * el golpe suena entero, la música baja con curva de coseno DESPUÉS y su bajada acaba 2 f antes de la primera palabra (regla del canal desde el 022).
 *
 * EL COLOR (R32): cada plano lleva su `color`; con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-088.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-088";

export const FPS_088 = 30;

export type Entrada = "corte" | "disolver";
export type Bloque = 1 | 2 | 3 | 4 | 5 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. `s0`/`s1`, medidos por energía (`limites-voz.py --margen 40`); `lufs`, con ebur128 sobre el WAV TRATADO que suena. */
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

/** EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal). Cada voz pasa por la cadena de `normalizar.mjs` hasta −15,0 LUFS en su ventana; el plan no añade ganancia. */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Six Figures in Airplane Mode» — pista 11 del mix «The life that God has for me» (3:37, Fa menor, brillante), cortada del archivo del mix en 2144,92-2362,80 s. Se entra en el segundo 125.067 del corte (`proyectos/088/original/musica-six-figures-in-airplane-mode.wav`). Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms;
 * el instante es el de «empieza a subir»): `proyectos/088/musica/golpes-cancion-entera.json` (`medir-pista.py --json`). El reparto lo hizo `montar-retiro.mjs` (programación dinámica sobre esos golpes).
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 125.125, db: 18.5 },
  hook: { t: 127.823, db: 12.6 }, // f84
  rapido1: { t: 131.387, db: 13.1 }, // f191
  rapido2: { t: 133.463, db: 12.4 }, // f254
  mitad: { t: 135.307, db: 14.2 }, // f309
  r1: { t: 141.785, db: 8.8 }, // f503
  r2: { t: 144.244, db: 15.5 }, // f577
  r3: { t: 147.067, db: 11.2 }, // f662
  r4: { t: 150.011, db: 9.4 }, // f750
  vista: { t: 152.568, db: 17.7 }, // f827
  cta: { t: 156.626, db: 27.6 }, // f948
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de su corte: el golpe de entrada (125.125 s) cae en el frame 3 de la pieza; redondeado a un frame (3752/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 3752 / FPS_088;

/** Lo que el audio del render llega TARDE respecto de su fuente: 42 ms (medido en el 016 y confirmado desde el 017). Se suma aquí y en la puerta para que el corte caiga en el frame en que el golpe SUENA. */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_088;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_088;

/** Isabella: un empuje lento hacia ella. Los recorridos y los exteriores, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-088/${id}.mp4`;
const a = (id: string): string => `recorrido-088/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE del canal: contraste con cuerpo, negros hundidos, luces recogidas, un punto cálido y +10 % de saturación. `vibrance` ≤ 0,05 y, en las tomas de Isabella, `saturation` ≤ 1,06 (la piel se queda donde estaba).
 * El AJUSTE de cada plano se mide (`herramientas/medir-color.py`), no se hereda.
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

/** Los frames de cada cambio de plano: todos salen de `golpe(...)`, así que mover la entrada de la música es cambiar `INICIO_MUSICA`. */
const P = {
  hook: golpe(GOLPE.hook),
  rapido1: golpe(GOLPE.rapido1),
  rapido2: golpe(GOLPE.rapido2),
  mitad: golpe(GOLPE.mitad),
  r1: golpe(GOLPE.r1),
  r2: golpe(GOLPE.r2),
  r3: golpe(GOLPE.r3),
  r4: golpe(GOLPE.r4),
  vista: golpe(GOLPE.vista),
  cta: golpe(GOLPE.cta),
} as const;

/** Frames que dura la toma del CTA: voz de 0.62 a 2.54 s (clip de 99 f, `desde` 7 f); 16 f de su cara tras la última palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela. */
const DUR_CTA = 86;

/** Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero aquí, 2 f antes del final de la pieza (la tarjeta va en silencio). */
export const FIN_MUSICA_088 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje088: readonly Corte[] = [
  // ── Bloque 1 · la casa de lejos ──
  {
    id: "c01-exterior",
    bloque: 1,
    tipo: "video",
    src: v("dr01"),
    // DR01 (dron, 4K SDR), del 0,50 al 3,4 s: la casa sobre la ladera entre pinos, lejana y diminuta, mientras el dron sube y avanza despacio hacia ella. Entra a corte con el golpe de 18,5 dB del f3.
    desde: 0.5,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1 }),
    reason:
      "La casa de lejos, sobre su ladera, sola en el paisaje (la promesa): el dron sube y se acerca despacio. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de reuniones con esta vista.",
  },
  // ── Bloque 2 · el hook (con él entra la ficha en la versión de ficha) ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk04"),
    audio: a("hk04-voz"),
    voz: {
      s0: 0.61,
      s1: 3.33,
      lufs: -15,
      dice: "Y si tus mejores reuniones empezaran con esta vista.",
    },
    // Isabella empieza lejos, en el deck con el valle y las nubes detrás, y camina hacia cámara. La voz va de 0,61 a 3,33 s (126 f de clip; 6 f de aire antes de su primera palabra: sube en el golpe y la primera palabra suena 12 f después).
    desde: fr(6),
    en: P.hook,
    dur: P.rapido1 - P.hook,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "El deck con el valle y las nubes detrás (la promesa dicha): Isabella camina hacia cámara y pregunta «¿y si tus mejores reuniones empezaran con esta vista?». Entra a corte en un golpe de la canción tras la casa de lejos.",
  },
  // ── Bloque 3 · DOS planos rápidos: lo más vistoso, antes del segundo 10 ──
  {
    id: "c03-cubiertas",
    bloque: 3,
    tipo: "video",
    src: v("dr08"),
    // DR08 (dron, 4K SDR), del 2,0 al 4,4 s: travelling frontal a la altura del deck, las tres cubiertas a dos aguas con el sol de frente y la baranda. A corte en un golpe.
    desde: 2,
    en: P.rapido1,
    dur: P.rapido2 - P.rapido1,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "Las tres cubiertas a dos aguas vistas de frente, a la altura del deck (lo más vistoso, antes del segundo 10): el dron avanza pegado a la fachada. Primer plano rápido: quien solo mira diez segundos ya ha visto cómo es la casa.",
  },
  {
    id: "c04-jacuzzi",
    bloque: 3,
    tipo: "video",
    src: v("rc34"),
    // RC34 (iPhone, 4K HLG), del 2,2 al 4,6 s: el jacuzzi en primer plano, el pabellón de vidrio y las nubes detrás. A corte en un golpe.
    desde: 2.2,
    en: P.rapido2,
    dur: P.mitad - P.rapido2,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.1 }),
    reason:
      "El jacuzzi con el pabellón de vidrio y el cielo detrás (la vida afuera de la sala): segundo plano rápido, con él se cumplen los diez segundos y vuelve Isabella.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c05-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md04"),
    audio: a("md04-voz"),
    voz: {
      s0: 0.66,
      s1: 6,
      lufs: -15,
      dice: "La sala, el comedor y la cocina comparten un gran ambiente conectado con un deck panorámico.",
    },
    // Isabella viene desde el fondo de la sala-comedor-cocina, con la isla y la campana a la derecha. La voz va de 0,66 a 6,00 s (206 f de clip); 8 f de aire antes de su primera palabra.
    desde: fr(8),
    en: P.mitad,
    dur: P.r1 - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "La sala, el comedor y la cocina (el valor dicho): Isabella viene desde el fondo del ambiente largo, con la isla y la campana a su derecha, y dice «la sala, el comedor y la cocina comparten un gran ambiente conectado con un deck panorámico». Entra a corte antes de los 11 s.",
  },
  // ── Bloque 5 · el recorrido inmersivo ──
  {
    id: "c06-portal",
    bloque: 5,
    tipo: "video",
    src: v("rc21"),
    // RC21 (iPhone, 4K HLG), del 0,4 al 3,6 s: una mano con reloj abre la puerta pivotante de listones y se asoma el patio central con el jacuzzi y las nubes. Es el puente humano del formato: la mano que abre.
    desde: 0.4,
    en: P.r1,
    dur: P.r2 - P.r1,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.15 }),
    reason:
      "El portal (el umbral): una mano abre la puerta de listones y se asoma el patio con el jacuzzi y el cielo; el golpe abre el paseo y la mano es el puente humano.",
  },
  {
    id: "c07-cocina",
    bloque: 5,
    tipo: "video",
    src: v("rc26"),
    // RC26 (iPhone, 4K HLG), del 3,2 al 6,4 s: la cocina en galería, la isla en cascada, la estufa y la campana; la cámara llega a la cabecera de la isla y gira hacia los ventanales.
    desde: 3.2,
    en: P.r2,
    dur: P.r3 - P.r2,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "La cocina en galería (lo práctico, al detalle): el mesón en cascada, la estufa y la campana; sigue al portal y la cámara gira hacia los ventanales que vienen después.",
  },
  {
    id: "c08-sala",
    bloque: 5,
    tipo: "video",
    src: v("rc29"),
    // RC29 (iPhone, 4K HLG), del 1,0 al 4,4 s: el pabellón vacío con los ventanales de piso a techo y las montañas; paneo hacia la puerta corrediza.
    desde: 1,
    en: P.r3,
    dur: P.r4 - P.r3,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "La sala del pabellón (el ambiente conectado): los ventanales de piso a techo y las montañas al fondo; viene tras la cocina, en el orden en que se camina la casa.",
  },
  {
    id: "c09-deck",
    bloque: 5,
    tipo: "video",
    src: v("rc31"),
    // RC31 (iPhone, 4K HLG), del 0,6 al 3,9 s: camina por el deck frente al pabellón hacia las cubiertas; ventanales a la izquierda y barandas a la derecha, con las nubes.
    desde: 0.6,
    en: P.r4,
    dur: P.vista - P.r4,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El deck (se sale del ambiente al exterior): se camina frente al pabellón hacia las cubiertas, con el cielo y las nubes; prepara la vista del final.",
  },
  {
    id: "c10-vista",
    bloque: 5,
    tipo: "video",
    src: v("dr17"),
    // DR17 (dron, 4K SDR), del 20,0 al 24,1 s: el final del vuelo de interior a exterior: del patio con el jacuzzi sale por el deck sobre el valle, los pinos y la cordillera. Es el clímax y el plano más largo de su bloque.
    desde: 20,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "La vista (el clímax): el dron sale del patio por el deck sobre el valle, los pinos y la cordillera al fondo; lo que se ve desde el deck, la respuesta a «esta vista». El plano más largo del bloque.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c11-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct04"),
    audio: a("ct04-voz"),
    voz: {
      s0: 0.62,
      s1: 2.54,
      lufs: -15,
      dice: "Descubre los detalles de esta propiedad.",
    },
    // Isabella viene del fondo del deck, con el jacuzzi en primer plano y el pabellón de vidrio a la derecha. La voz va de 0,62 a 2,54 s (99 f de clip); 7 f de aire antes de su primera palabra.
    desde: fr(7),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "El deck con el jacuzzi (la invitación): Isabella dice «descubre los detalles de esta propiedad», una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  {
    id: "c12-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-088/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c11
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c12). */
export const DURACION_088 = P.cta + DUR_CTA + DUR_TARJETA;
