/**
 * EL SONIDO DEL REEL 029 — todo lo que suena, como DATOS (`TramoAudio[]`). Rev. 1.
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   voces029   la voz de Isabella en sus tres tomas (hook, mitad y CTA). No se escribe: sale de los cortes que traen `audio` (`vocesDeCortes`),
 *              con el MISMO arranque que su imagen y el cruce con la disolvencia. Suena el WAV TRATADO de `normalizar.mjs` (`<toma>-voz.wav`:
 *              graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador), que ya viene a −15,0 LUFS en su ventana de voz: aquí la
 *              ganancia es 1 (`OBJETIVO_LUFS` = `voz.lufs`). Fuera de su frase el WAV tratado es silencio.
 *   musica029  *Pictures from the Past*, desde su golpe de 45,330 s (`INICIO_MUSICA`), con una envolvente que BAJA antes de cada frase de Isabella,
 *              sube en los dos recorridos y resuelve bajo el CTA. Sus números salen de medidas de la canción (abajo).
 *
 * No hay voz en off ni SFX (reglas del canal: sin whooshes ni impactos); `off029` queda vacío para que la puerta compartida lo lea.
 *
 * LA MÚSICA. Pedido del usuario: «canciones que no estén en otros videos» (la reserva está en `archivos/musica/registro-de-uso.md`, V13). Entrada
 * medida con `buscar-entrada.py --cta 29 35`: golpe de 11,7 dB en 45,330 s (el frame 1), un arco que sube de −15 a −12 dB y, desde 30,0 s de la
 * pieza, UNA CAÍDA de ≈ 10 dB en 3 s hasta un valle de −22 dB a los 33,3 s (golpe de 13 dB al salir de él) que cae sobre el principio del CTA: la
 * canción se aparta justo antes de «haz clic». Sin pulso fijo (60 % de los golpes fuertes a ≤ 15 ms de la mejor recta): los cortes secos van a
 * golpes MEDIDOS (`proyectos/029/musica/golpes-029.json`).
 *
 * LA MÚSICA BAJA Y SUBE CON CURVA (coseno) y la bajada ACABA antes de la primera sílaba (pedido del usuario en el 022: «debe ser la curva antes de
 * que hable»); sube en los 24 f siguientes a la última palabra. Como bajo la voz la caída de la canción la dejaría inaudible, la envolvente la
 * COMPENSA a medias (+6 dB en 2 s): la canción resuelve sin desaparecer. Tras la última palabra se apaga ANTES de su siguiente golpe y la tarjeta
 * del cierre queda en silencio.
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

/** Segundo de la canción en que arranca: 30 ms ANTES de su golpe de entrada (45,330 s), que cae así en el frame 1 y deja el frame 0 sin clic. */
export const INICIO_MUSICA = 45.3;
/** Segundo de la PIEZA en que la meseta de la canción empieza a caer (medido: de −12 dB a −22 dB entre los 30,0 y los 33,3 s). */
const CAIDA_S = 30.0;
/** Sonoridad de la canción SIN normalizar entre los 46 y los 71 s de la canción (LUFS, ebur128): el tramo previo a la caída. */
const LUFS_MESETA = -11.2;

/** La música sola, a −15 LUFS, y la cama bajo la voz: ≈ −11 dB (la voz va a −15 LUFS, así que la cama queda ≈ 11 LU por debajo). */
const ALTO = gananciaHasta(LUFS_MESETA, -15);
const BAJO = ALTO * 0.28;
/** Lo que se sube la cama cuando la canción cae (+6 dB): la caída natural es de ≈ 10 dB y compensarla toda la dejaría plana. */
const COMPENSACION = 2.0;

/** Un fundido de coseno de `de` a `a` en `n` f desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** Frames de la bajada (acaba en la primera sílaba), de la subida (empieza en la última palabra) y del apagado final (acaba antes del siguiente golpe de la canción). */
const FADE_OUT = 10;
const FADE_IN = 24;
const APAGADO = 18;

/** La ventana de voz de cada toma de Isabella en frames de la composición: primera sílaba y última palabra (la misma cuenta que la imagen). */
export const VENTANAS_VOZ: readonly { id: string; ini: number; fin: number }[] = metraje029
  .filter((c) => c.voz !== undefined)
  .map((c) => ({
    id: c.id,
    ini: frameDeFuente(c.en, c.desde, c.voz!.s0, FPS_029),
    fin: frameDeFuente(c.en, c.desde, c.voz!.s1, FPS_029),
  }));
export const PRIMERA_PALABRA = VENTANAS_VOZ[0].ini;
const CTA = VENTANAS_VOZ[VENTANAS_VOZ.length - 1];
export const ULTIMA_PALABRA = CTA.fin;
/** El frame de la composición en que la canción empieza a caer. */
export const CAIDA_F = Math.round(CAIDA_S * FPS_029);

/**
 * El nivel «arriba» de la música en cada tramo SIN voz: el dron (ALTO), el recorrido 1 y el recorrido 2. La canción SUBE a lo largo de la
 * pieza (de −15 LUFS a −12 en los 30 s que se usan) y a ALTO plano el recorrido 2 sonaba a −13,4 LUFS mientras el 1 sonaba a −15,8 (medido en
 * la prueba rev. 1): se compensa a oído medido, +0,7 dB en el 1 y −1,5 dB en el 2, para que la música sola esté siempre cerca de −15 LUFS.
 */
const ALTOS = [ALTO, ALTO * 1.08, ALTO * 0.84];

/**
 * La envolvente: arriba en el dron y en los recorridos, abajo mientras habla Isabella (hook, mitad, CTA). Bajo el CTA la canción cae sola y se
 * compensa a medias; tras la última palabra se apaga.
 */
const envolvente = (): [number, number][] => {
  const p: [number, number][] = [[0, ALTOS[0]]];
  VENTANAS_VOZ.forEach((w, i) => {
    p.push(...fundido(w.ini - FADE_OUT, FADE_OUT, ALTOS[i], BAJO));
    if (i < VENTANAS_VOZ.length - 1) {
      p.push([w.fin, BAJO], ...fundido(w.fin, FADE_IN, BAJO, ALTOS[i + 1]).slice(1));
    }
  });
  // Bajo el CTA: la cama se queda abajo, sube +6 dB a medida que la canción cae y se apaga con la última palabra.
  const desdeCompensa = Math.max(CTA.ini + 10, CAIDA_F + 10);
  p.push([desdeCompensa, BAJO], ...fundido(desdeCompensa, 60, BAJO, BAJO * COMPENSACION).slice(1));
  p.push([CTA.fin, BAJO * COMPENSACION], ...fundido(CTA.fin, APAGADO, BAJO * COMPENSACION, 0).slice(1));
  // Los frames tienen que crecer estrictamente.
  return p.filter((q, k) => k === 0 || q[0] > p[k - 1][0]);
};

export const musica029: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-029/musica-029.wav",
        en: 0,
        dur: DURACION_029,
        desde: INICIO_MUSICA,
        entra: 1,
        ganancia: envolvente(),
        reason: "La canción entra en su golpe (frame 1), baja antes de cada frase de Isabella, sube en los recorridos, resuelve bajo el CTA y se apaga antes de la tarjeta.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio029: readonly TramoAudio[] = [...voces029, ...off029, ...musica029];
