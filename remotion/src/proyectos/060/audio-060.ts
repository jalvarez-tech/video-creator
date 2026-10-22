/**
 * EL SONIDO DEL 060 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK03, MD05 y CT03, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, cruce de 6 f en las tres (entran disolviendo) y, como el WAV es el
 *                TRATADO de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a −15,0 LUFS en su ventana), UNA ganancia de ±0,0 dB.
 *   musica       «Street Level Sessions on the Green», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos. No es la de `envolventeBajoVoz`: aquí el golpe de cada entrada de Isabella tiene que
 *                sonar ENTERO, la música baja con curva de coseno DESPUÉS y acaba ANTES de la primera palabra (regla del canal desde el 022).
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente, `proyectos/060/medidas/lufs-rangos-cancion.txt`):
 *   voz de Isabella      −15 (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»; sus tomas crudas miden −24,1 · −22,2 · −22,9; tratadas, −15,0 con el pico real a −2,5 dBFS o menos)
 *   música SOLA          −15 por tramos, el nivel de la voz: la canción mide −11,4 en la apertura, −10,7 en el paseo y −10,1 en el bloque 5 (picos de hasta +0,8 dBFS en la fuente), así que los tres tramos BAJAN
 *                        3,6-4,9 dB y ningún pico pasa de −3 dBFS.
 *   música BAJO LA VOZ   −26 en cada ventana de voz: 11 LU por debajo de ella. Con una ganancia fija en cada toma (la canción es una meseta: −11,7 · −9,8 · −13,6 bajo el hook, la mitad y el CTA).
 * Una sola ganancia por tramo, sin `loudnorm` (le cambiaría la dinámica).
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · La APERTURA suena sola con el golpe de entrada en el f3 y su nivel hasta el f88, donde el golpe de 15,5 dB cruza la disolvencia al HOOK: suena entero y la música baja con curva de coseno en 10 f; la primera
 *     palabra suena a los 11,2 f del golpe (7,2 f del `en` de la toma, que acaba 4 f después del golpe).
 *   · Tras la última palabra del hook (f317,6) la música sube con curva en 12 f y está arriba en el golpe de 20,4 dB del f332 (el corte seco que abre el paseo).
 *   · La MITAD, igual que el hook: golpe en f619 (la disolvencia que ACABA en él), bajada de 10 f y primera palabra a los 12,3 f del golpe. Tras ella caben solo 6 f hasta el golpe del f876 (el clip de MEDIO7 deja 0,3 s tras «cómo»): la música
 *     empieza a subir en cuanto acaba y sube en 8 f, así que el golpe suena a −1,4 dB de su nivel.
 *   · El CTA entra DISOLVIENDO y acaba en el f1422, un frame LIBRE (la canción no tiene golpes ≥ 10 dB entre los 197,7 y los 204,8 s; rev. 2): la música baja con curva en 10 f desde ahí y la primera palabra suena a los 12,8 f.
 *
 * EL CTA Y EL CIERRE. Bajo la voz del CTA la música queda a −26 LUFS (la canción empieza a apagarse sola hacia los 205 s: −15,5 LUFS en esa ventana) y, al acabar su última palabra (f1575), se APAGA con curva de coseno hasta llegar a
 * cero 2 f antes del final de la pieza (f1640), bajo la tarjeta del cierre.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes, volumenDe } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_060, FPS_060, GOLPE, INICIO_MUSICA, OBJETIVO_LUFS, golpe, metraje060 } from "./metraje-060";

/** La voz de las tres tomas a cámara (HK03, MD05 y CT03), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje060, { fps: FPS_060, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre; la música sigue apagándose bajo ella. */
const CTA = metraje060.find((c) => c.id === "c10-cta");
if (!CTA) throw new Error("audio-060: falta c10-cta en metraje-060.ts");
export const FIN_CTA_060 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number; ini: number } => {
  const c = metraje060.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-060: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_060);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_060);
  return { en: ini, dur: fin - ini, fin, ini };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la
 * biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Street Level Sessions on the Green» entre el 154,6 y el 209,3 s (ebur128): lo que suena en toda la pieza, en promedio. */
export const LUFS_MESETA = -11.0;
/** Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre la fuente): la apertura (154,65-157,40 s), el paseo (165,65-175,05 s) y el bloque 5 —la infografía y la vista— (183,80-201,90 s). */
export const LUFS_TRAMO = { apertura: -11.4, paseo: -10.7, bloque5: -10.8 } as const;
/**
 * La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente, el tramo de la canción que suena mientras ella habla): lo que mide la puerta en lugar de suponer la meseta en todas. Hook
 * 157,9-165,2 s, mitad 175,6-183,4 s y CTA 202,4-207,1 s (el principio del apagado natural de la canción).
 */
export const LUFS_CANCION_EN_VOZ = { "c02-hook": -11.7, "c06-mitad": -9.8, "c10-cta": -15.5 } as const;
/** El pico real de la canción en cada tramo sin voz (ebur128 sobre la fuente, dBFS): con la ganancia de cada tramo ninguno pasa de −1 dBFS (lo comprueba la puerta). */
export const PICO_TRAMO = { apertura: 0.0, paseo: 0.8, bloque5: 0.4 } as const;
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
export const FADE_IN = { hook: 15, mitad: 8 } as const; // el del hook se recorta a lo que quepa hasta 2 f antes del golpe del plano siguiente; el de la mitad NO cabe (6 f de aire): empieza al acabar ella y el golpe suena ya casi arriba
/** El frame del golpe que cruza la disolvencia al hook: la bajada de la música empieza AHÍ y no en el `en` de la toma (que acaba 4 f después). */
const GOLPE_HOOK = golpe(GOLPE.hook);
/** Hasta dónde se apaga la música tras la última palabra del CTA: 2 f antes del final de la pieza (la tarjeta va en silencio). */
const APAGADO_CTA_HASTA = FIN_MUSICA_060;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** La envolvente: la casa sola, el hook, la mitad y el CTA con su fundido, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c02-hook");
  const mitad = ventanaDe("c06-mitad");
  const cta = ventanaDe("c10-cta");
  const hookPlano = metraje060.find((c) => c.id === "c02-hook");
  const paseoPlano = metraje060.find((c) => c.id === "c03-bano");
  const mitadPlano = metraje060.find((c) => c.id === "c06-mitad");
  const alcobaPlano = metraje060.find((c) => c.id === "c07-cama");
  const ctaPlano = metraje060.find((c) => c.id === "c10-cta");
  if (!hookPlano || !paseoPlano || !mitadPlano || !alcobaPlano || !ctaPlano) throw new Error("audio-060: faltan planos en metraje-060.ts");

  const p: [number, number][] = [
    // LA APERTURA: la música sola desde el frame 0 (1 f de entrada para no meter un clic: el golpe de entrada suena en el f3).
    [0, 0],
    [1, ALTOS.apertura],
    // HOOK: el golpe de la disolvencia suena entero y la música baja con fundido DESPUÉS; sube con fundido (los f que quepan) hasta el golpe del plano siguiente.
    [GOLPE_HOOK, ALTOS.apertura],
    ...fundido(GOLPE_HOOK, FADE_OUT.hook, ALTOS.apertura, BAJOS["c02-hook"]),
    [hook.fin, BAJOS["c02-hook"]],
    ...fundido(hook.fin, Math.min(FADE_IN.hook, paseoPlano.en - hook.fin - 2), BAJOS["c02-hook"], ALTOS.paseo),
    // MITAD: igual. Tras ella caben solo 6 f hasta el golpe del bloque 5 (el clip no deja más): la música sube en 8, ya cruzando el golpe.
    [mitadPlano.en, ALTOS.paseo],
    ...fundido(mitadPlano.en, FADE_OUT.mitad, ALTOS.paseo, BAJOS["c06-mitad"]),
    [mitad.fin, BAJOS["c06-mitad"]],
    ...fundido(mitad.fin, FADE_IN.mitad, BAJOS["c06-mitad"], ALTOS.bloque5),
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
  const entero: TramoAudio = { id: "musica", src: "recorrido-060/musica-060.wav", en: 0, dur: fin, desde: INICIO_MUSICA, ganancia: puntos, reason: "" };
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
      src: "recorrido-060/musica-060.wav",
      en: a,
      dur: b - a,
      // El frame de fuente en que arranca este trozo: el de la canción en `a` (INICIO_MUSICA es un número entero de frames).
      desde: INICIO_MUSICA + a / FPS_060,
      ganancia,
      reason:
        i === 0
          ? "«Street Level Sessions on the Green»: el golpe de 16,4 dB del f3 abre la pieza; la música baja con curva tras el golpe de cada entrada de Isabella (hook, mitad y CTA) y sube tras las dos primeras; cada corte cae en un golpe medido; la canción no resuelve sola y se apaga con curva bajo la tarjeta tras «…un mensaje». Partida en tramos consecutivos de la misma canción: ffmpeg no admite una expresión de volumen con más de ≈ 80 valores distintos."
          : `«Street Level Sessions on the Green», trozo ${i + 1} de ${cortes.length - 1}: sigue donde acabó el anterior (f${a}), la misma muestra de la canción.`,
    };
  });
};

export const musica060: readonly TramoAudio[] = HAY_MUSICA ? trocea(envolvente(), FIN_MUSICA_060) : [];

/** Lo que monta `<PistaAudio>`. */
export const audio060: readonly TramoAudio[] = [...vocesTomas, ...musica060];
