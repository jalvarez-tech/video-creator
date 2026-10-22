/**
 * EL RECORRIDO 061 — «Apartaestudio Quadrato (Laureles, Medellín)», V43 del registro, segundo reel de este apartaestudio (reparto 054-062, `proyectos/054/reparto-054-062.md`) — los planos, como DATOS.
 *
 * Ángulo: «POCOS PERMITEN RENTAS CORTAS»: la escasez del permiso, lo que hace rara a esta unidad (24 m², venta como INVERSIÓN, la única de las tres propiedades que no se vende como vivienda). La pérgola de la
 * terraza abre la pieza (sin texto ni voz) → el hook lo dice («te presento este estudio en Laureles, habilitado para rentas cortas en Medellín») → el paseo enseña lo que el huésped encuentra al entrar (la cocina
 * completa, el estudio que se abre, la cama con la tele) → la mitad lo pone en su sitio («en Medellín hay muchos proyectos inmobiliarios, pero pocos permiten rentas cortas») → el sofá, el coworking del edificio y el
 * jacuzzi con la ciudad → el CTA («haz clic en el botón y agendemos una visita; puede ser virtual o presencial»).
 * Estructura del canal: AÉREA · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA, con TRES frases de Isabella. NO HAY DRON en este rodaje: la apertura aérea del formato se sustituye por el rooftop (reparto 054-062).
 *
 *   hook   HK04  `HOOK4`   «Te presento este estudio en Laureles, habilitado para rentas cortas en Medellín.»   (exclusiva de esta pieza, reparto)
 *   mitad  MD04  `MEDIO5`  «En Medellín hay muchos proyectos inmobiliarios, pero pocos permiten rentas cortas.» (exclusiva de esta pieza, reparto)
 *   CTA    CT01  `CTA1`    «Haz clic en el botón y agendemos una visita. Puede ser virtual o presencial.»      (exclusiva de esta pieza, reparto)
 *
 * LO QUE ES DE ESTA PIEZA Y LO QUE COMPARTE (`proyectos/061/combinaciones.md`). NINGUNA cifra escrita aparte de los subtítulos de lo que ella dice (en estas tres frases no hay ninguna: los 24 m² y el precio van
 * a la versión con ficha y al caption). Los recorridos son un hilo propio, «lo que el huésped encuentra al llegar» (RC01 · RC17 · RC07 · RC10 · ZC05 · ZC18 y la apertura ZC22); no comparte ni un clip con la 060
 * ni con la 062 (coordinado el 2026-10-22 en `side-session-notes/…/06x-tramos-de-recorrido.md`). Va a 30 fps (los MOV son de 30 y 29,97).
 *
 *   bloque 1  c01                  la pérgola: ZC22 3,40-5,83 s, la cámara avanza bajo el techo de la terraza con el deck de madera, los jacuzzis y las montañas al fondo; SIN TEXTO NI VOZ
 *   bloque 2  c02                  Isabella camina por el pasillo del estudio hacia la cámara: el hook (entra a corte en el golpe; su primera palabra suena a los 11 f)
 *   bloque 3  c03 c04 c05          LO QUE ENCUENTRAS: la cocina equipada, de los vasos al cajón de cubiertos (RC01) → el estudio que se abre al fondo del pasillo (RC17) → la cama hecha frente a la tele y la planta (RC07)
 *   bloque 4  c06                  Isabella junto al escritorio y la cama: la mitad
 *   bloque 5  c07 c08 c09          EL SOFÁ y la estantería con la caja fuerte (RC10) → el coworking del edificio (ZC05) → LA VISTA: el jacuzzi con el cielo, la ciudad y las montañas, la cámara rodeándolo
 *                                  bajo el borde de la pérgola (ZC18 7,20 s, el plano más largo del bloque)
 *   bloque 6  c10 c11              Isabella al fondo del estudio, junto a la cama y el ventanal: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO. La canción es «La Isla Bonita (Saxophone 80 Mix)» (pop latino de los 80 en saxofón, 3:54, SIN pulso: 406 golpes de ≥ 6 dB, 240 de ≥ 12 dB): la rejilla son los golpes MEDIDOS
 * (`musica/golpes-cancion-entera.json`; `buscar-cortes-061.py`, estructura de 9 planos + CTA) y cada cambio de plano cae en uno (≥ 13,2 dB). Entra en su golpe de 15,207 s (21,1 dB), tras el respiro de ≈ 0,3 s
 * que hay antes (sección que NO es la de la V7/023: aquella entró en 179,4 s); el catálogo la marca «arranque flojo» (el nivel tarda 4,5 s en llegar) y esa sección es ya la meseta. No cae sola: tras la
 * última palabra del CTA se APAGA con curva bajo la tarjeta.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(12)` = 12/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS. Un plano que entra
 * disolviendo (`disolver`) empieza a verse 12 f ANTES de su `en` (`solapeDe`): su clip tiene que tener esos 12 f antes de `desde`, y el plano anterior dura hasta ese `en`.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f84, 2,8 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la
 * prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-061.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-061";

export const FPS_061 = 30;

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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −26,1 · −28,3 · −26,0 LUFS en su ventana de voz (habla a unos metros
 * de un iPhone); cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS)
 * hasta −15,0 LUFS con el pico real a −2,5 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «La Isla Bonita (Saxophone 80 Mix)» — `archivos/musica/La Isla Bonita (Saxophone 80 Mix).mp3` (sha 8 `71321b4f`), 3:54, sin pulso (el catálogo y la V7 lo midieron así), con su meseta entre 15 y 215 s (−10,2 a −14,4 LUFS
 * por tramos de 5 s) y una caída natural desde 217,6 s. Se entra en su golpe de 15,207 s (21,1 dB). Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a
 * subir»): `proyectos/061/musica/golpes-cancion-entera.json` (`medir-pista.py --json`). La rejilla la dio `buscar-cortes-061.py` con estos planos: ver `musica/rejilla-061.txt`.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 15.207, db: 21.1 },
  /** El hook entra A CORTE aquí: el golpe suena entero y la música baja con curva después; su primera palabra suena a los 11,4 f. */
  hook: { t: 17.551, db: 28.6 },
  /** Cortes secos del paseo. */
  paseo1: { t: 22.674, db: 20.4 },
  paseo2: { t: 25.461, db: 14.2 },
  paseo3: { t: 27.799, db: 24.2 },
  /** La disolvencia a la mitad ACABA aquí. */
  mitad: { t: 30.873, db: 19.2 },
  /** Cortes secos del bloque 5. */
  sofa: { t: 36.722, db: 31.5 },
  coworking: { t: 39.51, db: 15.8 },
  vista: { t: 42.438, db: 13.2 },
  /** El corte seco al CTA: el golpe suena entero y la música baja DESPUÉS; la primera palabra suena a los 11,1 f. */
  cta: { t: 46.092, db: 19.0 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (15,207 s) cae en el frame 3 de la pieza; redondeado a un frame (455/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 455 / FPS_061;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_061;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_061;

/** Isabella: un empuje lento hacia ella (hablan a cámara quietas: el empuje les da vida). Los recorridos, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-061/${id}.mp4`;
const a = (id: string): string => `recorrido-061/${id}.wav`;

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
 * Los frames de cada cambio de plano: todos salen de `golpe(...)`, así que mover la entrada de la música es cambiar `INICIO_MUSICA`. Los que entran disolviendo (la mitad) tienen aquí el `en` de la
 * disolvencia YA TERMINADA: el plano anterior dura hasta él y el siguiente empieza a verse 12 f antes.
 */
const P = {
  hook: golpe(GOLPE.hook), //           73 · Isabella entra a corte; su primera palabra suena 11,4 f después
  cocina: golpe(GOLPE.paseo1), //      227 · acaba el hook; el golpe abre el paseo (a corte)
  estudio: golpe(GOLPE.paseo2), //     310 · el estudio que se abre (a corte)
  cama: golpe(GOLPE.paseo3), //        381 · la cama y la tele (a corte)
  mitad: golpe(GOLPE.mitad), //        473 · Isabella con la mitad (disuelve)
  sofa: golpe(GOLPE.sofa), //          648 · el sofá (a corte)
  coworking: golpe(GOLPE.coworking), // 732 · el coworking (a corte)
  vista: golpe(GOLPE.vista), //        820 · la vista: el jacuzzi (a corte)
  cta: golpe(GOLPE.cta), //            929 · Isabella con el CTA (a corte)
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 5,2 s (156 f) y desde `desde` (6 f) quedan 150; se usan 149 (el plano acaba 1 f antes del final del clip, que no se congela). Su voz va de 0,57 a 4,90 s
 * (f940,1 a f1070 de la comp): 8 f (0,27 s) de su cara tras la última palabra, en los que la imagen funde a negro (los últimos 6).
 */
const DUR_CTA = 149;

/**
 * Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero 2 f antes del final de la pieza (la tarjeta va en silencio): la canción no resuelve sola en esta
 * sección (su caída natural empieza en 217,6 s y aquí estamos en el 46 s). Su archivo decodificado dura 234 s, de sobra (la pieza acaba en el f1138, a los 53,1 s de la canción).
 */
export const FIN_MUSICA_061 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje061: readonly Corte[] = [
  // ── Bloque 1 · la pérgola ──
  {
    id: "c01-pergola",
    bloque: 1,
    tipo: "video",
    src: v("zc22"),
    // ZC22 (`TERRAZA Y JACUZZI (23)`, iPhone, 1080×1920, SDR), del 3,40 al 5,83 s: la cámara avanza bajo el techo de la pérgola del rooftop —la columna oscura a la izquierda, el deck de madera, los dos
    // jacuzzis, las montañas y el cielo con nubes al fondo—. Es la apertura aérea que el rodaje no tiene (sin dron). Solo este tramo del clip: antes (0-3 s) las mesas llevan una tarjeta de promoción «2X1» de un
    // restaurante (marca ajena) que aquí queda lejos y sin leerse. Entra a corte con el golpe de 21,1 dB del f3.
    desde: 3.4,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.0, shadows: 0.1, highlights: -0.35, whites: -0.2, saturation: 1.06 }),
    reason:
      "La pérgola del rooftop (la promesa): la terraza del edificio con los jacuzzis, las montañas y el cielo de Medellín. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla del permiso.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk04"),
    audio: a("hk04-voz"),
    voz: {
      s0: 0.58,
      s1: 4.86,
      lufs: -15,
      dice: "Te presento este estudio en Laureles, habilitado para rentas cortas en Medellín.",
    },
    // La voz empieza a los 0,58 s (17,4 f; antes, de 0,14 a 0,31 s, hay un ruido de −45 dB que no es voz y queda fuera de la ventana tratada) y acaba a los 4,86 s (145,8 f); el clip dura 5,6 s (168 f). El clip tiene
    // 17 f de aire, no los 12 + los 10 que pide disolver en un golpe: entra A CORTE con `desde` 6 f, y la primera palabra suena a los 11,4 f del golpe (la música baja con curva en 10 f, 1,4 f antes). El plano dura
    // 154 f (hasta el golpe del f227): 14 f tras la última palabra, en los que la música sube. Isabella camina desde el fondo del pasillo del estudio hacia la cámara, con el sofá y la cama a los lados.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-061.ts`): «estudio» (whisper oye «estudiante»; el catálogo supone «apartaestudio»: el tiempo de la palabra es el de tres sílabas) y «Laureles» (whisper oye «Laurelis»).
    desde: fr(6),
    en: P.hook,
    dur: P.cocina - P.hook,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, exposure: 0.0, highlights: -0.2, whites: -0.1, saturation: 1.04 }),
    reason:
      "Pasillo del estudio (la entrada, lo que se alquila): Isabella dice «te presento este estudio en Laureles, habilitado para rentas cortas en Medellín». Entra a corte desde la terraza en el golpe; la música baja después.",
  },
  // ── Bloque 3 · lo que encuentras al llegar: la cocina, el estudio que se abre, la cama con la tele ──
  {
    id: "c03-cocina",
    bloque: 3,
    tipo: "video",
    src: v("rc01"),
    // RC01 (`ESTUDIO (1)`, iPhone, 1080×1920, SDR, 29,97 fps), del 0,00 al 2,77 s: la cocina equipada vista de cerca: los estantes con vasos y electrodomésticos, el microondas, el fregadero con su grifo negro y el cajón
    // de cubiertos abierto con su organizador; la cámara avanza y baja hacia el cajón. (RC05, la glisada por la cocina desde la puerta, es de la 060: este plano la sustituye tras ver su plan el 2026-10-22.)
    // La cocina completa, lista para usar. Entra A CORTE en el golpe de 20,4 dB que abre el paseo (f227).
    desde: 0.0,
    en: P.cocina,
    dur: P.estudio - P.cocina,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.2, shadows: 0.2, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "La cocina equipada (lo que se encuentra al entrar): los vasos, el microondas, el fregadero y el cajón de cubiertos abierto; todo listo para usar. El golpe del paseo abre el descubrimiento del estudio.",
  },
  {
    id: "c04-estudio",
    bloque: 3,
    tipo: "video",
    src: v("rc17"),
    // RC17 (`ESTUDIO (8)`, iPhone, 1080×1920, SDR, 29,97 fps), del 3,00 al 5,37 s: la cámara sale del pasillo y el estudio se abre al fondo: la cama frente al ventanal, el sofá gris a la derecha, la luz del
    // balcón. De la cocina al conjunto, hacia delante como el plano anterior. Entra A CORTE en el f310.
    desde: 3.0,
    en: P.estudio,
    dur: P.cama - P.estudio,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.05, shadows: 0.15, highlights: -0.3, whites: -0.15, saturation: 1.05 }),
    reason:
      "El estudio que se abre (todo cabe en un plano): del pasillo al conjunto de cama, sofá y ventanal; la cocina y el descanso en 24 m².",
  },
  {
    id: "c05-cama",
    bloque: 3,
    tipo: "video",
    src: v("rc07"),
    // RC07 (`ESTUDIO (15)`, iPhone, 1080×1920, SDR, 29,97 fps), del 3,00 al 6,07 s: la cama hecha con su colcha blanca en primer plano, la tele con la plataforma de series, la mesita de rejilla, el escritorio y el espejo
    // de arco al fondo; la cámara gira a la izquierda y se acerca a la cama. Es el detalle tras el conjunto. Entra A CORTE en el golpe de 24,2 dB del f381. El 6,07 s del clip es el final del tramo (el clip dura 7,8 s).
    desde: 3.0,
    en: P.cama,
    dur: P.mitad - P.cama,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05, shadows: 0.15, highlights: -0.35, whites: -0.2, saturation: 1.04 }),
    reason:
      "La cama hecha frente a la tele (el descanso del huésped): la colcha, la tele con series, el escritorio y el espejo al fondo; el detalle del estudio listo para entrar. Es el último paso antes de la mitad.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md04"),
    audio: a("md04-voz"),
    voz: {
      s0: 0.88,
      s1: 5.76,
      lufs: -15,
      dice: "En Medellín hay muchos proyectos inmobiliarios, pero pocos permiten rentas cortas.",
    },
    // La voz empieza a los 0,88 s (26,4 f) y acaba a los 5,76 s (172,8 f); el clip dura 6,5 s (195 f). `desde` 14 f entra DISOLVIENDO (el clip tiene 14 f antes) y la primera palabra suena a los 12,4 f del `en`: la música baja con
    // curva sobre 10 f. El plano dura 175 f: 16 f tras la última palabra, en los que la música sube antes del golpe del f648 (14 f de subida). Isabella camina hacia la cámara entre el escritorio y la cama, con el
    // ventanal al fondo; habla con las manos.
    desde: fr(14),
    en: P.mitad,
    dur: P.sofa - P.mitad,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, exposure: 0.0, highlights: -0.2, whites: -0.1, saturation: 1.04 }),
    reason:
      "Junto al escritorio y la cama (el estudio donde se aloja el huésped): Isabella dice «en Medellín hay muchos proyectos inmobiliarios, pero pocos permiten rentas cortas». Entra disolviendo desde la cama; el sofá va justo después.",
  },
  // ── Bloque 5 · el sofá, el coworking y la vista ──
  {
    id: "c07-sofa",
    bloque: 5,
    tipo: "video",
    src: v("rc10"),
    // RC10 (`ESTUDIO (18)`, iPhone, 1080×1920, SDR, 29,97 fps), del 0,00 al 2,80 s: el sofá gris de dos plazas frente a la estantería blanca con las perchas y la caja de seguridad; la cámara rodea el sofá hasta la puerta
    // de salida. El último rincón del estudio antes de subir al edificio. Entra A CORTE en el golpe de 31,5 dB (f648), el más fuerte de la rejilla.
    desde: 0.0,
    en: P.sofa,
    dur: P.coworking - P.sofa,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.05, shadows: 0.12, highlights: -0.35, whites: -0.2, saturation: 1.08 }),
    reason:
      "El sofá y la estantería con la caja de seguridad (el estudio pensado para quien llega con maleta): el último rincón antes de salir de la unidad al resto del edificio.",
  },
  {
    id: "c08-coworking",
    bloque: 5,
    tipo: "video",
    src: v("zc05"),
    // ZC05 (`SALA DE JUNTAS (5)`, iPhone, 1080×1920, SDR, 29,97 fps), del 0,00 al 2,93 s: la sala de reuniones del coworking del edificio: la mesa blanca, las sillas negras, la pantalla y los paneles acústicos
    // hexagonales de color en la pared de madera; la cámara avanza hacia la mesa. Lo que el edificio suma a la unidad. Entra A CORTE en el f732. El clip dura 3,03 s: el tramo llega a 2,93.
    desde: 0.0,
    en: P.coworking,
    dur: P.vista - P.coworking,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.2, shadows: 0.1, highlights: -0.3, whites: -0.25, saturation: 1.08 }),
    reason:
      "El coworking del edificio (lo que suma a la unidad): la sala de reuniones con la mesa blanca, la pantalla y los paneles de color; la ficha lo nombra y la mitad no lo dice.",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("zc18"),
    // ZC18 (`TERRAZA Y JACUZZI (2)`, iPhone, 1080×1920, SDR, 29,97 fps), del 7,20 al 10,83 s: el jacuzzi de agua turquesa con el cielo de nubes, la ciudad y las montañas detrás; la cámara lo rodea y el borde de la
    // pérgola con sus columnas entra por la izquierda al final. Movimiento 4,0 y continuo. Entra A CORTE en el golpe de 13,2 dB (f820) y es el plano más largo del bloque 5 (109 f): el clímax y, con la apertura,
    // el cierre del círculo en la terraza.
    desde: 7.2,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: [1.0, 1.04],
    entra: "corte",
    color: color({ exposure: -0.05, shadows: 0.1, highlights: -0.35, whites: -0.2, saturation: 1.06 }),
    reason:
      "El jacuzzi con la ciudad y las montañas (la vista, el clímax): el agua turquesa bajo el cielo de Medellín, rodeado por la cámara bajo la pérgola. El plano más largo del bloque.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct01"),
    audio: a("ct01-voz"),
    voz: {
      s0: 0.57,
      s1: 4.9,
      lufs: -15,
      dice: "Haz clic en el botón y agendemos una visita. Puede ser virtual o presencial.",
    },
    // La voz empieza a los 0,57 s (17,1 f; antes, de 0,18 a 0,45 s, hay un ruido de −45 dB que no es voz y queda fuera de la ventana tratada) y acaba a los 4,90 s (147 f); el clip dura 5,2 s (156 f). Entra A CORTE
    // con `desde` 6 f, y la primera palabra suena a los 11,1 f del `en`: el golpe de 19,0 dB suena entero y la música baja con curva DESPUÉS, acabando 1 f antes de la palabra. El plano dura 149 f (acaba en el f154
    // del clip): 8 f tras la última palabra, en los que la imagen funde a negro (los últimos 6).
    // Isabella de pie al fondo del estudio, junto a la cama y el ventanal con luz; se mueve poco.
    desde: fr(6),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, exposure: 0.05, highlights: -0.2, whites: -0.1, saturation: 1.04 }),
    reason:
      "El fondo del estudio con la luz del ventanal (la invitación): Isabella dice «haz clic en el botón y agendemos una visita; puede ser virtual o presencial»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-061.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-061/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_061 = P.cta + DUR_CTA + DUR_TARJETA;
