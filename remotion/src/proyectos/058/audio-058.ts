/**
 * EL SONIDO DEL 058 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK02, MD07 y CT01, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, desclic de 2 f en el hook (entra a corte y su primera sílaba
 *                suena a los 3 f: con los 3 f del defecto la tocaría), cruce de 6 f en la mitad y el CTA (entran disolviendo) y, como el WAV es el TRATADO de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera,
 *                puerta suave, compresor 3,5:1, ganancia y limitador, ya a −15,0 LUFS en su ventana), UNA ganancia de ±0,0 dB.
 *   musica       «Ivory Skyline Reverie», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos. No es la de `envolventeBajoVoz`: la música baja con curva de coseno y ACABA de bajar
 *                antes de la primera palabra de cada toma (regla del canal desde el 022).
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente, `herramientas/lufs-rangos.py`):
 *   voz de Isabella      −15 (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»; sus tomas crudas miden −26,7 · −23,5 · −23,8; tratadas, −15,0 con el pico real a −2,5 dBFS)
 *   música SOLA          −15 por tramos, el nivel de la voz: la canción mide −11,4 en la apertura, −10,8 en el paseo y −12,4 en el bloque 5 (¡con picos de hasta +1,4 dBFS en la fuente!), así que los tres
 *                        tramos bajan 2,6-4,2 dB y ningún pico pasa de −1 dBFS.
 *   música BAJO LA VOZ   −26 en cada ventana de voz: 11 LU por debajo de ella. Con una ganancia fija en cada toma (la canción es una meseta: −11,0 · −11,0 · −11,4 bajo el hook, la mitad y el CTA).
 * Una sola ganancia por tramo, sin `loudnorm` (le cambiaría la dinámica).
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · La APERTURA suena sola con el golpe de entrada en el f3 y el de 14,6 dB del f66; tras él la música baja con curva de coseno en 15 f y ACABA en el f84, donde el hook entra A CORTE. HK02 no deja aire (su
 *     primera sílaba suena a los 3 f del corte), así que no hay golpe que pueda sonar entero con ella encima (declarado, como en el 042: la entrada del hook es un corte seco sin golpe).
 *   · Tras la última palabra del hook (f196) la música sube con curva en 15 f y está arriba en el golpe de 15,8 dB del f215 (el corte seco que abre el paseo).
 *   · La MITAD y el CTA entran disolviendo y sin golpe, igual que el hook: la música baja con curva de coseno tras el último golpe entero (el f475 y el f919) y ACABA en el `en` de su plano, donde suena la primera
 *     palabra (a 0,6 f y a 1 f). Tras la mitad la música sube en 13 f y está arriba en el golpe del f642.
 *
 * EL CTA Y EL CIERRE. Bajo la voz del CTA la canción sigue en su meseta (cae sola a los 194,5 s, f1093: ya fuera de esta pieza) y, al acabar la última palabra (f1044), la música vuelve a su nivel «solo» en 14 f y se
 * APAGA en línea recta hasta llegar a cero en el f1086: la tarjeta va casi en silencio.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes, volumenDe } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_058, FPS_058, INICIO_MUSICA, OBJETIVO_LUFS, metraje058 } from "./metraje-058";

/** Frames de desclic de la voz del hook, que entra a corte y empieza a hablar a los 3 f: 2 f, no los 3 del defecto. */
export const DESCLIC_HOOK = 2;

/** La voz de las tres tomas a cámara (HK02, MD07 y CT01), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje058, { fps: FPS_058, objetivoLufs: OBJETIVO_LUFS, desclic: DESCLIC_HOOK });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre. */
const CTA = metraje058.find((c) => c.id === "c10-cta");
if (!CTA) throw new Error("audio-058: falta c10-cta en metraje-058.ts");
export const FIN_CTA_058 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number; ini: number } => {
  const c = metraje058.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-058: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_058);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_058);
  return { en: ini, dur: fin - ini, fin, ini };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la
 * biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Ivory Skyline Reverie» entre el 158,1 y el 192,8 s (ebur128): lo que suena en la pieza, en promedio. */
export const LUFS_MESETA = -11.4;
/** Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre la fuente): la apertura (158,10-160,37 s), el paseo (165,40-173,80 s) y el bloque 5 (179,60-188,60 s). */
export const LUFS_TRAMO = { apertura: -11.4, paseo: -10.8, bloque5: -12.4 } as const;
/**
 * La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente, el tramo de la canción que suena mientras ella habla): lo que mide la puerta en lugar de suponer la meseta en todas. Hook
 * 160,9-164,6 s, mitad 174,4-178,9 s y CTA 189,2-192,8 s.
 */
export const LUFS_CANCION_EN_VOZ = { "c02-hook": -11.0, "c06-mitad": -11.0, "c10-cta": -11.4 } as const;
/** El pico real de la canción en cada tramo sin voz (ebur128 sobre la fuente, dBFS): con la ganancia de cada tramo ninguno pasa de −1 dBFS (lo comprueba la puerta). */
export const PICO_TRAMO = { apertura: 0.9, paseo: 1.0, bloque5: 1.4 } as const;
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
 *   · FADE-OUT de FADE_OUT f (curva de coseno) que ACABA en el `en` del plano de su toma: la primera palabra suena a 3 f (el hook), 0,6 f (la mitad) y 1 f (el CTA) de ese frame. Empieza 3 f después del último
 *     golpe que suena entero (`previo*`).
 *   · FADE-IN de FADE_IN f tras su última palabra (con curva suave), o los que quepan hasta 2 f antes del golpe del plano siguiente.
 */
export const FADE_OUT = { hook: 15, mitad: 15, cta: 12 } as const;
export const FADE_IN = { hook: 15, mitad: 22 } as const;
/** Frames que tarda la música en volver a su nivel «solo» tras la última palabra del CTA. */
const SUBIDA_CTA = 14;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** La envolvente: la casa sola, el hook, la mitad y el CTA con su fundido, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c02-hook");
  const mitad = ventanaDe("c06-mitad");
  const cta = ventanaDe("c10-cta");
  const hookPlano = metraje058.find((c) => c.id === "c02-hook");
  const paseoPlano = metraje058.find((c) => c.id === "c03-cocina");
  const mitadPlano = metraje058.find((c) => c.id === "c06-mitad");
  const bano1Plano = metraje058.find((c) => c.id === "c07-bano1");
  const ctaPlano = metraje058.find((c) => c.id === "c10-cta");
  if (!hookPlano || !paseoPlano || !mitadPlano || !bano1Plano || !ctaPlano) throw new Error("audio-058: faltan planos en metraje-058.ts");

  const p: [number, number][] = [
    // LA APERTURA: la música sola desde el frame 0 (1 f de entrada para no meter un clic: el golpe de entrada suena en el f3).
    [0, 0],
    [1, ALTOS.apertura],
    // HOOK: el golpe del f66 suena entero y 3 f después (f69 = `en` − 15) la música baja con curva y acaba en el `en` del hook; sube con fundido (los f que quepan) hasta el golpe del plano siguiente.
    ...fundido(hookPlano.en - FADE_OUT.hook, FADE_OUT.hook, ALTOS.apertura, BAJOS["c02-hook"]),
    [hook.fin, BAJOS["c02-hook"]],
    ...fundido(hook.fin, Math.min(FADE_IN.hook, paseoPlano.en - hook.fin - 2), BAJOS["c02-hook"], ALTOS.paseo),
    // MITAD: igual, tras el golpe del f475. Tras ella caben 17 f hasta el golpe del bloque 5: la música sube en 13.
    ...fundido(mitadPlano.en - FADE_OUT.mitad, FADE_OUT.mitad, ALTOS.paseo, BAJOS["c06-mitad"]),
    [mitad.fin, BAJOS["c06-mitad"]],
    ...fundido(mitad.fin, Math.min(FADE_IN.mitad, bano1Plano.en - mitad.fin - 2), BAJOS["c06-mitad"], ALTOS.bloque5),
    // CTA: la bajada igual, tras el golpe del f919...
    ...fundido(ctaPlano.en - FADE_OUT.cta, FADE_OUT.cta, ALTOS.bloque5, BAJOS["c10-cta"]),
    [cta.fin, BAJOS["c10-cta"]],
    // ...y al acabar la voz la música vuelve a su nivel «solo».
    ...fundido(cta.fin, Math.min(SUBIDA_CTA, FIN_CTA_058 - cta.fin), BAJOS["c10-cta"], ALTOS.bloque5),
    // Suena a su nivel hasta que acaba la toma y se apaga en línea recta bajo la tarjeta.
    [FIN_CTA_058, ALTOS.bloque5],
    [FIN_MUSICA_058, 0],
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
  const entero: TramoAudio = { id: "musica", src: "recorrido-058/musica-058.wav", en: 0, dur: fin, desde: INICIO_MUSICA, ganancia: puntos, reason: "" };
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
      src: "recorrido-058/musica-058.wav",
      en: a,
      dur: b - a,
      // El frame de fuente en que arranca este trozo: el de la canción en `a` (INICIO_MUSICA es un número entero de frames).
      desde: INICIO_MUSICA + a / FPS_058,
      ganancia,
      reason:
        i === 0
          ? "«Ivory Skyline Reverie»: el golpe de 18,2 dB del f3 abre la pieza; la música baja con curva antes de cada entrada de Isabella (hook, mitad y CTA) y sube tras su última palabra; cada corte seco cae en un golpe medido; se apaga bajo la tarjeta. Partida en tramos consecutivos de la misma canción: ffmpeg no admite una expresión de volumen con más de ≈ 80 valores distintos."
          : `«Ivory Skyline Reverie», trozo ${i + 1} de ${cortes.length - 1}: sigue donde acabó el anterior (f${a}), la misma muestra de la canción.`,
    };
  });
};

export const musica058: readonly TramoAudio[] = HAY_MUSICA ? trocea(envolvente(), FIN_MUSICA_058) : [];

/** Lo que monta `<PistaAudio>`. */
export const audio058: readonly TramoAudio[] = [...vocesTomas, ...musica058];
