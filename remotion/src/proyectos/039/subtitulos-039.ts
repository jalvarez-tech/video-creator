/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 039 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/039/voz/*.txt`: lo escribo yo con lo que se OYE, comprobado por cortes) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31: en el 030 iba 3-16 f tarde a mitad de frase; aquí, 4-10 f). Cada línea entra 1 f ANTES de su palabra.
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la bajada de la nube, DR104): el primer subtítulo entra en el f62, con la voz de Isabella, 8 f después
 * de que su imagen aparezca (f54). El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido039.tsx`) y no un bloque de texto. NINGUNA cifra en la pieza.
 *
 * EL ACENTO MARCA EL GOLPE (pedido del encargo: «el acento de cada bloque cae en la palabra que contradice o que pide la acción»):
 *   «desconectado?»    la palabra que CONTRADICE el campo (el hook): lo que el que quiere campo teme, dicho en cursiva.
 *   «dos entradas»     la respuesta a «desconectado»: el HECHO de la mitad (no «por completo»: eso es énfasis, no dato).
 *   «escríbeme lote»   la ACCIÓN del CTA (una sola, de UNA palabra).
 *   Solo hay uno por bloque y entre dos hay ≥ 2 s (el validador lo exige): «desconectado?» (f114) · «dos entradas» (f523) · «escríbeme lote» (f916). «Vente, te muestro.» va en base: el acento del hook ya lo tiene la tensión.
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + s·30 − desde·30):
 *   hook (en 54, desde 52 f)   «¿Quieres» 2,035 s · «pero» 2,820 · «desconectado» 3,735 (tras la pausa de 3,64-3,76) · «Vente» 4,670 (tras la pausa de 4,32-4,68) · «te muestro» 4,855 / 5,235
 *   mitad (en 506, desde 6 f)  «Tener» 0,495 · «dos» 0,795 · «puede» 1,655 (tras la pausa de 1,44-1,66) · «la» 2,700 · «disfrutas» 4,025
 *   CTA (en 872, desde 3 f)    «Si» 0,400 · «escríbeme» 1,605 (tras la pausa de 1,44-1,60) · «y» 2,595 · «toda» 3,085
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ella):
 *   · «vente, te muestro.» (HK02, «te» hacia el f148 = 4,9 s del vídeo): whisper oye «venta y muestro», «vente maestro»: la «te» de «te muestro» se pega a la de «vente» (como en el HK03 de la V18). Entre 4,670 y
 *     5,34 s hay tres arranques de sílaba (4,670 · 4,855 · 5,235): «ven-te-mues-tro». Se pinta «te muestro» (lo que dice la frase) y se oye antes de publicar.
 *   · «por completo» (MD05, f575 = 19,2 s): whisper oye «con completo» (como en el registro). Se pinta «por completo» (lo que dice la frase en el registro).
 *   · «lote» (MD05, f638 = 21,3 s): whisper oye «note». Se pinta «lote» (el nombre del producto: «disfrutas un lote»).
 *   · «escríbeme lote» (CT02, f917 y f941 = 30,6 y 31,4 s): whisper oye «escríeme elote». Se pinta «escríbeme lote» (la acción de la ficha: «escríbeme lote y te envío toda la información»).
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_039 } from "./metraje-039";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_039 = 8;

export const subtitulos039: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK02): imagen desde el f54, primera palabra en el f63 ──
  {
    id: "h01",
    hasta: 140,
    trozos: [
      { desde: 62, texto: "¿Quieres campo," },
      { desde: 86, texto: "pero no quieres estar" },
      { desde: 113, texto: "desconectado?", estilo: "acento" },
    ],
  },
  { id: "h02", hasta: 166, trozos: [{ desde: 141, texto: "Vente, te muestro." }] },
  // ── Bloque 4 · la mitad DICHA (MD05): imagen desde el f506, primera palabra en el f515 ──
  {
    id: "m01",
    hasta: 579,
    trozos: [
      { desde: 514, texto: "Tener" },
      { desde: 523, texto: "dos entradas", estilo: "acento" },
      { desde: 549, texto: "puede cambiar por completo" },
    ],
  },
  {
    id: "m02",
    hasta: 643,
    trozos: [
      { desde: 580, texto: "la forma en la que" },
      { desde: 620, texto: "disfrutas un lote." },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT02): imagen desde el f872, primera palabra en el f881 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 945,
    trozos: [
      { desde: 880, texto: "Si quieres conocerlo," },
      { desde: 916, texto: "escríbeme lote", estilo: "acento" },
    ],
  },
  {
    id: "c02",
    hasta: 990,
    trozos: [
      { desde: 946, texto: "y te envío" },
      { desde: 961, texto: "toda la información." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos039Srt = segmentosDe(subtitulos039, FPS_039);
