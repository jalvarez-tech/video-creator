/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 064 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cinco palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/064/voz/*.txt`: lo que se OYE, comprobado por cortes aislados) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31). Cada línea entra 0-3 f ANTES de su palabra (la primera de cada toma, en el frame de su primera sílaba, con la imagen ya opaca).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la apertura de dron): el primer subtítulo entra en el f130, con la imagen de Isabella (opaca desde el f117), en el
 * frame de su primera sílaba (f130,1). Tampoco hay subtítulos mientras sale la INFOGRAFÍA (f378-f557): ella no habla ahí. El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido064.tsx`) y no un bloque de texto.
 *
 * CIFRA DICHA = CIFRA ESCRITA (reparto 063-065): Isabella dice «trescientos cincuenta millones» (whisper: «350 millones») y «tres mil doscientos cuarenta y cuatro metros cuadrados» (whisper: «3.244 metros cuadrados») en
 * el hook, y otra vez los metros en la mitad: se escriben las tres, en dígitos, en base y SIN acento (el acento es la distancia, no el dato). Ningún dato grande: el dato grande solo va en el bloque 3, y aquí no hay.
 *
 * LOS ACENTOS son el hilo de la pieza, la DISTANCIA: «cerca de Medellín» (el hook), «a tres horas» (la mitad: lo que NO hace falta) y «escríbeme» (la acción del CTA), uno por bloque y con más de 10 s entre dos: f140 · f612 · f1088.
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook A (en 117, desde 196 f)   «Un lote» 6,97 · «cerca de» ≈ 7,30 · «por» 8,29 · «Sí» 10,46 · «tres mil» ≈ 11,2 · «cuadrados» 12,775
 *   hook B (en 327, desde 413 f)   «Ven» 13,925 (tras la pausa de 13,38-13,92 s y un soplo de −50…−40 dB a 13,83-13,91 s)
 *   mitad (en 573, desde 205 f)    «No necesitas» 7,28 · «a tres» ≈ 8,17 · «de Medellín» 8,735 · «para» 9,565
 *   CTA (en 1007, desde 184 f)     «Si estás» 6,57 · «tierra» 7,28 · «escríbeme» 8,86 · «y te envío» 9,515 · «todos los» 10,12 · «para que» 11,19 · «este» 11,955
 * Los cortes de whisper (DTW) no valen para esto: en cada toma la voz empieza a los 6,6-7,3 s y whisper pone las primeras palabras en 0,0 s; las líneas salen del arranque de la sílaba tras cada pausa (valle ≤ −55 dB) y de
 * `palabras-desde.py` (qué palabra es la primera que se oye desde un instante).
 *
 * LA MITAD ACABA EN «cuadrados» (HK05): la toma sigue con «Ven, te muestro, este es un [precio] de lote», pero la parte B se descarta (la 064 ya usa el «ven, te muestro» de Hook2) y lo que sigue («este es un pre-», una pausa de
 * 1,8 s y otro bloque de voz que no se lee) queda fuera: no hay ninguna palabra dudosa en pantalla porque la dudosa no está.
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · «asombroso» (CT03, f1181 = 39,4 s del vídeo): whisper-small oye «asombroso» en la toma entera (confianza 0,44) y «sombroso» o «estas son los olote» cortando desde 11,955 s; la frase del catálogo es «este asombroso lote».
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_064 } from "./metraje-064";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_064 = 8;

export const subtitulos064: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK02): imagen opaca desde el f117, primera sílaba en el f130,1. Parte A (hasta el f327) y parte B («Ven, te muestro», a corte, primera sílaba en el f332) ──
  {
    id: "h01",
    hasta: 168,
    trozos: [
      { desde: 130, texto: "¿Un lote" },
      { desde: 140, texto: "cerca de Medellín", estilo: "acento" },
    ],
  },
  { id: "h02", hasta: 222, trozos: [{ desde: 168, texto: "por 350 millones?" }] },
  {
    id: "h03",
    hasta: 328,
    trozos: [
      { desde: 234, texto: "Sí, y tiene" },
      { desde: 256, texto: "3.244 metros" },
      { desde: 303, texto: "cuadrados." },
    ],
  },
  { id: "h04", hasta: 361, trozos: [{ desde: 331, texto: "Ven, te muestro." }] },
  // ── Bloque 4 · la mitad DICHA (HK05, solo su primera frase): imagen opaca desde el f573, primera palabra en el f586,4 ──
  {
    id: "m01",
    hasta: 650,
    trozos: [
      { desde: 586, texto: "No necesitas estar" },
      { desde: 612, texto: "a tres horas", estilo: "acento" },
      { desde: 629, texto: "de Medellín" },
    ],
  },
  { id: "m02", hasta: 748, trozos: [{ desde: 654, texto: "para tener 3.244 metros cuadrados." }] },
  // ── Bloque 6 · el CTA DICHO (CT03): entra disolviendo y es opaco en el f1007, primera palabra en el f1020,1 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 1081,
    trozos: [
      { desde: 1020, texto: "Si estás buscando" },
      { desde: 1040, texto: "tierra cerca de Medellín," },
    ],
  },
  {
    id: "c02",
    hasta: 1156,
    trozos: [
      // «escríbeme» entra 1 f antes de su «es» (8,86 s, f1089) y «y te envío» 1 f antes de su «y» (9,515 s, f1108): tras las pausas de 8,52-8,86 y 9,45-9,51 s.
      { desde: 1088, texto: "escríbeme", estilo: "acento" },
      { desde: 1107, texto: "y te envío" },
      { desde: 1126, texto: "todos los detalles" },
    ],
  },
  {
    id: "c03",
    hasta: 1227,
    trozos: [
      { desde: 1158, texto: "para que conozcas" },
      { desde: 1181, texto: "este asombroso lote." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos064Srt = segmentosDe(subtitulos064, FPS_064);
