import { cue, resolveSound, SoundCue, TipoSonido, VarianteSonido } from "../../motor/sound/cues";

/**
 * PLAN DE SONIDO — proyecto 014 (30 fps · 1471 f).
 * Guía: manuales/diseno-sonoro/SKILL.md · artefacto: 03-timeline.md.
 *
 * EL ENCARGO ES LITERAL: «efectos de sonido cuando entren los textos». Así que
 * hay UN sonido por cada entrada de texto —relevos de toma, ítems de lista,
 * chip y segunda línea— y ninguno en otro sitio: no hay cámara que sonorizar.
 * Desde la 3.ª pasada hay un cue más, el único que no es de texto: la entrada
 * del b-roll en f240 (las demás entradas de imagen caen en un texto que ya
 * suena). Dieciocho cues en 49 s.
 *
 * ESTILO «REDES / TECNOLÓGICO LIMPIO» (director §4, diseno-sonoro §7): la
 * pieza vende un agente de IA a creadores de contenido, no un evento de lujo.
 * Familias: `whoosh` para los relevos de toma (movimiento), `pop` para lo que
 * aterriza elástico (chip, ✓, segunda línea), `mouse` para los ✗ (tachar
 * tareas de una lista, que es lo que significan), `chime` para las dos
 * llegadas positivas (la solución y el giro). Sin glitch, sin impacts
 * cinematográficos, sin sonidos de premio en el cierre: el remate suena IGUAL
 * que cualquier otra tarjeta (criterio del 012 y del 013).
 *
 * NO HAY CUE EN EL f0. El hook ya está PUESTO en el primer frame (R23) —es la
 * miniatura— y no entra: un whoosh sobre algo que no se mueve es decoración.
 * NO HAY CUE EN EL f560 (el respiro): cuando el texto SALE no suena nada.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * LO QUE ESTA PIEZA MIDIÓ Y NADIE HABÍA MEDIDO: LOS SFX NO SE OÍAN.
 *
 * La primera prueba 720p dio un delta de RMS de **±0,5 dB** en las diecisiete
 * ventanas de cue frente al clip sin SFX: enterrados. Se sospechó del nivel
 * (la voz va a −17,7 LUFS y sin pausas) y se subieron 6 dB: **mismo resultado**.
 * La causa estaba en el ARCHIVO, no en el volumen. `cue()` sincroniza el
 * «momento reconocible» suponiendo dónde cae dentro del archivo —whoosh: al
 * 65 % de la duración del CUE; impact/click: en el primer frame— y la
 * <Sequence> corta el archivo a `durationInFrames`. Pero el banco no está
 * recortado. Medido con `manuales/diseno-sonoro/medir-sfx.py` (RMS por frame):
 *
 *   | archivo               | pico   | audible (−20 dB) | lo que reproducía un cue de la casa |
 *   |-----------------------|--------|------------------|-------------------------------------|
 *   | pop.mp3               | f17    | f17-f20          | f0-f7: SILENCIO                     |
 *   | chime-02.mp3          | f25    | f23-f41          | f0-f17: SILENCIO                    |
 *   | click-mouse-02/03.mp3 | f31    | f30-f34          | f0-f5: SILENCIO                     |
 *   | whoosh-light-02.wav   | f34    | f20-f46          | f0-f11: SILENCIO                    |
 *   | whoosh-light.wav      | f14    | f8-f22           | f0-f11: el arranque, sin el pico    |
 *   | swoosh.mp3            | f17    | f3-f30           | f0-f11: la mitad, sin el pico       |
 *
 * O sea que un `pop` de 8 frames, que es EL sonido de aterrizaje del sistema,
 * no sonaba nunca; y de cada pool, la variante alterna que se elige para no
 * repetir archivo era justo la que tenía el golpe a un segundo. Nada lo
 * avisa: el plan sale limpio y el render lleva pista de audio.
 *
 * AQUÍ se resuelve por pieza, sin tocar el motor: `PICO` guarda el frame del
 * golpe y el fin de la parte audible de cada archivo usado, y `sfx()` escribe
 * `startFrame = target − pico` y `durationInFrames = fin + cola`, con un
 * fundido de salida para que el corte de la <Sequence> no haga clic. El
 * arreglo general —medir los 39 archivos y guardar `pico` en `SFX`/`POOL`
 * para que `startFromTarget` lo use— toca las piezas ya publicadas, así que
 * es una decisión aparte (queda en aprendizajes.md).
 *
 * Y EL NIVEL, que era la SEGUNDA mitad del problema. Ya alineados, los `vol`
 * de fábrica —calibrados por pico de MUESTRA— dejaban los whooshes a −29 dBFS
 * de RMS y los clics a −35/−38 bajo una voz continua a −17,7 LUFS y sin una
 * pausa de más de medio segundo: seguían sin oírse (medido, ±0,4 dB). Aquí el
 * volumen de cada cue sale del RMS medido de SU archivo y de un objetivo por
 * familia (`OBJETIVO_RMS`), sin `underDialogue` (todos caen sobre palabras a
 * propósito: es el encargo) y con `duckDb={0}` en la pista. Sigue mandando la
 * voz: sus picos están en −3,7 dBFS, sus RMS en −17/−22, y los golpes quedan
 * de 2 a 5 dB por debajo de ese RMS. Medido en la prueba 720p definitiva:
 * 03-timeline.md. Si en el móvil suenan fuertes, se baja el objetivo; es un
 * número, no una estructura.
 * ─────────────────────────────────────────────────────────────────────────
 */

/**
 * Frame del GOLPE, fin de la parte audible y RMS del golpe (33 ms, dB sobre
 * fondo de escala del archivo crudo) de cada archivo usado. Medidos con
 * `medir-sfx.py`, 30 fps. El RMS es lo que decide el volumen: ver `sfx()`.
 */
const PICO: Record<string, { pico: number; fin: number; rms: number }> = {
  "whoosh-light.wav": { pico: 14, fin: 22, rms: -10.7 },
  "whoosh-light-02.wav": { pico: 34, fin: 46, rms: -11.7 },
  "whoosh-light-03.wav": { pico: 3, fin: 4, rms: -6.1 },
  "swoosh.mp3": { pico: 17, fin: 30, rms: -10.3 },
  "swoosh-02.wav": { pico: 18, fin: 24, rms: -14.6 },
  "swoosh-03.wav": { pico: 12, fin: 15, rms: -18.3 },
  "pop.mp3": { pico: 17, fin: 20, rms: -13.8 },
  "pop-02.mp3": { pico: 4, fin: 6, rms: -28.8 },
  "pop-03.mp3": { pico: 4, fin: 4, rms: -24.7 },
  "chime.mp3": { pico: 10, fin: 29, rms: -13.2 },
  "chime-02.mp3": { pico: 25, fin: 41, rms: -13.2 },
  "click-mouse.mp3": { pico: 2, fin: 5, rms: -21.6 },
  "click-mouse-02.mp3": { pico: 31, fin: 34, rms: -22.2 },
  "click-mouse-03.mp3": { pico: 31, fin: 34, rms: -22.8 },
  "ui.mp3": { pico: 2, fin: 3, rms: -20.8 },
};

/** Frames de cola tras el fin audible, con fundido: el corte no hace clic. */
const COLA = 6;

/**
 * A QUÉ NIVEL SUENA CADA FAMILIA, en dBFS de RMS (33 ms) en el frame del golpe.
 *
 * La calibración de fábrica iguala el PICO DE MUESTRA de cada archivo (whoosh
 * −27, generales −21 dBFS), y un pico de muestra no dice cuánto se OYE: un
 * clic tiene el pico 17 dB por encima de su RMS, un whoosh 10-16 dB. Medido
 * con esa calibración (ya alineados los golpes): whoosh light a −29 dBFS de
 * RMS, pop-02 a −33, clics a −35/−38 — bajo una voz cuyo RMS ronda los
 * −17/−22, de 7 a 16 dB por debajo. Los dos timbres (chime, −24/−26) eran los
 * únicos que asomaban en la medida, y es exactamente lo que se oía.
 *
 * Aquí el objetivo es lo que se OYE: el RMS del golpe se pone de 2 a 5 dB por
 * debajo del RMS típico de la voz (−20), y el volumen de cada cue sale de la
 * medida de SU archivo, no de un vol de tabla. Los clics van más bajos porque
 * son los más espigados (pico de muestra 17 dB sobre el RMS: a −27 de RMS su
 * pico queda en −10 dBFS, aún bajo los −3,7 de la voz). Nunca por encima de 1:
 * lo que no llega con el archivo a tope (pop-02) se sustituye por otra
 * variante del pool, no se amplifica.
 */
const OBJETIVO_RMS: Record<TipoSonido, number> = { whoosh: -24, impact: -24, click: -27, riser: -24, texture: -30 };

/**
 * Un cue alineado al archivo REAL: el golpe cae en `target`, la <Sequence>
 * cubre toda la parte audible, y el volumen lleva el golpe al objetivo de su
 * familia.
 */
const sfx = (
  id: string,
  type: TipoSonido,
  variant: VarianteSonido,
  target: number,
  reason: string,
  opts: { variantIndex?: number; priority?: SoundCue["priority"] } = {}
): SoundCue => {
  const { file } = resolveSound(variant, opts.variantIndex);
  const p = PICO[file];
  if (!p) throw new Error(`cues-014: ${file} no está medido en PICO — pásalo por medir-sfx.py`);
  return cue(id, type, variant, target, p.fin + COLA, reason, {
    variantIndex: opts.variantIndex,
    priority: opts.priority ?? "low",
    startFrame: target - p.pico,
    fadeOutFrames: COLA,
    volume: Math.min(1, Math.pow(10, (OBJETIVO_RMS[type] - p.rms) / 20)),
  });
};

export const cues014: SoundCue[] = [
  // ── g02 · el problema (relevo del hook) ──
  sfx("s-problema", "whoosh", "light", 159, "Entra «El cuello de botella» sobre la palabra «cuello»: relevo del hook."),
  // 3.ª pasada: el b-roll entra en f240 sobre «grabas» y es la única entrada de
  // imagen que no coincide con un texto. Un toque de interfaz y no un whoosh:
  // lo que aparece es un móvil GRABANDO, y el clic es el del botón de grabar.
  sfx("s-broll-grabar", "click", "ui", 240, "Entra el primer plano de b-roll —el móvil grabando— sobre «grabas»: el toque del botón de grabar."),
  // f349 y no 348: es el frame en que el plan pone el chip (159 + 190). Ahí
  // corta también el b-roll de vuelta a su cara (metraje-014.ts).
  sfx("s-mas-facil", "impact", "pop", 349, "Aterriza el chip «que sea más fácil», siete frames antes de «más fácil»; el b-roll vuelve a su cara en el mismo frame.", { variantIndex: 0 }),

  // ── g03 · la solución (el texto más importante: dos capas, no tres) ──
  sfx("s-agente", "whoosh", "swoosh", 455, "Entra «Un agente de inteligencia artificial» sobre «creado»: más cuerpo que un light porque es la revelación de la pieza.", { priority: "medium" }),
  sfx("s-agente-ok", "impact", "chime", 461, "El titular verde aterriza (escalera +6): un timbre positivo dice que esto es la solución, no otro problema.", { priority: "medium" }),

  // ── g04 · lo que hace (nace tras el respiro; un pop por ✓, sobre su palabra) ──
  sfx("s-hace", "whoosh", "light", 658, "Vuelve el texto tras el respiro, cuatro frames antes de «automáticamente» (f662).", { variantIndex: 1 }),
  // Los pops alternan pop.mp3 (0) y pop-03 (2). pop-02 queda FUERA: su golpe
  // mide −28,8 dB de RMS en crudo y ni a volumen 1 llega al objetivo.
  sfx("s-subtitulos", "impact", "pop", 693, "✓ Subtítulos, ocho frames antes de que diga «subtítulos» (f701).", { variantIndex: 2 }),
  sfx("s-imagenes", "impact", "pop", 736, "✓ Imágenes de bancos gratuitos, antes de «imágenes» (f744).", { variantIndex: 0 }),
  sfx("s-publicado", "impact", "pop", 822, "✓ Publicado en minutos, antes de «publicarlos» (f830).", { variantIndex: 2 }),

  // ── g05 · lo que dejas de hacer (relevo; un clic por ✗: tachar una tarea) ──
  sfx("s-sin", "whoosh", "light", 958, "Relevo a la lista de lo que ya no haces, sobre «después».", { variantIndex: 2 }),
  sfx("s-no-editar", "click", "mouse", 1016, "✗ Editar: un clic seco, como tachar la tarea de una lista. Antes de «editar» (f1024)."),
  sfx("s-no-voz", "click", "mouse", 1051, "✗ Revisar la voz, antes de «mirar si la voz» (f1057).", { variantIndex: 1 }),
  sfx("s-no-imagenes", "click", "mouse", 1108, "✗ Buscar imágenes, antes de «mirar si las imágenes» (f1114).", { variantIndex: 2 }),

  // ── g06 · el giro ──
  sfx("s-todo", "whoosh", "swoosh", 1200, "Relevo a «Lo hace todo por ti» sobre «Esto».", { variantIndex: 1 }),
  sfx("s-todo-ok", "impact", "chime", 1206, "El titular del giro aterriza: el mismo timbre positivo que la solución, porque es su cumplimiento.", { variantIndex: 1, priority: "medium" }),
  sfx("s-tiempo", "impact", "pop", 1270, "Aterriza «y ganas mucho tiempo», antes de «ganar» (f1278).", { variantIndex: 0 }),

  // ── g07 · remate: la misma entrada que las demás tarjetas, sin subir el tono ──
  sfx("s-remate", "whoosh", "light", 1318, "El kicker del remate releva al giro, sobre «para»."),
  sfx("s-remate-titular", "whoosh", "light", 1373, "Aterriza «Lo más importante / LA VIDA», antes de «lo más» (f1377). Suena igual que cualquier tarjeta: es una promesa, no un golpe.", { variantIndex: 1 }),
];
