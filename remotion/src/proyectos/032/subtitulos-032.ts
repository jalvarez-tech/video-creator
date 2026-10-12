/**
 * LOS SUBTÍTULOS EDITORIALES DEL REEL 032 — `BloqueEditorial[]`. V16.
 *
 * Todo lo que Isabella dice en sus tres tomas (hook, mitad y CTA), en trozos de una a cuatro palabras, con un acento por frase (skill
 * `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps. Solo mientras ella habla: el dron y los
 * recorridos van sin texto.
 *
 * ESTE ARCHIVO NO SE ESCRIBE A MANO. El TEXTO sale del guion marcado (`proyectos/032/voz/<toma>.txt`) y los TIEMPOS, de la voz por palabra
 * (`proyectos/032/voz/palabras/IMG_xxxx.json`, de `transcribir.mjs --palabras`):
 *
 *   node manuales/edicion-video/scripts/trozos-editoriales.mjs proyectos/032/voz/hk02.txt proyectos/032/voz/palabras/IMG_9403.json \
 *     --fps 30 --en 109 --desde 0.7667 --s0 0.8 --hasta 3.85 --audio remotion/public/recorrido-032/hk02.wav --prefijo h --tabla
 *   (md01: --en 530 --desde 1.3 --s0 1.32 --hasta 3.36 · ct04: --en 990 --desde 0.8333 --s0 0.85 --hasta 3.16)
 *
 * Después cada línea se llevó a su palabra con la voz SOLA (R31): `palabras-desde.py` dice qué palabra oye whisper primero desde un candidato y
 * `onsets-voz.py` da dónde sube la energía. El DTW de whisper iba 1-3 f TARDE en cuatro líneas y se corrigieron a mano:
 *   «montañas,»            la palabra empieza en 2,20 s de la fuente (desde 2,18 whisper aún oye «con», desde 2,22 «montañas») → f151 (DTW: f154)
 *   «no con tráfico.»      arranque de 3,00 s (valle de −85 dB) → f175 (DTW: f177)
 *   «de esta casa.»        arranque de 2,585 s → f567 (DTW: f570)
 *   «virtual o presencial.» desde 1,70 s whisper aún oye «…río virtual», desde 1,80 «virtual»; la sílaba sube en 1,71 s → f1016 (DTW: f1021)
 * «crecer con» (f139, la palabra a 1,78-1,80 s) y «disfrutar» (f558, después de 2,20 s) caían bien.
 *
 *   h01-h02  el hook: «Tus hijos merecen crecer con montañas, no con tráfico.» Acento: «montañas» (el anhelo); «no con tráfico.» es el remate,
 *            en base y en su propio bloque.
 *   m01      la mitad: «La abuela también puede disfrutar de esta casa.» Acento: «disfrutar» (la promesa para ella; un solo bloque de tres líneas).
 *   c01      el CTA: «Solicita tu recorrido virtual o presencial.» Acento: «virtual o presencial» (la acción fácil, también para quien vive fuera).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0): la PRIMERA TOMA SALE SIEMPRE SIN TEXTO (el dron, f0-109, no lleva nada y el
 * primer texto entra en f110, con la imagen de Isabella ya opaca) y el cierre lleva el LOGO, que es una imagen y no un bloque de texto.
 */
import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_032 } from "./metraje-032";

export const subtitulos032: readonly BloqueEditorial[] = [
  // ── El dron (f0-109) sale SIN TEXTO ──
  // ── c02 · el hook (primera palabra f110, última f201) ──
  {
    id: "h01",
    hasta: 175,
    trozos: [
      { desde: 110, texto: "Tus hijos merecen" },
      { desde: 139, texto: "crecer con" },
      { desde: 151, texto: "montañas,", estilo: "acento" },
    ],
  },
  { id: "h02", hasta: 207, trozos: [{ desde: 175, texto: "no con tráfico." }] },
  // ── El recorrido 1 (f215-530) va sin texto ──
  // ── c06 · la mitad (primera palabra f531, última f591) ──
  {
    id: "m01",
    hasta: 597,
    trozos: [
      { desde: 531, texto: "La abuela también puede" },
      { desde: 558, texto: "disfrutar", estilo: "acento" },
      { desde: 567, texto: "de esta casa." },
    ],
  },
  // ── El recorrido 2 (f605-990) va sin texto ──
  // ── c11 · el CTA (primera palabra f991, última f1059) ──
  {
    id: "c01",
    hasta: 1065,
    trozos: [
      { desde: 991, texto: "Solicita tu recorrido" },
      { desde: 1016, texto: "virtual o presencial.", estilo: "acento" },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos032Srt = segmentosDe(subtitulos032, FPS_032);
