/**
 * EL RECORRIDO 052 — «Pregúntate esto» (V34): los planos, como DATOS.
 *
 * Es la RÉPLICA de `videos editados/02.mp4` (15-sep-2026, 77,6 s): las mismas tomas, en el mismo orden y con el mismo texto, en el formato del canal (skill `recorrido-luxur`). El original abre con Isabella en el
 * sofá, sigue con el recorrido mientras una locución en off cuenta qué se paga cuando se arrienda amueblado, y cierra con Isabella en la silla de la sala. Aquí:
 *
 *   bloque 2  c01                 Isabella en el sofá (HK04): el hook, con su imagen desde el f0 (réplica: excepción declarada a la regla fija 1)
 *   bloque 5  c02 … c12           el recorrido en el orden del original, con la LOCUCIÓN EN OFF encima (`off052`, en `audio-052.ts`)
 *   bloque 6  c13 c14             Isabella en la silla de la sala (CT05): el CTA; y la tarjeta oscura del cierre con el logo y la web (nada se congela)
 *
 * LA LECTURA DEL ORIGINAL (por fotogramas, emparejados contra los clips: 2026-10-20). Planos y de dónde sale cada uno (código del catálogo · tramo en el original):
 *   hook 0-2,6 s  HK04 desde 4,83 s (el original recorta «Antes de arrendar» y empieza en «…moblado, pregúntate esto»: aquí va entera) ·
 *   3,0-9,9  RC21 AL REVÉS (del jacuzzi a la ciudad: `rc21r`) · 10,0-13,1  RC22 (el bar) · 13,2-21,7  RC06 (la alcoba) · 22,0-33,6  RC01 (la isla, la sala con la palma, el ventanal) ·
 *   33,8-45,2  RC03 (las camas del balcón → las torres → el cielo) · 45,3-49,8  RC15 (el sauna) · 49,9-53,0  Isabella EN LA COCINA (¡NO está en el material!) ·
 *   53,1-59,1  RC16 (la piscina) · 59,1-63,0  el BOSQUE CON HIERBA (¡NO está en el material!) · 63,0-66,3  RC13 (el gimnasio) · 66,3-73,6  RC12 (la Social Kitchen) · 73,6-77,5  CT05 (el CTA).
 * Los dos planos que faltan se sustituyen por el más parecido y se declara (`01-plan.md`): Isabella caminando hacia cámara en la sala con la palma (CT04, sin voz) y el carril de nado entre árboles y cielo (RC17).
 * El original acelera RC21 (×1,6), RC01 (×1,1) y RC03 (×1,5): aquí cada plano va a SU tiempo (la `velocidad` solo se admite en el bloque 3) y, donde el original pasaba el clip entero, aquí se elige un tramo.
 *
 * LA LOCUCIÓN MANDA. Cada plano entra donde el original lo cambia respecto de lo que dice la voz: sus `en` salen de las PALABRAS de la locución (`ancla`, abajo), no de segundos sueltos. Mientras la locución no existe
 * (`OFF_PENDIENTE` en `audio-052.ts`: no hay archivo, el usuario decide si la entrega o se genera), el reloj es el del propio `02.mp4`: los tiempos de abajo son los de su transcripción (`proyectos/052/medidas/orig02.json`).
 * Cuando llegue la locución real se cambian `OFF_S0` y `PALABRAS_OFF` por lo que se mida en ella y todo se mueve con ellas.
 *
 * TRANSICIONES. Disolvencias de 12 f entre todos los planos (como el original: no hay un solo corte seco). La canción es un piano sin pulso: no tiene golpes donde cortar en seco y con una disolvencia no hace falta
 * (R33 solo lo pide a los cortes secos). Un plano que disuelve necesita 12 frames de clip ANTES de su `desde`; el saliente no se alarga. Por eso RC22, RC06, RC01 y RC15 duran 1-3 s menos que en el original: tienen
 * justo el clip que hace falta.
 *
 * EL COLOR (R32; revisión 7 del 017): cada plano de VÍDEO lleva `color: color({ … })`, el efecto `colorCorrection()` de Remotion: la base del canal (`COLOR_BASE`) más el ajuste de su toma, MEDIDO con
 * `herramientas/medir-color.py` (`recorrido-luxur/montaje.md` §9b). Con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida con ffmpeg (§12). La tarjeta del cierre (`foto`) no lleva.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-052.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-052";

export const FPS_052 = 30;

export type Entrada = "corte" | "disolver";
export type Bloque = 1 | 2 | 3 | 4 | 5 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. `s0`/`s1`, medidos por energía (perfil de 20 ms en la banda de voz) y por arranques de sílaba (`onsets-voz.py`); `lufs`, con ebur128 sobre el WAV TRATADO que suena. */
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
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido del usuario desde la V9: «mientras habla Isabella sube los decibeles sin saturar»). Cada voz pasa por la cadena de `normalizar.mjs` (graves, puerta suave,
 * compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS) hasta −15 LUFS con el pico real a −2,5 dBFS, así que el plan no añade ganancia
 * (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_052;

/** Isabella habla a cámara: un empuje lento la acompaña. Los recorridos, quietos (la cámara ya se mueve). */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

/* ── La locución como reloj ──────────────────────────────────────────────────
 *
 * `OFF_S0` es el segundo de la locución en que suena su PRIMERA palabra («¿Estás…»), `OFF_EN0` el frame de la composición en que suena, y `PALABRAS_OFF` el segundo de la locución en que empieza cada palabra
 * que manda un cambio de plano. TODO PROVISIONAL: son los del audio de `02.mp4` (whisper por palabra, `proyectos/052/medidas/orig02.json`; el arranque de «Estás», 3,73 s, es el de `onsets-voz.py`, porque whisper lo
 * pone a 3,56 s). La locución real los sustituye. El primer plano de la locución entra ya con el hook acabado (f147) y ≈ 0,6 s antes de su primera palabra, como en el original.
 */
export const OFF_S0 = 3.73;
export const OFF_EN0 = 164;
export const PALABRAS_OFF = {
  /** «…un [apartamento] amoblado»: el bar. */
  apartamento: 10.14,
  /** «…coworking»: el sauna. */
  coworking: 45.64,
  /** Tras «…un lugar de paso,»: los árboles. */
  paso: 59.1,
  /** «…y disfrutar de una calidad de vida»: el gimnasio. */
  disfrutar: 63.08,
  /** «Un lugar [donde] vivir bien…»: la Social Kitchen. */
  donde: 66.2,
} as const;

/** El frame de la composición en que suena un instante de la locución. */
export const ancla = (tOff: number): number => OFF_EN0 + Math.round((tOff - OFF_S0) * FPS_052);

/* ── La música ─────────────────────────────────────────────────────────────── */

/**
 * «Here For You» (Armin van Buuren, del álbum «Piano», `archivos/musica/…Here For You (from 'Piano' album).mp3`, sha 8 `6fbbe88d`, 3:55): piano, SIN pulso ni caída (el registro la midió con una caída de 8,0 dB a +40,3 s). Se usa
 * desde su segundo 20,733 (622/30, para que `trimBefore` no lo mueva): 5 s de piano casi mudo (−35,8 LUFS) bajo el hook y, en el f150, el golpe de 32,8 dB (el segundo 25,692 de la canción: de un lecho quieto a la sala
 * entera) justo entre el último «esto» del hook y la primera palabra de la locución; de ahí, −15 LUFS planos hasta los 70 s y −17 hasta el final. Medida con `medir-pista.py`, no oída.
 */
export const INICIO_MUSICA = 622 / FPS_052;
/* ── El color ──────────────────────────────────────────────────────────────── */

/**
 * LA BASE DEL COLOR de Luxur, la del 017. `colorCorrection()` aplica, por este orden: exposición → balance de blancos → sombras/luces/blancos/negros → contraste → saturación → vibrance.
 *
 *   contrast 1,10     cuerpo: el material (iPhone y dron) llega plano
 *   blacks −0,06      el negro un poco hundido; sin él el hormigón se ve lavado
 *   shadows +0,08     … pero las sombras no se cierran: en obra gris el detalle está ahí
 *   highlights −0,20  las luces se recogen: cielos y ventanales no se queman
 *   whites −0,05      el blanco, casi sin tocar
 *   temperature +0,03 un punto cálido (la marca es cálida), sin teñir la piel
 *   saturation 1,10   la viveza va aquí y NO en `vibrance`
 *   vibrance 0        sobre hormigón gris amplifica el ruido de croma (moteado de colores) y vuelve rosadas las nubes
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

/** El color de un plano: la base más el ajuste de su toma (medido, `medir-color.py`). Topes que comprueba la puerta: `vibrance` ≤ 0,05 · |`exposure`| ≤ 0,4 · Isabella con `saturation` ≤ 1,06. */
const color = (ajuste: ColorCine = {}): ColorCine => ({ ...COLOR_BASE, ...ajuste });

const v = (id: string): string => `recorrido-052/${id}.mp4`;
const a = (id: string): string => `recorrido-052/${id}.wav`;

/* ── Dónde entra cada plano (frames de la composición) ─────────────────────────── */

/**
 * `en` de cada plano. Los de la locución salen de sus palabras (`ancla`); los que tienen el clip justo (RC22, RC06, RC01, RC15, RC12: 12 f de disolvencia + lo que dura) se miden contra su clip, y el siguiente entra
 * donde ellos acaban.
 */
const P = {
  hook: 0,
  /** El hook dura hasta que acaba «esto» (f133) más 2 f de margen y los 12 de la disolvencia del siguiente. */
  balcon: 147,
  bar: ancla(PALABRAS_OFF.apartamento),
  /** RC22 tiene 96 f: 12 de disolvencia + 84. */
  alcoba: ancla(PALABRAS_OFF.apartamento) + 84,
  /** RC06 tiene 257 f: 12 + 245. */
  cocina: ancla(PALABRAS_OFF.apartamento) + 84 + 245,
  /** RC01 tiene 386 f: 12 + 374. */
  camas: ancla(PALABRAS_OFF.apartamento) + 84 + 245 + 374,
  sauna: ancla(PALABRAS_OFF.coworking),
  /** RC15 tiene 137 f: 12 + 125. */
  isabella: ancla(PALABRAS_OFF.coworking) + 125,
  piscina: ancla(PALABRAS_OFF.coworking) + 125 + 99,
  arboles: ancla(PALABRAS_OFF.paso),
  gimnasio: ancla(PALABRAS_OFF.disfrutar),
  social: ancla(PALABRAS_OFF.donde),
  /** RC12 tiene 221 f: 12 + 209. */
  cta: ancla(PALABRAS_OFF.donde) + 209,
} as const;

/** El CTA: su toma dura 104 f (la frase, 84 f, y 20 de cola) y a su último fotograma funde a negro. */
export const DUR_CTA = 104;
const DUR_HOOK = P.balcon - P.hook;

export const metraje052: readonly Corte[] = [
  // ── Bloque 2 · el hook: Isabella, sin casa delante (réplica de `02.mp4`) ──
  {
    id: "c01-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk04"),
    audio: a("hk04-voz"),
    // «Antes de arrendar» 2,90-3,9 s · pausa de 1 s · «amoblado,» 4,92-5,9 s · pausa · «pregúntate esto.» 6,50-7,17 s (perfil de energía y `onsets-voz.py`). La primera sílaba suena en el f5 (desde fr(82) = 2,733 s).
    voz: { s0: 2.9, s1: 7.17, lufs: -15.2, dice: "Antes de arrendar amoblado, pregúntate esto." },
    desde: fr(82),
    en: P.hook,
    dur: DUR_HOOK,
    zoom: EMPUJE,
    entra: "corte",
    // Isabella: la piel se queda donde estaba (saturation ≤ 1,06, sin tirar de cálido ni de frío): la base sube un 10 % y a ella casi nada.
    color: color({ saturation: 1.02, exposure: 0.06 }),
    reason:
      "Sofá de la sala: Isabella abre la pieza hablando (réplica: `02.mp4` también abre con ella, aunque recorta «Antes de arrendar»); el hook es una pregunta que selecciona a quien va a arrendar amueblado.",
  },
  // ── Bloque 5 · el recorrido con la locución en off ──
  {
    id: "c02-balcon-atardecer",
    bloque: 5,
    tipo: "video",
    src: v("rc21r"),
    desde: fr(12),
    en: P.balcon,
    dur: P.bar - P.balcon,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason:
      "Balcón al atardecer (RC21 al revés, como el original: del jacuzzi privado a la ciudad y las nubes): la promesa de «un lugar donde realmente disfrutes vivir» empieza por lo que más se disfruta.",
  },
  {
    id: "c03-bar",
    bloque: 5,
    tipo: "video",
    src: v("rc22"),
    desde: fr(12),
    en: P.bar,
    dur: 84,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.05 }),
    reason: "Bar de noche (RC22): «un apartamento amoblado» es esto, lo que está puesto para quien llega; entra con la palabra «apartamento».",
  },
  {
    id: "c04-alcoba",
    bloque: 5,
    tipo: "video",
    src: v("rc06"),
    desde: fr(12),
    en: P.alcoba,
    dur: 245,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason: "Alcoba principal (RC06): «una cama» y «la comodidad de llegar a casa»; el plano más largo del tramo de lo privado, que respira con la voz.",
  },
  {
    id: "c05-cocina-sala",
    bloque: 5,
    tipo: "video",
    src: v("rc01"),
    desde: fr(12),
    en: P.cocina,
    dur: 374,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason: "Cocina y sala (RC01): de la isla a la sala con la palma y el ventanal; «los detalles deben estar a la altura» y «imagina terminar el día», una sola cámara que camina el apartamento.",
  },
  {
    id: "c06-balcon-torres",
    bloque: 5,
    tipo: "video",
    src: v("rc03"),
    desde: fr(18),
    en: P.camas,
    dur: P.sauna - P.camas,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason: "Balcón con las camas (RC03): sale al exterior con «conectado con Medellín», gira a las torres y al cielo mientras la voz cuenta las habitaciones y lo que ofrece el proyecto.",
  },
  {
    id: "c07-sauna",
    bloque: 5,
    tipo: "video",
    src: v("rc15"),
    desde: fr(12),
    en: P.sauna,
    dur: 125,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.12 }),
    reason: "Sauna de la unidad (RC15): del apartamento a lo que ofrece el proyecto, con «coworking, Spa Romano y espacios para compartir».",
  },
  {
    id: "c08-isabella-sala",
    bloque: 5,
    tipo: "video",
    src: v("ct04"),
    desde: fr(75),
    en: P.isabella,
    dur: 99,
    zoom: QUIETO,
    entra: "disolver",
    // Isabella en cuadro, aunque aquí no habla: la piel se queda donde estaba.
    color: color({ saturation: 1.02 }),
    reason:
      "Sala con la palma: Isabella camina hacia cámara en el momento de «¿para qué pagar un arriendo premium…?» (SUSTITUYE a «Isabella en la cocina» del original, que no está en el material); sin voz.",
  },
  {
    id: "c09-piscina",
    bloque: 5,
    tipo: "video",
    src: v("rc16"),
    desde: 3.0,
    en: P.piscina,
    dur: P.arboles - P.piscina,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason: "Piscina de la unidad (RC16): el carril de nado y la ciudad detrás mientras entra «este apartamento en Las Palmas es para quienes quieren que su hogar sea mucho más que un lugar de paso».",
  },
  {
    id: "c10-arboles",
    bloque: 5,
    tipo: "video",
    src: v("rc17"),
    desde: 3.2,
    en: P.arboles,
    dur: P.gimnasio - P.arboles,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason: "Carril de nado entre árboles y cielo (RC17, SUSTITUYE al «bosque con hierba» del original, que no está en el material): «un espacio para descansar, trabajar, recibir invitados».",
  },
  {
    id: "c11-gimnasio",
    bloque: 5,
    tipo: "video",
    src: v("rc13"),
    desde: fr(12),
    en: P.gimnasio,
    dur: P.social - P.gimnasio,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason: "Gimnasio (RC13): «una calidad de vida diferente», lo que el proyecto pone al alcance; las personas del fondo salen pequeñas.",
  },
  {
    id: "c12-social-kitchen",
    bloque: 5,
    tipo: "video",
    src: v("rc12"),
    desde: fr(12),
    en: P.social,
    dur: 209,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason:
      "Social Kitchen (RC12): «un lugar donde vivir bien no sea un plan para después, sino parte de tu día a día»; es el último plano de la casa antes del CTA, como en el original (aquí no hay un clímax distinto).",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c13-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct05"),
    audio: a("ct05-voz"),
    // «Si buscas más que un apartamento para vivir, escríbenos.» de 1,30 a 4,08 s (`onsets-voz.py` y el perfil de energía); la toma sigue 3 s más, que no se usan.
    voz: { s0: 1.3, s1: 4.08, lufs: -15.0, dice: "Si buscas más que un apartamento para vivir, escríbenos." },
    desde: fr(38),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ saturation: 1.02, exposure: -0.04 }),
    reason: "Silla de la sala: Isabella cierra a cámara con una sola acción; tras su última palabra funde a negro y entra la tarjeta del cierre (la misma toma cierra la 053: declarado).",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  {
    id: "c14-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-052/cierre-oscuro.png",
    en: P.cta + DUR_CTA,
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason: "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre. */
export const DURACION_052 = P.cta + DUR_CTA + DUR_TARJETA;

/** La música acaba 2 f antes del final de la pieza (en línea recta bajo la tarjeta). */
export const FIN_MUSICA_052 = DURACION_052 - 2;
