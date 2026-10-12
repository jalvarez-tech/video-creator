/**
 * EL RECORRIDO 027 — «One Living · Envigado», QUINTO REEL DE ESTA PROPIEDAD (V11 del registro) — los planos, como DATOS.
 *
 * Misma casa que el 022 (V6), el 023 (V7), el 024 (V8) y el 026 (V10), mismo material (26 clips, sin dron). El formato es el mismo (`recorrido-luxur`, seis bloques; reglas fijas del canal en su `SKILL.md` §0).
 * Cuando empezó esta versión no quedaba ningún hook, mitad ni CTA limpios: el usuario eligió (2026-10-08) la VÍA (a): una terna NUEVA de tomas YA PUBLICADAS. Elegí HK2 · MD3 · CT4, la única de las 14 ternas
 * con tres sitios y paseo coherente que toma cada frase de una versión distinta (`proyectos/027/analisis-uso.md` §A3).
 *
 * LA PIEZA ABRE CON EL HOOK, como la V6-V10 (pedido del usuario en la V6: «como esta propiedad no tiene dron empecemos directamente con el hook»). Rompe a propósito la regla fija «la primera toma
 * sale sin texto ni voz»: la excepción está declarada en la puerta (`ABRE_CON_EL_HOOK`) y en el registro.
 *
 * LA IDEA: «sin balcón no es opción». Isabella habla desde el balcón, la seguimos de espaldas a la cocina, la casa se abre (la estufa, la isla, la corredera abierta al balcón), ella resume en la sala
 * lo que tiene (dos habitaciones independientes, el balcón y City Plaza) y el paseo sigue hasta la alcoba principal, su baño y la vista desde su ventanal, donde ella invita a escribirle.
 * Sentido: balcón → zona social (el centro del plano) → alcoba principal (un extremo); la alcoba secundaria, en el otro extremo, no sale: el paseo no vuelve a cruzar el centro.
 *
 *   hook      HK2         BALCON    «Si para ti un apartamento sin balcón no es opción, mira esto.»                         (REPETIDA de la V6)
 *   mitad     MD3         SALA      «Cuenta con dos habitaciones independientes, balcón y ubicación junto a City Plaza.»   (REPETIDA de la V7)
 *   CTA       CT4 = RC14  ALCOBA    «Si te gustó este apartamento y deseas tener más información, contáctame.»             (REPETIDA de la V10: clip 44,8-49,83 s; voz 45,22-49,35 s)
 *
 * TRES sitios, BALCON · SALA · ALCOBA (la del ventanal de esquina: casi seguro la principal, inferido de RC08 y RC09), y NINGUNA cifra («dos habitaciones», en palabra, como la V7).
 *
 *   bloque 2  c02              Isabella en el balcón: el hook, A CORTE EN EL FRAME 0 (ella al fondo del balcón, camina hacia la cámara, que está en la sala)
 *   bloque 3  c03 c04 c05 c06  el paseo: detrás de ella de la sala a la cocina, y su mano en la isla (RC14, sin voz) · la estufa con su campana (RC06) · de la isla a la sala (RC09) · la corredera abierta (RC09)
 *   bloque 4  c07              Isabella en la sala, junto a la corredera: la mitad (MD3)
 *   bloque 5  c08 c09 c10 c11  la alcoba principal con su mueble blanco (RC07) · hacia su baño (RC09) · el baño (RC02) · la vista desde su ventanal de esquina (RC08: la más larga)
 *   bloque 6  c12 c13          Isabella ante ese ventanal: el CTA (RC14); y la tarjeta oscura del cierre (nada se congela)
 *
 * COMPARTE CON LA V6, LA V7, LA V8 Y LA V10 (declarado; la puerta lo mide contra `VERSIONES_ANTERIORES`): las TRES tomas (HK2 de la V6, MD3 de la V7, el tramo del CTA de RC14 de la V10); de recorrido,
 * la vista RC08 0,4-3,07 s (la V8 usó 0,4-4,07: ≈ 2,7 s opacos) y el baño RC02 0,0-1,97 s (la V6 usó 1,2-4,03: ≈ 0,8 s); RC06 roza la disolvencia de la V8 (≈ 0,2 s, no opaco). Lo demás, ni un fotograma: RC14 18,1-22,6 s,
 * RC06 9,6-12,1 s, RC09 25,2-27,27 · 30,0-32,1 · 3,0-5,53 s y RC07 6,1-8,6 s no los usó nadie. RC14 se usa dos veces (el paseo y el CTA, 22 s aparte) y no se solapan.
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA, POR GOLPES. «Ivory Skyline Reverie» NO tiene pulso: se corta sobre los GOLPES MEDIDOS (`medir-pista.py`, ≥ 6 dB) y se comprueba sobre el audio del render
 * (`herramientas/golpes-render.py`, R33). Todos los `en` salen de `golpe(...)`: mover la entrada de la música es cambiar `INICIO_MUSICA`.
 * LA CANCIÓN. Lounge/downtempo (†: género inferido del catálogo, sin oír; «onírico, sofisticado, sereno»: puede sonar «playera» y el usuario lo confirma oyendo). Es la única libre que deja rejilla con esta
 * terna: `herramientas/buscar-cortes.py` sobre sus golpes con las ventanas de plano reales (descontando los 12 f que pide cada disolvencia) da 28 soluciones; se eligió la de entrada más fuerte.
 *
 * LA RESOLUCIÓN. La canción suena en una meseta de −11,5 LUFS (sin crescendo) hasta los 193 s; su fundido final cae en LUFS a 194,5 s (−12,3 → −22,1 → silencio; el archivo acaba a 197,23 s).
 * La toma del CTA entra en el golpe de 192,037 s y la caída cae a los 73 f de su entrada, ya con la voz de Isabella; la pista se apaga sola 2 f después de que empiece la tarjeta.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(18)` = 18/30 s) para que imagen y voz corten en la MISMA muestra;
 * `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS: cada `en` es el fin del anterior.
 *
 * TRANSICIONES. El hook abre la pieza a corte (frame 0). Un corte seco pide un salto de luma ≤ ±8 entre los fotogramas extremos (`herramientas/saltos-luma.py`) y un golpe que suene: solo el baño (−3,9, en el golpe de
 * 21,9 dB) entra a corte; los demás ENTRAN CON DISOLVENCIA de 12 f que acaba en un golpe (12,6-17,1 dB), con `desde` ≥ 12 f (saltos de −50 a +19 a corte). Las dos entradas de Isabella con voz traen aire suficiente
 * (la mitad, 14,7 f tras el golpe; el CTA, 12,6 f) y entran también con disolvencia.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Dos fuentes (Isabella y RC14 en HLG
 * tone-mapeado, recorridos en SDR). Con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-027.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-027";

export const FPS_027 = 30;

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
 * EL NIVEL DE LA VOZ (revisión 1, pedido del usuario 2026-10-08: «necesito que la voz cuando habla Isabella tenga más decibeles sin saturar»): −17 LUFS, 4 dB más que el −21 de las diez versiones
 * anteriores. Sin tratar, las tomas medían −18,7 (HK2), −21,6 (MD3) y −22,7 LUFS (CT4, RC14) y MD3 no subía más de 0,7 dB sin pasar de −1 dBTP: la voz que suena es la de `<toma>-alta.wav`, que
 * `normalizar.mjs` (`VOZ_ALTA`) deja a −17 LUFS con una ganancia y un limitador de picos (solo los picos de las sílabas fuertes; −2,0 dBTP de pico real). Aquí la ganancia del plan es 0 dB.
 */
export const OBJETIVO_LUFS = -17;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Ivory Skyline Reverie» — `archivos/musica/Ivory Skyline Reverie.mp3` (sha 8 `80bf4f33`), lounge/downtempo, 3:17. Se usa desde 163,233 s (su paseo empieza en el golpe de 168,183 s, 17,1 dB) y de ahí
 * suena −11,5 LUFS, sin crescendo, hasta su fundido final (194,5 s en LUFS). Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir») en que entra
 * cada plano, con su fuerza en dB por 15 ms. `proyectos/027/musica/golpes-027.json`. Salen de `buscar-cortes.py` (cortes en 168,183 · 172,241 · 174,548 · 176,199 · 177,91 · 183,165 · 185,293 · 187,422 · 189,376 · 192,037 s).
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el MISMO del paseo (f150): lo que se oye en el hook es la música que lo precede, baja bajo su voz. */
  apertura: { t: 168.183, db: 17.1 },
  /** El paseo empieza (con una disolvencia, tras el hook): detrás de Isabella, de la sala a la cocina. */
  paseo: { t: 168.183, db: 17.1 },
  /** La estufa con su campana (RC06). */
  estufa: { t: 172.241, db: 12.6 },
  /** De la isla a la sala (RC09). */
  isla: { t: 174.548, db: 13.8 },
  /** La corredera abierta al balcón (RC09): el destino del paseo. */
  corredera: { t: 176.199, db: 13.4 },
  /** Isabella entra (con una disolvencia que acaba aquí) con la mitad. */
  mitad: { t: 177.91, db: 14.0 },
  /** La alcoba principal (RC07): sale la mitad y empieza el bloque 5. */
  alcoba: { t: 183.165, db: 16.2 },
  /** Hacia su baño (RC09). */
  haciaBano: { t: 185.293, db: 12.9 },
  /** El baño (RC02). */
  bano: { t: 187.422, db: 21.9 },
  /** La vista (RC08): el ventanal de esquina, el plano más largo del bloque. */
  vista: { t: 189.376, db: 12.7 },
  /** Isabella entra (con una disolvencia que acaba aquí) con el CTA; el fundido final de la canción cae dentro de su toma. */
  cta: { t: 192.037, db: 14.9 },
} as const;

/**
 * LA CAÍDA de la canción: la meseta (−11,5 LUFS) acaba hacia los 193 s; en 194,5 s cae (ebur128 por tramos de 5 s, `herramientas/lufs-caida.py`: −12,3 antes, −22,1 en los 5 s siguientes y silencio en los
 * 5 s tras ellos: el archivo acaba a 197,23 s). El primer `t` que da ≥ 9 dB a 5 s y ≥ 20 dB a 10 s es 194,5 s (a 194,0 s cae 8,3). No es un golpe sino el fundido final de la pista: la resolución de esta pieza.
 */
export const DECAE = { t: 194.5, lufsAntes: -12.3, lufs5s: -22.1, lufs10s: -70.0 } as const;

/** Dónde se acaba el archivo de la canción (s): no hay nota siguiente; la música se apaga sola. */
export const FIN_PISTA = 197.23;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (168,183 s) cae donde empieza el paseo, a los 5,0 s (f150: la voz del hook acaba en el f116 y la música sube en 24 f
 * antes de ese golpe), y la música suena ya desde el f0, baja bajo la voz del hook (pedidos del usuario en la V7, heredados). El número es el segundo de la fuente que cae en el f0: 4897/30,
 * un frame entero para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 4897 / FPS_027;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y
 * confirmado desde el 017). Se suma aquí y en la puerta para que el corte caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_027;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_027;

/** QUIETO: las tomas de Isabella ya se mueven (ella camina hacia la cámara) y los recorridos ya avanzan: un empuje encima marearía. */
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-027/${id}.mp4`;
const a = (id: string): string => `recorrido-027/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE de Luxur, la del 017: contraste con cuerpo, negros hundidos, luces recogidas, un punto cálido y +10 % de saturación. Orden del efecto:
 * exposición → balance de blancos → sombras/luces/blancos/negros → contraste → saturación → vibrance. `vibrance` ≤ 0,05 y las tomas de Isabella,
 * `saturation` ≤ 1,06 (la piel se queda donde estaba). Salió de material HLG tone-mapeado; los recorridos de esta casa son SDR: los ajustes de cada plano
 * parten de los de la V6-V10 (mismas casas: la madera, el gres, el vestier) y se miden otra vez (`proyectos/027/herramientas/medir-color.py`).
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

/** RC09 en el paseo (la isla y la corredera, dos planos SEGUIDOS del mismo clip): el MISMO color en los dos. */
const COLOR_RC09_PASEO = color({ shadows: 0.14, blacks: -0.04 });

/**
 * El frame de cada cambio de plano: el del golpe de la canción en que entra (arriba). Las entradas con disolvencia ACABAN en su golpe.
 */
const P = {
  paseo: golpe(GOLPE.paseo), //         150 · detrás de Isabella, de la sala a la cocina, y la entrada de la canción (el hook ocupa f0-150: su clip desde `desde` 0,167 s hasta 5,17 s)
  estufa: golpe(GOLPE.estufa), //       272 · la estufa con su campana
  isla: golpe(GOLPE.isla), //           341 · de la isla a la sala
  corredera: golpe(GOLPE.corredera), // 391 · la corredera abierta al balcón
  mitad: golpe(GOLPE.mitad), //         442 · Isabella en la sala
  alcoba: golpe(GOLPE.alcoba), //       600 · la alcoba principal
  haciaBano: golpe(GOLPE.haciaBano), // 663 · hacia su baño
  bano: golpe(GOLPE.bano), //           727 · el baño
  vista: golpe(GOLPE.vista), //         786 · la vista
  cta: golpe(GOLPE.cta), //             866 · Isabella con el CTA (con disolvencia)
} as const;

/**
 * Frames que dura la toma del CTA (CT4, RC14): `desde` 1344 f (44,8 s) y el clip normalizado tiene 1495 fotogramas (49,83 s): quedan 151. Su voz acaba a los 49,35 s (f1002,5 de la comp): 14,5 f (0,48 s) de su cara
 * tras la última palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela. (El 29,97 → 30 fps del normalizado añade el fotograma 1495: el CTA lo gasta entero, como en la V10.)
 */
const DUR_CTA = 151;

/**
 * Dónde acaba la música (frame de la comp): donde se acaba el archivo de la canción (197,23 s = f1019 de la comp, 2 f dentro de la tarjeta). No hay nota siguiente: el fundido final de la pista
 * se apaga solo y el resto de la tarjeta queda en silencio.
 */
export const FIN_MUSICA_027 = Math.floor((FIN_PISTA - INICIO_MUSICA) * FPS_027);

export const metraje027: readonly Corte[] = [
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk2"),
    audio: a("hk2-alta"),
    voz: {
      s0: 0.38,
      s1: 4.04,
      lufs: -17.0,
      dice: "Si para ti un apartamento sin balcón no es opción, mira esto.",
    },
    // REPETIDA de la V6. HK2 trae 0,38 s (11 f) de aire antes de su primera palabra. Heredado del pedido del usuario en la V7 («el video del hook empiézalo justo antes de que Isabella empiece a hablar»): ENTRA A CORTE
    // en el frame 0 con `desde` 5 f (0,167 s): la primera palabra suena a los 6,4 f (la imagen ya es opaca y la música ya está abajo). Ella, al fondo del balcón, camina hacia la cámara (en la sala). El clip llega a 5,17 s
    // (f150): la voz acaba en el f116 y quedan 34 f para que la música suba (24) antes del golpe en que entra el paseo.
    desde: fr(5),
    en: 0,
    dur: P.paseo,
    zoom: QUIETO,
    entra: "corte",
    color: color({ saturation: 1.02 }),
    reason:
      "Balcón (la promesa): Isabella al fondo del balcón, con la ciudad detrás, camina hacia la cámara y dice «si para ti un apartamento sin balcón no es opción, mira esto»: habla a quien filtra por balcón, desde el balcón. Entra a corte en el frame 0.",
  },
  // ── Bloque 3 · el paseo: sala → cocina → sala → corredera ──
  {
    id: "c03-cocina",
    bloque: 3,
    tipo: "video",
    src: v("rc14"),
    // RC14 «recorrido caminando», SIN voz, de 18,53 a 22,6 s: la cámara sigue a Isabella de espaldas de la sala a la cocina; ella llega a la isla y apoya la mano en ella (21-22,6 s) — el puente humano.
    // Nadie usó este tramo (la V7 usó 13,67-15,93; la V10, 1,6-7,2 y 44,8-49,83). Entre los 6,3 y los 45,2 s de RC14 solo hay ambiente: ninguna palabra suena aquí.
    desde: fr(556),
    en: P.paseo,
    dur: P.estufa - P.paseo,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ saturation: 1.02 }),
    reason:
      "Sala → cocina (ella nos lleva): acaba de decir «mira esto» y la seguimos de espaldas hasta la cocina, donde apoya la mano en la isla; el paseo empieza detrás de ella.",
  },
  {
    id: "c04-estufa",
    bloque: 3,
    tipo: "video",
    src: v("rc06"),
    // RC06 «cocina, sala, balcon», de 10,0 a 12,3 s: la estufa a gas de 4 puestos con la campana de acero y el ventanal al fondo (nadie usó este tramo: la V6 usó 0-5,1 s y la V8 12,5-14,5, con su disolvencia desde 12,1).
    desde: fr(300),
    en: P.estufa,
    dur: P.isla - P.estufa,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason:
      "Cocina (la estufa): la estufa y la campana que ella acaba de tocar, con la luz del ventanal; cuenta cómo se cocina aquí.",
  },
  {
    id: "c05-isla",
    bloque: 3,
    tipo: "video",
    src: v("rc09"),
    // RC09 «habitacion principal - paneo» (la caminata larga), de 25,6 a 27,27 s: desde la isla hacia la sala (nadie usó este tramo: la V8 usó 22,5-25,23 y 28,0-29,97).
    desde: fr(768),
    en: P.isla,
    dur: P.corredera - P.isla,
    zoom: QUIETO,
    entra: "disolver",
    color: COLOR_RC09_PASEO,
    reason:
      "Cocina → sala (el espacio abierto): de la isla a la sala sin puertas de por medio; la zona social es una sola, en el centro de la planta.",
  },
  {
    id: "c06-corredera",
    bloque: 3,
    tipo: "video",
    src: v("rc09"),
    // RC09, de 30,4 a 32,1 s: la corredera de vidrio con marco negro, abierta, con el balcón, el ladrillo y la ciudad (nadie usó este tramo).
    desde: fr(912),
    en: P.corredera,
    dur: P.mitad - P.corredera,
    zoom: QUIETO,
    entra: "disolver",
    color: COLOR_RC09_PASEO,
    reason:
      "Sala (hacia el balcón): la corredera abierta al balcón por el que empezó la pieza, con la ciudad; ella nos espera ahí al lado.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c07-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md3"),
    audio: a("md3-alta"),
    voz: {
      s0: 1.09,
      s1: 5.38,
      lufs: -17.0,
      dice: "Cuenta con dos habitaciones independientes, balcón y ubicación junto a City Plaza.",
    },
    // REPETIDA de la V7. La voz empieza a los 1,09 s: `desde` 18 f (0,6 s) entra con DISOLVENCIA que acaba en el golpe del f442 (suena entero: la música baja en los 7 f siguientes) y la primera palabra suena a los
    // 14,7 f del golpe, con la curva ya acabada. La última palabra acaba en f585,4; el bloque 5 entra con su disolvencia en el golpe del f600 y deja 14,6 f para que la música suba con fundido. El clip llega a f600
    // (18 + 158 = 176 de 182).
    desde: fr(18),
    en: P.mitad,
    dur: P.alcoba - P.mitad,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ saturation: 1.02 }),
    reason:
      "Sala (lo que tiene): Isabella en el centro de la sala, junto a la corredera por la que acabamos de pasar; resume lo que la casa ofrece: dos habitaciones independientes, el balcón y City Plaza al lado.",
  },
  // ── Bloque 5 · la alcoba principal: el mueble, su baño y la vista ──
  {
    id: "c08-alcoba",
    bloque: 5,
    tipo: "video",
    src: v("rc07"),
    // RC07 «habitacion principal - entrando», de 6,5 a 8,6 s: la alcoba con el mueble blanco empotrado y el ventanal al borde (nadie usó este clip; sus primeros 4,5 s son una puerta y una columna).
    desde: fr(195),
    en: P.alcoba,
    dur: P.haciaBano - P.alcoba,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason:
      "Alcoba principal (el descanso): las «dos habitaciones independientes» que acaba de nombrar; entramos en la principal, con su mueble blanco y la luz del ventanal.",
  },
  {
    id: "c09-hacia-bano",
    bloque: 5,
    tipo: "video",
    src: v("rc09"),
    // RC09, de 3,4 a 5,53 s: dentro de la alcoba principal, hacia la puerta de su baño con la luz encendida (nadie usó este tramo: la V8 usó 6,0-8,07 con su disolvencia desde 5,6).
    desde: fr(102),
    en: P.haciaBano,
    dur: P.bano - P.haciaBano,
    zoom: QUIETO,
    entra: "disolver",
    // La puerta de madera da la saturación más alta de la pieza con la base (0,275 a mitad de plano; la madera mide así): se le quita la viveza de la base, como al vestier de la V8.
    color: color({ shadows: 0.14, blacks: -0.04, saturation: 1.0 }),
    reason:
      "Alcoba principal (lo privado): hacia la puerta de su baño, con la luz encendida; cada habitación tiene el suyo.",
  },
  {
    id: "c10-bano",
    bloque: 5,
    tipo: "video",
    src: v("rc02"),
    // RC02 «bano habitacion principal», de 0,0 a 1,97 s: la ducha de vidrio, el sanitario y el lavamanos de sobreponer sobre el mueble de madera (la V6 usó 1,2-4,03: comparte ≈ 0,8 s).
    // ENTRA A CORTE: el salto de luma desde la puerta del baño es de −3,9 (≤ ±8) y cae en el golpe más fuerte de la pieza (21,9 dB); desde el primer fotograma del clip (el marco de la puerta al borde).
    desde: fr(0),
    en: P.bano,
    dur: P.vista - P.bano,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "Baño principal (cómo se vive): la ducha de vidrio y el lavamanos de sobreponer; lo que hay detrás de esa puerta antes de volver al ventanal.",
  },
  {
    id: "c11-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc08"),
    // RC08 «habitacion principal - paneo 2», de 0,4 a 3,07 s: el cielo y la ciudad, y el ventanal de esquina de marco negro en el que ella va a hablar. REPETIDO de la V8 (su vista: RC08 0,4-4,07 con la
    // disolvencia desde 0,0): es el único plano del lado de la alcoba principal con la vista abierta que dura lo bastante para ser el más largo del bloque (RC09 0-1,2 s y RC08 0-0,4 s, sin usar, no llegan).
    desde: fr(12),
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ contrast: 1.04, blacks: 0.02, shadows: 0.26 }),
    reason:
      "Ventanal de esquina (la vista): el clímax de la casa; el cielo y la ciudad desde la alcoba principal, la última imagen de la casa antes del CTA y el plano más largo del bloque.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c12-cta",
    bloque: 6,
    tipo: "video",
    src: v("rc14"),
    audio: a("rc14-alta"),
    voz: {
      s0: 45.22,
      s1: 49.35,
      lufs: -17.0,
      dice: "Si te gustó este apartamento y deseas tener más información, contáctame.",
    },
    // REPETIDA de la V10 (CT4). RC14, de 44,8 s al final del clip (49,83 s): ella camina hasta el ventanal de esquina, se gira a cámara y se acerca hablando. La voz empieza a los 45,22 s (la primera sílaba, a los
    // 45,70 s): `desde` 1344 f (44,8 s) da 12,6 f de clip antes del primer sonido, así que ENTRA CON DISOLVENCIA que acaba en el golpe del f866 (suena entero: la música baja en los 7 f siguientes). El fundido final
    // de la canción (194,5 s) cae a los 73 f de la entrada (f939), ya con su voz. Tras la última palabra (f1002,5) quedan 14,5 f de cola: el fundido a negro de 6 f cabe sin tocarla.
    desde: fr(1344),
    en: P.cta,
    dur: DUR_CTA,
    zoom: QUIETO,
    entra: "disolver",
    // Ella a contraluz del ventanal (como en la V10): una exposición de +0,08 y las sombras abiertas, sin tocar la piel.
    color: color({ saturation: 1.02, exposure: 0.08, shadows: 0.18 }),
    reason:
      "Alcoba principal (la invitación): Isabella ante el ventanal de esquina que acabamos de ver, con la ciudad detrás; dice «si te gustó este apartamento y deseas tener más información, contáctame». Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el
  // logo y la web (`cierre-027.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c13-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-027/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c12
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c13). */
export const DURACION_027 = P.cta + DUR_CTA + DUR_TARJETA;
