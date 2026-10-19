/**
 * EL SONIDO DEL 042 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK01, MD03 y CT04, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, desclic de 2 f en el hook (entra a corte y su primera
 *                sílaba suena a los 2,25 f: con los 3 f del defecto la tocaría), cruce de 6 f en la mitad y el CTA (entran disolviendo) y, como el WAV es el TRATADO de `normalizar.mjs` (`<toma>-voz.wav`:
 *                graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a ≈ −15 LUFS en su ventana), UNA ganancia de ±0,1 dB.
 *   musica       «Silver Skies Cinematic Piano», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos. No es la de `envolventeBajoVoz`: la música baja con curva y ACABA de bajar antes de
 *                la primera palabra de cada toma.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente, `herramientas/lufs-rangos.py`):
 *   voz de Isabella      −15 (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»; sus tomas crudas miden −22,5 · −23,6 · −21,5; tratadas, ≈ −15 con pico real de −2,4)
 *   música SOLA          −15 por tramos, el nivel de la voz: la canción mide −15,8 en la apertura, −14,0 en el paseo y −13,5 en el bloque 5 (picos de −3,4 dBFS o menos), así que la apertura SUBE 0,8 dB y
 *                        los otros dos tramos bajan 1,0 y 1,5 dB: ningún pico pasa de −4 dBFS.
 *   música BAJO LA VOZ   −26 en cada ventana de voz: 11 LU por debajo de ella. La mitad y el CTA, con una ganancia fija; el HOOK, con una rampa, porque ahí la canción se queda sola con su respiro (de −17,7 a
 *                        −26,1 LUFS en 6 s): se baja lo que haga falta en cada momento para quedar a −26 y no más.
 * Una sola ganancia por tramo, sin `loudnorm` (le cambiaría la dinámica).
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · La APERTURA suena sola con el golpe del f3 y el golpe de 9,8 dB del f57; tras él, la música baja con curva de coseno en 15 f y ACABA en el f75, donde el hook entra a corte. HK01 no deja aire: su primera
 *     sílaba suena a los 2,25 f del corte, así que no hay golpe que pueda sonar entero con ella encima (declarado: la entrada del hook es un corte seco sin golpe).
 *   · Bajo el HOOK la canción baja sola (su respiro): la envolvente la deja a −26 con una rampa de −9 dB a 0 dB entre el f75 y el f228, y de ahí sube a su nivel de paseo (−1,0 dB) en el f262, para que el golpe
 *     de 17,4 dB del f266 (el retorno del piano, que abre el paseo) suene entero.
 *   · La MITAD y el CTA entran disolviendo: la música baja con curva de coseno en 15 f y acaba 3 f ANTES de su primera palabra; tras su última palabra la música sube en 24 f (la mitad) o se apaga (el CTA).
 *
 * EL CTA Y EL CIERRE. Bajo la voz del CTA la canción cae sola a un lecho (de −16 a −26 LUFS desde el f1004: es la caída natural de la pista) y, al acabar la última palabra (f1007), se APAGA con curva de coseno
 * hasta llegar a cero en el f1066, 8 f antes del primer golpe fuerte que trae la pista tras su caída (82,727 s, 19,5 dB): la tarjeta va en silencio.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes, volumenDe } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_042, FPS_042, INICIO_MUSICA, OBJETIVO_LUFS, metraje042 } from "./metraje-042";

/** Frames de desclic de la voz del hook, que entra a corte y empieza a hablar a los 2,25 f: 2 f, no los 3 del defecto. */
export const DESCLIC_HOOK = 2;

/** La voz de las tres tomas a cámara (HK01, MD03 y CT04), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje042, { fps: FPS_042, objetivoLufs: OBJETIVO_LUFS, desclic: DESCLIC_HOOK });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre. */
const CTA = metraje042.find((c) => c.id === "c10-cta");
if (!CTA) throw new Error("audio-042: falta c10-cta en metraje-042.ts");
export const FIN_CTA_042 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number; ini: number } => {
  const c = metraje042.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-042: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_042);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_042);
  return { en: ini, dur: fin - ini, fin, ini };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la
 * biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Silver Skies Cinematic Piano» entre el 46,998 y el 82,6 s (ebur128): lo que suena en la pieza, en promedio. */
export const LUFS_MESETA = -14.8;
/** Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre la fuente): la apertura (46,998-48,8 s), el paseo (55,9-63,5 s) y el bloque 5 (68,8-76,7 s). */
const LUFS_TRAMO = { apertura: -15.8, paseo: -14.0, bloque5: -13.5 } as const;
/**
 * La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente, el tramo de la canción que suena mientras ella habla): lo que mide la puerta en lugar de suponer la meseta en todas. El hook
 * es la media de su ventana (49,6-55,6 s: −17,7 · −21,7 · −26,1 LUFS por tercios); su envolvente es una rampa.
 */
export const LUFS_CANCION_EN_VOZ = { "c02-hook": -20.7, "c06-mitad": -15.0, "c10-cta": -16.1 } as const;
/** El pico real de la canción en cada tramo sin voz (ebur128 sobre la fuente, dBFS): con la ganancia de cada tramo ninguno pasa de −1 dBFS (lo comprueba la puerta). */
export const PICO_TRAMO = { apertura: -6.1, paseo: -3.4, bloque5: -3.6 } as const;
/** La sonoridad de la canción en cada TERCIO de la ventana de voz del hook (ebur128 sobre la fuente: 49,6-51,6 · 51,6-53,6 · 53,6-55,6 s): la rampa la deja a −26 en cada uno. */
export const LUFS_HOOK_TERCIOS = [-17.7, -21.7, -26.1] as const;
/** La música SOLA: el nivel de la voz. */
const OBJETIVO_MUSICA = -15;
/** Ganancia lineal de la música sola en cada tramo (ver arriba). */
export const ALTOS = {
  apertura: gananciaHasta(LUFS_TRAMO.apertura, OBJETIVO_MUSICA),
  paseo: gananciaHasta(LUFS_TRAMO.paseo, OBJETIVO_MUSICA),
  bloque5: gananciaHasta(LUFS_TRAMO.bloque5, OBJETIVO_MUSICA),
} as const;
/**
 * Mientras habla Isabella: la música baja hasta −26 LUFS EN CADA VENTANA (11 LU bajo su voz de −15). La ganancia absoluta que deja cada ventana en −26 es la de `gananciaHasta`. El hook no tiene un `BAJO` fijo:
 * su envolvente es la rampa `RAMPA_HOOK`.
 */
export const LUFS_MUSICA_BAJO_VOZ = -26;
export const BAJOS = {
  "c06-mitad": gananciaHasta(LUFS_CANCION_EN_VOZ["c06-mitad"], LUFS_MUSICA_BAJO_VOZ),
  "c10-cta": gananciaHasta(LUFS_CANCION_EN_VOZ["c10-cta"], LUFS_MUSICA_BAJO_VOZ),
} as const;
/**
 * LOS FUNDIDOS (pedido del usuario en la V6, ya regla del canal: «el sonido cuando cambia a hablar Isabella debe hacer un fade-out / fade-in … para que no se escuche ahí mismo tan cortado»):
 *   · FADE-OUT de FADE_OUT f: con curva de coseno, ACABA antes de la primera palabra (a 3 f la mitad y el CTA, a 2,25 f el hook, que no deja más).
 *   · FADE-IN de FADE_IN f tras su última palabra (con curva suave).
 */
export const FADE_OUT = { hook: 15, mitad: 15, cta: 15 } as const;
export const FADE_IN = 24;
/** El margen en frames entre el final de la bajada y la primera palabra de la mitad y del CTA (la del hook la fija el corte: 2,25 f). */
const MARGEN_BAJADA = 3;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** dB → ganancia lineal. */
const lin = (db: number): number => Math.pow(10, db / 20);

/**
 * La rampa del HOOK: lo que hay que restarle a la canción en cada instante para quedar a −26 LUFS bajo la voz, mientras ella se queda sola con su respiro (−17,7 → −26,1 LUFS en la ventana). Frames de la comp y
 * dB sobre la fuente; de −9 dB en el f75 a 0 dB en el f228, en tramos rectos.
 */
export const RAMPA_HOOK: [number, number][] = [
  [75, lin(-9)],
  [105, lin(-8.6)],
  [140, lin(-6.5)],
  [170, lin(-4.2)],
  [200, lin(-2.2)],
  [228, 1],
];

/** La envolvente: la apertura con su golpe, el hook con su rampa, el paseo, la mitad y el CTA con su fundido, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const mitad = ventanaDe("c06-mitad");
  const cta = ventanaDe("c10-cta");
  const hookPlano = metraje042.find((c) => c.id === "c02-hook");
  const paseoPlano = metraje042.find((c) => c.id === "c03-palmas");
  const mitadPlano = metraje042.find((c) => c.id === "c06-mitad");
  const bloque5 = metraje042.find((c) => c.id === "c07-cabana");
  const ctaPlano = metraje042.find((c) => c.id === "c10-cta");
  if (!hookPlano || !paseoPlano || !mitadPlano || !bloque5 || !ctaPlano) throw new Error("audio-042: faltan planos en metraje-042.ts");
  const golpeHook = 57; // el golpe de 9,8 dB que suena en la apertura, 18 f antes del corte del hook (`GOLPE.antesDelHook`)

  const p: [number, number][] = [
    // LA APERTURA: la música sola desde el frame 0 (1 f de entrada para no meter un clic: el golpe de entrada suena en el f3) y el golpe del f57, que suena entero; después, la bajada con curva
    // que ACABA en el corte del hook (f75), a 2,25 f de su primera sílaba.
    [0, 0],
    [1, ALTOS.apertura],
    [golpeHook + 3, ALTOS.apertura],
    ...fundido(golpeHook + 3, hookPlano.en - golpeHook - 3, ALTOS.apertura, RAMPA_HOOK[0][1]),
    // EL HOOK: la rampa que deja la canción a −26 mientras ella habla y la devuelve a su nivel de paseo justo antes del golpe del retorno (f266: suena entero).
    ...RAMPA_HOOK.slice(1),
    [paseoPlano.en - 4, ALTOS.paseo],
    // EL PASEO y la MITAD: baja con curva y acaba MARGEN_BAJADA f antes de la primera palabra; sube con curva en FADE_IN f tras la última (el plano siguiente disuelve a los recorridos del bloque 5).
    [mitad.ini - MARGEN_BAJADA - FADE_OUT.mitad, ALTOS.paseo],
    ...fundido(mitad.ini - MARGEN_BAJADA - FADE_OUT.mitad, FADE_OUT.mitad, ALTOS.paseo, BAJOS["c06-mitad"]),
    [mitad.fin, BAJOS["c06-mitad"]],
    ...fundido(mitad.fin, FADE_IN, BAJOS["c06-mitad"], ALTOS.bloque5),
    // CTA: igual de bajada; la subida no hay: al acabar la voz la música se APAGA con curva de coseno hasta cero, en el f1066 (la tarjeta va en silencio).
    [cta.ini - MARGEN_BAJADA - FADE_OUT.cta, ALTOS.bloque5],
    ...fundido(cta.ini - MARGEN_BAJADA - FADE_OUT.cta, FADE_OUT.cta, ALTOS.bloque5, BAJOS["c10-cta"]),
    [cta.fin, BAJOS["c10-cta"]],
    ...fundido(cta.fin, FIN_MUSICA_042 - cta.fin, BAJOS["c10-cta"], 0),
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

/**
 * Remotion le pasa el volumen a ffmpeg como UNA expresión `if(between(t,…),valor,if(…))` con un `if` por cada valor distinto de la ganancia (a 3 decimales), y ffmpeg no admite más de ≈ 80 `if`
 * anidados («Missing ')' or too many args»: lo dijo el primer render de esta pieza, con una rampa de 153 f y un apagado de 59). Una envolvente con rampas largas se PARTE en tramos de la misma
 * canción, consecutivos y sin solape (cada uno empieza en el frame de fuente en que acabó el anterior: es la misma muestra), cada uno con ≤ `MAX_VALORES` cambios de valor.
 */
const MAX_VALORES = 60;

/** La envolvente `puntos` (frames absolutos de la comp) partida en tramos consecutivos de la canción, cada uno con su trozo de envolvente. */
const trocea = (puntos: [number, number][], fin: number): TramoAudio[] => {
  const entero: TramoAudio = { id: "musica", src: "recorrido-042/musica-042.wav", en: 0, dur: fin, desde: INICIO_MUSICA, ganancia: puntos, reason: "" };
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
      src: "recorrido-042/musica-042.wav",
      en: a,
      dur: b - a,
      // El frame de fuente en que arranca este trozo: el de la canción en `a` (INICIO_MUSICA es un número entero de frames).
      desde: INICIO_MUSICA + a / FPS_042,
      ganancia,
      reason:
        i === 0
          ? "«Silver Skies Cinematic Piano»: el golpe de 12,3 dB del f3 abre la pieza, la música baja con curva antes del hook, el respiro del piano suena bajo la voz y su retorno de 17,4 dB (f266) abre el paseo; baja antes de la mitad y del CTA y se apaga bajo la tarjeta tras «…sobre este lote». Partida en tramos consecutivos de la misma canción: ffmpeg no admite una expresión de volumen con más de ≈ 80 valores distintos."
          : `«Silver Skies Cinematic Piano», trozo ${i + 1} de ${cortes.length - 1}: sigue donde acabó el anterior (f${a}), la misma muestra de la canción.`,
    };
  });
};

export const musica042: readonly TramoAudio[] = HAY_MUSICA ? trocea(envolvente(), FIN_MUSICA_042) : [];

/** Lo que monta `<PistaAudio>`. */
export const audio042: readonly TramoAudio[] = [...vocesTomas, ...musica042];
