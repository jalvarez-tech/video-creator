/**
 * UNA SOLA FUENTE (pedido del usuario, 2026-11-10: «los subtítulos que tengan una sola fuente»): todo va en la Montserrat de base; NINGÚN trozo lleva `estilo: "acento"` (la Playfair itálica). La puerta (2f) falla si vuelve a
 * aparecer uno.
 *
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 086 — `BloqueEditorial[]`. Solo en la versión normal: la de ficha no lleva subtítulos.
 *
 * Son los de la 077 (`proyectos/086/voz/*.txt`: el texto es lo que se OYE; los tiempos, el arranque MEDIDO de cada palabra sobre la voz sola, `onsets-voz.py` + `palabras-desde.py`, no el DTW de whisper, R31) llevados al
 * frame de cada toma en ESTA pieza: el hook, idéntico (entra en el mismo frame); la mitad, -120 f (entra en el f301, no en el f419); el CTA, +0 f. Cada línea entra 0-3 f ANTES de su palabra.
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ: el primer subtítulo entra con la imagen de Isabella, opaca desde el f90. El cierre lleva el LOGO, que es una
 * imagen (`LogoCierre` en `Recorrido086.tsx`) y no un bloque de texto. NO HAY CIFRAS EN PANTALLA: Isabella no dice ninguna (los 28,5 m², el piso 9 y el precio van en la ficha y en el caption).
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · «Descubre una suite» (HK05 como mitad, f310 = 10,3 s del vídeo): whisper oye «Descubro en EZID» (confianzas 0,31-0,58); «una suite» va tan rápido que se oye «nezit».
 *   · «hotelera» (HK05 como mitad, f381 = 12,7 s del vídeo): whisper la oye con confianza 0,51.
 *   · «contáctame» (CT04, f837 = 27,9 s del vídeo): whisper oye «contacta a mí» (0,42-0,50).
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_086 } from "./metraje-086";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores: los px de la composición (1080×1920) que se le restan a las líneas de acento. Aquí no hay acentos (una sola fuente) y la constante se queda: la composición
 * y la puerta la leen.
 */
export const ACENTO_MENOS_086 = 8;

export const subtitulos086: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO ──
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
      { desde: 180, texto: "debes saber." },
    ],
  },
  // ── Bloque 4 · la mitad DICHA: entra en el f301 ──
  {
    id: "m01",
    hasta: 360,
    trozos: [
      { desde: 310, texto: "Descubre una suite" },
      { desde: 335, texto: "en un edificio" },
    ],
  },
  {
    id: "m02",
    hasta: 428,
    trozos: [
      { desde: 360, texto: "con operación" },
      { desde: 381, texto: "hotelera" },
      { desde: 398, texto: "establecida." },
    ],
  },
  // ── Bloque 2 · el hook DICHO ──
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
    trozos: [
      { desde: 837, texto: "contáctame." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos086Srt = segmentosDe(subtitulos086, FPS_086);
