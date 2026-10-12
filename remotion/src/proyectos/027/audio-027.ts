/**
 * EL SONIDO DEL 027 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK2 (el hook), MD3 (la mitad) y RC14 (el CTA), derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su
 *                imagen, cruce de 6 f cuando disuelve, desclic de 3 f cuando entra a corte, y UNA ganancia por toma hasta `OBJETIVO_LUFS`. El tramo de RC14 del paseo (c03) va MUDO:
 *                no trae `audio` y en esos segundos el clip solo tiene ambiente.
 *   musica       «Ivory Skyline Reverie», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos. No es la de `envolventeBajoVoz`: aquí el golpe en que entra cada toma
 *                (en que acaba su disolvencia) tiene que sonar entero, la música baja con curva DESPUÉS y acaba ANTES de la primera palabra.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente):
 *   voz de Isabella      −17 (revisión 1, «más decibeles sin saturar»: los WAV `-alta` de `normalizar.mjs` ya llegan a −17 con un limitador de picos; −2,0 dBTP; antes, −21)
 *   música SOLA          −15: arriba, en los recorridos
 *   música BAJO LA VOZ   ALTO × 0,16 (−16 dB): la canción mide −10,9 / −13,6 / −16,6 LUFS en las ventanas de voz del hook, la mitad y el CTA (en el CTA ya está cayendo), así que queda a ≈ −30,8 / −33,5 / −36,5 LUFS
 *                        = 13,8 / 16,5 / 19,5 LU por debajo de la voz (con la voz a −21 eran 9,8 / 12,5 / 15,5; la música no se tocó en la revisión 1).
 * La canción mide −11,0 LUFS en los dos recorridos juntos (el paseo, 168,2-177,9 s, a −10,4; el bloque 5, 183,2-192,0 s, a −11,8; la prueba rev. 0 se hizo con −11,5, que contaba también el tramo de la mitad, más bajo,
 * y dejaba el paseo a −13,9), sin crescendo: una sola ganancia (nunca un loudnorm, que le cambiaría la dinámica) la lleva a −15 en los recorridos (−14,4 en el paseo y −15,8 en el bloque 5: la dinámica de la canción).
 * Bajo la voz se mide que quede ≥ 9 LU por debajo, y el oído decide si compite.
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · El HOOK entra a corte en el frame 0 y la música ya baja bajo su voz; la primera palabra suena a los 6,4 f.
 *   · La MITAD entra con una disolvencia que ACABA en el golpe del f442: el golpe suena entero y la música baja con curva de coseno en 7 f; la primera palabra suena a los 14,7 f del golpe.
 *   · El CTA entra con una disolvencia que ACABA en el golpe del f866; su primer sonido suena a los 12,6 f del golpe; la curva baja en 7 f.
 *   · Al acabar la voz la música sube con curva en 24 f, o los que quepan hasta 2 f antes del golpe del plano siguiente (en el hook, 24; en la mitad, 12,6).
 *
 * EL CTA Y LA RESOLUCIÓN. La canción cae SOLA en 194,5 s (f939, a 73 f de la entrada del CTA y con su voz ya empezada): −12,3 → −22,1 LUFS en 5 s y el archivo se acaba a 197,23 s. La voz
 * del CTA acaba en el f1002,5: la música sube entonces a su nivel «solo» en 14 f (lo que queda del fundido final suena a su ganancia) y el archivo se acaba en el f1019, 2 f dentro de la tarjeta: bajo la tarjeta no queda música.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_027, FPS_027, INICIO_MUSICA, OBJETIVO_LUFS, metraje027 } from "./metraje-027";

/** La voz de las tres tomas a cámara (HK2, MD3 y el CTA de RC14), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje027, { fps: FPS_027, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre y la música tiene que estar a su nivel «solo» (la cola de la última nota). */
const CTA = metraje027.find((c) => c.id === "c12-cta");
if (!CTA) throw new Error("audio-027: falta c12-cta en metraje-027.ts");
export const FIN_CTA_027 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number } => {
  const c = metraje027.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-027: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_027);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_027);
  return { en: ini, dur: fin - ini, fin };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la
 * biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Ivory Skyline Reverie» en los dos recorridos juntos (168,18-177,91 s y 183,17-192,04 s, ebur128): lo que suena sola. */
export const LUFS_MESETA = -11.0;
/**
 * La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente, el tramo de la canción que suena mientras ella habla): lo que mide la puerta en lugar de suponer la meseta
 * en todas (la del CTA ya es la caída de la última nota).
 */
export const LUFS_CANCION_EN_VOZ = { "c02-hook": -10.9, "c07-mitad": -13.6, "c12-cta": -16.6 } as const;
/** La música SOLA. */
const OBJETIVO_MUSICA = -15;
/** Ganancia lineal de la música sola: −4,0 dB sobre el archivo. */
const ALTO = gananciaHasta(LUFS_MESETA, OBJETIVO_MUSICA);
/** Mientras habla Isabella: −16 dB más (13,8 LU bajo su voz como mínimo, medido en cada ventana: ver arriba). */
const BAJO = ALTO * 0.16;
/**
 * LOS FUNDIDOS (pedido del usuario en la V6, ya regla del canal: «el sonido cuando cambia a hablar Isabella debe hacer un fade-out / fade-in cuando retome para que no se escuche ahí mismo tan cortado»):
 *   · FADE-OUT de FADE_OUT f desde el golpe en que entra ella (el golpe suena entero y la música baja DESPUÉS, con curva suave): la curva ACABA ANTES de su primera palabra: la mitad, con su disolvencia,
 *     a 14,7 f del golpe, y el CTA, a 12,6 f; el hook ya empieza bajo.
 *   · FADE-IN de FADE_IN f tras su última palabra (con curva suave: sale despacio y acaba deprisa), o los que queden hasta 2 f antes del golpe del plano siguiente (la subida, a medias, falsearía su medida en `golpes-render.py`).
 */
const FADE_OUT = { mitad: 7, cta: 7 } as const;
const FADE_IN = 24;
/** Frames que tarda la música en volver a su nivel «solo» tras la última palabra del CTA (lo que queda de la cola suena a su ganancia). */
const SUBIDA_CTA = 14;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 4 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + (a - de) * (1 - Math.cos(Math.PI * u)) / 2] as [number, number]);

/** La envolvente: el hook, la mitad y el CTA con su fundido, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c02-hook");
  const mitad = ventanaDe("c07-mitad");
  const cta = ventanaDe("c12-cta");
  const mitadPlano = metraje027.find((c) => c.id === "c07-mitad");
  const ctaPlano = metraje027.find((c) => c.id === "c12-cta");
  const paseo = metraje027.find((c) => c.id === "c03-cocina");
  const siguienteALaMitad = metraje027.find((c) => c.id === "c08-alcoba");
  if (!mitadPlano || !ctaPlano || !paseo || !siguienteALaMitad) throw new Error("audio-027: faltan planos en metraje-027.ts");

  const p: [number, number][] = [
    // HOOK: la música suena DESDE EL PRINCIPIO, ya baja bajo la voz (pedido del usuario en la V7: «no lo dejes mudo al principio: que empiece 6 segundos después pero corriendo el audio para que suene desde el principio»).
    // El golpe de entrada de la canción (168,183 s) cae en el f150, donde empieza el paseo, así que en el f0 suena lo que la canción tiene 5,0 s antes de él. 3 f de entrada para no meter un clic; sin golpe en el f0.
    [0, 0],
    [3, BAJO],
    [hook.fin, BAJO],
    // ...y sube con fundido (24 f, o los que quepan) hasta el golpe en que entra el paseo, que suena entero a su nivel «solo».
    ...fundido(hook.fin, Math.min(FADE_IN, paseo.en - hook.fin - 2), BAJO, ALTO),
    // MITAD: el golpe de la disolvencia suena entero y baja con fundido; sube con fundido hasta que el bloque 5 entra con su disolvencia.
    [mitadPlano.en, ALTO],
    ...fundido(mitadPlano.en, FADE_OUT.mitad, ALTO, BAJO),
    [mitad.fin, BAJO],
    ...fundido(mitad.fin, Math.min(FADE_IN, siguienteALaMitad.en - mitad.fin - 2), BAJO, ALTO),
    // CTA: igual...
    [ctaPlano.en, ALTO],
    ...fundido(ctaPlano.en, FADE_OUT.cta, ALTO, BAJO),
    [cta.fin, BAJO],
    // ...y al acabar la voz la música vuelve a su nivel «solo»: el fundido final de la pista ya la apaga, así que lo que suena es su cola.
    ...fundido(cta.fin, Math.min(SUBIDA_CTA, FIN_CTA_027 - cta.fin), BAJO, ALTO),
    // La cola suena a su nivel hasta que acaba la toma y se lleva a cero donde se acaba el archivo (2 f dentro de la tarjeta).
    [FIN_CTA_027, ALTO],
    [FIN_MUSICA_027, 0],
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica027: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-027/musica-027.wav",
        en: 0,
        dur: FIN_MUSICA_027,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«Ivory Skyline Reverie»: el golpe de 17,1 dB del f150 (donde empieza el paseo), un golpe medido en que entra cada plano, y su fundido final a partir del f939 (los 194,5 s de la canción), con la voz del CTA empezada y el archivo acabado 2 f dentro de la tarjeta; baja ≥ 13,8 LU bajo la voz de Isabella en el hook, la mitad y el CTA.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio027: readonly TramoAudio[] = [...vocesTomas, ...musica027];
