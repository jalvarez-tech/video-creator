/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 072 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cinco palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/072/voz/*.txt`: lo escribo yo con lo que se OYE, comprobado por cortes aislados) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31). Cada línea entra 0-3 f ANTES de su palabra (la primera de cada toma, en el frame en que ella empieza a hablar).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la apertura, DR05): el primer subtítulo entra en el f94, con la imagen de Isabella (opaca desde el f80),
 * en el frame de su primera sílaba (f94,1). El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido072.tsx`) y no un bloque de texto.
 *
 * NO HAY CIFRAS EN PANTALLA: las tres frases de Isabella no dicen ninguna (los 28,5 m², el piso 9 y el precio van al caption y a la versión con ficha).
 *
 * LOS NOMBRES DE LUGARES los dice SU VOZ y aquí solo hay su transcripción, en base y SIN acento: «Oviedo», «Santa Fe», «EAFIT» y «Aguacatala». Los acentos son la idea de cada toma («lo cambia todo.», «A minutos de»
 * y «por la ubicación.»), uno por toma y con más de 10 s entre dos.
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 80, desde 0)       «En inversión» 0,47 · «la ubicación» 1,805 · «lo cambia todo» 2,72
 *   mitad (en 467, desde 0)     «A minutos de» 0,475 · «Oviedo» ≈ 1,15 · «Santa Fe» 1,72 · «EAFIT» 2,555 · «y la estación Aguacatala» 3,195
 *   CTA (en 871, desde 12 f)    «Descubre» ≈ 0,78 · «en El Poblado» 1,725 · «y déjate asombrar» 2,595 · «por la ubicación» 3,565
 * El DTW de whisper iba de 3 a 7 f por delante en varias líneas («lo cambia todo», «Santa Fe», «en El Poblado», «y déjate»): lo que vale es la envolvente de la voz sola (arranques de sílaba tras cada pausa,
 * `onsets-voz.py`, y `palabras-desde.py` para saber qué palabra es).
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · «Oviedo» (MD08, f500 = 16,7 s del vídeo): whisper oyó «odio» (0,02) y «abierto» en un corte aislado; por el contexto —y el anuncio, que cita el C.C. Oviedo— se lee «Oviedo».
 *   · «EAFIT» (MD08, f542 = 18,1 s): whisper oyó «Eafid» y «Eafit» (0,34). **No está en el anuncio** (cita Oviedo, Santa Fe, la estación Aguacatala y la Milla de Oro): es una frase suya y se confirma.
 *   · «Aguacatala» (MD08, f561 = 18,7 s): whisper oyó «Acuacatala» (0,42); el anuncio escribe «Aguacatala» y su inicio exacto (3,56 s) es ambiguo entre «estación» y «Aguacatala».
 *   · «déjate» (CT11, f935 = 31,2 s): whisper oyó «déjate» con 0,05 y «hasta» en cortes aislados.
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_072 } from "./metraje-072";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_072 = 8;

export const subtitulos072: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK11): entra a corte en el f80, primera sílaba en el f94,1; el último trozo se queda hasta el f190, el fin del plano ──
  {
    id: "h01",
    hasta: 190,
    trozos: [
      { desde: 94, texto: "En inversión inmobiliaria," },
      { desde: 133, texto: "la ubicación" },
      { desde: 160, texto: "lo cambia todo.", estilo: "acento" },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD08): entra a corte en el f467, primera palabra en el f481,3 ──
  {
    id: "m01",
    hasta: 542,
    trozos: [
      { desde: 481, texto: "A minutos de", estilo: "acento" },
      { desde: 500, texto: "Oviedo," },
      { desde: 517, texto: "Santa Fe," },
    ],
  },
  {
    id: "m02",
    hasta: 600,
    trozos: [
      { desde: 542, texto: "EAFIT" },
      { desde: 561, texto: "y la estación Aguacatala." },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT11): entra disolviendo y es opaco en el f871, primera palabra en el f882,4 (el cierre es el logo, no un bloque de texto) ──
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
      { desde: 964, texto: "por la ubicación.", estilo: "acento" },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos072Srt = segmentosDe(subtitulos072, FPS_072);
