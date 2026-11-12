/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 071 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cinco palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/071/voz/*.txt`: lo escribo yo con lo que se OYE, comprobado por cortes aislados) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31). Cada línea entra 0-3 f ANTES de su palabra (la primera de cada toma, en el frame en que ella empieza a hablar).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la apertura, DR08): el primer subtítulo entra en el f100, con la imagen de Isabella (opaca desde el f86),
 * en el frame de su primera sílaba (f100). El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido071.tsx`) y no un bloque de texto.
 *
 * NO HAY CIFRAS EN PANTALLA: las tres frases de Isabella no dicen ninguna (los 28,5 m², el piso 9 y el precio van al caption y a la versión con ficha).
 *
 * LO QUE DICE SU VOZ Y AQUÍ SOLO TIENE TRANSCRIPCIÓN: «una suite hotelera con operadores turísticos listos para ti» es lo que el anuncio dice del edificio («delegar la operación a alguno de los operadores hoteleros
 * presentes»); ninguna frase promete valorización, rentabilidad ni ganancia ni dice qué exige el POT. Los acentos son lo que el hook rechaza («otro trabajo.»), lo que ofrece la mitad («operadores») y la acción del
 * CTA («opciones»): uno por toma y con más de 10 s entre dos (f157 · f515 · f841).
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 86, desde 13 f)  «Tu inversión» 0,90 · «no debería» ≈ 1,67 · «convertirse» ≈ 2,12 · «otro trabajo» ≈ 2,865
 *   mitad (en 457, desde 0)   «Una suite» 0,525 · «operadores» ≈ 1,975 · «turísticos» 2,49 · «listos» 3,18 · «para ti» 3,5
 *   CTA (en 790, desde 5 f)   «Hablemos» 0,58 · «opciones» ≈ 1,91 · «de inversión» ≈ 2,40
 * El DTW de whisper iba de 1 a 15 f por delante o por detrás («otro trabajo.» lo ponía en «trabajo», 15 f tarde; «no debería» y «listos para ti», 6 f pronto): lo que vale es la envolvente de la voz sola (arranques
 * de sílaba tras cada pausa, `onsets-voz.py`).
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · «Una suite hotelera» (MD06, f472-f515 = 15,7-17,2 s del vídeo): whisper oye «Un asfito atelera» (confianza baja) y solo desde «con» en adelante entiende la frase; la lectura sale del contexto (el anuncio, el CTA de
 *     esta suite y la métrica de sílabas: «u-na sui-te ho-te-le-ra» son 7 entre 0,53 y 1,52 s).
 *   · «todo» en el hook: el corte final de whisper oye «en todo otro trabajo»; los cortes parciales oyen «en otro trabajo». Se pintó «convertirse en otro trabajo».
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_071 } from "./metraje-071";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_071 = 8;

export const subtitulos071: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK08): imagen opaca desde el f86, primera sílaba en el f100 ──
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
      { desde: 157, texto: "otro trabajo.", estilo: "acento" },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD06): entra a corte en el f457, primera palabra en el f472,8 ──
  {
    id: "m01",
    hasta: 515,
    trozos: [{ desde: 472, texto: "Una suite hotelera con" }],
  },
  {
    id: "m02",
    hasta: 584,
    trozos: [
      { desde: 515, texto: "operadores", estilo: "acento" },
      { desde: 530, texto: "turísticos" },
      { desde: 551, texto: "listos para ti." },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT09): entra a corte en el f790, primera palabra en el f802,4 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 877,
    trozos: [
      { desde: 802, texto: "Hablemos y conoce tus" },
      { desde: 841, texto: "opciones", estilo: "acento" },
      { desde: 855, texto: "de inversión." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos071Srt = segmentosDe(subtitulos071, FPS_071);
