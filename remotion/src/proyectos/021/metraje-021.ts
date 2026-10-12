/**
 * EL RECORRIDO 021 — «Los Patios · apto 501», QUINTA VERSIÓN — los planos, como DATOS.
 *
 * El 017 fue la primera («La oportunidad», con «Time»), el 018 la segunda («el espacio y cómo entra el exterior», con «Return to
 * Oasis»), el 019 la tercera («altura sin torre», con «Flying Into the Sun») y el 020 la cuarta («lo que todavía puedes definir»,
 * con «Sax for the Last Customer»). Esta cambia lo que cambia el reel entero —OTRO HOOK (HK06), OTRA MITAD (MD01), OTRO CTA (CT02,
 * RECORTADO a su segunda mitad), OTRO DRON (DR154) y OTRA CANCIÓN, de PIANO («Amélie», de Andrea Vanzo, que pidió el usuario)— y pone el dron
 * en el MEDIO del bloque 3 (V1 y V2 lo abrieron, V3 lo puso tras el hook y V4 al final).
 *
 * REVISIÓN 2: EL REEL EMPIEZA CON EL HOOK. La revisión 1 abría con el deck (RC10, 2,67 s, sin texto ni voz: la regla fija del canal) y el usuario pidió
 * «elimina la primer toma y empieza con el hook» (2026-10-04). Esta pieza es por tanto la ÚNICA del canal que abre con Isabella hablando, y esa excepción
 * está declarada en la puerta (`ABRE_CON_EL_HOOK`). El plano se quitó (no se renumeraron los demás: `c01` ya no existe) y la pieza no tiene bloque 1.
 *
 * LA IDEA: «dentro y fuera» (el ángulo B del catálogo, «la arquitectura se siente»): el hook enseña a Isabella cruzando el umbral entre
 * el interior y la terraza y dice que arquitectura y naturaleza dejan de estar separadas; el paseo se queda fuera (la piscina, el
 * edificio visto desde arriba, la barandilla con el skyline); la mitad lo explica sobre esa barandilla («los patios y vacíos hacen
 * desaparecer esa frontera entre interior, paisaje y arquitectura») y entonces el paseo cruza la corredera hacia dentro, recorre la
 * alcoba hasta su ventana y acaba en el balcón, donde espera Isabella con el CTA.
 *
 *   hook   HK06  TERRAZA  «Mira lo que ocurre cuando arquitectura y naturaleza dejan de estar separadas.»
 *   mitad  MD01  BARANDA  «Los patios y vacíos hacen desaparecer esa frontera entre interior, paisaje y arquitectura.»
 *   CTA    CT02  BALCON   «(317 metros cuadrados en obra gris por 3.550 millones,) escríbeme y ven a conocerlo.»
 *
 * EL CTA ESTÁ RECORTADO. CT02 entero lleva el precio y el «317», que el formato no admite en el bloque 6. El usuario decidió (2026-10-04)
 * usar SOLO su segunda mitad, «escríbeme y ven a conocerlo»: la toma entra a media frase (a los 5,73 s de su clip, en el silencio que
 * sigue a «millones,») y ni el precio ni el «317» suenan, se leen ni se ven. Isabella está quieta apoyada en la barandilla del ventanal
 * y el encuadre no cambia en esa mitad, así que el corte no se nota. La voz del CTA dura 1,7 s.
 *
 * Tres sitios distintos y ninguna cifra. Los tres NUNCA habían ocupado su bloque: la terraza como hook, la barandilla como mitad.
 *
 *   bloque 2  c02                  Isabella cruza el umbral desde el interior hacia la terraza: el hook, a corte en el frame 0 y con su voz 15 f después del golpe de apertura
 *   bloque 3  c03 c04 c05          el paseo, FUERA (sentido II, terraza → ventanal, empieza por el extremo de la terraza): la piscina y la columna (RC11), el
 *                                  edificio visto desde arriba con sus jardines (DR154, el dron) y la barandilla con el skyline (RC10, el único uso del clip)
 *   bloque 4  c06                  Isabella en la barandilla: la mitad
 *   bloque 5  c07 c08 c09          adentro: la corredera que cruza hacia el interior (RC11) y la alcoba entera, de la puerta de vidrio al ventanal esquinero
 *                                  (RC12, una sola toma partida en dos en un golpe: la mitad de la vista es el plano más largo)
 *   bloque 6  c10 c11              Isabella en el balcón, apoyada en la barandilla del ventanal: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * LECTURA DEL PASEO (declarada). Sentido II del catálogo (§10.3), el que sale de un hook en la terraza: la casa es una línea con la terraza y el
 * patio en un extremo y el ventanal en el otro. El hook, la piscina, el dron y la barandilla son el extremo de la terraza; la mitad habla sobre esa
 * barandilla; y luego el paseo entra (la corredera), cruza la alcoba y acaba en el ventanal esquinero, donde está el balcón del CTA. No hay un solo
 * retroceso. El dron (el edificio entero visto desde arriba) hace de respiro entre la piscina y la barandilla y NO es un plano del paseo: es la
 * mirada de afuera, como en el 019.
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA, POR GOLPES. «Amélie» (piano, rubato) NO tiene pulso: `rejilla.py` da solo el 53 % de sus golpes fuertes a
 * ≤ 15 ms de la mejor recta (0,316 s) y un desvío de 33 ms. Va por notas. Así que no hay recta: son los GOLPES MEDIDOS (`medir-pista.py`,
 * ≥ 6 dB) y cada corte seco cae en uno. A diferencia del jazz del 020 (golpes de 14-26 dB) un piano da golpes de 8-15 dB: se comprueban
 * sobre el audio del render (`herramientas/golpes-render.py`). Todos los `en` salen de `golpe(...)`: mover la entrada de la música es cambiar
 * `INICIO_MUSICA`.
 *
 * LA RESOLUCIÓN. La canción suena plana (−17,6 LUFS) durante 40 s desde su golpe de entrada y entonces decae SOLA: −26,5 LUFS entre el 40 y el 45 y
 * silencio después (−47). Es su final natural, no un lecho: entrando en 134,97 s la plana acaba hacia el frame 1203, justo cuando la voz del CTA
 * acaba de entrar (f1165-1215), y la cola del piano se apaga bajo la tarjeta. El CTA entra en el último golpe de la plana (173,630 s).
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(28)` = 28/30 s) para que imagen y voz
 * corten en la MISMA muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS: cada `en` es el fin del anterior.
 *
 * TRANSICIONES. El hook abre la pieza a corte (frame 0). Corte seco entre planos de recorrido (la cámara ya se mueve): c04, c05 (la barandilla) y c09 (la 2.ª mitad de la
 * alcoba, que es la misma toma). Disolvencia de 12 f al entrar Isabella (la mitad y el CTA, que acaban en un golpe), al salir del hook
 * hacia la piscina y al salir de la mitad hacia la corredera (las dos tomas traen cola de sobra tras su última palabra: 16 y 23 f; se piden 14) y al pasar de
 * la corredera a la alcoba (c08: acaba en un golpe; un corte seco daba un salto de luma de +12,7). Nada más.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal): ESTA PIEZA LA ROMPE POR ENCARGO (revisión 2): la primera toma ES el hook y habla desde el f18
 * (0,59 s) con su subtítulo desde el f16. El golpe de apertura de la música (f3) suena entero antes de su primera palabra: 15 f.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su
 * toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la prueba se hace a
 * escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-021.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-021";

export const FPS_021 = 30;

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
  /** `foto` solo para la tarjeta oscura del cierre (`c11-cierre`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella cuya voz entra con su imagen: el WAV de su voz, TRATADO (`<toma>-voz.wav`: ver `OBJETIVO_LUFS`). */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (REV. 3 de la final, pedido del usuario, 2026-10-08: «necesito que la voz cuando habla Isabella tenga más decibeles sin saturar»; la
 * versión exportada antes y las cuatro anteriores la llevaban a −21). Con ganancia sola no se puede: las tres tomas crudas miden −22,3 (HK06), −24,9 (MD01) y −22,0 LUFS (CT02, su 2.ª mitad)
 * con picos de −3,5, −4,0 y −5,9 dBFS, y subirlas 7-10 dB daría picos de +3,5, +5,9 y +1,1 dBFS (saturan). Suena la voz TRATADA (`<toma>-voz.wav`: graves, puerta suave, compresión 3:1,
 * una ganancia por toma —+15,6 · +16,2 · +14,8 dB— y limitador a −2,5 dBFS, en `proyectos/021/normalizar.mjs`), que ya llega a −15,0 · −15,1 · −14,7 LUFS con el pico real en −2,5 · −2,5 · −2,9
 * dBFS; la ganancia del plan solo iguala las tres (0,0 · +0,1 · −0,3 dB). Excepción a R29 («una ganancia por toma y nada más»), por encargo, declarada aquí y en la puerta (sección 3:
 * pico real ≤ −1 dBTP con su ganancia). Lo que mide `limites-voz.py` (R29), `s0` y `s1`, sale del WAV crudo: el tratado no se desfasa (2-3 muestras, < 0,1 ms).
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Andrea Vanzo – Amélie – Comptine d'un autre été, l'après-midi (reimagined)» — `Music/Andrea Vanzo - Amélie - ….mp3` (sha 8 `8a845ebc`),
 * Mi menor, piano neoclásico (rubato, ~95), 3:16. Se entra en su golpe de 135,009 s (25,5 dB), el más fuerte de las pistas libres, tras un
 * respiro: de ahí suena −17,6 LUFS plano durante 40 s, con una nota fuerte cada 1-5 s, y entre el 175 y el 180 decae a −26,5 y a silencio
 * (`buscar-entrada.py`, `medir-pista.py`, `rejilla.py`).
 *
 * SIN PULSO: la mejor recta (0,316 s, 190 BPM) deja solo el 53 % de los golpes fuertes a ≤ 15 ms de ella (desvío medio de 33 ms). Es
 * un piano tocado, no una máquina. Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de
 * «empieza a subir») en que entra cada plano, con su fuerza en dB por 15 ms.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 0 (la nota que vuelve tras el respiro). */
  apertura: { t: 135.009, db: 25.5 },
  /** El dron: sube por los jardines del edificio, a corte (el corte de la piscina al dron cae en un golpe de 7,7 dB). */
  dron: { t: 144.702, db: 7.7 },
  /** La barandilla con el skyline, a corte. */
  baranda: { t: 149.96, db: 8.3 },
  /** Isabella entra (la disolvencia acaba aquí) con la mitad. */
  mitad: { t: 153.394, db: 11.0 },
  /** La alcoba, de la puerta de vidrio a la pared de ladrillo, a corte. */
  alcoba: { t: 163.493, db: 9.0 },
  /** La segunda mitad de la alcoba (la ventana), a corte: el plano más largo del bloque 5. */
  vista: { t: 167.6, db: 12.7 },
  /** Isabella entra (la disolvencia acaba aquí) con el CTA: el último golpe de la meseta. */
  cta: { t: 173.63, db: 9.5 },
} as const;

/**
 * El DECAIMIENTO final de la canción: la meseta (−17,4 LUFS en el tramo de 35-40 s de la ventana) acaba hacia los 175 s y el piano cae
 * solo a −26,5 LUFS en los 5 s siguientes (40-45 s) y a −40,4 en los otros 5 (45-50 s). No es un golpe sino un cambio de nivel medido con `medir-pista.py` (sonoridad por tramos
 * de 5 s): la resolución de esta pieza, como la caída a un lecho del 018 y el 019.
 */
export const DECAE = { t: 175.0, lufsAntes: -17.4, lufs5s: -26.5, lufs10s: -40.4 } as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: 42 ms antes del golpe de entrada (el colchón de `entra: 1` en
 * audio-021.ts), redondeado a un frame (4049/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 4049 / FPS_021;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre
 * la prueba 720p y el WAV (y confirmado en el 017, el 018, el 019 y el 020). Se suma aquí y en la puerta para que el corte caiga en el
 * frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_021;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_021;

/** Isabella: un empuje lento hacia ella. El recorrido, quieto: la cámara ya avanza. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-021/${id}.mp4`;
const a = (id: string): string => `recorrido-021/${id}.wav`;

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
 * El frame de cada cambio de plano: el del golpe de la canción en que entra (arriba). Los cortes SECOS y las entradas de Isabella caen en un
 * golpe medido; los dos cambios por disolvencia sin golpe (f231, f750) no lo piden.
 */
const P = {
  dron: golpe(GOLPE.dron), //        294 · el dron (el golpe de 7,7 dB: el corte de la piscina al dron; el de 9,5 dB cae en f346, dentro del dron)
  baranda: golpe(GOLPE.baranda), //  451 · la barandilla con el skyline
  mitad: golpe(GOLPE.mitad), //      554 · Isabella en la barandilla (la disolvencia ocupa f542-554)
  alcoba: golpe(GOLPE.alcoba), //    857 · la alcoba
  vista: golpe(GOLPE.vista), //      981 · la segunda mitad de la alcoba (la ventana)
  cta: golpe(GOLPE.cta), //         1162 · Isabella con el CTA (la disolvencia ocupa f1150-1162)
} as const;

/** El hook es el primer plano y usa su toma ENTERA, desde el fotograma 0 hasta el último (166 f): la imagen de Isabella se acaba en el f166. */
const FIN_HOOK = 166;
/** Cuando la piscina cede a la corredera: la mitad (MD01) trae 238 f; desde `desde` (35 f) la imagen llega al f756 y la disolvencia acaba en el 750. */
const FIN_MITAD = 750;

/**
 * Frames que dura la toma del CTA (CT02): el clip dura 8,0 s (240 f) y desde `desde` (172 f) le quedan 68 (el WAV de su voz dura 7,9987 s: 1 f menos que el vídeo, y se usan 67). Su voz acaba a los 7,49 s: la última
 * palabra suena en f1215 y esta toma llega a f1229: 14 f (0,47 s) de su cara tras ella, en los que la imagen funde a negro. Nada se congela.
 */
const DUR_CTA = 67;

/**
 * Dónde acaba la música (frame de la comp). La canción decae sola hasta el silencio hacia los 180 s (f1353): la envolvente la lleva a cero
 * 2 f antes del final de la pieza, bajo la tarjeta.
 */
export const FIN_MUSICA_021 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje021: readonly Corte[] = [
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk06"),
    audio: a("hk06-voz"),
    voz: {
      s0: 0.59,
      s1: 5.01,
      lufs: -15.0,
      dice: "Mira lo que ocurre cuando arquitectura y naturaleza dejan de estar separadas.",
    },
    // REVISIÓN 2 (pedido del usuario, 2026-10-04: «elimina la primer toma y empieza con el hook»): el reel ABRE con Isabella, en el frame 0, a corte, y con su voz y su texto desde el
    // primer segundo. Es la ÚNICA excepción a la regla fija «la primera toma sale sin texto ni voz» y está declarada en la puerta (`ABRE_CON_EL_HOOK` en `revisar-021.mjs`). Usa su toma entera
    // (`desde` 0, 166 f): Isabella empieza al fondo, junto a la ventana, con el golpe de apertura de la música (25,5 dB, f3) y su primera palabra suena 15 f DESPUÉS (0,59 s = f18), con la música
    // ya abajo. Tras su última palabra (f150) quedan 16 f de clip: la salida es una disolvencia (f154-166) que no pisa su voz (se piden 14).
    desde: fr(0),
    en: 0,
    dur: FIN_HOOK,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ exposure: 0.12, shadows: 0.28, highlights: -0.3, blacks: 0, saturation: 1.03, temperature: -0.01 }),
    reason:
      "Terraza (la promesa): la cámara, en la terraza, mira hacia el interior por la corredera abierta; Isabella empieza al fondo, junto a la ventana del otro extremo, camina hacia la cámara y cruza el umbral hasta el plano medio mientras dice «mira lo que ocurre cuando arquitectura y naturaleza dejan de estar separadas»: el gesto ES el argumento. Abre la pieza a corte, con el golpe de apertura de la música; su voz llega 15 f después.",
  },
  // ── Bloque 3 · el paseo FUERA, sentido II: la piscina, el dron y la barandilla ──
  {
    id: "c03-piscina",
    bloque: 3,
    tipo: "video",
    src: v("rc11"),
    // RC11 «Piscina y Patio», del 2,7 al 6,97 s: la piscina pequeña con sus escalones y el muro de listones con la palma, y la cámara que sigue a la izquierda hasta la columna de
    // concreto y los edificios del skyline. La V2 usó 0,4-2,6 s (el arranque, la piscina de frente) y 7,0-9,2 s (la columna y el cielo): desde 2,7 hay 12 f de clip antes (2,3 s) para
    // la disolvencia —que pisa 0,3 s del tramo de la V2, ya semitransparente—, y la parte opaca (2,7-6,97 s) no toca ni un fotograma de él. Entra con una disolvencia desde Isabella (f154-166).
    desde: fr(81),
    en: FIN_HOOK,
    dur: P.dron - FIN_HOOK,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.14, highlights: -0.4, whites: -0.12, shadows: 0.32, blacks: -0.02, saturation: 1.06, temperature: -0.01 }),
    reason:
      "Piscina (el exterior): de Isabella, que ha cruzado el umbral, a lo que hay fuera: la piscina pequeña con escalones, el muro de listones con la palma y la cámara que sigue hasta la columna de concreto y el skyline; es la naturaleza que el hook acaba de nombrar, y la dirección del paseo (hacia la barandilla).",
  },
  {
    id: "c04-dron",
    bloque: 3,
    tipo: "video",
    src: v("dr154"),
    // DR154, del 2,0 al 7,23 s: el dron sube despacio por la fachada de ladrillo y concreto del edificio, con los jardines colgantes de cada nivel y la torre de ladrillo vecina; no se ve la torre
    // con malla negra (DR148-DR152). Es el edificio entero visto desde afuera: el respiro entre la piscina y la barandilla. Entra a corte en un golpe.
    desde: fr(60),
    en: P.dron,
    dur: P.baranda - P.dron,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1, contrast: 1.04, highlights: -0.3, whites: -0.1, shadows: 0.42, blacks: 0, saturation: 1.04 }),
    reason:
      "Dron (la mirada de afuera): el edificio entero desde arriba, con los jardines colgantes de cada nivel y la fachada de ladrillo; es dónde está todo lo que se ha visto desde dentro, y el respiro entre la piscina y la barandilla. Entra a corte en un golpe de la música.",
  },
  {
    id: "c05-baranda",
    bloque: 3,
    tipo: "video",
    src: v("rc10"),
    // RC10, del 8,4 al 11,83 s: la columna de concreto, el techo de madera y, a la derecha, la barandilla negra con la jardinera y el skyline con las nubes; la cámara avanza hasta ella. La V2 usó
    // 4,0-8,4 s: el tramo empieza donde el de la V2 acaba (8,4 s) y llega casi al último fotograma del clip (11,91 s). Es el último plano antes de que Isabella hable DESDE esa barandilla.
    desde: fr(252),
    en: P.baranda,
    dur: P.mitad - P.baranda,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.03, highlights: -0.45, whites: -0.2, shadows: 0.38, blacks: 0.04, contrast: 1.04, saturation: 1.06 }),
    reason:
      "Barandilla (el borde): la columna de concreto, el techo de madera y la barandilla negra con la jardinera frente al skyline y las nubes; la cámara avanza hacia el borde de la terraza, que es donde espera Isabella para explicar la frontera que acaba de verse.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md01"),
    audio: a("md01-voz"),
    voz: {
      s0: 1.25,
      s1: 7.15,
      lufs: -15.1,
      dice: "Los patios y vacíos hacen desaparecer esa frontera entre interior, paisaje y arquitectura.",
    },
    // La voz empieza a los 1,25 s (37,5 f): `desde` es 2,5 f antes (35 = 1,17 s), con 35 f de clip por delante para la disolvencia (pide 12): su imagen es opaca en el golpe del f554 (que suena
    // entero) y la primera palabra suena en el 556. Tras su última palabra (f733) quedan 23 f de clip: el plano siguiente entra con una disolvencia (f738-750) que no pisa su voz.
    desde: fr(35),
    en: P.mitad,
    dur: FIN_MITAD - P.mitad,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ exposure: 0.1, shadows: 0.12, highlights: -0.3, saturation: 1.03 }),
    reason:
      "Barandilla (la frontera): Isabella, en el borde de la terraza con la vegetación y el cielo detrás, camina hacia la cámara y extiende el brazo hacia el paisaje al decir «frontera»: «los patios y vacíos hacen desaparecer esa frontera entre interior, paisaje y arquitectura» es la tesis de lo que acaba de enseñar el paseo. Su imagen entra con una disolvencia desde la barandilla que acaba en un golpe.",
  },
  // ── Bloque 5 · adentro: la corredera y la alcoba ──
  {
    id: "c07-corredera",
    bloque: 5,
    tipo: "video",
    src: v("rc11"),
    // RC11, del 9,67 al 13,23 s: el deck con la piscina y el cielo a un lado, y la cámara que gira hacia el muro de ladrillo y entra por la corredera de vidrio hacia el interior. La V2 usó hasta los
    // 9,2 s: con 12 f de clip antes de `desde` (9,27 s) la disolvencia no toca ese tramo. Es la bisagra del paseo: el último plano de fuera y el primero de dentro.
    desde: fr(290),
    en: FIN_MITAD,
    dur: P.alcoba - FIN_MITAD,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.22, highlights: -0.4, whites: -0.12, shadows: 0.38, blacks: 0, contrast: 1.04, saturation: 1.06, temperature: -0.01 }),
    reason:
      "Corredera (el umbral): de la barandilla, donde ha hablado Isabella, la cámara gira hacia el muro de ladrillo y cruza la corredera de vidrio hacia dentro; es la frontera de la que acaba de hablar, atravesada, y el paso del extremo de la terraza al interior que lleva al ventanal.",
  },
  {
    id: "c08-alcoba",
    bloque: 5,
    tipo: "video",
    src: v("rc12"),
    // RC12 «Habitación Principal», del 0,4 al 4,53 s (primera mitad de una toma que sigue en c09, sin saltar nada): desde dentro de la alcoba, la puerta de vidrio con el deck y la piscina al otro lado, y la
    // cámara que gira a la derecha hasta la pared de ladrillo con sus tomas eléctricas. Ninguna versión usó RC12. Entra con una DISOLVENCIA (f845-857, que acaba en el golpe de 9,0 dB) y no a corte: la corredera
    // acaba en un interior oscuro (luma 105) y la puerta de vidrio de la alcoba abre sobre el deck a pleno sol (121): un corte seco daba +12,7 niveles de luma tras graduarlos. Con `desde` 0,4 s hay 12 f de clip antes.
    desde: fr(12),
    en: P.alcoba,
    dur: P.vista - P.alcoba,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.05, shadows: 0.38, highlights: -0.4, whites: -0.1, blacks: 0, contrast: 1.04, saturation: 1.08 }),
    reason:
      "Alcoba (el lienzo): de la corredera al interior de la alcoba, con la puerta de vidrio y el deck todavía detrás, y la cámara girando hacia la pared de ladrillo; es lo privado de la casa y, en obra gris, lo que queda por definir. Entra con una disolvencia que acaba en un golpe. Mismo sentido (adelante → adelante).",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc12"),
    // RC12, del 4,53 al 10,57 s (la misma toma que c08, sin saltar nada: un solo movimiento partido en un golpe, con el MISMO `color`): la pared de ladrillo, y la cámara que sigue a la derecha hasta la esquina del
    // ventanal grande con las jardineras y los árboles al otro lado. Es el plano más largo del bloque (181 f): la recompensa antes del CTA; acaba en el ventanal esquinero, donde está el balcón del CTA.
    desde: fr(136),
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05, shadows: 0.38, highlights: -0.4, whites: -0.1, blacks: 0, contrast: 1.04, saturation: 1.08 }),
    reason:
      "Ventanal (la vista): la cámara sigue por la alcoba hasta la esquina del ventanal, con las jardineras y los árboles del otro lado de la ventana; es lo que se ve desde dentro y donde acaba el paseo, en la esquina del balcón de Isabella. Es el plano más largo del bloque: la recompensa antes del CTA.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct02"),
    audio: a("ct02-voz"),
    voz: {
      s0: 5.82,
      s1: 7.49,
      lufs: -14.7,
      dice: "Escríbeme y ven a conocerlo.",
    },
    // CT02 ENTERA dice «317 metros cuadrados en obra gris por 3.550 millones, escríbeme y ven a conocerlo»: aquí solo suena su segunda mitad (decisión del usuario, 2026-10-04). Su voz
    // empieza a los 5,82 s (174,5 f; antes hay una pausa de 0,21 s tras «millones,»): `desde` es 2,5 f antes (172 = 5,73 s), con 172 f de clip por delante para la disolvencia (pide 12)
    // y SIN voz de la primera mitad (el WAV se corta en `s0`). Le quedan 68 f desde `desde` y se usan 67 (el WAV de su voz dura 7,9987 s): la última palabra suena en f1215 y le quedan 14 f (0,47 s) de cara antes de que la imagen
    // funda a negro y llegue a la tarjeta.
    desde: fr(172),
    en: P.cta,
    dur: DUR_CTA,
    zoom: [1.0, 1.03],
    entra: "disolver",
    color: color({ exposure: 0.05, highlights: -0.35, saturation: 1.03 }),
    reason:
      "Balcón (la invitación): Isabella, apoyada en la barandilla del ventanal con el valle y las montañas detrás, dice «escríbeme y ven a conocerlo» —solo la segunda mitad de su toma: ni el precio ni la cifra suenan—, una sola acción, y su imagen entra en el último golpe de la música y funde a negro mientras el piano decae.",
  },
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-021/cierre-oscuro.png",
    en: P.cta + DUR_CTA,
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo de Propiedades Luxur y la web mientras la cola del piano se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta. */
export const DURACION_021 = P.cta + DUR_CTA + DUR_TARJETA;
