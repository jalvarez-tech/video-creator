/**
 * EL SONIDO DEL 025 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK09, MD11 y CT03 (2.ª mitad), derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su
 *                imagen, cruce de 6 f cuando disuelve, desclic de 3 f cuando entra a corte, y UNA ganancia por toma hasta `OBJETIVO_LUFS`.
 *   musica       «Heaven on Earth», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos y bajo la tarjeta. No es la de
 *                `envolventeBajoVoz`: aquí el golpe en que entra cada toma (a corte, o en que acaba su disolvencia) tiene que sonar entero, la música baja
 *                con curva DESPUÉS y acaba ANTES de la primera palabra.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente):
 *   voz de Isabella      −21 (sus tomas miden −19,1 · −17,9 · −19,1)
 *   música SOLA          −15: arriba, en los recorridos
 *   música BAJO LA VOZ   ≈ −31: ≥ 9 LU por debajo de ella (ALTO × 0,16 = −16 dB)
 * La canción suena a −13,7 LUFS de meseta (179,6-207,0 s) con una variación de ±1 LU entre tramos (−12,8 la apertura, −15,0 el paseo, −13,1 el bloque 5), así que una sola ganancia (nunca un loudnorm, que le
 * cambiaría la dinámica) la lleva a −15 de media. Bajo la voz se mide con la sonoridad de la canción EN cada ventana de voz (`LUFS_CANCION_EN_VOZ`: −14,1 el hook, −13,1 la mitad, −16,6 el CTA, que ya cae) y el
 * oído decide si compite.
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · La CASA abre con el golpe de la canción en el f3 y la música sola; no hay voz.
 *   · El HOOK entra con una disolvencia que ACABA en el golpe del f105: el golpe suena entero y la música baja con curva de coseno en 10 f; la primera palabra suena a los 14,5 f del golpe.
 *   · La MITAD, igual: golpe en el f495, bajada de 8 f y primera palabra a los 11 f.
 *   · El CTA entra a CORTE en el golpe del f847 y su primera palabra suena 7,8 f después; la curva baja en 7 f.
 *   · Al acabar la voz la música sube con curva en 24 f, o los que quepan hasta 2 f antes del golpe del plano siguiente: tras el hook caben 13. **Tras la MITAD no cabe ninguno**: MD11 deja 3 f entre su última palabra
 *     y el final del clip, y el plano siguiente corta ahí; el golpe del f634 suena con la música todavía abajo y la subida (24 f) empieza en él.
 *
 * EL CTA Y LA RESOLUCIÓN. La canción se resuelve SOLA: cae a los 54 f de la entrada del CTA (f901, 209,5 s) y a silencio hacia los 211-212 s: −13,8 → −24,1 → silencio en tramos de 5 s. La voz del CTA acaba en el f906: la
 * música sube entonces a su nivel «solo» en 10 f (lo que quede de la cola suena a su ganancia) y se lleva a cero, en línea recta, hasta 2 f antes del final de la pieza.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_025, FPS_025, INICIO_MUSICA, OBJETIVO_LUFS, metraje025 } from "./metraje-025";

/** La voz de las tres tomas a cámara (HK09, MD11 y CT03), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje025, { fps: FPS_025, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre y la música tiene que estar a su nivel «solo» (la cola de la caída). */
const CTA = metraje025.find((c) => c.id === "c10-cta");
if (!CTA) throw new Error("audio-025: falta c10-cta en metraje-025.ts");
export const FIN_CTA_025 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number } => {
  const c = metraje025.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-025: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_025);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_025);
  return { en: ini, dur: fin - ini, fin };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la
 * biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Heaven on Earth» entre el 179,6 y el 207,0 s (ebur128): lo que suena en los recorridos. */
export const LUFS_MESETA = -13.7;
/**
 * La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente, el tramo de la canción que suena mientras ella habla): lo que mide la puerta en lugar de suponer la meseta
 * en todas (la del CTA ya es la caída).
 */
export const LUFS_CANCION_EN_VOZ = { "c02-hook": -14.1, "c06-mitad": -13.1, "c10-cta": -16.6 } as const;
/** La música SOLA. */
const OBJETIVO_MUSICA = -15;
/** Ganancia lineal de la música sola: −1,3 dB sobre el archivo. */
const ALTO = gananciaHasta(LUFS_MESETA, OBJETIVO_MUSICA);
/** Mientras habla Isabella: −16 dB más (≈ 9-10 LU bajo su voz). */
const BAJO = ALTO * 0.16;
/**
 * LOS FUNDIDOS (pedido del usuario en la V6, ya regla del canal: «el sonido cuando cambia a hablar Isabella debe hacer un fade-out / fade-in cuando retome para que no se escuche ahí mismo tan cortado»):
 *   · FADE-OUT de FADE_OUT f desde el golpe en que entra ella (el golpe suena entero y la música baja DESPUÉS, con curva suave): la curva ACABA ANTES de su primera palabra: el hook, a 4,5 f; la mitad, a 3 f;
 *     el CTA, a 0,8 f.
 *   · FADE-IN de FADE_IN f tras su última palabra (con curva suave: sale despacio y acaba deprisa), o los que queden hasta 2 f antes del golpe del plano siguiente (la subida, a medias, falsearía su medida en `golpes-render.py`).
 */
const FADE_OUT = { hook: 10, mitad: 8, cta: 7 } as const;
const FADE_IN = 24;
/** Frames que tarda la música en volver a su nivel «solo» tras la última palabra del CTA (lo que queda de la cola suena a su ganancia). */
const SUBIDA_CTA = 14;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 4 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + (a - de) * (1 - Math.cos(Math.PI * u)) / 2] as [number, number]);

/** La envolvente: la casa sola, el hook, la mitad y el CTA con su fundido, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c02-hook");
  const mitad = ventanaDe("c06-mitad");
  const cta = ventanaDe("c10-cta");
  const hookPlano = metraje025.find((c) => c.id === "c02-hook");
  const mitadPlano = metraje025.find((c) => c.id === "c06-mitad");
  const ctaPlano = metraje025.find((c) => c.id === "c10-cta");
  const siguienteAlHook = metraje025.find((c) => c.id === "c03-ventanal");
  const siguienteALaMitad = metraje025.find((c) => c.id === "c07-alcoba");
  if (!hookPlano || !mitadPlano || !ctaPlano || !siguienteAlHook || !siguienteALaMitad) throw new Error("audio-025: faltan planos en metraje-025.ts");

  const p: [number, number][] = [
    // LA CASA: la música sola desde el frame 0 (1 f de entrada para no meter un clic: el golpe de apertura suena en el f3).
    [0, 0],
    [1, ALTO],
    // HOOK: el golpe de la disolvencia suena entero y la música baja con fundido DESPUÉS; sube con fundido (los f que quepan) hasta el golpe del plano siguiente.
    [hookPlano.en, ALTO],
    ...fundido(hookPlano.en, FADE_OUT.hook, ALTO, BAJO),
    [hook.fin, BAJO],
    ...fundido(hook.fin, Math.min(FADE_IN, siguienteAlHook.en - hook.fin - 2), BAJO, ALTO),
    // MITAD: igual. MD11 deja 3 f tras su última palabra: la música NO alcanza a subir antes del corte; el golpe del plano siguiente suena con ella abajo y la subida (FADE_IN f) empieza en él.
    [mitadPlano.en, ALTO],
    ...fundido(mitadPlano.en, FADE_OUT.mitad, ALTO, BAJO),
    [mitad.fin, BAJO],
    [siguienteALaMitad.en, BAJO],
    ...fundido(siguienteALaMitad.en, FADE_IN, BAJO, ALTO),
    // CTA: igual...
    [ctaPlano.en, ALTO],
    ...fundido(ctaPlano.en, FADE_OUT.cta, ALTO, BAJO),
    [cta.fin, BAJO],
    // ...y al acabar la voz la música vuelve a su nivel «solo»: la canción ya cae sola, así que lo que suena es su cola.
    ...fundido(cta.fin, Math.min(SUBIDA_CTA, FIN_CTA_025 - cta.fin), BAJO, ALTO),
    // La cola suena a su nivel hasta que acaba la toma y se apaga en línea recta bajo la tarjeta.
    [FIN_CTA_025, ALTO],
    [FIN_MUSICA_025, 0],
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica025: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-025/musica-025.wav",
        en: 0,
        dur: FIN_MUSICA_025,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«Heaven on Earth»: el golpe de 15,8 dB del f3 abre la casa, un golpe medido en que entra cada plano, y su caída a partir del f901 (los 209,5 s de la canción), con la voz del CTA empezada y la cola apagándose bajo la tarjeta del cierre; baja ≈ 9-10 LU bajo la voz de Isabella en el hook, la mitad y el CTA.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio025: readonly TramoAudio[] = [...vocesTomas, ...musica025];
