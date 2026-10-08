/**
 * LOS SUBTÍTULOS EDITORIALES DEL REEL 029 — `BloqueEditorial[]`. Rev. 1.
 *
 * Todo lo que Isabella dice en sus tres tomas (hook, mitad y CTA), en trozos de una a cuatro palabras, con un acento por frase (skill
 * `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 *
 * ESTE ARCHIVO NO SE ESCRIBE A MANO. El TEXTO sale del guion marcado (`proyectos/029/voz/<toma>.txt`) y los TIEMPOS, de la voz por palabra
 * (`proyectos/029/voz/palabras/IMG_xxxx.json`, de `transcribir.mjs --palabras`):
 *
 *   node manuales/edicion-video/scripts/trozos-editoriales.mjs proyectos/029/voz/hk04.txt proyectos/029/voz/palabras/IMG_9407.json \
 *     --fps 30 --en 100 --desde 1.1667 --s0 1.2 --hasta 3.45 --audio remotion/public/recorrido-029/hk04.wav --prefijo h --tabla
 *
 * (una invocación por toma, con el `en` y el `desde` de su corte, `--s0` y `--hasta` de su ventana de voz y el WAV crudo). Lo que imprime se pega
 * aquí en orden. Después cada línea se lleva a su palabra con la voz SOLA (R31: `palabras-desde.py` dice qué palabra oye whisper primero desde
 * un candidato y `onsets-voz.py` da dónde sube la energía; el DTW de whisper iba entre 1 y 9 f pronto o tarde) y `lineas-vs-onsets.py` mide cuántos
 * frames antes de su palabra entra cada una (0-3 es lo bueno).
 *
 *   h01      el hook: «La casa que tu familia va a recordar siempre.» Acento: «recordar siempre».
 *   m01-m02  la mitad: «Pregúntate algo.» (sin acento) y «¿Qué recuerdos de infancia les estamos dando?» (acento: «de infancia»).
 *   c01-c02  el CTA: «Esta no es solo una casa, es patrimonio.» y «Haz clic en el enlace y agendemos tu visita.» (acentos: «es patrimonio», «tu visita»).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0): la PRIMERA TOMA SALE SIEMPRE SIN TEXTO (el dron, f0-100, no lleva nada y el
 * primer texto entra en f101, con la imagen de Isabella ya opaca) y el cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido029.tsx`) y
 * no un bloque de texto. En los dos recorridos tampoco hay texto: la casa se mira.
 *
 * POR CONFIRMAR AL OÍDO: «solo» en c01 («Esta no es solo una casa»). Whisper oye «esta no solo una casa» en esta toma (CT15) y «no es la una casa»
 * en su doble (CT16); el sentido y la cuenta de sílabas dicen «no es solo».
 */
import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_029 } from "./metraje-029";

export const subtitulos029: readonly BloqueEditorial[] = [
  // ── El dron (f0-100) sale SIN TEXTO ──
  // ── c02 · el hook ──
  {
    id: "h01",
    hasta: 174,
    trozos: [
      { desde: 101, texto: "La casa que" },
      { desde: 114, texto: "tu familia va a" },
      { desde: 140, texto: "recordar siempre.", estilo: "acento" },
    ],
  },
  // ── Los recorridos (f182-478 y f604-916) van sin texto ──
  // ── c06 · la mitad ──
  { id: "m01", hasta: 510, trozos: [{ desde: 479, texto: "Pregúntate algo." }] },
  {
    id: "m02",
    hasta: 583,
    trozos: [
      { desde: 511, texto: "¿Qué recuerdos" },
      { desde: 527, texto: "de infancia", estilo: "acento" },
      { desde: 544, texto: "les estamos dando?" },
    ],
  },
  // ── c10 · el CTA ──
  {
    id: "c01",
    hasta: 986,
    trozos: [
      { desde: 917, texto: "Esta no es solo" },
      { desde: 936, texto: "una casa," },
      { desde: 959, texto: "es patrimonio.", estilo: "acento" },
    ],
  },
  {
    id: "c02",
    hasta: 1063,
    trozos: [
      { desde: 987, texto: "Haz clic en el enlace" },
      { desde: 1029, texto: "y agendemos" },
      { desde: 1041, texto: "tu visita.", estilo: "acento" },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos029Srt = segmentosDe(subtitulos029, FPS_029);
