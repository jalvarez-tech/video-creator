/**
 * EL SONIDO DEL 089 — todo lo que suena, como DATOS (`TramoAudio[]`). GENERADO por `montar-retiro.mjs` junto con `metraje-089.ts`; medidas de la música en `proyectos/089/medidas/ventanas-musica.json`.
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK01, MD01 y CT01, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, desclic de 3 f (las tres entran a corte)
 *                y, como el WAV es el TRATADO de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a −15,0 LUFS en su ventana), UNA ganancia de ±0,0 dB.
 *   musica       «Pieza 2 (adagio)», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos. No es la de `envolventeBajoVoz`: aquí el golpe de entrada de cada toma tiene que sonar ENTERO,
 *                la música baja con curva de coseno DESPUÉS y acaba ANTES de la primera palabra (regla del canal desde el 022).
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada ventana de la canción): voz de Isabella −15 · música SOLA −15 en los tres tramos (apertura · paseo · bloque 5) · música BAJO LA VOZ −-30 en cada ventana de voz (≈ 15 LU bajo ella, la regla del encargo; la 079 y las variantes B de la suite iban a −26: 11 LU).
 * Una sola ganancia por tramo, sin `loudnorm` (le cambiaría la dinámica).
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes, volumenDe } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_089, FPS_089, INICIO_MUSICA, OBJETIVO_LUFS, metraje089 } from "./metraje-089";

/** La voz de las tres tomas a cámara, derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje089, { fps: FPS_089, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre; la música sigue apagándose bajo ella. */
const CTA = metraje089.find((c) => c.id === "c11-cta");
if (!CTA) throw new Error("audio-089: falta c11-cta en metraje-089.ts");
export const FIN_CTA_089 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number; ini: number } => {
  const c = metraje089.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-089: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_089);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_089);
  return { en: ini, dur: fin - ini, fin, ini };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/** ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. */
export const HAY_MUSICA = true;

/** Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre el corte): la apertura, los dos planos rápidos y el recorrido. */
export const LUFS_TRAMO = { apertura: -15.6, paseo: -15.7, bloque5: -17.1 } as const;
/** Sonoridad de la canción en cada ventana de VOZ (ebur128, el tramo de la canción que suena mientras ella habla). */
export const LUFS_CANCION_EN_VOZ = { "c02-hook": -15.3, "c05-mitad": -14.7, "c11-cta": -23 } as const;
/** El pico real de la canción en cada tramo sin voz (dBFS): con la ganancia de cada tramo ninguno pasa de −1 dBFS (lo comprueba la puerta). */
export const PICO_TRAMO = { apertura: -6.1, paseo: -4.8, bloque5: -4.9 } as const;
/** La música SOLA por tramos: −15 LUFS, el nivel de la voz. */
export const OBJETIVO_MUSICA = { apertura: -15, paseo: -15, bloque5: -15 } as const;
/** Ganancia lineal de la música sola en cada tramo. */
export const ALTOS = {
  apertura: gananciaHasta(LUFS_TRAMO.apertura, OBJETIVO_MUSICA.apertura),
  paseo: gananciaHasta(LUFS_TRAMO.paseo, OBJETIVO_MUSICA.paseo),
  bloque5: gananciaHasta(LUFS_TRAMO.bloque5, OBJETIVO_MUSICA.bloque5),
} as const;
/** Mientras habla Isabella: la música baja hasta −-30 LUFS EN CADA VENTANA (15 LU bajo su voz de −15). */
export const LUFS_MUSICA_BAJO_VOZ = -30;
export const BAJOS = {
  "c02-hook": gananciaHasta(LUFS_CANCION_EN_VOZ["c02-hook"], LUFS_MUSICA_BAJO_VOZ),
  "c05-mitad": gananciaHasta(LUFS_CANCION_EN_VOZ["c05-mitad"], LUFS_MUSICA_BAJO_VOZ),
  "c11-cta": gananciaHasta(LUFS_CANCION_EN_VOZ["c11-cta"], LUFS_MUSICA_BAJO_VOZ),
} as const;
/**
 * LOS FUNDIDOS (regla del canal: «el sonido cuando cambia a hablar Isabella debe hacer un fade-out / fade-in … para que no se escuche tan cortado»):
 *   · FADE-OUT de FADE_OUT f desde el golpe en que entra su toma (el golpe suena entero y la música baja DESPUÉS, con curva de coseno): la curva ACABA ≥ 2 f antes de su primera palabra.
 *   · FADE-IN de FADE_IN f tras su última palabra (con curva suave), o los que quepan hasta 2 f antes del golpe del plano siguiente.
 */
export const FADE_OUT = { hook: 10, mitad: 10, cta: 10 } as const;
export const FADE_IN = { hook: 15, mitad: 22 } as const;
/** Frames que la música se queda BAJA tras la última palabra del hook antes de subir. */
export const RETRASO_SUBIDA_HOOK = 6;
/** Hasta dónde se apaga la música tras la última palabra del CTA: 2 f antes del final de la pieza (la tarjeta va en silencio). */
const APAGADO_CTA_HASTA = FIN_MUSICA_089;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** La envolvente: la casa sola, el hook, la mitad y el CTA con su fundido, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c02-hook");
  const mitad = ventanaDe("c05-mitad");
  const cta = ventanaDe("c11-cta");
  const hookPlano = metraje089.find((c) => c.id === "c02-hook");
  const paseoPlano = metraje089.find((c) => c.id === "c03-ventanal");
  const mitadPlano = metraje089.find((c) => c.id === "c05-mitad");
  const recorridoPlano = metraje089.find((c) => c.id === "c06-pasillo");
  const ctaPlano = metraje089.find((c) => c.id === "c11-cta");
  if (!hookPlano || !paseoPlano || !mitadPlano || !recorridoPlano || !ctaPlano) throw new Error("audio-089: faltan planos en metraje-089.ts");

  const p: [number, number][] = [
    // LA APERTURA: la música sola desde el frame 0 (1 f de entrada para no meter un clic: el golpe de entrada suena en el f3).
    [0, 0],
    [1, ALTOS.apertura],
    // HOOK (entra a corte en un golpe): el golpe suena entero y la música baja con fundido DESPUÉS; sube con fundido (los f que quepan) hasta el plano siguiente.
    [hookPlano.en, ALTOS.apertura],
    ...fundido(hookPlano.en, FADE_OUT.hook, ALTOS.apertura, BAJOS["c02-hook"]),
    [hook.fin, BAJOS["c02-hook"]],
    [hook.fin + RETRASO_SUBIDA_HOOK, BAJOS["c02-hook"]],
    ...fundido(hook.fin + RETRASO_SUBIDA_HOOK, Math.min(FADE_IN.hook, paseoPlano.en - (hook.fin + RETRASO_SUBIDA_HOOK) - 2), BAJOS["c02-hook"], ALTOS.paseo),
    // MITAD (entra a corte en el golpe): igual; tras ella la música sube en los f que quepan hasta el primer plano del recorrido.
    [mitadPlano.en, ALTOS.paseo],
    ...fundido(mitadPlano.en, FADE_OUT.mitad, ALTOS.paseo, BAJOS["c05-mitad"]),
    [mitad.fin, BAJOS["c05-mitad"]],
    ...fundido(mitad.fin, Math.min(FADE_IN.mitad, recorridoPlano.en - mitad.fin - 2), BAJOS["c05-mitad"], ALTOS.bloque5),
    // CTA (entra a corte en el golpe): la bajada igual...
    [ctaPlano.en, ALTOS.bloque5],
    ...fundido(ctaPlano.en, FADE_OUT.cta, ALTOS.bloque5, BAJOS["c11-cta"]),
    [cta.fin, BAJOS["c11-cta"]],
    // ...y al acabar la voz la música se APAGA con curva de coseno hasta cero, 2 f antes del final de la pieza (la tarjeta va en silencio).
    ...fundido(cta.fin, APAGADO_CTA_HASTA - cta.fin, BAJOS["c11-cta"], 0),
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

/**
 * Remotion le pasa el volumen a ffmpeg como UNA expresión `if(between(t,…),valor,if(…))` con un `if` por cada valor distinto de la ganancia (a 3 decimales), y ffmpeg no admite más de ≈ 80 `if`
 * anidados. Una envolvente con rampas largas se PARTE en tramos de la misma canción, consecutivos y sin solape (cada uno empieza en el frame de fuente en que acabó el anterior: es la misma muestra).
 */
const MAX_VALORES = 60;

/** La envolvente `puntos` (frames absolutos de la comp) partida en tramos consecutivos de la canción, cada uno con su trozo de envolvente. */
const trocea = (puntos: [number, number][], fin: number): TramoAudio[] => {
  const entero: TramoAudio = { id: "musica", src: "recorrido-089/musica-089.wav", en: 0, dur: fin, desde: INICIO_MUSICA, ganancia: puntos, reason: "" };
  const v = (f: number): number => volumenDe(entero, f);
  const redondea = (x: number): number => Math.round(x * 1000) / 1000;
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
      src: "recorrido-089/musica-089.wav",
      en: a,
      dur: b - a,
      // El frame de fuente en que arranca este trozo: el de la canción en `a` (INICIO_MUSICA es un número entero de frames).
      desde: INICIO_MUSICA + a / FPS_089,
      ganancia,
      reason:
        i === 0
          ? "«Pieza 2 (adagio)»: el golpe del f3 abre la pieza; la música baja con curva tras el golpe de cada entrada de Isabella (hook, mitad y CTA) y sube tras las dos primeras; cada corte cae en un golpe medido; la canción se apaga con curva bajo la tarjeta. Partida en tramos consecutivos de la misma canción: ffmpeg no admite una expresión de volumen con más de ≈ 80 valores distintos."
          : `«Pieza 2 (adagio)», trozo ${i + 1} de ${cortes.length - 1}: sigue donde acabó el anterior (f${a}), la misma muestra de la canción.`,
    };
  });
};

export const musica089: readonly TramoAudio[] = HAY_MUSICA ? trocea(envolvente(), FIN_MUSICA_089) : [];

/** Lo que monta `<PistaAudio>`. */
export const audio089: readonly TramoAudio[] = [...vocesTomas, ...musica089];
