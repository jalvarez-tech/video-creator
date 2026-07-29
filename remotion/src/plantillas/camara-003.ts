/**
 * PLAN DE CÁMARA del proyecto 003 (avatar 9:16 · 1080×1920 · **25 fps** · 1153 f).
 * Guía: manuales/camara-avatar/SKILL.md. Motor: camara.ts.
 *
 * fps y duración siguen las reglas del sistema: **el fps original del clip manda**
 * ([R01](../../../manuales/edicion-video/reglas.md), avatar 9:16 = 25 fps) y la
 * comp dura lo que dura el clip (director §5 · 1153 f = 46.12 s).
 *
 * La cámara pertenece a la velocidad LENTA de la pieza (la del fondo): empujes
 * largos, `ease-in-out`, sin rebote. Lo que entra de golpe es la tipografía, no
 * el encuadre — esa tensión es la firma del vídeo.
 *
 * REPOSA en las tomas de gráfico a pantalla completa (mundo-003 · TOMAS_GRAFICAS:
 * 198–313 · 433–495 · 539–601 · 703–764 · 819–995): ahí el avatar no se ve
 * (R09 · camara-avatar §7). En cada REENTRADA hay un cue de 1 frame que fija el
 * plano nuevo: el corte lo esconde y evita heredar el primer plano anterior.
 *
 * `y` POSITIVO baja el avatar. Con los sellos en la BANDA DE SUBTÍTULOS (y ≈ 1340)
 * eso sigue ayudando: al bajar la imagen, a esa altura de pantalla queda el torso
 * en vez de las manos, así que el texto cae sobre una zona más quieta.
 */
import { cam, CameraCue } from "./camara";

export const camara003: CameraCue[] = [
  // ── HOOK 0–198 · "Tu embudo no está hecho para venderle a la gente…" ──
  cam("cam-hook", 0, 92, "medium", { s: 1.0 }, { s: 1.09, y: 8 }, "ease-out", "hook",
    "Empuje lento sobre la primera afirmación; el desplazamiento en Y saca las manos de la banda de subtítulos, donde entra el sello.",
    { soundCueId: "cam-hook" }),
  cam("cam-deshacerte", 97, 132, "close", { s: 1.09, y: 8 }, { s: 1.17, y: 12 }, "ease-out", "emphasis",
    "'…deshacerte de la gente' (4.20 s) es la tesis del vídeo: el plano se cierra justo antes de la palabra.",
    { soundCueId: "cam-deshacerte" }),

  //   REPOSO 198–313 — toma de gráfico: 100 clics → 95 se van.

  // ── TESIS 313–433 · "no está para convencerlos. Hace sólo tres cosas." ──
  cam("cam-reentrada-tesis", 313, 314, "medium", { s: 1.02 }, { s: 1.02 }, "linear", "transition",
    "Reentrada tras el dato: el corte fija un plano más abierto para que el empuje siguiente tenga recorrido."),
  cam("cam-tesis", 318, 417, "medium", { s: 1.02 }, { s: 1.12, y: 10 }, "ease-in-out", "explanation",
    "Empuje largo que aterriza en 'hace sólo TRES COSAS' (16.25 s), justo cuando entra el sello con las tres barras.",
    { soundCueId: "cam-vuelta-dato" }),

  //   REPOSO 433–495 — tarjeta 01 DESCARTA.

  // ── DESCARTA (explicación) 495–539 ──
  cam("cam-reentrada-descarta", 495, 496, "medium", { s: 1.06, y: 6 }, { s: 1.06, y: 6 }, "linear", "transition",
    "Reentrada tras la tarjeta 01."),
  cam("cam-descarta", 500, 537, "close", { s: 1.06, y: 6 }, { s: 1.14, y: 12 }, "ease-in-out", "emphasis",
    "'…antes de que te escriba' cierra la idea de filtro: el plano se cierra con ella."),

  //   REPOSO 539–601 — tarjeta 02 ORDENA.

  // ── ORDENA (explicación) 601–703 ──
  cam("cam-reentrada-ordena", 601, 602, "medium", { s: 1.03 }, { s: 1.03 }, "linear", "transition",
    "Reentrada tras la tarjeta 02, plano más abierto para el tramo largo."),
  cam("cam-ordena", 608, 698, "close", { s: 1.03 }, { s: 1.14, y: 12 }, "ease-in-out", "explanation",
    "Tramo largo ('no con buenas, ¿precio?'): un solo empuje continuo sostiene la atención sin cortes.",
    { soundCueId: "cam-vuelta-ordena" }),

  //   REPOSO 703–764 — tarjeta 03 RECUPERA.

  // ── RECUPERA (explicación) 764–819 ──
  cam("cam-reentrada-recupera", 764, 765, "medium", { s: 1.05, y: 6 }, { s: 1.05, y: 6 }, "linear", "transition",
    "Reentrada tras la tarjeta 03."),
  cam("cam-guarda", 770, 815, "close", { s: 1.05, y: 6 }, { s: 1.15, y: 12 }, "ease-in-out", "emphasis",
    "'no se pierde, SE GUARDA' (31.98 s) es el giro positivo del bloque: el plano se cierra sobre él."),

  //   REPOSO 819–995 — revelación: la línea de tiempo rota.

  // ── REMATE + CTA 995–1153 ──
  cam("cam-reentrada-remate", 995, 996, "medium", { s: 1.04 }, { s: 1.04 }, "linear", "transition",
    "Reentrada tras la revelación: plano abierto para que el remate tenga a dónde cerrar.",
    { soundCueId: "cam-vuelta-remate" }),
  cam("cam-remate", 998, 1052, "close", { s: 1.04 }, { s: 1.16, y: 14 }, "ease-in-out", "emphasis",
    "'El embudo no vende. DESCARTA.' — el cierre del plano acompaña el remate de la tesis."),
  cam("cam-cta", 1063, 1108, "close", { s: 1.16, y: 14 }, { s: 1.21, y: 18 }, "ease-in-out", "cta",
    "Acercamiento final muy corto y luego avatar ESTABLE: la atención pasa al campo con la palabra EMBUDO.",
    { soundCueId: "cam-cta" }),
];
