/**
 * EL RECORRIDO 074 — «Suite Go Living (El Poblado)», V55 del registro: el quinto reel de esta suite hotelera en venta (reparto 070-075, `proyectos/070/reparto-070-075.md`) — los planos, como DATOS.
 *
 * Ángulo: «LAS ZONAS SOCIALES» (lo nuevo del rodaje, la carpeta `6 Zonas Sociales`). El muro vegetal con el «GO» del edificio (sin texto ni voz) → el hook lo dice en la terraza («las buenas inversiones empiezan con
 * buenas decisiones») → el paseo enseña el edificio entre sus plantas y la entrada al gimnasio → la mitad la dice Isabella CAMINANDO por el gimnasio («una ubicación estratégica, amenidades y cercanía a los principales
 * destinos turísticos») → el resto del gimnasio y la fachada al sol → el CTA, sentada en las gradas del lounge («conoce esto y mucho más en Go Living Suites»). Estructura del canal: EXTERIOR · HOOK · RECORRIDO ·
 * MITAD · RECORRIDO · CTA, con TRES frases de Isabella. NO hay ni un plano de la suite: las zonas sociales son el ángulo.
 *
 * NINGUNA PIEZA DICE QUÉ EXIGE EL POT NI QUE ESTA SUITE LO CUMPLA, ni promete valorización ni rentabilidad: Isabella habla de decisiones, ubicación y amenidades.
 *
 *   hook   HK09  `IMG_5006` «Las buenas inversiones empiezan con buenas decisiones.»                                     (exclusiva de esta pieza, reparto)
 *   mitad  MD09  `IMG_5038` «Una ubicación estratégica, amenidades y cercanía a los principales destinos turísticos.»       (exclusiva de esta pieza, reparto)
 *   CTA    CT12  `IMG_5040` «Conoce esto y mucho más en Go Living Suites.»                                                 (exclusiva de esta pieza, reparto)
 *   exterior DR06 `IMG_5050` el muro vegetal con el logotipo «GO» del edificio; es el iPhone desde el suelo, NO un dron.
 *
 * LO QUE ES DE ESTA PIEZA Y LO QUE COMPARTE (`proyectos/074/combinaciones.md`): DR01, DR07 y DR03 (el edificio), ZS01, ZS02 y ZS03 (el gimnasio) son un hilo propio; las tiendas WEGO (ZS04, ZS05) NO se usan (marca de
 * terceros) y no hay ningún plano de la suite. Las otras cinco piezas del reparto usan otros planos.
 *
 *   bloque 1  c01                  el muro con el «GO»: DR06 entre las hojas de monstera y platanillo, sin texto ni voz (el logotipo es del edificio, una imagen y no un rótulo)
 *   bloque 2  c02                  Isabella camina por el pasillo de terraza con jardineras y ventanales: el hook (entra disolviendo; su primera palabra suena a los 19 f del golpe)
 *   bloque 3  c03 c04 c05          el edificio entre sus plantas (DR01, DR07) → la entrada al gimnasio: la torre de dominadas y el banco (ZS01)
 *   bloque 4  c06                  Isabella camina por el gimnasio hacia cámara: la mitad (entra A CORTE en el golpe; el clip entero, desde su primer fotograma)
 *   bloque 5  c07 c08 c09          las pesas y el banco rojo (ZS02) → las trotadoras y las elípticas frente al espejo (ZS03) → LA FACHADA al sol, de abajo arriba (DR03, el plano más largo del bloque)
 *   bloque 6  c10 c11              Isabella sentada en las gradas del lounge: el CTA (a corte); y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO. La canción es «Some Say» (Acoustic Sunsets, cover de Nea; pop acústico, SIN pulso fiable): la rejilla son los golpes MEDIDOS (`musica/golpes-cancion-entera.json`; `buscar-cortes-lp.py`,
 * estructura de 9 planos y 10 cortes) y cada cambio de plano cae en uno (≥ 13,1 dB la disolvencia al hook, que ACABA en él; ≥ 14,0 dB los cortes secos). La canción CAE desde los 175,75 s, justo cuando acaba la toma del
 * CTA: su cola queda bajo la tarjeta del cierre.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(12)` = 12/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS. Un plano que entra
 * disolviendo (`disolver`) empieza a verse 12 f ANTES de su `en` (`solapeDe`): su clip tiene que tener esos 12 f antes de `desde`, y el plano anterior dura hasta ese `en`.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f109, 3,6 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido sobre stills. Con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1
 * reducida con ffmpeg (`recorrido-luxur/montaje.md` §12). El material es iPhone HLG tone-mapeado con VideoToolbox (R21).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-074.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-074";

export const FPS_074 = 30;

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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −26,4 · −26,0 · −24,8 LUFS en su ventana de voz (habla a varios metros
 * de un iPhone); cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS)
 * hasta −15,0 LUFS con el pico real a −2,5 dBFS o menos, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Some Say» (Acoustic Sunsets, cover de Nea) — `archivos/musica/Some Say - Acoustic Sunsets (Nea Cover).mp3` (sha 8 `b652ab54`), 3:09. Se entra en su golpe de 140,733 s (13,1 dB) y de ahí suena en una meseta de −13 a
 * −15 LUFS hasta que CAE, desde los 175,75 s (−14,3 → −23 → −42 → silencio en tramos de 2 s). Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir»):
 * `proyectos/074/musica/golpes-cancion-entera.json` (`medir-pista.py --json`). La rejilla la dio `buscar-cortes-lp.py` con estos planos: ver `musica/rejilla-074.txt`.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 140.733, db: 13.1 },
  /** La disolvencia al hook ACABA aquí (la imagen de Isabella ya es opaca): el golpe suena entero y la música baja con curva después. */
  hook: { t: 143.632, db: 24.0 },
  /** Cortes secos del paseo. */
  paseo1: { t: 147.578, db: 15.8 },
  paseo2: { t: 149.882, db: 14.7 },
  paseo3: { t: 152.181, db: 22.1 },
  /** La mitad entra A CORTE en este golpe: suena entero y la música baja después. */
  mitad: { t: 155.324, db: 23.7 },
  /** El primer plano del bloque 5 entra a corte en este golpe. */
  alcoba: { t: 161.332, db: 14.0 },
  alcoba2: { t: 164.751, db: 17.3 },
  vista: { t: 167.647, db: 14.2 },
  /** El CTA entra A CORTE en este golpe; la canción cae sola 4 s después, ya bajo la tarjeta. */
  cta: { t: 171.596, db: 21.4 },
} as const;

/** Dónde cae la canción (s): −14,7 → −24,3 → −60,8 dB relativos (9,7 / 46,1 dB en 5 y 10 s). */
export const DECAE = { t: 175.75, lufsAntes: -14.0, lufs5s: -24.3, lufs10s: -60.8 } as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (140,733 s) cae en el frame 3 de la pieza; redondeado a un frame (4221/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 4221 / FPS_074;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_074;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_074;

/** Isabella: un empuje lento hacia ella (camina hacia cámara: el empuje la acompaña). Los recorridos y el exterior, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-074/${id}.mp4`;
const a = (id: string): string => `recorrido-074/${id}.wav`;

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
 * Los frames de cada cambio de plano: todos salen de `golpe(...)`, así que mover la entrada de la música es cambiar `INICIO_MUSICA`. El que entra disolviendo (el hook) tiene aquí el `en` de la disolvencia YA
 * TERMINADA: el plano anterior dura hasta él y el siguiente empieza a verse 12 f ANTES.
 */
const P = {
  hook: golpe(GOLPE.hook), //        90 · Isabella ya es opaca; su primera palabra suena 19 f después
  paseo: golpe(GOLPE.paseo1), //    208 · acaba el hook; el golpe abre el paseo (a corte)
  torre: golpe(GOLPE.paseo2), //    277 · la torre entre las cicas (a corte)
  gimnasio: golpe(GOLPE.paseo3), // 346 · la entrada al gimnasio (a corte)
  mitad: golpe(GOLPE.mitad), //     440 · Isabella con la mitad (a corte)
  pesas: golpe(GOLPE.alcoba), //    621 · las pesas y el banco (a corte)
  cardio: golpe(GOLPE.alcoba2), //  723 · las trotadoras y las elípticas (a corte)
  fachada: golpe(GOLPE.vista), //   810 · la fachada al sol (a corte)
  cta: golpe(GOLPE.cta), //         929 · Isabella con el CTA (a corte)
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 4,37 s (131 f) y desde `desde` (8 f) hasta el f113 del clip hay 105. Su voz va de 0,68 a 3,16 s (f941,4 a f1015,8 de la comp): 18 f (0,6 s) de su cara tras la última
 * palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela: el plano acaba antes del final del clip, que sigue 18 f más.
 */
const DUR_CTA = 105;

/**
 * Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero aquí, 2 f antes del final de la pieza (la tarjeta va en silencio; la canción ya cae sola desde los 175,75 s).
 */
export const FIN_MUSICA_074 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje074: readonly Corte[] = [
  // ── Bloque 1 · el edificio ──
  {
    id: "c01-edificio",
    bloque: 1,
    tipo: "video",
    src: v("dr06"),
    // DR06 (iPhone desde el suelo, 4K HLG → BT.709), del 0,40 al 3,40 s: el muro vegetal con el logotipo «GO» del edificio entre las hojas de monstera y platanillo; la cámara sube hacia la torre de ladrillo. Entra a corte
    // con el golpe de 13,1 dB del f3. El logotipo es del propio edificio (una imagen, no un rótulo): la primera toma sigue sin texto.
    desde: 0.4,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El edificio visto desde el suelo (la promesa): el muro vegetal con el «GO» de Go Living entre las hojas y, arriba, la torre. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de decisiones.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk09"),
    audio: a("hk09-voz"),
    voz: {
      s0: 1.04,
      s1: 4.03,
      lufs: -15,
      dice: "Las buenas inversiones empiezan con buenas decisiones.",
    },
    // La voz empieza a los 1,04 s (31,2 f) y acaba a los 4,03 s (120,9 f); el clip dura 4,40 s (132 f): solo hay 11 f tras la última palabra. `desde` 12 f entra DISOLVIENDO (el clip tiene 12 f antes) y la primera palabra suena
    // a los 19,2 f del `en`: la música baja con curva sobre ellos (10 f). El plano dura 118 f (hasta el golpe del f208, y el clip llega al f130): 9,1 f tras la última palabra, en los que la música sube con curva.
    // Isabella camina hacia cámara por el pasillo de terraza del edificio, con las jardineras y los ventanales.
    desde: fr(12),
    en: P.hook,
    dur: P.paseo - P.hook,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "La terraza del edificio con jardineras y ventanales (la decisión): Isabella camina hacia cámara y dice «las buenas inversiones empiezan con buenas decisiones». Entra disolviendo desde el exterior; la música ya está abajo.",
  },
  // ── Bloque 3 · el edificio entre sus plantas y la entrada al gimnasio ──
  {
    id: "c03-plantas",
    bloque: 3,
    tipo: "video",
    src: v("dr01"),
    // DR01 (iPhone desde el suelo, 4K HLG), del 1,00 al 3,30 s: la torre de voladizos con las nubes y, delante, la monstera enorme de la jardinera; la cámara sube despacio. Entra A CORTE en el golpe de 15,8 dB que abre el paseo (f208).
    desde: 1.0,
    en: P.paseo,
    dur: P.torre - P.paseo,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El edificio entre sus plantas (el entorno): la torre con las nubes y la monstera de la jardinera en primer plano; abre el paseo por lo que rodea las zonas sociales.",
  },
  {
    id: "c04-torre",
    bloque: 3,
    tipo: "video",
    src: v("dr07"),
    // DR07 (iPhone desde el suelo, 4K HLG), del 1,50 al 3,80 s: la cica y las hojas de platanillo y, al fondo, la arista de la torre contra el cielo. Sin personas.
    desde: 1.5,
    en: P.torre,
    dur: P.gimnasio - P.torre,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1 }),
    reason:
      "La torre entre las cicas (el entorno, al detalle): las hojas verdes en primer plano y la arista de la torre al fondo; el verde que rodea el edificio antes de entrar.",
  },
  {
    id: "c05-gimnasio",
    bloque: 3,
    tipo: "video",
    src: v("zs01"),
    // ZS01 (iPhone, 4K HLG), del 0,30 al 3,43 s: la torre de dominadas, el banco y, al fondo, las trotadoras y las elípticas del gimnasio con sus ventanales. La cámara gira a la derecha entrando a la sala. Sin personas.
    desde: 0.3,
    en: P.gimnasio,
    dur: P.mitad - P.gimnasio,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "La entrada al gimnasio (la zona social): la torre de dominadas, el banco y el fondo de máquinas bajo los ventanales; de lo que rodea el edificio a lo que se usa dentro, justo antes de que Isabella lo recorra.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md09"),
    audio: a("md09-voz"),
    voz: {
      s0: 0.6,
      s1: 5.48,
      lufs: -15,
      dice: "Una ubicación estratégica, amenidades y cercanía a los principales destinos turísticos.",
    },
    // La voz empieza a los 0,60 s (18 f) y acaba a los 5,48 s (164,4 f); el clip dura 6,13 s (184 f) y se usa ENTERO (`desde` 0): no hay 12 f antes de él para una disolvencia, así que entra A CORTE en el golpe del f440, que
    // suena entero; la música baja con curva en 10 f y la primera palabra suena a los 18 f. El plano dura 181 f (hasta el golpe del f621): 16,6 f tras la última palabra, en los que la música sube.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-074.ts`): «estratégica» (whisper 0,24).
    // Isabella camina hacia cámara por el gimnasio, con las máquinas y los ventanales detrás.
    desde: 0,
    en: P.mitad,
    dur: P.pesas - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, exposure: 0.1, saturation: 1.04 }),
    reason:
      "El gimnasio (las amenidades, dichas): Isabella camina hacia cámara por la sala y dice «una ubicación estratégica, amenidades y cercanía a los principales destinos turísticos». Entra a corte desde la entrada al gimnasio.",
  },
  // ── Bloque 5 · el gimnasio y la fachada ──
  {
    id: "c07-pesas",
    bloque: 5,
    tipo: "video",
    src: v("zs02"),
    // ZS02 (iPhone, 4K HLG), del 2,00 al 5,40 s: el banco rojo, el rack de mancuernas y las bicicletas de fondo, bajo las vigas del techo. La cámara avanza hacia las bicicletas. Sin personas. Entra A CORTE en el golpe del f621.
    desde: 2.0,
    en: P.pesas,
    dur: P.cardio - P.pesas,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "Las pesas y el banco rojo (lo que se usa): el rack de mancuernas y las bicicletas al fondo; sigue el gimnasio que Isabella acaba de recorrer, ahora sin ella.",
  },
  {
    id: "c08-cardio",
    bloque: 5,
    tipo: "video",
    src: v("zs03"),
    // ZS03 (iPhone, 4K HLG), del 0,30 al 3,20 s: las trotadoras con su cartel amarillo y las elípticas frente al espejo con las mancuernas reflejadas. Sin personas.
    desde: 0.3,
    en: P.cardio,
    dur: P.fachada - P.cardio,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "Las trotadoras y las elípticas (lo que se usa, al detalle): el fondo del gimnasio con su espejo; cierra la zona social antes de volver a mirar el edificio entero.",
  },
  {
    id: "c09-fachada",
    bloque: 5,
    tipo: "video",
    src: v("dr03"),
    // DR03 (iPhone desde el suelo, 4K HLG), del 0,50 al 4,47 s: la fachada de voladizos con el sol de frente que sube hacia el cielo de nubes y baja a la entrada de vidrio. Entra A CORTE en el golpe de 14,2 dB (f810) y es el
    // plano más largo del bloque 5 (119 f): el clímax. Del clip quedan 5 f más. (Es el gemelo del exterior de la 070, otro tramo del edificio.)
    desde: 0.5,
    en: P.fachada,
    dur: P.cta - P.fachada,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05, highlights: -0.3, whites: -0.15 }),
    reason:
      "La fachada al sol (el edificio entero, el clímax): la torre con el cielo de nubes y la entrada de vidrio; «esto y mucho más» es el edificio. El plano más largo del bloque.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct12"),
    audio: a("ct12-voz"),
    voz: {
      s0: 0.68,
      s1: 3.16,
      lufs: -15,
      dice: "Conoce esto y mucho más en Go Living Suites.",
    },
    // La voz empieza a los 0,68 s (20,4 f) y acaba a los 3,16 s (94,8 f); el clip dura 4,37 s (131 f). Solo hay 20 f antes de su primera palabra, así que entra A CORTE en el golpe del f929 (`desde` 8 f: la primera palabra suena a los
    // 12,4 f del golpe, que suena entero) y la música baja con curva en 10 f. El plano dura 105 f (acaba en el f113 del clip, 18 f antes de su final): 18,2 f tras la última palabra, en los que la imagen funde a negro (los últimos 6).
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-074.ts`): «esto» y el nombre «Go Living Suites» (whisper oyó «eso» y «Goblin en Suiz», confianzas 0,03-0,34).
    // Isabella sentada en las gradas del lounge, con las vigas al aire y las plantas detrás.
    desde: fr(8),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "Gradas del lounge (la invitación): Isabella, sentada, dice «conoce esto y mucho más en Go Living Suites»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-074.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-074/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_074 = P.cta + DUR_CTA + DUR_TARJETA;
