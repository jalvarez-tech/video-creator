/**
 * EL RECORRIDO 071 — «Suite Go Living (El Poblado)», V52 del registro: el segundo reel de esta suite hotelera en venta (reparto 070-075, `proyectos/070/reparto-070-075.md`) — los planos, como DATOS.
 *
 * Ángulo: «TU INVERSIÓN NO DEBERÍA CONVERTIRSE EN OTRO TRABAJO → LOS OPERADORES». El edificio visto desde el suelo (sin texto ni voz) → el hook lo dice («tu inversión no debería convertirse en otro trabajo») →
 * el paseo enseña la suite lista para recibir huéspedes, del escritorio y el televisor al mueble de la pared (lo que ya está puesto) → la mitad le pone nombre («una suite hotelera con operadores turísticos listos para
 * ti») → la cama con su cabecero, la ventana y la ciudad → el CTA («hablemos y conoce tus opciones de inversión»). Estructura del canal: EXTERIOR · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA, con TRES frases de
 * Isabella.
 *
 * NINGUNA FRASE NI SUBTÍTULO AFIRMA QUÉ DICE EL POT NI QUE ESTA SUITE LO CUMPLA, y ninguna promete valorización, rentabilidad ni ganancia: «operadores turísticos listos para ti» es lo que el anuncio dice del edificio
 * («delegar la operación a alguno de los operadores hoteleros presentes») y se queda en voz.
 *
 *   hook   HK08  `IMG_4978` «Tu inversión no debería convertirse en otro trabajo.»                              (exclusiva de esta pieza, reparto)
 *   mitad  MD06  `IMG_4980` «Una suite hotelera con operadores turísticos listos para ti.»                       (exclusiva de esta pieza, reparto; la primera mitad de la frase, POR CONFIRMAR AL OÍDO)
 *   CTA    CT09  `IMG_4981` «Hablemos y conoce tus opciones de inversión.»                                       (exclusiva de esta pieza, reparto)
 *   exterior DR08 `IMG_5056` la torre entre monstera y follaje con el cielo nublado; es el iPhone desde el suelo, NO un dron.
 *
 * LO QUE ES DE ESTA PIEZA (`proyectos/071/combinaciones.md`): los recorridos RC09, RC03, RC08, RC05, RC10 y RC13 son un hilo propio (el escritorio y el televisor · el mueble · la cama con su cabecero · la ventana);
 * la 070 usa otros planos o tramos de los mismos clips (RC12 · RC02 · RC01 · RC06 · RC04 · RC07 · DR02) y las otras tres del reparto, los suyos. Esta suite es UN SOLO cuarto: el «paseo» es de la cama al ventanal.
 *
 *   bloque 1  c01                  el edificio: DR08, la torre entre las plantas con el cielo nublado, a velocidad constante desde el f0; SIN TEXTO NI VOZ
 *   bloque 2  c02                  Isabella, de pie frente al ventanal con la ciudad detrás: el hook (entra disolviendo; su primera palabra suena a los 13,9 f del golpe)
 *   bloque 3  c03 c04 c05          lo que ya está puesto: de la cama al escritorio (RC09) → el escritorio y el televisor (RC03) → el mueble de la pared con su planta y su cortina (RC08)
 *   bloque 4  c06                  Isabella frente al ventanal, con la cortina gris: la mitad (entra A CORTE en el golpe; el clip entero, desde su primer fotograma)
 *   bloque 5  c07 c08 c09          la cama con su cabecero y los cuadros (RC05) → de la cama a la ventana (RC10) → LA VISTA: la ciudad y las montañas desde el ventanal (RC13, el plano más largo del bloque)
 *   bloque 6  c10 c11              Isabella sentada en la silla del escritorio: el CTA (a corte); y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO. La canción es «Heaven on Earth» (lounge / chill, sin pulso: la rejilla son los golpes MEDIDOS, `musica/golpes-cancion-entera.json`; `buscar-cortes-lp.py`, estructura de 9 planos y 10 cortes) y
 * cada cambio de plano cae en uno (11,5 dB la disolvencia del hook, que ACABA en él; ≥ 10,4 dB los cortes secos). La canción CAE desde los 207,5 s (−13 → −24 → silencio): justo cuando acaba la toma del CTA, así
 * que la cola queda bajo la tarjeta del cierre. Hay un REMANSO de la canción entre 187,3 y 192,0 s (un pasaje quieto de unos 8-10 dB menos) que cae en el paseo: es de la canción, los cortes caen en sus golpes.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(12)` = 12/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS. Un plano que entra
 * disolviendo (`disolver`) empieza a verse 12 f ANTES de su `en` (`solapeDe`): su clip tiene que tener esos 12 f antes de `desde`, y el plano anterior dura hasta ese `en`.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f100, 3,3 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido sobre los stills de la prueba. Con `color` el render lleva `--gl=angle` y la prueba se
 * hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12). El material es iPhone HLG tone-mapeado con VideoToolbox (R21).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-071.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-071";

export const FPS_071 = 30;

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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −23,8 · −25,1 · −25,8 LUFS en su ventana de voz (habla a unos metros
 * de un iPhone); cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS)
 * hasta −15,0 LUFS con el pico real a −2,5 dBFS (−3,0 la del hook), así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Heaven on Earth» — `archivos/musica/Heaven on Earth.mp3` (sha 8 `acd99178`), lounge / chill sin pulso, 3:33. Se entra en su golpe de 178,043 s (10,2 dB) y de ahí suena en una meseta de −13 LUFS (con un remanso de
 * 187,3 a 192,0 s) hasta que CAE, desde los 207,5 s, a un lecho y al silencio (−13 → −24 → −27 LUFS en tramos de 5 s) y acaba a los 213,0 s. Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB
 * en 15 ms; el instante es el de «empieza a subir»): `proyectos/071/musica/golpes-cancion-entera.json` (`medir-pista.py --json`). La rejilla la dio `buscar-cortes-lp.py` con estos planos: ver `medidas/rejillas-heaven-v2.txt`.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 178.043, db: 10.2 },
  /** La disolvencia al hook ACABA aquí (la imagen de Isabella ya es opaca): el golpe suena entero y la música baja con curva después. */
  hook: { t: 180.82, db: 11.5 },
  /** Cortes secos del paseo. */
  paseo1: { t: 184.846, db: 11.6 },
  paseo2: { t: 187.159, db: 10.8 },
  paseo3: { t: 190.23, db: 14.7 },
  /** La mitad entra A CORTE en este golpe: suena entero y la música baja después. */
  mitad: { t: 193.193, db: 13.3 },
  /** El primer plano del bloque 5 entra A CORTE en este golpe (la mitad no puede ceder 12 f a una disolvencia: su última palabra llega al f580). */
  alcoba: { t: 197.681, db: 11.4 },
  alcoba2: { t: 199.681, db: 13.5 },
  vista: { t: 201.859, db: 10.4 },
  /** El CTA entra A CORTE en este golpe; la canción cae sola 3,2 s después. */
  cta: { t: 204.287, db: 13.6 },
} as const;

/** Dónde cae la canción (s): −11 → −20,6 → silencio (9,5 y 88 dB en 5 y 10 s). */
export const DECAE = { t: 207.5, lufsAntes: -13.2, lufs5s: -23.8, lufs10s: -70 } as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (178,043 s) cae en el frame 3 de la pieza; redondeado a un frame (5340/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 5340 / FPS_071;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_071;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_071;

/** Isabella: un empuje lento hacia ella. Los recorridos y el exterior, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-071/${id}.mp4`;
const a = (id: string): string => `recorrido-071/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE del canal: contraste con cuerpo, negros hundidos, luces recogidas (los cielos son lo primero que se quema), un punto cálido y +10 % de saturación. Orden del efecto: exposición → balance de blancos →
 * sombras/luces/blancos/negros → contraste → saturación → vibrance. `vibrance` ≤ 0,05 (sobre hormigón gris pinta un moteado de colores y vuelve rosadas las nubes) y las tomas de Isabella, `saturation` ≤ 1,06:
 * la piel se queda donde estaba. El AJUSTE de cada plano se mide (stills de la prueba), no se hereda.
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

/** El color de un plano: la base más el ajuste de su toma (medido sobre los stills). */
const color = (ajuste: ColorCine = {}): ColorCine => ({ ...COLOR_BASE, ...ajuste });

/**
 * Los frames de cada cambio de plano: todos salen de `golpe(...)`, así que mover la entrada de la música es cambiar `INICIO_MUSICA`. El que entra disolviendo (solo el hook) tiene aquí el `en`
 * de la disolvencia YA TERMINADA: el plano anterior dura hasta él y el siguiente empieza a verse 12 f ANTES.
 */
const P = {
  hook: golpe(GOLPE.hook), //       86 · Isabella ya es opaca; su primera palabra suena 13,9 f después
  paseo: golpe(GOLPE.paseo1), //   207 · acaba el hook; el golpe abre el paseo (a corte)
  escritorio: golpe(GOLPE.paseo2), // 276 · el escritorio y el televisor (a corte)
  mueble: golpe(GOLPE.paseo3), //  369 · el mueble de la pared (a corte)
  mitad: golpe(GOLPE.mitad), //    457 · Isabella con la mitad (a corte)
  cama: golpe(GOLPE.alcoba), //    592 · la cama con su cabecero (a corte)
  ventana: golpe(GOLPE.alcoba2), // 652 · de la cama a la ventana (a corte)
  vista: golpe(GOLPE.vista), //    717 · la ciudad desde el ventanal (a corte)
  cta: golpe(GOLPE.cta), //        790 · Isabella con el CTA (a corte)
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 3,77 s (113 f) y desde `desde` (5 f) hasta el f105 del clip hay 100. Su voz va de 0,58 a 2,96 s (f802,4 a f873,8 de la comp): 16 f (0,53 s) de su cara tras la última
 * palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela: el plano acaba antes del final del clip, que sigue 8 f más.
 */
const DUR_CTA = 100;

/**
 * Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero aquí, 2 f antes del final de la pieza (la tarjeta va en silencio; la canción ya cae sola desde los 207,5 s).
 */
export const FIN_MUSICA_071 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje071: readonly Corte[] = [
  // ── Bloque 1 · el edificio ──
  {
    id: "c01-edificio",
    bloque: 1,
    tipo: "video",
    src: v("dr08"),
    // DR08 (iPhone desde el suelo, 4K HLG → BT.709), del 0,50 al 3,37 s: la torre de piedra clara entre las hojas de monstera y platanillo, con el cielo nublado y un destello de azul. Entra a corte con el golpe de 10,2 dB del f3.
    desde: 0.5,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ highlights: -0.3 }),
    reason:
      "El edificio visto desde el suelo (la promesa): la torre entre las plantas y el cielo. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de que la inversión no sea otro trabajo.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk08"),
    audio: a("hk08-voz"),
    voz: {
      s0: 0.9,
      s1: 4.26,
      lufs: -15,
      dice: "Tu inversión no debería convertirse en otro trabajo.",
    },
    // La voz empieza a los 0,90 s (27 f) y acaba a los 4,26 s (127,8 f: la cola débil de «trabajo» llega hasta ahí); el clip dura 4,47 s (134 f) y el plano lo usa hasta su último fotograma. `desde` 13 f entra DISOLVIENDO
    // (el clip tiene 13 f antes) y la primera palabra suena a los 14 f del `en`: la música baja con curva sobre ellos (10 f). El plano dura 121 f (hasta el golpe del f207): solo 6,2 f tras la última palabra, el tope que da el
    // clip (acaba 6 f después de hablar), en los que la música sube.
    // Isabella, de pie y quieta frente al ventanal con la ciudad y las montañas detrás, con la cama al pie; gesticula con las manos.
    desde: fr(13),
    en: P.hook,
    dur: P.paseo - P.hook,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "La suite con el ventanal y la ciudad detrás (la promesa): Isabella, de pie frente a la ventana, dice «tu inversión no debería convertirse en otro trabajo». Entra disolviendo desde el exterior; la música ya está abajo.",
  },
  // ── Bloque 3 · lo que ya está puesto: el escritorio, el televisor y el mueble ──
  {
    id: "c03-cama-escritorio",
    bloque: 3,
    tipo: "video",
    src: v("rc09"),
    // RC09 (iPhone, 4K HLG), del 2,80 al 5,10 s: la cámara sigue el borde de la colcha de la cama, que se aleja, y descubre el escritorio con su silla azul y la pared del vestidor. Sin personas. Entra A CORTE en el golpe de 11,6 dB que abre el paseo (f207).
    desde: 2.8,
    en: P.paseo,
    dur: P.escritorio - P.paseo,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.06 }),
    reason:
      "De la cama al escritorio (lo que ya está puesto): el borde de la colcha lleva la mirada al escritorio con su silla; el golpe del paseo abre el descubrimiento de una suite lista para trabajar o recibir.",
  },
  {
    id: "c04-escritorio-tv",
    bloque: 3,
    tipo: "video",
    src: v("rc03"),
    // RC03 (iPhone, 4K HLG), del 2,20 al 5,30 s: desde el espejo de la entrada, la cámara se acerca al escritorio de madera con la silla azul y el televisor encendido sobre el mueble. Sin personas.
    desde: 2.2,
    en: P.escritorio,
    dur: P.mueble - P.escritorio,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El escritorio y el televisor (lo que ya está puesto, al detalle): la mesa de trabajo, la silla y la pantalla; todo el equipamiento de la suite a la vista.",
  },
  {
    id: "c05-mueble",
    bloque: 3,
    tipo: "video",
    src: v("rc08"),
    // RC08 (iPhone, 4K HLG), del 2,10 al 5,03 s: el mueble de madera con la escultura y las repisas, la planta y la cortina gris, con la ventana al lado; la cámara sube y se abre. Sin personas.
    desde: 2.1,
    en: P.mueble,
    dur: P.mitad - P.mueble,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "El mueble de la pared con su planta y su cortina (lo que ya está puesto, el ambiente): la repisa, la escultura y la luz del ventanal; cierra el paseo por lo equipado antes de volver con Isabella.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md06"),
    audio: a("md06-voz"),
    voz: {
      s0: 0.53,
      s1: 4.1,
      lufs: -15,
      dice: "Una suite hotelera con operadores turísticos listos para ti.",
    },
    // La voz empieza a los 0,53 s (15,9 f) y acaba a los 4,10 s (123 f); el clip dura 4,50 s (135 f) y se usa ENTERO (`desde` 0): no hay 12 f antes de él para una disolvencia, así que entra A CORTE en el golpe del f457,
    // que suena entero; la música baja con curva en 10 f y la primera palabra suena a los 15,9 f. El plano dura 135 f (hasta el golpe del f592, donde el siguiente acaba de disolver): 12 f tras la última palabra, en los que la música sube.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-071.ts`): la primera mitad de la frase, «una suite hotelera» (whisper oyó «Un asfito atelera», confianza baja).
    // Isabella, de pie frente al ventanal con la cortina gris a un lado y la cama al pie.
    desde: 0,
    en: P.mitad,
    dur: P.cama - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "Frente al ventanal (el valor, dicho): Isabella, de pie con la ciudad detrás, dice «una suite hotelera con operadores turísticos listos para ti». Entra a corte desde el mueble.",
  },
  // ── Bloque 5 · la cama, la ventana y la vista ──
  {
    id: "c07-cabecero",
    bloque: 5,
    tipo: "video",
    src: v("rc05"),
    // RC05 (iPhone, 4K HLG), del 5,00 al 7,00 s: la cama king con su cabecero gris, los tres cuadros y las lámparas colgantes; la cámara se desplaza despacio. Entra A CORTE en el golpe de 11,4 dB del f592.
    desde: 5.0,
    en: P.cama,
    dur: P.ventana - P.cama,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1 }),
    reason:
      "La cama y su cabecero (cómo se vive): la cama king con los cuadros y las lámparas colgantes; lo que se encuentra el huésped al llegar. Entra a corte en el golpe, sobre la última palabra de Isabella ya dicha.",
  },
  {
    id: "c08-ventana",
    bloque: 5,
    tipo: "video",
    src: v("rc10"),
    // RC10 (iPhone, 4K HLG), del 0,00 al 2,17 s: la almohada amarilla en primer plano y la cama que se abre hasta la ventana con la ciudad y las montañas al fondo. El clip dura 2,30 s (69 f); se usan los primeros 65.
    desde: 0,
    en: P.ventana,
    dur: P.vista - P.ventana,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.08, highlights: -0.3, whites: -0.15 }),
    reason:
      "De la cama a la ventana (cómo se vive, hacia la vista): de la almohada y la colcha a la ventana con la ciudad; el paso de lo equipado a lo que se ve desde el piso 9.",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc13"),
    // RC13 (iPhone, 4K HLG), del 2,00 al 4,43 s: la ventana de esquina con las nubes, las montañas y las copas de los árboles de El Poblado; la cámara se acerca. Se salta el principio del clip (la lavandería, 0-1,8 s; el catálogo,
    // §5: no consta que sea de la suite). Entra A CORTE en el golpe de 10,4 dB (f717) y es el plano más largo del bloque 5 (73 f): el clímax. Del clip quedan 3 f más.
    desde: 2.0,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1, highlights: -0.35, whites: -0.2 }),
    reason:
      "La ciudad desde el ventanal (la vista, el clímax): las nubes, las montañas y los árboles de El Poblado desde el piso 9. El plano más largo del bloque.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct09"),
    audio: a("ct09-voz"),
    voz: {
      s0: 0.58,
      s1: 2.96,
      lufs: -15,
      dice: "Hablemos y conoce tus opciones de inversión.",
    },
    // La voz empieza a los 0,58 s (17,4 f) y acaba a los 2,96 s (88,8 f); el clip dura 3,77 s (113 f). Solo hay 17 f antes de su primera palabra, así que entra A CORTE en el golpe del f790 (`desde` 5 f: la primera palabra suena
    // a los 12,4 f del golpe, que suena entero) y la música baja con curva en 10 f. El plano dura 100 f (acaba en el f105 del clip, 8 f antes de su final): 16 f tras la última palabra, en los que la imagen funde a negro.
    // Isabella sentada en la silla del escritorio, con la pizarra de vidrio detrás y la cama borrosa delante.
    desde: fr(5),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, saturation: 1.04 }),
    reason:
      "El escritorio de la suite (la invitación): Isabella, sentada, dice «hablemos y conoce tus opciones de inversión»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-071.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-071/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_071 = P.cta + DUR_CTA + DUR_TARJETA;
