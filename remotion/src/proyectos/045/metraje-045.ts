/**
 * EL RECORRIDO 045 — «Apartamento en ARRIENDO en Tierra Grata Bosque Santo (El Poblado)», V27 del registro y PRIMERO de los seis reels de esta propiedad (045-050), «EL TIEMPO» — los planos, como DATOS.
 *
 * Encargo (2026-10-19, una de las seis sesiones del lote V27-V32): promocionar el ARRIENDO (COP 14,8 millones al mes) con Isabella Cadavid, cada reel en dos formatos (orgánico y «con ficha»). Reparto FIJO en
 * `proyectos/044/reparto-045-050.md`; material en `proyectos/044/catalogo-material.md`. El rodaje del 17-oct NO siguió el libreto 044: Isabella grabó once frases del ángulo «acompañamiento personalizado» en las ZONAS
 * COMUNES de la unidad, y el recorrido (22 clips) son vídeos VERTICALES guardados ANAMÓRFICOS (1920×1080 con SAR 81:256, DAR 9:16): se escalan sin recorte a 1296×2304 (×2,13 en vertical), así que salen algo más blandos que ella (4K).
 *
 *   hook   HK01  «El tiempo es el activo más valioso de los seres humanos y te ayudamos a optimizarlo incluyendo un aseo semanal.»          (la REPITE la V30 / 048)
 *   mitad  MD01  «De esta manera tendrás todo ordenado y aprovecharás el tiempo en lo que eres mejor.»                                       (continúa a HK01: «de esta manera»)
 *   CTA    CT01  «Si quieres un acompañamiento personalizado durante toda tu estancia, contáctanos.»                                         (la REPITE la V31 / 049)
 *
 * LA IDEA EN UNA LÍNEA. Este apartamento es PARA QUIEN QUIERE GANAR TIEMPO EN UNA CIUDAD QUE NO ES LA SUYA: el hook dice que el tiempo es lo más valioso y que se le ayuda a ganarlo (el aseo semanal va incluido), la
 * mitad dice en qué se gasta ese tiempo («lo que eres mejor») y el CTA invita al acompañamiento. Los planos de la unidad enseñan DÓNDE se gasta (trabajar en la Social Kitchen, entrenar, nadar); los del apartamento,
 * lo que vuelve ordenado (la alcoba y el baño en su sitio) y, de clímax, el balcón al atardecer con el JACUZZI PRIVADO. Ninguna cifra en pantalla ni en voz (el precio va en la ficha del formato funnel y en el caption);
 * ni administración, ni contrato, ni qué se paga aparte: la ficha de la web no lo dice.
 *
 *   bloque 1  c01                  la APERTURA: el APARTAMENTO, de la isla de la cocina con sus taburetes al ventanal (RC01), SIN TEXTO NI VOZ
 *   bloque 2  c02                  Isabella camina hacia cámara por la terraza con la pérgola y la vista (HK01): el hook (entra con una disolvencia que acaba en un golpe)
 *   bloque 3  c03 c04 c05          el paseo por la UNIDAD: la Social Kitchen con sus lámparas y el mural (RC11) → el gimnasio (RC14) → el carril de nado entre los árboles (RC16)
 *   bloque 4  c06                  Isabella en la terraza con la ciudad y las montañas detrás: la mitad (MD01, a corte en un golpe)
 *   bloque 5  c07 c08 c09          el APARTAMENTO: la cama hecha de la alcoba principal (RC05) → el baño (RC09) → LA VISTA: el balcón al atardecer con las luces de la ciudad y el JACUZZI PRIVADO (RC21, el plano más largo)
 *   bloque 6  c10 c11              Isabella junto al jacuzzi comunal: el CTA (CT01); y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA, POR GOLPES. «Fortitude (Light Version)» (biblioteca del repo) entra en el golpe de 9,834 s (11,3 dB) y los cortes caen en golpes medidos de 8,3 a 15,5 dB; las dos disolvencias
 * (la entrada del hook y la del paseo) acaban en golpes de 8,0 y 6,1 dB (una disolvencia no pide golpe: `herramientas/buscar-cortes-043.py` con `TIPOS=cddccccccc`, `MINC=8`, `MIND=6`, `musica/`).
 * LA CANCIÓN ES SUAVE (−21…−17 LUFS entre los s 10 y 45) y casi sin transitorios fuertes: no hay ninguna rejilla con TODOS los cortes ≥ 9 dB; la de esta pieza es la ÚNICA de la canción con los cortes secos
 * ≥ 8,3 dB entre los 10 y los 50 s.
 *
 * LOS RECORRIDOS (todos SDR, 1920×1080 con SAR 81:256 = verticales 9:16 comprimidos a lo ancho: `normalizar.mjs` los escala SIN recorte). Cada tramo se eligió mirando los fotogramas enteros; todos giran a la DERECHA mientras
 * avanzan (raccord: `viaje-emocional.md` §5). La primera versión de esta pieza los recortó al centro (`crop=608:1080`) dando por hecho que eran apaisados (catálogo §7): era un zoom ×3,2 del tercio central; la sesión 050
 * avisó y se rehízo entera (tramos, color y prueba).
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(15)` = 15/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f121, 4 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Aquí hay que casar tres tomas de Isabella a la luz de
 * la tarde (4K HLG pasado a BT.709) con recorridos SDR de interior (RC01, RC05, RC09: claros y cálidos), de la unidad (RC11, RC14: oscuros) y de exterior a la hora azul (RC16, RC21). Con `color` el render lleva
 * `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-045.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-045";

export const FPS_045 = 30;

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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido del usuario desde la V9: «mientras habla Isabella sube los decibeles sin saturar»). Las voces crudas llegan a −21,5 · −21,3 · −20,8 LUFS en su ventana de voz;
 * cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS) hasta ≈ −15 LUFS con el
 * pico real a −2,5 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Fortitude (Light Version)» — `archivos/musica/Fortitude (Light Version).mp3` (sha 8 `493eeec6`), 3:33. Se entra en su golpe de 9,834 s (11,3 dB) y de ahí suena a −21…−17 LUFS (la parte suave de la canción: 10-45 s)
 * hasta el 50 s. Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir») en que entra cada plano, con su fuerza en dB por 15 ms:
 * `proyectos/045/musica/golpes-045.json` (`medir-pista.py --json`, la canción entera). Salen de `buscar-cortes-043.py` (`musica/buscar-cortes-045-*.txt`).
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  apertura: { t: 9.834, db: 11.3 },
  /** Isabella entra con una DISOLVENCIA que acaba en este golpe; su primera sílaba suena 10 f después. */
  hook: { t: 13.435, db: 8.0 },
  /** La Social Kitchen entra con una disolvencia que acaba en este golpe (6,1 dB: las disolvencias no piden golpe). */
  paseo: { t: 20.18, db: 6.1 },
  /** El gimnasio. */
  gimnasio: { t: 23.548, db: 8.8 },
  /** El carril de nado. */
  piscina: { t: 27.116, db: 8.3 },
  /** Isabella entra A CORTE con la mitad; su primera sílaba suena 10 f después. */
  mitad: { t: 30.512, db: 8.3 },
  /** La alcoba principal (a corte, el golpe más fuerte tras la mitad). */
  alcoba: { t: 35.382, db: 13.5 },
  /** El baño. */
  bano: { t: 38.5, db: 10.5 },
  /** LA VISTA, el plano más largo del bloque 5: el balcón con el jacuzzi privado. */
  vista: { t: 41.235, db: 11.2 },
  /** Isabella entra A CORTE con el CTA; su primera sílaba suena 10 f después. */
  cta: { t: 46.873, db: 15.5 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: 50 ms antes del golpe de entrada (9,834 s), redondeado a un frame (294/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 294 / FPS_045;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_045;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_045;

/** Isabella camina hacia cámara: un empuje lento la acompaña. Los recorridos, quietos: ya vienen ×2,13 desde 1080 px y cualquier punch-in los ablanda más. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-045/${id}.mp4`;
const a = (id: string): string => `recorrido-045/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE del canal (la del 017): contraste con cuerpo, negros hundidos, luces recogidas, un punto cálido y +10 % de saturación. Orden del efecto: exposición → balance de blancos → sombras/luces/blancos/negros → contraste →
 * saturación → vibrance. `vibrance` ≤ 0,05 (sobre hormigón gris pinta un moteado de colores y vuelve rosadas las nubes) y las tomas de Isabella, `saturation` ≤ 1,06: la piel se queda donde estaba. El AJUSTE de cada plano
 * se mide (`herramientas/medir-color.py`), no se hereda.
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
 * El frame de cada cambio de plano: el del golpe de la canción en que entra (arriba).
 */
const P = {
  hook: golpe(GOLPE.hook), //         111 · Isabella: la disolvencia ACABA aquí (empieza 12 f antes); su primera palabra, 10 f después
  paseo: golpe(GOLPE.paseo), //       313 · acaba el hook; la Social Kitchen entra con una disolvencia que acaba aquí
  gimnasio: golpe(GOLPE.gimnasio), // 414 · el gimnasio, a corte
  piscina: golpe(GOLPE.piscina), //   521 · el carril de nado, a corte
  mitad: golpe(GOLPE.mitad), //       623 · Isabella entra a corte con la mitad
  alcoba: golpe(GOLPE.alcoba), //     769 · la alcoba principal, a corte
  bano: golpe(GOLPE.bano), //         863 · el baño, a corte
  vista: golpe(GOLPE.vista), //       945 · la vista, el plano más largo del bloque 5 (169 f), a corte
  cta: golpe(GOLPE.cta), //          1114 · Isabella entra a corte con el CTA
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 5,17 s (155 f) y desde `desde` (11 f) le quedan 144. Su voz va de 0,70 a 4,52 s (f1124-1239 de la comp): 19 f (0,6 s) de su cara tras la última palabra, en los que la
 * imagen funde a negro (los últimos 6). Nada se congela: el plano acaba en el último fotograma del clip.
 */
const DUR_CTA = 144;

/**
 * Dónde acaba la música (frame de la comp): se apaga en línea recta bajo la tarjeta y llega a cero 2 f antes del final de la pieza.
 */
export const FIN_MUSICA_045 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje045: readonly Corte[] = [
  // ── Bloque 1 · la apertura ──
  {
    id: "c01-apertura",
    bloque: 1,
    tipo: "video",
    src: v("rc01"),
    // RC01 (Img 9461), del 0,00 al 3,70 s: de la isla de la cocina (la placa y la encimera blanca con las luces del techo) a su fila de taburetes negros en diagonal y el ventanal sobre el jardín: la cámara avanza y gira a la
    // derecha (raccord con todos los planos que siguen). El clip sigue hasta las puertas correderas con el balcón y la vista (a partir de ≈ 8 s): esa parte NO entra, porque la vista no se enseña entera antes del bloque 5. Entra a corte
    // con el golpe de 11,3 dB del f3 (no nace de negro) y YA VA EN MOVIMIENTO DESDE EL FRAME 0. Es la apertura EXCLUSIVA de esta pieza (el reparto: nadie más la usa).
    desde: 0,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.05, highlights: -0.3, whites: -0.2, shadows: 0.12 }),
    reason:
      "Cocina del apartamento (la promesa de orden): la isla con sus taburetes y el ventanal, limpia y en movimiento desde el primer fotograma. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk01"),
    audio: a("hk01-voz"),
    voz: {
      s0: 0.82,
      s1: 6.62,
      lufs: -15.0,
      dice: "El tiempo es el activo más valioso de los seres humanos y te ayudamos a optimizarlo incluyendo un aseo semanal.",
    },
    // La voz empieza a los 0,82 s («El», −21 dB; el catálogo decía «casi en el f0»: es el DTW de whisper, que pone la primera palabra de toda toma en 0,00 s — R29) y acaba a los 6,62 s; el clip dura 7,50 s (225 f).
    // `desde` 15 f (0,5 s): la disolvencia (12 f) empieza en el f3 del clip y ACABA en el golpe de 8,0 dB del f111, y la primera sílaba suena 10 f después (f121): la música baja con curva DESPUÉS del golpe y acaba antes de que hable.
    // El plano dura 202 f (hasta el golpe del f313): 18 f tras la última palabra, y la disolvencia al paseo empieza 6 f después de ella.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-045.ts`): «aseo» (whisper oye «asedio» y «hace dos»; confianza 0,37), hacia los 5,87 s de la toma.
    // Isabella camina hacia cámara por la terraza de la unidad, con la pérgola arriba, el cristal y la vista detrás: el empuje la acompaña.
    desde: fr(15),
    en: P.hook,
    dur: P.paseo - P.hook,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.06, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "Terraza común de la unidad (la promesa): Isabella camina hacia cámara y dice «el tiempo es el activo más valioso… y te ayudamos a optimizarlo incluyendo un aseo semanal». Entra con una disolvencia que acaba en un golpe.",
  },
  // ── Bloque 3 · el paseo por la unidad: dónde se gasta el tiempo ganado ──
  {
    id: "c03-social-kitchen",
    bloque: 3,
    tipo: "video",
    src: v("rc11"),
    // RC11 (Img 9513), del 0,80 al 4,17 s: la Social Kitchen / coworking: la barra con las máquinas de café, las mesas y las lámparas verdes bajo el techo de listones, y el mural de hojas, girando a la derecha mientras avanza. Se acaba
    // en 4,17 s porque desde ≈ 6 s entra un hombre de amarillo por la derecha. La disolvencia entra 12 f antes del golpe de 6,1 dB del f313 (clip: desde 0,80 s → el tramo de la disolvencia es 0,40-0,80 s).
    desde: 0.8,
    en: P.paseo,
    dur: P.gimnasio - P.paseo,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.4, shadows: 0.5, highlights: -0.1, contrast: 1.0 }),
    reason:
      "Social Kitchen de la unidad (trabajar): tras «te ayudamos a optimizarlo» se ve DÓNDE se gasta lo ganado, la barra, las mesas y las lámparas verdes del coworking.",
  },
  {
    id: "c04-gimnasio",
    bloque: 3,
    tipo: "video",
    src: v("rc14"),
    // RC14 (Img 9517), del 0,00 al 3,57 s: el gimnasio: la estantería con balones y la pared de rayas naranjas, que se va quedando a la derecha mientras la cámara gira a la derecha hacia las máquinas y el letrero GIMNASIO. Al fondo, dos
    // personas entrenando (en el banco y en la elíptica), pequeñas y lejanas (≈ 6 % del alto, sin cara reconocible). El clip sigue con las caminadoras en primer plano y un hombre corriendo, que NO entran (a partir de ≈ 4 s).
    desde: 0,
    en: P.gimnasio,
    dur: P.piscina - P.gimnasio,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.2, shadows: 0.45, highlights: -0.3, whites: -0.15, contrast: 1.0 }),
    reason:
      "Gimnasio de la unidad (cuidarte): el segundo uso del tiempo ganado, la sala de máquinas y las caminadoras; sigue el giro a la derecha de la Social Kitchen.",
  },
  {
    id: "c05-piscina",
    bloque: 3,
    tipo: "video",
    src: v("rc16"),
    // RC16 (Img 9525), del 2,00 al 5,40 s: la piscina y el carril de nado bajo los árboles, con el cielo del final de la tarde: la cámara gira a la derecha hacia el carril largo (RC16 sigue hasta la ciudad, a partir de ≈ 8 s: no entra).
    desde: 2.0,
    en: P.piscina,
    dur: P.mitad - P.piscina,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.15, shadows: 0.4, highlights: -0.4, whites: -0.3, contrast: 1.04 }),
    reason:
      "Piscina de la unidad (descansar): el tercer uso del tiempo, el agua y los árboles al aire libre; acaba mirando hacia la terraza donde espera Isabella.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md01"),
    audio: a("md01-voz"),
    voz: {
      s0: 0.62,
      s1: 4.73,
      lufs: -15.0,
      dice: "De esta manera tendrás todo ordenado y aprovecharás el tiempo en lo que eres mejor.",
    },
    // La voz empieza a los 0,62 s («De», −47 → −12 dB; antes hay un chasquido de labios a 0,55 s que la voz tratada deja fuera) y acaba a los 4,73 s; el clip dura 5,17 s (155 f). `desde` 9 f entra A CORTE en el golpe de 8,3 dB del f623 (suena entero:
    // la música baja con curva DESPUÉS) y la primera sílaba suena 10 f después. El plano dura 146 f (hasta el golpe del f769): usa el clip hasta su último fotograma; 13 f tras la última palabra.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-045.ts`): «todo ordenado» (whisper oye «de nada»; confianza de «todo» 0,3), hacia los 2,0 s de la toma.
    // Isabella camina hacia cámara bajo la pérgola de la terraza, con la ciudad y las montañas detrás.
    desde: fr(9),
    en: P.mitad,
    dur: P.alcoba - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.06, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "Terraza común, bajo la pérgola (la promesa cumplida): Isabella dice «de esta manera tendrás todo ordenado y aprovecharás el tiempo en lo que eres mejor». Entra a corte en un golpe.",
  },
  // ── Bloque 5 · el apartamento: lo ordenado y la vista ──
  {
    id: "c07-alcoba",
    bloque: 5,
    tipo: "video",
    src: v("rc05"),
    // RC05 (Img 9477), del 0,30 al 3,43 s: la alcoba principal, la cama hecha con sus cojines negros y beige, la lámpara y la mesa de noche, girando a la derecha hacia la puerta del baño.
    desde: 0.3,
    en: P.alcoba,
    dur: P.bano - P.alcoba,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.15, blacks: 0, shadows: 0.25, highlights: -0.4, whites: -0.3, saturation: 1.04 }),
    reason:
      "Alcoba principal del apartamento (todo ordenado): la cama hecha, lista para quien llega; tras «todo ordenado» el espectador entra en el apartamento por lo íntimo.",
  },
  {
    id: "c08-bano",
    bloque: 5,
    tipo: "video",
    src: v("rc09"),
    // RC09 (Img 9484), del 2,30 al 5,03 s: el baño principal, el mueble de madera con los dos lavamanos, el espejo y la ventana, girando a la derecha hacia la ducha.
    desde: 2.3,
    en: P.bano,
    dur: P.vista - P.bano,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.2, highlights: -0.4, whites: -0.3, saturation: 1.04 }),
    reason:
      "Baño principal (cuidado, calma): el mueble de madera y los lavamanos, todo en su sitio; sigue a la alcoba (su puerta) y prepara la salida al balcón.",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc21"),
    // RC21 (Img 9537 (1)), del 5,43 al 11,07 s (el último fotograma del clip): el balcón del apartamento al atardecer; la cámara gira a la derecha desde el horizonte con las montañas y las luces
    // de la ciudad, las torres de enfrente y el cristal de la baranda, hasta la BALDOSA NEGRA y el JACUZZI PRIVADO de madera con su escalón (la foto `3-Jacuzzi.png` de la ficha: aparece de ≈ 8,3 s al final y entero
    // hacia los 10,5-11,0 s). Es el clímax y el plano más largo del bloque 5 (169 f, 5,6 s). Cae sobre el golpe de 11,2 dB del f945.
    desde: 5.4333,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.2, shadows: 0.4, highlights: -0.4, whites: -0.3, saturation: 1.08 }),
    reason:
      "Balcón del apartamento al atardecer, con el jacuzzi privado (el clímax): las luces de la ciudad y, al final del giro, el jacuzzi de madera del balcón; lo que el tiempo ganado deja disfrutar. El plano más largo del bloque. Entra a corte en un golpe.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct01"),
    audio: a("ct01-voz"),
    voz: {
      s0: 0.7,
      s1: 4.52,
      lufs: -15.0,
      dice: "Si quieres un acompañamiento personalizado durante toda tu estancia, contáctanos.",
    },
    // La voz empieza a los 0,70 s («Si», −32 → −17 dB; antes hay un chasquido de labios a 0,63 s que la voz tratada deja fuera) y acaba a los 4,52 s; el clip dura 5,17 s (155 f). `desde` 11 f entra A CORTE en el golpe de 15,5 dB del f1114 y
    // la primera sílaba suena 10 f después. El plano dura 144 f (hasta el último fotograma del clip): 19 f tras la última palabra, en los que la imagen funde a negro (los últimos 6).
    // Isabella junto a la baranda de la terraza, con el jacuzzi comunal redondo detrás y las plantas.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-045.ts`): «toda tu estancia» (whisper oye «la testancia», «esta ancha», «a tu distancia»; «tu» 0,43), hacia los 2,8 s, y «contáctanos» (la última sílaba, hasta los 4,52 s; confianza 0,38).
    desde: fr(11),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.06, exposure: 0.1, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "Terraza de la unidad, junto al jacuzzi comunal (la invitación): Isabella dice «si quieres un acompañamiento personalizado durante toda tu estancia, contáctanos»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-045.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-045/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_045 = P.cta + DUR_CTA + DUR_TARJETA;
