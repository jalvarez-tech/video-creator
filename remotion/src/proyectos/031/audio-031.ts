/**
 * EL SONIDO DEL 031 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK06, MD04 y CT04, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, desclic de 3 f (las tres entran a corte) y, como el WAV
 *                es el TRATADO de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a −15 LUFS en su ventana), UNA ganancia de ±0,1 dB.
 *   musica       «Somewhere inside of me», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos y bajo la tarjeta. No es la de `envolventeBajoVoz`: aquí el golpe en que entra cada toma (a corte)
 *                tiene que sonar entero, la música baja con curva DESPUÉS y acaba ANTES de la primera palabra.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente):
 *   voz de Isabella      −15 (pedido del usuario: «la voz de Isabella sube a −15 LUFS sin saturar»; sus tomas crudas miden −21,9 · −23,5 · −21,5; tratadas, −15,0 · −15,1 · −15,1 con pico real de −2,5 dBFS)
 *   música SOLA          −15, el nivel de la voz (pedido del canal desde la V12). Aquí la canción es ALTA, no baja como «Becoming» en el 030: −9,4…−11,2 LUFS de meseta con picos de +0,2 dBFS en el archivo; se
 *                        BAJA 3,8-5,6 dB y sus picos quedan a −3,6…−5,4 dBFS. Nada que limitar.
 *   música BAJO LA VOZ   −26 en cada ventana de voz: 11 LU por debajo de ella (`BAJOS`: −15,5 · −16,3 · −15,0 dB sobre el archivo en el hook, la mitad y el CTA)
 * La canción cambia algo de nivel a lo largo de los 35 s que se usan (−11,2 LUFS la apertura, −10,0 el paseo, −9,4 el bloque 5, −11,0 donde habla el CTA, ya cayendo), así que cada tramo SIN voz lleva su propia ganancia
 * (`ALTOS`) y la música sola queda en −15 en los tres (una sola ganancia, sin `loudnorm`, que le cambiaría la dinámica). Bajo la voz se mide con la sonoridad de la canción EN cada ventana de voz
 * (`LUFS_CANCION_EN_VOZ`) y el oído decide si compite.
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · El LOTE abre con el golpe de la canción en el f3 y la música sola; no hay voz.
 *   · El HOOK entra A CORTE en el golpe del f97 (suena entero): la música baja con curva de coseno en 7 f y la primera palabra suena a los 8,5 f (f106).
 *   · La MITAD, igual: golpe en el f502, bajada de 6 f y primera palabra a los 7,9 f (f510).
 *   · El CTA, igual: golpe en el f881, bajada de 6 f y primera palabra a los 8,1 f (f889).
 *   · Al acabar la voz la música sube con curva en 24 f, o los que quepan hasta 2 f antes del golpe del plano siguiente: tras el hook caben 22 y tras la mitad 23 (las dos tomas dejan ≈ 25 f de aire: aquí no hace falta
 *     la excepción de MD02 del 030).
 *
 * EL CTA Y LA RESOLUCIÓN. La canción se resuelve SOLA: su fundido final cae en el f964 (333,25 s; −9,4 → −19,8 → −46,4 LUFS en tramos de 5 s) mientras habla el CTA (su última palabra, en el f994). Al acabar la voz la
 * música sube a su nivel «solo» en 14 f (lo que queda del fundido suena a esa ganancia, ya por debajo de −25 LUFS) y se lleva a cero, en línea recta, hasta 2 f antes del final de la pieza, bajo la tarjeta.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_031, FPS_031, INICIO_MUSICA, OBJETIVO_LUFS, metraje031 } from "./metraje-031";

/** La voz de las tres tomas a cámara (HK06, MD04 y CT04), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje031, { fps: FPS_031, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre y la música tiene que estar a su nivel «solo» (la cola de la caída). */
const CTA = metraje031.find((c) => c.id === "c10-cta");
if (!CTA) throw new Error("audio-031: falta c10-cta en metraje-031.ts");
export const FIN_CTA_031 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number } => {
  const c = metraje031.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-031: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_031);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_031);
  return { en: ini, dur: fin - ini, fin };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la
 * biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Somewhere inside of me» entre el 301,2 y el 333,0 s (ebur128): lo que suena en la pieza, en promedio. */
export const LUFS_MESETA = -9.9;
/** Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre la fuente): la apertura (f0-97), el paseo (f274-502) y el bloque 5 (f631-881). */
const LUFS_TRAMO = { apertura: -11.2, paseo: -10.0, bloque5: -9.4 } as const;
/**
 * La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente, el tramo de la canción que suena mientras ella habla): lo que mide la puerta en lugar de suponer la meseta
 * en todas (la del CTA ya es la caída).
 */
export const LUFS_CANCION_EN_VOZ = { "c02-hook": -10.5, "c06-mitad": -9.7, "c10-cta": -11.0 } as const;
/** La música SOLA: el nivel de la voz (la canción es alta y se BAJA). */
const OBJETIVO_MUSICA = -15;
/**
 * Ganancia lineal de la música sola en cada tramo: la apertura −3,8 dB, el paseo −5,0 dB y el bloque 5 −5,6 dB sobre el archivo (los picos, de +0,0 · +0,1 · +0,2 dBFS en el archivo, quedan a −3,8 · −4,9 · −5,4 dBFS).
 */
export const ALTOS = {
  apertura: gananciaHasta(LUFS_TRAMO.apertura, OBJETIVO_MUSICA),
  paseo: gananciaHasta(LUFS_TRAMO.paseo, OBJETIVO_MUSICA),
  bloque5: gananciaHasta(LUFS_TRAMO.bloque5, OBJETIVO_MUSICA),
} as const;
/**
 * Mientras habla Isabella: la música baja hasta −26 LUFS EN CADA VENTANA (11 LU bajo su voz de −15). No es un factor fijo sobre el nivel «solo»: la canción suena a −10,5 · −9,7 · −11,0 LUFS donde hablan el hook, la mitad
 * y el CTA (el del CTA ya cayendo). La ganancia absoluta que deja cada ventana en −26 es la de `gananciaHasta`.
 */
export const LUFS_MUSICA_BAJO_VOZ = -26;
export const BAJOS = {
  "c02-hook": gananciaHasta(LUFS_CANCION_EN_VOZ["c02-hook"], LUFS_MUSICA_BAJO_VOZ),
  "c06-mitad": gananciaHasta(LUFS_CANCION_EN_VOZ["c06-mitad"], LUFS_MUSICA_BAJO_VOZ),
  "c10-cta": gananciaHasta(LUFS_CANCION_EN_VOZ["c10-cta"], LUFS_MUSICA_BAJO_VOZ),
} as const;
/**
 * LOS FUNDIDOS (pedido del usuario en la V6, ya regla del canal: «el sonido cuando cambia a hablar Isabella debe hacer un fade-out / fade-in cuando retome para que no se escuche ahí mismo tan cortado»):
 *   · FADE-OUT de FADE_OUT f desde el golpe en que entra ella (el golpe suena entero y la música baja DESPUÉS, con curva suave): la curva ACABA ANTES de su primera palabra: el hook, a 2 f (f104 → f106); la mitad,
 *     a 2 f (f508 → f510); el CTA, a 2 f (f887 → f889).
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
  const hookPlano = metraje031.find((c) => c.id === "c02-hook");
  const mitadPlano = metraje031.find((c) => c.id === "c06-mitad");
  const ctaPlano = metraje031.find((c) => c.id === "c10-cta");
  const siguienteAlHook = metraje031.find((c) => c.id === "c03-explanada");
  const siguienteALaMitad = metraje031.find((c) => c.id === "c07-loma");
  if (!hookPlano || !mitadPlano || !ctaPlano || !siguienteAlHook || !siguienteALaMitad) throw new Error("audio-031: faltan planos en metraje-031.ts");

  const p: [number, number][] = [
    // EL LOTE: la música sola desde el frame 0 (1 f de entrada para no meter un clic: el golpe de apertura suena en el f3).
    [0, 0],
    [1, ALTOS.apertura],
    // HOOK: entra a corte en el golpe, que suena entero; la música baja con fundido DESPUÉS y sube (los f que quepan) hasta 2 f antes del golpe del plano siguiente.
    [hookPlano.en, ALTOS.apertura],
    ...fundido(hookPlano.en, FADE_OUT.hook, ALTOS.apertura, BAJOS["c02-hook"]),
    [hook.fin, BAJOS["c02-hook"]],
    ...fundido(hook.fin, Math.min(FADE_IN, siguienteAlHook.en - hook.fin - 2), BAJOS["c02-hook"], ALTOS.paseo),
    // MITAD: igual que el hook. MD04 deja 25 f tras su última palabra: la música sube con fundido y está arriba 2 f antes del golpe del plano siguiente.
    [mitadPlano.en, ALTOS.paseo],
    ...fundido(mitadPlano.en, FADE_OUT.mitad, ALTOS.paseo, BAJOS["c06-mitad"]),
    [mitad.fin, BAJOS["c06-mitad"]],
    ...fundido(mitad.fin, Math.min(FADE_IN, siguienteALaMitad.en - mitad.fin - 2), BAJOS["c06-mitad"], ALTOS.bloque5),
    // CTA: igual...
    [ctaPlano.en, ALTOS.bloque5],
    ...fundido(ctaPlano.en, FADE_OUT.cta, ALTOS.bloque5, BAJOS["c10-cta"]),
    [cta.fin, BAJOS["c10-cta"]],
    // ...y al acabar la voz la música vuelve a su nivel «solo»: la canción ya ha caído, así que lo que suena es su cola.
    ...fundido(cta.fin, Math.min(SUBIDA_CTA, FIN_CTA_031 - cta.fin), BAJOS["c10-cta"], ALTOS.bloque5),
    // La cola suena a su nivel hasta que acaba la toma y se apaga en línea recta bajo la tarjeta.
    [FIN_CTA_031, ALTOS.bloque5],
    [FIN_MUSICA_031, 0],
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica031: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-031/musica-031.wav",
        en: 0,
        dur: FIN_MUSICA_031,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«Somewhere inside of me»: el golpe de 12,3 dB del f3 abre el lote, un golpe medido en que entra cada plano, y su fundido final a partir del f964 (los 333,25 s de la canción), mientras habla el CTA, con la cola apagándose bajo la tarjeta del cierre; baja a −26 LUFS (11 LU bajo la voz de Isabella) en el hook, la mitad y el CTA.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio031: readonly TramoAudio[] = [...vocesTomas, ...musica031];
