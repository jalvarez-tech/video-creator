/**
 * EL RECORRIDO 066 — «Lote en San Cristóbal (EOLIA Condominio)», V48 del registro, primer reel de este lote (reparto 066-068, `proyectos/066/reparto-066-068.md`) — los planos, como DATOS.
 *
 * Ángulo: «CON ESTA VISTA, MUY POCOS»: un lote de más de 5.000 m² con la ciudad al fondo no es lo normal. El aéreo abre sobre el camino en curva y los cipreses del lote (sin texto ni voz) → el hook lo dice (Isabella en el
 * prado: «en Medellín se construyen miles de apartamentos cada año, lotes de 5.000 metros, con esta vista, muy pocos») → el paseo es EL LOTE: el cielo y el valle a ras de suelo (RC01) y el lote desde arriba, con
 * su senda y sus cercas (DR05) → la mitad se lo pone en la vida («hay una versión de tu vida donde ya no tienes que salir a buscar paz los fines de semana porque ya vives dentro de ella») → el rincón del árbol que abre al
 * valle (RC04), el vuelo que baja al lote (DR02) y LA VISTA, la ciudad al horizonte sobre el bosque (DR01) → el CTA («si deseas más información, haz clic en el enlace»). Estructura del canal: DRON · HOOK · RECORRIDO · MITAD ·
 * RECORRIDO · CTA, con TRES frases de Isabella.
 *
 *   hook   HK05  `IMG_0959` «En Medellín se construyen miles de apartamentos cada año, lotes de 5.000 metros, con esta vista, muy pocos.»   (exclusiva de esta pieza, reparto)
 *   mitad  MD03  `IMG_0975` «Hay una versión de tu vida donde ya no tienes que salir a buscar paz los fines de semana porque ya vives dentro de ella.»   (exclusiva, reparto)
 *   CTA    CT04  `IMG_0967` «Si deseas más información, haz clic en el enlace.»                                                              (exclusiva, reparto)
 *   aéreo  DR01 (`DJI_…0087`, 27,7 s) la apertura (0,5-2,9 s) y la vista (18,0-21,8 s) · DR05 (`DJI_…0091`, hasta 62 s) el lote desde arriba · DR02 (`DJI_…0088`) el vuelo que baja al lote. 4K VERTICAL, SDR, 29,97 fps.
 *   paseos RC01 (`IMG_0941`) el cielo y el valle · RC04 (`IMG_0956`) el árbol que abre al valle. Paneos con el móvil en el prado, mudos.
 *
 * LO QUE ES DE ESTA PIEZA Y LO QUE COMPARTE (`proyectos/066/combinaciones.md`). La única cifra en pantalla es la que ELLA dice, «5.000 metros» (la ficha dice 5.170 m²: ella redondea hacia abajo y los subtítulos
 * no la corrigen); ni el precio ni los 5.170 m² van en pantalla del reel: van al caption y a la versión con ficha. Los drones y los paneos tienen rangos propios en el reparto: DR01 se usa DOS veces, en tramos disjuntos
 * (0,5-2,9 s y 18,0-21,8 s), y es la única repetición de fuente dentro de la pieza.
 *
 *   bloque 1  c01                  el camino en curva y los cipreses del lote desde el aire: DR01 0,5-2,9 s; SIN TEXTO NI VOZ
 *   bloque 2  c02                  Isabella camina hacia cámara por el prado con las montañas detrás: el hook (entra disolviendo; su primera palabra suena a los 22 f)
 *   bloque 3  c03 c04              el cielo y el valle a ras de suelo (RC01) → el lote desde arriba, de la senda al horizonte (DR05)
 *   bloque 4  c05                  Isabella en la loma con los pinos: la mitad (entra disolviendo; sale a corte en un golpe)
 *   bloque 5  c06 c07 c08          el rincón del árbol que abre al valle (RC04) → el vuelo baja al lote (DR02) → LA VISTA: la ciudad al horizonte sobre el bosque (DR01, el plano más largo)
 *   bloque 6  c09 c10              Isabella en el camino con las cercas y el prado: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO. La canción es «Flying Into the Sun» (Aleksey Chistilin; orquestal épica, SIN pulso constante: golpes cada ≈ 0,5 s de 6-12 dB): la rejilla son los golpes MEDIDOS (`musica/golpes-066.json`;
 * `medir-pista.py`) y SOLO los cortes SECOS piden golpe: hook → paseo (10,8 dB), paseo 1 → paseo 2 (12,3 dB), mitad → rincón (9,8 dB), rincón → vuelo (9,3 dB) y vuelo → vista (12,5 dB).
 * Las disolvencias (apertura → hook, paseo 2 → mitad y vista → CTA) van libres. La mitad entra DISOLVIENDO porque su toma solo dura 6,63 s: tras su última palabra quedan 12 f de clip y tienen que acabar en el corte
 * seco del golpe del f797 (una disolvencia de salida no cabría, y a corte hay que caer en un golpe). La entrada de la canción es su golpe de 178,095 s (10,1 dB); su caída de 17 dB cae sobre el CTA (de los 213,3 s en adelante).
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(12)` = 12/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS. Un plano que entra
 * disolviendo (`disolver`) empieza a verse 12 f ANTES de su `en` (`solapeDe`): su clip tiene que tener esos 12 f antes de `desde`, y el plano anterior dura hasta ese `en`.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f94, 3,1 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma. Con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg
 * (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-066.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-066";

export const FPS_066 = 30;

export type Entrada = "corte" | "disolver";
export type Bloque = 1 | 2 | 3 | 4 | 5 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. `s0`/`s1`, medidos por energía EN BANDA DE VOZ (perfil de 33 ms, `herramientas/voz-banda.py`) y por arranques de sílaba; `lufs`, con ebur128 sobre el WAV TRATADO que suena. */
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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −26,5 · −27,7 · −25,0 LUFS en su ventana de voz (habla a unos metros
 * de un iPhone, en el prado); cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a
 * −2,5 dBFS) hasta −15,0 LUFS con el pico real a −2,5 · −2,5 · −2,9 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Flying Into the Sun» — `archivos/musica/Aleksey Chistilin - Flying Into the Sun.mp3` (sha 8 `ca1f1cbf`), orquestal épica en Do menor, SIN pulso. Se entra en su golpe de 178,095 s (10,1 dB) y de ahí sube de −13 LUFS
 * (la apertura) a −8 (la vista) en un crescendo continuo hasta los 213,3 s, donde CAE de −9 a −22 LUFS en 2 s y deja un lecho (−23 a −26 LUFS) con golpes sueltos de 17-21 dB (215,9 · 216,9 s) que quedan bajo la tarjeta.
 * Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir»): `proyectos/066/musica/golpes-066.json` (`medir-pista.py --json`, ventana 178,0-228,0 s).
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 178.095, db: 10.1 },
  /** Hook → RC01 (corte seco). */
  paseo1: { t: 189.016, db: 10.8 },
  /** RC01 → DR05 (corte seco). */
  paseo2: { t: 192.279, db: 12.3 },
  /** La mitad → RC04 (corte seco): cae 12 f después de su última palabra, justo cuando se le acaba el clip. */
  bloque5: { t: 204.558, db: 9.8 },
  /** RC04 → DR02 (corte seco). */
  vuelo: { t: 207.188, db: 9.3 },
  /** DR02 → la vista (corte seco), 12,5 dB: el clímax de la canción empieza aquí. */
  vista: { t: 209.598, db: 12.5 },
} as const;

/** Dónde cae la canción (s): de −9,1 LUFS (a los 213,0 s) a −22,5 (a los 214,5 s), sonoridad momentánea de 400 ms; el lecho que queda mide −23 a −26 LUFS. */
export const DECAE = { t: 213.3, lufsAntes: -9.1, lufsDespues: -22.5 } as const;
/** El golpe de 20,9 dB (s) que hay que dejar fuera: la música ya está a cero y la tarjeta va en silencio. */
export const GOLPE_QUE_SE_EVITA = { t: 216.877, db: 20.9 } as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (178,095 s) cae en el frame 3 de la pieza; redondeado a un frame (5341/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 5341 / FPS_066;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_066;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_066;

/** Isabella: un empuje lento hacia ella. Los recorridos y el aéreo, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-066/${id}.mp4`;
const a = (id: string): string => `recorrido-066/${id}.wav`;

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
 * Los frames de cada cambio de plano: los que caen en un golpe salen de `golpe(...)`, así que mover la entrada de la música es cambiar `INICIO_MUSICA`. Los que entran disolviendo (hook, mitad, CTA) tienen aquí el `en` de la
 * disolvencia YA TERMINADA: el plano anterior dura hasta él y el siguiente empieza a verse 12 f antes.
 */
const P = {
  hook: 72, //                         Isabella ya es opaca; su primera palabra suena 22 f después
  paseo1: golpe(GOLPE.paseo1), //     331 · acaba el hook; el golpe de 10,8 dB abre el paseo (a corte)
  paseo2: golpe(GOLPE.paseo2), //     429 · del cielo y el valle al lote desde arriba (a corte, 12,3 dB)
  mitad: 611, //                       Isabella con la mitad (disuelve): su primera palabra suena a los 3 f; su clip acaba justo en el golpe del f797
  bloque5: golpe(GOLPE.bloque5), //   797 · el rincón del árbol (a corte, 9,8 dB)
  vuelo: golpe(GOLPE.vuelo), //       876 · el vuelo que baja al lote (a corte, 9,3 dB)
  vista: golpe(GOLPE.vista), //       949 · la ciudad al horizonte (a corte, 12,5 dB)
  cta: 1062, //                        Isabella en el camino (disuelve): su primera palabra suena a los 13 f
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 3,77 s (113 f) y desde `desde` (12 f) hasta el f108 del clip hay 96. Su voz va de 0,85 a 3,14 s (f1075 a f1144 de la comp): 14 f (0,47 s) de su cara tras la última
 * palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela: el plano acaba antes del final del clip (5 f antes).
 */
const DUR_CTA = 96;

/**
 * Dónde acaba la música (frame de la comp): tras la última palabra del CTA (f1144) se APAGA en línea recta hasta cero aquí, 10 f antes del golpe de 20,9 dB de los 216,877 s (f1167). La tarjeta (f1158) va en silencio.
 */
export const FIN_MUSICA_066 = 1156;

export const metraje066: readonly Corte[] = [
  // ── Bloque 1 · el aéreo ──
  {
    id: "c01-lote",
    bloque: 1,
    tipo: "video",
    src: v("dr01"),
    // DR01 (4K vertical, SDR, nublado claro), del 0,50 al 2,90 s del archivo normalizado: el dron avanza despacio sobre el camino de tierra en curva que baja del lote, con los cipreses a la izquierda y la loma verde
    // debajo; al fondo, las montañas. Movimiento uniforme y lento. Entra a corte con el golpe de 10,1 dB del f3.
    desde: 0.5,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.0, highlights: -0.25, whites: -0.1, saturation: 1.06 }),
    reason:
      "El camino en curva y los cipreses del lote desde el aire (la promesa): prado, bosque y montañas bajo un cielo claro, sin una persona ni un coche. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de la vista.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk05"),
    audio: a("hk05-voz"),
    voz: {
      s0: 1.33,
      s1: 7.87,
      lufs: -15,
      dice: "En Medellín se construyen miles de apartamentos cada año, lotes de 5.000 metros, con esta vista, muy pocos.",
    },
    // La voz empieza a los 1,33 s (40 f) y acaba a los 7,87 s (236 f); el clip dura 9,83 s (295 f). `desde` 18 f entra DISOLVIENDO (el clip tiene 18 f antes) y la primera palabra suena a los 22 f del `en`: la música baja
    // con curva en 10 f y acaba 2 f antes de ella. El plano dura 259 f (hasta el golpe del f331): 41 f tras la última palabra, en los que la música sube (22 f).
    // Isabella camina hacia cámara por el prado: detrás, la loma, los pinos y la cordillera bajo las nubes.
    desde: fr(18),
    en: P.hook,
    dur: P.paseo1 - P.hook,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, exposure: 0.1, shadows: 0.15, highlights: -0.25, whites: -0.1, saturation: 1.04 }),
    reason:
      "El prado con las montañas detrás (la vista, prometida): Isabella camina hacia cámara y dice «en Medellín se construyen miles de apartamentos cada año, lotes de 5.000 metros, con esta vista, muy pocos». Entra disolviendo desde el aéreo; la música ya baja.",
  },
  // ── Bloque 3 · el lote: el cielo a ras de suelo y desde arriba ──
  {
    id: "c03-cielo",
    bloque: 3,
    tipo: "video",
    src: v("rc01"),
    // RC01 (iPhone, 1080×1920, SDR), del 5,60 al 8,87 s: el paneo hacia la derecha pasa del prado a un ciprés grande con el cielo azul y la ciudad como una raya al fondo del valle. Entra A CORTE en el golpe de 10,8 dB del f331.
    desde: 5.6,
    en: P.paseo1,
    dur: P.paseo2 - P.paseo1,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.12, highlights: -0.4, whites: -0.25, saturation: 1.04 }),
    reason:
      "El cielo y el valle a ras de suelo (el umbral): de pie en el prado, el ciprés, las nubes y la ciudad lejos al fondo. Lo primero que se siente en el lote es el aire y la distancia; el golpe que vuelve abre el paseo.",
  },
  {
    id: "c04-lote",
    bloque: 3,
    tipo: "video",
    src: v("dr05"),
    // DR05 (4K vertical, SDR), del 6,40 al 11,17 s del archivo normalizado (el clip entero dura 121 s; solo se codifican los primeros 62): sobre el pasto con su senda y el borde del bosque, el dron levanta la mirada
    // hacia la ladera y asoma la ciudad entre las montañas, mientras entra por abajo el grupo de cipreses. Entra A CORTE en el golpe de 12,3 dB del f429.
    desde: 6.4,
    en: P.paseo2,
    dur: P.mitad - P.paseo2,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05, highlights: -0.3, whites: -0.15, saturation: 1.06 }),
    reason:
      "El lote desde arriba (la extensión): la senda, el pasto y las cercas vivas, y al levantar la mirada el horizonte con la ciudad. De lo que se pisa a lo que se abarca.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c05-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md03"),
    audio: a("md03-voz"),
    voz: {
      s0: 0.5,
      s1: 6.24,
      lufs: -15,
      dice: "Hay una versión de tu vida donde ya no tienes que salir a buscar paz los fines de semana porque ya vives dentro de ella.",
    },
    // La voz empieza a los 0,50 s (15 f) y acaba a los 6,24 s (187 f); el clip dura 6,63 s (199 f, ni uno más). `desde` 12 f entra DISOLVIENDO (el clip tiene 12 f antes) y la primera palabra suena a los 3 f del `en`: la
    // música baja con curva en 8 f y acaba 2 f antes de ella, durante la disolvencia. El plano usa el clip hasta casi su último fotograma (186 f: del f12 al f197, con 1 f de margen) y acaba en el golpe del f797: 12 f tras la última palabra,
    // en los que la música sube (10 f). No se puede alargar ni salir disolviendo: el clip no tiene más.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-066.ts`): «de tu vida» (whisper: «Siente tu vida») y «paz» (whisper: «Car-paz»).
    // Isabella en la loma, con los pinos y las nubes detrás; la cámara la mira de frente y ella abre las manos al decir «paz».
    desde: fr(12),
    en: P.mitad,
    dur: P.bloque5 - P.mitad,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, exposure: 0.1, shadows: 0.15, highlights: -0.3, whites: -0.12, saturation: 1.04 }),
    reason:
      "La loma con los pinos (la paz, dicha): Isabella dice «hay una versión de tu vida donde ya no tienes que salir a buscar paz los fines de semana porque ya vives dentro de ella». Entra disolviendo desde el lote visto desde arriba; es el momento de conexión.",
  },
  // ── Bloque 5 · el rincón, el vuelo y la vista ──
  {
    id: "c06-rincon",
    bloque: 5,
    tipo: "video",
    src: v("rc04"),
    // RC04 (iPhone, 1080×1920, SDR), del 2,40 al 5,03 s: el paneo sale de debajo de las ramas del árbol y se abre al pasto y a la cordillera lejana bajo las nubes. Entra A CORTE en el golpe de 9,8 dB del f797.
    desde: 2.4,
    en: P.bloque5,
    dur: P.vuelo - P.bloque5,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.0, highlights: -0.25, whites: -0.1, saturation: 1.06 }),
    reason:
      "El rincón bajo el árbol que se abre al valle (la intimidad): de la sombra de las ramas al pasto y la cordillera; el sitio donde uno se sentaría a no hacer nada. Prepara la vista.",
  },
  {
    id: "c07-vuelo",
    bloque: 5,
    tipo: "video",
    src: v("dr02"),
    // DR02 (4K vertical, SDR, nublado), del 6,20 al 8,63 s del archivo normalizado: el dron, que miraba la ciudad al horizonte, baja la cámara sobre el bosque hasta el borde del lote, con su camino en curva y su pasto. Entra A CORTE en el golpe de 9,3 dB del f876.
    desde: 6.2,
    en: P.vuelo,
    dur: P.vista - P.vuelo,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.06, shadows: 0.12, highlights: -0.3, whites: -0.15, saturation: 1.06 }),
    reason:
      "El vuelo que baja al lote (de lo cerrado a lo abierto): la mirada pasa del horizonte al bosque y al borde del terreno; de lo que se ve a lo que se compra. Prepara la vista desde arriba.",
  },
  {
    id: "c08-vista",
    bloque: 5,
    tipo: "video",
    src: v("dr01"),
    // DR01 (4K vertical, SDR), del 18,00 al 21,77 s del archivo normalizado: el dron avanza sobre el bosque y abre la ciudad entera al pie de las montañas bajo un cielo de nubes ligeras; el lote queda abajo, con su
    // camino y su ladera verde. Movimiento lento y continuo. Entra A CORTE en el golpe de 12,5 dB del f949 y es el plano más largo del bloque 5 (113 f): el clímax, con la canción en su meseta más alta.
    desde: 18.0,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: [1.0, 1.06],
    entra: "corte",
    color: color({ exposure: 0.12, shadows: 0.18, highlights: -0.35, whites: -0.2, saturation: 1.08 }),
    reason:
      "Medellín desde el lote (la vista, el clímax): el dron abre la ciudad entera y las montañas sobre el bosque, con el terreno debajo: lo que el hook prometió. El plano más largo del bloque, con la canción en su punto más alto.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c09-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct04"),
    audio: a("ct04-voz"),
    voz: {
      s0: 0.85,
      s1: 3.14,
      lufs: -15,
      dice: "Si deseas más información, haz clic en el enlace.",
    },
    // La voz empieza a los 0,85 s (25 f) y acaba a los 3,14 s (94 f); el clip dura 3,77 s (113 f). `desde` 12 f entra DISOLVIENDO (el clip tiene 12 f antes) y la primera palabra suena a los 13 f del `en`. El plano
    // dura 96 f (acaba en el f108 del clip, 5 f antes de su final): 14 f tras la última palabra, en los que la imagen funde a negro (los últimos 6).
    // Isabella camina hacia cámara por el camino de tierra con las cercas y el prado detrás; el CTA es una sola acción.
    desde: fr(12),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, exposure: 0.05, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "El camino con las cercas (la invitación): Isabella dice «si deseas más información, haz clic en el enlace»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-066.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c10-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-066/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c09
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música ya se ha apagado.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c10). */
export const DURACION_066 = P.cta + DUR_CTA + DUR_TARJETA;
