/**
 * EL RECORRIDO 026 — «One Living · Envigado», CUARTO REEL DE ESTA PROPIEDAD (V10 del registro) — los planos, como DATOS.
 *
 * Misma casa que el 022 (V6), el 023 (V7) y el 024 (V8), mismo material (26 clips, sin dron). El formato es el mismo (`recorrido-luxur`, seis bloques; reglas fijas del canal en su `SKILL.md` §0).
 * Cuando empezó esta versión no quedaba ningún hook, mitad ni CTA limpios: el usuario eligió (2026-10-06) la VÍA (b): la voz de RC14 («recorrido caminando»), que ninguna versión había usado como toma.
 *
 * LA PIEZA ABRE CON EL HOOK, como la V6-V8 (pedido del usuario en la V6: «como esta propiedad no tiene dron empecemos directamente con el hook»). Rompe a propósito la regla fija «la primera toma
 * sale sin texto ni voz»: la excepción está declarada en la puerta (`ABRE_CON_EL_HOOK`) y en el registro.
 *
 * LA IDEA: «Ven, te muestro». RC14 es UNA SOLA TOMA de 49,8 s: Isabella abre la puerta de entrada, entra, recorre el piso y acaba hablando a cámara ante el ventanal de una alcoba. Su voz solo suena en dos
 * tramos (1,82-6,31 s y 45,22-49,35 s; entre medias hay ambiente a −50 dB): el primero es el hook y el segundo, el CTA. Entre los dos, el paseo (la cocina, la sala, el balcón), ella en el balcón (MD2,
 * repetida de la V8), el fondo de la casa (las puertas del baño y del vestier, el baño, la alcoba y la vista desde su ventanal) y, por fin, ella en la otra alcoba. **Sentido I**: entrada → zona social
 * (en el centro del plano) → alcobas (en los extremos).
 *
 *   hook      HK5 = RC14  ENTRADA   «Hay apartamentos para vivir y hay otros que te dan más posibilidades. Ven, te muestro.»   (clip 1,6-7,2 s; voz 1,82-6,31 s)
 *   mitad     MD2         BALCON    «Aquí el balcón se convierte en una extensión de la zona social.»                      (REPETIDA de la V8)
 *   CTA       CT4 = RC14  ALCOBA    «Si te gustó este apartamento y deseas tener más información, contáctame.»             (clip 44,8-49,84 s; voz 45,22-49,35 s)
 *
 * TRES sitios, ENTRADA · BALCON · ALCOBA, y NINGUNA cifra (ni los «76» de HK1: esta pieza no los dice). El hook y el CTA son tomas NUEVAS; la mitad, la única repetida (decisión del usuario).
 *
 *   bloque 2  c02              Isabella en la entrada: el hook, A CORTE EN EL FRAME 0 (ella al fondo, detrás de la puerta que abre; camina hacia la cámara y, en «ven», se gira y entra)
 *   bloque 3  c03 c04 c05 c06  el paseo cocina → sala → balcón: la isla y la estufa (RC05), la cocina vista desde atrás (RC09), la sala hacia la corredera (RC05) y el balcón (RC01)
 *   bloque 4  c07              Isabella en el balcón: la mitad (MD2)
 *   bloque 5  c08 c09 c10 c11  el fondo: las puertas del baño y del vestier (RC11), el baño (RC04), la alcoba (RC13) y la vista desde su ventanal (RC12: la más larga)
 *   bloque 6  c12 c13          Isabella en la otra alcoba, ante su ventanal: el CTA (RC14); y la tarjeta oscura del cierre (nada se congela)
 *
 * COMPARTE CON LA V6, LA V7 Y LA V8 (declarado; la puerta lo mide contra `VERSIONES_ANTERIORES`): el CLIP y la VOZ de MD2 (la V8, entera); de recorrido, RC01 4,6-7,03 s (la V8 usó 6,0-8,4: ≈ 0,9 s) y
 * RC05 7,57-10,17 s (la V6 usó 4,5-7,93: ≈ 0,4 s). Lo demás, ni un fotograma: RC05 0,4-4,0 s, RC09 49,0-52,6 s, RC11 12,1-14,57 s, RC04 0,5-3,37 s, RC13 0,4-2,9 s y RC12 0,4-4,23 s no los usó nadie.
 * RC14 se usa dos veces (el hook y el CTA, 38 s aparte) y no se solapan.
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA, POR GOLPES. «desolate (Slowed)» NO tiene pulso (62 % de los golpes fuertes a ≤ 15 ms de una recta de 0,7155 s, desvío 106 ms): se corta sobre los GOLPES MEDIDOS
 * (`medir-pista.py`, ≥ 6 dB) y se comprueba sobre el audio del render (`herramientas/golpes-render.py`, R33). Todos los `en` salen de `golpe(...)`: mover la entrada de la música es cambiar `INICIO_MUSICA`.
 * LA CANCIÓN. Propuesta mía (2026-10-06) entre *desolate*, *Heaven on Earth* (la reservó la V9 de Los Patios mientras tanto) e *Ivory Skyline Reverie*; se mandaron extractos al usuario. Es lo-fi «slowed + reverb»
 * (†: género inferido del catálogo, sin oír; el catálogo le da «soledad, melancolía»: el usuario lo confirma oyendo). La rejilla de cortes sale de `herramientas/buscar-cortes.py` sobre los golpes medidos
 * (todas las entradas, disolvencias de ≥ 9,5 dB; 1.139 soluciones con estos rangos de plano; se elige la de golpes más fuertes y entrada más contundente).
 *
 * LA RESOLUCIÓN. La canción suena en una meseta de −10,8 LUFS (sin crescendo; −13 dB de RMS a partir de los 94 s) hasta los 117 s; en 118,0 s cae (LUFS por tramos de 5 s: −11,6 → −20,8 → −31,8; el archivo acaba a 126,4 s)
 * y sus últimas notas se apagan solas. La toma del CTA entra en el golpe de 115,127 s (el último de la meseta) y la caída cae a los 87 f de su entrada, ya con la voz de Isabella; la cola se corta antes de la nota siguiente.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(28)` = 28/30 s) para que imagen y voz corten en la MISMA muestra;
 * `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS: cada `en` es el fin del anterior.
 *
 * TRANSICIONES. El hook abre la pieza a corte (frame 0). Cortes secos solo donde el salto de luma entre el último fotograma de un plano y el primero del siguiente
 * es pequeño (≤ ±8, medido por `herramientas/saltos-luma.py`); donde pasa de ±8 el plano ENTRA CON DISOLVENCIA de 12 f que acaba en el golpe, con `desde` ≥ 12 f, y no se gradúa más. Las dos entradas de Isabella con
 * voz que traen aire suficiente (la mitad, 0,25 s tras el `desde`; el CTA, 0,41 s) entran con disolvencia. Saltos de luma a corte medidos (`saltos-luma.py`): +4,5 (la cocina de atrás), −1,4 (el balcón), −5,4 (la vista),
 * +7,9 (el baño: se queda con disolvencia por estar en el límite) y de +15,6 a −19,3 en los otros cinco: esos entran disolviendo. Tres cortes secos, todos en golpes de ≥ 10 dB (R33: se comprueban sobre el audio del render).
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Dos fuentes (Isabella y RC14 en HLG
 * tone-mapeado, recorridos en SDR). Con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-026.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-026";

export const FPS_026 = 30;

export type Entrada = "corte" | "disolver";
export type Bloque = 1 | 2 | 3 | 4 | 5 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. Medido con `limites-voz.py` y ebur128, no estimado. */
export interface VozDelCorte {
  /** Segundo de la fuente en que empieza a hablar. */
  s0: number;
  /** Segundo de la fuente en que termina de hablar. */
  s1: number;
  /** Sonoridad integrada de la voz (LUFS) en esa ventana. */
  lufs: number;
  /** Lo que dice, tal como está en el guion. Solo para leer el plan. */
  dice: string;
}

export interface Corte extends CorteDelFormato<Entrada> {
  /** `foto` solo para la tarjeta oscura del cierre (`c13-cierre`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella cuya voz entra con su imagen: el WAV de su voz, sin tratar. */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ (rev. 1, 2026-10-08, pedido del usuario tras la final: «necesito que la voz cuando habla Isabella tenga más decibeles sin saturar»). Hasta la rev. 0 la voz iba a −21 LUFS con una ganancia por toma
 * (R29) y quedaba ≈ 6 dB por debajo de la música sola (−15). Ahora suena la voz TRATADA (`<toma>-voz.wav`: highpass 100 Hz · puerta suave · compresor 3:1 · +16 dB · limitador a −2,5 dBFS, `proyectos/026/normalizar.mjs`),
 * que mide −15,1 (hook de RC14), −14,6 (MD2) y −14,4 LUFS (CTA de RC14) con el pico real en −2,5 dBTP: al nivel de la música sola. Es una excepción a R29 («una ganancia por toma y nada más»), por encargo y ya confirmada
 * en la V12 y la V9: sola, la ganancia no llega (a −15 LUFS los picos pasarían de 0 dBTP). Lo que mide `limites-voz.py` (R29), `s0` y `s1`, sigue siendo sobre el WAV crudo; `lufs`, sobre el tratado, que es el que suena. La música no se toca: queda ≈ 15,5 LU bajo la voz.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «ByErik – desolate (Slowed)» — `Music/ByErik ヵ - desolate (Slowed).mp3` (sha 8 `74195082`), lo-fi slowed + reverb, 2:06. Se usa desde 81,07 s (su paseo empieza en el golpe de 86,626 s, 14,3 dB) y de ahí
 * suena −10,8 LUFS (−13 dB de RMS desde los 94 s), sin crescendo, hasta su caída en 118,0 s. Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir») en que entra cada plano,
 * con su fuerza en dB por 15 ms. `proyectos/026/musica/golpes-026.json`. Salen de `buscar-cortes.py` (cortes en 86,626 · 90,199 · 93,784 · 96,373 · 98,792 · 103,486 · 105,943 · 108,81 · 111,31 · 115,127 s).
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el MISMO del paseo (f168): lo que se oye en el hook es la música que lo precede, baja bajo su voz. */
  apertura: { t: 86.626, db: 14.3 },
  /** El paseo empieza (con una disolvencia, tras el hook) y la canción llega a su primer golpe: la isla y la estufa. Es el último frame del clip del hook (f168). */
  paseo: { t: 86.626, db: 14.3 },
  /** La cocina vista desde atrás (RC09). */
  cocina: { t: 90.199, db: 10.8 },
  /** La sala hacia la corredera (RC05). */
  sala: { t: 93.784, db: 14.4 },
  /** El balcón (RC01): el destino del paseo. */
  balcon: { t: 96.373, db: 10.0 },
  /** Isabella entra (con una disolvencia que acaba aquí) con la mitad. */
  mitad: { t: 98.792, db: 15.1 },
  /** Las puertas del baño y del vestier (RC11): sale la mitad y empieza el bloque 5. */
  puertas: { t: 103.486, db: 10.1 },
  /** El baño (RC04). */
  bano: { t: 105.943, db: 13.6 },
  /** La alcoba (RC13). */
  alcoba: { t: 108.81, db: 13.2 },
  /** La vista (RC12): el ventanal con las montañas y la ciudad, el plano más largo del bloque. */
  vista: { t: 111.31, db: 15.9 },
  /** Isabella entra (con una disolvencia que acaba aquí) con el CTA: el último golpe de la meseta; la caída de la canción cae dentro de su toma. El más débil de la pieza (9,5 dB en la fuente). */
  cta: { t: 115.127, db: 9.5 },
} as const;

/**
 * LA CAÍDA de la canción: la meseta (−10,8 LUFS) acaba hacia los 117 s; en 118,0 s cae (ebur128 sobre `musica-026.wav`, tramos de 5 s: −11,6 antes, −20,8 en los 5 s siguientes y −31,8 en los 5 s tras ellos, con
 * los últimos 3 s del archivo ya apagados: acaba a 126,4 s). El primer `t` que da ≥ 9 dB a 5 s y ≥ 20 dB a 10 s es 118,0 s (a 117,5 s cae solo 7,7). No es un golpe sino un cambio de nivel: la resolución de esta pieza.
 * Sus últimas notas se siguen oyendo (−24 a −31 dB de RMS) y se cortan antes de la siguiente nota fuerte (120,691 s).
 */
export const DECAE = { t: 118.0, lufsAntes: -11.6, lufs5s: -20.8, lufs10s: -31.8 } as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (86,626 s) cae donde empieza el paseo, a los 5,6 s (f168: la voz del hook acaba en el f141 y la música sube en 24 f hasta
 * ese golpe; la V8 lo puso a los 5,0 s con HK1, más corto), y la música suena ya desde el f0, baja bajo la voz del hook (pedidos del usuario en la V7, heredados). El número es el segundo de la fuente que cae en el f0: 2432/30,
 * un frame entero para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 2432 / FPS_026;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y
 * confirmado desde el 017). Se suma aquí y en la puerta para que el corte caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_026;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_026;

/** Isabella: QUIETO. RC14 ya es una toma de mano que camina y se acerca a la cámara: un empuje encima la marearía. El recorrido, quieto: la cámara ya avanza. */
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-026/${id}.mp4`;
const a = (id: string): string => `recorrido-026/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE de Luxur, la del 017: contraste con cuerpo, negros hundidos, luces recogidas, un punto cálido y +10 % de saturación. Orden del efecto:
 * exposición → balance de blancos → sombras/luces/blancos/negros → contraste → saturación → vibrance. `vibrance` ≤ 0,05 y las tomas de Isabella,
 * `saturation` ≤ 1,06 (la piel se queda donde estaba). Salió de material HLG tone-mapeado; los recorridos de esta casa son SDR: los ajustes de cada plano
 * parten de los de la V8 (mismas casas: la madera, el gres, el vestier) y se miden otra vez (`proyectos/026/herramientas/medir-color.py`).
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
 * El frame de cada cambio de plano: el del golpe de la canción en que entra (arriba). Los cortes SECOS y las entradas de Isabella caen en un golpe medido.
 */
const P = {
  paseo: golpe(GOLPE.paseo), //       168 · la isla y la estufa y la entrada de la canción (el hook ocupa f0-168: su clip desde `desde` 1,6 s hasta 7,2 s)
  cocina: golpe(GOLPE.cocina), //     276 · la cocina vista desde atrás
  sala: golpe(GOLPE.sala), //         383 · la sala hacia la corredera
  balcon: golpe(GOLPE.balcon), //     461 · el balcón
  mitad: golpe(GOLPE.mitad), //       533 · Isabella en el balcón
  puertas: golpe(GOLPE.puertas), //   674 · las puertas del baño y del vestier
  bano: golpe(GOLPE.bano), //         748 · el baño
  alcoba: golpe(GOLPE.alcoba), //     834 · la alcoba
  vista: golpe(GOLPE.vista), //       909 · la vista
  cta: golpe(GOLPE.cta), //          1023 · Isabella con el CTA (con disolvencia)
} as const;

/**
 * Frames que dura la toma del CTA (CT4, RC14): `desde` 1344 f (44,8 s) y el clip normalizado tiene 1495 fotogramas (49,83 s): quedan 151. Su voz acaba a los 49,35 s (f1159,5 de la comp): 14,5 f (0,48 s) de su cara
 * tras la última palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela.
 */
const DUR_CTA = 151;

/**
 * Dónde acaba la música (frame de la comp). La canción sigue sonando (sus notas se apagan solas) hasta que acaba la toma del CTA; la envolvente la lleva a cero 2 f antes de la nota fuerte siguiente
 * (120,691 s = f1190), bajo la tarjeta: el resto de la tarjeta queda en silencio.
 */
export const FIN_MUSICA_026 = golpe({ t: 120.691 }) - 2;

export const metraje026: readonly Corte[] = [
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("rc14"),
    audio: a("rc14-voz"),
    voz: {
      s0: 1.82,
      s1: 6.31,
      lufs: -15.1,
      dice: "Hay apartamentos para vivir y hay otros que te dan más posibilidades. Ven, te muestro.",
    },
    // RC14 trae 1,82 s de aire antes de su primera palabra. Heredado del pedido del usuario en la V7 («el video del hook empiézalo justo antes de que Isabella empiece a hablar»): ENTRA A CORTE en el frame 0 con `desde` 48 f
    // (1,6 s): la primera palabra suena a los 6,5 f (la imagen ya es opaca). En ese fotograma la puerta de madera llena la mitad derecha del cuadro y ella, pequeña, sale de detrás del marco; camina hacia la cámara,
    // en «ven» se gira y entra (de espaldas a los 6,2 s). El clip llega a 7,2 s (f168): la voz acaba en el f141 y quedan 27 f para que la música suba (24) antes del golpe en que entra el paseo.
    desde: fr(48),
    en: 0,
    dur: P.paseo,
    zoom: QUIETO,
    entra: "corte",
    color: color({ saturation: 1.02 }),
    reason:
      "Entrada (la promesa): Isabella abre la puerta, sonríe y camina hacia la cámara con la cocina y la sala detrás; dice «hay apartamentos para vivir y hay otros que te dan más posibilidades» y, en «ven, te muestro», se gira y entra: el paseo empieza en esa puerta. Entra a corte en el frame 0.",
  },
  // ── Bloque 3 · el paseo: cocina → sala → balcón ──
  {
    id: "c03-cocina",
    bloque: 3,
    tipo: "video",
    src: v("rc05"),
    // RC05 «cocina, paneo a sala y balcon», de 0,4 a 4,0 s: la isla blanca con la estufa y la campana, de lado (nadie usó este tramo: la V6 usó 4,5-7,93 s).
    desde: fr(12),
    en: P.paseo,
    dur: P.cocina - P.paseo,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason:
      "Cocina (la barra): la isla con la estufa y la campana, lo primero que se ve al entrar; ella acaba de decir «ven» y el paseo sigue donde ella entró.",
  },
  {
    id: "c04-cocina-atras",
    bloque: 3,
    tipo: "video",
    src: v("rc09"),
    // RC09 «habitacion principal - paneo» (la caminata larga), de 49,0 a 52,6 s: la isla y la cocina vistas de espaldas a la puerta, con la nevera y los muebles de madera al fondo (nadie usó este tramo).
    desde: fr(1470),
    en: P.cocina,
    dur: P.sala - P.cocina,
    zoom: QUIETO,
    entra: "corte",
    color: color({ shadows: 0.14, blacks: -0.04 }),
    reason:
      "Cocina (el espacio abierto): la misma cocina desde el otro lado; se ve que es una sola zona con la sala, sin puertas de por medio.",
  },
  {
    id: "c05-corredera",
    bloque: 3,
    tipo: "video",
    src: v("rc05"),
    // RC05, de 7,57 a 10,17 s: la sala vacía con el techo de concreto, y la corredera de vidrio con marco negro que da al balcón y a la ciudad (la V6 usó 4,5-7,93 s: comparte ≈ 0,4 s).
    desde: fr(227),
    en: P.sala,
    dur: P.balcon - P.sala,
    zoom: QUIETO,
    entra: "disolver",
    // La corredera con el cielo del balcón quema el 6,8 % del cuadro con la base: se recogen las luces y los blancos.
    color: color({ highlights: -0.3, whites: -0.1 }),
    reason:
      "Sala (hacia el balcón): el paseo cruza la sala hacia la corredera de vidrio y se ve el balcón con la ciudad al fondo; la zona social, en el centro de la planta.",
  },
  {
    id: "c06-balcon",
    bloque: 3,
    tipo: "video",
    src: v("rc01"),
    // RC01 «balcon - paneo», de 4,6 a 7,03 s: el balcón visto desde fuera, con el ladrillo, el gres, la baranda de vidrio y, al final, la corredera (la V8 usó 6,0-8,4 s: comparte ≈ 0,9 s). La malla negra de la baranda
    // solo entra en cuadro hasta los 4,5 s: este tramo ya no la lleva.
    desde: fr(138),
    en: P.balcon,
    dur: P.mitad - P.balcon,
    zoom: QUIETO,
    entra: "corte",
    // El gres, el ladrillo y la madera del fondo dan más saturación con la base: se le quita la viveza de la base (como en la V8).
    color: color({ saturation: 1.0, shadows: 0.16, blacks: -0.02 }),
    reason:
      "Balcón (el destino): el balcón, estrecho y largo, con su ladrillo y su baranda de vidrio; el sitio donde ella nos espera.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c07-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md2"),
    audio: a("md2-voz"),
    voz: {
      s0: 0.65,
      s1: 4.34,
      lufs: -14.6,
      dice: "Aquí el balcón se convierte en una extensión de la zona social.",
    },
    // REPETIDA de la V8 (no queda ninguna mitad libre). La voz empieza a los 0,65 s (19,5 f): `desde` 12 f (0,4 s) entra con DISOLVENCIA que acaba en el golpe del f533 (suena entero: la música baja en los 7 f
    // siguientes) y la primera palabra suena a los 7,5 f del golpe, con la curva ya acabada. La última palabra acaba en f651,2; el bloque 5 entra con su disolvencia en el golpe del f674 y deja 22,8 f para que la música suba
    // con fundido. El clip llega a f674 (12 + 141 = 153 de 157).
    desde: fr(12),
    en: P.mitad,
    dur: P.puertas - P.mitad,
    zoom: QUIETO,
    entra: "disolver",
    // La madera del piso y el ladrillo dan 0,39 de saturación con la base (la piel de Isabella, 0,40 frente a 0,37 sin graduar): se baja a 0,98 y la piel vuelve a donde estaba.
    color: color({ saturation: 0.98 }),
    reason:
      "Balcón (lo social, la extensión): Isabella en el balcón, con la cámara en la sala, el contraplano de la puerta de entrada; dice que el balcón se convierte en una extensión de la zona social, y el paseo que acabamos de hacer termina aquí.",
  },
  // ── Bloque 5 · el fondo: las puertas del baño y del vestier, el baño, la alcoba y la vista ──
  {
    id: "c08-puertas",
    bloque: 5,
    tipo: "video",
    src: v("rc11"),
    // RC11 «habitacion secundaria - paneo», de 12,1 a 14,57 s (el final del clip): las puertas del baño y del vestier de la alcoba, con la luz encendida (la V6 y la V7 usaron 8,3-12,2 s: ni un fotograma en común).
    desde: fr(363),
    en: P.puertas,
    dur: P.bano - P.puertas,
    zoom: QUIETO,
    entra: "disolver",
    // La madera de las puertas y del vestier da 0,47 de saturación con la base (como el vestier de la V8, 0,45-0,53): se baja al mínimo que admite la puerta.
    color: color({ saturation: 0.95 }),
    reason:
      "Puertas del baño y del vestier (hacia lo privado): sale del centro social hacia una alcoba y se ven sus dos puertas, con la luz encendida: cada habitación con su baño y su vestier.",
  },
  {
    id: "c09-bano",
    bloque: 5,
    tipo: "video",
    src: v("rc04"),
    // RC04 «bano habitacion secundaria», de 0,5 a 3,37 s: el baño de esa alcoba, con la ducha de vidrio, el lavamanos de sobreponer y el mueble de madera (nadie usó este clip).
    desde: fr(15),
    en: P.bano,
    dur: P.alcoba - P.bano,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason:
      "Baño (cómo se vive): la ducha de vidrio y el lavamanos de sobreponer; cuenta lo que hay dentro de esa puerta antes de la alcoba.",
  },
  {
    id: "c10-alcoba",
    bloque: 5,
    tipo: "video",
    src: v("rc13"),
    // RC13 «habitacion secundaria», de 0,4 a 2,9 s: la alcoba con el techo de concreto y el ventanal con las montañas y la torre de ladrillo al fondo; el paneo sigue hacia la izquierda (nadie usó este clip).
    desde: fr(12),
    en: P.alcoba,
    dur: P.vista - P.alcoba,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason:
      "Alcoba (el descanso): el techo de concreto y el ventanal; la alcoba a la que dan el baño y el vestier de antes.",
  },
  {
    id: "c11-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc12"),
    // RC12 «habitacion secundaria - zoom in ventanal», de 0,4 a 4,23 s: el ventanal con las montañas y la ciudad, con el cielo, y la cámara avanza despacio (la V6 y la V7 usaron 7,87-11,3 s, el zoom: ni un fotograma en común).
    // Dura 114 f (3,8 s): el plano más largo del bloque. Es el ventanal «sin el zoom»; el cielo grande que cerró la V6 y la V7 NO se repite.
    desde: fr(12),
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ shadows: 0.2, blacks: -0.02 }),
    reason:
      "Ventanal (la vista): el clímax de la casa; las montañas y la ciudad desde la alcoba, la última imagen de la casa antes del CTA y el plano más largo del bloque.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c12-cta",
    bloque: 6,
    tipo: "video",
    src: v("rc14"),
    audio: a("rc14-voz"),
    voz: {
      s0: 45.22,
      s1: 49.35,
      lufs: -14.4,
      dice: "Si te gustó este apartamento y deseas tener más información, contáctame.",
    },
    // RC14, de 44,8 s al final del clip (49,83 s): ella camina hasta el ventanal de esquina de la otra alcoba, se gira a cámara y se acerca hablando. La voz empieza a los 45,22 s (la primera sílaba, a los 45,70 s): `desde` 1344 f
    // (44,8 s) da 12,45 f de clip antes del primer sonido, así que el CTA ENTRA CON DISOLVENCIA que acaba en el golpe del f1023 (suena entero: la música baja en los 7 f siguientes) y la primera sílaba suena a los 12,5 f del golpe,
    // con la curva ya acabada. La caída de la canción (118,0 s) cae a los 87 f de la entrada (f1110), ya con su voz. Tras la última palabra (f1159,5) quedan 14,5 f de cola: el fundido a negro de 6 f cabe sin tocarla.
    desde: fr(1344),
    en: P.cta,
    dur: DUR_CTA,
    zoom: QUIETO,
    entra: "disolver",
    // Ella a contraluz del ventanal: el plano mide 109 de luma (los demás, 131) y el 4,3 % del cuadro está aplastado: una exposición de +0,08 y las sombras abiertas, sin tocar la piel.
    color: color({ saturation: 1.02, exposure: 0.08, shadows: 0.18 }),
    reason:
      "Alcoba (la invitación): Isabella en el ventanal de la otra alcoba, ante la ciudad; dice «si te gustó este apartamento y deseas tener más información, contáctame». Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el
  // logo y la web (`cierre-026.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c13-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-026/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c12
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c13). */
export const DURACION_026 = P.cta + DUR_CTA + DUR_TARJETA;
