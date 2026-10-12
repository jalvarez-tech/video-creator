/**
 * EL RECORRIDO 039 — «Lote en El Carmen de Viboral (Mia)», V22 del registro y CUARTO reel de esta propiedad, el DISRUPTIVO — los planos, como DATOS.
 *
 * Pedido (2026-10-09): «reel DISRUPTIVO… que rompa el scroll en el primer segundo y no se parezca a ninguna versión anterior de esta propiedad (otro ángulo, otro hook, otra mitad, otro CTA, otra canción y otros planos)»:
 * hook que contradiga lo esperado; frame 0 con movimiento fuerte; planos de 1-1,5 s en el bloque 3, cada uno en un golpe medido; un plano largo y quieto de contraste; rampas de velocidad SOLO en el bloque 3 y nunca con
 * gente (hasta ×2,5, cada cambio en un golpe medido, como en la V12); música con energía (golpes ≥ 12 dB y un drop donde entra el paseo); el acento del texto en la palabra que contradice o que pide la acción.
 * Estructura del canal: DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA.
 *
 *   hook   HK02  «¿Quieres campo, pero no quieres estar desconectado? Vente, te muestro.»        (la pregunta que selecciona: el campo SIN desconexión)
 *   mitad  MD05  «Tener dos entradas puede cambiar por completo la forma en la que disfrutas un lote.»
 *   CTA    CT02  «Si quieres conocerlo, escríbeme lote y te envío toda la información.»          (una sola acción: UNA palabra)
 *
 * LA IDEA EN UNA LÍNEA. Este lote es EL CAMPO SIN DESCONEXIÓN: el hook plantea la tensión que tiene todo el que quiere campo («¿… pero no quieres estar desconectado?»), el paseo la contesta a golpes (la tierra, las
 * palmas, la cabaña, las terrazas, todo cerca y todo a la vez), la mitad da la razón («dos entradas… cambian por completo la forma en la que disfrutas un lote»: conectado, no aislado) y el bloque 5 la enseña (el portón de
 * la vereda, la cerca con el valle y, al final, la vista larga). Ninguna cifra en pantalla ni en voz: la ficha (3.428 m², COP 800 millones) va al caption.
 *
 * LO QUE ES LO MISMO QUE EN LAS VERSIONES ANTERIORES (y se dice): las tres mitades libres (MD01, MD05, MD06) hablan de las dos entradas, el argumento de la V14 (030), y el único CTA libre (CT02) es la misma FRASE del CT01
 * de la V14, en otra toma. Cambian el hook, el ángulo (la conexión, no la seguridad ni la construcción ni «tu lugar»), la canción y TODOS los segundos de metraje. Repetir una mitad o un CTA ya usado sería otra decisión: del usuario.
 *
 *   bloque 1  c01                  la BAJADA: de la nube al lote, a velocidad constante desde el primer fotograma (DR104; `flujo.py`: 4 px/f), SIN TEXTO NI VOZ
 *   bloque 2  c02                  Isabella camina hacia cámara en la loma con el cielo azul y las montañas: el hook (entra a corte en un golpe)
 *   bloque 3  c03 c04 c05 c06 c07  cinco planos de 1,2-1,5 s sobre golpes: la cabaña y las palmas (DR98) → las terrazas desde arriba, ×1 y a ×2,5 (DR97) → las terrazas de lado (DR101) → el sendero entre palmas,
 *                                  a ×2,5 y frenando a ×1 (DR99) → la cabaña (DR108)
 *             c08                  LA PAUSA: 4,2 s de la pared de terrazas con el cielo, casi quieta (DR96): el contraste, justo antes de que vuelva Isabella
 *   bloque 4  c09                  Isabella camina hacia cámara entre las palmas: la mitad (a corte en un golpe)
 *   bloque 5  c10 c11 c12          el portón de la vereda (RC04) → la cerca con el valle (RC05) → LA VISTA, 4,6 s: de la tierra roja a la cabaña y las colinas (DR109, el plano más largo del bloque)
 *   bloque 6  c13 c14              Isabella en la loma con el valle: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA, POR GOLPES. «Light Fills the Room» (downtempo/chill con ritmo marcado, ~88 BPM; biblioteca del repo) es la ÚNICA de las 19 canciones libres de género apto que da una rejilla con
 * TODOS los cortes en golpes de ≥ 12 dB (aquí, ≥ 14) con los 12 planos de esta pieza (`herramientas/buscar-cortes-039.py`, `musica/buscar-cortes-039-*.txt`): golpes de 14,1 a 23,5 dB, el que entra en el paseo (el «drop») a 16,3. La canción es
 * PLANA (sin crescendo ni caída: `catalogo-musica.md`): la energía sale de la densidad de golpes y el «drop» lo hace la música al volver a su nivel tras el hook. Medida, no oída. TODOS los cortes son secos.
 *
 * LOS DRONES, A VELOCIDAD CONSTANTE (030 rev. 1): cada tramo es una ventana uniforme medida (`herramientas/ventanas-039.py`, `medir-ventana.py`: dispersión del movimiento, pendiente y máximo/media; el dron de la
 * apertura, que sube de la nube, con `flujo.py`: el desplazamiento global es constante a 4 px/f). Los números de cada uno, en su comentario.
 *
 * LAS RAMPAS (V12, `proyectos/028`): `<PistaMetraje>` reproduce cada corte a UNA velocidad. Una rampa es una escalera de cortes de 2 f de 0,5 en 0,5 sobre el MISMO clip y todos a corte; la rampa la paga la meseta RÁPIDA, de
 * modo que la meseta a ×1 acaba (o empieza) exactamente en un golpe medido. Hay DOS en toda la pieza, las dos en el bloque 3 y las dos sobre drones (nunca con gente): c04 SUBE de ×1 a ×2,5 en el golpe del f229 (12,3 dB) y c06
 * FRENA de ×2,5 a ×1 en el golpe del f322 (21,1 dB).
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(11)` = 11/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f63, 2,1 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base de esta pieza (más CONTRASTE que el reel cinematográfico, 1,20 contra 1,15) más el ajuste de su toma, medido con
 * `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-039.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-039";

export const FPS_039 = 30;

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
  /** `foto` solo para la tarjeta oscura del cierre (`c14-cierre`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella: el WAV de su voz TRATADA (`<toma>-voz.wav`, `normalizar.mjs`). */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido del encargo: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −24,3 · −21,9 · −20,5 LUFS en su ventana de voz; cada una pasa por la cadena de
 * `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS) hasta ≈ −15 LUFS con el pico real a −2,5 dBFS, así
 * que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Light Fills the Room» — `archivos/musica/Light Fills the Room.mp3` (sha 8 `b3c8b7c6`), downtempo/chill con ritmo marcado, 3:34. Se entra en su golpe de 104,579 s (18,7 dB) y de ahí suena a −12 LUFS
 * (picos de −0,2 a −1,4 dBFS: la música sola, a −15, es BAJARLA 1,1-3,3 dB) hasta el 133,5 s. Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir») en
 * que entra cada plano o cambia una velocidad, con su fuerza en dB por 15 ms: `proyectos/039/musica/golpes-039.json` (`medir-pista.py --json`). Salen de `buscar-cortes-039.py` (`musica/buscar-cortes-039-pasada5-F.txt`).
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la bajada, a corte; no nace de negro). */
  apertura: { t: 104.579, db: 18.7 },
  /** Isabella entra A CORTE con el hook; su primera sílaba suena 9 f después. */
  hook: { t: 106.273, db: 17.0 },
  /** EL DROP: acaba el hook (14,8 f tras su última palabra) y entra el paseo; la música vuelve a su nivel en ese golpe. */
  drop: { t: 110.393, db: 16.3 },
  /** La tierra y las terrazas desde arriba (empieza a ×1). */
  terrazas: { t: 111.604, db: 17.7 },
  /** DENTRO de c04: el golpe en que la velocidad sube de ×1 a ×2,5. */
  rampaSube: { t: 112.104, db: 12.3 },
  /** Las terrazas de lado. */
  lateral: { t: 113.13, db: 20.4 },
  /** El sendero entre palmas (empieza a ×2,5). */
  sendero: { t: 114.346, db: 15.1 },
  /** DENTRO de c06: el golpe en que la velocidad baja de ×2,5 a ×1. */
  rampaBaja: { t: 115.197, db: 21.1 },
  /** La cabaña. */
  cabana: { t: 115.881, db: 15.4 },
  /** LA PAUSA: el plano largo y casi quieto antes de que vuelva Isabella. */
  pausa: { t: 117.163, db: 16.4 },
  /** Isabella entra A CORTE con la mitad; su primera sílaba suena 8,9 f después. */
  mitad: { t: 121.362, db: 18.7 },
  /** El portón de la vereda. */
  porton: { t: 126.167, db: 14.1 },
  /** La cerca con el valle. */
  cerca: { t: 127.717, db: 16.7 },
  /** LA VISTA, el plano más largo del bloque 5. */
  vista: { t: 128.912, db: 16.6 },
  /** Isabella entra A CORTE con el CTA (el golpe más fuerte de la pieza); su primera sílaba suena 9 f después. */
  cta: { t: 133.545, db: 23.5 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: 50 ms antes del golpe de entrada (104,579 s), redondeado a un frame (3136/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 3136 / FPS_039;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_039;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_039;

/** Isabella: un empuje lento hacia ella (camina hacia cámara: el empuje la acompaña). El recorrido, quieto: la cámara ya avanza. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-039/${id}.mp4`;
const a = (id: string): string => `recorrido-039/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE de esta pieza: MÁS contraste que el reel cinematográfico (1,20 contra 1,15, pedido del encargo), con negros hundidos, luces recogidas (los cielos del lote son lo primero que se quema), un punto cálido y
 * +8 % de saturación. Orden del efecto: exposición → balance de blancos → sombras/luces/blancos/negros → contraste → saturación → vibrance. `vibrance` ≤ 0,05 (sobre hormigón gris pinta un moteado de colores y vuelve
 * rosadas las nubes) y las tomas de Isabella, `saturation` ≤ 1,06: la piel se queda donde estaba. El AJUSTE de cada plano se mide (`herramientas/medir-color.py`), no se hereda.
 */
const COLOR_BASE: ColorCine = {
  contrast: 1.2,
  blacks: -0.08,
  shadows: 0.1,
  highlights: -0.3,
  whites: -0.12,
  temperature: 0.04,
  saturation: 1.08,
  vibrance: 0.02,
};

/** El color de un plano: la base más el ajuste de su toma (medido, `medir-color.py`). */
const color = (ajuste: ColorCine = {}): ColorCine => ({ ...COLOR_BASE, ...ajuste });

/**
 * El frame de cada cambio de plano: el del golpe de la canción en que entra (arriba). TODOS los cortes son secos y caen en un golpe medido.
 */
const P = {
  hook: golpe(GOLPE.hook), //             54 · Isabella entra a corte; su primera palabra, 9 f después
  drop: golpe(GOLPE.drop), //            177 · acaba el hook; entra el paseo con el drop
  terrazas: golpe(GOLPE.terrazas), //    214 · la tierra y las terrazas desde arriba
  rampaSube: golpe(GOLPE.rampaSube), //  229 · dentro de c04: ×1 → ×2,5
  lateral: golpe(GOLPE.lateral), //      259 · las terrazas de lado
  sendero: golpe(GOLPE.sendero), //      296 · el sendero entre palmas
  rampaBaja: golpe(GOLPE.rampaBaja), //  322 · dentro de c06: ×2,5 → ×1
  cabana: golpe(GOLPE.cabana), //        342 · la cabaña
  pausa: golpe(GOLPE.pausa), //          380 · el plano largo y casi quieto
  mitad: golpe(GOLPE.mitad), //          506 · Isabella entra a corte con la mitad
  porton: golpe(GOLPE.porton), //        651 · el portón de la vereda
  cerca: golpe(GOLPE.cerca), //          697 · la cerca con el valle
  vista: golpe(GOLPE.vista), //          733 · la vista, el plano más largo del bloque 5 (139 f)
  cta: golpe(GOLPE.cta), //              872 · Isabella entra a corte con el CTA
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 4,20 s (126 f) y desde `desde` (3 f) le quedan 123. Su voz va de 0,40 a 3,88 s (f881-985 de la comp): 9,6 f (0,3 s) de su cara tras la última palabra, en los que la imagen
 * funde a negro (los últimos 6). Nada se congela: el plano acaba en el último fotograma del clip.
 */
const DUR_CTA = 123;

/**
 * Dónde acaba la música (frame de la comp): se apaga en línea recta bajo la tarjeta y llega a cero 2 f antes del final de la pieza.
 */
export const FIN_MUSICA_039 = P.cta + DUR_CTA + DUR_TARJETA - 2;

/** Una meseta de velocidad de un clip: `f` frames de la composición a `v`. */
interface Meseta {
  readonly v: number;
  readonly f: number;
}

/**
 * Una ESCALERA de velocidad sobre UN clip (V12): cada meseta es un corte a su `velocidad`, todos a corte, y la fuente avanza `f × v / 30` s por meseta, sin saltos ni solapes (la siguiente arranca donde
 * acabó la anterior). La rampa la pagan los escalones de la meseta rápida: la de ×1 acaba o empieza en un golpe. Devuelve los cortes y la fuente consumida (s).
 */
const escalera = (
  idBase: string,
  src: string,
  desde: number,
  en0: number,
  mesetas: readonly Meseta[],
  base: Omit<Corte, "id" | "src" | "desde" | "en" | "dur" | "velocidad" | "reason">,
  razon: (m: Meseta, i: number) => string
): Corte[] => {
  let en = en0;
  let fuente = desde;
  return mesetas.map((m, i) => {
    const c: Corte = {
      ...base,
      id: `${idBase}${String.fromCharCode(97 + i)}`,
      src,
      desde: fuente,
      en,
      dur: m.f,
      velocidad: m.v === 1 ? undefined : m.v,
      reason: razon(m, i),
    };
    en += m.f;
    fuente += (m.f * m.v) / FPS_039;
    return c;
  });
};

/** La rampa de c04: ×1 hasta el golpe de c04 (15 f), y desde él ×1,5 · ×2 (2 f cada uno) y ×2,5 hasta el siguiente golpe de corte. */
const RAMPA_C04: readonly Meseta[] = [
  { v: 1, f: P.rampaSube - P.terrazas },
  { v: 1.5, f: 2 },
  { v: 2, f: 2 },
  { v: 2.5, f: P.lateral - P.rampaSube - 4 },
];
/** La rampa de c06: ×2,5 hasta los escalones que acaban en el golpe de c06 (×2 · ×1,5, 2 f cada uno), y ×1 desde él hasta el siguiente golpe de corte. */
const RAMPA_C06: readonly Meseta[] = [
  { v: 2.5, f: P.rampaBaja - P.sendero - 4 },
  { v: 2, f: 2 },
  { v: 1.5, f: 2 },
  { v: 1, f: P.cabana - P.rampaBaja },
];

export const metraje039: readonly Corte[] = [
  // ── Bloque 1 · la bajada ──
  {
    id: "c01-apertura",
    bloque: 1,
    tipo: "video",
    src: v("dr104"),
    // DR104 (apaisado, recortado a 9:16 en 0,25), del 1,70 al 3,53 s: el dron baja de la nube —el cielo, las colinas, el valle— hasta las palmas, la hacienda y, al final, la cabaña de madera. NO se mide con la
    // diferencia entre fotogramas (arranca en cielo, sin textura: σ/μ 0,26 por eso, no por el vuelo): `flujo.py` da un desplazamiento global CONSTANTE de 4,00 px/f de 1,70 a 3,55 s (antes está parado y después frena
    // hasta pararse a los 4,0 s). Ninguna versión usó este clip (la V18 lo descartó por la medida de diferencias). Entra a corte con el golpe de 24,6 dB del f3 (no nace de negro) y YA VA A VELOCIDAD DESDE EL FRAME 0.
    desde: fr(51),
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ contrast: 1.14, exposure: 0.2, blacks: 0, shadows: 0.4, highlights: -0.5, whites: -0.35, saturation: 1.1 }),
    reason:
      "Cielo → lote (la promesa): el dron baja de la nube hasta las palmas y la cabaña a velocidad constante desde el primer fotograma: el campo, de golpe. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y ya está en movimiento.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk02"),
    audio: a("hk02-voz"),
    voz: {
      s0: 2.035,
      s1: 5.34,
      lufs: -15.1,
      dice: "¿Quieres campo, pero no quieres estar desconectado? Vente, te muestro.",
    },
    // La voz empieza a los 2,035 s (61 f) y acaba a los 5,34 s (160 f); el clip dura 6,43 s (193 f). OJO: la energía de banda de voz marca un «arranque» a los 1,415 s, pero es un golpe grave del micro y 0,6 s de
    // viento (centroide 130-250 Hz, 97 % de la energía por debajo de 500 Hz: `voz-detalle`); la primera sílaba («¿Quie-») sube a los 2,035 s (centroide 800 Hz). La ventana de la voz tratada empieza ahí, o la compresión
    // y +20 dB subirían el viento. `desde` 52 f entra A CORTE en el golpe de 17,0 dB del f54 (suena entero: la música baja con curva DESPUÉS) y la primera sílaba suena a los 9 f del golpe. El plano dura 123 f (hasta
    // el golpe del drop, f177): 14,8 f tras la última palabra (la toma llega al f193 del clip; con `desde` 52 el plano no podría pasar de 141 f).
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-039.ts`): «te» de «vente, te muestro» (f148 = 4,9 s del vídeo; whisper oye «venta y muestro» / «vente maestro»).
    // Isabella camina hacia cámara en la loma, lejos al principio, con el cielo azul y las montañas detrás: el empuje la acompaña (no habla hasta el f63).
    desde: fr(52),
    en: P.hook,
    dur: P.drop - P.hook,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.12, exposure: 0.05, highlights: -0.4, whites: -0.25, saturation: 1.04 }),
    reason:
      "Loma con las montañas (la tensión): Isabella camina hacia cámara y pregunta «¿quieres campo, pero no quieres estar desconectado?»: el miedo de todo el que quiere campo, dicho antes que la respuesta. Entra a corte en un golpe.",
  },
  // ── Bloque 3 · el paseo en rápido: cinco planos de 1-1,4 s, cada uno en un golpe ──
  {
    id: "c03-cabana",
    bloque: 3,
    tipo: "video",
    src: v("dr98"),
    // DR98 (vertical), del 22,20 al 23,43 s: el dron sube sobre la hierba y la tierra roja hasta la cabaña y las palmas, MUY rápido y constante (movimiento 13,9, σ/μ 0,059, máximo 1,09×). La V14 usó este clip en
    // 13,0-16,33 s (los taludes) y la V18 en 7,10-10,43 s (la apertura); este tramo, nadie.
    desde: 22.2,
    en: P.drop,
    dur: P.terrazas - P.drop,
    zoom: QUIETO,
    entra: "corte",
    color: color({ highlights: -0.3, whites: -0.15, saturation: 1.1 }),
    reason:
      "Cabaña y palmas (el drop): tras «te muestro» la música vuelve a su nivel y la cámara sube de golpe a la cabaña entre las palmas: lo primero que hay que ver del campo.",
  },
  ...escalera(
    "c04-terrazas-",
    v("dr97"),
    7.3,
    P.terrazas,
    RAMPA_C04,
    { bloque: 3, tipo: "video", zoom: QUIETO, entra: "corte", color: color({ exposure: 0.1, shadows: 0.12, highlights: -0.3, whites: -0.15, saturation: 1.1 }) },
    (m, i) =>
      i === 0
        ? "Terrazas desde arriba (la escala): la cabaña, las terrazas engramadas y las palmas vistas desde el aire, a velocidad normal hasta el golpe de 12,3 dB. DR97 7,30-10,20 s (σ/μ 0,073): ningún tramo usado por las versiones anteriores (la V14 usó 10,70-14,03 s)."
        : i < 3
          ? `Rampa de ×1 a ×2,5 (escalón ${i} de 2, a ×${m.v}): la cámara se lanza sobre las terrazas desde el golpe de 12,3 dB (solo en el bloque 3 y sobre un dron: nunca con gente).`
          : "Terrazas desde arriba, a ×2,5: la meseta rápida de la rampa, hasta el golpe en que entra el plano siguiente."
  ),
  {
    id: "c05-lateral",
    bloque: 3,
    tipo: "video",
    src: v("dr101"),
    // DR101 (apaisado, recortado a 9:16 en 0,35: el recorte de la V15; a 0,5 entra el campo de fútbol del vecino), del 11,60 al 12,83 s: el dron se desliza de lado sobre las terrazas con una palma en primer plano
    // (movimiento 9,4, σ/μ 0,067, máximo 1,10×). La V15 usó este clip en 5,30-8,13 s y la V18 en 13,90-16,50 s; este tramo, nadie.
    desde: 11.6,
    en: P.lateral,
    dur: P.sendero - P.lateral,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.3, highlights: -0.5, whites: -0.3, saturation: 1.1 }),
    reason:
      "Terrazas de lado (la medida): el dron barre las terrazas con la palma delante y da la escala del lote en un segundo.",
  },
  ...escalera(
    "c06-sendero-",
    v("dr99"),
    5.3,
    P.sendero,
    RAMPA_C06,
    { bloque: 3, tipo: "video", zoom: QUIETO, entra: "corte", color: color({ exposure: 0.1, highlights: -0.3, whites: -0.15, saturation: 1.1 }) },
    (m, i) =>
      i === 0
        ? "Sendero entre palmas (el camino): el dron avanza sobre la hierba hacia las palmas a ×2,5, de golpe, desde el golpe de 15,1 dB."
        : i < 3
          ? `Rampa de ×2,5 a ×1 (escalón ${i} de 2, a ×${m.v}): la cámara frena para llegar a velocidad normal exactamente en el golpe de 21,1 dB.`
          : "Sendero entre palmas, a velocidad normal desde el golpe de 21,1 dB: la cámara llega y se queda donde mirar. DR99 5,30-8,03 s (σ/μ 0,059); la V14 y la V18 usaron 8,10-20,77 s de este clip."
  ),
  {
    id: "c07-cabana-de-cerca",
    bloque: 3,
    tipo: "video",
    src: v("dr108"),
    // DR108 (vertical), del 18,90 al 20,17 s: el dron sube sobre la tierra roja con la cabaña, las palmas y las colinas al fondo (movimiento 4,1, σ/μ 0,037, máximo 1,10×). Un dron que ninguna versión publicó (la V15
    // lo usó de apertura en sus revisiones 0 y 1 y lo quitó).
    desde: 18.9,
    en: P.cabana,
    dur: P.pausa - P.cabana,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.05, highlights: -0.3, whites: -0.15, saturation: 1.1 }),
    reason:
      "Cabaña de cerca (lo construido): la cabaña de madera entre las palmas y la tierra roja, el último golpe antes de la pausa.",
  },
  {
    id: "c08-pausa",
    bloque: 3,
    tipo: "video",
    src: v("dr96"),
    // DR96 (vertical), del 11,30 al 15,50 s: la pared de terrazas engramadas con la bolsa de tierra roja arriba y el cielo con las colinas, el dron baja CASI QUIETO (movimiento 1,65, σ/μ 0,094, máximo 1,23×). EL CONTRASTE
    // de la pieza: cuatro segundos tras cinco planos de un segundo y medio, justo antes de que vuelva Isabella («la pausa también rompe el scroll»). La V14 usó este clip en 6,5-8,83 s y la V18 en 18,60-20,57 s.
    desde: 11.3,
    en: P.pausa,
    dur: P.mitad - P.pausa,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.15, highlights: -0.4, whites: -0.25, saturation: 1.1 }),
    reason:
      "La pared de terrazas (la pausa): tras el ritmo de golpes, 4,2 s casi quietos con las terrazas, el cielo y las colinas: el respiro antes de que vuelva Isabella. Es el plano más largo del bloque 3.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c09-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md05"),
    audio: a("md05-voz"),
    voz: {
      s0: 0.495,
      s1: 4.68,
      lufs: -15.1,
      dice: "Tener dos entradas puede cambiar por completo la forma en la que disfrutas un lote.",
    },
    // La voz empieza a los 0,495 s (14,9 f) y acaba a los 4,68 s (140,4 f); el clip dura 5,13 s (154 f). `desde` 6 f entra A CORTE en el golpe de 18,7 dB del f506 (suena entero: la música baja DESPUÉS) y la primera
    // sílaba suena a los 8,9 f del golpe. El plano dura 145 f (hasta el golpe del f651): 10,6 f tras la última palabra.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-039.ts`): «por completo» (f575 = 19,2 s del vídeo; whisper oye «con completo») y «lote» (f638 = 21,3 s; whisper oye «note»).
    // Isabella camina hacia cámara entre las palmas, con el cielo cubierto.
    desde: fr(6),
    en: P.mitad,
    dur: P.porton - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.12, highlights: -0.35, whites: -0.2, saturation: 1.04 }),
    reason:
      "Entre las palmas (la razón): Isabella dice «tener dos entradas puede cambiar por completo la forma en la que disfrutas un lote»: la respuesta a «desconectado». Entra a corte en un golpe.",
  },
  // ── Bloque 5 · las entradas y la vista ──
  {
    id: "c10-porton",
    bloque: 5,
    tipo: "video",
    src: v("rc04"),
    // RC04 (IMG_1582), del 2,40 al 3,93 s: a pie, el portón de madera oscura junto a la cerca viva con el cielo y las montañas detrás (movimiento 6,1, σ/μ 0,099). La V14 usó este clip en 0,0-2,33 s; este tramo, nadie.
    // Sin gente (la voz ajena del clip no se oye: va mudo).
    desde: 2.4,
    en: P.porton,
    dur: P.cerca - P.porton,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.15, highlights: -0.5, whites: -0.35, saturation: 1.0 }),
    reason:
      "El portón de la vereda (la otra entrada): a pie, el portón de madera junto a la cerca viva con las montañas detrás: la segunda entrada de la que habla ella, enseñada.",
  },
  {
    id: "c11-cerca",
    bloque: 5,
    tipo: "video",
    src: v("rc05"),
    // RC05 (IMG_1583), del 4,00 al 5,20 s: a pie, la cerca de madera, un eucalipto alto y el valle con las montañas bajo el cielo azul (movimiento 4,9, σ/μ 0,094). La V15 usó este clip en 1,6-4,0 s: este es el tramo
    // siguiente, sin un fotograma en común. Voces ajenas de fondo: va mudo.
    desde: 4.0,
    en: P.cerca,
    dur: P.vista - P.cerca,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1, highlights: -0.5, whites: -0.35, saturation: 1.0 }),
    reason:
      "La cerca con el valle (hacia fuera): la cerca de madera y el valle: el campo que se abre al otro lado del lote, abierto y a la vista, no encerrado.",
  },
  {
    id: "c12-vista",
    bloque: 5,
    tipo: "video",
    src: v("dr109"),
    // DR109 (vertical), del 22,20 al 26,83 s: el dron sube desde la tierra roja sobre la cabaña y las palmas hasta las colinas verdes con el cielo; velocidad constante (movimiento 4,2, σ/μ 0,064, máximo 1,16×). La V14
    // usó este clip en 28,0-32,7 s (la vista, los últimos segundos de la subida al cielo): esto es el tramo anterior, sin un fotograma en común. Es el plano más largo del bloque 5 (139 f) y el clímax.
    desde: 22.2,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0, shadows: 0.2, highlights: -0.35, whites: -0.2, saturation: 1.1 }),
    reason:
      "La vista (el clímax): la subida lenta desde la tierra roja sobre la cabaña y las palmas hasta las colinas: lo que tendría delante quien tuviera el lote. El plano más largo del bloque. Entra a corte en un golpe.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c13-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct02"),
    audio: a("ct02-voz"),
    voz: {
      s0: 0.4,
      s1: 3.88,
      lufs: -15.0,
      dice: "Si quieres conocerlo, escríbeme lote y te envío toda la información.",
    },
    // La voz empieza a los 0,40 s (12 f) y acaba a los 3,88 s (116,4 f); el clip dura 4,20 s (126 f). `desde` 3 f entra A CORTE en el golpe de 23,5 dB del f872 y la primera sílaba suena a los 9 f del golpe. El plano
    // dura 123 f (hasta el último fotograma del clip): 9,6 f tras la última palabra, en los que la imagen funde a negro.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-039.ts`): «escríbeme» (f917 = 30,6 s; whisper oye «escríeme») y «lote» (f941 = 31,4 s; whisper oye «elote»).
    // Isabella camina hacia cámara en la loma con los pinos oscuros y el valle detrás.
    desde: fr(3),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.12, exposure: 0, shadows: 0.15, highlights: -0.35, whites: -0.2, saturation: 1.04 }),
    reason:
      "Loma con el valle (la invitación): Isabella dice «si quieres conocerlo, escríbeme lote y te envío toda la información»: una sola acción, UNA palabra. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-039.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c14-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-039/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c13
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c14). */
export const DURACION_039 = P.cta + DUR_CTA + DUR_TARJETA;
