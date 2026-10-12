/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 027 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con un acento por frase como mucho (skill `recorrido-luxur`,
 * `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps. Las tres tomas ya se publicaron (vía a): el texto es el de su guion marcado
 * (`proyectos/027/voz/hk2.txt` de la V6, `md3.txt` de la V7 y `ct4.txt` de la V10) y los tiempos, los que esas versiones llevaron a su palabra con la energía de la voz sola (R31), desplazados al `en`
 * y al `desde` de esta pieza (un desplazamiento entero de frames: HK2 −5 f respecto de la V6; MD3 −84 f respecto de la V7; CT4 −157 f respecto de la V10) y comprobados otra vez sobre la voz sola
 * (`herramientas/lineas-vs-onsets.py`).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PIEZA ABRE CON ISABELLA (como la V6-V10, por encargo del usuario) y su primer subtítulo
 * entra en el f6, con su voz (la primera palabra suena en el f6,4): rompe a propósito la regla fija «la primera toma sale sin texto ni voz» (declarado en la puerta: `ABRE_CON_EL_HOOK`). El cierre
 * lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido027.tsx`) y no un bloque de texto. NINGUNA cifra en la pieza («dos habitaciones», en palabra, como en la V7).
 *
 * PALABRAS CERRADAS POR MEDIDA, SIN OÍR (R31; heredadas de sus versiones; dicen el segundo exacto para que se compruebe al oído antes de publicar):
 *
 *   «balcón» (MD3, f520-528 de la comp = 3,21-3,44 s del clip = 17,3-17,6 s del vídeo): heredada de la V7; conf. 0,17 en el DTW, pero 4 de 5 cortes oyen «Balcón» y el sentido de la frase la fija.
 *   «gustó» (CT4, ≈ f903-909 = 46,05-46,25 s de RC14 = 30,1-30,3 s del vídeo): heredada de la V10; la vocal tónica mide una /o/ (F1 ≈ 640, F2 ≈ 1.130 Hz); whisper alterna «gustó / gusta / guste».
 *   «contáctame» (CT4, f988-1002 = 48,87-49,35 s de RC14 = 32,9-33,4 s del vídeo): heredada de la V10 (y de la V8 en CT1); su última sílaba mide una [e] a −55 dB; whisper oye «contactame».
 *
 * POR CONFIRMAR AL OÍDO (la puerta con `--final` falla SOLO por esta nota, y se queda hasta que el usuario las oiga):
 *   · «balcón» (MD3, f520; ≈ 17,3 s del vídeo): si suena distinto, el trozo `m02` «balcón», `voz/md3.txt`, el `dice` de `c07-mitad` y el `.srt`.
 *   · «gustó» (CT4, f893; ≈ 30,1 s del vídeo): si suena «gusta», el trozo `c01` «Si te gustó», `voz/ct4.txt`, el `dice` de `c12-cta` y el `.srt`.
 *   · la última sílaba de «contáctame» (CT4, f988; ≈ 33,4 s del vídeo): mide una [e] débil; si suena «a mí», el trozo `c03` «contáctame.», `voz/ct4.txt`, el `dice` de `c12-cta` y el `.srt`.
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_027 } from "./metraje-027";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las diez versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la
 * composición (1080×1920) que se le restan a las líneas de acento, de 99 px a 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas
 * siguen como estaban.
 */
export const ACENTO_MENOS_027 = 8;

export const subtitulos027: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK2, el de la V6): ABRE la pieza: su imagen es opaca desde el f0 y la primera palabra suena en el f6,4 (el hook va con la música ya bajo su voz) ──
  {
    id: "h01",
    hasta: 63,
    trozos: [
      { desde: 6, texto: "Si para ti" },
      { desde: 22, texto: "un apartamento" },
      { desde: 36, texto: "sin balcón,", estilo: "acento" },
    ],
  },
  { id: "h02", hasta: 90, trozos: [{ desde: 63, texto: "no es opción," }] },
  { id: "h03", hasta: 122, trozos: [{ desde: 93, texto: "mira esto." }] },
  // ── Bloque 4 · la mitad DICHA (MD3, la de la V7): imagen opaca desde el f442, primera palabra en el f456,7 ──
  {
    id: "m01",
    hasta: 518,
    trozos: [
      { desde: 457, texto: "Cuenta con" },
      { desde: 468, texto: "dos habitaciones" },
      { desde: 484, texto: "independientes,", estilo: "acento" },
    ],
  },
  {
    id: "m02",
    hasta: 588,
    trozos: [
      { desde: 520, texto: "balcón" },
      { desde: 528, texto: "y ubicación junto a" },
      { desde: 569, texto: "City Plaza.", estilo: "acento" },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT4, RC14, el de la V10): imagen opaca desde el f866, primer sonido en el f878,6 y primera sílaba en el f893 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 934,
    trozos: [
      { desde: 893, texto: "Si te gustó" },
      { desde: 910, texto: "este apartamento" },
    ],
  },
  {
    id: "c02",
    hasta: 986,
    trozos: [
      { desde: 936, texto: "y deseas tener" },
      { desde: 968, texto: "más información," },
    ],
  },
  { id: "c03", hasta: 1011, trozos: [{ desde: 988, texto: "contáctame.", estilo: "acento" }] },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos027Srt = segmentosDe(subtitulos027, FPS_027);
