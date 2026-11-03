/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 068 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale de lo que se OYE (whisper small por palabra + trozos aislados, `proyectos/068/voz/`) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su sílaba sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31). Cada línea entra 0-3 f ANTES de su palabra (la primera de cada toma, en su primera sílaba).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la apertura, DR06): el primer subtítulo entra en el f83, con la imagen de Isabella (opaca desde el f73,
 * que entra a corte), en su primera sílaba. El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido068.tsx`) y no un bloque de texto.
 *
 * NINGUNA CIFRA ESCRITA POR LA PIEZA: lo único numérico es «20 minutos», que lo DICE ella en el CTA (el subtítulo es su transcripción; «20 minutos» NO está en la ficha de la web, que dice «a pocos minutos de Medellín»).
 * La superficie (5.170 m²) y el precio (COP 797 M) van al caption y a la versión con ficha.
 *
 * EL ACENTO MARCA LA IDEA Y LA ACCIÓN (el ángulo de la pieza): «privacidad» (el hook, la promesa), «en silencio,» (la mitad: la imagen del refugio) y «escríbeme» (el CTA: el acento va en la palabra de la acción,
 * como manda el formato). Solo hay uno por bloque y entre dos hay ≥ 2 s: f173 · f548 · f980.
 *
 * LOS TIEMPOS, a la sílaba (segundo de la fuente → frame = en + round(s·30) − round(desde·30), con `desde` = 0 en las tres tomas):
 *   hook (en 73)    «El» 0,365 · «verdadero» 0,49 · «es-ta-tus» 0,86-1,075-1,315 · «no es la fachada» 1,55-1,795-1,935-2,105 · «que» 2,45 · «muestras» 2,71 · «es la» 3,045-3,185 · «pri-va-ci-dad» 3,355-3,6 · «que» 3,955 · «puedes» 4,09 · «tener» 4,37
 *   mitad (en 457)  «Imagina» 0,095 · «que el éxito» 0,765-1,06 · «por fin» 1,06 · «se siente» 1,635 · «como» 1,98 · «se ve» 2,42 · «en» 3,075 · «silencio» 3,275 · «con la montaña» 3,91 · «al frente» 4,335 · «y sin nadie» 5,05 · «que te apure» 5,545
 *   CTA (en 875)    «Tu» 0,64 · «bosque» 0,93 · «privado» 1,045-1,5 · «a solo» 1,695 · «20» 2,21 · «minutos» 2,32-2,56 · «de Medellín» 2,56-3,07 · «es-críbeme» 3,52-3,76 · «y agendemos» 4,365-4,485 · «una» ≈ 5,05 · «visita» 5,185
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ellas):
 *   · «bosque» (CT01, f893 = 29,8 s del vídeo): whisper small oye «Tu voz que privado» con la toma entera y «Tu bosque privado» en dos de tres trozos aislados (0,55-1,75 s y 0,55-1,20: «Tuos que privar»); el
 *     catálogo de la sesión madre propuso «refugio» (3 sílabas) y la medida lo descarta: entre «Tu» y «que» hay una /s/ muy clara (la banda de 4-9 kHz supera a la de voz en 0,84-0,86 s: `sibilantes.py`), que
 *     «refugio» no tiene, y la frase mide 6 sílabas en 0,92 s (6,5 sílabas/s, su ritmo en las otras dos tomas: «refugio privado» serían 7, a 7,6/s). Lo que sí encaja con la ficha: el lote tiene «bosque nativo,
 *     pinos y zonas verdes». Se pinta «bosque». Las otras lecturas posibles: «refugio» y «voz que». No se cierra sin oír.
 *   · «agendemos» (CT01, f1005 = 33,5 s): whisper small oye «hajandemos» (toma entera), «ya andemos» y «hagan de» (trozos aislados). Cuenta de sílabas (4,485-4,98 s: y-a-gen-de-mos) y una /s/ final clara (4,86 s)
 *     encajan con «y agendemos»; la /x/ de «gen» es de 40 ms (4,54-4,58 s) y no se distingue de un ruido. Se pinta «y agendemos» (es lo que dice el reparto: «escríbeme y agendemos una visita»). No se cierra sin oír.
 *   · «que» de «nadie que te apure» (MD02, f622 = 20,7 s): whisper small le da 0,31-0,53 de confianza a «nadie» y «que»; los trozos aislados oyen «y si nadie se te apure», «y sin ayer que te apure» y «y nada, y éxito
 *     apure». Lo que se repite: «y sin nadie [que/se] te apure» (9 sílabas, las que miden 5,05-6,0 s). Se pinta «que te apure.» (la gramática y la toma entera). No se cierra sin oír.
 *   · «a solo 20 minutos de Medellín» (CT01): «20» sale de 5 de 5 trozos aislados de whisper («20 minutos») y «Medellín» de 2 de 5; la cifra NO está en la ficha: el usuario decide si se queda.
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_068 } from "./metraje-068";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_068 = 8;

export const subtitulos068: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK04): imagen opaca desde el f73 (entra a corte), primera sílaba en el f84 ──
  {
    id: "h01",
    hasta: 146,
    trozos: [
      { desde: 83, texto: "El verdadero" },
      { desde: 98, texto: "estatus" },
      { desde: 119, texto: "no es la fachada" },
    ],
  },
  {
    id: "h02",
    hasta: 190,
    trozos: [
      { desde: 146, texto: "que muestras, es la" },
      { desde: 173, texto: "privacidad", estilo: "acento" },
    ],
  },
  { id: "h03", hasta: 218, trozos: [{ desde: 191, texto: "que puedes tener." }] },
  // ── Bloque 4 · la mitad DICHA (MD02): imagen opaca desde el f457 (entra a corte), primera palabra en el f460 ──
  {
    id: "m01",
    hasta: 515,
    trozos: [
      { desde: 459, texto: "Imagina que el éxito" },
      { desde: 488, texto: "por fin se siente" },
    ],
  },
  {
    id: "m02",
    hasta: 573,
    trozos: [
      { desde: 515, texto: "como se ve" },
      { desde: 548, texto: "en silencio,", estilo: "acento" },
    ],
  },
  {
    id: "m03",
    hasta: 622,
    trozos: [
      { desde: 573, texto: "con la montaña" },
      { desde: 586, texto: "al frente" },
      { desde: 608, texto: "y sin nadie" },
    ],
  },
  { id: "m04", hasta: 646, trozos: [{ desde: 622, texto: "que te apure." }] },
  // ── Bloque 6 · el CTA DICHO (CT01): imagen opaca desde el f875 (entra a corte), primera palabra en el f894 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 979,
    trozos: [
      { desde: 893, texto: "Tu bosque privado" },
      { desde: 925, texto: "a solo 20 minutos" },
      { desde: 951, texto: "de Medellín," },
    ],
  },
  {
    id: "c02",
    hasta: 1046,
    trozos: [
      { desde: 980, texto: "escríbeme", estilo: "acento" },
      { desde: 1005, texto: "y agendemos" },
      { desde: 1026, texto: "una visita." },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos068Srt = segmentosDe(subtitulos068, FPS_068);
