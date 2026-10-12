/**
 * EL SONIDO DEL REEL 036 — todo lo que suena, como DATOS (`TramoAudio[]`). V19.
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   voces036   la voz de Isabella en sus tres tomas (hook, mitad y CTA). No se escribe: sale de los cortes que traen `audio` (`vocesDeCortes`),
 *              con el MISMO arranque que su imagen. Suena el WAV TRATADO de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave,
 *              compresor 3,5:1 desde −30 dBFS, ganancia y limitador a −2,5 dBFS), que ya viene a −15,0 LUFS en su ventana de voz: aquí la
 *              ganancia es 1 (`OBJETIVO_LUFS` = `voz.lufs`). Fuera de su frase el WAV tratado es silencio.
 *   musica036  *Begin Again*, desde su golpe de 64,769 s (`INICIO_MUSICA`), con una envolvente que BAJA antes de cada frase de Isabella, sube en
 *              los dos recorridos y, bajo el CTA, acompaña la caída de la propia canción hasta apagarse en su última palabra.
 *
 * No hay voz en off ni SFX (reglas del canal: sin whooshes ni impactos); `off036` queda vacío para que la puerta compartida lo lea.
 *
 * LA MÚSICA. Pedido del encargo: «una música orquestal, de piano o ambient que crezca hasta la vista», que no esté en ninguna otra versión (reservada en
 * `archivos/musica/registro-de-uso.md` como V19, fusionado el de main y el de todos los worktrees). Elegida con `herramientas/buscar-cortes-lp.py` sobre
 * las 25 canciones libres con la duración REAL de cada plano: de las de género cinematográfico es la única que da una rejilla de cortes y una caída
 * donde entra el CTA. Desde 64,8 s CRECE sin parar (−19 → −14 → −11 → −10 LUFS por tramos de 5 s; pico −0,9 dBFS: ningún tramo llega a 0 dBFS) y a
 * los 100,5-101,0 s CAE en seco (−13 → −35 dB): la vista se monta sobre lo más alto y el CTA entra en el último golpe fuerte antes de la caída.
 *
 * EL NIVEL, POR TRAMOS (pedido del encargo: «música sola a −15 LUFS por tramos y −26 LUFS bajo la voz»). La canción, sin normalizar, mide −15,9 LUFS en el
 * dron, −13,8 en el recorrido 1 y −10,8 en el recorrido 2 (con la vista, −10,4): cada tramo lleva su ganancia hasta −15 (solo el dron SUBE, +0,9 dB, y su
 * pico queda en −4,5 dBFS). El crecimiento de la canción sigue dentro de cada tramo y en su orquestación; entre tramos, el nivel es el mismo.
 *
 * LA MÚSICA BAJA Y SUBE CON CURVA (coseno) y la bajada ACABA en la primera sílaba («la música baja antes de que hable Isabella»): las tres tomas entran
 * a corte sobre un golpe ≥ 12 f antes de su primera palabra: el golpe suena entero y la música baja en los 10 f anteriores a la palabra. Sube en los 24 f que siguen a la última
 * palabra de la mitad. TRAS EL HOOK no caben 24 f (el clip acaba 5 f después de «por qué»): la música espera abajo ≈ 3 f y vuelve en 2 f justo en el
 * golpe del corte a la órbita (f280; el golpe, f280,5): el golpe, la vuelta de la música y el corte de imagen caen juntos.
 *
 * EL FINAL. El CTA entra en el golpe de 100,464 s y su primera palabra cae a mitad de la caída de la canción (−13 → −35 dB en 0,5 s): la cama arranca
 * relativa al recorrido 2 (como las otras tomas) y, mientras la canción cae, sube hasta BAJO_CTA, que deja lo que queda de la canción a −26 LUFS bajo
 * la voz. Después una curva de 45 f la apaga JUSTO en la última palabra (104,35 s de la canción), antes del golpe de 13,9 dB de 105,596 s: la tarjeta
 * queda en silencio.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { DURACION_036, FPS_036, OBJETIVO_LUFS, metraje036 } from "./metraje-036";

/** La voz de las tomas a cámara, derivada del plan de planos. */
export const voces036: readonly TramoAudio[] = vocesDeCortes(metraje036, { fps: FPS_036, objetivoLufs: OBJETIVO_LUFS });

/** Un tramo de voz en off: un `TramoAudio` que además sabe dónde se habla en su fuente. Esta pieza no lleva voz en off. */
export interface TramoOff extends TramoAudio {
  /** Segundos de la FUENTE en que empieza y acaba de hablar (`limites-voz.py`). */
  voz: { s0: number; s1: number };
}
export const off036: readonly TramoOff[] = [];

/** ¿La música va en el render? Con `true`, `recorrido-036/musica-036.wav` tiene que existir (lo deja `normalizar.mjs`, sin normalizar). */
export const HAY_MUSICA = true;

/** Segundo de la canción en que arranca: 30 ms ANTES de su golpe de entrada (64,769 s), que cae así en el frame 1 y deja el frame 0 sin clic. */
export const INICIO_MUSICA = 64.739;
/**
 * Sonoridad de la canción SIN normalizar (LUFS integrados, ebur128) en cada tramo en que suena SOLA: el dron (0-3,8 s de la pieza), el recorrido 1
 * (9,4-15,8 s) y el recorrido 2 con la vista (20,0-35,7 s).
 */
const LUFS_SOLA = { dron: -15.9, recorrido1: -13.8, recorrido2: -10.8 } as const;
/**
 * Sonoridad de la canción SIN normalizar justo bajo la ventana de voz de cada toma (de su primera a su última palabra): bajo el hook (68,95-73,95 s),
 * bajo la mitad (80,96-84,07 s) y, ya caída, bajo el CTA (100,80-104,35 s). La canción sigue creciendo bajo la voz, así que la cama de cada toma se
 * mide en SU ventana y no en el tramo que la precede.
 */
const LUFS_BAJO_VOZ = { hook: -14.2, mitad: -12.0, cta: -25.6 } as const;
/** La música bajo la voz, a −26 LUFS: 11 LU por debajo de la voz (−15). */
const OBJETIVO_CAMA = -26;
/** La cama de cada toma: la ganancia que deja la canción a −26 LUFS en su ventana de voz. */
const CAMAS = [
  gananciaHasta(LUFS_BAJO_VOZ.hook, OBJETIVO_CAMA),
  gananciaHasta(LUFS_BAJO_VOZ.mitad, OBJETIVO_CAMA),
  gananciaHasta(LUFS_BAJO_VOZ.cta, OBJETIVO_CAMA),
];
/**
 * Bajo el CTA la canción ya ha caído: su cama es la de la canción caída, con +2,6 dB porque el apagado de los últimos 45 f (que acaba en la última
 * palabra) baja la sonoridad integrada de la ventana: sin ellos, la música bajo el CTA medía −28,6 LUFS y no −26 (medido sobre la envolvente).
 */
const CORRECCION_APAGADO_DB = 2.6;
const BAJO_CTA = CAMAS[2] * 10 ** (CORRECCION_APAGADO_DB / 20);
/** Antes de la caída (la primera palabra del CTA llega a mitad de ella), la cama del CTA es la del recorrido 2 bajado 11 dB, como si no cayera. */
const CAMA_RELATIVA = 0.28;

/**
 * Un fundido de coseno de `de` a `a` en `n` f desde `f0`, con UN PUNTO POR FOTOGRAMA: con 5 puntos (la plantilla) `<PistaAudio>` interpola en
 * línea recta entre ellos y a 2 f de la primera palabra la música aún no había llegado a la cama (la puerta, 4).
 */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] => {
  const k0 = Math.round(f0);
  const pasos = Math.max(1, Math.round(n));
  return Array.from({ length: pasos + 1 }, (_, k) => [k0 + k, de + ((a - de) * (1 - Math.cos((Math.PI * k) / pasos))) / 2] as [number, number]);
};

/** Frames de la bajada (acaba en la primera sílaba), de la subida (empieza en la última palabra) y del apagado final (acaba EN la última palabra del CTA). */
const FADE_OUT = 10;
const FADE_IN = 24;
const APAGADO = 45;
/** Frames en que la cama del CTA pasa de relativa a BAJO_CTA: lo que tarda la canción en caer (100,8 → 101,25 s). */
const CAIDA_CTA = 14;

/** La ventana de voz de cada toma de Isabella en frames de la composición: primera sílaba y última palabra (la misma cuenta que la imagen). */
export const VENTANAS_VOZ: readonly { id: string; ini: number; fin: number }[] = metraje036
  .filter((c) => c.voz !== undefined)
  .map((c) => ({
    id: c.id,
    ini: frameDeFuente(c.en, c.desde, c.voz!.s0, FPS_036),
    fin: frameDeFuente(c.en, c.desde, c.voz!.s1, FPS_036),
  }));
export const PRIMERA_PALABRA = VENTANAS_VOZ[0].ini;
const CTA = VENTANAS_VOZ[VENTANAS_VOZ.length - 1];
export const ULTIMA_PALABRA = CTA.fin;

/**
 * Dónde ACABA la subida tras cada toma: tras el hook, en el corte siguiente (f280, el del golpe de f280,5: no caben 24 f); tras la mitad, 24 f
 * después de su última palabra.
 */
const finSubida = (i: number): number => {
  const corte = metraje036.find((c) => c.id === VENTANAS_VOZ[i].id)!;
  return Math.min(VENTANAS_VOZ[i].fin + FADE_IN, corte.en + corte.dur);
};

/** El nivel «arriba» de la música en cada tramo SIN voz (el dron, el recorrido 1 y el recorrido 2): la música sola a −15 LUFS en cada uno. */
export const ALTOS = [gananciaHasta(LUFS_SOLA.dron, -15), gananciaHasta(LUFS_SOLA.recorrido1, -15), gananciaHasta(LUFS_SOLA.recorrido2, -15)];

/**
 * La envolvente: arriba en el dron y en los recorridos, abajo mientras habla Isabella (hook, mitad, CTA). Bajo el CTA la cama pasa de relativa a
 * BAJO_CTA mientras la canción cae y, en los últimos 45 f de su frase, baja a cero.
 */
const envolvente = (): [number, number][] => {
  const p: [number, number][] = [[0, ALTOS[0]]];
  VENTANAS_VOZ.forEach((w, i) => {
    const esCta = i === VENTANAS_VOZ.length - 1;
    const cama = esCta ? ALTOS[i] * CAMA_RELATIVA : CAMAS[i];
    p.push(...fundido(w.ini - FADE_OUT, FADE_OUT, ALTOS[i], cama));
    if (!esCta) {
      const fin = finSubida(i);
      // Tras el hook no caben 24 f (el clip acaba 5 f después de «por qué»): la música espera abajo y vuelve EN UN FOTOGRAMA, el del corte (f280),
      // con el golpe del corte (f280,5, 9,2 dB y de ataque lento) dentro. Con una rampa (desde la última palabra, o de 2 f alrededor del golpe)
      // `golpes-render.py` veía antes el arranque del «qué» de la voz (f276) o la propia rampa, y con el corte en f281 el escalón y el golpe quedaban
      // a ±1,1-1,5 f.
      if (fin - w.fin < FADE_IN) p.push([w.fin, cama], [fin - 1, cama], [fin, ALTOS[i + 1]]);
      else p.push([w.fin, cama], ...fundido(w.fin, FADE_IN, cama, ALTOS[i + 1]).slice(1));
    } else {
      p.push(...fundido(w.ini, CAIDA_CTA, cama, BAJO_CTA).slice(1));
    }
  });
  p.push([CTA.fin - APAGADO, BAJO_CTA], ...fundido(CTA.fin - APAGADO, APAGADO, BAJO_CTA, 0).slice(1));
  // Los frames tienen que crecer estrictamente.
  return p.filter((q, k) => k === 0 || q[0] > p[k - 1][0]);
};

export const musica036: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-036/musica-036.wav",
        en: 0,
        dur: DURACION_036,
        desde: INICIO_MUSICA,
        entra: 1,
        ganancia: envolvente(),
        reason:
          "Begin Again entra en su golpe (frame 1), crece hasta la vista, baja antes de cada frase de Isabella, sube en los recorridos, cae sola bajo el CTA y se apaga en su última palabra: la tarjeta, en silencio.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio036: readonly TramoAudio[] = [...voces036, ...off036, ...musica036];
