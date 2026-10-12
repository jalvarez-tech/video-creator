/**
 * EL REEL 032 — Casa Campestre en Guarne (Duglas Yovana), los planos como DATOS. V16.
 *
 * Segundo reel de esta casa (el primero fue la V13, proyecto 029), con la ESTRUCTURA DEL CANAL: DRON · HOOK · RECORRIDO · MITAD · RECORRIDO ·
 * CTA. Tres frases de Isabella en 38 s; el resto es la casa con música:
 *
 *   bloque 1  c01                DRON (DR78): el dron pasa en lateral por la fachada, SIN TEXTO NI VOZ (el frame 0 es la miniatura)
 *   bloque 2  c02                HOOK (HK02): «Tus hijos merecen crecer con montañas, no con tráfico.»
 *   bloque 3  c03 c04 c05        RECORRIDO: jardín → comedor → la sala de la terraza abierta al valle, a corte sobre los golpes de la música
 *   bloque 4  c06                MITAD (MD01): «La abuela también puede disfrutar de esta casa.»
 *   bloque 5  c07 c08 c09 c10    RECORRIDO: el sillón junto al ventanal → la cama → el lavamanos de cobre → el mirador del telescopio (la vista)
 *   bloque 6  c11 c12            CTA (CT04): «Solicita tu recorrido virtual o presencial.» y la tarjeta oscura
 *
 * LA IDEA EN UNA LÍNEA. Esta casa es para la familia en la que caben todos: los hijos crecen con montañas (hook), la abuela también la disfruta
 * (mitad) y se pide un recorrido para verlo (CTA). EL HILO se eligió por la confianza de la transcripción: es el único con TODAS las palabras de sus
 * tres tomas ≥ 0,55 (el de la diáspora, más fuerte, queda para la versión siguiente: `01-plan.md`).
 *
 * REGLAS FIJAS DEL CANAL (`recorrido-luxur` SKILL.md §0): la primera toma sale SIEMPRE sin texto y sin voz (el dron dura hasta que Isabella entra
 * opaca, en f109); nunca el sello; el cierre es la tarjeta oscura con el logo y la web, y nada se congela. Sin cifras.
 *
 * EL ENCUADRE. Todo el material es 16:9 y aquí es vertical de 1296×2304: `normalizar.mjs` recorta de cada fotograma una ventana 9:16
 * (`encuadre-032.json`): sigue a Isabella en sus tres tomas (en la mitad, 4K, cerrada al 64 % del alto); en el dron y los recorridos va a mano.
 * El `zoom` de un plano es el acercamiento SOBRE esa ventana: ≤ 1,06 en el hook y el CTA (1080p, que ya suben ×2,13) y en la mitad (cerrada).
 *
 * EL TIEMPO (R29). Cada toma de Isabella entra con su imagen opaca UN frame antes de su primera sílaba (`desde` = ese frame de la fuente, con
 * ≥ 12 f de clip antes para la disolvencia) y se queda 14 f tras su última palabra (2 de margen + 12 de disolvencia al plano siguiente; el CTA,
 * hasta el final de su clip). Entre dos recorridos el corte es SECO y cae sobre un golpe fuerte de la canción (R33: los golpes MEDIDOS,
 * `proyectos/032/musica/golpes-032.json`; la puerta lo comprueba y `golpes-render.py` lo confirma sobre el audio del render). Las voces salen de
 * `limites-voz.py` y de la envolvente de la voz (`herramientas/envolvente-voz.py`), no de whisper.
 *
 * EL COLOR (R32): cada plano de vídeo lleva `color`, la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`: primero
 * se iguala la exposición entre planos y después se embellece. Con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-032.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-032";

export const FPS_032 = 30;

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
const fr = (n: number): number => n / FPS_032;

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

const v = (id: string): string => `recorrido-032/${id}.mp4`;
const a = (id: string): string => `recorrido-032/${id}.wav`;

export const metraje032: readonly Corte[] = [
  // ── Bloque 1 · el dron: la fachada desde el aire, sin texto ni voz ──
  {
    id: "c01-dron",
    bloque: 1,
    tipo: "video",
    src: v("dr78"),
    desde: 7.8,
    en: 0,
    dur: 109,
    zoom: [1.0, 1.04],
    entra: "corte",
    color: color({ exposure: 0.15, highlights: -0.3 }),
    reason:
      "Fachada desde el aire (DR78): el dron pasa en lateral, a velocidad constante (dispersión del movimiento 0,05), del muro de piedra con los papiros a la terraza; sitúa la casa antes que a nadie. Tramo 7,8-11,4 s: desde los 12 s entran el garaje y las placas de los carros. Dura hasta que Isabella entra opaca (f109); entra a corte: el frame 0 es la miniatura y no nace de negro. Sin texto ni voz.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk02"),
    audio: a("hk02-voz"),
    voz: { s0: 0.8, s1: 3.82, lufs: -15, dice: "Tus hijos merecen crecer con montañas, no con tráfico." },
    desde: fr(23),
    en: 109,
    dur: 106,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ exposure: 0.4, shadows: 0.15, temperature: 0.02, saturation: 1.04 }),
    reason:
      "Jardín lateral (HK02): del aire a la persona, de pie en la grava entre la casa y la vegetación; la frase promete una infancia, no una ficha, y nombra lo que el paseo enseña enseguida: montañas. Disuelve porque cambia el registro, no el sitio.",
  },
  // ── Bloque 3 · el recorrido: jardín → comedor → terraza ──
  {
    id: "c03-jardin",
    bloque: 3,
    tipo: "video",
    src: v("rc27"),
    desde: 2.5,
    en: 215,
    dur: 106,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.15, highlights: -0.3 }),
    reason:
      "Jardín (RC27): sigue en el exterior donde estaba ella y avanza por la grava hacia la casa, con la palmera y los papiros: el sitio donde los hijos del hook juegan. Corta en f321, sobre el golpe de 12,6 dB.",
  },
  {
    id: "c04-comedor",
    bloque: 3,
    tipo: "video",
    src: v("rc24"),
    desde: 0.3,
    en: 321,
    dur: 100,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.4, highlights: -0.3 }),
    reason:
      "Comedor (RC24): ya dentro, la mesa puesta para todos; es donde se junta la familia. La tele del fondo queda fuera de la ventana. Corta en f421, sobre el golpe de 10,8 dB.",
  },
  {
    id: "c05-terraza",
    bloque: 3,
    tipo: "video",
    src: v("rc18"),
    desde: 3.0,
    en: 421,
    dur: 109,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.35, highlights: -0.3 }),
    reason:
      "Terraza (RC18): del comedor se sale a la sala exterior y aparece el valle: las montañas que prometió el hook. Acaba el paseo social; la mitad entra disolviendo sobre su golpe de f520 (11,7 dB), que suena entero antes de que baje la música.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md01"),
    audio: a("md01-voz"),
    voz: { s0: 1.32, s1: 3.33, lufs: -15, dice: "La abuela también puede disfrutar de esta casa." },
    desde: fr(39),
    en: 530,
    dur: 75,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ exposure: 0.3, shadows: 0.12, highlights: -0.3, temperature: 0.02, saturation: 1.04 }),
    reason:
      "Sendero de la fachada (MD01): Isabella en la grava junto a la casa, sin escalones a la vista; después de los hijos, la abuela. Plano cerrado al 64 % del alto del 4K para que su cara se vea.",
  },
  // ── Bloque 5 · el recorrido: el sillón → la cama → el lavamanos → el mirador (la vista) ──
  {
    id: "c07-sillon",
    bloque: 5,
    tipo: "video",
    src: v("rc08"),
    desde: 0.6,
    en: 605,
    dur: 95,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.1, blacks: 0, shadows: 0.2 }),
    reason:
      "Alcoba principal, rincón del ventanal (RC08): la cortina se abre a un sillón reclinable frente al valle; el sitio de la abuela de la frase. Corta en f700, sobre el golpe de 12,0 dB.",
  },
  {
    id: "c08-cama",
    bloque: 5,
    tipo: "video",
    src: v("rc09"),
    desde: 0.5,
    en: 700,
    dur: 92,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.35 }),
    reason:
      "Alcoba principal (RC09): la misma habitación, girando del sillón a la cama con su cabecero; el descanso. Mismo sentido del giro que el plano anterior. Corta en f792, sobre el golpe de 10,9 dB.",
  },
  {
    id: "c09-lavamanos",
    bloque: 5,
    tipo: "video",
    src: v("rc14"),
    desde: 0.1,
    en: 792,
    dur: 72,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.15, saturation: 1.0, vibrance: 0, temperature: 0 }),
    reason:
      "Baño (RC14): se cruza la puerta y aparece el lavamanos de cobre con la luz cálida del jardín interior; lo íntimo, antes de salir. Sus últimos 12 f se mezclan con el mirador, que acaba de entrar en el golpe de f864 (12,6 dB).",
  },
  {
    id: "c10-mirador",
    bloque: 5,
    tipo: "video",
    src: v("rc23"),
    desde: 0.5,
    en: 864,
    dur: 126,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.25, blacks: 0.05, shadows: 0.45, highlights: -0.4 }),
    reason:
      "Mirador (RC23): el telescopio y las sillas frente al valle al atardecer; la vista, la recompensa y el plano más largo del bloque, donde se juntan nietos y abuela. Entra DISOLVIENDO y la disolvencia acaba en el golpe de 12,6 dB de f863,6: a corte, del lavamanos cálido a la parrilla negra a contraluz saltaba −23 niveles de luma. La música empieza a caer bajo él.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c11-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct04"),
    audio: a("ct04-voz"),
    voz: { s0: 0.85, s1: 3.13, lufs: -15, dice: "Solicita tu recorrido virtual o presencial." },
    desde: fr(25),
    en: 990,
    dur: 84,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ saturation: 1.0, temperature: 0.02, highlights: -0.25 }),
    reason:
      "Entrada (CT04): Isabella junto a los papiros, donde empieza una visita, pide la acción: un recorrido, virtual (para quien vive lejos) o presencial. Es la única toma de CTA con todas las palabras oídas con confianza; el Mini aparcado a su derecha queda fuera de la ventana. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  {
    id: "c12-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-032/cierre-oscuro.png",
    en: 1074, // = el `en` + `dur` de c11
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason: "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c12). */
export const DURACION_032 = 1074 + DUR_TARJETA;
