/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 041 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con un acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/041/voz/*.txt`: lo escribo yo con lo que se OYE, comprobado por cortes) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31). Cada línea entra 0-2 f ANTES de su palabra.
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (el lote desde arriba, DR233): el primer subtítulo entra en el f122, con la voz de Isabella, 7 f
 * después de que su imagen aparezca (f115). El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido041.tsx`) y no un bloque de texto.
 *
 * LA CIFRA (choque declarado con la regla «una sola cifra como mucho, nunca en los bloques 5 y 6»). El hook dice el ÁREA y el PRECIO en una frase («3.428 metros cuadrados por 800 millones») y el texto sigue a lo que
 * se oye: las dos van escritas, en el bloque 2, como UNA afirmación. No hay ninguna otra cifra en la pieza (ni dato en el centro, ni en la mitad, ni en el CTA, que no las repite) y los bloques 5 y 6 no llevan ninguna.
 * Si el usuario prefiere UNA sola escrita: el trozo «3.428 metros cuadrados» (f122) o «por 800 millones.» (f177) de `h01` se quita y se queda dicha sin escribir (≈ 2 min, y la puerta 2a lo permite).
 *
 * LOS ACENTOS, uno por bloque y ≥ 2 s entre dos: «estás comprando.» (la promesa del ángulo), «Dos accesos» (lo que va a enseñar el bloque 5) y «escríbeme lote» (la acción).
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + s·30 − desde·30):
 *   hook (en 115, desde 4 f)  «3.428» 0,415 s · «por» 2,27 · «vente» 4,185 · «todo» 4,735 · «estás» ≈ 5,38 (tras «lo» 5,05 y «que» 5,21)
 *   mitad (en 519, desde 4 f) «Dos» 0,41 · «para» 1,435 (tras la pausa de 1,24-1,40 s) · «una» 2,615 (tras la pausa de «lote,») · «y otra» 4,055 · «la vía» 4,47
 *   CTA (en 986, desde 12 f)  «Si» 0,675 · «escríbeme» 1,765 · «y te envío» 2,535 · «toda» 3,21
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ella):
 *   · «vente, te muestro» (HK07, «te» hacia el f236-253 = 7,9-8,4 s del vídeo): whisper oye «20 muestros» (confianza 0,3 en «te») y, por cortes, «vente muestre», «Vente, muestro», «Te muestro»: la «te» de «te muestro»
 *     se pega a la de «vente» (como en el HK02, el HK03 y el HK06 de este lote). MEDIDO (`formantes.py`, 2026-10-17): entre 4,22 y 4,65 s hay una [e] de «ven», la pausa de la /t/, una [e] (4,41-4,47), otra más abierta (4,50-4,53) y «mues-tro»:
 *     caben 4 sílabas («vente, muestro») o 5; no cierra. Se pinta «te muestro» (lo que dice el registro del SSD) y se oye antes de publicar.
 *   · «la vía veredal.» (MD01, f647-672 = 21,6-22,4 s): whisper oye «vida verdad» (confianza 0,12) y, por cortes, «la vida», «la vía heredal», «Vía Veredal» (como en el MD02 de la V14 y en la ficha, que habla de la
 *     «vereda»). MEDIDO (`formantes.py`): las vocales son [a][i][a][e][e][a] (4,54 · 4,64 · 4,74 · 4,84 · 4,92 · 5,06 s): seis sílabas, las de «la vía veredal» («vida verdad» tendría cinco y no una «e» tras la /r/).
 *     Se pinta «vía veredal» (lo que dice la frase y la ficha) y se oye antes de publicar.
 *   · «escríbeme lote» (CT01, f1025-1049 = 34,2-35,0 s): whisper oye «escríbeme elote» (la «e» de «escríbeme» se pega a «lote»). MEDIDO (`formantes.py`): [i][e][e][o][e] entre «crí» y «te», sin una «e» de más entre «me» y «lo».
 *     Se pinta «escríbeme lote» (la palabra que pide el CTA).
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_041 } from "./metraje-041";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_041 = 8;

export const subtitulos041: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK07): imagen desde el f115, primera palabra en el f123,45 ──
  {
    id: "h01",
    hasta: 235,
    trozos: [
      { desde: 122, texto: "3.428 metros cuadrados" },
      { desde: 177, texto: "por 800 millones." },
    ],
  },
  {
    id: "h02",
    hasta: 296,
    trozos: [
      { desde: 235, texto: "Vente, te muestro" },
      { desde: 251, texto: "todo lo que" },
      { desde: 270, texto: "estás comprando.", estilo: "acento" },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD01): imagen desde el f519, primera palabra en el f527,3 ──
  {
    id: "m01",
    hasta: 592,
    trozos: [
      { desde: 526, texto: "Dos accesos", estilo: "acento" },
      { desde: 556, texto: "para un mismo lote," },
    ],
  },
  {
    id: "m02",
    hasta: 672,
    trozos: [
      { desde: 592, texto: "una por la parcelación," },
      { desde: 635, texto: "y otra por" },
      { desde: 647, texto: "la vía veredal." },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT01): imagen desde el f986, primera palabra en el f994,25 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 1049,
    trozos: [
      { desde: 993, texto: "Si quieres conocerlo," },
      { desde: 1025, texto: "escríbeme lote", estilo: "acento" },
    ],
  },
  {
    id: "c02",
    hasta: 1098,
    trozos: [
      { desde: 1049, texto: "y te envío" },
      { desde: 1069, texto: "toda la información." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos041Srt = segmentosDe(subtitulos041, FPS_041);
