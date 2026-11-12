/**
 * EL RECORRIDO 073 — «Suite Go Living (El Poblado)», V54 del registro: el cuarto reel de esta suite hotelera en venta (reparto 070-075, `proyectos/070/reparto-070-075.md`) — los planos, como DATOS.
 *
 * Ángulo: «¿VIVES FUERA DE COLOMBIA? → LA SUITE LISTA, CON TÍTULO PROPIO», para quien no puede venir a verla: la torre vista desde el suelo (sin texto ni voz) → el hook, en la terraza del edificio, pregunta a quien vive fuera
 * («¿vives fuera de Colombia y quieres invertir en Medellín?») → el paseo enseña la suite lista tal como se recibe (del pasillo a la habitación, el TV y el escritorio, la habitación en abierto) → la mitad dice qué es lo que se
 * compra («una suite hotelera, con matrícula independiente, en edificios con reconocimiento») → la cama, el cabecero con sus cuadros y la vista de la ciudad → el CTA («haz clic en el enlace y recibe más información sobre
 * Go Living Suites en Medellín»). Estructura del canal: EXTERIOR · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA, con TRES frases de Isabella.
 *
 * NINGUNA FRASE NI SUBTÍTULO DICE QUÉ EXIGE EL POT NI QUE LA SUITE LO CUMPLA, ni promete valorización, rentabilidad o ganancia. «Matrícula independiente» consta en el anuncio; «en edificios con reconocimiento» es una
 * afirmación suya que el anuncio no recoge (POR CONFIRMAR AL OÍDO y con el usuario).
 *
 *   hook   HK10  `IMG_5011` «¿Vives fuera de Colombia y quieres invertir en Medellín?»                                    (exclusiva de esta pieza, reparto)
 *   mitad  MD01  `IMG_4945` «Una suite hotelera, con matrícula independiente, en edificios con reconocimiento.»           (exclusiva de esta pieza, reparto)
 *   CTA    CT10  `IMG_5010` «Haz clic en el enlace y recibe más información sobre Go Living Suites en Medellín.»            (exclusiva de esta pieza, reparto)
 *   exterior DR09 `IMG_5057` la torre desde abajo entre palmas; es el iPhone desde el suelo, NO un dron.
 *
 * LO QUE ES DE ESTA PIEZA Y LO QUE COMPARTE (`proyectos/073/combinaciones.md`): los recorridos RC03, RC11, RC04, RC06 y RC05 son un hilo propio (del pasillo a la habitación · el TV y el escritorio · la habitación en abierto ·
 * la cama · el cabecero); la VISTA final (RC07, 1,5-6,2 s) REPITE el plano de la 070 (2,5-6,07 s: comparten 3,6 s), declarado: es el único plano del cuarto en que la cámara sube de la cama al ventanal con la ciudad.
 *
 *   bloque 1  c01                  la torre: DR09, desde abajo entre palmas con el cielo nublado, a velocidad constante desde el f0; SIN TEXTO NI VOZ
 *   bloque 2  c02                  Isabella en la terraza del edificio, con la banca de madera y las plantas: el hook (entra A CORTE en el golpe con el clip entero: dura 114 f)
 *   bloque 3  c03 c04 c05          el umbral y la habitación lista: del pasillo del espejo a la habitación (RC03) → el mueble de TV y el escritorio (RC11) → la habitación en abierto con la ciudad al fondo (RC04)
 *   bloque 4  c06                  Isabella en la suite, de pie junto al ventanal y acercándose: la mitad (entra DISOLVIENDO)
 *   bloque 5  c07 c08 c09          la cama y el sofá (RC06) → el cabecero con los cuadros (RC05) → LA VISTA: de la cama al ventanal con la ciudad y las montañas (RC07, 4,7 s: el plano más largo del bloque)
 *   bloque 6  c10 c11              Isabella sentada en el sofá de cuero del lounge, con los espejos redondos detrás: el CTA (a corte); y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO. La canción es «Chillin'» (F.G.G., Chillstep Mix; chillstep de ≈ 130 BPM sin pulso fiable en la sección usada): la rejilla son los golpes MEDIDOS (`musica/golpes-cancion-entera.json`;
 * `buscar-cortes-lp.py`, estructura de 9 planos y 10 cortes, con los rangos de esta pieza y `MINC` = 9) y cada cambio de plano cae en uno (≥ 9,3 dB las disolvencias, que ACABAN en él; ≥ 9,0 dB los cortes secos). La canción
 * arranca fuerte (−12,5 LUFS en la apertura y el hook, con el golpe de entrada de 22,2 dB), baja a un cuerpo de −15,6 a −17,4 LUFS desde el golpe del f205 y CAE a los 294,75 s, 1,8 s después de entrar el CTA.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(12)` = 12/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS. Un plano que entra
 * disolviendo (`disolver`) empieza a verse 12 f ANTES de su `en` (`solapeDe`): su clip tiene que tener esos 12 f antes de `desde`, y el plano anterior dura hasta ese `en`.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f110, 3,7 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la
 * prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12). El material es iPhone HLG tone-mapeado con VideoToolbox (R21).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-073.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-073";

export const FPS_073 = 30;

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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −23,5 · −28,3 · −25,2 LUFS en su ventana de voz (habla a unos metros
 * de un iPhone); cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS)
 * hasta −15,0 LUFS con el pico real a −2,5 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Chillin'» (F.G.G., Chillstep Mix) — `archivos/musica/Chill Music - F.G.G. - Chillin' (Chillstep Mix).mp3` (sha 8 `6c9eb412`), 5:05. Se entra en su golpe de 259,21 s (22,2 dB) y de ahí suena a −12 LUFS (la intro) hasta el
 * golpe de los 265,93 s, donde pasa a su cuerpo de −15,6 a −17,4 LUFS, con dos respiros (274 y 282 s) y una subida a los 290 s, hasta que CAE, desde los 294,75 s, a −25 y al silencio. Los golpes de abajo son los MEDIDOS
 * (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir»): `proyectos/073/musica/golpes-cancion-entera.json` (`medir-pista.py --json`). La rejilla la dio `buscar-cortes-lp.py` con
 * estos planos: ver `musica/rejilla-073.txt`.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 259.21, db: 22.2 },
  /** El hook entra A CORTE en este golpe: suena entero y la música baja con curva después. */
  hook: { t: 262.216, db: 22.8 },
  /** Cortes secos del paseo. */
  paseo1: { t: 265.931, db: 9.0 },
  paseo2: { t: 269.617, db: 21.5 },
  paseo3: { t: 273.414, db: 10.7 },
  /** La disolvencia a la mitad ACABA aquí: el golpe suena entero y la música baja con curva después. */
  mitad: { t: 275.695, db: 10.4 },
  /** La disolvencia al primer plano del bloque 5 ACABA aquí. */
  alcoba: { t: 281.451, db: 9.3 },
  alcoba2: { t: 284.389, db: 25.1 },
  vista: { t: 288.183, db: 10.3 },
  /** El CTA entra A CORTE en este golpe; la canción cae sola 1,8 s después. */
  cta: { t: 292.919, db: 10.6 },
} as const;

/** Dónde cae la canción (s): −15,3 → −25,7 → silencio (10,4 / 83,7 dB relativos en 5 y 10 s). */
export const DECAE = { t: 294.75, lufsAntes: -17.4, lufs5s: -41.5, lufs10s: -70 } as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (259,21 s) cae en el frame 3 de la pieza; redondeado a un frame (7775/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 7775 / FPS_073;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_073;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_073;

/** Isabella: un empuje lento hacia ella (camina o se acerca: el empuje la acompaña). Los recorridos y el exterior, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-073/${id}.mp4`;
const a = (id: string): string => `recorrido-073/${id}.wav`;

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
 * Los frames de cada cambio de plano: todos salen de `golpe(...)`, así que mover la entrada de la música es cambiar `INICIO_MUSICA`. Los que entran disolviendo (la mitad y la cama) tienen aquí el `en` de la
 * disolvencia YA TERMINADA: el plano anterior dura hasta él y el siguiente empieza a verse 12 f ANTES.
 */
const P = {
  hook: golpe(GOLPE.hook), //        93 · Isabella (la terraza) entra a corte; su primera palabra suena 17 f después
  paseo: golpe(GOLPE.paseo1), //   205 · acaba el hook; el golpe abre el paseo (a corte)
  tv: golpe(GOLPE.paseo2), //      315 · el TV y el escritorio (a corte)
  habitacion: golpe(GOLPE.paseo3), // 429 · la habitación en abierto (a corte)
  mitad: golpe(GOLPE.mitad), //    497 · Isabella con la mitad (disuelve)
  cama: golpe(GOLPE.alcoba), //    670 · la cama (disuelve)
  cabecero: golpe(GOLPE.alcoba2), // 758 · el cabecero con los cuadros (a corte)
  vista: golpe(GOLPE.vista), //    872 · la vista de la ciudad (a corte)
  cta: golpe(GOLPE.cta), //       1014 · Isabella con el CTA (a corte)
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 5,43 s (163 f) y desde `desde` (6 f) hasta el f161 del clip hay 155. Su voz va de 0,62 a 4,85 s (f1026,6 a f1153,5 de la comp): 15 f (0,5 s) de su cara tras la última
 * palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela: el plano acaba antes del final del clip, que sigue 2 f más.
 */
const DUR_CTA = 155;

/**
 * Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero aquí, 2 f antes del final de la pieza (la tarjeta va en silencio; la canción ya cae sola desde los 294,75 s).
 */
export const FIN_MUSICA_073 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje073: readonly Corte[] = [
  // ── Bloque 1 · el edificio ──
  {
    id: "c01-edificio",
    bloque: 1,
    tipo: "video",
    src: v("dr09"),
    // DR09 (iPhone desde el suelo, 4K HLG → BT.709), del 2,00 al 5,13 s: la torre de piedra clara vista desde abajo entre las hojas de las palmas y los platanillos, con el cielo de nubes; la cámara sube despacio. Entra a corte con el golpe de 22,2 dB del f3.
    desde: 2.0,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El edificio visto desde el suelo (la promesa): la torre entre las palmas, con el cielo de Medellín detrás. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de quien vive lejos.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk10"),
    audio: a("hk10-voz"),
    voz: {
      s0: 0.57,
      s1: 3.31,
      lufs: -15,
      dice: "¿Vives fuera de Colombia y quieres invertir en Medellín?",
    },
    // La voz empieza a los 0,57 s (17,1 f) y acaba a los 3,31 s (99,3 f); el clip dura 3,80 s (114 f) y se usa ENTERO (`desde` 0): no hay 12 f antes de él para una disolvencia con la primera palabra a ≥ 8 f del golpe, así que
    // entra A CORTE en el golpe de 22,8 dB del f93, que suena entero; la música baja con curva en 10 f y la primera palabra suena a los 17,1 f. El plano dura 112 f (hasta el golpe del f205): 12,7 f tras la última palabra, en los que la música sube.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-073.ts`): «vives» (whisper oyó «Vivo», 0,16-0,14) y «Medellín» (0,36).
    // Isabella, en la terraza del edificio, de pie junto a la banca de madera, con las plantas detrás; plano medio con gestos.
    desde: 0,
    en: P.hook,
    dur: P.paseo - P.hook,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "La terraza del edificio (la pregunta a quien vive lejos): Isabella, rodeada de plantas, pregunta «¿vives fuera de Colombia y quieres invertir en Medellín?». Entra a corte desde el exterior; la música baja tras el golpe.",
  },
  // ── Bloque 3 · el umbral y la habitación lista ──
  {
    id: "c03-umbral",
    bloque: 3,
    tipo: "video",
    src: v("rc03"),
    // RC03 (iPhone, 4K HLG), del 0,60 al 4,27 s: el pasillo de la entrada con el espejo, que se abre a la habitación (la cama al fondo, el ventanal) y, al girar, el escritorio con su silla azul. Entra A CORTE en el golpe de 9,0 dB que abre el paseo (f205).
    desde: 0.6,
    en: P.paseo,
    dur: P.tv - P.paseo,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.08 }),
    reason:
      "El pasillo de la entrada (el umbral): del espejo a la habitación, con la cama y el ventanal al fondo; es lo primero que ve quien llega, y el golpe del paseo abre el descubrimiento.",
  },
  {
    id: "c04-tv",
    bloque: 3,
    tipo: "video",
    src: v("rc11"),
    // RC11 (iPhone, 4K HLG), del 3,00 al 6,80 s: desde la cama, la cámara sube al mueble de madera con la escultura y la planta, la tele y el escritorio con la silla azul. Sin personas.
    desde: 3.0,
    en: P.tv,
    dur: P.habitacion - P.tv,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.06 }),
    reason:
      "El mueble de TV y el escritorio (lo práctico, al detalle): la pantalla, el escritorio y la silla; lo que quien administra a distancia da por hecho que está.",
  },
  {
    id: "c05-habitacion",
    bloque: 3,
    tipo: "video",
    src: v("rc04"),
    // RC04 (iPhone, 4K HLG), del 3,80 al 6,07 s: la habitación en abierto, con la cama y su cabecero con cuadros, el sofá gris y la ciudad por el ventanal; la cámara avanza. Sin personas. La 070 usa de este clip el 0,60-3,57 s: no se solapan.
    desde: 3.8,
    en: P.habitacion,
    dur: P.mitad - P.habitacion,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.08 }),
    reason:
      "La habitación en abierto (lo que se recibe): la cama, el sofá y la ciudad por el ventanal en un solo plano; cierra el paseo antes de que Isabella explique qué es lo que se compra.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md01"),
    audio: a("md01-voz"),
    voz: {
      s0: 0.88,
      s1: 5.4,
      lufs: -15,
      dice: "Una suite hotelera, con matrícula independiente, en edificios con reconocimiento.",
    },
    // La voz empieza a los 0,88 s (26,4 f) y acaba a los 5,40 s (162 f); el clip dura 6,37 s (191 f). `desde` 14 f entra DISOLVIENDO (el clip tiene 14 f antes: más que los 12 de la disolvencia) y la primera palabra suena a los
    // 12,4 f del `en`, que es el golpe de 10,4 dB en que ACABA la disolvencia: suena entero y la música baja con curva en 10 f. El plano dura 173 f (hasta el golpe del f670, donde el siguiente acaba de disolver) y es el clip hasta
    // su último fotograma (14 + 173 = 187 de 191 f): 25 f tras la última palabra, en los que la música sube.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-073.ts`): «edificios con reconocimiento» (una afirmación suya que el anuncio no recoge) y «matrícula independiente» (consta en el anuncio).
    // Isabella, de pie junto al ventanal con la ciudad, al fondo de la suite, y acercándose despacio; la cama en primer plano.
    desde: fr(14),
    en: P.mitad,
    dur: P.cama - P.mitad,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "Junto al ventanal (lo que se compra, dicho): Isabella, al fondo de la suite y acercándose, dice «una suite hotelera, con matrícula independiente, en edificios con reconocimiento». Entra disolviendo desde el escritorio.",
  },
  // ── Bloque 5 · la cama, el cabecero y la vista ──
  {
    id: "c07-cama",
    bloque: 5,
    tipo: "video",
    src: v("rc06"),
    // RC06 (iPhone, 4K HLG), del 4,50 al 7,43 s: la cámara avanza sobre la cama hacia el cabecero gris y el sofá, con el aire acondicionado a la vista. Entra DISOLVIENDO (el clip tiene 4,5 s antes) y la disolvencia acaba en el golpe de 9,3 dB del f670.
    // La 070 usa de este clip el 1,20-4,17 s: no se solapan.
    desde: 4.5,
    en: P.cama,
    dur: P.cabecero - P.cama,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.14 }),
    reason:
      "La cama y el sofá (cómo se vive): la cámara avanza sobre la colcha beige hacia el cabecero; lo que se encuentra el huésped al entrar a su habitación. La disolvencia sale de Isabella y acaba en el golpe.",
  },
  {
    id: "c08-cabecero",
    bloque: 5,
    tipo: "video",
    src: v("rc05"),
    // RC05 (iPhone, 4K HLG), del 3,60 al 7,40 s: la cama king con su cabecero gris, las lámparas colgantes y los cuadros; la cámara se acerca. Sin personas.
    desde: 3.6,
    en: P.cabecero,
    dur: P.vista - P.cabecero,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.08 }),
    reason:
      "El cabecero con los cuadros (cómo se vive, al detalle): la cama king, las lámparas colgantes y los cuadros; un cuarto de hotel pensado para quedarse varios días.",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc07"),
    // RC07 (iPhone, 4K HLG), del 1,50 al 6,23 s: de la cama sube despacio hasta el ventanal con la repisa de ladrillo y la ciudad y las montañas de El Poblado al fondo. Entra A CORTE en el golpe de 10,3 dB (f872) y es el plano
    // más largo del bloque 5 (142 f): el clímax. REPITE el plano de la 070 (2,5-6,07 s; comparten 3,6 s): es el único del cuarto en que la cámara sube de la cama al ventanal; declarado en `combinaciones.md`.
    desde: 1.5,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05, highlights: -0.3, whites: -0.15 }),
    reason:
      "La ciudad desde el ventanal (la vista, el clímax): de la cama sube despacio hasta la ventana con El Poblado y las montañas al fondo; lo que se ve desde el piso 9. El plano más largo del bloque.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct10"),
    audio: a("ct10-voz"),
    voz: {
      s0: 0.62,
      s1: 4.85,
      lufs: -15,
      dice: "Haz clic en el enlace y recibe más información sobre Go Living Suites en Medellín.",
    },
    // La voz empieza a los 0,62 s (18,6 f) y acaba a los 4,85 s (145,5 f); el clip dura 5,43 s (163 f). Solo hay 18,6 f antes de su primera palabra: con `desde` 6 f entra A CORTE en el golpe del f1014 (la primera palabra suena
    // a los 12,6 f del golpe, que suena entero) y la música baja con curva en 10 f. El plano dura 155 f (acaba en el f161 del clip, 2 f antes de su final): 15,5 f tras la última palabra, en los que la imagen funde a negro (los últimos 6).
    // «Haz» es la sílaba de 0,62-0,74 s, ANTES del cierre de la «c» de «clic» (silencio de 0,13 s): `limites-voz.py` daba el arranque en 0,91 s y se comía la primera palabra.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-073.ts`): «haz» (whisper 0,14), «recibe más información» y el nombre «Go Living Suites» (whisper oyó «StatSuite», 0,04).
    // Isabella sentada en el sofá de cuero marrón del lounge, con los espejos redondos y las mesitas amarillas.
    desde: fr(6),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "El lounge del edificio (la invitación): Isabella, sentada en el sofá de cuero, dice «haz clic en el enlace y recibe más información sobre Go Living Suites en Medellín»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-073.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-073/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_073 = P.cta + DUR_CTA + DUR_TARJETA;
