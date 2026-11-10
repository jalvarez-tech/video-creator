/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 065 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cinco palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/065/voz/*.txt`: lo escribo yo con lo que se OYE) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-tramo.mjs` + el perfil de pausas de `limites-voz.py`), no al DTW de whisper a ciegas (R31). Cada línea entra 0-3 f ANTES de su palabra (la primera de cada toma, en el frame en que su
 * imagen ya es opaca).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la apertura, DR04): el primer subtítulo entra en el f127, con la imagen de Isabella (opaca desde el f114),
 * en el frame de su primera sílaba (f126,9). Durante la INFOGRAFÍA (f437-f691) no hay subtítulos: ella no habla. El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido065.tsx`) y no un bloque de texto.
 *
 * CIFRA DICHA = CIFRA ESCRITA: el hook dice tres cifras («tres mil doscientos cuarenta y cuatro metros cuadrados», «quince minutos», «trescientos cincuenta millones») y salen escritas en dígitos: 3.244 · 15 · 350. NINGUNA otra
 * afirmación: nada de energía, de uso del suelo, de tipo de vía ni de «apto para construir»; la pregunta de la mitad («¿lo comprarías para construir o para invertir?») la hace ELLA y los subtítulos solo la transcriben
 * (en pantalla no se promete nada).
 *
 * LOS ACENTOS son lo que se decide: «metros cuadrados» (la superficie), «Medellín-Bogotá» (la distancia), «350 millones» (el precio) y «lote» (la palabra que hay que comentar): uno por bloque y con más de 2 s entre dos
 * (f169 · f257 · f327 · f1037). La invitación («ven, te muestro») y la pregunta van en base.
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook A (en 114, desde 232 f)  «3.244» 8,165 · «metros» ≈ 9,55 · «a solo» 10,805 · «de la» ≈ 11,85 · «Medellín» 12,52 · «y por solo» 14,17 · «350» 14,865
 *   hook B (en 374, desde 498 f)  «Ven» 16,72
 *   mitad (en 691, desde 81 f)    «¿Lo» 3,135 · «para construir» 3,81 · «o para invertir» 4,65
 *   CTA (en 1014, desde 89 f)     «Comenta» 3,445 · «lote» 3,75 · «y te envío» 4,125 · «toda la información» 4,935 · «para que vengas» 6,17 · «y lo conozcas» 6,885
 * El DTW de whisper-small va de 1 a 10 f temprano a mitad de frase: lo que vale es el primer onset tras cada pausa y las pausas de la voz sola.
 *
 * NOTAS (medidas, no dudas: coinciden con el catálogo y no bloquean `--final`): «te muestro» (HK03, f377): whisper oye «20 muestros»; los arranques de sílaba son 16,72 · 16,905 · 17,27 · 17,47 s: ven·te·mues·tro (cuatro
 * sílabas en 0,83 s).
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_065 } from "./metraje-065";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_065 = 8;

export const subtitulos065: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK03, parte A): imagen opaca desde el f114, primera sílaba en el f126,9; el último trozo se queda hasta el f374, el corte a la parte B ──
  {
    id: "h01",
    hasta: 203,
    trozos: [
      { desde: 127, texto: "3.244" },
      { desde: 169, texto: "metros cuadrados", estilo: "acento" },
    ],
  },
  {
    id: "h02",
    hasta: 303,
    trozos: [
      { desde: 205, texto: "a solo 15 minutos" },
      { desde: 235, texto: "de la autopista" },
      { desde: 257, texto: "Medellín-Bogotá", estilo: "acento" },
    ],
  },
  {
    id: "h03",
    hasta: 374,
    trozos: [
      { desde: 306, texto: "y por solo" },
      { desde: 327, texto: "350 millones.", estilo: "acento" },
    ],
  },
  // ── Bloque 2 · la invitación (HK03, parte B): a corte en el f374, primera sílaba en el f377,6; se queda hasta que Isabella disuelve al dron con la ficha (f425) ──
  { id: "h04", hasta: 424, trozos: [{ desde: 377, texto: "Ven, te muestro." }] },
  // ── Bloque 4 · la mitad DICHA (CT05, solo la pregunta): imagen opaca desde el f691, primera palabra en el f703,9 ──
  {
    id: "m01",
    hasta: 777,
    trozos: [
      { desde: 704, texto: "¿Lo comprarías" },
      { desde: 723, texto: "para construir" },
      { desde: 749, texto: "o para invertir?" },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT01): entra disolviendo y es opaco en el f1014, primera palabra en el f1027,3 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 1070,
    trozos: [
      { desde: 1027, texto: "Comenta" },
      { desde: 1037, texto: "“lote”", estilo: "acento" },
      { desde: 1048, texto: "y te envío" },
    ],
  },
  {
    id: "c02",
    hasta: 1147,
    trozos: [
      { desde: 1072, texto: "toda la información" },
      { desde: 1109, texto: "para que vengas" },
      { desde: 1131, texto: "y lo conozcas." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos065Srt = segmentosDe(subtitulos065, FPS_065);
