/**
 * EL RECORRIDO 034 — «Lote en El Carmen de Viboral (Mia)», V18 del registro y TERCER reel de esta propiedad — los planos, como DATOS.
 *
 * Pedido (2026-10-09): «crea el reel V17 (proyecto 033) del Lote en El Carmen de Viboral (Mia)… es el TERCER reel de esta propiedad: debe sentirse distinto del 030 (V14, “seguridad sin encierro / dos
 * accesos”) y del 031 (V15, “construir aquí”): otro ángulo, otro hook, otra mitad, otro CTA, otra canción y otros planos, y romper el scroll». La numeración pasó a V18/034 por decisión del usuario (la sesión de
 * Casa Campestre ya usaba V17/033). Es la ESTRUCTURA DEL CANAL: DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA.
 *
 *   hook   HK03  «Si quieres una propiedad campestre donde la naturaleza sea parte de tu casa, vente, te muestro.»
 *   mitad  MD03  «Si llevas meses buscando tu lugar para tu casa campestre, acabas de encontrarlo.»
 *   CTA    CT03  RECORTADO a su segunda frase: «y agendemos una visita» (la toma entera dice «Haz clic en el botón y agendemos una visita»; en un reel no hay botón).
 *
 * LA IDEA EN UNA LÍNEA. Este lote es TU LUGAR EN EL CAMPO: el hook promete una casa donde la naturaleza sea parte de ella, el paseo enseña esa naturaleza (los árboles, los eucaliptos que lo bordean, la palma
 * delante de las terrazas), la mitad cierra la búsqueda («acabas de encontrarlo»), el bloque 5 enseña cómo se viviría (el lote entero con su horizonte, la cabaña entre el pino y las palmas, la vista del valle a
 * pie) y el CTA pide UNA acción distinta de las dos versiones anteriores: la visita. El 030 vendía los accesos; el 031, construir con agua y energía. Ninguna cifra en pantalla ni en voz: la ficha (3.428 m²,
 * COP 800 millones) va al caption.
 *
 *   bloque 1  c01                  el lote desde el aire con la luz de la tarde: las palmas, la cabaña y las terrazas (DR98), SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia
 *   bloque 2  c02                  Isabella camina hacia cámara en la loma, con los pinos y las palmas detrás: el hook (entra a corte en un golpe)
 *   bloque 3  c03 c04 c05          el paseo: de los árboles a la ladera y la cabaña (DR99) → los eucaliptos que bordean el lote (DR105) → la palma delante de las terrazas (DR101)
 *   bloque 4  c06                  Isabella camina hacia cámara en la loma con el valle y las nubes (el perro la sigue): la mitad (a corte en un golpe)
 *   bloque 5  c07 c08 c09          el lote entero con los eucaliptos y el cielo (DR96) → la cabaña entre el pino y las palmas (DR99) → la vista del valle a pie (RC01, el plano más largo del bloque)
 *   bloque 6  c10 c11              Isabella en la explanada con las montañas: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * COMPARTE CON LAS VERSIONES ANTERIORES (declarado; la puerta, 7b, mide que no se solapa ningún segundo): ningún hook, mitad, CTA ni canción. CLIPS de la V14 en OTROS segundos: DR98 (allí 13,0-16,33 s; aquí
 * 7,10-10,43), DR99 (allí 18,40-20,77; aquí 8,10-11,27 y 12,20-14,50), DR96 (allí 6,5-8,83; aquí 18,60-20,57) y RC01 (allí 1,8-6,17; aquí 6,17-8,60: la continuación de aquel paneo). Un clip de la V15 en otros
 * segundos: DR101 (allí 5,30-8,13; aquí 13,90-16,50, con el mismo recorte 9:16). Un dron que nadie había usado: DR105. Los drones que nadie había usado y no entran: DR100 y DR104 aceleran o dan tirones
 * (medido), y DR102 es un cenital de tierra roja (el usuario cambió uno así en la V15: «se leía como textura, no como lote»). No hay ninguna vista AÉREA larga a velocidad constante sin usar (DR107 da un tirón a
 * los 39,2 s y se para a los 41; DR103 acelera al subir al valle): la vista es la panorámica A PIE de RC01, uniforme (dispersión 0,02).
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA, POR GOLPES. «Chillin' (Chillstep Mix)» (Chill Music – F.G.G.; chillstep, pulso dudoso) se corta sobre los GOLPES MEDIDOS (`medir-pista.py`, ≥ 6 dB;
 * `proyectos/034/musica/golpes-034.json`) y se comprueba sobre el audio del render (`herramientas/golpes-render.py`, R33). La rejilla sale de `herramientas/buscar-cortes-lp.py` con la estructura del canal y las
 * ventanas REALES de cada plano (`musica/rejilla-chillin.txt`): de las 27 canciones libres, con estas tomas solo dan rejilla esta, «Strobe» (de club), «I Feel It Coming» (sax pop) y «Familiar» (su final está a
 * −27,8 LUFS). Golpes de 8,7 a 20,8 dB; el más débil (8,7, el fin del hook) lo fija la toma: HK03 dura 179 f y solo ese golpe deja 16 f de aire tras «muestro». Todos los `en` salen de `golpe(...)`: mover la
 * entrada de la música es cambiar `INICIO_MUSICA`. LA CANCIÓN: libre en el registro; reservada para la V18. Medida, no oída.
 *
 * TRES TOMAS QUE ENTRAN A CORTE: cada una en un golpe medido que suena ENTERO; la música baja con curva de coseno DESPUÉS y la primera sílaba suena a ≥ 7,8 f del golpe. Para eso `desde` es más pequeño que su
 * primera palabra (11 · 7 · 50 f).
 *
 * LOS DRONES SE ELIGIERON POR SU MOVIMIENTO (030 rev. 1): cada tramo es la ventana más uniforme del largo de su plano (`herramientas/ventana-fina.py`: diferencia media entre fotogramas, dispersión, pendiente y
 * máximo/media). Los números de cada uno, en su comentario. LA EXCEPCIÓN DECLARADA es la apertura (DR98): dispersión 0,10 y pendiente +0,27 (el vuelo gana velocidad poco a poco, 3,5 → 4,5 en 3,3 s, sin tirones;
 * máximo 1,21× la media); se queda porque es el mejor plano del lote y ningún otro tramo libre de 100 f lo enseña así.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(11)` = 11/30 s) para que imagen y voz corten en la MISMA muestra; `en` y `dur`, en frames de la composición. Los planos son
 * CONTIGUOS: cada `en` es el fin del anterior.
 *
 * TRANSICIONES. Corte seco en los diez cambios de plano (cada uno sobre un golpe de la canción); el único fundido es el de la última imagen de Isabella a negro (`FundidoACierre`). Nada más.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal): Isabella no habla hasta el f108, 3,6 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py` (antes/después con `stills-antes.mjs`). Con
 * `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-034.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-034";

export const FPS_034 = 30;

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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido del encargo: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −24,6 · −23,6 · −26,7 LUFS en su ventana de voz; cada una pasa por la
 * cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia de +19,2 · +19,3 · +18,8 dB buscada con `probar-voz.py` y limitador a −2,5 dBFS) hasta −15,1 · −15,1 · −15,0 LUFS con
 * pico real de −2,5 · −2,5 · −3,8 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29 («una ganancia por toma y nada más»), por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Chillin' (Chillstep Mix)» — `archivos/musica/Chill Music - F.G.G. - Chillin' (Chillstep Mix).mp3` (sha 8 `6c9eb412`), chillstep, 5:05. Se entra en su golpe de 264,978 s (15,8 dB) y de ahí suena a −14,6…−17,5
 * LUFS por tramos (picos de −1,2 a +0,3 dBFS) hasta su caída hacia los 294,5 s. Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir») en que
 * entra cada plano, con su fuerza en dB por 15 ms: `proyectos/034/musica/golpes-034.json` (`medir-pista.py --json`). Salen de `buscar-cortes-lp.py`.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 0 (el lote, a corte). */
  apertura: { t: 264.978, db: 15.8 },
  /** Isabella entra A CORTE con el hook; su primera sílaba suena 7,8 f después. */
  hook: { t: 268.212, db: 9.8 },
  /** Acaba el hook (15,8 f tras su última palabra): de los árboles a la ladera y la cabaña. El golpe más débil de la pieza: lo fija el largo de HK03. */
  arboles: { t: 273.819, db: 8.7 },
  /** Los eucaliptos que bordean el lote (el golpe más fuerte de la pieza). */
  eucaliptos: { t: 276.99, db: 20.8 },
  /** La palma delante de las terrazas. */
  terrazas: { t: 278.833, db: 12.6 },
  /** Isabella entra A CORTE con la mitad; su primera sílaba suena 8,2 f después. */
  mitad: { t: 281.451, db: 9.3 },
  /** Acaba la mitad (12,6 f tras su última palabra): el lote entero con su horizonte. */
  lote: { t: 286.213, db: 15.9 },
  /** La cabaña entre el pino y las palmas. */
  cabana: { t: 288.183, db: 10.3 },
  /** La vista del valle, a pie (el plano más largo del bloque 5). */
  vista: { t: 290.464, db: 12.3 },
  /** Isabella entra A CORTE con el CTA; su primera sílaba suena 8,4 f después. */
  cta: { t: 292.919, db: 10.6 },
} as const;

/**
 * LA CAÍDA FINAL de la canción. En LUFS por tramos de 5 s el primer instante que cumple (≥ 9 dB a 5 s y ≥ 20 a 10 s; `herramientas/lufs-caida.py`) es `t` = 294,5 s: ebur128 sobre la canción da −13,3 antes,
 * −22,3 en los 5 s siguientes (9,0 dB) y −53,5 en los 5 s tras ellos (40,2 dB); la pista acaba a los 305 s. No es un golpe sino un cambio de nivel: la resolución de esta pieza, en el f887, justo después de
 * «…una visita» (f885).
 */
export const DECAE = { t: 294.5, lufsAntes: -13.3, lufs5s: -22.3, lufs10s: -53.5 } as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: 50 ms antes del golpe de entrada (264,978 s), redondeado a un frame (7948/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 7948 / FPS_034;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_034;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_034;

/** Isabella: un empuje lento hacia ella (camina hacia cámara: el empuje la acompaña). El recorrido, quieto: la cámara ya avanza. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-034/${id}.mp4`;
const a = (id: string): string => `recorrido-034/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE de Luxur, la del 017 (revisión 7 de aquel): contraste con cuerpo, negros hundidos, luces recogidas, un punto cálido y +10 % de saturación. Orden del efecto: exposición → balance de blancos →
 * sombras/luces/blancos/negros → contraste → saturación → vibrance. `vibrance` ≤ 0,05 (sobre hormigón gris pinta un moteado de colores y vuelve rosadas las nubes) y las tomas de Isabella, `saturation` ≤ 1,06: la
 * piel se queda donde estaba. El AJUSTE de cada plano se mide (`herramientas/medir-color.py`), no se hereda.
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
 * El frame de cada cambio de plano: el del golpe de la canción en que entra (arriba). TODOS los cortes son secos y caen en un golpe medido.
 */
const P = {
  hook: golpe(GOLPE.hook), //             100 · Isabella entra a corte; su primera palabra, 7,8 f después
  arboles: golpe(GOLPE.arboles), //       268 · acaba el hook; de los árboles a la cabaña
  eucaliptos: golpe(GOLPE.eucaliptos), // 363 · los eucaliptos
  terrazas: golpe(GOLPE.terrazas), //     419 · la palma y las terrazas
  mitad: golpe(GOLPE.mitad), //           497 · Isabella entra a corte con la mitad
  lote: golpe(GOLPE.lote), //             640 · el lote entero con su horizonte
  cabana: golpe(GOLPE.cabana), //         699 · la cabaña entre el pino y las palmas
  vista: golpe(GOLPE.vista), //           768 · la vista a pie, el plano más largo del bloque 5 (73 f)
  cta: golpe(GOLPE.cta), //               841 · Isabella entra a corte con el CTA
} as const;

/**
 * Frames que dura la toma del CTA (CT03 recortado): el clip dura 4,00 s (120 f) y desde `desde` (50 f = 1,667 s) le quedan 70. Su voz («y agendemos una visita») va de 1,945 a 3,12 s (f849-885 de la comp):
 * 24 f (0,8 s) de su cara tras la última palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela: el plano acaba en el f119 del clip, el último.
 */
const DUR_CTA = 69;

/**
 * Dónde acaba la música (frame de la comp). La canción cae en el f887 (294,5 s), justo tras la última palabra del CTA, y su cola se apaga bajo la tarjeta: la envolvente la lleva a cero 2 f antes del final de
 * la pieza.
 */
export const FIN_MUSICA_034 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje034: readonly Corte[] = [
  // ── Bloque 1 · el lote ──
  {
    id: "c01-lote",
    bloque: 1,
    tipo: "video",
    src: v("dr98"),
    // DR98 (vertical), del 7,10 al 10,43 s: el dron avanza sobre el lote con la luz de la tarde: las palmas abajo, la cabaña, las terrazas engramadas y la franja de tierra roja arriba, con la hilera de cipreses.
    // La V14 usó este clip en 13,0-16,33 s (los taludes); este tramo no lo había usado nadie. Movimiento 3,5 de media, dispersión 0,10, pendiente +0,27, máximo 1,21× (excepción declarada arriba: gana velocidad
    // poco a poco, sin tirones). Entra a corte con el golpe de 15,8 dB del f3 (no nace de negro).
    desde: fr(213),
    en: 0,
    dur: P.hook,
    zoom: [1.0, 1.05],
    entra: "corte",
    color: color({ highlights: -0.3, whites: -0.15, saturation: 1.12, vibrance: 0.03 }),
    reason:
      "Lote (la promesa): el lote desde el aire con la luz de la tarde —las palmas, la cabaña de madera, las terrazas verdes— es lo que se vende y lo que el hook va a nombrar: la naturaleza alrededor de la casa. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia. Entra a corte: no nace de negro.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk03"),
    audio: a("hk03-voz"),
    voz: {
      s0: 0.625,
      s1: 5.44,
      lufs: -15.1,
      dice: "Si quieres una propiedad campestre donde la naturaleza sea parte de tu casa, vente, te muestro.",
    },
    // La voz empieza a los 0,625 s (18,75 f; antes, 0,6 s de viento a −44/−50 dB que la ventana de la voz tratada deja en silencio) y acaba a los 5,44 s (163,2 f); el clip dura 5,97 s (179 f, a 29,97 fps
    // normalizado a 30). `desde` 11 f entra A CORTE en el golpe de 9,8 dB del f100 (suena entero: la música baja en los 6 f siguientes) y la primera sílaba suena a los 7,8 f del golpe. El plano dura 168 f (hasta
    // el golpe del f268): 15,8 f tras la última palabra; usa el clip hasta su último fotograma (el f178).
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-034.ts`): «te muestro» (≈ 7,8-8,1 s del vídeo; whisper oye «vente maestro»).
    // Isabella camina hacia cámara en la loma, con los pinos y las palmas detrás y el cielo nublado: el empuje la acompaña.
    desde: fr(11),
    en: P.hook,
    dur: P.arboles - P.hook,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.05, highlights: -0.35, whites: -0.2, saturation: 1.04 }),
    reason:
      "Loma con pinos y palmas (el filtro): Isabella camina hacia cámara y dice «si quieres una propiedad campestre donde la naturaleza sea parte de tu casa, vente, te muestro»: el anhelo que el resto del reel enseña. Entra a corte en un golpe de la música.",
  },
  // ── Bloque 3 · el paseo: los árboles, los eucaliptos y las terrazas ──
  {
    id: "c03-arboles",
    bloque: 3,
    tipo: "video",
    src: v("dr99"),
    // DR99 (vertical), del 8,10 al 11,27 s: el dron avanza bajo los árboles grandes del borde del lote y descubre la ladera de hierba seca y, al final, la cabaña. Velocidad constante (movimiento 7,7, dispersión
    // 0,068, máximo 1,15× la media). La V14 usó este clip en 18,40-20,77 s (el camino entre palmas); este tramo, nadie.
    desde: fr(243),
    en: P.arboles,
    dur: P.eucaliptos - P.arboles,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.1, highlights: -0.3, whites: -0.15, saturation: 1.1 }),
    reason:
      "Árboles y ladera (te muestro): tras «vente, te muestro», la cámara entra por los árboles del borde y baja a la ladera hasta la cabaña: la naturaleza no rodea el lote, está dentro.",
  },
  {
    id: "c04-eucaliptos",
    bloque: 3,
    tipo: "video",
    src: v("dr105"),
    // DR105 (apaisado, recortado a 9:16 en 0,5), del 17,30 al 19,17 s: el dron pasa junto a la hilera de eucaliptos altos sobre la ladera verde. Velocidad constante (movimiento 4,6, dispersión 0,050, máximo
    // 1,12×). Ninguna versión había usado este clip (el resto acelera o enseña la cabaña: medido).
    desde: fr(519),
    en: P.eucaliptos,
    dur: P.terrazas - P.eucaliptos,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.3, shadows: 0.15, highlights: -0.45, whites: -0.25, saturation: 1.12, vibrance: 0.03 }),
    reason:
      "Eucaliptos (el borde): la hilera de eucaliptos altos que cierra el lote por un lado, con la ladera verde debajo; entra con el golpe más fuerte de la canción.",
  },
  {
    id: "c05-terrazas",
    bloque: 3,
    tipo: "video",
    src: v("dr101"),
    // DR101 (apaisado, recortado a 9:16 en 0,35: el recorte de la V15; a 0,5 entra el campo de fútbol del vecino), del 13,90 al 16,50 s: una palma en primer plano y, detrás, las terrazas engramadas con la
    // franja roja arriba; el dron se desliza despacio (movimiento 3,0, dispersión 0,061, pendiente −0,15, máximo 1,13×). La V15 usó este clip en 5,30-8,13 s (las terrazas de frente); este tramo, nadie.
    desde: fr(417),
    en: P.terrazas,
    dur: P.mitad - P.terrazas,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.25, highlights: -0.3, whites: -0.15, saturation: 1.12, vibrance: 0.04 }),
    reason:
      "Palma y terrazas (la medida): la palma delante y las terrazas detrás dan la escala del lote y son el último paso del paseo antes de que Isabella vuelva.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md03"),
    audio: a("md03-voz"),
    voz: {
      s0: 0.505,
      s1: 4.58,
      lufs: -15.1,
      dice: "Si llevas meses buscando tu lugar para tu casa campestre, acabas de encontrarlo.",
    },
    // La voz empieza a los 0,505 s (15,2 f) y acaba a los 4,58 s (137,4 f); el clip dura 5,93 s (178 f). `desde` 7 f entra A CORTE en el golpe de 9,3 dB del f497 (suena entero: la música baja en los 6 f
    // siguientes) y la primera sílaba suena a los 8,2 f del golpe. El plano dura 143 f (hasta el golpe del f640): 12,6 f tras la última palabra.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-034.ts`): «acabas» (≈ 19,9 s del vídeo; whisper oye a veces «acabo»/«acaba»).
    // Isabella camina hacia cámara en la loma, con el valle, las colinas y las nubes detrás; el perro la sigue. Cielo azul.
    desde: fr(7),
    en: P.mitad,
    dur: P.lote - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, highlights: -0.35, whites: -0.2, saturation: 1.0 }),
    reason:
      "Loma con el valle (la búsqueda acaba): Isabella dice «si llevas meses buscando tu lugar para tu casa campestre, acabas de encontrarlo»: le pone nombre a lo que el paseo acaba de enseñar. Entra a corte en un golpe.",
  },
  // ── Bloque 5 · el lote entero, la cabaña y la vista ──
  {
    id: "c07-lote",
    bloque: 5,
    tipo: "video",
    src: v("dr96"),
    // DR96 (vertical), del 18,60 al 20,57 s: el lote entero como un anfiteatro —las terrazas, la cabaña, las palmas— con la hilera de eucaliptos y el cielo arriba; el dron baja despacio (movimiento 2,9,
    // dispersión 0,062, máximo 1,16×). La V14 usó este clip en 6,5-8,83 s (la explanada); este tramo, nadie.
    desde: fr(558),
    en: P.lote,
    dur: P.cabana - P.lote,
    zoom: QUIETO,
    entra: "corte",
    color: color({ highlights: -0.3, whites: -0.15, saturation: 1.12, vibrance: 0.04 }),
    reason:
      "El lote entero (tu lugar): tras «acabas de encontrarlo», el lote completo con su horizonte de eucaliptos y cielo: lo que se ha encontrado, de una vez.",
  },
  {
    id: "c08-cabana",
    bloque: 5,
    tipo: "video",
    src: v("dr99"),
    // DR99 (vertical), del 12,20 al 14,50 s: la cabaña de madera entre el pino y las palmas, con el valle detrás; el dron se desliza de lado a velocidad constante (movimiento 5,7, dispersión 0,032, máximo 1,09×).
    // Es el mismo vuelo que el paseo (c03, 8,10-11,27 s), 0,9 s después: la cabaña que allí asomaba al final, ahora de cerca.
    desde: fr(366),
    en: P.cabana,
    dur: P.vista - P.cabana,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.1, highlights: -0.3, whites: -0.15, saturation: 1.1 }),
    reason:
      "Cabaña (cómo se vive): la cabaña de madera entre el pino y las palmas, lo único construido: el sitio donde la naturaleza ya es parte de la casa.",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc01"),
    // RC01 (IMG_1579), del 6,17 al 8,60 s: a pie, un paneo lento sobre las palmas hasta el valle verde, las colinas y las nubes con el cielo azul; velocidad constante (5 px/f a 540 de ancho, movimiento 7,2,
    // dispersión 0,020, máximo 1,04×). La V14 usó el mismo clip hasta los 6,17 s (su loma a pie): esto es la continuación de aquel paneo, sin un fotograma en común. En los últimos 0,7 s entra un pino por la
    // izquierda y enmarca el valle. Es el plano más largo del bloque 5 (73 f) y el clímax: la vista panorámica de la ficha.
    desde: fr(185),
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ contrast: 1.04, highlights: -0.4, whites: -0.25, saturation: 1.04 }),
    reason:
      "La vista (el clímax): a pie, sobre las palmas, el valle verde y las colinas bajo las nubes: lo que tendría delante la casa; el plano más largo del bloque. Entra a corte en un golpe.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct03"),
    audio: a("ct03-voz"),
    voz: {
      s0: 1.945,
      s1: 3.12,
      lufs: -15.0,
      dice: "y agendemos una visita.",
    },
    // CT03 RECORTADO: la toma dice «Haz clic en el botón y agendemos una visita»; «botón» acaba a los 1,82 s, hay 0,1 s de silencio a −65 dB y «y agendemos una visita» va de 1,945 a 3,12 s (la «y» va pegada a
    // «agendemos»: no hay valle entre las dos). La voz tratada solo suena desde 1,875 s (`VENTANA_VOZ`), así que «botón» no se oye. `desde` 50 f (1,667 s) entra A CORTE en el golpe de 10,6 dB del f841: sus
    // labios cierran «botón» en los 5 primeros fotogramas, sin sonido (ella está a varios metros: la cara mide ≈ 60 px), y la primera sílaba suena a los 8,4 f del golpe.
    // Isabella camina hacia cámara en la explanada, con las montañas, las nubes bajas y el cielo azul.
    desde: fr(50),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, highlights: -0.35, whites: -0.2, saturation: 1.04 }),
    reason:
      "Explanada con las montañas (la invitación): Isabella dice «y agendemos una visita», una sola acción, distinta de las versiones anteriores. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-034.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-034/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_034 = P.cta + DUR_CTA + DUR_TARJETA;
