/**
 * LOS SUBTÍTULOS EDITORIALES DEL 018 — `BloqueEditorial[]`.
 *
 * Todo lo que dice Isabella, en trozos de una a cuatro palabras con un acento por frase (skill
 * `recorrido-luxur`, `subtitulos-editoriales.md`), y NADA MÁS: la primera toma sale sin texto, y el cierre lleva
 * el logo y la web (eso no es un bloque de texto: es una imagen, en `Recorrido018.tsx`). Frames ABSOLUTOS de la
 * composición, a 30 fps.
 *
 * DE DÓNDE SALE CADA COSA. El TEXTO, de los guiones marcados de `proyectos/018/voz/{hook,mitad,cta}.txt` (el del
 * catálogo, partido en trozos); los TIEMPOS, de `trozos-editoriales.mjs` con la voz de cada toma (`--en`/`--desde`
 * del tramo de esa fuente, `--s0` y `--audio`)… y CORREGIDOS A MANO, otra vez. El DTW de whisper-small se fue en
 * estas tres tomas hasta 0,47 s pronto («tener», en HK07: la tabla decía el 2,96 s y la palabra suena a los 3,44)
 * y 0,35 s TARDE («está en los metros», en MD07: la tabla, 2,10 s; suena a los 1,75, tras la pausa de 160 ms).
 * Cada línea de abajo está llevada al arranque de su palabra con dos cosas independientes: los onsets de la
 * energía de la voz (`herramientas/onsets-voz.py` del 017: tras una pausa, el onset que la sigue; en una palabra
 * con oclusiva, la explosión de la /p/, /t/, /k/) y `herramientas/palabras-desde.py` (corta la toma en cada candidato
 * y dice qué palabra es la primera que oye whisper desde ahí). Cada línea entra 0-3 f ANTES de su palabra, porque
 * fundirá 5 f: `herramientas/lineas-vs-onsets.py` lo comprueba sobre la voz SOLA de cada toma (las 13 que pueden, a 1,0-2,5 f;
 * la primera no puede entrar antes de que su imagen sea opaca) y `herramientas/subs-vs-voz.py` sobre el
 * render, donde la música tapa los onsets suaves (el detector pone «está en los metros» 8 f pronto cuando está a 0,5).
 * Dos casos sin onset limpio: «respirar.» empieza en una /r/ vibrante (4,52 s: sin valle antes; la vocal sube a los
 * 4,62) y «en un apartamento» entra con su «en» (la vocal frontal de 1,77 s, pegada al «te» de «diferente»: sin
 * valle antes, sin onset de energía). La puerta (`revisar-018.mjs`) comprueba lo que se puede medir: que cada trozo cae dentro de una
 * ventana de voz, que nada tapa a Isabella y que el validador del motor no avisa.
 *
 * LAS VOCES. `h01-h02` suenan desde el frame 69 («El», un frame después de que la imagen de Isabella sea opaca
 * en el pulso 4); `m01-m02`, de MD07; `c01-c02`, de CT01.
 *
 * ⚠ POR CONFIRMAR AL OÍDO (c01, «en un apartamento»): hasta la revisión 2 se pintó «a» (el catálogo lo dejaba en «(a)» y
 * la gramática pide «diferente a un apartamento»), pero whisper oye «diferente EN un apartamento» (confianza 0,75) y,
 * MEDIDO, la vocal de ese hueco (1,77-1,83 s de CT01, ≈ 100 ms pegada al «te») es una [e]: F1 ≈ 605 Hz y F2 ≈ 2.340-2.390
 * Hz con tres combinaciones de orden y ventana del LPC, frente a las /a/ de la misma toma («a-» y «par» de «apartamento»:
 * F1 ≈ 725-780, F2 ≈ 1.440-1.600), y le sigue una consonante nasal. Se pinta «en» (`herramientas/formantes.py`). Es una
 * medida, no un oído: mientras esta nota siga aquí, `node proyectos/018/revisar-018.mjs --final` no deja dar la final por
 * buena. Si al oírla suena «a», se cambia el texto de este trozo, `voz/cta.txt` y el `dice` de `c12-cta`, y se re-exporta.
 */
import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_018 } from "./metraje-018";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en el 017 (que lo pidió así en su revisión 5: «reduce el tamaño de la
 * cursiva 8px»): las dos versiones del mismo reel tienen que verse igual. Los px de la composición (1080×1920)
 * que se le restan a las líneas de acento —«respirar.», «el exterior.», «escríbeme»—: de 99 px a 91 px. Es de
 * ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_018 = 8;

export const subtitulos018: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO: HK07, su voz desde el frame 69 (con la imagen de Isabella ya opaca) ──
  {
    id: "h01",
    hasta: 141,
    trozos: [
      { desde: 69, texto: "El verdadero lujo" },
      { desde: 103, texto: "puede ser simplemente" },
    ],
  },
  {
    id: "h02",
    hasta: 198,
    trozos: [
      { desde: 141, texto: "tener espacio para" },
      { desde: 174, texto: "respirar.", estilo: "acento" },
    ],
  },
  // ── Bloque 4 · la mitad: MD07 (la toma más rápida: 3,3 palabras por segundo) ──
  {
    id: "m01",
    hasta: 554,
    trozos: [
      { desde: 478, texto: "La respuesta no siempre" },
      { desde: 509, texto: "está en los metros," },
    ],
  },
  {
    id: "m02",
    hasta: 627,
    trozos: [
      { desde: 554, texto: "a veces está en" },
      { desde: 589, texto: "cómo entra" },
      { desde: 601, texto: "el exterior.", estilo: "acento" },
    ],
  },
  // ── Bloque 6 · el CTA: CT01 ──
  {
    id: "c01",
    hasta: 1194,
    trozos: [
      { desde: 1116, texto: "Si buscas algo diferente" },
      { desde: 1141, texto: "en un apartamento" },
      { desde: 1164, texto: "convencional," },
    ],
  },
  {
    id: "c02",
    hasta: 1258,
    trozos: [
      { desde: 1197, texto: "escríbeme", estilo: "acento" },
      { desde: 1220, texto: "y conoce Los Patios." },
    ],
  },
];

/** Para la pista de captions de la plataforma (R14). */
export const subtitulos018Srt = segmentosDe(subtitulos018, FPS_018);
