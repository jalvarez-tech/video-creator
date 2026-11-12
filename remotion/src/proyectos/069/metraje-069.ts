/**
 * EL 069 — «Unidos por Botswana»: vídeo de ayuda para reconstruir el salón de eventos donde John e Isabella se casaron. Los planos, como DATOS.
 *
 * Pieza PERSONAL de ellos dos, sin canal ni marca (se declara en la cabecera de `Botswana069.tsx`). 1080×1920 · 30 fps · 2081 f (69,4 s) y SIN avatar: es un montaje (director §3i).
 *
 * REVISIÓN 9 (2026-10-28, pedido de ellos tras la prueba de la rev. 8): «antes del video dejaste una imagen, remuévela y pon el video que agregaste unos segundos antes». La imagen era la foto de las cabañas
 * (`c07`, 1,2 s entre los dos de ellos y la serenata): sale, y la serenata empieza ahí, justo tras el MOV 1 (0:15,9, en el golpe de 11,3 dB de 17,865 s de la pista), en vez de a 0:17. Sigue tomada desde el segundo 23 del
 * clip y acaba donde acababa (0:21,9): ahora dura 6,1 s (de 23,0 a 29,1 s del clip). Quedan 4 planos de la boda (con la serenata) y 11 del lugar; los ids no se renumeran (falta el `c07`).
 *
 * REVISIÓN 8 (2026-10-28, pedido de ellos tras la final de la rev. 7): «después de 0:17 cambia las imágenes por el video …/Serenata.mp4 en el 0:23». Aclarado con ellos: se sustituyen las imágenes del
 * 0:17 al 0:22 por la SERENATA de su boda en Botswana (de noche, la cámara avanza por el patio con las luces y las palapas), tomada desde el SEGUNDO 23 DEL CLIP, y va sin su sonido (el montaje va mudo salvo la
 * música y las voces). Cae en los golpes de 5,4 dB (19,04 s de la pista = 0:17,0) y 4,8 dB (23,925 = 0:21,9): 4,9 s. La foto de las cabañas se queda 1,2 s antes de ella; el salón (`antes-sala`) sale del
 * plano; el muro quemado entra después, 1,1 s, y los bomberos siguen entrando en el 0:23. La serenata es metraje de su boda: cuenta como «boda» en la puerta (4 planos) y el lugar baja a 12.
 *
 * REVISIÓN 6 (2026-10-28, pedido de ellos tras oír la prueba de la rev. 5): «cambia la imagen de la playa en el 0:27 por a7c39420-….MP4». El 0:27 cae en la foto de la ceremonia en la playa al atardecer
 * (`b01`, `c11`); `a7c39420` es `inc03` (el incendio de la palapa, 6,9 s). La foto sale y entra el clip, a corte en el golpe de 10,9 dB de 28,6 s, de 2,0 a 5,1 s del clip (el tramo de 1,0 a 1,9 s ya es el `c03`):
 * la palapa y el árbol en llamas, con el hombre que mira al fondo. La boda queda en 3 planos (beso, abrazo y arena) y el lugar sube a 13.
 *
 * REVISIÓN 5 (2026-10-28, pedido de ellos tras oír la prueba de la rev. 4): «empieza la música desde el segundo 2 del video, para que empiece con el piano y de ese modo acortemos el hook y las imágenes
 * de nosotros». Se entendió (y se confirmó con ellos): «We Are» se toma desde el SEGUNDO 2 DE SU PISTA —su comienzo, con el ostinato de piano— y no desde 2:04, donde arranca su sección orquestal fuerte.
 * Con ese arranque, la canción ya no cae 11 dB en el corte al incendio ni sube a una meseta: es un ostinato de piano con acentos de 5-15 dB cada 0,4-0,8 s y una zona más alta (18-42 s de la pista) y otra más baja (44-70 s).
 *   · HOOK MÁS CORTO: la escena 1 pasa de 8,3 s a 7,1 s y las fotos de la boda al abrir, de 3 (5,0 s) a 2 (3,6 s: el beso y el abrazo); el corte al incendio cae en el golpe de 11,3 dB de 5,56 s de la pista.
 *   · Se conserva lo anterior (en la rev. 5: 4 planos de la boda —beso, abrazo, ceremonia y arena— y 12 del lugar; en la 6, 3 y 13), el MOV 1 con zoom y centrado y EL FINAL ES EL FUEGO (rev. 3: la columna de humo y el arco «BOTSWANA» ardiendo).
 *   · Las rev. 1-4 están guardadas con su código: `proyectos/069/rev1-we-are/` (2:04, 9 fotos), `rev2-children/`, `rev3-softly/` y `rev4-we-are-meseta/` (We Are desde 2:04 con el final de fuego).
 *
 * QUIÉN MARCA EL TIEMPO: LA CANCIÓN. «We Are» (Aleksey Chistilin: cinematic orquestal, «unión, solemnidad»), desde el segundo 2,0 (`INICIO_MUSICA`). Cada plano entra en un GOLPE medido de la canción
 * (`proyectos/069/musica/golpes-musica-we-are.json`, `herramientas/golpes.mjs`): `a(t)` convierte el segundo de la canción en el frame de la comp y lo que se escribe aquí es EL SEGUNDO DE LA CANCIÓN en que
 * acaba cada plano, no un número de frames. La cadena de golpes (el corte al incendio, los dos planos de ellos, la entrada del lugar quemado y el fuego del final) se buscó con `herramientas/buscar-cadena.mjs`.
 * La forma de la pista en este tramo (sonoridad medida con ebur128, ver `musica-069.ts`):
 *
 *   2-5,6          ostinato de piano (−16 LUFS) con golpes de 10-11 dB cada 0,8 s          → el beso y el abrazo: las dos fotos felices (golpes de 9,5 y 11,3 dB)
 *   5,56           golpe de 11,3 dB                                                         → el corte seco al incendio
 *   5,6-9,1        piano con acentos de 7-12 dB cada 0,9-1,1 s                              → la palapa, la llama del árbol y los tejados
 *   9,145-17,865   piano (−15…−9 LUFS), golpes de 13,4 y 11,3 dB en los extremos             → el MOV 1: su voz sale por encima
 *   17,9-39,4      la zona alta (−11 LUFS de media, hasta −8 a los 18 y 26 s)               → el lugar: antes (cabañas, salón), después (muro en el golpe de 12 dB), el amor que nació aquí, las familias
 *   39,4-48,2      −14 LUFS                                                                 → el MOV 2
 *   48,2-61,4      zona baja (−18 LUFS) con golpes de 7-14 dB cada ≈ 0,4-1 s                → el mensaje final: la arena, los costales (golpe de 14,2 dB), EL FUEGO y el arco ardiendo
 *   61,4-71        −18 LUFS, sin golpes; se apaga bajo la tarjeta                           → los textos se leen, sin cortes que sincronizar
 *
 * LOS DOS PLANOS EN QUE HABLAN (pedido de la rev. 1: «que empiecen en el principio de la voz y terminen en el final»). Medidos por energía a 20 ms (150-4000 Hz), no con whisper:
 *   MOV 1  primera sílaba 11,81 s · última 20,41 s → plano desde 11,74 s (0,07 s antes de «En») hasta 20,47 s (0,06 s tras «familia»): 8,73 s, de golpe a golpe (9,145 → 17,865)
 *   MOV 2  primera sílaba  6,01 s · última 14,45 s → plano desde  5,91 s hasta 14,68 s (0,23 s tras «construirlo»): 8,77 s, de golpe a golpe (39,435 → 48,195)
 *
 * LA VOZ EN OFF SIGUE PENDIENTE. Los huecos de `voz-069.ts` se recolocaron con los cortes nuevos; cada locución, cuando llegue, ducka la música (`audio-069.ts`).
 *
 * LAS ESCENAS (guion de ellos → montaje): 1 = 0:00-0:07,1 · 2 = 0:07,1-0:15,9 · 3 = 0:15,9-0:37,4 · 4 = 0:37,4-0:46,2 · 5 = 0:46,2-0:59,4 · tarjeta 0:59,4-1:09,4. Las de voz en off 3 y 5
 * conservan o superan el tiempo del guion (19 · 12 s); la 1 es la que ellos pidieron acortar (el guion le daba 8 s, ahora 7,1: la frase de John tiene que leerse en ≈ 6,7 s).
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
 * El segundo de «We Are» (`musica-we-are.wav`, la canción ENTERA decodificada) que suena en el frame 0: el segundo 2 de la pista, con el ostinato de piano ya sonando (el primer acento, de 10 dB, cae en 2,43 s,
 * en el f13). `entra: 1` en el tramo pone 30 ms de colchón para quitar el clic de entrar a media nota.
 */
export const INICIO_MUSICA = 2.0;

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
  /* ── ESCENA 1 · DE LA FELICIDAD AL DOLOR (0-214) ──────────────────────────────────────────────────────────────── */
  // Dos fotos de la boda mientras el piano ya suena (eran tres, 5,0 s; ahora 3,6 s): el cambio en el golpe de 9,5 dB de 4,00 s y, en el de 11,3 dB de 5,56 s, el incendio. El frame 0 es la miniatura: el beso, sin texto.
  foto("c01-beso", 1, "a03", 4.0, "el beso con el ramo: lo primero que se ve y la miniatura; el piano ya suena; cambia en el golpe de 9,5 dB", { zoom: [1, 1.1] }),
  foto("c02-abrazo", 1, "a06", 5.56, "el abrazo bajo el arco de palma: la última imagen feliz; el siguiente plano es el incendio, en el golpe de 11,3 dB"),
  // «Corte repentino a las imágenes del incendio»: en seco y EN el golpe de 11,3 dB. Tres planos cada vez más largos (0,9 · 1,1 · 1,6 s): la palapa en llamas, la llama alta del árbol y el humo sobre los tejados.
  video("c03-incendio-palapa", 1, "inc03", 6.445, "las llamas sobre la palapa y el naranjo, y un hombre mirando: el corte en seco, en el golpe de 11,3 dB; John dice «…nuestra vida. Y hoy…»", { desde: 1, zoom: [1, 1.04] }),
  video("c04-incendio-arbol", 1, "inc02", 7.555, "la llama alta en el árbol del patio vista desde arriba, con el humo detrás: el fuego sube; cae en el golpe de 11,7 dB", { desde: 1.3, zoom: [1, 1.04] }),
  video("c05-incendio-azotea", 1, "inc01", 9.145, "el incendio visto desde una azotea: la dimensión (humo sobre los tejados del barrio); funde a negro para respirar antes de ellos dos", { desde: 0.6, zoom: [1, 1.04], salidaNegro: 8 }),

  /* ── ESCENA 2 · LO QUE REALMENTE REPRESENTA (214-476) ─────────────────────────────────────────────────────────── */
  // `isabella y john 1.MOV` desde su primera sílaba (11,81 s; el plano arranca 0,07 s antes, en 11,74) hasta su última (20,41 s; acaba en 20,47). De golpe a golpe: 9,145 (13,4 dB) → 17,865 (11,3). A corte, sobre el negro del incendio.
  // La música sigue (piano a −15…−9 LUFS) y baja bajo su voz a −26. ENCUADRE: el archivo ya viene recortado a ellos (zoom ×1,6 en 31 % × 58 %) y aquí empuja de 1,2 a 1,0 mientras se acercan.
  video("c06-juntos-caminan", 2, "mov1", 17.865, "ellos dos caminan hacia cámara y dicen lo que Botswana representa, de la primera a la última palabra: «aquí no solo celebramos una boda, aquí reafirmamos nuestro amor»; encuadrados y con zoom", {
    desde: 11.74,
    zoom: [1.2, 1.0],
  }),

  /* ── ESCENA 3 · EL LUGAR: LO QUE FUE, LO QUE QUEDÓ Y LO QUE EL FUEGO NO PUEDE DESTRUIR (476-1123) ─────────────── */
  // Parte A, con la voz de Isabella sobre Nelson: el lugar como era (la serenata de su boda, 6,1 s, que entra justo tras el MOV 1) y, a corte, el lugar QUEMADO: el muro (1,1 s) y los bomberos, que entran en el golpe de 8,4 dB de 25,02 s.
  video("c08-serenata", 3, "serenata", 23.925, "la serenata de SU boda en Botswana, de noche, desde el segundo 23 del clip (hasta el 29,1): la cámara avanza por el patio con las luces, las palapas, los invitados y los mariachis; entra a corte en el golpe de 11,3 dB tras el MOV 1 (0:15,9) y acaba en el de 4,8 dB (0:21,9), sin su sonido (rev. 9: ya no hay foto de las cabañas antes)", { desde: 23, zoom: [1, 1.04] }),
  foto("c09-despues-muro", 3, "quemado-muro", 25.02, "el muro y las vigas calcinadas: lo que quedó, a corte tras la serenata (golpe de 4,8 dB) y 1,1 s antes de los bomberos (foto de 12 MP recortada a 9:16, llena el cuadro)", { zoom: [1, 1.06] }),
  video("c10-bomberos", 3, "bom01", 28.595, "los bomberos con las mangueras entre las vigas negras, todavía humeando: el después, con la gente que ayudó", { desde: 10, zoom: [1, 1.04] }),
  // Parte B, con la voz de John: «Pero hay algo que el fuego jamás podrá destruir: el amor que nació aquí, las familias que unió, los recuerdos que llevamos en el corazón». Las llamas sobre la
  // palapa (rev. 6: antes era la foto de la ceremonia en la playa; lo pidieron ellos) bajo «el amor que nació aquí», a corte en el golpe de 10,9 dB, y luego la cocina y la estructura que ya no está (a corte en los golpes de 7,1 y 10,4 dB).
  video("c11-incendio-llamas", 3, "inc03", 31.7, "la palapa y el árbol en llamas, con un hombre mirando al fondo (de 2,0 a 5,1 s del clip; el tramo de 1,0 a 1,9 s es el c03): el fuego frente a «el amor que nació aquí»; a corte en el golpe de 10,9 dB", { desde: 2.0, zoom: [1, 1.04] }),
  video("c12-cocina", 3, "des07", 35.285, "lo que queda de la cocina: la mesa de obra con los frascos derretidos debajo; a corte: «las familias que unió»", { desde: 29.5, zoom: [1, 1.04] }),
  foto("c13-estructura", 3, "bomberos-estructura", 39.435, "la estructura quemada con los bomberos entre las vigas (foto de 12 MP recortada a 9:16): «los recuerdos que llevamos en el corazón» sobre lo que ya no está; entra a corte en el golpe de 10,4 dB", { zoom: [1, 1.08] }),

  /* ── ESCENA 4 · LA FUERZA DE ESTAR UNIDOS (1123-1386) ─────────────────────────────────────────────────────────── */
  // `isabella y john 2.mov` desde 5,91 s (0,10 s antes de la primera sílaba, 6,01) hasta 14,68 s (0,23 s tras la última, 14,45). De golpe a golpe: 39,435 → 48,195. Entra disolviendo desde el lugar quemado (la
  // disolvencia acaba en el golpe y su primera palabra suena 3 f después). El clip tiene 5,5 s antes de `desde`: sobra para los 12 f de la disolvencia.
  video("c14-juntos-unirnos", 4, "mov2", 48.195, "de la mano, en la calle con el cielo de tormenta, de la primera a la última palabra: «cuando la vida golpea aquello que amamos, debemos unirnos para volver a construirlo»", {
    desde: 5.91,
    zoom: [1, 1.05],
    entra: "disolver",
  }),

  /* ── ESCENA 5 · EL MENSAJE FINAL (1386-1781) ──────────────────────────────────────────────────────────────────── */
  // «Hoy queremos unir nuestros corazones…» (John, hueco `john-3`): la arena de la ceremonia (dos colores en un solo vaso, la imagen más literal de «unir») y, a corte en el golpe más fuerte de todo el
  // vídeo (14,2 dB de 50,65 s), los costales de escombro: la limpieza ya empezó.
  foto("c15-arena", 5, "b11", 50.65, "la arena de colores vertida en el mismo vaso: «unir nuestros corazones»; la disolvencia acaba en el golpe de 8,4 dB", { entra: "disolver" }),
  video("c16-costales", 5, "des07", 53.92, "los costales de escombro apilados en el patio ya limpio: la reconstrucción tiene que empezar por aquí; a corte en el golpe de 14,2 dB", { desde: 45.3, zoom: [1, 1.04] }),
  // «Porque Botswana merece seguir siendo el lugar donde muchas familias comiencen su historia» (Isabella, hueco `isabella-2`): y lo último que se ve es lo que el fuego se llevó. Las dos entran A CORTE en un
  // golpe de 8,5 y 7,8 dB: la columna de humo y llamas sobre los tejados y el arco con el nombre del lugar y el cielo anaranjado detrás, que funde a negro y llega a la tarjeta.
  video("c17-incendio-final", 5, "inc01", 57.77, "la columna de humo negro y las llamas sobre los tejados, a corte en el golpe de 8,5 dB: lo que se llevó el fuego, en grande (la misma azotea que al principio, 5 s más tarde)", {
    desde: 6.0,
    zoom: [1, 1.04],
  }),
  video("c18-arco-botswana", 5, "lle01", 61.36, "el arco «BOTSWANA Cartagena Beach» con el cielo anaranjado y el humo detrás, y una silla sola al fondo: el nombre del lugar, ardiendo, es lo último que se ve; funde a negro y a la tarjeta", {
    desde: 28.65,
    zoom: [1, 1.04],
    salidaNegro: 12,
  }),

  /* ── LA TARJETA FINAL (1781-2081) ─────────────────────────────────────────────────────────────────────────────── */
  // Un negro cálido liso con los textos del guion encima (`Botswana069.tsx`). Sin cortes que sincronizar: entra en el golpe de 5,9 dB de 61,36 s, el piano sigue y se apaga bajo los textos (`audio-069.ts`).
  poner(
    { id: "c19-tarjeta", tipo: "foto", escena: 6, src: R("tarjeta-oscura.png"), zoom: [1, 1], entra: "corte", reason: "el fondo oscuro de «EL FUEGO PUEDE DESTRUIR UN LUGAR. PERO JAMÁS EL AMOR QUE ALLÍ NACIÓ.», la firma y los datos para aportar" },
    61.36 + DUR_TARJETA / FPS_069
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
