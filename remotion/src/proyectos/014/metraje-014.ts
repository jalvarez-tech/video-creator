import type { Corte } from "../../motor/metraje";

/**
 * LOS INSERTOS DE B-ROLL — proyecto 014 (30 fps · 1471 f). 3.ª pasada.
 *
 * Encargo: «agrega imágenes que complementen lo que estoy hablando en momentos
 * estratégicos». Artefactos: proyectos/014/artefactos/01-plan.md §B-roll.
 *
 * NO ES UNA LÍNEA DE TIEMPO, y por eso no pasa `lineaDeTiempo()` de la puerta
 * del formato: entre inserto e inserto no hay hueco, hay ÉL. `<PistaMetraje>`
 * monta cada corte en su <Sequence> y fuera de ellas no pinta nada, así que el
 * avatar de debajo se ve. Su <OffthreadVideo> sigue montado los 1471 frames: la
 * voz no se corta nunca (R10). La puerta propia es `proyectos/014/revisar-014.mjs`.
 *
 * CUATRO MOMENTOS, SEIS PLANOS, ~13 s de 49 (27 %). Cada uno ilustra la frase
 * que se está diciendo, nunca el tema en general:
 *
 *   1. el problema     «cuando grabas contenido, cuando creas marketing»  (2 planos)
 *   2. lo que hace     «le pongas imágenes de bancos gratuitos»          (1 plano)
 *   3. lo que ya no    «a editar, a mirar si la voz quedó bien»          (2 planos)
 *   4. el cierre       «lo más importante de la vida»                    (1 plano)
 *
 * Lo que se queda en SU CARA, a propósito: el hook (el f0 es la miniatura), la
 * presentación del agente («Por eso he creado…», su producto no tiene
 * referente filmable y un plano de stock de «IA» sería mentir sobre él), el
 * respiro en que señala a cámara, «publicarlos en minutos en redes sociales»
 * (es la promesa del hook dicha por él) y el giro «Esto lo hace todo por ti».
 *
 * LOS CORTES CAEN EN LOS GOLPES QUE YA EXISTÍAN. Cada entrada y cada salida es
 * una palabra de la transcripción o el aterrizaje de un ítem de las listas
 * (`ANCLAS_014`), así que el cambio de plano y el sonido del texto son el mismo
 * evento. Corte seco en todos: con esta densidad de rótulos, una disolvencia
 * se leería como un efecto más.
 *
 * EL GRADO: la referencia es ÉL, no la mediana del b-roll. `bancos.py gradar`
 * iguala los clips ENTRE SÍ (mediana: luma 86), que es lo correcto cuando todo
 * es metraje de banco; aquí cada inserto corta desde y hacia su clip (luma 122,
 * saturación 8,6, cálido), así que cada uno se acerca a él la MITAD de la
 * distancia, con los topes de `gradar` (exposición 0,80-1,25, saturación
 * 0,85-1,20). La mitad y no el todo porque los planos de noche (i5, la voz) y el
 * atardecer (i6) son oscuros por lo que cuentan: igualarlos del todo los
 * lavaría. Tabla completa en 01-plan.md.
 *
 * EL ENCUADRE: el texto vive en la banda inferior (desde y = 1340, con velo
 * desde 1020), así que el SUJETO de cada plano tiene que caer por encima. Donde
 * no cae solo, se sube con `pan` y el zoom mínimo que lo cubre (|pan| ≤
 * 50·(zoom − 1), §encuadre de `corte.ts`). Ninguno pasa de 1,21.
 */

/** Frames en que TIENE que caer cada corte: una palabra o el aterrizaje de un texto del plan. */
export const ANCLAS_014: readonly { frame: number; que: string; texto?: string }[] = [
  { frame: 240, que: "«grabas» (8,00 s)" },
  { frame: 299, que: "«creas» (9,97 s)" },
  { frame: 349, que: "aterriza el chip, 7 f antes de «más fácil»", texto: "QUE SEA MÁS FÁCIL" },
  { frame: 736, que: "aterriza el ✓, 8 f antes de «imágenes»", texto: "Imágenes de bancos gratuitos" },
  { frame: 822, que: "aterriza el ✓, 8 f antes de «publicarlos»", texto: "Publicado en redes en minutos" },
  { frame: 1016, que: "aterriza el ✗, 8 f antes de «editar»", texto: "Editar" },
  { frame: 1051, que: "aterriza el ✗, 6 f antes de «mirar si la voz»", texto: "Revisar si la voz quedó bien" },
  { frame: 1108, que: "aterriza el ✗, 6 f antes de «mirar si las imágenes»", texto: "Buscar de dónde sacar imágenes" },
  { frame: 1373, que: "aterriza el titular del remate, 4 f antes de «lo más»", texto: "Lo más importante" },
  { frame: 1471, que: "fin de la pieza" },
];

export const insertos014: readonly Corte[] = [
  // ── 1 · el problema ─────────────────────────────────────────────────────────
  {
    id: "i1-grabar",
    src: "broll/014/b01-grabar-smartphone-tripod-recording-close-up.mp4",
    desde: 9.0,
    en: 240,
    dur: 59,
    // El móvil ocupa del 20 al 73 % y el botón rojo cae en el 62: `pan` 5 lo
    // sube 96 px, fuera del arranque del velo. 1,11 es el mínimo que lo cubre.
    zoom: [1.11, 1.16],
    pan: 5,
    grado: { exposicion: 0.869, saturacion: 1.2, calido: 0.028 },
    reason:
      "«cuando GRABAS contenido»: el móvil en su estabilizador con el botón rojo de grabar. Entra sobre la palabra y es el primer cambio de plano de la pieza, a los 8 s: rompe diez segundos de él a cámara justo cuando nombra el problema",
  },
  {
    id: "i2-marketing",
    src: "broll/014/b02-marketing-content-plan-calendar-close-up.mp4",
    desde: 4.0,
    en: 299,
    dur: 50,
    // El planificador está en la mitad BAJA (cabecera en el 53 %): `pan` 8 la
    // sube al 45 % y deja la mano con el bolígrafo por encima del kicker.
    zoom: [1.17, 1.21],
    pan: 8,
    grado: { exposicion: 1.25 },
    reason:
      "«cuando CREAS marketing»: unas manos rellenando un planificador de contenidos. Sale en f349, cuando aterriza «QUE SEA MÁS FÁCIL»: la solución vuelve a su cara",
  },

  // ── 2 · lo que hace el agente ───────────────────────────────────────────────
  {
    id: "i3-imagenes",
    src: "broll/014/b03-imagenes-photo-gallery-smartphone-scrolling-close.mp4",
    desde: 2.0,
    en: 736,
    dur: 86,
    // 1440×2732: hasta ×1,33 hay píxeles reales. El móvil baja hasta el 66 %:
    // `pan` 4 lo sube encima del kicker.
    zoom: [1.09, 1.14],
    pan: 4,
    grado: { exposicion: 1.135, saturacion: 0.893, calido: 0.028 },
    reason:
      "«le pongas IMÁGENES de bancos gratuitos»: una rejilla de fotos pasando en el móvil, sin ningún banco concreto a la vista. Entra con el ✓ de «Imágenes» y sale con el ✓ de «Publicado»: el tercer beneficio, publicar en minutos, lo dice él a cámara porque es la promesa del hook",
  },

  // ── 3 · lo que ya no haces ──────────────────────────────────────────────────
  {
    id: "i4-editar",
    src: "broll/014/b05-editar-video-editing-software-screen-close-up.mp4",
    // De 0 a 1,17 s: de espaldas. A partir del 2,5 se gira a cámara y se le ve
    // la cara, así que este plano NO se puede alargar ni mover hacia delante.
    desde: 0.0,
    en: 1016,
    dur: 35,
    zoom: [1.0, 1.04],
    grado: { exposicion: 1.25, saturacion: 0.85 },
    reason:
      "«a EDITAR»: de espaldas frente a un editor de vídeo, con las pantallas en la mitad alta. Entra con el ✗ de «Editar»: el clic que tacha la tarea es también el corte",
  },
  {
    id: "i5-voz",
    src: "broll/014/b06-voz-video-editing-timeline-close-up.mp4",
    desde: 8.0,
    en: 1051,
    dur: 57,
    zoom: [1.0, 1.05],
    grado: { exposicion: 1.25 },
    reason:
      "«a mirar si la VOZ quedó bien»: de noche, con las manos en los cascos, frente a una pista de voz. Entra con el ✗ de «Revisar si la voz» y sale con el tercero: «de dónde las voy a sacar» lo cuenta él",
  },

  // ── 4 · el cierre ───────────────────────────────────────────────────────────
  {
    id: "i6-vida",
    src: "broll/014/b07-vida-holding-hands-sunset-close-up.mp4",
    desde: 4.0,
    en: 1373,
    dur: 98,
    // Las cabezas en el 35 % y las manos en el 60: el remate cae sobre las
    // piernas y el suelo, que en silueta son negro.
    zoom: [1.0, 1.06],
    grado: { exposicion: 1.16, saturacion: 1.172, calido: 0.026 },
    reason:
      "«lo más importante de la VIDA»: una pareja de la mano, en silueta, contra el atardecer. Entra con el titular «Lo más importante / LA VIDA» y se queda hasta el último frame; el reel vuelve al f0, donde está él",
  },
];
