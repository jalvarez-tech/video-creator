/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 056 — `BloqueEditorial[]`.
 *
 * Todo lo que se dice, en trozos de una a cuatro palabras, con UN acento por bloque como mucho (skill `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps.
 * El texto sale del guion marcado (`proyectos/056/voz/*.txt`: lo escribo yo con lo que se OYE, comprobado por cortes) y los tiempos, de la voz: cada línea llevada al arranque MEDIDO de su palabra sobre la voz sola
 * (`onsets-voz.py` + `palabras-desde.py`), no al DTW de whisper (R31). Cada línea entra 0-3 f ANTES de su palabra (la primera de cada toma, en el frame en que su imagen ya es opaca).
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la apertura, DR02): el primer subtítulo entra en el f84, con la imagen de Isabella (opaca desde el f73),
 * 1 f antes de su primera sílaba. El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido056.tsx`) y no un bloque de texto.
 *
 * LAS ÚNICAS CIFRAS EN PANTALLA SON LAS QUE ELLA DICE: «seis» (escrito con letras, como lo dice) y «10» (en cifra, como lo dice: «menos de 10 unidades»). La ficha (220 m², 500 m² de lote, 4 alcobas) y el precio
 * no van en pantalla en el reel (van al caption y a la versión con ficha). La valorización la dice la voz de Isabella; no hay un rótulo del canal que la prometa.
 *
 * EL ACENTO MARCA LA EXCLUSIVIDAD (el ángulo de la pieza): «solo seis casas.» (el hook), «menos de 10» (la mitad: el dato que respalda el ángulo, NO la valorización) y «Escríbeme.» (la acción del CTA). Solo hay uno
 * por bloque y entre dos hay ≥ 2 s: f157 · f491 · f968.
 *
 * LOS TIEMPOS, a la palabra (segundo de la fuente → frame = en + round(s·30) − round(desde·30)):
 *   hook (en 73, desde 12 f)   «Descubre» 0,80 · «privacidad» 1,51 · «vivir» ≈ 2,10 · «condominio» 2,525 · «solo» 3,28
 *   mitad (en 457, desde 12 f) «Los» 0,815 · «menos» ≈ 1,62 · «unidades» ≈ 2,20 · «se» 3,18 · «diferente» 3,61
 *   CTA (en 875, desde 44 f)   «Si» 1,845 · «tranquilidad» 2,87 · «esta» 3,50 · «para» 4,14 · «Escríbeme» 4,625
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con `--final` falla SOLO por ella):
 *   · «privacidad» (HK04, f104 = 3,5 s del vídeo): whisper oye «prioridad». Medido con `formantes.py` (`proyectos/056/medidas/formantes-privacidad.txt`): tras la /i/ de «pri-» viene una vocal ABIERTA de F1 ≈ 730-790 Hz,
 *     la /a/ de esta voz (la de «casas»: F1 650-790) y no su /o/ (la de «solo»: F1 ≈ 520-590), y en la banda de las /s/ hay un resalte de fricativa a los 1,60-1,66 s de la toma, donde cae la «ci»; «prioridad» no tendría
 *     ni lo uno ni lo otro, y el sentido de la frase y el ángulo de la pieza dicen «privacidad». Pero la palabra dura ≈ 0,33 s: la medida cierra la vocal, no la palabra. Se pinta «privacidad» y la nota se queda.
 *   · «condominios» (MD02, f469 = 15,6 s): whisper oye «conominos» (la «d» no se oye); es «condominios». Menos dudosa que la anterior, se anota por ser la palabra de la propiedad.
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_056 } from "./metraje-056";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a
 * 91 px. Es de ESTA pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_056 = 8;

export const subtitulos056: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK04): imagen opaca desde el f73, primera sílaba en el f85 ──
  {
    id: "h01",
    hasta: 135,
    trozos: [
      { desde: 84, texto: "Descubre la" },
      { desde: 104, texto: "privacidad de" },
      { desde: 122, texto: "vivir en un" },
    ],
  },
  {
    id: "h02",
    hasta: 184,
    trozos: [
      { desde: 135, texto: "condominio de" },
      { desde: 157, texto: "solo seis casas.", estilo: "acento" },
    ],
  },
  // ── Bloque 4 · la mitad DICHA (MD02): imagen opaca desde el f457, primera palabra en el f470 ──
  {
    id: "m01",
    hasta: 538,
    trozos: [
      { desde: 469, texto: "Los condominios de" },
      { desde: 491, texto: "menos de 10", estilo: "acento" },
      { desde: 509, texto: "unidades privadas" },
    ],
  },
  {
    id: "m02",
    hasta: 573,
    trozos: [
      { desde: 538, texto: "se valorizan" },
      { desde: 551, texto: "diferente." },
    ],
  },
  // ── Bloque 6 · el CTA DICHO (CT01): imagen opaca desde el f875, primera palabra en el f886,4 (el cierre es el logo, no un bloque de texto) ──
  {
    id: "c01",
    hasta: 934,
    trozos: [
      { desde: 886, texto: "Si realmente buscas" },
      { desde: 915, texto: "tranquilidad," },
    ],
  },
  {
    id: "c02",
    hasta: 968,
    trozos: [
      { desde: 934, texto: "esta casa es" },
      { desde: 953, texto: "para ti." },
    ],
  },
  { id: "c03", hasta: 988, trozos: [{ desde: 968, texto: "Escríbeme.", estilo: "acento" }] },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos056Srt = segmentosDe(subtitulos056, FPS_056);
