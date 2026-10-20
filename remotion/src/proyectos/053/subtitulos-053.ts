/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 053 — `BloqueEditorial[]`.
 *
 * Todo lo que SUENA —la locución en off entera y el CTA de Isabella—, en trozos de una a cuatro palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de
 * la composición, a 30 fps. El texto sale de los guiones marcados (`proyectos/053/voz/off-marcado.txt` y `ct05.txt`: lo que se OYE) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz
 * sola (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31). Cada línea entra 0-3 f ANTES de su palabra (`herramientas/lineas-vs-onsets.py`).
 *
 * **LOS TIEMPOS DE LA LOCUCIÓN SON LOS DE LA PISTA GUÍA** (voz de sistema, `original/off.wav`): con la locución real se repite `trozos-editoriales.mjs` sobre su transcripción (`proyectos/053/artefactos/03-timeline.md`).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). EXCEPCIÓN DECLARADA a la regla fija 1 (la réplica abre con Isabella y su pregunta): el primer subtítulo entra en el f8, con la primera palabra de la
 * locución. El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido053.tsx`) y no un bloque de texto.
 *
 * UNA SOLA CIFRA EN TODA LA PIEZA: «14 millones», en el gancho (lo dicho es «catorce millones»; el canon de la ficha es 14,8 y va en la versión con ficha: se declara). Va como ACENTO (la cursiva, abajo) y no como dato grande al
 * centro. «24/7» se pinta con letras («seguridad veinticuatro siete»): ninguna otra cifra en pantalla.
 *
 * POR CONFIRMAR AL OÍDO (la puerta con `--final` falla SOLO por ello):
 *   · «en tu propio hogar» (≈ f265, 8,6 s): mi transcripción por palabra del audio del original dice «hogar» y el rótulo automático del original dice «propio bar». Se pinta «hogar» (lo que dice el reparto) y se pregunta antes de la final.
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
  // ── Bloque 2 · el gancho DICHO EN OFF (la imagen de Isabella, opaca desde el f0; primera palabra en el f8) y la locución ──
  {
    id: "o01",
    hasta: 103,
    trozos: [
      { desde: 8, texto: "¿Pagarías" },
      { desde: 21, texto: "14 millones", estilo: "acento" },
      { desde: 48, texto: "al mes por vivir aquí?" },
    ],
  },
  {
    id: "o02",
    hasta: 229,
    trozos: [
      { desde: 109, texto: "Imagina terminar tu día" },
      { desde: 155, texto: "relajándote en tu" },
      { desde: 188, texto: "jacuzzi privado,", estilo: "acento" },
    ],
  },
  {
    id: "o03",
    hasta: 295,
    trozos: [
      { desde: 231, texto: "preparando un trago" },
      { desde: 265, texto: "en tu propio hogar" },
    ],
  },
  {
    id: "o04",
    hasta: 400,
    trozos: [
      { desde: 295, texto: "y disfrutando de la" },
      { desde: 326, texto: "mejor vista", estilo: "acento" },
      { desde: 348, texto: "de la ciudad de Medellín." },
    ],
  },
  {
    id: "o05",
    hasta: 469,
    trozos: [
      { desde: 404, texto: "Viene completamente" },
      { desde: 436, texto: "amoblado:", estilo: "acento" },
    ],
  },
  { id: "o06", hasta: 545, trozos: [{ desde: 470, texto: "dos habitaciones," }, { desde: 515, texto: "dos baños," }] },
  {
    id: "o07",
    hasta: 619,
    trozos: [
      { desde: 550, texto: "cocina integral" },
      { desde: 578, texto: "totalmente equipada" },
    ],
  },
  {
    id: "o08",
    hasta: 707,
    trozos: [
      { desde: 619, texto: "y zona de lavandería" },
      { desde: 656, texto: "con lavadora y secadora." },
    ],
  },
  { id: "o09", hasta: 752, trozos: [{ desde: 708, texto: "Listo para mudarte.", estilo: "acento" }] },
  {
    id: "o10",
    hasta: 866,
    trozos: [
      { desde: 758, texto: "Además, puedes disfrutar" },
      { desde: 812, texto: "de excelentes" },
      { desde: 836, texto: "amenidades:", estilo: "acento" },
    ],
  },
  { id: "o11", hasta: 928, trozos: [{ desde: 875, texto: "piscina, gimnasio," }] },
  { id: "o12", hasta: 994, trozos: [{ desde: 928, texto: "zonas húmedas, coworking," }] },
  {
    id: "o13",
    hasta: 1075,
    trozos: [
      { desde: 1000, texto: "cancha de squash," },
      { desde: 1037, texto: "zona de barbecue," },
    ],
  },
  {
    id: "o14",
    hasta: 1148,
    trozos: [
      { desde: 1075, texto: "salón social" },
      { desde: 1101, texto: "y zonas de bienestar." },
    ],
  },
  {
    id: "o15",
    hasta: 1267,
    trozos: [
      { desde: 1156, texto: "Y lo mejor es que" },
      { desde: 1183, texto: "cuentas con seguridad" },
      { desde: 1220, texto: "veinticuatro siete,", estilo: "acento" },
    ],
  },
  {
    id: "o16",
    hasta: 1348,
    trozos: [
      { desde: 1268, texto: "la mejor ubicación" },
      { desde: 1303, texto: "en el sector" },
      { desde: 1324, texto: "de Las Palmas" },
    ],
  },
  {
    id: "o17",
    hasta: 1444,
    trozos: [
      { desde: 1348, texto: "y la" },
      { desde: 1357, texto: "privacidad que buscas", estilo: "acento" },
      { desde: 1396, texto: "en un entorno natural." },
    ],
  },
  {
    id: "o18",
    hasta: 1531,
    trozos: [
      { desde: 1453, texto: "Todo en este apartamento" },
      { desde: 1496, texto: "está pensado para" },
    ],
  },
  {
    id: "o19",
    hasta: 1590,
    trozos: [
      { desde: 1531, texto: "tu" },
      { desde: 1537, texto: "tranquilidad", estilo: "acento" },
      { desde: 1558, texto: "y comodidad." },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT05): imagen opaca en el f1603, primera palabra en el f1604 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 1665,
    trozos: [
      { desde: 1604, texto: "Si buscas más que un" },
      { desde: 1627, texto: "apartamento para vivir," },
    ],
  },
  { id: "c02", hasta: 1696, trozos: [{ desde: 1675, texto: "escríbenos.", estilo: "acento" }] },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos053Srt = segmentosDe(subtitulos053, FPS_053);
