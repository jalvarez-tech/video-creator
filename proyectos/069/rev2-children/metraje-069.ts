/**
 * EL 069 — «Unidos por Botswana»: vídeo de ayuda para reconstruir el salón de eventos donde John e Isabella se casaron. Los planos, como DATOS.
 *
 * Pieza PERSONAL de ellos dos, sin canal ni marca (se declara en la cabecera de `Botswana069.tsx`). 1080×1920 · 30 fps · 2166 f (72,2 s) y SIN avatar: es un montaje (director §3i).
 *
 * REVISIÓN 2 (2026-10-28, pedido de ellos tras oír la prueba de la rev. 1):
 *   «Prueba otra [canción] y que no salgan tantas imágenes de nuestra boda, sino de cómo quedó el lugar, para que genere más impacto para las donaciones. En el primer vídeo de nosotros haz un zoom
 *    y céntranos un poco.»
 *   · CANCIÓN: «Children» (versión de piano de Armin van Buuren; antes «We Are», que queda en `proyectos/069/rev1-we-are/`). Piano íntimo, SIN pulso: se corta por sus NOTAS FUERTES, no por una rejilla.
 *   · IMAGEN: de 20 fotos de la boda a 6 (3 en el arranque, 1 en la escena 3, 2 en la 5). El resto es el LUGAR: el arco «BOTSWANA» con las llamas detrás, los bomberos entre las vigas, la cocina con los
 *     frascos derretidos, las columnas negras, el patio calcinado, los costales de escombro —y el lugar antes, para el contraste—. Todo es material real de ellos (director §3h).
 *   · MOV 1: ventana de la fuente 4K con zoom ×1,6 centrada en ellos (el archivo se normaliza ya encuadrado: `normalizar.mjs`, opción `recorte`) y un empuje suave 1,2 → 1,0. Caminaban por el 30 % izquierdo (de 36 % a 27 % del ancho según se acercan).
 *
 * QUIÉN MARCA EL TIEMPO: LA CANCIÓN. «Children» (piano), desde el segundo 110,74 (`INICIO_MUSICA`). Cada plano entra en una NOTA FUERTE medida (`proyectos/069/musica/golpes-musica-children.json`,
 * `herramientas/golpes.mjs`): `a(t)` convierte el segundo de la canción en el frame de la comp y lo que se escribe aquí es EL SEGUNDO DE LA CANCIÓN en que acaba cada plano, no un número de frames.
 * La forma de la pista es una historia con la de la pieza (sonoridad medida con ebur128, ver `musica-069.ts`):
 *
 *   110,7-114     frase de piano en su punto más alto (−8 LUFS)                          → las fotos felices, la primera en la nota de 8 dB de 110,77
 *   114-117,7     la frase se APAGA (−16 → −25) hasta casi nada                           → el abrazo, la última foto feliz: la música «se va» antes de que llegue el fuego
 *   117,745       UNA NOTA de 13 dB tras el vacío                                         → el corte SECO al incendio: la nota y el golpe de imagen son uno
 *   118-122       frase suave (−19…−23) con notas de 10 dB a 118,1 y 118,8                → el arco «BOTSWANA» ardiendo, los tejados, el humo
 *   122,3-131,1   la música se APAGA otra vez, hasta el silencio (−44 LUFS a 129-130 s)    → el MOV 1: su voz entra en la calma y acaba EN el silencio
 *   131,100       UNA NOTA de 17 dB tras el silencio                                       → entra el LUGAR (escena 3): antes y después
 *   131-160       sube poco a poco (−32 → −15) con notas de 6-12 dB                        → el después, el amor que nació aquí, las familias; bajo el MOV 2 sigue subiendo
 *   160,56        nota de 8,7 dB al acabar la frase del MOV 2                               → el mensaje final
 *   165-183       meseta (−10…−12), notas de 6-11 dB                                       → el mensaje final y la tarjeta, donde se apaga
 *
 * LOS DOS PLANOS EN QUE HABLAN (pedido de la rev. 1: «que empiecen en el principio de la voz y terminen en el final»). Medidos por energía a 20 ms (150-4000 Hz), no con whisper:
 *   MOV 1  primera sílaba 11,81 s · última 20,41 s → plano desde 11,71 s (3 f de aire antes de «En») hasta 20,54 s (0,13 s tras «familia»): 8,83 s, de nota a nota (122,26 → 131,10)
 *   MOV 2  primera sílaba  6,01 s · última 14,45 s → plano desde  5,91 s hasta 14,54 s (0,09 s tras «construirlo»): 8,63 s, de nota a nota (151,935 → 160,56)
 *
 * LA VOZ EN OFF SIGUE PENDIENTE. Los huecos de `voz-069.ts` se recolocaron con los cortes nuevos; cada locución, cuando llegue, ducka la música (`audio-069.ts`).
 *
 * LAS ESCENAS (guion de ellos → montaje): 1 = 0:00-0:11,5 · 2 = 0:11,5-0:20,4 · 3 = 0:20,4-0:41,2 · 4 = 0:41,2-0:49,8 · 5 = 0:49,8-1:02,2 · tarjeta 1:02,2-1:12,2. Las de voz en off (1, 3 y 5)
 * conservan o superan el tiempo del guion (8 · 19 · 12 s) para que las frases quepan.
 *
 * QUÉ ES MATERIAL Y QUÉ NO. Todo es real y de ellos: no hay banco ni IA (director §3h).
 *   · FOTOS de la boda: dos carruseles de @jalvarez.tech (recepción `A-xx`, ceremonia `B-xx`; 1440 px de ancho, apaisadas) y fotos propias del lugar antes y después. Las apaisadas van ENTERAS sobre su propio
 *     fondo desenfocado (`relleno`), salvo tres composiciones centradas que llenan el cuadro con una ventana 9:16 (`recorte`).
 *   · VÍDEO del incendio y del después: recompresiones de mensajería a 464×832 (`inc0x`, `lle01`, `bom01`, `des03`, `des07`; `des08` es apaisado). Se ven blandos a pantalla completa: NO se les pide punch-in (≤ 1,04).
 *   · El montaje va MUDO salvo los dos MOV y la canción.
 *   · NADIE sale como «Nelson»: el guion lo nombra y ningún plano lo señala (ni los obreros de `lim01` ni la gente sentada de `gen01`; en `des07` y `des03` solo se ven al fondo).
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente; `en` y `dur`, en frames de la composición (30 fps). Los planos son CONTIGUOS. Un plano que entra disolviendo (`disolver`) empieza a verse 12 f ANTES de
 * su `en` (`solapeDe`): su clip tiene que tener esos 12 f antes de `desde`, y el anterior dura hasta ese `en`. Las disolvencias ACABAN en una nota; los cortes secos CAEN en una.
 * LO QUE DUELE ENTRA A CORTE (el incendio, el después, el lugar quemado tras un recuerdo); LO QUE FUE, DISOLVIENDO.
 *
 * Datos puros: solo `import type` y los números de la tarjeta (`cierre-069.ts`). La puerta lo carga con node.
 */
import type { Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-069";

export const FPS_069 = 30;

/**
 * El segundo de «Children» (`musica-children.wav`, la canción ENTERA decodificada) que suena en el frame 0. La nota de 8 dB de 110,770 s cae en el frame 1: el catálogo pone 30 ms de colchón
 * (`entra: 1` en el tramo) para quitar el clic sin comerse el ataque.
 */
export const INICIO_MUSICA = 110.74;

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

/** Los planos se colocan uno detrás de otro: `en` sale de la suma. `hasta` es el segundo de la canción en que acaba el plano (su nota de salida). */
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
  /* ── ESCENA 1 · DE LA FELICIDAD AL DOLOR (0-346) ──────────────────────────────────────────────────────────────── */
  // Tres fotos de la boda (eran nueve): la frase de piano en su punto más alto y su apagado. Cada cambio en una nota: 110,77 (8 dB, f1) · 112,195 (7,9) · 114,44 (6,8). El frame 0 es la miniatura:
  // el beso, sin texto, con la nota de 8 dB de la canción. La última foto dura lo que tarda la música en irse (3,3 s); el corte al incendio cae en la nota de 13 dB que llega tras el vacío.
  foto("c01-beso", 1, "a03", 112.195, "el beso con el ramo: lo primero que se ve y la miniatura; entra con la nota de 8 dB de la canción (f1) y se queda la frase entera", { zoom: [1, 1.1] }),
  foto("c02-sonrisa", 1, "a07", 114.44, "los dos muy juntos, sonriendo a cámara: la felicidad de frente"),
  foto("c03-abrazo", 1, "a06", 117.745, "el abrazo bajo el arco de palma: la última imagen feliz, mientras la música se apaga (−16 → −25 LUFS) y se queda sola en el vacío; el siguiente plano es el incendio en la nota de 13 dB"),
  // «Corte repentino a las imágenes del incendio»: en seco y EN la nota de 13 dB que llega tras el vacío. Tres planos, de la palapa al arco con el nombre del lugar y a los tejados; cada uno en una nota.
  video("c04-incendio-palapa", 1, "inc03", 118.805, "las llamas sobre la palapa y el naranjo, y un hombre mirando: el corte en seco; cae en la nota de 13 dB y donde John dice «Y hoy…»", { desde: 1, zoom: [1, 1.04] }),
  video("c05-incendio-arco", 1, "lle01", 120.345, "el arco «BOTSWANA Cartagena Beach» con el humo y las llamas detrás: el nombre del lugar, ardiendo (nota de 10 dB al entrar)", { desde: 29, zoom: [1, 1.04] }),
  video("c06-incendio-azotea", 1, "inc01", 122.26, "el incendio visto desde una azotea: la dimensión (humo sobre los tejados del barrio); funde a negro para respirar antes de ellos dos", { desde: 0.6, zoom: [1, 1.04], salidaNegro: 10 }),

  /* ── ESCENA 2 · LO QUE REALMENTE REPRESENTA (346-611) ─────────────────────────────────────────────────────────── */
  // `isabella y john 1.MOV` desde su primera sílaba (11,81 s; el plano arranca 3 f antes, en 11,71) hasta su última (20,41 s; acaba en 20,54). De nota a nota: 122,26 → 131,10. A corte, sobre el negro del incendio.
  // La música se apaga bajo su voz y llega al silencio al acabar: ellos hablan en la calma. ENCUADRE: el archivo ya viene recortado a ellos (zoom ×1,6 en 31 % × 58 %) y aquí empuja de 1,2 a 1,0 mientras se acercan.
  video("c07-juntos-caminan", 2, "mov1", 131.1, "ellos dos caminan hacia cámara y dicen lo que Botswana representa, de la primera a la última palabra: «aquí no solo celebramos una boda, aquí reafirmamos nuestro amor»; encuadrados y con zoom", {
    desde: 11.71,
    zoom: [1.2, 1.0],
  }),

  /* ── ESCENA 3 · EL LUGAR: LO QUE FUE, LO QUE QUEDÓ Y LO QUE EL FUEGO NO PUEDE DESTRUIR (611-1236) ─────────────── */
  // Tras el silencio, UNA NOTA de 17 dB: entra el lugar. Parte A, con la voz de Isabella sobre Nelson: el antes (cálido) y el después (frío) — cuatro planos, solo el lugar.
  foto("c08-antes-cabanas", 3, "antes-cabanas", 133.245, "las dos cabañas con las antorchas encendidas: el lugar como era; entra a corte en la nota de 17 dB que rompe el silencio", { zoom: [1, 1.12] }),
  foto("c09-despues-muro", 3, "quemado-muro", 135.415, "el muro y las vigas calcinadas: lo que quedó (foto de 12 MP recortada a 9:16, llena el cuadro; disuelve desde el cálido: el cambio se siente, no se corta)", { entra: "disolver", zoom: [1, 1.06] }),
  foto("c10-antes-sala", 3, "antes-sala", 136.83, "el salón con su luz naranja, donde estaban todos; la disolvencia acaba en la nota de 12 dB", { entra: "disolver", zoom: [1, 1.1] }),
  video("c11-bomberos", 3, "bom01", 139.41, "los bomberos con las mangueras entre las vigas negras, todavía humeando: el después, con la gente que ayudó", { entra: "disolver", desde: 10, zoom: [1, 1.04] }),
  // Parte B, con la voz de John: «Pero hay algo que el fuego jamás podrá destruir: el amor que nació aquí, las familias que unió, los recuerdos». Seis planos, DOS de la boda (la ceremonia y las familias, en
  // la palabra que les toca) entre cuatro del lugar quemado, que entran siempre a corte: lo que duele. La pista sigue subiendo.
  video("c12-cocina", 3, "des07", 142.065, "lo que queda de la cocina: la mesa de obra con los frascos derretidos debajo; a corte en la nota de 8 dB: «Pero hay algo que el fuego jamás podrá destruir»", { desde: 29.5, zoom: [1, 1.04] }),
  foto("c13-ceremonia", 3, "b01", 144.995, "la ceremonia en la playa al atardecer: «el amor que nació aquí»; el único plano largo de la boda, bajo su frase", { entra: "disolver" }),
  video("c14-escombros", 3, "des03", 146.625, "la columna negra con las varillas retorcidas en el rincón; el lugar sin nadie; a corte", { desde: 26, zoom: [1, 1.04] }),
  foto("c15-bomberos-a", 3, "bomberos-a", 148.56, "un bombero entre los postes quemados y los charcos del patio (foto de 12 MP recortada a 9:16 sobre el bombero, la más nítida del después): quienes ayudaron en lo que ya no está", { zoom: [1, 1.06] }),
  video("c16-patio", 3, "des08", 150.505, "el patio calcinado con la cinta amarilla de los bomberos, en plano abierto (apaisado, entero sobre su fondo); a corte", { desde: 4, zoom: [1, 1.06] }),
  foto("c17-estructura", 3, "bomberos-estructura", 151.935, "la estructura quemada con los bomberos entre las vigas (foto de 12 MP recortada a 9:16): «los recuerdos que llevamos en el corazón» sobre lo que ya no está", { zoom: [1, 1.06] }),

  /* ── ESCENA 4 · LA FUERZA DE ESTAR UNIDOS (1236-1495) ─────────────────────────────────────────────────────────── */
  // `isabella y john 2.mov` desde 5,91 s (3 f antes de la primera sílaba, 6,01) hasta 14,54 s (0,09 s tras la última, 14,45). De nota a nota: 151,935 → 160,56. Entra disolviendo desde el lugar quemado (la
  // disolvencia acaba en la nota y su primera palabra suena 3 f después). El clip tiene 5,5 s antes de `desde`: sobra para los 12 f de la disolvencia.
  video("c18-juntos-unirnos", 4, "mov2", 160.56, "de la mano, en la calle con el cielo de tormenta, de la primera a la última palabra: «cuando la vida golpea aquello que amamos, debemos unirnos para volver a construirlo»; la música llega a su meseta al acabar", {
    desde: 5.91,
    zoom: [1, 1.05],
    entra: "disolver",
  }),

  /* ── ESCENA 5 · EL MENSAJE FINAL (1495-1866) ──────────────────────────────────────────────────────────────────── */
  // «Hoy queremos unir nuestros corazones…» (John, hueco `john-3`): la arena de la ceremonia (dos colores en un solo vaso, la imagen más literal de «unir») y, a corte, los costales de escombro: la limpieza ya empezó.
  foto("c19-arena", 5, "b11", 163.67, "la arena de colores vertida en el mismo vaso: «unir nuestros corazones»; la disolvencia acaba en la nota de 8,7 dB con que la música llega a su meseta", { entra: "disolver" }),
  video("c20-costales", 5, "des07", 165.81, "los costales de escombro apilados en el patio ya limpio: la reconstrucción tiene que empezar por aquí; a corte", { desde: 45.3, zoom: [1, 1.04] }),
  // «Porque Botswana merece seguir siendo el lugar donde muchas familias comiencen su historia» (Isabella, hueco `isabella-2`): el lugar como lo recuerdan y los novios entre las chispas.
  video("c21-antes-salon", 5, "ant02", 170.335, "el recorrido por Botswana antes del incendio: el salón naranja y las cabañas; el lugar «como lo recuerdan»", { desde: 1, zoom: [1, 1.05], entra: "disolver" }),
  foto("c22-chispas", 5, "b17", 172.945, "los novios caminando entre las chispas: el último plano feliz; funde a negro y a la tarjeta", { entra: "disolver", zoom: [1, 1.08], salidaNegro: 12 }),

  /* ── LA TARJETA FINAL (1866-2166) ─────────────────────────────────────────────────────────────────────────────── */
  // Un negro cálido liso con los textos del guion encima (`Botswana069.tsx`). Sin cortes que sincronizar: la canción sigue en su meseta y se apaga bajo los textos (`audio-069.ts`).
  poner(
    { id: "c23-tarjeta", tipo: "foto", escena: 6, src: R("tarjeta-oscura.png"), zoom: [1, 1], entra: "corte", reason: "el fondo oscuro de «EL FUEGO PUEDE DESTRUIR UN LUGAR. PERO JAMÁS EL AMOR QUE ALLÍ NACIÓ.», la firma y los datos para aportar" },
    172.945 + DUR_TARJETA / FPS_069
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
  "c18-juntos-unirnos": {
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
