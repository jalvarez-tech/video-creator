/**
 * EL 069 — «Unidos por Botswana»: vídeo de ayuda para reconstruir el salón de eventos donde John e Isabella se casaron. Los planos, como DATOS.
 *
 * Pieza PERSONAL de ellos dos, sin canal ni marca (se declara en la cabecera de `Botswana069.tsx`). 1080×1920 · 30 fps · 2114 f (70,5 s) y SIN avatar: es un montaje (director §3i).
 *
 * REVISIÓN 3 (2026-10-28, pedido de ellos tras oír la prueba de la rev. 2):
 *   «Cambia el recorrido del último vídeo por otra toma del fuego y la última imagen también, para que sea más impactante; la música debe ser otra, más emotiva y emocional.»
 *   · CANCIÓN: «Softly» (orquesta de cuerdas, Judah Earl y Brandon Black: «ternura, solemnidad, emoción contenida», catálogo). Antes «Children» (rev. 2, `proyectos/069/rev2-children/`) y «We Are» (rev. 1).
 *     Las cuerdas NO tienen ataques como un piano: se cortan sobre las SUBIDAS de nivel medidas (4-8 dB), con las más fuertes para lo que duele.
 *   · EL FINAL ES EL FUEGO: el recorrido por el lugar «antes del incendio» (`ant02`) deja paso a la columna de humo y llamas sobre los tejados (`inc01`, 4,7 s, en el golpe de cuerdas de la meseta) y la
 *     última foto feliz (los novios entre las chispas, `b17`) al arco «BOTSWANA Cartagena Beach» con el cielo anaranjado y el humo detrás (`lle01`, 2,8 s): el nombre del lugar es lo último que se ve antes
 *     de la tarjeta. Por eso el arco ya NO abre el incendio: allí van la palapa, la llama del árbol y los tejados.
 *   · De la rev. 2 se mantiene lo que pidieron entonces: pocas imágenes de la boda (4: beso, abrazo, ceremonia y arena), muchas del lugar (12) y el MOV 1 con zoom y centrado.
 *
 * QUIÉN MARCA EL TIEMPO: LA CANCIÓN. «Softly», desde el segundo 99,377 (`INICIO_MUSICA`: la subida de 7,3 dB de 99,41 s cae en el f1). Cada plano entra en una subida medida
 * (`proyectos/069/musica/golpes-musica-softly.json`, `herramientas/golpes.mjs`): `a(t)` convierte el segundo de la canción en el frame de la comp y lo que se escribe aquí es EL SEGUNDO DE LA CANCIÓN en que
 * acaba cada plano, no un número de frames. La forma de la pista es una historia con la de la pieza (sonoridad medida con ebur128, ver `musica-069.ts`):
 *
 *   99,4-102,5    la frase de cuerdas en su punto más alto (−12 LUFS)                    → el beso y la foto de los dos: las fotos felices
 *   102,5-105,4   se APAGA (−19 → −26)                                                   → el abrazo, la última imagen feliz: la música «se va» antes de que llegue el fuego
 *   105,410       subida de 7,6 dB en el vacío                                           → el corte SECO al incendio
 *   105,4-109,7   cuerdas bajas (−24…−30)                                                → las llamas sobre la palapa, la del árbol y los tejados
 *   109,7-118,5   el valle (−24…−31 LUFS)                                                → el MOV 1: su voz entra en la calma y acaba en el punto más bajo
 *   118,5-123,5   quedo, las cuerdas empiezan a subir                                    → el lugar como era (las cabañas, el salón)
 *   123,520       subida de 7,8 dB                                                       → entra el lugar QUEMADO, a corte
 *   123,5-147     sube poco a poco (−24 → −18) con subidas de 5-7 dB                     → el después, el amor que nació aquí, las familias; bajo el MOV 2 sigue subiendo
 *   147,225       el golpe de cuerdas de la meseta (6-8 dB) a −10 LUFS                   → el mensaje final
 *   147-170       meseta (−10…−13) con subidas de 5-8 dB                                 → la arena, los costales, el FUEGO y el arco; la tarjeta entra en la de 6,9 dB de 159,83 s
 *
 * LOS DOS PLANOS EN QUE HABLAN (pedido de la rev. 1: «que empiecen en el principio de la voz y terminen en el final»). Medidos por energía a 20 ms (150-4000 Hz), no con whisper:
 *   MOV 1  primera sílaba 11,81 s · última 20,41 s → plano desde 11,71 s (3 f de aire antes de «En») hasta 20,51 s (0,10 s tras «familia»): 8,80 s, de subida a subida (109,745 → 118,53)
 *   MOV 2  primera sílaba  6,01 s · última 14,45 s → plano desde  5,91 s hasta 14,51 s (0,06 s tras «construirlo»): 8,60 s, de subida a subida (138,61 → 147,225)
 *
 * LA VOZ EN OFF SIGUE PENDIENTE. Los huecos de `voz-069.ts` se recolocaron con los cortes nuevos; cada locución, cuando llegue, ducka la música (`audio-069.ts`).
 *
 * LAS ESCENAS (guion de ellos → montaje): 1 = 0:00-0:10,4 · 2 = 0:10,4-0:19,2 · 3 = 0:19,2-0:39,2 · 4 = 0:39,2-0:47,8 · 5 = 0:47,8-1:00,4 · tarjeta 1:00,4-1:10,5. Las de voz en off (1, 3 y 5)
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
 * su `en` (`solapeDe`): su clip tiene que tener esos 12 f antes de `desde`, y el anterior dura hasta ese `en`. Las disolvencias ACABAN en una subida; los cortes secos CAEN en una.
 * LO QUE DUELE ENTRA A CORTE (el incendio, el después, el lugar quemado tras un recuerdo); LO QUE FUE, DISOLVIENDO.
 *
 * Datos puros: solo `import type` y los números de la tarjeta (`cierre-069.ts`). La puerta lo carga con node.
 */
import type { Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-069";

export const FPS_069 = 30;

/**
 * El segundo de «Softly» (`musica-softly.wav`, la canción ENTERA decodificada) que suena en el frame 0. La subida de 7,3 dB de 99,410 s cae en el frame 1: el catálogo pone 30 ms de colchón
 * (`entra: 1` en el tramo) para quitar el clic sin comerse el ataque.
 */
export const INICIO_MUSICA = 99.377;

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

/** Los planos se colocan uno detrás de otro: `en` sale de la suma. `hasta` es el segundo de la canción en que acaba el plano (su subida de salida). */
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
  /* ── ESCENA 1 · DE LA FELICIDAD AL DOLOR (0-311) ──────────────────────────────────────────────────────────────── */
  // Dos fotos de la boda mientras la frase de cuerdas está en lo más alto y se apaga. Cada cambio en una subida: 99,41 (7,3 dB, f1) · 102,535 (5) · 105,41 (7,6: el incendio). El frame 0 es la miniatura:
  // el beso, sin texto. La última foto dura lo que tarda la música en irse; el corte al incendio cae en la subida de 7,6 dB que llega en el vacío.
  foto("c01-beso", 1, "a03", 102.535, "el beso con el ramo: lo primero que se ve y la miniatura; entra con la subida de 7,3 dB de la canción (f1) y se queda la frase entera en lo más alto", { zoom: [1, 1.1] }),
  foto("c02-abrazo", 1, "a06", 105.41, "el abrazo bajo el arco de palma: la última imagen feliz, mientras la música se apaga (−19 → −26 LUFS); el siguiente plano es el incendio en la subida de 7,6 dB"),
  // «Corte repentino a las imágenes del incendio»: en seco y EN la subida de 7,6 dB. Tres planos: las llamas sobre la palapa, la del árbol y el humo sobre los tejados; cada uno en una subida.
  video("c03-incendio-palapa", 1, "inc03", 106.935, "las llamas sobre la palapa y el naranjo, y un hombre mirando: el corte en seco; cae en la subida de 7,6 dB y donde John dice «Y hoy…»", { desde: 1, zoom: [1, 1.04] }),
  video("c04-incendio-arbol", 1, "inc02", 108.27, "la llama alta en el árbol del patio vista desde arriba, con el humo detrás: el fuego sube", { desde: 1.3, zoom: [1, 1.04] }),
  video("c05-incendio-azotea", 1, "inc01", 109.745, "el incendio visto desde una azotea: la dimensión (humo sobre los tejados del barrio); funde a negro para respirar antes de ellos dos", { desde: 0.6, zoom: [1, 1.04], salidaNegro: 10 }),

  /* ── ESCENA 2 · LO QUE REALMENTE REPRESENTA (311-575) ─────────────────────────────────────────────────────────── */
  // `isabella y john 1.MOV` desde su primera sílaba (11,81 s; el plano arranca 3 f antes, en 11,71) hasta su última (20,41 s; acaba en 20,51). De subida a subida: 109,745 → 118,53. A corte, sobre el negro del incendio.
  // La música está en el valle (−24…−31) bajo su voz: ellos hablan en la calma. ENCUADRE: el archivo ya viene recortado a ellos (zoom ×1,6 en 31 % × 58 %) y aquí empuja de 1,2 a 1,0 mientras se acercan.
  video("c06-juntos-caminan", 2, "mov1", 118.53, "ellos dos caminan hacia cámara y dicen lo que Botswana representa, de la primera a la última palabra: «aquí no solo celebramos una boda, aquí reafirmamos nuestro amor»; encuadrados y con zoom", {
    desde: 11.71,
    zoom: [1.2, 1.0],
  }),

  /* ── ESCENA 3 · EL LUGAR: LO QUE FUE, LO QUE QUEDÓ Y LO QUE EL FUEGO NO PUEDE DESTRUIR (575-1177) ──────────────── */
  // Tras el valle, las cuerdas empiezan a subir: entra el lugar COMO ERA (las cabañas y el salón, cálidos, en la calma), con la voz de Isabella sobre Nelson; y en la subida de 7,8 dB de 123,52 s, a corte, el lugar
  // QUEMADO. Antes → después es el contraste que pide dinero.
  foto("c07-antes-cabanas", 3, "antes-cabanas", 121.665, "las dos cabañas con las antorchas encendidas: el lugar como era; entra a corte en la calma, tras el MOV 1", { zoom: [1, 1.12] }),
  foto("c08-antes-sala", 3, "antes-sala", 123.52, "el salón con su luz naranja, donde estaban todos; la disolvencia acaba en la subida de 7,8 dB, justo antes de lo que quedó", { entra: "disolver", zoom: [1, 1.1] }),
  foto("c09-despues-muro", 3, "quemado-muro", 126.525, "el muro y las vigas calcinadas: lo que quedó, a CORTE en la subida de 7,8 dB (foto de 12 MP recortada a 9:16, llena el cuadro)", { zoom: [1, 1.06] }),
  video("c10-bomberos", 3, "bom01", 129.065, "los bomberos con las mangueras entre las vigas negras, todavía humeando: el después, con la gente que ayudó", { desde: 10, zoom: [1, 1.04] }),
  // Parte B, con la voz de John: «Pero hay algo que el fuego jamás podrá destruir: el amor que nació aquí, las familias que unió, los recuerdos». El único plano largo de la boda (la ceremonia, 4,9 s, sobre la
  // subida lenta de las cuerdas) bajo «el amor que nació aquí», entre dos del lugar quemado que entran a corte: lo que duele.
  foto("c11-ceremonia", 3, "b01", 133.92, "la ceremonia en la playa al atardecer: «el amor que nació aquí»; el único plano largo de la boda, bajo su frase; la disolvencia acaba en la subida de 4 dB y el plano llega a la de 6,8", {
    entra: "disolver",
    zoom: [1, 1.1],
  }),
  video("c12-cocina", 3, "des07", 136.205, "lo que queda de la cocina: la mesa de obra con los frascos derretidos debajo; a corte en la subida de 6,8 dB: «las familias que unió»", { desde: 29.5, zoom: [1, 1.04] }),
  foto("c13-estructura", 3, "bomberos-estructura", 138.61, "la estructura quemada con los bomberos entre las vigas (foto de 12 MP recortada a 9:16): «los recuerdos que llevamos en el corazón» sobre lo que ya no está", { zoom: [1, 1.06] }),

  /* ── ESCENA 4 · LA FUERZA DE ESTAR UNIDOS (1177-1435) ─────────────────────────────────────────────────────────── */
  // `isabella y john 2.mov` desde 5,91 s (3 f antes de la primera sílaba, 6,01) hasta 14,51 s (0,06 s tras la última, 14,45). De subida a subida: 138,61 → 147,225. Entra disolviendo desde el lugar quemado (la
  // disolvencia acaba en la subida y su primera palabra suena 3 f después). El clip tiene 5,5 s antes de `desde`: sobra para los 12 f de la disolvencia. La música sigue subiendo bajo su voz y llega a la
  // meseta al acabar su frase.
  video("c14-juntos-unirnos", 4, "mov2", 147.225, "de la mano, en la calle con el cielo de tormenta, de la primera a la última palabra: «cuando la vida golpea aquello que amamos, debemos unirnos para volver a construirlo»; la música llega a su meseta al acabar", {
    desde: 5.91,
    zoom: [1, 1.05],
    entra: "disolver",
  }),

  /* ── ESCENA 5 · EL MENSAJE FINAL (1435-1814) ──────────────────────────────────────────────────────────────────── */
  // «Hoy queremos unir nuestros corazones…» (John, hueco `john-3`): la arena de la ceremonia (dos colores en un solo vaso, la imagen más literal de «unir») y, a corte, los costales de escombro: la limpieza ya empezó.
  foto("c15-arena", 5, "b11", 150.075, "la arena de colores vertida en el mismo vaso: «unir nuestros corazones»; la disolvencia acaba en el golpe de cuerdas con que la música llega a su meseta", { entra: "disolver" }),
  video("c16-costales", 5, "des07", 152.31, "los costales de escombro apilados en el patio ya limpio: la reconstrucción tiene que empezar por aquí; a corte", { desde: 45.3, zoom: [1, 1.04] }),
  // «Porque Botswana merece seguir siendo el lugar donde muchas familias comiencen su historia» (Isabella, hueco `isabella-2`): y lo último que se ve es lo que el fuego se llevó. Las dos entran A CORTE en una
  // subida: la columna de humo y llamas sobre los tejados (la subida de 7,9 dB de 152,31 s) y el arco con el nombre del lugar y el cielo anaranjado detrás, que funde a negro y llega a la tarjeta.
  video("c17-incendio-final", 5, "inc01", 157.02, "la columna de humo negro y las llamas sobre los tejados, a corte en la subida de 7,9 dB de la meseta: lo que se llevó el fuego, en grande (la misma azotea que al principio, 5 s más tarde)", {
    desde: 6.0,
    zoom: [1, 1.04],
  }),
  video("c18-arco-botswana", 5, "lle01", 159.83, "el arco «BOTSWANA Cartagena Beach» con el cielo anaranjado y el humo detrás, y una silla sola al fondo: el nombre del lugar, ardiendo, es lo último que se ve; funde a negro y a la tarjeta", {
    desde: 29.4,
    zoom: [1, 1.04],
    salidaNegro: 12,
  }),

  /* ── LA TARJETA FINAL (1814-2114) ─────────────────────────────────────────────────────────────────────────────── */
  // Un negro cálido liso con los textos del guion encima (`Botswana069.tsx`). Sin cortes que sincronizar: entra en la subida de 6,9 dB, la canción sigue en su meseta y se apaga bajo los textos (`audio-069.ts`).
  poner(
    { id: "c19-tarjeta", tipo: "foto", escena: 6, src: R("tarjeta-oscura.png"), zoom: [1, 1], entra: "corte", reason: "el fondo oscuro de «EL FUEGO PUEDE DESTRUIR UN LUGAR. PERO JAMÁS EL AMOR QUE ALLÍ NACIÓ.», la firma y los datos para aportar" },
    159.83 + DUR_TARJETA / FPS_069
  ),
];

/**
 * DÓNDE HABLAN EN CADA MOV: la primera y la última sílaba, en segundos de la FUENTE, medidas por energía (perfil de 20 ms, 150-4000 Hz; el suelo es digital, −64 dBFS, así que el inicio y el final
 * son nítidos: un salto de 20 dB en un solo paso). El plano arranca 3 f (0,10 s) antes de la primera y acaba entre 0,05 y 0,25 s después de la última. La puerta lo comprueba contra el WAV.
 */
export const VOZ_EN_MOV: Readonly<Record<string, { s0: number; s1: number; dice: string }>> = {
  "c06-juntos-caminan": {
    s0: 11.81,
    s1: 20.41,
    dice: "En Botswana nos casamos, pero aquí no solo celebramos una boda. Aquí reafirmamos nuestro amor y el sueño de construir juntos como familia.",
  },
  "c14-juntos-unirnos": {
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
