/**
 * EL RECORRIDO 048 — «Tierra Grata Bosque Santo (El Poblado, ARRIENDO)», V30 del registro y cuarta de las seis piezas del arriendo (045-050), «CHEF Y EXPERIENCIAS» — los planos, como DATOS.
 *
 * Encargo (2026-10-19, coordinadora de las seis sesiones; reparto FIJO en `proyectos/044/reparto-045-050.md`): el acompañamiento personalizado que Isabella grabó el 17-oct, en su ángulo del servicio
 * (aseo semanal → chef privado, tours, masajes, transporte → «cuando llegas a una ciudad que no es la tuya…»). ABRE CON EL HOOK.
 *
 *   hook   HK01  «El tiempo es el activo más valioso de los seres humanos y te ayudamos a optimizarlo incluyendo un aseo semanal.»                    (la repite la V27)
 *   mitad  MD03  «Contamos con chef privado, tours, masajes y transporte y las mejores experiencias de la ciudad de Medellín.»                       (la repite la V28)
 *   CTA    CT03  «Cuando llegas a una ciudad que no es la tuya, el acompañamiento personalizado es una plusvalía que vale la pena conocer.»         (la repite la V29; no es una acción: la tarjeta con el logo y la web cierra)
 *
 * LA IDEA EN UNA LÍNEA. Esta unidad es PARA QUIEN LLEGA A UNA CIUDAD QUE NO ES LA SUYA Y NO QUIERE PERDER SU TIEMPO: Isabella lo promete desde el primer segundo (el tiempo es lo más valioso, y le quitamos el aseo), el paseo
 * enseña la unidad (la Social Kitchen, el gimnasio, el carril de nado), ella lista lo que hay detrás del servicio (chef privado, tours, masajes, transporte), el apartamento se ve por dentro (la alcoba, el baño) y el balcón
 * remata con el JACUZZI PRIVADO, y el CTA cierra con la idea («el acompañamiento personalizado es una plusvalía que vale la pena conocer») y la tarjeta. Ninguna cifra en pantalla ni en voz (la ficha va en el caption y en la
 * versión con ficha); lo que NO consta no se afirma: administración, contrato, qué se paga aparte.
 *
 *   bloque 2  c01                  Isabella camina hacia cámara por la terraza común bajo la pérgola, con la ciudad detrás: el hook, A CORTE desde el frame 0 (excepción declarada, abajo)
 *   bloque 3  c02 c03 c04          la unidad: la Social Kitchen (RC11) → el gimnasio (RC14) → el carril de nado (RC16); todos giran a la derecha
 *   bloque 4  c05                  Isabella otra vez en la terraza común, caminando bajo la pérgola: la mitad (a corte en un golpe)
 *   bloque 5  c06 c07 c08          el apartamento: la alcoba (RC05) → el baño (RC09) → EL BALCÓN, del cielo y la ciudad al JACUZZI PRIVADO (RC10, 5,6 s, el plano más largo y el clímax)
 *   bloque 6  c09 c10              Isabella en las escaleras con césped, con el edificio detrás: el CTA (a corte en un golpe); y la tarjeta oscura del cierre (nada se congela)
 *
 * LA PRIMERA TOMA, EXCEPCIÓN DECLARADA. La regla fija del canal es «la primera toma sale sin texto ni voz» y esta pieza la ROMPE a propósito, por encargo del usuario (como el 021): el frame 0 es Isabella, no la casa. Su
 * voz empieza en el f30 (1,00 s; antes hay 1 s de aire) y su primer subtítulo entra con ella; la música abre con una nota en el f3 (suena entera) y baja con curva de coseno ANTES de su primera palabra.
 *
 * LECTURA DEL PASEO (declarada). Isabella habla dos veces en la terraza común (el hook y la mitad: el rodaje del 17-oct no tiene otro sitio) y la tercera en las escaleras. La unidad se recorre en el orden en que se rodó
 * (Social Kitchen → gimnasio → carril de nado) y desemboca en la terraza de la mitad; de ahí se pasa al apartamento: la alcoba y el baño (el ala de las alcobas), y el balcón al que se sale desde la sala, que es donde
 * está el jacuzzi privado. La sala no entra: en el 9:16 recortado al centro de su plano horizontal solo queda techo (RC02) y las demás son aperturas o clímax de otras piezas (RC01, RC04, RC20). Se salta el espacio, no se
 * inventa el orden. Las vistas de la ciudad: la terraza común sale en el hook y la mitad (no se puede evitar: es donde habla); la vista ENTERA, hasta el balcón del clímax.
 *
 * EL JACUZZI PRIVADO ESTÁ EN RC10. El catálogo (§6) decía que no aparecía en ningún clip y que RC10 acababa en «el deck de madera con la banca y la pérgola (terraza común)»: es el JACUZZI PRIVADO del balcón (la foto
 * `3-Jacuzzi.png`: la tina cuadrada con los listones de madera, el escalón de madera, la baldosa negra, la baranda de vidrio y la losa que cubre el balcón). Esta pieza lo enseña en los últimos 2,6 s del clímax.
 *
 * EL RECORRIDO ES HORIZONTAL. Los siete planos de recorrido son 1920×1080 recortados al centro (`crop=608:1080:X:0`, `normalizar.mjs`) y escalados ×2,13: salen más BLANDOS que Isabella (4K). Es el material; no se
 * filtra ni se afila (R22). RC10 va recortado a X=1100 para que el jacuzzi quede dentro del encuadre (con el centro se quedaba en el borde).
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA, POR GOLPES. «Einaudi Fly» es un piano de arpegios y SIN pulso fijo (la rejilla no sirve): los golpes son los MEDIDOS (`medir-pista.py`, ≥ 6 dB) y cada corte seco cae en uno, de 6,5 a 11,9 dB
 * (un piano no golpea: son notas). Las DISOLVENCIAS van libres: al salir y entrar Isabella y entre la alcoba y el balcón. Se entra en el 222,2 s de la canción porque su final natural cae donde entra el CTA: el piano decae
 * de −18 a −33 LUFS entre el 261,2 y el 264 s, que son los f1170-1255 de esta pieza, bajo la voz del CTA; la tarjeta queda en silencio (el registro de uso decía «sin caída»: era otra ventana).
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(11)` = 11/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la prueba se hace
 * a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-048.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-048";

export const FPS_048 = 30;

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
  /** `foto` solo para la tarjeta oscura del cierre (`c10-cierre`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella: el WAV de su voz TRATADA (`<toma>-voz.wav`, `normalizar.mjs`). */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido del usuario desde la V9: «mientras habla Isabella sube los decibeles sin saturar»). Las voces crudas llegan a −21,7 · −20,2 · −20,5 LUFS en su ventana de voz; cada
 * una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` —+18,0 · +17,9 · +17,4 dB— y limitador a −2,5 dBFS) hasta
 * ≈ −15 LUFS con el pico real a −2,5 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Ludovico Einaudi - Einaudi Fly» — `archivos/musica/Ludovico Einaudi - Einaudi Fly.mp3` (sha 8 `a7e0695e`), piano neoclásico en Do# menor, ~112 BPM, 4:41. Se entra en el 222,2 s (una nota de 8,1 dB en el 222,259 s, el
 * f3) y se suena hasta el 263 s: de ahí se oye la parte alta de la pieza (de −12 a −14 LUFS, con un pico de −0,6 dBFS hacia el 233 s) y, entre el 261,2 y el 264 s, su final: el piano decae de −18 a −33 LUFS y queda un lecho
 * de −35. Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir») en que entra cada plano, con su fuerza en dB por 15 ms:
 * `proyectos/048/musica/golpes-048.json` (`medir-pista.py --desde 222 --dur 45 --json`).
 */
export const GOLPE = {
  /** La primera nota que suena: el f3 (el frame 0 es Isabella; la música baja con curva antes de su primera palabra, f30). */
  apertura: { t: 222.259, db: 8.1 },
  /** El gimnasio, a corte: el más débil de los cortes (6,5 dB); entre las notas medidas no hay otra a ≤ 4 s que dé un plano de la duración que pide. */
  gimnasio: { t: 232.433, db: 6.5 },
  /** El carril de nado, a corte. */
  piscina: { t: 236.163, db: 7.9 },
  /** Isabella entra A CORTE con la mitad; su primera sílaba suena 10 f después. */
  mitad: { t: 240.52, db: 8.7 },
  /** El baño, a corte (tras la alcoba). */
  bano: { t: 250.563, db: 9.1 },
  /** Isabella entra A CORTE con el CTA; su primera sílaba suena 10 f después. El piano empieza a decaer 29 f más tarde. */
  cta: { t: 260.192, db: 11.9 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: 100 ms antes del f3, redondeado a un frame (6666/30 = 222,2 s) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 6666 / FPS_048;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_048;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_048;

/** Isabella camina hacia cámara: un empuje lento la acompaña. El recorrido, quieto: la cámara ya se mueve (y está recortado: nada de ampliarlo más). */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-048/${id}.mp4`;
const a = (id: string): string => `recorrido-048/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE del canal (la del 017): contraste con cuerpo, negros hundidos, luces recogidas, un punto cálido y +10 % de saturación. Orden del efecto: exposición → balance de blancos → sombras/luces/blancos/negros → contraste →
 * saturación → vibrance. `vibrance` ≤ 0,05 (sobre hormigón gris pinta un moteado de colores y vuelve rosadas las nubes) y las tomas de Isabella, `saturation` ≤ 1,06: la piel se queda donde estaba. El AJUSTE de cada plano se
 * mide (`herramientas/medir-color.py`), no se hereda.
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
 * El frame de cada cambio de plano. Los cortes SECOS y las entradas de Isabella a corte caen en el golpe de la canción que dice arriba; los cambios por DISOLVENCIA (salida del hook, salida de la mitad, entrada del balcón) no
 * piden golpe: con un piano van libres, y cada uno cae donde la última palabra de ella deja sitio (hook, mitad) o donde el plano anterior ya ha dicho lo que tenía que decir (el baño).
 */
const P = {
  gimnasio: golpe(GOLPE.gimnasio), //  309 · el gimnasio (corte)
  piscina: golpe(GOLPE.piscina), //     421 · el carril de nado (corte)
  mitad: golpe(GOLPE.mitad), //         551 · Isabella entra A CORTE con la mitad; su primera palabra, 10 f después
  bano: golpe(GOLPE.bano), //           853 · el baño (corte)
  cta: golpe(GOLPE.cta), //            1141 · Isabella entra A CORTE con el CTA; su primera palabra, 10 f después
} as const;

/** El hook usa su toma desde el f0: su última palabra suena en f198 y la cocina entra con una disolvencia (f200-212) que no la pisa (se piden 14: 2 de margen + los 12 de la disolvencia). */
const FIN_HOOK = 212;
/** La cocina (c02) llega al golpe del gimnasio. */
const FIN_MITAD = 755; //   la mitad (MD03): su última palabra suena en f741 y la alcoba entra con una disolvencia (f743-755).
const ENTRA_BALCON = 972; // la alcoba y el baño: el baño dura hasta que el balcón disuelve (f960-972).

/**
 * Frames que dura la toma del CTA: el clip dura 6,67 s (200 f) y desde `desde` (9 f) le quedan 191. Su voz va de 0,62 a 6,04 s (f1151-1313 de la comp): se usan 186 f, 14 (0,47 s) de su cara tras la última palabra, en los que
 * la imagen funde a negro (los últimos 6). Nada se congela: el plano acaba antes del último fotograma del clip.
 */
const DUR_CTA = 186;

/**
 * Dónde acaba la música (frame de la comp). Tras el final natural del piano (decae hacia el f1255 y queda un lecho de −35 LUFS) la envolvente lo lleva a cero 2 f antes del final de la pieza, bajo la tarjeta.
 */
export const FIN_MUSICA_048 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje048: readonly Corte[] = [
  // ── Bloque 2 · el hook (abre la pieza) ──
  {
    id: "c01-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk01"),
    audio: a("hk01-voz"),
    voz: {
      s0: 1.0,
      s1: 6.6,
      lufs: -15.1,
      dice: "El tiempo es el activo más valioso de los seres humanos y te ayudamos a optimizarlo incluyendo un aseo semanal.",
    },
    // EXCEPCIÓN DECLARADA (por encargo del usuario, como el 021): el reel ABRE con Isabella, en el frame 0, a corte. La regla fija «la primera toma sin texto ni voz» no se cumple en esta pieza.
    // La toma entera desde `desde` 0: Isabella camina hacia cámara bajo la pérgola con la ciudad detrás; la voz empieza a los 1,00 s (f30: hay 1 s de aire; whisper la ponía en 0,0) y acaba a los 6,60 s (f198). El clip dura
    // 7,50 s (225 f): el plano llega a f212 (7,07 s) y la cocina entra con una disolvencia (f200-212) que no pisa su voz. La música abre con una nota en el f3 y baja con curva antes de la primera palabra.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-048.ts`): «aseo» (whisper oye «asedio», «aseo», «hace dos», «deseo»).
    desde: fr(0),
    en: 0,
    dur: FIN_HOOK,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.06, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "La terraza común (la promesa): Isabella camina hacia cámara bajo la pérgola, con la ciudad detrás, y dice «el tiempo es el activo más valioso de los seres humanos y te ayudamos a optimizarlo incluyendo un aseo semanal». Abre la pieza A CORTE (excepción declarada): el hook es lo primero que se ve.",
  },
  // ── Bloque 3 · la unidad: la Social Kitchen, el gimnasio y el carril de nado ──
  {
    id: "c02-cocina",
    bloque: 3,
    tipo: "video",
    src: v("rc11"),
    // RC11 «Social Kitchen / coworking» (Img 9513, 2-sep), del 2,40 al 5,63 s: la barra, las mesas y las lámparas verdes hasta el mural de colores con las lámparas grandes; la cámara avanza a la derecha. Recorte al centro (X=656).
    // Entra con una disolvencia desde Isabella (f200-212: con `desde` 2,4 s hay 12 f de clip antes) y acaba a corte en el golpe del gimnasio (f309).
    desde: 2.4,
    en: FIN_HOOK,
    dur: P.gimnasio - FIN_HOOK,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.4, shadows: 0.4, contrast: 1.04 }),
    reason:
      "Social Kitchen (la unidad): de Isabella, que acaba de prometer el servicio, a la cocina y el coworking de la unidad (la barra, las lámparas, el mural): el sitio donde se come y se trabaja, que es lo que habla del chef que vendrá después.",
  },
  {
    id: "c03-gimnasio",
    bloque: 3,
    tipo: "video",
    src: v("rc14"),
    // RC14 «Gimnasio» (Img 9517), del 0,40 al 4,13 s: la estantería de madera con las bolas de equilibrio contra la pared naranja, las luces y los tubos del techo y, al fondo, las máquinas; la cámara gira a la derecha, como la
    // de la cocina. Recorte al centro (X=656). Se elige el INICIO del clip y no el tramo con el rótulo «GIMNASIO» (5-6 s) porque desde los 2,2 s hay usuarios del gimnasio a tamaño reconocible en primer plano (el recorte los
    // agranda ×1,78): en este tramo solo se ven pequeños y de espaldas al fondo, sin cara. Entra a corte en un golpe de 6,5 dB (el más débil de la pieza).
    desde: 0.4,
    en: P.gimnasio,
    dur: P.piscina - P.gimnasio,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.3, shadows: 0.3, contrast: 1.06, saturation: 1.06 }),
    reason:
      "Gimnasio (la unidad): la estantería, las luces del techo y las máquinas del gimnasio: lo que hay para cuidarse sin salir del edificio; el mismo giro a la derecha de la cocina (adelante → adelante).",
  },
  {
    id: "c04-piscina",
    bloque: 3,
    tipo: "video",
    src: v("rc16"),
    // RC16 «Piscina» (Img 9525), del 0,90 al 5,23 s: la piscina azul con los escalones y los árboles contra el cielo de la tarde; la cámara gira a la derecha hacia el carril de nado. Recorte al centro (X=656). Entra a corte en un golpe de
    // 7,9 dB; acaba en el de la mitad, que es Isabella.
    desde: 0.9,
    en: P.piscina,
    dur: P.mitad - P.piscina,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.35, highlights: -0.3, whites: -0.12, shadows: 0.35, contrast: 1.04 }),
    reason:
      "Carril de nado (la unidad, al aire libre): la piscina con los árboles y el cielo de la tarde, el espacio más abierto de la unidad antes de que vuelva Isabella a la terraza; sigue girando a la derecha.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c05-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md03"),
    audio: a("md03-voz"),
    voz: {
      s0: 0.68,
      s1: 6.65,
      lufs: -15.1,
      dice: "Contamos con chef privado, tours, masajes y transporte y las mejores experiencias de la ciudad de Medellín.",
    },
    // La voz empieza a los 0,68 s y acaba a los 6,65 s; el clip dura 7,23 s (217 f). `desde` 10 f entra A CORTE en el golpe de 8,7 dB del f551 (suena entero: la música baja con curva DESPUÉS) y la primera sílaba suena 10 f
    // después (f561). El plano dura 204 f (hasta f755): su última palabra suena en f741 y la alcoba entra con una disolvencia (f743-755) que no la pisa.
    // Isabella camina hacia cámara bajo la pérgola, de nuevo en la terraza común (el rodaje del 17-oct no tiene otro sitio para ella: declarado).
    desde: fr(10),
    en: P.mitad,
    dur: FIN_MITAD - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.06, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "La terraza común (el servicio): Isabella camina hacia cámara bajo la pérgola y enumera lo que hay detrás del acompañamiento: «chef privado, tours, masajes y transporte y las mejores experiencias de la ciudad de Medellín». Entra a corte en un golpe.",
  },
  // ── Bloque 5 · el apartamento: la alcoba, el baño y el balcón con el jacuzzi privado ──
  {
    id: "c06-alcoba",
    bloque: 5,
    tipo: "video",
    src: v("rc05"),
    // RC05 «Alcoba principal» (Img 9477), del 0,60 al 3,87 s (con la disolvencia, desde el 0,20): la cama con los cojines y la lámpara colgante, el borde de la cama y la puerta del baño con luz; la cámara gira a la derecha.
    // Recorte al centro (X=656). Entra con una disolvencia desde Isabella (f743-755) y acaba a corte en el golpe del baño (f853: 9,1 dB).
    desde: 0.6,
    en: FIN_MITAD,
    dur: P.bano - FIN_MITAD,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.05, shadows: 0.15, highlights: -0.35 }),
    reason:
      "Alcoba principal (el descanso): de Isabella al interior del apartamento por su alcoba (la cama hecha, la lámpara, la puerta del baño con luz): intimidad, lo privado de lo que se arrienda; gira a la derecha.",
  },
  {
    id: "c07-bano",
    bloque: 5,
    tipo: "video",
    src: v("rc09"),
    // RC09 «Baño principal» (Img 9484), del 2,00 al 5,97 s: el mueble de madera con el lavamanos, el espejo y la luz, hasta la mampara de la ducha; gira a la derecha. Recorte al centro (X=656). Entra a corte en el golpe de 9,1 dB del
    // f853 (la puerta del baño con luz de la alcoba ES la puerta de este baño) y acaba cuando el balcón disuelve (f960-972).
    desde: 2.0,
    en: P.bano,
    dur: ENTRA_BALCON - P.bano,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.3, shadows: 0.1, highlights: -0.4, whites: -0.2, saturation: 1.06 }),
    reason:
      "Baño principal (el cuidado): la puerta del baño que cerraba la alcoba se abre en el mueble de madera, el espejo y la mampara: calma y cuidado; el mismo giro a la derecha, antes de salir al balcón.",
  },
  {
    id: "c08-balcon",
    bloque: 5,
    tipo: "video",
    src: v("rc10"),
    // RC10 (Img 9509), del 5,00 al 10,63 s (con la disolvencia, desde el 4,60): el cielo con las nubes sobre la ciudad y las torres; la cámara gira a la derecha, baja por la baranda de vidrio hasta la baldosa negra y llega al JACUZZI
    // PRIVADO del balcón (la tina cuadrada con los listones de madera y el escalón), de la foto `3-Jacuzzi.png`. Recorte X=1100 (el centro lo dejaba fuera). El clip dura 10,73 s (322 f): quedan 3 f de margen. Es el plano más largo
    // del bloque 5 (169 f) y el CLÍMAX (exclusivo de esta pieza). Entra con una disolvencia (f960-972) y acaba en el golpe del CTA (f1141).
    desde: 5.0,
    en: ENTRA_BALCON,
    dur: P.cta - ENTRA_BALCON,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.12, highlights: -0.45, whites: -0.25, shadows: 0.3, saturation: 1.06 }),
    reason:
      "El balcón (la recompensa): del cielo y la ciudad, la cámara baja por la baranda hasta el jacuzzi privado del balcón, lo que la ficha vende y lo único que ninguna zona común tiene; es el plano más largo del bloque y el clímax, antes de que Isabella resuma qué se lleva quien llega.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c09-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct03"),
    audio: a("ct03-voz"),
    voz: {
      s0: 0.62,
      s1: 6.04,
      lufs: -15.0,
      dice: "Cuando llegas a una ciudad que no es la tuya, el acompañamiento personalizado es una plusvalía que vale la pena conocer.",
    },
    // La voz empieza a los 0,62 s y acaba a los 6,04 s; el clip dura 6,67 s (200 f, a 29,97 fps: `-r 30` tras el tone-map). `desde` 9 f entra A CORTE en el golpe de 11,9 dB del f1141 (suena entero) y la primera sílaba suena
    // 10 f después (f1151); el piano decae 29 f más tarde. Se usan 186 f: la última palabra suena en f1313 y quedan 14 f (0,47 s) de su cara, en los que la imagen funde a negro. Nada se congela.
    // NO es una acción (la V29 la repite): la tarjeta con el logo y la web cierra.
    desde: fr(9),
    en: P.cta,
    dur: DUR_CTA,
    zoom: [1.0, 1.03],
    entra: "corte",
    color: color({ exposure: 0.12, contrast: 1.06, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "Las escaleras con césped (la invitación): Isabella, con el edificio detrás, cierra con la idea del servicio («cuando llegas a una ciudad que no es la tuya, el acompañamiento personalizado es una plusvalía que vale la pena conocer»); la tarjeta con el logo y la web hace de acción. Entra a corte en el golpe más fuerte de la pieza.",
  },
  {
    id: "c10-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-048/cierre-oscuro.png",
    en: P.cta + DUR_CTA,
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo de Propiedades Luxur y la web mientras el piano se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta. */
export const DURACION_048 = P.cta + DUR_CTA + DUR_TARJETA;
