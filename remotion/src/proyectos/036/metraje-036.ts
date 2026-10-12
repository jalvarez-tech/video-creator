/**
 * EL REEL 036 — Casa Campestre en Guarne (Duglas Yovana), los planos como DATOS. V19.
 *
 * Cuarto reel de esta casa (la V13 fue el 029, la V16 el 032 y la V17 el 033) y el primero en estilo CINEMATOGRÁFICO: ritmo pausado, drones largos a
 * velocidad constante, color de cine y una música que crece hasta la vista. La ESTRUCTURA DEL CANAL: DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA.
 * Tres frases de Isabella (≈ 12 s de voz) en 41,9 s; el resto es la casa con música. Ni un clip de la V13, la V16 ni la V17 (la puerta, 7b, lo comprueba):
 *
 *   bloque 1  c01                DRON (DR75): la casa en su cerro, en pasada lateral, SIN TEXTO NI VOZ (el frame 0 es la miniatura)
 *   bloque 2  c02                HOOK (HK11): «El ruido, el tráfico, el afán. Llegas a tu hogar donde todo cambia. Ven, te muestro por qué.»
 *   bloque 3  c03 c04            RECORRIDO: la órbita del dron alrededor de la casa (DR81) → la sala que se abre a la terraza y al valle (RC17)
 *   bloque 4  c05                MITAD (MD08): «Jacuzzi, asado con tu familia y la vista ideal.»
 *   bloque 5  c06 c07 c08 c09    RECORRIDO: la alcoba (RC11) → el lavamanos (RC05) → la llegada a la casa (DR79) → el valle (DR81, la vista)
 *   bloque 6  c10 c11            CTA (CT07, recortado): «Tu familia merece respirar distinto. Agenda tu visita ahora.» y la tarjeta
 *
 * LA IDEA EN UNA LÍNEA. Esta casa es para quien quiere salir del ruido de la ciudad y está cansado del tráfico y del afán: el ruido (hook), lo que cambia
 * aquí —el jacuzzi, el asado, la vista— (mitad) y respirar distinto (CTA). Es el hilo del REFUGIO, que no había usado ninguna versión de esta casa.
 *
 * LO CINEMATOGRÁFICO, MEDIDO. Cada dron es un tramo de movimiento UNIFORME de su vuelo (la diferencia media entre fotogramas sobre el 16:9 entero,
 * dispersión ≤ 0,043; `herramientas/movimiento.py` y `ventana-fina.py` lo confirman sobre el clip normalizado) y su ventana 9:16 se mueve en LÍNEA
 * RECTA (`encuadre.py`, MANUAL): la apertura acompaña la deriva de la casa, la órbita la sigue a la velocidad a la que cruza el cuadro y la vista va
 * quieta. Los drones van sin `zoom`: el movimiento es el del vuelo. La vista es el plano más largo del bloque 5 y cae sobre el punto más alto de la
 * canción (`audio-036.ts`).
 *
 * REGLAS FIJAS DEL CANAL (`recorrido-luxur` SKILL.md §0): la primera toma sale SIEMPRE sin texto y sin voz (el dron dura hasta que Isabella entra a
 * corte, en f114); nunca el sello; el cierre es la tarjeta oscura con el logo y la web, y nada se congela. Sin cifras en pantalla ni en voz.
 *
 * EL ENCUADRE. Todo el material es 16:9 y aquí es vertical de 1296×2304: `normalizar.mjs` recorta de cada fotograma una ventana 9:16
 * (`encuadre-036.json`): sigue a Isabella en sus tres tomas (Vision de Apple; en el CTA, 4K, cerrada al 85 % del alto); en los drones y los recorridos
 * va a mano, mirando el fotograma COMPLETO (`herramientas/ventanas-prueba.py`). El `zoom` de las tomas de Isabella es un empuje lento: ≤ 1,06 en los
 * 4K y ≤ 1,04 en la mitad (1080p, que ya sube ×2,13).
 *
 * EL TIEMPO (R29, R33). Los cortes salen de `herramientas/buscar-cortes-lp.py` sobre *Begin Again* con la duración real de cada plano (`proyectos/036/
 * musica/golpes-036.json`): cada corte cae en el fotograma de un golpe medido (frame = (golpe − 64,739 s) × 30). Las tres tomas de Isabella entran A
 * CORTE sobre un golpe ≥ 9,9 dB y su primera sílaba llega ≥ 8 f después (el golpe suena entero y la música baja antes de que hable). El hook sale a corte
 * (el clip acaba 5 f después de «por qué»: no hay cola para disolver) sobre el golpe de 9,2 dB de f280,5; la mitad sale DISOLVIENDO a la alcoba (le
 * quedan 20 f tras su última palabra) y la vista entra disolviendo desde el dron de la llegada. Las voces salen de `limites-voz.py` y de los
 * arranques de sílaba (`herramientas/onsets-voz.py`), no de whisper.
 *
 * EL COLOR (R32): cada plano de vídeo lleva `color`, la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`: primero
 * se iguala la exposición entre planos y después se embellece. Con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-036.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-036";

export const FPS_036 = 30;

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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido del encargo: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −29,5/−31,7
 * LUFS; cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1, ganancia y limitador) hasta −15,0 LUFS en su ventana,
 * así que el plan no añade ganancia (`lufs` = −15 en todas).
 */
export const OBJETIVO_LUFS = -15;

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_036;
/**
 * Un segundo de un DRON (29,97 fps en la fuente) en el clip normalizado: `normalizar.mjs` lo reproduce un 0,1 % más rápido para que ningún
 * fotograma se repita al pasar a 30 fps, así que el segundo `s` de la fuente cae en `s × 1000/1001` del clip. Los tramos medidos (movimiento,
 * flujo, encuadre) están en segundos de la FUENTE.
 */
const dji = (s: number): number => (s * 1000) / 1001;

/** Isabella: un empuje lento hacia ella. Los 4K (hook y CTA) aguantan 1,06; la mitad, 1080p, 1,04. Los drones y los recorridos van quietos: ya se mueven. */
const EMPUJE: readonly [number, number] = [1.0, 1.06];
const EMPUJE_1080: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

/**
 * LA BASE DEL COLOR, cinematográfica: contraste con cuerpo, negros profundos, luces recogidas y un punto cálido. `colorCorrection()` aplica:
 * exposición → balance de blancos → sombras/luces/blancos/negros → contraste → saturación → vibrance. Los planos con Isabella llevan `saturation` ≤ 1,06 y
 * temperatura ≤ 0,06 (la piel donde estaba); `vibrance` ≤ 0,05 en todos.
 */
const COLOR_BASE: ColorCine = {
  contrast: 1.15, // cuerpo de cine (el tope del canal): los drones, grabados con cielo nublado, llegan planos
  blacks: -0.08, // negros profundos, sin aplastar el bosque (con −0,10 la vista acababa con un 12,6 % de píxeles ≤ 8)
  shadows: 0.05, // … sin cerrar las sombras de los interiores
  highlights: -0.28, // las luces se recogen: cielos y ventanales no se queman
  whites: -0.08,
  temperature: 0.05, // la luz cálida que pide el estilo, sin teñir la piel
  saturation: 1.06, // la viveza va aquí y NO en `vibrance`
  vibrance: 0.03, // lo apagado sube un poco más que lo vivo; tope 0,05
};

/** El color de un plano: la base más el ajuste de su toma (medido, `medir-color.py`). */
const color = (ajuste: ColorCine = {}): ColorCine => ({ ...COLOR_BASE, ...ajuste });

const v = (id: string): string => `recorrido-036/${id}.mp4`;
const a = (id: string): string => `recorrido-036/${id}.wav`;

export const metraje036: readonly Corte[] = [
  // ── Bloque 1 · el dron: la casa en su cerro, sin texto ni voz ──
  {
    id: "c01-dron",
    bloque: 1,
    tipo: "video",
    src: v("dr75"),
    desde: dji(22.4),
    en: 0,
    dur: 114,
    zoom: QUIETO,
    entra: "corte",
    color: color({ shadows: 0.12 }),
    reason:
      "La casa en su cerro (DR75): el dron pasa en lateral con el cielo y la montaña detrás y la ventana acompaña la deriva de la casa a velocidad constante; es el lugar antes que la persona. Tramo 22,4-26,2 s, el de movimiento más uniforme del vuelo (dispersión 0,022). Dura hasta el golpe de 9,9 dB de f114, donde entra Isabella a corte; el frame 0 es la miniatura. Sin texto ni voz.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk11"),
    audio: a("hk11-voz"),
    voz: {
      s0: 0.43,
      s1: 5.44,
      lufs: -15,
      dice: "El ruido, el tráfico, el afán. Llegas a tu hogar donde todo cambia. Ven, te muestro por qué.",
    },
    desde: 0,
    en: 114,
    dur: 166,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ exposure: 0.05, temperature: 0.04, saturation: 1.0, vibrance: 0 }),
    reason:
      "Sala abierta (HK11): Isabella camina hacia la cámara entre el mimbre y las palmas; del aire a la persona, a corte en el golpe. Nombra el dolor del cliente (el ruido, el tráfico, el afán) y la salida (una casa donde todo cambia), y lo invita a entrar. Sale a corte en f280, sobre el golpe de 9,2 dB de f280,5 (y la música vuelve en ese mismo fotograma): el clip acaba 5 f después de «por qué».",
  },
  // ── Bloque 3 · el recorrido: la órbita alrededor de la casa → la sala que se abre al valle ──
  {
    id: "c03-orbita",
    bloque: 3,
    tipo: "video",
    src: v("dr81"),
    desde: dji(17.3),
    en: 280,
    dur: 104,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.32, shadows: 0.22, highlights: -0.6, whites: -0.3, saturation: 1.0 }),
    reason:
      "La casa desde el aire (DR81): el dron gira y la ventana sigue a la casa a la velocidad a la que cruza el cuadro (0,186 del ancho por segundo), así que ella queda quieta y el paisaje gira detrás; es el «te muestro por qué»: dónde está. Tramo 17,3-20,77 s de la fuente (el dron gira a velocidad constante: dispersión 0,028; con la ventana siguiendo a la casa, `flujo.py` da 0 ± 1 px de desplazamiento en los 104 f). Corta en f384, sobre el golpe de 9,9 dB.",
  },
  {
    id: "c04-sala",
    bloque: 3,
    tipo: "video",
    src: v("rc17"),
    desde: 6.9,
    en: 384,
    dur: 90,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.2, shadows: 0.15 }),
    reason:
      "Sala (RC17): de la sala a la terraza de vidrio, con las palmas y el valle detrás; ya dentro, la casa se abre a lo que no tiene la ciudad. La tele encendida de la pared queda fuera de la ventana. La mitad entra a corte en el golpe de 13,4 dB de f474.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c05-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md08"),
    audio: a("md08-voz"),
    voz: { s0: 0.72, s1: 3.83, lufs: -15, dice: "Jacuzzi, asado con tu familia y la vista ideal." },
    desde: fr(9),
    en: 474,
    dur: 126,
    zoom: EMPUJE_1080,
    entra: "corte",
    color: color({ exposure: 0.15, highlights: -0.55, temperature: 0.03, saturation: 1.0, vibrance: 0 }),
    reason:
      "Terraza al atardecer (MD08): Isabella junto al jacuzzi, con el cielo dorado y el valle detrás; donde acaba el paseo social, dice lo que cambia aquí, con un gesto hacia la vista. Disuelve a la alcoba sobre el golpe de f600.",
  },
  // ── Bloque 5 · el recorrido: la alcoba → el lavamanos → la llegada a la casa → el valle (la vista) ──
  {
    id: "c06-alcoba",
    bloque: 5,
    tipo: "video",
    src: v("rc11"),
    desde: 1.0,
    en: 600,
    dur: 108,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.1, shadows: 0.12, temperature: -0.01, saturation: 0.95 }),
    reason:
      "Alcoba (RC11): las pampas del pasillo, el marco de la puerta y, al cruzarlo, la cama junto al ventanal; después del ruido, el descanso. Corta en f708, sobre el golpe de 8,8 dB.",
  },
  {
    id: "c07-lavamanos",
    bloque: 5,
    tipo: "video",
    src: v("rc05"),
    desde: 1.5,
    en: 708,
    dur: 95,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1, saturation: 1.12 }),
    reason:
      "Baño (RC05): el lavamanos martillado y la madera del mueble; la cámara se aleja despacio y la ventana lo acompaña. Lo íntimo, lo que se toca, antes de salir. Corta en f803, sobre el golpe de 10,8 dB.",
  },
  {
    id: "c08-llegada",
    bloque: 5,
    tipo: "video",
    src: v("dr79"),
    desde: dji(14.8),
    en: 803,
    dur: 108,
    zoom: QUIETO,
    entra: "corte",
    color: color({ shadows: 0.08 }),
    reason:
      "La llegada (DR79): fuera otra vez, la casa de cerca y desde abajo, sus volúmenes de piedra con el cerro encima, en una pasada lateral uniforme (dispersión 0,039); es volver a casa. La terraza del garaje y las placas quedan fuera de la ventana. La vista entra disolviendo sobre el golpe de f911.",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("dr81"),
    desde: dji(8.8),
    en: 911,
    dur: 161,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.12, shadows: 0.3, blacks: -0.04, highlights: -0.55, whites: -0.2 }),
    reason:
      "La vista (DR81): el valle con la cordillera entre nubes, en un giro lento y uniforme (dispersión 0,031); lo que la casa tiene delante, la recompensa. El plano más largo del bloque y el punto más alto de la canción: la música cae justo cuando acaba.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct07"),
    audio: a("ct07-voz"),
    voz: { s0: 0.765, s1: 4.31, lufs: -15, dice: "Tu familia merece respirar distinto. Agenda tu visita ahora." },
    desde: fr(13),
    en: 1072,
    dur: 120,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ exposure: -0.22, temperature: 0.03, saturation: 1.0, vibrance: 0 }),
    reason:
      "Sala abierta junto al vidrio (CT07): Isabella con las palmas y el valle detrás; cierra el hilo (respirar distinto) y pide una sola acción. Entra a corte en el golpe de 10,0 dB de f1072, el último antes de que la canción caiga. La toma se corta en el valle antes de «Haz clic en el enlace…»: su imagen funde a negro y entra la tarjeta.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-036/cierre-oscuro.png",
    en: 1192, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason: "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web en silencio.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_036 = 1192 + DUR_TARJETA;
