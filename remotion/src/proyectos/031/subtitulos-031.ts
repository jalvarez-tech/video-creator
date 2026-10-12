/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 031 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con un acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/031/voz/*.txt`: lo escribo yo con lo que se OYE, comprobado por cortes) y los tiempos, de la voz: primero `trozos-editoriales.mjs --audio` (con el `--en`, el `--desde` y el
 * `--s0` de cada toma) y después, línea a línea, el arranque MEDIDO de su palabra sobre la voz sola (`onsets-voz.py` + `palabras-desde.py`), no el DTW de whisper (R31: en el 030 iba 3-16 f tarde a mitad de frase).
 * Cada línea entra 0-2 f ANTES de su palabra.
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (el lote desde el aire, DR108): el primer subtítulo entra en el f105, con la voz de Isabella, 8 f después
 * de que su imagen aparezca (f97). El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido031.tsx`) y no un bloque de texto. NINGUNA cifra en la pieza.
 *
 * LOS ACENTOS, uno por bloque y ≥ 2 s entre dos: «agua y energía» (la tensión del hook: campo, PERO con servicios; los dos datos están en la ficha), «tu casa soñada.» (el deseo de la mitad) y «escríbeme» (la acción).
 * «construir» va en la línea base: la idea de la pieza la repite la mitad («para construir») y un acento en el f115 dejaba el de «agua y energía» a 1,97 s.
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 97, desde 11 f)   «Si» 0,65 s · «rodeado» 1,185 · «pero» 2,71 · «agua» ≈ 2,98 · «disponibles» 3,565 · «vente» ≈ 4,78
 *   mitad (en 502, desde 20 f) «Este» 0,95 · «de lote» 1,50 · «para» 2,71 · «tu casa» 3,37
 *   CTA (en 881, desde 6 f)    «Si» 0,47 · «en mente» ≈ 1,165 · «escríbeme» 2,03 · «y hablamos» 2,97 · «sobre» 3,50
 *
 * POR CONFIRMAR AL OÍDO (R31; las tres frases del hook son lo que whisper oye por CORTES, no lo que traía el registro; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo
 * y la nota se queda; la puerta con `--final` falla SOLO por ella):
 *   · «rodeado de la naturaleza,» (HK06, ≈ 4,1-4,5 s del vídeo; «de la» hacia el f134 = 4,47 s): el registro y whisper con vocabulario dicen «rodeado de naturaleza»; sin vocabulario y en seis cortes desde 1,17 s
 *     whisper oye «de la naturaleza» (y «Roba»/«Roja» por «rodeado», confianza 0,01). Se pinta lo que oyen los cortes.
 *   · «pero con» (HK06, f167 = 5,57 s): no estaba en el registro; desde 2,20, 2,36 y 2,70 s whisper oye «pero con agua» (y «pero es con» desde 2,45 y 2,55). Hay dos sílabas entre la pausa de 2,52 s y «con» (2,885 s).
 *   · «agua y energía» (HK06, «y» hacia el f179 = 5,97 s): whisper oye «agua de energía» desde 2,20 y 2,70 s, y «agua y energía» desde 2,86 s; la ficha dice «energía eléctrica y agua». MEDIDO (formantes.py,
 *     2026-10-09): tras la /a/ de «agua» (F1 ≈ 730, F2 ≈ 1.500 Hz, 3,00-3,08 s) la F2 sube sin pausa a ≈ 2.450 Hz (una vocal anterior débil, 3,09-3,11 s) y la caída de energía llega DESPUÉS, antes de la
 *     nasal de «energía»; con «de» habría una consonante ([ð]) entre la /a/ y la /e/. Encaja con «y».
 *   · «vente, te muestro.» (HK06, «te» hacia el f236 = 7,87 s): whisper oye «vente muestro», «Bente muestro», «20 muestros»: la «te» de «te muestro» se pega a la de «vente». MEDIDO: entre 4,74 y 5,45 s
 *     hay cuatro arranques de sílaba (4,74 · 4,975 · 5,11 · 5,345, con el cierre de la «st» en 5,24-5,32): «ven-te-mues-tro»; las dos «te» suenan fundidas en una sílaba de 135 ms. Se pinta «te muestro» (lo que
 *     dice la frase) y se oye antes de publicar.
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_031 } from "./metraje-031";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_031 = 8;

export const subtitulos031: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK06): imagen desde el f97, primera palabra en el f106 ──
  {
    id: "h01",
    hasta: 166,
    trozos: [
      { desde: 105, texto: "Si quieres construir" },
      { desde: 121, texto: "rodeado de la naturaleza," },
    ],
  },
  {
    id: "h02",
    hasta: 228,
    trozos: [
      { desde: 166, texto: "pero con" },
      { desde: 174, texto: "agua y energía", estilo: "acento" },
      { desde: 192, texto: "disponibles," },
    ],
  },
  {
    id: "h03",
    hasta: 253,
    trozos: [{ desde: 228, texto: "vente, te muestro." }],
  },
  // ── Bloque 4 · la mitad DICHA (MD04): imagen desde el f502, primera palabra en el f510 ──
  {
    id: "m01",
    hasta: 562,
    trozos: [
      { desde: 510, texto: "Este es el tipo" },
      { desde: 526, texto: "de lote que compras" },
    ],
  },
  {
    id: "m02",
    hasta: 609,
    trozos: [
      { desde: 562, texto: "para construir" },
      { desde: 582, texto: "tu casa soñada.", estilo: "acento" },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT04): imagen desde el f881, primera palabra en el f889 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 935,
    trozos: [
      { desde: 888, texto: "Si tienes un proyecto" },
      { desde: 908, texto: "en mente," },
    ],
  },
  {
    id: "c02",
    hasta: 998,
    trozos: [
      { desde: 935, texto: "escríbeme", estilo: "acento" },
      { desde: 963, texto: "y hablamos más" },
      { desde: 979, texto: "sobre este lote." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos031Srt = segmentosDe(subtitulos031, FPS_031);
