/**
 * EL SONIDO DEL 023 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK3, MD3 y CT2, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su
 *                imagen, cruce de 6 f cuando disuelve, desclic de 3 f cuando entra a corte, y UNA ganancia por toma hasta `OBJETIVO_LUFS` (la de la voz TRATADA: ver `metraje-023.ts`).
 *   musica       «Yeshua (Versión Piano)», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos y bajo
 *                la tarjeta. No es la de `envolventeBajoVoz`: aquí el golpe en que entra cada toma (a corte, o en que acaba su disolvencia)
 *                tiene que sonar entero, la música baja con curva DESPUÉS y acaba ANTES de la primera palabra.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente):
 *   voz de Isabella      −15 (tratada: sus tomas miden −15,3 · −14,9 · −14,9; crudas, −22,0 · −21,6 · −19,7)
 *   música SOLA          −15: arriba, en los recorridos
 *   música BAJO LA VOZ   −31: ≈ 16 LU por debajo de ella (ALTO × 0,16 = −16 dB)
 * La canción suena a −14,8 LUFS desde el 419,4 s hasta los 452,0 s (los primeros 33 s de la pieza), sin crescendo, así que una sola
 * ganancia (nunca un loudnorm, que le cambiaría la dinámica) la lleva a −15 y la música sola es plana: −15 en todos los recorridos. Bajo la voz se
 * mide que quede ≥ 9 LU por debajo, y el oído decide si compite.
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · El HOOK entra a corte en el frame 0 y la mitad en el golpe del f546: el golpe suena entero a su nivel «solo» y la música baja con curva de coseno en
 *     9-10 f; la primera palabra suena a los 21,6 y 17,7 f del golpe, con la curva ya acabada.
 *   · El CTA entra con una disolvencia que ACABA en el golpe del f1130 y su primera palabra suena 16,5 f después; la curva baja en 7 f.
 *   · Al acabar la voz la música sube con curva en 24 f, o los que quepan hasta 2 f antes del golpe del plano siguiente (en la mitad, 14).
 *
 * EL CTA Y LA RESOLUCIÓN. La canción se resuelve SOLA: su caída final (la nota de 452,9 s) cae a los 11 f de la entrada del CTA (f1011) y el piano se apaga a silencio hacia los 460 s: −14,5 → −25,2 → −37,4 LUFS en tramos de 5 s. La voz
 * del CTA acaba en el f1112: la música sube entonces a su nivel «solo» en 14 f (lo que quede de la cola suena a su ganancia) y se lleva a cero, en línea recta, hasta 2 f antes del final de la pieza.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_023, FPS_023, INICIO_MUSICA, OBJETIVO_LUFS, metraje023 } from "./metraje-023";

/** La voz de las tres tomas a cámara (HK3, MD3 y CT2), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje023, { fps: FPS_023, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre y la música tiene que estar a su nivel «solo» (la cola del acorde). */
const CTA = metraje023.find((c) => c.id === "c13-cta");
if (!CTA) throw new Error("audio-023: falta c13-cta en metraje-023.ts");
export const FIN_CTA_023 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number } => {
  const c = metraje023.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-023: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_023);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_023);
  return { en: ini, dur: fin - ini, fin };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la
 * biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Yeshua (Versión Piano)» entre el 419,4 y el 452,0 s (ebur128, LRA bajo): lo que suena en los recorridos. */
export const LUFS_MESETA = -14.8;
/** La música SOLA. */
const OBJETIVO_MUSICA = -15;
/** Ganancia lineal de la música sola: −0,9 dB sobre el archivo. */
const ALTO = gananciaHasta(LUFS_MESETA, OBJETIVO_MUSICA);
/** Mientras habla Isabella: −16 dB más (≈ 10 LU bajo su voz). */
const BAJO = ALTO * 0.16;
/**
 * LOS FUNDIDOS (revisión 2, pedido del usuario: «el sonido cuando cambia a hablar Isabella debe hacer un fade-out / fade-in cuando retome para que no se escuche ahí mismo tan cortado»).
 * Antes la música bajaba en 2-3 f (entre el golpe y la primera palabra) y subía en 12: se oía cortada. Ahora:
 *   · FADE-OUT de FADE_OUT f desde el golpe en que entra ella (el golpe suena entero y la música baja DESPUÉS, con curva suave): la curva ACABA ANTES de su primera palabra (revisión 3: el solape de la revisión 2 no gustó):
 *     el hook y la mitad entran a corte con la palabra a 11-13 f del golpe y el CTA, con su disolvencia, a 7,8 f.
 *   · FADE-IN de FADE_IN f tras su última palabra (con curva suave: sale despacio y acaba deprisa), o los que queden hasta 2 f antes del golpe del plano siguiente (la subida, a medias, falsearía su medida en `golpes-render.py`).
 */
/** La curva de bajada tiene que acabar ANTES de la primera palabra (revisión 3): las tres tomas entran de modo que la palabra suene a ≥ FADE_OUT f del golpe (11,4 · 13,2 · 7,8 f). */
const FADE_OUT = { mitad: 10, cta: 7 } as const;
const FADE_IN = 24;
/** Frames que tarda la música en volver a su nivel «solo» tras la última palabra del CTA (lo que queda de la cola del acorde suena a su ganancia). */
const SUBIDA_CTA = 14;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 4 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + (a - de) * (1 - Math.cos(Math.PI * u)) / 2] as [number, number]);

/** La envolvente: el hook, la mitad y el CTA con su fundido, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
    const hook = ventanaDe("c02-hook");
  const mitad = ventanaDe("c07-mitad");
  const cta = ventanaDe("c13-cta");
  const mitadPlano = metraje023.find((c) => c.id === "c07-mitad");
  const ctaPlano = metraje023.find((c) => c.id === "c13-cta");
  const paseo = metraje023.find((c) => c.id === "c03-alcoba");
  const principal = metraje023.find((c) => c.id === "c08-principal");
  if (!mitadPlano || !ctaPlano || !paseo || !principal) throw new Error("audio-023: faltan planos en metraje-023.ts");

  const p: [number, number][] = [
    // HOOK: la música suena DESDE EL PRINCIPIO, ya baja bajo la voz (revisión 1: «no lo dejes mudo al principio: que empiece 6 segundos después pero corriendo el audio para que suene desde el principio»).
    // El golpe de entrada de la canción (185,390 s) cae en el f166, donde empieza el paseo, así que en el f0 suena lo que la canción tiene 5,5 s antes de él. 3 f de entrada para no meter un clic; sin golpe en el f0.
    [0, 0],
    [3, BAJO],
    [hook.fin, BAJO],
    // ...y sube con fundido (24 f, o los que quepan) hasta el golpe en que entra el paseo, que suena entero a su nivel «solo».
    ...fundido(hook.fin, Math.min(FADE_IN, paseo.en - hook.fin - 2), BAJO, ALTO),
    // MITAD: el golpe de la disolvencia suena entero y baja con fundido; sube con fundido hasta que la mitad sale a corte.
    [mitadPlano.en, ALTO],
    ...fundido(mitadPlano.en, FADE_OUT.mitad, ALTO, BAJO),
    [mitad.fin, BAJO],
    ...fundido(mitad.fin, Math.min(FADE_IN, principal.en - mitad.fin - 2), BAJO, ALTO),
    // CTA: igual...
    [ctaPlano.en, ALTO],
    ...fundido(ctaPlano.en, FADE_OUT.cta, ALTO, BAJO),
    [cta.fin, BAJO],
    // ...y al acabar la voz la música vuelve a su nivel «solo»: el acorde ya decae solo, así que lo que suena es su cola.
    ...fundido(cta.fin, Math.min(SUBIDA_CTA, FIN_CTA_023 - cta.fin), BAJO, ALTO),
    // La cola suena a su nivel hasta que acaba la toma y se apaga en línea recta bajo la tarjeta.
    [FIN_CTA_023, ALTO],
    [FIN_MUSICA_023, 0],
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica023: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-023/musica-023.wav",
        en: 0,
        dur: FIN_MUSICA_023,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«Yeshua (Versión Piano)»: el golpe de 11,9 dB del f166 (donde empieza el paseo), un golpe medido en que entra cada plano, y su caída final a partir del f1011 (los 453,0 s de la canción), con la voz del CTA empezada y la cola apagándose bajo la tarjeta del cierre; baja ≈ 10 LU bajo la voz de Isabella en el hook, la mitad y el CTA.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio023: readonly TramoAudio[] = [...vocesTomas, ...musica023];
