/**
 * UNA SOLA FUENTE (pedido del usuario, 2026-11-10): todo va en la Montserrat de base; NINGÚN trozo lleva `estilo: "acento"` (la Playfair itálica). La puerta (2f) falla si vuelve a aparecer uno.
 *
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 090 — `BloqueEditorial[]`. GENERADO por `proyectos/088/herramientas/armar-subtitulos.mjs 090` y corregido a mano.
 *
 * Todo lo que se dice, en trozos de una a cinco palabras (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps. El texto sale del guion marcado
 * (`proyectos/090/voz/*.txt`: lo que se OYE) y los tiempos, de la voz: cada línea llevada al arranque de su palabra sobre la voz SOLA (R31). Cada línea entra 0-3 f ANTES de su palabra.
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la casa de lejos): el primer subtítulo entra con la primera palabra del hook. El cierre lleva el LOGO,
 * que es una imagen (`LogoCierre` en `Recorrido090.tsx`) y no un bloque de texto.
 *
 * NO HAY CIFRAS EN PANTALLA de más de lo que dice Isabella (los 554 m², los 3.816 m² del lote y el precio van al caption y a la versión con ficha).
 *
 * POR CONFIRMAR AL OÍDO (R31; la puerta con `--final` falla SOLO por ellas):
 *   · «patio» (MD03, ≈ 14,5 s del vídeo final): whisper oyó «paseo» («un jacuzzi con un paseo abierto al cielo»); por la ficha es casi seguro «patio abierto al cielo» y el guion lo escribe así.
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_090 } from "./metraje-090";

/** LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las demás piezas del canal (el 017 lo pidió así): los px que se le restan a las líneas de acento. Aquí no hay acentos; la constante la exige la puerta y la composición. */
export const ACENTO_MENOS_090 = 8;

export const subtitulos090: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK03): entra a corte en el f98, primera palabra en el f109.8 ──
  { id: "h01", hasta: 148, trozos: [{ desde: 110, texto: "Tu momento favorito" }, { desde: 135, texto: "del día" }] },
  { id: "h02", hasta: 188, trozos: [{ desde: 148, texto: "puede estar" }, { desde: 167, texto: "en casa." }] },
  // ── Bloque 4 · la mitad DICHA (MD03): entra a corte en el f322, primera palabra en el f333.7 ──
  { id: "m01", hasta: 375, trozos: [{ desde: 334, texto: "Un jacuzzi" }, { desde: 353, texto: "en un patio" }] },
  {
    id: "m02",
    hasta: 423,
    trozos: [
      { desde: 375, texto: "abierto al cielo" },
      { desde: 395, texto: "y una terraza" },
    ],
  },
  {
    id: "m03",
    hasta: 490,
    trozos: [
      { desde: 423, texto: "con vistas panorámicas" },
      { desde: 456, texto: "a las montañas." },
    ],
  },
  {
    id: "m04",
    hasta: 591,
    trozos: [
      { desde: 490, texto: "Combinan dos espacios" },
      { desde: 531, texto: "perfectos para" },
      { desde: 558, texto: "desconectarte." },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (el cierre es el logo, no un bloque de texto) (CT03): entra a corte en el f1103, primera palabra en el f1115.4 ──
  {
    id: "c01",
    hasta: 1163,
    trozos: [
      { desde: 1115, texto: "Conoce" },
      { desde: 1125, texto: "la experiencia" },
      { desde: 1142, texto: "completa." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos090Srt = segmentosDe(subtitulos090, FPS_090);
