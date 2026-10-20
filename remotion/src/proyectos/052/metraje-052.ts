/**
 * EL RECORRIDO 052 — «Pregúntate esto» (V34): los planos, como DATOS.
 *
 * Es la RÉPLICA de `videos editados/02.mp4` (15-sep-2026, 77,6 s): las mismas tomas, en el mismo orden, en el formato del canal (skill `recorrido-luxur`), **sin locución en off y con un guion nuevo EN PANTALLA**
 * (cambio de encargo del 2026-10-20: «crea el vídeo sin la voz en off … cambiamos el guion a algo más impactante que resalte las plusvalías»; `proyectos/044/reparto-051-053.md` §5 y §5b). El original abre con
 * Isabella en el sofá, sigue con el recorrido mientras una locución cuenta qué se paga cuando se arrienda amueblado, y cierra con Isabella en la silla de la sala. Aquí:
 *
 *   bloque 2  c01                 Isabella en el sofá (HK04): el hook, con su voz en directo y su imagen desde el f0 (réplica: excepción declarada a la regla fija 1)
 *   bloque 5  c02 … c11           el recorrido en el orden del original, SIN voz: nueve RÓTULOS (`subtitulos-052.ts`), uno por tramo, que enseñan las plusvalías del arriendo
 *   bloque 6  c12 c13             Isabella en la silla de la sala (CT05): el CTA con su voz; y la tarjeta oscura del cierre con el logo y la web (nada se congela)
 *
 * LA LECTURA DEL ORIGINAL (por fotogramas, emparejados contra los clips: 2026-10-20). Planos y de dónde sale cada uno (código del catálogo · tramo en el original):
 *   hook 0-2,6 s  HK04 desde 4,83 s (el segundo intento de Isabella: «Antes de arrendar amoblado, pregúntate esto»; el primero, de 2,9 s, se equivoca y el original también lo salta) ·
 *   3,0-9,9  RC21 AL REVÉS (del jacuzzi a la ciudad: `rc21r`) · 10,0-13,1  RC22 (el bar) · 13,2-21,7  RC06 (la alcoba) · 22,0-33,6  RC01 (la isla, la sala con la palma, el ventanal) ·
 *   33,8-45,2  RC03 (las camas del balcón → las torres → el cielo) · 45,3-49,8  RC15 (el sauna) · 49,9-53,0  Isabella EN LA COCINA (¡NO está en el material!) ·
 *   53,1-59,1  RC16 (la piscina) · 59,1-63,0  el BOSQUE CON HIERBA (¡NO está en el material!) · 63,0-66,3  RC13 (el gimnasio) · 66,3-73,6  RC12 (la Social Kitchen) · 73,6-77,5  CT05 (el CTA).
 * El plano de Isabella en la cocina se sustituye por Isabella caminando hacia cámara en la sala con la palma (CT04, sin voz); el bosque, que no existe, NO se sustituye (el guion nuevo dice «bosque si existe»).
 * Sin voz que cuente, la pieza dura lo que tarda en leerse (≈ 3-5 s por rótulo): **los planos del original se RECORTAN, no se quitan** (el original duraba 77,6 s; esta, 46,6). Cada plano va a SU tiempo (nada
 * se acelera: la `velocidad` solo se admite en el bloque 3; el original acelera RC21 ×1,6, RC01 ×1,1 y RC03 ×1,5).
 *
 * LA MÚSICA MANDA EL RITMO. Sin voz, la canción pesa y solo baja bajo el hook y el CTA. Cada rótulo y cada cambio de plano caen en un GOLPE MEDIDO del piano (`proyectos/052/musica/golpes-052.json`, de
 * `medir-pista.py --json`; `herramientas/buscar-entrada-rotulos.py` busca la entrada que casa las diez entradas con los golpes más fuertes): el primero, un golpe de 32,8 dB justo cuando acaba el hook. Una
 * disolvencia ACABA en el golpe (el plano entra opaco en su `en`).
 *
 * TRANSICIONES. Disolvencias de 12 f entre todos los planos (como el original: no hay un solo corte seco; el piano no tiene pulso). Un plano que disuelve necesita 12 frames de clip ANTES de su `desde`; el saliente
 * no se alarga.
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

/* ── La música ─────────────────────────────────────────────────────────────── */

/**
 * «Here For You» (Armin van Buuren, del álbum «Piano», `archivos/musica/…Here For You (from 'Piano' album).mp3`, sha 8 `6fbbe88d`, 3:55): piano, SIN pulso ni caída (el registro la midió con una caída de 8,0 dB a +40,3 s). Se usa
 * desde su segundo 22,733 (682/30, para que `trimBefore` no lo mueva): 3 s de piano casi mudo (−34 LUFS) bajo el hook y, en el f90, el golpe de 32,8 dB (el segundo 25,692 de la canción: de un lecho quieto a la sala
 * entera) justo cuando acaba el hook y entra el primer rótulo; de ahí, −15 LUFS planos hasta los 70 s. Medida con `medir-pista.py`, no oída.
 */
export const INICIO_MUSICA = 682 / FPS_052;
/** Lo que el audio del render llega TARDE respecto de su fuente (42 ms, medido en el 016) y lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (12 ms). */
export const RETARDO_AUDIO = 0.042;
const ATAQUE = 0.012;
/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_052;

/**
 * Dónde entra cada RÓTULO (frames de la composición): cada uno cae en un golpe medido del piano (≥ 7 dB; `buscar-entrada-rotulos.py`). R1 entra con el golpe de 32,8 dB que sigue al hook; los siguientes, a 3-5 s unos
 * de otros (lo que tarda en leerse un rótulo de 4-6 palabras con la pieza sin voz). Los de los planos con dos tramos (R3, R6) cambian de plano en un golpe a mitad.
 */
export const R = {
  r1: 90, // 3,01 s · golpe de 32,8 dB
  r2: 179, // 5,98 s · «…o un lugar donde disfrutes vivir?»
  r3: 278, // 9,27 s · «Aquí no pagas solo un apartamento» (RC22 + RC06)
  r4: 414, // 13,80 s · «Pagas llegar y tener todo resuelto:» (RC01)
  r5: 554, // 18,45 s · «Aseo semanal incluido» (RC03)
  r6: 687, // 22,89 s · «Alguien que te acompaña…» (RC15 + Isabella)
  r7: 823, // 27,42 s · «Chef privado y transporte…» (RC16): el golpe más fuerte tras el primero (15,9 dB)
  r8: 956, // 31,85 s · «Planes y reservas en Medellín» (RC13)
  r9: 1043, // 34,76 s · «Y la mejor asesoría de la ciudad» (RC12)
} as const;
/** Cambios de plano que no son un rótulo nuevo (también en golpe). */
const MITAD = { alcoba: 355, isabella: 756 } as const;
/** El CTA entra en un golpe de 13,8 dB (el segundo 61,868 de la canción). */
const CTA_EN = 1176;

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

/** El CTA: su toma dura 104 f (la frase, 84 f, y 20 de cola) y a su último fotograma funde a negro. */
export const DUR_CTA = 104;

const DUR_HOOK = 90; // la voz acaba en el f72: 2 f de margen, 12 de disolvencia y 4 más para que el plano siguiente entre justo en el golpe del f90

export const CTA_EN_052 = CTA_EN;

export const metraje052: readonly Corte[] = [
  // ── Bloque 2 · el hook: Isabella, sin casa delante (réplica de `02.mp4`) ──
  {
    id: "c01-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk04"),
    audio: a("hk04-voz"),
    // HK04 trae DOS intentos: en el primero (2,90-3,9 s) Isabella se equivoca (whisper oye «Antes de morrera») y en el segundo (de 4,92 s) dice la frase entera: «Antes de arrendar amoblado, pregúntate esto» (4,92-7,17 s,
    // perfil de energía, `onsets-voz.py` y whisper sobre ese tramo; el original `02.mp4` también empieza en el segundo). El hook ARRANCA en el segundo «Antes» (corrección del usuario, 2026-10-20): su primera sílaba suena
    // en el f5 (desde fr(143) = 4,767 s). Sin el intento fallido ni la pausa de 1 s, el hook dura 2,9 s en vez de 4,9.
    voz: { s0: 4.925, s1: 7.17, lufs: -15.1, dice: "Antes de arrendar amoblado, pregúntate esto." },
    desde: fr(143),
    en: 0,
    dur: DUR_HOOK,
    zoom: EMPUJE,
    entra: "corte",
    // Isabella: la piel se queda donde estaba (saturation ≤ 1,06, sin tirar de cálido ni de frío): la base sube un 10 % y a ella casi nada.
    color: color({ saturation: 1.02, exposure: 0.06 }),
    reason:
      "Sofá de la sala: Isabella abre la pieza hablando (réplica: `02.mp4` también abre con ella y también salta su primer intento fallido); el hook es una pregunta que selecciona a quien va a arrendar amueblado.",
  },
  // ── Bloque 5 · el recorrido, sin voz: un rótulo por tramo ──
  {
    id: "c02-balcon-atardecer",
    bloque: 5,
    tipo: "video",
    src: v("rc21r"),
    desde: fr(12),
    en: DUR_HOOK,
    dur: R.r3 - DUR_HOOK,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.04 }),
    reason:
      "Balcón al atardecer (RC21 al revés, como el original: del jacuzzi privado a la ciudad y las nubes): bajo «¿Un lugar donde dormir… o un lugar donde disfrutes vivir?» el balcón es lo que más se disfruta; dos rótulos sobre un solo plano.",
  },
  {
    id: "c03-bar",
    bloque: 5,
    tipo: "video",
    src: v("rc22"),
    desde: fr(12),
    en: R.r3,
    dur: MITAD.alcoba - R.r3,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.05 }),
    reason: "Bar de noche (RC22): «aquí no pagas solo un apartamento»: lo que está puesto para quien llega; el plano más corto de la pieza (el clip da 3,2 s y 12 f son de la disolvencia).",
  },
  {
    id: "c04-alcoba",
    bloque: 5,
    tipo: "video",
    src: v("rc06"),
    desde: fr(12),
    en: MITAD.alcoba,
    dur: R.r4 - MITAD.alcoba,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason: "Alcoba principal (RC06): sigue el mismo rótulo («aquí no pagas solo un apartamento»): lo privado, la cama; el cambio de plano cae en un golpe de 11,3 dB.",
  },
  {
    id: "c05-cocina-sala",
    bloque: 5,
    tipo: "video",
    src: v("rc01"),
    desde: fr(180),
    en: R.r4,
    dur: R.r5 - R.r4,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason: "Sala con la palma y el ventanal (RC01, el tramo de 6 a 10 s: del comedor a la puerta del balcón): «pagas llegar y tener todo resuelto», una cámara que camina el apartamento hasta el balcón.",
  },
  {
    id: "c06-balcon-torres",
    bloque: 5,
    tipo: "video",
    src: v("rc03"),
    desde: fr(45),
    en: R.r5,
    dur: R.r6 - R.r5,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason: "Balcón con las camas (RC03, 1,5-5,9 s): sale al exterior con «aseo semanal incluido»; las camas blancas y el jacuzzi al fondo, la primera plusvalía.",
  },
  {
    id: "c07-sauna",
    bloque: 5,
    tipo: "video",
    src: v("rc15"),
    desde: fr(12),
    en: R.r6,
    dur: MITAD.isabella - R.r6,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ exposure: 0.12 }),
    reason: "Sauna de la unidad (RC15): del apartamento a lo que acompaña, «alguien que te acompaña desde el día uno».",
  },
  {
    id: "c08-isabella-sala",
    bloque: 5,
    tipo: "video",
    src: v("ct04"),
    desde: fr(75),
    en: MITAD.isabella,
    dur: R.r7 - MITAD.isabella,
    zoom: QUIETO,
    entra: "disolver",
    // Isabella en cuadro, aunque aquí no habla: la piel se queda donde estaba.
    color: color({ saturation: 1.02 }),
    reason:
      "Sala con la palma: Isabella camina hacia cámara en el momento de «alguien que te acompaña» (SUSTITUYE a «Isabella en la cocina» del original, que no está en el material); sin voz.",
  },
  {
    id: "c09-piscina",
    bloque: 5,
    tipo: "video",
    src: v("rc16"),
    desde: 2.6,
    en: R.r7,
    dur: R.r8 - R.r7,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason: "Piscina de la unidad (RC16, 2,6-7,0 s): «chef privado y transporte cuando los pidas», lo que ofrece el proyecto; el golpe más fuerte tras el del hook (15,9 dB) lo abre. El «bosque con hierba» del original no existe y no se sustituye.",
  },
  {
    id: "c10-gimnasio",
    bloque: 5,
    tipo: "video",
    src: v("rc13"),
    desde: fr(12),
    en: R.r8,
    dur: R.r9 - R.r8,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason: "Gimnasio (RC13, 0,4-3,3 s: como el original): «planes y reservas en Medellín», la vida de la unidad; las personas del fondo salen pequeñas.",
  },
  {
    id: "c11-social-kitchen",
    bloque: 5,
    tipo: "video",
    src: v("rc12"),
    desde: fr(12),
    en: R.r9,
    dur: CTA_EN - R.r9,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason:
      "Social Kitchen (RC12, 0,4-4,8 s): «y la mejor asesoría de la ciudad»; es el último plano de la casa antes del CTA, como en el original (aquí no hay un clímax distinto).",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c12-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct05"),
    audio: a("ct05-voz"),
    // «Si buscas más que un apartamento para vivir, escríbenos.» de 1,30 a 4,08 s (`onsets-voz.py` y el perfil de energía); la toma sigue 3 s más, que no se usan.
    voz: { s0: 1.3, s1: 4.08, lufs: -15.0, dice: "Si buscas más que un apartamento para vivir, escríbenos." },
    desde: fr(38),
    en: CTA_EN,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ saturation: 1.02, exposure: -0.04 }),
    reason: "Silla de la sala: Isabella cierra a cámara con una sola acción; tras su última palabra funde a negro y entra la tarjeta del cierre (la misma toma cierra la 053: declarado).",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  {
    id: "c13-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-052/cierre-oscuro.png",
    en: CTA_EN + DUR_CTA,
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason: "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre. */
export const DURACION_052 = CTA_EN + DUR_CTA + DUR_TARJETA;

/** La música acaba 2 f antes del final de la pieza (en línea recta bajo la tarjeta). */
export const FIN_MUSICA_052 = DURACION_052 - 2;
