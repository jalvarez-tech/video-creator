/**
 * EL RECORRIDO 058 — «Apartamento en Palmazera (La Ceja)», V40 del registro, segundo reel de este apartamento (reparto 054-062, `proyectos/054/reparto-054-062.md`) — los planos, como DATOS.
 *
 * Ángulo: «60 M² QUE RINDEN: pequeño no es poco». El aéreo enseña el edificio de ladrillo (la promesa) → el hook lo plantea con otra palabra («un apartamento pensado para descansar, no para sobrevivir al caos»)
 * → el paseo enseña CÓMO CABE TODO en un solo ambiente (la cocina corredor con nevera, horno, fregadero y cafetera; la barra con microondas y estufa; y de la cocina al comedor y la sala, sin paredes de por medio)
 * → la mitad lo pone en cifras («lo que cabe en 60 metros cuadrados en Palmazera te va a cambiar la idea del apartamento pequeño») → el bloque 5 sigue por lo privado (los DOS baños y el vestier) → la vista de
 * La Ceja con sus montañas desde arriba → el CTA («escríbeme y te cuento por qué este lugar se siente diferente desde que entras»).
 * Estructura del canal: DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA, con TRES frases de Isabella.
 *
 *   hook   HK02  `IMG_8713` «Este es un apartamento pensado para descansar, no para sobrevivir al caos.»                (exclusiva de esta pieza, reparto)
 *   mitad  MD07  `IMG_8729` «Lo que cabe en 60 metros cuadrados en Palmazera te va a cambiar la idea del apartamento pequeño.»  (exclusiva de esta pieza, reparto)
 *   CTA    CT01  `IMG_8723` «Escríbeme y te cuento por qué este lugar se siente diferente desde que entras.»           (exclusiva de esta pieza, reparto)
 *   aéreo  DR04 `DJI_…0080` (el edificio, apertura) y DR05 `DJI_…0081` (la vista); DR06 (`…0082`) no se usa. 4K VERTICAL (rotation=90), SDR, 29,97 fps.
 *
 * LO QUE ES DE ESTA PIEZA Y LO QUE COMPARTE (`proyectos/058/combinaciones.md`). Hilo propio: «cada metro resuelto» (cocina · barra · comedor-sala · dos baños con vestier). Con las otras dos versiones del apartamento
 * (057 «paz», 059 «el estrés»; sesiones paralelas) no se pisa ni un segundo de metraje: lo acordado en `side-session-notes/…/058-tramos-de-recorrido.md`.
 *
 *   bloque 1  c01                  el edificio de ladrillo desde arriba: DR04 2,1-4,9 s, a velocidad constante desde el f0; SIN TEXTO NI VOZ
 *   bloque 2  c02                  Isabella camina hacia cámara por el pasillo: el hook (entra A CORTE: su primera sílaba suena a los 3 f)
 *   bloque 3  c03 c04 c05          la cocina corredor (RC14) → la barra con la estufa y el microondas (RC01) → de la cocina al comedor y la sala (RC07, el plano que desemboca donde habla Isabella)
 *   bloque 4  c06                  Isabella en la sala, junto al ventanal: la mitad
 *   bloque 5  c07 c08 c09          el baño del pasillo (RC19) → el vestier y el baño principal (RC23) → LA VISTA: el aéreo que se aleja del edificio y abre La Ceja con sus montañas (DR05, el plano más largo)
 *   bloque 6  c10 c11              Isabella sentada en el sofá junto al balcón: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO. La canción es «Ivory Skyline Reverie» (lounge/downtempo, SIN pulso: 25 % de los golpes fuertes sobre cualquier recta, `rejilla.py`): la rejilla son los golpes MEDIDOS
 * (`musica/golpes-058.json`; `medir-pista.py`) y cada corte seco cae en uno (≥ 10,6 dB). La entrada a un plano de Isabella (el hook A CORTE, la mitad y el CTA por disolvencia) NO cae en un golpe: ella habla a los 0,1 s /
 * 0,4 s / 0,6 s de su toma y la música tiene que haber ACABADO de bajar antes de su primera palabra (regla del canal desde el 022), así que ese golpe quedaría bajo la voz; es lo que hizo el 042 (declarado).
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(12)` = 12/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS. Un plano que entra
 * disolviendo (`disolver`) empieza a verse 12 f ANTES de su `en` (`solapeDe`): su clip tiene que tener esos 12 f antes de `desde`, y el plano anterior dura hasta ese `en`.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f87, 2,9 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la
 * prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-058.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-058";

export const FPS_058 = 30;

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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −26,7 · −23,5 · −23,8 LUFS en su ventana de voz (habla a unos metros
 * de un iPhone); cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS)
 * hasta −15,0 LUFS con el pico real a −2,5 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Ivory Skyline Reverie» — `archivos/musica/Ivory Skyline Reverie.mp3` (sha 8 `80bf4f33`), lounge/downtempo SIN pulso (el arpegio late cada ≈ 0,35-0,5 s, pero sin una recta que alinee más del 25 % de los golpes
 * fuertes), 3:17. Se entra en su golpe de 158,112 s (18,2 dB) y de ahí suena a −11…−12,5 LUFS (muy alta: el nivel de cada tramo es una ganancia del plan, `audio-058.ts`) hasta que CAE, desde los 194,5 s, y acaba a los 197,2 s.
 * Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir»): `proyectos/058/musica/golpes-058.json` (`medir-pista.py --json`).
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 158.112, db: 18.2 },
  /** El último golpe que suena ENTERO en la apertura: tras él la música baja con curva y acaba de bajar donde el hook entra a corte (f84). */
  apertura: { t: 160.224, db: 14.6 },
  /** Cortes secos del paseo. */
  paseo1: { t: 165.163, db: 15.8 },
  paseo2: { t: 168.183, db: 17.1 },
  paseo3: { t: 170.825, db: 10.6 },
  /** El último golpe que suena entero antes de que la música baje bajo la mitad. */
  previoMitad: { t: 173.845, db: 12.7 },
  /** Cortes secos del bloque 5. */
  bano1: { t: 179.399, db: 12.0 },
  bano2: { t: 182.279, db: 14.9 },
  vista: { t: 185.293, db: 12.9 },
  /** El último golpe que suena entero antes de que la música baje bajo el CTA. */
  previoCta: { t: 188.659, db: 17.0 },
} as const;

/** Dónde cae la canción (s): −12,7 → −23,8 → silencio. Ya no cae dentro de esta pieza (acaba a los 197,2 s y la música se apaga antes, en `FIN_MUSICA_058`). */
export const DECAE = { t: 194.5, lufsAntes: -12.7, lufs5s: -23.8 } as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (158,112 s) cae en el frame 3 de la pieza; redondeado a un frame (4742/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 4742 / FPS_058;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_058;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_058;

/** Isabella: un empuje lento (camina hacia cámara o se sienta: el empuje la acompaña). Los recorridos y el aéreo, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-058/${id}.mp4`;
const a = (id: string): string => `recorrido-058/${id}.wav`;

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
 * Los frames de cada cambio de plano. Los CORTES SECOS salen de `golpe(...)`, así que mover la entrada de la música es cambiar `INICIO_MUSICA`. Los tres planos de Isabella no caen en un golpe (ver arriba):
 *   · `hook` (84): A CORTE; la música baja con curva en los 15 f anteriores (tras el golpe del f66) y la primera sílaba suena a los 3 f.
 *   · `mitad` (493) y `cta` (934): disolvencias que ACABAN ahí; la música baja con curva en los 15 y 12 f anteriores (tras el último golpe entero) y su primera palabra suena a los 0,6 f y 1 f del `en`.
 * El `en` de una disolvencia es el de la disolvencia YA TERMINADA: el plano anterior dura hasta él y el siguiente empieza a verse 12 f antes.
 */
const P = {
  hook: 84, //                         la apertura dura 84 f (2,8 s)
  paseo: golpe(GOLPE.paseo1), //      215 · acaba el hook; el golpe abre el paseo (a corte)
  barra: golpe(GOLPE.paseo2), //      305 · la barra con la estufa (a corte)
  comedor: golpe(GOLPE.paseo3), //    384 · de la cocina al comedor y la sala (a corte)
  mitad: 493, //                       Isabella con la mitad (disuelve; tras el golpe del f475)
  bano1: golpe(GOLPE.bano1), //       642 · el baño del pasillo (a corte)
  bano2: golpe(GOLPE.bano2), //       728 · el vestier y el baño principal (a corte)
  vista: golpe(GOLPE.vista), //       818 · la vista (a corte)
  cta: 934, //                         Isabella con el CTA (disuelve; tras el golpe del f919)
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 4,84 s (145 f) y desde `desde` (17 f) hasta el f142 del clip hay 125. Su voz va de 0,60 a 4,24 s (f935 a f1044 de la comp): 15 f (0,5 s) de su cara tras la última
 * palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela: el plano acaba 3 f antes del final del clip.
 */
const DUR_CTA = 125;

/**
 * Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero aquí (la tarjeta va en silencio). La canción trae su caída natural a los 194,5 s (f1093): se apaga antes.
 */
export const FIN_MUSICA_058 = 1086;

export const metraje058: readonly Corte[] = [
  // ── Bloque 1 · el edificio ──
  {
    id: "c01-edificio",
    bloque: 1,
    tipo: "video",
    src: v("dr04"),
    // DR04 (4K vertical, SDR, cielo azul), del 2,10 al 4,90 s del archivo normalizado: el dron pasa en paralelo a la fachada de ladrillo y gris del edificio (seis pisos con balcones), con el jardín y la loma verde
    // a la derecha. Movimiento uniforme (4,0, dispersión 0,06: `ventana-fina.py`; arranca desde parado, así que se salta el primer segundo). Entra a corte con el golpe de 18,2 dB del f3.
    desde: 2.1,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.05, shadows: 0.1, highlights: -0.3, saturation: 1.08 }),
    reason:
      "El edificio de ladrillo visto desde arriba (la promesa): el dron pasa en paralelo a sus seis pisos con el jardín y la loma. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de descansar.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk02"),
    audio: a("hk02-voz"),
    voz: {
      s0: 0.1,
      s1: 3.72,
      lufs: -15,
      dice: "Este es un apartamento pensado para descansar, no para sobrevivir al caos.",
    },
    // La voz empieza a los 0,10 s (3 f) y acaba a los 3,72 s (111,6 f); el clip dura 6,89 s (207 f). `desde` 0 entra A CORTE en el f84 y la primera sílaba suena 3 f después: la música ya tiene que estar abajo (baja con
    // curva desde el golpe del f66, ver `audio-058.ts`). El plano dura 131 f (hasta el golpe del f215): 19 f tras la última palabra, en los que la música sube.
    // Isabella camina hacia cámara por el pasillo largo, con luz cálida de techo, lejos al principio; sale a la sala con la lámpara y el sofá. El empuje la acompaña.
    desde: 0,
    en: P.hook,
    dur: P.paseo - P.hook,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.04, exposure: 0.05, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "Pasillo con luz cálida (descansar, sin caos): Isabella camina hacia cámara y dice «este es un apartamento pensado para descansar, no para sobrevivir al caos». Entra a corte desde el aéreo; la música ya está abajo.",
  },
  // ── Bloque 3 · la cocina, la barra y de la cocina a la sala ──
  {
    id: "c03-cocina",
    bloque: 3,
    tipo: "video",
    src: v("rc14"),
    // RC14 (iPhone, 1080×1920, SDR), del 0,30 al 3,30 s: se camina por la cocina corredor: la nevera (que se queda atrás a la derecha), el horno, el fregadero, la cafetera y la estufa con su campana. Es lo primero que se
    // ve de la casa y contesta al «caos» del hook con orden: todo en su sitio en un metro y medio de ancho. Entra A CORTE en el golpe de 15,8 dB que abre el paseo (f215).
    desde: 0.3,
    en: P.paseo,
    dur: P.barra - P.paseo,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "La cocina corredor (lo que cabe, 1.º): nevera, horno, fregadero, cafetera y estufa en fila, sin un cajón de más; el golpe del paseo abre el descubrimiento con orden, la respuesta al «caos» del hook.",
  },
  {
    id: "c04-barra",
    bloque: 3,
    tipo: "video",
    src: v("rc01"),
    // RC01 (iPhone, 1080×1920, SDR), del 0,20 al 2,83 s: la cámara se desliza a lo largo del mesón: el microondas bajo su campana, la estufa, la cafetera y el fregadero, con el talavera de la barra en primer plano. Los
    // aparatos que la cocina anterior no enseñó (microondas y estufa de frente).
    desde: 0.2,
    en: P.barra,
    dur: P.comedor - P.barra,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "La barra con el mesón (lo que cabe, 2.º): el microondas bajo su campana, la estufa y la cafetera, y delante la barra de talavera donde se come: una cocina equipada y compacta.",
  },
  {
    id: "c05-comedor",
    bloque: 3,
    tipo: "video",
    src: v("rc07"),
    // RC07 (iPhone, 1080×1920, SDR), del 2,60 al 6,23 s: de la nevera y la barra con sus taburetes la cámara sale de la cocina y gira hacia el comedor de mesa redonda, el sofá gris y el ventanal con el balcón: lo que
    // «cabe» es una sala-comedor-cocina de un solo ambiente. El clip dura 6,27 s: el plano acaba 1 f antes del final.
    // Desemboca donde habla Isabella en la mitad (la sala del ventanal): la disolvencia a la mitad es de este mismo espacio.
    desde: 2.6,
    en: P.comedor,
    dur: P.mitad - P.comedor,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "De la cocina al comedor y la sala (lo que cabe, 3.º): la cámara sale de la barra y revela, sin una pared de por medio, el comedor de mesa redonda, el sofá y el ventanal: un solo ambiente que se sabe grande.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md07"),
    audio: a("md07-voz"),
    voz: {
      s0: 0.42,
      s1: 4.86,
      lufs: -15,
      dice: "Lo que cabe en 60 metros cuadrados en Palmazera te va a cambiar la idea del apartamento pequeño.",
    },
    // La voz empieza a los 0,42 s (12,6 f) y acaba a los 4,86 s (145,8 f); el clip dura 5,44 s (163 f). `desde` 12 f entra DISOLVIENDO (el clip tiene 12 f antes) y la primera palabra suena a los 0,6 f del `en`: la
    // música baja con curva en los 15 f anteriores (tras el golpe del f475). El plano dura 149 f (hasta el golpe del f642): 15 f tras la última palabra, en los que la música sube (13 f).
    // POR CONFIRMAR AL OÍDO: «Palmazera» (whisper oye «Palmacera», confianza 0,29); la ficha de la web y el reparto dicen Palmazera. Isabella, en la sala junto al ventanal, señala el espacio y se detiene al centro sonriendo.
    desde: fr(12),
    en: P.mitad,
    dur: P.bano1 - P.mitad,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, exposure: 0.12, shadows: 0.22, highlights: -0.2, whites: -0.1, saturation: 1.04 }),
    reason:
      "La sala del ventanal (la cifra, dicha): Isabella señala la sala y dice «lo que cabe en 60 metros cuadrados en Palmazera te va a cambiar la idea del apartamento pequeño». Entra disolviendo desde el comedor de la sala.",
  },
  // ── Bloque 5 · los dos baños, el vestier y la vista ──
  {
    id: "c07-bano1",
    bloque: 5,
    tipo: "video",
    src: v("rc19"),
    // RC19 (iPhone, 1080×1920, SDR), del 0,80 al 3,67 s: el baño del pasillo: lavamanos de pedestal con el mueble de madera y la planta, el sanitario y la ducha de vidrio; la cámara se desliza del lavamanos a la ducha.
    // Luz cálida de tungsteno (amarillea: el ajuste de color la enfría). El clip dura 4,5 s; se salta el primer 0,8 s (el marco de la puerta pasa por delante).
    desde: 0.8,
    en: P.bano1,
    dur: P.bano2 - P.bano1,
    zoom: QUIETO,
    entra: "corte",
    color: color({ temperature: -0.06, saturation: 1.04, highlights: -0.25 }),
    reason:
      "El primer baño (el segundo metro que rinde): lavamanos, mueble de madera, planta y ducha de vidrio en un baño que no renuncia a nada; la cámara va del lavamanos a la ducha.",
  },
  {
    id: "c08-vestier",
    bloque: 5,
    tipo: "video",
    src: v("rc23"),
    // RC23 (iPhone, 1080×1920, SDR), del 0,00 al 3,03 s: se entra al baño principal por el vestier (las estanterías con la ropa a un lado) hasta el mueble con mesón de granito, el sanitario y la ducha de vidrio al fondo.
    // Empalma con el plano anterior por el vidrio de la ducha (RC19 acaba en ella, RC23 empieza mirándola).
    desde: 0.0,
    en: P.bano2,
    dur: P.vista - P.bano2,
    zoom: QUIETO,
    entra: "corte",
    color: color({ temperature: -0.04, saturation: 1.04 }),
    reason:
      "El vestier y el segundo baño (el clóset y el baño principal): se entra por las estanterías de la ropa hasta el mesón de granito y la ducha de vidrio: la alcoba principal con baño y vestier de la ficha.",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("dr05"),
    // DR05 (4K vertical, SDR, cielo con nubes), del 3,50 al 7,37 s del archivo normalizado: el dron se aleja de la fachada de ladrillo y abre el casco urbano de La Ceja con las montañas y los cúmulos al fondo, la loma
    // verde delante (movimiento 13, dispersión 0,03 desde los 3,6 s: `ventana-fina.py`). El clip dura 7,41 s: el plano acaba 1 f antes del final. Entra A CORTE en el golpe de 12,9 dB (f818) y es el plano más largo del
    // bloque 5 (116 f): el clímax.
    desde: 3.5,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.05, shadows: 0.1, highlights: -0.35, whites: -0.2, saturation: 1.08 }),
    reason:
      "La Ceja desde arriba (la vista, el clímax): el dron se aleja del edificio y abre el pueblo con sus montañas y sus nubes: 60 metros cuadrados en un lugar que se siente grande. El plano más largo del bloque.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct01"),
    audio: a("ct01-voz"),
    voz: {
      s0: 0.6,
      s1: 4.24,
      lufs: -15,
      dice: "Escríbeme y te cuento por qué este lugar se siente diferente desde que entras.",
    },
    // La voz empieza a los 0,60 s (18 f) y acaba a los 4,24 s (127,2 f); el clip dura 4,84 s (145 f). `desde` 17 f entra DISOLVIENDO (el clip tiene 17 f antes) y la primera palabra suena 1 f después del `en`: la música
    // baja con curva en los 12 f anteriores (tras el golpe del f919). El plano dura 125 f (acaba en el f142 del clip, 3 f antes de su final): 15 f tras la última palabra, en los que la imagen funde a negro (los últimos 6).
    // Isabella sentada en el sofá gris junto al balcón (ladrillo y cielo en la ventana), con las manos cruzadas y una sonrisa.
    desde: fr(17),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "disolver",
    // A contraluz del balcón y con ropa y sofá oscuros: se sube la exposición y las sombras (luma 85 → ≈ 105-120) sin tocar el balcón (luces −0,35) ni la piel (saturación 1,04, temperatura 0,03).
    color: color({ contrast: 1.0, exposure: 0.36, shadows: 0.45, highlights: -0.35, whites: -0.15, blacks: 0, saturation: 1.04 }),
    reason:
      "El sofá junto al balcón (la invitación): Isabella, sentada, dice «escríbeme y te cuento por qué este lugar se siente diferente desde que entras»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-058.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-058/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_058 = P.cta + DUR_CTA + DUR_TARJETA;
