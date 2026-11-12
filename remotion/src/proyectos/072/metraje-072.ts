/**
 * EL RECORRIDO 072 — «Suite Go Living (El Poblado)», V53 del registro: el tercer reel de esta suite hotelera en venta (reparto 070-075, `proyectos/070/reparto-070-075.md`) — los planos, como DATOS.
 *
 * Ángulo: «LA UBICACIÓN LO CAMBIA TODO». Todo el relato es «dónde está»: el edificio visto desde el suelo (sin texto ni voz) → el hook lo dice («en inversión inmobiliaria, la ubicación lo cambia todo») →
 * el paseo enseña el edificio por fuera (la fachada con el sol, las plantas) y entra a la suite hasta su ventana → la mitad pone nombres («a minutos de Oviedo, Santa Fe, EAFIT y la estación Aguacatala») → la
 * ciudad desde el piso 9 por los ventanales → el CTA («descubre esta suite en El Poblado y déjate asombrar por la ubicación»). Estructura del canal: EXTERIOR · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA, con
 * TRES frases de Isabella. Las tres tomas de Isabella son del EDIFICIO (la terraza alta, la terraza tras la puerta de vidrio y el lobby): ninguna dentro de la suite.
 *
 * NINGUNA PIEZA DICE QUÉ EXIGE EL POT NI QUE LA SUITE LO CUMPLE (esta no lo menciona). Los nombres de lugares los dice SU VOZ y aquí solo hay su transcripción: «EAFIT» no está en el anuncio (sí Oviedo, Santa
 * Fe, la estación Aguacatala y la Milla de Oro) y whisper oyó mal los tres nombres: POR CONFIRMAR AL OÍDO (ver `subtitulos-072.ts`).
 *
 *   hook   HK11  `IMG_5031` «En inversión inmobiliaria, la ubicación lo cambia todo.»                          (exclusiva de esta pieza, reparto)
 *   mitad  MD08  `IMG_5032` «A minutos de Oviedo, Santa Fe, EAFIT y la estación Aguacatala.»                    (exclusiva de esta pieza, reparto)
 *   CTA    CT11  `IMG_5034` «Descubre esta suite en El Poblado y déjate asombrar por la ubicación.»             (exclusiva de esta pieza, reparto)
 *   exterior DR05 `IMG_5022` los voladizos de la fachada y el cielo con nubes; es el iPhone desde el suelo, NO un dron.
 *
 * LO QUE ES DE ESTA PIEZA Y LO QUE COMPARTE (`proyectos/072/combinaciones.md`): el paseo es el edificio por fuera (DR03, DR01) y la suite hasta su ventana (RC03); el bloque 5, la ciudad desde sus ventanales
 * (RC13, RC05 y la vista, RC07). RC07 (2,45-6,22 s) COMPARTE 3,1 s con la 070 (2,5-6,07 s): es el único plano que enseña la ciudad entera desde el ventanal y se repite declarado.
 *
 *   bloque 1  c01                  el edificio: DR05, los voladizos y el cielo con nubes, a velocidad constante desde el f0; SIN TEXTO NI VOZ
 *   bloque 2  c02                  Isabella en la terraza alta, con el cielo y los edificios detrás: el hook (entra A CORTE en el golpe, el clip ENTERO: su primera palabra suena a los 14 f)
 *   bloque 3  c03 c04 c05          el edificio y su entorno: la fachada con el sol (DR03) → la fachada entre las plantas (DR01) → la suite, de la entrada a su ventana (RC03)
 *   bloque 4  c06                  Isabella camina tras la puerta de vidrio de la terraza: la mitad (a corte en el golpe; el clip ENTERO)
 *   bloque 5  c07 c08 c09          la ciudad por una ventana (RC13: solo su ventana, no la lavandería) → el ventanal de la habitación con la ciudad (RC05) → LA VISTA: de la cama al ventanal, la ciudad y las montañas (RC07)
 *   bloque 6  c10 c11              Isabella camina por el lobby con los ventanales: el CTA (entra disolviendo); y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO. La canción es «I Feel It Coming» (The Weeknd, versión de saxofón; lounge, Sol menor, ~93 BPM; sin pulso fiable): la rejilla son los golpes MEDIDOS (`musica/golpes-cancion-entera.json`;
 * `herramientas/rejilla-libre.py`) y cada cambio de plano cae en uno (15,2-25,6 dB) SALVO UNO, declarado: la salida del hook. HK11 dura 110 f y su voz acaba en el f107: el plano dura el clip ENTERO (como en la
 * 062) y la canción no tiene dos golpes a 3,6-3,67 s, así que el paso del hook al paseo (c02 → c03, f190) cae en el último fotograma del clip y NO en un golpe; la música, que está abajo bajo la voz, sube desde
 * su última palabra. La canción CAE desde los 261,0 s, ≈ 4 s después de entrar el CTA: su decaimiento (de los 252 s) suena bajo la voz y la cola queda bajo la tarjeta.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(12)` = 12/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS. Un plano que entra
 * disolviendo (`disolver`) empieza a verse 12 f ANTES de su `en` (`solapeDe`): su clip tiene que tener esos 12 f antes de `desde`, y el plano anterior dura hasta ese `en`.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f94, 3,1 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido sobre stills (`pruebas-720p/stills1/`). Con `color` el render lleva `--gl=angle`
 * y la prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12). El material es iPhone HLG tone-mapeado con VideoToolbox (R21).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-072.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-072";

export const FPS_072 = 30;

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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −26,1 · −25,0 · −25,1 LUFS en su ventana de voz (habla a unos
 * metros de un iPhone); cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS)
 * hasta −15,0 LUFS con el pico real a −2,5 dBFS (−2,7 la del hook), así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «I Feel It Coming» (The Weeknd, Saxophone Cover) — `archivos/musica/I Feel It Coming - The Weeknd (Saxophone Cover).mp3` (sha 8 `3fcefe36`), 4:32. Se entra en su golpe de 227,745 s (22,5 dB) y de ahí suena en una
 * meseta de −10,6 a −12,1 LUFS hasta que se APAGA, desde los 252 s, en un decaimiento largo (−11 → −17 → −26 dB RMS a los 262 s). Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms;
 * el instante es el de «empieza a subir»): `proyectos/072/musica/golpes-cancion-entera.json` (`medir-pista.py --json`). La rejilla la dio `herramientas/rejilla-libre.py` con estos planos.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 227.745, db: 22.5 },
  /** El hook entra A CORTE en este golpe: suena entero y la música baja con curva después. */
  hook: { t: 230.326, db: 22.9 },
  /** Cortes secos del paseo (el paso del hook al paseo, f190, NO tiene golpe: ver arriba). */
  paseo2: { t: 237.428, db: 24.4 },
  paseo3: { t: 240.648, db: 18.5 },
  /** La mitad entra A CORTE en este golpe: suena entero y la música baja después. */
  mitad: { t: 243.227, db: 25.6 },
  /** El primer plano del bloque 5 entra A CORTE (la voz de la mitad acaba 6 f antes) en este golpe. */
  cama: { t: 247.748, db: 18.3 },
  sofa: { t: 250.324, db: 16.8 },
  vista: { t: 252.911, db: 16.0 },
  /** La disolvencia al CTA ACABA aquí; la canción decae sola, ≈ 4 s después de este golpe. */
  cta: { t: 256.665, db: 15.2 },
} as const;

/** Dónde cae la canción (s): el decaimiento largo, −16,3 → −19,0 LUFS bajo la voz del CTA y −24,6 en su cola. */
export const DECAE = { t: 261.0, lufsAntes: -17.1, lufs5s: -26.2, lufs10s: -45.1 } as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (227,745 s) cae en el frame 3 de la pieza; redondeado a un frame (6831/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 6831 / FPS_072;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_072;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_072;

/** Isabella: un empuje lento hacia ella (camina hacia cámara: el empuje la acompaña). Los recorridos y el exterior, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-072/${id}.mp4`;
const a = (id: string): string => `recorrido-072/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE del canal: contraste con cuerpo, negros hundidos, luces recogidas (los cielos son lo primero que se quema), un punto cálido y +10 % de saturación. Orden del efecto: exposición → balance de blancos →
 * sombras/luces/blancos/negros → contraste → saturación → vibrance. `vibrance` ≤ 0,05 (sobre hormigón gris pinta un moteado de colores y vuelve rosadas las nubes) y las tomas de Isabella, `saturation` ≤ 1,06:
 * la piel se queda donde estaba. El AJUSTE de cada plano se mide (luma y quemado sobre stills), no se hereda.
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

/** Frames que dura el plano del hook: el clip HK11 ENTERO (110 f = 3,67 s); su voz acaba en el f107,4. Es lo que hace que la salida del hook no caiga en un golpe. */
const DUR_HOOK = 110;

/**
 * Los frames de cada cambio de plano: todos salen de `golpe(...)`, así que mover la entrada de la música es cambiar `INICIO_MUSICA`, salvo `paseo` (la salida del hook), que es el fin del clip. El CTA entra
 * disolviendo y su `en` es el de la disolvencia YA TERMINADA: el plano anterior dura hasta él y el CTA empieza a verse 12 f ANTES.
 */
const P = {
  hook: golpe(GOLPE.hook), //        80 · el hook entra a corte en el golpe; su primera palabra suena 14 f después
  paseo: golpe(GOLPE.hook) + DUR_HOOK, // 190 · acaba el clip del hook (SIN golpe): la fachada (a corte)
  plantas: golpe(GOLPE.paseo2), //  293 · la fachada entre las plantas (a corte)
  suite: golpe(GOLPE.paseo3), //    390 · la suite, de la entrada a su ventana (a corte)
  mitad: golpe(GOLPE.mitad), //     467 · Isabella con la mitad (a corte)
  ventana: golpe(GOLPE.cama), //    603 · la ventana (a corte)
  ciudad: golpe(GOLPE.sofa), //     680 · el ventanal de la habitación con la ciudad (a corte)
  vista: golpe(GOLPE.vista), //     758 · la vista de la ciudad y las montañas (a corte)
  cta: golpe(GOLPE.cta), //         871 · Isabella con el CTA (disuelve)
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 5,30 s (159 f) y desde `desde` (12 f) hasta el f152 del clip hay 140. Su voz va de 0,76 a 4,38 s (f882 a f990 de la comp): 20 f (0,67 s) de su cara tras la última
 * palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela: el plano acaba antes del final del clip, que sigue 7 f más.
 */
const DUR_CTA = 140;

/**
 * Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero aquí, 2 f antes del final de la pieza (la tarjeta va en silencio; la canción ya decae sola).
 */
export const FIN_MUSICA_072 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje072: readonly Corte[] = [
  // ── Bloque 1 · el edificio ──
  {
    id: "c01-edificio",
    bloque: 1,
    tipo: "video",
    src: v("dr05"),
    // DR05 (iPhone desde el suelo, 4K HLG → BT.709), del 0,60 al 3,27 s: el cielo con nubes y el borde de los voladizos de la fachada, que la cámara barre hacia abajo. Entra a corte con el golpe de 22,5 dB del f3.
    desde: 0.6,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ highlights: -0.3, whites: -0.15 }),
    reason:
      "El edificio visto desde el suelo (la promesa): los voladizos de la fachada contra el cielo con nubes. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de la ubicación.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk11"),
    audio: a("hk11-voz"),
    voz: {
      s0: 0.47,
      s1: 3.58,
      lufs: -15,
      dice: "En inversión inmobiliaria, la ubicación lo cambia todo.",
    },
    // La voz empieza a los 0,47 s (14,1 f) y acaba a los 3,58 s (107,4 f); el clip dura 3,67 s (110 f) y se usa ENTERO (`desde` 0): no hay 12 f antes para una disolvencia, así que entra A CORTE en el golpe del f80,
    // que suena entero; la música baja con curva en 10 f y la primera palabra suena a los 14 f. El plano dura los 110 f del clip: acaba 2,6 f tras la última palabra y la salida (f190) NO cae en un golpe (declarado).
    // Isabella en la terraza alta, con el cielo de nubes y los edificios detrás, de pie y con las manos abiertas.
    desde: 0,
    en: P.hook,
    dur: DUR_HOOK,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "Terraza alta con el cielo y la ciudad detrás (la ubicación): Isabella, de pie, dice «en inversión inmobiliaria, la ubicación lo cambia todo». Entra a corte desde el exterior; la música baja tras el golpe.",
  },
  // ── Bloque 3 · el edificio y su entorno: la fachada, las plantas y la suite hasta su ventana ──
  {
    id: "c03-fachada",
    bloque: 3,
    tipo: "video",
    src: v("dr03"),
    // DR03 (iPhone desde el suelo, 4K HLG), del 0,70 al 4,13 s: la fachada de voladizos con el sol de frente y el jardín de abajo; la cámara baja hacia la entrada de vidrio con los edificios de la ciudad reflejados.
    // Entra A CORTE en el último fotograma del clip del hook (f190), SIN golpe (declarado: el clip de HK11 dura 110 f).
    desde: 0.7,
    en: P.paseo,
    dur: P.plantas - P.paseo,
    zoom: QUIETO,
    entra: "corte",
    color: color({ highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "La fachada con el sol (el edificio, por fuera): los voladizos y el jardín, y la cámara que baja a la entrada de vidrio; de la terraza al exterior del edificio, que es donde está.",
  },
  {
    id: "c04-plantas",
    bloque: 3,
    tipo: "video",
    src: v("dr01"),
    // DR01 (iPhone desde el suelo, 4K HLG), del 0,40 al 3,63 s: la fachada entre las hojas grandes de un monstera, con el cielo de nubes. Sin personas. Entra A CORTE en el golpe de 24,4 dB.
    desde: 0.4,
    en: P.plantas,
    dur: P.suite - P.plantas,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05, highlights: -0.3, whites: -0.15 }),
    reason:
      "La fachada entre las plantas (el entorno): el edificio rodeado de verde y de cielo; sigue por fuera, un plano más, antes de entrar a la suite.",
  },
  {
    id: "c05-suite",
    bloque: 3,
    tipo: "video",
    src: v("rc03"),
    // RC03 (iPhone, 4K HLG), del 0,00 al 2,57 s: desde el espejo de la entrada, la suite entera con la cama y, al fondo, el ventanal con la ciudad; la cámara avanza hacia él. Sin personas. Entra A CORTE en el golpe de 18,5 dB.
    desde: 0,
    en: P.suite,
    dur: P.mitad - P.suite,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1 }),
    reason:
      "La suite hacia su ventana (de fuera a dentro): de la entrada al ventanal del fondo con la ciudad; el paso del edificio a lo que se ve desde dentro, que prepara la mitad.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md08"),
    audio: a("md08-voz"),
    voz: {
      s0: 0.47,
      s1: 4.32,
      lufs: -15,
      dice: "A minutos de Oviedo, Santa Fe, EAFIT y la estación Aguacatala.",
    },
    // La voz empieza a los 0,47 s (14,1 f) y acaba a los 4,32 s (129,6 f); el clip dura 4,97 s (149 f) y se usa ENTERO (`desde` 0): entra A CORTE en el golpe del f467, que suena entero; la música baja con curva en 10 f y la
    // primera palabra suena a los 14 f. El plano dura 136 f (hasta el golpe del f603, donde el siguiente entra a corte): 6,4 f tras la última palabra, en los que la música empieza a subir (no cabe más: la canción solo
    // tiene golpes a 4,52 s —136 f— y a 5,17 s —155 f, más que el clip—).
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-072.ts`): «Oviedo» (whisper oyó «odio», 0,02), «EAFIT» (0,34; NO está en el anuncio) y «Aguacatala» (0,42).
    // Isabella camina hacia cámara tras la puerta corredera de vidrio de la terraza, con el jardín y la fachada de colores detrás.
    desde: 0,
    en: P.mitad,
    dur: P.ventana - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "Terraza, tras el cristal (los nombres, dichos): Isabella camina hacia cámara y dice «a minutos de Oviedo, Santa Fe, EAFIT y la estación Aguacatala». Entra a corte desde la suite.",
  },
  // ── Bloque 5 · la ciudad desde el piso 9 ──
  {
    id: "c07-ventana",
    bloque: 5,
    tipo: "video",
    src: v("rc13"),
    // RC13 (iPhone, 4K HLG), del 1,90 al 4,47 s: SOLO su ventana (la lavandería queda fuera, catálogo §5): la cámara sale del marco de la puerta y enseña la ciudad con el verde, los edificios de ladrillo y la montaña
    // con nubes. Entra A CORTE en el golpe de 18,3 dB.
    desde: 1.9,
    en: P.ventana,
    dur: P.ciudad - P.ventana,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.15, highlights: -0.3, whites: -0.15 }),
    reason:
      "La ciudad por la ventana (lo que rodea): el verde, los edificios de ladrillo y la montaña con nubes; tras decir los nombres, se ve el entorno.",
  },
  {
    id: "c08-ciudad",
    bloque: 5,
    tipo: "video",
    src: v("rc05"),
    // RC05 (iPhone, 4K HLG), del 0,00 al 2,60 s: el ventanal de la habitación con las torres de la ciudad y la palma; la cámara empieza a girar hacia la cama.
    desde: 0,
    en: P.ciudad,
    dur: P.vista - P.ciudad,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05 }),
    reason:
      "El ventanal de la habitación (el piso 9): las torres de la ciudad al fondo y la palma dentro; de lo que rodea a lo que se ve desde la suite.",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc07"),
    // RC07 (iPhone, 4K HLG), del 2,45 al 6,22 s: de la cama sube hasta el ventanal con la repisa de ladrillo y la ciudad y las montañas de El Poblado al fondo. Entra A CORTE en el golpe de 16,0 dB (f758) y es el plano
    // más largo del bloque 5 (113 f): el clímax. Del clip quedan 2 f más. COMPARTE 3,1 s con la 070 (2,5-6,07 s), declarado.
    desde: 2.45,
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
    src: v("ct11"),
    audio: a("ct11-voz"),
    voz: {
      s0: 0.76,
      s1: 4.38,
      lufs: -15,
      dice: "Descubre esta suite en El Poblado y déjate asombrar por la ubicación.",
    },
    // La voz empieza a los 0,76 s (22,8 f) y acaba a los 4,38 s (131,4 f); el clip dura 5,30 s (159 f). `desde` 12 f entra DISOLVIENDO (el clip tiene 12 f antes) y la primera palabra suena a los 10,8 f del golpe, que
    // suena entero; la música baja con curva en 10 f. El plano dura 140 f (acaba en el f152 del clip, 7 f antes de su final): 20,6 f tras la última palabra, en los que la imagen funde a negro (los últimos 6).
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-072.ts`): «déjate» (whisper oyó «hasta» y «déjate» con 0,05).
    // Isabella camina hacia cámara por el lobby, con los ventanales a la terraza, las sillas blancas y las plantas.
    desde: fr(12),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "Lobby con ventanales (la invitación): Isabella camina hacia cámara y dice «descubre esta suite en El Poblado y déjate asombrar por la ubicación»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-072.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-072/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_072 = P.cta + DUR_CTA + DUR_TARJETA;
