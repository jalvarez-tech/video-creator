/**
 * EL SONIDO DEL 022 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK2, MD1 y CT1, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su
 *                imagen, cruce de 6 f cuando disuelve, desclic de 3 f cuando entra a corte, y UNA ganancia por toma hasta `OBJETIVO_LUFS`.
 *                La primera toma (el ventanal de RC13) sale sin voz: ella no habla hasta que su imagen es opaca.
 *   musica       «Some Say» (Nea, versión acústica), con una envolvente que BAJA mientras habla Isabella y sube en los recorridos y bajo
 *                la tarjeta. No es la de `envolventeBajoVoz`: aquí el golpe en que acaba cada disolvencia (o en que entra a corte el hook)
 *                tiene que sonar entero y la voz nace 2-3 f después.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente):
 *   voz de Isabella      −21 (sus tomas miden −18,7 · −23,3 · −22,3)
 *   música SOLA          −15: arriba, en los recorridos
 *   música BAJO LA VOZ   −31: ≈ 10 LU por debajo de ella (ALTO × 0,16 = −16 dB)
 * La canción suena a −14,1 LUFS desde su golpe de entrada (139,05 s) hasta los 175 s (los primeros 36 s de la pieza), sin crescendo, así que una sola
 * ganancia (nunca un loudnorm, que le cambiaría la dinámica) la lleva a −15 y la música sola es plana: −15 en todos los recorridos. Bajo la voz se
 * mide que quede ≥ 9 LU por debajo, y el oído decide si compite.
 *
 * LAS RAMPAS DE LA MÚSICA bajo la voz:
 *   · El HOOK entra a corte en el golpe del f54: suena entero a su nivel «solo» y baja en los 3 f hasta su primera palabra (f57): la voz nace con la
 *     música ya abajo. Al acabar la voz (f167) la música vuelve arriba en 8 f, hasta el golpe del f175 (el paseo, 21,9 dB).
 *   · La mitad y el CTA entran con una disolvencia que ACABA en un golpe de la canción (f568, f1083) y su primera palabra suena 2-3 f después
 *     (f570, f1086: `desde` deja ese aire a propósito). La música está a su nivel «solo» hasta el golpe y baja en esos 2-3 f.
 *   · Al acabar la voz, la música vuelve arriba en 12 f (o los que queden hasta el plano siguiente: la mitad sale a corte en el f758).
 *
 * EL CTA Y LA RESOLUCIÓN. La canción se resuelve SOLA, como el 018, el 019 y el 021: a los 175,5 s (f1097, con la voz del CTA empezada) suena su
 * acorde final y cae ≈ 13,5 dB en 1,5 s y a silencio hacia los 184 s. La voz del CTA acaba en el f1227: la música sube entonces a su nivel «solo» en
 * 12 f (lo que quede de la cola suena a su ganancia) y se lleva a cero, en línea recta, hasta 2 f antes del final de la pieza.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_022, FPS_022, INICIO_MUSICA, OBJETIVO_LUFS, metraje022 } from "./metraje-022";

/** La voz de las tres tomas a cámara (HK2, MD1 y CT1), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje022, { fps: FPS_022, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre y la música tiene que estar a su nivel «solo» (la cola del acorde). */
const CTA = metraje022.find((c) => c.id === "c11-cta");
if (!CTA) throw new Error("audio-022: falta c11-cta en metraje-022.ts");
export const FIN_CTA_022 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number } => {
  const c = metraje022.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-022: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_022);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_022);
  return { en: ini, dur: fin - ini, fin };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la
 * biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Some Say» entre el 139,0 y el 174,9 s (ebur128): lo que suena en los recorridos. */
export const LUFS_MESETA = -14.1;
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
const FADE_OUT = { hook: 9, mitad: 10, cta: 7 } as const;
const FADE_IN = 24;
/** Frames que tarda la música en volver a su nivel «solo» tras la última palabra del CTA (lo que queda de la cola del acorde suena a su ganancia). */
const SUBIDA_CTA = FADE_IN;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 4 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + (a - de) * (1 - Math.cos(Math.PI * u)) / 2] as [number, number]);

/** La envolvente: el hook, la mitad y el CTA con su fundido, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c02-hook");
  const mitad = ventanaDe("c06-mitad");
  const cta = ventanaDe("c11-cta");
  const hookPlano = metraje022.find((c) => c.id === "c02-hook");
  const mitadPlano = metraje022.find((c) => c.id === "c06-mitad");
  const ctaPlano = metraje022.find((c) => c.id === "c11-cta");
  const paseo = metraje022.find((c) => c.id === "c03-cocina");
  const principal = metraje022.find((c) => c.id === "c07-principal");
  if (!hookPlano || !mitadPlano || !ctaPlano || !paseo || !principal) throw new Error("audio-022: faltan planos en metraje-022.ts");

  const p: [number, number][] = [
    // 1 f de fundido: el colchón de 45 ms que trae `INICIO_MUSICA` antes del golpe, y nada más.
    [0, 0],
    [1, ALTO],
    // HOOK (abre la pieza, a corte en el f0): el golpe de entrada de la canción suena en el f1 a su nivel «solo» y la música baja con fundido, que acaba en el f10, ANTES de su primera palabra (f11,4).
    ...fundido(1, FADE_OUT.hook, ALTO, BAJO),
    [hook.fin, BAJO],
    // ...y sube con fundido hasta el golpe en que entra el paseo.
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
    ...fundido(cta.fin, Math.min(SUBIDA_CTA, FIN_CTA_022 - cta.fin), BAJO, ALTO),
    // La cola suena a su nivel hasta que acaba la toma y se apaga en línea recta bajo la tarjeta.
    [FIN_CTA_022, ALTO],
    [FIN_MUSICA_022, 0],
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica022: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-022/musica-022.wav",
        en: 0,
        dur: FIN_MUSICA_022,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«Some Say» (versión acústica de Nea): el golpe de apertura de 28,9 dB en el frame 0, un golpe fuerte en que entra cada plano, y su acorde final a partir del f1097 (los 175,5 s de la canción), con la voz del CTA empezada y la cola apagándose bajo la tarjeta del cierre; baja ≈ 10 LU bajo la voz de Isabella en el hook, la mitad y el CTA.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio022: readonly TramoAudio[] = [...vocesTomas, ...musica022];
