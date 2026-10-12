/**
 * EL SONIDO DEL REEL 032 — todo lo que suena, como DATOS (`TramoAudio[]`). V16.
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   voces032   la voz de Isabella en sus tres tomas (hook, mitad y CTA). No se escribe: sale de los cortes que traen `audio` (`vocesDeCortes`),
 *              con el MISMO arranque que su imagen y el cruce con la disolvencia. Suena el WAV TRATADO de `normalizar.mjs` (`<toma>-voz.wav`:
 *              graves fuera, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia y limitador a −2,5 dBFS), que ya viene a −15,0 LUFS en su
 *              ventana de voz: aquí la ganancia es 1 (`OBJETIVO_LUFS` = `voz.lufs`). Fuera de su frase el WAV tratado es silencio.
 *   musica032  *We Are* (Aleksey Chistilin), desde su golpe de 95,248 s (`INICIO_MUSICA`), con una envolvente que BAJA antes de cada frase de
 *              Isabella, sube en los dos recorridos y se queda en su lecho bajo el CTA. Sus números salen de medidas de la canción (abajo).
 *
 * No hay voz en off ni SFX (reglas del canal: sin whooshes ni impactos); `off032` queda vacío para que la puerta compartida lo lea.
 *
 * LA MÚSICA. Pedido del usuario: «una canción que NO esté en ninguna otra versión» (reservada en `archivos/musica/registro-de-uso.md` como V16).
 * Elegida con `buscar-entrada.py --cta 29 35`: golpe de 13,9 dB en 95,248 s (el frame 1), meseta plana a −10,2 LUFS con golpes fuertes cada ≈ 1,6 s
 * y, desde los 30 s de la pieza, UNA CAÍDA de ≈ 11 LU hasta un lecho de −19,9 LUFS con un pulso suave: el CTA (33,0 s) entra en ese lecho. Los
 * cortes secos van a golpes MEDIDOS (`proyectos/032/musica/golpes-032.json`).
 *
 * LA MÚSICA BAJA Y SUBE CON CURVA (coseno) y la bajada ACABA en la primera sílaba (pedido del usuario: «la música baja antes de la primera palabra
 * de Isabella y sube después de la última»); sube en los 24 f siguientes a la última palabra. Bajo la mitad, el golpe de f520 suena ENTERO y la
 * bajada va después (f521-531). Tras la última palabra del CTA se apaga en 18 f, ANTES de su siguiente golpe fuerte (f1088), y la tarjeta del
 * cierre queda en silencio.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { DURACION_032, FPS_032, OBJETIVO_LUFS, metraje032 } from "./metraje-032";

/** La voz de las tomas a cámara, derivada del plan de planos. */
export const voces032: readonly TramoAudio[] = vocesDeCortes(metraje032, { fps: FPS_032, objetivoLufs: OBJETIVO_LUFS });

/** Un tramo de voz en off: un `TramoAudio` que además sabe dónde se habla en su fuente. Esta pieza no lleva voz en off. */
export interface TramoOff extends TramoAudio {
  /** Segundos de la FUENTE en que empieza y acaba de hablar (`limites-voz.py`). */
  voz: { s0: number; s1: number };
}
export const off032: readonly TramoOff[] = [];

/** ¿La música va en el render? Con `true`, `recorrido-032/musica-032.wav` tiene que existir (lo deja `normalizar.mjs`, sin normalizar). */
export const HAY_MUSICA = true;

/** Segundo de la canción en que arranca: 30 ms ANTES de su golpe de entrada (95,248 s), que cae así en el frame 1 y deja el frame 0 sin clic. */
export const INICIO_MUSICA = 95.218;
/** Segundo de la PIEZA en que la meseta de la canción empieza a caer (medido: −10,4 LUFS hasta los 30 s, −14,1 entre 30 y 35, −20,8 después). */
const CAIDA_S = 30.0;
/** Sonoridad de la canción SIN normalizar entre los 95,25 y los 125,2 s de la canción (LUFS, ebur128): toda la meseta que suena antes de la caída. */
const LUFS_MESETA = -10.2;
/** Sonoridad del LECHO en que cae la canción bajo el CTA (128,2-131,2 s de la canción; 33,0-36,0 s de la pieza). */
const LUFS_LECHO = -19.9;

/** La música sola, a −15 LUFS, y la cama bajo la voz: ≈ −11 dB (la voz va a −15 LUFS, así que la cama queda ≈ 11 LU por debajo). */
const ALTO = gananciaHasta(LUFS_MESETA, -15);
const BAJO = ALTO * 0.28;
/** Bajo el CTA la canción ya está en su lecho (−19,9 LUFS): con BAJO quedaría a −35,7 y no se oiría. Se deja a −27 LUFS, 12 LU bajo la voz. */
const BAJO_CTA = gananciaHasta(LUFS_LECHO, -27);

/** Un fundido de coseno de `de` a `a` en `n` f desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** Frames de la bajada (acaba en la primera sílaba), de la subida (empieza en la última palabra) y del apagado final (acaba antes del siguiente golpe de la canción). */
const FADE_OUT = 10;
const FADE_IN = 24;
const APAGADO = 18;

/** La ventana de voz de cada toma de Isabella en frames de la composición: primera sílaba y última palabra (la misma cuenta que la imagen). */
export const VENTANAS_VOZ: readonly { id: string; ini: number; fin: number }[] = metraje032
  .filter((c) => c.voz !== undefined)
  .map((c) => ({
    id: c.id,
    ini: frameDeFuente(c.en, c.desde, c.voz!.s0, FPS_032),
    fin: frameDeFuente(c.en, c.desde, c.voz!.s1, FPS_032),
  }));
export const PRIMERA_PALABRA = VENTANAS_VOZ[0].ini;
const CTA = VENTANAS_VOZ[VENTANAS_VOZ.length - 1];
export const ULTIMA_PALABRA = CTA.fin;
/** El frame de la composición en que la canción empieza a caer. */
export const CAIDA_F = Math.round(CAIDA_S * FPS_032);

/**
 * El nivel «arriba» de la música en cada tramo SIN voz: el dron, el recorrido 1 y el recorrido 2. La meseta es plana, pero el tramo del dron
 * (95,25-98,9 s de la canción) mide −11,0 LUFS y los recorridos −10,3 y −10,4: el dron sube +0,8 dB para que la música sola esté siempre en −15.
 */
const ALTOS = [ALTO * 1.1, ALTO, ALTO];

/**
 * La envolvente: arriba en el dron y en los recorridos, abajo mientras habla Isabella (hook, mitad, CTA). Bajo el CTA la cama es BAJO_CTA (la
 * canción ya cayó sola) y tras la última palabra se apaga.
 */
const envolvente = (): [number, number][] => {
  const p: [number, number][] = [[0, ALTOS[0]]];
  VENTANAS_VOZ.forEach((w, i) => {
    // La cama es relativa al nivel del tramo que baja (≈ −11 dB): el dron va +0,8 dB sobre los recorridos y su cama también.
    const cama = i === VENTANAS_VOZ.length - 1 ? BAJO_CTA : ALTOS[i] * (BAJO / ALTO);
    p.push(...fundido(w.ini - FADE_OUT, FADE_OUT, ALTOS[i], cama));
    if (i < VENTANAS_VOZ.length - 1) {
      p.push([w.fin, cama], ...fundido(w.fin, FADE_IN, cama, ALTOS[i + 1]).slice(1));
    }
  });
  p.push([CTA.fin, BAJO_CTA], ...fundido(CTA.fin, APAGADO, BAJO_CTA, 0).slice(1));
  // Los frames tienen que crecer estrictamente.
  return p.filter((q, k) => k === 0 || q[0] > p[k - 1][0]);
};

export const musica032: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-032/musica-032.wav",
        en: 0,
        dur: DURACION_032,
        desde: INICIO_MUSICA,
        entra: 1,
        ganancia: envolvente(),
        reason: "We Are entra en su golpe (frame 1), baja antes de cada frase de Isabella, sube en los recorridos, cae sola a su lecho bajo el CTA y se apaga antes de la tarjeta.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio032: readonly TramoAudio[] = [...voces032, ...off032, ...musica032];
