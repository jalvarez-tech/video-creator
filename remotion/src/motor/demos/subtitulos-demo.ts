/**
 * PLAN DE DEMO de los subtítulos editoriales — 10 s a 30 fps, 9:16.
 *
 * Es la plantilla a copiar para el `subtitulos-NNN.ts` de un proyecto real, y
 * enseña el repertorio entero en el orden en que aparece en una pieza:
 *
 *   b01  el hook: ARRIBA, agrandado y ya puesto en el frame 0 (es la miniatura).
 *   b02  una línea sola, abajo: lo normal.
 *   b03  tres líneas que se acumulan, con el acento en medio.
 *   b04  el dato: solo, al centro.
 *   b05  base + acento al final de la frase.
 *   b06  el cierre: el último acento es la palabra de la acción.
 *
 * En una pieza real los `desde` no se escriben a ojo: salen de la voz medida
 * (`transcribir.mjs --palabras` + `trozos-editoriales.mjs`). Aquí no hay voz,
 * así que van a un trozo por segundo, que es el ritmo de la referencia.
 *
 * Datos puros: solo `import type`. El validador y la puerta lo leen con node.
 */
import type { BloqueEditorial } from "../subtitulos-editoriales";

export const FPS_SUBTITULOS_DEMO = 30;
export const DURACION_SUBTITULOS_DEMO = 300;

export const subtitulosDemo: readonly BloqueEditorial[] = [
  {
    id: "b01",
    posicion: "arriba",
    escala: 1.5,
    entrada: 0,
    hasta: 48,
    trozos: [
      { desde: 0, texto: "¿Y si tu próximo" },
      { desde: 0, texto: "vídeo", estilo: "acento" },
    ],
  },
  { id: "b02", hasta: 78, trozos: [{ desde: 50, texto: "se montara" }] },
  {
    id: "b03",
    hasta: 150,
    trozos: [
      { desde: 80, texto: "con la voz" },
      { desde: 100, texto: "como guion", estilo: "acento" },
      { desde: 124, texto: "y nada más?" },
    ],
  },
  { id: "b04", posicion: "centro", hasta: 190, trozos: [{ desde: 154, texto: "30 fps", estilo: "dato" }] },
  {
    id: "b05",
    hasta: 244,
    trozos: [
      { desde: 194, texto: "Cada trozo entra" },
      { desde: 214, texto: "a su frame", estilo: "acento" },
    ],
  },
  {
    id: "b06",
    hasta: 296,
    trozos: [
      { desde: 250, texto: "y el último acento" },
      { desde: 276, texto: "cierra.", estilo: "acento" },
    ],
  },
];
