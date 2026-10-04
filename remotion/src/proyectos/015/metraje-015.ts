/**
 * PLAN DE MONTAJE — proyecto 015 · «Lo que aprendí en APEX»
 * (1080×1920 · 30 fps · 1563 f · 52,1 s). Artefactos: proyectos/015/artefactos/.
 *
 * EL MATERIAL: Isabella Cadavid (la presentadora del 013) cuenta lo que se lleva
 * del primer día de APEX · El Wall Street Inmobiliario, en NUEVE tomas de iPhone
 * grabadas una frase por toma y cada una en un sitio del hotel (photocall,
 * stand, jardín, pasillo, fachada, escalera, flores, palmeras). Micro de solapa:
 * la voz es buena en todas. Lo que no sirve es lo de alrededor de la frase: en
 * cada toma ella entra en cuadro, se coloca, habla y se queda sonriendo —entre
 * 0,5 y 1,1 s de silencio a cada lado—, y montadas tal cual eran 60,1 s con
 * doce de aire.
 *
 * EL ENCARGO, literal: «agregar textos a este video con Fx de sonido, al final
 * agrega las redes sociales @propiedadesluxur», y a mitad de trabajo: «recorta
 * los espacios de silencio, y haz que las transiciones entre video tengan un
 * fade in o out en opacidad». De ahí salen las dos reglas de este archivo:
 *
 *   1. LA VOZ MARCA EL TIEMPO (director §3i). Cada corte va de su primera a su
 *      última palabra, y entre la última de una toma y la primera de la
 *      siguiente hay SIEMPRE `HUECO` = 15 f (0,5 s): la pausa natural entre dos
 *      frases, la misma que ella hace dentro de las tomas (0,3-0,7 s medidos).
 *   2. LA DISOLVENCIA VIVE EN ESE HUECO. Empieza 2 f después de la última
 *      palabra y acaba 1 f antes de la siguiente: ninguna palabra suena con su
 *      imagen a medio fundir. Por eso cada corte `k ≥ 2` tiene `desde` un frame
 *      antes de que ella empiece a hablar (su voz arranca en `en + 1`), y cada
 *      corte acaba 14 f después de su última palabra (2 de margen + 12 de
 *      disolvencia).
 *
 * Los dos límites de cada frase (`voz.s0`, `voz.s1`) NO salen de whisper: sus
 * marcas por palabra ponen la primera siempre en 0,00 s aunque ella empiece a
 * hablar a los 0,5-0,9 s. Salen de la ENERGÍA en la banda de voz (300-3400 Hz,
 * ventanas de 10 ms, umbral = suelo + 12 dB, huecos < 120 ms rellenos),
 * contrastada con el espectrograma de cada toma. `revisar-015.mjs` rehace las
 * cuentas de arriba a partir de ellos.
 *
 * `desde` VA EN SEGUNDOS DEL CLIP FUENTE (describe el material), escrito como
 * frame exacto (`fr(20)` = 20/30 s) para que imagen y voz corten en la MISMA
 * muestra: `Voz015` lee el WAV con el mismo `trimBefore` que el vídeo.
 */
import type { Corte as CorteDelFormato } from "../../motor/metraje";

/** `corte` solo lo usa el primero (no entra de nada: su f0 es la miniatura). Entre tomas, siempre `disolver`: lo pidió el cliente. */
export type Entrada = "corte" | "disolver";

/** Dónde habla en SU clip y a qué nivel. Medido, no estimado (ver cabecera). */
export interface VozDelCorte {
  /** Segundo de la fuente en que empieza a hablar. */
  s0: number;
  /** Segundo de la fuente en que termina de hablar. */
  s1: number;
  /** Sonoridad integrada de la voz (LUFS), `loudnorm` sobre [s0 − 0,1, s1 + 0,15]. */
  lufs: number;
  /** Lo que dice (whisper-small; lo dudoso, entre corchetes). Solo para leer el plan. */
  dice: string;
}

export interface Corte extends CorteDelFormato<Entrada> {
  tipo: "video";
  /** El WAV de la voz de este clip, sin tratar (`normalizar.sh`). */
  audio: string;
  voz: VozDelCorte;
}

export const FPS_015 = 30;
/** Frames entre el fin de una frase y el principio de la siguiente. */
export const HUECO = 15;
/**
 * Frames del cruce de la VOZ entre dos tomas: los 6 últimos de la disolvencia
 * de 12, en potencia constante. Vive aquí, con los datos, porque lo usan el
 * intérprete (`Voz015.tsx`) y la puerta (`revisar-015.mjs`), que comprueba que
 * en esos frames no suena ninguna palabra.
 */
export const CRUCE_VOZ = 6;
export const DURACION_015 = 1563;

/**
 * EL NIVEL DE LA VOZ: una ganancia por toma y NADA MÁS.
 *
 * Medidas con el mismo micro, las nueve frases van de −25,8 a −19,8 LUFS: las
 * cinco de dentro (18:34-18:41) más bajas que las cuatro de fuera (21:17-21:28),
 * y la segunda toma 3 dB por debajo de sus dos vecinas. Montadas en fila, eso
 * es un salto de volumen en cada fundido. Se igualan todas a −21 LUFS, que es la
 * mediana: el total de lo que se mueve es el mínimo posible (la que más, +4,8 dB
 * la segunda; seis de las nueve se quedan a ±1,5 dB) y el pico más alto queda
 * en −1,6 dBTP.
 *
 * Es lo que haría el fader de cada clip en cualquier editor, y lo único que se
 * hace: sin filtro, sin compresor, sin limpiar el fondo. En el 013 la misma
 * presentadora prefirió su audio de evento sin tratar a la versión limpiada y
 * subida a −15 LUFS; esto no la contradice, porque no cambia CÓMO suena cada
 * toma, solo que las nueve suenen igual de fuertes. El número vive aquí para
 * que quitarlo sea cambiar una constante.
 */
export const OBJETIVO_LUFS = -21;
/** Ganancia lineal de la voz de un corte (puede pasar de 1: Remotion la aplica al renderizar). */
export const gananciaVoz = (c: Corte): number => Math.pow(10, (OBJETIVO_LUFS - c.voz.lufs) / 20);

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_015;

/** El empuje de todas las tomas: 4 % en toda su ventana, lento y hacia ella. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];

const v = (id: string) => `apex-015/${id}.mp4`;
const a = (id: string) => `apex-015/${id}.wav`;

export const metraje015: readonly Corte[] = [
  {
    id: "c01",
    tipo: "video",
    src: v("IMG_2592"),
    audio: a("IMG_2592"),
    desde: fr(20),
    en: 0,
    dur: 100,
    zoom: EMPUJE,
    voz: { s0: 0.87, s1: 3.52, lufs: -22.53, dice: "Lo más valioso de APEX no fueron las propiedades." },
    reason:
      "El photocall con APEX detrás, y la frase que abre la pieza: el hook ya está dicho en 2,7 s. Entra 6 f antes de su primera palabra y NO nace de negro: el f0 es la miniatura del reel y tiene que ser ya ella delante del logo, con el titular puesto (R23).",
  },
  {
    id: "c02",
    tipo: "video",
    src: v("IMG_2593"),
    audio: a("IMG_2593"),
    desde: fr(21),
    en: 100,
    dur: 194,
    zoom: EMPUJE,
    entra: "disolver",
    voz: {
      s0: 0.72,
      s1: 6.7,
      lufs: -25.76,
      dice: "Fueron las ideas, las oportunidades, y entender que [tras] de cada problema hay una oportunidad.",
    },
    reason:
      "La respuesta al hook, caminando hacia cámara por el stand: el paseo empuja la frase. El prerrollo de la disolvencia (f9-f21) es ella ya andando, no un arranque de toma.",
  },
  {
    id: "c03",
    tipo: "video",
    src: v("IMG_2598"),
    audio: a("IMG_2598"),
    desde: fr(18),
    en: 294,
    dur: 107,
    zoom: EMPUJE,
    entra: "disolver",
    voz: { s0: 0.64, s1: 3.71, lufs: -23.53, dice: "Hoy aprendimos que no solo se trata de resolver problemas." },
    reason: "Primera lección, en el jardín de interior. Es la mitad ✗ de una comparación que se cierra en el corte siguiente.",
  },
  {
    id: "c04",
    tipo: "video",
    src: v("IMG_2601"),
    audio: a("IMG_2601"),
    desde: fr(13),
    en: 401,
    dur: 136,
    zoom: EMPUJE,
    entra: "disolver",
    voz: {
      s0: 0.48,
      s1: 4.49,
      lufs: -21.68,
      dice: "Se trata de crear estrategias que conviertan esas oportunidades en soluciones.",
    },
    reason:
      "La mitad ✓ de la lección, junto a las plantas y el ventanal de noche. Es la toma que empieza a hablar antes (0,48 s): su prerrollo arranca en el f1 del clip, sin margen, y es la razón de que la disolvencia no pueda ser más larga.",
  },
  {
    id: "c05",
    tipo: "video",
    src: v("IMG_2603"),
    audio: a("IMG_2603"),
    desde: fr(25),
    en: 537,
    dur: 152,
    zoom: EMPUJE,
    entra: "disolver",
    voz: {
      s0: 0.86,
      s1: 5.44,
      lufs: -21.78,
      dice: "Y algo todavía más importante: tu red cambia las oportunidades a las que tienes acceso.",
    },
    reason:
      "El pasillo de las velas, andando hacia cámara: segunda lección. Se respeta su pausa de 0,46 s tras «importante»; es la que da peso a «tu red».",
  },
  {
    id: "c06",
    tipo: "video",
    src: v("IMG_2614"),
    audio: a("IMG_2614"),
    desde: fr(17),
    en: 689,
    dur: 136,
    zoom: EMPUJE,
    entra: "disolver",
    voz: {
      s0: 0.61,
      s1: 4.63,
      lufs: -19.96,
      dice: "Cuando aprendes a relacionarte estratégicamente, tus posibilidades escalan.",
    },
    reason:
      "Primera toma de FUERA (la fachada de cristal, ya de noche) y la continuación de la lección de la red. El salto de interior a exterior es el mayor de la pieza y cae en una disolvencia, no en un corte.",
  },
  {
    id: "c07",
    tipo: "video",
    src: v("IMG_2617"),
    audio: a("IMG_2617"),
    desde: fr(14),
    en: 825,
    dur: 297,
    zoom: EMPUJE,
    entra: "disolver",
    voz: {
      s0: 0.49,
      s1: 9.89,
      lufs: -19.98,
      dice: "También hubo una frase que me quedó muy marcada: no siempre gana el mejor producto, gana el que el mercado entiende mejor. Por eso es muy importante cómo comunicas.",
    },
    reason:
      "La rampa junto al agua, la toma más larga (9,9 s de voz): la cita del día. Plano abierto, el más lejano de la pieza: aquí el protagonista es la frase, y el movimiento lo hace el texto.",
  },
  {
    id: "c08",
    tipo: "video",
    src: v("IMG_2624"),
    audio: a("IMG_2624"),
    desde: fr(16),
    en: 1122,
    dur: 254,
    zoom: EMPUJE,
    entra: "disolver",
    voz: {
      s0: 0.58,
      s1: 8.52,
      lufs: -19.83,
      dice: "Pero quizás la lección más importante del primer día es que tienes que dejar de preguntarte [qué vender] y empezar a preguntarte cómo [puedes] ayudar.",
    },
    reason:
      "Detrás de las flores: la lección que ella misma llama la más importante. Se respetan sus dos pausas de medio segundo (antes de «y empezar» y de «cómo»): son el giro de la frase.",
  },
  {
    id: "c09",
    tipo: "video",
    src: v("IMG_2626"),
    audio: a("IMG_2626"),
    desde: fr(19),
    en: 1376,
    dur: 187,
    zoom: EMPUJE,
    entra: "disolver",
    voz: {
      s0: 0.65,
      s1: 6.0,
      lufs: -20.65,
      dice: "Soy Isabella Cadavid, [realtor] de la ciudad de [Medellín]. Si te gustó la información, escríbeme y hablamos.",
    },
    reason:
      "Las palmeras: firma y cierre. Es la única toma que no acaba en un fundido, así que se queda 26 f (0,87 s) después de «hablamos» con ella sonriendo: el tiempo de leer @propiedadesluxur antes de que el reel vuelva a empezar.",
  },
];
