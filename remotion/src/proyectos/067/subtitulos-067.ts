/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 067 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/067/voz/*.txt`: lo que se OYE, comprobado por cortes) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31). Cada línea entra 0-3 f ANTES de su palabra (la primera de cada toma, en el frame en que su imagen ya es opaca o en su primera sílaba).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la apertura, DR06): el primer subtítulo entra en el f99, con la imagen de Isabella (opaca desde el f96),
 * en su primera sílaba. El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido067.tsx`) y no un bloque de texto.
 *
 * LA ÚNICA CIFRA EN PANTALLA ES LA QUE ELLA DICE: «5.000 metros» (CTA), tal cual la pronuncia (la ficha dice 5.170 m²; el caption y la versión con ficha llevan 5.170). Ninguna cifra propia: el precio y la superficie
 * no van en pantalla en el reel.
 *
 * EL ACENTO MARCA LO QUE SELECCIONA Y LA ACCIÓN (el ángulo de la pieza): «lo más barato» y «para ti.» (el hook: de quién NO es), «comprador serio» y «dejar de sentir.» (la mitad: a quién sí le habla) y
 * «infinitas posibilidades.» y «y hablemos.» (el CTA: la promesa y la acción). Solo hay uno por bloque y entre dos hay ≥ 2 s.
 *
 * LOS TIEMPOS, a la sílaba (segundo de la fuente → frame = en + round((s − desde)·30); hook en 96, mitad en 462, CTA en 950, las tres con desde 12 f = 0,4 s; `onsets-voz.py` + `palabras-desde.py` sobre la voz SOLA):
 *   hook   «Si» 0,50 · «lo más barato» 1,075 (lo) · «de la zona» 1,685 · «con todo respeto» 2,565 · «este no es» 3,73 · «para ti» 4,14
 *   mitad  «Aprendí» 0,525 · «comprador» 1,59 · «desde la primera fase» 2,56 (des) · «No habla de metros» 4,195 · «habla de lo que quiere» 5,32 (tras la coma de «metros») · «dejar de sentir» ≈ 6,1
 *   CTA    «5.000» 0,465 · «infinitas» 1,14 · «haz clic» 2,94 · «en el enlace» 3,28 · «y hablemos» 3,88
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · «fase» (MD01, 2,56 s de la toma = f525 = 17,5 s del vídeo): la expresión corriente sería «desde la primera frase», pero lo MEDIDO dice «fase»: whisper small oye « fa» con confianza 0,98 y «se.» con 0,65 en la toma
 *     entera y en los 4 trozos aislados de `herramientas/segmentos.py` (2,5-4,1 · 2,3-4,2 · 2,8-4,15 s: «desde la primera fase»; 3,0-4,15 s: «para que me la faci»; y desde 3,05 s oye «era fácil»), y la envolvente a 10 ms
 *     (`envolvente-voz.py`, 3,28-3,60 s) sube de golpe y sin tapa («f» sorda, la vocal a −13 dB durante 170 ms, un hueco de 70 ms que es la /s/, y la /e/ de «-se» a −25 dB): no hay el golpe breve de una /r/ vibrante.
 *     Se pinta «fase» (la medida), no «frase» (la gramática); `medidas/segmentos-md01.txt`. Las dos lecturas tienen las mismas sílabas: no se cierra sin oír.
 *   · «comprador» (MD01, 1,59 s de la toma = f497 = 16,6 s del vídeo): whisper oye «compreador» (confianza 0,27 en el primer trozo). Se pinta «comprador» (lo que pide la frase y lo que repite la propia toma: «comprador serio» es el ángulo de la pieza).
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_067 } from "./metraje-067";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_067 = 8;

export const subtitulos067: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK02): imagen opaca desde el f96, primera sílaba en el f99 ──
  {
    id: "h01",
    hasta: 160,
    trozos: [
      { desde: 99, texto: "Si estás buscando" },
      { desde: 115, texto: "lo más barato", estilo: "acento" },
      { desde: 135, texto: "de la zona," },
    ],
  },
  {
    id: "h02",
    hasta: 226,
    trozos: [
      { desde: 161, texto: "con todo respeto," },
      { desde: 195, texto: "este no es" },
      { desde: 207, texto: "para ti.", estilo: "acento" },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD01): imagen opaca desde el f462, primera palabra en el f465 ──
  {
    id: "m01",
    hasta: 566,
    trozos: [
      { desde: 465, texto: "Aprendí a reconocer al" },
      { desde: 497, texto: "comprador serio", estilo: "acento" },
      { desde: 525, texto: "desde la primera fase." },
    ],
  },
  {
    id: "m02",
    hasta: 663,
    trozos: [
      { desde: 576, texto: "No habla de metros," },
      { desde: 610, texto: "habla de lo que quiere" },
      { desde: 633, texto: "dejar de sentir.", estilo: "acento" },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT05): imagen opaca desde el f950, primera palabra en el f952 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "z01",
    hasta: 1026,
    trozos: [
      { desde: 952, texto: "5.000 metros," },
      { desde: 972, texto: "infinitas posibilidades.", estilo: "acento" },
    ],
  },
  {
    id: "z02",
    hasta: 1087,
    trozos: [
      { desde: 1026, texto: "haz clic" },
      { desde: 1035, texto: "en el enlace" },
      { desde: 1053, texto: "y hablemos.", estilo: "acento" },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos067Srt = segmentosDe(subtitulos067, FPS_067);
