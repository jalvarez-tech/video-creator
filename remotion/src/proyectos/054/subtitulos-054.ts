/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 054 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/054/voz/*.txt`: lo escribo yo con lo que se OYE, comprobado por cortes) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31): en el hook y en la mitad el DTW de las primeras palabras iba de 6 a 9 f pronto o tarde. Cada línea entra 0-3 f ANTES de su palabra (la primera
 * de cada toma, en el frame de su primera sílaba, 8 f después del corte).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la aérea, DR01): el primer subtítulo entra en el f91, con la primera sílaba de Isabella. El cierre lleva
 * el LOGO, que es una imagen (`LogoCierre` en `Recorrido054.tsx`) y no un bloque de texto.
 *
 * LAS CIFRAS. Lo que se dice con número se escribe con número (regla del canal: cifra dicha = cifra escrita): la mitad dice «cincuenta minutos» y «ciento veinte mil» y se pinta «50 minutos» y «120.000.». Son las
 * DOS cifras de la pieza y las únicas; no hay `dato` aparte porque van dentro de la frase que Isabella dice.
 *
 * EL ACENTO MARCA LA IDEA (el ángulo de la pieza): «vecinos encima.» (el hook: el anti-torre), «50 minutos» (la mitad: la privacidad no está lejos) y «Escríbeme» (la acción del CTA). Solo hay uno por bloque y entre dos
 * hay ≥ 2 s: f171 · f423 · f1013.
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 83, desde 24 f)   «El lujo real» 1,06 · «no es tener» 1,84 · «una torre» 2,50 · «con vista,» 2,79 · «es no tener» 3,165 · «vecinos encima.» 3,765
 *   mitad (en 400, desde 17 f) «Está a los» 0,82 · «50 minutos» 1,32 · «de Medellín» 1,86 · «con una administración» 2,77 · «de 120.000.» 3,725
 *   CTA (en 903, desde 23 f)   «Si valoras espacio» 1,02 · «y privacidad,» 1,615 · «este espacio» 2,855 · «te va a encantar.» 3,405 · «Escríbeme» 4,42 · «y agendemos» 4,90 · «una visita.» 5,42 (acaba en 5,94: la «-ta» final)
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · «vista» (HK01, f143 = 4,8 s del vídeo): whisper oye «visa» en todos los cortes. La voz va flaca (camina con viento: −24 LUFS crudos, el viento a −26 dB del pico) y la /t/ no se distingue. Se pinta «vista»
 *     (lo que dice la frase en el catálogo y lo que pide «una torre con…»).
 *   · «vecinos» (HK01, f171 = 5,7 s del vídeo): whisper oye «vecinas». La vocal final de la sílaba tónica mide F1 ≈ 630 y F2 ≈ 1.880 Hz y la /o/ de la misma voz no cierra: no hay medida que lo resuelva. Se pinta «vecinos».
 *   · «Está a los» (MD04, f406 = 13,5 s del vídeo): whisper oye «Hace los» (toma entera), «Hasta los» (rebanada 0,78-1,45 s) y «Solo» (rebanadas desde 0,90 s): son tres cuerpos de la misma cosa, «está a los 50 minutos». Se
 *     pinta «Está a los». El catálogo escribía «[Está] a 50»: el «los» se oye en las tres lecturas.
 *   · «50 minutos» y «120.000.» (MD04, f423 y f495): se dicen «cincuenta» y «ciento veinte mil»; whisper las oye como cifras y la segunda sale a veces «120 mil». Se pintan con cifra, como manda la regla.
 *   · «valoras» (CT06, f911 = 30,4 s del vídeo): whisper oye «valores» (confianza 0,35 en «val»). Por formantes la sílaba «-ras» mide F1 ≈ 680 y F2 ≈ 1.650 Hz (la /a/ de «va-» de la misma toma, F1 ≈ 770 y F2 ≈ 1.600-1.770)
 *     y no la /e/ de «espacio» que viene detrás (F2 ≈ 2.000): una [a]. Se pinta «valoras». Una medida no es un oído.
 *   · «agendemos» (CT06, f1027 = 34,2 s del vídeo): whisper oye «haciéndemos» en la toma entera y «agendemos» en todas las rebanadas desde 4,42 s (`palabras-desde.py`): cerrada por cortes, se anota por ser la acción de la pieza.
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_054 } from "./metraje-054";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_054 = 8;

export const subtitulos054: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK01): imagen desde el f83, primera sílaba en el f91 ──
  {
    id: "h01",
    hasta: 134,
    trozos: [
      { desde: 91, texto: "El lujo real" },
      { desde: 112, texto: "no es tener" },
    ],
  },
  { id: "h02", hasta: 154, trozos: [{ desde: 134, texto: "una torre con vista," }] },
  {
    id: "h03",
    hasta: 209,
    trozos: [
      { desde: 154, texto: "es no tener" },
      { desde: 171, texto: "vecinos encima.", estilo: "acento" },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD04): imagen desde el f400, primera sílaba en el f408 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "m01",
    hasta: 466,
    trozos: [
      { desde: 406, texto: "Está a los" },
      { desde: 423, texto: "50 minutos", estilo: "acento" },
      { desde: 439, texto: "de Medellín" },
    ],
  },
  {
    id: "m02",
    hasta: 521,
    trozos: [
      { desde: 466, texto: "con una administración" },
      { desde: 495, texto: "de 120.000." },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT06): imagen desde el f903, primera sílaba en el f911 ──
  {
    id: "c01",
    hasta: 966,
    trozos: [
      { desde: 911, texto: "Si valoras espacio" },
      { desde: 928, texto: "y privacidad," },
    ],
  },
  {
    id: "c02",
    hasta: 1013,
    trozos: [
      { desde: 966, texto: "este espacio" },
      { desde: 982, texto: "te va a encantar." },
    ],
  },
  {
    id: "c03",
    hasta: 1072,
    trozos: [
      { desde: 1013, texto: "Escríbeme", estilo: "acento" },
      { desde: 1027, texto: "y agendemos" },
      { desde: 1043, texto: "una visita." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos054Srt = segmentosDe(subtitulos054, FPS_054);
