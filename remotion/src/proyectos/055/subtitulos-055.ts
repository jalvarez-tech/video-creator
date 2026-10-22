/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 055 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/055/voz/*.txt`) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola (`onsets-voz.py` + `palabras-desde.py`), no
 * al DTW de whisper (R31). Cada línea entra 0-3 f ANTES de su palabra.
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la aérea, DR70): el primer subtítulo entra en el f99, con la imagen de Isabella ya opaca (entra a corte en
 * el f92). El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido055.tsx`) y no un bloque de texto. NINGUNA cifra en la pieza.
 *
 * EL ACENTO MARCA EL ÁNGULO (las mañanas): «mañanas» y «aire puro» en el hook, «declaración de estilo.» en la mitad y «¡hablemos!» (la acción del CTA). Hay uno por bloque y entre dos hay ≥ 2 s:
 * f115 · f181 (el del aire, 2,2 s después) · f591 · f1114.
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 92, desde 12 f)    «Imagina tus» 0,675 · «mañanas» 1,15 · «en este espacio» 1,66 · «disfrutando del» 2,88 · «aire puro» 3,37 · «del oriente antioqueño» 3,77
 *   mitad (en 542, desde 46 f)  «No es solo una casa» 1,785 · «es una» 2,995 · «declaración de estilo» 3,20
 *   CTA (en 1044, desde 5 f)    «Si estás pensando» 0,425 · «en cambiar» 0,92 · «tu estilo de vida» 1,37 · «¡hablemos!» 2,60
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · «antioqueño» (HK02, f196 = 6,5 s del vídeo): whisper-small oye «entrequeño» (confianza 0,16 en «que») y, cortando la toma en 3,815 s, «Antequeño»; los formantes de la 2.ª y la 3.ª vocal (F2 ≈ 1.850-1.990 Hz,
 *     sin la caída hacia /o/ que pediría «tio») no cierran «tio» frente a «tre». Se pinta «antioqueño»: es el gentilicio de la región y la frase del catálogo.
 *   · «hablemos» (CT03, f1117 = 37,2 s): whisper-small oye «hablimos»; la vocal tras la «l» mide F1 ≈ 380 y F2 ≈ 1.890-2.030 Hz, más cerca de su /e/ de «es-tilo» (F2 ≈ 1.760-1.975) que de su /i/ de «ti-lo»
 *     (F2 ≈ 2.340-2.390): una [e]. Se pinta «hablemos».
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_055 } from "./metraje-055";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_055 = 8;

export const subtitulos055: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK02): imagen opaca desde el f92, primera sílaba en el f100,25 ──
  {
    id: "h01",
    hasta: 160,
    trozos: [
      { desde: 99, texto: "Imagina tus" },
      { desde: 115, texto: "mañanas", estilo: "acento" },
      { desde: 128, texto: "en este espacio," },
    ],
  },
  {
    id: "h02",
    hasta: 232,
    trozos: [
      { desde: 166, texto: "disfrutando del" },
      { desde: 181, texto: "aire puro", estilo: "acento" },
      { desde: 193, texto: "del oriente antioqueño." },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD03): imagen opaca desde el f542, primera sílaba en el f549,55 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "m01",
    hasta: 630,
    trozos: [
      { desde: 549, texto: "No es solo una casa," },
      { desde: 586, texto: "es una" },
      { desde: 591, texto: "declaración de estilo.", estilo: "acento" },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT03): imagen opaca desde el f1044, primera sílaba en el f1051,75 ──
  {
    id: "c01",
    hasta: 1079,
    trozos: [
      { desde: 1051, texto: "Si estás pensando" },
      { desde: 1066, texto: "en cambiar" },
    ],
  },
  {
    id: "c02",
    hasta: 1134,
    trozos: [
      { desde: 1080, texto: "tu estilo de vida," },
      { desde: 1115, texto: "¡hablemos!", estilo: "acento" },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos055Srt = segmentosDe(subtitulos055, FPS_055);
