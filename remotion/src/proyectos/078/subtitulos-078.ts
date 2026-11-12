/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 078 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cinco palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/078/voz/*.txt`: lo escribo yo con lo que se OYE, comprobado por cortes aislados con `palabras-desde.py`) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra
 * sobre la voz sola (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31). Cada línea entra 0-3 f ANTES de su palabra.
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la apertura, DR09): el primer subtítulo entra en el f95, con la imagen de Isabella (opaca desde el f82),
 * en el frame de su primera sílaba. El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido078.tsx`) y no un bloque de texto.
 *
 * NO HAY CIFRAS EN PANTALLA: las tres frases de Isabella no dicen ninguna (los 28,5 m², el piso 9 y el precio van al caption y a la versión con ficha).
 *
 * LO QUE DICE SU VOZ Y AQUÍ SOLO TIENE TRANSCRIPCIÓN: la idea «no se trata solo de comprar una propiedad» y la afirmación «no todas las propiedades tienen las mismas condiciones para operar turísticamente»; ninguna dice qué exige la
 * norma ni que esta suite la cumpla. Los acentos son la propiedad («propiedad.»), la condición («turísticamente.») y el lugar («Poblado.»): uno por toma; «condiciones» va en base porque con menos de 2 s entre dos acentos ninguno destaca.
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 82, desde 8 f)    «No se trata» 0,73 · «solo de» 1,08 · «comprar una» 1,95 · «propiedad» 2,2 (medidos sobre el render con `subs-vs-voz.py`: onsets en f96, f106,5, f132,6 y f140,2)
 *   mitad (en 400, desde 0)    «No todas» 0,655 · «tienen» 1,88 · «condiciones» 2,565 · «para operar» 3,245 · «turísticamente» 3,86 (los de la 070: es la misma toma)
 *   CTA (en 834, desde 6 f)    «Conoce esta» 0,58 · «oportunidad» 1,015 · «en El» 1,40 · «Poblado» 1,98
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · «solo de» (HK07, f104-f130 = 3,5-4,3 s del vídeo): whisper oye «sólo hay que» (confianza 0,27 / 0,45) y, en un corte desde 1,585 s, también «sólo hay que»; el catálogo lo lee «solo de». Las dos lecturas tienen 2-3
 *     sílabas en los 0,3 s que hay entre «solo» y «comprar»: la energía no las distingue (`onsets-voz.py`). Si dice «solo hay que comprar una propiedad» el trozo cambia a «solo hay que».
 *   · «Conoce» (CT03, f845 = 28,2 s del vídeo): whisper oye «Conocer» (0,24) y en un corte aislado «Conocí»; por el contexto («esta oportunidad») es el imperativo «Conoce».
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_078 } from "./metraje-078";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_078 = 8;

export const subtitulos078: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK07): imagen opaca desde el f82, primera sílaba en el f96 ──
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
      { desde: 138, texto: "propiedad.", estilo: "acento" },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD02): entra a corte en el f400, primera palabra en el f419,6 ──
  {
    id: "m01",
    hasta: 496,
    trozos: [
      { desde: 420, texto: "No todas las propiedades" },
      { desde: 455, texto: "tienen las mismas" },
      { desde: 476, texto: "condiciones" },
    ],
  },
  {
    id: "m02",
    hasta: 547,
    trozos: [
      { desde: 496, texto: "para operar" },
      { desde: 515, texto: "turísticamente.", estilo: "acento" },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT03): entra a corte en el f834, primera palabra en el f846 (el cierre es el logo, no un bloque de texto) ──
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
      { desde: 887, texto: "Poblado.", estilo: "acento" },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos078Srt = segmentosDe(subtitulos078, FPS_078);
