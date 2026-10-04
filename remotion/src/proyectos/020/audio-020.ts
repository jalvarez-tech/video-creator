/**
 * EL SONIDO DEL 020 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos
 * pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK03, MD14 y CT06, derivada de los cortes
 *                que traen `audio` (`vocesDeCortes`): mismo arranque que su
 *                imagen, cruce de 6 f cuando disuelve, desclic de 3 f cuando sale a corte,
 *                y UNA ganancia por toma hasta `OBJETIVO_LUFS`. La primera toma sale sin
 *                voz: ella no habla hasta que su imagen es opaca.
 *   musica       «Sax for the Last Customer», con una envolvente que BAJA mientras habla Isabella
 *                y sube en los recorridos y en el acorde final. No es la de `envolventeBajoVoz`: aquí
 *                el golpe en que acaba cada disolvencia tiene que sonar entero y la voz nace 2-3 f después.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente):
 *   voz de Isabella      −21 (sus tomas miden −24,2 · −18,5 · −16,0)
 *   música SOLA          −15: arriba, en los recorridos y en el acorde final
 *   música BAJO LA VOZ   −31: ≈ 10 LU por debajo de ella (ALTO × 0,16 = −16 dB)
 * La canción es una pista plana de jazz: suena a −13,9 LUFS de principio a fin (137,6-177 s), sin crescendo ni lecho, así que una
 * sola ganancia (nunca un loudnorm, que le cambiaría la dinámica) la lleva a −15 y la música sola es plana: −15 en todos los
 * recorridos. Es una pista densa (saxofón continuo): bajo la voz se mide que quede ≥ 9 LU por debajo, y el oído decide si compite.
 *
 * LAS RAMPAS DE LA MÚSICA bajo la voz:
 *   · Cada toma de Isabella entra con una disolvencia que ACABA en un golpe de la canción (f76, f565, f1089) y su primera palabra
 *     suena 2-3 f después (f79, f567, f1092: `desde` deja ese aire a propósito). La música está a su nivel «solo» hasta el golpe y baja
 *     en esos 2-3 f: el golpe suena entero y la voz nace con la música ya abajo.
 *   · Al acabar la voz, la música vuelve arriba en 12 f (o los que queden hasta el golpe del plano siguiente: el hook sale a corte en
 *     el f242 y la mitad, con una disolvencia, en el f738).
 *
 * EL CTA Y LA RESOLUCIÓN. A diferencia del 018 y el 019, aquí no hay caída a un lecho suave: la canción suena a −13,9 hasta su
 * acorde final (176,986 s, f1183) y acaba en seco. La voz del CTA acaba en el f1177 y la música sube del nivel bajo al «solo» en esos 5 f, de modo
 * que el acorde suena entero sobre la imagen que funde a negro; el resto del acorde y su cola (2 s) se apagan solos, y la envolvente la lleva a
 * cero en el f1251 (2 f antes del final), bajo la tarjeta.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_020, FPS_020, INICIO_MUSICA, OBJETIVO_LUFS, metraje020 } from "./metraje-020";

/** La voz de las tres tomas a cámara (HK03, MD14 y CT06), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje020, { fps: FPS_020, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre y la música tiene que estar a su nivel «solo» (el acorde y su cola). */
const CTA = metraje020.find((c) => c.id === "c10-cta");
if (!CTA) throw new Error("audio-020: falta c10-cta en metraje-020.ts");
export const FIN_CTA_020 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number } => {
  const c = metraje020.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-020: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_020);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_020);
  return { en: ini, dur: fin - ini, fin };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma
 * encima. La canción es una pista de la biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Sax for the Last Customer» entre el 137,6 y el 177,0 s (ebur128): lo que suena en los recorridos. */
export const LUFS_MESETA = -13.9;
/** La música SOLA. */
const OBJETIVO_MUSICA = -15;
/** Ganancia lineal de la música sola: −1,1 dB sobre el archivo. */
const ALTO = gananciaHasta(LUFS_MESETA, OBJETIVO_MUSICA);
/** Mientras habla Isabella: −16 dB más (≈ 10 LU bajo su voz). */
const BAJO = ALTO * 0.16;
/** Frames que tarda la música en subir tras la última palabra de la voz (hasta el golpe del plano siguiente, si llega antes). */
const RAMPA = 12;
/** Frames entre la última palabra del CTA y el acorde final, que la música tiene que alcanzar a su nivel «solo». */
const SUBIDA_ACORDE = 5;

/** La envolvente: el hook, la mitad y el CTA con su rampa, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c02-hook");
  const mitad = ventanaDe("c06-mitad");
  const cta = ventanaDe("c10-cta");
  const hookPlano = metraje020.find((c) => c.id === "c02-hook");
  const mitadPlano = metraje020.find((c) => c.id === "c06-mitad");
  const ctaPlano = metraje020.find((c) => c.id === "c10-cta");
  const pasillo = metraje020.find((c) => c.id === "c03-pasillo");
  const alcoba = metraje020.find((c) => c.id === "c07-alcoba");
  if (!hookPlano || !mitadPlano || !ctaPlano || !pasillo || !alcoba) throw new Error("audio-020: faltan planos en metraje-020.ts");

  const p: [number, number][] = [
    // 1 f de fundido: el colchón de 45 ms que trae `INICIO_MUSICA` antes del golpe, y nada más.
    [0, 0],
    [1, ALTO],
    // HOOK: la disolvencia acaba en el golpe del f76 (a su nivel «solo»); entre él y la primera palabra (f79) la música baja; la voz nace con la música ya abajo.
    [hookPlano.en, ALTO],
    [hook.en, BAJO],
    [hook.fin, BAJO],
    // ...y sube en 12 f hasta el golpe en que el hook sale a corte (f242).
    [Math.min(hook.fin + RAMPA, pasillo.en), ALTO],
    // MITAD: lo mismo: el golpe de la disolvencia (f565) suena entero y la voz (f567) nace con la música abajo; vuelve a subir hasta el golpe de la alcoba (f738).
    [mitadPlano.en, ALTO],
    [mitad.en, BAJO],
    [mitad.fin, BAJO],
    [Math.min(mitad.fin + RAMPA, alcoba.en), ALTO],
    // CTA: igual (golpe del f1089, voz en el f1092)...
    [ctaPlano.en, ALTO],
    [cta.en, BAJO],
    [cta.fin, BAJO],
    // ...y al acabar la voz (f1177) la música sube a su nivel «solo» antes del acorde final (f1183): el acorde suena entero.
    [cta.fin + SUBIDA_ACORDE, ALTO],
    // El acorde y su cola suenan a su nivel hasta que acaba la toma y se apagan en línea recta bajo la tarjeta.
    [FIN_CTA_020, ALTO],
    [FIN_MUSICA_020, 0],
  ];
  // Las rampas de abajo y de arriba no pueden cruzarse: los puntos tienen que ir en orden.
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica020: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-020/musica-020.wav",
        en: 0,
        dur: FIN_MUSICA_020,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«Sax for the Last Customer» (jazz): el golpe de apertura en el frame 0, golpes de nota cada 0,35-0,55 s en que entra cada plano, y su acorde final seco en el frame 1183, justo después de la última palabra del CTA, con su cola apagándose bajo la tarjeta del cierre; baja ≈ 10 LU bajo la voz de Isabella en el hook, la mitad y el CTA.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio020: readonly TramoAudio[] = [...vocesTomas, ...musica020];
