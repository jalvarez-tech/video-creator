/**
 * EL AUDIO DEL 100 — las voces de las niñas y la música («Lo harás otra vez», Elevation Worship, pista), por tramos.
 * Sin voz en off. Sale de `proyectos/100/artefactos/03-timeline.md` §Música y §Voces.
 *
 * LAS VOCES. Cada plano que habla suena con su WAV tal cual y UNA ganancia que lleva su ventana de voz a −18 LUFS
 * (`VOCES_100`, medido con `limites-voz.py --margen 12`: R29), con tope +18 dB. Ni compresión ni filtro.
 *
 * LA MÚSICA: UNA SOLA PISTA DE CORRIDO (regla del usuario en el 097: «que la pista no se corte»). Suena de f0 a f1800
 * desde el segundo 318,641 de la canción, sin un solo corte ni cruce; es el MONTAJE el que se ordena por sus partes
 * (`metraje-100.ts`). Solo se toca su NIVEL, con tres capas que se multiplican:
 *   1. la PARTE: la canción va masterizada a −10,4 LUFS en el pleno y a −26,6 en la ruptura. Sin tocarla, el pleno
 *      taparía a las niñas; igualada del todo, perdería su arco. Se deja sola a ≈ −27 · −22,5 · −21 · −22 · −24,5 LUFS
 *      (ruptura · subida · pleno · bajada · outro): el arco se oye y nada tapa una voz;
 *   2. las VOCES: bajo una voz hablada ×0,4 (−8 dB) y bajo un grito ×0,65 (−3,7 dB), desde donde HABLAN de verdad
 *      (la ventana medida, no el plano entero);
 *   3. el FINAL: fundido coseno en los últimos 60 f.
 * Partida en trozos CONSECUTIVOS de la misma fuente solo por el límite de valores de volumen de ffmpeg (`trocea`, como
 * en el 097: con más de ~80 valores distintos por tramo, la mezcla de Remotion se rompe).
 */
import { envolventeBajoVoz, gananciaHasta, volumenDe } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { DURACION_100, INICIO_MUSICA, metraje100 } from "./metraje-100";
import { VOCES_100 } from "./voces-100";

const OBJETIVO_VOZ = -18;
/** Ninguna voz sube más de +18 dB: más allá se sube el ruido de la sala, no la niña. */
const TOPE = Math.pow(10, 18 / 20);
const MUSICA = "mas-100/musica-otra-vez.wav";

const ganancia = (id: string, extraDb = 0): number => {
  const lufs = VOCES_100[id]?.lufs ?? -24;
  return Math.min(TOPE, gananciaHasta(lufs, OBJETIVO_VOZ)) * Math.pow(10, extraDb / 20);
};

/**
 * Ajustes por plano. `antes` adelanta el audio a su plano (corte en J; negativo = empieza DESPUÉS que el plano) y
 * `despues` lo deja sonar bajo el plano siguiente (corte en L); `hasta` corta el audio en un segundo de la FUENTE.
 */
export const AJUSTE: Record<string, { db?: number; antes?: number; despues?: number; hasta?: number; entra?: number; sale?: number }> = {
  // HZ20 arranca con el «¡tres!» de quien graba (0,0-0,3 s): el audio empieza en 0,4 s. A los 5,3 s gritan al cruzar la
  // puerta y con la ganancia de esta toma pasaría de 0 dBFS (097, rev. 5): acaba en 4,95. −5 dB: el nivel que el usuario
  // aprobó en el 097 (llevarla entera a −18 pasaría su pico de 0 dBTP).
  "p01-hz20": { antes: -12, entra: 4, hasta: 4.95, sale: 6, db: -5 },
  // «¡Yo quiero un bafle!» empieza en 0,50 s y el plano en 0,45: 3 f de corte en J sobre el silencio de después de «conejito».
  "p05-hz16": { antes: 3, entra: 2 },
  // Las risas de HZ28, un segundo: por debajo de la música, que es el golpe.
  "p06-hz28": { db: -4, sale: 3 },
  // «…y Servicio!» acaba en 2,77 s y el plano en 2,75: 3 f de corte en L bajo HZ19.
  "p08-hz08": { despues: 3, sale: 3 },
  // «¡Dios es bueno!» acaba en 3,2 s y la segunda frase (sin oír: «¿A la lucha?» / «¿Aleluya?») empieza en 3,6: el audio
  // calla en el hueco, a 3,45 s. La imagen sigue hasta 3,72 s, bajo la música llena.
  "p09-hz19": { hasta: 3.45, sale: 4 },
};

const voces: TramoAudio[] = metraje100
  .filter((c) => c.audio)
  .map((c) => {
    const aj = AJUSTE[c.id] ?? {};
    const antes = aj.antes ?? 0;
    const desde = (c.desde ?? 0) - antes / 30;
    return {
      id: `voz-${c.id}`,
      src: c.audio as string,
      en: c.en - antes,
      dur: aj.hasta !== undefined ? Math.round((aj.hasta - desde) * 30) : c.dur + antes + (aj.despues ?? 0),
      desde,
      ganancia: ganancia(c.id, aj.db),
      entra: aj.entra ?? 3,
      sale: aj.sale ?? 4,
      reason: `La voz de ${c.id}, igualada a ${OBJETIVO_VOZ} LUFS`,
    };
  });

/** Los gritos y las risas: sobre ellos la música no se hunde, solo baja un poco (la alegría tiene que sonar llena). */
const GRITOS = new Set(["voz-p06-hz28", "voz-p07-hz10", "voz-p08-hz08", "voz-p09-hz19", "voz-p13-hz32"]);
/** HZ20: `limites-voz.py` da el plano entero por el ruido de la puerta; la frase va de 2,15 a 4,15 s (f62-f126, medido en el 097). */
const VENTANA_A_MANO: Record<string, readonly [number, number]> = { "voz-p01-hz20": [62, 126] };

/** Dónde HABLAN de verdad: la ventana medida (`VOCES_100`) con 4 f de aire, dentro del tramo. */
const ventana = (t: TramoAudio): { en: number; dur: number } => {
  const mano = VENTANA_A_MANO[t.id];
  if (mano) return { en: mano[0], dur: mano[1] - mano[0] };
  const v = VOCES_100[t.id.replace(/^voz-/, "")];
  if (!v || v.f0 === null || v.f1 === null) return { en: t.en, dur: t.dur };
  const a = Math.max(t.en, v.f0 - 4);
  const b = Math.min(t.en + t.dur, v.f1 + 4);
  return b > a ? { en: a, dur: b - a } : { en: t.en, dur: t.dur };
};

/** 1 · la PARTE de la canción: ganancia sola, con rampas cortas DENTRO de los golpes que abren cada parte. */
const PARTES: [number, number][] = [
  [0, 0.95], // ruptura: −26,6 LUFS crudo → ≈ −27
  [262, 0.95],
  [290, 0.45], // subida: −15,7 → ≈ −22,6 (la rampa va dentro del redoble que la abre)
  [530, 0.45],
  [546, 0.3], // pleno: −10,4 → ≈ −20,9
  [1292, 0.3],
  [1312, 0.45], // bajada: −15,4 → ≈ −22,3 (la canción ya cae sola desde el golpe de f1292)
  [1478, 0.45],
  [1500, 0.85], // outro: −23,0 → ≈ −24,4, bajo el papel
];
/** 2 · bajo las voces (×0,4) y bajo los gritos (×0,65). */
const BAJO_VOZ = envolventeBajoVoz(
  voces.filter((t) => !GRITOS.has(t.id)).map(ventana),
  { alto: 1, bajo: 0.4, rampa: 8, duracion: DURACION_100 }
);
const BAJO_GRITO = envolventeBajoVoz(
  voces.filter((t) => GRITOS.has(t.id)).map(ventana),
  { alto: 1, bajo: 0.65, rampa: 6, duracion: DURACION_100 }
);
/** 3 · el final: coseno en los últimos 60 f (la última nota que suena es la de 377,03 s, f1751, y se apaga con él). */
const FUNDIDO_FINAL = 60;

const interpola = (pts: readonly (readonly [number, number])[], f: number, defecto = 1): number => {
  if (!pts.length) return defecto;
  if (f <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++) {
    if (f <= pts[i][0]) {
      const [f0, v0] = pts[i - 1];
      const [f1, v1] = pts[i];
      return f1 === f0 ? v1 : v0 + ((v1 - v0) * (f - f0)) / (f1 - f0);
    }
  }
  return pts[pts.length - 1][1];
};
const fin = (f: number): number => {
  const a = DURACION_100 - FUNDIDO_FINAL;
  if (f <= a) return 1;
  return 0.5 * (1 + Math.cos((Math.PI * Math.min(f - a, FUNDIDO_FINAL)) / FUNDIDO_FINAL));
};
/** El nivel de la música en un frame: el producto de las tres capas. */
export const nivelMusica = (f: number): number => interpola(PARTES, f) * interpola(BAJO_VOZ, f) * interpola(BAJO_GRITO, f) * fin(f);

/** Los puntos de la envolvente: los quiebros de las tres capas y, dentro del coseno, uno cada 3 f. */
const ENVOLVENTE_MUSICA: [number, number][] = (() => {
  const frames = new Set<number>([0, DURACION_100]);
  for (const pts of [PARTES, BAJO_VOZ, BAJO_GRITO]) for (const [f] of pts) if (f > 0 && f < DURACION_100) frames.add(Math.round(f));
  for (let f = DURACION_100 - FUNDIDO_FINAL; f < DURACION_100; f += 3) frames.add(f);
  return [...frames].sort((x, y) => x - y).map((f) => [f, +nivelMusica(f).toFixed(4)] as [number, number]);
})();

/** Valores distintos de volumen que admite un tramo (Remotion los pasa a ffmpeg en un `if` anidado: hacia 100 revienta). */
const MAX_VALORES = 60;

/** UNA pista, partida en tramos CONSECUTIVOS de la misma fuente: cada trozo empieza en la muestra en que acaba el anterior. */
const trocea = (puntos: [number, number][], duracion: number): TramoAudio[] => {
  const entero: TramoAudio = { id: "otra-vez", src: MUSICA, en: 0, dur: duracion, desde: INICIO_MUSICA, ganancia: puntos, reason: "" };
  const v = (f: number): number => volumenDe(entero, f);
  const redondea = (x: number): number => Math.round(x * 1000) / 1000;
  const cortes = [0];
  let cambios = 0;
  let ultimo = redondea(v(0));
  for (let f = 1; f < duracion; f++) {
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
  cortes.push(duracion);
  return cortes.slice(0, -1).map((a, i) => {
    const b = cortes[i + 1];
    const interior = puntos.filter(([f]) => f > a && f < b);
    return {
      id: `otra-vez-${i + 1}`,
      src: MUSICA,
      en: a,
      dur: b - a,
      desde: INICIO_MUSICA + a / 30,
      ganancia: [[a, v(a)], ...interior, [b, v(b)]] as [number, number][],
      entra: i === 0 ? 3 : undefined,
      reason:
        i === 0
          ? "«Lo harás otra vez» de corrido desde 318,641 s (su golpe de 318,774 s cae en el f4): el montaje se ordena por sus partes"
          : `«Lo harás otra vez», trozo ${i + 1} de ${cortes.length - 1}: sigue en la misma muestra en que acabó el anterior (f${a})`,
    };
  });
};

export const musica100: TramoAudio[] = trocea(ENVOLVENTE_MUSICA, DURACION_100);
export const voces100: TramoAudio[] = voces;
export const audio100: TramoAudio[] = [...voces, ...musica100];
