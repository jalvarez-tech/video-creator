import { AbsoluteFill, useCurrentFrame } from "remotion";
import { alfa, osc, SIM, W } from "./mundo-003";

/**
 * FONDOS del proyecto 003 — degradados PLANOS.
 *
 * Nada de turbulencia, ruido, vetas ni grano: solo degradados limpios. La regla
 * de esta capa es que **no tiene textura** — si algo dibuja una forma reconocible
 * en el fondo, sobra.
 *
 * CONTINUIDAD entre tomas de gráfico. Lo que en otras piezas haría una textura
 * continua, aquí lo hace el reparto de luz: el degradado base es SIEMPRE el mismo
 * (es "la sala") y cada toma enciende su foco en una posición distinta (es "el
 * ángulo de cámara"). Los cortes se leen como cambios de plano en el mismo espacio.
 *
 * COLOR DEL FOCO = SIMBOLOGÍA. El foco no es un adorno: lleva el color de lo que
 * se está contando en esa toma (mundo-003 · `SIM` y `TOMAS_GRAFICAS.color`), así
 * que el fondo confirma en grande lo que la tipografía dice en pequeño. En la
 * toma del dato el color CAMBIA a mitad (ámbar → rojo) porque el asunto cambia de
 * signo: de lo que pagas a lo que pierdes.
 *
 * El fondo solo existe en las tomas de gráfico. En las tomas de avatar no hay
 * NADA encima del vídeo: el avatar va a color y con su exposición original.
 */

/** Degradado base: rampa de carbón fría, sin textura. Es "la sala". */
const BASE = `linear-gradient(168deg,
  #212734 0%,
  #181C25 32%,
  #12151B 64%,
  ${W.bg} 100%)`;

/**
 * `cx`/`cy` en % del frame: cada toma enciende su foco en un sitio distinto.
 * Deriva muy lenta para que el plano respire sin dejar de ser plano (no hay forma
 * que seguir, solo luz que se mueve).
 */
export const Fondo: React.FC<{ cx?: number; cy?: number; color?: string; fuerza?: number }> = ({
  cx = 50,
  cy = 40,
  color = SIM.dato,
  fuerza = 0.17,
}) => {
  const frame = useCurrentFrame();
  const dx = cx + 2.6 * osc(frame, 900);
  const dy = cy + 2.0 * osc(frame, 1180, 0.33);
  return (
    <AbsoluteFill style={{ background: BASE }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(72% 48% at ${dx}% ${dy}%, ${alfa(color, fuerza)}, ${alfa(color, 0)} 70%)`,
        }}
      />
      {/* contraluz frío en la esquina opuesta: da profundidad sin ensuciar */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(60% 40% at ${100 - dx}% ${100 - dy}%, ${alfa(SIM.neutro, 0.07)}, ${alfa(SIM.neutro, 0)} 72%)`,
        }}
      />
      <Vineta />
    </AbsoluteFill>
  );
};

/** Viñeta suave: cierra el encuadre. También es un degradado plano. */
export const Vineta: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(118% 74% at 50% 44%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.26) 76%, rgba(0,0,0,0.58) 100%)",
    }}
  />
);
