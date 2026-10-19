/**
 * EL RECORRIDO 040 — «Lote en El Carmen de Viboral (Mia)», V23 del registro y QUINTO reel de esta propiedad, «LA VISTA» — los planos, como DATOS.
 *
 * Pedido (2026-10-17): «un reel 9:16 con Isabella y el ángulo LA VISTA: despertar con esta vista al atardecer → el lote para tu casa soñada → escríbeme "lote"», con la estructura del canal
 * (DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA), tres frases de Isabella y los cuatro drones NUEVOS del 2026-10-14, rodados al atardecer (17:41-17:55): DR202, DR209, DR234 y DR236.
 *
 *   hook   HK05  «Imagina despertar todos los días con esta vista y tener más de 3000 metros cuadrados para tu proyecto.»   (la ÚNICA cifra de la pieza)
 *   mitad  MD04  «Este es el tipo de lote que compras para construir tu casa soñada.»                                      (la usó la V15: REPETIDA, declarado)
 *   CTA    CT02  «Si quieres conocerlo, escríbeme lote y te envío toda la información.»                                    (la frase del CT01 de la V14; la reservó la V22, sin final: REPETIDA, declarado)
 *
 * LA IDEA EN UNA LÍNEA. Este lote es PARA QUIEN QUIERE DESPERTAR CON ESA VISTA: el hook la promete («despertar todos los días con esta vista»), el paseo la enseña al atardecer sobre el propio
 * lote (las terrazas de tierra roja y el sol sobre el horizonte), la mitad la convierte en proyecto («tu casa soñada») y el bloque 5 la sube a su punto más alto: el cielo rosa sobre las palmas
 * y, al final, el valle con sus casas (DR234, 4,5 s, el plano más largo). La luz hace de hilo: el oro del principio (DR202, DR209: 17:41-17:44) pasa al rosa del final (DR236, DR234: 17:54),
 * en el mismo orden en que se rodó. Ninguna distancia, ningún tiempo, ninguna conexión: la ficha no los da.
 *
 *   bloque 1  c01                  DR202: el sol en el horizonte sobre las terrazas y el árbol (frame 0 = la vista al atardecer), SIN TEXTO NI VOZ
 *   bloque 2  c02                  Isabella en la loma, de día: el hook (entra a corte en un golpe)
 *   bloque 3  c03 c04 c05          el lote al atardecer: terrazas y cielo dorado (DR209) → el sol bajo (DR202) → la silueta del árbol en contraluz (DR209)
 *   bloque 4  c06                  Isabella: la mitad (a corte en un golpe)
 *   bloque 5  c07 c08 c09          el cielo rosa sobre las palmas (DR236, dos tramos) → LA VISTA, 4,5 s: nubes rosadas sobre el valle y sus casas (DR234, el plano más largo)
 *   bloque 6  c10 c11              Isabella: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA, POR GOLPES. «Overcoming the Impossible» (Aleksey Chistilin, cinematic épico / híbrido orquestal; biblioteca del repo) se entra en su golpe de 172,715 s (15,0 dB)
 * y se corta CADA plano en un golpe medido de 9,4 a 11,9 dB (`herramientas/buscar-cortes-039.py` y `rejilla-040.py`; `musica/golpes-overcoming.json`). Cae en +31 s (a −18,9 LUFS), justo donde
 * entra el CTA (golpe de 11,9 dB): la voz de Isabella queda sobre un lecho. Medida, no oída. TODOS los cortes son secos.
 *
 * LOS DRONES, ELEGIDOS POR SU MOVIMIENTO MEDIDO (`herramientas/perfil-dron.py` y `medir-ventana-040.py`): son vuelos lentos y con cielo (poca textura), así que la diferencia media entre fotogramas
 * es baja (0,5-1,4) pero constante dentro de cada ventana (σ/μ ≤ 0,07). Cada uno arranca despacio (los primeros 1,5-2 s están casi quietos) y las ventanas empiezan DESPUÉS. Los números de cada
 * uno, en su comentario. A los DJI de 29,97 fps se les aplicó `setpts=PTS*1000/1001` antes de `fps=30` (`normalizar.mjs`): sin eso repiten un fotograma cada ≈ 33 s.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(11)` = 11/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f117, 3,9 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva
 * `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12). OJO: Isabella está grabada DE DÍA y los drones al atardecer; el color casa los planos entre sí
 * sin vestir de atardecer a Isabella ni de día a los drones.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-040.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-040";

export const FPS_040 = 30;

export type Entrada = "corte" | "disolver";
export type Bloque = 1 | 2 | 3 | 4 | 5 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. `s0`/`s1`, medidos por energía (perfil de 50 ms) y por arranques de sílaba; `lufs`, con ebur128 sobre el WAV TRATADO que suena. */
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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido del usuario, ya regla del canal: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −24,1 · −23,5 · −20,5 LUFS en su ventana de voz; cada una
 * pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS) hasta ≈ −15 LUFS con el
 * pico real a −2,5 dBFS, así que el plan no añade ganancia (`lufs` = lo medido).
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Overcoming the Impossible» — `archivos/musica/Aleksey Chistilin - Overcoming the Impossible.mp3` (sha 8 `856aff24`), 3:40. Se entra en su golpe de 172,715 s (15,0 dB) y de ahí suena a −8…−13 LUFS
 * (picos de 0,0 a +0,1 dBFS: la música sola, a −15, es BAJARLA 3,4-6,1 dB) hasta el 203,7 s, donde cae. Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de
 * «empieza a subir») en que entra cada plano, con su fuerza en dB por 15 ms: `proyectos/040/musica/golpes-overcoming.json` (`medir-pista.py --json`). Salen de `buscar-cortes-039.py` y `rejilla-040.py`
 * (`musica/buscar-cortes-040-*.txt`), con la entrada y la caída fijas y los planos dentro de sus rangos.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (el dron, a corte; no nace de negro). */
  apertura: { t: 172.715, db: 15.0 },
  /** Isabella entra A CORTE con el hook; su primera sílaba suena 9 f después. */
  hook: { t: 176.228, db: 10.2 },
  /** El lote al atardecer: el primer plano del paseo. */
  terrazas: { t: 182.773, db: 9.6 },
  /** El sol bajo sobre el horizonte. */
  sol: { t: 186.183, db: 9.5 },
  /** La silueta del árbol en contraluz. */
  arbol: { t: 189.339, db: 10.7 },
  /** Isabella entra A CORTE con la mitad; su primera sílaba suena 9,5 f después. */
  mitad: { t: 192.111, db: 10.2 },
  /** El cielo rosa sobre las palmas (primer tramo). */
  palmas: { t: 196.26, db: 9.9 },
  /** El cielo rosa sobre las palmas (segundo tramo, más cerca). */
  palmas2: { t: 197.642, db: 11.6 },
  /** LA VISTA, el plano más largo de la pieza. */
  vista: { t: 199.259, db: 9.4 },
  /** Isabella entra A CORTE con el CTA, en la caída de la canción; su primera sílaba suena 9 f después. */
  cta: { t: 203.775, db: 11.9 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: 50 ms antes del golpe de entrada (172,715 s), redondeado a un frame (5180/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 5180 / FPS_040;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_040;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_040;

/** Isabella: un empuje lento hacia ella (camina hacia cámara: el empuje la acompaña). Los drones, quietos: la cámara ya vuela. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-040/${id}.mp4`;
const a = (id: string): string => `recorrido-040/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE de esta pieza: la del canal (contraste con cuerpo, negros hundidos, luces recogidas, un punto cálido y +10 % de saturación), con las SOMBRAS más abiertas porque los drones del atardecer
 * están expuestos para el cielo y la tierra (terrazas, árboles) cae a casi negro. Orden del efecto: exposición → balance de blancos → sombras/luces/blancos/negros → contraste → saturación → vibrance.
 * `vibrance` ≤ 0,05 (sobre el cielo rosa vuelve las nubes de un rosa de plástico) y las tomas de Isabella, `saturation` ≤ 1,06: la piel se queda donde estaba. El AJUSTE de cada plano se mide
 * (`herramientas/medir-color.py`), no se hereda.
 */
const COLOR_BASE: ColorCine = {
  contrast: 1.12,
  blacks: -0.06,
  shadows: 0.2,
  highlights: -0.25,
  whites: -0.1,
  temperature: 0.02,
  saturation: 1.1,
  vibrance: 0.02,
};

/** El color de un plano: la base más el ajuste de su toma (medido, `medir-color.py`). */
const color = (ajuste: ColorCine = {}): ColorCine => ({ ...COLOR_BASE, ...ajuste });

/**
 * El frame de cada cambio de plano: el del golpe de la canción en que entra (arriba). TODOS los cortes son secos y caen en un golpe medido.
 */
const P = {
  hook: golpe(GOLPE.hook), //         108 · Isabella entra a corte; su primera palabra, 9 f después
  terrazas: golpe(GOLPE.terrazas), // 305 · acaba el hook y entra el paseo
  sol: golpe(GOLPE.sol), //           407 · el sol bajo
  arbol: golpe(GOLPE.arbol), //       502 · la silueta del árbol
  mitad: golpe(GOLPE.mitad), //       585 · Isabella entra a corte con la mitad
  palmas: golpe(GOLPE.palmas), //     709 · el cielo rosa sobre las palmas
  palmas2: golpe(GOLPE.palmas2), //   751 · el segundo tramo
  vista: golpe(GOLPE.vista), //       799 · la vista, el plano más largo de la pieza (136 f)
  cta: golpe(GOLPE.cta), //           935 · Isabella entra a corte con el CTA
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 4,20 s (126 f) y desde `desde` (3 f) le quedan 123. Su voz va de 0,40 a 3,90 s (f944-1049 de la comp): 9 f (0,3 s) de su cara tras la última palabra, en los que la
 * imagen funde a negro (los últimos 6). Nada se congela: el plano acaba en el último fotograma del clip.
 */
const DUR_CTA = 123;

/**
 * Dónde acaba la música (frame de la comp): se apaga en curva bajo la tarjeta y llega a cero 2 f antes del final de la pieza.
 */
export const FIN_MUSICA_040 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje040: readonly Corte[] = [
  // ── Bloque 1 · la vista, al atardecer ──
  {
    id: "c01-apertura",
    bloque: 1,
    tipo: "video",
    src: v("dr202"),
    // DR202 (vertical, 4K, 2026-10-14 17:41), del 1,50 al 5,10 s: el sol bajo sobre el horizonte, las nubes doradas, un eucalipto en contraluz y, abajo, las terrazas de tierra roja del lote. El dron sube y se
    // adelanta muy despacio (diferencia media 0,50, σ/μ 0,05 de 1,5 a 5,1 s; los primeros 1,5 s están casi quietos y NO se usan). Ninguna versión usó este clip. Entra a corte con el golpe de 15,0 dB del f3
    // (no nace de negro) y el frame 0 ya es la miniatura: el atardecer sobre el lote, sin texto ni voz.
    desde: 1.5,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0, shadows: 0.45, blacks: 0, highlights: -0.4, whites: -0.25 }),
    reason:
      "Cielo → lote (la promesa): el sol bajo sobre el horizonte y las terrazas del propio lote al atardecer: la vista, antes de que ella diga «esta vista». Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk05"),
    audio: a("hk05-voz"),
    voz: {
      s0: 0.305,
      s1: 5.72,
      lufs: -15.0,
      dice: "Imagina despertar todos los días con esta vista y tener más de 3000 metros cuadrados para tu proyecto.",
    },
    // La voz empieza a los 0,305 s (9,15 f) y acaba a los 5,72 s (171,6 f); el clip dura 6,67 s (200 f). Antes de 0,25 s solo hay ruido de sala a −47…−59 dB (el WAV tratado es silencio ahí). `desde` 0 entra A CORTE en el
    // golpe de 10,2 dB del f108 (suena entero: la música baja con curva DESPUÉS) y la primera sílaba suena a los 9,15 f del golpe. El plano dura 197 f (hasta el golpe del f305): 25,4 f tras la última palabra.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-040.ts`): la cifra «3000» (f198-210 de la comp; whisper conf. 0,53: que dice «tres mil»).
    // Isabella habla a cámara en la loma, de día, con el valle detrás.
    desde: 0,
    en: P.hook,
    dur: P.terrazas - P.hook,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.08, shadows: 0.1, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "Loma (la promesa): Isabella dice «imagina despertar todos los días con esta vista y tener más de 3000 metros cuadrados para tu proyecto»: la vista como deseo y la medida como razón, en la única cifra de la pieza. Entra a corte en un golpe.",
  },
  // ── Bloque 3 · el lote al atardecer: tres planos de 2,8-3,4 s, cada uno en un golpe ──
  {
    id: "c03-terrazas",
    bloque: 3,
    tipo: "video",
    src: v("dr209"),
    // DR209 (vertical, 4K, 2026-10-14 17:44), del 13,00 al 16,40 s: las terrazas de tierra roja con el cielo azul y dorado y una nube oscura arriba; el dron baja y se adelanta (diferencia media 1,07-1,12, σ/μ 0,02:
    // el tramo MÁS uniforme del clip). Ninguna versión usó este clip.
    desde: 13.0,
    en: P.terrazas,
    dur: P.sol - P.terrazas,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.1, shadows: 0.45, blacks: 0, highlights: -0.4, whites: -0.25 }),
    reason:
      "Terrazas (el lote): tras «para tu proyecto», el lote de verdad: las terrazas de tierra roja bajo el cielo dorado del atardecer, vistas desde el aire.",
  },
  {
    id: "c04-sol",
    bloque: 3,
    tipo: "video",
    src: v("dr202"),
    // DR202, del 9,00 al 12,17 s: el sol sobre el horizonte y las nubes que se oscurecen a la derecha, con el eucalipto (diferencia media 0,75-0,90, σ/μ 0,02-0,05: el tramo uniforme del clip). La apertura usó 1,50-5,10 s:
    // este tramo no comparte ni un fotograma con ella.
    desde: 9.0,
    en: P.sol,
    dur: P.arbol - P.sol,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.05, shadows: 0.45, blacks: 0, highlights: -0.35, whites: -0.2 }),
    reason:
      "Sol bajo (el momento): el sol sobre el horizonte con las nubes oscureciéndose: el instante en que se ve el lote cuando alguien se despierta o se despide del día. Otro vuelo, otro ángulo.",
  },
  {
    id: "c05-arbol",
    bloque: 3,
    tipo: "video",
    src: v("dr209"),
    // DR209, del 19,00 al 21,77 s: más tarde, más oscuro: el cielo naranja y, a la derecha, la silueta del árbol en contraluz que crece según el dron se adelanta (diferencia media 1,24-1,36, σ/μ 0,03). Es el
    // «las terrazas que se oscurecen hasta la silueta de un árbol» de la descripción del clip. Último plano antes de que vuelva ella.
    desde: 19.0,
    en: P.arbol,
    dur: P.mitad - P.arbol,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.2, shadows: 0.4, blacks: 0, highlights: -0.55, whites: -0.4 }),
    reason:
      "Árbol en contraluz (la escala): el vuelo de las terrazas, minutos después: el cielo se enciende, el árbol se vuelve silueta y el lote queda debajo: lo que hay alrededor. Último plano antes de que vuelva ella.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md04"),
    audio: a("md04-voz"),
    voz: {
      s0: 0.95,
      s1: 4.13,
      lufs: -15.1,
      dice: "Este es el tipo de lote que compras para construir tu casa soñada.",
    },
    // La voz empieza a los 0,95 s (28,5 f) y acaba a los 4,13 s (123,9 f); el clip dura 5,17 s (155 f) y tiene 0,95 s de silencio (−60…−73 dB) al principio. `desde` 19 f entra A CORTE en el golpe de 10,2 dB del f585
    // (suena entero: la música baja DESPUÉS) y la primera sílaba suena a los 9,5 f del golpe. El plano dura 124 f (hasta el golpe del f709): 19 f tras la última palabra.
    // Isabella habla a cámara en la loma, de día.
    desde: fr(19),
    en: P.mitad,
    dur: P.palmas - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.08, shadows: 0.1, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "Loma (la razón): Isabella dice «este es el tipo de lote que compras para construir tu casa soñada»: la vista se vuelve proyecto. Entra a corte en un golpe.",
  },
  // ── Bloque 5 · el cielo rosa y la vista ──
  {
    id: "c07-palmas",
    bloque: 5,
    tipo: "video",
    src: v("dr236"),
    // DR236 (vertical, 4K, 2026-10-14 17:54), del 7,50 al 8,90 s: el cielo rosa y gris sobre la hilera de palmas con un coche blanco junto a la cerca; el dron se adelanta despacio (diferencia media 0,82-0,91, σ/μ 0,03).
    // La luz pasa del oro (bloque 3) al rosa: once minutos después en el rodaje.
    desde: 7.5,
    en: P.palmas,
    dur: P.palmas2 - P.palmas,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0, shadows: 0.2, highlights: -0.3, whites: -0.15, saturation: 1.06 }),
    reason:
      "Palmas (lo de alrededor): el cielo se vuelve rosa sobre la hilera de palmas junto al lote: el campo que rodea la casa que sueña.",
  },
  {
    id: "c08-palmas",
    bloque: 5,
    tipo: "video",
    src: v("dr236"),
    // DR236, del 9,50 al 11,10 s: más cerca de las palmas y con el cielo más abierto (diferencia media 1,04-1,30, σ/μ 0,03). Sigue el vuelo del plano anterior sin un fotograma en común.
    desde: 9.5,
    en: P.palmas2,
    dur: P.vista - P.palmas2,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0, shadows: 0.2, highlights: -0.3, whites: -0.15, saturation: 1.06 }),
    reason:
      "Palmas, más cerca (el descubrimiento): el vuelo sigue hacia las palmas y el cielo se abre: lo que viene es la vista entera.",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("dr234"),
    // DR234 (vertical, 4K, 2026-10-14 17:54), del 0,00 al 4,53 s: nubes rosadas sobre el valle y sus casas con las montañas al fondo; el dron baja y se adelanta hacia los tejados rojos. MEDIDO (`medir-ventana-040.py`): diferencia media 0,94, σ/μ 0,24,
    // pendiente +0,73, máx/μ 1,54: ACELERA despacio (0,76 → 1,40 en 4,5 s, sin un tirón: σ/μ ≤ 0,09 en cada medio segundo). Es el vuelo entero (6,5 s) y todas las ventanas aceleran: esta es la MÁS lenta (la del principio). Declarado. Es el plano más largo de la pieza (136 f) y el clímax.
    desde: 0,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0, shadows: 0.15, highlights: -0.3, whites: -0.15, saturation: 1.06 }),
    reason:
      "La vista (el clímax): nubes rosadas sobre el valle con sus casas y las montañas: lo que vería cada mañana quien tuviera el lote. El plano más largo de la pieza. Entra a corte en un golpe.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct02"),
    audio: a("ct02-voz"),
    voz: {
      s0: 0.4,
      s1: 3.9,
      lufs: -15.0,
      dice: "Si quieres conocerlo, escríbeme lote y te envío toda la información.",
    },
    // La voz empieza a los 0,40 s (12 f) y acaba a los 3,90 s (117 f); el clip dura 4,20 s (126 f). `desde` 3 f entra A CORTE en el golpe de 11,9 dB del f935 y la primera sílaba suena a los 9 f del golpe. El plano
    // dura 123 f (hasta el último fotograma del clip): 9 f tras la última palabra, en los que la imagen funde a negro.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-040.ts`): «escríbeme» (f980; whisper conf. 0,36) y «lote» (f1002; whisper oye «elote»).
    // Isabella habla a cámara en la loma, de día.
    desde: fr(3),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.08, exposure: 0.1, shadows: 0.2, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "Loma (la invitación): Isabella dice «si quieres conocerlo, escríbeme lote y te envío toda la información»: una sola acción, UNA palabra. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-040.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-040/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_040 = P.cta + DUR_CTA + DUR_TARJETA;
