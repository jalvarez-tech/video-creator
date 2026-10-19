/**
 * EL SONIDO DEL 043 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK06, MD06 y CT03, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, desclic de 3 f (las tres entran a corte) y, como el WAV es el TRATADO
 *                de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a ≈ −15 LUFS en su ventana), UNA ganancia de ±0,1 dB.
 *   musica       «Luxury, Elegance, Refined», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos. No es la de `envolventeBajoVoz`: aquí el golpe en que entra cada toma (a corte) tiene que sonar
 *                entero, la música baja con curva DESPUÉS y acaba ANTES de la primera palabra.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente, `herramientas/lufs-rangos.py`):
 *   voz de Isabella      −15 (pedido del usuario: «la voz de Isabella a −15 LUFS sin saturar»; sus tomas crudas miden −21,9 · −22,4 · −23,5; tratadas, ≈ −15 con pico real de −2,5)
 *   música SOLA          −15 por tramos, el nivel de la voz: la canción es plana y de ≈ −15 LUFS en todo el tramo (−14,7 en la apertura, −15,1 en el paseo, −15,0 en el bloque 5; picos de −2,7 a −3,8 dBFS), así que las
 *                        ganancias son de ≈ 0 dB y nada se limita.
 *   música BAJO LA VOZ   −26 en cada ventana de voz: 11 LU por debajo de ella (`BAJOS`)
 * Una sola ganancia por tramo, sin `loudnorm` (le cambiaría la dinámica). Bajo la voz se mide con la sonoridad de la canción EN cada ventana de voz (`LUFS_CANCION_EN_VOZ`) y el oído decide si compite.
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · La APERTURA abre con el golpe de la canción en el f3 y la música sola; no hay voz.
 *   · El HOOK entra A CORTE en el golpe del f100 (suena entero): la música baja con curva de coseno en 6 f y la primera palabra suena a los 10,5 f (f110,5).
 *   · La MITAD, igual: golpe en el f516, bajada de 6 f y primera palabra a los 10,2 f (f526). El CTA, igual: golpe en el f937, bajada de 6 f y primera palabra a los 12,9 f (f950).
 *   · Al acabar la voz la música sube con curva en 24 f, o los que quepan hasta 2 f antes del golpe del plano siguiente: tras el hook caben 10 (el golpe del plano siguiente, f267, suena con la música arriba); tras la
 *     mitad, 16 (la toma de MD06 deja 18,6 f de aire hasta el golpe del f672).
 *
 * EL CTA Y EL CIERRE. La canción es PLANA y NO resuelve sola: bajo la voz del CTA queda a −26 LUFS (un lecho) y, al acabar su última palabra (f1022), se APAGA con curva de coseno hasta llegar a cero 2 f antes del final
 * de la pieza, bajo la tarjeta del cierre.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_043, FPS_043, INICIO_MUSICA, OBJETIVO_LUFS, metraje043 } from "./metraje-043";

/** La voz de las tres tomas a cámara (HK02, MD05 y CT02), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje043, { fps: FPS_043, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre. */
const CTA = metraje043.find((c) => c.id === "c10-cta");
if (!CTA) throw new Error("audio-043: falta c10-cta en metraje-043.ts");
export const FIN_CTA_043 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number } => {
  const c = metraje043.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-043: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_043);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_043);
  return { en: ini, dur: fin - ini, fin };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la
 * biblioteca de Luxur (marcada † en el catálogo, «Oficial Vídeo Clipe») y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Luxury, Elegance, Refined» entre el 16,1 y el 53 s (ebur128): lo que suena en la pieza, en promedio. */
export const LUFS_MESETA = -14.7;
/** Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre la fuente): la apertura (f0-100), el paseo (f267-516) y el bloque 5 (f672-937). */
const LUFS_TRAMO = { apertura: -14.7, paseo: -15.1, bloque5: -15.0 } as const;
/** El pico real de la canción en la apertura (ebur128, 16,1-19,5 s): −3,8 dBFS. La música nunca pasa de `TECHO_PICO`. */
const PICO_APERTURA = -3.8;
const TECHO_PICO = -0.5;
/**
 * La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente, el tramo de la canción que suena mientras ella habla): lo que mide la puerta en lugar de suponer la meseta en todas.
 */
export const LUFS_CANCION_EN_VOZ = { "c02-hook": -14.6, "c06-mitad": -13.9, "c10-cta": -15.1 } as const;
/** La música SOLA: el nivel de la voz. */
const OBJETIVO_MUSICA = -15;
/**
 * Ganancia lineal de la música sola en cada tramo: la apertura −0,3 dB, el paseo +0,1 dB y el bloque 5 0,0 dB sobre el archivo (sus picos, de −3,8 a −2,7 dBFS en el archivo, quedan por debajo de −2,6 dBFS).
 * Nada cerca de 0 dBFS: no hay nada que limitar.
 */
export const ALTOS = {
  apertura: Math.min(gananciaHasta(LUFS_TRAMO.apertura, OBJETIVO_MUSICA), Math.pow(10, (TECHO_PICO - PICO_APERTURA) / 20)),
  paseo: gananciaHasta(LUFS_TRAMO.paseo, OBJETIVO_MUSICA),
  bloque5: gananciaHasta(LUFS_TRAMO.bloque5, OBJETIVO_MUSICA),
} as const;
/**
 * Mientras habla Isabella: la música baja hasta −26 LUFS EN CADA VENTANA (11 LU bajo su voz de −15). No es un factor fijo sobre el nivel «solo»: la canción suena a −12,2 · −11,3 · −11,4 LUFS donde hablan el hook, la
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
const APAGADO_CTA_HASTA = FIN_MUSICA_043;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** La envolvente: la bajada sola, el hook, la mitad y el CTA con su fundido, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c02-hook");
  const mitad = ventanaDe("c06-mitad");
  const cta = ventanaDe("c10-cta");
  const hookPlano = metraje043.find((c) => c.id === "c02-hook");
  const mitadPlano = metraje043.find((c) => c.id === "c06-mitad");
  const ctaPlano = metraje043.find((c) => c.id === "c10-cta");
  const siguienteAlHook = metraje043.find((c) => c.id === "c03-vegetacion");
  const siguienteALaMitad = metraje043.find((c) => c.id === "c07-porton");
  if (!hookPlano || !mitadPlano || !ctaPlano || !siguienteAlHook || !siguienteALaMitad) throw new Error("audio-043: faltan planos en metraje-043.ts");

  const p: [number, number][] = [
    // LA BAJADA: la música sola desde el frame 0 (1 f de entrada para no meter un clic: el golpe de apertura suena en el f3).
    [0, 0],
    [1, ALTOS.apertura],
    // HOOK: entra a corte en el golpe, que suena entero; la música baja con fundido DESPUÉS y sube (los f que quepan) hasta 2 f antes del golpe del drop.
    [hookPlano.en, ALTOS.apertura],
    ...fundido(hookPlano.en, FADE_OUT.hook, ALTOS.apertura, BAJOS["c02-hook"]),
    [hook.fin, BAJOS["c02-hook"]],
    ...fundido(hook.fin, Math.min(FADE_IN, siguienteAlHook.en - hook.fin - 2), BAJOS["c02-hook"], ALTOS.paseo),
    // MITAD: igual que el hook. MD05 deja 9,6 f tras su última palabra: la música sube con fundido en los que quepan y está arriba 2 f antes del golpe del plano siguiente.
    [mitadPlano.en, ALTOS.paseo],
    ...fundido(mitadPlano.en, FADE_OUT.mitad, ALTOS.paseo, BAJOS["c06-mitad"]),
    [mitad.fin, BAJOS["c06-mitad"]],
    ...fundido(mitad.fin, Math.min(FADE_IN, siguienteALaMitad.en - mitad.fin - 2), BAJOS["c06-mitad"], ALTOS.bloque5),
    // CTA: igual...
    [ctaPlano.en, ALTOS.bloque5],
    ...fundido(ctaPlano.en, FADE_OUT.cta, ALTOS.bloque5, BAJOS["c10-cta"]),
    [cta.fin, BAJOS["c10-cta"]],
    // ...y al acabar la voz la música se APAGA con curva de coseno hasta cero, 2 f antes del final de la pieza (la tarjeta va en silencio).
    ...fundido(cta.fin, APAGADO_CTA_HASTA - cta.fin, BAJOS["c10-cta"], 0),
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica043: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-043/musica-043.wav",
        en: 0,
        dur: FIN_MUSICA_043,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«Luxury, Elegance, Refined»: el golpe de 18,6 dB del f3 abre la apertura, un golpe medido de 12,7 a 25,0 dB en que entra cada plano (la música vuelve a su nivel tras el hook en el f267), y se apaga bajo la tarjeta tras «…una visita».",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio043: readonly TramoAudio[] = [...vocesTomas, ...musica043];
