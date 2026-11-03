/**
 * EL 069 — «Unidos por Botswana»: vídeo de ayuda para reconstruir el salón de eventos donde John e Isabella se casaron. Los planos, como DATOS.
 *
 * Pieza PERSONAL de ellos dos, sin canal ni marca (se declara en la cabecera de `Botswana069.tsx`). 1080×1920 · 30 fps · 2100 f (70 s) y SIN avatar: es un montaje (director §3i).
 * REVISIÓN 1 (2026-10-28, pedido de ellos): música de fondo que «toque fibras» y el vídeo SINCRONIZADO con ella; los dos planos en que hablan, recortados desde su primera sílaba hasta la última.
 *
 * QUIÉN MARCA EL TIEMPO: LA CANCIÓN. «We Are» (Aleksey Chistilin: cinematic orquestal, «unión, solemnidad»), desde el segundo 123,977 (`INICIO_MUSICA`). Cada plano entra en un GOLPE
 * medido de la canción (`proyectos/069/musica/golpes-musica-we-are.json`, `herramientas/golpes.mjs`): `a(t)` convierte el segundo de la canción en el frame de la comp, y lo que se escribe
 * aquí es EL SEGUNDO DE LA CANCIÓN en que acaba cada plano, no un número de frames. La forma de la pista es la de la pieza (medida con `herramientas/elegir-cancion.mjs`, 0,88 de
 * correlación con lo que pide el montaje):
 *
 *   123,98-128,5   sección fuerte (−9 LUFS) con ataques cada 0,4-0,8 s            → las nueve fotos felices, cada cambio en un golpe
 *   128,99         EL GOLPE (10 dB) donde la pista CAE 11 dB a una base de ostinato → el corte seco al incendio: la música baja EN el corte, nadie la baja a mano
 *   129-141        ostinato bajo (−21 LUFS), pulso de 0,41 s                         → el incendio y, sin pisarlos, el MOV 1 (su voz sale por encima)
 *   143-166        la pista sube poco a poco (−22 → −13) con golpes de 7-10 dB       → el antes y después, el amor, las familias, los recuerdos
 *   162,5-171,25   sube a la meseta (−9 LUFS) bajo el MOV 2                          → «debemos unirnos…»: la música vuelve de golpe al acabar la frase
 *   171,25-184     meseta con golpes de 7-12 dB                                       → el mensaje final (arena, anillos, el lugar, las chispas)
 *   184-194        meseta sin golpes, que se apaga bajo la tarjeta                    → los textos se leen, sin cortes que sincronizar
 *
 * LOS DOS PLANOS EN QUE HABLAN (pedido: «que empiecen en el principio de la voz y terminen en el final»). Medidos por energía a 20 ms (150-4000 Hz), no con whisper:
 *   MOV 1  primera sílaba 11,81 s · última 20,41 s → plano desde 11,71 s (3 f de aire antes de «En») hasta 20,51 s (0,10 s tras «familia»): 8,8 s, de golpe a golpe (132,32 → 141,115)
 *   MOV 2  primera sílaba  6,01 s · última 14,45 s → plano desde  5,91 s hasta 14,68 s (0,23 s tras «construirlo»): 8,8 s, de golpe a golpe (162,485 → 171,245)
 * Antes duraban 17 y 16 s con los pasos, las risas y el «corte» de la toma a cada lado. El MOV 1 es un plano abierto en el que ellos son figuras pequeñas: se acerca de 1,45 a 1,15 (la fuente es
 * 4K y el archivo está a 1620 px, el techo de 1,5).
 *
 * LA VOZ EN OFF SIGUE PENDIENTE. Los huecos de `voz-069.ts` se recolocaron con los cortes nuevos; cada locución, cuando llegue, ducka la música (`audio-069.ts`).
 *
 * LAS ESCENAS YA NO CAEN EN 0:08 · 0:25 · 0:44 · 1:00. Con los dos MOV recortados a su voz (−8 y −7 s) y los cortes en golpes, la pieza dura 1:10 y las escenas empiezan en 0:00 · 0:08,3 · 0:17,1 ·
 * 0:38,5 · 0:47,2 y la tarjeta en 1:00. Las de voz en off (1, 3 y 5) conservan su duración del guion (8 · 21,8 · 12,8 s) para que las frases quepan.
 *
 * QUÉ ES MATERIAL Y QUÉ NO. Todo es real y de ellos: no hay banco ni IA (director §3h).
 *   · FOTOS de la boda: dos carruseles de @jalvarez.tech (recepción `A-xx`, ceremonia `B-xx`; 1440 px de ancho, apaisadas) y fotos propias del lugar antes y después. Las apaisadas van ENTERAS sobre su propio
 *     fondo desenfocado (`relleno`), salvo tres composiciones centradas que llenan el cuadro con una ventana 9:16 (`recorte`).
 *   · VÍDEO del incendio: recompresiones de mensajería a 464×832 (`inc0x`). Se ve blando a pantalla completa: NO se les pide punch-in (≤ 1,04).
 *   · VÍDEO de la fiesta (`boda`): el de la publicación de @jalvarez.tech «Video por @diegoskyoficial» (crédito al publicar). Su música NO suena: el montaje va MUDO salvo los dos MOV y la canción.
 *   · NADIE sale como «Nelson»: el guion lo nombra y ningún plano lo señala.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente; `en` y `dur`, en frames de la composición (30 fps). Los planos son CONTIGUOS. Un plano que entra disolviendo (`disolver`) empieza a verse 12 f ANTES de
 * su `en` (`solapeDe`): su clip tiene que tener esos 12 f antes de `desde`, y el anterior dura hasta ese `en`. Las disolvencias ACABAN en un golpe; los cortes secos CAEN en uno.
 *
 * Datos puros: solo `import type` y los números de la tarjeta (`cierre-069.ts`). La puerta lo carga con node.
 */
import type { Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-069";

export const FPS_069 = 30;

/**
 * El segundo de «We Are» (`musica-we-are.wav`, la canción ENTERA decodificada) que suena en el frame 0. El golpe de 10 dB de 124,010 s cae en el frame 1: el catálogo pone 30 ms de colchón
 * (`entra: 1` en el tramo) para quitar el clic sin comerse el ataque.
 */
export const INICIO_MUSICA = 123.977;

/** El frame de la composición en que suena el segundo `t` de la canción. */
export const a = (t: number): number => Math.round((t - INICIO_MUSICA) * FPS_069);

export type Entrada = "corte" | "disolver";
export type Escena = 1 | 2 | 3 | 4 | 5 | 6;

export interface Corte extends CorteDelFormato<Entrada> {
  tipo: "video" | "foto";
  /** A qué escena del guion pertenece (6 = la tarjeta final): la puerta comprueba el orden. */
  escena: Escena;
  /** El segundo de la canción en que ACABA el plano (= en el que entra el siguiente). Es lo que se escribió; `dur` sale de ahí. */
  golpe?: number;
}

/** Ruta de un archivo normalizado dentro de `remotion/public/`. */
const R = (nombre: string): string => `botswana-069/${nombre}`;

/** Los planos se colocan uno detrás de otro: `en` sale de la suma. `hasta` es el segundo de la canción en que acaba el plano (su golpe de salida). */
let cursor = 0;
const poner = (c: Omit<Corte, "en" | "dur">, hasta: number): Corte => {
  const dur = a(hasta) - cursor;
  const corte: Corte = { ...c, en: cursor, dur, golpe: hasta };
  cursor += dur;
  return corte;
};

type OpcionesFoto = { entra?: Entrada; zoom?: readonly [number, number]; salidaNegro?: number };
const foto = (id: string, escena: Escena, nombre: string, hasta: number, reason: string, o: OpcionesFoto = {}): Corte =>
  poner({ id, tipo: "foto", escena, src: R(`${nombre}.jpg`), zoom: o.zoom ?? [1, 1.07], entra: o.entra ?? "corte", salidaNegro: o.salidaNegro, reason }, hasta);

type OpcionesVideo = { entra?: Entrada; zoom: readonly [number, number]; desde: number; salidaNegro?: number };
const video = (id: string, escena: Escena, nombre: string, hasta: number, reason: string, o: OpcionesVideo): Corte =>
  poner({ id, tipo: "video", escena, src: R(`${nombre}.mp4`), desde: o.desde, zoom: o.zoom, entra: o.entra ?? "corte", salidaNegro: o.salidaNegro, reason }, hasta);

export const metraje069: readonly Corte[] = [
  /* ── ESCENA 1 · DE LA FELICIDAD AL DOLOR (0-250) ──────────────────────────────────────────────────────────────── */
  // Nueve fotos, cada una cambiando en un golpe de la sección fuerte de la canción (124,01 · 124,77 · 125,14 · 125,67 · 126,20 · 126,735 · 127,335 · 128,13 · 128,565). Los últimos son los golpes débiles (4-5 dB)
  // de la cola de esa sección, que ya cae: el ritmo se afloja un instante antes del corte. El frame 0 es la miniatura: el beso, sin texto, con el golpe de 10 dB de la canción.
  foto("c01-beso", 1, "a03", 124.77, "el beso con el ramo: lo primero que se ve y la miniatura; entra con el golpe de 10 dB de la canción (f1)", { zoom: [1, 1.1] }),
  foto("c02-sonrisa", 1, "a07", 125.135, "los dos muy juntos, sonriendo a cámara: la felicidad de frente"),
  foto("c03-abrazo", 1, "a06", 125.67, "el abrazo bajo el arco de palma"),
  foto("c04-brindis", 1, "a10", 126.21, "el brindis: la fiesta"),
  foto("c05-beso-love", 1, "a09", 126.745, "otro beso, con los niños tapándose los ojos"),
  foto("c06-familias", 1, "a13", 127.335, "la foto de grupo: «las familias reunidas»"),
  foto("c07-risa", 1, "a18", 128.14, "la novia en brazos de su madre y su tía, riendo a carcajadas: el momento más alegre; dura un poco más porque la música ya se está yendo"),
  foto("c08-salida", 1, "b12", 128.575, "los novios salen con los brazos en alto: la cima de la felicidad"),
  foto("c09-baile", 1, "a19", 128.995, "el primer baile con las chispas: el último plano feliz; el siguiente es el incendio, en el golpe de 10 dB donde la canción cae"),
  // «Corte repentino a las imágenes del incendio»: en seco y EN el golpe donde la canción cae 11 dB. Tres planos, de más lejos a más cerca de las llamas; cada uno en un golpe de 8 dB, y a negro.
  video("c10-incendio-palapa", 1, "inc03", 130.235, "las llamas sobre la palapa y el naranjo, y un hombre mirando: el corte en seco; cae donde John dice «Y hoy…» y donde la música cae", { desde: 1, zoom: [1, 1.04] }),
  video("c11-incendio-azotea", 1, "inc01", 131.505, "el incendio visto desde una azotea: la dimensión (humo sobre los tejados del barrio)", { desde: 0.6, zoom: [1, 1.04] }),
  video("c12-incendio-arbol", 1, "inc02", 132.32, "las llamas en el árbol, de cerca; funde a negro para respirar antes de ellos dos", { desde: 0.3, zoom: [1, 1.04], salidaNegro: 10 }),

  /* ── ESCENA 2 · LO QUE REALMENTE REPRESENTA (250-514) ─────────────────────────────────────────────────────────── */
  // `isabella y john 1.MOV` desde su primera sílaba (11,81 s; el plano arranca 3 f antes, en 11,71) hasta su última (20,41 s; acaba en 20,51). De golpe a golpe: 132,32 → 141,115. A corte, sobre el negro del incendio.
  video("c13-juntos-caminan", 2, "mov1", 141.115, "ellos dos caminan hacia cámara y dicen lo que Botswana representa, de la primera a la última palabra: «aquí no solo celebramos una boda, aquí reafirmamos nuestro amor»", {
    desde: 11.71,
    zoom: [1.45, 1.15],
  }),

  /* ── ESCENA 3 · LO QUE EL FUEGO NO PUEDE DESTRUIR (514-1155) ──────────────────────────────────────────────────── */
  // Parte A, «el lugar antes y después», con la voz de Isabella sobre Nelson. Antes (cálido) → después (frío), dos veces; cada disolvencia ACABA en un golpe de 8-10 dB (143,10 · 144,70 · 146,42).
  foto("c14-antes-cabanas", 3, "antes-cabanas", 143.11, "las dos cabañas con las antorchas encendidas: el lugar como era", { zoom: [1, 1.12] }),
  foto("c15-despues-muro", 3, "quemado-muro", 144.71, "el muro y las vigas calcinadas: lo que quedó (disuelve desde el cálido: el cambio se siente, no se corta)", { entra: "disolver", zoom: [1, 1.06] }),
  foto("c16-antes-sala", 3, "antes-sala", 146.44, "el salón con su luz naranja: donde estaban todos", { entra: "disolver", zoom: [1, 1.1] }),
  foto("c17-despues-bomberos", 3, "bomberos-estructura", 149.665, "los bomberos entre la estructura quemada: el después, con gente que ayudó", { entra: "disolver", zoom: [1, 1.06] }),
  // Parte B, con la voz de John: «el amor que nació aquí, las familias que unió, los recuerdos». El primer plano es el cambio de tono, a corte y en un golpe de 9 dB. La pista sube.
  video("c18-baile", 3, "boda", 153.06, "el baile de la boda, a corte tras el después y en el golpe de 9 dB: «Pero hay algo que el fuego jamás podrá destruir»", { desde: 0.5, zoom: [1, 1.05] }),
  foto("c19-ceremonia", 3, "b01", 154.765, "la ceremonia en la playa al atardecer: «el amor que nació aquí»", { entra: "disolver" }),
  foto("c20-anillo", 3, "b07", 156.38, "el anillo puesto en la mano: el amor, en una imagen", { entra: "disolver" }),
  foto("c21-familias-a", 3, "a14", 158.025, "las familias y amigos de blanco: «las familias que unió»", { entra: "disolver" }),
  foto("c22-familias-b", 3, "a15", 159.69, "las familias con vestidos de colores", { entra: "disolver" }),
  foto("c23-padres", 3, "b13", 161.21, "los padres con el novio: la familia que se hizo aquí", { entra: "disolver" }),
  video("c24-perro", 3, "boda", 162.485, "el perro de la boda con su moño, entre los bailarines: «los recuerdos que llevamos en el corazón» (el lado alegre del recuerdo)", { desde: 15.2, zoom: [1, 1.04], entra: "disolver" }),

  /* ── ESCENA 4 · LA FUERZA DE ESTAR UNIDOS (1155-1416) ─────────────────────────────────────────────────────────── */
  // `isabella y john 2.mov` desde 5,91 s (3 f antes de la primera sílaba, 6,01) hasta 14,68 s (0,23 s tras la última, 14,45). De golpe a golpe: 162,485 → 171,245. Entra disolviendo desde el recuerdo (la
  // disolvencia acaba en el golpe y su primera palabra suena 3 f después). El clip tiene 5,5 s antes de `desde`: sobra para los 12 f de la disolvencia.
  video("c25-juntos-unirnos", 4, "mov2", 171.245, "de la mano, en la calle con el cielo de tormenta, de la primera a la última palabra: «cuando la vida golpea aquello que amamos, debemos unirnos para volver a construirlo»; la música vuelve a la meseta al acabar", {
    desde: 5.91,
    zoom: [1, 1.05],
    entra: "disolver",
  }),

  /* ── ESCENA 5 · EL MENSAJE FINAL (1416-1800) ──────────────────────────────────────────────────────────────────── */
  // «Hoy queremos unir nuestros corazones…» (John, hueco `john-3`): la arena de la ceremonia (dos colores en un solo vaso, la imagen más literal de «unir») y los anillos. Los golpes de la meseta son de 7-12 dB.
  foto("c26-arena", 5, "b11", 173.275, "la arena de colores vertida en el mismo vaso: «unir nuestros corazones»; la disolvencia acaba en el golpe de 7 dB con que la música vuelve a la meseta", { entra: "disolver" }),
  foto("c27-arena-nino", 5, "b10", 174.92, "la ceremonia de la arena con el niño: la familia que se suma", { entra: "disolver" }),
  foto("c28-anillos", 5, "a08", 177.06, "las manos con los anillos y «Better Together» en neón; el golpe de 12 dB de los 176,145 s cae dentro de este plano", { entra: "disolver" }),
  // «Porque Botswana merece seguir siendo el lugar donde muchas familias comiencen su historia» (Isabella, hueco `isabella-2`): el lugar como lo recuerdan y los novios entre las chispas.
  video("c29-antes-salon", 5, "ant02", 180.235, "el recorrido por Botswana antes del incendio: el salón naranja y las cabañas; el lugar «como lo recuerdan»", { desde: 1, zoom: [1, 1.05], entra: "disolver" }),
  foto("c30-chispas", 5, "b17", 183.97, "los novios caminando entre las chispas: el último plano feliz; funde a negro y a la tarjeta, en el último golpe de la meseta", { entra: "disolver", zoom: [1, 1.08], salidaNegro: 12 }),

  /* ── LA TARJETA FINAL (1800-2100) ─────────────────────────────────────────────────────────────────────────────── */
  // Un negro cálido liso con los textos del guion encima (`Botswana069.tsx`). Sin cortes que sincronizar: la canción sigue en su meseta y se apaga bajo los textos (`audio-069.ts`).
  poner(
    { id: "c31-tarjeta", tipo: "foto", escena: 6, src: R("tarjeta-oscura.png"), zoom: [1, 1], entra: "corte", reason: "el fondo oscuro de «EL FUEGO PUEDE DESTRUIR UN LUGAR. PERO JAMÁS EL AMOR QUE ALLÍ NACIÓ.», la firma y los datos para aportar" },
    183.97 + DUR_TARJETA / FPS_069
  ),
];

/**
 * DÓNDE HABLAN EN CADA MOV: la primera y la última sílaba, en segundos de la FUENTE, medidas por energía (perfil de 20 ms, 150-4000 Hz; el suelo es digital, −64 dBFS, así que el inicio y el final
 * son nítidos: un salto de 20 dB en un solo paso). El plano arranca 3 f (0,10 s) antes de la primera y acaba entre 0,10 y 0,16 s después de la última. La puerta lo comprueba contra el WAV.
 */
export const VOZ_EN_MOV: Readonly<Record<string, { s0: number; s1: number; dice: string }>> = {
  "c13-juntos-caminan": {
    s0: 11.81,
    s1: 20.41,
    dice: "En Botswana nos casamos, pero aquí no solo celebramos una boda. Aquí reafirmamos nuestro amor y el sueño de construir juntos como familia.",
  },
  "c25-juntos-unirnos": {
    s0: 6.01,
    s1: 14.45,
    dice: "…cuando la vida golpea aquello que amamos, debemos unirnos para volver a construirlo. (Whisper oyó «vía» y «ama»: por confirmar oyéndolo.)",
  },
};

/** Duración de la composición: sale del plan, no se escribe a mano. */
export const DURACION_069 = cursor;

/** Frame en el que empieza cada escena (la 6 es la tarjeta final). */
export const INICIO_ESCENA: Readonly<Record<Escena, number>> = (() => {
  const inicios: Partial<Record<Escena, number>> = {};
  for (const c of metraje069) if (inicios[c.escena] === undefined) inicios[c.escena] = c.en;
  return inicios as Record<Escena, number>;
})();

export const INICIO_TARJETA = INICIO_ESCENA[6];
