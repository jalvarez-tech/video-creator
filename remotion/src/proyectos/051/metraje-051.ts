/**
 * EL RECORRIDO 051 — «Tierra Grata Bosque Santo (El Poblado), ARRIENDO», V33 del registro, «VEN, TE MUESTRO» — los planos, como DATOS.
 *
 * Encargo (2026-10-20): RÉPLICA de `…/Apartamento - Tierra Grata - Las Palmas/videos editados/01.mp4` (15-sep-2026, 64,0 s, hecho por otro editor con el material del 2-sep): las mismas tomas en el mismo orden y el mismo texto,
 * en el formato del canal y en sus dos versiones (orgánico y con ficha). Reparto en `proyectos/044/reparto-051-053.md` (§1b: la tabla del «01»); catálogo del material en `proyectos/044/catalogo-material.md`.
 *
 *   hook   HK05 (`Img 9508.mp4`)  «¿Deseas arrendar amoblado en Medellín? Ven, te muestro.»                                   (Isabella camina hacia cámara por el balcón con la vista; voz en directo, DOS planos: ver abajo)
 *   off    la LOCUCIÓN             «Este espectacular apartamento de 113 metros, ubicado en Las Palmas, combina amplitud, comodidad y naturaleza en un solo lugar. … vivir con tu propio jacuzzi privado.»
 *                                  (seis frases, de 4,8 a 63,9 s en el original; no existe como archivo: ver `audio-051.ts`)
 *
 * LA PIEZA ABRE CON ISABELLA (excepción declarada a la regla fija «la primera toma sale sin texto ni voz», por RÉPLICA: el original abre así; igual que el 021, el 023 y los 046/048/050): el frame 0 es ella, su primera
 * palabra suena en el f7 y su primer subtítulo entra un frame antes. El resto de reglas fijas se cumple: nunca el sello, nada arriba, el cierre en la tarjeta oscura con el logo y la web, nada se congela.
 * DURA 65,4 s: más que los 55 s del formato (el original ya duraba 64): aquí manda la réplica (la puerta lo declara en `TOPE_SEGUNDOS`). Y lleva locución en off a lo largo de todo el recorrido (el formato la limita al bloque 5).
 *
 * LA IDEA EN UNA LÍNEA (la del original): esta pieza es PARA QUIEN BUSCA ARRENDAR AMOBLADO EN MEDELLÍN: la pregunta que abre, el apartamento recorrido con la voz de quien lo presenta, el balcón con el jacuzzi privado como
 * «diferencial», las amenidades de la unidad y la invitación a escribir. Los datos que dice la locución (113 metros, lavadora y secadora, cancha de squash, Spa Romano…) son los que el usuario ya publicó: se repiten tal cual.
 *
 *   bloque 2  c01 c02              HK05: Isabella camina hacia cámara por el balcón con la vista (DOS planos con un salto de 0,6 s: «¿Deseas» | «arrendar amoblado en Medellín? Ven, te muestro», como el original, que cortó la pausa)
 *   bloque 3  c03 … c12            el RECORRIDO con la locución encima, en el orden del original: la cocina y la sala (RC01, a ×1,5 como el original) → el cielo, las torres y el jacuzzi (RC10) → el balcón al atardecer y el
 *                                  JACUZZI PRIVADO (RC21) → la alcoba (RC05) → el bar de noche (RC22) → la sala a la hora azul (RC20) → la piscina (RC16, a ×1,5) → el gimnasio (RC13) → la Social Kitchen (RC11, RC12)
 *   bloque 6  c13 c14              Isabella camina hacia cámara en la sala con la palma (CT04, MUDA) con el CTA en off encima; y la tarjeta oscura del cierre (nada se congela)
 *
 * LO QUE EL ORIGINAL HACÍA Y AQUÍ SE DECLARA (comprobado fotograma a fotograma contra los clips; `combinaciones.md` tiene la tabla):
 *   (1) El original acelera RC01 ×1,9 y la piscina ×2: aquí RC01 y RC16 van a ×1,5 (el bloque 3 admite `velocidad`; `viaje-emocional.md` §6) y se ve la misma parte del clip.
 *   (2) El original enseña el jacuzzi (21,6-26,6 s) con RC21 AL REVÉS y ampliado: aquí RC21 va hacia delante (de la ciudad al jacuzzi, que es como se grabó) y el jacuzzi entra en «está aquí».
 *   (3) La piscina del original son RC16 y RC17; aquí solo RC16 (RC17 enseña bañistas). La Social Kitchen del original son 6,6 s de RC11 con gente al fondo; aquí RC11 hasta los 4,0 s (después sale un hombre con portátil) y RC12.
 *   (4) El ÚLTIMO plano del original (Isabella de pie junto a la pared de listones, caminando hacia cámara, en la sala de la entrada) NO ESTÁ en el material: el clip que lo tenga no está en `Videos/`. Se usa el más parecido: CT04 (`Img 9492`,
 *       ella camina hacia cámara en la sala con la palma, con su misma ropa), MUDO. (El catálogo y el reparto decían «tramo mudo de `Img 9496`, 12-18 s»: es la puerta de entrada vista en primera persona, sin ella.)
 *   (5) El HOOK: el original suprimió la pausa de 1,1 s entre «Deseas» (24,74 s de HK05) y «arrendar» (26,38 s) y pegó la voz de «Deseas» sobre el vídeo de 26,2 s. Aquí son DOS planos de HK05 (imagen y voz a la vez) con un salto de 0,6 s.
 *
 * TODO EL MATERIAL ES DEL 2-SEP: ANAMÓRFICO (1920×1080 con SAR 81:256, DAR 9:16: verticales de 608×1080 comprimidos a lo ancho). Se escalan ENTEROS a 1296×2304 (`normalizar.mjs`, `setsar=1`), sin recorte: más blando que
 * Isabella en 4K (×2,13), y se dice, no se filtra (R22). Isabella lleva aquí la chaqueta de flores del 2-sep (la pieza no mezcla vestuarios).
 *
 * QUIÉN MARCA EL TIEMPO: LA LOCUCIÓN Y, DEBAJO, UNA CANCIÓN SIN PULSO. «Einaudi Fly» es piano en Do# menor sin pulso (golpes ≤ 9 dB: no hay rejilla donde cortar en seco, R33): TODAS las entradas del recorrido son
 * DISOLVENCIAS de 12 f y los cambios de plano caen donde los pide la voz y el paseo (los del original). La música lleva la curva: ver `audio-051.ts`.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(12)` = 12/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la prueba se hace a
 * escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-051.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-051";

export const FPS_051 = 30;

export type Entrada = "corte" | "disolver";
/** 2 = el hook (Isabella a cámara) · 3 = el recorrido con la locución · 6 = el CTA en off sobre Isabella y la tarjeta. (No hay bloques 1, 4 ni 5: ver `revisar-051.mjs`.) */
export type Bloque = 1 | 2 | 3 | 4 | 5 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. `s0`/`s1`, medidos por energía (perfil de 20 ms en la banda de voz) y por arranques de sílaba (`onsets-voz.py`); `lufs`, con ebur128 sobre el WAV TRATADO que suena. */
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
  /** Solo las tomas de Isabella con voz en directo (aquí, el hook): el WAV de su voz TRATADA (`<toma>-voz.wav`, `normalizar.mjs`). */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido del usuario desde la V9: «mientras habla Isabella sube los decibeles sin saturar»). El hook (HK05) llega a −28,5 LUFS en su ventana de voz y pasa por la cadena de `normalizar.mjs`
 * (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada y limitador a −2,5 dBFS) hasta −15,0 LUFS integrados; «Deseas» sale a −13,1 (es la sílaba más fuerte de la toma) y el plan le resta lo que le sobra (`lufs`).
 * La locución pasa por su propia cadena (`off-voz.wav`, también a −15,0). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_051;

/** Isabella camina hacia cámara: un empuje lento la acompaña. Los recorridos, quietos (la cámara ya se mueve). */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-051/${id}.mp4`;
const a = (id: string): string => `recorrido-051/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE del canal (la del 017): contraste con cuerpo, negros hundidos, luces recogidas, un punto cálido y +10 % de saturación. Orden del efecto: exposición → balance de blancos → sombras/luces/blancos/negros → contraste →
 * saturación → vibrance. `vibrance` ≤ 0,05 (sobre hormigón gris pinta un moteado de colores y vuelve rosadas las nubes) y las tomas de Isabella, `saturation` ≤ 1,06: la piel se queda donde estaba. El AJUSTE de cada plano se
 * mide (`herramientas/medir-color.py`), no se hereda.
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
 * El frame de cada cambio de plano. Son los del ORIGINAL (`01.mp4`: 4,9 · 10,4 · 20,8 · 26,4 · 34,2 · 37,0 · 44,4 · 51,1 · 52,8 · 55,6 · 59,4 · 63,9 s), movidos lo justo para que cada disolvencia de 12 f
 * tenga clip detrás (`desde` ≥ 12 f × velocidad) y ninguno pase de su último fotograma. Cuando llegue la locución de verdad, lo que se mueve es esta tabla (los `en` y `dur` salen de ella) y los subtítulos.
 */
const P = {
  recorrido: 147, //  4,9 s · acaba el hook; entra la cocina con «Este espectacular apartamento»
  cielo: 312, //      10,4 s · el cielo y la ciudad (RC10)
  jacuzzi: 622, //    20,7 s · el balcón al atardecer y el jacuzzi privado (RC21), en «está aquí»
  alcoba: 792, //     26,4 s · la alcoba (RC05), en «un balcón con jacuzzi privado»
  bar: 1026, //       34,2 s · el bar de noche (RC22), tras «un momento de tranquilidad»
  sala: 1108, //      36,9 s · la sala a la hora azul (RC20)
  piscina: 1340, //   44,7 s · la piscina (RC16), en «cancha de squash»
  gimnasio: 1500, //  50,0 s · el gimnasio (RC13)
  cocina: 1584, //    52,8 s · la Social Kitchen (RC11), en «todo esto en Las Palmas»
  cocina2: 1692, //   56,4 s · la Social Kitchen desde el otro lado (RC12)
  cta: 1782, //       59,4 s · Isabella (CT04), en «escríbeme»
} as const;

/** Frames que dura la imagen de Isabella en el CTA (CT04, de los 3,0 s): hasta 0,05 s tras la última palabra de la locución; los últimos 6 funden a negro. Nada se congela: el plano acaba en su último fotograma. */
const DUR_CTA = 136;

export const metraje051: readonly Corte[] = [
  // ── Bloque 2 · el hook: la pieza abre con Isabella ──
  {
    id: "c01-hook-deseas",
    bloque: 2,
    tipo: "video",
    src: v("hk05"),
    audio: a("hk05-voz"),
    voz: { s0: 24.74, s1: 25.3, lufs: -13.1, dice: "¿Deseas" },
    // HK05 (Img 9508, 2-sep, 32,5 s = 975 f, ANAMÓRFICO): Isabella, con la chaqueta de flores, camina hacia cámara por el balcón con la vista (ventanal, montañas, la banca de listones a la derecha). Habla de 24,74 s («Deseas», onset medido
    // con `onsets-voz.py` y el perfil de 20 ms: 24,74-25,30 s, −17 dB, la sílaba más fuerte de la toma) a 29,48 s. Tras «Deseas» hay una pausa de 1,1 s (25,30-26,38 s) que el original quitó: aquí es un SALTO entre dos planos del mismo clip, sin
    // pausa. Este plano va del 24,5 al 25,5 s (30 f): la primera palabra suena en el f7 y la última acaba en el f24 (el siguiente entra a corte en el f30: calla 6 f antes).
    desde: fr(735),
    en: 0,
    dur: 30,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.06, exposure: -0.1, shadows: 0.15, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "El balcón con la vista (la pregunta): Isabella, pequeña al fondo del cuadro, camina hacia cámara y empieza «¿Deseas…». La pieza abre con ella, a corte, con la música ya baja bajo su voz.",
  },
  {
    id: "c02-hook-arrendar",
    bloque: 2,
    tipo: "video",
    src: v("hk05"),
    audio: a("hk05-voz"),
    voz: { s0: 26.38, s1: 29.48, lufs: -15.1, dice: "arrendar amoblado en Medellín? Ven, te muestro." },
    // Del 26,1 al 30,0 s de HK05 (117 f). «arrendar» empieza a los 26,38 s (onset a 26,40, −24 dB; antes, −60 dB) y «te muestro» acaba a los 29,48 s; «Ven» a los 28,68 s y «te» a los 28,98 s. Entra A CORTE en el f30: la primera
    // palabra suena en el f38 (8 f después, con el desclic de 3 f ya hecho) y la última acaba en el f131; el plano sigue 16 f más (hasta que ella está casi sobre la cámara) y cede a la cocina a corte, con la voz callada 3 f antes.
    // «amoblado» (whisper oyó «amulado», «a Moldova», «a mi lado»…: es una palabra pegada a la «a» anterior) POR CONFIRMAR AL OÍDO (ver `subtitulos-051.ts`).
    desde: fr(783),
    en: 30,
    dur: P.recorrido - 30,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.06, exposure: -0.1, shadows: 0.15, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "El balcón con la vista (la promesa): Isabella camina hacia cámara y dice «arrendar amoblado en Medellín? Ven, te muestro»: la invitación al recorrido que sigue. Salta 0,6 s respecto del plano anterior (la pausa que el original quitó).",
  },
  // ── Bloque 3 · el recorrido, con la locución encima ──
  {
    id: "c03-cocina",
    bloque: 3,
    tipo: "video",
    src: v("rc01"),
    // RC01 (Img 9461, 2-sep, 12,9 s = 387 f): de la isla de la cocina, con sus taburetes y los focos, a la sala con la palma, las puertas correderas y el balcón. Del 0,0 al 8,25 s a ×1,5 (165 f = 5,5 s): el original lo acelera ×1,9; aquí
    // ×1,5 enseña la misma parte del clip. Entra a corte tras Isabella en «Este espectacular apartamento».
    desde: 0,
    en: P.recorrido,
    dur: P.cielo - P.recorrido,
    velocidad: 1.5,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.05, highlights: -0.3, whites: -0.2, shadows: 0.12 }),
    reason:
      "La cocina y la sala (situar): tras Isabella, el apartamento por dentro, de la isla con sus taburetes a la sala con la palma y el balcón al fondo, mientras la locución dice «este espectacular apartamento… combina amplitud». Va a ×1,5 como en el original.",
  },
  {
    id: "c04-cielo",
    bloque: 3,
    tipo: "video",
    src: v("rc10"),
    // RC10 (Img 9509, 2-sep, 10,8 s = 324 f): el balcón del apartamento al atardecer temprano: el cielo con nubes y un rayo de sol, las torres y la ciudad, y, al final, el jacuzzi privado con su escalón. Del 0,4 al 10,73 s (310 f): casi el clip entero,
    // como en el original (10,8-21,6 s).
    desde: fr(12),
    en: P.cielo,
    dur: P.jacuzzi - P.cielo,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.3, highlights: -0.45, whites: -0.25 }),
    reason:
      "El cielo y la ciudad (revelar): de la cocina al balcón, el cielo con nubes, las torres y la ciudad y, al final, el jacuzzi: la naturaleza y la vista de «combina amplitud, comodidad y naturaleza». Plano de la locución más larga (dos frases).",
  },
  {
    id: "c05-jacuzzi",
    bloque: 3,
    tipo: "video",
    src: v("rc21"),
    // RC21 (Img 9537 (1), 2-sep, 11,1 s = 333 f): el balcón del apartamento al atardecer: las luces de la ciudad y las torres (0-8 s) y, al girar a la derecha, la baldosa negra y el JACUZZI PRIVADO de madera con su escalón (de 8,3 s al final; entero a los
    // 9,5 s). Del 5,2 al 10,87 s (170 f): el jacuzzi entra a los 23,8 s de la pieza y está entero a los 25,0 («está aquí»). El original lo enseña AL REVÉS y ampliado (21,6-26,6 s): aquí, hacia delante, como se grabó.
    desde: fr(156),
    en: P.jacuzzi,
    dur: P.alcoba - P.jacuzzi,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.2, shadows: 0.4, highlights: -0.4, whites: -0.3, saturation: 1.08 }),
    reason:
      "El jacuzzi privado (el diferencial): del cielo al atardecer de las luces de la ciudad, el giro hasta el jacuzzi de madera de la ficha, que queda entero cuando la locución dice «está aquí». Lo más valioso del apartamento.",
  },
  {
    id: "c06-alcoba",
    bloque: 3,
    tipo: "video",
    src: v("rc05"),
    // RC05 (Img 9477, 2-sep, 10,2 s = 306 f): la alcoba principal: la cama con sus cojines negros, la lámpara colgante, el ventanal y la pared del televisor. Del 0,4 al 8,2 s (234 f); el original usa del 0,4 al 7,6 s.
    desde: fr(12),
    en: P.alcoba,
    dur: P.bar - P.alcoba,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.15, blacks: 0, shadows: 0.25, highlights: -0.4, whites: -0.3, saturation: 1.04 }),
    reason:
      "La alcoba principal (descanso): del balcón a la cama hecha con la lámpara colgante y la pared del televisor: «un balcón con jacuzzi privado, perfecto para relajarte… un momento de tranquilidad».",
  },
  {
    id: "c07-bar",
    bloque: 3,
    tipo: "video",
    src: v("rc22"),
    // RC22 (Img 9538, 2-sep, 3,2 s = 96 f): el bar de noche con el letrero de neón. Del 0,4 al 3,13 s (82 f): casi entero, como en el original (34,2-37,6 s).
    desde: fr(12),
    en: P.bar,
    dur: P.sala - P.bar,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.4, shadows: 0.3, saturation: 0.95, temperature: -0.04 }),
    reason:
      "El bar de noche (reunirse): una pausa de la locución (el hueco entre «tranquilidad» y «además»), con la luz cálida y el neón de la noche entre dos planos de día.",
  },
  {
    id: "c08-sala",
    bloque: 3,
    tipo: "video",
    src: v("rc20"),
    // RC20 (Img 9536, 2-sep, 18,5 s = 556 f): la sala a la HORA AZUL: el panel curvo de madera, el sofá gris con las tiras de luz, la mesa de centro y el ventanal con la ciudad azul detrás. Del 3,8 al 11,53 s (232 f); el original usa del 3,8 al 11,0 s.
    desde: 3.8,
    en: P.sala,
    dur: P.piscina - P.sala,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.1, shadows: 0.3, highlights: -0.4, saturation: 1 }),
    reason:
      "La sala a la hora azul (estar): el panel curvo, el sofá con las tiras de luz y el ventanal con la ciudad; cierra el apartamento antes de salir a la unidad con «además, el proyecto cuenta con…».",
  },
  {
    id: "c09-piscina",
    bloque: 3,
    tipo: "video",
    src: v("rc16"),
    // RC16 (Img 9525, 2-sep, 9,3 s = 279 f): el carril de nado con los pinos y el cielo, desde arriba; la cámara avanza y gira a la derecha hasta el cielo. Del 0,6 al 8,6 s a ×1,5 (160 f = 5,3 s). Figuras diminutas (≈ 30 px) en las tumbonas del fondo: nada reconocible.
    // El original encadena RC16 (0-4,5 s) y RC17 (0-6 s) a ×2: RC17 no está porque enseña bañistas (ver la cabecera).
    desde: 0.6,
    en: P.piscina,
    dur: P.gimnasio - P.piscina,
    velocidad: 1.5,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.15, shadows: 0.4, highlights: -0.4, whites: -0.3, contrast: 1.04 }),
    reason:
      "La piscina (la unidad): de la sala a la piscina de la unidad, con los pinos y el cielo gris; «piscina, zonas húmedas, cancha de squash». Va a ×1,5 como el original (que la acelera ×2).",
  },
  {
    id: "c10-gimnasio",
    bloque: 3,
    tipo: "video",
    src: v("rc13"),
    // RC13 (Img 9516, 2-sep, 6,0 s = 180 f): el gimnasio, las máquinas, la pared a rayas naranjas, los focos del techo. Del 0,4 al 3,2 s (84 f): el tramo que usa el original (50,0-52,6 s). Figuras diminutas al fondo (no se reconoce a nadie).
    desde: fr(12),
    en: P.gimnasio,
    dur: P.cocina - P.gimnasio,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.2, shadows: 0.3, highlights: -0.4, contrast: 1.06, saturation: 1.06 }),
    reason: "El gimnasio (la unidad: cuidarse): «gimnasio… y muchos espacios de bienestar»; la pared a rayas y las máquinas, a una distancia en que no se reconoce a nadie.",
  },
  {
    id: "c11-social-kitchen",
    bloque: 3,
    tipo: "video",
    src: v("rc11"),
    // RC11 (Img 9513, 2-sep, 6,9 s = 207 f): la Social Kitchen / coworking: las lámparas verdes y amarillas, el mural de plantas, las mesas. Del 0,4 al 4,0 s (108 f): después aparece un hombre con gorra y portátil en el banco bajo el mural (el original llega a
    // los 6,8 s; aquí no), y se completa con RC12.
    desde: fr(12),
    en: P.cocina,
    dur: P.cocina2 - P.cocina,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.4, shadows: 0.5, highlights: -0.1, contrast: 1.0 }),
    reason:
      "La Social Kitchen (la unidad: reunirse y trabajar): «todo esto en Las Palmas»; las lámparas verdes y el mural. La cámara gira a la derecha, como en los planos anteriores.",
  },
  {
    id: "c12-social-kitchen-2",
    bloque: 3,
    tipo: "video",
    src: v("rc12"),
    // RC12 (Img 9514, 2-sep, 7,4 s = 222 f): la Social Kitchen desde el otro lado: la silla de madera en primer plano, la barra, el mural y el ventanal. Del 0,6 al 3,6 s (90 f). Al fondo, un hombre con camiseta amarilla de ≈ 20 px: no se reconoce.
    desde: 0.6,
    en: P.cocina2,
    dur: P.cta - P.cocina2,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.35, highlights: -0.3, shadows: 0.35 }),
    reason: "La Social Kitchen (la unidad): el otro lado del espacio, con la silla en primer plano, para acabar la lista de amenidades «uno de los sectores más privilegiados de Medellín».",
  },
  // ── Bloque 6 · el CTA: Isabella, muda, con la locución encima ──
  {
    id: "c13-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct04"),
    // CT04 (Img 9492, 2-sep, 9,1 s = 273 f): Isabella camina hacia cámara en la sala con la palma, las puertas correderas y la montaña detrás, con la chaqueta de flores; en el cuadro mide de 1/4 de alto a casi todo. Del 3,0 al 7,53 s (136 f): de lejos
    // a cerca, sonriendo (en 5,4-5,9 s mueve los labios: dice «piensa en esto»; no se oye, el clip entra MUDO y la locución habla encima). SUSTITUYE al último plano del original (ver la cabecera, punto 4). La imagen acaba 0,05 s tras la última palabra
    // de la locución: los últimos 6 f funden a negro (`FundidoACierre`).
    desde: 3.0,
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.06, exposure: 0.1, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "La sala con la palma (la invitación): Isabella camina hacia cámara y sonríe mientras la locución dice «escríbeme, agenda tu visita y descubre lo que es vivir con tu propio jacuzzi privado»: una sola acción. Tras su última palabra funde a negro.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-051.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c14-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-051/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c13
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c14). */
export const DURACION_051 = P.cta + DUR_CTA + DUR_TARJETA;

/** Dónde acaba la música: se apaga bajo la tarjeta y llega a cero 2 f antes del final de la pieza. */
export const FIN_MUSICA_051 = DURACION_051 - 2;
