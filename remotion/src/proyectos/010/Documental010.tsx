/**
 * PROYECTO 010 — «Gracias, Chocó».
 *
 * 1080×1920 · 30 fps · 2234 f (74,47 s) · estilo CINEMATOGRÁFICO · sin avatar.
 * Mini documental humanitario con la VOZ EN OFF como columna vertebral.
 * Artefactos: proyectos/010/artefactos/{01-plan,02-layout,03-timeline}.md
 *
 * EL Z-ORDER (director §3b), y en qué se diferencia del de una pieza con avatar:
 *
 *   1. <PistaMetraje>          los 30 planos, su punch-in, su grado y LOS VELOS
 *   2. <SelloCampana>          el watermark de la campaña — overlay FIJO
 *   3. <Rotulos>               gancho, nota de franja alta y cierre
 *   4. <SubtitulosBilingues>   español + inglés, anclados por abajo
 *   5. <Audio> voz             la columna vertebral, a volumen pleno
 *   6. <Audio> música          (pendiente de permiso — §musica)
 *
 * No hay <CamaraVirtual> porque no hay un sujeto al que seguir: en una pieza de
 * metraje el movimiento ES el montaje, y vive dentro de la capa 1.
 *
 * §marca — LA MARCA SE PASA, Y AQUÍ ADEMÁS SE AJUSTA. `CHOCO` es la campaña del
 * 008 y su `metraje` está calibrado para aquel registro editorial: satura al
 * 80 % y vira a ámbar. Esta pieza es 74 s de personas reales y el encargo pide
 * «piel realista» y «verdes profundos»; aplicarle aquel look convertiría a una
 * comunidad afrocolombiana en un sepia de archivo. Se deriva una marca con otro
 * `metraje` en vez de tocar `choco.ts`, que el 008 sigue usando tal cual.
 *
 * §musica — CAMA MUSICAL APORTADA POR EL CLIENTE (2026-09-07). No se generó con
 * ElevenLabs: esa clave sigue sin el permiso `music_generation`. El cliente
 * eligió un tramo de una pista instrumental suya y de ahí sale
 * `public/choco-010/010-musica.wav` (receta y procedencia en
 * `proyectos/010/musica/README.md`).
 *
 * EL ARCO YA NO LO PONE LA COMPOSICIÓN, LO PONE LA ENVOLVENTE. El encargo pedía
 * piano al principio, calidez en los niños y crescendo en el pueblo unido; un
 * tramo de 74 s recortado de una pista de una hora no hace eso solo. Lo hace
 * `volumenMusica`, que sube y baja sobre los MISMOS beats de la voz. Es menos
 * de lo que daría una composición a medida y conviene saberlo: la música
 * acompaña la emoción, no la conduce.
 */
import React from "react";
import { AbsoluteFill, Audio, interpolate, staticFile, useVideoConfig } from "remotion";
import { CHOCO } from "../../marcas/choco";
import type { Marca } from "../../motor/marca";
import { PistaMetraje, type Velos } from "../../motor/metraje";
import { SelloCampana } from "../../motor/SelloCampana";
import { SubtitulosBilingues, Rotulos } from "./Bilingue";
import { metraje010 } from "./metraje-010";
import { subtitulos010, rotulos010 } from "./subtitulos-010";

/** Ver §marca. Mismo canal, otro registro. */
const CHOCO_DOC: Marca = {
  ...CHOCO,
  metraje: { saturacion: 0.92, contraste: 1.05, calido: 0.03, grano: 0.05, vineta: 0.22 },
};

/**
 * LOS VELOS, y el de abajo es la diferencia con el 009 y no es cosmética.
 *
 * ABAJO, los dos pisos del subtítulo bilingüe: el bloque ocupa de y≈1330 a
 * y≈1620 sobre metraje sin control de exposición —un cielo del Pacífico
 * quemado, una camiseta blanca—, y sin velo el subtítulo inglés (el más
 * pequeño, el más fino) desaparece en los planos claros. El fallo no sale en el
 * frame que revisas: sale en el plano 19 de 30.
 *
 * ARRIBA, el sello (top 84) y los rótulos de franja alta, y MÁS FLOJO que el de
 * abajo (0,42 contra 0,72), no por simetría rota: arriba solo hay que sostener
 * una píldora con borde propio y un rótulo de 3 s; abajo hay dos pisos de texto
 * durante 65 s. A 0,55 —lo que había— el frame de apertura perdía el cielo del
 * Pacífico, que es medio plano.
 */
const VELOS_010: Velos = {
  arriba: { alto: 360, borde: 0.42, medio: 0.2, parada: 0.5 },
  abajo: { alto: 760, borde: 0.72, medio: 0.42, parada: 0.45 },
};

/** `false` deja la pieza a voz sola. Ver §musica. */
const HAY_MUSICA = true;

/**
 * La envolvente de la música, en SEGUNDOS y siguiendo los beats de la VOZ.
 *
 * LOS NÚMEROS SON GANANCIA LINEAL Y SIGNIFICAN ALGO MEDIBLE, porque el stem se
 * normalizó a −15,2 LUFS a propósito (musica/README.md). Contra una voz a
 * −14 LUFS:
 *
 *     0,13  = −17,7 dB  → música a ≈ −33 LUFS   19 LU bajo la voz  (apenas está)
 *     0,18  = −14,9 dB  → ≈ −30 LUFS            16 LU bajo la voz  (lo normal)
 *     0,26  = −11,7 dB  → ≈ −27 LUFS            13 LU bajo la voz  (el clímax)
 *
 * El techo de 0,26 no es timidez: la voz está grabada de campo, no en cabina, y
 * con una locución así la música empieza a tapar mucho antes de lo que uno
 * espera mirando el medidor.
 *
 * DÓNDE CAE CADA PUNTO, que es lo único que hace de esto una banda sonora y no
 * un volumen fijo:
 *   0 → 1,4 s   entra desde el silencio (el corte del stem no debe oírse)
 *   20 s        los NIÑOS: sube a 0,22, la única subida de la primera mitad
 *   47 s        «reconstruyendo sus hogares»: SUELO en 0,13. Es la frase que no
 *               debe sonar a película, y bajar es lo único honesto que puede
 *               hacer la música ahí
 *   62 s        «vamos a salir adelante»: 0,26, el crescendo, y termina antes
 *               de que empiece el rótulo de cierre
 *   68 → 74,45 LA COLA, y aquí los números dejan de significar «X LU bajo la
 *               voz»: son COMPENSACIÓN. La pista tiene un valle propio justo
 *               ahí (medido sobre el stem: −15,6 dB a los 60 s, **−24 dB entre
 *               los 70 y los 72**, recupera a −16 a los 73), y ese valle cae
 *               exactamente sobre los 2,4 s en que la voz ya ha terminado y el
 *               rótulo de cierre se mantiene solo. Con la envolvente plana el
 *               resultado medido era −43 dB: no se leía como final, se leía como
 *               que el vídeo se había roto.
 *
 *               Subir a 0,33-0,35 ahí no es subir la música: es mantenerla en el
 *               mismo sitio mientras la pista se hunde — la diferencia entre un
 *               fader plano y uno acompañado. A los 73,8 se vuelve a 0,26 porque
 *               la pista ya ha recuperado, y de ahí a cero.
 *
 *               La alternativa era mover la entrada a 21:09, donde la cola de la
 *               pista viene a −15,4 y no haría falta compensar nada. No se hizo:
 *               el cliente eligió el 20:30 y un valle se arregla con el fader,
 *               que es justo para lo que está.
 */
const volumenMusica = (t: number): number =>
  interpolate(
    t,
    [0, 1.4, 6, 20, 27.8, 43.2, 47, 53.5, 62, 68, 70.5, 72.8, 73.8, 74.45],
    [0, 0.14, 0.18, 0.22, 0.2, 0.17, 0.13, 0.18, 0.26, 0.24, 0.33, 0.35, 0.26, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

// `volume` como CALLBACK y no como número calculado en el cuerpo: es lo que
// pide `@remotion/volume-callback`, y no es estilo — Remotion necesita poder
// evaluar la envolvente fuera del frame actual para escribir la pista de audio
// de una vez en vez de frame a frame.
const Musica: React.FC<{ fps: number }> = ({ fps }) => (
  <Audio src={staticFile("choco-010/010-musica.wav")} volume={(f) => volumenMusica(f / fps)} />
);

export const Documental010: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
  <AbsoluteFill style={{ backgroundColor: CHOCO_DOC.color.negro }}>
    <PistaMetraje cortes={metraje010} marca={CHOCO_DOC} velos={VELOS_010} />
    <SelloCampana marca={CHOCO_DOC} />
    <Rotulos rotulos={rotulos010} marca={CHOCO_DOC} />
    <SubtitulosBilingues cues={subtitulos010} marca={CHOCO_DOC} />
    {/* La voz manda y va a 1: es lo único que no cede terreno en toda la pieza. */}
    <Audio src={staticFile("choco-010/010-vo.wav")} />
    {HAY_MUSICA ? <Musica fps={fps} /> : null}
  </AbsoluteFill>
  );
};
