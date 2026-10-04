/**
 * EL SONIDO DEL 019 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos
 * pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK05, MD08 y CT05, derivada de los cortes
 *                que traen `audio` (`vocesDeCortes`): mismo arranque que su
 *                imagen, desclic de 3 f cuando su plano entra o sale a corte, cruce
 *                de 6 f cuando disuelve, y UNA ganancia por toma hasta `OBJETIVO_LUFS`.
 *                La primera toma sale sin voz: ella no habla hasta que su imagen es opaca.
 *   musica       «Flying Into the Sun», con una envolvente que BAJA mientras habla Isabella
 *                y sube en los recorridos. No es la de `envolventeBajoVoz`: el hook y la mitad
 *                necesitan rampas a medida (ver abajo) y el CTA, una que siga la caída de la canción.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente):
 *   voz de Isabella      −21 (sus tomas miden −20,7 · −17,9 · −18,9)
 *   música SOLA          −15: arriba, en los recorridos y el golpe de apertura
 *   música BAJO LA VOZ   −31: ≈ 10 LU por debajo de ella (ALTO × 0,16 = −16 dB)
 * La canción viene masterizada a −9,5 LUFS en la meseta (picos a 0 dBFS) y a −23 en el lecho: una ganancia (nunca un
 * loudnorm, que le cambiaría la dinámica) la lleva a su sitio. Como sube hasta −7,8 (crescendo), la música sola va de
 * ≈ −18,7 (la apertura) a ≈ −13,3 (la vista).
 *
 * LAS RAMPAS DE LA MÚSICA bajo la voz, y por qué no son las del 018:
 *   · HOOK. Isabella entra A CORTE en un golpe (f92) y su primera palabra suena en f95. Si la música bajara 12 f ANTES de esa
 *     palabra (como en el 018) el golpe del corte quedaría a −12 dB y no se oiría; aquí baja en los 3 f entre el golpe y la
 *     palabra (92 → 95): el golpe suena entero y la voz nace con la música ya abajo.
 *   · MITAD. Entra por disolvencia: baja los 12 f anteriores a su primera palabra y vuelve a subir a su ritmo hasta el golpe
 *     del corte siguiente (703), a 9 f de su última palabra.
 *   · Al acabar el hook, la música vuelve arriba en 12 f y llega a su nivel en el golpe de entrada del dron (209).
 *
 * EL CTA Y LA CAÍDA. A los 34,7 s de la canción (f1041, justo cuando entra la imagen de Isabella) la música cae ≈ 20 dB en 4 s
 * a un lecho de −23 LUFS, y su primera palabra suena en f1042. Un nivel fijo no vale: con −16 dB el lecho quedaría inaudible y con
 * menos la meseta tapa su primera palabra. La envolvente SIGUE la caída: en cada instante deja la música a −31 LUFS (10 LU bajo
 * su voz) o a su nivel «solo» si ya es más bajo (`CAIDA_LUFS`: la sonoridad momentánea de la canción, medida cada 6 f). Pasada
 * la caída, el lecho suena a su nivel (≈ −28 a −34 LUFS) bajo su voz, y desde que acaba la toma se apaga en línea recta bajo la tarjeta.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_019, FPS_019, INICIO_MUSICA, OBJETIVO_LUFS, metraje019 } from "./metraje-019";

/** La voz de las tres tomas a cámara (HK05, MD08 y CT05), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje019, { fps: FPS_019, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre y el lecho empieza a apagarse. */
const CTA = metraje019.find((c) => c.id === "c10-cta");
if (!CTA) throw new Error("audio-019: falta c10-cta en metraje-019.ts");
export const FIN_CTA_019 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number } => {
  const c = metraje019.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-019: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_019);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_019);
  return { en: ini, dur: fin - ini, fin };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma
 * encima. La canción es una pista de la biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Flying Into the Sun» entre el 178,07 y el 212,7 s (ebur128), la meseta: lo que suena en los recorridos. */
const LUFS_MESETA = -9.5;
/** La música SOLA. */
const OBJETIVO_MUSICA = -15;
/** Ganancia lineal de la música sola: −5,5 dB sobre el archivo. */
const ALTO = gananciaHasta(LUFS_MESETA, OBJETIVO_MUSICA);
/** Mientras habla Isabella en el hook y la mitad: −16 dB más (≈ 10 LU bajo su voz). */
const BAJO = ALTO * 0.16;
/** La sonoridad a la que la música queda bajo la voz del CTA (LUFS): 10 LU bajo los −21 de Isabella. */
const MUSICA_BAJO_LA_VOZ = OBJETIVO_LUFS - 10;
/** Frames que tarda la música en subir tras la última palabra del hook (hasta el golpe de entrada del dron) y en bajar antes de la mitad. */
const RAMPA = 12;

/**
 * LA CAÍDA de la canción, medida: sonoridad MOMENTÁNEA (ebur128, ventana de 400 ms) de la canción tal cual, SIN ganancia,
 * `[frame de la comp en que suena, LUFS]`, cada 6 f. El frame es el del CENTRO de la ventana: `(t_log − 0,2 − INICIO_MUSICA +
 * RETARDO_AUDIO) · 30`, con `t_log` el instante que imprime ffmpeg (212,9 → 1040, 213,1 → 1046…). Antes de f1040 la meseta (−8,7);
 * tras f1118 el lecho de −24 a −27 (con pulsos de −21 cada 4,3 s), donde ya no hace falta bajar nada más.
 */
export const CAIDA_LUFS: readonly (readonly [number, number])[] = [
  [1040, -8.7],
  [1046, -9.7],
  [1052, -11.5],
  [1058, -13.9],
  [1064, -15.7],
  [1070, -17.2],
  [1076, -18.9],
  [1082, -21.0],
  [1088, -22.5],
  [1094, -23.3],
  [1100, -23.8],
  [1106, -23.9],
  [1112, -24.9],
  [1118, -26.3],
];

/** La envolvente: hook, mitad y CTA con su propia rampa, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c02-hook");
  const mitad = ventanaDe("c06-mitad");
  const cta = ventanaDe("c10-cta");
  const dron = metraje019.find((c) => c.id === "c03-dron");
  const umbral = metraje019.find((c) => c.id === "c07-umbral");
  const hookPlano = metraje019.find((c) => c.id === "c02-hook");
  if (!dron || !umbral || !hookPlano) throw new Error("audio-019: faltan c02-hook, c03-dron o c07-umbral");

  const p: [number, number][] = [
    // 1 f de fundido: el colchón de 28 ms que trae `INICIO_MUSICA` antes del golpe, y nada más.
    [0, 0],
    [1, ALTO],
    // HOOK: el golpe del corte (f92) suena a su nivel; entre él y la primera palabra (f95) baja; la voz nace con la música ya abajo.
    [hookPlano.en, ALTO],
    [hook.en, BAJO],
    [hook.fin, BAJO],
    // ...y sube en 12 f hasta el golpe de entrada del dron (f209).
    [Math.min(hook.fin + RAMPA, dron.en), ALTO],
    // MITAD: baja los 12 f anteriores a su primera palabra y sube hasta el golpe de la alcoba (f703), a 9 f de su última palabra.
    [mitad.en - RAMPA, ALTO],
    [mitad.en, BAJO],
    [mitad.fin, BAJO],
    [Math.min(mitad.fin + RAMPA, umbral.en), ALTO],
    // CTA: baja 12 f ANTES de su primera palabra (la meseta aún suena: la caída es en el mismo frame en que entra su imagen)...
    [cta.en - RAMPA, ALTO],
  ];
  // ...y sigue la caída: en cada punto, a −31 LUFS bajo su voz o a su nivel solo si ya es más bajo.
  for (const [f, lufs] of CAIDA_LUFS) {
    p.push([f, Math.min(ALTO, gananciaHasta(lufs, MUSICA_BAJO_LA_VOZ))]);
  }
  // Primer punto de la caída: el mismo frame que su primera palabra tiene que estar ya abajo (el de f1040 es la meseta: −22,3 dB).
  // Desde ahí al fin de la toma, el lecho a su nivel (ALTO) bajo su voz, y se apaga en línea recta bajo la tarjeta.
  p.push([FIN_CTA_019, ALTO]);
  p.push([FIN_MUSICA_019, 0]);
  // Las rampas de abajo y de arriba no pueden cruzarse: los puntos tienen que ir en orden.
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica019: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-019/musica-019.wav",
        en: 0,
        dur: FIN_MUSICA_019,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«Flying Into the Sun»: el golpe de apertura en el frame 0, un crescendo de 35 s con un golpe de frase cada 2,5 s en que entra cada plano, y la caída de ≈ 20 dB en 4 s a un lecho suave en el mismo frame en que entra el CTA, que se apaga bajo la tarjeta del cierre; baja ≈ 10 LU bajo la voz de Isabella en el hook, la mitad y el CTA (siguiendo la caída de la canción).",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio019: readonly TramoAudio[] = [...vocesTomas, ...musica019];
