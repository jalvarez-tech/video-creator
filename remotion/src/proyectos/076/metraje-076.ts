/**
 * EL RECORRIDO 076 — «Suite Go Living (El Poblado)», V57 del registro: séptimo reel de esta suite hotelera en venta y primero del lote 076-078 (los tres que llevan ZONAS SOCIALES del edificio, pedido del usuario
 * «incluyendo también videos de las zonas sociales») — los planos, como DATOS.
 *
 * Ángulo: «UNA BUENA INVERSIÓN EMPIEZA POR LA TRANQUILIDAD». El edificio visto desde el suelo, con sus plantas (sin texto ni voz) → el hook lo dice («una buena inversión empieza por la tranquilidad») →
 * el paseo enseña lo que el edificio pone alrededor de la suite (el gimnasio, la tienda del edificio y otra vez el gimnasio, con las bicicletas) → la mitad lo concreta («invierte en una suite con vocación turística y
 * ubicación estratégica») → la suite (la cama y la consola del televisor, la repisa con la planta) y la vista de la ciudad desde el ventanal → el CTA («agenda una visita y descubre su potencial de inversión»).
 * Estructura del canal: EXTERIOR · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA, con TRES frases de Isabella.
 *
 * NO SE PROMETE RENTABILIDAD NI VALORIZACIÓN: «tranquilidad» es el ángulo del anuncio (matrícula independiente, a puerta cerrada, operación activa, vigilancia 24/7) y «potencial de inversión» (CT06) es la
 * frase aceptada del catálogo, sin cifra. Ninguna pieza dice qué exige el POT.
 *
 *   hook   HK02  `IMG_4944` «Una buena inversión empieza por la tranquilidad.»                          (exclusiva de esta pieza; se RECORTA la interjección inicial «Hoy,»: ver `normalizar.mjs`)
 *   mitad  MD04  `IMG_4967` «Invierte en una suite con vocación turística y ubicación estratégica.»     (exclusiva de esta pieza)
 *   CTA    CT06  `IMG_4962` «Agenda una visita y descubre su potencial de inversión.»                    (exclusiva de esta pieza)
 *   exterior DR10 `IMG_5058` la torre desde la acera, con la entrada de vidrio y su jardín vertical, y la hoja de una planta delante; es el iPhone desde el suelo, NO un dron.
 *
 * LO QUE ES DE ESTA PIEZA (`proyectos/076/combinaciones.md`): las zonas sociales ZS01 (3,5-5,7 s: las elípticas y las trotadoras), ZS05 (4,3-6,4 s: el interior de la tienda del edificio, sin el toldo de la
 * marca de terceros) y ZS02 (5,5-8,0 s: el gimnasio, con las bicicletas), que la 074 NO usó (ella usó ZS01 0,30-3,43 · ZS02 2,00-5,40 · ZS03 0,30-3,20), y de la suite RC11 (0,2-2,77 s) y RC08 (4,3-6,5 s).
 * La vista (RC07) la comparten las otras piezas del reparto: es el único plano de la ciudad con esa amplitud (declarado).
 *
 *   bloque 1  c01                  el edificio: DR10, la torre desde la acera con su entrada y las plantas, con la inclinación que se va frenando; SIN TEXTO NI VOZ
 *   bloque 2  c02                  Isabella viene del fondo del pasillo de la suite: el hook (entra disolviendo; su primera palabra suena a los 12,6 f del golpe)
 *   bloque 3  c03 c04 c05          las zonas sociales: el gimnasio (ZS01) → la tienda del edificio (ZS05) → el gimnasio, las bicicletas (ZS02)
 *   bloque 4  c06                  Isabella junto al ventanal: la mitad (entra A CORTE en el golpe; el clip entero, desde su primer fotograma)
 *   bloque 5  c07 c08 c09          la cama hacia la consola del televisor (RC11) → la repisa con la planta y la cortina (RC08) → LA VISTA: de la cama al ventanal con la ciudad y las montañas (RC07, el plano más largo del bloque)
 *   bloque 6  c10 c11              Isabella en primer plano con el mueble de TV detrás: el CTA (a corte); y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO. La canción es «Luxury, Elegance, Refined» (lounge / smooth chill, ~86 BPM, Re menor; plana: sin crescendo ni caída propia hasta su cola): la rejilla son los golpes MEDIDOS
 * (`musica/golpes-cancion-entera.json`; `buscar-cortes-lp.py` con `T_F=176`, estructura de 9 planos y 10 cortes, `TIPOS=ddcccccccc`) y cada cambio de plano cae en uno (≥ 18,5 dB la disolvencia al hook; ≥ 9,6 dB los cortes
 * secos). La canción no cae sola dentro de la pieza: se APAGA con curva bajo la tarjeta del cierre (`audio-076.ts`).
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(12)` = 12/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS. Un plano que entra
 * disolviendo (`disolver`) empieza a verse 12 f ANTES de su `en` (`solapeDe`): su clip tiene que tener esos 12 f antes de `desde`, y el plano anterior dura hasta ese `en`.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f99, 3,3 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la
 * prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12). El material es iPhone HLG tone-mapeado con VideoToolbox (R21).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-076.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-076";

export const FPS_076 = 30;

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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −27,1 · −25,0 · −25,3 LUFS en su ventana de voz (habla a unos metros
 * de un iPhone); cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS)
 * hasta −15,0 LUFS con el pico real a −2,5 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Luxury, Elegance, Refined» — `archivos/musica/Luxury, Elegance, Refined - Oficial Vídeo Clipe.mp3` (sha 8 `4d36ea48`), 3:03. Se entra en su golpe de 147,778 s (18,5 dB) y de ahí suena en una meseta de −14,6 a −14,1 LUFS
 * (con una bajada de 1,4 dB a los 170-175 s) hasta que acaba la pieza (179,6 s); la canción sola resuelve en un fundido desde los 180 s, que aquí no llega a sonar: se APAGA con curva bajo la tarjeta.
 * Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir»): `proyectos/076/musica/golpes-cancion-entera.json` (`medir-pista.py --json`).
 * La rejilla la dio `buscar-cortes-lp.py` con estos planos: ver `musica/rejilla-076.txt`.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 147.778, db: 18.5 },
  /** La disolvencia al hook ACABA aquí (la imagen de Isabella ya es opaca): el golpe suena entero y la música baja con curva después. */
  hook: { t: 150.567, db: 18.8 },
  /** Cortes secos del paseo (las zonas sociales). */
  paseo1: { t: 153.944, db: 17.8 },
  paseo2: { t: 156.15, db: 13.2 },
  paseo3: { t: 158.239, db: 13.4 },
  /** La mitad entra A CORTE en este golpe: suena entero y la música baja después. */
  mitad: { t: 160.712, db: 16.0 },
  /** El primer plano del bloque 5 (la cama): entra A CORTE (la mitad deja 13,6 f tras su última sílaba: no cabe una disolvencia sin tapar «-ca»). */
  alcoba: { t: 165.441, db: 23.4 },
  alcoba2: { t: 168.006, db: 11.3 },
  vista: { t: 170.219, db: 10.5 },
  /** El CTA entra A CORTE en este golpe (el más débil de la rejilla, 9,6 dB: el corte seco pide ≥ 8). */
  cta: { t: 173.741, db: 9.6 },
} as const;

/** La canción no cae sola dentro de la pieza (meseta plana hasta los 175 s y fundido final desde los 180 s): se apaga con la envolvente de `audio-076.ts`. */
export const DECAE = { t: 180, lufsAntes: -15.3, lufs5s: -22.5, lufs10s: -70 } as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (147,778 s) cae en el frame 3 de la pieza; redondeado a un frame (4432/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 4432 / FPS_076;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_076;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_076;

/** Isabella: un empuje lento hacia ella (camina hacia cámara: el empuje la acompaña). Los recorridos y el exterior, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-076/${id}.mp4`;
const a = (id: string): string => `recorrido-076/${id}.wav`;

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
 * Los frames de cada cambio de plano: todos salen de `golpe(...)`, así que mover la entrada de la música es cambiar `INICIO_MUSICA`. El que entra disolviendo (el hook) tiene aquí el `en`
 * de la disolvencia YA TERMINADA: el plano anterior dura hasta él y el siguiente empieza a verse 12 f ANTES.
 */
const P = {
  hook: golpe(GOLPE.hook), //        87 · Isabella ya es opaca; su primera palabra suena 12,6 f después
  paseo: golpe(GOLPE.paseo1), //    188 · acaba el hook; el golpe abre el paseo (a corte): el gimnasio
  tienda: golpe(GOLPE.paseo2), //   254 · la tienda del edificio (a corte)
  bicis: golpe(GOLPE.paseo3), //    317 · el gimnasio con las bicicletas (a corte)
  mitad: golpe(GOLPE.mitad), //     391 · Isabella con la mitad (a corte)
  cama: golpe(GOLPE.alcoba), //     533 · la cama y la consola del televisor (a corte)
  repisa: golpe(GOLPE.alcoba2), //  610 · la repisa con la planta y la cortina (a corte)
  vista: golpe(GOLPE.vista), //     676 · la vista de la ciudad (a corte)
  cta: golpe(GOLPE.cta), //         782 · Isabella con el CTA (a corte)
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 4,00 s (120 f) y desde `desde` (1 f) hasta el f117 del clip hay 116. Su voz va de 0,45 a 3,22 s (f13,5 a f96,6 del clip): 20 f (0,67 s) de su cara tras la última
 * palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela: el plano acaba antes del final del clip, que sigue 3 f más.
 */
const DUR_CTA = 116;

/**
 * Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero aquí, 2 f antes del final de la pieza (la tarjeta va en silencio; la canción plana no cae sola dentro de la pieza).
 */
export const FIN_MUSICA_076 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje076: readonly Corte[] = [
  // ── Bloque 1 · el edificio ──
  {
    id: "c01-edificio",
    bloque: 1,
    tipo: "video",
    src: v("dr10"),
    // DR10 (iPhone desde el suelo, 4K HLG → BT.709), del 4,07 (f122) al 6,97 s: la torre beige con su voladizo y la entrada de vidrio con el jardín vertical, vista desde la acera entre plantas; la cámara se inclina hacia arriba y se va frenando
    // (el perfil de movimiento baja de ≈ 8 a ≈ 3 en el clip: una inclinación que se asienta, sin tirones; los primeros 75 f opacos van de ≈ 8 a ≈ 4). Es el tramo que NO usan la 075 (DR10 0,30-3,73 s, la calle con los coches y el
    // paso de cebra) ni ninguna otra pieza de la suite; arranca 0,3 s tras el final de la apertura de la 075 para que no se parezca a su último fotograma (el paso de cebra ya casi no está en cuadro). Entra a corte con el golpe de 18,5 dB del f3.
    desde: fr(122),
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    // Medido en stills a escala 1 con la base sola: luma 115 (f0) y 124 (f60) frente a 96-122 en el resto de la pieza (el cielo cubierto sube la media); sin luces quemadas (≥ 250: 0 %). Exposición −0,08 para igualarlo.
    color: color({ exposure: -0.08 }),
    reason:
      "El edificio visto desde la acera, entre sus plantas (la calma): la torre con su entrada de vidrio y el jardín vertical. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de tranquilidad.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk02"),
    audio: a("hk02-voz"),
    voz: {
      s0: 1.62,
      s1: 3.97,
      lufs: -15,
      dice: "Una buena inversión empieza por la tranquilidad.",
    },
    // La voz empieza a los 1,62 s (48,6 f) y acaba a los 3,97 s (119,1 f); el clip dura 4,88 s (146 f). `desde` 36 f entra DISOLVIENDO (el clip tiene 36 f antes) y la primera palabra suena a los 12,6 f del `en`: la música
    // baja con curva sobre ellos (10 f). El plano dura 101 f (hasta el golpe del f188): 18 f tras la última palabra, en los que la música sube. Se RECORTA la interjección que abre la toma (1,22-1,53 s).
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-076.ts`): si lo que se recorta es «Hoy,» (whisper), y «Una buena» (el primer onset tras el hueco de −60 dB).
    // Isabella viene del fondo del pasillo de la suite, con la cama a un lado y el televisor y el escritorio detrás.
    desde: fr(36),
    en: P.hook,
    dur: P.paseo - P.hook,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "La suite, con Isabella que viene del fondo del pasillo (la promesa): dice «una buena inversión empieza por la tranquilidad». Entra disolviendo desde el exterior; la música ya está abajo.",
  },
  // ── Bloque 3 · las zonas sociales del edificio: el gimnasio, la tienda y las bicicletas ──
  {
    id: "c03-gimnasio",
    bloque: 3,
    tipo: "video",
    src: v("zs01"),
    // ZS01 (iPhone, 4K HLG), del 3,50 al 5,70 s: las elípticas y las trotadoras junto a la ventana del gimnasio del edificio, la cámara avanza hacia ellas. La 074 usó el tramo 0,30-3,43 s de este clip; este es el que queda.
    // Entra A CORTE en el golpe de 17,8 dB que abre el paseo (f188).
    desde: 3.5,
    en: P.paseo,
    dur: P.tienda - P.paseo,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El gimnasio (una zona social del edificio): las elípticas y las trotadoras con la luz de la ventana; el golpe del paseo abre el descubrimiento y el hook ya prometió tranquilidad: lo que hay alrededor de la suite.",
  },
  {
    id: "c04-tienda",
    bloque: 3,
    tipo: "video",
    src: v("zs05"),
    // ZS05 (iPhone, 4K HLG), del 4,30 al 6,40 s: el interior de la tienda del edificio, con su mostrador de madera con luz, los estantes y el muro verde. Se salta el primer tramo del clip: de 0 a 2,5 s se ve el toldo con el
    // nombre de una marca de terceros y de 2,5 a ≈ 4,2 s, un cartel con el logotipo de la tienda en el cristal (comprobado en el render de la primera prueba). Sin personas.
    desde: 4.3,
    en: P.tienda,
    dur: P.bicis - P.tienda,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "La tienda del edificio (otra zona social, para el día a día del huésped): el mostrador con luz cálida y el muro verde; viene tras el gimnasio y antes del segundo vistazo al gimnasio.",
  },
  {
    id: "c05-bicicletas",
    bloque: 3,
    tipo: "video",
    src: v("zs02"),
    // ZS02 (iPhone, 4K HLG), del 5,50 al 7,97 s: el banco rojo y las bicicletas del gimnasio al fondo, con las vigas del techo; la cámara se aleja hacia las bicicletas. La 074 usó el tramo 2,00-5,40 s de este clip.
    desde: 5.5,
    en: P.bicis,
    dur: P.mitad - P.bicis,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El gimnasio otra vez, ahora con las bicicletas al fondo (cierra el paseo por las zonas sociales con una mirada amplia antes de volver a Isabella).",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md04"),
    audio: a("md04-voz"),
    voz: {
      s0: 0.58,
      s1: 4.28,
      lufs: -15,
      dice: "Invierte en una suite con vocación turística y ubicación estratégica.",
    },
    // La voz empieza a los 0,58 s (17,4 f) y acaba a los 4,28 s (128,4 f); el clip dura 4,94 s (148 f) y se usa desde su primer fotograma (`desde` 0): no hay 12 f antes de él para una disolvencia, así que entra A CORTE en
    // el golpe del f391, que suena entero; la música baja con curva en 10 f y la primera palabra suena a los 17,4 f. El plano dura 142 f (hasta el golpe del f533): 13,6 f tras la última palabra, en los que la música sube.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-076.ts`): «ubicación» y «estratégica» (whisper las oye «ubicaciones estratégicas» y «educación estratégica»).
    // Isabella, junto al ventanal de la suite, empieza de lado y se acerca sonriendo.
    desde: 0,
    en: P.mitad,
    dur: P.cama - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "Junto al ventanal (el porqué, dicho): Isabella se acerca y dice «invierte en una suite con vocación turística y ubicación estratégica». Entra a corte desde el gimnasio.",
  },
  // ── Bloque 5 · la cama, la repisa y la vista ──
  {
    id: "c07-cama",
    bloque: 5,
    tipo: "video",
    src: v("rc11"),
    // RC11 (iPhone, 4K HLG), del 0,20 al 2,77 s: de la cama king con el cojín al televisor y la repisa de madera con la planta. La 073 usó el tramo 3,0 s en adelante de este clip. Entra A CORTE en el golpe de 23,4 dB del f533.
    desde: 0.2,
    en: P.cama,
    dur: P.repisa - P.cama,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.08 }),
    reason:
      "La cama y la consola del televisor (cómo se vive): de la cama king a la repisa con la planta; lo que se encuentra el huésped al entrar a su habitación. Entra a corte en el golpe más fuerte de la rejilla.",
  },
  {
    id: "c08-repisa",
    bloque: 5,
    tipo: "video",
    src: v("rc08"),
    // RC08 (iPhone, 4K HLG), del 4,30 al 6,50 s: la repisa de madera con la escultura, la planta y la cortina gris junto al ventanal; la luz de la ciudad entra por la derecha. La 071 y la 075 usan 2,1-2,2 s hasta ≈ 4,6 s de este clip.
    desde: 4.3,
    en: P.repisa,
    dur: P.vista - P.repisa,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05 }),
    reason:
      "La repisa con la planta y la cortina (cómo se vive, al detalle): luz cálida y un rincón sereno junto al ventanal que anuncia la vista; el paseo se acerca a la ventana.",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc07"),
    // RC07 (iPhone, 4K HLG), del 2,70 al 6,23 s: de la cama sube hasta el ventanal con la repisa de ladrillo y la ciudad y las montañas de El Poblado al fondo. Entra A CORTE en el golpe de 10,5 dB (f676) y es el plano más
    // largo del bloque 5 (106 f): el clímax. Del clip quedan 2 f más.
    desde: 2.7,
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
    src: v("ct06"),
    audio: a("ct06-voz"),
    voz: {
      s0: 0.45,
      s1: 3.22,
      lufs: -15,
      dice: "Agenda una visita y descubre su potencial de inversión.",
    },
    // La voz empieza a los 0,45 s (13,5 f) y acaba a los 3,22 s (96,6 f); el clip dura 4,00 s (120 f). Solo hay 13,5 f antes de su primera palabra, así que entra A CORTE en el golpe del f782 (`desde` 1 f: la primera palabra suena a los
    // 12,5 f del golpe, que suena entero) y la música baja con curva en 10 f. El plano dura 116 f (acaba en el f117 del clip, 3 f antes de su final): 20 f tras la última palabra, en los que la imagen funde a negro (los últimos 6).
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-076.ts`): «Agenda» (la «A» suave: whisper la oye «Ag», 0,36) y «una» (0,56).
    // Primer plano de cara y hombros de Isabella, con el mueble de TV detrás.
    desde: fr(1),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "Primer plano de Isabella (la invitación): «agenda una visita y descubre su potencial de inversión»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-076.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-076/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_076 = P.cta + DUR_CTA + DUR_TARJETA;
