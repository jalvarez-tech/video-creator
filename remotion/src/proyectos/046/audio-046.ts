/**
 * EL SONIDO DEL 046 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK03, MD02, MD03 y CT02, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen (HK03 entra a corte en el f0: desclic de 3 f; las otras tres,
 *                con disolvencia: la voz cruza con la imagen) y, como el WAV es el TRATADO de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a ≈ −15 LUFS
 *                en su ventana), UNA ganancia de ±0,1 dB.
 *   musica       «Children» (Armin van Buuren, piano), con una envolvente que BAJA mientras habla Isabella y sube en los recorridos. No es la de `envolventeBajoVoz`: la curva de cada bajada es de coseno y ACABA antes de su
 *                primera palabra, y en el CTA la canción cae SOLA (su meseta acaba en el 211,5 s) y la envolvente solo la ayuda.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente, `herramientas/lufs-rangos.py`):
 *   voz de Isabella      −15 (pedido permanente del usuario: «más decibeles sin saturar»; sus tomas crudas miden −22,3 · −22,7 · −20,2 · −20,5; tratadas, ≈ −15 con pico real de −2,5)
 *   música SOLA          −15 por tramos, el nivel de la voz: la canción es una meseta de piano a −10 LUFS (−11,2 en la apertura, −11,1 en el paseo, −9,5 en el bloque 5; picos de −0,3 a −1,0 dBFS), así que se BAJA de 3,8 a 5,5 dB.
 *   música BAJO LA VOZ   −26 en cada ventana de voz: 11 LU por debajo de ella (`BAJOS`)
 * Una sola ganancia por tramo, sin `loudnorm` (le cambiaría la dinámica).
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · La pieza ABRE con Isabella y la canción entra en el f3 con su golpe de 9,7 dB: suena entero (f3-f4) y baja con curva de coseno en 10 f (f4-f14), ACABA 3 f antes de la primera palabra (f17).
 *   · Al acabar el hook (f169) la música sube con curva en 24 f (hasta el f193, ya dentro de la unidad).
 *   · La MITAD son dos tomas seguidas y la música NO sube entre ellas (son una sola frase para el oído): baja en 10 f (f424-f434), acaba 2 f antes de la primera palabra de MD02 (f436) y sube con curva tras la última de MD03
 *     (f725) en los 14 f que caben hasta 2 f antes del golpe del f741.
 *   · El CTA: la meseta de la canción acaba en el 211,5 s (f1057) y a la primera palabra (f1087 = el 212,0 s) ya ha caído de −11 a −15,8 LUFS (momentáneos) y sigue cayendo hasta −40 a los 215 s. La envolvente baja con curva
 *     en 20 f (f1066-f1086: el piano se apaga solo bajo la última imagen del clímax y bajo la disolvencia) hasta que a la primera palabra quede a −26 LUFS (11 LU bajo ella), y la apaga del todo en el f1190, ANTES de que
 *     entre el siguiente pasaje de la canción (el 216,0 s = f1205, un golpe de 16,6 dB): la tarjeta va en silencio.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_046, FPS_046, INICIO_MUSICA, OBJETIVO_LUFS, metraje046 } from "./metraje-046";

/** La voz de las cuatro tomas a cámara (HK03, MD02, MD03 y CT02), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje046, { fps: FPS_046, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre. */
const CTA = metraje046.find((c) => c.id === "c11-cta");
if (!CTA) throw new Error("audio-046: falta c11-cta en metraje-046.ts");
export const FIN_CTA_046 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
export const ventanaDe = (id: string): { en: number; dur: number; fin: number } => {
  const c = metraje046.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-046: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_046);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_046);
  return { en: ini, dur: fin - ini, fin };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la biblioteca de Luxur (versión de piano de un clásico del trance,
 * álbum «Piano» de Armin van Buuren) y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Children» entre el 176 y el 211 s (ebur128): lo que suena en la pieza mientras no cae. */
export const LUFS_MESETA = -10.3;
/** Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre la fuente): la apertura (f0-17), el paseo (f193-435) y el bloque 5 (f741-1066). */
const LUFS_TRAMO = { apertura: -11.2, paseo: -11.1, bloque5: -9.5 } as const;
/** El pico real de la canción en la apertura (ebur128, 175,83-177 s): −1,0 dBFS. La música nunca pasa de `TECHO_PICO`. */
const PICO_APERTURA = -1.0;
const TECHO_PICO = -0.5;
/**
 * La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente, el tramo de la canción que suena mientras ella habla): lo que mide la puerta en lugar de suponer la meseta en todas. En el CTA la
 * canción CAE: el valor es el momentáneo (400 ms) en la primera palabra, el 212,0 s (−15,8 LUFS), no la media de la ventana (−24,9), que escondería el primer segundo.
 */
export const LUFS_CANCION_EN_VOZ = { "c02-hook": -10.5, "c06-mitad-uno": -10.4, "c07-mitad-dos": -10.4, "c11-cta": -15.8 } as const;
/** La música SOLA: el nivel de la voz. */
const OBJETIVO_MUSICA = -15;
/**
 * Ganancia lineal de la música sola en cada tramo: la apertura −3,8 dB, el paseo −3,9 dB y el bloque 5 −5,5 dB sobre el archivo (sus picos, de −0,3 a −1,0 dBFS en el archivo, quedan por debajo de −4,6 dBFS).
 */
export const ALTOS = {
  apertura: Math.min(gananciaHasta(LUFS_TRAMO.apertura, OBJETIVO_MUSICA), Math.pow(10, (TECHO_PICO - PICO_APERTURA) / 20)),
  paseo: gananciaHasta(LUFS_TRAMO.paseo, OBJETIVO_MUSICA),
  bloque5: gananciaHasta(LUFS_TRAMO.bloque5, OBJETIVO_MUSICA),
} as const;
/**
 * Mientras habla Isabella: la música baja hasta −26 LUFS EN CADA VENTANA (11 LU bajo su voz de −15). La ganancia absoluta que deja cada ventana en −26 es la de `gananciaHasta`.
 */
export const LUFS_MUSICA_BAJO_VOZ = -26;
export const BAJOS = {
  "c02-hook": gananciaHasta(LUFS_CANCION_EN_VOZ["c02-hook"], LUFS_MUSICA_BAJO_VOZ),
  "c06-mitad-uno": gananciaHasta(LUFS_CANCION_EN_VOZ["c06-mitad-uno"], LUFS_MUSICA_BAJO_VOZ),
  "c07-mitad-dos": gananciaHasta(LUFS_CANCION_EN_VOZ["c07-mitad-dos"], LUFS_MUSICA_BAJO_VOZ),
  "c11-cta": gananciaHasta(LUFS_CANCION_EN_VOZ["c11-cta"], LUFS_MUSICA_BAJO_VOZ),
} as const;
/**
 * LOS FUNDIDOS (pedido del usuario en la V6, ya regla del canal: «el sonido cuando cambia a hablar Isabella debe hacer un fade-out / fade-in … para que no se escuche tan cortado» y «debe ser la curva antes de que hable»):
 *   · FADE-OUT: el hook baja en 10 f desde el f4 (el golpe del f3 suena entero) y acaba 3 f antes de su primera palabra; la mitad baja en 10 f y acaba 2 f antes de la de MD02; el CTA baja en 20 f y acaba justo antes de
 *     la suya (el piano ya está cayendo solo).
 *   · FADE-IN de FADE_IN f tras su última palabra (con curva suave), o los que queden hasta 2 f antes del golpe del plano siguiente (la subida, a medias, falsearía su medida en `golpes-render.py`).
 */
export const FADE_OUT = { hook: 10, mitad: 10, cta: 20 } as const;
export const FADE_IN = 24;
/** Frame en que empieza la bajada del hook: el golpe de entrada (f3) suena entero y la música baja DESPUÉS. */
export const BAJADA_HOOK_DESDE = 4;
/** Hasta cuándo se mantiene la música en su nivel bajo en el CTA antes de apagarse del todo (el piano ya ha caído solo). */
const APAGADO_CTA_DESDE = 1120;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** La envolvente: el golpe de apertura entero, el hook, la mitad (las dos tomas juntas) y el CTA con su fundido, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c02-hook");
  const mitad1 = ventanaDe("c06-mitad-uno");
  const mitad2 = ventanaDe("c07-mitad-dos");
  const alcoba = metraje046.find((c) => c.id === "c08-alcoba");
  const piscina = metraje046.find((c) => c.id === "c03-piscina");
  const ctaPlano = metraje046.find((c) => c.id === "c11-cta");
  if (!alcoba || !piscina || !ctaPlano) throw new Error("audio-046: faltan planos en metraje-046.ts");

  const p: [number, number][] = [
    // EL GOLPE DE APERTURA: la música sola desde el frame 0 (1 f de entrada para no meter un clic: el golpe suena en el f3) y entera hasta que empieza la bajada.
    [0, 0],
    [1, ALTOS.apertura],
    [BAJADA_HOOK_DESDE, ALTOS.apertura],
    // HOOK: baja con fundido DESPUÉS del golpe y acaba antes de su primera palabra; al acabar la voz sube (24 f) a su nivel de paseo, dentro de la unidad.
    ...fundido(BAJADA_HOOK_DESDE, FADE_OUT.hook, ALTOS.apertura, BAJOS["c02-hook"]),
    [hook.fin, BAJOS["c02-hook"]],
    ...fundido(hook.fin, FADE_IN, BAJOS["c02-hook"], ALTOS.paseo),
    // MITAD (MD02 + MD03): baja ANTES de la primera palabra de MD02 (la imagen ya se disuelve) y se queda abajo hasta la última de MD03: es UNA mitad.
    [mitad1.en - 2 - FADE_OUT.mitad, ALTOS.paseo],
    ...fundido(mitad1.en - 2 - FADE_OUT.mitad, FADE_OUT.mitad, ALTOS.paseo, BAJOS["c06-mitad-uno"]),
    [mitad2.fin, BAJOS["c07-mitad-dos"]],
    // …y sube con curva en los frames que caben hasta 2 f antes del golpe en que acaba la disolvencia a la alcoba.
    ...fundido(mitad2.fin, Math.min(FADE_IN, alcoba.en - mitad2.fin - 2), BAJOS["c07-mitad-dos"], ALTOS.bloque5),
    // EL CLÍMAX y el CTA: la canción sostiene su meseta hasta el 211,5 s (f1057) y cae sola; la envolvente baja con curva hasta dejarla a −26 LUFS cuando entra la primera palabra.
    [ctaPlano.en - FADE_OUT.cta, ALTOS.bloque5],
    ...fundido(ctaPlano.en - FADE_OUT.cta, FADE_OUT.cta, ALTOS.bloque5, BAJOS["c11-cta"]),
    [APAGADO_CTA_DESDE, BAJOS["c11-cta"]],
    // …y al acabar se APAGA con curva de coseno hasta cero ANTES de que entre el siguiente pasaje de la canción (f1205): la tarjeta va en silencio.
    ...fundido(APAGADO_CTA_DESDE, FIN_MUSICA_046 - APAGADO_CTA_DESDE, BAJOS["c11-cta"], 0),
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica046: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-046/musica-046.wav",
        en: 0,
        dur: FIN_MUSICA_046,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«Children»: el golpe de 9,7 dB del f3 abre la pieza con Isabella (baja bajo su voz), un golpe medido de 8,1 a 11,4 dB en que entra cada corte seco (la música vuelve a su nivel tras el hook y tras la mitad), la meseta sostiene el clímax y su caída natural cae donde entra el CTA; se apaga antes de la tarjeta.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio046: readonly TramoAudio[] = [...vocesTomas, ...musica046];
