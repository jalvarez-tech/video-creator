/**
 * EL SONIDO DEL 085 — todo lo que suena, como DATOS (`TramoAudio[]`). Es el de la 076 con la mitad, los dos planos rápidos y el recorrido en su sitio NUEVO: las sonoridades de la canción por tramos están medidas con ebur128 sobre la canción, en las ventanas de ESTA pieza.
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK02, MD04 y CT06, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, desclic de 3 f en las que entran a corte, cruce de 6 f en las
 *                que entran disolviendo y, como el WAV es el TRATADO de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a −15,0 LUFS en su ventana), UNA ganancia de ±0,0 dB.
 *   musica       «Luxury, Elegance, Refined», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos: el golpe de entrada de cada toma suena ENTERO, la música baja con curva de coseno DESPUÉS y acaba ANTES de la
 *                primera palabra (regla del canal desde el 022).
 *
 * LA MEZCLA, en LUFS (ebur128 sobre cada fuente):
 *   voz de Isabella      −15 (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»)
 *   música SOLA          −15 en los tres tramos (la apertura, LOS DOS PLANOS RÁPIDOS —clave `paseo`— y EL RECORRIDO INMERSIVO —clave `bloque5`—) salvo donde la canción no lo aguanta: -15 · -15.6 · -15.4 LUFS (la ganancia no pasa de +6 dB y el pico, de −1 dBFS: lo comprueba la puerta)
 *   música BAJO LA VOZ   −26 en cada ventana de voz: 11 LU por debajo de ella. Una ganancia fija en cada toma.
 * Una sola ganancia por tramo, sin `loudnorm` (le cambiaría la dinámica).
 *
 * LAS RAMPAS DE LA MÚSICA: la apertura suena sola con el golpe de entrada en el f3 y su nivel hasta el f87, donde entra el hook; tras su última palabra la música sube con curva antes del golpe del f188; la MITAD entra en el
 * golpe del f317, baja en 10 f y sube tras su última palabra antes del golpe del f463; el CTA entra en el golpe del f782, la música baja en 10 f y, al acabar su última palabra, se APAGA con curva de coseno hasta
 * cero 2 f antes del final de la pieza, bajo la tarjeta del cierre.
 *
 * Datos puros: la puerta lo carga con node. LO ESCRIBE `proyectos/080/herramientas/montar-pieza.mjs`.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes, volumenDe } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_085, FPS_085, INICIO_MUSICA, OBJETIVO_LUFS, metraje085 } from "./metraje-085";

/** La voz de las tres tomas a cámara (HK02, MD04 y CT06), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje085, { fps: FPS_085, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre; la música sigue apagándose bajo ella. */
const CTA = metraje085.find((c) => c.id === "c10-cta");
if (!CTA) throw new Error("audio-085: falta c10-cta en metraje-085.ts");
export const FIN_CTA_085 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number; ini: number } => {
  const c = metraje085.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-085: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_085);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_085);
  return { en: ini, dur: fin - ini, fin, ini };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/** ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es de la biblioteca de Luxur y no se ha verificado su licencia. */
export const HAY_MUSICA = true;

/** Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre la fuente): la apertura, los dos planos rápidos y el recorrido. */
export const LUFS_TRAMO = { apertura: -15.1, paseo: -14.6, bloque5: -15.6 } as const;
/** La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente, el tramo de la canción que suena mientras ella habla): lo que mide la puerta en lugar de suponer una meseta. */
export const LUFS_CANCION_EN_VOZ = { "c02-hook": -14.2, "c05-mitad": -14.5, "c10-cta": -14.4 } as const;
/** El pico real de la canción en cada tramo sin voz (ebur128 sobre la fuente, dBFS): con la ganancia de cada tramo ninguno pasa de −1 dBFS (lo comprueba la puerta). */
export const PICO_TRAMO = { apertura: -1.3, paseo: -0.1, bloque5: -1.3 } as const;
/** La música SOLA por tramos: −15 LUFS, el nivel de la voz. */
export const OBJETIVO_MUSICA = { apertura: -15, paseo: -15.6, bloque5: -15.4 } as const;
/** Ganancia lineal de la música sola en cada tramo. */
export const ALTOS = {
  apertura: gananciaHasta(LUFS_TRAMO.apertura, OBJETIVO_MUSICA.apertura),
  paseo: gananciaHasta(LUFS_TRAMO.paseo, OBJETIVO_MUSICA.paseo),
  bloque5: gananciaHasta(LUFS_TRAMO.bloque5, OBJETIVO_MUSICA.bloque5),
} as const;
/** Mientras habla Isabella: la música baja hasta −26 LUFS EN CADA VENTANA (11 LU bajo su voz de −15). */
export const LUFS_MUSICA_BAJO_VOZ = -26;
export const BAJOS = {
  "c02-hook": gananciaHasta(LUFS_CANCION_EN_VOZ["c02-hook"], LUFS_MUSICA_BAJO_VOZ),
  "c05-mitad": gananciaHasta(LUFS_CANCION_EN_VOZ["c05-mitad"], LUFS_MUSICA_BAJO_VOZ),
  "c10-cta": gananciaHasta(LUFS_CANCION_EN_VOZ["c10-cta"], LUFS_MUSICA_BAJO_VOZ),
} as const;
/**
 * LOS FUNDIDOS (pedido del usuario en la V6, ya regla del canal): FADE-OUT de FADE_OUT f desde el golpe en que entra su toma (el golpe suena entero y la música baja DESPUÉS, con curva de coseno): la curva ACABA antes de su primera
 * palabra. FADE-IN de FADE_IN f tras su última palabra (con curva suave), o los que quepan hasta 2 f antes del golpe del plano siguiente.
 */
export const FADE_OUT = { hook: 10, mitad: 10, cta: 10 } as const;
export const FADE_IN = { hook: 15, mitad: 22 } as const;
/** Frames que la música se queda BAJA tras la última palabra del hook antes de subir. */
export const RETRASO_SUBIDA_HOOK = 6;
/** Hasta dónde se apaga la música tras la última palabra del CTA: 2 f antes del final de la pieza (la tarjeta va en silencio). */
const APAGADO_CTA_HASTA = FIN_MUSICA_085;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** La envolvente: la casa sola, el hook, la mitad y el CTA con su fundido, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c02-hook");
  const mitad = ventanaDe("c05-mitad");
  const cta = ventanaDe("c10-cta");
  const hookPlano = metraje085.find((c) => c.id === "c02-hook");
  const paseoPlano = metraje085.find((c) => c.id === "c03-gimnasio");
  const mitadPlano = metraje085.find((c) => c.id === "c05-mitad");
  const alcobaPlano = metraje085.find((c) => c.id === "c06-tienda");
  const ctaPlano = metraje085.find((c) => c.id === "c10-cta");
  if (!hookPlano || !paseoPlano || !mitadPlano || !alcobaPlano || !ctaPlano) throw new Error("audio-085: faltan planos en metraje-085.ts");

  const p: [number, number][] = [
    // LA APERTURA: la música sola desde el frame 0 (1 f de entrada para no meter un clic: el golpe de entrada suena en el f3).
    [0, 0],
    [1, ALTOS.apertura],
    // HOOK: el golpe suena entero y la música baja con fundido DESPUÉS; sube con fundido (los f que quepan) hasta el primer plano rápido.
    [hookPlano.en, ALTOS.apertura],
    ...fundido(hookPlano.en, FADE_OUT.hook, ALTOS.apertura, BAJOS["c02-hook"]),
    [hook.fin, BAJOS["c02-hook"]],
    [hook.fin + RETRASO_SUBIDA_HOOK, BAJOS["c02-hook"]],
    ...fundido(hook.fin + RETRASO_SUBIDA_HOOK, Math.min(FADE_IN.hook, paseoPlano.en - (hook.fin + RETRASO_SUBIDA_HOOK) - 2), BAJOS["c02-hook"], ALTOS.paseo),
    // MITAD (entra en el golpe): igual. Tras ella caben unos frames hasta el recorrido: la música sube en los que quepan.
    [mitadPlano.en, ALTOS.paseo],
    ...fundido(mitadPlano.en, FADE_OUT.mitad, ALTOS.paseo, BAJOS["c05-mitad"]),
    [mitad.fin, BAJOS["c05-mitad"]],
    ...fundido(mitad.fin, Math.min(FADE_IN.mitad, alcobaPlano.en - mitad.fin - 2), BAJOS["c05-mitad"], ALTOS.bloque5),
    // CTA (entra en el golpe): la bajada igual...
    [ctaPlano.en, ALTOS.bloque5],
    ...fundido(ctaPlano.en, FADE_OUT.cta, ALTOS.bloque5, BAJOS["c10-cta"]),
    [cta.fin, BAJOS["c10-cta"]],
    // ...y al acabar la voz la música se APAGA con curva de coseno hasta cero, 2 f antes del final de la pieza (la tarjeta va en silencio).
    ...fundido(cta.fin, APAGADO_CTA_HASTA - cta.fin, BAJOS["c10-cta"], 0),
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

/**
 * Remotion le pasa el volumen a ffmpeg como UNA expresión `if(between(t,…),valor,if(…))` con un `if` por cada valor distinto de la ganancia (a 3 decimales), y ffmpeg no admite más de ≈ 80 `if` anidados. Una
 * envolvente con rampas largas se PARTE en tramos de la misma canción, consecutivos y sin solape (cada uno empieza en el frame de fuente en que acabó el anterior: es la misma muestra), cada uno con ≤ `MAX_VALORES`.
 */
const MAX_VALORES = 60;

/** La envolvente `puntos` (frames absolutos de la comp) partida en tramos consecutivos de la canción, cada uno con su trozo de envolvente. */
const trocea = (puntos: [number, number][], fin: number): TramoAudio[] => {
  const entero: TramoAudio = { id: "musica", src: "recorrido-085/musica-085.wav", en: 0, dur: fin, desde: INICIO_MUSICA, ganancia: puntos, reason: "" };
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
      src: "recorrido-085/musica-085.wav",
      en: a,
      dur: b - a,
      // El frame de fuente en que arranca este trozo: el de la canción en `a` (INICIO_MUSICA es un número entero de frames).
      desde: INICIO_MUSICA + a / FPS_085,
      ganancia,
      reason:
        i === 0
          ? "«Luxury, Elegance, Refined»: el golpe del f3 abre la pieza; la música baja con curva tras el golpe de cada entrada de Isabella (hook, mitad y CTA) y sube tras las dos primeras; cada corte cae en un golpe medido; la canción se apaga con curva bajo la tarjeta tras el CTA. Partida en tramos consecutivos de la misma canción: ffmpeg no admite una expresión de volumen con más de ≈ 80 valores distintos."
          : `«Luxury, Elegance, Refined», trozo ${i + 1} de ${cortes.length - 1}: sigue donde acabó el anterior (f${a}), la misma muestra de la canción.`,
    };
  });
};

export const musica085: readonly TramoAudio[] = HAY_MUSICA ? trocea(envolvente(), FIN_MUSICA_085) : [];

/** Lo que monta `<PistaAudio>`. */
export const audio085: readonly TramoAudio[] = [...vocesTomas, ...musica085];
