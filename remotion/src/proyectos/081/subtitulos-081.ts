/**
 * UNA SOLA FUENTE (pedido del usuario, 2026-11-10: «los subtítulos que tengan una sola fuente»): todo va en la Montserrat de base; NINGÚN trozo lleva `estilo: "acento"` (la Playfair itálica). La puerta (2f) falla si vuelve a
 * aparecer uno.
 *
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 081 — `BloqueEditorial[]`. Solo en la versión normal: la de ficha no lleva subtítulos.
 *
 * Son los de la 072 (`proyectos/081/voz/*.txt`: el texto es lo que se OYE; los tiempos, el arranque MEDIDO de cada palabra sobre la voz sola, `onsets-voz.py` + `palabras-desde.py`, no el DTW de whisper, R31) llevados al
 * frame de cada toma en ESTA pieza: el hook, idéntico (entra en el mismo frame); la mitad, -176 f (entra en el f293, no en el f467); el CTA, +0 f. Cada línea entra 0-3 f ANTES de su palabra.
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ: el primer subtítulo entra con la imagen de Isabella, opaca desde el f80. El cierre lleva el LOGO, que es una
 * imagen (`LogoCierre` en `Recorrido081.tsx`) y no un bloque de texto. NO HAY CIFRAS EN PANTALLA: Isabella no dice ninguna (los 28,5 m², el piso 9 y el precio van en la ficha y en el caption).
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · «Oviedo» (MD08, f324 = 10,8 s del vídeo): whisper oyó «odio» (0,02) y «abierto» en un corte aislado; por el contexto —y el anuncio, que cita el C.C. Oviedo— se lee «Oviedo».
 *   · «EAFIT» (MD08, f366 = 12,2 s del vídeo): whisper oyó «Eafid» y «Eafit» (0,34). **No está en el anuncio** (cita Oviedo, Santa Fe, la estación Aguacatala y la Milla de Oro): es una frase suya y se confirma con el usuario.
 *   · «Aguacatala» (MD08, f386 = 12,9 s del vídeo): whisper oyó «Acuacatala» (0,42); el anuncio escribe «Aguacatala» y su inicio exacto es ambiguo entre «estación» y «Aguacatala».
 *   · «déjate» (CT11, f935 = 31,2 s del vídeo): whisper oyó «déjate» con 0,05 y «hasta» en cortes aislados.
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_081 } from "./metraje-081";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores: los px de la composición (1080×1920) que se le restan a las líneas de acento. Aquí no hay acentos (una sola fuente) y la constante se queda: la composición
 * y la puerta la leen.
 */
export const ACENTO_MENOS_081 = 8;

export const subtitulos081: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO ──
  {
    id: "h01",
    hasta: 190,
    trozos: [
      { desde: 94, texto: "En inversión inmobiliaria," },
      { desde: 133, texto: "la ubicación" },
      { desde: 160, texto: "lo cambia todo." },
    ],
  },
  // ── Bloque 4 · la mitad DICHA: entra en el f293 ──
  {
    id: "m01",
    hasta: 366,
    trozos: [
      { desde: 305, texto: "A minutos de" },
      { desde: 324, texto: "Oviedo," },
      { desde: 341, texto: "Santa Fe," },
    ],
  },
  {
    id: "m02",
    hasta: 424,
    trozos: [
      { desde: 366, texto: "EAFIT" },
      { desde: 385, texto: "y la estación Aguacatala." },
    ],
  },
  // ── Bloque 2 · el hook DICHO ──
  {
    id: "c01",
    hasta: 935,
    trozos: [
      { desde: 881, texto: "Descubre esta suite" },
      { desde: 909, texto: "en El Poblado" },
    ],
  },
  {
    id: "c02",
    hasta: 994,
    trozos: [
      { desde: 935, texto: "y déjate asombrar" },
      { desde: 964, texto: "por la ubicación." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos081Srt = segmentosDe(subtitulos081, FPS_081);
