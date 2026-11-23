/**
 * EL MONTAJE 100 — «Lo harás otra vez» (Fundación MAS · MAS Estrellitas 2026), 16:9, 60 s. Alegría y esperanza.
 *
 * Sale de `proyectos/100/artefactos/03-timeline.md`. La pieza va MONTADA SOBRE LA CANCIÓN: un solo tramo de corrido de
 * «Lo harás otra vez» (Elevation Worship, pista; sin voz cantada), de 318,641 a 378,641 s, su último clímax. Sus partes
 * ordenan las escenas (frame f = segundo 318,641 + f/30 de la pista):
 *   ruptura (f0-262)       la puerta y el sueño: la música casi a solas, se oye cada palabra
 *   subida (f262-538)      los deseos, pegados en los golpes del redoble, y los regalos en alto
 *   pleno (f538-1292)      la alegría: tobogán, lema, «¡Dios es bueno!», los drones que suben y el clímax
 *   bajada (f1292-1491)    el atardecer
 *   outro (f1491-1800)     el papel del CTA (no es metraje: `Papel100.tsx`)
 * Cada corte seco cae a ≤ 2 f de un golpe medido ≥ 9 dB (`GOLPES_100`, la puerta lo comprueba con `musica/golpes-100.json`).
 *
 * MATERIAL. El del 097, ya normalizado, en LECTURA: `remotion/public/mas-097/` (receta `proyectos/097/normalizar.mjs`).
 * `desde` en SEGUNDOS de esa fuente; `en` y `dur` en frames de la comp (30 fps). Los DR van a 29,97 en el original y la
 * receta los deja a 30 con `setpts=PTS*1000/1001`: su `desde` es el del mapa × 1000/1001. Los VT ya vienen en su franja 16:9.
 *
 * LO QUE NO ENTRA (es de las otras dos piezas, 098 y 099): VT07, VT06, HZ17, HZ05. Y nunca VT32 ni VT19 (la puerta).
 *
 * Datos puros: la puerta y los scripts lo cargan con node.
 */
import type { Corte as CorteDelFormato } from "../../motor/metraje";

export const FPS_100 = 30;
/** 60,0 s: el tramo de la canción acaba en 378,641 s, justo antes de la nota suave de 378,75 s; se apaga en coseno. */
export const DURACION_100 = 1800;
/** Donde entra el papel del CTA: la primera nota del outro (368,341 s, 10,9 dB). */
export const EMPIEZA_PAPEL = 1491;
/** El segundo de la pista que suena en el frame 0. Su golpe de 318,774 s (13,4 dB) cae en el f4. */
export const INICIO_MUSICA = 318.641;

/** Los golpes de los cortes que abren una parte (segundo de la PISTA, fuerza y frame). */
export const GOLPES_100 = {
  subida: { pista: 328.207, db: 22.4, f: 287 },
  pleno: { pista: 336.581, db: 12.3, f: 538 },
  climax: { pista: 356.116, db: 12.4, f: 1124 },
  bajada: { pista: 361.701, db: 10.1, f: 1292 },
  papel: { pista: 368.341, db: 10.9, f: 1491 },
} as const;

const DJI = 1000 / 1001;

export interface Corte extends CorteDelFormato<"corte" | "disolver"> {
  /** El WAV de la voz del plano (`mas-097/<clip>.wav`). Sin él, el plano es mudo. */
  audio?: string;
}

const v = (clip: string) => `mas-097/${clip}.mp4`;
const a = (clip: string) => `mas-097/${clip}.wav`;

export const metraje100: Corte[] = [
  // ══ RUPTURA (pista 318,6-327,4) · te abren la puerta ══
  {
    id: "p01-hz20", src: v("hz20"), audio: a("hz20"), desde: 0, en: 0, dur: 203, zoom: [1, 1.03],
    reason: "Dos niñas abren la puerta de su casa: «¡Bienvenidos a la Nuestra!». Es el frame 0 (la miniatura). Acaba en el golpe de 325,42 s, cuando ya entran",
  },
  {
    id: "p02-vt13", src: v("vt13"), audio: a("vt13"), desde: 0.6, en: 203, dur: 84, zoom: [1, 1.03],
    reason: "La esperanza en una frase: «¿Cuáles son tus sueños?» → «Ser policía». Acaba en el golpe más fuerte del tramo (328,21 s, 22 dB), donde arranca la subida",
  },
  // ══ SUBIDA (pista 327,4-336,6) · lo que piden, en golpes ══
  { id: "p03-hz14", src: v("hz14"), audio: a("hz14"), desde: 0.45, en: 287, dur: 63, zoom: [1, 1.03], reason: "Primer deseo, una radio" },
  { id: "p04-hz15", src: v("hz15"), audio: a("hz15"), desde: 0.4, en: 350, dur: 83, zoom: [1, 1.03], reason: "Segundo deseo, un conejito" },
  { id: "p05-hz16", src: v("hz16"), audio: a("hz16"), desde: 0.45, en: 433, dur: 74, zoom: [1, 1.03], reason: "Tercer deseo, un bafle" },
  {
    id: "p06-hz28", src: v("hz28"), audio: a("hz28"), desde: 1.4, en: 507, dur: 31, zoom: [1, 1.02],
    reason: "Y los regalos ya en las manos, entre risas: un segundo, en el contratiempo de 335,55 s, justo antes de que estalle el pleno",
  },
  // ══ PLENO (pista 336,6-361,7) · la alegría ══
  {
    id: "p07-hz10", src: v("hz10"), audio: a("hz10"), desde: 0.75, en: 538, dur: 84, zoom: [1, 1.03],
    reason: "Estalla el pleno de la canción (336,58 s): «¡Feliz Navidad para todos!» bajando por el tobogán",
  },
  { id: "p08-hz08", src: v("hz08"), audio: a("hz08"), desde: 0.65, en: 622, dur: 63, zoom: [1, 1.03], reason: "El lema a gritos por el tobogán: «¡Misericordia, Amor y Servicio!»" },
  {
    id: "p09-hz19", src: v("hz19"), audio: a("hz19"), desde: 0.25, en: 685, dur: 104, zoom: [1, 1.03],
    reason: "«¡Dios es bueno!» a coro en la baranda. El audio calla en el hueco de 3,45 s: la segunda frase («¿A la lucha?» / «¿Aleluya?», sin oír) no suena",
  },
  {
    id: "p10-dr02", src: v("dr02"), desde: 9.0 * DJI, en: 789, dur: 84, zoom: [1, 1],
    reason: "Empieza la subida de los drones: el grupo saluda al dron desde la terraza, con la casa detrás",
  },
  { id: "p11-dr04", src: v("dr04"), desde: 1.2 * DJI, en: 873, dur: 63, zoom: [1, 1], reason: "El dron cruza en rasante el pasillo de niñas que saludan" },
  {
    id: "p12-dr05", src: v("dr05"), desde: 0.7 * DJI, en: 936, dur: 188, zoom: [1, 1],
    reason: "Las caras miran al cielo y saludan, y el dron sube girando sobre la comunidad entera hasta el golpe del clímax",
  },
  {
    id: "p13-hz32", src: v("hz32"), audio: a("hz32"), desde: 0.7, en: 1124, dur: 168, zoom: [1, 1.03],
    reason: "El clímax: más de treinta personas, «¡Gracias a Dios por la Navidad!», con los brazos arriba (≈ f1235) y los vítores. Desde 0,7 s: el «¡tres!» de quien graba (0,2-0,6) no suena. Acaba en el último golpe del pleno",
  },
  // ══ BAJADA (pista 361,7-368,3) · el respiro ══
  {
    id: "p14-vt36", src: v("vt36"), desde: 0.1, en: 1292, dur: 203, zoom: [1, 1.03],
    reason: "El atardecer sobre las montañas cuando la canción baja; sigue 4 f bajo la hoja del CTA, que entra deslizando en f1491",
  },
];
