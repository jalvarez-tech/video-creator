/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 046 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/046/voz/*.txt`: lo escribo yo con lo que se OYE, comprobado por cortes) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31). Cada línea entra 0-3 f ANTES de su palabra (`herramientas/lineas-vs-onsets.py`).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PIEZA ABRE CON EL HOOK (excepción declarada, por encargo): el primer subtítulo entra en el f17, con la primera palabra de Isabella, y su imagen
 * es opaca desde el f0. El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido046.tsx`) y no un bloque de texto. NINGUNA cifra en la pieza.
 *
 * EL ACENTO MARCA LO QUE NECESITA QUIEN LLEGA A UNA CIUDAD NUEVA (uno por bloque, ≥ 2 s entre dos):
 *   «la tuya,»                       el hook: la ciudad que no es la tuya (f47).
 *   «plusvalía»                      el hook: lo que vale el acompañamiento (f126).
 *   «día uno»                        la mitad, MD02: desde el primer día (f464).
 *   «chef privado,»                  la mitad, MD03: la primera cosa concreta de la lista (f567).
 *   «mejores experiencias»           la mitad, MD03: lo que se promete de la ciudad (f668).
 *   «escríbeme.»                     la acción del CTA (f1196).
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 0, desde 0)        «Cuando» 0,57 s · «que» 1,435 · «la» 1,65 · «el» 1,965 · «personalizado» 2,995 · «plusvalía» 4,245 · «indispensable» 4,845
 *   mitad 1 (en 435, desde 20 f) «Te» 0,695 s · «día» 1,67 · «con» 2,345 (tras la pausa de 2,20-2,34)
 *   mitad 2 (en 543, desde 18 f) «Con(tamos)» 0,68 s · «chef» 1,46 · «tours» 2,56 (tras la pausa de 2,09-2,56) · «y» 4,595 · «mejores» 4,82 · «de» 5,595
 *   CTA (en 1086, desde 22 f)    «Si» 0,78 s · «que» 2,43 (tras la pausa de 2,20-2,44) · «es(críbeme)» 4,40
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con esta sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ella):
 *   · «amueblado» (CT02, f1110-f1127 = 37,0-37,6 s del vídeo): whisper oye «movilado» (conf. 0,27 en «mov»), «molado» y «en un lado» según dónde se corte; el catálogo y el registro decían «amoblado». Las trece sílabas de
 *     «si quieres un apartamento amueblado» caben en 1,4 s (0,78-2,2 s): se dicen muy deprisa. **MEDIDO con `herramientas/formantes.py` (LPC, 10 ms) sobre la voz sola, 1,30-2,30 s:** la secuencia de vocales es /a/ (1,78-1,82 s: F1 ≈ 650-720,
 *     F2 ≈ 1.100; igual que su /a/ de «apar-», 1,20 s: F1 ≈ 675, F2 ≈ 1.040-1.220) → una vocal anterior [e] (1,875-1,94 s, a −14 dB, estable: F1 ≈ 420-435, F2 ≈ 1.750-1.880) → /a/ (1,96-2,14 s: F1 ≈ 740-780, F2 ≈ 900-1.000) → /o/
 *     (2,17-2,30 s: F1 ≈ 520, F2 ≈ 750-1.050; la /o/ de «to» en 1,67-1,70 s da F1 ≈ 525-540, F2 ≈ 800-850). «amoblado» pide /a/-/o/-/a/-/o/ y la segunda vocal NO es una /o/ (F2 de 1.880 frente a ≈ 800); «amueblado» pide /a/-[we]-/a/-/o/
 *     y encaja (la /w/ baja la F2 de la [e] desde los ≈ 2.300 de su «quieres», 0,95 s). Se pinta «amueblado» (lo medido; es la forma de la RAE y la que usan quienes la dicen entera); el caption deja «amoblado», el término de búsqueda.
 *     Una medida no es un oído: se oye antes de publicar y, si dice «amoblado», se cambia el texto del primer trozo de `z01`, `voz/ct02.txt`, el `dice` de `c11-cta`, `lineas-vs-onsets.py` y el `.srt`. «apartamento» lo oye whisper como «aportamento» (conf. 0,45): es la pronunciación, no otra palabra.
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_046 } from "./metraje-046";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_046 = 8;

export const subtitulos046: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK03): abre la pieza, primera palabra en el f17 ──
  {
    id: "h01",
    hasta: 59,
    trozos: [
      { desde: 17, texto: "Cuando llegas a una ciudad" },
      { desde: 41, texto: "que no es" },
      { desde: 47, texto: "la tuya,", estilo: "acento" },
    ],
  },
  {
    id: "h02",
    hasta: 126,
    trozos: [
      { desde: 59, texto: "el acompañamiento" },
      { desde: 88, texto: "personalizado es una" },
    ],
  },
  {
    id: "h03",
    hasta: 172,
    trozos: [
      { desde: 126, texto: "plusvalía", estilo: "acento" },
      { desde: 144, texto: "indispensable." },
    ],
  },
  // ── Bloque 4 · la mitad en dos tomas: MD02 («te acompañamos desde el día uno…») y MD03 («contamos con chef privado…») ──
  {
    id: "m01",
    hasta: 531,
    trozos: [
      { desde: 435, texto: "Te acompañamos desde el" },
      { desde: 464, texto: "día uno", estilo: "acento" },
      { desde: 484, texto: "con atención personalizada." },
    ],
  },
  {
    id: "n01",
    hasta: 662,
    trozos: [
      { desde: 545, texto: "Contamos con" },
      { desde: 567, texto: "chef privado,", estilo: "acento" },
      { desde: 599, texto: "tours, masajes y transporte" },
    ],
  },
  {
    id: "n02",
    hasta: 734,
    trozos: [
      { desde: 662, texto: "y las" },
      { desde: 668, texto: "mejores experiencias", estilo: "acento" },
      { desde: 692, texto: "de la ciudad de Medellín." },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT02) ──
  {
    id: "z01",
    hasta: 1220,
    trozos: [
      // POR CONFIRMAR AL OÍDO: «amueblado» (f1110-f1127 = 37,0-37,6 s del vídeo; medido por formantes, ver arriba).
      { desde: 1087, texto: "Si quieres un apartamento amueblado" },
      { desde: 1136, texto: "que tenga acompañamiento personalizado," },
      { desde: 1196, texto: "escríbeme.", estilo: "acento" },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos046Srt = segmentosDe(subtitulos046, FPS_046);
