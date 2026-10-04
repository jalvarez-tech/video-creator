import React, { useMemo } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { avisaDelPlan } from "./avisos";
import type { Marca } from "./marca";
import { EASE } from "./motion";
import {
  SUB,
  letraSubtitulosDe,
  resuelveBloque,
  revisaSubtitulosEditoriales,
  sombraSubtitulosDe,
} from "./subtitulos-editoriales";
import type { BloqueEditorial } from "./subtitulos-editoriales";

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/**
 * SUBTÍTULOS EDITORIALES — el intérprete de un `BloqueEditorial[]`.
 *
 * El contrato, la geometría y las reglas están en `subtitulos-editoriales.ts`;
 * aquí solo se pinta. Es un overlay FIJO: va fuera de la cámara y encima del
 * metraje y de los gráficos, como cualquier subtítulo (director-video §3b).
 *
 *   <PistaMetraje cortes={metrajeNNN} look={…} velos={…} />
 *   <SubtitulosEditoriales bloques={subtitulosNNN} marca={CANAL} />
 *   <PistaAudio tramos={audioNNN} />
 *
 * LA MARCA LLEGA POR PROP. De ella salen la letra (`marca.texto.letra`, o la
 * del motor), el blanco y la sombra (`marca.texto.sombra`: `null` la quita). El motor no sabe de qué canal es la pieza.
 *
 * `acentoMenos` ES DE LA PIEZA, NO DEL CANAL: los px de la composición que se le
 * restan a la itálica (el acento) y a nada más. Sin él, todo se pinta como siempre.
 *
 * TODAS LAS LÍNEAS DEL BLOQUE ESTÁN MONTADAS DESDE SU PRIMER FRAME, las que aún
 * no han entrado a opacidad 0. Así el sitio está reservado y la primera línea
 * no se mueve cuando llega la segunda: lo que se acumula es el texto, no la
 * maqueta.
 *
 * SIN VELO PROPIO. Blanco fino sobre un ventanal no se lee, y eso no lo arregla
 * una sombra más fuerte: lo arregla el velo de `<PistaMetraje velos={…}>`, que
 * es de la composición y se mide contra el plano (R25). Este componente no
 * oscurece el metraje por su cuenta.
 */
export const SubtitulosEditoriales: React.FC<{
  bloques: readonly BloqueEditorial[];
  marca: Marca;
  /** Px de la composición que se restan al cuerpo de las líneas de acento (la itálica). Por defecto 0. */
  acentoMenos?: number;
}> = ({ bloques, marca, acentoMenos }) => {
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();
  const letra = useMemo(() => letraSubtitulosDe(marca), [marca]);
  const sombra = sombraSubtitulosDe(marca);
  const avisos = useMemo(
    () =>
      revisaSubtitulosEditoriales(bloques, {
        fps,
        ancho: width,
        alto: height,
        duracion: durationInFrames,
        letra,
        acentoMenos,
      }),
    [bloques, fps, width, height, durationInFrames, letra, acentoMenos]
  );
  avisaDelPlan("subtitulos", avisos);

  // El validador avisa de dos bloques a la vez, pero no los impide: se pintan
  // los que toquen en vez de elegir uno en silencio.
  // `hasta` no finito (un `Infinity` para «hasta el final») daría a `interpolate`
  // un rango que no sabe leer y tumbaría el render: ese bloque no se pinta, y el
  // validador ya ha dicho por qué.
  const activos = bloques.filter(
    (b) => b.trozos && b.trozos.length > 0 && isFinite(b.hasta) && frame >= b.trozos[0].desde && frame < b.hasta
  );
  if (activos.length === 0) return null;

  return (
    <>
      {activos.map((b) => {
        const r = resuelveBloque(b, { ancho: width, alto: height }, letra, { acentoMenos });
        const entrada = typeof b.entrada === "number" && isFinite(b.entrada) ? b.entrada : SUB.entrada;
        // La salida no puede empezar antes de que el bloque exista: en un bloque
        // de menos frames que el fundido, `interpolate` recibiría un rango al revés.
        const sale = Math.max(1, Math.min(SUB.salida, b.hasta - b.trozos[0].desde));
        const opacidadBloque = interpolate(frame, [b.hasta - sale, b.hasta], [1, 0], CLAMP);
        return (
          <div
            key={b.id}
            style={{
              position: "absolute",
              left: r.margen,
              width: r.anchoUtil,
              top: r.top,
              height: r.alto,
              opacity: opacidadBloque,
              pointerEvents: "none",
            }}
          >
            {r.lineas.map((l, i) => {
              // `entrada: 0` es «ya puesta» (el f0 es la miniatura), no un fundido de 0 frames.
              const p = entrada <= 0 ? (frame >= l.desde ? 1 : 0) : interpolate(frame - l.desde, [0, entrada], [0, 1], CLAMP);
              const sube = (1 - EASE.outCubic(p)) * l.px * SUB.sube;
              return (
                <div
                  key={i}
                  style={{
                    height: l.alto,
                    lineHeight: `${l.alto}px`,
                    fontFamily: l.letra.familia,
                    fontWeight: l.letra.peso,
                    fontStyle: l.letra.italica ? "italic" : "normal",
                    // Si la cara no cargó, que se vea la de respaldo tal cual: una
                    // cursiva o una negra SINTETIZADAS son distintas en cada máquina.
                    fontSynthesis: "none",
                    fontSize: l.px,
                    letterSpacing: 0,
                    whiteSpace: "nowrap",
                    // Centrado con flex y no con `text-align`: una línea más ancha
                    // que la caja (una letra sin tabla, que no se ajusta) reparte
                    // así lo que sobra a los dos lados en vez de irse a la derecha.
                    display: "flex",
                    justifyContent: "center",
                    color: marca.color.blanco,
                    // La de la marca (`texto.sombra`), o sus dos sombras apiladas.
                    textShadow: sombra,
                    opacity: p,
                    transform: `translateY(${sube}px)`,
                  }}
                >
                  {l.texto}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};
