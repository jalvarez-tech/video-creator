/**
 * EL RECORRIDO 053 — «Tierra Grata Bosque Santo (El Poblado), ARRIENDO», V35 del registro, «¿PAGARÍAS $14.800.000?» — los planos, como DATOS.
 *
 * Encargo (2026-10-20): replicar el tercero de los tres vídeos que otro editor hizo el 15-sep con el material del 2-sep (`videos editados/03.mp4`, 56,43 s) con las MISMAS TOMAS en el mismo orden, en el formato del canal y en sus dos
 * formatos (orgánico con rótulos editoriales y funnel con ficha). **CAMBIO DE ENCARGO ese mismo día** (reparto §5c): el vídeo va SIN voz en off y lo que decía la locución se sustituye por un guion NUEVO EN PANTALLA que resalta las
 * plusvalías del arriendo (aseo semanal incluido, acompañamiento personalizado, chef privado, conductor, la mejor asesoría), un rótulo por tramo y sincronizado a los planos y a los golpes de la música, no a una voz. Es la V35 del
 * registro; la canción (*Softly*, Judah Earl & Brandon Black) estaba reservada para ella. Análisis del original y decisiones en `proyectos/053/artefactos/01-plan.md`.
 *
 *   gancho   HK05  Isabella caminando hacia cámara en el balcón y DICIENDO «¿Deseas arrendar amoblado en Medellín? Ven, te muestro.» (su voz en directo, la segunda toma, 26,36-29,4 s; decisión del usuario, 2026-10-20, que sustituye al rótulo «¿Pagarías $14.800.000…?»; la primera toma, un falso arranque, se corta)
 *   rótulos  los nueve del reparto §5c, uno por tramo, en el orden del original (`subtitulos-053.ts`)
 *   CTA      CT05  «Si buscas más que un apartamento para vivir, escríbenos.»                                              (sentada en la silla de la sala; la MISMA toma cierra la 052: declarado)
 *
 * LA IDEA EN UNA LÍNEA. ¿Quieres arrendar amoblado en Medellín? Un apartamento amoblado de 113 m² con jacuzzi privado… y lo que viene con él: aseo semanal, acompañamiento personalizado, chef y conductor, la mejor asesoría. Lo que
 * prometen los rótulos lo dio el usuario; ninguno dice que el chef o el transporte vayan incluidos en el canon.
 *
 *   bloque 2  c01                  Isabella caminando hacia cámara en el balcón (HK05) y diciendo su gancho (EXCEPCIÓN DECLARADA a la regla fija 1: la réplica abre así)
 *   bloque 5  c02 … c08            el recorrido en el ORDEN DEL ORIGINAL, con un rótulo por tramo: el cielo y el JACUZZI PRIVADO (RC10) → la cocina y la sala con la palma (RC01) → el bar (RC22) → el balcón con las camas y las torres
 *                                  (RC03) → la alcoba y su pared con el televisor (RC05) → la sala con el sofá (RC04) → el carril de nado (RC16)
 *   bloque 6  c09 c10              Isabella sentada: el CTA a cámara (CT05); y la tarjeta oscura del cierre (nada se congela)
 *
 * LO QUE NO CUMPLE EL FORMATO Y SE DECLARA (la réplica manda). (1) La pieza abre con Isabella hablando, no con la casa limpia (regla fija 1). (2) No hay voz en off ni «recorrido mudo»: el texto de cada tramo es un rótulo que no acompaña a
 * ninguna voz (`SIN_VOZ` en la puerta). (3) El último plano del bloque 5 es el carril de nado y el más largo, el cielo con el jacuzzi (RC10, dos rótulos): el orden del original. (4) Isabella habla a cámara dos veces (gancho y CTA). (5) Los bloques son 2-5-6. (6) El gancho es el MISMO tramo y la misma frase que el del 051.
 *
 * LO QUE EL MATERIAL NO DA. (1) La ALCOBA del original no coincide con ninguno de los 22 clips del SSD (el editor tuvo otro): se usa RC05, el más parecido. (2) Los recorridos son anamórficos (608×1080 efectivos ×2,13) y salen más blandos que Isabella
 * en 4K. (3) No hay dron. (4) El original acelera RC10 ×1,4 y RC01 ×1,45; aquí van a ×1 (`velocidad` solo se admite en el bloque 3) y los tramos se recortan a lo que dura cada rótulo.
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA. «Softly» (orquestal, sin pulso) entra a los 46,77 s de la canción: cae en su calma (−21…−24 LUFS) bajo la voz del gancho y su GOLPE DE ENTRADA al tramo fuerte (50,93 s, 12,2 dB, tras un respiro de −28 LUFS) cae en el cambio del gancho al cielo
 * (f126). Los demás cambios de rótulo y de plano caen en golpes MEDIDOS de la canción (`GOLPES`, `musica/golpes-softly-*.json`): cinco de 9,5-15,7 dB y cuatro de 6,5-6,9 dB (una canción sin pulso no da una rejilla más densa: la mejor
 * combinación posible de planos de 3,0-5,3 s se buscó con un DP sobre sus golpes). Todas las entradas son DISOLVENCIAS de 12 f: no piden golpe (R33), pero el plano es opaco justo en él.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(12)` = 12/30 s); `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color`: la base del canal más el ajuste de su toma. Con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg
 * (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-053.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-053";

export const FPS_053 = 30;

export type Entrada = "corte" | "disolver";
export type Bloque = 1 | 2 | 3 | 4 | 5 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. `s0`/`s1`, medidos por energía (perfil de 20 ms en la banda de voz); `lufs`, con ebur128 sobre el WAV TRATADO que suena. */
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
  /** `foto` solo para la tarjeta oscura del cierre (`c10-cierre`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo la toma del CTA: el WAV de su voz TRATADA (`ct05-voz.wav`, `normalizar.mjs`). */
  audio?: string;
  voz?: VozDelCorte;
}

/** EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido del usuario desde la V9). La de CT05 pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1, ganancia y limitador a −2,5 dBFS). Excepción declarada a R29, por encargo. */
export const OBJETIVO_LUFS = -15;

/* ── La música: «Softly» (Judah Earl & Brandon Black) ───────────────────────
 *
 * `archivos/musica/Softly I Judah Earl & BRANDON BLACK #music #cinematic #orchestralmusic.mp3` (sha 8 `87d78dc2`), orquestal, 3:45, Do mayor, sin pulso fijo. Medida (ebur128 por 1 s y `medir-pista.py`,
 * `proyectos/053/musica/`): una calma de −22…−24 LUFS hasta los 50 s, un respiro de −28 LUFS a los 50,1 s y el PRIMER TRAMO FUERTE (de 50,9 a 105 s, −14,4 LUFS de media, con golpes de hasta 15,7 dB) que cae a los 105 s.
 *
 *   46,8 – 50,3 s    la calma: −21…−24 LUFS (pico −12,6)                                                 ← el gancho (Isabella caminando y hablando)
 *   50,1 s           el respiro: −28 LUFS
 *   50,93 s          el golpe de entrada del tramo fuerte (12,2 dB; −16,5 LUFS a los 51,1 s)               ← el cielo (f126)
 *   51,5 – 87,3 s    el tramo fuerte: −14,4 LUFS (pico −0,4), con golpes de 6,5-15,7 dB                      ← el recorrido
 *   87,3 s           golpe de 10,5 dB                                                                      ← entra la toma del CTA (f1267)
 *
 * Se entra a los 46,77 s (el frame 1403 de la canción a 30 fps). La música pesa más que en las piezas con locución: solo baja bajo la voz del gancho (que acaba 28 f antes del golpe del cielo y deja subir la música) y bajo la del CTA.
 */
export const INICIO_MUSICA = 1403 / FPS_053;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma para que lo que la música hace en un
 * instante de la canción caiga en el frame en que SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** El frame del vídeo en que SUENA un instante de la canción (sin redondear). */
export const frameDeCancion = (tCancion: number): number => (tCancion - INICIO_MUSICA + RETARDO_AUDIO) * FPS_053;

/**
 * LOS GOLPES en que cae cada cambio (segundo de la CANCIÓN y fuerza en dB por 15 ms, de `musica/golpes-softly-*.json`: `medir-pista.py --json`). Cada plano entra, y cada rótulo empieza, en el frame en que SUENA el suyo
 * (±1 f: la puerta lo comprueba). `rotulo` = el cambio es de TEXTO sobre el mismo plano. Cuatro son de 6,5-6,9 dB: la canción no tiene golpes más fuertes en esos 4 s y entre dos fuertes caben planos de 5-6 s (se prefirió el
 * rótulo a tiempo, con una nota de la canción, a uno de 6 s en pantalla).
 */
export const GOLPES = {
  cielo: { t: 50.929, db: 12.2 }, //   «Mira lo que incluye:» sobre el cielo, tras el respiro
  jacuzzi: { t: 55.182, db: 10.2, rotulo: true }, // «Jacuzzi privado con vista a Medellín» (la tina entra en cuadro)
  cocina: { t: 59.083, db: 6.9 }, //   «113 m² amoblados y equipados»
  bar: { t: 63.224, db: 15.7 }, //     «Piscina, gimnasio, spa y coworking» sobre el bar
  camas: { t: 65.669, db: 9.5 }, //    el balcón con las camas (mismo rótulo)
  torres: { t: 67.914, db: 6.6, rotulo: true }, // «Y lo que no esperabas:»
  alcoba: { t: 71.774, db: 6.7 }, //   «Aseo semanal incluido»
  acompanamiento: { t: 75.255, db: 14.4, rotulo: true }, // «Acompañamiento personalizado»
  sala: { t: 78.254, db: 6.5 }, //     «Chef privado y conductor a tu medida»
  piscina: { t: 82.424, db: 6.7 }, //  «Con la mejor asesoría de la ciudad»
  cta: { t: 87.297, db: 10.5 }, //     entra Isabella con el CTA
} as const;

/** El frame (entero) en que suena el golpe `g` de `GOLPES`. */
export const golpeExacto = (t: number): number => frameDeCancion(t);

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_053;

/** Todo el material es anamórfico escalado ×2,13: más escala lo ablandaría. Planos quietos. */
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-053/${id}.mp4`;
const a = (id: string): string => `recorrido-053/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE del canal (la del 017): contraste con cuerpo, negros hundidos, luces recogidas, un punto cálido y +10 % de saturación. Orden del efecto: exposición → balance de blancos → sombras/luces/blancos/negros → contraste →
 * saturación → vibrance. `vibrance` ≤ 0,05 y las tomas de Isabella, `saturation` ≤ 1,06: la piel se queda donde estaba. El AJUSTE de cada plano se mide (`herramientas/medir-color.py`), no se hereda.
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
 * El frame de cada cambio de plano (el frame en que el plano es OPACO; su disolvencia empieza 12 f antes): el del golpe de la canción en que cae (`GOLPES`).
 */
const P = {
  cielo: 126, //    el respiro acaba y entra el tramo fuerte (50,93 s): el cielo y el jacuzzi privado (la voz del gancho acaba en el f98 y la música sube con 24 f de coseno hasta el f122)
  cocina: 371, //   la cocina y la sala con la palma
  bar: 495, //      el bar
  balcon: 568, //   el balcón con las camas, las torres y el cielo
  alcoba: 752, //   la alcoba y su pared con el televisor
  sala: 946, //     la sala con el sofá
  piscina: 1071, // el carril de nado
  cta: 1217, //     Isabella con el CTA (la toma entra en el golpe de 87,3 s; su primera sílaba suena en el f1232, 15 f después)
} as const;

/** Frames que dura la toma del CTA: la voz va de 1,31 a 4,07 s del clip (f1232-f1315 de la comp) y la toma se corta 19 f después de la última palabra (los últimos 6 funden a negro). Nada se congela. */
const DUR_CTA = 117;

/** Dónde acaba la música (frame de la comp): se apaga bajo la tarjeta y llega a cero 2 f antes del final de la pieza. */
export const FIN_MUSICA_053 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje053: readonly Corte[] = [
  // ── Bloque 2 · el gancho: Isabella caminando (HK05) y DICE «¿Deseas arrendar amoblado en Medellín? Ven, te muestro.» ──
  {
    id: "c01-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk05"),
    audio: a("hk05-voz"),
    voz: { s0: 26.36, s1: 29.4, lufs: -15.0, dice: "¿Deseas arrendar amoblado en Medellín? Ven, te muestro." },
    // HK05 (`Img 9508.mp4`, 2-sep, anamórfico: se escala entero), de 26,13 a 30,33 s: Isabella (chaqueta de flores) camina hacia cámara por el balcón con la vista detrás, dice su frase y se acerca hasta el torso (la cara de lado llega a los
    // 32 s, fuera del plano). **Es SU VOZ EN DIRECTO** (decisión del usuario, 2026-10-20: «el vídeo del hook déjalo con sonido para que se escuche la voz de Isabella»): la única que hay en el clip. **Se equivoca al principio** («¿Desea-»,
    // 24,65-25,25 s, un falso arranque) y, tras 1,0 s de pausa, lo repite entero (por orden del usuario, 2026-10-20: «empieza el vídeo desde donde ella dice “deseas” la segunda vez»): «¿Deseas arrendar amoblado en Medellín?» (26,36-28,1 s:
    // «deseas» 26,38 · «arrendar» 26,70 · «amoblado» 27,00 · «en Medellín» 27,45), 0,5 s de pausa y «Ven, te muestro» (28,69-29,4 s). Es el MISMO tramo (la segunda toma) y la MISMA frase que usa el gancho del 051 (el reparto pedía otro tramo de HK05
    // sin su voz: el usuario prefirió oírla; se declara). El tramo mudo de 4,3-7,9 s con la pregunta de los $14.800.000, que era el gancho de la primera versión, ya no se usa. El frame 0 ES ELLA: excepción declarada a la regla fija 1 (la réplica abre así).
    // `desde` 784 f deja su primera sílaba en el f7 (≥ 3 f tras el f0: el desclic de una entrada a corte) y la última palabra en el f98, ≥ 14 f antes del cambio al cielo. El WAV tratado (`hk05-voz.wav`) es SILENCIO antes de los 26,29 s: el falso
    // arranque no suena aunque el clip lo tenga.
    desde: fr(784),
    en: 0,
    dur: P.cielo,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.1, shadows: 0.2, highlights: -0.35, whites: -0.2, saturation: 1.02, contrast: 1.06 }),
    reason: "Balcón (la promesa): Isabella camina hacia cámara con la ciudad detrás y dice «¿deseas arrendar amoblado en Medellín? Ven, te muestro»; el frame 0 es ella (la réplica abre así).",
  },
  // ── Bloque 5 · el recorrido con un rótulo por tramo, en el orden del original ──
  {
    id: "c02-cielo",
    bloque: 5,
    tipo: "video",
    src: v("rc10"),
    // RC10 (`Img 9509.mp4`, 31-ago/2-sep, anamórfico), de 2,5 a 10,67 s a ×1: el cielo con nubes y el sol entre ellas → las torres y la ciudad → el JACUZZI PRIVADO del balcón (la tina cuadrada con listones de madera y su escalón, de 7,2 s al
    // final). El original lo usa a ×1,4 (de 0,4 a 10,2 s en 7 s); aquí, a ×1, cubre DOS rótulos: «Mira lo que incluye:» sobre el cielo y la ciudad (hasta el f236) y «Jacuzzi privado con vista a Medellín» cuando la tina entra en cuadro.
    desde: 2.5,
    en: P.cielo,
    dur: P.cocina - P.cielo,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.05, highlights: -0.45, whites: -0.25, shadows: 0.35, saturation: 1.06 }),
    reason: "Balcón: el cielo, las torres y el jacuzzi privado con «mira lo que incluye» y «jacuzzi privado con vista a Medellín»: lo que el original enseña primero.",
  },
  {
    id: "c03-cocina",
    bloque: 5,
    tipo: "video",
    src: v("rc01"),
    // RC01 (`Img 9461.mp4`, anamórfico), de 2,4 a 6,53 s a ×1: la isla de la cocina con sus banquetas, la luz de los focos, la sala con la palma y el ventanal, hasta que asoma la puerta corredera negra del balcón. El original lo usa a ×1,45.
    // Con «113 m² amoblados y equipados».
    desde: 2.4,
    en: P.cocina,
    dur: P.bar - P.cocina,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.05, highlights: -0.3, whites: -0.2, shadows: 0.12 }),
    reason: "Cocina y sala: la isla, la sala con la palma y la puerta del balcón con «113 m² amoblados y equipados»: la casa vista por dentro tras la vista.",
  },
  {
    id: "c04-bar",
    bloque: 5,
    tipo: "video",
    src: v("rc22"),
    // RC22 (`Img 9538.mp4`, anamórfico), de 0,4 a 2,83 s a ×1: el bar con su estante iluminado, la banqueta y el letrero de neón verde, de noche. El clip dura 3,2 s: se usa casi entero (el original, de 0,3 a 2,8 s). Con «Piscina, gimnasio, spa y coworking».
    desde: fr(12),
    en: P.bar,
    dur: P.balcon - P.bar,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.4, shadows: 0.3, saturation: 0.95, temperature: -0.04 }),
    reason: "Bar: el estante iluminado y el neón, con «piscina, gimnasio, spa y coworking»: lo que trae la unidad, a la altura de un bar.",
  },
  {
    id: "c05-balcon",
    bloque: 5,
    tipo: "video",
    src: v("rc03"),
    // RC03 (`Img 9464.mp4`, anamórfico), de 2,0 a 8,13 s a ×1: el balcón con las camas blancas sobre la baldosa negra → el paneo a la baranda y a las torres. El original lo usa de 3,1 a 13,6 s a ×1 (hasta el cielo con nubes); aquí se corta donde acaba «Y lo que no esperabas:»
    // (6,1 s: el rótulo cambia sobre el mismo plano en el f618).
    desde: 2.0,
    en: P.balcon,
    dur: P.alcoba - P.balcon,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.05, shadows: 0.25, highlights: -0.35, whites: -0.2, saturation: 1.0 }),
    reason: "Balcón: las camas, la baranda y las torres con «y lo que no esperabas»: la vista que prepara lo que viene (aseo, acompañamiento, chef, asesoría).",
  },
  {
    id: "c06-alcoba",
    bloque: 5,
    tipo: "video",
    src: v("rc05"),
    // RC05 (`Img 9477.mp4`, anamórfico), de 0,4 a 6,87 s a ×1: la cama con los cojines negros y la lámpara colgante → el paneo a la pared del televisor. **La alcoba del original NO coincide con ninguno de los clips del SSD** (la búsqueda de
    // fotogramas da error 0,3 frente a ≈ 0 en los demás): el editor tuvo otro clip; este es el más parecido. Cubre «Aseo semanal incluido» y «Acompañamiento personalizado» (el texto cambia sobre el mismo plano en el f838).
    desde: 0.4,
    en: P.alcoba,
    dur: P.sala - P.alcoba,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.15, blacks: 0, shadows: 0.25, highlights: -0.4, whites: -0.3, saturation: 1.04 }),
    reason: "Alcoba principal: la cama y la pared del televisor con «aseo semanal incluido» y «acompañamiento personalizado»: lo privado, lo que viene con el arriendo.",
  },
  {
    id: "c07-sala",
    bloque: 5,
    tipo: "video",
    src: v("rc04"),
    // RC04 (`Img 9469.mp4`, anamórfico), de 0,5 a 4,67 s a ×1: la sala con el sofá gris, la pared de listones con sus luces y la mesa redonda, hasta el ventanal. Con «Chef privado y conductor a tu medida».
    desde: 0.5,
    en: P.sala,
    dur: P.piscina - P.sala,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.1, shadows: 0.12 }),
    reason: "Sala: el sofá gris, los listones y el ventanal con «chef privado y conductor a tu medida»: el estar de la casa, con quien lo atiende.",
  },
  {
    id: "c08-piscina",
    bloque: 5,
    tipo: "video",
    src: v("rc16"),
    // RC16 (`Img 9525.mp4`, anamórfico), de 4,3 a 9,17 s a ×1: el carril de nado turquesa entre los árboles bajo el cielo gris del atardecer, con un paneo a la derecha hasta la ciudad. El original lo usa de 4,1 a 9,1 s. Con «Con la mejor asesoría de la ciudad».
    // No es la vista (el clímax de la réplica está a mitad de pieza) sino el cierre del recorrido, como en el original.
    desde: 4.3,
    en: P.piscina,
    dur: P.cta - P.piscina,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.15, shadows: 0.35, blacks: 0, highlights: -0.2, saturation: 1.0 }),
    reason: "Piscina: el carril de nado entre los árboles con «con la mejor asesoría de la ciudad»: la unidad, antes de que ella hable.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c09-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct05"),
    audio: a("ct05-voz"),
    voz: { s0: 1.31, s1: 4.07, lufs: -15.0, dice: "Si buscas más que un apartamento para vivir, escríbenos." },
    // La voz empieza a los 1,31 s («Si», una subida de −57 a −25 dB en 0,1 s) y acaba a los 4,07 s; la toma sigue hasta los 7,2 s (ella sonríe y alarga el brazo hacia la cámara): se corta 19 f después de la última palabra.
    // La toma entra en el GOLPE de 87,3 s (f1217, 10,5 dB) y la música baja DESPUÉS, con curva (la bajada acaba 4 f antes de la primera palabra): `desde` 24 f deja la primera sílaba en el f1232, 15 f tras el golpe, y deja los 12 f de clip que
    // pide la disolvencia. Isabella está SENTADA en la silla de la sala (la de la foto `1-Sala`), con la ventana y el bosque detrás.
    desde: fr(24),
    en: P.cta,
    dur: DUR_CTA,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ saturation: 1.02, highlights: -0.3, whites: -0.15, contrast: 1.06 }),
    reason: "Sala: Isabella sentada en la silla, mirando a cámara, con la ventana detrás: la única vez que habla ella; cierra con «si buscas más que un apartamento para vivir, escríbenos». Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-053.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c10-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-053/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c09
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason: "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c10). */
export const DURACION_053 = P.cta + DUR_CTA + DUR_TARJETA;
