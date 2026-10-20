/**
 * EL SONIDO DEL 052 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   voces052   la voz de Isabella en HK04 (el hook) y CT05 (el CTA), derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, desclic de 3 f cuando entra a corte, y UNA ganancia por
 *              toma hasta `OBJETIVO_LUFS` (la de la voz TRATADA: ver `metraje-052.ts`).
 *   musica052  «Here For You (Piano)», con una envolvente que BAJA mientras habla Isabella (con curva, que acaba ANTES de la primera palabra) y sube después y bajo la tarjeta.
 *
 * NO HAY LOCUCIÓN. El original (`02.mp4`) llevaba una voz en off de 67 s; el encargo cambió (2026-10-20) a un guion nuevo EN PANTALLA y la pieza va sin ella. (Se generó una con ElevenLabs antes del cambio: 1.101
 * caracteres, voz de stock «Bella», `proyectos/052/voz/off-guion.txt`; no se usa y sus audios no están en git.) Sin voz que baje la música, **la canción pesa**: suena a su nivel «solo» (−15 LUFS) de principio a fin y
 * solo baja bajo el hook y el CTA.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente):
 *   voz de Isabella      −15 (tratada: −15,0 en su ventana de voz)
 *   música SOLA          −15 (la canción mide −15,0 de media en los 46 s que se usan: plana de los 5 s a los 50 s)
 *   música BAJO LA VOZ   ≈ −28: ≈ 13 LU por debajo de ella (ALTO × 0,22 = −13 dB)
 * La canción es un piano plano y no se normaliza (un loudnorm le cambiaría la dinámica): una sola ganancia la lleva a −15.
 *
 * LAS RAMPAS (la curva debe ser ANTES de que hable, ya regla del canal): bajada de coseno de 10 f que ACABA en la primera palabra. La música ENTRA ya baja bajo el hook (suena desde el f0, 3 f de entrada) y SUBE
 * con curva hasta el golpe de 32,8 dB que abre el primer rótulo (f148): el piano pasa de un lecho casi mudo a la sala entera justo cuando acaba el hook.
 *
 * EL CTA Y LA RESOLUCIÓN. La canción no resuelve sola (piano sin caída): al acabar la voz del CTA la música sube a su nivel «solo» en 14 f, suena así hasta que acaba la toma y se lleva a cero en línea recta bajo la
 * tarjeta, 2 f antes del final de la pieza.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_052, FPS_052, INICIO_MUSICA, OBJETIVO_LUFS, R, metraje052 } from "./metraje-052";

/** La voz de las dos tomas a cámara (HK04 y CT05), derivada del plan de planos. */
export const voces052: readonly TramoAudio[] = vocesDeCortes(metraje052, { fps: FPS_052, objetivoLufs: OBJETIVO_LUFS });

const plano = (id: string) => {
  const c = metraje052.find((x) => x.id === id);
  if (!c) throw new Error(`audio-052: falta ${id} en metraje-052.ts`);
  return c;
};

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number } => {
  const c = plano(id);
  if (!c.voz) throw new Error(`audio-052: ${id} no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_052);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_052);
  return { en: ini, dur: fin - ini, fin };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Here For You» en los 46 s que se usan (desde su segundo 20,8; ebur128, medida con `medir-pista.py`): lo que suena en los rótulos. */
export const LUFS_MESETA = -14.8;
/** La música SOLA. */
const OBJETIVO_MUSICA = -15;
/** Ganancia lineal de la música sola. */
const ALTO = gananciaHasta(LUFS_MESETA, OBJETIVO_MUSICA);
/** Mientras habla Isabella: −13 dB (≈ 13 LU bajo su voz, medido). */
const BAJO = ALTO * 0.22;
/** Frames de la bajada (acaba en la primera palabra). */
const FADE_OUT = 10;
/** Frames que tarda la música en volver a su nivel «solo» tras la última palabra del CTA. */
const SUBIDA_CTA = 14;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/**
 * La envolvente: la música ENTRA ya baja bajo la voz del hook (3 f de entrada para no meter un clic), SUBE con curva hasta su nivel «solo» a tiempo para el golpe del f148 (el que abre el primer rótulo), se queda ahí
 * (los rótulos no hablan) y baja con curva antes de la primera palabra del CTA; tras su última palabra sube en 14 f, suena a su nivel hasta que acaba la toma y se apaga en línea recta bajo la tarjeta.
 */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c01-hook");
  const cta = ventanaDe("c12-cta");
  const ctaPlano = plano("c12-cta");
  const finToma = ctaPlano.en + ctaPlano.dur;
  const p: [number, number][] = [
    [0, 0],
    [3, BAJO],
    [hook.fin, BAJO],
    // …y sube con curva hasta su nivel «solo»: llega entero al golpe del primer rótulo (f148: 32,8 dB).
    ...fundido(hook.fin, R.r1 - 1 - hook.fin, BAJO, ALTO),
    // El CTA: la bajada acaba en su primera palabra.
    ...fundido(cta.en - FADE_OUT, FADE_OUT, ALTO, BAJO),
    [cta.fin, BAJO],
    ...fundido(cta.fin, Math.min(SUBIDA_CTA, finToma - cta.fin), BAJO, ALTO),
    // …suena a su nivel hasta que acaba la toma y se apaga en línea recta bajo la tarjeta.
    [finToma, ALTO],
    [FIN_MUSICA_052, 0],
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica052: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-052/musica-052.wav",
        en: 0,
        dur: FIN_MUSICA_052,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«Here For You (Piano)»: piano casi mudo bajo el hook, el golpe de 32,8 dB (el segundo 25,7 de la canción) cuando entra el primer rótulo, a su nivel (−15 LUFS) bajo todos los rótulos —cada uno en un golpe medido—, baja ≈ 13 LU bajo la voz de Isabella en el hook y el CTA y se apaga en línea recta bajo la tarjeta.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio052: readonly TramoAudio[] = [...voces052, ...musica052];
