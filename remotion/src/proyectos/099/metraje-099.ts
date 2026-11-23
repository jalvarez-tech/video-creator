/**
 * EL MONTAJE 099 — «A tus pies» (Fundación MAS · MAS Estrellitas 2026), 16:9, 1 minuto, sin voz en off.
 *
 * El ángulo: ADORACIÓN Y GRATITUD. Una niña pregunta cuál es la cualidad más bonita de Dios y ocho le contestan con
 * una palabra; otra pide un conejito y la siguiente «a Cristo en mi vida»; cuando la canción se llena, el lema, «¡Dios
 * es bueno!» y el «¡Gracias a Dios por la Navidad!» a coro; el círculo desde el cielo y el CTA en papel.
 * Plan y timeline: `proyectos/099/artefactos/`.
 *
 * LA PISTA MANDA. «A Tus Pies» (instrumental) suena de corrido desde su primera nota (0,449 s de la canción, en f1)
 * hasta donde cierra su primera gran frase (60,92 s): la comp dura eso. Cada corte cae en un golpe MEDIDO de la canción
 * (`proyectos/099/musica/golpes-099.json`, `medir-pista.py --umbral 4`): frame = (segundo de la canción − 0,42) × 30.
 * Los cortes de acto caen en los golpes fuertes (`GOLPES_099`); la puerta (`proyectos/099/revisar-099.mjs`) lo comprueba.
 *
 * UNIDADES. `desde`, en SEGUNDOS de la fuente normalizada del 097 (`remotion/public/mas-097/`, receta
 * `proyectos/097/normalizar.mjs`; se lee, no se copia). `en` y `dur`, en frames de la composición (30 fps). Los DR van
 * a 29,97 en el original y la receta los deja a 30 con `setpts=PTS*1000/1001`: su `desde` es el del mapa × 1000/1001.
 *
 * LA VOZ. Cada plano que suena lleva su WAV (`audio`, la voz tal cual); la ganancia que la iguala a −18 LUFS la pone
 * `audio-099.ts` con lo medido en `voces-099.ts` (`proyectos/099/herramientas/medir-voces.mjs`).
 *
 * Datos puros: la puerta y los scripts lo cargan con node.
 */
import type { Corte as CorteDelFormato } from "../../motor/metraje";

export const FPS_099 = 30;
/** 60,5 s: acaba en el golpe de 60,92 s de la canción (18,3 dB), que ya no suena: el fundido coseno termina antes. */
export const DURACION_099 = 1815;
/** Donde acaba el metraje y empieza el papel del CTA: en el golpe de 49,83 s (`GOLPES_099.papel`). */
export const EMPIEZA_PAPEL = 1482;
/** Segundo de la canción que suena en el frame 0: su primera nota (0,449 s) cae en f1. */
export const INICIO_MUSICA = 0.42;

/**
 * Los golpes fuertes de la canción sobre los que cae un corte de ACTO (segundo de la canción, su fuerza en dB por 15 ms
 * y el frame de la comp). La puerta exige el corte a ≤ 2 f de su golpe.
 */
export const GOLPES_099 = {
  cristo: { pieza: 15.682, db: 17.7, f: 458 }, // entra el conejito: el paralelo con «a Cristo»
  revelacion: { pieza: 18.222, db: 21.3, f: 534 }, // el golpe más fuerte del minuto: «Yo lo que quiero en Navidad…»
  llena: { pieza: 29.528, db: 16.1, f: 873 }, // la pieza se llena: el lema
  gracias: { pieza: 40.145, db: 15.4, f: 1192 }, // el clímax
  papel: { pieza: 49.831, db: 15.6, f: 1482 }, // el CTA
} as const;

const DJI = 1000 / 1001;

export interface Corte extends CorteDelFormato<"corte" | "disolver"> {
  /** El WAV de la voz del plano (`mas-097/<clip>.wav`). Sin él, el plano es mudo. */
  audio?: string;
}

const v = (clip: string) => `mas-097/${clip}.mp4`;
const a = (clip: string) => `mas-097/${clip}.wav`;

export const metraje099: Corte[] = [
  // ══ LA PREGUNTA (canción 0,45-4,8 s) ══ HZ01 en dos trozos CONSECUTIVOS de la misma toma (mismo `src`, `desde`
  // contiguo, zoom seguido): en imagen es un solo plano; se parte solo para que cada frase lleve su ganancia (la pregunta,
  // con el micro en la boca, llega a −6 LUFS; la respuesta, a −18).
  {
    id: "p01a-hz01", src: v("hz01"), audio: a("hz01"), desde: 0, en: 0, dur: 72, zoom: [1, 1.0162],
    reason: "El hook en el frame 0: una niña pregunta «¿Cuál es la cualidad más bonita de Dios?» (0,2-2,0 s) junto al árbol, con la tira ya puesta",
  },
  {
    id: "p01b-hz01", src: v("hz01"), audio: a("hz01"), desde: 2.4, en: 72, dur: 61, zoom: [1.0162, 1.03],
    reason: "La primera respuesta, de la niña de pelo largo: «En amarnos» (2,6-3,95 s). Acaba en el golpe de 4,84 s",
  },
  // ══ LA LETANÍA (canción 4,8-15,7 s, la intro suave) ══ ocho niñas, una palabra cada una, cada corte en un golpe.
  // La palabra empieza unos 7 f después del corte: se ve llegar el micro y se oye entera.
  { id: "p02-hz05", src: v("hz05"), audio: a("hz05"), desde: 26.75, en: 133, dur: 46, zoom: [1, 1.02], reason: "«Amoroso» (27,0-27,9 s): abre la letanía" },
  { id: "p03-hz05", src: v("hz05"), audio: a("hz05"), desde: 11.97, en: 179, dur: 43, zoom: [1, 1.02], reason: "«Bondadoso» (12,2-13,0 s)" },
  {
    id: "p04-hz05", src: v("hz05"), audio: a("hz05"), desde: 17.78, en: 222, dur: 65, zoom: [1, 1.02],
    reason: "«Misericordioso» (18,0-19,3 s): la palabra más larga se queda un poco más; acaba antes de que la niña cruce pegada a la lente (20,3 s)",
  },
  {
    id: "p05-hz06", src: v("hz06"), audio: a("hz06"), desde: 0.27, en: 287, dur: 42, zoom: [1, 1.02],
    reason: "«Paciente» (0,5-1,2 s). Arranca en 0,27 s: el «¿Quién es?» dudoso de 0,0-0,1 s queda fuera",
  },
  {
    id: "p06-hz05", src: v("hz05"), audio: a("hz05"), desde: 14.8, en: 329, dur: 32, zoom: [1, 1.02],
    reason: "«¡Compasivo!» (15,0-15,5 s), la adolescente de brazos cruzados. La de 31,2 s se dijo tan bajo (−28 LUFS) que pedía +10 dB; esta la oye whisper en el trozo aislado (⚠ R31: confirmar de oído)",
  },
  { id: "p07-hz05", src: v("hz05"), audio: a("hz05"), desde: 39.88, en: 361, dur: 40, zoom: [1, 1.02], reason: "«Amable» (40,1-40,7 s)" },
  { id: "p08-hz05", src: v("hz05"), audio: a("hz05"), desde: 51.88, en: 401, dur: 37, zoom: [1, 1.02], reason: "«Justo» (52,1-52,65 s)" },
  {
    id: "p09-hz06", src: v("hz06"), audio: a("hz06"), desde: 20.35, en: 438, dur: 20, zoom: [1, 1.02],
    reason: "«¡Fiel!» (20,5-20,9 s), gritado: cierra la letanía y el corte cae en el golpe de 15,68 s",
  },
  // ══ «A CRISTO EN MI VIDA» (canción 15,7-25,6 s) ══
  {
    id: "p10-hz15", src: v("hz15"), audio: a("hz15"), desde: 0.48, en: 458, dur: 76, zoom: [1, 1.03],
    reason: "«Yo lo que quiero pedir de Navidad es un conejito.» (0,55-3,05 s): la frase que la siguiente niña va a repetir con otro final",
  },
  {
    id: "p11-hz17", src: v("hz17"), audio: a("hz17"), desde: 0.5, en: 534, dur: 222, zoom: [1, 1.02],
    reason: "La revelación en el golpe más fuerte del minuto (18,22 s, 21 dB): «Yo lo que quiero en Navidad es a Cristo en mi vida… y también quiero una Biblia muy grande» (0,7-7,4 s)",
  },
  // ══ RESPIRO (canción 25,6-29,5 s) ══
  {
    id: "p12-dr05", src: v("dr05"), desde: 0.1 * DJI, en: 756, dur: 117, zoom: [1, 1],
    reason: "Desde arriba, caras que miran al cielo, ríen y saludan, y el dron sube: mirar arriba, sin palabras, mientras la pieza respira antes de llenarse",
  },
  // ══ LA GRATITUD (canción 29,5-46 s, la pieza llena) ══
  {
    id: "p13-hz08", src: v("hz08"), audio: a("hz08"), desde: 0.55, en: 873, dur: 70, zoom: [1, 1.03],
    reason: "La pieza se llena en el golpe de 29,53 s y entra el lema a coro por el tobogán: «¡Misericordia, Amor y Servicio!»",
  },
  {
    id: "p14-hz19", src: v("hz19"), audio: a("hz19"), desde: 0.4, en: 943, dur: 152, zoom: [1, 1.03],
    reason: "«¡Dios es bueno!» a coro desde la baranda, con corazones de las manos (≈ 3,6 s). Suena entero (2.ª frase ⚠ por oír: «¡Aleluya!» o «¡A la lucha!»)",
  },
  {
    id: "p15-dr04", src: v("dr04"), desde: 1.2 * DJI, en: 1095, dur: 97, zoom: [1, 1],
    reason: "El dron cruza el pasillo de niñas que saludan: la subida hacia el clímax",
  },
  {
    id: "p16-hz32", src: v("hz32"), audio: a("hz32"), desde: 0.7, en: 1192, dur: 180, zoom: [1, 1.03],
    reason: "El clímax en el golpe de 40,15 s: más de treinta personas, «¡Gracias a Dios por la Navidad!», brazos arriba a 4,3 s (f1300). Entra a 0,7 s: el «¡Tres!» de la cuenta atrás (0,2-0,5 s, un adulto) no se oye",
  },
  // ══ EL PUENTE (canción 46,2-49,8 s) ══
  {
    id: "p17-dr07", src: v("dr07"), desde: 5.6 * DJI, en: 1372, dur: 110, zoom: [1, 1],
    reason: "El círculo visto desde el cielo, con su centro vacío: la estrella baja ahí y el papel entra en el golpe de 49,83 s",
  },
];
