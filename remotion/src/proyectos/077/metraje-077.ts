/**
 * EL RECORRIDO 077 — «Suite Go Living (El Poblado)», V58 del registro: el primer reel del segundo lote de esta suite hotelera en venta (tres piezas más, 076-078, con las ZONAS SOCIALES del edificio; el primer lote es
 * 070-075, reparto en `proyectos/070/reparto-070-075.md`) — los planos, como DATOS.
 *
 * Ángulo: «ANTES DE INVERTIR EN AIRBNB, ESTO ES LO QUE DEBES SABER» → «un edificio con operación hotelera establecida». El exterior (sin texto ni voz) → el hook lo dice en la suite («antes de invertir en Airbnb, hay algo
 * que debes saber») → el paseo recorre la suite (la cama, la tele) y SALE al gimnasio del edificio → la mitad contesta («descubre una suite en un edificio con operación hotelera establecida») → el resto de las zonas
 * sociales (las pesas, la tienda del edificio) y la fachada entera como clímax → el CTA, de pie en la suite («si quieres más información, contáctame»). Estructura del canal: EXTERIOR · HOOK · RECORRIDO · MITAD ·
 * RECORRIDO · CTA, con TRES frases de Isabella.
 *
 * NINGUNA PIEZA DICE QUÉ EXIGE EL POT NI QUE ESTA SUITE LO CUMPLA, ni promete valorización ni rentabilidad: el hook es una pregunta de curiosidad y la mitad enuncia un hecho del anuncio (operación hotelera
 * activa, edificio con más de cinco años operando).
 *
 *   hook   HK03  `IMG_4949` «Antes de invertir en Airbnb, hay algo que debes saber.»                                         (exclusiva de esta pieza dentro de la suite)
 *   mitad  HK05  `IMG_4956` «Descubre una suite en un edificio con operación hotelera establecida.»                          (un HOOK usado como MITAD: ninguna MD libre encaja; exclusiva de esta pieza)
 *   CTA    CT04  `IMG_4952` «Si quieres más información, contáctame.»                                                       (exclusiva de esta pieza dentro de la suite)
 *   exterior DR04 `IMG_5019` las hojas blancas y la fachada al sol; es el iPhone desde el suelo, NO un dron.
 *
 * LAS ZONAS SOCIALES (lo que pidió el usuario para este lote; carpeta `6 Zonas Sociales`): el gimnasio (ZS01 «las máquinas», ZS02 «las pesas») y el interior de la tienda del edificio (ZS05, el tramo SIN el toldo
 * de la marca WEGO: del 4,1 s en adelante solo se ven los estantes y el mostrador). Ni un segundo de la 074 (ZS01 0,30-3,43 · ZS02 2,00-5,40 · ZS03 0,30-3,20): aquí ZS01 desde 3,43 y ZS02 desde 5,40.
 *
 * LO QUE ES DE ESTA PIEZA Y LO QUE COMPARTE: ni un segundo con las piezas 070-075 (la puerta, 7b, lo comprueba): RC11 0,45-2,52 (la 073 usó 3,0-6,8), RC08 0-2,03 (la 071 usó 2,1-5,03 y la 075, 2,2-4,83), DR05 3,3-6,83
 * (la 072 usó 0,6-3,27), DR04 entero libre. Las otras dos piezas del lote (076, 078) comparten el checkout y lo declaran en su `combinaciones.md`.
 *
 *   bloque 1  c01                  el edificio: DR04 (hojas blancas y la fachada con el sol de frente), sin texto ni voz
 *   bloque 2  c02                  Isabella en la zona del sofá: el hook (entra A CORTE en el golpe; su primera palabra suena 16,8 f después)
 *   bloque 3  c03 c04 c05          la cama que sube a la tele (RC11) → el mueble de TV con la escultura y la ciudad (RC08) → SALE AL GIMNASIO: las máquinas bajo los ventanales (ZS01)
 *   bloque 4  c06                  Isabella con la mitad (entra A CORTE en el golpe; el clip entero, desde su primer fotograma)
 *   bloque 5  c07 c08 c09          las pesas y el banco rojo (ZS02) → el interior de la tienda del edificio (ZS05) → LA FACHADA ENTERA al cielo de nubes, de arriba abajo hasta las plantas (DR05, el plano más largo del bloque)
 *   bloque 6  c10 c11              Isabella de pie frente al mueble de TV: el CTA (a corte); y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO. La canción es «Light Fills the Room» (downtempo / chill, ~88 BPM, 3:34; dinámica plana de −11 a −14 LUFS, SIN caída propia hasta el fundido de los últimos 5 s): la rejilla son los golpes
 * MEDIDOS (`musica/golpes-cancion-entera.json`; `buscar-cortes-lp.py` con `TIPOS=dccccccccc` y los rangos de cada plano, ver `medidas/rejilla-light-fills.txt`) y cada cambio de plano cae en uno (≥ 14,4 dB los cortes
 * secos de la rejilla y 12,4 dB el del CTA). Como la canción no cae, bajo la tarjeta se APAGA con curva (la envolvente de `audio-077.ts`) desde la última palabra del CTA.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(12)` = 12/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS. TODAS las entradas
 * son cortes secos: ninguna de las tres tomas de Isabella deja 12 f de aire antes de su primera palabra más los 12 f de una disolvencia sin comerse el golpe (HK03 habla a los 0,76 s pero el clip solo da 130 f; HK05 a
 * los 0,39 s; CT04 a los 0,31 s).
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f107, 3,6 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido sobre stills. Con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1
 * reducida con ffmpeg (`recorrido-luxur/montaje.md` §12). El material es iPhone HLG tone-mapeado con VideoToolbox (R21).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-077.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-077";

export const FPS_077 = 30;

export type Entrada = "corte" | "disolver";
export type Bloque = 1 | 2 | 3 | 4 | 5 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. `s0`/`s1`, medidos por energía (perfil de 40 ms en la banda de voz) y por arranques de sílaba; `lufs`, con ebur128 sobre el WAV TRATADO que suena. */
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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −23,4 · −26,4 · −24,6 LUFS en su ventana de voz (habla a varios metros
 * de un iPhone); cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS)
 * hasta −15,0 LUFS con el pico real a −2,5 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Light Fills the Room» — `archivos/musica/Light Fills the Room.mp3` (sha 8 `b3c8b7c6`), 3:34. Se entra en su golpe de 178,118 s (18,9 dB) y de ahí suena en una meseta de −11 a −14 LUFS; no cae sola: el último
 * fundido de la pista empieza hacia los 209 s y acaba a los 214 s, después de que la pieza apague la música bajo la tarjeta. Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el
 * instante es el de «empieza a subir»): `proyectos/077/musica/golpes-cancion-entera.json` (`medir-pista.py --json`). La rejilla la dio `buscar-cortes-lp.py` con estos planos: ver `medidas/rejilla-light-fills.txt`.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 178.118, db: 18.9 },
  /** Isabella entra A CORTE en este golpe: suena entero y la música baja con curva después. */
  hook: { t: 181.017, db: 22.9 },
  /** Cortes secos del paseo. */
  paseo1: { t: 185.137, db: 16.6 },
  paseo2: { t: 187.196, db: 17.3 },
  paseo3: { t: 189.248, db: 14.4 },
  /** La mitad entra A CORTE en este golpe: suena entero y la música baja después. */
  mitad: { t: 191.989, db: 18.0 },
  /** El primer plano del bloque 5 entra a corte en este golpe. */
  alcoba: { t: 196.446, db: 17.6 },
  alcoba2: { t: 198.846, db: 20.7 },
  /** La fachada entera, el clímax del bloque 5. */
  vista: { t: 200.906, db: 19.8 },
  /** El CTA entra A CORTE en este golpe; la canción se apaga con curva bajo la tarjeta tras su última palabra. */
  cta: { t: 204.462, db: 12.4 },
} as const;

/** La canción no tiene caída propia dentro de la pieza (su fundido final empieza hacia los 209 s): se apaga con curva bajo la tarjeta, ver `audio-077.ts`. */
export const DECAE = { t: 209, lufsAntes: -14.4, lufs5s: -20.2, lufs10s: -99 } as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (178,118 s) cae en el frame 3 de la pieza; redondeado a un frame (5342/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 5342 / FPS_077;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_077;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_077;

/** Isabella: un empuje lento hacia ella (camina o se acerca a cámara: el empuje la acompaña). Los recorridos y el exterior, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-077/${id}.mp4`;
const a = (id: string): string => `recorrido-077/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE del canal: contraste con cuerpo, negros hundidos, luces recogidas (los cielos son lo primero que se quema), un punto cálido y +10 % de saturación. Orden del efecto: exposición → balance de blancos →
 * sombras/luces/blancos/negros → contraste → saturación → vibrance. `vibrance` ≤ 0,05 (sobre hormigón gris pinta un moteado de colores y vuelve rosadas las nubes) y las tomas de Isabella, `saturation` ≤ 1,06:
 * la piel se queda donde estaba. El AJUSTE de cada plano se mide (stills y `luma.py`), no se hereda.
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

/** El color de un plano: la base más el ajuste de su toma (medido). */
const color = (ajuste: ColorCine = {}): ColorCine => ({ ...COLOR_BASE, ...ajuste });

/**
 * Los frames de cada cambio de plano: todos salen de `golpe(...)`, así que mover la entrada de la música es cambiar `INICIO_MUSICA`. TODO entra a corte: cada plano empieza en el golpe en que suena su `en`.
 */
const P = {
  hook: golpe(GOLPE.hook), //        90 · Isabella entra a corte; su primera palabra suena 16,8 f después
  paseo: golpe(GOLPE.paseo1), //    214 · acaba el hook; el golpe abre el paseo (a corte)
  tele: golpe(GOLPE.paseo2), //     276 · el mueble de TV (a corte)
  gimnasio: golpe(GOLPE.paseo3), // 337 · el gimnasio (a corte)
  mitad: golpe(GOLPE.mitad), //     419 · Isabella con la mitad (a corte)
  pesas: golpe(GOLPE.alcoba), //    553 · las pesas y el banco (a corte)
  tienda: golpe(GOLPE.alcoba2), //  625 · el interior de la tienda del edificio (a corte)
  fachada: golpe(GOLPE.vista), //   687 · la fachada entera (a corte)
  cta: golpe(GOLPE.cta), //         793 · Isabella con el CTA (a corte)
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 2,77 s (83 f) y se usa ENTERO desde su primer fotograma (`desde` 0): su voz va de 0,31 a 2,14 s (f802 a f857 de la comp), 26 f de su cara tras la última palabra,
 * en los que la imagen funde a negro (los últimos 6). Nada se congela: el plano acaba en el último fotograma del clip, no más allá.
 */
const DUR_CTA = 83;

/**
 * Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero aquí, 2 f antes del final de la pieza (la tarjeta va en silencio; la canción aún suena en esa ventana: su
 * fundido final empieza hacia los 209 s y la tarjeta acaba a los 209,2 s de la pista).
 */
export const FIN_MUSICA_077 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje077: readonly Corte[] = [
  // ── Bloque 1 · el edificio ──
  {
    id: "c01-edificio",
    bloque: 1,
    tipo: "video",
    src: v("dr04"),
    // DR04 (iPhone desde el suelo, 4K HLG → BT.709), del 2,20 al 5,20 s: las hojas blancas y verdes de un árbol delante de los voladizos de la fachada, que se levanta hasta el sol de frente con su destello. Entra a corte
    // con el golpe de 18,9 dB del f3. Sin texto ni voz: es el frame 0 y la miniatura.
    desde: 2.2,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El edificio visto desde el suelo (la promesa): un árbol delante de los voladizos y el sol de frente sobre la fachada. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de lo que hay que saber.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk03"),
    audio: a("hk03-voz"),
    voz: {
      s0: 0.75,
      s1: 3.88,
      lufs: -15,
      dice: "Antes de invertir en Airbnb, hay algo que debes saber.",
    },
    // La voz empieza a los 0,75 s y acaba a los 3,88 s; el clip dura 4,33 s (130 f). `desde` 6 f (0,2 s): el plano dura 124 f (hasta el golpe del f214 y el clip llega a su último fotograma, f130), la primera palabra
    // suena a los 16,5 f del golpe (la música baja con curva en 10 f antes) y la última, a los 110,4 f: 13,6 f de aire hasta el golpe siguiente, en los que la música sube. Entra A CORTE: el clip no deja 12 f
    // de aire antes de `desde` para una disolvencia sin comerse el golpe.
    // Isabella de pie en la zona del sofá, plano medio, con el aire acondicionado detrás.
    desde: fr(6),
    en: P.hook,
    dur: P.paseo - P.hook,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "La suite, la zona del sofá (la curiosidad): Isabella, en plano medio, dice «antes de invertir en Airbnb, hay algo que debes saber». Entra a corte en el golpe desde el exterior; la música baja con curva antes de su primera palabra.",
  },
  // ── Bloque 3 · la suite y la salida al gimnasio ──
  {
    id: "c03-cama",
    bloque: 3,
    tipo: "video",
    src: v("rc11"),
    // RC11 (iPhone, 4K HLG), del 0,45 al 2,52 s: desde la cama (la colcha y la almohada) sube hacia el mueble de TV, la escultura y la planta. Sin personas. Entra A CORTE en el golpe de 16,6 dB que abre el paseo (f214).
    desde: 0.45,
    en: P.paseo,
    dur: P.tele - P.paseo,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "La cama que sube a la tele (la suite, de dentro hacia fuera): abre el paseo por lo que se compra, el cuarto amueblado, antes de salir al edificio.",
  },
  {
    id: "c04-tele",
    bloque: 3,
    tipo: "video",
    src: v("rc08"),
    // RC08 (iPhone, 4K HLG), del 0 al 2,03 s: el mueble de TV con la escultura de madera, la planta y la ciudad reflejada en la pantalla; la cámara avanza por el escritorio. Sin personas.
    desde: 0,
    en: P.tele,
    dur: P.gimnasio - P.tele,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El mueble de TV con la ciudad reflejada (el detalle): la escultura de madera y la planta; el último vistazo a la suite antes de que el paseo salga a las zonas sociales.",
  },
  {
    id: "c05-gimnasio",
    bloque: 3,
    tipo: "video",
    src: v("zs01"),
    // ZS01 (iPhone, 4K HLG), del 3,43 al 6,16 s: el gimnasio visto de frente, con las elípticas, las trotadoras y sus ventanales al fondo; la cámara avanza y gira a la izquierda. Sin personas. (La 074 usó el 0,30-3,43 de este clip.)
    desde: 3.43,
    en: P.gimnasio,
    dur: P.mitad - P.gimnasio,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.1 }), // el gimnasio es el plano más oscuro (luma 84 en el still): +0,10 pasos
    reason:
      "El gimnasio del edificio (la zona social): las máquinas bajo los ventanales; el paseo sale de la suite a lo que ofrece el edificio, justo antes de que Isabella lo diga.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("hk05"),
    audio: a("hk05-voz"),
    voz: {
      s0: 0.39,
      s1: 4.1,
      lufs: -15,
      dice: "Descubre una suite en un edificio con operación hotelera establecida.",
    },
    // La voz empieza a los 0,39 s (11,7 f) y acaba a los 4,10 s (123 f); el clip dura 4,57 s (137 f) y se usa desde su primer fotograma (`desde` 0): no hay 12 f antes de él para una disolvencia, así que entra A CORTE en el
    // golpe del f419, que suena entero; la música baja con curva en 10 f y la primera palabra suena a los 11,7 f. El plano dura 134 f (hasta el golpe del f553): 11 f tras la última palabra, en los que la música sube.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-077.ts`): «Descubre una suite» (whisper oyó «Descubro en EZID», 0,31-0,58) y «hotelera» (0,51).
    // Isabella viene del fondo de la suite, con el escritorio a la derecha y la cama a la izquierda.
    desde: 0,
    en: P.mitad,
    dur: P.pesas - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "La suite, de vuelta con ella (la respuesta): Isabella viene hacia cámara y dice «descubre una suite en un edificio con operación hotelera establecida». Entra a corte desde el gimnasio.",
  },
  // ── Bloque 5 · las zonas sociales y la fachada ──
  {
    id: "c07-pesas",
    bloque: 5,
    tipo: "video",
    src: v("zs02"),
    // ZS02 (iPhone, 4K HLG), del 5,40 al 7,80 s: el banco rojo, el rack de mancuernas y las bicicletas del fondo, bajo las vigas del techo; la cámara avanza hacia las bicicletas. Sin personas. (La 074 usó el 2,00-5,40.)
    // Entra A CORTE en el golpe del f553.
    desde: 5.4,
    en: P.pesas,
    dur: P.tienda - P.pesas,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.06 }), // luma 92 en el still: +0,06 pasos
    reason:
      "Las pesas y el banco rojo (lo que se usa): el rack de mancuernas y las bicicletas al fondo; la respuesta de la mitad, hecha imagen: un edificio con servicios, no solo con habitaciones.",
  },
  {
    id: "c08-tienda",
    bloque: 5,
    tipo: "video",
    src: v("zs05"),
    // ZS05 (iPhone, 4K HLG), del 4,10 al 6,17 s: DENTRO de la tienda del edificio: el pasillo con los estantes, el mostrador de madera con su luz y la pared verde. Se usa solo desde el 4,10 s, cuando el toldo con la marca
    // WEGO (del 0 al 3 s) ya quedó fuera de cuadro: ningún letrero de terceros a la vista. Sin personas.
    desde: 4.1,
    en: P.tienda,
    dur: P.fachada - P.tienda,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El interior de la tienda del edificio (la comodidad): estantes y mostrador a pie de lobby; completa las zonas sociales con algo que no es un gimnasio, antes de mirar el edificio entero.",
  },
  {
    id: "c09-fachada",
    bloque: 5,
    tipo: "video",
    src: v("dr05"),
    // DR05 (iPhone desde el suelo, 4K HLG), del 3,30 al 6,83 s: los voladizos curvos de la fachada con el cielo de nubes, que bajan hasta las plantas y los ventanales de la planta baja. Entra A CORTE en el golpe de 19,8 dB
    // (f687) y es el plano más largo del bloque 5 (106 f): el clímax. (La 072 usó el 0,60-3,27 de este clip, el tramo que sube.)
    desde: 3.3,
    en: P.fachada,
    dur: P.cta - P.fachada,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05, highlights: -0.3, whites: -0.15 }),
    reason:
      "La fachada entera (el edificio, el clímax): los voladizos con el cielo de nubes bajando hasta el jardín; «un edificio con operación hotelera establecida» es esto. El plano más largo del bloque.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct04"),
    audio: a("ct04-voz"),
    voz: {
      s0: 0.31,
      s1: 2.14,
      lufs: -15,
      dice: "Si quieres más información, contáctame.",
    },
    // La voz empieza a los 0,31 s (9,3 f) y acaba a los 2,14 s (64,2 f); el clip dura 2,77 s (83 f) y se usa ENTERO (`desde` 0, hasta su último fotograma): entra A CORTE en el golpe del f793 (12,4 dB, suena entero), la
    // música baja con curva en 8 f y la primera palabra suena a los 9,3 f. 18,8 f de su cara tras la última palabra, en los que la imagen funde a negro (los últimos 6). Hay un chasquido de 0,20-0,27 s a −38 dB que
    // queda fuera de la voz tratada.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-077.ts`): «contáctame» (whisper oyó «contacta a mí», 0,42-0,50).
    // Isabella de pie frente al mueble de TV y la planta, se acerca a cámara.
    desde: 0,
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "El mueble de TV, la planta (la invitación): Isabella se acerca a cámara y dice «si quieres más información, contáctame»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-077.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-077/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_077 = P.cta + DUR_CTA + DUR_TARJETA;
