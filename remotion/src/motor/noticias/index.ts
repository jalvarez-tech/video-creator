/**
 * FORMATO NOTICIAS — punto de entrada único.
 *
 *   import { PistaNoticia, toma, revisaNoticia, MARCA } from "./noticias";
 *
 * Qué hay dentro:
 *   theme-noticias.ts  los TOKENS del look editorial claro (paleta, tipografías,
 *                      layout, marca). Es la contraparte clara de `estilos.ts`.
 *   Editorial.tsx      las primitivas que la biblioteca general no tenía:
 *                      FondoPapel, FondoCine, Sello, TarjetaFoto, RecortePrensa,
 *                      ChipIcono, CifraContada, Cronologia, Medidor.
 *   plan.ts            el plan COMO DATOS (TomaNoticia) + builder + validador.
 *   PistaNoticia.tsx   el intérprete de ese plan.
 *
 * La biblioteca general (`../graficos/`) SIGUE valiendo aquí: Subrayado, Rodea,
 * Aspa, Check, Flecha, Particulas y Glitch se usan tal cual sobre las tomas.
 * Lo único que NO se reusa son los tokens de color, porque aquél asume fondo
 * oscuro y este formato es claro.
 *
 * Guía humana: manuales/video-noticias/SKILL.md
 */

export * from "./theme-noticias";
export * from "./Editorial";
export * from "./plan";
export * from "./PistaNoticia";
