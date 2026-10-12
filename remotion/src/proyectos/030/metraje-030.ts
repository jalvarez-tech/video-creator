/**
 * EL RECORRIDO 030 — «Lote en El Carmen de Viboral (Mia)», V14 del registro y PRIMER reel de esta propiedad — los planos, como DATOS.
 *
 * Pedido (2026-10-08): «teniendo en cuenta la estructura para un video que rompa el scroll, crea un video con las características de este lote; sube la voz en off de Isabella sin
 * saturar, canciones que no estén en otros videos, al final coloriza». Es la ESTRUCTURA DEL CANAL (la misma de la V9 de Los Patios y de la V13): DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA.
 *
 *   hook   HK04  «Si te gusta la seguridad de una parcelación, pero no te gusta sentirse encerrado, mira este lote.»
 *   mitad  MD02  «Dos accesos para un mismo lote, uno por la parcelación y otro por la vía veredal.»
 *   CTA    CT01  «Si quieres conocerlo, escríbeme lote y te envío toda la información.»
 *
 * LA IDEA EN UNA LÍNEA. Este lote es para quien quiere la seguridad de una parcelación sin sentirse encerrado, y lo que lo resuelve está en la ficha: dos entradas independientes, una por la
 * parcelación y otra por la vereda. El hook plantea la tensión (seguridad contra encierro), la mitad la contesta con el dato (dos accesos) y el CTA pide UNA acción de una palabra («lote»). Las
 * imágenes dicen lo mismo con lo que hay: el terreno entero desde el aire (la explanada de tierra roja, los taludes, las palmas y la cabaña), el camino entre palmas con su portón, el portón
 * de madera junto a la cerca viva, y al final la vista panorámica (la montaña y el cielo) que sube desde el lote. Ninguna cifra en pantalla ni en voz: la ficha (3.428 m², COP 800 millones)
 * va al caption.
 *
 *   bloque 1  c01                  el lote desde el aire (DR97, 10,70-14,03 s, a velocidad constante), SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia
 *   bloque 2  c02                  Isabella en la loma: el hook (entra a corte en un golpe)
 *   bloque 3  c03 c04 c05          el paseo: la explanada y su portón (DR96) → la loma a pie, hacia el valle (RC01) → los taludes hacia la tierra roja (DR98)
 *   bloque 4  c06                  Isabella, lejos, con el talud de tierra roja detrás: la mitad (a corte en el golpe más fuerte de la pieza)
 *   bloque 5  c07 c08 c09          el camino entre palmas (DR99: la entrada por la parcelación) → el portón de madera (RC04: la entrada veredal) → la vista (DR109, el plano más largo)
 *   bloque 6  c10 c11              Isabella en la loma, con los cipreses y el valle: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * LECTURA DEL PASEO (declarada, y es una INFERENCIA mía que el usuario conoce y yo no): el portón de madera de la cerca viva (RC04, y el que se ve arriba en DR96) lo leo como la entrada
 * veredal, y el camino de grava entre dos hileras de palmas que va hacia las casas (DR99, 18,4-20,8 s) como la de la parcelación; la voz de la mitad dice «uno por la parcelación
 * y otro por la vía veredal» y el bloque 5 enseña primero el camino entre palmas y después el portón. SI ES AL REVÉS, se intercambian c07 y c08 (y su razón). Es la única afirmación de
 * lugar que hacen las imágenes.
 *
 * COMPARTE CON LAS VERSIONES ANTERIORES (declarado): NADA. Es la primera pieza de esta propiedad.
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA, POR GOLPES. «Becoming» (Judah Earl, cinematic orquestal, instrumental) NO tiene un pulso constante: 41 golpes ≥ 7,4 dB en los 52 s anteriores a su caída. Se corta
 * sobre los GOLPES MEDIDOS (`medir-pista.py`, ≥ 6 dB; `musica/golpes-030.json`) y se comprueba sobre el audio del render (`herramientas/golpes-render.py`, R33). La rejilla sale de
 * `herramientas/buscar-cortes-lp.py` con la estructura del canal (72 soluciones; `musica/rejilla-becoming-72.txt`) y la elegida es la de mayor golpe más débil: 8,3 dB de corte seco
 * (el de la entrada del paseo) y todos los demás ≥ 8,6 dB; el plano más corto dura 70 f (2,3 s). Todos los `en` salen de `golpe(...)`: mover la entrada de la música es cambiar `INICIO_MUSICA`.
 * LA CANCIÓN. Libre en el registro; reservada para la V14 (`archivos/musica/registro-de-uso.md`).
 *
 * TRES TOMAS QUE ENTRAN A CORTE (decisión de oficio; las tomas tienen 0,25-0,69 s de aire antes de hablar, no los 12 frames de clip que pide una disolvencia ANTES de la primera sílaba y a la vez
 * un hueco para que la música baje). Cada una entra A CORTE en un golpe medido de 13-26 dB, que suena ENTERO; la música baja con curva de coseno DESPUÉS (6-7 f) y la primera sílaba suena a los 8,1 · 7,5 · 8,7 f del golpe,
 * con la curva ya acabada. Para eso `desde` es MÁS PEQUEÑO que su primera palabra (6 · 0 · 12 f): el aire de la toma se queda dentro del plano.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(28)` = 28/30 s) para que imagen y voz corten en la MISMA muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS:
 * cada `en` es el fin del anterior.
 *
 * TRANSICIONES. Corte seco en los diez cambios de plano (cada uno sobre un golpe de la canción); el único fundido es el de la última imagen de Isabella a negro (`FundidoACierre`). Nada más.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal): Isabella no habla hasta f108, 3,6 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la
 * prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-030.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-030";

export const FPS_030 = 30;

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
  /** `foto` solo para la tarjeta oscura del cierre (`c11-cierre`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella: el WAV de su voz TRATADA (`<toma>-voz.wav`, `normalizar.mjs`). */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido del usuario: «sube la voz en off de Isabella sin saturar»). Las voces llegan a −24,2 · −25,2 · −20,5 LUFS en su ventana de voz; cada una
 * pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1, ganancia de +19,0 · +19,4 · +17,6 dB y limitador a −2,5 dBFS) hasta −15,1 · −15,1 · −15,0 LUFS con pico real de −2,5 dBFS,
 * así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29 («una ganancia por toma y nada más»), por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Becoming» — `archivos/musica/Becoming I Judah Earl.mp3` (sha 8 `fc80918e`), cinematic orquestal instrumental, 3:04. Se entra en su golpe de 128,144 s (15,0 dB) y de ahí suena a −18,4 LUFS de meseta (con una
 * respiración a −22 LUFS entre 142 y 147 s) hasta su caída final hacia los 164 s. Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir») en que entra
 * cada plano, con su fuerza en dB por 15 ms: `proyectos/030/musica/golpes-030.json` (`medir-pista.py --json`). Salen de `buscar-cortes-lp.py`.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 0 (el lote entero, a corte). */
  apertura: { t: 128.144, db: 15.0 },
  /** Isabella entra A CORTE con el hook; su primera sílaba suena 8,1 f después. */
  hook: { t: 131.388, db: 20.3 },
  /** Acaba el hook (13 f tras su última palabra); la explanada y su portón, a corte (el golpe más débil de la pieza). */
  explanada: { t: 136.721, db: 8.3 },
  /** La loma a pie, hacia el valle. */
  loma: { t: 139.056, db: 14.9 },
  /** Los taludes hacia la tierra roja. */
  taludes: { t: 143.406, db: 20.4 },
  /** Isabella entra A CORTE con la mitad (el golpe más fuerte de la pieza); su primera sílaba suena 7,5 f después. */
  mitad: { t: 146.76, db: 25.9 },
  /** Acaba la mitad (4,5 f tras su última palabra): el camino entre palmas, a corte. */
  palmas: { t: 151.353, db: 8.6 },
  /** El portón de madera. */
  porton: { t: 153.72, db: 9.6 },
  /** La vista: DR109 sube hasta el cielo y la montaña (el plano más largo del bloque 5). */
  vista: { t: 156.046, db: 13.6 },
  /** Isabella entra A CORTE con el CTA; su primera sílaba suena 8,7 f después. */
  cta: { t: 160.726, db: 13.2 },
} as const;

/**
 * LA CAÍDA FINAL de la canción: la meseta (−18,2 LUFS) acaba hacia los 163 s; en LUFS por tramos de 5 s el primer instante que cumple (≥ 9 dB a 5 s y ≥ 20 a 10 s) es `t` = 164,0 s: ebur128 sobre `musica-030.wav`
 * da −18,8 antes y −28,1 en los 5 s siguientes (9,3 dB) y −40,4 en los 5 s tras ellos (21,7 dB); la pista acaba a los 184 s. No es un golpe sino un cambio de nivel: la resolución de esta pieza.
 */
export const DECAE = { t: 164.0, lufsAntes: -18.8, lufs5s: -28.1, lufs10s: -40.4 } as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: 50 ms antes del golpe de entrada (128,144 s), redondeado a un frame (3843/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 3843 / FPS_030;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte caiga en el
 * frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_030;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_030;

/** Isabella: un empuje lento hacia ella. El recorrido, quieto: la cámara ya avanza. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-030/${id}.mp4`;
const a = (id: string): string => `recorrido-030/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE de Luxur, la del 017 (revisión 7 de aquel): contraste con cuerpo, negros hundidos, luces recogidas, un punto cálido y +10 % de saturación. Orden del efecto: exposición → balance de blancos →
 * sombras/luces/blancos/negros → contraste → saturación → vibrance. `vibrance` ≤ 0,05 (sobre hormigón gris pinta un moteado de colores y vuelve rosadas las nubes) y las tomas de Isabella, `saturation` ≤ 1,06: la
 * piel se queda donde estaba. El AJUSTE de cada plano se mide (`herramientas/medir-color.py`), no se hereda.
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
 * El frame de cada cambio de plano: el del golpe de la canción en que entra (arriba). TODOS los cortes son secos y caen en un golpe medido.
 */
const P = {
  hook: golpe(GOLPE.hook), //             100 · Isabella entra a corte; su primera palabra, 8,1 f después
  explanada: golpe(GOLPE.explanada), //   260 · acaba el hook; la explanada y su portón
  loma: golpe(GOLPE.loma), //             330 · la loma a pie
  taludes: golpe(GOLPE.taludes), //       461 · los taludes hacia la tierra roja
  mitad: golpe(GOLPE.mitad), //           561 · Isabella entra a corte con la mitad
  palmas: golpe(GOLPE.palmas), //         699 · el camino entre palmas
  porton: golpe(GOLPE.porton), //         770 · el portón de madera
  vista: golpe(GOLPE.vista), //           840 · la vista, el plano más largo del bloque 5 (140 f)
  cta: golpe(GOLPE.cta), //               980 · Isabella entra a corte con el CTA
} as const;

/**
 * Frames que dura la toma del CTA (CT01): el clip dura 4,40 s (132 f) y desde `desde` (12 f = 0,40 s) le quedan 120. Su voz acaba a los 3,98 s (f1087 de la comp): 13 f (0,42 s) de su cara tras la última palabra,
 * en los que la imagen funde a negro (los últimos 6). Nada se congela.
 */
const DUR_CTA = 120;

/**
 * Dónde acaba la música (frame de la comp). La canción cae en el f1079 (164,0 s), dentro de la toma del CTA, y su cola llega a −40 LUFS hacia los 170 s: la envolvente la lleva a cero 2 f antes del final de la pieza,
 * bajo la tarjeta.
 */
export const FIN_MUSICA_030 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje030: readonly Corte[] = [
  // ── Bloque 1 · el lote ──
  {
    id: "c01-lote",
    bloque: 1,
    tipo: "video",
    src: v("dr97"),
    // DR97, del 10,70 al 14,03 s: vuelo hacia delante sobre el lote —la casa de tejado rojo y los árboles arriba, la cabaña, las palmas y una camioneta blanca, y las franjas segadas de la ladera— a VELOCIDAD CONSTANTE.
    // Cambia el 6,00-9,33 s de la rev. 0 (revisión 1, pedido del usuario: «la primera hay una parte que se acelera y no se ve»): ese tramo doblaba su movimiento a los 7 s del clip (4,7 → 11-12 de diferencia media entre
    // fotogramas; el dron acelera y gira) y el 0,3-3,6 s de la rev. 0 inicial estaba casi quieto. Este es el más uniforme de todo el clip (movimiento 7,3 con una dispersión del 5 %: `proyectos/030/herramientas/…`, ver
    // aprendizajes.md §11). Ninguna versión la había usado. Entra a corte con el golpe de 15,0 dB (no nace de negro) y dura 3,3 s: el máximo de una apertura.
    desde: fr(321),
    en: 0,
    dur: P.hook,
    zoom: [1.0, 1.05],
    entra: "corte",
    color: color(),
    reason:
      "Lote (la promesa): el terreno entero visto desde arriba, con la explanada de tierra roja, los taludes, la cabaña y las palmas; es lo que se vende y entra con el golpe de apertura de la música. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia. Entra a corte: no nace de negro.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk04"),
    audio: a("hk04-voz"),
    voz: {
      s0: 0.47,
      s1: 5.1,
      lufs: -15.1,
      dice: "Si te gusta la seguridad de una parcelación, pero no te gusta sentirse encerrado, mira este lote.",
    },
    // La voz empieza a los 0,47 s (14,1 f; antes, 0,4 s de viento grave) y acaba a los 5,10 s (153 f); el clip dura 5,87 s (176 f). `desde` 6 f entra A CORTE en el golpe de 20,3 dB del f100 (suena entero: la música baja
    // en los 7 f siguientes) y la primera sílaba suena a los 8,1 f del golpe, con la curva ya acabada. El plano dura 160 f (hasta el golpe del f260): 13 f tras la última palabra; el clip aguanta 170.
    // «sentirse» (no «sentirte»): lo que se oye, conf. 0,98 en cuatro cortes (ver `subtitulos-030.ts`). «parcelación»: sin vocabulario whisper oyó «persalación»; con él, bien (conf. 0,70).
    desde: fr(6),
    en: P.hook,
    dur: P.explanada - P.hook,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ saturation: 1.0, contrast: 1.05, highlights: -0.35, whites: -0.2, exposure: -0.05 }),
    reason:
      "Loma (el filtro): Isabella, en la loma con las montañas y una casa de tejado rojo detrás, dice «si te gusta la seguridad de una parcelación, pero no te gusta sentirse encerrado, mira este lote»: la tensión que el resto contesta. Entra a corte en un golpe de la música.",
  },
  // ── Bloque 3 · el paseo: la explanada, la loma a pie y los taludes ──
  {
    id: "c03-explanada",
    bloque: 3,
    tipo: "video",
    src: v("dr96"),
    // DR96, del 6,50 al 8,83 s: sobre la explanada de tierra roja, con la cerca viva y su portón al fondo y la colina verde detrás; la cámara avanza y asoma el primer talud engramado.
    // Ninguna versión la había usado. Es el plano más corto de la pieza (70 f).
    desde: fr(195),
    en: P.explanada,
    dur: P.loma - P.explanada,
    zoom: [1.0, 1.04],
    entra: "corte",
    color: color({ exposure: -0.08 }),
    reason:
      "Explanada (la primera mirada): tras «mira este lote», la tierra roja de la explanada con la cerca viva y su portón al fondo y el primer talud que asoma; es el terreno visto de cerca y la cámara avanza como lo hará todo el paseo.",
  },
  {
    id: "c04-loma",
    bloque: 3,
    tipo: "video",
    src: v("rc01"),
    // RC01 (IMG_1579), del 1,80 al 6,17 s: a pie en la loma, una panorámica lenta hacia la derecha —las montañas, las palmas y una casa de tejado rojo entre ellas, y el valle verde con el cielo azul—. La cámara está
    // a la altura de una persona: es lo que se ve al llegar. Es el plano de recorrido más largo de la pieza (131 f). Tono HLG → BT.709 de `normalizar.mjs`.
    desde: fr(54),
    en: P.loma,
    dur: P.taludes - P.loma,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1, highlights: -0.35, whites: -0.2, saturation: 1.0, contrast: 1.04 }),
    reason:
      "Loma (estar ahí): del aire a pie; la panorámica lenta de la loma hacia las montañas y el valle, con las palmas y el cielo azul, es lo que se ve al llegar y la dirección es la del plano anterior (hacia delante).",
  },
  {
    id: "c05-taludes",
    bloque: 3,
    tipo: "video",
    src: v("dr98"),
    // DR98, del 13,00 al 16,33 s: vuelo sobre los taludes engramados hacia la tierra roja, con la sombra de los eucaliptos dibujando su borde en la explanada. Ninguna versión la había usado.
    desde: fr(390),
    en: P.taludes,
    dur: P.mitad - P.taludes,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1 }),
    reason:
      "Taludes (la medida): el vuelo sobre los taludes hacia la tierra roja da la escala del lote y es el último paso del paseo antes de que Isabella vuelva; la cámara sigue avanzando.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md02"),
    audio: a("md02-voz"),
    voz: {
      s0: 0.25,
      s1: 4.4,
      lufs: -15.1,
      dice: "Dos accesos para un mismo lote, uno por la parcelación y otro por la vía veredal.",
    },
    // La voz empieza a los 0,25 s (7,5 f) y acaba a los 4,40 s (132 f); el clip dura 7,64 s (229 f) pero tras la voz solo hay 3,2 s de ruido. `desde` 0 entra A CORTE en el golpe de 25,9 dB del f561 (el más fuerte de la pieza;
    // suena entero: la música baja en los 6 f siguientes) y la primera sílaba suena a los 7,5 f del golpe. El plano dura 138 f (hasta el golpe del f699): 4,5 f tras la última palabra.
    // POR CONFIRMAR AL OÍDO: «vía veredal» (f ≈ 671; whisper oye «vía de veredal», conf. 0,45): ver `subtitulos-030.ts`.
    // Isabella está LEJOS (cuerpo entero, a unos metros, con el perro y el talud de tierra roja detrás): el empuje llega a 1,08.
    desde: fr(0),
    en: P.mitad,
    dur: P.palmas - P.mitad,
    zoom: [1.0, 1.08],
    entra: "corte",
    color: color({ exposure: 0.15, saturation: 1.0, contrast: 1.05, highlights: -0.3, whites: -0.2 }),
    reason:
      "Loma (el dato): Isabella, lejos, con el perro y el talud de tierra roja detrás, dice «dos accesos para un mismo lote, uno por la parcelación y otro por la vía veredal»: el hecho que contesta al hook (seguridad sin encierro) y que el bloque siguiente enseña. Entra a corte en el golpe más fuerte.",
  },
  // ── Bloque 5 · las dos entradas y la vista ──
  {
    id: "c07-palmas",
    bloque: 5,
    tipo: "video",
    src: v("dr99"),
    // DR99, del 18,40 al 20,77 s: el camino de grava entre dos hileras de palmas que va hacia las casas de tejado rojo, con la cabaña y los taludes a la izquierda y los eucaliptos detrás; la cámara avanza a VELOCIDAD CONSTANTE
    // (movimiento 5,4, dispersión del 5 %). LECTURA MÍA (declarada arriba): la entrada por la parcelación. Cambia el DR97 38,5-40,87 s de la rev. 0 (revisión 1, pedido del usuario: «cambia la toma de 0:24»): ese tramo
    // entraba justo al final de un tirón del dron (movimiento 12 → 2 en los 5 primeros fotogramas), se quedaba casi quieto (0,4-0,5) y daba otro tirón a los 40 s.
    desde: fr(552),
    en: P.palmas,
    dur: P.porton - P.palmas,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.08 }),
    reason:
      "Entrada de la parcelación (la primera): tras «uno por la parcelación», el camino de grava entre las palmas que va hacia las casas, con la cabaña del lote a un lado; la cámara avanza por él a velocidad constante y es lo primero que muestra el bloque.",
  },
  {
    id: "c08-porton",
    bloque: 5,
    tipo: "video",
    src: v("rc04"),
    // RC04 (IMG_1582), del 0,00 al 2,33 s: a pie junto al portón de madera de la cerca viva, de cerca, con el cielo azul detrás; la cámara avanza por el talud. LECTURA MÍA (declarada arriba): la entrada veredal.
    // Se oye otra persona decir «sí, sí» en la toma original: el plano va mudo y el audio no se usa.
    desde: fr(0),
    en: P.porton,
    dur: P.vista - P.porton,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.2, shadows: 0.25, saturation: 1.0, contrast: 1.05, highlights: -0.3, whites: -0.2 }),
    reason:
      "Entrada veredal (la segunda): tras «otro por la vía veredal», el portón de madera junto a la cerca viva visto a pie; es la otra entrada y la cámara avanza como en todos los planos del paseo.",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("dr109"),
    // DR109, del 28,00 al 32,67 s (el clip dura 32,77 s: 3 f de sobra): sobre la cabaña y las palmas, la cámara sube y levanta la mirada hasta la montaña y el cielo azul. Ninguna versión la usó.
    // Es el plano más largo del bloque 5 (140 f) y el clímax del paseo: la vista panorámica de la ficha. Entra a corte en un golpe de 13,6 dB.
    desde: fr(840),
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.06, highlights: -0.5, whites: -0.3 }),
    reason:
      "La vista (el clímax): sobre las palmas y la cabaña, la cámara sube hasta la montaña y el cielo azul; es la vista panorámica del lote y el plano más largo del bloque. Entra a corte en un golpe.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct01"),
    audio: a("ct01-voz"),
    voz: {
      s0: 0.69,
      s1: 3.98,
      lufs: -15.0,
      dice: "Si quieres conocerlo, escríbeme lote y te envío toda la información.",
    },
    // La voz empieza a los 0,69 s (20,7 f) y acaba a los 3,98 s (119,4 f); el clip dura 4,40 s (132 f). `desde` 12 f entra A CORTE en el golpe de 13,2 dB del f980 (suena entero: la música baja en los 6 f siguientes) y la
    // primera sílaba suena a los 8,7 f. El clip llega a su último fotograma (12 + 120 = 132). La caída final de la canción (164,0 s) cae a los 99 f de la entrada (f1079), dentro de «…toda la información».
    // POR CONFIRMAR AL OÍDO: «escríbeme» (f ≈ 1021; whisper conf. 0,42): ver `subtitulos-030.ts`.
    desde: fr(12),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ saturation: 1.02, shadows: 0.15 }),
    reason:
      "Loma (la invitación): Isabella, con los cipreses y el valle detrás, dice «si quieres conocerlo, escríbeme lote y te envío toda la información», una sola acción de una palabra. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-030.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-030/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_030 = P.cta + DUR_CTA + DUR_TARJETA;
