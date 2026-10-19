/**
 * EL RECORRIDO 043 — «Lote en El Carmen de Viboral (Mia)», V26 del registro y OCTAVO reel de esta propiedad, «TODO RESUELTO» — los planos, como DATOS.
 *
 * Encargo (2026-10-17, una de las cuatro sesiones del lote V23-V26): el campo con lo práctico ya listo. Agua y energía (el hook) → dos entradas (la mitad) → «haz clic en el botón y agendemos una visita» (el CTA).
 * Estructura del canal: DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA, con tres frases de Isabella.
 *
 *   hook   HK06  «Si quieres construir rodeado de (la) naturaleza, (pero) con agua y energía disponibles, vente, te muestro.»   (REPETIDA de la V15: la V26 la reparte a la fuerza)
 *   mitad  MD06  «Tener dos entradas puede cambiar por completo la forma en la que disfrutas un lote.»                          (la doble de MD05, libre)
 *   CTA    CT03  «Haz clic en el botón y agendemos una visita.»                                                                (ENTERA: la V18 la recortó a «y agendemos una visita»; REPETIDA)
 *
 * LA IDEA EN UNA LÍNEA. Este lote es PARA QUIEN QUIERE CONSTRUIR EN EL CAMPO Y NO QUIERE EMPEZAR DE CERO: el hook pone las dos cosas que se piden antes que cualquier plano (agua y energía, que la ficha da como
 * disponibles), la mitad añade lo práctico que cambia el día a día (dos entradas independientes) y el CTA lo cierra con una acción que se hace desde el teléfono (el botón). Ninguna cifra en pantalla ni en voz: la
 * ficha (3.428 m², COP 800 millones) va al caption; tampoco distancias, tiempos ni la fuente del agua, que la ficha no da.
 *
 *   bloque 1  c01                  la APERTURA: el lateral lento sobre las terrazas, el árbol grande y la cabaña, al atardecer (DR203), SIN TEXTO NI VOZ
 *   bloque 2  c02                  Isabella camina hacia cámara por el talud de hierba: el hook (entra a corte en un golpe)
 *   bloque 3  c03 c04 c05          el paseo: de detrás de la vegetación y el tejado rojo a las terrazas (DR211) → las terrazas con el árbol y el cielo (DR207) → el árbol grande y la cabaña (DR203)
 *   bloque 4  c06                  Isabella entre las palmas con el cielo cubierto: la mitad (a corte en un golpe)
 *   bloque 5  c07 c08 c09          el portón de madera de la vereda (RC04, la otra entrada) → las terrazas bajo el sol (DR211) → LA VISTA, 4,6 s: el cielo del atardecer sobre las terrazas (DR207, el plano más largo)
 *   bloque 6  c10 c11              Isabella en la loma con el valle y las montañas: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA, POR GOLPES. «Luxury, Elegance, Refined» (lounge / smooth chill, plana, biblioteca del repo) es la ÚNICA de las cuatro canciones del grupo de esta sesión que es lounge Y da una rejilla
 * con TODOS los cortes en golpes de ≥ 12,7 dB con los 10 planos de esta pieza (`herramientas/buscar-cortes-043.py`, `musica/buscar-cortes-043-*.txt`). TODOS los cortes son secos.
 *
 * LOS DRONES. Los tres son NUEVOS (2026-10-14, 17:41-17:46, al atardecer; 4K vertical a 29,97 fps) y ninguna versión los usó. Cada tramo es una ventana uniforme medida (`herramientas/ventana-fina.py` a la duración exacta del plano:
 * dispersión del movimiento, pendiente y máximo/media; `flujo.py` para el desplazamiento: DR203 va a ≈ 1 px/f constante de 1,5 a 8,4 s y DR207 a ≈ 1 px/f de 18 a 27,5 s y de 30 a 37 s —a 540 px de ancho—; DR211
 * sube tan despacio que su movimiento no pasa de 0,5 de media). A 29,97 fps `fps=30` repite un fotograma cada ≈ 33 s (`dji-2997-fotograma-repetido`): `normalizar.mjs` los reproduce un 0,1 % más rápido y el `desde` del plan va
 * en el tiempo del MP4 normalizado.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(11)` = 11/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f110, 3,7 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Aquí hay que casar tomas de DÍA (Isabella, los recorridos, grabados
 * el 2026-08-26 por la tarde) con drones de ATARDECER (2026-10-14: cielo dorado y rosa, primer plano oscuro): el ajuste de cada plano busca que se parezcan sin quemar el cielo ni hundir las terrazas. Con `color` el render
 * lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-043.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-043";

export const FPS_043 = 30;

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
  /** `foto` solo para la tarjeta oscura del cierre (`c14-cierre`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella: el WAV de su voz TRATADA (`<toma>-voz.wav`, `normalizar.mjs`). */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido del usuario desde la V9: «mientras habla Isabella sube los decibeles sin saturar»). Las voces crudas llegan a −21,9 · −22,4 · −23,5 LUFS en su ventana de voz; cada
 * una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS) hasta ≈ −15 LUFS con el pico
 * real a −2,5 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Luxury, Elegance, Refined» — `archivos/musica/Luxury, Elegance, Refined - Oficial Vídeo Clipe.mp3` (sha 8 `4d36ea48`), lounge / smooth chill, 3:03, plana (sin crescendo ni caída: `catalogo-musica.md`). Se entra en su golpe de
 * 16,164 s (18,6 dB) y de ahí suena a −14,7 LUFS (picos de −2,0 a −3,9 dBFS) hasta el 47 s y más allá. Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir») en
 * que entra cada plano, con su fuerza en dB por 15 ms: `proyectos/043/musica/golpes-043.json` (`medir-pista.py --json`). Salen de `buscar-cortes-043.py` (`musica/buscar-cortes-043-ancha-12db.txt`).
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  apertura: { t: 16.164, db: 18.6 },
  /** Isabella entra A CORTE con el hook; su primera sílaba suena 10,5 f después. */
  hook: { t: 19.409, db: 17.1 },
  /** El paseo entra tras el hook: la música vuelve a su nivel en este golpe. */
  paseo: { t: 24.995, db: 13.6 },
  /** Las terrazas y el árbol (DR207). */
  terrazas: { t: 27.324, db: 25.0 },
  /** El árbol grande y la cabaña (DR203). */
  cabana: { t: 30.574, db: 15.4 },
  /** Isabella entra A CORTE con la mitad; su primera sílaba suena 10,2 f después. */
  mitad: { t: 33.263, db: 24.9 },
  /** El portón de madera de la vereda. */
  porton: { t: 38.485, db: 18.4 },
  /** Las terrazas bajo el sol (DR211). */
  doradas: { t: 40.346, db: 12.7 },
  /** LA VISTA, el plano más largo del bloque 5. */
  vista: { t: 42.676, db: 22.1 },
  /** Isabella entra A CORTE con el CTA; su primera sílaba suena 12,9 f después. */
  cta: { t: 47.321, db: 17.1 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: 50 ms antes del golpe de entrada (16,164 s), redondeado a un frame (484/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 484 / FPS_043;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_043;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_043;

/** Isabella camina hacia cámara: un empuje lento la acompaña. Los drones, quietos (la cámara ya se mueve), salvo DR211, que sube tan despacio que lleva un empuje mínimo. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const EMPUJE_SUAVE: readonly [number, number] = [1.0, 1.05];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-043/${id}.mp4`;
const a = (id: string): string => `recorrido-043/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE del canal (la del 017): contraste con cuerpo, negros hundidos, luces recogidas, un punto cálido y +10 % de saturación. Orden del efecto: exposición → balance de blancos → sombras/luces/blancos/negros → contraste →
 * saturación → vibrance. `vibrance` ≤ 0,05 (sobre hormigón gris pinta un moteado de colores y vuelve rosadas las nubes) y las tomas de Isabella, `saturation` ≤ 1,06: la piel se queda donde estaba. El AJUSTE de cada plano se
 * mide (`herramientas/medir-color.py`), no se hereda: los drones del atardecer llevan el cielo muy por encima del primer plano y las tomas de día, al revés.
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
  hook: golpe(GOLPE.hook), //         100 · Isabella entra a corte; su primera palabra, 10,5 f después
  paseo: golpe(GOLPE.paseo), //       267 · acaba el hook; entra el paseo
  terrazas: golpe(GOLPE.terrazas), // 337 · las terrazas y el árbol (DR207)
  cabana: golpe(GOLPE.cabana), //     435 · el árbol grande y la cabaña (DR203)
  mitad: golpe(GOLPE.mitad), //       516 · Isabella entra a corte con la mitad
  porton: golpe(GOLPE.porton), //     672 · el portón de la vereda
  doradas: golpe(GOLPE.doradas), //   728 · las terrazas bajo el sol
  vista: golpe(GOLPE.vista), //       798 · la vista, el plano más largo del bloque 5 (139 f)
  cta: golpe(GOLPE.cta), //           937 · Isabella entra a corte con el CTA
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 4,00 s (120 f) y desde `desde` (9 f) le quedan 111. Su voz va de 0,73 a 3,12 s (f950-1021 de la comp): 27 f (0,9 s) de su cara tras la última palabra, en los que la
 * imagen funde a negro (los últimos 6). Nada se congela: el plano acaba en el último fotograma del clip.
 */
const DUR_CTA = 111;

/**
 * Dónde acaba la música (frame de la comp): se apaga en línea recta bajo la tarjeta y llega a cero 2 f antes del final de la pieza.
 */
export const FIN_MUSICA_043 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje043: readonly Corte[] = [
  // ── Bloque 1 · la apertura ──
  {
    id: "c01-apertura",
    bloque: 1,
    tipo: "video",
    src: v("dr203"),
    // DR203 (vertical, 2026-10-14 17:41), del 1,80 al 5,13 s: un lateral lento sobre la pared de terrazas engramadas con la bolsa de tierra roja, el árbol grande y la cabaña de madera, con las nubes violeta y el horizonte naranja
    // del atardecer. `flujo.py` (a 540 px): ≈ 1 px/f CONSTANTE de 1,5 a 8,4 s (antes está quieto); `ventana-fina.py`: dispersión 0,040, pendiente −0,04, máx 1,18× la media. Entra a corte con el golpe de 18,6 dB del f3 (no nace
    // de negro) y YA VA EN MOVIMIENTO DESDE EL FRAME 0. Ninguna versión usó este dron.
    desde: 1.8,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ shadows: 0.25, blacks: 0, highlights: -0.35, whites: -0.25 }),
    reason:
      "Terrazas, árbol y cabaña al atardecer (la promesa): el lote entero en un lateral lento, de entrada, con el cielo dorado. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y ya está en movimiento.",
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
    // La voz empieza a los 0,65 s y acaba a los 5,45 s; el clip dura 6,33 s (190 f). OJO: la energía de banda de voz marca un «arranque» a los 0,03 s y a los 0,545 s, pero son chasquidos del micro (a −48/−55 dB: ver la V15):
    // la primera sílaba («Si») sube a los 0,665 s. `desde` 9 f entra A CORTE en el golpe de 17,1 dB del f100 (suena entero: la música baja con curva DESPUÉS) y la primera sílaba suena a los 10,5 f del golpe. El plano dura
    // 167 f (hasta el golpe del f267): 12,5 f tras la última palabra.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-043.ts`): «de la» (rodeado DE LA naturaleza), «pero con», la «y» de «agua y energía» y «te» de «vente, te muestro» (las midió la V15 en este mismo clip).
    // Isabella camina hacia cámara por el talud de hierba, lejos al principio: el empuje la acompaña.
    desde: fr(9),
    en: P.hook,
    dur: P.paseo - P.hook,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.06, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "El talud de hierba (la promesa práctica): Isabella camina hacia cámara y dice «si quieres construir rodeado de naturaleza, pero con agua y energía disponibles, vente, te muestro». Entra a corte en un golpe.",
  },
  // ── Bloque 3 · el paseo: la vegetación, las terrazas, el árbol y la cabaña ──
  {
    id: "c03-vegetacion",
    bloque: 3,
    tipo: "video",
    src: v("dr211"),
    // DR211 (vertical, 2026-10-14 17:45), del 3,50 al 5,83 s: el dron sube despacio desde detrás de la vegetación y un tejado rojo con chimenea hasta descubrir las terrazas y el cielo dorado con una columna de nubes.
    // Es el plano más lento de la pieza (movimiento 0,5; dispersión 0,078, pendiente +0,07): lleva un empuje mínimo para no quedarse inerte. Ninguna versión usó este dron.
    desde: 3.5,
    en: P.paseo,
    dur: P.terrazas - P.paseo,
    zoom: EMPUJE_SUAVE,
    entra: "corte",
    color: color({ exposure: 0.2, shadows: 0.4, blacks: 0, highlights: -0.4, whites: -0.25 }),
    reason:
      "Vegetación y tejado rojo (el campo que rodea): tras «te muestro» el dron sube despacio desde detrás de las palmas y un tejado hasta las terrazas: la naturaleza primero, el lote detrás.",
  },
  {
    id: "c04-terrazas",
    bloque: 3,
    tipo: "video",
    src: v("dr207"),
    // DR207 (vertical, 2026-10-14 17:43), del 20,50 al 23,77 s: las terrazas engramadas con la tierra roja arriba, el árbol grande a la derecha y la cabaña abajo, con el cielo de nubes violeta y el horizonte dorado, en un paneo
    // lento a la izquierda (`flujo.py`: ≈ 1 px/f constante de 18 a 27,5 s; `ventana-fina.py`: dispersión 0,039, pendiente −0,03, máx 1,14×). Ninguna versión usó este dron.
    desde: 20.5,
    en: P.terrazas,
    dur: P.cabana - P.terrazas,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.1, shadows: 0.35, blacks: 0, highlights: -0.4, whites: -0.25 }),
    reason:
      "Terrazas con el árbol (el lote): las terrazas, la tierra roja y el árbol grande bajo el cielo del atardecer en un paneo lento: lo que hay para construir.",
  },
  {
    id: "c05-arbol-y-cabana",
    bloque: 3,
    tipo: "video",
    src: v("dr203"),
    // DR203, del 5,20 al 7,90 s (el tramo que sigue al de la apertura, 1,80-5,13 s: ningún fotograma en común): el árbol grande con las terrazas y, abajo, la cabaña de madera con las palmas, el mismo lateral lento
    // (dispersión 0,045, pendiente −0,13, máx 1,09×).
    desde: 5.2,
    en: P.cabana,
    dur: P.mitad - P.cabana,
    zoom: QUIETO,
    entra: "corte",
    color: color({ shadows: 0.3, blacks: 0, highlights: -0.35, whites: -0.2 }),
    reason:
      "El árbol grande y la cabaña (lo que ya está): el lateral acaba sobre la cabaña de madera entre las palmas: lo construido, antes de que vuelva Isabella.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md06"),
    audio: a("md06-voz"),
    voz: {
      s0: 0.54,
      s1: 4.78,
      lufs: -15.0,
      dice: "Tener dos entradas puede cambiar por completo la forma en la que disfrutas un lote.",
    },
    // La voz empieza a los 0,54 s y acaba a los 4,78 s; el clip dura 5,50 s (165 f). El registro decía que empezaba a los 0,02 s: es un chasquido a −82 dB; la primera sílaba («Te-») sube a los 0,54 s (`onsets-voz.py`: subida de 73,5 dB).
    // `desde` 6 f entra A CORTE en el golpe de 24,9 dB del f516 (suena entero: la música baja DESPUÉS) y la primera sílaba suena a los 10,2 f del golpe. El plano dura 156 f (hasta el golpe del f672): 16,6 f tras la última palabra.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-043.ts`): «por completo» y «lote» (whisper oye «note»).
    // Isabella camina hacia cámara entre las palmas, con el cielo cubierto.
    desde: fr(6),
    en: P.mitad,
    dur: P.porton - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.06, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "Entre las palmas (lo práctico): Isabella dice «tener dos entradas puede cambiar por completo la forma en la que disfrutas un lote»: el hecho de la ficha que cambia el día a día. Entra a corte en un golpe.",
  },
  // ── Bloque 5 · la otra entrada y la vista ──
  {
    id: "c07-porton",
    bloque: 5,
    tipo: "video",
    src: v("rc04"),
    // RC04 (IMG_1582), del 0,60 al 2,47 s: a pie, el portón de madera oscura junto a la cerca viva y el seto redondo, con el cielo azul: la entrada por la vereda. La V14 usó este clip en 0,0-2,33 s y la V22 en 2,40-3,93 s: este tramo
    // COMPARTE ≈ 1,7 s con la V14 (el clip dura 5,07 s: no queda un tramo nuevo de 1,9 s). Declarado. Sin gente (la voz ajena del clip no se oye: va mudo).
    desde: 0.6,
    en: P.porton,
    dur: P.doradas - P.porton,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.3, shadows: 0.4, highlights: -0.6, whites: -0.45, saturation: 1.04 }),
    reason:
      "El portón de la vereda (la otra entrada): a pie, el portón de madera junto a la cerca viva: la segunda entrada de la que habla ella, enseñada justo después de decirla.",
  },
  {
    id: "c08-terrazas-doradas",
    bloque: 5,
    tipo: "video",
    src: v("dr211"),
    // DR211, del 18,20 al 20,53 s (el tramo más lejano del que usa c03, 3,50-5,83 s: ningún fotograma en común): las terrazas con la tierra roja bajo el cielo dorado y la columna de nubes; el dron, ya arriba, casi quieto
    // (movimiento 0,4; dispersión 0,080).
    desde: 18.2,
    en: P.doradas,
    dur: P.vista - P.doradas,
    zoom: EMPUJE_SUAVE,
    entra: "corte",
    color: color({ exposure: 0.1, shadows: 0.4, blacks: 0, highlights: -0.4, whites: -0.25 }),
    reason:
      "Las terrazas bajo el sol (el lote, ya sin vegetación delante): el dron, arriba, deja ver las terrazas enteras con el cielo dorado: la preparación de la vista.",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("dr207"),
    // DR207, del 30,80 al 35,43 s: el paneo lento a la izquierda sobre las terrazas, la tierra roja y el árbol grande, con el cielo pastel rosa y azul del final del atardecer (`flujo.py`: ≈ 1 px/f constante de 30 a 37 s; dispersión
    // 0,061, pendiente +0,17, máx 1,13×). Es el plano más largo del bloque 5 (139 f) y el clímax. No comparte segundos con c04 (20,50-23,77 s).
    desde: 30.8,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0, shadows: 0.35, blacks: 0, highlights: -0.45, whites: -0.3 }),
    reason:
      "La vista (el clímax): el paneo lento sobre las terrazas y el árbol bajo el cielo rosa y azul del atardecer: lo que tendría delante quien tuviera el lote. El plano más largo del bloque. Entra a corte en un golpe.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct03"),
    audio: a("ct03-voz"),
    voz: {
      s0: 0.73,
      s1: 3.12,
      lufs: -15.0,
      dice: "Haz clic en el botón y agendemos una visita.",
    },
    // CT03 ENTERA (la V18 la recortó a «y agendemos una visita» —1,94-3,12 s— porque «el botón» no dice cuál; esta pieza la usa como la grabó Isabella y pregunta cuál es). La voz empieza a los 0,73 s y acaba a los 3,12 s;
    // el clip dura 4,00 s (120 f). `desde` 9 f entra A CORTE en el golpe de 17,1 dB del f937 y la primera sílaba («Haz») suena a los 12,9 f. El plano dura 111 f (hasta el último fotograma del clip): 26,4 f tras la última
    // palabra, en los que la imagen funde a negro (los últimos 6).
    // Entre «botón» (acaba en 1,82 s) y «y» (1,945 s) hay 0,1 s de silencio a −65 dB; la «y» va pegada a «agendemos». POR CONFIRMAR AL OÍDO (ver `subtitulos-043.ts`): «agendemos» (la «y» y la «a» se funden).
    // Isabella camina hacia cámara en la loma con el valle y las montañas detrás.
    desde: fr(9),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.06, exposure: -0.05, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "Loma con el valle (la invitación): Isabella dice «haz clic en el botón y agendemos una visita»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-043.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-043/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_043 = P.cta + DUR_CTA + DUR_TARJETA;
