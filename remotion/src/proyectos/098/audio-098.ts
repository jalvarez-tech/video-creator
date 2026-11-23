/**
 * EL AUDIO DEL 098 — las voces de las niñas y la música («Tu Estás Aquí», Samy Galí, piano), por tramos. Sale de
 * `proyectos/098/artefactos/03-timeline.md`. Sin voz en off.
 *
 * LAS VOCES. Cada frase suena con su WAV tal cual (`mas-097/<clip>.wav`) y UNA ganancia que lleva su ventana de voz a
 * −23 LUFS (`VOCES_098`, medido con `limites-voz.py --margen 12` por `proyectos/098/herramientas/medir-voces.mjs`). Ni
 * compresión ni filtro. Las preguntas llegan a −6/−15 LUFS y las respuestas a −25/−30: van en tramos aparte.
 *   · POR QUÉ −23 Y NO −18 (el 097): la puerta de audio no deja subir una toma más de +6 dB («ya no es igualar un nivel,
 *     es fabricarlo»), y la respuesta de VT06 llega a −30. A −23 todas quedan a ≤ 2 dB unas de otras sin pasar de +6;
 *     la sonoridad de entrega la pone el masterizado de la final (`exportar-final.mjs`, −14 LUFS), que sube todo igual.
 *   · Cortes en J y en L: el audio de VT10 empieza 1,1 s antes que su imagen (la pregunta entra sobre las manos) y el
 *     testimonio de VT07 sigue sonando sobre las manos (FT30) hasta «…la verdad de Cristo». La pregunta y el testimonio de
 *     VT07 son UNA toma de imagen y dos tramos de audio: cada frase con su ganancia.
 *
 * LA MÚSICA: UNA SOLA PISTA, ENTERA Y DE CORRIDO, de 26,55 a 86,35 s (pedido del usuario en el 097: la música va entera y
 * siempre de fondo, sin cortes ni silencios). Es el párrafo de la pieza que va de un silencio (−33 dBFS en 26,5 s) a su
 * único respiro (−34 dBFS en 86,3 s, justo antes de la parte llena): empieza y acaba donde la pieza misma respira. Lo único
 * que se toca es su nivel: baja bajo las voces (ventanas medidas, rampas de 8 f), sube sola, y se apaga con un coseno en
 * los últimos 54 f. Partida en trozos CONSECUTIVOS del mismo archivo solo por el límite de valores de volumen de ffmpeg.
 */
import { envolventeBajoVoz, gananciaHasta, volumenDe } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { DURACION_098, FPS_098, PISTA_DESDE } from "./metraje-098";
import { VOCES_098 } from "./voces-098";

export const OBJETIVO_VOZ = -23;
/** El techo de la puerta de audio: +6 dB. */
const TOPE = 2;
const MUSICA = "mas-098/musica-tu-estas-aqui.wav";

const ganancia = (id: string, extraDb = 0): number => {
  const lufs = VOCES_098[id]?.lufs ?? OBJETIVO_VOZ;
  return +(Math.min(TOPE, gananciaHasta(lufs, OBJETIVO_VOZ)) * Math.pow(10, extraDb / 20)).toFixed(4);
};

/** Un tramo de voz: dónde suena en la comp, de qué segundo de su WAV y qué dice. */
const voz = (id: string, src: string, desde: number, en: number, dur: number, entra: number, sale: number, reason: string): TramoAudio => ({
  id,
  src: `mas-097/${src}.wav`,
  desde,
  en,
  dur,
  ganancia: ganancia(id),
  entra,
  sale,
  reason,
});

export const voces098: TramoAudio[] = [
  voz("voz-p02a-vt07", "vt07", 3.8, 139, 48, 2, 4, "«¿Cómo va tu relación con Cristo?» (3,96-5,3 s), con su imagen; acaba en el barrido, antes de que empiece el tramo del testimonio"),
  voz("voz-p02b-vt07", "vt07", 5.633, 194, 374, 3, 6, "El testimonio entero (5,93-17,93 s), en la misma toma que la pregunta (f = 139 + (s − 3,8) × 30) pero con su propia ganancia: llega 19 dB más baja. Sigue en L sobre las manos hasta f568, antes del «Bueno, aquí está…» de 18,9 s"),
  voz("voz-p05a-vt10", "vt10", 2.37, 606, 63, 2, 3, "«¿Qué aprendiste de Dios este año?» (2,41-3,91 s): en J, 34 f antes de su imagen, después del nombre de su compañera, que acaba en 2,2 s"),
  voz("voz-p05b-vt10", "vt10", 4.47, 669, 90, 3, 5, "«Es saber a perdonar a las demás personas.» (4,52-7,37 s); acaba antes del «¡Muchas gracias!» de 7,9 s"),
  voz("voz-p06-vt06", "vt06", 2.7, 756, 53, 3, 3, "«¿Qué es lo más bonito de recibir un regalo?» (2,83-4,36 s); el ritual del micro (0,1-2,1 s) queda fuera"),
  voz("voz-p07-vt06", "vt06", 4.6, 804, 99, 4, 6, "«Saber que la persona me lo dio con mucho cariño y amor.» (4,77-7,6 s); acaba antes del «Muchísimas gracias» de 8,5 s"),
  voz("voz-p10-hz17", "hz17", 0.5, 1124, 117, 3, 3, "«Yo lo que quiero en Navidad es a Cristo en mi vida» (0,7-4,3 s): se corta en el silencio de 4,3-4,7 s, antes de «y también quiero una Biblia…»"),
];

/**
 * Dónde HABLAN de verdad: la ventana medida (`VOCES_098`, f0-f1) con 4 f de aire, dentro del tramo. Con el tramo entero
 * la música se quedaría abajo en silencios que no son de nadie.
 */
const hablan = voces098.map((t) => {
  const v = VOCES_098[t.id];
  if (!v || v.f0 === null || v.f1 === null) return { en: t.en, dur: t.dur };
  const a = Math.max(t.en, v.f0 - 4);
  const b = Math.min(t.en + t.dur, v.f1 + 4);
  return b > a ? { en: a, dur: b - a } : { en: t.en, dur: t.dur };
});

/**
 * Niveles de la música. El tramo mide −18,1 LUFS tal cual: sola, ×0,48 (≈ −24,5, un poco por debajo de las voces: es una
 * pieza íntima y la música lleva los silencios); bajo las voces, ×0,18 (≈ −33, 10 LU por debajo de −23).
 */
const ALTO = 0.48;
const BAJO = 0.18;
/** El fundido final: un coseno de 54 f (1,8 s), sobre una pieza que ya se apaga sola en su respiro. */
const FUNDIDO_FINAL = 54;
const coseno: [number, number][] = Array.from({ length: 10 }, (_, k) => [
  DURACION_098 - FUNDIDO_FINAL + Math.round((k * FUNDIDO_FINAL) / 9),
  +(0.5 * (1 + Math.cos((Math.PI * k) / 9))).toFixed(4),
]);

const nivelEn = (pts: readonly (readonly [number, number])[], f: number): number => {
  if (!pts.length) return 1;
  if (f <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++) {
    if (f <= pts[i][0]) {
      const [f0, v0] = pts[i - 1];
      const [f1, v1] = pts[i];
      return v0 + ((v1 - v0) * (f - f0)) / (f1 - f0);
    }
  }
  return pts[pts.length - 1][1];
};

/** La envolvente entera: la de bajo voz multiplicada por el coseno del final. */
const ENVOLVENTE: [number, number][] = (() => {
  const base = envolventeBajoVoz(hablan, { alto: ALTO, bajo: BAJO, rampa: 8, duracion: DURACION_098 });
  const frames = new Set<number>([0, DURACION_098]);
  for (const [f] of base) frames.add(f);
  for (const [f] of coseno) frames.add(f);
  return [...frames]
    .filter((f) => f >= 0 && f <= DURACION_098)
    .sort((x, y) => x - y)
    .map((f) => [f, +(nivelEn(base, f) * nivelEn(coseno, f)).toFixed(4)] as [number, number]);
})();

/**
 * Cuántos valores distintos de volumen admite un tramo: Remotion pasa el volumen a ffmpeg con un `if` anidado por valor
 * (a 3 decimales) y ffmpeg revienta hacia los 100 (memoria `remotion-volumen-limite-ffmpeg`).
 */
const MAX_VALORES = 60;

/**
 * UNA pista, partida en tramos CONSECUTIVOS de la misma fuente: cada trozo empieza en la muestra exacta en que acaba el
 * anterior (`desde` = PISTA_DESDE + frame/30), así que suena de corrido, como una sola. Es el `trocea` del 097.
 */
const trocea = (puntos: [number, number][], fin: number): TramoAudio[] => {
  const entero: TramoAudio = { id: "tu-estas-aqui", src: MUSICA, en: 0, dur: fin, desde: PISTA_DESDE, ganancia: puntos, reason: "" };
  const v = (f: number): number => volumenDe(entero, f);
  const redondea = (x: number): number => Math.round(x * 1000) / 1000;
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
    return {
      id: `tu-estas-aqui-${i + 1}`,
      src: MUSICA,
      en: a,
      dur: b - a,
      desde: +(PISTA_DESDE + a / FPS_098).toFixed(6),
      ganancia: [[a, +v(a).toFixed(4)], ...interior, [b, +v(b).toFixed(4)]] as [number, number][],
      entra: i === 0 ? 2 : undefined,
      reason:
        i === 0
          ? "«Tu Estás Aquí» de corrido desde 26,55 s (su primera nota cae en f2): el montaje se corta en sus golpes. Partida en trozos consecutivos de la misma fuente solo por el límite de valores de volumen de ffmpeg"
          : `«Tu Estás Aquí», trozo ${i + 1} de ${cortes.length - 1}: sigue en la misma muestra en que acabó el anterior (f${a})`,
    };
  });
};

export const musica098: TramoAudio[] = trocea(ENVOLVENTE, DURACION_098);

export const audio098: TramoAudio[] = [...voces098, ...musica098];
