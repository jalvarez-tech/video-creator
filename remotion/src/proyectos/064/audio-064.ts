/**
 * EL SONIDO DEL 064 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK02 (dos planos: la afirmación y «Ven, te muestro»), HK05 y CT03, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, cruce de 6 f en las que entran
 *                disolviendo, desclic de 3 f en la que entra a corte («Ven, te muestro») y, como el WAV es el TRATADO de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador,
 *                ya a −15,0 LUFS en su ventana), UNA ganancia de ±0,0 dB.
 *   musica       «Cornfield Chase», con una envolvente que BAJA mientras habla Isabella y sube en el dron. No es la de `envolventeBajoVoz`: la música baja con curva de coseno que ACABA ANTES de la primera palabra (regla del canal
 *                desde el 022) y, en el CTA, se apoya en la CAÍDA NATURAL de la canción.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente, `proyectos/064/medidas/lufs-rangos-cancion.txt`):
 *   voz de Isabella      −15 (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»; sus tomas crudas miden −24,6 · −23,2 · −24,4; tratadas, −15,0 con el pico real a −2,5 dBFS o menos)
 *   música SOLA          −15 en cada tramo (apertura −13,0 · dron bajo la infografía −12,4 · bloque 5 −9,6 LUFS de la canción sin tocar: −2,0 · −2,6 · −5,4 dB); sus picos, con esa ganancia, quedan a −4,4 · −4,2 · −5,9 dBFS.
 *                        «Cornfield Chase» es un crescendo: la canción SUBE sola de −13 a −9,6 LUFS, y la ganancia de cada tramo la deja a −15.
 *   música BAJO LA VOZ   −26 en cada ventana de voz (11 LU por debajo de ella): −13,0 dB bajo el hook (la canción mide −13,0) y −14,3 dB bajo la mitad (−11,7). En el CTA la canción CAE SOLA (de −9,6 a −26,8 LUFS en el
 *                        primer segundo de la voz y a −34,6 en el siguiente): la ganancia sube a +0,8 dB para dejar ese primer segundo a −26 y la caída natural hace el resto.
 * Una sola ganancia por tramo, sin `loudnorm` (le cambiaría la dinámica).
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · La APERTURA suena sola con el golpe de entrada en el f3 y su nivel hasta el f117, donde Isabella es opaca: la música baja con curva de coseno en 11 f y la primera palabra suena a los 13,1 f.
 *   · El HOOK son dos planos (la afirmación y «Ven, te muestro», con 10 f de pausa entre las dos): la música se queda BAJA durante los dos; tras la última palabra (f351) espera 6 f y sube con curva en 15 f: está arriba en el
 *     f372, antes del f378 (donde el dron bajo la infografía es opaco).
 *   · La MITAD: disolvencia que ACABA en el arpegio de 6,7 dB del f573, bajada de 11 f y primera palabra a los 13,4 f. Tras la mitad caben 24 f hasta el dron: la música sube en 22.
 *   · El CTA: la canción empieza a caer a los 120,07 s (f1007). La música pasa de su nivel de arriba (−5,4 dB) al del CTA (+0,8 dB) en 11 f desde el f1007 (la caída natural la baja −10 dB en esos 11 f) y la primera palabra
 *     suena a los 13,1 f.
 *
 * EL CTA Y EL CIERRE. La canción RESUELVE SOLA en esta sección (su final es un fundido a silencio de 120 a 125 s): bajo la voz del CTA queda a −26 LUFS en el primer segundo y se apaga sola; la envolvente solo mantiene su
 * nivel hasta el f1203 y llega a cero en el f1207 (el WAV de la canción acaba en el f1211). La tarjeta del cierre, desde el f1236, va en silencio.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes, volumenDe } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_064, FPS_064, INICIO_MUSICA, OBJETIVO_LUFS, metraje064 } from "./metraje-064";

/** La voz de las tomas a cámara (HK02 en dos planos, HK05 y CT03), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje064, { fps: FPS_064, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre. */
const CTA = metraje064.find((c) => c.id === "c06-cta");
if (!CTA) throw new Error("audio-064: falta c06-cta en metraje-064.ts");
export const FIN_CTA_064 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number; ini: number } => {
  const c = metraje064.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-064: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_064);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_064);
  return { en: ini, dur: fin - ini, fin, ini };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la
 * biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Cornfield Chase» entre los 86,5 y los 120,0 s (ebur128): lo que suena en toda la pieza antes del CTA (sube de −13 a −9,6 LUFS: es un crescendo). */
export const LUFS_MESETA = -11.7;
/** Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre la fuente): la apertura (86,5-90,4 s), el dron bajo la infografía (98,9-105,6 s) y el bloque 5 (112,0-120,0 s). */
export const LUFS_TRAMO = { apertura: -13.0, paseo: -12.4, bloque5: -9.6 } as const;
/**
 * La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente, el tramo de la canción que suena mientras ella habla): lo que mide la puerta en lugar de suponer la meseta en todas. Hook
 * 90,9-98,3 s (los dos planos), mitad 106,0-111,2 s y CTA 120,5-121,5 s (el primer segundo de su voz: después la canción sigue cayendo: −34,6 y −39,2 LUFS en los dos siguientes).
 */
export const LUFS_CANCION_EN_VOZ = { "c02a-hook": -13.0, "c02b-invita": -13.0, "c04-mitad": -11.7, "c06-cta": -26.8 } as const;
/** El pico real de la canción en cada tramo sin voz (ebur128 sobre la fuente, dBFS): con la ganancia de cada tramo ninguno pasa de −1 dBFS (lo comprueba la puerta). */
export const PICO_TRAMO = { apertura: -2.4, paseo: -1.6, bloque5: -0.5 } as const;
/** La música SOLA por tramos: −15 LUFS, el nivel de la voz, en los tres (los picos con esa ganancia quedan a −4,4 · −4,2 · −5,9 dBFS). */
export const OBJETIVO_MUSICA = { apertura: -15, paseo: -15, bloque5: -15 } as const;
/** Ganancia lineal de la música sola en cada tramo (ver arriba): −2,0 · −2,6 · −5,4 dB. */
export const ALTOS = {
  apertura: gananciaHasta(LUFS_TRAMO.apertura, OBJETIVO_MUSICA.apertura),
  paseo: gananciaHasta(LUFS_TRAMO.paseo, OBJETIVO_MUSICA.paseo),
  bloque5: gananciaHasta(LUFS_TRAMO.bloque5, OBJETIVO_MUSICA.bloque5),
} as const;
/**
 * Mientras habla Isabella: la música baja hasta −26 LUFS EN CADA VENTANA (11 LU bajo su voz de −15). La ganancia absoluta que deja cada ventana en −26 es la de `gananciaHasta`
 * (en el CTA, +0,8 dB: la canción ya está a −26,8 en el primer segundo de la voz y cae sola).
 */
export const LUFS_MUSICA_BAJO_VOZ = -26;
export const BAJOS = {
  "c02a-hook": gananciaHasta(LUFS_CANCION_EN_VOZ["c02a-hook"], LUFS_MUSICA_BAJO_VOZ),
  "c02b-invita": gananciaHasta(LUFS_CANCION_EN_VOZ["c02b-invita"], LUFS_MUSICA_BAJO_VOZ),
  "c04-mitad": gananciaHasta(LUFS_CANCION_EN_VOZ["c04-mitad"], LUFS_MUSICA_BAJO_VOZ),
  "c06-cta": gananciaHasta(LUFS_CANCION_EN_VOZ["c06-cta"], LUFS_MUSICA_BAJO_VOZ),
} as const;
/**
 * LOS FUNDIDOS (pedido del usuario en la V6, ya regla del canal: «el sonido cuando cambia a hablar Isabella debe hacer un fade-out / fade-in … para que no se escuche ahí mismo tan cortado»):
 *   · FADE-OUT de FADE_OUT f desde el frame en que Isabella es opaca (la música baja con curva de coseno): la curva ACABA antes de su primera palabra: el hook, a 2,1 f; la mitad, a 2,4 f; el CTA, a 2,1 f.
 *   · FADE-IN de FADE_IN f tras su última palabra (con curva suave), o los que quepan hasta 2 f antes del plano siguiente.
 */
export const FADE_OUT = { hook: 11, mitad: 11, cta: 11 } as const;
export const FADE_IN = { hook: 15, mitad: 22 } as const;
/** Frames que la música se queda BAJA tras la última palabra del hook antes de subir (el usuario oyó cortarse la voz en el 062: la música no sube en cuanto ella acaba). */
export const RETRASO_SUBIDA_HOOK = 6;
/** Hasta dónde llega la envolvente: la canción acaba en el f1211 y la envolvente llega a cero 4 f antes. */
const APAGADO_CTA_HASTA = FIN_MUSICA_064;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** La envolvente: la apertura sola, el hook (dos planos), la mitad y el CTA con su fundido, y el apagado final. */
const envolvente = (): [number, number][] => {
  const hookB = ventanaDe("c02b-invita");
  const mitad = ventanaDe("c04-mitad");
  const hookPlano = metraje064.find((c) => c.id === "c02a-hook");
  const infoPlano = metraje064.find((c) => c.id === "c03a-plano");
  const mitadPlano = metraje064.find((c) => c.id === "c04-mitad");
  const horizontePlano = metraje064.find((c) => c.id === "c05a-horizonte");
  const ctaPlano = metraje064.find((c) => c.id === "c06-cta");
  if (!hookPlano || !infoPlano || !mitadPlano || !horizontePlano || !ctaPlano) throw new Error("audio-064: faltan planos en metraje-064.ts");

  const p: [number, number][] = [
    // LA APERTURA: la música sola desde el frame 0 (1 f de entrada para no meter un clic: el golpe de entrada suena en el f3).
    [0, 0],
    [1, ALTOS.apertura],
    // HOOK (disuelve y es opaca): la música baja con curva y se queda baja durante los DOS planos (la afirmación y «Ven, te muestro»); sube con curva (los f que quepan) hasta el dron bajo la infografía.
    [hookPlano.en, ALTOS.apertura],
    ...fundido(hookPlano.en, FADE_OUT.hook, ALTOS.apertura, BAJOS["c02a-hook"]),
    [hookB.fin, BAJOS["c02a-hook"]],
    [hookB.fin + RETRASO_SUBIDA_HOOK, BAJOS["c02a-hook"]],
    ...fundido(hookB.fin + RETRASO_SUBIDA_HOOK, Math.min(FADE_IN.hook, infoPlano.en - (hookB.fin + RETRASO_SUBIDA_HOOK) - 2), BAJOS["c02a-hook"], ALTOS.paseo),
    // MITAD: igual (la disolvencia ACABA en el arpegio). Tras ella caben 24 f hasta el horizonte: la música sube en los que quepan.
    [mitadPlano.en, ALTOS.paseo],
    ...fundido(mitadPlano.en, FADE_OUT.mitad, ALTOS.paseo, BAJOS["c04-mitad"]),
    [mitad.fin, BAJOS["c04-mitad"]],
    ...fundido(mitad.fin, Math.min(FADE_IN.mitad, horizontePlano.en - mitad.fin - 2), BAJOS["c04-mitad"], ALTOS.bloque5),
    // CTA (disuelve y es opaca donde empieza a caer la canción): del nivel de arriba al del CTA (la caída natural de la canción hace el resto)...
    [ctaPlano.en, ALTOS.bloque5],
    ...fundido(ctaPlano.en, FADE_OUT.cta, ALTOS.bloque5, BAJOS["c06-cta"]),
    // ...se mantiene mientras la canción se apaga sola y llega a cero 4 f antes de que se acabe el WAV (la tarjeta va en silencio).
    [APAGADO_CTA_HASTA - 4, BAJOS["c06-cta"]],
    [APAGADO_CTA_HASTA, 0],
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
  const entero: TramoAudio = { id: "musica", src: "recorrido-064/musica-064.wav", en: 0, dur: fin, desde: INICIO_MUSICA, ganancia: puntos, reason: "" };
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
      src: "recorrido-064/musica-064.wav",
      en: a,
      dur: b - a,
      // El frame de fuente en que arranca este trozo: el de la canción en `a` (INICIO_MUSICA es un número entero de frames).
      desde: INICIO_MUSICA + a / FPS_064,
      ganancia,
      reason:
        i === 0
          ? "«Cornfield Chase»: el golpe de 9,9 dB del f3 abre la pieza; la música baja con curva tras la entrada de Isabella (hook, mitad y CTA) y sube tras las dos primeras; la canción cae sola a silencio bajo la voz del CTA (de 120 a 125 s). Partida en tramos consecutivos de la misma canción: ffmpeg no admite una expresión de volumen con más de ≈ 80 valores distintos."
          : `«Cornfield Chase», trozo ${i + 1} de ${cortes.length - 1}: sigue donde acabó el anterior (f${a}), la misma muestra de la canción.`,
    };
  });
};

export const musica064: readonly TramoAudio[] = HAY_MUSICA ? trocea(envolvente(), FIN_MUSICA_064) : [];

/** Lo que monta `<PistaAudio>`. */
export const audio064: readonly TramoAudio[] = [...vocesTomas, ...musica064];
