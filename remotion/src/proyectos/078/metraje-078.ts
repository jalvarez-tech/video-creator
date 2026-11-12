/**
 * EL RECORRIDO 078 — «Suite Go Living (El Poblado)», V59 del registro: el tercer reel del lote 076-078 (el que INCLUYE las zonas sociales del edificio; reparto 070-075 en `proyectos/070/reparto-070-075.md`) — los planos, como DATOS.
 *
 * Ángulo: «NO SE TRATA SOLO DE COMPRAR UNA PROPIEDAD». El edificio visto desde el suelo (sin texto ni voz) → el hook lo dice en la entrada de la suite («no se trata solo de comprar una propiedad») → el paseo enseña
 * lo que hay además de la suite: el escritorio con su silla azul y, bajando al edificio, el gimnasio (las zonas sociales) → la mitad lo convierte en condición («no todas las propiedades tienen las mismas condiciones
 * para operar turísticamente») → de vuelta en la suite, el mueble de TV, la cama y la vista de la ciudad desde el ventanal → el CTA («conoce esta oportunidad en El Poblado»). Estructura del canal: EXTERIOR · HOOK ·
 * RECORRIDO · MITAD · RECORRIDO · CTA, con TRES frases de Isabella.
 *
 * NINGUNA PIEZA DICE QUÉ EXIGE EL POT NI QUE ESTA SUITE LO CUMPLA, y esta tampoco habla de rentabilidad ni de valorización: la mitad habla de «condiciones para operar»; lo que respalda el anuncio es la operación
 * hotelera y el edificio (el gimnasio se ve; que sea «amenidad» del edificio lo dice el rodaje, no el anuncio, y el reel no lo escribe).
 *
 *   hook   HK07  `IMG_4970` «No se trata solo de comprar una propiedad.»                                      (exclusiva de esta pieza)
 *   mitad  MD02  `IMG_4951` «No todas las propiedades tienen las mismas condiciones para operar turísticamente.» (REPETIDA de la 070: de las mitades limpias solo quedaban MD04 —de la 076— y MD07 —afirma algo del edificio
 *                           que el anuncio no dice—; es la única sin afirmaciones dudosas, como la V10 con su MD2; se declara en `combinaciones.md`)
 *   CTA    CT03  `IMG_4946` «Conoce esta oportunidad en El Poblado.»                                           (exclusiva de esta pieza)
 *   exterior DR09 `IMG_5057` la torre desde abajo entre las palmas, con el jardín vertical a los pies; es el iPhone desde el suelo, NO un dron.
 *
 * LO QUE ES DE ESTA PIEZA (`proyectos/078/combinaciones.md`): las zonas sociales (el gimnasio: ZS02 y ZS03) entre la suite y la mitad; el resto es la suite (RC11, RC03, RC05, RC07), un solo cuarto: no hay sala, balcón
 * ni alcoba aparte. Los tramos que comparten metraje con otras piezas de la suite se declaran en `combinaciones.md` y los muestra la puerta (7b).
 *
 *   bloque 1  c01                  el edificio: DR09, la torre entre las palmas, a velocidad constante desde el f0; SIN TEXTO NI VOZ
 *   bloque 2  c02                  Isabella en la entrada de la suite, reflejada en el espejo del pasillo: el hook (entra A CORTE en el golpe; su primera palabra suena a los 14 f)
 *   bloque 3  c03 c04 c05          el escritorio con la silla azul y el TV (RC11) → el gimnasio (ZS02, los discos de pesas y el banco rojo) → las trotadoras y la elíptica frente al espejo (ZS03)
 *   bloque 4  c06                  Isabella junto al ventanal: la mitad (entra A CORTE en el golpe; el clip, desde su primer fotograma)
 *   bloque 5  c07 c08 c09          la habitación en panorámica, con el escritorio, el TV y el ventanal al fondo (RC03) → la cama con su cabecero (RC05) → LA VISTA: de la cama al ventanal con la ciudad y las montañas (RC07, el plano más largo del bloque)
 *   bloque 6  c10 c11              Isabella sentada junto al escritorio, la silla azul: el CTA (a corte); y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO. La canción es «Ivory Skyline Reverie» (lounge / downtempo, 3:17; meseta plana de −11 LUFS en toda la pista, sin pulso fiable): la rejilla son los golpes MEDIDOS
 * (`musica/golpes-cancion-entera.json`; `buscar-cortes-lp.py`, estructura de 9 planos y 10 cortes, W=12 s y T_F=192 s) y cada cambio de plano cae en uno (≥ 9,1 dB los cortes secos). La canción NO CAE sola
 * bajo el CTA (su único fundido es el final, desde los 195 s): la música se APAGA con curva tras la última palabra del CTA, como en las demás piezas con meseta, y la tarjeta queda en silencio.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(12)` = 12/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f96, 3,2 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la
 * prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12). El material es iPhone HLG tone-mapeado con VideoToolbox (R21).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-078.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-078";

export const FPS_078 = 30;

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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −22,9 · −24,5 · −23,6 LUFS en su ventana de voz (habla a unos metros
 * de un iPhone); cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS)
 * hasta −15,0 LUFS con el pico real a −2,5 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Ivory Skyline Reverie» — `archivos/musica/Ivory Skyline Reverie.mp3` (sha 8 `80bf4f33`), 3:17. Se entra en su golpe de 157,58 s (13,3 dB) y de ahí suena en una meseta de −10,2 a −12,7 LUFS (picos de +0,5 a +2,7 dBFS: hay
 * que BAJARLA, no subirla). No tiene caída propia hasta su fundido final (desde ≈ 195 s, 7 s después del CTA): la música se apaga con curva tras la última palabra. Los golpes de abajo son los MEDIDOS
 * (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir»): `proyectos/078/musica/golpes-cancion-entera.json` (`medir-pista.py --json`). La rejilla la dio `buscar-cortes-lp.py` con estos
 * planos (`R=[[60,105],[92,100],[54,100],[58,81],[50,70],[160,166],[60,110],[50,80],[88,110]] TIPOS=dccccccccc W=12 T_F=192` y cortes secos ≥ 9 dB): ver `musica/rejilla-078.txt`.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 157.58, db: 13.3 },
  /** El hook entra A CORTE en este golpe: suena entero y la música baja con curva después. */
  hook: { t: 160.224, db: 14.6 },
  /** Cortes secos del paseo: el escritorio (c03), el gimnasio (c04) y las elípticas (c05). */
  paseo1: { t: 163.437, db: 10.2 },
  paseo2: { t: 166.053, db: 10.9 },
  paseo3: { t: 168.536, db: 9.1 },
  /** La mitad entra A CORTE en este golpe: suena entero y la música baja después. */
  mitad: { t: 170.825, db: 10.6 },
  /** El primer plano del bloque 5 (el mueble de TV) y los dos siguientes (la cama y la vista), a corte. */
  alcoba: { t: 176.199, db: 13.4 },
  alcoba2: { t: 179.399, db: 12.0 },
  vista: { t: 181.925, db: 22.4 },
  /** El CTA entra A CORTE en este golpe; la música baja bajo su voz y se apaga tras su última palabra. */
  cta: { t: 185.293, db: 12.9 },
} as const;

/** Dónde se acaba la canción por sí sola (s): su fundido final, desde ≈ 195 s (−12,7 → −23,8 LUFS en el tramo 195-200 s). La pieza acaba antes (f991 = 190,5 s de la canción) y la apaga ella. */
export const DECAE = { t: 195.0, lufsAntes: -12.7, lufs5s: -23.8 } as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (157,58 s) cae en el frame 3 de la pieza; redondeado a un frame (4726/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 4726 / FPS_078;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_078;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_078;

/** Isabella: un empuje lento hacia ella (camina hacia cámara: el empuje la acompaña). Los recorridos y el exterior, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-078/${id}.mp4`;
const a = (id: string): string => `recorrido-078/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE del canal: contraste con cuerpo, negros hundidos, luces recogidas (los cielos son lo primero que se quema), un punto cálido y +10 % de saturación. Orden del efecto: exposición → balance de blancos →
 * sombras/luces/blancos/negros → contraste → saturación → vibrance. `vibrance` ≤ 0,05 (sobre hormigón gris pinta un moteado de colores y vuelve rosadas las nubes) y las tomas de Isabella, `saturation` ≤ 1,06:
 * la piel se queda donde estaba. El AJUSTE de cada plano se mide (`herramientas/medir-color.py`), no se hereda.
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
 * Los frames de cada cambio de plano: todos salen de `golpe(...)`, así que mover la entrada de la música es cambiar `INICIO_MUSICA`. Todos los planos entran A CORTE (el hook, la mitad y el CTA no tienen
 * ≥ 24 f de aire antes de su primera palabra, o el clip se usa entero); un corte seco en un golpe de ≥ 9,1 dB.
 */
const P = {
  hook: golpe(GOLPE.hook), //       82 · Isabella entra a corte; su primera palabra suena a los 14 f
  escritorio: golpe(GOLPE.paseo1), // 179 · acaba el hook; el golpe abre el paseo (el escritorio y la silla azul)
  gimnasio: golpe(GOLPE.paseo2), //  257 · el gimnasio (zonas sociales)
  elipticas: golpe(GOLPE.paseo3), // 332 · las trotadoras y la elíptica frente al espejo
  mitad: golpe(GOLPE.mitad), //     400 · Isabella con la mitad
  tv: golpe(GOLPE.alcoba), //       562 · el mueble de TV y la ciudad por el ventanal
  cama: golpe(GOLPE.alcoba2), //    658 · la cama con su cabecero
  vista: golpe(GOLPE.vista), //     733 · la vista de la ciudad (el golpe de 22,4 dB)
  cta: golpe(GOLPE.cta), //         834 · Isabella con el CTA
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 3,57 s (107 f) y desde `desde` (6 f) hasta el f103 del clip hay 97. Su voz va de 0,60 a 2,72 s (f846 a f910 de la comp): 21 f (0,7 s) de su cara tras la última
 * palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela: el plano acaba antes del final del clip, que sigue 4 f más.
 */
const DUR_CTA = 97;

/**
 * Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero aquí, 2 f antes del final de la pieza (la tarjeta va en silencio).
 */
export const FIN_MUSICA_078 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje078: readonly Corte[] = [
  // ── Bloque 1 · el edificio ──
  {
    id: "c01-edificio",
    bloque: 1,
    tipo: "video",
    src: v("dr09"),
    // DR09 (iPhone desde el suelo, 4K HLG → BT.709), del 4,80 al 7,53 s: la torre de piedra clara desde abajo entre las palmas y, al pie, el jardín vertical sobre la entrada; la cámara sube muy despacio. Entra a corte con el golpe de 13,3 dB del f3. La 073 usó 2,00-5,13 s del mismo clip (se comparten 0,3 s).
    desde: 4.8,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El edificio visto desde el suelo (la promesa): la torre entre las palmas con su jardín vertical a los pies. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de lo que hay más allá de la compra.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk07"),
    audio: a("hk07-voz"),
    voz: {
      s0: 0.73,
      s1: 2.86,
      lufs: -15,
      dice: "No se trata solo de comprar una propiedad.",
    },
    // La voz empieza a los 0,73 s (22 f) y acaba a los 2,86 s (86 f); el clip dura 3,54 s (106 f). `desde` 8 f entra A CORTE (no caben los 12 f de una disolvencia ANTES de `desde`) y la primera palabra suena a los 14 f del
    // golpe, que suena entero; la música baja con curva en 10 f. El plano dura 97 f (hasta el golpe del f179; acaba en el f105 del clip, 1 f antes de su final): 19 f tras la última palabra, en los que la música sube.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-078.ts`): «solo de» (whisper oye «sólo hay que», confianza 0,27/0,45) y el arranque de «solo».
    // Isabella en la entrada de la suite, al fondo del pasillo y reflejada en el espejo (se ve dos veces), camina hacia cámara.
    desde: fr(8),
    en: P.hook,
    dur: P.escritorio - P.hook,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "La entrada de la suite (el umbral de la promesa): Isabella, al fondo del pasillo y reflejada en el espejo, viene hacia cámara y dice «no se trata solo de comprar una propiedad». Entra a corte desde el exterior.",
  },
  // ── Bloque 3 · lo que hay además de la suite: el escritorio y el gimnasio ──
  {
    id: "c03-escritorio",
    bloque: 3,
    tipo: "video",
    src: v("rc11"),
    // RC11 (iPhone, 4K HLG), del 5,55 al 8,15 s (el final del clip): el escritorio con la silla azul, la pizarra de vidrio y el TV; la cámara avanza hacia la pared. La 073 usó 3,00-6,80 s del mismo clip (se comparten 1,2 s). Entra A CORTE en el golpe de 10,2 dB que abre el paseo (f179).
    desde: 5.55,
    en: P.escritorio,
    dur: P.gimnasio - P.escritorio,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.08 }), // luma 125-131 antes del ajuste (el resto de la pieza, 97-107)
    reason:
      "El escritorio con la silla azul y el TV (lo práctico de una suite hotelera): el primer plano tras el hook, en la misma habitación; viene del pasillo de la entrada y abre el paseo en el golpe.",
  },
  {
    id: "c04-gimnasio",
    bloque: 3,
    tipo: "video",
    src: v("zs02"),
    // ZS02 (iPhone, 4K HLG), del 0,00 al 2,50 s: el gimnasio del edificio, de los discos de pesas al banco rojo y las mancuernas, con las máquinas en el espejo del fondo; la cámara baja y avanza. Zona social del edificio. La 074 usó 2,00-5,40 s (se comparten 0,5 s); la 076 y la 077 usan 5,4-8,0 s.
    desde: 0,
    en: P.gimnasio,
    dur: P.elipticas - P.gimnasio,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El gimnasio del edificio (una zona social: lo que hay más allá de la suite, que es el ángulo del hook): se baja del cuarto al edificio; los discos de pesas y el banco rojo enseñan que es un gimnasio equipado.",
  },
  {
    id: "c05-elipticas",
    bloque: 3,
    tipo: "video",
    src: v("zs03"),
    // ZS03 (iPhone, 4K HLG), del 2,80 al 5,07 s (el final del clip): las trotadoras y la elíptica frente al espejo del gimnasio, con las mancuernas al fondo; la cámara se desplaza hacia la derecha. La 074 usó 0,30-3,20 s (se comparten 0,4 s).
    desde: 2.8,
    en: P.elipticas,
    dur: P.mitad - P.elipticas,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "Las máquinas frente al espejo (el gimnasio, al detalle): cierra lo que el edificio añade a la suite antes de volver al cuarto con Isabella.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md02"),
    audio: a("md02-voz"),
    voz: {
      s0: 0.65,
      s1: 4.78,
      lufs: -15,
      dice: "No todas las propiedades tienen las mismas condiciones para operar turísticamente.",
    },
    // REPETIDA de la 070 (toma, voz y tramo: el clip entero, `desde` 0). La voz empieza a los 0,65 s (19,5 f) y acaba a los 4,78 s (143,4 f); el clip dura 5,54 s (166 f). No hay 12 f antes de él para una disolvencia, así que
    // entra A CORTE en el golpe del f400, que suena entero; la música baja con curva en 10 f y la primera palabra suena a los 19,5 f. El plano dura 162 f (hasta el golpe del f562): 18,6 f tras la última palabra, en los que la música sube.
    // Isabella, junto al ventanal con la ciudad y la cama a la derecha, de pie y quieta.
    desde: 0,
    en: P.mitad,
    dur: P.tv - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "Junto al ventanal (la condición, dicha): Isabella, de pie con la ciudad detrás, dice «no todas las propiedades tienen las mismas condiciones para operar turísticamente». Entra a corte desde el gimnasio.",
  },
  // ── Bloque 5 · el mueble de TV, la cama y la vista ──
  {
    id: "c07-tv",
    bloque: 5,
    tipo: "video",
    src: v("rc03"),
    // RC03 (iPhone, 4K HLG), del 3,80 al 7,00 s: la panorámica de la habitación desde la entrada: el escritorio, el TV y el mueble de madera, con la cama y el ventanal al fondo. Entra A CORTE en el golpe de 13,4 dB del f562. La 071 usó 2,20-5,30 s del mismo clip (se comparten 1,5 s) y la 073, 0,60-4,30 s (0,5 s).
    desde: 3.8,
    en: P.tv,
    dur: P.cama - P.tv,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.06 }), // luma 122 antes del ajuste
    reason:
      "La habitación entera en panorámica (cómo se vive): el escritorio, el TV y el mueble de madera con la cama y el ventanal al fondo; vuelve al cuarto tras la mitad y el golpe del bloque 5 lo abre.",
  },
  {
    id: "c08-cama",
    bloque: 5,
    tipo: "video",
    src: v("rc05"),
    // RC05 (iPhone, 4K HLG), del 6,35 al 8,85 s (el final del clip): la cama king con su cabecero gris, los cuadros y las lámparas colgantes; la cámara avanza hacia ella.
    desde: 6.35,
    en: P.cama,
    dur: P.vista - P.cama,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.14 }), // luma 140 antes del ajuste (la cama blanca con luz cálida)
    reason:
      "La cama con su cabecero (cómo se vive, al detalle): los cuadros y las lámparas colgantes; un cuarto de hotel pensado para quedarse varios días y el paso a la vista.",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc07"),
    // RC07 (iPhone, 4K HLG), del 2,85 al 6,22 s: de la cama sube hasta el ventanal con la repisa de ladrillo y la ciudad y las montañas de El Poblado al fondo. Entra A CORTE en el golpe de 22,4 dB (f733) y es el plano más
    // largo del bloque 5 (101 f): el clímax. Del clip quedan 2 f más.
    desde: 2.85,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05, highlights: -0.3, whites: -0.15 }),
    reason:
      "La ciudad desde el ventanal (la vista, el clímax): de la cama sube hasta la ventana con El Poblado y las montañas al fondo; lo que se ve desde el piso 9. El plano más largo del bloque.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct03"),
    audio: a("ct03-voz"),
    voz: {
      s0: 0.6,
      s1: 2.72,
      lufs: -15,
      dice: "Conoce esta oportunidad en El Poblado.",
    },
    // La voz empieza a los 0,60 s (18 f) y acaba a los 2,72 s (81,6 f); el clip dura 3,57 s (107 f). Solo hay 18 f antes de su primera palabra, así que entra A CORTE en el golpe del f834 (`desde` 6 f: la primera palabra suena
    // a los 12 f del golpe, que suena entero) y la música baja con curva en 10 f. El plano dura 97 f (acaba en el f103 del clip, 4 f antes de su final): 21 f tras la última palabra, en los que la imagen funde a negro (los últimos 6).
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-078.ts`): «Conoce» (whisper oye «Conocer» y, en un corte, «Conocí»; confianza 0,24).
    // Isabella sentada en la silla azul junto al escritorio, con una planta borrosa en primer plano.
    desde: fr(6),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "El escritorio de la suite (la invitación): Isabella, sentada en la silla azul, dice «conoce esta oportunidad en El Poblado»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-078.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-078/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_078 = P.cta + DUR_CTA + DUR_TARJETA;
