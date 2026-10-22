/**
 * EL RECORRIDO 062 — «Apartaestudio Quadrato (Laureles, Medellín)», V44 del registro, tercer reel de este apartaestudio (reparto 054-062, `proyectos/054/reparto-054-062.md`) — los planos, como DATOS.
 *
 * Ángulo: «MEDELLÍN, TERCER MERCADO DE RENTA CORTA» — el de ciudad y barrio: dónde está y por qué ahí. Es la única de las tres propiedades que se vende como INVERSIÓN (rentas cortas) y no hay dron: el aéreo del
 * formato lo hace la AZOTEA del edificio con la vista abierta de Medellín y las montañas. El hilo es «DE LA AZOTEA AL ESTUDIO»: la ciudad (la apertura) → Isabella en esa azotea, saliendo del ascensor, dice el dato de
 * mercado → el paseo enseña el edificio (el jacuzzi con la ciudad detrás, la pérgola abierta a las montañas, la sala de juntas) → la mitad la dice Isabella ya DENTRO del estudio («Laureles es uno de los mejores barrios con
 * mayor ocupación en la ciudad de Medellín») → el estudio, lo justo para entender qué se compra (la cama con el panel de listones, la cocina equipada, el balcón con la ciudad) → el CTA, sentada en su escritorio.
 * Estructura del canal: AZOTEA · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA, con TRES frases de Isabella.
 *
 *   hook   HK02  `HOOK2.MOV`  «Medellín ya es el tercer mercado más grande de renta corta de Latinoamérica.»                (exclusiva de esta pieza, reparto)
 *   mitad  MD02  `MEDIO3.MOV` «Laureles es uno de los mejores barrios con mayor ocupación en la ciudad de Medellín.»          (exclusiva de esta pieza, reparto; el catálogo no lleva «mejores» y dice «de la ciudad»: ver `subtitulos-062.ts`)
 *   CTA    CT02  `CTA2.MOV`   «¿Y tú qué esperas para conocerlo? Haz clic en el enlace y agendemos una visita.»             (exclusiva de esta pieza, reparto)
 *
 * LAS DOS AFIRMACIONES DE MERCADO («el tercer mercado más grande de renta corta de Latinoamérica» y «uno de los mejores barrios con mayor ocupación») las dice LA VOZ DE ISABELLA y se quedan ahí: nadie ha verificado esas cifras, así que NO hay
 * rótulo propio del canal que las repita, ni cifra en pantalla, ni promesa de rentabilidad (la ficha de la web advierte que los ingresos varían por temporada). Lo único que sale escrito es la transcripción de su voz
 * (los subtítulos editoriales, el modo de texto del canal); la versión con ficha va SIN subtítulos.
 *
 * LO QUE ES DE ESTA PIEZA Y LO QUE COMPARTE (`proyectos/062/combinaciones.md`). Los recorridos son un hilo propio (la azotea · el edificio · el estudio); los otros dos reels del apartaestudio (060, 061) pueden repetir
 * planos y se declaran en `combinaciones.md` (coordinados entre las tres sesiones el 2026-10-22: `side-session-notes/…/062-tramos-de-recorrido.md`).
 *
 *   bloque 1  c01                  la azotea: ZC29, de las hojas al skyline de Medellín con las montañas y el árbol del barril, y a la derecha el jacuzzi con el edificio; SIN TEXTO NI VOZ
 *   bloque 2  c02                  Isabella en la azotea, saliendo del ascensor hacia cámara con las montañas detrás: el hook (entra a CORTE en un golpe; su primera palabra suena a los 15,6 f; dura TODO el clip, 145 f)
 *   bloque 3  c03 c04 c05          EL EDIFICIO: el jacuzzi con el skyline detrás (ZC10) → la pérgola abierta a las montañas (ZC21) → la sala de juntas, el coworking (ZC06)
 *   bloque 4  c06                  Isabella entrando al estudio, con la cama delante y el pasillo detrás: la mitad
 *   bloque 5  c07 c08 c09          EL ESTUDIO: la cama con el panel de listones retroiluminado y el balcón al fondo (RC12) → el escritorio y la cocina equipada (RC04) → EL BALCÓN con la ciudad y, al entrar, la tele y la cama (RC18, el
 *                                  plano más largo del bloque)
 *   bloque 6  c10 c11              Isabella sentada en su escritorio, con la cama delante: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO. La canción es «In This Together» (cinematic emocional, Mi menor): una intro con PULSO de 1 s (golpes de 11-33 dB cada segundo) que crece hasta una meseta a los 25 s. Se entra en su golpe de
 * 6,995 s (21,1 dB), cuando ya late el pulso, y la rejilla son golpes MEDIDOS (`musica/golpes-cancion-entera.json`; `buscar-cortes-062.py`): el hook entra a corte en el golpe de 13,5 dB; la mitad (la disolvencia ACABA
 * en él) en el de 20,2 dB; los cortes secos del paseo y del estudio caen en golpes de 8,1-11,9 dB (los del final de la canción-intro son flojos: 8-9 dB, como los de la V31/049 con la misma canción). Las disolvencias
 * (mitad → estudio y vista → CTA) acaban en un golpe medido pero no lo exigen; la salida del hook no cae en ninguno (el hook dura todo su clip, 145 f). La canción no cae sola: tras la última palabra del CTA se APAGA con curva bajo la tarjeta.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(12)` = 12/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS. Un plano que entra
 * disolviendo (`disolver`) empieza a verse 12 f ANTES de su `en` (`solapeDe`): su clip tiene que tener esos 12 f antes de `desde`, y el plano anterior dura hasta ese `en`.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f111, 3,7 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la
 * prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-062.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-062";

export const FPS_062 = 30;

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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −22,8 · −23,1 · −26,0 LUFS en su ventana de voz (habla a unos metros
 * de un iPhone); cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS)
 * hasta −15,0 LUFS con el pico real a −2,5 dBFS o menos, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «In This Together» — `archivos/musica/In This Together.mp3` (sha 8 `bd507fe6`), 3:36, cinematic emocional en Mi menor: intro con pulso de 1 s (0-25 s, de −27 a −20 LUFS), meseta de −14 a −10 LUFS hasta los 136 s,
 * un silencio a los 137-138 s y una segunda meseta hasta el fundido final (200 s). 304 golpes de ≥ 6 dB. Se entra en su golpe de 6,995 s (21,1 dB). Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida
 * de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir»): `proyectos/062/musica/golpes-cancion-entera.json` (`medir-pista.py --json`). La rejilla la dio `buscar-cortes-062.py`: `musica/rejilla-062.txt`.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 6.995, db: 21.1 },
  /** El hook entra A CORTE en este golpe: suena entero y la música baja con curva DESPUÉS, acabando antes de su primera palabra (15,6 f). */
  hook: { t: 10.038, db: 13.5 },
  /** Cortes secos del paseo. */
  paseo2: { t: 16.994, db: 11.9 },
  paseo3: { t: 20.004, db: 10.8 },
  /** La disolvencia a la mitad ACABA aquí. */
  mitad: { t: 22.983, db: 20.2 },
  /** La disolvencia de la mitad al estudio acaba aquí; los dos cortes secos siguientes, en golpes flojos. */
  estudio1: { t: 28.154, db: 9.0 },
  estudio2: { t: 31.002, db: 8.1 },
  vista: { t: 33.956, db: 8.5 },
  /** La disolvencia al CTA ACABA aquí: el golpe suena entero y la música baja DESPUÉS, antes de la primera palabra. */
  cta: { t: 38.003, db: 11.3 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (6,995 s) cae en el frame 3 de la pieza; redondeado a un frame (208/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 208 / FPS_062;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_062;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_062;

/** Isabella: un empuje lento hacia ella (hablan a cámara quietas: el empuje les da vida). Los recorridos, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-062/${id}.mp4`;
const a = (id: string): string => `recorrido-062/${id}.wav`;

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
 * Los frames de cada cambio de plano: todos salen de `golpe(...)`, así que mover la entrada de la música es cambiar `INICIO_MUSICA`. Los que entran disolviendo (paseo1, mitad, estudio1, cta) tienen aquí el `en` de la
 * disolvencia YA TERMINADA: el plano anterior dura hasta él y el siguiente empieza a verse 12 f antes.
 */
/**
 * Frames que dura la toma del hook: TODO el clip de HK02 (4,835 s = 145 f, de su f0 al f144). El usuario pidió (rev. 2) que el vídeo siguiera un momento más tras «Latinoamérica»: con la rejilla anterior la imagen
 * de Isabella se disolvía 2 f después de su última palabra (f217) y la voz parecía cortarse; ahora su imagen se ve opaca hasta el f228 (11 f, 0,37 s tras la palabra) y sigue en la disolvencia hasta el f240. Es el máximo
 * que da la toma: el clip no tiene más. Por eso la salida del hook (`paseo1`) ya no cae en un golpe de la canción (es una disolvencia, y no lo exige).
 */
const DUR_HOOK = 145;
const HOOK_EN = golpe(GOLPE.hook);

const P = {
  hook: HOOK_EN, //                    95 · Isabella entra A CORTE; su primera palabra suena 15,6 f después
  paseo1: HOOK_EN + DUR_HOOK, //      240 · acaba la salida del hook: el jacuzzi (disuelve; sin golpe: el hook se ve hasta el último fotograma de su toma)
  paseo2: golpe(GOLPE.paseo2), //    303 · la pérgola abierta (a corte)
  paseo3: golpe(GOLPE.paseo3), //    394 · la sala de juntas (a corte)
  mitad: golpe(GOLPE.mitad), //      483 · Isabella con la mitad (disuelve)
  estudio1: golpe(GOLPE.estudio1), // 638 · la cama con los listones (disuelve)
  estudio2: golpe(GOLPE.estudio2), // 724 · la cocina (a corte)
  vista: golpe(GOLPE.vista), //      812 · el balcón con la ciudad (a corte)
  cta: golpe(GOLPE.cta), //          934 · Isabella con el CTA (disuelve)
} as const;

/**
 * Frames que dura la toma del CTA: su voz va de 1,23 a 5,38 s del clip (con `desde` 24 f: f947 a f1071 de la comp); el plano dura 145 f, o sea hasta el f1079 y 7 f (0,24 s) de su cara tras la última palabra, en los
 * que la imagen funde a negro (los últimos 6). El clip dura 6,03 s (181 f) y el plano usa de 24 a 169: nada se congela.
 */
const DUR_CTA = 145;

/**
 * Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero 2 f antes del final de la pieza (la tarjeta va en silencio): la canción no resuelve sola en esta sección.
 * Su archivo decodificado dura 216 s, de sobra (la pieza acaba en el f1139, a los 45 s de la canción).
 */
export const FIN_MUSICA_062 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje062: readonly Corte[] = [
  // ── Bloque 1 · la azotea ──
  {
    id: "c01-azotea",
    bloque: 1,
    tipo: "video",
    src: v("zc29"),
    // ZC29 (TERRAZA Y JACUZZI (9), iPhone, 1080×1920, SDR), del 3,45 al 6,62 s: del skyline de Medellín con las montañas, las nubes y el árbol en su barril, la cámara gira a la derecha hasta el jacuzzi y el edificio
    // de la azotea. Es la vista abierta (la promesa) y acaba en lo que el edificio ofrece. Sale SIN la lona negra del suelo, que se ve en el borde izquierdo hasta los 3,3 s (a los 3,0 s todavía se veía en el frame 0, la miniatura). Entra a corte con el golpe de 21,1 dB del f3.
    desde: 3.45,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.15, shadows: 0.15, highlights: -0.3, saturation: 1.04 }),
    reason:
      "La azotea con la vista abierta de Medellín y las montañas (la promesa, en lugar del dron): el skyline, el árbol en su barril y, a la derecha, el jacuzzi del edificio. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de la ciudad.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk02"),
    audio: a("hk02-voz"),
    voz: {
      s0: 0.52,
      s1: 4.08,
      lufs: -15,
      dice: "Medellín ya es el tercer mercado más grande de renta corta de Latinoamérica.",
    },
    // La voz empieza a los 0,52 s (15,6 f) y acaba a los 4,05 s (121,5 f); el clip dura 4,835 s (145 f) y tras la frase hay un golpe suelto a 4,20-4,27 s que NO es voz y queda fuera. La toma NO deja 12 f de silencio
    // previos que permitan disolver con la música ya bajando (su primera sílaba cae a los 15,6 f): entra A CORTE en el golpe del f95 con `desde` 0 (el primer fotograma del clip), y la primera palabra suena a los 15,6 f: el
    // golpe de 13,5 dB suena entero y la música baja con curva DESPUÉS, acabando 5,6 f antes de la palabra. El plano dura 145 f, TODO el clip (hasta el f240, el del paseo): 23,5 f tras la última palabra. La imagen es opaca
    // hasta el f228 y disuelve al jacuzzi en los 12 f finales (rev. 2: antes duraba 133 f y la disolvencia empezaba 2 f tras la palabra).
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-062.ts`): «mercado» (whisper oye «buscado»; la medida de la vocal dice [e]+[a]+[o], no [u]).
    // Isabella sale del ascensor de la azotea y camina hacia cámara con la pérgola, las plantas y las montañas detrás; sonríe y habla.
    desde: 0,
    en: P.hook,
    dur: DUR_HOOK,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, exposure: -0.2, highlights: -0.25, whites: -0.1, saturation: 1.04 }),
    reason:
      "La azotea del edificio (donde está la ciudad): Isabella sale del ascensor con las montañas detrás y dice «Medellín ya es el tercer mercado más grande de renta corta de Latinoamérica». Entra a corte desde la vista; la música ya está abajo.",
  },
  // ── Bloque 3 · el edificio: el jacuzzi con el skyline, la pérgola abierta a las montañas, la sala de juntas ──
  {
    id: "c03-jacuzzi",
    bloque: 3,
    tipo: "video",
    src: v("zc10"),
    // ZC10 (TERRAZA Y JACUZZI (12), iPhone, 1080×1920, SDR, 3,47 s), del 0,40 al 2,90 s: el borde del jacuzzi con el agua turquesa que se acerca, y detrás el skyline de ladrillo, las montañas y la losa de la pérgola. Entra
    // DISOLVIENDO desde el hook (el clip tiene 12 f antes de su `desde`).
    desde: 0.4,
    en: P.paseo1,
    dur: P.paseo2 - P.paseo1,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ blacks: -0.02, shadows: 0.25, highlights: -0.25, saturation: 1.06 }),
    reason:
      "El jacuzzi del edificio con el skyline detrás (lo que el huésped ve al llegar arriba): el agua turquesa y la ciudad con las montañas; es lo que Isabella acaba de decir que hace de Medellín un mercado.",
  },
  {
    id: "c04-pergola",
    bloque: 3,
    tipo: "video",
    src: v("zc21"),
    // ZC21 (TERRAZA Y JACUZZI (22), iPhone, 1080×1920, SDR, 5,27 s), del 2,10 al 5,13 s: la pérgola de la azotea, la columna negra que pasa, los dos jacuzzis y las mesas con la sombra de la tarde, y al fondo las montañas y las
    // torres de la ciudad: la azotea ABIERTA. Entra A CORTE en el golpe de 11,9 dB (f303).
    desde: 2.1,
    en: P.paseo2,
    dur: P.paseo3 - P.paseo2,
    zoom: QUIETO,
    entra: "corte",
    color: color({ blacks: -0.02, shadows: 0.3, highlights: -0.25, saturation: 1.06 }),
    reason:
      "La pérgola abierta a las montañas (el sitio donde se queda uno a mirar la ciudad): las mesas, los jacuzzis y, al fondo, el skyline y la cordillera; el paseo sigue del agua al conjunto de la azotea.",
  },
  {
    id: "c05-juntas",
    bloque: 3,
    tipo: "video",
    src: v("zc06"),
    // ZC06 (SALA DE JUNTAS (6), iPhone, 1080×1920, SDR, 6,17 s), del 1,00 al 3,97 s: la sala de juntas del edificio, con la mesa blanca, las sillas negras, la pantalla y los paneles de madera; la cámara gira a la derecha.
    // Es el coworking y la sala de reuniones de la ficha: la otra amenidad del edificio, ya bajo techo, antes de entrar al estudio. Entra A CORTE en el golpe de 10,8 dB (f394).
    desde: 1.0,
    en: P.paseo3,
    dur: P.mitad - P.paseo3,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.3, shadows: 0.1, highlights: -0.3, whites: -0.1, saturation: 1.04 }),
    reason:
      "La sala de juntas del edificio (coworking): la mesa blanca, las sillas y la pantalla; se baja de la azotea a lo de dentro del edificio, justo antes de entrar al estudio.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md02"),
    audio: a("md02-voz"),
    voz: {
      s0: 0.86,
      s1: 5.0,
      lufs: -15,
      dice: "Laureles es uno de los mejores barrios con mayor ocupación en la ciudad de Medellín.",
    },
    // La voz empieza a los 0,86 s (25,8 f) y acaba a los 4,99 s (149,7 f); el clip dura 5,635 s (169 f); unos chasquidos a los 0-0,16 s (−28 dB) y un soplo a los 0,44-0,74 s quedan fuera de la ventana tratada. `desde`
    // 12 f entra DISOLVIENDO (el clip tiene 12 f antes) y la primera palabra suena a los 13,8 f del `en`: la música baja con curva sobre 10 f. El plano dura 155 f (usa del f12 al f167 del clip, que tiene 169): 17 f tras
    // la última palabra, en los que la imagen disuelve al estudio.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-062.ts`): «mejores» (el catálogo no la lleva; whisper la oye en 6 de 7 cortes aislados y la envolvente pide 7 sílabas entre «uno» y «barrios»), «con mayor» (whisper oye «como ayer») y «en la ciudad» (el catálogo dice «de»).
    // Isabella al fondo del estudio, de pie junto a la puerta; camina hacia cámara por el pasillo con la cama en primer plano.
    desde: fr(12),
    en: P.mitad,
    dur: P.estudio1 - P.mitad,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, exposure: 0.18, highlights: -0.2, whites: -0.1, saturation: 1.04 }),
    reason:
      "La entrada del estudio (donde acaba el paseo del edificio): Isabella llega desde el fondo y dice «Laureles es uno de los mejores barrios con mayor ocupación en la ciudad de Medellín». Entra disolviendo desde la sala de juntas; el estudio va justo después.",
  },
  // ── Bloque 5 · el estudio: la cama, la cocina y el balcón con la ciudad ──
  {
    id: "c07-cama",
    bloque: 5,
    tipo: "video",
    src: v("rc12"),
    // RC12 (ESTUDIO (3), iPhone, 1080×1920, SDR, 6,67 s), del 0,40 al 3,27 s: la cama con el panel de listones y su luz cálida, el cabecero y el sofá; la cámara gira a la derecha hasta la puerta del balcón con su cortina de
    // listones y el aire acondicionado, con la ciudad al otro lado del cristal. Entra DISOLVIENDO desde la mitad (el clip tiene 12 f antes de su `desde`).
    desde: 0.4,
    en: P.estudio1,
    dur: P.estudio2 - P.estudio1,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.05, shadows: 0.1, highlights: -0.4, whites: -0.2, saturation: 1.06 }),
    reason:
      "La cama con el panel de listones retroiluminado y la puerta al balcón (lo que se compra): el sitio donde el huésped duerme, con la luz cálida, y la ciudad al fondo; el estudio entero cabe en este plano.",
  },
  {
    id: "c08-cocina",
    bloque: 5,
    tipo: "video",
    src: v("rc04"),
    // RC04 (ESTUDIO (12), iPhone, 1080×1920, SDR, 6,97 s), del 0,40 al 3,33 s: del escritorio de madera con los dos portátiles y la silla (el mismo en que se sienta Isabella en el CTA) la cámara gira a la izquierda sobre el
    // mesón blanco: la vitrocerámica, la nevera bajo el mesón y los azulejos del frente. El trabajo y la cocina en un solo gesto: en 24 m² todo está resuelto. Se prefirió a RC01 (que usa la 061) y al tramo posterior de este
    // mismo clip (utensilios y grifería sobre un mesón todo blanco, con poco que mirar). Entra A CORTE en el golpe de 8,1 dB (f724).
    desde: 0.4,
    en: P.estudio2,
    dur: P.vista - P.estudio2,
    zoom: QUIETO,
    entra: "corte",
    color: color({ contrast: 1.04, exposure: -0.1, shadows: 0.2, highlights: -0.25, saturation: 1.06 }),
    reason:
      "El escritorio con los portátiles y la cocina equipada (la vitrocerámica y la nevera bajo el mesón): en 24 m² trabajo y cocina caben en un gesto; es el plano que enseña que no falta nada para recibir a un huésped.",
  },
  {
    id: "c09-balcon",
    bloque: 5,
    tipo: "video",
    src: v("rc18"),
    // RC18 (ESTUDIO (9), iPhone, 1080×1920, SDR, 9,80 s), del 0,00 al 4,07 s: el balcón del estudio con el cielo azul, los edificios de ladrillo y los árboles de Laureles tras la baranda; la cámara entra por la puerta de
    // cristal y, dentro, aparecen la tele con la planta y la cama. La ciudad desde el estudio. Entra A CORTE en el golpe de 8,5 dB (f812) y es el plano más largo del bloque 5 (122 f): el clímax.
    desde: 0.0,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.3, shadows: 0.4, highlights: -0.3, whites: -0.1, saturation: 1.06 }),
    reason:
      "El balcón con el barrio (la ventana a la ciudad, el clímax): el cielo y Laureles tras la baranda y, al entrar, el estudio con su tele y su cama. Cierra el hilo de la azotea al estudio. El plano más largo del bloque.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct02"),
    audio: a("ct02-voz"),
    voz: {
      s0: 1.23,
      s1: 5.4,
      lufs: -15,
      dice: "¿Y tú qué esperas para conocerlo? Haz clic en el enlace y agendemos una visita.",
    },
    // La voz empieza a los 1,23 s (36,9 f) y acaba a los 5,38 s (161,4 f); el clip dura 6,03 s (181 f). Antes de la primera sílaba hay un soplo a −47 dB (0,94-1,18 s) que queda fuera de la ventana tratada. `desde` 24 f
    // entra DISOLVIENDO (el clip tiene 24 f antes) y la primera palabra suena a los 12,9 f del `en`: la música baja con curva sobre 10 f tras el golpe. El plano dura 145 f (del f24 al f169 del clip): 7 f tras la última
    // palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela: el clip aún tiene 12 f.
    // Isabella sentada en su escritorio, con las repisas, el espejo y los listones detrás y la cama en primer plano; habla con las manos.
    desde: fr(24),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, exposure: 0.14, shadows: 0.1, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "El escritorio del estudio (la invitación): Isabella dice «¿y tú qué esperas para conocerlo? Haz clic en el enlace y agendemos una visita»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-062.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-062/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_062 = P.cta + DUR_CTA + DUR_TARJETA;
