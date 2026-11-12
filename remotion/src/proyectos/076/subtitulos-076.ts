/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 076 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cinco palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/076/voz/*.txt`: lo escribo yo con lo que se OYE, comprobado por cortes aislados) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31). Cada línea entra 0-3 f ANTES de su palabra (la primera de cada toma, en el frame en que su imagen ya es opaca o en que ella empieza a hablar).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la apertura, DR10): el primer subtítulo entra en el f99, con la imagen de Isabella (opaca desde el f87),
 * en el frame de su primera sílaba (f99,6). El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido076.tsx`) y no un bloque de texto.
 *
 * NO HAY CIFRAS EN PANTALLA: las tres frases de Isabella no dicen ninguna (los 28,5 m², el piso 9 y el precio van al caption y a la versión con ficha).
 *
 * LO QUE DICE SU VOZ Y AQUÍ SOLO TIENE TRANSCRIPCIÓN: nada promete rentabilidad ni valorización; «potencial de inversión» es la frase aceptada del catálogo (CT06), sin cifra. Los acentos son lo que se compra
 * («tranquilidad.»), el porqué («estratégica.») y lo que se descubre («potencial»): uno por toma.
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 87, desde 36 f)   «Una buena inversión» 1,62 · «empieza» 2,69 · «por la» 2,98 · «tranquilidad.» 3,28 (la línea entra en f146, 1,4 f antes de su onset medido en el render; tras la interjección recortada de 1,22-1,53 s, que NO se oye: la voz tratada empieza en 1,55 s)
 *   mitad (en 391, desde 0)    «Invierte» 0,58 · «en una suite» 1,03 · «con vocación» 2,01 · «turística» 2,58 · «y ubicación» 3,12 · «estratégica.» 3,76
 *   CTA (en 782, desde 1 f)    «Agenda» 0,445 · «una visita» 0,80 · «y descubre» 1,55 · «su» 2,0 · «potencial» 2,23 · «de inversión.» 2,54
 * El DTW de whisper iba muy por delante en el hook (ponía «una buena inversión» en 0,4-2,2 s; la voz arranca de verdad en 1,62 s): lo que vale es la envolvente de la voz sola (arranques de sílaba tras cada pausa,
 * `onsets-voz.py`) y los cortes aislados (`palabras-desde.py`).
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · La interjección RECORTADA al principio de HK02 (1,22-1,53 s de la toma): whisper la oye «Hoy,» (0,81) y, cortando desde 1,215 s, «Hoy, una buena inversión…». Se quita porque el catálogo da la frase sin ella
 *     y el hueco de −60 dB que la separa de «una» (1,57-1,61 s) permite un corte limpio; si Isabella dijo otra cosa y se la quiere oír, hay que cambiar `VENTANA_VOZ` de `normalizar.mjs`.
 *   · «ubicación» y «estratégica» (MD04, f485-f504 = 16,2-16,8 s del vídeo): whisper las oye «y ubicaciones estratégicas» (plural) y «en la educación estratégica» en cortes distintos; la lectura es «ubicación estratégica»
 *     (el anuncio la usa: «a unos metros de la Avenida El Poblado»).
 *   · «Agenda» y «una» (CT06, f794-f805 = 26,5-26,8 s del vídeo): whisper oye «Ag» (0,36) y «una» (0,56); la «A» es muy suave (−57 → −40 dB en 20 ms). Sin ella sería «genda una visita».
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_076 } from "./metraje-076";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_076 = 8;

export const subtitulos076: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK02): imagen opaca desde el f87, primera sílaba en el f99,6 ──
  {
    id: "h01",
    hasta: 176,
    trozos: [
      { desde: 99, texto: "Una buena inversión" },
      { desde: 132, texto: "empieza por la" },
      { desde: 146, texto: "tranquilidad.", estilo: "acento" },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD04): entra a corte en el f391, primera palabra en el f408,4 ──
  {
    id: "m01",
    hasta: 482,
    trozos: [
      { desde: 406, texto: "Invierte en una suite" },
      { desde: 451, texto: "con vocación turística" },
    ],
  },
  {
    id: "m02",
    hasta: 523,
    trozos: [
      { desde: 482, texto: "y ubicación" },
      { desde: 501, texto: "estratégica.", estilo: "acento" },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT06): entra a corte en el f782, primera palabra en el f794,5 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 848,
    trozos: [
      { desde: 794, texto: "Agenda una visita" },
      { desde: 828, texto: "y descubre su" },
    ],
  },
  {
    id: "c02",
    hasta: 881,
    trozos: [
      { desde: 848, texto: "potencial", estilo: "acento" },
      { desde: 857, texto: "de inversión." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos076Srt = segmentosDe(subtitulos076, FPS_076);
