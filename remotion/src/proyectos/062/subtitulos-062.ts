/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 062 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cinco palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/062/voz/*.txt`: lo escribo yo con lo que se OYE, comprobado por cortes aislados) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py` + `sibilantes.py`), no al DTW de whisper (R31). Cada línea entra 0-3 f ANTES de su palabra (la primera de cada toma, en el frame en que su imagen ya es opaca).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la apertura, ZC29): el primer subtítulo entra en el f110, con la imagen de Isabella (opaca desde el f95),
 * en el frame de su primera sílaba (f110,6). El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido062.tsx`) y no un bloque de texto.
 *
 * NO HAY CIFRAS EN PANTALLA: las tres frases de Isabella no dicen ninguna (los 24 m² y el precio van al caption y a la versión con ficha).
 *
 * LAS AFIRMACIONES DE MERCADO («el tercer mercado más grande de renta corta de Latinoamérica», «uno de los mejores barrios con mayor ocupación») las dice SU VOZ y aquí solo hay su transcripción, en base, SIN acento: nadie
 * ha verificado esas cifras. Los acentos son el tema («renta corta»), el sitio («Laureles») y la acción («y agendemos»), uno por bloque y con más de 10 s entre dos: f180 · f496 · f1028.
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 95, desde 0)      «Medellín» 0,52 · «el tercer» 1,365 · «más» ≈ 2,23 · «renta» 2,865 · «de Latinoamérica» ≈ 3,375
 *   mitad (en 483, desde 12 f) «Laureles» 0,87 · «es uno» ≈ 1,27 · «mejores» 2,195 · «con mayor» 2,905 · «en la ciudad» 3,925
 *   CTA (en 934, desde 24 f)   «Y tú» 1,24 · «para conocerlo» ≈ 2,09 · «Haz clic» 3,035 · «y agendemos» ≈ 3,98 · «una visita» 4,72
 * Los cortes de whisper se contradicen entre sí (el DTW puso «para conocerlo» 8 f antes de su palabra y «más grande» 5 f antes): lo que vale es la envolvente de la voz sola (arranques de sílaba y las /s/ de
 * «barrios», «enlace» y «agendemos», que marcan el final de cada una).
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · «mercado» (HK02, f134-f160 = 4,5-5,3 s del vídeo): whisper-small oye «buscado» en la toma entera y «mercado» cortando desde 1,2 · 1,35 · 1,64 s; la medida de las vocales (`proyectos/062/medidas/formantes-hook.txt`)
 *     da [e] (F1 ≈ 630, la «e» de «mer» antes de /r/) · silencio de 90 ms (/k/) · [a] · [o]: «mer-ca-do», no «bus-ca-do» (una [u] tendría F1 ≈ 300-400). Es la palabra que el encargo avisaba que había que oír.
 *   · «mejores» (MD02, f535 = 17,8 s del vídeo): el catálogo de la sesión madre NO la lleva («…uno de los barrios con mayor ocupación…»); whisper la oye en 6 de 7 cortes aislados y la envolvente pide 7 sílabas entre «uno» y «barrios».
 *   · «con mayor» (MD02, f557 = 18,6 s): whisper oye «como ayer»; la /s/ de «barrios» (2,80-2,86 s) y la pausa dejan «con» a 2,905 s y «ocupación» (o·cu·pa·ción) a 3,35-3,93 s.
 *   · «en la ciudad» (MD02, f587 = 19,6 s): whisper oye «en» en todos los cortes; el catálogo dice «de la ciudad».
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_062 } from "./metraje-062";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_062 = 8;

export const subtitulos062: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK02): imagen opaca desde el f95, primera sílaba en el f110,6; el último trozo se queda hasta el f226, cuando Isabella ya disuelve (rev. 2: el vídeo sigue un momento tras «Latinoamérica») ──
  {
    id: "h01",
    hasta: 158,
    trozos: [
      { desde: 110, texto: "Medellín, ya es" },
      { desde: 134, texto: "el tercer mercado" },
    ],
  },
  {
    id: "h02",
    hasta: 226,
    trozos: [
      { desde: 160, texto: "más grande de" },
      { desde: 180, texto: "renta corta", estilo: "acento" },
      { desde: 195, texto: "de Latinoamérica." },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD02): imagen opaca desde el f483, primera palabra en el f497,1 ──
  {
    id: "m01",
    hasta: 555,
    trozos: [
      { desde: 496, texto: "Laureles", estilo: "acento" },
      { desde: 508, texto: "es uno de los" },
      { desde: 535, texto: "mejores barrios" },
    ],
  },
  {
    id: "m02",
    hasta: 626,
    trozos: [
      { desde: 557, texto: "con mayor ocupación" },
      { desde: 587, texto: "en la ciudad de Medellín." },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT02): entra disolviendo y es opaco en el f934, primera palabra en el f946,9 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 998,
    trozos: [
      { desde: 946, texto: "¿Y tú qué esperas" },
      { desde: 971, texto: "para conocerlo?" },
    ],
  },
  {
    id: "c02",
    hasta: 1078,
    trozos: [
      // «y agendemos» entra 1,4 f antes de su «y» (3,98 s, f1029,4: tras la /s/ de «enlace», 3,92-3,96 s) y «una visita.» 1,6 f antes de su «u» (4,72 s, f1051,6: tras la /s/ de «agendemos», 4,68-4,70 s).
      { desde: 1000, texto: "Haz clic en el enlace" },
      { desde: 1028, texto: "y agendemos", estilo: "acento" },
      { desde: 1050, texto: "una visita." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos062Srt = segmentosDe(subtitulos062, FPS_062);
