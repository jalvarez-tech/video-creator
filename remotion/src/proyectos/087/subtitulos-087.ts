/**
 * UNA SOLA FUENTE (pedido del usuario, 2026-11-10: «los subtítulos que tengan una sola fuente»): todo va en la Montserrat de base; NINGÚN trozo lleva `estilo: "acento"` (la Playfair itálica). La puerta (2f) falla si vuelve a
 * aparecer uno.
 *
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 087 — `BloqueEditorial[]`. Solo en la versión normal: la de ficha no lleva subtítulos.
 *
 * Son los de la 078 (`proyectos/087/voz/*.txt`: el texto es lo que se OYE; los tiempos, el arranque MEDIDO de cada palabra sobre la voz sola, `onsets-voz.py` + `palabras-desde.py`, no el DTW de whisper, R31) llevados al
 * frame de cada toma en ESTA pieza: el hook, idéntico (entra en el mismo frame); la mitad, -79 f (entra en el f321, no en el f400); el CTA, +0 f. Cada línea entra 0-3 f ANTES de su palabra.
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ: el primer subtítulo entra con la imagen de Isabella, opaca desde el f82. El cierre lleva el LOGO, que es una
 * imagen (`LogoCierre` en `Recorrido087.tsx`) y no un bloque de texto. NO HAY CIFRAS EN PANTALLA: Isabella no dice ninguna (los 28,5 m², el piso 9 y el precio van en la ficha y en el caption).
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · «solo de» (HK07, f104 = 3,5 s del vídeo): whisper oye «sólo hay que» (confianza 0,27 / 0,45) y, en un corte desde 1,585 s, también «sólo hay que»; el catálogo lo lee «solo de». Las dos lecturas tienen 2-3 sílabas en los 0,3 s que hay entre «solo» y «comprar»: la energía no las distingue (`onsets-voz.py`). Si dice «solo hay que comprar una propiedad» el trozo cambia a «solo hay que».
 *   · «Conoce» (CT03, f845 = 28,2 s del vídeo): whisper oye «Conocer» (0,24) y en un corte aislado «Conocí»; por el contexto («esta oportunidad») es el imperativo «Conoce».
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_087 } from "./metraje-087";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores: los px de la composición (1080×1920) que se le restan a las líneas de acento. Aquí no hay acentos (una sola fuente) y la constante se queda: la composición
 * y la puerta la leen.
 */
export const ACENTO_MENOS_087 = 8;

export const subtitulos087: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO ──
  {
    id: "h01",
    hasta: 130,
    trozos: [
      { desde: 95, texto: "No se trata" },
      { desde: 104, texto: "solo de" },
    ],
  },
  {
    id: "h02",
    hasta: 163,
    trozos: [
      { desde: 130, texto: "comprar una" },
      { desde: 138, texto: "propiedad." },
    ],
  },
  // ── Bloque 4 · la mitad DICHA: entra en el f321 ──
  {
    id: "m01",
    hasta: 417,
    trozos: [
      { desde: 341, texto: "No todas las propiedades" },
      { desde: 376, texto: "tienen las mismas" },
      { desde: 397, texto: "condiciones" },
    ],
  },
  {
    id: "m02",
    hasta: 468,
    trozos: [
      { desde: 417, texto: "para operar" },
      { desde: 436, texto: "turísticamente." },
    ],
  },
  // ── Bloque 2 · el hook DICHO ──
  {
    id: "c01",
    hasta: 870,
    trozos: [
      { desde: 845, texto: "Conoce esta" },
      { desde: 858, texto: "oportunidad" },
    ],
  },
  {
    id: "c02",
    hasta: 914,
    trozos: [
      { desde: 870, texto: "en El" },
      { desde: 887, texto: "Poblado." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos087Srt = segmentosDe(subtitulos087, FPS_087);
