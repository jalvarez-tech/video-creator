/**
 * PLAN DE SONIDO — proyecto 009 · Reel de Street Cats (30 fps · 942 f).
 * Guía: manuales/diseno-sonoro/SKILL.md · artefacto: 03-timeline.md.
 *
 * ESTA PIEZA NO TIENE VOZ, Y ESO CAMBIA LA MEZCLA ENTERA. Todos los `vol` del
 * motor están calibrados para que el PICO caiga en `TARGET_DBFS` —general −21,
 * whoosh e impact −27—, y esos números existen para dejar sitio a una narración.
 * Aquí no hay narración: aplicados tal cual, el reel sale prácticamente mudo.
 *
 * Así que se levantan, y se levanta EXPLÍCITAMENTE (`ALZA`) en vez de escribir
 * 18 volúmenes a ojo: así se ve de dónde sale cada número y se puede deshacer de
 * una vez si algún día esta pieza lleva voz. Los whoosh/impact suben ×4 (≈+12 dB
 * → pico ≈ −15 dBFS) y los generales ×2,2 (≈+7 dB → ≈ −14 dBFS). Siguen con
 * headroom de sobra, que es justo lo que hace falta porque el destino real es
 * Instagram y allí es normal que el cliente ponga un audio de tendencia ENCIMA
 * al publicar: si esto ya viniera al límite, la suma clipearía.
 *
 * `underDialogue` no aparece en ningún cue y `duckDb` va a 0 en la comp: duckear
 * contra una voz que no existe solo restaría 4,5 dB a todo por igual.
 *
 * LA REGLA QUE ORDENA EL RESTO: no hay un sonido por corte. Hay ONCE cortes y
 * solo se marcan los que significan algo —el golpe de apertura, los dos cambios
 * de sección (clímax y revelación) y las entradas del CTA—; los demás llevan un
 * whoosh de tránsito, alternando variante del POOL para que seis cortes seguidos
 * no suenen al mismo archivo seis veces (SKILL §12). Marcar los once por igual
 * es cómo un montaje rápido acaba sonando a plantilla.
 */
import { cue, resolveSound, SFX, SoundCue, startFromTarget, VarianteSonido } from "../../motor/sound/cues";

/** Compensación por AUSENCIA DE VOZ, por familia de mezcla. Ver cabecera. */
const ALZA: Record<string, number> = { whoosh: 4, impact: 4, general: 2.2, ambient: 2.2 };

/** El `vol` calibrado del motor (o el de la alterna del POOL) × su alza. */
const vol = (v: VarianteSonido, i?: number): number =>
  Math.min(1, resolveSound(v, i).vol * ALZA[SFX[v].bucket]);

/* ══════════════════════════════════════════════════════════════════════════
 * EL SILENCIO DE CABEZA — la corrección que hace que estos cues SE OIGAN.
 *
 * `startFromTarget()` del motor da por hecho que el sonido empieza en el frame
 * 0 del archivo: para un `impact` devuelve el `targetFrame` a secas. Los
 * archivos del banco NO cumplen eso. Medido con ffmpeg (primer instante que
 * supera el 25 % del pico del propio archivo):
 *
 *     impact-deep.mp3        1,73 s  =  52 f   ← el peor con diferencia
 *     whoosh-swoosh-07.wav   1,06 s  =  32 f
 *     riser-low.mp3          0,65 s  =  20 f
 *     pop.mp3                0,59 s  =  18 f
 *     whoosh-light.wav       0,35 s  =  11 f
 *     whoosh-whip.wav        0,24 s  =   7 f
 *     swoosh.mp3             0,14 s  =   4 f
 *     impact-sharp.wav       0,06 s  =   2 f
 *     ui.mp3                 0,01 s  =   0 f
 *
 * CONSECUENCIA, y no es teórica: en el primer render de este reel, un cue de
 * `deep` con 18 frames de duración reproducía 18 frames de un archivo cuyo
 * golpe está en el 52. O sea SILENCIO — y eran los dos sonidos más importantes
 * de la pieza, el golpe de apertura y el de la revelación de la marca. El `pop`
 * del CTA hacía lo mismo. Ninguno daba error: el cue existía, el volumen era
 * correcto, el archivo sonaba en el reproductor.
 *
 * `cueReal` descuenta ese silencio: coloca el `startFrame` tantos frames ANTES
 * como haga falta para que el ataque caiga donde el motor quería, y alarga la
 * duración lo mismo para no cortarle la cola. La sincronía por tipo (el pico
 * del whoosh al 65 %, el riser terminando en el target) la sigue calculando
 * `startFromTarget` — sobre la duración del sonido REAL, que es lo que había
 * que arreglar.
 *
 * ⚠️ NO se arregla en el motor a propósito. Tocar `startFromTarget` movería el
 * audio de 001-008, que están publicados: es una decisión de dirección que se
 * toma escuchando esas piezas, no un efecto colateral de este reel.
 * ══════════════════════════════════════════════════════════════════════════ */

/**
 * Frames de silencio/rampa antes del ataque, POR ARCHIVO. MEDIDOS.
 *
 * La clave es el ARCHIVO y no la variante, y eso no es un detalle: con
 * `variantIndex` una misma variante resuelve a archivos distintos del POOL, y
 * sus cabeceras no se parecen en nada. Las tres alternas de `light` van de 3 a
 * 27 frames. Un mapa indexado por variante habría corregido bien el índice 0 y
 * mal los otros dos, que es peor que no corregir: el error queda repartido.
 */
const ATAQUE: Record<string, number> = {
  "impact-deep.mp3": 52,
  "whoosh-swoosh-07.wav": 32,
  "whoosh-light-02.wav": 27,
  "riser-low.mp3": 20,
  "pop.mp3": 18,
  "whoosh-light.wav": 11,
  "whoosh-whip.wav": 7,
  "swoosh.mp3": 4,
  "whoosh-light-03.wav": 3,
  "impact-sharp.wav": 2,
  "ui.mp3": 0,
};

/**
 * `cue()` con el silencio de cabeza descontado.
 * `durReal` son los frames de SONIDO que se quieren, no los de archivo.
 */
const cueReal = (
  id: string,
  type: Parameters<typeof cue>[1],
  variant: VarianteSonido,
  target: number,
  durReal: number,
  reason: string,
  opts: Parameters<typeof cue>[6] = {}
): SoundCue => {
  // El MISMO resolutor que usa el intérprete, así que el archivo que se mide es
  // exactamente el que va a sonar, `variantIndex` incluido.
  const a = ATAQUE[resolveSound(variant, opts.variantIndex).file] ?? 0;
  // Dónde tendría que empezar el sonido REAL para que su sincronía sea la que
  // el motor define para su tipo. El archivo empieza `a` frames antes que eso.
  const inicioReal = startFromTarget(type, target, durReal);
  return cue(id, type, variant, target, durReal + a, reason, { ...opts, startFrame: inicioReal - a });
};

export const cues009: SoundCue[] = [
  /* ── Apertura: lo único que suena FUERTE en todo el vídeo ───────────────── */
  cueReal("s-golpe", "impact", "deep", 0, 34, "Las papas caen: el golpe abre el reel en el frame 0, que es donde se decide si alguien sigue mirando.", {
    priority: "high",
    fadeOutFrames: 10,
    volume: vol("deep"),
  }),
  cueReal("s-reto", "whoosh", "swoosh-hero", 4, 12, "Entra «TE RETO» con el barrido del cartel.", {
    priority: "medium",
    volume: vol("swoosh-hero"),
  }),
  cueReal("s-reto2", "click", "ui", 22, 6, "Aterriza la segunda línea del reto: un clic seco, no otro whoosh.", {
    priority: "low",
    volume: vol("ui"),
  }),

  /* ── Los cortes de antojo: whoosh de tránsito, variante rotada ──────────── */
  cueReal("s-c02", "whoosh", "whip", 84, 10, "Corte a las alitas — el whip del montaje suena porque el plano entra desplazado.", {
    priority: "low",
    volume: vol("whip"),
  }),
  cueReal("s-c03", "whoosh", "light", 156, 10, "Corte a la brasa.", { priority: "low", volume: vol("light") }),
  cueReal("s-c04", "whoosh", "whip", 222, 10, "Corte al emplatado — segundo whip del montaje.", {
    priority: "low",
    variantIndex: 1,
    volume: vol("whip", 1),
  }),
  cueReal("s-c05", "whoosh", "light", 288, 10, "Corte a la salsa.", {
    priority: "low",
    variantIndex: 1,
    volume: vol("light", 1),
  }),
  // (aquí había una textura `liquid` de catálogo, y otra en f540. Las dos las
  //  sustituye el sonido REAL de la salsa en `sabor-009.ts`: la misma acción
  //  sonando dos veces se oía como eco, no como refuerzo.)
  cueReal("s-c06", "whoosh", "light", 354, 10, "Corte a «crujientes por fuera».", {
    priority: "low",
    variantIndex: 2,
    volume: vol("light", 2),
  }),
  cueReal("s-c07", "whoosh", "light", 414, 10, "Corte a «jugosas por dentro»: el par de texturas comparte timbre igual que comparte maqueta.", {
    priority: "low",
    variantIndex: 2,
    volume: vol("light", 2),
  }),
  cueReal("s-c08", "whoosh", "light", 474, 10, "Corte a las porciones.", { priority: "low", volume: vol("light") }),

  /* ── Clímax: el riser TERMINA en el corte, no empieza en él ─────────────── */
  cueReal("s-riser", "riser", "low-rumble", 534, 40, "Anticipa el clímax: el crescendo muere exactamente en el flash del plano de la salsa.", {
    priority: "medium",
    fadeInFrames: 6,
    volume: vol("low-rumble"),
  }),
  cueReal("s-climax", "impact", "sharp", 534, 16, "El flash del clímax. Es el segundo de los tres golpes del vídeo.", {
    priority: "high",
    volume: vol("sharp"),
  }),

  /* ── Revelación: el tercer y último golpe ───────────────────────────────── */
  cueReal("s-marca", "impact", "deep", 630, 40, "Cae el nombre. Tercer y último impacto: si hubiera un cuarto, ninguno significaría nada.", {
    priority: "high",
    variantIndex: 1,
    fadeOutFrames: 12,
    volume: vol("deep", 1),
  }),

  /* ── CTA: se construye en tres tiempos y cada uno suena distinto ────────── */
  cueReal("s-cta", "whoosh", "swoosh", 732, 12, "Entra la tarjeta de dirección.", {
    priority: "low",
    volume: vol("swoosh"),
  }),
  cueReal("s-domi", "impact", "pop", 778, 8, "Aterriza el chip «también a domicilio», que es la mitad del CTA para quien no piensa moverse de casa.", {
    priority: "medium",
    volume: vol("pop"),
  }),
  cueReal("s-arroba", "click", "ui", 816, 6, "Aterriza la cuenta de Instagram, el último dato de la tarjeta.", {
    priority: "low",
    variantIndex: 1,
    volume: vol("ui", 1),
  }),

  /* ── Los últimos ~4 s van EN SILENCIO a propósito: la tarjeta ya está
   *    montada y lo único que queda por hacer es leerla. ─────────────────── */
];
