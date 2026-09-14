/**
 * EL INTÉRPRETE DEL MONTAJE — `Corte[]` → JSX. Hermano de `<CamaraVirtual>`,
 * pero para piezas SIN avatar: donde aquella reencuadra un clip único, esta
 * decide qué clip se ve y cómo se mueve dentro de su propio encuadre.
 *
 * Vive en `proyectos/009/` y no en `motor/` a propósito. La regla de la casa es
 * que a la biblioteca sube lo que ya ha servido para más de una pieza; esto ha
 * servido para una. Cuando haya un segundo reel de b-roll, sube — y entonces se
 * sabrá qué partes eran del formato y cuáles de este vídeo.
 *
 * LAS CUATRO CAPAS DE CADA CORTE, en orden de pintado:
 *   1. el vídeo, con su punch-in y su corrección de clip (`grado`)
 *   2. el LOOK de marca (velo cálido + grano + viñeta) — igual para los cinco
 *   3. el VELO SUPERIOR, que es lo que hace legible el texto de la franja
 *   4. la entrada (whip / flash), que solo existe en los primeros frames
 *
 * El velo (3) es la pieza que el z-order del director nombra y que casi siempre
 * se olvida: sin él, un titular blanco sobre el humo blanco de las alitas no se
 * lee, y el fallo no aparece hasta que se renderiza ese plano concreto.
 */
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { Marca } from "../../motor/marca";
import type { Corte } from "./metraje-009";

/** `#RRGGBB` + alfa → `rgba(...)`. El mismo truco que `alfaN` del editorial. */
const alfa = (hex: string, a: number): string => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

const Plano: React.FC<{ corte: Corte; marca: Marca; veloAlto: number }> = ({ corte, marca, veloAlto }) => {
  const f = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const M = marca.metraje;
  const g = corte.grado;

  // Punch-in. `extrapolate: clamp` a los dos lados: un corte que por redondeo
  // pinte un frame de más no debe seguir escalando fuera de su ventana.
  const escala = interpolate(f, [0, corte.dur], [corte.zoom[0], corte.zoom[1]], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // La ENTRADA solo vive en los primeros frames y después no cuesta nada.
  const esWhip = corte.entra === "whip";
  const DUR_WHIP = 7;
  const desplWhip = esWhip
    ? interpolate(f, [0, DUR_WHIP], [90, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;
  const borronWhip = esWhip
    ? interpolate(f, [0, DUR_WHIP], [14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  // El flash tiene que leerse como un GOLPE, no como un frame quemado. Medido
  // en el render: a 0,5 de alfa sobre ámbar el fotograma entero se va a amarillo
  // y parece un fallo de codificación, no una transición. 0,38 en 4 f (0,13 s)
  // pega igual y no borra la imagen de debajo.
  const esFlash = corte.entra === "flash";
  const alfaFlash = esFlash
    ? interpolate(f, [0, 1, 4], [0.38, 0.2, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  // El ORDEN es el del oficio: primero se corrige el CLIP (`grado`, medido con
  // signalstats), y solo después se aplica el LOOK de la marca, igual para los
  // cinco. Al revés, el look uniforme amplifica las diferencias en vez de
  // taparlas (motor/noticias/montadores.tsx dice esto mismo y por lo mismo).
  const filtro = [
    `brightness(${((g?.exposicion ?? 1) * 100).toFixed(1)}%)`,
    `contrast(${((g?.contraste ?? 1) * M.contraste * 100).toFixed(1)}%)`,
    `saturate(${((g?.saturacion ?? 1) * M.saturacion * 100).toFixed(1)}%)`,
    borronWhip > 0.05 ? `blur(${borronWhip.toFixed(2)}px)` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: marca.color.negro }}>
      <AbsoluteFill
        style={{
          transform: `translateX(${desplWhip.toFixed(2)}px) translateY(${-(corte.pan ?? 0)}%) scale(${escala.toFixed(4)})`,
        }}
      >
        <OffthreadVideo
          src={staticFile(corte.src)}
          // `desde` está en SEGUNDOS del clip fuente porque los cinco vienen a
          // tres fps distintos; `trimBefore` se cuenta en frames de la COMP.
          trimBefore={Math.round(corte.desde * fps)}
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: filtro }}
        />
      </AbsoluteFill>

      {/* Velo cálido del canal: el igualado más barato que existe. */}
      <AbsoluteFill
        style={{
          background: alfa(marca.color.acento, Math.min(0.5, M.calido + (g?.calido ?? 0))),
          mixBlendMode: "soft-light",
          pointerEvents: "none",
        }}
      />
      {/* Grano compartido: es lo que hace que cinco clips de cuatro cámaras se
       *  lean como una sola pieza. */}
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
      {/* EL VELO DEL TEXTO. Alto en px reales y no en %, porque lo que tiene que
       *  cubrir es la caja del molde `franja` (y ∈ 117-457), que está en px. */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${alfa(marca.color.negro, 0.82)} 0%, ${alfa(
            marca.color.negro,
            0.55
          )} ${((veloAlto * 0.55) / height) * 100}%, transparent ${((veloAlto / height) * 100).toFixed(1)}%)`,
          pointerEvents: "none",
        }}
      />
      {esFlash ? (
        <AbsoluteFill style={{ backgroundColor: marca.color.acento, opacity: alfaFlash, pointerEvents: "none" }} />
      ) : null}
    </AbsoluteFill>
  );
};

export const PistaMetraje: React.FC<{
  cortes: readonly Corte[];
  marca: Marca;
  /** Alto del degradado que protege al texto de la franja alta. */
  veloAlto?: number;
}> = ({ cortes, marca, veloAlto = 620 }) => (
  <>
    {cortes.map((c) => (
      <Sequence key={c.id} from={c.en} durationInFrames={c.dur} name={c.id}>
        <Plano corte={c} marca={marca} veloAlto={veloAlto} />
      </Sequence>
    ))}
  </>
);
