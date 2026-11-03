/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 063 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/063/voz/*.txt`: lo que se OYE, comprobado por cortes) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py` + la envolvente de energía), no al DTW de whisper (R31). Cada línea entra 0-3 f ANTES de su palabra (la primera de cada toma, en el frame en que su imagen ya es opaca).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la apertura, DR02): el primer subtítulo entra en el f102, con la imagen de Isabella (opaca desde el
 * f91), 1 f antes de su primera sílaba. El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido063.tsx`) y no un bloque de texto.
 *
 * NINGUNA CIFRA EN LOS SUBTÍTULOS: las tres frases de Isabella no dicen ninguna (no dicen ni los 3.244 m² ni los 350 millones). La infografía «Lo que sí tiene» (`Infografia063.tsx`, encargo del usuario) escribe dos
 * de la ficha (3.244 m² y 100 %) mientras ELLA NO HABLA (f323-f539); el precio va al caption y a la versión con ficha. Lo que la web no dice (energía, uso del suelo, vía de acceso) tampoco está en pantalla.
 *
 * EL ACENTO MARCA LA CONFIANZA (el ángulo de la pieza): «acometidas legales.» (el hook: lo que falta cuando el lote barato es un error) y «Escríbeme» (la acción del CTA). En la mitad NO hay acento: los rótulos
 * UBICACIÓN · AGUA · ESCRITURAS (`Infografia063.tsx`) llevan el énfasis de las tres cosas. Entre los dos acentos hay ≫ 2 s: f206 · f1205.
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 91, desde 75 f)    «El» 2,90 · «comprar» 3,44 · «lote» 3,915 · «es» 4,915 · «todas» 5,925 · «acometidas» 6,37 · «Ven» 7,755 · «cómo» 8,72
 *   mitad (en 555, desde 96 f)  «Antes» 3,635 · «de un lote» 4,445 · «empieza» 5,28 · «tres» 5,825 · «ubicación» 6,755 · «agua» 7,565 · «escrituras» 8,21 · «Y este» 8,80 · «con todas» 9,69 · «sobre» 10,585
 *   CTA (en 1117, desde 109 f)  «Quieres» 4,05 · «este lote» 4,695 · «a tu presupuesto» 5,34 · «Escríbeme» 6,60 · «y te envío» 7,455 · «la información» 8,22
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · «empieza con tres cosas» (MD01, f616 = 20,5 s del vídeo): el reparto suponía «fíjate en tres cosas». MEDIDO (`formantes.py`, `medidas/formantes-empieza.txt`): tras una /e/ corta (F1 587, F2 2.497 Hz) hay un
 *     murmullo nasal de /m/ (5,29-5,37 s: F1 300-400 y F2 ≈ 720 Hz), un cierre de /p/ (5,39-5,41 s: −53/−58 dB), un deslizamiento /je/ (F2 2.390-2.530), una /s/ (5,50-5,55 s) y una /a/ (F1 ≈ 780, F2 ≈ 1.740):
 *     «em-pie-za» y no «fí-ja-te» (que no lleva nasal, ni cierre de /p/, ni sibilante). Son 5 arranques de sílaba (em-pie-za-con-tres) y whisper lo oye igual en 3 cortes distintos; la segunda frase repite la construcción
 *     («este lote empieza con todas esas cosas»). La medida cierra la palabra, no el oído.
 *   · «evitar esto» (HK01, f277 = 9,2 s del vídeo): whisper oye «hitareza», «ditarés» y «oitar eso»; es lo último que dice el hook y suena pegado («cómo e-vi-tar es-to» en 0,6 s). El catálogo y la toma gemela del reparto
 *     (HK04) dicen «evitar esto». Sin cerrar al oído.
 *   · «lote barato» (HK01, f132 = 4,4 s del vídeo): whisper oye «lote de barato» en 1 de 3 cortes y «lo-te» separado en otro; «lote barato» es lo gramatical y lo que dicen el catálogo y los otros dos cortes.
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_063 } from "./metraje-063";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_063 = 8;

export const subtitulos063: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK01), con su invitación: imagen opaca desde el f91, primera sílaba en el f103 ──
  {
    id: "h01",
    hasta: 162,
    trozos: [
      { desde: 102, texto: "El error no es" },
      { desde: 118, texto: "comprar un" },
      { desde: 132, texto: "lote barato," },
    ],
  },
  {
    id: "h02",
    hasta: 248,
    trozos: [
      { desde: 162, texto: "es comprarlo sin" },
      { desde: 193, texto: "todas las" },
      { desde: 206, texto: "acometidas legales.", estilo: "acento" },
    ],
  },
  {
    id: "h03",
    hasta: 311,
    trozos: [
      { desde: 248, texto: "Ven, te enseño" },
      { desde: 277, texto: "cómo evitar esto." },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD01): imagen opaca desde el f555, primera palabra en el f568. Los rótulos UBICACIÓN · AGUA · ESCRITURAS (`Infografia063.tsx`) llevan el énfasis: aquí, todo en base ──
  {
    id: "m01",
    hasta: 616,
    trozos: [
      { desde: 567, texto: "Antes de enamorarte" },
      { desde: 591, texto: "de un lote," },
    ],
  },
  {
    id: "m02",
    hasta: 685,
    trozos: [
      { desde: 616, texto: "empieza con" },
      { desde: 633, texto: "tres cosas:" },
      { desde: 661, texto: "ubicación," },
    ],
  },
  {
    id: "m03",
    hasta: 722,
    trozos: [
      { desde: 685, texto: "agua y" },
      { desde: 704, texto: "escrituras." },
    ],
  },
  {
    id: "m04",
    hasta: 813,
    trozos: [
      { desde: 722, texto: "Y este lote empieza" },
      { desde: 749, texto: "con todas esas cosas" },
      { desde: 776, texto: "sobre la mesa." },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT02): imagen opaca desde el f1117, primera palabra en el f1130 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 1205,
    trozos: [
      { desde: 1129, texto: "¿Quieres saber si" },
      { desde: 1148, texto: "este lote se ajusta" },
      { desde: 1167, texto: "a tu presupuesto?" },
    ],
  },
  {
    id: "c02",
    hasta: 1279,
    trozos: [
      { desde: 1205, texto: "Escríbeme", estilo: "acento" },
      { desde: 1231, texto: "y te envío toda" },
      { desde: 1254, texto: "la información." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos063Srt = segmentosDe(subtitulos063, FPS_063);
