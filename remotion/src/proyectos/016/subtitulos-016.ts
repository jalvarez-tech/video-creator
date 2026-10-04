/**
 * EL TEXTO DEL 016 — un solo bloque editorial: el del encargo.
 *
 * «República Dominicana 2027», SOLO y CENTRADO en el cuadro, ENTERO desde el
 * frame 0 (`entrada: 0`): ese frame es la miniatura (R23). Pedido por el
 * cliente tras la primera prueba, que llevaba además «¡Todo incluido!» en
 * acento y el bloque arriba. Al centro cae sobre el horizonte y sus nubes
 * (luma 160-200), así que lo sostiene el velo de banda de `RD016.tsx`.
 *
 * No hay más bloques porque no hay voz: los subtítulos editoriales acompañan a
 * lo que se dice, y aquí no se dice nada.
 */
import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_016, golpe } from "./metraje-016";

export const subtitulos016: readonly BloqueEditorial[] = [
  {
    id: "titular",
    posicion: "centro",
    escala: 1.15,
    entrada: 0,
    // Sale con el corte al segundo plano, antes de que cambie el cielo de debajo.
    hasta: golpe(8),
    trozos: [{ desde: 0, texto: "República Dominicana 2027" }],
  },
];

/** Para la pista de captions de la plataforma (R14). */
export const subtitulos016Srt = segmentosDe(subtitulos016, FPS_016);
