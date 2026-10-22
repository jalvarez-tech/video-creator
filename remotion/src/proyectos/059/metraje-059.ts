/**
 * EL RECORRIDO 059 — «Apartamento en Palmazera (La Ceja)», V41 del registro, tercer reel de este apartamento (reparto 054-062, `proyectos/054/reparto-054-062.md`) — los planos, como DATOS.
 *
 * Ángulo: «EL ESTRÉS NO VIENE SOLO DEL TRABAJO: vivir y trabajar bien», para quien trabaja desde casa o en híbrido con Rionegro o Medellín. El aéreo enseña el edificio de ladrillo con el prado y el pueblo
 * → el hook lo dice («sabes que el estrés a veces no viene solo del trabajo, a veces viene de donde vives») → el paseo enseña DÓNDE SE VIVE (la sala con la luz del ventanal, el comedor con la cocina, el balcón
 * abierto) → la mitad lo resuelve («zona de trabajo separada, porque trabajar desde la cama ya no es una opción») → la zona de trabajo misma (la alcoba 2 con el escritorio, el portátil y la ventana) → la vista
 * del pueblo y las montañas desde arriba → el CTA («si estás buscando paz y comodidad, escríbeme y te doy todos los detalles»).
 * Estructura del canal: DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA, con TRES frases de Isabella.
 *
 *   hook   HK04  `IMG_8734` «Sabes que el estrés a veces no viene solo del trabajo, a veces viene de donde vives.»   (exclusiva de esta pieza, reparto)
 *   mitad  MD09  `IMG_8738` «Zona de trabajo separada, porque trabajar desde la cama ya no es una opción.»          (exclusiva de esta pieza, reparto)
 *   CTA    CT03  `IMG_8727` «Si estás buscando paz y comodidad, escríbeme y te doy todos los detalles.»               (exclusiva de esta pieza, reparto)
 *   aéreo  DR09 (`DJI_…0088`) para abrir y DR10 (`DJI_…0089`) para la vista: del reparto de esta pieza (DR07-DR10; DR01-DR06 son de las otras dos versiones). 4K VERTICAL (rotation=90), SDR, 29,97 fps.
 *
 * LO QUE ES DE ESTA PIEZA Y LO QUE COMPARTE (`proyectos/059/combinaciones.md`). NINGUNA cifra escrita aparte de los subtítulos de lo que ella dice (en estas tres frases no hay ninguna). Los recorridos RC09, RC10,
 * RC13, RC24 y RC28 son un hilo propio (la sala con luz · el comedor y la cocina · el balcón · la alcoba 2 que es la zona de trabajo · la ventana y el escritorio); los otros dos reels del apartamento (057, 058)
 * usan otros tramos y se declaran en `combinaciones.md` (coordinados entre las tres sesiones el 2026-10-22: `side-session-notes/…/05x-tramos-de-recorrido.md`).
 *
 *   bloque 1  c01                  el edificio: DR09 3,20-6,07 s, el dron baja sobre el prado hacia la fachada de ladrillo y las tejas, a velocidad casi uniforme desde el f0; SIN TEXTO NI VOZ
 *   bloque 2  c02                  Isabella en la alcoba principal, con el espejo de pie y la lámpara: el hook (entra disolviendo; su primera palabra suena a los 11 f del golpe)
 *   bloque 3  c03 c04 c05          DÓNDE SE VIVE: del sofá al ventanal con la luz de la tarde (RC09) → de la tele y la silla al comedor y la cocina (RC10) → el balcón abierto con el cielo y los edificios (RC13)
 *   bloque 4  c06                  Isabella sentada en el rincón del pasillo, con las repisas blancas y la estantería: la mitad
 *   bloque 5  c07 c08 c09          LA ZONA DE TRABAJO: pasa la puerta de la alcoba 2 y aparece el escritorio con su ventana (RC24) → la ventana con el cielo y el prado, y baja al portátil (RC28) → LA VISTA: el aéreo
 *                                  que se desliza sobre el pueblo con las montañas y las nubes (DR10 5,40 s, el plano más largo del bloque)
 *   bloque 6  c10 c11              Isabella de pie en el pasillo, con la luz de la ventana al fondo: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO. La canción es «Light Fills the Room» (downtempo/chill de pulso, ≈ 88 BPM, PLANA: sin crescendo ni caída): la rejilla son los golpes MEDIDOS (`musica/golpes-cancion-entera.json`;
 * `buscar-cortes-059.py`, estructura de 9 planos + CTA) y cada cambio de plano cae en uno (≥ 16,0 dB las disolvencias, que ACABAN en él; ≥ 16,8 dB los cortes secos). Entra en su golpe de 147,421 s (33,6 dB):
 * es una sección que no usan la V22/039 (104,5-141 s) ni la V9/025 (179,5 s en adelante, salvo 5 s). La canción no cae sola: tras la última palabra del CTA se APAGA con curva bajo la tarjeta (la 039 hizo igual).
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(12)` = 12/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS. Un plano que entra
 * disolviendo (`disolver`) empieza a verse 12 f ANTES de su `en` (`solapeDe`): su clip tiene que tener esos 12 f antes de `desde`, y el plano anterior dura hasta ese `en`.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f97, 3,2 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la
 * prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-059.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-059";

export const FPS_059 = 30;

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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −21,9 · −24,3 · −23,1 LUFS en su ventana de voz (habla a unos metros
 * de un iPhone); cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS)
 * hasta −15,0 LUFS con el pico real a −2,5 dBFS o menos, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Light Fills the Room» — `archivos/musica/Light Fills the Room.mp3` (sha 8 `b3c8b7c6`), downtempo/chill de pulso, 3:34, plana (−11…−14,5 LUFS por tramos de 5 s) con 368 golpes de ≥ 6 dB. Se entra en su golpe de
 * 147,421 s (33,6 dB). Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir»): `proyectos/059/musica/golpes-cancion-entera.json`
 * (`medir-pista.py --json`). La rejilla la dio `buscar-cortes-059.py` con estos planos: ver `musica/rejilla-059.txt`.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 147.421, db: 33.6 },
  /** La disolvencia al hook ACABA aquí (la imagen de Isabella ya es opaca): el golpe suena entero y la música baja con curva después. */
  hook: { t: 150.163, db: 31.7 },
  /** Cortes secos del paseo. */
  paseo1: { t: 155.303, db: 33.5 },
  paseo2: { t: 158.235, db: 16.8 },
  paseo3: { t: 161.135, db: 22.3 },
  /** La disolvencia a la mitad ACABA aquí. */
  mitad: { t: 163.715, db: 16.0 },
  /** Cortes secos del bloque 5. */
  trabajo: { t: 168.876, db: 17.7 },
  ventana: { t: 171.603, db: 23.3 },
  vista: { t: 174.686, db: 17.6 },
  /** El corte seco al CTA: el golpe suena entero y la música baja DESPUÉS; la primera palabra suena a los 11 f. */
  cta: { t: 178.118, db: 18.9 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (147,421 s) cae en el frame 3 de la pieza; redondeado a un frame (4421/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 4421 / FPS_059;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_059;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_059;

/** Isabella: un empuje lento hacia ella (hablan a cámara quietas: el empuje les da vida). Los recorridos y el aéreo, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-059/${id}.mp4`;
const a = (id: string): string => `recorrido-059/${id}.wav`;

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
 * Los frames de cada cambio de plano: todos salen de `golpe(...)`, así que mover la entrada de la música es cambiar `INICIO_MUSICA`. Los que entran disolviendo (hook, mitad) tienen aquí el `en` de la
 * disolvencia YA TERMINADA: el plano anterior dura hasta él y el siguiente empieza a verse 12 f antes.
 */
const P = {
  hook: golpe(GOLPE.hook), //       86 · Isabella ya es opaca; su primera palabra suena 11 f después
  paseo: golpe(GOLPE.paseo1), //   240 · acaba el hook; el golpe abre el paseo (a corte)
  comedor: golpe(GOLPE.paseo2), // 328 · el comedor y la cocina (a corte)
  balcon: golpe(GOLPE.paseo3), //  415 · el balcón (a corte)
  mitad: golpe(GOLPE.mitad), //    492 · Isabella con la mitad (disuelve)
  trabajo: golpe(GOLPE.trabajo), // 647 · la alcoba 2 (a corte)
  ventana: golpe(GOLPE.ventana), // 729 · la ventana y el escritorio (a corte)
  vista: golpe(GOLPE.vista), //    821 · la vista desde el aire (a corte)
  cta: golpe(GOLPE.cta), //        924 · Isabella con el CTA (a corte)
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 4,555 s (136,6 f) y desde `desde` (3 f) hasta el f134 del clip hay 131. Su voz va de 0,46 a 4,22 s (f925 a f1047,6 de la comp): 7 f (0,24 s) de su cara tras la
 * última palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela: el plano acaba 2,6 f antes del final del clip.
 */
const DUR_CTA = 131;

/**
 * Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero 2 f antes del final de la pieza (la tarjeta va en silencio), como la 039: la canción es plana y no resuelve
 * sola. Su archivo decodificado dura 214 s, de sobra (la pieza acaba en el f1115, a los 184,5 s de la canción).
 */
export const FIN_MUSICA_059 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje059: readonly Corte[] = [
  // ── Bloque 1 · el edificio ──
  {
    id: "c01-edificio",
    bloque: 1,
    tipo: "video",
    src: v("dr09"),
    // DR09 (4K vertical, SDR, soleado), del 3,20 al 6,07 s del archivo normalizado: el dron avanza en diagonal sobre el prado y el edificio de ladrillo con sus tejas, que desde el primer fotograma ocupa la
    // esquina de arriba a la derecha y al final llena la mitad del cuadro (con el camino y los jardines). Movimiento casi uniforme (10,9, dispersión 0,079, pendiente +0,27: arranca ya a velocidad y acelera un
    // poco, como un dron; `ventana-fina.py`). Se prefirió al tramo de 1,9 s (el más uniforme, 0,057) porque su frame 0 era casi todo prado y el frame 0 es la miniatura. Entra a corte con el golpe de 33,6 dB del f3.
    desde: 3.2,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.05, shadows: 0.12, highlights: -0.3, saturation: 1.06 }),
    reason:
      "El edificio visto desde arriba (la promesa): la fachada de ladrillo con sus tejas y el prado verde. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de donde se vive.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk04"),
    audio: a("hk04-voz"),
    voz: {
      s0: 0.78,
      s1: 4.55,
      lufs: -15,
      dice: "Sabes que el estrés a veces no viene solo del trabajo, a veces viene de donde vives.",
    },
    // La voz empieza a los 0,78 s (23,4 f) y acaba a los 4,45 s (133,5 f); el clip dura 9,46 s (284 f) y después de la frase hay silencio y un ruido sin voz (7,6-8,3 s: no se usa). `desde` 12 f entra DISOLVIENDO (el
    // clip tiene 12 f antes) y la primera palabra suena a los 11,4 f del `en`: la música baja con curva sobre 10 f. El plano dura 154 f (hasta el golpe del f240): 32 f tras la última palabra, en los que la música sube.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-059.ts`): «el estrés» (whisper oye «la estresa»), «del trabajo» (oye «el trabajo») y «vives» (oye «vive»).
    // Isabella de pie en la alcoba principal, con la cama y los cojines delante, la lámpara y el espejo de pie detrás; habla casi sin moverse.
    desde: fr(12),
    en: P.hook,
    dur: P.paseo - P.hook,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, exposure: -0.05, highlights: -0.2, whites: -0.1, saturation: 1.04 }),
    reason:
      "Alcoba principal (el descanso, lo contrario del estrés): Isabella dice «sabes que el estrés a veces no viene solo del trabajo, a veces viene de donde vives». Entra disolviendo desde el aéreo; la música ya está abajo.",
  },
  // ── Bloque 3 · dónde se vive: la sala con luz, el comedor y la cocina, el balcón ──
  {
    id: "c03-sala",
    bloque: 3,
    tipo: "video",
    src: v("rc09"),
    // RC09 (iPhone, 1080×1920, SDR), del 0,30 al 3,23 s: del sofá gris con la sansevieria y la planta sobre la mesa auxiliar al ventanal, que se abre a la ciudad y las montañas; la cámara gira a la derecha. Es la sala
    // vista como un sitio donde la luz entra, no como una oficina. Entra A CORTE en el golpe de 33,5 dB que abre el paseo (f240). El resto del clip (3,23-4,9 s: el ventanal con la vista) es de la 057.
    desde: 0.3,
    en: P.paseo,
    dur: P.comedor - P.paseo,
    zoom: QUIETO,
    entra: "corte",
    color: color({ shadows: 0.1, highlights: -0.3, whites: -0.15, saturation: 1.06 }),
    reason:
      "La sala con luz (dónde se vive): del sofá y las plantas al ventanal con la ciudad y las montañas; el golpe del paseo abre el descubrimiento de la casa que descansa.",
  },
  {
    id: "c04-comedor",
    bloque: 3,
    tipo: "video",
    src: v("rc10"),
    // RC10 (iPhone, 1080×1920, SDR), del 1,60 al 4,50 s: la tele con la silla de cuero y las plantas, la mesa de comedor redonda con las sillas blancas y, al fondo, la cocina con el mesón gris. El paseo sigue
    // de la sala al comedor y la cocina, a la derecha como el plano anterior.
    desde: 1.6,
    en: P.comedor,
    dur: P.balcon - P.comedor,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.02, shadows: 0.2, highlights: -0.25, whites: -0.1, saturation: 1.06 }),
    reason:
      "El comedor y la cocina (dónde se come y se descansa): de la tele y la silla a la mesa redonda y la cocina al fondo; el espacio ordenado que se ve al llegar.",
  },
  {
    id: "c05-balcon",
    bloque: 3,
    tipo: "video",
    src: v("rc13"),
    // RC13 (iPhone, 1080×1920, SDR), del 0,00 al 2,57 s: el balcón abierto con el cielo de nubes, los edificios y las montañas, y la cámara gira hacia dentro, por la sansevieria, hasta el sofá: la puerta del balcón para
    // cortar la jornada. Entra A CORTE en el f415. La 057 puede usar este clip a partir de los 2,57 s.
    desde: 0.0,
    en: P.balcon,
    dur: P.mitad - P.balcon,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.2, shadows: 0.15, highlights: -0.35, whites: -0.2, saturation: 1.06 }),
    reason:
      "El balcón abierto (el respiro): el cielo, los edificios y las montañas; y vuelve a la sala. Es el sitio donde se corta la jornada, el último paso antes de la mitad.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md09"),
    audio: a("md09-voz"),
    voz: {
      s0: 0.98,
      s1: 4.98,
      lufs: -15,
      dice: "Zona de trabajo separada, porque trabajar desde la cama ya no es una opción.",
    },
    // La voz empieza a los 0,98 s (29,4 f) y acaba a los 4,98 s (149,4 f); el clip dura 7,81 s (234 f); un ruido a los 0,04-0,18 s y otro a los 5,9-6,1 s quedan fuera de la ventana. `desde` 17 f entra DISOLVIENDO (el
    // clip tiene 17 f antes) y la primera palabra suena a los 12,4 f del `en`: la música baja con curva sobre 10 f. El plano dura 155 f: 22 f tras la última palabra, en los que la música sube antes del golpe del f647.
    // Isabella sentada en la silla del rincón del pasillo, con las repisas blancas, la estantería y las flores; habla con las manos.
    desde: fr(17),
    en: P.mitad,
    dur: P.trabajo - P.mitad,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, exposure: -0.08, highlights: -0.2, whites: -0.1, saturation: 1.04 }),
    reason:
      "El rincón del pasillo (la zona de trabajo, dicha): Isabella dice «zona de trabajo separada, porque trabajar desde la cama ya no es una opción». Entra disolviendo desde el balcón; la alcoba 2 va justo después.",
  },
  // ── Bloque 5 · la zona de trabajo y la vista ──
  {
    id: "c07-trabajo",
    bloque: 5,
    tipo: "video",
    src: v("rc24"),
    // RC24 (iPhone, 1080×1920, SDR), del 1,20 al 3,93 s: la cámara pasa la puerta de la alcoba 2 y el cuarto se abre: el escritorio de madera con el portátil, la silla blanca, la ventana con la planta colgante, la cama
    // al lado. La zona de trabajo vista desde la puerta: lo que la mitad acaba de decir. Entra A CORTE en el golpe de 17,7 dB (f647).
    desde: 1.2,
    en: P.trabajo,
    dur: P.ventana - P.trabajo,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.0, shadows: 0.15, highlights: -0.25, whites: -0.1, saturation: 1.06 }),
    reason:
      "La alcoba 2, la zona de trabajo (el espacio que separa el trabajo de la cama): la cámara pasa la puerta y aparece el escritorio con el portátil y la ventana; lo que la frase de Isabella acaba de decir.",
  },
  {
    id: "c08-ventana",
    bloque: 5,
    tipo: "video",
    src: v("rc28"),
    // RC28 (iPhone, 1080×1920, SDR), del 0,00 al 3,07 s: la ventana de la alcoba 2 con el cielo de nubes, los edificios y el prado; la cámara baja al escritorio con el monitor y el portátil, la silla blanca y la planta.
    // La luz de la ventana sobre el sitio de trabajo.
    desde: 0.0,
    en: P.ventana,
    dur: P.vista - P.ventana,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.25, shadows: 0.3, highlights: -0.4, whites: -0.2, saturation: 1.06 }),
    reason:
      "La ventana y el escritorio (trabajar con luz): el cielo y el prado al otro lado del vidrio y, abajo, el portátil; se trabaja mirando el paisaje y a cinco pasos de la cama, pero separado de ella.",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("dr10"),
    // DR10 (4K vertical, SDR, soleado), del 5,40 al 8,83 s del archivo normalizado: el dron se desliza sobre el pueblo de La Ceja con el edificio de ladrillo en el borde inferior, la llanura y las montañas con las nubes al
    // fondo. Movimiento uniforme (3,1, dispersión 0,015: `ventana-fina.py`). Entra A CORTE en el golpe de 17,6 dB (f821) y es el plano más largo del bloque 5 (103 f): el clímax. Un empuje lento mantiene la vida.
    desde: 5.4,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: [1.0, 1.06],
    entra: "corte",
    color: color({ exposure: 0.0, shadows: 0.1, highlights: -0.35, whites: -0.2, saturation: 1.08 }),
    reason:
      "El pueblo y las montañas desde arriba (la vista, el clímax): se desliza sobre La Ceja con las nubes al fondo, el sitio donde se vive y se trabaja bien. El plano más largo del bloque.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct03"),
    audio: a("ct03-voz"),
    voz: {
      s0: 0.46,
      s1: 4.22,
      lufs: -15,
      dice: "Si estás buscando paz y comodidad, escríbeme y te doy todos los detalles.",
    },
    // La voz empieza a los 0,46 s (13,8 f) y acaba a los 4,22 s (126,6 f); el clip dura 4,555 s (136,6 f). La toma NO tiene 12 f de silencio previos que permitan disolver (su primera sílaba cae a los 13,8 f): entra A
    // CORTE con `desde` 3 f, y la primera palabra suena a los 10,8 f del `en`: el golpe de 18,9 dB suena entero y la música baja con curva DESPUÉS, acabando 1 f antes de la palabra. El plano dura 131 f (acaba en el f134
    // del clip, 2,6 f antes de su final): 7 f tras la última palabra, en los que la imagen funde a negro (los últimos 6).
    // Isabella de pie en el pasillo, con la luz de la ventana al fondo; camina hacia cámara.
    desde: fr(3),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, highlights: -0.2, whites: -0.1, saturation: 1.04 }),
    reason:
      "El pasillo con la luz de la ventana (la invitación): Isabella dice «si estás buscando paz y comodidad, escríbeme y te doy todos los detalles»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-059.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-059/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_059 = P.cta + DUR_CTA + DUR_TARJETA;
