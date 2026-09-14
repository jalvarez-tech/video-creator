/**
 * EL INTÉRPRETE DEL MONTAJE — `Corte[]` → JSX. Proyecto 010.
 *
 * Nace del `PistaMetraje` del 009 y le añade lo que este material obliga:
 * FOTOS, VELOCIDAD y DISOLVENCIA (ver cabecera de `metraje-010.ts`). Sigue
 * viviendo en `proyectos/` y no en `motor/` — pero ya por poco: con dos piezas
 * de montaje hechas, lo que es del formato y lo que era del 009 ya se distingue,
 * y la promoción está anotada en `aprendizajes.md`.
 *
 * LAS CINCO CAPAS DE CADA CORTE, en orden de pintado:
 *   1. el medio (vídeo o foto), con su punch-in y su corrección de clip
 *   2. el LOOK de la pieza (velo cálido + grano + viñeta) — igual para los 30
 *   3. el VELO SUPERIOR — protege el sello y los rótulos de franja alta
 *   4. el VELO INFERIOR — protege los subtítulos bilingües, que son DOS pisos
 *   5. la opacidad de entrada, si el corte disuelve
 *
 * EL VELO INFERIOR ES LA DIFERENCIA CON EL 009 Y NO ES COSMÉTICA. Allí el texto
 * vivía arriba y bastaba un degradado superior. Aquí el bloque bilingüe ocupa de
 * y≈1330 a y≈1620 sobre metraje sin control de exposición —un cielo del Pacífico
 * quemado, una camiseta blanca—, y sin velo el subtítulo inglés (el más pequeño,
 * el más fino) desaparece en los planos claros. El fallo no sale en el frame que
 * revisas: sale en el plano 19 de 30.
 */
import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { Marca } from "../../motor/marca";
import type { Corte } from "./metraje-010";

/** `#RRGGBB` + alfa → `rgba(...)`. */
const alfa = (hex: string, a: number): string => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${Math.max(0, Math.min(1, a))})`;
};

/**
 * Frames que dura una disolvencia. 12 f = 0,4 s.
 *
 * Se probaron 20 (0,67 s) y era demasiado: en `c20` —el giro de tono— la casa
 * tardaba tanto en aparecer que el corte dejaba de leerse como una decisión y
 * empezaba a leerse como un fundido de plantilla. A 12 f el cambio se nota y
 * no se comenta a sí mismo.
 */
export const DISOLVER = 12;

const Plano: React.FC<{
  corte: Corte;
  marca: Marca;
  /** Frames de transparencia al entrar (0 = corte seco). */
  solape: number;
  veloArriba: number;
  veloAbajo: number;
}> = ({ corte, marca, solape, veloArriba, veloAbajo }) => {
  const f = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const M = marca.metraje;
  const g = corte.grado;
  const total = corte.dur + solape;

  // Punch-in sobre la ventana COMPLETA (solape incluido): si el zoom empezara
  // al acabar la disolvencia, el plano daría un tirón justo al hacerse opaco.
  const escala = interpolate(f, [0, total], [corte.zoom[0], corte.zoom[1]], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacidad =
    solape > 0
      ? interpolate(f, [0, solape], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
      : 1;

  // El ORDEN es el del oficio: primero se corrige el CLIP (`grado`, medido con
  // signalstats) y solo después el LOOK de la pieza, igual para los treinta. Al
  // revés, un look uniforme amplifica las diferencias en vez de taparlas.
  const filtro = [
    `brightness(${((g?.exposicion ?? 1) * 100).toFixed(1)}%)`,
    `contrast(${((g?.contraste ?? 1) * M.contraste * 100).toFixed(1)}%)`,
    `saturate(${((g?.saturacion ?? 1) * M.saturacion * 100).toFixed(1)}%)`,
  ].join(" ");

  const medio: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: filtro,
  };

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: marca.color.negro, opacity: opacidad }}>
      <AbsoluteFill
        style={{
          transform: `translateY(${-(corte.pan ?? 0)}%) scale(${escala.toFixed(4)})`,
        }}
      >
        {corte.tipo === "foto" ? (
          <Img src={staticFile(corte.src)} style={medio} />
        ) : (
          <OffthreadVideo
            src={staticFile(corte.src)}
            // `desde` va en SEGUNDOS del clip fuente; `trimBefore` en frames de
            // la comp. Cuando el corte disuelve, el plano empieza `solape`
            // frames ANTES, así que hay que retroceder también en la fuente —y
            // a la velocidad de este corte, no a 1— o el contenido daría un
            // salto en el instante en que se vuelve opaco.
            trimBefore={Math.max(
              0,
              Math.round((corte.desde ?? 0) * fps) - Math.round(solape * (corte.velocidad ?? 1))
            )}
            playbackRate={corte.velocidad ?? 1}
            style={medio}
          />
        )}
      </AbsoluteFill>

      {/* Velo cálido de la pieza: el igualado más barato que existe. */}
      <AbsoluteFill
        style={{
          background: alfa(marca.color.acento, Math.max(0, Math.min(0.5, M.calido + (g?.calido ?? 0)))),
          mixBlendMode: "soft-light",
          pointerEvents: "none",
        }}
      />
      {/* Grano compartido: es lo que hace que cinco cámaras distintas y ocho
       *  fotos se lean como una sola pieza. */}
      <AbsoluteFill
        style={{
          backgroundImage: `repeating-conic-gradient(${alfa("#8A8172", M.grano)} 0% 25%, transparent 0% 50%)`,
          backgroundSize: "6px 6px",
          pointerEvents: "none",
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, transparent 55%, ${alfa("#000000", M.vineta)} 100%)`,
          pointerEvents: "none",
        }}
      />
      {/* VELO SUPERIOR — sello (top 84) y rótulos de franja alta.
       *  MÁS FLOJO QUE EL DE ABAJO (0,42 contra 0,72), y no por simetría rota:
       *  arriba solo hay que sostener una píldora con borde propio y un rótulo
       *  de 3 s; abajo hay dos pisos de texto durante 65 s. A 0,55 —lo que había—
       *  el frame de apertura perdía el cielo del Pacífico, que es medio plano. */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${alfa(marca.color.negro, 0.42)} 0%, ${alfa(
            marca.color.negro,
            0.2
          )} ${((veloArriba * 0.5) / height) * 100}%, transparent ${((veloArriba / height) * 100).toFixed(1)}%)`,
          pointerEvents: "none",
        }}
      />
      {/* VELO INFERIOR — los dos pisos del subtítulo bilingüe. */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(0deg, ${alfa(marca.color.negro, 0.72)} 0%, ${alfa(
            marca.color.negro,
            0.42
          )} ${((veloAbajo * 0.45) / height) * 100}%, transparent ${((veloAbajo / height) * 100).toFixed(1)}%)`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

export const PistaMetraje: React.FC<{
  cortes: readonly Corte[];
  marca: Marca;
  veloArriba?: number;
  veloAbajo?: number;
}> = ({ cortes, marca, veloArriba = 360, veloAbajo = 760 }) => (
  <>
    {cortes.map((c, i) => {
      const solape = c.entra === "disolver" ? DISOLVER : 0;
      // La COLA que este plano necesita para que el SIGUIENTE pueda disolver
      // encima. Sin ella la disolvencia caería sobre negro, que es un fundido
      // a negro con otro nombre y no lo que se pidió.
      const cola = cortes[i + 1]?.entra === "disolver" ? DISOLVER : 0;
      return (
        <Sequence
          key={c.id}
          from={c.en - solape}
          durationInFrames={c.dur + solape + cola}
          name={c.id}
        >
          <Plano corte={c} marca={marca} solape={solape} veloArriba={veloArriba} veloAbajo={veloAbajo} />
        </Sequence>
      );
    })}
  </>
);
