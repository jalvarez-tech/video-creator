/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 040 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/040/voz/*.txt`: lo escribo yo con lo que se OYE, comprobado por cortes) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31: aquí iba 5-7 f pronto a mitad de frase). Cada línea entra 1 f ANTES de su palabra.
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (el dron DR202 sobre el lote al atardecer): el primer subtítulo entra en el f116, con la voz de Isabella,
 * 8 f después de que su imagen aparezca (f108). El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido040.tsx`) y no un bloque de texto. UNA SOLA CIFRA en la pieza: «3.000» (hook, bloque 2); nunca en los bloques 5 y 6.
 *
 * EL ACENTO MARCA LO QUE EL ÁNGULO PIDE (la vista, la casa soñada, la acción):
 *   «esta vista»       el hook: lo que ella promete (el ángulo de la pieza), en cursiva.
 *   «casa soñada.»     la mitad: lo que el lote ES para quien lo compra.
 *   «escríbeme lote»   la ACCIÓN del CTA (una sola, de UNA palabra).
 *   Solo hay uno por bloque y entre dos hay ≥ 2 s (el validador lo exige): «esta vista» (f164) · «casa soñada.» (f669) · «escríbeme lote» (f979).
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + s·30 − desde·30):
 *   hook (en 108, desde 0)       «Imagina» 0,305 s · «todos» 1,205 · «esta» 1,90 (tras el «con» de 1,745; la «t» cierra de 1,95 a 2,04) · «y» 2,70 (la «ta» de «vista» suena a 2,45-2,55 y hay silencio 2,60-2,65) · «tener» 3,10 ·
 *                                «tres mil» 3,655 (tras la pausa de 3,60) · «para» 4,96 (tras la de 4,45-4,95)
 *   mitad (en 585, desde 19 f)   «Este» 0,95 · «tipo» 1,345 · «de» 1,50 · «que» 1,82 · «para» 2,71 · «construir» 2,885 · «tu» 3,375 · «casa» 3,47 · «soñada» 3,605
 *   CTA (en 935, desde 3 f)      «Si» 0,400 · «escríbeme» 1,605 (tras la pausa de 1,44-1,60) · «y» 2,595 · «toda» 3,085   (los tiempos del CT02 medidos en el 039, +63 f)
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ella):
 *   · «3.000 metros cuadrados» (HK05, f217-250 = 7,2-8,3 s del vídeo): LA CIFRA. Whisper oye «3000» con confianza 0,53 y «metros» con 0,61; las dos mitades de «tres mil» se oyen pegadas (onsets 3,655 y 3,705). Se pinta
 *     «3.000» (lo que dice la ficha de la toma: «más de 3000 metros cuadrados»); se oye antes de publicar. La ficha dice 3.428 m²: «más de 3.000» es cierto.
 *   · «escríbeme lote» (CT02, f980 y f1002 = 32,7 y 33,4 s): whisper oye «escríeme elote» (conf. 0,36 en «-eme»). Se pinta «escríbeme lote» (la acción de la ficha: «escríbeme lote y te envío toda la información»).
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_040 } from "./metraje-040";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_040 = 8;

export const subtitulos040: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK05): imagen desde el f108, primera sílaba en el f117 ──
  {
    id: "h01",
    hasta: 187,
    trozos: [
      { desde: 116, texto: "Imagina despertar" },
      { desde: 143, texto: "todos los días con" },
      { desde: 164, texto: "esta vista", estilo: "acento" },
    ],
  },
  {
    id: "h02",
    hasta: 283,
    trozos: [
      { desde: 188, texto: "y tener más de" },
      { desde: 217, texto: "3.000 metros cuadrados" },
      { desde: 256, texto: "para tu proyecto." },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD04): imagen desde el f585, primera sílaba en el f594,5 ──
  {
    id: "m01",
    hasta: 645,
    trozos: [
      { desde: 594, texto: "Este es el tipo" },
      { desde: 611, texto: "de lote que compras" },
    ],
  },
  {
    id: "m02",
    hasta: 696,
    trozos: [
      { desde: 646, texto: "para construir tu" },
      { desde: 669, texto: "casa soñada.", estilo: "acento" },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT02): imagen desde el f935, primera sílaba en el f944 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 1008,
    trozos: [
      { desde: 943, texto: "Si quieres conocerlo," },
      { desde: 979, texto: "escríbeme lote", estilo: "acento" },
    ],
  },
  {
    id: "c02",
    hasta: 1053,
    trozos: [
      { desde: 1009, texto: "y te envío" },
      { desde: 1024, texto: "toda la información." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos040Srt = segmentosDe(subtitulos040, FPS_040);
