/**
 * UNA SOLA FUENTE (pedido del usuario, 2026-11-10): todo va en la Montserrat de base; NINGÚN trozo lleva `estilo: "acento"` (la Playfair itálica). La puerta (2f) falla si vuelve a aparecer uno.
 *
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 089 — `BloqueEditorial[]`. GENERADO por `proyectos/088/herramientas/armar-subtitulos.mjs 089` y corregido a mano.
 *
 * Todo lo que se dice, en trozos de una a cinco palabras (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps. El texto sale del guion marcado
 * (`proyectos/089/voz/*.txt`: lo que se OYE) y los tiempos, de la voz: cada línea llevada al arranque de su palabra sobre la voz SOLA (R31). Cada línea entra 0-3 f ANTES de su palabra.
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la casa de lejos): el primer subtítulo entra con la primera palabra del hook. El cierre lleva el LOGO,
 * que es una imagen (`LogoCierre` en `Recorrido089.tsx`) y no un bloque de texto.
 *
 * NO HAY CIFRAS EN PANTALLA de más de lo que dice Isabella (los 554 m², los 3.816 m² del lote y el precio van al caption y a la versión con ficha).
 *
 * POR CONFIRMAR AL OÍDO (R31; la puerta con `--final` falla SOLO por ellas):
 *   · «ayudara» (HK01, 2,1 s del vídeo final aprox.): subjuntivo, lo correcto tras «Y si…»; whisper oyó «ayudará» en las tres pasadas y las sílabas no distinguen la tónica.
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_089 } from "./metraje-089";

/** LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las demás piezas del canal (el 017 lo pidió así): los px que se le restan a las líneas de acento. Aquí no hay acentos; la constante la exige la puerta y la composición. */
export const ACENTO_MENOS_089 = 8;

export const subtitulos089: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK01): entra a corte en el f98, primera palabra en el f110.1 ──
  { id: "h01", hasta: 137, trozos: [{ desde: 110, texto: "Y si tu casa" }, { desde: 125, texto: "también" }] },
  { id: "h02", hasta: 181, trozos: [{ desde: 137, texto: "te ayudara" }, { desde: 148, texto: "a bajar el ritmo." }] },
  // ── Bloque 4 · la mitad DICHA (MD01): entra a corte en el f311, primera palabra en el f323.1 ──
  { id: "m01", hasta: 363, trozos: [{ desde: 323, texto: "Los grandes" }, { desde: 333, texto: "ventanales," }] },
  {
    id: "m02",
    hasta: 422,
    trozos: [
      { desde: 364, texto: "el deck panorámico" },
      { desde: 393, texto: "y el patio interior" },
    ],
  },
  {
    id: "m03",
    hasta: 510,
    trozos: [
      { desde: 422, texto: "acercan la naturaleza" },
      { desde: 464, texto: "a cada momento" },
      { desde: 485, texto: "del día." },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (el cierre es el logo, no un bloque de texto) (CT01): entra a corte en el f1032, primera palabra en el f1043.7 ──
  {
    id: "c01",
    hasta: 1097,
    trozos: [
      { desde: 1044, texto: "Conoce" },
      { desde: 1057, texto: "cómo se vive" },
      { desde: 1079, texto: "aquí." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos089Srt = segmentosDe(subtitulos089, FPS_089);
