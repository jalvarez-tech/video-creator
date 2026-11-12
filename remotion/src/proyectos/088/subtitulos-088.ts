/**
 * UNA SOLA FUENTE (pedido del usuario, 2026-11-10): todo va en la Montserrat de base; NINGÚN trozo lleva `estilo: "acento"` (la Playfair itálica). La puerta (2f) falla si vuelve a aparecer uno.
 *
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 088 — `BloqueEditorial[]`. GENERADO por `proyectos/088/herramientas/armar-subtitulos.mjs 088` y corregido a mano.
 *
 * Todo lo que se dice, en trozos de una a cinco palabras (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps. El texto sale del guion marcado
 * (`proyectos/088/voz/*.txt`: lo que se OYE) y los tiempos, de la voz: cada línea llevada al arranque de su palabra sobre la voz SOLA (R31). Cada línea entra 0-3 f ANTES de su palabra.
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la casa de lejos): el primer subtítulo entra con la primera palabra del hook. El cierre lleva el LOGO,
 * que es una imagen (`LogoCierre` en `Recorrido088.tsx`) y no un bloque de texto.
 *
 * NO HAY CIFRAS EN PANTALLA de más de lo que dice Isabella (los 554 m², los 3.816 m² del lote y el precio van al caption y a la versión con ficha).
 *
 * POR CONFIRMAR AL OÍDO (R31; la puerta con `--final` falla SOLO por ellas):
 *   · «empezaran» (HK04, f154 aprox. = 2,0 s del vídeo final): subjuntivo, lo correcto tras «Y si…»; whisper oyó «empezarán» en dos de tres pasadas y las sílabas no distinguen la tónica.
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_088 } from "./metraje-088";

/** LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las demás piezas del canal (el 017 lo pidió así): los px que se le restan a las líneas de acento. Aquí no hay acentos; la constante la exige la puerta y la composición. */
export const ACENTO_MENOS_088 = 8;

export const subtitulos088: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK04): entra a corte en el f84, primera palabra en el f96.3 ──
  { id: "h01", hasta: 134, trozos: [{ desde: 96, texto: "Y si tus mejores" }, { desde: 115, texto: "reuniones" }] },
  { id: "h02", hasta: 182, trozos: [{ desde: 134, texto: "empezaran" }, { desde: 154, texto: "con esta vista." }] },
  // ── Bloque 4 · la mitad DICHA (MD04): entra a corte en el f309, primera palabra en el f320.8 ──
  {
    id: "m01",
    hasta: 386,
    trozos: [
      { desde: 321, texto: "La sala," },
      { desde: 343, texto: "el comedor" },
      { desde: 361, texto: "y la cocina" },
    ],
  },
  { id: "m02", hasta: 425, trozos: [{ desde: 386, texto: "comparten" }, { desde: 404, texto: "un gran ambiente" }] },
  {
    id: "m03",
    hasta: 489,
    trozos: [
      { desde: 425, texto: "conectado con" },
      { desde: 451, texto: "un deck panorámico." },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (el cierre es el logo, no un bloque de texto) (CT04): entra a corte en el f948, primera palabra en el f959.6 ──
  {
    id: "c01",
    hasta: 1009,
    trozos: [
      { desde: 960, texto: "Descubre" },
      { desde: 969, texto: "los detalles" },
      { desde: 987, texto: "de esta propiedad." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos088Srt = segmentosDe(subtitulos088, FPS_088);
