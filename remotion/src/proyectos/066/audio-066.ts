/**
 * EL SONIDO DEL 066 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK05, MD03 y CT04, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, cruce de 6 f en las tres (entran disolviendo) y, como el WAV es el TRATADO de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a −15,0 LUFS en su ventana), UNA ganancia de ±0,0 dB.
 *   musica       «Flying Into the Sun», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos. No es la de `envolventeBajoVoz`: la música baja con curva de coseno y acaba de bajar ANTES de la
 *                primera palabra (regla del canal desde el 022), y bajo el CTA SIGUE la caída natural de la canción en vez de fijar una ganancia.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre la fuente, `herramientas/lufs-rangos.py` y la sonoridad momentánea de 400 ms):
 *   voz de Isabella      −15 (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»; sus tomas crudas miden −26,5 · −27,7 · −25,0; tratadas, −15,0 con el pico real a −2,5 dBFS o menos)
 *   música SOLA          −15 por tramos, el nivel de la voz: la canción es FUERTE y crece (−13,4 en la apertura, −10,7 en el paseo, −8,0 en el bloque 5; picos de 0 dBFS), así que la apertura baja 1,6 dB, el paseo 4,3 y
 *                        el bloque 5 7,0: ningún pico pasa de −2,3 dBFS.
 *   música BAJO LA VOZ   ≈ −26 en cada ventana: 11 LU por debajo de ella. El HOOK y la MITAD, con una ganancia fija (la canción es una meseta ahí: −10,8 → −26 = −15,2 dB y −8,6 → −26 = −17,4 dB); el CTA, con la
 *                        caída natural de la canción (de −16,4 a −26,6 LUFS en 2 s): se baja lo que haga falta en cada momento para quedar a −26 y no más (−9,6 → 0 dB).
 * Una sola ganancia por tramo, sin `loudnorm` (le cambiaría la dinámica).
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · La APERTURA suena sola con el golpe de entrada en el f3 y su crescendo hasta el f72, donde la disolvencia al HOOK acaba: la música baja con curva de coseno en 10 f y acaba en el f92, 2 f antes de la primera
 *     palabra (f94).
 *   · Tras la última palabra del hook (f290) la música sube con curva en 22 f y está arriba en el golpe de 10,8 dB del f331 (el corte seco que abre el paseo).
 *   · La MITAD entra disolviendo (f611): su primera palabra suena a los 3 f (f614), así que la bajada de 8 f (f604-612) cae DENTRO de la disolvencia y acaba 2 f antes de ella. Tras su última palabra (f786) la música
 *     sube en 9 f (lo que cabe: el clip de la mitad se acaba) y está arriba 2 f antes del golpe del f797.
 *   · El CTA: bajada de 10 f que acaba en el f1073, 2 f antes de la primera palabra (f1075).
 *
 * EL CTA Y LA RESOLUCIÓN. La canción se resuelve SOLA: cae desde los 213,3 s (≈ f1060, 15 f antes de la primera palabra del CTA) de −9 a −22 LUFS en 2 s y sigue bajando hasta un lecho de −26/−30 LUFS. La voz del CTA
 * acaba en el f1144: la música se lleva a cero en línea recta hasta el f1156, 10 f antes del golpe de 20,9 dB de los 216,877 s (f1167); la tarjeta (f1158) va en silencio.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes, volumenDe } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_066, FPS_066, INICIO_MUSICA, OBJETIVO_LUFS, metraje066 } from "./metraje-066";

/** La voz de las tres tomas a cámara (HK05, MD03 y CT04), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje066, { fps: FPS_066, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre. */
const CTA = metraje066.find((c) => c.id === "c09-cta");
if (!CTA) throw new Error("audio-066: falta c09-cta en metraje-066.ts");
export const FIN_CTA_066 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number; ini: number } => {
  const c = metraje066.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-066: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_066);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_066);
  return { en: ini, dur: fin - ini, fin, ini };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la biblioteca de Luxur y no se ha verificado su licencia
 * (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre la fuente): la apertura (178,1-180,7 s), el paseo (189,1-197,0 s) y el bloque 5 (204,6-213,0 s). */
export const LUFS_TRAMO = { apertura: -13.4, paseo: -10.7, bloque5: -8.0 } as const;
/** El pico real de la canción en cada tramo sin voz (ebur128 sobre la fuente, dBFS): con la ganancia de cada tramo ninguno pasa de −1 dBFS (lo comprueba la puerta). */
export const PICO_TRAMO = { apertura: -0.7, paseo: 0.0, bloque5: 0.0 } as const;
/** La música SOLA: el nivel de la voz. */
const OBJETIVO_MUSICA = -15;
/** Ganancia lineal de la música sola en cada tramo (ver arriba). */
export const ALTOS = {
  apertura: gananciaHasta(LUFS_TRAMO.apertura, OBJETIVO_MUSICA),
  paseo: gananciaHasta(LUFS_TRAMO.paseo, OBJETIVO_MUSICA),
  bloque5: gananciaHasta(LUFS_TRAMO.bloque5, OBJETIVO_MUSICA),
} as const;
/**
 * Mientras habla Isabella: la música baja hasta ≈ −26 LUFS (11 LU bajo su voz de −15). El HOOK y la MITAD tienen una ganancia fija (la canción es una meseta ahí: −10,8 y −8,6 LUFS en su ventana). El CTA sigue la
 * caída de la canción: la sonoridad momentánea (400 ms) bajo él es la de `MOMENTANEA` y la ganancia que la deja en −26 es `−26 − M` (con tope de 0 dB: la música nunca sube sobre el archivo bajo su voz).
 */
export const LUFS_MUSICA_BAJO_VOZ = -26;
const db = (x: number): number => Math.pow(10, x / 20);
/** La sonoridad de la canción bajo el hook y bajo la mitad (ebur128 de su ventana, sobre la fuente; LUFS). */
export const LUFS_BAJO = { hook: -10.8, mitad: -8.6 } as const;
/** La sonoridad momentánea de la canción (ebur128, 400 ms; LUFS) en los frames que la puerta y esta envolvente usan de referencia bajo el CTA. */
export const MOMENTANEA = {
  cta: [
    [1076, -16.6],
    [1096, -22.5],
    [1111, -23.7],
    [1126, -26.3],
    [1144, -26.6],
  ],
} as const;
/** La ganancia (dB, ≤ 0) que deja la música a −26 LUFS con una sonoridad momentánea `m`. */
const bajoDe = (m: number): number => Math.min(0, LUFS_MUSICA_BAJO_VOZ - m);
export const BAJO_HOOK_DB = bajoDe(LUFS_BAJO.hook); // −15,2 dB
export const BAJO_MITAD_DB = bajoDe(LUFS_BAJO.mitad); // −17,4 dB
/**
 * LOS FUNDIDOS (pedido del usuario en la V6, ya regla del canal): FADE-OUT con curva de coseno que ACABA antes de la primera palabra (el hook, la mitad y el CTA, a 2 f) y FADE-IN con curva suave tras su última
 * palabra, o los que quepan hasta 2 f antes del golpe del plano siguiente.
 */
export const FADE_OUT = { hook: 10, mitad: 8, cta: 10 } as const;
export const FADE_IN = { hook: 22, mitad: 22 } as const;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** La envolvente: la casa sola, el hook, la mitad y el CTA con su fundido, y el apagado final antes de la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c02-hook");
  const mitad = ventanaDe("c05-mitad");
  const cta = ventanaDe("c09-cta");
  const paseoPlano = metraje066.find((c) => c.id === "c03-cielo");
  const bloque5Plano = metraje066.find((c) => c.id === "c06-rincon");
  if (!paseoPlano || !bloque5Plano) throw new Error("audio-066: faltan planos en metraje-066.ts");

  const bajoHook = db(BAJO_HOOK_DB);
  const bajoMitad = db(BAJO_MITAD_DB);
  const gCta = MOMENTANEA.cta.map(([f, m]) => [f, db(bajoDe(m))] as [number, number]);

  const p: [number, number][] = [
    // LA APERTURA: la música sola desde el frame 0 (1 f de entrada para no meter un clic: el golpe de entrada suena en el f3).
    [0, 0],
    [1, ALTOS.apertura],
    // HOOK: la bajada acaba 2 f antes de la primera palabra (f94); sube tras la última palabra hasta el golpe del paseo (f331).
    ...fundido(hook.ini - 2 - FADE_OUT.hook, FADE_OUT.hook, ALTOS.apertura, bajoHook),
    ...fundido(hook.fin, Math.min(FADE_IN.hook, paseoPlano.en - hook.fin - 2), bajoHook, ALTOS.paseo),
    // MITAD: la bajada, con curva, cae dentro de la disolvencia y acaba 2 f antes de la primera palabra; sube con fundido tras la última palabra (los f que quepan hasta 2 f antes del golpe del f797: 9).
    ...fundido(mitad.ini - 2 - FADE_OUT.mitad, FADE_OUT.mitad, ALTOS.paseo, bajoMitad),
    ...fundido(mitad.fin, Math.min(FADE_IN.mitad, bloque5Plano.en - mitad.fin - 2), bajoMitad, ALTOS.bloque5),
    // CTA: la bajada acaba 2 f antes de la primera palabra; la canción cae sola y la ganancia sigue su caída para que el lecho quede a −26 LUFS.
    ...fundido(cta.ini - 2 - FADE_OUT.cta, FADE_OUT.cta, ALTOS.bloque5, gCta[0][1]),
    [cta.ini + 6, gCta[0][1]], // se queda ahí unos frames: la bajada ya acabó y todavía no sube (la canción cae sola)
    ...gCta.slice(1),
    // El lecho suena así hasta la última palabra y se lleva a cero en línea recta antes del golpe de 20,9 dB (f1167).
    [FIN_MUSICA_066, 0],
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
  const entero: TramoAudio = { id: "musica", src: "recorrido-066/musica-066.wav", en: 0, dur: fin, desde: INICIO_MUSICA, ganancia: puntos, reason: "" };
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
      src: "recorrido-066/musica-066.wav",
      en: a,
      dur: b - a,
      // El frame de fuente en que arranca este trozo: el de la canción en `a` (INICIO_MUSICA es un número entero de frames).
      desde: INICIO_MUSICA + a / FPS_066,
      ganancia,
      reason:
        i === 0
          ? "«Flying Into the Sun»: el golpe de 10,1 dB del f3 abre la pieza; la música baja con curva antes de la primera palabra de Isabella en el hook, la mitad y el CTA y sube tras su última palabra; los golpes del f331, f429, f797, f876 y f949 abren cada plano del paseo; la canción cae sola desde los 213,3 s y se apaga antes de la tarjeta. Partida en tramos consecutivos de la misma canción: ffmpeg no admite una expresión de volumen con más de ≈ 80 valores distintos."
          : `«Flying Into the Sun», trozo ${i + 1} de ${cortes.length - 1}: sigue donde acabó el anterior (f${a}), la misma muestra de la canción.`,
    };
  });
};

export const musica066: readonly TramoAudio[] = HAY_MUSICA ? trocea(envolvente(), FIN_MUSICA_066) : [];

/** Lo que monta `<PistaAudio>`. */
export const audio066: readonly TramoAudio[] = [...vocesTomas, ...musica066];
