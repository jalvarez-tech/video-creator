/**
 * LOS SUBTÍTULOS EDITORIALES DEL 021 — `BloqueEditorial[]`.
 *
 * Todo lo que dice Isabella, en trozos de una a cuatro palabras con un acento por frase (skill
 * `recorrido-luxur`, `subtitulos-editoriales.md`), y NADA MÁS: la primera toma sale sin texto, y el cierre lleva
 * el logo y la web (eso no es un bloque de texto: es una imagen, en `Recorrido021.tsx`). Frames ABSOLUTOS de la
 * composición, a 30 fps.
 *
 * DE DÓNDE SALE CADA COSA. El TEXTO, de los guiones marcados de `proyectos/021/voz/{hook,mitad,cta}.txt` (el del
 * catálogo, partido en trozos; el del CTA, solo su segunda mitad); los TIEMPOS, de los ONSETS de la energía de la voz SOLA de cada toma
 * (`herramientas/onsets-voz.py`: tras una pausa, el onset que la sigue) y de `herramientas/palabras-desde.py` (corta la toma en cada
 * candidato y dice qué palabra es la primera que oye whisper desde ahí). Cada línea entra 0-3 f ANTES de su palabra, porque fundirá 5 f:
 * `herramientas/lineas-vs-onsets.py` lo comprueba sobre la voz SOLA de cada toma y `herramientas/subs-vs-voz.py` sobre el render.
 * Segundo de la fuente → frame de la comp: `en + round(t·30) − round(desde·30)`.
 *
 * LAS VOCES. `h01-h02` suenan desde el frame 18 («Mira»: el hook es el primer plano, a corte en el f0, y su primera palabra llega 15 f después del golpe de
 * apertura de la música; REVISIÓN 2, pedido del usuario: la pieza abre con el hook y por tanto con texto en el primer segundo); `m01-m02`, de MD01 (556); `c01`, de CT02 (1164).
 *
 * LAS PALABRAS CON AVISO (el catálogo de material las anotaba; el registro de uso no).
 *
 * ⚠ POR CONFIRMAR AL OÍDO (h01, «Mira»): whisper escribe «Mirá» (conf. 0,28 en «Mi»). Midiendo la voz sola: en «mi-ra» la segunda sílaba es 6 dB más
 * fuerte que la primera (−11,5 frente a −17,9 dB), dura 170 ms frente a 120 y sube de 289 a 320 Hz (la primera, 268 Hz): el acento cae en
 * la SEGUNDA sílaba, es decir, se oye «mirá» (voseo paisa), no «mira». Se pinta «Mira» porque el catálogo lo manda («subtitular “Mira” salvo que ella lo diga
 * con voseo a propósito») y es lo que se lee en cualquier acento. Es una decisión de escritura, no una duda de la palabra. Mientras esta nota siga aquí,
 * `node proyectos/021/revisar-021.mjs --final` no deja dar la final por buena. Si prefieres «Mirá»: el texto del primer trozo de `h01`, `voz/hook.txt` y el
 * `dice` de `c02-hook`.
 *
 * «patios y vacíos» (m01, MD01) — CERRADA POR MEDIDA: whisper-small, sin vocabulario, había oído «partidos ibasíos» en la primera pasada; con
 * la toma cortada desde 1,20, 1,30 y 1,40 s oye «Los patios y vacíos hacen desaparecer», y desde 1,46 s «Patios y vacíos hacen…» (el corte de 1,60 s, ya
 * dentro de «patios», da «parches»). «y vacíos» y la pausa de 2,36-2,53 s antes de «hacen» cuadran con el guion.
 *
 * «entre interior,» (m02, MD01) — CERRADA POR MEDIDA: la conf. de «entre» era 0,25; cortada la toma desde 3,50, 3,85 y 4,40 s, whisper oye «entre
 * interior, paisaje y arquitectura»; desde 4,56 s empieza en «interior»: «entre» ocupa 4,40-4,56 s, tras la pausa de 4,16-4,40 s.
 *
 * «escríbeme» (c01, CT02): cortada la toma desde 5,80 s, whisper oye «escríbeme y ven a conocerlo»; desde 5,88, con la «e» ya perdida, «Suscríbeme».
 * La pausa de 5,60-5,81 s (210 ms) separa «millones,» —que no suena en esta versión— de «escríbeme», que arranca en 5,815 s.
 */
import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_021 } from "./metraje-021";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en el 017 (que lo pidió así en su revisión 5: «reduce el tamaño de la
 * cursiva 8px»), el 018, el 019 y el 020: las cinco versiones del mismo reel tienen que verse igual. Los px de la composición (1080×1920)
 * que se le restan a las líneas de acento —«separadas.», «frontera», «arquitectura.», «escríbeme»—: de 99 px a 91 px. Es de
 * ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_021 = 8;

export const subtitulos021: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO: HK06, el primer plano; su voz desde el frame 18 (la imagen es opaca desde el 0) ──
  {
    id: "h01",
    hasta: 111,
    trozos: [
      { desde: 16, texto: "Mira lo que ocurre" },
      { desde: 37, texto: "cuando arquitectura" },
      { desde: 83, texto: "y naturaleza" },
    ],
  },
  {
    id: "h02",
    hasta: 154,
    trozos: [
      { desde: 113, texto: "dejan de estar" },
      { desde: 129, texto: "separadas.", estilo: "acento" },
    ],
  },
  // ── Bloque 4 · la mitad: MD01 ──
  {
    id: "m01",
    hasta: 645,
    trozos: [
      { desde: 555, texto: "Los patios y vacíos" },
      { desde: 593, texto: "hacen desaparecer esa" },
      { desde: 625, texto: "frontera", estilo: "acento" },
    ],
  },
  {
    id: "m02",
    hasta: 737,
    trozos: [
      { desde: 649, texto: "entre interior," },
      { desde: 688, texto: "paisaje y" },
      { desde: 718, texto: "arquitectura.", estilo: "acento" },
    ],
  },
  // ── Bloque 6 · el CTA: CT02, solo su segunda mitad ──
  {
    id: "c01",
    hasta: 1220,
    trozos: [
      { desde: 1162, texto: "escríbeme", estilo: "acento" },
      { desde: 1181, texto: "y ven a conocerlo." },
    ],
  },
];

/** Para la pista de captions de la plataforma (R14). */
export const subtitulos021Srt = segmentosDe(subtitulos021, FPS_021);
