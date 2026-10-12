/**
 * LOS SUBTÍTULOS EDITORIALES DEL REEL 036 — `BloqueEditorial[]`. V19.
 *
 * Todo lo que Isabella dice en sus tres tomas (hook, mitad y CTA), en trozos de una a cuatro palabras, con un acento por frase como mucho (skill
 * `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps. Solo mientras ella habla: los drones y los
 * recorridos van sin texto. La cursiva (el acento) sale 8 px más pequeña (`ACENTO_MENOS_036`) y todo el texto, al 90 % (`Recorrido036.tsx`).
 *
 * ESTE ARCHIVO NO SE ESCRIBE A MANO. El TEXTO sale del guion marcado (`proyectos/036/voz/<toma>.txt`) y los TIEMPOS, de la voz por palabra
 * (`proyectos/036/voz/palabras/IMG_xxxx.json`, whisper small por palabra con DTW y el vocabulario de la casa):
 *
 *   node manuales/edicion-video/scripts/trozos-editoriales.mjs proyectos/036/voz/hk11.txt proyectos/036/voz/palabras/IMG_9433.json \
 *     --fps 30 --en 114 --desde 0.033333 --s0 0.43 --hasta 5.47 --audio remotion/public/recorrido-036/hk11.wav --prefijo h --tabla
 *   (md08: IMG_9514.json --en 474 --desde 0.3 --s0 0.72 --hasta 3.86 · ct07: IMG_9436.json --en 1072 --desde 0.433333 --s0 0.765 --hasta 4.34)
 *
 * Después CADA línea se llevó a su palabra con la voz SOLA (R31): `palabras-desde.py` dice qué palabra oye whisper primero desde un candidato y
 * `onsets-voz.py` da dónde sube la energía. La tabla (`herramientas/lineas-vs-onsets.py`) deja las 18 líneas entre 0,2 y 1,6 f antes de su
 * palabra. Cinco se corrigieron sobre lo que daba el DTW:
 *   «asado»            desde 1,36 s whisper ya oye «has dado»: la «a» va pegada a «-zzi» → f505 (DTW: f512, 6 f TARDE)
 *   «ahora.»           la voz arranca en 3,875 s tras un silencio (desde 3,80 oye «Ahora, haz clic») → f1175 (DTW: f1181, 6 f TARDE)
 *   «con tu familia»   onset de 1,975 s → f523 (DTW: f521, 3 f pronto)
 *   «donde» · «todo cambia.» · «por qué.»   1-2 f antes que el DTW (desde 3,54, 3,74 y 5,20 s whisper oye ya la palabra)
 * Y la «y» de la mitad, que el alineador dejaba sola 3 f antes de «la vista ideal.», va con «la» («y la» en f551); «vista» empieza en ≈ 3,015 s (desde
 * 3,00 whisper oye «y la vista», desde 3,02 «vista ideal») → «vista ideal.» en f555. (El validador no deja 4 palabras en cursiva.)
 *
 *   h01-h03  el hook, tres frases: el dolor («El ruido, el tráfico, el afán.»), la salida («Llegas a tu hogar donde todo cambia.») y la
 *            invitación («Ven, te muestro por qué.»). Acento: «todo cambia.» (la promesa).
 *   m01-m02  la mitad, una frase en dos bloques. Acento: «vista ideal.» (lo que cambia aquí; la vista es el final del paseo).
 *   c01-c02  el CTA, dos frases. Un solo acento, en la acción: «Agenda tu visita» (el validador pide ≥ 2 s entre acentos y «respirar
 *            distinto.» quedaba a 1,4 s: el anhelo va sin cursiva y la acción la lleva, como pide la skill para el CTA).
 *
 * POR CONFIRMAR AL OÍDO (`proyectos/036/combinaciones.md` tiene el segundo exacto de cada una): «Ven, te muestro» (whisper oye «Vente, muestro»;
 * HK11 4,68-5,10 s, en el vídeo ≈ 8,5-8,9 s) y «asado» (sin vocabulario whisper oye «has dado»; MD08 1,36-1,86 s, en el vídeo ≈ 16,9-17,4 s).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0): la PRIMERA TOMA SALE SIEMPRE SIN TEXTO (el dron, f0-113, no lleva nada y el
 * primer texto entra en f125, con Isabella ya en pantalla desde f114) y el cierre lleva el LOGO, que es una imagen y no un bloque de texto.
 */
import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_036 } from "./metraje-036";

/** Píxeles que se le restan a la cursiva (el acento): pedido del encargo, «cursiva 8 px menor», como en las versiones anteriores del canal. */
export const ACENTO_MENOS_036 = 8;

export const subtitulos036: readonly BloqueEditorial[] = [
  // ── El dron (f0-113) sale SIN TEXTO ──
  // ── c02 · el hook (primera palabra f127, última f277; corta a la órbita en f280) ──
  {
    id: "h01",
    hasta: 197,
    trozos: [
      { desde: 126, texto: "El ruido," },
      { desde: 150, texto: "el tráfico," },
      { desde: 177, texto: "el afán." },
    ],
  },
  {
    id: "h02",
    hasta: 253,
    trozos: [
      { desde: 197, texto: "Llegas a tu hogar" },
      { desde: 218, texto: "donde" },
      { desde: 224, texto: "todo cambia.", estilo: "acento" },
    ],
  },
  {
    id: "h03",
    hasta: 280, // hasta el corte a la órbita (f280): «por qué.» necesita 12 f en pantalla
    trozos: [
      { desde: 253, texto: "Ven," },
      { desde: 260, texto: "te muestro" },
      { desde: 268, texto: "por qué." },
    ],
  },
  // ── El recorrido 1 (f280-474) va sin texto ──
  // ── c05 · la mitad (primera palabra f487, última f580; disuelve a la alcoba desde f588) ──
  {
    id: "m01",
    hasta: 551,
    trozos: [
      { desde: 486, texto: "Jacuzzi," },
      { desde: 505, texto: "asado" },
      { desde: 523, texto: "con tu familia" },
    ],
  },
  {
    id: "m02",
    hasta: 587,
    trozos: [
      { desde: 551, texto: "y la" },
      { desde: 555, texto: "vista ideal.", estilo: "acento" },
    ],
  },
  // ── El recorrido 2 (f600-1072) va sin texto ──
  // ── c10 · el CTA (primera palabra f1082, última f1188; la tarjeta entra en f1192) ──
  {
    id: "c01",
    hasta: 1153,
    trozos: [
      { desde: 1081, texto: "Tu familia merece" },
      { desde: 1111, texto: "respirar distinto." },
    ],
  },
  {
    id: "c02",
    hasta: 1192,
    trozos: [
      { desde: 1153, texto: "Agenda tu visita", estilo: "acento" },
      { desde: 1175, texto: "ahora." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos036Srt = segmentosDe(subtitulos036, FPS_036);
