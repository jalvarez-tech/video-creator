/**
 * EL RECORRIDO 060 — «Apartaestudio Quadrato (Laureles, Medellín)», V42 del registro, primer reel de este apartaestudio (reparto 054-062, `proyectos/054/reparto-054-062.md`) — los planos, como DATOS.
 *
 * Ángulo: «TU PLATA EN EL BANCO PIERDE VALOR» (rentabilidad), el más financiero de los tres: la propiedad se vende como INVERSIÓN en renta corta. La apertura es el rooftop (no hay dron en este rodaje) con el
 * jacuzzi y la ciudad → el hook lo plantea («tu plata en el banco pierde valor cada mes; este estudio de 24 metros cuadrados en Laureles ya está generando dólares») → el paseo enseña LO QUE SE ALQUILA (la cocina
 * equipada, el baño, el escritorio) → la mitad pone los números EN SU VOZ («la renta tradicional deja el 0,5 % de rentabilidad mensual; esta inversión deja más del 1 %; ven, te muestro cómo») → la cama con el
 * panel de listones, el coworking del edificio y la vista del rooftop → el CTA («si deseas que te envíe la rentabilidad mensual, haz clic en el enlace y escríbeme un mensaje»).
 * Estructura del canal: AÉREA (el rooftop) · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA, con TRES frases de Isabella.
 *
 *   hook   HK03  `HOOK3`   «Tu plata en el banco pierde valor cada mes. Este estudio de 24 metros cuadrados en Laureles ya está generando dólares.»        (exclusiva de esta pieza, reparto)
 *   mitad  MD05  `MEDIO7`  «La renta tradicional deja el 0,5 % de rentabilidad mensual. Esta inversión deja más del 1 %. Ven, te muestro cómo.»            (exclusiva de esta pieza, reparto)
 *   CTA    CT03  `CTA3`    «Si deseas que te envíe la rentabilidad mensual, haz clic en el enlace y escríbeme un mensaje.»                                  (exclusiva de esta pieza, reparto)
 *
 * LA AFIRMACIÓN DE RENTABILIDAD (el 0,5 % y el 1 %) la dice la VOZ de Isabella y los subtítulos son su transcripción (cifra dicha = cifra escrita, sin acento); ningún rótulo repite ESOS porcentajes ni el caption. Desde
 * la rev. 1 (encargo del usuario, 2026-10-22: «después de “ven, te muestro cómo” genera unos infográficos animados con la rentabilidad») una INFOGRAFÍA muestra CÓMO sale, con SUS cifras rotuladas como ESTIMADAS
 * (tarifa $190.000 · ocupación 85 % · 25,5 noches · ingresos $4.845.000 · gastos −$800.000 · utilidad $4.045.000) y un pie con el aviso de la web (los ingresos de renta corta varían por temporada): cae sobre los
 * planos de la cama, el coworking y la vista (f876-f1185) y cada elemento entra en un golpe medido (`infografia-060.ts`, `Infografia060.tsx`). La versión con ficha lleva tipo · lugar · precio y también la infografía
 * (su zona acaba en y 1200, por encima de la ficha).
 *
 * LO QUE ES DE ESTA PIEZA Y LO QUE COMPARTE (`proyectos/060/combinaciones.md`). Los recorridos son un hilo propio, «lo que se alquila»: el baño (RC16) · la cocina equipada (RC05) · el escritorio (RC09) · la cama con
 * el panel de listones y la luz del balcón (RC13) · el coworking del edificio (ZC01) · la vista del rooftop desde el jacuzzi (ZC11); la apertura es el jacuzzi con la ciudad (ZC07). Coordinado con las otras dos
 * sesiones del apartaestudio (061, 062) por notas en la carpeta compartida (`side-session-notes/…/060-tramos-de-recorrido.md`).
 *
 *   bloque 1  c01                  el rooftop: ZC07 0,30-3,37 s, el jacuzzi de agua turquesa con el cielo y la ciudad detrás; SIN TEXTO NI VOZ
 *   bloque 2  c02                  Isabella de pie en el estudio, con el balcón al fondo: el hook (entra disolviendo; su primera palabra suena después de que la música haya acabado de bajar)
 *   bloque 3  c03 c04 c05          LO QUE SE ALQUILA: el baño (RC16) → la cocina equipada (RC05) → el escritorio con los portátiles (RC09); el baño y el escritorio giran a la izquierda y la cocina avanza recto (flujo óptico medido: la imagen se mueve a la derecha)
 *   bloque 4  c06                  Isabella de pie entre la estantería y la cama: la mitad
 *   bloque 5  c07 c08 c08b c08c c09  (rev. 2) DEBAJO DE LA INFOGRAFÍA (14 s, velo negro del 80 %): la cama (RC13) → la tele (RC03) → el sofá (RC15) → el coworking (ZC01), cuatro planos de 3,5 s que se funden entre sí; y LA VISTA: del borde del
 *                                  jacuzzi sube a la ciudad, las montañas y las nubes (ZC11, 4,2 s, A CORTE en un golpe: el plano más largo del bloque), con la utilidad encima
 *   bloque 6  c10 c11              Isabella sentada en el escritorio junto a la cocina: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO. La canción es «Street Level Sessions on the Green» (lo-fi hip hop / chillhop, 85 BPM SIN pulso estable: el desvío entre golpes es de 79 ms): la rejilla son los golpes MEDIDOS
 * (`musica/golpes-cancion-entera.json`; `buscar-cortes-060.py`, ver `musica/rejilla-060.txt`) y cada cambio de plano cae en uno (≥ 13,3 dB; las disolvencias ACABAN en él o lo cruzan). Entra en su golpe de
 * 154,614 s (16,4 dB): una sección que no usa la V12/028 (174,8-210 s). La canción NO cae sola antes del CTA: tras la última palabra se APAGA con curva bajo la tarjeta (la 059 hizo igual).
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(12)` = 12/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS. Un plano que entra
 * disolviendo (`disolver`) empieza a verse 12 f ANTES de su `en` (`solapeDe`): su clip tiene que tener esos 12 f antes de `desde`, y el plano anterior dura hasta ese `en`.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f99, 3,3 s después de empezar la pieza. Los planos del bloque 5 (cama, coworking, vista) llevan encima la infografía,
 * que es de la composición y no de este plan.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la
 * prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-060.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-060";

export const FPS_060 = 30;

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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −24,1 · −22,2 · −22,9 LUFS en su ventana de voz (habla a unos metros
 * de un iPhone); cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS)
 * hasta −15,0 LUFS con el pico real a −2,5 dBFS o menos, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Street Level Sessions on the Green» — `archivos/musica/Daniel Armand — Street Level Sessions on the Green.mp3` (sha 8 `e428a369`), lo-fi hip hop / chillhop, 3:53, sin pulso estable, 388 golpes de ≥ 6 dB. Se entra
 * en su golpe de 154,614 s (16,4 dB). Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir»):
 * `proyectos/060/musica/golpes-cancion-entera.json` (`medir-pista.py --json`). La rejilla la dio `buscar-cortes-060.py` con estos planos: ver `musica/rejilla-060.txt`.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 154.614, db: 16.4 },
  /** La disolvencia al hook lo CRUZA: el golpe suena con la imagen de Isabella al 67 % y la música baja con curva de 10 f, que acaba ANTES de su primera palabra (la toma no deja más de 12 f de aire previo). */
  hook: { t: 157.453, db: 15.5 },
  /** Cortes secos del paseo. */
  paseo1: { t: 165.583, db: 20.4 },
  paseo2: { t: 169.313, db: 14.5 },
  paseo3: { t: 172.492, db: 16.0 },
  /** La disolvencia a la mitad ACABA aquí. */
  mitad: { t: 175.147, db: 13.5 },
  /** El corte seco a la cama: abre el bloque 5 (la infografía empieza con él). */
  cama: { t: 183.72, db: 17.5 },
  /**
   * El corte seco a la VISTA (rev. 2, tras pasar la infografía a ~14 s): cae en un golpe de 10,7 dB, el más fuerte de los dos que tiene la canción entre los 195 y los 205 s (hay otro de 12,8 y otro de 13,4 dB,
   * pero obligarían a una infografía de 15,3 o 15,9 s y la pieza pasaría de los 55 s). Es un corte, no una disolvencia: el velo negro se va con él.
   */
  vista: { t: 197.723, db: 10.7 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (154,614 s) cae en el frame 3 de la pieza; redondeado a un frame (4637/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 4637 / FPS_060;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_060;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_060;

/** Isabella: un empuje lento hacia ella (hablan a cámara quietas: el empuje les da vida). Los recorridos y la apertura, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-060/${id}.mp4`;
const a = (id: string): string => `recorrido-060/${id}.wav`;

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
 * Los frames de cada cambio de plano: todos salen de `golpe(...)`, así que mover la entrada de la música es cambiar `INICIO_MUSICA`. Los que entran disolviendo (hook, mitad, CTA) tienen aquí el `en` de la
 * disolvencia YA TERMINADA: el plano anterior dura hasta él y el siguiente empieza a verse 12 f antes.
 *
 * EL HOOK es el único que NO acaba su disolvencia en el golpe sino 4 f DESPUÉS: la voz de HK03 arranca a los 0,64 s de la toma, así que con la disolvencia entrando (`desde` = 12 f, el mínimo) su primera palabra
 * suena a los 7,2 f del `en`, y la música (que baja con curva de 10 f desde el golpe) tiene que haber acabado antes. Con el golpe 4 f antes del final de la disolvencia (la imagen de Isabella ya al 67 %) la curva
 * acaba a los 6 f del `en`, 1,2 f antes de su primera sílaba.
 */
const P = {
  hook: golpe(GOLPE.hook) + 4, //             92 · el golpe (f88) cruza la disolvencia; la imagen de Isabella es opaca en el f92
  paseo: golpe(GOLPE.paseo1), //             332 · acaba el hook; el golpe abre el paseo (a corte)
  cocina: golpe(GOLPE.paseo2), //            444 · la cocina (a corte)
  escritorio: golpe(GOLPE.paseo3), //        539 · el escritorio (a corte)
  mitad: golpe(GOLPE.mitad), //              619 · Isabella con la mitad (disuelve)
  cama: golpe(GOLPE.cama), //                876 · la cama (a corte)
  vista: golpe(GOLPE.vista), //             1296 · la vista (a corte)
  /** El CTA entra DISOLVIENDO en un frame LIBRE (rev. 2): tras el golpe de la vista la canción no tiene ninguno ≥ 10 dB hasta los 204,8 s y la música baja con curva igual, antes de su primera palabra. */
  cta: golpe(GOLPE.vista) + 126, //         1422 · Isabella con el CTA (disuelve)
} as const;

/**
 * Los planos de FONDO del bloque 5 (rev. 2): bajo la infografía (que dura 14 s: `infografia-060.ts`) cuatro planos de 105 f (3,5 s) que se funden entre sí a un frame libre —la imagen es textura bajo un velo negro
 * del 80 %: no hace falta un golpe— y la VISTA, que entra A CORTE en un golpe y es la más larga del bloque (126 f). La cama entra en el golpe de 17,5 dB del corte (f876).
 */
const DUR_FONDO = 105;

/**
 * Frames que dura la toma del CTA: el clip dura 6,267 s (188 f) y desde `desde` (16 f) su voz va hasta los 5,62 s (f168,6 del clip, f152,6 desde el `en`). Se dejan 7 f (0,24 s) de su cara tras la última palabra
 * —en los que la imagen funde a negro (los últimos 6)—: 160 f. Nada se congela: el plano acaba en el f176 del clip, 12 f antes de su final.
 */
const DUR_CTA = 160;

/**
 * Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero 2 f antes del final de la pieza (la tarjeta va en silencio), como la 059: la canción no resuelve sola
 * ahí (su respiro de 195,5-198,8 s es de −3 LU; desde los 205 s la canción se apaga sola, pero el apagado con curva sigue mandando). Su archivo decodificado dura 233 s, de sobra (la pieza acaba en el f1642, a los 209,3 s de la canción).
 */
export const FIN_MUSICA_060 = P.cta + DUR_CTA + DUR_TARJETA - 2;

/** El frame en que entra el CTA (acaba su disolvencia): lo lee la infografía para acabar antes de que empiece. */
export const EN_CTA_060 = P.cta;

export const metraje060: readonly Corte[] = [
  // ── Bloque 1 · el rooftop ──
  {
    id: "c01-rooftop",
    bloque: 1,
    tipo: "video",
    src: v("zc07"),
    // ZC07 (`TERRAZA Y JACUZZI (1)`, iPhone, 1080×1920, SDR, 30 fps), del 0,30 al 3,37 s: el borde blanco y el agua turquesa del jacuzzi en primer término, el cielo de nubes llenando medio cuadro y la ciudad con
    // las montañas detrás; la cámara baja un poco y se desplaza apenas hasta enseñar el segundo jacuzzi. Es la «aérea» de este rodaje (no hay dron): el rooftop con jacuzzi y ciudad. Entra a corte con el
    // golpe de 16,4 dB del f3. La 062 (apertura ZC29), la 061 (la pérgola) y esta no comparten ningún clip.
    desde: 0.3,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1, shadows: 0.1, highlights: -0.35, whites: -0.2, saturation: 1.04 }),
    reason:
      "El rooftop del edificio con el jacuzzi y la ciudad detrás (la promesa: esto es lo que acompaña a la inversión). Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de dinero.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk03"),
    audio: a("hk03-voz"),
    voz: {
      s0: 0.64,
      s1: 7.97,
      lufs: -15,
      dice: "Tu plata en el banco pierde valor cada mes. Este estudio de 24 metros cuadrados en Laureles ya está generando dólares.",
    },
    // La voz empieza a los 0,64 s (19,2 f) y acaba a los 7,92 s (237,6 f) —con la /s/ final de «dólares», 7,97 s—; el clip dura 8,7 s (261 f) y después de la frase hay 0,7 s de silencio. `desde` 12 f entra DISOLVIENDO
    // (el clip tiene 12 f antes) y la primera palabra suena a los 7,2 f del `en`: el golpe del f88 cae 4 f antes del `en` y la música baja con curva de 10 f, que acaba a los 6 f del `en`. El plano dura 240 f (hasta el
    // golpe del f332): 14 f tras la última palabra, en los que la música sube.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-060.ts`): «cada mes» (whisper oye «kamis») y «de 24» (whisper no oye «de»).
    // Isabella de pie en el estudio, con la mesa de madera y la cama a la izquierda, el balcón al fondo y una planta; habla casi sin moverse.
    desde: fr(12),
    en: P.hook,
    dur: P.paseo - P.hook,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, exposure: -0.05, highlights: -0.2, whites: -0.1, saturation: 1.04 }),
    reason:
      "El estudio (lo que se compra): Isabella plantea el dinero («tu plata en el banco pierde valor cada mes; este estudio de 24 metros cuadrados en Laureles ya está generando dólares»). Entra disolviendo desde el rooftop; la música ya está abajo.",
  },
  // ── Bloque 3 · lo que se alquila: la cocina equipada, el baño, el escritorio ──
  {
    id: "c03-bano",
    bloque: 3,
    tipo: "video",
    src: v("rc16"),
    // RC16 (`ESTUDIO (7)`, iPhone, 1080×1920, SDR, 30 fps), del 0,30 al 4,03 s: el inodoro y el mueble de madera, el toallero con las toallas blancas y la ducha de vidrio con su grifería negra; la cámara gira a la
    // izquierda hasta el vidrio y el panel de madera. El baño de hotel. Entra A CORTE en el golpe de 20,4 dB que abre el paseo (f332).
    desde: 0.3,
    en: P.paseo,
    dur: P.cocina - P.paseo,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05, shadows: 0.1, highlights: -0.25, whites: -0.1, saturation: 1.0 }),
    reason:
      "El baño (lo que se alquila): ducha de vidrio, toallero con las toallas puestas, todo listo; el estándar de un hotel en 24 metros. El golpe del paseo abre el descubrimiento del negocio.",
  },
  {
    id: "c04-cocina",
    bloque: 3,
    tipo: "video",
    src: v("rc05"),
    // RC05 (`ESTUDIO (13)`, iPhone, 1080×1920, SDR, 29,97 fps), del 1,20 al 4,37 s: se camina a lo largo de la cocina en línea —el fregadero con su grifería negra, el microondas sobre el mesón, la nevera bajo la encimera—
    // hasta el fondo luminoso del estudio; avanza casi recto, sin giro. La cocina EQUIPADA: lo que el huésped no tiene que traer. Entra A CORTE en el f444. Se empieza en el 1,20 s y no en el 0,60 porque en el primer
    // medio segundo el cartel de «prohibido fumar» ocupa la esquina. RC04 (el detalle de la vitrocerámica) es de la 062; RC01, de la 061.
    desde: 1.2,
    en: P.cocina,
    dur: P.escritorio - P.cocina,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.0, shadows: 0.1, highlights: -0.3, whites: -0.1, saturation: 1.04 }),
    reason:
      "La cocina equipada (lo que se alquila): se camina junto al fregadero, el microondas y la nevera; el huésped llega y todo está. Avanza recto tras el giro del plano anterior.",
  },
  {
    id: "c05-escritorio",
    bloque: 3,
    tipo: "video",
    src: v("rc09"),
    // RC09 (`ESTUDIO (17)`, iPhone, 1080×1920, SDR, 29,97 fps), del 0,30 al 2,97 s: el escritorio de madera con los portátiles, la tetera y la silla, y la cámara sigue a la izquierda hasta el pasillo y la puerta. El
    // puesto de trabajo del huésped que viaja por trabajo. Entra A CORTE en el f539.
    desde: 0.3,
    en: P.escritorio,
    dur: P.mitad - P.escritorio,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.1, shadows: 0.1, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "El escritorio con los portátiles (lo que se alquila: el huésped que viaja por trabajo): la madera, la silla y el pasillo que sigue; el último paso antes de las cifras.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md05"),
    audio: a("md05-voz"),
    voz: {
      s0: 1.31,
      s1: 9.27,
      lufs: -15,
      dice: "La renta tradicional deja el 0,5 % de rentabilidad mensual. Esta inversión deja más del 1 %. Ven, te muestro cómo.",
    },
    // La voz empieza a los 1,31 s (39,3 f) y acaba a los 9,27 s (278,1 f: el «-mo» de «cómo» a −15…−28 dB; `limites-voz.py` decía 9,11 s); el clip dura 9,567 s (287 f). `desde` 27 f entra DISOLVIENDO (el clip tiene 27 f
    // antes) y la primera palabra suena a los 12,3 f del `en`: la música baja con curva de 10 f y acaba 2 f antes de ella. El plano dura 257 f (acaba en el f284 del clip, 3 f antes de su final): solo 5,9 f tras la
    // última palabra (el clip no deja más: 0,3 s), así que la música empieza a subir en cuanto acaba ella (8 f) y el golpe de 17,5 dB del f876 suena ya casi arriba (−1,4 dB).
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-060.ts`): «0,5 %» y «1 %» (whisper oye «0.5» y «1%»: cómo los dice) y «ven, te muestro cómo» (whisper oye «veinte muestros como»).
    // Isabella de pie entre la estantería blanca y la cocina, con la cama de primer término; camina hacia la cámara.
    desde: fr(27),
    en: P.mitad,
    dur: P.cama - P.mitad,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, exposure: -0.05, highlights: -0.2, whites: -0.1, saturation: 1.04 }),
    reason:
      "El estudio con la cama delante (donde se duerme y se gana): Isabella pone las cifras en su voz, «la renta tradicional deja el 0,5 %; esta inversión, más del 1 %». Entra disolviendo desde el escritorio; la cama va justo después.",
  },
  // ── Bloque 5 · la cama, el coworking y la vista ──
  {
    id: "c07-cama",
    bloque: 5,
    tipo: "video",
    src: v("rc13"),
    // RC13 (`ESTUDIO (4)`, iPhone, 1080×1920, SDR, 29,97 fps), del 0,50 al 4,00 s: la cama con el panel de listones retroiluminado, la mesita y la luz del balcón de fondo; la cámara se desplaza a la izquierda hasta
    // el aire acondicionado y el balcón con la cortina. Lo que el huésped paga: dormir bien. Entra A CORTE en el golpe de 17,5 dB (f876) y la infografía (rev. 2) cae encima con un velo negro del 80 %.
    desde: 0.5,
    en: P.cama,
    dur: DUR_FONDO,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.12, shadows: 0.12, highlights: -0.3, whites: -0.1, saturation: 1.04 }),
    reason:
      "La cama con el panel de listones retroiluminado y la luz del balcón (lo que el huésped paga: dormir bien); el golpe abre el último tramo del recorrido y la infografía de la cuenta.",
  },
  {
    id: "c08-tele",
    bloque: 5,
    tipo: "video",
    src: v("rc03"),
    // RC03 (`ESTUDIO (11)`, iPhone, 1080×1920, SDR, 29,97 fps), del 0,50 al 4,00 s: la planta alta, la tele con las plataformas y el estante de madera, y la esquina de la cama hecha; la cámara se desplaza a la derecha. Textura
    // bajo la infografía (velo negro del 80 %): el estudio con la tele. Entra DISOLVIENDO (12 f antes de su `en`) a un frame libre.
    desde: 0.5,
    en: P.cama + DUR_FONDO,
    dur: DUR_FONDO,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.1, shadows: 0.1, highlights: -0.3, whites: -0.1, saturation: 1.04 }),
    reason:
      "El estudio con la tele y la planta (lo que el huésped encuentra: todo listo): textura bajo la infografía de la cuenta, que se funde con la cama; sigue dentro del estudio.",
  },
  {
    id: "c08b-sofa",
    bloque: 5,
    tipo: "video",
    src: v("rc15"),
    // RC15 (`ESTUDIO (6)`, iPhone, 1080×1920, SDR, 29,97 fps), del 0,50 al 4,00 s: la colcha de la cama en primer término, el panel de listones retroiluminado y el sofá gris con la estantería; la cámara se desplaza a la derecha.
    // Textura bajo la infografía. Entra DISOLVIENDO.
    desde: 0.5,
    en: P.cama + 2 * DUR_FONDO,
    dur: DUR_FONDO,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.1, shadows: 0.12, highlights: -0.3, whites: -0.1, saturation: 1.04 }),
    reason:
      "La cama y el sofá (el estudio entero en una sola vista): textura bajo la infografía; el último plano dentro del estudio antes de salir a las zonas comunes.",
  },
  {
    id: "c08c-coworking",
    bloque: 5,
    tipo: "video",
    src: v("zc01"),
    // ZC01 (`SALA DE JUNTAS (1)`, iPhone, 1080×1920, SDR, 29,97 fps), del 0,50 al 4,00 s: la sala de juntas del edificio, la mesa blanca con las sillas negras, el panel hexagonal y la pared de madera; la cámara avanza a lo
    // largo de la mesa y gira a la izquierda. El coworking y la sala de reuniones como argumento de negocio (el huésped de trabajo no necesita salir del edificio). Entra DISOLVIENDO a un frame libre, bajo la infografía.
    // La 062 usa ZC06 y la 061 ZC05; ZC01 es de esta pieza.
    desde: 0.5,
    en: P.cama + 3 * DUR_FONDO,
    dur: P.vista - (P.cama + 3 * DUR_FONDO),
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: -0.25, shadows: 0.1, highlights: -0.3, whites: -0.15, saturation: 1.0 }),
    reason:
      "El coworking del edificio (el argumento de negocio: el huésped que trabaja tiene sala de reuniones en el mismo edificio); sale del estudio a las zonas comunes, bajo los gastos y la utilidad.",
  },
  {
    id: "c09-vista",
    bloque: 5,
    tipo: "video",
    src: v("zc11"),
    // ZC11 (`TERRAZA Y JACUZZI (13)`, iPhone, 1080×1920, SDR, 30 fps), del 2,10 al 6,30 s: el borde del jacuzzi con el agua turquesa y, detrás, la ciudad, las montañas y las nubes; la cámara se aleja y sube, se abre
    // el cielo de nubes y el piso de madera. Entra A CORTE en el golpe de 10,7 dB (f1296; el velo negro de la infografía se va con él) y es el plano más largo del bloque 5 (126 f): el clímax, con la utilidad encima.
    desde: 2.1,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.05, shadows: 0.1, highlights: -0.35, whites: -0.2, saturation: 1.06 }),
    reason:
      "La ciudad y las montañas desde el rooftop (la vista, el clímax): del agua del jacuzzi sube al horizonte de Medellín con las nubes; la recompensa que cierra el recorrido. El plano más largo del bloque.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c10-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct03"),
    audio: a("ct03-voz"),
    voz: {
      s0: 0.96,
      s1: 5.62,
      lufs: -15,
      dice: "Si deseas que te envíe la rentabilidad mensual, haz clic en el enlace y escríbeme un mensaje.",
    },
    // La voz empieza a los 0,96 s (28,8 f) y acaba a los 5,62 s (168,6 f: el «-je» de «mensaje» a −44…−52 dB; `limites-voz.py` decía 5,36 s); el clip dura 6,267 s (188 f). `desde` 16 f entra DISOLVIENDO (el clip tiene
    // 16 f antes) y la primera palabra suena a los 12,8 f del `en`: la disolvencia acaba en un frame LIBRE (f1422: la canción no tiene golpes ≥ 10 dB entre los 197,7 y los 204,8 s) y la música baja con curva de 10 f desde ahí, acabando 2,8 f antes de la palabra. El plano dura
    // 160 f (acaba en el f176 del clip, 12 f antes de su final): 7 f tras la última palabra, en los que la imagen funde a negro (los últimos 6).
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-060.ts`): «escríbeme» (whisper oye «escribete», confianza 0,29-0,57).
    // Isabella sentada en la silla de madera junto al escritorio, con la cocina detrás y la cama delante; habla con las manos.
    desde: fr(16),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, exposure: -0.05, highlights: -0.2, whites: -0.1, saturation: 1.04 }),
    reason:
      "El escritorio junto a la cocina (la invitación): Isabella dice «si deseas que te envíe la rentabilidad mensual, haz clic en el enlace y escríbeme un mensaje»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-060.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c11-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-060/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c10
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c11). */
export const DURACION_060 = P.cta + DUR_CTA + DUR_TARJETA;
