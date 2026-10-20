/**
 * EL SONIDO DEL 051 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son DOS cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   voces051    la voz de Isabella en el hook (HK05), derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, desclic de 3 f cuando entra a corte, y UNA ganancia por plano hasta `OBJETIVO_LUFS`
 *               (la de la voz TRATADA: ver `metraje-051.ts`). El hook son DOS planos del mismo clip («Deseas» | «arrendar amoblado en Medellín? Ven, te muestro»).
 *   musica051   «Einaudi Fly», que lleva la pieza: sola a −15 LUFS casi todo el tiempo y baja SOLO bajo el hook.
 *
 * CAMBIO DE ENCARGO (2026-10-20): la réplica va SIN locución en off (la del original no existía como archivo). Las plusvalías que decía la voz se leen en pantalla (`subtitulos-051.ts`), así que la música pesa más y los cambios de plano
 * y de rótulo caen en sus golpes (`metraje-051.ts`).
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente):
 *   voz de Isabella (hook)   −15 (tratada: −15,0 en su ventana de voz)
 *   música SOLA               −15: la canción mide −13,0 LUFS de media en los 49 s que se usan (LRA 3,6 LU, pico −0,6 dBFS) y `ALTO` le pone UNA ganancia de −2,0 dB (la deja a −15,0 de media con el pico a −2,6 dBFS); sube y baja
 *                             lo que sube y baja la canción (de −12 a −15 LUFS), que es lo que la hace música y no un lecho
 *   música BAJO EL HOOK       ≈ −31: 16 LU por debajo de la voz (ALTO × 0,16 = −16 dB)
 * La canción no se normaliza (un loudnorm le cambiaría la dinámica): la ganancia es una constante.
 *
 * LA MÚSICA ENTRA YA BAJO LA VOZ (el hook abre la pieza): suena desde el f0, sube del silencio en 3 f y se queda baja mientras habla Isabella (f7-f131); sube con curva de coseno (18 f) tras su última palabra, a tiempo para que el
 * golpe de 8,8 dB del f149 (217,34 s de la canción: donde entra la cocina) suene entero y a su nivel «solo».
 *
 * EL FINAL. «Einaudi Fly» SÍ tiene final natural: cae de −14 a −30 LUFS entre el 261,0 y el 265 s. `INICIO_MUSICA` está elegido para que esa caída (261,06 s = f1460) caiga sobre la tarjeta del cierre: la música suena a su nivel hasta
 * que acaba la imagen de Isabella (f1386) y se lleva a cero en línea recta 2 f antes del final de la pieza.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { DURACION_051, FIN_MUSICA_051, FPS_051, INICIO_MUSICA_051, OBJETIVO_LUFS, metraje051 } from "./metraje-051";

/** La voz de Isabella en el hook (dos planos de HK05), derivada del plan de planos. */
export const voces051: readonly TramoAudio[] = vocesDeCortes(metraje051, { fps: FPS_051, objetivoLufs: OBJETIVO_LUFS });

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): [number, number] => {
  const c = metraje051.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-051: ${id} no existe o no trae voz`);
  return [frameDeFuente(c.en, c.desde, c.voz.s0, FPS_051), frameDeFuente(c.en, c.desde, c.voz.s1, FPS_051)];
};

/** Todo lo hablado, en frames de la comp [primera palabra, última palabra], por orden: el hook (dos planos). Es contra lo que baja la música. */
export const HABLADO: readonly (readonly [number, number])[] = [ventanaDe("c01-hook-deseas"), ventanaDe("c02-hook-arrendar")];

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con la voz del hook y se publica con un audio de la plataforma encima. La canción es una pista de la biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/**
 * DÓNDE EMPIEZA A SONAR LA CANCIÓN (segundos de `musica-051.wav`): el 212,4333 s (6373/30), un frame entero para que `trimBefore` no lo mueva. De él salen los frames de los golpes (`metraje-051.ts`, `P`) y la caída natural de la canción
 * (261,06 s = f1460), que cae sobre la tarjeta.
 */
export const INICIO_MUSICA = INICIO_MUSICA_051;

/** Sonoridad de «Einaudi Fly» entre los 212,4 y los 261 s (los 49 s que se usan; ebur128 sobre la fuente, LRA 3,6 LU): lo que suena en el recorrido. Pico real −0,6 dBFS. */
export const LUFS_MESETA = -13.0;
/** La música SOLA. */
const OBJETIVO_MUSICA = -15;
/** Ganancia lineal de la música sola: −2,0 dB sobre el archivo (una sola ganancia: la canción conserva su dinámica; el pico queda a −2,6 dBFS). */
export const ALTO = gananciaHasta(LUFS_MESETA, OBJETIVO_MUSICA);
/** Mientras habla Isabella: −16 dB más (≈ 16 LU bajo su voz, medido). */
export const BAJO = ALTO * 0.16;

/** La curva de subida empieza en la última palabra y dura 18 f (acaba en el golpe del f149: 131 + 18); la de bajada, antes de la primera, no hace falta: la música entra ya abajo en el f0. */
const FADE_IN = 18;

/** Un fundido con curva suave (coseno) de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** El fin de la imagen de Isabella en el CTA: ahí empieza la tarjeta del cierre. */
const CTA = metraje051.find((c) => c.id === "c13-cta");
if (!CTA) throw new Error("audio-051: falta c13-cta en metraje-051.ts");
export const FIN_CTA_051 = CTA.en + CTA.dur;

/** La envolvente: la entrada bajo el hook, la subida tras su última palabra y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const ultima = HABLADO[HABLADO.length - 1][1];
  const p: [number, number][] = [
    // ENTRADA: la canción suena DESDE EL PRINCIPIO, ya baja bajo la voz del hook. 3 f de subida del silencio para no meter un clic.
    [0, 0],
    [3, BAJO],
    [ultima, BAJO],
    // SUBIDA con curva (18 f) tras «te muestro», a su nivel «solo» antes del golpe en que entra la cocina.
    ...fundido(ultima, FADE_IN, BAJO, ALTO),
    // …suena a su nivel hasta que acaba la imagen de Isabella y se apaga en línea recta bajo la tarjeta.
    [FIN_CTA_051, ALTO],
    [FIN_MUSICA_051, 0],
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica051: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-051/musica-051.wav",
        en: 0,
        dur: FIN_MUSICA_051,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«Einaudi Fly»: entra baja bajo la voz del hook (desde el f0), sube con curva tras «te muestro», lleva todo el recorrido a −15 LUFS con un golpe medido en cada cambio de plano y de rótulo, y su caída natural cae bajo la tarjeta del cierre.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio051: readonly TramoAudio[] = [...voces051, ...musica051];

/** Para la puerta: la duración de la pieza. */
export const DURACION_AUDIO_051 = DURACION_051;
