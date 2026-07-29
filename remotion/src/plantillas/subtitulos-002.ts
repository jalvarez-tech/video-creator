/**
 * Subtítulos del proyecto 002 (avatar `avatar_1.mp4`, estilo Apple).
 * Chunks cortos (3-4 palabras) sincronizados con la voz. Tiempos en SEGUNDOS.
 * Base: proyectos/002/transcripcion.json (whisper.cpp, 6 segmentos) repartidos
 * por palabra dentro de cada frase. Clip: 25 fps · 883 frames · 35.3 s.
 *
 * OJO: este clip es una versión CONDENSADA del guion — NO incluye el párrafo
 * "los primeros 5 minutos / es de tu competencia". Los subtítulos siguen lo que
 * realmente se dice.
 */
import type { Segmento } from "./subtitulos-001";

export const subtitulos002: Segmento[] = [
  // A · Hook (0–6.24 s)
  { from: 0.0, to: 1.6, text: "Tu anuncio no está" },
  { from: 1.6, to: 2.5, text: "fallando." },
  { from: 2.5, to: 3.7, text: "Lo que falla es" },
  { from: 3.7, to: 4.9, text: "lo que pasa después del clic." },
  { from: 4.9, to: 6.24, text: "Pagas la pauta, entran" },
  // B · El embudo 200 → 3 (6.24–13.2 s)
  { from: 6.24, to: 8.0, text: "200 personas a ver" },
  { from: 8.0, to: 9.5, text: "el apartamento," },
  { from: 9.5, to: 11.2, text: "y a tu WhatsApp llegan 3" },
  { from: 11.2, to: 12.6, text: "preguntando por el precio." },
  { from: 12.6, to: 13.2, text: "Y de esos 3…" },
  // C · Cero + mitos (13.2–19.52 s)
  { from: 13.2, to: 14.7, text: "ninguno agenda visita." },
  { from: 14.7, to: 16.0, text: "No es el algoritmo," },
  { from: 16.0, to: 18.0, text: "no es que la gente" },
  { from: 18.0, to: 19.0, text: "no esté comprando." },
  { from: 19.0, to: 19.52, text: "Es que estás" },
  // D · Tráfico caliente → sitio frío (19.52–25.58 s)
  { from: 19.52, to: 21.3, text: "mandando tráfico caliente" },
  { from: 21.3, to: 22.8, text: "a un sitio frío," },
  { from: 22.8, to: 24.3, text: "y después no hay nadie" },
  { from: 24.3, to: 25.58, text: "detrás haciendo seguimiento." },
  // E · Pregunta CTA (25.58–31.44 s)
  { from: 25.58, to: 27.2, text: "Una pregunta honesta:" },
  { from: 27.2, to: 29.2, text: "¿cuántos leads calificados" },
  { from: 29.2, to: 31.44, text: "llegan a tu WhatsApp?" },
  // F · Comentario CTA (31.44–34.64 s)
  { from: 31.44, to: 33.2, text: "Déjame el número real" },
  { from: 33.2, to: 35.3, text: "en los comentarios." },
];
