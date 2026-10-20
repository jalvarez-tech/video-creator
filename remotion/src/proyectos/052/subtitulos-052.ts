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
 *   node manuales/edicion-video/scripts/trozos-editoriales.mjs proyectos/052/voz/off-marcado.txt proyectos/052/voz/off-provisional.json --en 164 --desde 3.73 --s0 3.73 --prefijo o --tabla
 *
 * ⚠️ LOS BLOQUES `o01`-`o26` SON PROVISIONALES: salen del audio de `02.mp4` (`off-provisional.json`: whisper por palabra sobre el audio con la música vieja debajo, el reloj de la locución del original) porque la
 * locución propia NO existe todavía (`OFF_PENDIENTE` en `audio-052.ts`). Cuando exista se transcribe SU archivo con `transcribir.mjs --palabras` y se vuelve a correr `trozos-editoriales.mjs` con su `--s0`, su `--audio` y
 * su `--en`/`--desde`; cada línea se lleva a su palabra con la voz SOLA (`onsets-voz.py`, `lineas-vs-onsets.py`: R31).
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
  // ── Bloque 5 · la locución en off (PROVISIONAL: tiempos del audio de `02.mp4`) ──
  {
    id: "o01",
    hasta: 225,
    trozos: [
      { desde: 164, texto: "¿Estás buscando simplemente" },
      { desde: 188, texto: "un lugar donde dormir," },
    ],
  },
  {
    id: "o02",
    hasta: 321,
    trozos: [
      { desde: 225, texto: "o un lugar donde realmente" },
      { desde: 279, texto: "disfrutes vivir?", estilo: "acento" },
    ],
  },
  {
    id: "o03",
    hasta: 393,
    trozos: [
      { desde: 324, texto: "Porque cuando eliges" },
      { desde: 346, texto: "un apartamento" },
      { desde: 365, texto: "amoblado,", estilo: "acento" },
    ],
  },
  {
    id: "o04",
    hasta: 453,
    trozos: [
      { desde: 394, texto: "no estás pagando solamente" },
      { desde: 417, texto: "por una cama," },
    ],
  },
  { id: "o05", hasta: 503, trozos: [{ desde: 455, texto: "una sala" }, { desde: 466, texto: "y una cocina." }] },
  {
    id: "o06",
    hasta: 551,
    trozos: [
      { desde: 508, texto: "Estás pagando por" },
      { desde: 530, texto: "la comodidad", estilo: "acento" },
    ],
  },
  {
    id: "o07",
    hasta: 648,
    trozos: [
      { desde: 551, texto: "de llegar a casa" },
      { desde: 579, texto: "y sentir que" },
      { desde: 614, texto: "todo tiene sentido." },
    ],
  },
  {
    id: "o08",
    hasta: 725,
    trozos: [
      { desde: 660, texto: "Y si vas a invertir" },
      { desde: 686, texto: "en un arriendo premium," },
    ],
  },
  {
    id: "o09",
    hasta: 785,
    trozos: [
      { desde: 728, texto: "los detalles deben estar" },
      { desde: 762, texto: "a la altura.", estilo: "acento" },
    ],
  },
  {
    id: "o10",
    hasta: 881,
    trozos: [
      { desde: 795, texto: "Imagina terminar el día," },
      { desde: 845, texto: "salir al balcón," },
    ],
  },
  {
    id: "o11",
    hasta: 941,
    trozos: [
      { desde: 888, texto: "desconectarte en tu" },
      { desde: 912, texto: "jacuzzi privado", estilo: "acento" },
    ],
  },
  {
    id: "o12",
    hasta: 1029,
    trozos: [
      { desde: 941, texto: "y disfrutar de un entorno" },
      { desde: 990, texto: "rodeado de naturaleza," },
    ],
  },
  {
    id: "o13",
    hasta: 1106,
    trozos: [
      { desde: 1029, texto: "sin dejar de estar" },
      { desde: 1064, texto: "conectado con" },
      { desde: 1083, texto: "Medellín.", estilo: "acento" },
    ],
  },
  {
    id: "o14",
    hasta: 1185,
    trozos: [
      { desde: 1111, texto: "Aquí tienes dos habitaciones," },
      { desde: 1166, texto: "dos baños" },
    ],
  },
  {
    id: "o15",
    hasta: 1288,
    trozos: [
      { desde: 1185, texto: "y espacios pensados" },
      { desde: 1220, texto: "para vivir con" },
      { desde: 1241, texto: "amplitud y comodidad.", estilo: "acento" },
    ],
  },
  {
    id: "o16",
    hasta: 1371,
    trozos: [
      { desde: 1300, texto: "Cuando quieres salir de casa," },
      { desde: 1348, texto: "el proyecto te ofrece" },
    ],
  },
  {
    id: "o17",
    hasta: 1465,
    trozos: [
      { desde: 1371, texto: "gimnasio, zonas húmedas," },
      { desde: 1424, texto: "coworking, Spa Romano" },
    ],
  },
  {
    id: "o18",
    hasta: 1513,
    trozos: [
      { desde: 1465, texto: "y espacios para" },
      { desde: 1490, texto: "compartir.", estilo: "acento" },
    ],
  },
  {
    id: "o19",
    hasta: 1598,
    trozos: [
      { desde: 1535, texto: "¿Para qué pagar un" },
      { desde: 1570, texto: "arriendo premium" },
    ],
  },
  {
    id: "o20",
    hasta: 1643,
    trozos: [
      { desde: 1599, texto: "si no puedes" },
      { desde: 1614, texto: "disfrutarlo?", estilo: "acento" },
    ],
  },
  {
    id: "o21",
    hasta: 1750,
    trozos: [
      { desde: 1665, texto: "Este apartamento en Las Palmas" },
      { desde: 1718, texto: "es para quienes quieren" },
    ],
  },
  {
    id: "o22",
    hasta: 1832,
    trozos: [
      { desde: 1750, texto: "que su hogar sea" },
      { desde: 1781, texto: "mucho más que", estilo: "acento" },
      { desde: 1800, texto: "un lugar de paso:" },
    ],
  },
  {
    id: "o23",
    hasta: 1938,
    trozos: [
      { desde: 1832, texto: "un espacio para descansar," },
      { desde: 1885, texto: "trabajar, recibir invitados" },
    ],
  },
  {
    id: "o24",
    hasta: 2010,
    trozos: [
      { desde: 1938, texto: "y disfrutar de una" },
      { desde: 1966, texto: "calidad de vida" },
      { desde: 1986, texto: "diferente.", estilo: "acento" },
    ],
  },
  {
    id: "o25",
    hasta: 2112,
    trozos: [
      { desde: 2019, texto: "Un lugar donde vivir bien" },
      { desde: 2060, texto: "no sea un plan" },
      { desde: 2086, texto: "para después," },
    ],
  },
  {
    id: "o26",
    hasta: 2175,
    trozos: [
      { desde: 2118, texto: "sino parte de tu" },
      { desde: 2151, texto: "día a día.", estilo: "acento" },
    ],
  },
  // ── Bloque 6 · el CTA (el cierre es el logo, no un bloque de texto) ──
  {
    id: "z01",
    hasta: 2340,
    trozos: [
      { desde: 2248, texto: "Si buscas más que un" },
      { desde: 2281, texto: "apartamento para vivir," },
      { desde: 2312, texto: "escríbenos.", estilo: "acento" },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos052Srt = segmentosDe(subtitulos052, FPS_052);
