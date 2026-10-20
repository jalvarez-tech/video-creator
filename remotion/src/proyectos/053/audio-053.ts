/**
 * EL SONIDO DEL 053 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   voces053   la voz de Isabella en la ÚNICA toma que habla (CT05, el CTA), derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, cruce de voz de 6 f (entra con una disolvencia) y, como el WAV
 *              es el TRATADO de `normalizar.mjs` (`ct05-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a ≈ −15 LUFS en su ventana), UNA ganancia de ±0,1 dB.
 *   musica053  «Softly», con una envolvente que la deja ARRIBA casi toda la pieza (no hay voz que la baje) y la baja, con curva, bajo la voz del CTA.
 *
 * **NO HAY VOZ EN OFF** (cambio de encargo del 2026-10-20, reparto §5): lo que decía la locución del original lo dicen los rótulos (`subtitulos-053.ts`). La música pesa más que en las piezas con locución: es la que lleva el ritmo.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente, `herramientas/lufs-rangos.py`):
 *   voz de Isabella   −15 (pedido del usuario: «la voz a −15 LUFS sin saturar»)
 *   música SOLA       una ganancia constante (`ALTO`, −2,1 dB): la canción cae a −24 LUFS en su calma (el gancho) y a −14,4 en su tramo fuerte; con la ganancia, el tramo fuerte queda a −16,5 LUFS y el pico real a −2,5 dBFS (el techo).
 *                     El objetivo del canal es −15 sola; aquí el pico manda (la canción llega a −0,4 dBFS y a −15 saldría a −1,0).
 *   música BAJO VOZ   −26 LUFS durante la voz del CTA: 11 LU por debajo de ella (`BAJO`).
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · ENTRADA: la canción arranca en el f0 con un fundido de coseno de 8 f.
 *   · BAJADA ANTES DE LA VOZ DEL CTA: la toma entra en el GOLPE de 87,3 s (f1199, 10,5 dB), que suena entero; la bajada, de coseno, va DESPUÉS (empieza 4 f tras el golpe) y ACABA 4 f antes de la primera palabra (f1214).
 *   · SUBIDA TRAS LA VOZ: de coseno, 24 f desde su última palabra (f1297), y de ahí la música se APAGA bajo la tarjeta del cierre con otra curva de coseno hasta llegar a cero 2 f antes del final de la pieza.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_053, FPS_053, GOLPES, INICIO_MUSICA, OBJETIVO_LUFS, frameDeCancion, metraje053 } from "./metraje-053";

/** La voz de la toma a cámara (CT05), derivada del plan de planos. */
export const voces053: readonly TramoAudio[] = vocesDeCortes(metraje053, { fps: FPS_053, objetivoLufs: OBJETIVO_LUFS });

/** La toma del CTA y la ventana de su voz, en frames de la comp (la misma cuenta que usa la puerta). */
const CTA = metraje053.find((c) => c.id === "c09-cta");
if (!CTA || !CTA.voz) throw new Error("audio-053: falta c09-cta (con voz) en metraje-053.ts");
/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre. */
export const FIN_CTA_053 = CTA.en + CTA.dur;
const CTA_VOZ = {
  en: frameDeFuente(CTA.en, CTA.desde, CTA.voz.s0, FPS_053),
  fin: frameDeFuente(CTA.en, CTA.desde, CTA.voz.s1, FPS_053),
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la biblioteca de Luxur (el registro de uso dice de dónde sale) y no se
 * ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Softly» en su tramo fuerte (ebur128 sobre la fuente, 51,5-87,3 s) y su pico real. */
export const LUFS_FUERTE = -14.4;
const PICO_FUERTE = -0.4;
/** El pico real de la música nunca pasa de este techo (dBFS), como en el 047. */
const TECHO_PICO = -2.5;
/** El nivel de la música SOLA (LUFS), el del canal; el pico manda si no cabe. */
const OBJETIVO_MUSICA_SOLA = -15;
/** Ganancia lineal de la música sola: a su objetivo, sin pasar de `TECHO_PICO`. */
export const ALTO = Math.min(gananciaHasta(LUFS_FUERTE, OBJETIVO_MUSICA_SOLA), Math.pow(10, (TECHO_PICO - PICO_FUERTE) / 20));
/** La sonoridad de la canción mientras habla Isabella en el CTA (ebur128 a 1 s sobre la fuente, 87,8-90,5 s: −12,6) y a la que la música baja: −26 LUFS, 11 LU bajo su voz de −15. */
export const LUFS_CANCION_EN_VOZ = -12.6;
export const LUFS_MUSICA_BAJO_VOZ = -26;
export const BAJO = gananciaHasta(LUFS_CANCION_EN_VOZ, LUFS_MUSICA_BAJO_VOZ);

/**
 * LOS FUNDIDOS (pedido del usuario en la V6, ya regla del canal: «el sonido cuando cambia a hablar Isabella debe hacer un fade-out / fade-in … para que no se escuche tan cortado»):
 *   · FADE-OUT de coseno: la curva ACABA `ANTES_DE_HABLAR` f antes de su primera palabra y empieza `DESPUES_DEL_GOLPE` f después del golpe en que entra su toma.
 *   · FADE-IN de FADE_IN f tras su última palabra.
 */
export const ANTES_DE_HABLAR = 4;
export const DESPUES_DEL_GOLPE = 4;
export const FADE_IN = 24;
/** Frames de la entrada de la canción en el f0 (coseno desde 0). */
export const FADE_ENTRADA = 8;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** El frame en que empieza la bajada: 4 f después de que suene el golpe en que entra la toma del CTA. */
export const INICIO_BAJADA = Math.round(frameDeCancion(GOLPES.cta.t)) + DESPUES_DEL_GOLPE;

/** La envolvente: la entrada, la música arriba casi toda la pieza, la bajada bajo la voz del CTA y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const p: [number, number][] = [
    // ENTRADA: la canción arranca en el f0 y llega a su nivel en 8 f.
    ...fundido(0, FADE_ENTRADA, 0, ALTO),
    // El plano del CTA entra en el golpe de 87,3 s: la música sigue arriba hasta que suena entero y baja DESPUÉS, con curva, para acabar ANTES de la primera palabra.
    [INICIO_BAJADA, ALTO],
    ...fundido(INICIO_BAJADA, CTA_VOZ.en - ANTES_DE_HABLAR - INICIO_BAJADA, ALTO, BAJO),
    // Durante la voz: abajo. Tras la última palabra: sube con curva y, desde ahí, se APAGA con otra curva hasta cero, 2 f antes del final de la pieza (la tarjeta va en silencio).
    [CTA_VOZ.fin, BAJO],
    ...fundido(CTA_VOZ.fin, FADE_IN, BAJO, ALTO),
    ...fundido(CTA_VOZ.fin + FADE_IN, FIN_MUSICA_053 - (CTA_VOZ.fin + FADE_IN), ALTO, 0),
  ];
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
          "«Softly» entra en el frame 0 sobre su calma, su golpe de entrada (50,93 s) cae en el cambio del gancho al cielo (f108), cada cambio de rótulo cae en un golpe medido, baja tras el golpe en que entra la toma del CTA y se apaga bajo la tarjeta.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio053: readonly TramoAudio[] = [...voces053, ...musica053];
