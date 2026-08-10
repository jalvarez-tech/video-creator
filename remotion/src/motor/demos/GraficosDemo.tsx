import { AbsoluteFill } from "remotion";
import { graficosDemo } from "./graficos-demo";
import { PistaGraficos, Puntos, Resplandor, Vineta } from "../graficos";
import { MG } from "../motion";

/**
 * DEMO de la coreografía por datos: el plan `graficos-demo.ts` montado por el
 * intérprete, sin una sola línea de JSX por gráfico.
 *
 * En un proyecto real esta composición sería el `Avatar004.tsx`, con el mismo
 * z-order que el 003 y el avatar en su sitio:
 *
 *   <AbsoluteFill>
 *     <CamaraVirtual cues={camara004}><OffthreadVideo … /></CamaraVirtual>
 *     <PistaGraficos cues={graficos004} />   ← esta capa
 *     <Audio src={…} />
 *     <PistaSonido cues={cues004} duckDb={-5} />
 *   </AbsoluteFill>
 *
 * Aquí el avatar se sustituye por un fondo de sala (mismo recurso que Fondo003)
 * para poder revisar la coreografía sin depender de un clip concreto.
 */
export const GraficosDemo: React.FC = () => (
  <AbsoluteFill style={{ background: "#0B0F1A" }}>
    <Resplandor color={MG.teal} cx={50} cy={34} intensidad={0.3} pulso={0.04} />
    <Resplandor color={MG.amber} cx={28} cy={72} intensidad={0.16} />
    <Puntos opacidad={0.05} />
    <PistaGraficos cues={graficosDemo} />
    <Vineta intensidad={0.5} />
  </AbsoluteFill>
);
