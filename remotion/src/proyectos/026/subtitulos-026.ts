/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 026 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con un acento por frase como mucho (skill `recorrido-luxur`,
 * `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps. El texto sale del guion marcado (`proyectos/026/voz/*.txt`: lo
 * escribo yo, que whisper oye «vente monstruo» y «contactame» donde se dijo «ven, te muestro» y «contáctame») y los tiempos, de la ENERGÍA de la voz sola
 * (`onsets-voz.py`: silencios de −58/−60 dB antes de cada frase; `herramientas/lineas-vs-onsets.py` los compara con cada línea) y de cortes acotados de la toma entre pausas
 * (`transcribir.mjs` sobre 1,70-2,90 · 3,15-4,05 · 4,00-5,50 · 5,50-6,50 s de RC14): el DTW de whisper iba entre 0,1 y 0,4 s PRONTO en cinco líneas del hook y del CTA (R31).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PIEZA ABRE CON ISABELLA (como la V6-V8, por encargo del usuario) y su primer subtítulo
 * entra en el f6, con su voz (la primera sílaba suena en el f6,5): rompe a propósito la regla fija «la primera toma sale sin texto ni voz» (declarado en la puerta: `ABRE_CON_EL_HOOK`). El cierre
 * lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido026.tsx`) y no un bloque de texto. NINGUNA cifra en la pieza.
 *
 * PALABRAS CERRADAS POR MEDIDA, SIN OÍR (R31; dicen el segundo exacto para que se compruebe al oído antes de publicar):
 *
 *   «posibilidades» (HK5, f93-116 de la comp = 4,69-5,45 s de RC14 = 3,1-3,8 s del vídeo): la ventana 4,00-5,50 s la oye «posibilidades» (plural) y la de 3,0-6,5 s «posibilidad,»; tras la /a/ de «da» (F1 ≈ 800-870, F2 ≈ 1.800-1.950 Hz) los formantes
 *     pasan a una [e] (F1 ≈ 530-690, F2 ≈ 2.100-2.280 Hz), la sílaba «des». El análisis previo informó «posibilidad» (singular): corregido.
 *   «te muestro» (HK5, f126-141 = 5,79-6,31 s de RC14 = 4,2-4,7 s del vídeo): whisper la oye «vente monstruo / bente muestro / hay 20 muestros»; es la lectura que cuadra con «ven» (5,575 s) y dos sílabas más («mues-tro»).
 *   «gustó» (CT4, f1050-1060 = 46,05-46,25 s de RC14 = 34,7-35,0 s del vídeo): la vocal tónica mide una /o/ (F1 ≈ 640, F2 ≈ 1.130 Hz); whisper alterna «gustó / gusta / guste» según el corte.
 *   «contáctame» (CT4, f1145-1160 = 48,89-49,35 s de RC14 = 38,2-38,7 s del vídeo): whisper «contactame»; su última sílaba mide una [e] a −55 dB (como en la V8).
 *   «balcón» (MD2, f541-567 = 1,30-1,58 s del clip = 18,0-18,9 s del vídeo): HEREDADA de la V8, que la dejó sin oír; conf. 0,14-0,43 y la vocal tónica mide una /o/.
 *
 * POR CONFIRMAR AL OÍDO (la puerta con `--final` falla SOLO por esta nota, y se queda hasta que el usuario las oiga):
 *   · «posibilidades» (HK5, f93; ≈ 3,1 s del vídeo): si suena «posibilidad», cambiar el texto del trozo `h02` «más posibilidades.» (f93), `voz/hk5.txt`, el `dice` de `c02-hook` y el `.srt`.
 *   · «te muestro» (HK5, f126; ≈ 4,2 s del vídeo): si suena «te enseño» u otra, el trozo `h03` «te muestro.», `voz/hk5.txt`, el `dice` de `c02-hook` y el `.srt`.
 *   · «gustó» (CT4, f1050; ≈ 35 s del vídeo): si suena «gusta», el trozo `c01` «Si te gustó», `voz/ct4.txt`, el `dice` de `c12-cta` y el `.srt`.
 *   · la última sílaba de «contáctame» (CT4, f1145; ≈ 38,2 s del vídeo): mide una [e] débil; si suena «a mí», el trozo `c03` «contáctame.», `voz/ct4.txt`, el `dice` de `c12-cta` y el `.srt`.
 *   · «balcón» (MD2, f541; ≈ 18 s del vídeo): heredada de la V8; si suena distinto, el trozo `m01` «Aquí el balcón», `voz/md2.txt`, el `dice` de `c07-mitad` y el `.srt`.
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_026 } from "./metraje-026";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las ocho versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la
 * composición (1080×1920) que se le restan a las líneas de acento, de 99 px a 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas
 * siguen como estaban.
 */
export const ACENTO_MENOS_026 = 8;

export const subtitulos026: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK5, RC14): ABRE la pieza: su imagen es opaca desde el f0 y la primera palabra suena en el f6,5 (el hook va con la música ya bajo su voz) ──
  {
    id: "h01",
    hasta: 49,
    trozos: [
      { desde: 6, texto: "Hay apartamentos" },
      { desde: 25, texto: "para vivir" },
    ],
  },
  {
    id: "h02",
    hasta: 117,
    trozos: [
      { desde: 51, texto: "y hay otros" },
      { desde: 74, texto: "que te dan" },
      { desde: 93, texto: "más posibilidades.", estilo: "acento" },
    ],
  },
  {
    id: "h03",
    hasta: 152,
    trozos: [
      { desde: 119, texto: "Ven," },
      { desde: 126, texto: "te muestro." },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD2, la de la V8): imagen opaca desde el f533, primera palabra en el f540,5 ──
  {
    id: "m01",
    hasta: 623,
    trozos: [
      { desde: 541, texto: "Aquí el balcón" },
      { desde: 567, texto: "se convierte en" },
      { desde: 592, texto: "una extensión" },
    ],
  },
  {
    id: "m02",
    hasta: 654,
    trozos: [
      { desde: 625, texto: "de la" },
      { desde: 631, texto: "zona social.", estilo: "acento" },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT4, RC14): imagen opaca desde el f1023, primer sonido en el f1035,5 y primera sílaba en el f1050 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 1091,
    trozos: [
      { desde: 1050, texto: "Si te gustó" },
      { desde: 1067, texto: "este apartamento" },
    ],
  },
  {
    id: "c02",
    hasta: 1143,
    trozos: [
      { desde: 1093, texto: "y deseas tener" },
      { desde: 1125, texto: "más información," },
    ],
  },
  { id: "c03", hasta: 1168, trozos: [{ desde: 1145, texto: "contáctame.", estilo: "acento" }] },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos026Srt = segmentosDe(subtitulos026, FPS_026);
