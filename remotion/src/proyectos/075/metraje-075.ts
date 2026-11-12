/**
 * EL RECORRIDO 075 — «Suite Go Living (El Poblado)», V56 del registro: el sexto reel de esta suite hotelera en venta (reparto 070-075, `proyectos/070/reparto-070-075.md`) — los planos, como DATOS.
 *
 * Ángulo: «TOTALMENTE EQUIPADA, A PUERTA CERRADA». La entrada del edificio vista desde el suelo (sin texto ni voz) → el hook lo plantea como pregunta («¿y si tu próxima propiedad también pudiera generar ingresos?») →
 * el paseo enseña lo que trae la suite (la tele con su mueble, la cama, el escritorio) → la mitad lo dice («una suite hotelera, totalmente equipada en El Poblado») → la cocineta, el baño y la vista de la ciudad desde
 * el ventanal → el CTA («agendemos una visita y descubre Go Living Suites»). Estructura del canal: EXTERIOR · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA, con TRES frases de Isabella.
 *
 * NINGUNA PIEZA DICE QUÉ EXIGE EL POT NI QUE LA SUITE LO CUMPLA, NI PROMETE VALORIZACIÓN, RENTABILIDAD O GANANCIA: el hook (aprobado en el reparto) pregunta si la próxima propiedad «también pudiera generar ingresos»,
 * una pregunta condicional, no una promesa; la mitad y el CTA dicen lo que consta en el anuncio (suite hotelera, equipada, en El Poblado) y piden una visita. La ficha (28,5 m², piso 9, el precio) va al caption.
 *
 *   hook   HK06  `IMG_4960` «¿Y si tu próxima propiedad también pudiera generar ingresos?»                  (exclusiva de esta pieza, reparto)
 *   mitad  MD03  `IMG_4961` «Una suite hotelera, totalmente equipada en El Poblado.»                           (exclusiva de esta pieza, reparto)
 *   CTA    CT08  `IMG_4976` «Agendemos una visita y descubre Go Living Suites.»                                (exclusiva de esta pieza, reparto)
 *   exterior DR10 `IMG_5058` la entrada del edificio y la torre desde abajo; es el iPhone desde el suelo, NO un dron.
 *
 * LO QUE ES DE ESTA PIEZA (`proyectos/075/combinaciones.md`): los recorridos RC08 · RC06 · RC09 (lo que trae la habitación) y RC02 · RC01 (la cocineta y el baño) son un hilo propio; la VISTA (RC07) la REPITE de la 070
 * (3,6 s de su tramo 2,5-6,07 s, declarado: es el único clip de la suite con un plano de ciudad de 5 s). Esta suite es UN SOLO cuarto.
 *
 *   bloque 1  c01                  la entrada del edificio: DR10, la calle, el jardín vertical y el voladizo desde abajo, a velocidad constante desde el f0; SIN TEXTO NI VOZ
 *   bloque 2  c02                  Isabella, de pie ante el ventanal con la cama al pie: el hook (entra A CORTE en un golpe; su primera palabra suena a los 12,6 f)
 *   bloque 3  c03 c04 c05          lo que trae la suite: la tele y el mueble de madera (RC08) → la cama y el sofá con cabecero (RC06) → de la cama al escritorio (RC09)
 *   bloque 4  c06                  Isabella camina frente a la cama, del lado del cabecero gris: la mitad (A CORTE en el golpe; el clip ENTERO, desde su primer fotograma)
 *   bloque 5  c07 c08 c09          la cocineta (RC02) → el baño con su ducha de vidrio (RC01) → LA VISTA: del ventanal con la repisa a la ciudad y las montañas (RC07, el plano más largo del bloque)
 *   bloque 6  c10 c11              Isabella sentada en el sofá: el CTA (a corte); y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO. La canción es «Street Level Sessions on the Green» (lo-fi / chillhop; sin pulso fiable): la rejilla son los golpes MEDIDOS (`musica/golpes-cancion-entera.json`; `buscar-cortes-lp.py`, estructura
 * de 9 planos y 10 cortes) y cada cambio de plano cae en uno (TODOS A CORTE, ≥ 13,4 dB). Las tres tomas de Isabella entran a corte porque ninguna deja 12 f de aire antes de su primera palabra más los 12 f de
 * una disolvencia (HK06 habla a los 0,62 s, MD03 a los 0,75 s y CT08 a los 0,75 s) y el plano que sigue a la mitad entra también a corte: MD03 solo deja 0,33 s tras su última palabra y una disolvencia
 * la tapa. La canción CAE desde los 205,0 s (f1127), bajo la tarjeta del cierre.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(12)` = 12/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f116, 3,9 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma. Con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida con
 * ffmpeg (`recorrido-luxur/montaje.md` §12). El material es iPhone HLG tone-mapeado con VideoToolbox (R21).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-075.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-075";

export const FPS_075 = 30;

export type Entrada = "corte" | "disolver";
export type Bloque = 1 | 2 | 3 | 4 | 5 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. `s0`/`s1`, medidos por energía (perfil de 20 ms en la banda de voz) y por arranques de sílaba; `lufs`, con ebur128 sobre el WAV TRATADO que suena. */
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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −24,5 · −25,6 · −24,4 LUFS en su ventana de voz (habla a unos metros
 * de un iPhone); cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS)
 * hasta −15,0 LUFS con el pico real a −2,5 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Street Level Sessions on the Green» (Daniel Armand) — `archivos/musica/Daniel Armand — Street Level Sessions on the Green.mp3` (sha 8 `e428a369`), lo-fi / chillhop, 3:53. Se entra en su golpe de 167,542 s
 * (14,6 dB) y de ahí suena en una meseta de −9,9 a −11,5 LUFS (picos de +0,2 a +0,8 dBFS: se BAJA unos 5 dB) hasta que CAE, desde los 205,0 s (−11 → −20 → silencio). Los golpes de abajo son los MEDIDOS (banda
 * 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir»): `proyectos/075/musica/golpes-cancion-entera.json` (`medir-pista.py --json`). La rejilla la dio `buscar-cortes-lp.py` con estos planos.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 167.542, db: 14.6 },
  /** El hook entra A CORTE en este golpe: suena entero y la música baja con curva después. */
  hook: { t: 170.891, db: 15.2 },
  /** Cortes secos del paseo. */
  paseo1: { t: 175.147, db: 13.5 },
  paseo2: { t: 177.795, db: 13.9 },
  paseo3: { t: 180.815, db: 14.6 },
  /** La mitad entra A CORTE en este golpe (25,3 dB): suena entero y la música baja después. */
  mitad: { t: 184.077, db: 25.3 },
  /** El primer plano del bloque 5 entra A CORTE (la mitad no deja sitio para una disolvencia). */
  alcoba: { t: 188.41, db: 16.0 },
  alcoba2: { t: 190.967, db: 13.9 },
  vista: { t: 194.532, db: 18.4 },
  /** El CTA entra A CORTE en este golpe; la canción cae sola 5,4 s después. */
  cta: { t: 199.63, db: 13.4 },
} as const;

/** Dónde cae la canción (s): −10,8 → −20,1 → silencio (9 y 109 dB en 5 y 10 s). */
export const DECAE = { t: 205.0, lufsAntes: -10.8, lufs5s: -20.1, lufs10s: -70 } as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (167,542 s) cae en el frame 3 de la pieza; redondeado a un frame (5025/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 5025 / FPS_075;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_075;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_075;

/** Isabella: un empuje lento hacia ella. Los recorridos y el exterior, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-075/${id}.mp4`;
const a = (id: string): string => `recorrido-075/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE del canal: contraste con cuerpo, negros hundidos, luces recogidas (los cielos son lo primero que se quema), un punto cálido y +10 % de saturación. Orden del efecto: exposición → balance de blancos →
 * sombras/luces/blancos/negros → contraste → saturación → vibrance. `vibrance` ≤ 0,05 (sobre hormigón gris pinta un moteado de colores y vuelve rosadas las nubes) y las tomas de Isabella, `saturation` ≤ 1,06:
 * la piel se queda donde estaba. El AJUSTE de cada plano se mide, no se hereda.
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

/** El color de un plano: la base más el ajuste de su toma. */
const color = (ajuste: ColorCine = {}): ColorCine => ({ ...COLOR_BASE, ...ajuste });

/**
 * Los frames de cada cambio de plano: todos salen de `golpe(...)`, así que mover la entrada de la música es cambiar `INICIO_MUSICA`. TODOS entran A CORTE (el golpe suena entero en el `en` de cada plano).
 */
const P = {
  hook: golpe(GOLPE.hook), //      103 · Isabella (a corte); su primera palabra suena 12,6 f después
  paseo: golpe(GOLPE.paseo1), //   231 · acaba el hook; la tele y el mueble (a corte)
  cama: golpe(GOLPE.paseo2), //    310 · la cama y el sofá (a corte)
  escritorio: golpe(GOLPE.paseo3), // 401 · de la cama al escritorio (a corte)
  mitad: golpe(GOLPE.mitad), //    499 · Isabella con la mitad (a corte)
  cocineta: golpe(GOLPE.alcoba), // 629 · la cocineta (a corte)
  bano: golpe(GOLPE.alcoba2), //   706 · el baño (a corte)
  vista: golpe(GOLPE.vista), //    813 · la vista de la ciudad (a corte)
  cta: golpe(GOLPE.cta), //        966 · Isabella con el CTA (a corte)
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 4,37 s (131 f) y desde `desde` (10 f) hasta el f124 del clip hay 114. Su voz va de 0,75 a 3,60 s (f978,5 a f1064 de la comp): 16 f (0,53 s) de su cara tras la última
 * palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela: el plano acaba antes del final del clip, que sigue 7 f más.
 */
const DUR_CTA = 114;

/**
 * Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero aquí, 2 f antes del final de la pieza (la tarjeta va en silencio; la canción ya cae sola desde los 205 s).
 */
export const FIN_MUSICA_075 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje075: readonly Corte[] = [
  // ── Bloque 1 · la entrada del edificio ──
  {
    id: "c01-entrada",
    bloque: 1,
    tipo: "video",
    src: v("dr10"),
    // DR10 (iPhone desde el suelo, 4K HLG → BT.709), del 0,30 al 3,73 s: la calle con el paso de cebra, el jardín vertical sobre la puerta y el voladizo de la torre, con una palma al fondo; la cámara sube
    // despacio hacia la torre. Entra a corte con el golpe de 14,6 dB del f3.
    desde: 0.3,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "La entrada del edificio vista desde el suelo (la promesa): la calle, el jardín vertical y el voladizo de la torre. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook pregunta por la próxima propiedad.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk06"),
    audio: a("hk06-voz"),
    voz: {
      s0: 0.62,
      s1: 3.56,
      lufs: -15,
      dice: "¿Y si tu próxima propiedad también pudiera generar ingresos?",
    },
    // La voz empieza a los 0,62 s (18,6 f) y acaba a los 3,56 s (106,8 f); el clip dura 4,78 s (143 f). Solo hay 18,6 f de aire: no caben los 12 de una disolvencia más 12 de espera, así que entra A CORTE en el golpe del f103
    // (`desde` 6 f: la primera palabra suena a los 12,6 f, que suena entero; la música baja con curva en 10 f). El plano dura 128 f (hasta el golpe del f231): 27 f tras la última palabra, en los que la música sube.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-075.ts`): la «Y» inicial (whisper 0,37).
    // Isabella, de pie ante el ventanal con la ciudad detrás y la cama al pie, de frente a cámara.
    desde: fr(6),
    en: P.hook,
    dur: P.paseo - P.hook,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "La suite con el ventanal y la ciudad detrás (la pregunta): Isabella, de pie ante la ventana, dice «¿y si tu próxima propiedad también pudiera generar ingresos?». Entra a corte en el golpe desde el exterior; la música baja tras él.",
  },
  // ── Bloque 3 · lo que trae la suite: la tele, la cama y el escritorio ──
  {
    id: "c03-tele",
    bloque: 3,
    tipo: "video",
    src: v("rc08"),
    // RC08 (iPhone, 4K HLG), del 2,20 al 4,83 s: la tele sobre su mueble de madera con la escultura, la repisa con adornos, la cortina gris y la planta; la cámara se desplaza hacia el ventanal. Sin personas. Entra A CORTE
    // en el golpe de 13,5 dB que abre el paseo (f231).
    desde: 2.2,
    en: P.paseo,
    dur: P.cama - P.paseo,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "La tele y el mueble de madera (lo que trae la suite): la pantalla, la escultura, la repisa, la cortina y la planta; una habitación amoblada, lista para recibir a un huésped. El golpe del paseo abre el descubrimiento.",
  },
  {
    id: "c04-cama",
    bloque: 3,
    tipo: "video",
    src: v("rc06"),
    // RC06 (iPhone, 4K HLG), del 4,40 al 7,43 s: del pie de la cama, con el sofá, el aire acondicionado y la puerta del fondo, avanzando por la cama hasta el cabecero gris con sus cuadros. La 070 usa 1,2-4,17 s de este clip.
    desde: 4.4,
    en: P.cama,
    dur: P.escritorio - P.cama,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.12 }),
    reason:
      "La cama (lo que trae la suite, al detalle): del pie de la cama al cabecero gris con sus cuadros y sus lámparas colgantes; la cama king hecha, el sofá y el aire acondicionado al fondo.",
  },
  {
    id: "c05-escritorio",
    bloque: 3,
    tipo: "video",
    src: v("rc09"),
    // RC09 (iPhone, 4K HLG), del 1,80 al 5,07 s: de la cama hacia el escritorio con su silla azul, la pizarra de vidrio, la tele y el armario de madera con espejo; el pasillo de entrada al fondo. Sin personas.
    desde: 1.8,
    en: P.escritorio,
    dur: P.mitad - P.escritorio,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1 }),
    reason:
      "El escritorio (lo que trae la suite, para quien viaja a trabajar): de la cama a la mesa con su silla, la pizarra y la tele; todo a mano en un solo cuarto.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md03"),
    audio: a("md03-voz"),
    voz: {
      s0: 0.75,
      s1: 4.02,
      lufs: -15,
      dice: "Una suite hotelera, totalmente equipada en El Poblado.",
    },
    // La voz empieza a los 0,75 s (22,5 f) y acaba a los 4,02 s (120,6 f; el «-ado» final decae hasta los 4,08 s, a −35 dB y por debajo: `limites-voz.py` da 4,00 s); el clip dura 4,41 s (132 f) y se usa ENTERO (`desde` 0):
    // no hay 12 f antes de él para una disolvencia y el plano siguiente entra también A CORTE (una disolvencia taparía el final de la frase). Entra A CORTE en el golpe de 25,3 dB del f499, que suena entero; la música baja con
    // curva en 10 f y la primera palabra suena a los 22,5 f. El plano dura 130 f (hasta el golpe del f629): 9,4 f tras la última palabra, en los que la música sube con curva.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-075.ts`): «hotelera» (whisper 0,13) y «Poblado» (0,20).
    // Isabella camina frente a la cama, del lado del cabecero gris (los cuadros y la lámpara colgante detrás).
    desde: 0,
    en: P.mitad,
    dur: P.cocineta - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "Frente a la cama (lo que se compra, dicho): Isabella camina con el cabecero gris y los cuadros detrás y dice «una suite hotelera, totalmente equipada en El Poblado». Entra a corte desde el escritorio.",
  },
  // ── Bloque 5 · la cocineta, el baño y la vista ──
  {
    id: "c07-cocineta",
    bloque: 5,
    tipo: "video",
    src: v("rc02"),
    // RC02 (iPhone, 4K HLG), del 2,60 al 5,17 s: la cocineta con el microondas, la nevera pequeña, la cafetera y la estufa de dos puestos; la cámara se acerca y sube. Sin personas. La 070 usa 0,60-3,43 s de este clip
    // (se comparten 0,8 s: declarado en `combinaciones.md`). Entra A CORTE en el golpe del f629 (el plano anterior es Isabella: la mitad no deja sitio a una disolvencia).
    desde: 2.6,
    en: P.cocineta,
    dur: P.bano - P.cocineta,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "La cocineta (lo que trae la suite, para quedarse varios días): el microondas, la nevera, la cafetera y la estufa; completa lo que una estancia corta necesita. Viene tras la mitad, en el orden del pasillo.",
  },
  {
    id: "c08-bano",
    bloque: 5,
    tipo: "video",
    src: v("rc01"),
    // RC01 (iPhone, 4K HLG), del 4,40 al 7,97 s: el baño privado, de la puerta de madera con su manilla a la ducha de vidrio con su repisa de pared. La 070 usa 0,8-4,37 s de este clip (el pasillo y el lavamanos): no se comparte.
    desde: 4.4,
    en: P.bano,
    dur: P.vista - P.bano,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.08 }),
    reason:
      "El baño privado (lo que trae la suite, al detalle): la puerta de madera y la ducha de vidrio con su repisa; cierra el recorrido por lo que hay detrás de la puerta antes de ir a la ventana.",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc07"),
    // RC07 (iPhone, 4K HLG), del 1,10 al 6,20 s: de la cama junto al ventanal con su cortina, la cámara sube hasta la repisa de ladrillo con la ciudad y las montañas de El Poblado al fondo. Entra A CORTE en el golpe de
    // 18,4 dB (f813) y es el plano más largo del bloque 5 (153 f): el clímax. La 070 usa 2,5-6,07 s: se comparten 3,6 s, declarado (es el único clip de la suite con un plano de ciudad de ≥ 5 s). Del clip quedan 2 f más.
    desde: 1.1,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05, highlights: -0.3, whites: -0.15 }),
    reason:
      "La ciudad desde el ventanal (la vista, el clímax): de la cama sube hasta la ventana con El Poblado y las montañas al fondo; lo que se ve desde el piso 9. El plano más largo del bloque.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct08"),
    audio: a("ct08-voz"),
    voz: {
      s0: 0.75,
      s1: 3.6,
      lufs: -15,
      dice: "Agendemos una visita y descubre Go Living Suites.",
    },
    // La voz empieza a los 0,75 s (22,5 f) y acaba a los 3,60 s (108 f); el clip dura 4,37 s (131 f). Entra A CORTE en el golpe del f966 (`desde` 10 f: la primera palabra suena a los 12,5 f del golpe, que suena
    // entero) y la música baja con curva en 10 f. El plano dura 114 f (acaba en el f124 del clip, 7 f antes de su final): 16 f tras la última palabra, en los que la imagen funde a negro (los últimos 6).
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-075.ts`): «Agendemos» (whisper oyó «Ajenlemos», 0,14) y «Go Living Suites» (whisper «Go» 0,37 y «Sweets» 0,24).
    // Isabella sentada en el sofá gris, con el aire acondicionado arriba y la cama blanca a la izquierda.
    desde: fr(10),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "Sofá de la suite (la invitación): Isabella, sentada, dice «agendemos una visita y descubre Go Living Suites»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-075.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-075/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_075 = P.cta + DUR_CTA + DUR_TARJETA;
