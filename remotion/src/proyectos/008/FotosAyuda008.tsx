import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { CHOCO } from "../../marcas/choco";

/**
 * LA PRUEBA — las fotos REALES de lo que la gente ha llevado, a pantalla
 * completa bajo la tarjeta de insumos de `g03` (f206–336).
 *
 * POR QUÉ ES JSX A MANO Y NO UNA PIEZA DEL PLAN. El dialecto de gráficos monta
 * OVERLAYS sobre un vídeo que ya existe; no tiene `media` (eso vive en el
 * dialecto editorial, que trae su propio mundo por toma). Esto es justo lo que
 * el director reserva para el JSX propio de la pieza: la idea visual que solo
 * tiene esta. El plan sigue mandando —los tres frames de corte son los mismos
 * que ya usaban los pops de la lista— y aquí abajo solo se dibuja.
 *
 * POR QUÉ TAPA AL AVATAR. En este tramo él ENUMERA lo que se recoge, y una
 * lista de tres palabras leída sobre una cara vale menos que la cosa. Es el
 * único sitio de la pieza donde mostrar gana a contar: se ven los jabones, las
 * cajas de ibuprofeno y los paquetes de pasta que alguien llevó de verdad. La
 * cámara ya reposa aquí (no hay cue entre f16 y f786), así que no compite nadie.
 *
 * MATERIAL PROPIO del cliente (fotos de la campaña, no de banco): origen y
 * sha256 en `proyectos/008/gracias/fotos/manifiesto.json`. Dos de las tres
 * llegan a 899×1599 —por debajo del 1080×1920 de la comp— y se escalan un 1,2×:
 * es una foto de móvil de una campaña, y ese es exactamente su registro. Lo que
 * NO se hace es fingir que son otra cosa.
 */

/** Ventanas en frames ABSOLUTOS. Los cortes coinciden con las entradas de los
 *  ítems de la lista (f212 · f249 · f286 en `graficos-008-gracias.ts`), porque
 *  la foto y su etiqueta son la misma afirmación. */
const FOTOS = [
  {
    src: "fotos-008/ayuda-aseo.jpg",
    desde: 206,
    hasta: 249,
    // Zoom lento hacia dentro / hacia fuera, alternando: tres fotos con el mismo
    // gesto se leen como una plantilla, no como material real.
    de: 1.04,
    a: 1.1,
    porque: "«kits de aseo»: jabones, toallas higiénicas y papel — lo que la lista nombra en esta línea",
  },
  {
    src: "fotos-008/ayuda-medicinas.jpg",
    desde: 249,
    hasta: 286,
    de: 1.1,
    a: 1.04,
    porque: "«medicinas básicas»: las cajas de ibuprofeno y acetaminofén, sobre los bultos de grano y las cobijas",
  },
  {
    src: "fotos-008/ayuda-alimentos.jpg",
    desde: 286,
    hasta: 336,
    de: 1.04,
    a: 1.11,
    porque: "«alimentos no perecederos»: pasta y arroz apilados en el punto de recolección",
  },
] as const;

/** Cruce de 6 f entre fotos y 8 f para volver al avatar: la ley de la pieza es
 *  blanda (`LEY_BLANDA`), así que un corte seco aquí sonaría a otra pieza. */
const CRUCE = 6;
const SALIDA = 8;

const M = CHOCO.metraje;
const alfa = (hex: string, a: number): string => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

export const FotosAyuda008: React.FC = () => {
  const frame = useCurrentFrame();
  const primera = FOTOS[0].desde;
  const ultima = FOTOS[FOTOS.length - 1].hasta;
  if (frame < primera || frame >= ultima) return null;

  return (
    <AbsoluteFill>
      {FOTOS.map((f) => {
        // Cada foto ENTRA con su cruce y se queda: la siguiente la cubre por
        // orden de pintado (el array ES el z-order, igual que en el plan). Solo
        // la última se va, disolviendo de vuelta al avatar.
        if (frame < f.desde) return null;
        const esUltima = f.hasta === ultima;
        const entra = interpolate(frame, [f.desde, f.desde + CRUCE], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const sale = esUltima
          ? interpolate(frame, [f.hasta - SALIDA, f.hasta], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          : 1;
        const escala = interpolate(frame, [f.desde, f.hasta], [f.de, f.a], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <AbsoluteFill key={f.src} style={{ opacity: entra * sale, overflow: "hidden" }}>
            <Img
              src={staticFile(f.src)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: `scale(${escala})`,
                filter: `contrast(${(M.contraste * 100).toFixed(1)}%) saturate(${(M.saturacion * 100).toFixed(1)}%)`,
              }}
            />
          </AbsoluteFill>
        );
      })}

      {/* El LOOK del canal, capa por capa y en el mismo orden que el metraje del
          formato de noticias (`montadores.tsx`): velo cálido, grano compartido y
          viñeta. No es maquillaje — es lo que hace que una foto de móvil y un
          clip de iPhone se lean como UNA pieza y no como un collage. */}
      <AbsoluteFill
        style={{ background: alfa(CHOCO.color.hueso, M.calido), mixBlendMode: "soft-light", pointerEvents: "none" }}
      />
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
    </AbsoluteFill>
  );
};
