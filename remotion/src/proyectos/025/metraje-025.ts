/**
 * EL RECORRIDO 025 — «Los Patios · apto 501», SEXTA VERSIÓN (V9 del registro) — los planos, como DATOS.
 *
 * El 017 fue la primera («La oportunidad», con «Time»), el 018 la segunda («el espacio y cómo entra el exterior», con «Return to Oasis»), el 019 la tercera («altura sin torre», con «Flying Into
 * the Sun»), el 020 la cuarta («lo que todavía puedes definir», con jazz), el 021 la quinta («dentro y fuera», con piano y sin apertura) y esta es la sexta: otro hook (HK09), otra mitad (MD11), el CTA
 * RECORTADO a su 2.ª mitad (CT03), otro dron (DR153, que hace de vista), otra apertura (RC23, la jardinera y el camino de entrada) y otra canción (la lounge «Heaven on Earth»).
 *
 * LA IDEA: el ángulo D «filtro» del catálogo. El hook dice quién es el comprador («esta propiedad tiene sentido para un comprador muy específico»), la mitad se lo pregunta («¿alguien que valora la
 * arquitectura y prefiere crear sus propios acabados?») y el CTA contesta («escríbeme y ven a conocerlo»). Las imágenes dicen lo mismo: la obra gris tal cual (el ventanal, el muro de bloques de vidrio,
 * el espacio abierto, la alcoba), el deck y el edificio entero visto desde arriba.
 *
 *   hook   HK09  INT-VENTANAL  «Esta propiedad tiene sentido para un comprador muy específico.»
 *   mitad  MD11  INT-ABIERTO   «¿(Eres) alguien que valora la arquitectura y prefiere crear sus propios acabados?»
 *   CTA    CT03  PATIO         «Está disponible por 3.550 millones, escríbeme y ven a conocerlo.» → SOLO LA 2.ª MITAD
 *
 * Tres sitios distintos (sentido I: del ventanal, al espacio abierto, al patio) y NINGUNA cifra. El CTA es CT03 recortada por DECISIÓN DEL USUARIO (2026-10-06, «opción a»): no quedaba ningún CTA limpio
 * (CT03 lleva el precio y CT04 nombra a ALH). El precio no suena, no se lee y no se ve; la FRASE «escríbeme y ven a conocerlo» es la misma que la V5 dijo con CT02 (otra toma y otro sitio). Cuesta una
 * entrada a corte (0,40 s de silencio tras «millones»: 12 f, no caben los 12 de una disolvencia más la palabra) y 1,7 s de voz.
 *
 *   bloque 1  c01                  la casa: RC23, el camino de entrada y los helechos, SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia
 *   bloque 2  c02                  Isabella junto al ventanal: el hook (entra con una disolvencia que acaba en un golpe)
 *   bloque 3  c03 c04 c05          el paseo, sentido I: el ventanal (RC04), el muro de bloques de vidrio (RC02) y el espacio abierto (RC07)
 *   bloque 4  c06                  Isabella en el espacio abierto: la mitad (MD11)
 *   bloque 5  c07 c08 c09          la alcoba y su ventana (RC13), el deck (RC10) y el edificio desde el aire (DR153: la vista, el plano más largo)
 *   bloque 6  c10 c11              Isabella en el patio: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * LECTURA DEL PASEO (declarada). La casa es una línea: la entrada, el ventanal y el muro de bloques en un extremo, el espacio abierto en medio y el deck y el patio en el otro. El hook, junto al
 * ventanal, abre el paseo; el bloque 3 va hacia el espacio abierto y acaba donde habla ella (INT-ABIERTO); el bloque 5 sigue hacia fuera —la alcoba que abre al deck, el deck— y sube a la vista, el
 * edificio entero; y el CTA, en el patio, es el otro extremo. No hay retroceso de plano a plano.
 *
 * COMPARTE CON LAS VERSIONES ANTERIORES (declarado; la puerta lo mide contra `VERSIONES_ANTERIORES`): NINGÚN tramo de recorrido ni de dron. Hay clips que ya salieron con otra ventana: RC04 (V4: 0-2,23 s;
 * aquí 3,0-5,33), RC02 (V1: 9,8-13,6; V4: 0-4,47; aquí 5,5-7,97), RC07 (V1: 0,8-4,6; V2: 0-3,8; aquí 7,0-11,03), RC13 (V3: 2,6-5,7; V4: 10,93-15,37; aquí 9,0-10,8) y RC10 (V2: 4,0-8,37; V5: 8,4-11,83;
 * aquí 2,0-3,87). RC23 y DR153 son nuevos. Comparte la FRASE del CTA con la V5 (otra toma).
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA, POR GOLPES. «Heaven on Earth» (lounge/chill †, 97 BPM) NO tiene un pulso constante: `rejilla.py` da un porcentaje bajo de golpes fuertes a ≤ 15 ms de una recta. Se corta sobre
 * los GOLPES MEDIDOS (`medir-pista.py`, ≥ 6 dB; `musica/golpes-025.json`) y se comprueba sobre el audio del render (`herramientas/golpes-render.py`, R33). La rejilla sale de `herramientas/buscar-cortes-lp.py` (la de la V8
 * reescrita para la estructura de Los Patios y VALIDADA contra la V4: con los planos de aquella devuelve exactamente sus cortes): con los rangos de los planos de esta pieza hay 315 soluciones y la elegida entra en el golpe
 * más fuerte (179,584 s, 15,8 dB). Todos los `en` salen de `golpe(...)`: mover la entrada de la música es cambiar `INICIO_MUSICA`.
 * LA CANCIÓN. Elegida por el usuario (2026-10-06) entre *Heaven on Earth*, *desolate (Slowed)* y *Overcoming the Impossible*, las únicas libres que dejaban una rejilla válida (se le mandaron los tres extractos).
 *
 * LA RESOLUCIÓN. La canción suena en una meseta de −13,7 LUFS (sin crescendo) y cae hacia los 207,5 s; con ebur128 en tramos de 5 s la caída cumple a los 209,5 s (−13,8 → −24,1 → silencio: 10,3 y 56 dB) y la pista
 * acaba a los 213,0 s. La toma del CTA entra en el golpe de 207,727 s (f847) y la caída cae dentro de ella (f901); el resto de la cola se apaga bajo la tarjeta.
 *
 * LAS DOS TOMAS SIN COLA (declarado; es del material, no de la mezcla). HK09 deja 0,52 s (15,6 f) tras su última palabra y MD11 deja 0,10 s (3 f): el plano siguiente tiene que cortar ahí. Tras el hook la música sube con fundido de
 * 13 f (lo que cabe hasta 2 f antes del golpe del f230, no los 24 de las otras versiones). Tras la mitad no cabe ninguno: el golpe del f634 suena con la música todavía abajo y sube justo después. Para que el hook y la mitad
 * tengan sitio, entran con un `desde` anterior al mínimo (la primera palabra suena 14,5 f y 11 f después del golpe, con la curva de la música ya acabada).
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(28)` = 28/30 s) para que imagen y voz corten en la MISMA muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS:
 * cada `en` es el fin del anterior.
 *
 * TRANSICIONES. Corte seco entre planos de recorrido (la cámara ya se mueve) y a la salida de las dos tomas de Isabella (no hay cola para otra cosa); disolvencia de 12 f al entrar Isabella en el hook y la mitad (que
 * acaba en un golpe) y a corte en el CTA (declarado arriba). Nada más.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal): Isabella no habla hasta que su imagen es opaca, y su primera palabra suena 14,5 f después.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la
 * prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-025.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-025";

export const FPS_025 = 30;

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
  /** `foto` solo para la tarjeta oscura del cierre (`c11-cierre`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella cuya voz entra con su imagen: el WAV de su voz, sin tratar. */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ: una ganancia por toma hasta este objetivo y nada más (R29). Las tres tomas miden −19,1 (HK09), −17,9 (MD11) y −19,1 LUFS (la 2.ª mitad de CT03) en su ventana de voz (`ebur128` sobre el WAV):
 * −21 es el objetivo de las ocho versiones anteriores y se mantiene para que el canal suene igual de fuerte. Las ganancias son −1,9 · −3,1 · −1,9 dB (los picos de −4,0, −1,1 y −2,1 dBFS bajan).
 */
export const OBJETIVO_LUFS = -21;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Heaven on Earth» — `Music/Heaven on Earth.mp3` (sha 8 `acd99178`), lounge / chill instrumental † (el género es el del catálogo: inferido, no oído), 3:33. Se entra en su golpe de 179,584 s (15,8 dB) y de ahí suena a
 * −13,7 LUFS de meseta, plana, hasta su caída final hacia los 207,5 s. Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir») en que entra cada plano,
 * con su fuerza en dB por 15 ms: `proyectos/025/musica/golpes-025.json` (`medir-pista.py --json`, ventana de 175 a 215 s). Salen de `buscar-cortes-lp.py`.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 0 (la casa, a corte). */
  apertura: { t: 179.584, db: 15.8 },
  /** La imagen de Isabella es opaca (la disolvencia acaba aquí); su primera palabra suena 14,5 f después. */
  hook: { t: 182.995, db: 9.2 },
  /** Acaba el hook (15 f tras su última palabra); el ventanal, a corte. */
  ventanal: { t: 187.159, db: 10.8 },
  /** El muro de bloques de vidrio. */
  bloques: { t: 189.49, db: 17.9 },
  /** El espacio abierto (RC07): el plano más largo del paseo. */
  abierto: { t: 191.962, db: 14.6 },
  /** Isabella entra (la disolvencia acaba aquí) con la mitad. */
  mitad: { t: 195.98, db: 10.2 },
  /** Acaba la mitad (3 f tras su última palabra): la alcoba, a corte. */
  alcoba: { t: 200.617, db: 15.5 },
  /** El deck. */
  deck: { t: 202.409, db: 10.7 },
  /** La vista: el edificio desde el aire (el plano más largo del bloque 5). */
  vista: { t: 204.287, db: 13.6 },
  /** Isabella entra (a corte) con el CTA: el último golpe antes de que la canción caiga dentro de su toma. */
  cta: { t: 207.727, db: 11.5 },
} as const;

/**
 * LA CAÍDA FINAL de la canción: la meseta (−13,7 LUFS) acaba hacia los 207,5 s; por potencia media «cae» entonces, pero en LUFS por tramos de 5 s el primer instante que cumple (≥ 9 dB a 5 s y ≥ 20 a 10 s) es
 * `t` = 209,5 s: ebur128 sobre `musica-025.wav` da −13,8 antes y −24,1 en los 5 s siguientes (10,3 dB); los 5 s tras ellos son silencio (la pista acaba a 213,0 s: 3,5 s después). No es un golpe sino un cambio de nivel:
 * la resolución de esta pieza. (`curva.py`: −11,9 → −17,8 → −22,3 → −27,4 → −33,7 → −39,3 dB de RMS de 1 s en 207-212 s; no se recupera.)
 */
export const DECAE = { t: 209.5, lufsAntes: -13.8, lufs5s: -24.1, lufs10s: -70 } as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: 50 ms antes del golpe de entrada (179,584 s), redondeado a un frame (5386/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 5386 / FPS_025;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte caiga en el
 * frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_025;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_025;

/** Isabella: un empuje lento hacia ella. El recorrido, quieto: la cámara ya avanza. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-025/${id}.mp4`;
const a = (id: string): string => `recorrido-025/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE de Luxur, la del 017 (revisión 7 de aquel): contraste con cuerpo, negros hundidos, luces recogidas, un punto cálido y +10 % de saturación. Orden del efecto: exposición → balance de blancos →
 * sombras/luces/blancos/negros → contraste → saturación → vibrance. `vibrance` ≤ 0,05 (sobre hormigón gris pinta un moteado de colores y vuelve rosadas las nubes) y las tomas de Isabella, `saturation` ≤ 1,06: la
 * piel se queda donde estaba. El AJUSTE de cada plano se mide (`herramientas/medir-color.py`), no se hereda: los de las versiones anteriores eran de otras ventanas de estos mismos clips.
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
  hook: golpe(GOLPE.hook), //         105 · Isabella es opaca (la disolvencia ocupa f93-105); su primera palabra, 14,5 f después
  ventanal: golpe(GOLPE.ventanal), // 230 · acaba el hook (15 f tras su última palabra); el ventanal, a corte
  bloques: golpe(GOLPE.bloques), //   300 · el muro de bloques de vidrio
  abierto: golpe(GOLPE.abierto), //   374 · el espacio abierto
  mitad: golpe(GOLPE.mitad), //       495 · Isabella en el espacio abierto (la disolvencia ocupa f483-495)
  alcoba: golpe(GOLPE.alcoba), //     634 · acaba la mitad (3 f tras su última palabra); la alcoba, a corte
  deck: golpe(GOLPE.deck), //         688 · el deck
  vista: golpe(GOLPE.vista), //       744 · el edificio desde el aire, el plano más largo del bloque 5 (103 f)
  cta: golpe(GOLPE.cta), //           847 · Isabella con el CTA (a corte)
} as const;

/**
 * Frames que dura la toma del CTA (CT03, 2.ª mitad): el clip dura 6,0 s (180 f) y desde `desde` (111 f = 3,70 s: la voz de la 1.ª mitad, «…3.550 millones,», acaba a los 3,56 s) le quedan 69. Su voz acaba a los 5,67 s
 * (f906 de la comp): 10 f (0,34 s) de su cara tras la última palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela.
 */
const DUR_CTA = 69;

/**
 * Dónde acaba la música (frame de la comp). La canción cae en el f901, dentro de la toma del CTA, y la pista acaba a los 213,0 s (f1005 de la comp, ya dentro de la tarjeta si durara más): la envolvente la lleva a cero
 * 2 f antes del final de la pieza, bajo la tarjeta.
 */
export const FIN_MUSICA_025 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje025: readonly Corte[] = [
  // ── Bloque 1 · la casa ──
  {
    id: "c01-fachada",
    bloque: 1,
    tipo: "video",
    src: v("rc23"),
    // RC23 «Exterior edificio2», del 0,00 al 3,50 s: desde el camino de entrada, la cámara mira hacia arriba por la fachada de ladrillo —los helechos colgando de la jardinera, la puerta de vidrio y el camino de grava— y sube hacia las plantas.
    // Ninguna versión la había usado. Entra a corte con el golpe de 15,8 dB (no nace de negro) y dura 3,5 s: el máximo de una apertura.
    desde: fr(0),
    en: 0,
    dur: P.hook,
    zoom: [1.0, 1.04],
    entra: "corte",
    color: color(),
    reason:
      "Camino de entrada (llegar): el edificio visto desde el suelo, con los helechos de la jardinera sobre la puerta de vidrio y la fachada de ladrillo; es el umbral de todo el paseo y entra con el golpe de apertura de la música. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia. Entra a corte: no nace de negro.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk09"),
    audio: a("hk09"),
    voz: {
      s0: 0.95,
      s1: 4.12,
      lufs: -19.1,
      dice: "Esta propiedad tiene sentido para un comprador muy específico.",
    },
    // La voz empieza a los 0,95 s (28,5 f) y acaba a los 4,12 s (123,6 f); el clip dura 4,63 s (139 f). `desde` 14 f (0,47 s) deja 14 f de clip por delante para la disolvencia (pide 12): su imagen es opaca en el golpe del f105
    // (que suena entero) y la primera palabra suena a los 14,5 f del golpe, con la curva de la música ya acabada. El clip llega a su último fotograma (14 + 125 = 139) en el golpe del f230, 15 f tras la última palabra: la música
    // sube con fundido de 13 f (lo que cabe), no de 24. Ella está junto al ventanal (columna de ladrillo, varilla verde en el piso), quieta, con las manos juntas.
    desde: fr(14),
    en: P.hook,
    dur: P.ventanal - P.hook,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ saturation: 1.02 }),
    reason:
      "Ventanal (el filtro): Isabella, junto al ventanal con la columna de ladrillo, dice «esta propiedad tiene sentido para un comprador muy específico»: descarta de entrada a quien no es, y la obra gris que se ve detrás es la prueba. Su imagen entra con una disolvencia desde la casa que acaba en un golpe de la música.",
  },
  // ── Bloque 3 · el paseo, sentido I: el ventanal, el muro de bloques y el espacio abierto ──
  {
    id: "c03-ventanal",
    bloque: 3,
    tipo: "video",
    src: v("rc04"),
    // RC04 «Vista ventana y Sala», del 3,00 al 5,33 s: la ventana de esquina con la ciudad, el sol sobre el piso y el pilar de ladrillo; la cámara se aleja del cristal hacia la pared de ladrillo. La V4 usó 0-2,23 s (el cielo): aquí no se comparte ni un fotograma.
    desde: fr(90),
    en: P.ventanal,
    dur: P.bloques - P.ventanal,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.28, shadows: 0.3, blacks: 0, highlights: -0.35, saturation: 1.0 }),
    reason:
      "Ventanal (seguir): la cámara sigue donde acaba Isabella, en la ventana de esquina con la ciudad y el sol sobre el piso, y se aleja del cristal hacia el interior; es el primer paso del paseo.",
  },
  {
    id: "c04-bloques",
    bloque: 3,
    tipo: "video",
    src: v("rc02"),
    // RC02 «Entrada apto y Sala», del 5,50 al 7,97 s: avance recto hacia el muro de bloques de vidrio, que se agranda y deja pasar la luz, con el ladrillo a la izquierda. La V4 usó 0-4,47 s (el pasillo antes de él) y la V1 9,8-13,6 s (la sala después).
    desde: fr(165),
    en: P.bloques,
    dur: P.abierto - P.bloques,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason:
      "Muro de bloques (la firma): la cámara avanza hacia el muro de bloques de vidrio, que se agranda y deja pasar la luz; es lo más reconocible del interior y la dirección es la del plano anterior (adelante).",
  },
  {
    id: "c05-abierto",
    bloque: 3,
    tipo: "video",
    src: v("rc07"),
    // RC07 «Vista Cocina y Comedor», del 7,00 al 11,03 s: el espacio abierto en obra gris —el concreto, el ladrillo al fondo y dos varillas en el piso—, avanzando despacio. La V1 usó 0,8-4,6 s y la V2 0-3,8 s (el ventanal, antes): este tramo es posterior y no se comparte.
    // Es el plano más largo del paseo (121 f) y acaba donde espera Isabella.
    desde: fr(210),
    en: P.abierto,
    dur: P.mitad - P.abierto,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "Espacio abierto (la medida): del muro de bloques al espacio abierto en obra gris, con el concreto, el ladrillo y las dos varillas en el piso; es lo que hay que definir y es el sitio donde acaba el paseo público y espera Isabella.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md11"),
    audio: a("md11"),
    voz: {
      s0: 1.0,
      s1: 5.16,
      lufs: -17.9,
      dice: "¿Alguien que valora la arquitectura y prefiere crear sus propios acabados?",
    },
    // La voz empieza a los 1,00 s (30 f) y acaba a los 5,16 s (154,8 f); el clip dura 5,27 s (158 f): deja 0,10 s (3 f) tras la última palabra, así que el plano siguiente corta ahí. `desde` 19 f (0,63 s) deja 19 f de clip para la
    // disolvencia (pide 12) y salta el chasquido del arranque (a los 0,05 s): su imagen es opaca en el golpe del f495 (suena entero) y la primera palabra suena a los 11 f. El clip llega a su último fotograma en el f634 (19 + 139 = 158).
    // POR CONFIRMAR AL OÍDO: «prefiere» (f574; 19,1 s del vídeo; whisper oye «prefiera», `formantes.py` mide una [e]) y el arranque «¿Alguien…» (f506; 16,9 s; no hay «eres» delante, medido): ver `subtitulos-025.ts`.
    desde: fr(19),
    en: P.mitad,
    dur: P.alcoba - P.mitad,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ saturation: 1.02 }),
    reason:
      "Espacio abierto (la pregunta): Isabella, en el hall con las vigas y la columna de ladrillo y la terraza al fondo, pregunta «¿alguien que valora la arquitectura y prefiere crear sus propios acabados?»: es la pregunta que selecciona al comprador y a la que contesta el CTA.",
  },
  // ── Bloque 5 · lo privado, el deck y la vista ──
  {
    id: "c07-alcoba",
    bloque: 5,
    tipo: "video",
    src: v("rc13"),
    // RC13 «Habitación Principal 2», del 9,00 al 10,80 s: en la alcoba de concreto, la cámara avanza hacia la ventana con las plantas al otro lado. La V3 usó 2,6-5,7 s (la puerta de vidrio) y la V4 10,93-15,37 s (el ventanal esquinero, justo después): no se comparte nada.
    desde: fr(270),
    en: P.alcoba,
    dur: P.deck - P.alcoba,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.36, shadows: 0.2, highlights: -0.38, saturation: 1.04 }),
    reason:
      "Alcoba (cómo se vive): tras la pregunta, el concreto de una alcoba y la ventana con las plantas al otro lado; es lo privado de la casa y lo que ella dice que cada uno define.",
  },
  {
    id: "c08-deck",
    bloque: 5,
    tipo: "video",
    src: v("rc10"),
    // RC10 «Patio y Piscina», del 2,00 al 3,87 s: el deck de madera frente al muro de ladrillo con la corrediza abierta y, al fondo, el espejo de agua que asoma. La V2 usó 4,0-8,37 s y la V5 8,4-11,83 s: este tramo es anterior y no se comparte.
    desde: fr(60),
    en: P.deck,
    dur: P.vista - P.deck,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.12, highlights: -0.3, saturation: 1.0 }),
    reason:
      "Deck (salir): de la alcoba al deck de madera, con el muro de ladrillo y la corrediza abierta; es la salida de lo privado al exterior y anuncia el patio donde espera Isabella.",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("dr153"),
    // DR153 (7,9 s), del 3,50 al 6,93 s: una órbita lenta sobre la corona del edificio, con la fachada de ladrillo y las terrazas con plantas y, a la derecha, las torres vecinas; no se ve la torre con malla negra (DR148-DR152). Ninguna versión la usó.
    // Es el plano más largo del bloque 5 (103 f): la recompensa antes del CTA. Entra a corte en un golpe de 13,6 dB.
    desde: fr(105),
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: [1.0, 1.04],
    entra: "corte",
    color: color({ exposure: 0.03, shadows: 0.2 }),
    reason:
      "El edificio desde el aire (la vista): el edificio entero con la fachada de ladrillo y las terrazas con plantas, orbitando despacio; es el clímax del paseo —lo que hay detrás de la obra gris— y entra a corte en un golpe, el plano más largo del bloque.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct03"),
    audio: a("ct03"),
    voz: {
      s0: 3.96,
      s1: 5.67,
      lufs: -19.1,
      dice: "Escríbeme y ven a conocerlo.",
    },
    // CT03 RECORTADA a su 2.ª mitad (decisión del usuario, 2026-10-06): la 1.ª, «Está disponible por 3.550 millones,», acaba a los 3,56 s del clip y la 2.ª empieza a los 3,96 s (0,40 s de silencio real). `desde` 111 f (3,70 s): entra
    // A CORTE en el golpe del f847 (suena entero: la música baja en los 7 f siguientes) y la primera palabra suena a los 7,8 f del golpe, con la curva ya acabada. Con 12 f de aire no cabe una disolvencia (12 f de clip antes de la palabra,
    // más la palabra). El clip llega a su último fotograma (111 + 69 = 180). La caída final de la canción (209,5 s) cae a los 54 f de la entrada (f901), ya dentro de la toma.
    // «escríbeme» (f855; 28,5 s) y «conocerlo» (f878-906; 29,3-30,2 s): cerradas por medida (varios cortes); whisper da conf. 0,05 al último token de la frase. Ver `subtitulos-025.ts`.
    desde: fr(111),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ saturation: 1.02, exposure: 0.18, shadows: 0.15 }),
    reason:
      "Patio (la invitación): Isabella, frente al muro de listones y la palma, dice «escríbeme y ven a conocerlo», una sola acción; el precio de la 1.ª mitad de la toma no suena, no se lee y no se ve. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-025.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-025/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_025 = P.cta + DUR_CTA + DUR_TARJETA;
