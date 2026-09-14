import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { CamaraVirtual } from "../../motor/CamaraVirtual";
import { MONTADORES_BASE, PistaGraficos } from "../../motor/graficos/PistaGraficos";
import { PistaSonido } from "../../motor/sound/PistaSonido";
import { CHOCO } from "../../marcas/choco";
import { SelloCampana as SelloDeCampana } from "../../motor/SelloCampana";
import { camara008a } from "./camara-008-avatar";
import { graficos008a } from "./graficos-008-avatar";
import { cues008a } from "./cues-008-avatar";

/**
 * Proyecto 008 · pieza AVATAR — «ya hay 3 puntos» (campaña Ayudemos a Chocó).
 * Clip REAL del cliente (iPhone, rotación horneada): 1080×1920 · 30 fps · 1314 f.
 * Ensamblado por director-video; artefactos en proyectos/008/artefactos/*-avatar.md.
 *
 * Z-ORDER (director §3b): avatar en <CamaraVirtual> (solo él se reencuadra) →
 * tarjetas de PistaGraficos (overlay fijo, banda inferior) → watermark de la
 * campaña (overlay fijo, franja alta) → SFX con ducking. Sin subtítulos (01-plan).
 *
 * El vídeo lleva SU voz y nunca se desmonta (no hay tomas `pantalla`), así que
 * no aplica el patrón R10 de separar el audio: una sola fuente.
 */
export const Avatar008: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "black" }}>
    <CamaraVirtual cues={camara008a}>
      <OffthreadVideo
        src={staticFile("avatar-008.mp4")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </CamaraVirtual>
    {/* Scrim carbón cálido de la marca, no negro neutro: es la misma tinta del
        papel de la campaña y evita el gris azulado sobre su piel. */}
    <PistaGraficos plan={graficos008a} montadores={MONTADORES_BASE} scrimColor={CHOCO.color.tinta} />
    <SelloCampana />
    <PistaSonido cues={cues008a} duckDb={-4.5} />
  </AbsoluteFill>
);

/**
 * Watermark de la campaña (§5b director: sin él, el render sale sin marca).
 *
 * El componente SUBIÓ a `motor/SelloCampana.tsx` cuando lo pidió el 010: el
 * linter prohíbe que un proyecto importe de otro, y lo que comparten dos vídeos
 * pertenece al motor. Aquí queda el envoltorio que le ata la marca de ESTA
 * campaña, para que `Gracias008` siga importando `SelloCampana` de aquí y no
 * haya que tocar la otra pieza. El JSX es idéntico —se comprobó comparando el
 * sha256 de un still de `Gracias008` antes y después.
 */
export const SelloCampana: React.FC = () => <SelloDeCampana marca={CHOCO} />;
