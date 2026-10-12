/**
 * LOS SUBTÍTULOS EDITORIALES DEL REEL 033 — `BloqueEditorial[]`. V17.
 *
 * Todo lo que Isabella dice en sus tres tomas (hook, mitad y CTA), en trozos de una a cuatro palabras, con un acento por frase (skill
 * `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps. Solo mientras ella habla: el dron y los
 * recorridos van sin texto.
 *
 * ESTE ARCHIVO NO SE ESCRIBE A MANO. El TEXTO sale del guion marcado (`proyectos/033/voz/<toma>.txt`) y los TIEMPOS, de la voz por palabra
 * (`proyectos/033/voz/palabras/IMG_xxxx.json`, whisper small por palabra con DTW):
 *
 *   node manuales/edicion-video/scripts/trozos-editoriales.mjs proyectos/033/voz/ct21.txt proyectos/033/voz/palabras/IMG_9422.json \
 *     --fps 30 --en 67 --desde 0.13333 --s0 0.43 --hasta 2.44 --audio remotion/public/recorrido-033/ct21.wav --prefijo h --tabla
 *   (md06: IMG_9448.json --en 422 --desde 0.6 --s0 0.865 --hasta 6.6 · ct18: IMG_9531-sinprompt.json --en 955 --desde 0.23333 --s0 0.495 --hasta 5.66)
 *
 * Después cada línea se llevó a su palabra con la voz SOLA (R31): `palabras-desde.py` dice qué palabra oye whisper primero desde un candidato y
 * `onsets-voz.py` da dónde sube la energía. Todas las líneas caen de 0 a 3 f antes de su palabra; dos se corrigieron a mano:
 *   «extrañas»   desde 5,26 s whisper oye aún «…siempre extrañas», desde 5,30 s «extranes»: la palabra empieza en ≈ 5,28 s → f562 (DTW: f565, TARDE)
 *   «lo mismo.»  desde 6,00 s whisper oye «es lo mismo», desde 6,04 s «lo mismo»: «lo» en ≈ 6,02 s → f583 (DTW: f582)
 * Comprobadas y bien: «dónde llegar?» (la palabra en 1,80-1,82 s, f117; línea en f116), «en el exterior,» (≤ 1,30 s), «y ahorraste,» (≈ 3,26-3,30 s),
 * «es una» (2,10 s), «dirección.» (≈ 2,40 s), «agendemos su visita.» (≈ 4,53 s).
 *
 *   h01      el hook: «Colombia te llama, ¿ya tienes dónde llegar?» Acento: «dónde llegar?» (el anhelo: tener a dónde volver).
 *   m01-m03  la mitad, una frase en tres bloques (nunca más de tres líneas a la vez). Acento: «extrañas» (lo que pesa).
 *   c01-c02  el CTA, dos frases. Acentos: «dirección.» (volver como algo concreto) y «agendemos su visita.» (la acción).
 *
 * POR CONFIRMAR AL OÍDO (`proyectos/033/combinaciones.md` tiene el segundo exacto de cada una): «trabajaste duro» (whisper: «trabajas seguro»),
 * «diciembres» y «extrañas lo mismo» (whisper: «extraño es lo mismo»), y «su visita» (el reel editado EXTRANJEROS 1 escribe «tu»).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0): la PRIMERA TOMA SALE SIEMPRE SIN TEXTO (el dron, f0-66, no lleva nada y el
 * primer texto entra en f76, con Isabella ya en pantalla) y el cierre lleva el LOGO, que es una imagen y no un bloque de texto.
 */
import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_033 } from "./metraje-033";

export const subtitulos033: readonly BloqueEditorial[] = [
  // ── El dron (f0-66) sale SIN TEXTO ──
  // ── c02 · el hook (primera palabra f76, última f135) ──
  {
    id: "h01",
    hasta: 141,
    trozos: [
      { desde: 76, texto: "Colombia te llama," },
      { desde: 105, texto: "¿ya tienes" },
      { desde: 116, texto: "dónde llegar?", estilo: "acento" },
    ],
  },
  // ── El recorrido 1 (f149-422) va sin texto ──
  // ── c06 · la mitad (primera palabra f430, última f601) ──
  { id: "m01", hasta: 471, trozos: [{ desde: 430, texto: "Llevas años" }, { desde: 442, texto: "en el exterior," }] },
  { id: "m02", hasta: 533, trozos: [{ desde: 479, texto: "trabajaste duro" }, { desde: 501, texto: "y ahorraste," }] },
  {
    id: "m03",
    hasta: 606,
    trozos: [
      { desde: 538, texto: "pero todos los diciembres" },
      { desde: 562, texto: "extrañas", estilo: "acento" },
      { desde: 583, texto: "lo mismo." },
    ],
  },
  // ── El recorrido 2 (f615-955) va sin texto ──
  // ── c11 · el CTA (primera palabra f963, última f1117) ──
  {
    id: "c01",
    hasta: 1044,
    trozos: [
      { desde: 963, texto: "Volver no es una idea," },
      { desde: 1010, texto: "es una" },
      { desde: 1019, texto: "dirección.", estilo: "acento" },
    ],
  },
  {
    id: "c02",
    hasta: 1123,
    trozos: [
      { desde: 1044, texto: "Haz clic" },
      { desde: 1052, texto: "en el enlace y" },
      { desde: 1084, texto: "agendemos su visita.", estilo: "acento" },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos033Srt = segmentosDe(subtitulos033, FPS_033);
