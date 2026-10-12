/**
 * EL SONIDO DEL 021 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos
 * pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK06, MD01 y CT02 (solo su segunda mitad), derivada de los cortes
 *                que traen `audio` (`vocesDeCortes`): mismo arranque que su
 *                imagen, cruce de 6 f cuando disuelve, desclic de 3 f cuando sale a corte,
 *                y UNA ganancia por toma hasta `OBJETIVO_LUFS`. La primera toma sale sin
 *                voz: ella no habla hasta que su imagen es opaca.
 *   musica       «Amélie» (piano), con una envolvente que BAJA mientras habla Isabella
 *                y sube en los recorridos y bajo la tarjeta. No es la de `envolventeBajoVoz`: aquí
 *                el golpe en que acaba cada disolvencia tiene que sonar entero y la voz nace 2-3 f después.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente):
 *   voz de Isabella      −21 (sus tomas miden −22,3 · −24,9 · −22,0)
 *   música SOLA          −15: arriba, en los recorridos
 *   música BAJO LA VOZ   −31: ≈ 10 LU por debajo de ella (ALTO × 0,16 = −16 dB)
 * La canción es un piano plano: suena a −17,6 LUFS desde su golpe de entrada (134,97 s) hasta los 175 s (los primeros 40 s de la pieza), sin
 * crescendo, así que una sola ganancia (nunca un loudnorm, que le cambiaría la dinámica) la lleva a −15 y la música sola es plana: −15 en
 * todos los recorridos. Es una pista de piano suelto: bajo la voz se mide que quede ≥ 9 LU por debajo, y el oído decide si compite.
 *
 * LAS RAMPAS DE LA MÚSICA bajo la voz:
 *   · El HOOK abre la pieza (revisión 2: a corte, en el frame 0): el golpe de apertura de la canción (f3, 25,5 dB) suena a su nivel «solo» hasta el f8 y la música baja
 *     en los 10 f siguientes: la primera palabra (f18) nace con ella ya abajo.
 *   · La mitad y el CTA entran con una disolvencia que ACABA en un golpe de la canción (f554, f1162) y su primera palabra
 *     suena 2-3 f después (f556, f1165: `desde` deja ese aire a propósito). La música está a su nivel «solo» hasta el golpe y baja
 *     en esos 2-3 f: el golpe suena entero y la voz nace con la música ya abajo.
 *   · Al acabar la voz, la música vuelve arriba en 12 f (o los que queden hasta el plano siguiente: el hook sale por una disolvencia en el
 *     f166 y la mitad, en el f750).
 *
 * EL CTA Y LA RESOLUCIÓN. A diferencia del 020 (jazz plano que acaba en seco) y como el 018 y el 019, la canción se resuelve SOLA: a los 175 s
 * (f1203, con la voz del CTA a mitad) el piano empieza a decaer —−26,5 LUFS entre el 175 y el 180 y silencio después— y su cola se apaga bajo la
 * tarjeta. La voz del CTA acaba en el f1215: la música sube entonces a su nivel «solo» en 12 f (lo que quede de la cola suena a su ganancia) y
 * se lleva a cero, en línea recta, hasta 2 f antes del final de la pieza.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_021, FPS_021, INICIO_MUSICA, OBJETIVO_LUFS, metraje021 } from "./metraje-021";

/** La voz de las tres tomas a cámara (HK06, MD01 y CT02), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje021, { fps: FPS_021, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre y la música tiene que estar a su nivel «solo» (la cola del piano). */
const CTA = metraje021.find((c) => c.id === "c10-cta");
if (!CTA) throw new Error("audio-021: falta c10-cta en metraje-021.ts");
export const FIN_CTA_021 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number } => {
  const c = metraje021.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-021: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_021);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_021);
  return { en: ini, dur: fin - ini, fin };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma
 * encima. La canción es una pista de la biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Amélie» entre el 135,0 y el 173,0 s (ebur128): lo que suena en los recorridos. */
export const LUFS_MESETA = -17.6;
/** La música SOLA. */
const OBJETIVO_MUSICA = -15;
/** Ganancia lineal de la música sola: +2,6 dB sobre el archivo. */
const ALTO = gananciaHasta(LUFS_MESETA, OBJETIVO_MUSICA);
/** Mientras habla Isabella: −16 dB más (≈ 10 LU bajo su voz). */
const BAJO = ALTO * 0.16;
/** Frames que tarda la música en subir tras la última palabra de la voz (hasta el golpe del plano siguiente, si llega antes). */
const RAMPA = 12;
/** Frames que tarda la música en volver a su nivel «solo» tras la última palabra del CTA (lo que queda de la cola del piano suena a su ganancia). */
const SUBIDA_CTA = 12;

/** La envolvente: el hook, la mitad y el CTA con su rampa, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c02-hook");
  const mitad = ventanaDe("c06-mitad");
  const cta = ventanaDe("c10-cta");
  const hookPlano = metraje021.find((c) => c.id === "c02-hook");
  const mitadPlano = metraje021.find((c) => c.id === "c06-mitad");
  const ctaPlano = metraje021.find((c) => c.id === "c10-cta");
  const piscina = metraje021.find((c) => c.id === "c03-piscina");
  const corredera = metraje021.find((c) => c.id === "c07-corredera");
  if (!hookPlano || !mitadPlano || !ctaPlano || !piscina || !corredera) throw new Error("audio-021: faltan planos en metraje-021.ts");

  const p: [number, number][] = [
    // 1 f de fundido: el colchón de 45 ms que trae `INICIO_MUSICA` antes del golpe, y nada más.
    [0, 0],
    [1, ALTO],
    // HOOK (primer plano, a corte): el golpe de apertura (f3) suena a su nivel «solo» hasta el f8; la música baja hasta la primera palabra (f18) y la voz nace con ella ya abajo.
    [8, ALTO],
    [hook.en, BAJO],
    [hook.fin, BAJO],
    // ...y sube en 12 f hasta que el hook sale por una disolvencia (f166).
    [Math.min(hook.fin + RAMPA, piscina.en), ALTO],
    // MITAD: lo mismo: el golpe de la disolvencia (f554) suena entero y la voz (f556) nace con la música abajo; vuelve a subir hasta que la mitad sale por una disolvencia (f750).
    [mitadPlano.en, ALTO],
    [mitad.en, BAJO],
    [mitad.fin, BAJO],
    [Math.min(mitad.fin + RAMPA, corredera.en), ALTO],
    // CTA: igual (golpe del f1162, voz en el f1165)...
    [ctaPlano.en, ALTO],
    [cta.en, BAJO],
    [cta.fin, BAJO],
    // ...y al acabar la voz (f1215) la música vuelve a su nivel «solo»: el piano ya decae solo (desde el f1203), así que lo que suena es su cola.
    [Math.min(cta.fin + SUBIDA_CTA, FIN_CTA_021), ALTO],
    // La cola suena a su nivel hasta que acaba la toma y se apaga en línea recta bajo la tarjeta.
    [FIN_CTA_021, ALTO],
    [FIN_MUSICA_021, 0],
  ];
  // Las rampas de abajo y de arriba no pueden cruzarse: los puntos tienen que ir en orden.
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica021: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-021/musica-021.wav",
        en: 0,
        dur: FIN_MUSICA_021,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«Amélie» (piano): el golpe de apertura de 25,5 dB en el frame 0, una nota fuerte en que entra cada plano, y su decaimiento natural a partir del f1203 (los 175 s de la canción), con la voz del CTA a mitad y la cola apagándose bajo la tarjeta del cierre; baja ≈ 10 LU bajo la voz de Isabella en el hook, la mitad y el CTA.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio021: readonly TramoAudio[] = [...vocesTomas, ...musica021];
