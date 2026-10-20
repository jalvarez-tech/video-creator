/**
 * EL SONIDO DEL 047 — todo lo que suena, como DATOS (`TramoAudio[]`).
 *
 * `<PistaMetraje>` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por `<PistaAudio>`:
 *
 *   vocesTomas   la voz de Isabella en HK02, MD04, MD05 y CT03, derivada de los cortes que traen `audio` (`vocesDeCortes`): mismo arranque que su imagen, cruce de voz de 6 f (las cuatro entran con una disolvencia) y,
 *                como el WAV es el TRATADO de `normalizar.mjs` (`<toma>-voz.wav`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a ≈ −15 LUFS en su ventana), UNA ganancia de ±0,1 dB.
 *   musica       «Dreamlife», con una envolvente que BAJA mientras habla Isabella, sube en los recorridos y acompaña la CURVA de la canción (crece, tiene su meseta en el apartamento y cae donde entra el CTA).
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada fuente, `herramientas/lufs-rangos.py`):
 *   voz de Isabella      −15 (pedido del usuario: «la voz de Isabella a −15 LUFS sin saturar»; sus tomas crudas miden −19,4 · −23,2 · −23,8 · −20,5; tratadas, ≈ −15 con pico real de −2,5)
 *   música SOLA          −16 → −15 → −14 por tramos: la canción CRECE de verdad (−16 en la calma de la apertura, −12,8 en el paseo, −10,1 en la meseta del apartamento) y aquí se recoge a un +2 dB de subida total, no a un
 *                        −15 plano: una orquesta sin crescendo no es «Dreamlife». El techo es −14 LUFS, 1 LU por encima de la voz (que no suena a la vez). Una sola ganancia por tramo, sin `loudnorm`.
 *   música BAJO LA VOZ   −26 LUFS en cada ventana: 11 LU por debajo de ella (`BAJOS`); en el CTA se sigue la caída de la canción (ver abajo).
 *
 * LAS RAMPAS DE LA MÚSICA (revisión del 022: «la curva debe ser ANTES de que hable», ya regla del canal):
 *   · ENTRADA: la canción arranca en el f0 con un fundido de coseno de 8 f (no hay golpe donde entrar: se arranca en mitad de un lecho de cuerdas y una entrada a pelo daría un clic).
 *   · BAJADA ANTES DE CADA VOZ: de coseno, 10 f, y acaba 4 f ANTES de la primera palabra (en el hook y en la mitad; Isabella aparece con una disolvencia, así que la música baja mientras la sala aún se ve).
 *   · SUBIDA TRAS LA VOZ: de coseno, 24 f desde su última palabra. MD04 y MD05 comparten ventana: entre sus dos frases hay solo 15 f (0,5 s) de pausa y la música se queda abajo.
 *
 * EL CTA Y EL CIERRE. La canción CAE en el f1166 (217,3 s de la canción): de −12 a −18 dBFS en 0,6 s y de ahí un fundido de 20 s. La primera palabra del CTA suena en el f1169, 3 f después. La música baja ANTES
 * (de coseno, f1157-1165: −15 dB absolutos, que dejan la meseta de −10 LUFS en −25 durante la caída) y desde ahí SIGUE la caída de la canción: la ganancia sube conforme la canción baja (`CAIDA`), de modo que bajo la voz
 * queda siempre ≥ 9 LU por debajo de ella, y al acabar su última palabra se APAGA con curva de coseno hasta llegar a cero 2 f antes del final de la pieza, bajo la tarjeta del cierre.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { CAIDA_CANCION, FIN_MUSICA_047, FPS_047, INICIO_MUSICA, OBJETIVO_LUFS, frameDeCancion, metraje047 } from "./metraje-047";

/** La voz de las cuatro tomas a cámara (HK02, MD04, MD05 y CT03), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje047, { fps: FPS_047, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre. */
const CTA = metraje047.find((c) => c.id === "c10-cta");
if (!CTA) throw new Error("audio-047: falta c10-cta en metraje-047.ts");
export const FIN_CTA_047 = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number } => {
  const c = metraje047.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(`audio-047: ${id} no existe o no trae voz`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_047);
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_047);
  return { en: ini, dur: fin - ini, fin };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/**
 * ¿La música va en el render? `false` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es una pista de la biblioteca de Luxur (marcada † en el catálogo) y no se ha
 * verificado su licencia (ver 01-plan.md).
 */
export const HAY_MUSICA = true;

/** Sonoridad de «Dreamlife» en cada tramo SIN voz (ebur128 sobre la fuente, `lufs-rangos.py`): la apertura (f0-78), el paseo (f288-521) y el apartamento (f760-1157). */
const LUFS_TRAMO = { apertura: -15.9, paseo: -12.8, bloque5: -10.1 } as const;
/** El nivel de la música SOLA en cada tramo (LUFS): la subida de la canción, recogida a +2 dB en total. */
const OBJETIVO_MUSICA = { apertura: -16, paseo: -15, bloque5: -14 } as const;
/** El pico real de la canción en cada tramo (ebur128): la música nunca pasa de `TECHO_PICO`. */
const PICO_TRAMO = { apertura: -6.1, paseo: -2.0, bloque5: -0.4 } as const;
const TECHO_PICO = -2.5;
/**
 * La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente, el tramo que suena mientras ella habla): la del hook, la de MD04+MD05 (una sola ventana) y la del CTA (la caída, de −10 a −25).
 */
export const LUFS_CANCION_EN_VOZ = { "c02-hook": -15.0, "c05-mitad-precio": -11.5, "c10-cta": -17.9 } as const;
/** Ganancia lineal de la música sola en cada tramo (a su objetivo, sin pasar de `TECHO_PICO`). */
export const ALTOS = {
  apertura: Math.min(gananciaHasta(LUFS_TRAMO.apertura, OBJETIVO_MUSICA.apertura), Math.pow(10, (TECHO_PICO - PICO_TRAMO.apertura) / 20)),
  paseo: Math.min(gananciaHasta(LUFS_TRAMO.paseo, OBJETIVO_MUSICA.paseo), Math.pow(10, (TECHO_PICO - PICO_TRAMO.paseo) / 20)),
  bloque5: Math.min(gananciaHasta(LUFS_TRAMO.bloque5, OBJETIVO_MUSICA.bloque5), Math.pow(10, (TECHO_PICO - PICO_TRAMO.bloque5) / 20)),
} as const;
/**
 * Mientras habla Isabella: la música baja hasta −26 LUFS EN CADA VENTANA (11 LU bajo su voz de −15). No es un factor fijo sobre el nivel «solo»: la canción suena a −15,0 · −11,5 LUFS donde hablan el hook y la
 * mitad. La ganancia absoluta que deja cada ventana en −26 es la de `gananciaHasta`. (La del CTA no es un número: sigue la caída de la canción, `CAIDA`.)
 */
export const LUFS_MUSICA_BAJO_VOZ = -26;
export const BAJOS = {
  "c02-hook": gananciaHasta(LUFS_CANCION_EN_VOZ["c02-hook"], LUFS_MUSICA_BAJO_VOZ),
  "c05-mitad-precio": gananciaHasta(LUFS_CANCION_EN_VOZ["c05-mitad-precio"], LUFS_MUSICA_BAJO_VOZ),
} as const;
/** El instante de la canción que cada punto de `CAIDA` toca, y su ganancia en dB ABSOLUTA sobre el archivo (la canción cae sola a ≈ −25 LUFS hacia el 223 s: a partir de ahí no hay nada que bajar). */
export const CAIDA: readonly (readonly [number, number])[] = [
  [CAIDA_CANCION + 0.6, -12.0], // 217,9 s: la canción ya bajó 6 dB; la voz lleva 15 f hablando
  [CAIDA_CANCION + 1.2, -10.0], //  218,5 s
  [CAIDA_CANCION + 1.7, -8.4], //   219,0 s
  [CAIDA_CANCION + 2.7, -6.9], //   220,0 s
  [CAIDA_CANCION + 3.7, -3.8], //   221,0 s
  [CAIDA_CANCION + 4.7, -2.2], //   222,0 s
  [CAIDA_CANCION + 5.7, 0.0], //    223,0 s: la canción ya está a −25 LUFS
];
/** El nivel de la música en la primera palabra del CTA (dB absolutos sobre el archivo): la meseta de −10 LUFS queda en −25. */
export const DB_CTA_ENTRADA = -15;
/**
 * LOS FUNDIDOS (pedido del usuario en la V6, ya regla del canal: «el sonido cuando cambia a hablar Isabella debe hacer un fade-out / fade-in cuando retome para que no se escuche ahí mismo tan cortado»):
 *   · FADE-OUT de FADE_OUT f, de coseno: la curva ACABA `ANTES_DE_HABLAR` f antes de su primera palabra.
 *   · FADE-IN de FADE_IN f tras su última palabra.
 */
export const FADE_OUT = 10;
export const ANTES_DE_HABLAR = 4;
export const FADE_IN = 24;
/** Frames de la entrada de la canción en el f0 (coseno desde 0). */
export const FADE_ENTRADA = 8;
/** Frames que tarda la música en apagarse tras la última palabra del CTA: hasta 2 f antes del final de la pieza (la tarjeta va en silencio). */
const APAGADO_CTA_HASTA = FIN_MUSICA_047;

/** Un fundido con curva suave (coseno): de `de` a `a` en `n` frames desde `f0`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

const dB = (x: number): number => Math.pow(10, x / 20);

/** La envolvente: la entrada, el hook, la mitad (las dos tomas juntas) y el CTA con la caída, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c02-hook");
  const md04 = ventanaDe("c05-mitad-precio");
  const md05 = ventanaDe("c06-mitad-amenidades");

  const p: [number, number][] = [
    // ENTRADA: la canción arranca en el f0 y llega a su nivel en 8 f.
    ...fundido(0, FADE_ENTRADA, 0, ALTOS.apertura),
    // HOOK: baja con curva ANTES de que hable (la sala sigue a la vista: Isabella aparece con una disolvencia) y sube tras su última palabra a la del paseo.
    [hook.en - ANTES_DE_HABLAR - FADE_OUT, ALTOS.apertura],
    ...fundido(hook.en - ANTES_DE_HABLAR - FADE_OUT, FADE_OUT, ALTOS.apertura, BAJOS["c02-hook"]),
    [hook.fin, BAJOS["c02-hook"]],
    ...fundido(hook.fin, FADE_IN, BAJOS["c02-hook"], ALTOS.paseo),
    // MITAD: una sola ventana para MD04 y MD05 (entre sus frases quedan 15 f de pausa: no da para subir y bajar). Baja ANTES de la primera palabra de MD04 y sube tras la última de MD05, ya al nivel del apartamento.
    [md04.en - ANTES_DE_HABLAR - FADE_OUT, ALTOS.paseo],
    ...fundido(md04.en - ANTES_DE_HABLAR - FADE_OUT, FADE_OUT, ALTOS.paseo, BAJOS["c05-mitad-precio"]),
    [md05.fin, BAJOS["c05-mitad-precio"]],
    ...fundido(md05.fin, FADE_IN, BAJOS["c05-mitad-precio"], ALTOS.bloque5),
    // CTA: la meseta (−10 LUFS en la fuente) baja ANTES de la caída y de la primera palabra a −15 dB absolutos; desde ahí la ganancia SIGUE la caída de la canción (sube conforme la canción baja) y al acabar la voz se apaga.
  ];
  const cta = ventanaDe("c10-cta");
  const antes = cta.en - ANTES_DE_HABLAR - FADE_OUT;
  p.push([antes, ALTOS.bloque5], ...fundido(antes, FADE_OUT, ALTOS.bloque5, dB(DB_CTA_ENTRADA)));
  for (const [t, g] of CAIDA) p.push([Math.round(frameDeCancion(t)), dB(g)]);
  // La última palabra del CTA: se APAGA con curva de coseno hasta cero, 2 f antes del final de la pieza (la tarjeta va en silencio).
  p.push(...fundido(cta.fin, APAGADO_CTA_HASTA - cta.fin, dB(0), 0));
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

export const musica047: readonly TramoAudio[] = HAY_MUSICA
  ? [
      {
        id: "musica",
        src: "recorrido-047/musica-047.wav",
        en: 0,
        dur: FIN_MUSICA_047,
        desde: INICIO_MUSICA,
        ganancia: envolvente(),
        reason:
          "«Dreamlife» entra en el frame 0 sobre su lecho de cuerdas, baja antes de cada frase de Isabella, sube con la canción por los recorridos hasta su meseta (el apartamento y el balcón), cae en el f1166 donde entra la voz del CTA y se apaga bajo la tarjeta.",
      },
    ]
  : [];

/** Lo que monta `<PistaAudio>`. */
export const audio047: readonly TramoAudio[] = [...vocesTomas, ...musica047];
