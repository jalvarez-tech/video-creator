/**
 * EL SONIDO DEL 051 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son tres cosas, y las tres pasan por `<PistaAudio>`:
 *
 *   voces051    la voz de Isabella en el hook (HK05), derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, desclic de 3 f cuando entra a corte, y UNA ganancia por plano hasta `OBJETIVO_LUFS`
 *               (la de la voz TRATADA: ver `metraje-051.ts`). El hook son DOS planos del mismo clip («Deseas» | «arrendar amoblado en Medellín? Ven, te muestro»).
 *   off051      la LOCUCIÓN EN OFF: seis frases que cubren todo el recorrido y el CTA (el original las tiene de 4,8 a 63,9 s). Un tramo por archivo (`off-voz.wav`), con las frases dentro; `FRASES_OFF` dice dónde habla cada una.
 *   musica051   «Einaudi Fly», con una envolvente que BAJA mientras habla alguien y sube en los huecos de la locución. La calcula `envolvente()` desde dónde hay voz, así que mover un plano o una frase la mueve.
 *
 * ⚠️ POR CONFIRMAR: LA LOCUCIÓN NO EXISTE COMO AUDIO (`proyectos/044/reparto-051-053.md` §3: solo está mezclada con la música vieja dentro de los MP4 editados, y eso no vale). Lo que suena hoy en `off.wav` es una VOZ GUÍA
 * de macOS (`herramientas/voz-guia.py`, gratis y local) colocada en los segundos en que el original dice cada frase, para montar y enseñar la prueba. NO ES LA VOZ FINAL: la sustituye el WAV que entregue el usuario o la voz clonada de
 * Isabella generada con ElevenLabs (de pago: se confirma antes). `VOZ_GUIA = true` hace fallar la puerta con `--final`; al sustituirla se rehacen `FRASES_OFF`, los subtítulos (`o01…`) y, si cambia el ritmo, `P` de `metraje-051.ts`.
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente):
 *   voz de Isabella y locución   −15 (tratadas: −15,0 en su ventana de voz)
 *   música SOLA                   −15 en los huecos de la locución: la canción cambia de −15 a −10,5 LUFS a lo largo de los 66 s que se usan, y `ALTO` le pone la ganancia que la deja a −15 en cada tramo (`alto()`), sin pasar de un pico de −2,5 dBFS
 *   música BAJO LA VOZ            ≈ −31: 16 LU por debajo de ella (ALTO × 0,16 = −16 dB)
 * La canción no se normaliza (un loudnorm le cambiaría la dinámica): lo que cambia con el tiempo es la ganancia. Bajo la voz se mide que quede ≥ 9 LU por debajo, y el oído decide si compite.
 *
 * LA MÚSICA ENTRA YA BAJO LA VOZ (el hook abre la pieza): suena desde el f0, sube del silencio en 3 f y se queda baja mientras hay voz. La locución es casi continua (cinco huecos: 1,1 · 5,0 · 2,0 · 2,0 s y el del cierre), así que
 * la música vive sobre todo en el hueco de los 34,6-39,6 s (la alcoba → el bar → la sala: el momento más alto de la canción, el 230-235 s) y bajo la tarjeta.
 *
 * LAS RAMPAS DE LA MÚSICA (la curva debe ser ANTES de que hable, ya regla del canal): cada voz tiene una BAJADA de coseno de 10 f que ACABA en su primera palabra y una SUBIDA de coseno de 24 f desde la última. Si dos voces están tan juntas
 * que no caben las dos curvas, se unen (un bombeo se oye más que la música).
 *
 * EL FINAL. «Einaudi Fly» SÍ tiene final natural: cae de −14 a −30 LUFS entre el 261,0 y el 265 s. `INICIO_MUSICA` está elegido para que esa caída empiece donde acaba la voz de la locución y la imagen de Isabella (f1918, 63,9 s): la
 * música sube a su nivel «solo» en cuanto calla la voz, cae sola bajo la tarjeta y se lleva a cero en línea recta 2 f antes del final de la pieza.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { DURACION_051, FIN_MUSICA_051, FPS_051, OBJETIVO_LUFS, metraje051 } from "./metraje-051";

/** La voz de Isabella en el hook (dos planos de HK05), derivada del plan de planos. */
export const voces051: readonly TramoAudio[] = vocesDeCortes(metraje051, { fps: FPS_051, objetivoLufs: OBJETIVO_LUFS });

/** Un tramo de voz en off: un `TramoAudio` que además sabe dónde se habla en su fuente. */
export interface TramoOff extends TramoAudio {
  /** Segundos de la FUENTE en que empieza y acaba de hablar (la primera y la última frase). */
  voz: { s0: number; s1: number };
}

/**
 * ¿Es una VOZ GUÍA (macOS `say`) y no la locución de verdad? Mientras lo sea, la puerta con `--final` falla. Se pone a `false` al sustituir `off.wav` por la voz entregada o generada.
 */
export const VOZ_GUIA = true;

/**
 * DÓNDE HABLA CADA FRASE de la locución, en segundos del WAV (`off.wav` = su tratado `off-voz.wav`: mismo tiempo). Con la voz guía son los segundos del original (4,8-14,2 · 15,2-22,7 · 22,7-34,6 · 39,6-50,3 · 52,4-57,4 · 59,5-63,9 s) ajustados
 * a lo que dura cada frase dicha por la guía (`voz-guia.py`); con la voz de verdad salen de `limites-voz.py` (el perfil de energía) y de `transcribir.mjs --palabras`.
 */
export const FRASES_OFF: readonly (readonly [number, number])[] = [
  [4.8, 14.08],
  [15.2, 22.29],
  [22.7, 35.49],
  [39.6, 49.21],
  [52.4, 57.53],
  [59.5, 63.4],
];

/** Sonoridad medida de la locución TRATADA (LUFS): `normalizar.mjs` la deja a −15,0. */
const LUFS_OFF = -15.0;

/** El tramo de la locución: empieza 2 f antes de su primera palabra y acaba 10 f tras la última (el fundido de salida). El WAV y la composición comparten tiempo (`desde` = `en`/fps). */
const OFF_EN = Math.round(FRASES_OFF[0][0] * FPS_051) - 6;
const OFF_FIN = Math.round(FRASES_OFF[FRASES_OFF.length - 1][1] * FPS_051) + 12;

export const off051: readonly TramoOff[] = [
  {
    id: "off-locucion",
    src: "recorrido-051/off-voz.wav",
    voz: { s0: FRASES_OFF[0][0], s1: FRASES_OFF[FRASES_OFF.length - 1][1] },
    en: OFF_EN,
    dur: OFF_FIN - OFF_EN,
    desde: OFF_EN / FPS_051,
    ganancia: gananciaHasta(LUFS_OFF, OBJETIVO_LUFS),
    entra: 3,
    sale: 8,
    reason:
      "La locución en off del original: seis frases que describen lo que se ve (el apartamento, el jacuzzi privado, la unidad) y acaban en la invitación sobre la imagen de Isabella. Es la voz que lleva el recorrido.",
  },
];

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): [number, number] => {
  const c = metraje051.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-051: ${id} no existe o no trae voz`);
  return [frameDeFuente(c.en, c.desde, c.voz.s0, FPS_051), frameDeFuente(c.en, c.desde, c.voz.s1, FPS_051)];
};

/** Todo lo hablado, en frames de la comp [primera palabra, última palabra], por orden: el hook (dos planos) y cada frase de la locución. Es contra lo que baja la música. */
export const HABLADO: readonly (readonly [number, number])[] = [
  ventanaDe("c01-hook-deseas"),
  ventanaDe("c02-hook-arrendar"),
  ...FRASES_OFF.map(([s0, s1]) => [Math.round(s0 * FPS_051), Math.round(s1 * FPS_051)] as [number, number]),
];

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la biblioteca de Luxur y no se ha verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/**
 * DÓNDE EMPIEZA A SONAR LA CANCIÓN (segundos de `musica-051.wav`): el 197,1 s, redondeado a un frame (5913/30) para que `trimBefore` no lo mueva. La caída natural de «Einaudi Fly» empieza a los 261,0 s = el f1918 (63,9 s), donde
 * acaba la imagen de Isabella y empieza la tarjeta. La entrada no cae en un golpe (suena bajo el hook y sube del silencio en 3 f).
 */
export const INICIO_MUSICA = 5913 / FPS_051;
/** El instante de la canción (s) en el frame `f` de la composición, con los 42 ms que el audio del render llega tarde. */
const segundoDeCancion = (f: number): number => INICIO_MUSICA + f / FPS_051 - 0.042;

/**
 * La sonoridad de «Einaudi Fly» por tramos de 5 s (ebur128 sobre la fuente, `medir-pista.py`; `musica/einaudi-150-281.png`) y su pico real (dBFS): desde el 195 s. La caída del 260-265 s (−17,9 de media) se toma como −14,0: lo que
 * cae es el final, y bajo la voz la ganancia ya es la de −14.
 */
const CANCION: readonly (readonly [number, number, number])[] = [
  // [desde (s), LUFS, pico dBFS]
  [195, -15.0, -4.2],
  [200, -14.8, -4.1],
  [205, -14.1, -3.4],
  [210, -12.8, -1.6],
  [215, -12.9, -1.8],
  [220, -12.1, -1.9],
  [225, -13.7, -1.7],
  [230, -10.5, -0.6],
  [235, -13.0, -2.6],
  [240, -14.1, -4.1],
  [245, -14.2, -4.2],
  [250, -13.9, -3.2],
  [255, -14.0, -3.8],
  [260, -14.0, -4.9],
];
const OBJETIVO_MUSICA = -15;
const TECHO_PICO = -2.5;

/** La ganancia lineal de la música SOLA en el frame `f`: la que la deja a −15 LUFS con la sonoridad de esa parte de la canción, sin pasar de un pico de −2,5 dBFS. */
export const alto = (f: number): number => {
  const s = segundoDeCancion(f);
  const fila = [...CANCION].reverse().find(([d]) => s >= d) ?? CANCION[0];
  return Math.min(gananciaHasta(fila[1], OBJETIVO_MUSICA), Math.pow(10, (TECHO_PICO - fila[2]) / 20));
};
/** Mientras habla alguien: −16 dB más (≈ 16 LU bajo la voz, medido). */
export const bajo = (f: number): number => alto(f) * 0.16;

/** La curva de bajada tiene que acabar ANTES de la primera palabra; la de subida empieza en la última. */
const FADE_OUT = 10;
const FADE_IN = 24;
/** Frames que tarda la música en volver a su nivel «solo» tras la última palabra de la locución: antes de que empiece la caída de la canción. */
const SUBIDA_FINAL = 14;
/** Cada cuántos frames se repite la ganancia bajo una voz larga, para que siga la sonoridad de la canción (que cambia de un tramo a otro). */
const PASO = 75;

/** Un fundido con curva suave (coseno) de `de` a `a` en `n` frames desde `f0`, en 5 puntos. Las ganancias son funciones del frame: `de(f0)` y `a(f0 + n)`. */
const fundido = (f0: number, n: number, de: (f: number) => number, a: (f: number) => number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => {
    const f = Math.round(f0 + u * n);
    const w = (1 - Math.cos(Math.PI * u)) / 2;
    return [f, de(f) + (a(f) - de(f)) * w] as [number, number];
  });

/** Las voces con huecos de menos de FADE_OUT + FADE_IN entre sí, unidas en una sola bajada. */
const grupos = (): [number, number][] => {
  const g: [number, number][] = [];
  for (const [ini, fin] of [...HABLADO].sort((x, y) => x[0] - y[0])) {
    const ultimo = g[g.length - 1];
    if (ultimo && ini - FADE_OUT < ultimo[1] + FADE_IN) ultimo[1] = Math.max(ultimo[1], fin);
    else g.push([ini, fin]);
  }
  return g;
};

/** La envolvente: la entrada bajo el hook, la bajada y la subida de cada grupo de voz, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const p: [number, number][] = [
    // ENTRADA: la canción suena DESDE EL PRINCIPIO, ya baja bajo la voz del hook. 3 f de subida del silencio para no meter un clic.
    [0, 0],
    [3, bajo(3)],
  ];
  const gs = grupos();
  gs.forEach(([ini, fin], i) => {
    const ultimo = i === gs.length - 1;
    // BAJADA (que acaba en la primera palabra); en el primer grupo no hay: la música ya entra abajo.
    if (i > 0) p.push(...fundido(ini - FADE_OUT, FADE_OUT, alto, bajo));
    // Bajo una voz larga, la ganancia SIGUE a la canción (cada PASO frames).
    for (let f = Math.ceil((ini + 1) / PASO) * PASO; f < fin - 10; f += PASO) if (f > ini + 3) p.push([f, bajo(f)]);
    p.push([fin, bajo(fin)]);
    // SUBIDA: 24 f, o 14 tras la última palabra de la locución.
    const n = ultimo ? SUBIDA_FINAL : FADE_IN;
    p.push(...fundido(fin, n, bajo, alto));
  });
  // …y suena a su nivel «solo» hasta que acaba la imagen de Isabella; se apaga en línea recta bajo la tarjeta del cierre.
  const finCta = DURACION_051 - 60;
  p.push([finCta, alto(finCta)], [FIN_MUSICA_051, 0]);
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica051: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-051/musica-051.wav",
        en: 0,
        dur: FIN_MUSICA_051,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«Einaudi Fly»: ya suena baja bajo la voz del hook (desde el f0), baja ≈ 16 dB bajo la voz del hook y de cada frase de la locución, sube en sus huecos (con el momento más alto de la canción en el de los 34,6-39,6 s) y su caída natural cae bajo la tarjeta del cierre.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio051: readonly TramoAudio[] = [...voces051, ...off051, ...musica051];
