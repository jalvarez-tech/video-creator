import { AbsoluteFill } from "remotion";
import { MONTADORES_BASE, PistaGraficos } from "../../motor/graficos/PistaGraficos";
import { PistaMetraje } from "../../motor/metraje";
import { SelloCampana } from "../../motor/SelloCampana";
import { PistaSonido } from "../../motor/sound/PistaSonido";
import { cues015 } from "./cues-015";
import { graficos015 } from "./graficos-015";
import { LOOK_015, LOOK_METRAJE_015 } from "./look-015";
import { metraje015 } from "./metraje-015";
import { Voz015 } from "./Voz015";

/**
 * Proyecto 015 — «Lo que aprendí en APEX».
 *
 * Isabella Cadavid (la presentadora del 013) cuenta lo que se lleva del primer
 * día de APEX · El Wall Street Inmobiliario, en nueve tomas de iPhone —una
 * frase por toma, cada una en un sitio del hotel— montadas en 52,1 s con los
 * silencios recortados y un fundido de opacidad entre toma y toma, textos con
 * un efecto de sonido por entrada y la cuenta @propiedadesluxur al final.
 * Encargo y decisiones: proyectos/015/artefactos/01-plan.md.
 *
 * ES UN MONTAJE, AUNQUE HABLE UNA PERSONA A CÁMARA. No hay un clip que fije la
 * duración, sino nueve que se recortan y se funden: la capa del vídeo es
 * `<PistaMetraje>` (director §3i), y como ese intérprete monta el vídeo SIEMPRE
 * mudo, la voz va aparte en `<Voz015>`, cortada con los mismos números.
 *
 * CON MARCA (director §5b): es contenido de Propiedades Luxur —su sello en todos
 * los frames y su cuenta en el cierre—, con el acento VERDE de las piezas de
 * APEX (`LOOK_015`, el mismo que el 013). El metraje, en cambio, va con un look
 * NEUTRO (`LOOK_METRAJE_015`) y no con el de la marca: ver `look-015.ts`.
 *
 * SIN SUBTÍTULOS (preferencia del cliente en sus piezas de gente a cámara), así
 * que todo el texto vive en la banda inferior (R14).
 *
 * Z-ORDER (director §3b), de atrás a delante:
 *   1. PistaMetraje  — los nueve planos mudos, su empuje y sus disolvencias
 *   2. PistaGraficos — overlay FIJO en la banda inferior, velo acoplado (R14)
 *   3. SelloCampana  — el watermark del canal, en la franja alta
 *   4. Voz015        — la voz de cada toma, con su ganancia y su cruce
 *   5. PistaSonido   — un SFX por texto que entra, bajo la voz, SIN ducking
 */
export const Apex015: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: LOOK_METRAJE_015.negro }}>
    <PistaMetraje cortes={metraje015} look={LOOK_METRAJE_015} />
    {/*
      `scrimColor` explícito: el contraste de la banda se mide componiendo el
      vídeo contra ESTE color (el `fondoOscuro` del canal, el del 013). Dejarlo
      al defecto de la capa sería medir una cosa y renderizar otra.
    */}
    <PistaGraficos plan={graficos015} montadores={MONTADORES_BASE} scrimColor={LOOK_015.color.fondoOscuro} />
    <SelloCampana marca={LOOK_015} />
    <Voz015 cortes={metraje015} />
    {/*
      `duckDb={0}`, como en el 014: los SFX caen A PROPÓSITO sobre palabras (es
      el encargo: que se oigan cuando entra el texto) y con ducking desaparecen.
      La voz sigue mandando por nivel: el golpe más alto queda por debajo de su
      RMS (medido, 03-timeline.md).
    */}
    <PistaSonido cues={cues015} duckDb={0} />
  </AbsoluteFill>
);
