/**
 * EL INTÉRPRETE DEL MONTAJE — `Corte[]` → JSX. Proyecto 011.
 *
 * Copia adaptada del `PistaMetraje` del 010 (el linter no deja importarlo de
 * otro proyecto, y con razón). Es la TERCERA pieza de montaje que lo necesita:
 * la promoción a `motor/` que el 010 dejó anotada en su `aprendizajes.md` ya no
 * es opcional, y el 011 añade lo que el formato también tenía que saber hacer
 * (ver `proyectos/011/aprendizajes.md`).
 *
 * LO QUE CAMBIA RESPECTO AL 010:
 *   · SIN VELOS. Allí protegían el sello y los subtítulos bilingües; aquí no hay
 *     una sola letra en pantalla, y un degradado negro arriba y abajo solo
 *     apagaría el cielo y el vestido.
 *   · SIN MARCA. El look llega como `look` (lo define la composición), no de
 *     `src/marcas/`: una boda no es un canal.
 *   · NEGRO. `entra: "negro"` hace nacer el plano de negro y `salidaNegro` lo
 *     apaga al final — el cierre de cada minuto.
 *
 * LAS CAPAS DE CADA CORTE, en orden de pintado:
 *   1. el medio (vídeo mudo o foto), con su punch-in y su corrección de tramo
 *   2. el LOOK de la pieza (velo cálido + grano + viñeta) — igual para los 33
 *   3. el negro de entrada o de salida, si lo hay
 *   4. la opacidad de entrada, si el corte disuelve
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
import type { Corte } from "./metraje-011";

/** El look de la pieza. Todo son factores sobre el clip ya corregido. */
export interface Look {
  saturacion: number;
  contraste: number;
  /** Alfa del velo cálido (soft-light). */
  calido: number;
  colorCalido: string;
  grano: number;
  vineta: number;
}

/** `#RRGGBB` + alfa → `rgba(...)`. */
const alfa = (hex: string, a: number): string => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${Math.max(0, Math.min(1, a))})`;
};

/** Frames de una disolvencia: 12 f = 0,4 s, el valor que el 010 validó. */
export const DISOLVER = 12;
/** Frames en que el primer plano nace de negro: 0,6 s, una nota y media de piano. */
export const DESDE_NEGRO = 18;

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Plano: React.FC<{ corte: Corte; look: Look; solape: number }> = ({ corte, look, solape }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const total = corte.dur + solape;

  // Punch-in sobre la ventana COMPLETA (solape incluido): si empezara al acabar
  // la disolvencia, el plano daría un tirón justo al hacerse opaco.
  const escala = interpolate(f, [0, total], [corte.zoom[0], corte.zoom[1]], CLAMP);
  const opacidad = solape > 0 ? interpolate(f, [0, solape], [0, 1], CLAMP) : 1;

  // Negro de entrada (el primer plano) y de salida (el final de cada minuto).
  // Se mide desde `solape`, que es donde empieza el plano de verdad.
  const negroEntra = corte.entra === "negro" ? interpolate(f, [0, DESDE_NEGRO], [1, 0], CLAMP) : 0;
  const negroSale = corte.salidaNegro
    ? interpolate(f, [solape + corte.dur - corte.salidaNegro, solape + corte.dur], [0, 1], CLAMP)
    : 0;
  const negro = Math.max(negroEntra, negroSale);

  // Primero se corrige el TRAMO y después se aplica el LOOK, igual para todos.
  const filtro = [
    `brightness(${((corte.grado?.exposicion ?? 1) * 100).toFixed(1)}%)`,
    `contrast(${(look.contraste * 100).toFixed(1)}%)`,
    `saturate(${(look.saturacion * 100).toFixed(1)}%)`,
  ].join(" ");

  const medio: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: filtro,
  };

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#000", opacity: opacidad }}>
      <AbsoluteFill style={{ transform: `translateY(${-(corte.pan ?? 0)}%) scale(${escala.toFixed(4)})` }}>
        {corte.tipo === "foto" ? (
          <Img src={staticFile(corte.src)} style={medio} />
        ) : (
          <OffthreadVideo
            src={staticFile(corte.src)}
            // `desde` en SEGUNDOS de la fuente; `trimBefore` en frames. Si el
            // corte disuelve, el plano arranca `solape` frames antes, y la
            // fuente tiene que retroceder lo mismo o el contenido saltaría al
            // hacerse opaco.
            trimBefore={Math.max(0, Math.round((corte.desde ?? 0) * fps) - solape)}
            muted
            style={medio}
          />
        )}
      </AbsoluteFill>

      {/* Velo cálido: el igualado más barato que existe para 28 clips de dos cámaras. */}
      <AbsoluteFill
        style={{ background: alfa(look.colorCalido, look.calido), mixBlendMode: "soft-light", pointerEvents: "none" }}
      />
      {/* Grano muy bajo: es lo que casa el único clip de mensajería (720p) con los del iPhone. */}
      <AbsoluteFill
        style={{
          backgroundImage: `repeating-conic-gradient(${alfa("#8A8172", look.grano)} 0% 25%, transparent 0% 50%)`,
          backgroundSize: "6px 6px",
          pointerEvents: "none",
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, transparent 58%, ${alfa("#000000", look.vineta)} 100%)`,
          pointerEvents: "none",
        }}
      />
      {negro > 0 ? <AbsoluteFill style={{ backgroundColor: "#000", opacity: negro }} /> : null}
    </AbsoluteFill>
  );
};

export const PistaMetraje: React.FC<{ cortes: readonly Corte[]; look: Look }> = ({ cortes, look }) => (
  <>
    {cortes.map((c, i) => {
      const solape = c.entra === "disolver" ? DISOLVER : 0;
      // La COLA que este plano necesita para que el SIGUIENTE disuelva encima.
      // Sin ella la disolvencia caería sobre negro.
      const cola = cortes[i + 1]?.entra === "disolver" ? DISOLVER : 0;
      return (
        <Sequence key={c.id} from={c.en - solape} durationInFrames={c.dur + solape + cola} name={c.id}>
          <Plano corte={c} look={look} solape={solape} />
        </Sequence>
      );
    })}
  </>
);
