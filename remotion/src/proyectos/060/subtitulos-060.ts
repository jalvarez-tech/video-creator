/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 060 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cinco palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/060/voz/*.txt`: lo escribo yo con lo que se OYE, comprobado por cortes) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `envolvente-voz.py`, sílaba a sílaba), no al DTW de whisper (R31): el DTW de este rodaje iba de 4 a 11 f PRONTO en `pierde valor`, `cada mes`, `en Laureles`, `ya está generando`, `deja el 0,5 %`
 * y `deja más del 1 %`. Cada línea entra 0-3 f ANTES de su palabra (la primera de cada toma, en el frame en que su imagen ya es opaca).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la apertura, ZC07): el primer subtítulo entra en el f99, con la imagen de Isabella (opaca desde el f92),
 * en el frame de su primera sílaba (f99,2). El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido060.tsx`) y no un bloque de texto.
 *
 * LAS CIFRAS EN PANTALLA SON LAS QUE ELLA DICE (R33, «cifra dicha = cifra escrita»): «24 metros cuadrados» (hook), «0,5 %» y «1 %» (mitad). Los porcentajes son una afirmación de rentabilidad que dice SU voz: aquí
 * solo se transcriben, en la línea base y SIN acento; el acento de la mitad es la invitación («te muestro cómo»). Ningún rótulo del canal repite esos números, ni el caption.
 *
 * EL ACENTO MARCA EL ÁNGULO (la inversión): «dólares.» (el hook: lo que el estudio ya hace), «te muestro cómo.» (la mitad: la invitación) y «escríbeme» (la acción del CTA). Solo hay uno por bloque y entre dos hay
 * ≥ 10 s: f304 · f842 · f1539.
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 92, desde 12 f)    «Tu» 0,64 · «pierde» 1,86 (tras una pausa de 0,17 s) · «cada mes» 2,465 (la /k/ de «cada» tras el cierre de 2,40-2,46 s) · «Este» 3,44 (tras 0,49 s de pausa) · «de» ≈ 4,40 ·
 *                               «en Laureles» 5,865 · «ya» 6,82 (tras 0,24 s de pausa) · «dólares» 7,495
 *   mitad (en 619, desde 27 f)  «La» 1,31 · «deja» 2,555 · «de» (rentabilidad) ≈ 3,37 · «Esta» 5,635 (tras 0,66 s de pausa) · «deja» 6,785 · «Ven» 8,02 · «te muestro cómo» 8,325 (tras 0,3 s de pausa)
 *   CTA (en 1422, desde 16 f)   «Si» 0,96 · «la» (rentabilidad) ≈ 1,98 · «haz» 3,455 (tras 0,3 s de pausa) · «y escríbeme» 4,485 · «un» ≈ 5,115
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas). Medidas en
 * `proyectos/060/medidas/formantes-hook.txt`, `formantes-mitad.txt` y `formantes-cta.txt`:
 *   · «cada mes» (HK03, f153 = 5,1 s del vídeo): whisper oye «kamis» (confianza 0,14-0,66). Apoyan «cada mes» una /k/ con su cierre de 60-70 ms antes de una [a] larga (0,24 s: «ca-da» con una /d/ aproximante en medio,
 *     F2 1265-1340 Hz) y, tras ella, una /m/ + [e] + /s/ (F2 2800 Hz de la /s/ a 2,91-2,94 s). No lo cierra: una medida no es un oído.
 *   · «de 24» (HK03, f211 = 7,0 s): whisper no oye «de» antes de «24». Hay una sílaba breve a los 4,40-4,44 s (−12 dB, entre dos valles) que apoya «de»; si no existiera, la línea entraría en el f215 con «24».
 *   · «0,5 %» y «1 %» (MD05, f668-f693 y f795-f810 = 22,3-23,1 s y 26,5-27 s): whisper oye «el 0.5» y «más del 1%» sin «por ciento»; el escrito «0,5 %» vale tanto para «cero coma cinco por ciento» como para «medio por ciento».
 *   · «ven, te muestro cómo» (MD05, f832-f841 = 27,7-28 s): whisper oye «veinte muestros como» (confianza 0,16-0,47). La envolvente lo parte en «ven» (8,02-8,10 s) · pausa de 0,2 s · «te» (8,325) · «mues» (8,535) · «tro»
 *     (8,835) · «có-mo» (9,015-9,24): siete sílabas, como «ven, te muestro cómo» y no como «veinte muestros como» (seis, sin pausa).
 *   · «escríbeme» (CT03, f1539 = 51,3 s): whisper oye «escribete» (confianza 0,29-0,57) y, sobre la cola aislada, «escribamos». La gramática y el catálogo dicen «escríbeme un mensaje». Tras la [i] de «crí» hay un
 *     episodio labial de 40 ms (F2 440-550 Hz: la /b/), una [e] muy breve y ≈ 100 ms de casi silencio (4,87-4,96 s) que NO es el murmullo de una /m/ (la /m/ de «mensaje» sí lo es: −32 dB, F2 700-880 Hz): pudo ser el
 *     cierre de otra consonante. SIN CERRAR: se exporta «escríbeme» (la gramática) y la nota se queda.
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_060 } from "./metraje-060";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_060 = 8;

export const subtitulos060: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK03): imagen opaca desde el f92, primera sílaba en el f99,2 ──
  {
    id: "h01",
    hasta: 176,
    trozos: [
      { desde: 99, texto: "Tu plata en el banco" },
      { desde: 135, texto: "pierde valor" },
      { desde: 153, texto: "cada mes." },
    ],
  },
  {
    id: "h02",
    hasta: 281,
    trozos: [
      { desde: 182, texto: "Este estudio" },
      { desde: 211, texto: "de 24 metros cuadrados" },
      { desde: 255, texto: "en Laureles" },
    ],
  },
  {
    id: "h03",
    hasta: 326,
    trozos: [
      { desde: 284, texto: "ya está generando" },
      { desde: 304, texto: "dólares.", estilo: "acento" },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD05): imagen opaca desde el f619, primera palabra en el f631,3 ──
  {
    id: "m01",
    hasta: 749,
    trozos: [
      { desde: 631, texto: "La renta tradicional" },
      { desde: 668, texto: "deja el 0,5 %" },
      { desde: 692, texto: "de rentabilidad mensual." },
    ],
  },
  {
    id: "m02",
    hasta: 827,
    trozos: [
      { desde: 761, texto: "Esta inversión" },
      { desde: 795, texto: "deja más del 1 %." },
    ],
  },
  {
    id: "m03",
    hasta: 874,
    trozos: [
      // «Ven,» entra 2,6 f antes de su palabra (8,02 s = f832,6) para que haya 12 f hasta «te muestro cómo» (8,325 s = f841,75; entra en el f842, a 0,25 f de su palabra).
      { desde: 830, texto: "Ven," },
      { desde: 842, texto: "te muestro cómo.", estilo: "acento" },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT03): entra disolviendo y acaba en el f1422 (rev. 2: la infografía de 14 s alarga el bloque 5); primera palabra en el f1434,8 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 1505,
    trozos: [
      { desde: 1434, texto: "Si deseas que te envíe" },
      { desde: 1465, texto: "la rentabilidad mensual," },
    ],
  },
  {
    id: "c02",
    hasta: 1578,
    trozos: [
      { desde: 1509, texto: "haz clic en el enlace" },
      // La «y» (4,485 s = f1540,5 desde la rev. 2; f1319,5 en la rev. 1) va con el acento: «y escríbeme» (la «y» y la «e» de «es-» son un deslizamiento [i]→[e] de 4,485 a 4,64 s).
      { desde: 1539, texto: "y escríbeme", estilo: "acento" },
      { desde: 1559, texto: "un mensaje." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos060Srt = segmentosDe(subtitulos060, FPS_060);
