/**
 * EL SONIDO DEL 028 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los 49 trozos de RC14 MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en el hook y en el CTA: los DOS cortes de RC14 a velocidad 1 que traen `audio` (`vocesDeCortes`): mismo arranque que su
 *                imagen, desclic de 3 f (entran a corte), y UNA ganancia por toma hasta `OBJETIVO_LUFS`. Suena la voz TRATADA (`rc14-voz.wav`, ver
 *                `OBJETIVO_LUFS` en metraje-028.ts). La del CTA se apaga 3 f después de «contáctame»: lo que sigue en el micro son golpes graves (roce o
 *                movimiento, casi toda la energía < 150 Hz), no voz. El resto de la toma va MUDO: acelerado, su sonido no se puede usar.
 *   musica       «Street Level Sessions on the Green», con una envolvente que BAJA mientras habla Isabella y sube en el paseo.
 *
 * LA MEZCLA, en LUFS (ebur128 sobre cada fuente, en la ventana que suena):
 *   voz de Isabella      −15 (rev. 1, pedido del usuario: «más decibeles sin saturar»; antes −21). La voz tratada mide −15,0 en el hook y −14,3 en el CTA
 *                        (0 y −0,7 dB de ganancia), con pico real −2,5 dBTP: en la mezcla el pico de la voz queda en −2,5 / −3,2 dBTP
 *   música SOLA          −15: en el paseo. La canción mide −10,8 LUFS entre el final del hook y el CTA (f162-859): una sola ganancia, −4,2 dB (nunca
 *                        un loudnorm, que le cambiaría la dinámica: el respiro de la alcoba secundaria mide −13,9 y tiene que seguir siendo un respiro).
 *   música BAJO LA VOZ   ALTO × 0,15 (−16,5 dB): la canción mide −9,7 LUFS en la ventana del hook y −16,5 en la del CTA (ya se apaga), así que queda a
 *                        ≈ −30,4 / −37,2 LUFS = 15,4 / 22,2 LU bajo la voz (en la rev. 0, con la voz a −21: 9,4 / 16,2). La música no se tocó al subir
 *                        la voz: suena igual que en la rev. 0; lo que cambia es la voz.
 *
 * LAS RAMPAS (regla del canal desde la V6: «la curva debe ser ANTES de que hable», con curva de coseno, nunca un ducking de 2-3 f):
 *   · f0: la música entra EN SU GOLPE (174,780 s suena en el f0), a su nivel, con la puerta abriéndose: el primer segundo impacta. 1 f de entrada (solo
 *     quita el clic: más, y el fundido se come el ataque).
 *   · El hook: baja con coseno de f8 a f24 y la primera palabra suena en el f28.
 *   · Tras «te muestro» (f162) sube con coseno hasta 2 f antes del golpe en que la cámara arranca por la sala (f182): 17 f.
 *   · El CTA: la llegada a la alcoba no tiene golpe; baja con coseno en los 15 f que acaban 3 f antes de su primer sonido (f859).
 *   · Tras «contáctame» (f983) vuelve a su nivel en lo que queda de toma: lo que suena es la cola del final de la canción (−30 dB y bajando), y el
 *     archivo llega al silencio en el f1039, ya en la tarjeta.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_028, FPS_028, INICIO_MUSICA, OBJETIVO_LUFS, metraje028 } from "./metraje-028";

const corte = (id: string) => {
  const c = metraje028.find((x) => x.id === id);
  if (!c) throw new Error(`audio-028: falta ${id} en metraje-028.ts`);
  return c;
};
const HOOK = corte("m02-hook");
const CTA = corte("m14-cta");

/**
 * Frames que la voz del CTA sigue tras «contáctame» (49,35 s de RC14) antes de apagarse del todo, en un fundido lineal. A los 49,42-49,45 s el
 * micro recoge golpes graves (roce o movimiento: −25 dBFS crudos, casi todo < 150 Hz) que la compresión subiría; la imagen sigue hasta el f996.
 */
export const COLA_VOZ_CTA = 3;

/** La voz de las dos tomas a cámara (el hook y el CTA de RC14), derivada del plan de planos; la del CTA, recortada tras su última palabra. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje028, { fps: FPS_028, objetivoLufs: OBJETIVO_LUFS }).map((t) => {
  if (t.id !== `voz-${CTA.id}` || !CTA.voz) return t;
  const fin = frameDeFuente(CTA.en, CTA.desde, CTA.voz.s1, FPS_028) + COLA_VOZ_CTA;
  return {
    ...t,
    dur: fin - t.en,
    sale: COLA_VOZ_CTA,
    curvaSale: "lineal" as const,
    reason: `${t.reason} Se apaga en ${COLA_VOZ_CTA} f tras «contáctame»: lo que sigue en el micro son golpes graves, no voz.`,
  };
});
/** El primer corte de la sala: donde la cámara arranca tras el hook, en su golpe. */
const SALA = metraje028.find((c) => c.meseta === "sala");
if (!SALA) throw new Error("audio-028: falta la meseta «sala» en metraje-028.ts");

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre. */
export const FIN_CTA_028 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (c: (typeof metraje028)[number]): { ini: number; fin: number } => {
  if (!c.voz) throw new Error(`audio-028: ${c.id} no trae voz`);
  return { ini: frameDeFuente(c.en, c.desde, c.voz.s0, FPS_028), fin: frameDeFuente(c.en, c.desde, c.voz.s1, FPS_028) };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la
 * biblioteca de Luxur y su licencia no está verificada (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de la canción en el paseo (f162-859, 180,23-203,47 s, ebur128): lo que suena sola. */
export const LUFS_MESETA = -10.8;
/** La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente): lo que mide la puerta en vez de suponer la meseta. */
export const LUFS_CANCION_EN_VOZ = { "m02-hook": -9.7, "m14-cta": -16.5 } as const;
/** La música SOLA. */
const OBJETIVO_MUSICA = -15;
/** Ganancia lineal de la música sola: −4,2 dB sobre el archivo. */
export const ALTO = gananciaHasta(LUFS_MESETA, OBJETIVO_MUSICA);
/** Mientras habla Isabella: −16,5 dB más (≥ 9 LU bajo su voz en las dos ventanas, medido: ver arriba). */
export const BAJO = ALTO * 0.15;

/** Frames de las curvas. */
const BAJA_HOOK = { desde: 8, hasta: 24 } as const;
const BAJA_CTA = 15;
const AIRE_ANTES_DE_HABLAR = 3;
const AIRE_ANTES_DEL_GOLPE = 2;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

const envolvente = (): [number, number][] => {
  const hook = ventanaDe(HOOK);
  const cta = ventanaDe(CTA);
  const finBajadaCta = cta.ini - AIRE_ANTES_DE_HABLAR;
  const p: [number, number][] = [
    // El golpe de entrada suena en el f0, a su nivel, con la puerta abriéndose.
    [0, 0],
    [1, ALTO],
    // ...y baja con curva antes de que ella hable (f28).
    [BAJA_HOOK.desde, ALTO],
    ...fundido(BAJA_HOOK.desde, BAJA_HOOK.hasta - BAJA_HOOK.desde, ALTO, BAJO),
    [hook.fin, BAJO],
    // Tras «te muestro», sube con curva y llega arriba 2 f antes del golpe en que la cámara arranca por la sala.
    ...fundido(hook.fin, SALA.en - AIRE_ANTES_DEL_GOLPE - hook.fin, BAJO, ALTO),
    // El paseo, a su nivel (el respiro de la canción es suyo, no de la mezcla).
    [finBajadaCta - BAJA_CTA, ALTO],
    ...fundido(finBajadaCta - BAJA_CTA, BAJA_CTA, ALTO, BAJO),
    [cta.fin, BAJO],
    // Tras «contáctame», la cola del final de la canción vuelve a su nivel en lo que queda de toma, y se apaga donde la canción llega al silencio.
    ...fundido(cta.fin, FIN_CTA_028 - cta.fin, BAJO, ALTO),
    [FIN_MUSICA_028, 0],
  ];
  // Los puntos tienen que ir en orden estricto (una rampa corta puede repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica028: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-028/musica-028.wav",
        en: 0,
        dur: FIN_MUSICA_028,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«Street Level Sessions on the Green» desde su golpe de 174,780 s (en el f0) hasta su final, que se apaga solo bajo el CTA y llega al silencio en la tarjeta; cada cambio de velocidad de la cámara cae en uno de sus golpes medidos, y baja ≥ 9 LU bajo la voz de Isabella.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio028: readonly TramoAudio[] = [...vocesTomas, ...musica028];
