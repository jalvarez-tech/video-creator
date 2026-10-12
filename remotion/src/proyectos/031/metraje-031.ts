/**
 * EL RECORRIDO 031 — «Lote en El Carmen de Viboral (Mia)», V15 del registro y SEGUNDO reel de esta propiedad — los planos, como DATOS.
 *
 * Pedido (2026-10-08): «crea el reel V15 (proyecto 031) del Lote en El Carmen de Viboral (Mia)… es el segundo reel de esta propiedad: debe sentirse distinto del 030 (otro hook, otra mitad,
 * otro CTA, otra canción y otros planos) y romper el scroll». Es la ESTRUCTURA DEL CANAL (la del 030): DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA.
 *
 *   hook   HK06  «Si quieres construir rodeado de la naturaleza, pero con agua y energía disponibles, vente, te muestro.»
 *   mitad  MD04  «Este es el tipo de lote que compras para construir tu casa soñada.»
 *   CTA    CT04  «Si tienes un proyecto en mente, escríbeme y hablamos más sobre este lote.»
 *
 * LA IDEA EN UNA LÍNEA. Este lote es para quien quiere CONSTRUIR en el campo sin renunciar a los servicios: el hook plantea la tensión (rodeado de naturaleza, pero con agua y energía; los dos
 * datos están en la ficha), la mitad le pone nombre al deseo (tu casa soñada) y el CTA pide UNA acción a quien ya tiene el proyecto en la cabeza. El 030 vendía otra cosa (seguridad sin encierro:
 * los dos accesos); aquí las imágenes enseñan DÓNDE se construye y QUÉ se ve desde ahí: la explanada de tierra roja, la cerca de madera con su eucalipto, los taludes en terrazas, la loma con
 * las montañas, la cabaña, y al final la vista que sube del lote al valle y la montaña. Ninguna cifra en pantalla ni en voz: la ficha (3.428 m², COP 800 millones) va al caption.
 *
 *   bloque 1  c01                  el lote desde el aire (DR107, rev. 2: la explanada roja, la cabaña, los pinos y las palmas), SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia
 *   bloque 2  c02                  Isabella camina hacia cámara frente al talud de terrazas: el hook (entra a corte en un golpe)
 *   bloque 3  c03 c04 c05          el paseo: la explanada junto a los eucaliptos (DR103, rev. 1) → la cerca de madera y el eucalipto, a pie (RC05) → los taludes en terrazas (DR101)
 *   bloque 4  c06                  Isabella camina hacia cámara en la loma, con el valle y las montañas detrás: la mitad (a corte en un golpe)
 *   bloque 5  c07 c08 c09          la loma con las montañas, a pie (RC02) → la explanada hacia la cabaña (DR106) → la vista (DR107, el plano más largo)
 *   bloque 6  c10 c11              Isabella junto a la cabaña, con los pinos y las palmas: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * COMPARTE CON LA V14 (030) (declarado): NINGÚN PLANO. Ni hook, ni mitad, ni CTA, ni dron, ni recorrido: los drones son cuatro APAISADOS que el 030 no usó (DR101, DR103, DR106 y DR107, recortados a
 * 9:16 por `normalizar.mjs`; DR107 dos veces, la apertura y la vista, con dos ventanas distintas), y los recorridos RC02 y RC05. (DR108, la apertura de la rev. 0-1, ya no se usa.) La loma es la misma (el rodaje no la sacó de ahí) y el valle del fondo también: es la misma propiedad.
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA, POR GOLPES. «Somewhere inside of me» (Tiesto pres. Allure, chillout remix de Alexander Gorshkov; instrumental en este tramo) tiene un pulso dudoso (~101 BPM, 61 % de los golpes
 * fuertes en su recta): se corta sobre los GOLPES MEDIDOS (`medir-pista.py`, ≥ 6 dB; `proyectos/031/musica/golpes-031.json`) y se comprueba sobre el audio del render (`herramientas/golpes-render.py`, R33). La rejilla sale
 * de `herramientas/buscar-cortes-lp.py` con la estructura del canal y las ventanas REALES de cada plano (835 soluciones; `musica/rejilla-somewhere-835.txt`): la elegida es la de mayor golpe más débil, 11,1 dB (la
 * entrada del CTA), con todos los demás ≥ 11,2 dB; el plano más corto dura 71 f (2,4 s). Todos los `en` salen de `golpe(...)`: mover la entrada de la música es cambiar `INICIO_MUSICA`.
 * LA CANCIÓN. Libre en el registro; reservada para la V15 (`archivos/musica/registro-de-uso.md`). Medida, no oída.
 *
 * TRES TOMAS QUE ENTRAN A CORTE (como en el 030: las tomas tienen 0,47-0,93 s de aire antes de hablar, no los 12 frames de clip que pide una disolvencia ANTES de la primera sílaba y a la vez un hueco para que la música
 * baje). Cada una entra A CORTE en un golpe medido de 11,1-14,8 dB, que suena ENTERO; la música baja con curva de coseno DESPUÉS (6-7 f) y la primera sílaba suena a los 8,5 · 7,9 · 8,1 f del golpe, con la curva ya acabada.
 * Para eso `desde` es MÁS PEQUEÑO que su primera palabra (11 · 20 · 6 f): el aire de la toma se queda dentro del plano.
 *
 * LOS DRONES SE ELIGIERON POR SU MOVIMIENTO (aprendizaje del 030, rev. 1): cada tramo es una ventana de velocidad constante medida con `herramientas/movimiento.py`, `ventanas-uniformes.py` y `ventana-fina.py`
 * (diferencia media entre fotogramas: dispersión < 0,09, pendiente ≈ 0, máximo < 1,2× la media). Los números de cada uno, en su comentario.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(11)` = 11/30 s) para que imagen y voz corten en la MISMA muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS:
 * cada `en` es el fin del anterior.
 *
 * TRANSICIONES. Corte seco en los diez cambios de plano (cada uno sobre un golpe de la canción); el único fundido es el de la última imagen de Isabella a negro (`FundidoACierre`). Nada más.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal): Isabella no habla hasta f106, 3,5 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. PASADA FINAL (2026-10-09, «coloriza y haz el
 * render final»): la luz ya estaba igualada (σ de luma 6,8) y la saturación no (los drones y las tomas nubladas, 0,14-0,29; los planos con cielo azul, 0,43-0,53): los apagados suben a `saturation` 1,12 y `vibrance`
 * 0,03-0,05 (nunca en la vista, por la malla gris), y las tomas de Isabella del talud y la cabaña, a 1,05/1,04 con `vibrance` 0,03-0,04. Saturación media 0,295 → 0,319 (σ 0,113 → 0,095), la piel en su tono. Con `color` el render lleva `--gl=angle` y la
 * prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-031.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-031";

export const FPS_031 = 30;

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
  /** `foto` solo para la tarjeta oscura del cierre (`c11-cierre`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella: el WAV de su voz TRATADA (`<toma>-voz.wav`, `normalizar.mjs`). */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido del usuario: «la voz de Isabella sube a −15 LUFS sin saturar»). Las voces llegan a −21,9 · −23,5 · −21,5 LUFS en su ventana de voz; cada una pasa
 * por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1, ganancia de +18,3 · +19,3 · +18,6 dB y limitador a −2,5 dBFS) hasta −15,0 · −15,1 · −15,1 LUFS con pico real de −2,5 dBFS, así que el plan no
 * añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29 («una ganancia por toma y nada más»), por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Somewhere inside of me» — `archivos/musica/Tiesto pres. Allure - Somewhere inside οf me (Alexander Gorshkov chillout remix).mp3` (sha 8 `96faa93f`), chillout / trance melódico, 5:47. Se entra en su golpe de
 * 301,208 s (12,3 dB) y de ahí suena a −9,4…−11,2 LUFS de meseta (una pista muy alta: picos de +0,2 dBFS en el archivo) hasta su fundido final hacia los 333 s. Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz,
 * subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir») en que entra cada plano, con su fuerza en dB por 15 ms: `proyectos/031/musica/golpes-031.json` (`medir-pista.py --json`). Salen de
 * `buscar-cortes-lp.py`.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 0 (el lote, a corte). */
  apertura: { t: 301.208, db: 12.3 },
  /** Isabella entra A CORTE con el hook; su primera sílaba suena 8,5 f después. */
  hook: { t: 304.33, db: 14.8 },
  /** Acaba el hook (24,5 f tras su última palabra); la explanada roja, cenital. */
  explanada: { t: 310.262, db: 15.0 },
  /** La cerca de madera y el eucalipto, a pie. */
  cerca: { t: 312.617, db: 11.2 },
  /** Los taludes en terrazas. */
  taludes: { t: 315.022, db: 13.6 },
  /** Isabella entra A CORTE con la mitad; su primera sílaba suena 7,9 f después. */
  mitad: { t: 317.843, db: 11.2 },
  /** Acaba la mitad (25 f tras su última palabra): la loma con las montañas, a pie (el golpe más fuerte de la pieza). */
  loma: { t: 322.142, db: 17.8 },
  /** La explanada hacia la cabaña. */
  cabana: { t: 324.527, db: 12.7 },
  /** La vista: DR107 sube del lote al valle y la montaña (el plano más largo del bloque 5). */
  vista: { t: 326.899, db: 13.4 },
  /** Isabella entra A CORTE con el CTA (el golpe más débil de la pieza); su primera sílaba suena 8,1 f después. */
  cta: { t: 330.465, db: 11.1 },
} as const;

/**
 * LA CAÍDA FINAL de la canción: su fundido de salida. En LUFS por tramos de 5 s el primer instante que cumple (≥ 9 dB a 5 s y ≥ 20 a 10 s) es `t` = 333,25 s: ebur128 sobre `musica-031.wav` da −9,4 antes,
 * −19,8 en los 5 s siguientes (10,4 dB) y −46,4 en los 5 s tras ellos (37,0 dB); la pista acaba a los 347 s. No es un golpe sino un cambio de nivel: la resolución de esta pieza, dentro de la toma del CTA.
 */
export const DECAE = { t: 333.25, lufsAntes: -9.4, lufs5s: -19.8, lufs10s: -46.4 } as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: 50 ms antes del golpe de entrada (301,208 s), redondeado a un frame (9035/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 9035 / FPS_031;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte caiga en el
 * frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_031;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_031;

/** Isabella: un empuje lento hacia ella (camina hacia cámara: el empuje la acompaña). El recorrido, quieto: la cámara ya avanza. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-031/${id}.mp4`;
const a = (id: string): string => `recorrido-031/${id}.wav`;

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
  hook: golpe(GOLPE.hook), //             97 · Isabella entra a corte; su primera palabra, 8,5 f después
  explanada: golpe(GOLPE.explanada), //   274 · acaba el hook; la explanada roja
  cerca: golpe(GOLPE.cerca), //           345 · la cerca de madera y el eucalipto
  taludes: golpe(GOLPE.taludes), //       417 · los taludes en terrazas
  mitad: golpe(GOLPE.mitad), //           502 · Isabella entra a corte con la mitad
  loma: golpe(GOLPE.loma), //             631 · la loma con las montañas
  cabana: golpe(GOLPE.cabana), //         702 · la explanada hacia la cabaña
  vista: golpe(GOLPE.vista), //           774 · la vista, el plano más largo del bloque 5 (107 f)
  cta: golpe(GOLPE.cta), //               881 · Isabella entra a corte con el CTA
} as const;

/**
 * Frames que dura la toma del CTA (CT04): el clip dura 5,10 s (153 f) y desde `desde` (6 f = 0,20 s) le quedan 147. Su voz acaba a los 3,98 s (f994 de la comp): 13,6 f (0,45 s) de su cara tras la última palabra,
 * en los que la imagen funde a negro (los últimos 6). Nada se congela: el plano acaba en el f133 del clip, a 20 f de su final.
 */
const DUR_CTA = 127;

/**
 * Dónde acaba la música (frame de la comp). La canción cae en el f964 (333,25 s), dentro de la toma del CTA, y su fundido llega a −46 LUFS hacia los 338 s: la envolvente la lleva a cero 2 f antes del final de la pieza,
 * bajo la tarjeta.
 */
export const FIN_MUSICA_031 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje031: readonly Corte[] = [
  // ── Bloque 1 · el lote ──
  {
    id: "c01-lote",
    bloque: 1,
    tipo: "video",
    src: v("dr107a"),
    // DR107 (apaisado, recortado a 9:16 en 0,38: `dr107a`, otra ventana del mismo clip que la vista), del 29,80 al 33,03 s: el dron avanza bajo sobre la explanada de tierra roja hacia la cabaña de madera, con los
    // pinos, las palmas y los tejados rojos detrás y la ladera del valle arriba. El tramo más uniforme de todos los drones libres (movimiento 2,9, dispersión del 3,1 %, máximo 1,13× la media). Ninguna versión
    // la había usado. Entra a corte con el golpe de 12,3 dB (no nace de negro).
    // REVISIÓN 2 (pedido del usuario: «cambia la toma del primer video»): sustituye a DR108 17,80-21,03 s (el lote desde más alto, con la cabaña pequeña y el valle con sus casas y la ladera cubierta de malla
    // arriba). Se descartó DR106 21,0-24,2 s (uniforme, pero es el mismo vuelo que la cabaña del bloque 5, c08, y se repetiría). Comparte CLIP con la vista (c09, DR107 34,00-37,57 s, ventana 0,70): son dos
    // tramos distintos del mismo vuelo, 1 s aparte, y dos zonas distintas del cuadro (aquí la cabaña y los pinos; allí las palmas, el valle y la montaña). Declarado.
    desde: fr(894),
    en: 0,
    dur: P.hook,
    zoom: [1.0, 1.05],
    entra: "corte",
    color: color({ highlights: -0.35, whites: -0.2, saturation: 1.12, vibrance: 0.03 }),
    reason:
      "Lote (la promesa): la explanada de tierra roja donde se construiría, con la cabaña de madera, los pinos y las palmas detrás; es lo que se vende, visto de cerca desde el aire, y entra con el golpe de apertura de la música. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia. Entra a corte: no nace de negro.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk06"),
    audio: a("hk06-voz"),
    voz: {
      s0: 0.65,
      s1: 5.45,
      lufs: -15.0,
      dice: "Si quieres construir rodeado de la naturaleza, pero con agua y energía disponibles, vente, te muestro.",
    },
    // La voz empieza a los 0,65 s (19,5 f; antes, 0,6 s de chasquidos a −48/−55 dB que la ventana de la voz tratada deja en silencio) y acaba a los 5,45 s (163,5 f); el clip dura 6,33 s (190 f). `desde` 11 f entra
    // A CORTE en el golpe de 14,8 dB del f97 (suena entero: la música baja en los 7 f siguientes) y la primera sílaba suena a los 8,5 f del golpe, con la curva ya acabada. El plano dura 177 f (hasta el golpe del f274):
    // 24,5 f tras la última palabra; el clip aguanta 179.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-031.ts`): «rodeado de (la) naturaleza» (≈ 4,1 s del vídeo), «pero» (≈ 5,6 s) y «agua y energía» (≈ 5,8 s), y «vente, te muestro» (≈ 7,6 s).
    // Isabella camina hacia cámara frente al talud de terrazas, de cuerpo entero: el empuje la acompaña.
    desde: fr(11),
    en: P.hook,
    dur: P.explanada - P.hook,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ saturation: 1.05, contrast: 1.05, highlights: -0.3, whites: -0.2, vibrance: 0.04 }),
    reason:
      "Talud (el filtro): Isabella camina hacia cámara frente al talud de terrazas y dice «si quieres construir rodeado de la naturaleza, pero con agua y energía disponibles, vente, te muestro»: la tensión (campo contra servicios) que el resto contesta. Entra a corte en un golpe de la música.",
  },
  // ── Bloque 3 · el paseo: la explanada, la cerca y los taludes ──
  {
    id: "c03-explanada",
    bloque: 3,
    tipo: "video",
    src: v("dr103"),
    // DR103 (apaisado, recortado a 9:16 en 0,40), del 17,90 al 20,27 s: el dron avanza junto a la hilera de eucaliptos, con la ladera verde y la explanada de tierra roja debajo; la cabaña asoma al final.
    // Velocidad constante (movimiento 6,8, dispersión del 4,1 %, máximo 1,11× la media). Ninguna versión la había usado.
    // REVISIÓN 1 (pedido del usuario: «cambia la toma del 0:09»; leída como la que ENTRA justo después de ese segundo, f274 = 9,13 s): sustituye al 3,90-6,27 s del mismo clip, la explanada roja en cenital,
    // que se leía como una textura de tierra y no como el lote. Se descartaron RC03 (la sombra de quien graba ocupa el pie del cuadro), DR108 11,7 s (repite la apertura) y DR105 8,9 s (repite la cabaña de c08).
    desde: fr(537),
    en: P.explanada,
    dur: P.cerca - P.explanada,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.35, shadows: 0.2, saturation: 1.12, vibrance: 0.03 }),
    reason:
      "Explanada y eucaliptos (donde se construye): tras «vente, te muestro», el dron avanza junto a la hilera de eucaliptos que bordea el lote, con la ladera verde y la explanada de tierra roja debajo; es el sitio de la casa, rodeado de naturaleza, y la cámara avanza sobre él.",
  },
  {
    id: "c04-cerca",
    bloque: 3,
    tipo: "video",
    src: v("rc05"),
    // RC05 (IMG_1583), del 1,60 al 4,00 s: a pie junto a la cerca de madera, con el eucalipto grande, el valle y el cielo azul; la cámara se desliza hacia la derecha a velocidad constante (movimiento 6,1, dispersión
    // del 3,7 %). Las voces ajenas de la toma no se oyen: el plano va mudo. Ninguna versión la había usado.
    desde: fr(48),
    en: P.cerca,
    dur: P.taludes - P.cerca,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.05, contrast: 1.04, highlights: -0.35, whites: -0.2, saturation: 1.0 }),
    reason:
      "Cerca y eucalipto (rodeado de naturaleza): del aire a pie; la cerca de madera con el eucalipto grande y el valle detrás es lo que el hook prometía alrededor de la casa, a la altura de quien llega.",
  },
  {
    id: "c05-taludes",
    bloque: 3,
    tipo: "video",
    src: v("dr101"),
    // DR101 (apaisado, recortado a 9:16 en 0,35), del 5,30 al 8,13 s: los taludes en terrazas de frente, con la franja de tierra roja arriba, la cerca viva y la loma con sus eucaliptos; el dron se desplaza
    // despacio y a velocidad constante (movimiento 1,8, dispersión del 6 %). Ninguna versión la había usado. (Su tramo de 13,8-16,7 s, con las palmas, decelera: pendiente −0,23 y un máximo de 1,4×; se descartó.)
    desde: fr(159),
    en: P.taludes,
    dur: P.mitad - P.taludes,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.12, highlights: -0.4, whites: -0.25, saturation: 1.12, vibrance: 0.05 }),
    reason:
      "Taludes (la medida): las terrazas engramadas de frente, con la tierra roja arriba, dan la escala del lote y son el último paso del paseo antes de que Isabella vuelva.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md04"),
    audio: a("md04-voz"),
    voz: {
      s0: 0.93,
      s1: 4.13,
      lufs: -15.1,
      dice: "Este es el tipo de lote que compras para construir tu casa soñada.",
    },
    // La voz empieza a los 0,93 s (27,9 f) y acaba a los 4,13 s (123,9 f); el clip dura 5,17 s (155 f). `desde` 20 f entra A CORTE en el golpe de 11,2 dB del f502 (suena entero: la música baja en los 6 f siguientes)
    // y la primera sílaba suena a los 7,9 f del golpe. El plano dura 129 f (hasta el golpe del f631): 25 f tras la última palabra; el clip aguanta 135.
    // Isabella camina hacia cámara en la loma, con el valle, las montañas y las nubes detrás. Todas sus palabras, con confianza ≥ 0,6 en whisper.
    desde: fr(20),
    en: P.mitad,
    dur: P.loma - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ saturation: 1.0, contrast: 1.04, highlights: -0.35, whites: -0.2 }),
    reason:
      "Loma (el deseo): Isabella, en la loma con el valle y las montañas detrás, dice «este es el tipo de lote que compras para construir tu casa soñada»: le pone nombre a lo que el hook prometía. Entra a corte en un golpe.",
  },
  // ── Bloque 5 · la loma, la cabaña y la vista ──
  {
    id: "c07-loma",
    bloque: 5,
    tipo: "video",
    src: v("rc02"),
    // RC02 (IMG_1580), del 1,00 al 3,37 s: a pie en la loma, una panorámica lenta hacia la izquierda sobre la hierba, con las montañas y el cielo azul; velocidad constante (movimiento 3,8, dispersión del 1,6 %).
    // Ninguna versión la había usado. Entra a corte en el golpe más fuerte de la pieza (17,8 dB).
    desde: fr(30),
    en: P.loma,
    dur: P.cabana - P.loma,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1, contrast: 1.04, highlights: -0.35, whites: -0.2, saturation: 1.0 }),
    reason:
      "Loma (cómo se vive): tras «tu casa soñada», la hierba de la loma con las montañas y el cielo azul, a la altura de quien la camina: lo que tendría delante la casa.",
  },
  {
    id: "c08-cabana",
    bloque: 5,
    tipo: "video",
    src: v("dr106"),
    // DR106 (apaisado, recortado a 9:16 en 0,75), del 18,10 al 20,50 s: el dron avanza sobre la explanada hacia la cabaña de madera, con los pinos y las palmas detrás; velocidad constante (movimiento 5,5,
    // dispersión del 2,9 %). Ninguna versión la había usado.
    desde: fr(543),
    en: P.cabana,
    dur: P.vista - P.cabana,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.05, saturation: 1.12, vibrance: 0.03 }),
    reason:
      "Cabaña (lo que ya hay): la explanada lleva a la cabaña de madera entre los pinos y las palmas; es lo único construido del lote y el sitio desde el que Isabella hará la invitación.",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("dr107"),
    // DR107 (apaisado, recortado a 9:16 en 0,70), del 34,00 al 37,57 s: desde la explanada y las palmas, la cámara sube y levanta la mirada hasta el valle, la montaña y el cielo; velocidad constante (movimiento 8,0,
    // dispersión del 6,7 %, máximo 1,11× la media; después decelera y se para a los 41 s, y ese tramo no entra). Ninguna versión la usó. Es el plano más largo del bloque 5 (107 f) y el clímax del paseo: la vista
    // panorámica de la ficha. Entra a corte en un golpe de 13,4 dB.
    desde: fr(1020),
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ highlights: -0.45, whites: -0.3, saturation: 1.12 }),
    reason:
      "La vista (el clímax): sobre las palmas y la explanada, la cámara sube hasta el valle, la montaña y el cielo; es la vista panorámica del lote y el plano más largo del bloque. Entra a corte en un golpe.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct04"),
    audio: a("ct04-voz"),
    voz: {
      s0: 0.47,
      s1: 3.98,
      lufs: -15.1,
      dice: "Si tienes un proyecto en mente, escríbeme y hablamos más sobre este lote.",
    },
    // La voz empieza a los 0,47 s (14,1 f) y acaba a los 3,98 s (119,4 f); el clip dura 5,10 s (153 f). `desde` 6 f entra A CORTE en el golpe de 11,1 dB del f881 (suena entero: la música baja en los 6 f siguientes) y la
    // primera sílaba suena a los 8,1 f. El plano acaba en el f133 del clip (6 + 127). La caída final de la canción (333,25 s) cae a los 83 f de la entrada (f964), dentro de «…hablamos más sobre este lote».
    // Isabella camina hacia cámara junto a la cabaña, con los pinos y las palmas detrás. Todas sus palabras, con confianza ≥ 0,6 en whisper.
    desde: fr(6),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ saturation: 1.04, contrast: 1.05, highlights: -0.35, whites: -0.2, vibrance: 0.03 }),
    reason:
      "Cabaña (la invitación): Isabella, junto a la cabaña con los pinos y las palmas detrás, dice «si tienes un proyecto en mente, escríbeme y hablamos más sobre este lote», una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-031.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-031/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_031 = P.cta + DUR_CTA + DUR_TARJETA;
