/**
 * UNA SOLA FUENTE (pedido del usuario, 2026-11-10: «los subtítulos que tengan una sola fuente»): todo va en la Montserrat de base; NINGÚN trozo lleva `estilo: "acento"` (la Playfair itálica). La puerta (2f) falla si vuelve a
 * aparecer uno.
 *
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 080 — `BloqueEditorial[]`. Solo en la versión normal: la de ficha no lleva subtítulos.
 *
 * Son los de la 071 (`proyectos/080/voz/*.txt`: el texto es lo que se OYE; los tiempos, el arranque MEDIDO de cada palabra sobre la voz sola, `onsets-voz.py` + `palabras-desde.py`, no el DTW de whisper, R31) llevados al
 * frame de cada toma en ESTA pieza: el hook, idéntico (entra en el mismo frame); la mitad, -131 f (entra en el f328, no en el f457); el CTA, +0 f. Cada línea entra 0-3 f ANTES de su palabra.
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ: el primer subtítulo entra con la imagen de Isabella, opaca desde el f86. El cierre lleva el LOGO, que es una
 * imagen (`LogoCierre` en `Recorrido080.tsx`) y no un bloque de texto. NO HAY CIFRAS EN PANTALLA: Isabella no dice ninguna (los 28,5 m², el piso 9 y el precio van en la ficha y en el caption).
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · «Una suite hotelera» (MD06, f342 = 11,4 s del vídeo): whisper oye «Un asfito atelera» (confianza baja) y solo desde «con» en adelante entiende la frase; la lectura sale del contexto (el anuncio, el CTA de esta suite y la métrica de sílabas: «u-na sui-te ho-te-le-ra» son 7 entre 0,53 y 1,52 s).
 *   · «todo» en el hook (HK08, f157 = 5,2 s del vídeo): el corte final de whisper oye «en todo otro trabajo»; los cortes parciales oyen «en otro trabajo». Se pintó «convertirse en otro trabajo».
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_080 } from "./metraje-080";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores: los px de la composición (1080×1920) que se le restan a las líneas de acento. Aquí no hay acentos (una sola fuente) y la constante se queda: la composición
 * y la puerta la leen.
 */
export const ACENTO_MENOS_080 = 8;

export const subtitulos080: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO ──
  {
    id: "h01",
    hasta: 136,
    trozos: [
      { desde: 100, texto: "Tu inversión" },
      { desde: 123, texto: "no debería" },
    ],
  },
  {
    id: "h02",
    hasta: 204,
    trozos: [
      { desde: 136, texto: "convertirse en" },
      { desde: 157, texto: "otro trabajo." },
    ],
  },
  // ── Bloque 4 · la mitad DICHA: entra en el f328 ──
  {
    id: "m01",
    hasta: 384,
    trozos: [
      { desde: 341, texto: "Una suite hotelera con" },
    ],
  },
  {
    id: "m02",
    hasta: 453,
    trozos: [
      { desde: 384, texto: "operadores" },
      { desde: 399, texto: "turísticos" },
      { desde: 420, texto: "listos para ti." },
    ],
  },
  // ── Bloque 2 · el hook DICHO ──
  {
    id: "c01",
    hasta: 877,
    trozos: [
      { desde: 802, texto: "Hablemos y conoce tus" },
      { desde: 841, texto: "opciones" },
      { desde: 855, texto: "de inversión." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos080Srt = segmentosDe(subtitulos080, FPS_080);
