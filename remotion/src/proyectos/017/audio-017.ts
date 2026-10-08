/**
 * EL SONIDO DEL 017 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos
 * pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK02, MD09 y CT07, derivada de los cortes
 *                que traen `audio` (`vocesDeCortes`): mismo arranque que su
 *                imagen, cruce de 6 f con la disolvencia y UNA ganancia por toma
 *                hasta `OBJETIVO_LUFS`. Las tres son iguales: hasta la revisión 4
 *                la del hook era un tramo aparte que sonaba sobre el dron; ahora
 *                que la primera toma sale sin texto, ella no habla hasta que su
 *                imagen es opaca y el hook es una toma más.
 *   musica       «Time», con una envolvente que BAJA mientras habla Isabella y
 *                sube en los recorridos. No se escribe a mano: la calcula
 *                `envolventeBajoVoz` desde las ventanas de voz, así que mover un
 *                corte la mueve.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente):
 *   voz de Isabella      −15 (rev. 9, pedido del usuario: «más decibeles sin saturar»; hasta la rev. 8, −21). Suena la voz TRATADA
 *                        (`<toma>-voz.wav`; sus tomas crudas miden −21,1 · −21,7 · −18,9): −15,0 LUFS en las tres, pico real −2,5 dBTP
 *   música SOLA          −15: arriba, en los recorridos y el golpe de apertura
 *   música BAJO LA VOZ   −31: ≈ 16 LU por debajo de ella (ALTO × 0,16 = −16 dB; la música no se toca: la voz sube, no la música baja)
 * La canción viene masterizada a −7,7 LUFS en la meseta (picos a +0,1 dBFS) y a
 * −24,2 en la resolución final: una ganancia (nunca un loudnorm, que le cambiaría
 * la dinámica) la lleva a su sitio.
 *
 * LA RESOLUCIÓN BAJO EL CTA. Desde el pulso 40 (frame 1145) la canción cae por
 * sí misma 16,5 dB a un piano suelto, así que la voz de CT07 NO baja la música
 * una segunda vez: ya está en −31,5 LUFS, 16,5 LU bajo ella (10,5 hasta la rev. 8,
 * con la voz a −21). Ducking encima la dejaría inaudible.
 *
 * EL FINAL (revisión 6). Tras la última palabra de Isabella la imagen funde a negro y sigue
 * una tarjeta oscura con el logo y la web. El piano se apaga desde que acaba su toma (f1339,
 * donde empieza la tarjeta) hasta `FIN_MUSICA_017`, DOS frames antes de que «Time» vuelva a
 * pegar (el pulso 48, el frame 1373); el resto de la tarjeta (hasta el final de la pieza)
 * queda en silencio. La música ya no ocupa la pieza entera: acaba en `FIN_MUSICA_017`.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { envolventeBajoVoz, frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_017, FPS_017, INICIO_MUSICA, OBJETIVO_LUFS, metraje017 } from "./metraje-017";

/** La voz de las tres tomas a cámara (HK02, MD09 y CT07), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje017, { fps: FPS_017, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre y el piano empieza a apagarse. */
const CTA = metraje017.find((c) => c.id === "c11-cta");
if (!CTA) throw new Error("audio-017: falta c11-cta en metraje-017.ts");
export const FIN_CTA_017 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number } => {
  const c = metraje017.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-017: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_017);
  return { en: ini, dur: frameDeFuente(c.en, c.desde, c.voz.s1, FPS_017) - ini };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica
 * con un audio de la plataforma encima (la canción es comercial: ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Time» entre el 183,2 y el 213,7 s (ebur128), la meseta: lo que suena en los recorridos. */
const LUFS_MESETA = -7.7;
/** La música SOLA. */
const OBJETIVO_MUSICA = -15;
/** Ganancia lineal de la música sola: −7,3 dB sobre el archivo. */
const ALTO = gananciaHasta(LUFS_MESETA, OBJETIVO_MUSICA);
/** Mientras habla Isabella: −16 dB más (≈ 10 LU bajo su voz). */
const BAJO = ALTO * 0.16;

/**
 * Las voces contra las que baja la música: las ventanas MEDIDAS del hook y de la
 * mitad, para que suba en cuanto se callan y no cuando acaba el plano. La del CTA
 * no entra (ver la cabecera): la canción ya está abajo.
 */
const habladoQueBaja: readonly { en: number; dur: number }[] = [ventanaDe("c02-hook"), ventanaDe("c07-mitad")];

export const musica017: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-017/musica-017.wav",
        en: 0,
        dur: FIN_MUSICA_017,
        desde: INICIO_MUSICA,
        ganancia: envolventeBajoVoz(habladoQueBaja, {
          alto: ALTO,
          bajo: BAJO,
          rampa: 12,
          duracion: FIN_MUSICA_017,
          // 1 f de fundido: el colchón de 33,7 ms que trae `INICIO_MUSICA` antes del golpe, y nada más.
          entrada: 1,
          // El piano se apaga desde el fin de la toma del CTA (donde empieza la tarjeta) hasta FIN_MUSICA_017.
          cola: FIN_MUSICA_017 - FIN_CTA_017,
        }),
        reason:
          "«Time»: el golpe de apertura en el frame 0, el golpe grande en la fachada, la frase más alta en el patio y la resolución de piano bajo el CTA, que se apaga bajo la tarjeta del cierre antes de que vuelva a pegar; baja ≈ 10 LU bajo su voz (−16 dB) mientras habla Isabella.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio017: readonly TramoAudio[] = [...vocesTomas, ...musica017];
