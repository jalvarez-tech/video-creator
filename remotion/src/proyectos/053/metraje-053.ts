/**
 * EL RECORRIDO 053 — «Tierra Grata Bosque Santo (El Poblado), ARRIENDO», V35 del registro, «¿PAGARÍAS 14 MILLONES?» — los planos, como DATOS.
 *
 * Encargo (2026-10-20): replicar el tercero de los tres vídeos que otro editor hizo el 15-sep con el material del 2-sep (`videos editados/03.mp4`, 56,43 s) con las MISMAS tomas, en el mismo orden y con el mismo
 * texto, en el formato del canal y en sus dos formatos (orgánico con subtítulos editoriales y funnel con ficha). Reparto en `proyectos/044/reparto-051-053.md` (tabla «03»); análisis del original y decisiones en
 * `proyectos/053/artefactos/01-plan.md`. Es la V35 del registro; la canción (*Softly*, Judah Earl & Brandon Black) estaba reservada para ella.
 *
 *   gancho   HK05  Isabella caminando hacia cámara en el balcón, SIN VOZ PROPIA (la frase «¿Pagarías 14 millones al mes por vivir aquí?» es LOCUCIÓN EN OFF sobre su imagen, como en el original)
 *   off      la locución entera (gancho + cinco frases): `original/off.wav`. NO existe en el SSD: la decide el usuario (reparto §3); mientras tanto es una PISTA GUÍA (voz de sistema, `say`)
 *   CTA      CT05  «Si buscas más que un apartamento para vivir, escríbenos.»                                              (sentada en la silla de la sala; la MISMA toma cierra la 052: declarado)
 *
 * LA IDEA EN UNA LÍNEA. ¿Cuánto vale vivir aquí? Catorce millones al mes por un apartamento amoblado con jacuzzi privado, cocina equipada, lavadora y secadora, amenidades y seguridad 24/7, a pocos metros de Las
 * Palmas. No se afirma nada que la ficha no diga salvo lo que dice la voz del original, que es del usuario (lavadora y secadora, seguridad 24/7, cancha de squash, «completamente amoblado»: se repite tal cual).
 *
 *   bloque 2  c01                  Isabella caminando hacia cámara en el balcón (HK05, mudo): el frame 0, con la pregunta en off y su subtítulo (EXCEPCIÓN DECLARADA a la regla fija 1: la réplica abre así)
 *   bloque 5  c02 … c08            el recorrido en el ORDEN DEL ORIGINAL, con la locución encima: el cielo, las torres y el JACUZZI PRIVADO (RC10) → la cocina, la sala con la palma y la puerta del balcón (RC01) → el bar (RC22)
 *                                  → el balcón con las camas, las torres y el cielo (RC03) → la alcoba y su pared con el televisor (RC05) → la sala con el sofá (RC04) → el carril de nado (RC16)
 *   bloque 6  c09 c10              Isabella sentada: el CTA a cámara (CT05); y la tarjeta oscura del cierre (nada se congela)
 *
 * LO QUE NO CUMPLE EL FORMATO Y SE DECLARA (la réplica manda). (1) La pieza abre con Isabella y su voz en off desde el f8, no con la casa limpia y sin voz (regla fija 1). (2) Dura ≈ 59 s (la réplica dura 56,4 s
 * y se le suma la tarjeta): más que los 55 s del formato. (3) La voz en off es continua desde el gancho hasta la piscina: el formato la limita al bloque 5. (4) El último plano del bloque 5 no es la vista sino el carril de
 * nado (el orden del original) y no es el más largo de su bloque: el balcón (RC03) lo es. (5) Isabella solo habla a cámara una vez (el CTA). (6) La cifra del gancho dice «14 millones»: el canon es 14,8 y va en la ficha.
 *
 * LO QUE EL MATERIAL NO DA. (1) La ALCOBA del original no coincide con ninguno de los 22 clips del SSD (el editor tuvo otro): se usa RC05, el más parecido. (2) Los recorridos son anamórficos (608×1080 efectivos
 * ×2,13) y salen más blandos que Isabella en 4K. (3) No hay dron. (4) El original acelera RC10 ×1,4 y RC01 ×1,45; aquí van a ×1 (`velocidad` solo se admite en el bloque 3) y los tramos se ajustan a la locución.
 *
 * QUIÉN MARCA EL TIEMPO: LA LOCUCIÓN. Cada cambio de plano cae en una palabra de la frase que lo explica («Imagina» → el cielo; «Viene» → la cocina; «equipada» → el bar; «secadora» → el balcón; «salón social»
 * → la alcoba; «en el sector» → la sala; «Todo» → la piscina). Todas las entradas son DISOLVENCIAS de 12 f: *Softly* es una orquesta en crescendo sin pulso (R33: no hay golpe donde cortar en seco).
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

/** EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido del usuario desde la V9). Cada voz pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1, ganancia y limitador a −2,5 dBFS). Excepción declarada a R29, por encargo. */
export const OBJETIVO_LUFS = -15;

/* ── La música: «Softly» (Judah Earl & Brandon Black) ───────────────────────
 *
 * `archivos/musica/Softly I Judah Earl & BRANDON BLACK #music #cinematic #orchestralmusic.mp3` (sha 8 `87d78dc2`), orquestal, 3:45, Do mayor, sin pulso fijo. Medida (ebur128 por 1 s y `medir-pista.py`,
 * `proyectos/053/musica/`): dos tramos fuertes (50-105 s y 145-195 s) y, entre ellos, una calma; el segundo es el clímax y acaba con una CAÍDA:
 *
 *   hasta 146 s      la subida: −19 → −15 LUFS (una calma que crece)                                  ← el gancho
 *   147,33 s         el golpe de entrada del clímax (10,6 dB)                                          ← el cielo del RC10
 *   147,5 – 195,5 s  MESETA: −11,5 LUFS (pico −0,2 dBFS), con golpes de ≤ 13,5 dB                      ← el recorrido y la locución
 *   196,1 s          LA CAÍDA: −10,7 → −14 → −17,5 → −23 LUFS en 4 s, y de ahí un lecho de −23 → −26     ← el CTA
 *
 * Se entra a los 143,167 s (el frame 4295 de la canción a 30 fps): la caída (196,2 s) cae en el f1592, entre la última palabra de la locución (f1586) y la primera del CTA (f1604); la meseta cubre el recorrido.
 * Como la locución es CONTINUA, la música es un lecho bajo la voz casi todo el rato: la canción sube y baja por su cuenta (calma → meseta → caída) y no hay tramo en que suene sola hasta la tarjeta.
 */
export const INICIO_MUSICA = 4295 / FPS_053;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma para que lo que la música hace en un
 * instante de la canción caiga en el frame en que SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** El frame del vídeo en que SUENA un instante de la canción (sin redondear). */
export const frameDeCancion = (tCancion: number): number => (tCancion - INICIO_MUSICA + RETARDO_AUDIO) * FPS_053;

/** Dónde empieza la caída de la canción (s de la canción, medido con ebur128 momentáneo: −10,7 → −11,8 → −14,0 entre 195,6 y 196,6 s). */
export const CAIDA_CANCION = 196.2;

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
 * El frame de cada cambio de plano (el frame en que el plano es OPACO; su disolvencia empieza 12 f antes). Cada uno cae en una palabra de la locución (`voz/off.json`, `lineas-vs-onsets.py`) y
 * la imagen cambia con ella. SON LOS DE LA PISTA GUÍA: con la locución real se vuelven a calcular (`proyectos/053/artefactos/03-timeline.md`).
 */
const P = {
  cielo: 112, //    «Imagina» (f109): el cielo y el jacuzzi privado
  cocina: 406, //   «Viene» (f404): la cocina, la sala con la palma, la puerta del balcón
  bar: 602, //      «equipada» (f602): el bar
  balcon: 686, //   «secadora» (f686): el balcón con las camas, las torres y el cielo
  alcoba: 1078, //  «salón social» (f1074): la alcoba
  sala: 1298, //    «en el sector» (f1294): la sala con el sofá
  piscina: 1457, // «Todo» (f1453): el carril de nado
  cta: 1603, //     Isabella: primera sílaba en el f1604, 18 f tras la última palabra de la locución (f1586)
} as const;

/** Frames que dura la toma del CTA: el clip dura 7,2 s; su voz va de 1,31 a 4,07 s (f1604-f1687 de la comp) y la toma se corta 19 f después (los últimos 6 funden a negro). Nada se congela. */
const DUR_CTA = 103;

/** Dónde acaba la música (frame de la comp): se apaga bajo la tarjeta y llega a cero 2 f antes del final de la pieza. */
export const FIN_MUSICA_053 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje053: readonly Corte[] = [
  // ── Bloque 2 · el gancho: Isabella caminando (HK05, mudo), con la pregunta en off ──
  {
    id: "c01-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk05"),
    // HK05 (`Img 9508.mp4`, 2-sep, anamórfico: se escala entero), de 4,3 a 8,0 s: Isabella (chaqueta de flores) camina hacia cámara por el balcón con la vista detrás, abre los brazos y se acerca hasta el torso. Es el tramo mudo del
    // clip (la voz del hook del 051 está en 22,5-29,5 s). El frame 0 ES ELLA: excepción declarada a la regla fija 1 (la réplica abre así). La locución en off dice «¿Pagarías 14 millones al mes por vivir aquí?» desde el f8.
    desde: fr(128),
    en: 0,
    dur: P.cielo,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.1, shadows: 0.2, highlights: -0.35, whites: -0.2, saturation: 1.02, contrast: 1.06 }),
    reason: "Balcón (la promesa): Isabella camina hacia cámara con la ciudad detrás mientras una voz pregunta cuánto pagarías por vivir aquí; el frame 0 es ella (la réplica abre así).",
  },
  // ── Bloque 5 · el recorrido con la locución, en el orden del original ──
  {
    id: "c02-cielo",
    bloque: 5,
    tipo: "video",
    src: v("rc10"),
    // RC10 (`Img 9509.mp4`, 31-ago/2-sep, anamórfico), de 0,5 a 10,3 s a ×1: el cielo con nubes y el sol entre ellas → las torres y la ciudad → el JACUZZI PRIVADO del balcón (la tina cuadrada con listones de madera y su escalón, de 8,0 s al
    // final). El original lo usa a ×1,4 (de 0,4 a 10,2 s en 7 s); aquí, a ×1, cubre los 9,8 s de «Imagina terminar tu día … la mejor vista de la ciudad de Medellín» y el jacuzzi llega al final de la frase.
    desde: 0.5,
    en: P.cielo,
    dur: P.cocina - P.cielo,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.05, highlights: -0.45, whites: -0.25, shadows: 0.35, saturation: 1.06 }),
    reason: "Balcón (la recompensa, avanzada): el cielo, las torres y el jacuzzi privado con la primera frase: «imagina terminar tu día relajándote en tu jacuzzi privado… con la mejor vista de la ciudad».",
  },
  {
    id: "c03-cocina",
    bloque: 5,
    tipo: "video",
    src: v("rc01"),
    // RC01 (`Img 9461.mp4`, anamórfico), de 0,6 a 7,1 s a ×1: de la isla de la cocina con sus banquetas, la luz de los focos y la madera, a la sala con la palma y el ventanal, hasta la puerta corredera negra del balcón. El original lo usa a ×1,45.
    // Con «Viene completamente amoblado: dos habitaciones, dos baños, cocina integral».
    desde: 0.6,
    en: P.cocina,
    dur: P.bar - P.cocina,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.05, highlights: -0.3, whites: -0.2, shadows: 0.12 }),
    reason: "Cocina y sala: la isla, la sala con la palma y la puerta del balcón: lo amoblado y la cocina integral que dice la voz, la casa vista por dentro tras la vista.",
  },
  {
    id: "c04-bar",
    bloque: 5,
    tipo: "video",
    src: v("rc22"),
    // RC22 (`Img 9538.mp4`, anamórfico), de 0,4 a 3,1 s a ×1: el bar con su estante iluminado, la banqueta y el letrero de neón verde, de noche. El clip dura 3,2 s: se usa casi entero. El original lo usa de 0,3 a 2,8 s.
    desde: fr(12),
    en: P.bar,
    dur: P.balcon - P.bar,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.4, shadows: 0.3, saturation: 0.95, temperature: -0.04 }),
    reason: "Bar: el estante iluminado y el neón, con «totalmente equipada y zona de lavandería con lavadora y secadora»: el apartamento listo para vivir.",
  },
  {
    id: "c05-balcon",
    bloque: 5,
    tipo: "video",
    src: v("rc03"),
    // RC03 (`Img 9464.mp4`, anamórfico), de 2,0 a 15,1 s a ×1: el balcón con las camas blancas sobre la baldosa negra → el paneo a la baranda, las torres y la ciudad → las nubes. El original lo usa de 3,1 a 13,6 s a ×1. Es el plano más largo de la pieza
    // (13,1 s): «Listo para mudarte. Además, puedes disfrutar de excelentes amenidades: …» hasta «salón social».
    desde: 2.0,
    en: P.balcon,
    dur: P.alcoba - P.balcon,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.05, shadows: 0.25, highlights: -0.35, whites: -0.2, saturation: 1.0 }),
    reason: "Balcón: las camas, la baranda, las torres y el cielo con «listo para mudarte» y las amenidades; la vista que acompaña la lista de lo que trae la unidad.",
  },
  {
    id: "c06-alcoba",
    bloque: 5,
    tipo: "video",
    src: v("rc05"),
    // RC05 (`Img 9477.mp4`, anamórfico), de 0,4 a 7,7 s a ×1: la cama con los cojines negros y la lámpara colgante → el paneo a la pared del televisor. **La alcoba del original NO coincide con ninguno de los clips del SSD** (la búsqueda de
    // fotogramas da error 0,3 frente a ≈ 0 en los demás): el editor tuvo otro clip; este es el más parecido.
    desde: 0.4,
    en: P.alcoba,
    dur: P.sala - P.alcoba,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.15, blacks: 0, shadows: 0.25, highlights: -0.4, whites: -0.3, saturation: 1.04 }),
    reason: "Alcoba principal: la cama y la pared del televisor con «salón social y zonas de bienestar… y lo mejor es que cuentas con seguridad 24/7»: lo privado, lo seguro.",
  },
  {
    id: "c07-sala",
    bloque: 5,
    tipo: "video",
    src: v("rc04"),
    // RC04 (`Img 9469.mp4`, anamórfico), de 0,5 a 5,8 s a ×1: la sala con el sofá gris, la pared de listones con sus luces y la mesa redonda, hasta el ventanal con el balcón al fondo. Con «en el sector de Las Palmas y la privacidad que buscas en un entorno natural».
    desde: 0.5,
    en: P.sala,
    dur: P.piscina - P.sala,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.1, shadows: 0.12 }),
    reason: "Sala: el sofá gris, los listones y el ventanal con «la mejor ubicación en el sector de Las Palmas y la privacidad que buscas»: el estar de la casa, abierto al entorno.",
  },
  {
    id: "c08-piscina",
    bloque: 5,
    tipo: "video",
    src: v("rc16"),
    // RC16 (`Img 9525.mp4`, anamórfico), de 4,2 a 9,1 s a ×1: el carril de nado turquesa entre los árboles bajo el cielo gris del atardecer, con un paneo a la derecha hasta la ciudad. El original lo usa de 4,1 a 9,1 s. Con «Todo en este
    // apartamento está pensado para tu tranquilidad y comodidad». No es la vista (el clímax de la réplica está a mitad de pieza) sino el cierre de la locución, como en el original.
    desde: 4.2,
    en: P.piscina,
    dur: P.cta - P.piscina,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.15, shadows: 0.35, blacks: 0, highlights: -0.2, saturation: 1.0 }),
    reason: "Piscina: el carril de nado entre los árboles con «todo en este apartamento está pensado para tu tranquilidad y comodidad»: la unidad, antes de que ella hable.",
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
    // `desde` 38 f es el frame anterior a la primera palabra (1,31 × 30 = 39,3) y deja los 12 f de clip que pide la disolvencia: Isabella es opaca en el f1603 y su primera sílaba suena en el f1604.
    // Isabella está SENTADA en la silla de la sala (la de la foto `1-Sala`), con la ventana y el bosque detrás.
    desde: fr(38),
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
