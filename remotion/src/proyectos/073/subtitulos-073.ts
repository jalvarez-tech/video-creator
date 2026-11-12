/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 073 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cinco palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/073/voz/*.txt`: lo escribo yo con lo que se OYE, comprobado por cortes aislados) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31). Cada línea entra 0-3 f ANTES de su palabra (la primera de cada toma, en el frame en que ella empieza a hablar).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la apertura, DR09): el primer subtítulo entra en el f110, con la imagen de Isabella (opaca desde el f93),
 * en el frame de su primera sílaba (f110,1). El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido073.tsx`) y no un bloque de texto.
 *
 * NO HAY CIFRAS EN PANTALLA: las tres frases de Isabella no dicen ninguna (los 28,5 m², el piso 9 y el precio van al caption y a la versión con ficha).
 *
 * LO QUE DICE SU VOZ Y AQUÍ SOLO TIENE TRANSCRIPCIÓN: «matrícula independiente» (consta en el anuncio) y «en edificios con reconocimiento» (una afirmación suya que el anuncio no recoge): ninguna frase dice qué exige la
 * norma ni que la suite la cumpla, ni promete valorización, rentabilidad o ganancia. Los acentos son la pregunta («en Medellín?»), el concepto («matrícula») y el nombre del edificio («Go Living Suites»): uno por toma
 * y con más de 10 s entre dos de ellos; las afirmaciones de la mitad («con reconocimiento.») van SIN acento, en base.
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 93, desde 0)       «¿Vives fuera» 0,57 · «y quieres» 1,66 · «en Medellín» 2,53
 *   mitad (en 497, desde 14 f)  «Una suite» 0,88 · «matrícula» 2,18 · «independiente» ≈ 2,78 · «en edificios» 3,53 · «con reconocimiento» 4,33
 *   CTA (en 1014, desde 6 f)     «Haz clic» 0,62 · «y recibe» ≈ 1,88 · «sobre» 2,945 · «Go Living Suites» 3,35 · «en Medellín» 4,115
 * El DTW de whisper iba de 3 a 9 f por delante en varias líneas («independiente», «y recibe más información», «Go Living Suites») y de 3 f por detrás en «en Medellín»: lo que vale es la envolvente de la voz sola
 * (arranques de sílaba tras cada pausa, `onsets-voz.py`).
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · «vives» (HK10, f110-f141 = 3,7-4,7 s del vídeo): whisper oye «Vivo» en la toma entera (confianza 0,16-0,14); «¿Vives fuera de Colombia…?» es la lectura por gramática y por la pregunta que sigue. Y «Medellín» (0,36).
 *   · «en edificios con reconocimiento» (MD01, f587-f649 = 19,6-21,6 s del vídeo): una afirmación de Isabella que el anuncio no recoge; hay que confirmarla con el usuario además de oírla.
 *   · «Haz» (CT10, f1026 = 34,2 s del vídeo): whisper la oye con confianza 0,14 (es la sílaba suelta de 0,62-0,74 s, antes del cierre de la «c»); y «Go Living Suites» (f1108 = 36,9 s): whisper oye «StatSuite» (0,04).
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_073 } from "./metraje-073";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_073 = 8;

export const subtitulos073: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK10): entra a corte en el f93, primera sílaba en el f110,1 ──
  {
    id: "h01",
    hasta: 196,
    trozos: [
      { desde: 110, texto: "¿Vives fuera de Colombia" },
      { desde: 141, texto: "y quieres invertir" },
      { desde: 168, texto: "en Medellín?", estilo: "acento" },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD01): disuelve y es opaca en el f497, primera palabra en el f509,4 ──
  {
    id: "m01",
    hasta: 587,
    trozos: [
      { desde: 509, texto: "Una suite hotelera, con" },
      { desde: 547, texto: "matrícula", estilo: "acento" },
      { desde: 565, texto: "independiente," },
    ],
  },
  {
    id: "m02",
    hasta: 650,
    trozos: [
      { desde: 587, texto: "en edificios" },
      { desde: 612, texto: "con reconocimiento." },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT10): entra a corte en el f1014, primera palabra en el f1026,6 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 1095,
    trozos: [
      { desde: 1026, texto: "Haz clic en el enlace" },
      { desde: 1063, texto: "y recibe más información" },
    ],
  },
  {
    id: "c02",
    hasta: 1158,
    trozos: [
      { desde: 1095, texto: "sobre" },
      { desde: 1108, texto: "Go Living Suites", estilo: "acento" },
      { desde: 1130, texto: "en Medellín." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos073Srt = segmentosDe(subtitulos073, FPS_073);
