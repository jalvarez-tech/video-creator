/**
 * EL SONIDO DEL 075 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK06, MD03 y CT08, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, desclic de 3 f en las tres, que entran A CORTE, y, como el WAV es el
 *                TRATADO de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a −15,0 LUFS en su ventana), UNA ganancia de ±0,0 dB.
 *   musica       «Street Level Sessions on the Green», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos. No es la de `envolventeBajoVoz`: aquí el golpe de entrada de cada toma tiene que
 *                sonar ENTERO, la música baja con curva de coseno DESPUÉS y acaba ANTES de la primera palabra (regla del canal desde el 022).
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente, `proyectos/075/medidas/lufs-rangos-cancion.txt`):
 *   voz de Isabella      −15 (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»; sus tomas crudas miden −24,5 · −25,6 · −24,4; tratadas, −15,0 con el pico real a −2,5 dBFS o menos)
 *   música SOLA          −15 en los tres tramos (apertura · paseo · bloque 5): la canción es una MESETA alta y uniforme (−10,7 · −9,9 · −10,8 LUFS con picos de +0,3 a +0,6 dBFS), así que no hay que subirla sino
 *                        BAJARLA 4-5 dB, y sus picos quedan a ≈ −4 dBFS.
 *   música BAJO LA VOZ   −26 en cada ventana de voz: 11 LU por debajo de ella (la canción mide −10,2 · −10,9 · −11,5 LUFS bajo el hook, la mitad y el CTA). Una ganancia fija en cada toma.
 * Una sola ganancia por tramo, sin `loudnorm` (le cambiaría la dinámica).
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · La APERTURA suena sola con el golpe de entrada en el f3 y su nivel hasta el f103, donde el hook entra A CORTE en un golpe de 15,2 dB: suena entero y la música baja con curva de coseno en 10 f; la primera palabra
 *     suena a los 12,6 f del golpe.
 *   · Tras la última palabra del hook (f204) la música se queda baja 6 f y sube con curva en 15 f: está arriba en el f225, antes del f231 (el golpe del paseo).
 *   · La MITAD entra A CORTE en el golpe de 25,3 dB del f499 (suena entero), bajada de 10 f y primera palabra a los 22,5 f del golpe. Tras la mitad caben solo 9,4 f hasta el f629 (el clip de MD03 acaba 0,33 s tras
 *     su última palabra y el plano siguiente entra también a corte): la música sube en los 7 f que caben. Es lo más corto de las seis piezas y se oye en la prueba.
 *   · El CTA entra A CORTE en el golpe de 13,4 dB del f966: el golpe suena entero, la música baja en 10 f y la primera palabra suena a los 12,5 f del golpe.
 *
 * EL CTA Y EL CIERRE. La canción CAE sola desde los 205,0 s (f1127 de la pieza), ya bajo la tarjeta. Bajo la voz del CTA queda a −26 LUFS y, al acabar su última palabra (f1064), se APAGA con curva de coseno hasta
 * llegar a cero 2 f antes del final de la pieza, bajo la tarjeta del cierre.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes, volumenDe } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_075, FPS_075, INICIO_MUSICA, OBJETIVO_LUFS, metraje075 } from "./metraje-075";

/** La voz de las tres tomas a cámara (HK06, MD03 y CT08), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje075, { fps: FPS_075, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre; la música sigue apagándose bajo ella. */
const CTA = metraje075.find((c) => c.id === "c10-cta");
if (!CTA) throw new Error("audio-075: falta c10-cta en metraje-075.ts");
export const FIN_CTA_075 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number; ini: number } => {
  const c = metraje075.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-075: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_075);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_075);
  return { en: ini, dur: fin - ini, fin, ini };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la
 * biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Street Level Sessions on the Green» entre los 167,6 y los 203 s (ebur128): lo que suena en toda la pieza, en promedio (una meseta uniforme y alta). */
export const LUFS_MESETA = -10.6;
/** Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre la fuente): la apertura (167,7-170,8 s), el paseo (175,3-183,9 s) y el bloque 5 (188,6-199,4 s). */
export const LUFS_TRAMO = { apertura: -10.7, paseo: -9.9, bloque5: -10.8 } as const;
/**
 * La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente, el tramo de la canción que suena mientras ella habla): lo que mide la puerta en lugar de suponer la meseta en todas. Hook
 * 171,37-174,3 s, mitad 184,9-188,2 s y CTA 200,1-203,0 s.
 */
export const LUFS_CANCION_EN_VOZ = { "c02-hook": -10.2, "c06-mitad": -10.9, "c10-cta": -11.5 } as const;
/** El pico real de la canción en cada tramo sin voz (ebur128 sobre la fuente, dBFS): con la ganancia de cada tramo ninguno pasa de −1 dBFS (lo comprueba la puerta). */
export const PICO_TRAMO = { apertura: 0.6, paseo: 0.3, bloque5: 0.3 } as const;
/**
 * La música SOLA por tramos: −15 LUFS en los tres, el nivel de la voz. La canción es una meseta alta (−9,5 a −10,4 LUFS, picos de hasta +0,2 dBFS): llevarla a −15 es BAJARLA unos 4-5 dB y sus picos quedan a ≈ −4 dBFS.
 */
export const OBJETIVO_MUSICA = { apertura: -15, paseo: -15, bloque5: -15 } as const;
/** Ganancia lineal de la música sola en cada tramo (ver arriba): −4,3 · −5,1 · −4,2 dB. */
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
 *   · FADE-OUT de FADE_OUT f desde el golpe en que acaba la disolvencia de su toma (el golpe suena entero y la música baja DESPUÉS, con curva de coseno): la curva ACABA antes de su primera palabra: el hook, a 2,6 f; la
 *     mitad, a 12,5 f; el CTA, a 2,5 f.
 *   · FADE-IN de FADE_IN f tras su última palabra (con curva suave), o los que quepan hasta 2 f antes del golpe del plano siguiente.
 */
export const FADE_OUT = { hook: 10, mitad: 10, cta: 10 } as const;
export const FADE_IN = { hook: 15, mitad: 22 } as const;
/** Frames que la música se queda BAJA tras la última palabra del hook antes de subir (rev. 2: «la voz se corta muy rápido»; antes subía en cuanto ella acababa). */
export const RETRASO_SUBIDA_HOOK = 6;
/** Hasta dónde se apaga la música tras la última palabra del CTA: 2 f antes del final de la pieza (la tarjeta va en silencio). */
const APAGADO_CTA_HASTA = FIN_MUSICA_075;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** La envolvente: la casa sola, el hook, la mitad y el CTA con su fundido, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c02-hook");
  const mitad = ventanaDe("c06-mitad");
  const cta = ventanaDe("c10-cta");
  const hookPlano = metraje075.find((c) => c.id === "c02-hook");
  const paseoPlano = metraje075.find((c) => c.id === "c03-tele");
  const mitadPlano = metraje075.find((c) => c.id === "c06-mitad");
  const alcobaPlano = metraje075.find((c) => c.id === "c07-cocineta");
  const ctaPlano = metraje075.find((c) => c.id === "c10-cta");
  if (!hookPlano || !paseoPlano || !mitadPlano || !alcobaPlano || !ctaPlano) throw new Error("audio-075: faltan planos en metraje-075.ts");

  const p: [number, number][] = [
    // LA APERTURA: la música sola desde el frame 0 (1 f de entrada para no meter un clic: el golpe de entrada suena en el f3).
    [0, 0],
    [1, ALTOS.apertura],
    // HOOK (entra disolviendo): el golpe suena entero y la música baja con fundido DESPUÉS; sube con fundido (los f que quepan) hasta el plano siguiente, que entra disolviendo.
    [hookPlano.en, ALTOS.apertura],
    ...fundido(hookPlano.en, FADE_OUT.hook, ALTOS.apertura, BAJOS["c02-hook"]),
    [hook.fin, BAJOS["c02-hook"]],
    [hook.fin + RETRASO_SUBIDA_HOOK, BAJOS["c02-hook"]],
    ...fundido(hook.fin + RETRASO_SUBIDA_HOOK, Math.min(FADE_IN.hook, paseoPlano.en - (hook.fin + RETRASO_SUBIDA_HOOK) - 2), BAJOS["c02-hook"], ALTOS.paseo),
    // MITAD (entra a corte en el golpe): igual. Tras ella caben solo 9 f hasta la cocineta, que entra a corte en el golpe del f629: la música sube en los que quepan.
    [mitadPlano.en, ALTOS.paseo],
    ...fundido(mitadPlano.en, FADE_OUT.mitad, ALTOS.paseo, BAJOS["c06-mitad"]),
    [mitad.fin, BAJOS["c06-mitad"]],
    ...fundido(mitad.fin, Math.min(FADE_IN.mitad, alcobaPlano.en - mitad.fin - 2), BAJOS["c06-mitad"], ALTOS.bloque5),
    // CTA (entra a corte en el golpe): la bajada igual...
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
  const entero: TramoAudio = { id: "musica", src: "recorrido-075/musica-075.wav", en: 0, dur: fin, desde: INICIO_MUSICA, ganancia: puntos, reason: "" };
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
      src: "recorrido-075/musica-075.wav",
      en: a,
      dur: b - a,
      // El frame de fuente en que arranca este trozo: el de la canción en `a` (INICIO_MUSICA es un número entero de frames).
      desde: INICIO_MUSICA + a / FPS_075,
      ganancia,
      reason:
        i === 0
          ? "«Street Level Sessions on the Green»: el golpe de 14,6 dB del f3 abre la pieza; la música baja con curva tras el golpe de cada entrada de Isabella (hook, mitad y CTA) y sube tras las dos primeras; cada corte cae en un golpe medido; la canción se apaga con curva bajo la tarjeta tras «…descubre Go Living Suites». Partida en tramos consecutivos de la misma canción: ffmpeg no admite una expresión de volumen con más de ≈ 80 valores distintos."
          : `«Street Level Sessions on the Green», trozo ${i + 1} de ${cortes.length - 1}: sigue donde acabó el anterior (f${a}), la misma muestra de la canción.`,
    };
  });
};

export const musica075: readonly TramoAudio[] = HAY_MUSICA ? trocea(envolvente(), FIN_MUSICA_075) : [];

/** Lo que monta `<PistaAudio>`. */
export const audio075: readonly TramoAudio[] = [...vocesTomas, ...musica075];
