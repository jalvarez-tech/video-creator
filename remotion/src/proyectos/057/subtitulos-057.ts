/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 057 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/057/voz/*.txt`: lo escribo yo con lo que se OYE, comprobado por cortes) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31). Cada línea entra 0-3 f ANTES de su palabra (la primera de cada toma, en el frame en que su imagen ya es opaca o en su primera sílaba).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la apertura, DR03): el primer subtítulo entra en el f85, con la imagen de Isabella (opaca desde el f72),
 * en su primera sílaba. El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido057.tsx`) y no un bloque de texto.
 *
 * NINGUNA CIFRA EN PANTALLA: las tres frases de Isabella no dicen ninguna. La ficha (60 m², 2 alcobas, 2 baños, parqueadero) y el precio no van en pantalla en el reel (van al caption y a la versión con ficha).
 *
 * EL ACENTO MARCA LA PAZ Y LA ACCIÓN (el ángulo de la pieza): «paz?» (el hook, la promesa), «descansaste?» (la mitad, la pregunta que lo vuelve personal) y «Agenda tu visita» (el CTA: el acento va en la palabra de la
 * acción, como manda el formato; «tranquilidad» queda en la línea base). Solo hay uno por bloque y entre dos hay ≥ 2 s: f138 · f562 · f916.
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 72, desde 15 f)    «Buscas» 0,92 · «donde» ≈ 1,58 · «realmente» 1,82 · «se respire» 2,14-2,25 · «paz» 2,77 · «Este» 3,23 · «apartamento» ≈ 3,5 · «es eso» ≈ 3,98
 *   mitad (en 460, desde 12 f)  «Cuándo» 0,72 · «última» 1,25 · «vez» 1,63 · «llegaste» ≈ 1,88 · «y sentiste» 2,74-2,84 · «que» 3,175 · «de verdad» 3,31-3,62 · «descansaste» 3,865
 *   CTA (en 905, desde 12 f)    «Agenda» 0,76 · «tu» 1,295 · «visita» 1,495 · «y vive» 1,72 · «experiencia» 2,17 · «de la tranquilidad» ≈ 2,6 · «en persona» 3,34
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · «de verdad» (MD06, f545 = 18,2 s del vídeo): whisper small se come el «de» y escribe «sentiste que verdad descansaste». Se pinta «de verdad» (la gramática y el catálogo de la sesión madre lo dan así). Medido
 *     (`envolvente-voz.py` a 10 ms): entre el «que» (3,17-3,21 s) y la /d/ de «dad» (cierre a 3,54-3,60 s, estallido a 3,62) hay 0,40 s de voz seguida, tiempo de sobra para «de ver» (dos sílabas a ≈ 0,13 s, el ritmo de ella en
 *     esta toma, 27 sílabas en 3,5 s) y justo para una sola sílaba larga; los formantes no distinguen «de» de «ve» (las dos llevan /e/). No se cierra sin oír.
 *   · «vive» (CT02, f943 = 31,4 s del vídeo): whisper small oye «y ve la experiencia» (las dos veces que se transcribe, desde el principio de la toma y desde ese punto). Se pinta «vive» (el encargo y el catálogo de la sesión
 *     madre lo dan así, y «vive la experiencia» es la fórmula habitual del canal). Medido (`envolvente-voz.py` y `formantes.py`, 1,72-2,01 s): la energía de «y vive/ve la» tiene DOS picos (1,815 y 1,975 s), lo que
 *     favorece «y ve la» (un pico de «y-ve» y otro de «la»); los formantes dan en cambio dos fotogramas de /i/ (F2 ≈ 2.440-2.740 Hz a 1,725 y 1,785 s) separados por tramos de F2 ≈ 700-800 Hz (la /b/ aproximante) y
 *     luego la /e/ a 1,885-1,925 s (F1 ≈ 500-550, F2 ≈ 2.250), lo que favorece «y vi-ve». Con una resolución de 20 ms y un ritmo de ≈ 0,1 s por sílaba, las dos lecturas caben: la medida NO cierra la palabra. No se cierra sin oír.
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_057 } from "./metraje-057";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_057 = 8;

export const subtitulos057: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK01): imagen opaca desde el f72, primera sílaba en el f85 ──
  {
    id: "h01",
    hasta: 154,
    trozos: [
      { desde: 85, texto: "¿Buscas un lugar" },
      { desde: 102, texto: "donde realmente se respire" },
      { desde: 138, texto: "paz?", estilo: "acento" },
    ],
  },
  { id: "h02", hasta: 196, trozos: [{ desde: 154, texto: "Este apartamento" }, { desde: 174, texto: "es eso." }] },
  // ── Bloque 4 · la mitad DICHA (MD06): imagen opaca desde el f460, primera palabra en el f470 ──
  {
    id: "m01",
    hasta: 528,
    trozos: [
      { desde: 470, texto: "¿Cuándo fue la" },
      { desde: 484, texto: "última vez que" },
      { desde: 502, texto: "llegaste a casa" },
    ],
  },
  {
    id: "m02",
    hasta: 584,
    trozos: [
      { desde: 528, texto: "y sentiste que" },
      { desde: 545, texto: "de verdad" },
      { desde: 562, texto: "descansaste?", estilo: "acento" },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT02): imagen opaca desde el f905, primera palabra en el f916 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 969,
    trozos: [
      { desde: 916, texto: "Agenda tu visita", estilo: "acento" },
      { desde: 943, texto: "y vive la experiencia" },
    ],
  },
  {
    id: "c02",
    hasta: 1008,
    trozos: [
      { desde: 969, texto: "de la tranquilidad" },
      { desde: 991, texto: "en persona." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos057Srt = segmentosDe(subtitulos057, FPS_057);
