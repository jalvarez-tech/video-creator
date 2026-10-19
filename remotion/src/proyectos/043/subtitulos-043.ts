/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 043 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/043/voz/*.txt`: lo escribo yo con lo que se OYE, comprobado por cortes) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31). Cada línea entra 1-2 f ANTES de su palabra (`herramientas/lineas-vs-onsets.py`).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la apertura, DR203): el primer subtítulo entra en el f110, con la voz de Isabella, 10 f después
 * de que su imagen aparezca (f100). El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido043.tsx`) y no un bloque de texto. NINGUNA cifra en la pieza.
 *
 * EL ACENTO MARCA LO PRÁCTICO (uno por bloque, ≥ 2 s entre dos):
 *   «agua y energía»   el hook: lo que se pide antes que cualquier plano (f179).
 *   «dos entradas»     la mitad: el hecho de la ficha que cambia el día a día (f534).
 *   «y agendemos»      la acción del CTA: lo que se hace tras hacer clic (f985).
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 100, desde 9 f)   «Si» 0,665 s · «rodeado» 1,185 · «pero» 2,71 · «con» ≈ 2,885 · «agua» ≈ 2,98 · «disponibles» 3,565 · «vente» 4,74-4,78 (tras la pausa de 4,45-4,78)
 *   mitad (en 516, desde 6 f)  «Tener» 0,54 · «dos» 0,84 · «puede» 1,71 (tras la pausa) · «por» 2,21 · «la» 2,73 · «disfrutas» 3,89
 *   CTA (en 937, desde 9 f)    «Haz» 0,73 · «en el botón» 1,07 · «y» 1,945 (tras el silencio de 0,1 s) · «una» 2,335
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ella):
 *   · «rodeado de la naturaleza,» (HK06, «de la» hacia el f144 = 4,8 s del vídeo): el registro y whisper con vocabulario dicen «rodeado de naturaleza»; sin vocabulario y desde seis cortes whisper oye «de la naturaleza»
 *     (y «Roba»/«Roja» por «rodeado»). Se pinta lo que oyen los cortes (es lo que midió la V15 en este mismo clip).
 *   · «pero con» (HK06, f171 = 5,7 s): no estaba en el registro; desde 2,70 s whisper oye «pero con agua de energía» y desde 2,85 «con agua y energía». Hay dos sílabas entre la pausa de 2,52 s y «con» (2,885 s).
 *   · «agua y energía» (HK06, «y» hacia el f182 = 6,1 s): whisper oye «agua de energía» desde 2,70 s y «agua y energía» desde 2,85 s; la ficha dice «energía eléctrica y agua». MEDIDO por la V15 con formantes.py: tras la /a/ de
 *     «agua» la F2 sube sin pausa a ≈ 2.450 Hz (una vocal anterior débil) y la caída de energía llega DESPUÉS: encaja con «y», no con «de».
 *   · «vente, te muestro.» (HK06, «te» hacia el f238 = 7,9 s): whisper oye «Bente maestro», «vente muestro», «20 muestros»: la «te» de «te muestro» se pega a la de «vente». Entre 4,74 y 5,45 s hay cuatro arranques de sílaba
 *     (4,74 · 4,975 · 5,11 · 5,345): «ven-te-mues-tro». Se pinta «te muestro» (lo que dice la frase) y se oye antes de publicar.
 *   · «por completo» (MD06, f590 = 19,7 s): whisper oye «por completo» desde 2,21 s y «ver por completo» desde 2,05 s. Se pinta «por completo» (lo que dice la frase en el registro).
 *   · «lote» (MD06, f650 = 21,7 s): whisper oye «note» y «Hasta su note» (la «l» y la «n» se parecen en una palabra tan al final). Se pinta «lote» (el nombre del producto: «disfrutas un lote»).
 *   · «agendemos» (CT03, f985 = 32,9 s): la «y» (1,945 s) va pegada a la «a» de «agendemos»; desde 1,945 whisper oye «y agendemos una visita» y desde 2,095 «gente». Se pinta «y agendemos» (la V18 la midió así).
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_043 } from "./metraje-043";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_043 = 8;

export const subtitulos043: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK06): imagen desde el f100, primera palabra en el f111 ──
  {
    id: "h01",
    hasta: 169,
    trozos: [
      { desde: 110, texto: "Si quieres construir" },
      { desde: 125, texto: "rodeado de la naturaleza," },
    ],
  },
  {
    id: "h02",
    hasta: 232,
    trozos: [
      { desde: 171, texto: "pero con" },
      { desde: 179, texto: "agua y energía", estilo: "acento" },
      { desde: 197, texto: "disponibles," },
    ],
  },
  { id: "h03", hasta: 258, trozos: [{ desde: 233, texto: "vente, te muestro." }] },
  // ── Bloque 4 · la mitad DICHA (MD06): imagen desde el f516, primera palabra en el f526 ──
  {
    id: "m01",
    hasta: 590,
    trozos: [
      { desde: 525, texto: "Tener" },
      { desde: 534, texto: "dos entradas", estilo: "acento" },
      { desde: 560, texto: "puede cambiar por completo" },
    ],
  },
  {
    id: "m02",
    hasta: 656,
    trozos: [
      { desde: 591, texto: "la forma en la que" },
      { desde: 625, texto: "disfrutas un lote." },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT03 entera): imagen desde el f937, primera palabra en el f950 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 984,
    trozos: [
      { desde: 949, texto: "Haz clic" },
      { desde: 959, texto: "en el botón" },
    ],
  },
  {
    id: "c02",
    hasta: 1024,
    trozos: [
      { desde: 985, texto: "y agendemos", estilo: "acento" },
      { desde: 997, texto: "una visita." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos043Srt = segmentosDe(subtitulos043, FPS_043);
