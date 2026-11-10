/**
 * EL SONIDO DEL 065 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK03 (las partes A y B), CT05 (la pregunta) y CT01, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, desclic de 3 f en la parte B (entra a
 *                corte), cruce de 6 f en las que entran disolviendo y, como el WAV es el TRATADO de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a −15,0 LUFS en
 *                su ventana), UNA ganancia de ±0,0 dB.
 *   musica       «deadmau5 - Strobe», con una envolvente que BAJA mientras habla Isabella y sube en los tramos sin voz (la ficha y el dron). No es la de `envolventeBajoVoz`: aquí el golpe de entrada de cada toma tiene
 *                que sonar ENTERO, la música baja con curva de coseno DESPUÉS y acaba ANTES de la primera palabra (regla del canal desde el 022). El hook (partes A y B) es UNA sola bajada: entre «millones» y «ven» pasan
 *                10 f y la música no vuelve a subir.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente, `proyectos/065/medidas/lufs-rangos-cancion.txt`):
 *   voz de Isabella      −15 (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»; sus tomas crudas miden −26,2 · −23,2 · −20,5; tratadas, −15,0 con el pico real a −2,5 dBFS o menos)
 *   música SOLA          −15: la canción, en este tramo, es una MESETA plana de −9,1 a −9,5 LUFS (la apertura, la ficha y el dron; bombo en cada pulso), así que se baja ≈ 5-6 dB (el MP3 decodificado pasa de 0 dBFS
 *                        en 369 muestras de 4,6 millones, +0,6 dB como mucho: tras la ganancia el pico queda a −5,2…−5,8 dBFS). A partir de ≈ 592 s la canción se va apagando sola.
 *   música BAJO LA VOZ   −26 en cada ventana de voz: 11 LU por debajo de ella. Con una ganancia fija en cada toma (la canción mide −9,4 · −9,4 · −10,1 LUFS bajo el hook, la pregunta y el CTA).
 * Una sola ganancia por tramo, sin `loudnorm` (le cambiaría la dinámica).
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · La APERTURA suena sola con el golpe de entrada en el f3 y su nivel hasta el f114, donde la disolvencia al hook ACABA en un golpe de 17,2 dB: suena entero y la música baja con curva de coseno en 10 f; la primera
 *     palabra suena a los 13,4 f del golpe.
 *   · Tras la última palabra de «ven, te muestro» (f402,6) la música se queda baja 6 f (rev. 2 del 062: el usuario oía la voz cortarse) y sube con curva en 15 f: está arriba en el f424, antes del f437 (la disolvencia a la ficha).
 *   · La PREGUNTA: golpe de 21,1 dB en f691 (la disolvencia que ACABA en él), bajada de 10 f y primera palabra a los 12,9 f del golpe. Tras «invertir» (f772) caben 17 f hasta el golpe del f789: la música espera 4 y sube en 11.
 *   · El CTA entra DISOLVIENDO y acaba en el golpe de 12,8 dB del f1014: el golpe suena entero, la música baja en 10 f y la primera palabra suena a los 13,3 f del golpe.
 *
 * EL CTA Y EL CIERRE. La canción NO resuelve sola en esta sección (se va apagando desde ≈ 592 s, pero sigue con el bombo hasta los 600 s): bajo la voz del CTA queda a −26 LUFS y, al acabar su última palabra
 * (f1141), se APAGA con curva de coseno hasta llegar a cero 2 f antes del final de la pieza, bajo la tarjeta del cierre.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes, volumenDe } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_065, FPS_065, INICIO_MUSICA, OBJETIVO_LUFS, metraje065 } from "./metraje-065";

/** La voz de las tomas a cámara (HK03 ×2, CT05 y CT01), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje065, { fps: FPS_065, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre; la música sigue apagándose bajo ella. */
const CTA = metraje065.find((c) => c.id === "c08-cta");
if (!CTA) throw new Error("audio-065: falta c08-cta en metraje-065.ts");
export const FIN_CTA_065 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number; ini: number } => {
  const c = metraje065.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-065: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_065);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_065);
  return { en: ini, dur: fin - ini, fin, ini };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la
 * biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Strobe» entre 554,95 y 592,9 s (ebur128): lo que suena en toda la pieza, en promedio (meseta de −9,1 a −9,5 LUFS hasta ≈ 592 s). */
export const LUFS_MESETA = -9.4;
/** Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre la fuente): la apertura (554,97-558,6 s), la ficha (569,5-577,8 s) y el dron (581,2-588,6 s). */
export const LUFS_TRAMO = { apertura: -9.1, paseo: -9.5, bloque5: -9.4 } as const;
/**
 * La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente, el tramo de la canción que suena mientras ella habla): lo que mide la puerta en lugar de suponer la meseta en todas. Hook (A y B)
 * 559,1-568,3 s, pregunta 578,3-580,7 s y CTA 589,1-592,9 s (el CTA cae ya en el principio del apagado de la canción).
 */
export const LUFS_CANCION_EN_VOZ = { "c02-hook": -9.4, "c05-mitad": -9.4, "c08-cta": -10.1 } as const;
/** El pico real de la canción en cada tramo sin voz (ebur128 sobre la fuente, dBFS): con la ganancia de cada tramo ninguno pasa de −1 dBFS (lo comprueba la puerta). */
export const PICO_TRAMO = { apertura: 0.1, paseo: 0.3, bloque5: 0.3 } as const;
/** La música SOLA por tramos: −15 LUFS, el nivel de la voz (la canción es una meseta plana y los tres tramos se bajan por igual). */
export const OBJETIVO_MUSICA = { apertura: -15, paseo: -15, bloque5: -15 } as const;
/** Ganancia lineal de la música sola en cada tramo (ver arriba): −5,9 · −5,5 · −5,6 dB. */
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
  "c05-mitad": gananciaHasta(LUFS_CANCION_EN_VOZ["c05-mitad"], LUFS_MUSICA_BAJO_VOZ),
  "c08-cta": gananciaHasta(LUFS_CANCION_EN_VOZ["c08-cta"], LUFS_MUSICA_BAJO_VOZ),
} as const;
/**
 * LOS FUNDIDOS (pedido del usuario en la V6, ya regla del canal: «el sonido cuando cambia a hablar Isabella debe hacer un fade-out / fade-in … para que no se escuche ahí mismo tan cortado»):
 *   · FADE-OUT de FADE_OUT f desde el golpe en que acaba la disolvencia de su toma (el golpe suena entero y la música baja DESPUÉS, con curva de coseno): la curva ACABA antes de su primera palabra: el hook, a 3,4 f; la
 *     mitad, a 3,4 f; el CTA, a 2,9 f.
 *   · FADE-IN de FADE_IN f tras su última palabra (con curva suave), o los que quepan hasta 2 f antes del golpe del plano siguiente.
 */
export const FADE_OUT = { hook: 10, mitad: 10, cta: 10 } as const;
export const FADE_IN = { hook: 15, mitad: 11 } as const;
/** Frames que la música se queda BAJA tras la última palabra del hook (la parte B) y tras «invertir» antes de subir (rev. 2 del 062: «la voz se corta muy rápido»; antes subía en cuanto ella acababa). */
export const RETRASO_SUBIDA_HOOK = 6;
export const RETRASO_SUBIDA_MITAD = 4;
/** Hasta dónde se apaga la música tras la última palabra del CTA: 2 f antes del final de la pieza (la tarjeta va en silencio). */
const APAGADO_CTA_HASTA = FIN_MUSICA_065;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** La envolvente: el lote solo, el hook (A y B), la pregunta y el CTA con su fundido, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const hookA = ventanaDe("c02-hook");
  const hookB = ventanaDe("c03-invita");
  const mitad = ventanaDe("c05-mitad");
  const cta = ventanaDe("c08-cta");
  const hookPlano = metraje065.find((c) => c.id === "c02-hook");
  const fichaPlano = metraje065.find((c) => c.id === "c04-ficha");
  const mitadPlano = metraje065.find((c) => c.id === "c05-mitad");
  const dronPlano = metraje065.find((c) => c.id === "c06-panorama");
  const ctaPlano = metraje065.find((c) => c.id === "c08-cta");
  if (!hookPlano || !fichaPlano || !mitadPlano || !dronPlano || !ctaPlano) throw new Error("audio-065: faltan planos en metraje-065.ts");
  const hookFin = hookB.fin;

  const p: [number, number][] = [
    // LA APERTURA: la música sola desde el frame 0 (1 f de entrada para no meter un clic: el golpe de entrada suena en el f3).
    [0, 0],
    [1, ALTOS.apertura],
    // HOOK (la disolvencia ACABA en el golpe): el golpe suena entero y la música baja con fundido DESPUÉS y se queda baja durante las partes A y B; sube con fundido (los f que quepan) hasta el plano siguiente.
    [hookPlano.en, ALTOS.apertura],
    ...fundido(hookPlano.en, FADE_OUT.hook, ALTOS.apertura, BAJOS["c02-hook"]),
    [hookA.ini, BAJOS["c02-hook"]],
    [hookFin, BAJOS["c02-hook"]],
    [hookFin + RETRASO_SUBIDA_HOOK, BAJOS["c02-hook"]],
    ...fundido(hookFin + RETRASO_SUBIDA_HOOK, Math.min(FADE_IN.hook, fichaPlano.en - (hookFin + RETRASO_SUBIDA_HOOK) - 2), BAJOS["c02-hook"], ALTOS.paseo),
    // LA PREGUNTA: igual (la disolvencia ACABA en el golpe). Tras «invertir» caben 17 f hasta el panorama: la música espera 4 y sube en los que quepan.
    [mitadPlano.en, ALTOS.paseo],
    ...fundido(mitadPlano.en, FADE_OUT.mitad, ALTOS.paseo, BAJOS["c05-mitad"]),
    [mitad.fin, BAJOS["c05-mitad"]],
    [mitad.fin + RETRASO_SUBIDA_MITAD, BAJOS["c05-mitad"]],
    ...fundido(mitad.fin + RETRASO_SUBIDA_MITAD, Math.min(FADE_IN.mitad, dronPlano.en - (mitad.fin + RETRASO_SUBIDA_MITAD) - 2), BAJOS["c05-mitad"], ALTOS.bloque5),
    // CTA (entra disolviendo y ACABA en el golpe): la bajada igual...
    [ctaPlano.en, ALTOS.bloque5],
    ...fundido(ctaPlano.en, FADE_OUT.cta, ALTOS.bloque5, BAJOS["c08-cta"]),
    [cta.fin, BAJOS["c08-cta"]],
    // ...y al acabar la voz la música se APAGA con curva de coseno hasta cero, 2 f antes del final de la pieza (la tarjeta va en silencio). La canción no resuelve sola en esta sección.
    ...fundido(cta.fin, APAGADO_CTA_HASTA - cta.fin, BAJOS["c08-cta"], 0),
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
  const entero: TramoAudio = { id: "musica", src: "recorrido-065/musica-065.wav", en: 0, dur: fin, desde: INICIO_MUSICA, ganancia: puntos, reason: "" };
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
      src: "recorrido-065/musica-065.wav",
      en: a,
      dur: b - a,
      // El frame de fuente en que arranca este trozo: el de la canción en `a` (INICIO_MUSICA es un número entero de frames).
      desde: INICIO_MUSICA + a / FPS_065,
      ganancia,
      reason:
        i === 0
          ? "«deadmau5 - Strobe»: el golpe de 17,5 dB del f3 abre la pieza; la música baja con curva tras el golpe de cada entrada de Isabella (hook, pregunta y CTA) y sube tras las dos primeras; cada corte cae en un pulso medido del bombo (128 BPM); la canción se apaga con curva bajo la tarjeta tras «…en los comentarios». Partida en tramos consecutivos de la misma canción: ffmpeg no admite una expresión de volumen con más de ≈ 80 valores distintos."
          : `«deadmau5 - Strobe», trozo ${i + 1} de ${cortes.length - 1}: sigue donde acabó el anterior (f${a}), la misma muestra de la canción.`,
    };
  });
};

export const musica065: readonly TramoAudio[] = HAY_MUSICA ? trocea(envolvente(), FIN_MUSICA_065) : [];

/** Lo que monta `<PistaAudio>`. */
export const audio065: readonly TramoAudio[] = [...vocesTomas, ...musica065];
