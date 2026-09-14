import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { CamaraVirtual } from "../../motor/CamaraVirtual";
import { MONTADORES_BASE, PistaGraficos } from "../../motor/graficos/PistaGraficos";
import { PistaSonido } from "../../motor/sound/PistaSonido";
import { CHOCO } from "../../marcas/choco";
import { SelloCampana } from "./Avatar008";
import { FotosAyuda008 } from "./FotosAyuda008";
import { camara008g } from "./camara-008-gracias";
import { graficos008g } from "./graficos-008-gracias";
import { cues008g } from "./cues-008-gracias";

/**
 * Proyecto 008 · pieza GRACIAS — «8 toneladas de puro amor» (campaña Ayudemos
 * a Chocó). Tercera pieza: la primera puso la tesis, la segunda dio los puntos
 * de recolección y ésta agradece y da parte del avance.
 *
 * Clip REAL del cliente (iPhone, selfie de exterior, rotación horneada):
 * 1080×1920 · 30 fps · 1410 f. Ensamblado por director-video; artefactos en
 * proyectos/008/artefactos/*-gracias.md.
 *
 * Z-ORDER (director §3b): avatar en <CamaraVirtual> (solo él se reencuadra) →
 * tarjetas de PistaGraficos (overlay fijo, banda inferior) → watermark de la
 * campaña (overlay fijo, franja alta) → SFX con ducking. Sin subtítulos, como
 * el resto de la campaña: las tarjetas condensan la voz y la banda inferior ya
 * es su zona de lectura (patrón R14).
 *
 * El sello es EL MISMO componente de Avatar008 y no una copia: las dos piezas
 * son la misma campaña y un watermark que se desalinea entre vídeos de la misma
 * serie se lee como error, no como variación.
 */
export const Gracias008: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "black" }}>
    <CamaraVirtual cues={camara008g}>
      <OffthreadVideo
        src={staticFile("avatar-008-gracias.mp4")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </CamaraVirtual>
    {/* LA PRUEBA (f206–336): las fotos reales de lo que se ha recogido, entre el
        avatar y las tarjetas. Va FUERA de <CamaraVirtual> —solo el avatar se
        reencuadra (R09)— y DEBAJO de PistaGraficos, para que el chip y la lista
        de g03 caigan encima con su scrim. Es la única capa de la pieza escrita
        a mano; el resto es plan. */}
    <FotosAyuda008 />
    {/* Scrim carbón cálido de la marca, no negro neutro: es la misma tinta del
        papel de la campaña. Aquí importa más que en la pieza anterior — el
        fondo es un cielo de atardecer azulado y un scrim frío lo empujaría a
        gris. */}
    <PistaGraficos plan={graficos008g} montadores={MONTADORES_BASE} scrimColor={CHOCO.color.tinta} />
    <SelloCampana />
    <PistaSonido cues={cues008g} duckDb={-4.5} />
  </AbsoluteFill>
);
