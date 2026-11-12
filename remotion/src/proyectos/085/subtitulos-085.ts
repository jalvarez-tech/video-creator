/**
 * UNA SOLA FUENTE (pedido del usuario, 2026-11-10: «los subtítulos que tengan una sola fuente»): todo va en la Montserrat de base; NINGÚN trozo lleva `estilo: "acento"` (la Playfair itálica). La puerta (2f) falla si vuelve a
 * aparecer uno.
 *
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 085 — `BloqueEditorial[]`. Solo en la versión normal: la de ficha no lleva subtítulos.
 *
 * Son los de la 076 (`proyectos/085/voz/*.txt`: el texto es lo que se OYE; los tiempos, el arranque MEDIDO de cada palabra sobre la voz sola, `onsets-voz.py` + `palabras-desde.py`, no el DTW de whisper, R31) llevados al
 * frame de cada toma en ESTA pieza: el hook, idéntico (entra en el mismo frame); la mitad, -74 f (entra en el f317, no en el f391); el CTA, +0 f. Cada línea entra 0-3 f ANTES de su palabra.
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ: el primer subtítulo entra con la imagen de Isabella, opaca desde el f87. El cierre lleva el LOGO, que es una
 * imagen (`LogoCierre` en `Recorrido085.tsx`) y no un bloque de texto. NO HAY CIFRAS EN PANTALLA: Isabella no dice ninguna (los 28,5 m², el piso 9 y el precio van en la ficha y en el caption).
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · La interjección RECORTADA al principio de HK02 (1,22-1,53 s de la toma, antes del primer plano de esta pieza): whisper la oye «Hoy,» (0,81) y, cortando desde 1,215 s, «Hoy, una buena inversión…». Se quita porque el catálogo da la frase sin ella y el hueco de −60 dB que la separa de «una» (1,57-1,61 s) permite un corte limpio; si Isabella dijo otra cosa y se la quiere oír, hay que cambiar `VENTANA_VOZ` de `normalizar.mjs`.
 *   · «ubicación» y «estratégica» (MD04, f411 = 13,7 s del vídeo): whisper las oye «y ubicaciones estratégicas» (plural) y «en la educación estratégica» en cortes distintos; la lectura es «ubicación estratégica» (el anuncio la usa: «a unos metros de la Avenida El Poblado»).
 *   · «Agenda» y «una» (CT06, f794 = 26,5 s del vídeo): whisper oye «Ag» (0,36) y «una» (0,56); la «A» es muy suave (−57 → −40 dB en 20 ms). Sin ella sería «genda una visita».
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_085 } from "./metraje-085";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores: los px de la composición (1080×1920) que se le restan a las líneas de acento. Aquí no hay acentos (una sola fuente) y la constante se queda: la composición
 * y la puerta la leen.
 */
export const ACENTO_MENOS_085 = 8;

export const subtitulos085: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO ──
  {
    id: "h01",
    hasta: 176,
    trozos: [
      { desde: 99, texto: "Una buena inversión" },
      { desde: 132, texto: "empieza por la" },
      { desde: 146, texto: "tranquilidad." },
    ],
  },
  // ── Bloque 4 · la mitad DICHA: entra en el f317 ──
  {
    id: "m01",
    hasta: 408,
    trozos: [
      { desde: 332, texto: "Invierte en una suite" },
      { desde: 377, texto: "con vocación turística" },
    ],
  },
  {
    id: "m02",
    hasta: 449,
    trozos: [
      { desde: 408, texto: "y ubicación" },
      { desde: 427, texto: "estratégica." },
    ],
  },
  // ── Bloque 2 · el hook DICHO ──
  {
    id: "c01",
    hasta: 848,
    trozos: [
      { desde: 794, texto: "Agenda una visita" },
      { desde: 828, texto: "y descubre su" },
    ],
  },
  {
    id: "c02",
    hasta: 881,
    trozos: [
      { desde: 848, texto: "potencial" },
      { desde: 857, texto: "de inversión." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos085Srt = segmentosDe(subtitulos085, FPS_085);
