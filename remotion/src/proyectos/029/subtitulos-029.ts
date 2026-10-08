/**
 * LOS SUBTÍTULOS EDITORIALES DEL REEL 029 — `BloqueEditorial[]`.
 *
 * Todo lo que Isabella dice, en trozos de una a cuatro palabras, con un acento por frase (skill `recorrido-luxur`,
 * `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 *
 * ESTE ARCHIVO NO SE ESCRIBE A MANO. El TEXTO sale del guion marcado (`proyectos/029/voz/<toma>.txt`, uno por toma) y los
 * TIEMPOS, de la voz por palabra (`proyectos/029/voz/palabras/IMG_xxxx.json`, de `transcribir.mjs --palabras`):
 *
 *   node manuales/edicion-video/scripts/trozos-editoriales.mjs proyectos/029/voz/ct14.txt proyectos/029/voz/palabras/IMG_9516.json \
 *     --fps 30 --en 60 --desde 0.9 --s0 0.94 --hasta 2.45 --audio remotion/public/recorrido-029/ct14.wav --prefijo a --tabla
 *
 * (una invocación por toma, con el `en` y el `desde` de su corte, `--s0` y `--hasta` de su ventana de voz y el WAV crudo). Lo que
 * imprime se pega aquí en orden. Cada línea se lleva después a su palabra con la voz SOLA (R31: `herramientas/lineas-vs-onsets.py`).
 *
 *   a01…e01  las cinco frases de Isabella, una por plano: abajo, con el acento en lo emocional (pasa rápido · respirar distinto ·
 *            y privacidad · cómodos · es patrimonio).
 *   f01…f03  el último plano: «Volver no es una idea, es una dirección» y el clic. El acento del CTA va en la acción: «su visita».
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0): la PRIMERA TOMA SALE SIEMPRE SIN TEXTO (ningún bloque entra
 * antes de la primera palabra de Isabella, f61, y el frame 0, la miniatura, es la finca limpia) y el cierre lleva el LOGO, que es una
 * imagen (`LogoCierre` en `Recorrido029.tsx`) y no un bloque de texto.
 *
 * POR CONFIRMAR AL OÍDO: «solo» en e01 («Esta no es solo una casa»). Whisper oye «no es la una casa» en esta toma y «no solo una
 * casa» en la otra toma de la misma frase (IMG_9523); el sentido y la cuenta de sílabas dicen «solo».
 */
import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_029 } from "./metraje-029";

export const subtitulos029: readonly BloqueEditorial[] = [
  // ── La primera toma (f0-60) sale SIN TEXTO ──
  // ── c02 · «La infancia pasa rápido.» ──
  {
    id: "a01",
    hasta: 108,
    trozos: [
      { desde: 61, texto: "La infancia" },
      { desde: 79, texto: "pasa rápido.", estilo: "acento" },
    ],
  },
  // ── c03 · «Tu familia merece respirar distinto.» ──
  {
    id: "b01",
    hasta: 200,
    trozos: [
      { desde: 129, texto: "Tu familia merece" },
      { desde: 159, texto: "respirar distinto.", estilo: "acento" },
    ],
  },
  // ── c04 · «Diseño moderno, naturaleza y privacidad.» ──
  {
    id: "c01",
    hasta: 298,
    trozos: [
      { desde: 215, texto: "Diseño moderno," },
      { desde: 246, texto: "naturaleza" },
      { desde: 258, texto: "y privacidad.", estilo: "acento" },
    ],
  },
  // ── c05 · «Una casa donde todos caben cómodos.» ──
  {
    id: "d01",
    hasta: 387,
    trozos: [
      { desde: 315, texto: "Una casa donde" },
      { desde: 346, texto: "todos caben" },
      { desde: 361, texto: "cómodos.", estilo: "acento" },
    ],
  },
  // ── c06 · «Esta no es solo una casa, es patrimonio.» ──
  {
    id: "e01",
    hasta: 482,
    trozos: [
      { desde: 399, texto: "Esta no es solo" },
      { desde: 426, texto: "una casa," },
      { desde: 449, texto: "es patrimonio.", estilo: "acento" },
    ],
  },
  // ── c07 · «Volver no es una idea, es una dirección. Haz clic en el enlace y agendemos su visita. Puede ser virtual o presencial.» ──
  {
    id: "f01",
    hasta: 577,
    trozos: [
      { desde: 497, texto: "Volver no es una idea," },
      { desde: 545, texto: "es una dirección.", estilo: "acento" },
    ],
  },
  {
    id: "f02",
    hasta: 654,
    trozos: [
      { desde: 577, texto: "Haz clic en el enlace" },
      { desde: 605, texto: "y agendemos" },
      { desde: 627, texto: "su visita.", estilo: "acento" },
    ],
  },
  {
    id: "f03",
    hasta: 709,
    trozos: [
      { desde: 654, texto: "Puede ser virtual" },
      { desde: 673, texto: "o presencial." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos029Srt = segmentosDe(subtitulos029, FPS_029);
