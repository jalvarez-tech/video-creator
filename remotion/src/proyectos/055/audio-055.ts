/**
 * EL SONIDO DEL REEL 055 — todo lo que suena, como DATOS (`TramoAudio[]`). V37.
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   voces055   la voz de Isabella en sus tres tomas (HK02, MD03 y CT03). No se escribe: sale de los cortes que traen `audio` (`vocesDeCortes`), con el MISMO arranque que su imagen. Suena el WAV TRATADO de
 *              `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia y limitador a −2,5 dBFS), que ya viene a ≈ −15 LUFS en su ventana de voz: aquí la
 *              ganancia es 1 (`OBJETIVO_LUFS` = `voz.lufs`). Fuera de su frase el WAV tratado es silencio.
 *   musica055  *Spring is Coming*, desde su primera nota (`INICIO_MUSICA`), con una envolvente que BAJA con curva antes de cada frase de Isabella y sube después de cada una, y se apaga en su última palabra.
 *
 * No hay voz en off ni SFX (reglas del canal: sin whooshes ni impactos); `off055` queda vacío para que la puerta compartida lo lea.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre la fuente, `herramientas/lufs-rangos.py`):
 *   voz de Isabella      −15 (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»; sus tomas crudas miden −21,5 · −24,5 · −26,7; tratadas, ≈ −15 con el pico real a −2,5 dBFS)
 *   música SOLA          −15 por tramos, el nivel de la voz: la canción mide −14,1 en la apertura, −13,9 en el primer recorrido y −15,6 en el segundo; la apertura y el primer recorrido BAJAN 0,9 y 1,1 dB; el
 *                        segundo va a 0 dB (a −15,0 sus picos de −1,3 dBFS pasarían de −1,0 dBFS: queda a −15,6 LUFS, 0,6 LU bajo la voz). Una sola ganancia por tramo, sin `loudnorm` (le cambiaría la dinámica).
 *   música BAJO LA VOZ   −26 en cada ventana de voz: 11 LU por debajo de ella. La mitad y el CTA, con una ganancia fija; el hook, con una rampa de −13,8 a −10,4 dB, porque la canción SUBE de volumen bajo él
 *                        (−12,2 → −15,1 → −15,6 LUFS por tercios de su ventana): se baja lo que haga falta en cada momento para quedar a −26 y no más.
 *
 * LA MÚSICA BAJA Y SUBE CON CURVA (coseno) y la bajada ACABA en la primera sílaba (pedido del usuario: «la música baja antes de la primera palabra de Isabella y sube después de la última»): las tres tomas
 * entran a corte sobre un golpe y su primera sílaba suena 7,5-8,3 f después; el golpe suena entero (la música está arriba en el corte) y la música baja en los 8 f siguientes. Sube tras la última palabra del hook
 * y de la mitad en 24 f: acaba ≥ 6 f antes del golpe siguiente.
 *
 * EL FINAL. La canción sigue con sus golpes (de 9 a 19 dB cada 0,5-1 s) y no resuelve: no hay un hueco tras la última palabra del CTA en el que apagarla «antes del siguiente golpe». La cama del CTA se apaga con
 * curva de coseno en los 45 f que preceden a su última palabra y llega a CERO justo en ella: bajo la voz el apagado no se oye (la cama va a −26 LUFS), la tarjeta queda en silencio y ningún golpe suena tras ella.
 *
 * Remotion le pasa el volumen a ffmpeg como UNA expresión `if(between(t,…),valor,if(…))` con un `if` por cada valor distinto de la ganancia (a 3 decimales), y ffmpeg no admite más de ≈ 80 `if` anidados
 * (`remotion-volumen-limite-ffmpeg`): la envolvente de esta pieza (3 bajadas de 8 f, 2 subidas de 24 f, la rampa del hook y un apagado de 45 f) pasa de ese límite y la música va PARTIDA en tramos de la misma
 * canción, consecutivos y sin solape (`trocea`).
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes, volumenDe } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { DURACION_055, FIN_MUSICA_055, FPS_055, INICIO_MUSICA, OBJETIVO_LUFS, metraje055 } from "./metraje-055";

/** La voz de las tres tomas a cámara (HK02, MD03 y CT03), derivada del plan de planos. */
export const voces055: readonly TramoAudio[] = vocesDeCortes(metraje055, { fps: FPS_055, objetivoLufs: OBJETIVO_LUFS });

/** Un tramo de voz en off: un `TramoAudio` que además sabe dónde se habla en su fuente. Esta pieza no lleva voz en off. */
export interface TramoOff extends TramoAudio {
  /** Segundos de la FUENTE en que empieza y acaba de hablar (`limites-voz.py`). */
  voz: { s0: number; s1: number };
}
export const off055: readonly TramoOff[] = [];

/** ¿La música va en el render? Con `true`, `recorrido-055/musica-055.wav` tiene que existir (lo deja `normalizar.mjs`, sin normalizar). La canción es una pista de la biblioteca de Luxur: licencia sin verificar (ver `01-plan.md`). */
export const HAY_MUSICA = true;

/** La ventana de voz de cada toma de Isabella en frames de la composición: primera sílaba y última palabra (la misma cuenta que la imagen). */
export const VENTANAS_VOZ: readonly { id: string; ini: number; fin: number }[] = metraje055
  .filter((c) => c.voz !== undefined)
  .map((c) => ({
    id: c.id,
    ini: frameDeFuente(c.en, c.desde, c.voz!.s0, FPS_055),
    fin: frameDeFuente(c.en, c.desde, c.voz!.s1, FPS_055),
  }));
export const PRIMERA_PALABRA = VENTANAS_VOZ[0].ini;
const CTA_VOZ = VENTANAS_VOZ[VENTANAS_VOZ.length - 1];
export const ULTIMA_PALABRA = CTA_VOZ.fin;

/** Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre la fuente): la apertura (f2-92), el primer recorrido (f258-542) y el segundo (f695-1044). */
export const LUFS_TRAMO = { apertura: -14.1, paseo: -13.9, bloque5: -15.6 } as const;
/** El pico real de la canción en cada tramo sin voz (ebur128 sobre la fuente, dBFS): con la ganancia de cada tramo ninguno pasa de −1 dBFS (lo comprueba la puerta). */
export const PICO_TRAMO = { apertura: -1.4, paseo: -1.3, bloque5: -1.3 } as const;
/** La música SOLA: el nivel de la voz. */
const OBJETIVO_MUSICA = -15;
/** Ganancia lineal de la música sola en cada tramo (ver arriba: el segundo recorrido no sube, por su pico). */
export const ALTOS = {
  apertura: gananciaHasta(LUFS_TRAMO.apertura, OBJETIVO_MUSICA),
  paseo: gananciaHasta(LUFS_TRAMO.paseo, OBJETIVO_MUSICA),
  bloque5: 1,
} as const;

/**
 * La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente, el tramo de la canción que suena mientras ella habla). El hook lleva una rampa y por eso se mide por tercios.
 */
export const LUFS_CANCION_EN_VOZ = { "c06-mitad": -15.4, "c11-cta": -15.1 } as const;
/** La sonoridad de la canción en cada TERCIO de la ventana de voz del hook (f100-142 · 142-184 · 184-226): la rampa la deja a −26 en cada uno. */
export const LUFS_HOOK_TERCIOS = [-12.2, -15.1, -15.6] as const;
/** Mientras habla Isabella: la música baja hasta −26 LUFS EN CADA VENTANA (11 LU bajo su voz de −15). */
export const LUFS_MUSICA_BAJO_VOZ = -26;
export const BAJOS = {
  "c06-mitad": gananciaHasta(LUFS_CANCION_EN_VOZ["c06-mitad"], LUFS_MUSICA_BAJO_VOZ),
  "c11-cta": gananciaHasta(LUFS_CANCION_EN_VOZ["c11-cta"], LUFS_MUSICA_BAJO_VOZ),
} as const;

/**
 * LOS FUNDIDOS: FADE_OUT frames con curva de coseno desde el golpe del corte hasta la primera sílaba (la música ACABA de bajar en ella); FADE_IN frames tras la última palabra de la mitad y del hook; APAGADO
 * frames del apagado final, que acaba EN la última palabra del CTA.
 */
export const FADE_OUT = 8;
export const FADE_IN = 24;
export const APAGADO = 45;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** dB → ganancia lineal. */
const lin = (db: number): number => Math.pow(10, db / 20);

/**
 * La rampa del HOOK: lo que hay que restarle a la canción en cada instante para quedar a −26 LUFS bajo la voz, mientras la canción sube de −12,2 a −15,6 LUFS (por tercios de la ventana). Frames de la comp y dB
 * sobre la fuente, en tramos rectos: −13,8 dB en el primer tercio, −10,9 en el segundo y −10,4 en el tercero.
 */
const H = VENTANAS_VOZ[0];
export const RAMPA_HOOK: [number, number][] = [
  [H.ini, lin(-13.8)],
  [H.ini + 35, lin(-13.6)],
  [H.ini + 52, lin(-11.2)],
  [H.ini + 84, lin(-10.9)],
  [H.ini + 90, lin(-10.5)],
  [H.fin, lin(-10.4)],
];

/** La envolvente: la apertura, el hook con su rampa, el primer recorrido, la mitad, el segundo recorrido y el CTA con su apagado final. */
const envolvente = (): [number, number][] => {
  const hook = VENTANAS_VOZ[0];
  const mitad = VENTANAS_VOZ[1];
  const cta = VENTANAS_VOZ[2];
  const hookPlano = metraje055.find((c) => c.id === "c02-hook");
  const mitadPlano = metraje055.find((c) => c.id === "c06-mitad");
  const ctaPlano = metraje055.find((c) => c.id === "c11-cta");
  if (!hookPlano || !mitadPlano || !ctaPlano) throw new Error("audio-055: faltan planos en metraje-055.ts");

  const p: [number, number][] = [
    // LA APERTURA: la música sola desde el frame 0 (1 f de entrada para no meter un clic: la primera nota suena en el f2) hasta el golpe del corte del hook, que suena entero; después, la bajada con curva
    // que ACABA en la primera sílaba (8 f).
    [0, 0],
    [1, ALTOS.apertura],
    [hookPlano.en, ALTOS.apertura],
    ...fundido(hook.ini - FADE_OUT, FADE_OUT, ALTOS.apertura, RAMPA_HOOK[0][1]).slice(1),
    // EL HOOK: la rampa que deja la canción a −26 mientras ella habla y, tras su última palabra, sube en 24 f al nivel del primer recorrido.
    ...RAMPA_HOOK.slice(1),
    ...fundido(hook.fin, FADE_IN, RAMPA_HOOK[RAMPA_HOOK.length - 1][1], ALTOS.paseo).slice(1),
    // EL PRIMER RECORRIDO y la MITAD: baja con curva, acaba en la primera sílaba, se queda en su cama y sube en 24 f tras la última palabra al nivel del segundo recorrido.
    [mitadPlano.en, ALTOS.paseo],
    ...fundido(mitad.ini - FADE_OUT, FADE_OUT, ALTOS.paseo, BAJOS["c06-mitad"]).slice(1),
    [mitad.fin, BAJOS["c06-mitad"]],
    ...fundido(mitad.fin, FADE_IN, BAJOS["c06-mitad"], ALTOS.bloque5).slice(1),
    // EL CTA: baja igual desde el golpe del corte; la cama se apaga con curva en los 45 f que preceden a su última palabra y llega a cero EN ella.
    [ctaPlano.en, ALTOS.bloque5],
    ...fundido(cta.ini - FADE_OUT, FADE_OUT, ALTOS.bloque5, BAJOS["c11-cta"]).slice(1),
    [cta.fin - APAGADO, BAJOS["c11-cta"]],
    ...fundido(cta.fin - APAGADO, APAGADO, BAJOS["c11-cta"], 0).slice(1),
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

/**
 * ffmpeg no admite una expresión de volumen con más de ≈ 80 valores distintos (ver arriba): una envolvente con rampas largas se PARTE en tramos de la misma canción, consecutivos y sin solape (cada uno empieza
 * en el frame de fuente en que acabó el anterior: es la misma muestra), cada uno con ≤ `MAX_VALORES` cambios de valor.
 */
const MAX_VALORES = 60;

/** La envolvente `puntos` (frames absolutos de la comp) partida en tramos consecutivos de la canción, cada uno con su trozo de envolvente. */
const trocea = (puntos: [number, number][], fin: number): TramoAudio[] => {
  const entero: TramoAudio = { id: "musica", src: "recorrido-055/musica-055.wav", en: 0, dur: fin, desde: INICIO_MUSICA, ganancia: puntos, reason: "" };
  const v = (f: number): number => volumenDe(entero, f);
  const redondea = (x: number): number => Math.round(x * 1000) / 1000;
  // Los cortes: donde se juntan MAX_VALORES cambios de valor desde el corte anterior.
  const cortes = [0];
  let cambios = 0;
  let ultimo = redondea(v(0));
  for (let f = 1; f < fin; f++) {
    const x = redondea(v(f));
    if (x !== ultimo) {
      cambios++;
      ultimo = x;
    }
    if (cambios >= MAX_VALORES) {
      cortes.push(f);
      cambios = 0;
    }
  }
  cortes.push(fin);
  return cortes.slice(0, -1).map((a, i) => {
    const b = cortes[i + 1];
    const interior = puntos.filter(([f]) => f > a && f < b);
    const ganancia: [number, number][] = [[a, v(a)], ...interior, [b, v(b)]];
    return {
      id: `musica-${i + 1}`,
      src: "recorrido-055/musica-055.wav",
      en: a,
      dur: b - a,
      // El frame de fuente en que arranca este trozo: el de la canción en `a` (INICIO_MUSICA es un número entero de frames).
      desde: INICIO_MUSICA + a / FPS_055,
      ganancia,
      reason:
        i === 0
          ? "«Spring is Coming»: su primera nota abre la pieza (f2), la música baja con curva antes de cada frase de Isabella, sube tras el hook y la mitad, y se apaga en la última palabra del CTA: la tarjeta, en silencio. Partida en tramos consecutivos de la misma canción: ffmpeg no admite una expresión de volumen con más de ≈ 80 valores distintos."
          : `«Spring is Coming», trozo ${i + 1}: sigue donde acabó el anterior (f${a}), la misma muestra de la canción.`,
    };
  });
};

export const musica055: readonly TramoAudio[] = HAY_MUSICA ? trocea(envolvente(), FIN_MUSICA_055) : [];

/** Lo que monta `<PistaAudio>`. */
export const audio055: readonly TramoAudio[] = [...voces055, ...off055, ...musica055];

/** Solo para quien necesite la duración de la pieza junto al audio. */
export const DURACION_AUDIO_055 = DURACION_055;
