/**
 * EL RECORRIDO 020 — «Los Patios · apto 501», CUARTA VERSIÓN — los planos, como DATOS.
 *
 * El 017 fue la primera («La oportunidad», con «Time»), el 018 la segunda («el espacio y cómo entra el exterior», con «Return to
 * Oasis») y el 019 la tercera («altura sin torre», con «Flying Into the Sun»). Esta cambia lo que cambia el reel entero —OTRO HOOK
 * (HK03), OTRA MITAD (MD14), OTRO CTA (CT06), OTRO DRON (DR156), OTRA APERTURA (RC22, la calle) y OTRA CANCIÓN, de JAZZ («Sax for the
 * Last Customer», que pidió el usuario)— y mueve el dron al FINAL del paseo: no abre la pieza (V1, V2) ni sigue al hook (V3), sino que es
 * el último plano del bloque 5, la recompensa antes del CTA.
 *
 * LA IDEA: «lo que todavía puedes definir» (el ángulo D «Filtro» del catálogo con el reencuadre de la tesis A): el hook descarta al
 * comprador que busca algo terminado, la mitad le da la vuelta («no estás viendo un apartamento sin terminar, estás viendo uno que
 * todavía puedes definir») y el CTA invita a quien lo quiera como reto. Y las imágenes dicen lo mismo: la obra gris tal cual (pasillo,
 * espacio abierto, alcoba), el patio donde habla ella, el cielo y el edificio visto desde arriba.
 *
 *   hook   HK03  INT-BLOQUES  «Si estás buscando un apartamento totalmente terminado, este probablemente no es para ti.»
 *   mitad  MD14  PATIO        «No estás viendo un apartamento sin terminar, estás viendo uno que todavía puedes definir.»
 *   CTA    CT06  INT-ABIERTO  «Si es el reto, escríbeme y agendamos una visita.»
 *
 * Tres sitios distintos y ninguna cifra.
 *
 *   bloque 1  c01                  la calle y la entrada del edificio (RC22), SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia
 *   bloque 2  c02                  Isabella en la sala del muro de bloques: el hook (su toma tiene aire: entra con una disolvencia que acaba en un golpe)
 *   bloque 3  c03 c04 c05          el paseo, sentido I (entrada → terraza): el pasillo (RC02), el espacio abierto (RC05) y el patio (RC09)
 *   bloque 4  c06                  Isabella en el patio: la mitad (acaba retrocediendo hacia el interior: la salida del patio)
 *   bloque 5  c07 c08 c09          adentro otra vez: la alcoba y su ventanal (RC13), el cielo desde la ventana (RC04, el golpe más corto del paseo) y el dron (DR156): el plano más largo
 *   bloque 6  c10 c11              Isabella en el espacio abierto, que cruza el umbral hacia el deck: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * LECTURA DEL PASEO (declarada). La casa es una línea: la entrada y la sala de bloques en un extremo, el espacio abierto en medio y el
 * deck y el patio en el otro. El hook, que es la promesa, está en la sala; el paseo del bloque 3 va de ahí a la terraza y acaba donde
 * acaba el paseo público, el patio (ahí habla ella); el bloque 5 entra en lo privado desde el patio (la alcoba abre al deck) y sube a
 * la vista; y el CTA, en el espacio abierto, cruza el umbral hacia el deck. No hay un retroceso de plano a plano: sí lo hay entre el patio
 * y el CTA, y está declarado en `artefactos/01-plan.md`.
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA, POR GOLPES. «Sax for the Last Customer» (jazz, saxofón) NO tiene un pulso constante: `rejilla.py`
 * da solo el 46 % de sus golpes fuertes a ≤ 15 ms de la mejor recta (0,371 s) y un desvío de 79,7 ms, frente al 89 % a 10 ms de «Return
 * to Oasis». Va a golpes de nota, uno cada 0,35-0,55 s, y a veces tras un silencio casi total. Así que no hay recta: son los GOLPES
 * MEDIDOS (`medir-pista.py`, ≥ 6 dB) y cada plano entra en uno. Los cortes SECOS caen en golpes de 14-26 dB y se comprueban sobre el
 * audio del render (`herramientas/golpes-render.py`: un golpe medido en la canción puede quedar tapado por la voz o por el ducking).
 * Todos los `en` salen de `golpe(...)`: mover la entrada de la música es cambiar `INICIO_MUSICA`.
 *
 * LA RESOLUCIÓN. A diferencia de las de las V2 y V3, esta canción no cae a un lecho suave donde entra el CTA: es una pista plana que
 * suena a −13 LUFS hasta el final y acaba en SECO, con un acorde de 20,9 dB en 176,986 s que se sostiene 0,3 s y deja una cola de 2 s.
 * Entrando en 137,6 s ese acorde cae en el frame 1183: la última palabra del CTA acaba en el 1177 y el acorde contesta 6 f después,
 * mientras la imagen funde a negro; la cola se apaga bajo la tarjeta. Esa es la resolución, y la que pide el formato («el piano se apaga
 * desde que acaba la toma»), con el saxofón.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(28)` = 28/30 s) para que imagen y voz
 * corten en la MISMA muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS: cada `en` es el fin del anterior.
 *
 * TRANSICIONES. Corte seco entre planos de recorrido (la cámara ya se mueve) y al salir de Isabella en el hook (no deja los 14 f que pide
 * una disolvencia tras su última palabra: 8 f); disolvencia de 12 f al entrar Isabella cuando se puede (el hook, la mitad y el CTA) y al
 * salir de la mitad hacia la alcoba (MD14 acaba retrocediendo hacia el interior y el plano siguiente empieza dentro). Nada más.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal): Isabella no habla hasta que su imagen es opaca, y el
 * hook empieza 1 f después de que lo sea.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su
 * toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la prueba se hace a
 * escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-020.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-020";

export const FPS_020 = 30;

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
 * EL NIVEL DE LA VOZ: una ganancia por toma hasta este objetivo y nada más (R29). Las tres tomas miden −24,2 (HK03), −18,5 (MD14)
 * y −16,0 LUFS (CT06) en su ventana de voz: −21 es el objetivo de las tres versiones anteriores y se mantiene para que las cuatro
 * suenen igual de fuertes. La mayor ganancia es la de HK03, +3,2 dB (su pico de −6,0 pasa a −2,9 dBTP); la menor, −5,0 dB sobre CT06
 * (su pico de −0,4 baja a −5,4 dBTP).
 */
export const OBJETIVO_LUFS = -21;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Sax for the Last Customer» — `Music/Sax for the Last Customer.mp3` (sha 8 `7a1c2932`), La menor, jazz / smooth jazz con saxofón (el
 * género es el del catálogo: inferido, no oído), 179,73 s. Se entra en su golpe de 137,645 s (33,7 dB), el más fuerte de la pista, justo
 * tras un descenso a ≈ −45 dB en la banda de 80-3000 Hz: de ahí suena −13 LUFS plano, con golpes de nota cada 0,35-0,55 s (el saxofón y el
 * cuerpo), un respiro a ≈ −27 dB hacia los 158,5-160,5 s (f 630-676: cae bajo la voz de la mitad) y el acorde final en 176,986 s
 * (`buscar-entrada.py`, `medir-pista.py`, `rejilla.py`).
 *
 * SIN PULSO: se probó una peineta de periodos de 0,25 a 1,30 s sobre los golpes de 137,6 a 176 s y la mejor recta (0,371 s, 161,7 BPM)
 * deja solo el 46 % de los golpes fuertes a ≤ 15 ms de ella (desvío medio de 79,7 ms). Es un swing tocado, no una máquina.
 * Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir») en que
 * entra cada plano, con su fuerza en dB por 15 ms.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 0 (la nota que vuelve tras el descenso). */
  apertura: { t: 137.645, db: 33.7 },
  /** La imagen de Isabella es opaca (la disolvencia acaba aquí) y su primera palabra suena 1 f después. */
  hook: { t: 140.067, db: 18.0 },
  /** Acaba el hook; el pasillo, a corte. */
  pasillo: { t: 145.629, db: 18.1 },
  /** El espacio abierto. */
  abierto: { t: 150.087, db: 18.9 },
  /** El patio: llega al deck. */
  patio: { t: 152.859, db: 23.9 },
  /** Isabella entra (la disolvencia acaba aquí) con la mitad. */
  mitad: { t: 156.384, db: 23.0 },
  /** Acaba la mitad: ella retrocede hacia dentro y la alcoba entra con una disolvencia que acaba en este golpe. */
  alcoba: { t: 162.142, db: 25.7 },
  /** El cielo desde la ventana. */
  cielo: { t: 166.587, db: 21.1 },
  /** El dron: sube por los jardines del edificio. */
  dron: { t: 168.822, db: 14.7 },
  /** Isabella entra (la disolvencia acaba aquí) con el CTA. */
  cta: { t: 173.838, db: 15.9 },
  /** EL ACORDE FINAL de la canción (20,9 dB): la resolución. Cae 6 f después de la última palabra del CTA. */
  acorde: { t: 176.986, db: 20.9 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: 45 ms antes del golpe de entrada (el colchón de `entra: 1` en
 * audio-020.ts), redondeado a un frame (4128/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 4128 / FPS_020;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre
 * la prueba 720p y el WAV (y confirmado en el 017, el 018 y el 019). Se suma aquí y en la puerta para que el corte caiga en el
 * frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_020;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_020;

/** Isabella: un empuje lento hacia ella. El recorrido, quieto: la cámara ya avanza. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-020/${id}.mp4`;
const a = (id: string): string => `recorrido-020/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE de Luxur, la del 017 (revisión 7 de aquel): contraste con cuerpo, negros hundidos, luces recogidas, un
 * punto cálido y +10 % de saturación. Orden del efecto: exposición → balance de blancos → sombras/luces/blancos/
 * negros → contraste → saturación → vibrance. `vibrance` ≤ 0,05 (sobre hormigón gris pinta un moteado de colores y
 * vuelve rosadas las nubes) y las tomas de Isabella, `saturation` ≤ 1,06: la piel se queda donde estaba.
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
 * El frame de cada cambio de plano: el del golpe de la canción en que entra (arriba). Todos los cortes SECOS caen en un golpe medido de
 * ≥ 14 dB, y se comprobaron sobre el audio del render.
 */
const P = {
  hook: golpe(GOLPE.hook), //         76 · Isabella es opaca (la disolvencia ocupa f64-76); su voz, 1 f después
  pasillo: golpe(GOLPE.pasillo), //  242 · acaba el hook; el pasillo, a corte
  abierto: golpe(GOLPE.abierto), //  376 · el espacio abierto
  patio: golpe(GOLPE.patio), //      459 · el patio
  mitad: golpe(GOLPE.mitad), //      565 · Isabella en el patio (la disolvencia ocupa f553-565)
  alcoba: golpe(GOLPE.alcoba), //    738 · acaba la mitad; la alcoba entra con una disolvencia (f726-738)
  cielo: golpe(GOLPE.cielo), //      871 · el cielo desde la ventana
  dron: golpe(GOLPE.dron), //        938 · el dron, el plano más largo del bloque 5 (151 f)
  cta: golpe(GOLPE.cta), //         1089 · Isabella con el CTA (la disolvencia ocupa f1077-1089)
} as const;

/**
 * Frames que dura la toma del CTA (CT06): el clip dura 4,47 s (134 f) y su voz acaba a los 3,70 s; desde `desde` (23 f) le quedan
 * 111 f. La última palabra suena en f1177 y esta toma llega a f1193: 16 f (0,5 s) de su cara tras ella, en los que la imagen funde a
 * negro y suena el acorde final de la canción (f1183). Nada se congela.
 */
const DUR_CTA = 104;

/**
 * Dónde acaba la música (frame de la comp). La cola del acorde final muere sola hacia los 179,1 s de la canción (f1246): la envolvente
 * la lleva a cero 2 f antes del final de la pieza, por si el render se alarga.
 */
export const FIN_MUSICA_020 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje020: readonly Corte[] = [
  // ── Bloque 1 · la casa ──
  {
    id: "c01-calle",
    bloque: 1,
    tipo: "video",
    src: v("rc22"),
    // RC22 «Exterior edificio», del 3,9 al 6,43 s: la cámara, desde el camino de entrada, se inclina hacia arriba y sube por la fachada de ladrillo
    // (el rótulo «PATIOS» abajo a la izquierda, entre las plantas) hasta una columna blanca y las terrazas con plantas y el cielo. Es la apertura
    // que pidió la V3 para una V4 («que abra por la calle») y no ha salido en ninguna versión. Entra a corte (no nace de negro) con el golpe de 33,7 dB.
    desde: fr(117),
    en: 0,
    dur: P.hook,
    zoom: [1.0, 1.04],
    entra: "corte",
    color: color({ exposure: -0.1, highlights: -0.3, whites: -0.1, shadows: 0.12, contrast: 1.12, saturation: 1.1, temperature: -0.01 }),
    reason:
      "Calle (llegar): el edificio visto desde el camino de entrada, con el rótulo entre las plantas y la cámara subiendo por la fachada hacia las terrazas con jardín; es el umbral de todo el paseo y entra con el golpe de apertura de la música. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia. Entra a corte: no nace de negro.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk03"),
    audio: a("hk03"),
    voz: {
      s0: 0.81,
      s1: 6.04,
      lufs: -24.15,
      dice: "Si estás buscando un apartamento totalmente terminado, este probablemente no es para ti.",
    },
    // La voz empieza a los 0,81 s (24,3 f): `desde` es 3 f antes (21 = 0,70 s), con 21 f de clip por delante para la disolvencia (pide 12), de modo que su
    // imagen es opaca en el golpe del f76 (que suena entero) y la primera palabra suena en el 79, con la música ya abajo. Tras su última palabra (f236) solo quedan 12 f de clip
    // (0,40 s): se sale a corte, en el golpe del f242 (una disolvencia pide 14 f).
    desde: fr(21),
    en: P.hook,
    dur: P.pasillo - P.hook,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ exposure: 0.05, shadows: 0.12, saturation: 1.03, temperature: -0.01 }),
    reason:
      "Sala de bloques (el filtro): Isabella, en la sala del muro de bloques de vidrio con la ventana al valle, se acerca caminando y dice «si estás buscando un apartamento totalmente terminado, este probablemente no es para ti»: descarta al comprador que no es, y la obra gris que se ve detrás es la prueba. Su imagen entra con una disolvencia desde la calle que acaba en un golpe de la música.",
  },
  // ── Bloque 3 · el paseo, sentido I: el pasillo, el espacio abierto y el patio ──
  {
    id: "c03-pasillo",
    bloque: 3,
    tipo: "video",
    src: v("rc02"),
    // RC02 «Entrada apto y Sala», del 0,0 al 4,47 s: desde la puerta abierta a la derecha, el pasillo estrecho de ladrillo avanza hacia el muro de bloques de vidrio, que se
    // agranda hasta llenar el fondo. La V1 usó 9,8-13,6 s (la sala, después del giro): aquí no se comparte ni un fotograma.
    desde: fr(0),
    en: P.pasillo,
    dur: P.abierto - P.pasillo,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0, shadows: 0.15, highlights: -0.3, saturation: 1.08 }),
    reason:
      "Pasillo (el umbral): de la puerta abierta al muro de bloques de vidrio, la cámara avanza por el pasillo estrecho de ladrillo; es el paseo que empieza donde Isabella acaba de hablar y lleva a la sala. Obra gris tal cual: concreto, ladrillo y la luz que atraviesa los bloques.",
  },
  {
    id: "c04-abierto",
    bloque: 3,
    tipo: "video",
    src: v("rc05"),
    // RC05 «Cocina», del 0,0 al 2,77 s: avance recto por el espacio abierto, con el muro de ladrillo a la izquierda y los ventanales al fondo. La V2 usó 3,2-5,9 s (las columnas y la
    // corrediza, más adelante): esta ventana es la entrada al espacio y no se comparte.
    desde: fr(0),
    en: P.abierto,
    dur: P.patio - P.abierto,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0, shadows: 0.15, highlights: -0.3, saturation: 1.08 }),
    reason:
      "Espacio abierto (la medida): del pasillo a la zona social, la cámara sigue adelante por un espacio largo con vigas, muro de ladrillo y ventanales al fondo; en obra gris se ve lo que hay que definir, y la dirección es la del plano anterior (adelante → adelante).",
  },
  {
    id: "c05-patio",
    bloque: 3,
    tipo: "video",
    src: v("rc09"),
    // RC09 «Patio y Naturaleza 2», del 0,0 al 3,53 s: el deck frente al muro de ladrillo con la corrediza abierta, bajo el techo de madera; la cámara gira a la derecha y asoma el
    // muro de listones con la palma. La V3 usó 4,6-12,6 s (lo que viene después): no se comparte nada.
    desde: fr(0),
    en: P.patio,
    dur: P.mitad - P.patio,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0, shadows: 0.22, highlights: -0.42, whites: -0.14, saturation: 1.04, temperature: -0.02 }),
    reason:
      "Patio (el paseo llega fuera): del espacio abierto se sale al deck de madera, con el muro de ladrillo y la corrediza detrás y el techo de madera arriba; es donde acaba el paseo público y donde espera Isabella, y es el contraste con la obra gris de dentro.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md14"),
    audio: a("md14"),
    voz: {
      s0: 0.57,
      s1: 5.77,
      lufs: -18.51,
      dice: "No estás viendo un apartamento sin terminar, estás viendo uno que todavía puedes definir.",
    },
    // La voz empieza a los 0,57 s (17,1 f): `desde` es 2 f antes (15 = 0,50 s), con 15 f de clip por delante para la disolvencia (pide 12): su imagen es opaca en el golpe del
    // f565 (que suena entero) y la primera palabra suena en el 567. Tras su última palabra (f723) quedan 23 f de clip: el plano siguiente entra con una disolvencia (f726-738) que no pisa su voz.
    desde: fr(15),
    en: P.mitad,
    dur: P.alcoba - P.mitad,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ exposure: 0.15, shadows: 0.12, saturation: 1.03 }),
    reason:
      "Patio (el reencuadre): Isabella camina hacia la cámara por el patio, con el muro de listones y la palma detrás, y dice «no estás viendo un apartamento sin terminar, estás viendo uno que todavía puedes definir»: da la vuelta a lo que acaba de enseñar la obra gris. Al final la cámara retrocede hacia el interior, y por ahí sigue el paseo.",
  },
  // ── Bloque 5 · adentro otra vez: la alcoba, el cielo desde la ventana y el dron ──
  {
    id: "c07-alcoba",
    bloque: 5,
    tipo: "video",
    src: v("rc13"),
    // RC13 «Habitación Principal 2», del 10,93 al 15,37 s (hasta el último fotograma del clip): en la alcoba de concreto, la cámara se acerca al ventanal esquinero, con las jardineras al otro lado y
    // la luz entrando. La V3 usó 2,6-5,7 s (el umbral de la puerta de vidrio, antes): no se comparte nada. Entra con una disolvencia desde Isabella, que retrocede hacia dentro (necesita 12 f de clip
    // antes de `desde`: tiene 328).
    desde: fr(328),
    en: P.alcoba,
    dur: P.cielo - P.alcoba,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.15, shadows: 0.32, highlights: -0.4, whites: -0.12, blacks: 0, contrast: 1.04, saturation: 1.08 }),
    reason:
      "Alcoba (el lienzo): Isabella acaba retrocediendo hacia el interior y el plano siguiente ya está dentro: la alcoba de concreto, con la cámara acercándose al ventanal esquinero, las jardineras y la luz del otro lado; es lo privado de la casa y la prueba de que «sin terminar» es espacio para definir.",
  },
  {
    id: "c08-cielo",
    bloque: 5,
    tipo: "video",
    src: v("rc04"),
    // RC04 «Vista ventana y Sala», del 0,0 al 2,23 s: la vista desde el ventanal, con el valle, las montañas y un cielo de nubes. Se corta ANTES de que la cámara baje por el marco negro de la
    // ventana (hacia los 2,5 s): el primer intento llegaba hasta los 2,97 s y el empalme con el dron saltaba +32 de luma. Es el mejor cielo del material y ninguna versión lo ha usado.
    desde: fr(0),
    en: P.cielo,
    dur: P.dron - P.cielo,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05, highlights: -0.5, whites: -0.2, shadows: 0.1, saturation: 1.08 }),
    reason:
      "Ventanal (la vista): de la alcoba al ventanal y, a través de él, el valle, las montañas y las nubes; es lo que se ve desde la casa y lo que sube la mirada hacia el edificio entero del plano siguiente. Dura lo que dura el cielo limpio (2,2 s): el siguiente golpe de la canción lo corta antes de que la cámara baje por el marco.",
  },
  {
    id: "c09-dron",
    bloque: 5,
    tipo: "video",
    src: v("dr156"),
    // DR156, del 0,5 al 5,53 s: el dron sube despacio por los jardines colgantes del edificio, con los pilares blancos, el techo de madera y las plantas de cada nivel; no se ve la torre
    // vecina con malla negra (DR148-DR152). Es el plano más largo del bloque (151 f): la recompensa antes del CTA. Entra a corte en un golpe. El catálogo pide cortar antes de los 22 s (una persona
    // en una terraza al final): aquí solo se usan los primeros 5,5 s.
    desde: fr(15),
    en: P.dron,
    dur: P.cta - P.dron,
    zoom: [1.0, 1.04],
    entra: "corte",
    color: color({ exposure: 0.1, contrast: 1.06, highlights: -0.35, whites: -0.1, shadows: 0.3, blacks: 0.02, saturation: 1.04 }),
    reason:
      "Dron (la recompensa): el edificio entero desde fuera, subiendo despacio por los jardines colgantes, el techo de madera y las terrazas con plantas de cada nivel; es el clímax del paseo —lo que hay detrás de la obra gris— y entra a corte en un golpe, el plano más largo del bloque.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct06"),
    audio: a("ct06"),
    voz: {
      s0: 0.86,
      s1: 3.7,
      lufs: -16.03,
      dice: "Si es el reto, escríbeme y agendamos una visita.",
    },
    // Su voz empieza a los 0,86 s (25,8 f): `desde` es 3 f antes (23 = 0,767 s), con 23 f de clip por delante para la disolvencia (pide 12). Le quedan 111 f desde `desde` y se usan 104:
    // la última palabra suena en f1177 y le quedan 16 f (0,5 s) de cara antes de que la imagen funda a negro y llegue a la tarjeta.
    // POR CONFIRMAR AL OÍDO: «reto» (whisper-small oye «resto»; medida acústica: sin /s/ en esa ventana).
    desde: fr(23),
    en: P.cta,
    dur: DUR_CTA,
    zoom: [1.0, 1.03],
    entra: "disolver",
    color: color({ exposure: 0, highlights: -0.3, saturation: 1.03 }),
    reason:
      "Espacio abierto (la invitación): Isabella camina hacia la cámara desde el fondo del espacio abierto y la cámara retrocede cruzando el umbral hasta dejarla en el deck; dice «si es el reto, escríbeme y agendamos una visita», una sola acción, y su imagen entra en un golpe y funde a negro mientras suena el acorde final de la canción.",
  },
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-020/cierre-oscuro.png",
    en: P.cta + DUR_CTA,
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo de Propiedades Luxur y la web mientras la cola del acorde final de la canción se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta. */
export const DURACION_020 = P.cta + DUR_CTA + DUR_TARJETA;
