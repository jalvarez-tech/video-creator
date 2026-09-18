import { anclasDeSonido } from "../../motor/plan/nucleo";
import { cue, resolveSound, type SoundCue, type TipoSonido, type VarianteSonido } from "../../motor/sound/cues";
import { graficos015 } from "./graficos-015";

/**
 * PLAN DE SONIDO — proyecto 015 (30 fps · 1563 f).
 * Guía: manuales/diseno-sonoro/SKILL.md · artefacto: 03-timeline.md.
 *
 * EL ENCARGO ES «textos con Fx de sonido»: un sonido por cada texto que ENTRA y
 * ninguno en otro sitio. No suenan los fundidos entre tomas que no traen texto
 * nuevo (c03 → c04), ni el hook (está puesto en el f0: no entra), ni ningún
 * texto al SALIR. Veintiún cues en 52 s, uno cada 2,5 s de media.
 *
 * LOS FRAMES NO SE ESCRIBEN AQUÍ. Cada texto declara su sonido en el plan de
 * gráficos (`sonido: { variante, reason }`) y `anclasDeSonido()` devuelve el
 * frame ABSOLUTO en que entra, con la escalera de la ley y los `en` anidados ya
 * resueltos. Mover un texto mueve su sonido; en el 014 las dos listas se
 * copiaban a mano y se comprobaban a ojo.
 *
 * CINCO GESTOS, y cada uno suena siempre igual (estilo del canal: corporativo /
 * lujo con presencia —director §4—, porque aquí el encargo es OÍRLOS):
 *
 *   | gesto      | cuándo                                  | familia · archivos                     |
 *   |------------|-----------------------------------------|----------------------------------------|
 *   | `relevo`   | una toma de texto releva a otra (11)    | whoosh suave, alternando 4 archivos    |
 *   | `aterriza` | la frase clave llega sobre su palabra (5)| pop, alternando 2                     |
 *   | `tacha`    | un ✗ (2)                                | clic seco: tachar una tarea (como 014) |
 *   | `acierta`  | un ✓ (2)                                | chime: la respuesta buena              |
 *   | `cuenta`   | aterriza @propiedadesluxur (1)          | notificación: lo que se pide es escribir |
 *
 * R26 — EL GOLPE SE MIDE. Ningún archivo del banco empieza en su golpe
 * (`pop.mp3` lo tiene en f17, `notification.wav` en f42, `click-mouse-02` en
 * f31…): `PICO` guarda lo medido con `medir-sfx.py` y `sfx()` escribe
 * `startFrame = target − pico`, cubre la parte audible y le pone fundido de
 * salida. Y el NIVEL sale del RMS medido de cada archivo, no del `vol` de
 * tabla (que iguala picos de muestra): `OBJETIVO_RMS` por familia.
 *
 * El objetivo es el del 014 corregido por la voz: allí la voz iba a −17,7 LUFS
 * y los golpes a −24 (whoosh/impact) y −27 (clic) dBFS de RMS; aquí la voz se
 * iguala a −21 LUFS (`metraje-015.ts`), así que todo baja 3 dB para quedar en la
 * MISMA relación con ella. Verificado rindiendo la pista de SFX sola (R26 §4):
 * 03-timeline.md. Si en el móvil suenan fuertes o flojos, es ese número.
 */

/** Frame del golpe, fin de la parte audible y RMS del golpe (33 ms, dBFS del archivo crudo). `medir-sfx.py`, 30 fps. */
const PICO: Record<string, { pico: number; fin: number; rms: number }> = {
  "whoosh-light.wav": { pico: 14, fin: 22, rms: -10.7 },
  "whoosh-light-02.wav": { pico: 34, fin: 46, rms: -11.7 },
  "swoosh.mp3": { pico: 17, fin: 30, rms: -10.3 },
  "swoosh-02.wav": { pico: 18, fin: 24, rms: -14.6 },
  "pop.mp3": { pico: 17, fin: 20, rms: -13.8 },
  "pop-03.mp3": { pico: 4, fin: 4, rms: -24.7 },
  "click-mouse.mp3": { pico: 2, fin: 5, rms: -21.6 },
  "click-mouse-02.mp3": { pico: 31, fin: 34, rms: -22.2 },
  "chime.mp3": { pico: 10, fin: 29, rms: -13.2 },
  "chime-02.mp3": { pico: 25, fin: 41, rms: -13.2 },
  "notification.wav": { pico: 42, fin: 47, rms: -18.3 },
};

/** Frames de cola tras el fin audible, con fundido: el corte de la <Sequence> no hace clic. */
const COLA = 6;

/** dBFS de RMS (33 ms) en el golpe, por familia. Ver la cabecera: el del 014 menos 3 dB. */
const OBJETIVO_RMS: Record<TipoSonido, number> = { whoosh: -27, impact: -27, click: -30, riser: -27, texture: -33 };

/**
 * Qué suena en cada gesto. `rota` es la lista de variantes que se alternan para
 * no repetir el mismo archivo en dos entradas seguidas (SKILL §12). `pop-02`
 * se queda fuera, como en el 014: ni a volumen 1 llega al objetivo.
 */
const GESTOS: Record<string, { type: TipoSonido; rota: readonly { variant: VarianteSonido; i?: number }[] }> = {
  relevo: {
    type: "whoosh",
    rota: [
      { variant: "light", i: 0 },
      { variant: "swoosh", i: 0 },
      { variant: "light", i: 1 },
      { variant: "swoosh", i: 1 },
    ],
  },
  aterriza: { type: "impact", rota: [{ variant: "pop", i: 0 }, { variant: "pop", i: 2 }] },
  tacha: { type: "click", rota: [{ variant: "mouse", i: 0 }, { variant: "mouse", i: 1 }] },
  acierta: { type: "impact", rota: [{ variant: "chime", i: 0 }, { variant: "chime", i: 1 }] },
  cuenta: { type: "impact", rota: [{ variant: "notification" }] },
};

/** Un cue alineado al archivo REAL: el golpe cae en `target` y el nivel lleva el golpe al objetivo de su familia. */
const sfx = (id: string, type: TipoSonido, variant: VarianteSonido, i: number | undefined, target: number, reason: string): SoundCue => {
  const { file } = resolveSound(variant, i);
  const p = PICO[file];
  if (!p) throw new Error(`cues-015: ${file} no está medido en PICO — pásalo por medir-sfx.py`);
  return cue(id, type, variant, target, p.fin + COLA, reason, {
    variantIndex: i,
    priority: "low",
    startFrame: target - p.pico,
    fadeOutFrames: COLA,
    volume: Math.min(1, Math.pow(10, (OBJETIVO_RMS[type] - p.rms) / 20)),
  });
};

const vueltas: Record<string, number> = {};

export const cues015: SoundCue[] = anclasDeSonido(graficos015).map((a) => {
  const gesto = GESTOS[a.variante];
  if (!gesto) throw new Error(`cues-015: el plan pide el sonido «${a.variante}» y aquí no hay receta`);
  const n = vueltas[a.variante] ?? 0;
  vueltas[a.variante] = n + 1;
  const { variant, i } = gesto.rota[n % gesto.rota.length];
  return sfx(`s-${a.id}`, gesto.type, variant, i, a.frame, a.reason);
});
