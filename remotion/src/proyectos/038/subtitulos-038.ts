/**
 * LOS SUBTÍTULOS EDITORIALES DEL REEL 038 — `BloqueEditorial[]`. V21.
 *
 * Todo lo que Isabella dice en sus tres tomas (hook, mitad y CTA), en trozos de una a cuatro palabras, con un acento por frase (skill
 * `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps. Solo mientras ella habla: el dron y los
 * recorridos van sin texto.
 *
 * ESTE ARCHIVO NO SE ESCRIBE A MANO. El TEXTO sale del guion marcado (`proyectos/038/voz/<toma>.txt`) y los TIEMPOS, de la voz por palabra
 * (`proyectos/038/voz/palabras/IMG_xxxx.json`, whisper small por palabra con DTW):
 *
 *   node manuales/edicion-video/scripts/trozos-editoriales.mjs proyectos/038/voz/hk03.txt proyectos/038/voz/palabras/IMG_9406.json \
 *     --fps 30 --en 98 --desde 0.5 --s0 0.77 --hasta 6.21 --audio remotion/public/recorrido-038/hk03.wav --prefijo h --tabla
 *   (md05: IMG_9445.json --en 465 --desde 0.4 --s0 0.67 --hasta 5.33 --prefijo m · ct06: IMG_9427.json --en 930 --desde 0.86667 --s0 1.13 --hasta 4.4 --prefijo c)
 *
 * Después cada línea se llevó a su palabra con la voz SOLA (R31): `palabras-desde.py` dice qué palabra oye whisper primero desde un candidato y
 * `onsets-voz.py` da dónde sube la energía. El DTW de whisper marca el FINAL de cada token y en las pausas se va 0,1-0,5 s pronto, así que se corrigieron:
 *   HK03 «abuelos»        DTW 2,04 s (f144), pero hay una pausa de 0,4 s y la palabra arranca en 2,60 s (cortando desde ahí oye «Abuelos, tíos, primos») → f159
 *   HK03 «primos»         3,70 s (f194, cortando desde ahí «Primos, ¿cuántas veces alguien») → f192
 *   HK03 «incómodo»       DTW 5,62 s: la «in» sube a 5,56 s → f249 (la palabra suena apagada, casi cuchicheada: cortando desde 5,5 s whisper oye «encomoro»)
 *   CT06 «privados»       DTW 1,60 s, pero entre «Recorridos» (1,13-1,45 s) y ella hay un silencio y la palabra arranca en 1,77 s → f955
 *   CT06 «disponibles»    DTW 2,04 s, la palabra arranca tras otro silencio, en 2,335 s → f972
 *   MD05 «vienen de visita» y «estar aquí con» cortando se oyen en 2,38 s y 3,84 s → f522 y f567
 * Comprobadas y bien (0-3 f antes de su palabra): «Domingo en familia:» (0,77 s, f105), «¿Cuántas veces» (4,62 s, f220), «Hijos, abuelos,» (0,67 s),
 * «amigos que» (1,955 s), «todos pueden» (3,435 s), «Recorridos» (1,13 s), «reserva el tuyo» (3,12 s), «en el» (3,70 s) y «enlace.» (3,94 s).
 *
 *   h01-h02  el hook, dos frases en dos bloques. Acento: «incómodo?» (lo que se quiere evitar en la mesa del domingo).
 *   m01-m02  la mitad, una frase en dos bloques. Acento: «total comodidad.» (la respuesta al hook).
 *   c01-c02  el CTA, dos frases. Acentos: «privados» (lo exclusivo) y «enlace.» (la acción).
 *
 * POR CONFIRMAR AL OÍDO (`proyectos/038/combinaciones.md` tiene el segundo exacto de cada una): «incómodo» (HK03, ≈ 5,6-6,2 s), «Hijos»
 * (MD05, ≈ 0,7 s), «visita» y «comodidad» (MD05, ≈ 2,9-3,4 s y 4,7-5,3 s) y «Recorridos», «disponibles» y «tuyo» (CT06, ≈ 1,1 s, 2,3-2,8 s y 3,5-3,7 s).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0): la PRIMERA TOMA SALE SIEMPRE SIN TEXTO (el dron, f0-97, no lleva nada y el
 * primer texto entra en f105, con Isabella ya en pantalla) y el cierre lleva el LOGO, que es una imagen y no un bloque de texto.
 */
import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_038 } from "./metraje-038";

export const subtitulos038: readonly BloqueEditorial[] = [
  // ── El dron (f0-97) sale SIN TEXTO ──
  // ── c02 · el hook (primera palabra f106, última f268) ──
  {
    id: "h01",
    hasta: 216,
    trozos: [
      { desde: 105, texto: "Domingo en familia:" },
      { desde: 159, texto: "abuelos, tíos," },
      { desde: 192, texto: "primos." },
    ],
  },
  {
    id: "h02",
    hasta: 272,
    trozos: [
      { desde: 220, texto: "¿Cuántas veces" },
      { desde: 236, texto: "alguien queda" },
      { desde: 249, texto: "incómodo?", estilo: "acento" },
    ],
  },
  // ── El recorrido 1 (f272-465) va sin texto ──
  // ── c07 · la mitad (primera palabra f473, última f612) ──
  {
    id: "m01",
    hasta: 553,
    trozos: [
      { desde: 471, texto: "Hijos, abuelos," },
      { desde: 510, texto: "amigos que" },
      { desde: 522, texto: "vienen de visita," },
    ],
  },
  {
    id: "m02",
    hasta: 617,
    trozos: [
      { desde: 554, texto: "todos pueden" },
      { desde: 567, texto: "estar aquí con" },
      { desde: 585, texto: "total comodidad.", estilo: "acento" },
    ],
  },
  // ── El recorrido 2 (f640-930) va sin texto ──
  // ── c12 · el CTA (primera palabra f938, última f1035) ──
  {
    id: "c01",
    hasta: 993,
    trozos: [
      { desde: 937, texto: "Recorridos" },
      { desde: 955, texto: "privados", estilo: "acento" },
      { desde: 972, texto: "disponibles," },
    ],
  },
  {
    id: "c02",
    hasta: 1040,
    trozos: [
      { desde: 996, texto: "reserva el tuyo" },
      { desde: 1014, texto: "en el" },
      { desde: 1020, texto: "enlace.", estilo: "acento" },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos038Srt = segmentosDe(subtitulos038, FPS_038);
