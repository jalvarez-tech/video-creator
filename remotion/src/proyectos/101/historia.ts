/**
 * LAS HISTORIAS VERTICALES DE MAS (101-104) — el molde de datos que comparten y el audio que sale de él.
 *
 * Cuatro clips cortos 9:16 para redes (Fundación MAS · MAS Estrellitas 2026), cada uno con UNA historia dicha por las
 * niñas y sin voz en off. Comparten molde, piezas (`piezas-101.tsx`), cierre en papel y receta de audio; cada uno trae
 * sus datos en `src/proyectos/NNN/historia-NNN.ts`. Plan de la serie: `proyectos/101/artefactos/01-plan.md`.
 *
 * Datos puros (la puerta y los scripts lo cargan con node): nada de JSX aquí.
 *
 * LA GRAMÁTICA DEL TEXTO (02-layout de la serie):
 *   · `arriba`: la PREGUNTA que da contexto (la hace una niña, o MAS en índigo cuando nadie la dijo). En f0 ya está:
 *     es la miniatura y el gancho. Se queda mientras dura su respuesta, para quien llega a mitad.
 *   · `abajo`: TODO lo que dicen, en trozos de dos líneas como mucho (en redes se ve sin sonido), con UNA palabra
 *     acentuada (`*así*`) por trozo como mucho.
 *
 * EL AUDIO. Cada frase con su WAV tal cual y UNA ganancia que lleva su ventana de voz a −23 LUFS (lo medido en
 * `voces-NNN.ts` por `proyectos/101/herramientas/medir-voces.mjs`), con el tope de +6 dB de la puerta de audio (la
 * receta del 098: más arriba ya no se iguala un nivel, se fabrica ruido). La sonoridad de entrega la pone el
 * masterizado (−14 LUFS). La música, UNA pista de corrido, que baja bajo las voces y se apaga con un coseno al final.
 */
import type { Corte } from "../../motor/metraje";
import { envolventeBajoVoz, gananciaHasta, volumenDe } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";

export const FPS_HISTORIAS = 30;
/**
 * Frames que el ÚLTIMO plano sigue corriendo bajo el papel del cierre mientras sube (12 f): si acabase con el papel,
 * en la subida se veía el fondo índigo liso (rev. 1). Solo imagen: su voz acaba antes.
 */
export const COLA_CIERRE = 12;
export const ANCHO = 1080;
export const ALTO = 1920;

/** Un trazo de rotulador sobre una palabra acentuada (el `Marca` de `097/piezas-097.tsx`). */
export type MarcaTexto = { tipo: "subrayado" | "ovalo"; en: number; dur?: number; color?: string };

export interface TiraHistoria {
  id: string;
  en: number;
  sale: number;
  /** Con «» si lo dice una niña; sin comillas y en índigo si es la voz de MAS. Acentos entre asteriscos. */
  texto: string;
  piel?: "papel" | "indigo";
  marcas?: (MarcaTexto | null)[];
  /** Por qué este trozo, aquí (qué palabra lo abre y cuál lo cierra). */
  reason: string;
}

export interface VozHistoria {
  id: string;
  /** El WAV de la voz, dentro de `remotion/public/`. */
  src: string;
  /** Segundo de la fuente en el que empieza el tramo. */
  desde: number;
  en: number;
  dur: number;
  entra?: number;
  sale?: number;
  /** dB que se suman a la ganancia medida (una frase que se tiene que oír por encima de la otra). */
  extraDb?: number;
  reason: string;
}

export interface Historia {
  numero: string;
  composicion: string;
  titulo: string;
  duracion: number;
  /** Frame en el que entra el cierre en papel (lo de después ya no es metraje). */
  cierre: number;
  cortes: Corte[];
  voces: VozHistoria[];
  arriba: TiraHistoria[];
  abajo: TiraHistoria[];
  musica: {
    titulo: string;
    src: string;
    /** Segundo de la pista en el frame 0. */
    desde: number;
    /** LUFS integrados del tramo que suena, medidos tal cual (`ffmpeg ebur128` del tramo `desde`…`desde + duracion`). */
    lufs: number;
    /**
     * Opcional: dB que se suman a la música por PARTES de la canción, como puntos [frame, dB] (lineal entre ellos). Para
     * una canción con un arco grande (la del 100 va de −26 a −10 LUFS): con una sola ganancia, el pleno tapa a las niñas o
     * la ruptura desaparece. Las rampas van DENTRO del golpe que abre cada parte, donde el cambio no se oye.
     */
    partes?: [number, number][];
    reason: string;
  };
}

export type VocesMedidas = Record<string, { s0: number | null; s1: number | null; lufs: number | null; f0: number | null; f1: number | null }>;

/** Las voces, a −23 LUFS, con el techo de la puerta de audio (+6 dB = ×2). */
export const OBJETIVO_VOZ = -23;
const TOPE = 2;
/** La música: sola, a −25 LUFS (un poco por debajo de las voces); bajo una voz, a −34 (11 LU por debajo). */
const MUSICA_SOLA = -25;
const MUSICA_BAJO_VOZ = -34;
const FUNDIDO_FINAL = 45;
/** Remotion pasa el volumen a ffmpeg con un `if` por valor y ffmpeg revienta hacia los 100 (memoria `remotion-volumen-limite-ffmpeg`). */
const MAX_VALORES = 60;

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

export const audioDeHistoria = (h: Historia, medidas: VocesMedidas): TramoAudio[] => {
  const voces: TramoAudio[] = h.voces.map((v) => {
    const lufs = medidas[v.id]?.lufs ?? OBJETIVO_VOZ;
    const g = Math.min(TOPE, gananciaHasta(lufs, OBJETIVO_VOZ)) * Math.pow(10, (v.extraDb ?? 0) / 20);
    // Id propio del tramo de la mezcla: `HISTORIA.voces` (lo que se mide) y el audio (lo que suena) viven en el mismo
    // archivo, y la puerta de audio pide ids únicos en todo él.
    return { id: `mezcla-${v.id}`, src: v.src, desde: v.desde, en: v.en, dur: v.dur, ganancia: +g.toFixed(4), entra: v.entra ?? 2, sale: v.sale ?? 3, reason: v.reason };
  });

  // Dónde HABLAN de verdad (la ventana medida con 4 f de aire), no el tramo entero: si no, la música se queda abajo en
  // silencios que no son de nadie.
  const hablan = h.voces.map((v) => {
    const m = medidas[v.id];
    if (!m || m.f0 === null || m.f1 === null) return { en: v.en, dur: v.dur };
    const a = Math.max(v.en, m.f0 - 4);
    const b = Math.min(v.en + v.dur, m.f1 + 4);
    return b > a ? { en: a, dur: b - a } : { en: v.en, dur: v.dur };
  });
  const alto = +Math.pow(10, (MUSICA_SOLA - h.musica.lufs) / 20).toFixed(4);
  const bajo = +Math.pow(10, (MUSICA_BAJO_VOZ - h.musica.lufs) / 20).toFixed(4);
  const base = envolventeBajoVoz(hablan, { alto, bajo, rampa: 8, duracion: h.duracion });
  const coseno: [number, number][] = Array.from({ length: 10 }, (_, k) => [
    h.duracion - FUNDIDO_FINAL + Math.round((k * FUNDIDO_FINAL) / 9),
    +(0.5 * (1 + Math.cos((Math.PI * k) / 9))).toFixed(4),
  ]);
  const partes: [number, number][] = (h.musica.partes ?? []).map(([f, db]) => [f, Math.pow(10, db / 20)]);
  const frames = new Set<number>([0, h.duracion]);
  for (const [f] of base) frames.add(f);
  for (const [f] of coseno) frames.add(f);
  for (const [f] of partes) frames.add(f);
  const envolvente = [...frames]
    .filter((f) => f >= 0 && f <= h.duracion)
    .sort((x, y) => x - y)
    .map((f) => [f, +(nivelEn(base, f) * nivelEn(coseno, f) * nivelEn(partes, f)).toFixed(4)] as [number, number]);

  // UNA pista, en trozos CONSECUTIVOS de la misma fuente (cada uno empieza en la muestra en que acaba el anterior), solo
  // por el límite de valores de volumen de ffmpeg: suena de corrido, como una sola. Es el `trocea` del 097/098.
  const entera: TramoAudio = { id: "musica", src: h.musica.src, en: 0, dur: h.duracion, desde: h.musica.desde, ganancia: envolvente, reason: "" };
  const vol = (f: number): number => volumenDe(entera, f);
  const r3 = (x: number): number => Math.round(x * 1000) / 1000;
  const cortes = [0];
  let cambios = 0;
  let ultimo = r3(vol(0));
  for (let f = 1; f < h.duracion; f++) {
    const x = r3(vol(f));
    if (x !== ultimo) {
      cambios++;
      ultimo = x;
    }
    if (cambios >= MAX_VALORES) {
      cortes.push(f);
      cambios = 0;
    }
  }
  cortes.push(h.duracion);
  const musica: TramoAudio[] = cortes.slice(0, -1).map((a, i) => {
    const b = cortes[i + 1];
    const interior = envolvente.filter(([f]) => f > a && f < b);
    return {
      id: `musica-${i + 1}`,
      src: h.musica.src,
      en: a,
      dur: b - a,
      desde: +(h.musica.desde + a / FPS_HISTORIAS).toFixed(6),
      ganancia: [[a, +vol(a).toFixed(4)], ...interior, [b, +vol(b).toFixed(4)]] as [number, number][],
      entra: i === 0 ? 2 : undefined,
      reason: i === 0 ? h.musica.reason : `«${h.musica.titulo}», trozo ${i + 1} de ${cortes.length - 1}: sigue en la muestra en que acabó el anterior (f${a})`,
    };
  });
  return [...voces, ...musica];
};
