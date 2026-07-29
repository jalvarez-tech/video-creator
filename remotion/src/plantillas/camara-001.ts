/**
 * PLAN DE CÁMARA del proyecto 001 (avatar 9:16 · 1080×1920 · 25 fps · 1091 frames).
 * Ejemplo trabajado — el equivalente a cues-001.ts (sonido) o subtitulos-001.ts.
 * Guía: manuales/camara-avatar/SKILL.md.
 *
 * Alineado al calendario REAL de MotionGraphicsFull.tsx. Ese componente hace
 * TOMAS A PANTALLA COMPLETA que ocultan al avatar en:
 *   200–330 · 330–395 · 395–468 · 520–660 · 660–800 · 800–905.
 * El avatar solo se ve en 0–200, 468–520 y 905–1091 (ahí SceneFollow es un overlay
 * de franja superior, el avatar queda debajo). Por eso la cámara SOLO se mueve en
 * esas ventanas y REPOSA bajo los gráficos: mover la cámara cuando ya hay un cambio
 * visual fuerte es esfuerzo perdido (SKILL §7 y §16).
 *
 * Frases/frames orientativos: alinéalos al guion real; cada movimiento debe caer
 * sobre una frase importante, no en medio de una palabra. Acople zoom↔desplazamiento
 * (camara.ts): un x grande exige más scale — estos cues se mantienen conservadores.
 */
import { cam, CameraCue } from "./camara";

export const camara001: CameraCue[] = [
  // ── Ventana avatar visible 0–200 ──
  // Hook: acercamiento corto durante la primera frase (SKILL §6). Sonido: soft-whoosh.
  cam("cam-hook", 0, 18, "close", { s: 1.0 }, { s: 1.16, y: -6 }, "ease-out", "hook",
    "El acercamiento refuerza la primera frase y crea un cambio visual en los primeros segundos.",
    { soundCueId: "cam-whoosh-hook" }),

  // Baja intensidad tras el hook: vuelve a plano medio para explicar.
  cam("cam-settle", 55, 82, "medium", { s: 1.16, y: -6 }, { s: 1.06, y: 0 }, "ease-in-out", "explanation",
    "Alejar tras el hook da contexto y descansa la vista antes del siguiente acercamiento."),

  // Pregunta: zoom sutil (SKILL §6).
  cam("cam-question", 120, 138, "close", { s: 1.06 }, { s: 1.14 }, "ease-out", "question",
    "Un acercamiento leve marca la pregunta y sostiene la atención en la respuesta."),

  // Prepara la cesión del frame: baja a base antes de que entre el bloque de gráficos.
  cam("cam-preseccion", 178, 196, "medium", { s: 1.14 }, { s: 1.03 }, "ease-in-out", "transition",
    "Alejar antes de la toma a pantalla completa calma la imagen antes de ceder el frame."),

  //   REPOSO 200–468 — tres escenas a pantalla completa ocultan al avatar (sin cues).

  // ── Ventana avatar visible 468–520 ──
  // Reentrada del avatar: primer plano + leve reencuadre lateral para recuperar atención.
  cam("cam-reentry", 476, 496, "close", { s: 1.03, x: 0 }, { s: 1.18, x: -22 }, "ease-out", "emphasis",
    "Al reaparecer el avatar, un primer plano con reencuadre lateral recupera la atención.",
    { soundCueId: "cam-whoosh-reentry" }),

  cam("cam-settle2", 500, 516, "medium", { s: 1.18, x: -22 }, { s: 1.06, x: 0 }, "ease-in-out", "explanation",
    "Volver a medio y centrar antes de la siguiente toma a pantalla completa."),

  //   REPOSO 520–905 — cuatro escenas a pantalla completa ocultan al avatar (sin cues).

  // ── Ventana avatar visible 905–1091 (CTA: SceneFollow es overlay superior) ──
  // CTA: acercamiento progresivo + baja al avatar para abrir la franja del botón (R08).
  cam("cam-cta", 965, 992, "close", { s: 1.05, y: 0 }, { s: 1.18, y: 16 }, "ease-out", "cta",
    "El acercamiento final concentra la atención en el CTA y abre headroom para el botón Seguir.",
    { soundCueId: "cam-whoosh-cta" }),
];
