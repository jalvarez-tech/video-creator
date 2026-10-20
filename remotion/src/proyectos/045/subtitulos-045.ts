/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 045 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/045/voz/*.txt`: lo escribo yo con lo que se OYE) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (perfil de energía de 20-25 ms con `perfil-voz.py`, `onsets-voz.py` y `palabras-desde.py`), NO al DTW de whisper (R31): en esta toma el DTW iba hasta 0,5 s tarde (en CT01 pone «contáctanos» en 3,92 s y la energía dice 3,62 s; en
 * MD01 pone «y aprovecharás» a los 2,74 s y arranca a los 3,04) y `trozos-editoriales.mjs` imprime esos tiempos; los de abajo son los corregidos. Cada línea entra 1 f ANTES de su palabra.
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la apertura, RC01): el primer subtítulo entra en el f120, con la voz de Isabella, 9 f después
 * de que su imagen sea opaca (f111). El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido045.tsx`) y no un bloque de texto. NINGUNA cifra en la pieza.
 *
 * EL ACENTO MARCA LO QUE EL TIEMPO GANA (uno por bloque, ≥ 2 s entre dos):
 *   «más valioso»     el hook: de lo que se habla (el tiempo, lo más valioso) (f150).
 *   «aseo semanal.»   el hook: lo que lo gana (el servicio incluido) (f271).
 *   «todo ordenado»   la mitad: lo que se encuentra al volver (f673).
 *   «eres mejor.»     la mitad: para qué es el tiempo (f740).
 *   «contáctanos.»    el CTA: la única acción (f1211).
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 111, desde 15 f)   «El» 0,83 s · «más» 1,85 (tras la pausa de 1,75-1,82) · «de los seres» 2,82 (tras la pausa de 2,75-2,80) · «y te ayudamos» 3,80 (tras la pausa de 3,62-3,77) · «incluyendo» 5,18
 *                               (tras la pausa de 5,10-5,15) · «aseo» ≈ 5,87 («un» 5,78) · «semanal» 6,04
 *   mitad (en 623, desde 9 f)   «De» 0,62 s · «todo» 1,99-2,00 (tras la pausa de 1,80-1,98) · «y aprovecharás» 3,04 (tras la pausa de 2,96-3,03) · «en lo que» 3,81 · «eres» 4,235 (tras la pausa de 4,17-4,21)
 *   CTA (en 1114, desde 11 f)   «Si» 0,70 s · «acompañamiento» 1,09 · «durante» 2,26 · «contáctanos» 3,62 (tras «estancia»; 4 sílabas: 3,62 · 3,90 · 4,06 · 4,30)
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ella):
 *   · «aseo semanal» (HK01, «aseo» hacia el f272 = 9,1 s del vídeo): whisper oye «un asedio semanal» desde 5,78 s y «hace dos semanas» desde 5,90; el catálogo y la frase de las otras dos tomas hermanas (HK02: «incluyéndote un
 *     aseo semanal») dicen «aseo». Se pinta «aseo semanal.» (lo que dice el catálogo); la confianza de whisper en «aseo» es 0,37.
 *   · «todo ordenado» (MD01, «todo» hacia el f673 = 22,4 s): la «t» sale tras 180 ms de silencio (1,80-1,98 s) y whisper oye «rastor de nada» / «de nada» desde 1,68 y 2,34 s; el catálogo dice «todo ordenado». Confianza de «todo»: 0,30.
 *   · «toda tu estancia» (CT01, «tu» hacia el f1189 = 39,6 s): whisper oye «toda la testancia», «toda esta ancha», «a tu distancia» y «de esta ansia» según desde dónde corte; el catálogo dice «durante toda tu estancia». Confianza de «tu»: 0,43.
 *   · «contáctanos.» (CT01, f1211 = 40,4 s): la última sílaba («-nos») se alarga hasta 4,52 s y whisper la oye «contactanos», «contactanus», «contactan» y confianza 0,38. El catálogo dice «contáctanos»: se pinta eso.
 *     MEDIDO con `formantes.py` (2026-10-19): la cola de 4,30-4,52 s tiene una vocal abierta fronteada (F1 ≈ 720, F2 ≈ 1.860), una nasal, otra vocal (F1 ≈ 690, F2 ≈ 1.720), una nasal y una [e]; no hay una [o] limpia (F2 ≈ 900) de «-nos». Sin cerrar.
 *   · Medidas del resto (formantes): «tu» de «toda tu estancia» = [u] (F2 ≈ 640-750), no «la»; la primera vocal de «todo» = [o] (F2 ≈ 740-1.500), no la [e] de «de nada»; «aseo», sin concluir (un cierre de 6,015-6,03 s que es la /s/ de «semanal» o la /d/ de «asedio»).
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_045 } from "./metraje-045";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_045 = 8;

export const subtitulos045: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK01): imagen opaca desde el f111, primera palabra en el f121 ──
  {
    id: "h01",
    hasta: 207,
    trozos: [
      { desde: 120, texto: "El tiempo es el activo" },
      { desde: 150, texto: "más valioso", estilo: "acento" },
      { desde: 180, texto: "de los seres humanos" },
    ],
  },
  { id: "h02", hasta: 248, trozos: [{ desde: 209, texto: "y te ayudamos a optimizarlo," }] },
  {
    id: "h03",
    hasta: 304,
    trozos: [
      { desde: 250, texto: "incluyendo un" },
      { desde: 271, texto: "aseo semanal.", estilo: "acento" },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD01): imagen desde el f623, primera palabra en el f633 ──
  {
    id: "m01",
    hasta: 702,
    trozos: [
      { desde: 632, texto: "De esta manera tendrás" },
      { desde: 673, texto: "todo ordenado", estilo: "acento" },
    ],
  },
  {
    id: "m02",
    hasta: 764,
    trozos: [
      { desde: 704, texto: "y aprovecharás el tiempo" },
      { desde: 728, texto: "en lo que" },
      { desde: 740, texto: "eres mejor.", estilo: "acento" },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT01): imagen desde el f1114, primera palabra en el f1124 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 1209,
    trozos: [
      { desde: 1123, texto: "Si quieres un" },
      { desde: 1135, texto: "acompañamiento personalizado" },
      { desde: 1170, texto: "durante toda tu estancia," },
    ],
  },
  { id: "c02", hasta: 1247, trozos: [{ desde: 1211, texto: "contáctanos.", estilo: "acento" }] },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos045Srt = segmentosDe(subtitulos045, FPS_045);
