/**
 * EL SONIDO DEL 061 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK04, MD04 y CT01, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, cruce de 6 f en la que entra disolviendo (la mitad),
 *                desclic de 3 f en las dos que entran a corte (hook y CTA) y, como el WAV es el TRATADO de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador,
 *                ya a −15,0 LUFS en su ventana), UNA ganancia de ±0,0 dB.
 *   musica       «La Isla Bonita (Saxophone 80 Mix)», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos. No es la de `envolventeBajoVoz`: aquí el golpe en que acaba la disolvencia de la
 *                mitad (o en que entra el corte seco del hook y del CTA) tiene que sonar ENTERO, la música baja con curva de coseno DESPUÉS y acaba ANTES de la primera palabra (regla del canal desde el 022).
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente, `proyectos/061/medidas/lufs-rangos-cancion.txt`):
 *   voz de Isabella      −15 (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»; sus tomas crudas miden −26,1 · −28,3 · −26,0; tratadas, −15,0 con el pico real a −2,5 dBFS)
 *   música SOLA          −15 por tramos, el nivel de la voz: la canción mide −13,6 en la apertura, −11,5 en el paseo y −11,2 en el bloque 5 (picos de +0,2 dBFS o menos), así que los tres tramos BAJAN 1,4-3,8 dB y
 *                        ningún pico pasa de −1 dBFS.
 *   música BAJO LA VOZ   −26 en cada ventana de voz: 11 LU por debajo de ella. Con una ganancia fija en cada toma (la canción es una meseta: −14,2 · −11,8 · −10,6 bajo el hook, la mitad y el CTA).
 * Una sola ganancia por tramo, sin `loudnorm` (le cambiaría la dinámica).
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · La APERTURA suena sola con el golpe de entrada en el f3 y su nivel hasta el f73, donde el HOOK entra A CORTE en un golpe de 28,6 dB: suena entero y la música baja con curva de coseno en 10 f; la primera
 *     palabra suena a los 11,4 f del golpe.
 *   · Tras la última palabra del hook (f212,8) la música sube con curva en 12 f y está arriba en el golpe de 20,4 dB del f227 (el corte seco que abre el paseo).
 *   · La MITAD, igual que el hook pero con la disolvencia que ACABA en el golpe (f473): bajada de 10 f y primera palabra a los 12,4 f del golpe. Tras la mitad caben 16 f hasta el golpe del f648: la música sube en 14.
 *   · El CTA entra A CORTE en el golpe de 19,0 dB del f929: el golpe suena entero, la música baja en 10 f y la primera palabra suena a los 11,1 f del golpe.
 *
 * EL CTA Y EL CIERRE. La canción NO resuelve sola en esta sección: bajo la voz del CTA queda a −26 LUFS y, al acabar su última palabra (f1070), se APAGA con curva de coseno hasta llegar a cero 2 f antes del
 * final de la pieza, bajo la tarjeta del cierre.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes, volumenDe } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_061, FPS_061, INICIO_MUSICA, OBJETIVO_LUFS, metraje061 } from "./metraje-061";

/** La voz de las tres tomas a cámara (HK04, MD04 y CT01), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje061, { fps: FPS_061, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre; la música sigue apagándose bajo ella. */
const CTA = metraje061.find((c) => c.id === "c10-cta");
if (!CTA) throw new Error("audio-061: falta c10-cta en metraje-061.ts");
export const FIN_CTA_061 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number; ini: number } => {
  const c = metraje061.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-061: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_061);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_061);
  return { en: ini, dur: fin - ini, fin, ini };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la
 * biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «La Isla Bonita» entre el 15,2 y el 46,1 s (ebur128): lo que suena en toda la pieza, en promedio. */
export const LUFS_MESETA = -12.2;
/** Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre la fuente): la apertura (15,27-17,55 s), el paseo (22,73-30,53 s) y el bloque 5 (36,77-46,13 s). */
export const LUFS_TRAMO = { apertura: -13.6, paseo: -11.5, bloque5: -11.2 } as const;
/**
 * La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente, el tramo de la canción que suena mientras ella habla): lo que mide la puerta en lugar de suponer la meseta en todas. Hook
 * 17,98-22,26 s, mitad 31,35-36,23 s y CTA 46,50-50,83 s.
 */
export const LUFS_CANCION_EN_VOZ = { "c02-hook": -14.2, "c06-mitad": -11.8, "c10-cta": -10.6 } as const;
/** El pico real de la canción en cada tramo sin voz (ebur128 sobre la fuente, dBFS): con la ganancia de cada tramo ninguno pasa de −1 dBFS (lo comprueba la puerta). */
export const PICO_TRAMO = { apertura: 0.1, paseo: 0.2, bloque5: 0.0 } as const;
/** La música SOLA: el nivel de la voz. */
const OBJETIVO_MUSICA = -15;
/** Ganancia lineal de la música sola en cada tramo (ver arriba). */
export const ALTOS = {
  apertura: gananciaHasta(LUFS_TRAMO.apertura, OBJETIVO_MUSICA),
  paseo: gananciaHasta(LUFS_TRAMO.paseo, OBJETIVO_MUSICA),
  bloque5: gananciaHasta(LUFS_TRAMO.bloque5, OBJETIVO_MUSICA),
} as const;
/**
 * Mientras habla Isabella: la música baja hasta −26 LUFS EN CADA VENTANA (11 LU bajo su voz de −15). La ganancia absoluta que deja cada ventana en −26 es la de `gananciaHasta`.
 */
export const LUFS_MUSICA_BAJO_VOZ = -26;
export const BAJOS = {
  "c02-hook": gananciaHasta(LUFS_CANCION_EN_VOZ["c02-hook"], LUFS_MUSICA_BAJO_VOZ),
  "c06-mitad": gananciaHasta(LUFS_CANCION_EN_VOZ["c06-mitad"], LUFS_MUSICA_BAJO_VOZ),
  "c10-cta": gananciaHasta(LUFS_CANCION_EN_VOZ["c10-cta"], LUFS_MUSICA_BAJO_VOZ),
} as const;
/**
 * LOS FUNDIDOS (pedido del usuario en la V6, ya regla del canal: «el sonido cuando cambia a hablar Isabella debe hacer un fade-out / fade-in … para que no se escuche ahí mismo tan cortado»):
 *   · FADE-OUT de FADE_OUT f desde el golpe en que acaba la disolvencia de su toma (el golpe suena entero y la música baja DESPUÉS, con curva de coseno): la curva ACABA antes de su primera palabra: el hook, a 1,4 f; la
 *     mitad, a 2,4 f; el CTA, a 0,8 f.
 *   · FADE-IN de FADE_IN f tras su última palabra (con curva suave), o los que quepan hasta 2 f antes del golpe del plano siguiente.
 */
export const FADE_OUT = { hook: 10, mitad: 10, cta: 10 } as const;
export const FADE_IN = { hook: 15, mitad: 22 } as const; // tope: se recortan a los f que caben hasta 2 f antes del golpe siguiente (12 tras el hook, 14 tras la mitad)
/** Hasta dónde se apaga la música tras la última palabra del CTA: 2 f antes del final de la pieza (la tarjeta va en silencio). */
const APAGADO_CTA_HASTA = FIN_MUSICA_061;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** La envolvente: la casa sola, el hook, la mitad y el CTA con su fundido, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c02-hook");
  const mitad = ventanaDe("c06-mitad");
  const cta = ventanaDe("c10-cta");
  const hookPlano = metraje061.find((c) => c.id === "c02-hook");
  const paseoPlano = metraje061.find((c) => c.id === "c03-cocina");
  const mitadPlano = metraje061.find((c) => c.id === "c06-mitad");
  const alcobaPlano = metraje061.find((c) => c.id === "c07-sofa");
  const ctaPlano = metraje061.find((c) => c.id === "c10-cta");
  if (!hookPlano || !paseoPlano || !mitadPlano || !alcobaPlano || !ctaPlano) throw new Error("audio-061: faltan planos en metraje-061.ts");

  const p: [number, number][] = [
    // LA APERTURA: la música sola desde el frame 0 (1 f de entrada para no meter un clic: el golpe de entrada suena en el f3).
    [0, 0],
    [1, ALTOS.apertura],
    // HOOK: el golpe de la disolvencia suena entero y la música baja con fundido DESPUÉS; sube con fundido (los f que quepan) hasta el golpe del plano siguiente.
    [hookPlano.en, ALTOS.apertura],
    ...fundido(hookPlano.en, FADE_OUT.hook, ALTOS.apertura, BAJOS["c02-hook"]),
    [hook.fin, BAJOS["c02-hook"]],
    ...fundido(hook.fin, Math.min(FADE_IN.hook, paseoPlano.en - hook.fin - 2), BAJOS["c02-hook"], ALTOS.paseo),
    // MITAD: igual. Tras ella caben 25 f hasta el golpe del bloque 5: la música sube en 22.
    [mitadPlano.en, ALTOS.paseo],
    ...fundido(mitadPlano.en, FADE_OUT.mitad, ALTOS.paseo, BAJOS["c06-mitad"]),
    [mitad.fin, BAJOS["c06-mitad"]],
    ...fundido(mitad.fin, Math.min(FADE_IN.mitad, alcobaPlano.en - mitad.fin - 2), BAJOS["c06-mitad"], ALTOS.bloque5),
    // CTA: la bajada igual...
    [ctaPlano.en, ALTOS.bloque5],
    ...fundido(ctaPlano.en, FADE_OUT.cta, ALTOS.bloque5, BAJOS["c10-cta"]),
    [cta.fin, BAJOS["c10-cta"]],
    // ...y al acabar la voz la música se APAGA con curva de coseno hasta cero, 2 f antes del final de la pieza (la tarjeta va en silencio). La canción es plana y no resuelve sola.
    ...fundido(cta.fin, APAGADO_CTA_HASTA - cta.fin, BAJOS["c10-cta"], 0),
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

/**
 * Remotion le pasa el volumen a ffmpeg como UNA expresión `if(between(t,…),valor,if(…))` con un `if` por cada valor distinto de la ganancia (a 3 decimales), y ffmpeg no admite más de ≈ 80 `if`
 * anidados («Missing ')' or too many args»). Una envolvente con rampas largas se PARTE en tramos de la misma canción, consecutivos y sin solape (cada uno empieza en el frame de fuente en que acabó el anterior:
 * es la misma muestra), cada uno con ≤ `MAX_VALORES` cambios de valor.
 */
const MAX_VALORES = 60;

/** La envolvente `puntos` (frames absolutos de la comp) partida en tramos consecutivos de la canción, cada uno con su trozo de envolvente. */
const trocea = (puntos: [number, number][], fin: number): TramoAudio[] => {
  const entero: TramoAudio = { id: "musica", src: "recorrido-061/musica-061.wav", en: 0, dur: fin, desde: INICIO_MUSICA, ganancia: puntos, reason: "" };
  const v = (f: number): number => volumenDe(entero, f);
  const redondea = (x: number): number => Math.round(x * 1000) / 1000;
  // Los cortes: donde se juntan MAX_VALORES cambios de valor desde el corte anterior.
  const cortes = [0];
  let cambios = 0;
  let ultimo = redondea(v(0));
  for (let f = 1; f < fin; f++) {
    const x = redondea(v(f));
    if (x !== ultimo) {
      cambios++;
      ultimo = x;
    }
    if (cambios >= MAX_VALORES) {
      cortes.push(f);
      cambios = 0;
    }
  }
  cortes.push(fin);
  return cortes.slice(0, -1).map((a, i) => {
    const b = cortes[i + 1];
    const interior = puntos.filter(([f]) => f > a && f < b);
    const ganancia: [number, number][] = [[a, v(a)], ...interior, [b, v(b)]];
    return {
      id: `musica-${i + 1}`,
      src: "recorrido-061/musica-061.wav",
      en: a,
      dur: b - a,
      // El frame de fuente en que arranca este trozo: el de la canción en `a` (INICIO_MUSICA es un número entero de frames).
      desde: INICIO_MUSICA + a / FPS_061,
      ganancia,
      reason:
        i === 0
          ? "«La Isla Bonita (Saxophone 80 Mix)»: el golpe de 21,1 dB del f3 abre la pieza; la música baja con curva tras el golpe de cada entrada de Isabella (hook, mitad y CTA) y sube tras las dos primeras; cada corte cae en un golpe medido; la canción es plana y se apaga con curva bajo la tarjeta tras «…o presencial». Partida en tramos consecutivos de la misma canción: ffmpeg no admite una expresión de volumen con más de ≈ 80 valores distintos."
          : `«La Isla Bonita», trozo ${i + 1} de ${cortes.length - 1}: sigue donde acabó el anterior (f${a}), la misma muestra de la canción.`,
    };
  });
};

export const musica061: readonly TramoAudio[] = HAY_MUSICA ? trocea(envolvente(), FIN_MUSICA_061) : [];

/** Lo que monta `<PistaAudio>`. */
export const audio061: readonly TramoAudio[] = [...vocesTomas, ...musica061];
