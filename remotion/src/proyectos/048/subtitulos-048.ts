/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 048 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/048/voz/*.txt`: lo que se OYE, comprobado por cortes con `palabras-desde.py`) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31), con 1-2 f de adelanto (`herramientas/lineas-vs-onsets.py`).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). EXCEPCIÓN DECLARADA: la pieza ABRE CON EL HOOK (por encargo del usuario), así que su primer subtítulo entra en el f29, con la voz de Isabella (su
 * primera palabra suena en el f30), y no hay una primera toma sin texto. El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido048.tsx`) y no un bloque de texto. NINGUNA cifra en la pieza.
 *
 * EL ACENTO MARCA LO QUE SE QUEDA EN LA CABEZA (uno por bloque, ≥ 2 s entre dos):
 *   «activo más valioso»  el hook: el tiempo como lo valioso (f50).
 *   «aseo semanal.»       el hook: lo que se le quita al inquilino (f177).
 *   «chef privado,»       la mitad: el primero de los servicios (f584).
 *   «experiencias»        la mitad: lo que cierra la lista (f699).
 *   «personalizado»       el CTA: el adjetivo que lo define todo (f1225).
 *   «conocer.»            el CTA: la palabra de la acción (f1303).
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 0, desde 0)       «El» 1,01 · «activo» ≈ 1,72 · «de» 2,835 · «y» 3,805 · «a optimizarlo» ≈ 4,22 · «incluyendo» 5,165 · «aseo» ≈ 5,93
 *   mitad (en 551, desde 10 f) «Contamos» 0,68 · «chef» 1,46 · «tours» ≈ 2,50 · «y transporte» ≈ 3,40 · «y las mejores» ≈ 4,42 · «experiencias» 5,295 · «de la ciudad» 5,795
 *   CTA (en 1141, desde 9 f)   «Cuando» 0,60 · «una» ≈ 1,05 · «no es» 1,575 · «el acompañamiento» 2,355 · «personalizado» 3,12 · «es una» ≈ 4,12 · «que vale» 5,05 · «conocer» 5,72
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con esta sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ella):
 *   · «aseo semanal.» (HK01, «aseo» hacia el f177 = 5,9 s del vídeo): whisper la oye de cuatro maneras según dónde se corte («un asedio semanal», «un aseo semanal», «hace dos semanas», «el deseo semanal»; en la HK02, la doble de
 *     esta toma, «asesor semanal»). La frase de la ficha y del catálogo dice «aseo semanal» (el aseo semanal incluido); se pinta eso y se oye antes de publicar.
 */

import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_048 = 8;

export const subtitulos048: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK01): imagen desde el f0, primera palabra en el f30 ──
  {
    id: "h01",
    hasta: 111,
    trozos: [
      { desde: 29, texto: "El tiempo es el" },
      { desde: 50, texto: "activo más valioso", estilo: "acento" },
      { desde: 84, texto: "de los seres humanos" },
    ],
  },
  {
    id: "h02",
    hasta: 152,
    trozos: [
      { desde: 113, texto: "y te ayudamos" },
      { desde: 125, texto: "a optimizarlo," },
    ],
  },
  {
    id: "h03",
    hasta: 206,
    trozos: [
      { desde: 154, texto: "incluyendo un" },
      { desde: 177, texto: "aseo semanal.", estilo: "acento" }, // POR CONFIRMAR AL OÍDO
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD03): imagen desde el f551, primera palabra en el f561 ──
  {
    id: "m01",
    hasta: 640,
    trozos: [
      { desde: 560, texto: "Contamos con" },
      { desde: 584, texto: "chef privado,", estilo: "acento" },
      { desde: 615, texto: "tours, masajes" },
    ],
  },
  {
    id: "m02",
    hasta: 712,
    trozos: [
      { desde: 642, texto: "y transporte" },
      { desde: 673, texto: "y las mejores" },
      { desde: 699, texto: "experiencias", estilo: "acento" },
    ],
  },
  { id: "m03", hasta: 749, trozos: [{ desde: 714, texto: "de la ciudad de Medellín." }] },
  // ── Bloque 6 · el CTA DICHO (CT03): imagen desde el f1141, primera palabra en el f1151 ──
  {
    id: "c01",
    hasta: 1200,
    trozos: [
      { desde: 1149, texto: "Cuando llegas a" },
      { desde: 1163, texto: "una ciudad que" },
      { desde: 1178, texto: "no es la tuya," },
    ],
  },
  {
    id: "c02",
    hasta: 1253,
    trozos: [
      { desde: 1202, texto: "el acompañamiento" },
      { desde: 1225, texto: "personalizado", estilo: "acento" },
    ],
  },
  {
    id: "c03",
    hasta: 1318,
    trozos: [
      { desde: 1255, texto: "es una plusvalía" },
      { desde: 1283, texto: "que vale la pena" },
      { desde: 1303, texto: "conocer.", estilo: "acento" },
    ],
  },
];
