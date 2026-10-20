/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 052 — `BloqueEditorial[]`.
 *
 * TODO lo que suena, en trozos de una a cuatro palabras, con un acento por frase (skill `recorrido-luxur`, `subtitulos-editoriales.md`): el hook de Isabella (`h01`-`h02`), la locución en off (`o01`-`o26`) y su CTA
 * (`z01`). Frames ABSOLUTOS de la composición, a 30 fps. Sin cifras: la réplica no dice ninguna.
 *
 * ESTE ARCHIVO SE ESCRIBIÓ CON `trozos-editoriales.mjs` (el TEXTO sale del guion marcado de `proyectos/052/voz/`: `hk04.txt`, `off-marcado.txt`, `ct05.txt`; los TIEMPOS, de la voz) y se corrigió a mano donde se midió:
 *
 *   node manuales/edicion-video/scripts/trozos-editoriales.mjs proyectos/052/voz/hk04.txt proyectos/052/voz/hk04.json --en 0 --desde 2.7333 --s0 2.9 --audio remotion/public/recorrido-052/hk04.wav --prefijo h --tabla
 *   node manuales/edicion-video/scripts/trozos-editoriales.mjs proyectos/052/voz/ct05.txt proyectos/052/voz/ct05.json --en 2247 --desde 1.2667 --s0 1.305 --audio remotion/public/recorrido-052/ct05.wav --prefijo z --tabla
 *   uv run proyectos/052/herramientas/alinear-locucion.py > /tmp/off-bloques.txt   (la locución, frase a frase: cada una se corta de `off.wav`, se transcribe sola y se alinea con su arranque y su energía)
 *   uv run proyectos/052/herramientas/armar-subtitulos.py /tmp/off-bloques.txt       (arma este archivo con los bloques del hook y del CTA de arriba)
 *
 * LOS BLOQUES `o01`-`o26` salen de la locución GENERADA (ElevenLabs, voz de stock «Bella», 2026-10-20; `OFF_PENDIENTE = false` en `audio-052.ts`): el DTW de whisper sobre los 71 s enteros se desvió hasta 0,5 s en
 * medio de una frase; sobre cada frase sola concuerda con los arranques de sílaba (`onsets-voz.py`) a ±3 f. No se han llevado línea a línea a su palabra con `lineas-vs-onsets.py` (R31): se oye en la prueba.
 *
 * POR CONFIRMAR AL OÍDO (la puerta con `--final` falla mientras queden):
 *   · «amoblado,» (h02, f64, 4,92 s de HK04): whisper oye «a mi lado» y el original (`02.mp4`) arranca su audio justo ahí; con 4 sílabas y lo que se oye, «a-mo-bla-do».
 *   · «si no puedes disfrutarlo?» (o20): la frase dudosa del original; whisper oye «si lo puedes disfrutarlo» y los rótulos automáticos de `02.mp4` ponen «premium si · no puedes · disfrutarlo».
 */
import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_052 } from "./metraje-052";

/** La cursiva, 8 px más pequeña (el 017 lo pidió así y todo el canal lo comparte). */
export const ACENTO_MENOS_052 = 8;

export const subtitulos052: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook dicho: la imagen de Isabella ya está en el f0, su primera sílaba suena en el f5 y el primer texto entra con ella ──
  { id: "h01", hasta: 64, trozos: [{ desde: 5, texto: "Antes de arrendar" }] },
  {
    id: "h02",
    hasta: 142,
    trozos: [
      { desde: 64, texto: "amoblado," }, // POR CONFIRMAR AL OÍDO: «amoblado» (HK04, 4,92 s)
      { desde: 113, texto: "pregúntate esto.", estilo: "acento" },
    ],
  },
  // ── Bloque 5 · la locución en off ──
  {
    id: "o01",
    hasta: 242,
    trozos: [
      { desde: 164, texto: "¿Estás buscando simplemente" },
      { desde: 198, texto: "un lugar donde dormir," },
    ],
  },
  {
    id: "o02",
    hasta: 323,
    trozos: [
      { desde: 249, texto: "o un lugar donde realmente" },
      { desde: 287, texto: "disfrutes vivir?", estilo: "acento" },
    ],
  },

  {
    id: "o03",
    hasta: 397,
    trozos: [
      { desde: 327, texto: "Porque cuando eliges" },
      { desde: 348, texto: "un apartamento" },
      { desde: 371, texto: "amoblado,", estilo: "acento" },
    ],
  },
  {
    id: "o04",
    hasta: 475,
    trozos: [
      { desde: 400, texto: "no estás pagando solamente" },
      { desde: 438, texto: "por una cama," },
    ],
  },
  { id: "o05", hasta: 537, trozos: [{ desde: 478, texto: "una sala" }, { desde: 496, texto: "y una cocina." }] },

  {
    id: "o06",
    hasta: 586,
    trozos: [
      { desde: 547, texto: "Estás pagando por" },
      { desde: 568, texto: "la comodidad", estilo: "acento" },
    ],
  },
  {
    id: "o07",
    hasta: 670,
    trozos: [
      { desde: 586, texto: "de llegar a casa" },
      { desde: 609, texto: "y sentir que" },
      { desde: 634, texto: "todo tiene sentido." },
    ],
  },

  {
    id: "o08",
    hasta: 742,
    trozos: [
      { desde: 680, texto: "Y si vas a invertir" },
      { desde: 705, texto: "en un arriendo premium," },
    ],
  },
  {
    id: "o09",
    hasta: 806,
    trozos: [
      { desde: 748, texto: "los detalles deben estar" },
      { desde: 782, texto: "a la altura.", estilo: "acento" },
    ],
  },

  {
    id: "o10",
    hasta: 907,
    trozos: [
      { desde: 820, texto: "Imagina terminar el día," },
      { desde: 870, texto: "salir al balcón," },
    ],
  },
  {
    id: "o11",
    hasta: 970,
    trozos: [
      { desde: 910, texto: "desconectarte en tu" },
      { desde: 942, texto: "jacuzzi privado", estilo: "acento" },
    ],
  },
  {
    id: "o12",
    hasta: 1068,
    trozos: [
      { desde: 970, texto: "y disfrutar de un entorno" },
      { desde: 1014, texto: "rodeado de naturaleza," },
    ],
  },
  {
    id: "o13",
    hasta: 1148,
    trozos: [
      { desde: 1069, texto: "sin dejar de estar" },
      { desde: 1096, texto: "conectado con" },
      { desde: 1123, texto: "Medellín.", estilo: "acento" },
    ],
  },

  {
    id: "o14",
    hasta: 1232,
    trozos: [
      { desde: 1158, texto: "Aquí tienes dos habitaciones," },
      { desde: 1216, texto: "dos baños" },
    ],
  },
  {
    id: "o15",
    hasta: 1341,
    trozos: [
      { desde: 1232, texto: "y espacios pensados" },
      { desde: 1269, texto: "para vivir con" },
      { desde: 1292, texto: "amplitud y comodidad.", estilo: "acento" },
    ],
  },

  {
    id: "o16",
    hasta: 1437,
    trozos: [
      { desde: 1358, texto: "Cuando quieres salir de casa," },
      { desde: 1407, texto: "el proyecto te ofrece" },
    ],
  },
  {
    id: "o17",
    hasta: 1559,
    trozos: [
      { desde: 1437, texto: "gimnasio, zonas húmedas," },
      { desde: 1507, texto: "coworking, Spa Romano" },
    ],
  },
  {
    id: "o18",
    hasta: 1624,
    trozos: [
      { desde: 1559, texto: "y espacios para" },
      { desde: 1598, texto: "compartir.", estilo: "acento" },
    ],
  },

  {
    id: "o19",
    hasta: 1694,
    trozos: [
      { desde: 1655, texto: "¿Para qué pagar un" },
      { desde: 1673, texto: "arriendo premium" },
    ],
  },
  {
    id: "o20",
    hasta: 1743,
    trozos: [
      { desde: 1694, texto: "si no puedes" },
      { desde: 1713, texto: "disfrutarlo?", estilo: "acento" },
    ],
  },

  {
    id: "o21",
    hasta: 1853,
    trozos: [
      { desde: 1783, texto: "Este apartamento en Las Palmas" },
      { desde: 1821, texto: "es para quienes quieren" },
    ],
  },
  {
    id: "o22",
    hasta: 1942,
    trozos: [
      { desde: 1853, texto: "que su hogar sea" },
      { desde: 1879, texto: "mucho más que", estilo: "acento" },
      { desde: 1906, texto: "un lugar de paso:" },
    ],
  },
  {
    id: "o23",
    hasta: 2061,
    trozos: [
      { desde: 1951, texto: "un espacio para descansar," },
      { desde: 2005, texto: "trabajar, recibir invitados" },
    ],
  },
  {
    id: "o24",
    hasta: 2139,
    trozos: [
      { desde: 2061, texto: "y disfrutar de una" },
      { desde: 2093, texto: "calidad de vida" },
      { desde: 2116, texto: "diferente.", estilo: "acento" },
    ],
  },

  {
    id: "o25",
    hasta: 2243,
    trozos: [
      { desde: 2154, texto: "Un lugar donde vivir bien" },
      { desde: 2189, texto: "no sea un plan" },
      { desde: 2214, texto: "para después," },
    ],
  },
  {
    id: "o26",
    hasta: 2300,
    trozos: [
      { desde: 2246, texto: "sino parte de tu" },
      { desde: 2273, texto: "día a día.", estilo: "acento" },
    ],
  },

  // ── Bloque 6 · el CTA (el cierre es el logo, no un bloque de texto) ──
  {
    id: "z01",
    hasta: 2461,
    trozos: [
      { desde: 2369, texto: "Si buscas más que un" },
      { desde: 2402, texto: "apartamento para vivir," },
      { desde: 2433, texto: "escríbenos.", estilo: "acento" },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos052Srt = segmentosDe(subtitulos052, FPS_052);
