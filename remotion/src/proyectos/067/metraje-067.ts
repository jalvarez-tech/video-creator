/**
 * EL RECORRIDO 067 — «Lote en venta en San Cristóbal (EOLIA Condominio)», V49 del registro, segundo reel de este lote (reparto 066-068, `proyectos/066/reparto-066-068.md`) — los planos, como DATOS.
 *
 * Ángulo: «ESTE NO ES PARA TI»: el filtro del comprador serio. El camino de tierra rodeando el grupo de cipreses, visto desde el aire (la promesa, sin voz ni texto) → el hook se planta sin adjetivos («si estás
 * buscando lo más barato de la zona, con todo respeto, este no es para ti») → el paseo es EL TERRENO, sin prisa: el paneo del prado hasta el grupo de cipreses, el cielo y la cordillera, el lote visto desde arriba
 * → la mitad le pone cara al comprador al que sí le habla («aprendí a reconocer al comprador serio desde la primera fase: no habla de metros, habla de lo que quiere dejar de sentir») → el dron sube: los cipreses
 * con la ciudad al fondo, el vuelo sobre los pinos y, al final, LA VISTA: el valle y Medellín al horizonte → el CTA («5.000 metros, infinitas posibilidades, haz clic en el enlace y hablemos»). Estructura del canal:
 * DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA, con TRES frases de Isabella.
 *
 *   hook   HK02  `IMG_0951`  «Si estás buscando lo más barato de la zona, con todo respeto, este no es para ti.»                               (exclusiva de esta pieza, reparto)
 *   mitad  MD01  `IMG_0944`  «Aprendí a reconocer al comprador serio desde la primera fase. No habla de metros, habla de lo que quiere dejar de sentir.»   (ídem; 29,97 fps)
 *   CTA    CT05  `IMG_0986`  «5.000 metros, infinitas posibilidades. Haz clic en el enlace y hablemos.»                                       (ídem)
 *   aéreo  DR06 (`DJI_…0092`, rangos 0-60 s: el camino y los cipreses) · DR04 (`…0090`, 60-98,5 s: el lote desde arriba) · DR03 (`…0089`, entero: la vista). 4K VERTICAL, SDR, 29,97 fps. DR01-DR02 y los
 *          demás rangos de DR04-DR06 son de la 066 y la 068. Paneos del prado: RC02 (`IMG_0954`) y RC03 (`IMG_0955`); los otros cinco son de las otras dos piezas.
 *
 * LO QUE ES DE ESTA PIEZA Y LO QUE COMPARTE (`proyectos/067/combinaciones.md`). UNA SOLA CIFRA dicha: «5.000 metros» en el CTA (el hook y la mitad no dicen ninguna); la ficha dice 5.170 m² y los subtítulos
 * llevan lo que ELLA dice, sin corregirla. Ninguna cifra propia en pantalla (la ficha y el precio van al caption y a la versión con ficha).
 *
 *   bloque 1  c01                  el camino en curva y los cipreses, desde el aire: DR06 3,0-6,2 s; SIN TEXTO NI VOZ
 *   bloque 2  c02                  Isabella baja por el prado hacia la cámara: el hook (entra disolviendo; su primera palabra suena a los 3 f)
 *   bloque 3  c03 c04 c05          el terreno, a ras de suelo y desde arriba: el paneo del prado hasta los cipreses (RC02) → el cielo y la cordillera sobre el prado (RC03) → el lote visto desde el aire (DR04)
 *   bloque 4  c06                  Isabella en otra loma: la mitad
 *   bloque 5  c07 c08 c09          el dron sube: los cipreses con la ciudad detrás (DR06) → el vuelo sobre los pinos (DR06) → LA VISTA: el valle y Medellín al horizonte (DR03, el plano más largo)
 *   bloque 6  c10 c11              Isabella en la loma, con las nubes detrás: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO. La canción es «Return to Oasis» (Aleksey Chistilin, cinematic ambient, 110 BPM de PULSO CONSTANTE, la de la V2/018): arpegio sobre una meseta de −8,7 LUFS que dura hasta los 180,09 s y
 * cae entonces, en 2 s, a un lecho de piano (−20 → −27 LUFS). Entra en su golpe de 148,470 s (9,9 dB; el pulso 10 desde el golpe de 143,005 s de la 018) y la CAÍDA coincide con el CTA: la voz de Isabella queda sola
 * sobre el piano. Cada corte SECO cae en un golpe MEDIDO (`musica/golpes-067.json`, `medir-pista.py --json`: banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir»), a ≤ 1 f de donde
 * SUENA; las disolvencias van libres. Los frames de cada plano salen de `golpe(...)`: mover la entrada de la música es cambiar `INICIO_MUSICA`.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(12)` = 12/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS. Un plano que
 * entra disolviendo (`disolver`) empieza a verse 12 f ANTES de su `en` (`solapeDe`): su clip tiene que tener esos 12 f antes de `desde`, y el plano anterior dura hasta ese `en`. Los números de `dr06` van sobre el MP4
 * normalizado, que empieza en el segundo 0 del original; los de `dr04`, sobre un MP4 que empieza en el segundo 60 del original (el original t = el normalizado t + 60).
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f99, 3,3 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la
 * prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-067.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-067";

export const FPS_067 = 30;

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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −25,1 · −27,2 · −27,3 LUFS en su ventana de voz (habla a unos metros
 * de un iPhone, con viento); cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS)
 * hasta −15,0 LUFS con el pico real a −2,5 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Return to Oasis» — `archivos/musica/Aleksey Chistilin - Return to Oasis.mp3` (sha 8 `55bf04c8`), Re# menor, 110 BPM (0,5454 s por pulso), 3:36. Se entra en su golpe de 148,470 s (9,9 dB) y de ahí suena a
 * −8,7 LUFS (meseta de arpegio, sin crescendo) hasta los 180,09 s, donde CAE a un piano suelto: −10,2 LUFS a los 180,6 s, −19,6 a los 182,1 y un lecho de −22…−27 LUFS que sube de nuevo hacia los 186,6 s. Los golpes
 * de abajo son los MEDIDOS (`proyectos/067/musica/golpes-067.json`, `medir-pista.py --json`, los mismos de la 018 con otra entrada). Hay otro golpe de 10,0 dB a los 184,492 s (f1083): la música tiene que estar apagada
 * antes, así que se lleva a cero hasta el f1081.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (el aéreo, a corte; no nace de negro). Es el pulso 10 de la rejilla de la 018. */
  e0: { t: 148.47, db: 9.9 },
  /** Corte seco del hook al paseo (pulso 24). */
  paseo1: { t: 156.144, db: 9.2 },
  /** Corte seco del paneo al cielo (pulso 29). */
  paseo2: { t: 158.841, db: 9.1 },
  /** Corte seco del cielo al lote visto desde el aire (pulso 34). */
  paseo3: { t: 161.564, db: 9.6 },
  /** Corte seco de la mitad al primer plano del dron (pulso 51). */
  aire1: { t: 170.839, db: 9.7 },
  /** Corte seco de los cipreses al vuelo sobre los pinos (pulso 56). */
  aire2: { t: 173.573, db: 8.2 },
  /** Corte seco del vuelo a LA VISTA (pulso 61). */
  vista: { t: 176.276, db: 11.8 },
} as const;

/** Dónde cae la canción (s): de −7,2 LUFS (a los 180,1 s) a −19,6 (a los 182,1 s), sonoridad momentánea de 400 ms; un lecho de piano suelto desde ahí. Es el instante en que entra el CTA. */
export const DECAE = { t: 180.09, lufsAntes: -7.2, lufsDespues: -19.6 } as const;
/** El golpe de 10,0 dB (s) que hay que dejar fuera: la música ya está a cero. */
export const GOLPE_QUE_SE_EVITA = { t: 184.492, db: 10.0 } as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (148,470 s) cae en el frame 3 de la pieza; redondeado a un frame (4453/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 4453 / FPS_067;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_067;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_067;

/** Isabella: un empuje lento hacia ella. Los paneos y el aéreo, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-067/${id}.mp4`;
const a = (id: string): string => `recorrido-067/${id}.wav`;

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
 * Los frames de cada cambio de plano: los que caen en un golpe salen de `golpe(...)`. Los que entran disolviendo (hook, mitad, CTA) tienen aquí el `en` de la disolvencia YA TERMINADA: el plano anterior dura
 * hasta él y el siguiente empieza a verse 12 f antes. Una disolvencia no pide golpe (la música baja bajo ella): la del hook (f96) cae donde el contenido lo pide y la de la mitad (f462) y la del CTA (f950), donde
 * la voz y la caída de la canción lo piden.
 */
const P = {
  hook: 96, //                        Isabella ya es opaca; su primera palabra suena a los 3 f
  paseo: golpe(GOLPE.paseo1), //     233 · acaba el hook; el golpe de 9,2 dB abre el paseo (a corte)
  cielo: golpe(GOLPE.paseo2), //     314 · del paneo al cielo (a corte, 9,1 dB)
  lote: golpe(GOLPE.paseo3), //      396 · del cielo al lote visto desde arriba (a corte, 9,6 dB)
  mitad: 462, //                      Isabella con la mitad (disuelve); su primera palabra suena a los 3 f
  aire1: golpe(GOLPE.aire1), //      674 · el dron sube (a corte, 9,7 dB)
  aire2: golpe(GOLPE.aire2), //      756 · el vuelo sobre los pinos (a corte, 8,2 dB)
  vista: golpe(GOLPE.vista), //      837 · LA VISTA (a corte, 11,8 dB)
  cta: 950, //                        Isabella en la loma (disuelve): su primera palabra suena a los 2 f; la canción empieza a caer
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 5,14 s (154 f) y desde `desde` (12 f) hasta el f150 del clip hay 138. Su voz va de 0,47 a 4,66 s (f952 a f1078 de la comp): 10 f tras la última palabra, en los que
 * la imagen funde a negro (los últimos 6). Nada se congela: el plano acaba 4 f antes del final del clip.
 */
const DUR_CTA = 138;

/**
 * Dónde acaba la música (frame de la comp): bajo la última frase del CTA se APAGA en línea recta hasta cero aquí, 2 f antes del golpe de 10,0 dB de los 184,492 s (f1083). La tarjeta va en silencio.
 */
export const FIN_MUSICA_067 = 1081;

export const metraje067: readonly Corte[] = [
  // ── Bloque 1 · el aéreo ──
  {
    id: "c01-aereo",
    bloque: 1,
    tipo: "video",
    src: v("dr06"),
    // DR06 (4K vertical, SDR, 29,97 fps), del 3,0 al 6,2 s del archivo normalizado: el dron se aleja del grupo de cipreses y abre el camino de tierra que lo rodea en curva, con la ladera y el cielo. Movimiento
    // continuo y suave. Entra a corte con el golpe de 9,9 dB del f3.
    desde: 3.0,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El camino de tierra rodeando los cipreses (la promesa): un lote abierto, verde, sin una casa ni una persona. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de quién NO es el comprador.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk02"),
    audio: a("hk02-voz"),
    voz: {
      s0: 0.5,
      s1: 4.46,
      lufs: -15,
      dice: "Si estás buscando lo más barato de la zona, con todo respeto, este no es para ti.",
    },
    // La voz empieza a los 0,50 s (15 f) y acaba a los 4,46 s (134 f); el clip dura 5,14 s (154 f). `desde` 12 f entra DISOLVIENDO (el clip tiene 12 f antes) y la primera palabra suena a los 3 f del `en`: la música
    // baja con curva en 10 f y acaba en el f97, 2 f antes. El plano dura 137 f (hasta el golpe del f233): 15 f tras la última palabra, en los que la música sube (13 f).
    // Isabella baja por el prado hacia la cámara, con el grupo de pinos y el valle detrás.
    desde: fr(12),
    en: P.hook,
    dur: P.paseo - P.hook,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, saturation: 1.04, exposure: 0.25, shadows: 0.3, highlights: -0.3 }),
    reason:
      "El prado junto a los pinos (la selección): Isabella camina hacia la cámara y dice «si estás buscando lo más barato de la zona, con todo respeto, este no es para ti». Entra disolviendo desde el aéreo; la música ya baja.",
  },
  // ── Bloque 3 · el terreno: el prado, el cielo y el lote desde arriba ──
  {
    id: "c03-paneo",
    bloque: 3,
    tipo: "video",
    src: v("rc02"),
    // RC02 (iPhone, 1080×1920, SDR, 29,97 fps), del 0,6 al 3,3 s: un paneo hacia la derecha por el prado, del cielo con nubes sobre la cerca y el potrero hasta el primer ciprés (el clip se oscurece de luma 138 a 96 hacia
    // los pinos: este tramo es el claro). Entra A CORTE en el golpe de 9,2 dB del f233.
    desde: 0.6,
    en: P.paseo,
    dur: P.cielo - P.paseo,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.15, blacks: 0, shadows: 0.3, highlights: -0.3 }),
    reason:
      "El prado y el primer ciprés (el terreno a ras de suelo): la cámara recorre el pasto bajo un cielo con nubes; lo primero que se descubre es el espacio. El golpe abre el paseo.",
  },
  {
    id: "c04-cielo",
    bloque: 3,
    tipo: "video",
    src: v("rc03"),
    // RC03 (iPhone, 1080×1920, SDR), del 0,3 al 3,03 s: la loma verde con las nubes encima y la cordillera sobre la línea de árboles; un paneo muy lento. Entra A CORTE en el golpe de 9,1 dB del f314.
    desde: 0.3,
    en: P.cielo,
    dur: P.lote - P.cielo,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.35, highlights: -0.3 }),
    reason:
      "El cielo y la cordillera sobre el prado (el silencio): la loma abierta con las nubes encima y las montañas al fondo; aquí no hay nadie que te apure.",
  },
  {
    id: "c05-lote",
    bloque: 3,
    tipo: "video",
    src: v("dr04"),
    // DR04 (4K vertical, SDR, 29,97 fps), del 3,0 al 5,2 s del archivo normalizado (el 63,0-65,2 s del original): el dron pasa en picado sobre el prado con sus caminos y su árbol, el bosque arriba y la carretera con un coche
    // blanco abajo. Entra A CORTE en el golpe de 9,6 dB del f396 y acaba (66 f) donde entra Isabella con la mitad, disolviendo.
    desde: 3.0,
    en: P.lote,
    dur: P.mitad - P.lote,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.15 }),
    reason:
      "El lote visto desde arriba (el tamaño): el prado entero con sus caminos y su árbol, el bosque encima y el camino abajo; lo que el comprador serio mide con la vista y no con una cifra.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md01"),
    audio: a("md01-voz"),
    voz: {
      s0: 0.51,
      s1: 6.9,
      lufs: -15,
      dice: "Aprendí a reconocer al comprador serio desde la primera fase. No habla de metros, habla de lo que quiere dejar de sentir.",
    },
    // La voz empieza a los 0,51 s (15 f) y acaba a los 6,90 s (207 f); el clip dura 7,72 s (231 f). `desde` 12 f entra DISOLVIENDO (el clip tiene 12 f antes) y la primera palabra suena a los 3 f del `en`: la música baja
    // con curva en 10 f y acaba 2 f antes. El plano dura 212 f (hasta el golpe del f674): 17 f tras la última palabra, en los que la música sube (15 f).
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-067.ts`): «fase» (whisper small oye «primera fase» con confianza 0,98 y la envolvente no muestra la /r/ de «frase»; se pinta «fase», lo medido).
    // Isabella en una loma de pasto seco, con los pinos y las nubes detrás.
    desde: fr(12),
    en: P.mitad,
    dur: P.aire1 - P.mitad,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "La loma de pasto seco (el comprador serio, nombrado): Isabella dice «aprendí a reconocer al comprador serio desde la primera fase: no habla de metros, habla de lo que quiere dejar de sentir». Entra disolviendo desde el lote visto desde arriba.",
  },
  // ── Bloque 5 · el dron sube hasta la vista ──
  {
    id: "c07-curva",
    bloque: 5,
    tipo: "video",
    src: v("dr06"),
    // DR06 (4K vertical, SDR, 29,97 fps), del 41,5 al 44,2 s del archivo normalizado: el dron mira el camino en curva alrededor del grupo de cipreses y, al fondo, la ciudad y las montañas bajo un cielo con nubes.
    // Entra A CORTE en el golpe de 9,7 dB del f674.
    desde: 41.5,
    en: P.aire1,
    dur: P.aire2 - P.aire1,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "Los cipreses con la ciudad detrás (lo que se deja de sentir, lejos): el camino rodea el grupo de pinos y, al fondo, Medellín; la distancia justa. El golpe lo abre tras la mitad.",
  },
  {
    id: "c08-pinos",
    bloque: 5,
    tipo: "video",
    src: v("dr06"),
    // DR06 (4K vertical, SDR, 29,97 fps), del 51,0 al 53,7 s del archivo normalizado: el dron avanza sobre las copas de los pinos con el camino de tierra arriba, en un picado suave. Entra A CORTE en el golpe de 8,2 dB del f756.
    desde: 51.0,
    en: P.aire2,
    dur: P.vista - P.aire2,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El vuelo sobre los pinos (el verde que rodea): el dron avanza a ras de las copas con el camino de tierra al fondo; el silencio de un lote donde nadie te apura. Prepara la vista.",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("dr03"),
    // DR03 (4K vertical, SDR, 29,97 fps), del 5,3 al 9,07 s del archivo normalizado: el dron levanta la mirada desde el prado y los cipreses hasta el horizonte: el valle de Aburrá con Medellín, las montañas y un cielo
    // azul con nubes. Entra A CORTE en el golpe de 11,8 dB del f837 y es el plano más largo del bloque 5 (113 f): el clímax; sigue visible bajo la disolvencia del CTA.
    desde: 5.3,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: [1.0, 1.04],
    entra: "corte",
    color: color(),
    reason:
      "El valle y Medellín al horizonte (la vista, el clímax): el dron levanta la mirada sobre el prado y abre la ciudad entre las montañas; lo que rodea el lote. El plano más largo del bloque.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct05"),
    audio: a("ct05-voz"),
    voz: {
      s0: 0.47,
      s1: 4.66,
      lufs: -15,
      dice: "5.000 metros, infinitas posibilidades. Haz clic en el enlace y hablemos.",
    },
    // La voz empieza a los 0,47 s (14 f) y acaba a los 4,66 s (140 f); el clip dura 5,14 s (154 f). `desde` 12 f entra DISOLVIENDO (el clip tiene 12 f antes) y la primera palabra suena a los 2 f del `en`: la música baja
    // con curva en 10 f y acaba 2 f antes, mientras la canción cae sola a su lecho de piano. El plano dura 138 f (acaba en el f150 del clip, 4 f antes de su final): 10 f tras la última palabra, en los que la imagen funde
    // a negro (los últimos 6).
    // Isabella de pie en la loma, con el prado, los pinos y las nubes detrás.
    desde: fr(12),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, saturation: 1.04, shadows: 0.15 }),
    reason:
      "La loma con las nubes detrás (la invitación): Isabella dice «5.000 metros, infinitas posibilidades, haz clic en el enlace y hablemos»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-067.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-067/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música ya se ha apagado.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_067 = P.cta + DUR_CTA + DUR_TARJETA;
