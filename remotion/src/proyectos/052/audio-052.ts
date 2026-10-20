/**
 * EL SONIDO DEL 052 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son tres cosas, y las tres pasan por `<PistaAudio>`:
 *
 *   voces052   la voz de Isabella en HK04 (el hook) y CT05 (el CTA), derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, desclic de 3 f cuando entra a corte, y UNA ganancia por
 *              toma hasta `OBJETIVO_LUFS` (la de la voz TRATADA: ver `metraje-052.ts`).
 *   off052     LA LOCUCIÓN en off de los 67 s del recorrido. NO EXISTE como archivo: el original (`02.mp4`) la lleva mezclada con la música vieja y sacarla de ahí no vale (el encargo es cambiar la música). Mientras el
 *              usuario no decide cómo se consigue (la entrega, o se genera con la voz clonada de Isabella: `proyectos/044/reparto-051-053.md` §3), `OFF_PENDIENTE = true`: el tramo no existe, la música sigue sola
 *              (sin bajar) por debajo de la locución prevista y la puerta lo dice y NO deja exportar (`--final`).
 *   musica052  «Here For You (Piano)», con una envolvente que BAJA mientras habla alguien (con curva, que acaba ANTES de la primera palabra) y sube en las pausas y bajo la tarjeta.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente):
 *   voz de Isabella y locución    −15 (tratadas: −15,0 en su ventana de voz)
 *   música SOLA                   −15 (la canción mide −15,6 de media en los 81 s que se usan: −15 hasta los 70 s y −17 después)
 *   música BAJO LA VOZ            ≈ −28: ≈ 13 LU por debajo de ella (ALTO × 0,22 = −13 dB). Con la locución casi continua (67 s) el lecho tiene que oírse: con el −16 dB de siempre sale a −31 LUFS. Se mide que quede ≥ 9 LU
 *                                 por debajo y el oído decide si compite.
 * La canción es un piano plano y no se normaliza (un loudnorm le cambiaría la dinámica): una sola ganancia la lleva a −15.
 *
 * LAS RAMPAS (la curva debe ser ANTES de que hable, ya regla del canal): bajada de coseno de 10 f que ACABA en la primera palabra, subida de coseno de 24 f desde la última (o los que quepan). Entre el hook y la locución
 * hay 31 f de aire: no caben las dos curvas, y con la locución puesta la música se queda baja de principio a fin (se UNEN los grupos).
 *
 * EL CTA Y LA RESOLUCIÓN. La canción no resuelve sola (piano sin caída): al acabar la voz del CTA la música sube a su nivel «solo» en 14 f, suena así hasta que acaba la toma y se lleva a cero en línea recta bajo la
 * tarjeta, 2 f antes del final de la pieza.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_052, FPS_052, INICIO_MUSICA, OBJETIVO_LUFS, OFF_EN0, OFF_S0, ancla, metraje052 } from "./metraje-052";

/** La voz de las dos tomas a cámara (HK04 y CT05), derivada del plan de planos. */
export const voces052: readonly TramoAudio[] = vocesDeCortes(metraje052, { fps: FPS_052, objetivoLufs: OBJETIVO_LUFS });

const plano = (id: string) => {
  const c = metraje052.find((x) => x.id === id);
  if (!c) throw new Error(`audio-052: falta ${id} en metraje-052.ts`);
  return c;
};

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number } => {
  const c = plano(id);
  if (!c.voz) throw new Error(`audio-052: ${id} no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_052);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_052);
  return { en: ini, dur: fin - ini, fin };
};

/* ── La locución ───────────────────────────────────────────────────────────── */

/**
 * ¿La locución todavía NO existe? Con `true` no hay tramo de off y los subtítulos y los planos van contra el reloj del propio `02.mp4` (`metraje-052.ts`). Desde el 2026-10-20 SÍ existe: la generó ElevenLabs
 * (voz de stock «Bella», `eleven_multilingual_v2`, preset `narracion`, 1.101 caracteres: el usuario descartó clonar a Isabella —no hay clon suyo en la cuenta— y pidió una voz de stock femenina) y se montó con
 * `proyectos/052/herramientas/montar-locucion.py` en `original/off.wav`. La puerta con `--final` falla mientras sea `true`.
 */
export const OFF_PENDIENTE = false;

/**
 * Lo que se midió sobre la locución (`montar-locucion.py` da la primera y la última sílaba por energía; la ganancia sale de `probar-voz.py` con el compresor de 1 ms de ataque de `normalizar.mjs`): dónde habla en su
 * archivo (de 0,04 a 71,08 s), qué sonoridad tiene su voz TRATADA en esa ventana (`off-voz.wav`: −15,1 LUFS, pico −1,8 dBTP) y cuánto aire se deja detrás.
 */
const LOCUCION = { s0: OFF_S0, s1: 71.08, lufs: -15.1, aireDespues: 12 } as const;

/** Un tramo de voz en off: un `TramoAudio` que además sabe dónde se habla en su fuente. */
export interface TramoOff extends TramoAudio {
  /** Segundos de la FUENTE en que empieza y acaba de hablar. */
  voz: { s0: number; s1: number };
}

/** La ventana de la locución en frames de la comp: de su primera a su última palabra. */
export const VENTANA_OFF = { ini: OFF_EN0, fin: ancla(LOCUCION.s1) } as const;

/** El frame de la comp en que suena el segundo 0 del archivo de la locución (la primera palabra empieza en el 0,04). */
const EN_OFF = OFF_EN0 - Math.round(OFF_S0 * FPS_052);

export const off052: readonly TramoOff[] = OFF_PENDIENTE
  ? []
  : [
      {
        id: "off",
        src: "recorrido-052/off-voz.wav",
        voz: { s0: LOCUCION.s0, s1: LOCUCION.s1 },
        en: EN_OFF,
        dur: VENTANA_OFF.fin - EN_OFF + LOCUCION.aireDespues,
        desde: 0,
        ganancia: gananciaHasta(LOCUCION.lufs, OBJETIVO_LUFS),
        sale: 8,
        reason: "La locución del original (`02.mp4`), con una voz de stock femenina de ElevenLabs: cuenta qué se paga cuando se arrienda amueblado y es lo que manda los cambios de plano.",
      },
    ];

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Here For You» en los 81 s que se usan (desde su segundo 20,733; ebur128: −15,6 LUFS, de −15 hasta los 70 s y −17 hasta el final): lo que suena en los recorridos. */
export const LUFS_MESETA = -15.6;
/** La música SOLA. */
const OBJETIVO_MUSICA = -15;
/** Ganancia lineal de la música sola. */
const ALTO = gananciaHasta(LUFS_MESETA, OBJETIVO_MUSICA);
/** Mientras habla alguien: −13 dB (≈ 13 LU bajo la voz, medido). */
const BAJO = ALTO * 0.22;
/** Frames de la bajada (acaba en la primera palabra) y de la subida (empieza en la última). */
const FADE_OUT = 10;
const FADE_IN = 24;
/** Frames que tarda la música en volver a su nivel «solo» tras la última palabra del CTA. */
const SUBIDA_CTA = 14;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/**
 * La envolvente: la música ENTRA ya baja bajo la voz del hook (suena desde el f0, 3 f de entrada para no meter un clic), baja con curva en cada voz y sube con curva tras ella; sin la locución (`OFF_PENDIENTE`) no hay
 * voz entre el hook y el CTA y la música sube hasta su nivel «solo» tras el hook (el golpe del piano cae en el f150) y se queda ahí; con la locución, el hook y ella se unen (31 f de aire no dan para dos curvas)
 * y la música se queda baja hasta que acaba la última palabra.
 */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c01-hook");
  const cta = ventanaDe("c13-cta");
  const ctaPlano = plano("c13-cta");
  const finToma = ctaPlano.en + ctaPlano.dur;
  const voces: [number, number][] = [[hook.en, hook.fin]];
  if (!OFF_PENDIENTE) voces.push([VENTANA_OFF.ini, VENTANA_OFF.fin]);
  voces.push([cta.en, cta.fin]);

  // Une las voces cuyas curvas no caben entre sí.
  const grupos: [number, number][] = [];
  for (const [ini, fin] of voces) {
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ini - FADE_OUT < ultimo[1] + FADE_IN) ultimo[1] = Math.max(ultimo[1], fin);
    else grupos.push([ini, fin]);
  }
  const p: [number, number][] = [[0, 0]];
  grupos.forEach(([ini, fin], i) => {
    if (i === 0) {
      // El hook abre la pieza: ya baja desde el f0.
      p.push([3, BAJO], [fin, BAJO]);
    } else {
      p.push(...fundido(ini - FADE_OUT, FADE_OUT, ALTO, BAJO), [fin, BAJO]);
    }
    const siguiente = grupos[i + 1];
    const subida = i === grupos.length - 1 ? SUBIDA_CTA : Math.min(FADE_IN, siguiente[0] - FADE_OUT - fin - 2);
    p.push(...fundido(fin, subida, BAJO, ALTO));
  });
  // …suena a su nivel hasta que acaba la toma del CTA y se apaga en línea recta bajo la tarjeta.
  p.push([finToma, ALTO], [FIN_MUSICA_052, 0]);
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica052: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-052/musica-052.wav",
        en: 0,
        dur: FIN_MUSICA_052,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«Here For You (Piano)»: piano casi mudo bajo el hook, el golpe del segundo 25,7 de la canción entre el hook y la locución, baja ≈ 13 LU bajo la voz de Isabella y de la locución y se apaga en línea recta bajo la tarjeta del cierre.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio052: readonly TramoAudio[] = [...voces052, ...off052, ...musica052];
