/**
 * PLAN DE SABOR — proyecto 009 · la cama diegética del reel (30 fps · 942 f).
 * Hermana de `metraje-009.ts`: datos puros, `reason` obligatorio, sin JSX.
 *
 * QUÉ ES ESTO Y POR QUÉ NO ES `cues-009.ts`. Son dos capas de audio con dos
 * trabajos opuestos y por eso son dos archivos:
 *
 *   cues-009.ts   sonido ESTRUCTURAL — marca el montaje. Golpes, whooshes,
 *                 riser. Habla de la EDICIÓN: dice «aquí hay un corte».
 *   sabor-009.ts  sonido DIEGÉTICO — es lo que haría ruido si estuvieras ahí.
 *                 Habla de la COMIDA: dice «esto está chisporroteando».
 *
 * El antojo lo produce el segundo. Un reel de comida no se hace apetecible con
 * impactos; se hace apetecible con el aceite. Los golpes solo ordenan.
 *
 * ARQUITECTURA: UNA cama continua + acentos encima. Es lo que se hace en sonido
 * de verdad y no lo que pide el instinto, que sería cambiar de ambiente en cada
 * corte para que «suene a lo que se ve». Probado mentalmente y descartado: once
 * ambientes en 31 s se oyen como once cortes de audio, no como una cocina. Así
 * que el suelo es una freidora que no para nunca (f0-f660) y encima entran la
 * brasa cuando hay alitas en pantalla y la plancha cuando hay plancha.
 *
 * EL SILENCIO DEL FINAL ES PARTE DEL PLAN. Todo se apaga durante la revelación
 * (f630-660) y el CTA queda **sin cama**: 9,4 s de tarjeta limpia. Una dirección
 * se lee mejor en silencio, y después de 21 s de fritura el corte a nada es
 * exactamente lo que hace que se oiga.
 *
 * LOS ARCHIVOS SE VERSIONAN, Y ESO ES UNA DECISIÓN CONTRA LA NORMA DE LA CASA.
 * Aquí el `.gitignore` deja fuera el material regenerable (la voz, el b-roll de
 * banco) porque lo que lo define —el guion, el manifiesto— sí está en git. Con
 * un modelo generativo eso NO se cumple: volver a lanzar estos mismos prompts
 * devuelve otros seis sonidos distintos. El prompt no define el archivo, así que
 * el archivo ES la fuente de verdad y vive en `remotion/public/sabor-009/`.
 * Los prompts quedan igualmente escritos aquí, pero para saber QUÉ se pidió, no
 * para poder repetirlo.
 *
 * NIVELES: los seis vienen ya igualados a −27 LUFS (camas) y −21 LUFS (golpes)
 * por `proyectos/009/sabor/normalizar.py`, porque la API los devolvía con 20,5
 * LUFS de diferencia entre el más fuerte y el más flojo. `ganancia` es lo de
 * ENCIMA de eso: la decisión artística, no el arreglo del desorden de origen.
 */

export interface Sabor {
  id: string;
  /** Ruta en `remotion/public/`. */
  src: string;
  /** Frame ABSOLUTO de la comp en el que entra. */
  en: number;
  /** Frames que suena. */
  dur: number;
  /** Segundo de entrada en el archivo fuente (para no repetir el mismo tramo). */
  desde?: number;
  /** Nivel ARTÍSTICO, encima del igualado en LUFS. */
  ganancia: number;
  /** Frames de entrada y de salida. Sin ellos, un corte de cama chasca. */
  entra?: number;
  sale?: number;
  /** El archivo se generó con `loop: true` y aguanta repetirse sin costura. */
  bucle?: boolean;
  reason: string;
}

const D = "sabor-009/";

/** Los prompts que se le pidieron a ElevenLabs (`sound-generation`, modelo
 *  `eleven_text_to_sound_v2`). Documentación, NO receta: ver cabecera. */
export const PROMPTS: Record<string, string> = {
  fritura: "Deep fryer basket lifted out of hot oil, intense crackling sizzle of frying oil, close-up commercial kitchen",
  brasa: "Chicken wings sizzling over glowing charcoal, fat dripping onto hot coals, sharp hissing and crackling embers",
  plancha: "Chicken sizzling on a flat-top griddle, steady frying hiss, occasional metal tongs clicking",
  bandeja: "Crispy french fries tumbling and landing into a metal serving tray, light crunchy rustle",
  salsa: "Thick creamy sauce squeezed from a plastic squeeze bottle, glossy viscous drizzle onto food",
  crujido: "Extreme close-up crunchy bite of a crispy french fry, sharp crisp snap",
};

export const sabor009: readonly Sabor[] = [
  /* ── EL SUELO: una freidora que no para en 22 s ─────────────────────────── */
  {
    id: "cama-fritura",
    src: `${D}fritura.mp3`,
    en: 0,
    dur: 660,
    // 0,85 y no el 0,55 del primer pase. Subir la CAMA es lo único que sube la
    // sonoridad media sin tocar los picos —vive 20 dB por debajo de las
    // transientes—, y con 0,55 la mezcla se quedaba en −24,15 LUFS: correcta de
    // pico y sin embargo tímida, que en un reel de comida es el peor sitio donde
    // estar. El aceite tiene que NOTARSE.
    ganancia: 0.85,
    entra: 4,
    // 30 f de caída: la cama muere DURANTE la revelación, no en su corte. Que se
    // apague sola mientras entra el nombre es lo que deja el CTA en silencio sin
    // que se note un corte de audio.
    sale: 30,
    bucle: true,
    reason:
      "El aceite es el suelo de todo el bloque de antojo: da continuidad a once cortes que vienen de cinco cocinas distintas. Bajo (0,55) porque tiene que estar sin que se le preste atención",
  },

  /* ── ACENTOS DE PLANO: solo cuando eso está EN PANTALLA ─────────────────── */
  {
    id: "brasa-c02",
    src: `${D}brasa.mp3`,
    en: 84,
    dur: 72,
    ganancia: 1.15,
    entra: 6,
    sale: 10,
    reason: "Hay alitas al carbón en pantalla (c02): entra la brasa con la grasa cayendo sobre el rescoldo",
  },
  {
    id: "plancha-c03",
    src: `${D}plancha.mp3`,
    en: 156,
    dur: 66,
    ganancia: 1.1,
    entra: 6,
    sale: 10,
    reason: "Cambia a la plancha (c03) y con ella el timbre del chisporroteo: más seco, con el metal de las pinzas",
  },
  {
    id: "brasa-c06",
    src: `${D}brasa.mp3`,
    en: 354,
    dur: 60,
    desde: 3.4,
    ganancia: 1.15,
    entra: 6,
    sale: 10,
    reason: "Vuelven las alitas (c06). Arranca en 3,4 s del archivo y no en 0 para no repetir el mismo tramo que c02",
  },
  {
    id: "plancha-c07",
    src: `${D}plancha.mp3`,
    en: 414,
    dur: 60,
    desde: 3.0,
    ganancia: 1.1,
    entra: 6,
    sale: 10,
    reason: "Vuelve la plancha (c07), también desde otro punto del archivo",
  },

  /* ── GOLPES: una acción concreta que se VE ocurrir ──────────────────────── */
  {
    id: "caen-c01",
    src: `${D}bandeja.mp3`,
    en: 4,
    dur: 90,
    ganancia: 1,
    reason:
      "Las papas que caen de la canastilla en el frame 0. Es el sonido que sostiene el hook: si el primer segundo no suena a comida, el reto no se cobra",
  },
  {
    id: "caen-c04",
    src: `${D}bandeja.mp3`,
    en: 224,
    dur: 90,
    ganancia: 0.95,
    reason: "La espátula suelta las papas en la bandeja (c04)",
  },
  {
    id: "salsa-c05",
    src: `${D}salsa.mp3`,
    en: 290,
    dur: 120,
    // 0,85 — y el primer intento fue 1,5, que hacía CLIPEAR la mezcla (+0,8 dB
    // medidos en este mismo segundo). El error de razonamiento merece quedar
    // escrito porque es fácil de repetir: `salsa` se quedó 4 dB por debajo de su
    // objetivo de LUFS, y compensarlo con ganancia lineal daba por hecho que
    // había headroom de PICO. No lo había — su LRA es 18,9, o sea que su media
    // es baja JUSTAMENTE porque sus picos son altos y aislados. Un déficit de
    // sonoridad media no se arregla subiendo el pico.
    ganancia: 0.85,
    entra: 3,
    sale: 12,
    reason: "La salsa que se ve caer sobre las papas (c05). El plan de sonido tenía aquí una textura `liquid` de catálogo: esto la sustituye",
  },
  {
    id: "caen-c08",
    src: `${D}bandeja.mp3`,
    en: 476,
    dur: 90,
    desde: 0.4,
    ganancia: 0.9,
    reason: "La bandeja ya llena (c08): el mismo gesto, más corto, para no repetir idéntico el golpe de c04",
  },
  {
    id: "salsa-c09",
    src: `${D}salsa.mp3`,
    en: 536,
    dur: 140,
    // Mismo motivo que en `salsa-c05`, y aquí el pico llegaba a +1,0 dB porque
    // encima se le suman el crujido, el `impact sharp` del flash y la cola del
    // riser. Es el punto más cargado del vídeo: cuatro fuentes en el mismo frame.
    ganancia: 0.9,
    entra: 3,
    sale: 24,
    reason: "EL CLÍMAX. La salsa cayendo sobre el queso, ahora entera y sin nada que le compita",
  },
  {
    id: "crujido-clímax",
    src: `${D}crujido.mp3`,
    en: 560,
    dur: 60,
    ganancia: 0.85,
    reason:
      "El único mordisco del vídeo, y cae dentro de «¿YA TE ANTOJASTE?». Es el sonido que contesta la pregunta antes de que la conteste el espectador",
  },
];
