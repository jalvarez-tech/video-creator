/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 058 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/058/voz/*.txt`: lo escribo yo con lo que se OYE, comprobado por cortes) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py`: los valles profundos de las consonantes oclusivas, y `silabas.py`: los núcleos silábicos), no al DTW de whisper, que en estas tres tomas va de 3 a 9 f PRONTO a mitad de frase (R31). Cada línea
 * entra 0-3 f ANTES de su palabra (la primera de cada toma, en el frame en que su imagen ya es opaca).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la apertura, DR04): el primer subtítulo entra en el f87, con la imagen de Isabella (que entra a corte
 * en el f84), 0,4 f antes de su primera sílaba. El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido058.tsx`) y no un bloque de texto.
 *
 * LA ÚNICA CIFRA EN PANTALLA ES LA QUE ELLA DICE: «60 metros cuadrados» (en cifra, como la dice: R33, cifra dicha = cifra escrita). La ficha (60 m², 2 alcobas, 2 baños, el parqueadero) y el precio no van en pantalla
 * en el reel (van al caption y a la versión con ficha).
 *
 * EL ACENTO MARCA LO QUE EL ÁNGULO PROMETE: «descansar,» (el hook: la promesa; «al caos.» queda en base porque dos acentos a 1,5 s se anulan: el validador pide ≥ 2 s entre acentos), «60 metros cuadrados» y
 * «apartamento pequeño.» (la mitad: la cifra y la idea que cambia) y «Escríbeme» y «diferente» (el CTA: la acción y lo que se siente). Solo hay uno por bloque y entre dos hay ≥ 2 s.
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 84, desde 0)       «Este» 0,115 · «pensado» 0,905 · «descansar» 1,795 · «no» 2,445 · «al» ≈ 3,27 (más o menos: «al caos» dura 0,4 s) · «caos» 3,46
 *   mitad (en 493, desde 12 f)  «Lo» 0,425 · «sesenta» 0,74 · «en» 2,23 · «Palmazera» 2,38 · «te» 2,975 · «la» ≈ 3,5 · «apartamento» ≈ 3,96 · «pequeño» 4,53
 *   CTA (en 934, desde 17 f)    «Escríbeme» 0,605 · «y» 1,255 · «por» 1,78 · «se» 2,68 · «diferente» 2,965 · «desde» 3,465
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ella):
 *   · «Palmazera» (MD07, f547 = 18,2 s del vídeo): whisper oye «Palmacera» (confianza 0,29). Es el nombre del lugar, escrito como lo escribe la ficha de la web y el reparto (Palmazera). Se pinta «Palmazera»; lo que
 *     queda por oír es cómo lo dice ella (con la /s/ de «Palma-sera», que en Colombia suena igual con c o con z).
 *   · La palabra «caos» (HK02, f195-196): la «s» final es un hilo de energía a −36 dB; whisper la oye completa («caos.») y el sentido de la frase también.
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_058 } from "./metraje-058";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_058 = 8;

export const subtitulos058: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK02): imagen opaca desde el f84 (entra a corte), primera sílaba en el f87 ──
  {
    id: "h01",
    hasta: 157,
    trozos: [
      { desde: 87, texto: "Este es un apartamento" },
      { desde: 110, texto: "pensado para" },
      { desde: 137, texto: "descansar,", estilo: "acento" },
    ],
  },
  {
    id: "h02",
    hasta: 206,
    trozos: [
      { desde: 157, texto: "no para sobrevivir" },
      { desde: 181, texto: "al caos." },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD07): imagen opaca desde el f493, primera palabra en el f494 ──
  {
    id: "m01",
    hasta: 569,
    trozos: [
      { desde: 494, texto: "Lo que cabe en" },
      { desde: 503, texto: "60 metros cuadrados", estilo: "acento" },
      { desde: 547, texto: "en Palmazera" },
    ],
  },
  {
    id: "m02",
    hasta: 633,
    trozos: [
      { desde: 569, texto: "te va a cambiar" },
      { desde: 584, texto: "la idea del" },
      { desde: 599, texto: "apartamento pequeño.", estilo: "acento" },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT01): imagen opaca desde el f934, primera palabra en el f935 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 970,
    trozos: [
      { desde: 935, texto: "Escríbeme", estilo: "acento" },
      { desde: 954, texto: "y te cuento" },
    ],
  },
  {
    id: "c02",
    hasta: 1020,
    trozos: [
      { desde: 970, texto: "por qué este lugar" },
      { desde: 997, texto: "se siente" },
      { desde: 1005, texto: "diferente", estilo: "acento" },
    ],
  },
  { id: "c03", hasta: 1052, trozos: [{ desde: 1020, texto: "desde que entras." }] },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos058Srt = segmentosDe(subtitulos058, FPS_058);
