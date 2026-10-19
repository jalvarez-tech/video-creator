/**
 * EL SONIDO DEL 040 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK05, MD04 y CT02, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, desclic de 3 f (las tres entran a corte) y, como el WAV es el TRATADO
 *                de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a ≈ −15 LUFS en su ventana), UNA ganancia de ±0,1 dB.
 *   musica       «Overcoming the Impossible», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos. No es la de `envolventeBajoVoz`: aquí el golpe en que entra cada toma (a corte) tiene que sonar
 *                entero, la música baja con curva DESPUÉS y acaba ANTES de la primera palabra.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente, `herramientas/lufs-rangos.py`):
 *   voz de Isabella      −15 (regla del canal: «la voz de Isabella a −15 LUFS sin saturar»; sus tomas crudas miden −24,1 · −23,5 · −20,5; tratadas, ≈ −15 con pico real de −2,5)
 *   música SOLA          −15 por tramos, el nivel de la voz: la canción es MUY ALTA (−11,6 en la apertura, −8,9 en el paseo, −9,2 y −13,0 en el bloque 5, con picos de 0,0 a +0,1 dBFS) y NINGÚN tramo se sube: todos BAJAN
 *                        2,0 a 6,1 dB (picos a −2,0 / −3,4 / −6,0 dBFS o menos), así que no hay nada que limitar.
 *   música BAJO LA VOZ   −26 en cada ventana de voz: 11 LU por debajo de ella (`BAJOS`)
 * Una sola ganancia por tramo, sin `loudnorm` (le cambiaría la dinámica). Bajo la voz se mide con la sonoridad de la canción EN cada ventana de voz (`LUFS_CANCION_EN_VOZ`) y el oído decide si compite.
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · La APERTURA abre con el golpe de la canción en el f3 y la música sola; no hay voz.
 *   · El HOOK entra A CORTE en el golpe del f108 (suena entero): la música baja con curva de coseno en 6 f y la primera sílaba suena a los 9,15 f (f117).
 *   · La MITAD, igual: golpe en el f585, bajada de 6 f y primera palabra a los 9,5 f (f594,5). El CTA, igual: golpe en el f935, bajada de 6 f y primera palabra a los 9 f (f944).
 *   · Al acabar la voz la música sube con curva en 24 f, o los que quepan hasta 2 f antes del golpe del plano siguiente: tras el hook caben 23 (el golpe del f305 suena con la música arriba); tras la mitad, 17.
 *   · El bloque 5 lleva DOS niveles: las palmas (f709-799, a −9,2 LUFS en la fuente) y la vista (f799-935, a −13,0): al cambiar de plano la ganancia pasa de uno al otro con una curva de 12 f que empieza 2 f DESPUÉS del
 *     golpe (el golpe suena entero).
 *
 * EL CTA Y EL CIERRE. La canción CAE sola en +31 s (de −9 a −19 LUFS): justo donde entra el CTA. Bajo la voz del CTA queda a −26 LUFS (un lecho) y, al acabar su última palabra (f1049), se APAGA con curva de coseno hasta llegar a
 * cero 2 f antes del final de la pieza, bajo la tarjeta del cierre.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_040, FPS_040, INICIO_MUSICA, OBJETIVO_LUFS, metraje040 } from "./metraje-040";

/** La voz de las tres tomas a cámara (HK05, MD04 y CT02), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje040, { fps: FPS_040, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre. */
const CTA = metraje040.find((c) => c.id === "c10-cta");
if (!CTA) throw new Error("audio-040: falta c10-cta en metraje-040.ts");
export const FIN_CTA_040 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number } => {
  const c = metraje040.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-040: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_040);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_040);
  return { en: ini, dur: fin - ini, fin };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la
 * biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Overcoming the Impossible» entre el 172,7 y el 203,7 s (ebur128): lo que suena en la pieza, en promedio. */
export const LUFS_MESETA = -9.7;
/**
 * Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre la fuente, `herramientas/lufs-rangos.py`): la apertura (f0-108: 172,70-176,20 s), el paseo (f305-585: 182,90-192,10 s), las palmas (f709-799:
 * 196,30-199,20 s) y la vista (f799-935: 199,30-203,70 s).
 */
const LUFS_TRAMO = { apertura: -11.6, paseo: -8.9, palmas: -9.2, vista: -13.0 } as const;
/** El pico real de la canción en la apertura (ebur128, 172,7-176,2 s): 0,0 dBFS. La música nunca pasa de `TECHO_PICO`. */
const PICO_APERTURA = 0.0;
const TECHO_PICO = -0.5;
/**
 * La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente, el tramo de la canción que suena mientras ella habla): lo que mide la puerta en lugar de suponer la meseta en todas.
 * hook: 176,57-182,00 s · mitad: 192,47-195,67 s · CTA: 204,10-207,60 s (la caída de la canción).
 */
export const LUFS_CANCION_EN_VOZ = { "c02-hook": -9.8, "c06-mitad": -8.3, "c10-cta": -19.7 } as const;
/** La música SOLA: el nivel de la voz. */
const OBJETIVO_MUSICA = -15;
/**
 * Ganancia lineal de la música sola en cada tramo: la apertura −3,4 dB (queda a −15 LUFS con el pico a −3,4 dBFS), el paseo −6,1 dB, las palmas −5,8 dB y la vista −2,0 dB sobre el archivo (sus picos, de 0,0 a +0,1
 * dBFS en el archivo, quedan a −2,0 dBFS o menos). Ninguna sube.
 */
export const ALTOS = {
  apertura: Math.min(gananciaHasta(LUFS_TRAMO.apertura, OBJETIVO_MUSICA), Math.pow(10, (TECHO_PICO - PICO_APERTURA) / 20)),
  paseo: gananciaHasta(LUFS_TRAMO.paseo, OBJETIVO_MUSICA),
  palmas: gananciaHasta(LUFS_TRAMO.palmas, OBJETIVO_MUSICA),
  vista: gananciaHasta(LUFS_TRAMO.vista, OBJETIVO_MUSICA),
} as const;
/**
 * Mientras habla Isabella: la música baja hasta −26 LUFS EN CADA VENTANA (11 LU bajo su voz de −15). No es un factor fijo sobre el nivel «solo»: la canción suena a −9,8 · −8,3 · −19,7 LUFS donde hablan el hook, la
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
 *   · FADE-OUT de FADE_OUT f desde el golpe en que entra ella (el golpe suena entero y la música baja DESPUÉS, con curva suave): la curva ACABA ANTES de su primera palabra (a 3,15 · 3,5 · 3 f).
 *   · FADE-IN de FADE_IN f tras su última palabra (con curva suave), o los que queden hasta 2 f antes del golpe del plano siguiente (la subida, a medias, falsearía su medida en `golpes-render.py`).
 */
export const FADE_OUT = { hook: 6, mitad: 6, cta: 6 } as const;
export const FADE_IN = 24;
/** Frames que dura el paso de las palmas a la vista (−9,2 → −13,0 LUFS en la fuente): empieza 2 f después del golpe de la vista, que suena entero. */
const PASO_VISTA = 12;
/** Frames que tarda la música en apagarse tras la última palabra del CTA: hasta 2 f antes del final de la pieza (la tarjeta va en silencio). */
const APAGADO_CTA_HASTA = FIN_MUSICA_040;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** La envolvente: la apertura sola, el hook, la mitad y el CTA con su fundido, el paso a la vista y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c02-hook");
  const mitad = ventanaDe("c06-mitad");
  const cta = ventanaDe("c10-cta");
  const hookPlano = metraje040.find((c) => c.id === "c02-hook");
  const mitadPlano = metraje040.find((c) => c.id === "c06-mitad");
  const ctaPlano = metraje040.find((c) => c.id === "c10-cta");
  const siguienteAlHook = metraje040.find((c) => c.id === "c03-terrazas");
  const siguienteALaMitad = metraje040.find((c) => c.id === "c07-palmas");
  const vistaPlano = metraje040.find((c) => c.id === "c09-vista");
  if (!hookPlano || !mitadPlano || !ctaPlano || !siguienteAlHook || !siguienteALaMitad || !vistaPlano) throw new Error("audio-040: faltan planos en metraje-040.ts");

  const p: [number, number][] = [
    // LA APERTURA: la música sola desde el frame 0 (1 f de entrada para no meter un clic: el golpe de apertura suena en el f3).
    [0, 0],
    [1, ALTOS.apertura],
    // HOOK: entra a corte en el golpe, que suena entero; la música baja con fundido DESPUÉS y sube (los f que quepan) hasta 2 f antes del golpe del paseo.
    [hookPlano.en, ALTOS.apertura],
    ...fundido(hookPlano.en, FADE_OUT.hook, ALTOS.apertura, BAJOS["c02-hook"]),
    [hook.fin, BAJOS["c02-hook"]],
    ...fundido(hook.fin, Math.min(FADE_IN, siguienteAlHook.en - hook.fin - 2), BAJOS["c02-hook"], ALTOS.paseo),
    // MITAD: igual que el hook. MD04 deja 19 f tras su última palabra: la música sube con fundido en los que quepan y está arriba 2 f antes del golpe del plano siguiente.
    [mitadPlano.en, ALTOS.paseo],
    ...fundido(mitadPlano.en, FADE_OUT.mitad, ALTOS.paseo, BAJOS["c06-mitad"]),
    [mitad.fin, BAJOS["c06-mitad"]],
    ...fundido(mitad.fin, Math.min(FADE_IN, siguienteALaMitad.en - mitad.fin - 2), BAJOS["c06-mitad"], ALTOS.palmas),
    // BLOQUE 5: las palmas a su nivel; en el golpe de la vista suena entero y 2 f después la ganancia pasa al de la vista (la canción baja de −9,2 a −13,0 LUFS en la fuente).
    [vistaPlano.en + 2, ALTOS.palmas],
    ...fundido(vistaPlano.en + 2, PASO_VISTA, ALTOS.palmas, ALTOS.vista),
    // CTA: igual...
    [ctaPlano.en, ALTOS.vista],
    ...fundido(ctaPlano.en, FADE_OUT.cta, ALTOS.vista, BAJOS["c10-cta"]),
    [cta.fin, BAJOS["c10-cta"]],
    // ...y al acabar la voz la música se APAGA con curva de coseno hasta cero, 2 f antes del final de la pieza (la tarjeta va en silencio).
    ...fundido(cta.fin, APAGADO_CTA_HASTA - cta.fin, BAJOS["c10-cta"], 0),
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica040: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-040/musica-040.wav",
        en: 0,
        dur: FIN_MUSICA_040,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«Overcoming the Impossible»: el golpe de 15,0 dB del f3 abre el dron, un golpe medido de 9,4 a 11,9 dB en que entra cada plano, y la caída de la canción coincide con el CTA; se apaga bajo la tarjeta tras «…toda la información».",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio040: readonly TramoAudio[] = [...vocesTomas, ...musica040];
