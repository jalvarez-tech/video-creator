import { AbsoluteFill } from "remotion";
import { planDemo } from "./plan-demo";
import { Puntos, Resplandor, Vineta } from "../graficos";
import { MONTADORES_BASE, PistaGraficos } from "../graficos/PistaGraficos";
import { MG } from "../motion";

/**
 * DEMO del intérprete NUEVO: el plan `plan-demo.ts` (`Plan` del núcleo) montado
 * por <PistaGraficos>, sin una sola línea de JSX por gráfico.
 *
 * Es el sustituto de `GraficosDemo`, que sigue montando la capa V1 hasta el
 * PASO 11. Mientras los dos convivan, esta composición es la única prueba
 * RENDERIZADA de que el camino nuevo dibuja algo: un intérprete sin consumidor
 * compila perfectamente y sale en negro.
 *
 * En un proyecto real esta composición sería el `Avatar004.tsx`, con el avatar
 * en su sitio y el mismo z-order:
 *
 *   <AbsoluteFill>
 *     <CamaraVirtual cues={camara004}><OffthreadVideo … /></CamaraVirtual>
 *     <PistaGraficos plan={graficos004} montadores={MONTADORES_004} />
 *     <Audio src={…} />
 *     <PistaSonido cues={cues004} duckDb={-5} />
 *   </AbsoluteFill>
 *
 * Aquí el avatar se sustituye por un fondo de sala (el mismo recurso que
 * Fondo003) para revisar la coreografía sin depender de un clip concreto.
 */
export const PlanDemo: React.FC = () => (
  <AbsoluteFill style={{ background: "#0B0F1A" }}>
    <Resplandor color={MG.teal} cx={50} cy={34} intensidad={0.3} pulso={0.04} />
    <Resplandor color={MG.amber} cx={28} cy={72} intensidad={0.16} />
    <Puntos opacidad={0.05} />
    <PistaGraficos plan={planDemo} montadores={MONTADORES_BASE} />
    <Vineta intensidad={0.5} />
  </AbsoluteFill>
);
