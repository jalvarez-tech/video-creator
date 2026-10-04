/**
 * LOS SUBTÍTULOS EDITORIALES DEL 020 — `BloqueEditorial[]`.
 *
 * Todo lo que dice Isabella, en trozos de una a cuatro palabras con un acento por frase (skill
 * `recorrido-luxur`, `subtitulos-editoriales.md`), y NADA MÁS: la primera toma sale sin texto, y el cierre lleva
 * el logo y la web (eso no es un bloque de texto: es una imagen, en `Recorrido020.tsx`). Frames ABSOLUTOS de la
 * composición, a 30 fps.
 *
 * DE DÓNDE SALE CADA COSA. El TEXTO, de los guiones marcados de `proyectos/020/voz/{hook,mitad,cta}.txt` (el del
 * catálogo, partido en trozos); los TIEMPOS, de `trozos-editoriales.mjs` con la voz de cada toma (`--en`/`--desde`
 * del tramo de esa fuente, `--s0` y `--audio`)… y CORREGIDOS A MANO con dos cosas independientes: los onsets de la
 * energía de la voz (`herramientas/onsets-voz.py`: tras una pausa, el onset que la sigue) y `herramientas/palabras-desde.py` (corta
 * la toma en cada candidato y dice qué palabra es la primera que oye whisper desde ahí). Cada línea entra 0-3 f ANTES de su
 * palabra, porque fundirá 5 f: `herramientas/lineas-vs-onsets.py` lo comprueba sobre la voz SOLA de cada toma y `herramientas/subs-vs-voz.py`
 * sobre el render. Las tres tomas se movieron respecto de la tabla del DTW, que iba de 3 a 11 f pronto o tarde («terminado,» arranca en 2,51 s, f130): «y agendamos una visita.» (CT06)
 * salía en 1137 por el DTW y su «y» arranca en 2,01 s de la toma (f1126); «sin terminar,» (MD14) salía en 607 y su «sin» arranca en 2,175 s (f615);
 * «definir.» (MD14) salía en 708 y su «de-» arranca en 5,345 s (f710).
 *
 * LAS VOCES. `h01-h02` suenan desde el frame 79 («Si», 3 f después de que la imagen de Isabella sea opaca en el golpe del f76: su
 * toma entra con una disolvencia que acaba ahí); `m01-m02`, de MD14 (567); `c01-c02`, de CT06 (1092).
 *
 * ⚠ POR CONFIRMAR AL OÍDO (h01, «terminado,»): el catálogo ya anotaba que whisper-small, sin vocabulario, oye «determinado» («totalmente determinado»,
 * confianza 0,76 en «determin» y 1,00 en «ado»; con vocabulario oye «terminado»). Midiendo: (1) cortando la toma desde 2,05 y 2,20 s —dentro de «totalmente»— whisper oye
 * «totalmente TERMINADO» y desde 2,50 s, «terminado»; solo cuando el corte arranca antes de 1,96 s, que incluye el «-te» de «totalmente», aparece «determinado»; (2) la
 * palabra dura 0,78 s (2,56-3,34 s), que cuadra con 4 sílabas a su ritmo de 0,17-0,19 s por sílaba («ter-mi-na-do») y no con las 5 de «de-ter-mi-na-do» (0,85-0,95 s).
 * Se pinta «terminado», que además es lo que tiene sentido. Es una medida, no un oído: mientras esta nota siga aquí, `node proyectos/020/revisar-020.mjs --final` no deja dar la
 * final por buena. Si suena «determinado»: el texto de ese trozo, `voz/hook.txt` y el `dice` de `c02-hook`.
 *
 * ⚠ POR CONFIRMAR AL OÍDO (c01, «Si es el reto,»): whisper-small oye «Si es el resto» (confianza 0,16 en «el», 0,96 en «resto»: el prior del modelo, no evidencia acústica; el catálogo
 * ya lo anotaba con 0,16-0,37). Midiendo la envolvente de alta frecuencia de la toma (banda 4,5-9,5 kHz, `HF − LF`): la /s/ de «Si» (0,86 s) y la de «es» (1,25-1,30 s) aparecen
 * como ruido (HF − LF de +27 y −3 dB) y entre «el» y la pausa (1,40-1,60 s, donde caerían la /s/ de «resto» y su /t/) no hay ruido de /s/ (HF − LF ≈ −40 dB, HF −52 a −56 dB, frente
 * a los −31 dB de la /s/ de «es»): son dos fricativas antes de la pausa, no tres. Se pinta «reto». Misma nota: la puerta no da la final por buena hasta que se oiga.
 *
 * «agendamos» (whisper 0,04 en «ag», 0,84 en «end», 0,93 en «amos») no se marca: cortada la toma desde 1,70 s whisper oye «hagendamos» y desde 2,615 s «agendamos una
 * visita», y los cortes intermedios dan solo variantes de «ag-» pegadas a la «y» anterior.
 */
import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_020 } from "./metraje-020";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en el 017 (que lo pidió así en su revisión 5: «reduce el tamaño de la
 * cursiva 8px»), el 018 y el 019: las cuatro versiones del mismo reel tienen que verse igual. Los px de la composición (1080×1920)
 * que se le restan a las líneas de acento —«terminado,», «para ti.», «definir.», «escríbeme»—: de 99 px a 91 px. Es de
 * ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_020 = 8;

export const subtitulos020: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO: HK03, su voz desde el frame 79 (con la imagen de Isabella ya opaca desde el 76) ──
  {
    id: "h01",
    hasta: 160,
    trozos: [
      { desde: 78, texto: "Si estás buscando" },
      { desde: 95, texto: "un apartamento totalmente" },
      { desde: 128, texto: "terminado,", estilo: "acento" },
    ],
  },
  {
    id: "h02",
    hasta: 240,
    trozos: [
      { desde: 164, texto: "este probablemente" },
      { desde: 210, texto: "no es" },
      { desde: 221, texto: "para ti.", estilo: "acento" },
    ],
  },
  // ── Bloque 4 · la mitad: MD14 ──
  {
    id: "m01",
    hasta: 636,
    trozos: [
      { desde: 566, texto: "No estás viendo" },
      { desde: 581, texto: "un apartamento" },
      { desde: 613, texto: "sin terminar," },
    ],
  },
  {
    id: "m02",
    hasta: 727,
    trozos: [
      { desde: 641, texto: "estás viendo uno" },
      { desde: 674, texto: "que todavía puedes" },
      { desde: 708, texto: "definir.", estilo: "acento" },
    ],
  },
  // ── Bloque 6 · el CTA: CT06 ──
  { id: "c01", hasta: 1115, trozos: [{ desde: 1091, texto: "Si es el reto," }] },
  {
    id: "c02",
    hasta: 1182,
    trozos: [
      { desde: 1118, texto: "escríbeme", estilo: "acento" },
      { desde: 1124, texto: "y agendamos una visita." },
    ],
  },
];

/** Para la pista de captions de la plataforma (R14). */
export const subtitulos020Srt = segmentosDe(subtitulos020, FPS_020);
