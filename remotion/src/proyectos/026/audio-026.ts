/**
 * EL SONIDO DEL 026 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en RC14 (el hook y el CTA: el MISMO WAV tratado, dos tramos 38 s aparte) y en MD2, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su
 *                imagen, cruce de 6 f cuando disuelve, desclic de 3 f cuando entra a corte, y UNA ganancia por toma hasta `OBJETIVO_LUFS`.
 *   musica       «ByErik – desolate (Slowed)», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos y bajo
 *                la tarjeta. No es la de `envolventeBajoVoz`: aquí el golpe en que entra cada toma (a corte, o en que acaba su disolvencia)
 *                tiene que sonar entero, la música baja con curva DESPUÉS y acaba ANTES de la primera palabra.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente):
 *   voz de Isabella      −15 (rev. 1: la voz TRATADA `<toma>-voz.wav` mide −15,1 · −14,6 · −14,4; en la rev. 0 iba a −21 sin tratar)
 *   música SOLA          −15: arriba, en los recorridos
 *   música BAJO LA VOZ   ALTO × 0,15 (−16,5 dB): la canción mide −9,8 / −10,8 / −13,1 LUFS en las ventanas de voz del hook, la mitad y el CTA, así que queda a −30,5 / −31,5 / −33,8 LUFS
 *                        = 15,5 / 16,5 / 18,8 LU por debajo de la voz (rev. 0, con la voz a −21: 9,5 / 10,5 / 12,8). La música no se tocó en la rev. 1. Con el −16 dB nominal (0,16) el hook daba 8,9 LU (la canción suena 1 dB más fuerte en su ventana que en la meseta): se bajó a 0,15, declarado.
 * La canción suena a −10,8 LUFS desde el 86,6 s hasta los 115,1 s (el paseo y los dos recorridos), sin crescendo, así que una sola
 * ganancia (nunca un loudnorm, que le cambiaría la dinámica) la lleva a −15 y la música sola es plana: −15 en todos los recorridos. Bajo la voz se
 * mide que quede ≥ 9 LU por debajo, y el oído decide si compite.
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · El HOOK entra a corte en el frame 0 y la música ya baja bajo su voz; la primera palabra suena a los 6,5 f.
 *   · La MITAD entra con una disolvencia que ACABA en el golpe del f533: el golpe suena entero y la música baja con curva de coseno en 7 f; la primera palabra suena a los 7,5 f del golpe.
 *   · El CTA entra con una disolvencia que ACABA en el golpe del f1023 (el de la V8 entraba a corte); su primera sílaba suena a los 12,5 f del golpe; la curva baja en 7 f.
 *   · Al acabar la voz la música sube con curva en 24 f, o los que quepan hasta 2 f antes del golpe del plano siguiente (en el hook, 24; en la mitad, 21).
 *
 * EL CTA Y LA RESOLUCIÓN. La canción cae SOLA en 118,0 s (f1110, a 87 f de la entrada del CTA y con su voz ya empezada): −11,6 → −20,8 → −31,8 LUFS en tramos de 5 s, y sus últimas notas se apagan hasta los 126 s. La voz
 * del CTA acaba en el f1159,5: la música sube entonces a su nivel «solo» en 14 f (lo que quede de la cola suena a su ganancia) y se lleva a cero, en línea recta, hasta 2 f antes de la nota fuerte siguiente (120,691 s = f1190): bajo la tarjeta no queda música.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_026, FPS_026, INICIO_MUSICA, OBJETIVO_LUFS, metraje026 } from "./metraje-026";

/** La voz de las tres tomas a cámara (el hook y el CTA de RC14, y MD2), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje026, { fps: FPS_026, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre y la música tiene que estar a su nivel «solo» (la cola de la última nota). */
const CTA = metraje026.find((c) => c.id === "c12-cta");
if (!CTA) throw new Error("audio-026: falta c12-cta en metraje-026.ts");
export const FIN_CTA_026 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number } => {
  const c = metraje026.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-026: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_026);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_026);
  return { en: ini, dur: fin - ini, fin };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la
 * biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «desolate» entre el 86,6 y el 115,1 s (ebur128): lo que suena en los recorridos. */
export const LUFS_MESETA = -10.8;
/**
 * La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente, el tramo de la canción que suena mientras ella habla): lo que mide la puerta en lugar de suponer la meseta
 * en todas (la del CTA ya es la caída de la última nota).
 */
export const LUFS_CANCION_EN_VOZ = { "c02-hook": -9.8, "c07-mitad": -10.8, "c12-cta": -13.1 } as const;
/** La música SOLA. */
const OBJETIVO_MUSICA = -15;
/** Ganancia lineal de la música sola: −4,2 dB sobre el archivo. */
const ALTO = gananciaHasta(LUFS_MESETA, OBJETIVO_MUSICA);
/** Mientras habla Isabella: −16,5 dB más (9,5 LU bajo su voz como mínimo: ver arriba por qué no −16). */
const BAJO = ALTO * 0.15;
/**
 * LOS FUNDIDOS (pedido del usuario en la V6, ya regla del canal: «el sonido cuando cambia a hablar Isabella debe hacer un fade-out / fade-in cuando retome para que no se escuche ahí mismo tan cortado»):
 *   · FADE-OUT de FADE_OUT f desde el golpe en que entra ella (el golpe suena entero y la música baja DESPUÉS, con curva suave): la curva ACABA ANTES de su primera palabra: la mitad, con su disolvencia,
 *     a 7,5 f del golpe, y el CTA, a corte, a 8,6 f; el hook ya empieza bajo.
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
  const mitadPlano = metraje026.find((c) => c.id === "c07-mitad");
  const ctaPlano = metraje026.find((c) => c.id === "c12-cta");
  const paseo = metraje026.find((c) => c.id === "c03-cocina");
  const siguienteALaMitad = metraje026.find((c) => c.id === "c08-puertas");
  if (!mitadPlano || !ctaPlano || !paseo || !siguienteALaMitad) throw new Error("audio-026: faltan planos en metraje-026.ts");

  const p: [number, number][] = [
    // HOOK: la música suena DESDE EL PRINCIPIO, ya baja bajo la voz (pedido del usuario en la V7: «no lo dejes mudo al principio: que empiece 6 segundos después pero corriendo el audio para que suene desde el principio»).
    // El golpe de entrada de la canción (86,626 s) cae en el f168, donde empieza el paseo, así que en el f0 suena lo que la canción tiene 5,6 s antes de él. 3 f de entrada para no meter un clic; sin golpe en el f0.
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
    // ...y al acabar la voz la música vuelve a su nivel «solo»: la última nota ya decae sola, así que lo que suena es su cola.
    ...fundido(cta.fin, Math.min(SUBIDA_CTA, FIN_CTA_026 - cta.fin), BAJO, ALTO),
    // La cola suena a su nivel hasta que acaba la toma y se apaga en línea recta, ya bajo la tarjeta, antes de la nota fuerte siguiente.
    [FIN_CTA_026, ALTO],
    [FIN_MUSICA_026, 0],
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica026: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-026/musica-026.wav",
        en: 0,
        dur: FIN_MUSICA_026,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«ByErik – desolate (Slowed)»: el golpe de 14,3 dB del f168 (donde empieza el paseo), un golpe medido en que entra cada plano, y su caída a partir del f1110 (los 118,0 s de la canción), con la voz del CTA empezada y la cola cortada antes de la tarjeta; baja ≥ 9,5 LU bajo la voz de Isabella en el hook, la mitad y el CTA.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio026: readonly TramoAudio[] = [...vocesTomas, ...musica026];
