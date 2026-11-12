/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 075 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cinco palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/075/voz/*.txt`: lo escribo yo con lo que se OYE, comprobado por cortes aislados) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31). Cada línea entra 0-3 f ANTES de su palabra (la primera de cada toma, en el frame en que su imagen ya es opaca o en que ella empieza a hablar).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la apertura, DR10): el primer subtítulo entra en el f113, con la imagen de Isabella (opaca desde el f103),
 * 2,6 f antes de su primera sílaba (f115,6). El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido075.tsx`) y no un bloque de texto.
 *
 * NO HAY CIFRAS EN PANTALLA: las tres frases de Isabella no dicen ninguna (los 28,5 m², el piso 9 y el precio van al caption y a la versión con ficha).
 *
 * LO QUE DICE SU VOZ Y AQUÍ SOLO TIENE TRANSCRIPCIÓN: la pregunta «¿y si tu próxima propiedad también pudiera generar ingresos?» es condicional, no una promesa (reparto aprobado), y ni ella ni un rótulo hablan de la norma,
 * de valorización ni de rentabilidad. Los acentos son lo que se compra («propiedad»), lo que trae («totalmente equipada») y la acción («Agendemos»), uno por toma y con más de 10 s entre dos.
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 103, desde 6 f)   «¿Y si tu próxima» 0,62 · «propiedad» 1,46 (el acento «próxima propiedad» era tan ancho que el motor lo encogía por debajo de los 8 px pedidos) · «también» 2,015 · «generar ingresos» 2,905
 *   mitad (en 499, desde 0)    «Una suite hotelera» 0,75 · «totalmente equipada» 2,04 (tras la pausa de 1,85-2,05 s) · «en El Poblado» 2,83 (tras la pausa de 2,59-2,83 s)
 *   CTA (en 966, desde 10 f)   «Agendemos» 0,75 · «una visita» 1,225 · «y descubre» 2,125 (tras la pausa de 1,97-2,16 s) · «Go Living Suites» 2,78
 * El DTW de whisper iba de 3 a 10 f por delante en varias líneas («generar ingresos?», «en El Poblado.», «y descubre»): lo que vale es la envolvente de la voz sola (arranques de sílaba tras cada pausa, `onsets-voz.py`).
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · «Y» inicial del hook (HK06, f113 = 3,8 s del vídeo): whisper la oye con confianza 0,37; sin ella sería «Si tu próxima propiedad…».
 *   · «hotelera» y «Poblado» (MD03, f521-f583 = 17,4-19,4 s del vídeo): whisper las oye con confianza 0,13 y 0,20 («hotelera» sale «hotelera» en la toma entera; «Poblado», «polado» o «poblado» según el corte).
 *   · «Agendemos» y «Go Living Suites» (CT08, f977 y f1038 = 32,6 y 34,6 s del vídeo): whisper oye «Ajenlemos» (0,14) y «Go Living Sweets» (Go 0,37, Sweets 0,24); el anuncio dice «Go Living Suites».
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_075 } from "./metraje-075";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_075 = 8;

export const subtitulos075: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK06): imagen opaca desde el f103, primera sílaba en el f115,6 ──
  {
    id: "h01",
    hasta: 182,
    trozos: [
      { desde: 113, texto: "¿Y si tu próxima" },
      { desde: 139, texto: "propiedad", estilo: "acento" },
      { desde: 156, texto: "también pudiera" },
    ],
  },
  {
    id: "h02",
    hasta: 207,
    trozos: [{ desde: 182, texto: "generar ingresos?" }],
  },
  // ── Bloque 4 · la mitad DICHA (MD03): entra a corte en el f499, primera palabra en el f521,5 ──
  {
    id: "m01",
    hasta: 622,
    trozos: [
      { desde: 521, texto: "Una suite hotelera," },
      { desde: 559, texto: "totalmente equipada", estilo: "acento" },
      { desde: 582, texto: "en El Poblado." },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT08): entra a corte en el f966, primera palabra en el f978,5 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 1018,
    trozos: [
      { desde: 977, texto: "Agendemos", estilo: "acento" },
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
export const subtitulos075Srt = segmentosDe(subtitulos075, FPS_075);
