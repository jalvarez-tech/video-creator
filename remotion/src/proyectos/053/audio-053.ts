/**
 * EL SONIDO DEL 053 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son tres cosas, y las tres pasan por `<PistaAudio>`:
 *
 *   voces053   la voz de Isabella en la ÚNICA toma que habla a cámara (CT05, el CTA), derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, cruce de voz de 6 f (entra con una
 *              disolvencia) y, como el WAV es el TRATADO de `normalizar.mjs` (`ct05-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a ≈ −15 LUFS en su ventana), UNA ganancia de ±0,1 dB.
 *   off053     la LOCUCIÓN EN OFF entera: el gancho («¿Pagarías 14 millones al mes por vivir aquí?») y las cinco frases del recorrido, en UN archivo (`off-voz.wav`, el tratado de `off.wav`). **NO existe como audio
 *              del usuario** (reparto §3): hoy es una PISTA GUÍA (voz de sistema `Paulina`, `say`) y se sustituye por la real —los audios que entregue el usuario o la voz clonada de Isabella en ElevenLabs—.
 *   musica053  «Softly», con una envolvente que la deja de LECHO bajo la voz y acompaña la CURVA de la canción (calma → meseta → caída en el CTA).
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente, `herramientas/lufs-rangos.py`):
 *   voz (locución e Isabella)  −15 (pedido del usuario: «la voz a −15 LUFS sin saturar»)
 *   música BAJO LA VOZ         la canción se queda a UNA ganancia constante (`BAJO`) que deja su meseta (−11,5 LUFS en la fuente) a −26 LUFS: 11 LU por debajo de la voz (los picos de 3 s de la meseta, −10,0, quedan a −24,5: ≥ 9 LU).
 *                              La calma del arranque (−15,2) queda a −29,7 y la canción CRECE por su cuenta (+3,7 dB) al entrar la meseta, que es lo que tiene de «Softly».
 *   música SOLA                solo hay DOS tramos sin voz: los 8 f del arranque (que entran con un fundido) y la cola tras el CTA, bajo la tarjeta (la canción ya cae sola a −23 LUFS: se SIGUE su caída, abajo).
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · ENTRADA: la canción arranca en el f0 con un fundido de coseno de 8 f.
 *   · LA LOCUCIÓN ES CONTINUA: entre sus frases hay 9-15 f de pausa (0,3-0,5 s) y entre el final de la locución y el CTA, 18 f: no dan para subir y bajar (FADE_OUT + FADE_IN = 34 f), así que la música se queda ABAJO de principio
 *     a fin de la voz. No hay ducking que oír: es un lecho.
 *
 * EL CTA Y EL CIERRE. La canción CAE en el f1592 (196,2 s de la canción): de −10,7 a −23 LUFS en 4 s. La primera palabra del CTA suena en el f1604. La música SIGUE la caída (la ganancia sube conforme la canción baja,
 * `CAIDA`, de −12 dB absolutos a −0,7 dB) de modo que bajo la voz queda ≥ 9 LU por debajo de ella, y al acabar su última palabra se APAGA con curva de coseno hasta llegar a cero 2 f antes del final de la pieza, bajo la tarjeta.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { CAIDA_CANCION, FIN_MUSICA_053, FPS_053, INICIO_MUSICA, OBJETIVO_LUFS, frameDeCancion, metraje053 } from "./metraje-053";

/** La voz de la toma a cámara (CT05), derivada del plan de planos. */
export const voces053: readonly TramoAudio[] = vocesDeCortes(metraje053, { fps: FPS_053, objetivoLufs: OBJETIVO_LUFS });

/** La toma del CTA: ahí empieza la tarjeta del cierre. */
const CTA = metraje053.find((c) => c.id === "c09-cta");
if (!CTA || !CTA.voz) throw new Error("audio-053: falta c09-cta (con voz) en metraje-053.ts");
/** El fin de la toma del CTA y la ventana de su voz, en frames de la comp (la misma cuenta que usa la puerta). */
export const FIN_CTA_053 = CTA.en + CTA.dur;
const CTA_VOZ = {
  en: frameDeFuente(CTA.en, CTA.desde, CTA.voz.s0, FPS_053),
  fin: frameDeFuente(CTA.en, CTA.desde, CTA.voz.s1, FPS_053),
};

/* ── La locución en off ───────────────────────────────────────────────────── */

/** Un tramo de voz en off: un `TramoAudio` que además sabe dónde se habla en su fuente. */
export interface TramoOff extends TramoAudio {
  /** Segundos de la FUENTE en que empieza y acaba de hablar (`limites-voz.py`). */
  voz: { s0: number; s1: number };
}

/** Sonoridad medida de la voz en off TRATADA (LUFS, ebur128 sobre `off-voz.wav` en su ventana de voz). */
const LUFS_OFF = -15.0;

/**
 * La locución entera, en un solo tramo: empieza en el f6 (su primera sílaba, a los 0,04 s del archivo, suena en el f7, tras un fundido de 1 f) y acaba antes de que entre el CTA (su última palabra, en el
 * f1586, 18 f antes de la primera del CTA). La pista guía dura 53,02 s; la real se mide con `limites-voz.py` y se rehacen `voz`, `dur` y los cambios de plano de `metraje-053.ts` (`03-timeline.md`).
 */
export const off053: readonly TramoOff[] = [
  {
    id: "off-locucion",
    src: "recorrido-053/off-voz.wav",
    voz: { s0: 0.04, s1: 52.67 },
    en: 6,
    dur: 1588,
    desde: 0,
    ganancia: gananciaHasta(LUFS_OFF, OBJETIVO_LUFS),
    entra: 1,
    sale: 8,
    reason: "La locución del original (el gancho y las cinco frases), con la voz de Isabella o la que entregue el usuario: es la que pone al cliente viviendo ahí.",
  },
];

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la biblioteca de Luxur (el registro de uso dice de dónde sale) y no se
 * ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Softly» en su meseta (ebur128 sobre la fuente, 147,5-195,5 s) y su pico real. */
export const LUFS_MESETA = -11.5;
const PICO_MESETA = -0.2;
/** Mientras habla alguien: la meseta de la canción queda a −26 LUFS, 11 LU bajo la voz de −15. Una sola ganancia lineal para toda la locución: la canción sube sola de la calma a la meseta. */
export const LUFS_MUSICA_BAJO_VOZ = -26;
export const BAJO = gananciaHasta(LUFS_MESETA, LUFS_MUSICA_BAJO_VOZ);
if (20 * Math.log10(BAJO) + PICO_MESETA > -2.5) throw new Error("audio-053: la música pasa del techo de pico");

/**
 * El instante de la canción que cada punto de `CAIDA` toca, y su ganancia en dB ABSOLUTA sobre el archivo: la canción cae de −10,7 LUFS a −23 en 4 s (momentáneos de 400 ms, ebur128), y la ganancia SUBE conforme ella
 * baja para que, con la voz del CTA encima, quede siempre ≈ −25 LUFS hasta que la canción ya está por debajo de eso por su cuenta.
 */
export const CAIDA: readonly (readonly [number, number])[] = [
  [CAIDA_CANCION + 0.4, -12.0], // 196,6 s: la canción ya bajó 3 dB (−13,5 LUFS en 1 s); la voz del CTA empieza a los 196,6 s
  [CAIDA_CANCION + 0.9, -10.1], //  197,1 s
  [CAIDA_CANCION + 1.4, -8.3], //   197,6 s
  [CAIDA_CANCION + 1.9, -6.4], //   198,1 s
  [CAIDA_CANCION + 2.4, -5.1], //   198,6 s
  [CAIDA_CANCION + 2.9, -4.1], //   199,1 s
  [CAIDA_CANCION + 3.4, -2.9], //   199,6 s
  [CAIDA_CANCION + 3.9, -1.6], //   200,1 s
  [CAIDA_CANCION + 4.4, -0.7], //   200,6 s: la canción ya está a −24,8 LUFS y cae sola
];
/** Frames de la entrada de la canción en el f0 (coseno desde 0). */
export const FADE_ENTRADA = 8;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

const dB = (x: number): number => Math.pow(10, x / 20);

/** La envolvente: la entrada, el lecho bajo la locución, la caída de la canción bajo el CTA y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const p: [number, number][] = [
    // ENTRADA: la canción arranca en el f0 ya a su nivel de lecho (la locución empieza en el f7) y llega en 8 f.
    ...fundido(0, FADE_ENTRADA, 0, BAJO),
    // LA LOCUCIÓN Y LA PAUSA HASTA EL CTA: el lecho, constante.
    [CTA_VOZ.en - 6, BAJO],
  ];
  // CTA: la ganancia sigue la caída de la canción (sube conforme ella baja) hasta la última palabra de Isabella (f1687); desde ahí, la que le toca a la canción en ese instante.
  const puntos = CAIDA.map(([t, g]) => [frameDeCancion(t), g] as [number, number]);
  const gEnFin = ((): number => {
    for (let i = 1; i < puntos.length; i++) {
      if (CTA_VOZ.fin <= puntos[i][0]) {
        const [f0, g0] = puntos[i - 1];
        const [f1, g1] = puntos[i];
        return g0 + ((g1 - g0) * (CTA_VOZ.fin - f0)) / (f1 - f0);
      }
    }
    return puntos[puntos.length - 1][1];
  })();
  for (const [f, g] of puntos) if (f < CTA_VOZ.fin) p.push([Math.round(f), dB(g)]);
  // La última palabra del CTA: la canción sigue cayendo sola y se APAGA con curva de coseno hasta cero, 2 f antes del final de la pieza (la tarjeta va en silencio).
  p.push(...fundido(CTA_VOZ.fin, FIN_MUSICA_053 - CTA_VOZ.fin, dB(gEnFin), 0));
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica053: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-053/musica-053.wav",
        en: 0,
        dur: FIN_MUSICA_053,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«Softly» entra en el frame 0 sobre su calma, queda de lecho bajo la locución (y sube sola al entrar su meseta, en el cielo), cae en el f1592 donde entra la voz del CTA y se apaga bajo la tarjeta.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio053: readonly TramoAudio[] = [...voces053, ...off053, ...musica053];
