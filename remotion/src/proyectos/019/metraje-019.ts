/**
 * EL RECORRIDO 019 — «Los Patios · apto 501», TERCERA VERSIÓN — los planos, como DATOS.
 *
 * El 017 fue la primera («La oportunidad», con «Time»), el 018 la segunda («el espacio y cómo entra el exterior», con
 * «Return to Oasis»). Esta cambia lo que cambia el reel entero —OTRO HOOK (HK05), OTRA MITAD (MD08), OTRO CTA (CT05),
 * OTRO DRON (DR152), OTRA CANCIÓN («Flying Into the Sun»)— y, por pedido del encargo, la APERTURA: la primera toma ya no
 * es un dron sino la fachada vista desde el suelo (RC25), y el dron pasa a ser el PRIMER PLANO DEL RECORRIDO (bloque 3), después del hook.
 *
 * LA IDEA: «altura sin torre» (el ángulo E del catálogo): el edificio visto desde el suelo, la pregunta de Isabella, el dron que
 * la contesta con una terraza con jardín en cada nivel, y la luz que entra.
 *
 *   hook   HK05  BARANDA      «¿Y si pudieras vivir en altura sin sentir que vives dentro de una torre?»
 *   mitad  MD08  TERRAZA      «La doble altura permite que la luz y ventilación ingresen a la vivienda.»
 *   CTA    CT05  INT-BLOQUES  «Si encaja con lo que estás buscando, escríbeme.»
 *
 * Tres sitios distintos y ninguna cifra.
 *
 *   bloque 1  c01                  la fachada desde el suelo (RC25), SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia
 *   bloque 2  c02                  Isabella en la baranda: el hook (su toma no tiene aire para disolver: entra a CORTE en un golpe y habla 3 f después)
 *   bloque 3  c03 c04 c05          el dron (DR152) y el patio y la barandilla (RC09, una toma continua partida en dos)
 *   bloque 4  c06                  Isabella en la terraza: la mitad
 *   bloque 5  c07 c08 c09          de la terraza a la alcoba, al muro de bloques y a la vista (RC13, RC16 partida en dos): el plano más largo es la vista
 *   bloque 6  c10 c11              Isabella en el muro de bloques: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA, POR FRASES. «Flying Into the Sun» (Aleksey Chistilin) NO tiene un pulso constante (a
 * diferencia de «Return to Oasis»: `rejilla.py` da solo el 27 % de sus golpes fuertes en la mejor recta, contra el 89 % de aquella):
 * sube con calma, con un golpe de frase cada 2,4-2,6 s en la meseta, hasta un crescendo hacia los 30 s, y a los 34,7 s CAE
 * ≈ 20 dB en 4 s a un lecho suave que dura el resto de la pieza: es donde entra el CTA. Así que la rejilla no es una recta: son los GOLPES
 * MEDIDOS (`medir-pista.py`, ≥ 7,4 dB) y cada plano entra en uno. Los cortes SECOS caen en golpes de 7,6-12,3 dB, y se
 * comprueban sobre el audio del render (`herramientas/golpes-render.py`: un golpe medido en la canción puede quedar tapado por la
 * voz o por el ducking). Todos los `en` salen de `golpe(...)`: mover la entrada de la música es cambiar `GOLPE_DE_ENTRADA`.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(28)` = 28/30 s) para que imagen y voz
 * corten en la MISMA muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS: cada `en` es el fin del anterior.
 *
 * TRANSICIONES. Corte seco entre planos de recorrido (la cámara ya se mueve) y a Isabella cuando su toma no tiene aire para
 * disolver (HK05: habla a los 0,26 s; MD08 sí lo tiene); disolvencia de 12 f al entrar Isabella cuando se puede (la mitad y el
 * CTA). Nada más. Al salir de Isabella, corte: ni HK05 ni MD08 dejan los 14 f que pide una disolvencia tras su última palabra.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal): Isabella no habla hasta que su imagen es opaca, y el
 * hook, a corte, empieza 3 f después de que lo sea.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su
 * toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la prueba se hace a
 * escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-019.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-019";

export const FPS_019 = 30;

export type Entrada = "corte" | "disolver";
export type Bloque = 1 | 2 | 3 | 4 | 5 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. Medido con `limites-voz.py` y ebur128, no estimado. */
export interface VozDelCorte {
  /** Segundo de la fuente en que empieza a hablar. */
  s0: number;
  /** Segundo de la fuente en que termina de hablar. */
  s1: number;
  /** Sonoridad integrada de la voz (LUFS) en esa ventana. */
  lufs: number;
  /** Lo que dice, tal como está en el guion. Solo para leer el plan. */
  dice: string;
}

export interface Corte extends CorteDelFormato<Entrada> {
  /** `foto` solo para la tarjeta oscura del cierre (`c11-cierre`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella cuya voz entra con su imagen: el WAV de su voz, sin tratar. */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ: una ganancia por toma hasta este objetivo y nada más (R29). Las tres tomas miden −20,7 (HK05),
 * −17,9 (MD08) y −18,9 LUFS (CT05) en su ventana de voz: −21 es el objetivo del 017 y el 018 y se mantiene para que las
 * tres versiones suenen igual de fuertes (la mayor ganancia, −3,1 dB sobre MD08, baja su pico de −0,5 a −3,6 dBFS).
 */
export const OBJETIVO_LUFS = -21;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Flying Into the Sun» — Aleksey Chistilin, `Music/Aleksey Chistilin - Flying Into the Sun.mp3` (sha 8 `ca1f1cbf`), Do menor,
 * «ascenso, libertad, esperanza». Se entra en su golpe de 178,095 s (10,1 dB), el primero fuerte tras un respiro de 2,5 s sin
 * golpes: de ahí la sonoridad sube de −12 a −7,8 LUFS (crescendo hasta +30 s) y a +34,7 s (212,712 s) cae ≈ 20 dB en 4 s a un
 * lecho de −21 a −23 LUFS que no vuelve a subir en los 15 s siguientes (`buscar-entrada.py`, `medir-pista.py`).
 *
 * SIN PULSO: se probó una peineta de periodos de 0,25 a 1,30 s sobre los golpes de 178,06 a 213 s y la mejor recta deja solo el 27 % de
 * los golpes fuertes a ≤ 15 ms de ella (desvío medio de 51 ms); «Return to Oasis», con el mismo script, el 89 % a 10 ms. Va por FRASES.
 * Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir») en que
 * entra cada plano, con su fuerza en dB por 15 ms.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 0. */
  apertura: { t: 178.095, db: 10.1 },
  /** Isabella entra a corte con el hook. */
  hook: { t: 181.083, db: 9.0 },
  /** El dron entra, a corte, justo cuando ella acaba de hablar. */
  dron: { t: 184.981, db: 9.0 },
  /** El patio. */
  patio: { t: 189.016, db: 10.8 },
  /** Las plantas de la barandilla: el golpe más fuerte del bloque 3 (la toma sigue, es continua). */
  plantas: { t: 192.279, db: 12.3 },
  /** Isabella entra (disolvencia que acaba en el golpe) con la mitad. */
  mitad: { t: 197.057, db: 10.8 },
  /** La cámara cruza la puerta de vidrio a la alcoba. */
  umbral: { t: 201.437, db: 7.6 },
  /** El muro de bloques y el ventanal de esquina. */
  bloques: { t: 204.558, db: 9.8 },
  /** La vista: entra con el golpe de 9,3 dB y la canción llega al clímax hacia los 30 s. */
  vista: { t: 207.188, db: 9.3 },
  /** La CAÍDA a un lecho suave: entra el CTA. */
  cta: { t: 212.712, db: 11.1 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: 28 ms antes del golpe de entrada (el colchón de `entra: 1` en
 * audio-019.ts), redondeado a un frame (5342/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 5342 / FPS_019;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre
 * la prueba 720p y el WAV (y confirmado en el 017 y el 018). Se suma aquí y en la puerta para que el corte caiga en el
 * frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_019;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_019;

/** Isabella: un empuje lento hacia ella. El recorrido, quieto: la cámara ya avanza. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-019/${id}.mp4`;
const a = (id: string): string => `recorrido-019/${id}.wav`;

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

/** UNA toma continua partida en dos planos (RC09): las dos mitades llevan el MISMO color o el empalme se vería. */
const COLOR_PATIO: ColorCine = color({ exposure: 0.05, shadows: 0.22, highlights: -0.42, whites: -0.14, saturation: 1.04, temperature: -0.02 });
/** UNA toma continua partida en dos planos (RC16: el muro de bloques y la vista): el MISMO color en los dos. */
const COLOR_RC16: ColorCine = color({ exposure: 0.05, shadows: 0.15, highlights: -0.35, saturation: 1.08 });

/**
 * El frame de cada cambio de plano: el del golpe de la canción en que entra (arriba). Todos los cortes SECOS caen en un golpe medido de
 * ≥ 7,6 dB, y se comprobaron sobre el audio del render.
 */
const P = {
  hook: golpe(GOLPE.hook), //         92 · Isabella entra a corte; la voz, 3 f después
  dron: golpe(GOLPE.dron), //        209 · acaba el hook; entra el dron
  patio: golpe(GOLPE.patio), //      330 · el patio, a ras de suelo
  plantas: golpe(GOLPE.plantas), //  428 · la toma sigue: pasa la columna y se hunde entre las plantas
  mitad: golpe(GOLPE.mitad), //      571 · Isabella en la terraza (la imagen es opaca aquí; la disolvencia ocupa f559-571)
  umbral: golpe(GOLPE.umbral), //    703 · acaba la mitad; la cámara cruza la puerta de vidrio
  bloques: golpe(GOLPE.bloques), //  796 · el muro de bloques de vidrio
  vista: golpe(GOLPE.vista), //      875 · la vista, el plano más largo del bloque 5 (166 f)
  cta: golpe(GOLPE.cta), //         1041 · la CAÍDA a un lecho suave: entra el CTA
} as const;

/**
 * Frames que dura la toma del CTA (CT05): el clip dura 3,60 s (108 f) y su voz acaba a los 3,13 s; desde `desde` (19 f) le quedan
 * 89 f, que son 14 f (0,47 s) de su cara tras la última palabra antes de que la imagen funda a negro. Nada se congela.
 */
const DUR_CTA = 89;

/**
 * Dónde acaba la música (frame de la comp). Como «Return to Oasis», esta canción NO vuelve a pegar fuerte tras su caída: el
 * lecho sigue bajo el CTA y bajo la tarjeta, y se apaga en la propia tarjeta. Acaba 2 f antes del final de la pieza (con la cola de
 * `audio-019.ts`, que la lleva a cero).
 */
export const FIN_MUSICA_019 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje019: readonly Corte[] = [
  // ── Bloque 1 · la casa ──
  {
    id: "c01-fachada",
    bloque: 1,
    tipo: "video",
    src: v("rc25"),
    // RC25 «Exterior edificio4»: del 3,0 al 6,07 s la cámara avanza por el camino de grava, con las palmas a la derecha y la fachada de jardines
    // colgantes subiendo a la izquierda. Es la ventana que MEJOR ABRE sin repetir lo que ya salió: la V1 usó 1,2-3,1 s (el contrapicado) y la V2
    // 0,0-2,7 s, y de esta ventana solo comparten ≈ 0,1 s. Entra a corte (no hace falta clip por delante).
    desde: fr(90),
    en: 0,
    dur: P.hook,
    zoom: [1.0, 1.04],
    entra: "corte",
    color: color({ exposure: -0.1, highlights: -0.3, whites: -0.1, shadows: 0.12, contrast: 1.12, saturation: 1.1, temperature: -0.01 }),
    reason:
      "Fachada (la promesa): el edificio visto desde el suelo, con los jardines colgantes subiendo a un lado y las palmas del camino al otro, mientras la cámara avanza hacia él; es la torre que la pregunta de Isabella pone en duda, y entra con el golpe de apertura de la música. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia. Entra a corte: no nace de negro.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk05"),
    audio: a("hk05"),
    voz: {
      s0: 0.26,
      s1: 3.67,
      lufs: -20.7,
      dice: "¿Y si pudieras vivir en altura sin sentir que vives dentro de una torre?",
    },
    // La voz empieza a los 0,26 s de su clip (7,8 f): el clip NO tiene los 12 f de aire que pide una disolvencia (el catálogo ya lo marcaba:
    // «sin colchón al inicio»), así que entra a CORTE, en un golpe de la música, y `desde` es 3 f antes de la primera palabra
    // (round(0,26·30) − 3 = 5): la voz sube en un desclic de 3 f y la «y» inicial no cae dentro. Le quedan 0,63 s de clip tras la última palabra.
    desde: fr(5),
    en: P.hook,
    dur: P.dron - P.hook,
    zoom: [1.02, 1.12],
    entra: "corte",
    color: color({ exposure: 0.05, shadows: 0.12, saturation: 1.03, temperature: -0.01 }),
    reason:
      "Baranda (la pregunta): Isabella, de pie junto a la barandilla del deck, con las plantas, el techo de madera y la ciudad detrás, pregunta «¿y si pudieras vivir en altura sin sentir que vives dentro de una torre?» desde que su imagen entra a corte en un golpe de la música; la fachada ha salido limpia antes de que hable. El empuje 1,02→1,12 la acerca porque a esta distancia la pregunta necesita cara.",
  },
  // ── Bloque 3 · el dron y el patio (el recorrido empieza aquí) ──
  {
    id: "c03-dron",
    bloque: 3,
    tipo: "video",
    src: v("dr152"),
    // DR152, del 14,0 al 18,0 s: el dron retrocede y revela la cubierta del edificio con una terraza con jardín en cada nivel (el catálogo marca 12-16 s
    // como el tramo más limpio; aquí se toma un poco más tarde, cuando la cubierta entera y los pilares blancos ya se ven).
    desde: fr(420),
    en: P.dron,
    dur: P.patio - P.dron,
    zoom: [1.0, 1.04],
    entra: "corte",
    color: color({ exposure: 0.04, contrast: 1.06, highlights: -0.35, whites: -0.1, shadows: 0.3, blacks: 0.02, saturation: 1.04 }),
    reason:
      "Dron (la prueba, primer plano del recorrido): el edificio entero desde el aire, con una terraza con jardín en cada nivel y la cubierta que se revela al retroceder el dron; es la respuesta visual a la pregunta —una torre que no se siente torre— y entra a corte en el golpe justo cuando Isabella acaba de hablar.",
  },
  {
    id: "c04-patio",
    bloque: 3,
    tipo: "video",
    src: v("rc09"),
    // RC09 «Patio y Naturaleza 2», del 4,6 al 7,87 s: del plano de la fachada al patio a ras de suelo, con el muro de listones, la palma y el espejo de agua
    // bajo el techo de madera. `c05` sigue en el mismo fotograma (la toma es continua): el golpe fuerte del 428 cae a mitad de un movimiento y no se ve corte.
    desde: fr(138),
    en: P.patio,
    dur: P.plantas - P.patio,
    zoom: QUIETO,
    entra: "corte",
    color: COLOR_PATIO,
    reason:
      "Patio (el paseo empieza): de la fachada al deck del apartamento, la cámara avanza a ras de suelo frente al muro de listones con la palma y el espejo de agua, bajo el techo de madera de la doble altura: el exterior ya es parte de la casa.",
  },
  {
    id: "c05-plantas",
    bloque: 3,
    tipo: "video",
    src: v("rc09"),
    // Sigue a `c04` sin saltar un fotograma (desde 7,87 s = 236 f = 138 + 98): pasa la columna y la cámara se hunde entre las plantas de la barandilla hasta
    // quedarse entre hojas, con la torre vecina de ladrillo al fondo. Esas hojas son la cortinilla natural hacia Isabella (la disolvencia de la mitad cae sobre ellas).
    desde: fr(236),
    en: P.plantas,
    dur: P.mitad - P.plantas,
    zoom: QUIETO,
    entra: "corte",
    color: COLOR_PATIO,
    reason:
      "Barandilla (la naturaleza): la misma toma sigue: pasa la columna y se hunde entre las plantas de la barandilla hasta quedarse entre hojas, con el skyline detrás; el verde invade el encuadre y es la cortinilla natural hacia Isabella, que espera en la terraza.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md08"),
    audio: a("md08"),
    voz: {
      s0: 0.77,
      s1: 4.83,
      lufs: -17.9,
      dice: "La doble altura permite que la luz y ventilación ingresen a la vivienda.",
    },
    // La voz empieza a los 0,77 s (23 f): `desde` es el frame anterior (22 = 0,733 s) para que su imagen sea opaca en el golpe y la primera palabra
    // suene un frame después; le quedan 22 f de clip por delante para la disolvencia (pide 12). Tras su última palabra solo quedan 0,41 s de clip: se sale
    // a corte (una disolvencia pide 14 f y esa cola tiene 12).
    desde: fr(22),
    en: P.mitad,
    dur: P.umbral - P.mitad,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ exposure: 0.05, shadows: 0.12, saturation: 1.03 }),
    reason:
      "Terraza (la respuesta): Isabella camina hacia la cámara por el deck, con el techo de madera de doble altura sobre ella y la abertura al interior detrás, y dice «la doble altura permite que la luz y ventilación ingresen a la vivienda»: explica lo que acaba de enseñar el patio, y el techo que se ve sobre ella es la doble altura de la que habla.",
  },
  // ── Bloque 5 · de la terraza a la alcoba, al muro de bloques y a la vista ──
  {
    id: "c07-umbral",
    bloque: 5,
    tipo: "video",
    src: v("rc13"),
    // RC13 «Habitación Principal 2», del 2,6 al 5,7 s: desde los escalones del deck, la puerta de vidrio que se abre y la cámara cruza a la alcoba, que se abre a un
    // ventanal con plantas. Entra a corte (la mitad acaba en un golpe, sin disolvencia).
    desde: fr(78),
    en: P.umbral,
    dur: P.bloques - P.umbral,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.1, shadows: 0.2, highlights: -0.4, whites: -0.12, saturation: 1.1 }),
    reason:
      "Umbral (la luz entra): de la terraza donde acaba de hablar ella, la cámara sube los escalones del deck y cruza la puerta de vidrio a la alcoba principal, que se abre a un ventanal con plantas; es la luz y el verde que la frase prometía, entrando por la puerta, y lleva a lo privado (alcoba tras la terraza, sin volver atrás).",
  },
  {
    id: "c08-bloques",
    bloque: 5,
    tipo: "video",
    src: v("rc16"),
    // RC16 «Recorrido Caminando», del 20,6 al 23,23 s: Isabella, de espaldas, camina junto al muro de bloques de vidrio hacia el ventanal de esquina. Su voz (0,4-3,9 s del
    // clip) no se usa: el plano va mudo. `c09` sigue sin saltar un fotograma (la toma es continua).
    desde: fr(618),
    en: P.bloques,
    dur: P.vista - P.bloques,
    zoom: QUIETO,
    entra: "corte",
    color: COLOR_RC16,
    reason:
      "Esquina (el último trecho): Isabella camina de espaldas junto al muro de bloques de vidrio hacia el ventanal de esquina; un puente humano entre la alcoba y la vista, con la cámara avanzando igual que en el plano anterior (adelante → adelante).",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc16"),
    // Sigue a `c08` (desde 23,23 s = 697 f = 618 + 79): Isabella llega a la esquina del ventanal y se apoya en la barandilla a mirar el valle, las montañas y las nubes.
    // Acaba a los 28,77 s del clip, antes de que una cortina oscura tape el cuadro por la derecha (29,5 s en adelante).
    desde: fr(697),
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: COLOR_RC16,
    reason:
      "Ventanal de esquina (la vista, el clímax): Isabella llega a la esquina y se apoya en la barandilla a mirar el valle, las montañas y las nubes; es el plano más largo del bloque, cae con el crescendo de la canción y acaba donde empieza su caída a un lecho suave, que es cuando entra ella a decir lo último.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct05"),
    audio: a("ct05"),
    voz: {
      s0: 0.68,
      s1: 3.13,
      lufs: -18.9,
      dice: "Si encaja con lo que estás buscando, escríbeme.",
    },
    // Su voz empieza a los 0,68 s (20,4 f): `desde` es el frame anterior (19 = 0,633 s), con 19 f de clip por delante para la disolvencia (pide 12). Es la toma
    // más corta del catálogo (3,6 s): le quedan 89 f desde `desde`, 14 f (0,47 s) tras su última palabra.
    desde: fr(19),
    en: P.cta,
    dur: DUR_CTA,
    zoom: [1.0, 1.05],
    entra: "disolver",
    color: color({ exposure: -0.05, highlights: -0.3, saturation: 1.03 }),
    reason:
      "Muro de bloques (la invitación): Isabella, en el rincón de ladrillo y bloques de vidrio al que acaba de llegar la cámara, mira a cámara y dice «si encaja con lo que estás buscando, escríbeme»; su imagen entra en el golpe de la caída de la música a un lecho suave, que deja su voz a solas, y funde a negro.",
  },
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-019/cierre-oscuro.png",
    en: P.cta + DUR_CTA,
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo de Propiedades Luxur y la web mientras el lecho de la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta. */
export const DURACION_019 = P.cta + DUR_CTA + DUR_TARJETA;
