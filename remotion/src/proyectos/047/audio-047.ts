/**
 * EL SONIDO DEL 047 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK02, MD04, MD05 y CT03, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, desclic de 3 f en el f0 y cruce de voz de 6 f en las tres
 *                disolvencias y, como el WAV es el TRATADO de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a ≈ −15 LUFS en su ventana), UNA ganancia de ±0,1 dB.
 *   musica       «Dreamlife», un LECHO debajo de la voz durante toda la pieza y su caída bajo el CTA.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente, `herramientas/lufs-rangos.py`):
 *   voz de Isabella      −15 (pedido del usuario: «la voz de Isabella a −15 LUFS sin saturar»; sus tomas crudas miden −19,4 · −23,2 · −23,8 · −20,5; tratadas, ≈ −15 con pico real de −2,5)
 *   música BAJO LA VOZ   ≈ −26 LUFS: 11 LU por debajo de ella. La canción entra en su meseta (−10,3 LUFS de 202,1 a 217,3 s) y la ganancia de −15,5 dB la deja en −25,8. Aquí NO hay un tramo de «música sola»: la pieza son
 *                        cuatro tomas de Isabella seguidas, con 21-24 f (0,7-0,8 s) entre una frase y la siguiente: no da para subir y bajar la música entre ellas (bombearía). Va abajo todo el tiempo.
 *
 * LA ENTRADA Y LA CAÍDA.
 *   · ENTRADA: la canción arranca en el f0 con un fundido de coseno de 8 f (no hay golpe donde entrar: se arranca 0,13 s antes del escalón de la meseta, que suena en el f5). La primera sílaba de Isabella suena en el f13.
 *   · LA CAÍDA de la canción está en los 217,3 s: cae en el f457 y el CTA entra en el f459 (su primera sílaba, en el f460). La canción cae de −12 a −18 dBFS en 0,6 s y de ahí un fundido de 20 s hasta el silencio.
 *     La ganancia SIGUE esa caída (`CAIDA`: de −15 dB absolutos a 0 dB en 5,7 s: sube conforme la canción baja) para que bajo la voz quede siempre ≥ 9 LU por debajo de ella, y al acabar su última palabra
 *     (f623) la música se APAGA con curva de coseno hasta llegar a cero 2 f antes del final de la pieza, bajo la tarjeta del cierre.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { CAIDA_CANCION, FIN_MUSICA_047, FPS_047, INICIO_MUSICA, OBJETIVO_LUFS, frameDeCancion, metraje047 } from "./metraje-047";

/** La voz de las cuatro tomas a cámara (HK02, MD04, MD05 y CT03), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje047, { fps: FPS_047, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre. */
const CTA = metraje047.find((c) => c.id === "c04-cta");
if (!CTA) throw new Error("audio-047: falta c04-cta en metraje-047.ts");
export const FIN_CTA_047 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number } => {
  const c = metraje047.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-047: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_047);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_047);
  return { en: ini, dur: fin - ini, fin };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la biblioteca de Luxur (marcada † en el catálogo) y no se ha
 * verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Dreamlife» entre los 202,1 y los 217,3 s (ebur128 sobre la fuente, `lufs-rangos.py`): la meseta que suena debajo de las tres primeras tomas y del principio de la cuarta. */
export const LUFS_CANCION_EN_VOZ = -10.3;
/** La música bajo la voz: 11 LU por debajo de ella (−15 LUFS). */
export const LUFS_MUSICA_BAJO_VOZ = -26;
/** La ganancia del lecho, en dB absolutos sobre el archivo: la de `LUFS_MUSICA_BAJO_VOZ` sobre `LUFS_CANCION_EN_VOZ` (−15,7), redondeada a −15,5. */
export const DB_LECHO = -15.5;

/** El instante de la canción que cada punto de `CAIDA` toca, y su ganancia en dB ABSOLUTA sobre el archivo (la canción cae sola a ≈ −25 LUFS hacia el 223 s: a partir de ahí no hay nada que bajar). */
export const CAIDA: readonly (readonly [number, number])[] = [
  [CAIDA_CANCION + 0.6, -12.0], // 217,9 s: la canción ya bajó 6 dB; la voz lleva 15 f hablando
  [CAIDA_CANCION + 1.2, -10.0], //  218,5 s
  [CAIDA_CANCION + 1.7, -8.4], //   219,0 s
  [CAIDA_CANCION + 2.7, -6.9], //   220,0 s
  [CAIDA_CANCION + 3.7, -3.8], //   221,0 s
  [CAIDA_CANCION + 4.7, -2.2], //   222,0 s
  [CAIDA_CANCION + 5.7, 0.0], //    223,0 s: la canción ya está a −25 LUFS
];

/** Frames de la entrada de la canción en el f0 (coseno desde 0). */
export const FADE_ENTRADA = 8;
/** Frames que tarda la música en apagarse tras la última palabra del CTA: hasta 2 f antes del final de la pieza (la tarjeta va en silencio). */
const APAGADO_CTA_HASTA = FIN_MUSICA_047;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

const dB = (x: number): number => Math.pow(10, x / 20);

/** La envolvente: la entrada, el lecho debajo de las cuatro voces, la caída bajo el CTA y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const cta = ventanaDe("c04-cta");
  const lecho = dB(DB_LECHO);
  // La caída, en frames de la comp: solo los puntos que caen DENTRO de la voz del CTA (los que caen después los cubre el apagado).
  const caida = CAIDA.map(([t, db]) => [Math.round(frameDeCancion(t)), dB(db)] as [number, number]);
  const dentro = caida.filter(([f]) => f < cta.fin);
  // La ganancia que la caída tiene en la última palabra del CTA (interpolación lineal entre los dos puntos que la rodean).
  const sig = caida.find(([f]) => f >= cta.fin);
  const ant = dentro[dentro.length - 1];
  const enFin = sig && ant ? ant[1] + ((sig[1] - ant[1]) * (cta.fin - ant[0])) / (sig[0] - ant[0]) : 1;

  const p: [number, number][] = [
    // ENTRADA: la canción arranca en el f0 y llega al lecho en 8 f.
    ...fundido(0, FADE_ENTRADA, 0, lecho),
    // EL LECHO: debajo de las tres primeras tomas y hasta que la canción cae (f457).
    [Math.round(frameDeCancion(CAIDA_CANCION)), lecho],
    // LA CAÍDA: la ganancia sube conforme la canción baja, de modo que bajo la voz del CTA queda siempre a ≈ −25 LUFS.
    ...dentro,
    [cta.fin, enFin],
    // …y al acabar la voz la música se APAGA con curva de coseno hasta cero, 2 f antes del final de la pieza (la tarjeta va en silencio).
    ...fundido(cta.fin, APAGADO_CTA_HASTA - cta.fin, enFin, 0).slice(1),
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica047: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-047/musica-047.wav",
        en: 0,
        dur: FIN_MUSICA_047,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«Dreamlife» entra en el frame 0 sobre el escalón de su meseta, va como lecho (−26 LUFS) debajo de la voz de las cuatro tomas, cae en el f457 donde entra la voz del CTA y se apaga bajo la tarjeta.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio047: readonly TramoAudio[] = [...vocesTomas, ...musica047];
