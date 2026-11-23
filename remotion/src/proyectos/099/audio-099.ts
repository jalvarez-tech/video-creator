/**
 * EL AUDIO DEL 099 — las voces de las niñas y «A Tus Pies», por tramos. Sin voz en off. Sale de
 * `proyectos/099/artefactos/03-timeline.md` §Voces y §Música. Copia adaptada de `audio-097.ts`.
 *
 * LAS VOCES. Cada plano que habla suena con su WAV tal cual y UNA ganancia que lleva su ventana de voz a −18 LUFS
 * (`VOCES_099`, medido con `limites-voz.py`: R29), con un tope de +12 dB. Nada más: ni compresión ni filtro.
 *
 * LA MÚSICA: UNA SOLA PISTA, ENTERA Y DE CORRIDO (pedido del usuario en el 097: «que la pista no se corte»). «A Tus Pies»
 * es instrumental (piano y colchón): no hay voz cantada que esquivar. Suena desde su primera nota (en f1) hasta el último
 * frame sin un corte ni un hueco; el MONTAJE se ordena por sus golpes (`metraje-099.ts`). Lo único que se toca es su
 * nivel: baja bajo las voces y vuelve, y se apaga con un fundido coseno en los últimos 50 f, que acaba justo antes del
 * golpe de 60,92 s con el que la canción abre otra frase.
 */
import { envolventeBajoVoz, gananciaHasta, volumenDe } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { DURACION_099, INICIO_MUSICA, metraje099 } from "./metraje-099";
import { VOCES_099 } from "./voces-099";

const OBJETIVO_VOZ = -18;
/**
 * Ninguna voz sube más de +6 dB (el techo de `revisaAudio`): más allá se sube el ruido de la terraza, no la niña. Por eso
 * «Compasivo» es la de la adolescente (HZ05 15,0 s, −18 LUFS) y no la de 31,2 s, que pedía +10 dB.
 */
const TOPE = Math.pow(10, 6 / 20);
const MUSICA = "mas-099/musica-a-tus-pies.wav";

const ganancia = (id: string, extraDb = 0): number => {
  const lufs = VOCES_099[id]?.lufs ?? -18;
  return Math.min(TOPE, gananciaHasta(lufs, OBJETIVO_VOZ)) * Math.pow(10, extraDb / 20);
};

/**
 * Ajustes por plano: lo que pide cada voz además de igualarla. `antes` adelanta el audio a su plano (corte en J: la
 * primera sílaba empieza antes del corte de imagen; negativo = el audio empieza DESPUÉS que el plano), `despues` lo deja
 * sonar bajo el plano siguiente (corte en L), `db` corrige la ganancia y `entra`/`sale` son sus fundidos.
 */
export const AJUSTE: Record<string, { db?: number; antes?: number; despues?: number; hasta?: number; entra?: number; sale?: number }> = {
  // «…es un conejito» acaba en 3,05 s y el plano en 3,01: 4 f bajo HZ17, que no habla hasta 0,7 s (f540).
  "p10-hz15": { despues: 4, sale: 4 },
  // «¡Dios es bueno! ¡…!» acaba en 5,5 s y el plano en 5,47: la cola del grito se apaga bajo el dron.
  "p14-hz19": { despues: 6, sale: 6 },
  // Los vítores de HZ32 se apagan con su plano (la música vuelve a subir bajo el círculo).
  "p16-hz32": { sale: 10 },
};

const voces: TramoAudio[] = metraje099
  .filter((c) => c.audio)
  .map((c) => {
    const a = AJUSTE[c.id] ?? {};
    const antes = a.antes ?? 0;
    return {
      id: `voz-${c.id}`,
      src: c.audio as string,
      en: c.en - antes,
      dur: a.hasta !== undefined ? Math.round((a.hasta - ((c.desde ?? 0) - antes / 30)) * 30) : c.dur + antes + (a.despues ?? 0),
      desde: (c.desde ?? 0) - antes / 30,
      ganancia: ganancia(c.id, a.db),
      entra: a.entra ?? 3,
      sale: a.sale ?? 4,
      reason: `La voz de ${c.id}, igualada a ${OBJETIVO_VOZ} LUFS`,
    };
  });

/** Los gritos a coro (el lema, «¡Dios es bueno!», el clímax): sobre ellos la música no se hunde, solo baja un poco. */
const GRITOS = new Set(["voz-p13-hz08", "voz-p14-hz19", "voz-p16-hz32"]);

/**
 * Dónde HABLAN de verdad (no dónde suena el plano): la ventana medida (`VOCES_099`, f0-f1) con 4 f de aire, dentro del
 * tramo. Así la música vuelve en cuanto la niña se calla y no cuando acaba el plano.
 */
const hablan = voces
  .filter((t) => !GRITOS.has(t.id))
  .map((t) => {
    const v = VOCES_099[t.id.replace(/^voz-/, "")];
    if (!v || v.f0 === null || v.f1 === null) return { en: t.en, dur: t.dur };
    const a = Math.max(t.en, v.f0 - 4);
    const b = Math.min(t.en + t.dur, v.f1 + 4);
    return b > a ? { en: a, dur: b - a } : { en: t.en, dur: t.dur };
  });

/** Sola ≈ −22 LUFS (la ventana de la canción mide −20,2); bajo las voces ≈ −29. */
const ALTO = 0.79;
const BAJO = 0.35;
/** Rampa de 10 f: dos voces con menos de 20 f de hueco son UNA bajada (la letanía no bombea). */
const RAMPA = 10;

/**
 * Los perfiles que multiplican la bajada:
 *   · bajo la pregunta y la letanía (palabras sueltas, f0-f458) la música queda un poco más arriba (×1,25 → ≈ −27):
 *     una palabra gritada de un segundo se entiende con la música más cerca, y así la intro de la canción se oye;
 *   · bajo los gritos a coro, ×0,7 sobre `ALTO` (≈ −25): la alegría tiene que sonar llena;
 *   · el fundido final, coseno, de f1765 a f1815.
 */
const LETANIA = { hasta: 458, factor: 1.25 } as const;
const FUNDIDO = 50;

const perfil = (f: number): number => {
  let k = 1;
  if (f <= LETANIA.hasta - 6) k *= LETANIA.factor;
  else if (f < LETANIA.hasta + 4) k *= LETANIA.factor + ((1 - LETANIA.factor) * (f - (LETANIA.hasta - 6))) / 10;
  for (const t of voces.filter((v) => GRITOS.has(v.id))) {
    const a = t.en;
    const b = t.en + t.dur;
    if (f >= a && f <= b) k *= 0.7;
    else if (f > a - 6 && f < a) k *= 1 - (0.3 * (f - (a - 6))) / 6;
    else if (f > b && f < b + 6) k *= 0.7 + (0.3 * (f - b)) / 6;
  }
  const inicioFundido = DURACION_099 - FUNDIDO;
  if (f > inicioFundido) k *= Math.cos((Math.PI / 2) * Math.min(1, (f - inicioFundido) / FUNDIDO));
  return k;
};

/** La envolvente: la de bajo voz del motor, multiplicada por el perfil en cada frame en que algo cambia. */
const ENVOLVENTE_MUSICA: [number, number][] = (() => {
  const base = envolventeBajoVoz(hablan, { alto: ALTO, bajo: BAJO, rampa: RAMPA, duracion: DURACION_099 });
  const t: TramoAudio = { id: "base", src: MUSICA, en: 0, dur: DURACION_099, ganancia: base, reason: "" };
  const frames = new Set<number>([0, DURACION_099]);
  for (const [f] of base) frames.add(f);
  // Los bordes del perfil y, en el fundido, un punto cada 5 f para que la recta siga al coseno.
  for (const f of [LETANIA.hasta - 6, LETANIA.hasta + 4]) frames.add(f);
  for (const v of voces.filter((x) => GRITOS.has(x.id))) for (const f of [v.en - 6, v.en, v.en + v.dur, v.en + v.dur + 6]) frames.add(f);
  for (let f = DURACION_099 - FUNDIDO; f <= DURACION_099; f += 5) frames.add(f);
  return [...frames]
    .filter((f) => f >= 0 && f <= DURACION_099)
    .sort((x, y) => x - y)
    .map((f) => [f, +(volumenDe(t, f) * perfil(f)).toFixed(4)] as [number, number]);
})();

/**
 * Cuántos valores distintos de volumen admite un tramo: Remotion pasa el volumen a ffmpeg con un `if` anidado por valor
 * y ffmpeg revienta hacia los 100 (memoria `remotion-volumen-limite-ffmpeg`).
 */
const MAX_VALORES = 60;

/**
 * UNA pista, partida en tramos CONSECUTIVOS de la misma fuente solo por ese límite de ffmpeg: cada trozo empieza en la
 * muestra exacta en que acaba el anterior (`desde` = INICIO + frame/30, sin hueco ni solape), así que suena de corrido,
 * como una sola. Es el `trocea` del 097.
 */
const trocea = (puntos: [number, number][], fin: number): TramoAudio[] => {
  const entero: TramoAudio = { id: "a-tus-pies", src: MUSICA, en: 0, dur: fin, desde: INICIO_MUSICA, ganancia: puntos, reason: "" };
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
      id: `a-tus-pies-${i + 1}`,
      src: MUSICA,
      en: a,
      dur: b - a,
      desde: INICIO_MUSICA + a / 30,
      ganancia: [[a, v(a)], ...interior, [b, v(b)]] as [number, number][],
      reason:
        i === 0
          ? "«A Tus Pies» entera y sin cortes, desde su primera nota (0,449 s, en f1): el montaje se ordena por sus golpes. Partida en trozos consecutivos de la misma fuente solo por el límite de valores de volumen de ffmpeg"
          : `«A Tus Pies», trozo ${i + 1} de ${cortes.length - 1}: sigue en la misma muestra en que acabó el anterior (f${a})`,
    };
  });
};

const musica: TramoAudio[] = trocea(ENVOLVENTE_MUSICA, DURACION_099);

export const audio099: TramoAudio[] = [...voces, ...musica];
