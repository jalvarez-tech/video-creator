/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 047 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/047/voz/*.txt`: lo que se OYE, comprobado por cortes) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31). Cada línea entra 0-2 f ANTES de su palabra (`herramientas/lineas-vs-onsets.py`), nunca antes de que la imagen de Isabella sea opaca.
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PIEZA ABRE CON ISABELLA (sin recorrido no hay otra primera toma; declarado en `metraje-047.ts`): los 13 primeros fotogramas salen sin texto ni voz y el
 * primer subtítulo entra en el f13, con su primera sílaba. El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido047.tsx`) y no un bloque de texto.
 *
 * UNA SOLA CIFRA EN TODA LA PIEZA: «$14.800.000», en el subtítulo de MD04 (lo dicho es «catorce millones ochocientos»; la ficha de la web da el canon de 14.800.000 COP al mes). Va como ACENTO (la cursiva, abajo) y no
 * como dato grande al centro: el dato solo se admite en el bloque 3 (`viaje-emocional.md` §9) y aquí se dice con la voz, en el bloque 4, con Isabella en plano.
 *
 * EL ACENTO MARCA LO QUE SE LLEVA UNO (uno por bloque, ≥ 2 s entre dos; «un aseo semanal» va en base porque el precio entra 1,6 s después y dos acentos tan juntos no destacan):
 *   «más valioso»        el hook: el tiempo (f42).
 *   «$14.800.000»        la mitad: el precio (f217).
 *   «pensadas para ti.»  la mitad: lo que lo justifica (f292).
 *   «amenidades.»        la otra mitad: la unidad (f417).
 *   «personalizado»      el CTA: el acompañamiento (f534).
 *   «conocer.»           el CTA: la invitación (f607).
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 0, desde 0)           «El» 0,44 s · «más» 1,45 · «de» 2,09 · «Te» 3,55 (tras la pausa de 3,14-3,54) · «incluyéndote» 4,87 · «un» 5,70 · «aseo» ≈ 5,93
 *   MD04 (en 216, desde 15 f)      «Catorce» 0,54 (whisper la pone en 0,00: R29) · «que» 2,04 · «pensadas» 3,115 · «para» 3,845
 *   MD05 (en 347, desde 17 f)      «Además» 0,585 · «diferentes» 2,16 · «amenidades» 2,955
 *   CTA (en 459, desde 17 f)       «Cuando» 0,60 · «que no» 1,325 · «el» 2,13 · «personalizado» 3,12 · «es una» 4,025 · «que» 5,09 (tras el cierre de la «k») · «conocer» 5,56
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con esto sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ella):
 *   · «incluyéndote un aseo semanal.» (HK02, «aseo» hacia el f178 = 5,9 s del vídeo): whisper oye «inclu-y-énd-ote un as-e-o semanal» (la «e» con p 0,24; «énd» p 0,62; «inclu» p 0,72) y, en otras pasadas de la
 *     misma frase, «asesor»; desde 4,87 s vuelve «Incluyéndote un aseo semanal.» y desde 5,70, «un aseo semanal.». El catálogo y el reparto dicen «aseo». Se pinta «aseo» (lo que dice la frase y lo que la ficha
 *     anuncia: aseo semanal incluido) y se oye antes de publicar: es la promesa de la pieza y una palabra que cambia lo que se ofrece.
 *   (Cerradas con una pasada limpia, sin nota: «catorce millones ochocientos» —desde 0,54 s whisper oye «14 millones 800 que»—, «que incluyen» —desde 2,04 s «que incluyen experiencias pensadas»—, «esta unidad» y «llegas».)
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_047 } from "./metraje-047";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_047 = 8;

export const subtitulos047: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK02): la pieza abre con ella, primera palabra en el f13 ──
  {
    id: "h01",
    hasta: 101,
    trozos: [
      { desde: 13, texto: "El tiempo es el activo" },
      { desde: 42, texto: "más valioso", estilo: "acento" },
      { desde: 61, texto: "de los seres humanos." },
    ],
  },
  {
    id: "h02",
    hasta: 205,
    trozos: [
      { desde: 105, texto: "Te ayudamos a optimizarlo," },
      { desde: 144, texto: "incluyéndote" },
      { desde: 169, texto: "un aseo semanal." },
    ],
  },
  // ── Bloque 4 · la mitad DICHA en dos tomas: MD04 (imagen opaca en el f216, «Catorce» en el f217) ──
  { id: "m01", hasta: 259, trozos: [{ desde: 217, texto: "$14.800.000", estilo: "acento" }] },
  {
    id: "m02",
    hasta: 333,
    trozos: [
      { desde: 260, texto: "que incluyen experiencias" },
      { desde: 292, texto: "pensadas para ti.", estilo: "acento" },
    ],
  },
  // ── …y MD05 (imagen opaca en el f347, «Además» en el f348) ──
  {
    id: "n01",
    hasta: 445,
    trozos: [
      { desde: 348, texto: "Además, esta unidad cuenta con" },
      { desde: 393, texto: "diferentes tipos de" },
      { desde: 417, texto: "amenidades.", estilo: "acento" },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT03 entera): imagen opaca en el f459, primera palabra en el f460 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 503,
    trozos: [
      { desde: 460, texto: "Cuando llegas a una ciudad" },
      { desde: 480, texto: "que no es la tuya," },
    ],
  },
  {
    id: "c02",
    hasta: 591,
    trozos: [
      { desde: 504, texto: "el acompañamiento" },
      { desde: 534, texto: "personalizado", estilo: "acento" },
      { desde: 561, texto: "es una plusvalía" },
    ],
  },
  {
    id: "c03",
    hasta: 630,
    trozos: [
      { desde: 593, texto: "que vale la pena" },
      { desde: 607, texto: "conocer.", estilo: "acento" },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos047Srt = segmentosDe(subtitulos047, FPS_047);
