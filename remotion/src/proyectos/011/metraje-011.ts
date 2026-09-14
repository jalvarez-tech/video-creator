/**
 * PLAN DE MONTAJE — proyecto 011 · Boda (1080×1920 · 30 fps · 3600 f · 120 s).
 * Artefactos: proyectos/011/artefactos/{01-plan,02-layout,03-timeline}.md
 *
 * EL ENCARGO, literal: todos los archivos de la carpeta Boda, 2 minutos, la
 * boda con «Turning Page» y la rumba con «El Preso»; de cada vídeo, su mejor
 * parte; todo en mute con la música de fondo; y al inicio el título
 * «Boda María & Daniel».
 *
 * LA MÚSICA CAMBIA EN EL 1:18, NO EN EL 1:00 (corrección del cliente sobre la
 * prueba). Son dos fronteras distintas y conviene no confundirlas:
 *   · `CAPITULO` (f1800, 1:00) — frontera VISUAL: de la glorieta al salón. Fundido
 *     a negro en un respiro de Turning Page, pero la canción sigue.
 *   · `RELEVO` (f2340, 1:18) — frontera MUSICAL: muere Turning Page (en otro
 *     respiro, 79,4 s de la canción) y entra el primer golpe de El Preso, justo
 *     cuando la novia empieza a levantar el cuchillo del pastel (`r06`).
 * Los ids `r01`-`r05` (brindis, champán, beso, risas) conservan la `r` del salón
 * aunque ahora suenen con la balada.
 *
 * HERMANO DEL `metraje-010.ts`, con lo que este material cambia:
 *
 *   · SIN MARCA Y CON UN SOLO TEXTO. Es una pieza personal, no de un canal: no
 *     hay sello ni subtítulos, y el único texto es el título de apertura, que
 *     vive en `Titulo011.tsx` y trae su propio velo. Por eso el intérprete de
 *     esta pieza no pinta los velos de franja del 010 y el look no sale de
 *     `src/marcas/`, sale de `LOOK_011` en la composición.
 *   · LA MÚSICA DA LA RETÍCULA. Sin voz, los cortes caen en golpes MEDIDOS de
 *     cada canción (energía por bandas con ffmpeg, no a oído): las notas de
 *     piano de Turning Page (~1,05 s) y los golpes de El Preso (~104,5 BPM,
 *     con la deriva de una banda en vivo — por eso golpes medidos y no un
 *     metrónomo). La tabla de golpes está en 03-timeline.md.
 *   · `entra: "negro"` y `salidaNegro`. La glorieta muere a negro (`c19`), el
 *     salón nace de negro (`r01`) y la pieza termina a negro (`r14`). El primer
 *     plano NO nace de negro: su frame 0, con el título, es la miniatura.
 *
 * `desde` VA EN SEGUNDOS DEL CLIP FUENTE, como en 009 y 010: describe el
 * material, no el fps de esta comp. Los clips ya están normalizados a 30 fps.
 *
 * «LA MEJOR PARTE DE CADA UNO» — cómo se eligió cada `desde`: hoja de
 * contactos del clip entero → métricas por fotograma a 10 fps (nitidez con
 * `blurdetect`, movimiento con `YDIF`, luz con `YAVG`) → hoja densa (0,25 s) de
 * la ventana candidata. El `reason` de cada corte dice qué se vio.
 *
 * DOS TRAMOS DEL MISMO CLIP, y solo donde el clip los tiene: `IMG_2230` (el
 * abrazo y, 30 s después, el velo) y, en la rumba, los tres clips largos de
 * pista (`IMG_2290`, `IMG_2291`, `IMG_2293`). No es relleno: la pista de baile
 * es la parte más movida del material, y 42 s de salsa con un plano por clip
 * saldrían a 7 s por plano. Nunca se repite un tramo (`revisar-011.mjs`).
 */

/** Corrección POR TRAMO, medida con `signalstats` (objetivo ~118 de luma). */
export interface Grado {
  /** Multiplicador de brillo. Aquí solo sube: los tramos claros son de vestido blanco y cielo, y esa luz es el look. */
  exposicion?: number;
}

/**
 * Cómo entra un plano.
 *   `corte`    — el defecto, y el único de la rumba: la salsa corta en seco.
 *   `disolver` — solo en la boda y solo en cambios de tono (§entra en 03-timeline).
 *   `negro`    — nace de negro (la entrada al salón, `r01`, en el CAPITULO).
 */
export type Entrada = "corte" | "disolver" | "negro";

export interface Corte {
  id: string;
  /** `video` reproduce; `foto` sostiene. La foto ignora `desde`. */
  tipo: "video" | "foto";
  /** Ruta dentro de `remotion/public/`. */
  src: string;
  /** SEGUNDO de entrada en el clip FUENTE. Solo vídeo. */
  desde?: number;
  /** Frame ABSOLUTO de la comp en el que entra. */
  en: number;
  /** Frames que dura EN LA COMP. */
  dur: number;
  /**
   * Punch-in: escala al entrar → escala al salir. Techo 1,12: los clips se
   * normalizaron a 1296 px (1080 × 1,2) y a esa escala todavía se reduce.
   */
  zoom: readonly [number, number];
  /**
   * % del alto que se SUBE el plano. Positivo enseña la parte de abajo. Límite
   * sin enseñar el borde: `(escala mínima − 1) / 2 × 100`.
   */
  pan?: number;
  entra?: Entrada;
  /** Frames de fundido a negro al final del plano. */
  salidaNegro?: number;
  grado?: Grado;
  reason: string;
}

export const FPS_011 = 30;
/** Frontera VISUAL (1:00): de la ceremonia al salón. La música no cambia aquí. */
export const CAPITULO = 1800;
/** Frontera MUSICAL (1:18): termina Turning Page y entra El Preso. */
export const RELEVO = 2340;
export const DURACION_011 = 3600;

/* ── FUENTES (normalizadas por proyectos/011/normalizar.sh) ───────────────── */
const F_2270 = "boda-011/IMG_2270.jpg";
const F_ANILLOS = "boda-011/anillos.jpg";
const V_2199 = "boda-011/IMG_2199.mp4";
const V_2200 = "boda-011/IMG_2200.mp4";
const V_2209 = "boda-011/IMG_2209.mp4";
const V_2219 = "boda-011/IMG_2219.mp4";
const V_2229 = "boda-011/IMG_2229.mp4";
const V_2230 = "boda-011/IMG_2230.mp4";
const V_2233 = "boda-011/IMG_2233.mp4";
const V_2234 = "boda-011/IMG_2234.mp4";
const V_2235 = "boda-011/IMG_2235.mp4";
const V_2236 = "boda-011/IMG_2236.mp4";
const V_2237 = "boda-011/IMG_2237.mp4";
const V_2238 = "boda-011/IMG_2238.mp4";
const V_2239 = "boda-011/IMG_2239.mp4";
const V_2245 = "boda-011/IMG_2245.mp4";
const V_2246 = "boda-011/IMG_2246.mp4";
const V_2261 = "boda-011/IMG_2261.mp4";
const V_2266 = "boda-011/IMG_2266.mp4";
const V_2274 = "boda-011/IMG_2274.mp4";
const V_2275 = "boda-011/IMG_2275.mp4";
const V_2276 = "boda-011/IMG_2276.mp4";
const V_2277 = "boda-011/IMG_2277.mp4";
const V_2279 = "boda-011/IMG_2279.mp4";
const V_2286 = "boda-011/IMG_2286.mp4";
const V_2290 = "boda-011/IMG_2290.mp4";
const V_2291 = "boda-011/IMG_2291.mp4";
const V_2293 = "boda-011/IMG_2293.mp4";
const V_E56C = "boda-011/E56C34FB-A3E7-4EF1-8FDE-04929446A703.mp4";

export const metraje011: readonly Corte[] = [
  /* ── LA BODA · la glorieta ──────────── Turning Page (desde 1,40 s) ── */
  {
    id: "c01",
    tipo: "video",
    src: V_2235,
    desde: 1.0,
    en: 0,
    dur: 162,
    zoom: [1.00, 1.06],
    grado: { exposicion: 1.12 },
    reason:
      "Abre el lugar: el árbol y el lago, con el título «Boda · María & Daniel» encima (Titulo011). Sin fundido desde negro: el frame 0 es la miniatura de WhatsApp y del feed y tiene que ser ya la portada (lección del 010). Dura 5,4 s para que el título se lea sin prisa.",
  },
  {
    id: "c02",
    tipo: "video",
    src: V_2200,
    desde: 3.4,
    en: 162,
    dur: 64,
    zoom: [1.05, 1.00],
    entra: "disolver",
    reason:
      "Las sillas vacías bajo la glorieta: el sitio esperando. Tramo más abierto del clip (filas + lago detrás).",
  },
  {
    id: "c03",
    tipo: "video",
    src: V_2199,
    desde: 3.8,
    en: 226,
    dur: 63,
    zoom: [1.00, 1.05],
    entra: "disolver",
    reason:
      "Detalle de flores contra el cielo. Es el tramo del clip donde la cámara ya dejó de barrer la caja de «Cards».",
  },
  {
    id: "c04",
    tipo: "video",
    src: V_2209,
    desde: 0.0,
    en: 289,
    dur: 95,
    zoom: [1.00, 1.04],
    reason:
      "Los pétalos cayendo en el pasillo: primera persona y primera acción. Corte seco sobre la nota.",
  },
  {
    id: "c05",
    tipo: "video",
    src: V_2219,
    desde: 0.4,
    en: 384,
    dur: 78,
    zoom: [1.04, 1.00],
    grado: { exposicion: 1.12 },
    reason:
      "El pianista con los invitados llegando detrás. Después del 3,5 s el clip se queda solo en el pianista.",
  },
  {
    id: "c06",
    tipo: "video",
    src: V_2229,
    desde: 4.0,
    en: 462,
    dur: 80,
    zoom: [1.00, 1.06],
    entra: "disolver",
    reason:
      "El novio esperando, con la sonrisa más grande del clip (4-7 s). Empieza la llegada.",
  },
  {
    id: "c07",
    tipo: "video",
    src: V_2230,
    desde: 4.9,
    en: 542,
    dur: 94,
    zoom: [1.00, 1.05],
    reason:
      "El abrazo a la novia antes de entregarla: se acerca, la abraza y se miran (4,9-8 s). El novio mira desde la izquierda.",
  },
  {
    id: "c08",
    tipo: "video",
    src: V_2230,
    desde: 38.9,
    en: 636,
    dur: 96,
    zoom: [1.05, 1.00],
    reason:
      "El velo al viento mientras ella llega hasta él: el tramo más nítido del clip (blur 4,2-4,4). Mismo archivo que c07, 30 s después y otro encuadre.",
  },
  {
    id: "c09",
    tipo: "video",
    src: V_2233,
    desde: 12.0,
    en: 732,
    dur: 63,
    zoom: [1.00, 1.05],
    reason:
      "Los votos, de la mano. El clip es casi estático (YDIF 2-5): se toma donde se le ve la cara al novio.",
  },
  {
    id: "c10",
    tipo: "foto",
    src: F_ANILLOS,
    en: 795,
    dur: 94,
    zoom: [1.00, 1.10],
    entra: "disolver",
    reason:
      "Los anillos sobre la rosa: la foto sostiene el símbolo justo antes del beso. Es el único plano fijo del primer minuto.",
  },
  {
    id: "c11",
    tipo: "video",
    src: V_2234,
    desde: 32.23,
    en: 889,
    dur: 251,
    zoom: [1.00, 1.08],
    reason:
      "EL BESO. Entra con las manos unidas; ella se lanza en el 34,3 y el beso empieza en el 36,0 del clip, que cae en el f1002 = la subida de Turning Page (34,79 s de la canción). Es el plano más largo de la pieza a propósito.",
  },
  {
    id: "c12",
    tipo: "video",
    src: V_2236,
    desde: 0.45,
    en: 1140,
    dur: 109,
    zoom: [1.04, 1.00],
    entra: "disolver",
    reason:
      "La firma: la música baja tras la subida y el montaje respira con ella.",
  },
  {
    id: "c13",
    tipo: "video",
    src: V_2237,
    desde: 1.75,
    en: 1249,
    dur: 69,
    zoom: [1.00, 1.04],
    reason:
      "Saludos después de la ceremonia; el novio llega y besa a la novia en la mejilla (3,5-4 s).",
  },
  {
    id: "c14",
    tipo: "video",
    src: V_2238,
    desde: 10.0,
    en: 1318,
    dur: 78,
    zoom: [1.00, 1.04],
    reason:
      "La cantante dedicándoles la canción y la pareja escuchando; la cámara acaba en ellos.",
  },
  {
    id: "c15",
    tipo: "video",
    src: V_2239,
    desde: 4.8,
    en: 1396,
    dur: 63,
    zoom: [1.04, 1.00],
    reason:
      "Las palabras del padre. Tramo más estable del clip (YDIF 2,5-3,9).",
  },
  {
    id: "c16",
    tipo: "video",
    src: V_2246,
    desde: 1.0,
    en: 1459,
    dur: 64,
    zoom: [1.00, 1.05],
    reason:
      "La sesión de fotos: posan para el fotógrafo, que queda a la derecha y cuenta lo que es.",
  },
  {
    id: "c17",
    tipo: "video",
    src: V_2245,
    desde: 5.65,
    en: 1523,
    dur: 134,
    zoom: [1.00, 1.06],
    entra: "disolver",
    reason:
      "Los dos bajo el árbol: el tronco se aparta y aparecen abrazados con el velo al viento. Cae en el golpe más fuerte del final (50,75 s).",
  },
  {
    id: "c18",
    tipo: "video",
    src: V_2261,
    desde: 3.6,
    en: 1657,
    dur: 87,
    zoom: [1.05, 1.00],
    entra: "disolver",
    reason:
      "La mesa de los novios en el salón: el primer minuto termina donde empieza la fiesta.",
  },
  {
    id: "c19",
    tipo: "video",
    src: V_2266,
    desde: 2.3,
    en: 1744,
    dur: 56,
    zoom: [1.00, 1.05],
    entra: "disolver",
    salidaNegro: 15,
    reason:
      "Velas y lirios, y fundido a negro en el respiro de la canción (61,4 s = f1800).",
  },
  /* ── LA RECEPCIÓN · el salón ─────── CAPITULO f1800 · sigue Turning Page ── */
  {
    id: "r01",
    tipo: "video",
    src: V_2274,
    desde: 10.2,
    en: 1800,
    dur: 101,
    zoom: [1.08, 1.00],
    entra: "negro",
    reason:
      "Empieza la recepción. Nace de negro en el respiro de Turning Page (61,4 s de la canción), y el novio levanta la copa con el sombrero vueltiao justo al terminar el fundido (10,75 del clip = f1816).",
  },
  {
    id: "r02",
    tipo: "foto",
    src: F_2270,
    en: 1901,
    dur: 47,
    zoom: [1.00, 1.12],
    reason:
      "El champán cayendo en la copa. IMG_2270 dura 5 fotogramas: es una foto y se trata como foto (fotograma central).",
  },
  {
    id: "r03",
    tipo: "video",
    src: V_2276,
    desde: 49.9,
    en: 1948,
    dur: 90,
    zoom: [1.00, 1.05],
    reason:
      "El brindis de frente: levanta la copa (49,75) y beben con los brazos entrelazados (51,25). Termina donde termina el clip.",
  },
  {
    id: "r04",
    tipo: "video",
    src: V_2275,
    desde: 29.4,
    en: 2038,
    dur: 105,
    zoom: [1.05, 1.00],
    reason:
      "La novia sonríe, se ríe y alza la copa (31,25); el novio se gira al final.",
  },
  {
    id: "r05",
    tipo: "video",
    src: V_2277,
    desde: 2.2,
    en: 2143,
    dur: 132,
    zoom: [1.00, 1.06],
    reason:
      "Primer plano de las copas: se miran y se besan (4,0 s del clip).",
  },
  /* ── LA RUMBA ───────────── RELEVO f2340 dentro de r06 · El Preso (desde 0,25 s) ── */
  {
    id: "r06",
    tipo: "video",
    src: V_2279,
    desde: 4.33,
    en: 2275,
    dur: 209,
    zoom: [1.06, 1.00],
    reason:
      "EL RELEVO. Cortan el pastel juntos y ella empieza a levantar el cuchillo (6,5 s del clip) EXACTAMENTE en el f2340 = 1:18, donde muere Turning Page y entra el primer golpe de El Preso: el gesto abre la rumba. Después bailan.",
  },
  {
    id: "r07",
    tipo: "video",
    src: V_2286,
    desde: 10.6,
    en: 2484,
    dur: 220,
    zoom: [1.00, 1.03],
    reason:
      "Ya en la pista: la novia gira, él la hace girar bajo su brazo (14,25) y bailan de frente. Clip movido: zoom mínimo.",
  },
  {
    id: "r08",
    tipo: "video",
    src: V_E56C,
    desde: 0.3,
    en: 2704,
    dur: 164,
    zoom: [1.00, 1.08],
    reason:
      "La pista llena con la novia en el centro. Único clip de mensajería (720p): el zoom lento le da vida sin pedirle más nitidez.",
  },
  {
    id: "r09",
    tipo: "video",
    src: V_2291,
    desde: 4.95,
    en: 2868,
    dur: 103,
    zoom: [1.03, 1.00],
    grado: { exposicion: 1.12 },
    reason:
      "Pies en el suelo de damero: tacones y zapatos siguiendo la salsa. Es el inserto que deja volver al trencito.",
  },
  {
    id: "r10",
    tipo: "video",
    src: V_2290,
    desde: 8.0,
    en: 2971,
    dur: 177,
    zoom: [1.00, 1.03],
    reason:
      "El trencito: la novia entra bailando con los brazos arriba, el novio detrás y una invitada muerta de risa. La mejor ventana medida del clip (blur 5,2-5,5).",
  },
  {
    id: "r11",
    tipo: "video",
    src: V_2293,
    desde: 8.9,
    en: 3148,
    dur: 91,
    zoom: [1.12, 1.06],
    pan: 3,
    reason:
      "El invitado que baila con la novia se muere de risa detrás del abanico y entra en primer plano la invitada de granate. En 7,7 s el still (f3200) era medio plano de pared de pósters con las caras abajo y pequeñas: de ahí la ventana nueva, el zoom y `pan: 3` (el máximo que permite la escala mínima de 1,06 sin enseñar el borde).",
  },
  {
    id: "r12",
    tipo: "video",
    src: V_2291,
    desde: 10.1,
    en: 3239,
    dur: 85,
    zoom: [1.00, 1.03],
    grado: { exposicion: 1.12 },
    reason:
      "Segundo inserto de pies: vestido negro, tacones y pantalón.",
  },
  {
    id: "r13",
    tipo: "video",
    src: V_2293,
    desde: 15.02,
    en: 3324,
    dur: 103,
    zoom: [1.00, 1.05],
    reason:
      "La invitada del vestido granate baila con el abanico y le sale pareja. Hasta el final del clip.",
  },
  {
    id: "r14",
    tipo: "video",
    src: V_2290,
    desde: 15.8,
    en: 3427,
    dur: 173,
    zoom: [1.03, 1.00],
    salidaNegro: 45,
    grado: { exposicion: 1.06 },
    reason:
      "Cierre en el trencito: la niña del vestido azul sonriendo, risas, un saludo con la mano en alto (19 s) y fundido a negro con la música.",
  },
];
