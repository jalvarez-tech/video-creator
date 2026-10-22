/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 059 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cinco palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/059/voz/*.txt`: lo escribo yo con lo que se OYE, comprobado por cortes) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31). Cada línea entra 0-3 f ANTES de su palabra (la primera de cada toma, en el frame en que su imagen ya es opaca).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la apertura, DR09): el primer subtítulo entra en el f97, con la imagen de Isabella (opaca desde el f86),
 * en el frame de su primera sílaba (f97,4). El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido059.tsx`) y no un bloque de texto.
 *
 * NO HAY CIFRAS EN PANTALLA: las tres frases de Isabella no dicen ninguna (los 60 m² y el precio van al caption y a la versión con ficha).
 *
 * EL ACENTO MARCA EL ÁNGULO (vivir y trabajar bien): «de donde vives.» (el giro del hook: el estrés viene de la casa), «Zona de trabajo» (la mitad: lo que la casa resuelve) y «Escríbeme» (la acción del CTA). Solo hay
 * uno por bloque y entre dos hay ≥ 10 s: f185 · f503 · f999.
 *
 * CORREGIDO en la exportación (todas mirando la envolvente de la voz sola, sílaba a sílaba; los cortes de whisper se contradicen entre sí): «a veces no viene» entraba en el f111 (1,25 s) y su «a» arranca a los 1,495 s (f119); «de donde vives.» entraba en el f183 (3,68 s) y su «de» arranca hacia los 3,78 s (f187); «los detalles.» entraba en el f1026 (3,45 s) y su «los» arranca a los 3,66 s (f1031); «paz» a 1,26 s (f958). El valle de 1,22-1,31 s es la oclusiva de la /t/ de «trés» y no una pausa antes de «a»: con la voz a ≈ 9 sílabas por segundo, «Sabes que el estrés» ocupa de 0,78 a ≈ 1,45 s.
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 86, desde 12 f)   «Sabes» 0,78 · «a veces no viene» ≈ 1,495 · «solo» 2,18 · «a veces viene» 3,225 (tras una pausa) · «de donde vives» ≈ 3,78
 *   mitad (en 492, desde 17 f) «Zona» 0,98 · «separada» 1,71 · «porque» 2,66 · «desde» 3,12 · «ya» 4,12 · «una opción» 4,535
 *   CTA (en 924, desde 3 f)    «Si» 0,46 · «paz» ≈ 1,26 · «Escríbeme» 2,62 · «y te doy todos» ≈ 3,15 · «los detalles» ≈ 3,66
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · «el estrés» (HK04, f97-111 = 3,2-3,7 s del vídeo): whisper oye «la estresa» (también «el estrés» en el catálogo de la sesión madre: `proyectos/057/catalogo/catalogo-material.md`). El sentido de la frase y el encargo dicen
 *     «el estrés»; la medida de la vocal del artículo («el» o «la») está en `proyectos/059/medidas/formantes-hook.txt`.
 *   · «del trabajo» (HK04, f138 = 4,6 s): whisper oye «el trabajo» a veces y «del trabajo» otras (cortando desde 1,90 s oye «no viene sólo del trabajo»; desde 2,30 s, «el trabajo»): la «d» de «del» es corta.
 *   · «vives» (HK04, f184 = 6,1 s): whisper oye «vive» en la primera pasada, y «vives» (con la «s» final) en cuanto se corta desde 2,53 s o 2,90 s; la voz va a ≈ 8 sílabas por segundo y la «s» final dura ≈ 0,1 s.
 *   · «porque» (MD09, f554): whisper le da una confianza de 0,38 (el resto de la frase, ≥ 0,64); cortando desde 2,60 s oye «porque trabajar desde la cama».
 *   · «escríbeme» (CT03, f999): whisper oye «escríeme» (confianza 0,41 en «esc-»); es «escríbeme» (la «b» se suaviza).
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_059 } from "./metraje-059";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_059 = 8;

export const subtitulos059: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK04): imagen opaca desde el f86, primera sílaba en el f97,4 ──
  {
    id: "h01",
    hasta: 168,
    trozos: [
      { desde: 97, texto: "Sabes que el estrés" },
      { desde: 118, texto: "a veces no viene" },
      { desde: 138, texto: "solo del trabajo," },
    ],
  },
  {
    id: "h02",
    hasta: 214,
    trozos: [
      { desde: 170, texto: "a veces viene" },
      { desde: 185, texto: "de donde vives.", estilo: "acento" },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD09): imagen opaca desde el f492, primera palabra en el f504,4 ──
  {
    id: "m01",
    hasta: 566,
    trozos: [
      { desde: 503, texto: "Zona de trabajo", estilo: "acento" },
      { desde: 525, texto: "separada," },
      { desde: 554, texto: "porque trabajar" },
    ],
  },
  {
    id: "m02",
    hasta: 632,
    trozos: [
      { desde: 568, texto: "desde la cama" },
      { desde: 598, texto: "ya no es" },
      { desde: 610, texto: "una opción." },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT03): entra a corte en el f924, primera palabra en el f934,8 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 996,
    trozos: [
      { desde: 934, texto: "Si estás buscando" },
      { desde: 958, texto: "paz y comodidad," },
    ],
  },
  {
    id: "c02",
    hasta: 1054,
    trozos: [
      // «y te doy todos» entra 2 f antes de su «y» (≈ 3,15 s, f1016) y «los detalles.» 1 f antes de su «los» (3,66 s, f1031): a 16 f una de otra.
      { desde: 999, texto: "Escríbeme", estilo: "acento" },
      { desde: 1014, texto: "y te doy todos" },
      { desde: 1030, texto: "los detalles." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos059Srt = segmentosDe(subtitulos059, FPS_059);
