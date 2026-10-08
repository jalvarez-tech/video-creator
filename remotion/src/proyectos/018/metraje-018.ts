/**
 * EL RECORRIDO 018 — «Los Patios · apto 501», SEGUNDA VERSIÓN — los planos, como DATOS.
 *
 * El 017 fue la primera (paradoja → qué te llevas → invitación, con «Time» de Hans Zimmer y el
 * paseo de la puerta a la terraza). Esta cambia las cuatro cosas que cambian el reel entero:
 * OTRO HOOK (HK07), OTRA MITAD (MD07), OTRO CTA (CT01) y OTRA CANCIÓN («Return to Oasis»,
 * Aleksey Chistilin). Y como el hook ya no está en el interior, el paseo va en el SENTIDO II del
 * catálogo (terraza → ventanal) y no en el I (puerta → terraza): ver `catalogo-material.md` §10.3.
 *
 * LA IDEA: «el lujo es espacio y cómo entra el exterior» (ángulos B y E del catálogo, mezclados:
 * ambos son la relación del interior con el exterior).
 *
 *   hook   HK07  PATIO     «El verdadero lujo puede ser simplemente tener espacio para respirar.»
 *   mitad  MD07  TERRAZA   «La respuesta no siempre está en los metros, a veces está en cómo entra el exterior.»
 *   CTA    CT01  BALCON    «Si buscas algo diferente en un apartamento convencional, escríbeme y conoce Los Patios.»
 *
 * Tres sitios distintos y ninguna cifra (la regla del catálogo es «una sola cifra, y nunca en los bloques
 * 5 y 6»): el precio y los 317 m² no entran. Las tres tomas están limpias en el catálogo, salvo el «a/en» de
 * CT01 (ver `subtitulos-018.ts`).
 *
 *   bloque 1  c01                      el edificio desde el aire, SIN TEXTO NI VOZ (el frame 0 es la miniatura limpia)
 *   bloque 2  c02                      Isabella en el patio: el hook (entra opaca en un pulso y habla un frame después)
 *   bloque 3  c03 c04 c05              el patio y el deck: la piscina, el muro de listones, la columna y el skyline
 *   bloque 4  c06                      Isabella en la terraza: la mitad
 *   bloque 5  c07 c08 c09 c10 c11      de la terraza al interior y al ventanal: el umbral, el espacio abierto, el muro de
 *                                      bloques de vidrio, la fachada vista desde el suelo, y la vista de esquina (el plano más largo)
 *   bloque 6  c12 c13                  Isabella en el balcón: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA. «Return to Oasis» va a 110 BPM exactos (0,5454 s por pulso; el pulso
 * 0 es su golpe más fuerte, en el segundo 143,005 de la canción) con una meseta estable de 37 s y, al
 * pulso 68, una CAÍDA a un piano suelto que se queda como lecho: es donde entra el CTA. Los golpes de
 * esta canción no son de frase, como los de «Time»: es una textura de arpegio con pulso constante, así
 * que la rejilla es la del PULSO (una recta, comprobada contra 22 golpes medidos: 12 ms de desvío medio)
 * y los cortes grandes caen en los golpes más fuertes (n 13, 17, 25, 46, 51, 58…). Todos los `en` salen de
 * `pulso(n)`: mover la entrada de la música o el tempo es cambiar las constantes de la rejilla.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(28)` = 28/30 s) para que
 * imagen y voz corten en la MISMA muestra; `en` y `dur`, en frames de la composición. Los planos son
 * CONTIGUOS: cada `en` es el fin del anterior.
 *
 * TRANSICIONES. Corte seco entre planos de recorrido (la cámara ya se mueve) y disolvencia de 12 f al entrar y
 * al salir de Isabella (cambia el registro, no el sitio). Nada más.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal): Isabella no habla hasta que su imagen es
 * opaca, en el pulso 4, y empieza un frame después.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su
 * toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la prueba se hace a
 * escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-018.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-018";

export const FPS_018 = 30;

export type Entrada = "corte" | "disolver";
export type Bloque = 1 | 2 | 3 | 4 | 5 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. `s0`/`s1` medidos con `limites-voz.py` sobre el WAV crudo; `lufs`, con ebur128 sobre el WAV TRATADO que suena (ver `OBJETIVO_LUFS`). */
export interface VozDelCorte {
  /** Segundo de la fuente en que empieza a hablar. */
  s0: number;
  /** Segundo de la fuente en que termina de hablar. */
  s1: number;
  /** Sonoridad integrada de la voz TRATADA (LUFS) en esa ventana. */
  lufs: number;
  /** Lo que dice, tal como está en el guion. Solo para leer el plan. */
  dice: string;
}

export interface Corte extends CorteDelFormato<Entrada> {
  /** `foto` solo para la tarjeta oscura del cierre (`c13-cierre`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella cuya voz entra con su imagen: el WAV de su voz, TRATADO (`<toma>-voz.wav`: ver `OBJETIVO_LUFS`). */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (REV. 4, pedido del usuario sobre la final ya exportada, 2026-10-08: «necesito que la voz cuando habla
 * Isabella tenga más decibeles sin saturar»; hasta la rev. 3 la voz iba a −21, el objetivo del 017, y sonaba ≈ 6 dB por debajo del paseo). Con ganancia sola
 * no se puede: las tres tomas crudas miden −18,7 (HK07), −19,3 (MD07) y −22,1 LUFS (CT01) con picos de −1,2, −1,4 y −4,3 dBTP, y llevarlas a −15 daría
 * +2,5, +2,9 y +2,8 dBTP (saturan). Suena la voz TRATADA (`<toma>-voz.wav`: graves, puerta suave, compresión 3:1, +14,0 · +14,4 · +15,3 dB y limitador a −2,5 dBFS, en
 * `proyectos/018/normalizar.mjs`), que ya llega a −15,0 LUFS con el pico real en −2,5 dBTP en las tres: la ganancia del plan queda en 0 dB. Excepción a R29
 * («una ganancia por toma y nada más»), por encargo, declarada aquí y en la puerta (sección 3: pico real ≤ −1 dBTP con su ganancia). `s0` y `s1`
 * salen del WAV crudo (`limites-voz.py`): el tratado no se desfasa (2-3 muestras).
 */
export const OBJETIVO_LUFS = -15;

/* ── La rejilla de la música ────────────────────────────────────────────────
 *
 * «Return to Oasis» — Aleksey Chistilin, `Music/Aleksey Chistilin - Return to Oasis.mp3`, Re# menor, 110 BPM,
 * piano, pads y arpegio. Medida sobre el audio decodificado (banda 80-3000 Hz, subida de 6 ms): el pulso es
 * 0,5454 s (110,01 BPM, ajustado con una peineta sobre la envolvente de 141 a 190 s) y los golpes de ≥ 9 dB
 * caen a 12 ms de media de esa recta (22 golpes, sin deriva): una recta basta, no hace falta anclar cada frase.
 * El pulso 0 es el golpe más fuerte de la ventana (143,005 s, 12 dB); la meseta (−8,5 LUFS) dura hasta el
 * 180,09 s —el pulso 68— y ahí la canción cae 12 LU a un piano suelto (−20,5 LUFS) que sigue de lecho.
 */
const T_PULSO = 0.5454;

/** El segundo de la CANCIÓN en que cae el pulso 0 (su golpe de entrada). */
const GOLPE_DE_ENTRADA = 143.005;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: 38 ms antes del golpe de entrada (el colchón de
 * `entra: 1` en audio-018.ts), redondeado a un frame (4289/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 4289 / FPS_018;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre
 * la prueba 720p y el WAV (y confirmado en el 017). Se suma aquí y en la puerta para que el corte caiga en el
 * frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El instante de la CANCIÓN (s) del pulso `n`: 0 es el golpe de entrada y 68 la caída al piano. */
export const instanteDelPulso = (n: number): number => GOLPE_DE_ENTRADA + n * T_PULSO;

/** El frame del vídeo en que SUENA el pulso `n` (sin redondear). */
export const pulsoExacto = (n: number): number => (instanteDelPulso(n) + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_018;

/** El frame entero del vídeo en que suena el pulso `n`. */
export const pulso = (n: number): number => Math.round(pulsoExacto(n));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_018;

/** Isabella: un empuje lento hacia ella. El recorrido, quieto: la cámara ya avanza. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-018/${id}.mp4`;
const a = (id: string): string => `recorrido-018/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE de Luxur, la del 017 (revisión 7 de aquel): contraste con cuerpo, negros hundidos, luces recogidas, un
 * punto cálido y +10 % de saturación. Orden del efecto: exposición → balance de blancos → sombras/luces/blancos/
 * negros → contraste → saturación → vibrance. `vibrance` ≤ 0,05 (sobre hormigón gris pinta un moteado de colores y
 * vuelve rosadas las nubes) y las tomas de Isabella, `saturation` ≤ 1,06: la piel se queda donde estaba.
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

/** El color de un plano: la base más el ajuste de su toma (medido, `medir-color.py`). */
const color = (ajuste: ColorCine = {}): ColorCine => ({ ...COLOR_BASE, ...ajuste });

/**
 * El pulso de cada cambio de plano (la rejilla de arriba) y los frames que resultan. Los grandes caen en los golpes
 * más fuertes de la canción (13, 17, 25, 46, 51, 58, 61 y 68, la caída); el resto, en un pulso. Todos los cortes
 * SECOS caen en un golpe medido de la canción (≥ 7,5 dB): se comprobó sobre el audio del render, y el único que no
 * tenía golpe (el del 62, donde la canción subdivide en cuatro los tres pulsos entre dos golpes fuertes) se movió al 61.
 */
const N = {
  hook: 4, //            Isabella ya es opaca; la voz, un frame después
  recorrido: 13, //      golpe fuerte (9,2 dB): entra el patio
  giro: 17, //           golpe fuerte (10,2 dB)
  techo: 25, //          golpe fuerte (11,2 dB)
  mitad: 29, //          golpe (9,1 dB): entra Isabella en la terraza
  umbral: 39, //         acaba la mitad: la cámara cruza de la terraza al interior
  pasillo: 45,
  sala: 50, //           (golpe fuerte en el 51)
  fachada: 56, //       (golpe fuerte en el 58)
  vista: 61, //          golpe fuerte (11,8 dB): entra la vista de esquina, el plano más largo del bloque (114 f)
  cta: 68, //            la CAÍDA al piano: entra el CTA
} as const;
const P = {
  hook: pulso(N.hook), //           68
  recorrido: pulso(N.recorrido), // 215
  giro: pulso(N.giro),
  techo: pulso(N.techo),
  mitad: pulso(N.mitad),
  umbral: pulso(N.umbral),
  pasillo: pulso(N.pasillo),
  sala: pulso(N.sala),
  fachada: pulso(N.fachada),
  vista: pulso(N.vista),
  cta: pulso(N.cta), //             1115 · la caída al piano
} as const;

/**
 * Frames que dura la toma del CTA (CT01): su voz acaba a los 4,49 s del plano; con 150 f queda medio segundo de su
 * cara tras la última palabra antes de que la imagen funda a negro (y 5,83 s del clip de 6,07). Nada se congela.
 */
const DUR_CTA = 150;

/**
 * Dónde acaba la música (frame de la comp). A diferencia de «Time», esta canción NO vuelve a pegar fuerte tras su
 * resolución: el piano sigue de lecho bajo el CTA y bajo la tarjeta, y se apaga en la propia tarjeta. Acaba 2 f
 * antes del final de la pieza (con la cola de `audio-018.ts`, que la lleva a cero).
 */
export const FIN_MUSICA_018 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje018: readonly Corte[] = [
  // ── Bloque 1 · la casa ──
  {
    id: "c01-dron",
    bloque: 1,
    tipo: "video",
    src: v("dr155"),
    desde: fr(120),
    en: 0,
    dur: P.hook,
    zoom: [1.0, 1.05],
    entra: "corte",
    color: color({ exposure: -0.05, highlights: -0.4, whites: -0.12, shadows: 0.22, blacks: -0.02, saturation: 1.02 }),
    reason:
      "Fachada (la promesa): los jardines colgantes del edificio vistos de cerca desde el aire, con el pilar de ladrillo y los techos de madera, sube despacio con el golpe de apertura de la música. Es otro plano que el del 017: aquí es verde y madera, no el árbol. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia. Entra a corte: no nace de negro.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk07"),
    audio: a("hk07-voz"),
    voz: {
      s0: 0.95,
      s1: 5.11,
      lufs: -15,
      dice: "El verdadero lujo puede ser simplemente tener espacio para respirar.",
    },
    // La voz empieza a los 0,95 s de su clip: `desde` es el frame anterior (28 = 0,933 s) para que su imagen sea
    // opaca en el pulso 4 y la primera palabra suene un frame después. Le quedan 0,53 s de clip por delante para la
    // disolvencia (pide 12 f = 0,4 s).
    desde: fr(28),
    en: P.hook,
    dur: P.recorrido - P.hook,
    zoom: [1.02, 1.14],
    entra: "disolver",
    color: color({ exposure: 0.12, shadows: 0.16, saturation: 1.02 }),
    reason:
      "Patio (la idea): Isabella, una figura pequeña y quieta frente al muro de listones con la palma y la piscina, dice «el verdadero lujo puede ser simplemente tener espacio para respirar» desde que su imagen es opaca; el dron ha salido limpio antes de que hable. Disuelve porque cambia el registro, no el sitio; el empuje 1,02→1,14 la acerca porque a esta distancia la voz necesita cara.",
  },
  // ── Bloque 3 · el patio y el deck (el hook sigue en el sitio donde ella habla) ──
  {
    id: "c03-patio",
    bloque: 3,
    tipo: "video",
    src: v("rc11"),
    // 0,4 s: lo que pide la disolvencia de entrada (12 f de clip por delante). Del 0,4 al 2,6 s: la piscina pequeña,
    // el muro de listones y la palma, el MISMO encuadre del patio en que ella acaba de hablar.
    desde: fr(12),
    en: P.recorrido,
    dur: P.giro - P.recorrido,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.16, shadows: 0.28, blacks: 0, highlights: -0.4, whites: -0.12, saturation: 1.04, temperature: 0 }),
    reason:
      "Patio (la continuidad): del plano fijo de Isabella a la cámara moviéndose por el mismo patio —la piscina, el muro de listones, la palma—; entra con el golpe fuerte de la música y enseña lo que ella nombra: el espacio para respirar.",
  },
  {
    id: "c04-giro",
    bloque: 3,
    tipo: "video",
    src: v("rc10"),
    desde: fr(120),
    en: P.giro,
    dur: P.techo - P.giro,
    zoom: QUIETO,
    entra: "corte",
    color: color({ highlights: -0.28, saturation: 1.02, temperature: -0.02 }),
    reason:
      "Patio (el giro): el deck frente al muro de ladrillo gira a la derecha y descubre la piscina con sus escalones, el muro de listones con la palma y, al final, la columna que pasa; es el plano largo del bloque y la cámara ya avanza hacia la terraza.",
  },
  {
    id: "c05-techo",
    bloque: 3,
    tipo: "video",
    src: v("rc11"),
    // Del 7,0 al 9,2 s de RC11: el techo de madera, la columna y el skyline con el cielo. No toca el tramo de `c03`.
    desde: fr(210),
    en: P.techo,
    dur: P.mitad - P.techo,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.05, shadows: 0.24, saturation: 1.03 }),
    reason:
      "Deck (el puente): bajo el techo de madera, la columna y el skyline de Medellín con su cielo; el exterior ENTRA en el encuadre, que es justo lo que dice la mitad, y lleva a la terraza donde espera Isabella.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md07"),
    audio: a("md07-voz"),
    voz: {
      s0: 0.7,
      s1: 5.56,
      lufs: -15,
      dice: "La respuesta no siempre está en los metros, a veces está en cómo entra el exterior.",
    },
    // La voz empieza a los 0,70 s: `desde` es 2 f antes (19 = 0,633 s) y no 1: el clip dura 6,10 s y con la
    // disolvencia de salida (12 f) la toma necesita 164 f; así le caben justo (la puerta lo mide).
    desde: fr(19),
    en: P.mitad,
    dur: P.umbral - P.mitad,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ exposure: 0.15, shadows: 0.2, saturation: 1.03 }),
    reason:
      "Terraza (la respuesta): Isabella camina hacia la cámara por el deck, con la columna, el muro de listones y la vegetación detrás, y dice que la respuesta no está en los metros sino en cómo entra el exterior; es lo que acaba de enseñar el patio, hecho frase. Es la toma más rápida (3,3 palabras por segundo).",
  },
  // ── Bloque 5 · de la terraza al interior y al ventanal ──
  {
    id: "c07-umbral",
    bloque: 5,
    tipo: "video",
    src: v("rc06"),
    // Del 0,4 al 3,7 s (con 0,4 s por delante para disolver): el deck, el muro con su abertura y el umbral que se cruza.
    desde: fr(12),
    en: P.umbral,
    dur: P.pasillo - P.umbral,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ temperature: 0 }),
    reason:
      "Umbral (la frontera que desaparece): de la terraza donde acaba de hablar ella, la cámara cruza el umbral y pasa del deck de madera al concreto del interior sin cortar; es el exterior entrando, y abre el paseo hacia el ventanal.",
  },
  {
    id: "c08-pasillo",
    bloque: 5,
    tipo: "video",
    src: v("rc05"),
    desde: fr(96),
    en: P.pasillo,
    dur: P.sala - P.pasillo,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.08, saturation: 1.12 }),
    reason:
      "Espacio abierto (avanzar): el muro de ladrillo a un lado y los ventanales al fondo; la cámara avanza hacia la luz y las columnas pasan, con la corredera de la terraza detrás: se sigue sintiendo el exterior desde dentro.",
  },
  {
    id: "c09-bloques",
    bloque: 5,
    tipo: "video",
    src: v("rc03"),
    desde: fr(132),
    en: P.sala,
    dur: P.fachada - P.sala,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "Sala (el detalle): el giro a la izquierda descubre el muro de bloques de vidrio con la luz atravesándolo, la firma del interior; la luz es otra manera en que entra el exterior.",
  },
  {
    id: "c10-fachada",
    bloque: 5,
    tipo: "video",
    src: v("rc25"),
    // Del 0,0 al 2,7 s de RC25 («Exterior edificio4»): el contrapicado extremo de la fachada, con el cielo y las nubes, y la
    // cámara que baja hasta las palmas. Entra a corte (no hace falta clip por delante). Rev. 2: sustituye al cielo sobre el
    // valle (RC04, 0-2,7 s) que había aquí en la rev. 1. Comparte ≈ 1,5 s con el `c03-fachada` de la V1 (1,2-3,1 s): la puerta lo informa.
    desde: fr(0),
    en: P.fachada,
    dur: P.vista - P.fachada,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.28, highlights: -0.3, whites: -0.1, shadows: 0.12, contrast: 1.14, saturation: 1.12, temperature: -0.02 }),
    reason:
      "Fachada (la escala): el edificio visto desde el suelo en contrapicado, con los jardines colgantes subiendo hacia las nubes y la cámara que baja hasta las palmas; es el exterior de la casa visto por fuera, entre dos planos de interior, justo antes de la vista de esquina.",
  },
  {
    id: "c11-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc07"),
    desde: fr(0),
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.12, shadows: 0.32, blacks: 0.05, highlights: -0.3, saturation: 1.08, temperature: 0.05 }),
    reason:
      "Ventanal de esquina (la vista, el clímax): el cristal de esquina con la barandilla, el valle y el skyline con su cielo, deslizándose; es el rincón del balcón donde espera Isabella en el CTA, entra con un golpe fuerte y dura hasta la caída de la música a un piano suelto, que es cuando entra ella.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c12-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct01"),
    audio: a("ct01-voz"),
    voz: {
      s0: 0.95,
      s1: 5.36,
      lufs: -15,
      dice: "Si buscas algo diferente en un apartamento convencional, escríbeme y conoce Los Patios.",
    },
    // Su voz empieza con una «s» (Si buscas…): los agudos suben desde los 0,90 s y la vocal llega a los 0,95. `desde`
    // es 0,867 s (fr 26), tres frames antes, para no comerse la fricativa. Los chasquidos de los 0,1 y los 0,5 s quedan fuera.
    desde: fr(26),
    en: P.cta,
    dur: DUR_CTA,
    zoom: [1.0, 1.048],
    entra: "disolver",
    color: color({ exposure: 0.05, saturation: 1.05 }),
    reason:
      "Balcón (la invitación): Isabella, en el rincón del ventanal que acaba de enseñar la vista, con el valle verde y el skyline detrás, entra caminando y dice «si buscas algo diferente en un apartamento convencional, escríbeme y conoce Los Patios»; la música cae a un piano en el mismo instante que ella aparece.",
  },
  {
    id: "c13-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-018/cierre-oscuro.png",
    en: P.cta + DUR_CTA,
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo de Propiedades Luxur y la web mientras el piano se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta. */
export const DURACION_018 = P.cta + DUR_CTA + DUR_TARJETA;
