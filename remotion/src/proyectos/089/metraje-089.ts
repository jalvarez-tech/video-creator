/**
 * EL RECORRIDO 089 — «Casa El Retiro · Senderos de Compostela» (Propiedades Luxur), V70 del registro. ADAGIOS · guion 01: «Y si tu casa también te ayudara a bajar el ritmo» → ventanales, deck y patio interior que acercan la naturaleza.
 *
 * Es de la ESTRUCTURA «lo vendible antes del segundo 10» (`recorrido-luxur` §3, pedido del 2026-11-10; la primera pieza hecha así es la 079):
 *   1 la toma inicial (DR14, sin texto ni voz) · 2 el hook de Isabella (HK01) · 3 DOS planos rápidos (RC33 y RC38) ·
 *   4 la mitad (MD01) · 5 UN recorrido inmersivo (RC40 → RC29 → RC30 → RC36 → DR12; la vista, el plano más largo) · 6 el CTA (CT01) y la tarjeta oscura del cierre.
 * El guion es el 01 del rodaje del 2026-11-11 (HK01 · MD01 · CT01: Isabella Cadavid, blazer vino tinto) y la canción es «Pieza 2 (adagio)» (piano, adagio sin pulso (Sol menor) — Pieza 2 de «The Most Beautiful 12 Adagios in Rachmaninoff Style»).
 *
 * GENERADO por `proyectos/088/herramientas/montar-retiro.mjs 089` desde `proyectos/089/pieza.json`: los números de abajo (cada corte, en un golpe MEDIDO de la canción) se rehacen con él; lo que se escribe a mano es `pieza.json`.
 *
 * QUIÉN MARCA EL TIEMPO. La canción, entrando en el segundo 6.067 de su corte (el golpe de 9.7 dB, f3); la rejilla son los golpes MEDIDOS (`proyectos/089/musica/golpes-cancion-entera.json`, 277 en total)
 * y cada cambio de plano cae en uno de al menos 7 dB. Piano sin percusión: cada corte cae en el ataque de una nota medido (≥ 7 dB), no en un bombo; se entra en el segundo 6,07 de la pieza (el ataque de 9,7 dB, tras los 4-6 s de subida de la apertura).
 *
 * UNIDADES. `desde`, en SEGUNDOS de la fuente; `en` y `dur`, en frames de la composición. Planos CONTIGUOS. Las tres tomas de Isabella entran A CORTE en su golpe, con `desde` = su primera palabra − 12 f:
 * el golpe suena entero, la música baja con curva de coseno DESPUÉS y su bajada acaba 2 f antes de la primera palabra (regla del canal desde el 022).
 *
 * EL COLOR (R32): cada plano lleva su `color`; con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-089.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-089";

export const FPS_089 = 30;

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
 * «Pieza 2 (adagio)» — Pieza 2 del mix «The Most Beautiful 12 Adagios in Rachmaninoff Style» (3:26), cortada de la COPIA 1 del archivo del mix en 199,10-405,79 s (206,69 s); sin pulso: los «golpes» son los ataques de las notas del piano medidos con `medir-pista.py`. Se entra en el segundo 6.067 del corte (`proyectos/089/original/musica-adagio-pieza-2.wav`). Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms;
 * el instante es el de «empieza a subir»): `proyectos/089/musica/golpes-cancion-entera.json` (`medir-pista.py --json`). El reparto lo hizo `montar-retiro.mjs` (programación dinámica sobre esos golpes).
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 6.121, db: 9.7 },
  hook: { t: 9.285, db: 9.8 }, // f98
  rapido1: { t: 12.529, db: 7.1 }, // f195
  rapido2: { t: 14.33, db: 7.4 }, // f250
  mitad: { t: 16.384, db: 9.1 }, // f311
  r1: { t: 23.126, db: 11.2 }, // f513
  r2: { t: 26.144, db: 12.9 }, // f604
  r3: { t: 29.69, db: 8.3 }, // f710
  r4: { t: 32.83, db: 8.9 }, // f805
  vista: { t: 35.848, db: 11.7 }, // f895
  cta: { t: 40.402, db: 9.9 }, // f1032
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de su corte: el golpe de entrada (6.121 s) cae en el frame 3 de la pieza; redondeado a un frame (182/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 182 / FPS_089;

/** Lo que el audio del render llega TARDE respecto de su fuente: 42 ms (medido en el 016 y confirmado desde el 017). Se suma aquí y en la puerta para que el corte caiga en el frame en que el golpe SUENA. */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_089;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_089;

/** Isabella: un empuje lento hacia ella. Los recorridos y los exteriores, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-089/${id}.mp4`;
const a = (id: string): string => `recorrido-089/${id}.wav`;

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

/** Frames que dura la toma del CTA: voz de 0.69 a 1.95 s (clip de 87 f, `desde` 9 f); 16 f de su cara tras la última palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela. */
const DUR_CTA = 66;

/** Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero aquí, 2 f antes del final de la pieza (la tarjeta va en silencio). */
export const FIN_MUSICA_089 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje089: readonly Corte[] = [
  // ── Bloque 1 · la casa pegada a las cubiertas ──
  {
    id: "c01-exterior",
    bloque: 1,
    tipo: "video",
    src: v("dr14"),
    // DR14 (dron, 4K SDR), del 0,2 al 3,1 s: pegado a las cubiertas de las habitaciones, el dron retrocede y sube despacio hasta el plano general de la casa en la ladera.
    desde: 0.2,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1 }),
    reason:
      "Las cubiertas a dos aguas y la casa que se abre sobre su ladera (la promesa): el dron retrocede y sube despacio, sin prisa. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de bajar el ritmo.",
  },
  // ── Bloque 2 · el hook (con él entra la ficha en la versión de ficha) ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk01"),
    audio: a("hk01-voz"),
    voz: {
      s0: 0.77,
      s1: 2.86,
      lufs: -15,
      dice: "Y si tu casa también te ayudara a bajar el ritmo.",
    },
    // Isabella camina hacia cámara por el deck, con la hilera de cubiertas a dos aguas al fondo. La voz va de 0,77 a 2,86 s (110 f de clip); 11 f de aire antes de su primera palabra.
    desde: fr(11),
    en: P.hook,
    dur: P.rapido1 - P.hook,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "El deck con las cubiertas al fondo (la promesa dicha): Isabella camina hacia cámara y pregunta «¿y si tu casa también te ayudara a bajar el ritmo?». Entra a corte en una nota del piano tras la casa vista desde arriba.",
  },
  // ── Bloque 3 · DOS planos rápidos: lo más vistoso, antes del segundo 10 ──
  {
    id: "c03-ventanal",
    bloque: 3,
    tipo: "video",
    src: v("rc33"),
    // RC33 (iPhone, 4K HLG), del 5,6 al 7,8 s: la sala del pabellón, el techo de madera y los ventanales de piso a techo con las montañas; paneo lento hacia la vista abierta.
    desde: 5.6,
    en: P.rapido1,
    dur: P.rapido2 - P.rapido1,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "Los ventanales con las montañas al fondo (lo más vistoso, antes del segundo 10): la sala vacía abierta al paisaje. Primer plano rápido: quien solo mira diez segundos ya ha visto la luz y el verde que entran a la casa.",
  },
  {
    id: "c04-carrizos",
    bloque: 3,
    tipo: "video",
    src: v("rc38"),
    // RC38 (iPhone, 4K HLG), del 0,6 al 2,9 s: los carrizos y los arbustos del jardín del patio frente al muro de cristal, con las montañas y las nubes detrás.
    desde: 0.6,
    en: P.rapido2,
    dur: P.mitad - P.rapido2,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1 }),
    reason:
      "Los carrizos y el cielo a través del cristal (la naturaleza pegada a la casa): segundo plano rápido, con él se cumplen los diez segundos y vuelve Isabella.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c05-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md01"),
    audio: a("md01-voz"),
    voz: {
      s0: 0.57,
      s1: 6.54,
      lufs: -15,
      dice: "Los grandes ventanales, el deck panorámico y el patio interior acercan la naturaleza a cada momento del día.",
    },
    // Isabella camina hacia cámara por la sala de ventanales de piso a techo y techo de madera. La voz va de 0,57 a 6,54 s (216 f de clip); 5 f de aire antes de su primera palabra.
    desde: fr(5),
    en: P.mitad,
    dur: P.r1 - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "La sala de ventanales (el valor dicho): Isabella camina hacia cámara bajo el techo de madera y dice «los grandes ventanales, el deck panorámico y el patio interior acercan la naturaleza a cada momento del día». Entra a corte antes de los 11 s.",
  },
  // ── Bloque 5 · el recorrido inmersivo ──
  {
    id: "c06-pasillo",
    bloque: 5,
    tipo: "video",
    src: v("rc40"),
    // RC40 (iPhone, 4K HLG), del 3,0 al 6,4 s: el corredor largo de techo de madera, con el muro de cristal y los carrizos a un lado, que avanza despacio hasta el fondo.
    desde: 3,
    en: P.r1,
    dur: P.r2 - P.r1,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1 }),
    reason:
      "El pasillo acristalado (el umbral): se avanza sin prisa por un corredor de madera con el jardín de carrizos al lado; abre el paseo en calma, con el verde pegado a la casa.",
  },
  {
    id: "c07-sala",
    bloque: 5,
    tipo: "video",
    src: v("rc29"),
    // RC29 (iPhone, 4K HLG), del 1,0 al 4,4 s: el pabellón vacío con los ventanales de piso a techo y las montañas; paneo hacia la puerta corrediza.
    desde: 1,
    en: P.r2,
    dur: P.r3 - P.r2,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "La sala (la luz): los ventanales de piso a techo y las montañas al fondo; sigue al pasillo, en el orden en que se camina la casa.",
  },
  {
    id: "c08-deck",
    bloque: 5,
    tipo: "video",
    src: v("rc30"),
    // RC30 (iPhone, 4K HLG), del 0,4 al 3,8 s: desde el deck, bajo el alero, avanza hacia la puerta corrediza abierta; la sala y la cocina al fondo, el sol sobre la madera.
    desde: 0.4,
    en: P.r3,
    dur: P.r4 - P.r3,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El deck (la sala se abre al exterior): se sale al deck bajo el alero y se mira hacia adentro por la puerta abierta; prepara el patio y la vista.",
  },
  {
    id: "c09-patio",
    bloque: 5,
    tipo: "video",
    src: v("rc36"),
    // RC36 (iPhone, 4K HLG), del 0,2 al 3,5 s: el jacuzzi del patio, casi fijo, con el pabellón de vidrio a un lado y las nubes y las montañas al fondo.
    desde: 0.2,
    en: P.r4,
    dur: P.vista - P.r4,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El patio interior con el jacuzzi (el reposo): casi quieto, con el cielo y las montañas al fondo; es el «patio interior» de la frase, en su sitio del paseo.",
  },
  {
    id: "c10-vista",
    bloque: 5,
    tipo: "video",
    src: v("dr12"),
    // DR12 (dron, 4K SDR), del 14,0 al 18,5 s: sobre el deck de las habitaciones, abre el plano hasta el general con el pabellón y las cubiertas sobre la ladera. Es el clímax y el plano más largo de su bloque.
    desde: 14,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.12, highlights: -0.3 }),
    reason:
      "La casa entera sobre su ladera (la vista, el clímax): el dron abre el plano hasta ver el pabellón y las cubiertas en el paisaje; el plano más largo del bloque, donde el ritmo baja del todo.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c11-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct01"),
    audio: a("ct01-voz"),
    voz: {
      s0: 0.69,
      s1: 1.95,
      lufs: -15,
      dice: "Conoce cómo se vive aquí.",
    },
    // Isabella, en plano medio, ríe y se acerca, con el deck, las montañas y las nubes detrás. La voz va de 0,69 a 1,95 s (87 f de clip); 9 f de aire antes de su primera palabra.
    desde: fr(9),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04, exposure: -0.1 }),
    reason:
      "El deck con las montañas y las nubes (la invitación): Isabella ríe y dice «conoce cómo se vive aquí», una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  {
    id: "c12-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-089/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c11
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c12). */
export const DURACION_089 = P.cta + DUR_CTA + DUR_TARJETA;
