/**
 * EL REEL 029 — Casa Campestre en Guarne (Duglas Yovana), los planos como DATOS. Rev. 1.
 *
 * V13 del canal y primer reel de esta propiedad, con la ESTRUCTURA DEL CANAL que pidió el usuario («recuerda la estructura: dron, hook, recorrido,
 * mitad, recorrido y CTA»; la rev. 0 era un montaje de las 19 tomas de `5 Cta` con seis frases suyas y «tiene muchos diálogos»). Son tres frases
 * de Isabella en 38 s; el resto es la casa con música:
 *
 *   bloque 1  c01            DRON: la casa vista desde el aire, acercándose a su fachada, SIN TEXTO NI VOZ (el frame 0 es la miniatura)
 *   bloque 2  c02            HOOK  (HK04): «La casa que tu familia va a recordar siempre.»
 *   bloque 3  c03 c04 c05    RECORRIDO: sala → comedor → cocina, a corte sobre los golpes de la música
 *   bloque 4  c06            MITAD (MD04): «Pregúntate algo. ¿Qué recuerdos de infancia les estamos dando?»
 *   bloque 5  c07 c08 c09 c10  RECORRIDO: terraza → baño → ventana → alcoba y su ventanal (la vista), a corte sobre los golpes
 *   bloque 6  c11 c12        CTA (CT15): «Esta no es solo una casa, es patrimonio. Haz clic en el enlace y agendemos tu visita.» y la tarjeta oscura
 *
 * LA IDEA EN UNA LÍNEA. Esta casa es para la familia que quiere dejar a sus hijos una infancia que recordar: los recuerdos (hook) →
 * la pregunta que obliga a pensarlo (mitad) → lo que dura (patrimonio, CTA). Los dos recorridos son lo que la frase no dice: el espacio en el
 * que cabe esa familia.
 *
 * REGLAS FIJAS DEL CANAL (`recorrido-luxur` SKILL.md §0): la primera toma sale SIEMPRE sin texto y sin voz (el dron dura hasta que Isabella entra
 * opaca, en f100); nunca el sello; el cierre es la tarjeta oscura con el logo y la web, y nada se congela. Sin cifras.
 *
 * EL ENCUADRE. Todo el material de la casa es 16:9 y aquí es vertical de 1296×2304: `normalizar.mjs` recorta de cada fotograma una ventana 9:16
 * (`encuadre-029.json`): sigue a Isabella en sus tres tomas y en los 4K de Hooks y Mitad se cierra (la mitad al 62 % del alto: ella sale pequeña);
 * en el dron y los recorridos la ventana va a mano. El `zoom` de un plano es el acercamiento SOBRE esa ventana: ≤ 1,10 en los 4K y ≤ 1,08 en los de
 * 1080p (hook y baño, que ya suben ×2,13).
 *
 * EL TIEMPO. Es la regla R29: cada toma de Isabella entra con su imagen opaca UN frame antes de su primera sílaba (`desde` = ese frame de la
 * fuente, con ≥ 12 f de clip antes para la disolvencia) y se queda ≥ 10 f tras su última palabra (2 de margen + 12 de disolvencia al plano siguiente; lo
 * que el clip aguanta: el hook 14, la mitad 20 —el clip acaba a los 4,47 s— y el CTA 10 antes del fundido a negro). Entre dos recorridos el corte es SECO y cae sobre un golpe fuerte de la
 * canción (R33; la canción no tiene pulso fijo —60 % de los golpes fuertes a ≤ 15 ms de la mejor recta, desvío de 34 ms—, así que se corta a los
 * golpes MEDIDOS, `proyectos/029/musica/golpes-029.json`, y la puerta lo comprueba). Las voces salen de `limites-voz.py` y de la envolvente de la voz
 * (`herramientas/envolvente-voz.py`), no de whisper.
 *
 * EL COLOR (R32): cada plano de vídeo lleva `color`, la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`.
 * Con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-029.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-029";

export const FPS_029 = 30;

export type Entrada = "corte" | "disolver";
export type Bloque = 1 | 2 | 3 | 4 | 5 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. `s0`/`s1`, medidos por energía; `lufs`, con ebur128 sobre el WAV TRATADO que suena. */
export interface VozDelCorte {
  /** Segundo de la fuente en que empieza a hablar. */
  s0: number;
  /** Segundo de la fuente en que termina SU FRASE (la toma puede seguir: se corta aquí). */
  s1: number;
  /** Sonoridad integrada de la voz TRATADA en esa ventana (LUFS). */
  lufs: number;
  /** Lo que dice, tal como está en el guion. Solo para leer el plan. */
  dice: string;
}

export interface Corte extends CorteDelFormato<Entrada> {
  /** `foto` solo para la tarjeta oscura del cierre (el último plano: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  bloque: Bloque;
  /** Solo las tomas de Isabella: el WAV de su voz TRATADA (`<toma>-voz.wav`, `normalizar.mjs`). */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido del usuario: «sube la voz sin saturar»). Las voces llegan a −29/−32 LUFS; cada una
 * pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1, ganancia y limitador) hasta −15,0 LUFS en su ventana, así que el
 * plan no añade ganancia (`lufs` = −15 en todas).
 */
export const OBJETIVO_LUFS = -15;

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_029;

/** Isabella: un empuje lento hacia ella (el 4K cerrado de la mitad y el CTA aguantan 1,10; el hook, de 1080p, solo 1,06). Los recorridos van quietos: la cámara ya avanza. */
const EMPUJE_4K: readonly [number, number] = [1.0, 1.1];
const EMPUJE_1080: readonly [number, number] = [1.0, 1.06];
const QUIETO: readonly [number, number] = [1.0, 1.0];

/**
 * LA BASE DEL COLOR de Luxur, a medir con estos clips. `colorCorrection()` aplica: exposición → balance de blancos → sombras/luces/blancos/negros →
 * contraste → saturación → vibrance. Los planos con Isabella llevan `saturation` ≤ 1,06 y temperatura ≤ 0,06 (la piel donde estaba).
 */
const COLOR_BASE: ColorCine = {
  contrast: 1.13, // cuerpo: el iPhone entrega plano y estos planos (cielo, valle, interiores con ventanal) piden separación
  blacks: -0.08, // el negro hundido: sin él el interior se ve lavado
  shadows: 0.06, // … pero las sombras no se cierran
  highlights: -0.22, // las luces se recogen: cielos y ventanales no se queman
  whites: -0.06,
  temperature: 0.04, // un punto cálido (la marca es cálida), sin teñir la piel
  saturation: 1.06, // la viveza va aquí y NO en `vibrance`
  vibrance: 0.03, // lo apagado (los interiores beige) sube un poco más que lo vivo; tope 0,05
};

/** El color de un plano: la base más el ajuste de su toma (medido, `medir-color.py`). */
const color = (ajuste: ColorCine = {}): ColorCine => ({ ...COLOR_BASE, ...ajuste });

const v = (id: string): string => `recorrido-029/${id}.mp4`;
const a = (id: string): string => `recorrido-029/${id}.wav`;

export const metraje029: readonly Corte[] = [
  // ── Bloque 1 · el dron: la fachada desde el aire, sin texto ni voz ──
  {
    id: "c01-dron",
    bloque: 1,
    tipo: "video",
    src: v("dr72"),
    desde: fr(274),
    en: 0,
    dur: 100,
    zoom: [1.0, 1.04],
    entra: "corte",
    color: color({ exposure: 0.15, highlights: -0.3, saturation: 1.1 }),
    reason: "Fachada desde el aire (DR72): el dron SE ACERCA a la casa, en su cerro, y llega a la terraza y al garaje justo cuando entra Isabella; sitúa la propiedad antes que a nadie y deja la sensación de llegar. Se usan los últimos 3,3 s del vuelo (el clip dura 12,5 s y la casa sólo se hace grande al final). Dura hasta que ella entra opaca (f100); entra a corte: el frame 0 es la miniatura y no nace de negro. Sin texto ni voz.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk04"),
    audio: a("hk04-voz"),
    voz: { s0: 1.2, s1: 3.42, lufs: -15, dice: "La casa que tu familia va a recordar siempre." },
    desde: fr(35),
    en: 100,
    dur: 82,
    zoom: EMPUJE_1080,
    entra: "disolver",
    color: color({ exposure: 0.35, saturation: 1.05, shadows: 0.2, highlights: -0.25 }),
    reason: "Jardín (HK04): del dron a la persona, dicho en el sitio que la casa tiene delante de la puerta: la palmera, la grava y el sol entre las hojas. La frase promete un recuerdo, no una ficha. Disuelve porque cambia el registro, no el sitio.",
  },
  // ── Bloque 3 · el recorrido: sala → comedor → cocina ──
  {
    id: "c03-sala",
    bloque: 3,
    tipo: "video",
    src: v("rc25"),
    desde: fr(15),
    en: 182,
    dur: 100,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ highlights: -0.3, exposure: -0.05 }),
    reason: "Sala (RC25): se entra y se ve de una vez la zona social con el ventanal abierto al valle; los sillones verdes y el sofá cuentan quién cabe aquí. Aquí empieza el paseo y no vuelve atrás.",
  },
  {
    id: "c04-comedor",
    bloque: 3,
    tipo: "video",
    src: v("rc16"),
    desde: fr(15),
    en: 282,
    dur: 99,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1, highlights: -0.3 }),
    reason: "Comedor (RC16): la mesa puesta frente a la ventana, a la altura de quien se sienta; es donde se reúne la familia del hook. Mismo avance que la sala.",
  },
  {
    id: "c05-cocina",
    bloque: 3,
    tipo: "video",
    src: v("rc15"),
    desde: fr(15),
    en: 381,
    dur: 97,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.4, highlights: -0.28 }),
    reason: "Cocina (RC15): la isla con taburetes y el ciprés, donde acaba el paseo por dentro; la terraza, y con ella Isabella, está a continuación.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md04"),
    audio: a("md04-voz"),
    voz: { s0: 0.55, s1: 3.79, lufs: -15, dice: "Pregúntate algo. ¿Qué recuerdos de infancia les estamos dando?" },
    desde: fr(16),
    en: 478,
    dur: 118,
    zoom: [1.0, 1.06],
    entra: "disolver",
    color: color({ saturation: 1.05, highlights: -0.28 }),
    reason: "Terraza (MD04): Isabella sentada entre los sillones de mimbre, con la montaña detrás, hace la pregunta que conecta la casa con lo que importa: la infancia de los hijos. Plano cerrado al 62 % del alto del 4K para que su cara se vea (en el original mide el 4 %).",
  },
  // ── Bloque 5 · el recorrido: terraza → baño → ventana → alcoba (la vista) ──
  {
    id: "c07-terraza",
    bloque: 5,
    tipo: "video",
    src: v("rc19"),
    desde: fr(15),
    en: 596,
    dur: 71,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ highlights: -0.32 }),
    reason: "Terraza (RC19): sigue donde estaba ella: el jacuzzi frente al valle y las nubes; el sitio donde se queda uno cuando los niños duermen. Corta en f667 —el golpe de 11,3 dB que `medir-pista` da en f664,3 SUENA en f667,2 en el render: el detector de `golpes-render.py` lo ve en f668,5 menos 1,3 f del AAC—, antes de que la cámara se meta en la palmera (el clip sigue y su último segundo es hoja oscura: un salto de +44 de luma al baño).",
  },
  {
    id: "c08-bano",
    bloque: 5,
    tipo: "video",
    src: v("rc03"),
    desde: fr(15),
    en: 667,
    dur: 80,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.15, highlights: -0.3 }),
    reason: "Baño principal (RC03): la bañera exenta con la ventana de las plantas; lo íntimo, antes de las alcobas.",
  },
  {
    id: "c09-ventana",
    bloque: 5,
    tipo: "video",
    src: v("rc10"),
    desde: fr(15),
    en: 747,
    dur: 70,
    zoom: QUIETO,
    entra: "corte",
    color: color({ highlights: -0.32, exposure: 0.05, blacks: 0, shadows: 0.15 }),
    reason: "Alcoba de invitados (RC10): la cámara parte de la ventana, con el valle y las nubes, y cruza la cortina hacia la cama blanca: pasa del paisaje a la habitación y lleva a la alcoba principal.",
  },
  {
    id: "c10-alcoba",
    bloque: 5,
    tipo: "video",
    src: v("rc12"),
    desde: fr(15),
    en: 817,
    dur: 99,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.3, highlights: -0.3 }),
    reason: "Alcoba principal (RC12): la cama y, al girar, el ventanal abierto al valle: la vista, el plano más largo del bloque. Entra disolviendo (la cortina blanca de la ventana a la colcha oscura saltaba 34 niveles de luma a corte), con la disolvencia acabando en el golpe de f817. Es la misma alcoba donde está Isabella en el CTA (misma colcha, misma ventana), así que el siguiente plano ya está dentro.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c11-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct15"),
    audio: a("ct15-voz"),
    voz: { s0: 0.66, s1: 5.42, lufs: -15, dice: "Esta no es solo una casa, es patrimonio. Haz clic en el enlace y agendemos tu visita." },
    desde: fr(19),
    en: 916,
    dur: 155,
    zoom: EMPUJE_4K,
    entra: "disolver",
    color: color({ saturation: 1.05, highlights: -0.3, exposure: -0.15 }),
    reason: "Alcoba (CT15): donde acabó el paseo, ella entra caminando hacia la cámara y cierra con lo que vale («patrimonio») y la acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  {
    id: "c12-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-029/cierre-oscuro.png",
    en: 1071, // = el `en` + `dur` de c11
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason: "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c12). */
export const DURACION_029 = 1071 + DUR_TARJETA;
