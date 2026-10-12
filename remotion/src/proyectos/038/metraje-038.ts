/**
 * EL REEL 038 — Casa Campestre en Guarne (Duglas Yovana), los planos como DATOS. V21.
 *
 * Sexto reel de esta casa (V13 = 029, V16 = 032, V17 = 033, V19 = 036, V20 = 037), con la ESTRUCTURA DEL CANAL: DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA.
 * Tres frases de Isabella en 37 s; el resto es la casa con música:
 *
 *   bloque 1  c01                DRON (DR73): la casa baja en su loma bajo un cielo abierto, SIN TEXTO NI VOZ (el frame 0 es la miniatura)
 *   bloque 2  c02                HOOK (HK03): «Domingo en familia: abuelos, tíos, primos. ¿Cuántas veces alguien queda incómodo?»
 *   bloque 3  c03 c04 c05 c06    RECORRIDO: el patio → el comedor → la terraza → la palmera que se aparta y deja ver la vista
 *   bloque 4  c07                MITAD (MD05): «Hijos, abuelos, amigos que vienen de visita, todos pueden estar aquí con total comodidad.»
 *   bloque 5  c08 c09 c10 c11    RECORRIDO: la cocina → una alcoba con escritorio → una alcoba de cama blanca → el valle (DR77, la vista)
 *   bloque 6  c12 c13            CTA (CT06): «Recorridos privados disponibles, reserva el tuyo en el enlace.» y la tarjeta
 *
 * LA IDEA EN UNA LÍNEA. Esta casa es para la familia que se reúne los domingos y no quiere que nadie quede incómodo: la pregunta (hook), quiénes
 * caben y con qué comodidad (mitad) y la visita que se reserva (CTA). Es el hilo «TODOS CABEN»; el de «ruido → todo cambia» (HK11/MD08) lo tiene la V19.
 * El paseo lo cuenta como una sobremesa: el patio, el comedor con su mesa puesta, la terraza, y tras la mitad la cocina, dos alcobas y el valle.
 *
 * REGLAS FIJAS DEL CANAL (`recorrido-luxur` SKILL.md §0): la primera toma sale SIEMPRE sin texto y sin voz (el dron dura hasta que Isabella entra a corte,
 * en f98); nunca el sello; el cierre es la tarjeta oscura con el logo y la web, y nada se congela. Sin cifras.
 *
 * EL ENCUADRE. Todo el material es 16:9 y aquí es vertical de 1296×2304: `normalizar.mjs` recorta de cada fotograma una ventana 9:16
 * (`encuadre-038.json`): sigue a Isabella en sus tres tomas (en la mitad, 4K, cerrada al 60 % del alto y con la tele encendida del fondo fuera);
 * en el dron y los recorridos va a mano, mirando el fotograma COMPLETO y después el recorte real. El `zoom` de un plano es el acercamiento SOBRE esa
 * ventana: ≤ 1,06 en el hook y el CTA (1080p, que ya suben ×2,13) y en la mitad (cerrada).
 *
 * EL TIEMPO (R29, R33). La canción (*I Feel It Coming*, sax) tiene un PULSO de 0,645 s (93 BPM) con golpes de 9-25 dB: TODOS los cortes son secos y caen
 * sobre un golpe medido (`proyectos/038/musica/golpes-038.json`; la puerta lo comprueba y `golpes-render.py` lo confirma sobre el audio del render). Las TRES tomas
 * de Isabella entran a corte sobre un golpe (`desde` = 8 f antes de su primera sílaba): el golpe suena entero, la música baja en esos 8 f con curva y la primera
 * palabra llega ya con la música abajo (pedido del usuario: «la música baja antes de la primera palabra de Isabella y sube después de la última»). El hook
 * sale a corte en f272 (3,7 f tras su última palabra: la toma solo trae 0,46 s de aire tras ella, 13,8 f, y no cabe una disolvencia ni la subida de 24 f
 * de la música: sube EN el corte y el golpe de f272 suena con la música abajo, declarado en la puerta). La mitad y el CTA dejan 27 f y 12 f. Las voces salen de
 * `limites-voz.py`, de `envolvente-voz.py` y de los arranques de sílaba (`herramientas/onsets-voz.py`), no de whisper (que pone la primera palabra en 0,00 s).
 *
 * EL COLOR (R32): cada plano de vídeo lleva `color`, la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`: primero
 * se iguala la exposición entre planos y después se embellece. Con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida.
 *
 * NI UN PLANO DE LAS OTRAS VERSIONES (pedido del usuario; la puerta, 7b, lo comprueba). Los drones y las tres tomas de Isabella son clips que nadie ha usado. De los 28
 * recorridos solo quedaba uno libre: el usuario decidió (2026-10-09) que un clip puede repetirse si su TRAMO no comparte ni un fotograma con otra versión; la
 * puerta compara tramos y declara los clips compartidos.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-038.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-038";

export const FPS_038 = 30;

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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido del usuario: «voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −27/−32 LUFS; cada una
 * pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1, ganancia y limitador) hasta −15,0 LUFS en su ventana, así que el
 * plan no añade ganancia (`lufs` = −15 en todas).
 */
export const OBJETIVO_LUFS = -15;

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_038;

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

const v = (id: string): string => `recorrido-038/${id}.mp4`;
const a = (id: string): string => `recorrido-038/${id}.wav`;

export const metraje038: readonly Corte[] = [
  // ── Bloque 1 · el dron: la casa en su loma, sin texto ni voz ──
  {
    id: "c01-dron",
    bloque: 1,
    tipo: "video",
    src: v("dr73"),
    desde: 9.6,
    en: 0,
    dur: 98,
    zoom: [1.0, 1.03],
    entra: "corte",
    color: color({ exposure: 0, shadows: 0.25, blacks: 0, highlights: -0.3 }),
    reason:
      "La casa baja en su loma bajo un cielo abierto (DR73): el dron pasa despacio por delante y, antes de entrar, enseña cuánto aire y cuánto terreno hay alrededor de ella. Tramo 9,6-12,87 s, el de movimiento más uniforme del vuelo (dispersión 0,030). Dura hasta el golpe de 12,2 dB de f98, donde entra Isabella a corte; el frame 0 es la miniatura. Sin texto ni voz.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk03"),
    audio: a("hk03-voz"),
    voz: { s0: 0.77, s1: 6.18, lufs: -15, dice: "Domingo en familia: abuelos, tíos, primos. ¿Cuántas veces alguien queda incómodo?" },
    desde: fr(15),
    en: 98,
    dur: 174,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ exposure: 0.05, temperature: 0.02, saturation: 1.0, vibrance: 0, highlights: -0.4, whites: -0.12 }),
    reason:
      "Jardín de papiros (HK03): Isabella camina hacia la cámara por el sendero de grava, con la casa detrás; del aire a la persona, a corte en el golpe. El domingo en familia y la pregunta que selecciona a quien ya ha estado en esa mesa donde alguien no cabe. Sale a corte en el golpe de f272 (la toma solo trae 13,8 f de aire tras su última palabra).",
  },
  // ── Bloque 3 · el recorrido: el patio → el comedor → la terraza → la palmera y la vista ──
  {
    id: "c03-patio",
    bloque: 3,
    tipo: "video",
    src: v("rc27"),
    desde: 0.0,
    en: 272,
    dur: 58,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05 }),
    reason:
      "Patio interior (RC27, tramo 0,0-1,93 s, el que la V16 no usó): la grava, la palmera y la casa tras las flores; después del jardín del hook, se entra por el patio que reúne. Corta en f330, sobre el golpe de 10,3 dB.",
  },
  {
    id: "c04-comedor",
    bloque: 3,
    tipo: "video",
    src: v("rc24"),
    desde: 3.65,
    en: 330,
    dur: 39,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.25, highlights: -0.4 }),
    reason:
      "Comedor (RC24, tramo 3,65-4,95 s, el que la V16 no usó): la mesa larga, puesta, con sitio para todos; lo primero que pide una comida de domingo. La tele (encendida, a la izquierda) queda fuera de la ventana. Corta en f369, sobre el golpe de 11,0 dB.",
  },
  {
    id: "c05-terraza",
    bloque: 3,
    tipo: "video",
    src: v("rc22"),
    desde: 0.1,
    en: 369,
    dur: 58,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1 }),
    reason:
      "Terraza (RC22, tramo 0,1-2,03 s, el que la V17 no usó): los sillones de mimbre con el jacuzzi al fondo y el valle; donde se sigue la sobremesa. La tele del fondo (encendida) queda fuera. Corta en f427, sobre el golpe de 24,4 dB.",
  },
  {
    id: "c06-palmera",
    bloque: 3,
    tipo: "video",
    src: v("rc18"),
    desde: 1.7,
    en: 427,
    dur: 38,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.35, highlights: -0.4, whites: -0.12 }),
    reason:
      "Terraza (RC18, tramo 1,7-2,97 s, el que la V16 no usó): la palmera enorme se aparta y deja ver la terraza abierta a la vista; el espacio exterior que sobra para todos. Se usa el final del plano, con luz: de 0,0 a 1,2 s la palmera lo oscurece (luma 73-85 frente a 135 de los vecinos) y el corte saltaba 55 niveles. La mitad entra a corte en el golpe de 13,7 dB de f465.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c07-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md05"),
    audio: a("md05-voz"),
    voz: { s0: 0.67, s1: 5.3, lufs: -15, dice: "Hijos, abuelos, amigos que vienen de visita, todos pueden estar aquí con total comodidad." },
    desde: fr(12),
    en: 465,
    dur: 175,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ exposure: -0.1, shadows: 0.1, highlights: -0.3, temperature: 0.02, saturation: 1.0, vibrance: 0 }),
    reason:
      "Sala (MD05): Isabella sentada en el puf, la sala amplia con el valle a su espalda; nombra a quienes vienen —hijos, abuelos, amigos— y contesta a la pregunta del hook: todos caben, con comodidad. Plano cerrado al 60 % del alto del 4K; la tele encendida de la pared queda fuera de la ventana.",
  },
  // ── Bloque 5 · el recorrido: la cocina → una alcoba con escritorio → una alcoba blanca → el valle (la vista) ──
  {
    id: "c08-cocina",
    bloque: 5,
    tipo: "video",
    src: v("rc15"),
    desde: 4.5,
    en: 640,
    dur: 38,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.4, shadows: 0.3, highlights: -0.45, whites: -0.15, contrast: 1.08 }),
    reason:
      "Cocina (RC15, tramo 4,5-5,77 s, el que la V13 no usó): la isla y el ciprés junto a la ventana al jardín; donde se junta la familia mientras se cocina, justo después de nombrar a quienes caben. Se acaba antes de que un pilar de madera tape el cuadro (desde 5,9 s) y se empieza más tarde que 3,8 s, donde es el plano más oscuro (luma 104 frente a 135 de la mitad). Corta en f678, sobre el golpe de 11,2 dB.",
  },
  {
    id: "c09-hijos",
    bloque: 5,
    tipo: "video",
    src: v("rc12"),
    desde: 3.9,
    en: 678,
    dur: 59,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.4, highlights: -0.4, whites: -0.12 }),
    reason:
      "Alcoba (RC12, tramo 3,9-5,8 s, el que la V13 no usó): la cama de colcha morada con su escritorio al lado; un cuarto de los que se piensan para los hijos (lectura del plano, no dato de la ficha). Cada quien tiene su lugar. Corta en f737, sobre el golpe de 18,3 dB.",
  },
  {
    id: "c10-alcoba",
    bloque: 5,
    tipo: "video",
    src: v("rc10"),
    desde: 4.4,
    en: 737,
    dur: 96,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.05, temperature: -0.04, saturation: 1.0 }),
    reason:
      "Alcoba (RC10, tramo 4,4-7,6 s, el que la V13 no usó): la cortina de gasa y la cama blanca con sus cojines; el descanso de otra generación, con luz de la ventana. Se usa el tramo luminoso (luma 138-150 desde 4,4 s; de 2,8 a 4,0 s es 109-118 y el corte saltaba 50 niveles). Corta en f833, sobre el golpe de 14,9 dB.",
  },
  {
    id: "c11-valle",
    bloque: 5,
    tipo: "video",
    src: v("dr77"),
    desde: 9.3,
    en: 833,
    dur: 97,
    zoom: [1.0, 1.03],
    entra: "corte",
    color: color({ exposure: 0.05, highlights: -0.35 }),
    reason:
      "Valle (DR77, tramo 9,3-12,53 s, dispersión 0,088): las montañas y las nubes desde la casa; la recompensa tras ver los espacios, la vista que comparten todos, y el plano más largo del bloque (3,2 s). La ventana a 0,62 deja fuera el SUV blanco del camino (a 0,58 asomaba por el borde en los primeros 0,3 s). Corta en f930, sobre el golpe de 14,3 dB, donde entra el CTA.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c12-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct06"),
    audio: a("ct06-voz"),
    voz: { s0: 1.13, s1: 4.37, lufs: -15, dice: "Recorridos privados disponibles, reserva el tuyo en el enlace." },
    desde: fr(26),
    en: 930,
    dur: 117,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ exposure: 0.2, temperature: 0, saturation: 1.0, vibrance: 0, highlights: -0.5, whites: -0.15 }),
    reason:
      "Camino de piedra (CT06): Isabella camina hacia la cámara bajo el cielo de nubes; pide una sola acción, reservar el recorrido en el enlace. Entra a corte en el golpe de 14,3 dB de f930, donde la canción empieza su fundido. Su imagen funde a negro 12 f después de la última palabra y entra la tarjeta.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  {
    id: "c13-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-038/cierre-oscuro.png",
    en: 1047, // = el `en` + `dur` de c12
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason: "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web en silencio.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c13). */
export const DURACION_038 = 1047 + DUR_TARJETA;
