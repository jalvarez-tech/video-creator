/**
 * EL SONIDO DEL 062 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK02, MD02 y CT02, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, desclic de 3 f en la del hook (entra a corte), cruce de 6 f en las dos que
 *                entran disolviendo (mitad y CTA) y, como el WAV es el TRATADO de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a −15,0 LUFS en su ventana),
 *                UNA ganancia de ±0,0 dB.
 *   musica       «In This Together», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos. No es la de `envolventeBajoVoz`: aquí el golpe de entrada de cada toma tiene que sonar ENTERO, la música baja
 *                con curva de coseno DESPUÉS y acaba ANTES de la primera palabra (regla del canal desde el 022).
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente, `proyectos/062/medidas/lufs-rangos-cancion.txt`):
 *   voz de Isabella      −15 (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»; sus tomas crudas miden −22,8 · −23,1 · −26,0; tratadas, −15,0 con el pico real a −2,5 dBFS o menos)
 *   música SOLA          −17,2 · −16,4 · −15,0 por tramos (apertura · paseo · estudio): la canción empieza en una INTRO con pulso (−23,2 LUFS en la apertura, −21,4 en el paseo) y crece hasta una meseta (−14,1 en el estudio). La intro
 *                        es muy dinámica (pico a −7,3 y −6,1 dBFS con la media a −23 y −21): llevarla a −15 pondría sus picos a +0,9 y +0,3 dBFS (saturaría), así que se sube lo que el pico permite (+6,0 y +5,0 dB; pico a
 *                        −1,3 y −1,1 dBFS) y queda 2,2 y 1,4 LU por debajo de la voz; el estudio, que ya está en la meseta, baja 0,9 dB. La música SOLA crece como la canción: de −17,2 a −15,0.
 *   música BAJO LA VOZ   −26 en cada ventana de voz: 11 LU por debajo de ella. Con una ganancia fija en cada toma (la canción mide −20,7 · −15,3 · −12,8 LUFS bajo el hook, la mitad y el CTA).
 * Una sola ganancia por tramo, sin `loudnorm` (le cambiaría la dinámica).
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · La APERTURA suena sola con el golpe de entrada en el f3 y su nivel hasta el f95, donde el hook entra A CORTE en un golpe de 13,5 dB: suena entero y la música baja con curva de coseno en 10 f; la primera palabra
 *     suena a los 12,6 f del golpe.
 *   · Tras la última palabra del hook (f217) la música se queda baja 6 f (rev. 2: el usuario oía la voz cortarse) y sube con curva en 15 f: está arriba en el f238, antes del f240 (la disolvencia al jacuzzi acaba sin golpe).
 *   · La MITAD: golpe de 20,2 dB en f483 (la disolvencia que ACABA en él), bajada de 10 f y primera palabra a los 13,8 f del golpe. Tras la mitad caben 17 f hasta el f638: la música sube en 15.
 *   · El CTA entra DISOLVIENDO y acaba en el golpe de 11,3 dB del f934: el golpe suena entero, la música baja en 10 f y la primera palabra suena a los 12,9 f del golpe.
 *
 * EL CTA Y EL CIERRE. La canción NO resuelve sola en esta sección (el fundido de la pista es 160 s más tarde): bajo la voz del CTA queda a −26 LUFS y, al acabar su última palabra (f1071), se APAGA con curva de coseno hasta
 * llegar a cero 2 f antes del final de la pieza, bajo la tarjeta del cierre.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes, volumenDe } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_062, FPS_062, INICIO_MUSICA, OBJETIVO_LUFS, metraje062 } from "./metraje-062";

/** La voz de las tres tomas a cámara (HK02, MD02 y CT02), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje062, { fps: FPS_062, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre; la música sigue apagándose bajo ella. */
const CTA = metraje062.find((c) => c.id === "c10-cta");
if (!CTA) throw new Error("audio-062: falta c10-cta en metraje-062.ts");
export const FIN_CTA_062 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number; ini: number } => {
  const c = metraje062.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-062: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_062);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_062);
  return { en: ini, dur: fin - ini, fin, ini };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la
 * biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «In This Together» entre el 6,9 y el 42,6 s (ebur128): lo que suena en toda la pieza, en promedio (sube de −23 a −13 LUFS: es una intro que crece hasta una meseta). */
export const LUFS_MESETA = -17.5;
/** Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre la fuente): la apertura (6,93-10,0 s), el paseo (14,5-22,9 s) y el estudio (28,2-38,0 s). */
export const LUFS_TRAMO = { apertura: -23.2, paseo: -21.4, bloque5: -14.1 } as const;
/**
 * La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente, el tramo de la canción que suena mientras ella habla): lo que mide la puerta en lugar de suponer la meseta en todas. Hook
 * 10,4-14,4 s, mitad 23,4-27,8 s y CTA 38,4-42,6 s.
 */
export const LUFS_CANCION_EN_VOZ = { "c02-hook": -20.7, "c06-mitad": -15.3, "c10-cta": -12.8 } as const;
/** El pico real de la canción en cada tramo sin voz (ebur128 sobre la fuente, dBFS): con la ganancia de cada tramo ninguno pasa de −1 dBFS (lo comprueba la puerta). */
export const PICO_TRAMO = { apertura: -7.3, paseo: -6.1, bloque5: -2.8 } as const;
/**
 * La música SOLA por tramos. El canal la quiere a −15 LUFS (el nivel de la voz), pero esta canción empieza en una INTRO muy dinámica (la cresta es de 16 dB) y a −15 sus picos pasarían de 0 dBFS: en la
 * apertura y el paseo se sube lo que el pico permite (queda a −1,3 y −1,1 dBFS) y solo el estudio, que ya está en la meseta, llega a −15.
 */
export const OBJETIVO_MUSICA = { apertura: -17.2, paseo: -16.4, bloque5: -15 } as const;
/** Ganancia lineal de la música sola en cada tramo (ver arriba): +6,0 · +5,0 · −0,9 dB. */
export const ALTOS = {
  apertura: gananciaHasta(LUFS_TRAMO.apertura, OBJETIVO_MUSICA.apertura),
  paseo: gananciaHasta(LUFS_TRAMO.paseo, OBJETIVO_MUSICA.paseo),
  bloque5: gananciaHasta(LUFS_TRAMO.bloque5, OBJETIVO_MUSICA.bloque5),
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
export const FADE_IN = { hook: 15, mitad: 22 } as const;
/** Frames que la música se queda BAJA tras la última palabra del hook antes de subir (rev. 2: «la voz se corta muy rápido»; antes subía en cuanto ella acababa). */
export const RETRASO_SUBIDA_HOOK = 6;
/** Hasta dónde se apaga la música tras la última palabra del CTA: 2 f antes del final de la pieza (la tarjeta va en silencio). */
const APAGADO_CTA_HASTA = FIN_MUSICA_062;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** La envolvente: la casa sola, el hook, la mitad y el CTA con su fundido, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c02-hook");
  const mitad = ventanaDe("c06-mitad");
  const cta = ventanaDe("c10-cta");
  const hookPlano = metraje062.find((c) => c.id === "c02-hook");
  const paseoPlano = metraje062.find((c) => c.id === "c03-jacuzzi");
  const mitadPlano = metraje062.find((c) => c.id === "c06-mitad");
  const alcobaPlano = metraje062.find((c) => c.id === "c07-cama");
  const ctaPlano = metraje062.find((c) => c.id === "c10-cta");
  if (!hookPlano || !paseoPlano || !mitadPlano || !alcobaPlano || !ctaPlano) throw new Error("audio-062: faltan planos en metraje-062.ts");

  const p: [number, number][] = [
    // LA APERTURA: la música sola desde el frame 0 (1 f de entrada para no meter un clic: el golpe de entrada suena en el f3).
    [0, 0],
    [1, ALTOS.apertura],
    // HOOK (entra A CORTE): el golpe suena entero y la música baja con fundido DESPUÉS; sube con fundido (los f que quepan) hasta el plano siguiente, que entra disolviendo.
    [hookPlano.en, ALTOS.apertura],
    ...fundido(hookPlano.en, FADE_OUT.hook, ALTOS.apertura, BAJOS["c02-hook"]),
    [hook.fin, BAJOS["c02-hook"]],
    [hook.fin + RETRASO_SUBIDA_HOOK, BAJOS["c02-hook"]],
    ...fundido(hook.fin + RETRASO_SUBIDA_HOOK, Math.min(FADE_IN.hook, paseoPlano.en - (hook.fin + RETRASO_SUBIDA_HOOK) - 2), BAJOS["c02-hook"], ALTOS.paseo),
    // MITAD: igual (la disolvencia ACABA en el golpe). Tras ella caben 17 f hasta el estudio: la música sube en los que quepan.
    [mitadPlano.en, ALTOS.paseo],
    ...fundido(mitadPlano.en, FADE_OUT.mitad, ALTOS.paseo, BAJOS["c06-mitad"]),
    [mitad.fin, BAJOS["c06-mitad"]],
    ...fundido(mitad.fin, Math.min(FADE_IN.mitad, alcobaPlano.en - mitad.fin - 2), BAJOS["c06-mitad"], ALTOS.bloque5),
    // CTA (entra disolviendo y ACABA en el golpe): la bajada igual...
    [ctaPlano.en, ALTOS.bloque5],
    ...fundido(ctaPlano.en, FADE_OUT.cta, ALTOS.bloque5, BAJOS["c10-cta"]),
    [cta.fin, BAJOS["c10-cta"]],
    // ...y al acabar la voz la música se APAGA con curva de coseno hasta cero, 2 f antes del final de la pieza (la tarjeta va en silencio). La canción no resuelve sola en esta sección.
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
  const entero: TramoAudio = { id: "musica", src: "recorrido-062/musica-062.wav", en: 0, dur: fin, desde: INICIO_MUSICA, ganancia: puntos, reason: "" };
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
      src: "recorrido-062/musica-062.wav",
      en: a,
      dur: b - a,
      // El frame de fuente en que arranca este trozo: el de la canción en `a` (INICIO_MUSICA es un número entero de frames).
      desde: INICIO_MUSICA + a / FPS_062,
      ganancia,
      reason:
        i === 0
          ? "«In This Together»: el golpe de 21,1 dB del f3 abre la pieza; la música baja con curva tras el golpe de cada entrada de Isabella (hook, mitad y CTA) y sube tras las dos primeras; cada corte cae en un golpe medido; la canción se apaga con curva bajo la tarjeta tras «…agendemos una visita». Partida en tramos consecutivos de la misma canción: ffmpeg no admite una expresión de volumen con más de ≈ 80 valores distintos."
          : `«In This Together», trozo ${i + 1} de ${cortes.length - 1}: sigue donde acabó el anterior (f${a}), la misma muestra de la canción.`,
    };
  });
};

export const musica062: readonly TramoAudio[] = HAY_MUSICA ? trocea(envolvente(), FIN_MUSICA_062) : [];

/** Lo que monta `<PistaAudio>`. */
export const audio062: readonly TramoAudio[] = [...vocesTomas, ...musica062];
