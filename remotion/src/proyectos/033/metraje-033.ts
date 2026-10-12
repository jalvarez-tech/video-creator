/**
 * EL REEL 033 — Casa Campestre en Guarne (Duglas Yovana), los planos como DATOS. V17.
 *
 * Tercer reel de esta casa (la V13 fue el 029 y la V16 el 032), con la ESTRUCTURA DEL CANAL: DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA.
 * Tres frases de Isabella en 39,6 s; el resto es la casa con música. Ni un plano de la V13 ni de la V16 (la puerta, 7b, lo comprueba):
 *
 *   bloque 1  c01                DRON (DR76): la casa en su cerro y el camino que sube a ella, SIN TEXTO NI VOZ (el frame 0 es la miniatura)
 *   bloque 2  c02                HOOK (CT21, de `5 Cta`): «Colombia te llama, ¿ya tienes dónde llegar?»
 *   bloque 3  c03 c04 c05        RECORRIDO: el sendero del jardín hasta la casa → el jacuzzi de la terraza → la sala de la terraza con el valle
 *   bloque 4  c06                MITAD (MD06): «Llevas años en el exterior, trabajaste duro y ahorraste, pero todos los diciembres extrañas lo mismo.»
 *   bloque 5  c07 c08 c09 c10    RECORRIDO: la alcoba principal → la claraboya → la bañera → el valle desde la terraza (la vista)
 *   bloque 6  c11 c12            CTA (CT18, recortada): «Volver no es una idea, es una dirección. Haz clic en el enlace y agendemos su visita.» y la tarjeta
 *
 * LA IDEA EN UNA LÍNEA. Esta casa es para quien vive fuera y quiere volver a Colombia teniendo a dónde llegar: Colombia llama (hook), lo que se
 * extraña cada diciembre (mitad) y volver como una dirección, no como una idea (CTA). Es el hilo de la DIÁSPORA, el que la V16 dejó pendiente.
 * El paseo lo cuenta como una LLEGADA: el camino que sube a la casa, el sendero hasta la puerta, la terraza donde se sienta ella, la alcoba, la
 * luz del cielo, el baño y, al final, el valle que se extrañaba.
 *
 * REGLAS FIJAS DEL CANAL (`recorrido-luxur` SKILL.md §0): la primera toma sale SIEMPRE sin texto y sin voz (el dron dura hasta que Isabella entra
 * a corte, en f67); nunca el sello; el cierre es la tarjeta oscura con el logo y la web, y nada se congela. Sin cifras.
 *
 * EL ENCUADRE. Todo el material es 16:9 y aquí es vertical de 1296×2304: `normalizar.mjs` recorta de cada fotograma una ventana 9:16
 * (`encuadre-033.json`): sigue a Isabella en sus tres tomas (en la mitad, 4K, cerrada al 60 % del alto y con la tele encendida del fondo fuera);
 * en el dron y los recorridos va a mano, mirando el fotograma COMPLETO (`herramientas/ventanas-prueba.py`). El `zoom` de un plano es el
 * acercamiento SOBRE esa ventana: ≤ 1,06 en el hook y el CTA (1080p, que ya suben ×2,13) y en la mitad (cerrada).
 *
 * EL TIEMPO (R29, R33). Las TRES tomas de Isabella entran A CORTE sobre un golpe de la canción (`desde` = 8 f antes de su primera sílaba): el
 * golpe suena entero, la música baja en esos 8 f con curva y la primera palabra llega ya con la música abajo (pedido del usuario: «la música
 * baja antes de la primera palabra de Isabella»). El hook y la mitad se quedan 14 f tras su última palabra (2 de margen + 12 de disolvencia al
 * recorrido); el CTA, hasta el fotograma anterior a su frase siguiente («Puede ser…», que se recorta). Entre dos recorridos el corte es SECO y
 * cae sobre un golpe fuerte (≥ 9 dB) de la canción, MEDIDO (`proyectos/033/musica/golpes-033.json`; la puerta lo comprueba y `golpes-render.py`
 * lo confirma sobre el audio del render); la alcoba → la claraboya corta sobre un golpe MEDIO (8,2 dB, el único de esos 4 s): a disolver, el
 * cuadrado azul de la claraboya se montaba sobre la cama como una doble exposición (visto en la primera prueba). Las voces
 * salen de `limites-voz.py` y de los arranques de sílaba (`herramientas/onsets-voz.py`), no de whisper.
 *
 * EL COLOR (R32): cada plano de vídeo lleva `color`, la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`: primero
 * se iguala la exposición entre planos y después se embellece. Con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-033.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-033";

export const FPS_033 = 30;

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
const fr = (n: number): number => n / FPS_033;

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

const v = (id: string): string => `recorrido-033/${id}.mp4`;
const a = (id: string): string => `recorrido-033/${id}.wav`;

export const metraje033: readonly Corte[] = [
  // ── Bloque 1 · el dron: la casa en su cerro, sin texto ni voz ──
  {
    id: "c01-dron",
    bloque: 1,
    tipo: "video",
    src: v("dr76"),
    desde: 10.9,
    en: 0,
    dur: 67,
    zoom: [1.0, 1.04],
    entra: "corte",
    color: color({ exposure: -0.2, shadows: 0.12, highlights: -0.3 }),
    reason:
      "La casa en su cerro (DR76): el dron gira despacio alrededor y deja ver el camino en S que sube a ella; para quien vuelve, es lo primero: a dónde se llega. Tramo 10,9-13,1 s, el de movimiento más uniforme del vuelo (dispersión 0,013). Dura hasta el golpe de 11,5 dB de f67, donde entra Isabella a corte; el frame 0 es la miniatura. Sin texto ni voz.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("ct21"),
    audio: a("ct21-voz"),
    voz: { s0: 0.43, s1: 2.41, lufs: -15, dice: "Colombia te llama, ¿ya tienes dónde llegar?" },
    desde: fr(4),
    en: 67,
    dur: 82,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ exposure: 0.25, temperature: 0.02, saturation: 1.0, vibrance: 0 }),
    reason:
      "Mirador (CT21): Isabella sentada en el muro con el valle detrás; del aire a la persona, a corte en el golpe. La pregunta selecciona a quien vive fuera y nombra el hilo entero: tener a dónde llegar.",
  },
  // ── Bloque 3 · el recorrido: el sendero → el jacuzzi → la sala de la terraza ──
  {
    id: "c03-sendero",
    bloque: 3,
    tipo: "video",
    src: v("rc26"),
    desde: 0.5,
    en: 149,
    dur: 121,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.2 }),
    reason:
      "Jardín (RC26): el sendero de grava entre el muro y las hojas moradas, con la casa al fondo; es la llegada a pie, el umbral. Corta en f270, sobre el golpe de 13,2 dB.",
  },
  {
    id: "c04-jacuzzi",
    bloque: 3,
    tipo: "video",
    src: v("rc20"),
    desde: 0.05,
    en: 270,
    dur: 67,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.15, highlights: -0.35 }),
    reason:
      "Terraza (RC20): el jacuzzi de madera y la palma frente al valle tras el vidrio; ya dentro, lo que no se tiene fuera. La tele encendida de la pared queda fuera de la ventana. Corta en f337, sobre el golpe de 9,2 dB.",
  },
  {
    id: "c05-sala-terraza",
    bloque: 3,
    tipo: "video",
    src: v("rc22"),
    desde: 2.4,
    en: 337,
    dur: 85,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1, highlights: -0.3 }),
    reason:
      "Sala de la terraza (RC22): los sillones de mimbre abiertos al valle; acaba el paseo social justo donde va a estar sentada Isabella. La mitad entra a corte en el golpe de 9,1 dB de f422.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md06"),
    audio: a("md06-voz"),
    voz: {
      s0: 0.865,
      s1: 6.57,
      lufs: -15,
      dice: "Llevas años en el exterior, trabajaste duro y ahorraste, pero todos los diciembres extrañas lo mismo.",
    },
    desde: fr(18),
    en: 422,
    dur: 193,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ exposure: 0.35, shadows: 0.1, highlights: -0.3, temperature: 0.02, saturation: 1.0, vibrance: 0 }),
    reason:
      "Sala de la terraza (MD06): Isabella sentada en el mismo sitio que acaba de enseñar el paseo, con el valle a su lado; nombra la vida de fuera y lo que se extraña. Plano cerrado al 60 % del alto del 4K; la tele encendida del fondo queda fuera de la ventana.",
  },
  // ── Bloque 5 · el recorrido: la alcoba → la claraboya → la bañera → el valle (la vista) ──
  {
    id: "c07-alcoba",
    bloque: 5,
    tipo: "video",
    src: v("rc07"),
    desde: 1.0,
    en: 615,
    dur: 73,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.3 }),
    reason:
      "Alcoba principal (RC07): la cama frente al ventanal con la montaña; después de lo que se extraña, el descanso propio. Corta en f688, sobre el golpe de 8,2 dB (el único entre f602 y f746; a disolver, el cuadrado azul de la claraboya se montaba sobre la cama: declarado en la puerta).",
  },
  {
    id: "c08-claraboya",
    bloque: 5,
    tipo: "video",
    src: v("rc06"),
    desde: 0.5,
    en: 688,
    dur: 58,
    zoom: QUIETO,
    entra: "corte",
    color: color({ contrast: 1.08, highlights: -0.55, whites: -0.2 }),
    reason:
      "Vestier (RC06): la claraboya abierta al cielo y, al bajar la mirada, el vestier; la luz de casa, lo íntimo. Corta en f746, sobre el golpe de 9,1 dB.",
  },
  {
    id: "c09-banera",
    bloque: 5,
    tipo: "video",
    src: v("rc04"),
    desde: 0.3,
    en: 746,
    dur: 102,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.2 }),
    reason:
      "Baño (RC04): la bañera exenta junto a la ventana de las plantas; lo más íntimo antes de salir a la vista. Corta en f848, sobre el golpe de 9,1 dB.",
  },
  {
    id: "c10-valle",
    bloque: 5,
    tipo: "video",
    src: v("rc21"),
    desde: 0.3,
    en: 848,
    dur: 107,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "Terraza (RC21): el valle entero desde la casa, con el jardín en pendiente; lo que se extrañaba cada diciembre, la recompensa y el plano más largo del bloque. La canción empieza a caer bajo él.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c11-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct18"),
    audio: a("ct18-voz"),
    voz: {
      s0: 0.495,
      s1: 5.63,
      lufs: -15,
      dice: "Volver no es una idea, es una dirección. Haz clic en el enlace y agendemos su visita.",
    },
    desde: fr(7),
    en: 955,
    dur: 168,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ temperature: 0, saturation: 1.0, vibrance: 0, highlights: -0.35 }),
    reason:
      "Jardín al atardecer (CT18): Isabella camina hacia la cámara con el valle y el cielo encendido detrás; cierra el hilo (volver es una dirección) y pide una sola acción. Entra a corte en el golpe de 10,5 dB de f955, donde la canción empieza a caer. La toma se corta en la pausa antes de «Puede ser virtual o presencial»: su imagen funde a negro y entra la tarjeta.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  {
    id: "c12-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-033/cierre-oscuro.png",
    en: 1123, // = el `en` + `dur` de c11
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason: "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web en silencio.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c12). */
export const DURACION_033 = 1123 + DUR_TARJETA;
