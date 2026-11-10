/**
 * EL SONIDO DEL 068 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK04, MD02 y CT01, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, las tres entran A CORTE (desclic de 2 f: MD02 empieza a hablar a los
 *                0,09 s y el WAV ya trae su propio fundido de 30 ms) y, como el WAV es el TRATADO de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a −15 LUFS
 *                en su ventana), UNA ganancia de ±0,0 dB.
 *   musica       «Heaven on Earth», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos. No es la de `envolventeBajoVoz`: la música baja con curva de coseno y acaba de bajar ANTES de la
 *                primera palabra (regla del canal desde el 022), y bajo el hook, la mitad y el CTA sigue lo que la canción haga (su valle y su fundido final) en vez de fijar una ganancia.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre la fuente, `medir-pista.py` y la sonoridad momentánea de 400 ms):
 *   voz de Isabella      −15 (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»; sus tomas crudas miden −25,2 · −29,8 · −25,2; tratadas, −15,0 con el pico real a −2,5 dBFS)
 *   música SOLA          −15 por tramos, el nivel de la voz: la canción mide −13,3 en la apertura, −15,9 en el paseo (cruza su valle de los 188-192 s) y −13,3 en el bloque 5 (picos de −2,9 dBFS o menos), así que la
 *                        apertura y el bloque 5 BAJAN 1,7 dB y el paseo SUBE 0,9: ningún pico pasa de −2,0 dBFS.
 *   música BAJO LA VOZ   ≈ −26 en cada ventana: 11 LU por debajo de ella. La MITAD, con una ganancia fija (la canción es una meseta ahí: −13,3 → −26 = −12,7 dB); el HOOK y el CTA, con una rampa que sigue la sonoridad
 *                        momentánea de la canción: en el CTA su fundido final baja solo de −13 a −26 LUFS, y la ganancia sube hasta 0 dB para que no desaparezca antes de tiempo.
 * Una sola ganancia por tramo, sin `loudnorm` (le cambiaría la dinámica).
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · La APERTURA suena sola con el golpe de entrada en el f3 y sus notas hasta el f73, donde Isabella entra A CORTE en un golpe de 9,2 dB: el golpe suena ENTERO y la música baja con curva de coseno en 8 f DESPUÉS, hasta
 *     el f81, 3 f antes de la primera palabra (f84).
 *   · Tras la última palabra del hook (f211) la música sube con curva en 13 f y está arriba en el golpe de 8,6 dB del f226 (el corte seco que abre el paseo).
 *   · La MITAD entra A CORTE en un golpe de 13,3 dB (f457) y empieza a hablar a los 3 f: no hay sitio tras el golpe, así que la bajada de 8 f va ANTES (f448-f456) y el golpe suena a su nivel «bajo la voz» (declarado en
 *     la puerta: `golpeEntra: false`). Tras ella la música sube en 11 f y está arriba en el golpe del f652.
 *   · El CTA entra A CORTE en un golpe de 13,9 dB (f875): el golpe suena entero y la bajada de 8 f va DESPUÉS (f875-f883), 11 f antes de la primera palabra (f894).
 *
 * EL CTA Y LA RESOLUCIÓN. La canción se resuelve SOLA: desde los 208,1 s (f905, 11 f tras la primera palabra del CTA) su fundido final la lleva de −14,6 a −26,6 LUFS en 3 s y a −45 dB en 4,7 s. La ganancia sube a 0 dB
 * cuando la canción ya está a −26 y la música se lleva a cero en línea recta hasta el f1008, 2 f antes del último resto de la pista (un golpe de 8,5 dB a −45 dB, f1010); la última palabra (f1038) y la tarjeta van en silencio.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes, volumenDe } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_068, FPS_068, INICIO_MUSICA, OBJETIVO_LUFS, metraje068 } from "./metraje-068";

/** Frames del desclic de la voz contra un corte seco (defecto 3): 2, porque MD02 empieza a hablar a los 0,09 s (2,7 f) y su primera sílaba no puede quedar bajo la rampa. */
export const DESCLIC_HOOK = 2;

/** La voz de las tres tomas a cámara (HK04, MD02 y CT01), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje068, { fps: FPS_068, objetivoLufs: OBJETIVO_LUFS, desclic: DESCLIC_HOOK });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre. */
const CTA = metraje068.find((c) => c.id === "c10-cta");
if (!CTA) throw new Error("audio-068: falta c10-cta en metraje-068.ts");
export const FIN_CTA_068 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number; ini: number } => {
  const c = metraje068.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-068: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_068);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_068);
  return { en: ini, dur: fin - ini, fin, ini };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la
 * biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre la fuente): la apertura (178,0-180,4 s), el paseo (185,5-193,2 s) y el bloque 5 (199,7-207,1 s). */
export const LUFS_TRAMO = { apertura: -13.3, paseo: -15.9, bloque5: -13.3 } as const;
/** El pico real de la canción en cada tramo sin voz (ebur128 sobre la fuente, dBFS): con la ganancia de cada tramo ninguno pasa de −1 dBFS (lo comprueba la puerta). */
export const PICO_TRAMO = { apertura: -2.4, paseo: -2.9, bloque5: -2.7 } as const;
/** La música SOLA: el nivel de la voz. */
const OBJETIVO_MUSICA = -15;
/** Ganancia lineal de la música sola en cada tramo (ver arriba). */
export const ALTOS = {
  apertura: gananciaHasta(LUFS_TRAMO.apertura, OBJETIVO_MUSICA),
  paseo: gananciaHasta(LUFS_TRAMO.paseo, OBJETIVO_MUSICA),
  bloque5: gananciaHasta(LUFS_TRAMO.bloque5, OBJETIVO_MUSICA),
} as const;
/**
 * Mientras habla Isabella: la música baja hasta ≈ −26 LUFS (11 LU bajo su voz de −15). La MITAD tiene una ganancia fija (meseta de −13,3 LUFS en su ventana: −12,7 dB). El HOOK y el CTA siguen la curva de la
 * canción: la sonoridad momentánea (400 ms) bajo cada uno es la de `MOMENTANEA` y la ganancia que la deja en −26 es `−26 − M` (con tope de 0 dB: la música nunca sube sobre el archivo bajo su voz).
 */
export const LUFS_MUSICA_BAJO_VOZ = -26;
const db = (x: number): number => Math.pow(10, x / 20);
/** La sonoridad momentánea de la canción (ebur128, 400 ms; LUFS) en los frames que la puerta y esta envolvente usan de referencia: `heaven-M` del tramo, con la ventana del hook (f84-f211), la mitad (f460-f639) y el CTA (f894-f1038). */
export const MOMENTANEA = {
  hook: [
    [84, -14.6],
    [120, -12.0],
    [150, -12.6],
    [180, -14.7],
    [211, -13.5],
  ],
  mitad: [
    [460, -13.1],
    [500, -13.9],
    [540, -12.6],
    [580, -12.7],
    [620, -14.0],
    [639, -14.1],
  ],
  cta: [
    [894, -13.2],
    [917, -15.0],
    [947, -18.0],
    [977, -21.8],
    [992, -25.7],
    [1008, -29.0],
  ],
} as const;
/** La ganancia (dB, ≤ 0) que deja la música a −26 LUFS con una sonoridad momentánea `m`. */
const bajoDe = (m: number): number => Math.min(0, LUFS_MUSICA_BAJO_VOZ - m);
export const BAJO_MITAD_DB = bajoDe(-13.3); // −12,7 dB: la meseta de la mitad es de −12,5 a −14,1
/**
 * LOS FUNDIDOS (pedido del usuario en la V6, ya regla del canal): FADE-OUT con curva de coseno que ACABA antes de la primera palabra (el hook, a 3 f; la mitad, a 4 f; el CTA, a 11 f) y FADE-IN con curva suave tras su
 * última palabra, o los que quepan hasta 2 f antes del golpe del plano siguiente.
 */
export const FADE_OUT = { hook: 8, mitad: 8, cta: 8 } as const;
export const FADE_IN = { hook: 22, mitad: 22 } as const;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** La envolvente: la apertura sola, el hook, la mitad y el CTA con su fundido, y el apagado final antes de la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c02-hook");
  const mitad = ventanaDe("c06-mitad");
  const hookPlano = metraje068.find((c) => c.id === "c02-hook");
  const caminoPlano = metraje068.find((c) => c.id === "c03-camino");
  const mitadPlano = metraje068.find((c) => c.id === "c06-mitad");
  const montanaPlano = metraje068.find((c) => c.id === "c07-montana");
  const ctaPlano = metraje068.find((c) => c.id === "c10-cta");
  if (!hookPlano || !caminoPlano || !mitadPlano || !montanaPlano || !ctaPlano) throw new Error("audio-068: faltan planos en metraje-068.ts");

  // La bajada del HOOK: a −26 LUFS en cada momento (la canción hace su propio sube y baja de 3 dB).
  const gHook = MOMENTANEA.hook.map(([f, m]) => [f, db(bajoDe(m))] as [number, number]);
  // La bajada del CTA: lo mismo; la canción se resuelve sola y la ganancia llega a 1 cuando ya está a −26.
  const gCta = MOMENTANEA.cta.map(([f, m]) => [f, db(bajoDe(m))] as [number, number]);
  const bajoMitad = db(BAJO_MITAD_DB);

  const p: [number, number][] = [
    // LA APERTURA: la música sola desde el frame 0 (1 f de entrada para no meter un clic: el golpe de entrada suena en el f3).
    [0, 0],
    [1, ALTOS.apertura],
    // HOOK: el golpe de 9,2 dB suena ENTERO (f73) y la música baja con fundido DESPUÉS; acaba 3 f antes de la primera palabra (f84), y sigue la curva de la canción; sube tras la última palabra hasta el golpe del paseo.
    ...fundido(hookPlano.en, FADE_OUT.hook, ALTOS.apertura, gHook[0][1]),
    ...gHook.slice(0, 4),
    ...fundido(hook.fin, Math.min(FADE_IN.hook, caminoPlano.en - hook.fin - 2), gHook[4][1], ALTOS.paseo),
    // MITAD: la primera palabra suena a 3 f del corte: la bajada va ANTES (acaba 1 f antes del golpe) y sube con fundido tras la última palabra (los f que quepan hasta 2 f antes del golpe de la montaña).
    ...fundido(mitadPlano.en - FADE_OUT.mitad - 1, FADE_OUT.mitad, ALTOS.paseo, bajoMitad),
    ...fundido(mitad.fin, Math.min(FADE_IN.mitad, montanaPlano.en - mitad.fin - 2), bajoMitad, ALTOS.bloque5),
    // CTA: el golpe de 13,9 dB suena entero (f875) y la bajada va DESPUÉS (acaba 11 f antes de la primera palabra); la canción cae sola y la ganancia sube a 1 cuando ya está a −26 LUFS.
    ...fundido(ctaPlano.en, FADE_OUT.cta, ALTOS.bloque5, gCta[0][1]),
    ...gCta.slice(0, 5),
    // Y se lleva a cero en línea recta antes del último resto de la pista (el golpe de 8,5 dB del f1010).
    [FIN_MUSICA_068, 0],
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
  const entero: TramoAudio = { id: "musica", src: "recorrido-068/musica-068.wav", en: 0, dur: fin, desde: INICIO_MUSICA, ganancia: puntos, reason: "" };
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
      src: "recorrido-068/musica-068.wav",
      en: a,
      dur: b - a,
      // El frame de fuente en que arranca este trozo: el de la canción en `a` (INICIO_MUSICA es un número entero de frames).
      desde: INICIO_MUSICA + a / FPS_068,
      ganancia,
      reason:
        i === 0
          ? "«Heaven on Earth»: el golpe de 10,2 dB del f3 abre la pieza; la música baja con curva antes de la primera palabra de Isabella en el hook, la mitad y el CTA y sube tras su última palabra; los cortes secos caen en sus golpes; su fundido final natural es la resolución bajo el CTA y se apaga antes del último resto de la pista. Partida en tramos consecutivos de la misma canción: ffmpeg no admite una expresión de volumen con más de ≈ 80 valores distintos."
          : `«Heaven on Earth», trozo ${i + 1} de ${cortes.length - 1}: sigue donde acabó el anterior (f${a}), la misma muestra de la canción.`,
    };
  });
};

export const musica068: readonly TramoAudio[] = HAY_MUSICA ? trocea(envolvente(), FIN_MUSICA_068) : [];

/** Lo que monta `<PistaAudio>`. */
export const audio068: readonly TramoAudio[] = [...vocesTomas, ...musica068];
