/**
 * EL SONIDO DEL 024 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK1, MD2 y CT1 (2.ª frase), derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su
 *                imagen, cruce de 6 f cuando disuelve, desclic de 3 f cuando entra a corte, y una ganancia por toma hasta `OBJETIVO_LUFS` (−15: ya son −15,0, así que 0 dB).
 *                Suena la voz TRATADA (`<toma>-voz.wav`: graves, puerta suave, compresión 3:1, +15 dB y limitador a −2,5 dBFS; ver `OBJETIVO_LUFS` en metraje-024.ts). La de MD2 se apaga 3 f tras su
 *                última palabra: 0,1 s después el micro recoge un golpecito (−32 dBFS crudos) que la compresión subiría a −24.
 *   musica       «Emilio Piano ft. Lucie – Maison», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos y bajo
 *                la tarjeta. No es la de `envolventeBajoVoz`: aquí el golpe en que entra cada toma (a corte, o en que acaba su disolvencia)
 *                tiene que sonar entero, la música baja con curva DESPUÉS y acaba ANTES de la primera palabra.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente):
 *   voz de Isabella      −15 (rev. 1, pedido del usuario: «más decibeles sin saturar»; antes −21). La voz tratada mide −15,0 en las tres tomas con el pico real en −2,5 dBTP
 *   música SOLA          −15: arriba, en los recorridos
 *   música BAJO LA VOZ   ≈ −30,5: ≈ 15 LU por debajo de ella (ALTO × 0,16 = −16 dB; la música no se toca: la voz sube, no la música baja)
 * La canción suena a −17,5 LUFS desde el 142,95 s hasta los 167,3 s (el paseo y los dos recorridos), sin crescendo (−17,0 en las ventanas de voz del hook y de la mitad), así que una sola
 * ganancia (nunca un loudnorm, que le cambiaría la dinámica) la lleva a −15 y la música sola es plana: −15 en todos los recorridos. Bajo la voz se
 * mide que quede ≥ 9 LU por debajo, y el oído decide si compite.
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · El HOOK entra a corte en el frame 0 y la música ya baja bajo su voz; la primera palabra suena a los 6,8 f.
 *   · La MITAD entra con una disolvencia que ACABA en el golpe del f424: el golpe suena entero y la música baja con curva de coseno en 7 f; la primera palabra suena a los 7,5 f del golpe.
 *   · El CTA entra a CORTE en el golpe del f881 y su primera palabra suena 8,6 f después; la curva baja en 7 f.
 *   · Al acabar la voz la música sube con curva en 24 f, o los que quepan hasta 2 f antes del golpe del plano siguiente (en el hook, 16; en la mitad, 16).
 *
 * EL CTA Y LA RESOLUCIÓN. La canción se resuelve SOLA: su última nota (168,5 s) cae a los 36 f de la entrada del CTA (f917) y el piano se apaga a silencio hacia los 171,7 s: −17,6 → −30,1 → silencio en tramos de 5 s. La voz
 * del CTA acaba en el f945: la música sube entonces a su nivel «solo» en 13 f (lo que quede de la cola suena a su ganancia) y se lleva a cero, en línea recta, hasta 2 f antes del final de la pieza.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_024, FPS_024, INICIO_MUSICA, OBJETIVO_LUFS, metraje024 } from "./metraje-024";

/** La voz de las tres tomas a cámara (HK1, MD2 y CT1), derivada del plan de planos. */
/**
 * Frames que la voz de MD2 sigue tras «social.» (4,34 s de su clip) antes de apagarse del todo, en un fundido lineal. A los 4,44-4,50 s el micro recoge un golpecito (−32 dBFS crudos, −24 tratado: unos 9 dB sobre
 * el resto de la cola) que la compresión subiría; la imagen sigue hasta el f560. Las colas de HK1 y de CT1 caen a −43 y −51 dBFS a los 0,1 s y no se tocan.
 */
export const COLA_VOZ_MITAD = 3;

export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje024, { fps: FPS_024, objetivoLufs: OBJETIVO_LUFS }).map((t) => {
  if (t.id !== "voz-c07-mitad") return t;
  const MITAD = metraje024.find((c) => c.id === "c07-mitad");
  if (!MITAD || !MITAD.voz) throw new Error("audio-024: falta c07-mitad (con voz) en metraje-024.ts");
  const fin = frameDeFuente(MITAD.en, MITAD.desde, MITAD.voz.s1, FPS_024) + COLA_VOZ_MITAD;
  return {
    ...t,
    dur: fin - t.en,
    sale: COLA_VOZ_MITAD,
    curvaSale: "lineal" as const,
    reason: `${t.reason} Se apaga en ${COLA_VOZ_MITAD} f tras «social.»: lo que sigue en el micro es un golpecito, no voz.`,
  };
});

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre y la música tiene que estar a su nivel «solo» (la cola de la última nota). */
const CTA = metraje024.find((c) => c.id === "c12-cta");
if (!CTA) throw new Error("audio-024: falta c12-cta en metraje-024.ts");
export const FIN_CTA_024 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number } => {
  const c = metraje024.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-024: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_024);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_024);
  return { en: ini, dur: fin - ini, fin };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la
 * biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Maison» entre el 142,95 y el 167,3 s (ebur128): lo que suena en los recorridos. */
export const LUFS_MESETA = -17.5;
/**
 * La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente, el tramo de la canción que suena mientras ella habla): lo que mide la puerta en lugar de suponer la meseta
 * en todas (la del CTA ya es la caída de la última nota).
 */
export const LUFS_CANCION_EN_VOZ = { "c02-hook": -17.0, "c07-mitad": -17.0, "c12-cta": -21.4 } as const;
/** La música SOLA. */
const OBJETIVO_MUSICA = -15;
/** Ganancia lineal de la música sola: +2,5 dB sobre el archivo. */
const ALTO = gananciaHasta(LUFS_MESETA, OBJETIVO_MUSICA);
/** Mientras habla Isabella: −16 dB más (≈ 9,5 LU bajo su voz). */
const BAJO = ALTO * 0.16;
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
  const mitadPlano = metraje024.find((c) => c.id === "c07-mitad");
  const ctaPlano = metraje024.find((c) => c.id === "c12-cta");
  const paseo = metraje024.find((c) => c.id === "c03-cocina");
  const siguienteALaMitad = metraje024.find((c) => c.id === "c08-pasillo");
  if (!mitadPlano || !ctaPlano || !paseo || !siguienteALaMitad) throw new Error("audio-024: faltan planos en metraje-024.ts");

  const p: [number, number][] = [
    // HOOK: la música suena DESDE EL PRINCIPIO, ya baja bajo la voz (pedido del usuario en la V7: «no lo dejes mudo al principio: que empiece 6 segundos después pero corriendo el audio para que suene desde el principio»).
    // El golpe de entrada de la canción (142,95 s) cae en el f151, donde empieza el paseo, así que en el f0 suena lo que la canción tiene 5,0 s antes de él. 3 f de entrada para no meter un clic; sin golpe en el f0.
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
    ...fundido(cta.fin, Math.min(SUBIDA_CTA, FIN_CTA_024 - cta.fin), BAJO, ALTO),
    // La cola suena a su nivel hasta que acaba la toma y se apaga en línea recta bajo la tarjeta.
    [FIN_CTA_024, ALTO],
    [FIN_MUSICA_024, 0],
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica024: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-024/musica-024.wav",
        en: 0,
        dur: FIN_MUSICA_024,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«Emilio Piano ft. Lucie – Maison»: el golpe de 12,3 dB del f151 (donde empieza el paseo), un golpe medido en que entra cada plano, y su caída final a partir del f917 (los 168,5 s de la canción), con la voz del CTA empezada y la cola apagándose bajo la tarjeta del cierre; baja ≈ 9,5 LU bajo la voz de Isabella en el hook, la mitad y el CTA.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio024: readonly TramoAudio[] = [...vocesTomas, ...musica024];
