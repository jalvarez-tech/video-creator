/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 023 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con un acento por bloque como mucho (skill `recorrido-luxur`,
 * `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps. El texto sale del guion marcado (`proyectos/023/voz/*.txt`: lo
 * escribo yo, que whisper oye «contacta nos» donde se dijo «contáctanos») y los tiempos, de la voz (`trozos-editoriales.mjs --audio`, con el `--en`, el
 * `--desde` y el `--s0` de cada toma); después se llevan a su palabra con `lineas-vs-onsets.py` (R31).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PIEZA ABRE CON ISABELLA (como la V6, por encargo del usuario) y su primer subtítulo
 * entra en el f7, con su voz: rompe a propósito la regla fija «la primera toma sale sin texto ni voz» (declarado en la puerta: `ABRE_CON_EL_HOOK`). El cierre
 * lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido023.tsx`) y no un bloque de texto.
 *
 * PALABRAS CERRADAS POR MEDIDA, SIN OÍR (R31; dicen el segundo exacto para que se compruebe al oído antes de publicar):
 *
 *   «agendemos» (CT2, f1076, 3,06-3,56 s de la toma = 35,9 s del vídeo): whisper la oye «agendemos» (conf. 0,21) y «ajendemos» desde 3 cortes; `formantes.py` sobre su vocal tónica
 *   («agen-DE-mos», 3,355-3,41 s) da F1 ≈ 605-630 Hz y F2 ≈ 2.025-2.370 Hz: una [e] (la /a/ de Isabella: F1 ≈ 725-780, F2 ≈ 1.440-1.600), no «agendamos».
 *   «balcón» (MD3, f604, 3,21-3,44 s de la toma = 20,1 s del vídeo): conf. 0,17 en el DTW, pero 4 de 5 cortes (3,05-3,30 s) oyen «Balcón» y el sentido de la frase la fija.
 *   «contáctanos» (CT2, f1041): whisper la parte en «contacta nos»; se pintó junta (el guion).
 *
 * TIEMPOS: el DTW de whisper iba entre 0,2 y 0,4 s PRONTO o TARDE en cuatro líneas («o considerar», «renta corta,», «y ubicación», «contáctanos»); se llevaron a su palabra con la
 * energía de la voz sola (`onsets-voz.py`: silencio de −45/−60 dB antes de cada una) y los cortes de `palabras-desde.py` solo para la identidad (`lineas-vs-onsets.py`).
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_023 } from "./metraje-023";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las seis versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la
 * composición (1080×1920) que se le restan a las líneas de acento, de 99 px a 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas
 * siguen como estaban.
 */
export const ACENTO_MENOS_023 = 8;

export const subtitulos023: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK3): ABRE la pieza: su imagen es opaca desde el f0 y la primera palabra suena en el f6,6 (el hook va sin música) ──
  {
    id: "h01",
    hasta: 54,
    trozos: [
      { desde: 7, texto: "Si quieres" },
      { desde: 14, texto: "un apartamento" },
      { desde: 33, texto: "para vivir" },
    ],
  },
  {
    id: "h02",
    hasta: 115,
    trozos: [
      { desde: 57, texto: "o considerar para" },
      { desde: 89, texto: "renta corta,", estilo: "acento" },
    ],
  },
  { id: "h03", hasta: 147, trozos: [{ desde: 120, texto: "mira esto." }] },
  // ── Bloque 4 · la mitad DICHA (MD3): imagen opaca desde el f523, primera palabra en el f541 ──
  {
    id: "m01",
    hasta: 602,
    trozos: [
      { desde: 541, texto: "Cuenta con" },
      { desde: 552, texto: "dos habitaciones" },
      { desde: 568, texto: "independientes,", estilo: "acento" },
    ],
  },
  {
    id: "m02",
    hasta: 672,
    trozos: [
      { desde: 604, texto: "balcón" },
      { desde: 612, texto: "y ubicación junto a" },
      { desde: 653, texto: "City Plaza.", estilo: "acento" },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT2): imagen opaca desde el f996, primera palabra en el f1013 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 1038,
    trozos: [
      { desde: 1013, texto: "Si te gusta" },
      { desde: 1024, texto: "esta vista,", estilo: "acento" },
    ],
  },
  {
    id: "c02",
    hasta: 1120,
    trozos: [
      { desde: 1041, texto: "contáctanos" },
      { desde: 1076, texto: "y agendemos" },
      { desde: 1090, texto: "una visita.", estilo: "acento" },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos023Srt = segmentosDe(subtitulos023, FPS_023);
