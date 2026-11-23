/**
 * EL MONTAJE 098 — «Tú estás aquí» (Fundación MAS · MAS Estrellitas 2026), 16:9, 1 minuto.
 *
 * Uno de los tres vídeos de un minuto que salen del material del 097, uno por canción. Este va sobre «Tu Estás Aquí»
 * (Samy Galí, piano) y su ángulo es íntimo: la presencia de Dios, dicha por ellas. Plan y timeline:
 * `proyectos/098/artefactos/`.
 *
 * LA MÚSICA MARCA EL TIEMPO. La pista suena de corrido de 26,55 a 86,35 s (un párrafo de la pieza, de un respiro a otro;
 * ver `audio-098.ts`) y cada corte cae en un golpe MEDIDO de ese tramo (`GOLPES_098`; `proyectos/098/musica/`). La pieza
 * va por frases, sin pulso fijo: los golpes son los arranques de frase y de acorde, no una rejilla.
 *
 * UNIDADES. `desde`, en SEGUNDOS de la fuente normalizada; `en` y `dur`, en frames de la comp (30 fps). Los vídeos se
 * leen del 097 (`remotion/public/mas-097/`, receta `proyectos/097/normalizar.mjs`): los VT ya vienen recortados a su
 * franja 16:9 y el dron a 30 exactos (`desde` del mapa × 1000/1001). Las fotos son del 098 (`mas-098/`, receta
 * `proyectos/098/normalizar.mjs`), ya recortadas a 16:9 y SIN EXIF.
 *
 * LA VOZ. Cada plano que suena lleva su WAV (`audio`) y, si su audio no arranca con la imagen (cortes en J y en L), lo
 * dice `audio-098.ts`. La ganancia que iguala cada frase la pone `audio-098.ts` con lo medido en `voces-098.ts`.
 *
 * Datos puros: la puerta y los scripts lo cargan con node.
 */
import type { Corte as CorteDelFormato } from "../../motor/metraje";

export const FPS_098 = 30;
/** 59,8 s: de la primera nota del tramo (26,55 s de la pista) a su respiro (86,35 s). */
export const DURACION_098 = 1794;
/** Donde acaba el metraje y entra el papel del CTA: en el golpe de 75,80 s. */
export const EMPIEZA_PAPEL = 1478;
/** El segundo de la pista en el frame 0 y el del último frame. */
export const PISTA_DESDE = 26.55;
export const PISTA_HASTA = PISTA_DESDE + DURACION_098 / FPS_098;

/**
 * Los golpes medidos del tramo en los que cae un corte (segundo de la PISTA y su subida en dB;
 * `proyectos/098/herramientas/medir-pista.py`, ventanas de 15 ms, banda 80-3000 Hz, subida ≥ 6 dB sobre los 90 ms
 * anteriores). Frame = round((segundo − 26,55) × 30). La puerta comprueba que cada corte de la lista cae a ≤ 2 f.
 */
export const GOLPES_098 = {
  pregunta: { pista: 31.19, db: 7.2, f: 139 },
  manos: { pista: 42.885, db: 7.1, f: 490 },
  perdonar: { pista: 47.87, db: 6.8, f: 640 },
  regalo: { pista: 51.74, db: 6.2, f: 756 },
  corazon: { pista: 56.61, db: 6.1, f: 902 },
  cielo: { pista: 60.02, db: 6.8, f: 1004 },
  cristo: { pista: 64.0, db: 9.0, f: 1124 },
  circulo: { pista: 67.92, db: 12.0, f: 1241 },
  cima: { pista: 71.785, db: 7.8, f: 1357 },
  papel: { pista: 75.8, db: 7.4, f: 1478 },
  ultimaFrase: { pista: 79.73, db: 12.6, f: 1595 },
} as const;

const DJI = 1000 / 1001;

export interface Corte extends CorteDelFormato<"corte" | "disolver"> {
  /** El WAV de la voz del plano (`mas-097/<clip>.wav`). Sin él, el plano es mudo. */
  audio?: string;
}

const v = (clip: string) => `mas-097/${clip}.mp4`;
const a = (clip: string) => `mas-097/${clip}.wav`;

export const metraje098: Corte[] = [
  {
    id: "p01-vt36", src: v("vt36"), desde: 0.4, en: 0, dur: 139, zoom: [1, 1.04],
    reason: "Se abre mirando al cielo: el atardecer sobre las montañas y la cámara que sube (0,4-5,0 s, antes del pino que entra en 6,0). Mudo: su audio es alguien que pregunta por la música",
  },
  {
    id: "p02-vt07", src: v("vt07"), audio: a("vt07"), desde: 3.8, en: 139, dur: 351, zoom: [1, 1.05],
    reason: "UNA toma, de corrido (rev. 2): «¿Cómo va tu relación con Cristo?» (la pregunta la hace una niña a otra), el barrido de la cámara hacia la que responde (5,0-5,85 s) y el testimonio entero, «Mi relación con Cristo es un proceso…», con un acercamiento lento. Entra en el golpe de 31,19 s; el nombre del ritual del micro (0,5-2,9 s) queda fuera. En la rev. 1 se cortaba el barrido (5,1 → 5,3 s) y el testimonio arrancaba igualmente movido hasta 5,85 s: un salto y medio segundo borroso; de corrido, el barrido se lee como lo que es, la cámara que se vuelve hacia ella",
  },
  {
    id: "p04-ft30", tipo: "foto", src: "mas-098/ft30.jpg", en: 490, dur: 150, zoom: [1, 1.08],
    reason: "«…trato de aferrarme a la verdad de Cristo»: la foto entra con «aferrarme» y enseña manos que se agarran (de adultos y de una niña, sin una cara). Su voz sigue encima (corte en L)",
  },
  {
    id: "p05-vt10", src: v("vt10"), audio: a("vt10"), desde: 3.5, en: 640, dur: 116, zoom: [1, 1.025],
    reason: "«¿Qué aprendiste de Dios este año?» → «Es saber a perdonar a las demás personas». La imagen entra con la pregunta ya empezada (su audio arranca 1,1 s antes, corte en J, después del nombre que acaba en 2,2 s) y sale justo al acabar «personas» (7,37 s)",
  },
  {
    id: "p06-vt06a", src: v("vt06a"), audio: a("vt06"), desde: 2.7, en: 756, dur: 51, zoom: [1, 1.02],
    reason: "«¿Qué es lo más bonito de recibir un regalo?»",
  },
  {
    id: "p07-vt06b", src: v("vt06b"), audio: a("vt06"), desde: 4.7, en: 807, dur: 95, zoom: [1, 1.04],
    reason: "«Saber que la persona me lo dio con mucho cariño y amor.» Salta el barrido de 4,4-4,7 s; sale antes del barrido de 8,3",
  },
  {
    id: "p08-ft32", tipo: "foto", src: "mas-098/ft32.jpg", en: 902, dur: 102, zoom: [1.02, 1.08],
    reason: "Respiro tras «cariño y amor»: el corazón que hacen dos niñas con las manos bajo la palmera dorada",
  },
  {
    id: "p09-ft43", tipo: "foto", src: "mas-098/ft43.jpg", en: 1004, dur: 120, zoom: [1, 1.06],
    reason: "Mirar arriba: de espaldas, sin cara, una niña señala el cielo sobre las montañas. Prepara la frase que sigue",
  },
  {
    id: "p10-hz17", src: v("hz17"), audio: a("hz17"), desde: 0.5, en: 1124, dur: 117, zoom: [1, 1.05],
    reason: "«Yo lo que quiero en Navidad es a Cristo en mi vida»: entra en el golpe de 64,0 s, donde empieza la subida de la música. Solo hasta «vida» (4,3 s): la Biblia muy grande es de otro vídeo",
  },
  {
    id: "p11-dr07", src: v("dr07"), desde: 1.45 * DJI, en: 1241, dur: 237, zoom: [1, 1],
    reason: "El círculo visto desde el cielo, con su centro vacío, sube en el golpe más fuerte del tramo (67,92 s). En la cima de la música (f1357) aparece la estrella y baja a ese centro",
  },
];
