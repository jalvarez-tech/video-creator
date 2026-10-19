/**
 * EL RECORRIDO 041 — «Lote en El Carmen de Viboral (Mia)», V24 del registro y QUINTO reel de esta propiedad — los planos, como DATOS.
 *
 * Pedido (2026-10-17, lote de cuatro reels a la vez): ángulo «TODO LO QUE ESTÁS COMPRANDO». Abre con el dato (el área y el precio, dichos por Isabella), el recorrido ENSEÑA lo que se compra (el lote entero desde arriba,
 * sus dos accesos, la cabaña, la vista) y cierra con «escríbeme lote». Es la ESTRUCTURA DEL CANAL: DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA.
 *
 *   hook   HK07  «3.428 metros cuadrados por 800 millones. Vente, te muestro todo lo que estás comprando.»
 *   mitad  MD01  «Dos accesos para un mismo lote, una por la parcelación y otra por la vía veredal.»
 *   CTA    CT01  «Si quieres conocerlo, escríbeme lote y te envío toda la información.»   (REPETIDA de la V14: no queda ningún CTA limpio)
 *
 * LA IDEA EN UNA LÍNEA. Este lote se compra ENTERO: el hook pone sobre la mesa lo que se paga (el área y el precio) y promete enseñarlo «todo»; el paseo lo cumple (el lote desde arriba, la cabaña, la vista alta con los
 * árboles y la cancha redonda, las terrazas con la luz de la tarde), la mitad nombra los dos accesos, el bloque 5 los enseña (el portón de madera de la vereda y la vía por la que se llega) y cierra con la vista del
 * atardecer, y el CTA pide UNA acción: la palabra «lote».
 *
 *   bloque 1  c01                  el lote entero desde arriba: el árbol grande, la vía y la explanada roja (DR233, cenital), SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia
 *   bloque 2  c02                  Isabella sube la loma hacia cámara: el hook (entra a corte en un golpe)
 *   bloque 3  c03 c04 c05          el paseo: la cabaña entre las palmas (DR96) → la vista alta con los eucaliptos y la cancha redonda (DR210, atardecer) → las terrazas con la luz dorada (DR201)
 *   bloque 4  c06                  Isabella junto al talud de tierra roja, con el perro y el portón detrás: la mitad (a corte en un golpe)
 *   bloque 5  c07 c08 c09          el portón de madera, el acceso por la vereda (RC04) → la vía vista desde arriba (DR233) → la vista del atardecer (DR201, el plano más largo del bloque)
 *   bloque 6  c10 c11              Isabella con los cipreses y el valle: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * LA CIFRA (choque declarado con la regla «una sola cifra como mucho y nunca en los bloques 5 y 6»). HK07 es la toma asignada y dice el ÁREA y el PRECIO en la misma frase: «3.428 metros cuadrados por 800 millones».
 * El texto sigue a lo que se oye, así que en pantalla van las dos como UNA sola afirmación (el lote y lo que cuesta), en el bloque 2; fuera de ahí no hay ninguna otra cifra, ni dato en el centro ni en el cierre, y los
 * bloques 5 y 6 no llevan ninguna. El CTA no las repite. La alternativa (pintar solo una) deja una cifra dicha y sin escribir; la puerta (2a) falla si aparece otra cifra.
 *
 * COMPARTE CON LAS VERSIONES ANTERIORES (declarado; la puerta, 7b, mide los segundos): ningún hook ni mitad, y los drones son los NUEVOS del 2026-10-14 (DR201, DR210, DR233; ninguna versión los había usado) más DR96 en otro tramo
 * (V14 6,5-8,83 s · V18 18,60-20,57 · V22 11,30-15,47; aquí 15,60-17,47). El CTA, CT01, es la MISMA toma de la V14 (y de su doble CT02 en la V22). RC04 (el portón, 0,90-4,10 s) repite el de la V14 (0,0-2,33) y el de la
 * V22 (2,40-3,93): es el único plano que enseña el acceso por la vereda y los recorridos se pueden repetir.
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA, POR GOLPES. «Epic Inspirational and Cinematic Motivational» (AShamaluevMusic, 3:11, épico/motivacional) se corta sobre los GOLPES MEDIDOS (`medir-pista.py`, ≥ 6 dB;
 * `proyectos/041/musica/golpes-041.json`) y se comprueba sobre el audio del render (`herramientas/golpes-render.py`, R33). La rejilla sale de `herramientas/buscar-cortes-039.py` con las ventanas reales de los planos
 * (`musica/buscar-cortes-epic-pasada6-8db.txt`): de las cuatro canciones del grupo, solo esta da una (las otras, 0 soluciones a ≥ 9 dB; a 7,4 dB, *In This Together* —su cola, a −26 LUFS— y *Deep Breath* —ambient—).
 * Golpes de 8,7 a 10,3 dB: la canción es una pared de percusión y ningún golpe sobresale más (el más débil, el fin del hook y el de entrada del CTA, 8,7). Todos los `en` salen de `golpe(...)`.
 * LA CANCIÓN: libre en el grupo; reservada para la V24. Medida, no oída; licencia sin verificar.
 *
 * TRES TOMAS QUE ENTRAN A CORTE: cada una en un golpe medido que suena ENTERO; la música baja con curva de coseno DESPUÉS y la primera sílaba suena a ≥ 8,2 f del golpe. Para eso `desde` es más pequeño que su primera
 * palabra (4 · 4 · 12 f).
 *
 * LOS DRONES SE ELIGIERON POR SU MOVIMIENTO (030 rev. 1): cada tramo es la ventana más uniforme del largo de su plano (`herramientas/ventana-fina.py`: diferencia media entre fotogramas, dispersión, pendiente y máximo/media).
 * Los números de cada uno, en su comentario. LAS EXCEPCIONES DECLARADAS: c03 (DR96: el dron acelera al bajar hacia la cabaña, dispersión 0,14 y pendiente +0,25) y c09 (DR201: el ascenso frena al acabar, 0,09 y −0,25;
 * un final que se asienta). Los demás, ≤ 0,05 (los cenitales, 0,02).
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(11)` = 11/30 s) para que imagen y voz corten en la MISMA muestra; `en` y `dur`, en frames de la composición. Los planos son
 * CONTIGUOS: cada `en` es el fin del anterior. Los DJI van a 29,97 fps y `normalizar.mjs` los pasa a 30 (ninguno de los tramos de aquí cae en el fotograma repetido de los ≈ 33 s: se comprobó que los cinco clips no
 * tienen ningún par de fotogramas iguales).
 *
 * TRANSICIONES. Corte seco en los diez cambios de plano (cada uno sobre un golpe de la canción); el único fundido es el de la última imagen de Isabella a negro (`FundidoACierre`). Nada más.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal): Isabella no habla hasta el f123, 4,1 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py` (antes/después con `stills-antes.mjs`). Isabella se rodó
 * de día y los drones nuevos al atardecer: el ajuste de cada plano busca que se parezcan sin quemar el cielo dorado. Con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg
 * (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-041.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-041";

export const FPS_041 = 30;

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
  /** `foto` solo para la tarjeta oscura del cierre (`c11-cierre`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella: el WAV de su voz TRATADA (`<toma>-voz.wav`, `normalizar.mjs`). */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido del canal: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −25,2 · −20,0 · −20,6 LUFS en su ventana de voz; cada una pasa por la
 * cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia de +19,4 · +18,0 · +17,6 dB buscada con `probar-voz.py` y limitador a −2,5 dBFS) hasta −15,1 · −15,1 · −15,0 LUFS con
 * pico real de −2,5 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29 («una ganancia por toma y nada más»), por encargo del canal.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Epic Inspirational and Cinematic Motivational» — `archivos/musica/Epic Inspirational and Cinematic Motivational - by AShamaluevMusic.mp3` (sha 8 `38c75296`), 3:11. Se entra en su golpe de 47,147 s (9,1 dB) y de
 * ahí suena a −12,3…−10,3 LUFS por tramos de 5 s (picos de −0,8 a +0,1 dBFS) con un crescendo suave hasta el 79,9 s. Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante
 * es el de «empieza a subir») en que entra cada plano, con su fuerza en dB por 15 ms: `proyectos/041/musica/golpes-041.json` (`medir-pista.py --json`). Salen de `buscar-cortes-039.py`.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 0 (el lote desde arriba, a corte). */
  apertura: { t: 47.147, db: 9.1 },
  /** Isabella entra A CORTE con el hook; su primera sílaba suena 8,45 f después. */
  hook: { t: 50.868, db: 8.7 },
  /** Acaba el hook (16,3 f tras su última palabra): la cabaña entre las palmas. */
  cabana: { t: 57.263, db: 9.1 },
  /** La vista alta con los eucaliptos y la cancha redonda (el golpe más fuerte de la pieza). */
  alta: { t: 59.149, db: 10.3 },
  /** Las terrazas con la luz dorada. */
  terrazas: { t: 61.469, db: 8.8 },
  /** Isabella entra A CORTE con la mitad; su primera sílaba suena 8,3 f después. */
  mitad: { t: 64.336, db: 9.0 },
  /** Acaba la mitad (16,9 f tras su última palabra): el portón de la vereda. */
  porton: { t: 69.962, db: 8.7 },
  /** La vía vista desde arriba. */
  via: { t: 73.136, db: 8.8 },
  /** La vista del atardecer (el plano más largo del bloque 5). */
  vista: { t: 75.323, db: 9.7 },
  /** Isabella entra A CORTE con el CTA; su primera sílaba suena 8,25 f después. */
  cta: { t: 79.899, db: 8.7 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: 47 ms antes del golpe de entrada (47,147 s), redondeado a un frame (1413/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 1413 / FPS_041;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_041;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_041;

/** Isabella: un empuje lento hacia ella (camina hacia cámara: el empuje la acompaña). El recorrido, quieto: la cámara ya avanza. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-041/${id}.mp4`;
const a = (id: string): string => `recorrido-041/${id}.wav`;

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
  hook: golpe(GOLPE.hook), //         115 · Isabella entra a corte; su primera palabra, 8,45 f después
  cabana: golpe(GOLPE.cabana), //     307 · acaba el hook; la cabaña
  alta: golpe(GOLPE.alta), //         363 · la vista alta
  terrazas: golpe(GOLPE.terrazas), // 433 · las terrazas con la luz dorada
  mitad: golpe(GOLPE.mitad), //       519 · Isabella entra a corte con la mitad
  porton: golpe(GOLPE.porton), //     687 · el portón de la vereda
  via: golpe(GOLPE.via), //           783 · la vía vista desde arriba
  vista: golpe(GOLPE.vista), //       848 · la vista del atardecer, el plano más largo del bloque 5 (138 f)
  cta: golpe(GOLPE.cta), //           986 · Isabella entra a corte con el CTA
} as const;

/**
 * Frames que dura la toma del CTA (CT01): el clip dura 4,40 s (132 f) y desde `desde` (12 f = 0,4 s) le quedan 120. Su voz («si quieres conocerlo, escríbeme lote y te envío toda la información») va de 0,675 a
 * 4,0 s (f994-1094 de la comp): 12,6 f (0,42 s) de su cara tras la última palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela: el plano acaba en el f131 del clip, el último.
 */
const DUR_CTA = 120;

/**
 * Dónde acaba la música (frame de la comp): se apaga con curva tras la última palabra del CTA y llega a cero 2 f antes del final de la pieza (la tarjeta va en silencio).
 */
export const FIN_MUSICA_041 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje041: readonly Corte[] = [
  // ── Bloque 1 · el lote desde arriba ──
  {
    id: "c01-lote",
    bloque: 1,
    tipo: "video",
    src: v("dr233"),
    // DR233 (vertical, 4K, 2026-10-14 ≈ 17:53), del 7,30 al 11,13 s: cenital. El árbol grande a la izquierda, la vía gris que lo rodea y la explanada roja arriba a la derecha; el dron avanza sobre el lote a velocidad
    // constante (movimiento 2,9, dispersión 0,024, pendiente −0,05, máximo 1,05×). Ninguna versión había usado este clip. Entra a corte con el golpe de 9,1 dB del f3 (no nace de negro).
    desde: fr(219),
    en: 0,
    dur: P.hook,
    zoom: [1.0, 1.05],
    entra: "corte",
    color: color({ exposure: 0.15, shadows: 0.12, highlights: -0.25, saturation: 1.06, vibrance: 0.02 }),
    reason:
      "Lote desde arriba (la promesa): el lote entero visto desde el aire —el árbol grande, la vía que lo bordea, la explanada de tierra roja— es lo que se compra, y el hook va a ponerle precio. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia. Entra a corte: no nace de negro.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk07"),
    audio: a("hk07-voz"),
    voz: {
      s0: 0.415,
      s1: 5.99,
      lufs: -15.1,
      dice: "3.428 metros cuadrados por 800 millones. Vente, te muestro todo lo que estás comprando.",
    },
    // La voz empieza a los 0,415 s (12,45 f; antes, 0,3 s de ruido grave a −68 dBFS que la ventana de la voz tratada deja en silencio) y acaba a los 5,99 s (179,7 f); el clip dura 6,6 s (198 f, a 29,97 fps normalizado a
    // 30). `desde` 4 f entra A CORTE en el golpe de 8,7 dB del f115 (suena entero: la música baja en los 6 f siguientes) y la primera sílaba suena a los 8,45 f del golpe. El plano dura 192 f (hasta el golpe del f307):
    // 16,3 f tras la última palabra; usa el clip hasta el f195 de 198.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-041.ts`): «te muestro» (≈ 7,9-8,4 s del vídeo; whisper oye «20 muestros», confianza 0,3 en «te»; `formantes.py` no cierra si son 4 sílabas o 5).
    // Isabella sube la loma de césped hacia cámara, pequeña en el cuadro, con un árbol grande a la derecha y el cielo nublado: el empuje la acompaña.
    desde: fr(4),
    en: P.hook,
    dur: P.cabana - P.hook,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.05, highlights: -0.35, whites: -0.2, saturation: 1.04 }),
    reason:
      "Loma de césped (el dato): Isabella sube hacia cámara y dice «3.428 metros cuadrados por 800 millones. Vente, te muestro todo lo que estás comprando»: lo que se paga, y la promesa de enseñarlo entero. Entra a corte en un golpe de la música.",
  },
  // ── Bloque 3 · el paseo: la cabaña, la vista alta y las terrazas ──
  {
    id: "c03-cabana",
    bloque: 3,
    tipo: "video",
    src: v("dr96"),
    // DR96 (vertical, de día), del 15,60 al 17,47 s: el dron baja despacio sobre la pared de terrazas y la cabaña de madera asoma a la derecha entre las palmas (movimiento 2,3, dispersión 0,14, pendiente +0,25, máximo
    // 1,17×: EXCEPCIÓN declarada, el descenso gana velocidad). La V14 usó este clip en 6,5-8,83 s, la V18 en 18,60-20,57 y la V22 en 11,30-15,47: este tramo, nadie (empieza 0,13 s después del de la V22).
    desde: fr(468),
    en: P.cabana,
    dur: P.alta - P.cabana,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.1, highlights: -0.3, whites: -0.15, saturation: 1.12, vibrance: 0.03 }),
    reason:
      "Cabaña (lo que hay dentro): tras «todo lo que estás comprando», el primer plano baja a la cabaña de madera entre las palmas: lo construido que viene con el lote.",
  },
  {
    id: "c04-alta",
    bloque: 3,
    tipo: "video",
    src: v("dr210"),
    // DR210 (vertical, 2026-10-14 ≈ 17:44), del 6,10 al 8,43 s: vista alta sobre los eucaliptos hacia la explanada roja con las terrazas y, abajo, la cancha circular de césped; las colinas y los tejados del valle al fondo
    // con la luz del último sol. Velocidad constante (movimiento 1,5, dispersión 0,048, pendiente +0,04, máximo 1,11×). Entra con el golpe más fuerte de la pieza (10,3 dB).
    desde: fr(183),
    en: P.alta,
    dur: P.terrazas - P.alta,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.1, shadows: 0.12, highlights: -0.3, whites: -0.15, saturation: 1.1, vibrance: 0.03 }),
    reason:
      "Vista alta (el lote en su sitio): desde arriba, los eucaliptos, las terrazas, la explanada roja y la cancha redonda con el valle detrás: se ve dónde está cada cosa de lo que se compra.",
  },
  {
    id: "c05-terrazas",
    bloque: 3,
    tipo: "video",
    src: v("dr201"),
    // DR201 (vertical, 2026-10-14 ≈ 17:41), del 2,00 al 4,87 s: vuelo bajo sobre las terrazas engramadas, con una palma a la izquierda y los eucaliptos y el cielo violeta arriba; asciende despacio (movimiento 1,9,
    // dispersión 0,030, pendiente −0,01, máximo 1,09×). Ninguna versión había usado este clip. Es el último paso del paseo antes de que Isabella vuelva.
    desde: fr(60),
    en: P.terrazas,
    dur: P.mitad - P.terrazas,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05, shadows: 0.15, highlights: -0.3, whites: -0.15, saturation: 1.04, vibrance: 0.02 }),
    reason:
      "Terrazas (la medida): a ras de las terrazas se nota cuánto terreno hay y cómo se sube; la luz dorada anuncia el final del recorrido y deja a Isabella a la puerta de la mitad.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md01"),
    audio: a("md01-voz"),
    voz: {
      s0: 0.41,
      s1: 5.17,
      lufs: -15.1,
      dice: "Dos accesos para un mismo lote, una por la parcelación y otra por la vía veredal.",
    },
    // La voz empieza a los 0,41 s (12,3 f) y acaba a los 5,17 s (155,1 f); el clip dura 5,8 s (174 f). `desde` 4 f entra A CORTE en el golpe de 9,0 dB del f519 (suena entero: la música baja en los 6 f siguientes) y la
    // primera sílaba suena a los 8,3 f del golpe. El plano dura 168 f (hasta el golpe del f687): 16,9 f tras la última palabra; usa el clip hasta el f172 de 174.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-041.ts`): «vía veredal» (≈ 21,6-22,4 s del vídeo; whisper oye «vida verdad», confianza 0,12; `formantes.py` midió seis sílabas [a][i][a][e][e][a]: «la vía veredal»). Dice «una… otra»: el texto sigue a lo que se oye.
    // Isabella, junto al talud de tierra roja con el perro y el portón detrás: señala a un lado y a otro al decir «una… otra» (los dos accesos). Cielo azul.
    desde: fr(4),
    en: P.mitad,
    dur: P.porton - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, highlights: -0.35, whites: -0.2, saturation: 1.0 }),
    reason:
      "Talud de tierra roja (la razón): Isabella dice «dos accesos para un mismo lote, una por la parcelación y otra por la vía veredal» y señala a un lado y a otro: nombra lo que el bloque siguiente va a enseñar. Entra a corte en un golpe.",
  },
  // ── Bloque 5 · los dos accesos y la vista ──
  {
    id: "c07-porton",
    bloque: 5,
    tipo: "video",
    src: v("rc04"),
    // RC04 (IMG_1582), del 0,90 al 4,10 s: a pie, junto al portón de madera de la cerca viva; el paneo sigue la valla y descubre el valle y las montañas por la derecha (movimiento 5,8, dispersión 0,12, pendiente 0,00,
    // máximo 1,18×). REPITE el portón de la V14 (0,0-2,33 s) y de la V22 (2,40-3,93 s): es el único plano que enseña el acceso por la vereda (declarado).
    desde: fr(27),
    en: P.porton,
    dur: P.via - P.porton,
    zoom: QUIETO,
    entra: "corte",
    color: color({ contrast: 1.04, highlights: -0.35, whites: -0.2, saturation: 1.0 }),
    reason:
      "Portón (el acceso de la vereda): a pie, junto al portón de madera: justo después de «la vía veredal», se ve por dónde se entra por ese lado.",
  },
  {
    id: "c08-via",
    bloque: 5,
    tipo: "video",
    src: v("dr233"),
    // DR233 (vertical), del 14,20 al 16,37 s: cenital sobre la explanada roja y la vía que la cierra por abajo, con la fila de palmas a la derecha; velocidad constante (movimiento 3,1, dispersión 0,022, pendiente −0,06,
    // máximo 1,05×). Es el mismo vuelo del frame 0 (c01: 7,30-11,13 s), 3 s después y mirando la vía en lugar del árbol.
    desde: fr(426),
    en: P.via,
    dur: P.vista - P.via,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.15, shadows: 0.12, highlights: -0.25, saturation: 1.06, vibrance: 0.02 }),
    reason:
      "Vía (el acceso por la parcelación): desde arriba se ve la vía que bordea el lote por abajo, por donde se llega: el segundo acceso, con la explanada y las palmas detrás.",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("dr201"),
    // DR201 (vertical), del 18,40 al 23,00 s: el ascenso llega arriba y el cielo se enciende: nubes violetas y doradas sobre la loma con sus árboles, la explanada roja y las terrazas debajo; frena al acabar (movimiento
    // 0,7, dispersión 0,091, pendiente −0,25, máximo 1,45×: EXCEPCIÓN declarada, un final que se asienta). Es el plano más largo del bloque 5 (138 f) y el clímax: la vista del atardecer. Usa el clip hasta su último
    // fotograma.
    desde: fr(552),
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05, shadows: 0.25, blacks: 0, highlights: -0.45, whites: -0.25, saturation: 1.02, vibrance: 0 }),
    reason:
      "La vista (el clímax): el atardecer sobre el lote —el cielo dorado y violeta, la loma, la explanada—: lo que se ve cada tarde desde lo que se compra; el plano más largo del bloque. Entra a corte en un golpe.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct01"),
    audio: a("ct01-voz"),
    voz: {
      s0: 0.675,
      s1: 4.0,
      lufs: -15.0,
      dice: "Si quieres conocerlo, escríbeme lote y te envío toda la información.",
    },
    // La voz empieza a los 0,675 s (20,25 f) y acaba a los 4,0 s (120 f); el clip dura 4,4 s (132 f). `desde` 12 f entra A CORTE en el golpe de 8,7 dB del f986 (suena entero: la música baja en los 6 f siguientes) y la
    // primera sílaba suena a los 8,25 f del golpe. El plano dura 120 f (hasta el último fotograma del clip, el f131): la voz acaba a los 107,4 f del plano y quedan 12,6 f de su cara, con los últimos 6 fundiendo a negro.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-041.ts`): «escríbeme» (≈ 34,2-35,0 s del vídeo; whisper oye «escríbeme elote»; `formantes.py` midió [i][e][e][o][e]: sin una «e» de más).
    // Isabella en plano medio con los cipreses y el valle detrás, con las manos juntas.
    desde: fr(12),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, highlights: -0.35, whites: -0.2, saturation: 1.04 }),
    reason:
      "Cipreses y valle (la invitación): Isabella dice «si quieres conocerlo, escríbeme lote y te envío toda la información», una sola acción de una palabra. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-041.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-041/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_041 = P.cta + DUR_CTA + DUR_TARJETA;
