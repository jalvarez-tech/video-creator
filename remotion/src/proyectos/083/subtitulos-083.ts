/**
 * UNA SOLA FUENTE (pedido del usuario, 2026-11-10: «los subtítulos que tengan una sola fuente»): todo va en la Montserrat de base; NINGÚN trozo lleva `estilo: "acento"` (la Playfair itálica). La puerta (2f) falla si vuelve a
 * aparecer uno.
 *
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 083 — `BloqueEditorial[]`. Solo en la versión normal: la de ficha no lleva subtítulos.
 *
 * Son los de la 074 (`proyectos/083/voz/*.txt`: el texto es lo que se OYE; los tiempos, el arranque MEDIDO de cada palabra sobre la voz sola, `onsets-voz.py` + `palabras-desde.py`, no el DTW de whisper, R31) llevados al
 * frame de cada toma en ESTA pieza: el hook, idéntico (entra en el mismo frame); la mitad, -137 f (entra en el f303, no en el f440); el CTA, +0 f. Cada línea entra 0-3 f ANTES de su palabra.
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ: el primer subtítulo entra con la imagen de Isabella, opaca desde el f90. El cierre lleva el LOGO, que es una
 * imagen (`LogoCierre` en `Recorrido083.tsx`) y no un bloque de texto. NO HAY CIFRAS EN PANTALLA: Isabella no dice ninguna (los 28,5 m², el piso 9 y el precio van en la ficha y en el caption).
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · «estratégica» (MD09, f339 = 11,3 s del vídeo, dentro de «Una ubicación estratégica», que entra en el f321): whisper la oye con confianza 0,24 («estrategica», «técnica» según el corte).
 *   · «esto» (CT12, f940 = 31,3 s del vídeo): whisper oye «eso» (0,03-0,34); el guion dice «esto».
 *   · «Go Living Suites» (CT12, f988 = 32,9 s del vídeo): whisper oye «Goblin en Suiz», «Governing suits»…; el anuncio dice «Go Living Suites». Es el nombre propio del edificio.
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_083 } from "./metraje-083";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores: los px de la composición (1080×1920) que se le restan a las líneas de acento. Aquí no hay acentos (una sola fuente) y la constante se queda: la composición
 * y la puerta la leen.
 */
export const ACENTO_MENOS_083 = 8;

export const subtitulos083: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO ──
  {
    id: "h01",
    hasta: 205,
    trozos: [
      { desde: 109, texto: "Las buenas inversiones" },
      { desde: 145, texto: "empiezan con" },
      { desde: 170, texto: "buenas decisiones." },
    ],
  },
  // ── Bloque 4 · la mitad DICHA: entra en el f303 ──
  {
    id: "m01",
    hasta: 396,
    trozos: [
      { desde: 321, texto: "Una ubicación estratégica," },
      { desde: 356, texto: "amenidades" },
    ],
  },
  {
    id: "m02",
    hasta: 471,
    trozos: [
      { desde: 396, texto: "y cercanía a los principales" },
      { desde: 427, texto: "destinos turísticos." },
    ],
  },
  // ── Bloque 2 · el hook DICHO ──
  {
    id: "c01",
    hasta: 1019,
    trozos: [
      { desde: 940, texto: "Conoce esto" },
      { desde: 959, texto: "y mucho más en" },
      { desde: 988, texto: "Go Living Suites." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos083Srt = segmentosDe(subtitulos083, FPS_083);
