/**
 * EL 069 — «Unidos por Botswana»: vídeo de ayuda para reconstruir el salón de eventos donde John e Isabella se casaron. Los planos, como DATOS.
 *
 * Pieza PERSONAL de ellos dos, sin canal ni marca (se declara en la cabecera de `Botswana069.tsx`). 1080×1920 · 30 fps · 2100 f (70 s) y SIN avatar: es un montaje (director §3i).
 *
 * REVISIÓN 4 (2026-10-28, pedido de ellos tras oír la prueba de la rev. 3): «utiliza la primera canción que recomendaste» = «We Are» (la de la rev. 1). Se conserva todo lo que pidieron antes:
 *   · rev. 2: pocas imágenes de la boda (5: beso, sonrisa, abrazo, ceremonia y arena), muchas del lugar (12) y el MOV 1 con zoom y centrado;
 *   · rev. 3: EL FINAL ES EL FUEGO: el recorrido por Botswana «antes del incendio» (`ant02`) deja paso a la columna de humo y llamas sobre los tejados (`inc01`, 4,1 s, en el golpe más fuerte de la meseta) y la
 *     última foto feliz (los novios entre las chispas, `b17`) al arco «BOTSWANA Cartagena Beach» con el cielo anaranjado y el humo detrás (`lle01`, 3,7 s): el nombre del lugar es lo último que se ve antes de
 *     la tarjeta. Por eso el arco ya NO abre el incendio: allí van la palapa, la llama del árbol y los tejados.
 *   · CANCIÓN: «We Are» (Aleksey Chistilin: cinematic orquestal, «unión, solemnidad»), con percusión y pulso. Las rev. 2 y 3 llevaron «Children» y «Softly» (`proyectos/069/rev2-children/`, `rev3-softly/`); la rev. 1,
 *     «We Are» con 9 fotos de la boda y el recorrido (`rev1-we-are/`).
 *
 * QUIÉN MARCA EL TIEMPO: LA CANCIÓN. «We Are», desde el segundo 123,977 (`INICIO_MUSICA`). Cada plano entra en un GOLPE medido de la canción (`proyectos/069/musica/golpes-musica-we-are.json`,
 * `herramientas/golpes.mjs`): `a(t)` convierte el segundo de la canción en el frame de la comp y lo que se escribe aquí es EL SEGUNDO DE LA CANCIÓN en que acaba cada plano, no un número de frames.
 * La forma de la pista es la de la pieza (medida con `herramientas/elegir-cancion.mjs`):
 *
 *   123,98-128,5   sección fuerte (−9 LUFS) con ataques cada 0,4-0,8 s            → las tres fotos felices (beso, sonrisa, abrazo), cada cambio en un golpe (5,8 y 4,4 dB)
 *   128,995        EL GOLPE (9,7 dB) donde la pista CAE 11 dB a una base de ostinato → el corte seco al incendio: la música baja EN el corte, nadie la baja a mano
 *   129-141        ostinato bajo (−21 LUFS), pulso de 0,41 s                         → la palapa, la llama del árbol y los tejados (golpes de 8,2 · 7,6 · 7,9 dB) y, sin pisarlos, el MOV 1 (su voz sale por encima)
 *   141,1-153      sube poco a poco (−23 → −17) con golpes de 6-10 dB                → el lugar como era y como quedó: el muro en el golpe de 10,3 dB de 143,11 s, los bomberos, la cocina
 *   153-162,5      sube (−17 → −15)                                                  → el amor que nació aquí (la ceremonia), las familias, los recuerdos
 *   162,5-171,25   sube a la meseta (−9 LUFS) bajo el MOV 2                          → «debemos unirnos…»: la música vuelve de golpe al acabar la frase
 *   171,25-184     meseta con golpes de 7-12 dB                                       → el mensaje final: la arena, los costales y EL FUEGO en el golpe de 11,5 dB de 176,155 s, y el arco ardiendo
 *   184-194        meseta sin golpes, que se apaga bajo la tarjeta                    → los textos se leen, sin cortes que sincronizar
 *
 * LOS DOS PLANOS EN QUE HABLAN (pedido de la rev. 1: «que empiecen en el principio de la voz y terminen en el final»). Medidos por energía a 20 ms (150-4000 Hz), no con whisper:
 *   MOV 1  primera sílaba 11,81 s · última 20,41 s → plano desde 11,71 s (3 f de aire antes de «En») hasta 20,51 s (0,10 s tras «familia»): 8,80 s, de golpe a golpe (132,32 → 141,115)
 *   MOV 2  primera sílaba  6,01 s · última 14,45 s → plano desde  5,91 s hasta 14,68 s (0,23 s tras «construirlo»): 8,77 s, de golpe a golpe (162,485 → 171,245)
 *
 * LA VOZ EN OFF SIGUE PENDIENTE. Los huecos de `voz-069.ts` se recolocaron con los cortes nuevos; cada locución, cuando llegue, ducka la música (`audio-069.ts`).
 *
 * LAS ESCENAS (guion de ellos → montaje): 1 = 0:00-0:08,3 · 2 = 0:08,3-0:17,1 · 3 = 0:17,1-0:38,5 · 4 = 0:38,5-0:47,3 · 5 = 0:47,3-1:00 · tarjeta 1:00-1:10. Las de voz en off (1, 3 y 5)
 * conservan o superan el tiempo del guion (8 · 19 · 12 s) para que las frases quepan.
 *
 * QUÉ ES MATERIAL Y QUÉ NO. Todo es real y de ellos: no hay banco ni IA (director §3h).
 *   · FOTOS de la boda: dos carruseles de @jalvarez.tech (recepción `A-xx`, ceremonia `B-xx`; 1440 px de ancho, apaisadas) y fotos propias del lugar antes y después. Las apaisadas van ENTERAS sobre su propio
 *     fondo desenfocado (`relleno`), salvo tres composiciones centradas que llenan el cuadro con una ventana 9:16 (`recorte`).
 *   · VÍDEO del incendio y del después: recompresiones de mensajería a 464×832 (`inc0x`, `lle01`, `bom01`, `des03`, `des07`; `des08` es apaisado). Se ven blandos a pantalla completa: NO se les pide punch-in (≤ 1,04).
 *   · El montaje va MUDO salvo los dos MOV y la canción.
 *   · NADIE sale como «Nelson»: el guion lo nombra y ningún plano lo señala (ni los obreros de `lim01` ni la gente sentada de `gen01`; en `des07` solo se ven al fondo).
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente; `en` y `dur`, en frames de la composición (30 fps). Los planos son CONTIGUOS. Un plano que entra disolviendo (`disolver`) empieza a verse 12 f ANTES de
 * su `en` (`solapeDe`): su clip tiene que tener esos 12 f antes de `desde`, y el anterior dura hasta ese `en`. Las disolvencias ACABAN en un golpe; los cortes secos CAEN en uno.
 * LO QUE DUELE ENTRA A CORTE (el incendio, el después, el lugar quemado tras un recuerdo); LO QUE FUE, DISOLVIENDO.
 *
 * Datos puros: solo `import type` y los números de la tarjeta (`cierre-069.ts`). La puerta lo carga con node.
 */
import type { Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-069";

export const FPS_069 = 30;

/**
 * El segundo de «We Are» (`musica-we-are.wav`, la canción ENTERA decodificada) que suena en el frame 0. El golpe de 9,9 dB de 124,015 s cae en el frame 1: el catálogo pone 30 ms de colchón
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
  // Tres fotos de la boda en la sección fuerte de la canción (eran nueve en la rev. 1), cada cambio en un golpe: 124,015 (9,9 dB, f1) · 125,67 (5,8) · 127,335 (4,4) · 128,995 (9,7: el incendio). El frame 0 es la miniatura:
  // el beso, sin texto, con el golpe de 9,9 dB. La última foto llega al golpe donde la canción cae 11 dB: el corte al incendio.
  foto("c01-beso", 1, "a03", 125.67, "el beso con el ramo: lo primero que se ve y la miniatura; entra con el golpe de 9,9 dB de la canción (f1)", { zoom: [1, 1.1] }),
  foto("c02-sonrisa", 1, "a07", 127.335, "los dos muy juntos, sonriendo a cámara: la felicidad de frente"),
  foto("c03-abrazo", 1, "a06", 128.995, "el abrazo bajo el arco de palma: la última imagen feliz; el siguiente plano es el incendio, en el golpe de 9,7 dB donde la canción cae"),
  // «Corte repentino a las imágenes del incendio»: en seco y EN el golpe donde la canción cae 11 dB. Tres planos: las llamas sobre la palapa, la llama alta del árbol y el humo sobre los tejados; cada uno en un golpe de 7,6-8,2 dB.
  video("c04-incendio-palapa", 1, "inc03", 130.235, "las llamas sobre la palapa y el naranjo, y un hombre mirando: el corte en seco; cae en el golpe de 9,7 dB donde la canción baja y donde John dice «Y hoy…»", { desde: 1, zoom: [1, 1.04] }),
  video("c05-incendio-arbol", 1, "inc02", 131.505, "la llama alta en el árbol del patio vista desde arriba, con el humo detrás: el fuego sube", { desde: 1.3, zoom: [1, 1.04] }),
  video("c06-incendio-azotea", 1, "inc01", 132.32, "el incendio visto desde una azotea: la dimensión (humo sobre los tejados del barrio); funde a negro para respirar antes de ellos dos", { desde: 0.6, zoom: [1, 1.04], salidaNegro: 8 }),

  /* ── ESCENA 2 · LO QUE REALMENTE REPRESENTA (250-514) ─────────────────────────────────────────────────────────── */
  // `isabella y john 1.MOV` desde su primera sílaba (11,81 s; el plano arranca 3 f antes, en 11,71) hasta su última (20,41 s; acaba en 20,51). De golpe a golpe: 132,32 → 141,115. A corte, sobre el negro del incendio.
  // La música está en su ostinato bajo (−21 LUFS): ellos hablan por encima. ENCUADRE: el archivo ya viene recortado a ellos (zoom ×1,6 en 31 % × 58 %) y aquí empuja de 1,2 a 1,0 mientras se acercan.
  video("c07-juntos-caminan", 2, "mov1", 141.115, "ellos dos caminan hacia cámara y dicen lo que Botswana representa, de la primera a la última palabra: «aquí no solo celebramos una boda, aquí reafirmamos nuestro amor»; encuadrados y con zoom", {
    desde: 11.71,
    zoom: [1.2, 1.0],
  }),

  /* ── ESCENA 3 · EL LUGAR: LO QUE FUE, LO QUE QUEDÓ Y LO QUE EL FUEGO NO PUEDE DESTRUIR (514-1155) ──────────────── */
  // Parte A, con la voz de Isabella sobre Nelson: el lugar como era (las cabañas, calmas) y, en el golpe más fuerte de la escena (10,3 dB de 143,11 s), a corte, el lugar QUEMADO: el muro, los bomberos, la cocina.
  foto("c08-antes-cabanas", 3, "antes-cabanas", 143.11, "las dos cabañas con las antorchas encendidas: el lugar como era; entra a corte tras el MOV 1", { zoom: [1, 1.12] }),
  foto("c09-despues-muro", 3, "quemado-muro", 146.44, "el muro y las vigas calcinadas: lo que quedó, a CORTE en el golpe de 10,3 dB (foto de 12 MP recortada a 9:16, llena el cuadro)", { zoom: [1, 1.06] }),
  video("c10-bomberos", 3, "bom01", 149.745, "los bomberos con las mangueras entre las vigas negras, todavía humeando: el después, con la gente que ayudó", { desde: 10, zoom: [1, 1.04] }),
  video("c11-cocina", 3, "des07", 153.06, "lo que queda de la cocina: la mesa de obra con los frascos derretidos debajo; a corte en el golpe de 9,3 dB: «Pero hay algo que el fuego jamás podrá destruir»", { desde: 29.5, zoom: [1, 1.04] }),
  // Parte B, con la voz de John: «el amor que nació aquí, las familias que unió, los recuerdos que llevamos en el corazón». Cada frase, un plano: la ceremonia (el único plano largo de la boda, bajo su frase), el
  // salón de antes donde estaban todos y la estructura que ya no está. Las disolvencias acaban en golpes de 8,7 y 5,5 dB.
  foto("c12-ceremonia", 3, "b01", 156.38, "la ceremonia en la playa al atardecer: «el amor que nació aquí»; el único plano largo de la boda, bajo su frase; la disolvencia acaba en el golpe de 8,7 dB", { entra: "disolver", zoom: [1, 1.1] }),
  foto("c13-antes-sala", 3, "antes-sala", 159.69, "el salón con su luz naranja, donde estaban todos: «las familias que unió»; el lugar como lo recuerdan", { entra: "disolver", zoom: [1, 1.1] }),
  foto("c14-estructura", 3, "bomberos-estructura", 162.485, "la estructura quemada con los bomberos entre las vigas (foto de 12 MP recortada a 9:16): «los recuerdos que llevamos en el corazón» sobre lo que ya no está", { zoom: [1, 1.06] }),

  /* ── ESCENA 4 · LA FUERZA DE ESTAR UNIDOS (1155-1418) ─────────────────────────────────────────────────────────── */
  // `isabella y john 2.mov` desde 5,91 s (3 f antes de la primera sílaba, 6,01) hasta 14,68 s (0,23 s tras la última, 14,45). De golpe a golpe: 162,485 → 171,245. Entra disolviendo desde el lugar quemado (la
  // disolvencia acaba en el golpe y su primera palabra suena 3 f después). El clip tiene 5,5 s antes de `desde`: sobra para los 12 f de la disolvencia.
  video("c15-juntos-unirnos", 4, "mov2", 171.245, "de la mano, en la calle con el cielo de tormenta, de la primera a la última palabra: «cuando la vida golpea aquello que amamos, debemos unirnos para volver a construirlo»; la música vuelve a la meseta al acabar", {
    desde: 5.91,
    zoom: [1, 1.05],
    entra: "disolver",
  }),

  /* ── ESCENA 5 · EL MENSAJE FINAL (1418-1800) ──────────────────────────────────────────────────────────────────── */
  // «Hoy queremos unir nuestros corazones…» (John, hueco `john-3`): la arena de la ceremonia (dos colores en un solo vaso, la imagen más literal de «unir») y, a corte, los costales de escombro: la limpieza ya empezó.
  foto("c16-arena", 5, "b11", 173.685, "la arena de colores vertida en el mismo vaso: «unir nuestros corazones»; la disolvencia acaba en el golpe de 7,9 dB con que la música ya está en la meseta", { entra: "disolver" }),
  video("c17-costales", 5, "des07", 176.155, "los costales de escombro apilados en el patio ya limpio: la reconstrucción tiene que empezar por aquí; a corte", { desde: 45.3, zoom: [1, 1.04] }),
  // «Porque Botswana merece seguir siendo el lugar donde muchas familias comiencen su historia» (Isabella, hueco `isabella-2`): y lo último que se ve es lo que el fuego se llevó. Las dos entran A CORTE en un
  // golpe: la columna de humo y llamas sobre los tejados (el golpe de 11,5 dB de 176,155 s, el más fuerte de la meseta) y el arco con el nombre del lugar y el cielo anaranjado detrás, que funde a negro y llega a la tarjeta.
  video("c18-incendio-final", 5, "inc01", 180.235, "la columna de humo negro y las llamas sobre los tejados, a corte en el golpe de 11,5 dB de la meseta: lo que se llevó el fuego, en grande (la misma azotea que al principio, 5 s más tarde)", {
    desde: 6.0,
    zoom: [1, 1.04],
  }),
  video("c19-arco-botswana", 5, "lle01", 183.97, "el arco «BOTSWANA Cartagena Beach» con el cielo anaranjado y el humo detrás, y una silla sola al fondo: el nombre del lugar, ardiendo, es lo último que se ve; funde a negro y a la tarjeta", {
    desde: 28.5,
    zoom: [1, 1.04],
    salidaNegro: 12,
  }),

  /* ── LA TARJETA FINAL (1800-2100) ─────────────────────────────────────────────────────────────────────────────── */
  // Un negro cálido liso con los textos del guion encima (`Botswana069.tsx`). Sin cortes que sincronizar: entra en el golpe de 5,6 dB de 183,97 s, la canción sigue en su meseta y se apaga bajo los textos (`audio-069.ts`).
  poner(
    { id: "c20-tarjeta", tipo: "foto", escena: 6, src: R("tarjeta-oscura.png"), zoom: [1, 1], entra: "corte", reason: "el fondo oscuro de «EL FUEGO PUEDE DESTRUIR UN LUGAR. PERO JAMÁS EL AMOR QUE ALLÍ NACIÓ.», la firma y los datos para aportar" },
    183.97 + DUR_TARJETA / FPS_069
  ),
];

/**
 * DÓNDE HABLAN EN CADA MOV: la primera y la última sílaba, en segundos de la FUENTE, medidas por energía (perfil de 20 ms, 150-4000 Hz; el suelo es digital, −64 dBFS, así que el inicio y el final
 * son nítidos: un salto de 20 dB en un solo paso). El plano arranca 3 f (0,10 s) antes de la primera y acaba entre 0,05 y 0,25 s después de la última. La puerta lo comprueba contra el WAV.
 */
export const VOZ_EN_MOV: Readonly<Record<string, { s0: number; s1: number; dice: string }>> = {
  "c07-juntos-caminan": {
    s0: 11.81,
    s1: 20.41,
    dice: "En Botswana nos casamos, pero aquí no solo celebramos una boda. Aquí reafirmamos nuestro amor y el sueño de construir juntos como familia.",
  },
  "c15-juntos-unirnos": {
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
