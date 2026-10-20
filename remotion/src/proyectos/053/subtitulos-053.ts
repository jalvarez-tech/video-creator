/**
 * LOS RÓTULOS EDITORIALES DEL RECORRIDO 053 — `BloqueEditorial[]`.
 *
 * **NO HAY VOZ EN OFF** (cambio de encargo del 2026-10-20, `proyectos/044/reparto-051-053.md` §5 y §5c): lo que decía la locución del original lo dicen estos rótulos, el guion NUEVO en pantalla que resalta las plusvalías del arriendo, con las letras
 * del texto editorial del canal (Montserrat y Playfair Display itálica en la palabra marcada, blanco sin sombra, banda inferior al 90 %; skill `recorrido-luxur`, `subtitulos-editoriales.md`). Un rótulo por tramo, UNO a la vez, sincronizado a los
 * planos y a los golpes de la música (`GOLPES` en `metraje-053.ts`), NO a una voz: cada rótulo entra en el frame en que suena el golpe de su tramo (su primera línea, 1 f antes; la del acento, 7-8 f después). Frames ABSOLUTOS de la composición, a 30 fps.
 * Solo hablan Isabella en el GANCHO (HK05: «¿Deseas arrendar amoblado en Medellín? Ven, te muestro.»; bloques `h01`-`h03`, llevados a su palabra con `onsets-voz.py` y `palabras-desde.py`, R31) y en el CTA (CT05: `z01`, `z02`, de
 * `trozos-editoriales.mjs` sobre su transcripción por palabra). El resto son rótulos.
 *
 * LOS NUEVE RÓTULOS, tal cual los dio el usuario (reparto §5c; tuteo, sin exclamaciones, una palabra acentuada por rótulo):
 *   gancho   ¿Deseas arrendar **amoblado** en Medellín? Ven, te muestro.   lo DICE Isabella caminando (HK05, voz en directo; decisión del usuario, 2026-10-20). La primera versión llevaba aquí un rótulo mudo,
 *            «¿Pagarías $14.800.000 al mes por vivir aquí?», que ya no está: el canon queda en la ficha de la versión con ficha y en el caption
 *   1        Mira lo que **incluye**:                                  cielo y ciudad (RC10)
 *   2        **Jacuzzi** privado con vista a Medellín                  el jacuzzi privado (RC10, 8-10,7 s)
 *   3        113 m² **amoblados** y equipados                          cocina y sala con la palma (RC01)
 *   4        Piscina, gimnasio, spa y **coworking**                    el bar (RC22) y el balcón con las camas (RC03)
 *   5        Y lo que no esperabas:                                    las torres (RC03)
 *   6        **Aseo** semanal incluido                                 la alcoba (RC05)
 *   7        **Acompañamiento** personalizado                          la pared del televisor (RC05)
 *   8        **Chef** privado y conductor a tu medida                  la sala con el sofá (RC04)
 *   9        Con la mejor **asesoría** de la ciudad                    el carril de nado (RC16)
 * Lo que prometen lo dio el usuario (aseo semanal incluido, acompañamiento personalizado, chef privado, transporte/conductor, «la mejor asesoría de la ciudad»); **ninguno dice que el chef o el transporte vayan incluidos en el canon**.
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). EXCEPCIÓN DECLARADA a la regla fija 1 (la réplica abre con Isabella): su primer subtítulo entra en el f6, con el f0 limpio y su primera sílaba en el f7. El cierre lleva el LOGO, que es una imagen
 * (`LogoCierre` en `Recorrido053.tsx`) y no un bloque de texto.
 *
 * CIFRA EN PANTALLA: «113 m²» (el área, en el rótulo 3: es el texto del usuario). Ninguna otra (el gancho ya no lleva la de $14.800.000).
 *
 * POR CONFIRMAR AL OÍDO (la puerta con `--final` falla SOLO por ello; el usuario va a oír la voz en la prueba): el gancho, «¿Deseas arrendar **amoblado** en **Medellín**? Ven, te muestro.» (HK05, 24,65-29,4 s). El texto es el del reparto
 * y el del vídeo editado `01.mp4`; whisper small oye, sobre el audio de la toma (a −26 dBFS, con eco de sala), «desearas a rendar a moblado en» y «de la media» donde va «Medellín»: las dos palabras no se han cerrado con una pasada limpia.
 *
 * EL ACENTO MARCA LO QUE SE LLEVA UNO (uno por rótulo, ≥ 2 s entre dos): amoblado · incluye · Jacuzzi · amoblados · coworking · Aseo · Acompañamiento · Chef · asesoría · escríbenos.
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_053 } from "./metraje-053";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_053 = 8;

export const subtitulos053: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el gancho: Isabella caminando (HK05) DICE «¿Deseas arrendar amoblado en Medellín? Ven, te muestro.» (su voz en directo, 24,65-29,4 s del clip: primera sílaba en el f7); el f0 sale limpio y cada línea entra en su palabra ──
  { id: "h01", hasta: 56, trozos: [{ desde: 6, texto: "¿Deseas" }] },
  {
    id: "h02",
    hasta: 126,
    trozos: [
      { desde: 57, texto: "arrendar" },
      { desde: 75, texto: "amoblado", estilo: "acento" },
      { desde: 88, texto: "en Medellín?" },
    ],
  },
  {
    id: "h03",
    hasta: 160,
    trozos: [
      { desde: 127, texto: "Ven," },
      { desde: 135, texto: "te muestro." },
    ],
  },
  // ── Bloque 5 · un rótulo por tramo, cada uno en el golpe de su cambio ──
  // 1 · el cielo y la ciudad (c02, el golpe de 50,93 s: f176)
  {
    id: "r01",
    hasta: 301,
    trozos: [
      { desde: 175, texto: "Mira lo que" },
      { desde: 184, texto: "incluye:", estilo: "acento" },
    ],
  },
  // 2 · el jacuzzi privado (el golpe de 55,18 s: f236; la tina entra en cuadro)
  {
    id: "r02",
    hasta: 419,
    trozos: [
      { desde: 303, texto: "Jacuzzi", estilo: "acento" },
      { desde: 312, texto: "privado con vista a Medellín" },
    ],
  },
  // 3 · la cocina y la sala con la palma (c03, el golpe de 59,08 s: f353)
  {
    id: "r03",
    hasta: 543,
    trozos: [
      { desde: 420, texto: "113 m²" },
      { desde: 428, texto: "amoblados", estilo: "acento" },
      { desde: 438, texto: "y equipados" },
    ],
  },
  // 4 · el bar y el balcón con las camas (c04, el golpe de 63,22 s: f477)
  {
    id: "r04",
    hasta: 684,
    trozos: [
      { desde: 544, texto: "Piscina, gimnasio, spa y" },
      { desde: 554, texto: "coworking", estilo: "acento" },
    ],
  },
  // 5 · las torres (sobre el mismo plano, el golpe de 67,91 s: f618)
  { id: "r05", hasta: 800, trozos: [{ desde: 685, texto: "Y lo que no esperabas:" }] },
  // 6 · la alcoba (c06, el golpe de 71,77 s: f734)
  {
    id: "r06",
    hasta: 904,
    trozos: [
      { desde: 801, texto: "Aseo", estilo: "acento" },
      { desde: 810, texto: "semanal incluido" },
    ],
  },
  // 7 · la pared del televisor (sobre el mismo plano, el golpe de 75,26 s: f838)
  {
    id: "r07",
    hasta: 994,
    trozos: [
      { desde: 905, texto: "Acompañamiento", estilo: "acento" },
      { desde: 914, texto: "personalizado" },
    ],
  },
  // 8 · la sala con el sofá (c07, el golpe de 78,25 s: f928)
  {
    id: "r08",
    hasta: 1119,
    trozos: [
      { desde: 995, texto: "Chef", estilo: "acento" },
      { desde: 1004, texto: "privado y conductor" },
      { desde: 1016, texto: "a tu medida" },
    ],
  },
  // 9 · el carril de nado (c08, el golpe de 82,42 s: f1053)
  {
    id: "r09",
    hasta: 1264,
    trozos: [
      { desde: 1120, texto: "Con la mejor" },
      { desde: 1129, texto: "asesoría", estilo: "acento" },
      { desde: 1140, texto: "de la ciudad" },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT05): imagen opaca en el f1267, primera palabra en el f1282 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "z01",
    hasta: 1343,
    trozos: [
      { desde: 1282, texto: "Si buscas más que un" },
      { desde: 1305, texto: "apartamento para vivir," },
    ],
  },
  { id: "z02", hasta: 1374, trozos: [{ desde: 1353, texto: "escríbenos.", estilo: "acento" }] },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos053Srt = segmentosDe(subtitulos053, FPS_053);
