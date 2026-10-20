/**
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO 051 — `BloqueEditorial[]`.
 *
 * DOS clases de bloque, las dos en las letras del texto editorial del canal (Montserrat + Playfair itálica en la palabra marcada, blanco sin sombra, abajo, al 90 %) y con UN acento por bloque como mucho y ≥ 2 s entre dos (skill
 * `recorrido-luxur`, `subtitulos-editoriales.md`). Frames ABSOLUTOS de la composición, a 30 fps:
 *
 *   h01-h02   el HOOK, lo que dice Isabella (voz en directo), desde su SEGUNDO «Deseas» (la primera tentativa, a los 24,74 s, fue un error suyo y no suena ni se ve). A mano, con los arranques MEDIDOS sobre la voz sola (`onsets-voz.py` y el
 *             perfil de 20 ms): «Deseas» 26,38 s · «arrendar» 26,72 s · «amoblado» ≈ 27,1 s · «en» ≈ 27,6 s · «Ven» 28,68 s · «te» 28,98 s de HK05 (frame = en + round(s·30) − round(desde·30), con desde = 26,1 s).
 *   r01-r10   los RÓTULOS: el guion nuevo en pantalla que sustituye a la locución del original (cambio de encargo del usuario, 2026-10-20; reparto 051-053 §5a). UNO a la vez, de 3-4 s, sobre su tramo del recorrido, en el orden del
 *             original. Sin voz que los marque, entran en un GOLPE de la música (`musica/golpes-051.json`, instante = t + 12 ms de ataque − `INICIO_MUSICA` + 42 ms de retardo del render, × 30): la primera línea de cada rótulo, salvo la
 *             del CTA, y varias de las siguientes. Los golpes: f125 (217,34 s · 8,8 dB) · f169 (218,82 · 6,4) · f272 (222,26 · 8,1) · f288 (222,78 · 7,3) · f317 (223,75 · 6,6) · f384 (225,99 · 7,4) · f449 (228,15 · 6,1) · f525 (230,68 · 7,9) · f635 (234,36 · 6,5) ·
 *             f767 (238,75 · 8,2) · f820 (240,52 · 8,7) · f846 (241,39 · 6,2) · f891 (242,87 · 6,7) · f941 (244,55 · 9,3) · f996 (246,37 · 6,4) · f1058 (248,46 · 6,6) · f1121 (250,56 · 9,1) · f1162 (251,90 · 6,1).
 *
 * El texto de los rótulos es el del usuario, tal cual (tuteo, sin exclamaciones, una palabra acentuada por rótulo). La ÚNICA cifra de la pieza es «113 m²» (r01). Lo que prometen los rótulos lo dio el usuario: ninguno dice que el chef o el
 * transporte vayan incluidos en el canon.
 *
 * NO HAY `portada` NI `cuenta` (reglas fijas del canal, `SKILL.md` §0). LA PIEZA ABRE CON ISABELLA (réplica del original: excepción declarada en la puerta, `ABRE_CON_EL_HOOK`): el primer subtítulo entra en el f7, un frame antes de su
 * primera palabra y con su imagen ya opaca (a corte en el f0). El cierre lleva el LOGO, que es una imagen (`LogoCierre` en `Recorrido051.tsx`) y no un bloque de texto.
 *
 * La puerta comprueba que cada trozo del hook cae dentro de una ventana de voz; los rótulos no acompañan a ninguna palabra dicha y se declaran en `SIN_VOZ` de `revisar-051.mjs` (con su propia comprobación: uno a la vez, 3-4 s, en un golpe).
 *
 * POR CONFIRMAR AL OÍDO (R31; la puerta con `--final` falla SOLO por esto):
 *   · «arrendar amoblado en Medellín?» (HK05, «amoblado» hacia los 27,1-27,6 s de la fuente = 1,0-1,5 s del vídeo): la «a» se pega a «arrendar» y whisper oyó «amulado», «a Moldova», «a mi lado», «movilado» y «a mi lado al Medellín» según la pasada. El
 *     original lo subtitula «amoblado» (y los rótulos del 051 dicen «amoblados»): se pinta «amoblado» y se oye antes de publicar. Una palabra que cambia lo que se ofrece.
 *     MEDIDO con `herramientas/formantes.py` (26,38-27,9 s de la fuente): las vocales de «amoblado en» (27,1-27,7 s) salen [a] (F1 ≈ 710-790), [o] breve (F1 ≈ 620 → 450, F2 ≈ 1.100-1.640: «mo»), [a] (F1 ≈ 750, F2 ≈ 1.400-1.750: «bla»), [o] (F1 ≈ 410-530, F2 ≈ 1.610-1.670: «do») y [e] (F2 ≈ 2.450-2.690: «en»): a-mo-bla-do en. «a mi lado» pediría una [i] (F2 > 2.000) en la segunda sílaba y «a Moldova» una [o] en la tercera: ninguna sale. Una medida no es un oído: la nota se queda.
 *   · «Ven, te muestro.»: whisper oyó «20 muestros» y «ven te muestro» según la pasada; el original dice «ven te muestro». Se pinta así.
 */
import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_051 } from "./metraje-051";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores (el 017 lo pidió así: «reduce el tamaño de la cursiva 8px»): los px de la composición (1080×1920) que se le restan a las líneas de acento, de 99 px a 91 px. Es de ESTA
 * pieza y no del canal: `luxur.ts` y las demás piezas siguen como estaban.
 */
export const ACENTO_MENOS_051 = 8;

export const subtitulos051: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook DICHO (HK05, un plano desde el segundo «Deseas»): imagen opaca en el f0, primera palabra en el f8 ──
  {
    id: "h01",
    hasta: 72,
    trozos: [
      { desde: 7, texto: "¿Deseas" },
      { desde: 18, texto: "arrendar amoblado" },
      { desde: 45, texto: "en Medellín?" },
    ],
  },
  {
    id: "h02",
    hasta: 119,
    trozos: [
      { desde: 76, texto: "Ven," },
      { desde: 85, texto: "te muestro.", estilo: "acento" },
    ],
  },
  // ── Bloque 3 · los rótulos, uno por tramo, en el orden del original ──
  // r01 · la cocina y la sala (RC01): entra con el golpe del f125; el acento va ≥ 2 s tras «te muestro» (f85)
  {
    id: "r01",
    hasta: 246,
    trozos: [
      { desde: 125, texto: "113 m²" },
      { desde: 152, texto: "amoblados,", estilo: "acento" },
      { desde: 169, texto: "listos para ti" },
    ],
  },
  // r02 · el cielo y la ciudad (RC10): golpes f272 · f288 · f317
  {
    id: "r02",
    hasta: 396,
    trozos: [
      { desde: 272, texto: "En Las Palmas, con la" },
      { desde: 288, texto: "ciudad", estilo: "acento" },
      { desde: 317, texto: "a tus pies" },
    ],
  },
  // r03 · el jacuzzi privado (RC21): entra con el golpe de 6,1 dB del f449, que es cuando el jacuzzi entra en cuadro (f444; entero hacia el f480); el plano (f384) llega 2 s antes, con las luces de la ciudad
  {
    id: "r03",
    hasta: 521,
    trozos: [
      { desde: 449, texto: "Tu" },
      { desde: 460, texto: "jacuzzi", estilo: "acento" },
      { desde: 481, texto: "privado en el balcón" },
    ],
  },
  // r04 · la alcoba (RC05): golpe f525 (el texto, «Y lo que viene con él:», partido en dos líneas: son 6 palabras)
  {
    id: "r04",
    hasta: 616,
    trozos: [
      { desde: 525, texto: "Y lo que viene" },
      { desde: 551, texto: "con él:" },
    ],
  },
  // r05 · la pared del televisor y el bar (RC05, RC22): golpe f635
  {
    id: "r05",
    hasta: 746,
    trozos: [
      { desde: 635, texto: "Aseo", estilo: "acento" },
      { desde: 651, texto: "semanal incluido" },
    ],
  },
  // r06 · la sala a la hora azul (RC20): golpes f767 · f820 · f846
  {
    id: "r06",
    hasta: 881,
    trozos: [
      { desde: 767, texto: "Acompañamiento", estilo: "acento" },
      { desde: 820, texto: "personalizado desde" },
      { desde: 846, texto: "el día uno" },
    ],
  },
  // r07 · la piscina (RC16): golpes f891 · f941
  {
    id: "r07",
    hasta: 986,
    trozos: [
      { desde: 891, texto: "Chef", estilo: "acento" },
      { desde: 941, texto: "privado cuando quieras" },
    ],
  },
  // r08 · el gimnasio y la Social Kitchen (RC13, RC11): golpes f996 · f1058
  {
    id: "r08",
    hasta: 1111,
    trozos: [
      { desde: 996, texto: "Conductor", estilo: "acento" },
      { desde: 1058, texto: "y transporte a tu medida" },
    ],
  },
  // r09 · la Social Kitchen desde el otro lado (RC12): golpes f1121 · f1162
  {
    id: "r09",
    hasta: 1216,
    trozos: [
      { desde: 1121, texto: "La mejor" },
      { desde: 1136, texto: "asesoría", estilo: "acento" },
      { desde: 1162, texto: "de la ciudad" },
    ],
  },
  // r10 · el CTA sobre Isabella (CT04, muda): SIN golpe (la canción no suena ninguno entre los 251,9 y los 258,6 s); el último fotograma de la imagen es el f1361
  {
    id: "r10",
    hasta: 1356,
    trozos: [
      { desde: 1238, texto: "Escríbeme", estilo: "acento" },
      { desde: 1266, texto: "y agenda tu visita" },
    ],
  },
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos051Srt = segmentosDe(subtitulos051, FPS_051);
