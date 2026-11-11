/**
 * UNA SOLA FUENTE (pedido del usuario, 2026-11-10: «los subtítulos que tengan una sola fuente»): todo va en la Montserrat de base; NINGÚN trozo lleva `estilo: "acento"` (la Playfair itálica). La puerta (2f) falla si vuelve a
 * aparecer uno.
 *
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 084 — `BloqueEditorial[]`. Solo en la versión normal: la de ficha no lleva subtítulos.
 *
 * Son los de la 075 (`proyectos/084/voz/*.txt`: el texto es lo que se OYE; los tiempos, el arranque MEDIDO de cada palabra sobre la voz sola, `onsets-voz.py` + `palabras-desde.py`, no el DTW de whisper, R31) llevados al
 * frame de cada toma en ESTA pieza: el hook, idéntico (entra en el mismo frame); la mitad, -179 f (entra en el f322, no en el f499); el CTA, +0 f. Cada línea entra 0-3 f ANTES de su palabra.
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ: el primer subtítulo entra con la imagen de Isabella, opaca desde el f103. El cierre lleva el LOGO, que es una
 * imagen (`LogoCierre` en `Recorrido084.tsx`) y no un bloque de texto. NO HAY CIFRAS EN PANTALLA: Isabella no dice ninguna (los 28,5 m², el piso 9 y el precio van en la ficha y en el caption).
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · «Y» inicial del hook (HK06, f113 = 3,8 s del vídeo): whisper la oye con confianza 0,37; sin ella sería «Si tu próxima propiedad…».
 *   · «hotelera» (MD03, f342 = 11,4 s del vídeo): whisper la oye con confianza 0,13 («hotelera» sale «hotelera» en la toma entera).
 *   · «Poblado» (MD03, f404 = 13,5 s del vídeo): whisper la oye con confianza 0,20 («Poblado», «polado» o «poblado» según el corte).
 *   · «Agendemos» (CT08, f977 = 32,6 s del vídeo): whisper oye «Ajenlemos» (0,14).
 *   · «Go Living Suites» (CT08, f1038 = 34,6 s del vídeo): whisper oye «Go Living Sweets» (Go 0,37, Sweets 0,24); el anuncio dice «Go Living Suites».
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_084 } from "./metraje-084";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores: los px de la composición (1080×1920) que se le restan a las líneas de acento. Aquí no hay acentos (una sola fuente) y la constante se queda: la composición
 * y la puerta la leen.
 */
export const ACENTO_MENOS_084 = 8;

export const subtitulos084: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO ──
  {
    id: "h01",
    hasta: 182,
    trozos: [
      { desde: 113, texto: "¿Y si tu próxima" },
      { desde: 139, texto: "propiedad" },
      { desde: 156, texto: "también pudiera" },
    ],
  },
  {
    id: "h02",
    hasta: 207,
    trozos: [
      { desde: 182, texto: "generar ingresos?" },
    ],
  },
  // ── Bloque 4 · la mitad DICHA: entra en el f322 ──
  {
    id: "m01",
    hasta: 443,
    trozos: [
      { desde: 342, texto: "Una suite hotelera," },
      { desde: 380, texto: "totalmente equipada" },
      { desde: 403, texto: "en El Poblado." },
    ],
  },
  // ── Bloque 2 · el hook DICHO ──
  {
    id: "c01",
    hasta: 1018,
    trozos: [
      { desde: 977, texto: "Agendemos" },
      { desde: 991, texto: "una visita" },
    ],
  },
  {
    id: "c02",
    hasta: 1067,
    trozos: [
      { desde: 1018, texto: "y descubre" },
      { desde: 1038, texto: "Go Living Suites." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos084Srt = segmentosDe(subtitulos084, FPS_084);
