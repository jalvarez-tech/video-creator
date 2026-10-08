/**
 * EL RECORRIDO 017 — «Los Patios · apto 501» — los planos, como DATOS.
 *
 * Reel de venta de Propiedades Luxur con Isabella Cadavid como presentadora:
 * seis bloques y doce planos (el formato `recorrido-luxur`). Dron → hook →
 * recorrido → mitad → recorrido → CTA, con UNA toma suya por bloque (HK02,
 * MD09, CT07) y un solo tema musical de principio a fin. Artefactos y el porqué
 * de cada plano: proyectos/017/artefactos/. Qué toma es cada código y cómo
 * cambiarla: proyectos/017/combinaciones.md.
 *
 *   bloque 1  c01                 el edificio desde el aire, SIN TEXTO (el frame 0 es la miniatura limpia)
 *   bloque 2  c02                 Isabella: el hook (empieza a hablar cuando su imagen ya es opaca)
 *   bloque 3  c03 c04 c05 c06     recorrido: la fachada desde el suelo → la puerta → la sala → el ventanal
 *   bloque 4  c07                 Isabella: «Tienes 317 metros…»
 *   bloque 5  c08 c09 c10         recorrido: follaje y patio (UNA toma de RC08, en dos planos) → el dron en el borde de la terraza
 *   bloque 6  c11 c12             Isabella: el CTA; y la tarjeta oscura del cierre, con el logo y la web (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA. «Time» (Hans Zimmer) tiene frases de 8
 * pulsos (≈ 7,6 s, 63 BPM) con un golpe al empezar cada una. El vídeo arranca en
 * el golpe del compás 8 de la sección que el catálogo marca desde 2:48 (el pulso 0)
 * y los cortes caen en los pulsos: el golpe grande (pulso 8) entra con la fachada
 * vista desde el suelo (frame 231), el golpe de frase siguiente (pulso 16) es el barrido del ventanal
 * (459), la frase más fuerte (pulso 32) cae dentro del patio (917) y la resolución
 * de piano (pulso 40) sostiene el CTA (1145). Todos los `en` salen de `pulso(n)`:
 * mover la entrada de la música o el tempo es cambiar las constantes de la
 * rejilla, no doce números.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto
 * (`fr(87)` = 87/30 s) para que imagen y voz corten en la MISMA muestra; `en` y
 * `dur`, en frames de la composición. Los planos son CONTIGUOS: cada `en` es el
 * fin del anterior.
 *
 * TRANSICIONES. Corte seco entre planos de recorrido (la cámara ya se mueve) y
 * disolvencia de 12 f al entrar y al salir de Isabella (cambia el registro, no el
 * sitio). Nada más: ni barridos ni zooms de transición (viaje-emocional.md §6).
 * La disolvencia ACABA en el pulso (el plano nuevo es opaco justo en el golpe): la
 * del hook, en el pulso 2 (el dron dura 2 s); la de la fachada, en el 8; y así.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO (revisión 4, pedido del usuario): ni hook
 * escrito ni subtítulos. Por eso Isabella no habla sobre el dron: su imagen es
 * opaca en el pulso 2 (f60) y empieza a hablar un frame después.
 *
 * EL COLOR (revisión 7, pedido del usuario: «que los colores se vean vivos, balanceados y
 * cinematográficos»): cada plano de vídeo lleva su `color`, el efecto `colorCorrection()` de
 * Remotion. Una base común (contraste con cuerpo, negros hundidos, luces recogidas, un punto
 * cálido y +10 % de saturación) y, encima, el ajuste de CADA toma: igualar la luz de
 * cámaras y horas distintas y salvar los cielos. Medido, no a ojo: ver `COLOR_BASE`. Las
 * tomas de Isabella apenas pasan de 1,0 de saturación (la piel se queda donde estaba) y
 * ningún plano pasa de 0,04 de `vibrance` (sobre el hormigón gris pinta un moteado de
 * colores y las nubes se vuelven rosas). La tarjeta del cierre no se gradúa.
 *
 * Datos puros: solo `import type`. La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-017";

export const FPS_017 = 30;

export type Entrada = "corte" | "disolver";
export type Bloque = 1 | 2 | 3 | 4 | 5 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. `s0`/`s1` medidos con `limites-voz.py` sobre el WAV crudo; `lufs`, con ebur128 sobre el WAV TRATADO que suena (ver `OBJETIVO_LUFS`). */
export interface VozDelCorte {
  /** Segundo de la fuente en que empieza a hablar. */
  s0: number;
  /** Segundo de la fuente en que termina de hablar. */
  s1: number;
  /** Sonoridad integrada de la voz TRATADA (LUFS) en esa ventana. */
  lufs: number;
  /** Lo que dice, tal como está en el guion. Solo para leer el plan. */
  dice: string;
}

export interface Corte extends CorteDelFormato<Entrada> {
  /** `foto` solo para la tarjeta oscura del cierre (`c12-cierre`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella cuya voz entra con su imagen: el WAV de su voz, TRATADO (`<toma>-voz.wav`: ver `OBJETIVO_LUFS`). */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (REV. 9, pedido del usuario sobre la final ya exportada, 2026-10-08: «necesito que la voz cuando habla
 * Isabella tenga más decibeles sin saturar»; hasta la rev. 8 la voz iba a −21, la mediana de las tres tomas, sin filtro ni compresor, y sonaba ≈ 6 dB por
 * debajo del paseo). Con ganancia sola no se puede: las tres tomas crudas miden −21,1 (HK02), −21,7 (MD09) y −18,9 LUFS (CT07, la más fuerte) con picos de −3,1,
 * −3,0 y −2,0 dBTP, y llevarlas a −15 daría +3,0, +3,7 y +1,9 dBTP (saturan). Suena la voz TRATADA (`<toma>-voz.wav`: graves, puerta suave, compresión 3:1,
 * +15,1 · +14,8 · +13,9 dB y limitador a −2,5 dBFS, en `proyectos/017/normalizar.mjs`), que ya llega a −15,0 LUFS con el pico real en −2,5 dBTP en las tres: la ganancia
 * del plan queda en 0 dB. Excepción a R29 («una ganancia por toma y nada más»), por encargo, declarada aquí y en la puerta (sección 3: pico real ≤ −1 dBTP con su
 * ganancia). `s0` y `s1` salen del WAV crudo (`limites-voz.py`): el tratado no se desfasa (2-3 muestras).
 */
export const OBJETIVO_LUFS = -15;

/* ── La rejilla de la música ────────────────────────────────────────────────
 *
 * «Time» (Hans Zimmer), `Music/Hans Zimmer - Time.mp3`, Sol mayor, 63 BPM.
 * Medida sobre el audio decodificado (banda 80-3000 Hz, subida de 6 ms): cada
 * FRASE son 8 pulsos y empieza con un golpe tras un respiro. Estos son los
 * segundos de la CANCIÓN en que empieza a subir cada golpe de frase (los compases
 * 8, 16, 24… de la sección que el catálogo marca desde 2:48): la de entrada, la
 * del gran golpe de la puerta, y así hasta la resolución de piano del 48.
 * Dentro de una frase los pulsos se reparten por igual (el tempo varía ±0,1 %
 * entre frases: por eso se ancla en cada una y no en una sola recta).
 */
const FRASES = [175.667, 183.272, 190.886, 198.5, 206.138, 213.746, 221.359] as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: 33,7 ms antes del
 * golpe de entrada (el colchón de `entra: 1` en audio-017.ts), redondeado a un
 * frame (5269/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 5269 / FPS_017;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido
 * en el 016 por correlación entre la prueba 720p y el WAV. Se suma aquí y en la
 * puerta para que el corte caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El instante de la CANCIÓN (s) del pulso `n`: 0 es el golpe de entrada, 8 el siguiente de frase. */
export const instanteDelPulso = (n: number): number => {
  const i = Math.max(0, Math.min(Math.floor(n / 8), FRASES.length - 2));
  return FRASES[i] + ((n - 8 * i) / 8) * (FRASES[i + 1] - FRASES[i]);
};

/** El frame del vídeo en que SUENA el pulso `n` (sin redondear). */
export const pulsoExacto = (n: number): number =>
  (instanteDelPulso(n) + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_017;

/** El frame entero del vídeo en que suena el pulso `n`. */
export const pulso = (n: number): number => Math.round(pulsoExacto(n));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_017;

/** Isabella: un empuje lento hacia ella. El recorrido, quieto: la cámara ya avanza. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-017/${id}.mp4`;

/** El pulso de cada cambio de plano (la rejilla de arriba) y los frames que resultan. */
const P = {
  hook: pulso(2), // 60 · la disolvencia al plano de Isabella ACABA aquí y ella habla un frame después
  fachada: pulso(8), // 231 · el golpe grande
  pasillo: pulso(10), // 288
  sala: pulso(12), // 345
  ventanal: pulso(16), // 459 · el golpe de frase
  mitad: pulso(20), // 573
  follaje: pulso(25), // 716
  patio: pulso(29), // 831
  dron: pulso(34), // 974
  cta: pulso(40), // 1145 · la resolución de piano
} as const;

/**
 * CT07 acaba 3 f después de su última palabra (la voz va hasta los 7,02 s de un
 * archivo de 7,10): no tiene «cola». Hasta la revisión 5 lo que seguía era su último
 * fotograma congelado; el usuario pidió (rev. 6) que NO se congele: la imagen funde a
 * negro (en la composición, `FundidoACierre`, hasta el último fotograma de la toma) y
 * sigue una TARJETA OSCURA con el logo y la web (`cierre-017.ts`). La tarjeta es un
 * plano de negro liso (`foto`: el PNG lo genera `normalizar.mjs`); el logo y la web son
 * overlays de la composición.
 */
const DUR_CTA = 194;

/**
 * Dónde acaba la música (frame de la comp). «Time» vuelve a pegar en el pulso 48 (el
 * frame 1373): la resolución de piano tiene que haberse apagado antes. Dos frames de margen.
 */
export const FIN_MUSICA_017 = Math.floor(pulsoExacto(48)) - 2;

/**
 * LA BASE DEL COLOR, común a todos los planos de vídeo. `colorCorrection()` aplica, por este
 * orden: exposición → balance de blancos → sombras/luces/blancos/negros → contraste → saturación
 * → vibrance (ver `ColorCine` en `corte.ts`).
 *
 *   contrast 1,10     cuerpo: el material (iPhone y dron) llega plano
 *   blacks −0,06      el negro un poco hundido; sin él el hormigón se ve lavado
 *   shadows +0,08     … pero las sombras no se cierran: en obra gris el detalle está ahí
 *   highlights −0,20  las luces se recogen un poco: cielos y ventanales no se queman
 *   whites −0,05      el blanco, sin tocar casi
 *   temperature +0,03 un punto cálido (la marca es cálida), sin teñir la piel
 *   saturation 1,10   la viveza va aquí y no en `vibrance`: es la palanca segura
 *   vibrance 0        …que sobre hormigón gris amplifica el ruido de croma
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

/** El color de un plano: la base más el ajuste de su toma. */
const color = (ajuste: ColorCine = {}): ColorCine => ({ ...COLOR_BASE, ...ajuste });

/**
 * El color de «Patio y Naturaleza» (RC08). c08 y c09 son UNA toma continua partida en el pulso 29:
 * el mismo objeto en los dos, por construcción, o el corte que no debe verse se vería.
 */
const COLOR_PATIO = color({ exposure: 0.12, highlights: -0.35, saturation: 1.07, vibrance: 0.03 });

export const metraje017: readonly Corte[] = [
  // ── Bloque 1 · la casa ──
  {
    id: "c01-dron",
    bloque: 1,
    tipo: "video",
    src: v("dr147"),
    desde: fr(0),
    en: 0,
    dur: P.hook,
    // 0,05 en 2 s (era 0,10 en 4,3 s): el mismo ritmo de empuje, en un plano que dura la mitad.
    zoom: [1.0, 1.05],
    entra: "corte",
    color: color({ exposure: 0.25, highlights: -0.3, shadows: 0.16, vibrance: 0.04 }),
    reason:
      "Fachada (la promesa): el edificio de jardines colgantes visto desde el aire, la copa de un árbol subiendo por delante, con el golpe de apertura de la música. La primera toma sale SIN TEXTO (ni hook escrito ni subtítulos): el frame 0 es la miniatura limpia. Entra a corte: no nace de negro.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk02"),
    audio: "recorrido-017/hk02-voz.wav",
    voz: {
      s0: 0.52,
      s1: 5.3,
      lufs: -15,
      dice: "Este apartamento aún no está terminado… y ahí está, precisamente, la oportunidad.",
    },
    // Revisión 4: la primera toma sale sin texto, así que ella NO habla sobre el dron (en la
    // rev. 1-3 su voz entraba a los 1,9 s y su imagen, a los 4,3 s). Su imagen es opaca en el
    // pulso 2 y la primera palabra («Este», a los 0,52 s de su toma) suena un frame después:
    // `desde` es el frame anterior a esa palabra (16 − 1). Quedan 3 f de clip por delante
    // para la disolvencia (pide 12): el clip empieza en el 0,0, y la disolvencia arranca en el 0,1.
    desde: fr(15),
    en: P.hook,
    dur: P.fachada - P.hook,
    zoom: [1.02, 1.14],
    entra: "disolver",
    color: color({ exposure: -0.05, contrast: 1.12, blacks: -0.1, saturation: 1.02, temperature: 0.02 }),
    reason:
      "Obra gris (INT-ABIERTO): Isabella en la sala vacía, una figura pequeña frente a un muro sin terminar, dice su hook («…aún no está terminado… y ahí está la oportunidad») desde que su imagen es opaca; el dron ha salido limpio antes de que hable. Disuelve porque cambia el registro, no el sitio; el empuje 1,02→1,14 la acerca porque a esta distancia la voz necesita cara.",
  },
  // ── Bloque 3 · recorrido inmersivo (de la fachada al espacio abierto) ──
  {
    id: "c03-fachada",
    bloque: 3,
    tipo: "video",
    src: v("rc25"),
    // «Exterior edificio4» (RC25), a petición del encargo en la revisión 2: el contrapicado
    // de la fachada de jardines colgantes visto desde el camino. Del 1,20 al 3,10 s: el edificio
    // sube hacia el cielo con nubes y, al final, la cámara baja hacia el camino. Le quedan
    // 24 f de clip por delante para la disolvencia (la puerta pide 12).
    desde: fr(36),
    en: P.fachada,
    dur: P.pasillo - P.fachada,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.28, highlights: -0.3, whites: 0, temperature: 0.04 }),
    reason:
      "Fachada (la llegada): el contrapicado del edificio de jardines colgantes visto desde el camino, con el cielo y las nubes, entra con el golpe grande de la música; se llega al edificio antes de entrar y la cámara baja hacia el camino con el mismo gesto con que el plano siguiente se acerca a la puerta. Aquí empieza el paseo y no vuelve atrás.",
  },
  {
    id: "c04-puerta",
    bloque: 3,
    tipo: "video",
    src: v("rc01"),
    desde: fr(246),
    en: P.pasillo,
    dur: P.sala - P.pasillo,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.08 }),
    reason:
      "Umbral (puerta y pasillo de ladrillo): tras la fachada, la hoja de la puerta barre el cuadro como una cortinilla natural y deja ver el muro de bloques de vidrio al fondo; se entra en la casa con el mismo movimiento que abre el plano.",
  },
  {
    id: "c05-sala",
    bloque: 3,
    tipo: "video",
    src: v("rc02"),
    desde: fr(294),
    en: P.sala,
    dur: P.ventanal - P.sala,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.08, contrast: 1.12, saturation: 1.06 }),
    reason:
      "Sala: el giro que revela el ventanal tras el muro de bloques de vidrio y la tubería amarilla del techo; el espacio social que prometía el umbral, avanzando en la misma dirección que el pasillo.",
  },
  {
    id: "c06-ventanal",
    bloque: 3,
    tipo: "video",
    src: v("rc07"),
    desde: fr(24),
    en: P.ventanal,
    dur: P.mitad - P.ventanal,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.25, shadows: 0.35, blacks: 0.04, highlights: -0.35, saturation: 1.06 }),
    reason:
      "Ventanal: el barrido del ventanal de esquina con el skyline de Medellín y, al final, el giro hacia el espacio abierto donde espera Isabella; cae en el golpe de frase y lleva al siguiente espacio.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c07-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md09"),
    audio: "recorrido-017/md09-voz.wav",
    voz: { s0: 0.57, s1: 4.68, lufs: -15, dice: "Tienes 317 metros para desarrollar completamente el interior." },
    desde: fr(16),
    en: P.mitad,
    dur: P.follaje - P.mitad,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ exposure: 0.2, shadows: 0.28, highlights: -0.42, whites: -0.1, saturation: 1.04, contrast: 1.06 }),
    reason:
      "Espacio abierto (INT-ABIERTO): Isabella llega caminando hacia la cámara donde acaba el paseo por dentro, con la terraza al fondo; la cifra («317 metros») es la oportunidad del hook hecha medida.",
  },
  // ── Bloque 5 · recorrido (del follaje al patio y al dron) ──
  {
    id: "c08-follaje",
    bloque: 5,
    tipo: "video",
    src: v("rc08"),
    // «Patio y Naturaleza» (RC08) sigue en c09: los dos planos son UNA toma continua que se
    // parte en el pulso 29 (c09 arranca en el fotograma siguiente al último de c08: 47 + 115 = 162).
    // El plano nace del 1,57 s, un segundo antes que en la revisión 1, para que la toma
    // llegue hasta su último fotograma justo cuando entra el dron.
    desde: fr(47),
    en: P.follaje,
    dur: P.patio - P.follaje,
    zoom: QUIETO,
    entra: "disolver",
    color: COLOR_PATIO,
    reason:
      "Pasarela (BARANDA): del interior gris al verde; el follaje y la barandilla se abren al deck y, al final, al patio de techo de madera. Es el cambio de mundo del paseo: interior en bruto → exterior terminado. Primera mitad de una toma continua de «Patio y Naturaleza».",
  },
  {
    id: "c09-patio",
    bloque: 5,
    tipo: "video",
    src: v("rc08"),
    // Revisión 2: «Patio y Naturaleza» (RC08) en lugar de «Patio y Piscina» (RC10). Sin corte visible:
    // sigue donde acaba c08 (fotograma 162) y llega hasta el último fotograma del clip (el 304).
    desde: fr(162),
    en: P.patio,
    dur: P.dron - P.patio,
    zoom: QUIETO,
    entra: "corte",
    color: COLOR_PATIO,
    reason:
      "Patio (TERRAZA): la misma toma continua de «Patio y Naturaleza»: sin corte visible en el pulso 29, la pasarela se abre al patio de techo de madera, ladrillo y palma, y el golpe de frase más fuerte (f917) cae en la revelación del patio con la corrediza al fondo.",
  },
  {
    id: "c10-dron",
    bloque: 5,
    tipo: "video",
    src: v("dr163"),
    // Revisión 3: el plano arranca en el segundo 2 del clip (en la rev. 1 y la 2 arrancaba en el 13,3:
    // el último tramo, a ras de suelo hacia la corrediza). Del 2,0 al 7,7 s: el borde de la terraza.
    desde: fr(60),
    en: P.dron,
    dur: P.cta - P.dron,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.12, shadows: 0.22, blacks: 0, highlights: -0.55, whites: -0.35, temperature: 0.14, vibrance: 0.04 }),
    reason:
      "Terraza (vista, el clímax): el dron arranca en el borde de la terraza —la columna de concreto, el canto del techo de madera y el skyline de Medellín— y se desliza despacio a la derecha sobre las plantas de la barandilla; es el plano más largo de su bloque, la vista que cierra el recorrido y el que lleva a la terraza donde espera Isabella.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c11-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct07"),
    audio: "recorrido-017/ct07-voz.wav",
    voz: {
      s0: 0.65,
      s1: 7.0,
      lufs: -15,
      dice: "Necesitas saber si esta unidad en específico funciona para ti. Si es así, escríbeme y la recorremos juntos.",
    },
    desde: fr(19),
    en: P.cta,
    dur: DUR_CTA,
    zoom: [1.0, 1.048],
    entra: "disolver",
    color: color({ exposure: 0.15, saturation: 0.98, temperature: -0.06 }),
    reason:
      "Terraza: Isabella, en esa misma terraza que acaba de enseñar el dron, sale por la corrediza y camina hacia la cámara con los brazos abiertos («la recorremos juntos»); la música resuelve a un piano bajo su voz.",
  },
  {
    id: "c12-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-017/cierre-oscuro.png",
    en: P.cta + DUR_CTA,
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo de Propiedades Luxur y la web mientras el piano se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta. */
export const DURACION_017 = P.cta + DUR_CTA + DUR_TARJETA;
