/**
 * EL SONIDO DEL REEL 037 — todo lo que suena, como DATOS (`TramoAudio[]`). V20.
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   voces037   la voz de Isabella en sus tres tomas (hook, mitad y CTA). No se escribe: sale de los cortes que traen `audio` (`vocesDeCortes`),
 *              con el MISMO arranque que su imagen. Suena el WAV TRATADO de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave,
 *              compresor 3,5:1 desde −30 dBFS, ganancia y limitador a −2,5 dBFS), que ya viene a −15,0 LUFS en su ventana de voz: aquí la
 *              ganancia es 1 (`OBJETIVO_LUFS` = `voz.lufs`). Fuera de su frase el WAV tratado es silencio.
 *   musica037  *Familiar* (Nils Frahm), desde su golpe de 142,129 s (`INICIO_MUSICA`), con una envolvente que BAJA antes de cada frase de Isabella,
 *              sube en los dos recorridos y, bajo el CTA, acompaña la caída de la propia canción hasta apagarse en su última palabra.
 *
 * No hay voz en off ni SFX (reglas del canal: sin whooshes ni impactos); `off037` queda vacío para que la puerta compartida lo lea.
 *
 * LA MÚSICA. Pedido del usuario: «PIANO, una canción que NO esté en ninguna otra versión» (ya usadas de piano: *Amélie*, *Yeshua* y *Maison*), reservada en
 * `archivos/musica/registro-de-uso.md` como V20, leído el de main y el de todos los worktrees. De las cuatro candidatas libres que el encargo nombraba,
 * `proyectos/037/herramientas/rejilla-037.py` (la estructura de esta pieza, con cada corte seco en un golpe medido) solo dio solución con *Familiar*: *Children*,
 * *Experience* y *Silver Skies* dieron 0 (golpes de piano de ≤ 9 dB y sin caída a tiempo). Entra en 142,129 s con un golpe de 10,2 dB (el frame 1), la meseta
 * (−20 a −22 LUFS, con un valle de −27 hacia el recorrido 2) tiene golpes de 9-14 dB para cortar y, 3,6 s después de entrar el CTA, CAE (−22 → −34 LUFS entre
 * 171 y 175 s): la caída cae bajo su frase. Los cortes secos van a golpes MEDIDOS (`proyectos/037/musica/golpes-037.json`).
 *
 * LA MÚSICA BAJA Y SUBE CON CURVA (coseno) y la bajada ACABA en la primera sílaba (pedido del usuario: «la música baja antes de la primera palabra
 * de Isabella y sube después de la última»): las tres tomas entran a corte sobre un golpe, el golpe suena entero y la música baja en los 8 f
 * siguientes; sube en los 24 f que siguen a la última palabra del hook y de la mitad.
 *
 * EL FINAL. Tras la última palabra del CTA la canción tiene golpes menores (7-8 dB) y, desde 176,5 s, otros fuertes: la cama del CTA sigue la caída de la propia
 * canción y una curva de 45 f la lleva a CERO justo en la última palabra. En esos 45 f la canción ya está a −31/−34 LUFS y, con la cama, a ≈ −40 en la mezcla:
 * el apagado no se oye, pero la tarjeta queda en silencio y ningún golpe suena tras la última palabra.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { DURACION_037, FPS_037, OBJETIVO_LUFS, metraje037 } from "./metraje-037";

/** La voz de las tomas a cámara, derivada del plan de planos. */
export const voces037: readonly TramoAudio[] = vocesDeCortes(metraje037, { fps: FPS_037, objetivoLufs: OBJETIVO_LUFS });

/** Un tramo de voz en off: un `TramoAudio` que además sabe dónde se habla en su fuente. Esta pieza no lleva voz en off. */
export interface TramoOff extends TramoAudio {
  /** Segundos de la FUENTE en que empieza y acaba de hablar (`limites-voz.py`). */
  voz: { s0: number; s1: number };
}
export const off037: readonly TramoOff[] = [];

/** ¿La música va en el render? Con `true`, `recorrido-037/musica-037.wav` tiene que existir (lo deja `normalizar.mjs`, sin normalizar). */
export const HAY_MUSICA = true;

/** Segundo de la canción en que arranca: 33 ms ANTES de su golpe de entrada (142,129 s), que cae así en el frame 1 y deja el frame 0 sin clic. */
export const INICIO_MUSICA = 142.0957;
/**
 * Sonoridad de la canción (LUFS integrados, ebur128, `herramientas/lufs-tramos.py`) en cada tramo en que suena SOLA: el dron (0-3,9 s de la pieza), el recorrido 1
 * (6,8-14,3 s) y el recorrido 2 (19,9-26,8 s). *Familiar* es QUIETA (−21,5 / −20,5 / −24,0 LUFS en el original, con un valle de 4 LU hacia el recorrido 2) y para
 * dejarla a −15 LUFS el plan habría tenido que subirla +6,5…+9 dB, por encima del tope de +6 dB del motor: `normalizar.mjs` le da UNA ganancia fija de +4 dB al
 * decodificarla (`MUSICA_PRE_DB`; el pico pasa de −7,5 a −3,5 dBFS y el limitador no toca nada) y estas son las medidas YA con esos +4 dB.
 */
const LUFS_SOLA = { dron: -17.5, recorrido1: -16.5, recorrido2: -20.0 } as const;
/** Sonoridad MOMENTÁNEA (400 ms) de la canción (con los +4 dB) en la primera palabra del CTA (169,1-169,5 s de la canción): aún no ha empezado a caer. */
const LUFS_ENTRADA_CTA = -18.6;

/** La cama bajo la voz: −11 dB del nivel de la música sola en el tramo que baja (la voz va a −15 LUFS: la cama queda ≈ 10 LU por debajo). */
const CAMA = 0.28;
/** Bajo el CTA la canción ya cae sola: la cama la deja a −26,5 LUFS en la primera palabra (11,5 LU bajo la voz) y después sigue su caída. */
const BAJO_CTA = gananciaHasta(LUFS_ENTRADA_CTA, -26.5);

/** Un fundido de coseno de `de` a `a` en `n` f desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/**
 * Frames de la bajada (empieza en el golpe del corte y acaba en la primera sílaba, 8-9 f después), de la subida (empieza en la última palabra) y
 * del apagado final (acaba EN la última palabra del CTA).
 */
const FADE_OUT = 8;
const FADE_IN = 24;
const APAGADO = 45;

/** La ventana de voz de cada toma de Isabella en frames de la composición: primera sílaba y última palabra (la misma cuenta que la imagen). */
export const VENTANAS_VOZ: readonly { id: string; ini: number; fin: number }[] = metraje037
  .filter((c) => c.voz !== undefined)
  .map((c) => ({
    id: c.id,
    ini: frameDeFuente(c.en, c.desde, c.voz!.s0, FPS_037),
    fin: frameDeFuente(c.en, c.desde, c.voz!.s1, FPS_037),
  }));
export const PRIMERA_PALABRA = VENTANAS_VOZ[0].ini;
const CTA = VENTANAS_VOZ[VENTANAS_VOZ.length - 1];
export const ULTIMA_PALABRA = CTA.fin;

/** El nivel «arriba» de la música en cada tramo SIN voz (el dron, el recorrido 1 y el recorrido 2): la música sola a −15 LUFS en cada uno. */
const ALTOS = [gananciaHasta(LUFS_SOLA.dron, -15), gananciaHasta(LUFS_SOLA.recorrido1, -15), gananciaHasta(LUFS_SOLA.recorrido2, -15)];

/**
 * La envolvente: arriba en el dron y en los recorridos, abajo mientras habla Isabella (hook, mitad, CTA). Bajo el CTA la cama es BAJO_CTA y,
 * en los últimos 45 f de su frase, baja a cero.
 */
const envolvente = (): [number, number][] => {
  const p: [number, number][] = [[0, ALTOS[0]]];
  VENTANAS_VOZ.forEach((w, i) => {
    const esCta = i === VENTANAS_VOZ.length - 1;
    // La cama es relativa al nivel del tramo que baja; la del CTA, a la canción que ya está cayendo.
    const cama = esCta ? BAJO_CTA : ALTOS[i] * CAMA;
    p.push(...fundido(w.ini - FADE_OUT, FADE_OUT, ALTOS[i], cama));
    if (!esCta) p.push([w.fin, cama], ...fundido(w.fin, FADE_IN, cama, ALTOS[i + 1]).slice(1));
  });
  p.push([CTA.fin - APAGADO, BAJO_CTA], ...fundido(CTA.fin - APAGADO, APAGADO, BAJO_CTA, 0).slice(1));
  // Los frames tienen que crecer estrictamente.
  return p.filter((q, k) => k === 0 || q[0] > p[k - 1][0]);
};

export const musica037: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-037/musica-037.wav",
        en: 0,
        dur: DURACION_037,
        desde: INICIO_MUSICA,
        entra: 1,
        ganancia: envolvente(),
        reason: "Familiar entra en su golpe (frame 1), baja antes de cada frase de Isabella, sube en los recorridos, cae sola bajo el CTA y se apaga en su última palabra: la tarjeta, en silencio.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio037: readonly TramoAudio[] = [...voces037, ...off037, ...musica037];
