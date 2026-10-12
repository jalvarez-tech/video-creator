/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 028 — `BloqueEditorial[]`.
 *
 * Solo lo que dice Isabella, en trozos de una a cuatro palabras, con un acento por frase como mucho (skill `recorrido-luxur`,
 * `subtitulos-editoriales.md`). Las dos frases son las de RC14, la misma toma que usó la V10: el texto sale de su guion marcado
 * (`proyectos/028/voz/hk5.txt` y `ct4.txt`, copiados de la V10: lo escribió una persona, que whisper oye «vente monstruo» y «contactame» donde se
 * dijo «ven, te muestro» y «contáctame») y los tiempos, de la ENERGÍA de la voz sola y de cortes acotados de la toma entre pausas (medidos en la V10:
 * `proyectos/026/voz/`). Aquí van escritos en FRAMES DE LA FUENTE (RC14 a 30 fps) y se pasan a la composición con `frameDeFuente`, con el `en` y el
 * `desde` del corte que suena: si el plan de velocidades mueve el hook o el CTA, el texto los sigue solo.
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). El cierre lleva el LOGO, que es una imagen (`LogoCierre` en
 * `Recorrido028.tsx`) y no un bloque de texto. NINGUNA cifra en la pieza. Durante el paseo acelerado no hay texto: la casa se enseña sola.
 *
 * PALABRAS CERRADAS POR MEDIDA, SIN OÍR (R31; heredadas de la V10, que dice el segundo exacto de cada una):
 *
 *   «posibilidades» (HK5, 4,69-5,45 s de RC14): la ventana 4,00-5,50 s la oye en plural y tras la /a/ de «da» los formantes pasan a una [e] (la sílaba «des»).
 *   «te muestro» (HK5, 5,79-6,31 s de RC14): whisper la oye «vente monstruo / bente muestro»; es la lectura que cuadra con «ven» y dos sílabas más.
 *   «gustó» (CT4, 46,05-46,25 s de RC14): la vocal tónica mide una /o/ (F1 ≈ 640, F2 ≈ 1.130 Hz).
 *   «contáctame» (CT4, 48,89-49,35 s de RC14): su última sílaba mide una [e] a −55 dB.
 *
 * POR CONFIRMAR AL OÍDO (la puerta con `--final` falla SOLO por esta nota, y se queda hasta que el usuario las oiga; en esta pieza caen en):
 *   · «posibilidades» (≈ 3,8 s del vídeo): si suena «posibilidad», cambiar el trozo `h02` «más posibilidades.», `voz/hk5.txt`, `VOZ_HOOK.dice` y el `.srt`.
 *   · «te muestro» (≈ 4,9 s del vídeo): si suena distinto, el trozo `h03` «te muestro.», `voz/hk5.txt`, `VOZ_HOOK.dice` y el `.srt`.
 *   · «gustó» (≈ 29,1 s del vídeo): si suena «gusta», el trozo `c01` «Si te gustó», `voz/ct4.txt`, `VOZ_CTA.dice` y el `.srt`.
 *   · la última sílaba de «contáctame» (≈ 32,3 s del vídeo): si suena «a mí», el trozo `c03` «contáctame.», `voz/ct4.txt`, `VOZ_CTA.dice` y el `.srt`.
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { frameDeFuente } from "../../motor/sound/tramos";
import { FPS_028, metraje028 } from "./metraje-028";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las once versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): de 99 px a 91 px.
 * Es de ESTA pieza y no del canal.
 */
export const ACENTO_MENOS_028 = 8;

const HOOK = metraje028.find((c) => c.id === "m02-hook");
const CTA = metraje028.find((c) => c.id === "m14-cta");
if (!HOOK || !CTA) throw new Error("subtitulos-028: faltan m02-hook o m14-cta en metraje-028.ts");

/** Un frame de RC14 → el frame de la composición en que suena, dentro del corte que lo reproduce (a velocidad 1). */
const enHook = (fuente: number): number => frameDeFuente(HOOK.en, HOOK.desde, fuente / FPS_028, FPS_028);
const enCta = (fuente: number): number => frameDeFuente(CTA.en, CTA.desde, fuente / FPS_028, FPS_028);

export const subtitulos028: readonly BloqueEditorial[] = [
  // ── El hook DICHO (RC14, 1,82-6,31 s): ella en la puerta; su primera palabra suena en el frame de RC14 54,6 ──
  {
    id: "h01",
    hasta: enHook(97),
    trozos: [
      { desde: enHook(54), texto: "Hay apartamentos" },
      { desde: enHook(73), texto: "para vivir" },
    ],
  },
  {
    id: "h02",
    hasta: enHook(165),
    trozos: [
      { desde: enHook(99), texto: "y hay otros" },
      { desde: enHook(122), texto: "que te dan" },
      { desde: enHook(141), texto: "más posibilidades.", estilo: "acento" },
    ],
  },
  {
    id: "h03",
    hasta: enHook(200),
    trozos: [
      { desde: enHook(167), texto: "Ven," },
      { desde: enHook(174), texto: "te muestro." },
    ],
  },
  // ── El CTA DICHO (RC14, 45,22-49,35 s): ante el ventanal de esquina; primer sonido en el frame de RC14 1356,6 y primera sílaba en el 1371 ──
  {
    id: "c01",
    hasta: enCta(1412),
    trozos: [
      { desde: enCta(1371), texto: "Si te gustó" },
      { desde: enCta(1388), texto: "este apartamento" },
    ],
  },
  {
    id: "c02",
    hasta: enCta(1464),
    trozos: [
      { desde: enCta(1414), texto: "y deseas tener" },
      { desde: enCta(1446), texto: "más información," },
    ],
  },
  { id: "c03", hasta: enCta(1489), trozos: [{ desde: enCta(1466), texto: "contáctame.", estilo: "acento" }] },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos028Srt = segmentosDe(subtitulos028, FPS_028);
