/**
 * LOS RÓTULOS EDITORIALES DEL RECORRIDO 053 — `BloqueEditorial[]`.
 *
 * **NO HAY VOZ EN OFF** (cambio de encargo del 2026-10-20, `proyectos/044/reparto-051-053.md` §5 y §5c): lo que decía la locución del original lo dicen estos rótulos, el guion NUEVO en pantalla que resalta las plusvalías del arriendo, con las letras
 * del texto editorial del canal (Montserrat y Playfair Display itálica en la palabra marcada, blanco sin sombra, banda inferior al 90 %; skill `recorrido-luxur`, `subtitulos-editoriales.md`). Un rótulo por tramo, UNO a la vez, sincronizado a los
 * planos y a los golpes de la música (`GOLPES` en `metraje-053.ts`), NO a una voz: cada rótulo entra en el frame en que suena el golpe de su tramo (su primera línea, 1 f antes; la del acento, 7-8 f después). Frames ABSOLUTOS de la composición, a 30 fps.
 * Solo el CTA lleva voz (CT05): sus dos bloques (`z01`, `z02`) salen de `trozos-editoriales.mjs` sobre su transcripción por palabra y siguen a su voz (R31).
 *
 * LOS NUEVE RÓTULOS, tal cual los dio el usuario (reparto §5c; tuteo, sin exclamaciones, una palabra acentuada por rótulo):
 *   gancho   ¿Pagarías **$14.800.000** al mes por vivir aquí?        sobre Isabella caminando (HK05, sin voz)
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
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). EXCEPCIÓN DECLARADA a la regla fija 1 (la réplica abre con Isabella): el primer rótulo entra en el f6, con el f0 limpio. El cierre lleva el LOGO, que es una imagen
 * (`LogoCierre` en `Recorrido053.tsx`) y no un bloque de texto.
 *
 * CIFRAS EN PANTALLA: «$14.800.000» (el canon real, del gancho: el original decía «14 millones») y «113 m²» (el área, en el rótulo 3: es el texto del usuario). Ninguna otra.
 *
 * EL ACENTO MARCA LO QUE SE LLEVA UNO (uno por rótulo, ≥ 2 s entre dos): $14.800.000 · incluye · Jacuzzi · amoblados · coworking · Aseo · Acompañamiento · Chef · asesoría · escríbenos.
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
  // ── Bloque 2 · el gancho: Isabella caminando (HK05, sin voz): el f0 sale limpio y el rótulo entra en el f6 ──
  {
    id: "r00",
    hasta: 106,
    trozos: [
      { desde: 6, texto: "¿Pagarías" },
      { desde: 16, texto: "$14.800.000", estilo: "acento" },
      { desde: 28, texto: "al mes por vivir aquí?" },
    ],
  },
  // ── Bloque 5 · un rótulo por tramo, cada uno en el golpe de su cambio ──
  // 1 · el cielo y la ciudad (c02, el golpe de 50,93 s: f108)
  {
    id: "r01",
    hasta: 233,
    trozos: [
      { desde: 107, texto: "Mira lo que" },
      { desde: 116, texto: "incluye:", estilo: "acento" },
    ],
  },
  // 2 · el jacuzzi privado (el golpe de 55,18 s: f236; la tina entra en cuadro)
  {
    id: "r02",
    hasta: 351,
    trozos: [
      { desde: 235, texto: "Jacuzzi", estilo: "acento" },
      { desde: 244, texto: "privado con vista a Medellín" },
    ],
  },
  // 3 · la cocina y la sala con la palma (c03, el golpe de 59,08 s: f353)
  {
    id: "r03",
    hasta: 475,
    trozos: [
      { desde: 352, texto: "113 m²" },
      { desde: 360, texto: "amoblados", estilo: "acento" },
      { desde: 370, texto: "y equipados" },
    ],
  },
  // 4 · el bar y el balcón con las camas (c04, el golpe de 63,22 s: f477)
  {
    id: "r04",
    hasta: 616,
    trozos: [
      { desde: 476, texto: "Piscina, gimnasio, spa y" },
      { desde: 486, texto: "coworking", estilo: "acento" },
    ],
  },
  // 5 · las torres (sobre el mismo plano, el golpe de 67,91 s: f618)
  { id: "r05", hasta: 732, trozos: [{ desde: 617, texto: "Y lo que no esperabas:" }] },
  // 6 · la alcoba (c06, el golpe de 71,77 s: f734)
  {
    id: "r06",
    hasta: 836,
    trozos: [
      { desde: 733, texto: "Aseo", estilo: "acento" },
      { desde: 742, texto: "semanal incluido" },
    ],
  },
  // 7 · la pared del televisor (sobre el mismo plano, el golpe de 75,26 s: f838)
  {
    id: "r07",
    hasta: 926,
    trozos: [
      { desde: 837, texto: "Acompañamiento", estilo: "acento" },
      { desde: 846, texto: "personalizado" },
    ],
  },
  // 8 · la sala con el sofá (c07, el golpe de 78,25 s: f928)
  {
    id: "r08",
    hasta: 1051,
    trozos: [
      { desde: 927, texto: "Chef", estilo: "acento" },
      { desde: 936, texto: "privado y conductor" },
      { desde: 948, texto: "a tu medida" },
    ],
  },
  // 9 · el carril de nado (c08, el golpe de 82,42 s: f1053)
  {
    id: "r09",
    hasta: 1196,
    trozos: [
      { desde: 1052, texto: "Con la mejor" },
      { desde: 1061, texto: "asesoría", estilo: "acento" },
      { desde: 1072, texto: "de la ciudad" },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT05): imagen opaca en el f1199, primera palabra en el f1214 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "z01",
    hasta: 1275,
    trozos: [
      { desde: 1214, texto: "Si buscas más que un" },
      { desde: 1237, texto: "apartamento para vivir," },
    ],
  },
  { id: "z02", hasta: 1306, trozos: [{ desde: 1285, texto: "escríbenos.", estilo: "acento" }] },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos053Srt = segmentosDe(subtitulos053, FPS_053);
