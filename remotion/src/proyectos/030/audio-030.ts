/**
 * EL SONIDO DEL 030 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK04, MD02 y CT01, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, desclic de 3 f (las tres entran a corte) y, como el WAV
 *                es el TRATADO de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a −15 LUFS en su ventana), UNA ganancia de ±0,1 dB.
 *   musica       «Becoming», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos y bajo la tarjeta. No es la de `envolventeBajoVoz`: aquí el golpe en que entra cada toma (a corte)
 *                tiene que sonar entero, la música baja con curva DESPUÉS y acaba ANTES de la primera palabra.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente):
 *   voz de Isabella      −15 (pedido del usuario: «sube la voz en off de Isabella sin saturar»; sus tomas crudas miden −24,2 · −25,2 · −20,5; tratadas, −15,1 · −15,1 · −15,0 con pico real de −2,5 dBFS)
 *   música SOLA          −17,5 (NO −15: «Becoming» es una pista baja, −18,9 LUFS de meseta con picos de −3,8 dBFS, y llevarla a −15 pondría sus picos a +0,3 dBFS; a −17,5 quedan a −1,3 dBFS)
 *   música BAJO LA VOZ   −26 en cada ventana de voz: 11 LU por debajo de ella (`BAJOS`: −5,6 · −7,2 · −9,1 dB sobre el archivo en el hook, la mitad y el CTA)
 * La canción cambia de nivel a lo largo de los 35 s que se usan (−23,9 LUFS la apertura —que queda a −17,9 por el tope de +6 dB—, −20,4 el paseo, −20,6 el bloque 5, −16,9 donde habla el CTA, ya cayendo), así que cada tramo SIN voz lleva su propia ganancia
 * (`ALTOS`) y la música sola queda cerca de −17,5 en los tres (una sola ganancia, sin `loudnorm`, que le cambiaría la dinámica). Bajo la voz se mide con la sonoridad de la canción EN cada ventana de voz
 * (`LUFS_CANCION_EN_VOZ`) y el oído decide si compite.
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · La CASA abre con el golpe de la canción en el f3 y la música sola; no hay voz.
 *   · El HOOK entra A CORTE en el golpe del f100 (suena entero): la música baja con curva de coseno en 7 f y la primera palabra suena a los 8,1 f.
 *   · La MITAD, igual: golpe en el f561, bajada de 6 f y primera palabra a los 7,5 f.
 *   · El CTA, igual: golpe en el f980, bajada de 6 f y primera palabra a los 8,7 f.
 *   · Al acabar la voz la música sube con curva en 24 f, o los que quepan hasta 2 f antes del golpe del plano siguiente: tras el hook caben 11. **Tras la MITAD no cabe ninguno**: MD02 deja 4,5 f entre su última
 *     palabra y el golpe del f699, y la música suena en él todavía abajo; la subida (24 f) empieza en el golpe.
 *
 * EL CTA Y LA RESOLUCIÓN. La canción se resuelve SOLA: cae en el f1079 (164,0 s; −18,8 → −28,1 → −40,4 LUFS en tramos de 5 s) con la voz del CTA a punto de acabar (su última palabra, en el f1087). Al acabar la voz la
 * música sube a su nivel «solo» en 14 f (lo que queda de la cola, a −26 LUFS, suena a esa ganancia) y se lleva a cero, en línea recta, hasta 2 f antes del final de la pieza, bajo la tarjeta.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_030, FPS_030, INICIO_MUSICA, OBJETIVO_LUFS, metraje030 } from "./metraje-030";

/** La voz de las tres tomas a cámara (HK04, MD02 y CT01), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje030, { fps: FPS_030, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre y la música tiene que estar a su nivel «solo» (la cola de la caída). */
const CTA = metraje030.find((c) => c.id === "c10-cta");
if (!CTA) throw new Error("audio-030: falta c10-cta en metraje-030.ts");
export const FIN_CTA_030 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number } => {
  const c = metraje030.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-030: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_030);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_030);
  return { en: ini, dur: fin - ini, fin };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la
 * biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Becoming» entre el 128,1 y el 163,0 s (ebur128): lo que suena en los recorridos, en promedio. */
export const LUFS_MESETA = -18.9;
/** Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre la fuente): la apertura, el paseo y el bloque 5. */
const LUFS_TRAMO = { apertura: -23.9, paseo: -20.4, bloque5: -20.6 } as const;
/**
 * La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente, el tramo de la canción que suena mientras ella habla): lo que mide la puerta en lugar de suponer la meseta
 * en todas (la del CTA ya es la caída).
 */
export const LUFS_CANCION_EN_VOZ = { "c02-hook": -20.4, "c06-mitad": -18.8, "c10-cta": -16.9 } as const;
/** La música SOLA. */
const OBJETIVO_MUSICA = -17.5;
/**
 * Ganancia lineal de la música sola en cada tramo: la apertura +6,0 dB (el TOPE de `revisaAudio`: pedía +6,4 para llegar a −17,5 y se queda en −17,9 LUFS, pico a −1,7 dBFS), el paseo +2,9 dB y el bloque 5 +3,1 dB sobre
 * el archivo (los picos quedan a −1,7 · −0,9 · −3,1 dBFS).
 */
export const ALTOS = {
  apertura: Math.min(gananciaHasta(LUFS_TRAMO.apertura, OBJETIVO_MUSICA), 1.995),
  paseo: gananciaHasta(LUFS_TRAMO.paseo, OBJETIVO_MUSICA),
  bloque5: gananciaHasta(LUFS_TRAMO.bloque5, OBJETIVO_MUSICA),
} as const;
/**
 * Mientras habla Isabella: la música baja hasta −26 LUFS EN CADA VENTANA (11 LU bajo su voz de −15). No es un factor fijo sobre el nivel «solo»: la canción suena a −20,4 · −18,8 · −16,9 LUFS donde hablan el hook, la mitad
 * y el CTA (ya cayendo), y con un −8 dB fijo la mitad y el CTA quedaban a 8,7 y 8,2 LU de la voz. La ganancia absoluta que deja cada ventana en −26 es la de `gananciaHasta`.
 */
export const LUFS_MUSICA_BAJO_VOZ = -26;
export const BAJOS = {
  "c02-hook": gananciaHasta(LUFS_CANCION_EN_VOZ["c02-hook"], LUFS_MUSICA_BAJO_VOZ),
  "c06-mitad": gananciaHasta(LUFS_CANCION_EN_VOZ["c06-mitad"], LUFS_MUSICA_BAJO_VOZ),
  "c10-cta": gananciaHasta(LUFS_CANCION_EN_VOZ["c10-cta"], LUFS_MUSICA_BAJO_VOZ),
} as const;
/**
 * LOS FUNDIDOS (pedido del usuario en la V6, ya regla del canal: «el sonido cuando cambia a hablar Isabella debe hacer un fade-out / fade-in cuando retome para que no se escuche ahí mismo tan cortado»):
 *   · FADE-OUT de FADE_OUT f desde el golpe en que entra ella (el golpe suena entero y la música baja DESPUÉS, con curva suave): la curva ACABA ANTES de su primera palabra: el hook, a 1,1 f; la mitad, a 1,5 f;
 *     el CTA, a 2,7 f.
 *   · FADE-IN de FADE_IN f tras su última palabra (con curva suave: sale despacio y acaba deprisa), o los que queden hasta 2 f antes del golpe del plano siguiente (la subida, a medias, falsearía su medida en `golpes-render.py`).
 */
export const FADE_OUT = { hook: 7, mitad: 6, cta: 6 } as const;
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
  const hookPlano = metraje030.find((c) => c.id === "c02-hook");
  const mitadPlano = metraje030.find((c) => c.id === "c06-mitad");
  const ctaPlano = metraje030.find((c) => c.id === "c10-cta");
  const siguienteAlHook = metraje030.find((c) => c.id === "c03-explanada");
  const siguienteALaMitad = metraje030.find((c) => c.id === "c07-palmas");
  if (!hookPlano || !mitadPlano || !ctaPlano || !siguienteAlHook || !siguienteALaMitad) throw new Error("audio-030: faltan planos en metraje-030.ts");

  const p: [number, number][] = [
    // LA CASA: la música sola desde el frame 0 (1 f de entrada para no meter un clic: el golpe de apertura suena en el f3).
    [0, 0],
    [1, ALTOS.apertura],
    // HOOK: entra a corte en el golpe, que suena entero; la música baja con fundido DESPUÉS y sube (los f que quepan) hasta 2 f antes del golpe del plano siguiente.
    [hookPlano.en, ALTOS.apertura],
    ...fundido(hookPlano.en, FADE_OUT.hook, ALTOS.apertura, BAJOS["c02-hook"]),
    [hook.fin, BAJOS["c02-hook"]],
    ...fundido(hook.fin, Math.min(FADE_IN, siguienteAlHook.en - hook.fin - 2), BAJOS["c02-hook"], ALTOS.paseo),
    // MITAD: igual. MD02 deja 4,5 f tras su última palabra: la música NO alcanza a subir antes del corte; el golpe del plano siguiente suena con ella abajo y la subida (FADE_IN f) empieza en él.
    [mitadPlano.en, ALTOS.paseo],
    ...fundido(mitadPlano.en, FADE_OUT.mitad, ALTOS.paseo, BAJOS["c06-mitad"]),
    [mitad.fin, BAJOS["c06-mitad"]],
    [siguienteALaMitad.en, BAJOS["c06-mitad"]],
    ...fundido(siguienteALaMitad.en, FADE_IN, BAJOS["c06-mitad"], ALTOS.bloque5),
    // CTA: igual...
    [ctaPlano.en, ALTOS.bloque5],
    ...fundido(ctaPlano.en, FADE_OUT.cta, ALTOS.bloque5, BAJOS["c10-cta"]),
    [cta.fin, BAJOS["c10-cta"]],
    // ...y al acabar la voz la música vuelve a su nivel «solo»: la canción ya ha caído, así que lo que suena es su cola.
    ...fundido(cta.fin, Math.min(SUBIDA_CTA, FIN_CTA_030 - cta.fin), BAJOS["c10-cta"], ALTOS.bloque5),
    // La cola suena a su nivel hasta que acaba la toma y se apaga en línea recta bajo la tarjeta.
    [FIN_CTA_030, ALTOS.bloque5],
    [FIN_MUSICA_030, 0],
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica030: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-030/musica-030.wav",
        en: 0,
        dur: FIN_MUSICA_030,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«Becoming»: el golpe de 15,0 dB del f3 abre el lote, un golpe medido en que entra cada plano, y su caída a partir del f1079 (los 164,0 s de la canción), con la voz del CTA a punto de acabar y la cola apagándose bajo la tarjeta del cierre; baja a −26 LUFS (11 LU bajo la voz de Isabella) en el hook, la mitad y el CTA.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio030: readonly TramoAudio[] = [...vocesTomas, ...musica030];
