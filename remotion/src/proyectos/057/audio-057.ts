/**
 * EL SONIDO DEL 057 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK01, MD06 y CT02, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, cruce de 6 f (las tres entran disolviendo) y, como el WAV es el
 *                TRATADO de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a −15,0 LUFS en su ventana), UNA ganancia de ±0,0 dB.
 *   musica       «Silver Skies Cinematic Piano», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos. No es la de `envolventeBajoVoz`: la música baja con curva de coseno y acaba de bajar
 *                ANTES de la primera palabra (regla del canal desde el 022), y bajo el hook y el CTA SIGUE la curva natural de la canción (su respiro y su caída) en vez de fijar una ganancia.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre la fuente, `herramientas/lufs-rangos.py` y la sonoridad momentánea de 400 ms):
 *   voz de Isabella      −15 (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»; sus tomas crudas miden −25,4 · −24,3 · −23,9; tratadas, −15,0 con el pico real a −2,5 dBFS o menos)
 *   música SOLA          −15 por tramos, el nivel de la voz: la canción mide −16,7 en la apertura, −14,1 en el paseo y −13,8 en el bloque 5 (picos de −3,4 dBFS o menos), así que la apertura SUBE 1,7 dB y los otros
 *                        dos tramos bajan 0,9 y 1,2 dB: ningún pico pasa de −3,8 dBFS.
 *   música BAJO LA VOZ   ≈ −26 en cada ventana: 11 LU por debajo de ella. La MITAD, con una ganancia fija (la canción es una meseta ahí: −15,1 → −26 = −10,7 dB); el HOOK, con una rampa, porque ahí la canción se queda
 *                        sola con su respiro (de −20,4 a −29 LUFS en 3 s): se baja lo que haga falta en cada momento para quedar a −26 y no más (−5,6 → −0,9 dB); el CTA, igual: la meseta de los 79,3-80 s (−16,3)
 *                        baja 9,7 dB y, cuando la canción cae sola a su lecho (−23,5 → −27 LUFS desde los 80,5 s), la ganancia sube a 0 dB para que el lecho quede a −26 y no desaparezca.
 * Una sola ganancia por tramo, sin `loudnorm` (le cambiaría la dinámica).
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · La APERTURA suena sola con el golpe de entrada en el f3 y sus notas hasta el f72, donde la disolvencia al HOOK acaba (con piano no pide golpe): la música baja con curva de coseno en 10 f y acaba en el f83, 2 f
 *     antes de la primera palabra (f85).
 *   · Tras la última palabra del hook (f184) la música sube con curva en 22 f y está arriba en el acorde de 17,4 dB del f212 (el corte seco que abre el paseo).
 *   · La MITAD, igual: disolvencia que ACABA en un golpe de 9,1 dB (f460), que suena entero; bajada de 8 f DESPUÉS y primera palabra a los 10 f del golpe (f470). Tras ella la música sube en 22 f y está arriba en el golpe
 *     del f603.
 *   · El CTA: bajada de 10 f que acaba en el f914, 2 f antes de la primera palabra (f916).
 *
 * EL CTA Y LA RESOLUCIÓN. La canción se resuelve SOLA: cae desde los 79,5 s (el f923, 18 f tras la primera palabra del CTA) de −16,9 a −27 LUFS en 2 s y deja un lecho de piano hasta los 82,7 s, donde vuelve a sonar un acorde
 * de 19,5 dB (f1020, el primer fotograma de la tarjeta). La voz del CTA acaba en el f1006: la música se lleva a cero en línea recta hasta el f1018, 2 f antes de ese golpe; la tarjeta va en silencio.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes, volumenDe } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_057, FPS_057, INICIO_MUSICA, OBJETIVO_LUFS, metraje057 } from "./metraje-057";

/** La voz de las tres tomas a cámara (HK01, MD06 y CT02), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje057, { fps: FPS_057, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre. */
const CTA = metraje057.find((c) => c.id === "c10-cta");
if (!CTA) throw new Error("audio-057: falta c10-cta en metraje-057.ts");
export const FIN_CTA_057 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number; ini: number } => {
  const c = metraje057.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-057: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_057);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_057);
  return { en: ini, dur: fin - ini, fin, ini };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la
 * biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre la fuente): la apertura (48,82-51,17 s), el paseo (55,78-64,03 s) y el bloque 5 (68,8-79,0 s). */
export const LUFS_TRAMO = { apertura: -16.7, paseo: -14.1, bloque5: -13.8 } as const;
/** El pico real de la canción en cada tramo sin voz (ebur128 sobre la fuente, dBFS): con la ganancia de cada tramo ninguno pasa de −1 dBFS (lo comprueba la puerta). */
export const PICO_TRAMO = { apertura: -5.5, paseo: -3.4, bloque5: -3.6 } as const;
/** La música SOLA: el nivel de la voz. */
const OBJETIVO_MUSICA = -15;
/** Ganancia lineal de la música sola en cada tramo (ver arriba). */
export const ALTOS = {
  apertura: gananciaHasta(LUFS_TRAMO.apertura, OBJETIVO_MUSICA),
  paseo: gananciaHasta(LUFS_TRAMO.paseo, OBJETIVO_MUSICA),
  bloque5: gananciaHasta(LUFS_TRAMO.bloque5, OBJETIVO_MUSICA),
} as const;
/**
 * Mientras habla Isabella: la música baja hasta ≈ −26 LUFS (11 LU bajo su voz de −15). La MITAD tiene una ganancia fija (meseta de −15,1 LUFS en su ventana: −10,7 dB). El HOOK y el CTA siguen la curva de la
 * canción: la sonoridad momentánea (400 ms) bajo cada uno es la de `MOMENTANEA` y la ganancia que la deja en −26 es `−26 − M` (con tope de 0 dB: la música nunca sube sobre el archivo bajo su voz).
 */
export const LUFS_MUSICA_BAJO_VOZ = -26;
const db = (x: number): number => Math.pow(10, x / 20);
/** La sonoridad momentánea de la canción (ebur128, 400 ms; LUFS) en los frames que la puerta y esta envolvente usan de referencia. */
export const MOMENTANEA = {
  hook: [
    [88, -20.4],
    [124, -21.9],
    [142, -23.9],
    [160, -23.9],
    [178, -29.0],
  ],
  mitad: [
    [484, -15.3],
    [520, -14.8],
    [556, -15.6],
    [574, -15.2],
  ],
  cta: [
    [916, -16.3],
    [934, -16.9],
    [952, -23.5],
    [970, -27.2],
    [1006, -27.2],
  ],
} as const;
/** La ganancia (dB, ≤ 0) que deja la música a −26 LUFS con una sonoridad momentánea `m`. */
const bajoDe = (m: number): number => Math.min(0, LUFS_MUSICA_BAJO_VOZ - m);
export const BAJO_MITAD_DB = -10.7;
export const BAJO_CTA_DB = bajoDe(-16.3); // −9,7 dB: −16,3 → −26,0
/**
 * LOS FUNDIDOS (pedido del usuario en la V6, ya regla del canal): FADE-OUT con curva de coseno que ACABA antes de la primera palabra (el hook, a 2 f; la mitad, a 2 f; el CTA, a 2 f) y FADE-IN con curva suave tras su
 * última palabra, o los que quepan hasta 2 f antes del golpe del plano siguiente.
 */
export const FADE_OUT = { hook: 10, mitad: 8, cta: 10 } as const;
export const FADE_IN = { hook: 22, mitad: 22 } as const;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** La envolvente: la casa sola, el hook, la mitad y el CTA con su fundido, y el apagado final antes de la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c02-hook");
  const mitad = ventanaDe("c06-mitad");
  const cta = ventanaDe("c10-cta");
  const hookPlano = metraje057.find((c) => c.id === "c02-hook");
  const paseoPlano = metraje057.find((c) => c.id === "c03-pasillo");
  const mitadPlano = metraje057.find((c) => c.id === "c06-mitad");
  const alcobaPlano = metraje057.find((c) => c.id === "c07-alcoba");
  const ctaPlano = metraje057.find((c) => c.id === "c10-cta");
  if (!hookPlano || !paseoPlano || !mitadPlano || !alcobaPlano || !ctaPlano) throw new Error("audio-057: faltan planos en metraje-057.ts");

  // La bajada del HOOK: a −26 LUFS en cada momento (la canción ya está bajando: su respiro).
  const gHook = MOMENTANEA.hook.map(([f, m]) => [f, db(bajoDe(m))] as [number, number]);
  const ctaBajo = db(BAJO_CTA_DB);

  const p: [number, number][] = [
    // LA APERTURA: la música sola desde el frame 0 (1 f de entrada para no meter un clic: el golpe de entrada suena en el f3).
    [0, 0],
    [1, ALTOS.apertura],
    // HOOK: baja con fundido desde la disolvencia (f72), acaba 2 f antes de la primera palabra (f85) y sigue la bajada natural de la canción; sube tras la última palabra hasta el acorde del paseo.
    ...fundido(hookPlano.en + 1, FADE_OUT.hook, ALTOS.apertura, gHook[0][1]),
    ...gHook.slice(1, 3),
    ...fundido(hook.fin, Math.min(FADE_IN.hook, paseoPlano.en - hook.fin - 2), db(bajoDe(MOMENTANEA.hook[3][1])), ALTOS.paseo),
    // MITAD: el golpe de la disolvencia suena entero y la música baja con fundido DESPUÉS; sube con fundido tras la última palabra (los f que quepan hasta 2 f antes del golpe de la alcoba).
    ...fundido(mitadPlano.en, FADE_OUT.mitad, ALTOS.paseo, db(BAJO_MITAD_DB)),
    ...fundido(mitad.fin, Math.min(FADE_IN.mitad, alcobaPlano.en - mitad.fin - 2), db(BAJO_MITAD_DB), ALTOS.bloque5),
    // CTA: la bajada acaba 2 f antes de la primera palabra; la canción cae sola y la ganancia sube a 0 dB para que su lecho quede a −26 LUFS.
    ...fundido(ctaPlano.en - 1, FADE_OUT.cta, ALTOS.bloque5, ctaBajo),
    ...fundido(cta.ini + 22, 24, ctaBajo, 1),
    // El lecho suena así hasta la última palabra y se lleva a cero en línea recta antes del acorde de 19,5 dB (f1020).
    [cta.fin, 1],
    [FIN_MUSICA_057, 0],
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
  const entero: TramoAudio = { id: "musica", src: "recorrido-057/musica-057.wav", en: 0, dur: fin, desde: INICIO_MUSICA, ganancia: puntos, reason: "" };
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
      src: "recorrido-057/musica-057.wav",
      en: a,
      dur: b - a,
      // El frame de fuente en que arranca este trozo: el de la canción en `a` (INICIO_MUSICA es un número entero de frames).
      desde: INICIO_MUSICA + a / FPS_057,
      ganancia,
      reason:
        i === 0
          ? "«Silver Skies Cinematic Piano»: el golpe de 9,8 dB del f3 abre la pieza; la música baja con curva antes de la primera palabra de Isabella en el hook, la mitad y el CTA y sube tras su última palabra; el acorde de 17,4 dB abre el paseo; la canción cae sola desde los 79,5 s y se apaga antes de la tarjeta. Partida en tramos consecutivos de la misma canción: ffmpeg no admite una expresión de volumen con más de ≈ 80 valores distintos."
          : `«Silver Skies Cinematic Piano», trozo ${i + 1} de ${cortes.length - 1}: sigue donde acabó el anterior (f${a}), la misma muestra de la canción.`,
    };
  });
};

export const musica057: readonly TramoAudio[] = HAY_MUSICA ? trocea(envolvente(), FIN_MUSICA_057) : [];

/** Lo que monta `<PistaAudio>`. */
export const audio057: readonly TramoAudio[] = [...vocesTomas, ...musica057];
