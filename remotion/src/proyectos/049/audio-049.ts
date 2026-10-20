/**
 * EL SONIDO DEL 049 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK03, MD05 y CT01, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, desclic de 3 f (las tres entran a corte) y, como el WAV es el TRATADO
 *                de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a ≈ −15 LUFS en su ventana), UNA ganancia de ±0,1 dB.
 *   musica       «In This Together», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos. No es la de `envolventeBajoVoz`: aquí el golpe en que entra cada toma (a corte) tiene que sonar
 *                entero, la música baja con curva DESPUÉS y acaba ANTES de la primera palabra.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente, `herramientas/lufs-rangos.py`):
 *   voz de Isabella      −15 (pedido del usuario: «la voz de Isabella a −15 LUFS sin saturar»; sus tomas crudas miden −22,3 · −23,9 · −20,7; tratadas, ≈ −15 con pico real de −2,5)
 *   música SOLA          −15 por tramos, el nivel de la voz. La canción es MUY fuerte (≈ −10 LUFS en el tramo que se usa, picos de −0,1 dBFS): las ganancias son NEGATIVAS (−5,4 · −5,0 · −3,2 dB) y nada se limita.
 *   música BAJO LA VOZ   −26 en cada ventana de voz: 11 LU por debajo de ella (`BAJOS`); en la del CTA se mide sobre su tramo más fuerte, porque la canción CAE sola ahí.
 * Una sola ganancia por tramo, sin `loudnorm` (le cambiaría la dinámica). Bajo la voz se mide con la sonoridad de la canción EN cada ventana de voz (`LUFS_CANCION_EN_VOZ`) y el oído decide si compite.
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · La APERTURA abre con el golpe de la canción en el f3 y la música sola; no hay voz.
 *   · El HOOK entra A CORTE en el golpe del f71 (suena entero): la música baja con curva de coseno en 6 f y la primera palabra suena a los 12,4 f (f83).
 *   · La MITAD, igual: golpe en el f652, bajada de 6 f y primera palabra a los 13 f (f665). El CTA, igual: golpe en el f1192, bajada de 6 f y primera palabra a los 12 f (f1204).
 *   · Al acabar la voz la música sube con curva en 24 f, o los que quepan hasta 2 f antes del golpe del plano siguiente: tras el hook caben 14 (el golpe del plano siguiente, f251, suena con la música arriba); tras la
 *     mitad, 22 (la toma de MD05 deja 24,5 f de aire hasta el golpe del f778).
 *
 * EL CTA Y EL CIERRE. La canción CAE SOLA justo ahí: de ≈ −11 a −21 dBFS entre el 199,5 y el 203 s de la canción (f1137-1245 de la pieza), y el CTA entra en el golpe del 201,283 s. Bajo la voz queda a −26 LUFS (un
 * lecho que se apaga solo) y, al acabar su última palabra (f1322), se APAGA con curva de coseno hasta llegar a cero 2 f antes del final de la pieza, bajo la tarjeta del cierre.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_049, FPS_049, INICIO_MUSICA, OBJETIVO_LUFS, metraje049 } from "./metraje-049";

/** La voz de las tres tomas a cámara (HK03, MD05 y CT01), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje049, { fps: FPS_049, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre. */
const CTA = metraje049.find((c) => c.id === "c12-cta");
if (!CTA) throw new Error("audio-049: falta c10-cta en metraje-049.ts");
export const FIN_CTA_049 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number } => {
  const c = metraje049.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-049: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_049);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_049);
  return { en: ini, dur: fin - ini, fin };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la
 * biblioteca de Luxur (marcada † en el catálogo) y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «In This Together» entre el 161,6 y el 208,2 s (ebur128): lo que suena en la pieza, en promedio. */
export const LUFS_MESETA = -10.8;
/** Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre la fuente): la apertura (f0-71, 161,6-164,0 s), el paseo (f251-652, 169,97-183,34 s) y el bloque 5 (f778-1192, 187,53-201,33 s). */
const LUFS_TRAMO = { apertura: -9.6, paseo: -10.0, bloque5: -11.8 } as const;
/** El pico real de la canción en la apertura (ebur128, 161,6-164,0 s): −0,3 dBFS. La música nunca pasa de `TECHO_PICO`. */
const PICO_APERTURA = -0.3;
const TECHO_PICO = -0.5;
/**
 * La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente, el tramo de la canción que suena mientras ella habla): lo que mide la puerta en lugar de suponer la meseta en todas. La del CTA es la de su
 * tramo MÁS FUERTE (los primeros 1,8 s, 201,73-203,5 s: −17,9; los 2,2 s siguientes bajan a −21,9), porque ahí la canción cae sola y queda aún más baja bajo el resto de la frase.
 */
export const LUFS_CANCION_EN_VOZ = { "c02-hook": -10.2, "c07-mitad": -10.7, "c12-cta": -17.9 } as const;
/** La música SOLA: el nivel de la voz. */
const OBJETIVO_MUSICA = -15;
/**
 * Ganancia lineal de la música sola en cada tramo: la apertura −5,4 dB, el paseo −5,0 dB y el bloque 5 −3,2 dB sobre el archivo (sus picos, de −0,3 a −1,1 dBFS en el archivo, quedan a ≈ −5,7 dBFS o menos).
 * Nada cerca de 0 dBFS: no hay nada que limitar.
 */
export const ALTOS = {
  apertura: Math.min(gananciaHasta(LUFS_TRAMO.apertura, OBJETIVO_MUSICA), Math.pow(10, (TECHO_PICO - PICO_APERTURA) / 20)),
  paseo: gananciaHasta(LUFS_TRAMO.paseo, OBJETIVO_MUSICA),
  bloque5: gananciaHasta(LUFS_TRAMO.bloque5, OBJETIVO_MUSICA),
} as const;
/**
 * Mientras habla Isabella: la música baja hasta −26 LUFS EN CADA VENTANA (11 LU bajo su voz de −15). No es un factor fijo sobre el nivel «solo»: la canción suena a −10,2 · −10,7 · −17,9 LUFS donde hablan el hook, la
 * mitad y el CTA. La ganancia absoluta que deja cada ventana en −26 es la de `gananciaHasta`.
 */
export const LUFS_MUSICA_BAJO_VOZ = -26;
export const BAJOS = {
  "c02-hook": gananciaHasta(LUFS_CANCION_EN_VOZ["c02-hook"], LUFS_MUSICA_BAJO_VOZ),
  "c07-mitad": gananciaHasta(LUFS_CANCION_EN_VOZ["c07-mitad"], LUFS_MUSICA_BAJO_VOZ),
  "c12-cta": gananciaHasta(LUFS_CANCION_EN_VOZ["c12-cta"], LUFS_MUSICA_BAJO_VOZ),
} as const;
/**
 * LOS FUNDIDOS (pedido del usuario en la V6, ya regla del canal: «el sonido cuando cambia a hablar Isabella debe hacer un fade-out / fade-in cuando retome para que no se escuche ahí mismo tan cortado»):
 *   · FADE-OUT de FADE_OUT f desde el golpe en que entra ella (el golpe suena entero y la música baja DESPUÉS, con curva suave): la curva ACABA ANTES de su primera palabra (a 3,5 · 2,9 · 3 f).
 *   · FADE-IN de FADE_IN f tras su última palabra (con curva suave), o los que queden hasta 2 f antes del golpe del plano siguiente (la subida, a medias, falsearía su medida en `golpes-render.py`).
 */
export const FADE_OUT = { hook: 6, mitad: 6, cta: 6 } as const;
export const FADE_IN = 24;
/** Frames que tarda la música en apagarse tras la última palabra del CTA: hasta 2 f antes del final de la pieza (la tarjeta va en silencio). */
const APAGADO_CTA_HASTA = FIN_MUSICA_049;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** La envolvente: la bajada sola, el hook, la mitad y el CTA con su fundido, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c02-hook");
  const mitad = ventanaDe("c07-mitad");
  const cta = ventanaDe("c12-cta");
  const hookPlano = metraje049.find((c) => c.id === "c02-hook");
  const mitadPlano = metraje049.find((c) => c.id === "c07-mitad");
  const ctaPlano = metraje049.find((c) => c.id === "c12-cta");
  const siguienteAlHook = metraje049.find((c) => c.id === "c03-piscina");
  const siguienteALaMitad = metraje049.find((c) => c.id === "c08-cocina");
  if (!hookPlano || !mitadPlano || !ctaPlano || !siguienteAlHook || !siguienteALaMitad) throw new Error("audio-049: faltan planos en metraje-049.ts");

  const p: [number, number][] = [
    // LA BAJADA: la música sola desde el frame 0 (1 f de entrada para no meter un clic: el golpe de apertura suena en el f3).
    [0, 0],
    [1, ALTOS.apertura],
    // HOOK: entra a corte en el golpe, que suena entero; la música baja con fundido DESPUÉS y sube (los f que quepan) hasta 2 f antes del golpe del drop.
    [hookPlano.en, ALTOS.apertura],
    ...fundido(hookPlano.en, FADE_OUT.hook, ALTOS.apertura, BAJOS["c02-hook"]),
    [hook.fin, BAJOS["c02-hook"]],
    ...fundido(hook.fin, Math.min(FADE_IN, siguienteAlHook.en - hook.fin - 2), BAJOS["c02-hook"], ALTOS.paseo),
    // MITAD: igual que el hook. MD05 deja 24,5 f tras su última palabra: la música sube con fundido en los que quepan (22) y está arriba 2 f antes del golpe del plano siguiente.
    [mitadPlano.en, ALTOS.paseo],
    ...fundido(mitadPlano.en, FADE_OUT.mitad, ALTOS.paseo, BAJOS["c07-mitad"]),
    [mitad.fin, BAJOS["c07-mitad"]],
    ...fundido(mitad.fin, Math.min(FADE_IN, siguienteALaMitad.en - mitad.fin - 2), BAJOS["c07-mitad"], ALTOS.bloque5),
    // CTA: igual...
    [ctaPlano.en, ALTOS.bloque5],
    ...fundido(ctaPlano.en, FADE_OUT.cta, ALTOS.bloque5, BAJOS["c12-cta"]),
    [cta.fin, BAJOS["c12-cta"]],
    // ...y al acabar la voz la música se APAGA con curva de coseno hasta cero, 2 f antes del final de la pieza (la tarjeta va en silencio).
    ...fundido(cta.fin, APAGADO_CTA_HASTA - cta.fin, BAJOS["c12-cta"], 0),
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica049: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-049/musica-049.wav",
        en: 0,
        dur: FIN_MUSICA_049,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«In This Together»: el golpe de 11,2 dB del f3 abre la apertura, un golpe medido de 7,5 a 12,7 dB en que entra cada plano (la música vuelve a su nivel tras el hook en el f249), la canción cae sola bajo el CTA y se apaga bajo la tarjeta tras «…contáctanos».",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio049: readonly TramoAudio[] = [...vocesTomas, ...musica049];
