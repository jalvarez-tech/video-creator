/**
 * EL SONIDO DEL 054 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK01, MD04 y CT06, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, desclic de 3 f (las tres entran a corte y su primera sílaba
 *                suena 8 f después) y, como el WAV es el TRATADO de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a ≈ −15 LUFS en su ventana),
 *                una ganancia de ±0 dB.
 *   musica       «Luxury, Elegance, Refined», con una envolvente que BAJA mientras habla Isabella y sube en los dos recorridos. No es la de `envolventeBajoVoz`: la música baja con curva y ACABA de bajar antes de
 *                la primera palabra de cada toma.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre la fuente, `herramientas/lufs-rangos.py`):
 *   voz de Isabella      −15 (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»; sus tomas crudas miden −24,0 · −27,3 · −23,6; tratadas, −15,0 · −15,0 · −15,1)
 *   música SOLA          −15 por tramos, el nivel de la voz. La canción es PLANA (−14,4 en la apertura y el primer recorrido, −14,9 en el segundo): las ganancias son de −0,6, −0,6 y −0,1 dB y ningún
 *                        pico pasa de −2,9 dBFS.
 *   música BAJO LA VOZ   −26 en cada ventana de voz: 11 LU por debajo de ella. Como la canción no cae sola en ningún sitio, es una ganancia FIJA por ventana (−11,5 · −11,5 · −11,3 dB).
 * Una sola ganancia por tramo, sin `loudnorm` (le cambiaría la dinámica).
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · Las tres tomas de Isabella entran A CORTE en un golpe medido (11,9-13,8 dB) y su primera sílaba suena 8 f después: el golpe suena entero con la música arriba y la bajada, con curva de coseno, ocupa
 *     los 6 f siguientes y ACABA 2 f ANTES de la primera sílaba (`MARGEN_BAJADA`).
 *   · Tras la última palabra del hook (29 f antes de su corte) y de la mitad (28 f) la música sube con curva de coseno en 24 f (`FADE_IN`), y llega a su nivel 5 f y 4 f ANTES del golpe del plano siguiente (el
 *     drop de 17,0 dB y el de 11,1 dB), que suenan enteros.
 *
 * EL CTA Y EL CIERRE. La canción es plana y trae golpes hasta el final (el siguiente tras la última palabra cae 9 f después y mide 13,5 dB): no hay hueco en el que apagarla «antes del siguiente golpe». Bajo
 * la voz del CTA la cama queda a −26 LUFS y los últimos 45 f de su frase la llevan a CERO justo en la última palabra, con curva de coseno: en esos 45 f la voz va a −15 y la cama ya está 11 LU por debajo, así que el apagado
 * no se oye, pero la tarjeta queda en SILENCIO y ningún golpe suena tras la última palabra.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes, volumenDe } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FPS_054, INICIO_MUSICA, OBJETIVO_LUFS, metraje054 } from "./metraje-054";

/** La voz de las tres tomas a cámara (HK01, MD04 y CT06), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje054, { fps: FPS_054, objetivoLufs: OBJETIVO_LUFS });

/** Un tramo de voz en off: un `TramoAudio` que además sabe dónde se habla en su fuente. Esta pieza no lleva voz en off (la puerta compartida lee el export). */
export interface TramoOff extends TramoAudio {
  /** Segundos de la FUENTE en que empieza y acaba de hablar (`limites-voz.py`). */
  voz: { s0: number; s1: number };
}
export const off054: readonly TramoOff[] = [];

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number; ini: number } => {
  const c = metraje054.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-054: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_054);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_054);
  return { en: ini, dur: fin - ini, fin, ini };
};

/** Los planos que marcan cada tramo de la música (la puerta y la envolvente leen los mismos). */
const plano = (id: string) => {
  const c = metraje054.find((x) => x.id === id);
  if (!c) throw new Error(`audio-054: falta ${id} en metraje-054.ts`);
  return c;
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la
 * biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Luxury, Elegance, Refined» entre el 45,2 y el 80,2 s (ebur128): lo que suena en la pieza, en promedio. */
export const LUFS_MESETA = -14.6;
/** Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre la fuente): la aérea (45,2-47,9 s), el recorrido 1 (52,97-58,53 s) y el recorrido 2 (63,33-75,3 s). */
const LUFS_TRAMO = { apertura: -14.4, recorrido1: -14.4, recorrido2: -14.9 } as const;
/**
 * La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente, el tramo de la canción que suena mientras ella habla): el hook 48,2-52,0 s, la mitad 58,8-62,4 s y el CTA 75,55-80,15 s.
 */
export const LUFS_CANCION_EN_VOZ = { "c02-hook": -14.5, "c07-mitad": -14.5, "c13-cta": -14.7 } as const;
/** El pico real de la canción en cada tramo sin voz (ebur128 sobre la fuente, dBFS): con la ganancia de cada tramo ninguno pasa de −1 dBFS (lo comprueba la puerta). */
export const PICO_TRAMO = { apertura: -4.2, recorrido1: -2.3, recorrido2: -2.9 } as const;
/** La música SOLA: el nivel de la voz. */
const OBJETIVO_MUSICA = -15;
/** Ganancia lineal de la música sola en cada tramo (ver arriba). */
export const ALTOS = {
  apertura: gananciaHasta(LUFS_TRAMO.apertura, OBJETIVO_MUSICA),
  recorrido1: gananciaHasta(LUFS_TRAMO.recorrido1, OBJETIVO_MUSICA),
  recorrido2: gananciaHasta(LUFS_TRAMO.recorrido2, OBJETIVO_MUSICA),
} as const;
/** Mientras habla Isabella: la música baja hasta −26 LUFS EN CADA VENTANA (11 LU bajo su voz de −15). */
export const LUFS_MUSICA_BAJO_VOZ = -26;
export const BAJOS = {
  "c02-hook": gananciaHasta(LUFS_CANCION_EN_VOZ["c02-hook"], LUFS_MUSICA_BAJO_VOZ),
  "c07-mitad": gananciaHasta(LUFS_CANCION_EN_VOZ["c07-mitad"], LUFS_MUSICA_BAJO_VOZ),
  "c13-cta": gananciaHasta(LUFS_CANCION_EN_VOZ["c13-cta"], LUFS_MUSICA_BAJO_VOZ),
} as const;
/**
 * LOS FUNDIDOS (pedido del usuario en la V6, ya regla del canal: «el sonido cuando cambia a hablar Isabella debe hacer un fade-out / fade-in … para que no se escuche ahí mismo tan cortado»):
 *   · FADE-OUT desde el golpe del corte: con curva de coseno, ACABA `MARGEN_BAJADA` (2) f ANTES de la primera sílaba (8 f después del corte: dura 6 f).
 *   · FADE-IN de FADE_IN f tras su última palabra (con curva suave): acaba antes del golpe del corte siguiente.
 *   · APAGADO: bajo el CTA los últimos 45 f de su frase llevan la cama a cero.
 */
export const MARGEN_BAJADA = 2;
export const FADE_IN = 24;
export const APAGADO = 45;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** Dónde acaba la música: la última palabra del CTA (f1058); la tarjeta va en silencio. */
export const FIN_MUSICA_054 = ventanaDe("c13-cta").fin;

/** La envolvente: la aérea con su golpe, el hook con su cama, el recorrido 1, la mitad con su cama, el recorrido 2, el CTA con su cama y el apagado final. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c02-hook");
  const mitad = ventanaDe("c07-mitad");
  const cta = ventanaDe("c13-cta");
  const hookPlano = plano("c02-hook");
  const mitadPlano = plano("c07-mitad");
  const ctaPlano = plano("c13-cta");
  const p: [number, number][] = [
    // LA APERTURA: la música sola desde el frame 0 (1 f de entrada para no meter un clic: el golpe de entrada suena en el f3) hasta el golpe del corte del hook.
    [0, 0],
    [1, ALTOS.apertura],
    [hookPlano.en, ALTOS.apertura],
    // EL HOOK: baja con curva desde el golpe del corte (suena entero) y ACABA 2 f antes de la primera sílaba; sube tras la última palabra y llega arriba antes del drop.
    ...fundido(hookPlano.en, hook.ini - hookPlano.en - MARGEN_BAJADA, ALTOS.apertura, BAJOS["c02-hook"]).slice(1),
    [hook.ini, BAJOS["c02-hook"]],
    [hook.fin, BAJOS["c02-hook"]],
    ...fundido(hook.fin, FADE_IN, BAJOS["c02-hook"], ALTOS.recorrido1).slice(1),
    // EL RECORRIDO 1 y LA MITAD.
    [mitadPlano.en, ALTOS.recorrido1],
    ...fundido(mitadPlano.en, mitad.ini - mitadPlano.en - MARGEN_BAJADA, ALTOS.recorrido1, BAJOS["c07-mitad"]).slice(1),
    [mitad.fin, BAJOS["c07-mitad"]],
    ...fundido(mitad.fin, FADE_IN, BAJOS["c07-mitad"], ALTOS.recorrido2).slice(1),
    // EL RECORRIDO 2 y EL CTA: baja desde el golpe del corte, se queda en su cama y los últimos 45 f de la frase la llevan a cero.
    [ctaPlano.en, ALTOS.recorrido2],
    ...fundido(ctaPlano.en, cta.ini - ctaPlano.en - MARGEN_BAJADA, ALTOS.recorrido2, BAJOS["c13-cta"]).slice(1),
    [cta.fin - APAGADO, BAJOS["c13-cta"]],
    ...fundido(cta.fin - APAGADO, APAGADO, BAJOS["c13-cta"], 0).slice(1),
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

/**
 * Remotion le pasa el volumen a ffmpeg como UNA expresión `if(between(t,…),valor,if(…))` con un `if` por cada valor distinto de la ganancia (a 3 decimales), y ffmpeg no admite más de ≈ 80 `if`
 * anidados («Missing ')' or too many args»). Una envolvente con rampas largas se PARTE en tramos de la misma
 * canción, consecutivos y sin solape (cada uno empieza en el frame de fuente en que acabó el anterior: es la misma muestra), cada uno con ≤ `MAX_VALORES` cambios de valor.
 */
const MAX_VALORES = 60;

/** La envolvente `puntos` (frames absolutos de la comp) partida en tramos consecutivos de la canción, cada uno con su trozo de envolvente. */
const trocea = (puntos: [number, number][], fin: number): TramoAudio[] => {
  const entero: TramoAudio = { id: "musica", src: "recorrido-054/musica-054.wav", en: 0, dur: fin, desde: INICIO_MUSICA, ganancia: puntos, reason: "" };
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
      src: "recorrido-054/musica-054.wav",
      en: a,
      dur: b - a,
      // El frame de fuente en que arranca este trozo: el de la canción en `a` (INICIO_MUSICA es un número entero de frames).
      desde: INICIO_MUSICA + a / FPS_054,
      ganancia,
      reason:
        i === 0
          ? "«Luxury, Elegance, Refined»: el golpe de 17,8 dB del f3 abre la pieza, la música baja con curva antes de cada frase de Isabella, sube en los dos recorridos y se apaga bajo el CTA justo en su última palabra: la tarjeta, en silencio. Partida en tramos consecutivos de la misma canción: ffmpeg no admite una expresión de volumen con más de ≈ 80 valores distintos."
          : `«Luxury, Elegance, Refined», trozo ${i + 1} de ${cortes.length - 1}: sigue donde acabó el anterior (f${a}), la misma muestra de la canción.`,
    };
  });
};

export const musica054: readonly TramoAudio[] = HAY_MUSICA ? trocea(envolvente(), FIN_MUSICA_054) : [];

/** Lo que monta `<PistaAudio>`. */
export const audio054: readonly TramoAudio[] = [...vocesTomas, ...off054, ...musica054];
