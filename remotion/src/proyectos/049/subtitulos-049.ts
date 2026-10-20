/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 049 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/049/voz/*.txt`: lo escribo yo con lo que se OYE, comprobado por cortes) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31). Cada línea entra 1-2 f ANTES de su palabra (`herramientas/lineas-vs-onsets.py`).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la apertura, RC04): el primer subtítulo entra en el f82, con la voz de Isabella, 11 f después
 * de que su imagen aparezca (f71). El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido049.tsx`) y no un bloque de texto. NINGUNA cifra en la pieza.
 *
 * EL ACENTO MARCA LO QUE SE PROMETE (uno por bloque, ≥ 2 s entre dos):
 *   «la tuya,»         el hook: el dolor, una ciudad que no es la tuya (f113).
 *   «indispensable.»   el hook: lo que vale el acompañamiento (f209).
 *   «amenidades.»      la mitad: la palabra de la pieza (f727).
 *   «contáctanos.»     la acción del CTA (f1300).
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 71, desde 5 f)    «Cuan-» 0,57 s · «que» 1,235 (el render lo confirma: onset a +1,7 f de la línea) · «no» 1,435 · «la» ≈ 1,60 · «el» 2,295 (tras la pausa) · «es» 3,91 · «plus-» 4,245 · «in-» 4,845 (tras la pausa de 4,52-4,84)
 *   mitad (en 652, desde 5 f)  «A-» 0,60 · «cuen-» 1,35 · «di-» 2,16 · «a-» 2,72
 *   CTA (en 1192, desde 6 f)   «Si» 0,60 · «per-» 1,58 · «du-» 2,23 · «con-» 3,87 (tras la pausa de 3,7-3,87)
 *
 * POR CONFIRMAR AL OÍDO (R31; la puerta con `--final` falla SOLO por ellas): whisper-small (sin vocabulario) oyó estas palabras con confianza baja y la frase del catálogo (también de whisper) las da por buenas:
 *   · «la» de «que no es la tuya» (HK03, f114 = 3,8 s del vídeo): confianza 0,68; entre «es» y «tuya» hay una sílaba muy corta (la vocal de «la» pegada a la «a» de «tuya»).
 *   · «esta» de «esta unidad» (MD05, f677 = 22,6 s): confianza 0,59 (también cabría «nuestra»: la sílaba se pega a «más»).
 *   · «durante» (CT01, f1253 = 41,8 s): confianza 0,74; el arranque de la «d» tras «personalizado» no se separa por energía (el valle es de −40 dB, no de −55).
 *   · «tu» de «toda tu estancia» (CT01, f1283 = 42,8 s): confianza 0,43; whisper la oye «la», «esta», «de la»: «toda ‹tu› estancia» es lo que dice la frase del catálogo.
 *   · «contáctanos» (CT01, f1302 = 43,4 s): la sílaba final («-anos», confianza 0,38) podría ser «-enos» («contáctenos»): la vocal de «ta-» y la de «-nos» no se cerraron por formantes.
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_049 } from "./metraje-049";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_049 = 8;

export const subtitulos049: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK03): imagen desde el f71, primera palabra en el f83 ──
  {
    id: "h01",
    hasta: 133,
    trozos: [
      { desde: 82, texto: "Cuando llegas a una ciudad" },
      { desde: 102, texto: "que no es" },
      { desde: 113, texto: "la tuya,", estilo: "acento" },
    ],
  },
  { id: "h02", hasta: 180, trozos: [{ desde: 134, texto: "el acompañamiento personalizado" }] },
  {
    id: "h03",
    hasta: 237,
    trozos: [
      { desde: 181, texto: "es una plusvalía" },
      { desde: 209, texto: "indispensable.", estilo: "acento" },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD05): imagen desde el f652, primera palabra en el f665 ──
  {
    id: "m01",
    hasta: 709,
    trozos: [
      { desde: 664, texto: "Además, esta unidad" },
      { desde: 686, texto: "cuenta con" },
    ],
  },
  {
    id: "m02",
    hasta: 757,
    trozos: [
      { desde: 710, texto: "diferentes tipos de" },
      { desde: 727, texto: "amenidades.", estilo: "acento" },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT01): imagen desde el f1192, primera palabra en el f1204 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 1251,
    trozos: [
      { desde: 1203, texto: "Si quieres un acompañamiento" },
      { desde: 1232, texto: "personalizado" },
    ],
  },
  { id: "c02", hasta: 1299, trozos: [{ desde: 1251, texto: "durante toda tu estancia," }] },
  { id: "c03", hasta: 1325, trozos: [{ desde: 1300, texto: "contáctanos.", estilo: "acento" }] },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos049Srt = segmentosDe(subtitulos049, FPS_049);
