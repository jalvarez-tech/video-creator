/**
 * EL RECORRIDO 065 — «Lote en San Vicente Ferrer (vereda La Porquera)», V47 del registro y tercer reel de este lote (reparto 063-065 REV. 2, `proyectos/063/reparto-063-065.md`) — los planos, como DATOS.
 *
 * Ángulo: «15 MINUTOS: LA DECISIÓN» — el dato, la ficha, la pregunta y la conversación. REV. 2 (2026-10-22): el usuario pidió otro planteamiento tras quedarse el lote sin tomas de recorrido, con UNA sola mitad
 * grabada y con los cuatro mejores drones (todos verticales): «analiza todos los hooks y mira si hay manera de cortar el “ven, te muestro” para complementarlo con otro… cuando empieces con la toma del dron, pases al
 * hook, vuelves al dron; o puedes crear unos infográficos y resaltar las amenidades». La rev. 0 (HK04 de mitad, tres drones apaisados) se descartó: `hook4.mp4` resultó ser COPIA EXACTA de `Hook1.mp4`.
 *
 *   hook         HK03  `Hook3.mp4`   PARTE A  8,18 → 16,2 s  «3.244 metros cuadrados a solo 15 minutos de la autopista Medellín-Bogotá y por solo 350 millones.»
 *   invitación   HK03  `Hook3.mp4`   PARTE B 16,72 → 17,55 s «Ven, te muestro.»   (a CORTE sobre su propia imagen, con un empuje: es la coletilla que la propia Isabella dice para llevar al dron)
 *   INFOGRAFÍA   LA FICHA sobre el vuelo de DR04: 3.244 m² · $ 350 M negociable · derecho de acueducto incluido · escrituras al 100 % (cifras SIN animar: cada una entra completa, en un golpe, y se queda)
 *   mitad        CT05  `cta5.mp4`    3,13 → 5,40 s «¿Lo comprarías para construir o para invertir?»   (UN CTA EN POSICIÓN DE MITAD, a propósito: no queda ninguna frase de hook ni de mitad libre; es una PREGUNTA, no una llamada
 *                                    a la acción, y funciona de bisagra. Se corta tras «invertir»: «te leo en los comentarios» sería un segundo CTA. REPETICIÓN DE TOMA DECLARADA en `combinaciones.md`)
 *   CTA          CT01  `cta1.mp4`    3,41 → 7,2 s  «Comenta “lote” y te envío toda la información para que vengas y lo conozcas.»
 *
 * Estructura: DRON · HOOK (A) · INVITACIÓN (B) · DRON + INFOGRAFÍA · MITAD (la pregunta) · DRON · CTA · tarjeta. Con TRES tomas de Isabella (HK03, CT05 y CT01) y cuatro frases. Es un LOTE: no hay recorrido a pie y todo el
 * metraje de la propiedad es DRON (DR04 entero y el tramo 48-73,5 s de DR01: los dos son verticales, `rotation=90`).
 *
 * LA INFOGRAFÍA SOLO DICE LO QUE LA FICHA DE LA WEB DICE (superficie, precio negociable, derecho de acueducto incluido, escrituras al 100 %). Nada de energía, uso del suelo, tipo de vía ni «apto para construir»: la pregunta de
 * la mitad la hace ISABELLA y se queda en su voz (los subtítulos la transcriben); en pantalla no se promete nada. La banda de la versión con ficha (`ficha-luxur`) se va mientras hay infografía y vuelve después.
 *
 *   bloque 1  c01                  la APERTURA: el vuelo de DR04 sobre la hierba, la cerca viva y los arbustos con flor blanca, SIN TEXTO NI VOZ
 *   bloque 2  c02 c03              Isabella camina por el campo hacia cámara: el hook (parte A, entra DISOLVIENDO) y, a CORTE y con un empuje, «ven, te muestro» (parte B)
 *   bloque 3  c04                  DR04 (la cerca en diagonal y los cultivos) con LA FICHA encima, una cifra cada 3 pulsos
 *   bloque 4  c05                  Isabella, la pregunta de la mitad (entra disolviendo)
 *   bloque 5  c06 c07              DR01: el panorama de la loma con el horizonte (c06) y LA VISTA, 4,2 s, la ladera con la cerca curva y las lomas (c07, el plano más largo)
 *   bloque 6  c08 c09              Isabella con el CTA de comentarios, y la tarjeta oscura del cierre (nada se congela)
 *
 * LAS TOMAS DE ISABELLA SON ANAMÓRFICAS (SAR 81:256, DAR 9:16): `1920×1080` que son 9:16 comprimidos a lo ancho. `normalizar.mjs` las escala ENTERAS a 1296×2304 con `setsar=1` y no las recorta jamás (un crop sería un
 * zoom ×3,2 y saldrían pixeladas). El 1080 de alto sube ×2,13: algo blandas, es lo que da el material.
 *
 * LOS DRONES son DJI 4K VERTICALES (`rotation=90`) a 29,97 fps, sin audio: `normalizar.mjs` los rota y los reproduce un 0,1 % más rápido (`setpts=PTS*1000/1001`; sin él, `-r 30` repite un fotograma cada ≈ 33 s). El `desde`
 * del plan va en el tiempo del MP4 normalizado. Los dos tramos de DR01 (el panorama) vuelan hacia el mismo lado que DR04 (la imagen se desplaza a la izquierda).
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA, POR UN PULSO MEDIDO. «deadmau5 - Strobe» (progressive house, 10:37, 128 BPM) es de PULSO CONSTANTE: en su último bloque (410-590 s) cae un bombo cada 0,4687 s (14,06 f). Se entra en su
 * golpe de 554,937 s (17,5 dB) y el pulso `n` de la recta cae en el frame `2,1 + 14,061 n` (`musica/rejilla-554.txt`). Cada cambio de plano y cada cifra de la infografía entran en un pulso con golpe MEDIDO a ≤ 15 ms de la
 * recta (se evitan los pulsos en que el detector se retrasa 55 ms o no ve el bombo: 0, 1, 7, 9, 35, 50, 57, 65, 70, 71). Cada corte seco se comprueba además sobre el audio del render (`golpes-render.py`, R33).
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(12)` = 12/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS. Un plano que entra
 * disolviendo (`disolver`) empieza a verse 12 f ANTES de su `en` (`solapeDe`): su clip tiene que tener esos 12 f antes de `desde`, y el plano anterior dura hasta ese `en`.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f127, 4,2 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la
 * prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-065.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-065";

export const FPS_065 = 30;

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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»). Las voces crudas llegan a −26,2 · −22,0 · −24,6 LUFS en su ventana de voz (habla a unos
 * metros de un iPhone, en el campo); cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y
 * limitador a −2,5 dBFS) hasta ≈ −15,0 LUFS con el pico real a −2,5 dBFS o menos, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «deadmau5 - Strobe» — `archivos/musica/deadmau5 - Strobe.mp3` (sha 8 `de6df12a`), 10:37, progressive house en Sol# menor, 128 BPM. Su último bloque (410-590 s) es una meseta plana de −9,4 LUFS con un bombo en cada
 * pulso; desde ≈ 592 s se va apagando (−12 LUFS a los 597 s, silencio digital hacia los 630 s). Se entra en su golpe de 554,937 s (17,5 dB), y de ahí el pulso es una recta de 0,46870 s (`musica/rejilla-554.txt`).
 * Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir») en que entra cada plano o cada cifra, con su fuerza en dB por 15 ms:
 * `proyectos/065/musica/golpes-548-604.json` (`medir-pista.py --json`). Su número de pulso, contado desde la recta (pulso 0 = 554,881 s), va en el comentario.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3-4 (la apertura, a corte; no nace de negro). Pulso 0 (el detector lo ve 55 ms tarde: el bombo suena en el f2). */
  e0: { t: 554.937, db: 17.5 },
  /** Pulso 8: la disolvencia al hook ACABA aquí (el golpe suena entero y la música baja DESPUÉS, antes de su primera palabra). */
  hook: { t: 558.619, db: 17.2 },
  /** Pulso 31: la disolvencia de «ven, te muestro» al dron con la ficha ACABA aquí. */
  ficha: { t: 569.396, db: 13.1 },
  /** Pulsos 33 · 36 · 39 · 42: entra cada cifra de la ficha (superficie · precio · acueducto · escrituras). */
  info1: { t: 570.334, db: 13.3 },
  info2: { t: 571.753, db: 15.6 },
  info3: { t: 573.146, db: 18.9 },
  info4: { t: 574.564, db: 22.1 },
  /** Pulso 49: la disolvencia a la mitad (la pregunta) ACABA aquí. */
  mitad: { t: 577.839, db: 21.1 },
  /** Pulso 56: la disolvencia de la mitad al panorama ACABA aquí (la música sube con curva tras «invertir» y está arriba). */
  dron: { t: 581.126, db: 19.0 },
  /** Pulso 63: corte seco a LA VISTA (el plano más largo del bloque 5). */
  vista: { t: 584.392, db: 17.2 },
  /** Pulso 72: la disolvencia al CTA ACABA aquí: el golpe suena entero y la música baja DESPUÉS, antes de la primera palabra. */
  cta: { t: 588.625, db: 12.8 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: 62 ms antes del golpe de entrada (554,937 s), redondeado a un frame (16646/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 16646 / FPS_065;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_065;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_065;

/** Isabella a cámara: un empuje lento hacia ella (hablan quietas: el empuje les da vida). Los drones, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];
/** «Ven, te muestro»: la parte B entra A CORTE con un empuje del 8 al 14 %: el corte (se quitan 6 f de su paseo y la pausa de la toma) se lee como un énfasis y no como un salto. Dentro del techo de zoom (1,2). */
const INVITA: readonly [number, number] = [1.08, 1.14];

const v = (id: string): string => `recorrido-065/${id}.mp4`;
const a = (id: string): string => `recorrido-065/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE del canal: contraste con cuerpo, negros hundidos, luces recogidas (los cielos son lo primero que se quema), un punto cálido y +10 % de saturación. Orden del efecto: exposición → balance de blancos →
 * sombras/luces/blancos/negros → contraste → saturación → vibrance. `vibrance` ≤ 0,05 y las tomas de Isabella, `saturation` ≤ 1,06: la piel se queda donde estaba. El AJUSTE de cada plano se mide
 * (`herramientas/medir-color.py`), no se hereda.
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

/** HK03 va en dos planos SEGUIDOS (c02 y c03: la misma toma, 6 f después): llevan EL MISMO color o el corte se vería. */
const COLOR_HK03: ColorCine = color({ contrast: 1.04, exposure: -0.35, highlights: -0.3, whites: -0.1, saturation: 1.04 });
/** DR01 va en dos planos SEGUIDOS (c06 y c07): el mismo color. */
const COLOR_DR01: ColorCine = color({ exposure: 0.15, shadows: 0.15, saturation: 1.0 });

/**
 * Los frames de cada cambio de plano: todos salen de `golpe(...)`, así que mover la entrada de la música es cambiar `INICIO_MUSICA`. Los que entran disolviendo (hook, ficha, mitad, dron, cta) tienen aquí el `en` de
 * la disolvencia YA TERMINADA: el plano anterior dura hasta él y el siguiente empieza a verse 12 f antes.
 */
const P = {
  hook: golpe(GOLPE.hook), //       114 · Isabella con el hook, parte A (disuelve; su primera palabra suena a los 13,4 f)
  ficha: golpe(GOLPE.ficha), //     437 · DR04 con la ficha (disuelve)
  mitad: golpe(GOLPE.mitad), //     691 · Isabella con la pregunta (disuelve)
  dron: golpe(GOLPE.dron), //       789 · DR01, el panorama (disuelve)
  vista: golpe(GOLPE.vista), //     887 · DR01, LA VISTA (a corte)
  cta: golpe(GOLPE.cta), //        1014 · Isabella con el CTA de comentarios (disuelve; su primera palabra suena a los 13,3 f)
} as const;

/**
 * La parte A del hook dura 260 f: la voz acaba en el f486 del clip (16,2 s) y el plano llega al f492 (6 f de aire antes del corte a «ven, te muestro»: el declick de entrada de la parte B pide ≥ 3 f). La parte B ocupa
 * hasta el golpe en que acaba la disolvencia a la ficha.
 */
const DUR_A = 260;

/**
 * Frames que dura la toma del CTA: su voz va de 3,41 a 7,2 s del clip (con `desde` 89 f: f1027 a f1141 de la comp); el plano dura 135 f, o sea hasta el f1149 y 8 f (0,27 s) de su cara tras la última palabra, en los
 * que la imagen funde a negro (los últimos 6). El clip dura 9,53 s (286 f) y el plano usa de 89 a 224: nada se congela.
 */
const DUR_CTA = 135;

/**
 * Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero 2 f antes del final de la pieza (la tarjeta va en silencio). Su archivo decodificado dura 637 s, de sobra
 * (la pieza acaba en el f1209, a los 40,3 s de la canción).
 */
export const FIN_MUSICA_065 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje065: readonly Corte[] = [
  // ── Bloque 1 · la apertura aérea ──
  {
    id: "c01-apertura",
    bloque: 1,
    tipo: "video",
    src: v("dr04"),
    // DR04 (vertical, `rotation=90`, 4K a 29,97 fps, 33,1 s), del 12,60 al 16,40 s: el vuelo sobre la parte plana con la cerca viva, los arbustos de flor blanca (los árboles florecidos que el usuario llamó «el plano más
    // bonito del material») y, al fondo, la franja de tierra y las copas. Es el aéreo del formato. Entra a corte con el golpe de 17,5 dB del f3 (el bombo suena en el f2).
    desde: 12.6,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.15, saturation: 0.95 }),
    reason:
      "El lote desde el dron (el aéreo del formato): la hierba, la cerca viva y los arbustos con flor blanca; es la promesa de campo abierto antes de que hable nadie. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y Isabella entra disolviendo.",
  },
  // ── Bloque 2 · el hook y la invitación ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk03"),
    audio: a("hk03-voz"),
    voz: {
      s0: 8.18,
      s1: 16.2,
      lufs: -15,
      dice: "3.244 metros cuadrados a solo 15 minutos de la autopista Medellín-Bogotá y por solo 350 millones.",
    },
    // PARTE A. La voz empieza a los 8,18 s (f245,4 del clip) y acaba a los 16,2 s (f486; la /s/ de «millones» cae a −57 dB a los 16,2 s); el clip dura 20,77 s (623 f). Isabella pasa los 8 primeros segundos en el campo (se
    // aleja, se queda de pie, lejos, y no habla): el plano entra con `desde` 232 f, de pie y pequeña en la loma, y la primera palabra suena a los 13,4 f de la disolvencia. Entra DISOLVIENDO (el clip tiene 232 f antes de su
    // `desde`) y la disolvencia ACABA en el golpe de 17,2 dB del f114: el golpe suena entero y la música baja con curva DESPUÉS, acabando antes de su primera palabra. Durante toda la frase CAMINA hacia cámara. El plano dura 260 f
    // (hasta el f374 de la comp, el del corte a la parte B): la última palabra cae en el f368 y quedan 6 f de aire. Usa del 7,73 al 16,40 s del clip.
    // Cortada JUSTO ANTES del «ven, te…»: el reparto rev. 2 lo parte por donde la propia Isabella invita a mirar.
    desde: fr(232),
    en: P.hook,
    dur: DUR_A,
    zoom: QUIETO,
    entra: "disolver",
    color: COLOR_HK03,
    reason:
      "El campo del lote (donde está la propiedad): Isabella camina por la loma hacia cámara y da los dos datos que deciden una visita, la superficie y la distancia a la autopista, con el precio. Entra disolviendo desde el aéreo; la música ya está abajo.",
  },
  {
    id: "c03-invita",
    bloque: 2,
    tipo: "video",
    src: v("hk03"),
    audio: a("hk03-voz"),
    voz: {
      s0: 16.72,
      s1: 17.55,
      lufs: -15,
      dice: "Ven, te muestro.",
    },
    // PARTE B, A CORTE sobre su propia imagen. La voz empieza a los 16,72 s (f501,6 del clip) y acaba a los 17,55 s (f526,5): cuatro sílabas en 0,83 s (ven·te·mues·tro; whisper oye «20 muestros»). `desde` 498 f (16,6 s):
    // el corte quita 6 f del paseo y la pausa de la toma (0,5 s), y la primera palabra suena a los 3,6 f del corte (el declick de entrada de la voz dura 3 f). El empuje del 8 al 14 % convierte el salto en un énfasis. La
    // última palabra cae en el f402,6 de la comp; el plano llega hasta el golpe de 13,1 dB del f437 (el de la ficha), así que la imagen de Isabella es opaca hasta el f425 y disuelve al vuelo en los 12 f finales; usa del 16,6
    // al 18,7 s del clip (ella sigue andando hacia cámara).
    desde: fr(498),
    en: P.hook + DUR_A,
    dur: P.ficha - (P.hook + DUR_A),
    zoom: INVITA,
    entra: "corte",
    color: COLOR_HK03,
    reason:
      "«Ven, te muestro»: la invitación de Isabella, a corte y con un empuje sobre su propia imagen; es lo que lleva al dron (justo lo que la frase anuncia), así que lo siguiente es lo que enseña.",
  },
  // ── Bloque 3 · el vuelo con LA FICHA encima ──
  {
    id: "c04-ficha",
    bloque: 3,
    tipo: "video",
    src: v("dr04"),
    // DR04, del 22,00 al 30,47 s: la cerca viva en diagonal con los arbustos de flor blanca y, arriba, los cultivos en franjas del vecino; el vuelo avanza y gira hacia el campo cultivado. Es lo que se ve debajo de la ficha
    // (el velo la oscurece: `infografia-065.ts`). Entra DISOLVIENDO desde Isabella (el clip tiene 22 s antes de su `desde`) y la disolvencia ACABA en el golpe de 13,1 dB del f437. Las cuatro cifras entran en los pulsos
    // 33 · 36 · 39 · 42 (f466 · f508 · f550 · f593) y se quedan hasta el f675. Dura 254 f, hasta el golpe de la pregunta.
    desde: 22.0,
    en: P.ficha,
    dur: P.mitad - P.ficha,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.1, saturation: 0.95 }),
    reason:
      "El vuelo sobre el lote con LA FICHA encima: la superficie, el precio, el agua y las escrituras, justo después de «ven, te muestro»; el dron sigue su camino bajo un velo para que las cifras se lean.",
  },
  // ── Bloque 4 · la mitad: la pregunta ──
  {
    id: "c05-mitad",
    bloque: 4,
    tipo: "video",
    src: v("ct05"),
    audio: a("ct05-voz"),
    voz: {
      s0: 3.13,
      s1: 5.4,
      lufs: -15,
      dice: "¿Lo comprarías para construir o para invertir?",
    },
    // UN CTA EN POSICIÓN DE MITAD (declarado: no queda ninguna frase de mitad libre). La voz empieza a los 3,13 s (f93,9 del clip) y acaba a los 5,4 s (f162, tras «invertir»); a los 5,9 s Isabella vuelve a hablar («te leo
    // en los comentarios»), así que el plano NO puede pasar del f177 del clip. `desde` 81 f entra DISOLVIENDO (el clip tiene 81 f antes) y la primera palabra suena a los 12,9 f del golpe de 21,1 dB del f691. El plano dura
    // 98 f (del f81 al f179 del clip): la última palabra cae en el f772 y la imagen es opaca hasta el f777; la disolvencia al vuelo acaba en el f789 y a esas alturas el dron ya cubre el 85 % (sus labios empiezan a moverse en
    // el f787). «Te leo en los comentarios» NO suena (la voz tratada se calla en 5,45 s): sería un segundo CTA.
    desde: fr(81),
    en: P.mitad,
    dur: P.dron - P.mitad,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, exposure: -0.05, shadows: 0.2, highlights: -0.25, whites: -0.1, saturation: 1.04 }),
    reason:
      "Isabella de pie en la loma, con el campo detrás: la pregunta que cierra la ficha y abre la decisión, «¿lo comprarías para construir o para invertir?»; una pregunta en el aire, no una llamada a la acción. La hace ELLA: en pantalla no se promete nada.",
  },
  // ── Bloque 5 · el dron: el panorama y la vista ──
  {
    id: "c06-panorama",
    bloque: 5,
    tipo: "video",
    src: v("dr01"),
    // DR01 (vertical, 73,5 s; el tramo del reparto es 48-73,5 s), del 50,00 al 53,27 s: el panorama de la loma desde arriba, con el campo de la vereda en franjas, las casas lejanas y el horizonte de lomas con las nubes. Es
    // lo más abierto del material: lo que hay AL REDEDOR del lote. Entra DISOLVIENDO desde Isabella (el clip tiene 50 s antes) y la disolvencia ACABA en el golpe de 19,0 dB del f789.
    desde: 50.0,
    en: P.dron,
    dur: P.vista - P.dron,
    zoom: QUIETO,
    entra: "disolver",
    color: COLOR_DR01,
    reason:
      "El panorama desde el aire: la loma con el campo en franjas, las casas lejanas y el horizonte; la respuesta visual a «construir o invertir»: tierra abierta y su entorno, justo después de la pregunta.",
  },
  {
    id: "c07-vista",
    bloque: 5,
    tipo: "video",
    src: v("dr01"),
    // DR01, del 59,00 al 63,23 s: el dron avanza sobre la ladera con la cerca viva curva y el panorama de lomas y nubes; el plano más abierto de los dos y el más largo del bloque (4,2 s): LA VISTA, el clímax. Entra A
    // CORTE en el golpe de 17,2 dB (f887) y en el mismo sentido que el plano anterior (la imagen se desplaza a la izquierda).
    desde: 59.0,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: COLOR_DR01,
    reason:
      "La ladera con la cerca viva y el panorama de lomas: la vista abierta y el clímax del vuelo; es el plano más largo del bloque y el último antes de que Isabella pida los comentarios.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c08-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct01"),
    audio: a("ct01-voz"),
    voz: {
      s0: 3.41,
      s1: 7.2,
      lufs: -15,
      dice: "Comenta lote y te envío toda la información para que vengas y lo conozcas.",
    },
    // La voz empieza a los 3,41 s (f102,3 del clip) y acaba a los 7,2 s (f216); el clip dura 9,53 s (286 f). `desde` 89 f entra DISOLVIENDO (el clip tiene 89 f antes) y la primera palabra suena a los 13,3 f del `en`:
    // la música baja con curva sobre 10 f tras el golpe de 12,8 dB del f1014. El plano dura 135 f (del f89 al f224 del clip): 8 f tras la última palabra, en los que la imagen funde a negro (los últimos 6). Nada se
    // congela: el clip aún tiene 62 f. Una sola acción: comentar «lote».
    desde: fr(89),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, exposure: -0.2, shadows: 0.2, highlights: -0.25, whites: -0.1, saturation: 1.04 }),
    reason:
      "El campo abierto con Isabella (la invitación): «comenta lote y te envío toda la información»: una sola acción y la conversación como cierre. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-065.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c09-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-065/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c08
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c09). */
export const DURACION_065 = P.cta + DUR_CTA + DUR_TARJETA;

/** El frame del CTA en que empieza la toma (para la infografía y la versión con ficha). */
export const EN_MITAD_065 = P.mitad;
export const EN_FICHA_065 = P.ficha;
