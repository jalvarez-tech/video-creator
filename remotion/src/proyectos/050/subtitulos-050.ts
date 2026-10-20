/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 050 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con un acento por frase (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 *
 * El TEXTO sale del guion marcado (un `.txt` por fuente de voz en `proyectos/050/voz/`: `hk02.txt`, `md04.txt`, `ct02.txt`) y los TIEMPOS, de la voz: `trozos-editoriales.mjs` con el `en` y el `desde` de cada
 * corte propone los frames, y CADA LÍNEA se lleva a su palabra con la voz sola (R31: `onsets-voz.py` da los arranques de sílaba y `palabras-desde.py` dice qué palabra abre cada uno; el DTW de whisper va hasta 0,5 s pronto
 * a mitad de frase). Lo que la herramienta puso y se movió a mano, con el segundo de la fuente de cada palabra:
 *   hook   «más valioso» f35 (1,45 s: tras una pausa de −56 dB; el DTW lo ponía en f38) · «de los seres humanos.» f53 (2,09 s: «va-lio-so» acaba en 1,94; el DTW lo ponía en f52 y una estimación a ojo en f50) · «Te ayudamos…» f90 (3,30 s, «Te» suave: desde 3,28 s whisper oye «Ya», desde 3,50 «Te ayudamos»;
 *          la herramienta lo ponía en f98, 8 f tarde) · «incluyéndote un» f137 (4,87 s) · «aseo semanal.» f166 (5,83 s).
 *   mitad  `$14.800.000` f451 (la palabra «Catorce» empieza a los 0,555 s = f453: entra 2 f antes) · «experiencias» f511 (2,49 s; con el acento del precio, 60 f: justo los 2 s que pide el validador).
 *   CTA    «que tenga…» f907 (2,43 s: tras la pausa de 240 ms; el DTW lo ponía en f900) · «escríbeme.» f967 (4,43 s: «es-» a −15 dB, luego un valle y «crí» a 4,605 s; el DTW f970).
 *
 * LA ÚNICA CIFRA DE LA SERIE: `$14.800.000` (el canon mensual de la ficha: COP 14.800.000 al mes; sale del catálogo y no de whisper). Se pinta como acento y se «dice» «catorce millones ochocientos»
 * (`{…}` del guion marcado). Va en el bloque 4 (la mitad): no hay ninguna cifra en los bloques 5 y 6.
 *
 * POR CONFIRMAR AL OÍDO (la puerta con `--final` falla por esto; ver `01-plan.md`): «aseo» (HK02, f166 = 5,5 s de la pieza) e «incluyéndote» (f137 = 4,6 s) · «catorce millones ochocientos» (¿«de»? MD04, f453 = 15,1 s)
 * · «amoblado» (CT02, ≈ f893 = 29,8 s). Los textos de la pantalla son lo que dice el catálogo; el oído decide.
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0): el cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido050.tsx`) y no un bloque de texto: nada de `@propiedadesluxur` en pantalla.
 * Esta pieza ABRE CON EL HOOK (excepción por encargo): su primer texto entra en el f4, con su primera palabra.
 */
import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_050 } from "./metraje-050";

/** Px que se restan a la cursiva (el 017 lo pidió así y las versiones del canal lo comparten). */
export const ACENTO_MENOS_050 = 8;

export const subtitulos050: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook dicho: abre la pieza, con su voz ──
  {
    id: "h01",
    hasta: 88,
    trozos: [
      { desde: 4, texto: "El tiempo es el activo" },
      { desde: 35, texto: "más valioso", estilo: "acento" },
      { desde: 53, texto: "de los seres humanos." },
    ],
  },
  {
    id: "h02",
    hasta: 196,
    trozos: [
      { desde: 90, texto: "Te ayudamos a optimizarlo," },
      { desde: 137, texto: "incluyéndote un" },
      { desde: 166, texto: "aseo semanal.", estilo: "acento" },
    ],
  },
  // ── Bloque 4 · la mitad: el precio ──
  { id: "m01", hasta: 496, trozos: [{ desde: 451, texto: "$14.800.000", estilo: "acento" }] },
  {
    id: "m02",
    hasta: 566,
    trozos: [
      { desde: 496, texto: "que incluyen" },
      { desde: 511, texto: "experiencias", estilo: "acento" },
      { desde: 539, texto: "pensadas para ti." },
    ],
  },
  // ── Bloque 6 · el CTA (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 991,
    trozos: [
      { desde: 858, texto: "Si quieres un apartamento amoblado" },
      { desde: 907, texto: "que tenga acompañamiento personalizado," },
      { desde: 967, texto: "escríbeme.", estilo: "acento" },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos050Srt = segmentosDe(subtitulos050, FPS_050);
