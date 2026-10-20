/**
 * EL SONIDO DEL 045 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK01, MD01 y CT01, derivada de los cortes que traen `audio` (`vocesDeCortes`): HK01 entra con una disolvencia (cruce de voz de 6 f, sobre el silencio previo a su primera palabra), MD01 y
 *                CT01 a corte (desclic de 3 f). El WAV es el TRATADO de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a ≈ −15 LUFS en su ventana): UNA ganancia de ±0,1 dB.
 *   musica       «Fortitude (Light Version)», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos. No es la de `envolventeBajoVoz`: aquí el golpe en que entra cada toma tiene que sonar
 *                entero, la música baja con curva DESPUÉS y acaba ANTES de la primera palabra.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente, `herramientas/lufs-rangos.py`):
 *   voz de Isabella      −15 (pedido del usuario: «la voz de Isabella a −15 LUFS sin saturar»; sus tomas crudas miden −21,5 · −21,3 · −20,8; tratadas, ≈ −15 con pico real de −2,5)
 *   música SOLA          −15 por tramos, el nivel de la voz, CON UN TECHO de pico de −0,5 dBFS: la canción es SUAVE en los s 10-45 (−20,5 · −19,7 · −18,0 LUFS en la apertura, el paseo y el bloque 5), así que sube de +2,8 a +5,5 dB, y el
 *                        paseo (pico de −4,7 dBFS en el archivo) llega a −15,5 LUFS en lugar de −15,0: el techo manda (declarado en `combinaciones.md`).
 *   música BAJO LA VOZ   −26 en cada ventana de voz: 11 LU por debajo de ella (`BAJOS`)
 * Una sola ganancia por tramo, sin `loudnorm` (le cambiaría la dinámica). Bajo la voz se mide con la sonoridad de la canción EN cada ventana de voz (`LUFS_CANCION_EN_VOZ`) y el oído decide si compite.
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · La APERTURA abre con el golpe de la canción en el f3 y la música sola; no hay voz.
 *   · El HOOK entra con una DISOLVENCIA que acaba en el golpe del f111 (suena entero: la música baja con curva de coseno en 6 f DESPUÉS) y la primera palabra suena a los 10 f (f121).
 *   · La MITAD, igual pero a corte: golpe en el f623, bajada de 6 f y primera palabra a los 10 f (f633). El CTA, igual: golpe en el f1114, bajada de 6 f y primera palabra a los 10 f (f1124).
 *   · Al acabar la voz la música sube con curva en 24 f, o los que quepan hasta 2 f antes del golpe del plano siguiente: tras el hook caben 16 (el golpe del plano siguiente, f313, suena con la música arriba); tras la
 *     mitad, 11 (la toma de MD01 deja 13 f de aire hasta el golpe del f769).
 *
 * EL CTA Y EL CIERRE. La canción NO resuelve sola en este tramo (entra una sección más suave a los 50 s, pero la pieza acaba antes): bajo la voz del CTA queda a −26 LUFS (un lecho) y, al acabar su última palabra (f1239), se
 * APAGA con curva de coseno hasta llegar a cero 2 f antes del final de la pieza, bajo la tarjeta del cierre.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_045, FPS_045, INICIO_MUSICA, OBJETIVO_LUFS, metraje045 } from "./metraje-045";

/** La voz de las tres tomas a cámara (HK01, MD01 y CT01), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje045, { fps: FPS_045, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre. */
const CTA = metraje045.find((c) => c.id === "c10-cta");
if (!CTA) throw new Error("audio-045: falta c10-cta en metraje-045.ts");
export const FIN_CTA_045 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number } => {
  const c = metraje045.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-045: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_045);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_045);
  return { en: ini, dur: fin - ini, fin };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la
 * biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Fortitude (Light Version)» entre el 9,8 y el 51 s (ebur128): lo que suena en la pieza, en promedio. */
export const LUFS_MESETA = -19.0;
/** Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre la fuente): la apertura (f0-111, 9,8-13,5 s), el paseo (f313-623, 20,2-30,6 s) y el bloque 5 (f769-1114, 35,4-46,9 s). */
const LUFS_TRAMO = { apertura: -20.5, paseo: -19.7, bloque5: -18.0 } as const;
/**
 * El pico real de la canción en cada uno de esos tramos (ebur128): −6,8 · −4,7 · −3,3 dBFS. La música nunca pasa de `TECHO_PICO`. El golpe en que entra el CTA (46,873 s, 15,5 dB) es MÁS fuerte que todo el bloque 5 (pico
 * de −2,1 dBFS en 46,85-47,1 s): la prueba midió +0,01 dBFS justo ahí (f1117) con la ganancia del bloque, así que la música baja ≈ 1,7 dB en los 20 f anteriores (`ALTOS.cta`) para que ese golpe llegue a ≤ −0,5 dBFS.
 */
const PICO_TRAMO = { apertura: -6.8, paseo: -4.7, bloque5: -3.3 } as const;
const PICO_GOLPE_CTA = -1.6; // medido −2,1 dBFS: se deja 0,5 dB de margen porque la prueba 2, con −2,1, midió −0,43 dBFS en el MP4 (el AAC se pasa unas décimas)
const TECHO_PICO = -0.5;
/**
 * La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente, el tramo de la canción que suena mientras ella habla): lo que mide la puerta en lugar de suponer la meseta en todas.
 */
export const LUFS_CANCION_EN_VOZ = { "c02-hook": -19.9, "c06-mitad": -19.7, "c10-cta": -19.5 } as const;
/** La música SOLA: el nivel de la voz. */
const OBJETIVO_MUSICA = -15;
/** Ganancia lineal que lleva un tramo de `lufs` a `OBJETIVO_MUSICA` sin pasar del techo de pico (`TECHO_PICO`). */
const altoDe = (lufs: number, pico: number): number => Math.min(gananciaHasta(lufs, OBJETIVO_MUSICA), Math.pow(10, (TECHO_PICO - pico) / 20));
/**
 * Ganancia lineal de la música sola en cada tramo: la apertura +5,5 dB (−15,0 LUFS, pico −1,3 dBFS), el paseo +4,2 dB (el techo: −15,5 LUFS) y el bloque 5 +2,8 dB (el techo: −15,2 LUFS) sobre el archivo; el golpe del CTA, +1,1 dB.
 */
export const ALTOS = {
  apertura: altoDe(LUFS_TRAMO.apertura, PICO_TRAMO.apertura),
  paseo: altoDe(LUFS_TRAMO.paseo, PICO_TRAMO.paseo),
  bloque5: altoDe(LUFS_TRAMO.bloque5, PICO_TRAMO.bloque5),
  /** El nivel «solo» con que suena el golpe en que entra el CTA: el del bloque 5 limitado por el pico de ese golpe. */
  cta: altoDe(LUFS_TRAMO.bloque5, PICO_GOLPE_CTA),
} as const;
/**
 * Mientras habla Isabella: la música baja hasta −26 LUFS EN CADA VENTANA (11 LU bajo su voz de −15). No es un factor fijo sobre el nivel «solo»: la canción suena a −19,9 · −19,7 · −19,5 LUFS donde hablan el hook, la
 * mitad y el CTA. La ganancia absoluta que deja cada ventana en −26 es la de `gananciaHasta`.
 */
export const LUFS_MUSICA_BAJO_VOZ = -26;
export const BAJOS = {
  "c02-hook": gananciaHasta(LUFS_CANCION_EN_VOZ["c02-hook"], LUFS_MUSICA_BAJO_VOZ),
  "c06-mitad": gananciaHasta(LUFS_CANCION_EN_VOZ["c06-mitad"], LUFS_MUSICA_BAJO_VOZ),
  "c10-cta": gananciaHasta(LUFS_CANCION_EN_VOZ["c10-cta"], LUFS_MUSICA_BAJO_VOZ),
} as const;
/**
 * LOS FUNDIDOS (pedido del usuario en la V6, ya regla del canal: «el sonido cuando cambia a hablar Isabella debe hacer un fade-out / fade-in cuando retome para que no se escuche ahí mismo tan cortado»):
 *   · FADE-OUT de FADE_OUT f desde el golpe en que entra ella (el golpe suena entero y la música baja DESPUÉS, con curva suave): la curva ACABA ANTES de su primera palabra (a 3,5 · 2,9 · 3 f).
 *   · FADE-IN de FADE_IN f tras su última palabra (con curva suave), o los que queden hasta 2 f antes del golpe del plano siguiente (la subida, a medias, falsearía su medida en `golpes-render.py`).
 */
export const FADE_OUT = { hook: 6, mitad: 6, cta: 6 } as const;
export const FADE_IN = 24;
/** Frames que tarda la música en apagarse tras la última palabra del CTA: hasta 2 f antes del final de la pieza (la tarjeta va en silencio). */
const APAGADO_CTA_HASTA = FIN_MUSICA_045;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** La envolvente: la bajada sola, el hook, la mitad y el CTA con su fundido, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c02-hook");
  const mitad = ventanaDe("c06-mitad");
  const cta = ventanaDe("c10-cta");
  const hookPlano = metraje045.find((c) => c.id === "c02-hook");
  const mitadPlano = metraje045.find((c) => c.id === "c06-mitad");
  const ctaPlano = metraje045.find((c) => c.id === "c10-cta");
  const siguienteAlHook = metraje045.find((c) => c.id === "c03-social-kitchen");
  const siguienteALaMitad = metraje045.find((c) => c.id === "c07-alcoba");
  if (!hookPlano || !mitadPlano || !ctaPlano || !siguienteAlHook || !siguienteALaMitad) throw new Error("audio-045: faltan planos en metraje-045.ts");

  const p: [number, number][] = [
    // LA BAJADA: la música sola desde el frame 0 (1 f de entrada para no meter un clic: el golpe de apertura suena en el f3).
    [0, 0],
    [1, ALTOS.apertura],
    // HOOK: la disolvencia ACABA en el golpe, que suena entero; la música baja con fundido DESPUÉS y sube (los f que quepan) hasta 2 f antes del golpe del plano siguiente.
    [hookPlano.en, ALTOS.apertura],
    ...fundido(hookPlano.en, FADE_OUT.hook, ALTOS.apertura, BAJOS["c02-hook"]),
    [hook.fin, BAJOS["c02-hook"]],
    ...fundido(hook.fin, Math.min(FADE_IN, siguienteAlHook.en - hook.fin - 2), BAJOS["c02-hook"], ALTOS.paseo),
    // MITAD: igual que el hook. MD05 deja 9,6 f tras su última palabra: la música sube con fundido en los que quepan y está arriba 2 f antes del golpe del plano siguiente.
    [mitadPlano.en, ALTOS.paseo],
    ...fundido(mitadPlano.en, FADE_OUT.mitad, ALTOS.paseo, BAJOS["c06-mitad"]),
    [mitad.fin, BAJOS["c06-mitad"]],
    ...fundido(mitad.fin, Math.min(FADE_IN, siguienteALaMitad.en - mitad.fin - 2), BAJOS["c06-mitad"], ALTOS.bloque5),
    // CTA: igual..., con una bajada de ≈ 1,7 dB en los 20 f anteriores (una rampa de 90 f rompió el mezclado del render: `remotion-volumen-limite-ffmpeg`) para que el golpe de 15,5 dB en que entra no pase de −0,5 dBFS.
    [ctaPlano.en - 20, ALTOS.bloque5],
    [ctaPlano.en, ALTOS.cta],
    ...fundido(ctaPlano.en, FADE_OUT.cta, ALTOS.cta, BAJOS["c10-cta"]),
    [cta.fin, BAJOS["c10-cta"]],
    // ...y al acabar la voz la música se APAGA con curva de coseno hasta cero, 2 f antes del final de la pieza (la tarjeta va en silencio).
    ...fundido(cta.fin, APAGADO_CTA_HASTA - cta.fin, BAJOS["c10-cta"], 0),
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica045: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-045/musica-045.wav",
        en: 0,
        dur: FIN_MUSICA_045,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«Fortitude (Light Version)»: el golpe de 11,3 dB del f3 abre la apertura, un golpe medido de 6,1 a 15,5 dB en que entra cada plano (la música vuelve a su nivel tras el hook en el f313), y se apaga bajo la tarjeta tras «…contáctanos».",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio045: readonly TramoAudio[] = [...vocesTomas, ...musica045];
