/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 022 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con un acento por bloque como mucho (skill `recorrido-luxur`,
 * `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps. El texto sale del guion marcado (`proyectos/022/voz/*.txt`: lo
 * escribo yo, que whisper oye «visitación» y «palcón») y los tiempos, de la voz (`trozos-editoriales.mjs --audio`, con el `--en`, el `--desde` y el
 * `--s0` de cada toma); después se llevan a su palabra con `lineas-vs-onsets.py` (R31).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). REVISIÓN 4 (pedido del usuario: «como esta propiedad no tiene dron empecemos directamente con el hook»): la pieza
 * ABRE con Isabella y su primer subtítulo entra en el f11, con su voz: rompe a propósito la regla fija «la primera toma sale sin texto ni voz» (declarado en la puerta: `ABRE_CON_EL_HOOK`). El cierre lleva el
 * LOGO, que es una imagen (`LogoCierre` en `Recorrido022.tsx`) y no un bloque de texto.
 *
 * PALABRAS POR CONFIRMAR AL OÍDO (la puerta `--final` las para mientras estén aquí):
 *
 * POR CONFIRMAR AL OÍDO · «habitación» (m01, MD1; la línea entra en f579 = 19,3 s del vídeo y la palabra suena ≈ 20,0-20,5 s): whisper oye «visitación» desde 4 de 7 cortes (0,50-1,05 s) y «habitación» desde 1,20 s (y
 * con el vocabulario de la propiedad en el prompt); el sentido («cada … tiene su baño y su vestier») la fija como «habitación» y se pintó así.
 * `sibilantes.py` no la cierra: la voz de solapa apenas da energía de /s/ y hay un pico débil a los 1,21-1,25 s.
 *
 * POR CONFIRMAR AL OÍDO · «Escobero» (c01, CT1; la línea entra en f1104 = 36,8 s y la palabra suena ≈ 37,1-37,7 s): la ficha escribe «Loma del Escobero»; whisper oye «Escobero» (con el prompt, conf. 0,57) y
 * «Escobar» desde 1,2 y 1,4 s; `formantes.py` sobre la última vocal (2,0-2,1 s) da F1 ≈ 715-730 y F2 ≈ 1.250-1.375 Hz, más de /a/ que de /o/. Se pintó
 * «Escobero» por la ficha.
 */
import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_022 } from "./metraje-022";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las cinco versiones de Los Patios (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la
 * composición (1080×1920) que se le restan a las líneas de acento, de 99 px a 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas
 * siguen como estaban.
 */
export const ACENTO_MENOS_022 = 8;

export const subtitulos022: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK2): ABRE la pieza (revisión 4, pedido del usuario): su imagen es opaca desde el f0 y la primera palabra suena en el f11 (la música ya ha bajado) ──
  {
    id: "h01",
    hasta: 68,
    trozos: [
      { desde: 11, texto: "Si para ti" },
      { desde: 27, texto: "un apartamento" },
      { desde: 41, texto: "sin balcón,", estilo: "acento" },
    ],
  },
  { id: "h02", hasta: 95, trozos: [{ desde: 68, texto: "no es opción," }] },
  { id: "h03", hasta: 127, trozos: [{ desde: 98, texto: "mira esto." }] },
  // ── Bloque 4 · la mitad DICHA (MD1): imagen opaca desde el f566 (a corte), primera palabra en el f579 ──
  {
    id: "m01",
    hasta: 666,
    trozos: [
      { desde: 579, texto: "Aquí cada habitación" },
      { desde: 614, texto: "tiene su baño" },
      { desde: 635, texto: "y su vestier,", estilo: "acento" },
    ],
  },
  {
    id: "m02",
    hasta: 762,
    trozos: [
      { desde: 666, texto: "además de estar conectada" },
      { desde: 700, texto: "con la zona social" },
      { desde: 725, texto: "y el balcón." },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT1): imagen opaca desde el f1081, primera palabra en el f1089 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 1169,
    trozos: [
      { desde: 1089, texto: "Estamos en la" },
      { desde: 1104, texto: "Loma del Escobero,", estilo: "acento" },
      { desde: 1135, texto: "en Envigado." },
    ],
  },
  {
    id: "c02",
    hasta: 1235,
    trozos: [
      { desde: 1169, texto: "Si quieres más información," },
      { desde: 1212, texto: "contáctame.", estilo: "acento" },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos022Srt = segmentosDe(subtitulos022, FPS_022);
