/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 052 — `BloqueEditorial[]`.
 *
 * Dos clases de texto, las dos con las letras del canal (Montserrat 500 y Playfair Display itálica en la palabra que importa, blanco, SIN sombra; skill `recorrido-luxur`, `subtitulos-editoriales.md`) y en la misma
 * banda (abajo, al 90 %), **nunca dos bloques a la vez**:
 *
 *   h01      lo que DICE Isabella en el hook (HK04, su segundo intento): «Antes de arrendar amoblado, pregúntate esto.» Va a su palabra (R31).
 *   r01-r09  los RÓTULOS: el guion nuevo en pantalla (`proyectos/044/reparto-051-053.md` §5b), uno por tramo del recorrido, que enseñan las plusvalías del arriendo. NO se dicen: la pieza va sin locución, así que
 *            no hay palabra a la que llevarlos; entran en un GOLPE MEDIDO del piano (`R` en `metraje-052.ts`) y se quedan hasta el siguiente. Tal cual lo dictó el usuario: de tú, sin exclamaciones, sin cifras,
 *            una palabra acentuada por rótulo.
 *   z01      lo que dice Isabella en el CTA (CT05): «Si buscas más que un apartamento para vivir, escríbenos.»
 *
 * Frames ABSOLUTOS de la composición, a 30 fps. Los del hook y el CTA salen de `trozos-editoriales.mjs` (`proyectos/052/voz/hk04.txt`, `ct05.txt`) y se llevaron a mano a su sílaba con `onsets-voz.py`:
 *
 *   node manuales/edicion-video/scripts/trozos-editoriales.mjs proyectos/052/voz/hk04.txt proyectos/052/voz/hk04.json --en 0 --desde 4.7667 --s0 4.925 --audio remotion/public/recorrido-052/hk04.wav --prefijo h --tabla
 *   node manuales/edicion-video/scripts/trozos-editoriales.mjs proyectos/052/voz/ct05.txt proyectos/052/voz/ct05.json --en 1176 --desde 1.2667 --s0 1.305 --audio remotion/public/recorrido-052/ct05.wav --prefijo z --tabla
 *
 * Dentro de un rótulo las líneas se acumulan con 9-14 f de separación (nada habla: es solo el ritmo de lectura), y el primero entra con el golpe. El primer acento (`dormir…`) espera 28 f al golpe para no pisar el del
 * hook (≥ 2 s entre dos acentos).
 *
 * «amoblado»: whisper oye «a mollado» (sobre el segundo intento: «Antes de arrendar a mollado, pregúntate esto»); la frase es la del reparto y el original, y el usuario vio el subtítulo en la prueba sin objetar.
 */
import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { CTA_EN_052, FPS_052, R } from "./metraje-052";

/** La cursiva, 8 px más pequeña (el 017 lo pidió así y todo el canal lo comparte). */
export const ACENTO_MENOS_052 = 8;

/** Los frames en que sale cada rótulo: el siguiente entra en el golpe y el anterior se va 3 f antes (nunca dos a la vez). */
const SALE = 3;

export const subtitulos052: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook dicho (el segundo intento de HK04): la imagen de Isabella ya está en el f0, su primera sílaba suena en el f5 y el primer texto entra con ella. Un solo bloque que se acumula ──
  {
    id: "h01",
    hasta: 82,
    trozos: [
      { desde: 5, texto: "Antes de arrendar" },
      { desde: 25, texto: "amoblado," }, // «amoblado» (HK04, 5,68 s): whisper oye «a mollado»; el usuario vio el subtítulo en la prueba y solo corrigió el arranque del hook
      { desde: 49, texto: "pregúntate esto.", estilo: "acento" },
    ],
  },
  // ── Bloque 5 · los rótulos del guion nuevo, uno por tramo del recorrido ──
  {
    id: "r01",
    hasta: R.r2 - SALE,
    trozos: [
      { desde: R.r1, texto: "¿Un lugar donde" },
      { desde: R.r1 + 28, texto: "dormir…", estilo: "acento" },
    ],
  },
  {
    id: "r02",
    hasta: R.r3 - SALE,
    trozos: [
      { desde: R.r2, texto: "…o un lugar donde" },
      { desde: R.r2 + 9, texto: "disfrutes", estilo: "acento" },
      { desde: R.r2 + 20, texto: "vivir?" },
    ],
  },
  {
    id: "r03",
    hasta: R.r4 - SALE,
    trozos: [
      { desde: R.r3, texto: "Aquí no pagas" },
      { desde: R.r3 + 14, texto: "solo un apartamento" },
    ],
  },
  {
    id: "r04",
    hasta: R.r5 - SALE,
    trozos: [
      { desde: R.r4, texto: "Pagas llegar y tener todo" },
      { desde: R.r4 + 14, texto: "resuelto:", estilo: "acento" },
    ],
  },
  {
    id: "r05",
    hasta: R.r6 - SALE,
    trozos: [
      { desde: R.r5, texto: "Aseo", estilo: "acento" },
      { desde: R.r5 + 10, texto: "semanal incluido" },
    ],
  },
  {
    id: "r06",
    hasta: R.r7 - SALE,
    trozos: [
      { desde: R.r6, texto: "Alguien que te" },
      { desde: R.r6 + 10, texto: "acompaña", estilo: "acento" },
      { desde: R.r6 + 22, texto: "desde el día uno" },
    ],
  },
  {
    id: "r07",
    hasta: R.r8 - SALE,
    trozos: [
      { desde: R.r7, texto: "Chef", estilo: "acento" },
      { desde: R.r7 + 10, texto: "privado y transporte" },
      { desde: R.r7 + 22, texto: "cuando los pidas" },
    ],
  },
  {
    id: "r08",
    hasta: R.r9 - SALE,
    trozos: [
      { desde: R.r8, texto: "Planes y reservas en" },
      { desde: R.r8 + 10, texto: "Medellín", estilo: "acento" },
    ],
  },
  {
    id: "r09",
    hasta: CTA_EN_052 - SALE,
    trozos: [
      { desde: R.r9, texto: "Y la mejor" },
      { desde: R.r9 + 10, texto: "asesoría", estilo: "acento" },
      { desde: R.r9 + 22, texto: "de la ciudad" },
    ],
  },
  // ── Bloque 6 · el CTA (el cierre es el logo, no un bloque de texto) ──
  {
    id: "z01",
    hasta: CTA_EN_052 + 93,
    trozos: [
      { desde: CTA_EN_052 + 1, texto: "Si buscas más que un" },
      { desde: CTA_EN_052 + 34, texto: "apartamento para vivir," },
      { desde: CTA_EN_052 + 65, texto: "escríbenos.", estilo: "acento" },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). Incluye los rótulos: son el mensaje. */
export const subtitulos052Srt = segmentosDe(subtitulos052, FPS_052);
