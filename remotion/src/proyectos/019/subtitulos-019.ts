/**
 * LOS SUBTÍTULOS EDITORIALES DEL 019 — `BloqueEditorial[]`.
 *
 * Todo lo que dice Isabella, en trozos de una a cuatro palabras con un acento por frase (skill
 * `recorrido-luxur`, `subtitulos-editoriales.md`), y NADA MÁS: la primera toma sale sin texto, y el cierre lleva
 * el logo y la web (eso no es un bloque de texto: es una imagen, en `Recorrido019.tsx`). Frames ABSOLUTOS de la
 * composición, a 30 fps.
 *
 * DE DÓNDE SALE CADA COSA. El TEXTO, de los guiones marcados de `proyectos/019/voz/{hook,mitad,cta}.txt` (el del
 * catálogo, partido en trozos); los TIEMPOS, de `trozos-editoriales.mjs` con la voz de cada toma (`--en`/`--desde`
 * del tramo de esa fuente, `--s0` y `--audio`)… y CORREGIDOS A MANO con dos cosas independientes: los onsets de la
 * energía de la voz (`herramientas/onsets-voz.py`: tras una pausa, el onset que la sigue; en una palabra con oclusiva,
 * la explosión de la /p/, /t/, /k/) y `herramientas/palabras-desde.py` (corta la toma en cada candidato y dice qué palabra
 * es la primera que oye whisper desde ahí). Cada línea entra 0-3 f ANTES de su palabra, porque fundirá 5 f:
 * `herramientas/lineas-vs-onsets.py` lo comprueba sobre la voz SOLA de cada toma, y `herramientas/subs-vs-voz.py` sobre el render, donde la
 * música tapa los onsets suaves. Las tres tomas se movieron respecto de la tabla del DTW (que va 1-5 f pronto o tarde): p. ej. «permite que»
 * (MD08) sale en 591 por el DTW y su palabra suena en 588,8; «lo que estás buscando,» (CT05) sale en 1059 y su «lo» suena entre 1053 y 1057.
 *
 * LAS VOCES. `h01-h02` suenan desde el frame 95 («¿Y», 3 f después de que la imagen de Isabella sea opaca en el golpe del f92:
 * su toma entra a corte); `m01-m02`, de MD08 (572); `c01-c02`, de CT05 (1042).
 *
 * ⚠ POR CONFIRMAR AL OÍDO (m02, «y ventilación»): el catálogo ya anotaba que whisper omite el segundo «la» de «la luz y (la) ventilación». Midiendo
 * (`herramientas/formantes.py`, `onsets-voz.py`), entre la «y» (una [i], F2 ≈ 2.340-2.460 Hz, a 2,85-2,89 s de MD08) y el «ven-» (3,05 s, tras el
 * cierre de la /b/) no hay una /a/ (las de Isabella en esa toma miden F1 ≈ 790 Hz; ahí, F1 ≤ 540) ni una sílaba nueva (ningún onset entre 2,78 y
 * 3,05 s). Se pinta «y ventilación», sin «la». Es una medida, no un oído: mientras esta nota siga aquí, `node proyectos/019/revisar-019.mjs --final`
 * no deja dar la final por buena. Si suena «y la ventilación», se cambia el texto de ese trozo, `voz/mitad.txt` y el `dice` de `c06-mitad`.
 *
 * ⚠ POR CONFIRMAR AL OÍDO (c02, «escríbeme.»): whisper oye «escribe a mí» (confianza 0,30 en «es» y 0,62 en «a»; el catálogo ya lo anotaba), pero cortando la
 * toma desde 2,45-2,50 s oye UNA palabra, «escríbeme». Midiendo, tras la [e] de «-be» (2,84-2,92 s de CT05) viene directamente un murmullo nasal de ≈ 130 ms
 * (2,93-3,06 s; F1 ≈ 430, F2 ≈ 700 Hz) y se acaba: no hay una /a/ entre «be» y la nasal, que es lo que tendría «escribe a mí». Coincide con «es-crí-be-me».
 * Se pinta «escríbeme.». Misma nota: la puerta no da la final por buena hasta que se oiga.
 */
import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_019 } from "./metraje-019";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en el 017 (que lo pidió así en su revisión 5: «reduce el tamaño de la
 * cursiva 8px») y el 018: las tres versiones del mismo reel tienen que verse igual. Los px de la composición (1080×1920)
 * que se le restan a las líneas de acento —«torre?», «la luz», «escríbeme.»—: de 99 px a 91 px. Es de
 * ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_019 = 8;

export const subtitulos019: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO: HK05, su voz desde el frame 95 (con la imagen de Isabella ya opaca desde el 92) ──
  {
    id: "h01",
    hasta: 141,
    trozos: [
      { desde: 94, texto: "¿Y si pudieras" },
      { desde: 111, texto: "vivir en altura" },
    ],
  },
  {
    id: "h02",
    hasta: 203,
    trozos: [
      { desde: 141, texto: "sin sentir que vives" },
      { desde: 168, texto: "dentro de una" },
      { desde: 185, texto: "torre?", estilo: "acento" },
    ],
  },
  // ── Bloque 4 · la mitad: MD08 ──
  {
    id: "m01",
    hasta: 630,
    trozos: [
      { desde: 571, texto: "La doble altura" },
      { desde: 587, texto: "permite que" },
      { desde: 612, texto: "la luz", estilo: "acento" },
    ],
  },
  {
    id: "m02",
    hasta: 699,
    trozos: [
      { desde: 630, texto: "y ventilación ingresen" },
      { desde: 671, texto: "a la vivienda." },
    ],
  },
  // ── Bloque 6 · el CTA: CT05 ──
  {
    id: "c01",
    hasta: 1095,
    trozos: [
      { desde: 1042, texto: "Si encaja con" },
      { desde: 1053, texto: "lo que estás buscando," },
    ],
  },
  { id: "c02", hasta: 1123, trozos: [{ desde: 1095, texto: "escríbeme.", estilo: "acento" }] },
];

/** Para la pista de captions de la plataforma (R14). */
export const subtitulos019Srt = segmentosDe(subtitulos019, FPS_019);
