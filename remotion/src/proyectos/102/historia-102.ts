/**
 * HISTORIA 102 — «Con cariño y amor» (9:16, MAS Estrellitas 2026). Tres respuestas del «ping-pong» del micro en la
 * terraza: lo más bonito de recibir un regalo («…con mucho cariño y amor», VT06) y lo que aprendieron de Dios este año
 * («saber a perdonar», VT10; «a respetar… a ser compasiva y no a ser agresiva», VT11). Después, el cierre en papel.
 * Plan: `proyectos/102/artefactos/` (la serie, en `proyectos/101/artefactos/`).
 *
 * VT11: la pregunta la hace un adulto que es el USUARIO y no quiere que se oiga (097, rev. 8). Aquí solo suena la
 * respuesta de la niña (7,3-12,25 s): la pregunta de arriba la hizo ANTES otra niña (VT10), y las dos respuestas
 * contestan a lo mismo. Los nombres de VT10 (hasta 2,2 s) y de VT11 (0,6-4,4 s) quedan fuera.
 */
import type { Historia } from "../101/historia";
import { audioDeHistoria } from "../101/historia";
import { VOCES_102 } from "./voces-102";

export const HISTORIA_102: Historia = {
  numero: "102",
  composicion: "Historia102",
  titulo: "Con cariño y amor",
  duracion: 447 + 180,
  cierre: 447,
  cortes: [
    {
      id: "p01-vt06",
      src: "mas-101/vt06.mp4",
      desde: 2.87,
      en: 0,
      dur: 49,
      zoom: [1, 1.03],
      reason: "«¿Qué es lo más bonito de recibir un regalo?» (2,83-4,36 s): entra en 2,87, cuando la cámara ya ha llegado a ella (antes, el barrido: f0 es la miniatura); el ritual del micro (0,1-2,1 s) queda fuera",
    },
    {
      id: "p02-vt06",
      src: "mas-101/vt06.mp4",
      desde: 4.7,
      en: 49,
      dur: 98,
      zoom: [1.02, 1.07],
      reason: "«Saber que la persona me lo dio con mucho cariño y amor.» (4,77-7,6 s): salta el barrido de 4,4-4,7 s y sale antes del de 8,3",
    },
    {
      id: "p03-vt10",
      src: "mas-101/vt10.mp4",
      desde: 2.37,
      en: 147,
      dur: 152,
      zoom: [1, 1.05],
      reason: "«¿Qué aprendiste de Dios este año?» → «Es saber a perdonar a las demás personas.» de corrido (2,37-7,44 s), después del nombre de su compañera (acaba en 2,2 s) y antes del «¡Muchas gracias!» de 7,9",
    },
    {
      id: "p04-vt11",
      src: "mas-101/vt11c.mp4",
      desde: 7.3,
      en: 299,
      dur: 160,
      zoom: [1, 1.05],
      reason: "La otra respuesta a lo mismo: «Aprendí a respetar a las personas, a ser compasiva y no a ser agresiva.» (7,5-12,2 s). Empieza después de la pregunta del adulto (acaba en 6,9) y sale antes de la segunda (12,4). RECORTADA a ella (`vt11c`): el adulto que pregunta es el usuario. Sigue 12 f bajo el papel que sube (solo imagen: la voz acaba en 12,23)",
    },
  ],
  voces: [
    { id: "voz-regalo-p", src: "mas-101/vt06.wav", desde: 2.81, en: 0, dur: 49, entra: 1, reason: "La pregunta del regalo (2,83-4,36 s): 2 f antes que su imagen (que espera a que acabe el barrido, 2,87 s), para no comerse el «¿Qué…»" },
    { id: "voz-regalo-r", src: "mas-101/vt06.wav", desde: 4.7, en: 49, dur: 98, reason: "«…con mucho cariño y amor» (4,77-7,6 s): llega muy baja (−30 LUFS), en su tramo" },
    { id: "voz-aprendiste-p", src: "mas-101/vt10.wav", desde: 2.37, en: 147, dur: 52, reason: "«¿Qué aprendiste de Dios este año?» (2,41-3,91 s)" },
    { id: "voz-perdonar", src: "mas-101/vt10.wav", desde: 2.37 + 52 / 30, en: 199, dur: 100, reason: "«Es saber a perdonar a las demás personas.» (4,52-7,37 s), en la misma toma" },
    { id: "voz-compasiva", src: "mas-101/vt11.wav", desde: 7.3, en: 299, dur: 148, reason: "«Aprendí a respetar…» (7,5-12,2 s): ni la pregunta del adulto (6,9) ni la siguiente (12,4)" },
  ],
  arriba: [
    { id: "a-regalo", en: 0, sale: 147, texto: "«¿Qué es lo más bonito de recibir un regalo?»", reason: "La primera pregunta: en f0 ya está (gancho); la dice en f4-f50" },
    { id: "a-aprendiste", en: 147, sale: 299, texto: "«¿Qué aprendiste de Dios este año?»", reason: "La segunda pregunta (f148-f193), hasta «perdonar»: en el plano de la otra respuesta (f299) taparía su cara (va al 30 % del cuadro)" },
  ],
  abajo: [
    { id: "b1", en: 53, sale: 147, texto: "«Saber que la persona me lo dio con mucho *cariño y amor*.»", marcas: [{ tipo: "subrayado", en: 116 }], reason: "saber (f53) … amor (f133-143)" },
    { id: "b2", en: 203, sale: 299, texto: "«Es saber a *perdonar* a las demás personas.»", marcas: [{ tipo: "subrayado", en: 222 }], reason: "(Es) saber (f201; voz f211) … personas (f284-297)" },
    { id: "b3", en: 302, sale: 384, texto: "«Aprendí a *respetar* a las personas,»", marcas: [{ tipo: "subrayado", en: 326 }], reason: "Aprendí (f302) … personas (f356)" },
    { id: "b4", en: 384, sale: 445, texto: "«a ser *compasiva* y no a ser agresiva.»", marcas: [{ tipo: "subrayado", en: 395 }], reason: "a ser (f385) … agresiva (f428; la voz acaba en f447)" },
  ],
  musica: {
    titulo: "Tu Estás Aquí",
    src: "mas-101/musica-tu-estas-aqui.wav",
    desde: 87.19,
    lufs: -16.3,
    reason: "«Tu Estás Aquí» (Samy Galí, piano; la del 098), rev. 2 (pedido del usuario: las pistas de los vídeos 16:9): su parte llena, justo después del tramo que usó el 098 (26,55-86,35 s). Desde 87,19 s para que su golpe de 102,09 s (14,2 dB) caiga en f447, cuando sube el papel",
  },
};

export const audio102 = audioDeHistoria(HISTORIA_102, VOCES_102);

/** El `Corte[]` suelto, para la puerta genérica del montaje (`revisar-metraje.mjs` busca un export que lo sea). */
export const metraje102 = HISTORIA_102.cortes;
