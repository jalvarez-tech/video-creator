/**
 * EL SONIDO DEL 069 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS (los MP4 del incendio traen gritos y viento, y el de la fiesta, su música: no suenan). Lo que se oye pasa por `<PistaAudio>` y son tres cosas:
 *
 *   vocesMov      la voz de ELLOS DOS en los dos MOV (`mov1-voz.wav` y `mov2-voz.wav`): el mismo arranque que su imagen (`desde` y `en` del plano), UNA ganancia de ±0 dB —el WAV ya es el tratado, a −15 LUFS
 *                 en su ventana— y silencio fuera de lo que dicen, que ya viene en el propio WAV.
 *   locuciones    la voz en off de John y de Isabella, PENDIENTE de grabarse. Por cada hueco de `voz-069.ts` con una locución entregada (`voces-069.ts`, que escribe `normalizar.mjs --voz`) entra un tramo
 *                 en el `en` del hueco, con un fundido de 2 f al entrar y de 6 f al salir. Sin locución no hay tramo.
 *   musica        «Softly» (orquesta de cuerdas de Judah Earl y Brandon Black), ENTERA y sin recortar (`musica-softly.wav`, la canción decodificada), desde el segundo `INICIO_MUSICA` en el frame 0. Los cortes de
 *                 imagen caen en sus subidas de nivel (`metraje-069.ts`), así que NO se mueve ni se estira: lo único que se hace con ella es subirla o bajarla. (La rev. 2 llevaba «Children» y la 1 «We Are»:
 *                 `proyectos/069/rev2-children/` y `rev1-we-are/`.)
 *
 * LA MEZCLA (en LUFS; la sonoridad de la canción por segundos está en `musica-069.ts`, medida con ebur128):
 *   voz de ellos           −15 (el nivel que usa el estudio para la voz; la de los MOV, tratada, mide −15,1 con el pico a −2,0 dBFS)
 *   música SOLA            −15,9 en la meseta (la canción está a −12,0 LUFS: ganancia `GANANCIA_BASE_DB` = −3,9 dB). El resto sale de la propia canción: la frase del arranque queda en −16/−17 (el gancho), se apaga
 *                          hasta −30 en el incendio, se queda en el valle bajo el MOV 1 (−28…−35) y sube despacio, de −28 a −22, hasta el golpe de cuerdas de la meseta del mensaje final (−14…−16). Esa FORMA es la razón de la elección.
 *   música BAJO UNA VOZ    −26 (11 LU por debajo, el estándar de las piezas con voz del estudio). Donde la canción ya está más baja que eso (casi todo el MOV 1, que está en el valle) no se toca: no hay
 *                          «ducking» donde no hace falta. Donde no (el arranque, la subida hacia el MOV 2, el mensaje final con las locuciones), la envolvente la baja hasta el objetivo.
 *
 * LAS RAMPAS (regla del canal): la BAJADA acaba ANTES de la primera palabra (`BAJADA` = 10 f, con curva de coseno: un ducking de 2-3 f se oye cortado) y la SUBIDA empieza `SOSTENIDO` f DESPUÉS de la
 * última (6 f) y dura `SUBIDA` (18 f). La música llega a su meseta al acabar la frase del MOV 2, en el golpe de cuerdas de los 147,225 s (f1435).
 *
 * LAS LOCUCIONES DUCKAN SOLO CUANDO LLEGAN. Mientras `VOCES_ENTREGADAS` esté vacío la música suena a su nivel «solo» en los huecos de la voz en off (la prueba suena entera y la subida se oye); cuando se entregue
 * una locución, su ventana (`en` hasta `en` + su duración medida) baja la música sin tocar nada más.
 *
 * EL FINAL. En la tarjeta la música sigue en su meseta 2 s, y se APAGA con curva de coseno hasta cero 2 f antes del final de la pieza: los textos se leen sin voz y sin cortes que sincronizar.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { volumenDe } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FPS_069, INICIO_MUSICA, INICIO_TARJETA, DURACION_069, VOZ_EN_MOV, a, metraje069 } from "./metraje-069";
import { lufsDeLaCancion } from "./musica-069";
import { VOCES_ENTREGADAS } from "./voces-069";
import { HUECOS_VOZ } from "./voz-069";

const plano = (id: string) => {
  const c = metraje069.find((x) => x.id === id);
  if (!c) throw new Error(`audio-069: falta ${id} en metraje-069.ts`);
  return c;
};

const MOV1 = plano("c06-juntos-caminan");
const MOV2 = plano("c14-juntos-unirnos");

/** La voz de ellos en cada MOV: el tramo cubre TODO el plano y el silencio fuera de la frase lo pone el propio WAV. */
export const vocesMov: readonly TramoAudio[] = [
  {
    id: "voz-mov1",
    src: "botswana-069/mov1-voz.wav",
    en: MOV1.en,
    dur: MOV1.dur,
    desde: MOV1.desde,
    ganancia: 1,
    reason: `${VOZ_EN_MOV["c06-juntos-caminan"].dice} Su voz, a −15 LUFS, solo de 11,81 a 20,41 s del MOV, que es lo que dura el plano.`,
  },
  {
    id: "voz-mov2",
    src: "botswana-069/mov2-voz.wav",
    en: MOV2.en,
    dur: MOV2.dur,
    desde: MOV2.desde,
    ganancia: 1,
    reason: `${VOZ_EN_MOV["c14-juntos-unirnos"].dice} Su voz, a −15 LUFS, solo de 6,01 a 14,45 s del MOV, que es lo que dura el plano.`,
  },
];

/** Las locuciones que ya llegaron, cada una en el frame de su hueco. */
export const locuciones: readonly TramoAudio[] = HUECOS_VOZ.flatMap((h): TramoAudio[] => {
  const v = VOCES_ENTREGADAS[h.id];
  if (!v) return [];
  return [
    {
      id: `vo-${h.id}`,
      src: v.src,
      en: h.en,
      // Un fotograma de más para que el fundido de salida no recorte la última sílaba.
      dur: Math.ceil(v.dur * FPS_069) + 1,
      desde: 0,
      ganancia: 1,
      entra: 2,
      sale: 6,
      reason: `${h.quien}: «${h.texto}»`,
    },
  ];
});

/* ── La música ────────────────────────────────────────────────────────────────────────────────────────────────────── */

/** ¿Suena la música? `false` = la pieza sale con las voces solas (y se publica con un audio de la plataforma encima). */
export const HAY_MUSICA = true;

export const CANCION = { titulo: "Softly", autor: "Judah Earl & Brandon Black", sha8: "87d78dc2", src: "botswana-069/musica-softly.wav", lufsMeseta: -12.0 } as const;

/** Ganancia base de la música en dB. La meseta de la canción (147,2-169,9 s) está a −12,0 LUFS: con −3,9 dB queda en −15,9, a un dB del nivel de la voz (−15, la música «sola» del estudio). */
export const GANANCIA_BASE_DB = -3.9;
/** Sonoridad a la que baja la música bajo una voz: 11 LU por debajo de ella. */
export const LUFS_BAJO_VOZ = -26;
/** Frames que dura la bajada (acaba ANTES de la primera palabra), que se queda baja tras la última y lo que dura la subida. */
export const BAJADA = 10;
export const SOSTENIDO = 6;
export const SUBIDA = 18;
/** Cuánto dura la meseta de la música bajo la tarjeta antes de apagarse, y dónde llega a cero (2 f antes del final). */
export const MESETA_BAJO_TARJETA = 60;

/** Una ventana de voz: del frame de su primera palabra al de su última. */
export interface VentanaDeVoz {
  id: string;
  /** Frame de la primera palabra. */
  w0: number;
  /** Frame de la última. */
  w1: number;
}

/** Dónde se oye una voz: las dos de los MOV (siempre) y cada locución entregada. */
export const ventanasDeVoz: readonly VentanaDeVoz[] = [
  ...Object.entries(VOZ_EN_MOV).map(([id, v]): VentanaDeVoz => {
    const c = plano(id);
    return { id, w0: c.en + Math.round((v.s0 - (c.desde ?? 0)) * FPS_069), w1: c.en + Math.round((v.s1 - (c.desde ?? 0)) * FPS_069) };
  }),
  ...HUECOS_VOZ.flatMap((h): VentanaDeVoz[] => {
    const v = VOCES_ENTREGADAS[h.id];
    return v ? [{ id: h.id, w0: h.en, w1: h.en + Math.ceil(v.dur * FPS_069) }] : [];
  }),
];

const coseno = (u: number): number => (1 - Math.cos(Math.PI * Math.min(1, Math.max(0, u)))) / 2;

/** dB que hay que bajar la música (sobre la base) para que quede en `LUFS_BAJO_VOZ` en el frame `f`; 0 si ya está más baja. */
const objetivoDb = (f: number): number => Math.min(0, LUFS_BAJO_VOZ - (lufsDeLaCancion(INICIO_MUSICA + f / FPS_069) + GANANCIA_BASE_DB));

/** Cuánto baja la música (dB, ≤ 0) por culpa de UNA ventana, en el frame `f`. */
export const profundidadDe = (v: VentanaDeVoz, f: number): number => {
  if (f < v.w0 - BAJADA || f > v.w1 + SOSTENIDO + SUBIDA) return 0;
  if (f < v.w0) return objetivoDb(v.w0) * coseno((f - (v.w0 - BAJADA)) / BAJADA);
  if (f <= v.w1 + SOSTENIDO) return objetivoDb(Math.min(f, v.w1));
  return objetivoDb(v.w1) * (1 - coseno((f - (v.w1 + SOSTENIDO)) / SUBIDA));
};

/** La ganancia lineal de la música en el frame `f`: base, menos lo que baje la voz más exigente, por el apagado de la tarjeta. */
export const gananciaMusica = (f: number): number => {
  let baja = 0;
  for (const v of ventanasDeVoz) baja = Math.min(baja, profundidadDe(v, f));
  const apagado = 1 - coseno((f - (INICIO_TARJETA + MESETA_BAJO_TARJETA)) / (DURACION_069 - 2 - (INICIO_TARJETA + MESETA_BAJO_TARJETA)));
  return Math.pow(10, (GANANCIA_BASE_DB + baja) / 20) * apagado;
};

/** Los puntos de la envolvente: los de las rampas de cada voz, cada medio segundo dentro de ellas, los del apagado de la tarjeta, el frame 0 y el final. */
const puntosDeLaEnvolvente = (): [number, number][] => {
  const frames = new Set<number>([0, 1, DURACION_069 - 2]);
  for (const v of ventanasDeVoz) {
    for (let k = 0; k <= 4; k++) frames.add(Math.round(v.w0 - BAJADA + (k * BAJADA) / 4));
    for (let f = v.w0; f <= v.w1 + SOSTENIDO; f += 15) frames.add(f);
    frames.add(v.w1);
    frames.add(v.w1 + SOSTENIDO);
    for (let k = 0; k <= 4; k++) frames.add(Math.round(v.w1 + SOSTENIDO + (k * SUBIDA) / 4));
  }
  const fin = INICIO_TARJETA + MESETA_BAJO_TARJETA;
  for (let k = 0; k <= 8; k++) frames.add(Math.round(fin + (k * (DURACION_069 - 2 - fin)) / 8));
  return [...frames]
    .filter((f) => f >= 0 && f <= DURACION_069 - 2)
    .sort((x, y) => x - y)
    .map((f): [number, number] => [f, Math.round(gananciaMusica(f) * 1000) / 1000]);
};

/**
 * Remotion le pasa el volumen a ffmpeg como UNA expresión `if(between(t,…),valor,if(…))` con un `if` por cada valor distinto de la ganancia (a 3 decimales), y ffmpeg no admite más de ≈ 80 `if`
 * anidados. Una envolvente con muchas rampas se PARTE en tramos de la misma canción, consecutivos y sin solape (cada uno empieza en el frame de fuente en que acabó el anterior: es la misma muestra).
 */
const MAX_VALORES = 60;

const trocea = (puntos: [number, number][], fin: number): TramoAudio[] => {
  const entero: TramoAudio = { id: "musica", src: CANCION.src, en: 0, dur: fin, desde: INICIO_MUSICA, ganancia: puntos, reason: "" };
  const v = (f: number): number => volumenDe(entero, f);
  const redondea = (x: number): number => Math.round(x * 1000) / 1000;
  const cortes = [0];
  let cambios = 0;
  let ultimo = redondea(v(0));
  for (let f = 1; f < fin; f++) {
    const x = redondea(v(f));
    if (x !== ultimo) {
      cambios++;
      ultimo = x;
    }
    if (cambios >= MAX_VALORES) {
      cortes.push(f);
      cambios = 0;
    }
  }
  cortes.push(fin);
  return cortes.slice(0, -1).map((c0, i) => {
    const c1 = cortes[i + 1];
    const interior = puntos.filter(([f]) => f > c0 && f < c1);
    const ganancia: [number, number][] = [[c0, v(c0)], ...interior, [c1, v(c1)]];
    return {
      id: `musica-${i + 1}`,
      src: CANCION.src,
      en: c0,
      dur: c1 - c0,
      // El segundo de la canción en el frame `c0`: la misma muestra en que acabó el trozo anterior.
      desde: INICIO_MUSICA + c0 / FPS_069,
      // La subida de 7,3 dB del frame 1 suena entera: 1 f solo quita el clic, no se come el ataque (catálogo, regla 4).
      entra: i === 0 ? 1 : 0,
      ganancia,
      reason:
        i === 0
          ? `«${CANCION.titulo}» (${CANCION.autor}), la canción entera desde el segundo ${INICIO_MUSICA}: sin recortar ni estirar, porque los cortes de imagen caen en sus subidas de nivel. La envolvente la deja en −15,9 LUFS en la meseta y la baja a −26 bajo cada voz; ` +
            `se apaga con curva de coseno bajo la tarjeta. Partida en tramos consecutivos de la misma canción: ffmpeg no admite una expresión de volumen con más de ≈ 80 valores distintos.`
          : `«${CANCION.titulo}», trozo ${i + 1} de ${cortes.length - 1}: sigue donde acabó el anterior (f${c0}), la misma muestra de la canción.`,
    };
  });
};

export const musica069: readonly TramoAudio[] = HAY_MUSICA ? trocea(puntosDeLaEnvolvente(), DURACION_069) : [];

/** Lo que monta `<PistaAudio>`. */
export const audio069: readonly TramoAudio[] = [...vocesMov, ...locuciones, ...musica069];

/** Para la puerta: el frame de la composición en el que suena el segundo `t` de la canción. */
export const frameDeLaCancion = a;
