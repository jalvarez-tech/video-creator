/**
 * LOS SUBTÍTULOS EDITORIALES DEL 017 — `BloqueEditorial[]`.
 *
 * Todo lo que dice Isabella, en trozos de una a cuatro palabras con un acento por
 * frase (skill `recorrido-luxur`, `subtitulos-editoriales.md`), y NADA MÁS:
 * la primera toma sale sin texto (revisión 4: sin el hook escrito de arriba ni
 * subtítulos), y el cierre lleva el logo en vez de la cuenta de texto (ese no es
 * un bloque de texto: es una imagen, en `Recorrido017.tsx`). Frames ABSOLUTOS de la
 * composición, a 30 fps.
 *
 * DE DÓNDE SALE CADA COSA. El TEXTO, de los guiones marcados de
 * `proyectos/017/voz/{hook,mitad,cta}.txt` (el del catálogo, partido en trozos);
 * los TIEMPOS, de `trozos-editoriales.mjs` con la voz de cada toma
 * (`--en`/`--desde` del tramo de esa fuente, `--s0` y `--audio`)… y CORREGIDOS A MANO.
 * El alineador acierta a ±3 f casi siempre, pero en estas tres tomas llegó a
 * poner líneas hasta 0,3-0,45 s ANTES de la palabra: whisper-small marca el final
 * de cada token con el DTW y, tras una pausa corta o dentro de una cifra, se va
 * antes (m01 «317 metros», m02 «para desarrollar» y «el interior»). Cada línea
 * de abajo está llevada al arranque de su palabra contra la envolvente de la voz
 * (valle profundo → subida; `herramientas/onsets-voz.py`) y las dudosas, contra el
 * espectrograma. La puerta (`revisar-017.mjs`) comprueba lo que se puede medir:
 * que cada trozo cae dentro de una ventana de voz, que nada tapa a Isabella y que
 * el validador del motor no avisa.
 *
 * LAS VOCES. `h01-h02` suenan desde el frame 61 («Este», un frame después de que
 * la imagen de Isabella sea opaca en el pulso 2); `m01-m02`, de MD09; `c01-c02`, de
 * CT07. Los tiempos del hook son los de la rev. 3 desplazados 3 f: es lo que se
 * movió su voz al quitar el hook sobre el dron (ahora entra con su imagen).
 * La primera línea (`h01`) entra en el 61 aunque `subs-vs-voz.py` sobre el render
 * con música dé +4 f: el detector se pierde la primera sílaba («Es», un golpe corto en
 * el 61,0) y mide la segunda («te», en el 64). Sobre la voz SOLA renderizada por el
 * motor, y cruzada con el WAV de la toma, «Es» suena en el 61,0 con el ataque intacto
 * (−3 dB constantes, 0,0 f de retardo): el 61 es el sitio.
 *
 * «esta unidad en específico» (c01), revisión 8: la transcripción oía «línea» (whisper-small,
 * confianza 0,06 en su primer trozo; en otro corte, «noidad») y así estuvo escrito hasta la
 * rev. 7. El usuario lo corrigió: la palabra es «unidad» (el apartamento en venta). Solo
 * cambia el texto: los tiempos de la línea son los de su primera palabra («si») y no se mueven.
 */
import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_017 } from "./metraje-017";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA (revisión 5, pedido del usuario: «reduce el tamaño de la
 * cursiva 8px»). Los px de la composición (1080×1920) que se le restan a las líneas de
 * acento —«terminado», «la oportunidad.», «317 metros», «el interior.», «escríbeme»—: de
 * 99 px a 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen
 * como estaban. La composición se lo pasa a `<SubtitulosEditoriales acentoMenos>` y la
 * puerta lo mide con ese mismo cuerpo.
 */
export const ACENTO_MENOS_017 = 8;

export const subtitulos017: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO: HK02, su voz desde el frame 61 (con la imagen de Isabella ya opaca) ──
  {
    id: "h01",
    hasta: 133,
    trozos: [
      { desde: 61, texto: "Este apartamento" },
      { desde: 83, texto: "aún no está" },
      { desde: 108, texto: "terminado", estilo: "acento" },
    ],
  },
  {
    id: "h02",
    hasta: 209,
    trozos: [
      { desde: 133, texto: "y ahí está," },
      { desde: 152, texto: "precisamente," },
      { desde: 169, texto: "la oportunidad.", estilo: "acento" },
    ],
  },
  // ── Bloque 4 · la mitad: MD09 ──
  {
    id: "m01",
    hasta: 628,
    trozos: [
      { desde: 574, texto: "Tienes" },
      { desde: 588, texto: "317 metros", estilo: "acento" },
    ],
  },
  {
    id: "m02",
    hasta: 700,
    trozos: [
      { desde: 628, texto: "para desarrollar" },
      { desde: 658, texto: "completamente" },
      { desde: 678, texto: "el interior.", estilo: "acento" },
    ],
  },
  // ── Bloque 6 · el CTA: CT07 ──
  {
    id: "c01",
    hasta: 1258,
    trozos: [
      { desde: 1146, texto: "Necesitas saber" },
      { desde: 1177, texto: "si esta unidad en específico" },
      { desde: 1221, texto: "funciona para ti." },
    ],
  },
  {
    id: "c02",
    hasta: 1340,
    trozos: [
      { desde: 1263, texto: "Si es así," },
      { desde: 1288, texto: "escríbeme", estilo: "acento" },
      { desde: 1304, texto: "y la recorremos juntos." },
    ],
  },
];

/** Para la pista de captions de la plataforma (R14). */
export const subtitulos017Srt = segmentosDe(subtitulos017, FPS_017);
