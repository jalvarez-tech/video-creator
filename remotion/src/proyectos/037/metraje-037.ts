/**
 * EL REEL 037 — Casa Campestre en Guarne (Duglas Yovana), los planos como DATOS. V20.
 *
 * Quinto reel de esta casa (antes, la V13/029, la V16/032, la V17/033 y, en otra sesión, la V19/036), con la ESTRUCTURA DEL CANAL: DRON · HOOK ·
 * RECORRIDO · MITAD · RECORRIDO · CTA. Tres frases de Isabella en 33,5 s; el resto es la casa con música. El hilo es EL ERROR (comprar mal un
 * campestre), el que ninguna versión había usado:
 *
 *   bloque 1  c01                DRON (DR71): la casa en su ladera; el dron se aleja despacio, SIN TEXTO NI VOZ (el frame 0 es la miniatura)
 *   bloque 2  c02                HOOK (HK08): «El error que cometen las familias al buscar campestre.» (frente al garaje)
 *   bloque 3  c03 c04            RECORRIDO: ella llega por la sala hacia la cámara (RC01) → el pasillo y la alcoba principal (RC28)
 *   bloque 4  c05                MITAD (MD10): «Compran lejos, se cansan del viaje, compran viejo y tienen que pagar dos veces en remodelación.» (en esa alcoba)
 *   bloque 5  c06 c07            RECORRIDO: el vestier y el baño (RC13) → el valle y la carretera que sube a la casa (DR82, la vista)
 *   bloque 6  c08 c09            CTA (CT08): «No cometas el mismo error. Haz clic en el enlace y ven a conocerla.» (la terraza del telescopio) y la tarjeta
 *
 * LA IDEA EN UNA LÍNEA. Esta casa es para quien no quiere comprar dos veces: el error de la familia que compra lejos o compra viejo (hook y mitad) se
 * contesta con lo que enseña el paseo —entras, la alcoba, el vestier, el valle: todo hecho y a la vista— y se cierra con una orden, «no cometas el mismo error».
 *
 * REGLAS FIJAS DEL CANAL (`recorrido-luxur` SKILL.md §0): la primera toma sale SIEMPRE sin texto y sin voz (el dron dura hasta que Isabella entra a corte,
 * en f117); nunca el sello; el cierre es la tarjeta oscura con el logo y la web, y nada se congela. Sin cifras.
 *
 * EL ENCUADRE. Todo el material es 4K 16:9 y aquí es vertical de 1296×2304: `normalizar.mjs` recorta de cada fotograma una ventana 9:16 (`encuadre-037.json`):
 * sigue a Isabella en sus tres tomas (el hook, donde ella sale pequeña, con la ventana cerrada al 60 % del alto, y un borde superior que sube y baja para dejar
 * fuera el destello del sol sobre el cristal); en el dron y los recorridos va a mano, mirando el fotograma COMPLETO (`herramientas/ventanas-prueba.py`).
 * **LAS PLACAS** (la «1GR-336» del Mini y la «NGX-490» de la camioneta) están junto a ella todo el tramo del hook y se leen a 4K: `normalizar.mjs` las difumina con
 * un recuadro que las sigue (`TAPAR`). Nada del reel es un 1080p ampliado: las siete fuentes son 4K y los zoom de abajo se quedan en ≤ 1,06.
 *
 * EL TIEMPO (R29, R33). Los cortes SECOS (hook, alcoba, mitad, vista y CTA) caen sobre golpes MEDIDOS de *Familiar* (`proyectos/037/musica/golpes-037.json`,
 * 9,1-14,5 dB; la puerta lo comprueba y `golpes-render.py` lo confirma sobre el audio del render); las dos disolvencias (hook → RC01 y MD10 → RC13) van donde
 * acaba la voz y no piden golpe. Las tres tomas de Isabella entran A CORTE (`desde` = 8 f antes de su primera sílaba: el golpe suena entero, la música baja en
 * esos 8 f con curva y la primera palabra llega ya con la música abajo: «la música baja antes de la primera palabra de Isabella»).
 * El CTA entra en el golpe de 14,5 dB de f805, 3,6 s antes de la caída de la canción: la caída cae bajo su frase.
 *
 * EL COLOR (R32): cada plano de vídeo lleva `color`, la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`: primero se iguala
 * la exposición entre planos y después se embellece. Con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-037.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-037";

export const FPS_037 = 30;

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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido del usuario: «voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −24/−30 LUFS; cada una
 * pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1, ganancia y limitador) hasta −15,0 LUFS en su ventana, así que el
 * plan no añade ganancia (`lufs` = −15 en todas).
 */
export const OBJETIVO_LUFS = -15;

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_037;

/** Isabella: un empuje lento hacia ella (todas sus tomas aguantan 1,06: el hook y el CTA son 1080p y la mitad es un 4K cerrado). Los recorridos van quietos: la cámara ya avanza. */
const EMPUJE: readonly [number, number] = [1.0, 1.06];
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

const v = (id: string): string => `recorrido-037/${id}.mp4`;
const a = (id: string): string => `recorrido-037/${id}.wav`;

export const metraje037: readonly Corte[] = [
  // ── Bloque 1 · el dron: la casa en su ladera, sin texto ni voz ──
  {
    id: "c01-dron",
    bloque: 1,
    tipo: "video",
    src: v("dr71"),
    desde: 3.0,
    en: 0,
    dur: 117,
    zoom: [1.08, 1.0],
    entra: "corte",
    color: color({ exposure: -0.25, highlights: -0.35, saturation: 1.0 }),
    reason:
      "La casa en su ladera (DR71): el dron se aleja despacio y deja ver la casa entera sobre la loma, a la vista y sin obra; lo primero que compra quien busca campestre. Tramo 3,0-6,9 s: el más rápido que el clip tiene con movimiento sin tirones (mov 1,6, dispersión 0,082; el tramo más uniforme, 6,5-10,4 s, tenía mov 1,3 y apenas se movía), y un zoom hacia FUERA de 1,08 a 1,0 que suma a su alejamiento (si fuera hacia dentro lo restaría y el plano quedaría quieto). La ventana va a la izquierda: a x ≥ 0,50 entran la camioneta y el coche blanco con sus placas. Dura hasta el golpe de 11,0 dB de f117, donde entra Isabella a corte; el frame 0 es la miniatura. Sin texto ni voz.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk08"),
    audio: a("hk08-voz"),
    voz: { s0: 0.83, s1: 3.48, lufs: -15, dice: "El error que cometen las familias al buscar campestre." },
    desde: fr(17),
    en: 117,
    dur: 106,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ exposure: 0.4, shadows: 0.7, blacks: 0.05, contrast: 1.0, highlights: -0.3, whites: -0.1, temperature: 0.02, saturation: 1.0, vibrance: 0 }),
    reason:
      "Garaje (HK08): Isabella frente a la casa, de pie en la grava; del aire a la persona, a corte en el golpe. La frase abre el hilo entero —el error de las familias— y no promete nada: selecciona a quien está buscando. Las dos placas de los coches de detrás están difuminadas; el destello del sol sobre el cristal queda fuera de la ventana.",
  },
  // ── Bloque 3 · el recorrido: ella llega por la sala → el pasillo y la alcoba ──
  {
    id: "c03-llegada",
    bloque: 3,
    tipo: "video",
    src: v("rc01"),
    desde: 0.4,
    en: 223,
    dur: 129,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.4, highlights: -0.5, whites: -0.2 }),
    reason:
      "Sala (RC01): la puerta de vidrio, y al fondo la sala y el comedor con el valle; Isabella camina hacia la cámara, muda. El umbral y la zona social de un solo plano: la casa ya hecha, lista para entrar. Corta en f352, sobre el golpe de 9,1 dB.",
  },
  {
    id: "c04-pasillo",
    bloque: 3,
    tipo: "video",
    src: v("rc28"),
    desde: fr(22),
    en: 352,
    dur: 77,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.05, temperature: -0.12, saturation: 0.97, vibrance: 0.02 }),
    reason:
      "Pasillo y alcoba (RC28): del jardín con el ciprés, por la puerta, a la alcoba principal con su cabecero y la luz cálida; el paseo sigue hacia la intimidad y deja a Isabella esperando dentro. La ventana acompaña el giro. Corta en f429, sobre el golpe de 9,4 dB, donde la mitad entra a corte.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c05-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md10"),
    audio: a("md10-voz"),
    voz: {
      s0: 0.975,
      s1: 6.27,
      lufs: -15,
      dice: "Compran lejos, se cansan del viaje, compran viejo y tienen que pagar dos veces en remodelación.",
    },
    desde: fr(21),
    en: 429,
    dur: 182,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ exposure: 0.1, highlights: -0.35, temperature: 0.02, saturation: 1.0, vibrance: 0 }),
    reason:
      "Alcoba principal (MD10): Isabella en la misma alcoba donde acaba el pasillo, con el valle por la ventana y la tele apagada; dice el error con las dos formas de equivocarse (lejos, viejo) frente a la casa que sí está hecha y cerca. Cuatro palabras dudosas, listadas en `combinaciones.md`.",
  },
  // ── Bloque 5 · el recorrido: el vestier y el baño → el valle (la vista) ──
  {
    id: "c06-vestier",
    bloque: 5,
    tipo: "video",
    src: v("rc13"),
    desde: 0.4,
    en: 611,
    dur: 64,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.15, shadows: 0.15, temperature: -0.06 }),
    reason:
      "Vestier y baño (RC13): del armario al espejo redondo y el lavamanos de piedra, lo íntimo de la misma alcoba; «no hay que remodelar» se ve sin decirse. Acaba en 2,5 s de su clip, antes de que asome el inodoro por la izquierda (a 2,9 s ocupa el 14 % de la ventana); disuelve al valle.",
  },
  {
    id: "c07-vista",
    bloque: 5,
    tipo: "video",
    src: v("dr82"),
    desde: 6.0,
    en: 675,
    dur: 130,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.35, highlights: -0.45, whites: -0.2 }),
    reason:
      "Valle (DR82): el dron gira de la casa a la carretera que sube hasta ella y al valle con la cordillera; la vista y el plano más largo del bloque (4,3 s), y la respuesta a «compran lejos»: la carretera lleva a la casa. Tramo 6,0-10,3 s (dispersión 0,069; sin placas legibles: los coches miden ≈ 12 px). Entra disolviendo desde el vestier (de lo íntimo a lo abierto) y dura hasta el golpe de 14,5 dB de f805, donde entra el CTA a corte y la canción empieza a caer.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c08-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct08"),
    audio: a("ct08-voz"),
    voz: {
      s0: 1.79,
      s1: 5.6,
      lufs: -15,
      dice: "No cometas el mismo error. Haz clic en el enlace y ven a conocerla.",
    },
    desde: fr(46),
    en: 805,
    dur: 133,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ exposure: 0.3, shadows: 0.25, temperature: 0.02, saturation: 1.0, vibrance: 0, highlights: -0.3 }),
    reason:
      "Terraza del telescopio (CT08): Isabella con el valle detrás y el telescopio apuntando a él; cierra el hilo («no cometas el mismo error») y pide una sola acción. Entra a corte en el golpe de 14,5 dB de f805. La toma llega hasta su último fotograma: su imagen funde a negro y entra la tarjeta.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  {
    id: "c09-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-037/cierre-oscuro.png",
    en: 938, // = el `en` + `dur` de c08
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason: "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web en silencio.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c09). */
export const DURACION_037 = 938 + DUR_TARJETA;
