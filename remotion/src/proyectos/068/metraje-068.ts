/**
 * EL RECORRIDO 068 — «Lote en San Cristóbal (EOLIA Condominio)», V50 del registro, tercer reel de este lote (reparto 066-068, `proyectos/066/reparto-066-068.md`) — los planos, como DATOS.
 *
 * Ángulo: «EL VERDADERO ESTATUS ES LA PRIVACIDAD». El aéreo abre sobre la curva del camino que rodea un grupo de cipreses, sin una casa a la vista (el refugio) → Isabella lo dice en el prado
 * («el verdadero estatus no es la fachada que muestras, es la privacidad que puedes tener») → el paseo es QUIETUD: el camino visto desde arriba, el prado con sus pinos y el bosque que lo cierra → la mitad
 * lo vuelve imagen («imagina que el éxito por fin se siente como se ve: en silencio, con la montaña al frente y sin nadie que te apure») → la montaña al frente, el cielo abierto y, al final, la ciudad al
 * horizonte desde el aire (la vista, el clímax) → el CTA («tu bosque privado a solo 20 minutos de Medellín, escríbeme y agendemos una visita»). Estructura del canal: DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA,
 * con TRES frases de Isabella.
 *
 *   hook   HK04  `IMG_0953` «El verdadero estatus no es la fachada que muestras, es la privacidad que puedes tener.»                              (exclusiva de esta pieza, reparto)
 *   mitad  MD02  `IMG_0973` «Imagina que el éxito por fin se siente como se ve: en silencio, con la montaña al frente y sin nadie que te apure.»  (exclusiva de esta pieza, reparto)
 *   CTA    CT01  `IMG_0963` «Tu bosque privado a solo 20 minutos de Medellín, escríbeme y agendemos una visita.»                                (exclusiva de esta pieza; «bosque» y «agendemos» POR CONFIRMAR)
 *   aéreo  DR06 (`DJI_…0092`, 60-119 s) la apertura y el camino; DR05 (`…0091`, 60-121 s) el prado con el bosque; DR04 (`…0090`, 0-60 s) la vista. 4K VERTICAL, SDR, 29,97 fps → 30 exactos (`setpts`).
 *   paneos RC06 (`IMG_0968`, los pinos) · RC05 (`IMG_0957`, la montaña) · RC07 (`IMG_0969`, el cielo abierto): el iPhone en el prado, sin voz útil (se silencia). 1080×1920 SDR.
 *
 * LO QUE ES DE ESTA PIEZA Y LO QUE COMPARTE (`proyectos/068/combinaciones.md`). NINGUNA cifra escrita aparte de las que ella dice («20 minutos»; la superficie y el precio van al caption y a la versión con ficha).
 * Los tramos de dron son disjuntos de los de 066 y 067 (reparto: DR04 0-60, DR05 60-121, DR06 60-119); los paneos RC05-RC07 son de esta pieza.
 *
 *   bloque 1  c01-apertura         la curva del camino alrededor de los cipreses, oblicua, con la ladera de bosque: DR06 68,0-70,4 s; SIN TEXTO NI VOZ
 *   bloque 2  c02-hook             Isabella camina hacia la cámara por el prado: el hook (entra A CORTE en el golpe de 9,2 dB; su primera palabra suena 11 f después)
 *   bloque 3  c03 c04 c05          el camino desde arriba (DR06 cenital) → los pinos del prado (RC06) → el prado con el bosque detrás (DR05 oblicuo)
 *   bloque 4  c06-mitad            Isabella en la loma, con la montaña detrás: la mitad (a corte; su primera palabra suena a los 3 f: la música ya ha bajado)
 *   bloque 5  c07 c08 c09          la montaña al frente (RC05) → el cielo abierto sobre el valle (RC07) → LA VISTA: la ciudad al horizonte desde el aire (DR04, el plano más largo)
 *   bloque 6  c10-cta c11-cierre   Isabella llega a cámara caminando entre los cipreses: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO. La canción es «Heaven on Earth» (lounge/chill, 97 BPM; pulso medio de ≈ 0,46 s con 63 golpes de ≥ 6 dB en 42 s): la rejilla son los golpes MEDIDOS (`musica/golpes-068.json`, `medir-pista.py`).
 * Se entra en el golpe de 10,2 dB de los 178,043 s y la canción llega a su FUNDIDO FINAL natural (de −14,6 LUFS a los 208,1 s a −31,5 a los 212,0) justo bajo la voz del CTA: es la resolución. Cada corte SECO cae en un
 * golpe de ≥ 8 dB. Los tres cortes en que entra ISABELLA (hook, mitad y CTA) caen también en un golpe, pero ahí el detector de `golpes-render.py` mide SU voz y no vale: la música ya ha bajado (mitad) o baja justo después.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f84, 2,8 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la
 * prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-068.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-068";

export const FPS_068 = 30;

export type Entrada = "corte" | "disolver";
export type Bloque = 1 | 2 | 3 | 4 | 5 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. `s0`/`s1`, medidos por energía (perfil de la banda de voz de 40 ms) y por arranques de sílaba; `lufs`, con ebur128 sobre el WAV TRATADO que suena. */
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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −25,2 · −29,8 · −25,2 LUFS en su ventana de voz (habla a unos metros
 * de un iPhone, con viento); cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a
 * −2,5 dBFS) hasta −15,0 LUFS con el pico real a −2,5 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Heaven on Earth» — `archivos/musica/Heaven on Earth.mp3` (sha 8 `acd99178`), lounge/chill de 3:33. Se entra en su golpe de 178,043 s (10,2 dB) y de ahí suena a −12…−15 LUFS (momentánea de 400 ms) salvo un
 * VALLE a los 188-192 s (hasta −22,9) y su FUNDIDO FINAL, que arranca a los 208 s y la deja en −31 a los 212 s. Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el
 * de «empieza a subir»): `proyectos/068/musica/golpes-068.json` (`medir-pista.py --desde 172 --dur 42 --json`). La canción NO tiene pulso fijo (hay un golpe cada 0,4-0,7 s, a 130 BPM por tramos): se corta a los
 * medidos, y como son tantos hay uno de ≥ 8 dB a pocos frames de donde el contenido pide el corte.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 178.043, db: 10.2 },
  /** El hook entra A CORTE aquí (Isabella): su primera palabra suena 11 f después y la música baja DESPUÉS del golpe. */
  hook: { t: 180.363, db: 9.2 },
  /** El hook acaba; el golpe abre el paseo (corte seco). */
  camino: { t: 185.463, db: 8.6 },
  /** Del camino a los pinos (corte seco; el golpe más fuerte de la canción: 22,2 dB). */
  pinos: { t: 188.401, db: 22.2 },
  /** De los pinos al prado (corte seco). */
  prado: { t: 190.716, db: 11.4 },
  /** La mitad entra A CORTE aquí (Isabella): su primera palabra suena 3 f después, así que la música ya ha bajado y el golpe suena a su nivel de «bajo la voz». */
  mitad: { t: 193.193, db: 13.3 },
  /** De la mitad a la montaña (corte seco). */
  montana: { t: 199.681, db: 13.5 },
  /** De la montaña al cielo abierto (corte seco). */
  cielo: { t: 201.859, db: 10.4 },
  /** Del cielo a la vista (corte seco). */
  vista: { t: 204.287, db: 13.6 },
  /** El CTA entra A CORTE aquí (Isabella): su primera palabra suena 19 f después y la música baja DESPUÉS del golpe. */
  cta: { t: 207.118, db: 13.9 },
} as const;

/** Dónde cae la canción (s): su fundido final, de −14,6 LUFS (a los 208,1 s) a −26,6 (a los 211,1 s), sonoridad momentánea de 400 ms. Cae DENTRO de la toma del CTA: es su resolución. */
export const DECAE = { t: 208.1, lufsAntes: -14.6, lufsDespues: -26.6 } as const;
/** El golpe de 8,5 dB (s) que hay que dejar fuera: el último resto de la pista (a −45 dB). La música ya está a cero. */
export const GOLPE_QUE_SE_EVITA = { t: 211.616, db: 8.5 } as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (178,043 s) cae en el frame 3 de la pieza; redondeado a un frame (5340/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 5340 / FPS_068;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_068;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Isabella: un empuje lento hacia ella. Los paneos y el aéreo, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-068/${id}.mp4`;
const a = (id: string): string => `recorrido-068/${id}.wav`;

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
 * Los frames de cada cambio de plano: todos caen en un golpe de `golpe(...)`, así que mover la entrada de la música es cambiar `INICIO_MUSICA`. Aquí NO hay disolvencias: la canción tiene pulso y cada corte es seco.
 */
const P = {
  hook: golpe(GOLPE.hook), //         73 · Isabella entra a corte; su primera palabra suena en el f84
  camino: golpe(GOLPE.camino), //    226 · acaba el hook; el camino desde arriba (corte seco)
  pinos: golpe(GOLPE.pinos), //      314 · los pinos del prado (el golpe de 22,2 dB)
  prado: golpe(GOLPE.prado), //      383 · el prado con el bosque detrás
  mitad: golpe(GOLPE.mitad), //      457 · Isabella con la mitad (a corte; primera palabra en el f460)
  montana: golpe(GOLPE.montana), //  652 · la montaña al frente
  cielo: golpe(GOLPE.cielo), //      717 · el cielo abierto
  vista: golpe(GOLPE.vista), //      790 · la ciudad al horizonte, el clímax (el plano más largo del bloque 5)
  cta: golpe(GOLPE.cta), //          875 · Isabella en el camino: el CTA (a corte; primera palabra en el f894)
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 6,20 s (186 f) y, desde `desde` (0), hasta el f178 del clip hay 178. Su voz va de 0,64 a 5,45 s (f894 a f1038 de la comp): 14 f (0,47 s) de su cara tras la última
 * palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela: el plano acaba 8 f antes del final del clip.
 */
const DUR_CTA = 178;

/**
 * Dónde acaba la música (frame de la comp): su fundido final natural la lleva a −45 dB en la última palabra del CTA (f1038). Se APAGA con curva hasta cero aquí, 2 f antes del último resto de la pista (el golpe de
 * 8,5 dB de los 211,616 s: f1010). La tarjeta va en silencio.
 */
export const FIN_MUSICA_068 = 1008;

export const metraje068: readonly Corte[] = [
  // ── Bloque 1 · el aéreo ──
  {
    id: "c01-apertura",
    bloque: 1,
    tipo: "video",
    src: v("dr06"),
    // DR06 (4K vertical, SDR, nublado luminoso), del 68,0 al 70,4 s del archivo normalizado: el dron avanza sobre la curva del camino de tierra que rodea el grupo de cipreses, con la ladera de bosque detrás y el
    // cielo en la esquina. Sin casas ni coches en cuadro (la casa blanca de los 60-66 s ya salió). Entra a corte con el golpe de 10,2 dB del f3.
    desde: 68.0,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05, highlights: -0.3, whites: -0.15 }),
    reason:
      "El camino que rodea los cipreses entre el bosque (la promesa): un refugio sin vecinos a la vista, bajo un cielo abierto. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de privacidad.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk04"),
    audio: a("hk04-voz"),
    voz: {
      s0: 0.36,
      s1: 4.6,
      lufs: -15,
      dice: "El verdadero estatus no es la fachada que muestras, es la privacidad que puedes tener.",
    },
    // La voz empieza a los 0,36 s (11 f) y acaba a los 4,60 s (138 f); el clip dura 5,33 s (160 f) y respira hasta 0,34 s. `desde` 0: entra A CORTE en el golpe de 9,2 dB (f73) y la primera palabra suena a los 11 f:
    // la música baja con curva en 8 f DESPUÉS del golpe (que suena entero) y acaba 3 f antes de ella. El plano dura 153 f (hasta el golpe del f226): 15 f tras la última palabra, en los que la música sube.
    // Isabella camina hacia la cámara por el prado: detrás, un coche blanco entre los árboles y las montañas con las nubes. EL «ESTATUS» (whisper small: «estatus»; el catálogo de la sesión madre la dejó como «status» en la HK03).
    desde: 0,
    en: P.hook,
    dur: P.camino - P.hook,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.0, exposure: 0.15, blacks: 0, shadows: 0.3, highlights: -0.25, whites: -0.1, saturation: 1.04 }),
    reason:
      "El prado donde se dice (el hook): Isabella camina hacia la cámara y dice «el verdadero estatus no es la fachada que muestras, es la privacidad que puedes tener». Entra a corte en el golpe, tras el aéreo; la música baja tras el golpe y antes de su primera palabra.",
  },
  // ── Bloque 3 · el camino, los pinos y el prado ──
  {
    id: "c03-camino",
    bloque: 3,
    tipo: "video",
    src: v("dr06"),
    // DR06, del 86,0 al 88,9 s: la vista CENITAL del camino de tierra que da la vuelta alrededor de los cipreses, con la carretera asfaltada abajo a la derecha. Movimiento lento y uniforme (se mide con `perfil-mov.py`).
    // Entra A CORTE en el golpe de 8,6 dB del f226.
    desde: 86.0,
    en: P.camino,
    dur: P.pinos - P.camino,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05, highlights: -0.3, whites: -0.15, saturation: 1.06 }),
    reason:
      "El camino desde arriba (el umbral del refugio): de lo que ella dice a lo que se ve, la curva de tierra que rodea los cipreses y lleva al lote, sin nadie en ella. El golpe que abre el paseo.",
  },
  {
    id: "c04-pinos",
    bloque: 3,
    tipo: "video",
    src: v("rc06"),
    // RC06 (iPhone, 1080×1920, SDR, 29,97 fps), del 1,00 al 3,30 s: ya EN el prado: la loma de pasto seco con el grupo de pinos y la cordillera detrás, bajo nubes grandes; la cámara gira a la derecha. Entra A CORTE en el
    // golpe de 22,2 dB del f314, el más fuerte de la canción.
    desde: 1.0,
    en: P.pinos,
    dur: P.prado - P.pinos,
    zoom: QUIETO,
    entra: "corte",
    color: color({ contrast: 1.0, exposure: -0.05, blacks: 0, shadows: 0.35, highlights: -0.3, whites: -0.2, saturation: 1.06 }),
    reason:
      "Los pinos del prado (el silencio, a pie de suelo): de arriba al nivel de los ojos, la loma con su arboleda y la cordillera detrás. Un plano largo y quieto que gira solo hacia la derecha.",
  },
  {
    id: "c05-prado",
    bloque: 3,
    tipo: "video",
    src: v("dr05"),
    // DR05 (4K vertical, SDR), del 66,0 al 68,5 s: el dron, oblicuo, mira el prado con sus caminos de ganado y el bosque nativo que lo cierra por arriba; el cielo asoma en la esquina. Entra A CORTE en el golpe de 11,4 dB del f383.
    desde: 66.0,
    en: P.prado,
    dur: P.mitad - P.prado,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.02, shadows: 0.12, highlights: -0.25, saturation: 1.06 }),
    reason:
      "El prado con el bosque detrás (el cierre del refugio): el bosque nativo rodea el pasto por arriba y nadie más cabe en el cuadro. Prepara a Isabella en la loma, en el mismo prado.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md02"),
    audio: a("md02-voz"),
    voz: {
      s0: 0.09,
      s1: 6.08,
      lufs: -15,
      dice: "Imagina que el éxito por fin se siente como se ve: en silencio, con la montaña al frente y sin nadie que te apure.",
    },
    // La voz empieza a los 0,09 s (3 f) y acaba a los 6,08 s (182 f); el clip dura 6,71 s (201 f). `desde` 0: entra A CORTE en el golpe de 13,3 dB (f457) y la primera palabra suena a los 3 f, así que la música YA ha bajado:
    // su bajada de 8 f acaba en el f456 (una curva, antes de que hable) y el golpe suena a su nivel «bajo la voz». POR CONFIRMAR AL OÍDO: «nadie que te» (whisper small le da 0,31-0,53 de confianza; ver `subtitulos-068.ts`).
    // Isabella, de pie en la loma con la cordillera y las nubes detrás, habla a cámara y abre los brazos. El plano dura 195 f (hasta el golpe del f652): 13 f tras la última palabra, en los que la música sube.
    desde: 0,
    en: P.mitad,
    dur: P.montana - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, exposure: 0.1, shadows: 0.2, highlights: -0.3, whites: -0.12, saturation: 1.04 }),
    reason:
      "La loma con la cordillera (la imagen del silencio, dicha): Isabella, sola en el prado, dice «imagina que el éxito por fin se siente como se ve: en silencio, con la montaña al frente». Es el momento de conexión.",
  },
  // ── Bloque 5 · la montaña, el cielo y la vista ──
  {
    id: "c07-montana",
    bloque: 5,
    tipo: "video",
    src: v("rc05"),
    // RC05 (iPhone, 1080×1920, SDR), del 3,50 al 5,70 s: la cámara sale de debajo del árbol, gira a la derecha y aparece la montaña al frente: el valle con la cordillera, los cipreses sueltos y el pasto en primer plano.
    // Entra A CORTE en el golpe de 13,5 dB del f652.
    desde: 3.5,
    en: P.montana,
    dur: P.cielo - P.montana,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.12, shadows: 0.15, highlights: -0.3, whites: -0.2, saturation: 1.06 }),
    reason:
      "La montaña al frente (lo que ella acaba de decir, visto): del árbol al valle con la cordillera, a pie de prado y sin nadie. Entra con el golpe de 13,5 dB y deja la mitad atrás.",
  },
  {
    id: "c08-cielo",
    bloque: 5,
    tipo: "video",
    src: v("rc07"),
    // RC07 (iPhone, 1080×1920, SDR, 29,97 fps), del 5,00 al 7,40 s: el cielo abierto con una grieta azul entre las nubes sobre el valle, los árboles al horizonte y el pasto en primer plano; sigue girando a la derecha.
    // Entra A CORTE en el golpe de 10,4 dB del f717.
    desde: 5.0,
    en: P.cielo,
    dur: P.vista - P.cielo,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.16, highlights: -0.3, whites: -0.2, saturation: 1.06 }),
    reason:
      "El cielo abierto (el aire que se ve): un solo plano de cielo y nubes sobre el valle, sin nada que lo corte; el giro a la derecha continúa el de la montaña. Prepara la vista desde arriba.",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("dr04"),
    // DR04 (4K vertical, SDR), del 28,0 al 30,8 s: el dron, ya alto y casi quieto, abre la ciudad entera al horizonte (Medellín y el valle, con sus bloques de ladrillo, bajo un cielo de nubes finas) sobre el bosque, el prado y
    // la curva del camino con el grupo de cipreses en primer plano. A los 28-31 s la ciudad ocupa ≈ el 20 % del cuadro (a los 24-26 s, ≈ 12 %). Entra A CORTE en el golpe de 13,6 dB (f790) y es el plano más largo del bloque 5 (85 f): el clímax. Un empuje lento mantiene la vida.
    desde: 28.0,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: [1.0, 1.06],
    entra: "corte",
    color: color({ exposure: 0.0, highlights: -0.35, whites: -0.2, saturation: 1.08 }),
    reason:
      "Medellín desde arriba (la vista, el clímax): el dron abre la ciudad al horizonte sobre el bosque y el prado; lo que hay entre el refugio y la ciudad. El plano más largo del bloque.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct01"),
    audio: a("ct01-voz"),
    voz: {
      s0: 0.64,
      s1: 5.45,
      lufs: -15,
      dice: "Tu bosque privado a solo 20 minutos de Medellín, escríbeme y agendemos una visita.",
    },
    // La voz empieza a los 0,64 s (19 f; hasta ahí hay viento) y acaba a los 5,45 s (164 f); el clip dura 6,20 s (186 f). `desde` 0: entra A CORTE en el golpe de 13,9 dB (f875), la primera palabra suena a los 19 f y la música
    // baja con curva en 8 f DESPUÉS del golpe. El plano dura 178 f: 14 f (0,47 s) tras la última palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela: acaba 8 f antes del final del clip.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-068.ts`): «bosque» (whisper: «voz que»; aislado: «bosque»; el catálogo pensó «refugio», que no lleva /s/) y «agendemos». «20 minutos» NO está en la ficha de la web.
    // Isabella llega caminando de frente entre los cipreses, con la tierra pisada, el valle azul al fondo y el prado a un lado; el plano acaba mientras ella sigue hablando (14 f tras su última palabra).
    desde: 0,
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.0, exposure: 0.4, blacks: 0.04, shadows: 0.55, highlights: -0.35, whites: -0.2, saturation: 1.04 }),
    reason:
      "El bosque de cipreses (la invitación): Isabella llega a cámara y dice «tu bosque privado a solo 20 minutos de Medellín, escríbeme y agendemos una visita»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-068.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-068/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música ya se ha apagado.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_068 = P.cta + DUR_CTA + DUR_TARJETA;
