/**
 * EL RECORRIDO 056 — «Casa en Condominio Los Bravos (La Ceja)», V38 del registro, tercer reel de esta casa (reparto 054-062, `proyectos/054/reparto-054-062.md`) — los planos, como DATOS.
 *
 * Ángulo: «SOLO 6 CASAS: la exclusividad que se valoriza», el más racional de los tres de la casa, para el comprador que piensa en inversión. El aéreo enseña el conjunto (las pocas casas del condominio con su vía)
 * → el hook lo dice («Descubre la privacidad de vivir en un condominio de solo seis casas») → el paseo enseña LO CONSTRUIDO (la fachada, el interior social, la cocina) → la mitad lo pone en cifras
 * («los condominios de menos de 10 unidades privadas se valorizan diferente») → las alcobas y el balcón → la vista del valle → el CTA («si realmente buscas tranquilidad, esta casa es para ti. Escríbeme»).
 * Estructura del canal: DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA, con TRES frases de Isabella.
 *
 *   hook   HK04  `IMG_8825` «Descubre la privacidad de vivir en un condominio de solo seis casas.»          (exclusiva de esta pieza, reparto)
 *   mitad  MD02  `IMG_8818` «Los condominios de menos de 10 unidades privadas se valorizan diferente.»       (exclusiva de esta pieza, reparto)
 *   CTA    CT01  `IMG_8911` «Si realmente buscas tranquilidad, esta casa es para ti. Escríbeme.»              (exclusiva de esta pieza, reparto)
 *   aéreo  DR02  `varias_tomas.MP4`, SOLO lo posterior al corte de escena de los 86,05 s de la fuente (85,967 s del archivo normalizado): el tramo de esta pieza en el reparto. 4K VERTICAL, SDR, 29,97 fps.
 *
 * LO QUE ES DE ESTA PIEZA Y LO QUE COMPARTE (`proyectos/056/combinaciones.md`). La valorización que afirma MD02 la dice la voz de Isabella: ni un rótulo ni el caption la prometen. NINGUNA cifra escrita aparte
 * de los subtítulos de lo que ella dice («seis», «10»). Los recorridos RC28, RC05, RC20, RC12 y RC16 son un hilo propio (fachada · interior social · cocina · alcoba principal · alcoba con balcón); los otros dos
 * reels de la casa (054, 055) usan otros planos y se declaran en `combinaciones.md`.
 *
 *   bloque 1  c01                  el conjunto: DR02 97,0-99,9 s, cenital sobre la vía y las casas del condominio, a velocidad constante desde el f0; SIN TEXTO NI VOZ
 *   bloque 2  c02                  Isabella camina hacia cámara por el jardín: el hook (entra disolviendo; su primera palabra suena a los 12 f del golpe)
 *   bloque 3  c03 c04 c05          lo construido: la fachada que aparece al bajar la cámara del cielo (RC28) → el interior social, de la tele al comedor (RC05) → la cocina y sus acabados (RC20)
 *   bloque 4  c06                  Isabella camina por la sala de doble altura: la mitad
 *   bloque 5  c07 c08 c09          la alcoba principal con su vigas y el muro de piedra del baño (RC12) → la alcoba con el balcón y la vista del conjunto (RC16) → LA VISTA: el aéreo que sube del conjunto al valle y
 *                                  se posa en el horizonte (DR02 106,0 s, el plano más largo del bloque)
 *   bloque 6  c10 c11              Isabella sentada en la sala con el sofá gris: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO. La canción es «Heaven on Earth» (lounge/chill, SIN pulso): la rejilla son los golpes MEDIDOS (`musica/golpes-056.json`; `buscar-cortes-lp.py`, estructura de 9 planos y 10 cortes) y cada
 * cambio de plano cae en uno (≥ 9,2 dB las disolvencias, que ACABAN en él; ≥ 10,7 dB los cortes secos). La canción cae a silencio desde los 209,5 s: ahí entra el CTA (el f875 es el golpe de 13,9 dB, 2,4 s antes).
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(12)` = 12/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS. Un plano que entra
 * disolviendo (`disolver`) empieza a verse 12 f ANTES de su `en` (`solapeDe`): su clip tiene que tener esos 12 f antes de `desde`, y el plano anterior dura hasta ese `en`.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f85, 2,8 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la
 * prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-056.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-056";

export const FPS_056 = 30;

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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −23,1 · −24,6 · −26,8 LUFS en su ventana de voz (habla a unos metros
 * de un iPhone); cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS)
 * hasta −15,0 LUFS con el pico real a −2,5 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Heaven on Earth» — `archivos/musica/Heaven on Earth.mp3` (sha 8 `acd99178`), lounge/chill sin pulso, 3:33. Se entra en su golpe de 178,043 s (10,2 dB) y de ahí suena a −13…−15 LUFS hasta que CAE, desde los
 * 209,5 s, a un lecho y al silencio (−13,8 → −24,1 → −70 dB en tramos de 5 s) y acaba a los 213,0 s. Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza
 * a subir»): `proyectos/056/musica/golpes-056.json` (`medir-pista.py --json`). La rejilla la dio `buscar-cortes-lp.py` (V9) con estos planos: ver `musica/rejilla-056.txt`.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 178.043, db: 10.2 },
  /** La disolvencia al hook ACABA aquí (la imagen de Isabella ya es opaca): el golpe suena entero y la música baja con curva después. */
  hook: { t: 180.363, db: 9.2 },
  /** Cortes secos del paseo y del bloque 5. */
  paseo1: { t: 184.387, db: 13.7 },
  paseo2: { t: 187.159, db: 10.8 },
  paseo3: { t: 190.23, db: 14.7 },
  /** La disolvencia a la mitad ACABA aquí. */
  mitad: { t: 193.193, db: 13.3 },
  /** La disolvencia al primer plano del bloque 5 ACABA aquí. */
  alcoba: { t: 197.681, db: 11.4 },
  alcoba2: { t: 200.617, db: 15.5 },
  vista: { t: 203.402, db: 10.7 },
  /** La disolvencia al CTA ACABA aquí; la canción cae sola 2,4 s después. */
  cta: { t: 207.118, db: 13.9 },
} as const;

/** Dónde cae la canción (s): −13,8 → −24,1 → silencio. */
export const DECAE = { t: 209.5, lufsAntes: -13.8, lufs5s: -24.1, lufs10s: -70 } as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (178,043 s) cae en el frame 3 de la pieza; redondeado a un frame (5340/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 5340 / FPS_056;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_056;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_056;

/** Isabella: un empuje lento hacia ella (camina hacia cámara: el empuje la acompaña). Los recorridos y el aéreo, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-056/${id}.mp4`;
const a = (id: string): string => `recorrido-056/${id}.wav`;

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
 * Los frames de cada cambio de plano: todos salen de `golpe(...)`, así que mover la entrada de la música es cambiar `INICIO_MUSICA`. Los que entran disolviendo (hook, mitad, alcoba, CTA) tienen aquí el `en` de la
 * disolvencia YA TERMINADA: el plano anterior dura hasta él y el siguiente empieza a verse 12 f antes.
 */
const P = {
  hook: golpe(GOLPE.hook), //       73 · Isabella ya es opaca; su primera palabra suena 12 f después
  paseo: golpe(GOLPE.paseo1), //   193 · acaba el hook; el golpe abre el paseo (a corte)
  sala: golpe(GOLPE.paseo2), //    276 · el interior social (a corte)
  cocina: golpe(GOLPE.paseo3), //  369 · la cocina (a corte)
  mitad: golpe(GOLPE.mitad), //    457 · Isabella con la mitad (disuelve)
  alcoba: golpe(GOLPE.alcoba), //  592 · la alcoba principal (disuelve)
  balcon: golpe(GOLPE.alcoba2), // 680 · la alcoba con balcón (a corte)
  vista: golpe(GOLPE.vista), //    764 · la vista del valle (a corte)
  cta: golpe(GOLPE.cta), //        875 · Isabella con el CTA (disuelve)
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 6,81 s (204 f) y desde `desde` (44 f) hasta el f165 del clip hay 121. Su voz va de 1,86 a 5,04 s (f887-1,0 a f982 de la comp): 14 f (0,47 s) de su cara tras la última
 * palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela: el plano acaba antes del final del clip, que sigue 39 f más.
 */
const DUR_CTA = 121;

/**
 * Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero aquí. La canción ya cae sola (−21 → −31 LUFS tras los 211 s: es su cola) y su archivo decodificado dura
 * 212,83 s, así que no puede leerse más allá del f1045; se llega a cero en el f1040, 16 f antes del final de la pieza (la tarjeta va en silencio; tras los 209,5 s la pista no trae más golpes).
 */
export const FIN_MUSICA_056 = 1040;

export const metraje056: readonly Corte[] = [
  // ── Bloque 1 · el conjunto ──
  {
    id: "c01-conjunto",
    bloque: 1,
    tipo: "video",
    src: v("dr02"),
    // DR02 (4K vertical, SDR, nublado), del 97,00 al 99,87 s del archivo normalizado: el dron avanza en cenital sobre la vía de asfalto nuevo y el camino de tierra, y pasan por el centro las casas del condominio
    // (la de tejas con el cobertizo blanco, la de patio de ladrillo y la blanca de techo curvo). Movimiento uniforme (8,6, dispersión 0,014: `ventana-fina.py`). Entra a corte con el golpe de 10,2 dB del f3.
    desde: 97.0,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.05, shadows: 0.1, highlights: -0.3, saturation: 1.08 }),
    reason:
      "El conjunto visto desde arriba (la promesa): las pocas casas del condominio con su vía nueva y sus jardines. Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de seis casas.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk04"),
    audio: a("hk04-voz"),
    voz: {
      s0: 0.8,
      s1: 3.82,
      lufs: -15,
      dice: "Descubre la privacidad de vivir en un condominio de solo seis casas.",
    },
    // La voz empieza a los 0,80 s (24 f) y acaba a los 3,82 s (114,6 f); el clip dura 7,00 s (210 f). `desde` 12 f entra DISOLVIENDO (el clip tiene 12 f antes) y la primera palabra suena a los 12 f del `en`: la música
    // baja con curva sobre ellos (10 f). El plano dura 120 f (hasta el golpe del f193): 17 f tras la última palabra, en los que la música sube.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-056.ts`): «privacidad» (whisper oye «prioridad»; `formantes.py`: la vocal tras «pri-» es una /a/ abierta, F1 ≈ 730-790 Hz como la de «casas», y no la /o/ de «solo», F1 ≈ 520-590; y hay un resalte de fricativa a 1,60-1,66 s; cierra la vocal, no la palabra).
    // Isabella camina hacia cámara por el jardín, con el seto, el ladrillo de las casas vecinas y el cielo azul; al final de la toma la cámara gira hacia la pérgola y la puerta de la casa.
    desde: fr(12),
    en: P.hook,
    dur: P.paseo - P.hook,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, exposure: 0.05, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "Jardín con el cielo azul (la privacidad): Isabella camina hacia cámara y dice «descubre la privacidad de vivir en un condominio de solo seis casas». Entra disolviendo desde el aéreo; la música ya está abajo.",
  },
  // ── Bloque 3 · lo construido: la fachada, el interior social y la cocina ──
  {
    id: "c03-fachada",
    bloque: 3,
    tipo: "video",
    src: v("rc28"),
    // RC28 (iPhone, 1080×1920, SDR), del 0,30 al 3,07 s: la cámara baja de un cielo de nubes blancas hasta la fachada blanca de dos volúmenes con el árbol y el jardín verde delante: lo primero que se descubre de lo
    // construido. Entra A CORTE en el golpe de 13,7 dB que abre el paseo (f193).
    desde: 0.3,
    en: P.paseo,
    dur: P.sala - P.paseo,
    zoom: QUIETO,
    entra: "corte",
    color: color({ shadows: 0.22, highlights: -0.3, whites: -0.15, saturation: 1.06 }),
    reason:
      "La fachada (lo construido, por fuera): la cámara baja del cielo hasta la casa blanca de dos volúmenes con su jardín; el golpe del paseo abre el descubrimiento.",
  },
  {
    id: "c04-sala",
    bloque: 3,
    tipo: "video",
    src: v("rc05"),
    // RC05 (iPhone, 1080×1920, SDR), del 2,00 al 5,10 s: la tele sobre su mueble, los sofás grises con el sillón rojo y el ventanal al jardín, la escalera metálica y la mesa del comedor con las esferas. El paseo
    // entra por la pérgola y sigue hacia la cocina.
    desde: 2.0,
    en: P.sala,
    dur: P.cocina - P.sala,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.15, shadows: 0.3, highlights: -0.2, whites: -0.1, saturation: 1.06 }),
    reason:
      "El interior social (lo construido, por dentro): de la tele y los sofás al ventanal con el jardín, la escalera y el comedor; el espacio doble de la casa de 220 m².",
  },
  {
    id: "c05-cocina",
    bloque: 3,
    tipo: "video",
    src: v("rc20"),
    // RC20 (iPhone, 1080×1920, SDR), del 0,10 al 3,03 s: la cocina en L con el mesón negro, los gabinetes de madera clara y, al final, la cafetera: los acabados. Sin personas. La 055 usa este clip de 2,2 a 4,8 s
    // (la cafetera): se comparten 0,8 s (declarado en `combinaciones.md`).
    desde: 0.1,
    en: P.cocina,
    dur: P.mitad - P.cocina,
    zoom: QUIETO,
    entra: "corte",
    color: color({ shadows: 0.2, highlights: -0.2, saturation: 1.06 }),
    reason:
      "La cocina y sus acabados (lo construido, al detalle): el mesón negro, los gabinetes de madera clara y la cafetera; lo que se ve cuando uno se fija en cómo está hecha la casa.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md02"),
    audio: a("md02-voz"),
    voz: {
      s0: 0.82,
      s1: 4.07,
      lufs: -15,
      dice: "Los condominios de menos de 10 unidades privadas se valorizan diferente.",
    },
    // La voz empieza a los 0,82 s (24,6 f) y acaba a los 4,07 s (122,1 f); el clip dura 8,90 s (267 f). `desde` 12 f entra DISOLVIENDO (el clip tiene 12 f antes) y la primera palabra suena a los 13 f del `en`:
    // la música baja con curva en 10 f. El plano dura 135 f: 25 f tras la última palabra, en los que la música sube (22 f) antes del golpe del f592.
    // La valorización la DICE ISABELLA (encargo): no hay un rótulo del canal ni una promesa en el caption.
    // Isabella camina por la sala de doble altura (vigas, ventanas altas y la tele), de la escalera hacia los sofás.
    desde: fr(12),
    en: P.mitad,
    dur: P.alcoba - P.mitad,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, highlights: -0.2, whites: -0.1, saturation: 1.04 }),
    reason:
      "Sala de doble altura (la cifra, dicha): Isabella camina por la sala y dice «los condominios de menos de 10 unidades privadas se valorizan diferente». Entra disolviendo desde la cocina.",
  },
  // ── Bloque 5 · las alcobas, el balcón y la vista ──
  {
    id: "c07-alcoba",
    bloque: 5,
    tipo: "video",
    src: v("rc12"),
    // RC12 (iPhone, 1080×1920, SDR), del 3,00 al 5,93 s: la alcoba principal con el techo de vigas, la cama con el cuadro y la luz cálida, el ventanal corredizo, y la cámara gira hacia el muro de piedra del baño con
    // el jacuzzi. Se salta el closet y el rascador del gato (0-2,5 s). Entra DISOLVIENDO (el clip tiene 3 s antes).
    desde: 3.0,
    en: P.alcoba,
    dur: P.balcon - P.alcoba,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ shadows: 0.15, highlights: -0.2, saturation: 1.06 }),
    reason:
      "La alcoba principal (el descanso): el techo de vigas, la cama con su luz cálida y el muro de piedra del baño con el jacuzzi: lo que se cuida en la casa de 220 m² cuando se cierra la puerta.",
  },
  {
    id: "c08-balcon",
    bloque: 5,
    tipo: "video",
    src: v("rc16"),
    // RC16 (iPhone, 1080×1920, SDR), del 3,20 al 6,00 s: la alcoba con la colcha azul y el ventanal; la cámara sale al balcón y enseña las casas de al lado (la amarilla, la de ladrillo), el camino y la montaña con el cielo de nubes. Una de las
    // otras alcobas de la casa (la ficha: cuatro, una en el primer piso).
    desde: 3.2,
    en: P.balcon,
    dur: P.vista - P.balcon,
    zoom: QUIETO,
    entra: "corte",
    color: color({ shadows: 0.22, highlights: -0.3, whites: -0.15, saturation: 1.06 }),
    reason:
      "Otra alcoba con balcón (el espacio de más): la cámara cruza el ventanal y sale al balcón con la vista del entorno y la montaña; de lo cerrado a lo abierto, hacia la vista.",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("dr02"),
    // DR02 (4K vertical, SDR, nublado), del 106,00 al 109,70 s: el dron levanta la mirada del conjunto al horizonte y se posa: valle verde con las casas del pueblo, la colina y las montañas bajo un cielo de nubes
    // (movimiento 9,7 → 0,4: la inclinación frena sola, `mov.py`). Entra A CORTE en el golpe de 10,7 dB (f764) y es el plano más largo del bloque 5 (111 f): el clímax. Un empuje lento mantiene la vida cuando se posa.
    desde: 106.0,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: [1.0, 1.06],
    entra: "corte",
    color: color({ exposure: 0.05, shadows: 0.1, highlights: -0.35, whites: -0.2, saturation: 1.08 }),
    reason:
      "El valle desde arriba (la vista, el clímax): el dron levanta la mirada del conjunto al horizonte y se posa sobre el valle y las montañas de La Ceja: lo que rodea las pocas casas del condominio. El plano más largo del bloque.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct01"),
    audio: a("ct01-voz"),
    voz: {
      s0: 1.86,
      s1: 5.04,
      lufs: -15,
      dice: "Si realmente buscas tranquilidad, esta casa es para ti. Escríbeme.",
    },
    // La voz empieza a los 1,86 s (55,8 f) y acaba a los 5,04 s (151,2 f); el clip dura 6,81 s (204 f). `desde` 44 f entra DISOLVIENDO (el clip tiene 44 f antes) y la primera palabra suena a los 12 f del `en`. El
    // plano dura 121 f (acaba en el f165 del clip, 39 f antes de su final): 13,8 f tras la última palabra, en los que la imagen funde a negro (los últimos 6).
    // Isabella sentada en el sofá gris de la sala, con la tele, los espejos y la cojinería de crochet detrás.
    desde: fr(44),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, highlights: -0.2, whites: -0.1, saturation: 1.04 }),
    reason:
      "Sala con el sofá gris (la invitación): Isabella, sentada, dice «si realmente buscas tranquilidad, esta casa es para ti. Escríbeme»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-056.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-056/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_056 = P.cta + DUR_CTA + DUR_TARJETA;
