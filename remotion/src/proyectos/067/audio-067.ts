/**
 * EL SONIDO DEL 067 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK02, MD01 y CT05, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, cruce de 6 f (las tres entran disolviendo) y, como el WAV es el
 *                TRATADO de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a −15,0 LUFS en su ventana), UNA ganancia de ±0,0 dB.
 *   musica       «Return to Oasis», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos. No es la de `envolventeBajoVoz`: la música baja con curva de coseno y acaba de bajar
 *                ANTES de la primera palabra (regla del canal desde el 022), y bajo el CTA SIGUE la caída natural de la canción (su lecho de piano) en vez de fijar una ganancia.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre la fuente, `herramientas/lufs-rangos.py` y la sonoridad momentánea de 400 ms, `herramientas/momentanea.py`):
 *   voz de Isabella      −15 (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»; sus tomas crudas miden −25,1 · −27,2 · −27,3; tratadas, −15,0 con el pico real a −2,5 dBFS)
 *   música SOLA          −15 por tramos, el nivel de la voz: la canción es una meseta de arpegio (−8,7 en la apertura, −8,6 en el paseo y −7,6 en el bloque 5, picos de +0,1 dBFS sin ganancia), así que
 *                        baja 6,3 · 6,4 · 7,4 dB: ningún pico pasa de −6 dBFS.
 *   música BAJO LA VOZ   ≈ −26 en cada ventana: 11 LU por debajo de ella. El HOOK y la MITAD, con una ganancia fija (la canción es una meseta ahí: −8,7 → −26 = −17,3 dB); el CTA, con una rampa, porque ahí la canción
 *                        CAE sola (de −7,2 a −19,6 LUFS en 2 s, y un lecho de piano de −22…−27): se baja lo que haga falta en cada momento para quedar a −26 y no más (−18,8 → 0 dB).
 * Una sola ganancia por tramo, sin `loudnorm` (le cambiaría la dinámica).
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · La APERTURA suena sola con el golpe de entrada en el f3 y su arpegio hasta el f96, donde la disolvencia al HOOK acaba (una disolvencia no pide golpe): la música baja con curva de coseno en 10 f y acaba en el f97,
 *     2 f antes de la primera palabra (f99).
 *   · Tras la última palabra del hook (f218) la música sube con curva en 13 f y está arriba en el golpe de 9,2 dB del f233 (el corte seco que abre el paseo).
 *   · La MITAD, igual: la bajada de 10 f acaba en el f463, 2 f antes de la primera palabra (f465); tras la última (f657) sube en 15 f y está arriba en el golpe de 9,7 dB del f674.
 *   · El CTA: bajada de 10 f que acaba en el f950, 2 f antes de la primera palabra (f952), justo cuando la canción empieza a caer.
 *
 * EL CTA Y LA RESOLUCIÓN. La canción se resuelve SOLA: cae desde los 180,09 s (el f950) de −7,2 a −19,6 LUFS en 2 s y deja un lecho de piano de −22…−27 LUFS bajo la voz. La ganancia sube de −18,8 a 0 dB mientras
 * la canción baja, para que lo que suene quede a ≈ −26 LUFS. Con la última frase («y hablemos», f1053-1078) el lecho se lleva a cero en línea recta hasta el f1081, 2 f antes del golpe de 10,0 dB de los 184,492 s
 * (f1083); la tarjeta va en silencio.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes, volumenDe } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_067, FPS_067, INICIO_MUSICA, OBJETIVO_LUFS, metraje067 } from "./metraje-067";

/** La voz de las tres tomas a cámara (HK02, MD01 y CT05), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje067, { fps: FPS_067, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre. */
const CTA = metraje067.find((c) => c.id === "c10-cta");
if (!CTA) throw new Error("audio-067: falta c10-cta en metraje-067.ts");
export const FIN_CTA_067 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number; ini: number } => {
  const c = metraje067.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-067: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_067);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_067);
  return { en: ini, dur: fin - ini, fin, ini };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre la fuente): la apertura (148,43-151,63 s), el paseo (156,2-163,8 s) y el bloque 5 (170,9-180,0 s). */
export const LUFS_TRAMO = { apertura: -8.7, paseo: -8.6, bloque5: -7.6 } as const;
/** El pico real de la canción en cada tramo sin voz (ebur128 sobre la fuente, dBFS): con la ganancia de cada tramo ninguno pasa de −1 dBFS (lo comprueba la puerta). */
export const PICO_TRAMO = { apertura: 0.0, paseo: 0.1, bloque5: 0.1 } as const;
/** La música SOLA: el nivel de la voz. */
const OBJETIVO_MUSICA = -15;
/** Ganancia lineal de la música sola en cada tramo (ver arriba). */
export const ALTOS = {
  apertura: gananciaHasta(LUFS_TRAMO.apertura, OBJETIVO_MUSICA),
  paseo: gananciaHasta(LUFS_TRAMO.paseo, OBJETIVO_MUSICA),
  bloque5: gananciaHasta(LUFS_TRAMO.bloque5, OBJETIVO_MUSICA),
} as const;
/**
 * Mientras habla Isabella: la música baja hasta ≈ −26 LUFS (11 LU bajo su voz de −15). El HOOK y la MITAD tienen una ganancia fija (meseta de ≈ −8,7 LUFS en su ventana: −17,3 dB; el pico momentáneo, −7,0, queda a −24,3).
 * El CTA sigue la curva de la canción: la sonoridad momentánea (400 ms) bajo él es la de `MOMENTANEA` y la ganancia que la deja en −26 es `−26 − M` (con tope de 0 dB: la música nunca sube sobre el archivo bajo su voz).
 */
export const LUFS_MUSICA_BAJO_VOZ = -26;
const db = (x: number): number => Math.pow(10, x / 20);
/** La sonoridad momentánea de la canción (ebur128, 400 ms; LUFS) en los frames que la puerta y esta envolvente usan de referencia (`herramientas/momentanea.py`, con INICIO_MUSICA). */
export const MOMENTANEA = {
  hook: [
    [95, -9.3],
    [110, -7.0],
    [125, -8.3],
    [140, -8.8],
    [155, -9.4],
    [170, -8.6],
    [185, -8.8],
    [200, -8.5],
    [215, -9.0],
  ],
  mitad: [
    [470, -8.2],
    [485, -8.8],
    [500, -8.4],
    [515, -8.4],
    [530, -8.9],
    [545, -8.3],
    [560, -8.6],
    [575, -8.4],
    [590, -9.1],
    [605, -8.5],
    [620, -8.6],
    [635, -7.4],
    [650, -8.2],
  ],
  cta: [
    [950, -7.2],
    [965, -10.2],
    [980, -13.6],
    [995, -17.0],
    [1010, -19.6],
    [1025, -19.9],
    [1040, -22.6],
    [1055, -25.2],
    [1070, -26.9],
  ],
} as const;
/** La ganancia (dB, ≤ 0) que deja la música a −26 LUFS con una sonoridad momentánea `m`. */
const bajoDe = (m: number): number => Math.min(0, LUFS_MUSICA_BAJO_VOZ - m);
export const BAJO_HOOK_DB = -17.3;
export const BAJO_MITAD_DB = -17.4;
/**
 * LOS FUNDIDOS (pedido del usuario en la V6, ya regla del canal): FADE-OUT con curva de coseno que ACABA antes de la primera palabra (el hook, a 2 f; la mitad, a 2 f; el CTA, a 2 f) y FADE-IN con curva suave tras su
 * última palabra, o los que quepan hasta 2 f antes del golpe del plano siguiente.
 */
export const FADE_OUT = { hook: 10, mitad: 10, cta: 10 } as const;
export const FADE_IN = { hook: 22, mitad: 22 } as const;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** La envolvente: la casa sola, el hook, la mitad y el CTA con su fundido, y el apagado final antes de la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c02-hook");
  const mitad = ventanaDe("c06-mitad");
  const cta = ventanaDe("c10-cta");
  const hookPlano = metraje067.find((c) => c.id === "c02-hook");
  const paseoPlano = metraje067.find((c) => c.id === "c03-paneo");
  const mitadPlano = metraje067.find((c) => c.id === "c06-mitad");
  const aireUnoPlano = metraje067.find((c) => c.id === "c07-curva");
  if (!hookPlano || !paseoPlano || !mitadPlano || !aireUnoPlano) throw new Error("audio-067: faltan planos en metraje-067.ts");

  const bajoHook = db(BAJO_HOOK_DB);
  const bajoMitad = db(BAJO_MITAD_DB);
  // La bajada del CTA: a −26 LUFS en cada momento (la canción cae sola: la ganancia sube a medida que ella baja).
  const gCta = MOMENTANEA.cta.map(([f, m]) => [f, db(bajoDe(m))] as [number, number]);

  const p: [number, number][] = [
    // LA APERTURA: la música sola desde el frame 0 (1 f de entrada para no meter un clic: el golpe de entrada suena en el f3).
    [0, 0],
    [1, ALTOS.apertura],
    // HOOK: baja con fundido y acaba 2 f antes de la primera palabra; sube tras la última hasta el golpe del paseo (los f que quepan).
    ...fundido(hook.ini - 2 - FADE_OUT.hook, FADE_OUT.hook, ALTOS.apertura, bajoHook),
    ...fundido(hook.fin, Math.min(FADE_IN.hook, paseoPlano.en - hook.fin - 2), bajoHook, ALTOS.paseo),
    // MITAD: igual: baja con fundido, acaba 2 f antes de la primera palabra y sube tras la última hasta el golpe del primer plano del dron (los f que quepan).
    ...fundido(mitad.ini - 2 - FADE_OUT.mitad, FADE_OUT.mitad, ALTOS.paseo, bajoMitad),
    ...fundido(mitad.fin, Math.min(FADE_IN.mitad, aireUnoPlano.en - mitad.fin - 2), bajoMitad, ALTOS.bloque5),
    // CTA: la bajada acaba 2 f antes de la primera palabra y la canción cae sola; la ganancia sube de −18,8 a 0 dB para que lo que suene quede a −26 LUFS.
    ...fundido(cta.ini - 2 - FADE_OUT.cta, FADE_OUT.cta, ALTOS.bloque5, gCta[0][1]),
    ...gCta.slice(1).filter(([f]) => f <= 1055),
    // El lecho (≈ −26 LUFS por sí solo) se lleva a cero en línea recta bajo la última frase, 25 f, antes del golpe de 10,0 dB del f1083; la tarjeta va en silencio.
    [1056, db(bajoDe(-25.4))],
    [FIN_MUSICA_067, 0],
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

/**
 * Remotion le pasa el volumen a ffmpeg como UNA expresión `if(between(t,…),valor,if(…))` con un `if` por cada valor distinto de la ganancia (a 3 decimales), y ffmpeg no admite más de ≈ 80 `if`
 * anidados («Missing ')' or too many args»). Una envolvente con rampas largas se PARTE en tramos de la misma canción, consecutivos y sin solape (cada uno empieza en el frame de fuente en que acabó el anterior:
 * es la misma muestra), cada uno con ≤ `MAX_VALORES` cambios de valor.
 */
const MAX_VALORES = 60;

/** La envolvente `puntos` (frames absolutos de la comp) partida en tramos consecutivos de la canción, cada uno con su trozo de envolvente. */
const trocea = (puntos: [number, number][], fin: number): TramoAudio[] => {
  const entero: TramoAudio = { id: "musica", src: "recorrido-067/musica-067.wav", en: 0, dur: fin, desde: INICIO_MUSICA, ganancia: puntos, reason: "" };
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
      src: "recorrido-067/musica-067.wav",
      en: a,
      dur: b - a,
      // El frame de fuente en que arranca este trozo: el de la canción en `a` (INICIO_MUSICA es un número entero de frames).
      desde: INICIO_MUSICA + a / FPS_067,
      ganancia,
      reason:
        i === 0
          ? "«Return to Oasis»: el golpe de 9,9 dB del f3 abre la pieza; la música baja con curva antes de la primera palabra de Isabella en el hook, la mitad y el CTA y sube tras su última palabra; cada corte seco cae en un golpe medido; la canción cae sola a un piano en el CTA y se apaga antes de la tarjeta. Partida en tramos consecutivos de la misma canción: ffmpeg no admite una expresión de volumen con más de ≈ 80 valores distintos."
          : `«Return to Oasis», trozo ${i + 1} de ${cortes.length - 1}: sigue donde acabó el anterior (f${a}), la misma muestra de la canción.`,
    };
  });
};

export const musica067: readonly TramoAudio[] = HAY_MUSICA ? trocea(envolvente(), FIN_MUSICA_067) : [];

/** Lo que monta `<PistaAudio>`. */
export const audio067: readonly TramoAudio[] = [...vocesTomas, ...musica067];
