/**
 * EL AUDIO DEL 106 — las voces de las niñas y «Yeshua» (Versión Piano), por tramos. Sin voz en off.
 *
 * LA MISMA MEZCLA QUE EL 105 (aprobada y exportada el 2026-11-23; la receta de `remotion/src/proyectos/101/historia.ts`,
 * copiada y no importada: un proyecto no importa de otro):
 *   · cada frase con su WAV tal cual y UNA ganancia que lleva su ventana de voz a −23 LUFS (`VOCES_106`, medido por
 *     `proyectos/106/herramientas/medir-voces.mjs`), con el tope de +6 dB de la puerta de audio;
 *   · la música, UNA pista de corrido desde 276,79 s: sola a −25 LUFS, bajo una voz a −34 (11 LU por debajo), desde donde
 *     HABLAN de verdad (la ventana medida, con 4 f de aire), no el tramo entero.
 * Lo que cambia: el CTA en papel dura 309 f (el del 100) y la música sigue bajo él y se apaga con un coseno de 60 f (la
 * pista no tiene un final cerca: el coseno es el final, como en el 100). La sonoridad de entrega la pone el masterizado.
 */
import { envolventeBajoVoz, gananciaHasta, volumenDe } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { DURACION_106, FPS_106, INICIO_MUSICA, VOCES_PLAN } from "./metraje-106";
import { MUSICA_LUFS_106, VOCES_106 } from "./voces-106";

const OBJETIVO_VOZ = -23;
/** +6 dB = ×2: más arriba ya no se iguala un nivel, se fabrica ruido. */
const TOPE = 2;
const MUSICA_SOLA = -25;
const MUSICA_BAJO_VOZ = -34;
const FUNDIDO_FINAL = 60;
/** Remotion pasa el volumen a ffmpeg con un `if` por valor y ffmpeg revienta hacia los 100 (memoria `remotion-volumen-limite-ffmpeg`). */
const MAX_VALORES = 60;
const MUSICA = { titulo: "Yeshua (Versión Piano)", src: "mas-106/musica-yeshua.wav" } as const;

const nivelEn = (pts: readonly (readonly [number, number])[], f: number): number => {
  if (!pts.length) return 1;
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

const voces106: TramoAudio[] = VOCES_PLAN.map((v) => {
  const lufs = VOCES_106[v.id]?.lufs ?? OBJETIVO_VOZ;
  const g = Math.min(TOPE, gananciaHasta(lufs, OBJETIVO_VOZ));
  // Id propio del tramo de la mezcla (`mezcla-…`): `VOCES_PLAN` (lo que se mide) y el audio (lo que suena) tienen que
  // tener ids distintos para la puerta de audio, que los pide únicos en todo el archivo.
  return { id: `mezcla-${v.id}`, src: v.src, desde: v.desde, en: v.en, dur: v.dur, ganancia: +g.toFixed(4), entra: v.entra ?? 2, sale: v.sale ?? 3, reason: v.reason };
});

const hablan = VOCES_PLAN.map((v) => {
  const m = VOCES_106[v.id];
  if (!m || m.f0 === null || m.f1 === null) return { en: v.en, dur: v.dur };
  const a = Math.max(v.en, m.f0 - 4);
  const b = Math.min(v.en + v.dur, m.f1 + 4);
  return b > a ? { en: a, dur: b - a } : { en: v.en, dur: v.dur };
});
const alto = +Math.pow(10, (MUSICA_SOLA - MUSICA_LUFS_106) / 20).toFixed(4);
const bajo = +Math.pow(10, (MUSICA_BAJO_VOZ - MUSICA_LUFS_106) / 20).toFixed(4);
const base = envolventeBajoVoz(hablan, { alto, bajo, rampa: 8, duracion: DURACION_106 });
const coseno: [number, number][] = Array.from({ length: 13 }, (_, k) => [
  DURACION_106 - FUNDIDO_FINAL + Math.round((k * FUNDIDO_FINAL) / 12),
  +(0.5 * (1 + Math.cos((Math.PI * k) / 12))).toFixed(4),
]);
const frames = new Set<number>([0, DURACION_106]);
for (const [f] of base) frames.add(f);
for (const [f] of coseno) frames.add(f);
const envolvente = [...frames]
  .filter((f) => f >= 0 && f <= DURACION_106)
  .sort((x, y) => x - y)
  .map((f) => [f, +(nivelEn(base, f) * nivelEn(coseno, f)).toFixed(4)] as [number, number]);

/** UNA pista en trozos CONSECUTIVOS de la misma fuente, solo por el límite de valores de volumen de ffmpeg (el `trocea` del 097). */
const entera: TramoAudio = { id: "musica", src: MUSICA.src, en: 0, dur: DURACION_106, desde: INICIO_MUSICA, ganancia: envolvente, reason: "" };
const vol = (f: number): number => volumenDe(entera, f);
const r3 = (x: number): number => Math.round(x * 1000) / 1000;
const cortes = [0];
{
  let cambios = 0;
  let ultimo = r3(vol(0));
  for (let f = 1; f < DURACION_106; f++) {
    const x = r3(vol(f));
    if (x !== ultimo) {
      cambios++;
      ultimo = x;
    }
    if (cambios >= MAX_VALORES) {
      cortes.push(f);
      cambios = 0;
    }
  }
  cortes.push(DURACION_106);
}
const musica106: TramoAudio[] = cortes.slice(0, -1).map((a, i) => {
  const b = cortes[i + 1];
  const interior = envolvente.filter(([f]) => f > a && f < b);
  return {
    id: `musica-${i + 1}`,
    src: MUSICA.src,
    en: a,
    dur: b - a,
    desde: +(INICIO_MUSICA + a / FPS_106).toFixed(6),
    ganancia: [[a, +vol(a).toFixed(4)], ...interior, [b, +vol(b).toFixed(4)]] as [number, number][],
    entra: i === 0 ? 2 : undefined,
    reason:
      i === 0
        ? `«${MUSICA.titulo}» de corrido desde 276,79 s (el tramo que el 097 no usó, el del 105): su golpe de 324,99 s cae en f1446, cuando entra el papel`
        : `«${MUSICA.titulo}», trozo ${i + 1} de ${cortes.length - 1}: sigue en la muestra en que acabó el anterior (f${a})`,
  };
});

export const audio106: TramoAudio[] = [...voces106, ...musica106];
