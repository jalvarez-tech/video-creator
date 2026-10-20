/**
 * EL SONIDO DEL 050 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK02, MD04 y CT02, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su
 *                imagen, desclic de 3 f cuando entra a corte, y UNA ganancia por toma hasta `OBJETIVO_LUFS` (la de la voz TRATADA: ver `metraje-050.ts`).
 *   musica       «Spring is Coming», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos y bajo la tarjeta. Aquí el golpe en que
 *                entra cada toma (a corte) tiene que sonar entero, la música baja con curva DESPUÉS y acaba ANTES de la primera palabra.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente):
 *   voz de Isabella      −15 (tratada: −15,0 en su ventana de voz; cruda, −19,4 · −23,3 · −20,5)
 *   música SOLA          −15: arriba, en los recorridos (la canción mide −15,0 de media en los 36,5 s que se usan: −16,4 bajo el hook, −14,9 en el paseo de la unidad y −15,1 en el del apartamento)
 *   música BAJO LA VOZ   ≈ −31: ≈ 16 LU por debajo de ella (ALTO × 0,16 = −16 dB)
 * La canción es plana (sin crescendo ni caída: −15,1 LUFS de media) y no se normaliza (un loudnorm le cambiaría la dinámica): una sola ganancia la lleva a −15 y la música sola es plana en todos los recorridos.
 * Bajo la voz se mide que quede ≥ 9 LU por debajo, y el oído decide si compite.
 *
 * LA MÚSICA ENTRA YA BAJO SU VOZ (el hook abre la pieza, por encargo): suena desde el f0, sube del silencio en 3 f (sin golpe en el f0: el golpe del f204 es el «drop» del paseo) y se queda baja hasta que
 * acaba el hook; sube entonces con curva hasta el «drop», que suena entero a su nivel «solo».
 *
 * LAS RAMPAS DE LA MÚSICA (la curva debe ser ANTES de que hable, ya regla del canal):
 *   · La MITAD entra a corte en el golpe del f442: el golpe suena entero a su nivel «solo» y la música baja con curva de coseno en 10 f; la primera palabra suena a los 11 f del golpe, con la curva ya acabada.
 *     El CTA, igual (curva de 10 f; su primera palabra, a los 14 f).
 *   · Al acabar la voz la música sube con curva en 24 f, o los que quepan hasta 2 f antes del golpe del plano siguiente (en el hook 15 f, en la mitad 7: «o los que quepan», como el 023).
 *
 * EL CTA Y LA RESOLUCIÓN. La canción NO resuelve sola (plana, sin caída): al acabar la voz del CTA la música sube a su nivel «solo» en 14 f, suena así hasta que acaba la toma y se lleva a cero en línea recta
 * bajo la tarjeta, 2 f antes del final de la pieza (como el 043, que también usó una canción plana).
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_050, FPS_050, INICIO_MUSICA, OBJETIVO_LUFS, metraje050 } from "./metraje-050";

/** La voz de las tres tomas a cámara (HK02, MD04 y CT02), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje050, { fps: FPS_050, objetivoLufs: OBJETIVO_LUFS });

const plano = (id: string) => {
  const c = metraje050.find((x) => x.id === id);
  if (!c) throw new Error(`audio-050: falta ${id} en metraje-050.ts`);
  return c;
};

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre y la música tiene que estar a su nivel «solo», apagándose desde aquí. */
const CTA = plano("c11-cta");
export const FIN_CTA_050 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number } => {
  const c = plano(id);
  if (!c.voz) throw new Error(`audio-050: ${id} no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_050);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_050);
  return { en: ini, dur: fin - ini, fin };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la
 * biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Spring is Coming» entre los 34,1 y los 69,6 s (los 35 s que se usan; ebur128, LRA 2,8 LU): lo que suena en los recorridos. */
export const LUFS_MESETA = -15.0;
/** La música SOLA. */
const OBJETIVO_MUSICA = -15;
/** Ganancia lineal de la música sola: 0 dB sobre el archivo (la canción es plana, una sola ganancia). */
const ALTO = gananciaHasta(LUFS_MESETA, OBJETIVO_MUSICA);
/** Mientras habla Isabella: −16 dB más (≈ 14 LU bajo su voz, medido). */
const BAJO = ALTO * 0.16;
/** La curva de bajada tiene que acabar ANTES de la primera palabra: la mitad suena a 11 f del golpe y el CTA, a 14 f; la curva dura 10. */
const FADE_OUT = { mitad: 10, cta: 10 } as const;
const FADE_IN = 24;
/** Frames que tarda la música en volver a su nivel «solo» tras la última palabra del CTA. */
const SUBIDA_CTA = 14;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** La envolvente: el hook, la mitad y el CTA con su fundido, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c01-hook");
  const mitad = ventanaDe("c05-mitad");
  const cta = ventanaDe("c11-cta");
  const paseo = plano("c02-piscina");
  const mitadPlano = plano("c05-mitad");
  const sala = plano("c06-sala");
  const ctaPlano = plano("c11-cta");

  const p: [number, number][] = [
    // HOOK: la música suena DESDE EL PRINCIPIO, ya baja bajo la voz. 3 f de entrada para no meter un clic; sin golpe en el f0.
    [0, 0],
    [3, BAJO],
    [hook.fin, BAJO],
    // ...y sube con fundido (24 f, o los que quepan) hasta el golpe en que entra el paseo, que suena entero a su nivel «solo».
    ...fundido(hook.fin, Math.min(FADE_IN, paseo.en - hook.fin - 2), BAJO, ALTO),
    // MITAD: el golpe de su entrada suena entero y baja con fundido; sube con fundido hasta que la mitad sale a corte.
    [mitadPlano.en, ALTO],
    ...fundido(mitadPlano.en, FADE_OUT.mitad, ALTO, BAJO),
    [mitad.fin, BAJO],
    ...fundido(mitad.fin, Math.min(FADE_IN, sala.en - mitad.fin - 2), BAJO, ALTO),
    // CTA: igual...
    [ctaPlano.en, ALTO],
    ...fundido(ctaPlano.en, FADE_OUT.cta, ALTO, BAJO),
    [cta.fin, BAJO],
    // ...y al acabar la voz la música vuelve a su nivel «solo» y suena así hasta que acaba la toma.
    ...fundido(cta.fin, Math.min(SUBIDA_CTA, FIN_CTA_050 - cta.fin), BAJO, ALTO),
    // …y se apaga en línea recta bajo la tarjeta.
    [FIN_CTA_050, ALTO],
    [FIN_MUSICA_050, 0],
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica050: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-050/musica-050.wav",
        en: 0,
        dur: FIN_MUSICA_050,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«Spring is Coming»: ya suena baja bajo la voz del hook (desde el f0), un golpe medido en que entra cada plano (el «drop» de 16,5 dB del f204 abre el paseo), baja ≈ 14 LU bajo la voz de Isabella en el hook, la mitad y el CTA y se apaga en línea recta bajo la tarjeta del cierre.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio050: readonly TramoAudio[] = [...vocesTomas, ...musica050];
