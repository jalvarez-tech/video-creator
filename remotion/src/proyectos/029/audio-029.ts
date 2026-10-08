/**
 * EL SONIDO DEL REEL 029 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   voces029   la voz de Isabella en sus seis tomas. No se escribe: sale de los cortes que traen `audio`
 *              (`vocesDeCortes`), con el MISMO arranque que su imagen y el cruce con la disolvencia. Suena el WAV
 *              TRATADO de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y
 *              limitador), que ya viene a −15,0 LUFS en su ventana de voz: aquí la ganancia es 1 (`OBJETIVO_LUFS` = `voz.lufs`).
 *              Fuera de su frase el WAV tratado es silencio, de modo que lo que `5 Cta` trae después (el «y se acabará…» de la
 *              primera toma, el «haz clic…» de las demás) no suena en los 0,8 s de hueco.
 *   musica029  *Pictures from the Past*, desde su golpe de 57,056 s (`INICIO_MUSICA`), con una envolvente que BAJA antes de la
 *              primera palabra, acompaña a la voz como cama y se aparta al final. Tampoco se escribe a ciegas: sus números
 *              salen de dos medidas de la canción (abajo).
 *
 * No hay voz en off ni SFX (reglas del canal: sin whooshes ni impactos); `off029` queda vacío para que la puerta compartida lo lea.
 *
 * LA MÚSICA. Pedido del usuario: «canciones que no estén en otros videos» (la reserva está en `archivos/musica/registro-de-uso.md`,
 * V13). Medida con `buscar-entrada.py --cta 17 23` y `curva-rms`: golpe de 13,3 dB en 57,056 s (el frame 0), meseta de −12 dB hasta
 * 75 s (f539) y, desde ahí, UNA CAÍDA de ≈ 10 dB en 2,5 s hasta un lecho de −23 dB con un valle de −28 a los 78 s (f630-645); luego
 * golpes de 6-13 dB sobre el lecho. La caída cae sobre «haz clic en el enlace y agendemos su visita»: la música se aparta de las
 * palabras de la acción. Como bajo la voz esa caída la dejaría inaudible, la envolvente la COMPENSA a medias (+6 dB desde f539 en
 * 2 s): la canción resuelve sin desaparecer. Tras la última palabra se apaga ANTES de su siguiente golpe (f731) y la tarjeta del
 * cierre queda en silencio.
 *
 * LA MÚSICA BAJA Y SUBE CON CURVA (coseno) y la bajada ACABA antes de la primera palabra (pedido del usuario en el 022: «debe ser la
 * curva antes de que hable»). Aquí solo hay una bajada y una subida: de la primera palabra a la última hay voz cada 0,8 s, y subir y
 * bajar en cada hueco bombearía.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { DURACION_029, FPS_029, OBJETIVO_LUFS, metraje029 } from "./metraje-029";

/** La voz de las tomas a cámara, derivada del plan de planos. */
export const voces029: readonly TramoAudio[] = vocesDeCortes(metraje029, { fps: FPS_029, objetivoLufs: OBJETIVO_LUFS });

/** Un tramo de voz en off: un `TramoAudio` que además sabe dónde se habla en su fuente. Esta pieza no lleva voz en off. */
export interface TramoOff extends TramoAudio {
  /** Segundos de la FUENTE en que empieza y acaba de hablar (`limites-voz.py`). */
  voz: { s0: number; s1: number };
}
export const off029: readonly TramoOff[] = [];

/** ¿La música va en el render? Con `true`, `recorrido-029/musica-029.wav` tiene que existir (lo deja `normalizar.mjs`, sin normalizar). */
export const HAY_MUSICA = true;

/** Segundo de la canción en que arranca: 30 ms ANTES de su golpe de entrada (57,056 s), que cae así en el frame 1 y deja el frame 0 sin clic. */
export const INICIO_MUSICA = 57.026;
/** Segundo de la canción en que su meseta empieza a caer (medido: de −12 dB a −23 dB entre 75 y 77,5 s). */
const CAIDA_CANCION_S = 75.0;
/** Sonoridad de la meseta de la canción (LUFS, ebur128 de 57,03 a 77,03 s, SIN normalizar). */
const LUFS_MESETA = -10.2;

/** La música sola, a −15 LUFS, y la cama bajo la voz: ≈ −11 dB (la voz va a −15 LUFS, así que la cama queda ≈ 11 LU por debajo). */
const ALTO = gananciaHasta(LUFS_MESETA, -15);
const BAJO = ALTO * 0.28;
/** Lo que se sube la cama cuando la canción cae (+6 dB): la caída natural es de ≈ 10 dB y compensarla toda la dejaría plana. */
const COMPENSACION = 2.0;

/** Un fundido de coseno de `de` a `a` en `n` f desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

const conVoz = metraje029.filter((c) => c.voz !== undefined);
const primera = conVoz[0];
const ultima = conVoz[conVoz.length - 1];
if (primera.voz === undefined || ultima.voz === undefined) throw new Error("audio-029: ninguna toma lleva `voz`");
/** El frame de la primera sílaba del reel y el de la última palabra del CTA (la misma cuenta que la imagen). */
export const PRIMERA_PALABRA = frameDeFuente(primera.en, primera.desde, primera.voz.s0, FPS_029);
export const ULTIMA_PALABRA = frameDeFuente(ultima.en, ultima.desde, ultima.voz.s1, FPS_029);
/** El frame de la composición en que la canción empieza a caer. */
export const CAIDA_F = Math.round((CAIDA_CANCION_S - INICIO_MUSICA) * FPS_029);
/** Frames de la bajada (acaba en la primera palabra) y del apagado final (acaba antes del siguiente golpe de la canción). */
const FADE_OUT = 10;
const APAGADO = 22;

export const musica029: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-029/musica-029.wav",
        en: 0,
        dur: DURACION_029,
        desde: INICIO_MUSICA,
        entra: 1,
        ganancia: [
          [0, ALTO],
          ...fundido(PRIMERA_PALABRA - FADE_OUT, FADE_OUT, ALTO, BAJO),
          ...fundido(CAIDA_F, 60, BAJO, BAJO * COMPENSACION),
          [ULTIMA_PALABRA, BAJO * COMPENSACION],
          ...fundido(ULTIMA_PALABRA, APAGADO, BAJO * COMPENSACION, 0).slice(1),
        ] as [number, number][],
        reason: "La canción entra en su golpe (frame 1), baja antes de la primera palabra, resuelve bajo el CTA y se apaga antes de la tarjeta.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio029: readonly TramoAudio[] = [...voces029, ...off029, ...musica029];
