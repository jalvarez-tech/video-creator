/**
 * EL RECORRIDO 054 — Casa en Condominio Los Bravos (La Ceja), V36 del registro y PRIMER reel de esta propiedad (las otras dos, V37/055 y V38/056, se montan a la vez en otras sesiones del mismo checkout) — los planos, como DATOS.
 *
 * Ángulo: «PRIVACIDAD — el lujo real es no tener a nadie encima». «El lujo real no es tener una torre con vista, es no tener vecinos encima» (el hook) → el recorrido lo demuestra con lo que esta casa tiene
 * y una torre no: el jardín propio cercado por su seto, la sala de doble altura abierta a él y el ventanal al verde (bloque 3) → «a 50 minutos de Medellín con una administración de 120.000» (la mitad:
 * el dato que resuelve la objeción de la lejanía) → la cocina, la alcoba que se abre como una puerta y el jacuzzi, el sendero junto al muro y la fachada con su césped (bloque 5, la vista) →
 * «si valoras espacio y privacidad, este espacio te va a encantar; escríbeme y agendemos una visita» (el CTA). Estructura del canal: DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA.
 *
 *   hook   HK01  «El lujo real no es tener una torre con vista, es no tener vecinos encima.»                               (exclusivo de esta versión: `reparto-054-062.md`)
 *   mitad  MD04  «Está a 50 minutos de Medellín con una administración de 120.000.»                                       (DOS cifras: las dos se escriben)
 *   CTA    CT06  «Si valoras espacio y privacidad, este espacio te va a encantar. Escríbeme y agendemos una visita.»       (exclusivo de esta versión)
 *
 *   bloque 1  c01                  la aérea: DR01 57,0-59,77 s (por encargo del usuario, que pidió empezar la toma en 0:57; el reparto daba a esta versión el primer tercio, 0-35 s, y el tercio central, 35-68 s, no es
 *                                  de ninguna): la casa desde arriba, con su tejado de teja, la fachada blanca, el seto y el césped; movimiento uniforme (dispersión 0,13); SIN TEXTO NI VOZ
 *   bloque 2  c02                  Isabella sale por la puerta y camina por la terraza hacia el césped: el hook
 *   bloque 3  c03 c04 c05 c06      el jardín propio (el césped, su seto y la pérgola, RC02) → el paso al interior por el ventanal abierto (RC25) → la sala de doble altura que se abre hacia arriba (RC01)
 *                                  → el ventanal de la sala al jardín (RC03)
 *   bloque 4  c07                  Isabella sentada en la sala: la mitad
 *   bloque 5  c08 c09 c10 c11 c12  la cocina con su isla (RC06) → la puerta de la alcoba que se abre (RC07) → el jacuzzi de piedra junto a la cama (RC13) → el sendero lateral junto al muro, con el césped y los árboles
 *                                  (RC22) → LA VISTA: la fachada y el árbol sobre el césped, con las nubes (RC24, el plano más largo del bloque)
 *   bloque 6  c13 c14              Isabella camina hacia cámara por el césped: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO. La canción es «Luxury, Elegance, Refined» (lounge: plana, −14,6 LUFS de principio a fin y 268 golpes en 3 min): no hay caída que buscar ni compás que respetar a ojo. Se mide: la pieza
 * entra en su golpe de 45,227 s (17,8 dB) y TODOS los cortes son secos y caen cada uno en un golpe MEDIDO (`proyectos/054/musica/golpes-054.json`): los de frontera de bloque (aérea→hook, hook→paseo,
 * recorrido→mitad, mitad→recorrido, el de la vista y el del CTA) en golpes de 11-17,7 dB y los de dentro de un recorrido en golpes de ≥ 10,4 dB (el canal exige 7,4). La rejilla salió de
 * `herramientas/buscar-rejilla-054.py` (12 cortes, plano a plano dentro de sus rangos de duración, con la voz de cada toma medida por energía).
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(24)` = 24/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS y todos entran A CORTE.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f91, 3,0 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la
 * prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-054.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-054";

export const FPS_054 = 30;

export type Entrada = "corte" | "disolver";
export type Bloque = 1 | 2 | 3 | 4 | 5 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. `s0`/`s1`, medidos por energía (perfil de 20-50 ms en la banda de voz); `lufs`, con ebur128 sobre el WAV TRATADO que suena. */
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
  /** `foto` solo para la tarjeta oscura del cierre (`c14-cierre`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella: el WAV de su voz TRATADA (`<toma>-voz.wav`, `normalizar.mjs`). */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −24,0 · −27,3 · −23,6 LUFS en su ventana de voz; cada una pasa por la
 * cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS) hasta ≈ −15 LUFS, así que el
 * plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Luxury, Elegance, Refined» — `archivos/musica/Luxury, Elegance, Refined - Oficial Vídeo Clipe.mp3` (sha 8 `4d36ea48`), lounge, 3:03. Se entra en su golpe de 45,227 s (17,8 dB) y de ahí suena a −14,4…−14,9 LUFS
 * sin caída ni crescendo. Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir»): `proyectos/054/musica/golpes-054.json`
 * (`medir-pista.py --json`, la canción entera).
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la aérea, a corte; no nace de negro). */
  apertura: { t: 45.227, db: 17.8 },
  /** aérea → hook: Isabella entra a corte y su primera sílaba suena 8 f después, con la música ya abajo. */
  hook: { t: 47.895, db: 13.8 },
  /** hook → paseo: el drop con el que empieza el recorrido (el más fuerte de los dos primeros bloques). */
  paseo: { t: 52.9, db: 17.0 },
  /** Los cortes de dentro del primer recorrido. */
  c04: { t: 54.183, db: 10.4 },
  c05: { t: 55.578, db: 14.8 },
  c06: { t: 57.087, db: 10.4 },
  /** recorrido → mitad: Isabella entra a corte y su primera sílaba suena 8 f después. */
  mitad: { t: 58.481, db: 13.6 },
  /** mitad → segundo recorrido. */
  c08: { t: 63.256, db: 11.1 },
  c09: { t: 64.996, db: 17.7 },
  c10: { t: 67.196, db: 12.8 },
  c11: { t: 68.839, db: 14.7 },
  /** La vista entra en un golpe y es el plano más largo del bloque. */
  vista: { t: 71.437, db: 12.3 },
  /** vista → CTA: Isabella entra a corte y su primera sílaba suena 8 f después. */
  cta: { t: 75.23, db: 11.9 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: 1356/30, un número entero de frames (`trimBefore` no lo mueve). El golpe de entrada (45,227 s) cae así en el frame 3 de la pieza.
 */
export const INICIO_MUSICA = 1356 / FPS_054;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.054;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_054;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_054;

/** Isabella: un empuje lento hacia ella (el hook y el CTA la traen caminando hacia cámara y la mitad la tiene sentada: 1,04 de punch-in, sobre un 1080p ya ampliado ×1,2). Los recorridos, quietos: la cámara ya avanza. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-054/${id}.mp4`;
const a = (id: string): string => `recorrido-054/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE del canal: contraste con cuerpo, negros hundidos, luces recogidas (los cielos y los ventanales son lo primero que se quema), un punto cálido y +6 % de saturación. Orden del efecto: exposición →
 * balance de blancos → sombras/luces/blancos/negros → contraste → saturación → vibrance. `vibrance` ≤ 0,05 (sobre hormigón gris pinta un moteado de colores y vuelve rosadas las nubes) y las tomas de Isabella,
 * `saturation` ≤ 1,06: la piel se queda donde estaba. El AJUSTE de cada plano se mide (`herramientas/medir-color.py`), no se hereda.
 */
const COLOR_BASE: ColorCine = {
  contrast: 1.08,
  blacks: -0.06,
  shadows: 0.08,
  highlights: -0.2,
  whites: -0.05,
  temperature: 0.03,
  saturation: 1.06,
  vibrance: 0,
};

/** El color de un plano: la base más el ajuste de su toma (medido, `medir-color.py`). */
const color = (ajuste: ColorCine = {}): ColorCine => ({ ...COLOR_BASE, ...ajuste });

/**
 * Los frames de cada cambio de plano: el frame en que SUENA el golpe de la canción en que entra (`golpe(GOLPE.x)`), que es lo que comprueba la puerta. Todos son cortes secos.
 */
const P = {
  hook: golpe(GOLPE.hook), //       83 · Isabella entra a corte; su primera sílaba, 8 f después
  paseo: golpe(GOLPE.paseo), //     233 · acaba el hook; el drop abre el recorrido
  c04: golpe(GOLPE.c04), //         271
  c05: golpe(GOLPE.c05), //         313
  c06: golpe(GOLPE.c06), //         359
  mitad: golpe(GOLPE.mitad), //     400 · Isabella entra a corte; su primera sílaba, 8 f después
  c08: golpe(GOLPE.c08), //         544
  c09: golpe(GOLPE.c09), //         596
  c10: golpe(GOLPE.c10), //         662
  c11: golpe(GOLPE.c11), //         711
  vista: golpe(GOLPE.vista), //     789 · la vista (114 f, el plano más largo del bloque)
  cta: golpe(GOLPE.cta), //         903 · Isabella entra a corte; su primera sílaba, 8 f después
} as const;

/**
 * Frames que dura la toma del CTA: la última palabra suena en el f1058 (voz 1,02-5,94 s) y el plano sigue 35 f más (1,17 s), en los que la imagen funde a negro (los últimos 6). Rev. 1, por encargo del usuario:
 * «el CTA al final se corta muy rápido e Isabella no alcanza a decir la palabra visita completa: alárgalo 1 segundo». La rev. 0 cortaba la voz a 5,62 s —tras la «-si-» de «visita», porque la «-ta» final suena a 5,82-5,92 s,
 * a −32…−42 dB— y el plano acababa 14 f después (160 f). Ahora la «-ta» entera suena (+9 f) y el plano dura 30 f más (190). El clip dura 8,55 s (256 f) y desde `desde` (23 f) hasta el f213 del clip hay 190:
 * nada se congela, el plano acaba antes del final del clip.
 */
const DUR_CTA = 190;

export const metraje054: readonly Corte[] = [
  // ── Bloque 1 · la aérea ──
  {
    id: "c01-aerea",
    bloque: 1,
    tipo: "video",
    src: v("dr01"),
    // DR01 (4K vertical, 29,97 fps → 30), del 57,00 al 59,77 s (POR ENCARGO del usuario, rev. 1: «la toma del dron empiézala en 0:57»; la rev. 0 usaba el 9,00-11,77 s, del primer tercio): el dron mira la casa desde
    // arriba, con el tejado de teja, la fachada blanca con su pérgola de cristal, el seto que la rodea y el césped; al fondo, la calle de la urbanización. Movimiento uniforme (4,7 de diferencia media entre
    // fotogramas, dispersión 0,126): ya va a velocidad desde el frame 0. El tercio central del clip (35-68 s) no está en el reparto de ninguna versión (la V37/055 usa 68-103 s y la V38/056 el otro clip).
    desde: 57.0,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0, shadows: 0.1, highlights: -0.3, whites: -0.15 }),
    reason:
      "La casa desde arriba (la promesa): el tejado, la fachada y el seto que la rodea sobre su césped. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk01"),
    audio: a("hk01-voz"),
    voz: {
      s0: 1.06,
      s1: 4.82,
      lufs: -15,
      dice: "El lujo real no es tener una torre con vista, es no tener vecinos encima.",
    },
    // La voz empieza a los 1,06 s (la primera sílaba, tras 1 s de viento) y acaba a los 4,82 s; el clip dura 7,94 s (238 f). `desde` 0,8 s (24 f) entra A CORTE en el f83 y la primera sílaba suena en el f91 (8 f
    // después): el golpe del corte suena entero y la música baja con curva en esos 8 f (ver `audio-054.ts`). El plano dura 150 f (hasta el drop del f233): 29 f tras la última palabra, en los que la música sube.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-054.ts`): «vista» (whisper oye «visa») y «vecinos» (oye «vecinas»).
    // Isabella sale por la puerta y camina por la terraza hacia el césped, con la casa detrás y el seto de fondo: el empuje la acompaña.
    desde: fr(24),
    en: P.hook,
    dur: P.paseo - P.hook,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ exposure: 0.05, temperature: 0.02, saturation: 1.0, highlights: -0.3, whites: -0.12 }),
    reason:
      "La terraza de la casa (el anti-torre): Isabella sale por la puerta y camina hacia el césped diciendo «el lujo real no es tener una torre con vista, es no tener vecinos encima». Entra a corte en un golpe; la música baja con curva antes de su primera sílaba.",
  },
  // ── Bloque 3 · el recorrido: el jardín propio → el paso al interior → la sala de doble altura → el ventanal al verde ──
  {
    id: "c03-jardin",
    bloque: 3,
    tipo: "video",
    src: v("rc02"),
    // RC02 (IMG_8827, 8,0 s), del 0,10 al 1,37 s: bajo la pérgola de lamas, el césped entero con su seto de fondo y el sendero de piedra; la cámara avanza. Es la imagen de la privacidad: nada más que verde
    // alrededor. Entra A CORTE en el drop de 17,0 dB (f233).
    desde: 0.1,
    en: P.paseo,
    dur: P.c04 - P.paseo,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.4, shadows: 0.5, blacks: 0.04, contrast: 1.0, highlights: -0.4, whites: -0.15 }),
    reason:
      "El jardín propio (lo que la torre no tiene): bajo la pérgola, el césped cerrado por su seto y nada más a la vista; el drop abre el recorrido con la imagen de la privacidad.",
  },
  {
    id: "c04-ventanal",
    bloque: 3,
    tipo: "video",
    src: v("rc25"),
    // RC25 (IMG_8893, 16,9 s), del 4,20 al 5,60 s: de la fachada bajo la pérgola al ventanal abierto, por el que se ve la sala de doble altura con su sillón naranja y la hamaca; la cámara avanza hacia adentro.
    desde: 4.2,
    en: P.c04,
    dur: P.c05 - P.c04,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.4, shadows: 0.5, blacks: 0.04, contrast: 1.0, highlights: -0.4, whites: -0.15 }),
    reason:
      "El paso al interior: de la pérgola al ventanal abierto, con la sala de doble altura al fondo; el jardín entra en la casa sin ninguna puerta de por medio.",
  },
  {
    id: "c05-doble-altura",
    bloque: 3,
    tipo: "video",
    src: v("rc01"),
    // RC01 (IMG_8826, 7,2 s), del 3,70 al 5,23 s: la cámara avanza por la sala de doble altura con las ventanas altas y estrechas, los espejos redondos y el sofá frente al televisor apagado; es el plano que más
    // altura enseña. (Primero iba del 2,30 al 3,83 s, con las vigas y el entrepiso; la V37/055 usa 1,2-3,6 s de este clip y se movió a un tramo que no comparte ni un fotograma con ella.)
    desde: 3.7,
    en: P.c05,
    dur: P.c06 - P.c05,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05, shadows: 0.05, highlights: -0.3, whites: -0.12 }),
    reason:
      "La sala de doble altura (el espacio que no comparte techo con nadie): la cámara avanza bajo las ventanas altas y los espejos redondos hacia el sofá; el plano que más altura enseña de la casa.",
  },
  {
    id: "c06-sala",
    bloque: 3,
    tipo: "video",
    src: v("rc03"),
    // RC03 (IMG_8833, 9,1 s), del 3,40 al 4,77 s: el sofá gris frente al ventanal que da al césped, con el seto detrás y un sillón naranja; la cámara avanza despacio hacia la sala.
    desde: 3.4,
    en: P.c06,
    dur: P.mitad - P.c06,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.15, highlights: -0.4, whites: -0.2 }),
    reason:
      "La sala abierta al verde: el sofá frente al ventanal que da al césped y al seto; lo que se ve por la ventana es el jardín de la casa y nada más. Cierra el recorrido en el espacio donde está Isabella.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c07-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md04"),
    audio: a("md04-voz"),
    voz: {
      s0: 0.82,
      s1: 4.42,
      lufs: -15,
      dice: "Está a 50 minutos de Medellín con una administración de 120.000.",
    },
    // La voz empieza a los 0,82 s y acaba a los 4,42 s; el clip dura 14,7 s. `desde` 17 f (0,567 s) entra A CORTE en el f400 y la primera sílaba suena en el f408. El plano dura 144 f (hasta el f544): 28 f de cara
    // tras la última palabra. El resto del clip (de los 6 s en adelante, la cámara se aparta de ella y recorre la sala) no se usa: son planos mudos de la misma toma y de esta versión, y no entran porque la mitad
    // se queda con ella.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-054.ts`): las primeras palabras («Está a», whisper oye «Hace los») y las dos cifras, que se dicen «cincuenta» y «ciento veinte mil».
    // Isabella sentada en el sofá de la sala, con el televisor apagado detrás y la repisa de piedra: el empuje la acerca despacio.
    desde: fr(17),
    en: P.mitad,
    dur: P.c08 - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ exposure: 0.05, temperature: 0.02, saturation: 1.0, highlights: -0.3, whites: -0.12 }),
    reason:
      "La sala (la objeción): Isabella sentada en el sofá contesta lo que nadie pregunta cuando oye «privacidad» —la lejanía y el costo— con dos datos, «a 50 minutos de Medellín» y «administración de 120.000». Entra a corte en un golpe.",
  },
  // ── Bloque 5 · el recorrido: la cocina → la alcoba → el jacuzzi → el sendero lateral → la vista ──
  {
    id: "c08-cocina",
    bloque: 5,
    tipo: "video",
    src: v("rc06"),
    // RC06 (IMG_8836, 21,3 s), del 5,30 al 7,03 s: la isla de la cocina con sus taburetes y el comedor al lado; la cámara avanza. Tras la sala, el paseo sigue por donde se pasa de la sala a la cocina.
    desde: 5.3,
    en: P.c08,
    dur: P.c09 - P.c08,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1, shadows: 0.1, highlights: -0.3, whites: -0.12 }),
    reason:
      "La cocina con su isla (cómo se vive): la cámara pasa del comedor a los taburetes y a los muebles de madera clara; la casa sigue por donde Isabella acaba de sentarse.",
  },
  {
    id: "c09-alcoba",
    bloque: 5,
    tipo: "video",
    src: v("rc07"),
    // RC07 (IMG_8837, 4,6 s), del 0,80 al 3,00 s: la puerta de madera de la alcoba principal se abre y deja ver la cama con sus lámparas y las vigas del techo; al fondo el ventanal al balcón.
    desde: 0.8,
    en: P.c09,
    dur: P.c10 - P.c09,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05, shadows: 0.1, highlights: -0.35, whites: -0.15, temperature: 0, saturation: 1.0 }),
    reason:
      "La alcoba principal (la intimidad): una puerta que se abre y deja ver la cama bajo las vigas, la luz cálida de las lámparas y el ventanal al fondo; el espacio donde nadie está encima.",
  },
  {
    id: "c10-jacuzzi",
    bloque: 5,
    tipo: "video",
    src: v("rc13"),
    // RC13 (IMG_8843, 7,3 s), del 0,00 al 1,63 s: el jacuzzi de la alcoba tras el muro de piedra y el vidrio, con la cama detrás; la cámara pasa de largo hacia la columna.
    desde: 0,
    en: P.c10,
    dur: P.c11 - P.c10,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1, highlights: -0.35, whites: -0.15 }),
    reason: "El jacuzzi junto a la cama (el detalle de lujo): el baño propio de la alcoba, tras el muro de piedra y el vidrio; lo que se disfruta sin salir de la habitación.",
  },
  {
    id: "c11-sendero",
    bloque: 5,
    tipo: "video",
    src: v("rc22"),
    // RC22 (IMG_8889, 14,2 s), del 0,00 al 2,60 s: el sendero de grava pegado al muro blanco, con el césped, el seto y los árboles, y al fondo la terraza bajo la pérgola; la cámara avanza por él. (Primero iba del 3,40 al
    // 6,00 s, hasta la terraza con sus sillas; la V37/055 usa 2,2-6,27 s de este clip y este plano se movió al principio, que solo comparte 0,4 s con ella. Pasados los 6,4 s el clip deja ver el tejado de ladrillo
    // de una casa vecina detrás del seto: no se usa.)
    desde: 0.0,
    en: P.c11,
    dur: P.vista - P.c11,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05, highlights: -0.3, whites: -0.12 }),
    reason:
      "El sendero lateral: de la alcoba al exterior, por el costado de la casa entre el muro blanco, el césped y los árboles, hasta la terraza al fondo; la privacidad también se camina, al aire libre.",
  },
  {
    id: "c12-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc24"),
    // RC24 (IMG_8892, 8,0 s), del 3,90 al 7,70 s (114 f): la fachada blanca y el árbol grande sobre el césped, con las nubes; la cámara se mueve despacio y el árbol va creciendo en el cuadro. Es el plano más largo
    // del bloque: la recompensa. (Primero iba del 2,00 al 5,80 s; la V37/055 usa 1,2-3,9 s de este clip y se movió a un tramo que no comparte ni un fotograma con ella.)
    desde: 3.9,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1, highlights: -0.4, whites: -0.2, shadows: 0.1 }),
    reason:
      "LA VISTA: la casa entera sobre su césped, con el árbol grande y las nubes; nadie a los lados ni arriba. Es el plano más largo del bloque y el último antes de Isabella.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c13-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct06"),
    audio: a("ct06-voz"),
    voz: {
      s0: 1.02,
      s1: 5.94,
      lufs: -15,
      dice: "Si valoras espacio y privacidad, este espacio te va a encantar. Escríbeme y agendemos una visita.",
    },
    // La voz empieza a los 1,02 s y acaba a los 5,94 s (con la «-ta» de «visita», a 5,82-5,92 s); el clip dura 8,55 s (256 f). `desde` 23 f (0,767 s) entra A CORTE en el f903 y la primera sílaba suena en el f911; la última
    // palabra acaba en el f1058 y el plano 35 f después (f1093), con sus últimos 6 f fundiendo a negro (`FundidoACierre`). Isabella sale de cuadro hacia el f1050: el final es la fachada con la pérgola. Nada se congela:
    // quedan 43 f de clip sin usar.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-054.ts`): «valoras» (whisper oye «valores») y «agendemos» (oye «haciéndemos»).
    // Isabella camina hacia cámara por el césped desde el fondo, con la casa y la pérgola detrás y el cielo con nubes.
    desde: fr(23),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ exposure: 0.1, temperature: 0, saturation: 1.0, highlights: -0.4, whites: -0.15 }),
    reason:
      "El césped delante de la casa: Isabella camina hacia cámara y pide una sola acción, «escríbeme y agendemos una visita», cerrando con la palabra del hook, privacidad. Entra a corte en un golpe; la música ya baja a su cama.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  {
    id: "c14-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-054/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c13
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason: "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web en silencio.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c14). */
export const DURACION_054 = P.cta + DUR_CTA + DUR_TARJETA;
