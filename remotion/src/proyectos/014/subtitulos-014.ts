import type { Segmento } from "../../motor/segmentos";

/**
 * SUBTÍTULOS del proyecto 014 (avatar real · 30 fps · 1471 f).
 *
 * Tiempos en SEGUNDOS, sacados de la transcripción por PALABRA de whisper.cpp
 * (`-ojf`, `proyectos/014/transcripcion.json`), no del guion: cada corte cae
 * en una pausa real. Chunks de 2-5 palabras, que es lo que se lee de un vistazo
 * en vertical.
 *
 * ⚠️ TRES CORRECCIONES a mano sobre lo que oyó whisper:
 *   · «John ESEBAN Álvarez» → «John STEVANS Álvarez». El apellido compuesto lo
 *     da la identidad del propio cliente (autor del repo); whisper-small oye
 *     «Eseban» en tres pasadas. Un nombre propio en pantalla NO se reconstruye
 *     (aprendizaje del 013), así que queda marcado para que él lo confirme.
 *   · «una GENTE de inteligencia artificial» → «un AGENTE de inteligencia
 *     artificial» (contexto: lo dice tres veces más adelante con «el cual»).
 *   · «para que PIENSES a disfrutar» → «para que EMPIECES a disfrutar»
 *     (re-transcrito con contexto).
 * Y UNA corrección de lo que él DICE, declarada: en el 31,0 pronuncia «y tener
 * que llegar después de un largo día…», y por el sentido de la frase (que
 * cierra con «esto lo hace todo por ti») es «SIN tener que». En la caption va
 * el sentido; en la transcripción cruda queda lo literal.
 *
 * ⚠️ NO ESTÁN CONECTADOS A LA COMPOSICIÓN. Preferencia del cliente en sus
 * piezas de avatar (012, 013): sin subtítulos, y eso es lo que baja todos los
 * gráficos a la banda inferior (R14). Volver a montarlos NO es una línea:
 * obligaría a devolver el molde `sello` a `franja`. Esto se queda por lo que
 * sí sirve tal cual: subirlo como pista de captions a la plataforma, donde no
 * compite con nada porque los pinta ella. Se exporta con
 *   node manuales/edicion-video/scripts/exportar-srt.mjs remotion/src/proyectos/014/subtitulos-014.ts proyectos/014/finales/014-agente-ia.srt
 */
export const subtitulos014: Segmento[] = [
  // ── Presentación (0-2,8 s) ──
  { from: 0.0, to: 1.28, text: "Hola, mi nombre es" },
  { from: 1.28, to: 2.76, text: "John Stevans Álvarez" },

  // ── El problema (2,9-14 s) ──
  { from: 2.89, to: 4.72, text: "y quiero ayudarte" },
  { from: 4.72, to: 6.47, text: "a que el cuello de botella" },
  { from: 6.47, to: 8.0, text: "que tienes cuando" },
  { from: 8.0, to: 9.24, text: "grabas contenido," },
  { from: 9.24, to: 11.85, text: "cuando creas marketing," },
  { from: 11.85, to: 14.0, text: "sea más fácil para hacerlo." },

  // ── La solución (14-18,2 s) ──
  { from: 14.0, to: 15.21, text: "Por eso he creado" },
  { from: 15.21, to: 16.07, text: "un agente de" },
  { from: 16.07, to: 18.18, text: "inteligencia artificial," },

  // ── Lo que hace (18,2-31 s) ──
  { from: 18.19, to: 19.16, text: "el cual hace" },
  { from: 19.16, to: 21.19, text: "que tus vídeos como estos" },
  { from: 21.19, to: 22.92, text: "los subas y automáticamente" },
  { from: 22.92, to: 24.16, text: "le pongas subtítulos," },
  { from: 24.16, to: 25.54, text: "le pongas imágenes" },
  { from: 25.54, to: 27.0, text: "de bancos gratuitos" },
  { from: 27.0, to: 28.7, text: "y puedas publicarlos" },
  { from: 28.7, to: 31.0, text: "en minutos en redes sociales" },

  // ── Lo que dejas de hacer (31-40 s) ──
  { from: 31.0, to: 31.92, text: "sin tener que llegar" },
  { from: 31.92, to: 33.21, text: "después de un largo día" },
  { from: 33.21, to: 34.14, text: "de grabación" },
  { from: 34.14, to: 35.15, text: "a editar," },
  { from: 35.15, to: 37.0, text: "a mirar si la voz quedó bien" },
  { from: 37.0, to: 38.58, text: "o a mirar si las imágenes" },
  { from: 38.58, to: 40.0, text: "de dónde las voy a sacar." },

  // ── El giro y el remate (40-49 s) ──
  { from: 40.0, to: 41.55, text: "Esto lo hace todo por ti" },
  { from: 41.56, to: 42.61, text: "y te va a ayudar" },
  { from: 42.61, to: 43.92, text: "a ganar mucho tiempo" },
  { from: 43.92, to: 45.07, text: "para que empieces" },
  { from: 45.07, to: 46.38, text: "a disfrutar lo más" },
  { from: 46.38, to: 49.0, text: "importante de la vida." },
];
