/**
 * EL RECORRIDO 057 — «Apartamento en Palmazera (La Ceja)», V39 del registro, primer reel de este apartamento (reparto 054-062, `proyectos/054/reparto-054-062.md`) — los planos, como DATOS.
 *
 * Ángulo: «QUE SE RESPIRE PAZ: llegar y descansar de verdad». El aéreo enseña el edificio de ladrillo entre el verde (el silencio del conjunto) → el hook lo promete («¿buscas un lugar donde realmente se respire paz?
 * Este apartamento es eso») → el paseo es LUZ Y CALMA, sin prisa: el pasillo despejado hasta el rincón del gato y la sala con su manta, su taza y su ventanal → la mitad lo vuelve pregunta («¿cuándo fue la última vez que
 * llegaste a casa y sentiste que de verdad descansaste?») → la cama con su luz, la ventana con la montaña → la vista desde arriba, los techos de La Ceja y las montañas → el CTA, ya en el balcón («agenda tu visita y vive
 * la experiencia de la tranquilidad en persona»). Estructura del canal: DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA, con TRES frases de Isabella.
 *
 *   hook   HK01  `IMG_8709` «¿Buscas un lugar donde realmente se respire paz? Este apartamento es eso.»               (exclusiva de esta pieza, reparto)
 *   mitad  MD06  `IMG_8728` «¿Cuándo fue la última vez que llegaste a casa y sentiste que de verdad descansaste?»      (exclusiva de esta pieza, reparto)
 *   CTA    CT02  `IMG_8726` «Agenda tu visita y vive la experiencia de la tranquilidad en persona.»                    (exclusiva de esta pieza, reparto; solo hay 3 CTA en todo el rodaje)
 *   aéreo  DR03 (`DJI_…0079`) la apertura y DR01 (`DJI_…0077`) la vista; DR02 (`…0078`) queda sin usar. DR04-DR10 son de las otras dos versiones. 4K VERTICAL, SDR, 29,97 fps.
 *
 * LO QUE ES DE ESTA PIEZA Y LO QUE COMPARTE (`proyectos/057/combinaciones.md`). NINGUNA cifra aparte de las que ella dice: aquí no dice ninguna (ni los 60 m² ni el precio van en pantalla del reel: van al caption y a la
 * versión con ficha). Los recorridos RC11, RC12, RC04 y RC02 son un hilo propio (el pasillo · la sala con su luz · la cama · la ventana); los otros dos reels del apartamento (058 y 059) usan otros planos y se
 * declaran en `combinaciones.md` y en las notas de la carpeta de la sesión.
 *
 *   bloque 1  c01                  el edificio de ladrillo entre el verde: DR03 4,0-6,4 s, a velocidad constante desde el f0; SIN TEXTO NI VOZ
 *   bloque 2  c02                  Isabella camina hacia la sala y se queda junto a la tele: el hook (entra disolviendo; su primera palabra suena a los 13 f)
 *   bloque 3  c03 c04              la luz y la calma, dos planos largos: el pasillo hasta el rincón del gato (RC11) → las flores, la taza y el sofá con su ventanal (RC12)
 *   bloque 4  c06                  Isabella sentada en ese mismo sofá: la mitad
 *   bloque 5  c07 c08 c09          la cama con su luz (RC04) → la cámara se acerca a la ventana y aparece la montaña (RC02) → LA VISTA: el dron sobre los techos de La Ceja y las montañas (DR01, el plano más largo)
 *   bloque 6  c10 c11              Isabella en el balcón, con el prado y las montañas detrás: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO. La canción es «Silver Skies Cinematic Piano» (piano, SIN pulso constante): la rejilla son los golpes MEDIDOS (`musica/golpes-057.json`; `medir-pista.py`). CON PIANO LAS DISOLVENCIAS VAN LIBRES y solo los
 * cortes SECOS piden golpe (memoria `musica-sin-pulso-rejilla-por-golpes`, 037): hook → paseo (17,4 dB, el acorde que vuelve tras el respiro), paseo 1 → paseo 2 (8,2 dB) y alcoba → vista (8,0 dB). La entrada de la
 * canción es su golpe de 48,816 s (9,8 dB): su respiro cae bajo el hook, el acorde de 17,4 dB abre el paseo y su caída natural, desde los 79,5 s, cae sobre el CTA.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(12)` = 12/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS. Un plano que entra
 * disolviendo (`disolver`) empieza a verse 12 f ANTES de su `en` (`solapeDe`): su clip tiene que tener esos 12 f antes de `desde`, y el plano anterior dura hasta ese `en`.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f85, 2,8 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la
 * prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-057.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-057";

export const FPS_057 = 30;

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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −25,4 · −24,3 · −23,9 LUFS en su ventana de voz (habla a unos metros
 * de un iPhone); cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS)
 * hasta −15,0 LUFS con el pico real a −2,5 · −2,5 · −3,4 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Silver Skies Cinematic Piano» — `archivos/musica/Silver Skies Cinematic Piano.mp3` (sha 8 `9c3a3dc3`), piano sereno en La# mayor, 2:40. Se entra en su golpe de 48,816 s (9,8 dB) y de ahí suena a −14…−17 LUFS salvo
 * su RESPIRO (de los 51,5 a los 55 s, hasta −40 dB: el hook habla sobre él) y su CAÍDA, desde los 79,5 s a un lecho (−16 → −24 → −35 LUFS), donde entra el CTA. Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz,
 * subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir»): `proyectos/057/musica/golpes-057.json` (`medir-pista.py --json`, la misma medida que la de la 042, que usó esta canción).
 * Hay otro golpe de 19,5 dB a los 82,727 s (f1020): la música tiene que estar apagada antes, así que la tarjeta del cierre empieza en él.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 48.816, db: 9.8 },
  /** El acorde de 17,4 dB que vuelve tras el respiro: abre el paseo (corte seco). */
  paseo1: { t: 55.772, db: 17.4 },
  /** Corte seco del paseo 1 al paseo 2. */
  paseo2: { t: 59.467, db: 8.2 },
  /** La disolvencia a la mitad ACABA aquí. */
  mitad: { t: 64.033, db: 9.1 },
  /** La disolvencia a la alcoba ACABA aquí. */
  alcoba: { t: 68.817, db: 7.2 },
  /** Corte seco de la ventana a la vista. */
  vista: { t: 75.333, db: 8.0 },
} as const;

/** Dónde cae la canción (s): de −16,9 LUFS (a los 79,9 s) a −27,2 (a los 81,1 s), sonoridad momentánea de 400 ms; no se recupera hasta el acorde de 19,5 dB de los 82,727 s. */
export const DECAE = { t: 79.5, lufsAntes: -16.9, lufsDespues: -27.2 } as const;
/** El golpe de 19,5 dB (s) que hay que dejar fuera: la música ya está a cero. */
export const GOLPE_QUE_SE_EVITA = { t: 82.727, db: 19.5 } as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (48,816 s) cae en el frame 3 de la pieza; redondeado a un frame (1463/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 1463 / FPS_057;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_057;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_057;

/** Isabella: un empuje lento hacia ella. Los recorridos y el aéreo, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-057/${id}.mp4`;
const a = (id: string): string => `recorrido-057/${id}.wav`;

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
 * Los frames de cada cambio de plano: los que caen en un golpe salen de `golpe(...)`, así que mover la entrada de la música es cambiar `INICIO_MUSICA`. Los que entran disolviendo (hook, mitad, alcoba, ventana, CTA)
 * tienen aquí el `en` de la disolvencia YA TERMINADA: el plano anterior dura hasta él y el siguiente empieza a verse 12 f antes. Con piano, una disolvencia no pide golpe: la del hook (f72), la de la ventana (f701) y la del
 * CTA (f905) caen donde el contenido lo pide; la de la mitad (f460) y la de la alcoba (f603) caen en un golpe por limpieza.
 */
const P = {
  hook: 72, //                       Isabella ya es opaca; su primera palabra suena 13 f después
  paseo: golpe(GOLPE.paseo1), //    212 · acaba el hook; el acorde de 17,4 dB abre el paseo (a corte)
  sala: golpe(GOLPE.paseo2), //     323 · de las flores a la sala (a corte, 8,2 dB)
  mitad: golpe(GOLPE.mitad), //     460 · Isabella con la mitad (disuelve)
  alcoba: golpe(GOLPE.alcoba), //   603 · la cama (disuelve)
  ventana: 701, //                   la ventana de la alcoba (disuelve)
  vista: golpe(GOLPE.vista), //     799 · la vista desde el aire (a corte, 8,0 dB)
  cta: 905, //                       Isabella en el balcón (disuelve): su primera palabra suena a los 11 f
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 8,87 s (266 f) y desde `desde` (12 f) hasta el f127 del clip hay 115. Su voz va de 0,76 a 3,76 s (f916 a f1006 de la comp): 14 f (0,47 s) de su cara tras la última
 * palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela: el plano acaba antes del final del clip, que sigue 139 f más.
 */
const DUR_CTA = 115;

/**
 * Dónde acaba la música (frame de la comp): tras la última palabra del CTA (f1006) se APAGA con curva hasta cero aquí, 2 f antes del golpe de 19,5 dB de los 82,727 s (f1020). La tarjeta va en silencio.
 */
export const FIN_MUSICA_057 = 1018;

export const metraje057: readonly Corte[] = [
  // ── Bloque 1 · el aéreo ──
  {
    id: "c01-conjunto",
    bloque: 1,
    tipo: "video",
    src: v("dr03"),
    // DR03 (4K vertical, SDR, soleado), del 4,00 al 6,40 s del archivo normalizado: el dron avanza a lo largo del edificio de ladrillo de seis pisos entre el prado y las montañas verdes, con una nube blanca sobre
    // el tejado. Movimiento uniforme (2,8 → 2,3: `perfil-mov.py`). Entra a corte con el golpe de 9,8 dB del f3.
    desde: 4.0,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1, highlights: -0.45, whites: -0.3, saturation: 1.0 }),
    reason:
      "El edificio entre el verde (la promesa): ladrillo, prado y montañas bajo un cielo azul, sin una persona ni un coche. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de paz.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk01"),
    audio: a("hk01-voz"),
    voz: {
      s0: 0.92,
      s1: 4.22,
      lufs: -15,
      dice: "¿Buscas un lugar donde realmente se respire paz? Este apartamento es eso.",
    },
    // La voz empieza a los 0,92 s (28 f) y acaba a los 4,22 s (127 f); el clip dura 7,27 s (218 f). `desde` 15 f entra DISOLVIENDO (el clip tiene 15 f antes) y la primera palabra suena a los 13 f del `en`: la música ya
    // está en su respiro y baja con curva en 10 f. El plano dura 140 f (hasta el acorde del f212): 28 f tras la última palabra, en los que la música sube (22 f).
    // Isabella entra por la izquierda de la sala (el ventanal con el balcón y los edificios detrás) y se queda de pie junto a la tele, con las plantas y el sofá a un lado.
    desde: fr(15),
    en: P.hook,
    dur: P.paseo - P.hook,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, exposure: 0.15, shadows: 0.2, highlights: -0.25, whites: -0.1, saturation: 1.04 }),
    reason:
      "La sala con su ventanal (la paz, prometida): Isabella camina hacia la tele y dice «¿buscas un lugar donde realmente se respire paz? Este apartamento es eso». Entra disolviendo desde el aéreo; la música ya baja a su respiro.",
  },
  // ── Bloque 3 · la luz y la calma: el pasillo y la sala ──
  {
    id: "c03-pasillo",
    bloque: 3,
    tipo: "video",
    src: v("rc11"),
    // RC11 (iPhone, 1080×1920, SDR), del 0,30 al 4,00 s: el pasillo despejado, de suelo de madera clara, con la cómoda blanca y las flores, las luces cálidas del techo y, al fondo, el rincón del gato con su torre
    // (el gato naranja, quieto). Movimiento 1,4 → 4,5 (el más lento de la casa: `perfil-mov.py`). Entra A CORTE en el acorde de 17,4 dB del f212.
    desde: 0.3,
    en: P.paseo,
    dur: P.sala - P.paseo,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.08, shadows: 0.1, highlights: -0.2, saturation: 1.06 }),
    reason:
      "El pasillo despejado hasta el rincón del gato (el umbral de la calma): suelo de madera, flores, luz cálida y un gato quieto; lo primero que se descubre es que aquí no hay ruido ni desorden. El acorde que vuelve abre el paseo.",
  },
  {
    id: "c04-sala",
    bloque: 3,
    tipo: "video",
    src: v("rc12"),
    // RC12 (iPhone, 1080×1920, SDR), del 3,40 al 7,97 s: la cámara pasa de las flores del recibidor a la mesa auxiliar con la lámpara, la taza y la planta, y se abre sobre el sofá gris con su manta beige, la sansevieria
    // y el ventanal con la luz de la tarde y los edificios. Movimiento 11 → 3 (frena sola). Entra A CORTE en el golpe de 8,2 dB del f323. Es el mismo sofá donde Isabella se sienta en la mitad: este plano lo presenta.
    desde: 3.4,
    en: P.sala,
    dur: P.mitad - P.sala,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.03, shadows: 0.22, highlights: -0.3, whites: -0.15, saturation: 1.06 }),
    reason:
      "La sala con su luz (el descanso a la vista): la taza sobre la mesa, el sofá con su manta y el ventanal con el sol de la tarde; un plano largo que frena solo, sin prisa. Presenta el sofá donde ella se sienta a continuación.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md06"),
    audio: a("md06-voz"),
    voz: {
      s0: 0.72,
      s1: 4.22,
      lufs: -15,
      dice: "¿Cuándo fue la última vez que llegaste a casa y sentiste que de verdad descansaste?",
    },
    // La voz empieza a los 0,72 s (22 f) y acaba a los 4,22 s (127 f); el clip dura 6,97 s (209 f). `desde` 12 f entra DISOLVIENDO (el clip tiene 12 f antes) y la primera palabra suena a los 10 f del `en`: la música baja
    // con curva en 8 f, desde el golpe de 9,1 dB en que acaba la disolvencia (f460), y acaba 2 f ANTES de ella. El plano dura 143 f: 28 f tras la última palabra, en los que la música sube (22 f) antes del golpe del f603.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-057.ts`): «de verdad» (whisper se la come y escribe «sentiste que verdad descansaste»; se pinta «de verdad»).
    // Isabella, sentada en el sofá gris con la manta beige, habla a cámara y abre un brazo; detrás, el ventanal con el balcón y los edificios. Al final de la toma la cámara se va a la mesa con la lámpara y al recibidor.
    desde: fr(12),
    en: P.mitad,
    dur: P.alcoba - P.mitad,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, exposure: 0.2, shadows: 0.25, highlights: -0.3, whites: -0.12, saturation: 1.04 }),
    reason:
      "El sofá de la sala (la pregunta, dicha): Isabella, sentada, pregunta «¿cuándo fue la última vez que llegaste a casa y sentiste que de verdad descansaste?». Entra disolviendo desde el plano del sofá vacío; es el momento de conexión.",
  },
  // ── Bloque 5 · la cama, la ventana y la vista ──
  {
    id: "c07-alcoba",
    bloque: 5,
    tipo: "video",
    src: v("rc04"),
    // RC04 (iPhone, 1080×1920, SDR), del 0,50 al 3,77 s: la alcoba principal desde el pie de la cama: la ventana con la persiana y la luz del día, la colcha gris y los cojines beige y verdes, y la cámara que sube hasta el
    // cabecero. Movimiento 2,8 → 5,8 → 2,0: el plano más tranquilo de la alcoba. Entra DISOLVIENDO (el clip tiene 15 f antes: 0,5 s).
    desde: 0.5,
    en: P.alcoba,
    dur: P.ventana - P.alcoba,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.08, shadows: 0.1, highlights: -0.3, whites: -0.15, saturation: 1.06 }),
    reason:
      "La cama hecha con la luz de la ventana (el descanso, ahora sí): colcha, cojines y la persiana filtrando el día; la intimidad de llegar a casa y quedarse. Entra disolviendo, sin golpe, como el sueño.",
  },
  {
    id: "c08-ventana",
    bloque: 5,
    tipo: "video",
    src: v("rc02"),
    // RC02 (iPhone, 1080×1920, SDR), del 7,00 al 10,27 s: la cámara sale de la cama y la puerta del baño, cruza la pared de la esquina y se acerca a la ventana: aparece el prado verde con la montaña, un edificio al fondo y las
    // nubes (tras la malla de seguridad). Termina justo cuando el clip acaba (10,30 s): ese es el plano que hay antes de la vista. Entra DISOLVIENDO (el clip tiene 0,5 s antes de `desde`: 15 f).
    desde: 7.0,
    en: P.ventana,
    dur: P.vista - P.ventana,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.1, shadows: 0.1, highlights: -0.35, whites: -0.2, saturation: 1.04 }),
    reason:
      "La ventana con la montaña (de lo cerrado a lo abierto): la cámara cruza la alcoba, se acerca a la ventana y aparece el verde de la montaña; lo que se ve desde la cama. Prepara la vista desde arriba.",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("dr01"),
    // DR01 (4K vertical, SDR, soleado), del 2,40 al 5,93 s del archivo normalizado: el dron sube sobre los árboles del conjunto y abre los techos de La Ceja, la fila de edificios del centro y las montañas bajo un cielo de
    // nubes blancas. Movimiento 2,9 → 1,3: frena solo y se posa. Entra A CORTE en el golpe de 8,0 dB (f799) y es el plano más largo del bloque 5 (106 f): el clímax. Un empuje lento mantiene la vida cuando se posa.
    desde: 2.4,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: [1.0, 1.06],
    entra: "corte",
    color: color({ exposure: 0.0, shadows: 0.1, highlights: -0.35, whites: -0.2, saturation: 1.08 }),
    reason:
      "La Ceja desde arriba (la vista, el clímax): el dron levanta la mirada sobre los árboles, abre los techos del pueblo y las montañas y se posa en el horizonte: lo que rodea el apartamento. El plano más largo del bloque.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct02"),
    audio: a("ct02-voz"),
    voz: {
      s0: 0.76,
      s1: 3.76,
      lufs: -15,
      dice: "Agenda tu visita y vive la experiencia de la tranquilidad en persona.",
    },
    // La voz empieza a los 0,76 s (23 f) y acaba a los 3,76 s (113 f); el clip dura 8,87 s (266 f). `desde` 12 f entra DISOLVIENDO (el clip tiene 12 f antes) y la primera palabra suena a los 11 f del `en`. El plano
    // dura 115 f (acaba en el f127 del clip, 139 f antes de su final): 14 f tras la última palabra, en los que la imagen funde a negro (los últimos 6).
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-057.ts`): «vive» (whisper small oye «ve la experiencia»; el catálogo de la sesión madre lo da como «vive»; se pinta «vive»).
    // Isabella de pie en el balcón, apoyada en la baranda con las luces de verbena, el prado verde y las montañas detrás; la cámara acaba girando al prado y al conjunto de edificios.
    desde: fr(12),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, exposure: 0.1, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "El balcón con el prado y las montañas (la invitación): Isabella, de pie junto a la baranda, dice «agenda tu visita y vive la experiencia de la tranquilidad en persona»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-057.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-057/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música ya se ha apagado.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_057 = P.cta + DUR_CTA + DUR_TARJETA;
