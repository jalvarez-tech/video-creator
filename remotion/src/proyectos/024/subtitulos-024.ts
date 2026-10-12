/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 024 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con un acento por bloque como mucho (skill `recorrido-luxur`,
 * `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps. El texto sale del guion marcado (`proyectos/024/voz/*.txt`: lo
 * escribo yo, que whisper oye «Balfolcín» y «contacta a mi» donde se dijo «balcón» y «contáctame») y los tiempos, de la voz (`trozos-editoriales.mjs --audio`, con el `--en`, el
 * `--desde` y el `--s0` de cada toma); después se llevan a su palabra con `lineas-vs-onsets.py` (R31).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PIEZA ABRE CON ISABELLA (como la V6 y la V7, por encargo del usuario) y su primer subtítulo
 * entra en el f7, con su voz: rompe a propósito la regla fija «la primera toma sale sin texto ni voz» (declarado en la puerta: `ABRE_CON_EL_HOOK`). El cierre
 * lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido024.tsx`) y no un bloque de texto. Una sola cifra en la pieza: los «76» del hook (permitidos por el usuario).
 *
 * EL CTA ES LA 2.ª FRASE DE CT1 (decisión del usuario): aquí no hay «Estamos en la Loma del Escobero, en Envigado»: no suena y no se escribe.
 *
 * PALABRAS CERRADAS POR MEDIDA, SIN OÍR (R31; dicen el segundo exacto para que se compruebe al oído antes de publicar): ver `proyectos/024/aprendizajes.md` y el plan 01:
 *
 *   «pueden» (HK1, f44, 1,64-1,95 s de la toma = 1,6 s del vídeo): conf. 0,94 en el DTW y 14 de 14 cortes de `palabras-desde.py` la oyen «pueden»/«Pueden».
 *   «balcón» (MD2, f432-458, 1,30-1,58 s de la toma = 14,4 s del vídeo): conf. 0,14-0,43; whisper la oye «Balfolcín»/«Valkulcian»/«pulsín»; la medida de sus vocales está en `aprendizajes.md`.
 *   «contáctame» (CT1, f924, 4,60-5,37 s de la toma = 30,8 s del vídeo): 4 de 8 cortes la oyen «contactame» y 5 de 8 «contacta a mi»; la medida de su última vocal está en `aprendizajes.md`.
 *
 * POR CONFIRMAR AL OÍDO (la orden de exportar llegó con estas tres sin oír; la puerta con `--final` falla SOLO por esta nota, y se queda hasta que el usuario las oiga):
 *   · «balcón» (MD2, f432-458; ≈ 14,4-15,3 s del vídeo): si suena distinto, cambiar el texto del trozo `m01` «Aquí el balcón» (f432), `voz/md2.txt`, el `dice` de `c07-mitad` y el `.srt`.
 *   · la última sílaba de «contáctame» (CT1, f924; ≈ 30,8 s): mide una [e] débil, no «mi»; si suena «a mí», cambiar el trozo `c02` «contáctame.», `voz/ct1.txt`, el `dice` de `c12-cta` y el `.srt`.
 *   · «pueden» (HK1, f44; ≈ 1,5 s): 14 de 14 cortes la oyen «pueden»; si suena otra cosa, el trozo `h01` «pueden sentirse», `voz/hk1.txt`, el `dice` de `c02-hook` y el `.srt`.
 *
 * TIEMPOS: el DTW de whisper iba entre 0,1 y 0,4 s PRONTO o TARDE en seis líneas («pueden sentirse», «bien distribuidos.», «se convierte en», «una extensión», «de la» y «más información,»);
 * se llevaron a su palabra con la energía de la voz sola (`onsets-voz.py`: silencio de −45/−60 dB antes de cada una) y los cortes de `palabras-desde.py` solo para la identidad (`lineas-vs-onsets.py`).
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_024 } from "./metraje-024";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las siete versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la
 * composición (1080×1920) que se le restan a las líneas de acento, de 99 px a 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas
 * siguen como estaban.
 */
export const ACENTO_MENOS_024 = 8;

export const subtitulos024: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK1): ABRE la pieza: su imagen es opaca desde el f0 y la primera palabra suena en el f6,8 (el hook va con la música ya bajo su voz) ──
  {
    id: "h01",
    hasta: 84,
    trozos: [
      { desde: 7, texto: "76 metros" },
      { desde: 44, texto: "pueden sentirse" },
      { desde: 66, texto: "muy diferentes" },
    ],
  },
  {
    id: "h02",
    hasta: 139,
    trozos: [
      { desde: 86, texto: "cuando están" },
      { desde: 102, texto: "bien distribuidos.", estilo: "acento" },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD2): imagen opaca desde el f424, primera palabra en el f431,5 ──
  {
    id: "m01",
    hasta: 514,
    trozos: [
      { desde: 432, texto: "Aquí el balcón" },
      { desde: 458, texto: "se convierte en" },
      { desde: 483, texto: "una extensión" },
    ],
  },
  {
    id: "m02",
    hasta: 545,
    trozos: [
      { desde: 516, texto: "de la" },
      { desde: 522, texto: "zona social.", estilo: "acento" },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT1, 2.ª frase): imagen opaca desde el f881, primera palabra en el f889,6 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 921,
    trozos: [
      { desde: 889, texto: "Si quieres" },
      { desde: 895, texto: "más información," },
    ],
  },
  { id: "c02", hasta: 953, trozos: [{ desde: 924, texto: "contáctame.", estilo: "acento" }] },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos024Srt = segmentosDe(subtitulos024, FPS_024);
