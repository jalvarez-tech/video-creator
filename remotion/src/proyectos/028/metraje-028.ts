/**
 * EL RECORRIDO 028 — «One Living · Envigado», SEXTO REEL DE ESTA PROPIEDAD (V12 del registro) — los planos, como DATOS.
 *
 * EL ENCARGO (2026-10-08): «haz otro vídeo de One Living pero todo con el recorrido del apto en `recorrido caminando.MOV`; acelera la cámara en
 * los puntos que veas que sea necesario y escoge una canción acorde». Es UNA SOLA TOMA, RC14 (49,8 s, HLG, Isabella abre la puerta, habla, la
 * seguimos por todo el piso y vuelve a hablar ante el ventanal de esquina), montada ENTERA y en su orden: no hay cortes de contenido, solo
 * CAMBIOS DE VELOCIDAD. Lo que la V10 y la V11 usaron de esta toma (el hook HK5, el CTA CT4 y un tramo del paseo) vuelve a salir: la voz de
 * Isabella al principio y al final ES la de esa misma toma (declarado en el registro y en la puerta).
 *
 * LA IDEA: un paseo de verdad, sin cortes, en el que la cámara corre por los pasillos y se para donde hay algo que mirar. Los DESTINOS van a
 * velocidad 1 (o 1,5): la puerta que se abre y su hook, la vista desde el balcón, su mano sobre la isla, el baño y el vestier, la alcoba
 * secundaria con ella ante el ventanal y la alcoba del ventanal de esquina con el CTA. Los TRÁNSITOS (la sala, el giro de vuelta, la columna y la
 * puerta, la vuelta por la cocina) van a ×2,5-×4. Dónde: lo dicen la hoja de contactos cada 0,25 s y el movimiento medido
 * (`proyectos/028/herramientas/movimiento.py`), no el gusto: un pasillo se mueve mucho y no enseña nada nuevo; la vista y la isla se miran.
 *
 * CÓMO SE ACELERA. `<PistaMetraje>` reproduce cada corte a UNA velocidad (`playbackRate`). Una rampa es una escalera: cortes de 2 f (4 en la
 * llegada al CTA) que suben o bajan de 0,5 en 0,5, cada uno arrancando en la fuente justo donde acabó el anterior (`cortesDeMesetas`, abajo:
 * la MISMA regla que `proyectos/028/herramientas/plan-rampas.py`, que decidió las fronteras). La rampa la paga siempre la meseta RÁPIDA: un
 * destino empieza a velocidad 1 exactamente en su frontera. Todos entran a CORTE (es el mismo plano: ni una disolvencia, que la duplicaría).
 *
 *   meseta          fuente (s)     ×    qué se ve
 *   puerta          0,50-1,33     2    la puerta se abre y ella asoma (el f0)
 *   hook            1,33-6,93     1    habla: «Hay apartamentos para vivir y hay otros que te dan más posibilidades. Ven, te muestro.» (1,82-6,31 s)
 *   sala            6,93-9,80     3    detrás de ella por la sala hacia el balcón
 *   corredera       9,80-12,03   1,5   cruza la corredera y sale al balcón
 *   malla          12,03-13,53   2,5   el giro sobre la baranda con la malla negra
 *   vista          13,53-16,27    1    LA VISTA: ciudad, montaña y cielo
 *   vuelta         16,27-19,87    3    el barrido de vuelta y la sala hasta la cocina
 *   isla           19,87-22,73    1    su mano sobre la isla
 *   puerta-baño    22,73-25,60    3    la columna y la puerta
 *   baño-vestier   25,60-29,37   1,5   el baño, el barrido y el vestier
 *   giro-alcoba    29,37-31,00    3    el giro hacia la alcoba secundaria
 *   alcoba-sec     31,00-34,80    1    ella ante el ventanal, viene hacia la cámara y pasa a su lado (el respiro de la canción)
 *   regreso        34,80-43,33    4    vuelve por la cocina hasta la otra alcoba (el ritmo vuelve)
 *   cta            43,33-49,83    1    la alcoba del ventanal de esquina; ella llega, se gira y habla: el CTA (45,22-49,35 s)
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA, POR GOLPES. «Street Level Sessions on the Green» (Daniel Armand, lo-fi/chillhop †) NO tiene pulso fijo
 * (`rejilla.py`: 29 % de los golpes fuertes en la mejor recta): cada CAMBIO DE VELOCIDAD es un instante que se ve (la cámara arranca o frena) y cae
 * en un golpe MEDIDO (`musica/golpes-028.json`, ≥ 9 dB). El arranque de un destino es cuando la cámara YA va a su velocidad (acaba la rampa de
 * bajada); el de un tránsito, cuando empieza a acelerar. La llegada a la alcoba del CTA no tiene golpe (la canción ya va hacia su final, sin golpes
 * fuertes entre 199,6 y 204,8 s): frena despacio (escalones de 4 f) y la puerta lo declara.
 *
 * EL RESPIRO. La canción baja de −8 a −17 dB entre 195,5 y 198,8 s (`curva.py`): cae en la alcoba secundaria (ella sonríe y viene hacia la
 * cámara, a velocidad 1) y el ritmo vuelve en el golpe de 198,988 s, donde empieza la carrera ×4 de vuelta por la cocina.
 *
 * LA RESOLUCIÓN. El final de la canción se apaga solo (RMS de 1 s: −14 dB a 205 s, −19 a 206, −30 a 207, silencio digital hacia 209,5 s): cae
 * bajo la voz del CTA y se acaba al empezar la tarjeta.
 *
 * UNIDADES. `desde` en SEGUNDOS de la fuente (escrito como frame/30, o con medio frame cuando la escalera lo pide: el intérprete redondea
 * `trimBefore` y el error es ≤ 0,5 f de fuente, que la puerta mide); `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS.
 *
 * EL COLOR (R32): todos los planos llevan EL MISMO `color` (es una toma partida en 49 trozos: un color distinto en uno se vería como un salto). Es
 * el de RC14 en la V10 y la V11 (la base del canal con saturación 1,02). Con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1
 * reducida con ffmpeg.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-028.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA, TARJETA } from "./cierre-028";

export const FPS_028 = 30;

export type Entrada = "corte";

/** Dónde habla Isabella en el clip y a qué nivel. Medido en la V10 (energía de la voz sola y ebur128), no estimado. */
export interface VozDelCorte {
  s0: number;
  s1: number;
  lufs: number;
  dice: string;
}

export interface Corte extends CorteDelFormato<Entrada> {
  /** `foto` solo para la tarjeta oscura del cierre (un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** La meseta de la que sale este corte (el nombre de la tabla de arriba); la tarjeta es «cierre». */
  meseta: string;
  /** Solo los dos cortes en que habla Isabella (a velocidad 1): el WAV de su voz (la tratada, `rc14-voz.wav`: ver `OBJETIVO_LUFS`). */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * La voz, a −15 LUFS: el nivel de la música sola, 6 dB más que el −21 de las once versiones anteriores (pedido del usuario tras la final,
 * 2026-10-08: «necesito que la voz cuando habla Isabella tenga más decibeles sin saturar»). Con ganancia sola no se puede: la voz cruda de RC14
 * (−22,3 / −22,7 LUFS) tiene picos de −3,1 dBTP y +7,4 dB la saturarían. Suena la voz TRATADA (`rc14-voz.wav`: graves, puerta suave, compresión
 * 3:1, +16 dB y limitador a −2,5 dBFS, en `proyectos/028/normalizar.mjs`), que ya llega casi al objetivo; la ganancia del plan solo iguala las dos
 * tomas. Excepción a R29 por encargo, declarada aquí y en la puerta.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Street Level Sessions on the Green» — `archivos/musica/Daniel Armand — Street Level Sessions on the Green.mp3` (sha 8 `e428a369`), 3:53. Se usa
 * desde 174,833 s hasta su final. Los de abajo son golpes MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a
 * subir»), uno por meseta: el arranque de cada una cae en el suyo. Los eligió `plan-rampas.py --cuadra 174.780` (programación dinámica sobre las
 * fronteras, cada una dentro de su margen).
 */
export const GOLPE = {
  puerta: { t: 174.78, db: 11.5 },
  hook: { t: 175.147, db: 13.5 },
  sala: { t: 180.815, db: 14.6 },
  corredera: { t: 181.883, db: 25.4 },
  malla: { t: 183.355, db: 11.4 },
  vista: { t: 184.077, db: 25.3 },
  vuelta: { t: 186.79, db: 23.6 },
  isla: { t: 188.051, db: 13.3 },
  "puerta-bano": { t: 190.967, db: 13.9 },
  "bano-vestier": { t: 192.052, db: 12.4 },
  "giro-alcoba": { t: 194.532, db: 18.4 },
  "alcoba-sec": { t: 195.195, db: 9.2 },
  regreso: { t: 198.988, db: 12.8 },
} as const;

/** Dónde se acaba la canción de verdad (s): silencio digital (RMS de 1 s a −68,5 dB a los 209 s y −180 desde 210). */
export const FIN_PISTA = 209.5;

/**
 * El segundo de la canción que suena en el f0: el golpe de 174,780 s (11,5 dB) SUENA en el f0 (ataque de 12 ms y el retardo de 42 ms del audio del
 * render), en un frame entero para que `trimBefore` no lo mueva: 5245/30.
 */
export const INICIO_MUSICA = 5245 / FPS_028;

/** Lo que el audio del render llega TARDE respecto de su fuente: 42 ms (medido en el 016, confirmado desde el 017). */
export const RETARDO_AUDIO = 0.042;
/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_028;

/* ── Las mesetas: el plan de velocidades ───────────────────────────────────── */

export interface Meseta {
  nombre: keyof typeof GOLPE | "cta";
  /** Frames de la FUENTE (RC14 a 30 fps) en que empieza y acaba. La frontera con la siguiente es la misma cifra. */
  a: number;
  b: number;
  /** Velocidad de la meseta. Las rampas que la unen con sus vecinas las paga la más rápida de las dos. */
  v: number;
  reason: string;
}

/** Frames de la comp por escalón de rampa, y lo que cambia la velocidad en cada uno. */
export const PASO_RAMPA = 2;
export const SALTO_RAMPA = 0.5;
/** Mesetas cuya rampa de BAJADA va con escalones más largos: la llegada a la alcoba del CTA, sin golpe en el que frenar, frena despacio. */
export const PASO_BAJA: Readonly<Record<string, number>> = { regreso: 4 };

/** Las fronteras, de `plan-rampas.py --cuadra 174.780` (proyectos/028/herramientas/plan-rampas-salida.txt). */
export const MESETAS: readonly Meseta[] = [
  { nombre: "puerta", a: 15, b: 40, v: 2, reason: "La puerta se abre y ella asoma: el f0 es la madera entreabierta con su cara en el hueco. Doble de rápido: abrir una puerta a velocidad 1 tarda más de lo que el gesto dice." },
  { nombre: "hook", a: 40, b: 209, v: 1, reason: "Isabella en la puerta, a cámara: «Hay apartamentos para vivir y hay otros que te dan más posibilidades. Ven, te muestro.» Velocidad 1: la voz manda. En «ven» se gira y entra." },
  { nombre: "sala", a: 209, b: 294, v: 3, reason: "Detrás de ella por la sala hasta la corredera: un tránsito (se mueve mucho y no enseña nada nuevo), ×3." },
  { nombre: "corredera", a: 294, b: 360, v: 1.5, reason: "Cruza la corredera y sale al balcón: frena para que el paso de dentro a fuera se lea." },
  { nombre: "malla", a: 360, b: 406, v: 2.5, reason: "El giro sobre la baranda, con la malla negra en primer término: se pasa rápido, la malla no es lo que se enseña." },
  { nombre: "vista", a: 406, b: 488, v: 1, reason: "LA VISTA: la ciudad, la montaña y el cielo desde el balcón, a velocidad 1. El destino del primer tramo." },
  { nombre: "vuelta", a: 488, b: 596, v: 3, reason: "El barrido de vuelta al interior y la sala hasta la cocina: tránsito, ×3." },
  { nombre: "isla", a: 596, b: 682, v: 1, reason: "Su mano sobre la isla de la cocina (el puente humano): velocidad 1." },
  { nombre: "puerta-bano", a: 682, b: 768, v: 3, reason: "El giro por la columna y la puerta (marco y pared en primer término): tránsito, ×3." },
  { nombre: "bano-vestier", a: 768, b: 882, v: 1.5, reason: "El baño, el barrido de la puerta y el vestier: ×1,5, lo justo para que cada uno se vea." },
  { nombre: "giro-alcoba", a: 882, b: 929, v: 3, reason: "El giro hacia la alcoba secundaria (pared en primer término): tránsito, ×3." },
  { nombre: "alcoba-sec", a: 929, b: 1044, v: 1, reason: "La alcoba secundaria: ella ante el ventanal con árboles, viene sonriendo hacia la cámara y pasa a su lado. Velocidad 1 sobre el respiro de la canción." },
  { nombre: "regreso", a: 1044, b: 1300, v: 4, reason: "Vuelve por la cocina y el pasillo hasta la otra alcoba: es volver atrás, ×4, sobre el golpe en que vuelve el ritmo. Frena despacio al entrar." },
  { nombre: "cta", a: 1300, b: 1494, v: 1, reason: "La alcoba del ventanal de esquina: ella llega, se gira y habla: «Si te gustó este apartamento y deseas tener más información, contáctame.» Velocidad 1 hasta el último fotograma del clip." },
];

/** Las velocidades intermedias de una rampa de v0 a v1 (sin los extremos), de 0,5 en 0,5. */
export const escalones = (v0: number, v1: number): number[] => {
  const n = Math.round(Math.abs(v1 - v0) / SALTO_RAMPA) - 1;
  if (n <= 0) return [];
  const paso = (v1 - v0) / (n + 1);
  return Array.from({ length: n }, (_, k) => v0 + paso * (k + 1));
};

const v = (id: string): string => `recorrido-028/${id}.mp4`;
const a = (id: string): string => `recorrido-028/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE de Luxur, la del 017: contraste con cuerpo, negros hundidos, luces recogidas, un punto cálido y +10 % de saturación, y la saturación de
 * RC14 en la V10 y la V11 (1,02: Isabella está en cuadro casi todo el tiempo y su piel no se toca). UN solo color para los 49 trozos.
 */
const COLOR_RC14: ColorCine = {
  contrast: 1.1,
  blacks: -0.06,
  shadows: 0.08,
  highlights: -0.2,
  whites: -0.05,
  temperature: 0.03,
  saturation: 1.02,
  vibrance: 0,
};

/** QUIETO: la cámara ya camina; un empuje encima marearía, y más acelerado. */
const QUIETO: readonly [number, number] = [1.0, 1.0];

/**
 * Dónde habla Isabella en RC14 (V10: energía de la voz sola, silencios de −58/−60 dB) y su sonoridad en la voz TRATADA (`rc14-voz.wav`, ebur128 en
 * cada ventana: −15,0 y −14,3 LUFS; en la cruda medían −22,3 y −22,7). Los dos con pico real −2,5 dBTP (el techo del limitador).
 */
export const VOZ_HOOK: VozDelCorte = {
  s0: 1.82,
  s1: 6.31,
  lufs: -15.0,
  dice: "Hay apartamentos para vivir y hay otros que te dan más posibilidades. Ven, te muestro.",
};
export const VOZ_CTA: VozDelCorte = {
  s0: 45.22,
  s1: 49.35,
  lufs: -14.3,
  dice: "Si te gustó este apartamento y deseas tener más información, contáctame.",
};

/**
 * Las mesetas → cortes. Cada meseta da su meseta propiamente dicha más, si es la rápida de una frontera, los escalones de la rampa (de
 * `PASO_RAMPA` frames, o de `PASO_BAJA[nombre]` en su bajada). La fuente avanza `dur × velocidad` por corte, sin redondear: el siguiente arranca
 * exactamente donde acabó este (el intérprete redondea `trimBefore` a frames enteros, ≤ 0,5 f). La fuente se ARRASTRA de una meseta a la
 * siguiente: la duración de una meseta se redondea a frames enteros de la comp, y si cada una volviera a arrancar en su `a` la toma repetiría o
 * saltaría hasta medio frame × su velocidad (2 f de fuente a ×4) en cada frontera. Así la frontera real se mueve ese poco, y la toma no.
 */
export const cortesDeMesetas = (mesetas: readonly Meseta[]): Corte[] => {
  const cortes: Corte[] = [];
  let en = 0;
  let fuente = mesetas[0].a;
  mesetas.forEach((m, i) => {
    const anterior = i > 0 ? mesetas[i - 1].v : m.v;
    const siguiente = i + 1 < mesetas.length ? mesetas[i + 1].v : m.v;
    const pasoBaja = PASO_BAJA[m.nombre] ?? PASO_RAMPA;
    const sube = anterior < m.v ? escalones(anterior, m.v) : [];
    const baja = siguiente < m.v ? escalones(m.v, siguiente) : [];
    const nn = String(i + 1).padStart(2, "0");
    const habla = m.nombre === "hook" ? VOZ_HOOK : m.nombre === "cta" ? VOZ_CTA : undefined;
    const empuja = (id: string, dur: number, vel: number, reason: string, conVoz = false) => {
      cortes.push({
        id,
        meseta: m.nombre,
        tipo: "video",
        src: v("rc14"),
        desde: fuente / FPS_028,
        en,
        dur,
        velocidad: vel === 1 ? undefined : vel,
        zoom: QUIETO,
        entra: "corte",
        color: COLOR_RC14,
        ...(conVoz && habla ? { audio: a("rc14-voz"), voz: habla } : {}),
        reason,
      });
      fuente += dur * vel;
      en += dur;
    };
    sube.forEach((vel, k) => empuja(`m${nn}-${m.nombre}-sube${k + 1}`, PASO_RAMPA, vel, `Rampa de ×${anterior} a ×${m.v} (escalón ${k + 1} de ${sube.length}): la cámara acelera al empezar «${m.nombre}».`));
    const finMeseta = m.b - baja.reduce((s, vel) => s + pasoBaja * vel, 0);
    const dur = Math.round((finMeseta - fuente) / m.v);
    if (dur < 2) throw new Error(`metraje-028: la meseta «${m.nombre}» no cabe entre sus rampas (${fuente} → ${finMeseta} a ×${m.v})`);
    empuja(`m${nn}-${m.nombre}`, dur, m.v, m.reason, true);
    baja.forEach((vel, k) => empuja(`m${nn}-${m.nombre}-baja${k + 1}`, pasoBaja, vel, `Rampa de ×${m.v} a ×${siguiente} (escalón ${k + 1} de ${baja.length}): la cámara frena al acabar «${m.nombre}».`));
  });
  return cortes;
};

const RECORRIDO = cortesDeMesetas(MESETAS);
const FIN_RECORRIDO = RECORRIDO[RECORRIDO.length - 1].en + RECORRIDO[RECORRIDO.length - 1].dur;

/** Donde acaba la música (frame de la comp): donde la canción llega al silencio, o al final de la pieza si llega antes. */
export const DURACION_028 = FIN_RECORRIDO + DUR_TARJETA;
export const FIN_MUSICA_028 = Math.min(Math.floor((FIN_PISTA - INICIO_MUSICA) * FPS_028), DURACION_028 - 2);

export const metraje028: readonly Corte[] = [
  ...RECORRIDO,
  {
    id: "c99-cierre",
    meseta: "cierre",
    tipo: "foto",
    src: TARJETA,
    en: FIN_RECORRIDO,
    dur: DUR_TARJETA,
    zoom: QUIETO,
    entra: "corte",
    reason:
      "La tarjeta oscura del cierre (reglas fijas del canal): tras la última palabra de Isabella su imagen funde a negro y aquí van el logo y la web. Nada se congela.",
  },
];
