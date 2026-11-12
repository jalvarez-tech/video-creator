/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 077 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cinco palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/077/voz/*.txt`: lo escribo yo con lo que se OYE, comprobado por cortes aislados) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31). Cada línea entra 0-3 f ANTES de su palabra (la primera de cada toma, en el frame en que su imagen ya es opaca o en que ella empieza a hablar).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la apertura, DR04): el primer subtítulo entra en el f106, con la imagen de Isabella (opaca desde el f90),
 * 1 f antes de su primera sílaba (f107). El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido077.tsx`) y no un bloque de texto.
 *
 * NO HAY CIFRAS EN PANTALLA: las tres frases de Isabella no dicen ninguna (los 28,5 m², el piso 9 y el precio van al caption y a la versión con ficha).
 *
 * LO QUE DICE SU VOZ Y AQUÍ SOLO TIENE TRANSCRIPCIÓN: el hook es una curiosidad, la mitad enuncia un hecho del anuncio (edificio con operación hotelera) y el CTA, una acción; ni ella ni un rótulo hablan de la norma,
 * de valorización ni de rentabilidad. Los acentos son lo que hay que saber («debes saber.»), lo que distingue al edificio («establecida.») y la acción («contáctame.»), uno por toma y con más de 10 s entre dos.
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 90, desde 6 f)    «Antes de invertir en» 0,76 · «Airbnb,» 1,775 · «hay algo que» 2,255 · «debes saber.» 3,225
 *   mitad (en 419, desde 0)    «Descubre una suite» 0,395 · «en un edificio» 1,23 (tras la pausa de 1,06-1,23 s) · «con operación» 2,06 · «hotelera» 2,75 · «establecida.» 3,345 (tras la pausa de 3,3-3,34 s)
 *   CTA (en 793, desde 0)      «Si quieres más» 0,325 · «información,» 0,815 · «contáctame.» 1,49 (tras la pausa de 1,29-1,48 s)
 * El DTW de whisper pone la primera palabra en 0,00 s en las tres tomas (la voz arranca a 0,76 · 0,39 · 0,31 s): lo que vale es la envolvente de la voz sola (arranques de sílaba tras cada pausa, `onsets-voz.py`).
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · «Descubre una suite» (HK05, f430-f455 = 14,3-15,2 s del vídeo): whisper oye «Descubro en EZID» (confianzas 0,31-0,58); «una suite» va tan rápido que se oye «nezit».
 *   · «hotelera» (HK05, f501 = 16,7 s): whisper la oye con confianza 0,51.
 *   · «contáctame» (CT04, f837 = 27,9 s): whisper oye «contacta a mí» (0,42-0,50).
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_077 } from "./metraje-077";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_077 = 8;

export const subtitulos077: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK03): entra a corte en el f90, primera palabra en el f107 ──
  {
    id: "h01",
    hasta: 151,
    trozos: [
      { desde: 106, texto: "Antes de invertir en" },
      { desde: 136, texto: "Airbnb," },
    ],
  },
  {
    id: "h02",
    hasta: 207,
    trozos: [
      { desde: 151, texto: "hay algo que" },
      { desde: 180, texto: "debes saber.", estilo: "acento" },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (HK05): entra a corte en el f419, primera palabra en el f431 ──
  {
    id: "m01",
    hasta: 480,
    trozos: [
      { desde: 430, texto: "Descubre una suite" },
      { desde: 455, texto: "en un edificio" },
    ],
  },
  {
    id: "m02",
    hasta: 548,
    trozos: [
      { desde: 480, texto: "con operación" },
      { desde: 501, texto: "hotelera" },
      { desde: 518, texto: "establecida.", estilo: "acento" },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT04): entra a corte en el f793, primera palabra en el f802 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 836,
    trozos: [
      { desde: 802, texto: "Si quieres más" },
      { desde: 816, texto: "información," },
    ],
  },
  {
    id: "c02",
    hasta: 862,
    trozos: [{ desde: 837, texto: "contáctame.", estilo: "acento" }],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos077Srt = segmentosDe(subtitulos077, FPS_077);
