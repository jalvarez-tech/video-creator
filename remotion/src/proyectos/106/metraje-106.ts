/**
 * EL MONTAJE 106 — «En últimas noticias» en 16:9 (Fundación MAS · MAS Estrellitas 2026): la versión horizontal del vídeo
 * vertical 105 (pedido del usuario, 2026-11-23: «quiero que hagas el último en formato 16:9»). Plan y timeline:
 * `proyectos/106/artefactos/`.
 *
 * LA MISMA HISTORIA, LAS MISMAS TOMAS Y LOS MISMOS CORTES que el 105 (`remotion/src/proyectos/105/historia-105.ts`, rev. 2):
 * solo tomas que no salen en 097-104, cortes en valles de energía medidos y el papel en f1446, en el golpe de 324,99 s de
 * «Yeshua». Lo que cambia es el formato (1920×1080), el material (`remotion/public/mas-106/`, receta
 * `proyectos/106/normalizar.mjs`: horizontales y dron ENTEROS, verticales en su franja 16:9), el look (el de los 16:9 de MAS,
 * 097-100) y el cierre: el CTA en papel del 100, de 10,3 s, en vez de la tarjeta vertical de 6 s.
 *
 * UNIDADES. `desde`, en SEGUNDOS de la fuente normalizada; `en` y `dur`, en frames de la comp (30 fps). El dron va a 29,97
 * en el original y la receta lo deja a 30 con `setpts=PTS*1000/1001`: su `desde` va × 1000/1001.
 *
 * Datos puros: la puerta y los scripts lo cargan con node.
 */
import type { Corte } from "../../motor/metraje";

export const FPS_106 = 30;
/** Donde entra el papel del CTA: el golpe de 324,99 s (15,7 dB) de «Yeshua», como en el 105. */
export const EMPIEZA_PAPEL = 1446;
/** 58,5 s: el metraje (48,2 s) y el CTA en papel del 100 (309 f). */
export const DURACION_106 = EMPIEZA_PAPEL + 309;
/** El segundo de «Yeshua» que suena en el frame 0 (el tramo que el 097 no usó; el mismo del 105). */
export const INICIO_MUSICA = 276.79;

const DJI = 1000 / 1001;
const v = (clip: string) => `mas-106/${clip}.mp4`;

export const metraje106: Corte[] = [
  // ── Las reporteras (f0-405) ──
  {
    id: "p01-hz22", src: v("hz22"), desde: 0.4, en: 0, dur: 107, zoom: [1, 1.04],
    reason: "El gancho: la reportera en selfi con la casa detrás, «Hola, en últimas noticias: un lugar maravilloso» (0,56-3,96 s); sale antes del latigazo de cámara (≈ 4 s). En 16:9 caben las dos amigas",
  },
  { id: "p02-vt21", src: v("vt21"), desde: 0.07, en: 107, dur: 103, zoom: [1, 1.05], reason: "Las dos de la puerta posan y salen corriendo hacia cámara: «¡Bienvenidos…!» (2,44-3,40 s)" },
  {
    id: "p03-vt29", src: v("vt29"), desde: 31.1, en: 210, dur: 195, zoom: [1, 1.05],
    reason: "La reportera del micro de botón ante el corro: «…aquí es el club de hablar y de resolver problemas» (31,3-37,3 s, cámara casi fija). De 10,5 a 17 s la toma enseña a un adulto: no entra",
  },
  // ── La entrevista del banco (f405-765): la misma toma, sin lo que no se entiende ──
  {
    id: "p04-vt18", src: v("vt18"), desde: 26.3, en: 405, dur: 117, zoom: [1, 1.03],
    reason: "La de trenzas pregunta «Si tendrías una mascota, ¿cuál tendrías?…» y sale de cuadro a 30,2 s (de 30,4 a 32 la cámara se queda en la mesa y alguien cruza delante: no entra)",
  },
  {
    id: "p05-vt18", src: v("vt18"), desde: 32.05, en: 522, dur: 177, zoom: [1.03, 1.07],
    reason: "DE CORRIDO: la otra escucha el final de la pregunta (la voz sigue de 30,2 a 32,4), «¡Un conejo!» (34,36-35,72 s, ya en sincronía: f588 = 34,25 s), el barrido de vuelta (36,0-36,3) y «Si tendrías un ave, ¿cuál tendrías?»",
  },
  { id: "p06-vt18", src: v("vt18"), desde: 44.25, en: 699, dur: 66, zoom: [1.03, 1.06], reason: "«Un colibrí» (44,36-46,20 s): fuera los 5 s sin entender de en medio" },
  // ── El regalo y la cualidad más bonita de Dios (f765-1189) ──
  {
    id: "p07-vt03", src: v("vt03"), desde: 0, en: 765, dur: 127, zoom: [1, 1.05],
    reason: "Otra toma de la pregunta del regalo (no la de la 102): «¿Qué es lo más bonito de recibir un regalo?» → «La Navidad.» (3,36-4,0 s); sale antes del «¿Por qué?»",
  },
  {
    id: "p08-hz04", src: v("hz04"), desde: 0, en: 892, dur: 106, zoom: [1, 1.03],
    reason: "Otra toma de la pregunta de la cualidad: «¿Cuál es la cualidad más bonita de Dios?» (0,12-1,96 s) → «La palabra de Dios.» (2,04-3,24 s). En 16:9, el plano entero: el árbol, la que pregunta y la que responde",
  },
  {
    id: "p09-hz04", src: v("hz04"), desde: 7.55, en: 998, dur: 42, zoom: [1.12, 1.15],
    reason: "«¡Bondadoso!» (7,76-8,72 s). Misma toma 4 s después: el ACERCAMIENTO (×1,12) cambia el tamaño de plano y el corte no se lee como salto; la que responde (al 67 % del ancho) sigue dentro",
  },
  {
    id: "p10-hz04", src: v("hz04"), desde: 11.0, en: 1040, dur: 66, zoom: [1.06, 1.09],
    reason: "La pequeña de dos coletas: «¡Un Dios inmortal!» (11,2-13,04 s), otra vez un poco más abierto que el anterior",
  },
  {
    id: "p11-hz07", src: v("hz07"), desde: 0.12, en: 1106, dur: 83, zoom: [1, 1.05],
    reason: "La que pregunta responde a cámara: «Y para mí es un Dios de oportunidades» (0,2-2,84 s). Se corta en el valle de 2,88 s, ANTES de «porque me dio oportunidad en la pobreza» (097 §6-§7: sensible)",
  },
  // ── La alegría y la despedida (f1189-1446) ──
  { id: "p12-hz09", src: v("hz09"), desde: 0.75, en: 1189, dur: 81, zoom: [1, 1.04], reason: "Las dos al pie del tobogán azul, a coro: el lema (0,96-3,20 s)" },
  { id: "p13-vt23", src: v("vt23"), desde: 0.2, en: 1270, dur: 58, zoom: [1, 1.04], reason: "Ante el árbol del salón: «¡Feliz Navidad para todos!» (0,48-2,0 s)" },
  {
    id: "p14-dr01", src: v("dr01"), desde: 3.4 * DJI, en: 1328, dur: 130, zoom: [1, 1.02],
    reason: "La despedida: el grupo entero se junta en la baranda y saluda al dron, que se aleja. Sigue 12 f bajo la hoja del CTA, que entra deslizando en f1446",
  },
];

/**
 * LAS VOCES: los mismos tramos que el 105 (sus ventanas se midieron allí y se vuelven a medir aquí con
 * `proyectos/106/herramientas/medir-voces.mjs`). El tramo de voz no siempre coincide con el plano: en VT18 la pregunta sigue
 * sonando sobre la que escucha (corte en J) y la respuesta y la pregunta del ave van de corrido.
 */
export interface TramoVoz {
  id: string;
  src: string;
  desde: number;
  en: number;
  dur: number;
  entra?: number;
  sale?: number;
  reason: string;
}
const a = (clip: string) => `mas-106/${clip}.wav`;
export const VOCES_PLAN: TramoVoz[] = [
  { id: "voz-noticias", src: a("hz22"), desde: 0.4, en: 0, dur: 107, reason: "«Hola, en últimas noticias: un lugar maravilloso»" },
  { id: "voz-bienvenidos", src: a("vt21"), desde: 0.07, en: 107, dur: 103, reason: "«¡Bienvenidos…!», gritado al salir corriendo" },
  { id: "voz-club", src: a("vt29"), desde: 31.1, en: 210, dur: 195, reason: "«…el club de hablar y de resolver problemas»" },
  { id: "voz-mascota", src: a("vt18"), desde: 26.3, en: 405, dur: 183, reason: "La pregunta de la mascota (sigue sonando sobre la que escucha desde f522)" },
  { id: "voz-conejo-ave", src: a("vt18"), desde: 34.25, en: 588, dur: 111, entra: 2, reason: "«¡Un conejo!» y la pregunta del ave, de corrido como la imagen" },
  { id: "voz-colibri", src: a("vt18"), desde: 44.25, en: 699, dur: 66, entra: 2, reason: "«Un colibrí»" },
  { id: "voz-regalo-p", src: a("vt03"), desde: 0, en: 765, dur: 96, reason: "La pregunta del regalo (pico −3 dB: 11 dB por encima de la respuesta)" },
  { id: "voz-regalo-r", src: a("vt03"), desde: 3.2, en: 861, dur: 31, reason: "«La Navidad.», con su ganancia" },
  { id: "voz-cualidad", src: a("hz04"), desde: 0, en: 892, dur: 60, reason: "«¿Cuál es la cualidad más bonita de Dios?» (pico −3 dB)" },
  { id: "voz-palabra", src: a("hz04"), desde: 2.0, en: 952, dur: 46, reason: "«La palabra de Dios.», en la misma toma, con su ganancia (pico −10 dB)" },
  { id: "voz-bondadoso", src: a("hz04"), desde: 7.55, en: 998, dur: 42, reason: "«¡Bondadoso!»" },
  { id: "voz-inmortal", src: a("hz04"), desde: 11.0, en: 1040, dur: 66, reason: "«¡Un Dios inmortal!»" },
  { id: "voz-oportunidades", src: a("hz07"), desde: 0.12, en: 1106, dur: 83, sale: 2, reason: "«Y para mí es un Dios de oportunidades»: acaba en el valle de 2,88 s, antes de «porque…»" },
  { id: "voz-lema", src: a("hz09"), desde: 0.75, en: 1189, dur: 81, reason: "El lema a coro" },
  { id: "voz-feliz", src: a("vt23"), desde: 0.2, en: 1270, dur: 58, reason: "«¡Feliz Navidad para todos!»" },
];
