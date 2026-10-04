/**
 * EL SONIDO DEL 018 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos
 * pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK07, MD07 y CT01, derivada de los cortes
 *                que traen `audio` (`vocesDeCortes`): mismo arranque que su
 *                imagen, cruce de 6 f con la disolvencia y UNA ganancia por toma
 *                hasta `OBJETIVO_LUFS`. Las tres son iguales: la primera toma sale
 *                sin voz, ella no habla hasta que su imagen es opaca, y el hook es
 *                una toma más.
 *   musica       «Return to Oasis», con una envolvente que BAJA mientras habla Isabella
 *                y sube en los recorridos. No se escribe a mano: la calcula
 *                `envolventeBajoVoz` desde las ventanas de voz, así que mover un
 *                corte la mueve.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente):
 *   voz de Isabella      −21 (sus tomas miden −18,7 · −19,3 · −22,1)
 *   música SOLA          −15: arriba, en los recorridos y el golpe de apertura
 *   música BAJO LA VOZ   −31: ≈ 10 LU por debajo de ella (ALTO × 0,16 = −16 dB)
 * La canción viene masterizada a −8,5 LUFS en la meseta (picos a +1 dBFS) y a −20,5 en la resolución:
 * una ganancia (nunca un loudnorm, que le cambiaría la dinámica) la lleva a su sitio.
 *
 * LA RESOLUCIÓN BAJO EL CTA. En el pulso 68 (frame 1115) la canción cae 12 LU a un piano suelto, justo cuando
 * entra Isabella en el CTA. Con la ganancia de la música sola ese piano quedaría en −27 LUFS: 6 LU bajo su voz, poco
 * (en el 017, con «Time», eran 10,5). Así que la voz del CTA baja la música UN POCO más, −4,4 dB (`BAJO_CTA`):
 * −31,4 LUFS, 10,4 LU bajo ella, sin matar el lecho (con el −16 dB de las otras dos tomas quedaría inaudible).
 *
 * EL FINAL. Tras la última palabra de Isabella la imagen funde a negro y sigue una tarjeta oscura con el logo y la
 * web. A diferencia de «Time», esta canción NO vuelve a pegar fuerte tras su resolución: el piano sigue de lecho bajo
 * la toma y bajo la tarjeta, y se apaga en ella: la envolvente baja en línea recta desde el fin de la toma del CTA
 * hasta `FIN_MUSICA_018`, 2 frames antes del final de la pieza.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { envolventeBajoVoz, frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_018, FPS_018, INICIO_MUSICA, OBJETIVO_LUFS, metraje018 } from "./metraje-018";

/** La voz de las tres tomas a cámara (HK07, MD07 y CT01), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje018, { fps: FPS_018, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre y el piano empieza a apagarse. */
const CTA = metraje018.find((c) => c.id === "c12-cta");
if (!CTA) throw new Error("audio-018: falta c12-cta en metraje-018.ts");
export const FIN_CTA_018 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number } => {
  const c = metraje018.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-018: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_018);
  return { en: ini, dur: frameDeFuente(c.en, c.desde, c.voz.s1, FPS_018) - ini };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma
 * encima. La canción es una pista de la biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Return to Oasis» entre el 143,0 y el 180,0 s (ebur128), la meseta: lo que suena en los recorridos. */
const LUFS_MESETA = -8.5;
/** La música SOLA. */
const OBJETIVO_MUSICA = -15;
/** Ganancia lineal de la música sola: −6,5 dB sobre el archivo. */
const ALTO = gananciaHasta(LUFS_MESETA, OBJETIVO_MUSICA);
/** Mientras habla Isabella en el hook y la mitad: −16 dB más (≈ 10 LU bajo su voz). */
const BAJO = ALTO * 0.16;
/** Bajo la voz del CTA: −4,4 dB más sobre un piano que ya es 12 LU más bajo que la meseta (≈ 10 LU bajo su voz). */
const BAJO_CTA = ALTO * 0.6;

/**
 * Las voces contra las que baja la música: las ventanas MEDIDAS del hook y de la mitad, para que suba en cuanto se
 * callan y no cuando acaba el plano. La del CTA va aparte, con su propio nivel (ver la cabecera).
 */
const habladoQueBaja: readonly { en: number; dur: number }[] = [ventanaDe("c02-hook"), ventanaDe("c06-mitad")];
const vozCta = ventanaDe("c12-cta");

/** La envolvente: hook y mitad con `envolventeBajoVoz`, y a partir del CTA su propio ducking y el apagado final. */
const envolvente = (): [number, number][] => {
  const base = envolventeBajoVoz(habladoQueBaja, {
    alto: ALTO,
    bajo: BAJO,
    rampa: 12,
    duracion: FIN_MUSICA_018,
    // 1 f de fundido: el colchón de 38 ms que trae `INICIO_MUSICA` antes del golpe, y nada más.
    entrada: 1,
  });
  // `base` acaba en [FIN_MUSICA_018, ALTO]: se quita ese último punto y se sigue con el CTA.
  const hasta = base.slice(0, -1);
  return [
    ...hasta,
    // Baja 12 f ANTES de la primera palabra del CTA (la meseta aún suena: la caída de la canción es en el mismo frame
    // en que entra su imagen), se queda abajo durante toda la toma y se apaga en línea recta bajo la tarjeta.
    [vozCta.en - 12, ALTO],
    [vozCta.en, BAJO_CTA],
    [FIN_CTA_018, BAJO_CTA],
    [FIN_MUSICA_018, 0],
  ];
};

export const musica018: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-018/musica-018.wav",
        en: 0,
        dur: FIN_MUSICA_018,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«Return to Oasis»: el golpe de apertura en el frame 0, una meseta estable de 37 s con golpes fuertes en los cortes grandes, y la caída a un piano suelto en el mismo frame en que entra el CTA, que se apaga bajo la tarjeta del cierre; baja ≈ 10 LU bajo su voz (−16 dB) mientras habla Isabella en el hook y la mitad, y −4,4 dB bajo el CTA.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio018: readonly TramoAudio[] = [...vocesTomas, ...musica018];
