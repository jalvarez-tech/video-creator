/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 034 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con un acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/034/voz/*.txt`: lo escribo yo con lo que se OYE, comprobado por cortes) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31: en el 030 iba 3-16 f tarde a mitad de frase). Cada línea entra 0-2 f ANTES de su palabra.
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (el lote desde el aire, DR98): el primer subtítulo entra en el f107, con la voz de Isabella, 7 f
 * después de que su imagen aparezca (f100). El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido034.tsx`) y no un bloque de texto. NINGUNA cifra en la pieza.
 *
 * LOS ACENTOS, uno por bloque y ≥ 2 s entre dos: «naturaleza» (el anhelo del hook: el ángulo de la pieza), «acabas de encontrarlo.» (la búsqueda que se cierra) y «Y agendemos» (la acción). El CTA es una
 * frase recortada que empieza por «y» (lo que se oye): se escribe «Y» porque abre el bloque.
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + s·30 − desde·30):
 *   hook (en 100, desde 11 f)  «Si» 0,625 s · «propiedad» 1,235 · «donde» 2,19 · «naturaleza» 2,68 (tras un valle a −80 dB) · «sea» 3,42 · «de tu casa» 3,81 · «vente» 4,745
 *   mitad (en 497, desde 7 f)  «Si» 0,505 · «buscando» 1,385 · «para» 2,115 · «acabas» 3,56 (tras la pausa de 3,32-3,54 s)
 *   CTA (en 841, desde 50 f)   «y» 1,945 · «una» 2,335
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ella):
 *   · «vente, te muestro.» (HK03, «te» hacia el f239 = 7,95 s del vídeo): whisper oye «vente muestro», «vente maestro», «veinte muestros»: la «te» de «te muestro» se pega a la de «vente» (como en el HK06 de la
 *     V15). Entre 4,745 y 5,44 s hay cuatro arranques de sílaba (4,745 · 4,985 · 5,095 y la «tro»): «ven-te-mues-tro». Se pinta «te muestro» (lo que dice la frase) y se oye antes de publicar.
 *   · «acabas de encontrarlo.» (MD03, f596 = 19,9 s): whisper oye «acabas» desde 2,24, 2,36 y 3,64 s y «acabo»/«acaba» desde 2,50, 3,04 y 3,52 s. MEDIDO (sibilantes.py,
 *     2026-10-09): entre «aca-ba» y «de» (3,84-3,96 s) la banda de 4-9 kHz no pasa de −63 dB, cuando las /s/ de «llevas» y «meses» suben a −39…−51: la /s/ suena débil o
 *     no suena (suena casi «acaba de»). Se pinta «acabas» (la concordancia con «llevas») y se oye antes de publicar.
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_034 } from "./metraje-034";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_034 = 8;

export const subtitulos034: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK03): imagen desde el f100, primera palabra en el f107,8 ──
  {
    id: "h01",
    hasta: 154,
    trozos: [
      { desde: 107, texto: "Si quieres una" },
      { desde: 125, texto: "propiedad campestre" },
    ],
  },
  {
    id: "h02",
    hasta: 190,
    trozos: [
      { desde: 154, texto: "donde la" },
      { desde: 168, texto: "naturaleza", estilo: "acento" },
    ],
  },
  {
    id: "h03",
    hasta: 230,
    trozos: [
      { desde: 190, texto: "sea parte" },
      { desde: 202, texto: "de tu casa," },
    ],
  },
  {
    id: "h04",
    hasta: 255,
    trozos: [{ desde: 230, texto: "vente, te muestro." }],
  },
  // ── Bloque 4 · la mitad DICHA (MD03): imagen desde el f497, primera palabra en el f505,2 ──
  {
    id: "m01",
    hasta: 552,
    trozos: [
      { desde: 504, texto: "Si llevas meses" },
      { desde: 530, texto: "buscando tu lugar" },
    ],
  },
  {
    id: "m02",
    hasta: 595,
    trozos: [{ desde: 552, texto: "para tu casa campestre," }],
  },
  {
    id: "m03",
    hasta: 630,
    trozos: [{ desde: 595, texto: "acabas de encontrarlo.", estilo: "acento" }],
  },
  // ── Bloque 6 · el CTA DICHO (CT03 recortado): imagen desde el f841, primera palabra en el f849,4 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 888,
    trozos: [
      { desde: 848, texto: "Y agendemos", estilo: "acento" },
      { desde: 860, texto: "una visita." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos034Srt = segmentosDe(subtitulos034, FPS_034);
