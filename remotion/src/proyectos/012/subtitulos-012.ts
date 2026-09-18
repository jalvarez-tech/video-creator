import type { Segmento } from "../../motor/segmentos";

/**
 * SUBTÍTULOS del proyecto 012 (avatar real · 30 fps · 835 f).
 *
 * Tiempos en SEGUNDOS, sacados de la transcripción por PALABRA de whisper.cpp
 * (`-ml 1`), no del guion: cada corte cae en una pausa real. Chunks de 2-4
 * palabras, que es lo que se lee de un vistazo en vertical.
 *
 * ⚠️ TRES CORRECCIONES a mano, porque whisper oyó mal y en pantalla va la forma
 * del guion. Las tres se comprobaron re-transcribiendo la cola del audio con
 * contexto:
 *   · «mandame un DÍA y ME hablemos»  → «mándame un DM y hablemos»
 *   · «salga AL próximo gran negocio» → «salga EL próximo gran negocio»
 *   · «Dios SE bendiga»               → «Dios TE bendiga»
 *
 * ⚠️ NO ESTÁN CONECTADOS A LA COMPOSICIÓN. El cliente pidió la pieza SIN
 * subtítulos, y esa decisión es también la que bajó todos los gráficos a la
 * banda inferior (R14): con la pista fuera, el carril del 72 % queda libre y es
 * donde el ojo ya espera leer. Volver a montarlos NO es una línea — obligaría a
 * devolver los moldes `sello`/`cta` a `franja`, porque anclan al 69,8 % y se
 * pisarían. Esto se queda por lo que sí sirve tal cual: subirlos como pista de
 * captions a la plataforma, donde no compiten con nada porque los pinta ella.
 *
 * Mismo criterio que `subtitulos-003.ts`, que tampoco está conectado.
 */
export const subtitulos012: Segmento[] = [
  // ── Hook · a quién le habla (0–7,6 s) ──
  { from: 0.0, to: 1.42, text: "Hola, este mensaje" },
  { from: 1.42, to: 2.34, text: "es para todas las" },
  { from: 2.34, to: 3.55, text: "personas del sector" },
  { from: 3.55, to: 4.48, text: "inmobiliario que" },
  { from: 4.48, to: 5.74, text: "tengan un lote" },
  { from: 5.74, to: 6.7, text: "o una oportunidad" },
  { from: 6.7, to: 7.62, text: "de inversión." },

  // ── Dónde y cuándo (7,6–12,2 s) ──
  { from: 7.62, to: 8.82, text: "El 17 y 18" },
  { from: 8.82, to: 9.89, text: "voy a estar en el" },
  { from: 9.89, to: 11.14, text: "APEX Inmobiliario" },
  { from: 11.14, to: 12.18, text: "en Cartagena," },

  // ── Con quién (12,2–17,1 s) ──
  { from: 12.18, to: 14.02, text: "conectando con brokers," },
  { from: 14.02, to: 15.69, text: "speakers y empresarios" },
  { from: 15.69, to: 17.09, text: "de más de 5 países." },

  // ── El pedido (17,1–22,8 s) ──
  { from: 17.09, to: 17.73, text: "Así que si" },
  { from: 17.73, to: 18.45, text: "tienes algo" },
  { from: 18.45, to: 19.44, text: "que valga la pena" },
  { from: 19.44, to: 20.22, text: "para poner" },
  { from: 20.22, to: 21.17, text: "sobre la mesa," },
  { from: 21.17, to: 22.01, text: "mándame un DM" },
  { from: 22.01, to: 22.79, text: "y hablemos." },

  // ── La promesa y el cierre (22,8–27,1 s) ──
  { from: 22.79, to: 23.53, text: "Tal vez de una" },
  { from: 23.53, to: 24.4, text: "conversación" },
  { from: 24.4, to: 24.91, text: "salga el" },
  { from: 24.91, to: 25.93, text: "próximo gran" },
  { from: 25.93, to: 26.5, text: "negocio." },
  { from: 26.5, to: 27.35, text: "Dios te bendiga." },
];
