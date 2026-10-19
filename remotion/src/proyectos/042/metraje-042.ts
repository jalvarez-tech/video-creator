/**
 * EL RECORRIDO 042 — «Lote en El Carmen de Viboral (Mia)», V25 del registro y SEXTO reel de esta propiedad (el segundo de las cuatro sesiones V23-V26 lanzadas a la vez el 2026-10-17) — los planos, como DATOS.
 *
 * Ángulo: «ENCONTRÉ», el hallazgo. «Encontré un lote…» (el hook) → el recorrido lo descubre, de las palmas y la cabaña a las terrazas con el cielo rosa (bloque 3) → «acabas de encontrarlo» (la mitad) →
 * el lote al atardecer, lateral y a vuelo bajo hasta la vista (bloque 5) → «si tienes un proyecto en mente, escríbeme» (el CTA). Estructura del canal: DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA.
 *
 *   hook   HK01  «Encontré un lote donde puedes tener privacidad, naturaleza y dos accesos, y está en El Carmen de Viboral.»   (libre: la V25 la estrena)
 *   mitad  MD03  «Si llevas meses buscando tu lugar para tu casa campestre, acabas de encontrarlo.»                           (REPITE la de la V18: no quedaba otra que dijera «encontrar»; declarado)
 *   CTA    CT04  «Si tienes un proyecto en mente, escríbeme y hablamos más sobre este lote.»                                  (REPITE la de la V15: no queda ningún CTA limpio; declarado)
 *
 * LO QUE ES LO MISMO QUE EN LAS VERSIONES ANTERIORES (y se dice): la mitad (V18) y el CTA (V15) son tomas ya publicadas, con su misma frase. Cambian el hook (nueva), el ángulo (el hallazgo), la canción y TODO el
 * metraje de recorrido: los tres drones son del 2026-10-14 y ninguna versión los usó (DR206, DR221, DR228: exclusivos de esta pieza). No hay recorridos a pie (RC01-RC05): están grabados de día, los drones al
 * atardecer, y mezclarlos metería un tercer look; con tres drones de 15, 23 y 27 s sobran ventanas.
 *
 *   bloque 1  c01                  la apertura: DR206 3,0-5,5 s, el lote entero a la hora dorada, lateral y a velocidad constante; SIN TEXTO NI VOZ
 *   bloque 2  c02                  Isabella camina hacia cámara en la loma con el cielo azul: el hook (entra a corte; empieza a hablar a los 2,25 f de entrar: HK01 no deja aire)
 *   bloque 3  c03 c04 c05          el descubrimiento, tres ventanas del MISMO vuelo (DR221): las palmas, la cerca y la cabaña (4,5 s) → las terrazas con el rojo de la tierra y el cielo rosa (12,0 s) → la pared de
 *                                  terrazas con las nubes rosadas (19,5 s). El primero entra A CORTE en el golpe de 17,4 dB que vuelve tras el respiro del piano; los otros dos, disolviendo
 *   bloque 4  c06                  Isabella camina hacia cámara en la loma: la mitad («acabas de encontrarlo»)
 *   bloque 5  c07 c08 c09          la cabaña y el árbol grande de lado (DR206 7,8 s) → el vuelo bajo sobre las terrazas, la tierra roja y el sol detrás de los árboles (DR228 7,5 s) → LA VISTA: el cielo
 *                                  rosa con los árboles en silueta (DR228 14,5 s, el plano más largo del bloque)
 *   bloque 6  c10 c11              Isabella en la loma con los pinos y la cabaña: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO. La canción es PIANO («Silver Skies Cinematic Piano»: sereno, esperanzador, La# mayor) y no tiene pulso: con piano las disolvencias van libres y solo los cortes secos piden golpe.
 * Hay DOS cortes secos: la entrada del hook (HK01 empieza a hablar a los 2,25 f: la música tiene que estar ya abajo y no hay golpe que pueda sonar entero; declarado) y la entrada del paseo, en el
 * golpe de 17,4 dB que vuelve de un respiro de la canción (el piano calla de +4,5 a +9,1 s: eso es lo que suena bajo el hook).
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(15)` = 15/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS. Un plano que entra
 * disolviendo (`disolver`) empieza a verse 12 f ANTES de su `en` (`solapeDe`): su clip tiene que tener esos 12 f antes de `desde`, y el plano anterior dura hasta ese `en`.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f77, 2,6 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Los drones son del atardecer y Isabella de día: el
 * color se casa plano a plano. Con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-042.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-042";

export const FPS_042 = 30;

export type Entrada = "corte" | "disolver";
export type Bloque = 1 | 2 | 3 | 4 | 5 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. `s0`/`s1`, medidos por energía (perfil de 20-40 ms en la banda de voz) y por arranques de sílaba; `lufs`, con ebur128 sobre el WAV TRATADO que suena. */
export interface VozDelCorte {
  /** Segundo de la fuente en que empieza a hablar. */
  s0: number;
  /** Segundo de la fuente en que termina SU frase (la toma puede seguir: se corta aquí). */
  s1: number;
  /** Sonoridad integrada de la voz TRATADA en esa ventana (LUFS). */
  lufs: number;
  /** Lo que dice, tal como está en el guion. Solo para leer el plan. */
  dice: string;
}

export interface Corte extends CorteDelFormato<Entrada> {
  /** `foto` solo para la tarjeta oscura del cierre (`c11-cierre`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella: el WAV de su voz TRATADA (`<toma>-voz.wav`, `normalizar.mjs`). */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −22,5 · −23,6 · −21,5 LUFS en su ventana de voz; cada una pasa por la
 * cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS) hasta ≈ −15 LUFS con el pico real a
 * −2,4 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Silver Skies Cinematic Piano» — `archivos/musica/Silver Skies Cinematic Piano.mp3` (sha 8 `9c3a3dc3`), piano, 2:40. Se entra en su golpe de 46,998 s (12,3 dB) y de ahí suena a −15…−16 LUFS, con un respiro
 * (de 51,6 a 55,5 s la canción baja a −28 dB) y un golpe de 17,4 dB a los 55,772 s, que es lo que abre el paseo. Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es
 * el de «empieza a subir»): `proyectos/042/musica/golpes-042.json` (`medir-pista.py --json`).
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  apertura: { t: 46.998, db: 12.3 },
  /** El último golpe antes del hook: suena en el f57 y la música baja tras él (el hook entra a corte en el f75 y su primera sílaba suena 2,25 f después: el piano ya tiene que estar abajo). */
  antesDelHook: { t: 48.816, db: 9.8 },
  /** EL RETORNO: el piano vuelve de su respiro a los 55,772 s con 17,4 dB; acaba el hook y entra el paseo. */
  paseo: { t: 55.772, db: 17.4 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (46,998 s) cae en el frame 3 de la pieza; redondeado a un frame (1409/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 1409 / FPS_042;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_042;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_042;

/** Isabella: un empuje lento hacia ella (camina hacia cámara: el empuje la acompaña). Los drones, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-042/${id}.mp4`;
const a = (id: string): string => `recorrido-042/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE del canal: contraste con cuerpo, negros hundidos, luces recogidas (los cielos son lo primero que se quema), un punto cálido y +10 % de saturación. Orden del efecto: exposición → balance de blancos →
 * sombras/luces/blancos/negros → contraste → saturación → vibrance. `vibrance` ≤ 0,05 (sobre hormigón gris pinta un moteado de colores y vuelve rosadas las nubes) y las tomas de Isabella, `saturation` ≤ 1,06:
 * la piel se queda donde estaba. El AJUSTE de cada plano se mide (`herramientas/medir-color.py`), no se hereda.
 */
const COLOR_BASE: ColorCine = {
  contrast: 1.1,
  blacks: -0.06,
  shadows: 0.08,
  highlights: -0.2,
  whites: -0.05,
  temperature: 0.03,
  saturation: 1.1,
  vibrance: 0,
};

/** El color de un plano: la base más el ajuste de su toma (medido, `medir-color.py`). */
const color = (ajuste: ColorCine = {}): ColorCine => ({ ...COLOR_BASE, ...ajuste });

/**
 * Los frames de cada cambio de plano. Solo DOS son cortes secos (la entrada del hook y la del paseo); los demás disuelven (con piano las disolvencias van libres) y su `en` es el de la disolvencia ya terminada.
 */
const P = {
  hook: 75, //                     Isabella entra a corte (2,5 s de apertura); su primera palabra, 2,25 f después
  paseo: golpe(GOLPE.paseo), //    266 · acaba el hook; el golpe del retorno abre el paseo
  terrazas: 347, //                las terrazas con la tierra roja y el cielo rosa (DR221)
  pared: 428, //                   la pared de terrazas con las nubes (DR221)
  mitad: 509, //                   Isabella con la mitad (disuelve; su primera palabra suena en el f509,6)
  cabana: 646, //                  la cabaña y el árbol grande de lado (DR206)
  vuelo: 721, //                   el vuelo bajo sobre las terrazas (DR228)
  vista: 796, //                   la vista, el plano más largo del bloque 5 (105 f)
  cta: 901, //                     Isabella con el CTA (disuelve; su primera palabra suena en el f901,1)
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 5,10 s (153 f) y desde `desde` (13 f) hasta el f133 del clip hay 120. Su voz va de 0,47 a 3,98 s (f902-1007 de la comp): 13,6 f (0,45 s) de su cara tras la última
 * palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela: el plano acaba antes del final del clip, que sigue 20 f más.
 */
const DUR_CTA = 120;

/**
 * Dónde acaba la música (frame de la comp): se apaga con curva bajo la tarjeta y llega a cero 8 f antes del primer golpe fuerte que trae la canción tras su caída (82,727 s, 19,5 dB, en el f1074).
 */
export const FIN_MUSICA_042 = 1066;

export const metraje042: readonly Corte[] = [
  // ── Bloque 1 · la apertura ──
  {
    id: "c01-apertura",
    bloque: 1,
    tipo: "video",
    src: v("dr206"),
    // DR206 (4K vertical, atardecer del 2026-10-14), del 3,00 al 5,50 s: el lote entero a la hora dorada, con las terrazas, la tierra roja, el árbol grande y la cabaña, y un cielo de nubes lilas sobre el
    // horizonte dorado. Movimiento uniforme (0,98-1,11, dispersión 0,02: `perfil_mov`): ya va a velocidad desde el frame 0. Entra a corte con el golpe de 12,3 dB del f3 (no nace de negro).
    desde: 3.0,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.05, shadows: 0.15, highlights: -0.35, whites: -0.2, saturation: 1.08 }),
    reason:
      "El lote entero a la hora dorada (la promesa): las terrazas, la tierra roja, el árbol grande y la cabaña bajo un cielo de nubes lilas y horizonte dorado. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk01"),
    audio: a("hk01-voz"),
    voz: {
      s0: 0.075,
      s1: 6.16,
      lufs: -15.1,
      dice: "Encontré un lote donde puedes tener privacidad, naturaleza y dos accesos, y está en El Carmen de Viboral.",
    },
    // La voz empieza a los 0,075 s (2,25 f: la primera sílaba, tras un valle de −86 dB) y acaba a los 6,16 s (184,8 f); el clip dura 6,77 s (203 f). `desde` 0 entra A CORTE en el f75 y la primera sílaba suena 2,25 f
    // después: la música ya tiene que estar abajo (baja con curva desde el golpe del f57, ver `audio-042.ts`). El plano dura 191 f (hasta el golpe del retorno, f266): 7,2 f tras la última palabra.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-042.ts`): «Encontré» (whisper oye «Encontro»: la -é final) y «naturaleza» / «dos accesos» (whisper oye «naturaleza y dos accesos y»: la «y» de «y dos» suena pegada).
    // Isabella camina hacia cámara en la loma, lejos al principio, con el cielo azul y las montañas detrás: el empuje la acompaña.
    desde: 0,
    en: P.hook,
    dur: P.paseo - P.hook,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, highlights: -0.35, whites: -0.2, saturation: 1.04 }),
    reason:
      "Loma con el cielo azul (el hallazgo): Isabella camina hacia cámara y dice «encontré un lote donde puedes tener privacidad, naturaleza y dos accesos, y está en El Carmen de Viboral». Entra a corte; la música ya está abajo.",
  },
  // ── Bloque 3 · el descubrimiento: tres ventanas del mismo vuelo (DR221) ──
  {
    id: "c03-palmas",
    bloque: 3,
    tipo: "video",
    src: v("dr221"),
    // DR221 (4K vertical, atardecer), del 4,50 al 7,20 s (+0,4 s de la disolvencia siguiente): el dron sube desde las palmas y la cerca de madera; asoma la cabaña entre las terrazas verdes y el eucalipto grande
    // con el atardecer detrás. Movimiento 1,27-1,32, dispersión 0,03. Entra A CORTE en el golpe de 17,4 dB del retorno (f266).
    desde: 4.5,
    en: P.paseo,
    dur: P.terrazas - P.paseo,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.05, shadows: 0.2, highlights: -0.4, whites: -0.2, saturation: 1.1 }),
    reason:
      "Las palmas, la cerca y la cabaña (lo primero que se descubre): el dron sube desde las palmas y la cerca de madera y asoma la cabaña entre las terrazas verdes; el golpe del retorno abre el paseo.",
  },
  {
    id: "c04-terrazas",
    bloque: 3,
    tipo: "video",
    src: v("dr221"),
    // DR221, del 12,00 al 14,70 s: las terrazas con la tierra roja arriba, el árbol grande y el cielo rosa detrás del horizonte; el dron sigue subiendo (movimiento 1,54 → 1,40, dispersión 0,04). Ningún segundo
    // en común con la ventana anterior.
    desde: 12.0,
    en: P.terrazas,
    dur: P.pared - P.terrazas,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.05, shadows: 0.2, highlights: -0.4, whites: -0.2, saturation: 1.1 }),
    reason:
      "Las terrazas con el cielo rosa (el campo se abre): las terrazas con la tierra roja arriba y el árbol grande sobre un horizonte rosado: el lote que va apareciendo según sube el dron.",
  },
  {
    id: "c05-pared",
    bloque: 3,
    tipo: "video",
    src: v("dr221"),
    // DR221, del 19,50 al 22,20 s: la pared de terrazas con la tierra roja, nubes rosadas y lilas sobre las palmeras del horizonte (movimiento 0,96 → 0,80, dispersión 0,04: la subida se frena).
    desde: 19.5,
    en: P.pared,
    dur: P.mitad - P.pared,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.05, shadows: 0.2, highlights: -0.4, whites: -0.2, saturation: 1.1 }),
    reason:
      "La pared de terrazas con las nubes rosadas (el hallazgo se completa): el dron frena frente a la pared roja de las terrazas con el cielo rosa y lila detrás, justo antes de que Isabella diga que acabas de encontrarlo.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md03"),
    audio: a("md03-voz"),
    voz: {
      s0: 0.52,
      s1: 4.58,
      lufs: -15.1,
      dice: "Si llevas meses buscando tu lugar para tu casa campestre, acabas de encontrarlo.",
    },
    // La voz empieza a los 0,52 s (15,6 f) y acaba a los 4,58 s (137,4 f); el clip dura 5,93 s (178 f). `desde` 15 f entra DISOLVIENDO (el clip tiene 15 f antes) y la primera sílaba suena a los 0,6 f del `en`: la
    // música baja con curva sobre la disolvencia y acaba a tiempo. El plano dura 137 f: hasta 14 f tras la última palabra (f631,4).
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-042.ts`): «acabas» (f600 = 20,0 s del vídeo; whisper oye «acabas» y «acaba»; en la banda de las /s/ casi no hay fricativa: suena casi «acaba de»; es la misma toma de la V18).
    // Isabella camina hacia cámara en la loma con el valle y las montañas detrás.
    desde: fr(15),
    en: P.mitad,
    dur: P.cabana - P.mitad,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, highlights: -0.35, whites: -0.2, saturation: 1.04 }),
    reason:
      "Loma con el valle (el hallazgo, dicho): Isabella camina hacia cámara y dice «si llevas meses buscando tu lugar para tu casa campestre, acabas de encontrarlo». Entra disolviendo desde la pared de terrazas.",
  },
  // ── Bloque 5 · la cabaña, el vuelo y la vista ──
  {
    id: "c07-cabana",
    bloque: 5,
    tipo: "video",
    src: v("dr206"),
    // DR206, del 7,80 al 10,30 s: de lado, el árbol grande en el centro, la cabaña entre las terrazas y el cielo de nubes con el horizonte dorado (movimiento 1,15 → 1,12, dispersión 0,02). Sin la casa del vecino, que
    // entra por la derecha a partir de los 10,4 s. Misma toma que la apertura, 2,3 s después de su último fotograma: el dron ya ha rodeado el árbol.
    desde: 7.8,
    en: P.cabana,
    dur: P.vuelo - P.cabana,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.05, shadows: 0.15, highlights: -0.35, whites: -0.2, saturation: 1.08 }),
    reason:
      "La cabaña y el árbol grande, de lado (lo construido, a la vista): tras la mitad, el dron rodea el árbol y enseña la cabaña entre las terrazas.",
  },
  {
    id: "c08-vuelo",
    bloque: 5,
    tipo: "video",
    src: v("dr228"),
    // DR228 (4K vertical, atardecer), del 7,50 al 10,00 s: el dron vuela bajo sobre las terrazas engramadas hacia la tierra roja, con los árboles en silueta y el sol detrás de la cresta (movimiento 1,48 → 1,31,
    // dispersión 0,03). El primer plano de la subida al cielo rosa.
    desde: 7.5,
    en: P.vuelo,
    dur: P.vista - P.vuelo,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ contrast: 1.05, exposure: 0.1, shadows: 0.4, highlights: -0.5, whites: -0.35, saturation: 1.1 }),
    reason:
      "El vuelo bajo sobre las terrazas (el campo, a ras): el dron vuela pegado a las terrazas engramadas hacia la tierra roja y la cresta con los árboles en silueta: lo que sigue es el cielo.",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("dr228"),
    // DR228, del 14,50 al 18,00 s: el cielo rosa y lila sobre los árboles en silueta, con la tierra roja abajo (movimiento 0,93 → 0,82, dispersión 0,03). Es el plano más largo del bloque 5 (105 f) y el clímax: la
    // vista que tendría delante quien tuviera el lote. Ningún segundo en común con el vuelo anterior (7,5-10,0 s).
    desde: 14.5,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ contrast: 1.05, exposure: 0.1, shadows: 0.4, highlights: -0.5, whites: -0.35, saturation: 1.1 }),
    reason:
      "El cielo rosa sobre los árboles en silueta (la vista, el clímax): el vuelo llega a la cresta y el cielo se abre en rosas y lilas: lo que tendría delante quien encontrara este lote. El plano más largo del bloque.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct04"),
    audio: a("ct04-voz"),
    voz: {
      s0: 0.47,
      s1: 3.98,
      lufs: -15.1,
      dice: "Si tienes un proyecto en mente, escríbeme y hablamos más sobre este lote.",
    },
    // La voz empieza a los 0,47 s (14,1 f) y acaba a los 3,98 s (119,4 f); el clip dura 5,10 s (153 f). `desde` 13 f entra DISOLVIENDO (el clip tiene 13 f antes) y la primera sílaba suena a 1,1 f del `en`. El plano
    // dura 120 f (acaba en el f133 del clip, 20 f antes de su final): 13,6 f tras la última palabra, en los que la imagen funde a negro (los últimos 6). Todas sus palabras, con confianza ≥ 0,6 en whisper.
    // Isabella camina hacia cámara frente a la cabaña, con los pinos y las palmas detrás y el cielo cubierto.
    desde: fr(13),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, highlights: -0.35, whites: -0.2, saturation: 1.04 }),
    reason:
      "Loma con la cabaña (la invitación): Isabella dice «si tienes un proyecto en mente, escríbeme y hablamos más sobre este lote»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-042.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-042/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_042 = P.cta + DUR_CTA + DUR_TARJETA;
