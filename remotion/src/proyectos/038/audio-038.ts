/**
 * EL SONIDO DEL REEL 038 — todo lo que suena, como DATOS (`TramoAudio[]`). V21.
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   voces038   la voz de Isabella en sus tres tomas (hook, mitad y CTA). No se escribe: sale de los cortes que traen `audio` (`vocesDeCortes`),
 *              con el MISMO arranque que su imagen. Suena el WAV TRATADO de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave,
 *              compresor 3,5:1 desde −30 dBFS, ganancia y limitador a −2,5 dBFS), que ya viene a −15,0 LUFS en su ventana de voz: aquí la
 *              ganancia es 1 (`OBJETIVO_LUFS` = `voz.lufs`). Fuera de su frase el WAV tratado es silencio.
 *   musica038  *I Feel It Coming* (The Weeknd, versión de saxofón), desde su golpe de 223,226 s (`INICIO_MUSICA`), con una envolvente que BAJA antes
 *              de cada frase de Isabella, sube en los dos recorridos y, bajo el CTA, acompaña el fundido natural de la propia canción hasta apagarse
 *              en su última palabra.
 *
 * No hay voz en off ni SFX (reglas del canal: sin whooshes ni impactos); `off038` queda vacío para que la puerta compartida lo lea.
 *
 * LA MÚSICA. Pedido del usuario: jazz, «una canción que NO esté en ninguna otra versión» (reservada en `archivos/musica/registro-de-uso.md` como V21, leído
 * el de main y el de todos los worktrees); entre las tres que nombró (esta, *L' Amour Toujours* y *The Sky is Crying*) es la que mejor cae bajo un CTA
 * (`buscar-entrada.py --cta 30 37`, `curva.py`). Tiene un PULSO de 0,645 s con golpes de 9-25 dB: entra con un golpe de 10,5 dB (el frame 1), la meseta
 * (−10 LUFS) dura hasta los 30 s de la pieza y se FUNDE sola sin rebote (−14,8 a +31 s, −16,1 a +33, −21,3 a +37, −31,6 a +41, silencio en +46). El
 * usuario no oye el género aquí: se mide. Los cortes secos van a golpes MEDIDOS (`proyectos/038/musica/golpes-038.json`).
 *
 * LA MÚSICA BAJA Y SUBE CON CURVA (coseno) y la bajada ACABA en la primera sílaba (pedido del usuario: «la música baja antes de la primera palabra
 * de Isabella y sube después de la última»): las tres tomas entran a corte sobre un golpe, el golpe suena entero y la música baja en los 8 f
 * siguientes; sube tras la última palabra del hook (21 f: la toma sale a corte 3,7 f después de ella y la subida acaba 2 f antes del golpe siguiente,
 * f289) y de la mitad (24 f).
 *
 * EL FINAL. La canción sigue con su pulso mientras se funde (los golpes llegan hasta los 46 s): no hay un hueco tras la última palabra del CTA en el que
 * apagarla «antes del siguiente golpe». La cama del CTA sigue la caída de la propia canción y una curva de 45 f la lleva a CERO justo en la última palabra:
 * en esos 45 f la canción ya está a −17/−19 LUFS y, con la cama, a ≈ −30 en la mezcla, bajo la voz: el apagado no se oye, pero la tarjeta queda en
 * silencio y ningún golpe suena tras la última palabra.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { DURACION_038, FPS_038, OBJETIVO_LUFS, metraje038 } from "./metraje-038";

/** La voz de las tomas a cámara, derivada del plan de planos. */
export const voces038: readonly TramoAudio[] = vocesDeCortes(metraje038, { fps: FPS_038, objetivoLufs: OBJETIVO_LUFS });

/** Un tramo de voz en off: un `TramoAudio` que además sabe dónde se habla en su fuente. Esta pieza no lleva voz en off. */
export interface TramoOff extends TramoAudio {
  /** Segundos de la FUENTE en que empieza y acaba de hablar (`limites-voz.py`). */
  voz: { s0: number; s1: number };
}
export const off038: readonly TramoOff[] = [];

/** ¿La música va en el render? Con `true`, `recorrido-038/musica-038.wav` tiene que existir (lo deja `normalizar.mjs`, sin normalizar). */
export const HAY_MUSICA = true;

/** Segundo de la canción en que arranca: 30 ms ANTES de su golpe de entrada (223,226 s), que cae así en el frame 1 y deja el frame 0 sin clic. */
export const INICIO_MUSICA = 223.196;
/**
 * Sonoridad de la canción SIN normalizar (LUFS integrados, ebur128, `lufs-ventanas`) en cada tramo en que suena SOLA: el dron (0-3,27 s de la pieza), el
 * recorrido 1 (9,07-16,8 s) y el recorrido 2 (22,6-31,0 s). La meseta es casi plana (−9,9 a −10,9) hasta que empieza a fundirse.
 */
const LUFS_SOLA = { dron: -9.9, recorrido1: -10.9, recorrido2: -10.9 } as const;
/** Sonoridad MOMENTÁNEA (400 ms) de la canción en la primera palabra del CTA (f938, 254,27-254,67 s): ya va fundiéndose. */
const LUFS_ENTRADA_CTA = -16.0;

/** La cama bajo la voz: −11 dB del nivel de la música sola en el tramo que baja (la voz va a −15 LUFS: la cama queda ≈ 10 LU por debajo). */
const CAMA = 0.28;
/** Bajo el CTA la canción ya se funde sola: la cama la deja a −26,5 LUFS en la primera palabra (11,5 LU bajo la voz) y después sigue su caída. */
const BAJO_CTA = gananciaHasta(LUFS_ENTRADA_CTA, -26.5);

/** Un fundido de coseno de `de` a `a` en `n` f desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/**
 * Frames de la bajada (empieza en el golpe del corte y acaba en la primera sílaba, 8 f después), de la subida tras cada frase (empieza en la última
 * palabra; la del hook dura 21 f porque el golpe siguiente cae en f291 y la subida tiene que acabar antes) y del apagado final (acaba EN la última
 * palabra del CTA).
 */
const FADE_OUT = 8;
const FADE_IN = [21, 24];
const APAGADO = 45;

/** La ventana de voz de cada toma de Isabella en frames de la composición: primera sílaba y última palabra (la misma cuenta que la imagen). */
export const VENTANAS_VOZ: readonly { id: string; ini: number; fin: number }[] = metraje038
  .filter((c) => c.voz !== undefined)
  .map((c) => ({
    id: c.id,
    ini: frameDeFuente(c.en, c.desde, c.voz!.s0, FPS_038),
    fin: frameDeFuente(c.en, c.desde, c.voz!.s1, FPS_038),
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
    // La cama es relativa al nivel del tramo que baja; la del CTA, a la canción que ya se está fundiendo.
    const cama = esCta ? BAJO_CTA : ALTOS[i] * CAMA;
    p.push(...fundido(w.ini - FADE_OUT, FADE_OUT, ALTOS[i], cama));
    if (!esCta) p.push([w.fin, cama], ...fundido(w.fin, FADE_IN[i], cama, ALTOS[i + 1]).slice(1));
  });
  p.push([CTA.fin - APAGADO, BAJO_CTA], ...fundido(CTA.fin - APAGADO, APAGADO, BAJO_CTA, 0).slice(1));
  // Los frames tienen que crecer estrictamente.
  return p.filter((q, k) => k === 0 || q[0] > p[k - 1][0]);
};

export const musica038: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-038/musica-038.wav",
        en: 0,
        dur: DURACION_038,
        desde: INICIO_MUSICA,
        entra: 1,
        ganancia: envolvente(),
        reason:
          "I Feel It Coming entra en su golpe (frame 1), baja antes de cada frase de Isabella, sube en los recorridos, se funde sola bajo el CTA y se apaga en su última palabra: la tarjeta, en silencio.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio038: readonly TramoAudio[] = [...voces038, ...off038, ...musica038];
