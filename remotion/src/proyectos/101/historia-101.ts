/**
 * HISTORIA 101 — «Un proceso» (9:16, MAS Estrellitas 2026). UNA toma: la niña de moño alto pregunta «¿Cómo va tu relación
 * con Cristo?» y la de gafas responde que es un proceso, que a veces se siente cerca y a veces lejos, y que se aferra a la
 * verdad de Cristo (VT07, el testimonio más fuerte del material). Después, el cierre en papel. Plan: `proyectos/101/artefactos/`.
 *
 * Datos puros: la puerta (`proyectos/101/revisar-historias.mjs 101`) y `medir-voces.mjs` lo cargan con node.
 * `desde` en SEGUNDOS de la fuente normalizada (`remotion/public/mas-101/`); `en` y `dur` en frames de la comp (30 fps).
 */
import { audioDeHistoria } from "./historia";
import type { Historia } from "./historia";
import { VOCES_101 } from "./voces-101";

const DUR_TOMA = 444;

export const HISTORIA_101: Historia = {
  numero: "101",
  composicion: "Historia101",
  titulo: "Un proceso",
  duracion: DUR_TOMA + 180,
  cierre: DUR_TOMA,
  cortes: [
    {
      id: "p01-vt07",
      src: "mas-101/vt07.mp4",
      desde: 3.8,
      en: 0,
      dur: DUR_TOMA + 12,
      zoom: [1, 1.08],
      reason:
        "UNA toma, de corrido, de 3,8 a 18,6 s: la pregunta (3,96-5,3), el barrido de la cámara hacia la que responde (5,0-5,85; se lee como lo que es, la cámara que se vuelve hacia ella) y el testimonio entero, con un acercamiento lento; sigue 12 f bajo el papel que sube (hasta 19,0 s, solo imagen). El ritual del micro y su posible nombre («[nombre]», 0,5-2,9 s) quedan fuera; el «Bueno, aquí está mi… ¡chao!» de 18,9 s, también",
    },
  ],
  voces: [
    {
      id: "voz-pregunta",
      src: "mas-101/vt07.wav",
      desde: 3.8,
      en: 0,
      dur: 55,
      entra: 2,
      sale: 4,
      reason: "«¿Cómo va tu relación con Cristo?» (3,96-5,3 s): llega 19 dB más alta que el testimonio y va en su propio tramo",
    },
    {
      id: "voz-testimonio",
      src: "mas-101/vt07.wav",
      desde: 3.8 + 55 / 30,
      en: 55,
      dur: DUR_TOMA - 55,
      entra: 3,
      sale: 6,
      reason: "El testimonio (5,93-17,93 s) en la MISMA toma (f = (s − 3,8) × 30), con su ganancia; acaba en 18,6, antes del «Bueno…» de 18,9",
    },
  ],
  arriba: [
    { id: "a-pregunta", en: 0, sale: 444, texto: "«¿Cómo va tu relación con Cristo?»", reason: "La pregunta, en f0 (miniatura y gancho) y durante todo el testimonio. «va» o «está»: POR CONFIRMAR de oído (whisper con palabras oye «a», que apunta a «va»)" },
  ],
  abajo: [
    { id: "b1", en: 62, sale: 163, texto: "«Mi relación con Cristo es un *proceso*.»", marcas: [{ tipo: "subrayado", en: 138 }], reason: "Mi (voz f64) … proceso (f135-160)" },
    { id: "b2", en: 163, sale: 278, texto: "«Hay veces siento que estamos *cerquitas*,»", marcas: [{ tipo: "subrayado", en: 260 }], reason: "hay (f163) … cerquitas (f257)" },
    { id: "b3", en: 278, sale: 322, texto: "«pero hay veces siento que me *alejo*,»", marcas: [{ tipo: "subrayado", en: 313 }], reason: "pero (f278) … alejo (f312)" },
    { id: "b4", en: 322, sale: 438, texto: "«entonces trato de *aferrarme* a la verdad de Cristo.»", marcas: [{ tipo: "subrayado", en: 352 }], reason: "entonces (f323) … Cristo (f413; la voz acaba en f424)" },
  ],
  musica: {
    titulo: "Here For You",
    src: "mas-101/musica-here-for-you.wav",
    desde: 140.1,
    lufs: -11.6,
    reason: "«Here For You» (Armin van Buuren, piano: ternura, consuelo, esperanza) desde 140,10 s, el punto de entrada de 30 s del catálogo (★★★): su clímax llega hacia +19 s, cuando acaba el testimonio y entra el papel",
  },
};

export const audio101 = audioDeHistoria(HISTORIA_101, VOCES_101);

/** El `Corte[]` suelto, para la puerta genérica del montaje (`revisar-metraje.mjs` busca un export que lo sea). */
export const metraje101 = HISTORIA_101.cortes;
