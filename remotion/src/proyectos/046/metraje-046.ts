/**
 * EL RECORRIDO 046 — «Tierra Grata Bosque Santo (El Poblado), ARRIENDO», V28 del registro, «CIUDAD NUEVA» — los planos, como DATOS.
 *
 * Encargo (2026-10-19, una de las seis sesiones de los reels de arriendo 045-050): el acompañamiento personalizado para quien llega a una ciudad que no es la suya.
 * ABRE CON EL HOOK (excepción por encargo a la regla fija 1, como el 021-024): Isabella habla desde el fotograma 0 y la música entra con ella.
 * Estructura: HOOK · RECORRIDO (la unidad) · MITAD (DOS tomas seguidas) · RECORRIDO (el apartamento y la terraza) · CTA.
 *
 *   hook   HK03  «Cuando llegas a una ciudad que no es la tuya, el acompañamiento personalizado es una plusvalía indispensable.»      (escaleras exteriores; 29,97 fps)
 *   mitad  MD02  «Te acompañamos desde el día uno con atención personalizada.»                                                        (terraza común, la pérgola con las plantas)
 *          MD03  «Contamos con chef privado, tours, masajes y transporte y las mejores experiencias de la ciudad de Medellín.»          (la misma terraza, camina bajo la pérgola)
 *   CTA    CT02  «Si quieres un apartamento amueblado que tenga acompañamiento personalizado, escríbeme.»                             (jardín; «amueblado» MEDIDO por formantes, POR CONFIRMAR AL OÍDO: el catálogo decía «amoblado»)
 *
 * LA IDEA EN UNA LÍNEA. Este apartamento amueblado es PARA QUIEN LLEGA A MEDELLÍN Y NO TIENE A NADIE: el hook pone la necesidad (una ciudad que no es la tuya), la mitad dice qué trae el acompañamiento
 * (desde el día uno · chef privado, tours, masajes, transporte) y el CTA lo cierra con lo que se ofrece (un apartamento amueblado, con acompañamiento). Ninguna cifra en pantalla ni en voz: el canon
 * ($14,8 M al mes) va a la ficha de la versión de anuncios y al caption. Nada que la ficha no diga (administración, contrato, qué se paga aparte).
 *
 *   bloque 2  c02                  Isabella en las escaleras exteriores, el edificio detrás: el hook, desde el frame 0 (a corte; el golpe de la canción suena en el f3)
 *   bloque 3  c03 c04 c05          la unidad, sin voz y solo con la música: el carril de nado entre los árboles (RC17) → la Social Kitchen (RC11) → la Social Kitchen desde el otro lado (RC12). Los tres giran a la derecha
 *   bloque 4  c06 c07              la mitad EN DOS TOMAS, dos sitios de la terraza común: MD02 (la pérgola con las plantas) y MD03 (camina bajo la pérgola). Unidas con una DISOLVENCIA: son dos tomas y se declara
 *   bloque 5  c08 c09 c10          el apartamento y la terraza: la alcoba (RC05) → el baño (RC09) → LA TERRAZA AL ATARDECER (RC18, el clímax: el plano más largo de su bloque). Los tres giran a la derecha
 *   bloque 6  c11 c12              Isabella en el jardín: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA, POR GOLPES. «Children» (Armin van Buuren, versión de piano del álbum «Piano»; sin pulso) entra por su golpe de 175,883 s (9,7 dB, una nota limpia): ahí cae el f3. Su meseta
 * (−10 LUFS, 36 s) acaba en una CAÍDA natural que empieza en el 211,5 s: cae donde entra la voz del CTA, así que el piano baja SOLO bajo ella (la envolvente de `audio-046.ts` solo lo ayuda). Un piano no da golpes de bombo:
 * los cortes SECOS (c04, c09, c10) caen en golpes medidos de 8,3 a 11,4 dB; las DISOLVENCIAS (el hook → la unidad, la Social Kitchen → su otro lado, la unidad → la mitad, las dos tomas de la mitad, la mitad → el apartamento y el clímax → el CTA) van libres
 * (la regla del piano: solo los cortes secos piden golpe). Las del f347 (8,1 dB) y la del 741 (11,2 dB) acaban, además, en un golpe.
 *
 * EL RECORRIDO ES HORIZONTAL. Los planos de la unidad y del apartamento son 1920×1080 (2-sep): `normalizar.mjs` los RECORTA al centro (608×1080) y los escala ×2,13: salen más BLANDOS que Isabella en 4K. Es el material.
 * Ningún dron (no hay). Isabella lleva el vestido negro del 17-oct y todo el recorrido es del rodaje del 31-ago / 2-sep: dos días y dos luces distintas, que el color por plano casa.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(11)` = 11/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS.
 * Todos los clips normalizados van a 30 fps constantes (HK03, de 29,97, también: 186 fotogramas en 6,2 s; se cuentan en el MP4 normalizado).
 *
 * LA PRIMERA TOMA LLEVA VOZ Y TEXTO (excepción declarada): el frame 0 es Isabella y no la casa; su primera palabra suena en el f17. La puerta lo dice en cada pasada (`ABRE_CON_EL_HOOK`).
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la prueba se
 * hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-046.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-046";

export const FPS_046 = 30;

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
  /** `foto` solo para la tarjeta oscura del cierre (`c12-cierre`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella: el WAV de su voz TRATADA (`<toma>-voz.wav`, `normalizar.mjs`). */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido del usuario desde la V9: «mientras habla Isabella sube los decibeles sin saturar»). Las voces crudas llegan a −22,3 · −22,7 · −20,2 · −20,5 LUFS en su ventana
 * de voz; cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS) hasta ≈ −15
 * LUFS con el pico real a −2,5 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Armin van Buuren - Children (from 'Piano' album)» — `archivos/musica/…Children….mp3` (sha 8 `80bd8abe`), piano neoclásico, 5:15, SIN pulso (31 % de los golpes fuertes a ≤ 15 ms en la V5). Se entra en su golpe de
 * 175,883 s (9,7 dB) y de ahí suena a −10 LUFS (picos de −0,3 a −1,0 dBFS: se BAJA ≈ 4-6 dB) hasta el 211,5 s, donde cae a un lecho que se apaga hacia el 215 s (y a los 216 s entra otro pasaje: la música acaba antes).
 * Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir») en que entra cada plano que corta SECO, con su fuerza en dB por 15 ms:
 * `proyectos/046/musica/golpes-046.json` (`medir-pista.py --json`).
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (el hook, a corte; la música entra con ella). */
  apertura: { t: 175.883, db: 9.7 },
  /** La Social Kitchen (RC11), a corte desde el carril de nado. */
  social: { t: 184.329, db: 11.4 },
  /** La Social Kitchen desde el otro lado (RC12), a corte. */
  vista: { t: 187.344, db: 8.1 },
  /** La alcoba (RC05): entra con disolvencia que ACABA en este golpe, el más fuerte del tramo. */
  alcoba: { t: 200.474, db: 11.2 },
  /** El baño (RC09), a corte. */
  bano: { t: 203.935, db: 8.3 },
  /** LA TERRAZA AL ATARDECER (RC18), el clímax, a corte. */
  terraza: { t: 206.945, db: 9.2 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: 50 ms antes del golpe de entrada (175,883 s), redondeado a un frame (5275/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 5275 / FPS_046;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_046;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_046;

/** Isabella: un empuje lento la acompaña. Los recorridos, quietos (la cámara ya se mueve). */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-046/${id}.mp4`;
const a = (id: string): string => `recorrido-046/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE del canal (la del 017): contraste con cuerpo, negros hundidos, luces recogidas, un punto cálido y +10 % de saturación. Orden del efecto: exposición → balance de blancos → sombras/luces/blancos/negros → contraste →
 * saturación → vibrance. `vibrance` ≤ 0,05 y las tomas de Isabella, `saturation` ≤ 1,06: la piel se queda donde estaba. El AJUSTE de cada plano se mide (`herramientas/medir-color.py`), no se hereda: aquí hay que casar a
 * Isabella en 4K HLG (17-oct) con recorridos 1080p SDR del 31-ago / 2-sep (una piscina bajo el cielo cubierto, una Social Kitchen cálida, una alcoba blanca, un baño de madera, una terraza al atardecer).
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
 * El frame de cada cambio de plano. Los CORTES SECOS caen en el frame en que SUENA su golpe medido (arriba); las DISOLVENCIAS tienen su `en` donde la imagen nueva ya es opaca y no piden golpe.
 */
const P = {
  unidad: 184, //       el carril de nado: disolvencia desde el hook (visible desde el f172), después de su última palabra (f169)
  social: golpe(GOLPE.social), //   256 · la Social Kitchen, a corte
  vista: golpe(GOLPE.vista), //     347 · la Social Kitchen desde el otro lado, a corte
  mitad1: 435, //       MD02: Isabella entra con una disolvencia (visible desde el f423); su primera palabra, en el f436
  mitad2: 543, //       MD03: disolvencia desde MD02 (visible desde el f531, 4 f después de la última palabra de MD02); su primera palabra, en el f545
  alcoba: golpe(GOLPE.alcoba), //   741 · la alcoba: disolvencia desde MD03 que ACABA en el golpe (su última palabra, en el f725)
  bano: golpe(GOLPE.bano), //       845 · el baño, a corte
  terraza: golpe(GOLPE.terraza), // 935 · la terraza al atardecer, el clímax, a corte
  cta: 1086, //         CT02: disolvencia desde el clímax; su primera palabra suena en el f1087 = el 212,0 s de la canción, justo donde empieza su caída
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 5,57 s (167 f) y desde `desde` (22 f) le quedan 145. Su voz va de 0,76 a 4,98 s (f1087-1213 de la comp): 18 f (0,6 s) de su cara tras la última palabra, en los que la
 * imagen funde a negro (los últimos 6). Nada se congela: el plano acaba en el último fotograma del clip.
 */
const DUR_CTA = 145;

/**
 * Dónde acaba la música (frame de la comp): su envolvente llega a cero aquí, ANTES de que entre el siguiente pasaje de la canción (el 216,0 s = el f1205: golpe de 16,6 dB): la tarjeta va en silencio.
 */
export const FIN_MUSICA_046 = 1190;

export const metraje046: readonly Corte[] = [
  // ── Bloque 2 · el hook (abre la pieza) ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk03"),
    audio: a("hk03-voz"),
    voz: {
      s0: 0.57,
      s1: 5.62,
      lufs: -15.0,
      dice: "Cuando llegas a una ciudad que no es la tuya, el acompañamiento personalizado es una plusvalía indispensable.",
    },
    // La toma dura 6,2 s (186 f, a 29,97 fps en el original y a 30 en el MP4 normalizado). La voz va de 0,57 a 5,62 s (`onsets-voz.py`: la primera sílaba sube a los 0,57 s y la última acaba a los 5,62 s; whisper
    // pone «indispensable» hasta los 5,99 s por el DTW, y la energía dice que no). Entra a corte en el f0 (desde 0) con el golpe de la canción en el f3: la música baja con curva DESPUÉS y acaba ANTES de su primera
    // palabra (f17). Tras la última palabra (f169) quedan 17 f de toma: sale con una disolvencia (f172-184) a la unidad; el clip se usa hasta el f184 de sus 186.
    desde: 0,
    en: 0,
    dur: P.unidad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ saturation: 1.03 }),
    reason:
      "Las escaleras exteriores, el edificio detrás (la ciudad nueva): Isabella habla desde el fotograma 0 y dice «cuando llegas a una ciudad que no es la tuya, el acompañamiento personalizado es una plusvalía indispensable». Abre la pieza a corte, con el golpe de la canción.",
  },
  // ── Bloque 3 · la unidad: el carril de nado, la Social Kitchen y su otro lado ──
  {
    id: "c03-piscina",
    bloque: 3,
    tipo: "video",
    src: v("rc17"),
    // RC17 (Img 9527, 31-ago, 7,7 s), del 4,30 al 6,70 s: el carril de nado visto desde el otro extremo, en diagonal, con el árbol grande y el cielo cubierto del atardecer; gira despacio a la derecha (flujo ≈ −5 px/f a 540 px). Se
    // eligió RC17 y no RC16 porque las demás piezas del arriendo ya usan RC16 (declarado en `combinaciones.md`), y esta parte porque el principio del clip (los escalones) trae bañistas en el agua. Con el recorte centrado el
    // carril ocupa el tercio de abajo y los árboles y el cielo, el resto: es lo que da el 608 de 1920. Entra con la disolvencia desde el hook (hay 129 f de clip antes del `desde`). Sale A CORTE en el golpe de 11,4 dB del f256.
    desde: fr(129),
    en: P.unidad,
    dur: P.social - P.unidad,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ shadows: 0.2, blacks: 0, exposure: 0.15 }),
    reason:
      "El carril de nado entre los árboles (la unidad): lo primero que se ve al salir de las escaleras, el agua y el verde; la cámara gira despacio a la derecha y abre el paseo de la unidad sin voz.",
  },
  {
    id: "c04-social",
    bloque: 3,
    tipo: "video",
    src: v("rc11"),
    // RC11 (Img 9513, 6,9 s), del 0,40 al 3,43 s: la Social Kitchen / coworking, el mostrador con las banquetas, el techo de listones y las lámparas verdes que van entrando; gira a la derecha (≈ −4 a −9 px/f). SIN gente
    // en el cuadro (la parte de atrás del clip, del 5 al 6 s, trae a un hombre con portátil en primer plano: no se usa). A corte en el golpe de 11,4 dB del f256.
    desde: fr(12),
    en: P.social,
    dur: P.vista - P.social,
    zoom: QUIETO,
    entra: "corte",
    color: color({ shadows: 0.25, blacks: 0, exposure: 0.2 }),
    reason: "La Social Kitchen, las lámparas verdes (la unidad, por dentro): del agua a un sitio donde juntarse; sigue girando a la derecha, en el mismo sentido que el carril de nado.",
  },
  {
    id: "c05-social-vista",
    bloque: 3,
    tipo: "video",
    src: v("rc12"),
    // RC12 (Img 9514, 7,4 s), del 0,40 al 3,33 s: la Social Kitchen desde el otro lado, más cerca: la isla blanca, las sillas de madera y el mural al fondo (de lo general, RC11, a lo cercano); gira a la derecha (≈ −6 px/f). Sin gente casi
    // en el cuadro (a partir de los 2,5 s aparece, lejos y diminuta, una persona de amarillo al fondo). Entra con una DISOLVENCIA que acaba en el golpe de 8,1 dB del f347: un corte seco saltaba +33 niveles de luma (la cocina
    // oscura de RC11 → la isla blanca de RC12) y se leería como un parpadeo. Acaba donde entra la mitad, con otra disolvencia.
    desde: fr(12),
    en: P.vista,
    dur: P.mitad1 - P.vista,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason: "La Social Kitchen desde el otro lado, el ventanal y las sillas: el último espacio de la unidad antes de que Isabella cuente qué incluye el acompañamiento; mantiene el giro a la derecha.",
  },
  // ── Bloque 4 · la mitad EN DOS TOMAS (la terraza común) ──
  {
    id: "c06-mitad-uno",
    bloque: 4,
    tipo: "video",
    src: v("md02"),
    audio: a("md02-voz"),
    voz: { s0: 0.69, s1: 3.66, lufs: -15.0, dice: "Te acompañamos desde el día uno con atención personalizada." },
    // MD02 (IMG_4278, 4,4 s = 132 f): la pérgola con las plantas detrás. La voz va de 0,69 a 3,66 s (`onsets-voz.py`: «Te-a-com-…» sube a los 0,695 s; la «da» de «personalizada» acaba a los 3,66 s). `desde` 20 f
    // (hay 20 f antes: la disolvencia pide 12): su primera palabra suena en el f436, con la imagen ya opaca, y la última en el f525. Sale con una disolvencia a MD03 (f531-543, tras 6 f de margen).
    desde: fr(20),
    en: P.mitad1,
    dur: P.mitad2 - P.mitad1,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.06, highlights: -0.25, saturation: 1.03 }),
    reason:
      "La terraza común, la pérgola con las plantas (la mitad, primera toma): Isabella dice «te acompañamos desde el día uno con atención personalizada». Entra con una disolvencia (cambia el registro, no el sitio).",
  },
  {
    id: "c07-mitad-dos",
    bloque: 4,
    tipo: "video",
    src: v("md03"),
    audio: a("md03-voz"),
    voz: { s0: 0.68, s1: 6.66, lufs: -15.1, dice: "Contamos con chef privado, tours, masajes y transporte y las mejores experiencias de la ciudad de Medellín." },
    // MD03 (IMG_4285, 7,23 s = 217 f): la misma terraza, camina bajo la pérgola hacia cámara. La voz va de 0,68 a 6,66 s («Con-ta-mos» sube a los 0,68 s; «Me-de-llín» acaba a los 6,66 s). `desde` 18 f: su primera palabra
    // suena en el f545 y la última en el f725 (4 f de margen hasta que empieza la disolvencia al apartamento, en el f729). Dura 198 de los 199 f que le quedan al clip.
    desde: fr(18),
    en: P.mitad2,
    dur: P.alcoba - P.mitad2,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.06, highlights: -0.25, saturation: 1.03 }),
    reason:
      "La terraza común, bajo la pérgola (la mitad, segunda toma, otro sitio de la misma terraza): Isabella dice «contamos con chef privado, tours, masajes y transporte y las mejores experiencias de la ciudad de Medellín». Son DOS tomas unidas con una disolvencia.",
  },
  // ── Bloque 5 · el apartamento y la terraza al atardecer ──
  {
    id: "c08-alcoba",
    bloque: 5,
    tipo: "video",
    src: v("rc05"),
    // RC05 (Img 9477, 10,2 s), del 3,60 al 7,07 s: la alcoba principal, el borde de la cama, la puerta de cristal del baño y los cuadros de la pared; gira a la derecha (≈ −7 px/f). Es la parte del clip que las demás piezas
    // del arriendo usan menos (ellas toman el principio, con la cama y la lámpara). Entra con la disolvencia desde MD03 que ACABA en el golpe de 11,2 dB del f741.
    desde: fr(108),
    en: P.alcoba,
    dur: P.bano - P.alcoba,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason: "La alcoba principal (lo privado): tras la terraza, la cama hecha, la lámpara y la puerta del baño; el plano respira más que los de la unidad y gira a la derecha hacia el baño.",
  },
  {
    id: "c09-bano",
    bloque: 5,
    tipo: "video",
    src: v("rc09"),
    // RC09 (Img 9484, 8,2 s), del 3,00 al 6,00 s: el mueble de madera, las toallas, la ventanita del espejo, el lavamanos y el grifo; gira a la derecha (≈ −10 a −12 px/f). Se corta ANTES de que entre el champú con su etiqueta
    // (a partir de los 6,3 s). Las demás piezas del arriendo toman tramos parecidos (la puerta lo informa en 7b). A corte en el golpe de 8,3 dB del f845.
    desde: fr(90),
    en: P.bano,
    dur: P.terraza - P.bano,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.15, highlights: -0.3 }),
    reason: "El baño principal, el mueble de madera y el espejo (cuidado, calma): sigue la puerta del baño de la alcoba, en el mismo giro a la derecha.",
  },
  {
    id: "c10-terraza",
    bloque: 5,
    tipo: "video",
    src: v("rc18"),
    // RC18 (Img 9528, 7,4 s), del 0,10 al 5,13 s: la terraza común AL ATARDECER: empieza con el último sol sobre el horizonte y la ciudad (0-2 s), gira a la derecha y acaba con la pérgola negra y el suelo de la terraza (4-5 s);
    // es EL CLÍMAX y el plano más largo del bloque (151 f). El giro va rápido hacia los 2-3 s (≈ 15 px/f a 540 px). A corte en el golpe de 9,2 dB del f935; la canción sostiene su meseta hasta el f1057 y cae cuando entra el CTA.
    desde: fr(3),
    en: P.terraza,
    dur: P.cta - P.terraza,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.25, shadows: 0.2 }),
    reason: "La terraza al atardecer (la ciudad, el horizonte, la pérgola): el clímax, el plano más largo del bloque y la recompensa de la ciudad nueva; la última imagen del apartamento antes del CTA.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c11-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct02"),
    audio: a("ct02-voz"),
    voz: {
      s0: 0.76,
      s1: 4.98,
      lufs: -15.0,
      dice: "Si quieres un apartamento amueblado que tenga acompañamiento personalizado, escríbeme.",
    },
    // CT02 (IMG_4294, 5,57 s = 167 f): Isabella en el jardín con árboles y plantas. La voz va de 0,76 a 4,98 s («Si» sube a los 0,78 s; «escríbeme» acaba a los 5,0 s). `desde` 22 f (hay 22 f antes: la disolvencia pide 12):
    // su primera palabra suena en el f1087, con la canción ya cayendo, y la última en el f1213. Entra con una disolvencia desde el clímax. Nada se congela: el plano acaba en el último fotograma del clip.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-046.ts`): «amueblado» (f1110-f1127 = 37,0-37,6 s; whisper oye «movilado»; la segunda vocal mide [e], no /o/: ver formantes).
    desde: fr(22),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.06, highlights: -0.25, saturation: 1.03 }),
    reason:
      "El jardín con árboles y plantas (la invitación): Isabella dice «si quieres un apartamento amueblado que tenga acompañamiento personalizado, escríbeme». Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-046.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c12-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-046/cierre-oscuro.png",
    en: P.cta + DUR_CTA,
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason: "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` del último plano). */
export const DURACION_046 = P.cta + DUR_CTA + DUR_TARJETA;
