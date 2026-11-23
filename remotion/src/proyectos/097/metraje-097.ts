/**
 * EL MONTAJE 097 — «Lo más bonito de un regalo» (Fundación MAS · MAS Estrellitas 2026), 16:9.
 *
 * REV. 4 · MONTADO SOBRE LA PISTA ENTERA (pedido del usuario, 2026-11-22: «que la pista no se corte, así
 * tengas que reorganizar las escenas acorde a la pista»). «Yeshua (Versión Piano)» suena de corrido desde su
 * primera nota y las escenas se ordenan por las partes de la pieza, medidas
 * segundo a segundo (`proyectos/097/herramientas/` y la cabecera de `audio-097.ts`):
 *   intro suave (pieza 0-29 s)        la puerta, los deseos, «Cristo», los sueños
 *   primer cuerpo (29-70 s)           lo que aprendieron, las cualidades y TODA la alegría, hasta el clímax
 *   pasaje íntimo (72-100 s)          el atardecer, el testimonio y la respuesta
 *   vuelve a crecer (100-128 s)       el puente del dron y el CTA en papel
 * Respecto a la rev. 1 del timeline, la alegría pasa ANTES del testimonio (el clímax cae donde acaba el primer
 * cuerpo y la pieza baja: el respiro y la intimidad llegan con la calma de la música) y entran DR02 y DR03. Los
 * cortes grandes caen en golpes medidos de la pieza (`GOLPES_097`).
 *
 * REV. 5 (2026-11-22): el vídeo EMPIEZA EN LA PUERTA (HZ20, «¡Bienvenidos a la Nuestra!»): fuera el dron del
 * hook y, con él, la pregunta sobre el dron y la primera frase de la voz en off. DR05 pasa al sitio de DR03 (el
 * pasillo). Para no mover nada respecto a la pieza, la pista arranca en su golpe de 6,51 s (22,5 dB) y la puerta
 * dura 161 f: cada escena sigue cayendo sobre la misma parte de la pieza que en la rev. 4 (±0,4 f).
 *
 * REV. 6 (2026-11-22): la pista vuelve a empezar en su PRIMERA nota (pedido del usuario) y DR04 va antes que DR05.
 * Para que los cortes clave sigan cayendo en golpes, se ajustan solo planos sin frase: la puerta (210 f), DR02
 * (118 f), el atardecer (93 f) y DR07 (233 f). Así caen en golpe el grito, el paso al atardecer, la vuelta de la
 * pregunta y la entrada al papel (`GOLPES_097`). Los pasos del CTA duran 3 s más (la cuenta se lee con calma) y el
 * vídeo acaba donde la pieza cierra su frase.
 *
 * REV. 7 (2026-11-22): tras «¿Qué aprendiste de Dios este año?» se queda la respuesta de la misma niña (VT11 hasta
 * 12,4 s, +165 f; pedido del usuario). Para que los cortes clave sigan en golpes se rehízo el reparto de los planos sin
 * frase: puerta 152 f, DR02 90, atardecer 108, DR07 248.
 *
 * REV. 8 (2026-11-22): la pregunta ya no la hace el adulto (pedido del usuario): la hace la niña de coleta de VT10, sigue
 * la respuesta de la niña de VT11 y la de la niña de VT10. El bloque dura 27 f menos y la puerta 27 más (179 f): todo lo de
 * después cae en el mismo frame que en la rev. 7.
 *
 * REV. 9 (2026-11-22): fuera la respuesta de la niña de VT11 (pedido del usuario): tras la pregunta sigue VT10 DE CORRIDO, como
 * pasó («Es saber a perdonar…» y el «¡Muchas gracias!» de la niña que preguntaba). El bloque dura 97 f menos; para que
 * el grito siga en su golpe, la puerta pasa a 213 f y la pregunta de las cualidades se queda con su primera respuesta
 * («En amarnos», HZ01 hasta 4,5 s): desde «Amoroso» (f1064) todo cae en el mismo frame que en la rev. 8. VT10 y HZ01 van
 * en trozos CONSECUTIVOS de la misma toma (mismo `src`, `desde` contiguo y el zoom seguido): en imagen es un solo plano;
 * se parten solo para que cada frase lleve su ganancia (la pregunta llega a −15 LUFS, la respuesta a −29 y el
 * «¡Muchas gracias!», con el micro en la boca, a −10).
 *
 * UNIDADES. `desde`, en SEGUNDOS de la fuente normalizada (`remotion/public/mas-097/`, receta
 * `proyectos/097/normalizar.mjs`); `en` y `dur`, en frames de la composición (30 fps). Los DR
 * van a 29,97 en el original y la receta los deja a 30 con `setpts=PTS*1000/1001`: su `desde`
 * es el del mapa × 1000/1001. Los VT ya vienen recortados a su franja 16:9.
 *
 * LA VOZ. Cada plano que suena lleva su WAV (`audio`, la voz tal cual) y `voz`: dónde habla en
 * SU clip y a qué sonoridad (medidas en `proyectos/097/medidas-voz.json`). La ganancia que la
 * iguala la pone `audio-097.ts`.
 *
 * Datos puros: la puerta y los scripts lo cargan con node.
 */
import type { Corte as CorteDelFormato } from "../../motor/metraje";

export const FPS_097 = 30;
/** 130,8 s: el último frame es el cierre quieto; la pieza empieza a calmarse (132 s) y se apaga con ella. */
export const DURACION_097 = 3924;
/** Donde acaba el metraje y empieza el papel del CTA (P28): en un golpe de la pieza (`GOLPES_097.papel`). */
export const EMPIEZA_PAPEL = 3024;

/**
 * Los golpes de la pieza sobre los que cae un corte (segundo de la PIEZA, su fuerza y el frame de la comp:
 * frame = (segundo − 1,335) × 30, rev. 6). Medidos con ventanas de 15 ms: subida ≥ 12 dB sobre los 90 ms anteriores.
 */
export const GOLPES_097 = {
  grito: { pieza: 43.05, db: 23.5, f: 1253 }, // el golpe cae a -1.6 f del corte
  respuesta: { pieza: 88.605, db: 18.2, f: 2617 }, // el golpe cae a +1.1 f del corte
  papel: { pieza: 102.18, db: 15.0, f: 3024 }, // el golpe cae a +1.3 f del corte
} as const;

const DJI = 1000 / 1001;

export interface VozDelCorte {
  /** Segundo de la fuente en que empieza a hablar (dentro del tramo del plano). */
  s0: number;
  /** Segundo de la fuente en que termina. */
  s1: number;
  /** Sonoridad de esa ventana (LUFS, ebur128 sobre el WAV tal cual). */
  lufs: number;
  dice: string;
}

export interface Corte extends CorteDelFormato<"corte" | "disolver"> {
  /** El WAV de la voz del plano (`mas-097/<clip>.wav`). Sin él, el plano es mudo. */
  audio?: string;
  voz?: VozDelCorte;
  /** Frame de la comp desde el que suena su audio, si no es `en` (P17: el corte en L de P16). */
  audioDesdeFrame?: number;
}

const v = (clip: string) => `mas-097/${clip}.mp4`;
const a = (clip: string) => `mas-097/${clip}.wav`;

export const metraje097: Corte[] = [
  // ══ INTRO (pieza 6,5-29 s) · la bienvenida y lo que piden ══
  {
    id: "p02-hz20", src: v("hz20"), audio: a("hz20"), desde: 0, en: 0, dur: 213, zoom: [1, 1.03],
    reason: "El vídeo empieza en la puerta (pedido del usuario, 2026-11-22): «¡Bienvenidos a la Nuestra!» y las niñas entran. Dura 213 f (rev. 9) para que el grito de HZ08 caiga en un golpe de la pieza",
  },
  {
    id: "p03-hz14", src: v("hz14"), audio: a("hz14"), desde: 0.5, en: 213, dur: 66, zoom: [1, 1.03],
    reason: "Primer deseo, una radio: lo que todos reconocemos",
  },
  {
    id: "p04-hz15", src: v("hz15"), audio: a("hz15"), desde: 0.4, en: 279, dur: 87, zoom: [1, 1.03],
    reason: "Segundo deseo, un conejito",
  },
  {
    id: "p05-hz16", src: v("hz16"), audio: a("hz16"), desde: 0.5, en: 366, dur: 60, zoom: [1, 1.03],
    reason: "Tercer deseo, un bafle: la lista de cosas, antes de romperla",
  },
  {
    id: "p06-hz17", src: v("hz17"), audio: a("hz17"), desde: 0.5, en: 426, dur: 216, zoom: [1, 1.02],
    reason: "La revelación: «a Cristo en mi vida» y «una Biblia muy grande». El plano ya trae su acercamiento lento",
  },
  {
    id: "p07-vt13", src: v("vt13"), audio: a("vt13"), desde: 0.6, en: 642, dur: 84, zoom: [1, 1.03],
    reason: "Tienen futuro, no solo deseos: «¿Cuáles son tus sueños?» → «Ser policía». Acaba en el golpe que abre el primer cuerpo de la pieza",
  },
  // ══ PRIMER CUERPO (pieza 29-70 s) · lo que saben y la alegría ══
  // VT10 de corrido (rev. 9): tres trozos consecutivos de la misma toma, con el zoom seguido (1 → 1,03 en 203 f).
  {
    id: "p08a-vt10", src: v("vt10"), audio: a("vt10"), desde: 71 / 30, en: 726, dur: 63, zoom: [1, 1.00931],
    reason: "La pregunta la hace una niña (rev. 8, pedido del usuario: que no pregunte el adulto): «¿Qué aprendiste de Dios este año?». Empieza en 2,37 s, en el silencio entre el nombre de su compañera («[nombre]», acaba en 2,12 s por energía), que queda fuera, y «¿Qué…» (2,40 s)",
  },
  {
    id: "p08b-vt10", src: v("vt10"), audio: a("vt10"), desde: 134 / 30, en: 789, dur: 94, zoom: [1.00931, 1.0232],
    reason: "Contesta la niña del micro, en la misma toma (rev. 9: fuera la respuesta de VT11, pedido del usuario): «Es saber a perdonar a las demás personas» (4,52-7,2 s). Trozo aparte solo por su ganancia: la respuesta llega 14 dB más baja que la pregunta",
  },
  {
    id: "p08c-vt10", src: v("vt10"), audio: a("vt10"), desde: 228 / 30, en: 883, dur: 46, zoom: [1.0232, 1.03],
    reason: "Y la que preguntaba se acerca a la cámara: «¡Muchas gracias!» (8,3-9,1 s). Con el micro en la boca llega a −10 LUFS: va con su propia ganancia, a la baja",
  },
  // HZ01, la pregunta y su primera respuesta: dos trozos seguidos de la misma toma, por la misma razón.
  {
    id: "p10a-hz01", src: v("hz01"), audio: a("hz01"), desde: 0, en: 929, dur: 75, zoom: [1, 1.01667],
    reason: "Ellas mismas hacían las preguntas: «¿Cuál es la cualidad más bonita de Dios?» (0-2,1 s, a −6 LUFS)",
  },
  {
    id: "p10b-hz01", src: v("hz01"), audio: a("hz01"), desde: 2.5, en: 1004, dur: 60, zoom: [1.01667, 1.03],
    reason: "La primera respuesta, de la niña de pelo largo de la derecha: «En amarnos» (2,7-4,1 s, a −18 LUFS). Entra en la rev. 9 para que «Amoroso» siga en f1064 y el grito en su golpe; el corte, en la pausa de 2,38-2,66",
  },
  { id: "p11-hz05", src: v("hz05"), audio: a("hz05"), desde: 26.8, en: 1064, dur: 45, zoom: [1, 1.02], reason: "«Amoroso»: una palabra por niña" },
  { id: "p12-hz05", src: v("hz05"), audio: a("hz05"), desde: 11.9, en: 1109, dur: 39, zoom: [1, 1.02], reason: "«Bondadoso»" },
  { id: "p13-hz05", src: v("hz05"), audio: a("hz05"), desde: 17.9, en: 1148, dur: 48, zoom: [1, 1.02], reason: "«Misericordioso»" },
  { id: "p14-hz05", src: v("hz05"), audio: a("hz05"), desde: 31.0, en: 1196, dur: 33, zoom: [1, 1.02], reason: "«Compasivo»" },
  { id: "p15-hz06", src: v("hz06"), audio: a("hz06"), desde: 20.3, en: 1229, dur: 24, zoom: [1, 1.02], reason: "«¡Fiel!»: la columna se completa y el corte cae en el golpe del grito" },
  {
    id: "p18-hz08", src: v("hz08"), audio: a("hz08"), desde: 0.7, en: 1253, dur: 66, zoom: [1, 1.03],
    reason: "La alegría arranca en el golpe de 43,05 s (23,5 dB): «¡Misericordia, Amor y Servicio!»",
  },
  { id: "p19-hz10", src: v("hz10"), audio: a("hz10"), desde: 1.0, en: 1319, dur: 78, zoom: [1, 1.03], reason: "«¡Feliz Navidad para todos!» bajando por el tobogán" },
  { id: "p20-hz19", src: v("hz19"), audio: a("hz19"), desde: 0.5, en: 1397, dur: 114, zoom: [1, 1.03], reason: "«¡Dios es bueno!» a coro, con corazones de las manos" },
  {
    id: "p21-hz28", src: v("hz28"), audio: a("hz28"), desde: 1.2, en: 1511, dur: 56, zoom: [1, 1.04],
    reason: "Tres niñas ríen con los regalos en alto, hasta el golpe de 53,5 s en que entra el dron",
  },
  {
    id: "p21b-dr02", src: v("dr02"), desde: 9.0 * DJI, en: 1567, dur: 90, zoom: [1, 1],
    reason: "El dron se acerca al grupo, que lo saluda desde la terraza: empieza la subida de tres planos de dron hasta el clímax",
  },
  { id: "p22-dr04", src: v("dr04"), desde: 1.2 * DJI, en: 1657, dur: 99, zoom: [1, 1], reason: "El dron cruza el pasillo en rasante: la alegría crece (antes que DR05 desde la rev. 6, pedido del usuario)" },
  {
    id: "p21c-dr05", src: v("dr05"), desde: 0.7 * DJI, en: 1756, dur: 154, zoom: [1, 1],
    reason: "Desde el cielo, una ronda de caras que miran al dron y saludan, y el dron sube (era el plano del hook; el usuario lo pidió aquí, en lugar del pasillo de DR03, el 2026-11-22)",
  },
  {
    id: "p23-hz32", src: v("hz32"), audio: a("hz32"), desde: 0.7, en: 1910, dur: 167, zoom: [1, 1.03],
    reason: "El clímax: más de treinta personas, «¡Gracias a Dios por la Navidad!», con los brazos arriba en el golpe de 70,2 s. Acaba donde la pieza baja",
  },
  // ══ PASAJE ÍNTIMO (pieza 72-100 s) · el testimonio y la respuesta ══
  {
    id: "p24-vt36", src: v("vt36"), desde: 0.4, en: 2077, dur: 108, zoom: [1, 1.03], entra: "disolver",
    reason: "Respiro: el atardecer, cuando la pieza se calla tras el primer cuerpo",
  },
  {
    id: "p16-vt07", src: v("vt07"), audio: a("vt07"), desde: 3.8, en: 2185, dur: 36, zoom: [1, 1.02],
    reason: "«¿Cómo va tu relación con Cristo?»: la pregunta que abre el testimonio",
  },
  {
    id: "p17-vt07", src: v("vt07"), audio: a("vt07"), desde: 5.3, en: 2221, dur: 396, zoom: [1, 1.06],
    audioDesdeFrame: 2231,
    reason: "El corazón del vídeo, sobre el pasaje más íntimo de la pieza: el testimonio entero, solo texto y un acercamiento lento. Su audio entra 10 f tarde: hasta ahí suena la cola de la pregunta de P16 (corte en L) y ella empieza a hablar en 6,2 s",
  },
  {
    id: "p25-vt06a", src: v("vt06a"), audio: a("vt06"), desde: 2.7, en: 2617, dur: 51, zoom: [1, 1.03],
    reason: "Vuelve la pregunta del hook, en el golpe de 88,6 s (18 dB): «¿Qué es lo más bonito de recibir un regalo?»",
  },
  {
    id: "p26-vt06b", src: v("vt06b"), audio: a("vt06"), desde: 4.7, en: 2668, dur: 108, zoom: [1, 1.04],
    reason: "La respuesta que sostiene el vídeo: «Saber que la persona me lo dio con mucho cariño y amor»",
  },
  {
    id: "p27-dr07", src: v("dr07"), desde: 1.45 * DJI, en: 2776, dur: 248, zoom: [1, 1],
    reason: "El círculo visto desde el cielo, con su centro vacío: el sitio que se le hace a quien mira. Acaba en el golpe de 102,2 s, donde entra el papel",
  },
];
