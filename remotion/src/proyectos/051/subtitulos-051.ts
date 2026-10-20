/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 051 — `BloqueEditorial[]`.
 *
 * TODO lo que suena (el hook de Isabella y la locución en off), en trozos de una a cuatro palabras, con UN acento por bloque como mucho y ≥ 2 s entre dos (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS
 * de la composición, a 30 fps. SIN CIFRAS EN PANTALLA (reparto 051-053 §2): «113 metros» se pinta en letra («ciento trece metros») y se alinea con lo que suena (`{de 113 metros,}` en `proyectos/051/voz/off.txt`).
 *
 * El texto sale del guion marcado (`proyectos/051/voz/off.txt`) y los tiempos, de la voz por palabra (`transcribir.mjs --palabras` sobre `off.wav` + `trozos-editoriales.mjs --audio`). El HOOK está a mano: son dos tomas del mismo
 * clip y sus tiempos son los arranques MEDIDOS sobre la voz sola (`onsets-voz.py` y el perfil de 20 ms): «Deseas» 24,74 s · «arrendar» 26,38 s · «en» ≈ 27,6 s · «Ven» 28,68 s · «te» 28,98 s de HK05 (frame = en + round(s·30) − round(desde·30)).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PIEZA ABRE CON ISABELLA (réplica del original: excepción declarada en la puerta, `ABRE_CON_EL_HOOK`): el primer subtítulo entra en el f6, un frame antes de su
 * primera palabra y con su imagen ya opaca (a corte en el f0). El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido051.tsx`) y no un bloque de texto.
 *
 * ⚠️ PROVISIONAL HASTA TENER LA LOCUCIÓN: los bloques `o01…o22` están alineados a la VOZ GUÍA de macOS (`off.wav`, ver `audio-051.ts`), no a la voz de verdad. Al sustituirla se repite
 * `node manuales/edicion-video/scripts/transcribir.mjs …/off.wav proyectos/051/voz/off.json es --palabras` y `trozos-editoriales.mjs` y se llevan las líneas a sus palabras (R31).
 *
 * POR CONFIRMAR AL OÍDO (R31; la puerta con `--final` falla SOLO por esto y por `VOZ_GUIA`):
 *   · «arrendar amoblado en Medellín?» (HK05, «amoblado» hacia los 26,9-27,3 s de la fuente = 1,5 s del vídeo): la «a» se pega a «arrendar» y whisper oyó «amulado», «a Moldova», «a mi lado», «movilado» y «a mi lado al Medellín» según la pasada. El
 *     original lo subtitula «amoblado» (y la locución del 02 y el 03 dicen «amoblado» en otras frases): se pinta «amoblado» y se oye antes de publicar. Una palabra que cambia lo que se ofrece.
 *   · «Ven, te muestro.»: whisper oyó «20 muestros» y «ven te muestro» según la pasada; el original dice «ven te muestro». Se pinta así.
 */
import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_051 } from "./metraje-051";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a 91 px. Es de ESTA
 * pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_051 = 8;

export const subtitulos051: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK05, dos planos): imagen opaca en el f0, primera palabra en el f7 ──
  { id: "h01", hasta: 33, trozos: [{ desde: 6, texto: "¿Deseas" }] },
  {
    id: "h02",
    hasta: 100,
    trozos: [
      { desde: 37, texto: "arrendar amoblado" },
      { desde: 73, texto: "en Medellín?" },
    ],
  },
  {
    id: "h03",
    hasta: 143,
    trozos: [
      { desde: 106, texto: "Ven," },
      { desde: 115, texto: "te muestro.", estilo: "acento" },
    ],
  },
  // ── Bloque 3 · la locución (alineada a la voz guía: ver arriba) ──
  { id: "o01", hasta: 201, trozos: [{ desde: 144, texto: "Este espectacular" }, { desde: 177, texto: "apartamento" }] },
  {
    id: "o02",
    hasta: 301,
    trozos: [
      { desde: 201, texto: "de ciento trece metros," },
      { desde: 253, texto: "ubicado en" },
      { desde: 274, texto: "Las Palmas,", estilo: "acento" },
    ],
  },
  {
    id: "o03",
    hasta: 389,
    trozos: [
      { desde: 306, texto: "combina amplitud," },
      { desde: 347, texto: "comodidad y" },
      { desde: 369, texto: "naturaleza", estilo: "acento" },
    ],
  },
  { id: "o04", hasta: 430, trozos: [{ desde: 389, texto: "en un solo lugar." }] },
  {
    id: "o05",
    hasta: 505,
    trozos: [
      { desde: 456, texto: "Cuenta con" },
      { desde: 469, texto: "dos habitaciones,", estilo: "acento" },
    ],
  },
  {
    id: "o06",
    hasta: 581,
    trozos: [
      { desde: 507, texto: "dos baños," },
      { desde: 535, texto: "una amplia sala comedor," },
    ],
  },
  {
    id: "o07",
    hasta: 674,
    trozos: [
      { desde: 581, texto: "cocina integral" },
      { desde: 602, texto: "y zona de ropas" },
      { desde: 629, texto: "con lavadora y secadora." },
    ],
  },
  {
    id: "o08",
    hasta: 779,
    trozos: [
      { desde: 681, texto: "Y uno de sus" },
      { desde: 701, texto: "mayores diferenciales" },
      { desde: 748, texto: "está aquí:" },
    ],
  },
  {
    id: "o09",
    hasta: 848,
    trozos: [
      { desde: 780, texto: "un balcón con" },
      { desde: 805, texto: "jacuzzi privado,", estilo: "acento" },
    ],
  },
  { id: "o10", hasta: 910, trozos: [{ desde: 850, texto: "perfecto para" }, { desde: 875, texto: "relajarte," }] },
  {
    id: "o11",
    hasta: 981,
    trozos: [
      { desde: 912, texto: "disfrutar una copa" },
      { desde: 951, texto: "de vino o simplemente" },
    ],
  },
  {
    id: "o12",
    hasta: 1072,
    trozos: [
      { desde: 981, texto: "regalarte un momento" },
      { desde: 1031, texto: "de tranquilidad.", estilo: "acento" },
    ],
  },
  {
    id: "o13",
    hasta: 1261,
    trozos: [
      { desde: 1188, texto: "Además, el proyecto cuenta con" },
      { desde: 1241, texto: "piscina,", estilo: "acento" },
    ],
  },
  { id: "o14", hasta: 1319, trozos: [{ desde: 1261, texto: "gimnasio," }, { desde: 1288, texto: "zonas húmedas," }] },
  {
    id: "o15",
    hasta: 1374,
    trozos: [
      { desde: 1319, texto: "coworking," },
      { desde: 1344, texto: "cancha de squash," },
    ],
  },
  {
    id: "o16",
    hasta: 1429,
    trozos: [
      { desde: 1377, texto: "Spa Romano," },
      { desde: 1405, texto: "zona de barbecue" },
    ],
  },
  {
    id: "o17",
    hasta: 1481,
    trozos: [
      { desde: 1429, texto: "y muchos espacios" },
      { desde: 1454, texto: "de bienestar.", estilo: "acento" },
    ],
  },
  {
    id: "o18",
    hasta: 1625,
    trozos: [
      { desde: 1578, texto: "Todo esto en" },
      { desde: 1595, texto: "Las Palmas,", estilo: "acento" },
    ],
  },
  {
    id: "o19",
    hasta: 1734,
    trozos: [
      { desde: 1628, texto: "uno de los sectores" },
      { desde: 1661, texto: "más privilegiados", estilo: "acento" },
      { desde: 1699, texto: "de Medellín." },
    ],
  },
  {
    id: "o20",
    hasta: 1830,
    trozos: [
      { desde: 1785, texto: "Escríbeme,", estilo: "acento" },
      { desde: 1807, texto: "agenda tu visita" },
    ],
  },
  { id: "o21", hasta: 1859, trozos: [{ desde: 1830, texto: "y descubre" }, { desde: 1844, texto: "lo que es vivir" }] },
  {
    id: "o22",
    hasta: 1910,
    trozos: [
      { desde: 1859, texto: "con tu propio" },
      { desde: 1877, texto: "jacuzzi privado.", estilo: "acento" },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos051Srt = segmentosDe(subtitulos051, FPS_051);
