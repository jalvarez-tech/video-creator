/**
 * LOS SUBTÍTULOS EDITORIALES DEL REEL 037 — `BloqueEditorial[]`. V20.
 *
 * Todo lo que Isabella dice en sus tres tomas (hook, mitad y CTA), en trozos de una a cuatro palabras, con un acento por frase (skill
 * `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps. Solo mientras ella habla: el dron y los
 * recorridos van sin texto.
 *
 * ESTE ARCHIVO NO SE ESCRIBE A MANO. El TEXTO sale del guion marcado (`proyectos/037/voz/<toma>.txt`) y los TIEMPOS, de la voz por palabra
 * (`proyectos/037/voz/palabras/IMG_xxxx.json`, whisper small por palabra con DTW):
 *
 *   node manuales/edicion-video/scripts/trozos-editoriales.mjs proyectos/037/voz/hk08.txt proyectos/037/voz/palabras/IMG_9418.json \
 *     --fps 30 --en 117 --desde 0.56667 --s0 0.83 --hasta 3.5 --audio remotion/public/recorrido-037/hk08.wav --prefijo h --tabla
 *   (md10: IMG_9528.json --en 429 --desde 0.7 --s0 0.975 --hasta 6.3 · ct08: IMG_9437-sinprompt.json --en 805 --desde 1.53333 --s0 1.79 --hasta 5.65)
 *
 *   h01-h02  el hook: «El error que cometen las familias al buscar campestre.» Acento: «El error» (el hilo entero).
 *   m01-m03  la mitad, una frase en tres bloques (nunca más de tres líneas a la vez). Acentos: «lejos,» y «dos veces» (a 3,5 s uno de otro).
 *   c01-c02  el CTA, dos frases. Acentos: «el mismo error.» (la orden) y «conocerla.» (la acción).
 *
 * POR CONFIRMAR AL OÍDO (`proyectos/037/combinaciones.md` tiene el segundo exacto de cada una): «El» (hook, 0,83 s), «Compran» (mitad, 0,975 s), «cansan»
 * (mitad, 2,205 s: whisper «acasan»; el reel editado `fam 1.mp4` subtitula «cansan»), el segundo «compran» (3,315 s), «tienen» (4,38 s), «No» (CTA, 1,80 s),
 * «cometas» (1,995 s) y «error» (CTA, ≈ 2,7-2,8 s: whisper «horror»).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0): la PRIMERA TOMA SALE SIEMPRE SIN TEXTO (el dron, f0-116, no lleva nada y el
 * primer texto entra en f125, con Isabella ya en pantalla) y el cierre lleva el LOGO, que es una imagen y no un bloque de texto.
 */
import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_037 } from "./metraje-037";

export const subtitulos037: readonly BloqueEditorial[] = [
  // ── El dron (f0-116) sale SIN TEXTO ──
  // ── c02 · el hook (primera palabra f125, última f204) ──
  {
    id: "h01",
    hasta: 172,
    trozos: [
      { desde: 125, texto: "El error", estilo: "acento" },
      { desde: 137, texto: "que cometen" },
      { desde: 147, texto: "las familias" },
    ],
  },
  { id: "h02", hasta: 210, trozos: [{ desde: 172, texto: "al buscar campestre." }] },
  // ── El recorrido 1 (f223-429) va sin texto ──
  // ── c05 · la mitad (primera palabra f437, última f596) ──
  {
    id: "m01",
    hasta: 503,
    trozos: [
      { desde: 437, texto: "Compran" },
      { desde: 448, texto: "lejos,", estilo: "acento" },
      { desde: 464, texto: "se cansan del viaje," },
    ],
  },
  {
    id: "m02",
    hasta: 553,
    trozos: [
      { desde: 507, texto: "compran viejo" },
      { desde: 531, texto: "y tienen que pagar" },
    ],
  },
  {
    id: "m03",
    hasta: 604,
    trozos: [
      { desde: 553, texto: "dos veces", estilo: "acento" },
      { desde: 569, texto: "en remodelación." },
    ],
  },
  // ── El recorrido 2 (f611-805) va sin texto ──
  // ── c08 · el CTA (primera palabra f813, última f927) ──
  {
    id: "c01",
    hasta: 858,
    trozos: [
      { desde: 813, texto: "No cometas" },
      { desde: 829, texto: "el mismo error.", estilo: "acento" },
    ],
  },
  {
    id: "c02",
    hasta: 935,
    trozos: [
      { desde: 862, texto: "Haz clic en el enlace" },
      { desde: 892, texto: "y ven a" },
      { desde: 908, texto: "conocerla.", estilo: "acento" },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos037Srt = segmentosDe(subtitulos037, FPS_037);
