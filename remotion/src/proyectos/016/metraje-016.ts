/**
 * PROYECTO 016 — «República Dominicana 2027». Los planos, como DATOS.
 *
 * Un ejemplo de montaje sobre música: diez clips de banco, cortes secos en el
 * golpe, y el titular del encargo arriba en el primer plano. Artefactos:
 * proyectos/016/artefactos/ (el porqué de cada plano está en 03-timeline.md).
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA. «Contact» (Glenn Morrison) tiene el drop en
 * el 60,07 s y va a 127,7 BPM, medido sobre el ataque del bombo (100 golpes,
 * residuo mediano 25 ms; el chasquido del drop, en la banda alta, cae a 8 ms de
 * la rejilla). El vídeo arranca 16 golpes antes del drop: los planos
 * tranquilos y el titular se comen la subida, el primer plano de acción cae en
 * el drop y el último acaba donde acaba la frase musical, 32 golpes después.
 * Todos los `en` salen de `golpe(j)`: mover la entrada de la música o el tempo
 * es cambiar dos constantes, no once números.
 *
 * `desde` va en SEGUNDOS de la fuente (cada clip llegó a un fps distinto y
 * normalizar.mjs los dejó todos a 30).
 *
 * Datos puros: solo `import type`. La puerta lo carga con node.
 */
import type { Corte } from "../../motor/metraje";

export const FPS_016 = 30;

/** El golpe 0 (el drop) en la canción, y lo que dura un golpe. Segundos. */
export const DROP = 60.0696;
export const PERIODO = 0.46979;
/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe −16,
 * redondeado a un frame (52,553 s → 1577/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 1577 / FPS_016;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms (1,3 f),
 * medido por correlación entre la prueba 720p y el WAV. Sin contarlo, el corte
 * del drop caía 2,4 f antes de que sonara el bombo; con él, el golpe se oye en
 * el frame en que cambia el plano.
 */
export const RETARDO_AUDIO = 0.042;

/** El frame del vídeo en que SUENA el golpe `j` (0 = el primero del vídeo, 16 = el drop). */
export const golpe = (j: number): number =>
  Math.round((DROP + (j - 16) * PERIODO + RETARDO_AUDIO - INICIO_MUSICA) * FPS_016);

const v = (id: string): string => `rd-016/${id}.mp4`;

/** Todo se mueve un poco: un empuje lento, más marcado en el cierre. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const CIERRE: readonly [number, number] = [1.0, 1.07];

/** Un plano de `a` a `b` golpes. El primero empieza en el frame 0 aunque su golpe suene en el 1: el frame 0 es la miniatura. */
const borde = (j: number): number => (j === 0 ? 0 : golpe(j));
const tramo = (a: number, b: number) => ({ en: borde(a), dur: borde(b) - borde(a) });

export const metraje016: readonly Corte<"corte">[] = [
  {
    id: "c01-mar",
    src: v("12324911_1080_1920_60fps"),
    desde: 1.0,
    ...tramo(0, 8),
    // El titular va CENTRADO y, con el plano tal cual, «2027» caía encima de
    // las palmeras del islote. Se baja el plano 115 px (pan −6 %) para que el
    // texto quede sobre cielo liso; ese pan pide una escala mínima de 1,12
    // (|pan| ≤ 50·(z−1)), así que el empuje arranca en 1,13 y conserva su 4 %.
    zoom: [1.13, 1.17],
    pan: -6,
    entra: "corte",
    reason: "El mar turquesa y el islote, con medio cuadro de cielo limpio: el titular, centrado, cae sobre cielo y no sobre las palmeras; es la miniatura.",
  },
  {
    id: "c02-paseo",
    src: v("16111565-hd_1080_1920_30fps"),
    desde: 2.0,
    ...tramo(8, 12),
    zoom: EMPUJE,
    entra: "corte",
    reason: "Llegar: la cámara avanza por el paseo entre palmeras hacia la playa.",
  },
  {
    id: "c03-velero",
    src: v("12498515_2160_3840_30fps"),
    desde: 4.0,
    ...tramo(12, 16),
    zoom: EMPUJE,
    entra: "corte",
    reason: "El último plano tranquilo: la subida de la música termina sobre el velero.",
  },
  {
    id: "c04-buggy",
    src: v("12992103_1080_1920_30fps"),
    desde: 8.3,
    ...tramo(16, 20),
    zoom: EMPUJE,
    entra: "corte",
    reason: "EL DROP: el buggy rompe la cortina de agua justo cuando entra el bombo.",
  },
  {
    id: "c05-quad-rio",
    src: v("14770266_1080_1920_30fps"),
    desde: 1.4,
    ...tramo(20, 24),
    zoom: EMPUJE,
    entra: "corte",
    reason: "El quad cruza el río y se le echa encima a la cámara: la energía sigue arriba.",
  },
  {
    id: "c06-aereo",
    src: v("15308557_1080_1920_24fps"),
    desde: 2.0,
    ...tramo(24, 28),
    zoom: EMPUJE,
    entra: "corte",
    reason: "La playa desde el aire: un respiro sin bajar el ritmo.",
  },
  {
    id: "c07-catamaran",
    src: v("19109877-hd_1920_1080_30fps"),
    desde: 1.0,
    ...tramo(28, 32),
    zoom: EMPUJE,
    entra: "corte",
    reason: "La fiesta en el catamarán: el «todo incluido» en un plano. Recortado al centro de un clip apaisado.",
  },
  {
    id: "c08-cascada",
    src: v("16837285_1080_1920_30fps"),
    desde: 3.0,
    ...tramo(32, 36),
    zoom: EMPUJE,
    entra: "corte",
    reason: "La cascada: no todo es playa.",
  },
  {
    id: "c09-palmera",
    src: v("13007144_2160_3840_60fps"),
    desde: 2.0,
    ...tramo(36, 40),
    zoom: EMPUJE,
    entra: "corte",
    reason: "El mar otra vez, bajo una palmera: vuelta a la calma antes del cierre.",
  },
  {
    id: "c10-atardecer",
    src: v("13235242_1080_1920_60fps"),
    desde: 12.0,
    ...tramo(40, 48),
    zoom: CIERRE,
    entra: "corte",
    salidaNegro: 24,
    reason: "El cierre: los quads al atardecer hasta el final de la frase musical, y a negro con la música.",
  },
];

/** Frames de la composición: el golpe 48, el final de la frase que abre el drop. */
export const DURACION_016 = golpe(48);
