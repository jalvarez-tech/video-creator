/**
 * EL REEL 029 — Casa Campestre en Guarne (Duglas Yovana), los planos como DATOS.
 *
 * V13 del canal y primer reel de esta propiedad, hecho SOLO con las 19 tomas de `5 Cta` (pedido del usuario:
 * «un video cinematográfico que rompa el scroll tipo reel… los videos están en 5 Cta, en 16:9, necesito encuadrarlos
 * en 9:16, sube la voz sin saturar, canciones que no estén en otros videos y al final coloriza»). No es el recorrido de
 * seis bloques: aquí no hay metraje mudo de la casa ni voz en off, y la casa se ve DETRÁS de Isabella, que la cuenta
 * en seis frases, cada una desde un sitio distinto de la finca. Por eso los bloques son tres:
 *
 *   bloque 1  c01-apertura        la finca y ella llegando, SIN TEXTO NI VOZ, a cámara lenta (el frame 0 es la miniatura)
 *   bloque 2  c02 … c06           cinco frases de Isabella, una por plano, cada una en un sitio
 *   bloque 6  c07-cta, c08-cierre el CTA con la puesta de sol, y la tarjeta oscura del cierre (nada se congela)
 *
 * LA IDEA EN UNA LÍNEA. Esta casa es para la familia que quiere que la infancia de sus hijos pase «respirando distinto»
 * —y no en un apartamento— y para el que quiere volver a Colombia con una dirección. Las frases son SUYAS (las que dijo
 * en `5 Cta`), en este orden: la emoción (la infancia pasa rápido) → la promesa (tu familia merece respirar distinto) →
 * lo que lo hace posible (diseño moderno, naturaleza y privacidad) → cómo se vive (una casa donde todos caben cómodos) →
 * lo que vale (no es solo una casa, es patrimonio) → la dirección (volver no es una idea, es una dirección) y el clic.
 * Los sitios, en el orden de la frase y no en el de caminar la casa (no hay recorrido que seguir): terraza de la sala →
 * sala abierta con vidrio → jardín → sala de la tele → alcoba → jardín con la puesta de sol.
 *
 * REGLAS FIJAS DEL CANAL (`recorrido-luxur` SKILL.md §0): la primera toma sale SIEMPRE sin texto ni voz; nunca el sello;
 * el cierre es la tarjeta oscura con el logo y la web, y nada se congela.
 *
 * EL ENCUADRE. Los clips fuente son 16:9 y aquí son verticales de 1296×2304: `normalizar.mjs` recorta de cada fotograma
 * una ventana 9:16 a altura completa que SIGUE a Isabella (`encuadre-029.json`). El `zoom` de un plano es el
 * acercamiento SOBRE esa ventana: ≤ 1,10 en los 4K (de sobra) y ≤ 1,07 en los de 1080p (que ya suben ×2,13).
 *
 * EL TIEMPO. Es la regla R29: cada toma entra con su imagen opaca UN frame antes de su primera palabra (`desde` = ese
 * frame de la fuente) y hasta su última palabra hay HUECO fijo con la siguiente: 24 f (0,8 s; el recorrido de Los
 * Patios usa 15), porque aquí la pausa es el ritmo de la pieza: la disolvencia (12 f) cabe entera en ese hueco, y la
 * imagen siguiente se ve 10 f antes de que hable. Las frases salen de `limites-voz.py` y de la envolvente de la voz
 * (`herramientas/envolvente-voz.py`), no de whisper (R29). Cada toma se corta donde acaba SU frase: en la mayoría
 * Isabella sigue, sin pausa, con «haz clic en el enlace…», que aquí solo dice la última toma.
 *
 * EL COLOR (R32): cada plano de vídeo lleva `color`, la base del canal más el ajuste de su toma, medido con
 * `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-029.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-029";

export const FPS_029 = 30;

export type Entrada = "corte" | "disolver";
export type Bloque = 1 | 2 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. `s0`/`s1`, medidos por energía; `lufs`, con ebur128 sobre el WAV TRATADO que suena. */
export interface VozDelCorte {
  /** Segundo de la fuente en que empieza a hablar. */
  s0: number;
  /** Segundo de la fuente en que termina SU FRASE (no la toma: sigue con «haz clic…» y se corta aquí). */
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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido del usuario: «sube la voz sin saturar»). Las voces de `5 Cta`
 * llegan a −27…−31 LUFS; cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1, ganancia y
 * limitador) hasta −15,0 LUFS en su ventana, así que el plan no añade ganancia (`lufs` = −15 en todas).
 */
export const OBJETIVO_LUFS = -15;

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_029;

/** Empuje lento hacia ella (4K: sobra resolución) y empuje corto (los clips de 1080p, que ya suben ×2,13 al cuadro). */
const EMPUJE_4K: readonly [number, number] = [1.0, 1.1];
const EMPUJE_1080: readonly [number, number] = [1.0, 1.06];

/**
 * LA BASE DEL COLOR de Luxur (la del 017), a medir de nuevo con estos clips: aquí TODOS los planos llevan a Isabella, así que
 * la saturación se queda ≤ 1,06 en todos y la viveza se pide con contraste y tonos. `colorCorrection()` aplica: exposición →
 * balance de blancos → sombras/luces/blancos/negros → contraste → saturación → vibrance.
 */
const COLOR_BASE: ColorCine = {
  contrast: 1.13, // cuerpo: el iPhone entrega plano y estas tomas (cielo, valle, interiores) piden separación
  blacks: -0.08, // el negro hundido: sin él el interior se ve lavado
  shadows: 0.06, // … pero las sombras no se cierran
  highlights: -0.22, // las luces se recogen: cielos y ventanales no se queman
  whites: -0.06,
  temperature: 0.04, // un punto cálido (la marca es cálida), sin teñir la piel (≤ 0,06 en Isabella)
  saturation: 1.06, // la viveza va aquí (tope 1,06 con Isabella en plano) y NO en `vibrance`
  vibrance: 0.03, // lo apagado (los interiores beige) sube un poco más que lo vivo; tope 0,05
};

/** El color de un plano: la base más el ajuste de su toma (medido, `medir-color.py`). */
const color = (ajuste: ColorCine = {}): ColorCine => ({ ...COLOR_BASE, ...ajuste });

const v = (id: string): string => `recorrido-029/${id}.mp4`;
const a = (id: string): string => `recorrido-029/${id}.wav`;

export const metraje029: readonly Corte[] = [
  // ── Bloque 1 · la finca y ella llegando: sin texto ni voz ──
  {
    id: "c01-apertura",
    bloque: 1,
    tipo: "video",
    src: v("apertura"),
    desde: 0,
    en: 0,
    dur: 60,
    zoom: [1.0, 1.06],
    entra: "corte",
    color: color({ exposure: 0.03, highlights: -0.3, saturation: 1.1 }),
    reason:
      "Camino de la finca: el cielo, la montaña y ella viniendo hacia la cámara, a cámara lenta ×0,5 con los 60 fps de la fuente. Es el mejor plano de la casa que no habla: dura lo que ella tarda en llegar a hablar (su voz arranca en 0,98 s del clip). Entra a corte: el frame 0 es la miniatura y no nace de negro.",
  },
  // ── Bloque 2 · cinco frases, cada una en un sitio ──
  {
    id: "c02-infancia",
    bloque: 2,
    tipo: "video",
    src: v("ct14"),
    audio: a("ct14-voz"),
    voz: { s0: 0.94, s1: 2.4, lufs: -15, dice: "La infancia pasa rápido." },
    desde: fr(27),
    en: 60,
    dur: 68,
    zoom: EMPUJE_4K,
    entra: "disolver",
    color: color({ exposure: -0.02, saturation: 1.05 }),
    reason: "Terraza de la sala: el hook es la emoción y no la ficha («la infancia pasa rápido»), dicho por ella sentada, a su ritmo, con la montaña detrás. Disuelve porque cambia el registro: de la finca a la persona.",
  },
  {
    id: "c03-familia",
    bloque: 2,
    tipo: "video",
    src: v("ct07"),
    audio: a("ct07-voz"),
    voz: { s0: 0.76, s1: 2.88, lufs: -15, dice: "Tu familia merece respirar distinto." },
    desde: fr(22),
    en: 128,
    dur: 87,
    zoom: EMPUJE_4K,
    entra: "disolver",
    color: color({ exposure: -0.14, highlights: -0.32, saturation: 1.05 }),
    reason: "Sala abierta con vidrio: la promesa, de pie y con los brazos abiertos, frente al valle. Es el mismo espacio que el hook visto de frente: la frase se queda en la misma casa pero ella pasa de estar sentada a recibir.",
  },
  {
    id: "c04-diseno",
    bloque: 2,
    tipo: "video",
    src: v("ct01"),
    audio: a("ct01-voz"),
    voz: { s0: 0.75, s1: 3.3, lufs: -15, dice: "Diseño moderno, naturaleza y privacidad." },
    desde: fr(22),
    en: 215,
    dur: 100,
    zoom: EMPUJE_1080,
    entra: "disolver",
    color: color({ saturation: 1.06, highlights: -0.1 }),
    reason: "Jardín: lo que hace posible la promesa (diseño, naturaleza, privacidad), dicho en el sitio que lo enseña: la palmera y las hojas anchas entre ella y la ladera, sin vecinos.",
  },
  {
    id: "c05-comodos",
    bloque: 2,
    tipo: "video",
    src: v("ct09"),
    audio: a("ct09-voz"),
    voz: { s0: 0.67, s1: 2.66, lufs: -15, dice: "Una casa donde todos caben cómodos." },
    desde: fr(19),
    en: 315,
    dur: 84,
    zoom: EMPUJE_4K,
    entra: "disolver",
    color: color({ saturation: 1.05, vibrance: 0.05, highlights: -0.25 }),
    reason: "Sala de la tele: cómo se vive, sentada en el sillón con la mesa del centro en primer plano; baja el reel hacia lo íntimo antes de la alcoba. La tele, encendida a la izquierda, queda fuera del encuadre vertical.",
  },
  {
    id: "c06-patrimonio",
    bloque: 2,
    tipo: "video",
    src: v("ct16"),
    audio: a("ct16-voz"),
    voz: { s0: 0.45, s1: 2.92, lufs: -15, dice: "Esta no es solo una casa, es patrimonio." },
    desde: fr(13),
    en: 399,
    dur: 98,
    zoom: EMPUJE_4K,
    entra: "disolver",
    color: color({ exposure: 0.1, highlights: -0.3, saturation: 1.05 }),
    reason: "Alcoba principal: lo que vale, en el sitio más privado, con el ventanal abierto al valle detrás de la cama. Ella entra caminando hacia la cámara y prepara la salida al jardín.",
  },
  // ── Bloque 6 · el CTA, con la puesta de sol ──
  {
    id: "c07-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct18"),
    audio: a("ct18-voz"),
    voz: { s0: 0.495, s1: 7.39, lufs: -15, dice: "Volver no es una idea, es una dirección. Haz clic en el enlace y agendemos su visita. Puede ser virtual o presencial." },
    desde: fr(14),
    en: 497,
    dur: 220,
    zoom: EMPUJE_1080,
    entra: "disolver",
    color: color({ exposure: -0.1, highlights: -0.36, saturation: 1.06 }),
    reason: "Jardín al atardecer: la dirección y el clic, con la mejor luz de la finca, que es también la que no se puede comprar con una ficha. Es la toma más larga y la última imagen: tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  {
    id: "c08-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-029/cierre-oscuro.png",
    en: 717, // = el `en` + `dur` de c07
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason: "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c08). */
export const DURACION_029 = 717 + DUR_TARJETA;
