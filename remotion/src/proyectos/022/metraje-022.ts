/**
 * EL RECORRIDO 022 — «One Living · Envigado», PRIMER REEL DE ESTA PROPIEDAD (V6 del registro) — los planos, como DATOS.
 *
 * Es el primer reel que no es de Los Patios (017-021 son de esa propiedad): otra casa, otro material (26 clips, sin dron), otras tres tomas
 * de Isabella y otra canción. El formato es el mismo (`recorrido-luxur`, seis bloques; reglas fijas del canal en su `SKILL.md` §0).
 *
 * REVISIÓN 4 (pedido del usuario, 2026-10-06: «como esta propiedad no tiene dron empecemos directamente con el hook»): la pieza ABRE con el hook, sin plano de la casa delante. Rompe a propósito la regla fija «la primera
 * toma sale sin texto ni voz» (como la rev. 2 de la V5 de Los Patios): la excepción está declarada en la puerta (`ABRE_CON_EL_HOOK`). Se quitó el plano `c01-ventanal` (RC13, 1,8 s) y no se renumeraron los demás. El golpe de entrada de
 * la canción suena en el f1 y la música baja antes de la primera palabra (f11,4).
 *
 * LA IDEA: «el balcón y lo que hay detrás de él». El hook es una pregunta que selecciona —«si para ti un apartamento sin balcón no es opción,
 * mira esto»— dicha desde el balcón; el paseo entra por la cocina y la sala hasta la alcoba secundaria, donde ella cuenta que cada habitación
 * tiene su baño y su vestier; sigue por la alcoba principal, el vestier, el baño y acaba en el ventanal con la vista, y ella cierra con la
 * ubicación desde la alcoba principal.
 *
 *   hook      HK2   BALCON   «Si para ti un apartamento sin balcón no es opción, mira esto.»
 *   mitad     MD1   ALCOBA-SEC  «Aquí cada habitación tiene su baño y su vestier, además de estar conectada con la zona social y el balcón.»
 *   CTA       CT1   ALCOBA-PPAL «Estamos en la Loma del Escobero, en Envigado. Si quieres más información, contáctame.»
 *
 * Tres sitios distintos (el balcón, la alcoba secundaria, la alcoba principal) y NINGUNA cifra. Lo que NO se usa y por qué está en
 * `proyectos/022/analisis-uso.md` §B: HK4 («plusvalía segura de 94 millones»: promete valorización) y CT3 («maximizar tu rentabilidad») quedan
 * fuera; HK3 («renta corta») y HK1 (la cifra «76», que choca con el rango de la tipología) esperan el OK del usuario; CT2 («agendemos una visita»)
 * espera saber si Luxur agenda.
 *
 *   bloque 2  c02              Isabella en el balcón: el hook (HK2), A CORTE EN EL FRAME 0 (revisión 4)
 *   bloque 3  c03 c04 c05      el paseo, de la cocina a la alcoba secundaria: la cocina abierta con el ventanal al fondo (RC06), la cocina y la sala
 *                              (RC05) y el paso de la sala a la alcoba (RC15)
 *   bloque 4  c06              Isabella en la alcoba secundaria, frente al baño y el vestier: la mitad (MD1)
 *   bloque 5  c07 c08 c09 c10  la alcoba principal con su ventanal (RC10), el vestier (RC16), el baño (RC02) y el ventanal con la vista (RC12: la más larga)
 *   bloque 6  c11 c12          Isabella en la alcoba principal: el CTA (CT1); y la tarjeta oscura del cierre (nada se congela)
 *
 * LECTURA DEL PASEO (declarada; la planta no está, el orden sale de `recorrido caminando` y de `sala, habitacion secundaria, vestier`).
 * Sentido I, de la entrada al fondo: cocina → sala → (puerta) alcoba secundaria → alcoba principal. El hook está en el balcón, que es el extremo
 * opuesto, así que el primer plano del paseo es un salto de lugar y no una continuación: el hook promete («mira esto») y el paseo empieza donde
 * se entra. RC12 (el ventanal) es de la alcoba SECUNDARIA y vuelve a una habitación ya vista: se declara; es el plano de vista más abierto del
 * rodaje y el que mejor cierra el bloque 5.
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA, POR GOLPES. «Some Say» (Nea, versión acústica) NO tiene pulso utilizable: la mejor recta (corcheas de 0,286 s)
 * deja el 53 % de los golpes fuertes a ≤ 15 ms (desvío 17 ms) pero con el pulso real (0,572 s) solo el 43 %. Se corta sobre los GOLPES MEDIDOS
 * (`medir-pista.py`, ≥ 6 dB) y se comprueba sobre el audio del render (`herramientas/golpes-render.py`, R33). Todos los `en` salen de `golpe(...)`:
 * mover la entrada de la música es cambiar `INICIO_MUSICA`.
 *
 * LA RESOLUCIÓN. La canción suena plana (−14,1 LUFS) durante 36 s desde su golpe de entrada y entonces suena su ACORDE FINAL (+36,4 s): −15,1 →
 * −28,6 dB en 1,5 s y sigue cayendo a silencio hacia los +46 s. La toma del CTA entra en el último golpe de la meseta (+36,0 s, f1083), de modo
 * que el acorde cae dentro de ella y la cola se apaga bajo la tarjeta.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(28)` = 28/30 s) para que imagen y voz corten en la MISMA muestra;
 * `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS: cada `en` es el fin del anterior.
 *
* TRANSICIONES. El hook abre la pieza a corte (frame 0). Corte seco entre planos de recorrido (la cámara ya se mueve), del hook al paseo y de la mitad al bloque 5.
 * Disolvencia de 12 f al entrar Isabella en la mitad y en el CTA, que acaban en un golpe y cuya primera palabra suena 2-3 f después. Nada más.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con
 * `herramientas/medir-color.py`. AQUÍ HAY DOS FUENTES (las tomas de Isabella en HLG tone-mapeado y los recorridos en SDR) y la base salió de material
 * HLG: se mide primero cómo cae sobre los SDR. Con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-022.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-022";

export const FPS_022 = 30;

export type Entrada = "corte" | "disolver";
export type Bloque = 1 | 2 | 3 | 4 | 5 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. Medido con `limites-voz.py` y ebur128, no estimado. */
export interface VozDelCorte {
  /** Segundo de la fuente en que empieza a hablar. */
  s0: number;
  /** Segundo de la fuente en que termina de hablar. */
  s1: number;
  /** Sonoridad integrada de la voz (LUFS) en esa ventana. */
  lufs: number;
  /** Lo que dice, tal como está en el guion. Solo para leer el plan. */
  dice: string;
}

export interface Corte extends CorteDelFormato<Entrada> {
  /** `foto` solo para la tarjeta oscura del cierre (`c12-cierre`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella cuya voz entra con su imagen: el WAV de su voz, sin tratar. */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (rev. 5 de la prueba / rev. 1 de la final, pedido del usuario el 2026-10-08: «necesito que la voz cuando habla Isabella tenga más decibeles sin
 * saturar»). Hasta la rev. 4 iba a −21 sin tratar (R29) y sonaba 6 dB por debajo de los recorridos. Ahora cada toma pasa por `VOZ_TRATADA` (`normalizar.mjs`: paso alto, puerta suave, compresor 3:1, ganancia
 * buscada tras el limitador y limitador a −2,5 dBFS) y el WAV tratado (`hk2-voz.wav`…) ya mide −15,0 · −15,1 · −15,1 LUFS en su ventana de voz, con el pico real en −2,5 dBTP: el plan no le añade ganancia.
 * Es una excepción declarada a R29. La música NO cambia: queda ≈ 16 LU bajo la voz (−16 dB sobre su nivel solo).
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Some Say – Acoustic Sunsets (Nea Cover)» — `Music/Some Say - Acoustic Sunsets (Nea Cover).mp3` (sha 8 `b652ab54`), pop acústico en Do# mayor,
 * ≈105 BPM, 3:09. Se entra en su golpe de 139,053 s (28,9 dB medido con una ventana que empieza antes: `buscar-entrada.py`), de ahí suena −14,1 LUFS
 * plana 36 s con un golpe cada ≈ 0,57 s y, en +36,4 s, su acorde final. Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en
 * 15 ms; el instante es el de «empieza a subir») en que entra cada plano, con su fuerza en dB por 15 ms.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 0 (la nota que vuelve tras el respiro). */
  apertura: { t: 139.053, db: 28.9 },
  /** El paseo empieza (a corte, tras el hook): la cocina abierta. */
  paseo: { t: 144.787, db: 21.9 },
  /** La cocina y la sala (RC05), a corte. */
  sala: { t: 149.882, db: 14.7 },
  /** El paso de la sala a la alcoba (RC15), a corte. */
  alcoba: { t: 153.314, db: 20.2 },
  /** Isabella entra (la disolvencia acaba aquí) con la mitad. */
  mitad: { t: 157.871, db: 17.0 },
  /** La alcoba principal (RC10), a corte: sale la mitad y empieza el bloque 5. Es el golpe de 17,3 dB (f774) y no el de 12,2 de 164,199 s (f758): la música sube en 14 f tras la última palabra de la mitad. */
  principal: { t: 164.751, db: 17.3 },
  /** El vestier (RC16), a corte. */
  vestier: { t: 167.016, db: 24.6 },
  /** El baño (RC02), con una disolvencia que acaba aquí (el salto de luma entre el vestier y el baño, a corte, era de +23). */
  bano: { t: 168.77, db: 11.7 },
  /** El ventanal con la vista (RC12), con una disolvencia que acaba aquí: el plano más largo del bloque 5. */
  vista: { t: 171.596, db: 21.4 },
  /** Isabella entra (la disolvencia acaba aquí) con el CTA: el último golpe de la meseta. */
  cta: { t: 175.061, db: 14.6 },
} as const;

/**
 * El ACORDE FINAL de la canción: la meseta (−14 a −15 LUFS) acaba en 175,5 s y el acorde cae de −15,1 a −28,6 dB (RMS de 1 s) en 1,5 s y sigue a
 * silencio hacia los 184 s (`curva.py`). En LUFS (ebur128 sobre `musica-022.wav`, tramos de 5 s): −15,4 en 170,5-175,5 s, −24,4 en 176-181 s (−9,0 dB: justo
 * el mínimo) y −57,5 en 181-186 s. No es un golpe sino un cambio de nivel: la resolución de esta pieza, como la caída a un lecho del 018 y el 019.
 */
export const DECAE = { t: 175.5, lufsAntes: -15.4, lufs5s: -24.4, lufs10s: -57.5 } as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: 42 ms antes del golpe de entrada (el colchón de `entra: 1` en audio-022.ts),
 * redondeado a un frame (4172/30: el golpe de entrada suena en el f1, para que la música baje antes de la primera palabra del hook, a los 11,4 f) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 4172 / FPS_022;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y
 * confirmado desde el 017). Se suma aquí y en la puerta para que el corte caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_022;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_022;

/** Isabella: un empuje lento hacia ella. El recorrido, quieto: la cámara ya avanza. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-022/${id}.mp4`;
/** La voz TRATADA de una toma (`normalizar.mjs`, `VOZ_TRATADA`): −15 LUFS con compresión y limitador (rev. 5, pedido del usuario). */
const voz = (id: string): string => `recorrido-022/${id}-voz.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE de Luxur, la del 017 (revisión 7 de aquel): contraste con cuerpo, negros hundidos, luces recogidas, un punto cálido y +10 % de
 * saturación. Orden del efecto: exposición → balance de blancos → sombras/luces/blancos/negros → contraste → saturación → vibrance. `vibrance` ≤
 * 0,05 (sobre hormigón gris pinta un moteado de colores y vuelve rosadas las nubes) y las tomas de Isabella, `saturation` ≤ 1,06: la piel se
 * queda donde estaba. OJO: salió de material HLG tone-mapeado; los recorridos de esta casa son SDR (`proyectos/022/analisis-uso.md`).
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
 * El frame de cada cambio de plano: el del golpe de la canción en que entra (arriba). Los cortes SECOS y las entradas de Isabella caen en un golpe
 * medido.
 */
const P = {
    paseo: golpe(GOLPE.paseo), //        173 · la cocina abierta (el hook ocupa f0-173)
  sala: golpe(GOLPE.sala), //          328 · la cocina y la sala
  alcoba: golpe(GOLPE.alcoba), //      431 · de la sala a la alcoba
  mitad: golpe(GOLPE.mitad), //        568 · Isabella en la alcoba secundaria (la disolvencia ocupa f556-568)
  principal: golpe(GOLPE.principal), // 774 · la alcoba principal
  vestier: golpe(GOLPE.vestier), //    842 · el vestier
  bano: golpe(GOLPE.bano), //          895 · el baño (la disolvencia ocupa f883-895)
  vista: golpe(GOLPE.vista), //        980 · el ventanal con la vista (la disolvencia ocupa f968-980)
  cta: golpe(GOLPE.cta), //           1083 · Isabella con el CTA (la disolvencia ocupa f1071-1083)
} as const;

/**
 * Frames que dura la toma del CTA (CT1): el clip dura 5,84 s (175 f) y desde `desde` (12 f) le quedan 163 (el WAV de su voz dura 5,844 s: 1 f menos
 * que el vídeo, y se usan 160). Su voz acaba a los 5,37 s: la última palabra suena en f1232 y esta toma llega a f1243: 11 f (0,37 s) de su cara tras
 * ella, en los que la imagen funde a negro. Nada se congela.
 */
const DUR_CTA = 160;

/**
 * Dónde acaba la música (frame de la comp). El acorde final decae hasta el silencio hacia los 184 s (f1330): la envolvente la lleva a cero 2 f
 * antes del final de la pieza, bajo la tarjeta.
 */
export const FIN_MUSICA_022 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje022: readonly Corte[] = [
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk2"),
    audio: voz("hk2"),
    voz: {
      s0: 0.38,
      s1: 4.04,
      lufs: -15.0,
      dice: "Si para ti un apartamento sin balcón no es opción, mira esto.",
    },
    // HK2 trae 0,38 s (11 f) de aire antes de su primera palabra: la disolvencia pide 12 de clip antes de `desde`, así que ENTRA A CORTE. REVISIÓN 3 (pedido: «la curva debe ser ANTES de que hable»):
    // `desde` 0, para que la primera palabra suene a los 11,4 f del golpe y la música (que baja en 10 f desde él) ya esté abajo cuando habla; antes `desde` iba 3 f antes de la palabra y hablaba con la música a medio bajar. Ella empieza al fondo del balcón,
    // al otro lado de la corredera, y camina hacia la cámara. Tras su última palabra (f167) el plano sigue hasta el f175 (8 f) y el paseo entra a corte en un golpe.
    desde: fr(0),
    en: 0,
    dur: P.paseo,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ saturation: 1.02 }),
    reason:
      "Balcón (la promesa): Isabella en el balcón al que acabamos de asomarnos; camina hacia la cámara y dice «si para ti un apartamento sin balcón no es opción, mira esto»: la casa primero y la persona después. Entra a corte en un golpe (no hay 12 f de clip antes de su primera palabra).",
  },
  // ── Bloque 3 · el paseo, sentido I: la cocina, la sala, la puerta de la alcoba ──
  {
    id: "c03-cocina",
    bloque: 3,
    tipo: "video",
    src: v("rc06"),
    // RC06 «cocina, sala, balcon», de 0 a 5,1 s: la cocina abierta vista desde el fondo (mesón, estufa, campana) con el ventanal de la sala al otro extremo; la cámara avanza.
    desde: fr(0),
    en: P.paseo,
    dur: P.sala - P.paseo,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "Cocina (el umbral): de Isabella en el balcón, a donde empieza la casa; la cocina abierta con la isla y la estufa, y el ventanal de la sala al fondo; el paseo no vuelve atrás.",
  },
  {
    id: "c04-sala",
    bloque: 3,
    tipo: "video",
    src: v("rc05"),
    // RC05 «cocina, paneo a sala y balcon», de 4,5 a 7,93 s: la isla, la puerta de madera y la sala vacía con la corredera al balcón. La V6 no usa su primera mitad.
    desde: fr(135),
    en: P.sala,
    dur: P.alcoba - P.sala,
    zoom: QUIETO,
    entra: "corte",
    color: color(),
    reason:
      "Sala (lo social): la isla se abre a la sala y a la corredera del balcón, el mismo espacio que Isabella nos acaba de enseñar desde fuera; la cámara sigue hacia la derecha.",
  },
  {
    id: "c05-alcoba",
    bloque: 3,
    tipo: "video",
    src: v("rc15"),
    // RC15 «sala, habitacion secundaria, vestier», de 0 a 4,57 s: desde la sala (la corredera al balcón al fondo) por la puerta de madera hasta la alcoba secundaria y su ventanal.
    // El clip sigue después hasta el baño y el vestier (los usa la mitad al hablar de ellos, no este plano). Entra con una disolvencia que acaba en el golpe del f431: a corte, el
    // salto de luma desde la sala era de −33 (la sala, muy clara, y la alcoba, con el ventanal a contraluz); `desde` 12 f para tener el clip de la disolvencia.
    desde: fr(12),
    en: P.alcoba,
    dur: P.mitad - P.alcoba,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ saturation: 1.06 }),
    reason:
      "Alcoba secundaria (el paso): de la sala a lo privado por la puerta de madera; el plano llega a la alcoba con su ventanal y las montañas, que es donde espera Isabella.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md1"),
    audio: voz("md1"),
    voz: {
      s0: 0.54,
      s1: 6.41,
      lufs: -15.1,
      dice: "Aquí cada habitación tiene su baño y su vestier, además de estar conectada con la zona social y el balcón.",
    },
    // La voz empieza a los 0,54 s (16,2 f): `desde` es 2,2 f antes (14 = 0,47 s), con 14 f de clip por delante para la disolvencia (pide 12): su imagen es opaca en el golpe del f568 (que suena
    // entero) y la primera palabra suena en el 581. Tras su última palabra (f757) el plano sigue hasta el f774 (17 f) y el bloque 5 entra a corte en un golpe.
    // REVISIÓN 3 (pedido: «la curva debe ser ANTES de que hable»): la mitad ENTRA A CORTE en el golpe del f568 con `desde` 3 f (la voz, a los 16,2 f del clip, suena a los 13,2 f del golpe: la música
    // baja en los 10 f siguientes y ya está abajo cuando ella habla). Con la disolvencia de antes (`desde` ≥ 12 f) la primera palabra no podía quedar a más de 4 f del golpe. Su última palabra
    // acaba en f757 y el corte al bloque 5 (f774, el golpe de 17,3 dB) deja 17 f para que la música suba con fundido; el clip llega justo (3 + 206 = 209 f).
    desde: fr(3),
    en: P.mitad,
    dur: P.principal - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ saturation: 1.02 }),
    reason:
      "Alcoba secundaria (lo privado): Isabella frente a las puertas del baño y del vestier, camina hacia la cámara y dice que cada habitación tiene su baño y su vestier: el plano que acaba de verse ya era la alcoba y el hecho que contesta la objeción («¿tiene baño privado?»).",
  },
  // ── Bloque 5 · la alcoba principal, el vestier, el baño y la vista ──
  {
    id: "c07-principal",
    bloque: 5,
    tipo: "video",
    src: v("rc10"),
    // RC10 «habitacion principal», de 0 a 2,8 s: la cámara se acerca al ventanal con la ciudad y el mueble blanco empotrado a la izquierda (RC07, «entrando», se probó primero: sus
    // primeros 4 s son una puerta y una columna y el resto, una pared).
    desde: fr(0),
    en: P.principal,
    dur: P.vestier - P.principal,
    zoom: QUIETO,
    entra: "corte",
    // El ventanal a contraluz: 5,5 % de píxeles quemados (≥ 250) con la base; se recogen las luces y los blancos.
    color: color({ highlights: -0.38, whites: -0.12, exposure: -0.04 }),
    reason:
      "Alcoba principal (lo íntimo): la alcoba grande, con el mueble blanco empotrado y el ventanal con la ciudad; es el espacio de descanso, a donde llega el paseo tras la secundaria.",
  },
  {
    id: "c08-vestier",
    bloque: 5,
    tipo: "video",
    src: v("rc16"),
    // RC16 «vestier habitacion principal», de 0 a 1,77 s (el clip dura 2,03 s, 61 f): el vestier de madera con cajones y barra, con la puerta entreabierta.
    desde: fr(0),
    en: P.vestier,
    dur: P.bano - P.vestier,
    zoom: QUIETO,
    entra: "corte",
    // La madera del vestier es el plano más saturado de la pieza (0,34 antes de graduar frente a 0,13-0,26 de los demás): se le quita la viveza de la base.
    color: color({ saturation: 1.0 }),
    reason:
      "Vestier de la alcoba principal (cómo se vive): los cajones y la barra de madera, el hecho que la mitad acaba de nombrar y que aquí se ve; cuenta lo que se guarda antes de lo que se mira.",
  },
  {
    id: "c09-bano",
    bloque: 5,
    tipo: "video",
    src: v("rc02"),
    // RC02 «bano habitacion principal», de 1,2 a 4,03 s (entra con una disolvencia que acaba en el golpe del f895): el baño gris con la ducha de vidrio y el lavamanos de mueble de madera, la cámara avanza hacia el lavamanos.
    desde: fr(36),
    en: P.bano,
    dur: P.vista - P.bano,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason:
      "Baño de la alcoba principal (lo privado): la ducha de vidrio y el lavamanos; el baño propio que dijo la mitad, ya sin Isabella delante.",
  },
  {
    id: "c10-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc12"),
    // RC12 «habitacion secundaria - zoom in ventanal», de 7,87 s hasta el último fotograma del clip (11,3 s): el zoom hacia el ventanal: el marco negro se abre al cielo, las nubes, la ciudad
    // y los tejados rojos. Es de la alcoba SECUNDARIA (el único ventanal filmado con esta vista abierta): vuelve a una habitación ya vista y se declara. El plano más largo del bloque. Entra con
    // una disolvencia que acaba en el golpe del f980 (a corte, el salto de luma desde el baño era de −58: el marco negro del zoom ocupa todo el cuadro hasta los 7,5 s).
    desde: fr(236),
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason:
      "Ventanal (la vista): el clímax; el zoom atraviesa el marco negro hacia el cielo y la ciudad, la última imagen de la casa antes del CTA y el plano más largo del bloque.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c11-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct1"),
    audio: voz("ct1"),
    voz: {
      s0: 0.66,
      s1: 5.37,
      lufs: -15.1,
      dice: "Estamos en la Loma del Escobero, en Envigado. Si quieres más información, contáctame.",
    },
    // La voz empieza a los 0,66 s (19,8 f): `desde` es 2,8 f antes (17 = 0,57 s), con 17 f de clip por delante para la disolvencia (pide 12): su imagen es opaca en el golpe del f1083 (que suena
    // entero) y la primera palabra suena en el 1091. Tras su última palabra (f1227) quedan 13 f de clip: ahí la imagen funde a negro (FundidoACierre) y entra la tarjeta.
    // REVISIÓN 3: `desde` 12 f (el mínimo de la disolvencia): la primera palabra suena a los 7,8 f del golpe y la música (que baja en 7 f) ya está abajo.
    desde: fr(12),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ saturation: 1.02 }),
    reason:
      "Alcoba principal (la ubicación): Isabella frente al ventanal con la ciudad, el mismo que acaba de verse; dice dónde está la casa y a qué escribir. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el
  // logo y la web (`cierre-022.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c12-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-022/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c11
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c12). */
export const DURACION_022 = P.cta + DUR_CTA + DUR_TARJETA;
