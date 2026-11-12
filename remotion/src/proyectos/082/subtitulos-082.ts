/**
 * UNA SOLA FUENTE (pedido del usuario, 2026-11-10: «los subtítulos que tengan una sola fuente»): todo va en la Montserrat de base; NINGÚN trozo lleva `estilo: "acento"` (la Playfair itálica). La puerta (2f) falla si vuelve a
 * aparecer uno.
 *
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 082 — `BloqueEditorial[]`. Solo en la versión normal: la de ficha no lleva subtítulos.
 *
 * Son los de la 073 (`proyectos/082/voz/*.txt`: el texto es lo que se OYE; los tiempos, el arranque MEDIDO de cada palabra sobre la voz sola, `onsets-voz.py` + `palabras-desde.py`, no el DTW de whisper, R31) llevados al
 * frame de cada toma en ESTA pieza: el hook, idéntico (entra en el mismo frame); la mitad, -182 f (entra en el f315, no en el f497); el CTA, +0 f. Cada línea entra 0-3 f ANTES de su palabra.
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ: el primer subtítulo entra con la imagen de Isabella, opaca desde el f93. El cierre lleva el LOGO, que es una
 * imagen (`LogoCierre` en `Recorrido082.tsx`) y no un bloque de texto. NO HAY CIFRAS EN PANTALLA: Isabella no dice ninguna (los 28,5 m², el piso 9 y el precio van en la ficha y en el caption).
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · «vives» (HK10, f110 = 3,7 s del vídeo): whisper oye «Vivo» en la toma entera (confianza 0,16-0,14); «¿Vives fuera de Colombia…?» es la lectura por gramática y por la pregunta que sigue. Y «Medellín» (0,36).
 *   · «en edificios con reconocimiento» (MD01, f405 = 13,5 s del vídeo): una afirmación de Isabella que el anuncio no recoge; hay que confirmarla con el usuario además de oírla. Y «matrícula independiente» (consta en el anuncio).
 *   · «Haz» (CT10, f1026 = 34,2 s del vídeo): whisper la oye con confianza 0,14 (es la sílaba suelta de 0,62-0,74 s, antes del cierre de la «c»).
 *   · «Go Living Suites» (CT10, f1108 = 36,9 s del vídeo): whisper oye «StatSuite» (0,04); el anuncio dice «Go Living Suites».
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_082 } from "./metraje-082";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores: los px de la composición (1080×1920) que se le restan a las líneas de acento. Aquí no hay acentos (una sola fuente) y la constante se queda: la composición
 * y la puerta la leen.
 */
export const ACENTO_MENOS_082 = 8;

export const subtitulos082: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO ──
  {
    id: "h01",
    hasta: 196,
    trozos: [
      { desde: 110, texto: "¿Vives fuera de Colombia" },
      { desde: 141, texto: "y quieres invertir" },
      { desde: 168, texto: "en Medellín?" },
    ],
  },
  // ── Bloque 4 · la mitad DICHA: entra en el f315 ──
  {
    id: "m01",
    hasta: 405,
    trozos: [
      { desde: 327, texto: "Una suite hotelera, con" },
      { desde: 365, texto: "matrícula" },
      { desde: 383, texto: "independiente," },
    ],
  },
  {
    id: "m02",
    hasta: 468,
    trozos: [
      { desde: 405, texto: "en edificios" },
      { desde: 430, texto: "con reconocimiento." },
    ],
  },
  // ── Bloque 2 · el hook DICHO ──
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
      { desde: 1108, texto: "Go Living Suites" },
      { desde: 1130, texto: "en Medellín." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos082Srt = segmentosDe(subtitulos082, FPS_082);
