/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 074 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cinco palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/074/voz/*.txt`: lo escribo yo con lo que se OYE, comprobado por cortes aislados) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31). Cada línea entra 0-3 f ANTES de su palabra (la primera de cada toma, en el frame en que ella empieza a hablar).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la apertura, DR06): el primer subtítulo entra en el f109, con la imagen de Isabella (opaca desde el f90),
 * en el frame de su primera sílaba (f109,2). El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido074.tsx`) y no un bloque de texto.
 *
 * NO HAY CIFRAS EN PANTALLA: las tres frases de Isabella no dicen ninguna.
 *
 * LO QUE DICE SU VOZ: «las buenas inversiones empiezan con buenas decisiones» y «una ubicación estratégica, amenidades y cercanía a los principales destinos turísticos»; ninguna promete valorización ni rentabilidad
 * y ninguna dice qué exige la norma ni que la suite la cumpla. Los acentos son la decisión («buenas decisiones.»), el tema de la pieza («amenidades») y el nombre del edificio («Go Living Suites.»), uno por toma y con
 * más de 10 s entre dos de ellos.
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 90, desde 12 f)   «Las buenas» 1,045 · «empiezan» 2,29 · «buenas» 3,145 (de 2,97 a 3,145 hay un silencio de 0,17 s tras «con»)
 *   mitad (en 440, desde 0)    «Una ubicación» 0,67 · «amenidades» ≈ 1,80 · «y cercanía» 3,145 · «destinos» 4,20
 *   CTA (en 929, desde 8 f)    «Conoce» 0,70 · «y mucho más en» ≈ 1,325 · «Go Living Suites» ≈ 2,24
 * El DTW de whisper iba de 5 a 10 f por delante en varias líneas («empiezan con», «y cercanía», «destinos»): lo que vale es la envolvente de la voz sola (arranques de sílaba tras cada pausa, `onsets-voz.py`) y lo
 * que oye whisper al cortar la voz desde cada arranque (`palabras-desde.py`).
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · «estratégica» (MD09, f458-f492 = 15,3-16,4 s del vídeo): whisper la oye con confianza 0,24 («estrategica», «técnica» según el corte).
 *   · «esto» (CT12, f940-f958 = 31,3-31,9 s): whisper oye «eso» (0,03-0,34); el guion dice «esto».
 *   · «Go Living Suites» (CT12, f988 = 32,9 s): whisper oye «Goblin en Suiz», «Governing suits»…; el anuncio dice «Go Living Suites». Es el nombre propio del edificio.
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_074 } from "./metraje-074";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_074 = 8;

export const subtitulos074: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK09): imagen opaca desde el f90, primera sílaba en el f109,2 ──
  {
    id: "h01",
    hasta: 205,
    trozos: [
      { desde: 109, texto: "Las buenas inversiones" },
      { desde: 145, texto: "empiezan con" },
      { desde: 170, texto: "buenas decisiones.", estilo: "acento" },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD09): entra a corte en el f440, primera palabra en el f458 ──
  {
    id: "m01",
    hasta: 533,
    trozos: [
      { desde: 458, texto: "Una ubicación estratégica," },
      { desde: 493, texto: "amenidades", estilo: "acento" },
    ],
  },
  {
    id: "m02",
    hasta: 608,
    trozos: [
      { desde: 533, texto: "y cercanía a los principales" },
      { desde: 564, texto: "destinos turísticos." },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT12): entra a corte en el f929, primera palabra en el f941,4 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 1019,
    trozos: [
      { desde: 940, texto: "Conoce esto" },
      { desde: 959, texto: "y mucho más en" },
      { desde: 988, texto: "Go Living Suites.", estilo: "acento" },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos074Srt = segmentosDe(subtitulos074, FPS_074);
