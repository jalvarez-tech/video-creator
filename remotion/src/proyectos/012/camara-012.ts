import { cam, CameraCue } from "../../motor/camara";

/**
 * PLAN DE CÁMARA — proyecto 012 (1080×1920 · 30 fps · 835 f).
 * Guía: manuales/camara-avatar/SKILL.md · artefacto: 03-timeline.md.
 *
 * ESTILO «LUJO» (director §4): lento, muy sutil, pocos cambios. TRES
 * movimientos en 28 s, ninguno de más de 40 f. Un vídeo que dice que va a un
 * evento de inversión no se mueve como un reel de producto.
 *
 * `x`/`y` = 0 siempre: su cara ya está centrada en el encuadre y desplazar sin
 * más zoom la sacaría (R09). El clip normalizado es de 1296×2304 —1080 × 1,2—,
 * así que hasta `s: 1.2` el punch-in consume píxeles REALES y no interpolados.
 *
 * REPOSO bajo las dos tomas a pantalla completa (f297-368 y f470-532): mover la
 * cámara debajo de algo que la tapa es esfuerzo que nadie ve, y el validador
 * del núcleo lo avisa por su nombre («la cámara se mueve bajo una toma que
 * cubre»). Reposa también bajo el hook, que es el hero de los primeros 7 s.
 */
export const camara012: CameraCue[] = [
  // Saludo: el empujón inicial saca al clip de la quietud de un selfie de móvil.
  // Termina en f26, antes de que el kicker del hook entre en f53.
  cam("cam-hook", 0, 26, "medium", { s: 1.0 }, { s: 1.06 }, "ease-out", "hook",
    "«Hola, este mensaje es para…»: acercar en el saludo dice que hay un anuncio, no una charla.",
    { soundCueId: "s-cam-hook" }),

  //   REPOSO 26–368 — el hook, la fecha y la pantalla de Cartagena mandan.

  // Vuelve del corte de Cartagena: el plano se abre un punto al reaparecer él,
  // para que el regreso al avatar se note sin un movimiento propio.
  cam("cam-vuelta", 374, 404, "medium", { s: 1.06 }, { s: 1.0 }, "ease-in-out", "make-space",
    "Tras la toma de Cartagena, abrir plano devuelve el aire y prepara la lista de con quién va a estar.",
    { soundCueId: "s-cam-vuelta" }),

  //   REPOSO 404–596 — la lista y la pantalla de los 5 países mandan.

  // El pedido. Es la única frase que le pide algo a quien mira, y es la única
  // que se acompaña acercándose: termina en f632, tres frames antes de «mándame».
  cam("cam-cta", 596, 632, "close", { s: 1.0 }, { s: 1.12 }, "ease-out", "cta",
    "«Si tienes algo que valga la pena»: el punch-in llega a su cara justo cuando pide el DM.",
    { soundCueId: "s-cam-cta" }),

  //   REPOSO 632–835 — se queda en 1.12 para el CTA, el remate y la despedida:
  //   el plano más cerrado de la pieza sostiene la parte más personal.
];
