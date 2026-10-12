/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 030 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con un acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/030/voz/*.txt`: lo escribo yo, que whisper oye «acceso» donde se dice «accesos», «vía de veredal» donde el guion dice «vía veredal») y los tiempos, de la voz
 * (`trozos-editoriales.mjs --audio`, con el `--en`, el `--desde` y el `--s0` de cada toma); después se llevan a su palabra con `lineas-vs-onsets.py` (R31).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (el lote desde el aire, DR97): el primer subtítulo entra en el f108, con la voz de Isabella, 8 f después
 * de que su imagen aparezca (f100). El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido030.tsx`) y no un bloque de texto. NINGUNA cifra en la pieza.
 *
 * LOS ACENTOS, uno por bloque y ≥ 2 s entre dos: «encerrado,» (la tensión del hook), «Dos accesos» (el dato de la mitad), «vía veredal.» (la segunda entrada) y «escríbeme lote» (la acción: «lote» suena a los 2,28 s de la toma y solo dura 7 f antes de que siga «y te envío»; con la acción entera el acento se lee 23 f).
 *
 * LA FRASE DEL HOOK, «sentirse» (no «sentirte»): el guion dice lo que se OYE. Cuatro cortes distintos de la toma dan «no te gusta sentirse encerrado» con confianza 0,98; la señal no deja distinguir «-te» de «-se» (esta toma casi no
 * tiene sibilantes: el único tramo con energía > 3 kHz entre 3,0 y 3,7 s es la «s» de «gusta»), así que no hay una medida mejor que la de whisper.
 *
 * LOS TIEMPOS, a la palabra (R31): cada línea entra 0-3 f ANTES de su palabra, con el segundo de cada una medido sobre la voz SOLA (`onsets-voz.py`: los valles de −60 a −86 dB son las pausas) y comprobado con
 * `palabras-desde.py` (qué palabra es la primera que oye whisper desde ese instante). En la mitad y el CTA, el DTW de `trozos-editoriales.mjs` iba 3 a 16 f tarde (en la mitad, «uno por la parcelación» 1 f, «y otro por la» 9 f y
 * «vía veredal» 6 f): «y otro» empieza a los 3,015 s de la toma y «vía» a los 3,675.
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ella):
 *   · «vía veredal.» (MD02, f ≈ 671; 3,675 s de la toma = 22,4 s del vídeo): whisper la oye «vía de veredal» (conf. 0,45 en la «de»; en MD01, «vida veredal»). Cinco sílabas de «vía veredal» caben en 3,675-4,40 s a 145 ms por
 *     sílaba, como el resto de la frase (140); con la «de» serían seis a 120 ms. El guion pone «vía veredal».
 *   · «escríbeme» (CT01, f ≈ 1021; 1,765 s de la toma = 34,0 s del vídeo): whisper conf. 0,42 (0,16 en la toma doble CT02), y desde 1,6-1,9 s oye «escribí el melote», «escríeme elote», «suscríbete». Las cuatro sílabas ocupan
 *     1,765-2,2 s (≈ 110 ms cada una) y es la palabra de la acción: se oye antes de publicar.
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_030 } from "./metraje-030";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_030 = 8;

export const subtitulos030: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK04): imagen desde el f100, primera palabra en el f108 ──
  {
    id: "h01",
    hasta: 168,
    trozos: [
      { desde: 108, texto: "Si te gusta" },
      { desde: 119, texto: "la seguridad" },
      { desde: 132, texto: "de una parcelación," },
    ],
  },
  {
    id: "h02",
    hasta: 252,
    trozos: [
      { desde: 168, texto: "pero no te gusta sentirse" },
      { desde: 196, texto: "encerrado,", estilo: "acento" },
      { desde: 227, texto: "mira este lote." },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD02): imagen desde el f561, primera palabra en el f569 ──
  {
    id: "m01",
    hasta: 624,
    trozos: [
      { desde: 568, texto: "Dos accesos", estilo: "acento" },
      { desde: 594, texto: "para un mismo lote," },
    ],
  },
  {
    id: "m02",
    hasta: 697,
    trozos: [
      { desde: 624, texto: "uno por la parcelación" },
      { desde: 651, texto: "y otro por la" },
      { desde: 671, texto: "vía veredal.", estilo: "acento" },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT01): imagen desde el f980, primera palabra en el f989 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 1044,
    trozos: [
      { desde: 989, texto: "Si quieres conocerlo," },
      { desde: 1021, texto: "escríbeme lote", estilo: "acento" },
    ],
  },
  {
    id: "c02",
    hasta: 1090,
    trozos: [
      { desde: 1044, texto: "y te envío" },
      { desde: 1063, texto: "toda la información." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos030Srt = segmentosDe(subtitulos030, FPS_030);
