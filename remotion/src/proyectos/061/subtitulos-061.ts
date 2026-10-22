/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 061 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cinco palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/061/voz/*.txt`: lo escribo yo con lo que se OYE, comprobado por cortes) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31). Cada línea entra 0-3 f ANTES de su palabra (la primera de cada toma, en el frame de su primera sílaba).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la apertura, la pérgola): el primer subtítulo entra en el f84, con la imagen de Isabella (opaca desde el f73),
 * en el frame de su primera sílaba (f84,4). El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido061.tsx`) y no un bloque de texto.
 *
 * NO HAY CIFRAS EN PANTALLA: las tres frases de Isabella no dicen ninguna (los 24 m² y el precio van al caption y a la versión con ficha). Tampoco se escribe nada de permisos ni de rentabilidad que ella no diga:
 * «habilitado para rentas cortas» sale de la ficha de la web y de su voz.
 *
 * EL ACENTO MARCA EL ÁNGULO (la escasez del permiso): «rentas cortas» (el hook: de qué va el estudio), «pero pocos permiten» (la mitad: lo que hace rara a esta unidad) y «una visita.» (la acción del CTA). Solo hay
 * uno por bloque y entre dos hay ≥ 10 s: f180 · f567 · f994.
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30); medidos con `onsets-voz.py` y `palabras-desde.py` sobre la voz sola; el DTW de whisper iba de 2 a 8 f pronto):
 *   hook (en 73, desde 6 f)    «Te» 0,59 · «en» 2,24 (el DTW daba 2,00) · «habilitado» 2,89 · «rentas» 3,80 (el DTW, 3,52) · «en Medellín» ≈ 4,30
 *   mitad (en 473, desde 14 f) «En» 0,88 · «proyectos» 2,165 (el DTW, 2,04) · «pero» 3,59 · «permiten» 4,43 · «rentas cortas» 4,775
 *   CTA (en 929, desde 6 f)    «Haz» 0,57 · «y» 1,505 (el DTW, 1,78) · «una visita» 2,41 · «Puede ser» 3,34 (la «virtual o presencial» va en la misma línea: «Puede» y «virtual» están a 6 f)
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · «estudio» (HK04, f84-f133 = 2,8-4,4 s del vídeo): whisper oye «estudiante» y el catálogo de la sesión madre supone «[apartaestudio]». La palabra dura de 1,80 a 2,28 s de la toma: tres sílabas (a ≈ 0,2 s por
 *     sílaba en «Te presento este»; «apartaestudio» pediría ≈ 1,1 s), y su distancia DTW sobre MFCC al «estudio» de HOOK3 es 4,28 (misma palabra en dos tomas: 4,28-4,86; palabras distintas: 4,93-5,99). Apoya
 *     «estudio»; no lo cierra. Mediciones en `proyectos/061/medidas/` (`dtw-estudio.txt`).
 *   · «Laureles» (HK04, f133): whisper oye «Laurelis» (confianza 0,13 en «Lau»). Es el barrio y la ficha dice Laureles.
 *   · «presencial» (CT01, f1032): whisper oye «presenciar» (confianza 0,61 en «enc»); tras la [a] de la última sílaba no se ve una consonante: la /l/ final es débil. La ficha y la frase dicen «presencial».
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_061 } from "./metraje-061";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_061 = 8;

export const subtitulos061: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK04): imagen opaca desde el f73, primera sílaba en el f84,4 ──
  {
    id: "h01",
    hasta: 151,
    trozos: [
      { desde: 84, texto: "Te presento este estudio" },
      { desde: 133, texto: "en Laureles," },
    ],
  },
  {
    id: "h02",
    hasta: 219,
    trozos: [
      { desde: 153, texto: "habilitado para" },
      { desde: 180, texto: "rentas cortas", estilo: "acento" },
      { desde: 195, texto: "en Medellín." },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD04): imagen opaca desde el f473, primera palabra en el f485,4 ──
  {
    id: "m01",
    hasta: 565,
    trozos: [
      { desde: 485, texto: "En Medellín hay muchos" },
      { desde: 523, texto: "proyectos inmobiliarios," },
    ],
  },
  {
    id: "m02",
    hasta: 638,
    trozos: [
      { desde: 567, texto: "pero pocos permiten", estilo: "acento" },
      { desde: 602, texto: "rentas cortas." },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT01): entra a corte en el f929, primera palabra en el f940,1 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 1021,
    trozos: [
      { desde: 940, texto: "Haz clic en el botón" },
      { desde: 967, texto: "y agendemos" },
      { desde: 994, texto: "una visita.", estilo: "acento" },
    ],
  },
  {
    id: "c02",
    hasta: 1075,
    trozos: [{ desde: 1023, texto: "Puede ser virtual o presencial." }],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos061Srt = segmentosDe(subtitulos061, FPS_061);
