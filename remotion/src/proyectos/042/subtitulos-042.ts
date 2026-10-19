/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 042 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/042/voz/*.txt`: lo escribo yo con lo que se OYE, comprobado por cortes) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31). Cada línea entra 0-3 f ANTES de su palabra (la primera de cada toma, en el frame en que su imagen ya es opaca).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la apertura, DR206): el primer subtítulo entra en el f75, con la imagen de Isabella, 2,25 f antes de
 * su primera sílaba. El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido042.tsx`) y no un bloque de texto. NINGUNA cifra en la pieza.
 *
 * EL ACENTO MARCA EL HALLAZGO (el ángulo de la pieza): «Encontré» (el hook), «acabas de encontrarlo.» (la mitad) y «escríbeme» (la acción del CTA). Solo hay uno por bloque y entre dos hay ≥ 2 s:
 * f75 · f600 · f948.
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 75, desde 0)     «Encontré» 0,075 · «un lote» 0,595 · «donde» 1,065 · «privacidad» 1,985 · «naturaleza» 2,770 · «y dos accesos» 3,655 · «y está» 4,635 · «El Carmen» 5,290
 *   mitad (en 509, desde 15 f)  «Si llevas» 0,505 · «buscando» 1,385 · «para tu casa» 2,115 · «acabas» 3,560
 *   CTA (en 901, desde 13 f)  «Si tienes» 0,470 · «en mente» 1,165 · «escríbeme» 2,030 · «y hablamos» 2,970 · «sobre este lote» 3,500
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ella):
 *   · «Encontré» (HK01, f77 = 2,6 s del vídeo): whisper oye «Encontro»; el «-tré» final suena cerrado o abierto según el corte. Se pinta «Encontré» (lo que dice la frase en el registro y la persona que habla).
 *   · «y dos accesos» (HK01, f185 = 6,2 s): whisper oye «y dos accesos, y está»; la «y» suena pegada a «naturaleza». Se pinta «y dos accesos,».
 *   · «acabas» (MD03, f600 = 20,0 s): whisper duda («acabas», «acaba», «acabo»); en la banda de las /s/ casi no hay fricativa: suena casi «acaba de». Es la misma toma de la V18 (034). Se pinta «acabas».
 *   · «escríbeme» (CT04, f948 = 31,6 s): es la misma toma de la V15 y todas sus palabras tienen confianza ≥ 0,6: no hay duda real; se anota por ser la acción de la pieza.
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_042 } from "./metraje-042";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_042 = 8;

export const subtitulos042: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK01): imagen desde el f75, primera sílaba en el f77,25 ──
  {
    id: "h01",
    hasta: 134,
    trozos: [
      { desde: 75, texto: "Encontré", estilo: "acento" },
      { desde: 92, texto: "un lote" },
      { desde: 106, texto: "donde puedes tener" },
    ],
  },
  {
    id: "h02",
    hasta: 184,
    trozos: [
      { desde: 134, texto: "privacidad," },
      { desde: 157, texto: "naturaleza" },
    ],
  },
  { id: "h03", hasta: 213, trozos: [{ desde: 184, texto: "y dos accesos," }] },
  {
    id: "h04",
    hasta: 262,
    trozos: [
      { desde: 213, texto: "y está en" },
      { desde: 233, texto: "El Carmen de Viboral." },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD03): imagen opaca desde el f509, primera palabra en el f509,6 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "m01",
    hasta: 556,
    trozos: [
      { desde: 509, texto: "Si llevas meses" },
      { desde: 535, texto: "buscando tu lugar" },
    ],
  },
  { id: "m02", hasta: 600, trozos: [{ desde: 556, texto: "para tu casa campestre," }] },
  { id: "m03", hasta: 634, trozos: [{ desde: 600, texto: "acabas de encontrarlo.", estilo: "acento" }] },
  // ── Bloque 6 · el CTA DICHO (CT04): imagen opaca desde el f901, primera palabra en el f902,1 ──
  {
    id: "c01",
    hasta: 976,
    trozos: [
      { desde: 901, texto: "Si tienes un proyecto" },
      { desde: 922, texto: "en mente," },
      { desde: 948, texto: "escríbeme", estilo: "acento" },
    ],
  },
  {
    id: "c02",
    hasta: 1010,
    trozos: [
      { desde: 976, texto: "y hablamos más" },
      { desde: 992, texto: "sobre este lote." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos042Srt = segmentosDe(subtitulos042, FPS_042);
