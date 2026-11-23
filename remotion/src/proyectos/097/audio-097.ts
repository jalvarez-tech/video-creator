/**
 * EL AUDIO DEL 097 — las voces de las niñas y la música («Yeshua (Versión Piano)», elegida por el
 * usuario el 2026-11-22), por tramos. Sale de `03-timeline.md` §Voces y §Música, con la pista real.
 *
 * LAS VOCES. Cada plano que habla suena con su WAV tal cual y UNA ganancia que lleva su ventana de
 * voz a −18 LUFS (`VOCES_097`, medido con `limites-voz.py`: R29). Nada más: ni compresión ni filtro.
 * Las preguntas de las niñas llegan casi a 0 dBFS y las respuestas a −20/−30: con esto se igualan.
 *
 * LA VOZ EN OFF va a la espera de la locución del usuario («deja el espacio para la voz en off,
 * después la subimos»). Sus huecos están en el timeline y su texto, en las tiras índigo; cuando
 * lleguen los WAV, entran en `VOZ_EN_OFF` y la música baja también bajo ellos.
 *
 * LA MÚSICA: UNA SOLA PISTA, ENTERA Y DE CORRIDO (rev. 4, pedido del usuario, 2026-11-22: «que la pista no
 * se corte, así tengas que reorganizar las escenas»). «Yeshua (Versión Piano)» suena desde su primera nota
 * (su primera nota) en el frame 0 hasta el último frame, sin un solo corte ni cruce; es el MONTAJE el que
 * se ordena por sus partes (ver `metraje-097.ts` y `GOLPES_097`). Lo único que se toca es su nivel: baja bajo
 * las voces y sube sola, y se apaga en los últimos 45 f.
 */
import { envolventeBajoVoz, gananciaHasta, volumenDe } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { DURACION_097, metraje097 } from "./metraje-097";
import { VOCES_097 } from "./voces-097";

const OBJETIVO_VOZ = -18;
/** Ninguna voz sube más de +18 dB: más allá se sube el ruido de la sala, no la niña. */
const TOPE = Math.pow(10, 18 / 20);
const MUSICA = "mas-097/musica-yeshua.wav";

const ganancia = (id: string, extraDb = 0): number => {
  const lufs = VOCES_097[id]?.lufs ?? -24;
  return Math.min(TOPE, gananciaHasta(lufs, OBJETIVO_VOZ)) * Math.pow(10, extraDb / 20);
};

/**
 * Ajustes por plano: lo que pide cada voz además de igualarla. `antes` adelanta el audio a su plano
 * (corte en J: la primera sílaba empieza un poco antes del corte de imagen) y `despues` lo deja sonar
 * bajo el plano siguiente (corte en L: la última sílaba acaba después). Medido con la energía de cada
 * clip (`material/transcripciones/*-vocabulario/*.voz.json`): rev. 1 cortaba estas frases (pedido del
 * usuario, 2026-11-22: «algunas voces se cortan»).
 */
export const AJUSTE: Record<string, { db?: number; antes?: number; despues?: number; hasta?: number; entra?: number; sale?: number }> = {
  // HZ20 arranca con el «¡tres!» de una cuenta atrás (0,0-0,3 s, −19 dB): fuera (pedido del usuario, 2026-11-22).
  // `antes` negativo = el audio empieza DESPUÉS que el plano: 12 f (0,4 s); la bienvenida empieza en 2,15 s.
  // −5 dB: medido solo lo que se oye (0,4-4,95 s, rev. 9) da −30,6 LUFS, y llevarlo a −18 (+12,6 dB) pasaría su pico de
  // 0 dBTP; así queda a +7,6 dB, el nivel con el que el usuario la oyó hasta la rev. 8 (+7,4).
  "p02-hz20": { antes: -12, entra: 4, hasta: 4.95, sale: 6, db: -5 },
  // …y acaba en 5,17 s (`hasta`, segundo de la fuente; 4,95 s desde la rev. 7, que el plano dura 5,07 s) y a los 5,3 las niñas gritan al cruzar la puerta; con
  // la ganancia de esta toma (+12 dB) ese grito pasaba de 0 dBFS (medido en la prueba rev. 5, f158-f159).
  // «¿Cómo va tu relación con Cristo?» acaba en 5,25 s y el plano en 5,0: la cola suena bajo P17 hasta f1299.
  "p16-vt07": { despues: 9, sale: 4 },
  // «¡Mi-sericordia…» empieza en 0,65 s y el plano en 0,70: 3 f antes del corte (detrás solo hay el silencio del testimonio).
  "p18-hz08": { antes: 3, entra: 2 },
  // «¡Feliz Navidad…» empieza antes que el plano: 6 f de corte en J, cruzado con la cola del grito de HZ08.
  "p19-hz10": { antes: 6, entra: 3 },
  // HZ19 suena ENTERO: rev. 1 cortaba la voz a mitad del grito para callar la 2.ª frase (sin oír: «¡A la lucha!» o
  // «¡Aleluya!», R31 antes de la final). Sigue 9 f bajo P21 y se apaga en ellos.
  "p20-hz19": { despues: 9, sale: 9 },
  // HZ28: las risas, por debajo de la música.
  "p21-hz28": { db: -8 },
};

const voces: TramoAudio[] = metraje097
  .filter((c) => c.audio)
  .map((c) => {
    const retraso = (c.audioDesdeFrame ?? c.en) - c.en;
    const a = AJUSTE[c.id] ?? {};
    const antes = a.antes ?? 0;
    return {
      id: `voz-${c.id}`,
      src: c.audio as string,
      en: c.en + retraso - antes,
      // `hasta` fija dónde acaba el audio en la FUENTE, sea cual sea la duración del plano.
      dur: a.hasta !== undefined ? Math.round((a.hasta - ((c.desde ?? 0) + (retraso - antes) / 30)) * 30) : c.dur - retraso + antes + (a.despues ?? 0),
      desde: (c.desde ?? 0) + (retraso - antes) / 30,
      ganancia: ganancia(c.id, a.db),
      entra: a.entra ?? 3,
      sale: a.sale ?? 4,
      reason: `La voz de ${c.id}, igualada a ${OBJETIVO_VOZ} LUFS`,
    };
  });

const sueltas: TramoAudio[] = [
  {
    id: "vo-gracias",
    src: "mas-097/vt33.wav",
    en: 3741,
    dur: 75,
    desde: 64.9,
    ganancia: ganancia("vo-gracias"),
    entra: 3,
    sale: 8,
    reason: "«Gracias por acompañarme en este viaje.»: la voz de la niña que enseñó su casa, sobre la foto del grupo",
  },
];

/**
 * LA VOZ EN OFF (MAS), a la espera de la locución. Cada entrada: el WAV que llegue (`mas-097/vo1.wav`…),
 * su hueco y su texto. Con `[]` la pieza suena sin ella y las tiras índigo dicen lo que dirá.
 */
export const VOZ_EN_OFF: TramoAudio[] = [];

/** Los huecos de la voz en off (frames del timeline), para que la música ya baje bajo ellos cuando llegue. */
export const HUECOS_VO = [
  [2806, 109],
  [2917, 81],
  [3036, 156],
  [3216, 255],
  [3486, 99],
] as const;

/**
 * Dónde HABLAN de verdad (no dónde suena el plano): la ventana de voz medida (`VOCES_097`, f0-f1) con 4 f
 * de aire, dentro del tramo. Con el tramo entero la música se quedaba abajo todo el plano aunque la niña
 * hablara al final (rev. 0: la puerta de HZ20 se oía hundida de f180 a f225).
 * HZ20: `limites-voz.py` da el plano entero por el ruido de la puerta; la frase va de 2,15 a 4,15 s (f62-f126 desde la rev. 5).
 */
const VENTANA_A_MANO: Record<string, readonly [number, number]> = { "voz-p02-hz20": [62, 126] };
/** Los gritos (el lema, «¡Feliz Navidad!», «¡Dios es bueno!», el clímax): sobre ellos la música no se hunde, solo baja un poco (`GRITOS` en la envolvente). */
const GRITOS = new Set(["voz-p18-hz08", "voz-p19-hz10", "voz-p20-hz19", "voz-p23-hz32"]);
const hablan = [...voces, ...sueltas, ...VOZ_EN_OFF].filter((t) => !GRITOS.has(t.id)).map((t) => {
  const mano = VENTANA_A_MANO[t.id];
  if (mano) return { en: mano[0], dur: mano[1] - mano[0] };
  const v = VOCES_097[t.id.replace(/^voz-/, "")];
  if (!v || v.f0 === null || v.f1 === null) return { en: t.en, dur: t.dur };
  const a = Math.max(t.en, v.f0 - 4);
  const b = Math.min(t.en + t.dur, v.f1 + 4);
  return b > a ? { en: a, dur: b - a } : { en: t.en, dur: t.dur };
});

/**
 * La envolvente de un trozo: la de bajo voz (`envolventeBajoVoz`) recortada al trozo y multiplicada
 * por un perfil propio (la retirada, el silencio). Pocos puntos por trozo: con más de ~80 la mezcla
 * de Remotion se rompe (memoria `remotion-volumen-limite-ffmpeg`).
 */
const envolvente = (
  a: number,
  b: number,
  o: { alto: number; bajo: number; rampa?: number },
  perfil: readonly (readonly [number, number])[] = []
): [number, number][] => {
  const base = envolventeBajoVoz(
    hablan.filter((v) => v.en + v.dur > a - 30 && v.en < b + 30),
    { alto: o.alto, bajo: o.bajo, rampa: o.rampa ?? 8, duracion: DURACION_097 }
  );
  const valor = (pts: readonly (readonly [number, number])[], f: number, defecto: number) => {
    if (!pts.length) return defecto;
    if (f <= pts[0][0]) return pts[0][1];
    for (let i = 1; i < pts.length; i++) {
      if (f <= pts[i][0]) {
        const [f0, v0] = pts[i - 1];
        const [f1, v1] = pts[i];
        return v0 + ((v1 - v0) * (f - f0)) / (f1 - f0);
      }
    }
    return pts[pts.length - 1][1];
  };
  const frames = new Set<number>([a, b]);
  for (const [f] of base) if (f > a && f < b) frames.add(f);
  for (const [f] of perfil) if (f > a && f < b) frames.add(f);
  return [...frames].sort((x, y) => x - y).map((f) => [f, +(valor(base, f, o.alto) * valor(perfil, f, 1)).toFixed(4)] as [number, number]);
};

/** Bajo los gritos la música baja −3 dB (×0,7) y no −8: la alegría tiene que sonar llena. */
const PERFIL_GRITOS: [number, number][] = (() => {
  const pts: [number, number][] = [];
  for (const t of voces.filter((v) => GRITOS.has(v.id)).sort((x, y) => x.en - y.en)) {
    pts.push([t.en - 6, 1], [t.en, 0.7], [t.en + t.dur, 0.7], [t.en + t.dur + 6, 1]);
  }
  return pts;
})();

/**
 * La primera nota de la pieza (1,365 s, 25,5 dB) cae en el frame 1: 1,335 s = 40,05 frames de la pieza (Remotion
 * redondea a 40). Rev. 6: vuelve a empezar aquí (pedido del usuario: «empieza la canción desde donde empezaba la del
 * vídeo anterior»); la rev. 5 arrancaba en el golpe de 6,51 s.
 */
const INICIO_MUSICA = 1.335;
/** Los últimos 45 f se apagan a cero dentro de la envolvente (y no con `sale`, que solo tendría el último trozo). */
const FUNDIDO_FINAL = 45;
/**
 * Cuántos valores distintos de volumen admite un tramo: Remotion pasa el volumen a ffmpeg con un `if` anidado
 * por valor (a 3 decimales) y ffmpeg revienta hacia los 100 (memoria `remotion-volumen-limite-ffmpeg`; 80 pasa).
 */
const MAX_VALORES = 60;

/**
 * UNA pista, partida en tramos CONSECUTIVOS de la misma fuente solo por ese límite de ffmpeg: cada trozo
 * empieza en la muestra exacta en que acaba el anterior (`desde` = INICIO + frame/30, sin hueco ni solape),
 * así que suena de corrido, como una sola. Es el `trocea` del 042.
 */
const trocea = (puntos: [number, number][], fin: number): TramoAudio[] => {
  const entero: TramoAudio = { id: "yeshua", src: MUSICA, en: 0, dur: fin, desde: INICIO_MUSICA, ganancia: puntos, reason: "" };
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
  return cortes.slice(0, -1).map((a, i) => {
    const b = cortes[i + 1];
    const interior = puntos.filter(([f]) => f > a && f < b);
    return {
      id: `yeshua-${i + 1}`,
      src: MUSICA,
      en: a,
      dur: b - a,
      desde: INICIO_MUSICA + a / 30,
      ganancia: [[a, v(a)], ...interior, [b, v(b)]] as [number, number][],
      entra: i === 0 ? 2 : undefined,
      reason:
        i === 0
          ? "«Yeshua» entera y sin cortes, desde su primera nota: el montaje se ordena por sus partes. Partida en trozos consecutivos de la misma fuente solo por el límite de valores de volumen de ffmpeg"
          : `«Yeshua», trozo ${i + 1} de ${cortes.length - 1}: sigue en la misma muestra en que acabó el anterior (f${a})`,
    };
  });
};

/** −16,3 LUFS el tramo entero: sola a ≈ −22 (×0,50), bajo las voces a ≈ −30 (×0,20); bajo los gritos, ×0,35. */
const ENVOLVENTE_MUSICA = envolvente(0, DURACION_097, { alto: 0.5, bajo: 0.2 }, [
  ...PERFIL_GRITOS,
  [DURACION_097 - FUNDIDO_FINAL, 1],
  [DURACION_097, 0],
]);

const musica: TramoAudio[] = trocea(ENVOLVENTE_MUSICA, DURACION_097);

export const audio097: TramoAudio[] = [...voces, ...sueltas, ...VOZ_EN_OFF, ...musica];
