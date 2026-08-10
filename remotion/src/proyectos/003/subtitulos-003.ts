/**
 * Subtítulos del proyecto 003 (avatar `avatar_2.mp4`, mundo líquido).
 * Tiempos en SEGUNDOS, sacados de los timestamps por token de
 * `proyectos/003/transcripcion.json` (whisper.cpp). Chunks de 3-4 palabras.
 *
 * ⚠️ NO están conectados a la comp `Avatar003`. La dirección de arte del cliente
 * (STYLE GUIDE) construye el mensaje con sellos tipográficos de palabra clave;
 * una banda de subtítulo corrido encima competiría con ellos y con la franja de
 * gráficos. Se dejan listos por si se quiere una versión con captions para
 * autoplay sin sonido — activarlos es UNA línea en `Avatar003.tsx`:
 *
 *   import { SubtitulosSync } from "../../motor/SubtitulosSync";
 *   import { subtitulos003 } from "./subtitulos-003";
 *   …
 *   <SubtitulosSync segmentos={subtitulos003} yPct={72} tamanoPx={50} />
 *
 * Texto CORREGIDO a mano donde whisper oyó mal (el clip dice "deshacerte LA
 * gente" y "nunca le volví a hablar"; en pantalla va la forma del guion).
 */
import type { Segmento } from "../../motor/segmentos";

export const subtitulos003: Segmento[] = [
  // A · Hook (0–5.6 s)
  { from: 0.02, to: 1.06, text: "Tu embudo no está" },
  { from: 1.06, to: 2.31, text: "hecho para venderle" },
  { from: 2.31, to: 2.95, text: "a la gente." },
  { from: 3.11, to: 4.2, text: "Está hecho para" },
  { from: 4.2, to: 5.6, text: "deshacerte de la gente." },

  // B · El dato: 100 clics → 95 (5.9–12.5 s)
  { from: 5.93, to: 6.6, text: "Suena feo," },
  { from: 6.6, to: 8.01, text: "pero es literal." },
  { from: 8.02, to: 9.06, text: "De cada 100" },
  { from: 9.13, to: 10.07, text: "clics que pagas," },
  { from: 10.31, to: 11.35, text: "95 no te" },
  { from: 11.75, to: 12.45, text: "compran nunca." },

  // C · Tesis: hace sólo tres cosas (12.7–17.1 s)
  { from: 12.66, to: 13.52, text: "Y el embudo no" },
  { from: 13.52, to: 15.25, text: "está para convencerlos." },
  { from: 15.53, to: 16.25, text: "Hace sólo" },
  { from: 16.25, to: 17.1, text: "tres cosas." },

  // D1 · Descarta (17.4–21.5 s)
  { from: 17.45, to: 17.9, text: "Descarta:" },
  { from: 17.98, to: 19.2, text: "decide quién es" },
  { from: 19.2, to: 20.11, text: "el comprador" },
  { from: 20.11, to: 21.45, text: "antes de que te escriba." },

  // D2 · Ordena (21.7–28.1 s)
  { from: 21.69, to: 22.14, text: "Ordena:" },
  { from: 22.14, to: 22.94, text: "el que pasa" },
  { from: 22.98, to: 24.25, text: "llega con contexto," },
  { from: 24.6, to: 25.9, text: "no con «buenas," },
  { from: 26.16, to: 28.1, text: "¿precio?»." },

  // D3 · Recupera (28.2–32.7 s)
  { from: 28.18, to: 28.91, text: "Y recupera:" },
  { from: 28.91, to: 30.34, text: "el que no está listo hoy" },
  { from: 30.34, to: 31.61, text: "no se pierde." },
  { from: 31.84, to: 32.65, text: "Se guarda." },

  // E · Revelación (32.9–39.9 s)
  { from: 32.91, to: 33.85, text: "Porque el que te" },
  { from: 33.94, to: 35.15, text: "compra este mes" },
  { from: 35.34, to: 36.4, text: "no te escribió" },
  { from: 36.4, to: 36.95, text: "hoy." },
  { from: 36.98, to: 37.85, text: "Te escribió" },
  { from: 37.85, to: 38.42, text: "hace tres meses" },
  { from: 38.46, to: 39.3, text: "y nunca le" },
  { from: 39.3, to: 39.9, text: "volviste a hablar." },

  // F · Remate (40.1–42.5 s)
  { from: 40.08, to: 41.28, text: "El embudo no vende." },
  { from: 41.46, to: 42.52, text: "Descarta." },

  // G · CTA (42.5–45.5 s)
  { from: 42.54, to: 43.18, text: "Escríbeme" },
  { from: 43.18, to: 43.64, text: "EMBUDO" },
  { from: 43.64, to: 44.24, text: "y te muestro" },
  { from: 44.24, to: 45.5, text: "cómo se vería en el tuyo." },
];
