/**
 * EL SONIDO DEL 048 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK01, MD03 y CT03, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, desclic de 3 f (las tres entran a corte) y, como el WAV es el TRATADO
 *                de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a ≈ −15 LUFS en su ventana), UNA ganancia de ±0,1 dB.
 *   musica       «L' Amour Toujours on SAXOPHONE», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos. No es la de `envolventeBajoVoz`: aquí el golpe en que entra cada toma (a corte) tiene que sonar
 *                entero, la música baja con curva DESPUÉS y acaba ANTES de la primera palabra.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre la canción decodificada, en cada ventana):
 *   voz de Isabella      −15 (pedido del usuario: «la voz de Isabella a −15 LUFS sin saturar»; sus tomas crudas miden −21,7 · −20,2 · −20,5; tratadas, ≈ −15 con pico real de −2,5)
 *   música SOLA          −15 por tramos, el nivel de la voz: la canción es PLANA y MUY ALTA (−9,4 a −10,7 LUFS, con picos de 0,0 a +0,1 dBFS en el archivo), así que cada tramo lleva su ganancia (de −4,3 a −5,7 dB)
 *                        y el pico real queda por debajo de −4,4 dBFS.
 *   música BAJO LA VOZ   −26 en cada ventana de voz: 11 LU por debajo de ella (`BAJOS`).
 * Una sola ganancia por tramo, sin `loudnorm` (le cambiaría la dinámica).
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · La APERTURA: el frame 0 es Isabella (excepción declarada), pero su voz no llega hasta el f30. La música abre con una nota de 10,5 dB en el f3 que suena entera hasta el f10 y baja con curva de coseno en 18 f (f10-f28):
 *     acaba 2 f ANTES de su primera palabra.
 *   · La MITAD entra A CORTE en el golpe del f517 (suena entero): la música baja con curva de coseno en 6 f y la primera palabra suena 10 f después (f527). El CTA, igual: golpe en el f1118, bajada de 6 f y primera palabra
 *     en el f1128.
 *   · Al acabar la voz la música sube con curva en 24 f: tras el hook sube hasta el f222 (el plano siguiente, el gimnasio, corta en el f303) y tras la mitad hasta el f731 (el baño corta en el f839).
 *
 * EL CTA Y EL CIERRE. Entra en el f1118 y la canción acaba con su fundido natural (de −13 a −47 dB, 3 s desde el 205,9 s de la pista: f1233-1323), bajo la voz del CTA y la tarjeta. Al acabar su última palabra (f1290) la
 * envolvente la lleva a cero con curva de coseno 2 f antes del final de la pieza (la tarjeta va en silencio).
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_048, FPS_048, INICIO_MUSICA, OBJETIVO_LUFS, metraje048 } from "./metraje-048";

/** La voz de las tres tomas a cámara (HK01, MD03 y CT03), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje048, { fps: FPS_048, objetivoLufs: OBJETIVO_LUFS });

const porId = (id: string) => {
  const c = metraje048.find((x) => x.id === id);
  if (!c) throw new Error(`audio-048: falta ${id} en metraje-048.ts`);
  return c;
};

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number } => {
  const c = porId(id);
  if (!c.voz) throw new Error(`audio-048: ${id} no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_048);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_048);
  return { en: ini, dur: fin - ini, fin };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la biblioteca de Luxur y no se ha verificado su licencia
 * (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre la fuente): la apertura (164,97-165,77 s), el paseo (172,37-182,47 s: f222-517) y el bloque 5 (189,27-201,77 s: f731-1118). */
const LUFS_TRAMO = { apertura: -10.7, paseo: -9.5, bloque5: -9.7 } as const;
/** El pico real de la canción en cada uno de esos tramos (ebur128, dBFS): la música nunca pasa de `TECHO_PICO`. */
const PICO_TRAMO = { apertura: -0.3, paseo: 0.1, bloque5: 0.1 } as const;
const TECHO_PICO = -0.5;
/**
 * La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente, el tramo de la canción que suena mientras ella habla): lo que mide la puerta en lugar de suponer la meseta en todas. En la del CTA, la de la parte plana (202,6-205,9 s), antes de que la canción se apague.
 */
export const LUFS_CANCION_EN_VOZ = { "c01-hook": -9.4, "c05-mitad": -9.6, "c09-cta": -9.5 } as const;
/** La sonoridad media de la canción en toda la pieza (ebur128): solo para los avisos de la puerta. */
export const LUFS_MESETA = -9.5;
/** La música SOLA: el nivel de la voz. */
const OBJETIVO_MUSICA = -15;
/** Ganancia lineal de la música sola en cada tramo (−4,3 · −5,5 · −5,3 dB sobre el archivo): ningún pico pasa de −4,4 dBFS. */
export const ALTOS = {
  apertura: Math.min(gananciaHasta(LUFS_TRAMO.apertura, OBJETIVO_MUSICA), Math.pow(10, (TECHO_PICO - PICO_TRAMO.apertura) / 20)),
  paseo: Math.min(gananciaHasta(LUFS_TRAMO.paseo, OBJETIVO_MUSICA), Math.pow(10, (TECHO_PICO - PICO_TRAMO.paseo) / 20)),
  bloque5: Math.min(gananciaHasta(LUFS_TRAMO.bloque5, OBJETIVO_MUSICA), Math.pow(10, (TECHO_PICO - PICO_TRAMO.bloque5) / 20)),
} as const;
/** Mientras habla Isabella: la música baja hasta −26 LUFS EN CADA VENTANA (11 LU bajo su voz de −15). */
export const LUFS_MUSICA_BAJO_VOZ = -26;
export const BAJOS = {
  "c01-hook": gananciaHasta(LUFS_CANCION_EN_VOZ["c01-hook"], LUFS_MUSICA_BAJO_VOZ),
  "c05-mitad": gananciaHasta(LUFS_CANCION_EN_VOZ["c05-mitad"], LUFS_MUSICA_BAJO_VOZ),
  "c09-cta": gananciaHasta(LUFS_CANCION_EN_VOZ["c09-cta"], LUFS_MUSICA_BAJO_VOZ),
} as const;
/**
 * LOS FUNDIDOS (pedido del usuario en la V6, ya regla del canal): el golpe en que entra ella (a corte) suena entero y la música baja DESPUÉS con curva de coseno; la curva ACABA ANTES de su primera palabra.
 *   · hook: la nota del f3 suena hasta el f10 y la curva dura 18 f (f10-f28); la primera palabra suena en el f30.
 *   · mitad y CTA: la curva dura 6 f desde el golpe y la primera palabra suena 10 f después.
 * Y SUBE de nuevo con curva de FADE_IN f tras su última palabra (la subida a medias falsearía la medida de `golpes-render.py`).
 */
export const FADE_OUT = { hook: 18, mitad: 6, cta: 6 } as const;
export const HOOK_BAJADA_DESDE = 10;
export const FADE_IN = 24;
/** Frames que tarda la música en apagarse tras la última palabra del CTA: hasta 2 f antes del final de la pieza (la tarjeta va en silencio). */
const APAGADO_CTA_HASTA = FIN_MUSICA_048;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** La envolvente: la nota de apertura, el hook, la mitad y el CTA con su fundido, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c01-hook");
  const mitad = ventanaDe("c05-mitad");
  const cta = ventanaDe("c09-cta");
  const mitadPlano = porId("c05-mitad");
  const ctaPlano = porId("c09-cta");
  const baño = porId("c07-bano");

  const p: [number, number][] = [
    // LA APERTURA: 1 f de entrada para no meter un clic; la nota del f3 suena a su nivel y la curva baja ANTES de la primera palabra.
    [0, 0],
    [1, ALTOS.apertura],
    [HOOK_BAJADA_DESDE, ALTOS.apertura],
    ...fundido(HOOK_BAJADA_DESDE, FADE_OUT.hook, ALTOS.apertura, BAJOS["c01-hook"]),
    [hook.fin, BAJOS["c01-hook"]],
    // Al acabar el hook sube con curva a su nivel «solo» del paseo: hasta el f222 (el gimnasio corta en el f309).
    ...fundido(hook.fin, FADE_IN, BAJOS["c01-hook"], ALTOS.paseo),
    // MITAD: entra a corte en el golpe (suena entero), baja con curva DESPUÉS y sube tras su última palabra a su nivel del bloque 5.
    [mitadPlano.en, ALTOS.paseo],
    ...fundido(mitadPlano.en, FADE_OUT.mitad, ALTOS.paseo, BAJOS["c05-mitad"]),
    [mitad.fin, BAJOS["c05-mitad"]],
    ...fundido(mitad.fin, Math.min(FADE_IN, baño.en - mitad.fin - 2), BAJOS["c05-mitad"], ALTOS.bloque5),
    // CTA: igual...
    [ctaPlano.en, ALTOS.bloque5],
    ...fundido(ctaPlano.en, FADE_OUT.cta, ALTOS.bloque5, BAJOS["c09-cta"]),
    [cta.fin, BAJOS["c09-cta"]],
    // ...y al acabar la voz la música se APAGA con curva de coseno hasta cero, 2 f antes del final de la pieza (la tarjeta va en silencio).
    ...fundido(cta.fin, APAGADO_CTA_HASTA - cta.fin, BAJOS["c09-cta"], 0),
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica048: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-048/musica-048.wav",
        en: 0,
        dur: FIN_MUSICA_048,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«L' Amour Toujours on SAXOPHONE» (sax, 126 BPM): una nota de 10,5 dB en el f3 abre la pieza bajo el hook de Isabella; un golpe medido de 8,2 a 12,0 dB en que entra cada corte seco (las disolvencias van libres); y su final natural —un fundido de −13 a −47 dB entre los f1233 y f1323— cae bajo la voz del CTA y la tarjeta; tras «…vale la pena conocer» se apaga del todo.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio048: readonly TramoAudio[] = [...vocesTomas, ...musica048];

/** Para la puerta: no hay voz en off en esta pieza (la plantilla la tenía). */
export const voces048 = vocesTomas;
export const off048: readonly TramoAudio[] = [];
