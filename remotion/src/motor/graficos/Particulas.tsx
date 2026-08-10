import { useMemo } from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";
import { alfa, G } from "./estilos";

/**
 * PARTÍCULAS DETERMINISTAS — confeti, chispas, polvo, lluvia.
 * Guía: manuales/motion-graphics/SKILL.md (§jerarquía: ambient) ·
 * sonido: `sparkle` (chispas) · `pop`+`sparkle` (confeti) · `ambient-wind` (polvo).
 *
 * LA REGLA QUE HACE QUE ESTO FUNCIONE EN VÍDEO:
 * cero estado, cero `Math.random()`, cero `Date.now()`. La posición de cada
 * partícula es una FUNCIÓN PURA del frame: pos = f(frame, partícula). Por qué
 * importa aquí más que en cualquier otro gráfico:
 *   · Remotion renderiza los frames EN PARALELO y fuera de orden. Un sistema de
 *     partículas con estado acumulado (p += v cada tick) daría un resultado
 *     distinto en cada worker → parpadeo.
 *   · `Math.random()` cambia entre el preview y el render, y entre dos renders
 *     del mismo archivo: verías una animación distinta a la que aprobaste.
 * `random(semilla)` de Remotion resuelve las dos cosas: misma semilla → mismo
 * número, siempre. Cambiar la semilla es "tirar otra vez los dados".
 *
 * COSTE: cada partícula es un <div>. 40-80 van sobradas para vender el efecto;
 * 500 tumban el render y no se ven mejor. Si necesitas cientos, es que el efecto
 * debería ser una textura, no partículas.
 */

export type ModoParticulas = "estallido" | "ambiente" | "lluvia";

type Particula = {
  i: number;
  /** posición inicial en fracción del lienzo (0-1) */
  ox: number;
  oy: number;
  ang: number;
  vel: number;
  tam: number;
  giro: number;
  vida: number;
  color: string;
  retardo: number;
};

/**
 * Reparte partículas con una semilla. Cada atributo tiene su propia clave
 * (`${semilla}-${i}-vel`): usar la misma clave para dos atributos los
 * correlaciona y el resultado se ve "en cuadrícula", no aleatorio.
 */
const sembrar = (n: number, semilla: string, colores: string[], modo: ModoParticulas): Particula[] =>
  Array.from({ length: n }, (_, i) => {
    const r = (k: string) => random(`${semilla}-${i}-${k}`);
    return {
      i,
      ox: modo === "estallido" ? 0.5 : r("ox"),
      oy: modo === "estallido" ? 0.5 : modo === "lluvia" ? -0.1 - r("oy") * 0.9 : r("oy"),
      // estallido: 360° completos · lluvia/ambiente: deriva casi vertical
      ang: modo === "estallido" ? r("ang") * Math.PI * 2 : Math.PI / 2 + (r("ang") - 0.5) * 0.6,
      vel: 0.4 + r("vel") * 1.6,
      tam: 6 + r("tam") * 12,
      giro: (r("giro") - 0.5) * 720,
      vida: 0.55 + r("vida") * 0.45,
      color: colores[Math.floor(r("col") * colores.length) % colores.length],
      retardo: modo === "estallido" ? Math.floor(r("ret") * 6) : Math.floor(r("ret") * 60),
    };
  });

/**
 * Sistema de partículas en una capa a pantalla completa.
 *
 *   estallido → celebración/impacto: salen del centro (`origen`), con gravedad
 *               y vida limitada. El gesto del CTA o del dato que "explota".
 *   ambiente  → polvo/motas que flotan en bucle. Capa de atmósfera: se pone y
 *               se olvida (opacidad baja, tamaño pequeño).
 *   lluvia    → caída continua desde arriba. Datos, dinero, nieve, "se cae".
 *
 * `at` es el frame local de arranque; en modo estallido `dur` es la vida útil
 * del estallido (todas las partículas han desaparecido en at+dur).
 */
export const Particulas: React.FC<{
  n?: number;
  modo?: ModoParticulas;
  at?: number;
  dur?: number;
  colores?: string[];
  semilla?: string;
  origen?: [number, number];
  gravedad?: number;
  fuerza?: number;
  opacidad?: number;
  forma?: "circulo" | "cinta";
}> = ({
  n = 48,
  modo = "estallido",
  at = 0,
  dur = 60,
  colores,
  semilla = "particulas",
  origen,
  gravedad = 1.1,
  fuerza = 1,
  opacidad = 1,
  forma = "circulo",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const paleta = useMemo(() => colores ?? [G.teal, G.cyan, G.amber, G.white], [colores]);
  const ps = useMemo(() => sembrar(n, semilla, paleta, modo), [n, semilla, paleta, modo]);

  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity: opacidad }}>
      {ps.map((p) => {
        const t = frame - at - p.retardo;
        if (t < 0) return null;

        let x: number;
        let y: number;
        let op: number;

        if (modo === "estallido") {
          const vidaF = dur * p.vida;
          if (t > vidaF) return null;
          const d = t * p.vel * 9 * fuerza; // px recorridos en la dirección del ángulo
          const ox = (origen ? origen[0] : p.ox) * width;
          const oy = (origen ? origen[1] : p.oy) * height;
          x = ox + Math.cos(p.ang) * d;
          y = oy + Math.sin(p.ang) * d + gravedad * 0.5 * t * t * 0.14; // caída cuadrática
          op = interpolate(t, [0, 4, vidaF * 0.7, vidaF], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
        } else if (modo === "lluvia") {
          const recorrido = height * 1.25;
          const avance = (p.oy * height + t * p.vel * 6 * fuerza) % recorrido;
          x = p.ox * width + Math.sin((t + p.i * 12) / 40) * 18;
          y = avance;
          op = interpolate(t, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        } else {
          // ambiente: deriva lenta en bucle, sin principio ni final visibles
          x = p.ox * width + Math.sin((t + p.i * 30) / 70) * 40;
          y = ((p.oy * height - t * p.vel * 0.7) % height + height) % height;
          op = interpolate(t, [0, 20], [0, 0.75], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        }

        const esCinta = forma === "cinta";
        return (
          <div
            key={p.i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: esCinta ? p.tam * 0.55 : p.tam,
              height: esCinta ? p.tam * 1.6 : p.tam,
              borderRadius: esCinta ? 2 : "50%",
              background: p.color,
              opacity: op,
              transform: `rotate(${(p.giro * t) / 60}deg)`,
              boxShadow: `0 0 ${p.tam}px ${alfa(p.color.startsWith("#") ? p.color : "#FFFFFF", 0.5)}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
