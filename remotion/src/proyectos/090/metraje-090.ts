/**
 * EL RECORRIDO 090 — «Casa El Retiro · Senderos de Compostela» (Propiedades Luxur), V71 del registro. JAZZ · guion 03: «Tu momento favorito del día puede estar en casa» → desconectar: el jacuzzi en un patio abierto al cielo y la terraza con vistas a las montañas.
 *
 * Es de la ESTRUCTURA «lo vendible antes del segundo 10» (`recorrido-luxur` §3, pedido del 2026-11-10; la primera pieza hecha así es la 079):
 *   1 la toma inicial (DR05, sin texto ni voz) · 2 el hook de Isabella (HK03) · 3 DOS planos rápidos (DR06 y RC35) ·
 *   4 la mitad (MD03) · 5 UN recorrido inmersivo (RC41 → RC04 → RC38 → RC31 → RC37; la vista, el plano más largo) · 6 el CTA (CT03) y la tarjeta oscura del cierre.
 * El guion es el 03 del rodaje del 2026-11-11 (HK03 · MD03 · CT03: Isabella Cadavid, blazer vino tinto) y la canción es «Midnight Library» (jazz, balada lenta (≈ 63 BPM, Sol menor) — pista 1 de «elegant jazz tones»).
 *
 * GENERADO por `proyectos/088/herramientas/montar-retiro.mjs 090` desde `proyectos/090/pieza.json`: los números de abajo (cada corte, en un golpe MEDIDO de la canción) se rehacen con él; lo que se escribe a mano es `pieza.json`.
 *
 * QUIÉN MARCA EL TIEMPO. La canción, entrando en el segundo 61.867 de su corte (el golpe de 21.3 dB, f3); la rejilla son los golpes MEDIDOS (`proyectos/090/musica/golpes-cancion-entera.json`, 127 en total)
 * y cada cambio de plano cae en uno de al menos 8 dB. Entrada de 45 s del catálogo (★★★): el golpe de 21,3 dB de los 61,90 s de la pista cae en el f3 (el catálogo da 61,55 s, 0,35 s antes, como `desde`).
 *
 * UNIDADES. `desde`, en SEGUNDOS de la fuente; `en` y `dur`, en frames de la composición. Planos CONTIGUOS. Las tres tomas de Isabella entran A CORTE en su golpe, con `desde` = su primera palabra − 12 f:
 * el golpe suena entero, la música baja con curva de coseno DESPUÉS y su bajada acaba 2 f antes de la primera palabra (regla del canal desde el 022).
 *
 * EL COLOR (R32): cada plano lleva su `color`; con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-090.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-090";

export const FPS_090 = 30;

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
 * «Midnight Library» — pista 1 «Midnight Library» (2:25) del mix «elegant jazz tones», cortada del archivo del mix en 0-145 s (los límites de las pistas del jazz son las marcas de su lista con ±5 s); las entradas a mitad de pista no dependen de eso. Se entra en el segundo 61.867 del corte (`proyectos/090/original/musica-midnight-library.wav`). Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms;
 * el instante es el de «empieza a subir»): `proyectos/090/musica/golpes-cancion-entera.json` (`medir-pista.py --json`). El reparto lo hizo `montar-retiro.mjs` (programación dinámica sobre esos golpes).
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 61.901, db: 21.3 },
  hook: { t: 65.093, db: 10.2 }, // f98
  rapido1: { t: 68.333, db: 8.4 }, // f196
  rapido2: { t: 70.622, db: 9.2 }, // f264
  mitad: { t: 72.553, db: 12.2 }, // f322
  r1: { t: 82.291, db: 11 }, // f614
  r2: { t: 85.557, db: 9.7 }, // f712
  r3: { t: 88.769, db: 21.8 }, // f809
  r4: { t: 91.74, db: 22.2 }, // f898
  vista: { t: 94.669, db: 13.4 }, // f986
  cta: { t: 98.57, db: 19.7 }, // f1103
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de su corte: el golpe de entrada (61.901 s) cae en el frame 3 de la pieza; redondeado a un frame (1856/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 1856 / FPS_090;

/** Lo que el audio del render llega TARDE respecto de su fuente: 42 ms (medido en el 016 y confirmado desde el 017). Se suma aquí y en la puerta para que el corte caiga en el frame en que el golpe SUENA. */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_090;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_090;

/** Isabella: un empuje lento hacia ella. Los recorridos y los exteriores, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-090/${id}.mp4`;
const a = (id: string): string => `recorrido-090/${id}.wav`;

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

/** Frames que dura la toma del CTA: voz de 0.68 a 2.16 s (clip de 91 f, `desde` 8 f); 16 f de su cara tras la última palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela. */
const DUR_CTA = 73;

/** Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero aquí, 2 f antes del final de la pieza (la tarjeta va en silencio). */
export const FIN_MUSICA_090 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje090: readonly Corte[] = [
  // ── Bloque 1 · la casa que se acerca ──
  {
    id: "c01-exterior",
    bloque: 1,
    tipo: "video",
    src: v("dr05"),
    // DR05 (dron, 4K SDR), del 5,4 al 8,4 s: aproximación desde el plano general hasta la casa y su patio central con el jacuzzi, sobre la ladera.
    desde: 5.4,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "La casa que se acerca sobre su ladera, hasta el patio central (la promesa): el dron avanza despacio hacia el jacuzzi. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de un momento favorito en casa.",
  },
  // ── Bloque 2 · el hook (con él entra la ficha en la versión de ficha) ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk03"),
    audio: a("hk03-voz"),
    voz: {
      s0: 0.76,
      s1: 3.21,
      lufs: -15,
      dice: "Tu momento favorito del día puede estar en casa.",
    },
    // Isabella camina hacia cámara por la cocina (la isla, los muebles arena y madera, el techo de madera) y se detiene. La voz va de 0,76 a 3,21 s (123 f de clip); 11 f de aire antes de su primera palabra.
    desde: fr(11),
    en: P.hook,
    dur: P.rapido1 - P.hook,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "La cocina (el momento favorito del día, el café): Isabella camina hacia cámara y dice «tu momento favorito del día puede estar en casa». Entra a corte en un golpe de la canción tras la casa vista desde el aire.",
  },
  // ── Bloque 3 · DOS planos rápidos: lo más vistoso, antes del segundo 10 ──
  {
    id: "c03-patio",
    bloque: 3,
    tipo: "video",
    src: v("dr06"),
    // DR06 (dron, 4K SDR), del 1,0 al 3,2 s: casi cenital sobre el patio central: el jacuzzi empotrado en la piedra clara, rodeado de cubiertas negras y del deck.
    desde: 1,
    en: P.rapido1,
    dur: P.rapido2 - P.rapido1,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El patio abierto al cielo visto desde arriba, con el jacuzzi en el centro (lo más vistoso, antes del segundo 10): lo que dirá la mitad. Primer plano rápido: quien solo mira diez segundos ya ha visto dónde se desconecta.",
  },
  {
    id: "c04-terraza",
    bloque: 3,
    tipo: "video",
    src: v("rc35"),
    // RC35 (iPhone, 4K HLG), del 0,8 al 3,0 s: el jacuzzi con la baranda y las montañas al fondo; pasa una columna negra de la estructura por la izquierda.
    desde: 0.8,
    en: P.rapido2,
    dur: P.mitad - P.rapido2,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El jacuzzi con la baranda y las montañas detrás (la terraza con vistas): segundo plano rápido, con él se cumplen los diez segundos y vuelve Isabella.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c05-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md03"),
    audio: a("md03-voz"),
    voz: {
      s0: 0.49,
      s1: 8.8,
      lufs: -15,
      dice: "Un jacuzzi en un patio abierto al cielo y una terraza con vistas panorámicas a las montañas. Combinan dos espacios perfectos para desconectarte.",
    },
    // Isabella empieza lejos en la sala-cocina en gran plano, se acerca y sale de cuadro por la derecha. La voz va de 0,49 a 8,80 s (321 f de clip); 3 f de aire antes de su primera palabra. La imagen NO es el jacuzzi que nombra su voz (catálogo): los dos planos rápidos de antes ya lo han enseñado.
    desde: fr(3),
    en: P.mitad,
    dur: P.r1 - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04, exposure: 0.1 }),
    reason:
      "La sala-cocina en gran plano (el ambiente que se deja atrás para desconectar): Isabella se acerca y dice «un jacuzzi en un patio abierto al cielo y una terraza con vistas panorámicas a las montañas; combinan dos espacios perfectos para desconectarte». Los dos planos rápidos anteriores ya enseñaron el jacuzzi. Entra a corte antes de los 11 s.",
  },
  // ── Bloque 5 · el recorrido inmersivo ──
  {
    id: "c06-habitacion",
    bloque: 5,
    tipo: "video",
    src: v("rc41"),
    // RC41 (iPhone, 4K HLG), del 0,3 al 3,5 s: una habitación de muro de concreto y techo a dos aguas con luz indirecta, con la puerta corrediza al fondo; arranca junto a un cristal con carrizos y avanza.
    desde: 0.3,
    en: P.r1,
    dur: P.r2 - P.r1,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "La habitación (el descanso): muro de concreto, techo a dos aguas y luz indirecta; sigue a la sala y es el primer espacio donde se baja el ritmo.",
  },
  {
    id: "c07-bano",
    bloque: 5,
    tipo: "video",
    src: v("rc04"),
    // RC04 (iPhone, 4K HLG), del 2,4 al 5,6 s: el baño de la habitación, con el mueble flotante, el lavamanos de sobreponer y los espejos colgantes; el paneo llega a la ducha de vidrio con su nicho de luz cálida. Sustituye a RC42 (el pasillo), por pedido del usuario el 2026-11-12: «cambia la toma que sigue después del 0:23 (IMG_5166.MOV)».
    desde: 2.4,
    en: P.r2,
    dur: P.r3 - P.r2,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El baño (el ritual del día): del mueble de madera y los espejos a la ducha de vidrio con su luz cálida; sigue a la habitación del descanso y es lo que hace del «momento favorito del día» algo cotidiano, antes de salir al jardín del patio.",
  },
  {
    id: "c08-jardin",
    bloque: 5,
    tipo: "video",
    src: v("rc38"),
    // RC38 (iPhone, 4K HLG), del 1,0 al 4,2 s: los carrizos y los arbustos del jardín del patio frente al muro de cristal, con las montañas y las nubes detrás; avance lateral.
    desde: 1,
    en: P.r3,
    dur: P.r4 - P.r3,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.12 }),
    reason:
      "El jardín del patio (la naturaleza pegada al jacuzzi): carrizos y arbustos frente al cristal, con las montañas detrás; calma antes del deck.",
  },
  {
    id: "c09-deck",
    bloque: 5,
    tipo: "video",
    src: v("rc31"),
    // RC31 (iPhone, 4K HLG), del 4,0 al 7,0 s: camina por el deck frente al pabellón hacia las cubiertas; los ventanales a la izquierda y las barandas a la derecha, con las nubes.
    desde: 4,
    en: P.r4,
    dur: P.vista - P.r4,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El deck (se sale a la terraza): se camina frente al pabellón con el cielo y las nubes; prepara la vista del final.",
  },
  {
    id: "c10-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc37"),
    // RC37 (iPhone, 4K HLG), del 2,2 al 6,4 s: el jacuzzi y el pabellón de cristal con su cubierta inclinada; paneo a la izquierda hacia la baranda, el cielo y las montañas. Es el clímax y el plano más largo de su bloque.
    desde: 2.2,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El jacuzzi y, tras él, la baranda, el cielo y las montañas (la vista, el clímax): el paneo lleva del patio a la terraza con vistas panorámicas, justo lo que dijo la mitad. El plano más largo del bloque.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c11-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct03"),
    audio: a("ct03-voz"),
    voz: {
      s0: 0.68,
      s1: 2.16,
      lufs: -15,
      dice: "Conoce la experiencia completa.",
    },
    // Isabella viene desde lejos por el deck, visto desde dentro por la puerta corrediza abierta. La voz va de 0,68 a 2,16 s (91 f de clip); 8 f de aire antes de su primera palabra.
    desde: fr(8),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "El deck visto desde dentro por la puerta abierta (la invitación): Isabella dice «conoce la experiencia completa», una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  {
    id: "c12-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-090/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c11
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c12). */
export const DURACION_090 = P.cta + DUR_CTA + DUR_TARJETA;
