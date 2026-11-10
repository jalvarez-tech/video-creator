/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 066 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/066/voz/*.txt`: lo que se OYE) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola (`onsets-voz.py` +
 * `palabras-desde.py`), no al DTW de whisper (R31). Cada línea entra 0-3 f ANTES de su palabra (la primera de cada toma, en su primera sílaba).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la apertura, DR01): el primer subtítulo entra en el f94, con la imagen de Isabella (opaca desde el
 * f72), en su primera sílaba. El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido066.tsx`) y no un bloque de texto.
 *
 * LA ÚNICA CIFRA EN PANTALLA es la que ELLA DICE: «5.000 metros» (la ficha de la web dice 5.170 m²; ella redondea hacia abajo y los subtítulos son su transcripción, sin corregirla: cifra dicha = cifra escrita).
 * El precio y la ficha no van en pantalla en el reel (van al caption y a la versión con ficha).
 *
 * EL ACENTO MARCA LA ESCASEZ, LA PAZ Y LA ACCIÓN: «muy pocos.» (el hook: el lote con esta vista es raro), «paz» y «dentro de ella.» (la mitad: lo que se busca y dónde se vive) y «haz clic» (el CTA: el acento va
 * en la palabra de la acción, como manda el formato). Solo hay uno por bloque y entre dos hay ≥ 2 s: f266 · f702 · f765 · f1120 (la mitad lleva dos, a 2,1 s).
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 72, desde 18 f)    «En Medellín» 1,35 · «miles» 2,545 · «cada» 3,38 · «lotes» 4,64 · «con esta vista» 5,83 · «muy pocos» 7,075
 *   mitad (en 611, desde 12 f)   «Hay» 0,50 · «de tu vida» ≈ 1,05 · «donde» 1,71 · «que salir» 2,44 · «paz» 3,48 · «los fines» 3,72 · «porque» 4,92 · «dentro de ella» 5,605
 *   CTA (en 1062, desde 12 f)   «Si deseas» 0,85 · «haz clic» 2,325 · «en el enlace» ≈ 2,62
 *
 * POR CONFIRMAR AL OÍDO (R31; la puerta con `--final` falla SOLO por ellas):
 *   · «vida» / «Siente» (MD03, f630 = 21 s del vídeo): whisper oye «Siente tu vida» donde la frase pide «versión de tu vida» (la «sión de» se pega): se pinta «de tu vida».
 *   · «paz» (MD03, f702): whisper la oye «Car-paz» / «pas» (pegada a «buscar»): se pinta «paz» (la frase de la toma, «salir a buscar paz los fines de semana», lo pide).
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_066 } from "./metraje-066";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_066 = 8;

export const subtitulos066: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK05): imagen opaca desde el f72, primera sílaba en el f95 ──
  {
    id: "h01",
    hasta: 191,
    trozos: [
      { desde: 94, texto: "En Medellín se construyen" },
      { desde: 129, texto: "miles de apartamentos" },
      { desde: 155, texto: "cada año," },
    ],
  },
  {
    id: "h02",
    hasta: 298,
    trozos: [
      { desde: 192, texto: "lotes de 5.000 metros," },
      { desde: 228, texto: "con esta vista," },
      { desde: 266, texto: "muy pocos.", estilo: "acento" },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD03): imagen opaca desde el f611, primera palabra en el f614 ──
  {
    id: "m01",
    hasta: 669,
    trozos: [
      { desde: 613, texto: "Hay una versión" },
      { desde: 630, texto: "de tu vida" },
      { desde: 649, texto: "donde ya no tienes" },
    ],
  },
  {
    id: "m02",
    hasta: 745,
    trozos: [
      { desde: 671, texto: "que salir a buscar" },
      { desde: 702, texto: "paz", estilo: "acento" },
      { desde: 710, texto: "los fines de semana" },
    ],
  },
  {
    id: "m03",
    hasta: 795,
    trozos: [
      { desde: 746, texto: "porque ya vives" },
      { desde: 765, texto: "dentro de ella.", estilo: "acento" },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT04): imagen opaca desde el f1062, primera palabra en el f1075 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 1154,
    trozos: [
      { desde: 1075, texto: "Si deseas más información," },
      { desde: 1119, texto: "haz clic", estilo: "acento" },
      { desde: 1128, texto: "en el enlace." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos066Srt = segmentosDe(subtitulos066, FPS_066);
