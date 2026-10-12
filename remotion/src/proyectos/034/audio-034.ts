/**
 * EL SONIDO DEL 034 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK03, MD03 y CT03 (recortado), derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, desclic de 3 f (las tres entran a corte) y, como
 *                el WAV es el TRATADO de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a −15 LUFS en su ventana), UNA ganancia de ±0,1 dB.
 *   musica       «Chillin' (Chillstep Mix)», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos y bajo la tarjeta. No es la de `envolventeBajoVoz`: aquí el golpe en que entra cada toma
 *                (a corte) tiene que sonar entero, la música baja con curva DESPUÉS y acaba ANTES de la primera palabra.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente):
 *   voz de Isabella      −15 (pedido del encargo: «la voz de Isabella a −15 LUFS sin saturar»; sus tomas crudas miden −24,6 · −23,6 · −26,7; tratadas, −15,1 · −15,1 · −15,0 con pico real de −2,5 · −2,5 · −3,8 dBFS)
 *   música SOLA          −15 por tramos, el nivel de la voz (pedido del canal desde la V12): el paseo, a −17,5 LUFS en la fuente, SUBE 2,5 dB (pico −1,6 dBFS); el bloque 5, a −14,6, BAJA 0,4 dB; y la apertura, a
 *                        −17,0 con un pico de +0,3 dBFS en la fuente, NO se sube: BAJA 0,8 dB para dejar el pico en −0,5 dBFS (encargo: «si es baja, no se sube por encima de 0 dBFS de pico») y suena a −17,8.
 *   música BAJO LA VOZ   −26 en cada ventana de voz: 11 LU por debajo de ella (`BAJOS`: −10,1 · −8,7 · −11,4 dB sobre el archivo en el hook, la mitad y el CTA)
 * Una sola ganancia por tramo, sin `loudnorm` (le cambiaría la dinámica). Bajo la voz se mide con la sonoridad de la canción EN cada ventana de voz (`LUFS_CANCION_EN_VOZ`) y el oído decide si compite.
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · El LOTE abre con el golpe de la canción en el f3 y la música sola; no hay voz.
 *   · El HOOK entra A CORTE en el golpe del f100 (suena entero): la música baja con curva de coseno en 6 f y la primera palabra suena a los 7,8 f (f108).
 *   · La MITAD, igual: golpe en el f497, bajada de 6 f y primera palabra a los 8,2 f (f505).
 *   · El CTA, igual: golpe en el f841, bajada de 6 f y primera palabra a los 8,4 f (f849).
 *   · Al acabar la voz la música sube con curva en 24 f, o los que quepan hasta 2 f antes del golpe del plano siguiente: tras el hook caben 14 y tras la mitad 11 (las tomas de este lote son cortas: HK03 dura 179 f
 *     y MD03 deja 12,6 f de aire hasta el golpe del f640). La música está arriba en los dos golpes.
 *
 * EL CTA Y LA RESOLUCIÓN. La canción se resuelve SOLA: su caída en LUFS cae en el f887 (294,5 s; −13,3 → −22,3 → −53,5 LUFS en tramos de 5 s), 2 f después de la última palabra del CTA (f885). Al acabar la voz la
 * música sube a su nivel «solo» en 14 f (lo que suena ya es la cola de la caída) y se lleva a cero, en línea recta, hasta 2 f antes del final de la pieza, bajo la tarjeta.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_034, FPS_034, INICIO_MUSICA, OBJETIVO_LUFS, metraje034 } from "./metraje-034";

/** La voz de las tres tomas a cámara (HK03, MD03 y CT03 recortado), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje034, { fps: FPS_034, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre y la música tiene que estar a su nivel «solo» (la cola de la caída). */
const CTA = metraje034.find((c) => c.id === "c10-cta");
if (!CTA) throw new Error("audio-034: falta c10-cta en metraje-034.ts");
export const FIN_CTA_034 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number } => {
  const c = metraje034.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-034: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_034);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_034);
  return { en: ini, dur: fin - ini, fin };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la
 * biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Chillin'» entre el 264,9 y el 294,5 s (ebur128): lo que suena en la pieza, en promedio. */
export const LUFS_MESETA = -16.3;
/** Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre la fuente): la apertura (f0-100), el paseo (f268-497) y el bloque 5 (f640-841). */
const LUFS_TRAMO = { apertura: -17.0, paseo: -17.5, bloque5: -14.6 } as const;
/** El pico real de la canción en la apertura (ebur128, 264,9-268,3 s): +0,3 dBFS. Ahí la música no se sube: se deja con el pico en `TECHO_PICO`. */
const PICO_APERTURA = 0.3;
const TECHO_PICO = -0.5;
/**
 * La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente, el tramo de la canción que suena mientras ella habla): lo que mide la puerta en lugar de suponer la meseta en todas.
 */
export const LUFS_CANCION_EN_VOZ = { "c02-hook": -15.9, "c06-mitad": -17.3, "c10-cta": -14.6 } as const;
/** La música SOLA: el nivel de la voz. */
const OBJETIVO_MUSICA = -15;
/**
 * Ganancia lineal de la música sola en cada tramo: la apertura −0,8 dB (topada por su pico: queda a −17,8 LUFS), el paseo +2,5 dB y el bloque 5 −0,4 dB sobre el archivo (sus picos, de −4,1 y −1,2 dBFS en el archivo,
 * quedan a −1,6 dBFS).
 */
export const ALTOS = {
  apertura: Math.min(gananciaHasta(LUFS_TRAMO.apertura, OBJETIVO_MUSICA), Math.pow(10, (TECHO_PICO - PICO_APERTURA) / 20)),
  paseo: gananciaHasta(LUFS_TRAMO.paseo, OBJETIVO_MUSICA),
  bloque5: gananciaHasta(LUFS_TRAMO.bloque5, OBJETIVO_MUSICA),
} as const;
/**
 * Mientras habla Isabella: la música baja hasta −26 LUFS EN CADA VENTANA (11 LU bajo su voz de −15). No es un factor fijo sobre el nivel «solo»: la canción suena a −15,9 · −17,3 · −14,6 LUFS donde hablan el hook, la mitad
 * y el CTA. La ganancia absoluta que deja cada ventana en −26 es la de `gananciaHasta`.
 */
export const LUFS_MUSICA_BAJO_VOZ = -26;
export const BAJOS = {
  "c02-hook": gananciaHasta(LUFS_CANCION_EN_VOZ["c02-hook"], LUFS_MUSICA_BAJO_VOZ),
  "c06-mitad": gananciaHasta(LUFS_CANCION_EN_VOZ["c06-mitad"], LUFS_MUSICA_BAJO_VOZ),
  "c10-cta": gananciaHasta(LUFS_CANCION_EN_VOZ["c10-cta"], LUFS_MUSICA_BAJO_VOZ),
} as const;
/**
 * LOS FUNDIDOS (pedido del usuario en la V6, ya regla del canal: «el sonido cuando cambia a hablar Isabella debe hacer un fade-out / fade-in cuando retome para que no se escuche ahí mismo tan cortado»):
 *   · FADE-OUT de FADE_OUT f desde el golpe en que entra ella (el golpe suena entero y la música baja DESPUÉS, con curva suave): la curva ACABA ANTES de su primera palabra: el hook, a 1,8 f (f106 → f107,8); la mitad,
 *     a 2,2 f (f503 → f505,2); el CTA, a 2,4 f (f847 → f849,4).
 *   · FADE-IN de FADE_IN f tras su última palabra (con curva suave: sale despacio y acaba deprisa), o los que queden hasta 2 f antes del golpe del plano siguiente (la subida, a medias, falsearía su medida en `golpes-render.py`).
 */
export const FADE_OUT = { hook: 6, mitad: 6, cta: 6 } as const;
export const FADE_IN = 24;
/** Frames que tarda la música en volver a su nivel «solo» tras la última palabra del CTA (lo que queda de la cola suena a su ganancia). */
const SUBIDA_CTA = 14;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** La envolvente: la casa sola, el hook, la mitad y el CTA con su fundido, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c02-hook");
  const mitad = ventanaDe("c06-mitad");
  const cta = ventanaDe("c10-cta");
  const hookPlano = metraje034.find((c) => c.id === "c02-hook");
  const mitadPlano = metraje034.find((c) => c.id === "c06-mitad");
  const ctaPlano = metraje034.find((c) => c.id === "c10-cta");
  const siguienteAlHook = metraje034.find((c) => c.id === "c03-arboles");
  const siguienteALaMitad = metraje034.find((c) => c.id === "c07-lote");
  if (!hookPlano || !mitadPlano || !ctaPlano || !siguienteAlHook || !siguienteALaMitad) throw new Error("audio-034: faltan planos en metraje-034.ts");

  const p: [number, number][] = [
    // EL LOTE: la música sola desde el frame 0 (1 f de entrada para no meter un clic: el golpe de apertura suena en el f3).
    [0, 0],
    [1, ALTOS.apertura],
    // HOOK: entra a corte en el golpe, que suena entero; la música baja con fundido DESPUÉS y sube (los f que quepan) hasta 2 f antes del golpe del plano siguiente.
    [hookPlano.en, ALTOS.apertura],
    ...fundido(hookPlano.en, FADE_OUT.hook, ALTOS.apertura, BAJOS["c02-hook"]),
    [hook.fin, BAJOS["c02-hook"]],
    ...fundido(hook.fin, Math.min(FADE_IN, siguienteAlHook.en - hook.fin - 2), BAJOS["c02-hook"], ALTOS.paseo),
    // MITAD: igual que el hook. MD03 deja 12,6 f tras su última palabra: la música sube con fundido en 11 f y está arriba 2 f antes del golpe del plano siguiente.
    [mitadPlano.en, ALTOS.paseo],
    ...fundido(mitadPlano.en, FADE_OUT.mitad, ALTOS.paseo, BAJOS["c06-mitad"]),
    [mitad.fin, BAJOS["c06-mitad"]],
    ...fundido(mitad.fin, Math.min(FADE_IN, siguienteALaMitad.en - mitad.fin - 2), BAJOS["c06-mitad"], ALTOS.bloque5),
    // CTA: igual...
    [ctaPlano.en, ALTOS.bloque5],
    ...fundido(ctaPlano.en, FADE_OUT.cta, ALTOS.bloque5, BAJOS["c10-cta"]),
    [cta.fin, BAJOS["c10-cta"]],
    // ...y al acabar la voz la música vuelve a su nivel «solo»: la canción ya ha caído, así que lo que suena es su cola.
    ...fundido(cta.fin, Math.min(SUBIDA_CTA, FIN_CTA_034 - cta.fin), BAJOS["c10-cta"], ALTOS.bloque5),
    // La cola suena a su nivel hasta que acaba la toma y se apaga en línea recta bajo la tarjeta.
    [FIN_CTA_034, ALTOS.bloque5],
    [FIN_MUSICA_034, 0],
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica034: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-034/musica-034.wav",
        en: 0,
        dur: FIN_MUSICA_034,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«Chillin' (Chillstep Mix)»: el golpe de 15,8 dB del f3 abre el lote, un golpe medido en que entra cada plano, y su caída a partir del f887 (los 294,5 s de la canción), justo tras «…una visita», con la cola apagándose bajo la tarjeta del cierre; baja a −26 LUFS (11 LU bajo la voz de Isabella) en el hook, la mitad y el CTA.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio034: readonly TramoAudio[] = [...vocesTomas, ...musica034];
