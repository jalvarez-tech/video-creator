/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 025 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con un acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/025/voz/*.txt`: lo escribo yo, que whisper oye «y prefiera crear» donde el guion dice «prefiere») y los tiempos, de la voz (`trozos-editoriales.mjs --audio`,
 * con el `--en`, el `--desde` y el `--s0` de cada toma); después se llevan a su palabra con `lineas-vs-onsets.py` (R31).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la casa, RC23): el primer subtítulo entra en el f118, con la voz de Isabella, 13 f después de que su
 * imagen sea opaca (f105). El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido025.tsx`) y no un bloque de texto. NINGUNA cifra en la pieza.
 *
 * EL CTA ES LA 2.ª MITAD DE CT03 (decisión del usuario): aquí no hay «Está disponible por 3.550 millones»: no suena y no se escribe.
 *
 * PALABRAS CERRADAS POR MEDIDA, SIN OÍR (R31; dicen el segundo exacto para que se compruebe al oído antes de publicar):
 *   «¿Alguien…» (MD11, f506, 1,00 s de la toma = 16,9 s del vídeo): whisper la oye «¿Alguien» (conf. 0,31) tras 0,91 s de silencio y el catálogo proponía «¿(Eres) alguien…». Se mide: tres onsets (1,000 · 1,185 · 1,350 s) = al-guien-que, sin
 *     las dos sílabas de «eres» delante, y los cortes desde 1,00 y 1,185 s empiezan por «alguien»: NO hay «eres».
 *   «prefiere» (MD11, f558, 2,80 s de la toma = 18,6 s del vídeo; su vocal final, en f574 = 19,1 s): whisper la oye «prefiera» (conf. 0,46) y el guion dice «prefiere». `formantes.py`: la vocal final (3,235-3,295 s) mide F1 650-777 y F2 1.940-1.980 Hz,
 *     como la [e] de «fie» (F1 560-600, F2 2.020-2.060) y lejos de las [a] de esta toma (F2 1.100-1.550): «prefiere».
 *   «específico» (HK09, f199, 3,59 s de la toma = 6,6 s del vídeo): 5 de 5 cortes (3,33-3,59 s) dan «específico»; el de 3,71 s ya pierde «es-pe» («cívico»).
 *   «escríbeme» y «conocerlo» (CT03, f855 = 28,5 s y f878-906 = 29,3-30,2 s): los cortes desde 3,965 y 4,155 s empiezan por «escríbeme» y los de 4,40, 4,735 y 5,11 s dan «y ven a conocerlo»/«conocerlo» (whisper da conf. 0,05 al final de la frase, que es su pausa).
 *
 * POR CONFIRMAR AL OÍDO (la orden de exportar, si llega con estas sin oír, no se bloquea: la medida está arriba y la nota se queda; la puerta con `--final` falla SOLO por ella):
 *   · «prefiere» (MD11, f574; 19,1 s del vídeo): si suena «prefiera», cambiar el trozo `m02` «y prefiere crear», `voz/md11.txt`, el `dice` de `c06-mitad` y el `.srt`.
 *   · el arranque «¿Alguien…» (MD11, f506; 16,9 s): si suena «¿Eres alguien…», cambiar el trozo `m01`, `voz/md11.txt`, el `dice` y el `.srt`.
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_025 } from "./metraje-025";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las ocho versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_025 = 8;

export const subtitulos025: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK09): imagen opaca desde el f105, primera palabra en el f119,5 ──
  {
    id: "h01",
    hasta: 187,
    trozos: [
      { desde: 118, texto: "Esta propiedad" },
      { desde: 139, texto: "tiene sentido" },
      { desde: 160, texto: "para un comprador" },
    ],
  },
  { id: "h02", hasta: 223, trozos: [{ desde: 187, texto: "muy específico.", estilo: "acento" }] },
  // ── Bloque 4 · la mitad DICHA (MD11): imagen opaca desde el f495, primera palabra en el f506 ──
  {
    id: "m01",
    hasta: 558,
    trozos: [
      { desde: 504, texto: "¿Alguien que valora" },
      { desde: 527, texto: "la arquitectura", estilo: "acento" },
    ],
  },
  {
    id: "m02",
    hasta: 634,
    trozos: [
      { desde: 558, texto: "y prefiere crear" },
      { desde: 594, texto: "sus propios" },
      { desde: 613, texto: "acabados?", estilo: "acento" },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT03, 2.ª mitad): imagen opaca desde el f847, primera palabra en el f854,8 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 915,
    trozos: [
      { desde: 853, texto: "escríbeme", estilo: "acento" },
      { desde: 876, texto: "y ven a conocerlo." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos025Srt = segmentosDe(subtitulos025, FPS_025);
