/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 070 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cinco palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/070/voz/*.txt`: lo escribo yo con lo que se OYE, comprobado por cortes aislados) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31). Cada línea entra 0-3 f ANTES de su palabra (la primera de cada toma, en el frame en que su imagen ya es opaca o en que ella empieza a hablar).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la apertura, DR02): el primer subtítulo entra en el f100, con la imagen de Isabella (opaca desde el f88),
 * en el frame de su primera sílaba (f100,4). El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido070.tsx`) y no un bloque de texto.
 *
 * NO HAY CIFRAS EN PANTALLA: las tres frases de Isabella no dicen ninguna (los 28,5 m², el piso 9 y el precio van al caption y a la versión con ficha).
 *
 * LO QUE DICE SU VOZ Y AQUÍ SOLO TIENE TRANSCRIPCIÓN: la pregunta sobre «los cambios del POT» y la afirmación «no todas las propiedades tienen las mismas condiciones para operar turísticamente»; ninguna dice qué exige la
 * norma ni que esta suite la cumpla. Los acentos son la pregunta («del POT?»), la condición («turísticamente.») y lo que distingue al edificio («operación hotelera»): uno por toma, y el nombre («Go Living,») y «condiciones» van en base
 * porque con menos de 2 s entre dos acentos ninguno destaca.
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 88, desde 23 f)   «¿Te preocupa» 1,18 · «invertir» ≈ 1,72 · «con los cambios» 2,585 · «del POT» 3,415
 *   mitad (en 515, desde 0)    «No todas» 0,655 · «tienen» 1,88 · «condiciones» 2,565 · «para operar» 3,245 · «turísticamente» 3,86
 *   CTA (en 966, desde 3 f)    «Conoce» 0,48 · «Go Living» ≈ 1,05 · «un edificio» 1,87 · «operación» 2,68 · «activa» 3,815
 * El DTW de whisper iba de 3 a 11 f por delante en varias líneas («para operar», «activa.», «Go Living»): lo que vale es la envolvente de la voz sola (arranques de sílaba tras cada pausa, `onsets-voz.py`).
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · «el» de «en el Airbnb» (HK01, f115-f142 = 3,8-4,7 s del vídeo): whisper la oye con confianza 0,36; sin ella sería «invertir en Airbnb». Las sílabas no la distinguen (`onsets-voz.py`).
 *   · «POT» (HK01, f165 = 5,5 s del vídeo): se deletrea («pe-o-te»; whisper oye «peote» en cortes aislados y «POT» en la toma entera, confianza 0,37).
 *   · «Go Living» (CT01, f995 = 33,2 s del vídeo): whisper oye «GoLiving» (0,40); el anuncio dice «Go Living Suites». Es el nombre propio del edificio.
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_070 } from "./metraje-070";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_070 = 8;

export const subtitulos070: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK01): imagen opaca desde el f88, primera sílaba en el f100,4 ──
  {
    id: "h01",
    hasta: 142,
    trozos: [
      { desde: 100, texto: "¿Te preocupa" },
      { desde: 115, texto: "invertir en el Airbnb" },
    ],
  },
  {
    id: "h02",
    hasta: 190,
    trozos: [
      { desde: 142, texto: "con los cambios" },
      { desde: 165, texto: "del POT?", estilo: "acento" },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD02): entra a corte en el f515, primera palabra en el f534,6 ──
  {
    id: "m01",
    hasta: 611,
    trozos: [
      { desde: 535, texto: "No todas las propiedades" },
      { desde: 570, texto: "tienen las mismas" },
      { desde: 591, texto: "condiciones" },
    ],
  },
  {
    id: "m02",
    hasta: 662,
    trozos: [
      { desde: 611, texto: "para operar" },
      { desde: 630, texto: "turísticamente.", estilo: "acento" },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT01): entra a corte en el f966, primera palabra en el f977,4 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 1016,
    trozos: [
      { desde: 977, texto: "Conoce" },
      { desde: 995, texto: "Go Living," },
    ],
  },
  {
    id: "c02",
    hasta: 1090,
    trozos: [
      { desde: 1018, texto: "un edificio con" },
      { desde: 1041, texto: "operación hotelera", estilo: "acento" },
      { desde: 1076, texto: "activa." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos070Srt = segmentosDe(subtitulos070, FPS_070);
